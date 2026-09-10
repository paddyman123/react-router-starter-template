import { Page } from "../components/site-shell";
import { getPorcelainBrand } from "../data/porcelain-brands";

type BrandImage={src:string;alt:string;label:string};
const brandImages:Record<string,BrandImage[]>={
 "partner-range":[
  {src:"https://www.lamarceramics.co.uk/images/large-format-porcelain-slabs/ROME-A-scaled.jpg",alt:"Lamar Rome large-format porcelain slab",label:"Rome · official slab view"},
  {src:"https://www.lamarceramics.co.uk/images/large-format-porcelain-slabs/Taj-Mahal_MASTER-R1-600x300.jpg",alt:"Lamar Taj Mahal porcelain slab",label:"Taj Mahal · official slab view"},
  {src:"https://www.lamarceramics.co.uk/images/20mm-slab-tiles/NEW-DATA/CALACATTA-VIOLA-A.jpg",alt:"Lamar Calacatta Viola porcelain slab",label:"Calacatta Viola · official slab view"}
 ]
};
const inspirationLinks:Record<string,{href:string;label:string}>={
 dekton:{href:"https://www.cosentino.com/en-gb/dekton/worktops/",label:"See official Dekton worktop inspiration"},
 infinity:{href:"https://www.infinitysurfaces.it/en/",label:"Explore official Infinity surfaces"},
 marazzi:{href:"https://www.marazzi.it/en/",label:"Explore official Marazzi collections"},
 "atlas-plan":{href:"https://www.atlasplan.com/",label:"Explore official Atlas Plan surfaces"},
 uniceramica:{href:"https://uniceramica.co.uk/",label:"Explore official Uniceramica collection"},
 xtone:{href:"https://www.xtone-surface.com/",label:"Explore official XTONE surfaces"},
 sapienstone:{href:"https://www.sapienstone.com/",label:"Explore official SapienStone surfaces"}
};
export function meta({params}:any){const b=getPorcelainBrand(params.slug);return [{title:`${b?.name||"Porcelain"} Worktops | StoneMatch`},{name:"description",content:b?`Explore ${b.name} porcelain worktops with StoneMatch. Compare applications, specifications and the complete installed option.`:"Explore porcelain worktop brands with StoneMatch."}]}
export default function PorcelainBrand({params}:any){const b=getPorcelainBrand(params.slug);if(!b)return <Page><section className="page-hero"><div className="shell narrow"><p className="eyebrow">Porcelain catalogue</p><h1>Brand not found.</h1><a className="button gold" href="/materials/porcelain">Back to Porcelain →</a></div></section></Page>;
const images=brandImages[b.slug]||[];const inspiration=inspirationLinks[b.slug];
return <Page>
<section className="page-hero"><div className="shell narrow"><p className="eyebrow">StoneMatch · Porcelain</p><h1>{b.name}</h1><p className="lead">{b.strapline}</p><div className="colour-actions"><a className="button gold" href={`/?material=Porcelain&style=${encodeURIComponent(b.name)}#enquire`}>Get a {b.name} quote →</a><a className="text-link light-link" href="/materials/porcelain">Compare porcelain brands →</a></div></div></section>
{images.length>0&&<section className="section light"><div className="shell"><p className="eyebrow dark">See the surface</p><h2>Real slab <em>imagery.</em></h2><div className="brand-image-gallery">{images.map(image=><figure key={image.src}><img src={image.src} alt={image.alt} loading="lazy"/><figcaption>{image.label}</figcaption></figure>)}</div><p className="image-note">Official manufacturer slab imagery. Colour and pattern vary between production batches; StoneMatch confirms the exact selected surface before ordering.</p></div></section>}
<section className="section light"><div className="shell colour-layout"><div className="colour-visual">{images[0]?<figure className="brand-feature-image"><img src={images[0].src} alt={images[0].alt}/><figcaption>{images[0].label}</figcaption></figure>:<div className="brand-inspiration-panel"><small>OFFICIAL BRAND COLLECTION</small><h3>Explore {b.name}<br/>from the source.</h3><p>StoneMatch links to the manufacturer's current collection rather than displaying an unrelated slab or installation. Choose the colour you like and we will compare the complete installed option.</p>{inspiration&&<a className="button gold" href={inspiration.href} target="_blank" rel="noreferrer">{inspiration.label} ↗</a>}</div>}<p className="image-note">Choose the exact colour from the current manufacturer collection and StoneMatch will confirm its live specification before ordering.</p></div><div className="colour-spec"><p className="eyebrow dark">Brand overview</p><h2>Where it <em>fits.</em></h2><p>{b.summary}</p><dl><div><dt>Formats</dt><dd>{b.formats}</dd></div><div><dt>Thickness</dt><dd>{b.thicknesses}</dd></div><div><dt>Finishes</dt><dd>{b.finishes}</dd></div></dl><div className="spec-tags">{b.bestFor.map(x=><span key={x}>{x}</span>)}</div><p className="spec-note">{b.note}</p>{b.website&&<a className="text-link" href={b.website} target="_blank" rel="noreferrer">View the manufacturer's current collection ↗</a>}</div></div></section>
<section className="section cream-band"><div className="shell split"><div><p className="eyebrow dark">StoneMatch view</p><h2>The slab is only<br/><em>part of the decision.</em></h2></div><div className="reason-copy dark-copy"><p>Porcelain fabrication can vary significantly between suppliers. Edge construction, cut-outs, slab yield, pattern positioning, templating and installation all affect the finished result and price.</p><p><strong>StoneMatch compares the complete installed proposition — not simply the cost of the slab.</strong></p></div></div></section>
<section className="section dark-section"><div className="shell split"><div><p className="eyebrow">StoneMatch it</p><h2>Found a colour<br/><em>you love?</em></h2></div><div className="reason-copy"><p>Send us the brand and colour — or your existing kitchen worktop quotation. We can compare the material, specification, fabrication and installed price before you commit.</p><a className="button gold" href={`/?material=Porcelain&style=${encodeURIComponent(b.name)}#enquire`}>Start my match →</a></div></div></section>
</Page>}
