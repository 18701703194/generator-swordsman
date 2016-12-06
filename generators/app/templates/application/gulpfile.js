var gulp = require('gulp');
var path = require('path');
var del = require('del');
var runSequence = require('run-sequence').use(gulp);
var webpack = require("webpack");

var html_dir = require('./f2eci.json').output;
var build_dir = require('./f2eci.json').dist;


gulp.task('clean', function () {
  return del([
    build_dir + "/**/**"
  ]);
});

gulp.task('html', function () {
  return gulp.src(['./' + html_dir + '/**/*.*'])
    .pipe(gulp.dest(build_dir));
});


gulp.task('webpack', function (cb) {
  webpack(require('./webpack.config'), function (err, stats) {
    console.info(stats.toString());
    cb();
  });
});


gulp.task('default', function () {
  runSequence('clean', 'html');
});

