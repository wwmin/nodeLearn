var events = require('events')
  , net = require('net');

var channel = new events.EventEmitter();
// channel.setMaxLinsteners(50);
channel.clients = {};
channel.subscriptions = {};
channel.on('broadcast', (id, data) => {
  console.log(id, data);
});
channel.on('join', (id, client)=> {
  var welcome = "Welcome!\n"
    + "Guests online: " + this.listeners('broadcast').length;
  client.write(welcome + "\n");
  this.clients[id] = client;
  this.subscriptions[id] = (senderId, message)=> {
    if (id != senderId) {
      this.clients[id].write(message);
    }
  };
  this.on('broadcast', this.subscriptions[id]);
});

channel.on('leave', (id)=> {
  channel.removeListener('broadcast', this.subscriptions[id]);
  channel.emit('broadcast', id, id + " has left the chat.\n");
});

channel.on('shutdown', ()=> {
  channel.emit('broadcast', '', "Chat has shut down.\n");
  channel.removeAllListeners('broadcast');
});

var server = net.createServer(function (client) {
  var id = client.remoteAddress + ':' + client.remotePort;
  client.on('connect', ()=> {
    channel.emit('join', id, client);
  });
  client.on('data', (data) => {
    data = data.toString();
    if (data == "shutdown\r\n") {
      channel.emit('shutdown');
    }
    channel.emit('broadcast', id, data);
  });
  client.on('close', ()=> {
    channel.emit('leave', id);
  });
});
server.listen(8888);
