import { useEffect, useState } from "react";
import { Page } from "../components/site-shell";
import { partnerQuartz } from "../data/partner-range";

const slugify=(value:string)=>value.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");

export function meta({params}:any){
 const colour=partnerQuartz.find(c=>slugify(c.name)===params.slug);
 return [{title:`${colour?.name || "Partner Range Quartz"} | StoneMatch`},{name:"description",content:colour?`Explore ${colour.name}, a ${colour.tier} quartz from the StoneMatch Partner Range.`:"Explore StoneMatch Partner Range quartz."}];
}

export default function PartnerColour({params}:any){
 const colour=partnerQuartz.find(c=>slugify(c.name)===params.slug);
 const [saved,setSaved]=useState(false);
 useEffect(()=>{if(!colour)return;try{const list=JSON.parse(localStorage.getItem("stonematch-shortlist")||"[]");setSaved(list.includes(colour.name));}catch{setSaved(false)}},[colour?.name]);
 if(!colour)return <Page><section className="page-hero"><div className="shell narrow"><p className="eyebrow">Partner Range Quartz</p><h1>Colour not found.</h1><a className="button gold" href="/materials/quartz/partner-range">Back to Partner Range →</a></div></section></Page>;
 const toggle=()=>{let list:string[]=[];try{list=JSON.parse(localStorage.getItem("stonematch-shortlist")||"[]")}catch{}const next=list.includes(colour.name)?list.filter(x=>x!==colour.name):[...list,colour.name];localStorage.setItem("stonematch-shortlist",JSON.stringify(next));setSaved(next.includes(colour.name));window.dispatchEvent(new Event("stonematch-shortlist"));};
 const quoteHref=`/?material=Quartz&colour=${encodeURIComponent(colour.name)}&source=partner-range#enquire`;
 return <Page>
  <section className="page-hero colour-hero"><div className="shell narrow"><p className="eyebrow">Partner Range · {colour.tier}</p><h1>{colour.name}</h1><p className="lead">A curated StoneMatch quartz selected for its combination of design, practicality and value.</p><div className="colour-actions"><a className="button gold" href={quoteHref}>Get a quote in this colour →</a><button className="shortlist-button" onClick={toggle}>{saved?"♥ Saved to shortlist":"♡ Add to my shortlist"}</button></div>{saved&&<a className="text-link shortlist-view-link" href="/shortlist">View my shortlist →</a>}</div></section>
  <section className="section light"><div className="shell colour-layout"><div className="colour-visual"><div className="stone-preview"><span>{colour.name}</span></div><p className="image-note">Real project and slab imagery is being curated for this colour.</p></div><div className="colour-spec"><p className="eyebrow dark">StoneMatch recommendation</p><h2>Designed to make choosing <em>simpler.</em></h2><p>{colour.tags.includes("gold-veining")?"Warm gold veining gives this surface a luxurious marble-inspired character while retaining the everyday practicality of quartz.":colour.tags.includes("dramatic")?"A more expressive design for customers who want the worktop to become a defining feature of the room.":"A versatile surface chosen to work beautifully across a wide range of kitchen styles."}</p><dl><div><dt>Collection</dt><dd>{colour.tier}</dd></div><div><dt>Material</dt><dd>Quartz</dd></div>{colour.finish&&<div><dt>Finish</dt><dd>{colour.finish}</dd></div>}{colour.thicknesses&&<div><dt>Thickness</dt><dd>{colour.thicknesses.join(" · ")}</dd></div>}</dl><p className="spec-note">Final slab availability, finish and thickness are confirmed as part of your StoneMatch quotation.</p></div></div></section>
  <section className="section cream-band"><div className="shell split"><div><p className="eyebrow dark">Like this colour?</p><h2>Save it. Compare it. <em>StoneMatch it.</em></h2></div><div className="reason-copy dark-copy"><p>Add colours to your shortlist as you browse. When you're ready, send us your favourites and we'll help narrow them down around your kitchen, budget and priorities.</p><div className="colour-actions"><button className="button gold" onClick={toggle}>{saved?"Remove from shortlist":"Add to shortlist →"}</button><a className="text-link" href="/materials/quartz/partner-range">Explore more colours <span>→</span></a>{saved&&<a className="text-link" href="/shortlist">View shortlist <span>→</span></a>}</div></div></div></section>
 </Page>;
}
