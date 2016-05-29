//实现getElementsByClassName方法，要求浏览器兼容。
function getElementsByClassName(element, names) {
    if (element.getElementsByClassName) {
        return element.getElementsByClassName(names);}
    else {
        var elements = element.getElementsByTagName('*');
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

//函数getCookies()解析document.cookie， 并返回一个对象， 该对象的属性名为cookie的name，属性值为cookie的value。
function getcookie () {
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

//函数fadeout(element)实现了元素的淡出效果（即透明度从1变到0），动画时间为1秒钟。用定时器setInterval实现动画
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Document</title>
<style type="text/css">
	#image{width:500px;height:500px;background-color:red;}
</style>
</head>
<body>
<div id="image"></div>
<script type="text/javascript">
	var image = document.getElementById('image');
	function fadeout(element) {
		element.setAttribute("style","opacity");
		var n = 1;	                     //初始透明度为1
		var times = setInterval((function(){
			element.style.opacity = n;   //改变图片的透明度
			n = n - 0.02;		     //当透明度差值为0.02时可以实现流畅的过度
			if(n == 0){
				clearInterval(times); //当透明度降到0时停止
			}
		}),20);	                           //每0.02秒调用一次递减函数，稍大于屏幕刷新时间
	}
	fadeout(image);         //为了直观，进入后图片就可以进行透明度改变
</script>
</body>
</html>
