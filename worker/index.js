const ALLOWED_ORIGINS = new Set([
  "https://stonematch.co.uk",
  "https://www.stonematch.co.uk",
]);

function cors(origin) {
  const allowed = ALLOWED_ORIGINS.has(origin) ? origin : "https://stonematch.co.uk";
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST,OPTIONS,GET",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };
}

function json(data, status = 200, origin = "") {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...cors(origin) },
  });
}

async function getPipedriveToken(env) {
  if (typeof env.PIPEDRIVE_API_TOKEN === "string" && env.PIPEDRIVE_API_TOKEN) {
    return env.PIPEDRIVE_API_TOKEN;
  }
  if (typeof env.Pipedrive === "string" && env.Pipedrive) return env.Pipedrive;
  if (env.Pipedrive && typeof env.Pipedrive.get === "function") {
    return await env.Pipedrive.get();
  }
  return null;
}

async function pipedrive(path, token, options = {}) {
  const separator = path.includes("?") ? "&" : "?";
  const response = await fetch(`https://api.pipedrive.com${path}${separator}api_token=${encodeURIComponent(token)}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok || body.success === false) {
    const message = body?.error || body?.error_info || `Pipedrive request failed (${response.status})`;
    throw new Error(message);
  }
  return body;
}

function clean(value, max = 2000) {
  return String(value ?? "").trim().slice(0, max);
}

function escapeHtml(value) {
  return clean(value, 5000)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") || "";

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(origin) });

    if (request.method === "GET" && (url.pathname === "/" || url.pathname === "/health")) {
      const token = await getPipedriveToken(env);
      return json({ ok: true, service: "StoneMatch lead API", pipedriveConfigured: Boolean(token) }, 200, origin);
    }

    if (request.method !== "POST" || url.pathname !== "/api/lead") {
      return json({ ok: false, error: "Not found" }, 404, origin);
    }

    if (origin && !ALLOWED_ORIGINS.has(origin)) {
      return json({ ok: false, error: "Origin not allowed" }, 403, origin);
    }

    let data;
    try { data = await request.json(); }
    catch { return json({ ok: false, error: "Invalid request" }, 400, origin); }

    const name = clean(data.name, 160);
    const email = clean(data.email, 254);
    const phone = clean(data.phone, 80);
    const postcode = clean(data.postcode, 20);
    if (!name || !email || !phone || !postcode) {
      return json({ ok: false, error: "Name, email, phone and postcode are required." }, 400, origin);
    }

    const token = await getPipedriveToken(env);
    if (!token) return json({ ok: false, error: "Pipedrive is not configured." }, 503, origin);

    try {
      const personResult = await pipedrive("/api/v2/persons", token, {
        method: "POST",
        body: JSON.stringify({
          name,
          emails: [{ value: email, primary: true, label: "work" }],
          phones: [{ value: phone, primary: true, label: "mobile" }],
        }),
      });
      const personId = personResult?.data?.id;
      if (!personId) throw new Error("Pipedrive did not return a person ID.");

      const title = `StoneMatch - ${name} - ${postcode}`;
      const leadResult = await pipedrive("/api/v1/leads", token, {
        method: "POST",
        body: JSON.stringify({ title, person_id: personId, origin_id: "stonematch-website" }),
      });
      const leadId = leadResult?.data?.id;
      if (!leadId) throw new Error("Pipedrive did not return a lead ID.");

      const fields = [
        ["Project postcode", data.postcode], ["Project type", data.projectType], ["Material", data.material],
        ["Style / colour", data.style], ["Budget", data.budget], ["Timescale", data.timescale],
        ["Measurements / plans", data.measurements], ["Existing quote", data.existingQuote],
        ["Best time to call", data.bestTime], ["Other notes", data.notes],
      ];
      const noteContent = `<b>StoneMatch website enquiry</b><br><br>${fields.map(([k,v]) => `<b>${escapeHtml(k)}:</b> ${escapeHtml(v) || "—"}`).join("<br>")}`;
      await pipedrive("/api/v1/notes", token, {
        method: "POST",
        body: JSON.stringify({ content: noteContent, lead_id: leadId, pinned_to_lead_flag: 1 }),
      });

      return json({ ok: true, leadId }, 201, origin);
    } catch (error) {
      console.error("StoneMatch Pipedrive submission failed", error);
      return json({ ok: false, error: "We couldn't save your enquiry right now. Please try again." }, 502, origin);
    }
  },
};
