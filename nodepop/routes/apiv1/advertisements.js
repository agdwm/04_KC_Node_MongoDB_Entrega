'use strict';

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Advertisement = mongoose.model('Advertisement');

// GET / -> /apiv1/ads
// FILTERS: // -> /apiv1/ads?title=Apple&tags=lifestyle&tags=motor
router.get('/', (req, res, next) => {

	const title = req.query.title;
	const tags = req.query.tags;
	const isSale = req.query.isSale;
	const price = req.query.price;

	console.log("request", req);
	console.log("isSale", isSale);

	const filter = {};

	if (title) {

		const regexp = new RegExp(`^${title}`, 'i');
		filter.title = { $regex: regexp };
	}

	if (tags) {
		filter.tags = {	$all: tags };
	}

	if (isSale) {
		filter.isSale = isSale;
	}

	if (price) {
		if (price.indexOf('-') >= 0) {
			const range = price.split('-');
			const pmin = parseFloat(range[0]);
			const pmax = parseFloat(range[1]);

			if (pmin) {
				filter.price = {
					$gte: pmin
				};
			}

			if (pmax) {
				filter.price = {
					$lte: pmax
				};
			}
		} else {
			filter.price = parseFloat(price);
		}
	}

	Advertisement.list(filter, (err, lista) => {
		if (err) {
			console.log('Error', err);
			next(err);
			return;
		}
		res.json({
			success: true,
			rows: lista
		}); // This method always returns an array
	});
});

// GET / -> /apiv1/ads/id
router.get('/:id', (req, res, next) => {
	const id = req.params.id;

	Advertisement.findOne({
		_id: id
	}, (err, advertisement) => {
		if (err) {
			console.log('Error', err);
			next(err);
			return;
		}
		res.json({
			success: true,
			row: advertisement
		});
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
		res.json({
			success: true,
			result: advertisementSaved
		});
	});
});

// PUT / -> /apiv1/ads/id
router.put('/:id', (req, res, next) => {
	const id = req.params.id;

	Advertisement.findOneAndUpdate({
		_id: id
	}, req.body, {
		new: true
	}, (err, advertisementUpdated) => {
		if (err) {
			console.log('Error', err);
			next(err);
			return;
		}
		res.json({
			success: true,
			result: advertisementUpdated
		});
	});
});

// DELETE / -> /apiv1/ads/id
router.delete('/:id', (req, res, next) => {
	const id = req.params.id;

	Advertisement.remove({
		_id: id
	}, (err) => {
		if (err) {
			console.log('Error', err);
			next(err);
			return;
		}
		res.json({
			success: true
		});
	});
});

module.exports = router;