/*var http = require('http');
 http.createServer(function (req, res) {
 res.writeHead(200, {'Content-Type': 'text/plain'});
 res.end('Hello world\n');
 }).listen(3000);
 console.log('Server running at http://localhost:3000');*/
var currency = require('./my_module/currency.js');
console.log(currency.candianToUS(50));
console.log(currency.USToCanadian(30));

var text = null;
var fs = require('fs');
var stream = fs.createReadStream('tsconfig.json');
stream.on('data', function (chunk) {
  console.log(chunk);
  text = chunk;
});
stream.on('end', function () {
  console.log('finished');
});

/*
 var http = require('http');
 var server = http.createServer();
 server.on('request', function (req, res) {
 res.writeHead(200, {'Content-Type': 'text/plain'});
 res.end(text);
 });
 server.listen(3000);
;*/

var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'image/png'});
  fs.createReadStream('./logo.png').pipe(res);
}).listen(3000);
console.log('Server running at http://localhost:3000')