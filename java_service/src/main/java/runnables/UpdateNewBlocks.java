package runnables;

import bitcoin.BitcoinUtils;


public class UpdateNewBlocks implements Runnable {
	public static int PERIOD = 1000*60*60*24; //1 day
	
	public void run() {
		try {
			BitcoinUtils.storeNewBlocks();
		} catch (Exception e) {
			//DO NOTHING
		}
		
	}

}
