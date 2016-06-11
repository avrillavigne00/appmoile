define(["zepto", "underscore", "backbone", "common", "widget/loading/loading"], function($, _, Backbone, common, Loading) {
    var behaviors = {};

    function formDataBuilder(value, key, formData) {
        if (value instanceof Array) {
            _.each(value, function(subitem, i) {
                formDataBuilder(subitem, key + "[" + i + "]", formData);
            })
        } else if (Object.prototype.toString.call(value) == '[object Object]') {
            _.each(value, function(subValue, subkey) {
                formDataBuilder(subValue, key + "." + subkey, formData);
            })
        } else {
            if (value || value == 0) {
                formData[key] = value;
                //formData += key + '=' + value +'&';
                //formData.append(key,value);
            }
        }
        //return formData;
    }
   
    /*使用loading加载图的url列表*/
    var useLoadingURL = [];
    /*判断是否需要加载loading图*/
    function isUseLoadingURL(url) {
        for (item in useLoadingURL) {
            if (url.indexOf(useLoadingURL[item]) > 0) {
                return true;
            }
        }
        return false;
    }
    behaviors.sync = function(method, modelOrCol, options) {
        /*如果服务器端不支持rest服务，则启用遗留uri进行请求*/
        if (Backbone.emulateHTTP) {
            var option = common.getMethodFromUrl(options.url || this.url);
            var _url = common.baseUrl + option.URL;
            options.url = _url;
            method = option.HTTPMETHOD;
            options.beforeSend = function(jqXHR, settings) {
                jqXHR.setRequestHeader(common.KEYS_TOKEN, common.token);
                // jqXHR.setRequestHeader('Content-Type', "application/x-www-form-urlencoded; charset=UTF-8");
            }
            /*判断是否在需要使用loading的ajax请求里*/
            if (isUseLoadingURL(_url)) {
                //$("body").initLoading();
                Loading.initLoading("body");
                var fnsuccess = options.success;
                options.success = function(data, response) {
                    fnsuccess(data, response);
                    //$("body").removeLoading();
                    Loading.removeLoading();
                }
            }
            //如果是post 通过form data的方式提交数据 model.save提交的数据在model.
            //attributes之中，如果通过fetch方式提交post请求，参数放在options.data之中
            if (method == common.MethodMapper.POST) {
                //var formData = new FormData();
                var formData = {};
                if (modelOrCol instanceof Backbone.Model) {
                    //调用model的save，delete，update时options.data为空
                    //options.data 不为空则说明是通过post请求查询model，查询参数为options.data
                    if (!options.data) {
                        _.each(modelOrCol.attributes, function(value, key) {
                            // formData=formDataBuilder(value,key,formData);
                            formDataBuilder(value, key, formData);
                        });
                        //formData = formData.substring(0, formData.length-1);
                        _.defaults(options || (options = {}), {
                            data: $.param(formData),
                            processData: false,
                            contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
                        });
                    } else {
                        options.data = $.param(options.data || {});
                    }
                } else if (modelOrCol instanceof Backbone.Collection) {
                    if ((options.data && options.data[common.KEYS_QUERYPAGE]) || modelOrCol.models.length == 0) {
                        options.data = $.param(options.data || {});
                    } else if (modelOrCol.models.length > 0) {
                        _.each(modelOrCol.models, function(model, i) {
                            _.each(model.attributes, function(value, key) {
                                //formData=formDataBuilder(value,"multiOrderUIViews["+i+"]."+key,formData);
                                formDataBuilder(value, "multiOrderUIViews[" + i + "]." + key, formData);
                            });
                        });
                        // Set processData and contentType to false so data is sent as FormData
                        //formData = formData.substring(0, formData.length-1);
                        _.defaults(options || (options = {}), {
                            data: $.param(formData),
                            processData: false,
                            contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
                        });
                    }
                    //options.data = $.param(model.attributes);
                } else {
                    options.data = $.param(options.data);
                }
            } else {
                if (options.data) {
                    options.data = $.param(options.data);
                }
            }
            /*在ajax:error中捕获跳转到登录页面的信息*/
            options.error = function(response, errorType, error) {
                if (response.responseText === "gotoLogin" || response.responseText === "invalidToken" || errorType === "abort" || errorType === "timeout") {
                    window.location.href = "../../../index.html";
                } else if (response.responseText !== "") {
                    var responseContent = $(response.responseText);
                    if (responseContent.find(".message").html() != "") {
                        var _errorMessage = responseContent.find(".message").html();
                        var _isShowErrorMessage = true;
                        //没有分配信用控制域则不显示此业务异常
                        if(_errorMessage.indexOf("没有分配信用控制域")>0){
                            _isShowErrorMessage = false;
                        }
                        if(_isShowErrorMessage){
                            common.Prompts.Show(common.Message.Error.ajaxError + _errorMessage);
                        }
                    } else {
                        common.Prompts.Show(common.Message.Error.ajaxError + "发生错误，请确认数据是否正确后重试！");
                    }
                } else {
                    common.Prompts.Show(JSON.stringify(response));
                }
                Loading.removeLoading();
            }
        }
        return Backbone.sync(method, modelOrCol, options);
    };
    return behaviors;
});