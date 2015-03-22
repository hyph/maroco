seajs.config({alias:{dot:"js/vendor/doT.min",ztree:"js/vendor/zTree/jquery.ztree.all-3.5.min.js"},paths:{ui:"js/ui"},vars:{locale:"cn"},map:[[/^(.*\.(?:css|js))(.*)$/i,"$1?20150101"]]}),function(a){"use strict";var b=function(b){return b.$=function(b){return a(b,this.el)},b.el=a(b.el||"<div/>"),b.init&&b.init(),_.each(b.events,function(c,d){var e=d.indexOf(" ");b.el.on(-1==e?d:d.slice(0,e),-1==e?"":a.trim(d.slice(e+1)),function(a){var d=_.isString(c)?b[c]:c;return d?d.call(this,a,b):void 0})}),b.create&&b.create(),b};_.extend(b,{illegalCharacter:/[^\\\/:\*\?\"<>\|]/,count:15,server:seajs.data.base});var c;c=window.ActiveXObject?{ie:window.atob?10:document.addEventListener?9:document.querySelector?8:window.XMLHttpRequest?7:6}:{ie11:"-ms-scroll-limit"in document.documentElement.style&&"-ms-ime-align"in document.documentElement.style,chrome:!!window.chrome&&window.chrome.webstore,firefox:!!window.sidebar&&!window.sidebar.nodeName,safari:/constructor/i.test(window.HTMLElement),opera:!!window.opera||/opera|opr/i.test(navigator.userAgent)},b.browser=c;var d=Object.create||function(a){function b(){}return b.prototype=a,new b};if(_.mixin({guid:function(a){var b,c=_.now().toString(32);for(b=0;5>b;b++)c+=Math.floor(65535*Math.random()).toString(32);return c+=_.uniqueId().toString(32),a?a+c:c},proto:function(a,b){var c=d(a);return b?_.extend(c,b):c},dot:doT.template,queryString:function(b,c,d){var e={};if("string"!=typeof b||0===a.trim(b).length)return e;b=a.trim(b).replace(/^\?+/,"");var f,g,h,i,j=b.split(c||"&"),k=/^(\w+)\[\]$/;d=d||"=";for(var l=0;l<j.length;l++)f=j[l].split(d),g=decodeURIComponent(a.trim(f[0])),h=decodeURIComponent(a.trim(f.slice(1).join(d))),i=g.match(k),i&&i[1]&&(g=i[1]),e.hasOwnProperty(g)?(_.isArray(e[g])||(e[g]=[e[g]]),e[g].push(h)):e[g]=i?[h]:h;return e}}),c.ie<10){var e=/^INPUT|TEXTAREA$/,f=function(a){return e.test(a.nodeName)};a.event.special.input={setup:function(){if(!f(this))return!1;var b=this,d=this.value,e=function(){d!==b.value&&(d=b.value,a.event.trigger("input",null,b))};d=b.value,9==c.ie&&(a.event.add(b,"keyup._inputFixed",function(a){var b=a.originalEvent.keyCode;(8==b||46==b)&&e()}),a.event.add(b,"cut._inputFixed",function(){setTimeout(e)})),b.attachEvent("onpropertychange",a.data(b,"@inputFixed",function(a){"value"==a.propertyName.toLowerCase()&&e()}))},teardown:function(){return f(this)?(9==c.ie&&a.event.remove(this,"._inputFixed"),this.detachEvent("onpropertychange",a.data(this,"@inputFixed")),void a.removeData(this,"@inputFixed")):!1}}}a.fn.input=function(a){return this.on("input",a)};var g=function(b){return b=a.extend({baseparams:{},beforeLoad:a.noop,afterLoad:a.noop,load:function(c){this.url&&(this.xhr&&this.xhr.abort(),this.beforeLoad(c),c&&(this.filter=c,this.page=c.page||1),this.xhr=a.ajax({url:this.url,data:a.extend({},this.baseparams,{page:this.page,count:this.count},this.filter),cache:this.cache,dataType:"JSON",success:function(a){b.afterLoad(a)}}))}},b),b.count&&!b.page&&(b.page=1),b};b.loader=g;var h=["log","silver","note","info","safe","warn","error","link","dark"],i=b.button=function(c,d){var e=a(c);return void 0===e.data("btype")&&(d=d||_.find(h,function(a){return e.hasClass(a)}),d&&(e.addClass(d+"-hover"),e.mouseenter(function(){a(this).addClass(d+"-hover")}).mouseleave(function(){a(this).removeClass(d+"-hover")}).mousedown(function(c){var e=a(this);e.hasClass("active")||(c.preventDefault(),e.addClass(d+"-active"),a(document).one("mouseup",function(){e.removeClass(d+"-active"),b.browser.ie<8&&e[0].blur()}))})),e.data("btype",d)),e};a(document).on("mouseenter",".b."+h.join(",.b."),function(){i(this)}).on("click",'a[href="#"]',function(){return!1}),b.tabs=function(c){return b(a.extend(!0,{active:function(a){this.tabs.find("a:eq("+a+")").trigger("click")},onActive:a.noop,cache:{},getPanel:function(b){var c,d=b.getAttribute("panel"),e=this.cache;if(d){if(e[d])return e[d];if(c=0==d.indexOf("#")?a(d):this.$(d),c.length)return e[d]=c}},events:{"click a":function(b,c){var d=this,e=a(d),f=e.attr("panel");if(this!=c.tab&&f){c.tabs.find("a").each(function(a,b){if(b!==d){var e=c.getPanel(b);e&&e.hide()}}),e.parent().addClass("active").siblings().removeClass("active");var f=a(f).show();return c.onActive(d,f),c.tab=d,c.panel=f,!1}}},init:function(){this.tabs=this.el.children(".tab")},create:function(){this.active(0)}},c))},define("ui",function(require){return require("api"),b}),window.UI=b}(jQuery),$.ajaxSetup({cache:!UI.browser.ie,complete:function(){},data:{},error:function(){}}),$(document).ajaxSend(function(a,b,c){var d=c.target;d&&(d.data("_waiting_")?(b.abort(),d.trigger("waiting",[null])):d.data("_waiting_",1).trigger("waiting",c))}).ajaxSuccess(function(a,b){b.responseJSON&&999==b.responseJSON.errorCode}).ajaxComplete(function(a,b,c){var d=c.target;d&&d.removeData("_waiting_").trigger("waiting")}),function(){if(!window.console){var a=window.console={};_.each("assert clear count debug dir dirxml error exception group groupCollapsed groupEnd info log markTimeline profile profileEnd table time timeEnd timeStamp trace warn".split(" "),function(b){a[b]=$.noop})}}(),UI.browser.ie<9&&_.each("abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video".split(" "),function(a){document.createElement(a)});