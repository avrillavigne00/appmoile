define(["zepto","underscore","backbone","baseCollection","common"],
		function($,_,Backbone,baseCollection,common){
	var collection = baseCollection.extend({
		url:"pages/sync/sync.json",
		initialize:function(option){				
			this.query(option);
		},
		query:function(option){
			var that = this;	
			var data = this.mergeDefault(option);
			/**此处用于模拟不同参数不同查询结果*/
			if(option&&option.status == 1){
				this.url = "pages/sync/sync1.json";	
			}
			else{
				this.url = "pages/sync/sync.json";	
			}
			common.ajax({
				url:this.url,
				type:"get",
				data:data,
				success:function(data){
					that.reset(data);					
				}
			})
		},
		mergeDefault:function(option){
			var DefaultOption ={
				"pageIndex":this.pageIndex,
				"pageSize":this.pageSize
			};
			$.extend(DefaultOption,option)
			return DefaultOption;
		}		
	});
	return collection;
	}
);