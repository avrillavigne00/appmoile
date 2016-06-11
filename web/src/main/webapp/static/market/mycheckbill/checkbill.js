define(["zepto",
        "underscore",
        "backbone",
        "vue",
        "baseView",
        "text!../mycheckbill/checkbill.vue.html",
        "common",
        "css!../goodslist/goodslist.css"
],
    function($,_,Backbone,Vue,BaseView,template,Common){
        var view = BaseView.extend({
            el:$("#main"),
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
                Common.ajax({
                    url:"../json/goodslist.json",
                    type:"get",
                    dataType:"JSON",
                    success:function(data){
                        this.render(JSON.parse(data));
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
                    }
                }
            }

        });
        return view;
    }
);