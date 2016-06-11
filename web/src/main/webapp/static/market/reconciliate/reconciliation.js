define(["zepto",
        "underscore",
        "backbone",
        "vue",
        "baseView",
        "text!../reconciliate/reconciliation.vue.html",
        "common",
        "css!../reconciliate/reconciliation.css",
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
            },
            vmoption:{
                el: '#my',
                data: {
                    items:[
                    ]
                }
            }

        });
        return view;
    }
);