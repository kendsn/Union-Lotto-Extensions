 //江蘇快三	3


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
	ret.loc="jsk3_3";
	ret.locname="江蘇快三3";
	ret.lottoid=21;
	ret.locurl="https://06kj77.com/draw-js_k3-today.html";
	ret.locwebname="06開獎網";
	ret.loctype=2;
	ret.date=sprintf("%04d%02d%02d",dt.getFullYear(),dt.getMonth()+1,dt.getDate()); 
	ret.data={};

	// 處裡不要的資料
	var findtr = $("#table-js_k3>tbody").find("tr").next().next().next().next().next().length;
	if (findtr==0) {
			readyGo();
	}else{	
		$("#table-js_k3>tbody").find("tr").next().next().next().next().next().nextAll().each(function() {
			$(this).remove();
		});
		readyGo();
	}
		
	function readyGo() {	
		$("#table-js_k3>tbody>tr").next().each(function() {
			var vDate=sprintf("%02d",dt.getDate()); //20190614017  14:10:34
			var tdDate=$(this).find("td").first().find("span").html().substr(6,2);
			if (tdDate<vDate || tdDate.length<1) {/*$(this).remove();*/} //td裡 不同日期[刪除]
		});
		setTimeout(doscore, 3000);
	}	
	
	function doscore() {
		$("#table-js_k3>tbody>tr").next().each(function() {
		
			// array{} 期數
			//<span>20190417035</span>&nbsp;&nbsp;15:52:19
			var issuecu=$(this).find("td").first().find("span").html();
			var year=issuecu.substr(0,4);		//2015
			var month=issuecu.substr(4,2);		//06
			var date=issuecu.substr(6,2);		//29
			var issue=issuecu;
			ret.data[issue]={};
			
			// array{} 號碼
			var num=[];
			var numtr=$(this).find("td").next().find("span").each(function() {
				var tnum=$(this).html();
				//var spnum=sprintf("%02d",tnum);
				num.push(tnum);
			});
			if (num != "255") {
				ret.data[issue].Number=num.join(",");
			}
			
			//array{} SP號碼
			ret.data[issue].Number2="";
				
			// TIME 開獎時間 (new) 
			var delspan=$(this).find("td").first().find("span").remove();
			var rep=$(this).find("td").first().text().trim();
			var issuetime=rep.split(":",3);
			var tm=issuetime[0]+issuetime[1];  //0000
			if (tm=="0000") {ret.data[issue].Time=="";} 
			else {ret.data[issue].Time=sprintf("%s-%s-%s %s:%s:%s",year,month,date,issuetime[0],issuetime[1],issuetime[2]);}
			
			// *抓現在的時間*
			ret.data[issue].GetTime=sprintf("%04d-%02d-%02d %02d:%02d:%02d",dt.getFullYear(),dt.getMonth()+1,dt.getDate(),dt.getHours(),dt.getMinutes(),dt.getSeconds());
		
		});
		// 將 ret 資料送給 background.js
		chrome.extension.sendMessage(ret); //undefined 
	}
	console.log("Ret>>")
	console.log(ret);
	setTimeout(function() {location.reload();}, 20000);
}

function alert(msg) {}