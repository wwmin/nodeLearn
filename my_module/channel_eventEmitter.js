var EventEmitter = require('event').EventEmitter;
var channel = new EventEmitter();
channel.on('join',function(){
  console.log("Welcome!");
});
channel.emit('join');