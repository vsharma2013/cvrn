var user = require('./user');


function channel(chId){
	this.id = chId;
	this.channelName = "ch-" + chId;
	this.user1 = new user(this.channelName);
	this.user2 = new user(this.channelName);
}

channel.prototype.run = function(httpReqTS){
	this.user1.publish(httpReqTS, Date.now());
}

module.exports = channel;