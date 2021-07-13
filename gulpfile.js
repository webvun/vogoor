var gulp = require('gulp'); 
var babel = require('gulp-babel');

function es6Commonjs() {
    return gulp.src(['src/*.js','src/**/*.js'])
    .pipe(babel({
        "presets": [
          [
            "@babel/preset-env"
          ]
        ]
      }))
    .pipe(gulp.dest('build'));
}

gulp.task('default', gulp.series(
    es6Commonjs
));