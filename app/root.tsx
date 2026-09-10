import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import "./wizard.css";
import "./launch-fixes.css";
import "./navigation.css";

export const links: Route.LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{ rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
	{ rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" },
];

const META_PIXEL_ID = "1621180156718387";
const metaPixelScript = `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');
`;
const structuredData={
	"@context":"https://schema.org",
	"@graph":[
		{"@type":"Organization","@id":"https://stonematch.co.uk/#organization","name":"StoneMatch","legalName":"Deakin Surfaces Limited","url":"https://stonematch.co.uk/","email":"enquiries@stonematch.co.uk","sameAs":["https://www.instagram.com/stonematchuk/"]},
		{"@type":"WebSite","@id":"https://stonematch.co.uk/#website","url":"https://stonematch.co.uk/","name":"StoneMatch","publisher":{"@id":"https://stonematch.co.uk/#organization"},"inLanguage":"en-GB"}
	]
};

export function Layout({ children }: { children: React.ReactNode }) {
	return <html lang="en"><head><meta charSet="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><Meta/><Links/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData)}}/><script dangerouslySetInnerHTML={{__html:metaPixelScript}}/><noscript><img height="1" width="1" style={{display:"none"}} src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`} alt=""/></noscript></head><body>{children}<ScrollRestoration/><Scripts/></body></html>;
}
export default function App(){return <Outlet/>}
export function ErrorBoundary({error}:Route.ErrorBoundaryProps){let message="Oops!",details="An unexpected error occurred.",stack:string|undefined;if(isRouteErrorResponse(error)){message=error.status===404?"404":"Error";details=error.status===404?"The requested page could not be found.":error.statusText||details}else if(import.meta.env.DEV&&error&&error instanceof Error){details=error.message;stack=error.stack}return <main className="pt-16 p-4 container mx-auto"><h1>{message}</h1><p>{details}</p>{stack&&<pre className="w-full p-4 overflow-x-auto"><code>{stack}</code></pre>}</main>}
