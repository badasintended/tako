var ot=Object.defineProperty,lt=Object.defineProperties;var ct=Object.getOwnPropertyDescriptors;var V=Object.getOwnPropertySymbols;var Y=Object.prototype.hasOwnProperty,X=Object.prototype.propertyIsEnumerable;var F=(r,t,e)=>t in r?ot(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e,E=(r,t)=>{for(var e in t||(t={}))Y.call(t,e)&&F(r,e,t[e]);if(V)for(var e of V(t))X.call(t,e)&&F(r,e,t[e]);return r},H=(r,t)=>lt(r,ct(t));var Q=(r,t)=>{var e={};for(var s in r)Y.call(r,s)&&t.indexOf(s)<0&&(e[s]=r[s]);if(r!=null&&V)for(var s of V(r))t.indexOf(s)<0&&X.call(r,s)&&(e[s]=r[s]);return e};import{S as ut,i as ft,s as ht,e as dt,c as _t,a as pt,d as v,b as D,f as k,t as mt,g as gt,h as wt,j as L,k as bt,l as b,m as B,n as yt,o as q,p as K,q as J,r as T,u as y,v as I,w as P,x as g,y as vt,z as Et,A as kt,B as W,C as z}from"./chunks/vendor-b1776dd9.js";import{i as $t}from"./chunks/singletons-12a22614.js";function Z(r){let t,e,s;const i=[r[2]||{}];var a=r[0][1];function n(o){let l={$$slots:{default:[Rt]},$$scope:{ctx:o}};for(let c=0;c<i.length;c+=1)l=W(l,i[c]);return{props:l}}return a&&(t=new a(n(r))),{c(){t&&L(t.$$.fragment),e=b()},l(o){t&&B(t.$$.fragment,o),e=b()},m(o,l){t&&q(t,o,l),k(o,e,l),s=!0},p(o,l){const c=l&4?K(i,[J(o[2]||{})]):{};if(l&521&&(c.$$scope={dirty:l,ctx:o}),a!==(a=o[0][1])){if(t){T();const u=t;y(u.$$.fragment,1,0,()=>{I(u,1)}),P()}a?(t=new a(n(o)),L(t.$$.fragment),g(t.$$.fragment,1),q(t,e.parentNode,e)):t=null}else a&&t.$set(c)},i(o){s||(t&&g(t.$$.fragment,o),s=!0)},o(o){t&&y(t.$$.fragment,o),s=!1},d(o){o&&v(e),t&&I(t,o)}}}function x(r){let t,e,s;const i=[r[3]||{}];var a=r[0][2];function n(o){let l={};for(let c=0;c<i.length;c+=1)l=W(l,i[c]);return{props:l}}return a&&(t=new a(n())),{c(){t&&L(t.$$.fragment),e=b()},l(o){t&&B(t.$$.fragment,o),e=b()},m(o,l){t&&q(t,o,l),k(o,e,l),s=!0},p(o,l){const c=l&8?K(i,[J(o[3]||{})]):{};if(a!==(a=o[0][2])){if(t){T();const u=t;y(u.$$.fragment,1,0,()=>{I(u,1)}),P()}a?(t=new a(n()),L(t.$$.fragment),g(t.$$.fragment,1),q(t,e.parentNode,e)):t=null}else a&&t.$set(c)},i(o){s||(t&&g(t.$$.fragment,o),s=!0)},o(o){t&&y(t.$$.fragment,o),s=!1},d(o){o&&v(e),t&&I(t,o)}}}function Rt(r){let t,e,s=r[0][2]&&x(r);return{c(){s&&s.c(),t=b()},l(i){s&&s.l(i),t=b()},m(i,a){s&&s.m(i,a),k(i,t,a),e=!0},p(i,a){i[0][2]?s?(s.p(i,a),a&1&&g(s,1)):(s=x(i),s.c(),g(s,1),s.m(t.parentNode,t)):s&&(T(),y(s,1,1,()=>{s=null}),P())},i(i){e||(g(s),e=!0)},o(i){y(s),e=!1},d(i){s&&s.d(i),i&&v(t)}}}function St(r){let t,e,s=r[0][1]&&Z(r);return{c(){s&&s.c(),t=b()},l(i){s&&s.l(i),t=b()},m(i,a){s&&s.m(i,a),k(i,t,a),e=!0},p(i,a){i[0][1]?s?(s.p(i,a),a&1&&g(s,1)):(s=Z(i),s.c(),g(s,1),s.m(t.parentNode,t)):s&&(T(),y(s,1,1,()=>{s=null}),P())},i(i){e||(g(s),e=!0)},o(i){y(s),e=!1},d(i){s&&s.d(i),i&&v(t)}}}function tt(r){let t,e=r[5]&&et(r);return{c(){t=dt("div"),e&&e.c(),this.h()},l(s){t=_t(s,"DIV",{id:!0,"aria-live":!0,"aria-atomic":!0,class:!0});var i=pt(t);e&&e.l(i),i.forEach(v),this.h()},h(){D(t,"id","svelte-announcer"),D(t,"aria-live","assertive"),D(t,"aria-atomic","true"),D(t,"class","svelte-1pdgbjn")},m(s,i){k(s,t,i),e&&e.m(t,null)},p(s,i){s[5]?e?e.p(s,i):(e=et(s),e.c(),e.m(t,null)):e&&(e.d(1),e=null)},d(s){s&&v(t),e&&e.d()}}}function et(r){let t;return{c(){t=mt(r[6])},l(e){t=gt(e,r[6])},m(e,s){k(e,t,s)},p(e,s){s&64&&wt(t,e[6])},d(e){e&&v(t)}}}function Lt(r){let t,e,s,i;const a=[r[1]||{}];var n=r[0][0];function o(c){let u={$$slots:{default:[St]},$$scope:{ctx:c}};for(let f=0;f<a.length;f+=1)u=W(u,a[f]);return{props:u}}n&&(t=new n(o(r)));let l=r[4]&&tt(r);return{c(){t&&L(t.$$.fragment),e=bt(),l&&l.c(),s=b()},l(c){t&&B(t.$$.fragment,c),e=yt(c),l&&l.l(c),s=b()},m(c,u){t&&q(t,c,u),k(c,e,u),l&&l.m(c,u),k(c,s,u),i=!0},p(c,[u]){const f=u&2?K(a,[J(c[1]||{})]):{};if(u&525&&(f.$$scope={dirty:u,ctx:c}),n!==(n=c[0][0])){if(t){T();const h=t;y(h.$$.fragment,1,0,()=>{I(h,1)}),P()}n?(t=new n(o(c)),L(t.$$.fragment),g(t.$$.fragment,1),q(t,e.parentNode,e)):t=null}else n&&t.$set(f);c[4]?l?l.p(c,u):(l=tt(c),l.c(),l.m(s.parentNode,s)):l&&(l.d(1),l=null)},i(c){i||(t&&g(t.$$.fragment,c),i=!0)},o(c){t&&y(t.$$.fragment,c),i=!1},d(c){t&&I(t,c),c&&v(e),l&&l.d(c),c&&v(s)}}}function qt(r,t,e){let{stores:s}=t,{page:i}=t,{components:a}=t,{props_0:n=null}=t,{props_1:o=null}=t,{props_2:l=null}=t;vt("__svelte__",s),Et(s.page.notify);let c=!1,u=!1,f=null;return kt(()=>{const h=s.page.subscribe(()=>{c&&(e(5,u=!0),e(6,f=document.title||"untitled page"))});return e(4,c=!0),h}),r.$$set=h=>{"stores"in h&&e(7,s=h.stores),"page"in h&&e(8,i=h.page),"components"in h&&e(0,a=h.components),"props_0"in h&&e(1,n=h.props_0),"props_1"in h&&e(2,o=h.props_1),"props_2"in h&&e(3,l=h.props_2)},r.$$.update=()=>{r.$$.dirty&384&&s.page.set(i)},[a,n,o,l,c,u,f,s,i]}class It extends ut{constructor(t){super();ft(this,t,qt,Lt,ht,{stores:7,page:8,components:0,props_0:1,props_1:2,props_2:3})}}const Ut="modulepreload",st={},At="/_app/",U=function(t,e){return!e||e.length===0?t():Promise.all(e.map(s=>{if(s=`${At}${s}`,s in st)return;st[s]=!0;const i=s.endsWith(".css"),a=i?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${s}"]${a}`))return;const n=document.createElement("link");if(n.rel=i?"stylesheet":Ut,i||(n.as="script",n.crossOrigin=""),n.href=s,document.head.appendChild(n),i)return new Promise((o,l)=>{n.addEventListener("load",o),n.addEventListener("error",l)})})).then(()=>t())},p=[()=>U(()=>import("./pages/__layout.svelte-4fa4d79b.js"),["pages/__layout.svelte-4fa4d79b.js","assets/pages/__layout.svelte-8c4f16b6.css","chunks/vendor-b1776dd9.js","assets/vendor-b8c56e4e.css","chunks/stores-55cef8f4.js","chunks/Button-9018cc21.js","chunks/stores-54dbfcc7.js"]),()=>U(()=>import("./pages/__error.svelte-a4f8836c.js"),["pages/__error.svelte-a4f8836c.js","chunks/vendor-b1776dd9.js","assets/vendor-b8c56e4e.css","chunks/Error-bc57df67.js","chunks/Title-ffab03d7.js"]),()=>U(()=>import("./pages/index.svelte-dd32a119.js"),["pages/index.svelte-dd32a119.js","assets/pages/index.svelte-3de29cce.css","chunks/vendor-b1776dd9.js","assets/vendor-b8c56e4e.css","chunks/database-74ffdce0.js","chunks/Title-ffab03d7.js","chunks/stores-54dbfcc7.js","chunks/source-01fb9fce.js","chunks/navigation-51f4a605.js","chunks/singletons-12a22614.js"]),()=>U(()=>import("./pages/parse.svelte-f6037c59.js"),["pages/parse.svelte-f6037c59.js","chunks/vendor-b1776dd9.js","assets/vendor-b8c56e4e.css","chunks/Title-ffab03d7.js","chunks/source-01fb9fce.js","chunks/navigation-51f4a605.js","chunks/singletons-12a22614.js"]),()=>U(()=>import("./pages/[sourceId]/[mangaId]/index.svelte-fa37b49e.js"),["pages/[sourceId]/[mangaId]/index.svelte-fa37b49e.js","assets/pages/[sourceId]/[mangaId]/index.svelte-b2e9e5fc.css","chunks/vendor-b1776dd9.js","assets/vendor-b8c56e4e.css","chunks/stores-54dbfcc7.js","chunks/database-74ffdce0.js","chunks/Error-bc57df67.js","chunks/stores-55cef8f4.js","chunks/Title-ffab03d7.js","chunks/Button-9018cc21.js","chunks/source-01fb9fce.js"]),()=>U(()=>import("./pages/[sourceId]/[mangaId]/[chapterId].svelte-92f4bfdf.js"),["pages/[sourceId]/[mangaId]/[chapterId].svelte-92f4bfdf.js","chunks/vendor-b1776dd9.js","assets/vendor-b8c56e4e.css","chunks/stores-54dbfcc7.js","chunks/stores-55cef8f4.js","chunks/database-74ffdce0.js","chunks/navigation-51f4a605.js","chunks/singletons-12a22614.js","chunks/source-01fb9fce.js"])],O=decodeURIComponent,jt=[[/^\/$/,[p[0],p[2]],[p[1]]],[/^\/parse\/?$/,[p[0],p[3]],[p[1]]],[/^\/([^/]+?)\/([^/]+?)\/?$/,[p[0],p[4]],[p[1]],r=>({sourceId:O(r[1]),mangaId:O(r[2])})],[/^\/([^/]+?)\/([^/]+?)\/([^/]+?)\/?$/,[p[0],p[5]],[p[1]],r=>({sourceId:O(r[1]),mangaId:O(r[2]),chapterId:O(r[3])})]],Tt=[p[0](),p[1]()];function Pt(r){let t=r.baseURI;if(!t){const e=r.getElementsByTagName("base");t=e.length?e[0].href:r.URL}return t}let rt="";function Ot(r){rt=r.base,r.assets}function G(){return{x:pageXOffset,y:pageYOffset}}function it(r){for(;r&&r.nodeName.toUpperCase()!=="A";)r=r.parentNode;return r}function nt(r){return r instanceof SVGAElement?new URL(r.href.baseVal,document.baseURI):new URL(r.href)}class Ct{constructor({base:t,routes:e,trailing_slash:s,renderer:i}){this.base=t,this.routes=e,this.trailing_slash=s,this.renderer=i,i.router=this,this.enabled=!0,document.body.setAttribute("tabindex","-1"),history.replaceState(history.state||{},"",location.href)}init_listeners(){"scrollRestoration"in history&&(history.scrollRestoration="manual"),addEventListener("beforeunload",()=>{history.scrollRestoration="auto"}),addEventListener("load",()=>{history.scrollRestoration="manual"});let t;addEventListener("scroll",()=>{clearTimeout(t),t=setTimeout(()=>{const a=H(E({},history.state||{}),{"sveltekit:scroll":G()});history.replaceState(a,document.title,window.location.href)},50)});const e=a=>{const n=it(a.target);n&&n.href&&n.hasAttribute("sveltekit:prefetch")&&this.prefetch(nt(n))};let s;const i=a=>{clearTimeout(s),s=setTimeout(()=>{e(a)},20)};addEventListener("touchstart",e),addEventListener("mousemove",i),addEventListener("click",a=>{if(!this.enabled||a.button||a.which!==1||a.metaKey||a.ctrlKey||a.shiftKey||a.altKey||a.defaultPrevented)return;const n=it(a.target);if(!n||!n.href)return;const o=nt(n);if(o.toString()===location.href){location.hash||a.preventDefault();return}const l=(n.getAttribute("rel")||"").split(/\s+/);if(n.hasAttribute("download")||l&&l.includes("external")||(n instanceof SVGAElement?n.target.baseVal:n.target)||!this.owns(o))return;const c=n.hasAttribute("sveltekit:noscroll");history.pushState({},"",o.href),this._navigate(o,c?G():null,!1,[],o.hash),a.preventDefault()}),addEventListener("popstate",a=>{if(a.state&&this.enabled){const n=new URL(location.href);this._navigate(n,a.state["sveltekit:scroll"],!1,[])}})}owns(t){return t.origin===location.origin&&t.pathname.startsWith(this.base)}parse(t){if(this.owns(t)){const e=t.pathname.slice(this.base.length)||"/",s=decodeURI(e),i=this.routes.filter(([o])=>o.test(s)),a=new URLSearchParams(t.search);return{id:`${e}?${a}`,routes:i,path:e,decoded_path:s,query:a}}}async goto(t,{noscroll:e=!1,replaceState:s=!1,keepfocus:i=!1,state:a={}}={},n){const o=new URL(t,Pt(document));return this.enabled&&this.owns(o)?(history[s?"replaceState":"pushState"](a,"",t),this._navigate(o,e?G():null,i,n,o.hash)):(location.href=o.href,new Promise(()=>{}))}enable(){this.enabled=!0}disable(){this.enabled=!1}async prefetch(t){const e=this.parse(t);if(!e)throw new Error("Attempted to prefetch a URL that does not belong to this app");return this.renderer.load(e)}async _navigate(t,e,s,i,a){const n=this.parse(t);if(!n)throw new Error("Attempted to navigate to a URL that does not belong to this app");if(n.path!=="/"){const o=n.path.endsWith("/");(o&&this.trailing_slash==="never"||!o&&this.trailing_slash==="always"&&!(n.path.split("/").pop()||"").includes("."))&&(n.path=o?n.path.slice(0,-1):n.path+"/",history.replaceState({},"",`${this.base}${n.path}${location.search}`))}this.renderer.notify({path:n.path,query:n.query}),await this.renderer.update(n,i,!1,{hash:a,scroll:e,keepfocus:s})}}function at(r){return r instanceof Error||r&&r.name&&r.message?r:new Error(JSON.stringify(r))}function Nt(r){let t=5381,e=r.length;if(typeof r=="string")for(;e;)t=t*33^r.charCodeAt(--e);else for(;e;)t=t*33^r[--e];return(t>>>0).toString(36)}function Vt(r){const t=r.status&&r.status>=400&&r.status<=599&&!r.redirect;if(r.error||t){const e=r.status;if(!r.error&&t)return{status:e||500,error:new Error};const s=typeof r.error=="string"?new Error(r.error):r.error;return s instanceof Error?!e||e<400||e>599?(console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500'),{status:500,error:s}):{status:e,error:s}:{status:500,error:new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof s}"`)}}if(r.redirect){if(!r.status||Math.floor(r.status/100)!==3)return{status:500,error:new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')};if(typeof r.redirect!="string")return{status:500,error:new Error('"redirect" property returned from load() must be a string')}}if(r.context)throw new Error('You are returning "context" from a load function. "context" was renamed to "stuff", please adjust your code accordingly.');return r}function Dt(r){const t=z(r);let e=!0;function s(){e=!0,t.update(n=>n)}function i(n){e=!1,t.set(n)}function a(n){let o;return t.subscribe(l=>{(o===void 0||e&&l!==o)&&n(o=l)})}return{notify:s,set:i,subscribe:a}}function Bt(r,t){const e=typeof r=="string"?r:r.url;let s=`script[data-type="svelte-data"][data-url=${JSON.stringify(e)}]`;t&&typeof t.body=="string"&&(s+=`[data-body="${Nt(t.body)}"]`);const i=document.querySelector(s);if(i&&i.textContent){const a=JSON.parse(i.textContent),{body:n}=a,o=Q(a,["body"]);return Promise.resolve(new Response(n,o))}return fetch(r,t)}class Kt{constructor({Root:t,fallback:e,target:s,session:i,host:a}){this.Root=t,this.fallback=e,this.host=a,this.router,this.target=s,this.started=!1,this.session_id=1,this.invalid=new Set,this.invalidating=null,this.current={page:null,session_id:0,branch:[]},this.cache=new Map,this.loading={id:null,promise:null},this.stores={page:Dt({}),navigating:z(null),session:z(i)},this.$session=null,this.root=null;let n=!1;this.stores.session.subscribe(async o=>{if(this.$session=o,!n||!this.router)return;this.session_id+=1;const l=this.router.parse(new URL(location.href));l&&this.update(l,[],!0)}),n=!0}async start({status:t,error:e,nodes:s,page:i}){const a=[];let n={},o,l;try{for(let c=0;c<s.length;c+=1){const u=c===s.length-1,f=await this._load_node({module:await s[c],page:i,stuff:n,status:u?t:void 0,error:u?e:void 0});if(a.push(f),f&&f.loaded)if(f.loaded.error){if(e)throw f.loaded.error;l={status:f.loaded.status,error:f.loaded.error,path:i.path,query:i.query}}else f.loaded.stuff&&(n=E(E({},n),f.loaded.stuff))}o=l?await this._load_error(l):await this._get_navigation_result_from_branch({page:i,branch:a})}catch(c){if(e)throw c;o=await this._load_error({status:500,error:at(c),path:i.path,query:i.query})}if(o.redirect){location.href=new URL(o.redirect,location.href).href;return}this._init(o)}notify({path:t,query:e}){dispatchEvent(new CustomEvent("sveltekit:navigation-start")),this.started&&this.stores.navigating.set({from:{path:this.current.page.path,query:this.current.page.query},to:{path:t,query:e}})}async update(t,e,s,i){const a=this.token={};let n=await this._get_navigation_result(t,s);if(a!==this.token)return;if(this.invalid.clear(),n.redirect)if(e.length>10||e.includes(t.path))n=await this._load_error({status:500,error:new Error("Redirect loop"),path:t.path,query:t.query});else{this.router?this.router.goto(n.redirect,{replaceState:!0},[...e,t.path]):location.href=new URL(n.redirect,location.href).href;return}if(n.reload?location.reload():this.started?(this.current=n.state,this.root.$set(n.props),this.stores.navigating.set(null)):this._init(n),i){const{hash:l,scroll:c,keepfocus:u}=i;u||document.body.focus();const f=l&&document.getElementById(l.slice(1));c?scrollTo(c.x,c.y):f?f.scrollIntoView():scrollTo(0,0)}if(await 0,dispatchEvent(new CustomEvent("sveltekit:navigation-end")),this.loading.promise=null,this.loading.id=null,!this.router)return;const o=n.state.branch[n.state.branch.length-1];o&&o.module.router===!1?this.router.disable():this.router.enable()}load(t){return this.loading.promise=this._get_navigation_result(t,!1),this.loading.id=t.id,this.loading.promise}invalidate(t){return this.invalid.add(t),this.invalidating||(this.invalidating=Promise.resolve().then(async()=>{const e=this.router&&this.router.parse(new URL(location.href));e&&await this.update(e,[],!0),this.invalidating=null})),this.invalidating}_init(t){this.current=t.state;const e=document.querySelector("style[data-svelte]");e&&e.remove(),this.root=new this.Root({target:this.target,props:E({stores:this.stores},t.props),hydrate:!0}),this.started=!0}async _get_navigation_result(t,e){if(this.loading.id===t.id&&this.loading.promise)return this.loading.promise;for(let s=0;s<t.routes.length;s+=1){const i=t.routes[s];if(i.length===1)return{reload:!0,props:{},state:this.current};let a=s+1;for(;a<t.routes.length;){const o=t.routes[a];if(o[0].toString()===i[0].toString())o.length!==1&&o[1].forEach(l=>l()),a+=1;else break}const n=await this._load({route:i,info:t},e);if(n)return n}return await this._load_error({status:404,error:new Error(`Not found: ${t.path}`),path:t.path,query:t.query})}async _get_navigation_result_from_branch({page:t,branch:e}){const s=e.filter(Boolean),i=s.find(l=>l.loaded&&l.loaded.redirect),a={redirect:i&&i.loaded?i.loaded.redirect:void 0,state:{page:t,branch:e,session_id:this.session_id},props:{components:s.map(l=>l.module.default)}};for(let l=0;l<s.length;l+=1){const c=s[l].loaded;a.props[`props_${l}`]=c?await c.props:null}(!this.current.page||t.path!==this.current.page.path||t.query.toString()!==this.current.page.query.toString())&&(a.props.page=t);const n=s[s.length-1],o=n.loaded&&n.loaded.maxage;if(o){const l=`${t.path}?${t.query}`;let c=!1;const u=()=>{this.cache.get(l)===a&&this.cache.delete(l),h(),clearTimeout(f)},f=setTimeout(u,o*1e3),h=this.stores.session.subscribe(()=>{c&&u()});c=!0,this.cache.set(l,a)}return a}async _load_node({status:t,error:e,module:s,page:i,stuff:a}){const n={module:s,uses:{params:new Set,path:!1,query:!1,session:!1,stuff:!1,dependencies:[]},loaded:null,stuff:a},o={};for(const c in i.params)Object.defineProperty(o,c,{get(){return n.uses.params.add(c),i.params[c]},enumerable:!0});const l=this.$session;if(s.load){const{started:c}=this,u={page:{host:i.host,params:o,get path(){return n.uses.path=!0,i.path},get query(){return n.uses.query=!0,i.query}},get session(){return n.uses.session=!0,l},get stuff(){return n.uses.stuff=!0,E({},a)},fetch(h,R){const $=typeof h=="string"?h:h.url,{href:A}=new URL($,new URL(i.path,document.baseURI));return n.uses.dependencies.push(A),c?fetch(h,R):Bt(h,R)}};e&&(u.status=t,u.error=e);const f=await s.load.call(null,u);if(!f)return;n.loaded=Vt(f),n.loaded.stuff&&(n.stuff=n.loaded.stuff)}return n}async _load({route:t,info:{path:e,decoded_path:s,query:i}},a){const n=`${s}?${i}`;if(!a){const d=this.cache.get(n);if(d)return d}const[o,l,c,u]=t,f=u?u(o.exec(s)):{},h=this.current.page&&{path:e!==this.current.page.path,params:Object.keys(f).filter(d=>this.current.page.params[d]!==f[d]),query:i.toString()!==this.current.page.query.toString(),session:this.session_id!==this.current.session_id},R={host:this.host,path:e,query:i,params:f};let $=[],A={},M=!1,C=200,j;l.forEach(d=>d());t:for(let d=0;d<l.length;d+=1){let _;try{if(!l[d])continue;const w=await l[d](),m=this.current.branch[d];if(!m||w!==m.module||h.path&&m.uses.path||h.params.some(S=>m.uses.params.has(S))||h.query&&m.uses.query||h.session&&m.uses.session||m.uses.dependencies.some(S=>this.invalid.has(S))||M&&m.uses.stuff){_=await this._load_node({module:w,page:R,stuff:A});const S=d===l.length-1;if(_&&_.loaded){if(_.loaded.error&&(C=_.loaded.status,j=_.loaded.error),_.loaded.redirect)return{redirect:_.loaded.redirect,props:{},state:this.current};_.loaded.stuff&&(M=!0)}else if(S&&w.load)return}else _=m}catch(w){C=500,j=at(w)}if(j){for(;d--;)if(c[d]){let w,m,N=d;for(;!(m=$[N]);)N-=1;try{if(w=await this._load_node({status:C,error:j,module:await c[d](),page:R,stuff:m.stuff}),w&&w.loaded&&w.loaded.error)continue;$=$.slice(0,N+1).concat(w);break t}catch(S){continue}}return await this._load_error({status:C,error:j,path:e,query:i})}else _&&_.loaded&&_.loaded.stuff&&(A=E(E({},A),_.loaded.stuff)),$.push(_)}return await this._get_navigation_result_from_branch({page:R,branch:$})}async _load_error({status:t,error:e,path:s,query:i}){const a={host:this.host,path:s,query:i,params:{}},n=await this._load_node({module:await this.fallback[0],page:a,stuff:{}}),o=[n,await this._load_node({status:t,error:e,module:await this.fallback[1],page:a,stuff:n&&n.loaded&&n.loaded.stuff||{}})];return await this._get_navigation_result_from_branch({page:a,branch:o})}}async function Gt({paths:r,target:t,session:e,host:s,route:i,spa:a,trailing_slash:n,hydrate:o}){const l=new Kt({Root:It,fallback:Tt,target:t,session:e,host:s}),c=i?new Ct({base:r.base,routes:jt,trailing_slash:n,renderer:l}):null;$t(c),Ot(r),o&&await l.start(o),c&&(a&&c.goto(location.href,{replaceState:!0},[]),c.init_listeners()),dispatchEvent(new CustomEvent("sveltekit:start"))}export{Gt as start};
