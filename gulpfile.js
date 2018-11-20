const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const gcmq = require('gulp-group-css-media-queries');
const preproc = require('gulp-less');
var imagemin = require('gulp-imagemin');

const config = {
    src: './src',
    css: {
        watch: '/precss/**/*.less',
        src: '/precss/+(styles|styles-ie).less',
        dest: '/css'
    },
    html: {
        src: '/index.html'
    }
};

gulp.task('build', function () {
    gulp.src(config.src + config.css.src)
            .pipe(sourcemaps.init())
            .pipe(preproc())
            .pipe(gcmq())
            .pipe(autoprefixer({
                browsers: ['> 0.1%'],
                cascade: false
            }))
            .pipe(cleanCSS({
                level: 2
            }))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(config.src + config.css.dest))
            .pipe(browserSync.reload({
                stream: true
            }));
});

gulp.task('watch', ['browserSync'], function () {
    gulp.watch(config.src + config.css.watch, ['build']);
    gulp.watch(config.src + config.html.src, browserSync.reload);
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: config.src
        }
    });
});
gulp.task('compress', function() {
    gulp.src('src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/images'))
  });

gulp.task('default', ['watch']);