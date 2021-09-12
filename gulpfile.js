
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const imagewebp = require('gulp-webp');

//move fonts
function moveFonts() {
  return src('src/fonts/**')
    .pipe(dest('dist/fonts'))
};

//compile, prefix, and min scss
function compileScss() {
  return src('src/scss/*.scss')
    .pipe(sass())
    .pipe(prefix('last 2 versions'))
    .pipe(minify())
    .pipe(dest('dist/css'))
};

//optimize and move images
function optimizeImg() {
  return src('src/images/*.{jpg,png,svg}')
    .pipe(imagemin([
      imagemin.mozjpeg({ quality: 80, progressive: true }),
      imagemin.optipng({ optimizationLevel: 2 }),
    ]))
    .pipe(dest('dist/images'))
};

//optimize and move images
function webpImage() {
  return src('dist/images/*.{jpg,png}')
    .pipe(imagewebp())
    .pipe(dest('dist/images'))
};


// minify js
function jsMin() {
  return src('src/js/*.js')
    .pipe(terser())
    .pipe(dest('dist/js'));
}

//watchtask
function watchTask() {
  watch('src/fonts', moveFonts);
  watch('src/scss/**/*.scss', compileScss);
  watch('src/js/*.js', jsMin);
  watch('src/images/*', optimizeImg);
  watch('dist/images/*.{jpg,png}', webpImage);
}


// Default Gulp task 
exports.default = series(
  moveFonts,
  compileScss,
  jsMin,
  optimizeImg,
  webpImage,
  watchTask
);