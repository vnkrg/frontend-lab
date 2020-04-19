
const gulp = require('gulp')
const { series, watch, parallel } = require('gulp')
const del = require('del')
const sass = require('gulp-sass')
const csso = require('gulp-csso')
const uglify = require('gulp-uglify')
const htmlmin = require('gulp-htmlmin')
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync').create()

function htmlTask () {
    return gulp.src('./src/*.html')
    .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true
    }))
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream())
}

function cssTask () {
    return gulp.src('./src/css/**/*.css')
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(gulp.dest('./build/css'))
}

function sassTask () {
    return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('./error',sass.logError))
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream())
}

function jsTask () {
    return gulp.src('./src/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream())
}

function imageTask () {
    return gulp.src('./src/images/**/*')
    .pipe(gulp.dest('./build/images'))
    .pipe(browserSync.stream())
}

function cleanTask () {
    return del(['./build'])
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
    watch('src/js/**/*.js', jsTask)
    watch('src/images/**/*', imageTask)
}
  
exports.default = series(
    cleanTask,
    parallel(htmlTask, cssTask, sassTask, imageTask, jsTask),
    parallel(serveTask, watchTask)
)