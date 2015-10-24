package org.lfbroker;

public class UserGroup {
	User _user1 = null;
	User _user2 = null;
	String _channelName = "";
	boolean _started = false;
	
	UserGroup(String channelName){
		_channelName = channelName;
		_user1 = new User(channelName);
		_user2 = new User(channelName);

	}
	
	public void run(){
		if(!_started ){
			_user1.start();
			_user2.start();
			_started = true;
		}
		_user1.publish();
	}
	
	public void stop(){
		_user1.kill();
		_user2.kill();
	}
	
	public void showOutput()
	{
		int sent = _user1.getSent() + _user2.getSent();
		int recd = _user2.getRecd() + _user2.getRecd();
		String res = String.format("Channel name : %s  sent = %d   recd = %d ", _channelName, sent, recd);
		System.out.println(res);
	}
}
