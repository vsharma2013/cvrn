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
	int _sent = 0;  public int getSent() { return _sent; }
	int _recd = 0;  public int getRecd() { return _recd; }
				
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
	        System.out.println(String.format("Registered channel : %s   Received Channel : %s     %s", _channelName, address, contents));
	        _recd += 1;	        
		}
	}
	
	public void publish(){    		
		publisher.send("{\"c\" : \"" + _channelName + "\", \"m\" :\" message 1\" }"); 
		publisher.recvStr();
		_sent += 1;
	}
	
	public void kill(){
		_continue = false;
	}

}
