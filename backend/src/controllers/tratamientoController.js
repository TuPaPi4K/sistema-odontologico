const pool = require('../config/db');

const obtenerTratamientos = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tratamiento ORDER BY nombre ASC');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ msg: "Error al consultar servicios" });
    }
};

const crearTratamiento = async (req, res) => {
    const { codigo, nombre, descripcion, precio } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO tratamiento (codigo, nombre, descripcion, precio) VALUES ($1, $2, $3, $4) RETURNING *',
            [codigo, nombre, descripcion, precio]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ msg: "Error al crear tratamiento" });
    }
};

const actualizarTratamiento = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio } = req.body;
    try {
        await pool.query(
            'UPDATE tratamiento SET nombre=$1, descripcion=$2, precio=$3 WHERE id_treatment=$4',
            [nombre, descripcion, precio, id]
        );
        res.json({ msg: "Tratamiento actualizado" });
    } catch (error) {
        res.status(500).json({ msg: "Error al actualizar" });
    }
};

const eliminarTratamiento = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM tratamiento WHERE id_tratamiento = $1', [id]);
        res.json({ msg: "Eliminado con éxito" });
    } catch (error) {
        res.status(400).json({ msg: "Error: El tratamiento está en uso en una transacción." });
    }
};

module.exports = { obtenerTratamientos, crearTratamiento, actualizarTratamiento, eliminarTratamiento };