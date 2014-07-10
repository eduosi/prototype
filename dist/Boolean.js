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