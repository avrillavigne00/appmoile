define(["zepto",
        "underscore",
        "backbone",
        "baseView",
        "text!indexview.tpl.html",
        "common",
        "coursel",
        "css!index.css"
    ],function($,_,Backbone,BaseView,template,Common,Coursel){
        var view = BaseView.extend({
            el:$("#main"),
            template:_.template(template),
            events:{
                "touchend #id":"clickme"
            },
            render:function(option){
                this.$el.html(this.template({ model:this.model
                }));
                /*初始化轮播*/
                new Coursel({el:$("#coursel")});
                this.$el.animate({"opacity":"1"});
                return this;
            },
            initialize:function(option){
                this.$el.css({"opacity":0});
                this.render();
            },
            click:function(){

            }
        });
        return view;
    }
);