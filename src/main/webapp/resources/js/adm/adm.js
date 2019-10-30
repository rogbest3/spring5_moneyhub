"use strict"
var adm = adm || {}
adm =(()=>{
	let _, js, css, img, app_js
	let init=()=>{
		_ = $.ctx()
		js = $.js()
		css = $.css()
		img = $.img()
		app_js = js + 'app.js'
	}
	let onCreate=()=>{
		alert('adm onCreate - _ : ' + _)
		alert('adm onCreate - app_js : ' + app_js)
		init()
		
		$.getScript( app_js, ()=>{
			alert('adm getScript - app_js : ' + app_js)
			setContentView()
		})
		
	}
	let setContentView=()=>{
		alert('adm - app_js : ' + app_js)
		app.run(_)
	}
	return {onCreate}
})()