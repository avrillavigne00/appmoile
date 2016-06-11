define([],function(){
	var base=window.localStorage.getItem("baseUrl")||"";
	var Api ={
		orderDetail:base+"../data/orders/orderDetail"+shortName,
		orderList:base+"../data/orders/orderList"+shortName,
		neworderList:"http://223.203.195.168:81/ecp/order/ajaxQryOrderCenterOrder.json",
		orderNew:base+"../data/orders/orderAdd"+shortName,
		productDetail:base+"../data/product/productDetail"+shortName,
		category:base+"../data/category/category"+shortName,
		categoryDefault:base+"../data/category/categoryDefault"+shortName,

		shopcartList:base+"../data/shopcart/shopcartlist"+shortName,

		product:{
			newproductList:'http://localhost/ecp/product/query.json?fpromotionflag=1',
		}
	}
	return Api;
});