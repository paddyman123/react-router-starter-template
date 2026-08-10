const benefits = [
	["01", "Tell us what you want", "Share your measurements, inspiration, preferred colours and budget. Not sure what stone you need? That's exactly where we can help."],
	["02", "We match & negotiate", "We identify suitable materials and reputable fabricators for your project, then use our industry knowledge to help secure the right deal."],
	["03", "You choose with confidence", "Review the option that best fits your project and budget, knowing the hard work of comparing suppliers has already been done."],
];

const materials = ["Quartz", "Porcelain", "Granite", "Sintered Stone"];

export function Welcome({ message: _message }: { message: string }) {
	return (
		<main>
			<nav className="nav shell">
				<a className="brand" href="#top" aria-label="StoneMatch home">
					<span className="brand-mark">SM</span>
					<span><strong>STONE</strong>MATCH<small>STONE SOURCING, SIMPLIFIED.</small></span>
				</a>
				<div className="nav-links"><a href="#how">How it works</a><a href="#why">Why StoneMatch</a><a href="#enquire">Get matched</a></div>
			</nav>

			<section id="top" className="hero">
				<div className="hero-glow" />
				<div className="shell hero-grid">
					<div className="hero-copy">
						<p className="eyebrow">Independent stone matching service</p>
						<h1>Your perfect worktop.<br/><em>Matched.</em></h1>
						<p className="lead">What if finding the right stone, the right supplier and the right price didn't have to mean hours of searching and comparing quotes?</p>
						<p>Tell us about your project. We'll use our industry knowledge to match you with suitable stone and reputable suppliers — and help you get the best combination of quality, service and price.</p>
						<div className="hero-actions"><a className="button gold" href="#enquire">Start my StoneMatch</a><a className="text-link" href="#how">See how it works <span>→</span></a></div>
						<div className="trust"><span>✓ Reputable suppliers</span><span>✓ Expert stone guidance</span><span>✓ No obligation</span></div>
					</div>
					<div className="stone-card">
						<div className="stone-surface"><div className="vein v1"/><div className="vein v2"/><div className="vein v3"/></div>
						<div className="stone-caption"><small>YOUR PROJECT</small><strong>Matched around what matters to you.</strong><span>Style · Budget · Location · Timescale</span></div>
					</div>
				</div>
			</section>

			<section id="how" className="section light">
				<div className="shell"><p className="eyebrow dark">A simpler way to buy stone</p><h2>Imagine if you only had to explain<br/>your project <em>once.</em></h2><p className="section-intro">Instead of calling supplier after supplier, let StoneMatch do the legwork and narrow the market around you.</p>
					<div className="steps">{benefits.map(([n,t,d]) => <article className="step" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div>
				</div>
			</section>

			<section id="why" className="section dark-section">
				<div className="shell split"><div><p className="eyebrow">Why StoneMatch?</p><h2>Because the cheapest quote isn't always the <em>best deal.</em></h2></div><div className="reason-copy"><p>Perhaps you've already found a colour you love. Maybe you have a quote and want to know whether it's competitive. Or perhaps you're starting with nothing more than a budget.</p><p><strong>Either way, you're in the right place.</strong></p><p>StoneMatch is designed to help homeowners make a more informed choice by bringing product knowledge, supplier matching and commercial experience together in one place.</p><a className="text-link gold-text" href="#enquire">Tell us about your project <span>→</span></a></div></div>
				<div className="shell material-row">{materials.map(m => <span key={m}>{m}</span>)}</div>
			</section>

			<section id="enquire" className="section enquiry">
				<div className="shell enquiry-grid"><div><p className="eyebrow dark">Let's find your match</p><h2>What would the right worktop look like for <em>you?</em></h2><p>Send us the basics and we'll take it from there. If you already have plans, measurements or a quote, even better.</p><div className="callout"><strong>Not sure what to ask for?</strong><span>Don't worry. That's what we're here for.</span></div></div>
					<form className="match-form" action="mailto:enquiries@stonematch.co.uk" method="post" encType="text/plain">
						<label>Your name<input name="name" required placeholder="First and last name"/></label>
						<div className="form-row"><label>Email<input type="email" name="email" required placeholder="you@email.com"/></label><label>Phone<input type="tel" name="phone" placeholder="Best contact number"/></label></div>
						<label>Postcode<input name="postcode" required placeholder="Where is the project?"/></label>
						<label>What can we help with?<textarea name="project" rows={4} placeholder="Tell us about the stone, colour, budget, measurements or quotes you already have..."/></label>
						<button className="button gold" type="submit">Match my project →</button><small>By submitting, you're simply asking us to review your project. There's no obligation to proceed.</small>
					</form></div>
			</section>

			<footer><div className="shell footer-inner"><div className="brand"><span className="brand-mark">SM</span><span><strong>STONE</strong>MATCH<small>STONE SOURCING, SIMPLIFIED.</small></span></div><p>The right stone. The right supplier. <strong>The right price.</strong></p><span>© 2026 StoneMatch</span></div></footer>
		</main>
	);
}
