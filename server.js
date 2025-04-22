import express from 'express';
import { pool } from './db.js';
import cors from 'cors';
import dotenv from 'dotenv';

// Cargar variables de entorno desde .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5173;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas para empleados
// GET - Obtener todos los empleados
app.get('/api/empleados', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM empleados ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener empleados:', err);
    res.status(500).json({ error: 'Error del servidor al obtener empleados' });
  }
});

// GET - Obtener un empleado por ID
app.get('/api/empleados/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM empleados WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al obtener empleado:', err);
    res.status(500).json({ error: 'Error del servidor al obtener empleado' });
  }
});

// POST - Crear un nuevo empleado
app.post('/api/empleados', async (req, res) => {
  try {
    const { nombre, email, departamento, cargo, fecha_contratacion, estado } = req.body;
    
    // Validación básica
    if (!nombre || !email || !departamento || !cargo || !fecha_contratacion || !estado) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    
    const result = await pool.query(
      'INSERT INTO empleados (nombre, email, departamento, cargo, fecha_contratacion, estado) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [nombre, email, departamento, cargo, fecha_contratacion, estado]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error al crear empleado:', err);
    // Verificar error de duplicado de email
    if (err.code === '23505' && err.constraint === 'empleados_email_key') {
      return res.status(400).json({ error: 'Ya existe un empleado con ese email' });
    }
    res.status(500).json({ error: 'Error del servidor al crear empleado' });
  }
});

// PUT - Actualizar un empleado
app.put('/api/empleados/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, departamento, cargo, fecha_contratacion, estado } = req.body;
    
    // Validación básica
    if (!nombre || !email || !departamento || !cargo || !fecha_contratacion || !estado) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    
    const result = await pool.query(
      'UPDATE empleados SET nombre = $1, email = $2, departamento = $3, cargo = $4, fecha_contratacion = $5, estado = $6 WHERE id = $7 RETURNING *',
      [nombre, email, departamento, cargo, fecha_contratacion, estado, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al actualizar empleado:', err);
    // Verificar error de duplicado de email
    if (err.code === '23505' && err.constraint === 'empleados_email_key') {
      return res.status(400).json({ error: 'Ya existe un empleado con ese email' });
    }
    res.status(500).json({ error: 'Error del servidor al actualizar empleado' });
  }
});

// DELETE - Eliminar un empleado
app.delete('/api/empleados/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM empleados WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    
    res.json({ message: 'Empleado eliminado con éxito' });
  } catch (err) {
    console.error('Error al eliminar empleado:', err);
    res.status(500).json({ error: 'Error del servidor al eliminar empleado' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});