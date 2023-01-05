const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');

// Sass Task
function scssTask() {
    return gulp.src('src/scss/index.scss', { sourcemaps: true })
        .pipe(sass())
        .pipe(gulp.dest('dist/css', { sourcemaps: '.' }));
}

// Img Task
function imgTask() {
    return gulp.src(['src/img/**/*.png', 'src/img/**/*.jpg'])
        .pipe(gulp.dest('dist/img'));
}

// Clean Task
function cleanTask() {
    return gulp.src('dist', {read: false, allowEmpty: true})
        .pipe(clean());
}

function cleanImg() {
    return gulp.src('dist/img', {read: false, allowEmpty: true})
        .pipe(clean());
}


// BrowserSync Tasks
function browserSyncServe(cb) {
    browserSync.init({
        server: {
            baseDir: '.',
            index: 'src/index.html'
        }
    });
    cb();
}

function browserSyncReload(cb) {
    browserSync.reload();
    cb();
}

// Watch Task
function watchTask() {
    gulp.watch(['src/**/*.html'], browserSyncReload);
    gulp.watch(['src/scss/**/*.scss'], gulp.series(scssTask, browserSyncReload));
    gulp.watch(['src/img/**/*.png', 'src/img/**/*.jpg'], gulp.series(imgTask, browserSyncReload));
}

// Default Gulp task
exports.serve = gulp.series(
    cleanTask,
    scssTask,
    imgTask,
    browserSyncServe,
    watchTask
);

exports.build = gulp.series(
    cleanTask,
    scssTask,
    imgTask
);

exports.clean = cleanTask;

exports.imgRefresh = gulp.series(cleanImg, imgTask, browserSyncReload);
