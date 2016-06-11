define(["zepto",
        "underscore",
        "backbone",
        "vue",
        "baseView",
        "text!../goodslist/goodslist.vue.html",
        "common",
        "css!../goodslist/goodslist.css"
],
    function($,_,Backbone,Vue,BaseView,template,Common){
        var _self = null;
        var view = BaseView.extend({
            el:$("#main"),
            events:{

            },
            render:function(data){
                this.viewmodel.items=data;
                return this;
            },
            initialize:function(option){
                _self = this;
                this.$el.css({"opacity":0});
                this.$el.html(template);
                this.viewmodel = new Vue(this.vmoption);
                this.$el.animate({"opacity":"1"});
                this.queryData();
            },
            queryData:function(){
                Common.ajax({
                    url:window.ctx.serverhosts+"/products",
                    //url:"../json/goodslist2.json",
                    type:"get",
                    dataType:"JSON",
                    success:function(data){
                        var json = JSON.parse(data);
                        console.info("products:"+json)
                        if (json.status.status_code == "0") {
                            var result = json.result
                            //TODO temp field add
                            if (Array.isArray(result)) {
                                result.forEach(function(elem) {
                                    elem["supplier"]={
                                        "id": 1,
                                        "supplier_name": "天猫政企采购平台"
                                    }
                                    elem["count"]=1
                                    elem["cart_id"]=elem.YWM_ID
                                    elem["ware_id"]=elem.YWM_ID
                                });
                            }
                            console.info(JSON.stringify(result))
                            this.render(result);
                        }
                    }.bind(this)
                });
            },
            vmoption:{
                el: '#goodslist',
                data: {
                    items:[
                    ],
                    active: 'price',
                    asc: true
                },
                methods: {
                    sort: function(sortName) {
                        var self = this;
                        if (self.active == sortName) {
                            self.asc = !self.asc;
                        }
                        self.active = sortName;
                        self.items.reverse();
                    },
                    //选完规格之后加入购物车
                    add2cartconfirm:function(index){
                        console.info(index);
                        var item = _self.viewmodel.items[index];
                        Common.store.getItem(Common.KEY.CART).then(function(carts){
                            if(!carts||!(carts instanceof Array)){
                                carts = [];
                            }
                            //if(_.findWhere(JSON.parse(data),{ware_id:this.wareId});)
                            var good = _.findWhere(carts,{ware_id:item.ware_id});
                            if(good){
                                alert("购物车中已存在该商品!");
                            }
                            else{
                                // 暂时随便获取一个cartid
                                item.cart_id = item.YWM_ID;
                                //item.cart_id = Math.random(1000);
                                carts.push(item);
                                Common.store.setItem(Common.KEY.CART,carts).then(function(){
                                    alert("添加成功!");
                                });
                            }
                        });
                    }
                }
            }
        });
        return view;
    }
);