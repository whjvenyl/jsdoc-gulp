// including plugins
var gulp        = require('gulp');
var shell       = require('gulp-shell');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

var config      = require('./grunt-maven.json');

gulp.task('docs', shell.task([
 'node node_modules/jsdoc/jsdoc.js '+
   '-c node_modules/angular-jsdoc/conf.json '+   // config file
   '-t node_modules/angular-jsdoc/template '+    // template file
   '-d ' + config.targetPath + '/generated '+        // output directory
   './README.md ' +                              // to include README.md as index contents
   '-r ' + config.projectRootPath + '/../../application/portalserver/src/main/webapp/static/fipo/lib/shared'                       // source code directory
]));

// Static Server + watching scss/html files
gulp.task('serve', ['docs'], function() {

    browserSync.init({
        server: config.targetPath + "/generated"
    });

    gulp.watch([config.projectRootPath + '/../../application/portalserver/src/main/webapp/static/fipo/lib/shared/**/*.js'], ['docs']);
    gulp.watch(config.targetPath + "/generated/*.html").on('change', reload);
});

gulp.task('default', ['docs']);
