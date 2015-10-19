var net = require('net');
var i = 0;
var server = net.createServer(function(socket) {
	console.log('CONNECTED: ' + socket.remoteAddress +':'+ socket.remotePort);
	i++;
	console.log('Connection count : ' + i );
	socket.on('data', function(data){
		console.log('got data request');
		socket.write('Server said you asked for : ' + data + ' at : ' + Date.now());
	});
});

server.listen(1337, '127.0.0.1');