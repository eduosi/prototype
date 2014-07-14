/*!
 * Prototype JavaScript Library v0.0.1
 * http://prototype.buession.com/
 *
 * Copyright @ 2014 Buession.com Inc.
 * Released under the Apache 2.0 License
 * http://prototype.buession.com/License
 */

var Prototype = {
 	version: "0.0.1",

 	emptyFunction: function(){
 	},

 	K: function(x){
 		return x;
 	}
};

var Try = {
 	/**
 	 *
 	 *
 	 * @return mixed
 	*/
  	these: function(){
    	var result;

    	for(var i = 0; i < arguments.length; i++){
    		var lambda = arguments[i];
      		try{
        		result = lambda();
        		break;
      		}catch(e){
      		}
    	}

    	return result;
  	}
};

var Class = {
 	extend: function(destination, source){
		if(typeof source == "object"){
			for(property in source){
				destination[property] = source[property];
			}
		}
		return destination;
 	}
};

/**
 * Object 扩展
*/
(function(){
 	var class2types = ["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Object", "Error"];
 	var class2type = {};

 	for(var i in class2types){
 		class2type["[object "+class2types[i]+"]"] = class2types[i].toLowerCase();
 	}

 	/**
 	 * 获取对象数据类型
 	 *
 	 * @param obj 对象变量
 	 * @return 对象数据类型
 	*/
 	function type(obj){
 		if(obj == null){
			return obj + "";
		}

		return typeof obj === "object"||typeof obj === "function" ? class2type[class2type.toString.call(obj)]||"object" : typeof obj;
 	}

 	/**
 	 * 判断对象是否为 object 类型
 	 *
 	 * @param obj 任意对象
 	 * @return boolean
 	*/
 	function isObject(obj){
 		return type(obj) == "object";
 	}

 	/**
 	 * 判断对象是否为函数
 	 *
 	 * @param obj 任意对象
 	 * @return boolean
 	*/
 	function isFunction(obj){
 		return type(obj) == "function";
 	}

 	/**
 	 * 判断对象是否为数组
 	 *
 	 * @param obj 任意对象
 	 * @return boolean
 	*/
 	function isArray(obj){
 		return type(obj) == "array";
 	}

 	/**
 	 * 判断对象是否为字符串对象
 	 *
 	 * @param obj 任意对象
 	 * @return boolean
 	*/
 	function isString(obj){
 		return type(obj) == "string";
 	}

 	/**
 	 * 判断对象是否为数字对象
 	 *
 	 * @param obj 任意对象
 	 * @return boolean
 	*/
 	function isNumeric(obj){
 		return type(obj) == "number";
 	}

 	/**
 	 * 判断对象是否为布尔对象
 	 *
 	 * @param obj 任意对象
 	 * @return boolean
 	*/
 	function isBoolean(obj){
 		return type(obj) == "boolean";
 	}

 	/**
 	 * 判断对象是否为 null 对象
 	 *
 	 * @param obj 任意对象
 	 * @return boolean
 	*/
 	function isNull(obj){
 		return type(obj) == "null";
 	}

 	/**
 	 * 判断对象是否为未定义
 	 *
 	 * @param obj 任意对象
 	 * @return boolean
 	*/
 	function isUndefined(obj){
 		return type(obj) == "undefined";
 	}

 	/**
 	 * 判断对象是否为空对象
 	 *
 	 * @param obj 任意对象
 	 * @return boolean
 	*/
 	function isEmpty(obj){
 		if(!!obj === true){
			for(var property in obj){
 				return false;
 			}
 		}

 		return true;
 	}

 	function isElement(object){
    	return !!(object&&object.nodeType == 1);
  	}

 	/**
 	 * 判断对象是否为 windows 对象
 	 *
 	 * @param obj 任意对象
 	 * @return boolean
 	*/
 	function isWindow(obj){
 		return obj != null&&obj == obj.window;
 	}

 	/**
 	 * 对变量进行 JSON 编码
 	 *
 	 * @param object 变量
 	 * @return 编码后的字符串
 	*/
 	function toJSON(object){
 		var type = typeof object;

 		if(type == "function"||type == "undefined"||type == "unknown"){
      		return;
    	}

    	if(object === null){
    		return "null";
    	}

    	if(Object.isFunction(object.toJSON) == true){
    		return object.toJSON();
    	}

    	if(isElement(object) == true){
    		return;
    	}

    	var results = [];

    	for(var property in object){
      		var value = toJSON(object[property]);
      		if(!isUndefined(value)){
      			results.push(property.toJSON() + ': ' + value);
      		}
        }

    	return "{" + results.join(", ") + "}";
 	}

 	Class.extend(Object, {
 		type:			type, 
 		isObject: 		isObject, 
 		isFunction: 	isFunction, 
 		isArray: 		isArray, 
 		isString:   	isString, 
 		isNumeric: 		isNumeric, 
 		isBoolean: 		isBoolean, 
 		isNull: 		isNull, 
 		isUndefined: 	isUndefined, 
 		isEmpty: 		isEmpty, 
 		isWindow: 		isWindow, 
 		toJSON: 		toJSON
 	});
})();

/**
 * Function 对象扩展
*/
Class.extend(Function.prototype, (function(){
	var _slice = Array.prototype.slice;

	function update(array, args){
    	var array_length = array.length,
			args_size = args.length;

    	while(args_size--){
    		array[array_length + args_size] = args[args_size];
    	}

    	return array;
  	}

	/**
	 * 获取函数参数名称
	 *
	 * @return 函数参数名称列表
	*/
	function argumentNames(){
		var names = this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1].replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, "").replace(/\s+/g, "").split(", ");
		return names.length == 1&&!names[0] ? [] : names;
	}

  	/**
  	 * 延时执行函数
  	 *
  	 * @param timeout 延时时间（单位：秒）
  	 * @return mixed
  	*/
  	function delay(timeout){
    	var __method = this,
			args = _slice.call(arguments, 1);

    	return window.setTimeout(function(){
      		return __method.apply(__method, args);
    	}, parseInt(timeout) * 1000);
  	}

  	return {
		argumentNames:	argumentNames, 
  		delay:			delay
  	};
})());

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

/**
 * String 对象扩展
*/
(function(){
 	/**
 	 * 生成随机字符串
 	 *
 	 * @param length 生成字符串的长度
 	 * @param type 生成类型
 	 *        NUMERIC 		 - 数字随机字符串
 	 *		  LETTER  		 - 英文随机字符串
 	 *		  LETTER_NUMERIC - 英文数字混合随机字符串
 	 *		  CHINESE 		 - 中文随机字符串
 	 *        
 	 * @return 生成结果
 	*/
 	function random(length, type){
		if(Object.isNumeric(length) === false){
			throw "Invalid argument length is not integer";
		}

		type = type||"LETTER_NUMERIC";

		var result = "";
		if(type == "CHINESE"){
			for(var i = 0; i < length; i++){
				result += String.fromCharCode(Math.rand(19968,40891));
			}

			return result;
		}

		var letter = "abcdefghijklmnopqrstuvwxyz";
		var map = {"NUMERIC": "0123456789", "LETTER": letter + letter.toUpperCase()};
			map.LETTER_NUMERIC = map.NUMERIC+map.LETTER;

		if(!map[type]){
			throw "Invalid argument type value, must be: NUMERIC, LETTER, LETTER_NUMERIC or CHINESE";
		}

		for(var i = 0; i < length; i++){
			result += map[type].charAt(Math.rand(0, map[type].length-1));
		}

		return result;
 	}

 	Class.extend(String, {
 		specialChar: 	{'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','\\':'\\\\'}, 
 		random: 		random
 	});
})();
Class.extend(String.prototype, (function(){
 	var $hashCode = 0;

 	/**
 	 * 判断字符串是否存在
 	 *
 	 * @param 子字符串
 	 * @return boolean
 	*/
 	function exists(str){
 		return this.indexOf(str) > -1;
 	}

 	/**
 	 * 判断字符串是否相等
 	 *
 	 * @param 与此 String 进行比较的对象
 	 * @return boolean
 	*/
 	function equal(str){
 		if(str&&(Object.isString(str)||Object.isFunction(str.toString))){
 			return this == str.toString();
 		}

 		return false;
 	}

 	/**
 	 * 判断字符串是否相等，不考虑大小写
 	 *
 	 * @param 与此 String 进行比较的对象
 	 * @return boolean
 	*/
 	function equalsIgnoreCase(str){
 		if(str&&(Object.isString(str)||Object.isFunction(str.toString))){
 			return this.toLowerCase() == str.toString().toLowerCase();
 		}

 		return false;
 	}

 	/**
 	 * 判断是否为空字符串
 	 *
 	 * @return boolean
 	*/
 	function isEmpty(){
 		return this.length === 0;
 	}

 	/**
 	 * 判断是否为空白字符串
 	 *
 	 * @return boolean
 	*/
 	function isBlank(){
 		return /^\s*$/.test(this);
 	}

 	/**
 	 * 重复一个字符串
 	 *
 	 * @papram count 重复次数
 	 * @return 重复后的字符串
 	*/
 	function repeat(count){
		if(Object.isNumeric(count) === false||count < 1){
 			return "";
 		}

 		var result = this;
 		for(var i = 0; i < count; i++){
 			result += this;
 		}
 		return result;
 	}

 	function _substr(str, start, length){
 		return Object.isNumeric(length) === false ? "" : str.substr(start, length);
 	}

 	/**
 	 * 截取字符串左边边指定数目的字符串
 	 *
 	 * @param length 截取长度
 	 * @return 子字符串
 	*/
 	function left(length){
		length = length||0;
 		return _substr(this, 0, length);
 	}

 	/**
 	 * 截取字符串右边指定数目的字符串
 	 *
 	 * @param length 截取长度
 	 * @return 子字符串
 	*/
 	function right(length){
		length = length||0;
 		return _substr(this, this.length - length, length);
 	}

 	/**
 	 * 截取字符串，超出部分用 truncation 替代
 	 *
 	 * @param length 截取长度
 	 * @param truncation 替换字符串
 	 * @return 截取后的字符串
 	 *		   实际截取长度：当 length 小于等于 truncation 的长度时为，length；当 length 大于 truncation 的长度时为，length - truncation.length
 	*/
 	function truncation(length, truncation){
 		length = length||0;
 		truncation = truncation||"...";

 		return this.length > length ? this.slice(0, length <= truncation.length ? length : length - truncation.length) + truncation : String(this);
 	}

 	/**
 	 * 删除字符串开头的空白字符
 	 *
 	 * @return 删除了字符串最左边的空白字符的字符串
 	*/
 	function ltrim(){
 		return this.replace(/^\s*/g, "");
 	}

 	/**
 	 * 删除字符串结尾的空白字符
 	 *
 	 * @return 删除了字符串最右边的空白字符的字符串
 	*/
 	function rtrim(){
 		return this.replace(/\s*$/g, "");
 	}

 	/**
 	 * 删除除字符串首尾处的空白字符
 	 *
 	 * @return 字符串去除首尾空白字符后的结果
 	*/
 	function trim(){
 		return this.ltrim().rtrim();
 	}

 	/**
 	 * 判断字符串是否以给定的字符串开头
 	 *
 	 * @param str 搜索的字符串
 	 * @return boolean
 	*/
 	function startsWith(str){
 		return this.indexOf(str) === 0;
 	}

 	/**
 	 * 判断字符串是否以给定的字符串结尾
 	 *
 	 * @param str 搜索的字符串
 	 * @return boolean
 	*/
 	function endsWith(str){
    	var d = this.length - str.length;
    	return d >= 0 && this.lastIndexOf(str) === d;
  	}

  	/**
  	 * 首字母小写
  	 *
  	 * @return 结果字符串
  	*/
  	function lcfirst(){
		return this.charAt(0).toLowerCase() + this.substring(1);
  	}

  	/**
  	 * 首字母大写
  	 *
  	 * @return 结果字符串
  	*/
  	function ucfirst(){
  		return this.charAt(0).toUpperCase() + this.substring(1);
  	}

  	/**
  	 * 将 HTML 编码
  	 *
  	 * @return 编码后的字符串
  	*/
  	function escapeHTML(){
  		return this.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  	}

  	/**
  	 * 将 HTML 实体字符解码
  	 *
  	 * @return 解码后的字符串
  	*/
  	function unescapeHTML(){
  		return this.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
  	}

	function stripTag(str, tag){
		return str.replace(new RegExp("<"+tag+"(\s+(\"[^\"]*\"|'[^']*'|[^>])+)?>|<\/"+tag+">", "gi"), "");
	}

  	/**
  	 * 删除标签
  	 *
  	 * @param tags 删除指定的标签
  	 * @return 删除标签后的字符串
  	*/
  	function stripTags(tags){
  		if(Object.isString(tags) == true){
			return stripTag(this, tags);
  		}else if(Object.isArray(tags) == true){
  			var result = this;

  			for(var i = 0; i < tags.length; i++){
				result = stripTag(result, tags[i]);
  			}

  			return result;
  		}else{
  			return this.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, "");
  		}
  	}

  	/**
  	 * 删除 script 标签
  	 *
  	 * @return 删除 script 标签后的字符串
  	*/
  	function stripScripts(){
  		return this.replace(/<script[^>]*>([\S\s]*?)<\/script>/img, "");
  	}

  	/**
  	 * 将字符串转换为数组
  	 *
  	 * @param delimiter 分隔字符
  	 * @return 数组
  	*/
  	function toArray(delimiter){
  		return this.split(delimiter||"");
  	}

  	/**
  	 *
  	 *
  	 * @param useDoubleQuotes 是否使用双引号引住
  	 * @return 后的字符串
  	*/
  	function inspect(useDoubleQuotes){
    	var escapedString = this.replace(/[\x00-\x1f\\]/g, function(character){
      		if(character in String.specialChar){
        		return String.specialChar[character];
      		}

      		return '\\u00' + character.charCodeAt().toPaddedString(2, 16);
    	});

		var str = escapedString.replace(/"/g, '\\"');
    	return useDoubleQuotes == true ? '"' + str + '"' : "'" + str + "'";
  	}

  	/**
  	 * 将字符串 JSON 编码
  	 *
  	 * @return 编码后的字符串
  	*/
  	function toJSON(){
    	return this.inspect(true);
  	}

  	/**
  	 * 获取字符串 hash code
  	 *
  	 * @return 字符串 hash code
  	*/
  	function hashCode(){
  		if($hashCode === 0&&this.length > 0){
  			for(var i = 0; i < this.length; i++){
  				$hashCode = 31 * $hashCode + this.charCodeAt(i);
  			}
  		}

  		return $hashCode;
  	}

 	return {
 		exists: 			exists, 
 		equal: 				equal, 
 		equalsIgnoreCase:	equalsIgnoreCase, 
 		isEmpty: 			isEmpty, 
 		isBlank: 			isBlank, 
 		repeat: 			repeat, 
 		left: 				left, 
 		right: 				right, 
 		truncation: 		truncation, 
 		ltrim: 				ltrim, 
 		rtrim: 				rtrim, 
 		trim: 				trim, 
 		startsWith: 		startsWith, 
 		endsWith: 			endsWith, 
 		lcfirst: 			lcfirst, 
 		ucfirst: 			ucfirst, 
 		escapeHTML: 		escapeHTML, 
 		unescapeHTML: 		unescapeHTML, 
 		stripTags: 			stripTags, 
 		stripScripts: 		stripScripts, 
 		toArray: 			toArray, 
 		inspect: 			inspect, 
 		toJSON: 			toJSON, 
 		hashCode: 			hashCode
 	};
})());

/**
 * Number 对象扩展
*/
(function(){
	/**
	 * 判断数字是否为奇数
	 *
	 * @param num 需要判断的数字
	 * @return boolean
	*/
	function isOdd(num){
		return /^\d+$/.test(num + "")&&num % 2 === 1;
	}

	/**
	 * 判断数字是否为偶数
	 *
	 * @param num 需要判断的数字
	 * @return boolean
	*/
	function isEven(num){
		return /^\d+$/.test(num + "")&&num % 2 === 0;
	}

	/**
	 * 判断一个数字是否在另两个数字之间
	 *
	 * @param num 需要判断的数
	 * @param min 最小值
	 * @param max 最大值
	 * @param match 是否包含最小值或最大值
	 * @return boolean
	*/
	function isBetween(num, min, max, match){
		num = parseFloat(num);
		min = min||0;
		max = max||0;
		match = Object.isUndefined(match) == true ? true : !!match;

		if(min > max){
			min ^= max;
			max ^= min;
			min ^= max;
		}

		return match == true ? num >= min&&num <= max : num > min&&num < max;
	}

	Class.extend(Number, {
		isOdd: 		isOdd, 
		isEven: 	isEven, 
		isBetween: 	isBetween
	});

	["abs", "ceil", "floor", "round"].forEach(function(name){
		Number[name] = function(value){
			return Math[name](value);
		}
	});
})();
Class.extend(Number.prototype, (function(){
	/**
	 *
	 * @param length 长度
	 * @param radix
	 * @return
	*/
	function toPaddedString(length, radix){
		var string = this.toString(radix||10);
    	return "0".repeat(length - string.length) + string;
	}

	/**
	 * 将数字转换为十六进制
	 *
	 * @return 转换结果
	*/
	function toColorPart(){
		return this.toPaddedString(2, 16);
	}

	/**
	 * 将数字 JSON 编码
	 *
	 * @return 编码后的字符串
	*/
	function toJSON(){
		return isFinite(this) == true ? this.toString() : "null";
	}

	return {
		toPaddedString: toPaddedString, 
		toColorPart:	toColorPart, 
		toJSON: 		toJSON
	};
})());

/**
 * Boolean 对象扩展
*/
Class.extend(Boolean.prototype, (function(){
	/**
	 * 将布尔值 JSON 编码
	 *
	 * @return 编码后的字符串
	*/
	function toJSON(){
		return this.toString();
	}

	return {
		toJSON: toJSON
	};
})());

/**
 * Math 对象扩展
*/
(function(){
	/**
	 * 产生一个指定范围内的随机数
	 *
	 * @param min 返回的最低值(默认 0)
	 * @param max 返回的最高值
	 * @return 随机数
	*/
	function rand(min, max){
		min = min||0;
		max = max||(new Date()).getTime();

		var result = Math.random() * (max - min + 1) + min;
			result = Math.round(result);

		if(result < min){
			result = min;
		}else if(result > max){
			result = max
		}

		return result;
	}

	Class.extend(Math, {
		rand: rand
	});
})();

/**
 * Date 对象扩展
*/
Class.extend(Date.prototype, (function(){
	var _season_map = {
			"N": 	["Spring", "Summer", "Autumn", "Winter"],
			"NC": 	["\u6625", "\u590f", "\u79cb", "\u51ac"]
		},
		_month_map = {
			"M": 	["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			"MM": 	["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			"MC": 	["\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D", "\u5341", "\u5341\u4E00", "\u5341\u4E8C"]
		},
		_weekday_map = {
			"W": 	["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
			"WW": 	["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
			"WC":	["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"]
		},
		_leap_year_month_days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
		_year_month_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	function _isLeapYear(year){
		return Object.isNumeric(year) == true&&year % 4 == 0&&(year % 100 != 0||year % 400 == 0);
	}

	/**
	 * 判断是否为闰年
	 *
	 * @return boolean
	*/
	function isLeapYear(){
		return _isLeapYear(this.getFullYear());
	}

	/**
	 * 获取季节
	 *
	 * @return 季节
	*/
	function getSeason(){
		var month = this.getMonth();

		if(month >= 3&&month <= 5){
			return 0;
		}else if(month >= 6&&month <= 8){
			return 1;
		}else if(month >= 9&&month <= 11){
			return 2;
		}else if(month >= 12||month <= 2){
			return 3;
		}else{
			return null;
		}
	}

	function _getDayOfYear(year, month, date){
		var days = 0,
			month_days = _isLeapYear(year) == true ? _leap_year_month_days : _year_month_days;

		for(var m = 0; m < month; m++){
			days += month_days[m];
		}

		days += date;

		return days;
	}

	/**
	 * 获取年份中的第几天
	 *
	 * @return 年份中的第几天
	*/
	function getDayOfYear(){
		return _getDayOfYear(this.getFullYear(), this.getMonth(), this.getDate());
	}

	/**
	 * Format a date object into a string value.
	 * @param  format string - the desired format of the date
	 *
	 * The format can be combinations of the following:
	 *
	 * y    - 将年份表示为最多两位数字，如果年份多于两位数，则结果中仅显示两位低位数。
	 * yy   - 同上，如果小于两位数，前面补零。
	 * yyy  - 将年份表示为三位数字，如果少于三位数，前面补零。
	 * yyyy - 将年份表示为四位数字，如果少于四位数，前面补零。
	 * m    - 将月份表示为从 1 至 12 的数字。
	 * mm   - 将月份表示为从 1 至 12 的数字，有前导零。
	 * M    - 返回月份的缩写(Jan 到 Dec)
	 * MM   - 返回月份的全称(January 到 December)
	 * MC   - 返回月份的中文名称
	 * d    - 将月中日期表示为从 1 至 31 的数字。
	 * D    - 年份中的天数。
	 * N    - 获取季节全称
	 * NC   - 获取季节的中文名称
	 * dd   - 将月中日期表示为从 1 至 31 的数字，有前导零。
	 * E    - 星期中的第几天，数字表示，0（表示星期天）到 6（表示星期六）。
	 * W    - 返回星期的缩写(Sun 到 Sat)
	 * WW   - 返回星期的全称(Sunday 到 Saturday)
	 * w    - 月份中的周数
	 * ww   - 年份中的周数
	 * a    - 小写的上午和下午值
	 * A    - 大写的上午和下午值
	 * h    - 12 小时小时数，没有前导零。
	 * hh   - 12 小时小时数，有前导零。
	 * H    - 24 小时小时数，没有前导零。
	 * HH   - 24 小时小时数，有前导零。
	 * i    - 分钟数，没有前导零。
	 * ii   - 分钟数，有前导零。
	 * s    - 秒钟数，没有前导零。
	 * ss   - 秒钟数，有前导零。
	 * S    - 毫秒数，没有前导零。
	 * SS   - 毫秒数，有前导零。
	 * O    - 与格林威治时间相差的小时数。
	 * P    - 与格林威治时间相差的小时数，小时和分钟之间有冒号分隔。
	 * @return 格式化后的日期时间
	*/
	function format(format){
		if(!format){
			throw "Invalid argument format";
		}

		format = (typeof format === "object" ? format.toString() : format + "");

		var year = this.getFullYear(),
			month = this.getMonth(),
			i = 0,
			result = "";

		function lookAhead(match){
			var matches = (i + 1 < format.length&&format.charAt(i + 1) === match);

			if(matches){
				i++;
			}

			return matches;
		}

		function formatNumber(match, value, length){
			var ret = "" + value;

			if(lookAhead(match)){
				while(ret.length < length){
					ret = "0" + ret;
				}
			}

			return ret;
		}

		for(; i < format.length; i++){
			switch(format.charAt(i)){
				case "Y":
					result += year;
					break;
				case "y":
					var len = 0;

					for(;;){
						if(format.charAt(i) == "y"&&len < 4){
							len++;
						}else{
							--i;
							break;
						}
						++i;
					}

					result += (year + "").right(len);
					break;
				case "m":
					result += formatNumber("m", month + 1, 2);
					break;
				case "M":
					result += (lookAhead("M") ? _month_map.MM[month] : (lookAhead("C") ? _month_map.MC[month] : _month_map.M[month]));
					break;
				case "d":
					result += formatNumber("d", this.getDate(), 2);
					break;
				case "D":
					result += _getDayOfYear(year, month, this.getDate());
					break;
				case "N":
					var $season = this.getSeason();
					result += lookAhead("C") ? _season_map.NC[$season] : _season_map.N[$season];
					break;
				case "E":
					result += this.getDay();
					break;
				case "W":
					var $day = this.getDay();
					result += (lookAhead("W") ? _weekday_map.WW[$day] : (lookAhead("C") ? "\u661F\u671F" + _weekday_map.WC[$day] : _weekday_map.W[$day]));
					break;
				case "w":
					result += Math.ceil((lookAhead("w") ? _getDayOfYear(year, month, this.getDate()) : this.getDate())/7);
					break;
				case "a": case "A":
					var $hours = this.getHours();
					var isUpper = format.charAt(i) == "A";

					result += $hours < 12 ? (isUpper == true ? "AM" : "am") : (isUpper == true ? "PM" : "pm");
					break;
				case "h":
					result += formatNumber("h", this.getHours() - 12, 2);
					break;
				case "H":
					result += formatNumber("H", this.getHours(), 2);
					break;
				case "i":
					result += formatNumber("i", this.getMinutes(), 2);
					break;
				case "s":
					result += formatNumber("s", this.getSeconds(), 2);
					break;
				case "S":
					result += formatNumber("S", this.getMilliseconds(), 3)
					break;
				case "O": case "P":
					var offset = this.getTimezoneOffset();
					var offsetHours = Math.abs(offset/60);
					var offsetSeconds = Math.abs(offset%60);

					result += ((offset + "").charAt(0) + (offsetHours < 10 ? "0" + offsetHours : offsetHours));
					result += (format.charAt(i) == "O" ? "00" : ":" + (offsetSeconds < 10 ? "0" + offsetSeconds : offsetSeconds));
					break;
				default:
					result += format.charAt(i);
					break;
			}
		}

		return result;
	}

	/**
	 * 将 Date 对象 JSON 编码
	 *
	 * @return JSON 后的字符串
	*/
	function toJSON(){
		return '"' + this.getUTCFullYear() + '-' +
    		(this.getUTCMonth() + 1).toPaddedString(2) + '-' +
    		this.getUTCDate().toPaddedString(2) + 'T' +
    		this.getUTCHours().toPaddedString(2) + ':' +
    		this.getUTCMinutes().toPaddedString(2) + ':' +
    		this.getUTCSeconds().toPaddedString(2) + 'Z"';
	}

	return {
		isLeapYear: 	isLeapYear, 
		getSeason: 		getSeason, 
		getDayOfYear: 	getDayOfYear, 
		format: 		format, 
		toJSON: 		toJSON
	};
})());

/**
 * window 对象扩展
*/
(function(){
 	var userAgent = navigator.userAgent,
		isChrome = /\(KHTML, like Gecko\) Chrome\//.test(userAgent),
		isFirefox = userAgent.exists("Firefox"),
		isMozilla = userAgent.exists("Mozilla"),
		isOpera = /\(KHTML, like Gecko\) Chrome\//.test(userAgent)&&userAgent.exists("OPR"),
		isMSIE = !!window.attachEvent&&!isOpera,
		isNetscape = /Netscape([\d]*)\/([^\s]+)/i.test(userAgent),
		isSafari = userAgent.exists("Safari")&&Object.isFunction(window.openDatabase),
		mobileMaps = ["Android", "iPhone", "Windows Phone"];

	function browser(){
 		/**
 		 * 获取浏览器名称
 		 *
 		 * @return 浏览器名称
 		*/
 		function getName(){
 			switch(true){
 				case isOpera:
 					return "Opera";
 					break;
 				case isChrome:
 					return "Google Chrome";
 					break;
 				case isSafari:
 					return "Safari";
 					break;
 				case isFirefox:
 					return "Firefox";
 					break;
 				case isMozilla:
 					return "Mozilla";
 					break;
 				case isMSIE:
 					return "Internet Explorer";
 					break;
				case isNetscape:
					return "Netscape";
					break;
 				default:
 					return "unknown";
 					break;
 			}
 		}

 		/**
 		 * 获取浏览器版本号
 		 *
 		 * @return 浏览器版本号
 		*/
 		function getVersion(){
 			switch(true){
 				case isOpera:
 					return userAgent.match(/OPR\/([\d.]+)/)[1];
 					break;
 				case isChrome:
 					return userAgent.match(/Chrome\/([\d.]+)/)[1];
 					break;
 				case isSafari:
 					return userAgent.match(/Version\/([\d.]+)/)[1];
 					break;
 				case isFirefox:
 					return userAgent.match(/Firefox\/([\d.]+)/)[1];
 					break;
 				case isMozilla:
 					return userAgent.match(/Mozilla\/([\d.]+)/)[1];
 					break;
 				case isMSIE:
 					return userAgent.match(/Firefox\/([\d.]+)/)[1];
 					break;
 				default:
 					break;
 			}

 			return 0.0;
 		}

 		/**
 		 * 检测是否为手机
 		 *
 		 * @return boolean
 		*/
 		function isMobile(){
 			for(var i = 0; i < mobileMaps.length; i++){
 				if(userAgent.indexOf(mobileMaps[i]) != -1){
 					return true;
 				}
 			}

 			return false;
 		}

 		return {
 			name: 		getName(), 
 			userAgent: 	userAgent,
 			isChrome: 	isChrome, 
 			isFirefox: 	isFirefox, 
 			isMozilla: 	isMozilla, 
 			isMSIE: 	isMSIE, 
 			isOpera: 	isOpera, 
 			isSafari: 	isSafari, 
 			isMobile: 	isMobile, 
			isNetscape:	isNetscape, 
 			version: 	getVersion()
 		};
 	}

	/**
	 * 设为首页
	 *
	 * @param url 设为首页的 URL
	 * @param title title
	*/
	function setHomePage(url, title){
		url = url||this.location.href;
		title = title||document.title;

		if(!!this.sidebar === true){
			try{
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			}catch(e){
				alert("\u62b1\u6b49\uff0c\u6b64\u64cd\u4f5c\u88ab\u6d4f\u89c8\u5668\u62d2\u7edd\uff01\n\n\u8bf7\u5728\u6d4f\u89c8\u5668\u5730\u5740\u680f\u8f93\u5165\u201cabout:config\u201d\u5e76\u56de\u8f66\u7136\u540e\u5c06[signed.applets.codebase_principal_support]\u8bbe\u7f6e\u4e3a true");
				return;
			}

			var service = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
				service.setCharPref("browser.startup.homepage", url);
		}else{
			document.body.style.behavior="url(#default#homepage)";
			document.body.setHomePage(url);
		}

		return false;
	}

	/**
	 * 加入收藏夹
	 *
	 * @param url 设为首页的 URL
	 * @param title title
	*/
	function addFavorite(url, title){
		url = url||this.location.href;
		title = title||document.title;

		try{
			!!this.sidebar === true ? this.sidebar.addPanel(title, url, "") : this.external.AddFavorite(url, title);
			return false;
		}catch(e){
			alert("\u62b1\u6b49\uff0c\u60a8\u6240\u4f7f\u7528\u7684\u6d4f\u89c8\u5668\u65e0\u6cd5\u5b8c\u6210\u6b64\u64cd\u4f5c\u3002\n\n\u52a0\u5165\u6536\u85cf\u5931\u8d25\uff0c\u8bf7\u4f7f\u7528Ctrl+D\u8fdb\u884c\u6dfb\u52a0");
		}
	}

	/**
	 * 字符串复制到剪贴板
	 *
	 * @param str 字符串
	*/
	function copy(str){
		try{
			str = str.toString();
			if(!!this.clipboardData == true){
				this.clipboardData.setData("Text", str);
			}else{
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");

				var interfaces = Components.interfaces,
					clipboard = Components.classes["@mozilla.org/widget/clipboard;1"].createInstance(interfaces.nsIClipboard);

				if(!!clipboard === false){
					return;
				}

				var transferable = Components.classes["@mozilla.org/widget/transferable;1"].createInstance(interfaces.nsITransferable);
				if(!!transferable===false){
					return;
				}

				transferable.addDataFlavor("text/unicode");

				var supportsString = Components.classes["@mozilla.org/supports-string;1"].createInstance(interfaces.nsISupportsString);
					supportsString.data = str;

				trans.setTransferData("text/unicode", transferable, str.length * 2);

				var iClipboard = Components.interfaces.nsIClipboard;
				if(!!iClipboard===false){
					return;
				}

				clipboard.setData(transferable, null, iClipboard.kGlobalClipboard);
			}
		}catch(e){
		}
	}

	Class.extend(window, {
		browser: 		browser(), 
		setHomePage: 	setHomePage, 
		addFavorite: 	addFavorite, 
		copy: 			copy
	});
})();

/**
 * RegExp 对象扩展
*/
if(Object.isFunction(RegExp.prototype.match) === false){
	RegExp.prototype.match = RegExp.prototype.test;
}