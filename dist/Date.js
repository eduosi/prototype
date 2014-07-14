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