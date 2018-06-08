'use strict';

const express = require('express');
const router = express.Router();

const { query, validationResult } = require('express-validator/check');

const mongoose = require('mongoose');
const Advertisement = mongoose.model('Advertisement');


/* GET home page. */
router.get('/:lang(es|en)', [
	query('isSale').isBoolean().optional().withMessage('must be one of these values: true or false')
], (req, res, next) => {
	validationResult(req).throw();
	res.render('index', {
		title: 'Nodepop .'
	});
});


module.exports = router;
