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
		res.json({ success: true, rows: lista }); // This method always returns an array
	});
});

// GET / -> /apiv1/ads/id
router.get('/:id', (req, res, next) => {
	const id = req.params.id;

	Advertisement.findOne({ _id: id }, (err, advertisement) => {
		if (err) {
			console.log('Error', err);
			next(err);
			return;
		}
		res.json({ success: true, row: advertisement });
	});
});

// POST / -> /apiv1/ads
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

// PUT / -> /apiv1/ads/id
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

// DELETE / -> /apiv1/ads/id
router.delete('/:id', (req, res, next) => {
	const id = req.params.id;

	Advertisement.remove({ _id: id }, (err) => {
		if (err) {
			console.log('Error', err);
			next(err);
			return;
		}
		res.json({ success: true });
	});
});

module.exports = router;
