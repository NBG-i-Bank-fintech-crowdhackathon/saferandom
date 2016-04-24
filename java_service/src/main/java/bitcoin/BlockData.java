package bitcoin;

import java.sql.Timestamp;

public class BlockData {
	
	private int height;
	private String blockHash;
	private Timestamp blockDate;
	
	public BlockData(int height, String blockHash, Timestamp blockDate) {
		super();
		this.height = height;
		this.blockHash = blockHash;
		this.blockDate = blockDate;
	}
	
	public BlockData(String blockHash, Timestamp blockDate) {
		super();
		this.blockHash = blockHash;
		this.blockDate = blockDate;
	}

	public int getHeight() {
		return height;
	}

	public String getBlockHash() {
		return blockHash;
	}

	public Timestamp getBlockDate() {
		return blockDate;
	}

	public void setHeight(int height) {
		this.height = height;
	}

	
}
