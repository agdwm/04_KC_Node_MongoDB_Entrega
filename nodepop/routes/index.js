'use strict';

const express = require('express');
const router = express.Router();

const { check, query, param, validationResult } = require('express-validator/check');

const mongoose = require('mongoose');
const Advertisement = mongoose.model('Advertisement');

/* GET home page. */
router.get(['/', '/:lang(es|en)'], [
	check('lang').isIn(['en', 'es']).withMessage('Possible values: en, es'),
], (req, res, next) => {
	console.log('PARAMETROS', req.params.lang);
	validationResult(req).throw();
	res.render('index', {
		title: 'Nodepop .'
	});
});

module.exports = router;
