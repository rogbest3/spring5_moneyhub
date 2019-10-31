"use strict"
var adm = adm || {}
adm =(()=>{
	const WHEN_ERR = '호출하는 js 파일을 찾지 못했습니다.'
	let _, js, css, img, navi_vue_js, navi_js
	let init=()=>{
		sessionStorage.setItem('ctx', '/web')
		ctx : ()=>{ return sessionStorage.getItem('ctx')}
		_ = $.ctx()
		js = $.js()
		css = $.css()
		img = $.img()
		navi_vue_js = js + '/vue/navi_vue.js'
		navi_js = js + '/cmm/navi.js'
	}
	
	let onCreate=()=>{
		init()
//		alert('js : '+ js)
		$.when(
			$.getScript(navi_vue_js),
			$.getScript(navi_js)
		)
		.done(()=>{
			setContentView()
		})
		.fail(()=>{
			alert(WHEN_ERR)
		})
	}
	
	let setContentView=()=>{
	//	$('#login_form_id').remove()
		$('body').empty()
		$(navi_vue.navi()).appendTo('body')
		$('#nav_scroller_id').remove()
		navi.onCreate()
		
		$('<table id="tab">'+
		'  <tr>'+
		'  </tr>'+
		'</table>')  // key값 무조건 string이기 때문에 '' 생량가능 value는 생략 불가, json이기때문에 , 로 속성 추가							
		.css({ width : '80%', height : '80%', border :'2px solid black', margin: '0 auto' }) 
		.appendTo('body')	// body에 오버로딩
		

		$.each(
			[{ id : 'left', width : '20%'}, 
			{ id : 'right', width : '80%'}], 
			(i, j)=>{
			$('<td id="'+ j.id +'"></td>')
			.css({border: '2px solid black', width: j.width, 'vertical-align': 'top'})
			.appendTo('#tab tr')
		})

		$.each([	// name을 주고 구분
			{txt : '웹크롤링', name : 'web_crawl'},
			{txt : '고객관리', name : 'cust_mgmt'}, 
			{txt : '상품등록', name : 'item_reg'}, 
			{txt : '상품조회', name : 'item_srch'}, 
			{txt : '상품수정', name : 'item_mod'}, 
			{txt : '상품삭제', name : 'item_del'}], 
			(i, j)=>{
				$('<div name="'+ j.name +'">'+ j.txt +'</div>')
				.appendTo('#left')
				.click(function(){
			//		let that = $(this).attr('name')
					$(this).addClass('active')
					$(this).siblings().removeClass('active')
					switch($(this).attr('name')){
					case 'web_crawl' :
							webCrawl()						
						break
					case 'cust_mgmt' : 
				
						break
					case 'item_reg' :
						
						break
					case 'item_srch' :
						
						break
					case 'item_mod' :
						
						break	
					case 'item_del' :
						
						break		
					}
			})
		})
		$('#left div').css({border: '2px solid black', margin: 'auto 0', 'line-height': '50px'})
	}
	let webCrawl =()=>{
		$('<form id="s_form_id" action="">'+
			'  <select name="news" size="4" multiple>'+
			'  </select>'+
			'  <br>'+
			'  <button id="news_btn">이동</button>'+
			'</form>')
		.appendTo('#right')
		
		$.each(['정치', '경제', '사회', '과학'], (i, j)=>{
			$('<option value="">'+ j +'</option>')
			.appendTo('#s_form_id select')
		})
		
		$('#news_btn')
		.click(()=>{
			$().appendTo('#right')
		})
		
	}
	
	return {onCreate}
})()