'use strict';

const mongoose = require('mongoose');
const readLine = require('readline');
const async = require('async');
// require('./lib/i18nSetup');

const db = require('./lib/connectMongoose');

// Cargamos las definiciones de todos nuestros modelos
require('./models/Advertisement');

function initAdvertisements(cb) {
	const Advertisement = mongoose.model('Advertisement');

	Advertisement.remove({}, () => {
		console.log('Advertisements deleted.');

		// Cargar anuncios.json
		const file = './advertisements.json';
		console.log(`Loading ${file} ...`);

		Advertisement.loadJson(file, (err, numLoaded) => {
			if (err) return cb(err);
			// first param shows the message in color 'green'
			console.log('\x1b[32m', `${numLoaded} advertisements have been loaded :)`);
			return cb(null, numLoaded);
		});
	});
}

function runInstallScript() {
	async.series([
		initAdvertisements,
		// initUsuarios
	], (err) => {
		if (err) {
			console.error(__('generic', { err }));
			return process.exit(1);
		}

		return process.exit(0);
	});
}

db.once('open', () => {
	const rl = readLine.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	rl.question('Are you sure you want to empty DB? (yes) (no) ', (answer) => {
		rl.close();
		if (answer.toLowerCase() === 'yes') {
			runInstallScript();
		} else {
			console.log('\x1b[1m', 'DB install aborted!');
			return process.exit(0);
		}
	});
});


// function initUsuarios(cb) {
// 	const Usuario = require('./models/Usuario')

// 	Usuario.remove({}, () => {
// 		console.log('Usuarios borrados.')

// 		Usuario.insertMany([{
// 				name: 'user',
// 				email: 'user@example.com',
// 				password: Usuario.hashPassword('1234')
// 			},
// 			{
// 				name: 'user2',
// 				email: 'user2@example.com',
// 				password: Usuario.hashPassword('1234')
// 			}
// 		], (err, loaded) => {
// 			if (err) return cb(err)

// 			console.log(`Se han cargado ${loaded.length} usuarios.`)
// 			return cb(null, loaded)
// 		})
// 	})
// }
