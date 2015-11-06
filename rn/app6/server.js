var mosca = require('mosca');
var multiCore = true;


if(multiCore){
	var cluster = require('cluster');
	var numCPUs = require('os').cpus().length;
	if (cluster.isMaster) {
		for (var i = 0; i < numCPUs; i++) {
			cluster.fork();
		}
	} else {
		var server = new mosca.Server({port : 1883});
		console.log('server id : ' + server.id);
		// server.on('published', function(packet, client){
		// 	console.log('Published from server : ' + server.id + ' at :  ' + Date.now());
		// });
		server.on('clientConnected', function(client){
			console.log('connected : ' + client.id + '  on server : ' + server.id);
		});

		server.on('clientDisonnected', function(client){
			console.log('Disonnected : ' + client.id);
		});
	}
}
else{
	var server = new mosca.Server({port : 1883});
	console.log(server.id);
}




