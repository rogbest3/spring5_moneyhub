"use strict"
var brd = brd || {}
brd =(()=>{
	const WHEN_ERR = '호출하는 js 파일을 찾지 못했습니다.'
	let _, js, css, img, brd_vue_js, navi_js, navi_vue_js
	let init =()=>{
		_ = $.ctx()
		js = $.js()
		css = $.css()
		img = $.img()
		brd_vue_js = js + '/vue/brd_vue.js'
		navi_js = js + '/cmm/navi.js'
		navi_vue_js = js + '/vue/navi_vue.js'
	}
	let onCreate =()=>{	// action은 전부 onCreate에서 
		init()
		$.when(
			$.getScript(brd_vue_js),
			$.getScript(navi_vue_js),
			$.getScript(navi_js)
		)
		.done(()=>{
			setContentView()
			navi.onCreate()
		})
		.fail(()=>{
			alert(WHEN_ERR)
		})
	}
	
	let setContentView =()=>{
		$('head')
		.html(brd_vue.brd_head())
		$('body')
		.html( brd_vue.brd_body())
		.addClass('bg-light')
		$(navi_vue.navi()).appendTo('#navi_id')
		
/*		$.ajax({
			url : _+'/articles/count',
			type : 'GET',
			contentType : 'application/json',
			success : d=>{
				alert('로그인 후 d.count : ' + d.count)
				recent_updates(d.count)
			},
			error : e=>{
				alert('AJAX 실패')
			}
		})*/
		recent_updates(_)
	}
	
	let recent_updates=(x)=>{
		$('#recent_updates .media').remove()
		$('#recent_updates .d-block').remove()
		$('#suggerstions').remove()
		alert('recent_updates 들어옴, _ : ' + x)
		$.getJSON(x+'/articles/', d=>{	// success이기 때문에 d를 가져올수 있음
			//	alert('글 목록 숫자 : ' + d.count)
			//	$('#recent_updates').html(ui)			
			//	$('#recent_updates').append('<h1>등록된 글이 없습니다.</h1>')
			// i - key( index), j - value ( article	) json
	//		let i = 0
			let res = ''
			$.each(d, (i, j)=>{
				$('<div class="media text-muted pt-3">'+
		        '<img data-src="holder.js/32x32?theme=thumb&amp;bg=007bff&amp;fg=007bff&amp;size=1" alt="32x32" class="mr-2 rounded" style="width: 32px; height: 32px;" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16dfcdddb72%20text%20%7B%20fill%3A%23007bff%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A2pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16dfcdddb72%22%3E%3Crect%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22%23007bff%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2211.5390625%22%20y%3D%2216.9%22%3E32x32%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" data-holder-rendered="true">'+
				'          <p id="id_'+ i +'" class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">'+
				'          </p>'+
				'        </div>')
				.appendTo('#recent_updates')
				
				$('<strong class="d-block text-gray-dark">@<a>'+ j.cid +'</a></strong>') // .appendTo면 뒤로 붙음, 앞에붙이면 .prependTo()
				.appendTo("#id_"+i)
				.click(()=>{
					alert('아이디 클릭')
				})
				
				$('<a>'+ j.title +'</a>')
				.appendTo("#id_"+i)
				.click(()=>{
					alert('제목 출력')
					detail(j)
				})
			})
		})
	}
	
	let write =(x)=>{
		alert('write - _ : ' + x)
		$('#recent_updates').html(brd_vue.brd_write())// $cid ))
	//	$('#write').val('테스트')	// input에 값 직접 입력
		$('#suggerstions').remove()
		
		$('#write_form input[name="writer"]').val(getCookie("CLIENTID"))
		
		$('<input>', {
		//	type : 'submit',
			value : '취소',
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
			value : '전송',
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
			alert('ID : ' + json.cid + ', _ : ' + x)
/*			console.log('ID : ' + json.uid)			보이지 않음
			console.log('글 제목 : ' + json.title)
			console.log('글 내용 : ' + json.content )*/
			$.ajax({
				url : x + '/articles/',
				type : 'POST',
				data : JSON.stringify(json),
				dataType : 'json',
				contentType : 'application/json',
				success : d=>{
					alert('write AJAX 성공')
					$('#recent_updates div.container-fluid').remove()
					recent_updates(x)
				},
				error : e=>{
					alert('AJAX 실패')
				}
			}) 
		})
	}
	

	let detail =x=>{
		$('#recent_updates').html(brd_vue.brd_write( getCookie("CLIENTID") ))
		$('#suggerstions').remove()		
		$('#write_form input[name="writer"]').val(getCookie("CLIENTID"))
		$('#recent_updates div.container-fluid h1').html('ARTICLE DETAIL')
//		$('#recent_updates div.container-fluid').html('<h1>ARTICLE DETAIL</h1>') - 하면 id, title, content 칸 모두 없어짐
		$('#write_form input[name="writer"]').val(x.cid)
		$('#write_form input[name="title"]').val(x.title)
		$('#write_form textarea[name="content"]').val(x.content)
		
		$('<input>', {
		//	type : 'submit',
			value : '삭제',
			style : 'float:right;width:100px;margin-right:10px',			
		})
		.addClass('btn btn-danger')
		.appendTo('#write_form')
		.click(e=>{
			e.preventDefault()
			$.ajax({
				url : _+'/articles/'+ x.artSeq,
				type : 'DELETE',
		/*		data : JSON.stringify(x),
				dataType : 'json',*/
				contentType : 'application/json',
				success : d=>{
					$('#recent_updates .container-fluid').remove()
					recent_updates()
				},
				error : e=>{
					alert('ajax 실패')
				}
			})
		})
		
		$('<input>', {
		//	type :  'submit',
			value : '수정',
			style : 'float:right;width:100px;margin-right:10px',
		})
		.addClass('btn btn-primary')
		.appendTo('#write_form')
		.click(e=>{
			e.preventDefault()
			let json = {
					cid : $('#write_form input[name="writer"]').val(), 
					title : $('#write_form input[name="title"]').val(),
					content : $('#write_form textarea[name="content"]').val()
			}
			alert(json.cid + json.title +json.content)
			$.ajax({

				url : _+'/articles/'+ x.artSeq,
				type : 'PUT',
				data : JSON.stringify(json),
				dataType : 'json',
				contentType : 'application/json',
				success : d=>{
					alert('ajax 성공 : ' + d.title)
					$('#recent_updates .container-fluid').remove()
					recent_updates()
				},
				error : (request,status, error )=>{

					alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error)

					$('#recent_updates .container-fluid').remove()
					recent_updates()
				}
			})
		})
	}
	return {onCreate, write}	// navi에서 brd.write()에서 불러오기 위해 return에 write 사용
})();











