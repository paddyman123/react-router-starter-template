import { ProjectCaseStudy } from "../components/case-study";
import { MatchWizard } from "../components/match-wizard";
import { Reviews } from "../components/reviews";
import { Brand, PrimaryTabs, Footer } from "../components/site-shell";

const benefits=[
["01","Send the quote you hold","A retailer or fabricator quote is ideal. A plan or a few measurements will do if you are earlier than that."],
["02","We compare like for like","Material, thickness, edges, cut-outs, fabrication and fitting. The headline price is only part of the job."],
["03","You decide","No deposit to StoneMatch, and no obligation. If the quote you have is already fair, we'll say so."]
];

export function Welcome({message:_message}:{message:string}){return <main>
<header className="site-header home-header"><nav className="nav shell home-nav"><Brand/><div className="nav-links"><a className="shortlist-nav" href="/shortlist/">Shortlist</a><a className="start-match" href="/check-my-quote/">Check my quote</a></div></nav><div className="shell"><PrimaryTabs/></div></header>

<section id="top" className="hero"><div className="hero-glow"/><div className="shell hero-grid"><div className="hero-copy"><p className="eyebrow">Independent quote check</p><h1>Check your quote<br/><em>before you pay a deposit.</em></h1><p className="lead">An independent, free, like-for-like look at the Quartz, Porcelain, Granite or Marble price you already hold — before it turns into a deposit.</p><div className="hero-actions"><a className="button gold" href="/check-my-quote/">Check my quote →</a><a className="text-link" href="/check-my-quote/">No quote yet? Start here <span>→</span></a></div><div className="trust"><span>✓ Independent</span><span>✓ Free, no deposit</span><span>✓ Like for like</span><span>✓ No obligation</span></div><p className="hero-support">Don't overpay is still the point. It just isn't the whole sentence. The same kitchen can hide a different thickness, a missing splashback or a fitting cost that never made the first page. If we can find a stronger route, we'll show you. If your quote is already fair, we'll say so.</p></div></div></section>

<section id="how" className="section light"><div className="shell"><p className="eyebrow dark">How it works</p><h2>Three steps.<br/><em>Before the deposit.</em></h2><div className="steps">{benefits.map(([n,t,d])=><article className="step" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></div></section>
<ProjectCaseStudy/>
<Reviews/>


<section className="section light"><div className="shell split"><div><p className="eyebrow dark">Stone kitchen worktops</p><h2>Find the right surface.<br/><em>Then compare the finished job.</em></h2><p><a className="button gold" href="/materials/">Compare stone worktop materials →</a></p></div><div className="reason-copy dark-copy"><p><a className="text-link" href="/materials/quartz/">Quartz worktops →</a><br/>Explore engineered stone designs, brands and the details that affect your quotation.</p><p><a className="text-link" href="/materials/porcelain/">Porcelain worktops →</a><br/>Compare Porcelain and sintered surfaces, thicknesses and fabrication options.</p><p><a className="text-link" href="/materials/granite/">Granite worktops →</a><br/>Choose natural stone by the exact slab and confirm the complete installed specification.</p><p><a className="text-link" href="/materials/marble/">Marble worktops →</a><br/>Explore individual natural slabs and understand care and finish before you order.</p><p>Not sure where to start? <a href="/worktop-matcher/">Use the Worktop Matcher</a>, or read <a href="/guides/how-to-compare-worktop-quotes/">what to include when comparing worktop quotes</a>.</p></div></div></section>
<section id="why" className="section dark-section"><div className="shell split"><div><p className="eyebrow">Why StoneMatch?</p><h2>Same kitchen.<br/><em>Smarter way to buy.</em></h2></div><div className="reason-copy"><p>Kitchen retailers can add margin between you and the company actually making and fitting the stone.</p><p><strong>StoneMatch helps you access better-value routes while still comparing the material, fabrication and installation properly.</strong></p><a className="text-link gold-text" href="/why-stonematch/">Why use StoneMatch? <span>→</span></a></div></div></section>

<section className="section cream-band"><div className="shell split"><div><p className="eyebrow dark">Independent worktop guidance</p><h2>It's not just about<br/><em>finding a lower price.</em></h2></div><div className="reason-copy dark-copy"><p><strong>It's about knowing what you're paying for.</strong></p><p>Material · Thickness · Edge detail · Finish · Fabrication · Installation.</p><p>StoneMatch helps you get the specification right before comparing the price — so you know where it's worth spending extra and where it isn't.</p><a className="text-link" href="/guides/worktop-edge-profiles/">Explore worktop edge profiles <span>→</span></a></div></div></section>

<section className="section light"><div className="shell split"><div><p className="eyebrow dark">Our promise</p><h2>The goal is simple.<br/><em>Keep more of your money.</em></h2></div><div className="reason-copy dark-copy"><p>If we can find a better-value route, we'll show you the difference. If your existing deal is already strong, we'll tell you that too.</p><a className="button gold" href="/check-my-quote/">Check my quote →</a></div></div></section>

<section id="enquire" className="section enquiry"><div className="shell enquiry-head"><p className="eyebrow dark">No quote? No problem.</p><h2>Let us find <em>your best-value route.</em></h2><p>Send us your plans, measurements or ideas and we'll compare suitable options for your project.</p></div><div className="shell"><MatchWizard/></div></section>
<Footer/>
</main>}