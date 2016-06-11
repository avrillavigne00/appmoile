define(["zepto",
        "underscore",
        "backbone",
        "vue",
        "baseView",
        "text!../goods/goods.vue.html",
        'text!../goods/goodsfooter.vue.html',
        'text!../goods/goodsproperty.vue.html',
        'coursel',
        "common",
        "css!../goods/goods.css"
    ],
    function ($, _, Backbone, Vue, BaseView, template,footertpl,propertytpl,Coursel,Common) {
        var _self = null;
        var view = BaseView.extend({
            el: $("#main"),
            events: {},
            render: function (data) {
                var self = this;
                this.viewmodel.item = data;
                new Coursel({
                    el:"#coursel",
                    imgheight:"8.32rem",
                    data:self.getImgs(data)
                });
                return this;
            },
            getImgs: function(data) {
                var result = [];
                var pictures = data.pictures || [data.main_picture];
                if (pictures.length == 0) {
                    pictures = [data.main_picture];
                };
                $.each(pictures, function(index, item) {
                    result.push({
                        "imageurl":"../../goodsimg/" + item
                    });
                });
                return result;
            },
            initialize: function (option) {
                _self = this;
                this.wareId = Common.getQueryString("wareId")||1;
                this.$el.css({"opacity": 0});
                //渲染模板
                this.$el.html(template);
                if($("#good-detail-footer").length==0){
                    $("body").append(footertpl);
                }
                $("#specctn").remove();
                $("#main-ctn").append(propertytpl);
                //隐藏状态
                this.hideNav();
                this.bindEvents();
                this.viewmodel = new Vue(this.vmoption);
                this.$el.animate({"opacity": "1"});
                this.queryData();
            },
            //隐藏下方导航页面
            hideNav:function(){
                $("#footer").css("display","none");
                $("#good-detail-footer").css("display","table");
            },
            queryData: function(){
                Common.ajax({
                    url: "../json/goodslist.json",
                    type: "get",
                    dataType: "JSON",
                    success: function (data) {
                        var good = _.findWhere(JSON.parse(data),{ware_id:this.wareId+""});
                        this.render(good);
                    }.bind(this)
                });
            },
            bindEvents:function(){
                /*绑定选择商品规格点击事件*/
                var element = document.getElementById("specchoose");
                //弹出的规格选择框
                var toggletarget = document.getElementById("specctn");
                //遮罩mask
                var mask = document.getElementById("mask");
                //关闭按钮
                var closebtn = document.getElementById("close-btn");
                element.addEventListener("touchend", function(){
                    toggletarget.classList.add("active");
                    mask.classList.add("active");
                });
                mask.addEventListener("touchend",function(){
                    toggletarget.classList.remove("active");
                    mask.classList.remove("active");
                    $("#good-detail-footer").show();
                });
                closebtn.addEventListener("touchend",function(){
                    toggletarget.classList.remove("active");
                    mask.classList.remove("active");
                    $("#good-detail-footer").show();
                });
            },
            vmoption: {
                el: 'body',
                data: {
                    item: {}
                },
                methods:{
                    //选择商品规格
                    propertycheck:function(_data,propertyOptIndex){
                        var alloption = _self.viewmodel.item.property_options[propertyOptIndex].values;
                        for(var i=0;i<alloption.length;i++){
                            alloption[i].check = false;
                        }
                        _data.check = !_data.check;
                    },
                    //数量-1
                    numberminus:function(){
                        if(_self.viewmodel.item.count>1)
                            _self.viewmodel.item.count--;
                    },
                    //数量+1
                    numberplus:function(){
                        _self.viewmodel.item.count++;
                    },
                    //数量改变
                    numberchange:function(){
                        var index = parseInt(_self.viewmodel.item.count);
                        console.log(index);
                    },
                    //加入购物车操作
                    add2cart:function(){
                        //弹出的规格选择框
                        var toggletarget = document.getElementById("specctn");
                        //遮罩mask
                        var mask = document.getElementById("mask");
                        toggletarget.classList.add("active");
                        mask.classList.add("active");
                        $("#good-detail-footer").hidenpm();
                    },
                    //选完规格之后加入购物车
                    add2cartconfirm:function(){
                        Common.store.getItem(Common.KEY.CART).then(function(carts){
                            if(!carts||!(carts instanceof Array)){
                                carts = [];
                            }
                            //if(_.findWhere(JSON.parse(data),{ware_id:this.wareId});)
                            var good = _.findWhere(carts,{ware_id:_self.viewmodel.item.ware_id});
                            if(good){
                                alert("购物车中已存在该商品!");
                            }
                            else{
                            	// 暂时随便获取一个cartid
                            	_self.viewmodel.item.cart_id = Math.random(1000);
                                carts.push(_self.viewmodel.item);
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