'use strict';

const mongoose = require('mongoose');
const db = mongoose.connection;

mongoose.Promise = global.Promise;

db.on('error', (err) => {
	console.error('mongodb connection error:', err);
	process.exit(1);
});

db.once('open', () => {
	console.info('Connected to mongodb on', mongoose.connection.name);
});

// mongoose.connect('mongodb://localhost/cursonode', {
// 	useMongoClient: true
// });

mongoose.connect('mongodb://localhost/nodepop', {
	// useMongoClient: true,
});

module.exports = db;
