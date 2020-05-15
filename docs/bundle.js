var app=function(){"use strict";function t(){}const e=t=>t;function n(t,e){for(const n in e)t[n]=e[n];return t}function o(t){return t()}function i(){return Object.create(null)}function s(t){t.forEach(o)}function r(t){return"function"==typeof t}function c(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function l(e,...n){if(null==e)return t;const o=e.subscribe(...n);return o.unsubscribe?()=>o.unsubscribe():o}function a(t){let e;return l(t,t=>e=t)(),e}function u(t,e,n){t.$$.on_destroy.push(l(e,n))}function d(t,e,o,i){return t[1]&&i?n(o.ctx.slice(),t[1](i(e))):o.ctx}function f(t){return null==t?"":t}const m="undefined"!=typeof window;let p=m?()=>window.performance.now():()=>Date.now(),g=m?t=>requestAnimationFrame(t):t;const h=new Set;function y(t){h.forEach(e=>{e.c(t)||(h.delete(e),e.f())}),0!==h.size&&g(y)}function $(t){let e;return 0===h.size&&g(y),{promise:new Promise(n=>{h.add(e={c:t,f:n})}),abort(){h.delete(e)}}}function v(t,e){t.appendChild(e)}function b(t,e,n){t.insertBefore(e,n||null)}function w(t){t.parentNode.removeChild(t)}function x(t){return document.createElement(t)}function k(t){return document.createTextNode(t)}function S(){return k(" ")}function _(){return k("")}function C(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function z(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function M(t,e){e=""+e,t.data!==e&&(t.data=e)}function E(t,e){(null!=e||t.value)&&(t.value=e)}function N(t,e,n,o){t.style.setProperty(e,n,o?"important":"")}let I;function T(t,e){const n=getComputedStyle(t),o=(parseInt(n.zIndex)||0)-1;"static"===n.position&&(t.style.position="relative");const i=x("iframe");let s;return i.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; "+`overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: ${o};`),i.setAttribute("aria-hidden","true"),i.tabIndex=-1,!function(){if(void 0===I){I=!1;try{"undefined"!=typeof window&&window.parent&&window.parent.document}catch(t){I=!0}}return I}()?(i.src="about:blank",i.onload=(()=>{s=C(i.contentWindow,"resize",e)})):(i.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",s=C(window,"message",t=>{t.source===i.contentWindow&&e()})),v(t,i),()=>{w(i),s&&s()}}function A(t,e){const n=document.createEvent("CustomEvent");return n.initCustomEvent(t,!1,!1,e),n}const j=new Set;let O,H=0;function R(t,e,n,o,i,s,r,c=0){const l=16.666/o;let a="{\n";for(let t=0;t<=1;t+=l){const o=e+(n-e)*s(t);a+=100*t+`%{${r(o,1-o)}}\n`}const u=a+`100% {${r(n,1-n)}}\n}`,d=`__svelte_${function(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}(u)}_${c}`,f=t.ownerDocument;j.add(f);const m=f.__svelte_stylesheet||(f.__svelte_stylesheet=f.head.appendChild(x("style")).sheet),p=f.__svelte_rules||(f.__svelte_rules={});p[d]||(p[d]=!0,m.insertRule(`@keyframes ${d} ${u}`,m.cssRules.length));const g=t.style.animation||"";return t.style.animation=`${g?`${g}, `:""}${d} ${o}ms linear ${i}ms 1 both`,H+=1,d}function W(t,e){const n=(t.style.animation||"").split(", "),o=n.filter(e?t=>t.indexOf(e)<0:t=>-1===t.indexOf("__svelte")),i=n.length-o.length;i&&(t.style.animation=o.join(", "),(H-=i)||g(()=>{H||(j.forEach(t=>{const e=t.__svelte_stylesheet;let n=e.cssRules.length;for(;n--;)e.deleteRule(n);t.__svelte_rules={}}),j.clear())}))}function q(t,e){const n=t.getBoundingClientRect();if(e.left!==n.left||e.top!==n.top){const o=getComputedStyle(t),i="none"===o.transform?"":o.transform;t.style.transform=`${i} translate(${e.left-n.left}px, ${e.top-n.top}px)`}}function L(t){O=t}function P(){const t=function(){if(!O)throw new Error("Function called outside component initialization");return O}();return(e,n)=>{const o=t.$$.callbacks[e];if(o){const i=A(e,n);o.slice().forEach(e=>{e.call(t,i)})}}}const B=[],D=[],J=[],V=[],F=Promise.resolve();let Y=!1;function G(t){J.push(t)}let K=!1;const Q=new Set;function U(){if(!K){K=!0;do{for(let t=0;t<B.length;t+=1){const e=B[t];L(e),X(e.$$)}for(B.length=0;D.length;)D.pop()();for(let t=0;t<J.length;t+=1){const e=J[t];Q.has(e)||(Q.add(e),e())}J.length=0}while(B.length);for(;V.length;)V.pop()();Y=!1,K=!1,Q.clear()}}function X(t){if(null!==t.fragment){t.update(),s(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(G)}}let Z;function tt(){return Z||(Z=Promise.resolve()).then(()=>{Z=null}),Z}function et(t,e,n){t.dispatchEvent(A(`${e?"intro":"outro"}${n}`))}const nt=new Set;let ot;function it(){ot={r:0,c:[],p:ot}}function st(){ot.r||s(ot.c),ot=ot.p}function rt(t,e){t&&t.i&&(nt.delete(t),t.i(e))}function ct(t,e,n,o){if(t&&t.o){if(nt.has(t))return;nt.add(t),ot.c.push(()=>{nt.delete(t),o&&(n&&t.d(1),o())}),t.o(e)}}const lt={duration:0};function at(n,o,i){let s,c,l=o(n,i),a=!1,u=0;function d(){s&&W(n,s)}function f(){const{delay:o=0,duration:i=300,easing:r=e,tick:f=t,css:m}=l||lt;m&&(s=R(n,0,1,i,o,r,m,u++)),f(0,1);const g=p()+o,h=g+i;c&&c.abort(),a=!0,G(()=>et(n,!0,"start")),c=$(t=>{if(a){if(t>=h)return f(1,0),et(n,!0,"end"),d(),a=!1;if(t>=g){const e=r((t-g)/i);f(e,1-e)}}return a})}let m=!1;return{start(){m||(W(n),r(l)?(l=l(),tt().then(f)):f())},invalidate(){m=!1},end(){a&&(d(),a=!1)}}}function ut(n,o,i){let c,l=o(n,i),a=!0;const u=ot;function d(){const{delay:o=0,duration:i=300,easing:r=e,tick:d=t,css:f}=l||lt;f&&(c=R(n,1,0,i,o,r,f));const m=p()+o,g=m+i;G(()=>et(n,!1,"start")),$(t=>{if(a){if(t>=g)return d(0,1),et(n,!1,"end"),--u.r||s(u.c),!1;if(t>=m){const e=r((t-m)/i);d(1-e,e)}}return a})}return u.r+=1,r(l)?tt().then(()=>{l=l(),d()}):d(),{end(t){t&&l.tick&&l.tick(1,0),a&&(c&&W(n,c),a=!1)}}}function dt(n,o,i,c){let l=o(n,i),a=c?0:1,u=null,d=null,f=null;function m(){f&&W(n,f)}function g(t,e){const n=t.b-a;return e*=Math.abs(n),{a:a,b:t.b,d:n,duration:e,start:t.start,end:t.start+e,group:t.group}}function h(o){const{delay:i=0,duration:r=300,easing:c=e,tick:h=t,css:y}=l||lt,v={start:p()+i,b:o};o||(v.group=ot,ot.r+=1),u?d=v:(y&&(m(),f=R(n,a,o,r,i,c,y)),o&&h(0,1),u=g(v,r),G(()=>et(n,o,"start")),$(t=>{if(d&&t>d.start&&(u=g(d,r),d=null,et(n,u.b,"start"),y&&(m(),f=R(n,a,u.b,u.duration,0,c,l.css))),u)if(t>=u.end)h(a=u.b,1-a),et(n,u.b,"end"),d||(u.b?m():--u.group.r||s(u.group.c)),u=null;else if(t>=u.start){const e=t-u.start;a=u.a+u.d*c(e/u.duration),h(a,1-a)}return!(!u&&!d)}))}return{run(t){r(l)?tt().then(()=>{l=l(),h(t)}):h(t)},end(){m(),u=d=null}}}function ft(t,e){ct(t,1,1,()=>{e.delete(t.key)})}function mt(t,e){t.f(),ft(t,e)}function pt(t,e,n,o,i,s,r,c,l,a,u,d){let f=t.length,m=s.length,p=f;const g={};for(;p--;)g[t[p].key]=p;const h=[],y=new Map,$=new Map;for(p=m;p--;){const t=d(i,s,p),c=n(t);let l=r.get(c);l?o&&l.p(t,e):(l=a(c,t)).c(),y.set(c,h[p]=l),c in g&&$.set(c,Math.abs(p-g[c]))}const v=new Set,b=new Set;function w(t){rt(t,1),t.m(c,u,r.has(t.key)),r.set(t.key,t),u=t.first,m--}for(;f&&m;){const e=h[m-1],n=t[f-1],o=e.key,i=n.key;e===n?(u=e.first,f--,m--):y.has(i)?!r.has(o)||v.has(o)?w(e):b.has(i)?f--:$.get(o)>$.get(i)?(b.add(o),w(e)):(v.add(i),f--):(l(n,r),f--)}for(;f--;){const e=t[f];y.has(e.key)||l(e,r)}for(;m;)w(h[m-1]);return h}function gt(t){t&&t.c()}function ht(t,e,n){const{fragment:i,on_mount:c,on_destroy:l,after_update:a}=t.$$;i&&i.m(e,n),G(()=>{const e=c.map(o).filter(r);l?l.push(...e):s(e),t.$$.on_mount=[]}),a.forEach(G)}function yt(t,e){const n=t.$$;null!==n.fragment&&(s(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function $t(t,e){-1===t.$$.dirty[0]&&(B.push(t),Y||(Y=!0,F.then(U)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function vt(e,n,o,r,c,l,a=[-1]){const u=O;L(e);const d=n.props||{},f=e.$$={fragment:null,ctx:null,props:l,update:t,not_equal:c,bound:i(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:[]),callbacks:i(),dirty:a};let m=!1;if(f.ctx=o?o(e,d,(t,n,...o)=>{const i=o.length?o[0]:n;return f.ctx&&c(f.ctx[t],f.ctx[t]=i)&&(f.bound[t]&&f.bound[t](i),m&&$t(e,t)),n}):[],f.update(),m=!0,s(f.before_update),f.fragment=!!r&&r(f.ctx),n.target){if(n.hydrate){const t=(p=n.target,Array.from(p.childNodes));f.fragment&&f.fragment.l(t),t.forEach(w)}else f.fragment&&f.fragment.c();n.intro&&rt(e.$$.fragment),ht(e,n.target,n.anchor),U()}var p;L(u)}class bt{$destroy(){yt(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}}const wt=[];function xt(e,n=t){let o;const i=[];function s(t){if(c(e,t)&&(e=t,o)){const t=!wt.length;for(let t=0;t<i.length;t+=1){const n=i[t];n[1](),wt.push(n,e)}if(t){for(let t=0;t<wt.length;t+=2)wt[t][0](wt[t+1]);wt.length=0}}}return{set:s,update:function(t){s(t(e))},subscribe:function(r,c=t){const l=[r,c];return i.push(l),1===i.length&&(o=n(s)||t),r(e),()=>{const t=i.indexOf(l);-1!==t&&i.splice(t,1),0===i.length&&(o(),o=null)}}}}function kt(t,e){localStorage.setItem(e,JSON.stringify(t))}function St(t){return localStorage.getItem(t)?JSON.parse(localStorage.getItem(t)):"myVersion"===t?"0":"myStuff"===t?new Array:"totalContainers"===t?new Array:"unSaved"===t?{id:"",name:"",type:"",items:[["",!1]]}:"tmpCont"===t?{id:"",name:"",type:"",items:[["",!1]]}:void 0}const _t={subscribe:xt("0.514c",Ct).subscribe};var Ct;const zt=xt("main"),Mt=xt([]),Et=xt({id:"",name:"",type:"",items:[["",!1]]}),Nt=xt({id:"",name:"",type:"",items:[["",!1]]});function It(){var t;0==a(Mt).length&&function(t){let e=St("myStuff");if(t<"0.513a"&&0!==e.length){let n;console.log("version is old ",t,"... gonna do stuff"),"boolean"!=typeof e[0].items[0][1]&&(n=e.map(t=>[{id:t.id,name:t.name,type:t.type,items:t.items.map(t=>[t,!1]),interact:!1}])),Mt.update(()=>n),console.log("temp is----------------------------\x3e",a(Mt)),kt(a(Mt),"myStuff"),kt(a(_t),"myVersion")}else console.log("version is good!"),kt(a(_t),"myVersion")}(St("myVersion")),Mt.set(St("myStuff")),zt.set((t="lastPage",localStorage.getItem(t)?JSON.parse(localStorage.getItem(t)):"main")),Nt.set(St("unSaved")),Et.set(St("tmpCont"))}function Tt(t){var e;if(e=t,console.log(e),localStorage.setItem("lastPage",JSON.stringify(e)),"main"===t)return zt.set("main"),void It();"newlist"!==t?"editlist"!==t?zt.set("newlist"):zt.set("editlist"):zt.set("newlist")}function At(e){let n,o,i,s,r;return{c(){n=x("button"),o=k("My_Stuff "),i=x("span"),s=k(e[0]),N(i,"font-size","1rem"),N(i,"color","gray"),z(n,"id","main_link"),z(n,"class","svelte-1mvd3j6")},m(t,c,l){b(t,n,c),v(n,o),v(n,i),v(i,s),l&&r(),r=C(n,"click",e[1])},p(t,[e]){1&e&&M(s,t[0])},i:t,o:t,d(t){t&&w(n),r()}}}function jt(t,e,n){let o;u(t,_t,t=>n(0,o=t));return[o,()=>Tt("main")]}class Ot extends bt{constructor(t){super(),vt(this,t,jt,At,c,{})}}function Ht(t,e,n,o="",i=!1){if(""==o)console.log("I am Creating new one"),Mt.update(o=>[...o,{id:o.length+Math.random(),name:t,type:e,items:n,interact:!1}]),kt({id:"",name:"",type:"",items:[""]},"unSaved");else{console.log("updating the container...");let s=a(Mt).findIndex(t=>t.id===o),r=a(Mt);r.splice(s,1,{id:o,name:t,type:e,items:n,interact:i}),Mt.update(()=>r),kt({id:"",name:"",type:"",items:[""]},"tmpCont")}kt(a(Mt),"myStuff")}function Rt(e){let n,o,i,s,r,c,l;const a=e[3].default,u=function(t,e,n,o){if(t){const i=d(t,e,n,o);return t[0](i)}}(a,e,e[2],null),f=u||function(e){let n,o;return{c(){(n=x("button")).textContent="Close",z(n,"name","modal-close")},m(t,i,s){b(t,n,i),s&&o(),o=C(n,"click",e[5])},p:t,d(t){t&&w(n),o()}}}(e);return{c(){n=x("div"),o=S(),i=x("div"),s=k(e[0]),r=S(),f&&f.c(),z(n,"class","modal-bg svelte-1df7d0c"),z(i,"class","modal svelte-1df7d0c")},m(t,a,u){b(t,n,a),b(t,o,a),b(t,i,a),v(i,s),v(i,r),f&&f.m(i,null),c=!0,u&&l(),l=C(n,"click",e[4])},p(t,[e]){(!c||1&e)&&M(s,t[0]),u&&u.p&&4&e&&u.p(d(a,t,t[2],null),function(t,e,n,o){if(t[2]&&o){const i=t[2](o(n));if(void 0===e.dirty)return i;if("object"==typeof i){const t=[],n=Math.max(e.dirty.length,i.length);for(let o=0;o<n;o+=1)t[o]=e.dirty[o]|i[o];return t}return e.dirty|i}return e.dirty}(a,t[2],e,null))},i(t){c||(rt(f,t),c=!0)},o(t){ct(f,t),c=!1},d(t){t&&w(n),t&&w(o),t&&w(i),f&&f.d(t),l()}}}function Wt(t,e,n){const o=P();let{content:i}=e,{$$slots:s={},$$scope:r}=e;return t.$set=(t=>{"content"in t&&n(0,i=t.content),"$$scope"in t&&n(2,r=t.$$scope)}),[i,o,r,s,()=>o("cancel"),()=>o("close")]}class qt extends bt{constructor(t){super(),vt(this,t,Wt,Rt,c,{content:0})}}function Lt(t){const e=t-1;return e*e*e+1}function Pt(t,{delay:n=0,duration:o=400,easing:i=e}){const s=+getComputedStyle(t).opacity;return{delay:n,duration:o,easing:i,css:t=>`opacity: ${t*s}`}}function Bt(t,{delay:e=0,duration:n=400,easing:o=Lt,x:i=0,y:s=0,opacity:r=0}){const c=getComputedStyle(t),l=+c.opacity,a="none"===c.transform?"":c.transform,u=l*(1-r);return{delay:e,duration:n,easing:o,css:(t,e)=>`\n\t\t\ttransform: ${a} translate(${(1-t)*i}px, ${(1-t)*s}px);\n\t\t\topacity: ${l-u*e}`}}function Dt(t,e,n){const o=getComputedStyle(t),i="none"===o.transform?"":o.transform,s=e.from.width/t.clientWidth,c=e.from.height/t.clientHeight,l=(e.from.left-e.to.left)/s,a=(e.from.top-e.to.top)/c,u=Math.sqrt(l*l+a*a),{delay:d=0,duration:f=(t=>120*Math.sqrt(t)),easing:m=Lt}=n;return{delay:d,duration:r(f)?f(u):f,easing:m,css:(t,e)=>`transform: ${i} translate(${e*l}px, ${e*a}px);`}}function Jt(t,e,n){const o=t.slice();return o[19]=e[n],o[20]=e,o[21]=n,o}function Vt(t){let e,n;return{c(){(e=x("button")).innerHTML='<div class="minus svelte-dfzaog"></div>',z(e,"name","rem-item"),z(e,"class","svelte-dfzaog")},m(o,i,s){b(o,e,i),s&&n(),n=C(e,"click",function(){r(t[9].bind(this,t[21]))&&t[9].bind(this,t[21]).apply(this,arguments)})},p(e,n){t=e},d(t){t&&w(e),n()}}}function Ft(n,o){let i,r,c,l,a,u,d,f,m,g=t;function h(){o[13].call(r,o[19])}let y=0!=o[21]&&Vt(o);function k(...t){return o[14](o[19],...t)}return{key:n,first:null,c(){i=x("div"),r=x("input"),c=S(),y&&y.c(),l=S(),(a=x("button")).innerHTML='<div class="cross svelte-dfzaog"></div>',z(r,"type","text"),z(r,"name","tmpitems"),z(r,"autocomplete","off"),z(r,"maxlength","48"),z(r,"placeholder",o[5]),r.required=!0,z(r,"class","svelte-dfzaog"),z(a,"name","add-item"),z(a,"class","svelte-dfzaog"),z(i,"class","itemslist svelte-dfzaog"),this.first=i},m(t,e,n){b(t,i,e),v(i,r),E(r,o[19][0]),v(i,c),y&&y.m(i,null),v(i,l),v(i,a),f=!0,n&&s(m),m=[C(r,"input",h),C(a,"click",k)]},p(t,e){o=t,(!f||32&e)&&z(r,"placeholder",o[5]),4&e&&r.value!==o[19][0]&&E(r,o[19][0]),0!=o[21]?y?y.p(o,e):((y=Vt(o)).c(),y.m(i,l)):y&&(y.d(1),y=null)},r(){d=i.getBoundingClientRect()},f(){!function(t){const e=getComputedStyle(t);if("absolute"!==e.position&&"fixed"!==e.position){const{width:n,height:o}=e,i=t.getBoundingClientRect();t.style.position="absolute",t.style.width=n,t.style.height=o,q(t,i)}}(i),g(),q(i,d)},a(){g(),g=function(n,o,i,s){if(!o)return t;const r=n.getBoundingClientRect();if(o.left===r.left&&o.right===r.right&&o.top===r.top&&o.bottom===r.bottom)return t;const{delay:c=0,duration:l=300,easing:a=e,start:u=p()+c,end:d=u+l,tick:f=t,css:m}=i(n,{from:o,to:r},s);let g,h=!0,y=!1;function v(){m&&W(n,g),h=!1}return $(t=>{if(!y&&t>=u&&(y=!0),y&&t>=d&&(f(1,0),v()),!h)return!1;if(y){const e=0+1*a((t-u)/l);f(e,1-e)}return!0}),m&&(g=R(n,0,1,l,c,a,m)),c||(y=!0),f(0,1),v}(i,d,Dt,{key:o[21]})},i(t){f||(G(()=>{u||(u=dt(i,Pt,{key:o[21]},!0)),u.run(1)}),f=!0)},o(t){u||(u=dt(i,Pt,{key:o[21]},!1)),u.run(0),f=!1},d(t){t&&w(i),y&&y.d(),t&&u&&u.end(),s(m)}}}function Yt(e){let n,o;return{c(){(n=x("button")).textContent="Delete",z(n,"name","delete-container"),N(n,"color","red"),N(n,"background-color","#f5f5f6"),z(n,"class","svelte-dfzaog")},m(t,i,s){b(t,n,i),s&&o(),o=C(n,"click",e[15])},p:t,d(t){t&&w(n),o()}}}function Gt(t){let e;const n=new qt({props:{content:"Are you sure you wanna delete this container?",$$slots:{default:[Kt]},$$scope:{ctx:t}}});return n.$on("cancel",t[17]),n.$on("close",t[18]),{c(){gt(n.$$.fragment)},m(t,o){ht(n,t,o),e=!0},p(t,e){const o={};4194320&e&&(o.$$scope={dirty:e,ctx:t}),n.$set(o)},i(t){e||(rt(n.$$.fragment,t),e=!0)},o(t){ct(n.$$.fragment,t),e=!1},d(t){yt(n,t)}}}function Kt(e){let n,o,i,r,c,l;return{c(){n=k("Delete Confirm Modal\n        "),o=x("div"),(i=x("button")).textContent="Yes",r=S(),(c=x("button")).textContent="No",N(i,"background-color","red"),z(i,"class","svelte-dfzaog"),z(c,"class","svelte-dfzaog"),z(o,"class","row-buttons svelte-dfzaog")},m(t,a,u){b(t,n,a),b(t,o,a),v(o,i),v(o,r),v(o,c),u&&s(l),l=[C(i,"click",e[7],{once:!0}),C(c,"click",e[16])]},p:t,d(t){t&&w(n),t&&w(o),s(l)}}}function Qt(t){let e,n,o,i,r,c,l,a,u,d,f,m,p,g,h,y,$=[],k=new Map,M=t[2];const N=t=>t[21];for(let e=0;e<M.length;e+=1){let n=Jt(t,M,e),o=N(n);k.set(o,$[e]=Ft(o,n))}let I=t[3]&&Yt(t),T=t[4]&&Gt(t);return{c(){e=x("div"),n=x("label"),o=x("input"),i=S(),r=x("input"),c=S();for(let t=0;t<$.length;t+=1)$[t].c();l=S(),a=x("div"),I&&I.c(),u=S(),(d=x("button")).textContent="Save",p=S(),T&&T.c(),g=_(),z(o,"type","text"),z(o,"name","name"),z(o,"autocomplete","off"),z(o,"maxlength","25"),z(o,"placeholder","The Container Name"),o.required=!0,z(o,"class","svelte-dfzaog"),z(r,"type","text"),z(r,"name","type"),z(r,"autocomplete","off"),z(r,"maxlength","32"),z(r,"placeholder","The Container Type"),r.required=!0,z(r,"class","svelte-dfzaog"),z(d,"name","save-container"),z(d,"class","svelte-dfzaog"),z(a,"class","buttons svelte-dfzaog"),z(n,"class","svelte-dfzaog"),z(e,"classname","create-new"),z(e,"class","svelte-dfzaog")},m(f,m,w){b(f,e,m),v(e,n),v(n,o),E(o,t[0]),v(n,i),v(n,r),E(r,t[1]),v(n,c);for(let t=0;t<$.length;t+=1)$[t].m(n,null);v(n,l),v(n,a),I&&I.m(a,null),v(a,u),v(a,d),b(f,p,m),T&&T.m(f,m),b(f,g,m),h=!0,w&&s(y),y=[C(o,"input",t[11]),C(r,"input",t[12]),C(d,"click",t[6],{once:!0})]},p(t,[e]){if(1&e&&o.value!==t[0]&&E(o,t[0]),2&e&&r.value!==t[1]&&E(r,t[1]),804&e){const o=t[2];it();for(let t=0;t<$.length;t+=1)$[t].r();$=pt($,e,N,1,t,o,k,n,mt,Ft,l,Jt);for(let t=0;t<$.length;t+=1)$[t].a();st()}t[3]?I?I.p(t,e):((I=Yt(t)).c(),I.m(a,u)):I&&(I.d(1),I=null),t[4]?T?(T.p(t,e),16&e&&rt(T,1)):((T=Gt(t)).c(),rt(T,1),T.m(g.parentNode,g)):T&&(it(),ct(T,1,1,()=>{T=null}),st())},i(t){if(!h){for(let t=0;t<M.length;t+=1)rt($[t]);G(()=>{m&&m.end(1),f||(f=at(e,Pt,{duration:1e3})),f.start()}),rt(T),h=!0}},o(t){for(let t=0;t<$.length;t+=1)ct($[t]);f&&f.invalidate(),m=ut(e,Pt,{duration:0}),ct(T),h=!1},d(t){t&&w(e);for(let t=0;t<$.length;t+=1)$[t].d();I&&I.d(),t&&m&&m.end(),t&&w(p),T&&T.d(t),t&&w(g),s(y)}}}function Ut(t,e,n){let{id:o=""}=e,{name:i=""}=e,{type:s=""}=e,{items:r=[["",!1]]}=e,{editt:c=!1}=e,l=!1,u="Start adding items to your container!";function d(t){""!==r[r.length-1]&&(n(2,r[r.length-1]=[t,!1],r),n(2,r=[...r,[""]]))}return t.$set=(t=>{"id"in t&&n(10,o=t.id),"name"in t&&n(0,i=t.name),"type"in t&&n(1,s=t.type),"items"in t&&n(2,r=t.items),"editt"in t&&n(3,c=t.editt)}),t.$$.update=(()=>{4&t.$$.dirty&&r.length>1&&n(5,u="And another one"),15&t.$$.dirty&&(console.log(i+":"+s+":"+r),kt({name:i,type:s,items:r},c?"tmpCont":"unSaved"),console.log("the last item is::::::::::::::::::::::",r.slice(-1)[1])),4&t.$$.dirty&&console.log(r.length+" items:"+r)}),[i,s,r,c,l,u,function(){i&&s&&r&&(n(2,r=r.filter(Boolean)),void 0===r.slice(-1)[1]&&n(2,r[r.length-1][1]=!1,r),Ht(i,s,r,o),console.log("handleSubmitted"),Tt("main"),n(3,c=!1))},function(){!function(t){let e=a(Mt).findIndex(e=>e.id===t),n=a(Mt);n.splice(e,1),Mt.update(()=>n),kt({id:"",name:"",type:"",items:[""]},"tmpCont"),kt(a(Mt),"myStuff")}(o),Tt("main")},d,function(t){console.log(t+" th item deleted"),n(2,r=r.filter((e,n)=>n!==t))},o,function(){i=this.value,n(0,i)},function(){s=this.value,n(1,s)},function(t){t[0]=this.value,n(2,r)},t=>d(t[0]),()=>n(4,l=!0),()=>n(4,l=!1),()=>n(4,l=!1),()=>n(4,l=!1)]}class Xt extends bt{constructor(t){super(),vt(this,t,Ut,Qt,c,{id:10,name:0,type:1,items:2,editt:3})}}function Zt(e){return{c:t,m:t,p:t,d:t}}function te(e){let n,o;return{c(){(n=x("button")).innerHTML='<div id="cross" class="svelte-kbhj1o"></div>',z(n,"id","menu-edit-create"),z(n,"name","new-list"),z(n,"class","svelte-kbhj1o")},m(t,i,s){b(t,n,i),s&&o(),o=C(n,"click",e[1])},p:t,d(t){t&&w(n),o()}}}function ee(e){let n;function o(t,e){return"newlist"===t[0]?te:"editlist"===t[0]?Zt:void 0}let i=o(e),s=i&&i(e);return{c(){s&&s.c(),n=_()},m(t,e){s&&s.m(t,e),b(t,n,e)},p(t,[e]){i===(i=o(t))&&s?s.p(t,e):(s&&s.d(1),(s=i&&i(t))&&(s.c(),s.m(n.parentNode,n)))},i:t,o:t,d(t){s&&s.d(t),t&&w(n)}}}function ne(t,e,n){let{button:o}=e;return t.$set=(t=>{"button"in t&&n(0,o=t.button)}),[o,()=>Tt(o)]}class oe extends bt{constructor(t){super(),vt(this,t,ne,ee,c,{button:0})}}function ie(t,e,n){const o=t.slice();return o[11]=e[n],o[13]=n,o}function se(t){let e,n,o,i,r,c,l,a,u,d,m,p,g,h,y,$,_,E=t[0],N=[];for(let e=0;e<E.length;e+=1)N[e]=re(ie(t,E,e));return{c(){e=x("div"),n=k("Type: "),o=k(t[4]),i=k(" |\n            "),r=k(t[6]),c=k(" Stuff here\n            "),l=x("ul");for(let t=0;t<N.length;t+=1)N[t].c();a=S(),u=x("div"),(d=x("button")).textContent="Edit",m=S(),p=x("div"),g=k("Interactive Mode"),z(l,"class","item-list svelte-1nt342u"),z(d,"class","edit-button svelte-1nt342u"),z(d,"name","edit-button"),z(p,"class",h=f(t[1]?"interactive-text-on":"interactive-text-off")+" svelte-1nt342u"),z(u,"class","options svelte-1nt342u"),z(e,"class","details svelte-1nt342u")},m(f,h,y){b(f,e,h),v(e,n),v(e,o),v(e,i),v(e,r),v(e,c),v(e,l);for(let t=0;t<N.length;t+=1)N[t].m(l,null);v(e,a),v(e,u),v(u,d),v(u,m),v(u,p),v(p,g),$=!0,y&&s(_),_=[C(d,"click",t[5]),C(p,"click",t[8])]},p(t,e){if((!$||16&e)&&M(o,t[4]),513&e){let n;for(E=t[0],n=0;n<E.length;n+=1){const o=ie(t,E,n);N[n]?N[n].p(o,e):(N[n]=re(o),N[n].c(),N[n].m(l,null))}for(;n<N.length;n+=1)N[n].d(1);N.length=E.length}(!$||2&e&&h!==(h=f(t[1]?"interactive-text-on":"interactive-text-off")+" svelte-1nt342u"))&&z(p,"class",h)},i(t){$||(G(()=>{y||(y=dt(e,Bt,{y:-10,duration:200},!0)),y.run(1)}),$=!0)},o(t){y||(y=dt(e,Bt,{y:-10,duration:200},!1)),y.run(0),$=!1},d(t){t&&w(e),function(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}(N,t),t&&y&&y.end(),s(_)}}}function re(t){let e,n,o,i,s=t[11][0]+"";return{c(){e=x("li"),n=k(s),z(e,"class",o=f(t[11][1]?"item-red":"item-not-red")+" svelte-1nt342u")},m(o,s,r){b(o,e,s),v(e,n),r&&i(),i=C(e,"click",t[9].bind(this,t[13]))},p(i,r){t=i,1&r&&s!==(s=t[11][0]+"")&&M(n,s),1&r&&o!==(o=f(t[11][1]?"item-red":"item-not-red")+" svelte-1nt342u")&&z(e,"class",o)},d(t){t&&w(e),i()}}}function ce(t){let e,n,o,i,s,r,c,l,a,u,d,m=!t[2]&&se(t);return{c(){e=x("div"),n=x("div"),o=k(t[3]),i=S(),s=x("hr"),r=S(),m&&m.c(),z(n,"id","name"),z(n,"class","svelte-1nt342u"),N(s,"width","90%"),N(s,"border-color","#e1e2e186"),z(e,"class",c=f(t[1]?"containersum containersum-on":"containersum containersum-off")+" svelte-1nt342u")},m(c,l,a){b(c,e,l),v(e,n),v(n,o),v(e,i),v(e,s),v(e,r),m&&m.m(e,null),u=!0,a&&d(),d=C(n,"click",t[7])},p(t,[n]){(!u||8&n)&&M(o,t[3]),t[2]?m&&(it(),ct(m,1,1,()=>{m=null}),st()):m?(m.p(t,n),4&n&&rt(m,1)):((m=se(t)).c(),rt(m,1),m.m(e,null)),(!u||2&n&&c!==(c=f(t[1]?"containersum containersum-on":"containersum containersum-off")+" svelte-1nt342u"))&&z(e,"class",c)},i(t){u||(rt(m),G(()=>{a&&a.end(1),l||(l=at(e,Pt,{duration:500})),l.start()}),u=!0)},o(t){ct(m),l&&l.invalidate(),a=ut(e,Pt,{duration:0}),u=!1},d(t){t&&w(e),m&&m.d(),t&&a&&a.end(),d()}}}function le(t,e,n){let{id:o=""}=e,{name:i="TestName"}=e,{type:s="TestType"}=e,{items:r=["sugar"]}=e,{interact:c=!1}=e,l=r.length,{isSum:a=!0}=e;return t.$set=(t=>{"id"in t&&n(10,o=t.id),"name"in t&&n(3,i=t.name),"type"in t&&n(4,s=t.type),"items"in t&&n(0,r=t.items),"interact"in t&&n(1,c=t.interact),"isSum"in t&&n(2,a=t.isSum)}),t.$$.update=(()=>{2&t.$$.dirty&&console.log("interaction is: ",c)}),[r,c,a,i,s,function(){!function(t,e,n,o){console.log("tmpContis: "+o),Et.set({name:t,type:e,items:n,id:o}),console.log(Et)}(i,s,r,o),Tt("editlist"),console.log("handleSubmitted by editCont")},l,function(){n(2,a=!a)},function(){n(1,c=!c),Ht(i,s,r,o,c)},function(t){c&&(n(0,r[t][1]=!r[t][1],r),Ht(i,s,r,o,c))},o]}class ae extends bt{constructor(t){super(),vt(this,t,le,ce,c,{id:10,name:3,type:4,items:0,interact:1,isSum:2,editHandle:5})}get editHandle(){return this.$$.ctx[5]}}function ue(t,e,n){const o=t.slice();return o[1]=e[n],o[3]=n,o}function de(t){let e;return{c(){(e=x("div")).innerHTML="<div>\n                Welcome to MyStuff! Start adding Containers to the app using the plus button so you\n                can keep track of stuff you have, even when you forgot the app remembers!\n            </div> \n            \n            <div>\n                This app saves all data to your local store so all your data is on your device.\n            </div> \n        ",z(e,"class","welcome svelte-lppm3v")},m(t,n){b(t,e,n)},d(t){t&&w(e)}}}function fe(t,e){let o,i;const s=[e[1]];let r={};for(let t=0;t<s.length;t+=1)r=n(r,s[t]);const c=new ae({props:r});return{key:t,first:null,c(){o=_(),gt(c.$$.fragment),this.first=o},m(t,e){b(t,o,e),ht(c,t,e),i=!0},p(t,e){const n=1&e?function(t,e){const n={},o={},i={$$scope:1};let s=t.length;for(;s--;){const r=t[s],c=e[s];if(c){for(const t in r)t in c||(o[t]=1);for(const t in c)i[t]||(n[t]=c[t],i[t]=1);t[s]=c}else for(const t in r)i[t]=1}for(const t in o)t in n||(n[t]=void 0);return n}(s,[(o=t[1],"object"==typeof o&&null!==o?o:{})]):{};var o;c.$set(n)},i(t){i||(rt(c.$$.fragment,t),i=!0)},o(t){ct(c.$$.fragment,t),i=!1},d(t){t&&w(o),yt(c,t)}}}function me(t){let e,n,o=[],i=new Map,s=t[0];const r=t=>t[1].id;for(let e=0;e<s.length;e+=1){let n=ue(t,s,e),c=r(n);i.set(c,o[e]=fe(c,n))}let c=null;return s.length||(c=de()),{c(){for(let t=0;t<o.length;t+=1)o[t].c();e=_(),c&&c.c()},m(t,i){for(let e=0;e<o.length;e+=1)o[e].m(t,i);b(t,e,i),c&&c.m(t,i),n=!0},p(t,[n]){if(1&n){const s=t[0];it(),o=pt(o,n,r,1,t,s,i,e.parentNode,ft,fe,e,ue),st(),s.length?c&&(c.d(1),c=null):c||((c=de()).c(),c.m(e.parentNode,e))}},i(t){if(!n){for(let t=0;t<s.length;t+=1)rt(o[t]);n=!0}},o(t){for(let t=0;t<o.length;t+=1)ct(o[t]);n=!1},d(t){for(let e=0;e<o.length;e+=1)o[e].d(t);t&&w(e),c&&c.d(t)}}}function pe(t,e,n){let o;return u(t,Mt,t=>n(0,o=t)),[o]}class ge extends bt{constructor(t){super(),vt(this,t,pe,me,c,{})}}function he(t){let e,n,o,i,s,r,c,l,a;const u=new ge({}),d=new oe({props:{button:"newlist"}});return{c(){e=k("width:"),n=k(t[0]),o=k(" height:"),i=k(t[1]),s=k(" ratio: "),r=k(t[2]),c=S(),gt(u.$$.fragment),l=S(),gt(d.$$.fragment)},m(t,f){b(t,e,f),b(t,n,f),b(t,o,f),b(t,i,f),b(t,s,f),b(t,r,f),b(t,c,f),ht(u,t,f),b(t,l,f),ht(d,t,f),a=!0},p(t,e){(!a||1&e)&&M(n,t[0]),(!a||2&e)&&M(i,t[1]),(!a||4&e)&&M(r,t[2])},i(t){a||(rt(u.$$.fragment,t),rt(d.$$.fragment,t),a=!0)},o(t){ct(u.$$.fragment,t),ct(d.$$.fragment,t),a=!1},d(t){t&&w(e),t&&w(n),t&&w(o),t&&w(i),t&&w(s),t&&w(r),t&&w(c),yt(u,t),t&&w(l),yt(d,t)}}}function ye(t){let e;const n=new Xt({props:{name:t[5].name,type:t[5].type,items:t[5].items,id:t[5].id,editt:!0}});return{c(){gt(n.$$.fragment)},m(t,o){ht(n,t,o),e=!0},p(t,e){const o={};32&e&&(o.name=t[5].name),32&e&&(o.type=t[5].type),32&e&&(o.items=t[5].items),32&e&&(o.id=t[5].id),n.$set(o)},i(t){e||(rt(n.$$.fragment,t),e=!0)},o(t){ct(n.$$.fragment,t),e=!1},d(t){yt(n,t)}}}function $e(t){let e;const n=new Xt({props:{name:t[4].name,type:t[4].type,items:t[4].items,editt:!1}});return{c(){gt(n.$$.fragment)},m(t,o){ht(n,t,o),e=!0},p(t,e){const o={};16&e&&(o.name=t[4].name),16&e&&(o.type=t[4].type),16&e&&(o.items=t[4].items),n.$set(o)},i(t){e||(rt(n.$$.fragment,t),e=!0)},o(t){ct(n.$$.fragment,t),e=!1},d(t){yt(n,t)}}}function ve(t){let e,n,o,i;const s=[$e,ye,he],r=[];function c(t,e){return"newlist"===t[3]?0:"editlist"===t[3]?1:2}return e=c(t),n=r[e]=s[e](t),{c(){n.c(),o=_()},m(t,n){r[e].m(t,n),b(t,o,n),i=!0},p(t,[i]){let l=e;(e=c(t))===l?r[e].p(t,i):(it(),ct(r[l],1,1,()=>{r[l]=null}),st(),(n=r[e])||(n=r[e]=s[e](t)).c(),rt(n,1),n.m(o.parentNode,o))},i(t){i||(rt(n),i=!0)},o(t){ct(n),i=!1},d(t){r[e].d(t),t&&w(o)}}}function be(t,e,n){let o,i,s;u(t,zt,t=>n(3,o=t)),u(t,Nt,t=>n(4,i=t)),u(t,Et,t=>n(5,s=t));let r,{w:c}=e,{h:l}=e;return t.$set=(t=>{"w"in t&&n(0,c=t.w),"h"in t&&n(1,l=t.h)}),t.$$.update=(()=>{8&t.$$.dirty&&console.log("Current page is: "+o),3&t.$$.dirty&&n(2,r=(c/l).toFixed(2))}),[c,l,r,o,i,s]}class we extends bt{constructor(t){super(),vt(this,t,be,ve,c,{w:0,h:1})}}function xe(t){let e,n,o,i;const s=new Ot({}),r=new we({props:{w:t[0],h:t[1]}});return{c(){e=x("main"),gt(s.$$.fragment),n=S(),gt(r.$$.fragment),z(e,"alt","Main Page"),z(e,"class","svelte-10d9n07"),G(()=>t[2].call(e))},m(c,l){b(c,e,l),ht(s,e,null),v(e,n),ht(r,e,null),o=T(e,t[2].bind(e)),i=!0},p(t,[e]){const n={};1&e&&(n.w=t[0]),2&e&&(n.h=t[1]),r.$set(n)},i(t){i||(rt(s.$$.fragment,t),rt(r.$$.fragment,t),i=!0)},o(t){ct(s.$$.fragment,t),ct(r.$$.fragment,t),i=!1},d(t){t&&w(e),yt(s),yt(r),o()}}}function ke(t,e,n){let o,i;return It(),t.$$.update=(()=>{3&t.$$.dirty&&console.log("main w and h: ",o," ",i)}),[o,i,function(){o=this.clientWidth,i=this.clientHeight,n(0,o),n(1,i)}]}return"serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("serviceWorker.js").then(t=>console.log("service worker registered")).catch(t=>console.log("service worker not registered",t))}),new class extends bt{constructor(t){super(),vt(this,t,ke,xe,c,{})}}({target:document.body,props:{}})}();
//# sourceMappingURL=bundle.js.map
