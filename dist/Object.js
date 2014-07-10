/**
 * Object 扩展
*/
(function(){
 	var class2types = ["Object", "Function", "Array", "String", "Number", "Boolean", "Date", "RegExp", "Error"];
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
 	function objectType(obj){
 		if(obj == null){
			return obj + "";
		}

		return typeof obj === "object"||typeof obj === "function" ? class2type[toString.call(obj)]||"object" : typeof obj;
 	}

 	/**
 	 * 判断对象是否为 object 类型
 	 *
 	 * @param obj 任意对象
 	 * @return boolean
 	*/
 	function isObject(obj){
 		return objectType(obj) == "object";
 	}

 	/**
 	 * 判断对象是否为函数
 	 *
 	 * @param obj 任意对象
 	 * @return boolean
 	*/
 	function isFunction(obj){
 		return objectType(obj) == "function";
 	}

 	/**
 	 * 判断对象是否为数组
 	 *
 	 * @param obj 任意对象
 	 * @return boolean
 	*/
 	function isArray(obj){
 		return objectType(obj) == "array";
 	}

 	/**
 	 * 判断对象是否为字符串对象
 	 *
 	 * @param obj 任意对象
 	 * @return boolean
 	*/
 	function isString(obj){
 		return objectType(obj) == "string";
 	}

 	/**
 	 * 判断对象是否为数字对象
 	 *
 	 * @param obj 任意对象
 	 * @return boolean
 	*/
 	function isNumeric(obj){
 		return objectType(obj) == "number";
 	}

 	/**
 	 * 判断对象是否为布尔对象
 	 *
 	 * @param obj 任意对象
 	 * @return boolean
 	*/
 	function isBoolean(obj){
 		return objectType(obj) == "boolean";
 	}

 	/**
 	 * 判断对象是否为 null 对象
 	 *
 	 * @param obj 任意对象
 	 * @return boolean
 	*/
 	function isNull(obj){
 		return objectType(obj) == "null";
 	}

 	/**
 	 * 判断对象是否为未定义
 	 *
 	 * @param obj 任意对象
 	 * @return boolean
 	*/
 	function isUndefined(obj){
 		return objectType(obj) == "undefined";
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
 		objectType:		objectType, 
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