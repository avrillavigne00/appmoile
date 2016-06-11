define(["zepto",
        "underscore",
        "backbone",
		"vue",
		"text!../widget/carousel/carousel.vue.html",
		"baseView",
        "common",
        "swipe"],
	function($,_,Backbone,Vue,template,BaseView,Common,Swipe){
		var _self = null;
		var carousel = BaseView.extend({
			render:function(data){
				var that = this;
				var list = data;
				this.viewmodel.pictures=list;
				this.viewmodel.imgheight = this.imgheight;
				Vue.nextTick(function () {
					var _element = this.$el;
					_element.find("#carouselswipe").Swipe({callback:function(index){
						//fix wrong indicator position when length < 3 caused by Swiper.js . 8/4/2014
						var critical = list.length;
						if(critical < 3){
							_element.find(".carousel-indicator span").removeClass("curr").eq(index%critical).addClass("curr");
						}
						else{
							_element.find(".carousel-indicator span").removeClass("curr").eq(index).addClass("curr");
						}
					}});
					_element.find(".carousel-indicator span").first().addClass("curr");
				}.bind(this));

				return this;
			},
			initialize:function(option){
				//组件使用说明
				//option:{
				//el:$("#el"),
				//imgheight:"2rem",
				//data:[]
				//}
				this.imgheight = option.imgheight||"6.0rem";
				this.$el.html(template);
				this.viewmodel = new Vue(this.vmoption);
				if(option&&option.data){
					this.render(option.data);
				}
				else{
					var _data = [
						{
							"productid":"1",
							"imageurl":"../../img/front.png"
						},{
							"productid":"1",
							"imageurl":"../../img/front.png"
						},{
							"productid":"1",
							"imageurl":"../../img/front.png"
						}
					];
					this.render(_data);
				}
			},
			vmoption:{
				el: '#carouselswipe',
				data: {
					imgheight:"",
					screenWidth:"100%",
					pictures:[
					]
				}
			}
		});

		return carousel;
	}
);