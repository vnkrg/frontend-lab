
const gulp = require('gulp')
const { series, watch, parallel } = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()

function htmlTask () {
    return gulp.src('src/*.html')
    .pipe(gulp.dest('build'))
    .pipe(browserSync.stream())
}

function cssTask () {
    return gulp.src('src/css/**/*.css')
    .pipe(gulp.dest('build/css'))
}

function sassTask () {
    return gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream())
}

function imageTask () {
    return gulp.src('src/images/**/*')
    .pipe(gulp.dest('build/images'))
    .pipe(browserSync.stream())
}

function serveTask () {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    })
}

function watchTask () {
    watch('src/*.html', htmlTask)
    watch('src/scss/**/*.scss', sassTask)
    watch('src/images/**/*', imageTask)
}
  
exports.default = series(
    parallel(htmlTask, cssTask, sassTask, imageTask),
    parallel(serveTask, watchTask)
)