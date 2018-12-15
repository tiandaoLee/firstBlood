var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var utils = require('./build/utils');
var webpackConfig = require('./webpack.config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
var webpack = require('webpack');
// 热更新配置，不加实现不了浏览器自动刷新
webpackConfig.entry = webpackConfig.entry.concat('webpack-hot-middleware/client?reload=true');
// 编译器对象
const compiler = webpack(webpackConfig);
// express对象
var app = express();
// 热更新
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  },
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
}));
// 热加载
app.use(webpackHotMiddleware(compiler));

// view engine setup
app.set('views', path.join(__dirname, './dist'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 配置静态资源路径
app.use(express.static('./dist'));
// 配置主入口
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
console.log(`<http://${utils.getIPAdress()}:8081> with Chrome`);
module.exports = app;
