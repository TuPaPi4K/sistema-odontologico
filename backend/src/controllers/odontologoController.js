const pool = require('../config/db');

// Consultar todos
const obtenerOdontologos = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM odontologo ORDER BY id_odontologo ASC');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener odontólogos" });
    }
};

// Incluir (Crear)
const crearOdontologo = async (req, res) => {
    const { nombre, especialidad, telefono } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO odontologo (nombre, especialidad, telefono) VALUES ($1, $2, $3) RETURNING *',
            [nombre, especialidad, telefono]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ msg: "Error al registrar odontólogo" });
    }
};

// Modificar
const actualizarOdontologo = async (req, res) => {
    const { id } = req.params;
    const { nombre, especialidad, telefono } = req.body;
    try {
        await pool.query(
            'UPDATE odontologo SET nombre=$1, especialidad=$2, telefono=$3 WHERE id_odontologo=$4',
            [nombre, especialidad, telefono, id]
        );
        res.json({ msg: "Actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ msg: "Error al actualizar" });
    }
};

// Eliminar
const eliminarOdontologo = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM odontologo WHERE id_odontologo = $1', [id]);
        res.json({ msg: "Registro eliminado" });
    } catch (error) {
        res.status(400).json({ msg: "No se puede eliminar: tiene citas asociadas." });
    }
};

// IMPORTANTE: Exportar todas las funciones
module.exports = { 
    obtenerOdontologos, 
    crearOdontologo, 
    actualizarOdontologo, 
    eliminarOdontologo 
};