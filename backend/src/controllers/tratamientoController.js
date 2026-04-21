const db = require('../config/db');

const getTratamientos = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM Tratamiento WHERE activo = true ORDER BY nombre ASC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createTratamiento = async (req, res) => {
    const { codigo, nombre, descripcion, precio } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO Tratamiento (codigo, nombre, descripcion, precio) VALUES ($1, $2, $3, $4) RETURNING *',
            [codigo, nombre, descripcion, precio]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteTratamiento = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('UPDATE Tratamiento SET activo = false WHERE id_tratamiento = $1', [id]);
        res.json({ message: "Tratamiento eliminado" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getTratamientos, createTratamiento, deleteTratamiento };