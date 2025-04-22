import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/welcome.tsx"),           // Página principal de login
  route("/dashboard", "routes/dashboard.tsx"), // Ruta del dashboard
  route("/employees", "routes/employees.tsx"), // Ruta de gestión de empleados
  // Rutas adicionales (sin implementación completa aún)
  route("/asistencias", "routes/dashboard.tsx"),  // Placeholder
  route("/solicitudes", "routes/dashboard.tsx"),  // Placeholder
  route("/nomina", "routes/dashboard.tsx"),       // Placeholder
  route("/documentos", "routes/dashboard.tsx"),   // Placeholder 
  route("/configuracion", "routes/dashboard.tsx") // Placeholder
] satisfies RouteConfig;