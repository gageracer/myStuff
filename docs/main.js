function t(){}const e=t=>t;function n(t,e){for(const n in e)t[n]=e[n];return t}function o(t){return t()}function i(){return Object.create(null)}function r(t){t.forEach(o)}function s(t){return"function"==typeof t}function l(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function c(e,...n){if(null==e)return t;const o=e.subscribe(...n);return o.unsubscribe?()=>o.unsubscribe():o}function a(t){let e;return c(t,t=>e=t)(),e}function u(t,e,n){t.$$.on_destroy.push(c(e,n))}function d(t,e,o,i){return t[1]&&i?n(o.ctx.slice(),t[1](i(e))):o.ctx}function f(t,e,n,o,i,r,s){const l=function(t,e,n,o){if(t[2]&&o){const i=t[2](o(n));if(void 0===e.dirty)return i;if("object"==typeof i){const t=[],n=Math.max(e.dirty.length,i.length);for(let o=0;o<n;o+=1)t[o]=e.dirty[o]|i[o];return t}return e.dirty|i}return e.dirty}(e,o,i,r);if(l){const i=d(e,n,o,s);t.p(i,l)}}function m(t){const e={};for(const n in t)"$"!==n[0]&&(e[n]=t[n]);return e}function p(t){return null==t?"":t}const g="undefined"!=typeof window;let h=g?()=>window.performance.now():()=>Date.now(),$=g?t=>requestAnimationFrame(t):t;const y=new Set;function v(t){y.forEach(e=>{e.c(t)||(y.delete(e),e.f())}),0!==y.size&&$(v)}function b(t){let e;return 0===y.size&&$(v),{promise:new Promise(n=>{y.add(e={c:t,f:n})}),abort(){y.delete(e)}}}function w(t,e){t.appendChild(e)}function k(t,e,n){t.insertBefore(e,n||null)}function x(t){t.parentNode.removeChild(t)}function C(t){return document.createElement(t)}function S(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function _(t){return document.createTextNode(t)}function M(){return _(" ")}function E(){return _("")}function N(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function A(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function T(t,e){for(const n in e)A(t,n,e[n])}function B(t){return Array.from(t.childNodes)}function R(t,e,n,o){for(let o=0;o<t.length;o+=1){const i=t[o];if(i.nodeName===e){let e=0;const r=[];for(;e<i.attributes.length;){const t=i.attributes[e++];n[t.name]||r.push(t.name)}for(let t=0;t<r.length;t++)i.removeAttribute(r[t]);return t.splice(o,1)[0]}}return o?S(e):C(e)}function z(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function F(t,e){t.value=null==e?"":e}function I(t,e,n,o){t.style.setProperty(e,n,o?"important":"")}let W;function O(){if(void 0===W){W=!1;try{"undefined"!=typeof window&&window.parent&&window.parent.document}catch(t){W=!0}}return W}function j(t,e){const n=document.createEvent("CustomEvent");return n.initCustomEvent(t,!1,!1,e),n}const H=new Set;let P,q=0;function D(t,e,n,o,i,r,s,l=0){const c=16.666/o;let a="{\n";for(let t=0;t<=1;t+=c){const o=e+(n-e)*r(t);a+=100*t+`%{${s(o,1-o)}}\n`}const u=a+`100% {${s(n,1-n)}}\n}`,d=`__svelte_${function(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}(u)}_${l}`,f=t.ownerDocument;H.add(f);const m=f.__svelte_stylesheet||(f.__svelte_stylesheet=f.head.appendChild(C("style")).sheet),p=f.__svelte_rules||(f.__svelte_rules={});p[d]||(p[d]=!0,m.insertRule(`@keyframes ${d} ${u}`,m.cssRules.length));const g=t.style.animation||"";return t.style.animation=`${g?`${g}, `:""}${d} ${o}ms linear ${i}ms 1 both`,q+=1,d}function L(t,e){const n=(t.style.animation||"").split(", "),o=n.filter(e?t=>t.indexOf(e)<0:t=>-1===t.indexOf("__svelte")),i=n.length-o.length;i&&(t.style.animation=o.join(", "),(q-=i)||$(()=>{q||(H.forEach(t=>{const e=t.__svelte_stylesheet;let n=e.cssRules.length;for(;n--;)e.deleteRule(n);t.__svelte_rules={}}),H.clear())}))}function J(t){const e=getComputedStyle(t);if("absolute"!==e.position&&"fixed"!==e.position){const{width:n,height:o}=e,i=t.getBoundingClientRect();t.style.position="absolute",t.style.width=n,t.style.height=o,function(t,e){const n=t.getBoundingClientRect();if(e.left!==n.left||e.top!==n.top){const o=getComputedStyle(t),i="none"===o.transform?"":o.transform;t.style.transform=`${i} translate(${e.left-n.left}px, ${e.top-n.top}px)`}}(t,i)}}function V(t){P=t}function G(){const t=function(){if(!P)throw new Error("Function called outside component initialization");return P}();return(e,n)=>{const o=t.$$.callbacks[e];if(o){const i=j(e,n);o.slice().forEach(e=>{e.call(t,i)})}}}const Y=[],K=[],Q=[],U=[],X=Promise.resolve();let Z=!1;function tt(t){Q.push(t)}let et=!1;const nt=new Set;function ot(){if(!et){et=!0;do{for(let t=0;t<Y.length;t+=1){const e=Y[t];V(e),it(e.$$)}for(V(null),Y.length=0;K.length;)K.pop()();for(let t=0;t<Q.length;t+=1){const e=Q[t];nt.has(e)||(nt.add(e),e())}Q.length=0}while(Y.length);for(;U.length;)U.pop()();Z=!1,et=!1,nt.clear()}}function it(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(tt)}}let rt;function st(t,e,n){t.dispatchEvent(j(`${e?"intro":"outro"}${n}`))}const lt=new Set;let ct;function at(){ct={r:0,c:[],p:ct}}function ut(){ct.r||r(ct.c),ct=ct.p}function dt(t,e){t&&t.i&&(lt.delete(t),t.i(e))}function ft(t,e,n,o){if(t&&t.o){if(lt.has(t))return;lt.add(t),ct.c.push(()=>{lt.delete(t),o&&(n&&t.d(1),o())}),t.o(e)}}const mt={duration:0};function pt(n,o,i,l){let c=o(n,i),a=l?0:1,u=null,d=null,f=null;function m(){f&&L(n,f)}function p(t,e){const n=t.b-a;return e*=Math.abs(n),{a:a,b:t.b,d:n,duration:e,start:t.start,end:t.start+e,group:t.group}}function g(o){const{delay:i=0,duration:s=300,easing:l=e,tick:g=t,css:$}=c||mt,y={start:h()+i,b:o};o||(y.group=ct,ct.r+=1),u||d?d=y:($&&(m(),f=D(n,a,o,s,i,l,$)),o&&g(0,1),u=p(y,s),tt(()=>st(n,o,"start")),b(t=>{if(d&&t>d.start&&(u=p(d,s),d=null,st(n,u.b,"start"),$&&(m(),f=D(n,a,u.b,u.duration,0,l,c.css))),u)if(t>=u.end)g(a=u.b,1-a),st(n,u.b,"end"),d||(u.b?m():--u.group.r||r(u.group.c)),u=null;else if(t>=u.start){const e=t-u.start;a=u.a+u.d*l(e/u.duration),g(a,1-a)}return!(!u&&!d)}))}return{run(t){s(c)?(rt||(rt=Promise.resolve()).then(()=>{rt=null}),rt).then(()=>{c=c(),g(t)}):g(t)},end(){m(),u=d=null}}}function gt(t,e){ft(t,1,1,()=>{e.delete(t.key)})}function ht(t,e){t.f(),gt(t,e)}function $t(t,e,n,o,i,r,s,l,c,a,u,d){let f=t.length,m=r.length,p=f;const g={};for(;p--;)g[t[p].key]=p;const h=[],$=new Map,y=new Map;for(p=m;p--;){const t=d(i,r,p),l=n(t);let c=s.get(l);c?o&&c.p(t,e):(c=a(l,t)).c(),$.set(l,h[p]=c),l in g&&y.set(l,Math.abs(p-g[l]))}const v=new Set,b=new Set;function w(t){dt(t,1),t.m(l,u),s.set(t.key,t),u=t.first,m--}for(;f&&m;){const e=h[m-1],n=t[f-1],o=e.key,i=n.key;e===n?(u=e.first,f--,m--):$.has(i)?!s.has(o)||v.has(o)?w(e):b.has(i)?f--:y.get(o)>y.get(i)?(b.add(o),w(e)):(v.add(i),f--):(c(n,s),f--)}for(;f--;){const e=t[f];$.has(e.key)||c(e,s)}for(;m;)w(h[m-1]);return h}function yt(t,e){const n={},o={},i={$$scope:1};let r=t.length;for(;r--;){const s=t[r],l=e[r];if(l){for(const t in s)t in l||(o[t]=1);for(const t in l)i[t]||(n[t]=l[t],i[t]=1);t[r]=l}else for(const t in s)i[t]=1}for(const t in o)t in n||(n[t]=void 0);return n}function vt(t){t&&t.c()}function bt(t,e,n){const{fragment:i,on_mount:l,on_destroy:c,after_update:a}=t.$$;i&&i.m(e,n),tt(()=>{const e=l.map(o).filter(s);c?c.push(...e):r(e),t.$$.on_mount=[]}),a.forEach(tt)}function wt(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function kt(t,e){-1===t.$$.dirty[0]&&(Y.push(t),Z||(Z=!0,X.then(ot)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function xt(e,n,o,s,l,c,a=[-1]){const u=P;V(e);const d=n.props||{},f=e.$$={fragment:null,ctx:null,props:c,update:t,not_equal:l,bound:i(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:[]),callbacks:i(),dirty:a,skip_bound:!1};let m=!1;if(f.ctx=o?o(e,d,(t,n,...o)=>{const i=o.length?o[0]:n;return f.ctx&&l(f.ctx[t],f.ctx[t]=i)&&(!f.skip_bound&&f.bound[t]&&f.bound[t](i),m&&kt(e,t)),n}):[],f.update(),m=!0,r(f.before_update),f.fragment=!!s&&s(f.ctx),n.target){if(n.hydrate){const t=B(n.target);f.fragment&&f.fragment.l(t),t.forEach(x)}else f.fragment&&f.fragment.c();n.intro&&dt(e.$$.fragment),bt(e,n.target,n.anchor),ot()}V(u)}class Ct{$destroy(){wt(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const St=[];function _t(t,e){return{subscribe:Mt(t,e).subscribe}}function Mt(e,n=t){let o;const i=[];function r(t){if(l(e,t)&&(e=t,o)){const t=!St.length;for(let t=0;t<i.length;t+=1){const n=i[t];n[1](),St.push(n,e)}if(t){for(let t=0;t<St.length;t+=2)St[t][0](St[t+1]);St.length=0}}}return{set:r,update:function(t){r(t(e))},subscribe:function(s,l=t){const c=[s,l];return i.push(c),1===i.length&&(o=n(r)||t),s(e),()=>{const t=i.indexOf(c);-1!==t&&i.splice(t,1),0===i.length&&(o(),o=null)}}}}function Et(t,e){localStorage.setItem(e,JSON.stringify(t))}function Nt(t){return localStorage.getItem(t)?JSON.parse(localStorage.getItem(t)):"myVersion"===t?"0":"sortReverse"===t?"false":"myStuff"===t?new Array:"totalContainers"===t?new Array:"unSaved"===t?{id:"",name:"",type:"",items:[["",!1]]}:"tmpCont"===t?{id:"",name:"",type:"",items:[["",!1]]}:void 0}const At=_t("0.11100"),Tt=Mt(!1),Bt=Mt("main"),Rt=Mt([]),zt=Mt({id:"",name:"",type:"",items:[["",!1]]}),Ft=Mt({id:"",name:"",type:"",items:[["",!1]]}),It=_t([["nadePink","#E9AFC3"],["lightBlue","#BCD3F2"],["ashGray","#C3D5C9"],["blizzardBlue","#AEE6EA"],["babyPink","#DFB9BA"],["columbiaBlue","#CADCE2"]]);function Wt(){var t;Rt.set(Nt("myStuff")),Bt.set((t="lastPage",localStorage.getItem(t)?JSON.parse(localStorage.getItem(t)):"main")),Ft.set(Nt("unSaved")),zt.set(Nt("tmpCont")),Tt.set(Nt("sortReverse"))}function Ot(){Tt.set(!a(Tt)),console.log("sortReverse is: ",a(Tt)),Et(a(Tt),"sortReverse")}function jt(t){var e;if(e=t,console.log(e),localStorage.setItem("lastPage",JSON.stringify(e)),"main"===t)return Bt.set("main"),void Wt();"newlist"!==t?"editlist"!==t?Bt.set("newlist"):Bt.set("editlist"):Bt.set("newlist")}function Ht(e){let n,o,i,r,s,l;return{c(){n=C("button"),o=_("My_Stuff "),i=C("span"),r=_(e[0]),I(i,"font-size","0.75rem"),I(i,"color","black"),I(i,"opacity","66%"),A(n,"id","main_link"),A(n,"class","svelte-lbio89")},m(t,c){k(t,n,c),w(n,o),w(n,i),w(i,r),s||(l=N(n,"click",e[1]),s=!0)},p(t,[e]){1&e&&z(r,t[0])},i:t,o:t,d(t){t&&x(n),s=!1,l()}}}function Pt(t,e,n){let o;u(t,At,t=>n(0,o=t));return[o,()=>jt("main")]}class qt extends Ct{constructor(t){super(),xt(this,t,Pt,Ht,l,{})}}function Dt(t,e,n,o="",i=!1){if(""==o)console.log("I am Creating new one"),Rt.update(o=>[...o,{id:o.length+Math.random(),name:t,type:e,items:n,interact:!1}]),Et({id:"",name:"",type:"",items:[["",!1]]},"unSaved");else{console.log("updating the container...");let r=a(Rt).findIndex(t=>t.id===o),s=a(Rt);s.splice(r,1,{id:o,name:t,type:e,items:n,interact:i}),Rt.update(()=>s.sort((t,e)=>t.id-e.id)),Et({id:"",name:"",type:"",items:[["",!1]]},"tmpCont")}Et(a(Rt),"myStuff")}function Lt(t){return t<.5?4*t*t*t:.5*Math.pow(2*t-2,3)+1}function Jt(t){const e=t-1;return e*e*e+1}function Vt(t,{delay:e=0,duration:n=400,easing:o=Lt,amount:i=5,opacity:r=0}){const s=getComputedStyle(t),l=+s.opacity,c="none"===s.filter?"":s.filter,a=l*(1-r);return{delay:e,duration:n,easing:o,css:(t,e)=>`opacity: ${l-a*e}; filter: ${c} blur(${e*i}px);`}}function Gt(t,{delay:n=0,duration:o=400,easing:i=e}){const r=+getComputedStyle(t).opacity;return{delay:n,duration:o,easing:i,css:t=>`opacity: ${t*r}`}}function Yt(t,{delay:e=0,duration:n=400,easing:o=Jt,x:i=0,y:r=0,opacity:s=0}){const l=getComputedStyle(t),c=+l.opacity,a="none"===l.transform?"":l.transform,u=c*(1-s);return{delay:e,duration:n,easing:o,css:(t,e)=>`\n\t\t\ttransform: ${a} translate(${(1-t)*i}px, ${(1-t)*r}px);\n\t\t\topacity: ${c-u*e}`}}function Kt(t,{delay:e=0,duration:n=400,easing:o=Jt}){const i=getComputedStyle(t),r=+i.opacity,s=parseFloat(i.height),l=parseFloat(i.paddingTop),c=parseFloat(i.paddingBottom),a=parseFloat(i.marginTop),u=parseFloat(i.marginBottom),d=parseFloat(i.borderTopWidth),f=parseFloat(i.borderBottomWidth);return{delay:e,duration:n,easing:o,css:t=>"overflow: hidden;"+`opacity: ${Math.min(20*t,1)*r};`+`height: ${t*s}px;`+`padding-top: ${t*l}px;`+`padding-bottom: ${t*c}px;`+`margin-top: ${t*a}px;`+`margin-bottom: ${t*u}px;`+`border-top-width: ${t*d}px;`+`border-bottom-width: ${t*f}px;`}}function Qt(e){let n,o,i,r,s,l,c,a,u,m;const p=e[3].default,g=function(t,e,n,o){if(t){const i=d(t,e,n,o);return t[0](i)}}(p,e,e[2],null),h=g||function(e){let n,o,i;return{c(){(n=C("button")).textContent="Close",A(n,"name","modal-close")},m(t,r){k(t,n,r),o||(i=N(n,"click",e[5]),o=!0)},p:t,d(t){t&&x(n),o=!1,i()}}}(e);return{c(){n=C("div"),i=M(),r=C("div"),s=_(e[0]),l=M(),h&&h.c(),A(n,"class","modal-bg svelte-1df7d0c"),A(r,"class","modal svelte-1df7d0c")},m(t,o){k(t,n,o),k(t,i,o),k(t,r,o),w(r,s),w(r,l),h&&h.m(r,null),a=!0,u||(m=N(n,"click",e[4]),u=!0)},p(t,[e]){(!a||1&e)&&z(s,t[0]),g&&g.p&&4&e&&f(g,p,t,t[2],e,null,null)},i(t){a||(tt(()=>{o||(o=pt(n,Vt,{amount:10},!0)),o.run(1)}),dt(h,t),tt(()=>{c||(c=pt(r,Yt,{y:300},!0)),c.run(1)}),a=!0)},o(t){o||(o=pt(n,Vt,{amount:10},!1)),o.run(0),ft(h,t),c||(c=pt(r,Yt,{y:300},!1)),c.run(0),a=!1},d(t){t&&x(n),t&&o&&o.end(),t&&x(i),t&&x(r),h&&h.d(t),t&&c&&c.end(),u=!1,m()}}}function Ut(t,e,n){let{$$slots:o={},$$scope:i}=e;const r=G();let{content:s}=e;return t.$$set=(t=>{"content"in t&&n(0,s=t.content),"$$scope"in t&&n(2,i=t.$$scope)}),[s,r,i,o,()=>r("cancel"),()=>r("close")]}class Xt extends Ct{constructor(t){super(),xt(this,t,Ut,Qt,l,{content:0})}}function Zt(t,e,n){const o=t.slice();return o[19]=e[n],o[20]=e,o[21]=n,o}function te(t){let e,n,o;return{c(){(e=C("button")).innerHTML='<div class="minus svelte-1ds5st4"></div>',A(e,"name","rem-item"),A(e,"class","svelte-1ds5st4")},m(i,r){k(i,e,r),n||(o=N(e,"click",function(){s(t[9].bind(this,t[21]))&&t[9].bind(this,t[21]).apply(this,arguments)}),n=!0)},p(e,n){t=e},d(t){t&&x(e),n=!1,o()}}}function ee(t,e){let n,o,i,s,l,c,a,u,d;function f(){e[13].call(o,e[20],e[21])}let m=0!=e[21]&&te(e);function p(...t){return e[14](e[19],...t)}return{key:t,first:null,c(){n=C("div"),o=C("input"),i=M(),m&&m.c(),s=M(),(l=C("button")).innerHTML='<div class="cross svelte-1ds5st4"></div>',A(o,"type","text"),A(o,"name","tmpitems"),A(o,"autocomplete","off"),A(o,"maxlength","48"),A(o,"placeholder",e[5]),o.required=!0,A(o,"class","svelte-1ds5st4"),A(l,"name","add-item"),A(l,"class","svelte-1ds5st4"),A(n,"class","itemslist svelte-1ds5st4"),this.first=n},m(t,r){k(t,n,r),w(n,o),F(o,e[19][0]),w(n,i),m&&m.m(n,null),w(n,s),w(n,l),a=!0,u||(d=[N(o,"input",f),N(l,"click",p)],u=!0)},p(t,i){e=t,(!a||32&i)&&A(o,"placeholder",e[5]),4&i&&o.value!==e[19][0]&&F(o,e[19][0]),0!=e[21]?m?m.p(e,i):((m=te(e)).c(),m.m(n,s)):m&&(m.d(1),m=null)},i(t){a||(t&&tt(()=>{c||(c=pt(n,Kt,{},!0)),c.run(1)}),a=!0)},o(t){t&&(c||(c=pt(n,Kt,{},!1)),c.run(0)),a=!1},d(t){t&&x(n),m&&m.d(),t&&c&&c.end(),u=!1,r(d)}}}function ne(e){let n,o,i;return{c(){(n=C("button")).textContent="Delete",A(n,"name","delete-container"),I(n,"color","red"),I(n,"background-color","#f5f5f6"),A(n,"class","svelte-1ds5st4")},m(t,r){k(t,n,r),o||(i=N(n,"click",e[15]),o=!0)},p:t,d(t){t&&x(n),o=!1,i()}}}function oe(t){let e,n;return(e=new Xt({props:{content:"Are you sure you wanna delete this container?",$$slots:{default:[ie]},$$scope:{ctx:t}}})).$on("cancel",t[17]),e.$on("close",t[18]),{c(){vt(e.$$.fragment)},m(t,o){bt(e,t,o),n=!0},p(t,n){const o={};4194320&n&&(o.$$scope={dirty:n,ctx:t}),e.$set(o)},i(t){n||(dt(e.$$.fragment,t),n=!0)},o(t){ft(e.$$.fragment,t),n=!1},d(t){wt(e,t)}}}function ie(e){let n,o,i,s,l,c,a,u;return{c(){n=C("br"),o=M(),i=C("div"),(s=C("button")).textContent="Yes",l=M(),(c=C("button")).textContent="No",I(s,"background-color","red"),A(s,"class","svelte-1ds5st4"),A(c,"class","svelte-1ds5st4"),A(i,"class","row-buttons svelte-1ds5st4")},m(t,r){k(t,n,r),k(t,o,r),k(t,i,r),w(i,s),w(i,l),w(i,c),a||(u=[N(s,"click",e[7],{once:!0}),N(c,"click",e[16])],a=!0)},p:t,d(t){t&&x(n),t&&x(o),t&&x(i),a=!1,r(u)}}}function re(t){let e,n,o,i,s,l,c,a,u,d,f,m,p,g,h,$,y,v=[],b=new Map,S=t[2];const _=t=>t[21];for(let e=0;e<S.length;e+=1){let n=Zt(t,S,e),o=_(n);b.set(o,v[e]=ee(o,n))}let T=t[3]&&ne(t),B=t[4]&&oe(t);return{c(){e=C("div"),n=C("label"),o=C("input"),i=M(),s=C("input"),l=M();for(let t=0;t<v.length;t+=1)v[t].c();c=M(),a=C("div"),T&&T.c(),u=M(),(d=C("button")).textContent="Save",p=M(),B&&B.c(),g=E(),A(o,"type","text"),A(o,"name","name"),A(o,"autocomplete","off"),A(o,"maxlength","28"),A(o,"placeholder","The Container Name"),o.required=!0,A(o,"class","svelte-1ds5st4"),A(s,"type","text"),A(s,"name","type"),A(s,"autocomplete","off"),A(s,"maxlength","32"),A(s,"placeholder","The Container Type"),s.required=!0,A(s,"class","svelte-1ds5st4"),A(d,"name","save-container"),A(d,"class","svelte-1ds5st4"),A(a,"class","buttons svelte-1ds5st4"),A(n,"class","svelte-1ds5st4"),A(e,"classname","create-new")},m(r,f){k(r,e,f),w(e,n),w(n,o),F(o,t[0]),w(n,i),w(n,s),F(s,t[1]),w(n,l);for(let t=0;t<v.length;t+=1)v[t].m(n,null);w(n,c),w(n,a),T&&T.m(a,null),w(a,u),w(a,d),k(r,p,f),B&&B.m(r,f),k(r,g,f),h=!0,$||(y=[N(o,"input",t[11]),N(s,"input",t[12]),N(d,"click",t[6],{once:!0})],$=!0)},p(t,[e]){if(1&e&&o.value!==t[0]&&F(o,t[0]),2&e&&s.value!==t[1]&&F(s,t[1]),804&e){const o=t[2];at(),v=$t(v,e,_,1,t,o,b,n,gt,ee,c,Zt),ut()}t[3]?T?T.p(t,e):((T=ne(t)).c(),T.m(a,u)):T&&(T.d(1),T=null),t[4]?B?(B.p(t,e),16&e&&dt(B,1)):((B=oe(t)).c(),dt(B,1),B.m(g.parentNode,g)):B&&(at(),ft(B,1,1,()=>{B=null}),ut())},i(t){if(!h){for(let t=0;t<S.length;t+=1)dt(v[t]);tt(()=>{f||(f=pt(a,Kt,{},!0)),f.run(1)}),tt(()=>{m||(m=pt(e,Kt,{duration:500},!0)),m.run(1)}),dt(B),h=!0}},o(t){for(let t=0;t<v.length;t+=1)ft(v[t]);f||(f=pt(a,Kt,{},!1)),f.run(0),m||(m=pt(e,Kt,{duration:500},!1)),m.run(0),ft(B),h=!1},d(t){t&&x(e);for(let t=0;t<v.length;t+=1)v[t].d();T&&T.d(),t&&f&&f.end(),t&&m&&m.end(),t&&x(p),B&&B.d(t),t&&x(g),$=!1,r(y)}}}function se(t,e,n){let{id:o=""}=e,{name:i=""}=e,{type:r=""}=e,{items:s=[["",!1]]}=e,{editt:l=!1}=e,c=!1,u="Start adding items to your container!";function d(t){""!==s[s.length-1][0]&&(n(2,s[s.length-1]=[t,!1],s),n(2,s=[...s,["",!1]]))}return t.$$set=(t=>{"id"in t&&n(10,o=t.id),"name"in t&&n(0,i=t.name),"type"in t&&n(1,r=t.type),"items"in t&&n(2,s=t.items),"editt"in t&&n(3,l=t.editt)}),t.$$.update=(()=>{4&t.$$.dirty&&s.length>1&&n(5,u="And another one"),15&t.$$.dirty&&(console.log(i+":"+r+":"+s),Et({name:i,type:r,items:s},l?"tmpCont":"unSaved"),console.log("the last item is::::::::::::::::::::::",s.slice(-1)[1])),4&t.$$.dirty&&console.log(s.length+" items:"+s)}),[i,r,s,l,c,u,function(){i&&r&&s&&(""===s[s.length-1][0]&&s.splice(s.length-1,1),!0===s[s.length-1][1]&&n(2,s[s.length-1][1]=!1,s),Dt(i,r,s,o),console.log("handleSubmitted"),jt("main"),n(3,l=!1))},function(){!function(t){let e=a(Rt).findIndex(e=>e.id===t),n=a(Rt);n.splice(e,1),Rt.update(()=>n.sort((t,e)=>t.id-e.id)),Et({id:"",name:"",type:"",items:[["",!1]]},"tmpCont"),Et(a(Rt),"myStuff")}(o),jt("main")},d,function(t){console.log(t+" th item deleted"),n(2,s=s.filter((e,n)=>n!==t))},o,function(){i=this.value,n(0,i)},function(){r=this.value,n(1,r)},function(t,e){t[e][0]=this.value,n(2,s)},t=>d(t[0]),()=>n(4,c=!0),()=>n(4,c=!1),()=>n(4,c=!1),()=>n(4,c=!1)]}class le extends Ct{constructor(t){super(),xt(this,t,se,re,l,{id:10,name:0,type:1,items:2,editt:3})}}function ce(t,e,n){const o=t.slice();return o[13]=e[n],o[15]=n,o}function ae(t){let e,n,o,i,s,l,c,a,u,d,f,m,g,h;function $(t,e){return t[7]==t[8]?de:ue}let y=$(t),v=y(t),b=t[0],S=[];for(let e=0;e<b.length;e+=1)S[e]=fe(ce(t,b,e));return{c(){e=C("div"),v.c(),n=M(),o=C("ul");for(let t=0;t<S.length;t+=1)S[t].c();i=M(),s=C("div"),(l=C("button")).textContent="Edit",c=M(),a=C("div"),u=_("Interactive Mode"),A(o,"class","item-list svelte-ympn4c"),A(l,"class","edit-button svelte-ympn4c"),A(l,"name","edit-button"),A(a,"class",d=p(t[1]?"interactive-text-on":"interactive-text-off")+" svelte-ympn4c"),A(s,"class","options svelte-ympn4c"),A(e,"class","details svelte-ympn4c")},m(r,d){k(r,e,d),v.m(e,null),w(e,n),w(e,o);for(let t=0;t<S.length;t+=1)S[t].m(o,null);w(e,i),w(e,s),w(s,l),w(s,c),w(s,a),w(a,u),m=!0,g||(h=[N(l,"click",t[6]),N(a,"click",t[10])],g=!0)},p(t,i){if(y===(y=$(t))&&v?v.p(t,i):(v.d(1),(v=y(t))&&(v.c(),v.m(e,n))),2049&i){let e;for(b=t[0],e=0;e<b.length;e+=1){const n=ce(t,b,e);S[e]?S[e].p(n,i):(S[e]=fe(n),S[e].c(),S[e].m(o,null))}for(;e<S.length;e+=1)S[e].d(1);S.length=b.length}(!m||2&i&&d!==(d=p(t[1]?"interactive-text-on":"interactive-text-off")+" svelte-ympn4c"))&&A(a,"class",d)},i(t){m||(tt(()=>{f||(f=pt(e,Yt,{y:-10,duration:200},!0)),f.run(1)}),m=!0)},o(t){f||(f=pt(e,Yt,{y:-10,duration:200},!1)),f.run(0),m=!1},d(t){t&&x(e),v.d(),function(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}(S,t),t&&f&&f.end(),g=!1,r(h)}}}function ue(t){let e,n,o,i,r,s,l;return{c(){e=C("span"),n=_(t[4]),o=_(" | "),i=_(t[7]),r=_(" / "),s=_(t[8]),l=_(" Stuff")},m(t,c){k(t,e,c),w(e,n),w(e,o),w(e,i),w(e,r),w(e,s),w(e,l)},p(t,e){16&e&&z(n,t[4]),128&e&&z(i,t[7])},d(t){t&&x(e)}}}function de(t){let e,n,o,i,r;return{c(){e=C("span"),n=_(t[4]),o=_(" | "),i=_(t[8]),r=_(" Stuff here")},m(t,s){k(t,e,s),w(e,n),w(e,o),w(e,i),w(e,r)},p(t,e){16&e&&z(n,t[4])},d(t){t&&x(e)}}}function fe(t){let e,n,o,i,r,s=t[13][0]+"";return{c(){e=C("li"),n=_(s),A(e,"class",o=p(t[13][1]?"item-not-red":"item-red")+" svelte-ympn4c")},m(o,s){k(o,e,s),w(e,n),i||(r=N(e,"click",t[11].bind(this,t[15])),i=!0)},p(i,r){t=i,1&r&&s!==(s=t[13][0]+"")&&z(n,s),1&r&&o!==(o=p(t[13][1]?"item-not-red":"item-red")+" svelte-ympn4c")&&A(e,"class",o)},d(t){t&&x(e),i=!1,r()}}}function me(t){let e,n,o,i,r,s,l,c,a,u,d=!t[2]&&ae(t);return{c(){e=C("div"),n=C("div"),o=_(t[3]),i=M(),r=C("hr"),s=M(),d&&d.c(),A(n,"id","name"),A(n,"class","svelte-ympn4c"),I(r,"width","90%"),I(r,"border-color","#e1e2e186"),A(e,"class",l=p(t[1]?"containersum containersum-on":"containersum containersum-off")+" svelte-ympn4c"),I(e,"--container-color-off",t[5]),I(e,"--container-color-on",pe)},m(l,f){k(l,e,f),w(e,n),w(n,o),w(e,i),w(e,r),w(e,s),d&&d.m(e,null),c=!0,a||(u=N(n,"click",t[9]),a=!0)},p(t,[n]){(!c||8&n)&&z(o,t[3]),t[2]?d&&(at(),ft(d,1,1,()=>{d=null}),ut()):d?(d.p(t,n),4&n&&dt(d,1)):((d=ae(t)).c(),dt(d,1),d.m(e,null)),(!c||2&n&&l!==(l=p(t[1]?"containersum containersum-on":"containersum containersum-off")+" svelte-ympn4c"))&&A(e,"class",l),(!c||32&n)&&I(e,"--container-color-off",t[5])},i(t){c||(dt(d),c=!0)},o(t){ft(d),c=!1},d(t){t&&x(e),d&&d.d(),a=!1,u()}}}let pe="#CADCE2";function ge(t,e,n){let o,{id:i=""}=e,{name:r="TestName"}=e,{type:s="TestType"}=e,{items:l=["sugar",!1]}=e,{interact:c=!1}=e,{containerColor:a="#e6e6e9"}=e,u=l.length,{isSum:d=!0}=e;return t.$$set=(t=>{"id"in t&&n(12,i=t.id),"name"in t&&n(3,r=t.name),"type"in t&&n(4,s=t.type),"items"in t&&n(0,l=t.items),"interact"in t&&n(1,c=t.interact),"containerColor"in t&&n(5,a=t.containerColor),"isSum"in t&&n(2,d=t.isSum)}),t.$$.update=(()=>{129&t.$$.dirty&&(n(7,o=l.filter(t=>!t[1]).length),console.log("remaining is:",o)),2&t.$$.dirty&&console.log("interaction is: ",c)}),[l,c,d,r,s,a,function(){!function(t,e,n,o){console.log("tmpContis: "+o),zt.set({name:t,type:e,items:n,id:o}),console.log(zt)}(r,s,l,i),jt("editlist"),console.log("handleSubmitted by editCont")},o,u,function(){n(2,d=!d)},function(){n(1,c=!c),Dt(r,s,l,i,c)},function(t){c&&(n(0,l[t][1]=!l[t][1],l),Dt(r,s,l,i,c))},i]}class he extends Ct{constructor(t){super(),xt(this,t,ge,me,l,{id:12,name:3,type:4,items:0,interact:1,containerColor:5,isSum:2,editHandle:6})}get editHandle(){return this.$$.ctx[6]}}function $e(t,e,n){const o=getComputedStyle(t),i="none"===o.transform?"":o.transform,r=e.from.width/t.clientWidth,l=e.from.height/t.clientHeight,c=(e.from.left-e.to.left)/r,a=(e.from.top-e.to.top)/l,u=Math.sqrt(c*c+a*a),{delay:d=0,duration:f=(t=>120*Math.sqrt(t)),easing:m=Jt}=n;return{delay:d,duration:s(f)?f(u):f,easing:m,css:(t,e)=>`transform: ${i} translate(${e*c}px, ${e*a}px);`}}function ye(e){let o,i,r,s,l,c=[{fill:"#000000"},{xmlns:"http://www.w3.org/2000/svg"},{viewBox:"0 0 50 50"},{width:"50px"},{height:"50px"},e[0]],a={};for(let t=0;t<c.length;t+=1)a=n(a,c[t]);return{c(){o=S("svg"),i=S("path"),r=S("path"),s=S("path"),l=S("path"),this.h()},l(t){var e=B(o=R(t,"svg",{fill:!0,xmlns:!0,viewBox:!0,width:!0,height:!0},1));B(i=R(e,"path",{fill:!0,stroke:!0,"stroke-miterlimit":!0,"stroke-width":!0,d:!0},1)).forEach(x),B(r=R(e,"path",{fill:!0,stroke:!0,"stroke-linecap":!0,"stroke-linejoin":!0,"stroke-miterlimit":!0,d:!0},1)).forEach(x),B(s=R(e,"path",{fill:!0,stroke:!0,"stroke-miterlimit":!0,"stroke-width":!0,d:!0},1)).forEach(x),B(l=R(e,"path",{fill:!0,stroke:!0,"stroke-miterlimit":!0,"stroke-width":!0,d:!0},1)).forEach(x),e.forEach(x),this.h()},h(){A(i,"fill","none"),A(i,"stroke","#858383"),A(i,"stroke-miterlimit","10"),A(i,"stroke-width","2"),A(i,"d","M3,25c0,12.148,9.852,22,22,22s22-9.852,22-22S37.148,3,25,3S3,12.852,3,25z"),A(r,"fill","none"),A(r,"stroke","#858383"),A(r,"stroke-linecap","round"),A(r,"stroke-linejoin","round"),A(r,"stroke-miterlimit","10"),A(r,"d","M38 25.655c4.51-.282 7.58-.017 9 .163M37.401 27.519c5.169 0 8.498.675 9.699.967M3 25.802c1.42-.181 4.49-.445 9-.163M2.999 28.476c1.199-.292 4.528-.968 9.701-.968"),A(s,"fill","none"),A(s,"stroke","#858383"),A(s,"stroke-miterlimit","10"),A(s,"stroke-width","2"),A(s,"d","M36.3 18.6c.5-1.6 1.3-5.2-.2-6.6-2.7 0-4.6 1.3-5.5 2.1C29 13.4 27.1 13 25 13s-4 .4-5.7 1.1c-.9-.8-2.8-2.1-5.5-2.1-1.4 1.3-.7 4.9-.2 6.6-1.1 1.5-1.7 3.3-1.7 5 0 5.5 4.2 9.4 13 9.4s13-3.9 13-9.4C38 21.8 37.4 20.1 36.3 18.6zM19 39c0 0-3 0-3.6 0-1.5 0-2.8-.6-3.4-1.8-.7-1.3-1-3.5-2.8-4.7C8.9 32.3 9.1 32 9.7 32c.6.1 1.9.9 2.7 2 .9 1.1 1.8 2 3.4 2s3.8.1 4.5-.7"),A(l,"fill","none"),A(l,"stroke","#858383"),A(l,"stroke-miterlimit","10"),A(l,"stroke-width","2"),A(l,"d","M31,45.7v-6.1c0-2.7-1.9-6.5-4.5-6.5h-2.8c-2.6,0-4.7,3.8-4.7,6.5V46"),T(o,a)},m(t,e){k(t,o,e),w(o,i),w(o,r),w(o,s),w(o,l)},p(t,[e]){T(o,a=yt(c,[{fill:"#000000"},{xmlns:"http://www.w3.org/2000/svg"},{viewBox:"0 0 50 50"},{width:"50px"},{height:"50px"},1&e&&t[0]]))},i:t,o:t,d(t){t&&x(o)}}}function ve(t,e,o){return t.$$set=(t=>{o(0,e=n(n({},e),m(t)))}),[e=m(e)]}class be extends Ct{constructor(t){super(),xt(this,t,ve,ye,l,{})}}function we(t,e,n){const o=t.slice();return o[5]=e[n],o[7]=n,o}function ke(t){let e;return{c(){(e=C("div")).innerHTML="<div>Welcome to MyStuff! Start adding Containers to the app using the plus button so you\n                can keep track of stuff you have, even when you forgot the app remembers!</div> \n            \n            <div>This app saves all data to your local store so all your data is on your device.</div>",A(e,"class","welcome svelte-1nk04k1")},m(t,n){k(t,e,n)},d(t){t&&x(e)}}}function xe(o,i){let r,s,l,c,a=t;const u=[i[5]];let d={};for(let t=0;t<u.length;t+=1)d=n(d,u[t]);return s=new he({props:d}),{key:o,first:null,c(){r=C("div"),vt(s.$$.fragment),this.first=r},m(t,e){k(t,r,e),bt(s,r,null),c=!0},p(t,e){const n=1&e?yt(u,[(o=t[5],"object"==typeof o&&null!==o?o:{})]):{};var o;s.$set(n)},r(){l=r.getBoundingClientRect()},f(){J(r),a()},a(){a(),a=function(n,o,i,r){if(!o)return t;const s=n.getBoundingClientRect();if(o.left===s.left&&o.right===s.right&&o.top===s.top&&o.bottom===s.bottom)return t;const{delay:l=0,duration:c=300,easing:a=e,start:u=h()+l,end:d=u+c,tick:f=t,css:m}=i(n,{from:o,to:s},r);let p,g=!0,$=!1;function y(){m&&L(n,p),g=!1}return b(t=>{if(!$&&t>=u&&($=!0),$&&t>=d&&(f(1,0),y()),!g)return!1;if($){const e=0+1*a((t-u)/c);f(e,1-e)}return!0}),m&&(p=D(n,0,1,c,l,a,m)),l||($=!0),f(0,1),y}(r,l,$e,{duration:200})},i(t){c||(dt(s.$$.fragment,t),c=!0)},o(t){ft(s.$$.fragment,t),c=!1},d(t){t&&x(r),wt(s)}}}function Ce(t){let e,n,o,i;return n=new be({}),{c(){e=C("a"),vt(n.$$.fragment),A(e,"class","github svelte-1nk04k1"),A(e,"href","https://github.com/gageracer/myStuff"),A(e,"target","_blank"),A(e,"type","image/svg+xml")},m(t,o){k(t,e,o),bt(n,e,null),i=!0},i(t){i||(dt(n.$$.fragment,t),tt(()=>{o||(o=pt(e,Gt,{},!0)),o.run(1)}),i=!0)},o(t){ft(n.$$.fragment,t),o||(o=pt(e,Gt,{},!1)),o.run(0),i=!1},d(t){t&&x(e),wt(n),t&&o&&o.end()}}}function Se(t){let e,n,o,i=[],r=new Map,s=t[0];const l=t=>t[5].id;for(let e=0;e<s.length;e+=1){let n=we(t,s,e),o=l(n);r.set(o,i[e]=xe(o,n))}let c=null;s.length||(c=ke());let a=t[1]&&Ce();return{c(){for(let t=0;t<i.length;t+=1)i[t].c();c&&c.c(),e=M(),a&&a.c(),n=E()},m(t,r){for(let e=0;e<i.length;e+=1)i[e].m(t,r);c&&c.m(t,r),k(t,e,r),a&&a.m(t,r),k(t,n,r),o=!0},p(t,[o]){if(1&o){const n=t[0];at();for(let t=0;t<i.length;t+=1)i[t].r();i=$t(i,o,l,1,t,n,r,e.parentNode,ht,xe,e,we);for(let t=0;t<i.length;t+=1)i[t].a();ut(),n.length?c&&(c.d(1),c=null):c||((c=ke()).c(),c.m(e.parentNode,e))}t[1]?a?2&o&&dt(a,1):((a=Ce()).c(),dt(a,1),a.m(n.parentNode,n)):a&&(at(),ft(a,1,1,()=>{a=null}),ut())},i(t){if(!o){for(let t=0;t<s.length;t+=1)dt(i[t]);dt(a),o=!0}},o(t){for(let t=0;t<i.length;t+=1)ft(i[t]);ft(a),o=!1},d(t){for(let e=0;e<i.length;e+=1)i[e].d(t);c&&c.d(t),t&&x(e),a&&a.d(t),t&&x(n)}}}function _e(t,e,n){let o,i;u(t,Tt,t=>n(2,o=t)),u(t,It,t=>n(3,i=t));let r=a(Tt)?a(Rt).reverse():a(Rt),s=!1;setTimeout(()=>{n(1,s=!0)},3e3);return console.log(i),t.$$.update=(()=>{5&t.$$.dirty&&n(0,r=r.reverse())}),[r,s]}class Me extends Ct{constructor(t){super(),xt(this,t,_e,Se,l,{})}}function Ee(e){let n,o,i;return{c(){(n=C("button")).innerHTML="<div>Sort</div>",A(n,"id","sort-reverse"),A(n,"class","svelte-1ykcag7")},m(t,e){k(t,n,e),o||(i=N(n,"click",Ot),o=!0)},p:t,d(t){t&&x(n),o=!1,i()}}}function Ne(e){let n,o,i;return{c(){(n=C("button")).innerHTML='<div id="cross" aria-hidden="true" class="svelte-1ykcag7"></div>',A(n,"id","menu-edit-create"),A(n,"name","new-list"),A(n,"aria-label","Create Container"),A(n,"class","svelte-1ykcag7")},m(t,r){k(t,n,r),o||(i=N(n,"click",e[1]),o=!0)},p:t,d(t){t&&x(n),o=!1,i()}}}function Ae(e){let n;function o(t,e){return"newlist"===t[0]?Ne:"sortReverse"===t[0]?Ee:void 0}let i=o(e),r=i&&i(e);return{c(){r&&r.c(),n=E()},m(t,e){r&&r.m(t,e),k(t,n,e)},p(t,[e]){i===(i=o(t))&&r?r.p(t,e):(r&&r.d(1),(r=i&&i(t))&&(r.c(),r.m(n.parentNode,n)))},i:t,o:t,d(t){r&&r.d(t),t&&x(n)}}}function Te(t,e,n){let{button:o}=e;return t.$$set=(t=>{"button"in t&&n(0,o=t.button)}),[o,()=>jt(o)]}class Be extends Ct{constructor(t){super(),xt(this,t,Te,Ae,l,{button:0})}}function Re(e){let n,o,i,r,s,l,c,a,u,d;return o=new Me({}),r=new Be({props:{button:"newlist"}}),l=new Be({props:{button:"sortReverse"}}),{c(){n=C("div"),vt(o.$$.fragment),i=M(),vt(r.$$.fragment),s=M(),vt(l.$$.fragment),A(n,"class","content svelte-fzfq20")},m(t,c){k(t,n,c),bt(o,n,null),w(n,i),bt(r,n,null),w(n,s),bt(l,n,null),a=!0,u||(d=N(n,"outroend",e[6]),u=!0)},p:t,i(t){a||(dt(o.$$.fragment,t),dt(r.$$.fragment,t),dt(l.$$.fragment,t),tt(()=>{c||(c=pt(n,Kt,{duration:500},!0)),c.run(1)}),a=!0)},o(t){ft(o.$$.fragment,t),ft(r.$$.fragment,t),ft(l.$$.fragment,t),c||(c=pt(n,Kt,{duration:500},!1)),c.run(0),a=!1},d(t){t&&x(n),wt(o),wt(r),wt(l),t&&c&&c.end(),u=!1,d()}}}function ze(t){let e,n,o;var i=le;function r(t){return{props:{name:t[3].name,type:t[3].type,items:t[3].items,id:t[3].id,editt:!0}}}return i&&(e=new i(r(t))),{c(){e&&vt(e.$$.fragment),n=E()},m(t,i){e&&bt(e,t,i),k(t,n,i),o=!0},p(t,o){const s={};if(8&o&&(s.name=t[3].name),8&o&&(s.type=t[3].type),8&o&&(s.items=t[3].items),8&o&&(s.id=t[3].id),i!==(i=le)){if(e){at();const t=e;ft(t.$$.fragment,1,0,()=>{wt(t,1)}),ut()}i?(vt((e=new i(r(t))).$$.fragment),dt(e.$$.fragment,1),bt(e,n.parentNode,n)):e=null}else i&&e.$set(s)},i(t){o||(e&&dt(e.$$.fragment,t),o=!0)},o(t){e&&ft(e.$$.fragment,t),o=!1},d(t){t&&x(n),e&&wt(e,t)}}}function Fe(t){let e,n,o;var i=le;function r(t){return{props:{name:t[2].name,type:t[2].type,items:t[2].items,editt:!1}}}return i&&(e=new i(r(t))),{c(){e&&vt(e.$$.fragment),n=E()},m(t,i){e&&bt(e,t,i),k(t,n,i),o=!0},p(t,o){const s={};if(4&o&&(s.name=t[2].name),4&o&&(s.type=t[2].type),4&o&&(s.items=t[2].items),i!==(i=le)){if(e){at();const t=e;ft(t.$$.fragment,1,0,()=>{wt(t,1)}),ut()}i?(vt((e=new i(r(t))).$$.fragment),dt(e.$$.fragment,1),bt(e,n.parentNode,n)):e=null}else i&&e.$set(s)},i(t){o||(e&&dt(e.$$.fragment,t),o=!0)},o(t){e&&ft(e.$$.fragment,t),o=!1},d(t){t&&x(n),e&&wt(e,t)}}}function Ie(t){let e,n,o,i;const r=[Fe,ze,Re],s=[];function l(t,e){return"newlist"===t[1]?0:"editlist"===t[1]?1:2}return e=l(t),n=s[e]=r[e](t),{c(){n.c(),o=E()},m(t,n){s[e].m(t,n),k(t,o,n),i=!0},p(t,[i]){let c=e;(e=l(t))===c?s[e].p(t,i):(at(),ft(s[c],1,1,()=>{s[c]=null}),ut(),(n=s[e])||(n=s[e]=r[e](t)).c(),dt(n,1),n.m(o.parentNode,o))},i(t){i||(dt(n),i=!0)},o(t){ft(n),i=!1},d(t){s[e].d(t),t&&x(o)}}}function We(t,e,n){let o,i,r,s;u(t,Bt,t=>n(1,o=t)),u(t,Ft,t=>n(2,i=t)),u(t,zt,t=>n(3,r=t));let l,{w:c}=e,{h:a}=e;return t.$$set=(t=>{"w"in t&&n(4,c=t.w),"h"in t&&n(5,a=t.h)}),t.$$.update=(()=>{1&t.$$.dirty&&console.log(s),2&t.$$.dirty&&console.log("Current page is: "+o),48&t.$$.dirty&&(l=(c/a).toFixed(2))}),[s,o,i,r,c,a,()=>n(0,s="outro ended")]}class Oe extends Ct{constructor(t){super(),xt(this,t,We,Ie,l,{w:4,h:5})}}function je(t){let e,n,o,i,r,s;return n=new qt({}),i=new Oe({props:{w:t[0],h:t[1]}}),{c(){e=C("main"),vt(n.$$.fragment),o=M(),vt(i.$$.fragment),A(e,"alt","Main Page"),A(e,"class","svelte-12e4uyx"),tt(()=>t[2].call(e))},m(l,c){k(l,e,c),bt(n,e,null),w(e,o),bt(i,e,null),r=function(t,e){const n=getComputedStyle(t),o=(parseInt(n.zIndex)||0)-1;"static"===n.position&&(t.style.position="relative");const i=C("iframe");i.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; "+`overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: ${o};`),i.setAttribute("aria-hidden","true"),i.tabIndex=-1;const r=O();let s;return r?(i.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",s=N(window,"message",t=>{t.source===i.contentWindow&&e()})):(i.src="about:blank",i.onload=(()=>{s=N(i.contentWindow,"resize",e)})),w(t,i),()=>{r?s():s&&i.contentWindow&&s(),x(i)}}(e,t[2].bind(e)),s=!0},p(t,[e]){const n={};1&e&&(n.w=t[0]),2&e&&(n.h=t[1]),i.$set(n)},i(t){s||(dt(n.$$.fragment,t),dt(i.$$.fragment,t),s=!0)},o(t){ft(n.$$.fragment,t),ft(i.$$.fragment,t),s=!1},d(t){t&&x(e),wt(n),wt(i),r()}}}function He(t,e,n){let o,i;return Wt(),t.$$.update=(()=>{3&t.$$.dirty&&console.log("main w and h: ",o," ",i)}),[o,i,function(){o=this.clientWidth,i=this.clientHeight,n(0,o),n(1,i)}]}"serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("serviceWorker.js").then(t=>console.log("service worker registered")).catch(t=>console.log("service worker not registered",t))});export default new class extends Ct{constructor(t){super(),xt(this,t,He,je,l,{})}}({target:document.body,props:{}});
//# sourceMappingURL=main.js.map
