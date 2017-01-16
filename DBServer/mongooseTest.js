//连接的打开
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/tasks');
//注册schema
var Schema = mongoose.Schema;
var Tasks = new Schema({
  project: String,
  description: String
});
mongoose.model('Task', Tasks);
//添加任务
var Task = mongoose.model('Task');
var task = new Task();
task.project = 'Bikeshed';
task.description = 'Paint the bikeshed red';
task.save(function (err) {
  if (err)throw err;
  console.log("task saved.");
});
//搜索文档
Task.find({'project': 'Bikeshed'}, function (err, tasks) {
  for (var i = 0; i < tasks.length; i++) {
    console.log('ID:' + tasks[i]._id);
    console.log(tasks[i].description);
  }
});
//更新文档
Task.update(
  {_id: '587acfe108288c39844a2b41'},
  {description: "Pain the bikeshed blue."},
  {multi: false},
  function (err, rows_updated) {
    if (err)throw err;
    console.log('Updated.');
  }
);
Task.find({'project': 'Bikeshed'}, function (err, tasks) {
  var task2 = new Task();
  task2.project = "carshed";
  task2.description = "Pain the car black.";
  task2.save(function (err) {
    if (err)throw err;
    console.log("task saved");
  })
});
//删除文档
Task.findById('587acfe108288c39844a2b41', function (err, task) {
  // task.remove();
});
//mongoose.disconnect();//终止Mongoose创建的链接
