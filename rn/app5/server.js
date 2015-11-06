var http = require('http');
var Worker = require('./worker');

var multiCluster = true;

if(multiCluster){
	var cluster = require('cluster');
	var numCPUs = require('os').cpus().length;
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
		var worker = new Worker();
		http.createServer(function(req, res) {			
			worker.processRequest(req, res);
		}).listen(9998);
	}
}
else{
	var worker = new Worker();
	http.createServer(function(req, res) {			
		worker.processRequest(req, res);
	}).listen(9998);
}

console.log('serever running at 9998');