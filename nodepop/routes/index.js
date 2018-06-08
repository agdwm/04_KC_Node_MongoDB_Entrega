'use strict';

const express = require('express');
const router = express.Router();

const { query, validationResult } = require('express-validator/check');

const mongoose = require('mongoose');
const Advertisement = mongoose.model('Advertisement');

/* GET home page. */
router.get(['/', '/:lang(es|en)'], (req, res, next) => {
	res.render('index', {
		title: 'Nodepop .'
	});
});

module.exports = router;
