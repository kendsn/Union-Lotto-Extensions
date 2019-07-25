//廣東快樂十分2


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
	ret.loc="gd10_2";
	ret.locname="廣東快樂十分2";
	ret.lottoid=12; 									// 廣東快樂十分
	ret.locurl="https://www.1399p.com/gdkl10/";
	ret.locwebname="皇家";
	ret.loctype=2;
	ret.date=sprintf("%04d%02d%02d",dt.getFullYear(),dt.getMonth()+1,dt.getDate()); 
	ret.data={};

	// 處裡不要的資料
	var findtr = $("#dataContainer>tbody>tr").next().next().next().next().length;
	if (findtr==0) {
			readyGo();
	}else{	
		$("#dataContainer>tbody>tr").next().next().next().next().nextAll().each(function() {
			$(this).remove();
		});
		readyGo();
	}
		
	function readyGo() {	
		$("#dataContainer>tbody>tr").each(function() {
			var vDate=sprintf("%02d",dt.getDate());
			var tdDate=$(this).find("i").first().html().substr(6,2);	//20170830-39
			if (tdDate<vDate) {$(this).remove();}		//td裡 不同日期[刪除]
		});
		setTimeout(doscore, 3000);
	}
	
	function doscore() {
		$("#dataContainer>tbody>tr").each(function() {
		
			// array{} 期數		20170413-xx
			var issuecu=$(this).find("i").first().html();		
			var issue=issuecu.replace("-","");		
			ret.data[issue]={};
			
			// array{} 號碼
			var num=[];
			$(this).find(".number_redAndBlue>span").each(function() {
				var tnum=$(this).html();
				var spnum=sprintf("%02d",tnum);
				num.push(spnum);
			});
			ret.data[issue].Number=num.join(",");
			
			//array{} SP號碼
			ret.data[issue].Number2="";
				
			// TIME 開獎時間 (new)   issue=2016041344
			var year=issue.substr(0,4);		//2016
			var month=issue.substr(4,2);	//04
			var date=issue.substr(6,2);		//13
			var tm=$(this).find("i").next().html();  //00:00
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
}

function alert(msg) {}