"use strict"
var brd = brd || {}
brd =(()=>{
	const WHEN_ERR = '호출하는 js 파일을 찾지 못했습니다.'
	let _, js, brd_vue_js, $cid
	let init =()=>{
		_ = $.ctx()
		js = $.js()
		brd_vue_js = js + '/vue/brd_vue.js'
		$cid = $.cid()

	}
	let onCreate =()=>{	// action은 전부 onCreate에서 
		init()
		$.getScript(brd_vue_js, ()=>{
			setContentView()
			navigation()
		})
		
	}
	let setContentView =()=>{
		$('head')
		.html(brd_vue.brd_head())
		$('body')
		.html( brd_vue.brd_body())
		.addClass('bg-light')
		$('#recent_updates .media').remove()
		$('#recent_updates .d-block').remove()
		$('#recent_updates').append('<h1>등록된 글이 없습니다.</h1>')
		
	}

	let write =()=>{
		$('#recent_updates').html(brd_vue.brd_write( $cid ))
	//	$('#write').val('테스트')	// input에 값 직접 입력
		$('#suggerstions').remove()
		
		$('#write_form input[name="writer"]').val($cid)
		
		$('<input>', {
		//	type : 'submit',
			value : 'CANCEL',
			style : 'float:right;width:100px;margin-right:10px',			
		})
		.addClass('btn btn-danger')
//		.css({'float': 'right', 'width': '100px', 'margin-right': '10px' })
		.appendTo('#write_form')
		.click(e=>{
			e.preventDefault()
			
			
		})
		
		$('<input>', {
		//	type :  'submit',
			value : 'SUBMIT',
			style : 'float:right;width:100px;margin-right:10px',
		})
		.addClass('btn btn-primary')
	//	.css({'float': 'right', 'width': '100px', 'margin-right': '10px' })
		.appendTo('#write_form')
		.click(e=>{
			e.preventDefault()

			let json = {
					cid : $('#write_form input[name="writer"]').val(), 
					title : $('#write_form input[name="title"]').val(),
					content : $('#write_form textarea[name="content"]').val()
			}
			alert('ID : ' + json.cid)
/*			console.log('ID : ' + json.uid)			보이지 않음
			console.log('글 제목 : ' + json.title)
			console.log('글 내용 : ' + json.content )*/
			$.ajax({
				url : _+'/articles/',
				type : 'POST',
				data : JSON.stringify(json),
				dataType : 'json',
				contentType : 'application/json',
				success : d=>{
					$('#recent_updates').html('<h1>목록 불러오기</h1>')				
				},
				error : e=>{
					alert('AJAX 실패')
				}
			}) 
		})
		
	}
	let navigation =()=>{
		$('<a>', {
			href : '#',
			click : e=>{
				e.preventDefault()
				write()
			},
			text : '글쓰기'
		})
		.addClass('nav-link')
		.appendTo('#go_write')
		
	}
	
	return {onCreate}
})();











