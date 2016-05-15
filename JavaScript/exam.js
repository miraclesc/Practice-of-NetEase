//函数myType用于根据输入参数返回相应的类型信息
function myType(param) {
	return Object.prototype.toString.call(param).slice(8,-1).toLowerCase();
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
	pattern=pattern.replace(/yyyy/,date.getFullYear());
	pattern=pattern.replace(/MM/,date.getMonth()+1);
	pattern=pattern.replace(/dd/,date.getDate());
	pattern=pattern.replace(/HH/,date.getHours());
	pattern=pattern.replace(/mm/,date.getMinutes());
	pattern=pattern.replace(/ss/,date.getSeconds());
	return pattern;
}
