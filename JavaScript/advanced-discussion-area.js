//复制一个对象
var obj1;
var s = JSON.stringify(obj1);
var obj2 = JSON.parse(s);

//识别类型的方法
//1
function type(obj){
return Object.prototype.toString.call(obj).slice(8,-1)
};
//2 
function Type(obj){
(obj===undefined||obj===null)?obj:(obj.constructor && obj.constructor.toString().match(/function\s*([^(]*)/)[1]);
};

//实现一个Circle类
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
