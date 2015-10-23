package org.lfbroker;

import java.util.ArrayList;
import java.util.List;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args ) throws InterruptedException
    {
        List<Channel> _channels = new ArrayList<Channel> ();
        int channelCount = 1;
        for(int i = 1; i <= channelCount ; i++){
        	_channels.add(new Channel(i));
        }
        
        for(Channel c : _channels){
        	c.start();
        }
        
        Thread.sleep(10 * 1000);
        
        System.out.println("Stopping all threads");
        for(Channel c : _channels){
        	c.kill();
        }
    }
}
