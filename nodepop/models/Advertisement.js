
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
}, {
	collection: 'advertisements'
});

// Add a static method to the model
advertisementSchema.statics.list = (filter, callback) => {
	const query = Advertisement.find(filter);
	console.log(query);
	query.exec(callback);
};

const Advertisement = mongoose.model('Advertisement', advertisementSchema);
module.exports = Advertisement;
