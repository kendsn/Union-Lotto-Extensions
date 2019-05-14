//重慶時時彩1


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
	ret.loc="cq2";
	ret.locname="重慶時時彩1";
	ret.lottoid=19; 								
	ret.locurl="http://359.com/cqssc/caipiao";
	ret.locwebname="359彩票";
	ret.loctype=2;
	ret.date=sprintf("%04d%02d%02d",dt.getFullYear(),dt.getMonth()+1,dt.getDate()); 
	ret.data={};
	
	// 處裡不要的資料
	var findtr = $("#tbHistory>tbody").find("tr").next().next().next().next().length;
	if (findtr==0) {
			readyGo();
	}else{	
		$("#tbHistory>tbody").find("tr").next().next().next().next().nextAll().each(function() {//找tr 第10個後面
			$(this).remove();
		});
		readyGo();
		}
		
	function readyGo() {	
		$("#tbHistory>tbody>tr").each(function() {
			var vDate=sprintf("%02d",dt.getDate());
			var tdDate=$(this).find("i").first().html().substr(6,2);	//20150903-048
			if (tdDate<vDate || tdDate.length<1) {$(this).remove();}		//td裡 不同日期[刪除]
			setTimeout(doscore, 3000);
		});
	}	
	
	function doscore() {
		$("#tbHistory>tbody>tr").each(function() {
		
			// array{} 期數
			var issuecu=$(this).find("i").first().html();			//20150629-120
			var issue=issuecu.substr(0,12).replace("-","");		//20150629120
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
			var year=issuecu.substr(0,4);		//2015
			var month=issuecu.substr(4,2);		//06
			var date=issuecu.substr(6,2);		//29
			var tm=$(this).find("i").next().html();//00:00
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
	setTimeout(function() {location.reload();}, 10000);
}

function alert(msg) {}