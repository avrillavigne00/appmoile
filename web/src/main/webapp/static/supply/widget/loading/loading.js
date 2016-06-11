define(["zepto"],function($) {
        var loading = {
        };
        var contentHTML = '<div id="maskdiv"></div><div class="spinner" id="loading">'+
                              '<div class="rect1"></div>'+
                              '<div class="rect2"></div>'+
                              '<div class="rect3"></div>'+
                              '<div class="rect4"></div>'+
                              '<div class="rect5"></div>'+
                          '</div>';
        loading.initLoading =  function(selector){
            $(selector).prepend(contentHTML);
        };
        loading.removeLoading = function(){
            $("#loading").remove();
            $("#maskdiv").remove();
        }
    return loading;
});


