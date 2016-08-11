var http = require('http');
var url = require('url');

var pubId = 0;
var subId = 0;

var pubData = {};
var subData = {};

http.createServer(function(req, res){
	if(req.url === '/pub'){
		pubId++;
		if(pubId > 8){
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
	else if(req.url.indexOf('/pubdata') !== -1){
		res.writeHead(200);
		res.end('ok');
		console.log('pub data');
		var qParams = url.parse(req.url,true).query;
  		if(!pubData[qParams.q])
  			pubData[qParams.q] = 0;
  		pubData[qParams.q]++;
  		
	}
	else if(req.url.indexOf('/subdata') !== -1){
		res.writeHead(200);
		res.end('ok');
		console.log('sub data');
		var qParams = url.parse(req.url,true).query;
  		if(!subData[qParams.q])
  			subData[qParams.q] = 0;
  		subData[qParams.q]++;
	}
	else if(req.url.indexOf('/pubsubcount') !== -1){
  		res.writeHead(200);
		res.end(JSON.stringify({
			publisher : pubData,
			subscriber : subData
		}));
	}
	else{
		console.log(req.url);
		res.writeHead(200);
		res.end('No endpoint');
	}
}).listen(9997);

console.log('state server at 9997')


//This is comment 1

//This is comment 2
