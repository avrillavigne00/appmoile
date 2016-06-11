define(["zepto","underscore","backbone","../carousel/carouselmodel","common","baseCollection"],
		function($,_,Backbone,BizModel,common,baseCollection){
	var prodcollection = baseCollection.extend({
		debugUrl:"/static/market/widget/carousel/carousel.json",
		url:"",
		model:BizModel,
		initialize:function(option){
			var that = this;	
			this.query();
		},
		query:function(){
			common.ajax({
				url:this.debugUrl,
				type:"GET",
				dataType:"json",
				success:function(data){
					this.reset(data);
				}.bind(this)
			})
		}
	});
	return prodcollection;
	}
);