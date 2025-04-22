import { pool } from './db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta al archivo SQL
const sqlFilePath = path.join(__dirname, 'app', 'init-db.sql');

async function initDatabase() {
  console.log('Inicializando la base de datos...');
  
  try {
    // Verificar conexión a la base de datos
    await pool.query('SELECT NOW()');
    console.log('Conexión a PostgreSQL establecida correctamente.');

    // Verificar si existe la tabla de empleados
    const tableExistsQuery = `
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = 'empleados'
      );
    `;
    
    const tableExistsResult = await pool.query(tableExistsQuery);
    const tableExists = tableExistsResult.rows[0].exists;
    
    if (!tableExists) {
      console.log('La tabla empleados no existe. Creándola...');
      
      // Crear tabla de empleados
      await pool.query(`
        CREATE TABLE IF NOT EXISTS empleados (
          id SERIAL PRIMARY KEY,
          nombre VARCHAR(100) NOT NULL,
          email VARCHAR(100) NOT NULL UNIQUE,
          departamento VARCHAR(50) NOT NULL,
          cargo VARCHAR(50) NOT NULL,
          fecha_contratacion DATE NOT NULL,
          estado VARCHAR(10) NOT NULL CHECK (estado IN ('Activo', 'Inactivo'))
        );
      `);
      
      console.log('Tabla empleados creada correctamente.');
      
      // Insertar datos de ejemplo
      console.log('Insertando datos de ejemplo...');
      await pool.query(`
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
      `);
      
      console.log('Datos de ejemplo insertados correctamente.');
    } else {
      console.log('La tabla empleados ya existe.');
      
      // Verificar si hay datos
      const countResult = await pool.query('SELECT COUNT(*) FROM empleados');
      const count = parseInt(countResult.rows[0].count);
      
      if (count === 0) {
        console.log('La tabla empleados está vacía. Insertando datos de ejemplo...');
        // Insertar datos de ejemplo
        await pool.query(`
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
        `);
        
        console.log('Datos de ejemplo insertados correctamente.');
      } else {
        console.log(`La tabla empleados ya contiene ${count} registros.`);
      }
    }
    
    console.log('Inicialización de la base de datos completada con éxito.');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  } finally {
    // No cerramos el pool aquí para permitir que la aplicación lo use
  }
}

// Ejecutar la función de inicialización
initDatabase();