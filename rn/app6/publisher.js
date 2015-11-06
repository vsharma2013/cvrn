var http = require('http');
var multiCore = true;

function runSingle(){
	var mqtt    = require('mqtt');
	var client  = mqtt.connect('mqtt://192.168.1.33');

	client.on('connect', function () {
		getPublisherChannelName(function(chName){
			startLoop(chName);
		});	  
	});
	 
	client.on('message', function (topic, message) {
	   console.log(message.toString() + ' client id : ' + client.options.clientId);
	});

	
	function startLoop(chName){
		setInterval(function(){
			client.publish(chName, 'Message from publisher : ' + chName); 
		}, 1);
	}
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

function getPublisherChannelName(cbOnDone){
	http.get({
		host : 'localhost',
		port : '9997',
		path : '/pub'
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
                cbOnDone('ch-' + jr.pid);
            } catch (err) {
                console.error('Unable to parse response as JSON', err);
            }         
        });
	})
}
