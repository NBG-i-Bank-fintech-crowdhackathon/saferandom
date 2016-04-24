package runnables;

import stocks.StockUtils;

public class UpdateNewStocks implements Runnable {
	public static int PERIOD = 1000*60; //1 minute
	
	public void run() {
		try {
			StockUtils.storeNewStocks();
		} catch (Exception e) {
			//DO NOTHING
		}
		
	}

}
