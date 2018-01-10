var gulp = require('gulp');
var uglifycss = require('gulp-uglifycss');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
const notifier = require('node-notifier');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var tsify = require('tsify');
var gulpts = require('gulp-typescript');
var shell = require('gulp-shell')
var tsb = require('gulp-tsb');
var watchify = require('watchify');
var gutil = require('gulp-util');
var assign = require('lodash.assign');
// var clean = require('gulp-clean');

// create and keep compiler
var compilation = tsb.create({
    target: 'es5',
    module: 'commonjs',
    declaration: false,
    lib: ["es2015", "es2015.promise", "dom", "es5"]
});

// add custom browserify options here
var customOpts = {
    entries: ['src/main.js'],
    debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

// Set up src ts build task
gulp.task("srcCompileTS", function () {
    return gulp.src('src/**/*.ts')
        .pipe(compilation()) // <- new compilation
        .pipe(gulp.dest('src/'));

});

b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
    return b.bundle()
        // log errors if they happen
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('bundle.src.js'))
        // optional, remove if you don't need to buffer file contents
        .pipe(buffer())
        // optional, remove if you dont want sourcemaps
        .pipe(sourcemaps.init({
            loadMaps: true
        })) // loads map from browserify file
        // Add transformation tasks to the pipeline here.
        // .pipe(uglify())
        .pipe(sourcemaps.write('./')) // writes .map file
        .pipe(gulp.dest('extension/js/'));
}

gulp.task("srcCompileJS", ["srcCompileTS"], bundle)

// gulp.task("cleanJS", ["srcCompileTS", "srcCompileJS"], function() {
//     return gulp.src('src/**/*.js', {read: false})
//         .pipe(clean());
// });

gulp.task('notifySRCComplete', ['srcCompileJS'], function () {
    notifier.notify({
        'title': 'Javascript',
        'message': 'SRC Compilation done!'
    });
});



// Set up watch task
gulp.task('default', ['srcCompileTS', 'srcCompileJS', 'notifySRCComplete'], function () {
    // ----------------------------------------------------------------
    // SRC files watch
    gulp.watch('src/**/*.ts', ['srcCompileTS', 'srcCompileJS', 'notifySRCComplete'], function () {
        // Run srcCompileTS
        console.log("Src TS Watch fired!");
    });
});