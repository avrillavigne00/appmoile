define(["zepto",
        "underscore",
        "backbone",
        "vue",
        "baseView",
        "text!categoryview.vue.html",
        "common",
        "css!category.css",
    ],
    function ($, _, Backbone, Vue, BaseView, template, Common) {
        var view = BaseView.extend({
            el: $("#main"),
            events: {},
            render: function (data) {
                this.viewmodel.items = data;
                this.viewmodel.subitems = data[0].childs;
                this.viewmodel.$nextTick(function() {
                    $('#mc_' + data[0].category_id).addClass('active');
                });
                return this;
            },
            initialize: function (option) {
                this.$el.css({"opacity": 0});
                this.$el.html(template);
                this.viewmodel = new Vue(this.vmoption);
                this.$el.animate({"opacity": "1"});
                this.queryData();
            },
            queryData: function () {
                Common.ajax({
                    url: "../json/category.json",
                    type: "get",
                    dataType: "JSON",
                    success: function (data) {
                        this.render(JSON.parse(data));
                    }.bind(this)
                });
            },
            vmoption: {
                el: '#category',
                data: {
                    items: [],
                    subitems: [],
                    isActive: ''
                },
                ready: function() {

                },
                methods: {
                    categoryClick: function (id, event) {
                        var self = this;
                        $.each(this.items, function(index, item) {
                            if (item.category_id == id) {
                                self.subitems = item.childs;
                                self.isActive = item.category_id;
                                $(event.currentTarget).siblings().removeClass('active');
                                $(event.currentTarget).addClass('active');
                                return false;
                            }
                        });
                    }


                }
            }

        });
        return view;
    }
);