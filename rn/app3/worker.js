var zmq      = require('zmq');
var worker = zmq.socket('rep');

worker.connect('tcp://localhost:5560');
worker.on('message', function(msg) {
  console.log('received request:', msg.toString());
  worker.send("World");
});
