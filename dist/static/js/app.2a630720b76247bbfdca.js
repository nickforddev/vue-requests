webpackJsonp([1],{"0xDb":function(e,t,r){"use strict";t.c=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t={before:e.before,timeout:e.timeout},r={root:e.root},n={headers:e.headers},o={timeout_duration:e.timeout_duration};for(var i in t){var a=f()(t[i]);if(h(t[i])&&"function"!==a)throw new TypeError('Expected parameter "'+i+'" to be a function, received '+a)}for(var u in r){var s=f()(r[u]);if(h(r[u])&&"string"!==s)throw new TypeError('Expected parameter "'+u+'" to be a string, received '+s)}for(var c in n){var p=f()(n[c]);if(h(n[c])&&"object"!==p)throw new TypeError('Expected parameter "'+c+'" to be an object, received '+p)}for(var v in o){var d=f()(o[v]);if(h(o[v])&&"number"!==d)throw new TypeError('Expected parameter "'+v+'" to be an number, received '+d)}},r.d(t,"b",function(){return l}),t.a=function(e,t){var r=o()({},e,t);for(var n in r)"function"==typeof r[n]&&(r[n]=r[n]());return r=function(e,t){var r={};for(var n in t)e(t[n])&&(r[n]=t[n]);return r}(h,r),new Headers(r)};var n=r("woOf"),o=r.n(n),i=r("Xxa5"),a=r.n(i),u=r("exGp"),s=r.n(u),c=r("pFYg"),f=r.n(c),p=r("//Fk"),v=r.n(p);function h(e){return void 0!==e}var d,l=(d=s()(a.a.mark(function e(t){var r,n,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.text();case 2:if(r=e.sent,e.prev=3,n=JSON.parse(r),t.ok){e.next=9;break}return e.abrupt("return",v.a.reject(n));case 9:return e.abrupt("return",o.responseHeaders?{body:n,headers:t.headers.entries()}:n);case 10:e.next=15;break;case 12:return e.prev=12,e.t0=e.catch(3),e.abrupt("return",v.a.reject(r));case 15:case"end":return e.stop()}},e,this,[[3,12]])})),function(e){return d.apply(this,arguments)})},"2lNz":function(e,t,r){"use strict";var n=r("c/Tr"),o=r.n(n),i=r("mvHQ"),a=r.n(i),u=r("rKHE").port;t.a={name:"app",data:function(){return{port:u,response:null,error:null,headers:null}},computed:{display:function(){return this.error?this.error:this.response?this.headers?"From server:\n\n"+a()(this.headers,null,"  "):"From server:\n\n"+a()(this.response,null,"  "):"Click a button to send request"}},methods:{test:function(e){var t=this;this.$request("/",{method:e}).then(function(e){t.response=e,t.error=null,t.headers=null}).catch(function(){t.error="Cannot communicate with server"})},getWithHeaders:function(){var e=this;this.$request("/",{responseHeaders:!0}).then(function(t){e.response=t.body,e.headers=o()(t.headers),console.log(t.headers)})}}}},"7I1f":function(e,t,r){"use strict";t.a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=s()({},v,t),u=s()({},p.a,n),c=i.body?a()(i.body):void 0,h=i.method,d=r.i(f.a)(u.headers,i.headers);/^https?:\/\//i.test(e)||(e=u.root+e);var l=o.a.race([fetch(e,s()({},i,{method:h},{body:c},{headers:d})).then(function(e){return r.i(f.b)(e,i)}),new o.a(function(e,t){setTimeout(function(){t("request_timeout")},u.timeout_duration)})]);return l.catch(function(e){"request_timeout"===e&&"function"==typeof u.timeout&&u.timeout.apply(u.vm)}),l};var n=r("//Fk"),o=r.n(n),i=r("mvHQ"),a=r.n(i),u=r("woOf"),s=r.n(u),c=r("rplX"),f=(r.n(c),r("0xDb")),p=r("Zthf"),v={method:"GET",body:void 0,headers:{}}},"90m7":function(e,t,r){"use strict";var n,o=r("Xxa5"),i=r.n(o),a=r("woOf"),u=r.n(a),s=r("exGp"),c=r.n(s),f=r("7I1f"),p=r("0xDb"),v=r("Zthf"),h=this,d=(n=c()(i.a.mark(function e(t,n){var o;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:r.i(p.c)(n),o=u()({vm:t},v.a,n),t.$request=function(){var e=c()(i.a.mark(function e(n,a){var u=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if("function"!=typeof o.before||!u){e.next=3;break}return e.next=3,o.before.apply(t);case 3:return e.abrupt("return",r.i(f.a)(n,a,o));case 4:case"end":return e.stop()}},e,h)}));return function(t,r){return e.apply(this,arguments)}}();case 3:case"end":return e.stop()}},e,h)})),function(e,t){return n.apply(this,arguments)});t.a=function(e,t){return{beforeCreate:function(){d(this,t)}}}},"CxC/":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("7+uW"),o=r("eNIl"),i=r("lVK7"),a=r("rKHE").port;n.a.config.productionTip=!1;n.a.use(i.a,{root:"http://localhost:"+a,headers:{Access:function(){return"test"},Refresh:"test_refresh_token"},before:function(){console.log("fire this before")},timeout:function(){console.log("fire this on timeout")}}),new n.a({el:"#app",template:"<App/>",components:{App:o.a}})},Vc3V:function(e,t,r){"use strict";var n={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("h2",[e._v("vue-requests")]),e._v(" "),r("p",[e._v("The following is a basic demo of the vue-requests plugin. There is a demo express server running on port "),r("strong",[e._v(e._s(e.port))]),e._v(", set up to respond to basic requests.")]),e._v(" "),r("button",{on:{click:function(t){e.test("get")}}},[e._v("Get")]),e._v(" "),r("button",{on:{click:function(t){e.test("put")}}},[e._v("Put")]),e._v(" "),r("button",{on:{click:function(t){e.test("post")}}},[e._v("Post")]),e._v(" "),r("button",{on:{click:function(t){e.test("delete")}}},[e._v("Delete")]),e._v(" "),r("button",{on:{click:e.getWithHeaders}},[e._v("Get with response headers")]),e._v(" "),r("pre",[e._v(e._s(e.display))])])},staticRenderFns:[]};t.a=n},Zthf:function(e,t,r){"use strict";t.a={timeout_duration:2e4,timeout:!1,headers:{},root:""}},boQp:function(e,t){},eNIl:function(e,t,r){"use strict";var n=r("2lNz"),o=r("Vc3V");var i=function(e){r("boQp")},a=r("VU/8")(n.a,o.a,i,null,null);t.a=a.exports},lVK7:function(e,t,r){"use strict";var n=r("Zrlr"),o=r.n(n),i=r("wxAW"),a=r.n(i),u=r("90m7"),s=r("7I1f"),c=function(){function e(){o()(this,e)}return a()(e,null,[{key:"install",value:function(e,t){e.mixin(r.i(u.a)(e,t))}},{key:"Request",value:function(){return s.a.apply(void 0,arguments)}}]),e}();t.a=c},rKHE:function(e,t){e.exports={port:"7692"}}},["CxC/"]);