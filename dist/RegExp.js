/**
 * RegExp 对象扩展
*/
if(Object.isFunction(RegExp.prototype.match) === false){
	RegExp.prototype.match = RegExp.prototype.test;
}