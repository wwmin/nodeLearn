var connect = require('connect');

function logger(req, res, next) {
  console.log('%s %s', req.method, req.url);
  next();
}
function hello(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('hello world.');
}
function restrict(req, res, next) {
  console.log(`注册过滤:${req.method} ${req.url}`);
  next();
}
function admin(req, res, next) {
  console.log(`admin:${req.method} ${req.url}`);
  next();
}
connect()
  .use(logger)
  .use('./admin',restrict)
  .use('./admin',admin)
  .use(hello)
  .listen(3000);