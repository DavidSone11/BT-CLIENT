
'use strict';

var gulp = require("gulp");
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
let minifyCSS = require('gulp-clean-css');
var clean = require('gulp-clean');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync').create();
var gulpCopy = require('gulp-copy');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var merge = require('merge-stream');
var fs = require('fs');
var fontmin = require('gulp-fontmin');
var cssnano = require('gulp-cssnano');


gulp.task("minify-css", function (e) {
    gulp.src('public_dev/css/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(minifyCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(concat('main.style.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/dest/stylesheets/'));

});

// gulp.task('minify-html', function () {
//     return gulp.src('public/*.html')
//         .pipe(htmlmin({ collapseWhitespace: true }))
//         .pipe(gulp.dest('public/'));
// });

gulp.task('minify-image', () =>
    gulp.src('public_dev/images/**/*.+(png|jpg|jpeg|gif)')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.jpegtran({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(gulp.dest('public/images'))
);

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "public"
        }
    });
});


 
gulp.task('min-fonts', function () {
    return gulp.src('public_dev/fonts/**/*.ttf')
        .pipe(fontmin({}))
        .pipe(rename('small.ttf'))
        .pipe(gulp.dest('public/fonts/'));
});

gulp.task('ng', function () {
    return gulp
        .src('public_dev/ng/**/')
        .pipe(gulp.dest('public/ng'));
});

// gulp.task('bower-copy', function () {
//     return gulp
//         .src('public/bower_components/**/')
//         .pipe(gulp.dest('public/bower_components/'));
// });

gulp.task('min-sass', function () {
    return gulp.src('public_dev/sass/**/*.scss')
        .pipe(concat('main.style.min.css'))
        .pipe(sass())
        .pipe(gulp.dest('public/stylesheets/'));
});

gulp.task('minify-js', function () {
    return gulp.src('public_dev/js/**/*.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest('public/javascripts/'));

});

gulp.task('build-minify-styles', function () {

    var lessStream = gulp.src(['public_dev/less/**/*.less'])
        .pipe(less())
        .pipe(concat('less-files.less'));

    // var scssStream = gulp.src(['public_dev/sass/**/*.scss'])
    //     .pipe(sass())
    //     .pipe(concat('scss-files.scss'));

    var cssStream = gulp.src(['public_dev/css/**/*.css'])
        .pipe(concat('css-files.css'));

    // var mergedStream = merge(lessStream, scssStream, cssStream)
    //     .pipe(sourcemaps.init())
    //     .pipe(autoprefixer())
    //     .pipe(rename({ suffix: '.min' }))
    //     .pipe(concat('main.style.min.css'))
    //      .pipe(minifyCSS({ compatibility: 'ie8' }))
    //     .pipe(sourcemaps.write())
    //     .pipe(gulp.dest('public/stylesheets/'));


    var mergedStream = merge(lessStream,cssStream)
    .pipe(concat('main.style.min.css'))
    .pipe(cssnano())
    .pipe(gulp.dest('public/stylesheets/'));
    return mergedStream;
});

gulp.task('watch',['browser-sync', 'build-minify-styles', 'ng'] ,function () {
    gulp.watch("public_dev/css/**/*.css", ['build-minify-styles']);
    gulp.watch("public_dev/sass/**/*.scss", ['build-minify-styles']);
    gulp.watch("public_dev/sass/**/*.scss", ['min-sass']);
    
    gulp.watch("public_dev/less/**/*.less", ['build-minify-styles']);
    gulp.watch("public_dev/ng/**/*", ['ng']);
    gulp.watch("public_dev/images/*.*", ['minify-image']);
    gulp.watch("public_dev/js/*.js", ['minify-js']);
    gulp.watch('public_dev/**/*.html', ['ng']);
    gulp.watch('public_dev/**/*', browserSync.reload);
});

gulp.task('clean', function () {
    return del.sync(['public/stylesheets/**/*.css', 'public/javascripts/**/*.js','public/images/**/*.*','public/ng/**/*','public/ng/public/**/*.html','!public/bower_components/**/*']);

});

gulp.task("default", ['min-sass','build-minify-styles', 'minify-image','min-fonts', 'minify-js','ng','watch', 'browser-sync']);
// gulp.task("default", ['build-minify-styles', 'minify-image','min-fonts', 'minify-js','ng','watch', 'browser-sync']);
