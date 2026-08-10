import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("how-it-works", "routes/how-it-works.tsx"),
	route("about", "routes/about.tsx"),
	route("suppliers", "routes/suppliers.tsx"),
] satisfies RouteConfig;
