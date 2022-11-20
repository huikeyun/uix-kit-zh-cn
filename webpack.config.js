'use strict';
const webpack = require('webpack');
const express = require('express');
const fs = require('fs');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const glob = require('glob');
const randomString = require('random-string');
const IncludeFileWebpackPlugin = require('include-file-webpack-plugin');
const moment = require('moment');
const json = JSON.parse(fs.readFileSync('./package.json'));
const webpackDevMiddleware = require('webpack-dev-middleware');
const WebpackConcatPlugin = require('webpack-concat-files-plugin');
const colors = {
    Reset: '\x1b[0m',
    Bright: '\x1b[1m',
    Dim: '\x1b[2m',
    Underscore: '\x1b[4m',
    Blink: '\x1b[5m',
    Reverse: '\x1b[7m',
    Hidden: '\x1b[8m',
    fg: {
        Black: '\x1b[30m',
        Red: '\x1b[31m',
        Green: '\x1b[32m',
        Yellow: '\x1b[33m',
        Blue: '\x1b[34m',
        Magenta: '\x1b[35m',
        Cyan: '\x1b[36m',
        White: '\x1b[37m',
        Crimson: '\x1b[38m' //القرمزي
    },
    bg: {
        Black: '\x1b[40m',
        Red: '\x1b[41m',
        Green: '\x1b[42m',
        Yellow: '\x1b[43m',
        Blue: '\x1b[44m',
        Magenta: '\x1b[45m',
        Cyan: '\x1b[46m',
        White: '\x1b[47m',
        Crimson: '\x1b[48m'
    }
};
let globs = {
    port: 8080,
    examples: 'examples',
    build: 'src',
    dist: 'dist',
    pathCore: './src/components',
    pathThirdPartyPlugins: './src/components/_third-party-plugins'
};
/*!
 *************************************
 * Site Info
 *************************************
 */
const charset = 'utf-8';
const lang = 'zh-cn';
const dirLTR = 'ltr';
const dirRTL = 'rtl';
const customWebsiteVersion = json.version,
    customWebsiteAuthor = (Object.prototype.toString.call(json.author) == '[object Object]') ? json.author.name : json.author,
    customWebsiteTitle = json.projectName,
    customWebsiteDesc = json.description,
    customWebsiteGenerator = 'Uix Kit',
    customWebsiteHash = randomString({ length: 20 }),
    customWebsiteComment = `
不要覆盖此文件。
使用“npm run build”生成

## 项目名称           :  ` + customWebsiteTitle + `
## 项目描述           :  ` + customWebsiteDesc + `
## 项目网址           :  ` + json.projectURL + `
## 版本              :  ` + customWebsiteVersion + `
## 汉化              :  慧科云 (` + json.homepage + `)
## 最后更新日期        :  ` + moment().format('MMMM D, YYYY') + `
## 基于 ` + json.createdInfo + (json.email != '' ? ' (' + json.email + ')' : '') + ` 汉化
## 在 ` + json.license + ` 许可下发布。
	`;
// 获取所有 HTML 模板文件
const tempPagesES6 = glob.sync(globs.pathCore + '/**/*.html');
const targetTempFilesName = [];
const targetAllTempFilesName = [];
const tempPagesArrays = [
    tempPagesES6
];
const tempAllPages = [].concat(...tempPagesArrays);
tempAllPages.map((event) => {
    const filename = event.split('/').pop();
    targetAllTempFilesName.push([event, event.split('/').pop()]);
    if (filename.indexOf('include-') < 0) {
        targetTempFilesName.push([event, event.split('/').pop()]);
    }
});
// Return to the HTML template file that will be watched
const targetFilesNameArrays = [
    targetAllTempFilesName
];
const targetAllWatchFilesName = [].concat(...targetFilesNameArrays);
// 页面模板的字符串替换
class ReplacePlaceholderForFile {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        compiler.hooks.done.tap('ReplacePlaceholderForFile', (stats) => {
            const filepath = this.options.filepath;
            // 当 Node 模块运行时，这个插件可能会被执行
            // 同时，会导致内容读取不完整。
            /*
            @Other method:

            try {
                let data = fs.readFileSync('file.html', 'utf8');
                console.log(data);
            } catch(e) {
                console.log('Error:', e.stack);
            }
            */
            fs.readFile(filepath, 'utf8', function(err, data) {
                if (err) {
                    console.log(colors.fg.Red, err, colors.Reset);
                } else {
                    if (data.length > 0 && data.indexOf('</html>') >= 0) {
                        data = data.replace(/\@\@\{website_title\}/g, customWebsiteTitle)
                            .replace(/\@\@\{website_desc\}/g, customWebsiteDesc)
                            .replace(/\@\@\{website_author\}/g, customWebsiteAuthor)
                            .replace(/\@\@\{website_generator\}/g, customWebsiteGenerator)
                            .replace(/\@\@\{website_version\}/g, customWebsiteVersion)
                            .replace(/\@\@\{website_comment\}/g, customWebsiteComment)
                            .replace(/\@\@\{website_hash\}/g, customWebsiteHash)
                            .replace(/\@\@\{website_charset\}/g, charset)
                            .replace(/\@\@\{website_lang\}/g, lang)
                            .replace(/\@\@\{website_dirLTR\}/g, dirLTR)
                            .replace(/\@\@\{website_dirRTL\}/g, dirRTL);
                        fs.writeFile(filepath, data, (err) => {
                            if (err) {
                                console.log(colors.fg.Red, err, colors.Reset);
                                return;
                            }
                            //文件写入成功
                            //console.log(colors.fg.Green, `${filepath} 写入成功！`, colors.Reset);
                        });
                    }
                }
            }); //end fs.readFile
        });
    }
}
/*!
 *************************************
 *  webpack 构建后运行命令
 *************************************
 */
class MyPluginCompiledFunction {
    // 将`apply`定义为其原型方法，编译器作为其参数提供
    apply(compiler) {
        // 指定要附加的事件钩子
        compiler.hooks.done.tap('MyPluginCompiledFunction', (compilation) => {
            const coreJSsFile = globs.pathCore + '/_app-load.js';
            if (fs.existsSync(coreJSsFile)) {
                fs.readFile(coreJSsFile, 'utf8', function(err, content) {
                    if (err) throw err;
                    //---
                    console.log(colors.fg.Yellow, `----------------------------------------------`, colors.Reset);
                    const targetJSFile = './' + globs.dist + '/js/uix-kit.js';
                    //
                    const tocBuildedFiles = [
                        './' + globs.dist + '/css/uix-kit.css',
                        './' + globs.dist + '/css/uix-kit-rtl.css',
                        targetJSFile
                    ];
                    const tocBuildedTotal = tocBuildedFiles.length;
                    let tocBuildedIndex = 1;
                    // 读取所有核心 css 和 js 文件并构建目录
                    //---------------------------------------------------------------------
                    // 建立目录 (TOC)
                    tocBuildedFiles.forEach((filepath) => {
                        if (fs.existsSync(filepath)) {
                            fs.readFile(filepath, 'utf8', function(err, content) {
                                if (err) throw err;
                                const curCon = content.toString(),
                                    newtext = curCon.match(/<\!\-\-.*?(?:>|\-\-\/>)/gi);
                                // 如果找到匹配组
                                if (newtext && newtext.length > 0) {
                                    let curToc = '';
                                    for (let p = 0; p < newtext.length; p++) {
                                        let curIndex = p + 1,
                                            newStr = newtext[p].replace('<!--', '').replace('-->', '').replace(/^\s+|\s+$/g, '');
                                        if (p > 0) {
                                            curToc += '    ' + curIndex + '.' + newStr + '\n';
                                        } else {
                                            curToc += curIndex + '.' + newStr + '\n';
                                        }
                                    }
                                    // 用nodejs替换文件中的字符串
                                    const resultData = curCon.replace(/\$\{\{TOC\}\}/gi, curToc);
                                    fs.writeFile(filepath, resultData, 'utf8', function(err) {
                                        if (err) {
                                            console.log(colors.fg.Red, err, colors.Reset);
                                            return;
                                        }
                                        // 文件写入成功
                                        console.log(colors.fg.Green, `${filepath} 文件生成成功！ (${tocBuildedIndex}/${tocBuildedTotal})`, colors.Reset);
                                        tocBuildedIndex++;
                                    });
                                }
                            });// fs.readFile( filepath ...
                        }//endif fs.existsSync( filepath )
                    });	//.map( ( filepath )...
                });
            }
        });
    }
}
/*!
 *************************************
 *  主要配置
 *************************************
 */
const devMode = process.env.NODE_ENV !== 'production';
const webpackConfig = {
    devtool: devMode ? 'source-map' : false,
    performance: {
        hints: !devMode ? 'warning' : false
    },
    mode: 'production',
    watch: true,
    resolve: {
        fallback: {
            fs: false
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.sass'],
        alias: {
            // 特定的映射。
            // 在 express 服务器运行时支持特定文件的目录和自定义别名，
            // 需要同时配置以下文件：
            // 1) `babel.config.js`    --> "plugins": [["module-resolver", {"alias": {...}} ]]
            //  2) `tsconfig.json`      --> "compilerOptions": { "paths": {...} }
            //  3) `package.json`       --> "jest": { "moduleNameMapper": {...} }
            '@uixkit/core': path.resolve(__dirname, globs.pathCore),
            '@uixkit/plugins': path.resolve(__dirname, globs.pathThirdPartyPlugins)
        }
    },
    //从包中排除响应
//    externals: {
//      'react': 'React',
//		'react-dom': 'ReactDOM',
//	    'jquery': 'jQuery',
//    },
    entry: {
        'uix-kit': './' + globs.build + '/index.js',
        'uix-kit.min': './' + globs.build + '/index.js',
        'uix-kit-rtl': './' + globs.build + '/index-rtl.js',
        'uix-kit-rtl.min': './' + globs.build + '/index-rtl.js'
    },
    output: {
        path: path.resolve(__dirname, './' + globs.dist + '/js'),
        filename: '[name].js'
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                test: /\.min\.js$/i
            }),
            new MiniCssExtractPlugin({
                // 选项类似于 webpackOptions.output 中的相同选项
                // 两个选项都是可选的
                filename: '../css/[name].css'
            }),
            new CssMinimizerPlugin({
                test: /\.min\.css$/i,
                parallel: true,
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: { removeAll: true }
                        }
                    ]
                }
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.(glsl|vs|fs|vert|frag)$/,
                exclude: path.resolve(__dirname, './node_modules'),
                use: [
                    'raw-loader',
                    'glslify-loader'
                ]
            },
            {
                test: /\.json$/,
                exclude: path.resolve(__dirname, './node_modules'),
                loader: 'json-loader'
            },
            {
                test: /\.(js|jsx|ts|tsx)$/,
                loader: 'babel-loader',
                exclude: path.resolve(__dirname, './node_modules'),
                options: {
                    'presets': [
                        '@babel/preset-env',
                        '@babel/preset-react',
                        '@babel/preset-typescript',
                        {
                            plugins: [
                                '@babel/plugin-proposal-class-properties'
                            ]
                        }
                    ]
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                include: path.resolve(__dirname, './' + globs.build),
                use: [
                    /**
                     * 笔记:
                     * 可以使用 `style-loader` 将 CSS 注入 DOM 以生成最终的 js 文件
                     */
                    {
                        loader: MiniCssExtractPlugin.loader, // 将CSS提取到单独的文件中（第3步）
                        options: {
                            // 你可以在这里指定一个publicPath
                            // 默认情况下它使用 webpackOptions.output 中的 publicPath
                            publicPath: `../../${globs.dist}/js/`
                        }
                    },
                    {
                        loader: 'css-loader',  // 解释 @import 和 url() 并解析它们。 （ 第2步 ）
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader', // 将 Sass 编译为 CSS（步骤 1）
                        options: {
                            sourceMap: true,
                            /* (nested | expanded | compact | compressed) */
                            outputStyle: 'expanded'
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: false,
                            removeComments: false,
                            collapseWhitespace: false
                        }
                    }
                ]
            },
            // 笔记：
            // 1) 兼容 node-sass(4+) 和 sass-loader(7+)
            // 2) node-sass (7+) 和 sass-loader (12+) 的版本
            // 匹配以提取没有 `file-loader` 的文件
            {
                test: /\.(png|jpe?g|gif|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader: 'file-loader',
                options: {
                    esModule: false, //通过输出改变css路径
                    outputPath: (url, resourcePath, context) => {
                        // 来自`./src/...`的文件将复制到`./dist/`
                        // 原始名称：path.basename(resourcePath)
                        // 字体
                        if (resourcePath.indexOf('webfonts/') >= 0 || resourcePath.indexOf('fonts/') >= 0) {
                            return '../fonts/' + url;
                        }
                        //imags
                        if (resourcePath.indexOf('images/') >= 0 || resourcePath.indexOf('img/') >= 0) {
                            return '../images/' + url;
                        }
                        return '../misc/' + url;
                    },
                    publicPath: (url, resourcePath, context) => { //the css path of output
                        // 如果文件在根目录，可以留空。 如果在另一个目录中，
                        // 你可以写：“/blog”。 （但没有尾部斜杠）
                        const websiteRootDir = '';
                        // 字体
                        if (resourcePath.indexOf('webfonts/') >= 0 || resourcePath.indexOf('fonts/') >= 0) {
                            return `${websiteRootDir}/${globs.dist}/fonts/${url}`;
                        }
                        // 图片
                        if (resourcePath.indexOf('images/') >= 0 || resourcePath.indexOf('img/') >= 0) {
                            return `${websiteRootDir}/${globs.dist}/images/${url}`;
                        }
                        return `${websiteRootDir}/${globs.dist}/misc/${url}`;
                    }
                }
            }


            /*
            {
                test: /\.scss$/,
                loader: 'prettier-loader',
                // 如果加载器列表中不是第一个加载器，则强制它首先运行强制执行：'pre'，
                // 避免在所有文件上运行 prettier！
                // 仅在您的源代码上使用它，而不是在依赖项上！
                options: {
                    'parser': 'postcss',
                    // additional prettier options assigned to options in
                    // - .prettierrc,
                    // - prettier.config.js,
                    // - "prettier" property in package.json
                    'printWidth': 120,
                    'tabWidth': 4,
                    'semi': true,
                    'singleQuote': true,
                    'trailingComma': 'none',
                    'bracketSpacing': true,
                    'jsxBracketSameLine': false,
                    'arrowParens': 'avoid',
                    'requirePragma': false,
                    'proseWrap': 'preserve'

                },
            },
            */
        ]
    },
    plugins: [
        new MyPluginCompiledFunction()
    ]
};
// 删除包含文件和额外的 CSS 文件
webpackConfig.plugins.push(
    new CleanWebpackPlugin([
        globs.build + '/**/*.css',
        globs.examples + '/*.html'
    ])
);
// 在每个生成的块的顶部添加一个横幅。
webpackConfig.plugins.push(
    new webpack.BannerPlugin(customWebsiteComment)
);
// 批处理 HTML 模板文件
targetTempFilesName.map((event) => {
    webpackConfig.plugins.push(
        new IncludeFileWebpackPlugin({
            directory: '',
            input: `${event[0]}`,
            output: `./${globs.examples}/${event[1]}`,
            processIncludeContents: function(html) {
                return html;
            }
        })
    );
});
// 页面模板的字符串替换
targetTempFilesName.map((event) => {
    webpackConfig.plugins.push(
        new ReplacePlaceholderForFile({
            filepath: `./${globs.examples}/${event[1]}`
        })
    );
});
// 添加 .min.css 文件源映射
webpackConfig.plugins.push(
    new webpack.SourceMapDevToolPlugin({
        filename: '../js/[file].map'
    })
);
// 从所有第三方通用脚本库创建 vendor.js
// webpackConfig.plugins.push(
// 	new WebpackConcatPlugin({
// 		bundles: [
// 			{
// 				dest: './' + globs.dist + '/js/vendor.js',
// 				src: [
// 					'./vendor/files/axios.min.js',
// 					'./vendor/files/jquery.waitforimages.min.js',
// 					'./vendor/files/video.min.js',
// 					'./vendor/files/template7.min.js',
// 					'./vendor/files/TweenMax.min.js',
// 					'./vendor/files/pixi.min.js',
// 					'./vendor/files/three.min.js',
// 					'./vendor/files/anime.min.js',
// 					'./vendor/files/hammer.min.js',
// 					'./vendor/files/muuri.min.js',
// 				],
// 			},
// 		],
// 	})
// );
/*!
 *************************************
 * Hook our plugins to fix webpack dev server is
 * not serving the latest compiled code
 *************************************
 */
const compiler = webpack(webpackConfig);
const app = express();
const instance = webpackDevMiddleware(compiler);
app.use(instance);
app.use(express.static('./'));
//Watch for Files Changes in Node.js
require('log-timestamp');
targetAllWatchFilesName.map((event) => {
    let curFile = `${event[0]}`;
    fs.watchFile(curFile, (curr, prev) => {
        console.log(colors.fg.Yellow, `${curFile} 文件已更改`, colors.Reset);
        // After a short delay the configuration is changed and a banner plugin is added
        // to the config
        new CleanWebpackPlugin([
            globs.build + '/**/*.css'
        ]).apply(compiler);
        targetTempFilesName.map((event) => {
            new IncludeFileWebpackPlugin({
                directory: '',
                input: `${event[0]}`,
                output: `./${globs.examples}/${event[1]}`,
                processIncludeContents: function(html) {
                    return html;
                }
            }).apply(compiler);
            new ReplacePlaceholderForFile({
                filepath: `./${globs.examples}/${event[1]}`
            }).apply(compiler);
        });
        // Recompile the bundle with plugins:
        instance.invalidate();
    });
});
/*!
 *************************************
 *  Listen the server
 *************************************
 */
app.listen(globs.port, () => console.log(`前端服务监听端口: ${globs.port}, 在 Web 浏览器中访问 http://localhost:${globs.port}`));
/*
const WebpackDevServer = require('webpack-dev-server');
const server = new WebpackDevServer( compiler, {
					contentBase: [
						path.resolve(__dirname, './' )
					],
	                hot: true,
					watchContentBase: true,
				});

server.listen( globs.port, "localhost", function (err, result) {
	if (err) {
	    return console.log(colors.fg.Red, err, colors.Reset);
	}
	console.log(colors.fg.Yellow, 'Listening at http://localhost:' + globs.port, colors.Reset);
});
*/
/*!
 *************************************
 *  Exporting webpack module
 *************************************
 */
module.exports = webpackConfig;


