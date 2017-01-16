var connect = require('connect');
function badMiddleware(req, res, next) {
  next(new Error('Bad middleware makes error'));
}
function errorHandler() {
  //connect通常用环境变量NODE_ENV在不用的服务器环境之间切换
  var env = process.env.NODE_ENV || 'development';
  //错误处理中间件定义四个参数
  return function (err, req, res, next) {
    res.statusCode = 500;
    switch (env) {
      case "development":
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(err));
        break;
      default:
        res.end('Server error');
    }
  }
}
connect()
  .use(badMiddleware)
  .use(errorHandler)
  .listen(3000);
