define(["zepto",
        "underscore",
        "backbone",
        "baseView",
        "text!../quickorder/orderedit.vue.html",
        "common",
        "../quickorder/ordermodel",
        "vue",
        "css!../quickorder/ordercard.css"],
    function($,_,Backbone,BaseView,template,Common,Model,Vue){
        var view = BaseView.extend({
            el:$("#main"),
            template:_.template(template),
            vbillorder:{
                el: '#main',
                data: {
                    products:[
                    ]
                },
                computed: {
                    totalmny: function () {
                        var t = 0.0;
                        for(i in this.products){
                            if(this.products[i].mny) {
                                t = t + parseFloat(this.products[i].mny);
                            }
                        }
                        return t;
                    }
                },
                methods: {
                    calcmny: function (prod) {
                        if(prod===null || prod.price===null || prod.num===null){
                            return 0;
                        }
                        var r = parseFloat(prod.price)*parseFloat(prod.num);
                        prod.mny = r+"";
                    }
                }
            },
            url:"../quickorder/orderbill.json",
            events:{
                "touchend .j-submit":"ordersubmit",
                "touchend .j-modify":"modifystatechange"
            },
            queryData : function(op){
                Common.ajax({
                    url:this.url,
                    type:"get",
                    data:op,
                    dataType:"json",
                    success:function(data){
                        var bill = data || {};
                        if(this.option.billid){
                            bill.ordercode= bill.ordercode+"+++"+this.option.billid;
                        }
                        this.render(bill);
                    }.bind(this)
                })
            },
            render:function(data){
                this.viewmodel.$data = data || {};
                this.$el.animate({"opacity":"1"});
                return this;
            },
            initialize:function(option){
                this.option = this.option||{};
                this.$el.html(template);
                if(option && option.queryString) {
                    //eval(option.queryString);
                    this.option[option.queryString.split("=")[0].trim()]=option.queryString.split("=")[1].replace("\"");
                }
                this.$el.css({"opacity":0});
                this.viewmodel = new Vue(this.vbillorder);
                this.queryData(this.option);
            },
            modifystatechange:function(vent){
                var item = $(vent.currentTarget).parents("li");
                if(item.find(".order-info-edit").hasClass("active")){
                    item.find(".order-info-edit").removeClass("active");
                    item.find(".order-info").css({opacity:0}).addClass("active").animate({opacity:1});
                    $(vent.currentTarget).html("修改");
                }
                else{
                    item.find(".order-info").removeClass("active");
                    item.find(".order-info-edit").css({opacity:0}).addClass("active").animate({opacity:1});
                    $(vent.currentTarget).html("完成");
                }
            },
            ordersubmit:function(){
                alert("hi");
            }

        });
        return view;
    }
);