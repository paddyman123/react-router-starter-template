import { Page } from "../components/site-shell";
import { partnerQuartz, type PartnerTier } from "../data/partner-range";

const ranges: {name: PartnerTier; tag: string; copy: string; pos: string}[] = [
 {name:"Contract",tag:"Simple. Versatile. Exceptional value.",copy:"An accessible collection of soft, easy-to-use colours designed to work beautifully across a wide range of kitchens.",pos:"Everyday simplicity"},
 {name:"Contract Plus",tag:"Popular designs. Excellent value.",copy:"Fast-moving colours chosen for customers who want current, versatile designs with an excellent balance of style and value.",pos:"Popular favourites"},
 {name:"Vital",tag:"Beautiful marble-inspired surfaces.",copy:"Popular marble effects with more distinctive movement and veining — ideal when you want the worktop to become part of the design.",pos:"Marble inspired"},
 {name:"Essence",tag:"Statement surfaces for exceptional spaces.",copy:"Our high-end collection of premium marble effects and statement designs for kitchens where the surface deserves to take centre stage.",pos:"Premium collection"}
];

export function meta(){return [{title:"Partner Range Quartz | StoneMatch"},{name:"description",content:"Explore StoneMatch Partner Range quartz: Contract, Contract Plus, Vital and Essence, curated to make choosing your worktop simpler."}]}

export default function PartnerRange(){return <Page>
<section className="page-hero partner-hero"><div className="shell narrow"><p className="eyebrow">StoneMatch Partner Range · Quartz</p><h1>Four collections.<br/><em>One simpler choice.</em></h1><p className="lead">Our Partner Range is curated to take the guesswork out of choosing quartz. Start with the level and look that suits your project, then explore the colours within it.</p></div></section>
<section className="section light"><div className="shell"><div className="range-grid">{ranges.map((r,i)=>{
 const colours=partnerQuartz.filter(c=>c.tier===r.name);
 return <article className="range-card" key={r.name}><div className={`range-swatch swatch-${i+1}`}><span>{r.pos}</span></div><div className="range-card-copy"><p className="eyebrow dark">Partner Range</p><h2>{r.name}</h2><h3>{r.tag}</h3><p>{r.copy}</p><div className="colour-list">{colours.map(c=><span className="colour-chip" key={c.name}>{c.name}</span>)}</div><p><strong>{colours.length} curated colours</strong></p><a className="text-link" href="/worktop-matcher">Help me choose <span>→</span></a></div></article>
})}</div></div></section>
<section className="section cream-band"><div className="shell split"><div><p className="eyebrow dark">Not sure where to start?</p><h2>Let us <em>match you.</em></h2></div><div className="reason-copy dark-copy"><p>Answer a few quick questions about how you cook, the look you love and what matters most to you. We’ll recommend the material that best fits your needs.</p><a className="button gold" href="/worktop-matcher">Start the Worktop Matcher →</a></div></div></section>
</Page>}
