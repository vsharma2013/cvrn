package org.lfbroker;

import org.zeromq.ZMQ;
import org.zeromq.ZMQ.Context;
import org.zeromq.ZMQ.Socket;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args ) throws InterruptedException, IOException
    {
        runMain();
    	//runTest();
    }
    
    
    
    private static void  runMain() throws InterruptedException, IOException
    {
    	List<Channel> _channels = new ArrayList<Channel> ();
        int channelCount = 9;
        //String sessionId = getSessionId();
        for(int i = 1; i <= channelCount ; i++){
        	_channels.add(new Channel("ch-14" + String.valueOf(i)));
        }
        
        for(Channel c : _channels){
        	c.start();
        }
        System.out.println("running...");
        
        Thread.sleep(3 * 1000);
        
        System.out.println("Stopping all threads");
        for(Channel c : _channels){
        	c.kill();
        }
        Thread.sleep(10 * 1000);
        for(Channel c : _channels){
        	c.showOutput();
        }
    }
    
    private static String getSessionId() throws IOException{
    	Path currentRelativePath = Paths.get("");
    	String currDir = currentRelativePath.toAbsolutePath().toString();
    	String fileName = currDir + "/lfbsession.txt";
    	File f = new File(fileName);
    	if(f.exists()){
    		String content = readFile(fileName, Charset.defaultCharset());
    		int id = Integer.valueOf(content);
    		String sid = "ss" + content + "-";
    		++id;
    		PrintWriter out = new PrintWriter(fileName);
    		out.print(String.valueOf(id));
    		out.close();
    		return sid;
    	}
    	else{
    		PrintWriter out = new PrintWriter(fileName);
    		out.print("2");
    		out.close();
    		return "ss1-";
    	}
    	
    }
    
    private  static String readFile(String path, Charset encoding) throws IOException 	  
	{
	    byte[] encoded = Files.readAllBytes(Paths.get(path));
	    return new String(encoded, encoding);
	}
   
   private static void runTest() throws InterruptedException, IOException
   {
	   	Context context = ZMQ.context(1);;
	   	Socket publisher = context.socket(ZMQ.REQ);
	   	publisher.connect("tcp://localhost:5559");
	   	publisher.send("hello");
	   	publisher.recvStr();
	   	Thread.sleep(2 * 1000);
	   	publisher.send("hello");
	   	Thread.sleep(2 * 1000);
	   	System.out.println("done sending");
   }
}
