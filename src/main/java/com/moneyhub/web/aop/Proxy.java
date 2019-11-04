package com.moneyhub.web.aop;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import com.moneyhub.web.utl.Printer;

import lombok.Data;

@Lazy
@Data
@Component
public class Proxy {
	private int pageNum;
	private String search;
	@Autowired Printer p;
//	@Autowired List<String> proxyList;
	
	public List<?> crawl(Map<?, ?> paramMap){	//	정형화되지 않은 data값 반환
		List<String> proxyList = new ArrayList<>();
		String url = "http://" + paramMap.get("site") + "/";
		proxyList.clear();
		try {
			Connection.Response response = Jsoup.connect(url)
												.method(Connection.Method.GET)
												.execute();
			Document document = response.parse();
			String text = document.html();
		//	String text = document.text();
		//	System.out.println(html);
			p.accept("크롤링한 텍스트 \n" + text);
			proxyList.add(text);
			
		} catch (Exception e2) {
			e2.printStackTrace();
		}		
		return proxyList;
	}

}
