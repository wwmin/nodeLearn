var superagent = require('superagent');
var expect = require('expect.js');
var mongoskin = require('mongoskin');
var db = mongoskin.db('mongodb://@localhost:27017/test-rest', {safe: true});

describe('express rest api server', function () {
  //测试执行前清空数据库
  before(function () {
    db.collection('test').remove({})
  });
  var id;
  //--测试post
  it('post object', function (done) {
    superagent.post('http://localhost:3000/collections/test')
      .send({
        name: 'Johns',
        email: 'John@rpjs.co'
      })
      .end(function (e, res) {
        expect(e).to.eql(null);
        expect(res.body.ops.length).to.eql(1);
        expect(res.body.ops[0]._id.length).to.eql(24);
        id = res.body.ops[0]._id;
        done()
      })
  });

  //--测试get by ID
  it('retrieves an object', function (done) {
    superagent.get('http://localhost:3000/collections/test/' + id)
      .end(function (e, res) {
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.body._id.length).to.eql(24);
        expect(res.body._id).to.eql(id);
        done()
      })
  });
  //--测试get 集合
  it('retrieves a collection', function (done) {
    superagent.get('http://localhost:3000/collections/test')
      .end(function (e, res) {
        expect(e).to.eql(null);
        expect(res.body.length).to.be.above(0);
        expect(res.body.map(function (item) {
          return item._id
        })).to.contain(id);
        done()
      })
  });

  //--测试update 更新
  it('updates an object', function (done) {
    superagent.put('http://localhost:3000/collections/test/' + id)
      .send({
        name: 'Peter',
        email: 'peter@yahoo.com'
      })
      .end(function (e, res) {
        expect(e).to.eql(null);
        done()
      })
  });
  //--验证更新后的数据
  it('checks an updated object', function (done) {
    superagent.get('http://localhost:3000/collections/test/' + id)
      .end(function (e, res) {
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.body._id.length).to.eql(24);
        expect(res.body._id).to.eql(id);
        expect(res.body.name).to.eql('Peter');
        done()
      })
  });

  //--测试remove删除
  it('removes an object', function (done) {
    superagent.del('http://localhost:3000/collections/test/' + id)
      .end(function (e, res) {
        expect(e).to.eql(null)
        expect(res.body.msg).to.eql('success')
        done()
      })
  })
});
