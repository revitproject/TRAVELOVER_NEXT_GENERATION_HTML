const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const rename = require("gulp-rename");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const terser = require("gulp-terser");
const uglify = require("gulp-uglify");
const minifyCSS = require("gulp-clean-css");
const browsersync = require("browser-sync").create();
const lineec = require("gulp-line-ending-corrector");
const ejs = require("gulp-ejs");
const autoprefixer = require("autoprefixer");
const spritesmith = require("gulp.spritesmith");
const buffer = require("vinyl-buffer");
const imagemin = require("gulp-imagemin");
const merge = require("merge-stream");
const concat = require("gulp-concat");
const babel = require("gulp-babel");

const fs = require("fs");
const path = require("path");

function ejsTask() {
  return src("./src/html/**/*.html")
    .pipe(ejs())
    .pipe(rename({ extname: ".html" }))
    .pipe(dest("./dist"));
}
function scssTask() {
  return src("src/scss/*.scss", { sourcemaps: true })
    .pipe(sass())
    .pipe(lineec())
    .pipe(postcss([autoprefixer()])) // cssnano() - 머지
    .pipe(dest("dist/resources/css"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(minifyCSS())
    .pipe(dest("dist/resources/css"));
}

function jsTask() {
  return src("src/js/*.js", { sourcemaps: false })
    .pipe(babel())
    .pipe(concat("common_pub.js"))
    .pipe(dest("dist/resources/js", { sourcemaps: false }))
    .pipe(terser())
    .pipe(concat("common_pub.min.js"))
    .pipe(lineec())
    .pipe(dest("dist/resources/js"));
}

function jquery() {
  return src("src/js/library/jquery-ui.js", { sourcemaps: false })
    .pipe(babel())
    .pipe(concat("jquery-ui.js"))
    .pipe(dest("dist/resources/js/library"));
}

function jqueryTask() {
  return src("src/js/library/*.js", {
    ignore: "src/js/library/jquery-ui.js",
    sourcemaps: false,
  })
    .pipe(babel())
    .pipe(concat("jquerylibrary.js"))
    .pipe(dest("dist/resources/js/library", { sourcemaps: true }))
    .pipe(terser())
    .pipe(concat("jquerylibrary.min.js"))
    .pipe(lineec())
    .pipe(dest("dist/resources/js/library"));
}

function libraryConcatCss() {
  return src("src/js/library/css/*.css", { sourcemaps: false })
    .pipe(concat("jquery-ui.css", { newLine: ";" }))
    .pipe(dest("dist/resources/js/library/css"))
    .pipe(concat("jquery-ui.min.css"))
    .pipe(minifyCSS())
    .pipe(lineec())
    .pipe(dest("dist/resources/js/library/css"));
}

// function.getFolders
var getFolders = function (dir) {
  return fs.readdirSync(dir).filter(function (file) {
    return fs.statSync(path.join(dir, file)).isDirectory();
  });
};

function imageSprite() {
  var folders = getFolders("src/images/sprite/");
  let ret;
  folders.map(function (folder) {
    var spriteData = src("src/images/sprite/" + folder + "/*.png", {
      encoding: false,
    }).pipe(
      spritesmith({
        imgPath: "/resources/images/common/sp_" + folder + ".png",
        imgName: "sp_" + folder + ".png",
        cssName: "_sp_" + folder + ".scss",
        cssFormat: "scss",
        cssTemplate: "src/scss/lib/spritesmith/sprite.support_1x.mustache",
        cssVarMap: function (sprite) {
          sprite.name = sprite.name;
          sprite.origin = "sp_" + folder;
        },
        cssSpritesheetName: "sp_" + folder,
      })
    );

    var imgStream = spriteData.img
      // .pipe(buffer())
      // .pipe(imagemin())
      .pipe(dest("dist/resources/images/common/", { encoding: false }));
    var cssStream = spriteData.css.pipe(dest("src/scss/lib/spritesmith/"));
    ret = merge(imgStream, cssStream);
  });

  return ret;
}

function browsersyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: "./dist",
    },
  });
  cb();
}

function browsersyncReload(cb) {
  browsersync.reload();
  cb();
}
exports.default = series(
  imageSprite,
  ejsTask,
  scssTask,
  jsTask,
  jquery,
  jqueryTask,
  browsersyncServe,
  watchTask,
  libraryConcatCss
);

exports.bs = series(
  imageSprite,
  ejsTask,
  scssTask,
  jsTask,
  jquery,
  jqueryTask,
  browsersyncServe,
  watchTask,
  libraryConcatCss
);
function watchTask() {
  //watch("*.html", browsersyncReload);
  watch(
    [
      "src/html/**/*.html",
      "src/html/**/*.ejs",
      "src/scss/**/*.scss",
      "src/js/**/*.js",
      "src/js/library/**/*.js",
      "src/js/library/css/**/*.js",
    ],
    series(
      ejsTask,
      scssTask,
      jsTask,
      jqueryTask,
      libraryConcatCss,
      browsersyncReload
    )
  );
  watch(["src/images/**/*"], series(imageSprite));
}
