package cwn.controllers;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import cwn.beans.ArticleBean;
import cwn.beans.DeleteArticleBean;
import cwn.beans.SearchParamsBean;
import cwn.beans.StatusRequestBean;
import cwn.beans.SubmitResultBean;
import cwn.dao.TableArticleCategoryDAO;
import cwn.dao.TableArticleDAO;

@Controller
public class ArticleController {
	/**
	 * 获取文章类型列表
	 * */
	@RequestMapping(
		value="/GetArticleCategoryListOp",
		method=RequestMethod.POST,
		produces={"application/xml", "application/json"}
	)
	@ResponseBody
	public List getArticleCategoryList() {
		
		TableArticleCategoryDAO tableArticleCategoryDAO = new TableArticleCategoryDAO();

		return tableArticleCategoryDAO.getArticleCategoryList();
	}
	
	
	
	/**
	 * 获取状态列表
	 * */
	@RequestMapping(
		value="/GetStatusListOp",
		method=RequestMethod.POST,
		produces={"application/xml", "application/json"}
	)
	@ResponseBody
	public List getStatusList(@RequestBody StatusRequestBean statusRequestBean) {
		int itemsStartIndex = statusRequestBean.getItemsStartIndex();
		int itemsCount = statusRequestBean.getItemsCount();
		
		TableArticleDAO tableArticleDAO = new TableArticleDAO();

		return tableArticleDAO.getStatusList(itemsStartIndex, itemsCount);
	}
	
	
	
	/**
	 * 获取状态总数
	 * */
	@RequestMapping(
		value="/GetStatusTotalCountOp",
		method=RequestMethod.POST,
		produces={"application/xml", "application/json"}
	)
	@ResponseBody
	public List getStatusTotalCount() {
		TableArticleDAO tableArticleDAO = new TableArticleDAO();
		return tableArticleDAO.getStatusTotalCount();
	}
	
	
	
	/**
	 * 获取文章列表
	 * */
	@RequestMapping(
		value="/GetArticleListOp",
		method=RequestMethod.POST,
		produces={"application/xml", "application/json"}
	)
	@ResponseBody
	public List getArticleList(@RequestBody ArticleBean articleBean) {
		int category = articleBean.getCategory();
		TableArticleDAO tableArticleDAO = new TableArticleDAO();

		if(-1 == category){
			return tableArticleDAO.getArticleList();
		}else{
			return tableArticleDAO.getArticleList(category);
		}
	}
	
	
	
	/**
	 * 获取指定类型的文章列表, 并筛选关键词
	 * */
	@RequestMapping(
		value="/SearchArticleListOp",
		method=RequestMethod.POST,
		produces={"application/xml", "application/json"}
	)
	@ResponseBody
	public List searchArticleList(@RequestBody SearchParamsBean searchParamsBean) {
		int category = searchParamsBean.getCategory();
		String keyword = searchParamsBean.getKeyword();
		TableArticleDAO tableArticleDAO = new TableArticleDAO();

		return tableArticleDAO.searchArticleList(category, keyword);
	}

	
	
	/**
	 * 获取指定文章的数据
	 * */
	@RequestMapping(
		value="/GetArticleOp",
		method=RequestMethod.POST,
		produces={"application/xml", "application/json"}
	)
	@ResponseBody
	public List getArticle(@RequestBody ArticleBean articleBean) {
		int articleId = articleBean.getId();
		TableArticleDAO tableArticleDAO = new TableArticleDAO();
		
		tableArticleDAO.addArticleVisits(articleId);
		
		return tableArticleDAO.getArticle(articleId);
	}
	
	
	
	/**
	 * 获取前一篇文章的信息
	 * */
	@RequestMapping(
		value="/GetPreArticleInfoOp",
		method=RequestMethod.POST,
		produces={"application/xml", "application/json"}
	)
	@ResponseBody
	public List getPreArticleInfo(@RequestBody ArticleBean articleBean) {
		long articleDate = articleBean.getDate();
		int category = articleBean.getCategory();
		TableArticleDAO tableArticleDAO = new TableArticleDAO();
		
		return tableArticleDAO.getPreArticleInfo(articleDate, category);
	}
	
	
	
	/**
	 * 获取后一篇文章的信息
	 * */
	@RequestMapping(
		value="/GetPostArticleInfoOp",
		method=RequestMethod.POST,
		produces={"application/xml", "application/json"}
	)
	@ResponseBody
	public List getPostArticleInfo(@RequestBody ArticleBean articleBean) {
		long articleDate = articleBean.getDate();
		int category = articleBean.getCategory();
		TableArticleDAO tableArticleDAO = new TableArticleDAO();
		
		return tableArticleDAO.getPostArticleInfo(articleDate, category);
	}
	
	
	
	/**
	 * 上传新文章
	 * */
	@RequestMapping(
		value="/SubmitNewArticleOp",
		method=RequestMethod.POST,
		produces={"application/xml", "application/json"}
	)
	@ResponseBody
	public SubmitResultBean submitNewArticle(@RequestBody ArticleBean articleBean) {
		String title = articleBean.getTitle();
		int category = articleBean.getCategory();
		String abstractTxt = articleBean.getAbstractTxt();
		String url = "";
		String content = articleBean.getContent();
		String labels = articleBean.getLabelList();
		
		TableArticleDAO tableArticleDAO = new TableArticleDAO();
		SubmitResultBean submitResultBean = new SubmitResultBean();

		if(1 == tableArticleDAO.insertNewArticle(title, category, abstractTxt, url, content, labels)){
			submitResultBean.setStatus(0);
			submitResultBean.setMsg("提交成功！");
		}else{
			submitResultBean.setStatus(1);
			submitResultBean.setMsg("提交失败！");
		}
		return submitResultBean;
	}
	
	
	
	/**
	 * 编辑文章
	 * */
	@RequestMapping(
		value="/EditArticleOp",
		method=RequestMethod.POST,
		produces={"application/xml", "application/json"}
	)
	@ResponseBody
	public SubmitResultBean editArticle(@RequestBody ArticleBean articleBean) {
		int id = articleBean.getId();
		String title = articleBean.getTitle();
		int category = articleBean.getCategory();
		String abstractTxt = articleBean.getAbstractTxt();
		String content = articleBean.getContent();
		String labels = articleBean.getLabelList();
		
		TableArticleDAO tableArticleDAO = new TableArticleDAO();
		SubmitResultBean submitResultBean = new SubmitResultBean();

		if(1 == tableArticleDAO.editArticle(id, title, category, abstractTxt, content, labels)){
			submitResultBean.setStatus(0);
			submitResultBean.setMsg("提交成功！");
		}else{
			submitResultBean.setStatus(1);
			submitResultBean.setMsg("提交失败！");
		}
		return submitResultBean;
	}
	
	
	
	/**
	 * 删除文章
	 * */
	@RequestMapping(
		value="/DeleteArticleOp",
		method=RequestMethod.POST,
		produces={"application/xml", "application/json"}
	)
	@ResponseBody
	public SubmitResultBean deleteArticle(@RequestBody DeleteArticleBean deleteArticleBean) {
		int deleteCount = 0;
		String idList = deleteArticleBean.getIdList();

		TableArticleDAO tableArticleDAO = new TableArticleDAO();
		SubmitResultBean submitResultBean = new SubmitResultBean();

		if(idList.split(",").length == (deleteCount = tableArticleDAO.deleteArticle(idList))){
			submitResultBean.setStatus(0);
			submitResultBean.setMsg("删除成功！");
		}else{
			submitResultBean.setStatus(1);
			submitResultBean.setMsg("删除失败！删除行数："+deleteCount);
		}
		return submitResultBean;
	}
}
