import{S as m,i as b,s as k,R as v,e as c,c as h,a as _,d as u,b as r,f as g,M as E,W as D,N as w,O as T,P as C,x as p,u as B,D as L}from"./vendor-7ce006f1.js";function N(l){let s,n,f,a;const o=l[2].default,t=v(o,l,l[1],null);return{c(){s=c("button"),t&&t.c(),this.h()},l(e){s=h(e,"BUTTON",{class:!0});var i=_(s);t&&t.l(i),i.forEach(u),this.h()},h(){r(s,"class","h-full text-center my-auto p-2 hover:text-black dark:hover:text-white")},m(e,i){g(e,s,i),t&&t.m(s,null),n=!0,f||(a=E(s,"click",function(){D(l[0])&&l[0].apply(this,arguments)}),f=!0)},p(e,[i]){l=e,t&&t.p&&(!n||i&2)&&w(t,o,l,l[1],n?C(o,l[1],i,null):T(l[1]),null)},i(e){n||(p(t,e),n=!0)},o(e){B(t,e),n=!1},d(e){e&&u(s),t&&t.d(e),f=!1,a()}}}function O(l,s,n){let{$$slots:f={},$$scope:a}=s,{onClick:o=()=>{}}=s;return l.$$set=t=>{"onClick"in t&&n(0,o=t.onClick),"$$scope"in t&&n(1,a=t.$$scope)},[o,a,f]}class y extends m{constructor(s){super();b(this,s,O,N,k,{onClick:0})}}function S(l){let s,n,f,a;const o=l[3].default,t=v(o,l,l[2],null);return{c(){s=c("a"),n=c("div"),t&&t.c(),this.h()},l(e){s=h(e,"A",{class:!0,href:!0,target:!0});var i=_(s);n=h(i,"DIV",{class:!0});var d=_(n);t&&t.l(d),d.forEach(u),i.forEach(u),this.h()},h(){r(n,"class","p-2 m-auto"),r(s,"class","flex flex-col h-full transition-colors duration-100 ease-in-out hover:text-black dark:hover:text-white"),r(s,"href",l[0]),r(s,"target",f=l[1]?"_blank":"_self")},m(e,i){g(e,s,i),L(s,n),t&&t.m(n,null),a=!0},p(e,[i]){t&&t.p&&(!a||i&4)&&w(t,o,e,e[2],a?C(o,e[2],i,null):T(e[2]),null),(!a||i&1)&&r(s,"href",e[0]),(!a||i&2&&f!==(f=e[1]?"_blank":"_self"))&&r(s,"target",f)},i(e){a||(p(t,e),a=!0)},o(e){B(t,e),a=!1},d(e){e&&u(s),t&&t.d(e)}}}function j(l,s,n){let{$$slots:f={},$$scope:a}=s,{href:o}=s,{newTab:t=!1}=s;return l.$$set=e=>{"href"in e&&n(0,o=e.href),"newTab"in e&&n(1,t=e.newTab),"$$scope"in e&&n(2,a=e.$$scope)},[o,t,a,f]}class A extends m{constructor(s){super();b(this,s,j,S,k,{href:0,newTab:1})}}export{y as B,A as L};
