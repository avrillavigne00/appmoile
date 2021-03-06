define(["zepto",
        "underscore",
        "backbone",
        "vue",
        "baseView",
        "text!../accountcenter/address.vue.html",
        "common",
        "css!../accountcenter/accountcenter.css"
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
                    url:"../accountcenter/address.json",
                    type:"get",
                    dataType:"JSON",
                    success:function(data){
                        var v = JSON.parse(data);
                        this.render(v);
                    }.bind(this)
                });
            },
            vmoption:{
                el: '#addresslist',
                data: {
                    items:[
                    ]
                }
            }

        });
        return view;
    }
);