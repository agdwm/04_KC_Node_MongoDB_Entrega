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
		type: Array,
		index: true
	}
});

mongoose.model('Advertisement', advertisementSchema);
