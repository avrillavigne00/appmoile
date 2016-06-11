define(["zepto",
        "underscore",
        "backbone",
		"vue",
		"text!../widget/carousel/carousel.vue.html",
        "../widget/carousel/carouselcollection",
		"baseView",
        "common",
        "swipe"],
	function($,_,Backbone,Vue,template,carouselcollection,BaseView,Common,Swipe){
		var carousel = BaseView.extend({
			render:function(){
				var that = this;
				var list = Common.Collection2Array(this.collection);
				this.viewmodel.pictures=list;
				Vue.nextTick(function () {
					this.$el.find("#carouselswipe").Swipe({callback:function(index){
						//fix wrong indicator position when length < 3 caused by Swiper.js . 8/4/2014
						var critical = that.collection.models.length;
						if(critical < 3){
							that.$el.find(".carousel-indicator span").removeClass("curr").eq(index%critical).addClass("curr");
						}
						else{
							that.$el.find(".carousel-indicator span").removeClass("curr").eq(index).addClass("curr");
						}
					}});
					this.$el.find(".carousel-indicator span").first().addClass("curr");
				}.bind(this));

				return this;
			},
			initialize:function(option){
				this.$el.html(template);
				this.viewmodel = new Vue(this.vmoption);
				this.collection = new carouselcollection();
				this.listenTo(this.collection,"reset",this.render);
			},
			vmoption:{
				el: '#carouselswipe',
				data: {
					screenWidth:"100%",
					pictures:[
					]
				}
			}
		});
		return carousel;
	}
);