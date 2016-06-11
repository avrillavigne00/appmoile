define(["zepto",
        "underscore",
        "backbone",       
        "text!widget/numberregulator/numberregulator.tpl.html",
        "touchspin","common"],
	function($,_,Backbone,template,BizCollection,touchspin,Common){
		var numberregulatorView = Backbone.View.extend({			
			template:_.template(template),	
			events:{
				"touchend .js-btn-minus":"minusQuantity",
				"touchend .js-btn-plus":"plusQuantity",
				"touchend .number-resize":"inputFocus",
				"change .number-resize":"numberChange"
			},		
			render:function(option){
				var that = this;
				option.el.each(function(i){
					var numberregulator = $(this);
					numberregulator.html(that.template({count:numberregulator.attr("data-count"),unitsacle:numberregulator.attr("data-numregulator"),name:numberregulator.attr("data-name")}))
					.addClass("btn-group");
				})
				$(".numregulator-input").each(function(){
					var numinput = $(this);
					var unitsacle = numinput.parents(".numberregulator").attr("data-unitscale")||0;
                    //app签收最小数量可为0,最大签收数量为发货数量
                    var _maxData = numinput.parents(".numberregulator").attr("data-max");
                    var maxData = 999999;
                    if(_maxData>0){
                    	maxData = _maxData;
                    }
                        
                    //}
                    var judgeMinData = numinput.parents(".numberregulator").attr("data-min");
                    if(judgeMinData != null && judgeMinData != undefined){
                        var min = judgeMinData;
                    }else{
                        var min = 1/Math.pow(10,unitsacle);
                    }
					var step = min;
					var decimals = unitsacle;					
					numinput.TouchSpin({
		                min: min,
		                max:maxData,		               
		                step: 1,
		                decimals: decimals,
		                forcestepdivisibility:"keepvalue"
		            });

				});
				$(".bootstrap-touchspin-down").on("touchend", function(vent) {
		            	that.minusQuantity(vent);
		            });
		        $(".bootstrap-touchspin-up").on("touchend", function(vent) {
		            	that.plusQuantity(vent);
		            });
				return this;
			},
			initialize:function(option){			
				this.render(option);
				this.option = option;	
			},
			/*-1*/
			minusQuantity:function(events){
				var target = $(events.currentTarget).parents(".numberregulator");
				Backbone.trigger("numberregulator:minus",target.attr("data-itemid"));	
				events.preventDefault();
			},
			/*+1*/
			plusQuantity:function(events){				
				Backbone.trigger("numberregulator:plus",$(events.currentTarget).parents(".numberregulator").attr("data-itemid"));			
				events.preventDefault();	
				
			},
			inputFocus:function(events){
				events.stopPropagation();					
			},
			numberChange:function(vent){
				var el = $(vent.currentTarget);
				var count = el.val();
				var isCountChange = count==el.parents(".numberregulator").attr("data-count");
				if(!isCountChange){				
					Backbone.trigger("numberregulator:change",el.parents(".numberregulator").attr("data-itemid"),$(vent.currentTarget).val()-0);	
				}
			}
		});
		return numberregulatorView;
	}
);