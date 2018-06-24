'use strict';

const mongoose = require('mongoose');
const fs = require('fs-extra');
const flow = require('../lib/flowControl');

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

/**
 * carga un json de anuncios
 */
advertisementSchema.statics.loadJson = (file, cb) => {
	// Encodings: https://nodejs.org/api/buffer.html
	fs.readFile(file, {
		encoding: 'utf8',
	}, (err, data) => {
		if (err) return cb(err);
		console.log(`${file} read`);

		if (data) {
			const advertisements = JSON.parse(data).advertisements;
			const numAnuncios = advertisements.length;

			flow.serialArray(advertisements, Advertisement.createRecord, (err) => {
				if (err) return cb(err);
				return cb(null, numAnuncios);
			});
		} else {
			return cb(new Error(__('empty_file', { file: file })));
		}
	});
};

advertisementSchema.statics.createRecord = (nuevo, cb) => {
	new Advertisement(nuevo).save(cb);
};

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

advertisementSchema.statics.list = async (filters, startRow, numRows, sortField, includeTotal, callback) => {

	const query = Advertisement.find(filters);
	query.skip(startRow);
	query.limit(numRows);
	query.sort(sortField);

	const result = {};

	if (includeTotal) {
		result.total = await Advertisement.find(filters).count();
	}

	result.advertisements = await query.exec();


	if (callback) {
		return callback(null, result);
	}

	return result; 
};

const Advertisement = mongoose.model('Advertisement', advertisementSchema);
module.exports = Advertisement;
