 //幸運農場-cp彩票會所


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
	ret.loc="xync_3";
	ret.locname="幸運農場3";
	ret.lottoid=14; 									// 幸運農場
	ret.locurl="http://www.cp66607.com/xync/lishihaoma";
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
		
			// array{} 期數
			var issuecu=$(this).find("td").next().html();
			var issue=issuecu;
			ret.data[issue]={};
			
			// array{} 號碼
			var num=[];
			var numtr=$(this).find("td").next().next().find("div>span").each(function() {
				var num02 = $(this).attr("class").replace("ng-scope no","");
				var num02sp = sprintf("%02d",num02);
				num.push(num02sp);
			});
			ret.data[issue].Number=num.join(",");
			
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
	setTimeout(function() {location.reload();}, 5000);
}

function alert(msg) {}






