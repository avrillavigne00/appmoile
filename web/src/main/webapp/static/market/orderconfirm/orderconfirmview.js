define(["zepto",
        "underscore",
        "backbone",
        "vue",
        "baseView",
        "text!orderconfirm.vue.html",
        "common",
        "icheck",
        "css!orderconfirm.css",
        "css!../../js/libs/icheck/skins/square/blue.css"
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
                    url:"orderconfirm.json",
                    type:"get",
                    dataType:"JSON",
                    success:function(data){
                        this.render(JSON.parse(data));
                    }.bind(this)
                });
            },
            vmoption:{
                el: '#shopcartlist',
                data: {
                    items:[
                    ]
                }
            }

        });
        return view;
    }
);