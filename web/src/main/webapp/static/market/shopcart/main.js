require.config({
    baseUrl:".",
    paths:{
        'zepto':'../../js/libs/zepto/zepto',
        'underscore':'../../js/libs/underscore/underscore',
        'backbone':'../../js/libs/backbone/backbone',
        'vue':'../../js/libs/vue.min',
        'text':'../../js/libs/require/text',
        'css':'../../js/libs/requirecss/css.min',
        'baseRouter':'../../js/base/baseRouter',
        'baseView':'../../js/base/baseview',
        'baseModel':'../../js/base/baseModel',
        'ratchet':'../../js/libs/ratchet/ratchet',
        'baseCollection':'../../js/base/baseCollection',
        'commonUrl':'../../js/base/commonUrl',
        'keyword':'../../js/base/i18n/resource',
        'common':'../../js/base/common',
        'navigatorView':'../widget/navigator/navview',
        'prompts':'../widget/prompts/prompts',
        'router':'../router',
        'app':'../app',
        'localforage':'../../js/libs/localforage/localforage.min',
        'headView':'../widget/header/headView',
        'icheck':'../../js/libs/icheck/icheck',
        'coursel':'../widget/carousel/carouselView',
        'swipe':'../../js/libs/swipe',
        'fastclick':'../../js/libs/fastclick/lib/fastclick'
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
    _router.on('route:any',_router.routerpath);
    Backbone.history.start({pushState:false,root:"shopcart/shopcartview"});
    var navgator = new NavigatorView();
    navgator.setItemActive(2);
});
