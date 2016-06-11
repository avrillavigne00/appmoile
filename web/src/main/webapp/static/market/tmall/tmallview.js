define(["zepto",
        "underscore",
        "backbone",
        "vue",
        "baseView",
        "text!../tmall/tmall.vue.html",
        "common"
    ],
    function ($, _, Backbone, Vue, BaseView, template, Common) {
        var view = BaseView.extend({
            el: $("#main"),
            events: {},
            render: function (data) {
                return this;
            },
            initialize: function (option) {
                this.$el.html(template);
            }
        });
        return view;
    }
);