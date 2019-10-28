package com.moneyhub.web.brd;

import java.util.HashMap;
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
import org.springframework.web.bind.annotation.RestController;

import com.moneyhub.web.cli.Client;
import com.moneyhub.web.cli.ClientCtrl;
import com.moneyhub.web.cmm.IConsumer;
import com.moneyhub.web.utl.Printer;

import lombok.extern.log4j.Log4j;

@RestController
@RequestMapping("/articles")	// 노출되기 때문에 약자 사용X
@Log4j
public class ArticleCtrl {
	private static final Logger logger = LoggerFactory.getLogger(ArticleCtrl.class);
	@Autowired Map<String, Object> map;
	@Autowired Client client;
	@Autowired Printer printer;
	@Autowired ArticleMapper articleMapper;
	
	
	@PostMapping("/")
	public Map<?, ?> write(@RequestBody Article param){
		printer.accept("write 들어옴");
		param.setBoardType("게시판");
		
		IConsumer<Article> c = t -> articleMapper.insertArticle(param);
		c.accept(param);
		map.clear();
		map.put("msg", "SUCCESS");
		return map;
	}
	
	@GetMapping("/{artSeq}")
	public Article read(@PathVariable String artSeq, @RequestBody Article param) {
		return null;
	}
	
	@PutMapping("/{artSeq}")
	public Article update(@PathVariable String artSeq, @RequestBody Article param) {
		return null;
	}
	
	@DeleteMapping("/{artSeq}")
	public Map<?, ?> delete(@PathVariable String artSeq, @RequestBody Article param) {
		return map;
	}
}
