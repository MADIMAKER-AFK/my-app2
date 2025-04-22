import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/welcome.tsx"), // Página principal de login
  route("dashboard", "routes/dashboard.tsx") // Ruta del dashboard
] satisfies RouteConfig;