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
		publisher.connect("tcp://localhost:5559");
		subscriber.connect("tcp://localhost:5501");		
		subscriber.subscribe(channelName.getBytes());		
	}
	
	public void run(){
		while(_continue){
			String address = subscriber.recvStr ();
	        String contents = subscriber.recvStr ();
	        System.out.println(address + " : " + contents);
	        
	        //if(contents.contains("m : reply")) return;
	        _recd += 1;
	        _sent += 1;
	        publisher.send("{c : " + _channelName + ", m : reply message 1 }"); 
			
		}
	}
	
	public void publish(){      
		publisher.send("{c : " + _channelName + ", m : message 1 }"); 
		publisher.recvStr();
//		publisher.send("{c : " + _channelName + ", m : message 2 }"); 
//		publisher.send("{c : " + _channelName + ", m : message 3 }"); 
//		publisher.send("{c : " + _channelName + ", m : message 4 }"); 
		_sent += 1;
		System.out.println(_sent);
	}
	
	public void kill(){
		_continue = false;
	}
}
