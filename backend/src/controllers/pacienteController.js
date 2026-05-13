const pool = require('../config/db');

const obtenerPacientes = async (req, res) => {
    const result = await pool.query('SELECT * FROM pacientes ORDER BY nombre ASC');
    res.json(result.rows);
};

const crearPaciente = async (req, res) => {
    const { cedula, nombre, apellido, telefono, email } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO pacientes (cedula, nombre, apellido, telefono, email) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [cedula, nombre, apellido, telefono, email]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ msg: "Error al registrar paciente" });
    }
};

const eliminarPaciente = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM pacientes WHERE id_paciente = $1', [id]);
        res.json({ msg: "Paciente eliminado" });
    } catch (error) {
        res.status(400).json({ msg: "No se puede eliminar: El paciente tiene citas registradas." });
    }
};

const actualizarPaciente = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, telefono, tipo_paciente } = req.body;
    try {
        await pool.query(
            'UPDATE pacientes SET nombre=$1, apellido=$2, telefono=$3, tipo_paciente=$4 WHERE id_paciente=$5',
            [nombre, apellido, telefono, tipo_paciente, id]
        );
        res.json({ message: "Paciente actualizado" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { obtenerPacientes, crearPaciente, actualizarPaciente, eliminarPaciente };