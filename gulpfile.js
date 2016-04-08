/*
 * @Author: Administrator
 * @Date:   2016-03-30 14:07:13
 * @Last Modified by:   Administrator
 * @Last Modified time: 2016-04-08 15:27:59
 */
'use strict';

// 载入Gulp模块
var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
//sass -css--压缩
gulp.task('sass', function() {
    return gulp.src('./src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/css'))
        .pipe(sass())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'))
        .pipe(reload({
          stream: true
         }));
});
// 注册脚本合并压缩任务
gulp.task('script', function() {
  gulp.src('src/js/*.js')
    /*.pipe(concat('app.js'))*/
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(reload({
      stream: true
    }));
});
//html 文件的
gulp.task('html', function() {
  gulp.src('src/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
    }))
    .pipe(gulp.dest('dist'))
    .pipe(reload({
      stream: true
    }));
});
//图片文件
gulp.task('image', function() {
  gulp.src('src/img/*.*')
    .pipe(gulp.dest('dist/img'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('serve', ['sass', 'script', 'image', 'html'], function() {
  browserSync({
    notify: false,
    port: 2015,
    server: {
      baseDir: ['dist']
    }
  });
  gulp.watch('src/sass/*.sass', ['sass']);
  gulp.watch('src/scripts/*.js', ['script']);
  gulp.watch('src/*.html', ['html']);
  gulp.watch('src/img/*.*', ['image']);
});