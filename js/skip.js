//跳转页面


$(function(){
	setSkip();
//	$(window).resize(function(){
//		setSkip();
//	})
	function setSkip(){
		//获取当前屏幕宽度
		var width=$(window).width();
		var height=$(window).height();
		//获取URL
		var test = window.location.href;
		var arr=test.split("/")
		var html=arr[arr.length-1];
		var num=width/height;
		
		if(width>=768&&html!='pclive.html'){
			location.href='pclive.html';
		}else if(width<=768&&html!='home.html'){
			location.href='home.html';
		}
		
	}
})
