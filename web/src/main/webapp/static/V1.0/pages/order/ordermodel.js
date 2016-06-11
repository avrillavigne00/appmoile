define(["zepto","underscore","backbone","common","baseModel"],function($,_,Backbone,Common,baseModel){
	var orderDetail = baseModel.extend({
		defaults:function(){
			return {				
			}
		},
		url:"pages/order/orderedit.json",
		initialize:function(option){
			this.option = option||{};
			this.query(this.option);
		},
		query:function(option){
			var that = this;
			Common.ajax({
				url:this.url,
				type:"get",
				data:option,
				dataType:"json",
				success:function(data){
					that.set(data);					
				}
			})
		}
	});
	
	return orderDetail;
})