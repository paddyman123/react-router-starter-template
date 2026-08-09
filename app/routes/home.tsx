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

const steps = [
  ["01", "Send us your project", "Share your postcode, measurements or kitchen plan, preferred material and budget. Rough dimensions are fine to get started."],
  ["02", "We source & compare", "We approach suitable local fabricators, compare the full specification and negotiate on your behalf."],
  ["03", "Choose with confidence", "We present the strongest quotation options clearly, including the supplier behind each quotation."],
];

const benefits = [
  ["Independent comparison", "We compare the full scope of each quotation rather than just the headline price."],
  ["Reputable local suppliers", "Projects are matched with suitable stone fabricators serving the West Midlands."],
  ["Budget-led matching", "We look for the right material and specification for what you actually want to spend."],
  ["Less chasing", "One brief to StoneMatch means you don't have to repeat the same enquiry to multiple companies."],
];

const faqs = [
  ["Is StoneMatch free for homeowners?", "Yes. There is no charge to submit your project or receive quotation options through StoneMatch."],
  ["Do I need exact measurements?", "No. Approximate measurements or a kitchen plan are enough to begin. Final fabrication measurements are completed by the chosen supplier before manufacture."],
  ["When do I see the supplier names?", "Supplier identities are shown when your quotation options are presented, after the initial sourcing and comparison process."],
  ["Which areas do you cover?", "StoneMatch is initially covering the West Midlands, including Birmingham, Solihull, Dudley, Wolverhampton, Walsall, Sandwell, Coventry and surrounding areas."],
  ["What materials can you help with?", "Quartz, granite, porcelain and other sintered or ceramic worktop materials. If you're unsure which material is right, select 'Not sure yet' and tell us what look and budget you have in mind."],
  ["Who supplies and installs the worktops?", "The selected fabricator supplies, templates, manufactures and installs the worktops. StoneMatch acts as the introduction and comparison service."],
];

export default function Home() {
  const result = useActionData<typeof action>();
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";

  return (
    <div className="min-h-screen bg-[#f7f5ef] text-[#17231f]">
      <header className="sticky top-0 z-50 border-b border-black/5 bg-[#f7f5ef]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#top" className="flex items-center gap-3 font-semibold tracking-tight">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-[#143e33] text-xs font-bold tracking-[.18em] text-white">SM</span>
            <span className="text-xl sm:text-2xl">StoneMatch</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium lg:flex">
            <a href="#how" className="transition hover:text-[#8a7552]">How it works</a>
            <a href="#why" className="transition hover:text-[#8a7552]">Why StoneMatch</a>
            <a href="#materials" className="transition hover:text-[#8a7552]">Materials</a>
            <a href="#faq" className="transition hover:text-[#8a7552]">FAQs</a>
          </nav>
          <a href="#enquire" className="rounded-full bg-[#143e33] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1a5143]">Get matched</a>
        </div>
      </header>

      <main id="top">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_18%,rgba(205,185,147,.34),transparent_30%),radial-gradient(circle_at_16%_90%,rgba(20,62,51,.08),transparent_28%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:py-20 lg:grid-cols-[1.12fr_.88fr] lg:items-center lg:px-8 lg:py-28">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#8a7552]/20 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-[#7c6949]">
                West Midlands launch
              </div>
              <h1 className="max-w-4xl font-serif text-5xl leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.2rem]">
                Find the right stone worktop supplier <span className="text-[#826e4c]">without the guesswork.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-[#5e6a64] sm:text-xl">
                Tell us what you need once. StoneMatch sources suitable local fabricators, compares quotations and negotiates on your behalf — helping you choose the right product for your budget.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#enquire" className="rounded-full bg-[#143e33] px-7 py-3.5 text-center font-semibold text-white shadow-lg shadow-[#143e33]/10 transition hover:bg-[#1a5143]">Start your free enquiry</a>
                <a href="#how" className="rounded-full border border-[#143e33]/15 bg-white/70 px-7 py-3.5 text-center font-semibold text-[#143e33] transition hover:bg-white">See how it works</a>
              </div>
              <div className="mt-10 grid max-w-2xl grid-cols-3 divide-x divide-black/10 border-y border-black/10 py-5 text-center sm:text-left">
                <div className="pr-3 sm:pr-5"><strong className="block text-base sm:text-lg">Free</strong><span className="mt-1 block text-xs text-[#68736d] sm:text-sm">for homeowners</span></div>
                <div className="px-3 sm:px-5"><strong className="block text-base sm:text-lg">Local</strong><span className="mt-1 block text-xs text-[#68736d] sm:text-sm">West Midlands</span></div>
                <div className="pl-3 sm:pl-5"><strong className="block text-base sm:text-lg">Simple</strong><span className="mt-1 block text-xs text-[#68736d] sm:text-sm">one brief</span></div>
              </div>
            </div>

            <aside className="rounded-[2rem] bg-[#143e33] p-7 text-white shadow-2xl shadow-[#143e33]/15 sm:p-9 lg:rotate-[1deg]">
              <span className="inline-flex rounded-full bg-[#decba3] px-3 py-1 text-xs font-bold tracking-wide text-[#143e33]">WHAT WE NEED</span>
              <h2 className="mt-5 font-serif text-4xl leading-tight">You tell us once. We do the chasing.</h2>
              <p className="mt-4 text-sm leading-6 text-white/70">A rough plan is enough to start. We can refine the specification with you before quotations are requested.</p>
              <ul className="mt-7 divide-y divide-white/10 text-sm text-white/90">
                {["Your postcode", "Kitchen plan or rough measurements", "Preferred material or colour", "Approximate budget", "Sink, hob, upstands & splashback details"].map((item) => (
                  <li key={item} className="flex gap-3 py-3.5"><span className="text-[#e8d8b6]">✓</span>{item}</li>
                ))}
              </ul>
              <a href="#enquire" className="mt-7 block rounded-xl bg-white px-5 py-3 text-center text-sm font-bold text-[#143e33]">Send your project</a>
            </aside>
          </div>
        </section>

        <section id="how" className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-[.22em] text-[#8a7552]">How StoneMatch works</p>
              <h2 className="mt-4 font-serif text-4xl sm:text-5xl">One enquiry. Better choices.</h2>
              <p className="mt-5 leading-7 text-[#66716b]">Stone worktop quotations can be difficult to compare. We make the process simpler and more transparent.</p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {steps.map(([n, title, copy], index) => (
                <article key={n} className={`rounded-3xl border p-7 sm:p-8 ${index === 1 ? "border-[#cbb68d] bg-[#f2ebdf]" : "border-black/8 bg-[#fbfaf7]"}`}>
                  <span className="text-xs font-bold tracking-[.2em] text-[#8a7552]">{n}</span>
                  <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#66716b]">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="why" className="py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.95fr_1.05fr] lg:items-center lg:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.22em] text-[#8a7552]">Why use StoneMatch?</p>
              <h2 className="mt-4 font-serif text-4xl sm:text-5xl">A cheaper quote isn't always a better quote.</h2>
              <p className="mt-6 text-lg leading-8 text-[#5e6963]">Thickness, edge profiles, sink cut-outs, drainer grooves, upstands, splashbacks, templating, installation and material grade can all change the final price. StoneMatch helps make those differences easier to understand.</p>
              <div className="mt-7 rounded-2xl border border-[#143e33]/10 bg-white p-5 text-sm leading-6 text-[#59645f]">
                <strong className="text-[#17231f]">StoneMatch is an introduction and comparison service.</strong> Your chosen fabricator remains responsible for the final survey, specification, manufacture and installation of your worktops.
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map(([title, copy]) => (
                <div key={title} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[#e4eee9] font-bold text-[#143e33]">✓</span>
                  <h3 className="mt-4 font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#66716b]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="materials" className="bg-[#16231f] py-20 text-white sm:py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.22em] text-[#d9c69e]">Materials</p>
                <h2 className="mt-4 font-serif text-4xl sm:text-5xl">Not sure which surface is right?</h2>
                <p className="mt-5 leading-7 text-white/65">That's exactly what StoneMatch is for. Tell us the look you like, how the kitchen will be used and your approximate budget.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["Quartz", "Low-maintenance, consistent and available in a huge choice of designs."],
                  ["Granite", "Natural stone with unique patterning and strong everyday durability."],
                  ["Porcelain", "Slim, heat-resistant surfaces with striking printed designs and finishes."],
                  ["Sintered", "Technical surfaces designed for durability, heat resistance and modern interiors."],
                ].map(([title, copy]) => (
                  <article key={title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <h3 className="font-semibold">{title}</h3>
                    <p className="mt-2 text-xs leading-5 text-white/60">{copy}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="rounded-[2rem] bg-[#f2ebdf] p-8 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[.22em] text-[#8a7552]">West Midlands</p>
                <h2 className="mt-3 font-serif text-3xl sm:text-4xl">Local knowledge. Wider choice.</h2>
                <p className="mt-4 leading-7 text-[#66716b]">We're initially matching projects throughout the West Midlands, including Birmingham, Solihull, Dudley, Wolverhampton, Walsall, Sandwell, Coventry and surrounding areas.</p>
              </div>
              <a href="#enquire" className="mt-7 inline-flex rounded-full bg-[#143e33] px-7 py-3.5 font-semibold text-white lg:mt-0">Check your project</a>
            </div>
          </div>
        </section>

        <section id="enquire" className="bg-[#143e33] py-20 text-white sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[.72fr_1.28fr] lg:px-8">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-xs font-bold uppercase tracking-[.22em] text-[#dccba8]">Free enquiry</p>
              <h2 className="mt-4 font-serif text-4xl sm:text-5xl">Tell us about your worktops.</h2>
              <p className="mt-6 leading-7 text-white/70">A rough kitchen plan or approximate measurements are enough to begin. We'll review the brief before approaching suitable suppliers.</p>
              <div className="mt-8 space-y-3 text-sm text-white/70">
                <p>✓ No obligation</p>
                <p>✓ Supplier names shown at quotation stage</p>
                <p>✓ Brand-led service — no pressure selling</p>
              </div>
              <p className="mt-8 text-sm text-white/60">General enquiries:<br /><a className="font-semibold text-white underline decoration-white/30 underline-offset-4" href="mailto:Enquires@stonematch.co.uk">Enquires@stonematch.co.uk</a></p>
            </div>

            <Form method="post" encType="multipart/form-data" className="rounded-[2rem] bg-white p-6 text-[#17231f] shadow-2xl shadow-black/10 sm:p-8 lg:p-10">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-semibold">Full name<input required name="name" autoComplete="name" className="mt-2 w-full rounded-xl border border-black/15 px-4 py-3 font-normal outline-none transition focus:border-[#8a7552] focus:ring-2 focus:ring-[#8a7552]/10" /></label>
                <label className="text-sm font-semibold">Email<input required type="email" name="email" autoComplete="email" className="mt-2 w-full rounded-xl border border-black/15 px-4 py-3 font-normal outline-none transition focus:border-[#8a7552] focus:ring-2 focus:ring-[#8a7552]/10" /></label>
                <label className="text-sm font-semibold">Phone<input required type="tel" name="phone" autoComplete="tel" className="mt-2 w-full rounded-xl border border-black/15 px-4 py-3 font-normal outline-none transition focus:border-[#8a7552] focus:ring-2 focus:ring-[#8a7552]/10" /></label>
                <label className="text-sm font-semibold">Postcode<input required name="postcode" autoComplete="postal-code" placeholder="e.g. B91 2AA" className="mt-2 w-full rounded-xl border border-black/15 px-4 py-3 font-normal uppercase outline-none transition focus:border-[#8a7552] focus:ring-2 focus:ring-[#8a7552]/10" /></label>
                <label className="text-sm font-semibold">Preferred material<select name="material" className="mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 font-normal outline-none">{materials.map((item) => <option key={item}>{item}</option>)}</select></label>
                <label className="text-sm font-semibold">Approx. budget<select name="budget" className="mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 font-normal outline-none">{budgets.map((item) => <option key={item}>{item}</option>)}</select></label>
              </div>

              <label className="mt-5 block text-sm font-semibold">Project details<textarea required name="details" rows={6} placeholder="Approximate sizes, island, sink, hob, upstands, splashbacks, colour/style and ideal timescale..." className="mt-2 w-full rounded-xl border border-black/15 px-4 py-3 font-normal outline-none transition focus:border-[#8a7552] focus:ring-2 focus:ring-[#8a7552]/10" /></label>

              <label className="mt-5 block rounded-2xl border border-dashed border-black/20 bg-[#faf9f6] p-5 text-sm font-semibold">
                Upload plan / sketch / measurements
                <span className="mt-1 block text-xs font-normal text-[#7a837f]">PDF, JPG, PNG or HEIC. You can upload more than one file.</span>
                <input type="file" name="plans" multiple accept=".pdf,.jpg,.jpeg,.png,.heic" className="mt-4 block w-full text-sm font-normal file:mr-4 file:rounded-full file:border-0 file:bg-[#e8eee9] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#143e33]" />
              </label>

              <label className="mt-5 flex items-start gap-3 text-xs leading-5 text-[#5d6863]"><input required type="checkbox" className="mt-1 h-4 w-4 accent-[#143e33]" /><span>I agree to StoneMatch contacting me about this enquiry and sharing relevant project information with selected suppliers for quotation purposes. See our <a href="/privacy" className="font-semibold underline">Privacy Policy</a>.</span></label>

              <button disabled={submitting} className="mt-7 w-full rounded-xl bg-[#143e33] px-6 py-4 font-semibold text-white shadow-sm transition hover:bg-[#1a5143] disabled:cursor-wait disabled:opacity-60" type="submit">{submitting ? "Submitting…" : "Submit my enquiry"}</button>
              {result && <p className={`mt-4 rounded-xl p-4 text-sm font-semibold ${result.ok ? "bg-[#e5f1ea] text-[#20553f]" : "bg-[#f9e9e6] text-[#8a3429]"}`}>{result.message}</p>}
            </Form>
          </div>
        </section>

        <section id="faq" className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-4xl px-5 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[.22em] text-[#8a7552]">FAQs</p>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">A few useful answers.</h2>
            <div className="mt-10 space-y-3">
              {faqs.map(([q, a]) => (
                <details key={q} className="group rounded-2xl border border-black/10 bg-[#fbfaf7] px-5 py-4 open:bg-white open:shadow-sm">
                  <summary className="cursor-pointer list-none pr-8 font-semibold marker:hidden">{q}</summary>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-[#66716b]">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#101815] py-12 text-white/65">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:grid-cols-2 lg:grid-cols-[1.5fr_.7fr_.8fr] lg:px-8">
          <div>
            <div className="flex items-center gap-3 text-white"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#d7c49b] text-xs font-bold tracking-widest text-[#143e33]">SM</span><span className="text-xl font-semibold">StoneMatch</span></div>
            <p className="mt-4 max-w-xl text-sm leading-6">Helping homeowners find reputable stone worktop suppliers, compare the right options and buy with greater confidence.</p>
          </div>
          <div className="text-sm leading-7">
            <p className="font-semibold text-white">Explore</p>
            <a href="#how" className="block hover:text-white">How it works</a>
            <a href="#enquire" className="block hover:text-white">Get matched</a>
            <a href="#faq" className="block hover:text-white">FAQs</a>
          </div>
          <div className="text-sm leading-7">
            <p className="font-semibold text-white">StoneMatch</p>
            <a href="mailto:Enquires@stonematch.co.uk" className="block hover:text-white">Enquires@stonematch.co.uk</a>
            <a href="/privacy" className="block hover:text-white">Privacy Policy</a>
            <a href="/terms" className="block hover:text-white">Terms of Use</a>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 px-5 pt-6 text-xs text-white/45 lg:px-8">© 2026 StoneMatch. StoneMatch is an introduction and quotation-comparison service and is not the manufacturer or installer of the products supplied by third-party fabricators.</div>
      </footer>
    </div>
  );
}
