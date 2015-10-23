package org.lfbroker;

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
        List<Channel> _channels = new ArrayList<Channel> ();
        int channelCount = 1;
        String sessionId = getSessionId();
        for(int i = 1; i <= channelCount ; i++){
        	_channels.add(new Channel(sessionId + "ch-" + String.valueOf(i)));
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
    
    private static String getSessionId() throws IOException{
    	Path currentRelativePath = Paths.get("");
    	String currDir = currentRelativePath.toAbsolutePath().toString();
    	String fileName = currDir + "/lfbsession.txt";
    	File f = new File(fileName);
    	if(f.exists()){
    		String content = readFile(fileName, Charset.defaultCharset());
    		int id = Integer.valueOf(content);
    		String sid = "s" + content + "-";
    		++id;
    		PrintWriter out = new PrintWriter(fileName);
    		out.println(String.valueOf(id));
    		out.close();
    		return sid;
    	}
    	else{
    		PrintWriter out = new PrintWriter(fileName);
    		out.print("2");
    		out.close();
    		return "s1-";
    	}
    	
    }
    
   private  static String readFile(String path, Charset encoding) 
    		  throws IOException 
    		{
    		  byte[] encoded = Files.readAllBytes(Paths.get(path));
    		  return new String(encoded, encoding);
    		}
}
