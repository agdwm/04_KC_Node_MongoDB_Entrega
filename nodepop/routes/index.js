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

			if (typeof querytags === 'string') {
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
	query('skip').optional().isNumeric().withMessage('debe ser un valor numérico'),
	query('limit').optional().isNumeric().withMessage('debe ser un valor numérico'),
], async (req, res, next) => {
	try {
		validationResult(req).throw();

		const filters = Advertisement.addFilter(req);

		const skip = parseInt(req.query.skip, 10) || 0; // page
		const limit = parseInt(req.query.limit, 10) || 8; // perPage
		const sort = req.query.sort || '_id';
		const includeTotal = true;

		const { total, advertisements } = await Advertisement.list(filters, skip, limit, sort, includeTotal);

		// If it is an Ajax request
		if (req.xhr) {
			res.render('partials/adsList', {
				limit: limit,
				total: total,
				advertisements: advertisements
			});
			return;
		}

		res.render('index', {
			title: 'Nodepop .',
			limit: limit,
			total: total,
			advertisements: advertisements
		});
	} catch (err) { next(err) }
});

module.exports = router;
