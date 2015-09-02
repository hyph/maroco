define("js/ui/valid",["ui/notify"],function(e,i,t){var l=e("ui/notify").tips,a="validate",n={onKeyup:!0,rules:{},labels:{},eachField:$.noop,eachInvalidField:$.noop,eachValidField:$.noop,invalid:$.noop,valid:$.noop,label:function(e,i){return i?e?'<span class="c-safe"><i class="f f-checkmark"></i> '+e+"</span>":"":e.length?'<span class="c-error"><i class="f f-warn"></i> '+e+"</span>":""},showLabel:function(e,i,t){e=$(e),i=i.join?i.join(" ; "):i;var a=e.data("label"),n=$(e[0].form);if(a&&(a=0==a.indexOf("#")?$(a):n.find(a)),a&&a.length)a.html(this.label(i,t));else{var r=e.data("__tipid__");r||e.data("__tipid__",r=_.uniqueId("validTip_")),i.length?l({id:r,of:e,msg:'<i class="f f-'+(t?"checkmark":"warn")+'"></i> '+i,cls:(t?"safe":"error")+" validate-tips",dir:e.data("dir")||this.tipDir||"rc",within:this.tipWithin||n}):$("#"+r).hide()}}},r=['input:not([type]),input[type="color"],input[type="date"],input[type="datetime"],input[type="datetime-local"],input[type="email"],input[type="file"],input[type="hidden"],input[type="month"],input[type="number"],input[type="password"],input[type="range"],input[type="search"],input[type="tel"],input[type="text"],input[type="time"],input[type="url"],input[type="week"],textarea',"select",'input[type="checkbox"],input[type="radio"]'],d=r.join(","),u={required:{label:["请输入必填项","请选择一项"]},email:{rule:/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/,label:"请输入正确的邮箱格式"},charsafe:{rule:/^[^\\\/:\*\?\"<>\|]*$/,label:'不能包含/:*?"<>|等字符'},length:{rule:function(e,i,t,l){var a;return a=2==t.fieldType?s(t.fieldGroup.filter(":checked").length,0,i,l.label2):s(e.length,0,i,l.label)},label:["","至少输入 {0} 个字符","最多输入 {1} 个字符","请输入 {0} 到 {1} 个字符"],label2:["","至少选择 {0} 项","最多选择 {1} 项","请选择 {0} 到 {1} 项"]},"int":{rule:function(e,i,t,l){var a=s(e,!o.test(e),i,l.label);return a},label:["请输入整数","请输入整数,最小值 {0}","请输入整数,最大值 {1}","请输入 {0} 到 {1} 的整数"]},"float":{rule:function(e,i,t,l){var a=s(e,!$.isNumeric(e),i,l.label);return a},label:["请输入一个数","请输入一个数,最小值 {0}","请输入一个数,最大值 {1}","请输入 {0} 到 {1} 的一个数","最多保留{2}位小数"]},mobile:{rule:/^1\d{10}$/,label:"请输入11位手机号码"},equal:{rule:function(e,i,t,l){var a=this[0].form;return a[i].value!==e?l.label:void 0},label:"两次输入的密码不一样"}},s=function(e,i,t,l,a){t=t?_.map(t.split(","),function(e){return parseFloat(e)}):[];var n=l[0];return $.isNumeric(e)||(i=1),t[0]&&t[1]?(n=l[3],(i||e<t[0]||e>t[1])&&(i=1)):t[1]?(n=l[2],(i||e>t[1])&&(i=1)):t[0]&&(n=l[1],(i||e<t[0])&&(i=1)),t[2]&&(n+=", "+l[4],(i||e.replace(/.*\./,"").length>t[2])&&(i=1)),i?f(n,t):void 0},p=/(?:^|\s)(\w+)(?:\((.*?)\))?/g,o=/^[+-]?\d+$/,c=/\{(\d+)\}/g,f=function(e,i){return e?e.replace(c,function(e,t){return void 0!==i[t]?i[t]:e}):""};return validateField=function(e,i){var t,l={fieldType:"SELECT"==this.tagName?1:0,isValid:!0,msg:[],report:function(e){this.isValid=!1,this.msg.push(e)}},n=this.name,d=$(this),s=i.form;if(this.disabled)return l;if(d.is(r[2])&&(l.fieldType=2,n)){if(t=$(s[0][n]).not(":disabled"),d=t.filter("[data-dir]").eq(0),d.length||(d=t.eq(0)),"submit"==e.type&&d[0]!==this)return l;l.fieldGroup=t}var o=d.attr("valid-name")||this.name,c=d.val()||"",f=d.data("valid")||"",h=i.rules[o],v=i.labels[o]||"";if(l.required=d.attr("required"),i.eachField.call(d,e,l,i)===!1||!h&&!l.required&&!f)return l;var m;if(l.required)2==l.fieldType?0==t.filter(":checked").length&&(m=v.required||u.required.label[1]):""==c&&(m=v.required||u.required.label[0]);else if(2==l.fieldType){if(0==t.filter(":checked").length)return l}else if(""==c)return l;if(m&&(l.isValid=!1),!d.data("__tipid__")&&i.onKeyup&&d.is(r[0])&&(d.data("__tipid__",_.uniqueId("validTip_")),d.on("keyup."+a,function(e){9!==e.which&&validateField.call(this,e,i)})),f.replace(p,function(e,i,t){var a,n,r=u[i];r&&(a=r.rule,_.isRegExp(a)?a.test(c)||(n=r.label):_.isFunction(a)&&(n=a.call(d,c,t,l,r)),n&&l.report(v[i]||n))}),h){var b;_.isRegExp(h.rule)?h.rule.test(c)||(b=h.label):_.isFunction(h)?b=h.call(d,c,l,i):_.isFunction(h.rule)&&(b=h.rule.call(d,c,l,i,h)),b&&l.report(b)}l.isValid?(d.add(t).removeClass("invalid").addClass("valid"),i.eachValidField.call(d,e,l,i)):(d.add(t).removeClass("valid").addClass("invalid"),i.eachInvalidField.call(d,e,l,i));var y=l.msg.length?l.msg:m||"";return v&&(y=l.isValid?v.valid||y:(_.isString(v)?v:v.invalid)||y),i.showLabel(d,y,l.isValid),l},validate=function(e){e=_.create(n,e);var i=e.form;return i.attr("novalidate",!0).data(a,{options:e}).on("change."+a,"input,select,textarea",function(i){validateField.call(this,i,e)}).on("submit."+a,function(t){t.preventDefault();var l=!0,a=i.find(d);a.each(function(){var i=validateField.call(this,t,e);i.isValid||(l=!1)}),l?$.isFunction(e.valid)&&e.valid.call(i,t,e):(t.stopImmediatePropagation(),$.isFunction(e.invalid)&&e.invalid.call(i,t,e))}),e},validate});