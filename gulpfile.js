"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var tinypng = require("gulp-tinypng-compress");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var svgo = require('gulp-svgo');
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var htmlmin = require("gulp-htmlmin");
var uglify = require("gulp-uglify");
var run = require("run-sequence");
var del = require("del");
var server = require("browser-sync").create();

gulp.task("style", function() {
  gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("imagemin", function() {
  gulp.src("source/img/**/*.{png,jpg,jpeg}")
  .pipe(tinypng({
    key: "dflhMPDiQYvQrvS4PjZRuNOedeFkpUG1",
    sigFile: "",
    log: true
  }))
  .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function() {
  return gulp.src("source/img/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"));
});

gulp.task("sprite", function() {
  return gulp.src("source/img/sprite-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img/sprite"));
});

gulp.task("svgmin", function() {
  return gulp.src("source/img/*.svg")
    .pipe(svgo())
    .pipe(gulp.dest("build/img/"));
});

gulp.task("html", function() {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin({
      removeRedundantAttributes: true,
      removeComments: true,
      collapseWhitespace: true
    }))
    .pipe(gulp.dest("build"));
});

gulp.task("uglify", function() {
  return gulp.src("source/js/*.js")
  .pipe(uglify())
  .pipe(gulp.dest("build/js"));
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("copy", function() {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**/*.{png,jpg,svg}",
    "source/js/**/*.js",
    "source/favicon.ico"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
});

gulp.task("build", function(done) {
  run(
    "clean",
    "copy",
    "style",
    "svgmin",
    "sprite",
    "imagemin",
    "webp",
    "html",
    "uglify",
    done
  );
});

gulp.task("serve", function() {
  server.init({
    server: "build/"
});

  gulp.watch("source/sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("source/*.html", ["html"]).on("change", server.reload);
});
