var http = require('http');
var pubId = 0;
var subId = 0;

http.createServer(function(req, res){
	if(req.url === '/pub'){
		pubId++;
		if(pubId > 1){
			pubId = 1;
		}
		res.writeHead(200);
		res.end(JSON.stringify({pid : pubId}));
	}
	else if(req.url === '/sub'){
		subId++;
		if(subId > 8){
			subId = 1;
		}
		res.writeHead(200);
		res.end(JSON.stringify({sid : subId}));
	}
}).listen(9997);

console.log('state server at 9997')