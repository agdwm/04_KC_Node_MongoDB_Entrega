const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => { /* eslint-disable */
	res.render('index', {
		title: 'Nodepop .'
	});
});

module.exports = router;
