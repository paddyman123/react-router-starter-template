import { useEffect, useMemo, useState } from "react";
import { Page } from "../components/site-shell";
import { partnerQuartz } from "../data/partner-range";

const slugify=(value:string)=>value.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");

export function meta(){return [{title:"Your StoneMatch Shortlist | StoneMatch"},{name:"description",content:"Review the StoneMatch colours you have shortlisted and send them with your enquiry."}]}

export default function Shortlist(){
 const [names,setNames]=useState<string[]>([]);
 useEffect(()=>{const sync=()=>setNames(JSON.parse(localStorage.getItem("stonematch-shortlist")||"[]"));sync();window.addEventListener("stonematch-shortlist",sync);return()=>window.removeEventListener("stonematch-shortlist",sync);},[]);
 const colours=useMemo(()=>names.map(n=>partnerQuartz.find(c=>c.name===n)).filter(Boolean),[names]);
 const remove=(name:string)=>{const next=names.filter(x=>x!==name);localStorage.setItem("stonematch-shortlist",JSON.stringify(next));setNames(next);window.dispatchEvent(new Event("stonematch-shortlist"));};
 const enquiryHref=`/?shortlist=${encodeURIComponent(names.join(", "))}#enquiry`;
 return <Page>
  <section className="page-hero"><div className="shell narrow"><p className="eyebrow">Your StoneMatch Shortlist</p><h1>Save your favourites.<br/><em>Then let us narrow them down.</em></h1><p className="lead">Compare the colours that caught your eye, then send your shortlist to StoneMatch with your enquiry.</p></div></section>
  <section className="section light"><div className="shell">{colours.length===0?<div className="empty-shortlist"><p className="eyebrow dark">Nothing saved yet</p><h2>Start with the <em>Partner Range.</em></h2><p>Tap “Add to my shortlist” on any colour you like. Your favourites will stay saved while you browse.</p><a className="button gold" href="/materials/quartz/partner-range">Explore Partner Range →</a></div>:<><div className="shortlist-grid">{colours.map((colour:any)=><article className="shortlist-card" key={colour.name}><a href={`/materials/quartz/partner-range/${slugify(colour.name)}`}><div className="mini-stone"><span>{colour.name}</span></div></a><div className="shortlist-copy"><p className="eyebrow dark">{colour.tier}</p><h3><a href={`/materials/quartz/partner-range/${slugify(colour.name)}`}>{colour.name}</a></h3><p>{colour.tags.slice(0,3).join(" · ")}</p><button onClick={()=>remove(colour.name)}>Remove</button></div></article>)}</div><div className="shortlist-send"><div><p className="eyebrow dark">Ready for us to help?</p><h2>Send your shortlist to <em>StoneMatch.</em></h2><p>We'll review the colours you've selected alongside your kitchen, budget and priorities and help you narrow down the best fit.</p></div><a className="button gold" href={enquiryHref}>Send my shortlist →</a></div></>}</div></section>
 </Page>;
}
