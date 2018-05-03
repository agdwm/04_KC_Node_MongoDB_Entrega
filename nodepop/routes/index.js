const express = require('express');

const router = express.Router();

const { query, validationResult } = require('express-validator/check');

/* GET home page. */
router.get('/', (req, res) => {
	res.render('index', { title: 'Nodepop' });
});

// Ejemplo Validacion
router.get('/querystring', [
	query('age').isNumeric().withMessage('Must be numeric'),
], (req, res) => {
	validationResult(req).throw();
	console.log('req.query', req.query);
	res.send('ok');
});

module.exports = router;
