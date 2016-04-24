package bitcoin;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.ExecutionException;

import org.bitcoinj.core.Block;
import org.bitcoinj.core.BlockChain;
import org.bitcoinj.core.Peer;
import org.bitcoinj.kits.WalletAppKit;
import org.bitcoinj.params.MainNetParams;
import org.bitcoinj.store.BlockStore;
import org.bitcoinj.store.BlockStoreException;

import java.sql.Timestamp;

import utils.Utils;
import utils.dbtools.Queries;


public class BlockFinder {
	
	public static Block getHeader() throws BlockStoreException {
		WalletAppKit kit = new WalletAppKit(MainNetParams.get(), new java.io.File("."), "saferandom");
        kit.startAndWait();
        BlockChain chain = kit.chain();
        BlockStore bs = chain.getBlockStore();
        return bs.getChainHead().getHeader();
	}
	/*
	 * Requires more attention for degenerated blocks
	 */
	public static List<BlockData> getNewBlocks() throws BlockStoreException, InterruptedException, ExecutionException {
        BlockData lastStored = Queries.getLastBlock();
		System.out.println("HASH_OLD" + lastStored.getBlockHash());
		
		WalletAppKit kit = new WalletAppKit(MainNetParams.get(), new java.io.File("."), "saferandom");
        kit.startAndWait();
        BlockChain chain = kit.chain();
        BlockStore bs = chain.getBlockStore();

		Block header = bs.getChainHead().getHeader();
		System.out.println("HASH_NEW" + header.getHashAsString());
		List<BlockData> newBlocks = new ArrayList<BlockData>();
		Peer peer = kit.peerGroup().getDownloadPeer();
		while (!header.getHashAsString().equals(lastStored.getBlockHash())) {
			newBlocks.add(new BlockData(header.getHashAsString(), Utils.getTimeStamp(header.getTime())));
			header = peer.getBlock(header.getPrevBlockHash()).get();
			System.out.println("SIZE " + newBlocks.size());
			//System.out.println(header);
		}
		if (newBlocks.isEmpty()) return null;
		
		Collections.reverse(newBlocks);
		int counter = lastStored.getHeight();
		for (BlockData bd : newBlocks) {
			bd.setHeight(++counter);
		}
		return newBlocks;
	}
	
	public static Block getBlockByHeight(int height) throws BlockStoreException {
		Block header = getHeader();
		System.out.println(header.getHashAsString());
		return header;
	}
	
	public static void main(String args[]) throws BlockStoreException {
		System.out.println(getHeader());
	}

}
