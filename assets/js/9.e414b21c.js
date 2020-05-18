(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{309:function(a,e,t){"use strict";var n=t(1),r=t(310);n({target:"String",proto:!0,forced:t(311)("link")},{link:function(a){return r(this,"a","href",a)}})},310:function(a,e,t){var n=t(25),r=/"/g;a.exports=function(a,e,t,s){var o=String(n(a)),i="<"+e;return""!==t&&(i+=" "+t+'="'+String(s).replace(r,"&quot;")+'"'),i+">"+o+"</"+e+">"}},311:function(a,e,t){var n=t(2);a.exports=function(a){return n((function(){var e=""[a]('"');return e!==e.toLowerCase()||e.split('"').length>3}))}},373:function(a,e,t){"use strict";t.r(e);t(92),t(309);var n={name:"MemberDetails",props:["account","token"],data:function(){return{makingTransaction:!1,stakeAmount:"",unstakeAmount:"",trx:{hash:"",link:""}}},computed:{dapp:{get:function(){return this.$store.getters.dapp}}},methods:{stake:function(){var a=this;this.$validator.validate("stakeAmount").then((function(e){if(e){if(!a.dapp.metamask.installed)return void a.makeToast("Some errors occurred","Please verify that you have MetaMask installed and unlocked.","danger");if(a.dapp.metamask.netId!==a.dapp.network.current.id)return void a.makeToast("You are on the wrong Network","Please switch MetaMask on ".concat(a.dapp.network.current.name,"."),"danger");try{a.makingTransaction=!0,a.dapp.instances.token.transferAndCall(a.dapp.instances.dao.address,a.dapp.web3.toWei(a.stakeAmount),{from:a.dapp.metamask.address,to:a.token.address},(function(e,t){e?(console.log(e),a.makeToast("Some errors occurred","Maybe you rejected the transaction or you have MetaMask locked!","danger")):(a.trx.hash=t,a.trx.link=a.dapp.network.current.etherscanLink+"/tx/"+a.trx.hash),a.makingTransaction=!1}))}catch(e){console.log(e),a.makeToast("Cannot connect","Please verify that you have MetaMask installed and unlocked.","danger")}}})).catch((function(e){console.log(e),a.makeToast("Some errors occurred",e,"danger"),a.makingTransaction=!1}))},unstake:function(){var a=this;this.$validator.validate("unstakeAmount").then((function(e){if(e){if(!a.dapp.metamask.installed)return void a.makeToast("Cannot connect","Please verify that you have MetaMask installed and unlocked.","danger");if(a.dapp.metamask.netId!==a.dapp.network.current.id)return void a.makeToast("You are on the wrong Network","Please switch MetaMask on ".concat(a.dapp.network.current.name,"."),"danger");try{a.makingTransaction=!0,a.dapp.instances.dao.unstake(a.dapp.web3.toWei(a.unstakeAmount),{from:a.dapp.metamask.address,to:a.dapp.instances.dao.address},(function(e,t){e?(console.log(e),a.makeToast("Some errors occurred","Maybe you rejected the transaction or you have MetaMask locked!","danger")):(a.trx.hash=t,a.trx.link=a.dapp.network.current.etherscanLink+"/tx/"+a.trx.hash),a.makingTransaction=!1}))}catch(e){console.log(e),a.makeToast("Cannot connect","Please verify that you have MetaMask installed and unlocked.","danger")}}})).catch((function(e){console.log(e),a.makeToast("Some errors occurred",e,"danger"),a.makingTransaction=!1}))}}},r=t(42),s=Object(r.a)(n,(function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("b-row",[a.trx.hash?t("b-col",{staticClass:"mb-2",attrs:{md:"12"}},[t("b-alert",{staticClass:"mt-3",attrs:{show:"",variant:"success"}},[a._v("\n            Last transaction:\n            "),t("b-link",{attrs:{href:a.trx.link,target:"_blank"}},[a._v(a._s(a.trx.hash))])],1)],1):a._e(),a._v(" "),t("b-col",{staticClass:"mb-4",attrs:{md:"8"}},[t("b-card",{staticClass:"text-center",attrs:{"no-body":""}},[t("b-card-body",[t("ui--member-image",{attrs:{member:a.account.member}})],1)],1)],1),a._v(" "),t("b-col",{staticClass:"mb-4",attrs:{md:"4"}},[t("b-card",{attrs:{"no-body":""}},[t("b-card-header",[a._v("\n                Member #"+a._s(a.account.member.id)+"\n\n                "),t("div",{staticClass:"float-right"},[a.account.member.approved?t("b-badge",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],staticClass:"p-1",attrs:{title:"Verified",variant:"success",pill:""}},[t("font-awesome-icon",{attrs:{icon:"check-circle"}})],1):a._e()],1)]),a._v(" "),t("b-list-group",{attrs:{flush:""}},[t("b-list-group-item",[a._v("\n                    Address:\n                    "),t("b-link",{attrs:{href:a.dapp.network.current.etherscanLink+"/address/"+a.account.member.address,target:"_blank"}},[a._v("\n                        "+a._s(a._f("truncate")(a.account.member.address,10))+"\n                    ")])],1),a._v(" "),t("b-list-group-item",[a._v("\n                    Balance: "),t("b",[a._v(a._s(a.account.tokenBalance)+" "+a._s(a.token.symbol))])]),a._v(" "),t("b-list-group-item",[a._v("\n                    Staked: "),t("b",[a._v(a._s(a.account.member.stakedTokens)+" "+a._s(a.token.symbol))])]),a._v(" "),t("b-list-group-item",[a._v("\n                    Used: "),t("b",[a._v(a._s(a.account.member.usedTokens)+" "+a._s(a.token.symbol))])])],1),a._v(" "),t("b-card-footer",[t("small",[a._v("Since: "+a._s(a._f("formatLocaleDate")(a.account.member.creationDate)))])])],1),a._v(" "),a.account.member.address===a.dapp.metamask.address?t("b-card",{staticClass:"mt-4",attrs:{header:"Stake "+a.token.symbol}},[t("b-form",{on:{submit:function(e){return e.preventDefault(),a.stake(e)}}},[t("b-input-group",[t("b-form-input",{directives:[{name:"validate",rawName:"v-validate",value:{required:!0,numeric:!0,min_value:1,max_value:a.account.tokenBalance},expression:"{ required: true, numeric: true, min_value: 1, max_value: account.tokenBalance }"}],class:{"is-invalid":a.errors.has("stakeAmount")},attrs:{id:"stakeAmount",name:"stakeAmount",disabled:a.makingTransaction,"data-vv-as":"stake amount"},model:{value:a.stakeAmount,callback:function(e){a.stakeAmount="string"==typeof e?e.trim():e},expression:"stakeAmount"}}),a._v(" "),t("b-input-group-append",[t("b-button",{attrs:{disabled:a.makingTransaction,type:"submit",variant:"primary"}},[a._v("Stake")])],1)],1),a._v(" "),t("small",{directives:[{name:"show",rawName:"v-show",value:a.errors.has("stakeAmount"),expression:"errors.has('stakeAmount')"}],staticClass:"text-danger"},[a._v("\n                    "+a._s(a.errors.first("stakeAmount"))+"\n                ")])],1)],1):a._e(),a._v(" "),a.account.member.address===a.dapp.metamask.address?t("b-card",{staticClass:"mt-4",attrs:{header:"Unstake "+a.token.symbol}},[t("b-form",{on:{submit:function(e){return e.preventDefault(),a.unstake(e)}}},[t("b-input-group",[t("b-form-input",{directives:[{name:"validate",rawName:"v-validate",value:{required:!0,numeric:!0,min_value:1,max_value:a.account.member.stakedTokens},expression:"{ required: true, numeric: true, min_value: 1, max_value: account.member.stakedTokens }"}],class:{"is-invalid":a.errors.has("unstakeAmount")},attrs:{id:"unstakeAmount",name:"unstakeAmount",disabled:a.makingTransaction,"data-vv-as":"unstake amount"},model:{value:a.unstakeAmount,callback:function(e){a.unstakeAmount="string"==typeof e?e.trim():e},expression:"unstakeAmount"}}),a._v(" "),t("b-input-group-append",[t("b-button",{attrs:{disabled:a.makingTransaction,type:"submit",variant:"primary"}},[a._v("Unstake")])],1)],1),a._v(" "),t("small",{directives:[{name:"show",rawName:"v-show",value:a.errors.has("unstakeAmount"),expression:"errors.has('unstakeAmount')"}],staticClass:"text-danger"},[a._v("\n                    "+a._s(a.errors.first("unstakeAmount"))+"\n                ")])],1)],1):a._e()],1)],1)}),[],!1,null,null,null);e.default=s.exports}}]);