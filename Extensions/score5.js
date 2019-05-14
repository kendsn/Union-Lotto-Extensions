//江蘇快三	


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
	ret.loc="jsk3";
	ret.locname="江蘇快三1";
	ret.lottoid=21; 											// 江蘇骰寶 江蘇快三
	ret.locurl="http://kj.1680api.com/ShareHtml/LiveHisList?setcode=1006&codes=1006";
	ret.locwebname="168kai";
	ret.loctype=2;
	ret.date=sprintf("%04d%02d%02d",dt.getFullYear(),dt.getMonth()+1,dt.getDate()); 
	ret.data={};

	// 處裡不要的資料
	var findTen=$("#reslist").find("tr").next().next().next().next().next().next().next().next().next().next().length;
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

			// array{} 期數   *160728015*
			var issue=$(this).find("td").next().html().substr(1,9);		
			ret.data[issue]={};
		
			// array{} 號碼
			var num=[];
			$(this).find("em").each(function() {
				num.push($(this).html());
			});
			ret.data[issue].Number=num.join(",");
			
			// array{} SP號碼
			ret.data[issue].Number2="";
				
			// TIME 開獎時間 (new)
			var year=issue.substr(0,2);	var month=issue.substr(2,2);	var date=issue.substr(4,2);			
			var tm=$(this).find("td").first().html();  //00:00
			if (tm=="00:00") {ret.data[issue].Time=="";} 
			else {ret.data[issue].Time=sprintf("%s%s-%s-%s %s:%02d",20,year,month,date,tm,0);}

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








