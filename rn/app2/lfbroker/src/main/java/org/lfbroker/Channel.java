package org.lfbroker;

import org.zeromq.ZMQ;
import org.zeromq.ZMQ.Context;
import org.zeromq.ZMQ.Socket;

public class Channel extends Thread{
	int _id = 0;
	boolean _continue = true;
	Context context = null;
	Socket publisher = null;
	Socket subscriber = null;
	
	Channel(int id){
		_id = id;
		initPubSub();
	}
	public void run(){
		while(_continue){
			try {
				Thread.sleep(500);
				//System.out.println("Executing thread id = " + String.valueOf(_id));
				publisher.sendMore ("A");
	            publisher.send ("We don't want to see this");
	            publisher.sendMore ("B");
	            publisher.send("We would like to see this");
	            
	            String address = subscriber.recvStr ();
	            String contents = subscriber.recvStr ();
	            System.out.println(address + " : " + contents);
	            
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		}
	}
	
	public void kill(){
		_continue = false;
		//publisher.close ();
		//subscriber.close ();
        //context.term ();
	}
	
	private void initPubSub(){
	    context = ZMQ.context(1);
		publisher = context.socket(ZMQ.PUB);
		subscriber = context.socket(ZMQ.SUB);
        
		publisher.bind("tcp://*:5563");     
        subscriber.connect("tcp://localhost:5563");        
        subscriber.subscribe("B".getBytes());   
        subscriber.subscribe("A".getBytes());   
	}

}
