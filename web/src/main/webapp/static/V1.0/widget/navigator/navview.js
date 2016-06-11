define(["zepto",
        "underscore",
        "backbone",       
        "text!widget/navigator/nav.tpl.html"],
	function($,_,Backbone,template){
		var navView = Backbone.View.extend({
			el:$("#footer"),
			template:_.template(template),			
			render:function(){
				this.$el.html(this.template({}));				
				return this;
			},
			initialize:function(option){
				
				this.render();
			},
			setItemActive:function(index){
				this.$el.find(".tab-item").removeClass("active");
				this.$el.find(".tab-item").eq(index).addClass("active");  
			},
			hide:function(){
                this.$el.hide();            
			},
			show:function(){
                this.$el.show();              
			}			
		});
		return navView;
	}
);