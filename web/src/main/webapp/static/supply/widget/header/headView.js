define(["zepto",
        "underscore",
        "backbone",       
        "text!../widget/header/headView.tpl.html",
        "common"],
	function($,_,Backbone,template,Common){
		var headView = Backbone.View.extend({
			el:$("header"),
			template:_.template(template),	
			events:{
				"focus .js-keyword":"keywordfocus",
				"blur .js-keyword":"keywordblur",
				"tap .prod-search-cancel":"deleteKeyword"
			},		
			render:function(option){
				var mergedOption = this.mergeDefault(option);
				this.$el.html(this.template(mergedOption));	
				this.$el.animate({"opacity":".9"});			
				return this;
			},
			initialize:function(option){	
				this.$el.css({"opacity":0});		
				this.render(option);					
			},
			keywordfocus:function(vent){
				$("#searchCancel").removeClass("hidden");
			},
			keywordblur:function(vent){
				$("#searchCancel").addClass("hidden");
			},	
			deleteKeyword:function(){
				$("#searchkeyword").val('');
			},
			mergeDefault:function(option){
				var DefaultOption ={
					"leftAnchor":false,						
					"rightBtn":false,
					"rightAnchor":false,
					"mainpage":false,
					"rightIcon":false,
					"direction":"R2L"				
				};
				$.extend(DefaultOption,option)
				return DefaultOption;
			}
			
		});
		return headView;
	}
);