
var http = require('http');
var start = 0;
var end = 30;

http.createServer(function(req, res){
	if(req.url === '/gse'){
		if(end > 255){
			start = 0;
			end = 30;
		}
		
		var jr = {
			start : start,
			end : end
		}
		start = end;
		end += 30;

		res.writeHead(200)
		res.end(JSON.stringify(jr));
	}
}).listen(9997);