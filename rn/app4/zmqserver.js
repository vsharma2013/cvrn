


var bSingleCore = false;

if(bSingleCore){
	require('./worker');

	var zmq    = require('zmq');
	var server = zmq.socket('router');
	var worker = zmq.socket('dealer');

	server.bindSync('tcp://*:5559');
	worker.bindSync('tcp://*:5560');

	server.on('message', function() {
		console.log('request at : ' + Date.now());
		var args = Array.apply(null, arguments);
		worker.send(args);
	});

	worker.on('message', function() {
		var args = Array.apply(null, arguments);
		server.send(args);
	});
}
else{
	var cluster = require('cluster');
	var zmq    = require('zmq');
	var server = zmq.socket('router');
	var worker = zmq.socket('dealer');
	var worker2 = zmq.socket('rep');
	var publisher = zmq.socket('pub');

	//if (cluster.isMaster) {
		server.bindSync('tcp://*:5559');
		worker.bindSync('tcp://*:5560');
		publisher.bind('tcp://*:5501', function() {});
	//}
	server.on('message', function() {
		console.log('request at : ' + Date.now());
		var args = Array.apply(null, arguments);
		worker.send(args);
	});

	worker.on('message', function() {
		var args = Array.apply(null, arguments);
		server.send(args);
	});

	worker2.connect('tcp://localhost:5560');


	worker2.on('message', function(msg) {
		worker2.send("ok");
		
		var str = msg.toString();
	    var req = JSON.parse(str);
	    publisher.send([req.c, str]);
	    console.log('response at : ' + Date.now());
	});


}


