//test1
var number = Math.floor(Math.random()*1000);

//test2
	var parseQuery = function(query){
	    var arr = /([^=&\s]+)[=\s]*([^=&\s]*)/g;
	    var obj = {};
	    while(arr.exec(query)){
	        obj[RegExp.$1] = RegExp.$2;
	    }
	    return obj;
}
/*var jerry = parseQuery("name=jerry&age=1");
console.log(jerry);
var tom = parseQuery("name= tom &age=12&gender&");
console.info(tom);*/
	
//test3
		function multiply(){
		var mul=1;
		for (var i = 0; i < arguments.length; i++) {
		
			mul=mul*arguments[i];

		}
		return mul;
	};
	
	//test4
	function Person(name,age) {
		this.name="\"I am "+name+", ";
		this.age="I am "+age+" years old!\""
	};
	Person.prototype.introduce=function(){
		return this.name+this.age;
	};		
	/*var jerry = new Person("Jerry", 2);
	console.log(jerry.introduce());
	var tom = new Person("Tom", 12);
  console.log(tom.introduce());*/
  
//test5
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
	// var escapedStr1 = escapeHTML('<div>Tom&Jerry</div>');
	// console.log(escapedStr1);
	// var escapedStr2 = escapeHTML('<input type="text" name="mobile">');
	// console.log(escapedStr2);
