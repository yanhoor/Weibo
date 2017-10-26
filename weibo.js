/*
* @Author: yanhoor
* @Date:   2017-10-24 12:25:59
* @Last Modified by:   yanhoor
* @Last Modified time: 2017-10-26 19:14:23
*/
window.onload = function(){
	var weibo ={
		userName: "",
		faceUrl: "",
		time: "",
		content: ""
	};

	var EventUtil = {
		addHandler: function(element, type, handler){
			if (element.addEventListener) {
				element.addEventListener(type, handler, false);
			}else if (event.attachEvent) {
				event.attachEvent("on" + type, handler);
			}else{
				element["on" + type] = handler;
			}
		},

		removeHandler: function(element, type, handler){
			if (element.removeEventListener) {
				element.removeEventListener(type, handler, false);
			}else if (event.detachEvent) {
				event.detachEvent("on" + type, handler);
			}else{
				element["on" + type] = null;
			}
		},

		getButton: function(event){
			if (document.implementation.hasFeature("MouseEvent", "2.0")) {
				return event.button;
			}else{
				switch(event.button){
					case 0:
					case 1:
					case 3:
					case 5:
					case 7:
						return 0;
					case 2:
					case 6:
						return 2;
					case 4:
						return 1;
				}
			}
		},

		getCharCode: function(event){
			if (typeof event.charCode == "number") {
				return event.charCode;
			}else{
				return event.keyCode;
			}
		}

	};

	var userName = document.getElementById("username");
	var userFace = document.getElementById("faces");
	var content = document.getElementById("contentBox");
	var sendBtn = document.getElementById("sendBtn");
	var ul = document.getElementById("contentUl");
	var liList = ul.getElementsByTagName("li");

	EventUtil.addHandler(userFace, "click", chooseFace);
	EventUtil.addHandler(sendBtn, "click", sendWeibo);
	EventUtil.addHandler(userFace, "mouseover", function(){
		event.target.classList.add("hover");	
	});
	EventUtil.addHandler(userFace, "mouseout", function(){
		event.target.classList.remove("hover");		//不要用className = ""，会与点击时的效果冲突
	});
	EventUtil.addHandler(sendBtn, "mouseover", function(){
		event.target.classList.add("hover");	
	});
	EventUtil.addHandler(sendBtn, "mouseout", function(){
		event.target.classList.remove("hover");	
	});
	EventUtil.addHandler(sendBtn, "mouseout", function(){
		event.target.classList.remove("hover");	
	});
	EventUtil.addHandler(document.body, "keyup", quickKey);
	mouseEventHandler();

	function quickKey(){
		if (event.ctrlKey && event.keyCode == 13) {
			sendWeibo();
		}
	}

	function mouseEventHandler(){
		for(var i = 0; i < liList.length; i++){
		EventUtil.addHandler(liList[i], "mouseover", function(){
			var currentLi = event.currentTarget
			var currentUl = currentLi.parentNode;
			currentLi.classList.add("hover");
			var aList = currentLi.getElementsByTagName("a");
			aList[1].style.display = "inline";
			EventUtil.addHandler(aList[1], "mousedown", function(){
				if (EventUtil.getButton(event) == 0) {
					currentUl.removeChild(currentLi);
				}
			});
		});
		EventUtil.addHandler(liList[i], "mouseout", function(){
			var currentLi = event.currentTarget
			currentLi.classList.remove("hover");
			var aList = currentLi.getElementsByTagName("a");
			aList[1].style.display = "none";
		});
		}
	}

	function chooseFace(){
		var currentFace = document.getElementsByClassName("current");
		currentFace[0].classList.remove("current");	//currentFace为nodeList类数组对象，动态更新，只保存class=current的元素。P249
		var face = event.target;
		face.classList.add("current");		//自动加入currentFace，变成currentFace[0]
		weibo.faceUrl = face.src;
	}

	function sendWeibo(){
		var date = new Date();
		weibo.time = date.toLocaleString();
		weibo.userName = userName.value;
		weibo.content = content.value;

		var li = document.createElement("li");
		var contentHtml = "<div class=\"user-pic\"><img src=\"" + weibo.faceUrl + "\"></div>" +
					"<div class=\"content-sent\">" +
						"<div class=\"username\"><a href=\"javascript::\">" + weibo.userName + "</a>:</div>" +
						"<div class=\"msg-info\">" + weibo.content + "</div>" +
						"<div class=\"time\"><span>" + weibo.time + "</span><a href=\"javascript::\" class=\"del\">删除</a></div>" +
					"</div>";
		li.innerHTML = contentHtml;
		contentUl.insertBefore(li, contentUl.firstChild);
		mouseEventHandler();
	}
};