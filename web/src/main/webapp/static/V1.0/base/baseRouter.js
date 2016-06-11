define(["zepto","underscore","backbone"],function($,_,Backbone){
	var AppRouter = Backbone.Router.extend({	        
		  	animate:function(href,transition,direction,events){		  		
		  		events.preventDefault();
		  		
		  		$(".mask").css({"margin-left":"250px","display":"block","opacity":"0.8"});
		  		$(".mask").animate({"margin-left":"-30px","opacity":"1"}, 400, "linear", function(){			  						  				  
		  			$(".mask").hide("slow");
				});

		  	}
	    });
	return AppRouter;
});