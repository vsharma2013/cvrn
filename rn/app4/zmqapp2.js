var http = require('http');
var channel = require('./channel');
var channels = [];

function zmqApp(){	
	http.get({
		host : 'localhost',
		port : '9997',
		path : '/gse'
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
                var jr = JSON.parse(body);
                for(var i = jr.start ; i < jr.end ; i++){
					channels.push(new channel(i));
				}
				console.log(channels.length);
            } catch (err) {
                console.error('Unable to parse response as JSON', err);
            }         
        });
	})
}

zmqApp.prototype.run = function(httpReqTS){
	//console.log(channels.length);
	channels.forEach(function(ch) {
		ch.run(httpReqTS);
	});
}

//var gApp = new zmqApp();

module.exports = zmqApp;