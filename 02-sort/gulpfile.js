// gulpプラグインの読み込み
// ------------------------------------------
var fs           = require('fs');
var gulp         = require('gulp');
var watch        = require('gulp-watch');        //追加ファイルも検知する
var ejs          = require('gulp-ejs');          //ejs
var sass         = require('gulp-sass');         //SASSコンパイル
var csscomb      = require('gulp-csscomb');      //CSS順番
var autoprefixer = require('gulp-autoprefixer'); //自動でprefixつける
var minify       = require('gulp-minify-css');   //CSS圧縮
var rename       = require('gulp-rename');       //リネーム
var plumber      = require('gulp-plumber');      //エラーが出ても動作を止めない
var notify       = require('gulp-notify');       //エラー時に通知
var browserSync  = require('browser-sync');      //ローカルホストとオートリロード
// var imagemin     = require('gulp-imagemin');     //画像圧縮
var changed      = require('gulp-changed');      //変更したファイルだけ処理させる
// var pngquant     = require('imagemin-pngquant'); //PNGの圧縮率を髙く
// var jpegtran     = require('imagemin-jpegtran'); //JPGの圧縮率を髙く
// var gifsicle     = require('imagemin-gifsicle'); //GIFの圧縮率を髙く
// var svgo         = require('imagemin-svgo');     //SVGの圧縮率を髙く
var concat       = require('gulp-concat');       //ファイルの結合
// var uglify       = require('gulp-uglify');       //特定のコメントを残したまま圧縮
var stylestats   = require('gulp-stylestats');   //StyleStats
var jshint       = require('gulp-jshint');       //jshint
var htmlhint     = require("gulp-htmlhint");     //htmlhint
var sourcemaps   = require('gulp-sourcemaps');   //インラインソースマップの作成

//var iconfont = require('gulp-iconfont'); // アイコンフォント作成
//var consolidate = require('gulp-consolidate'); // Lo-DashをGulpから使えるようにする

// 変数設定
// ------------------------------------------

// 対象ブラウザ
var AUTOPREFIXER_BROWSERS = [
  'last 3 versions',
  'ie >= 9',
    'iOS >= 8',
    'Android >= 4.2'
];
var src = {
    base: './dev/',
    scss: './dev/assets/scss/',
    js  : './dev/assets/js/',
    img : './dev/assets/images/',
};
var dist = {
    base: './htdocs/',
    css : './htdocs/assets/css/',
    js  : './htdocs/assets/js/',
    img : './htdocs/assets/images/',
};



// タスク
// ------------------------------------------



/**
 * ejsのコンパイル
 */
// gulp.task('ejs', function() {
//   gulp.src([ src.base + '**/*.ejs', '!' + src.base + '**/_*.ejs' ])
//   .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
//   .pipe(ejs({
//         site: JSON.parse(fs.readFileSync( src.base + 'inc/config.json'))
//       },
//       {
//         ext: '.html'
//       }
//   ))
//   .pipe(gulp.dest(dist.base));
// });



// Sassのコンパイルと圧縮
gulp.task('sass' , function(){
  gulp.src( src.scss + '*.scss' )
    .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
    // .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: AUTOPREFIXER_BROWSERS
    }))
    .pipe(csscomb())
    // .pipe(sourcemaps.write('./maps/')) // マップファイルを出力するパスを指定します
    .pipe(gulp.dest(dist.css))
    .pipe(minify({ compatibility: 'ie8' }))
    .pipe(rename({ extname : '.min.css' }))
    .pipe(gulp.dest(dist.css));
});


// StyleStats
gulp.task('stylestats', function () {
  gulp.src('./htdocs/css/*.min.css')
    .pipe(stylestats());
});

// jshint
gulp.task('jshint', function() {
  gulp.src([ dist.js + '*.js', '!' + dist.js + '*.min.js'])
    .pipe( jshint() )
    .pipe( jshint.reporter( 'jshint-stylish' ) );
});

// htmlLint
gulp.task('htmllint', function() {
    gulp.src(dist.base + '**/*.html')
        .pipe(htmlhint())
        .pipe(htmlhint.reporter())
});

// jsの結合・圧縮
// gulp.task( 'js', function () {
//   gulp.src([
//       src.js + 'lib/jquery-2.1.4.min.js',
//       src.js + 'lib/jquery.matchHeight-min.js',
//       src.js + 'lib/slick.min.js',
//       src.js + 'home.js',
//       src.js + 'common.js',
//       src.js + 'sub.js',
//       src.js + 'ua.js',
//       src.js + 'jobs.js',
//       src.js + 'modal.js',
//       src.js + 'form.js'
//     ])
//     .pipe( plumber({errorHandler: notify.onError('<%= error.message %>')}) )
//     .pipe( concat( 'script.js' ) )
//     .pipe(gulp.dest(dist.js))
//     // .pipe( uglify( {
//     //   preserveComments: 'some'
//     // } ) )
//     .pipe(rename({ extname : '.min.js' }))
//     .pipe(gulp.dest(dist.js));
// });


// imageminで画像を圧縮
gulp.task('imagemin', function () {
  gulp.src( [ src.img + '**/*.+(jpg|jpeg|png|gif|svg)' ] )
    .pipe(changed( dist.img ))
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(gulp.dest( dist.img ));
});


// gulp.task('iconfont', function(){
//   var fontName = 'icon';

//   return gulp.src(['dev/assets/icons/*.svg'])
//     .pipe(iconfont({
//       fontName: fontName,
//       prependUnicode: true,
//       formats: ['ttf', 'eot', 'woff']
//     }))
//     .on('glyphs', function(codepoints, options) {
//       var engine             = 'lodash';
//       var templatePath       = 'dev/assets/icons/template/';
//       var templateName       = '_icon';
//       var consolidateOptions = {
//         glyphs: codepoints,
//         fontName: fontName,
//         fontPath: '../fonts/',
//         className: 'icon'
//       };

//       //css
//       gulp.src(templatePath + templateName + '.scss')
//         .pipe(consolidate(engine, consolidateOptions))
//         .pipe(rename({ basename: '_iconfont' }))
//         .pipe(gulp.dest(src.scss + 'base/'));

//       //styleguide用のcss
//       gulp.src(templatePath + templateName + '_doc.scss')
//         .pipe(consolidate(engine, consolidateOptions))
//         .pipe(rename({ basename:'_icon' }))
//         .pipe(gulp.dest(src.scss + 'styleguide/'));
//     })

//     .pipe(gulp.dest('htdocs/assets/fonts/'));
// });



// サーバーの起動
gulp.task('server', function() {
  browserSync({
     server: {
       baseDir: dist.base
     }
  });
});


watch( src.img + '**/*.*' , function () {
        gulp.start( 'imagemin' );
    });


// gulpの実行とファイルの監視
gulp.task('default', ['server'], function() {
  gulp.watch([
    dist.base + '**/*.html',
    dist.base + '**/*.css',
    dist.base + '**/*.js',
    dist.base + '**/*.jpg',
    dist.base + '**/*.png',
    dist.base + '**/*.svg',
  ], browserSync.reload);

  watch( src.base + '**/*.ejs' , function () {
      gulp.start( 'ejs' );
  });
  watch( src.scss + '**/*.scss' , function () {
      gulp.start( 'sass' );
  });
  watch( src.js + '**/*.js' , function () {
      gulp.start( 'js' );
  });
  watch( src.img + '**/*.*' , function () {
    gulp.start( 'imagemin' );
  });
});
