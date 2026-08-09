import type { Route } from "./+types/terms";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Terms of Use | StoneMatch" }, { name: "description", content: "StoneMatch website terms of use." }];
}

export default function Terms() {
  return <div className="min-h-screen bg-[#f7f5ef] text-[#17231f]">
    <header className="border-b border-black/5"><div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-5"><a href="/" className="flex items-center gap-3 font-semibold"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#143e33] text-xs font-bold tracking-widest text-white">SM</span>StoneMatch</a><a href="/#enquire" className="rounded-full bg-[#143e33] px-5 py-2.5 text-sm font-semibold text-white">Get matched</a></div></header>
    <main className="mx-auto max-w-4xl px-5 py-16 sm:py-20"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#8a7552]">Legal</p><h1 className="mt-3 font-serif text-5xl">Terms of Use</h1><p className="mt-4 text-sm text-[#69736e]">Last updated: August 2026</p>
      <div className="mt-10 space-y-8 text-sm leading-7 text-[#56625c]">
        <section><h2 className="text-xl font-semibold text-[#17231f]">1. About StoneMatch</h2><p className="mt-2">StoneMatch provides an introduction and quotation-comparison service intended to help customers identify suitable independent stone worktop suppliers and fabricators.</p></section>
        <section><h2 className="text-xl font-semibold text-[#17231f]">2. Quotations</h2><p className="mt-2">Any quotation is subject to the relevant supplier's final specification, survey or template, material availability and terms. Approximate measurements supplied at enquiry stage should not be relied upon for manufacture.</p></section>
        <section><h2 className="text-xl font-semibold text-[#17231f]">3. Independent suppliers</h2><p className="mt-2">Unless expressly stated otherwise, suppliers introduced through StoneMatch are independent businesses. The selected supplier is responsible for the final survey, contract, manufacture, supply, installation, warranties and aftercare relating to its products and services.</p></section>
        <section><h2 className="text-xl font-semibold text-[#17231f]">4. Customer information</h2><p className="mt-2">You are responsible for providing information that is accurate to the best of your knowledge. Changes to dimensions, materials, appliances, cut-outs or other project details may affect quotations.</p></section>
        <section><h2 className="text-xl font-semibold text-[#17231f]">5. Website availability</h2><p className="mt-2">We aim to keep the website and enquiry service available but cannot guarantee uninterrupted access. We may update, change or withdraw parts of the service as it develops.</p></section>
        <section><h2 className="text-xl font-semibold text-[#17231f]">6. Contact</h2><p className="mt-2">Questions about these terms can be sent to <a className="font-semibold text-[#143e33] underline" href="mailto:Enquires@stonematch.co.uk">Enquires@stonematch.co.uk</a>.</p></section>
      </div>
      <p className="mt-12 rounded-2xl bg-[#eee8dc] p-5 text-xs leading-5 text-[#665f52]">These terms are a practical launch version reflecting StoneMatch's current introduction and comparison model. They should be professionally reviewed as the commercial model and supplier agreements develop.</p>
    </main>
  </div>;
}
