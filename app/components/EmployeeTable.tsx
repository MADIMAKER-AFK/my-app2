import React, { useState } from 'react';
import { Employee } from '../routes/employees';

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, onEdit, onDelete }) => {
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  
  // Función para formatear la fecha en formato más legible
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div className="overflow-x-auto bg-[#2A3B3C] rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-[#1A2526]">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Nombre
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Email
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Departamento
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Cargo
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Fecha Contratación
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Estado
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {employees.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-6 py-4 text-center text-gray-300">
                No hay empleados registrados
              </td>
            </tr>
          ) : (
            employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-[#344445]">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {employee.nombre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {employee.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {employee.departamento}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {employee.cargo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {formatDate(employee.fecha_contratacion)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${employee.estado === 'Activo' 
                      ? 'bg-green-900 text-green-300' 
                      : 'bg-red-900 text-red-300'}`}>
                    {employee.estado}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(employee)}
                      className="text-[#F5C563] hover:text-yellow-400"
                      title="Editar"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    {deleteConfirm === employee.id ? (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            if (employee.id) onDelete(employee.id);
                            setDeleteConfirm(null);
                          }}
                          className="text-red-500 hover:text-red-400"
                          title="Confirmar"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="text-gray-500 hover:text-gray-400"
                          title="Cancelar"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(employee.id || null)}
                        className="text-red-500 hover:text-red-400"
                        title="Eliminar"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;