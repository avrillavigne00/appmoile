define(["zepto",
        "underscore",
        "backbone",
        "baseView",
        "text!categoryview.tpl.html",
        "common",
        "css!category.css"],
    function($,_,Backbone,BaseView,template,Common){
        var view = BaseView.extend({
            el:$("#main"),
            template:_.template(template),
            events:{

            },
            render:function(option){
                this.$el.html(this.template({ model:this.model
                }));
                this.$el.animate({"opacity":"1"});
                return this;
            },
            initialize:function(option){
                this.$el.css({"opacity":0});
                this.render();
            }

        });
        return view;
    }
);