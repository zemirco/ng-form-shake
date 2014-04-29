var gulp = require('gulp');
var prefix = require('gulp-autoprefixer');

gulp.task('default', function() {
  
  gulp.src('./css/dev/styles.css')
    .pipe(prefix({
      cascade: true
    }))
    .pipe(gulp.dest('./css/prod/'));
  
});