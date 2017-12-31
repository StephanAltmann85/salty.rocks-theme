var gulp = require('gulp'),
	es6 = require('es6-promise').polyfill(),
    watch = require('gulp-watch'),
    shell = require('gulp-shell'),
    browserSync = require('browser-sync').create(),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	cleanCSS = require('gulp-clean-css'),
    runSequence = require('run-sequence'),
    cssbeautify = require('gulp-cssbeautify');


gulp.task('default', function () {
    return gulp.src('css/*.css')
        //.pipe(autoprefixer())
        .pipe(cleanCSS({debug: true}, function(details) {
            console.log(details.name + ': ' + (details.stats.minifiedSize/1024).toFixed(2)  + '/' + (details.stats.originalSize/1024).toFixed(2) + " kB");
        }))
        .pipe(gulp.dest('css/compiled'));
});

gulp.task('watch', function() {
    browserSync.init({
        proxy: "http://nylonhase/drupal-8.0.6/"
    });

    gulp.watch("css/*.css").on('change', browserSync.reload);
    gulp.watch("templates/*.twig").on('change', browserSync.reload);
    gulp.watch("*.yml").on('change', function() {
        runSequence('clearcache', ['reload']);
    })
});

gulp.task('clearcache', shell.task([
    'drush cr'
]));

gulp.task('reload', function() {
    browserSync.reload();
});

gulp.task('beautify', function() {
    return gulp.src('./css/*.css')
        .pipe(cssbeautify())
        .pipe(gulp.dest('./css/'));;
});
