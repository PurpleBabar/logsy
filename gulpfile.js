var gulp = require('gulp');
var less = require('gulp-less');
var watch = require('gulp-watch-less');
var rename = require('gulp-rename');
var uglify = require('gulp-clean-css');
var plumber = require('gulp-plumber')

gulp.task('minify', function() {
  return gulp.src('assets/css/*.less')
    .pipe(plumber({
      handleError: function (err) {
          console.log(err);
          this.emit('end');
      }
    }))
    // .pipe(watch('./src/Weeknlearn/WebBundle/Resources/public/css/style.less'))
    .pipe(less())
    .pipe(gulp.dest('assets/css/'))
    .pipe(uglify({}))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('assets/css/'));
});

gulp.task('themeMinify', function() {
  return gulp.src('./*.less')
    .pipe(plumber({
      handleError: function (err) {
          console.log(err);
          this.emit('end');
      }
    }))
    // .pipe(watch('./src/Weeknlearn/WebBundle/Resources/public/css/style.less'))
    .pipe(less())
    .pipe(gulp.dest('./'))
    .pipe(uglify({}))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./'));
});

gulp.task('theme', function() {
  return gulp.src('./*.less')
    .pipe(plumber({
      handleError: function (err) {
          console.log(err);
          this.emit('end');
      }
    }))
    .pipe(watch('./*.less', function(){
            gulp.run(['themeMinify']);
    }))
    .pipe(less())
    .pipe(gulp.dest('./'))
    .pipe(uglify({}))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['minify'], function() {
  return gulp.src('assets/css/*.less')
    .pipe(plumber({
      handleError: function (err) {
          console.log(err);
          this.emit('end');
      }
    }))
    .pipe(watch('assets/css/*.less', function(){
            gulp.run(['minify']);
    }))
    .pipe(less())
    .pipe(gulp.dest('assets/css/'))
    .pipe(uglify({}))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('assets/css/'));
});
