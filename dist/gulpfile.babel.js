import gulp from 'gulp';
import babel from 'gulp-babel';

gulp.task('es6', () => {
  gulp.src('./*.js')
        .pipe(babel({
          ignore: 'gulpfile.babel.js'
        }))
        .pipe(gulp.dest('./dist'));
});
gulp.task('watch', () => {
  gulp.watch('./*.js', ['es6']);
});
gulp.task('default', ['es6', 'watch']);
