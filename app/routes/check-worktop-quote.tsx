import { Page } from "../components/site-shell";
import { MatchWizard } from "../components/match-wizard";

export function meta(){return [{title:"Save Money on Your Worktop Quote | StoneMatch"},{name:"description",content:"Already have a kitchen worktop quote or kitchen plan? Send it to StoneMatch and see whether we can find a better-value route for the complete installed job."}]}

export default function CheckWorktopQuote(){return <Page>
<section className="page-hero"><div className="shell narrow">
<p className="eyebrow">Your StoneMatch Saving</p>
<h1>Already got a worktop quote?<br/><em>See if we can beat the value.</em></h1>
<p className="lead">Send us what you've been quoted. We'll compare suitable routes for the stone, specification, fabrication and installation and show you if there is a better-value option.</p>
<a className="button gold" href="#check-my-quote">See how much I could save →</a>
<div className="trust"><span>✓ Free for homeowners</span><span>✓ No obligation</span><span>✓ Clear, like-for-like comparison</span></div>
</div></section>

<section className="section light"><div className="shell split">
<div><p className="eyebrow dark">Why compare properly?</p><h2>A worktop quote is more<br/><em>than one number.</em></h2></div>
<div className="reason-copy dark-copy">
<p><strong>Material:</strong> Is the exact brand, colour and surface clear?</p>
<p><strong>Specification:</strong> Are thickness, edges, upstands, splashbacks, cut-outs, drainer grooves and feature details included?</p>
<p><strong>Template & installation:</strong> Who measures, who fits, and are those costs included?</p>
<p><strong>Guarantee & aftercare:</strong> What happens after installation if you need help?</p>
</div></div></section>

<section className="section cream-band"><div className="shell split">
<div><p className="eyebrow dark">Our promise</p><h2>Already got a good deal?<br/><em>We'll tell you.</em></h2></div>
<div className="reason-copy dark-copy"><p>StoneMatch isn't here to change your choice for the sake of it. If what you already have looks right for your project, we'll say so. If there's a sensible alternative worth considering, we'll explain why.</p><p><strong>No pressure. No obligation. If we can find a better-value route, we'll show you. If your current deal is already strong, we'll tell you.</strong></p></div>
</div></section>

<section id="check-my-quote" className="section enquiry">
<div className="shell enquiry-head"><p className="eyebrow dark">Find your potential saving</p><h2>Send us what <em>you have.</em></h2><p>Already have a quotation? Add the details below. Only have kitchen plans or measurements? That's fine too. The form takes around two minutes.</p></div>
<div className="shell"><MatchWizard/></div>
</section>

<section className="section dark-section"><div className="shell split">
<div><p className="eyebrow">No quote yet?</p><h2>We can still find<br/><em>a better-value route.</em></h2></div>
<div className="reason-copy"><p>If you're still choosing the material, use the Worktop Matcher. If you already have kitchen plans, you can use the same StoneMatch enquiry to tell us what you're working with.</p><a className="text-link light-link" href="/worktop-matcher">Take the Worktop Matcher →</a><br/><a className="text-link light-link" href="/materials">Explore Quartz, Porcelain, Marble & Granite →</a></div>
</div></section>
</Page>}