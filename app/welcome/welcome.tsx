import { MatchWizard } from "../components/match-wizard";
import { Brand, PrimaryTabs, Footer } from "../components/site-shell";

const benefits=[
["01","Send it","Upload your existing quote, plan or measurements — or simply tell us what you need."],
["02","We StoneMatch it","We check the material, specification, fabricator and price against suitable alternatives."],
["03","You decide","Keep the deal you have or choose a better-fit option. No pressure and no obligation."]
];

export function Welcome({message:_message}:{message:string}){return <main>
<header className="site-header home-header"><nav className="nav shell home-nav"><Brand/><div className="nav-links"><a className="shortlist-nav" href="/shortlist">Shortlist</a><a className="start-match" href="#enquire">Start my match</a></div></nav><div className="shell"><PrimaryTabs/></div></header>

<section id="top" className="hero"><div className="hero-glow"/><div className="shell hero-grid"><div className="hero-copy"><p className="eyebrow">Independent worktop quote check & sourcing</p><h1>Before you buy your worktops.<br/><em>StoneMatch them.</em></h1><p className="lead">Got a quote? We'll check the stone, specification, supplier and price before you commit. No quote yet? We'll help you find the right option.</p><div className="hero-actions"><a className="button gold" href="#enquire">Check my quote</a><a className="text-link" href="/materials">Explore materials <span>→</span></a></div><div className="trust"><span>✓ Free for homeowners</span><span>✓ Independent guidance</span><span>✓ No obligation</span></div></div><div className="stone-card"><div className="stone-surface"><div className="vein v1"/><div className="vein v2"/><div className="vein v3"/></div><div className="stone-caption"><small>THE STONEMATCH CHECK</small><strong>Check before you commit.</strong><span>Stone · Specification · Supplier · Price</span></div></div></div></section>

<section id="how" className="section light"><div className="shell"><p className="eyebrow dark">How it works</p><h2>Three steps.<br/><em>One better-informed decision.</em></h2><div className="steps">{benefits.map(([n,t,d])=><article className="step" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></div></section>

<section id="why" className="section dark-section"><div className="shell split"><div><p className="eyebrow">Why StoneMatch?</p><h2>A worktop quote is more<br/>than <em>just a price.</em></h2></div><div className="reason-copy"><p>Material, fabrication, installation and service can vary significantly between quotes.</p><p><strong>We help you compare like-for-like and understand where the real value is.</strong></p><a className="text-link gold-text" href="/about">Why use StoneMatch? <span>→</span></a></div></div></section>

<section className="section light"><div className="shell split"><div><p className="eyebrow dark">Our promise</p><h2>Already got a good deal?<br/><em>We'll tell you.</em></h2></div><div className="reason-copy dark-copy"><p>We're here to help you make the right choice, not simply sell you a different one.</p><a className="button gold" href="#enquire">StoneMatch my quote</a></div></div></section>

<section id="enquire" className="section enquiry"><div className="shell enquiry-head"><p className="eyebrow dark">Free quote check</p><h2>Ready to <em>StoneMatch it?</em></h2><p>Send us what you have. It takes around two minutes and there's no obligation.</p></div><div className="shell"><MatchWizard/></div></section>
<Footer/>
</main>}
