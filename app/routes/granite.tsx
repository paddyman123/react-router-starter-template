import { Page } from "../components/site-shell";

const suppliers=[
 ["The Marble & Granite Centre","https://www.themarbleandgranitecentre.co.uk/"],
 ["Brachot","https://www.brachot.com/"],
 ["Imperial Stone Group","https://www.imperialstonegroup.com/"],
 ["Gerald Culliford","https://geraldculliford.co.uk/"],
 ["Develli","https://develli.co.uk/"]
];

export function meta(){return [
 {title:"Granite Worktops | Natural Stone | StoneMatch"},
 {name:"description",content:"Explore granite worktops with StoneMatch. Compare natural slabs, finishes, practical considerations and the complete templated, fabricated and installed option."}
]}

export default function Granite(){return <Page>
<section className="page-hero"><div className="shell narrow"><p className="eyebrow">StoneMatch · Natural Stone</p><h1>Granite worktops.<br/><em>Natural and hard-wearing.</em></h1><p className="lead">Granite combines the individuality of natural stone with excellent everyday durability. StoneMatch helps you choose the exact slab and compare the complete templated, fabricated and installed proposition.</p><div className="colour-actions"><a className="button gold" href="/?material=Granite#enquire">Get a Granite quote →</a><a className="text-link light-link" href="/materials">Compare materials →</a></div></div></section>
<section className="section light"><div className="shell split"><div><p className="eyebrow dark">Why Granite</p><h2>Built by nature.<br/><em>Made for real kitchens.</em></h2></div><div className="reason-copy dark-copy"><p>Granite is valued for strength, heat resistance and distinctive natural pattern. Depending on the stone, the look can range from quiet and consistent to dramatic movement, crystals and bold mineral detail.</p><p>Because every block is natural, samples and photographs are only a guide. StoneMatch recommends viewing the actual slab for highly figured colours and confirming the fabrication specification before ordering.</p></div></div></section>
<section className="section cream-band"><div className="shell"><p className="eyebrow dark">Specification</p><h2>What to <em>consider.</em></h2><div className="material-choices"><div className="material-choice dark"><small>Selection</small><strong>Natural slab</strong><span>Colour, movement and mineral structure vary naturally. Select the exact slab when variation matters to the design.</span></div><div className="material-choice"><small>Performance</small><strong>Hard-wearing</strong><span>Granite is a strong practical worktop material, but care requirements still vary with the particular stone and finish.</span></div><div className="material-choice"><small>Finish</small><strong>Multiple options</strong><span>Polished is common, with honed, leathered or textured finishes available on selected granites.</span></div><div className="material-choice"><small>Fabrication</small><strong>Plan the details</strong><span>Cut-outs, joints, edge profiles, overhangs and slab yield all contribute to the finished appearance and price.</span></div></div></div></section>
<section className="section dark-section"><div className="shell split"><div><p className="eyebrow">Choose your slab</p><h2>Find the stone.<br/><em>Then StoneMatch it.</em></h2></div><div className="reason-copy"><p>Visit a specialist supplier and note the slab or block reference for the granite you prefer. StoneMatch can then help coordinate the material with an appropriate fabricator and compare the complete installed quotation.</p><p><strong>We compare the finished worktop proposition — not simply a square-metre slab price.</strong></p></div></div><div className="shell supplier-links">{suppliers.map(([name,url])=><a href={url} target="_blank" rel="noreferrer" key={name}>{name}<span>↗</span></a>)}</div></section>
<section className="section light"><div className="shell split"><div><p className="eyebrow dark">StoneMatch it</p><h2>Already found<br/><em>your Granite?</em></h2></div><div className="reason-copy dark-copy"><p>Send us the slab details, kitchen plan or existing quotation. We will help compare the material, fabrication specification and complete installed price before you commit.</p><a className="button gold" href="/?material=Granite#enquire">Start my match →</a></div></div></section>
</Page>}
