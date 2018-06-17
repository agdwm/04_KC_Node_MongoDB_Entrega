'use strict';

const express = require('express');
const router = express.Router();

const { query, validationResult } = require('express-validator/check');
const mongoose = require('mongoose');

const Advertisement = mongoose.model('Advertisement');


/* GET home page. */
router.get('/:lang(es|en)?', [
	// Query String VALIDATIONS with 'express-validator'
	query('isSale').isBoolean().optional().withMessage('debe ser uno de los siguientes valores: "true" o "false"'),
	query('price').optional().custom((value) => {
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
	query('tags').optional().custom((querytags) => {
		if (querytags) {
			const possibleValues = ['lifestyle', 'work', 'mobile', 'motor'];
			const currentTags = [];

			if (querytags.length === 1) {
				if (possibleValues.indexOf(querytags) === -1) {
					return false;
				}
			} else {
				for (let i = 0; i < querytags.length; i++) {
					if (possibleValues.indexOf(querytags[i]) === -1) {
						return false;
					}
					if (currentTags.indexOf(querytags[i]) >= 0) {
						return false;
					}
					currentTags.push(querytags[i]);
				}
			}
			return true;
		}
		return true;
	}).withMessage('debe ser uno de los siguientes valores: "lifestyle", "work", "mobile" or "motor" y no puede estar repetido'),
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
