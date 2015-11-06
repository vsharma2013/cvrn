var http = require('http');
var multiCore = true;
var dtStart = Date.now();

function runSingle(){
	var mqtt    = require('mqtt');
	var client  = null;

	

	getPublisherChannelName(function(chName){
		var clientName = 'P_' + chName;
		client  = mqtt.connect('mqtt://localhost', {clientId : clientName});

		client.on('connect', function () {
			startLoop(chName)  
		});		 
	});	


	function startLoop(chName){
		var intv = setInterval(function(){
			client.publish(chName, 'Message from publisher : ' + chName);
			sendPublishTick(chName); 
			if(Date.now() - dtStart > 5000){
				clearInterval(intv);
				console.log('publish stopped')
			}
		}, 100);
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

function sendPublishTick(chName){
	http.get({
		host : 'localhost',
		port : '9997',
		path : '/pubdata?q=' + chName,		
	}, function() {} );
}
