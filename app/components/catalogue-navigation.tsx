type Crumb = { name: string; href: string };
export function CatalogueBreadcrumbs({ items }: { items: Crumb[] }) {
 const schema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: "https://stonematch.co.uk" + item.href })) };
 return <div className="cream-band"><div className="shell" style={{paddingTop:16,paddingBottom:16}}><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/><nav aria-label="Breadcrumb"><ol style={{display:"flex",flexWrap:"wrap",gap:12,listStyle:"none",padding:0,margin:0}}>{items.map((item,i)=><li key={item.href}>{i>0&&<span aria-hidden="true">› </span>}{i===items.length-1?<span aria-current="page">{item.name}</span>:<a href={item.href}>{item.name}</a>}</li>)}</ol></nav></div></div>;
}
export function CatalogueBuyingGuides({ material }: { material: "Quartz" | "Porcelain" }) {
 const links = material === "Quartz" ? [
  ["Understand Quartz worktop costs", "/guides/how-much-do-quartz-worktops-cost/"],
  ["Choose 20mm or 30mm Quartz", "/guides/20mm-vs-30mm-quartz-worktops/"],
  ["Quartz cleaning and care", "/guides/quartz-worktop-care/"],
 ] : [
  ["Porcelain advantages and limitations", "/guides/porcelain-worktops-pros-cons/"],
  ["Plan waterfall ends and mitred build-ups", "/guides/waterfall-ends-mitred-build-ups/"],
  ["Porcelain cleaning and care", "/guides/porcelain-worktop-care/"],
 ];
 return <section className="section cream-band"><div className="shell"><p className="eyebrow dark">Before choosing {material}</p><h2>Compare the specification as well as the colour.</h2><p className="section-intro">Use these guides to plan the finished worktop and understand the details to include in your quotation.</p><div className="material-choices">{links.map(([title,href])=><a className="material-choice" href={href} key={href}><strong>{title}</strong><small>Read guide →</small></a>)}</div><p><a className="text-link" href="/guides/how-to-compare-worktop-quotes/">Compare complete installed quotations →</a></p><a className="button gold" href="/guides/check-my-worktop-quote/#check-my-quote">Upload my kitchen plan & quote →</a></div></section>;
}
