package org.lfbroker;

import org.zeromq.ZMQ;
import org.zeromq.ZMQ.Context;
import org.zeromq.ZMQ.Socket;

public class User extends Thread{
	Context context = ZMQ.context(1);;
	Socket subscriber = context.socket(ZMQ.SUB);
	Socket publisher = context.socket(ZMQ.REQ);
	String _channelName = "";
	boolean _continue = true;
	int _sent = 0;
	int _recd = 0;
	
	User(String channelName){
		_channelName = channelName;
		subscriber.connect("tcp://localhost:5501");
		publisher.connect("tcp://localhost:5500");
		subscriber.subscribe(channelName.getBytes());		
	}
	
	public void run(){
		while(_continue){
			String address = subscriber.recvStr ();
	        String contents = subscriber.recvStr ();
	        System.out.println(address + " : " + contents);
	        
	        if(contents.contains("msg : reply")) return;
	        
	        publisher.send("{channelName : " + _channelName + ", msg : reply message 1 }"); 
			publisher.send("{channelName : " + _channelName + ", msg : reply message 2 }"); 
			publisher.send("{channelName : " + _channelName + ", msg : reply message 3 }"); 
			publisher.send("{channelName : " + _channelName + ", msg : reply message 4 }"); 
			_recd += 4;
		}
	}
	
	public void publish(){      
		publisher.send("{channelName : " + _channelName + ", msg : message 1 }"); 
		publisher.send("{channelName : " + _channelName + ", msg : message 2 }"); 
		publisher.send("{channelName : " + _channelName + ", msg : message 3 }"); 
		publisher.send("{channelName : " + _channelName + ", msg : message 4 }"); 
		_sent += 4;
	}
	
	public void kill(){
		_continue = false;
	}
}
