const mongoose = require('mongoose');

const conn = mongoose.connection;

conn.on('error', (err) => {
	console.log('Error de conexión', err);
	process.exit(1);
});

conn.once('open', () => {
	console.info('Conectado a MongoDB.');
});

mongoose.connect('mongodb://localhost/cursonode', {
	useMongoClient: true,
});
