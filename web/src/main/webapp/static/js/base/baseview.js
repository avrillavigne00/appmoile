define(["zepto",
        "underscore",
        "backbone"],
	function($,_,Backbone,BizModel){
		var baseView = Backbone.View.extend({					
			initialize:function(){
				console.log("call me");
			}
			,remove: function(){
		      Backbone.View.prototype.remove.apply(this, arguments);
		      // add lifycycle support
		      this.onRemove();
		    },
		    onRemove: function(){},
			initviewmodel:function(option){
				if(this.viewmodel&&option){
					new Vue(option);
				}
			}
		});
		return baseView;
	}
);