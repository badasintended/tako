import{S as X,i as Y,s as Z,e as b,k as z,c as I,a as P,n as F,d as _,b as f,Y as C,f as D,D as w,M as H,ab as E,J as q,Z as K,E as x,T as B,A as L}from"../../../chunks/vendor-7ce006f1.js";import{p as O}from"../../../chunks/stores-a5b13367.js";import{s as V,a as N}from"../../../chunks/stores-e778dee3.js";import{d as S}from"../../../chunks/database-62637bf5.js";import{g as U}from"../../../chunks/navigation-51f4a605.js";import{g as Q,a as R}from"../../../chunks/source-71a1110c.js";import"../../../chunks/singletons-12a22614.js";function A(c,r,t){const o=c.slice();return o[15]=r[t],o}function G(c){let r,t,o,a,s,n,e;return{c(){r=b("div"),t=b("img"),s=z(),this.h()},l(l){r=I(l,"DIV",{class:!0});var i=P(r);t=I(i,"IMG",{class:!0,src:!0,alt:!0}),s=F(i),i.forEach(_),this.h()},h(){f(t,"class","object-contain bg-auto bg-center"),C(t.src,o=c[15].url)||f(t,"src",o),f(t,"alt",a=c[15].url),f(r,"class","flex min-w-full min-h-full justify-center cursor-pointer")},m(l,i){D(l,r,i),w(r,t),w(r,s),n||(e=H(r,"pointerup",c[2]),n=!0)},p(l,i){i&1&&!C(t.src,o=l[15].url)&&f(t,"src",o),i&1&&a!==(a=l[15].url)&&f(t,"alt",a)},d(l){l&&_(r),n=!1,e()}}}function W(c){let r,t,o=c[0],a=[];for(let s=0;s<o.length;s+=1)a[s]=G(A(c,o,s));return{c(){r=b("div"),t=b("div");for(let s=0;s<a.length;s+=1)a[s].c();this.h()},l(s){r=I(s,"DIV",{class:!0});var n=P(r);t=I(n,"DIV",{class:!0,style:!0});var e=P(t);for(let l=0;l<a.length;l+=1)a[l].l(e);e.forEach(_),n.forEach(_),this.h()},h(){f(t,"class","flex w-full h-full"),E(t,"margin-left",c[1]*-100+"%"),f(r,"class","fixed top-0 left-0 w-screen h-screen")},m(s,n){D(s,r,n),w(r,t);for(let e=0;e<a.length;e+=1)a[e].m(t,null)},p(s,[n]){if(n&5){o=s[0];let e;for(e=0;e<o.length;e+=1){const l=A(s,o,e);a[e]?a[e].p(l,n):(a[e]=G(l),a[e].c(),a[e].m(t,null))}for(;e<a.length;e+=1)a[e].d(1);a.length=o.length}n&2&&E(t,"margin-left",s[1]*-100+"%")},i:q,o:q,d(s){s&&_(r),K(a,s)}}}function $(c,r,t){let o,a,s;x(c,N,u=>t(8,o=u)),x(c,O,u=>t(3,a=u)),x(c,V,u=>t(9,s=u));const{sourceId:n,mangaId:e,chapterId:l}=a.params;B(V,s=!1,s);let i=o,g=[],m=[];const y=`/${n}/${e}`;let k=null,v=null,d;L(()=>{let u;i&&i.source===n&&i.id===e?u=Promise.resolve():u=Q(n,e).then(j=>B(N,o=i=j,o)),u.then(()=>R(n,e,l).then(j=>{g=i.chapters.sort((h,M)=>M.number-h.number);const p=g.findIndex(h=>h.id===l);0<=p&&p<g.length-1&&(k=`/${n}/${e}/${g[p+1].id}`),0<p&&p<g.length&&(v=`/${n}/${e}/${g[p-1].id}`),t(0,m=j.sort((h,M)=>h.index-M.index)),S.readChapters.filter(h=>h.sourceId===n&&h.mangaId===e&&h.chapterId===l).count().then(h=>{h==0&&S.readChapters.put({sourceId:n,mangaId:e,chapterId:l,lastPage:0,totalPage:m.length})})}))});function J(u){t(1,d=d-Math.sign(u)),d<0?U(k?`${k}?last=true`:y):d>=m.length&&U(v!=null?v:y)}function T(u){u.button==0&&J(-(u.clientX-screen.width*.33))}return c.$$.update=()=>{c.$$.dirty&9&&t(1,d=a.query.get("last")==="true"?m.length-1:0)},[m,d,T,a]}class oe extends X{constructor(r){super();Y(this,r,$,W,Z,{})}}export{oe as default};
