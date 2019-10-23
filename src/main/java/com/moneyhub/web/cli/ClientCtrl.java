package com.moneyhub.web.cli;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.moneyhub.web.cmm.IConsumer;
import com.moneyhub.web.cmm.IFunction;
import com.moneyhub.web.utl.Printer;

import lombok.extern.log4j.Log4j;

@RestController
@RequestMapping("/clients")	// s 복수
@Log4j
public class ClientCtrl {
	private static final Logger logger = LoggerFactory.getLogger(ClientCtrl.class);
	@Autowired Map<String, Object> map;
	@Autowired Client client;
	@Autowired Printer printer;
	@Autowired ClientMapper clinetMapper;	// 클래식 자바에서는 바로 mapper 연결하면 안되지만 모던자바에선 사용
	
	@PostMapping("/")	//	create - 파라미터 없으면
	public String join(@RequestBody Client param) {	
		IConsumer<Client> c = t -> clinetMapper.insertClient(param);
		c.accept(param);
		return "Success";
	}
	
	@PostMapping("/")
	public Client login(@RequestBody Client param){
		IFunction<Client, Client> f = t -> clinetMapper.selectByIdPw(param);
		return f.apply(param);
	}	
}
