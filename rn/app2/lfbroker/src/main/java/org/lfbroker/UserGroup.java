package org.lfbroker;

public class UserGroup {
	User _user1 = null;
	User _user2 = null;
	
	UserGroup(String channelName){
		_user1 = new User(channelName);
		_user2 = new User(channelName);
		_user1.start();
		_user2.start();
	}
	
	public void run(){
		_user1.publish();
	}
	
	public void stop(){
		_user1.kill();
		_user2.kill();
	}
}
