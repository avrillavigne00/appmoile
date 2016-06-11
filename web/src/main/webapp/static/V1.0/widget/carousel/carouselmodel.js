define(["zepto","underscore","backbone"],function($,_,Backbone){
	var category = Backbone.Model.extend({
		defaults:function(){
			return {
				imageAlt: "",
				imageUrl: "",
				imgLink: "./html/product/product.html?id=1003ZF100000000132N9",
				thumbAlt: "",
				thumbDesc: "",
				thumbTitle: "",
				thumbUrl: "/null",
				pId:""
			}
		},		
		parse:function(response){
			var imgLink = response.imgLink;
			if(imgLink && imgLink.indexOf('=')>0){
				var pId = imgLink.split('=')[1];
				if(pId.indexOf('&')>0){
					response.pId = pId.split('&')[0];
				}				
				else{
					response.pId = pId;	
				}
				
			}
			else{
				response.pId = "";
			}
			return response;
		}
	});
	return category;
})