import React from "react";
import type { MetaFunction } from "react-router";
import logoImage from "../welcome/wmblackcodeLong.png";

export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard - WM BlackCode" },
    { name: "description", content: "Panel de control de WM BlackCode" },
  ];
};

export default function Dashboard() {
  // Datos para los contadores del dashboard
  const dashboardData = {
    totalEmpleados: 148,
    activosHoy: 132,
    vacacionesActivas: 6,
    novedadesPendientes: 3,
  };

  // Datos para gráfico de asistencia por departamento
  const departamentos = [
    { nombre: "RH", valor1: 18, valor2: 15, color: "bg-blue-500" },
    { nombre: "Desarrollo", valor1: 32, valor2: 25, color: "bg-emerald-500" },
    { nombre: "Ventas", valor1: 24, valor2: 20, color: "bg-green-500" },
    { nombre: "Soporte", valor1: 11, valor2: 0, color: "bg-orange-500" },
  ];

  // Datos para cumpleaños del mes
  const cumpleanos = {
    nombre: "Gabriela Ortega",
    fecha: "Abril 24",
    imagen: "/avatar-gabriela.jpg" // Imagen de ejemplo
  };

  // Datos para solicitudes recientes
  const solicitudes = [
    { 
      empleado: "Ana Ruiz", 
      tipo: "Vacaciones", 
      estado: "Aprobada", 
      fecha: "2025-04-10",
      avatar: "/avatar-ana.jpg"
    },
    { 
      empleado: "Javier Pérez", 
      tipo: "Permiso", 
      estado: "Pendiente", 
      fecha: "2025-04-14",
      avatar: "/avatar-javier.jpg"
    }
  ];

  // Datos para el calendario
  const diasCalendario = [];
  for (let i = 1; i <= 30; i++) {
    diasCalendario.push(i);
  }
  const diasDestacados = [10, 15, 24];

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-800 flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-gray-800">
          <img src={logoImage} alt="BlackCode" className="h-8" />
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>

        {/* User profile */}
        <div className="flex flex-col items-center p-6 border-b border-gray-800">
          <div className="w-24 h-24 rounded-full border-2 border-yellow-500 flex items-center justify-center mb-2">
            <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <h2 className="text-lg font-semibold">USERNAME</h2>
          <p className="text-xs text-gray-400">username123@gmail.com</p>
        </div>

        {/* Menu */}
        <nav className="flex-1 py-4">
          <ul>
            <li className="mb-1">
              <a href="#" className="flex items-center px-6 py-3 bg-gray-900 text-yellow-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                Dashboard
              </a>
            </li>
            <li className="mb-1">
              <a href="#" className="flex items-center px-6 py-3 hover:bg-gray-900 text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Empleados
              </a>
            </li>
            <li className="mb-1">
              <a href="#" className="flex items-center px-6 py-3 hover:bg-gray-900 text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Asistencias
              </a>
            </li>
            <li className="mb-1">
              <a href="#" className="flex items-center px-6 py-3 hover:bg-gray-900 text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Solicitudes
              </a>
            </li>
            <li className="mb-1">
              <a href="#" className="flex items-center px-6 py-3 hover:bg-gray-900 text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2" />
                </svg>
                Nómina
              </a>
            </li>
            <li className="mb-1">
              <a href="#" className="flex items-center px-6 py-3 hover:bg-gray-900 text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
                Documentos
              </a>
            </li>
            <li className="mb-1">
              <a href="#" className="flex items-center px-6 py-3 hover:bg-gray-900 text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Configuración
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <header className="flex justify-end items-center p-4 border-b border-gray-800">
          <div className="flex items-center">
            <span className="mr-2">Teresa</span>
            <div className="w-8 h-8 rounded-full bg-red-500 overflow-hidden">
              <img src="/avatar-teresa.jpg" alt="Teresa" className="w-full h-full object-cover" />
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </div>
        </header>

        <main className="p-6">
          {/* Contadores/KPIs */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Total empleados</p>
              <h3 className="text-3xl font-bold">{dashboardData.totalEmpleados}</h3>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Activos hoy</p>
              <h3 className="text-3xl font-bold">{dashboardData.activosHoy}</h3>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Vacaciones activas</p>
              <h3 className="text-3xl font-bold">{dashboardData.vacacionesActivas}</h3>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Novedades pendientes</p>
              <h3 className="text-3xl font-bold">{dashboardData.novedadesPendientes}</h3>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Gráfico de asistencia */}
            <div className="col-span-2 bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Asistencia diaria</h3>
              <div className="flex h-48 items-end justify-around">
                {departamentos.map((depto, index) => (
                  <div key={index} className="flex flex-col items-center w-16">
                    <div className="w-full flex justify-center space-x-1">
                      <div className={`${depto.color} w-6`} style={{ height: `${depto.valor1 * 2}px` }}></div>
                      <div className={`${depto.color} w-6 opacity-70`} style={{ height: `${depto.valor2 * 2}px` }}></div>
                    </div>
                    <span className="text-xs mt-2 text-gray-400">{depto.nombre}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Últimas solicitudes */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Últimas solicitudes</h3>
              <div className="mb-2 grid grid-cols-4 text-xs text-gray-400">
                <div>Empleado</div>
                <div>Tipo</div>
                <div>Estado</div>
                <div>Fecha</div>
              </div>
              {solicitudes.map((solicitud, index) => (
                <div key={index} className="py-2 grid grid-cols-4 items-center border-t border-gray-700">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-gray-500 mr-2 overflow-hidden">
                      {solicitud.avatar ? (
                        <img src={solicitud.avatar} alt={solicitud.empleado} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs">
                          {solicitud.empleado.charAt(0)}
                        </div>
                      )}
                    </div>
                    <span className="text-sm">{solicitud.empleado}</span>
                  </div>
                  <div className="text-sm">{solicitud.tipo}</div>
                  <div>
                    <span className={`px-2 py-1 text-xs rounded-md ${
                      solicitud.estado === "Aprobada" ? "bg-green-900 text-green-300" : 
                      solicitud.estado === "Pendiente" ? "bg-yellow-900 text-yellow-300" : ""
                    }`}>
                      {solicitud.estado}
                    </span>
                  </div>
                  <div className="text-sm">{solicitud.fecha}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-6">
            {/* Cumpleaños del mes */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Cumpleaños del mes</h3>
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-gray-700 overflow-hidden mr-4">
                  <img src={cumpleanos.imagen} alt={cumpleanos.nombre} className="w-full h-full object-cover" onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E";
                  }} />
                </div>
                <div>
                  <h4 className="font-semibold">{cumpleanos.nombre}</h4>
                  <p className="text-sm text-gray-400">{cumpleanos.fecha}</p>
                  <button className="mt-2 px-3 py-1 bg-yellow-500 text-black text-xs rounded hover:bg-yellow-400">
                    Enviar felicitación
                  </button>
                </div>
              </div>
            </div>

            {/* Calendario */}
            <div className="col-span-2 bg-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Calendario de eventos</h3>
                <div className="flex">
                  <button className="p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <h4 className="mx-4">Abril 2025</h4>
                  <button className="p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Días de la semana */}
              <div className="grid grid-cols-7 text-center text-xs text-gray-400 mb-1">
                <div>L</div>
                <div>M</div>
                <div>M</div>
                <div>J</div>
                <div>V</div>
                <div>S</div>
                <div>D</div>
              </div>

              {/* Calendario */}
              <div className="grid grid-cols-7 gap-1 text-center">
                <div className="p-2 text-gray-500">31</div>
                {[...Array(30)].map((_, i) => {
                  const day = i + 1;
                  const isHighlighted = diasDestacados.includes(day);
                  return (
                    <div 
                      key={i} 
                      className={`p-2 ${
                        isHighlighted 
                          ? 'rounded-full bg-yellow-500 text-black' 
                          : 'hover:bg-gray-700 rounded-full'
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
                <div className="p-2 text-gray-500">1</div>
                <div className="p-2 text-gray-500">2</div>
                <div className="p-2 text-gray-500">3</div>
                <div className="p-2 text-gray-500">4</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}