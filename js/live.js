//网络时间
// var nowTime = getNowFormatDate();
// setInterval(function () {
// 	nowTime = new Date(nowTime).getTime() + 1000;
// }, 1000);
var startTime=new Date(liveStartTime).getTime()-1000*5*60;
var endTime=new Date(liveEndTime).getTime();
var now=new Date().getTime();
var source,isLive = true;
//判断播放时间
if (now < startTime) {
	//直播开始前
	$("#J_prismPlayer").hide();
	// sharpness
	$(".sharpness").hide();
	// console.log("直播开始前");
	source = sourceLive;
	countDown(liveStartTime,".time");
	var interval =	setInterval(function(){
		countDown(liveStartTime);
	}, 1000);
	// location.href = 'home.html'


} else if (now >= startTime && now < endTime) {
	//直播进行中
	// console.log("直播进行中");
	$("#J_prismPlayer").show();
	$(".sharpness").show();
	// wzb = true;
	$(".timeBox").hide();
	// LD,SD
	// $('.LD').on('click',function(){
	// 	console.log('123')
	// })
	source = sourceLive;

} else if (now >= endTime) {
	//直播结束
	// console.log("直播结束");
	$("#J_prismPlayer").show();
	$(".sharpness").show();
	$(".timeBox").hide();
	source = sourceCdn;
	isLive = false;
}

var player = null;
//直播开始前
player = new Aliplayer({
	"id": 'J_prismPlayer',
	// "width": width + 'px',
	"height":width * 1080 / 1920 + 'px',
	"autoplay": true,
	"isLive": isLive,
	"liveRetry": '2',
	"rePlay": false,
	"playsinline": true,
	"preload": true,
	"controlBarVisibility": "hover",
	"useH5Prism": true,
	"cover": 'img/whz.png',
	"source": source,
}, function (player) {
	//兼容IE11
	setTimeout(function () {
		player.setSpeed(.5)
	}, 1000)
	setTimeout(function () {
		player.setSpeed(1)
	}, 1100)
	// var now = new Date(nowTime).getTime();
	// var startTime = new Date(liveStartTime).getTime();
	// var endTime = new Date(liveEndTime).getTime();
	// if (wzb) {
	// 	player.seek((now - startTime) / 1000);
	// }

}
);
player.on('error', function () {
	// $(".prism-ErrorMessage").empty().css("background-image", "url(img/whz.png)").css(" background-repeat", "no-repeat").css('background-size', '100% 100%');
	$(".prism-ErrorMessage").html("网络问题或者直播已结束");
	location.href='player.html'
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
	  str+='<img src="img/'+arr[i]+'.png">'
  }
  return str
}
$(".SD").on("click",function () { 
	source = "http://live.i.bucg.com/bucg/whz4_sd.m3u8?auth_key=1596270820-0-0-03b4754dedee3ae410bc5a308dc5f202";
	console.log(source)
 })

$(".LD").on("click",function () { 
	source = "http://live.i.bucg.com/bucg/whz4_ld.m3u8?auth_key=1596270860-0-0-cb183e44aacf65ad4e74837a31c39b6a";
	console.log(source)
 })
