 //北京快樂八 3


// ------------------------------
// 		score one time requests		|
// ------------------------------
window.addEventListener("load", function() {
	setTimeout(parse, 3000);
}, true);

function parse() {
	var dt=new Date();	// *抓現在的Date*
	var ret={};
	ret.error="";
	ret.loc="bjkl8_3";
	ret.locname="北京快樂八3";
	ret.lottoid=22; 									
	ret.locurl="https://1682013.co/view/beijinkl8/bjkl8_index.html";
	ret.locwebname="168開獎網";
	ret.loctype=2;
	ret.date=sprintf("%04d%02d%02d",dt.getFullYear(),dt.getMonth()+1,dt.getDate()); 
	ret.data={};

	// 處裡不要的資料
	var findtr = $("#jrsmhmtjTab>tbody>tr").next().next().next().next().next().length;
	if (findtr==0) {
			readyGo();
	}else{	
		$("#jrsmhmtjTab>tbody>tr").next().next().next().next().next().nextAll().each(function() {
			$(this).remove();
		});
		readyGo();
	}
		
	function readyGo() {	
		$("#jrsmhmtjTab>tbody>tr").next().each(function() {
			var vDate=sprintf("%02d",dt.getDate());
			var tdDate=$(this).find("td").first().html().substr(8,2);//2019-06-14 15:40:00
			if (tdDate<vDate || tdDate.length<1) {$(this).remove();}//td裡 不同日期[刪除]
		});
		setTimeout(doscore, 3000);
	}	
	
	function doscore() {
		$("#jrsmhmtjTab>tbody>tr").next().each(function() {

			// array{} 期數
			var issue=$(this).find("td").next().html();	//957286
			ret.data[issue]={};
			
			// array{} 號碼
			var sp=$(this).find(".numOrangeKong>i").html();
			var num=[];
			$(this).find(".numOrangeKong>i").remove();
			$(this).find(".blueqiu>ul>li>i").each(function() {
				num.push($(this).html());
			});
			ret.data[issue].Number=num.join(",");
			
			//array{} SP號碼
			ret.data[issue].Number2="";//sp;
				
			// TIME 開獎時間 (new) //2019-06-14 15:40:00
			var cu=$(this).find("td").first().html();
			var year=dt.getFullYear();
			var month=cu.substr(5,2);				//06
			var date=cu.substr(8,2);				//19
			var tm=cu.substr(11,5);					//15:26
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
	setTimeout(function() {location.reload();}, 20000);
}

function alert(msg) {}