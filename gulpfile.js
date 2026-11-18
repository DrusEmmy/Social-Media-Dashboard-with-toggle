// initialize modules
const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass")); // gulp-sass 5+: pass the compiler in
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano"); // PostCSS plugin, not gulp-cssnano
const babel = require("gulp-babel");
const terser = require("gulp-terser"); // gulp plugin, not raw terser
const browsersync = require("browser-sync").create();

function scssTask() {
  return src("app/scss/styles.scss", { sourcemaps: true })
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest("dist", { sourcemaps: "." }));
}

function jsTask() {
  return src("app/js/script.js", { sourcemaps: true })
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(terser())
    .pipe(dest("dist", { sourcemaps: "." }));
}

function browserSyncServer(cb) {
  browsersync.init({
    server: { baseDir: "." },
    notify: { styles: { top: "auto", bottom: "0" } },
  });
  cb();
}

function browserSyncReload(cb) {
  browsersync.reload();
  cb();
}

function watchTask() {
  watch("*.html", browserSyncReload);
  watch(
    ["app/scss/**/*.scss", "app/js/**/*.js"], // fixed: JS lives in app/js
    series(scssTask, jsTask, browserSyncReload),
  );
}

exports.default = series(scssTask, jsTask, browserSyncServer, watchTask);
