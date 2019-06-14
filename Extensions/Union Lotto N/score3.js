//北京快樂八1


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
	ret.loc="bjkl8";
	ret.locname="北京快樂八1";
	ret.lottoid=22; 									
	ret.locurl="http://359.com/bjkl8/caipiao";
	ret.locwebname="359彩票";
	ret.loctype=2;
	ret.date=sprintf("%04d%02d%02d",dt.getFullYear(),dt.getMonth()+1,dt.getDate()); 
	ret.data={};

	// 處裡不要的資料
	var findtr = $("#tbHistory>tbody").find("tr").next().next().next().next().length;
	if (findtr==0) {
			readyGo();
	}else{	
		$("#tbHistory>tbody").find("tr").next().next().next().next().nextAll().each(function() {
			$(this).remove();
		});
		readyGo();
	}
		
	function readyGo() {	
		$("#tbHistory>tbody>tr").each(function() {
			var vDate=sprintf("%02d",dt.getDate());
			var tdDate=$(this).find("i").next().html().substr(3,2);	//06-13 15:26
			if (tdDate<vDate || tdDate.length<1) {$(this).remove();}//td裡 不同日期[刪除]
		});
		setTimeout(doscore, 3000);
	}	
	
	function doscore() {
		$("#tbHistory>tbody>tr").each(function() {

			// array{} 期數
			var issue=$(this).find("i").first().html();	//957286
			ret.data[issue]={};
			
			// array{} 號碼
			var num=[];
			$(this).find(".number_kl8>span").each(function() {
				num.push($(this).html());
			});
			ret.data[issue].Number=num.join(",");
			
			//array{} SP號碼
			var sp=$(this).find("td").next().next().html();
			ret.data[issue].Number2="";//sprintf("%02d",sp);
				
			// TIME 開獎時間 (new)
			var cu=$(this).find("i").next().html();//06-13 15:26
			var year=dt.getFullYear();
			var month=cu.substr(0,2);				//06
			var date=cu.substr(3,2);				//19
			var tm=cu.substr(6,5);					//15:26
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