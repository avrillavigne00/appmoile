/* =========================
 * 自定义弹出框提示
 *  author:songhlc
 * =========================*/
;(function(root, factory) {
  // Set up prompts appropriately for the environment. Start with AMD.
  if (typeof define === 'function' && define.amd) {
    define(['zepto'], function($) {
      // Export global even in AMD case in case this script is loaded with
      return factory(root, $);
    });

  // Next for Node.js or CommonJS. jQuery may not be needed as a module.
  } else if (typeof exports !== 'undefined') {
    var $ = require('zepto');
    factory(root, $);
  // Finally, as a browser global.
  } else {
    root.Prompts = factory(root, (root.jQuery || root.Zepto || root.ender || root.$));
  }
}(this, function(root, $) {
  var Prompts = {};
  //dom template already combine css to ecm.css and category.html's style list
  Prompts.AlertTPL = "<div id='prompts' class='prompts fadeIn animated'><div class='prompts-header'>提示</div><div class='prompts-body js-prompts-text'></div><div class='prompts-footer'><div id='promptsconfirm' class='btn btn-negative' value='' style='width:80px'>关闭</div></div></div><div id='promptsmask' class='prompts-mask'></div>";
  Prompts.PromptsTPL = "<div id='prompts' class='prompts fadeIn animated'><div class='prompts-header'>提示</div><div class='prompts-body js-prompts-text'></div><div class='prompts-footer'><div id='promptsOK' class='btn btn-negative' value='确定' style='width:80px'></div>&nbsp;&nbsp;&nbsp;&nbsp;<div id='promptsCancel' class='btn btn-negative' value='取消' style='width:80px'></div></div></div><div id='promptsmask' class='prompts-mask'></div>";
  Prompts.hrefYesTPL  = "<div id='prompts' class='prompts fadeIn animated'><div class='prompts-header'>提示</div><div class='prompts-body js-prompts-text'></div><div class='prompts-footer'><a id='promptsOK' class='btn btn-negative' value='是' style='width:80px' href='' target='_blank'>是</a>&nbsp;&nbsp;&nbsp;&nbsp;<div id='promptsCancel' class='btn btn-negative' value='否' style='width:80px'></div></div></div><div id='promptsmask' class='prompts-mask'></div>";
  //show prompts param with text
  Prompts.show =  function(text){
    var iframe = document.createElement("IFRAME");
    iframe.setAttribute("src","data:text/plain,");
    document.documentElement.appendChild(iframe);
    window.frames[0].window.alert(text);
    iframe.parentNode.removeChild(iframe);
    /*$("body").append(Prompts.AlertTPL).find(".js-prompts-text").html(text);
     //bind close btn event to remove prompts
    $("#promptsconfirm").unbind("touchend").bind("touchend",function(vent){
        $("#prompts").remove();
        $("#promptsmask").remove();
        vent.preventDefault();
    });*/
  }
  Prompts.prompts = function(text,callback){
    var iframe = document.createElement("IFRAME");
    iframe.setAttribute("src","data:text/plain,");
    document.documentElement.appendChild(iframe);
    if(window.frames[0].window.confirm(text)){
      if(callback){
            callback();
        }
    }
    iframe.parentNode.removeChild(iframe);
    /*$("body").append(Prompts.PromptsTPL).find(".js-prompts-text").html(text);    
    $("#promptsOK").unbind("touchend").bind("touchend",function(vent){
        $("#prompts").remove();
        $("#promptsmask").remove();
        if(callback){
            callback();
        }
        vent.preventDefault();
    });
    $("#promptsCancel").unbind("touchend").bind("touchend",function(vent){
        $("#prompts").remove();
        $("#promptsmask").remove();
        vent.preventDefault();
    });*/
  } 
  Prompts.hrefYes = function(text,url){
      if(confirm(text)){
        document.location.href=url;
      }
      /*var tpl = $("body").append(Prompts.hrefYesTPL);
      tpl.find(".js-prompts-text").html(text);
      tpl.find("#promptsOK").attr("href",url);
      $("#promptsOK").unbind("touchend");
      $("#promptsCancel").unbind("touchend").bind("touchend",function(vent){
          $("#prompts").remove();
          $("#promptsmask").remove();
          vent.preventDefault();
      });*/
  }
  return Prompts;
}));
