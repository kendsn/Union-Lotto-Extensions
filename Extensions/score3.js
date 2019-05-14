//北京快樂八1


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
	ret.loc="bjkl8";
	ret.locname="北京快樂八1";
	ret.lottoid=22; 									
	ret.locurl="http://1680380.com/html/beijinkl8/bjkl8_index.html";//開獎有排序問題	
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
				//$(this).remove(); 
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
			
			// array{} 期數 	* 566940 *
			var issue=$(this).find("td").next().html().substr(1,6);			
			ret.data[issue]={};
		
			// array{} 號碼
			var num=[];
			$(this).find("td").next().next().find("em").each(function() {
				var tnum=$(this).html().replace(",","");
				var spnum=sprintf("%02d",tnum);
				num.push(spnum);
			});
			num.pop(); //remove last by array
			var nvalue=num.sort().join(",");
			ret.data[issue].Number=nvalue;
			
			// array{} SP號碼
			ret.data[issue].Number2="";
				
			// TIME 開獎時間 (new)
			ret.data[issue].Time=="";

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


