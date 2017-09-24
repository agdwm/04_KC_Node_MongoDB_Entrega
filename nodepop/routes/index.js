var express = require('express');
var router = express.Router();

const {query, validationResult } = require('express-validator/check');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Nodepop' });
});

//Ejemplo Validacion
/*router.get('/querystring', [
  query('age').isNumeric().withMessage('Must be numeric')
], (req, res, next) => {
  validationResult(req).throw();
  console.log('req.query', req.query);
  res.send('ok');
});*/

module.exports = router;
