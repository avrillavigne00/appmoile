
define(["zepto",
        "underscore",
        "backbone",
        "vue",
        "baseView",
        "text!indexview.vue.html",
        "common",
        "coursel",
        "css!index.css"
],function($,_,Backbone,Vue, BaseView,template,Common,Coursel){
        var view = BaseView.extend({
            el:$("#main"),
            events:{
                "touchend #id":"clickme"
            },
            render:function(data){
                this.viewmodel.items=data;
                return this;
            },
            renderCategory:function(data){
                this.categoryViewModel.items=data;
                return this;
            },
            initialize:function(option){
                /*初始化轮播*/

                this.$el.css({"opacity":0});
                this.$el.html(template);
                new Coursel({el:$("#coursel")});
                this.viewmodel = new Vue(this.vmoption);
                this.categoryViewModel = new  Vue(this.categoryvmoption);
                this.$el.animate({"opacity":"1"});
                this.queryData();
                this.queryCategory();
            },
            queryData:function(){
                Common.ajax({
                    url:"../json/recently.json",
                    type:"get",
                    dataType:"JSON",
                    success:function(data){
                        this.render(JSON.parse(data));
                    }.bind(this)
                });
            },

            queryCategory:function(){
                Common.ajax({
                    url:"../json/index_category.json",
                    type:"get",
                    dataType:"JSON",
                    success:function(data){
                        this.renderCategory(JSON.parse(data));
                    }.bind(this)
                });
            },

            categoryvmoption:  {
                el: '#categoryview',
                data: {
                    items:[
                    ]
                }
            },
            vmoption:{
                el: '#recentview',
                data: {
                    items:[
                    ]
                }
            }

        });
        return view;
    }
);