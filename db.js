import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Crear el pool de conexiones
const pool = new Pool({
  host: process.env.PGHOST || 'centerbeam.proxy.rlwy.net',
  port: process.env.PGPORT || 56730,
  database: process.env.PGDATABASE || 'railway',
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'uHuvOUXCRYFPDetUjVOmTQWaTPbRJDLP'
});

// Crear la tabla de empleados si no existe
const createTables = async () => {
  try {
    // Verificar conexión
    await pool.query('SELECT NOW()');
    console.log('Conexión a la base de datos establecida');
    
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
      )
    `);
    console.log('Tabla de empleados creada o verificada con éxito');
    
    // Insertar algunos datos de ejemplo si no hay datos
    const count = await pool.query('SELECT COUNT(*) FROM empleados');
    if (parseInt(count.rows[0].count) === 0) {
      await pool.query(`
        INSERT INTO empleados (nombre, email, departamento, cargo, fecha_contratacion, estado)
        VALUES 
        ('Juan Pérez', 'juan.perez@ejemplo.com', 'Desarrollo', 'Desarrollador Frontend', '2023-05-15', 'Activo'),
        ('María Gómez', 'maria.gomez@ejemplo.com', 'RH', 'Gerente de RRHH', '2022-03-10', 'Activo'),
        ('Carlos Rodríguez', 'carlos.rodriguez@ejemplo.com', 'Soporte', 'Técnico de Soporte', '2023-01-20', 'Inactivo')
      `);
      console.log('Datos de prueba insertados con éxito');
    }
  } catch (err) {
    console.error('Error al inicializar la base de datos:', err);
  }
};

// Inicializar tablas al arrancar
createTables();

export { pool };