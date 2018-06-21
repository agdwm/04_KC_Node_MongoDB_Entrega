'use strict';

const mongoose = require('mongoose');

const advertisementSchema = mongoose.Schema({
	title: {
		type: String,
		index: true
	},
	isSale: {
		type: Boolean,
		index: true
	},
	price: {
		type: Number,
		index: true
	},
	photo: String,
	tags: [{
		type: String,
		enum: ['work', 'lifestyle', 'mobile', 'motor'],
		index: true
	}]
}, {
	collection: 'advertisements'
});

// Add a statics methods to the model
advertisementSchema.statics.addFilter = (req) => {
	const { title } = req.query;
	const { tags } = req.query;
	const { isSale } = req.query;
	const { price } = req.query;

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
			console.log('range', range);
			console.log('pmin', pmin);
			console.log('pmax', pmax);

			if (pmin && pmax) {
				filter.price = {
					$gte: pmin,
					$lte: pmax
				};
			} else if (pmin) {
				filter.price = {
					$gte: pmin
				};
			} else if (pmax) {
				filter.price = {
					$lte: pmax
				};
			}
		} else {
			filter.price = parseFloat(price);
		}
	}
	return filter;
};

advertisementSchema.statics.list = (filter, callback) => {
	const query = Advertisement.find(filter);
	query.exec(callback);
};

const Advertisement = mongoose.model('Advertisement', advertisementSchema);
module.exports = Advertisement;
