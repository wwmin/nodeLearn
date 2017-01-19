var express = require('express');
var mongoskin = require('mongoskin');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser());
var db = mongoskin.db('mongodb://@localhost:27017/test-test', {safe: true});
app.param('collectionName', function (req, res, next, collectionName) {
  req.collection = db.collection(collectionName);
  return next();
});

app.get('/', function (req, res) {
  res.send('欢迎nihao')
});
//----------------
app.post('/collections/:collectionName', function (req, res, next) {
  req.collection.insert(req.body, {}, function (e, results) {
    if (e)return next(e);
    res.send(results)
  })
});

//----------------
app.listen(3000);
