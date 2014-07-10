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