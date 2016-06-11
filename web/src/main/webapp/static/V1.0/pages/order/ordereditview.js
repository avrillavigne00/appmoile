define(["zepto",
        "underscore",
        "backbone",       
        "baseView",
        "text!pages/order/ordereditview.tpl.html",
        "common",
        "pages/order/ordermodel",
        "css!pages/order/order.css"],
	function($,_,Backbone,BaseView,template,Common,Model){
		var view = BaseView.extend({
			el:$("#main"),
			template:_.template(template),	
			events:{	
				"touchend .j-submit":"ordersubmit",
				"touchend .j-modify":"modifystatechange"
			},		
			render:function(option){				
				this.$el.html(this.template({ model:this.model					
				}));	
				this.$el.animate({"opacity":"1"});				
				return this;
			},
			initialize:function(option){	
				this.$el.css({"opacity":0});		
				this.model =  new Model();
				this.listenTo(this.model, "change", this.render);				
			},
			modifystatechange:function(vent){
				var item = $(vent.currentTarget).parents("li");
				if(item.find(".order-info-edit").hasClass("active")){
					item.find(".order-info-edit").removeClass("active");
					item.find(".order-info").css({opacity:0}).addClass("active").animate({opacity:1});
					$(vent.currentTarget).html("修改");
				}
				else{
					item.find(".order-info").removeClass("active");
					item.find(".order-info-edit").css({opacity:0}).addClass("active").animate({opacity:1});
					$(vent.currentTarget).html("完成");
				}
			},
			ordersubmit:function(){
				alert("hi");
			}

		});
		return view;
	}
);