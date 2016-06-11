define(["zepto",
        "underscore",
        "backbone",
        "baseView",
        "text!../order/orderlistview.tpl.html",
        "text!../order/orderlistpage.tpl.html",
        "common",
        "css!../order/orderlistview.css"],
    function($,_,Backbone,BaseView,template,pageTemplate,Common){
        var view = BaseView.extend({
            el:$("#main"),
            template:_.template(template),
            pageTempalte: _.template(pageTemplate),
            events:{
                "touchend .j-query4more":"query4more"
            },
            render:function(option){
                //this.$el.html(this.template({ model:this.model
                //}));
                var tpl = this.pageTempalte();
                this.$el.find("#datalist").append(tpl);
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