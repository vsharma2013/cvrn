var http = require('http');
var cp = require("child_process");
var zmq = cp.fork("./zmqapp");

http.createServer(function(req, res){
	res.writeHead(200, {'contentType': 'text/plain' });
	res.end('ok');
	
	if(req.url === '/')
		zmq.send(Date.now());	

}).listen(9998);

console.log('serever running at 9998');