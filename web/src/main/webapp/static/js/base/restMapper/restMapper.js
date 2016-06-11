define(function(require, exports, module) {
	//default backbone method map
	var methodMap = {
	    'POST':'create',
	    'PUT':'update',
	    'PATCH':'patch',
	    'DELETE':'delete',
	    'GET':'read'
  	};
	var Common = {};
	Common.RestMapper = {
	    Product:{
	    	List:{
		    	URL:"order/ajaxQryOrderCenterOrder.json",
		    	Method:methodMap.POST,
		    	pageCount:10
		    }
	    },
	    Order:{
	    	List:{
		    	URL:"server+orders.action",
		    	Method:methodMap.GET,
		    	pageCount:10
		    },
		    Create:{
		    	URL:"server+orders.action",
		    	Method:methodMap.POST
		    }
	    }
	}
	Common.getMethodFromUrl =  function(url){
		for(var item in Common.RestMapper){
			for(var i in Common.RestMapper[item]){
				if(url.indexOf(Common.RestMapper[item][i].URL)>0){
					return Common.RestMapper[item][i];
				}
			}
		}
	}
	return Common;
});
