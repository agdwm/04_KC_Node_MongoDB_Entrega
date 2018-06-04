'use strict';

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Advertisement = mongoose.model('Advertisement');

router.get('/', (req, res, next) => {
	res.json({
		tags: Advertisement.schema.path('tags.0').enumValues
	});
});

module.exports = router;
