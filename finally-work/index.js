//定义一些通用函数
//获取文档下节点兼容
function $(selector){
   return document.querySelectorAll(selector);
}
//添加类名
function addClass(node,className){
	var current = node.className || "";
	if ((" " + current + " ").indexOf(" " + className + " ") === -1) {
		node.className = current? ( current + " " + className ) : className;
	}
}
//删除类名
function removeClass(node,className){
	var current = node.className || "";
	node.className = (" " + current + " ").replace(" " + className + " ", " ").trim();
}
//获取cookie值
function getcookie(){
	var cookie = {};
	var all = document.cookie;
	if (all === '')
	    return cookie;
	var list = all.split('; ');
	for (var i = 0, len = list.length; i < len; i++) {
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
//Ajax
function ajax(obj){
	var xhr = new XMLHttpRequest();
	if (!obj.async)
		obj.async = true;
	//解决查询字符串格式问题
	function params(data) {
		var array = [];
		for (var i in data) {
			array.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
		}
		return array.join('&');
	}
	if (typeof obj.data === 'object')
		obj.data = params(obj.data);
	if (obj.method === 'get'){
		obj.url += (obj.url.indexOf('?') == -1 ? '?' + obj.data : '&' + obj.data);
	}
	//回调函数
	function callback(){
		if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
			obj.success(xhr.responseText);
		}
	}
	if (obj.async === true){
		xhr.onreadystatechange = function(){
			if (xhr.readyState == 4){
				callback();
			}
		};
	}
	else callback();	
	//解决CORS跨域兼容问题，并开启open方法
	if ('withCredentials' in xhr){
		xhr.open(obj.method, obj.url, obj.async);
	}
	else if (typeof XDomainRequest != 'undefined'){
		xhr = new XDomainRequest();
		xhr.open(obj.method, obj.url);
	}
	else {
		xhr = null;
	}
	//post情况，并开启send方法
	if (obj.method === 'post'){
		xhr.setRequestHeader(obj.header, obj.value);
		xhr.send(obj.data);
	}
	else {
		xhr.send(null);
	}
}


window.onload = function(){

//关闭顶部通知条，3天内不再显示
var ad = $('.g-top')[0];							//通知条
var adClose = $('.z-close')[0];							//关闭通知条按钮
if (getcookie().close !== 'true'){
	removeClass(ad, 'f-dn')
};
adClose.onclick = function(){
	addClass(ad, 'f-dn');
	setcookie('close', 'true', 3);
}

//关注与登录
var attention = $('.j-btn')[0];							//关注按钮
var tips = $('.u-tips')[0];							//已关注按钮
var cancel = $('.u-cancel')[0];							//取消关注按钮
var fans = $('.j-fans')[0];							//粉丝数量
var logWindow = $('.m-log')[0];							//登录窗口
var mask = $('.m-mask')[0];							//遮罩层
var logClose = $('.z-close')[1];						//关闭登录窗口按钮
var error = $('.z-err')[0];							//错误提示
var iptErr = $('.j-err')[0];							//密码错误提示
var iptNone = $('.j-none')[0];							//有未填项提示
var form = document.forms.logForm;						//表单
//增加和取消关注函数
function addFan(){
	addClass(attention,'f-dn');
	removeClass(tips,'f-dn');
	fans.innerHTML = (parseInt(fans.innerHTML)+1);
}
function delFan(){
	removeClass(attention,'f-dn');
	addClass(tips,'f-dn');
	fans.innerHTML = (parseInt(fans.innerHTML)-1);
}
//打开和关闭登录窗函数
function openLog(){
	removeClass(logWindow,'f-dn');
	removeClass(mask,'f-dn');	
}
function closeLog(){
	addClass(logWindow,'f-dn');
	addClass(mask,'f-dn');
}
//错误提示函数
function inputErr(){
	removeClass(error,'f-vh');
	removeClass(iptErr,'f-dn');
	addClass(iptNone,'f-dn');
}
function inputNone(){
	removeClass(error,'f-vh');
	addClass(iptErr,'f-dn');
	removeClass(iptNone,'f-dn');
}
function closeError(){
	addClass(error,'f-vh');
	removeClass(iptErr,'f-dn');
	addClass(iptNone,'f-dn');
}
//检查是否已关注
if (getcookie().followSuc == 'true'){
	ajax({
		method:'get',
		url:'http://study.163.com/webDev/attention.htm',
		success:function(res){
			if(res == 1) {
				addFan();
			}
		}
	})
}
//若有已登录cookie缓存直接关注，没有弹出窗口
attention.onclick = function(){
	if (getcookie().loginSuc == 'true'){
		addFan();
		setcookie('followSuc','true',365);
	}
	else {
		removeClass(logWindow,'f-dn');
		removeClass(mask,'f-dn');
	}
}
//提条表单
form.submit.onclick = function(){
	var user = form.userName.value;
	var pass = form.password.value;
	if (user == '' || pass == ''){
		inputNone();
	}
	else {
		ajax({
			method:'get',
			url:'http://study.163.com/webDev/login.htm',
			data:{
				userName:hex_md5(user),
				password:hex_md5(pass)
			},
			success:function(res){
				if (res == 1) {
					setcookie('loginSuc','true',365);
					closeLog();
					addFan();
					setcookie('followSuc','true',365);
				}
				else {
					inputErr();
				}
			}
		})
	}
}
form.userName.onfocus = function(){
	closeError();
}
form.password.onfocus = function(){
	closeError();
}
//取消关注
cancel.onclick = function(){
	delFan();
	setcookie('followSuc','false',365);
}
//关闭登录窗口
logClose.onclick = function(){
	form.userName.value = '';
	form.password.value = '';
	closeError();
	closeLog();
}

//轮播头图
var area = $('.m-img')[0];							//轮播整个区域
var slide = $('.j-sld');							//轮播每张图片
var dot = $('.j-dot');								//可点击圆点
var slideIndex = 0;								//当前图片序号
var slideNext = 1;								//下一张图片序号
var slideDelay = 5000;								//轮播延时
var fadeDelay = 500;								//淡入时间
var slideNum = slide.length;							//图片数量
function fadein(node,ele){
    node.style.opacity = 0;
    removeClass(node, 'f-dn');
    addClass(ele,'z-crt')
    var n = step = 20/fadeDelay;
    var timer = setInterval((function(){
        node.style.opacity = n;
        node.style.filter = 'alpha(opacity=' + n * 100 + ')';  
        n += step;            
        if(n >= 1){
            clearInterval(timer);
        }
    }),20);
}
function slideOut(node,ele){	
    addClass(node,'f-dn');
	removeClass(ele,'z-crt');
}
function slideStart(){
	slideOut(slide[slideIndex],dot[slideIndex]);
	fadein(slide[slideNext],dot[slideNext]);
	slideIndex++;
	slideNext++;
	if (slideIndex > slideNum - 1) slideIndex = 0;
	if (slideNext > slideNum - 1) slideNext = 0;
}
//轮播执行函数
var slideTime = setInterval(slideStart,slideDelay);
//鼠标在区域悬停事件
area.onmouseover = function(){
	clearInterval(slideTime);
}
area.onmouseleave = function(){
	slideTime = setInterval(slideStart,slideDelay);
}
//为了保证多次切换图片，图片不会自己跳转，将click事件拆分为mousedown和mouseup事件
for (var i = 0, len = dot.length; i < len; i++){
	dot[i].onmousedown = function(){
			clearInterval(slideTime);
	}
	dot[i].onmouseup = (function(index){
		return function(){
			slideOut(slide[slideIndex],dot[slideIndex]);
			fadein(slide[index],dot[index]);
			slideIndex = index;
			if (slideIndex > slideNum - 1) slideIndex = 0;
			slideNext = slideIndex + 1;
			if (slideNext > slideNum - 1) slideNext = 0;
			slideTime = setInterval(slideStart,slideDelay);		
		};
	}(i));	
}

//课程
var width = window.innerWidth;							//浏览器窗口宽度
if (width >= 1205){
	_psize = 20;										
} else _psize = 15;								//根据浏览器窗口宽度返回每页数据个数
var _pageNo = 1;								//当前页码
var _type = 10;									//筛选类型
loadCourse(_pageNo,_psize,_type);						//载入课程
var classbox = $('.m-cbox')[0];							//载入课程的区域
var design = $('.j-tab')[0];							//产品设计按钮
var programming = $('.j-tab')[1];						//编程语言按钮
var pre = $('.u-pre')[0];							//上一页按钮
var page = $('.j-page');							//页数按钮
var next = $('.u-next')[0];							//下一页按钮
//加载课程函数
function loadCourse(_pageNo,_psize,_type){
	function showCourse(obj){
		return '<div class="m-mbox">' +
					'<div class="m-cur f-cb">' + 
						'<div class="pic1"><img src="' + obj.middlePhotoUrl + '"></div>' + 
						'<h3>' + obj.name + '</h3>' + 
						'<div class="pro">' + obj.provider + '</div>' +
						'<div class="num"><span></span><p>' + obj.learnerCount + '</p></div>' +
						'<div class="price">￥' + obj.price + '</div>' + 
					'</div>' + 
					'<div class="m-air f-cb f-dn">' + 
						'<div class="pic2 f-cb"><img src="' + obj.middlePhotoUrl + '"></div>' + 
						'<div class="ct f-cb">' + 
							'<h3>' + obj.name + '</h3>' + 
							'<div class="num"><span></span><p>' + obj.learnerCount + '人在学</p></div>' + 
							'<div class="pro">发布者:' + obj.provider + '</div>' + 
							'<div class="cate">分类:' + obj.categoryName + '</div>' +
						'</div>' + 
						'<div class="des">' + 
							'<p>' + obj.description + '</p>' + 
						'</div>' + 
					'</div>' + 
				'</div>'
	}
ajax({
		method:'get',
		url:'http://study.163.com/webDev/couresByCategory.htm',
		data:{
			pageNo:_pageNo,
			psize:_psize,
			type:_type
		},
		success:function(res){
			var text = JSON.parse(res);
			var list = text.list;
			//先清空再添加课程
			classbox.innerHTML = "";
			for (var i = 0, len = list.length; i < len; i++){
				classbox.innerHTML += showCourse(list[i]);
			}
			//注册鼠标悬停出现浮窗事件			
			var pic = $('.pic1');
			var air = $('.m-air');
			for (var i = 0, len = list.length; i < len; i++){
    			pic[i].onmouseover = (function(index){
        			return function(){
            			removeClass(air[index],'f-dn');
       				 };
   				}(i));
    			air[i].onmouseleave = (function(index){
        			return function(){
            			addClass(air[index],'f-dn');
       				 };
   				}(i));
			}
		}
	})
}
//页面与页码变化函数
function changePage(pagePre,pageload,pageNext){
	removeClass(pagePre,'z-crt');
	loadCourse(pageload,_psize,_type);
	addClass(pageNext,'z-crt');
}
//tab切换
programming.onclick = function(){
	removeClass(design,'z-crt');
	addClass(programming,'z-crt');
	_type = 20;
	changePage(page[_pageNo-1],1,page[0]);
	_pageNo = 1;
}
design.onclick = function(){
	removeClass(programming,'z-crt');
	addClass(design,'z-crt');
	_type = 10
	changePage(page[_pageNo-1],1,page[0]);
	_pageNo = 1;
}
//翻页器
pre.onclick = function(){
	if (_pageNo == 1) return;
	else {
		_pageNo--;
		changePage(page[_pageNo],_pageNo,page[_pageNo-1]);
	}
}
next.onclick = function(){
	if (_pageNo == 8) return;
	else {
		_pageNo++;		
		changePage(page[_pageNo-2],_pageNo,page[_pageNo-1]);
	}
}
for (var i = 0; i < 8; i++){
	page[i].onclick = (function(index){
		return function(){
			changePage(page[_pageNo-1], index+1, page[index]);
			_pageNo = index + 1;
		};
	}(i));
}

//视频播放
var poster = $('.m-poster')[0];							//封面图片按钮
var video = $('.m-video')[0];							//视频窗口
var videoClose = $('.z-close')[2];						//关闭视频窗口按钮
var videoPlay = document.getElementById('video');				//播放视频
//播放视频
poster.onclick = function(){
	removeClass(video, 'f-dn');
	removeClass(mask, 'f-dn');
	videoPlay.play();
}
//退出播放
videoClose.onclick = function(){
	addClass(video,'f-dn');
	addClass(mask,'f-dn');
	videoPlay.pause();
}

//热门排行
var box = $('.m-hbox')[0];							//存放可显示列表区域
var listbox = $('.j-list')[0];							//插入列表位置	
var liHeight = 70;								//每个列表高度
var speed = 10;									//滚动速度
var scrollDelay = 5000;								//滚动延时时间
//加载排行课程
function loadHot(){
	function showHot(obj){
		return '<li class="m-list">' + 
					'<div class="pic3 f-cb"><img src="' + obj.smallPhotoUrl + '"></div>' + 
					'<h4>' + obj.name + '</h4>' + 
					'<div class="num"><span></span><p>' + obj.learnerCount + '</p></div>' + 
				'</li>'
	}
	ajax({
		method:'get',
		url:'http://study.163.com/webDev/hotcouresByCategory.htm',
		success:function(res){
			var text = JSON.parse(res);
			//载入两遍，保证可以无缝滚动
			for (var i = 0, len = text.length; i < len; i++){
				listbox.innerHTML += showHot(text[i]);
			}
			for (var i = 0, len = text.length; i < len; i++){
				listbox.innerHTML += showHot(text[i]);
			}
		}
	})
}
loadHot();
//课程滚动
function startMove(){
	box.scrollTop++;
	times = setInterval(scrollUp,speed);
}
function scrollUp(){
	if (box.scrollTop % liHeight == 0){
		clearInterval(times);
		setTimeout(startMove,scrollDelay);
	}
	else {
		box.scrollTop++;
		if(box.scrollTop >= box.scrollHeight/2){
			box.scrollTop = 0;
		}
	}
}
setTimeout(startMove,scrollDelay);

}
