(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{304:function(e,t,r){"use strict";r(86),r(58),r(154),r(22),r(309),r(305),r(310),r(311),r(312);var n=r(313),a=r.n(n);t.a={data:function(){return{zeroAddress:"0x0000000000000000000000000000000000000000"}},computed:{dapp:{get:function(){return this.$store.getters.dapp}}},methods:{getParam:function(e){var t={};return window.location.href.replace(location.hash,"").replace(/[?&]+([^=&]+)=?([^&]*)?/gi,(function(e,r,n){t[r]=void 0!==n?n:""})),e?t[e]?t[e]:null:t},ethGetCall:function(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];return r.push({from:this.dapp.fallbackAddress}),this.promisify.apply(this,[e].concat(r))},promisify:function(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];return new Promise((function(t,n){e.apply(void 0,r.concat([function(e,r){e?n(e):t(r)}]))}))},isMobile:function(){try{return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)}catch(e){return!1}},generateQRCode:function(e){return a.a.toDataURL(e,{color:{dark:"#b733a7",light:"#0000"}})},makeToast:function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;this.$bvToast.toast(t,{title:e,variant:r,solid:!0})},formatStructure:function(e){return 0===parseInt(e[0].valueOf())?null:{id:parseInt(e[0].valueOf()),address:e[1],fingerprint:this.formatFingerprint(e[2]),creationDate:1e3*e[3].valueOf(),stakedTokens:parseFloat(this.dapp.web3.fromWei(e[4])),usedTokens:parseFloat(this.dapp.web3.fromWei(e[5])),data:e[6],approved:e[7]}},formatFingerprint:function(e){var t=e.replace("0x","").match(new RegExp(".{1,6}","g"));return{borderColor:"#".concat(t[0]),backgroundColor:"#".concat(t[1]),mainColor:"#".concat(t[2])}}}}},306:function(e,t,r){"use strict";var n=r(1),a=r(307);n({target:"String",proto:!0,forced:r(308)("link")},{link:function(e){return a(this,"a","href",e)}})},307:function(e,t,r){var n=r(21),a=/"/g;e.exports=function(e,t,r,o){var i=String(n(e)),c="<"+t;return""!==r&&(c+=" "+r+'="'+String(o).replace(a,"&quot;")+'"'),c+">"+i+"</"+t+">"}},308:function(e,t,r){var n=r(4);e.exports=function(e){return n((function(){var t=""[e]('"');return t!==t.toLowerCase()||t.split('"').length>3}))}},323:function(e,t,r){"use strict";var n=r(1),a=r(41),o=r(324),i=r(325),c=r(4),s=1..toFixed,u=Math.floor,l=function(e,t,r){return 0===t?r:t%2==1?l(e,t-1,r*e):l(e*e,t/2,r)},f=function(e,t,r){for(var n=-1,a=r;++n<6;)a+=t*e[n],e[n]=a%1e7,a=u(a/1e7)},d=function(e,t){for(var r=6,n=0;--r>=0;)n+=e[r],e[r]=u(n/t),n=n%t*1e7},p=function(e){for(var t=6,r="";--t>=0;)if(""!==r||0===t||0!==e[t]){var n=String(e[t]);r=""===r?n:r+i.call("0",7-n.length)+n}return r};n({target:"Number",proto:!0,forced:s&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!c((function(){s.call({})}))},{toFixed:function(e){var t,r,n,c,s=o(this),u=a(e),m=[0,0,0,0,0,0],h="",g="0";if(u<0||u>20)throw RangeError("Incorrect fraction digits");if(s!=s)return"NaN";if(s<=-1e21||s>=1e21)return String(s);if(s<0&&(h="-",s=-s),s>1e-21)if(r=(t=function(e){for(var t=0,r=e;r>=4096;)t+=12,r/=4096;for(;r>=2;)t+=1,r/=2;return t}(s*l(2,69,1))-69)<0?s*l(2,-t,1):s/l(2,t,1),r*=4503599627370496,(t=52-t)>0){for(f(m,0,r),n=u;n>=7;)f(m,1e7,0),n-=7;for(f(m,l(10,n,1),0),n=t-1;n>=23;)d(m,1<<23),n-=23;d(m,1<<n),f(m,1,1),d(m,2),g=p(m)}else f(m,0,r),f(m,1<<-t,0),g=p(m)+i.call("0",u);return g=u>0?h+((c=g.length)<=u?"0."+i.call("0",u-c)+g:g.slice(0,c-u)+"."+g.slice(c-u)):h+g}})},324:function(e,t,r){var n=r(23);e.exports=function(e){if("number"!=typeof e&&"Number"!=n(e))throw TypeError("Incorrect invocation");return+e}},325:function(e,t,r){"use strict";var n=r(41),a=r(21);e.exports="".repeat||function(e){var t=String(a(this)),r="",o=n(e);if(o<0||o==1/0)throw RangeError("Wrong number of repetitions");for(;o>0;(o>>>=1)&&(t+=t))1&o&&(r+=t);return r}},365:function(e,t,r){"use strict";r.r(t);var n=r(17),a=(r(155),r(306),r(323),r(305),r(59),{name:"Member",mixins:[r(304).a],data:function(){return{ref:"",loading:!0,token:{name:"",symbol:"",decimals:18,link:"",logo:""},account:{isMember:!1,memberId:0,tokenBalance:0,member:null}}},computed:{dapp:{get:function(){return this.$store.getters.dapp}}},mounted:function(){this.ref=this.getParam("ref"),this.initDapp()},methods:{initDapp:function(){try{this.$store.dispatch("initShakaToken"),this.$store.dispatch("initDao"),this.ready()}catch(e){console.log(e),this.makeToast("Some errors occurred",e,"danger"),this.$router.push({path:"/"})}},ready:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getTokenData();case 2:return t.next=4,e.getMember();case 4:case"end":return t.stop()}}),t)})))()},getTokenData:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.ethGetCall(e.dapp.instances.token.name);case 3:return e.token.name=t.sent,t.next=6,e.ethGetCall(e.dapp.instances.token.symbol);case 6:e.token.symbol=t.sent,e.token.link=e.dapp.network.current.etherscanLink+"/token/"+e.dapp.instances.token.address,e.token.logo=e.$withBase("/assets/images/logo/shaka_logo_white.png"),t.next=16;break;case 11:t.prev=11,t.t0=t.catch(0),console.log(t.t0),e.makeToast("Some errors occurred",t.t0,"danger"),e.loading=!1;case 16:case"end":return t.stop()}}),t,null,[[0,11]])})))()},getMember:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.dapp.web3.isAddress(e.ref)){t.next=6;break}return t.next=3,e.ethGetCall(e.dapp.instances.dao.getMemberByAddress,e.ref);case 3:r=t.sent,t.next=9;break;case 6:return t.next=8,e.ethGetCall(e.dapp.instances.dao.getMemberById,e.ref);case 8:r=t.sent;case 9:if(e.account.member=e.formatStructure(r),!e.account.member){t.next=19;break}return t.t0=parseFloat,t.t1=e.dapp.web3,t.next=15,e.ethGetCall(e.dapp.instances.token.balanceOf,e.account.member.address);case 15:t.t2=t.sent,t.t3=t.t1.fromWei.call(t.t1,t.t2),e.account.tokenBalance=(0,t.t0)(t.t3).toFixed(2),e.account.memberId=e.account.member.id;case 19:e.loading=!1;case 20:case"end":return t.stop()}}),t)})))()}}}),o=r(40),i=Object(o.a)(a,(function(){var e=this.$createElement,t=this._self._c||e;return t("b-container",[t("b-row",{staticClass:"mt-4"},[t("b-col",{attrs:{lg:"10","offset-lg":"1"}},[this.loading?[t("b-card",{staticClass:"mb-3"},[t("ui--loader",{attrs:{loading:!0}})],1)]:this.account.member?[t("ui--member-details",{attrs:{account:this.account,token:this.token}})]:[t("b-card-body",[this._v("\n                    No member found.\n                ")])]],2)],1)],1)}),[],!1,null,null,null);t.default=i.exports}}]);