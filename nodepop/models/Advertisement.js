
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

// Add a static method to the model
advertisementSchema.statics.list = (filter, callback) => {
	const query = Advertisement.find(filter);
	query.exec(callback);
};

const Advertisement = mongoose.model('Advertisement', advertisementSchema);
module.exports = Advertisement;
