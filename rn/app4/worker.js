var zmq      = require('zmq');
var worker = zmq.socket('rep');
var publisher = zmq.socket('pub');

publisher.bind('tcp://*:5501', function() {});
worker.connect('tcp://localhost:5560');


worker.on('message', function(msg) {
	worker.send("ok");
	
	var str = msg.toString();
    var req = JSON.parse(str);
    publisher.send([req.c, str]);
});
