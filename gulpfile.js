const { src, dest, watch, parallel} =  require('gulp');
const sass = require('gulp-sass');
const util = require('gulp-util');
const postcss = require("gulp-postcss");
const scss = require("postcss-scss");
const minifyCSS = require('gulp-csso');
const autoprefixer = require("autoprefixer");
const concat = require('gulp-concat');
const livereload = require('gulp-livereload');

const mainSassFile = 'scss/main.scss';
const sassFiles = 'scss/**/*.scss';
const htmlFiles = ['*.html'];
const jsFiles = ['js/**/*.js'];

var postcssProcessors = [
  autoprefixer({
    browsers: [
      "Explorer >= 11",
      "last 2 Explorer versions",
      "last 2 ExplorerMobile versions",
      "last 2 Edge versions",

      "last 2 Firefox versions",
      "last 2 FirefoxAndroid versions",

      "last 2 Chrome versions",
      "last 2 ChromeAndroid versions",

      "last 3 Safari versions",
      "last 3 iOS versions",

      "last 2 Opera versions",
      "last 2 OperaMini versions",
      "last 2 OperaMobile versions",

      "last 2 Android versions",
      "last 2 BlackBerry versions"
    ]
  })
];

function css(){
  return src(mainSassFile)
    .pipe(postcss(postcssProcessors, {syntax: scss}))
    .pipe(sass({ outputStyle: 'compressed'}).on('error', util.log))
    .pipe(minifyCSS())
    .pipe(dest('build/css'))
    .pipe(livereload({ start: true }));
};

function html() {
  return src('*.html').pipe(livereload({ start: true }));
};

function javascript() {
  return src(jsFiles, { sourcemaps: true })
    .pipe(concat('build.min.js'))
    .pipe(dest('build/js', { sourcemaps: true }))
    .pipe(livereload({ start: true }));
};

function watchFiles() {
  livereload.listen();
  
  watch(sassFiles, css);
  watch(jsFiles, javascript);
  watch(htmlFiles, html);
}


exports.javascript = javascript;
exports.css = css;
exports.html = html;
exports.watchFiles = watchFiles;
exports.default = parallel(html, css, javascript, watchFiles);