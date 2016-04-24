//test1
function type(obj){
  		var types= Object.prototype.toString.call(obj).slice(8,-1)
  		return types.toLowerCase();
};
