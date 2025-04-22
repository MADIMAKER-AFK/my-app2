-- Crear la tabla de empleados si no existe
CREATE TABLE IF NOT EXISTS empleados (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  departamento VARCHAR(50) NOT NULL,
  cargo VARCHAR(50) NOT NULL,
  fecha_contratacion DATE NOT NULL,
  estado VARCHAR(10) NOT NULL CHECK (estado IN ('Activo', 'Inactivo'))
);

-- Insertar datos de ejemplo
INSERT INTO empleados (nombre, email, departamento, cargo, fecha_contratacion, estado)
VALUES 
  ('Juan Pérez', 'juan.perez@ejemplo.com', 'Desarrollo', 'Desarrollador Frontend', '2023-05-15', 'Activo'),
  ('María Gómez', 'maria.gomez@ejemplo.com', 'RH', 'Gerente de RRHH', '2022-03-10', 'Activo'),
  ('Carlos Rodríguez', 'carlos.rodriguez@ejemplo.com', 'Soporte', 'Técnico de Soporte', '2023-01-20', 'Inactivo'),
  ('Ana Martínez', 'ana.martinez@ejemplo.com', 'Ventas', 'Representante de Ventas', '2023-06-05', 'Activo'),
  ('Luis Hernández', 'luis.hernandez@ejemplo.com', 'Marketing', 'Especialista en SEO', '2022-09-18', 'Activo'),
  ('Laura Torres', 'laura.torres@ejemplo.com', 'Desarrollo', 'Desarrollador Backend', '2023-02-28', 'Activo'),
  ('Roberto Sánchez', 'roberto.sanchez@ejemplo.com', 'Finanzas', 'Contador', '2022-11-12', 'Inactivo'),
  ('Patricia López', 'patricia.lopez@ejemplo.com', 'RH', 'Reclutador', '2023-04-22', 'Activo'),
  ('Miguel Álvarez', 'miguel.alvarez@ejemplo.com', 'Soporte', 'Coordinador de TI', '2022-08-01', 'Activo'),
  ('Sofía Ruiz', 'sofia.ruiz@ejemplo.com', 'Marketing', 'Diseñador Gráfico', '2023-03-17', 'Activo')
ON CONFLICT (email) DO NOTHING;