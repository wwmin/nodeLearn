//可配置的Connect中间件logger
function setup(format) {
  //logger组件用正则表达式匹配请求属性
  var regexp = /:(\w+)/g;
  //Connect使用的真实logger组件
  return function logger(req, res, next) {
    //用正则表达式格式化请求的日志条目
    var str = format.replace(regexp, function (match, property) {
      return req[property]
    });
    console.info(str);
    //将控制权交给下一个中间件组件
    next();
  }
}
module.exports = setup;//直接导出logger的setup函数