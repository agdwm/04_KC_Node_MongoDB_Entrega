'use strict';

const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Advertisement = mongoose.model('Advertisement');

// GET /
router.get('/', (req, res, next) => {
	Advertisement.find({}, (err, lista) => {
		if (err) {
			console.log('Error', err);
			next(err);
			return;
		}
		res.json({ success: true, rows: lista });
	});
});

module.exports = router;
