// including plugins
var gulp        = require('gulp');
var shell       = require('gulp-shell');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

gulp.task('docs', shell.task([
 'node node_modules/jsdoc/jsdoc.js '+
   '-c node_modules/jsdoc-template-angular/conf.json '+   // config file
   '-t node_modules/jsdoc-template-angular/template '+    // template file
   '-d ./generated '+                                     // output directory
   './README.md ' +                                       // to include README.md as index contents
   '-r ./src'                                             // source code directory
]));

// Static Server + watching scss/html files
gulp.task('serve', ['docs'], function() {

    browserSync.init({
        server: "./generated"
    });

    gulp.watch(['./src/**/*.js'], ['docs']);
    gulp.watch("./generated/*.html").on('change', reload);
});

gulp.task('default', ['docs']);
