import type { Route } from "./+types/privacy";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Privacy Policy | StoneMatch" }, { name: "description", content: "StoneMatch privacy policy." }];
}

export default function Privacy() {
  return <div className="min-h-screen bg-[#f7f5ef] text-[#17231f]">
    <header className="border-b border-black/5"><div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-5"><a href="/" className="flex items-center gap-3 font-semibold"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#143e33] text-xs font-bold tracking-widest text-white">SM</span>StoneMatch</a><a href="/#enquire" className="rounded-full bg-[#143e33] px-5 py-2.5 text-sm font-semibold text-white">Get matched</a></div></header>
    <main className="mx-auto max-w-4xl px-5 py-16 sm:py-20"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#8a7552]">Legal</p><h1 className="mt-3 font-serif text-5xl">Privacy Policy</h1><p className="mt-4 text-sm text-[#69736e]">Last updated: August 2026</p>
      <div className="mt-10 space-y-8 text-sm leading-7 text-[#56625c]">
        <section><h2 className="text-xl font-semibold text-[#17231f]">1. Information we collect</h2><p className="mt-2">When you submit an enquiry, StoneMatch may collect your name, email address, telephone number, postcode, project requirements, budget, material preferences and any plans, photographs or measurements you choose to upload.</p></section>
        <section><h2 className="text-xl font-semibold text-[#17231f]">2. How we use your information</h2><p className="mt-2">We use your information to review your project, contact you about your enquiry, identify suitable suppliers, obtain and compare quotations, administer our service and maintain appropriate business records.</p></section>
        <section><h2 className="text-xl font-semibold text-[#17231f]">3. Sharing project information</h2><p className="mt-2">Where necessary to obtain quotations, relevant project information may be shared with selected stone fabricators or suppliers. We only share information reasonably required for them to assess and quote for your project.</p></section>
        <section><h2 className="text-xl font-semibold text-[#17231f]">4. Storage and security</h2><p className="mt-2">We take reasonable measures to protect personal information and use service providers to operate our website and customer-management systems. Information is retained only for as long as reasonably required for the purposes for which it was collected and any applicable legal or business requirements.</p></section>
        <section><h2 className="text-xl font-semibold text-[#17231f]">5. Your rights</h2><p className="mt-2">Under UK data protection law, you may have rights including access to your personal data, correction of inaccurate data, erasure in certain circumstances, restriction or objection to certain processing, and data portability where applicable.</p></section>
        <section><h2 className="text-xl font-semibold text-[#17231f]">6. Contact</h2><p className="mt-2">For privacy questions or requests, contact <a className="font-semibold text-[#143e33] underline" href="mailto:Enquires@stonematch.co.uk">Enquires@stonematch.co.uk</a>.</p></section>
      </div>
      <p className="mt-12 rounded-2xl bg-[#eee8dc] p-5 text-xs leading-5 text-[#665f52]">This page provides a practical launch privacy notice for the current StoneMatch service. It should be reviewed and updated as the business, suppliers, marketing activities and data-processing arrangements develop.</p>
    </main>
  </div>;
}
