'use strict';

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Advertisement = mongoose.model('Advertisement');

// GET / -> /apiv1/ads
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

	advertisement.save((err, advertisementSaved) => {
		if (err) {
			console.log('Error', err);
			next(err);
			return;
		}
		res.json({ success: true, result: advertisementSaved });
	});
});

//PUT /
router.put('/:id', (req, res, next) => {
	const id = req.params.id;
	Advertisement.findOneAndUpdate({ _id: id }, req.body, { new: true }, (err, advertisementUpdated) => {
		if (err) {
			console.log('Error', err);
			next(err);
			return;
		}
		res.json({ success: true, result: advertisementUpdated });
	});
});

module.exports = router;
