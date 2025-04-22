import React, { useState, useEffect } from "react";
import type { MetaFunction } from "@react-router/node";
import Sidebar from "../components/Sidebar";
import EmployeeTable from "../components/EmployeeTable";
import EmployeeForm from "../components/EmployeeForm";
import AlertBanner from "../components/AlertBanner";
import logoImage from "../welcome/wmblackcodeLong.js";

export const meta: MetaFunction = () => {
  return [
    { title: "Gestión de Empleados - WM BlackCode" },
    { name: "description", content: "Sistema de gestión de empleados de WM BlackCode" },
  ];
};

export interface Employee {
  id?: number;
  nombre: string;
  email: string;
  departamento: string;
  cargo: string;
  fecha_contratacion: string;
  estado: 'Activo' | 'Inactivo';
}

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
  const [serverError, setServerError] = useState(false);

  // Función para cargar empleados desde la API
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/empleados');
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setEmployees(data);
      setServerError(false);
    } catch (err) {
      console.error("Error al cargar empleados:", err);
      setError("No se pudieron cargar los empleados. Usando datos de respaldo.");
      setServerError(true);
      // Datos de respaldo para demostración
      setEmployees([
        {
          id: 1,
          nombre: "Juan Pérez",
          email: "juan.perez@ejemplo.com",
          departamento: "Desarrollo",
          cargo: "Desarrollador Frontend",
          fecha_contratacion: "2023-05-15",
          estado: "Activo"
        },
        {
          id: 2,
          nombre: "María Gómez",
          email: "maria.gomez@ejemplo.com",
          departamento: "RH",
          cargo: "Gerente de RRHH",
          fecha_contratacion: "2022-03-10",
          estado: "Activo"
        },
        {
          id: 3,
          nombre: "Carlos Rodríguez",
          email: "carlos.rodriguez@ejemplo.com",
          departamento: "Soporte",
          cargo: "Técnico de Soporte",
          fecha_contratacion: "2023-01-20",
          estado: "Inactivo"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Cargar empleados al montar el componente
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Función para añadir un nuevo empleado
  const handleAddEmployee = async (employee: Employee) => {
    if (serverError) {
      // Si hay error de servidor, solo actualiza la UI localmente
      setEmployees([...employees, { ...employee, id: Date.now() }]);
      setShowModal(false);
      return;
    }

    try {
      const response = await fetch('/api/empleados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const newEmployee = await response.json();
      setEmployees([...employees, newEmployee]);
      setShowModal(false);
    } catch (err) {
      console.error("Error al añadir empleado:", err);
      setError("Error al añadir empleado. Se utilizarán datos locales.");
      setServerError(true);
      // Actualizar UI localmente
      setEmployees([...employees, { ...employee, id: Date.now() }]);
      setShowModal(false);
    }
  };

  // Función para actualizar un empleado existente
  const handleUpdateEmployee = async (employee: Employee) => {
    if (!employee.id) return;

    if (serverError) {
      // Si hay error de servidor, solo actualiza la UI localmente
      setEmployees(employees.map(emp => emp.id === employee.id ? employee : emp));
      setShowModal(false);
      setCurrentEmployee(null);
      return;
    }

    try {
      const response = await fetch(`/api/empleados/${employee.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      setEmployees(employees.map(emp => emp.id === employee.id ? employee : emp));
      setShowModal(false);
      setCurrentEmployee(null);
    } catch (err) {
      console.error("Error al actualizar empleado:", err);
      setError("Error al actualizar empleado. Se utilizarán datos locales.");
      setServerError(true);
      // Actualizar UI localmente
      setEmployees(employees.map(emp => emp.id === employee.id ? employee : emp));
      setShowModal(false);
      setCurrentEmployee(null);
    }
  };

  // Función para eliminar un empleado
  const handleDeleteEmployee = async (id: number) => {
    if (serverError) {
      // Si hay error de servidor, solo actualiza la UI localmente
      setEmployees(employees.filter(emp => emp.id !== id));
      return;
    }

    try {
      const response = await fetch(`/api/empleados/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      setEmployees(employees.filter(emp => emp.id !== id));
    } catch (err) {
      console.error("Error al eliminar empleado:", err);
      setError("Error al eliminar empleado. Se utilizarán datos locales.");
      setServerError(true);
      // Actualizar UI localmente
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  // Función para abrir modal de edición
  const handleEditEmployee = (employee: Employee) => {
    setCurrentEmployee(employee);
    setShowModal(true);
  };

  return (
    <div className="flex h-screen bg-[#1A2526] text-white">
      <Sidebar activePage="empleados" logo={logoImage} />
      
      <div className="flex-1 overflow-y-auto">
        <header className="flex justify-between items-center p-4 border-b border-gray-800">
          <h1 className="text-xl font-semibold">Gestión de Empleados</h1>
          <div className="flex items-center">
            <span className="mr-2">Usuario</span>
            <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden">
              {/* Avatar placeholder */}
            </div>
          </div>
        </header>

        <main className="p-6">
          {serverError && (
            <AlertBanner 
              message="Advertencia: Error al conectar con el servidor. Usando datos de respaldo. Los cambios que realices no se guardarán en el servidor." 
            />
          )}

          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Empleados</h2>
            <button 
              onClick={() => {
                setCurrentEmployee(null);
                setShowModal(true);
              }}
              className="bg-[#F5C563] hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Añadir Empleado
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
            </div>
          ) : (
            <EmployeeTable 
              employees={employees}
              onEdit={handleEditEmployee}
              onDelete={handleDeleteEmployee}
            />
          )}

          {showModal && (
            <EmployeeForm
              employee={currentEmployee}
              onSave={currentEmployee ? handleUpdateEmployee : handleAddEmployee}
              onCancel={() => {
                setShowModal(false);
                setCurrentEmployee(null);
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
}