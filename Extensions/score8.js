//天津時時彩1


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
	ret.loc="tj";
	ret.locname="天津時時彩1";
	ret.lottoid=8; 							
	ret.locurl="http://1680380.com/html/shishicai_tj/ssc_index.html";
	ret.locwebname="168kai";
	ret.loctype=2;
	ret.date=sprintf("%04d%02d%02d",dt.getFullYear(),dt.getMonth()+1,dt.getDate()); 
	ret.data={};
	
	// 處裡不要的資料
	var findSix=$("#jrsmhmtjTab>tbody").find("tr").next().next().next().next().next().next().length;
		console.log("findSix="+findSix);
		if (findSix==0 || findSix==1) {
			readyGo();
		}else{
			$("#jrsmhmtjTab>tbody").find("tr").next().next().next().next().next().nextAll().each(function() {//找tr 第6個後面
				$(this).remove(); 
			});
			readyGo();
		}
	
	function readyGo() {	
		$("#jrsmhmtjTab>tbody").find("tr").next().each(function() {
			var delAD=$(this).find("td").next().next().html();
				if (delAD==" ") {$(this).remove();}	//td
				$(this).find("td").next().next().find("i").each(function() {		//td裡
					if ($(this).html()=="-") {$(this).parent().parent().remove();}
				});
		});
		setTimeout(doscore, 3000);
	}
	
	function doscore() {
		$("#jrsmhmtjTab>tbody").find("tr").next().each(function() {

			// array{} 期數 *20160727054 *
			var issue=$(this).find("td").next().html();		
			ret.data[issue]={};

			// array{} 號碼
			var num=[];
			$(this).find("td").next().next().find("i").each(function() {
				num.push($(this).html());
			});
			ret.data[issue].Number=num.join(",");
			
			// array{} SP號碼
			ret.data[issue].Number2="";
				
			// TIME 開獎時間 (new)
			ret.data[issue].Time=$(this).find("td").html();	

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