import { src, dest, watch, parallel, series } from 'gulp';
import scss from 'gulp-sass';
import dartSass from 'sass';
import concat from 'gulp-concat';
import browserSync from 'browser-sync';
import clean from 'gulp-clean';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import webpackConfig from './webpack.config.js';


const sass = scss(dartSass);
const sync = browserSync.create();

// Функция для обработки скриптов
export function webpackScripts() {
    return src('app/js/main.js') // Исходный файл
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(dest('app/js')) // Куда записывать результат
        .pipe(sync.stream()); // Автообновление браузера
}

// Функция для обработки стилей
export function styles() {
    return src('app/scss/**/*.scss')  // Следим за всеми SCSS файлами
    .pipe(concat('style.min.css'))
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(dest('app/css'))
    .pipe(sync.stream()); // Обновляем браузер
}

// Функция для копирования изображений
export function images() {
    return src('app/images/**/*', { encoding: false })
        .pipe(dest('dist/images'));
}

// Функция для копирования шрифтов
export function fonts() {
    return src('app/fonts/**/*', { encoding: false }) // Копируем все шрифты без изменений
        .pipe(dest('dist/fonts'));
}

// Функция для копирования всех файлов и папок в dist
export function copy() {
    return src([
        'app/css/style.min.css',
        'app/js/main.min.js',
        'app/*.html'
    ], { base: 'app' })
        .pipe(dest('dist'));
}

// Функция для очистки папки dist
export function cleanDist() {
    return src('dist', { allowEmpty: true }) // Очищаем папку dist
        .pipe(clean());
}

// Функция для наблюдения за изменениями
export function watching() {
    watch('app/scss/**/*.scss', styles);
    watch(['app/js/**/*.js'], webpackScripts); // Следим за изменениями всех JS файлов
    watch(['app/*.html']).on('change', sync.reload);
}

// Функция для запуска локального сервера
export function browsersync() {
    sync.init({
        server: {
            baseDir: "app/"
        }
    });
}

// Основная задача сборки
export const build = series(cleanDist, parallel(styles, webpackScripts, images, fonts, copy));
export default parallel(styles, webpackScripts, browsersync, watching);