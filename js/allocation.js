//直播开始时间
var liveStartTime = '2020/7/23 13:55:00';
//直播结束时间
var liveEndTime =  '2020/7/23 18:30:00';
//点播开始时间
var liveVocTime = '2020/7/23 18:30:00';
//直播地址
var sourceLive= '{"HD":"http://live.i.bucg.com/bucg/whz4_ud.m3u8?auth_key=1596354155-0-0-c659699cf2222660368942fd67469294","SD":"http://live.i.bucg.com/bucg/whz4_sd.m3u8?auth_key=1596270820-0-0-03b4754dedee3ae410bc5a308dc5f202"}'
//点播地址
var sourceCdn="http://cdn.i.bucg.com/e/act/whz/whz4.mp4";

//计算视频宽高
var width = $("#J_prismPlayer").width();
$("#J_prismPlayer").css("height", width * 1080 / 1920 + 'px');
console.log(width)

//获取网络时间
function getNowFormatDate() {
    var currentdate = new Date().getTime();
    // $.ajax({
    //     type: 'GET',
    //     dataType: 'json',
    //     async: false,
    //     url: 'http://quan.suning.com/getSysTime.do',
    //     success: function (data) {
    //         var data = data.sysTime2;
    //         currentdate = data.slice(0, 16);
    //         currentdate = currentdate.split('-').join("/");
    //     }
    // })
    return currentdate
}