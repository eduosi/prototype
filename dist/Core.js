var Prototype = {
 	version: "${version}",

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