var connect = require('connect');
var cookieParser=require('cookie-parser');
var app = connect()
  .use(cookieParser('wwmin'))
  .use(function (req, res) {
    console.log(req.cookies);
    console.log(req.signedCookies);
    res.end('hello\n');
  }).listen(3000);
