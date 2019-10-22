"use strict"
var app = app || {};
app = (()=>{
	const WHEN_ERR = '호출하는 JS 파일을 찾지 못했습니다.';
    let _, js, authjs;            
    let run =x=> $.getScript(x + '/resources/js/cmm/router.js',()=>{
    		$.extend(new Session(x));
    	//	alert('컨텍스트 : ' + $.ctx());
    		onCreate();
    })
    let init =()=>{
    	_ = $.ctx();
    	js = $.js();
    	authjs = js + '/cmm/auth.js';
    //	alert('authjs 컨텍스트 값 : ' + authjs);
    }
    let onCreate =()=>{
    	init()
    					// when() - ~할때 성공하면 done(), 실패하면 fail() 실행
    	$.when(
    		$.getScript(authjs)	//	authjs 뒤에 , 후 기능 없으면 불러오기만 함
    	)	
    	.done(()=>{	//	콜백함수
    		auth.onCreate()
    	})
    	.fail(()=>{
    		alert(WHEN_ERR)
    	})	
    	
    }
	return {run}
})();

var hr = (()=>{
	var empno, _ename, _deptno, _dname,	_loc, _job,
	_mgr, _hiredate, _sal, _comm;
	var setEmpno = (empno)=>{this.empno = empno;}
	var setEname = (ename)=>{this.ename = ename;}
	var getEmpno = ()=>{return this._empno;}
	var getEname = ()=>{return this._ename;}
	return {
		setEmpno : setEmpno,
		setEname : setEname,
		getEmpno : getEmpno,
		getEname : getEname
	};
})();

var HrService = (()=>{
	return {
		login: (ctx)=>{
			$('#login_btn').click(()=>{
				if($('#username').val()==='' ||
						$('#ename').val()==='' ||
						$('#dname').val()===''){
					alert('필수값이 없습니다.')
				}else{
					$('#login_form').attr('action', ctx+'/hr.do');
					$('#login_form').attr('method','POST');
					$('#login_form').submit();
				}
			});
		},
		join: (ctx)=>{
			$('#member_btn').click(()=>{
				if($('#join_id').val()==='' ||
						$('#join_pw').val()===''){
					alert('필수값이 없습니다.')
				}else{
					$('#join_form').attr('action', ctx+'/hr.do');
					$('#join_form').attr('method','POST');
					$('#join_form').submit();
				}
			});
		},
		moveJoin: (ctx)=>{
			$('#join_btn').click(()=>{
				location.assign(ctx+'/hr.do?action=move&page=join');
			});
			$('#back').click(()=>{
				location.assign(ctx+'/facade.do?action=move&page=login');
			});
		}
	};
})();

