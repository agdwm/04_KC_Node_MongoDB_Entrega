'use strict';

const express = require('express');
const router = express.Router();

const { query, validationResult } = require('express-validator/check');
const mongoose = require('mongoose');

const Advertisement = mongoose.model('Advertisement');


/* GET home page. */
router.get('/:lang(es|en)?', [
	// Query String Validations wity express-validator
	query('isSale').isBoolean().optional().withMessage('debe ser uno de los siguientes valores: true o false'),
	query('price').custom((value) => {
		const price = parseFloat(value);

		if (value.indexOf('-') >= 0) {
			const range = value.split('-');
			const pmin = parseFloat(range[0]);
			const pmax = parseFloat(range[1]);

			if (range.length > 2) {
				return false;
			}
			if (pmin !== '' && pmax !== '') {
				if (!Number.isNaN(pmin) && !Number.isNaN(pmax)) {
					if (pmin >= pmax) {
						return false;
					}
				}
			}
			if (pmin !== '' && !Number.isNaN(pmin)) {
				return true;
			}
			if (pmax !== '' && !Number.isNaN(pmax)) {
				return true;
			}
			return false;
		} else if (price !== '' && !Number.isNaN(price)) {
			return true;
		}
		return false;
	}).withMessage('debe ser un valor numérico o un rango válido'),
], (req, res, next) => {
	validationResult(req).throw();

	const filter = Advertisement.addFilter(req);
	// console.log('FILTER', filter);

	Advertisement.list(filter, (err, advertisements) => {
		if (err) {
			console.log('Error', err);
			next(err);
			return;
		}
		// If it is an Ajax request
		if (req.xhr) {
			res.render('partials/adsList', {
				advertisements: advertisements
			});
			return;
		}
		res.render('index', {
			title: 'Nodepop .',
			advertisements: advertisements
		});
	});
});

module.exports = router;
