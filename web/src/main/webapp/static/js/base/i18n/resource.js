define(function(){	
	var keyword = {};

	var _amount = "金额";


	keyword.back ="返回";
	keyword.choose = "选择";
	keyword.copy = "复制";
	keyword.submit = "提交";
	keyword.remove ="删除";
	keyword.confirm = "确认";
	keyword.clearAll ="清空";

	keyword.main={};
	keyword.main.title="主页";
	keyword.main.categorytype ="类目";
	keyword.main.categoryProduct = "产品线";
	keyword.main.categoryBrand = "品牌";
	keyword.main.productlist ="商品列表";
	keyword.main.category = {};
	keyword.main.category.productLine = "ProductLine";
	keyword.main.category.brand = "Brand";

	keyword.main.navigtorTitle = "导航";
	keyword.main.announcementTitle = "公告";
	keyword.main.newsTitle = "新品";
	keyword.main.specialsTitle = "促销";

    keyword.main.signin = "签收";
    keyword.main.signinhref = "签收";
    keyword.main.signindetail = "签收详细";
       
	keyword.orders={};
	keyword.orders.title="订单";
	keyword.orders.myorders = "我的订单";
	keyword.orders.orderdetail = "订单明细";
	keyword.orders.orderlinedetail ="订单行明细";
	keyword.orders.neworder = "新订单";
	keyword.orders.orderconfirm = "订单确认";
	keyword.orders.ordercommit = "订单提交";
	keyword.orders.Amount = _amount;
	keyword.orders.More = "加载更多";
	keyword.orders.Noorders = "暂时没有更多订单";

	keyword.product={};
	keyword.product.title ="商品";
	keyword.product.productdetail ="商品详情";
	keyword.product.productlist ="商品列表";
	keyword.product.noprice = "暂无价格";
	keyword.product.nodata = "暂无记录";

	keyword.shopcart={};
	keyword.shopcart.title = "购物车";
	keyword.shopcart.prompt = {
		pleaseselectproduct :"请先选择商品",
		noenoughinventory:"库存不足"
	};
	keyword.shopcart.Amount = _amount;
	keyword.shopcart.SettleAccount = "去结算";

	keyword.fortune = {};
	keyword.fortune.title = "财富";
	keyword.fortune.tip = {};
	keyword.fortune.tip.noFinOrg = "没有查询到对应的财务组织";

	keyword.fortune.credit = {
		balance : "余额：",
		limit:"额度：",
		channeltype:'渠道类型：',
		all:"全部",
		productline:'产品线：',
		detailtitle:'信用明细'
	};
	keyword.fortune.fund = {
		paymentorder:{
			source:"付款单",
			dest:"付款"
		},
		payableorder:{
			source:"应付单",
			dest:"应付"	
		},
		notconfirmorder:{
			source:"未确认应付单",
			dest:"暂估应付"	
		},
		todayamount:"本日小计",
		detailtitle:"资金明细",
		periodstart:"期初",
		totalamount:"总计"
	};
	keyword.fortune.expense = {
		detailtitle:"费用明细"
	};
	keyword.fortune.financialorg = '结算财务组织';

	
	keyword.indicator = {};
	keyword.indicator.title = "指标";
	keyword.indicator.name = "指标名称";
	keyword.indicator.org = "销售组织";
	keyword.indicator.matername = "物料维度";
	keyword.indicator.periodname = "指标期间";
	keyword.indicator.planValue = "计划值";
	keyword.indicator.actualValue = "实际值";
	/*keyword.favorite ={};
	keyword.favorite.favoriteList ="我的关注";*/

	keyword.promptinfo = {};
	keyword.promptinfo.loadingfinished = "全部加载完毕";
	keyword.promptinfo.isloading = "正在加载...";

	return keyword;

})
