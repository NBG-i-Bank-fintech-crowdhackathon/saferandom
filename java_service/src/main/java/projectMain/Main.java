package projectMain;

import java.util.List;
import java.util.concurrent.ExecutionException;

import org.bitcoinj.store.BlockStoreException;

import bitcoin.BlockData;
import bitcoin.BlockFinder;
import utils.Utils;
import utils.dbtools.Queries;

public class Main {
	public static void main (String args[]) throws BlockStoreException, InterruptedException, ExecutionException {

		List<BlockData> newBlocks = BlockFinder.getNewBlocks();
		Queries.storeBlocks(newBlocks);
	}
}
