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
	
	@PostMapping("/")	//	create - 파라미터 없으면
	public Map<?,?> join(@RequestBody Client param) {	

		HashMap<String, Object> map = new HashMap<>();
	//	logger.info("AJAX가 보낸 정보 ", param.toString());
		printer.accept("람다 프린터가 출력한 값 " + param.toString());
		map.put("cid", param.getCid());
		map.put("pwd", param.getPwd());
//		clientServiceimpl.join(param);
//		logger.info("map에 담긴 아이디와 비번 {} ", map.get("cid") + ", " + map.get("pwd"));
		return map;
	}
	
	@PostMapping("/login")
	public Client login(@RequestBody Client param){
		logger.info("AJAX가 보낸 로그인 아이디와 비번 {} ", param.getCid() + ", " + param.getPwd());
		client.setCid(param.getCid());
		client.setPwd(param.getPwd());
	//	param = clientServiceimpl.login(param);
		logger.info("client에 담긴 사용자 정보 : {}", client.toString());
		return param;
	}
}
