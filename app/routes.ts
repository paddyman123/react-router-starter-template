import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("how-it-works", "routes/how-it-works.tsx"),
	route("about", "routes/about.tsx"),
	route("materials", "routes/materials.tsx"),
	route("materials/quartz", "routes/quartz.tsx"),
	route("materials/quartz/brands/:slug", "routes/quartz-brand.tsx"),
	route("materials/quartz/partner-range", "routes/partner-range.tsx"),
	route("materials/quartz/partner-range/:slug", "routes/partner-colour.tsx"),
	route("materials/porcelain/partner-range", "routes/partner-porcelain.tsx"),
	route("edge-details", "routes/edge-details.tsx"),
	route("shortlist", "routes/shortlist.tsx"),
	route("worktop-matcher", "routes/worktop-matcher.tsx"),
	route("suppliers", "routes/suppliers.tsx"),
	route("privacy", "routes/privacy.tsx"),
	route("terms", "routes/terms.tsx"),
] satisfies RouteConfig;
