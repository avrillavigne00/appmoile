require.config({
	baseUrl:".",
	paths:{
		'zepto':'../js/libs/zepto/zepto',
		'underscore':'../js/libs/underscore/underscore',
		'backbone':'../js/libs/backbone/backbone',
		'text':'../js/libs/require/text',
		'css':'../js/libs/requirecss/css.min',
		'baseRouter':'base/baseRouter',
		'baseView':'base/baseview',
		'baseModel':'base/baseModel',
		'ratchet':'../js/libs/ratchet/ratchet',
		'baseCollection':'base/baseCollection',
		'baseModel':'base/baseModel',
		'commonUrl':'base/commonUrl',	
		'keyword':'base/i18n/resource',
		'common':'common/common',
		'navigatorView':'widget/navigator/navview',
		'announcementView':'announcement/view',
		'prompts':'../js/widget/prompts/prompts',
		'router':'pages/router',
		'app':'pages/app',
		'localforage':'../js/libs/localforage/localforage.min',
		'headView':'widget/header/headView'
	},
	shim:{
		'zepto':{
      		exports: '$'
  		},
		'underscore': {
            exports: "_"
        },
        'backbone': {
            deps: ['zepto', 'underscore'],
            exports: 'Backbone'
        }
	}
});
require(["backbone","ratchet","router","app","navigatorView"],function(Backbone,ratchet,router,app,NavigatorView){
	var app = new app();
	window.app = app;
	var _router = new router();
	Backbone.listenTo(_router, 'route:any', routerpath);
	var pathhash = window.location.hash?window.location.hash.replace('#',''):"sync/syncview";
	routerpath(pathhash.split('?')[0],pathhash.split('?')[1]||"");
	var navgator = new NavigatorView();
	navgator.setItemActive(2);
});
function routerpath(path, queryString){
	/*init header*/				
	var headerTpl = $("#tpl_"+path.replace('/','_').split('?')[0]);
	if(headerTpl.length>0){
		$("#header").html(headerTpl.html());
	}
	if(window.app.curview){
		//window.app.curview.remove&&window.app.curview.remove();
		//$("#main-ctn").html("<div id='main'></div>");
	}
	requirejs.undef("pages/"+path);
	require(["pages/"+path],function(module){
		if(module == undefined ){
			console.log('路径有误，请重试！');
			return ;
		}		
		var view = new module({queryString:queryString});
		window.app.curview = view;		
	});
}     
