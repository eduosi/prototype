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