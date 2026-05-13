const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const db = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const pacienteRoutes = require('./src/routes/pacienteRoutes');
const odontologoRoutes = require('./src/routes/odontologoRoutes');
const tratamientoRoutes = require('./src/routes/tratamientoRoutes');
const citaRoutes = require('./src/routes/citaRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/pacientes', require('./src/routes/pacienteRoutes'));
app.use('/api/odontologos', require('./src/routes/odontologoRoutes'));
app.use('/api/tratamientos', require('./src/routes/tratamientoRoutes'));
app.use('/api/citas', require('./src/routes/citaRoutes'));

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/:page', (req, res, next) => {
    const page = req.params.page;
    if (page.endsWith('.html')) {
        res.sendFile(path.join(__dirname, '../frontend/src/pages', page));
    } else {
        next();
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Sistema IPSTAUCLA corriendo en http://localhost:${PORT}`);
});