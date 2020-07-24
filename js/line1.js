//网络时间
var startTime=new Date(liveStartTime).getTime()-1000*5*60;
var endTime=new Date(liveEndTime).getTime();
var now=new Date().getTime();
var source,isLive = true;
//判断播放时间
if (now<startTime) {
	//直播开始前
	//console.log("直播开始前");
	$("#J_prismPlayer").hide();
	source = sourceLive;
	countDown(liveStartTime,".time");
	var interval =	setInterval(function(){
		countDown(liveStartTime);
	}, 1000);
	
} else if(now>=startTime&&now<endTime){
	//直播进行中
	//console.log("直播进行中");
	$("#J_prismPlayer").show();
	$(".timeBox").hide();
	source = sourceLive;
	
} else if(now>=endTime){
	//直播结束
	//console.log("直播结束");
	$("#J_prismPlayer").show();
	$(".timeBox").hide();
	source = sourceCdn;
	isLive = false;
}
var width=$('body').width()*.45;
var height=width*1080/1920;
$("#J_prismPlayer").css({
	width:width+'px',
	height:height+'px'
})
var player=null;
//直播开始前
player = new Aliplayer({
	"id": 'J_prismPlayer',
	"width": width+'px',
	"height":height+'px',
	"autoplay": true,
	"isLive": isLive,
	"liveRetry":'2',
	"rePlay": false,
	"playsinline": true,
	"preload": true,
	"controlBarVisibility": "hover",
	"useH5Prism": true,
	"cover": 'img/bg5.png',
	"source" :source
	},function(player){
		//兼容IE11
		setTimeout(function(){
			player.setSpeed(.5)
		},1000)
		setTimeout(function(){
			player.setSpeed(1)
		},1100)
	}
);

player.on('error',function(){
	$(".prism-ErrorMessage").html("网络问题或者直播已结束").css({
		"text-align":"center",
		"color":"#fff",
		"line-height":"50px",
		"font-size":"30px"
	});
})
player.on('requestFullScreen',function(){
	console.log("全屏")
})
player.on('cancelFullScreen',function(){
	console.log("取消全屏")
})
//倒计时
function addZero(i) {
  	return i < 10 ? "0" + i: i + "";
}
function countDown(time) {
    var dqtime = new Date();
    var endtime = new Date(time);
    var lefttime = parseInt((endtime.getTime() - dqtime.getTime()) / 1000);
    var d = parseInt(lefttime / (24*60*60))
    var h = parseInt(lefttime / (60 * 60) % 24);
    var m = parseInt(lefttime / 60 % 60);
    var s = parseInt(lefttime % 60);
    d = addZero(d);
    h = addZero(h);
    m = addZero(m);
    s = addZero(s);
    $(".time_hour b").html(toImg(h));
    $(".time_minute b").html(toImg(m));
    $(".time_second b").html(toImg(s));
//  $(dom).html("活动倒计时："+d+"天"+h+"时"+m+"分"+s+"秒");
    if (lefttime <= 300) {
    	$(".timeBox").hide();
    	location.reload()
    	clearInterval(interval);
    	
    }
}
function toImg(num){
	var arr=num.split("");
	var str="";
	for (var i=0;i<arr.length;i++) {
		str+='<img src="images/'+arr[i]+'.png">'
	}
	return str
}
