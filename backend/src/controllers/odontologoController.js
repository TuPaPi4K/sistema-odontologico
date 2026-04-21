const db = require('../config/db');

const getOdontologos = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM Odontologo WHERE activo = true ORDER BY nombre ASC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createOdontologo = async (req, res) => {
    const { cedula, nombre, especialidad, telefono, email, horario_atencion } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO Odontologo (cedula, nombre, especialidad, telefono, email, horario_atencion) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [cedula, nombre, especialidad, telefono, email, horario_atencion]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateOdontologo = async (req, res) => {
    const { id } = req.params;
    const { nombre, especialidad, telefono, horario_atencion } = req.body;
    try {
        await db.query(
            'UPDATE Odontologo SET nombre=$1, especialidad=$2, telefono=$3, horario_atencion=$4 WHERE id_odontologo=$5',
            [nombre, especialidad, telefono, horario_atencion, id]
        );
        res.json({ message: "Odontólogo actualizado" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteOdontologo = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('UPDATE Odontologo SET activo = false WHERE id_odontologo = $1', [id]);
        res.json({ message: "Odontólogo eliminado" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getOdontologos, createOdontologo, updateOdontologo, deleteOdontologo };