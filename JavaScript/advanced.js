//实现type函数用于识别标准类型和内置对象类型
function type(obj) {
	return Object.prototype.toString.call(obj).slice(8,-1).toLowerCase();
}

//Object.create的兼容实现
function objCreate(proto){
	if(proto==null){
		throw typeError();
	}
	else if (Object.create) {
		return Object.create(proto);
	}
	else {
		var p=typeof proto;
		if (p!=="object" && p!=="function") {
			throw typeError();
		}
		else{
			function f(){};
			f.prototype=proto;
			return new f();
		}
	}
}

//兼容低版本浏览器的bind方法
if(!Function.prototype.bind){
		Function.prototype.bind=function(obj){
			var self=this,argNum=arguments;
			return function(){
				var args=[];
				for(var i=0;i<argNum.length;i++){
					args.push(argNum[i]);
				}
				for(var i=0;i<arguments.length;i++) {
					args.push(arguments[i]);
				}
				return self.apply(obj,args);
			};
		};
	}
}

//斐波那契数列
function fibonacci(x) {
	if(x==0) return 0;
	if(x==1) return 1;
	return fibonacci(x-1)+fibonacci(x-2);
}
