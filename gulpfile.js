var gulp = require('gulp');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

var temp = '.tmp/';
var dist = './dist/';

gulp.task('default', function () {
  gulp.run('serve');
});

gulp.task('serve', ['watch', 'scss-compile', 'copy-html'], function () {
  browserSync.init({
    server: {
      baseDir: '.tmp',
      routes: {
        '/images': 'src/images',
        '/js': 'src/js'
      }
    }
  });
});

gulp.task('watch', function () {
  return gulp.watch(['src/**/*.html', 'src/**/*.scss', 'src/**/*.js'],
    ['scss-compile', 'copy-html', '_browserSyncReload']);
});

gulp.task('scss-compile', function () {
  return gulp.src(['src/**/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({dirname: 'css'}))
    .pipe(gulp.dest(temp));
});

gulp.task('copy-html', function () {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest(temp));
});

gulp.task('_browserSyncReload', function (cb) {
  // XXX: This should be re-written as synced dependency
  // Use hack to force reload after some delay
  setTimeout(function () {
    browserSync.reload();
    cb();
  }, 100);
});

gulp.task('release:css', function () {
  return gulp.src(['src/**/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest(dist));
});
