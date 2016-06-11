define(["zepto",
        "underscore",
        "backbone",
        "baseView",
        "text!../account/address.tpl.html",
        "common"],
    function($,_,Backbone,BaseView,template,Common){
        var view = BaseView.extend({
            el:$("#main"),
            template:_.template(template),
            events:{

            },
            render:function(option){
                this.$el.animate({"opacity":"1"});
                return this;
            },
            initialize:function(option){
                this.$el.css({"opacity":0});
                this.$el.html(this.template());
                this.render();
            },
            query4more:function(vent){
                this.render();
            }

        });
        return view;
    }
);