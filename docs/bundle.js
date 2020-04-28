var app=function(){"use strict";function t(){}const e=t=>t;function n(t,e){for(const n in e)t[n]=e[n];return t}function o(t){return t()}function i(){return Object.create(null)}function r(t){t.forEach(o)}function s(t){return"function"==typeof t}function l(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function a(t,e){const n=t.subscribe(e);return n.unsubscribe?()=>n.unsubscribe():n}function c(t){let e;return a(t,t=>e=t)(),e}function u(t,e,n){t.$$.on_destroy.push(a(e,n))}function d(t,e,o){return t[1]?n({},n(e.$$scope.ctx,t[1](o?o(e):{}))):e.$$scope.ctx}const m="undefined"!=typeof window;let f=m?()=>window.performance.now():()=>Date.now(),p=m?t=>requestAnimationFrame(t):t;const h=new Set;let $,g=!1;function v(){h.forEach(t=>{t[0](f())||(h.delete(t),t[1]())}),(g=h.size>0)&&p(v)}function y(t){let e;return g||(g=!0,p(v)),{promise:new Promise(n=>{h.add(e=[t,n])}),abort(){h.delete(e)}}}function b(t,e){t.appendChild(e)}function w(t,e,n){t.insertBefore(e,n||null)}function _(t){t.parentNode.removeChild(t)}function k(t){return document.createElement(t)}function S(t){return document.createTextNode(t)}function C(){return S(" ")}function x(){return S("")}function M(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function E(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function N(t,e){e=""+e,t.data!==e&&(t.data=e)}function T(t,e){(null!=e||t.value)&&(t.value=e)}function I(t,e,n,o){t.style.setProperty(e,n,o?"important":"")}function j(t,e){const n=document.createEvent("CustomEvent");return n.initCustomEvent(t,!1,!1,e),n}let O,H=0,A={};function L(t,e,n,o,i,r,s,l=0){const a=16.666/o;let c="{\n";for(let t=0;t<=1;t+=a){const o=e+(n-e)*r(t);c+=100*t+`%{${s(o,1-o)}}\n`}const u=c+`100% {${s(n,1-n)}}\n}`,d=`__svelte_${function(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}(u)}_${l}`;if(!A[d]){if(!$){const t=k("style");document.head.appendChild(t),$=t.sheet}A[d]=!0,$.insertRule(`@keyframes ${d} ${u}`,$.cssRules.length)}const m=t.style.animation||"";return t.style.animation=`${m?`${m}, `:""}${d} ${o}ms linear ${i}ms 1 both`,H+=1,d}function z(t,e){t.style.animation=(t.style.animation||"").split(", ").filter(e?t=>t.indexOf(e)<0:t=>-1===t.indexOf("__svelte")).join(", "),e&&!--H&&p(()=>{if(H)return;let t=$.cssRules.length;for(;t--;)$.deleteRule(t);A={}})}function P(t,e){const n=t.getBoundingClientRect();if(e.left!==n.left||e.top!==n.top){const o=getComputedStyle(t),i="none"===o.transform?"":o.transform;t.style.transform=`${i} translate(${e.left-n.left}px, ${e.top-n.top}px)`}}function R(t){O=t}const q=[],B=[],W=[],D=[],J=Promise.resolve();let F,V=!1;function Y(t){W.push(t)}function G(){const t=new Set;do{for(;q.length;){const t=q.shift();R(t),K(t.$$)}for(;B.length;)B.pop()();for(let e=0;e<W.length;e+=1){const n=W[e];t.has(n)||(n(),t.add(n))}W.length=0}while(q.length);for(;D.length;)D.pop()();V=!1}function K(t){t.fragment&&(t.update(t.dirty),r(t.before_update),t.fragment.p(t.dirty,t.ctx),t.dirty=null,t.after_update.forEach(Y))}function Q(){return F||(F=Promise.resolve()).then(()=>{F=null}),F}function U(t,e,n){t.dispatchEvent(j(`${e?"intro":"outro"}${n}`))}const X=new Set;let Z;function tt(){Z={r:0,c:[],p:Z}}function et(){Z.r||r(Z.c),Z=Z.p}function nt(t,e){t&&t.i&&(X.delete(t),t.i(e))}function ot(t,e,n,o){if(t&&t.o){if(X.has(t))return;X.add(t),Z.c.push(()=>{X.delete(t),o&&(n&&t.d(1),o())}),t.o(e)}}const it={duration:0};function rt(n,o,i){let r,l,a=o(n,i),c=!1,u=0;function d(){r&&z(n,r)}function m(){const{delay:o=0,duration:i=300,easing:s=e,tick:m=t,css:p}=a||it;p&&(r=L(n,0,1,i,o,s,p,u++)),m(0,1);const h=f()+o,$=h+i;l&&l.abort(),c=!0,Y(()=>U(n,!0,"start")),l=y(t=>{if(c){if(t>=$)return m(1,0),U(n,!0,"end"),d(),c=!1;if(t>=h){const e=s((t-h)/i);m(e,1-e)}}return c})}let p=!1;return{start(){p||(z(n),s(a)?(a=a(),Q().then(m)):m())},invalidate(){p=!1},end(){c&&(d(),c=!1)}}}function st(n,o,i){let l,a=o(n,i),c=!0;const u=Z;function d(){const{delay:o=0,duration:i=300,easing:s=e,tick:d=t,css:m}=a||it;m&&(l=L(n,1,0,i,o,s,m));const p=f()+o,h=p+i;Y(()=>U(n,!1,"start")),y(t=>{if(c){if(t>=h)return d(0,1),U(n,!1,"end"),--u.r||r(u.c),!1;if(t>=p){const e=s((t-p)/i);d(1-e,e)}}return c})}return u.r+=1,s(a)?Q().then(()=>{a=a(),d()}):d(),{end(t){t&&a.tick&&a.tick(1,0),c&&(l&&z(n,l),c=!1)}}}function lt(n,o,i,l){let a=o(n,i),c=l?0:1,u=null,d=null,m=null;function p(){m&&z(n,m)}function h(t,e){const n=t.b-c;return e*=Math.abs(n),{a:c,b:t.b,d:n,duration:e,start:t.start,end:t.start+e,group:t.group}}function $(o){const{delay:i=0,duration:s=300,easing:l=e,tick:$=t,css:g}=a||it,v={start:f()+i,b:o};o||(v.group=Z,Z.r+=1),u?d=v:(g&&(p(),m=L(n,c,o,s,i,l,g)),o&&$(0,1),u=h(v,s),Y(()=>U(n,o,"start")),y(t=>{if(d&&t>d.start&&(u=h(d,s),d=null,U(n,u.b,"start"),g&&(p(),m=L(n,c,u.b,u.duration,0,l,a.css))),u)if(t>=u.end)$(c=u.b,1-c),U(n,u.b,"end"),d||(u.b?p():--u.group.r||r(u.group.c)),u=null;else if(t>=u.start){const e=t-u.start;c=u.a+u.d*l(e/u.duration),$(c,1-c)}return!(!u&&!d)}))}return{run(t){s(a)?Q().then(()=>{a=a(),$(t)}):$(t)},end(){p(),u=d=null}}}function at(t,e){ot(t,1,1,()=>{e.delete(t.key)})}function ct(t,e){t.f(),at(t,e)}function ut(t,e,n,o,i,r,s,l,a,c,u,d){let m=t.length,f=r.length,p=m;const h={};for(;p--;)h[t[p].key]=p;const $=[],g=new Map,v=new Map;for(p=f;p--;){const t=d(i,r,p),l=n(t);let a=s.get(l);a?o&&a.p(e,t):(a=c(l,t)).c(),g.set(l,$[p]=a),l in h&&v.set(l,Math.abs(p-h[l]))}const y=new Set,b=new Set;function w(t){nt(t,1),t.m(l,u),s.set(t.key,t),u=t.first,f--}for(;m&&f;){const e=$[f-1],n=t[m-1],o=e.key,i=n.key;e===n?(u=e.first,m--,f--):g.has(i)?!s.has(o)||y.has(o)?w(e):b.has(i)?m--:v.get(o)>v.get(i)?(b.add(o),w(e)):(y.add(i),m--):(a(n,s),m--)}for(;m--;){const e=t[m];g.has(e.key)||a(e,s)}for(;f;)w($[f-1]);return $}function dt(t,e,n){const{fragment:i,on_mount:l,on_destroy:a,after_update:c}=t.$$;i.m(e,n),Y(()=>{const e=l.map(o).filter(s);a?a.push(...e):r(e),t.$$.on_mount=[]}),c.forEach(Y)}function mt(t,e){t.$$.fragment&&(r(t.$$.on_destroy),t.$$.fragment.d(e),t.$$.on_destroy=t.$$.fragment=null,t.$$.ctx={})}function ft(t,e){t.$$.dirty||(q.push(t),V||(V=!0,J.then(G)),t.$$.dirty=i()),t.$$.dirty[e]=!0}function pt(e,n,o,s,l,a){const c=O;R(e);const u=n.props||{},d=e.$$={fragment:null,ctx:null,props:a,update:t,not_equal:l,bound:i(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(c?c.$$.context:[]),callbacks:i(),dirty:null};let m=!1;var f;d.ctx=o?o(e,u,(t,n,o=n)=>(d.ctx&&l(d.ctx[t],d.ctx[t]=o)&&(d.bound[t]&&d.bound[t](o),m&&ft(e,t)),n)):u,d.update(),m=!0,r(d.before_update),d.fragment=s(d.ctx),n.target&&(n.hydrate?d.fragment.l((f=n.target,Array.from(f.childNodes))):d.fragment.c(),n.intro&&nt(e.$$.fragment),dt(e,n.target,n.anchor),G()),R(c)}class ht{$destroy(){mt(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}}const $t=[];function gt(e,n=t){let o;const i=[];function r(t){if(l(e,t)&&(e=t,o)){const t=!$t.length;for(let t=0;t<i.length;t+=1){const n=i[t];n[1](),$t.push(n,e)}if(t){for(let t=0;t<$t.length;t+=2)$t[t][0]($t[t+1]);$t.length=0}}}return{set:r,update:function(t){r(t(e))},subscribe:function(s,l=t){const a=[s,l];return i.push(a),1===i.length&&(o=n(r)||t),s(e),()=>{const t=i.indexOf(a);-1!==t&&i.splice(t,1),0===i.length&&(o(),o=null)}}}}const vt=gt("main"),yt=gt([]),bt=gt({id:"",name:"",type:"",items:[""]}),wt=gt({id:"",name:"",type:"",items:[""]}),_t={subscribe:gt("0.427d",kt).subscribe};var kt;function St(){var t;yt.set(Mt("myStuff")),vt.set((t="lastPage",localStorage.getItem(t)?JSON.parse(localStorage.getItem(t)):"main")),wt.set(Mt("unSaved")),bt.set(Mt("tmpCont"))}function Ct(t){var e;if(e=t,console.log(e),localStorage.setItem("lastPage",JSON.stringify(e)),"main"===t)return vt.set("main"),void St();"newlist"!==t?"editlist"!==t?vt.set("newlist"):vt.set("editlist"):vt.set("newlist")}function xt(t,e){localStorage.setItem(e,JSON.stringify(t))}function Mt(t){return localStorage.getItem(t)?JSON.parse(localStorage.getItem(t)):"myStuff"===t?new Array:"unSaved"===t?{id:"",name:"",type:"",items:[""]}:"tmpCont"===t?{id:"",name:"",type:"",items:[""]}:void 0}function Et(e){var n,o,i,r,s;return{c(){n=k("button"),o=S("My_Stuff "),i=k("span"),r=S(e.$version),I(i,"font-size","1rem"),I(i,"color","gray"),E(n,"id","main_link"),E(n,"class","svelte-1mvd3j6"),s=M(n,"click",e.click_handler)},m(t,e){w(t,n,e),b(n,o),b(n,i),b(i,r)},p(t,e){t.$version&&N(r,e.$version)},i:t,o:t,d(t){t&&_(n),s()}}}function Nt(t,e,n){let o;u(t,_t,t=>{n("$version",o=t)});return{$version:o,click_handler:()=>Ct("main")}}class Tt extends ht{constructor(t){super(),pt(this,t,Nt,Et,l,[])}}function It(t){var e,o,i,r,s,l,a,c,u;const m=t.$$slots.default,f=function(t,e,n){if(t){const o=d(t,e,n);return t[0](o)}}(m,t,null);return{c(){e=k("div"),o=C(),i=k("div"),r=S(t.content),s=C(),f||((l=k("button")).textContent="Close"),f&&f.c(),E(e,"class","modal-bg svelte-1df7d0c"),f||(E(l,"name","modal-close"),a=M(l,"click",t.click_handler_1)),E(i,"class","modal svelte-1df7d0c"),u=M(e,"click",t.click_handler)},l(t){f&&f.l(div1_nodes)},m(t,n){w(t,e,n),w(t,o,n),w(t,i,n),b(i,r),b(i,s),f?f.m(i,null):b(i,l),c=!0},p(t,e){c&&!t.content||N(r,e.content),f&&f.p&&t.$$scope&&f.p(function(t,e,o,i){return t[1]?n({},n(e.$$scope.changed||{},t[1](i?i(o):{}))):e.$$scope.changed||{}}(m,e,t,null),d(m,e,null))},i(t){c||(nt(f,t),c=!0)},o(t){ot(f,t),c=!1},d(t){t&&(_(e),_(o),_(i)),f||a(),f&&f.d(t),u()}}}function jt(t,e,n){const o=function(){const t=O;return(e,n)=>{const o=t.$$.callbacks[e];if(o){const i=j(e,n);o.slice().forEach(e=>{e.call(t,i)})}}}();let{content:i}=e,{$$slots:r={},$$scope:s}=e;return t.$set=(t=>{"content"in t&&n("content",i=t.content),"$$scope"in t&&n("$$scope",s=t.$$scope)}),{dispatch:o,content:i,click_handler:()=>o("cancel"),click_handler_1:()=>o("close"),$$slots:r,$$scope:s}}class Ot extends ht{constructor(t){super(),pt(this,t,jt,It,l,["content"])}}function Ht(t){const e=t-1;return e*e*e+1}function At(t,{delay:e=0,duration:n=400}){const o=+getComputedStyle(t).opacity;return{delay:e,duration:n,css:t=>`opacity: ${t*o}`}}function Lt(t,{delay:e=0,duration:n=400,easing:o=Ht,x:i=0,y:r=0,opacity:s=0}){const l=getComputedStyle(t),a=+l.opacity,c="none"===l.transform?"":l.transform,u=a*(1-s);return{delay:e,duration:n,easing:o,css:(t,e)=>`\n\t\t\ttransform: ${c} translate(${(1-t)*i}px, ${(1-t)*r}px);\n\t\t\topacity: ${a-u*e}`}}function zt(t,e,n){const o=getComputedStyle(t),i="none"===o.transform?"":o.transform,r=e.from.left-e.to.left,l=e.from.top-e.to.top,a=Math.sqrt(r*r+l*l),{delay:c=0,duration:u=(t=>120*Math.sqrt(t)),easing:d=Ht}=n;return{delay:c,duration:s(u)?u(a):u,easing:d,css:(t,e)=>`transform: ${i} translate(${e*r}px, ${e*l}px);`}}function Pt(t,e,n){const o=Object.create(t);return o.item=e[n],o.each_value=e,o.i=n,o}function Rt(t){var e,n;return{c(){(e=k("button")).innerHTML='<div class="minus svelte-1dl0tfe"></div>',E(e,"name","rem-item"),E(e,"class","svelte-1dl0tfe"),n=M(e,"click",t.remItem.bind(this,t.i))},m(t,n){w(t,e,n)},p(e,n){t=n},d(t){t&&_(e),n()}}}function qt(n,o){var i,s,l,a,c,u,d,m,p,h=t;function $(){o.input_input_handler.call(s,o)}var g=0!=o.i&&Rt(o);function v(){return o.click_handler(o)}return{key:n,first:null,c(){i=k("div"),s=k("input"),l=C(),g&&g.c(),a=C(),(c=k("button")).innerHTML='<div class="cross svelte-1dl0tfe"></div>',E(s,"type","text"),E(s,"name","tmpitems"),E(s,"autocomplete","off"),E(s,"maxlength","48"),E(s,"placeholder",o.inputMsg),s.required=!0,E(s,"class","svelte-1dl0tfe"),E(c,"name","add-item"),E(c,"class","svelte-1dl0tfe"),E(i,"class","itemslist svelte-1dl0tfe"),p=[M(s,"input",$),M(c,"click",v)],this.first=i},m(t,e){w(t,i,e),b(i,s),T(s,o.item),b(i,l),g&&g.m(i,null),b(i,a),b(i,c),m=!0},p(t,e){o=e,t.items&&s.value!==o.item&&T(s,o.item),m&&!t.inputMsg||E(s,"placeholder",o.inputMsg),0!=o.i?g?g.p(t,o):((g=Rt(o)).c(),g.m(i,a)):g&&(g.d(1),g=null)},r(){d=i.getBoundingClientRect()},f(){!function(t){const e=getComputedStyle(t);if("absolute"!==e.position&&"fixed"!==e.position){const{width:n,height:o}=e,i=t.getBoundingClientRect();t.style.position="absolute",t.style.width=n,t.style.height=o,P(t,i)}}(i),h(),P(i,d)},a(){h(),h=function(n,o,i,r){if(!o)return t;const s=n.getBoundingClientRect();if(o.left===s.left&&o.right===s.right&&o.top===s.top&&o.bottom===s.bottom)return t;const{delay:l=0,duration:a=300,easing:c=e,start:u=f()+l,end:d=u+a,tick:m=t,css:p}=i(n,{from:o,to:s},r);let h,$=!0,g=!1;function v(){p&&z(n,h),$=!1}return y(t=>{if(!g&&t>=u&&(g=!0),g&&t>=d&&(m(1,0),v()),!$)return!1;if(g){const e=0+1*c((t-u)/a);m(e,1-e)}return!0}),p&&(h=L(n,0,1,a,l,c,p)),l||(g=!0),m(0,1),v}(i,d,zt,{key:o.i})},i(t){m||(Y(()=>{u||(u=lt(i,At,{key:o.i},!0)),u.run(1)}),m=!0)},o(t){u||(u=lt(i,At,{key:o.i},!1)),u.run(0),m=!1},d(t){t&&_(i),g&&g.d(),t&&u&&u.end(),r(p)}}}function Bt(t){var e,n;return{c(){(e=k("button")).textContent="Delete",E(e,"name","delete-container"),I(e,"color","red"),I(e,"background-color","#f5f5f6"),E(e,"class","svelte-1dl0tfe"),n=M(e,"click",t.click_handler_1)},m(t,n){w(t,e,n)},d(t){t&&_(e),n()}}}function Wt(t){var e,n=new Ot({props:{content:"Are you sure you wanna delete this container?",$$slots:{default:[Dt]},$$scope:{ctx:t}}});return n.$on("cancel",t.cancel_handler),n.$on("close",t.close_handler),{c(){n.$$.fragment.c()},m(t,o){dt(n,t,o),e=!0},i(t){e||(nt(n.$$.fragment,t),e=!0)},o(t){ot(n.$$.fragment,t),e=!1},d(t){mt(n,t)}}}function Dt(e){var n,o,i,s,l,a;return{c(){n=S("Delete Confirm Modal\n        "),o=k("div"),(i=k("button")).textContent="Yes",s=C(),(l=k("button")).textContent="No",I(i,"background-color","red"),E(i,"class","svelte-1dl0tfe"),E(l,"class","svelte-1dl0tfe"),E(o,"class","row-buttons svelte-1dl0tfe"),a=[M(i,"click",e.deleteSubmit,{once:!0}),M(l,"click",e.click_handler_2)]},m(t,e){w(t,n,e),w(t,o,e),b(o,i),b(o,s),b(o,l)},p:t,d(t){t&&(_(n),_(o)),r(a)}}}function Jt(t){var e,n,o,i,s,l,a,c,u,d,m,f,p,h,$,g,v=[],y=new Map;let S=t.items;const N=t=>t.i;for(let e=0;e<S.length;e+=1){let n=Pt(t,S,e),o=N(n);y.set(o,v[e]=qt(o,n))}var I=t.editt&&Bt(t),j=t.delModal&&Wt(t);return{c(){e=k("div"),n=k("label"),o=k("input"),i=C(),s=k("input"),l=C();for(let t=0;t<v.length;t+=1)v[t].c();a=C(),c=k("div"),I&&I.c(),u=C(),(d=k("button")).textContent="Save",p=C(),j&&j.c(),h=x(),E(o,"type","text"),E(o,"name","name"),E(o,"autocomplete","off"),E(o,"maxlength","25"),E(o,"placeholder","The Container Name"),o.required=!0,E(o,"class","svelte-1dl0tfe"),E(s,"type","text"),E(s,"name","type"),E(s,"autocomplete","off"),E(s,"maxlength","32"),E(s,"placeholder","The Container Type"),s.required=!0,E(s,"class","svelte-1dl0tfe"),E(d,"name","save-container"),E(d,"class","svelte-1dl0tfe"),E(c,"class","buttons svelte-1dl0tfe"),E(n,"class","svelte-1dl0tfe"),E(e,"classname","create-new"),E(e,"class","svelte-1dl0tfe"),g=[M(o,"input",t.input0_input_handler),M(s,"input",t.input1_input_handler),M(d,"click",t.handleSubmit,{once:!0})]},m(r,m){w(r,e,m),b(e,n),b(n,o),T(o,t.name),b(n,i),b(n,s),T(s,t.type),b(n,l);for(let t=0;t<v.length;t+=1)v[t].m(n,null);b(n,a),b(n,c),I&&I.m(c,null),b(c,u),b(c,d),w(r,p,m),j&&j.m(r,m),w(r,h,m),$=!0},p(t,e){t.name&&o.value!==e.name&&T(o,e.name),t.type&&s.value!==e.type&&T(s,e.type);const i=e.items;tt();for(let t=0;t<v.length;t+=1)v[t].r();v=ut(v,t,N,1,e,i,y,n,ct,qt,a,Pt);for(let t=0;t<v.length;t+=1)v[t].a();et(),e.editt?I||((I=Bt(e)).c(),I.m(c,u)):I&&(I.d(1),I=null),e.delModal?j?nt(j,1):((j=Wt(e)).c(),nt(j,1),j.m(h.parentNode,h)):j&&(tt(),ot(j,1,1,()=>{j=null}),et())},i(t){if(!$){for(let t=0;t<S.length;t+=1)nt(v[t]);Y(()=>{f&&f.end(1),m||(m=rt(e,At,{duration:1e3})),m.start()}),nt(j),$=!0}},o(t){for(let t=0;t<v.length;t+=1)ot(v[t]);m&&m.invalidate(),f=st(e,At,{duration:0}),ot(j),$=!1},d(t){t&&_(e);for(let t=0;t<v.length;t+=1)v[t].d();I&&I.d(),t&&(f&&f.end(),_(p)),j&&j.d(t),t&&_(h),r(g)}}}function Ft(t,e,n){let{id:o="",name:i="",type:r="",items:s=[""],editt:l=!1}=e,a=!1,u="Start adding items to your container!";function d(t){""!==s[s.length-1]&&(n("items",s[s.length-1]=t,s),n("items",s=[...s,""]))}return t.$set=(t=>{"id"in t&&n("id",o=t.id),"name"in t&&n("name",i=t.name),"type"in t&&n("type",r=t.type),"items"in t&&n("items",s=t.items),"editt"in t&&n("editt",l=t.editt)}),t.$$.update=((t={items:1,name:1,type:1,editt:1})=>{t.items&&s.length>1&&n("inputMsg",u="And another one"),(t.name||t.type||t.items||t.editt)&&(console.log(i+":"+r+":"+s),xt({name:i,type:r,items:s},l?"tmpCont":"unSaved")),t.items&&console.log(s.length+" items:"+s)}),{id:o,name:i,type:r,items:s,editt:l,delModal:a,inputMsg:u,handleSubmit:function(){i&&r&&s&&(n("items",s=s.filter(Boolean)),function(t,e,n,o=""){if(""==o)console.log("I am Creating new one"),yt.update(o=>[...o,{id:o.length+Math.random(),name:t,type:e,items:n}]),xt({id:"",name:"",type:"",items:[""]},"unSaved");else{let i=c(yt).findIndex(t=>t.id===o),r=c(yt);r.splice(i,1,{id:o,name:t,type:e,items:n}),yt.update(()=>r),xt({id:"",name:"",type:"",items:[""]},"tmpCont")}xt(c(yt),"myStuff")}(i,r,s,o),console.log("handleSubmitted"),Ct("main"),n("editt",l=!1))},deleteSubmit:function(){!function(t){let e=c(yt).findIndex(e=>e.id===t),n=c(yt);n.splice(e,1),yt.update(()=>n),xt({id:"",name:"",type:"",items:[""]},"tmpCont"),xt(c(yt),"myStuff")}(o),Ct("main")},newItem:d,remItem:function(t){console.log(t+" th item deleted"),n("items",s=s.filter((e,n)=>n!==t))},input0_input_handler:function(){i=this.value,n("name",i)},input1_input_handler:function(){r=this.value,n("type",r)},input_input_handler:function({item:t,each_value:e,i:o}){e[o]=this.value,n("items",s)},click_handler:({item:t})=>d(t),click_handler_1:()=>n("delModal",a=!0),click_handler_2:()=>n("delModal",a=!1),cancel_handler:()=>n("delModal",a=!1),close_handler:()=>n("delModal",a=!1)}}class Vt extends ht{constructor(t){super(),pt(this,t,Ft,Jt,l,["id","name","type","items","editt"])}}function Yt(e){return{c:t,m:t,d:t}}function Gt(t){var e,n;return{c(){(e=k("button")).innerHTML='<div id="cross" class="svelte-kbhj1o"></div>',E(e,"id","menu-edit-create"),E(e,"name","new-list"),E(e,"class","svelte-kbhj1o"),n=M(e,"click",t.click_handler)},m(t,n){w(t,e,n)},d(t){t&&_(e),n()}}}function Kt(e){var n;function o(t,e){return"newlist"===e.button?Gt:"editlist"===e.button?Yt:void 0}var i=o(0,e),r=i&&i(e);return{c(){r&&r.c(),n=x()},m(t,e){r&&r.m(t,e),w(t,n,e)},p(t,e){i!==(i=o(0,e))&&(r&&r.d(1),(r=i&&i(e))&&(r.c(),r.m(n.parentNode,n)))},i:t,o:t,d(t){r&&r.d(t),t&&_(n)}}}function Qt(t,e,n){let{button:o}=e;return t.$set=(t=>{"button"in t&&n("button",o=t.button)}),{button:o,click_handler:()=>Ct(o)}}class Ut extends ht{constructor(t){super(),pt(this,t,Qt,Kt,l,["button"])}}function Xt(t,e,n){const o=Object.create(t);return o.item=e[n],o.i=n,o}function Zt(t){var e,n,o,i,r,s,l,a,c,u,d,m;let f=t.items,p=[];for(let e=0;e<f.length;e+=1)p[e]=te(Xt(t,f,e));return{c(){e=k("div"),n=S("Type: "),o=S(t.type),i=S(" |\n            "),r=S(t.itemsnum),s=S(" Stuff here\n            "),l=k("ul");for(let t=0;t<p.length;t+=1)p[t].c();a=C(),(c=k("button")).textContent="Edit",E(l,"class","item-list svelte-11u0fu2"),E(c,"class","edit-button svelte-11u0fu2"),E(c,"name","edit-button"),E(e,"class","details svelte-11u0fu2"),m=M(c,"click",t.editHandle)},m(t,u){w(t,e,u),b(e,n),b(e,o),b(e,i),b(e,r),b(e,s),b(e,l);for(let t=0;t<p.length;t+=1)p[t].m(l,null);b(e,a),b(e,c),d=!0},p(t,e){if(d&&!t.type||N(o,e.type),t.items){let n;for(f=e.items,n=0;n<f.length;n+=1){const o=Xt(e,f,n);p[n]?p[n].p(t,o):(p[n]=te(o),p[n].c(),p[n].m(l,null))}for(;n<p.length;n+=1)p[n].d(1);p.length=f.length}},i(t){d||(Y(()=>{u||(u=lt(e,Lt,{y:-10,duration:200},!0)),u.run(1)}),d=!0)},o(t){u||(u=lt(e,Lt,{y:-10,duration:200},!1)),u.run(0),d=!1},d(t){t&&_(e),function(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}(p,t),t&&u&&u.end(),m()}}}function te(t){var e,n,o=t.item+"";return{c(){e=k("li"),n=S(o)},m(t,o){w(t,e,o),b(e,n)},p(t,e){t.items&&o!==(o=e.item+"")&&N(n,o)},d(t){t&&_(e)}}}function ee(t){var e,n,o,i,r,s,l,a,c,u,d=!t.isSum&&Zt(t);return{c(){e=k("div"),n=k("div"),o=S(t.name),i=C(),r=k("hr"),s=C(),d&&d.c(),E(n,"id","name"),E(n,"class","svelte-11u0fu2"),I(r,"width","90%"),I(r,"border-color","#e1e2e186"),E(e,"class","containersum svelte-11u0fu2"),u=M(e,"click",t.details)},m(t,l){w(t,e,l),b(e,n),b(n,o),b(e,i),b(e,r),b(e,s),d&&d.m(e,null),c=!0},p(t,n){c&&!t.name||N(o,n.name),n.isSum?d&&(tt(),ot(d,1,1,()=>{d=null}),et()):d?(d.p(t,n),nt(d,1)):((d=Zt(n)).c(),nt(d,1),d.m(e,null))},i(t){c||(nt(d),Y(()=>{a&&a.end(1),l||(l=rt(e,At,{duration:500})),l.start()}),c=!0)},o(t){ot(d),l&&l.invalidate(),a=st(e,At,{duration:0}),c=!1},d(t){t&&_(e),d&&d.d(),t&&a&&a.end(),u()}}}function ne(t,e,n){let{id:o="",name:i="TestName",type:r="TestType",items:s=["sugar"]}=e,l=s.length,{isSum:a=!0}=e;return t.$set=(t=>{"id"in t&&n("id",o=t.id),"name"in t&&n("name",i=t.name),"type"in t&&n("type",r=t.type),"items"in t&&n("items",s=t.items),"isSum"in t&&n("isSum",a=t.isSum)}),{id:o,name:i,type:r,items:s,itemsnum:l,isSum:a,editHandle:function(){!function(t,e,n,o){console.log("tmpContis: "+o),bt.set({name:t,type:e,items:n,id:o}),console.log(bt)}(i,r,s,o),Ct("editlist"),console.log("handleSubmitted by editCont")},details:function(){n("isSum",a=!a)}}}class oe extends ht{constructor(t){super(),pt(this,t,ne,ee,l,["id","name","type","items","isSum","editHandle"])}get editHandle(){return this.$$.ctx.editHandle}}function ie(t,e,n){const o=Object.create(t);return o.container=e[n],o.i=n,o}function re(t){var e;return{c(){(e=k("div")).innerHTML="<div>\n\t\t\t                Welcome to MyStuff! Start adding Containers to the app using the plus button so you\n\t\t\t                can keep track of stuff you have, even when you forgot the app remembers!\n\t\t\t            </div> <div>\n\t\t\t                This app saves all data to your local store so all your data is on your device.\n\t\t\t            </div> ",E(e,"class","welcome svelte-lppm3v")},m(t,n){w(t,e,n)},d(t){t&&_(e)}}}function se(t,e){var o,i,r=[e.container];let s={};for(var l=0;l<r.length;l+=1)s=n(s,r[l]);var a=new oe({props:s});return{key:t,first:null,c(){o=x(),a.$$.fragment.c(),this.first=o},m(t,e){w(t,o,e),dt(a,t,e),i=!0},p(t,e){var n,o=t.$myContainers?function(t,e){const n={},o={},i={$$scope:1};let r=t.length;for(;r--;){const s=t[r],l=e[r];if(l){for(const t in s)t in l||(o[t]=1);for(const t in l)i[t]||(n[t]=l[t],i[t]=1);t[r]=l}else for(const t in s)i[t]=1}for(const t in o)t in n||(n[t]=void 0);return n}(r,[(n=e.container,"object"==typeof n&&null!==n?n:{})]):{};a.$set(o)},i(t){i||(nt(a.$$.fragment,t),i=!0)},o(t){ot(a.$$.fragment,t),i=!1},d(t){t&&_(o),mt(a,t)}}}function le(t){var e,n,o=[],i=new Map;let r=t.$myContainers;const s=t=>t.container.id;for(let e=0;e<r.length;e+=1){let n=ie(t,r,e),l=s(n);i.set(l,o[e]=se(l,n))}let l=null;return r.length||(l=re()).c(),{c(){for(let t=0;t<o.length;t+=1)o[t].c();e=x()},m(t,i){for(let e=0;e<o.length;e+=1)o[e].m(t,i);w(t,e,i),l&&l.m(t,i),n=!0},p(t,n){const r=n.$myContainers;tt(),o=ut(o,t,s,1,n,r,i,e.parentNode,at,se,e,ie),et(),r.length?l&&(l.d(1),l=null):l||((l=re()).c(),l.m(e.parentNode,e))},i(t){if(!n){for(let t=0;t<r.length;t+=1)nt(o[t]);n=!0}},o(t){for(let t=0;t<o.length;t+=1)ot(o[t]);n=!1},d(t){for(let e=0;e<o.length;e+=1)o[e].d(t);t&&_(e),l&&l.d(t)}}}function ae(t,e,n){let o;return u(t,yt,t=>{n("$myContainers",o=t)}),{$myContainers:o}}class ce extends ht{constructor(t){super(),pt(this,t,ae,le,l,[])}}function ue(t){var e,n,o,i,r,s,l,a,c,u=new ce({props:{alt:"Welcome-Page"}}),d=new Ut({props:{button:"newlist"}});return{c(){e=S("width:"),n=S(t.w),o=S(" height:"),i=S(t.h),r=S(" ratio: "),s=S(t.ratio),l=C(),u.$$.fragment.c(),a=C(),d.$$.fragment.c()},m(t,m){w(t,e,m),w(t,n,m),w(t,o,m),w(t,i,m),w(t,r,m),w(t,s,m),w(t,l,m),dt(u,t,m),w(t,a,m),dt(d,t,m),c=!0},p(t,e){c&&!t.w||N(n,e.w),c&&!t.h||N(i,e.h),c&&!t.ratio||N(s,e.ratio)},i(t){c||(nt(u.$$.fragment,t),nt(d.$$.fragment,t),c=!0)},o(t){ot(u.$$.fragment,t),ot(d.$$.fragment,t),c=!1},d(t){t&&(_(e),_(n),_(o),_(i),_(r),_(s),_(l)),mt(u,t),t&&_(a),mt(d,t)}}}function de(t){var e,n=new Vt({props:{name:t.$tmpCont.name,type:t.$tmpCont.type,items:t.$tmpCont.items,id:t.$tmpCont.id,editt:!0}});return{c(){n.$$.fragment.c()},m(t,o){dt(n,t,o),e=!0},p(t,e){var o={};t.$tmpCont&&(o.name=e.$tmpCont.name),t.$tmpCont&&(o.type=e.$tmpCont.type),t.$tmpCont&&(o.items=e.$tmpCont.items),t.$tmpCont&&(o.id=e.$tmpCont.id),n.$set(o)},i(t){e||(nt(n.$$.fragment,t),e=!0)},o(t){ot(n.$$.fragment,t),e=!1},d(t){mt(n,t)}}}function me(t){var e,n=new Vt({props:{name:t.$unSaved.name,type:t.$unSaved.type,items:t.$unSaved.items,editt:!1}});return{c(){n.$$.fragment.c()},m(t,o){dt(n,t,o),e=!0},p(t,e){var o={};t.$unSaved&&(o.name=e.$unSaved.name),t.$unSaved&&(o.type=e.$unSaved.type),t.$unSaved&&(o.items=e.$unSaved.items),n.$set(o)},i(t){e||(nt(n.$$.fragment,t),e=!0)},o(t){ot(n.$$.fragment,t),e=!1},d(t){mt(n,t)}}}function fe(t){var e,n,o,i,r=[me,de,ue],s=[];function l(t,e){return"newlist"===e.$mypage?0:"editlist"===e.$mypage?1:2}return e=l(0,t),n=s[e]=r[e](t),{c(){n.c(),o=x()},m(t,n){s[e].m(t,n),w(t,o,n),i=!0},p(t,i){var a=e;(e=l(0,i))===a?s[e].p(t,i):(tt(),ot(s[a],1,1,()=>{s[a]=null}),et(),(n=s[e])||(n=s[e]=r[e](i)).c(),nt(n,1),n.m(o.parentNode,o))},i(t){i||(nt(n),i=!0)},o(t){ot(n),i=!1},d(t){s[e].d(t),t&&_(o)}}}function pe(t,e,n){let o,i,r;u(t,vt,t=>{n("$mypage",o=t)}),u(t,wt,t=>{n("$unSaved",i=t)}),u(t,bt,t=>{n("$tmpCont",r=t)});let s,{w:l,h:a}=e;return t.$set=(t=>{"w"in t&&n("w",l=t.w),"h"in t&&n("h",a=t.h)}),t.$$.update=((t={$mypage:1,w:1,h:1})=>{t.$mypage&&console.log("Current page is: "+o),(t.w||t.h)&&n("ratio",s=(l/a).toFixed(2))}),{w:l,h:a,ratio:s,$mypage:o,$unSaved:i,$tmpCont:r}}class he extends ht{constructor(t){super(),pt(this,t,pe,fe,l,["w","h"])}}function $e(t){var e,n,o,i,r=new Tt({props:{Header:!0}}),s=new he({props:{w:t.w,h:t.h}});return{c(){e=k("main"),r.$$.fragment.c(),n=C(),s.$$.fragment.c(),Y(()=>t.main_resize_handler.call(e)),E(e,"alt","Main Page"),E(e,"class","svelte-10d9n07")},m(l,a){w(l,e,a),dt(r,e,null),b(e,n),dt(s,e,null),o=function(t,e){"static"===getComputedStyle(t).position&&(t.style.position="relative");const n=document.createElement("object");let o;return n.setAttribute("style","display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1;"),n.type="text/html",n.tabIndex=-1,n.onload=(()=>{(o=n.contentDocument.defaultView).addEventListener("resize",e)}),/Trident/.test(navigator.userAgent)?(t.appendChild(n),n.data="about:blank"):(n.data="about:blank",t.appendChild(n)),{cancel:()=>{o&&o.removeEventListener&&o.removeEventListener("resize",e),t.removeChild(n)}}}(e,t.main_resize_handler.bind(e)),i=!0},p(t,e){var n={};t.w&&(n.w=e.w),t.h&&(n.h=e.h),s.$set(n)},i(t){i||(nt(r.$$.fragment,t),nt(s.$$.fragment,t),i=!0)},o(t){ot(r.$$.fragment,t),ot(s.$$.fragment,t),i=!1},d(t){t&&_(e),mt(r),mt(s),o.cancel()}}}function ge(t,e,n){let o,i;return St(),t.$$.update=((t={w:1,h:1})=>{(t.w||t.h)&&console.log("main w and h: ",o," ",i)}),{w:o,h:i,main_resize_handler:function(){o=this.clientWidth,i=this.clientHeight,n("w",o),n("h",i)}}}return"serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("serviceWorker.js").then(t=>console.log("service worker registered")).catch(t=>console.log("service worker not registered",t))}),new class extends ht{constructor(t){super(),pt(this,t,ge,$e,l,[])}}({target:document.body,props:{}})}();
//# sourceMappingURL=bundle.js.map
