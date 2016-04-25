//circle
function Circle(r){
	this.r=r;
}
Circle.prototype.pre= function() {
	return (2*Math.PI*this.r).toFixed(2);
}
Circle.prototype.area= function() {
	return (Math.PI*Math.pow(this.r,2)).toFixed(2);
};
var circle=new Circle(6);
console.log(circle.pre());
console.log(circle.area());



//test1
function type(obj){
  		var types= Object.prototype.toString.call(obj).slice(8,-1)
  		return types.toLowerCase();
};
