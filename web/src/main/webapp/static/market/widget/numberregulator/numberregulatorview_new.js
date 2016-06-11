define(["zepto",
        "underscore",
        "backbone",       
        "text!widget/numberregulator/numberregulator.tpl.html",
        "touchspin"],
	function($,_,Backbone,template,BizCollection,touchspin){
		var numberregulatorView = Backbone.View.extend({			
			template:_.template(template),	
			events:{
				"touchend .js-btn-minus":"minusQuantity",
				"touchend .js-btn-plus":"plusQuantity",
				"touchend .number-resize":"inputFocus",
				"blur .number-resize":"numberChange"
			},		
			render:function(option){
				var that = this;
				option.el.each(function(i){
					$(this).html(that.template({count:$(this).attr("data-count")}))
					.addClass("btn-group");
				})
				$(".demo").TouchSpin({
	                min: 0,
	                max: 100,
	                step: 0.1,
	                decimals: 2,
	                boostat: 5,
	                maxboostedstep: 10
	            });
				return this;
			},
			initialize:function(option){			
				this.render(option);
				this.option = option;	
			},
			/*-1*/
			minusQuantity:function(events){
				var el = $(events.currentTarget).next();
				var count = el.val()-0;//字符串转数字
				if(count>1){
					el.val(count-1);
					Backbone.trigger("numberregulator:minus",el.parent().attr("data-itemid"));	
				}
				events.preventDefault();
			},
			/*+1*/
			plusQuantity:function(events){
				var el = $(events.currentTarget).prev();
				var count = el.val()-0;
				el.val(count+1);				
				Backbone.trigger("numberregulator:plus",el.parent().attr("data-itemid"));			
				events.preventDefault();	
				
			},
			inputFocus:function(events){
				events.stopPropagation();					
			},
			numberChange:function(vent){
				var el = $(vent.currentTarget);
				var count = el.val();
				var isCountChange = count==el.parent().attr("data-count");
				if(!isCountChange){
					Backbone.trigger("numberregulator:change",el.parent().attr("data-itemid"),$(vent.currentTarget).val()-0);	
				}
			}
		});
		return numberregulatorView;
	}
);