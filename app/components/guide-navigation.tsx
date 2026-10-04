import { useLocation } from "react-router";
const groups = {
 material: [
  ["Compare Quartz and Porcelain", "/guides/quartz-vs-porcelain-worktops/"],
  ["Compare Quartz and Granite", "/guides/quartz-vs-granite-worktops/"],
  ["Choose a worktop for a busy kitchen", "/guides/best-worktop-for-busy-kitchen/"],
  ["Porcelain advantages and limitations", "/guides/porcelain-worktops-pros-cons/"],
 ],
 price: [
  ["Understand Quartz worktop costs", "/guides/how-much-do-quartz-worktops-cost/"],
  ["Compare complete worktop quotations", "/guides/how-to-compare-worktop-quotes/"],
  ["Kitchen company or specialist route?", "/guides/kitchen-company-vs-direct-worktops/"],
  ["Plan thickness: 20mm or 30mm Quartz", "/guides/20mm-vs-30mm-quartz-worktops/"],
 ],
 design: [
  ["Plan sink cut-outs and drainer grooves", "/guides/sink-cut-outs-drainer-grooves/"],
  ["Check island sizes and overhangs", "/guides/kitchen-island-worktop-overhangs/"],
  ["Understand joins and slab layout", "/guides/worktop-joins-slab-layout/"],
  ["Waterfall ends and mitred build-ups", "/guides/waterfall-ends-mitred-build-ups/"],
 ],
 fitting: [
  ["Prepare for worktop templating", "/guides/kitchen-worktop-templating/"],
  ["Prepare for installation and handover", "/guides/stone-worktop-installation/"],
  ["Read Quartz cleaning and care advice", "/guides/quartz-worktop-care/"],
  ["Read Porcelain cleaning and care advice", "/guides/porcelain-worktop-care/"],
 ],
};
export function GuideNavigation() {
 const { pathname } = useLocation();
 const path = pathname.replace(/\/$/, "");
 const key = /care|templating|installation/.test(path) ? "fitting"
  : /quote|cost|price|company|worth/.test(path) ? "price"
  : /edge|ogee|splashback|upstand|waterfall|join|sink|island|20mm/.test(path) ? "design" : "material";
 const links = groups[key].filter(([, href]) => href.replace(/\/$/, "") !== path);
 return <section className="section cream-band"><div className="shell">
  <p className="eyebrow dark">Continue planning your worktops</p>
  <h2>What to check next</h2>
  <p className="section-intro">Use these related guides to refine your specification before comparing the complete installed price.</p>
  <div className="material-choices">{links.map(([title, href]) => <a className="material-choice" href={href} key={href}><strong>{title}</strong><small>Read guide →</small></a>)}</div>
  <p><a className="text-link" href="/guides/">Browse all StoneMatch worktop guides →</a></p>
 </div></section>;
}
