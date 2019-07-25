//天津時時彩3


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
	ret.loc="tj_3";
	ret.locname="天津時時彩3";
	ret.lottoid=8; 							
	ret.locurl="https://www.16061.net/#detailNumbers?lottery_id=4";
	ret.locwebname="cp彩票";
	ret.loctype=2;
	ret.date=sprintf("%04d%02d%02d",dt.getFullYear(),dt.getMonth()+1,dt.getDate()); 
	ret.data={};
	
	setTimeout(doscore, 3000);

	function doscore() {

			// array{} 期數 20160727054 
			var issue=$("#checkNumber>option").first().html();
			ret.data[issue]={};

			// array{} 號碼
			var num=[];
			$(".ballDiv").find("span").each(function() {
				num.push($(this).html());
			});
			ret.data[issue].Number=num.join(",");
			
			// array{} SP號碼
			ret.data[issue].Number2="";
				
			// TIME 開獎時間 (new)
			ret.data[issue].Time=$(".open>span").html();	

			// *抓現在的時間*
			ret.data[issue].GetTime=sprintf("%04d-%02d-%02d %02d:%02d:%02d",dt.getFullYear(),dt.getMonth()+1,dt.getDate(),dt.getHours(),dt.getMinutes(),dt.getSeconds());

	// 將 ret 資料送給 background.js
	chrome.extension.sendMessage(ret); //undefined 
	}
	console.log("Ret>>")
	console.log(ret);
}

function alert(msg) {}