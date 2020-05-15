const { exec, execSync } = require('child_process')
const del = require('del')
const Fiber = require('fibers')

const { src, dest, parallel, series, watch } = require('gulp')
const postcss = require('gulp-postcss')
const sass = require('@kuzivany/gulp-sass')
const log = require('gulplog')

const { join } = require('path')

const GLOB = {}

GLOB.ROOT = ['src/*.{html,json}'/*, 'src/images/favicon.ico'*/]
function root () {
    return src(GLOB.ROOT)
        .pipe(dest('dist'))
}

sass.compiler = require('sass')

GLOB.SCSS = 'src/styles/**/*.scss'
function scss () {
    return src(GLOB.SCSS)
        .pipe(sass.sync({ fiber: Fiber }).on('error', sass.logError))
		.pipe(postcss())
        .pipe(dest('dist/css'))
}

function watchFiles ( done ) {
    watch(GLOB.ROOT, { ignoreInitial: false }, root)
    watch(GLOB.SCSS, { ignoreInitial: false }, scss)

    return done
}

function clear () {
    return del('dist/**/*')
}

exports.default = parallel(scss, root)
exports.clear = clear
exports.watch = watchFiles
