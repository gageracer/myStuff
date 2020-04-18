var app=function(){"use strict";function t(){}const e=t=>t;function n(t,e){for(const n in e)t[n]=e[n];return t}function o(t){return t()}function i(){return Object.create(null)}function r(t){t.forEach(o)}function s(t){return"function"==typeof t}function l(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function c(t,e){const n=t.subscribe(e);return n.unsubscribe?()=>n.unsubscribe():n}function a(t){let e;return c(t,t=>e=t)(),e}function u(t,e,n){t.$$.on_destroy.push(c(e,n))}function d(t,e,o){return t[1]?n({},n(e.$$scope.ctx,t[1](o?o(e):{}))):e.$$scope.ctx}const f="undefined"!=typeof window;let m=f?()=>window.performance.now():()=>Date.now(),p=f?t=>requestAnimationFrame(t):t;const h=new Set;let $,g=!1;function y(){h.forEach(t=>{t[0](m())||(h.delete(t),t[1]())}),(g=h.size>0)&&p(y)}function v(t){let e;return g||(g=!0,p(y)),{promise:new Promise(n=>{h.add(e=[t,n])}),abort(){h.delete(e)}}}function b(t,e){t.appendChild(e)}function w(t,e,n){t.insertBefore(e,n||null)}function _(t){t.parentNode.removeChild(t)}function S(t){return document.createElement(t)}function k(t){return document.createTextNode(t)}function C(){return k(" ")}function x(){return k("")}function M(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function E(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function N(t,e){e=""+e,t.data!==e&&(t.data=e)}function I(t,e){(null!=e||t.value)&&(t.value=e)}function T(t,e,n,o){t.style.setProperty(e,n,o?"important":"")}function O(t,e){const n=document.createEvent("CustomEvent");return n.initCustomEvent(t,!1,!1,e),n}let j,A=0,H={};function z(t,e,n,o,i,r,s,l=0){const c=16.666/o;let a="{\n";for(let t=0;t<=1;t+=c){const o=e+(n-e)*r(t);a+=100*t+`%{${s(o,1-o)}}\n`}const u=a+`100% {${s(n,1-n)}}\n}`,d=`__svelte_${function(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}(u)}_${l}`;if(!H[d]){if(!$){const t=S("style");document.head.appendChild(t),$=t.sheet}H[d]=!0,$.insertRule(`@keyframes ${d} ${u}`,$.cssRules.length)}const f=t.style.animation||"";return t.style.animation=`${f?`${f}, `:""}${d} ${o}ms linear ${i}ms 1 both`,A+=1,d}function L(t,e){t.style.animation=(t.style.animation||"").split(", ").filter(e?t=>t.indexOf(e)<0:t=>-1===t.indexOf("__svelte")).join(", "),e&&!--A&&p(()=>{if(A)return;let t=$.cssRules.length;for(;t--;)$.deleteRule(t);H={}})}function R(t,e){const n=t.getBoundingClientRect();if(e.left!==n.left||e.top!==n.top){const o=getComputedStyle(t),i="none"===o.transform?"":o.transform;t.style.transform=`${i} translate(${e.left-n.left}px, ${e.top-n.top}px)`}}function q(t){j=t}const B=[],P=[],J=[],D=[],F=Promise.resolve();let W,V=!1;function Y(t){J.push(t)}function G(){const t=new Set;do{for(;B.length;){const t=B.shift();q(t),K(t.$$)}for(;P.length;)P.pop()();for(let e=0;e<J.length;e+=1){const n=J[e];t.has(n)||(n(),t.add(n))}J.length=0}while(B.length);for(;D.length;)D.pop()();V=!1}function K(t){t.fragment&&(t.update(t.dirty),r(t.before_update),t.fragment.p(t.dirty,t.ctx),t.dirty=null,t.after_update.forEach(Y))}function Q(){return W||(W=Promise.resolve()).then(()=>{W=null}),W}function U(t,e,n){t.dispatchEvent(O(`${e?"intro":"outro"}${n}`))}const X=new Set;let Z;function tt(){Z={r:0,c:[],p:Z}}function et(){Z.r||r(Z.c),Z=Z.p}function nt(t,e){t&&t.i&&(X.delete(t),t.i(e))}function ot(t,e,n,o){if(t&&t.o){if(X.has(t))return;X.add(t),Z.c.push(()=>{X.delete(t),o&&(n&&t.d(1),o())}),t.o(e)}}const it={duration:0};function rt(n,o,i){let r,l,c=o(n,i),a=!1,u=0;function d(){r&&L(n,r)}function f(){const{delay:o=0,duration:i=300,easing:s=e,tick:f=t,css:p}=c||it;p&&(r=z(n,0,1,i,o,s,p,u++)),f(0,1);const h=m()+o,$=h+i;l&&l.abort(),a=!0,Y(()=>U(n,!0,"start")),l=v(t=>{if(a){if(t>=$)return f(1,0),U(n,!0,"end"),d(),a=!1;if(t>=h){const e=s((t-h)/i);f(e,1-e)}}return a})}let p=!1;return{start(){p||(L(n),s(c)?(c=c(),Q().then(f)):f())},invalidate(){p=!1},end(){a&&(d(),a=!1)}}}function st(n,o,i){let l,c=o(n,i),a=!0;const u=Z;function d(){const{delay:o=0,duration:i=300,easing:s=e,tick:d=t,css:f}=c||it;f&&(l=z(n,1,0,i,o,s,f));const p=m()+o,h=p+i;Y(()=>U(n,!1,"start")),v(t=>{if(a){if(t>=h)return d(0,1),U(n,!1,"end"),--u.r||r(u.c),!1;if(t>=p){const e=s((t-p)/i);d(1-e,e)}}return a})}return u.r+=1,s(c)?Q().then(()=>{c=c(),d()}):d(),{end(t){t&&c.tick&&c.tick(1,0),a&&(l&&L(n,l),a=!1)}}}function lt(n,o,i,l){let c=o(n,i),a=l?0:1,u=null,d=null,f=null;function p(){f&&L(n,f)}function h(t,e){const n=t.b-a;return e*=Math.abs(n),{a:a,b:t.b,d:n,duration:e,start:t.start,end:t.start+e,group:t.group}}function $(o){const{delay:i=0,duration:s=300,easing:l=e,tick:$=t,css:g}=c||it,y={start:m()+i,b:o};o||(y.group=Z,Z.r+=1),u?d=y:(g&&(p(),f=z(n,a,o,s,i,l,g)),o&&$(0,1),u=h(y,s),Y(()=>U(n,o,"start")),v(t=>{if(d&&t>d.start&&(u=h(d,s),d=null,U(n,u.b,"start"),g&&(p(),f=z(n,a,u.b,u.duration,0,l,c.css))),u)if(t>=u.end)$(a=u.b,1-a),U(n,u.b,"end"),d||(u.b?p():--u.group.r||r(u.group.c)),u=null;else if(t>=u.start){const e=t-u.start;a=u.a+u.d*l(e/u.duration),$(a,1-a)}return!(!u&&!d)}))}return{run(t){s(c)?Q().then(()=>{c=c(),$(t)}):$(t)},end(){p(),u=d=null}}}function ct(t,e){ot(t,1,1,()=>{e.delete(t.key)})}function at(t,e){t.f(),ct(t,e)}function ut(t,e,n,o,i,r,s,l,c,a,u,d){let f=t.length,m=r.length,p=f;const h={};for(;p--;)h[t[p].key]=p;const $=[],g=new Map,y=new Map;for(p=m;p--;){const t=d(i,r,p),l=n(t);let c=s.get(l);c?o&&c.p(e,t):(c=a(l,t)).c(),g.set(l,$[p]=c),l in h&&y.set(l,Math.abs(p-h[l]))}const v=new Set,b=new Set;function w(t){nt(t,1),t.m(l,u),s.set(t.key,t),u=t.first,m--}for(;f&&m;){const e=$[m-1],n=t[f-1],o=e.key,i=n.key;e===n?(u=e.first,f--,m--):g.has(i)?!s.has(o)||v.has(o)?w(e):b.has(i)?f--:y.get(o)>y.get(i)?(b.add(o),w(e)):(v.add(i),f--):(c(n,s),f--)}for(;f--;){const e=t[f];g.has(e.key)||c(e,s)}for(;m;)w($[m-1]);return $}function dt(t,e,n){const{fragment:i,on_mount:l,on_destroy:c,after_update:a}=t.$$;i.m(e,n),Y(()=>{const e=l.map(o).filter(s);c?c.push(...e):r(e),t.$$.on_mount=[]}),a.forEach(Y)}function ft(t,e){t.$$.fragment&&(r(t.$$.on_destroy),t.$$.fragment.d(e),t.$$.on_destroy=t.$$.fragment=null,t.$$.ctx={})}function mt(t,e){t.$$.dirty||(B.push(t),V||(V=!0,F.then(G)),t.$$.dirty=i()),t.$$.dirty[e]=!0}function pt(e,n,o,s,l,c){const a=j;q(e);const u=n.props||{},d=e.$$={fragment:null,ctx:null,props:c,update:t,not_equal:l,bound:i(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(a?a.$$.context:[]),callbacks:i(),dirty:null};let f=!1;var m;d.ctx=o?o(e,u,(t,n,o=n)=>(d.ctx&&l(d.ctx[t],d.ctx[t]=o)&&(d.bound[t]&&d.bound[t](o),f&&mt(e,t)),n)):u,d.update(),f=!0,r(d.before_update),d.fragment=s(d.ctx),n.target&&(n.hydrate?d.fragment.l((m=n.target,Array.from(m.childNodes))):d.fragment.c(),n.intro&&nt(e.$$.fragment),dt(e,n.target,n.anchor),G()),q(a)}class ht{$destroy(){ft(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}}const $t=[];function gt(e,n=t){let o;const i=[];function r(t){if(l(e,t)&&(e=t,o)){const t=!$t.length;for(let t=0;t<i.length;t+=1){const n=i[t];n[1](),$t.push(n,e)}if(t){for(let t=0;t<$t.length;t+=2)$t[t][0]($t[t+1]);$t.length=0}}}return{set:r,update:function(t){r(t(e))},subscribe:function(s,l=t){const c=[s,l];return i.push(c),1===i.length&&(o=n(r)||t),s(e),()=>{const t=i.indexOf(c);-1!==t&&i.splice(t,1),0===i.length&&(o(),o=null)}}}}const yt=gt("main"),vt=gt([]),bt=gt({id:"",name:"",type:"",items:[""]}),wt=gt({id:"",name:"",type:"",items:[""]}),_t={subscribe:gt("0.417d",St).subscribe};var St;function kt(){var t;vt.set(Mt("myStuff")),yt.set((t="lastPage",localStorage.getItem(t)?JSON.parse(localStorage.getItem(t)):"main")),wt.set(Mt("unSaved")),bt.set(Mt("tmpCont"))}function Ct(t){var e;if(e=t,console.log(e),localStorage.setItem("lastPage",JSON.stringify(e)),"main"===t)return yt.set("main"),void kt();"newlist"!==t?"editlist"!==t?yt.set("newlist"):yt.set("editlist"):yt.set("newlist")}function xt(t,e){console.log(t),localStorage.setItem(e,JSON.stringify(t))}function Mt(t){return localStorage.getItem(t)?JSON.parse(localStorage.getItem(t)):"myStuff"===t?new Array:"unSaved"===t?{id:"",name:"",type:"",items:[""]}:"tmpCont"===t?{id:"",name:"",type:"",items:[""]}:void 0}function Et(e){var n,o,i,r,s;return{c(){n=S("button"),o=k("My_Stuff "),i=S("span"),r=k(e.$version),T(i,"font-size","1rem"),T(i,"color","gray"),E(n,"id","main_link"),E(n,"class","svelte-1mvd3j6"),s=M(n,"click",e.click_handler)},m(t,e){w(t,n,e),b(n,o),b(n,i),b(i,r)},p(t,e){t.$version&&N(r,e.$version)},i:t,o:t,d(t){t&&_(n),s()}}}function Nt(t,e,n){let o;u(t,_t,t=>{n("$version",o=t)});return{$version:o,click_handler:()=>Ct("main")}}class It extends ht{constructor(t){super(),pt(this,t,Nt,Et,l,[])}}function Tt(t){var e,o,i,r,s,l,c,a,u;const f=t.$$slots.default,m=function(t,e,n){if(t){const o=d(t,e,n);return t[0](o)}}(f,t,null);return{c(){e=S("div"),o=C(),i=S("div"),r=k(t.content),s=C(),m||((l=S("button")).textContent="Close"),m&&m.c(),E(e,"class","modal-bg svelte-1df7d0c"),m||(c=M(l,"click",t.click_handler_1)),E(i,"class","modal svelte-1df7d0c"),u=M(e,"click",t.click_handler)},l(t){m&&m.l(div1_nodes)},m(t,n){w(t,e,n),w(t,o,n),w(t,i,n),b(i,r),b(i,s),m?m.m(i,null):b(i,l),a=!0},p(t,e){a&&!t.content||N(r,e.content),m&&m.p&&t.$$scope&&m.p(function(t,e,o,i){return t[1]?n({},n(e.$$scope.changed||{},t[1](i?i(o):{}))):e.$$scope.changed||{}}(f,e,t,null),d(f,e,null))},i(t){a||(nt(m,t),a=!0)},o(t){ot(m,t),a=!1},d(t){t&&(_(e),_(o),_(i)),m||c(),m&&m.d(t),u()}}}function Ot(t,e,n){const o=function(){const t=j;return(e,n)=>{const o=t.$$.callbacks[e];if(o){const i=O(e,n);o.slice().forEach(e=>{e.call(t,i)})}}}();let{content:i}=e,{$$slots:r={},$$scope:s}=e;return t.$set=(t=>{"content"in t&&n("content",i=t.content),"$$scope"in t&&n("$$scope",s=t.$$scope)}),{dispatch:o,content:i,click_handler:()=>o("cancel"),click_handler_1:()=>o("close"),$$slots:r,$$scope:s}}class jt extends ht{constructor(t){super(),pt(this,t,Ot,Tt,l,["content"])}}function At(t){const e=t-1;return e*e*e+1}function Ht(t,{delay:e=0,duration:n=400}){const o=+getComputedStyle(t).opacity;return{delay:e,duration:n,css:t=>`opacity: ${t*o}`}}function zt(t,{delay:e=0,duration:n=400,easing:o=At,x:i=0,y:r=0,opacity:s=0}){const l=getComputedStyle(t),c=+l.opacity,a="none"===l.transform?"":l.transform,u=c*(1-s);return{delay:e,duration:n,easing:o,css:(t,e)=>`\n\t\t\ttransform: ${a} translate(${(1-t)*i}px, ${(1-t)*r}px);\n\t\t\topacity: ${c-u*e}`}}function Lt(t,e,n){const o=getComputedStyle(t),i="none"===o.transform?"":o.transform,r=e.from.left-e.to.left,l=e.from.top-e.to.top,c=Math.sqrt(r*r+l*l),{delay:a=0,duration:u=(t=>120*Math.sqrt(t)),easing:d=At}=n;return{delay:a,duration:s(u)?u(c):u,easing:d,css:(t,e)=>`transform: ${i} translate(${e*r}px, ${e*l}px);`}}function Rt(t,e,n){const o=Object.create(t);return o.item=e[n],o.each_value=e,o.i=n,o}function qt(t){var e,n;return{c(){(e=S("button")).innerHTML='<div class="minus svelte-1dl0tfe"></div>',E(e,"class","svelte-1dl0tfe"),n=M(e,"click",t.remItem.bind(this,t.i))},m(t,n){w(t,e,n)},p(e,n){t=n},d(t){t&&_(e),n()}}}function Bt(n,o){var i,s,l,c,a,u,d,f,p,h=t;function $(){o.input_input_handler.call(s,o)}var g=0!=o.i&&qt(o);function y(){return o.click_handler(o)}return{key:n,first:null,c(){i=S("div"),s=S("input"),l=C(),g&&g.c(),c=C(),(a=S("button")).innerHTML='<div class="cross svelte-1dl0tfe"></div>',E(s,"type","text"),E(s,"name","tmpitems"),E(s,"autocomplete","off"),E(s,"maxlength","48"),E(s,"placeholder",o.inputMsg),s.required=!0,E(s,"class","svelte-1dl0tfe"),E(a,"class","svelte-1dl0tfe"),E(i,"class","itemslist svelte-1dl0tfe"),p=[M(s,"input",$),M(a,"click",y)],this.first=i},m(t,e){w(t,i,e),b(i,s),I(s,o.item),b(i,l),g&&g.m(i,null),b(i,c),b(i,a),f=!0},p(t,e){o=e,t.items&&s.value!==o.item&&I(s,o.item),f&&!t.inputMsg||E(s,"placeholder",o.inputMsg),0!=o.i?g?g.p(t,o):((g=qt(o)).c(),g.m(i,c)):g&&(g.d(1),g=null)},r(){d=i.getBoundingClientRect()},f(){!function(t){const e=getComputedStyle(t);if("absolute"!==e.position&&"fixed"!==e.position){const{width:n,height:o}=e,i=t.getBoundingClientRect();t.style.position="absolute",t.style.width=n,t.style.height=o,R(t,i)}}(i),h(),R(i,d)},a(){h(),h=function(n,o,i,r){if(!o)return t;const s=n.getBoundingClientRect();if(o.left===s.left&&o.right===s.right&&o.top===s.top&&o.bottom===s.bottom)return t;const{delay:l=0,duration:c=300,easing:a=e,start:u=m()+l,end:d=u+c,tick:f=t,css:p}=i(n,{from:o,to:s},r);let h,$=!0,g=!1;function y(){p&&L(n,h),$=!1}return v(t=>{if(!g&&t>=u&&(g=!0),g&&t>=d&&(f(1,0),y()),!$)return!1;if(g){const e=0+1*a((t-u)/c);f(e,1-e)}return!0}),p&&(h=z(n,0,1,c,l,a,p)),l||(g=!0),f(0,1),y}(i,d,Lt,{key:o.i})},i(t){f||(Y(()=>{u||(u=lt(i,Ht,{key:o.i},!0)),u.run(1)}),f=!0)},o(t){u||(u=lt(i,Ht,{key:o.i},!1)),u.run(0),f=!1},d(t){t&&_(i),g&&g.d(),t&&u&&u.end(),r(p)}}}function Pt(t){var e,n;return{c(){(e=S("button")).textContent="Delete",T(e,"color","red"),T(e,"background-color","#f5f5f6"),E(e,"class","svelte-1dl0tfe"),n=M(e,"click",t.click_handler_1)},m(t,n){w(t,e,n)},d(t){t&&_(e),n()}}}function Jt(t){var e,n=new jt({props:{content:"Are you sure you wanna delete this container?",$$slots:{default:[Dt]},$$scope:{ctx:t}}});return n.$on("cancel",t.cancel_handler),n.$on("close",t.close_handler),{c(){n.$$.fragment.c()},m(t,o){dt(n,t,o),e=!0},i(t){e||(nt(n.$$.fragment,t),e=!0)},o(t){ot(n.$$.fragment,t),e=!1},d(t){ft(n,t)}}}function Dt(e){var n,o,i,s,l;return{c(){n=S("div"),(o=S("button")).textContent="Yes",i=C(),(s=S("button")).textContent="No",T(o,"background-color","red"),E(o,"class","svelte-1dl0tfe"),E(s,"class","svelte-1dl0tfe"),E(n,"class","row-buttons svelte-1dl0tfe"),l=[M(o,"click",e.deleteSubmit,{once:!0}),M(s,"click",e.click_handler_2)]},m(t,e){w(t,n,e),b(n,o),b(n,i),b(n,s)},p:t,d(t){t&&_(n),r(l)}}}function Ft(t){var e,n,o,i,s,l,c,a,u,d,f,m,p,h,$,g,y=[],v=new Map;let k=t.items;const N=t=>t.i;for(let e=0;e<k.length;e+=1){let n=Rt(t,k,e),o=N(n);v.set(o,y[e]=Bt(o,n))}var T=t.editt&&Pt(t),O=t.delModal&&Jt(t);return{c(){e=S("div"),n=S("label"),o=S("input"),i=C(),s=S("input"),l=C();for(let t=0;t<y.length;t+=1)y[t].c();c=C(),a=S("div"),T&&T.c(),u=C(),(d=S("button")).textContent="Save",p=C(),O&&O.c(),h=x(),E(o,"type","text"),E(o,"name","name"),E(o,"autocomplete","off"),E(o,"maxlength","25"),E(o,"placeholder","The Container Name"),o.required=!0,E(o,"class","svelte-1dl0tfe"),E(s,"type","text"),E(s,"name","type"),E(s,"autocomplete","off"),E(s,"maxlength","32"),E(s,"placeholder","The Container Type"),s.required=!0,E(s,"class","svelte-1dl0tfe"),E(d,"class","svelte-1dl0tfe"),E(a,"class","buttons svelte-1dl0tfe"),E(n,"class","svelte-1dl0tfe"),E(e,"classname","create-new"),E(e,"class","svelte-1dl0tfe"),g=[M(o,"input",t.input0_input_handler),M(s,"input",t.input1_input_handler),M(d,"click",t.handleSubmit,{once:!0})]},m(r,f){w(r,e,f),b(e,n),b(n,o),I(o,t.name),b(n,i),b(n,s),I(s,t.type),b(n,l);for(let t=0;t<y.length;t+=1)y[t].m(n,null);b(n,c),b(n,a),T&&T.m(a,null),b(a,u),b(a,d),w(r,p,f),O&&O.m(r,f),w(r,h,f),$=!0},p(t,e){t.name&&o.value!==e.name&&I(o,e.name),t.type&&s.value!==e.type&&I(s,e.type);const i=e.items;tt();for(let t=0;t<y.length;t+=1)y[t].r();y=ut(y,t,N,1,e,i,v,n,at,Bt,c,Rt);for(let t=0;t<y.length;t+=1)y[t].a();et(),e.editt?T||((T=Pt(e)).c(),T.m(a,u)):T&&(T.d(1),T=null),e.delModal?O?nt(O,1):((O=Jt(e)).c(),nt(O,1),O.m(h.parentNode,h)):O&&(tt(),ot(O,1,1,()=>{O=null}),et())},i(t){if(!$){for(let t=0;t<k.length;t+=1)nt(y[t]);Y(()=>{m&&m.end(1),f||(f=rt(e,Ht,{duration:1e3})),f.start()}),nt(O),$=!0}},o(t){for(let t=0;t<y.length;t+=1)ot(y[t]);f&&f.invalidate(),m=st(e,Ht,{duration:0}),ot(O),$=!1},d(t){t&&_(e);for(let t=0;t<y.length;t+=1)y[t].d();T&&T.d(),t&&(m&&m.end(),_(p)),O&&O.d(t),t&&_(h),r(g)}}}function Wt(t,e,n){let{id:o="",name:i="",type:r="",items:s=[""],editt:l=!1}=e,c=!1,u="Start adding items to your container!";function d(t){""!==s[s.length-1]&&(n("items",s[s.length-1]=t,s),n("items",s=[...s,""]))}return t.$set=(t=>{"id"in t&&n("id",o=t.id),"name"in t&&n("name",i=t.name),"type"in t&&n("type",r=t.type),"items"in t&&n("items",s=t.items),"editt"in t&&n("editt",l=t.editt)}),t.$$.update=((t={items:1,name:1,type:1,editt:1})=>{t.items&&s.length>1&&n("inputMsg",u="And another one"),(t.name||t.type||t.items||t.editt)&&(console.log(i+":"+r+":"+s),xt({name:i,type:r,items:s},l?"tmpCont":"unSaved")),t.items&&console.log(s.length+" items:"+s)}),{id:o,name:i,type:r,items:s,editt:l,delModal:c,inputMsg:u,handleSubmit:function(){i&&r&&s&&(n("items",s=s.filter(Boolean)),function(t,e,n,o=""){if(""==o)console.log("I am Creating new one"),vt.update(o=>[...o,{id:o.length+Math.random(),name:t,type:e,items:n}]),xt({id:"",name:"",type:"",items:[""]},"unSaved");else{let i=a(vt).findIndex(t=>t.id===o),r=a(vt);r.splice(i,1,{id:o,name:t,type:e,items:n}),vt.update(()=>r),xt({id:"",name:"",type:"",items:[""]},"tmpCont")}xt(a(vt),"myStuff")}(i,r,s,o),console.log("handleSubmitted"),Ct("main"))},deleteSubmit:function(){!function(t){let e=a(vt).findIndex(e=>e.id===t),n=a(vt);n.splice(e,1),vt.update(()=>n),xt({id:"",name:"",type:"",items:[""]},"tmpCont"),xt(a(vt),"myStuff")}(o),Ct("main")},newItem:d,remItem:function(t){console.log(t+" th item deleted"),n("items",s=s.filter((e,n)=>n!==t))},input0_input_handler:function(){i=this.value,n("name",i)},input1_input_handler:function(){r=this.value,n("type",r)},input_input_handler:function({item:t,each_value:e,i:o}){e[o]=this.value,n("items",s)},click_handler:({item:t})=>d(t),click_handler_1:()=>n("delModal",c=!0),click_handler_2:()=>n("delModal",c=!1),cancel_handler:()=>n("delModal",c=!1),close_handler:()=>n("delModal",c=!1)}}class Vt extends ht{constructor(t){super(),pt(this,t,Wt,Ft,l,["id","name","type","items","editt"])}}function Yt(e){return{c:t,m:t,d:t}}function Gt(t){var e,n;return{c(){(e=S("button")).innerHTML='<div id="cross" class="svelte-kbhj1o"></div>',E(e,"id","menu-edit-create"),E(e,"class","svelte-kbhj1o"),n=M(e,"click",t.click_handler)},m(t,n){w(t,e,n)},d(t){t&&_(e),n()}}}function Kt(e){var n;function o(t,e){return"newlist"===e.button?Gt:"editlist"===e.button?Yt:void 0}var i=o(0,e),r=i&&i(e);return{c(){r&&r.c(),n=x()},m(t,e){r&&r.m(t,e),w(t,n,e)},p(t,e){i!==(i=o(0,e))&&(r&&r.d(1),(r=i&&i(e))&&(r.c(),r.m(n.parentNode,n)))},i:t,o:t,d(t){r&&r.d(t),t&&_(n)}}}function Qt(t,e,n){let{button:o}=e;return t.$set=(t=>{"button"in t&&n("button",o=t.button)}),{button:o,click_handler:()=>Ct(o)}}class Ut extends ht{constructor(t){super(),pt(this,t,Qt,Kt,l,["button"])}}function Xt(t,e,n){const o=Object.create(t);return o.item=e[n],o.i=n,o}function Zt(t){var e,n,o,i,r,s,l,c,a,u,d,f;let m=t.items,p=[];for(let e=0;e<m.length;e+=1)p[e]=te(Xt(t,m,e));return{c(){e=S("div"),n=k("Type: "),o=k(t.type),i=k(" |\n            "),r=k(t.itemsnum),s=k(" Stuff here\n            "),l=S("ul");for(let t=0;t<p.length;t+=1)p[t].c();c=C(),(a=S("button")).textContent="Edit",E(l,"class","item-list svelte-11u0fu2"),E(a,"class","edit-button svelte-11u0fu2"),E(e,"class","details svelte-11u0fu2"),f=M(a,"click",t.editHandle)},m(t,u){w(t,e,u),b(e,n),b(e,o),b(e,i),b(e,r),b(e,s),b(e,l);for(let t=0;t<p.length;t+=1)p[t].m(l,null);b(e,c),b(e,a),d=!0},p(t,e){if(d&&!t.type||N(o,e.type),t.items){let n;for(m=e.items,n=0;n<m.length;n+=1){const o=Xt(e,m,n);p[n]?p[n].p(t,o):(p[n]=te(o),p[n].c(),p[n].m(l,null))}for(;n<p.length;n+=1)p[n].d(1);p.length=m.length}},i(t){d||(Y(()=>{u||(u=lt(e,zt,{y:-10,duration:200},!0)),u.run(1)}),d=!0)},o(t){u||(u=lt(e,zt,{y:-10,duration:200},!1)),u.run(0),d=!1},d(t){t&&_(e),function(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}(p,t),t&&u&&u.end(),f()}}}function te(t){var e,n,o=t.item+"";return{c(){e=S("li"),n=k(o)},m(t,o){w(t,e,o),b(e,n)},p(t,e){t.items&&o!==(o=e.item+"")&&N(n,o)},d(t){t&&_(e)}}}function ee(t){var e,n,o,i,r,s,l,c,a,u,d=!t.isSum&&Zt(t);return{c(){e=S("div"),n=S("div"),o=k(t.name),i=C(),r=S("hr"),s=C(),d&&d.c(),E(n,"id","name"),E(n,"class","svelte-11u0fu2"),T(r,"width","90%"),T(r,"border-color","#e1e2e186"),E(e,"class","containersum svelte-11u0fu2"),u=M(e,"click",t.details)},m(t,l){w(t,e,l),b(e,n),b(n,o),b(e,i),b(e,r),b(e,s),d&&d.m(e,null),a=!0},p(t,n){a&&!t.name||N(o,n.name),n.isSum?d&&(tt(),ot(d,1,1,()=>{d=null}),et()):d?(d.p(t,n),nt(d,1)):((d=Zt(n)).c(),nt(d,1),d.m(e,null))},i(t){a||(nt(d),Y(()=>{c&&c.end(1),l||(l=rt(e,Ht,{duration:500})),l.start()}),a=!0)},o(t){ot(d),l&&l.invalidate(),c=st(e,Ht,{duration:0}),a=!1},d(t){t&&_(e),d&&d.d(),t&&c&&c.end(),u()}}}function ne(t,e,n){let{id:o="",name:i="TestName",type:r="TestType",items:s=["sugar"]}=e,l=s.length,{isSum:c=!0}=e;return t.$set=(t=>{"id"in t&&n("id",o=t.id),"name"in t&&n("name",i=t.name),"type"in t&&n("type",r=t.type),"items"in t&&n("items",s=t.items),"isSum"in t&&n("isSum",c=t.isSum)}),{id:o,name:i,type:r,items:s,itemsnum:l,isSum:c,editHandle:function(){!function(t,e,n,o){console.log("tmpContis: "+o),bt.set({name:t,type:e,items:n,id:o}),console.log(bt)}(i,r,s,o),Ct("editlist"),console.log("handleSubmitted by editCont")},details:function(){n("isSum",c=!c)}}}class oe extends ht{constructor(t){super(),pt(this,t,ne,ee,l,["id","name","type","items","isSum","editHandle"])}get editHandle(){return this.$$.ctx.editHandle}}function ie(t,e,n){const o=Object.create(t);return o.container=e[n],o.i=n,o}function re(t){var e,n,o,i;return{c(){e=S("br"),n=k("\n        Welcome to MyStuff! Start adding Containers to the app using the plus button so you\n        can keep track of stuff you have, even when you forgot the app remembers!\n        "),o=S("br"),i=k("\n        This app saves all data to your local store so all your data is on your device.")},m(t,r){w(t,e,r),w(t,n,r),w(t,o,r),w(t,i,r)},d(t){t&&(_(e),_(n),_(o),_(i))}}}function se(t,e){var o,i,r=[e.container];let s={};for(var l=0;l<r.length;l+=1)s=n(s,r[l]);var c=new oe({props:s});return{key:t,first:null,c(){o=x(),c.$$.fragment.c(),this.first=o},m(t,e){w(t,o,e),dt(c,t,e),i=!0},p(t,e){var n,o=t.get||t.myContainers?function(t,e){const n={},o={},i={$$scope:1};let r=t.length;for(;r--;){const s=t[r],l=e[r];if(l){for(const t in s)t in l||(o[t]=1);for(const t in l)i[t]||(n[t]=l[t],i[t]=1);t[r]=l}else for(const t in s)i[t]=1}for(const t in o)t in n||(n[t]=void 0);return n}(r,[(n=e.container,"object"==typeof n&&null!==n?n:{})]):{};c.$set(o)},i(t){i||(nt(c.$$.fragment,t),i=!0)},o(t){ot(c.$$.fragment,t),i=!1},d(t){t&&_(o),ft(c,t)}}}function le(t){var e,n,o=[],i=new Map;let r=a(vt);const s=t=>t.container.id;for(let e=0;e<r.length;e+=1){let n=ie(t,r,e),l=s(n);i.set(l,o[e]=se(l,n))}let l=null;return r.length||(l=re()).c(),{c(){for(let t=0;t<o.length;t+=1)o[t].c();e=x()},m(t,i){for(let e=0;e<o.length;e+=1)o[e].m(t,i);w(t,e,i),l&&l.m(t,i),n=!0},p(t,n){const r=a(vt);tt(),o=ut(o,t,s,1,n,r,i,e.parentNode,ct,se,e,ie),et(),r.length?l&&(l.d(1),l=null):l||((l=re()).c(),l.m(e.parentNode,e))},i(t){if(!n){for(let t=0;t<r.length;t+=1)nt(o[t]);n=!0}},o(t){for(let t=0;t<o.length;t+=1)ot(o[t]);n=!1},d(t){for(let e=0;e<o.length;e+=1)o[e].d(t);t&&_(e),l&&l.d(t)}}}function ce(t){return console.log("myContainers list has: ",a(vt)),{}}class ae extends ht{constructor(t){super(),pt(this,t,ce,le,l,[])}}function ue(t){var e,n,o,i,r,s,l,c,a,u=new ae({}),d=new Ut({props:{button:"newlist"}});return{c(){e=k("width:"),n=k(t.w),o=k(" height:"),i=k(t.h),r=k(" ratio: "),s=k(t.ratio),l=C(),u.$$.fragment.c(),c=C(),d.$$.fragment.c()},m(t,f){w(t,e,f),w(t,n,f),w(t,o,f),w(t,i,f),w(t,r,f),w(t,s,f),w(t,l,f),dt(u,t,f),w(t,c,f),dt(d,t,f),a=!0},p(t,e){a&&!t.w||N(n,e.w),a&&!t.h||N(i,e.h),a&&!t.ratio||N(s,e.ratio)},i(t){a||(nt(u.$$.fragment,t),nt(d.$$.fragment,t),a=!0)},o(t){ot(u.$$.fragment,t),ot(d.$$.fragment,t),a=!1},d(t){t&&(_(e),_(n),_(o),_(i),_(r),_(s),_(l)),ft(u,t),t&&_(c),ft(d,t)}}}function de(t){var e,n=new Vt({props:{name:t.$tmpCont.name,type:t.$tmpCont.type,items:t.$tmpCont.items,id:t.$tmpCont.id,editt:!0}});return{c(){n.$$.fragment.c()},m(t,o){dt(n,t,o),e=!0},p(t,e){var o={};t.$tmpCont&&(o.name=e.$tmpCont.name),t.$tmpCont&&(o.type=e.$tmpCont.type),t.$tmpCont&&(o.items=e.$tmpCont.items),t.$tmpCont&&(o.id=e.$tmpCont.id),n.$set(o)},i(t){e||(nt(n.$$.fragment,t),e=!0)},o(t){ot(n.$$.fragment,t),e=!1},d(t){ft(n,t)}}}function fe(t){var e,n=new Vt({props:{name:t.$unSaved.name,type:t.$unSaved.type,items:t.$unSaved.items,editt:!1}});return{c(){n.$$.fragment.c()},m(t,o){dt(n,t,o),e=!0},p(t,e){var o={};t.$unSaved&&(o.name=e.$unSaved.name),t.$unSaved&&(o.type=e.$unSaved.type),t.$unSaved&&(o.items=e.$unSaved.items),n.$set(o)},i(t){e||(nt(n.$$.fragment,t),e=!0)},o(t){ot(n.$$.fragment,t),e=!1},d(t){ft(n,t)}}}function me(t){var e,n,o,i,r=[fe,de,ue],s=[];function l(t,e){return"newlist"===e.$mypage?0:"editlist"===e.$mypage?1:2}return e=l(0,t),n=s[e]=r[e](t),{c(){n.c(),o=x()},m(t,n){s[e].m(t,n),w(t,o,n),i=!0},p(t,i){var c=e;(e=l(0,i))===c?s[e].p(t,i):(tt(),ot(s[c],1,1,()=>{s[c]=null}),et(),(n=s[e])||(n=s[e]=r[e](i)).c(),nt(n,1),n.m(o.parentNode,o))},i(t){i||(nt(n),i=!0)},o(t){ot(n),i=!1},d(t){s[e].d(t),t&&_(o)}}}function pe(t,e,n){let o,i,r;u(t,yt,t=>{n("$mypage",o=t)}),u(t,wt,t=>{n("$unSaved",i=t)}),u(t,bt,t=>{n("$tmpCont",r=t)});let s,{w:l,h:c}=e;return t.$set=(t=>{"w"in t&&n("w",l=t.w),"h"in t&&n("h",c=t.h)}),t.$$.update=((t={$mypage:1,w:1,h:1})=>{t.$mypage&&console.log("Current page is: "+o),(t.w||t.h)&&n("ratio",s=(l/c).toFixed(2))}),{w:l,h:c,ratio:s,$mypage:o,$unSaved:i,$tmpCont:r}}class he extends ht{constructor(t){super(),pt(this,t,pe,me,l,["w","h"])}}function $e(t){var e,n,o,i,r=new It({}),s=new he({props:{w:t.w,h:t.h}});return{c(){e=S("main"),r.$$.fragment.c(),n=C(),s.$$.fragment.c(),Y(()=>t.main_resize_handler.call(e)),E(e,"class","svelte-10d9n07")},m(l,c){w(l,e,c),dt(r,e,null),b(e,n),dt(s,e,null),o=function(t,e){"static"===getComputedStyle(t).position&&(t.style.position="relative");const n=document.createElement("object");let o;return n.setAttribute("style","display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1;"),n.type="text/html",n.tabIndex=-1,n.onload=(()=>{(o=n.contentDocument.defaultView).addEventListener("resize",e)}),/Trident/.test(navigator.userAgent)?(t.appendChild(n),n.data="about:blank"):(n.data="about:blank",t.appendChild(n)),{cancel:()=>{o&&o.removeEventListener&&o.removeEventListener("resize",e),t.removeChild(n)}}}(e,t.main_resize_handler.bind(e)),i=!0},p(t,e){var n={};t.w&&(n.w=e.w),t.h&&(n.h=e.h),s.$set(n)},i(t){i||(nt(r.$$.fragment,t),nt(s.$$.fragment,t),i=!0)},o(t){ot(r.$$.fragment,t),ot(s.$$.fragment,t),i=!1},d(t){t&&_(e),ft(r),ft(s),o.cancel()}}}function ge(t,e,n){let o,i;return kt(),t.$$.update=((t={w:1,h:1})=>{(t.w||t.h)&&console.log("main w and h: ",o," ",i)}),{w:o,h:i,main_resize_handler:function(){o=this.clientWidth,i=this.clientHeight,n("w",o),n("h",i)}}}return new class extends ht{constructor(t){super(),pt(this,t,ge,$e,l,[])}}({target:document.body,props:{}})}();
//# sourceMappingURL=bundle.js.map
