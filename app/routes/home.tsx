import { Form, useActionData, useNavigation } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "StoneMatch | Find Trusted Stone Worktop Suppliers" },
    {
      name: "description",
      content:
        "StoneMatch helps homeowners across the West Midlands find reputable stone worktop suppliers, compare quotations and negotiate the right deal.",
    },
  ];
}

const materials = ["Quartz", "Granite", "Porcelain", "Sintered stone / ceramic", "Not sure yet"];
const budgets = ["Under £1,500", "£1,500–£2,500", "£2,500–£4,000", "£4,000–£6,000", "£6,000+", "Not sure yet"];
const PIPEDRIVE_BASE_URL = "https://stonematch.pipedrive.com";

type SecretStoreBinding = { get(): Promise<string> };

function text(form: FormData, key: string) {
  return String(form.get(key) ?? "").trim();
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'\"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '\"': "&quot;",
    };
    return entities[character] ?? character;
  });
}

async function resolveSecret(value: unknown) {
  if (typeof value === "string") return value;
  if (value && typeof (value as SecretStoreBinding).get === "function") {
    return await (value as SecretStoreBinding).get();
  }
  return undefined;
}

async function pipedriveJson(path: string, token: string, body: unknown) {
  const requestUrl = new URL(path, PIPEDRIVE_BASE_URL);
  requestUrl.searchParams.set("api_token", token);

  const response = await fetch(requestUrl.toString(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const payload = (await response.json()) as { success?: boolean; data?: any; error?: string };
  if (!response.ok || payload.success === false) {
    throw new Error(payload.error || `Pipedrive request failed (${response.status})`);
  }
  return payload.data;
}

export async function action({ request, context }: Route.ActionArgs) {
  const form = await request.formData();
  const name = text(form, "name");
  const email = text(form, "email");
  const phone = text(form, "phone");
  const postcode = text(form, "postcode");
  const material = text(form, "material");
  const budget = text(form, "budget");
  const details = text(form, "details");

  if (!name || !email || !phone || !postcode || !details) {
    return { ok: false, message: "Please complete all required fields." };
  }

  const env = context.cloudflare.env as unknown as Record<string, unknown>;
  const token = await resolveSecret(env.PIPEDRIVE_API_TOKEN ?? env.PIPEDRIVE_TOKEN ?? env.Pipedrive);

  if (!token) {
    console.error("StoneMatch: Pipedrive API secret is missing.");
    return { ok: false, message: "We couldn't submit your enquiry just now. Please email Enquires@stonematch.co.uk." };
  }

  try {
    const person = await pipedriveJson("/api/v2/persons", token, {
      name,
      emails: [{ value: email, primary: true, label: "work" }],
      phones: [{ value: phone, primary: true, label: "mobile" }],
    });

    const lead = await pipedriveJson("/v1/leads", token, {
      title: name,
      person_id: person.id,
    });

    const note = [
      "<strong>StoneMatch website enquiry</strong>",
      `<br><strong>Postcode:</strong> ${escapeHtml(postcode)}`,
      `<br><strong>Material:</strong> ${escapeHtml(material)}`,
      `<br><strong>Budget:</strong> ${escapeHtml(budget)}`,
      `<br><strong>Project details:</strong><br>${escapeHtml(details).replace(/\n/g, "<br>")}`,
      "<br><strong>Source:</strong> StoneMatch.co.uk",
    ].join("");

    await pipedriveJson("/v1/notes", token, {
      content: note,
      lead_id: lead.id,
      pinned_to_lead_flag: 1,
    });

    const files = form
      .getAll("plans")
      .filter((item): item is File => item instanceof File && item.size > 0);

    for (const file of files) {
      const upload = new FormData();
      upload.append("file", file, file.name);
      upload.append("lead_id", String(lead.id));
      const uploadUrl = new URL("/v1/files", PIPEDRIVE_BASE_URL);
      uploadUrl.searchParams.set("api_token", token);
      const response = await fetch(uploadUrl.toString(), { method: "POST", body: upload });
      if (!response.ok) {
        console.error(`StoneMatch: file upload failed for ${file.name}`, response.status);
      }
    }

    console.info("StoneMatch Pipedrive success", {
      personId: person?.id,
      leadId: lead?.id,
      leadTitle: lead?.title ?? name,
    });

    return {
      ok: true,
      message: "Thank you — your enquiry has been received. StoneMatch will review your project and be in touch.",
    };
  } catch (error) {
    console.error(
      "StoneMatch Pipedrive submission failed:",
      error instanceof Error ? error.message : String(error),
    );
    return { ok: false, message: "We couldn't submit your enquiry just now. Please email Enquires@stonematch.co.uk." };
  }
}

export default function Home() {
  const result = useActionData<typeof action>();
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";

  return (
    <div className="min-h-screen bg-[#f8f6f1] text-[#18231f]">
      <header className="sticky top-0 z-50 border-b border-black/5 bg-[#f8f6f1]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#top" className="flex items-center gap-3 font-semibold tracking-tight">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#17382f] text-xs font-bold tracking-widest text-white">SM</span>
            <span className="text-xl">StoneMatch</span>
          </a>
          <a href="#enquire" className="rounded-full bg-[#17382f] px-5 py-2.5 text-sm font-semibold text-white">Get matched</a>
        </div>
      </header>

      <main id="top">
        <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:px-8 lg:py-28">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[.22em] text-[#8b7653]">Launching across the West Midlands</p>
            <h1 className="max-w-4xl font-serif text-5xl leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">The smarter way to buy <span className="text-[#7b6849]">stone worktops.</span></h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#5d6863]">Tell us what you need. We find suitable local fabricators, compare their quotations and negotiate on your behalf.</p>
            <div className="mt-8"><a href="#enquire" className="rounded-full bg-[#17382f] px-7 py-3.5 font-semibold text-white">Start your free enquiry</a></div>
          </div>
          <aside className="rounded-[2rem] bg-[#17382f] p-8 text-white shadow-2xl shadow-[#17382f]/15">
            <span className="inline-flex rounded-full bg-[#d7c49b] px-3 py-1 text-xs font-bold text-[#17382f]">YOUR BRIEF</span>
            <h2 className="mt-5 font-serif text-4xl">You tell us once. We do the chasing.</h2>
            <ul className="mt-7 divide-y divide-white/10 text-sm text-white/85">
              {["Your postcode", "Kitchen plan or measurements", "Preferred material or colour", "Budget", "Sink, hob and splashback details"].map((item) => <li key={item} className="py-3">✓ {item}</li>)}
            </ul>
          </aside>
        </section>

        <section id="enquire" className="bg-[#17382f] py-20 text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.22em] text-[#dccca9]">Free enquiry</p>
              <h2 className="mt-3 font-serif text-4xl sm:text-5xl">Tell us about your worktops.</h2>
              <p className="mt-6 leading-7 text-white/70">A rough kitchen plan or approximate measurements are enough to start.</p>
              <p className="mt-6 text-sm text-white/60">General enquiries: Enquires@stonematch.co.uk</p>
            </div>

            <Form method="post" encType="multipart/form-data" className="rounded-3xl bg-white p-6 text-[#18231f] sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-semibold">Full name<input required name="name" className="mt-2 w-full rounded-xl border border-black/15 px-4 py-3 font-normal" /></label>
                <label className="text-sm font-semibold">Email<input required type="email" name="email" className="mt-2 w-full rounded-xl border border-black/15 px-4 py-3 font-normal" /></label>
                <label className="text-sm font-semibold">Phone<input required type="tel" name="phone" className="mt-2 w-full rounded-xl border border-black/15 px-4 py-3 font-normal" /></label>
                <label className="text-sm font-semibold">Postcode<input required name="postcode" className="mt-2 w-full rounded-xl border border-black/15 px-4 py-3 font-normal" /></label>
                <label className="text-sm font-semibold">Preferred material<select name="material" className="mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 font-normal">{materials.map((item) => <option key={item}>{item}</option>)}</select></label>
                <label className="text-sm font-semibold">Approx. budget<select name="budget" className="mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 font-normal">{budgets.map((item) => <option key={item}>{item}</option>)}</select></label>
              </div>
              <label className="mt-4 block text-sm font-semibold">Project details<textarea required name="details" rows={5} className="mt-2 w-full rounded-xl border border-black/15 px-4 py-3 font-normal" /></label>
              <label className="mt-4 block rounded-2xl border border-dashed border-black/20 bg-[#faf9f6] p-4 text-sm font-semibold">Upload plan / sketch / measurements<input type="file" name="plans" multiple accept=".pdf,.jpg,.jpeg,.png,.heic" className="mt-3 block w-full text-sm font-normal" /></label>
              <label className="mt-5 flex items-start gap-3 text-xs leading-5 text-[#5d6863]"><input required type="checkbox" className="mt-1" /><span>I agree to StoneMatch contacting me about this enquiry and sharing relevant project information with selected suppliers for quotation purposes.</span></label>
              <button disabled={submitting} className="mt-6 w-full rounded-xl bg-[#17382f] px-6 py-3.5 font-semibold text-white disabled:opacity-60" type="submit">{submitting ? "Submitting…" : "Submit my enquiry"}</button>
              {result && <p className={`mt-4 rounded-xl p-3 text-sm font-semibold ${result.ok ? "bg-[#e5f1ea] text-[#20553f]" : "bg-[#f9e9e6] text-[#8a3429]"}`}>{result.message}</p>}
            </Form>
          </div>
        </section>
      </main>

      <footer className="bg-[#111916] py-10 text-white/65">
        <div className="mx-auto max-w-7xl px-5 text-sm lg:px-8">© 2026 StoneMatch · Enquires@stonematch.co.uk</div>
      </footer>
    </div>
  );
}
