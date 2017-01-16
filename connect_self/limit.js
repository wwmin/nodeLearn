var connect = require('connect');
var bodyParser = require('body-parser');
var app = connect()
  .use(bodyParser())
  .use(hello);
app.listen(3000);

function hello(req, res) {
  console.log("hello world.");
  res.end("Hello World.");
}
