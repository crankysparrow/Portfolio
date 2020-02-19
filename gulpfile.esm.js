import gulp from 'gulp';
import sass from 'gulp-sass';
import del from 'del';
import nodemon from 'gulp-nodemon';
import browserSync from 'browser-sync';
import imagemin from 'gulp-imagemin';
import webpack from 'webpack-stream';
import cache from 'gulp-cache';

const server = browserSync.create();

function styles() {
  return gulp
    .src('./src/sass/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
    .pipe(server.stream());
}

const scripts = () => {
  return gulp
    .src('./src/js/bundle.js')
    .pipe(webpack({
      mode: 'development',
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('./dist/js'))
}

const clean = () => {
  return del(['dist']);
}

const images = (cb) => {
  gulp.src('./images/*')
    .pipe(cache(imagemin({optimizationLevel: 3})))
    .pipe(gulp.dest('./dist/images'));
  cb();
}

const browser = () => {
  server.init({
    proxy: 'http://localhost:5000'
  });
}

const reload = (done) => {
  server.reload();
  done();
}

const app = (done) => {
  var called = false;

  return nodemon({
    script: 'server.js',
    watch: ['server.js'],
    ext: 'js json',
  })
    .on('start', function() {
      if  (!called) {
        done();
        browser();        
      }
      called = true;
    })
    .on('restart', () => {
      console.log('restarted!');
    })
    .on('crash', () => {
      console.error('Application has crashed!\n');
      stream.emit('restart', 10)
    });

}

function watch(done) {
  gulp.watch('./src/sass/**/*.scss', styles);
  gulp.watch('./views/**/*.pug', reload);
  gulp.watch('./src/js/**/*.js', gulp.series(scripts, reload));
  gulp.watch('./images/**', gulp.series(images, reload));
  done();
}

const dev = gulp.series(clean, gulp.parallel(images, scripts, styles), watch, app);

export default dev;
