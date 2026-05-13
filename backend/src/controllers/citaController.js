const pool = require('../config/db');

const registrarCita = async (req, res) => {
    const { id_paciente, id_odontologo, id_tratamiento, fecha, hora } = req.body;

    try {
        const tratamientoRes = await pool.query('SELECT costo FROM tratamientos WHERE id_tratamiento = $1', [id_tratamiento]);
        
        if (tratamientoRes.rows.length === 0) return res.status(404).json({ msg: "Tratamiento no encontrado" });

        const costoBase = parseFloat(tratamientoRes.rows[0].costo);

        const subtotal = costoBase;
        const iva = subtotal * 0.16; 
        const total = subtotal + iva;

        const nuevaCita = await pool.query(
            `INSERT INTO citas (id_paciente, id_odontologo, id_tratamiento, fecha_cita, hora_cita, monto_subtotal, monto_iva, monto_total) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [id_paciente, id_odontologo, id_tratamiento, fecha, hora, subtotal, iva, total]
        );

        res.status(201).json({ 
            msg: "Transacción completada con éxito", 
            detalle: nuevaCita.rows[0] 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al procesar la transacción" });
    }
};

module.exports = { registrarCita };