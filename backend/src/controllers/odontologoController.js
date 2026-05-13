const pool = require('../config/db');

// CONSULTAR TODOS
const obtenerOdontologos = async (req, res) => {
    const result = await pool.query('SELECT * FROM odontologos ORDER BY id_odontologo ASC');
    res.json(result.rows);
};

// INCLUIR (Crear)
const crearOdontologo = async (req, res) => {
    const { nombre, especialidad, telefono } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO odontologos (nombre, especialidad, telefono) VALUES ($1, $2, $3) RETURNING *',
            [nombre, especialidad, telefono]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ msg: "Error al registrar odontólogo" });
    }
};

// MODIFICAR
const actualizarOdontologo = async (req, res) => {
    const { id } = req.params;
    const { nombre, especialidad, telefono } = req.body;
    try {
        await pool.query(
            'UPDATE odontologos SET nombre=$1, especialidad=$2, telefono=$3 WHERE id_odontologo=$4',
            [nombre, especialidad, telefono, id]
        );
        res.json({ msg: "Actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ msg: "Error al actualizar" });
    }
};

// ELIMINAR (Protección de integridad)
const eliminarOdontologo = async (req, res) => {
    const { id } = req.params;
    try {
        // La base de datos fallará si el odontólogo tiene citas asociadas (Integridad Referencial)
        await pool.query('DELETE FROM odontologos WHERE id_odontologo = $1', [id]);
        res.json({ msg: "Registro eliminado" });
    } catch (error) {
        res.status(400).json({ msg: "No se puede eliminar: El odontólogo tiene transacciones (citas) activas." });
    }
};

module.exports = { obtenerOdontologos, crearOdontologo, actualizarOdontologo, eliminarOdontologo };