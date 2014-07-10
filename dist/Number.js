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