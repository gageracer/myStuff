var app=function(){"use strict";function t(){}const e=t=>t;function n(t,e){for(const n in e)t[n]=e[n];return t}function o(t){return t()}function i(){return Object.create(null)}function r(t){t.forEach(o)}function s(t){return"function"==typeof t}function l(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function c(e,...n){if(null==e)return t;const o=e.subscribe(...n);return o.unsubscribe?()=>o.unsubscribe():o}function u(t){let e;return c(t,t=>e=t)(),e}function a(t,e,n){t.$$.on_destroy.push(c(e,n))}function d(t,e,o,i){return t[1]&&i?n(o.ctx.slice(),t[1](i(e))):o.ctx}const f="undefined"!=typeof window;let m=f?()=>window.performance.now():()=>Date.now(),p=f?t=>requestAnimationFrame(t):t;const g=new Set;function h(t){g.forEach(e=>{e.c(t)||(g.delete(e),e.f())}),0!==g.size&&p(h)}function $(t){let e;return 0===g.size&&p(h),{promise:new Promise(n=>{g.add(e={c:t,f:n})}),abort(){g.delete(e)}}}function y(t,e){t.appendChild(e)}function v(t,e,n){t.insertBefore(e,n||null)}function b(t){t.parentNode.removeChild(t)}function w(t){return document.createElement(t)}function x(t){return document.createTextNode(t)}function k(){return x(" ")}function S(){return x("")}function _(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function C(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function M(t,e){e=""+e,t.data!==e&&(t.data=e)}function E(t,e){(null!=e||t.value)&&(t.value=e)}function N(t,e,n,o){t.style.setProperty(e,n,o?"important":"")}let T;function I(t,e){const n=getComputedStyle(t),o=(parseInt(n.zIndex)||0)-1;"static"===n.position&&(t.style.position="relative");const i=w("iframe");let r;return i.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; "+`overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: ${o};`),i.setAttribute("aria-hidden","true"),i.tabIndex=-1,!function(){if(void 0===T){T=!1;try{"undefined"!=typeof window&&window.parent&&window.parent.document}catch(t){T=!0}}return T}()?(i.src="about:blank",i.onload=(()=>{r=_(i.contentWindow,"resize",e)})):(i.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",r=_(window,"message",t=>{t.source===i.contentWindow&&e()})),y(t,i),()=>{b(i),r&&r()}}function A(t,e){const n=document.createEvent("CustomEvent");return n.initCustomEvent(t,!1,!1,e),n}const j=new Set;let H,O=0;function W(t,e,n,o,i,r,s,l=0){const c=16.666/o;let u="{\n";for(let t=0;t<=1;t+=c){const o=e+(n-e)*r(t);u+=100*t+`%{${s(o,1-o)}}\n`}const a=u+`100% {${s(n,1-n)}}\n}`,d=`__svelte_${function(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}(a)}_${l}`,f=t.ownerDocument;j.add(f);const m=f.__svelte_stylesheet||(f.__svelte_stylesheet=f.head.appendChild(w("style")).sheet),p=f.__svelte_rules||(f.__svelte_rules={});p[d]||(p[d]=!0,m.insertRule(`@keyframes ${d} ${a}`,m.cssRules.length));const g=t.style.animation||"";return t.style.animation=`${g?`${g}, `:""}${d} ${o}ms linear ${i}ms 1 both`,O+=1,d}function z(t,e){const n=(t.style.animation||"").split(", "),o=n.filter(e?t=>t.indexOf(e)<0:t=>-1===t.indexOf("__svelte")),i=n.length-o.length;i&&(t.style.animation=o.join(", "),(O-=i)||p(()=>{O||(j.forEach(t=>{const e=t.__svelte_stylesheet;let n=e.cssRules.length;for(;n--;)e.deleteRule(n);t.__svelte_rules={}}),j.clear())}))}function P(t,e){const n=t.getBoundingClientRect();if(e.left!==n.left||e.top!==n.top){const o=getComputedStyle(t),i="none"===o.transform?"":o.transform;t.style.transform=`${i} translate(${e.left-n.left}px, ${e.top-n.top}px)`}}function R(t){H=t}function q(){const t=function(){if(!H)throw new Error("Function called outside component initialization");return H}();return(e,n)=>{const o=t.$$.callbacks[e];if(o){const i=A(e,n);o.slice().forEach(e=>{e.call(t,i)})}}}const L=[],B=[],D=[],J=[],F=Promise.resolve();let Y=!1;function G(t){D.push(t)}let K=!1;const Q=new Set;function U(){if(!K){K=!0;do{for(let t=0;t<L.length;t+=1){const e=L[t];R(e),V(e.$$)}for(L.length=0;B.length;)B.pop()();for(let t=0;t<D.length;t+=1){const e=D[t];Q.has(e)||(Q.add(e),e())}D.length=0}while(L.length);for(;J.length;)J.pop()();Y=!1,K=!1,Q.clear()}}function V(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(G)}}let X;function Z(){return X||(X=Promise.resolve()).then(()=>{X=null}),X}function tt(t,e,n){t.dispatchEvent(A(`${e?"intro":"outro"}${n}`))}const et=new Set;let nt;function ot(){nt={r:0,c:[],p:nt}}function it(){nt.r||r(nt.c),nt=nt.p}function rt(t,e){t&&t.i&&(et.delete(t),t.i(e))}function st(t,e,n,o){if(t&&t.o){if(et.has(t))return;et.add(t),nt.c.push(()=>{et.delete(t),o&&(n&&t.d(1),o())}),t.o(e)}}const lt={duration:0};function ct(n,o,i){let r,l,c=o(n,i),u=!1,a=0;function d(){r&&z(n,r)}function f(){const{delay:o=0,duration:i=300,easing:s=e,tick:f=t,css:p}=c||lt;p&&(r=W(n,0,1,i,o,s,p,a++)),f(0,1);const g=m()+o,h=g+i;l&&l.abort(),u=!0,G(()=>tt(n,!0,"start")),l=$(t=>{if(u){if(t>=h)return f(1,0),tt(n,!0,"end"),d(),u=!1;if(t>=g){const e=s((t-g)/i);f(e,1-e)}}return u})}let p=!1;return{start(){p||(z(n),s(c)?(c=c(),Z().then(f)):f())},invalidate(){p=!1},end(){u&&(d(),u=!1)}}}function ut(n,o,i){let l,c=o(n,i),u=!0;const a=nt;function d(){const{delay:o=0,duration:i=300,easing:s=e,tick:d=t,css:f}=c||lt;f&&(l=W(n,1,0,i,o,s,f));const p=m()+o,g=p+i;G(()=>tt(n,!1,"start")),$(t=>{if(u){if(t>=g)return d(0,1),tt(n,!1,"end"),--a.r||r(a.c),!1;if(t>=p){const e=s((t-p)/i);d(1-e,e)}}return u})}return a.r+=1,s(c)?Z().then(()=>{c=c(),d()}):d(),{end(t){t&&c.tick&&c.tick(1,0),u&&(l&&z(n,l),u=!1)}}}function at(n,o,i,l){let c=o(n,i),u=l?0:1,a=null,d=null,f=null;function p(){f&&z(n,f)}function g(t,e){const n=t.b-u;return e*=Math.abs(n),{a:u,b:t.b,d:n,duration:e,start:t.start,end:t.start+e,group:t.group}}function h(o){const{delay:i=0,duration:s=300,easing:l=e,tick:h=t,css:y}=c||lt,v={start:m()+i,b:o};o||(v.group=nt,nt.r+=1),a?d=v:(y&&(p(),f=W(n,u,o,s,i,l,y)),o&&h(0,1),a=g(v,s),G(()=>tt(n,o,"start")),$(t=>{if(d&&t>d.start&&(a=g(d,s),d=null,tt(n,a.b,"start"),y&&(p(),f=W(n,u,a.b,a.duration,0,l,c.css))),a)if(t>=a.end)h(u=a.b,1-u),tt(n,a.b,"end"),d||(a.b?p():--a.group.r||r(a.group.c)),a=null;else if(t>=a.start){const e=t-a.start;u=a.a+a.d*l(e/a.duration),h(u,1-u)}return!(!a&&!d)}))}return{run(t){s(c)?Z().then(()=>{c=c(),h(t)}):h(t)},end(){p(),a=d=null}}}function dt(t,e){st(t,1,1,()=>{e.delete(t.key)})}function ft(t,e){t.f(),dt(t,e)}function mt(t,e,n,o,i,r,s,l,c,u,a,d){let f=t.length,m=r.length,p=f;const g={};for(;p--;)g[t[p].key]=p;const h=[],$=new Map,y=new Map;for(p=m;p--;){const t=d(i,r,p),l=n(t);let c=s.get(l);c?o&&c.p(t,e):(c=u(l,t)).c(),$.set(l,h[p]=c),l in g&&y.set(l,Math.abs(p-g[l]))}const v=new Set,b=new Set;function w(t){rt(t,1),t.m(l,a,s.has(t.key)),s.set(t.key,t),a=t.first,m--}for(;f&&m;){const e=h[m-1],n=t[f-1],o=e.key,i=n.key;e===n?(a=e.first,f--,m--):$.has(i)?!s.has(o)||v.has(o)?w(e):b.has(i)?f--:y.get(o)>y.get(i)?(b.add(o),w(e)):(v.add(i),f--):(c(n,s),f--)}for(;f--;){const e=t[f];$.has(e.key)||c(e,s)}for(;m;)w(h[m-1]);return h}function pt(t){t&&t.c()}function gt(t,e,n){const{fragment:i,on_mount:l,on_destroy:c,after_update:u}=t.$$;i&&i.m(e,n),G(()=>{const e=l.map(o).filter(s);c?c.push(...e):r(e),t.$$.on_mount=[]}),u.forEach(G)}function ht(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function $t(t,e){-1===t.$$.dirty[0]&&(L.push(t),Y||(Y=!0,F.then(U)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function yt(e,n,o,s,l,c,u=[-1]){const a=H;R(e);const d=n.props||{},f=e.$$={fragment:null,ctx:null,props:c,update:t,not_equal:l,bound:i(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(a?a.$$.context:[]),callbacks:i(),dirty:u};let m=!1;if(f.ctx=o?o(e,d,(t,n,...o)=>{const i=o.length?o[0]:n;return f.ctx&&l(f.ctx[t],f.ctx[t]=i)&&(f.bound[t]&&f.bound[t](i),m&&$t(e,t)),n}):[],f.update(),m=!0,r(f.before_update),f.fragment=!!s&&s(f.ctx),n.target){if(n.hydrate){const t=(p=n.target,Array.from(p.childNodes));f.fragment&&f.fragment.l(t),t.forEach(b)}else f.fragment&&f.fragment.c();n.intro&&rt(e.$$.fragment),gt(e,n.target,n.anchor),U()}var p;R(a)}class vt{$destroy(){ht(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}}const bt=[];function wt(e,n=t){let o;const i=[];function r(t){if(l(e,t)&&(e=t,o)){const t=!bt.length;for(let t=0;t<i.length;t+=1){const n=i[t];n[1](),bt.push(n,e)}if(t){for(let t=0;t<bt.length;t+=2)bt[t][0](bt[t+1]);bt.length=0}}}return{set:r,update:function(t){r(t(e))},subscribe:function(s,l=t){const c=[s,l];return i.push(c),1===i.length&&(o=n(r)||t),s(e),()=>{const t=i.indexOf(c);-1!==t&&i.splice(t,1),0===i.length&&(o(),o=null)}}}}const xt=wt("main"),kt=wt([]),St=wt({id:"",name:"",type:"",items:[""]}),_t=wt({id:"",name:"",type:"",items:[""]}),Ct={subscribe:wt("0.428a",Mt).subscribe};var Mt;function Et(){var t;kt.set(It("myStuff")),xt.set((t="lastPage",localStorage.getItem(t)?JSON.parse(localStorage.getItem(t)):"main")),_t.set(It("unSaved")),St.set(It("tmpCont"))}function Nt(t){var e;if(e=t,console.log(e),localStorage.setItem("lastPage",JSON.stringify(e)),"main"===t)return xt.set("main"),void Et();"newlist"!==t?"editlist"!==t?xt.set("newlist"):xt.set("editlist"):xt.set("newlist")}function Tt(t,e){localStorage.setItem(e,JSON.stringify(t))}function It(t){return localStorage.getItem(t)?JSON.parse(localStorage.getItem(t)):"myStuff"===t?new Array:"unSaved"===t?{id:"",name:"",type:"",items:[""]}:"tmpCont"===t?{id:"",name:"",type:"",items:[""]}:void 0}function At(e){let n,o,i,r,s;return{c(){n=w("button"),o=x("My_Stuff "),i=w("span"),r=x(e[0]),N(i,"font-size","1rem"),N(i,"color","gray"),C(n,"id","main_link"),C(n,"class","svelte-1mvd3j6")},m(t,l,c){v(t,n,l),y(n,o),y(n,i),y(i,r),c&&s(),s=_(n,"click",e[1])},p(t,[e]){1&e&&M(r,t[0])},i:t,o:t,d(t){t&&b(n),s()}}}function jt(t,e,n){let o;a(t,Ct,t=>n(0,o=t));return[o,()=>Nt("main")]}class Ht extends vt{constructor(t){super(),yt(this,t,jt,At,l,{})}}function Ot(e){let n,o,i,r,s,l,c;const u=e[3].default,a=function(t,e,n,o){if(t){const i=d(t,e,n,o);return t[0](i)}}(u,e,e[2],null),f=a||function(e){let n,o;return{c(){(n=w("button")).textContent="Close",C(n,"name","modal-close")},m(t,i,r){v(t,n,i),r&&o(),o=_(n,"click",e[5])},p:t,d(t){t&&b(n),o()}}}(e);return{c(){n=w("div"),o=k(),i=w("div"),r=x(e[0]),s=k(),f&&f.c(),C(n,"class","modal-bg svelte-1df7d0c"),C(i,"class","modal svelte-1df7d0c")},m(t,u,a){v(t,n,u),v(t,o,u),v(t,i,u),y(i,r),y(i,s),f&&f.m(i,null),l=!0,a&&c(),c=_(n,"click",e[4])},p(t,[e]){(!l||1&e)&&M(r,t[0]),a&&a.p&&4&e&&a.p(d(u,t,t[2],null),function(t,e,n,o){if(t[2]&&o){const i=t[2](o(n));if(void 0===e.dirty)return i;if("object"==typeof i){const t=[],n=Math.max(e.dirty.length,i.length);for(let o=0;o<n;o+=1)t[o]=e.dirty[o]|i[o];return t}return e.dirty|i}return e.dirty}(u,t[2],e,null))},i(t){l||(rt(f,t),l=!0)},o(t){st(f,t),l=!1},d(t){t&&b(n),t&&b(o),t&&b(i),f&&f.d(t),c()}}}function Wt(t,e,n){const o=q();let{content:i}=e,{$$slots:r={},$$scope:s}=e;return t.$set=(t=>{"content"in t&&n(0,i=t.content),"$$scope"in t&&n(2,s=t.$$scope)}),[i,o,s,r,()=>o("cancel"),()=>o("close")]}class zt extends vt{constructor(t){super(),yt(this,t,Wt,Ot,l,{content:0})}}function Pt(t){const e=t-1;return e*e*e+1}function Rt(t,{delay:n=0,duration:o=400,easing:i=e}){const r=+getComputedStyle(t).opacity;return{delay:n,duration:o,easing:i,css:t=>`opacity: ${t*r}`}}function qt(t,{delay:e=0,duration:n=400,easing:o=Pt,x:i=0,y:r=0,opacity:s=0}){const l=getComputedStyle(t),c=+l.opacity,u="none"===l.transform?"":l.transform,a=c*(1-s);return{delay:e,duration:n,easing:o,css:(t,e)=>`\n\t\t\ttransform: ${u} translate(${(1-t)*i}px, ${(1-t)*r}px);\n\t\t\topacity: ${c-a*e}`}}function Lt(t,e,n){const o=getComputedStyle(t),i="none"===o.transform?"":o.transform,r=e.from.width/t.clientWidth,l=e.from.height/t.clientHeight,c=(e.from.left-e.to.left)/r,u=(e.from.top-e.to.top)/l,a=Math.sqrt(c*c+u*u),{delay:d=0,duration:f=(t=>120*Math.sqrt(t)),easing:m=Pt}=n;return{delay:d,duration:s(f)?f(a):f,easing:m,css:(t,e)=>`transform: ${i} translate(${e*c}px, ${e*u}px);`}}function Bt(t,e,n){const o=t.slice();return o[19]=e[n],o[20]=e,o[21]=n,o}function Dt(t){let e,n;return{c(){(e=w("button")).innerHTML='<div class="minus svelte-1dl0tfe"></div>',C(e,"name","rem-item"),C(e,"class","svelte-1dl0tfe")},m(o,i,r){v(o,e,i),r&&n(),n=_(e,"click",function(){s(t[9].bind(this,t[21]))&&t[9].bind(this,t[21]).apply(this,arguments)})},p(e,n){t=e},d(t){t&&b(e),n()}}}function Jt(n,o){let i,s,l,c,u,a,d,f,p,g=t;function h(){o[13].call(s,o[19],o[20],o[21])}let x=0!=o[21]&&Dt(o);function S(...t){return o[14](o[19],...t)}return{key:n,first:null,c(){i=w("div"),s=w("input"),l=k(),x&&x.c(),c=k(),(u=w("button")).innerHTML='<div class="cross svelte-1dl0tfe"></div>',C(s,"type","text"),C(s,"name","tmpitems"),C(s,"autocomplete","off"),C(s,"maxlength","48"),C(s,"placeholder",o[5]),s.required=!0,C(s,"class","svelte-1dl0tfe"),C(u,"name","add-item"),C(u,"class","svelte-1dl0tfe"),C(i,"class","itemslist svelte-1dl0tfe"),this.first=i},m(t,e,n){v(t,i,e),y(i,s),E(s,o[19]),y(i,l),x&&x.m(i,null),y(i,c),y(i,u),f=!0,n&&r(p),p=[_(s,"input",h),_(u,"click",S)]},p(t,e){o=t,(!f||32&e)&&C(s,"placeholder",o[5]),4&e&&s.value!==o[19]&&E(s,o[19]),0!=o[21]?x?x.p(o,e):((x=Dt(o)).c(),x.m(i,c)):x&&(x.d(1),x=null)},r(){d=i.getBoundingClientRect()},f(){!function(t){const e=getComputedStyle(t);if("absolute"!==e.position&&"fixed"!==e.position){const{width:n,height:o}=e,i=t.getBoundingClientRect();t.style.position="absolute",t.style.width=n,t.style.height=o,P(t,i)}}(i),g(),P(i,d)},a(){g(),g=function(n,o,i,r){if(!o)return t;const s=n.getBoundingClientRect();if(o.left===s.left&&o.right===s.right&&o.top===s.top&&o.bottom===s.bottom)return t;const{delay:l=0,duration:c=300,easing:u=e,start:a=m()+l,end:d=a+c,tick:f=t,css:p}=i(n,{from:o,to:s},r);let g,h=!0,y=!1;function v(){p&&z(n,g),h=!1}return $(t=>{if(!y&&t>=a&&(y=!0),y&&t>=d&&(f(1,0),v()),!h)return!1;if(y){const e=0+1*u((t-a)/c);f(e,1-e)}return!0}),p&&(g=W(n,0,1,c,l,u,p)),l||(y=!0),f(0,1),v}(i,d,Lt,{key:o[21]})},i(t){f||(G(()=>{a||(a=at(i,Rt,{key:o[21]},!0)),a.run(1)}),f=!0)},o(t){a||(a=at(i,Rt,{key:o[21]},!1)),a.run(0),f=!1},d(t){t&&b(i),x&&x.d(),t&&a&&a.end(),r(p)}}}function Ft(e){let n,o;return{c(){(n=w("button")).textContent="Delete",C(n,"name","delete-container"),N(n,"color","red"),N(n,"background-color","#f5f5f6"),C(n,"class","svelte-1dl0tfe")},m(t,i,r){v(t,n,i),r&&o(),o=_(n,"click",e[15])},p:t,d(t){t&&b(n),o()}}}function Yt(t){let e;const n=new zt({props:{content:"Are you sure you wanna delete this container?",$$slots:{default:[Gt]},$$scope:{ctx:t}}});return n.$on("cancel",t[17]),n.$on("close",t[18]),{c(){pt(n.$$.fragment)},m(t,o){gt(n,t,o),e=!0},p(t,e){const o={};4194320&e&&(o.$$scope={dirty:e,ctx:t}),n.$set(o)},i(t){e||(rt(n.$$.fragment,t),e=!0)},o(t){st(n.$$.fragment,t),e=!1},d(t){ht(n,t)}}}function Gt(e){let n,o,i,s,l,c;return{c(){n=x("Delete Confirm Modal\n        "),o=w("div"),(i=w("button")).textContent="Yes",s=k(),(l=w("button")).textContent="No",N(i,"background-color","red"),C(i,"class","svelte-1dl0tfe"),C(l,"class","svelte-1dl0tfe"),C(o,"class","row-buttons svelte-1dl0tfe")},m(t,u,a){v(t,n,u),v(t,o,u),y(o,i),y(o,s),y(o,l),a&&r(c),c=[_(i,"click",e[7],{once:!0}),_(l,"click",e[16])]},p:t,d(t){t&&b(n),t&&b(o),r(c)}}}function Kt(t){let e,n,o,i,s,l,c,u,a,d,f,m,p,g,h,$,x=[],M=new Map,N=t[2];const T=t=>t[21];for(let e=0;e<N.length;e+=1){let n=Bt(t,N,e),o=T(n);M.set(o,x[e]=Jt(o,n))}let I=t[3]&&Ft(t),A=t[4]&&Yt(t);return{c(){e=w("div"),n=w("label"),o=w("input"),i=k(),s=w("input"),l=k();for(let t=0;t<x.length;t+=1)x[t].c();c=k(),u=w("div"),I&&I.c(),a=k(),(d=w("button")).textContent="Save",p=k(),A&&A.c(),g=S(),C(o,"type","text"),C(o,"name","name"),C(o,"autocomplete","off"),C(o,"maxlength","25"),C(o,"placeholder","The Container Name"),o.required=!0,C(o,"class","svelte-1dl0tfe"),C(s,"type","text"),C(s,"name","type"),C(s,"autocomplete","off"),C(s,"maxlength","32"),C(s,"placeholder","The Container Type"),s.required=!0,C(s,"class","svelte-1dl0tfe"),C(d,"name","save-container"),C(d,"class","svelte-1dl0tfe"),C(u,"class","buttons svelte-1dl0tfe"),C(n,"class","svelte-1dl0tfe"),C(e,"classname","create-new"),C(e,"class","svelte-1dl0tfe")},m(f,m,b){v(f,e,m),y(e,n),y(n,o),E(o,t[0]),y(n,i),y(n,s),E(s,t[1]),y(n,l);for(let t=0;t<x.length;t+=1)x[t].m(n,null);y(n,c),y(n,u),I&&I.m(u,null),y(u,a),y(u,d),v(f,p,m),A&&A.m(f,m),v(f,g,m),h=!0,b&&r($),$=[_(o,"input",t[11]),_(s,"input",t[12]),_(d,"click",t[6],{once:!0})]},p(t,[e]){if(1&e&&o.value!==t[0]&&E(o,t[0]),2&e&&s.value!==t[1]&&E(s,t[1]),804&e){const o=t[2];ot();for(let t=0;t<x.length;t+=1)x[t].r();x=mt(x,e,T,1,t,o,M,n,ft,Jt,c,Bt);for(let t=0;t<x.length;t+=1)x[t].a();it()}t[3]?I?I.p(t,e):((I=Ft(t)).c(),I.m(u,a)):I&&(I.d(1),I=null),t[4]?A?(A.p(t,e),16&e&&rt(A,1)):((A=Yt(t)).c(),rt(A,1),A.m(g.parentNode,g)):A&&(ot(),st(A,1,1,()=>{A=null}),it())},i(t){if(!h){for(let t=0;t<N.length;t+=1)rt(x[t]);G(()=>{m&&m.end(1),f||(f=ct(e,Rt,{duration:1e3})),f.start()}),rt(A),h=!0}},o(t){for(let t=0;t<x.length;t+=1)st(x[t]);f&&f.invalidate(),m=ut(e,Rt,{duration:0}),st(A),h=!1},d(t){t&&b(e);for(let t=0;t<x.length;t+=1)x[t].d();I&&I.d(),t&&m&&m.end(),t&&b(p),A&&A.d(t),t&&b(g),r($)}}}function Qt(t,e,n){let{id:o=""}=e,{name:i=""}=e,{type:r=""}=e,{items:s=[""]}=e,{editt:l=!1}=e,c=!1,a="Start adding items to your container!";function d(t){""!==s[s.length-1]&&(n(2,s[s.length-1]=t,s),n(2,s=[...s,""]))}return t.$set=(t=>{"id"in t&&n(10,o=t.id),"name"in t&&n(0,i=t.name),"type"in t&&n(1,r=t.type),"items"in t&&n(2,s=t.items),"editt"in t&&n(3,l=t.editt)}),t.$$.update=(()=>{4&t.$$.dirty&&s.length>1&&n(5,a="And another one"),15&t.$$.dirty&&(console.log(i+":"+r+":"+s),Tt({name:i,type:r,items:s},l?"tmpCont":"unSaved")),4&t.$$.dirty&&console.log(s.length+" items:"+s)}),[i,r,s,l,c,a,function(){i&&r&&s&&(n(2,s=s.filter(Boolean)),function(t,e,n,o=""){if(""==o)console.log("I am Creating new one"),kt.update(o=>[...o,{id:o.length+Math.random(),name:t,type:e,items:n}]),Tt({id:"",name:"",type:"",items:[""]},"unSaved");else{let i=u(kt).findIndex(t=>t.id===o),r=u(kt);r.splice(i,1,{id:o,name:t,type:e,items:n}),kt.update(()=>r),Tt({id:"",name:"",type:"",items:[""]},"tmpCont")}Tt(u(kt),"myStuff")}(i,r,s,o),console.log("handleSubmitted"),Nt("main"),n(3,l=!1))},function(){!function(t){let e=u(kt).findIndex(e=>e.id===t),n=u(kt);n.splice(e,1),kt.update(()=>n),Tt({id:"",name:"",type:"",items:[""]},"tmpCont"),Tt(u(kt),"myStuff")}(o),Nt("main")},d,function(t){console.log(t+" th item deleted"),n(2,s=s.filter((e,n)=>n!==t))},o,function(){i=this.value,n(0,i)},function(){r=this.value,n(1,r)},function(t,e,o){e[o]=this.value,n(2,s)},t=>d(t),()=>n(4,c=!0),()=>n(4,c=!1),()=>n(4,c=!1),()=>n(4,c=!1)]}class Ut extends vt{constructor(t){super(),yt(this,t,Qt,Kt,l,{id:10,name:0,type:1,items:2,editt:3})}}function Vt(e){return{c:t,m:t,p:t,d:t}}function Xt(e){let n,o;return{c(){(n=w("button")).innerHTML='<div id="cross" class="svelte-kbhj1o"></div>',C(n,"id","menu-edit-create"),C(n,"name","new-list"),C(n,"class","svelte-kbhj1o")},m(t,i,r){v(t,n,i),r&&o(),o=_(n,"click",e[1])},p:t,d(t){t&&b(n),o()}}}function Zt(e){let n;function o(t,e){return"newlist"===t[0]?Xt:"editlist"===t[0]?Vt:void 0}let i=o(e),r=i&&i(e);return{c(){r&&r.c(),n=S()},m(t,e){r&&r.m(t,e),v(t,n,e)},p(t,[e]){i===(i=o(t))&&r?r.p(t,e):(r&&r.d(1),(r=i&&i(t))&&(r.c(),r.m(n.parentNode,n)))},i:t,o:t,d(t){r&&r.d(t),t&&b(n)}}}function te(t,e,n){let{button:o}=e;return t.$set=(t=>{"button"in t&&n(0,o=t.button)}),[o,()=>Nt(o)]}class ee extends vt{constructor(t){super(),yt(this,t,te,Zt,l,{button:0})}}function ne(t,e,n){const o=t.slice();return o[8]=e[n],o[10]=n,o}function oe(t){let e,n,o,i,r,s,l,c,u,a,d,f,m=t[3],p=[];for(let e=0;e<m.length;e+=1)p[e]=ie(ne(t,m,e));return{c(){e=w("div"),n=x("Type: "),o=x(t[2]),i=x(" |\n            "),r=x(t[5]),s=x(" Stuff here\n            "),l=w("ul");for(let t=0;t<p.length;t+=1)p[t].c();c=k(),(u=w("button")).textContent="Edit",C(l,"class","item-list svelte-11u0fu2"),C(u,"class","edit-button svelte-11u0fu2"),C(u,"name","edit-button"),C(e,"class","details svelte-11u0fu2")},m(a,m,g){v(a,e,m),y(e,n),y(e,o),y(e,i),y(e,r),y(e,s),y(e,l);for(let t=0;t<p.length;t+=1)p[t].m(l,null);y(e,c),y(e,u),d=!0,g&&f(),f=_(u,"click",t[4])},p(t,e){if((!d||4&e)&&M(o,t[2]),8&e){let n;for(m=t[3],n=0;n<m.length;n+=1){const o=ne(t,m,n);p[n]?p[n].p(o,e):(p[n]=ie(o),p[n].c(),p[n].m(l,null))}for(;n<p.length;n+=1)p[n].d(1);p.length=m.length}},i(t){d||(G(()=>{a||(a=at(e,qt,{y:-10,duration:200},!0)),a.run(1)}),d=!0)},o(t){a||(a=at(e,qt,{y:-10,duration:200},!1)),a.run(0),d=!1},d(t){t&&b(e),function(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}(p,t),t&&a&&a.end(),f()}}}function ie(t){let e,n,o=t[8]+"";return{c(){e=w("li"),n=x(o)},m(t,o){v(t,e,o),y(e,n)},p(t,e){8&e&&o!==(o=t[8]+"")&&M(n,o)},d(t){t&&b(e)}}}function re(t){let e,n,o,i,r,s,l,c,u,a,d=!t[0]&&oe(t);return{c(){e=w("div"),n=w("div"),o=x(t[1]),i=k(),r=w("hr"),s=k(),d&&d.c(),C(n,"id","name"),C(n,"class","svelte-11u0fu2"),N(r,"width","90%"),N(r,"border-color","#e1e2e186"),C(e,"class","containersum svelte-11u0fu2")},m(l,c,f){v(l,e,c),y(e,n),y(n,o),y(e,i),y(e,r),y(e,s),d&&d.m(e,null),u=!0,f&&a(),a=_(e,"click",t[6])},p(t,[n]){(!u||2&n)&&M(o,t[1]),t[0]?d&&(ot(),st(d,1,1,()=>{d=null}),it()):d?(d.p(t,n),1&n&&rt(d,1)):((d=oe(t)).c(),rt(d,1),d.m(e,null))},i(t){u||(rt(d),G(()=>{c&&c.end(1),l||(l=ct(e,Rt,{duration:500})),l.start()}),u=!0)},o(t){st(d),l&&l.invalidate(),c=ut(e,Rt,{duration:0}),u=!1},d(t){t&&b(e),d&&d.d(),t&&c&&c.end(),a()}}}function se(t,e,n){let{id:o=""}=e,{name:i="TestName"}=e,{type:r="TestType"}=e,{items:s=["sugar"]}=e,l=s.length,{isSum:c=!0}=e;return t.$set=(t=>{"id"in t&&n(7,o=t.id),"name"in t&&n(1,i=t.name),"type"in t&&n(2,r=t.type),"items"in t&&n(3,s=t.items),"isSum"in t&&n(0,c=t.isSum)}),[c,i,r,s,function(){!function(t,e,n,o){console.log("tmpContis: "+o),St.set({name:t,type:e,items:n,id:o}),console.log(St)}(i,r,s,o),Nt("editlist"),console.log("handleSubmitted by editCont")},l,function(){n(0,c=!c)},o]}class le extends vt{constructor(t){super(),yt(this,t,se,re,l,{id:7,name:1,type:2,items:3,isSum:0,editHandle:4})}get editHandle(){return this.$$.ctx[4]}}function ce(t,e,n){const o=t.slice();return o[1]=e[n],o[3]=n,o}function ue(t){let e;return{c(){(e=w("div")).innerHTML="<div>\n                Welcome to MyStuff! Start adding Containers to the app using the plus button so you\n                can keep track of stuff you have, even when you forgot the app remembers!\n            </div> \n            \n            <div>\n                This app saves all data to your local store so all your data is on your device.\n            </div> \n        ",C(e,"class","welcome svelte-lppm3v")},m(t,n){v(t,e,n)},d(t){t&&b(e)}}}function ae(t,e){let o,i;const r=[e[1]];let s={};for(let t=0;t<r.length;t+=1)s=n(s,r[t]);const l=new le({props:s});return{key:t,first:null,c(){o=S(),pt(l.$$.fragment),this.first=o},m(t,e){v(t,o,e),gt(l,t,e),i=!0},p(t,e){const n=1&e?function(t,e){const n={},o={},i={$$scope:1};let r=t.length;for(;r--;){const s=t[r],l=e[r];if(l){for(const t in s)t in l||(o[t]=1);for(const t in l)i[t]||(n[t]=l[t],i[t]=1);t[r]=l}else for(const t in s)i[t]=1}for(const t in o)t in n||(n[t]=void 0);return n}(r,[(o=t[1],"object"==typeof o&&null!==o?o:{})]):{};var o;l.$set(n)},i(t){i||(rt(l.$$.fragment,t),i=!0)},o(t){st(l.$$.fragment,t),i=!1},d(t){t&&b(o),ht(l,t)}}}function de(t){let e,n,o=[],i=new Map,r=t[0];const s=t=>t[1].id;for(let e=0;e<r.length;e+=1){let n=ce(t,r,e),l=s(n);i.set(l,o[e]=ae(l,n))}let l=null;return r.length||(l=ue()),{c(){for(let t=0;t<o.length;t+=1)o[t].c();e=S(),l&&l.c()},m(t,i){for(let e=0;e<o.length;e+=1)o[e].m(t,i);v(t,e,i),l&&l.m(t,i),n=!0},p(t,[n]){if(1&n){const r=t[0];ot(),o=mt(o,n,s,1,t,r,i,e.parentNode,dt,ae,e,ce),it(),r.length?l&&(l.d(1),l=null):l||((l=ue()).c(),l.m(e.parentNode,e))}},i(t){if(!n){for(let t=0;t<r.length;t+=1)rt(o[t]);n=!0}},o(t){for(let t=0;t<o.length;t+=1)st(o[t]);n=!1},d(t){for(let e=0;e<o.length;e+=1)o[e].d(t);t&&b(e),l&&l.d(t)}}}function fe(t,e,n){let o;return a(t,kt,t=>n(0,o=t)),[o]}class me extends vt{constructor(t){super(),yt(this,t,fe,de,l,{})}}function pe(t){let e,n,o,i,r,s,l,c,u;const a=new me({props:{alt:"Welcome-Page"}}),d=new ee({props:{button:"newlist"}});return{c(){e=x("width:"),n=x(t[0]),o=x(" height:"),i=x(t[1]),r=x(" ratio: "),s=x(t[2]),l=k(),pt(a.$$.fragment),c=k(),pt(d.$$.fragment)},m(t,f){v(t,e,f),v(t,n,f),v(t,o,f),v(t,i,f),v(t,r,f),v(t,s,f),v(t,l,f),gt(a,t,f),v(t,c,f),gt(d,t,f),u=!0},p(t,e){(!u||1&e)&&M(n,t[0]),(!u||2&e)&&M(i,t[1]),(!u||4&e)&&M(s,t[2])},i(t){u||(rt(a.$$.fragment,t),rt(d.$$.fragment,t),u=!0)},o(t){st(a.$$.fragment,t),st(d.$$.fragment,t),u=!1},d(t){t&&b(e),t&&b(n),t&&b(o),t&&b(i),t&&b(r),t&&b(s),t&&b(l),ht(a,t),t&&b(c),ht(d,t)}}}function ge(t){let e;const n=new Ut({props:{name:t[5].name,type:t[5].type,items:t[5].items,id:t[5].id,editt:!0}});return{c(){pt(n.$$.fragment)},m(t,o){gt(n,t,o),e=!0},p(t,e){const o={};32&e&&(o.name=t[5].name),32&e&&(o.type=t[5].type),32&e&&(o.items=t[5].items),32&e&&(o.id=t[5].id),n.$set(o)},i(t){e||(rt(n.$$.fragment,t),e=!0)},o(t){st(n.$$.fragment,t),e=!1},d(t){ht(n,t)}}}function he(t){let e;const n=new Ut({props:{name:t[4].name,type:t[4].type,items:t[4].items,editt:!1}});return{c(){pt(n.$$.fragment)},m(t,o){gt(n,t,o),e=!0},p(t,e){const o={};16&e&&(o.name=t[4].name),16&e&&(o.type=t[4].type),16&e&&(o.items=t[4].items),n.$set(o)},i(t){e||(rt(n.$$.fragment,t),e=!0)},o(t){st(n.$$.fragment,t),e=!1},d(t){ht(n,t)}}}function $e(t){let e,n,o,i;const r=[he,ge,pe],s=[];function l(t,e){return"newlist"===t[3]?0:"editlist"===t[3]?1:2}return e=l(t),n=s[e]=r[e](t),{c(){n.c(),o=S()},m(t,n){s[e].m(t,n),v(t,o,n),i=!0},p(t,[i]){let c=e;(e=l(t))===c?s[e].p(t,i):(ot(),st(s[c],1,1,()=>{s[c]=null}),it(),(n=s[e])||(n=s[e]=r[e](t)).c(),rt(n,1),n.m(o.parentNode,o))},i(t){i||(rt(n),i=!0)},o(t){st(n),i=!1},d(t){s[e].d(t),t&&b(o)}}}function ye(t,e,n){let o,i,r;a(t,xt,t=>n(3,o=t)),a(t,_t,t=>n(4,i=t)),a(t,St,t=>n(5,r=t));let s,{w:l}=e,{h:c}=e;return t.$set=(t=>{"w"in t&&n(0,l=t.w),"h"in t&&n(1,c=t.h)}),t.$$.update=(()=>{8&t.$$.dirty&&console.log("Current page is: "+o),3&t.$$.dirty&&n(2,s=(l/c).toFixed(2))}),[l,c,s,o,i,r]}class ve extends vt{constructor(t){super(),yt(this,t,ye,$e,l,{w:0,h:1})}}function be(t){let e,n,o,i;const r=new Ht({props:{Header:!0}}),s=new ve({props:{w:t[0],h:t[1]}});return{c(){e=w("main"),pt(r.$$.fragment),n=k(),pt(s.$$.fragment),C(e,"alt","Main Page"),C(e,"class","svelte-10d9n07"),G(()=>t[2].call(e))},m(l,c){v(l,e,c),gt(r,e,null),y(e,n),gt(s,e,null),o=I(e,t[2].bind(e)),i=!0},p(t,[e]){const n={};1&e&&(n.w=t[0]),2&e&&(n.h=t[1]),s.$set(n)},i(t){i||(rt(r.$$.fragment,t),rt(s.$$.fragment,t),i=!0)},o(t){st(r.$$.fragment,t),st(s.$$.fragment,t),i=!1},d(t){t&&b(e),ht(r),ht(s),o()}}}function we(t,e,n){let o,i;return Et(),t.$$.update=(()=>{3&t.$$.dirty&&console.log("main w and h: ",o," ",i)}),[o,i,function(){o=this.clientWidth,i=this.clientHeight,n(0,o),n(1,i)}]}return"serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("serviceWorker.js").then(t=>console.log("service worker registered")).catch(t=>console.log("service worker not registered",t))}),new class extends vt{constructor(t){super(),yt(this,t,we,be,l,{})}}({target:document.body,props:{}})}();
//# sourceMappingURL=bundle.js.map
