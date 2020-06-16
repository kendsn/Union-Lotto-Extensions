//澳門十分六合彩


// ------------------------------
// 		score one time requests		|
// ------------------------------
window.addEventListener("load", function() {
	setTimeout(parse, 1000);
}, true);

function parse() {
	var dt=new Date();	// *抓現在的Date*
	var ret={};
	ret.error="";
	ret.loc="macau.mark6";
	ret.locname="澳門十分六合彩";
	ret.lottoid=37; 								
	ret.locurl="https://macaujc.com/pc/#/post/2031";
	ret.locwebname="澳門六合彩";
	ret.loctype=2;
	ret.date=sprintf("%04d%02d%02d",dt.getFullYear(),dt.getMonth()+1,dt.getDate()); 
	ret.data={};  

	// get JSON 資料
	$.getJSON( "http://api.bjjfnet.com/data/opencode/2031", function( vdata ) {
	console.log(vdata)
	  /*------------------------------------|
	  "issue": "20200616086",
	  "openCode": "19,16,06,49,21,07,11",
	  "openTime": "2020-03-10 21:34:30"
	  (vdata.data[0].issue)
	  |------------------------------------*/
	  var tt = vdata.data
	  for (var i=0;i<tt.length;i++) {
		var issue = tt[i].issue;
		//期別
		ret.data[issue]={};
		//號碼
		ret.data[issue].Number=tt[i].openCode.substr(0,17);
		//SP號碼
		ret.data[issue].Number2=tt[i].openCode.substr(18,2);
		//開獎時間
		ret.data[issue].Time=tt[i].openTime;
		//現在的時間
		ret.data[issue].GetTime=sprintf("%04d-%02d-%02d %02d:%02d:%02d",dt.getFullYear(),dt.getMonth()+1,dt.getDate(),dt.getHours(),dt.getMinutes(),dt.getSeconds());
	  }
	  
	  // 將 ret 資料送給 background.js
	  chrome.extension.sendMessage(ret); //undefined  
	  
	});	
	
	console.log("Ret>>")
	console.log(ret);
	setTimeout(function() {location.reload();}, 100000);
}

function alert(msg) {}