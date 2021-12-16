
const gulp = require('gulp')

// 0-1. 导入 gulp-cssmin 第三方
const cssmin = require('gulp-cssmin')
// 0-1-2. 导入 gulp-autoprefixer 第三方
const autoprefixer = require('gulp-autoprefixer')

// 0-3. 导入 gulp-uglify 第三方
const uglify = require('gulp-uglify')
// 0-3-2. 导入 gulp-babel 第三方
const babel = require('gulp-babel')

// 0-4. 导入 gulp-htmlmin
const htmlmin = require('gulp-htmlmin')
// 0-4-2. 导入 gulp-file-include 第三方
// const fileinclude = require('gulp-file-include')

// 0-5. 导入 del 第三方
const del = require('del')

/*
  1. 打包一个 css 文件
    1-1. 创建一个 打包 css 的任务
      + 需要用到 gulp.task()
    1-2. 执行一下打包 css 的任务
      + 前提: 你的任务书写完毕
      + 打开命令行, 目录切换到项目根目录(gulpfile.js 文件所在的目录)
      + 输入指令 : $ gulp 你要执行的任务名称
      + 就会按照 gulpfile.js 文件中书写的对应任务去执行
    1-3. 如何压缩 css 文件
      + 需要借助一个叫做 gulp-cssmin 的第三方
      + 下载导入后使用
        => 下载: $ npm i -D gulp-cssmin
        => 导入: const cssmin = require('gulp-cssmin')
        => 使用: 导入以后就是一个函数, 直接在指定任务流位置调用即可压缩 css 文件
    1-4. 自动添加 css 前缀
      + 有一个第三方包是准们用来自动添加前缀的
      + 叫做 gulp-autoprefixer
      + 只需要下载后倒入使用, 就可以了
      + 导入以后得到一个函数, 直接调用传递一个参数就可以了
        => autoprefixer({ browsers: [ '你要兼容到那一些浏览器' ] })
        Replace Autoprefixer browsers option to Browserslist config.
        Use browserslist key in package.json or .browserslistrc file.
        替换 autoprefixer 的 browsers 配置项到 浏览器列表 配置文件里面
        可以在 package.json 内使用 browserslist 字段设置或者使用 .browserslistrc 文件
*/

/*
  2. 打包 sass 文件的任务
    2-1. 创建任务
      => 使用定义函数的方式
      => 记得导出
    2-2. 转码 sass 文件
      => 需要用到两个包
        -> 一个叫做 gulp-sass
        -> 一个叫做 sass
      => 导入方式不太一样
        -> const sass = require('gulp-sass')(require('sass'))
      => 导入以后, sass 是一个函数, 直接使用就可以了
    2-3. sass 转码以后
      => 剩下的操作就和 css 一模一样了
*/

/*
  3. 打包 js 文件的任务
    3-1. 创建任务
    3-2. 压缩 js 的第三方
      + 叫做 gulp-uglify
      + 下载导入使用
      + 导入以后就是一个函数, 直接调用就行
    3-3. 转码, 把 es6 语法转换成 es5
      + 需要用到一个叫做 gulp-babel 的第三方包
      + 但是这个 gul-babel 依赖另外两个第三方, 但是他自己不会下载
      + 所以, 我们需要下载三个第三方, 但是只需要导入一个 gulp-babel 就可以了
      + 一共需要下载三个第三方
        => gulp-babel
        => @babel/core
        => @babel/preset-env
      + 使用的时候需要传递参数
        => babel({ presets: [ '@babel/preset-env' ] })
*/

/*
  4. 打包 html 文件的任务
    4-1. 创建任务
    4-2. 压缩 html 文件需要用到的第三方
      + 叫做 gulp-htmlmin
      + 下载导入后使用
      + 使用默认不会对 html 文件进行任何操作
      + 需要传递参数使用
    4-3. html 组件
      + 借助一个叫做 gulp-file-include 的第三方插件
      + 下载导入后使用
      + 使用需要传递参数
*/

/*
  5. 打包 图片 任务
    5-1. 创建任务
    5-2. 压缩 图片 文件需要用到一个第三方
      + 叫做 gulp-imagemin
      + 这个包很难下载成功的
      + 下载下来导入使用就可以了
      + 下载: $ npm i -D gulp-imagemin
      + 导入: const imagemin = require('gulp-imagemin')
      + 导入以后就是一个函数, 直接调用就可以了
*/

// 1. 创建打包任务
// 换一种新的语法创建任务
// 直接定义函数就可以了, 函数名就是任务名称
// 在 gulp@4 的版本下, 定义一个函数就是创建了一个任务
// 注意: 你直接定义的函数, gulp 工具是不认识的, 需要在该文件内把这个函数导出
//      才能在命令行执行这个任务
function cssHandler() {
    return gulp
        .src('./src/css/*.css')  // 找到需要打包的源文件03-2
        .pipe(autoprefixer())  // 自动添加前缀
        .pipe(cssmin())  // 进行压缩操作
        .pipe(gulp.dest('./dist/css/'))  // 把压缩完毕的内容存放在一个新的位置
}


// 3. 创建一个打包 js 文件的任务
function jsHandler() {
    return gulp
        .src('./src/js/*.js')
        .pipe(babel({ presets: [ '@babel/preset-env' ] })) // 进行 ES6 转换 ES5
        .pipe(uglify()) // 进行压缩操作
        .pipe(gulp.dest('./dist/js/'))
}

// 4. 创建一个打包 html 文件的任务
function htmlHandler() {
    return gulp
        .src('./src/*.html')
        // .pipe(fileinclude({ // 进行组件的拼接
        //     // 你的所有组件文件的存储路径
        //     basepath: './src/components/',
        //     // 你自己定义的特殊标识符
        //     prefix: '@-@'
        // }))
        .pipe(htmlmin({ // 进行压缩
            // 删除所有空白内容(空格和回车)
            collapseWhitespace: true,
            // 删除属性值的双引号
            removeAttributeQuotes: true,
            // 删除所有空属性
            removeEmptyAttributes: true,
            // 删除所有注释
            removeComments: true,
            // 移出 script 标签的默认 type 属性
            removeScriptTypeAttributes: true,
            // 移除 link 和 style 标签的默认 type 属性
            removeStyleLinkTypeAttributes: true,
            // 移除布尔类型属性的值
            collapseBooleanAttributes: true,
            // 压缩内嵌式 JS 代码
            minifyJS: true,
            // 压缩内嵌式 CSS 代码
            minifyCSS: true
        }))
        .pipe(gulp.dest('./dist/'))
}

// 5. 创建一个打包 图片 文件的任务
function imgHandler() {
    return gulp
        .src('./src/img/**.*')
        // .pipe(imagemin())
        .pipe(gulp.dest('./dist/img/'))
}


function vendorHandler() {
    return gulp
        .src('./src/vendor/**.*')
        .pipe(gulp.dest('./dist/vendor'))
}

// 8. 配置一个删除任务
/*
  实现删除操作, 需要一个第三方包叫做 del
    + 直接下载导入就可以了
    + 使用语法: 不需要依赖 gulp
    + 直接书写 del([ 你要删除的文件夹路径 ])

  把这个任务也加载到 综合任务 中
*/
function delHandler() {
    return del([ './dist/' ])
}

// 7. 创建一个综合任务
// 能一次性把所有任务完成
// 我只要调用综合任务就可以了
// 我们需要使用 执行多个任务的方法 series() 或者 parallel()
// 因为这两个方法的返回值就是一个函数
// 直接接受这两个方法的返回值就可以了
// 注意: 导出默认任务的时候 最好 叫做 default
// 因为当你在命令行书写 gulp default 的时候, 可以直接简写成 gulp
// const _default = gulp.parallel(cssHandler, sassHandler, jsHandler, htmlHandler, imgHandler, videoHandler, audioHandler, dataHandler, fontHandler, vendorHandler)

// 加入删除任务以后, 就需要逐个完成打包任务了
const _default = gulp.series(
    delHandler,
    gulp.parallel(cssHandler, jsHandler, htmlHandler, imgHandler, vendorHandler)
)

// 导出你所书写的所有任务
// 只有导出以后的任务才能在命令行通过 gulp 任务名称 的方式来执行
module.exports = {
    cssHandler,
    jsHandler,
    htmlHandler,
    imgHandler,
    vendorHandler,
    delHandler,
    default: _default
}
