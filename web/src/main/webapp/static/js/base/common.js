define([
	"localforage",
	"underscore",
	"prompts",
	"../../market/widget/loading/loading",
	"zepto","fastclick"
	],function(localForage,_,Prompts,Loading,$,FastClick) {
	//default backbone method map
	var _MethodMapper = {};
	_MethodMapper.POST = 'create';
	_MethodMapper.PUT = 'update';
	_MethodMapper.GET = "read";

	//重新计算html的字体大小保证使用rem进行设置高宽
	var basefontsize =window.screen.width/10+"px";
	if($("html").css("font-size")!=basefontsize){
		console.log($("html").css("font-size"));
		console.info(basefontsize);
		$("html").css("font-size",basefontsize);
	}
	//fastclick
	if(!$("body").data("fastclick")){
		$("body").data("fastclick",true);
		FastClick.attach(document.body);
	}
	var Common = {};
	/*API说明

	ajax:通用ajax请求

	Collection2Array:backbone collection转成array

	getQueryString:从当前url中获取参数(参数key)

	moneyformat:金额格式化(金额,小数位)

	$imageUrl:...

	*/
	Common.ajax = function(options){
		$.ajax(options);
	}
	Common.Collection2Array = function(collection){
		var objectlist = [];
		try{
			var models = collection.models;
			for(var i=0;i<models.length;i++){
				objectlist.push(models[i].attributes);
			}
		}
		catch(e){

		}
		return objectlist;
	}

	Common.moneyformat=function(s, n)	{
		if(!s)
			return "0.00";
		n = n > 0 && n <= 20 ? n : 2;
		s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
		var l = s.split(".")[0].split("").reverse(),
			r = s.split(".")[1];
		t = "";
		for(i = 0; i < l.length; i ++ )
		{
			t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
		}
		return t.split("").reverse().join("") + "." + r;
	}


	Common.getQueryString = function (name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) {
			return decodeURIComponent(r[2]);    //(r[2]);
		}else{
			var index1 = window.location.href.indexOf('?');
			if(index1>=0){
				r = window.location.href.substring(index1+1).match(reg);
			}else{
				r = window.location.href.substring(0).match(reg);
			}

			if (r != null) {
				return decodeURIComponent(r[2]);    //(r[2]);
			}
			//var ret = getQueryStringArgs(window.location.href,name);
		}
		return '';
	};

	Common.$imageUrl = '../../goodsimg/';

	Common.store =localForage;

	Common.KEY={
		CART:"shopcart"
	}

	return Common;
});
