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
