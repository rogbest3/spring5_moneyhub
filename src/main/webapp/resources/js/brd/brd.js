"use strict"
var brd = brd || {}
brd =(()=>{
	const WHEN_ERR = '호출하는 js 파일을 찾지 못했습니다.'
	let _, js, brd_vue_js, cid
	let init =()=>{
		_ = $.ctx()
		js = $.js()
		brd_vue_js = js + '/vue/brd_vue.js'
		cid = $.cid()
	}
	let onCreate =()=>{	// action은 전부 onCreate에서 
		init()
		$.getScript(brd_vue_js, ()=>{})
		setContentView()
			$('<a>', {
				href : '#',
				click : e=>{
					e.preventDefault()
					write()
				},
				text : '글쓰기'
			})
	//		.addclass('nav-link')
			.appendTo('#go_write')
	}
	let setContentView =()=>{
		$('head')
		.html(brd_vue.brd_head())
		$('body')
		.html( brd_vue.brd_body())
	//	.addclass('bg-light')
		$('#recent_updates .media').remove()
		$('#recent_updates .d-block').remove()
		$('#recent_updates').append('<h1>등록된 글이 없습니다.</h1>')
	}

	let write =()=>{
		alert('글쓰기로 이동')
		$('#recent_updates').html(brd_vue.brd_write( cid ))
		$('#suggerstions').remove()
	}
	return {onCreate}
})();