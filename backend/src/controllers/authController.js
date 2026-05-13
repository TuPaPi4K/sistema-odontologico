const pool = require('../config/db');

const login = async (req, res) => {
    // Cambiamos 'email' por 'nombre_usuario'
    const { nombre_usuario, password } = req.body; 

    try {
        // Consulta exacta a la tabla 'usuario'
        const userRes = await pool.query(
            'SELECT * FROM usuario WHERE nombre_usuario = $1', 
            [nombre_usuario]
        );

        if (userRes.rows.length === 0) {
            return res.status(401).json({ msg: "El usuario no existe" });
        }

        const user = userRes.rows[0];

        // Verificamos si el usuario está activo (columna 'activo')
        if (user.activo === false) {
            return res.status(403).json({ msg: "Usuario inactivo" });
        }

        // Validación usando la columna 'contrasena'
        if (user.contrasena !== password) {
            return res.status(401).json({ msg: "Contraseña incorrecta" });
        }

        // Respuesta exitosa enviando el ROL real de tu DB
        res.json({
            msg: "Acceso concedido",
            token: "jwt-token-falso", 
            rol: user.rol, 
            nombre: user.nombre_usuario,
            id_odontologo: user.id_odontologo
        });

    } catch (error) {
        console.error("ERROR EN LOGIN:", error.message);
        res.status(500).json({ msg: "Error interno: " + error.message });
    }
};

module.exports = { login };