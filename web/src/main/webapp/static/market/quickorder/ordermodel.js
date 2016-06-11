define(["zepto","underscore","backbone","common","baseModel"],function($,_,Backbone,Common,baseModel){
    var orderDetail = baseModel.extend({
        defaults:function(){
            return {
            }
        },
        url:"../ordercard/orderbill.json",
        initialize:function(option){
            this.option = option||{};
            this.query();//this.option);
        },
        query:function(option){
            var that = this;
            Common.ajax({
                url:this.url,
                type:"get",
                data:option,
                dataType:"json",
                success:function(data){
                    if(data && that.option.billid){
                        data.ordercode= data.ordercode+"+++"+that.option.billid;
                    }
                    that.set(data);
                }
            })
        }
    });

    return orderDetail;
})