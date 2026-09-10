import { Page } from "../components/site-shell";

const suppliers=[
 ["The Marble & Granite Centre","https://www.themarbleandgranitecentre.co.uk/"],
 ["Brachot","https://www.brachot.com/"],
 ["Imperial Stone Group","https://www.imperialstonegroup.com/"],
 ["Gerald Culliford","https://geraldculliford.co.uk/"],
 ["Develli","https://develli.co.uk/"]
];

export function meta(){return [
 {title:"Marble Worktops | Natural Stone | StoneMatch"},
 {name:"description",content:"Explore marble worktops with StoneMatch. Understand finishes, care, slab selection and how we compare the complete templated, fabricated and installed option."}
]}

export default function Marble(){return <Page>
<section className="page-hero"><div className="shell narrow"><p className="eyebrow">StoneMatch · Natural Stone</p><h1>Marble worktops.<br/><em>Chosen by the slab.</em></h1><p className="lead">Marble is natural, expressive and completely individual. StoneMatch helps you choose the exact slab, understand how it will behave in a kitchen and compare the complete templated, fabricated and installed proposition.</p><div className="colour-actions"><a className="button gold" href="/?material=Marble#enquire">Get a Marble quote →</a><a className="text-link light-link" href="/materials">Compare materials →</a></div></div></section>
<section className="section light"><div className="shell split"><div><p className="eyebrow dark">Why Marble</p><h2>Natural movement.<br/><em>No two slabs alike.</em></h2></div><div className="reason-copy dark-copy"><p>Marble delivers the depth, movement and variation that engineered surfaces try to recreate. Veining, tone and mineral detail are unique to each slab, which is why StoneMatch recommends selecting the actual material rather than relying on a small sample.</p><p>It is also a material that rewards informed ownership. Marble can etch when exposed to acids and may mark or patinate over time. For many clients that evolving character is part of the appeal; for others, Quartz or Porcelain may be a better fit.</p></div></div></section>
<section className="section cream-band"><div className="shell"><p className="eyebrow dark">Specification</p><h2>What to <em>consider.</em></h2><div className="material-choices"><div className="material-choice dark"><small>Selection</small><strong>Exact slab</strong><span>View and reserve the individual slab wherever possible so you know the precise veining and colour you are buying.</span></div><div className="material-choice"><small>Finish</small><strong>Polished or honed</strong><span>Finish affects appearance, feel and how marks present. Availability depends on the chosen stone and slab.</span></div><div className="material-choice"><small>Thickness</small><strong>Project dependent</strong><span>Common worktop specifications are assessed against the selected slab, edge detail and fabrication requirements.</span></div><div className="material-choice"><small>Care</small><strong>Natural character</strong><span>Sealing, sensible cleaning and realistic expectations around etching and patina are important with marble.</span></div></div></div></section>
<section className="section dark-section"><div className="shell split"><div><p className="eyebrow">Choose your slab</p><h2>See the stone.<br/><em>Reserve the one you love.</em></h2></div><div className="reason-copy"><p>Visit a specialist natural-stone supplier, photograph the slab and capture its block or reference number. Send that to StoneMatch and we can help coordinate availability, fabrication and the installed quotation around your project.</p><p><strong>For natural stone, the exact slab matters more than the brand name.</strong></p></div></div><div className="shell supplier-links">{suppliers.map(([name,url])=><a href={url} target="_blank" rel="noreferrer" key={name}>{name}<span>↗</span></a>)}</div></section>
<section className="section light"><div className="shell split"><div><p className="eyebrow dark">StoneMatch it</p><h2>Already found<br/><em>your Marble?</em></h2></div><div className="reason-copy dark-copy"><p>Send us the slab details, a kitchen plan or an existing worktop quotation. We will compare the specification, fabrication requirements and complete installed price before you commit.</p><a className="button gold" href="/?material=Marble#enquire">Start my match →</a></div></div></section>
</Page>}
