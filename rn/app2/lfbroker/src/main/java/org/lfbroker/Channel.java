package org.lfbroker;


public class Channel extends Thread{
	boolean _continue = true;
	UserGroup _userGroup = null;
	
	Channel(String channelName){
		_userGroup = new UserGroup(channelName);
	}
	public void run(){
		while(_continue){
			try {
				Thread.sleep(500);
				_userGroup.run();
	            
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}			
		}
	}
	
	public void kill(){
		_continue = false;
		_userGroup.stop();
	}	
	
	public void showOutput(){
		_userGroup.showOutput();
	}
}
