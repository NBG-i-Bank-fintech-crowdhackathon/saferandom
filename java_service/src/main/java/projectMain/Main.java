package projectMain;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

import org.bitcoinj.store.BlockStoreException;

import bitcoin.BlockData;
import bitcoin.BitcoinUtils;
import runnables.UpdateNewBlocks;
import runnables.UpdateNewStocks;
import stocks.StockUtils;
import utils.StaticVars;
import utils.Utils;

public class Main {
	public static void main (String args[]) throws BlockStoreException, InterruptedException, ExecutionException, IOException {
		StaticVars.EXECUTOR.scheduleAtFixedRate(new UpdateNewBlocks(), 0, UpdateNewBlocks.PERIOD, TimeUnit.MILLISECONDS);
		StaticVars.EXECUTOR.scheduleAtFixedRate(new UpdateNewStocks(), 0, UpdateNewStocks.PERIOD, TimeUnit.MILLISECONDS);
	}
}
