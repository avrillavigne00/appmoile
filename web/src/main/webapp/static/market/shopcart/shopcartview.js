define(["zepto",
        "underscore",
        "backbone",
        "vue",
        "baseView",
        "text!shopcartview.vue.html",
        "common",
        "icheck",
        "css!shopcart.css",
        "css!../../js/libs/icheck/skins/square/blue.css"
    ],
    function ($, _, Backbone, Vue, BaseView, template, Common) {
        var view = BaseView.extend({
            el: $("#main"),
            events: {},
            render: function (data) {
                var suppliers = [];
                //console.info(JSON.stringify(data))
                $.each(data, function (index, item) {

                    console.info(JSON.stringify(item))
                    var isExist = false;
                    _.each(suppliers,function(supplier){
                        if (supplier == item.supplier.supplier_name) {
                            isExist = true;
                            return;
                        }
                    });
                    if (!isExist) {
                        suppliers.push(item.supplier.supplier_name);
                    }
                });
                this.viewmodel.suppliers = suppliers;
                this.viewmodel.setData(data);
                this.viewmodel.$nextTick(function () {
                    $('#btnEdit').on('click', function () {
                        $('.del-item').toggle();
                    });
                });
                return this;
            },
            initialize: function (option) {
                this.$el.css({"opacity": 0});
                this.$el.html(template);
                Vue.filter('supplierBy', function (value, filterv) {
                    var result = [];
                    $.each(value, function (index, item) {
                        if (item.supplier.supplier_name == filterv) {
                            result.push(item);
                        }
                    });
                    return result;
                });

                this.viewmodel = new Vue(this.vmoption);

                this.$el.animate({"opacity": "1"});
                this.queryData();
            },
            queryData: function () {
                //if (window.localStorage) {
                //    data = sessionStorage.getItem("shopcart");
                //    this.render(JSON.parse(data));
                //}
            	//todo:目前从localforage里面取后续改成从服务器端动态获取
                Common.store.getItem(Common.KEY.CART).then(function(carts){
                	this.render(carts);
                }.bind(this));
            	/*
            	Common.ajax({
                    url: "../json/shopcart.json",
                    type: "get",
                    dataType: "JSON",
                    success: function (data) {
                        this.render(JSON.parse(data));
                    }.bind(this)
                });
                */
            },
            vmoption: {
                el: '#main-ctn',
                data: {
                    suppliers: [],
                    items: [],
                    isEdit: false,
                    setData: function(data) {
                        var self  = this;
                        self.items = [];
                        $.each(data, function(index, item) {
                            item.checked = true;
                            self.items.push(item);
                        });
                    }
                },
                computed: {
                    // 一个计算属性的 getter
                    amount: function () {
                        // `this` 指向 vm 实例
                        var self = this;
                        var mount = 0;
                        $.each(self.items, function(index, item) {
                            if (item.checked) {
                                mount += item.YWM_Price * item.count;
                            }
                        });
                        return mount;
                    }
                },
                methods: {
                    edit: function () {
                        alert('edit');
                    },
                    setData: function(data) {
                       this.items = data;
                    },
                    delete: function () {
                        var self = this;
                        self.items.splice(0, 1);
                        var _data = JSON.stringify(self.items);
                        Common.store.setItem(Common.KEY.CART,JSON.parse(_data));
                    },
                    selectedGroup: function(id, event) {
                        var checked = $(event.currentTarget).attr('checked');
                        var groupName =  $(event.currentTarget).attr('name');
                        var self = this;
                        $.each(self.items, function(index, item) {
                            if (item.supplier.supplier_name == groupName)
                            item.checked = checked;
                        });
                    },
                    selectedAll: function (event) {
                        var self = this;
                        var checked = $(event.currentTarget).attr('checked');
                        $.each(self.items, function(index, item) {
                            item.checked = checked;
                        });
                    }
                }
            }

        });
        return view;
    }
);