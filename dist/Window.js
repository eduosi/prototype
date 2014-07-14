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