//获取文档下节点兼容
function $(names) {
    if (document.getElementsByClassName) {
        return document.getElementsByClassName(names);}
    else {
        var elements = document.getElementsByTagName('*');
        var result = [];
        var element,
            classNameStr,
            flag;
        names = names.split(' ');
        for (var i = 0; element = elements[i]; i++) {
            classNameStr = ' ' + element.className + ' ';
            flag = true;
            for (var j = 0, name; name = names[j]; j++) {
                if (classNameStr.indexOf(' ' + name + '') == -1) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                result.push(element);
            }
        }
        return result;
   }
}
//添加类名
function addClass(node,className){
	var _className = node.className.split(' ');
	//先判断该类名是否存在，不存在则在其后加上类名
	var flag = true;
	for(var i = 0; i < _className.length; i++){
		if(_className[i] === className)
			flag = false;
	}
	if (flag) {
		node.className += " "+className;
	}
}
//删除类名
function removeClass(node,className) {
	var _className = node.className.split(' ');
	for(var i = 0; i < _className.length; i++){
		if(_className[i] === className)
			_className[i] = "";
	}
	node.className = _className.join(" ");
}
//获取cookie值
function getcookie(){
	var cookie = {};
	var all = document.cookie;
	if (all === '')
	    return cookie;
	var list = all.split('; ');
	for (var i = 0; i < list.length; i++) {
	    var item = list[i];
	    var p = item.indexOf('=');
	    var name = item.substring(0, p);
	    name = decodeURIComponent(name);
	    var value = item.substring(p + 1);
	    value = decodeURIComponent(value);
	    cookie[name] = value;
	}
	return cookie;
}
//设置cookie值，有效时间按天计算
function setcookie(name,value,day){
	var cookie = name + "=" + encodeURIComponent(value);
	if (typeof day === "number") {
		cookie += "; max-age=" + (day*24*60*60);
	}
	document.cookie = cookie;
}

window.onload = function(){
//关闭顶部通知条，1天内不再显示
var ad = $("g-top")[0];
var close = $("j-close")[0];
if(getcookie().closead === "yes"){
	addClass(ad, "f-dn")
};
close.onclick = function(){
	addClass(ad, "f-dn");
	setcookie('closead', "yes", 1);
}

//关注登录
var fan = $("j-btn")[0];
var yet = $("u-btn-yes")[0];
var cancel = $("u-cancel")[0];
var number = $("j-num")[0];
var windows = $("m-log")[0];
var mask = $("m-mask")[0];
var closeLog = $("u-close")[0];
var error = $("u-error")[0];
var form = document.forms.logForm;
//关注改变函数
function changeFan(){
	addClass(fan, "f-dn");
	removeClass(yet, "f-dn");
	number.innerHTML=(parseInt(number.innerHTML)+1);
}
if (getcookie().followSuc === "yes") {
	changeFan();
}
//若有cookie缓存直接关注，粉丝加1，没有弹出窗口
fan.onclick = function(){
	if (getcookie().loginSuc === "yes") {
		changeFan();
		setcookie('followSuc', "yes", 365);
	}
	else{
		removeClass(windows, "f-dn");
		removeClass(mask, "f-dn");
	}
}
//取消关注
cancel.onclick = function(){
	removeClass(fan, "f-dn");
	addClass(yet, "f-dn");
	number.innerHTML=(parseInt(number.innerHTML)-1);
	setcookie("followSuc", "no",365);
}
//关闭登录窗口
function closeWindow(){
	addClass(windows, "f-dn");
	addClass(mask, "f-dn");
}
//点击关闭事件
closeLog.onclick = function(){
	closeWindow();
}

// //点击登录，设置cookie
// addEvent(log, 'click', function(event){
// 	closeWindow();
// 	changeFan();
// 	setcookie('loginSuc', "yes", 30);
// })


//轮播头图
var slide = $("j-sld");
var area = $("m-img")[0];
var dot = $("j-dot");
var slideIndex = 0,slideNext = 1;
//500ms淡入函数,先透明处理，再去掉不显示属性
function fadein(node) {
        node.setAttribute("style","opacity");
        node.style.opacity = 0;
        removeClass(node, "f-dn");
        var n = 0.04;
        var times = setInterval((function(){
            node.style.opacity = n;   
            n = n + 0.04;            
            if(n == 1){
                clearInterval(times);
            }
        }),20);
    }
//轮播执行函数
function startSlide(){
		addClass(slide[slideIndex], "f-dn");
		removeClass(dot[slideIndex], "z-crt");
		fadein(slide[slideNext]);
		addClass(dot[slideNext] ,"z-crt");
		slideIndex++;
		slideNext++;
		if (slideNext > 2) {slideNext = 0;}
		if (slideIndex > 2) {slideIndex = 0;}
}
var slideTime = setInterval(startSlide,5000);
//鼠标在区域悬停事件
area.onmouseover = function(){
	clearInterval(slideTime);
}
area.onmouseout = function(){
	slideTime = setInterval(startSlide,5000);
}
//圆点切换，这里没有用for循环，是因为for循环会出现一个延时bug
function dotSlide(n){
	addClass(slide[slideIndex], "f-dn");
	removeClass(dot[slideIndex], "z-crt");
	fadein(slide[n]);
	addClass(dot[n], "z-crt");
	slideIndex = n;
}
//为了保证多次切换图片，图片不会自己跳转，将click事件拆分为mousedown和mouseup
dot[0].onmousedown = function(){
	clearInterval(slideTime);
}
dot[0].onmouseup = function(){
	dotSlide(0);
	slideNext = 1;
	slideTime = setInterval(startSlide,5000);
}
dot[1].onmousedown = function(){
	clearInterval(slideTime);
}
dot[1].onmouseup = function(){
	dotSlide(1);
	slideNext = 2;
	slideTime = setInterval(startSlide,5000);
}
dot[2].onmousedown = function(){
	clearInterval(slideTime);
}
dot[2].onmouseup = function(){
	dotSlide(2);
	slideNext = 0;
	slideTime = setInterval(startSlide,5000);
}

//课程
// var course = '<div class="coursebox">' +
// 				'<div class="m-course f-cb">' + 
// 					'<div class="pic"><img src="' + obj.middlePhotoUrl + '"></div>' + 
// 					'<h3>' + obj.name + '</h3>' + 
// 					'<div class="pro">' + obj.provider + '</div>' +
// 					'<div class="num"><span></span><p>' + obj.learnerCount + '</p></div>' +
// 					'<div class="price">￥' + obj.price + '</div>' + 
// 				'</div>' + 
// 				'<div class="m-window f-cb f-dn">' + 
// 					'<div class="pic"><img src="' + obj.middlePhotoUrl + '"></div>' + 
// 					'<div class="ct">' + 
// 						'<h3>' + obj.name + '</h3>' + 
// 						'<div class="num"><span></span><p>' + obj.learnerCount + '人在学</p></div>' + 
// 						'<div class="pro">发布者:' + obj.provider + '</div>' + 
// 						'<div class="cate">分类:' + obj.categoryName + '</div>' +
// 					'</div>' + 
// 					'<div class="des">' + 
// 						'<p>' + obj.description + '</p>' + 
// 					'</div>' + 
// 				'</div>' + 
// 			'</div>'
// var hotCourse = '<li class="m-list">' + 
// 					'<div class="pic f-cb"><img src="' + obj.smallPhotoUrl + '"></div>' + 
// 					'<h4>' + obj.name + '</h4>' + 
// 					'<div class="num"><span></span><p>' + obj.learnerCount + '</p></div>' + 
// 				'</li>'
// for(var i = 1; i <= obj.totalPage; i++){
// 	var li = '';
// 	li += '<li>' + i + '<li>' ;
// }


//视频播放
var poster = $("m-poster")[0];
var video = $("m-video")[0];
var closeVideo = $("u-close")[1];
var videoPlay = document.getElementById("video");
poster.onclick = function(){
	removeClass(video, "f-dn");
	removeClass(mask, "f-dn");
	videoPlay.play();
}
closeVideo.onclick = function(){
	addClass(video, "f-dn");
	addClass(mask, "f-dn");
	videoPlay.pause();
}




// //ajax kang.js 
// function params(_data) {
// 	var _arr = [];
// 	for (var i in _data) {
// 		_arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(_data[i]));
// 	}
// 	return _arr.join('&');
// }
// function ajax(obj) {
// 	var xhr = new XMLHttpRequest();
// 	if(!obj.async) obj.async = true;                     
// 	if (typeof obj.data === 'object') obj.data = params(obj.data);    //处理传递参数，是对象就序列化

// 	if (obj.method === 'get') obj.url += obj.url.indexOf('?') === -1 ? '?' + obj.data : '&' + obj.data; //是get方法就将参数加到url

// 	function callback() {
// 		if (xhr.status == 200) {
// 			obj.success(xhr.responseText);			                 //回调传递参数
// 		} else {
// 			if(obj.fail) obj.fail(xhr.statusText);
// 		}	
// 	}
// 	if (obj.async === true) {
// 		xhr.onreadystatechange = function () {
// 			if (xhr.readyState == 4) {
// 				callback();
// 			}
// 		};
// 	}
// 	xhr.open(obj.method, obj.url, obj.async);
// 	if (obj.method === 'post') {
// 		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
// 		xhr.send(obj.data);	
// 	} else {
// 		xhr.send(null);
// 	}
// 	if (obj.async === false) {
// 		callback();
// 	}
// }
// form.submit.onclick = function(event){
// 	event = event || window.event;
// 	var userName = form.userName.value;
// 	var password = form.password.value;
// 	ajax({
// 		method:'get',
// 		url:'http://study.163.com/webDev/login.htm',
// 		data:'userName=' + md5(userName) + '&password' + md5(password),
// 		success:function(result){
// 			if (result == 1) {
// 				closeWindow();
// 				changeFan();
// 				setcookie('loginSuc', "yes", 30);
// 			}
// 			else{
// 				removeClass(error, "f-vh");
// 			}
// 		},
// 		fail:function(rex){}
// 	});
// 	event.target.blur();
// 	event.preventDafault();

// }



//课程浮窗
// var pic = $("pic");
// var classWindow = $("m-window");
// pic[0].onmouseover = function(){
// 	removeClass(classWindow[0],"f-dn");
// }
// classWindow[0].onmouseleave = function(){
// 	addClass(classWindow[0],"f-dn");
// }


//滚动
// var box = $("m-hotbox")[0];
// box.scrollTop = 0;
// var liHeight = 70;
// var speed = 10;
// var delay =5000;
// box.innerHTML += box.innerHTML;
// function startMove(){
// 	box.scrollTop++;
// 	times = setInterval(scrollUp,speed);
// }
// function scrollUp(){
// 	if (box.scrollTop % liHeight == 0) {
// 		clearInterval(times);
// 		setTimeout(startMove,delay);
// 	}
// 	else{
// 		box.scrollTop++;
// 		if(box.scrollTop >= box.scrollHeight/2){
// 			box.scrollTop = 0;
// 		}
// 	}
// }
// setTimeout(startMove,delay);






}
