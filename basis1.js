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
