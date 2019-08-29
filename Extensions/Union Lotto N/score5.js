//江蘇快三	


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
	ret.loc="jsk3";
	ret.locname="江蘇快三1";
	ret.lottoid=21;
	ret.locurl="https://www.666icp.com/jsk3/kaijiang/";
	ret.locwebname="愛彩票";
	ret.loctype=2;
	ret.date=sprintf("%04d%02d%02d",dt.getFullYear(),dt.getMonth()+1,dt.getDate()); 
	ret.data={};

	// 處裡不要的資料
	var findtr = $(".j-numslist>tbody>tr").next().next().next().next().length;
	if (findtr==0) {
			readyGo();
	}else{	
		$(".j-numslist>tbody>tr").next().next().next().next().nextAll().each(function() {
			$(this).remove();
		});
		readyGo();
	}
		
	function readyGo() {	
		$(".j-numslist>tbody>tr").each(function() {
			var vDate=sprintf("%02d",dt.getDate());
			var tdDate=$(this).find("td").first().find("span").first().html().substr(6,2); //20190829-16
			if (tdDate<vDate || tdDate.length<1) {$(this).remove();} //td裡 不同日期[刪除]
		});
		setTimeout(doscore, 3000);
	}	
	
	function doscore() {
		$(".j-numslist>tbody>tr").each(function() {
		
			// array{} 期數
			var issuecu=$(this).find("td").first().find("span").first().html(); //20190829-16
			var rep=issuecu.split("-",2);
			var issue=sprintf("%s%03d",rep[0],rep[1]);
			ret.data[issue]={};
			
			// array{} 號碼
			var num=[];
			$(this).find(".record-num>i").each(function() { //j-num1
				var tnumClass=$(this).attr("class").replace("j-num","");
				var tnum=tnumClass.substr(0,1);
				num.push(tnum);
			});
			ret.data[issue].Number=num.join(",");
			
			//array{} SP號碼
			ret.data[issue].Number2="";
				
			// TIME 開獎時間 (new)
			var year=issuecu.substr(0,4);			//2015
			var month=issuecu.substr(4,2);			//06
			var date=issuecu.substr(6,2);			//29
			var tm=$(this).find("td").first().find("span").next().html();//17:10
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