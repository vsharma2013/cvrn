var zmq    = require('zmq');

function user(chName){
	this.channelName = chName;
	this.publisher = zmq.socket('req');
	this.publisher.connect('tcp://localhost:5559');

	this.subscriber = zmq.socket('sub');
	this.subscriber.connect('tcp://localhost:5501');
	this.subscriber.on('message', this.onSubscriberMessage.bind(this));
	this.subscriber.subscribe(this.channelName);
}

user.prototype.publish = function(httpReqTS, chPublishTS){
	//console.log('user publish at : ' + httpReqTS);
	var msg = JSON.stringify({
		c : this.channelName,
		mts : Date.now(),
		cts : chPublishTS,
		hts : httpReqTS,
		m : 'message from publisher'
	});
	this.publisher.send(msg);
}

user.prototype.onSubscriberMessage = function(){
	var msg = [];
    Array.prototype.slice.call(arguments).forEach(function(arg) {
        msg.push(arg.toString());
    });

    console.log(msg);
}


module.exports = user;