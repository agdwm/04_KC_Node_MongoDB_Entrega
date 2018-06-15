'use strict';

const express = require('express');
const router = express.Router();

const { query, validationResult } = require('express-validator/check');
const mongoose = require('mongoose');

const Advertisement = mongoose.model('Advertisement');


/* GET home page. */
router.get('/:lang(es|en)?', [
	// Query String Validations wity express-validator
	query('isSale').isBoolean().optional().withMessage('must be one of these values: true or false')
], (req, res, next) => {
	validationResult(req).throw();

	// const xhr = ;
	const filter = Advertisement.addFilter(req);
	// console.log('FILTER', filter);

	Advertisement.list(filter, (err, advertisements) => {
		if (err) {
			console.log('Error', err);
			next(err);
			return;
		}
		// console.log("SERVIDOR", advertisements);
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
