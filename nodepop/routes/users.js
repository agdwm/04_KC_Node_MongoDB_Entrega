'use strict';

const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => { /* eslint-disable */
	res.send('respond with a resource');
});

module.exports = router;
