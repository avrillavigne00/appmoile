define(["zepto","underscore","backbone","widget/carousel/carouselmodel","common","baseCollection"],
		function($,_,Backbone,BizModel,common,baseCollection){
	var prodcollection = baseCollection.extend({
		url:common.RestMapper.AD.Query.regular.URL,
		model:BizModel,
		initialize:function(option){
			var that = this;	
			//var data = this.mergeDefault(option);				
			this.fetch({
                data:{onsaletype:"pre001"},
				success:function(data,response){
                    that.reset(response);
				}
			})
		}
	});
	return prodcollection;
	}
);