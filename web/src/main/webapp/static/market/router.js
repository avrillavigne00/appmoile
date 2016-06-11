define([
	"zepto",
	"underscore",
	"backbone",
	"baseRouter","headView",	
	"keyword"
	],function($,_,Backbone,baseRouter,headView,keyword){
	var AppRouter = baseRouter.extend({
	        routes: {
	            "*path(?*queryString)": "any"
	        },
			routerpath:function(path, queryString){
				path= path?path:Backbone.history.root.substr(1,Backbone.history.root.length-2);
				if(path){
				/*init header*/
				var headerTpl = $("#tpl_"+path.replace('/','_').split('?')[0]);
				if(headerTpl.length>0){
					$("#header").html(headerTpl.html()).removeClass("hidden");
				}else{
					$("#header").addClass("hidden");
				}
				if(window.app.curview){
					//window.app.curview.remove&&window.app.curview.remove();
					//$("#main-ctn").html("<div id='main'></div>");
				}
				requirejs.undef("../"+path);
				require(["../"+path],function(module){
					if(module == undefined ){
						console.log('路径有误，请重试！');
						return ;
					}
					//有些页面,如商品详细页面需要隐藏显示底部的导航所以这里
					var footer = $("nav.bar-tab");
					//如果存在多个则默认只显示默认的
					if(footer.length>1){
						footer.hide();
						$("#footer").show();
					}
					//每次清空plugin-ctn的内容
					//$("#main-ctn").html('<div id="main"></div>');
					var view = new module({queryString:queryString});
					window.app.curview = view;
				});
				}
			}
	    });
	return AppRouter;
});