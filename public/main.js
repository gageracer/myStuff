function t(){}const e=t=>t;function n(t,e){for(const n in e)t[n]=e[n];return t}function o(t){return t()}function i(){return Object.create(null)}function r(t){t.forEach(o)}function s(t){return"function"==typeof t}function l(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function c(e,...n){if(null==e)return t;const o=e.subscribe(...n);return o.unsubscribe?()=>o.unsubscribe():o}function a(t){let e;return c(t,t=>e=t)(),e}function u(t,e,n){t.$$.on_destroy.push(c(e,n))}function d(t,e,o,i){return t[1]&&i?n(o.ctx.slice(),t[1](i(e))):o.ctx}function f(t,e,n,o,i,r,s){const l=function(t,e,n,o){if(t[2]&&o){const i=t[2](o(n));if(void 0===e.dirty)return i;if("object"==typeof i){const t=[],n=Math.max(e.dirty.length,i.length);for(let o=0;o<n;o+=1)t[o]=e.dirty[o]|i[o];return t}return e.dirty|i}return e.dirty}(e,o,i,r);if(l){const i=d(e,n,o,s);t.p(i,l)}}function m(t){const e={};for(const n in t)"$"!==n[0]&&(e[n]=t[n]);return e}function p(t){return null==t?"":t}const h="undefined"!=typeof window;let g=h?()=>window.performance.now():()=>Date.now(),$=h?t=>requestAnimationFrame(t):t;const y=new Set;function v(t){y.forEach(e=>{e.c(t)||(y.delete(e),e.f())}),0!==y.size&&$(v)}function b(t){let e;return 0===y.size&&$(v),{promise:new Promise(n=>{y.add(e={c:t,f:n})}),abort(){y.delete(e)}}}function w(t,e){t.appendChild(e)}function x(t,e,n){t.insertBefore(e,n||null)}function k(t){t.parentNode.removeChild(t)}function S(t){return document.createElement(t)}function _(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function C(t){return document.createTextNode(t)}function M(){return C(" ")}function E(){return C("")}function N(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function T(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function R(t,e){for(const n in e)T(t,n,e[n])}function z(t){return Array.from(t.childNodes)}function A(t,e,n,o){for(let o=0;o<t.length;o+=1){const i=t[o];if(i.nodeName===e){let e=0;const r=[];for(;e<i.attributes.length;){const t=i.attributes[e++];n[t.name]||r.push(t.name)}for(let t=0;t<r.length;t++)i.removeAttribute(r[t]);return t.splice(o,1)[0]}}return o?_(e):S(e)}function I(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function B(t,e){t.value=null==e?"":e}function W(t,e,n,o){t.style.setProperty(e,n,o?"important":"")}let F;function O(){if(void 0===F){F=!1;try{"undefined"!=typeof window&&window.parent&&window.parent.document}catch(t){F=!0}}return F}function j(t,e){const n=document.createEvent("CustomEvent");return n.initCustomEvent(t,!1,!1,e),n}const H=new Set;let q,L=0;function P(t,e,n,o,i,r,s,l=0){const c=16.666/o;let a="{\n";for(let t=0;t<=1;t+=c){const o=e+(n-e)*r(t);a+=100*t+`%{${s(o,1-o)}}\n`}const u=a+`100% {${s(n,1-n)}}\n}`,d=`__svelte_${function(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}(u)}_${l}`,f=t.ownerDocument;H.add(f);const m=f.__svelte_stylesheet||(f.__svelte_stylesheet=f.head.appendChild(S("style")).sheet),p=f.__svelte_rules||(f.__svelte_rules={});p[d]||(p[d]=!0,m.insertRule(`@keyframes ${d} ${u}`,m.cssRules.length));const h=t.style.animation||"";return t.style.animation=`${h?`${h}, `:""}${d} ${o}ms linear ${i}ms 1 both`,L+=1,d}function J(t,e){const n=(t.style.animation||"").split(", "),o=n.filter(e?t=>t.indexOf(e)<0:t=>-1===t.indexOf("__svelte")),i=n.length-o.length;i&&(t.style.animation=o.join(", "),(L-=i)||$(()=>{L||(H.forEach(t=>{const e=t.__svelte_stylesheet;let n=e.cssRules.length;for(;n--;)e.deleteRule(n);t.__svelte_rules={}}),H.clear())}))}function D(t){const e=getComputedStyle(t);if("absolute"!==e.position&&"fixed"!==e.position){const{width:n,height:o}=e,i=t.getBoundingClientRect();t.style.position="absolute",t.style.width=n,t.style.height=o,function(t,e){const n=t.getBoundingClientRect();if(e.left!==n.left||e.top!==n.top){const o=getComputedStyle(t),i="none"===o.transform?"":o.transform;t.style.transform=`${i} translate(${e.left-n.left}px, ${e.top-n.top}px)`}}(t,i)}}function V(t){q=t}function Y(){const t=function(){if(!q)throw new Error("Function called outside component initialization");return q}();return(e,n)=>{const o=t.$$.callbacks[e];if(o){const i=j(e,n);o.slice().forEach(e=>{e.call(t,i)})}}}const G=[],K=[],Q=[],U=[],X=Promise.resolve();let Z=!1;function tt(t){Q.push(t)}let et=!1;const nt=new Set;function ot(){if(!et){et=!0;do{for(let t=0;t<G.length;t+=1){const e=G[t];V(e),it(e.$$)}for(V(null),G.length=0;K.length;)K.pop()();for(let t=0;t<Q.length;t+=1){const e=Q[t];nt.has(e)||(nt.add(e),e())}Q.length=0}while(G.length);for(;U.length;)U.pop()();Z=!1,et=!1,nt.clear()}}function it(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(tt)}}let rt;function st(t,e,n){t.dispatchEvent(j(`${e?"intro":"outro"}${n}`))}const lt=new Set;let ct;function at(){ct={r:0,c:[],p:ct}}function ut(){ct.r||r(ct.c),ct=ct.p}function dt(t,e){t&&t.i&&(lt.delete(t),t.i(e))}function ft(t,e,n,o){if(t&&t.o){if(lt.has(t))return;lt.add(t),ct.c.push(()=>{lt.delete(t),o&&(n&&t.d(1),o())}),t.o(e)}}const mt={duration:0};function pt(n,o,i,l){let c=o(n,i),a=l?0:1,u=null,d=null,f=null;function m(){f&&J(n,f)}function p(t,e){const n=t.b-a;return e*=Math.abs(n),{a:a,b:t.b,d:n,duration:e,start:t.start,end:t.start+e,group:t.group}}function h(o){const{delay:i=0,duration:s=300,easing:l=e,tick:h=t,css:$}=c||mt,y={start:g()+i,b:o};o||(y.group=ct,ct.r+=1),u||d?d=y:($&&(m(),f=P(n,a,o,s,i,l,$)),o&&h(0,1),u=p(y,s),tt(()=>st(n,o,"start")),b(t=>{if(d&&t>d.start&&(u=p(d,s),d=null,st(n,u.b,"start"),$&&(m(),f=P(n,a,u.b,u.duration,0,l,c.css))),u)if(t>=u.end)h(a=u.b,1-a),st(n,u.b,"end"),d||(u.b?m():--u.group.r||r(u.group.c)),u=null;else if(t>=u.start){const e=t-u.start;a=u.a+u.d*l(e/u.duration),h(a,1-a)}return!(!u&&!d)}))}return{run(t){s(c)?(rt||(rt=Promise.resolve()).then(()=>{rt=null}),rt).then(()=>{c=c(),h(t)}):h(t)},end(){m(),u=d=null}}}function ht(t,e){ft(t,1,1,()=>{e.delete(t.key)})}function gt(t,e){t.f(),ht(t,e)}function $t(t,e,n,o,i,r,s,l,c,a,u,d){let f=t.length,m=r.length,p=f;const h={};for(;p--;)h[t[p].key]=p;const g=[],$=new Map,y=new Map;for(p=m;p--;){const t=d(i,r,p),l=n(t);let c=s.get(l);c?o&&c.p(t,e):(c=a(l,t)).c(),$.set(l,g[p]=c),l in h&&y.set(l,Math.abs(p-h[l]))}const v=new Set,b=new Set;function w(t){dt(t,1),t.m(l,u),s.set(t.key,t),u=t.first,m--}for(;f&&m;){const e=g[m-1],n=t[f-1],o=e.key,i=n.key;e===n?(u=e.first,f--,m--):$.has(i)?!s.has(o)||v.has(o)?w(e):b.has(i)?f--:y.get(o)>y.get(i)?(b.add(o),w(e)):(v.add(i),f--):(c(n,s),f--)}for(;f--;){const e=t[f];$.has(e.key)||c(e,s)}for(;m;)w(g[m-1]);return g}function yt(t,e){const n={},o={},i={$$scope:1};let r=t.length;for(;r--;){const s=t[r],l=e[r];if(l){for(const t in s)t in l||(o[t]=1);for(const t in l)i[t]||(n[t]=l[t],i[t]=1);t[r]=l}else for(const t in s)i[t]=1}for(const t in o)t in n||(n[t]=void 0);return n}function vt(t){t&&t.c()}function bt(t,e,n){const{fragment:i,on_mount:l,on_destroy:c,after_update:a}=t.$$;i&&i.m(e,n),tt(()=>{const e=l.map(o).filter(s);c?c.push(...e):r(e),t.$$.on_mount=[]}),a.forEach(tt)}function wt(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function xt(t,e){-1===t.$$.dirty[0]&&(G.push(t),Z||(Z=!0,X.then(ot)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function kt(e,n,o,s,l,c,a=[-1]){const u=q;V(e);const d=n.props||{},f=e.$$={fragment:null,ctx:null,props:c,update:t,not_equal:l,bound:i(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:[]),callbacks:i(),dirty:a,skip_bound:!1};let m=!1;if(f.ctx=o?o(e,d,(t,n,...o)=>{const i=o.length?o[0]:n;return f.ctx&&l(f.ctx[t],f.ctx[t]=i)&&(!f.skip_bound&&f.bound[t]&&f.bound[t](i),m&&xt(e,t)),n}):[],f.update(),m=!0,r(f.before_update),f.fragment=!!s&&s(f.ctx),n.target){if(n.hydrate){const t=z(n.target);f.fragment&&f.fragment.l(t),t.forEach(k)}else f.fragment&&f.fragment.c();n.intro&&dt(e.$$.fragment),bt(e,n.target,n.anchor),ot()}V(u)}class St{$destroy(){wt(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const _t=[];function Ct(e,n=t){let o;const i=[];function r(t){if(l(e,t)&&(e=t,o)){const t=!_t.length;for(let t=0;t<i.length;t+=1){const n=i[t];n[1](),_t.push(n,e)}if(t){for(let t=0;t<_t.length;t+=2)_t[t][0](_t[t+1]);_t.length=0}}}return{set:r,update:function(t){r(t(e))},subscribe:function(s,l=t){const c=[s,l];return i.push(c),1===i.length&&(o=n(r)||t),s(e),()=>{const t=i.indexOf(c);-1!==t&&i.splice(t,1),0===i.length&&(o(),o=null)}}}}function Mt(t,e){localStorage.setItem(e,JSON.stringify(t))}function Et(t){return localStorage.getItem(t)?JSON.parse(localStorage.getItem(t)):"myVersion"===t?"0":"sortReverse"===t?"false":"myStuff"===t?new Array:"totalContainers"===t?new Array:"unSaved"===t?{id:"",name:"",type:"",items:[["",!1]]}:"tmpCont"===t?{id:"",name:"",type:"",items:[["",!1]]}:void 0}const Nt={subscribe:Ct("0.11090",Tt).subscribe};var Tt;const Rt=Ct(!1),zt=Ct("main"),At=Ct([]),It=Ct({id:"",name:"",type:"",items:[["",!1]]}),Bt=Ct({id:"",name:"",type:"",items:[["",!1]]});function Wt(){var t;At.set(Et("myStuff")),zt.set((t="lastPage",localStorage.getItem(t)?JSON.parse(localStorage.getItem(t)):"main")),Bt.set(Et("unSaved")),It.set(Et("tmpCont")),Rt.set(Et("sortReverse"))}function Ft(){Rt.set(!a(Rt)),console.log("sortReverse is: ",a(Rt)),Mt(a(Rt),"sortReverse")}function Ot(t){var e;if(e=t,console.log(e),localStorage.setItem("lastPage",JSON.stringify(e)),"main"===t)return zt.set("main"),void Wt();"newlist"!==t?"editlist"!==t?zt.set("newlist"):zt.set("editlist"):zt.set("newlist")}function jt(e){let n,o,i,r,s,l;return{c(){n=S("button"),o=C("My_Stuff "),i=S("span"),r=C(e[0]),W(i,"font-size","1rem"),W(i,"color","black"),W(i,"opacity","66%"),T(n,"id","main_link"),T(n,"class","svelte-lbio89")},m(t,c){x(t,n,c),w(n,o),w(n,i),w(i,r),s||(l=N(n,"click",e[1]),s=!0)},p(t,[e]){1&e&&I(r,t[0])},i:t,o:t,d(t){t&&k(n),s=!1,l()}}}function Ht(t,e,n){let o;u(t,Nt,t=>n(0,o=t));return[o,()=>Ot("main")]}class qt extends St{constructor(t){super(),kt(this,t,Ht,jt,l,{})}}function Lt(t,e,n,o="",i=!1){if(""==o)console.log("I am Creating new one"),At.update(o=>[...o,{id:o.length+Math.random(),name:t,type:e,items:n,interact:!1}]),Mt({id:"",name:"",type:"",items:[["",!1]]},"unSaved");else{console.log("updating the container...");let r=a(At).findIndex(t=>t.id===o),s=a(At);s.splice(r,1,{id:o,name:t,type:e,items:n,interact:i}),At.update(()=>s.sort((t,e)=>t.id-e.id)),Mt({id:"",name:"",type:"",items:[["",!1]]},"tmpCont")}Mt(a(At),"myStuff")}function Pt(t){return t<.5?4*t*t*t:.5*Math.pow(2*t-2,3)+1}function Jt(t){const e=t-1;return e*e*e+1}function Dt(t,{delay:e=0,duration:n=400,easing:o=Pt,amount:i=5,opacity:r=0}){const s=getComputedStyle(t),l=+s.opacity,c="none"===s.filter?"":s.filter,a=l*(1-r);return{delay:e,duration:n,easing:o,css:(t,e)=>`opacity: ${l-a*e}; filter: ${c} blur(${e*i}px);`}}function Vt(t,{delay:e=0,duration:n=400,easing:o=Jt,x:i=0,y:r=0,opacity:s=0}){const l=getComputedStyle(t),c=+l.opacity,a="none"===l.transform?"":l.transform,u=c*(1-s);return{delay:e,duration:n,easing:o,css:(t,e)=>`\n\t\t\ttransform: ${a} translate(${(1-t)*i}px, ${(1-t)*r}px);\n\t\t\topacity: ${c-u*e}`}}function Yt(t,{delay:e=0,duration:n=400,easing:o=Jt}){const i=getComputedStyle(t),r=+i.opacity,s=parseFloat(i.height),l=parseFloat(i.paddingTop),c=parseFloat(i.paddingBottom),a=parseFloat(i.marginTop),u=parseFloat(i.marginBottom),d=parseFloat(i.borderTopWidth),f=parseFloat(i.borderBottomWidth);return{delay:e,duration:n,easing:o,css:t=>"overflow: hidden;"+`opacity: ${Math.min(20*t,1)*r};`+`height: ${t*s}px;`+`padding-top: ${t*l}px;`+`padding-bottom: ${t*c}px;`+`margin-top: ${t*a}px;`+`margin-bottom: ${t*u}px;`+`border-top-width: ${t*d}px;`+`border-bottom-width: ${t*f}px;`}}function Gt(e){let n,o,i,r,s,l,c,a,u,m;const p=e[3].default,h=function(t,e,n,o){if(t){const i=d(t,e,n,o);return t[0](i)}}(p,e,e[2],null),g=h||function(e){let n,o,i;return{c(){(n=S("button")).textContent="Close",T(n,"name","modal-close")},m(t,r){x(t,n,r),o||(i=N(n,"click",e[5]),o=!0)},p:t,d(t){t&&k(n),o=!1,i()}}}(e);return{c(){n=S("div"),i=M(),r=S("div"),s=C(e[0]),l=M(),g&&g.c(),T(n,"class","modal-bg svelte-1df7d0c"),T(r,"class","modal svelte-1df7d0c")},m(t,o){x(t,n,o),x(t,i,o),x(t,r,o),w(r,s),w(r,l),g&&g.m(r,null),a=!0,u||(m=N(n,"click",e[4]),u=!0)},p(t,[e]){(!a||1&e)&&I(s,t[0]),h&&h.p&&4&e&&f(h,p,t,t[2],e,null,null)},i(t){a||(tt(()=>{o||(o=pt(n,Dt,{amount:10},!0)),o.run(1)}),dt(g,t),tt(()=>{c||(c=pt(r,Vt,{y:300},!0)),c.run(1)}),a=!0)},o(t){o||(o=pt(n,Dt,{amount:10},!1)),o.run(0),ft(g,t),c||(c=pt(r,Vt,{y:300},!1)),c.run(0),a=!1},d(t){t&&k(n),t&&o&&o.end(),t&&k(i),t&&k(r),g&&g.d(t),t&&c&&c.end(),u=!1,m()}}}function Kt(t,e,n){let{$$slots:o={},$$scope:i}=e;const r=Y();let{content:s}=e;return t.$$set=(t=>{"content"in t&&n(0,s=t.content),"$$scope"in t&&n(2,i=t.$$scope)}),[s,r,i,o,()=>r("cancel"),()=>r("close")]}class Qt extends St{constructor(t){super(),kt(this,t,Kt,Gt,l,{content:0})}}function Ut(t,e,n){const o=t.slice();return o[19]=e[n],o[20]=e,o[21]=n,o}function Xt(t){let e,n,o;return{c(){(e=S("button")).innerHTML='<div class="minus svelte-1ds5st4"></div>',T(e,"name","rem-item"),T(e,"class","svelte-1ds5st4")},m(i,r){x(i,e,r),n||(o=N(e,"click",function(){s(t[9].bind(this,t[21]))&&t[9].bind(this,t[21]).apply(this,arguments)}),n=!0)},p(e,n){t=e},d(t){t&&k(e),n=!1,o()}}}function Zt(t,e){let n,o,i,s,l,c,a,u,d;function f(){e[13].call(o,e[20],e[21])}let m=0!=e[21]&&Xt(e);function p(...t){return e[14](e[19],...t)}return{key:t,first:null,c(){n=S("div"),o=S("input"),i=M(),m&&m.c(),s=M(),(l=S("button")).innerHTML='<div class="cross svelte-1ds5st4"></div>',T(o,"type","text"),T(o,"name","tmpitems"),T(o,"autocomplete","off"),T(o,"maxlength","48"),T(o,"placeholder",e[5]),o.required=!0,T(o,"class","svelte-1ds5st4"),T(l,"name","add-item"),T(l,"class","svelte-1ds5st4"),T(n,"class","itemslist svelte-1ds5st4"),this.first=n},m(t,r){x(t,n,r),w(n,o),B(o,e[19][0]),w(n,i),m&&m.m(n,null),w(n,s),w(n,l),a=!0,u||(d=[N(o,"input",f),N(l,"click",p)],u=!0)},p(t,i){e=t,(!a||32&i)&&T(o,"placeholder",e[5]),4&i&&o.value!==e[19][0]&&B(o,e[19][0]),0!=e[21]?m?m.p(e,i):((m=Xt(e)).c(),m.m(n,s)):m&&(m.d(1),m=null)},i(t){a||(t&&tt(()=>{c||(c=pt(n,Yt,{},!0)),c.run(1)}),a=!0)},o(t){t&&(c||(c=pt(n,Yt,{},!1)),c.run(0)),a=!1},d(t){t&&k(n),m&&m.d(),t&&c&&c.end(),u=!1,r(d)}}}function te(e){let n,o,i;return{c(){(n=S("button")).textContent="Delete",T(n,"name","delete-container"),W(n,"color","red"),W(n,"background-color","#f5f5f6"),T(n,"class","svelte-1ds5st4")},m(t,r){x(t,n,r),o||(i=N(n,"click",e[15]),o=!0)},p:t,d(t){t&&k(n),o=!1,i()}}}function ee(t){let e,n;return(e=new Qt({props:{content:"Are you sure you wanna delete this container?",$$slots:{default:[ne]},$$scope:{ctx:t}}})).$on("cancel",t[17]),e.$on("close",t[18]),{c(){vt(e.$$.fragment)},m(t,o){bt(e,t,o),n=!0},p(t,n){const o={};4194320&n&&(o.$$scope={dirty:n,ctx:t}),e.$set(o)},i(t){n||(dt(e.$$.fragment,t),n=!0)},o(t){ft(e.$$.fragment,t),n=!1},d(t){wt(e,t)}}}function ne(e){let n,o,i,s,l,c,a,u;return{c(){n=S("br"),o=M(),i=S("div"),(s=S("button")).textContent="Yes",l=M(),(c=S("button")).textContent="No",W(s,"background-color","red"),T(s,"class","svelte-1ds5st4"),T(c,"class","svelte-1ds5st4"),T(i,"class","row-buttons svelte-1ds5st4")},m(t,r){x(t,n,r),x(t,o,r),x(t,i,r),w(i,s),w(i,l),w(i,c),a||(u=[N(s,"click",e[7],{once:!0}),N(c,"click",e[16])],a=!0)},p:t,d(t){t&&k(n),t&&k(o),t&&k(i),a=!1,r(u)}}}function oe(t){let e,n,o,i,s,l,c,a,u,d,f,m,p,h,g,$,y,v=[],b=new Map,_=t[2];const C=t=>t[21];for(let e=0;e<_.length;e+=1){let n=Ut(t,_,e),o=C(n);b.set(o,v[e]=Zt(o,n))}let R=t[3]&&te(t),z=t[4]&&ee(t);return{c(){e=S("div"),n=S("label"),o=S("input"),i=M(),s=S("input"),l=M();for(let t=0;t<v.length;t+=1)v[t].c();c=M(),a=S("div"),R&&R.c(),u=M(),(d=S("button")).textContent="Save",p=M(),z&&z.c(),h=E(),T(o,"type","text"),T(o,"name","name"),T(o,"autocomplete","off"),T(o,"maxlength","28"),T(o,"placeholder","The Container Name"),o.required=!0,T(o,"class","svelte-1ds5st4"),T(s,"type","text"),T(s,"name","type"),T(s,"autocomplete","off"),T(s,"maxlength","32"),T(s,"placeholder","The Container Type"),s.required=!0,T(s,"class","svelte-1ds5st4"),T(d,"name","save-container"),T(d,"class","svelte-1ds5st4"),T(a,"class","buttons svelte-1ds5st4"),T(n,"class","svelte-1ds5st4"),T(e,"classname","create-new")},m(r,f){x(r,e,f),w(e,n),w(n,o),B(o,t[0]),w(n,i),w(n,s),B(s,t[1]),w(n,l);for(let t=0;t<v.length;t+=1)v[t].m(n,null);w(n,c),w(n,a),R&&R.m(a,null),w(a,u),w(a,d),x(r,p,f),z&&z.m(r,f),x(r,h,f),g=!0,$||(y=[N(o,"input",t[11]),N(s,"input",t[12]),N(d,"click",t[6],{once:!0})],$=!0)},p(t,[e]){if(1&e&&o.value!==t[0]&&B(o,t[0]),2&e&&s.value!==t[1]&&B(s,t[1]),804&e){const o=t[2];at(),v=$t(v,e,C,1,t,o,b,n,ht,Zt,c,Ut),ut()}t[3]?R?R.p(t,e):((R=te(t)).c(),R.m(a,u)):R&&(R.d(1),R=null),t[4]?z?(z.p(t,e),16&e&&dt(z,1)):((z=ee(t)).c(),dt(z,1),z.m(h.parentNode,h)):z&&(at(),ft(z,1,1,()=>{z=null}),ut())},i(t){if(!g){for(let t=0;t<_.length;t+=1)dt(v[t]);tt(()=>{f||(f=pt(a,Yt,{},!0)),f.run(1)}),tt(()=>{m||(m=pt(e,Yt,{duration:500},!0)),m.run(1)}),dt(z),g=!0}},o(t){for(let t=0;t<v.length;t+=1)ft(v[t]);f||(f=pt(a,Yt,{},!1)),f.run(0),m||(m=pt(e,Yt,{duration:500},!1)),m.run(0),ft(z),g=!1},d(t){t&&k(e);for(let t=0;t<v.length;t+=1)v[t].d();R&&R.d(),t&&f&&f.end(),t&&m&&m.end(),t&&k(p),z&&z.d(t),t&&k(h),$=!1,r(y)}}}function ie(t,e,n){let{id:o=""}=e,{name:i=""}=e,{type:r=""}=e,{items:s=[["",!1]]}=e,{editt:l=!1}=e,c=!1,u="Start adding items to your container!";function d(t){""!==s[s.length-1][0]&&(n(2,s[s.length-1]=[t,!1],s),n(2,s=[...s,["",!1]]))}return t.$$set=(t=>{"id"in t&&n(10,o=t.id),"name"in t&&n(0,i=t.name),"type"in t&&n(1,r=t.type),"items"in t&&n(2,s=t.items),"editt"in t&&n(3,l=t.editt)}),t.$$.update=(()=>{4&t.$$.dirty&&s.length>1&&n(5,u="And another one"),15&t.$$.dirty&&(console.log(i+":"+r+":"+s),Mt({name:i,type:r,items:s},l?"tmpCont":"unSaved"),console.log("the last item is::::::::::::::::::::::",s.slice(-1)[1])),4&t.$$.dirty&&console.log(s.length+" items:"+s)}),[i,r,s,l,c,u,function(){i&&r&&s&&(""===s[s.length-1][0]&&s.splice(s.length-1,1),!0===s[s.length-1][1]&&n(2,s[s.length-1][1]=!1,s),Lt(i,r,s,o),console.log("handleSubmitted"),Ot("main"),n(3,l=!1))},function(){!function(t){let e=a(At).findIndex(e=>e.id===t),n=a(At);n.splice(e,1),At.update(()=>n.sort((t,e)=>t.id-e.id)),Mt({id:"",name:"",type:"",items:[["",!1]]},"tmpCont"),Mt(a(At),"myStuff")}(o),Ot("main")},d,function(t){console.log(t+" th item deleted"),n(2,s=s.filter((e,n)=>n!==t))},o,function(){i=this.value,n(0,i)},function(){r=this.value,n(1,r)},function(t,e){t[e][0]=this.value,n(2,s)},t=>d(t[0]),()=>n(4,c=!0),()=>n(4,c=!1),()=>n(4,c=!1),()=>n(4,c=!1)]}class re extends St{constructor(t){super(),kt(this,t,ie,oe,l,{id:10,name:0,type:1,items:2,editt:3})}}function se(t,e,n){const o=t.slice();return o[11]=e[n],o[13]=n,o}function le(t){let e,n,o,i,s,l,c,a,u,d,f,m,h,g,$,y,v,b,_,E=t[0],R=[];for(let e=0;e<E.length;e+=1)R[e]=ce(se(t,E,e));return{c(){e=S("div"),n=S("span"),o=C(t[4]),i=C(" | "),s=C(t[6]),l=C(" Stuff here"),c=M(),a=S("ul");for(let t=0;t<R.length;t+=1)R[t].c();u=M(),d=S("div"),(f=S("button")).textContent="Edit",m=M(),h=S("div"),g=C("Interactive Mode"),T(a,"class","item-list svelte-8s8459"),T(f,"class","edit-button svelte-8s8459"),T(f,"name","edit-button"),T(h,"class",$=p(t[1]?"interactive-text-on":"interactive-text-off")+" svelte-8s8459"),T(d,"class","options svelte-8s8459"),T(e,"class","details svelte-8s8459")},m(r,p){x(r,e,p),w(e,n),w(n,o),w(n,i),w(n,s),w(n,l),w(e,c),w(e,a);for(let t=0;t<R.length;t+=1)R[t].m(a,null);w(e,u),w(e,d),w(d,f),w(d,m),w(d,h),w(h,g),v=!0,b||(_=[N(f,"click",t[5]),N(h,"click",t[8])],b=!0)},p(t,e){if((!v||16&e)&&I(o,t[4]),513&e){let n;for(E=t[0],n=0;n<E.length;n+=1){const o=se(t,E,n);R[n]?R[n].p(o,e):(R[n]=ce(o),R[n].c(),R[n].m(a,null))}for(;n<R.length;n+=1)R[n].d(1);R.length=E.length}(!v||2&e&&$!==($=p(t[1]?"interactive-text-on":"interactive-text-off")+" svelte-8s8459"))&&T(h,"class",$)},i(t){v||(tt(()=>{y||(y=pt(e,Vt,{y:-10,duration:200},!0)),y.run(1)}),v=!0)},o(t){y||(y=pt(e,Vt,{y:-10,duration:200},!1)),y.run(0),v=!1},d(t){t&&k(e),function(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}(R,t),t&&y&&y.end(),b=!1,r(_)}}}function ce(t){let e,n,o,i,r,s=t[11][0]+"";return{c(){e=S("li"),n=C(s),T(e,"class",o=p(t[11][1]?"item-not-red":"item-red")+" svelte-8s8459")},m(o,s){x(o,e,s),w(e,n),i||(r=N(e,"click",t[9].bind(this,t[13])),i=!0)},p(i,r){t=i,1&r&&s!==(s=t[11][0]+"")&&I(n,s),1&r&&o!==(o=p(t[11][1]?"item-not-red":"item-red")+" svelte-8s8459")&&T(e,"class",o)},d(t){t&&k(e),i=!1,r()}}}function ae(t){let e,n,o,i,r,s,l,c,a,u,d=!t[2]&&le(t);return{c(){e=S("div"),n=S("div"),o=C(t[3]),i=M(),r=S("hr"),s=M(),d&&d.c(),T(n,"id","name"),T(n,"class","svelte-8s8459"),W(r,"width","90%"),W(r,"border-color","#e1e2e186"),T(e,"class",l=p(t[1]?"containersum containersum-on":"containersum containersum-off")+" svelte-8s8459")},m(l,f){x(l,e,f),w(e,n),w(n,o),w(e,i),w(e,r),w(e,s),d&&d.m(e,null),c=!0,a||(u=N(n,"click",t[7]),a=!0)},p(t,[n]){(!c||8&n)&&I(o,t[3]),t[2]?d&&(at(),ft(d,1,1,()=>{d=null}),ut()):d?(d.p(t,n),4&n&&dt(d,1)):((d=le(t)).c(),dt(d,1),d.m(e,null)),(!c||2&n&&l!==(l=p(t[1]?"containersum containersum-on":"containersum containersum-off")+" svelte-8s8459"))&&T(e,"class",l)},i(t){c||(dt(d),c=!0)},o(t){ft(d),c=!1},d(t){t&&k(e),d&&d.d(),a=!1,u()}}}function ue(t,e,n){let{id:o=""}=e,{name:i="TestName"}=e,{type:r="TestType"}=e,{items:s=["sugar"]}=e,{interact:l=!1}=e,c=s.length,{isSum:a=!0}=e;return t.$$set=(t=>{"id"in t&&n(10,o=t.id),"name"in t&&n(3,i=t.name),"type"in t&&n(4,r=t.type),"items"in t&&n(0,s=t.items),"interact"in t&&n(1,l=t.interact),"isSum"in t&&n(2,a=t.isSum)}),t.$$.update=(()=>{2&t.$$.dirty&&console.log("interaction is: ",l)}),[s,l,a,i,r,function(){!function(t,e,n,o){console.log("tmpContis: "+o),It.set({name:t,type:e,items:n,id:o}),console.log(It)}(i,r,s,o),Ot("editlist"),console.log("handleSubmitted by editCont")},c,function(){n(2,a=!a)},function(){n(1,l=!l),Lt(i,r,s,o,l)},function(t){l&&(n(0,s[t][1]=!s[t][1],s),Lt(i,r,s,o,l))},o]}class de extends St{constructor(t){super(),kt(this,t,ue,ae,l,{id:10,name:3,type:4,items:0,interact:1,isSum:2,editHandle:5})}get editHandle(){return this.$$.ctx[5]}}function fe(t,e,n){const o=getComputedStyle(t),i="none"===o.transform?"":o.transform,r=e.from.width/t.clientWidth,l=e.from.height/t.clientHeight,c=(e.from.left-e.to.left)/r,a=(e.from.top-e.to.top)/l,u=Math.sqrt(c*c+a*a),{delay:d=0,duration:f=(t=>120*Math.sqrt(t)),easing:m=Jt}=n;return{delay:d,duration:s(f)?f(u):f,easing:m,css:(t,e)=>`transform: ${i} translate(${e*c}px, ${e*a}px);`}}function me(e){let o,i,r,s,l,c=[{fill:"#000000"},{xmlns:"http://www.w3.org/2000/svg"},{viewBox:"0 0 50 50"},{width:"50px"},{height:"50px"},e[0]],a={};for(let t=0;t<c.length;t+=1)a=n(a,c[t]);return{c(){o=_("svg"),i=_("path"),r=_("path"),s=_("path"),l=_("path"),this.h()},l(t){var e=z(o=A(t,"svg",{fill:!0,xmlns:!0,viewBox:!0,width:!0,height:!0},1));z(i=A(e,"path",{fill:!0,stroke:!0,"stroke-miterlimit":!0,"stroke-width":!0,d:!0},1)).forEach(k),z(r=A(e,"path",{fill:!0,stroke:!0,"stroke-linecap":!0,"stroke-linejoin":!0,"stroke-miterlimit":!0,d:!0},1)).forEach(k),z(s=A(e,"path",{fill:!0,stroke:!0,"stroke-miterlimit":!0,"stroke-width":!0,d:!0},1)).forEach(k),z(l=A(e,"path",{fill:!0,stroke:!0,"stroke-miterlimit":!0,"stroke-width":!0,d:!0},1)).forEach(k),e.forEach(k),this.h()},h(){T(i,"fill","none"),T(i,"stroke","#858383"),T(i,"stroke-miterlimit","10"),T(i,"stroke-width","2"),T(i,"d","M3,25c0,12.148,9.852,22,22,22s22-9.852,22-22S37.148,3,25,3S3,12.852,3,25z"),T(r,"fill","none"),T(r,"stroke","#858383"),T(r,"stroke-linecap","round"),T(r,"stroke-linejoin","round"),T(r,"stroke-miterlimit","10"),T(r,"d","M38 25.655c4.51-.282 7.58-.017 9 .163M37.401 27.519c5.169 0 8.498.675 9.699.967M3 25.802c1.42-.181 4.49-.445 9-.163M2.999 28.476c1.199-.292 4.528-.968 9.701-.968"),T(s,"fill","none"),T(s,"stroke","#858383"),T(s,"stroke-miterlimit","10"),T(s,"stroke-width","2"),T(s,"d","M36.3 18.6c.5-1.6 1.3-5.2-.2-6.6-2.7 0-4.6 1.3-5.5 2.1C29 13.4 27.1 13 25 13s-4 .4-5.7 1.1c-.9-.8-2.8-2.1-5.5-2.1-1.4 1.3-.7 4.9-.2 6.6-1.1 1.5-1.7 3.3-1.7 5 0 5.5 4.2 9.4 13 9.4s13-3.9 13-9.4C38 21.8 37.4 20.1 36.3 18.6zM19 39c0 0-3 0-3.6 0-1.5 0-2.8-.6-3.4-1.8-.7-1.3-1-3.5-2.8-4.7C8.9 32.3 9.1 32 9.7 32c.6.1 1.9.9 2.7 2 .9 1.1 1.8 2 3.4 2s3.8.1 4.5-.7"),T(l,"fill","none"),T(l,"stroke","#858383"),T(l,"stroke-miterlimit","10"),T(l,"stroke-width","2"),T(l,"d","M31,45.7v-6.1c0-2.7-1.9-6.5-4.5-6.5h-2.8c-2.6,0-4.7,3.8-4.7,6.5V46"),R(o,a)},m(t,e){x(t,o,e),w(o,i),w(o,r),w(o,s),w(o,l)},p(t,[e]){R(o,a=yt(c,[{fill:"#000000"},{xmlns:"http://www.w3.org/2000/svg"},{viewBox:"0 0 50 50"},{width:"50px"},{height:"50px"},1&e&&t[0]]))},i:t,o:t,d(t){t&&k(o)}}}function pe(t,e,o){return t.$$set=(t=>{o(0,e=n(n({},e),m(t)))}),[e=m(e)]}class he extends St{constructor(t){super(),kt(this,t,pe,me,l,{})}}function ge(t,e,n){const o=t.slice();return o[2]=e[n],o[4]=n,o}function $e(t){let e;return{c(){(e=S("div")).innerHTML="<div>Welcome to MyStuff! Start adding Containers to the app using the plus button so you\n                can keep track of stuff you have, even when you forgot the app remembers!</div> \n            \n            <div>This app saves all data to your local store so all your data is on your device.</div>",T(e,"class","welcome svelte-11ucazf")},m(t,n){x(t,e,n)},d(t){t&&k(e)}}}function ye(o,i){let r,s,l,c,a=t;const u=[i[2]];let d={};for(let t=0;t<u.length;t+=1)d=n(d,u[t]);return s=new de({props:d}),{key:o,first:null,c(){r=S("div"),vt(s.$$.fragment),this.first=r},m(t,e){x(t,r,e),bt(s,r,null),c=!0},p(t,e){const n=1&e?yt(u,[(o=t[2],"object"==typeof o&&null!==o?o:{})]):{};var o;s.$set(n)},r(){l=r.getBoundingClientRect()},f(){D(r),a()},a(){a(),a=function(n,o,i,r){if(!o)return t;const s=n.getBoundingClientRect();if(o.left===s.left&&o.right===s.right&&o.top===s.top&&o.bottom===s.bottom)return t;const{delay:l=0,duration:c=300,easing:a=e,start:u=g()+l,end:d=u+c,tick:f=t,css:m}=i(n,{from:o,to:s},r);let p,h=!0,$=!1;function y(){m&&J(n,p),h=!1}return b(t=>{if(!$&&t>=u&&($=!0),$&&t>=d&&(f(1,0),y()),!h)return!1;if($){const e=0+1*a((t-u)/c);f(e,1-e)}return!0}),m&&(p=P(n,0,1,c,l,a,m)),l||($=!0),f(0,1),y}(r,l,fe,{duration:200})},i(t){c||(dt(s.$$.fragment,t),c=!0)},o(t){ft(s.$$.fragment,t),c=!1},d(t){t&&k(r),wt(s)}}}function ve(t){let e,n,o,i,r=[],s=new Map,l=t[0];const c=t=>t[2].id;for(let e=0;e<l.length;e+=1){let n=ge(t,l,e),o=c(n);s.set(o,r[e]=ye(o,n))}let a=null;return l.length||(a=$e()),o=new he({}),{c(){for(let t=0;t<r.length;t+=1)r[t].c();a&&a.c(),e=M(),n=S("a"),vt(o.$$.fragment),T(n,"class","github svelte-11ucazf"),T(n,"href","https://github.com/gageracer/myStuff"),T(n,"target","_blank"),T(n,"type","image/svg+xml")},m(t,s){for(let e=0;e<r.length;e+=1)r[e].m(t,s);a&&a.m(t,s),x(t,e,s),x(t,n,s),bt(o,n,null),i=!0},p(t,[n]){if(1&n){const o=t[0];at();for(let t=0;t<r.length;t+=1)r[t].r();r=$t(r,n,c,1,t,o,s,e.parentNode,gt,ye,e,ge);for(let t=0;t<r.length;t+=1)r[t].a();ut(),o.length?a&&(a.d(1),a=null):a||((a=$e()).c(),a.m(e.parentNode,e))}},i(t){if(!i){for(let t=0;t<l.length;t+=1)dt(r[t]);dt(o.$$.fragment,t),i=!0}},o(t){for(let t=0;t<r.length;t+=1)ft(r[t]);ft(o.$$.fragment,t),i=!1},d(t){for(let e=0;e<r.length;e+=1)r[e].d(t);a&&a.d(t),t&&k(e),t&&k(n),wt(o)}}}function be(t,e,n){let o;u(t,Rt,t=>n(1,o=t));let i=a(Rt)?a(At).reverse():a(At);return t.$$.update=(()=>{3&t.$$.dirty&&n(0,i=i.reverse())}),[i]}class we extends St{constructor(t){super(),kt(this,t,be,ve,l,{})}}function xe(e){let n,o,i;return{c(){(n=S("button")).innerHTML="<div>Sort</div>",T(n,"id","sort-reverse"),T(n,"class","svelte-1ykcag7")},m(t,e){x(t,n,e),o||(i=N(n,"click",Ft),o=!0)},p:t,d(t){t&&k(n),o=!1,i()}}}function ke(e){let n,o,i;return{c(){(n=S("button")).innerHTML='<div id="cross" aria-hidden="true" class="svelte-1ykcag7"></div>',T(n,"id","menu-edit-create"),T(n,"name","new-list"),T(n,"aria-label","Create Container"),T(n,"class","svelte-1ykcag7")},m(t,r){x(t,n,r),o||(i=N(n,"click",e[1]),o=!0)},p:t,d(t){t&&k(n),o=!1,i()}}}function Se(e){let n;function o(t,e){return"newlist"===t[0]?ke:"sortReverse"===t[0]?xe:void 0}let i=o(e),r=i&&i(e);return{c(){r&&r.c(),n=E()},m(t,e){r&&r.m(t,e),x(t,n,e)},p(t,[e]){i===(i=o(t))&&r?r.p(t,e):(r&&r.d(1),(r=i&&i(t))&&(r.c(),r.m(n.parentNode,n)))},i:t,o:t,d(t){r&&r.d(t),t&&k(n)}}}function _e(t,e,n){let{button:o}=e;return t.$$set=(t=>{"button"in t&&n(0,o=t.button)}),[o,()=>Ot(o)]}class Ce extends St{constructor(t){super(),kt(this,t,_e,Se,l,{button:0})}}function Me(e){let n,o,i,r,s,l,c,a,u,d;return o=new we({}),r=new Ce({props:{button:"newlist"}}),l=new Ce({props:{button:"sortReverse"}}),{c(){n=S("div"),vt(o.$$.fragment),i=M(),vt(r.$$.fragment),s=M(),vt(l.$$.fragment),T(n,"class","content svelte-fzfq20")},m(t,c){x(t,n,c),bt(o,n,null),w(n,i),bt(r,n,null),w(n,s),bt(l,n,null),a=!0,u||(d=N(n,"outroend",e[6]),u=!0)},p:t,i(t){a||(dt(o.$$.fragment,t),dt(r.$$.fragment,t),dt(l.$$.fragment,t),tt(()=>{c||(c=pt(n,Yt,{duration:500},!0)),c.run(1)}),a=!0)},o(t){ft(o.$$.fragment,t),ft(r.$$.fragment,t),ft(l.$$.fragment,t),c||(c=pt(n,Yt,{duration:500},!1)),c.run(0),a=!1},d(t){t&&k(n),wt(o),wt(r),wt(l),t&&c&&c.end(),u=!1,d()}}}function Ee(t){let e,n,o;var i=re;function r(t){return{props:{name:t[3].name,type:t[3].type,items:t[3].items,id:t[3].id,editt:!0}}}return i&&(e=new i(r(t))),{c(){e&&vt(e.$$.fragment),n=E()},m(t,i){e&&bt(e,t,i),x(t,n,i),o=!0},p(t,o){const s={};if(8&o&&(s.name=t[3].name),8&o&&(s.type=t[3].type),8&o&&(s.items=t[3].items),8&o&&(s.id=t[3].id),i!==(i=re)){if(e){at();const t=e;ft(t.$$.fragment,1,0,()=>{wt(t,1)}),ut()}i?(vt((e=new i(r(t))).$$.fragment),dt(e.$$.fragment,1),bt(e,n.parentNode,n)):e=null}else i&&e.$set(s)},i(t){o||(e&&dt(e.$$.fragment,t),o=!0)},o(t){e&&ft(e.$$.fragment,t),o=!1},d(t){t&&k(n),e&&wt(e,t)}}}function Ne(t){let e,n,o;var i=re;function r(t){return{props:{name:t[2].name,type:t[2].type,items:t[2].items,editt:!1}}}return i&&(e=new i(r(t))),{c(){e&&vt(e.$$.fragment),n=E()},m(t,i){e&&bt(e,t,i),x(t,n,i),o=!0},p(t,o){const s={};if(4&o&&(s.name=t[2].name),4&o&&(s.type=t[2].type),4&o&&(s.items=t[2].items),i!==(i=re)){if(e){at();const t=e;ft(t.$$.fragment,1,0,()=>{wt(t,1)}),ut()}i?(vt((e=new i(r(t))).$$.fragment),dt(e.$$.fragment,1),bt(e,n.parentNode,n)):e=null}else i&&e.$set(s)},i(t){o||(e&&dt(e.$$.fragment,t),o=!0)},o(t){e&&ft(e.$$.fragment,t),o=!1},d(t){t&&k(n),e&&wt(e,t)}}}function Te(t){let e,n,o,i;const r=[Ne,Ee,Me],s=[];function l(t,e){return"newlist"===t[1]?0:"editlist"===t[1]?1:2}return e=l(t),n=s[e]=r[e](t),{c(){n.c(),o=E()},m(t,n){s[e].m(t,n),x(t,o,n),i=!0},p(t,[i]){let c=e;(e=l(t))===c?s[e].p(t,i):(at(),ft(s[c],1,1,()=>{s[c]=null}),ut(),(n=s[e])||(n=s[e]=r[e](t)).c(),dt(n,1),n.m(o.parentNode,o))},i(t){i||(dt(n),i=!0)},o(t){ft(n),i=!1},d(t){s[e].d(t),t&&k(o)}}}function Re(t,e,n){let o,i,r,s;u(t,zt,t=>n(1,o=t)),u(t,Bt,t=>n(2,i=t)),u(t,It,t=>n(3,r=t));let l,{w:c}=e,{h:a}=e;return t.$$set=(t=>{"w"in t&&n(4,c=t.w),"h"in t&&n(5,a=t.h)}),t.$$.update=(()=>{1&t.$$.dirty&&console.log(s),2&t.$$.dirty&&console.log("Current page is: "+o),48&t.$$.dirty&&(l=(c/a).toFixed(2))}),[s,o,i,r,c,a,()=>n(0,s="outro ended")]}class ze extends St{constructor(t){super(),kt(this,t,Re,Te,l,{w:4,h:5})}}function Ae(t){let e,n,o,i,r,s;return n=new qt({}),i=new ze({props:{w:t[0],h:t[1]}}),{c(){e=S("main"),vt(n.$$.fragment),o=M(),vt(i.$$.fragment),T(e,"alt","Main Page"),T(e,"class","svelte-12e4uyx"),tt(()=>t[2].call(e))},m(l,c){x(l,e,c),bt(n,e,null),w(e,o),bt(i,e,null),r=function(t,e){const n=getComputedStyle(t),o=(parseInt(n.zIndex)||0)-1;"static"===n.position&&(t.style.position="relative");const i=S("iframe");i.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; "+`overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: ${o};`),i.setAttribute("aria-hidden","true"),i.tabIndex=-1;const r=O();let s;return r?(i.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",s=N(window,"message",t=>{t.source===i.contentWindow&&e()})):(i.src="about:blank",i.onload=(()=>{s=N(i.contentWindow,"resize",e)})),w(t,i),()=>{r?s():s&&i.contentWindow&&s(),k(i)}}(e,t[2].bind(e)),s=!0},p(t,[e]){const n={};1&e&&(n.w=t[0]),2&e&&(n.h=t[1]),i.$set(n)},i(t){s||(dt(n.$$.fragment,t),dt(i.$$.fragment,t),s=!0)},o(t){ft(n.$$.fragment,t),ft(i.$$.fragment,t),s=!1},d(t){t&&k(e),wt(n),wt(i),r()}}}function Ie(t,e,n){let o,i;return Wt(),t.$$.update=(()=>{3&t.$$.dirty&&console.log("main w and h: ",o," ",i)}),[o,i,function(){o=this.clientWidth,i=this.clientHeight,n(0,o),n(1,i)}]}"serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("serviceWorker.js").then(t=>console.log("service worker registered")).catch(t=>console.log("service worker not registered",t))});export default new class extends St{constructor(t){super(),kt(this,t,Ie,Ae,l,{})}}({target:document.body,props:{}});
//# sourceMappingURL=main.js.map
