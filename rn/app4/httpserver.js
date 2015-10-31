var bSingleCore = true;

if(bSingleCore){
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
}
else{	
	var cluster = require('cluster');
	var http = require('http');
	var numCPUs = require('os').cpus().length;
	var zmqApp = require('./zmqapp2');

	if (cluster.isMaster) {
		//cluster.schedulingPolicy = cluster.SCHED_NONE;
		// Fork workers.
		for (var i = 0; i < numCPUs; i++) {
			cluster.fork();
		}

		cluster.on('exit', function(worker, code, signal) {
			console.log('worker ' + worker.process.pid + ' died');
		});
	} else {
		// Workers can share any TCP connection
		// In this case it is an HTTP server
		var zp2 = new zmqApp();
		http.createServer(function(req, res) {			
			res.writeHead(200);
			res.end("hello world\n");
			zp2.run(Date.now());
		}).listen(9998);
	}
	//console.log('serever running at 9998');
}



