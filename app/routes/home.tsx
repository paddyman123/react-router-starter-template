import { useState } from "react";
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

export default function Home() {
	const [submitted, setSubmitted] = useState(false);

	return (
		<div className="min-h-screen bg-[#f8f6f1] text-[#18231f]">
			<header className="sticky top-0 z-50 border-b border-black/5 bg-[#f8f6f1]/95 backdrop-blur">
				<div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
					<a href="#top" className="flex items-center gap-3 font-semibold tracking-tight">
						<span className="grid h-10 w-10 place-items-center rounded-full bg-[#17382f] text-xs font-bold tracking-widest text-white">SM</span>
						<span className="text-xl">StoneMatch</span>
					</a>
					<nav className="hidden items-center gap-7 text-sm font-medium md:flex">
						<a href="#how" className="hover:text-[#7b6849]">How it works</a>
						<a href="#why" className="hover:text-[#7b6849]">Why StoneMatch</a>
						<a href="#faq" className="hover:text-[#7b6849]">FAQs</a>
					</nav>
					<a href="#enquire" className="rounded-full bg-[#17382f] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#214b40]">Get matched</a>
				</div>
			</header>

			<main id="top">
				<section className="relative overflow-hidden">
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(201,183,147,.35),transparent_32%)]" />
					<div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:px-8 lg:py-28">
						<div>
							<p className="mb-5 text-xs font-bold uppercase tracking-[.22em] text-[#8b7653]">Launching across the West Midlands</p>
							<h1 className="max-w-4xl font-serif text-5xl leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">The smarter way to buy <span className="text-[#7b6849]">stone worktops.</span></h1>
							<p className="mt-7 max-w-2xl text-lg leading-8 text-[#5d6863]">Tell us what you need. We find suitable local fabricators, compare their quotations and negotiate on your behalf — so you can choose with confidence.</p>
							<div className="mt-8 flex flex-wrap gap-4">
								<a href="#enquire" className="rounded-full bg-[#17382f] px-7 py-3.5 font-semibold text-white hover:bg-[#214b40]">Start your free enquiry</a>
								<a href="#how" className="rounded-full border border-[#17382f]/20 px-7 py-3.5 font-semibold text-[#17382f]">See how it works</a>
							</div>
							<div className="mt-10 grid max-w-2xl grid-cols-3 gap-3 border-t border-black/10 pt-6 text-sm">
								<div><strong className="block text-base">Free</strong><span className="text-[#6b756f]">for homeowners</span></div>
								<div><strong className="block text-base">Local</strong><span className="text-[#6b756f]">trusted suppliers</span></div>
								<div><strong className="block text-base">One brief</strong><span className="text-[#6b756f]">multiple options</span></div>
							</div>
						</div>

						<aside className="rounded-[2rem] bg-[#17382f] p-7 text-white shadow-2xl shadow-[#17382f]/15 sm:p-9">
							<span className="inline-flex rounded-full bg-[#d7c49b] px-3 py-1 text-xs font-bold text-[#17382f]">YOUR BRIEF</span>
							<h2 className="mt-5 font-serif text-4xl">You tell us once. We do the chasing.</h2>
							<ul className="mt-7 divide-y divide-white/10 text-sm text-white/85">
								{["Your postcode", "Kitchen plan or measurements", "Preferred material or colour", "Budget", "Sink, hob and splashback details"].map((item) => (
									<li key={item} className="flex gap-3 py-3"><span className="text-[#e2d4b5]">✓</span>{item}</li>
								))}
							</ul>
							<p className="mt-7 text-sm leading-6 text-white/70">We review the project before approaching suitable fabricators. Supplier names are shown when your quotation options are ready.</p>
						</aside>
					</div>
				</section>

				<section id="how" className="bg-white py-20 lg:py-24">
					<div className="mx-auto max-w-7xl px-5 lg:px-8">
						<div className="mx-auto max-w-2xl text-center">
							<p className="text-xs font-bold uppercase tracking-[.22em] text-[#8b7653]">How it works</p>
							<h2 className="mt-3 font-serif text-4xl sm:text-5xl">One enquiry. Better choices.</h2>
						</div>
						<div className="mt-12 grid gap-5 md:grid-cols-3">
							{[
								["01", "Send your brief", "Upload a plan or measurements and tell us your postcode, preferred look and budget."],
								["02", "We source & negotiate", "We approach suitable West Midlands fabricators, compare what is included and negotiate value."],
								["03", "Choose with confidence", "We present the strongest quotation options clearly, including the supplier behind each one."],
							].map(([n, title, copy], i) => (
								<article key={n} className={`rounded-3xl border p-7 ${i === 1 ? "border-[#cdbb98] bg-[#f1eadf]" : "border-black/10 bg-[#fbfaf7]"}`}>
									<span className="text-xs font-bold tracking-[.2em] text-[#8b7653]">{n}</span>
									<h3 className="mt-5 text-xl font-semibold">{title}</h3>
									<p className="mt-3 text-sm leading-6 text-[#66716b]">{copy}</p>
								</article>
							))}
						</div>
					</div>
				</section>

				<section id="why" className="py-20 lg:py-24">
					<div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:px-8">
						<div>
							<p className="text-xs font-bold uppercase tracking-[.22em] text-[#8b7653]">Why StoneMatch</p>
							<h2 className="mt-3 font-serif text-4xl sm:text-5xl">Worktop quotes are rarely like-for-like.</h2>
							<p className="mt-6 text-lg leading-8 text-[#5e6963]">Thickness, edge profiles, sink cut-outs, drainer grooves, upstands, splashbacks, templating, installation and material grades can all affect the final price. We help make those differences visible.</p>
						</div>
						<div className="grid gap-4 sm:grid-cols-2">
							{[
								["Reputable fabricators", "We match projects with suitable suppliers operating across the West Midlands."],
								["Budget-first", "We look for the right product and specification for what you want to spend."],
								["Clear comparison", "We compare the complete scope rather than just the headline number."],
								["Negotiated for you", "We work to improve value before the quotations are presented to you."],
							].map(([title, copy]) => (
								<div key={title} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
									<span className="grid h-8 w-8 place-items-center rounded-full bg-[#e4eee9] font-bold text-[#17382f]">✓</span>
									<h3 className="mt-4 font-semibold">{title}</h3>
									<p className="mt-2 text-sm leading-6 text-[#66716b]">{copy}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				<section id="enquire" className="bg-[#17382f] py-20 text-white lg:py-24">
					<div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
						<div>
							<p className="text-xs font-bold uppercase tracking-[.22em] text-[#dccca9]">Free enquiry</p>
							<h2 className="mt-3 font-serif text-4xl sm:text-5xl">Tell us about your worktops.</h2>
							<p className="mt-6 leading-7 text-white/70">A rough kitchen plan or approximate measurements are enough to start. We’ll review the brief before approaching suitable suppliers.</p>
							<p className="mt-6 text-sm text-white/60">General enquiries: <a className="underline" href="mailto:Enquires@stonematch.co.uk">Enquires@stonematch.co.uk</a></p>
						</div>

						<form
							className="rounded-3xl bg-white p-6 text-[#18231f] sm:p-8"
							onSubmit={(event) => {
								event.preventDefault();
								setSubmitted(true);
							}}
						>
							<div className="grid gap-4 sm:grid-cols-2">
								<label className="text-sm font-semibold">Full name<input required name="name" className="mt-2 w-full rounded-xl border border-black/15 px-4 py-3 font-normal outline-none focus:border-[#8b7653]" /></label>
								<label className="text-sm font-semibold">Email<input required type="email" name="email" className="mt-2 w-full rounded-xl border border-black/15 px-4 py-3 font-normal outline-none focus:border-[#8b7653]" /></label>
								<label className="text-sm font-semibold">Phone<input required type="tel" name="phone" className="mt-2 w-full rounded-xl border border-black/15 px-4 py-3 font-normal outline-none focus:border-[#8b7653]" /></label>
								<label className="text-sm font-semibold">Postcode<input required name="postcode" className="mt-2 w-full rounded-xl border border-black/15 px-4 py-3 font-normal outline-none focus:border-[#8b7653]" /></label>
								<label className="text-sm font-semibold">Preferred material<select name="material" className="mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 font-normal">{materials.map((item) => <option key={item}>{item}</option>)}</select></label>
								<label className="text-sm font-semibold">Approx. budget<select name="budget" className="mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 font-normal">{budgets.map((item) => <option key={item}>{item}</option>)}</select></label>
							</div>
							<label className="mt-4 block text-sm font-semibold">Project details<textarea required name="details" rows={5} placeholder="Approximate sizes, island, sink, hob, upstands, splashbacks, colour/style and timescale..." className="mt-2 w-full rounded-xl border border-black/15 px-4 py-3 font-normal outline-none focus:border-[#8b7653]" /></label>
							<label className="mt-4 block rounded-2xl border border-dashed border-black/20 bg-[#faf9f6] p-4 text-sm font-semibold">Upload plan / sketch / measurements<input type="file" name="plans" multiple accept=".pdf,.jpg,.jpeg,.png,.heic" className="mt-3 block w-full text-sm font-normal" /></label>
							<label className="mt-5 flex items-start gap-3 text-xs leading-5 text-[#5d6863]"><input required type="checkbox" className="mt-1" /><span>I agree to StoneMatch contacting me about this enquiry and sharing relevant project information with selected suppliers for quotation purposes.</span></label>
							<button className="mt-6 w-full rounded-xl bg-[#17382f] px-6 py-3.5 font-semibold text-white hover:bg-[#214b40]" type="submit">Submit my enquiry</button>
							{submitted && <p className="mt-4 rounded-xl bg-[#e5f1ea] p-3 text-sm font-semibold text-[#20553f]">The enquiry form design is ready. Live CRM submission will be enabled when the Pipedrive connection is added.</p>}
						</form>
					</div>
				</section>

				<section id="faq" className="bg-white py-20 lg:py-24">
					<div className="mx-auto max-w-4xl px-5 lg:px-8">
						<p className="text-xs font-bold uppercase tracking-[.22em] text-[#8b7653]">FAQs</p>
						<h2 className="mt-3 font-serif text-4xl sm:text-5xl">A few useful answers.</h2>
						<div className="mt-10 space-y-3">
							{[
								["Is StoneMatch free for homeowners?", "Yes. There is no charge to submit your project or receive quotation options through StoneMatch."],
								["Do I need exact measurements?", "No. Approximate dimensions or a kitchen plan are enough to begin. Final fabrication measurements are confirmed by the chosen supplier."],
								["When will I see the supplier names?", "Supplier identities are shown when we present your quotation options, after the initial sourcing and comparison process."],
								["Which areas do you cover?", "StoneMatch is initially launching throughout the West Midlands, with wider coverage planned as the supplier network expands."],
							].map(([q, a]) => (
								<details key={q} className="rounded-2xl border border-black/10 bg-[#fbfaf7] px-5 py-4">
									<summary className="cursor-pointer font-semibold">{q}</summary>
									<p className="mt-3 text-sm leading-6 text-[#66716b]">{a}</p>
								</details>
							))}
						</div>
					</div>
				</section>
			</main>

			<footer className="bg-[#111916] py-10 text-white/65">
				<div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 sm:flex-row sm:items-end sm:justify-between lg:px-8">
					<div>
						<div className="flex items-center gap-3 text-white"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#d7c49b] text-xs font-bold text-[#17382f]">SM</span><span className="text-lg font-semibold">StoneMatch</span></div>
						<p className="mt-3 max-w-xl text-sm">Helping homeowners find reputable stone worktop suppliers and compare the right options for their project and budget.</p>
					</div>
					<div className="text-sm">Enquires@stonematch.co.uk<br />© 2026 StoneMatch</div>
				</div>
			</footer>
		</div>
	);
}
