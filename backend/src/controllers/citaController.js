const pool = require('../config/db');

const registrarCita = async (req, res) => {
    const { id_paciente, id_odontologo, id_tratamiento, fecha, hora } = req.body;

    try {
        // 1. Obtener el precio del tratamiento para el cálculo
        const tRes = await pool.query('SELECT precio FROM tratamiento WHERE id_tratamiento = $1', [id_tratamiento]);
        if (tRes.rows.length === 0) return res.status(404).json({ msg: "Servicio no encontrado" });

        const subtotal = parseFloat(tRes.rows[0].precio);
        const iva = subtotal * 0.16; // 16% IVA
        const total = subtotal + iva;

        // 2. Registrar el movimiento en la tabla 'citas'
        const result = await pool.query(
            `INSERT INTO citas (id_paciente, id_odontologo, id_tratamiento, fecha_cita, hora_cita, monto_subtotal, monto_iva, monto_total, estado) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'Pendiente') RETURNING *`,
            [id_paciente, id_odontologo, id_tratamiento, fecha, hora, subtotal, iva, total]
        );

        res.status(201).json({ 
            msg: "Transacción completada exitosamente", 
            detalle: result.rows[0] 
        });

    } catch (error) {
        console.error("ERROR TRANSACCIÓN:", error.message);
        res.status(500).json({ msg: "Fallo en el proceso de transacción" });
    }
};

const obtenerCitas = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT c.*, p.nombre as paciente, o.nombre as odontologo, t.nombre as tratamiento
            FROM citas c
            JOIN paciente p ON c.id_paciente = p.id_paciente
            JOIN odontologo o ON c.id_odontologo = o.id_odontologo
            JOIN tratamiento t ON c.id_tratamiento = t.id_tratamiento
            ORDER BY c.fecha_cita DESC
        `);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ msg: "Error al consultar movimientos" });
    }
};

module.exports = { registrarCita, obtenerCitas };