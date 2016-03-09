package cwn.dao;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.jdbc.core.JdbcTemplate;

public class TableArticleCategoryDAO {
	//数据库连接对象
	private ApplicationContext context = new ClassPathXmlApplicationContext("JdbcTemplateBean.xml");
	private JdbcTemplate template = (JdbcTemplate)context.getBean("jdbcTemplate");
	
	
	
	//获取文章类型的全量列表
	public List getArticleCategoryList(){
		String sql = "SELECT id, name FROM ArticleCategory;";
		return (List)template.queryForList(sql);
	}

}
