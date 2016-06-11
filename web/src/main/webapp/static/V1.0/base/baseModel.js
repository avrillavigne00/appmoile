define(["zepto",
        "underscore",
        "backbone","common"],
	function($,_,Backbone,common){
		var baseModel = Backbone.Model.extend({					
			initialize:function(){
				
			}
		});		
		return baseModel;
	}
);