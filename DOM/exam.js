//请写出以下DOM树对应的HTML
<div>
    <h3><a href="#">乔丹</a></h3>
    <p>NBA<em>最伟大</em>的球员</p>
</div>

/*网易博客“关于我”页面编辑生日时的日期级联下拉选择框
需求如下：
    “年”或“月”发生变化且为有效值时，“日”下拉选择框显示相应的项。
    “年”下拉选择框为初始状态（即值为0）时， “月”、“日”下拉选择框一定为初始状态（即值为0）。
    “月”下拉选择框为初始状态（即值为0）时， “日”下拉选择框一定为初始状态（即值为0）。*/
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>网易博客关于我</title>
</head>
<body>
    <form class="birthday" name="dayForm">
        <select name="year" id="year">
            <option value="0">--</option>
            <option value="1999">1999</option>
            <option value="2000">2000</option>
            <option value="2001">2001</option>
        </select>年
        <select name="month" id="month">
            <option value="0">--</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
        </select>月
        <select name="date" id="date">
            <option value="0">--</option>
        </select>日
    </form>
    <script type="text/javascript">
    //事件处理兼容
    function addEvent(node,event,handler){
        if (node.addEventListener){
            node.addEventListener(event,handler,false);
        }else{
            node.attachEvent('on'+event,handler);
        }
    }
    //获取节点
    var year = document.getElementById('year');
    var month = document.getElementById('month');
    var date = document.getElementById('date');
    //保证不能直接选取月份倒序删除所有月份
    for(var i = 12; i > 0; i--){
        month.remove(i);
    }
    //改变年份事件
    addEvent(year,'change',function(event){
    	for(var i = 12; i > 0; i--){
            month.remove(i);
        }
        //日期最多为31天，当年份无值时，删除日期选项
        for(var i = 31; i > 0; i--){
            date.remove(i);
        }
        //当月份为有效值，添加12个月份
        if (year.value != 0) {
            for(var i = 1; i < 13; i++){
                var option = document.createElement('option');
                option.appendChild(document.createTextNode(i));
                option.setAttribute('value', i);
                month.appendChild(option);
            }
        }
    });
    //根据所选年份和月份确定天数的值
    function dayNumber(){
        if ( year.value !== 0){
            var yearSelect = year.value; 
        }
        if (month.value !== 0) {
            var monthSelect = month.value;
        }
        var dayNum = new Date(yearSelect, monthSelect, 0);
        var num = dayNum.getDate();
        return num;
    }
    //改变月份事件
    addEvent(month, 'change', function(event){
        for(var i = 31; i > 0; i--){
            date.remove(i);
        }
        //当月份为有效值时，根据月份的选择，添加相应的天数
        if(month.value != 0){
            var num = dayNumber();
            for(var i = 1; i < num+1; i++){
                var option = document.createElement('option');
                option.appendChild(document.createTextNode(i));
                option.setAttribute('value', i);
                date.appendChild(option);
            }
        }
    })
    </script>
</body>
</html>
