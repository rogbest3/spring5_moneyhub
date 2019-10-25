"use strict"
var auth = auth || {};
auth =(()=>{
	const WHEN_ERR = '호출하는 JS 파일을 찾지 못했습니다.';
	let _, js, auth_vue_js, brd_js, brd_vue_js, router_js;
	let init =()=>{
		_ = $.ctx()
		js = $.js()
		auth_vue_js = js + '/vue/auth_vue.js'
		brd_js = js + '/brd/brd.js'
		router_js = js + '/cmm/router.js'
	}
	let onCreate =()=>{
		init()
		$.when(
    		$.getScript(auth_vue_js),	//	authjs 뒤에 , 후 기능 없으면 불러오기만 함
    		$.getScript(brd_js)
    	)	
    	.done(()=>{
			setContentView()
			$('#login_img_btn').click(e=>{
				e.preventDefault()
				loginPage()
				login()
		    		   
			})	
		}).fail(()=>{alert(WHEN_ERR)})
	}
	let setContentView =()=>{	// 첫화면
		main()
	}
	let main =()=>{
		let x = { css:$.css(), img:$.img() }
		$('body').html( auth_vue.main_form(x) ) 
		$('<img>', {
			click : e=>{
				e.preventDefault();	
				alert('로그인 클릭');
			}
		})
		.addClass('login_img')
    	.appendTo('#login_img_btn')	
	}

	let loginPage =()=>{
		$('head')
		.html( auth_vue.login_head({ css:$.css(), img:$.img() }) )
		$('body')
		.addClass('text-center')
		.html( auth_vue.login_body({ css:$.css(), img:$.img() }) )
	}
	let login =()=>{
		//<button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
		$('<button>', {
		//	type : 'submit',
			text : '로그인',
			click : e=>{
				e.preventDefault()
				$.ajax({
					url : _+'/clients/' + $('#cid').val() + '/login',
					type : 'POST',
					dataType : 'json',
					data : JSON.stringify({ 
						cid : $('#cid').val(), 
						pwd : $('#pwd').val()
					}),
					contentType : 'application/json',
					success : d =>{
						alert(d.hubAccount + '님 환영합니다.')
						
							$.getScript(router_js, ()=>{
								$.extend(new User(d.cid)) })
							.done(()=>{
	
							brd.onCreate()
						}).fail(()=>{alert(WHEN_ERR)})
						
					},
					error : e=>{
						alert('AJAX 실패')
					}
				})
			}
		})
		.addClass('btn btn-lg btn-primary btn-block')
		.appendTo('#btn_login')
		
		$('#a_go_join').click(e=>{
			e.preventDefault()
			$('head').html( auth_vue.join_head() )
			$('body').html( auth_vue.join_body() ) 
			$('#cid').keyup(()=>{
				if($('#cid').val().length > 2){
					$.ajax({
						url : _+'/clients/'+$('#cid').val()+'/exist',
						contentType : 'application/json',
						success : d => {
							if(d.msg === 'Success'){	// 중복 X
								$('#dupl_check')
								.val('사용가능한 ID 입니다')	// input 안에라 text가 아니라 val, text는 빈곳 
								.css('color','blue')
							}		
							else{
								$('#dupl_check')
								.val('이미 사용한 ID 입니다')
								.css('color','red')
							}
						}, 
						error : e =>{
							alert('existId AJAX 실패')
						}
					})
				}	
			})
			$('<button>', {
				text : '회원가입',	//	값을 주면 세터가 됨.
				href : '#',
//					type : 'submit',
				click : e=>{
					e.preventDefault();	//	form tag 무력화시킴 form은 SOAP방식이기 때문에 AJAX 안먹힘
					join()	
				}
			})
			.addClass('btn btn-primary btn-lg btn-block')
	    	.appendTo('#join_btn')	
		})
	}
	let mypage =()=>{
		let x = { css:$.css(), img:$.img() }
		$('body').html( auth_vue.mypage_form(x) ) 
		
	}
	let join =()=>{
		$.ajax({
			url : _+'/clients/',
			type : 'POST',
			dataType : 'json',
			data : JSON.stringify({ 
				cid : $('#cid').val(), 
				pwd : $('#pwd').val(),
				hubAccount : $('#hubAccount').val(),
				reg : $('#reg').val()
				}),
			contentType : 'application/json',
			success : d => {	// sender, d가 자바에서 map, d.cid map의 키값
				alert('AJAX 성공 아이디 : '+ d.msg);
				if(d.msg === 'Success'){
					loginPage()
					login()
				}else{
					alert('회원가입 실패')
				}
				
			},	
			error : e => {		// receiver, 
				alert('join AJAX 실패');
			}		
		})
	}


	
	return{onCreate : onCreate, main, join, login }	// app에서 auth.onCreate() 호출했기 때문에 return에 onCreate 사용
})();

























