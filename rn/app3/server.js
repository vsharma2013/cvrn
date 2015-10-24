
// Simple request-reply broker in Node.js
require('./worker');

var zmq    = require('zmq');
var server = zmq.socket('router');
var worker = zmq.socket('dealer');

server.bindSync('tcp://*:5559');
worker.bindSync('tcp://*:5560');

server.on('message', function() {
  // Note that separate message parts come as function arguments.
  var args = Array.apply(null, arguments);
  // Pass array of strings/buffers to send multipart messages.
  worker.send(args);
});

worker.on('message', function() {
  var args = Array.apply(null, arguments);
  server.send(args);
});



// var client = zmq.socket('req');

// client.connect('tcp://localhost:5559');
// var replyNbr = 0;
// client.on('message', function(msg) {
//   console.log('got reply', replyNbr, msg.toString());
//   replyNbr += 1;
// });

// for (var i = 0; i < 10; ++i) {
//   client.send("Hello");
// }
