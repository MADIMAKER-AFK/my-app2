import React, { useState, useEffect } from 'react';
import { Employee } from '../routes/employees';

interface EmployeeFormProps {
  employee: Employee | null;
  onSave: (employee: Employee) => void;
  onCancel: () => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Employee>({
    nombre: '',
    email: '',
    departamento: '',
    cargo: '',
    fecha_contratacion: new Date().toISOString().split('T')[0],
    estado: 'Activo'
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Cargar datos del empleado si existe (modo edición)
  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee]);
  
  // Manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpiar errores cuando el usuario escribe
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  // Validar formulario
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El formato del email no es válido';
    }
    
    if (!formData.departamento.trim()) {
      newErrors.departamento = 'El departamento es obligatorio';
    }
    
    if (!formData.cargo.trim()) {
      newErrors.cargo = 'El cargo es obligatorio';
    }
    
    if (!formData.fecha_contratacion) {
      newErrors.fecha_contratacion = 'La fecha de contratación es obligatoria';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Manejar envío del formulario
  const handleSubmit = () => {
    if (validateForm()) {
      onSave(formData);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[#2A3B3C] rounded-lg w-full max-w-2xl border border-[#F5C563] shadow-xl">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-xl font-semibold text-white">
            {employee ? 'Editar Empleado' : 'Añadir Nuevo Empleado'}
          </h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-300 mb-1">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={`w-full bg-[#1A2526] border ${errors.nombre ? 'border-red-500' : 'border-gray-700'} rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-[#F5C563]`}
              />
              {errors.nombre && <p className="mt-1 text-xs text-red-500">{errors.nombre}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full bg-[#1A2526] border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-[#F5C563]`}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="departamento" className="block text-sm font-medium text-gray-300 mb-1">
                Departamento
              </label>
              <input
                type="text"
                name="departamento"
                id="departamento"
                value={formData.departamento}
                onChange={handleChange}
                className={`w-full bg-[#1A2526] border ${errors.departamento ? 'border-red-500' : 'border-gray-700'} rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-[#F5C563]`}
              />
              {errors.departamento && <p className="mt-1 text-xs text-red-500">{errors.departamento}</p>}
            </div>
            
            <div>
              <label htmlFor="cargo" className="block text-sm font-medium text-gray-300 mb-1">
                Cargo
              </label>
              <input
                type="text"
                name="cargo"
                id="cargo"
                value={formData.cargo}
                onChange={handleChange}
                className={`w-full bg-[#1A2526] border ${errors.cargo ? 'border-red-500' : 'border-gray-700'} rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-[#F5C563]`}
              />
              {errors.cargo && <p className="mt-1 text-xs text-red-500">{errors.cargo}</p>}
            </div>
            
            <div>
              <label htmlFor="fecha_contratacion" className="block text-sm font-medium text-gray-300 mb-1">
                Fecha de Contratación
              </label>
              <input
                type="date"
                name="fecha_contratacion"
                id="fecha_contratacion"
                value={formData.fecha_contratacion}
                onChange={handleChange}
                className={`w-full bg-[#1A2526] border ${errors.fecha_contratacion ? 'border-red-500' : 'border-gray-700'} rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-[#F5C563]`}
              />
              {errors.fecha_contratacion && <p className="mt-1 text-xs text-red-500">{errors.fecha_contratacion}</p>}
            </div>
            
            <div>
              <label htmlFor="estado" className="block text-sm font-medium text-gray-300 mb-1">
                Estado
              </label>
              <select
                name="estado"
                id="estado"
                value={formData.estado}
                onChange={handleChange}
                className="w-full bg-[#1A2526] border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-[#F5C563]"
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-700 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md focus:outline-none"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#F5C563] hover:bg-yellow-400 text-black font-bold rounded-md focus:outline-none"
          >
            {employee ? 'Actualizar' : 'Guardar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;