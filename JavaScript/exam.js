//函数myType用于根据输入参数返回相应的类型信息
/*myType (1);		返回值： "number"
	myType (false);		返回值： "boolean"
	myType ({});		返回值： "object"
	myType ([]);		返回值：" Array"
	myType (function(){});	返回值："function"
	myType (new Date());	返回值： "Date"*/
function myType(param){
if(typeof param=="object"){
	if((Object.prototype.toString.call(param).slice(8,-1))=="Object") return "object";
	else if return Object.prototype.toString.call(param).slice(8,-1);
 	else return typeof param;
 }

/*函数search用于在一个已排序的数字数组中查找指定数字。
语法如下：
	var index = search(arr, dst);
	var arr = [1, 2, 4, 6, 7, 9, 19,20, 30, 40, 45, 47];
	search(arr, 45);		返回值： 10
不使用Array的原型方法，且算法时间复杂度低于O(n)。
*/
function search(arr,dst) {
	//采用折半查找降低时间复杂度
	var low=1, high=arr.length, mid;
	while (low<=high) {
		mid=Math.floor((low+high)/2);
		if(arr[mid]==dst) return mid;     /*查找成功*/
		else if(dst<arr[mid]) high=mid-1; /*在前半区继续查找*/
		else low=mid+1;                   /*在后半1区继续查找*/
	}
	return -1;
}

/*函数formatDate用于将日期对象转换成指定格式的字符串，语法如下：
	var str = formatDate(date, pattern);
	其中pattern的全格式为"yyyy-MM-dd HH:mm:ss"
使用范例如下：
	var date = new Date(2001, 8, 11, 8, 26, 8);
	formatDate(date, "yyyy");		返回值： "2001"
	formatDate(date, "yyyy-MM-dd");	    返回值： "2001-09-11"
	formatDate(date, "yyyy-MM-dd HH");		返回值： "2001-09-11 08"
*/
function formatDate(date,pattern){
	pattern=pattern.replace(/yyyy/,ADD(date.getFullYear()));
	pattern=pattern.replace(/MM/,ADD(date.getMonth()+1));
	pattern=pattern.replace(/dd/,ADD(date.getDate()));
	pattern=pattern.replace(/HH/,ADD(date.getHours()));
	pattern=pattern.replace(/mm/,ADD(date.getMinutes()));
	pattern=pattern.replace(/ss/,ADD(date.getSeconds()));
	function ADD(num) {
      if ( num < 10)  {
        return  "0" + num;
      } else{
        return num
      };
      //时间不足2位数的时候前面添加0
    }
	return pattern;
}
