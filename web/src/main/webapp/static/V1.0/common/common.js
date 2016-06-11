define([
	"localforage",
	"underscore","prompts","widget/loading/loading"
	],function(localForage,_,Prompts,Loading) {
	//default backbone method map
	var _MethodMapper = {};
	_MethodMapper.POST = 'create';
	_MethodMapper.PUT = 'update';
	_MethodMapper.GET = "read";
	var Common = {};
	Common.ajax = function(options){
		$.ajax(options);
	}
	return Common;
});
