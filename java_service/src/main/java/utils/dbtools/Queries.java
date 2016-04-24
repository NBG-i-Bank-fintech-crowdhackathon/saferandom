package utils.dbtools;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

import bitcoin.BlockData;

public class Queries {
	
	
	public static void storeBlocks(List<BlockData> newBlocks) {
		if (newBlocks == null) return;
		Connection c = null;
		java.sql.PreparedStatement pstmt = null;
		
		DBPool DB = DBPool.getInstance(DBDetails.SAFERANDOM);		
		try {
			c = DB.getConnection();
			if (c != null) {
				pstmt = c.prepareStatement("INSERT IGNORE INTO bitcoin (height,hash,found) VALUES (?,?,?);");
				for (BlockData b : newBlocks) {
					pstmt.setInt(1, b.getHeight());
					pstmt.setString(2, b.getBlockHash());
					pstmt.setTimestamp(3, b.getBlockDate());
					pstmt.addBatch();
				}
				pstmt.executeBatch();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBPool.closeEverything(pstmt, c);
		}
	}
	
	public static BlockData getLastBlock(){
		Connection c = null;
		ResultSet rs = null;
		Statement stmt = null;
		
		DBPool DB = DBPool.getInstance(DBDetails.SAFERANDOM);		
		BlockData lastStored = null;
		try {
			c = DB.getConnection();
			if (c != null) {
				stmt = c.createStatement();
				rs = stmt.executeQuery("SELECT * FROM bitcoin WHERE height = (SELECT MAX(height) FROM bitcoin);");
				if (rs.next()) {
					lastStored = new BlockData(rs.getInt("height"), rs.getString("hash"), rs.getTimestamp("found"));
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBPool.closeEverything(rs, stmt, c);
		}
		return lastStored;
	}

}
