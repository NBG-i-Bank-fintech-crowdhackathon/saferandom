package stocks;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.DataNode;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.nodes.Node;
import org.jsoup.select.Elements;

public class ParseBarChart {
	
	public static void main(String args[]) throws IOException {
		System.out.println(getStocks());
	}
	
	public static List<Stock> getStocks() throws IOException {
		URL url = new URL("http://www.barchart.com/stocks/sp500.php?_dtp1=0");
		Document doc = Jsoup.parse(url, 3000);

		Element table = doc.select("table[class=datatable ajax]").first();

		Iterator<Element> ite = table.select("tr").iterator();

		List<Stock> stocks = new ArrayList<Stock>();
		int counter = 0;
		while (ite.hasNext()) {
			Elements elements = ite.next().getElementsByTag("td");
			String curSymbol = null;
			String curPrice = null;
			String curDate = null;
			if (elements.size() == 9) {
				counter++;
				for (int i = 0; i < elements.size(); i++) {
					if (elements.get(i).hasClass("ds_symbol")) {
						curSymbol = elements.get(i).text();
					} else if (elements.get(i).hasClass("ds_last")) {
						curPrice = elements.get(i).text();
					} else if (elements.get(i).hasClass("ds_displaytime")) {
						curDate = elements.get(i).text();
					}
				}
				stocks.add(new Stock(curSymbol, curPrice, curDate));
			}
		}
		return stocks;
	}

}
