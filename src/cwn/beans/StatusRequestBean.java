package cwn.beans;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class StatusRequestBean {
	private int itemsStartIndex = 0;
	private int itemsCount = 10;
	
	@XmlAttribute
	public int getItemsStartIndex() {
		return itemsStartIndex;
	}
	public void setItemsStartIndex(int itemsStartIndex) {
		this.itemsStartIndex = itemsStartIndex;
	}
	@XmlAttribute
	public int getItemsCount() {
		return itemsCount;
	}
	public void setItemsCount(int itemsCount) {
		this.itemsCount = itemsCount;
	}	
}
