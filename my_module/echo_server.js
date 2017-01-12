var net = require('net');
var server = net.createServer(function (socket) {
  socket.on('data', function (data) {
    socket.write(data+'\n');
  });
});
server.listen(8888);
