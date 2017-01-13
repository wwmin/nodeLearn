var http = require('http');
var server = http.createServer(function (req, res) {
  var body = "Hello World!";
  res.setHeader('Content-length', body.length);
  res.setHeader('Content-Type','text/plain');
  res.write(body);
  res.end();
  //or
  // res.end(body);
});
server.listen(3000);