const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const db = require('./src/config/db');
const pacienteRoutes = require('./src/routes/pacienteRoutes');
const odontologoRoutes = require('./src/routes/odontologoRoutes');
const tratamientoRoutes = require('./src/routes/tratamientoRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// --- VERIFICACIÓN DE BASE DE DATOS ---
// Implementa las tablas maestras definidas en el modelo [cite: 163, 171, 194]
db.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('❌ Error conectando a la base de datos:', err.stack);
    } else {
        console.log('✅ Base de Datos PostgreSQL conectada y lista');
    }
});

// --- SERVIR ARCHIVOS DEL FRONTEND ---
// Esto permite acceder a index.html, pacientes.html, etc.
app.use(express.static(path.join(__dirname, '../frontend')));

// --- RUTAS API ---
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/odontologos', odontologoRoutes);
app.use('/api/tratamientos', tratamientoRoutes);

// --- CORRECCIÓN DEL ERROR DE RUTA (Wildcard) ---
// En Express 5.x/Node 25+, el '*' requiere paréntesis o nombre.
app.get('(.*)', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor IPSTAUCLA corriendo en http://localhost:${PORT}`);
});