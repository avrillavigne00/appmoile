define(["zepto",
        "underscore",
        "backbone",       
        "text!widget/carousel/carousel.tpl.html",
        "widget/carousel/carouselcollection",
        "common",
        "swipe"],
	function($,_,Backbone,template,carouselcollection,Common,Swipe){
		var carousel = Backbone.View.extend({
			template:_.template(template),			
			render:function(){
				var that = this;
				this.$el.html(this.template({ADList:this.collection.models,Common:Common}));
				this.$el.find("#carouselswipe").Swipe({callback:function(index){
					that.$el.find(".carousel-indicator span").removeClass("curr").eq(index).addClass("curr");
					//that.$el.find(".carousel-indicator span").eq(index)
				}});
				this.$el.find(".carousel-indicator span").first().addClass("curr");			
				return this;
			},
			initialize:function(option){			
				this.el = option.el;				
				this.collection = new carouselcollection();
				this.listenTo(this.collection,"reset",this.render);							
			}
		});
		return carousel;
	}
);