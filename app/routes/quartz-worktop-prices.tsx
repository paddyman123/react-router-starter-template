import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Page } from "../components/site-shell";
const destination = "/guides/how-much-do-quartz-worktops-cost/";
export function meta(){return [{title:"Quartz Worktop Prices Guide | StoneMatch"},{name:"description",content:"Read the StoneMatch guide to Quartz worktop costs, including materials, fabrication, template and installation."},{tagName:"link",rel:"canonical",href:"https://stonematch.co.uk"+destination}]}
export default function LegacyQuartzPrices(){const navigate=useNavigate();useEffect(()=>{navigate(destination,{replace:true})},[navigate]);return <Page><section className="page-hero"><div className="shell narrow"><h1>Quartz worktop prices</h1><p className="lead">Our pricing guide is now at its main address.</p><a className="button gold" href={destination}>Read the Quartz worktop cost guide →</a></div></section></Page>}
