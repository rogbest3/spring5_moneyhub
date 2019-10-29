package com.moneyhub.web.brd;

import java.util.List;

import org.springframework.stereotype.Repository;

@Repository
public interface ArticleMapper {
	public void insertArticle(Article param);
	public int articleCount();
	public String countArticle();
	public List<Article> selectAll();
	public void deleteArticle(String artSeq);
	public void updateArticle(Article param);

}
