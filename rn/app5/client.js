var zmq = require('zmq');
var client = zmq.socket('sub');

client.connect('tcp://192.168.1.35:8233');

client.on('message', function(){
	console.log('message recd on client ');
	console.log(arguments);
});

setInterval(function(){
	client.send('msg from client');
}, 300);