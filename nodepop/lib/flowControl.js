'use strict';

const async = require('async');

// función ayudante 'serialArray',
// que va a hacer llamadas a func,
// con cada elemento del array que recibe (arr)
// cuando acabe llamará a callbackFin
const serialArray = (arr, func, callbackFin) => {

	if (arr.length > 0) {
		// saco el primer elemento del array y
		// llamo a 'func' con el elemento
		func(arr.shift(), (err) => {
			if (err) {
				return callbackFin(err);
			}

			// cuando termine func, vuelvo a
			// llamarme a mismo (serialArray) para procesar el siguiente
			serialArray(arr, func, callbackFin);
		});
	} else {
		// si arr.length llega a 0 es que he acabado,
		// llamo a la función que pasaron
		// para ello, callbackFin
		callbackFin();
	}
};



module.exports = {
	serialArray: serialArray
};