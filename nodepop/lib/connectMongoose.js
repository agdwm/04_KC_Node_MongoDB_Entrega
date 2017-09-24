"use strict";
//MODULO DE CONEXIÓN a la base de datos
const mongoose = require('mongoose');

const conn = mongoose.connection;

conn.on('error', (err) => {
    console.log("Error de conexión", err);
    process.exit(1); //cerramos la aplicación indicando al sistema operativo de quien me ha llamado, que hemos terminado mal.
});

conn.once('open', () => {
    console.log('Conectado a MongoDB.')
});

mongoose.connect('mongodb://localhost/cursonode');