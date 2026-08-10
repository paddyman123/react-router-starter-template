import type { ReactNode } from "react";

export function Brand() {
	return <a className="brand" href="/" aria-label="StoneMatch home"><span className="brand-mark">SM</span><span><strong>STONE</strong>MATCH<small>STONE SOURCING, SIMPLIFIED.</small></span></a>;
}

export function Header() {
	return <header className="site-header"><nav className="nav shell"><Brand/><div className="nav-links"><a href="/how-it-works">How it works</a><a href="/about">About</a><a href="/suppliers">For suppliers</a><a href="/#enquire">Start my match</a></div></nav></header>;
}

export function Footer() {
	return <footer><div className="shell footer-inner"><Brand/><div className="footer-copy"><p>The right stone. The right supplier. <strong>The right price.</strong></p><div className="footer-links"><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div></div><span>© 2026 StoneMatch</span></div></footer>;
}

export function Page({ children }: { children: ReactNode }) {
	return <><Header/><main>{children}</main><Footer/></>;
}
