
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
