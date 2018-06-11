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

	const filter = Advertisement.addFilter(req);

	Advertisement.list(filter, (err, advertisements) => {
		if (err) {
			console.log('Error', err);
			next(err);
			return;
		}
		console.log(advertisements);
		res.render('index', {
			title: 'Nodepop .',
			advertisements: advertisements
		});
	});
});

module.exports = router;
