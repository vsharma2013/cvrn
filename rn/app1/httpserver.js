var http = require('http');
var net = require('net');
var i = 0;

var server = http.createServer(function (request, response) {
	// var client = net.connect({port: 1337}, function() { //'connect' listener
	// 	//console.log('connected to server!');
	// 	client.write('Client give me data: ');
	// });

	// client.on('data', function(data) {
	// 	console.log(data.toString());
	// 	client.end();
	// });

	// client.on('end', function() {
	// 	//console.log('disconnected from server');
	// });
i++;
	console.log('Connection count : ' + i );
	response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Server OK");

});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");




