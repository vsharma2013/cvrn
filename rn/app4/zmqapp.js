var channel = require('./channel');

var channelCount = 255;

var channels = [];

for(var i = 0 ; i < channelCount; i++){
	channels.push(new channel(i));
}

process.on("message", function (httpReqTS) {
	channels.forEach(function(ch) {
		ch.run(httpReqTS);
	});
    process.send("done");
});
