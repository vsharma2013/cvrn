var zmq = require('zmq');
var publisher = zmq.socket('pub');
var listener = zmq.socket('pub');

var PORT = process.argv[2];

publisher.connect('tcp://192.168.1.35:8234');
listener.bind('tcp://192.168.1.35:'+ PORT);

listener.on('message', function(){
	publisher.send('this is from worker IP :  ' + IP);
});


