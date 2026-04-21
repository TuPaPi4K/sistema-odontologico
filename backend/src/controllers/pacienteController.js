const db = require('../config/db');

// Consultar todos 
const getPacientes = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM Paciente WHERE activo = true ORDER BY id_paciente DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Incluir (Insertar) [cite: 67, 68]
const createPaciente = async (req, res) => {
    const { cedula, nombre, apellido, fecha_nacimiento, telefono, tipo_paciente } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO Paciente (cedula, nombre, apellido, fecha_nacimiento, telefono, tipo_paciente) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [cedula, nombre, apellido, fecha_nacimiento, telefono, tipo_paciente]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Modificar (Actualizar) 
const updatePaciente = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, telefono, tipo_paciente } = req.body;
    try {
        await db.query(
            'UPDATE Paciente SET nombre=$1, apellido=$2, telefono=$3, tipo_paciente=$4 WHERE id_paciente=$5',
            [nombre, apellido, telefono, tipo_paciente, id]
        );
        res.json({ message: "Paciente actualizado" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar (Borrado Lógico) 
const deletePaciente = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('UPDATE Paciente SET activo = false WHERE id_paciente = $1', [id]);
        res.json({ message: "Paciente eliminado lógicamente" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getPacientes, createPaciente, updatePaciente, deletePaciente };