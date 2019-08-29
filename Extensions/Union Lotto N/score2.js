//北京賽車1


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
	ret.loc="bjcar3";
	ret.locname="北京賽車1";
	ret.lottoid=20; 								
	ret.locurl="https://www.666icp.com/pk10/kaijiang/";
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
			var tdDate=$(this).find("td").first().find("span").next().html().substr(3,2); //08-29 11:30
			if (tdDate<vDate || tdDate.length<1) {$(this).remove();} //td裡 不同日期[刪除]
		});
		setTimeout(doscore, 3000);
	}	
	
	function doscore() {
		$(".j-numslist>tbody>tr").each(function() {
		
			// array{} 期數
			var issuecu=$(this).find("td").first().find("span").first().html();
			var issue=issuecu;
			ret.data[issue]={};

			// array{} 號碼
			var num=[];
			$(this).find("td").first().next().find("i").each(function() {
			//$(this).html() = null	,data-n
			  var er = $(this).attr("data-n");
			  num.push(er);
			});
			if (num != "255") {
				ret.data[issue].Number=num.join(",");
			}
			
			//array{} SP號碼
			ret.data[issue].Number2="";
				
			// TIME 開獎時間 (new)
			var year=dt.getFullYear();
			var tm=$(this).find("td").first().find("span").next().html();  //08-29 11:30
            var t=tm.split(" ");
			ret.data[issue].Time=sprintf("%s-%s %s:%02d",year,t[0],t[1],0);

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