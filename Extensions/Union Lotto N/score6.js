//廣東快樂十分1


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
	ret.loc="gd10";
	ret.locname="廣東快樂十分1";
	ret.lottoid=12; 							
	ret.locurl="http://359.com/gdklsf/caipiao";
	ret.locwebname="359彩票";
	ret.loctype=2;
	ret.date=sprintf("%04d%02d%02d",dt.getFullYear(),dt.getMonth()+1,dt.getDate()); 
	ret.data={};

	// 處裡不要的資料
	var findtr = $("#history>tbody").find("tr").next().next().next().next().length;
	if (findtr==0) {
			readyGo();
	}else{	
		$("#history>tbody").find("tr").next().next().next().next().nextAll().each(function() {
			$(this).remove();
		});
		readyGo();
	}
		
	function readyGo() {	
		$("#history>tbody>tr").each(function() {
			var vDate=sprintf("%02d",dt.getDate());
			var tdDate=$(this).find("i").first().html().substr(6,2); //20190613025
			if (tdDate<vDate || tdDate.length<1) {$(this).remove();} //td裡 不同日期[刪除]
		});
		setTimeout(doscore, 3000);
	}	
	
	function doscore() {
		$("#history>tbody>tr").each(function() {
		
			// array{} 期數
			var issuecu=$(this).find("i").first().html(); //20190613025
			var ltda=issuecu.substr(0,8);
			var ltdb=issuecu.substr(9,2);
			var issue=sprintf("%s%s",ltda,ltdb);
			ret.data[issue]={};
			
			// array{} 號碼
			var num=[];
			$(this).find(".number_redAndBlue>span").each(function() {
				num.push($(this).html());
			});
			ret.data[issue].Number=num.join(",");
			
			//array{} SP號碼
			ret.data[issue].Number2="";
				
			// TIME 開獎時間 (new)
			var year=issuecu.substr(0,4);			//2019
			var month=issuecu.substr(4,2);			//06
			var date=issuecu.substr(6,2);			//13
			var tm=$(this).find("i").next().html();//17:10
			if (tm=="00:00") {ret.data[issue].Time=="";} 
			else {ret.data[issue].Time=sprintf("%s-%s-%s %s:%02d",year,month,date,tm,0);}
			
			// *抓現在的時間*
			ret.data[issue].GetTime=sprintf("%04d-%02d-%02d %02d:%02d:%02d",dt.getFullYear(),dt.getMonth()+1,dt.getDate(),dt.getHours(),dt.getMinutes(),dt.getSeconds());
		
		});
		// 將 ret 資料送給 background.js
		chrome.extension.sendMessage(ret); //undefined 
	}
	console.log("Ret>>")
	console.log(ret);
	setTimeout(function() {location.reload();}, 30000);
}

function alert(msg) {}