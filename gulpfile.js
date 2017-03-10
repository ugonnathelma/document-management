const gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  nodemon = require('gulp-nodemon'),
  babel = require('gulp-babel');


gulp.task('default', ['browser-sync'], () => {
});

const paths = {
  jsfiles: ['server/controllers/*.js']
};

gulp.task('nodemon', () => {
  return nodemon({
    script: 'server.js',
    ext: 'js'
  });
});

gulp.task('watch', () => {
  gulp.watch(paths.jsfiles, browserSync.reload);
});

gulp.task('default', ['watch', 'nodemon']);

