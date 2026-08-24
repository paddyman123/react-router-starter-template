import { MatchWizard } from "../components/match-wizard";

const benefits = [
	["01", "Send us what you have", "Already have a quote? Send us the details and we'll help you sense-check the material, specification and price. Starting from scratch? Tell us what you want instead."],
	["02", "We check, match & negotiate", "We use industry knowledge to identify suitable materials and reputable fabricators, compare the brief like-for-like and help secure the right deal."],
	["03", "You choose with confidence", "If your existing option looks strong, we'll say so. If we believe there is a better route, we'll show you the alternative."],
];

const materials = ["Quartz", "Porcelain / Sintered Stone", "Marble", "Granite"];

export function Welcome({ message: _message }: { message: string }) {
	return (
		<main>
			<nav className="nav shell">
				<a className="brand" href="#top" aria-label="StoneMatch home"><span className="brand-mark">SM</span><span><strong>STONE</strong>MATCH<small>STONE SOURCING, SIMPLIFIED.</small></span></a>
				<div className="nav-links"><a href="/how-it-works">How it works</a><a href="/about">About</a><a href="/suppliers">For suppliers</a><a href="#enquire">Check my quote</a></div>
			</nav>

			<section id="top" className="hero"><div className="hero-glow"/><div className="shell hero-grid"><div className="hero-copy"><p className="eyebrow">Independent worktop sourcing & quote check</p><h1>Before you buy your worktops.<br/><em>StoneMatch them.</em></h1><p className="lead">Already have a worktop quote? Let us check it before you pay the deposit. Starting from scratch? We'll help you find the right stone and fabricator.</p><p>StoneMatch uses industry knowledge and a network of reputable fabricators to help you make a better-informed choice on material, supplier and price.</p><div className="hero-actions"><a className="button gold" href="#enquire">Check my worktop quote</a><a className="text-link" href="#enquire">Find my worktop <span>→</span></a></div><div className="trust"><span>✓ Free for homeowners</span><span>✓ Reputable fabricators</span><span>✓ No obligation</span></div></div><div className="stone-card"><div className="stone-surface"><div className="vein v1"/><div className="vein v2"/><div className="vein v3"/></div><div className="stone-caption"><small>THE STONEMATCH QUOTE CHECK</small><strong>Got a quote? Check it before you commit.</strong><span>Material · Specification · Fabrication · Price</span></div></div></div></section>

			<section id="how" className="section light"><div className="shell"><p className="eyebrow dark">A smarter way to buy stone</p><h2>One conversation before<br/>you make a <em>big decision.</em></h2><p className="section-intro">Perhaps you've already been quoted. Perhaps you've only saved a kitchen on Instagram. Either way, you don't need to spend hours calling fabricators and trying to compare different specifications yourself.</p><div className="steps">{benefits.map(([n,t,d]) => <article className="step" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></div></section>

			<section id="why" className="section dark-section"><div className="shell split"><div><p className="eyebrow">Why check first?</p><h2>I'm not saying your quote is expensive…<br/><em>but wouldn't it make sense to check?</em></h2></div><div className="reason-copy"><p>Two worktop quotations can look similar while including different materials, fabrication details, installation standards and levels of service.</p><p><strong>StoneMatch is about better value — not simply finding the cheapest number.</strong></p><p>Send us the quote you already have, or tell us about your project. We'll use product knowledge, supplier matching and commercial experience to help you understand your options before you commit.</p><a className="text-link gold-text" href="#enquire">Check my quote <span>→</span></a></div></div><div className="shell material-row">{materials.map(m => <span key={m}>{m}</span>)}</div></section>

			<section className="section light"><div className="shell split"><div><p className="eyebrow dark">The StoneMatch promise</p><h2>If you've got a good deal,<br/><em>we'll tell you.</em></h2></div><div className="reason-copy"><p>Our job isn't to talk you out of a good quotation. It's to help you understand whether the stone, specification, supplier and price make sense for your project.</p><p>And if we believe there is a more suitable option, we'll explain why.</p><a className="button gold" href="#enquire">Send my quote for checking</a></div></div></section>

			<section id="enquire" className="section enquiry"><div className="shell enquiry-head"><p className="eyebrow dark">Free StoneMatch quote check</p><h2>Before you commit,<br/><em>wouldn't it make sense to check?</em></h2><p>Already have a quote? Add the supplier, material and price below. Starting from scratch is fine too. It takes around two minutes and there's no obligation.</p></div><div className="shell"><MatchWizard/></div></section>

			<footer><div className="shell footer-inner"><div className="brand"><span className="brand-mark">SM</span><span><strong>STONE</strong>MATCH<small>STONE SOURCING, SIMPLIFIED.</small></span></div><p>Before you buy it. <strong>StoneMatch it.</strong></p><span>© 2026 StoneMatch</span></div></footer>
		</main>
	);
}
