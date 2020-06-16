//台灣賓果1


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
	ret.loc="twbg";
	ret.locname="台灣賓果1";
	ret.lottoid=30; 								
	ret.locurl="https://www.taiwanlottery.com.tw/Lotto/BINGOBINGO/drawing.aspx";
	ret.locwebname="台灣彩券";
	ret.loctype=2;
	ret.date=sprintf("%04d%02d%02d",dt.getFullYear(),dt.getMonth()+1,dt.getDate()); 
	ret.data={};
	
	// 處裡不要的資料
	var findSix=$(".tableFull:eq(1)>tbody").find("tr").next().next().next().next().next().next().length;
		// console.log("findSix="+findSix);
		if (findSix==0 || findSix==1) {
			setTimeout(doscore, 3000);
		}else{
			$(".tableFull:eq(1)>tbody").find("tr").next().next().next().next().next().next().next().nextAll().each(function() {//找tr 第6個後面
				$(this).remove(); 
			});
			setTimeout(doscore, 3000);
		}
	
	function doscore() {
		$(".tableFull:eq(1)>tbody").find("tr").next().next().next().each(function() {

			// array{} 期數 *20170810049 *
			var issue=$(this).find("td").first().html();		
			ret.data[issue]={};

			// array{} 號碼
			var num=[];
			var ttnum = $(this).find("td").next().html();
			var tt=ttnum.split(" ");
			tt = tt.filter(function(n){return n}); //移除array "" 
			for (var i=0;i<tt.length;i++) {
				tt[i]
				num.push(tt[i]);
			}
			ret.data[issue].Number=num.join(",");
			
			// array{} SP號碼
			ret.data[issue].Number2="";
				
			// TIME 開獎時間 (new)
			ret.data[issue].Time="";	

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





