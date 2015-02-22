var gulp = require('gulp'),
    jade = require('gulp-jade'),
    plumber = require('gulp-plumber'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect');

var paths = {
        sass:['./assets/sass/*.scss'],
        jade:['./assets/template/*.jade','!./assets/template/_*.jade']
    };
gulp.task('jade',function(){
    return gulp.src(paths.jade)
        .pipe(plumber())
        .pipe(jade({
            pretty:true
            }))
            .on('error', console.log)
        .pipe(connect.reload())
        .pipe(gulp.dest('./public'));
    });

gulp.task('compass',function(){
    return gulp.src(paths.sass)
    .pipe(plumber())
    .pipe(compass({
        css: 'assets/css',
        sass: 'assets/sass',
        images: 'assets/img',
        sourcemap: true,
        }))
    .on('error', function(error) {
      // Would like to catch the error here 
      console.log(error);
      this.emit('end');
    })
    .pipe(connect.reload())
    .pipe(gulp.dest('./public/css'));
    });

gulp.task('connect', function(){
        connect.server({
            root: './public',
            livereload:true
            });
    });

gulp.task('watch',function(){
    gulp.watch(paths.sass,['compass']);

    gulp.watch('assets/template/*.jade',['jade']);
});


gulp.task('default',['connect','watch']);
