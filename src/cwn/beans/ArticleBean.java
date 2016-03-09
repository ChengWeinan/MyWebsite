package cwn.beans;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class ArticleBean {
	private int id;
	private String title;
	private int category = -1;
	private String labelList;
	private String abstractTxt;
	private String content;
	private long date;
	

	@XmlAttribute
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	@XmlAttribute
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	@XmlAttribute
	public int getCategory() {
		return category;
	}
	public void setCategory(int category) {
		this.category = category;
	}
	@XmlAttribute
	public String getLabelList() {
		return labelList;
	}
	public void setLabelList(String labelList) {
		this.labelList = labelList;
	}
	@XmlAttribute
	public String getAbstractTxt() {
		return abstractTxt;
	}
	public void setAbstractTxt(String abstractTxt) {
		this.abstractTxt = abstractTxt;
	}
	@XmlAttribute
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	@XmlAttribute
	public long getDate() {
		return date;
	}
	public void setDate(long date) {
		this.date = date;
	}
	
}
