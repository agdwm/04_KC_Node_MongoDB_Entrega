'use strict';

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
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

// POST /
router.post('/', (req, res, next) => {
	const advertisement = new Advertisement(req.body);

	advertisement.save((err, advertisementGuardado) => {
		if (err) {
			return next(err);
		}
		res.json({ success: true, advertisement: advertisementGuardado });
	});
});


module.exports = router;
