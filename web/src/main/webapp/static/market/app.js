define(["backbone","router"],function(Backbone,router){
	var application = function(){};
	var app={};
	_.extend(app, Backbone.Events);
	var router = new router();
	Backbone.emulateHTTP = true;
	//Backbone.emulateJSON = true 
	//Backbone.history.start();
	//Backbone.history.start({pushState: false});
	application.app = app;
	return application;
}) 