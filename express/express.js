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

app.get('/collections/:collectionName/:id', function (req, res, next) {
  req.collection.findById(req.params.id, function (e, result) {
    if (e)return next(e);
    res.send(result);
  })
});

app.get('/collections/:collectionName', function (req, res, next) {
  req.collection.find({}, {limit: 10, sort: [['_id', -1]]}).toArray(function (e, results) {
    if (e)return next(e);
    res.send(results)
  })
});

app.put('/collections/:collectionName/:id', function (req, res, next) {
  req.collection.updateById(req.params.id, {$set: req.body}, function (e, result) {
    if (e)return next(e);
    res.send(result);
  })
});

app.del('/collections/:collectionName/:id',function (req, res, next) {
  req.collection.removeById(req.params.id,function (e, result) {
    if(e)return next(e);
    res.send((result===1)?{msg:'success'}:{msg:'error'})
  })
});
//----------------
app.listen(3000);
