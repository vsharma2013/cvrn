var http = require('http');
var multiCore = true;
var _chName = 'null';

function runSingle(){
	var mqtt    = require('mqtt');
	var client  = null;
	
	getSubscribeChannelName(function(chName){
		_chName = chName;
		var clientName = 'S_' + _chName;
		client = mqtt.connect('mqtt://localhost', {clientId : clientName});		
		
		client.on('connect', function () {
			client.subscribe(_chName); 
			console.log(client.options.clientId, _chName);
		});

		client.on('message', function (topic, message) {
		   console.log(message.toString() + '    subscriber : ' + _chName + '  for client id : ' + client.options.clientId);
		   sendSubscribeTick(_chName);
		});
	}); 

	
}


if(multiCore){
	var cluster = require('cluster');
	cluster.schedulingPolicy = cluster.SCHED_NONE;
	var numCPUs = require('os').cpus().length;
	if (cluster.isMaster) {
		for (var i = 0; i < numCPUs; i++) {
			cluster.fork();
		}
	} else {
		runSingle();
	}
}
else{
	runSingle();
}

function getSubscribeChannelName(cbOnDone){
	http.get({
		host : 'localhost',
		port : '9997',
		path : '/sub'
	}, function(res){
		res.setEncoding('utf8');

        // incrementally capture the incoming response body
        var body = '';
        res.on('data', function(d) {
            body += d;
        });

        // do whatever we want with the response once it's done
        res.on('end', function() {
            try {
            	console.log(body);
            	var jr = JSON.parse(body)
                cbOnDone('ch-' + jr.sid);
            } catch (err) {
                console.error('Unable to parse response as JSON', err);
            }         
        });
	})
}

function sendSubscribeTick(chName){
	http.get({
		host : 'localhost',
		port : '9997',
		path : '/subdata?q=' + chName,		
	}, function() {} );
}
