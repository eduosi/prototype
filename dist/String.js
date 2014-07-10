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
 		if(Object.isString(str)||Object.isFunction(str.toString)){
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
 		if(Object.isString(str)||Object.isFunction(str.toString)){
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
 		return _substr(this, 0, length);
 	}

 	/**
 	 * 截取字符串右边指定数目的字符串
 	 *
 	 * @param length 截取长度
 	 * @return 子字符串
 	*/
 	function right(length){
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

  	/**
  	 * 删除标签
  	 *
  	 * @param tags 删除指定的标签
  	 * @return 删除标签后的字符串
  	*/
  	function stripTags(tags){
  		if(Object.isString(tags) == true){
  			return this.replace(new RegExp("<"+tags+"(\s+(\"[^\"]*\"|'[^']*'|[^>])+)?>|<\/"+tags+">", "gi"), "");
  		}else if(Object.isArray(tags) == true){
  			var result = this;

  			for(var i = 0; i < tags.length; i++){
  				result = result.replace(new RegExp("<"+tags[i]+"(\s+(\"[^\"]*\"|'[^']*'|[^>])+)?>|<\/"+tags[i]+">", "gi"), "");
  			}

  			return result;
  		}else{
  			if(Object.isNull(tags) == true||Object.isUndefined(tags) == true){
  				throw "Invalid type: "+Object.objectType(tags);
  			}

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

    	return useDoubleQuotes == true ? '"' + escapedString.replace(/"/g, '\\"') + '"' : "'" + escapedString.replace(/'/g, '\\\'') + "'";
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