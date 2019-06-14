 //廣東快樂十分-cp彩票會所


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
	ret.loc="gd10_3";
	ret.locname="廣東快樂十分3";
	ret.lottoid=12; 									// 廣東快樂十分
	ret.locurl="http://www.cp66607.com/gdkl10/kuaileshifenkaijiang";
	ret.locwebname="cp彩票會所";
	ret.loctype=2;
	ret.date=sprintf("%04d%02d%02d",dt.getFullYear(),dt.getMonth()+1,dt.getDate()); 
	ret.data={};

		// 處裡不要的資料
		var findtr = $("table[class='ng-scope']>tbody>tr").next().next().next().next().next().length;
		if (findtr==0) {
				readyGo();
		}else{				
			$("table[class='ng-scope']>tbody>tr").next().next().next().next().next().nextAll().each(function() {//找tr 第10個後面
				$(this).remove();
			});
			readyGo();
		}
		
	function readyGo() {	
		$("table[class='ng-scope']>tbody>tr").next().each(function() {
			var vDate=sprintf("%02d",dt.getDate());
			var tdDate=$(this).find("td").first().html().substr(8,2);
			if (tdDate<vDate || tdDate.length<1) {$(this).remove();}	//td裡 不同日期[刪除]
		});
		setTimeout(doscore, 3000);
	}
	
	function doscore() {
		$("table[class='ng-scope']>tbody>tr").next().each(function() {
		
			// array{} 期數		20170413-xx
			var issuecu=$(this).find("td").next().html();
			var issue=issuecu;
			ret.data[issue]={};
			
			// array{} 號碼
			var num=[];
			var numtr=$(this).find("td").next().next().find("ul>li").each(function() {
				var tnum=$(this).html();
				var spnum=sprintf("%02d",tnum);
				num.push(spnum);
			});
			if (num != "255") {
			ret.data[issue].Number=num.join(",");
			}
			
			//array{} SP號碼
			ret.data[issue].Number2="";
				
			// TIME 開獎時間 (new) 	2018-01-30 17:17
			var issuetime=$(this).find("td").first().html();
			var year=issuetime.substr(0,4);		//2015
			var month=issuetime.substr(5,2);		//06
			var date=issuetime.substr(8,2);		//29
			var tm=issuetime.substr(11,5);  //00:00
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
	









