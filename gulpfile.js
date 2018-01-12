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
    lib: ["es2015", "es2015.promise", "dom", "es5"],
    typeRoots: [
        "node_modules/@types",
        "node_modules/web-ext-types"
    ]
});

// add custom browserify options here
var backgroundOpts = {
    entries: ['src/js/main.js'],
    debug: true
};

var uiOpts = {
    entries: ['src/js/ui.js'],
    debug: true
};


var backgroundOpts = assign({}, watchify.args, backgroundOpts);
var uiOpts = assign({}, watchify.args, uiOpts);

var backgroundBundlerVariable = watchify(browserify(backgroundOpts));
var uiBundlerVariable = watchify(browserify(uiOpts));

// Set up src ts build task
gulp.task("srcCompileTS", function () {
    return gulp.src('src/ts/**/*.ts')
        .pipe(compilation()) // <- new compilation
        .pipe(gulp.dest('src/js/'));

});

backgroundBundlerVariable.on('update', backgroundBundler); // on any dep update, runs the bundler
backgroundBundlerVariable.on('log', gutil.log); // output build logs to terminal

uiBundlerVariable.on('update', uiBundler); // on any dep update, runs the bundler
uiBundlerVariable.on('log', gutil.log); // output build logs to terminal

function backgroundBundler() {
    return backgroundBundlerVariable.bundle()
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

function uiBundler() {
    return uiBundlerVariable.bundle()
        // log errors if they happen
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('ui.src.js'))
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


gulp.task("srcCompileJS", ["srcCompileTS"], function () {
    backgroundBundler();
    uiBundler();
});

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
    gulp.watch('src/ts/**/*.ts', ['srcCompileTS', 'srcCompileJS', 'notifySRCComplete'], function () {
        // Run srcCompileTS
        console.log("Src TS Watch fired!");
    });
});