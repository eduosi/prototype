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