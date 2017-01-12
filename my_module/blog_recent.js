var http = require('http');
var fs = require('fs');
/*http.createServer(function (req, res) {
 if (req.url == '/') {
 fs.readFile('./data/titles.json', function (err, data) {
 if (err) {
 console.log(err);
 res.end('Server Error');
 } else {
 var titles = JSON.parse(data.toString());
 fs.readFile('./pages/template.html', function (err, data) {
 if (err) {
 console.log(err);
 res.end('Server Error');
 } else {
 var templ = data.toString();
 var html = templ.replace('%', titles.join('</li><li>'));
 res.writeHead(200, {'Content-Type': 'text/html'});
 res.end(html);
 }
 });
 }
 });
 }
 }).listen(8000, "127.0.0.1");*/
var server = http.createServer(function (req, res) {
  getTitles(res);
}).listen(8000, "127.0.0.1");

function getTitles(res) {
  fs.readFile('./data/titles.json', function (err, data) {
    if (err) {
      hadError(err, res);
    } else {
      getTemplate(JSON.parse(data.toString()), res);
    }
  })
}
function getTemplate(titles, res) {
  fs.readFile('./pages/template.html', function (err, data) {
    if (err) {
      hadError(err, res);
    } else {
      formatHtml(titles, data.toString(), res);
    }
  })
}
function formatHtml(titles, templ, res) {
  var html = templ.replace("%", titles.join('</li><li>'));
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(html);
}
function hadError(err, res) {
  console.log(err);
  res.end('Server Error');
}