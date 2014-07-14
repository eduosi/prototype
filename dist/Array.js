/**
 * Array 对象扩展
*/
Class.extend(Array.prototype, (function(){
	/**
	 * 判断元素是否在数组中
	 *
	 * @param item 查找对象
	 * @return boolean
	*/
	function exists(item){
		return this.indexOf(item) != -1;
	}

	/**
	 * 获取一个元素
	 *
	 * @return 第一个元素
	*/
	function first(){
		return this[0];
	}

	/**
	 * 获取最后一个元素
	 *
	 * @return 最后一个元素
	*/
	function last(){
		return this[this.length - 1];
	}

	/**
	 * 数组迭代
	 *
	 * @param iterator 迭代器
	*/
	function each(iterator){
		for(var i = 0; i < this.length; i++){
			iterator(i, this[i]);
		}
	}

	/**
	 * 获取数组大小
	 *
	 * @return 数组大小
	*/
	function size(){
		return this.length;
	}

	/**
  	 * 将数组 JSON 编码
  	 *
  	 * @return 编码后的字符串
  	*/
	function toJSON(){
		var results = [];

    	this.forEach(function(value){
      		var val = Object.toJSON(value);
      		if(Object.isUndefined(val) == false){
      			results.push(val);
      		}
    	});

    	return "[" + results.join(", ") + "]";
	}

	/**
	 * 清空数组
	 *
	 * @return 空数组
	*/
	function clear(){
		this.length = 0;
		return this;
	}

	/**
	 * 克隆数组
	 *
	 * @return 克隆结果
	*/
	function clone(){
		return this.slice(0);
	}

	return {
		exists: 		exists, 
		inArray: 		exists, 
		first: 			first, 
		last: 			last, 
		each: 			each, 
		size: 			size, 
 		toJSON: 		toJSON, 
		clear: 			clear, 
		clone:			clone
	};
})());
if(Object.isFunction(Array.prototype.forEach) === false){
	/**
	 * 数组迭代
	 *
	 * @param iterator 迭代器
	*/
 	Array.prototype.forEach = function(iterator){
 		for(var i = 0; i < this.length; i++){
 			iterator(this[i]);
 		}
 	}
}
if(Object.isFunction(Array.prototype.indexOf) === false){
	/**
	 * 检索元素第一次出现的位置
	 *
	 * @param item 元素
	 * @param fromindex 可选的整数参数。规定在数组中开始检索的位置。它的合法取值是 0 到 array.length - 1。如省略该参数，则将从数组的第一个元素开始检索。
	 * @return 元素首次出现的位置。如果未检索到元素，则返回 -1
	*/
	Array.prototype.indexOf = function(item, fromindex){
		fromindex = isNaN(fromindex) == true ? 0 : (fromindex < 0 ? this.length + fromindex : fromindex);
    	for(; fromindex < this.length; fromindex++){
    		if(this[fromindex] === item){
    			return fromindex;
    		}
    	}
      
    	return -1;
	}
}
if(Object.isFunction(Array.prototype.lastIndexOf) === false){
	/**
	 * 检索元素最后一次出现的位置
	 *
	 * @param item 元素
	 * @param fromindex 可选的整数参数。规定在数组中开始检索的位置。它的合法取值是 0 到 array.length - 1。如省略该参数，则将从数组的最后一个元素开始检索。
	 * @return 元素最后次出现的位置。如果未检索到元素，则返回 -1
	*/
 	Array.prototype.lastIndexOf = function(item, fromindex){
 		fromindex = isNaN(fromindex) == true ? this.length : (fromindex < 0 ? this.length + fromindex : fromindex) + 1;
    	var n = this.slice(0, fromindex).reverse().indexOf(item);
    	return n < 0 ? n : fromindex - n - 1;
 	}
}
if(Object.isFunction(Array.prototype.concat) === false){
	/**
	 * 数组连接
	 *
	 * @param ... 数组
	 * @return 连接后的数组
	*/
 	Array.prototype.concat = function(){
 		var item, result = this.slice(0);

		for(var i = 0; i < arguments.length; i++){
			item = arguments[i];
			if(Object.isArray(item)&&!('callee' in item)){
				for(var j = 0; j < item.length; j++){
					result.push(item[j]);
				}
			}else{
				result.push(item);
			}
		}

		return result;
 	}
}
if(Object.isFunction(Array.prototype.merge) === false){
	Array.prototype.merge = Array.prototype.concat;
}