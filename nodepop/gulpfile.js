/* gulpfile.js */
// UTILS
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const nodemon = require('gulp-nodemon');
const notify = require('gulp-notify');
const tap = require('gulp-tap');
const buffer = require('gulp-buffer');
// CSS
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const syntaxScss = require('postcss-scss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const stylelint = require('stylelint');
// JS
const browserify = require('browserify');
const uglify = require('gulp-uglify');
const eslint = require('gulp-eslint');
// IMG
const responsive = require('gulp-responsive');
const imagemin = require('gulp-imagemin');


// source and distribution folder
const reload = browserSync.reload;
const origin = './';
const source = './src/';
const dest = './public/';
const views = './views/';

// Bootstrap scss source
const bootstrapSass = {
	in: './node_modules/bootstrap-sass/',
};

// fonts
const fonts = { 
	in: [source + 'fonts/*.*', bootstrapSass.in + 'assets/fonts/**/*'],
	out: dest + 'fonts/'
};

// css source file: .scss files
const scss = {
	in: source + 'scss/style.scss',
	out: dest + 'css/',
	watch: source + 'scss/**/*',
	lint: source + 'scss/*.scss',
	sassOpts: {
		outputStyle: 'nested',
		precison: 3,
		errLogToConsole: true,
		includePaths: [bootstrapSass.in + 'assets/stylesheets']
	}
};

const js = { 
	in: source + 'js/main.js',
	out: dest + 'js/',
	watch: source + 'js/**/*'
};

const img = {
	in: source + 'images/**/*',
	out: dest + 'images/',
	watch: source + 'images/**/*'
}
// copy bootstrap required fonts to dest
gulp.task('fonts', () => {
	return gulp
		.src(fonts.in)
		.pipe(gulp.dest(fonts.out));
});

gulp.task('stylelint', function () {
	return gulp.src(scss.lint)
		.pipe(postcss([
			stylelint()
		], {
			syntax: syntaxScss,
		}));
});

// compile scss
gulp.task('sass', ['fonts', 'stylelint'], function () {
	gulp.src(scss.in)
		.pipe(sourcemaps.init())
		.pipe(sass(scss.sassOpts).on('error', function (error) {
			return notify().write(error);
		}))
		.pipe(postcss([
			autoprefixer(),
			cssnano()
		]))
		.pipe(sourcemaps.write(origin))
		.pipe(gulp.dest(scss.out))
		.pipe(browserSync.stream())
		.pipe(notify({ message: 'SASS Compiled 🤘🏻' }));
});

gulp.task('js', () => {
	gulp.src(js.in)
		.pipe(tap((file) => {
			file.contents = browserify(file.path, {
				debug: true,
			})
				.transform('babelify', { presets: ['es2015']})
				.bundle()
				.on('error', (error) => {
					return notify().write(error);
				});
		}))
		.pipe(buffer())
		.pipe(sourcemaps.init({
			loadMaps: true,
		}))
		.pipe(uglify())
		.pipe(sourcemaps.write(origin))
		.pipe(gulp.dest(js.out))
		.pipe(browserSync.stream())
		.pipe(notify({ message: 'JavaScript compiled' }));
});

gulp.task('eslint', () => {
	return gulp.src(['**/*.js', '!node_modules/**', '!.gulpfile.js'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError()).on('error', (error) => {
			return notify({
				message: 'Lint Error',
			}).write(error);
		});
});

gulp.task('img', () => {
    gulp.src(img.in)
        .pipe(responsive({ // generamos las versiones responsive
            '*': [
                { width: 150, rename: { suffix: '-150px' }},
                { width: 250, rename: { suffix: '-250px' }},
                { width: 300, rename: { suffix: '-300px' }}
            ]
        }))
        .pipe(imagemin()) // optimizamos el peso de las imágenes
		.pipe(gulp.dest(img.out))
		.pipe(notify({ message: 'Images task complete' }));
});

// BrowserSync
gulp.task('browserSync', ['nodemon'], () => {
	browserSync.init({
		proxy: 'http://localhost:3000',
		port: 4000,
		open: false,
		notify: false,
		// snippetOptions: {
		//   rule: {
		//     match: /<\/body>/i,
		//     fn: function (snippet, match) {
		//       return snippet + match;
		//     }
		//   }
		// }
	});
});

// Nodemon
gulp.task('nodemon', (callback) => {
	let started = false;
	return nodemon({
			script: './bin/www',
			ext: 'js',
			ignore: ['public/**/*.js'],
			env: {
				'NODE_ENV': 'development',
				'DEBUG': 'nodepop:*'
			}
		}).on('start', () => {
			//avoid nodemon being started multiple times
			if (!started) {
				callback();
				started = true;
			}
		})
		.on('crash', () => {
			console.log('nodemon.crash');
		})
		.on('restart', () => {
			console.log('nodemon.restart');
		})
		.once('quit', () => {
			// handle ctrl+c without a big weep
			process.exit();
		});
});

// Give nodemon time to restart
gulp.task('bs-delay', () => {
	setTimeout(() => {
		reload({
			stream: false
		});
	}, 1000);
});

// default task
gulp.task('default', ['img', 'sass', 'js', 'browserSync'], () => {
	gulp.watch(scss.watch, ['sass']);
	gulp.watch(js.watch, ['js']);
	// gulp.watch(img.watch, ['img']);
	gulp.watch([views+'**/*.ejs', views+'*.ejs'], reload);
	gulp.watch(['./routes/**/*.js', './app.js', './bin/www'], ['bs-delay']);
});
