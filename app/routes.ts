import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/welcome.tsx"), // Usamos welcome.tsx como página principal
  route("dashboard", "routes/dashboard.tsx") // Agregamos la ruta del dashboard
] satisfies RouteConfig;