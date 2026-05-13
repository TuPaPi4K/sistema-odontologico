const pool = require('../config/db');

const obtenerPacientes = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM paciente ORDER BY nombre ASC');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ msg: "Error al consultar pacientes" });
    }
};

const crearPaciente = async (req, res) => {
    const { cedula, nombre, apellido, telefono, email } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO paciente (cedula, nombre, apellido, telefono, email) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [cedula, nombre, apellido, telefono, email]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ msg: "Error al incluir paciente" });
    }
};

const actualizarPaciente = async (req, res) => {
    const { id } = req.params;
    const { cedula, nombre, apellido, telefono, email } = req.body;
    try {
        await pool.query(
            'UPDATE paciente SET cedula=$1, nombre=$2, apellido=$3, telefono=$4, email=$5 WHERE id_paciente=$6',
            [cedula, nombre, apellido, telefono, email, id]
        );
        res.json({ msg: "Paciente actualizado con éxito" });
    } catch (error) {
        res.status(500).json({ msg: "Error al modificar" });
    }
};

const eliminarPaciente = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM paciente WHERE id_paciente = $1', [id]);
        res.json({ msg: "Paciente eliminado" });
    } catch (error) {
        res.status(400).json({ msg: "No se puede eliminar: el paciente tiene citas registradas." });
    }
};

module.exports = { obtenerPacientes, crearPaciente, actualizarPaciente, eliminarPaciente };