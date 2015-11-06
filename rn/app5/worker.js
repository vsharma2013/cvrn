var http = require('http');

function Worker(){
	this.id = 0;
	var self = this;
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
            	var jr = JSON.parse(body)
                self.id = jr.id;
            } catch (err) {
                console.error('Unable to parse response as JSON', err);
            }         
        });
	})
}

Worker.prototype.processRequest = function(req, res){
	var r = JSON.stringify({
		success : true,
		msg : 'response from worker : ' + this.id
	});
	console.log(r);
	res.writeHead(200);
	res.end(r);
}

module.exports = Worker;