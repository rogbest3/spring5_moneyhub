package com.moneyhub.web.brd;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.moneyhub.web.aop.TxService;
import com.moneyhub.web.cli.Client;
import com.moneyhub.web.cli.ClientCtrl;
import com.moneyhub.web.cmm.IConsumer;
import com.moneyhub.web.cmm.IFunction;
import com.moneyhub.web.cmm.ISupplier;
import com.moneyhub.web.utl.Printer;

import lombok.extern.log4j.Log4j;

@RestController
@RequestMapping("/articles")	// 노출되기 때문에 약자 사용X
@Log4j
public class ArticleCtrl {
	private static final Logger logger = LoggerFactory.getLogger(ArticleCtrl.class);
	@Autowired Map<String, Object> articleMap;
	@Autowired Client client;
	@Autowired Printer printer;
	@Autowired ArticleMapper articleMapper;
	@Autowired List<Article> list;
	@Autowired TxService txService;
	
	@PostMapping("/")
	public Map<?, ?> write(@RequestBody Article param){
		printer.accept("write 들어옴");
		param.setBoardType("게시판");
		
		IConsumer<Article> c = t -> articleMapper.insertArticle(param);
		c.accept(param);
		articleMap.clear();
		articleMap.put("msg", "SUCCESS");
		
/*		ISupplier<String> cc =  () -> articleMapper.countArticle();
		printer.accept("count : " + cc.get());
		map.put("count", cc.get());*/
		return articleMap;
	}
	@GetMapping("/")
	public List<Article> list(){
		printer.accept("list 들어옴");
		list.clear();
		ISupplier <List<Article>> c = () -> articleMapper.selectAll();
		printer.accept("전체 글목록 : " + c.get());
		return c.get();
	}
/*	@GetMapping("/")
	public int articleCount() {	// json으로 넘어가기 때문에 int 안넘겨도 됨 js에서 받을 때 무조건 string 이기 때문에
		printer.accept("articleCount 들어옴");
		ISupplier<Integer> c =  () -> articleMapper.articleCount();
		int seqCount = c.get();
		return seqCount;
	}*/
	

	
	@GetMapping("/count")
	public Map<?, ?> count(){
		printer.accept("count 들어옴");
		ISupplier<String> c =  () -> articleMapper.countArticle();
		articleMap.clear();
		articleMap.put("count", c.get());
		printer.accept("count : " + c.get());
		return articleMap;
	}

	@PutMapping("/{artSeq}")
	public Map<?, ?> update(@PathVariable String artSeq, @RequestBody Article param) {
		printer.accept("update 들어옴");
		param.setArtSeq(artSeq);
//		param.setBoardType("게시판");
		IConsumer<Article> u =  t -> articleMapper.updateArticle(param);
		u.accept(param);
		printer.accept("update 나감 - "+param.toString());
		articleMap.clear();
		articleMap.put("title", "title");
		return articleMap;
	}
	
	@DeleteMapping("/{artSeq}")
	public Map<?, ?> delete(@PathVariable String artSeq) {
		printer.accept("delete로 들어옴");
		IConsumer<String> d = t -> articleMapper.deleteArticle(artSeq);
		d.accept(artSeq);
		articleMap.clear();
		return articleMap;
	}
}
