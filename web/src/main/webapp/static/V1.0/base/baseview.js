define(["zepto",
        "underscore",
        "backbone"],
	function($,_,Backbone,BizModel){
		var baseView = Backbone.View.extend({					
			initialize:function(){
				
			}
			,remove: function(){
		      Backbone.View.prototype.remove.apply(this, arguments);
		      // add lifycycle support
		      this.onRemove();
		    },
		    onRemove: function(){},
		});
		return baseView;
	}
);