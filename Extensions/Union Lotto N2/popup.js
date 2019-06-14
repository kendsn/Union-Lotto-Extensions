// (The Tab onFocus)
var curtab;
var newtime;			// 現在時間
var port;

chrome.tabs.getSelected(null, function(tab) {
	curtab=tab;
});


// =======================
// for long-lived connections	|
// =======================
document.addEventListener('DOMContentLoaded', function () {

	// set the channel on Background.js (uport.postMessage(ret))
	//
	port = chrome.runtime.connect({name: "unionchannel"});

	port.onMessage.addListener(function(ret) {  //conncet port & show new score infomation
		console.log(ret);	//每筆資料
		if ($("#_"+ret.loc).length==0) {		
			$("#_oppanel").append("<div style='color:white; background:#03161C;'><span>&nbsp;&nbsp;&nbsp;</span><span style='font-size:15px;' id=_"+ret.loc+"lotto"+">GameName</span></div>");
			$("#_oppanel").append("<div style='background:#DADADA' id=_"+ret.loc+"></div>");
			$("#_oppanel").append("<div style='background:#FFFFFF'>&nbsp;</div>");
		}
		$("#_cq2_2lotto").html("重慶時時彩"); 
		$("#_bjcar3_2lotto").html("北京賽車PK");
		$("#_bjkl8_2lotto").html("北京快樂八");
		$("#_xyn_2clotto").html("幸運農場");
		$("#_jsk3_2lotto").html("江蘇快三");
		$("#_gd10_2lotto").html("廣東快樂十分");
		$("#_tj10_2lotto").html("天津快樂十分");
		
		// *score 開獎*
		for (var issue in ret.data){
			if (ret.data[issue]=="" || ret.data[issue].Number=="" ) {
				var html="<table><tr><td>&nbsp;</td><td width='72' style='font-family:arial;color:blue;font-size:14px;'>"+issue+"</td><td>&nbsp;</td><td style='font-family:arial;color:red;font-size:18px;'>"+"開獎中.."+"</td></tr></table>";
				$("#_"+ret.loc).html(html); 
			}else {		
				var html="<table><tr><td>&nbsp;</td><td width='72' style='font-family:arial;color:blue;font-size:14px;'>"+issue+"</td><td>&nbsp;</td><td style='font-family:arial;color:red;font-size:18px;'>"+ret.data[issue].Number+"</td></tr></table>";
				$("#_"+ret.loc).html(html); 
			}
		}
	});	

});


window.addEventListener("unload",function() {
	port.postMessage({error:"",event:"oplogout"});
});


































