define(["zepto",
        "underscore",
        "backbone",
        "vue",
        "baseView",
        "text!../accountcenter/address_choise.vue.html",
        "common",
        "css!../accountcenter/accountcenter.css"
    ],
    function($,_,Backbone,Vue,BaseView,template,Common){
        var view = BaseView.extend({
            el:$("#main-ctn"),
            events:{

            },
            render:function(data){
                this.viewmodel.items=data;
                return this;
            },
            initialize:function(option){
                this.$el.css({"opacity":0});
                this.$el.html(template);
                this.viewmodel = new Vue(this.vmoption);
                this.$el.animate({"opacity":"1"});
                this.queryData();
            },
            queryData:function(){
                var self = this;
                //todo:先获取Store,没有就从json读取到Store
                Common.store.getItem(Common.KEY.ADDRESS).then(function(address){
                    if (address == null) {
                        Common.ajax({
                            url:"../json/consignee.json",
                            type:"get",
                            dataType:"JSON",
                            success:function(data){
                                var v = JSON.parse(data);
                                Common.store.setItem(Common.KEY.ADDRESS,v).then(function(){
                                    console.log(v);
                                });
                                self.render(v);
                            }.bind(self)
                        });
                    }
                    else {
                        self.render(address);
                    };
                }.bind(self));
            },
            vmoption:{
                el: '#main-ctn',
                data: {
                    items:[
                    ]
                },
                methods: {
                    choise: function(id) {
                        var self = this;
                        var current = null;
                        $.each(self.items, function(index, item) {
                            if (item.id == id){
                              current = item;
                                return false;
                            }
                        });

                        Common.store.setItem(Common.KEY.CHOISEADDRESS,current).then(function(){
                            window.location.href = '#orderconfirm/orderconfirmview';
                        });
                    }
                }
            }

        });
        return view;
    }
);