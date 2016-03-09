package cwn.dao;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.jdbc.core.JdbcTemplate;

public class TableArticleDAO {
	private static final String DATEFORMAT = "yyyy-MM-dd HH:mm:ss";
	private static final SimpleDateFormat SDF = new SimpleDateFormat(DATEFORMAT);
	
	//数据库连接对象
	private ApplicationContext context = new ClassPathXmlApplicationContext("JdbcTemplateBean.xml");
	private JdbcTemplate template = (JdbcTemplate)context.getBean("jdbcTemplate");
	
	
	//获取状态列表
	public List getStatusList(int itemsStartIndex, int itemsCount){
		String sql = "SELECT id, title, author, category, abstractTxt, url, date, labelList, visits FROM Article ORDER BY date DESC LIMIT "+itemsStartIndex+","+itemsCount+";";
		return (List)template.queryForList(sql);
	}
	
	//获取状态总数
	public List getStatusTotalCount(){
		String sql = "SELECT COUNT(id) as totalCount FROM Article;";
		return (List)template.queryForList(sql);
	}
	
	//获取文章列表
	public List getArticleList(){
		String sql = "SELECT id, title, author, category, abstractTxt, url, date, labelList, visits FROM Article ORDER BY date DESC;";
		return (List)template.queryForList(sql);
	}
	
	//获取指定类型的文章列表
	public List getArticleList(int category){
		String sql = "SELECT id, title, author, category, abstractTxt, url, date FROM Article WHERE category="+category+" ORDER BY date DESC;";
		return (List)template.queryForList(sql);
	}
	
	//获取指定类型的文章列表, 并筛选关键词
	public List searchArticleList(int category, String keyword){
		String sql = "SELECT id, title, author, category, abstractTxt, url, date FROM Article WHERE category="+category+" AND (title LIKE '%" + keyword + "%' OR labelList LIKE '%" + keyword + "%' OR content LIKE '%" + keyword + "%') ORDER BY date DESC;";
		return (List)template.queryForList(sql);
	}
	
	//获取指定文章的数据
	public List getArticle(int articleId){
		String sql = "SELECT id, title, author, category, abstractTxt, url, content, date, labelList, visits FROM Article WHERE id="+articleId+";";
		return (List)template.queryForList(sql);
	}
	
	//获取指定文章的前一篇文章信息
	public List getPreArticleInfo(long articleDate, int category){		
		String articleDateFormat = SDF.format(longToDate(articleDate));
		String sql = "SELECT id, title, category, url FROM Article WHERE date<'"+articleDateFormat+"' AND category="+category+" ORDER BY date DESC LIMIT 0,1;";
		return (List)template.queryForList(sql);
	}
	
	//获取指定文章的后一篇文章信息
	public List getPostArticleInfo(long articleDate, int category){	
		String articleDateFormat = SDF.format(longToDate(articleDate));
		String sql = "SELECT id, title, category, url FROM Article WHERE date>'"+articleDateFormat+"' AND category="+category+" ORDER BY date ASC LIMIT 0,1;";
		return (List)template.queryForList(sql);
	}
	
	//新文章插入数据库
	public int insertNewArticle(String title,
								int category, 
								String abstractTxt, 
								String url, 
								String content, 
								String labelList){
		String currentDate = SDF.format(new Date());
		
		String sql = "INSERT INTO Article(id, title, author, category, abstractTxt, url, content, date, labelList, visits) VALUES(?,?,?,?,?,?,?,?,?,?);";
		return template.update(sql,
				 new Object[]{null, title, "ChengWeinan", category, abstractTxt, url, content, currentDate, labelList, 0});

	}
	
	//编辑旧文章
	public int editArticle(	int id,
							String title,
							int category, 
							String abstractTxt, 
							String content, 
							String labelList){
		String currentDate = SDF.format(new Date());
		
		String sql = "UPDATE Article SET title = ?, category = ?, abstractTxt = ?, content = ?, date = ?, labelList = ? WHERE id = ?";
		return template.update(sql,
				 new Object[]{title, category, abstractTxt, content, currentDate, labelList, id});

	}
	
	//指定的文章访问量加1
	public int addArticleVisits(int id){
		String sql = "UPDATE Article SET visits=visits+1 WHERE id = ?;";
		return template.update(sql,
				 new Object[]{id});
	}
	
	//删除指定的文章列表
	//说明：如果采用"?"占位符传参，只能删除第一条记录，有待优化——程伟男
	public int deleteArticle(String idList){
		String sql = "DELETE FROM Article WHERE id in ("+idList+");";
		return template.update(sql);
	}
	
	private static Date longToDate( long time )
	{
		Calendar c = Calendar.getInstance();
		c.setTimeInMillis( time );
		return c.getTime();
	}
}
