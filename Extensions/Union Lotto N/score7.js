//天津快樂十分1;


// ------------------------------
// 		score one time requests		|
// ------------------------------
window.addEventListener("load", function() {
//	setTimeout(parse, 1000);
}, true);

function parse() {
	var dt=new Date();	// *抓現在的Date*
	var ret={};
	ret.error="";
	ret.loc="tj10";
	ret.locname="天津快樂十分1";
	ret.lottoid=13; 							
	ret.locurl="http://kj.1680api.com/ShareHtml/LiveHisList?setcode=10020&codes=10020";
	ret.locwebname="168kai";
	ret.loctype=2;
	ret.date=sprintf("%04d%02d%02d",dt.getFullYear(),dt.getMonth()+1,dt.getDate()); 
	ret.data={};
	
	// 處裡不要的資料
	var findTen=$("#reslist").find("tr").next().next().next().next().next().next().next().next().next().length;
		console.log("findTen="+findTen);
		if (findTen==0 || findTen==1) {
			readyGo();
		}else{
			$("#reslist").find("tr").next().next().next().next().nextAll().each(function() {//找tr 第10個後面
				$(this).remove(); 
			});
			readyGo();
		}
	
	function readyGo() {
		$("#reslist>tr").each(function() {
			var delAD=$(this).find("td").next().next().html();
				if (delAD==" ") {$(this).remove();}	//td
				$(this).find("em").each(function() {		//td裡
					if ($(this).html()=="-") {$(this).parent().parent().remove();}
				});
		});
		setTimeout(doscore, 3000);
	}
	
	function doscore() {
		$("#reslist>tr").each(function() {

			// array{} 期數 	*20160728013* 
			var issue=$(this).find("td").next().html().substr(1,11);		
			ret.data[issue]={};
		
			// array{} 號碼
			var num=[];
			$(this).find("em").each(function() {
				var tnum=$(this).html();
				var spnum=sprintf("%02d",tnum);
				num.push(spnum);
			});
			ret.data[issue].Number=num.join(",");
			
			// array{} SP號碼
			ret.data[issue].Number2="";
				
			// TIME 開獎時間 (new)
			var year=issue.substr(0,4);	var month=issue.substr(4,2);	var date=issue.substr(6,2);			
			var tm=$(this).find("td").first().html();  //00:00
			if (tm=="00:00") {ret.data[issue].Time=="";} 
			else {ret.data[issue].Time=sprintf("%s-%s-%s %s",year,month,date,tm);}

			// *抓現在的時間*
			ret.data[issue].GetTime=sprintf("%04d-%02d-%02d %02d:%02d:%02d",dt.getFullYear(),dt.getMonth()+1,dt.getDate(),dt.getHours(),dt.getMinutes(),dt.getSeconds());

		});	
		
	// 將 ret 資料送給 background.js
	chrome.extension.sendMessage(ret); //undefined 
	}
	console.log("Ret>>")
	console.log(ret);
	setTimeout(function() {location.reload();}, 100000);
}

function alert(msg) {}