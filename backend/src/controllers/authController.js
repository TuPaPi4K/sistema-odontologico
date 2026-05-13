const pool = require('../config/db');

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userRes = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

        if (userRes.rows.length === 0) {
            return res.status(401).json({ msg: "Usuario no encontrado" });
        }

        const user = userRes.rows[0];

        if (user.password !== password) {
            return res.status(401).json({ msg: "Contraseña incorrecta" });
        }

        res.json({
            msg: "Acceso concedido",
            token: "token-falso-o-jwt",
            rol: user.rol, 
            nombre: user.nombre
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

module.exports = { login };