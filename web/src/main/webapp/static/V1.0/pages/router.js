define([
	"zepto",
	"underscore",
	"backbone",
	"baseRouter","headView",	
	"keyword",
	"supply/main/mainview",
	"supply/quotation/quotationview",
	"supply/quotation/quotatingview"
	],function($,_,Backbone,baseRouter,headView,keyword,mainView,quotationView,quotatingView){
	var AppRouter = baseRouter.extend({
	        routes: {
	            "*path(?*queryString)": "any"
	        }     	       
	    });
	return AppRouter;
});