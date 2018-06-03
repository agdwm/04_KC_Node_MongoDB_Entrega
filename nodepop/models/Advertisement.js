
'use strict';

const mongoose = require('mongoose');

const advertisementSchema = mongoose.Schema({
	title: {
		type: String,
		index: true
	},
	modality: {
		type: String,
		index: true
	},
	price: {
		type: Number,
		index: true
	},
	photo: String,
	tags: {
		type: String,
		enum: {
			values: ['work', 'lifestyle', 'mobile', 'motor']
		},
		index: true
	}
});

const Advertisement = mongoose.model('Advertisement', advertisementSchema);
module.exports = Advertisement;
