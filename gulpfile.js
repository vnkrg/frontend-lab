const gulp = require('gulp')
const cleanCSS = require('gulp-clean-css')
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync').create()

gulp.task('html', () => {
    return gulp.src('src/*.html')
    .pipe(gulp.dest('build'))
})

gulp.task('css', () => {
    return gulp.src('src/css/**/*.css')
    .pipe(autoprefixer({
        overrideBrowserslist: ['cover 99.5%'],
        cascade: false
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('build/style'))
})

gulp.task('img', () => {
    return gulp.src('src/images/**/*')
    .pipe(gulp.dest('build/images'))
})

gulp.task('watch', function(){
    gulp.watch('src/*.html', gulp.series('html')).on('change', browserSync.reload)
    gulp.watch('src/*.css', gulp.series('css')).on('change', browserSync.reload)
    gulp.watch('src/*', gulp.series('img')).on('change', browserSync.reload)
})

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    })
})

gulp.task('default', gulp.series(
    gulp.parallel(
        'html',
        'css',
        'img'
    ),
    gulp.parallel(
        'serve',
        'watch'
    )
))