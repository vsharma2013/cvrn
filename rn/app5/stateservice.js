var http = require('http');
var id = 0;

http.createServer(function(req, res){
	id++;
	if(id > 8) id = 1;
	var r = JSON.stringify({'id' : id});
	res.writeHead(200);
	res.end(r);
}).listen(9997);

console.log('state server at 9997')