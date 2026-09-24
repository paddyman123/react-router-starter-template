import { MatchWizard } from "../components/match-wizard";
import { Brand, PrimaryTabs, Footer } from "../components/site-shell";

const benefits=[
["01","Send us what you have","A retailer quote, kitchen plan, measurements or simply the worktop you want."],
["02","We find the saving","We compare suitable stone, specification and fabrication routes to find better installed value."],
["03","You choose","See the option and the saving before you decide. No pressure and no obligation."]
];

export function Welcome({message:_message}:{message:string}){return <main>
<header className="site-header home-header"><nav className="nav shell home-nav"><Brand/><div className="nav-links"><a className="shortlist-nav" href="/shortlist">Shortlist</a><a className="start-match" href="/guides/check-my-worktop-quote#check-my-quote">£ See how much I can save</a></div></nav><div className="shell"><PrimaryTabs/></div></header>

<section id="top" className="hero"><div className="hero-glow"/><div className="shell hero-grid"><div className="hero-copy"><p className="eyebrow">Save on your new stone worktops</p><h1>Don’t overpay for<br/><em>your worktops.</em></h1><p className="lead">StoneMatch helps homeowners get the stone they want for less. Send us your quote, plans or measurements and we'll compare the market to find a better-value installed option.</p><div className="hero-actions"><a className="button gold" href="/guides/check-my-worktop-quote#check-my-quote">£ See how much I can save →</a><a className="text-link" href="/materials">Explore materials <span>→</span></a></div><div className="trust"><span>✓ Free for homeowners</span><span>✓ Better-value options</span><span>✓ No obligation</span></div></div><div className="stone-card"><div className="stone-surface"><div className="vein v1"/><div className="vein v2"/><div className="vein v3"/></div><div className="stone-caption"><small>REAL STONEMATCH SAVING</small><strong>£3,600 quote → £2,200</strong><span>£1,400 saved · Full splashback included</span></div></div></div></section>

<section id="how" className="section light"><div className="shell"><p className="eyebrow dark">How it works</p><h2>Three steps.<br/><em>One aim: save you money.</em></h2><div className="steps">{benefits.map(([n,t,d])=><article className="step" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></div></section>

<section id="why" className="section dark-section"><div className="shell split"><div><p className="eyebrow">Why StoneMatch?</p><h2>Same kitchen.<br/><em>Smarter way to buy.</em></h2></div><div className="reason-copy"><p>Kitchen retailers can add margin between you and the company actually making and fitting the stone.</p><p><strong>StoneMatch helps you access better-value routes while still comparing the material, fabrication and installation properly.</strong></p><a className="text-link gold-text" href="/why-stonematch">Why use StoneMatch? <span>→</span></a></div></div></section>

<section className="section light"><div className="shell split"><div><p className="eyebrow dark">Our promise</p><h2>The goal is simple.<br/><em>Keep more of your money.</em></h2></div><div className="reason-copy dark-copy"><p>If we can find a better-value route, we'll show you the difference. If your existing deal is already strong, we'll tell you that too.</p><a className="button gold" href="/guides/check-my-worktop-quote#check-my-quote">£ See how much I can save →</a></div></div></section>

<section id="enquire" className="section enquiry"><div className="shell enquiry-head"><p className="eyebrow dark">No quote? No problem.</p><h2>Let us find <em>your best-value route.</em></h2><p>Send us your plans, measurements or ideas and we'll compare suitable options for your project.</p></div><div className="shell"><MatchWizard/></div></section>
<Footer/>
</main>}