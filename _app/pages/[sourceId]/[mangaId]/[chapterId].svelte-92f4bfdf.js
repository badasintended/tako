import{S as T,i as Y,s as z,e as b,k as F,c as I,a as w,n as H,d as _,b as f,X as C,f as D,E as M,Q as J,a8 as E,N as q,Y as K,I as x,T as B,A as L}from"../../../chunks/vendor-b1776dd9.js";import{p as O}from"../../../chunks/stores-54dbfcc7.js";import{s as N,a as V}from"../../../chunks/stores-55cef8f4.js";import{d as S}from"../../../chunks/database-74ffdce0.js";import{g as U}from"../../../chunks/navigation-51f4a605.js";import{g as R,a as W}from"../../../chunks/source-01fb9fce.js";import"../../../chunks/singletons-12a22614.js";function X(c,r,t){const o=c.slice();return o[15]=r[t],o}function A(c){let r,t,o,a,s,n,e;return{c(){r=b("div"),t=b("img"),s=F(),this.h()},l(l){r=I(l,"DIV",{class:!0});var i=w(r);t=I(i,"IMG",{class:!0,src:!0,alt:!0}),s=H(i),i.forEach(_),this.h()},h(){f(t,"class","object-contain bg-auto bg-center"),C(t.src,o=c[15].url)||f(t,"src",o),f(t,"alt",a=c[15].url),f(r,"class","flex min-w-full min-h-full justify-center cursor-pointer")},m(l,i){D(l,r,i),M(r,t),M(r,s),n||(e=J(r,"pointerup",c[2]),n=!0)},p(l,i){i&1&&!C(t.src,o=l[15].url)&&f(t,"src",o),i&1&&a!==(a=l[15].url)&&f(t,"alt",a)},d(l){l&&_(r),n=!1,e()}}}function Z(c){let r,t,o=c[0],a=[];for(let s=0;s<o.length;s+=1)a[s]=A(X(c,o,s));return{c(){r=b("div"),t=b("div");for(let s=0;s<a.length;s+=1)a[s].c();this.h()},l(s){r=I(s,"DIV",{class:!0});var n=w(r);t=I(n,"DIV",{class:!0,style:!0});var e=w(t);for(let l=0;l<a.length;l+=1)a[l].l(e);e.forEach(_),n.forEach(_),this.h()},h(){f(t,"class","flex w-full h-full"),E(t,"margin-left",c[1]*-100+"%"),f(r,"class","fixed top-0 left-0 w-screen h-screen")},m(s,n){D(s,r,n),M(r,t);for(let e=0;e<a.length;e+=1)a[e].m(t,null)},p(s,[n]){if(n&5){o=s[0];let e;for(e=0;e<o.length;e+=1){const l=X(s,o,e);a[e]?a[e].p(l,n):(a[e]=A(l),a[e].c(),a[e].m(t,null))}for(;e<a.length;e+=1)a[e].d(1);a.length=o.length}n&2&&E(t,"margin-left",s[1]*-100+"%")},i:q,o:q,d(s){s&&_(r),K(a,s)}}}function $(c,r,t){let o,a,s;x(c,V,u=>t(8,o=u)),x(c,O,u=>t(3,a=u)),x(c,N,u=>t(9,s=u));const{sourceId:n,mangaId:e,chapterId:l}=a.params;B(N,s=!1,s);let i=o,d=[],m=[];const y=`/${n}/${e}`;let k=null,v=null,g;L(()=>{let u;i&&i.source===n&&i.id===e?u=Promise.resolve():u=R(n,e).then(j=>B(V,o=i=j,o)),u.then(()=>W(n,e,l).then(j=>{d=i.chapters.sort((h,P)=>P.number-h.number);const p=d.findIndex(h=>h.id===l);0<=p&&p<d.length-1&&(k=`/${n}/${e}/${d[p+1].id}`),0<p&&p<d.length&&(v=`/${n}/${e}/${d[p-1].id}`),t(0,m=j.sort((h,P)=>h.index-P.index)),S.readChapters.filter(h=>h.sourceId===n&&h.mangaId===e&&h.chapterId===l).count().then(h=>{h==0&&S.readChapters.put({sourceId:n,mangaId:e,chapterId:l,lastPage:0,totalPage:m.length})})}))});function G(u){t(1,g=g-Math.sign(u)),g<0?U(k?`${k}?last=true`:y):g>=m.length&&U(v!=null?v:y)}function Q(u){u.button==0&&G(-(u.clientX-screen.width*.33))}return c.$$.update=()=>{c.$$.dirty&9&&t(1,g=a.query.get("last")==="true"?m.length-1:0)},[m,g,Q,a]}class oe extends T{constructor(r){super();Y(this,r,$,Z,z,{})}}export{oe as default};
