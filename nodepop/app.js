const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use((request, response, next) => {
	console.log('He recibido una petición');
	next();
});

require('./lib/connectMongoose');
require('./models/Advertisement');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
	extended: false,
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routers
app.use('/', 			require('./routes/index'));
app.use('/users', 		require('./routes/users'));
app.use('/apiv1/tags', 	require('./routes/apiv1/tags'));
app.use('/apiv1/ads', 	require('./routes/apiv1/advertisements'));


function isAPI(req) {
	return req.originalUrl.indexOf('/api') === 0;
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
	res.status(err.status || 500);

	// If request to the API => JSON response
	if (isAPI(req)) {
		res.json({ success: false, error: err.message });
		return;
	}

	// If not request to the API => HTML response
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.render('error');
});

module.exports = app;
