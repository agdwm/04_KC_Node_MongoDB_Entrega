const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const header = require('gulp-header');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const nodemon = require('gulp-nodemon');
const pkg = require('./package.json');

// Set the banner content
const banner = ['/*!\n',
	' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
	' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
	' * Licensed under <%= pkg.license %> (https://github.com/BlackrockDigital/<%= pkg.name %>/blob/master/LICENSE)\n',
	' */\n',
	'',
].join('');

// Compiles SCSS files from /scss into /css
gulp.task('sass', () => {
	return gulp.src('scss/style.scss')
		.pipe(sass())
		.pipe(header(banner, {
			pkg: pkg,
		}))
		.pipe(gulp.dest('css'))
		.pipe(browserSync.reload({
			stream: true,
		}));
});

// Minify compiled CSS
gulp.task('minify-css', ['sass'], () => {
	return gulp.src('css/style.css')
		.pipe(cleanCSS({
			compatibility: 'ie8',
		}))
		.pipe(rename({
			suffix: '.min',
		}))
		.pipe(gulp.dest('css'))
		.pipe(browserSync.reload({
			stream: true,
		}));
});

// Minify custom JS
gulp.task('minify-js', () => {
	return gulp.src('js/nodepop.js')
		.pipe(uglify())
		.pipe(header(banner, {
			pkg: pkg,
		}))
		.pipe(rename({
			suffix: '.min',
		}))
		.pipe(gulp.dest('js'))
		.pipe(browserSync.reload({
			stream: true,
		}));
});

// Copy vendor files from /node_modules into /vendor
// NOTE: requires `npm install` before running!
gulp.task('copy', () => {
	gulp.src([
		'node_modules/bootstrap/dist/**/*',
		'!**/npm.js',
		'!**/bootstrap-theme.*',
		'!**/*.map',
	])
		.pipe(gulp.dest('vendor/bootstrap'));

	gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
		.pipe(gulp.dest('vendor/jquery'));

	gulp.src(['node_modules/popper.js/dist/umd/popper.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
		.pipe(gulp.dest('vendor/popper'));

	gulp.src(['node_modules/jquery.easing/*.js'])
		.pipe(gulp.dest('vendor/jquery-easing'));

	gulp.src(['node_modules/simple-line-icons/*/*'])
		.pipe(gulp.dest('vendor/simple-line-icons'));


	gulp.src([
		'node_modules/font-awesome/**',
		'!node_modules/font-awesome/**/*.map',
		'!node_modules/font-awesome/.npmignore',
		'!node_modules/font-awesome/*.txt',
		'!node_modules/font-awesome/*.md',
		'!node_modules/font-awesome/*.json',
	])
		.pipe(gulp.dest('vendor/font-awesome'));
});

// Configure the browserSync task
gulp.task('browserSync', ['nodemon'], () => {
	browserSync.init(null, {
		proxy: 'http://localhost:3000',
		// port: 3001,
		notify: true,
		/* server: {
		  baseDir: '',
		}, */
	});
});

// Default task
gulp.task('default', ['sass', 'minify-css', 'minify-js', 'copy', 'browserSync'], () => {
	gulp.watch(['../views/*.ejs'], browserSync.reload);
});

// Configure the nodemon task
gulp.task('nodemon', (cb) => {
	let callbackCalled = false;
	return nodemon({
		script: '../app.js',
	}).on('start', () => {
		if (!callbackCalled) {
			callbackCalled = true;
			cb();
		}
	});
});

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'sass', 'minify-css', 'minify-js'], () => {
	gulp.watch('scss/*.scss', ['sass']);
	gulp.watch('css/*.css', ['minify-css']);
	gulp.watch('js/*.js', ['minify-js']);
	// Reloads the browser whenever HTML or JS files change
	gulp.watch('*.html', browserSync.reload);
	gulp.watch('js/**/*.js', browserSync.reload);
});
