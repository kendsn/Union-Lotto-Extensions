// ---------------------------------
// 			格式化時間函數 		 
//----------------------------------
Date.prototype.Format = function (fmt) { 	// 日期格式化
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


// ------------ BEGIN  : Socket---------------------
var ox={
	debug:true,
	socket:null,
	connected:false,
	wslog:function(data) {
		if (this.debug)	console.log(data);		// 除錯狀態下才要印出資料
	},
	wsSend:function(data) {
		this.wslog("[ws測試]Sending");
		this.wslog(data);
		var sm=JSON.stringify(data);
		//console.log("sm="+sm);
		try {
			this.socket.send(sm);
		} catch (ex) {
			this.wslog("[ws測試]send fail");
		}
	}
};
var oxo={
	debug:true,
	socket:null,
	connected:false,
	wslog:function(data) {
		if (this.debug)	console.log(data);		// 除錯狀態下才要印出資料
	},
	wsSend:function(data) {
		this.wslog("[ws正式]Sending");
		this.wslog(data);
		var sm=JSON.stringify(data);
		try {
			this.socket.send(sm);
		} catch (ex) {
			this.wslog("[ws正式]send fail");
		}
	}
};


// ----------Call  [function Go] ----------------------------
//  測試站
function go() {
	var host = "ws://ws.mis-v.work-ez.com:12345/ds_datasrc03";

	if (ox.socket!=null) {
		ox.socket.close();
		ox.socket=null;
	}

	try {
		ox.socket = new WebSocket(host);
		ox.connected=false;
		ox.socket.onopen= function(msg){ 
			ox.connected=true;
			ox.wslog("[ws測試]Connected and status is "+this.readyState); 
		};

		ox.socket.onclose = function(msg){ 
			if (!ox.connected) {
				ox.wslog("[ws測試]無法連上伺服器");
				ox.wslog("[ws測試]5 秒後重連");
				setTimeout(go,5000);
			} else {
				ox.wslog("[ws測試]伺服器斷線, 預計 5 秒後重連");
				setTimeout(go,5000);
			}
			ox.connected=false;
			ox.wslog("[ws測試]Disconnected - status " + this.readyState); 
		};

		ox.socket.onmessage = function(msg){ 
			var ret;
			try {
				ret=JSON.parse(msg.data);
			} catch (ex) {
				ox.wslog("[ws測試]Receive unknown data");
				ox.wslog(msg.data);
			}
			if (ret==null) return;

			ox.wslog("[ws測試]Receive from host");
			ox.wslog(ret);

			if (ret.error!="") {
				console.log(ret.error);
				return;
			}

			switch (ret.event) {
				case "ONPOSTED":
// 收到回復
					break;
				default:
				
			}
		}

	} catch(ex){ 
		ox.wslog(ex); 
	}

}

//  正式站
function goo() {
	var host = "ws://ws.mis-v.work-ez.com:23456/ds_datasrc03"; 

	if (oxo.socket!=null) {
		oxo.socket.close();
		oxo.socket=null;
	}

	try {
		oxo.socket = new WebSocket(host);
		oxo.connected=false;
		oxo.socket.onopen= function(msg){ 
			oxo.connected=true;
			oxo.wslog("[ws正式]Connected and status is "+this.readyState); 
		};

		oxo.socket.onclose = function(msg){ 
			if (!oxo.connected) {
				oxo.wslog("[ws正式]無法連上伺服器");
				oxo.wslog("[ws正式]5 秒後重連");
				setTimeout(goo,5000);
			} else {
				oxo.wslog("[ws正式]伺服器斷線, 預計 5 秒後重連");
				setTimeout(goo,5000);
			}
			oxo.connected=false;
			oxo.wslog("[ws正式]Disconnected - status " + this.readyState); 
		};

		oxo.socket.onmessage = function(msg){ 
			var ret;
			try {
				ret=JSON.parse(msg.data);
			} catch (ex) {
				oxo.wslog("[ws正式]Receive unknown data");
				oxo.wslog(msg.data);
			}
			if (ret==null) return;

			oxo.wslog("[ws正式]Receive from host");
			oxo.wslog(ret);

			if (ret.error!="") {
				console.log(ret.error);
				return;
			}

			switch (ret.event) {
				case "ONPOSTED":
// 收到回復
					break;
				default:
				
			}
		}

	} catch(ex){ 
		oxo.wslog(ex); 
	}

}



function tabspage() {	// 3 cpcp彩票 test
	var url0="https://06kj77.com/draw-cq_ssc-today.html";//重慶時時彩
	var url1="https://06kj77.com/draw-pk10-today.html";//北京賽車
	var url2="https://1682013.co/view/beijinkl8/bjkl8_index.html";//北京快樂八									  											 													//北京快樂八
	var url3="";//幸運農場
	var url4="https://06kj77.com/draw-js_k3-today.html";//江蘇快三				   																												//江蘇快三
	var url5="https://1682013.co/view/klsf/klsf_index.html";//廣東快樂十分	
	var url6="";//天津快樂十分	
	var url7="";//天津時時彩	
	var url8="";//新疆時時彩	

	 chrome.tabs.query({},function(tabs){     
		/*
		console.log("\n/////////////////////\n");
		tabs.forEach(function(tab){	// 顯示全部tabs 
			console.log(tab);
			console.log(tab.url);
			chrome.tabs.update(tabs[0].id, { url: "http://example.com/foo/bar.html" }); //指定網址
		});
		*/
		console.log("||*分頁重新帶入*||");	
		chrome.tabs.update(tabs[0].id, { url:url0});
		chrome.tabs.update(tabs[1].id, { url:url1});
	    chrome.tabs.update(tabs[2].id, { url:url2});
	    //chrome.tabs.update(tabs[3].id, { url:url4});
	    chrome.tabs.update(tabs[4].id, { url:url5});
	    //chrome.tabs.update(tabs[5].id, { url:url8});
	 });
}


// ---------- document.ready -------------------------
$(document).ready(function() {		// * onload 
	tabspage();	   
	
	if (!ox.connected){
		go();				
	}else {
		ox.socket.close();
	}

	if (!oxo.connected){
		//goo();			
	}else {
		oxo.socket.close();
	}
	
});


// ------------ BEGIN  : extensions---------------------
// ------------------------------
//  		connect channel 	 
// ------------------------------
/* [未使用port]
var uport=null;
chrome.runtime.onConnect.addListener(function(port) { 			// (onConnect Event)
//	console.log("connect channel ");
	if (port.name == "unionchannel") {
		console.log("{ channel } has connected by lotto!");
		uport=port;

        port.onMessage.addListener(function(ret) {
			if (!checkRet(ret)) return;
			console.log(ret);

			if (ret.event=="oplogout") {
				uport=null;
				console.log("oplogout");
			}
        });
	}
});
*/

// ---------------------------------
//		checkRet (Data)				 
// ---------------------------------
function checkRet(ret) {
	if (typeof(ret.error)=="undefined") {
		alert("IvlidRet");
		return false;
	}
	if (ret.error!="") {
		alert(ret.error);
		return false;
	}
	return true;
}


// ------------------------------
//  		clone copy data 					
// ------------------------------
function clone(obj) {
	return $.extend(true,{},obj);
}


// ------------------------------
//  		tabs page>reload 					
// ------------------------------
setInterval(checkTabs,240000);
function checkTabs() {

	var d=new Date();
	for (var loc in alllotto) {
		if (d.getTime()-alllotto[loc].updatetm>60000) {
			//console.log("reload");	
			chrome.tabs.reload(alllotto[loc].tabid);	    // 當掉的分頁重整
			tabspage(); 											// 重新帶入所有Tabs
		}
	}
}


// ---------------------------------
// 	Score(開獎) one time requests	 	 
// ---------------------------------
var alllotto={};
chrome.extension.onMessage.addListener(function(ret, sender, sendRespone) {
	if (!checkRet(ret)) return;
	//console.log(sender);
	reclue(ret);
	alllotto[ret.loc].tabid=sender.tab.id;
	
		/*
		// 收到 score的資料 後..(處理 單個tab)
		console.log("tab id="+sender.tab.id); // tab.id
		console.log("tab url="+sender.tab.url);	//tab.url
		if (sender.tab.url != ret.locurl ) {	// 處理tabs page ,url不正確 (轉址)
		setTimeout(function() {
			console.log("轉址>"+ret.locurl);
			chrome.tabs.update(sender.tab.id, {url: ret.locurl});
			}, 10000);	
		}*/

	//ret to pop.js [未使用port]
//	try {
//		uport.postMessage(ret); 
//	} catch(e) {
//	}

});

function reclue(ret) {												// -|*倒數計時 do Run*|-
		if (typeof(ret.loc)=="undefined") {
			return;
		}

		var d=new Date();													// [Not Today Do..]
		var today=sprintf("%04d%02d%02d",d.getFullYear(),d.getMonth()+1,d.getDate());

		if (typeof(alllotto[ret.loc])=="undefined")	{
			console.log("alllotto[ret.loc]=undefined");
			alllotto[ret.loc]={
					loc:ret.loc,
					locname:ret.locname,
					lottoid:ret.lottoid,
					locurl:ret.locurl,
					locwebname:ret.locwebname,
					loctype:ret.loctype,
					updatetm:d.getTime(),
					date:ret.date,
					tabid:null,
					data:{}
			};
		} else {
			alllotto[ret.loc].updatetm=d.getTime();
		}
		
		if (alllotto[ret.loc].date!=today) {	// old.data <> 日期比較
			alllotto[ret.loc].date=today;
			alllotto[ret.loc].data={};
		}
		
		// 處理資料
		for (var issue in ret.data) {
			var numberstr=ret.data[issue].Number.split(",");
			
			if (numberstr[0] == "255" || ret.data[issue].Number == "0" || ret.data[issue].Number == "00") {
				ret.data[issue].Number == "";
			}else{
					if (ret.data[issue].Number=="" ) {
						console.log("ret.data is { error }");
						ret.data.splice(issue,1);// 移除array 該筆資料
					}else{
						alllotto[ret.loc]=MergeData(alllotto[ret.loc],ret);	    // MergeData(old, new);	
					}
				}
		}
		
}
	

//-------------------------------------------------------------	
// *上傳前, 比較
//-------------------------------------------------------------
var postresult="postresult";
function MergeData(olddata,newdata) {
	var alldata=clone(olddata);
	var diffdata={
		op:postresult,
		loc:newdata.loc,
		locname:newdata.locname,
		lottoid:newdata.lottoid,
		locurl:newdata.locurl,
		locwebname:newdata.locwebname,
		loctype:newdata.loctype,
		date:newdata.date,
		data:{}
	};
	
	var diffcount=0;
	for (var issue in newdata.data) {
		//alldata.data[issue]=newdata.data[issue];
		if (typeof(olddata.data[issue])=="undefined") {
			alldata.data[issue]=clone(newdata.data[issue]);											
			diffdata.data[issue]=clone(newdata.data[issue]);
			diffcount++;
		} else {										// (舊的資料!="undefined")
			if (olddata.data[issue].Number!=newdata.data[issue].Number) {
				alldata.data[issue]=clone(newdata.data[issue]);											
				diffdata.data[issue]=clone(newdata.data[issue]);			
				diffcount++;
			} else if (olddata.data[issue].Number2!=newdata.data[issue].Number2) {
				alldata.data[issue]=clone(newdata.data[issue]);											
				diffdata.data[issue]=clone(newdata.data[issue]);	
				diffcount++;
			}
		}
		
	}
	
	if (diffcount>0) {
		//SendData(diffdata);
		SendData2(diffdata);
	}
	return alldata; 
}


//-------------------------------------------------------------
// * 資料送出
//-------------------------------------------------------------
function SendData(data) {
//		$.post("https://mis.uuss.net/others/fromchrome.php",data,function(ret) {
//			if (!checkRet(ret)) return;
//		},'json');		
//		console.log('upload---[complete]');
//		console.log(data);
}

function SendData2(data) {		// * 資料送出2 for Socket
	ox.wsSend(data);
	//oxo.wsSend(data);
}
