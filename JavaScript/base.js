//生成0-999之间的随机整数
var number = Math.floor(Math.random()*1000);

/*函数parseQuery用于解析url查询参数
语法如下：
	var obj = parseQuery(query)
	query是被解析的查询参数，函数返回解析后的对象。
使用范例如下：
	var jerry = parseQuery("name=jerry&age=1");
	jerry; 	返回值：{name: " jerry ", age: "1"}
	var tom = parseQuery("name= tom &age=12&gender&");
	tom; 	返回值：{name: "tom", age: "12", gender: ""}
*/
var parseQuery = function(query){
    var arr = /([^=&\s]+)[=\s]*([^=&\s]*)/g;
    var obj = {};
    while(arr.exec(query)){
        obj[RegExp.$1] = RegExp.$2;
    }
    return obj;
}
	
//函数multiply用于计算多个数字的乘积
function multiply(){
	var mul=1;
	for (var i = 0; i < arguments.length; i++) {
		mul=mul*arguments[i];
}	
	return mul;
};
	
/*构造函数Person用于构造人，语法如下：
function Person(name, age){
	 函数体
}
使用范例如下：
	var jerry = new Person("Jerry", 2);
	jerry.introduce();		返回值： "I am Jerry, I am 2 years old! "
var tom = new Person("Tom", 12);
	tom.introduce();		返回值： "I am Tom, I am 12 years old! "
*/
function Person(name,age) {
	this.name="\"I am "+name+", ";
	this.age="I am "+age+" years old!\""
};
Person.prototype.introduce=function(){
	return this.name+this.age;
};		
  
/*函数escapeHTML用于转义html字符串中的特殊字符(<>"&)。
语法如下：
	var escapedStr = escapeHTML(htmlStr);
使用范例如下：
	escapeHTML('<div>Tom&Jerry</div> '); 		
	返回值：
		'&lt;div&gt;Tom&amp;Jerry&lt;/div&gt; '
	escapeHTML('<input type="text" name="mobile"> '); 		
	返回值：
		'&lt;inputtype=&quot;text&quot; name=&quot;mobile&quot;&gt; '
*/
 function escapeHTML(htmlStr){
	htmlStr=htmlStr.replace(/(<|>|\"|\s)/g,function(htmls){
		switch(htmls) {
			case "<":
				return '&lt;';
			case ">":
				return '&gt;';
			case "\"":
				return '&quot;';
			case "\s":
				return '';
				
		}
	});
	return htmlStr;
};
