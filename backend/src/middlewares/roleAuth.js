const verifyRole = (rolesPermitidos) => {
    return (req, res, next) => {
        const userRole = req.user.rol; 

        if (!rolesPermitidos.includes(userRole)) {
            return res.status(403).json({ 
                msg: "Acceso denegado: No tienes los permisos (Rol: " + userRole + ")" 
            });
        }
        next();
    };
};

module.exports = verifyRole;