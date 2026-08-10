import { Page } from "../components/site-shell";

export function meta(){return [{title:"How StoneMatch Works | StoneMatch"},{name:"description",content:"One enquiry. Expert stone guidance. Reputable supplier matching. See how StoneMatch simplifies buying your new worktops."}]}

const steps=[
["01","Tell us what matters","Start with whatever you have — measurements, a kitchen plan, inspiration photos, a stone name, an existing quote or simply a budget. The better we understand the outcome you want, the better we can match it."],
["02","We narrow the options","We look at your location, design, material preferences, timescale and budget to identify suitable stone choices and fabricators capable of delivering the project."],
["03","We use the market","Instead of you repeating the same conversation with multiple companies, StoneMatch can approach suitable suppliers and compare the overall proposition — not just the headline number."],
["04","You decide","We bring the strongest option back to you. You stay in control and choose whether you want to proceed. No pressure and no obligation."],
];

export default function HowItWorks(){return <Page><section className="page-hero"><div className="shell narrow"><p className="eyebrow">How StoneMatch works</p><h1>One conversation.<br/><em>A better way to buy stone.</em></h1><p className="lead">What if you could get the benefit of shopping around without doing all of the shopping around yourself?</p><a className="button gold" href="/#enquire">Start my StoneMatch</a></div></section><section className="section light"><div className="shell"><div className="long-steps">{steps.map(([n,t,d])=><article key={n}><span>{n}</span><div><h2>{t}</h2><p>{d}</p></div></article>)}</div></div></section><section className="section cream-band"><div className="shell split"><div><p className="eyebrow dark">What we compare</p><h2>Price matters.<br/><em>So does everything around it.</em></h2></div><div className="reason-copy dark-copy"><p>A worktop quote is only good value if the material, fabrication, templating, installation and aftercare are right for the project.</p><p>StoneMatch is designed to consider the whole proposition so you can make a more informed decision.</p><a className="text-link" href="/#enquire">Tell us what you're looking for →</a></div></div></section></Page>}
