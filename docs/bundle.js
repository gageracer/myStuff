var app=function(){"use strict";function t(){}const e=t=>t;function n(t,e){for(const n in e)t[n]=e[n];return t}function o(t){return t()}function i(){return Object.create(null)}function r(t){t.forEach(o)}function s(t){return"function"==typeof t}function l(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function a(t,e){const n=t.subscribe(e);return n.unsubscribe?()=>n.unsubscribe():n}function c(t){let e;return a(t,t=>e=t)(),e}function u(t,e,n){t.$$.on_destroy.push(a(e,n))}function d(t,e,o){return t[1]?n({},n(e.$$scope.ctx,t[1](o?o(e):{}))):e.$$scope.ctx}const m="undefined"!=typeof window;let f=m?()=>window.performance.now():()=>Date.now(),p=m?t=>requestAnimationFrame(t):t;const h=new Set;let $,g=!1;function y(){h.forEach(t=>{t[0](f())||(h.delete(t),t[1]())}),(g=h.size>0)&&p(y)}function v(t){let e;return g||(g=!0,p(y)),{promise:new Promise(n=>{h.add(e=[t,n])}),abort(){h.delete(e)}}}function b(t,e){t.appendChild(e)}function w(t,e,n){t.insertBefore(e,n||null)}function S(t){t.parentNode.removeChild(t)}function _(t){return document.createElement(t)}function C(t){return document.createTextNode(t)}function x(){return C(" ")}function k(){return C("")}function M(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function E(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function z(t,e){e=""+e,t.data!==e&&(t.data=e)}function N(t,e){(null!=e||t.value)&&(t.value=e)}function I(t,e,n,o){t.style.setProperty(e,n,o?"important":"")}let O,T=0,A={};function j(t,e,n,o,i,r,s,l=0){const a=16.666/o;let c="{\n";for(let t=0;t<=1;t+=a){const o=e+(n-e)*r(t);c+=100*t+`%{${s(o,1-o)}}\n`}const u=c+`100% {${s(n,1-n)}}\n}`,d=`__svelte_${function(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}(u)}_${l}`;if(!A[d]){if(!$){const t=_("style");document.head.appendChild(t),$=t.sheet}A[d]=!0,$.insertRule(`@keyframes ${d} ${u}`,$.cssRules.length)}const m=t.style.animation||"";return t.style.animation=`${m?`${m}, `:""}${d} ${o}ms linear ${i}ms 1 both`,T+=1,d}function R(t,e){t.style.animation=(t.style.animation||"").split(", ").filter(e?t=>t.indexOf(e)<0:t=>-1===t.indexOf("__svelte")).join(", "),e&&!--T&&p(()=>{if(T)return;let t=$.cssRules.length;for(;t--;)$.deleteRule(t);A={}})}function q(t,e){const n=t.getBoundingClientRect();if(e.left!==n.left||e.top!==n.top){const o=getComputedStyle(t),i="none"===o.transform?"":o.transform;t.style.transform=`${i} translate(${e.left-n.left}px, ${e.top-n.top}px)`}}function H(t){O=t}const B=[],L=[],P=[],J=[],D=Promise.resolve();let W,F=!1;function V(t){P.push(t)}function Y(){const t=new Set;do{for(;B.length;){const t=B.shift();H(t),G(t.$$)}for(;L.length;)L.pop()();for(let e=0;e<P.length;e+=1){const n=P[e];t.has(n)||(n(),t.add(n))}P.length=0}while(B.length);for(;J.length;)J.pop()();F=!1}function G(t){t.fragment&&(t.update(t.dirty),r(t.before_update),t.fragment.p(t.dirty,t.ctx),t.dirty=null,t.after_update.forEach(V))}function K(){return W||(W=Promise.resolve()).then(()=>{W=null}),W}function Q(t,e,n){t.dispatchEvent(function(t,e){const n=document.createEvent("CustomEvent");return n.initCustomEvent(t,!1,!1,e),n}(`${e?"intro":"outro"}${n}`))}const U=new Set;let X;function Z(){X={r:0,c:[],p:X}}function tt(){X.r||r(X.c),X=X.p}function et(t,e){t&&t.i&&(U.delete(t),t.i(e))}function nt(t,e,n,o){if(t&&t.o){if(U.has(t))return;U.add(t),X.c.push(()=>{U.delete(t),o&&(n&&t.d(1),o())}),t.o(e)}}const ot={duration:0};function it(n,o,i){let r,l,a=o(n,i),c=!1,u=0;function d(){r&&R(n,r)}function m(){const{delay:o=0,duration:i=300,easing:s=e,tick:m=t,css:p}=a||ot;p&&(r=j(n,0,1,i,o,s,p,u++)),m(0,1);const h=f()+o,$=h+i;l&&l.abort(),c=!0,V(()=>Q(n,!0,"start")),l=v(t=>{if(c){if(t>=$)return m(1,0),Q(n,!0,"end"),d(),c=!1;if(t>=h){const e=s((t-h)/i);m(e,1-e)}}return c})}let p=!1;return{start(){p||(R(n),s(a)?(a=a(),K().then(m)):m())},invalidate(){p=!1},end(){c&&(d(),c=!1)}}}function rt(n,o,i){let l,a=o(n,i),c=!0;const u=X;function d(){const{delay:o=0,duration:i=300,easing:s=e,tick:d=t,css:m}=a||ot;m&&(l=j(n,1,0,i,o,s,m));const p=f()+o,h=p+i;V(()=>Q(n,!1,"start")),v(t=>{if(c){if(t>=h)return d(0,1),Q(n,!1,"end"),--u.r||r(u.c),!1;if(t>=p){const e=s((t-p)/i);d(1-e,e)}}return c})}return u.r+=1,s(a)?K().then(()=>{a=a(),d()}):d(),{end(t){t&&a.tick&&a.tick(1,0),c&&(l&&R(n,l),c=!1)}}}function st(n,o,i,l){let a=o(n,i),c=l?0:1,u=null,d=null,m=null;function p(){m&&R(n,m)}function h(t,e){const n=t.b-c;return e*=Math.abs(n),{a:c,b:t.b,d:n,duration:e,start:t.start,end:t.start+e,group:t.group}}function $(o){const{delay:i=0,duration:s=300,easing:l=e,tick:$=t,css:g}=a||ot,y={start:f()+i,b:o};o||(y.group=X,X.r+=1),u?d=y:(g&&(p(),m=j(n,c,o,s,i,l,g)),o&&$(0,1),u=h(y,s),V(()=>Q(n,o,"start")),v(t=>{if(d&&t>d.start&&(u=h(d,s),d=null,Q(n,u.b,"start"),g&&(p(),m=j(n,c,u.b,u.duration,0,l,a.css))),u)if(t>=u.end)$(c=u.b,1-c),Q(n,u.b,"end"),d||(u.b?p():--u.group.r||r(u.group.c)),u=null;else if(t>=u.start){const e=t-u.start;c=u.a+u.d*l(e/u.duration),$(c,1-c)}return!(!u&&!d)}))}return{run(t){s(a)?K().then(()=>{a=a(),$(t)}):$(t)},end(){p(),u=d=null}}}function lt(t,e){nt(t,1,1,()=>{e.delete(t.key)})}function at(t,e){t.f(),lt(t,e)}function ct(t,e,n,o,i,r,s,l,a,c,u,d){let m=t.length,f=r.length,p=m;const h={};for(;p--;)h[t[p].key]=p;const $=[],g=new Map,y=new Map;for(p=f;p--;){const t=d(i,r,p),l=n(t);let a=s.get(l);a?o&&a.p(e,t):(a=c(l,t)).c(),g.set(l,$[p]=a),l in h&&y.set(l,Math.abs(p-h[l]))}const v=new Set,b=new Set;function w(t){et(t,1),t.m(l,u),s.set(t.key,t),u=t.first,f--}for(;m&&f;){const e=$[f-1],n=t[m-1],o=e.key,i=n.key;e===n?(u=e.first,m--,f--):g.has(i)?!s.has(o)||v.has(o)?w(e):b.has(i)?m--:y.get(o)>y.get(i)?(b.add(o),w(e)):(v.add(i),m--):(a(n,s),m--)}for(;m--;){const e=t[m];g.has(e.key)||a(e,s)}for(;f;)w($[f-1]);return $}function ut(t,e,n){const{fragment:i,on_mount:l,on_destroy:a,after_update:c}=t.$$;i.m(e,n),V(()=>{const e=l.map(o).filter(s);a?a.push(...e):r(e),t.$$.on_mount=[]}),c.forEach(V)}function dt(t,e){t.$$.fragment&&(r(t.$$.on_destroy),t.$$.fragment.d(e),t.$$.on_destroy=t.$$.fragment=null,t.$$.ctx={})}function mt(t,e){t.$$.dirty||(B.push(t),F||(F=!0,D.then(Y)),t.$$.dirty=i()),t.$$.dirty[e]=!0}function ft(e,n,o,s,l,a){const c=O;H(e);const u=n.props||{},d=e.$$={fragment:null,ctx:null,props:a,update:t,not_equal:l,bound:i(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(c?c.$$.context:[]),callbacks:i(),dirty:null};let m=!1;var f;d.ctx=o?o(e,u,(t,n,o=n)=>(d.ctx&&l(d.ctx[t],d.ctx[t]=o)&&(d.bound[t]&&d.bound[t](o),m&&mt(e,t)),n)):u,d.update(),m=!0,r(d.before_update),d.fragment=s(d.ctx),n.target&&(n.hydrate?d.fragment.l((f=n.target,Array.from(f.childNodes))):d.fragment.c(),n.intro&&et(e.$$.fragment),ut(e,n.target,n.anchor),Y()),H(c)}class pt{$destroy(){dt(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}}const ht=[];function $t(e,n=t){let o;const i=[];function r(t){if(l(e,t)&&(e=t,o)){const t=!ht.length;for(let t=0;t<i.length;t+=1){const n=i[t];n[1](),ht.push(n,e)}if(t){for(let t=0;t<ht.length;t+=2)ht[t][0](ht[t+1]);ht.length=0}}}return{set:r,update:function(t){r(t(e))},subscribe:function(s,l=t){const a=[s,l];return i.push(a),1===i.length&&(o=n(r)||t),s(e),()=>{const t=i.indexOf(a);-1!==t&&i.splice(t,1),0===i.length&&(o(),o=null)}}}}const gt=$t("main"),yt=$t([]),vt=$t({id:"",name:"",type:"",items:[""]}),bt=$t({id:"",name:"",type:"",items:[""]}),wt={subscribe:$t("0.306",St).subscribe};var St;function _t(){var t;yt.set(kt("myStuff")),gt.set((t="lastPage",localStorage.getItem(t)?JSON.parse(localStorage.getItem(t)):"main")),bt.set(kt("unSaved")),vt.set(kt("tmpCont"))}function Ct(t){var e;if(e=t,console.log(e),localStorage.setItem("lastPage",JSON.stringify(e)),"main"===t)return gt.set("main"),void _t();"newlist"!==t?"editlist"!==t?gt.set("newlist"):gt.set("editlist"):gt.set("newlist")}function xt(t,e){console.log(t),localStorage.setItem(e,JSON.stringify(t))}function kt(t){return localStorage.getItem(t)?JSON.parse(localStorage.getItem(t)):"myStuff"===t?new Array:"unSaved"===t?{id:"",name:"",type:"",items:[""]}:"tmpCont"===t?{id:"",name:"",type:"",items:[""]}:void 0}function Mt(e){var n,o,i,r,s;return{c(){n=_("button"),o=C("My_Stuff "),i=_("span"),r=C(e.$version),I(i,"font-size","1rem"),I(i,"color","gray"),E(n,"id","main_link"),E(n,"class","svelte-1mvd3j6"),s=M(n,"click",e.click_handler)},m(t,e){w(t,n,e),b(n,o),b(n,i),b(i,r)},p(t,e){t.$version&&z(r,e.$version)},i:t,o:t,d(t){t&&S(n),s()}}}function Et(t,e,n){let o;u(t,wt,t=>{n("$version",o=t)});return{$version:o,click_handler:()=>Ct("main")}}class zt extends pt{constructor(t){super(),ft(this,t,Et,Mt,l,[])}}function Nt(t){var e,o,i,r,s,l;const a=t.$$slots.default,c=function(t,e,n){if(t){const o=d(t,e,n);return t[0](o)}}(a,t,null);return{c(){e=_("div"),o=x(),i=_("div"),r=C(t.content),s=x(),c&&c.c(),E(e,"class","modal-bg svelte-zypfb8"),E(i,"class","modal svelte-zypfb8")},l(t){c&&c.l(div1_nodes)},m(t,n){w(t,e,n),w(t,o,n),w(t,i,n),b(i,r),b(i,s),c&&c.m(i,null),l=!0},p(t,e){l&&!t.content||z(r,e.content),c&&c.p&&t.$$scope&&c.p(function(t,e,o,i){return t[1]?n({},n(e.$$scope.changed||{},t[1](i?i(o):{}))):e.$$scope.changed||{}}(a,e,t,null),d(a,e,null))},i(t){l||(et(c,t),l=!0)},o(t){nt(c,t),l=!1},d(t){t&&(S(e),S(o),S(i)),c&&c.d(t)}}}function It(t,e,n){let{content:o}=e,{$$slots:i={},$$scope:r}=e;return t.$set=(t=>{"content"in t&&n("content",o=t.content),"$$scope"in t&&n("$$scope",r=t.$$scope)}),{content:o,$$slots:i,$$scope:r}}class Ot extends pt{constructor(t){super(),ft(this,t,It,Nt,l,["content"])}}function Tt(t){const e=t-1;return e*e*e+1}function At(t,{delay:e=0,duration:n=400}){const o=+getComputedStyle(t).opacity;return{delay:e,duration:n,css:t=>`opacity: ${t*o}`}}function jt(t,{delay:e=0,duration:n=400,easing:o=Tt,x:i=0,y:r=0,opacity:s=0}){const l=getComputedStyle(t),a=+l.opacity,c="none"===l.transform?"":l.transform,u=a*(1-s);return{delay:e,duration:n,easing:o,css:(t,e)=>`\n\t\t\ttransform: ${c} translate(${(1-t)*i}px, ${(1-t)*r}px);\n\t\t\topacity: ${a-u*e}`}}function Rt(t,e,n){const o=getComputedStyle(t),i="none"===o.transform?"":o.transform,r=e.from.left-e.to.left,l=e.from.top-e.to.top,a=Math.sqrt(r*r+l*l),{delay:c=0,duration:u=(t=>120*Math.sqrt(t)),easing:d=Tt}=n;return{delay:c,duration:s(u)?u(a):u,easing:d,css:(t,e)=>`transform: ${i} translate(${e*r}px, ${e*l}px);`}}function qt(t,e,n){const o=Object.create(t);return o.item=e[n],o.each_value=e,o.i=n,o}function Ht(t){var e,n;return{c(){(e=_("button")).textContent="-",E(e,"class","svelte-1bsmocl"),n=M(e,"click",t.remItem.bind(this,t.i))},m(t,n){w(t,e,n)},p(e,n){t=n},d(t){t&&S(e),n()}}}function Bt(n,o){var i,s,l,a,c,u,d,m,p,h=t;function $(){o.input_input_handler.call(s,o)}var g=0!=o.i&&Ht(o);function y(){return o.click_handler(o)}return{key:n,first:null,c(){i=_("div"),s=_("input"),l=x(),g&&g.c(),a=x(),(c=_("button")).textContent="+",E(s,"type","text"),E(s,"name","tmpitems"),E(s,"autocomplete","off"),E(s,"maxlength","48"),E(s,"placeholder",o.inputMsg),s.required=!0,E(s,"class","svelte-1bsmocl"),E(c,"class","svelte-1bsmocl"),E(i,"class","itemslist svelte-1bsmocl"),p=[M(s,"input",$),M(c,"click",y)],this.first=i},m(t,e){w(t,i,e),b(i,s),N(s,o.item),b(i,l),g&&g.m(i,null),b(i,a),b(i,c),m=!0},p(t,e){o=e,t.items&&s.value!==o.item&&N(s,o.item),m&&!t.inputMsg||E(s,"placeholder",o.inputMsg),0!=o.i?g?g.p(t,o):((g=Ht(o)).c(),g.m(i,a)):g&&(g.d(1),g=null)},r(){d=i.getBoundingClientRect()},f(){!function(t){const e=getComputedStyle(t);if("absolute"!==e.position&&"fixed"!==e.position){const{width:n,height:o}=e,i=t.getBoundingClientRect();t.style.position="absolute",t.style.width=n,t.style.height=o,q(t,i)}}(i),h(),q(i,d)},a(){h(),h=function(n,o,i,r){if(!o)return t;const s=n.getBoundingClientRect();if(o.left===s.left&&o.right===s.right&&o.top===s.top&&o.bottom===s.bottom)return t;const{delay:l=0,duration:a=300,easing:c=e,start:u=f()+l,end:d=u+a,tick:m=t,css:p}=i(n,{from:o,to:s},r);let h,$=!0,g=!1;function y(){p&&R(n,h),$=!1}return v(t=>{if(!g&&t>=u&&(g=!0),g&&t>=d&&(m(1,0),y()),!$)return!1;if(g){const e=0+1*c((t-u)/a);m(e,1-e)}return!0}),p&&(h=j(n,0,1,a,l,c,p)),l||(g=!0),m(0,1),y}(i,d,Rt,{key:o.i})},i(t){m||(V(()=>{u||(u=st(i,At,{key:o.i},!0)),u.run(1)}),m=!0)},o(t){u||(u=st(i,At,{key:o.i},!1)),u.run(0),m=!1},d(t){t&&S(i),g&&g.d(),t&&u&&u.end(),r(p)}}}function Lt(t){var e,n;return{c(){(e=_("button")).textContent="Delete",I(e,"color","red"),I(e,"background-color","#f5f5f6"),E(e,"class","svelte-1bsmocl"),n=M(e,"click",t.click_handler_1)},m(t,n){w(t,e,n)},d(t){t&&S(e),n()}}}function Pt(t){var e,n=new Ot({props:{content:"Are you sure you wanna delete this container?",$$slots:{default:[Jt]},$$scope:{ctx:t}}});return{c(){n.$$.fragment.c()},m(t,o){ut(n,t,o),e=!0},i(t){e||(et(n.$$.fragment,t),e=!0)},o(t){nt(n.$$.fragment,t),e=!1},d(t){dt(n,t)}}}function Jt(e){var n,o,i,s,l;return{c(){n=_("div"),(o=_("button")).textContent="Yes",i=x(),(s=_("button")).textContent="No",I(o,"background-color","red"),E(o,"class","svelte-1bsmocl"),E(s,"class","svelte-1bsmocl"),E(n,"class","row-buttons svelte-1bsmocl"),l=[M(o,"click",e.deleteSubmit,{once:!0}),M(s,"click",e.click_handler_2)]},m(t,e){w(t,n,e),b(n,o),b(n,i),b(n,s)},p:t,d(t){t&&S(n),r(l)}}}function Dt(t){var e,n,o,i,s,l,a,c,u,d,m,f,p,h,$,g,y=[],v=new Map;let C=t.items;const z=t=>t.i;for(let e=0;e<C.length;e+=1){let n=qt(t,C,e),o=z(n);v.set(o,y[e]=Bt(o,n))}var I=t.editt&&Lt(t),O=t.delModal&&Pt(t);return{c(){e=_("div"),n=_("label"),o=_("input"),i=x(),s=_("input"),l=x();for(let t=0;t<y.length;t+=1)y[t].c();a=x(),c=_("div"),I&&I.c(),u=x(),(d=_("button")).textContent="Save",p=x(),O&&O.c(),h=k(),E(o,"type","text"),E(o,"name","name"),E(o,"autocomplete","off"),E(o,"maxlength","25"),E(o,"placeholder","The Container Name"),o.required=!0,E(o,"class","svelte-1bsmocl"),E(s,"type","text"),E(s,"name","type"),E(s,"autocomplete","off"),E(s,"maxlength","32"),E(s,"placeholder","The Container Type"),s.required=!0,E(s,"class","svelte-1bsmocl"),E(d,"class","svelte-1bsmocl"),E(c,"class","buttons svelte-1bsmocl"),E(n,"class","svelte-1bsmocl"),E(e,"classname","create-new"),E(e,"class","svelte-1bsmocl"),g=[M(o,"input",t.input0_input_handler),M(s,"input",t.input1_input_handler),M(d,"click",t.handleSubmit,{once:!0})]},m(r,m){w(r,e,m),b(e,n),b(n,o),N(o,t.name),b(n,i),b(n,s),N(s,t.type),b(n,l);for(let t=0;t<y.length;t+=1)y[t].m(n,null);b(n,a),b(n,c),I&&I.m(c,null),b(c,u),b(c,d),w(r,p,m),O&&O.m(r,m),w(r,h,m),$=!0},p(t,e){t.name&&o.value!==e.name&&N(o,e.name),t.type&&s.value!==e.type&&N(s,e.type);const i=e.items;Z();for(let t=0;t<y.length;t+=1)y[t].r();y=ct(y,t,z,1,e,i,v,n,at,Bt,a,qt);for(let t=0;t<y.length;t+=1)y[t].a();tt(),e.editt?I||((I=Lt(e)).c(),I.m(c,u)):I&&(I.d(1),I=null),e.delModal?O?et(O,1):((O=Pt(e)).c(),et(O,1),O.m(h.parentNode,h)):O&&(Z(),nt(O,1,1,()=>{O=null}),tt())},i(t){if(!$){for(let t=0;t<C.length;t+=1)et(y[t]);V(()=>{f&&f.end(1),m||(m=it(e,At,{duration:1e3})),m.start()}),et(O),$=!0}},o(t){for(let t=0;t<y.length;t+=1)nt(y[t]);m&&m.invalidate(),f=rt(e,At,{duration:0}),nt(O),$=!1},d(t){t&&S(e);for(let t=0;t<y.length;t+=1)y[t].d();I&&I.d(),t&&(f&&f.end(),S(p)),O&&O.d(t),t&&S(h),r(g)}}}function Wt(t,e,n){let{id:o="",name:i="",type:r="",items:s=[""],editt:l=!1}=e,a=!1,u="Start adding items to your container!";function d(t){""!==s[s.length-1]&&(n("items",s[s.length-1]=t,s),n("items",s=[...s,""]))}return t.$set=(t=>{"id"in t&&n("id",o=t.id),"name"in t&&n("name",i=t.name),"type"in t&&n("type",r=t.type),"items"in t&&n("items",s=t.items),"editt"in t&&n("editt",l=t.editt)}),t.$$.update=((t={items:1,name:1,type:1,editt:1})=>{t.items&&s.length>1&&n("inputMsg",u="And another one"),(t.name||t.type||t.items||t.editt)&&(console.log(i+":"+r+":"+s),xt({name:i,type:r,items:s},l?"tmpCont":"unSaved")),t.items&&console.log(s.length+" items:"+s)}),{id:o,name:i,type:r,items:s,editt:l,delModal:a,inputMsg:u,handleSubmit:function(){i&&r&&s&&(n("items",s=s.filter(Boolean)),function(t,e,n,o=""){if(""==o)console.log("I am Creating new one"),yt.update(o=>[...o,{id:o.length+Math.random(),name:t,type:e,items:n}]),xt({id:"",name:"",type:"",items:[""]},"unSaved");else{let i=c(yt).findIndex(t=>t.id===o),r=c(yt);r.splice(i,1,{id:o,name:t,type:e,items:n}),yt.update(()=>r),xt({id:"",name:"",type:"",items:[""]},"tmpCont")}xt(c(yt),"myStuff")}(i,r,s,o),console.log("handleSubmitted"),Ct("main"))},deleteSubmit:function(){!function(t){let e=c(yt).findIndex(e=>e.id===t),n=c(yt);n.splice(e,1),yt.update(()=>n),xt({id:"",name:"",type:"",items:[""]},"tmpCont"),xt(c(yt),"myStuff")}(o),Ct("main")},newItem:d,remItem:function(t){console.log(t+" th item deleted"),n("items",s=s.filter((e,n)=>n!==t))},input0_input_handler:function(){i=this.value,n("name",i)},input1_input_handler:function(){r=this.value,n("type",r)},input_input_handler:function({item:t,each_value:e,i:o}){e[o]=this.value,n("items",s)},click_handler:({item:t})=>d(t),click_handler_1:()=>n("delModal",a=!0),click_handler_2:()=>n("delModal",a=!1)}}class Ft extends pt{constructor(t){super(),ft(this,t,Wt,Dt,l,["id","name","type","items","editt"])}}function Vt(e){return{c:t,m:t,d:t}}function Yt(t){var e,n;return{c(){(e=_("button")).innerHTML="<span></span>",E(e,"id","menu-edit-create"),E(e,"class","svelte-1siu6ek"),n=M(e,"click",t.click_handler)},m(t,n){w(t,e,n)},d(t){t&&S(e),n()}}}function Gt(e){var n;function o(t,e){return"newlist"===e.button?Yt:"editlist"===e.button?Vt:void 0}var i=o(0,e),r=i&&i(e);return{c(){r&&r.c(),n=k()},m(t,e){r&&r.m(t,e),w(t,n,e)},p(t,e){i!==(i=o(0,e))&&(r&&r.d(1),(r=i&&i(e))&&(r.c(),r.m(n.parentNode,n)))},i:t,o:t,d(t){r&&r.d(t),t&&S(n)}}}function Kt(t,e,n){let{button:o}=e;return t.$set=(t=>{"button"in t&&n("button",o=t.button)}),{button:o,click_handler:()=>Ct(o)}}class Qt extends pt{constructor(t){super(),ft(this,t,Kt,Gt,l,["button"])}}function Ut(t,e,n){const o=Object.create(t);return o.item=e[n],o.i=n,o}function Xt(t){var e,n,o,i,r,s,l,a,c,u,d,m;let f=t.items,p=[];for(let e=0;e<f.length;e+=1)p[e]=Zt(Ut(t,f,e));return{c(){e=_("div"),n=C("Type: "),o=C(t.type),i=C(" |\n            "),r=C(t.itemsnum),s=C(" Stuff here\n            "),l=_("ul");for(let t=0;t<p.length;t+=1)p[t].c();a=x(),(c=_("button")).textContent="Edit",E(l,"class","item-list svelte-g9p7zw"),E(c,"class","edit-button svelte-g9p7zw"),E(e,"class","details svelte-g9p7zw"),m=M(c,"click",t.editHandle)},m(t,u){w(t,e,u),b(e,n),b(e,o),b(e,i),b(e,r),b(e,s),b(e,l);for(let t=0;t<p.length;t+=1)p[t].m(l,null);b(e,a),b(e,c),d=!0},p(t,e){if(d&&!t.type||z(o,e.type),t.items){let n;for(f=e.items,n=0;n<f.length;n+=1){const o=Ut(e,f,n);p[n]?p[n].p(t,o):(p[n]=Zt(o),p[n].c(),p[n].m(l,null))}for(;n<p.length;n+=1)p[n].d(1);p.length=f.length}},i(t){d||(V(()=>{u||(u=st(e,jt,{y:-10,duration:200},!0)),u.run(1)}),d=!0)},o(t){u||(u=st(e,jt,{y:-10,duration:200},!1)),u.run(0),d=!1},d(t){t&&S(e),function(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}(p,t),t&&u&&u.end(),m()}}}function Zt(t){var e,n,o=t.item+"";return{c(){e=_("li"),n=C(o)},m(t,o){w(t,e,o),b(e,n)},p(t,e){t.items&&o!==(o=e.item+"")&&z(n,o)},d(t){t&&S(e)}}}function te(t){var e,n,o,i,r,s,l,a,c,u,d=!t.isSum&&Xt(t);return{c(){e=_("div"),n=_("div"),o=C(t.name),i=x(),r=_("hr"),s=x(),d&&d.c(),E(n,"id","name"),E(n,"class","svelte-g9p7zw"),I(r,"width","90%"),I(r,"border-color","#e1e2e186"),E(e,"class","containersum svelte-g9p7zw"),u=M(e,"click",t.details)},m(t,l){w(t,e,l),b(e,n),b(n,o),b(e,i),b(e,r),b(e,s),d&&d.m(e,null),c=!0},p(t,n){c&&!t.name||z(o,n.name),n.isSum?d&&(Z(),nt(d,1,1,()=>{d=null}),tt()):d?(d.p(t,n),et(d,1)):((d=Xt(n)).c(),et(d,1),d.m(e,null))},i(t){c||(et(d),V(()=>{a&&a.end(1),l||(l=it(e,At,{duration:500})),l.start()}),c=!0)},o(t){nt(d),l&&l.invalidate(),a=rt(e,At,{duration:0}),c=!1},d(t){t&&S(e),d&&d.d(),t&&a&&a.end(),u()}}}function ee(t,e,n){let{id:o="",name:i="TestName",type:r="TestType",items:s=["sugar"]}=e,l=s.length,{isSum:a=!0}=e;return t.$set=(t=>{"id"in t&&n("id",o=t.id),"name"in t&&n("name",i=t.name),"type"in t&&n("type",r=t.type),"items"in t&&n("items",s=t.items),"isSum"in t&&n("isSum",a=t.isSum)}),{id:o,name:i,type:r,items:s,itemsnum:l,isSum:a,editHandle:function(){!function(t,e,n,o){console.log("tmpContis: "+o),vt.set({name:t,type:e,items:n,id:o}),console.log(vt)}(i,r,s,o),Ct("editlist"),console.log("handleSubmitted by editCont")},details:function(){n("isSum",a=!a)}}}class ne extends pt{constructor(t){super(),ft(this,t,ee,te,l,["id","name","type","items","isSum","editHandle"])}get editHandle(){return this.$$.ctx.editHandle}}function oe(t,e,n){const o=Object.create(t);return o.container=e[n],o.i=n,o}function ie(t){var e,n,o;return{c(){e=C("Welcome to MyStuff! Start adding Containers to the app using the plus button so you\n        can keep track of stuff you have, even when you forgot the app remembers!\n        "),n=_("br"),o=C("\n        This app saves all data to your local store so all your data is on your device.")},m(t,i){w(t,e,i),w(t,n,i),w(t,o,i)},d(t){t&&(S(e),S(n),S(o))}}}function re(t,e){var o,i,r=[e.container];let s={};for(var l=0;l<r.length;l+=1)s=n(s,r[l]);var a=new ne({props:s});return{key:t,first:null,c(){o=k(),a.$$.fragment.c(),this.first=o},m(t,e){w(t,o,e),ut(a,t,e),i=!0},p(t,e){var n,o=t.get||t.myContainers?function(t,e){const n={},o={},i={$$scope:1};let r=t.length;for(;r--;){const s=t[r],l=e[r];if(l){for(const t in s)t in l||(o[t]=1);for(const t in l)i[t]||(n[t]=l[t],i[t]=1);t[r]=l}else for(const t in s)i[t]=1}for(const t in o)t in n||(n[t]=void 0);return n}(r,[(n=e.container,"object"==typeof n&&null!==n?n:{})]):{};a.$set(o)},i(t){i||(et(a.$$.fragment,t),i=!0)},o(t){nt(a.$$.fragment,t),i=!1},d(t){t&&S(o),dt(a,t)}}}function se(t){var e,n,o=[],i=new Map;let r=c(yt);const s=t=>t.container.id;for(let e=0;e<r.length;e+=1){let n=oe(t,r,e),l=s(n);i.set(l,o[e]=re(l,n))}let l=null;return r.length||(l=ie()).c(),{c(){for(let t=0;t<o.length;t+=1)o[t].c();e=k()},m(t,i){for(let e=0;e<o.length;e+=1)o[e].m(t,i);w(t,e,i),l&&l.m(t,i),n=!0},p(t,n){const r=c(yt);Z(),o=ct(o,t,s,1,n,r,i,e.parentNode,lt,re,e,oe),tt(),r.length?l&&(l.d(1),l=null):l||((l=ie()).c(),l.m(e.parentNode,e))},i(t){if(!n){for(let t=0;t<r.length;t+=1)et(o[t]);n=!0}},o(t){for(let t=0;t<o.length;t+=1)nt(o[t]);n=!1},d(t){for(let e=0;e<o.length;e+=1)o[e].d(t);t&&S(e),l&&l.d(t)}}}function le(t){return console.log("myContainers list has: ",c(yt)),{}}class ae extends pt{constructor(t){super(),ft(this,t,le,se,l,[])}}function ce(t){var e,n,o,i,r,s,l,a,c,u=new ae({}),d=new Qt({props:{button:"newlist"}});return{c(){e=C("width:"),n=C(t.w),o=C(" height:"),i=C(t.h),r=C(" ratio: "),s=C(t.ratio),l=x(),u.$$.fragment.c(),a=x(),d.$$.fragment.c()},m(t,m){w(t,e,m),w(t,n,m),w(t,o,m),w(t,i,m),w(t,r,m),w(t,s,m),w(t,l,m),ut(u,t,m),w(t,a,m),ut(d,t,m),c=!0},p(t,e){c&&!t.w||z(n,e.w),c&&!t.h||z(i,e.h),c&&!t.ratio||z(s,e.ratio)},i(t){c||(et(u.$$.fragment,t),et(d.$$.fragment,t),c=!0)},o(t){nt(u.$$.fragment,t),nt(d.$$.fragment,t),c=!1},d(t){t&&(S(e),S(n),S(o),S(i),S(r),S(s),S(l)),dt(u,t),t&&S(a),dt(d,t)}}}function ue(t){var e,n=new Ft({props:{name:t.$tmpCont.name,type:t.$tmpCont.type,items:t.$tmpCont.items,id:t.$tmpCont.id,editt:!0}});return{c(){n.$$.fragment.c()},m(t,o){ut(n,t,o),e=!0},p(t,e){var o={};t.$tmpCont&&(o.name=e.$tmpCont.name),t.$tmpCont&&(o.type=e.$tmpCont.type),t.$tmpCont&&(o.items=e.$tmpCont.items),t.$tmpCont&&(o.id=e.$tmpCont.id),n.$set(o)},i(t){e||(et(n.$$.fragment,t),e=!0)},o(t){nt(n.$$.fragment,t),e=!1},d(t){dt(n,t)}}}function de(t){var e,n=new Ft({props:{name:t.$unSaved.name,type:t.$unSaved.type,items:t.$unSaved.items,editt:!1}});return{c(){n.$$.fragment.c()},m(t,o){ut(n,t,o),e=!0},p(t,e){var o={};t.$unSaved&&(o.name=e.$unSaved.name),t.$unSaved&&(o.type=e.$unSaved.type),t.$unSaved&&(o.items=e.$unSaved.items),n.$set(o)},i(t){e||(et(n.$$.fragment,t),e=!0)},o(t){nt(n.$$.fragment,t),e=!1},d(t){dt(n,t)}}}function me(t){var e,n,o,i,r=[de,ue,ce],s=[];function l(t,e){return"newlist"===e.$mypage?0:"editlist"===e.$mypage?1:2}return e=l(0,t),n=s[e]=r[e](t),{c(){n.c(),o=k()},m(t,n){s[e].m(t,n),w(t,o,n),i=!0},p(t,i){var a=e;(e=l(0,i))===a?s[e].p(t,i):(Z(),nt(s[a],1,1,()=>{s[a]=null}),tt(),(n=s[e])||(n=s[e]=r[e](i)).c(),et(n,1),n.m(o.parentNode,o))},i(t){i||(et(n),i=!0)},o(t){nt(n),i=!1},d(t){s[e].d(t),t&&S(o)}}}function fe(t,e,n){let o,i,r;u(t,gt,t=>{n("$mypage",o=t)}),u(t,bt,t=>{n("$unSaved",i=t)}),u(t,vt,t=>{n("$tmpCont",r=t)});let s,{w:l,h:a}=e;return t.$set=(t=>{"w"in t&&n("w",l=t.w),"h"in t&&n("h",a=t.h)}),t.$$.update=((t={$mypage:1,w:1,h:1})=>{t.$mypage&&console.log("Current page is: "+o),(t.w||t.h)&&n("ratio",s=l/a)}),{w:l,h:a,ratio:s,$mypage:o,$unSaved:i,$tmpCont:r}}class pe extends pt{constructor(t){super(),ft(this,t,fe,me,l,["w","h"])}}function he(t){var e,n,o,i,r=new zt({}),s=new pe({props:{w:t.w,h:t.h}});return{c(){e=_("main"),r.$$.fragment.c(),n=x(),s.$$.fragment.c(),V(()=>t.main_resize_handler.call(e)),E(e,"class","svelte-10d9n07")},m(l,a){w(l,e,a),ut(r,e,null),b(e,n),ut(s,e,null),o=function(t,e){"static"===getComputedStyle(t).position&&(t.style.position="relative");const n=document.createElement("object");let o;return n.setAttribute("style","display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1;"),n.type="text/html",n.tabIndex=-1,n.onload=(()=>{(o=n.contentDocument.defaultView).addEventListener("resize",e)}),/Trident/.test(navigator.userAgent)?(t.appendChild(n),n.data="about:blank"):(n.data="about:blank",t.appendChild(n)),{cancel:()=>{o&&o.removeEventListener&&o.removeEventListener("resize",e),t.removeChild(n)}}}(e,t.main_resize_handler.bind(e)),i=!0},p(t,e){var n={};t.w&&(n.w=e.w),t.h&&(n.h=e.h),s.$set(n)},i(t){i||(et(r.$$.fragment,t),et(s.$$.fragment,t),i=!0)},o(t){nt(r.$$.fragment,t),nt(s.$$.fragment,t),i=!1},d(t){t&&S(e),dt(r),dt(s),o.cancel()}}}function $e(t,e,n){let o,i;return _t(),t.$$.update=((t={w:1,h:1})=>{(t.w||t.h)&&console.log("main w and h: ",o," ",i)}),{w:o,h:i,main_resize_handler:function(){o=this.clientWidth,i=this.clientHeight,n("w",o),n("h",i)}}}return new class extends pt{constructor(t){super(),ft(this,t,$e,he,l,[])}}({target:document.body,props:{}})}();
//# sourceMappingURL=bundle.js.map
