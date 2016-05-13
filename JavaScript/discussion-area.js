//获取一个大于等于0且小于等于9的随机整数
var m=Math.floor(Math.random()*10);

//去除一个字符串的第一个字符
str.substring(1);
str.slice(1);
str.substr(1);
str.replace(str.charAt(0),"");
str.replace(/^./,"");

//对一个数组（每项都是数值）求和
//方法一: 
var sum=0;
for(var i=0;i<array.length;i++){
    sum+=array[i];
};
//方法二: 
var sum=0;
arr.forEach(function(value){sum+=value;});
//方法三: 
var sum=array.reduce(function(x,y){return x+y},0);
