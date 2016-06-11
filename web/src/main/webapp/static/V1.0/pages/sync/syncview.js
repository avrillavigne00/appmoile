define(["zepto",
        "underscore",
        "backbone",       
        "baseView",
        "text!pages/sync/syncview.tpl.html",
        "text!pages/sync/syncpage.tpl.html",
        "common",
        "pages/sync/synccollection",
        "css!pages/sync/syncview.css"],
	function($,_,Backbone,BaseView,template,pageTempalte,Common,Collection){
		var view = BaseView.extend({
			el:$("#main"),
			template:_.template(template),
			pageTempalte:_.template(pageTempalte),	
			events:{				
			},		
			render:function(){				
				$("#datalist").append(this.pageTempalte({ modellist:this.collection.models					
				}));
				if(!this.option.status){
					this.option.status = 0;
				}	
				this.$el.find(".sync-status li").eq(this.option.status).addClass("active");
				this.$el.animate({"opacity":".9"});			
				return this;
			},
			initialize:function(option){	
				this.$el.html(this.template());
				this.$el.css({"opacity":0});	
				this.option = option;
				this.collection =  new Collection();

				this.listenTo(this.collection, "reset", this.render);	
				this.bindEvents();				
			},
			bindEvents:function(){
				var that = this;
				$(".segmented-control .control-item").off("touchend").on("touchend",function(){
					window.location.href=$(this).attr("href");
				});
				this.$el.undelegate().delegate(".sync-status li","touchend",function(){
					that.$el.html(that.template());
					if(!that.option){
						that.option = {};
					}
					that.option.status = $(this).attr("data-status");
					that.collection.query({status:$(this).attr("data-status")});
				}).delegate(".j-query4more","touchend",function(){
					that.collection.pageIndex++;
					that.collection.query();
				});
			}			
		});
		return view;
	}
);