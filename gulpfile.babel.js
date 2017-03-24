const gulp = require('gulp');
const babel = require('gulp-babel');

const nodemon = require('gulp-nodemon');

gulp.task('default', ['watch'], () => {
});

gulp.task('watch', () => {
  gulp.watch('server/*.js', () => {
    gulp.src('server/*.js')
      .pipe(babel({
        presets: ['es2015']
      }))
      .pipe(gulp.dest('/'));
  });
});

gulp.task('nodemon', () => {
  nodemon({
    script: 'bundle.js',
  });
});
