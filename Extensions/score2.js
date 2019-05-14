//北京賽車1


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
	ret.loc="bjcar3";
	ret.locname="北京賽車1";
	ret.lottoid=20; 								
	ret.locurl="http://359.com/bjpk10/caipiao";
	ret.locwebname="359彩票";
	ret.loctype=2;
	ret.date=sprintf("%04d%02d%02d",dt.getFullYear(),dt.getMonth()+1,dt.getDate()); 
	ret.data={};

	// 處裡不要的資料
	var findtr = $("#history>tbody").find("tr").next().next().next().next().length;
	if (findtr==0) {
			readyGo();
	}else{	
		$("#history>tbody").find("tr").next().next().next().next().nextAll().each(function() {//找tr 第10個後面
			$(this).remove();
		});
		readyGo();
	}
		
	function readyGo() {	
		$("#history>tbody>tr").each(function() {
			var vDate=sprintf("%02d",dt.getDate());
			var tdDate=$(this).find("i").next().html().substr(3,2);	//04-13 10:52
			if (tdDate<vDate || tdDate.length<1) {$(this).remove();}		//td裡 不同日期[刪除]
			setTimeout(doscore, 3000);
		});
	}
	
	function doscore() {
		$("#history>tbody>tr").each(function() {
		
			// array{} 期數
			var issuecu=$(this).find("i").first().html().substr(0,6);
			var issue=issuecu;
			ret.data[issue]={};

			// array{} 號碼
			var num=[];
			$(this).find(".number_pk10>span").each(function() {
				var tnum=$(this).attr("class").replace("num","");
				var spnum=sprintf("%02d",tnum);
				num.push(spnum);
			});
			if (num != "255") {
			ret.data[issue].Number=num.join(",");
			}
			
			//array{} SP號碼
			ret.data[issue].Number2="";
				
			// TIME 開獎時間 (new)
			var year=dt.getFullYear();
			var tm=$(this).find("i").next().html();  //月-日 時:分 04-13 10:52
            var t=tm.split(" ");
			ret.data[issue].Time=sprintf("%s-%s %s:%02d",year,t[0],t[1],0);

				// *抓現在的時間*
				ret.data[issue].GetTime=sprintf("%04d-%02d-%02d %02d:%02d:%02d",dt.getFullYear(),dt.getMonth()+1,dt.getDate(),dt.getHours(),dt.getMinutes(),dt.getSeconds());
			
			});
			// 將 ret 資料送給 background.js
			chrome.extension.sendMessage(ret); //undefined 
	}
	console.log("Ret>>")
	console.log(ret);
	setTimeout(function() {location.reload();}, 10000);
}

function alert(msg) {}