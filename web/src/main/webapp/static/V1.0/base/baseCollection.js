define(["zepto",
        "underscore",
        "backbone","common","base/behaviors","keyword"],
	function($,_,Backbone,Common,behaviors,Keyword){

		var baseCollection = Backbone.Collection.extend({	
			initialize:function(option){
				//TODO 初始化自定义分页参数
				//首页产品线和品牌首页从0开始，其他页面从1开始				
				if(option && option.curPage!=undefined && option.curPage>=0){
					this.pagination = Common.Pagination(null,option.curPage,null);
				}
				else{
					this.pagination = Common.Pagination();
				}
				
			},
			pageSize:10,
			pageIndex:0,
			totalPage:100,
			pagination:null,
			sync:behaviors.sync,
			/*pagination:分页查询条件
			  callback:回调函数
			*/
			queryPagination:function(callback,isStartFormZero){
				
				var that = this;		
				//先判断是否是从第0页开始，目前没有地方用到
				if(this.pagination.totalpage(isStartFormZero) > this.pagination.pageno){
					this.pagination.pageno++;
					var paginationOption = {};
					paginationOption[Common.KEYS_CURPAGENO]=this.pagination.pageno;
					paginationOption[Common.KEYS_PAGESIZE]=this.pagination.pagesize;
					paginationOption[Common.KEYS_QUERYPAGE] = true;
					this.option = $.extend(this.option||{},paginationOption);
					this.fetch({
						data:this.option,
						success:function(data,response){
							that.total = response.total;				
							that.reset(response.records);
							callback();
						}
					});
				}
				else{
					//数据全部加载完毕
					alert(Keyword.promptinfo.loadingfinished);
				}
			}
		});		
		return baseCollection;
	}
);