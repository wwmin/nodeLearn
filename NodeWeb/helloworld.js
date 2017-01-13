var http = require('http');
var server = http.createServer(function (req, res) {
  var url = 'https://www.baidu.com';
  var body = '<p>Redirecting to <a href="' + url + '">'
    + url + '</a></p>';
  res.setHeader('Location', url);
  res.setHeader('Content-length', body.length);
  res.setHeader('Content-Type', 'text/html');
  res.statusCode = 302;
  res.end(body);
});
server.listen(3000);