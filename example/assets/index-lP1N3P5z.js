var ee=Object.defineProperty;var ne=(t,e,n)=>e in t?ee(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var y=(t,e,n)=>(ne(t,typeof e!="symbol"?e+"":e,n),n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();const $=document,G=window,Tt=$.documentElement,D=$.createElement.bind($),Pt=D("div"),tt=D("table"),ie=D("tbody"),bt=D("tr"),{isArray:V,prototype:Ot}=Array,{concat:se,filter:ot,indexOf:Mt,map:It,push:re,slice:Rt,some:ut,splice:oe}=Ot,ue=/^#(?:[\w-]|\\.|[^\x00-\xa0])*$/,ae=/^\.(?:[\w-]|\\.|[^\x00-\xa0])*$/,ce=/<.+>/,fe=/^\w+$/;function at(t,e){const n=he(e);return!t||!n&&!k(e)&&!b(e)?[]:!n&&ae.test(t)?e.getElementsByClassName(t.slice(1).replace(/\\/g,"")):!n&&fe.test(t)?e.getElementsByTagName(t):e.querySelectorAll(t)}class X{constructor(e,n){if(!e)return;if(st(e))return e;let i=e;if(w(e)){const s=n||$;if(i=ue.test(e)&&k(s)?s.getElementById(e.slice(1).replace(/\\/g,"")):ce.test(e)?At(e):st(s)?s.find(e):w(s)?c(s).find(e):at(e,s),!i)return}else if(F(e))return this.ready(e);(i.nodeType||i===G)&&(i=[i]),this.length=i.length;for(let s=0,r=this.length;s<r;s++)this[s]=i[s]}init(e,n){return new X(e,n)}}const u=X.prototype,c=u.init;c.fn=c.prototype=u;u.length=0;u.splice=oe;typeof Symbol=="function"&&(u[Symbol.iterator]=Ot[Symbol.iterator]);function st(t){return t instanceof X}function H(t){return!!t&&t===t.window}function k(t){return!!t&&t.nodeType===9}function he(t){return!!t&&t.nodeType===11}function b(t){return!!t&&t.nodeType===1}function le(t){return!!t&&t.nodeType===3}function de(t){return typeof t=="boolean"}function F(t){return typeof t=="function"}function w(t){return typeof t=="string"}function v(t){return t===void 0}function q(t){return t===null}function $t(t){return!isNaN(parseFloat(t))&&isFinite(t)}function ct(t){if(typeof t!="object"||t===null)return!1;const e=Object.getPrototypeOf(t);return e===null||e===Object.prototype}c.isWindow=H;c.isFunction=F;c.isArray=V;c.isNumeric=$t;c.isPlainObject=ct;function m(t,e,n){if(n){let i=t.length;for(;i--;)if(e.call(t[i],i,t[i])===!1)return t}else if(ct(t)){const i=Object.keys(t);for(let s=0,r=i.length;s<r;s++){const o=i[s];if(e.call(t[o],o,t[o])===!1)return t}}else for(let i=0,s=t.length;i<s;i++)if(e.call(t[i],i,t[i])===!1)return t;return t}c.each=m;u.each=function(t){return m(this,t)};u.empty=function(){return this.each((t,e)=>{for(;e.firstChild;)e.removeChild(e.firstChild)})};function J(...t){const e=de(t[0])?t.shift():!1,n=t.shift(),i=t.length;if(!n)return{};if(!i)return J(e,c,n);for(let s=0;s<i;s++){const r=t[s];for(const o in r)e&&(V(r[o])||ct(r[o]))?((!n[o]||n[o].constructor!==r[o].constructor)&&(n[o]=new r[o].constructor),J(e,n[o],r[o])):n[o]=r[o]}return n}c.extend=J;u.extend=function(t){return J(u,t)};const pe=/\S+/g;function Y(t){return w(t)?t.match(pe)||[]:[]}u.toggleClass=function(t,e){const n=Y(t),i=!v(e);return this.each((s,r)=>{b(r)&&m(n,(o,a)=>{i?e?r.classList.add(a):r.classList.remove(a):r.classList.toggle(a)})})};u.addClass=function(t){return this.toggleClass(t,!0)};u.removeAttr=function(t){const e=Y(t);return this.each((n,i)=>{b(i)&&m(e,(s,r)=>{i.removeAttribute(r)})})};function ge(t,e){if(t){if(w(t)){if(arguments.length<2){if(!this[0]||!b(this[0]))return;const n=this[0].getAttribute(t);return q(n)?void 0:n}return v(e)?this:q(e)?this.removeAttr(t):this.each((n,i)=>{b(i)&&i.setAttribute(t,e)})}for(const n in t)this.attr(n,t[n]);return this}}u.attr=ge;u.removeClass=function(t){return arguments.length?this.toggleClass(t,!1):this.attr("class","")};u.hasClass=function(t){return!!t&&ut.call(this,e=>b(e)&&e.classList.contains(t))};u.get=function(t){return v(t)?Rt.call(this):(t=Number(t),this[t<0?t+this.length:t])};u.eq=function(t){return c(this.get(t))};u.first=function(){return this.eq(0)};u.last=function(){return this.eq(-1)};function _e(t){return v(t)?this.get().map(e=>b(e)||le(e)?e.textContent:"").join(""):this.each((e,n)=>{b(n)&&(n.textContent=t)})}u.text=_e;function x(t,e,n){if(!b(t))return;const i=G.getComputedStyle(t,null);return n?i.getPropertyValue(e)||void 0:i[e]||t.style[e]}function O(t,e){return parseInt(x(t,e),10)||0}function mt(t,e){return O(t,`border${e?"Left":"Top"}Width`)+O(t,`padding${e?"Left":"Top"}`)+O(t,`padding${e?"Right":"Bottom"}`)+O(t,`border${e?"Right":"Bottom"}Width`)}const et={};function ye(t){if(et[t])return et[t];const e=D(t);$.body.insertBefore(e,null);const n=x(e,"display");return $.body.removeChild(e),et[t]=n!=="none"?n:"block"}function wt(t){return x(t,"display")==="none"}function xt(t,e){const n=t&&(t.matches||t.webkitMatchesSelector||t.msMatchesSelector);return!!n&&!!e&&n.call(t,e)}function K(t){return w(t)?(e,n)=>xt(n,t):F(t)?t:st(t)?(e,n)=>t.is(n):t?(e,n)=>n===t:()=>!1}u.filter=function(t){const e=K(t);return c(ot.call(this,(n,i)=>e.call(n,i,n)))};function N(t,e){return e?t.filter(e):t}u.detach=function(t){return N(this,t).each((e,n)=>{n.parentNode&&n.parentNode.removeChild(n)}),this};const be=/^\s*<(\w+)[^>]*>/,me=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,vt={"*":Pt,tr:ie,td:bt,th:bt,thead:tt,tbody:tt,tfoot:tt};function At(t){if(!w(t))return[];if(me.test(t))return[D(RegExp.$1)];const e=be.test(t)&&RegExp.$1,n=vt[e]||vt["*"];return n.innerHTML=t,c(n.childNodes).detach().get()}c.parseHTML=At;u.has=function(t){const e=w(t)?(n,i)=>at(t,i).length:(n,i)=>i.contains(t);return this.filter(e)};u.not=function(t){const e=K(t);return this.filter((n,i)=>(!w(t)||b(i))&&!e.call(i,n,i))};function A(t,e,n,i){const s=[],r=F(e),o=i&&K(i);for(let a=0,h=t.length;a<h;a++)if(r){const f=e(t[a]);f.length&&re.apply(s,f)}else{let f=t[a][e];for(;f!=null&&!(i&&o(-1,f));)s.push(f),f=n?f[e]:null}return s}function Nt(t){return t.multiple&&t.options?A(ot.call(t.options,e=>e.selected&&!e.disabled&&!e.parentNode.disabled),"value"):t.value||""}function we(t){return arguments.length?this.each((e,n)=>{const i=n.multiple&&n.options;if(i||zt.test(n.type)){const s=V(t)?It.call(t,String):q(t)?[]:[String(t)];i?m(n.options,(r,o)=>{o.selected=s.indexOf(o.value)>=0},!0):n.checked=s.indexOf(n.value)>=0}else n.value=v(t)||q(t)?"":t}):this[0]&&Nt(this[0])}u.val=we;u.is=function(t){const e=K(t);return ut.call(this,(n,i)=>e.call(n,i,n))};c.guid=1;function I(t){return t.length>1?ot.call(t,(e,n,i)=>Mt.call(i,e)===n):t}c.unique=I;u.add=function(t,e){return c(I(this.get().concat(c(t,e).get())))};u.children=function(t){return N(c(I(A(this,e=>e.children))),t)};u.parent=function(t){return N(c(I(A(this,"parentNode"))),t)};u.index=function(t){const e=t?c(t)[0]:this[0],n=t?this:c(e).parent().children();return Mt.call(n,e)};u.closest=function(t){const e=this.filter(t);if(e.length)return e;const n=this.parent();return n.length?n.closest(t):e};u.siblings=function(t){return N(c(I(A(this,e=>c(e).parent().children().not(e)))),t)};u.find=function(t){return c(I(A(this,e=>at(t,e))))};const ve=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,Ce=/^$|^module$|\/(java|ecma)script/i,Se=["type","src","nonce","noModule"];function Ee(t,e){const n=c(t);n.filter("script").add(n.find("script")).each((i,s)=>{if(Ce.test(s.type)&&Tt.contains(s)){const r=D("script");r.text=s.textContent.replace(ve,""),m(Se,(o,a)=>{s[a]&&(r[a]=s[a])}),e.head.insertBefore(r,null),e.head.removeChild(r)}})}function Te(t,e,n,i,s){i?t.insertBefore(e,n?t.firstChild:null):t.nodeName==="HTML"?t.parentNode.replaceChild(e,t):t.parentNode.insertBefore(e,n?t:t.nextSibling),s&&Ee(e,t.ownerDocument)}function L(t,e,n,i,s,r,o,a){return m(t,(h,f)=>{m(c(f),(_,l)=>{m(c(e),(g,d)=>{const C=n?l:d,p=n?d:l,S=n?_:g;Te(C,S?p.cloneNode(!0):p,i,s,!S)},a)},o)},r),e}u.after=function(){return L(arguments,this,!1,!1,!1,!0,!0)};u.append=function(){return L(arguments,this,!1,!1,!0)};function Pe(t){if(!arguments.length)return this[0]&&this[0].innerHTML;if(v(t))return this;const e=/<script[\s>]/.test(t);return this.each((n,i)=>{b(i)&&(e?c(i).empty().append(t):i.innerHTML=t)})}u.html=Pe;u.appendTo=function(t){return L(arguments,this,!0,!1,!0)};u.wrapInner=function(t){return this.each((e,n)=>{const i=c(n),s=i.contents();s.length?s.wrapAll(t):i.append(t)})};u.before=function(){return L(arguments,this,!1,!0)};u.wrapAll=function(t){let e=c(t),n=e[0];for(;n.children.length;)n=n.firstElementChild;return this.first().before(e),this.appendTo(n)};u.wrap=function(t){return this.each((e,n)=>{const i=c(t)[0];c(n).wrapAll(e?i.cloneNode(!0):i)})};u.insertAfter=function(t){return L(arguments,this,!0,!1,!1,!1,!1,!0)};u.insertBefore=function(t){return L(arguments,this,!0,!0)};u.prepend=function(){return L(arguments,this,!1,!0,!0,!0,!0)};u.prependTo=function(t){return L(arguments,this,!0,!0,!0,!1,!1,!0)};u.contents=function(){return c(I(A(this,t=>t.tagName==="IFRAME"?[t.contentDocument]:t.tagName==="TEMPLATE"?t.content.childNodes:t.childNodes)))};u.next=function(t,e,n){return N(c(I(A(this,"nextElementSibling",e,n))),t)};u.nextAll=function(t){return this.next(t,!0)};u.nextUntil=function(t,e){return this.next(e,!0,t)};u.parents=function(t,e){return N(c(I(A(this,"parentElement",!0,e))),t)};u.parentsUntil=function(t,e){return this.parents(e,t)};u.prev=function(t,e,n){return N(c(I(A(this,"previousElementSibling",e,n))),t)};u.prevAll=function(t){return this.prev(t,!0)};u.prevUntil=function(t,e){return this.prev(e,!0,t)};u.map=function(t){return c(se.apply([],It.call(this,(e,n)=>t.call(e,n,e))))};u.clone=function(){return this.map((t,e)=>e.cloneNode(!0))};u.offsetParent=function(){return this.map((t,e)=>{let n=e.offsetParent;for(;n&&x(n,"position")==="static";)n=n.offsetParent;return n||Tt})};u.slice=function(t,e){return c(Rt.call(this,t,e))};const Oe=/-([a-z])/g;function ft(t){return t.replace(Oe,(e,n)=>n.toUpperCase())}u.ready=function(t){const e=()=>setTimeout(t,0,c);return $.readyState!=="loading"?e():$.addEventListener("DOMContentLoaded",e),this};u.unwrap=function(){return this.parent().each((t,e)=>{if(e.tagName==="BODY")return;const n=c(e);n.replaceWith(n.children())}),this};u.offset=function(){const t=this[0];if(!t)return;const e=t.getBoundingClientRect();return{top:e.top+G.pageYOffset,left:e.left+G.pageXOffset}};u.position=function(){const t=this[0];if(!t)return;const e=x(t,"position")==="fixed",n=e?t.getBoundingClientRect():this.offset();if(!e){const i=t.ownerDocument;let s=t.offsetParent||i.documentElement;for(;(s===i.body||s===i.documentElement)&&x(s,"position")==="static";)s=s.parentNode;if(s!==t&&b(s)){const r=c(s).offset();n.top-=r.top+O(s,"borderTopWidth"),n.left-=r.left+O(s,"borderLeftWidth")}}return{top:n.top-O(t,"marginTop"),left:n.left-O(t,"marginLeft")}};const Lt={class:"className",contenteditable:"contentEditable",for:"htmlFor",readonly:"readOnly",maxlength:"maxLength",tabindex:"tabIndex",colspan:"colSpan",rowspan:"rowSpan",usemap:"useMap"};u.prop=function(t,e){if(t){if(w(t))return t=Lt[t]||t,arguments.length<2?this[0]&&this[0][t]:this.each((n,i)=>{i[t]=e});for(const n in t)this.prop(n,t[n]);return this}};u.removeProp=function(t){return this.each((e,n)=>{delete n[Lt[t]||t]})};const Me=/^--/;function ht(t){return Me.test(t)}const nt={},{style:Ie}=Pt,Re=["webkit","moz","ms"];function $e(t,e=ht(t)){if(e)return t;if(!nt[t]){const n=ft(t),i=`${n[0].toUpperCase()}${n.slice(1)}`,s=`${n} ${Re.join(`${i} `)}${i}`.split(" ");m(s,(r,o)=>{if(o in Ie)return nt[t]=o,!1})}return nt[t]}const xe={animationIterationCount:!0,columnCount:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,gridArea:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnStart:!0,gridRow:!0,gridRowEnd:!0,gridRowStart:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0};function kt(t,e,n=ht(t)){return!n&&!xe[t]&&$t(e)?`${e}px`:e}function Ae(t,e){if(w(t)){const n=ht(t);return t=$e(t,n),arguments.length<2?this[0]&&x(this[0],t,n):t?(e=kt(t,e,n),this.each((i,s)=>{b(s)&&(n?s.style.setProperty(t,e):s.style[t]=e)})):this}for(const n in t)this.css(n,t[n]);return this}u.css=Ae;function Dt(t,e){try{return t(e)}catch{return e}}const Ne=/^\s+|\s+$/;function Ct(t,e){const n=t.dataset[e]||t.dataset[ft(e)];return Ne.test(n)?n:Dt(JSON.parse,n)}function Le(t,e,n){n=Dt(JSON.stringify,n),t.dataset[ft(e)]=n}function ke(t,e){if(!t){if(!this[0])return;const n={};for(const i in this[0].dataset)n[i]=Ct(this[0],i);return n}if(w(t))return arguments.length<2?this[0]&&Ct(this[0],t):v(e)?this:this.each((n,i)=>{Le(i,t,e)});for(const n in t)this.data(n,t[n]);return this}u.data=ke;function Ft(t,e){const n=t.documentElement;return Math.max(t.body[`scroll${e}`],n[`scroll${e}`],t.body[`offset${e}`],n[`offset${e}`],n[`client${e}`])}m([!0,!1],(t,e)=>{m(["Width","Height"],(n,i)=>{const s=`${e?"outer":"inner"}${i}`;u[s]=function(r){if(this[0])return H(this[0])?e?this[0][`inner${i}`]:this[0].document.documentElement[`client${i}`]:k(this[0])?Ft(this[0],i):this[0][`${e?"offset":"client"}${i}`]+(r&&e?O(this[0],`margin${n?"Top":"Left"}`)+O(this[0],`margin${n?"Bottom":"Right"}`):0)}})});m(["Width","Height"],(t,e)=>{const n=e.toLowerCase();u[n]=function(i){if(!this[0])return v(i)?void 0:this;if(!arguments.length)return H(this[0])?this[0].document.documentElement[`client${e}`]:k(this[0])?Ft(this[0],e):this[0].getBoundingClientRect()[n]-mt(this[0],!t);const s=parseInt(i,10);return this.each((r,o)=>{if(!b(o))return;const a=x(o,"boxSizing");o.style[n]=kt(n,s+(a==="border-box"?mt(o,!t):0))})}});const St="___cd";u.toggle=function(t){return this.each((e,n)=>{if(!b(n))return;const i=wt(n);(v(t)?i:t)?(n.style.display=n[St]||"",wt(n)&&(n.style.display=ye(n.tagName))):i||(n[St]=x(n,"display"),n.style.display="none")})};u.hide=function(){return this.toggle(!1)};u.show=function(){return this.toggle(!0)};const Et="___ce",lt=".",dt={focus:"focusin",blur:"focusout"},Ut={mouseenter:"mouseover",mouseleave:"mouseout"},De=/^(mouse|pointer|contextmenu|drag|drop|click|dblclick)/i;function pt(t){return Ut[t]||dt[t]||t}function gt(t){const e=t.split(lt);return[e[0],e.slice(1).sort()]}u.trigger=function(t,e){if(w(t)){const[i,s]=gt(t),r=pt(i);if(!r)return this;const o=De.test(r)?"MouseEvents":"HTMLEvents";t=$.createEvent(o),t.initEvent(r,!0,!0),t.namespace=s.join(lt),t.___ot=i}t.___td=e;const n=t.___ot in dt;return this.each((i,s)=>{n&&F(s[t.___ot])&&(s[`___i${t.type}`]=!0,s[t.___ot](),s[`___i${t.type}`]=!1),s.dispatchEvent(t)})};function Ht(t){return t[Et]=t[Et]||{}}function Fe(t,e,n,i,s){const r=Ht(t);r[e]=r[e]||[],r[e].push([n,i,s]),t.addEventListener(e,s)}function jt(t,e){return!e||!ut.call(e,n=>t.indexOf(n)<0)}function Q(t,e,n,i,s){const r=Ht(t);if(e)r[e]&&(r[e]=r[e].filter(([o,a,h])=>{if(s&&h.guid!==s.guid||!jt(o,n)||i&&i!==a)return!0;t.removeEventListener(e,h)}));else for(e in r)Q(t,e,n,i,s)}u.off=function(t,e,n){if(v(t))this.each((i,s)=>{!b(s)&&!k(s)&&!H(s)||Q(s)});else if(w(t))F(e)&&(n=e,e=""),m(Y(t),(i,s)=>{const[r,o]=gt(s),a=pt(r);this.each((h,f)=>{!b(f)&&!k(f)&&!H(f)||Q(f,a,o,e,n)})});else for(const i in t)this.off(i,t[i]);return this};u.remove=function(t){return N(this,t).detach().off(),this};u.replaceWith=function(t){return this.before(t).remove()};u.replaceAll=function(t){return c(t).replaceWith(this),this};function Ue(t,e,n,i,s){if(!w(t)){for(const r in t)this.on(r,e,n,t[r],s);return this}return w(e)||(v(e)||q(e)?e="":v(n)?(n=e,e=""):(i=n,n=e,e="")),F(i)||(i=n,n=void 0),i?(m(Y(t),(r,o)=>{const[a,h]=gt(o),f=pt(a),_=a in Ut,l=a in dt;f&&this.each((g,d)=>{if(!b(d)&&!k(d)&&!H(d))return;const C=function(p){if(p.target[`___i${p.type}`])return p.stopImmediatePropagation();if(p.namespace&&!jt(h,p.namespace.split(lt))||!e&&(l&&(p.target!==d||p.___ot===f)||_&&p.relatedTarget&&d.contains(p.relatedTarget)))return;let S=d;if(e){let E=p.target;for(;!xt(E,e);)if(E===d||(E=E.parentNode,!E))return;S=E}Object.defineProperty(p,"currentTarget",{configurable:!0,get(){return S}}),Object.defineProperty(p,"delegateTarget",{configurable:!0,get(){return d}}),Object.defineProperty(p,"data",{configurable:!0,get(){return n}});const R=i.call(S,p,p.___td);s&&Q(d,f,h,e,C),R===!1&&(p.preventDefault(),p.stopPropagation())};C.guid=i.guid=i.guid||c.guid++,Fe(d,f,h,e,C)})}),this):this}u.on=Ue;function He(t,e,n,i){return this.on(t,e,n,i,!0)}u.one=He;const je=/\r?\n/g;function ze(t,e){return`&${encodeURIComponent(t)}=${encodeURIComponent(e.replace(je,`\r
`))}`}const Be=/file|reset|submit|button|image/i,zt=/radio|checkbox/i;u.serialize=function(){let t="";return this.each((e,n)=>{m(n.elements||[n],(i,s)=>{if(s.disabled||!s.name||s.tagName==="FIELDSET"||Be.test(s.type)||zt.test(s.type)&&!s.checked)return;const r=Nt(s);if(!v(r)){const o=V(r)?r:[r];m(o,(a,h)=>{t+=ze(s.name,h)})}})}),t.slice(1)};var B=Object.freeze({Linear:Object.freeze({None:function(t){return t},In:function(t){return this.None(t)},Out:function(t){return this.None(t)},InOut:function(t){return this.None(t)}}),Quadratic:Object.freeze({In:function(t){return t*t},Out:function(t){return t*(2-t)},InOut:function(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)}}),Cubic:Object.freeze({In:function(t){return t*t*t},Out:function(t){return--t*t*t+1},InOut:function(t){return(t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)}}),Quartic:Object.freeze({In:function(t){return t*t*t*t},Out:function(t){return 1- --t*t*t*t},InOut:function(t){return(t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)}}),Quintic:Object.freeze({In:function(t){return t*t*t*t*t},Out:function(t){return--t*t*t*t*t+1},InOut:function(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)}}),Sinusoidal:Object.freeze({In:function(t){return 1-Math.sin((1-t)*Math.PI/2)},Out:function(t){return Math.sin(t*Math.PI/2)},InOut:function(t){return .5*(1-Math.sin(Math.PI*(.5-t)))}}),Exponential:Object.freeze({In:function(t){return t===0?0:Math.pow(1024,t-1)},Out:function(t){return t===1?1:1-Math.pow(2,-10*t)},InOut:function(t){return t===0?0:t===1?1:(t*=2)<1?.5*Math.pow(1024,t-1):.5*(-Math.pow(2,-10*(t-1))+2)}}),Circular:Object.freeze({In:function(t){return 1-Math.sqrt(1-t*t)},Out:function(t){return Math.sqrt(1- --t*t)},InOut:function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)}}),Elastic:Object.freeze({In:function(t){return t===0?0:t===1?1:-Math.pow(2,10*(t-1))*Math.sin((t-1.1)*5*Math.PI)},Out:function(t){return t===0?0:t===1?1:Math.pow(2,-10*t)*Math.sin((t-.1)*5*Math.PI)+1},InOut:function(t){return t===0?0:t===1?1:(t*=2,t<1?-.5*Math.pow(2,10*(t-1))*Math.sin((t-1.1)*5*Math.PI):.5*Math.pow(2,-10*(t-1))*Math.sin((t-1.1)*5*Math.PI)+1)}}),Back:Object.freeze({In:function(t){var e=1.70158;return t===1?1:t*t*((e+1)*t-e)},Out:function(t){var e=1.70158;return t===0?0:--t*t*((e+1)*t+e)+1},InOut:function(t){var e=2.5949095;return(t*=2)<1?.5*(t*t*((e+1)*t-e)):.5*((t-=2)*t*((e+1)*t+e)+2)}}),Bounce:Object.freeze({In:function(t){return 1-B.Bounce.Out(1-t)},Out:function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},InOut:function(t){return t<.5?B.Bounce.In(t*2)*.5:B.Bounce.Out(t*2-1)*.5+.5}}),generatePow:function(t){return t===void 0&&(t=4),t=t<Number.EPSILON?Number.EPSILON:t,t=t>1e4?1e4:t,{In:function(e){return Math.pow(e,t)},Out:function(e){return 1-Math.pow(1-e,t)},InOut:function(e){return e<.5?Math.pow(e*2,t)/2:(1-Math.pow(2-e*2,t))/2+.5}}}}),z=function(){return performance.now()},Bt=function(){function t(){this._tweens={},this._tweensAddedDuringUpdate={}}return t.prototype.getAll=function(){var e=this;return Object.keys(this._tweens).map(function(n){return e._tweens[n]})},t.prototype.removeAll=function(){this._tweens={}},t.prototype.add=function(e){this._tweens[e.getId()]=e,this._tweensAddedDuringUpdate[e.getId()]=e},t.prototype.remove=function(e){delete this._tweens[e.getId()],delete this._tweensAddedDuringUpdate[e.getId()]},t.prototype.update=function(e,n){e===void 0&&(e=z()),n===void 0&&(n=!1);var i=Object.keys(this._tweens);if(i.length===0)return!1;for(;i.length>0;){this._tweensAddedDuringUpdate={};for(var s=0;s<i.length;s++){var r=this._tweens[i[s]],o=!n;r&&r.update(e,o)===!1&&!n&&delete this._tweens[i[s]]}i=Object.keys(this._tweensAddedDuringUpdate)}return!0},t}(),U={Linear:function(t,e){var n=t.length-1,i=n*e,s=Math.floor(i),r=U.Utils.Linear;return e<0?r(t[0],t[1],i):e>1?r(t[n],t[n-1],n-i):r(t[s],t[s+1>n?n:s+1],i-s)},Bezier:function(t,e){for(var n=0,i=t.length-1,s=Math.pow,r=U.Utils.Bernstein,o=0;o<=i;o++)n+=s(1-e,i-o)*s(e,o)*t[o]*r(i,o);return n},CatmullRom:function(t,e){var n=t.length-1,i=n*e,s=Math.floor(i),r=U.Utils.CatmullRom;return t[0]===t[n]?(e<0&&(s=Math.floor(i=n*(1+e))),r(t[(s-1+n)%n],t[s],t[(s+1)%n],t[(s+2)%n],i-s)):e<0?t[0]-(r(t[0],t[0],t[1],t[1],-i)-t[0]):e>1?t[n]-(r(t[n],t[n],t[n-1],t[n-1],i-n)-t[n]):r(t[s?s-1:0],t[s],t[n<s+1?n:s+1],t[n<s+2?n:s+2],i-s)},Utils:{Linear:function(t,e,n){return(e-t)*n+t},Bernstein:function(t,e){var n=U.Utils.Factorial;return n(t)/n(e)/n(t-e)},Factorial:function(){var t=[1];return function(e){var n=1;if(t[e])return t[e];for(var i=e;i>1;i--)n*=i;return t[e]=n,n}}(),CatmullRom:function(t,e,n,i,s){var r=(n-t)*.5,o=(i-e)*.5,a=s*s,h=s*a;return(2*e-2*n+r+o)*h+(-3*e+3*n-2*r-o)*a+r*s+e}}},qe=function(){function t(){}return t.nextId=function(){return t._nextId++},t._nextId=0,t}(),rt=new Bt,qt=function(){function t(e,n){n===void 0&&(n=rt),this._object=e,this._group=n,this._isPaused=!1,this._pauseStart=0,this._valuesStart={},this._valuesEnd={},this._valuesStartRepeat={},this._duration=1e3,this._isDynamic=!1,this._initialRepeat=0,this._repeat=0,this._yoyo=!1,this._isPlaying=!1,this._reversed=!1,this._delayTime=0,this._startTime=0,this._easingFunction=B.Linear.None,this._interpolationFunction=U.Linear,this._chainedTweens=[],this._onStartCallbackFired=!1,this._onEveryStartCallbackFired=!1,this._id=qe.nextId(),this._isChainStopped=!1,this._propertiesAreSetUp=!1,this._goToEnd=!1}return t.prototype.getId=function(){return this._id},t.prototype.isPlaying=function(){return this._isPlaying},t.prototype.isPaused=function(){return this._isPaused},t.prototype.getDuration=function(){return this._duration},t.prototype.to=function(e,n){if(n===void 0&&(n=1e3),this._isPlaying)throw new Error("Can not call Tween.to() while Tween is already started or paused. Stop the Tween first.");return this._valuesEnd=e,this._propertiesAreSetUp=!1,this._duration=n<0?0:n,this},t.prototype.duration=function(e){return e===void 0&&(e=1e3),this._duration=e<0?0:e,this},t.prototype.dynamic=function(e){return e===void 0&&(e=!1),this._isDynamic=e,this},t.prototype.start=function(e,n){if(e===void 0&&(e=z()),n===void 0&&(n=!1),this._isPlaying)return this;if(this._group&&this._group.add(this),this._repeat=this._initialRepeat,this._reversed){this._reversed=!1;for(var i in this._valuesStartRepeat)this._swapEndStartRepeatValues(i),this._valuesStart[i]=this._valuesStartRepeat[i]}if(this._isPlaying=!0,this._isPaused=!1,this._onStartCallbackFired=!1,this._onEveryStartCallbackFired=!1,this._isChainStopped=!1,this._startTime=e,this._startTime+=this._delayTime,!this._propertiesAreSetUp||n){if(this._propertiesAreSetUp=!0,!this._isDynamic){var s={};for(var r in this._valuesEnd)s[r]=this._valuesEnd[r];this._valuesEnd=s}this._setupProperties(this._object,this._valuesStart,this._valuesEnd,this._valuesStartRepeat,n)}return this},t.prototype.startFromCurrentValues=function(e){return this.start(e,!0)},t.prototype._setupProperties=function(e,n,i,s,r){for(var o in i){var a=e[o],h=Array.isArray(a),f=h?"array":typeof a,_=!h&&Array.isArray(i[o]);if(!(f==="undefined"||f==="function")){if(_){var l=i[o];if(l.length===0)continue;for(var g=[a],d=0,C=l.length;d<C;d+=1){var p=this._handleRelativeValue(a,l[d]);if(isNaN(p)){_=!1,console.warn("Found invalid interpolation list. Skipping.");break}g.push(p)}_&&(i[o]=g)}if((f==="object"||h)&&a&&!_){n[o]=h?[]:{};var S=a;for(var R in S)n[o][R]=S[R];s[o]=h?[]:{};var l=i[o];if(!this._isDynamic){var E={};for(var R in l)E[R]=l[R];i[o]=l=E}this._setupProperties(S,n[o],l,s[o],r)}else(typeof n[o]>"u"||r)&&(n[o]=a),h||(n[o]*=1),_?s[o]=i[o].slice().reverse():s[o]=n[o]||0}}},t.prototype.stop=function(){return this._isChainStopped||(this._isChainStopped=!0,this.stopChainedTweens()),this._isPlaying?(this._group&&this._group.remove(this),this._isPlaying=!1,this._isPaused=!1,this._onStopCallback&&this._onStopCallback(this._object),this):this},t.prototype.end=function(){return this._goToEnd=!0,this.update(1/0),this},t.prototype.pause=function(e){return e===void 0&&(e=z()),this._isPaused||!this._isPlaying?this:(this._isPaused=!0,this._pauseStart=e,this._group&&this._group.remove(this),this)},t.prototype.resume=function(e){return e===void 0&&(e=z()),!this._isPaused||!this._isPlaying?this:(this._isPaused=!1,this._startTime+=e-this._pauseStart,this._pauseStart=0,this._group&&this._group.add(this),this)},t.prototype.stopChainedTweens=function(){for(var e=0,n=this._chainedTweens.length;e<n;e++)this._chainedTweens[e].stop();return this},t.prototype.group=function(e){return e===void 0&&(e=rt),this._group=e,this},t.prototype.delay=function(e){return e===void 0&&(e=0),this._delayTime=e,this},t.prototype.repeat=function(e){return e===void 0&&(e=0),this._initialRepeat=e,this._repeat=e,this},t.prototype.repeatDelay=function(e){return this._repeatDelayTime=e,this},t.prototype.yoyo=function(e){return e===void 0&&(e=!1),this._yoyo=e,this},t.prototype.easing=function(e){return e===void 0&&(e=B.Linear.None),this._easingFunction=e,this},t.prototype.interpolation=function(e){return e===void 0&&(e=U.Linear),this._interpolationFunction=e,this},t.prototype.chain=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];return this._chainedTweens=e,this},t.prototype.onStart=function(e){return this._onStartCallback=e,this},t.prototype.onEveryStart=function(e){return this._onEveryStartCallback=e,this},t.prototype.onUpdate=function(e){return this._onUpdateCallback=e,this},t.prototype.onRepeat=function(e){return this._onRepeatCallback=e,this},t.prototype.onComplete=function(e){return this._onCompleteCallback=e,this},t.prototype.onStop=function(e){return this._onStopCallback=e,this},t.prototype.update=function(e,n){var i=this,s;if(e===void 0&&(e=z()),n===void 0&&(n=!0),this._isPaused)return!0;var r,o=this._startTime+this._duration;if(!this._goToEnd&&!this._isPlaying){if(e>o)return!1;n&&this.start(e,!0)}if(this._goToEnd=!1,e<this._startTime)return!0;this._onStartCallbackFired===!1&&(this._onStartCallback&&this._onStartCallback(this._object),this._onStartCallbackFired=!0),this._onEveryStartCallbackFired===!1&&(this._onEveryStartCallback&&this._onEveryStartCallback(this._object),this._onEveryStartCallbackFired=!0);var a=e-this._startTime,h=this._duration+((s=this._repeatDelayTime)!==null&&s!==void 0?s:this._delayTime),f=this._duration+this._repeat*h,_=function(){if(i._duration===0||a>f)return 1;var S=Math.trunc(a/h),R=a-S*h,E=Math.min(R/i._duration,1);return E===0&&a===i._duration?1:E},l=_(),g=this._easingFunction(l);if(this._updateProperties(this._object,this._valuesStart,this._valuesEnd,g),this._onUpdateCallback&&this._onUpdateCallback(this._object,l),this._duration===0||a>=this._duration)if(this._repeat>0){var d=Math.min(Math.trunc((a-this._duration)/h)+1,this._repeat);isFinite(this._repeat)&&(this._repeat-=d);for(r in this._valuesStartRepeat)!this._yoyo&&typeof this._valuesEnd[r]=="string"&&(this._valuesStartRepeat[r]=this._valuesStartRepeat[r]+parseFloat(this._valuesEnd[r])),this._yoyo&&this._swapEndStartRepeatValues(r),this._valuesStart[r]=this._valuesStartRepeat[r];return this._yoyo&&(this._reversed=!this._reversed),this._startTime+=h*d,this._onRepeatCallback&&this._onRepeatCallback(this._object),this._onEveryStartCallbackFired=!1,!0}else{this._onCompleteCallback&&this._onCompleteCallback(this._object);for(var C=0,p=this._chainedTweens.length;C<p;C++)this._chainedTweens[C].start(this._startTime+this._duration,!1);return this._isPlaying=!1,!1}return!0},t.prototype._updateProperties=function(e,n,i,s){for(var r in i)if(n[r]!==void 0){var o=n[r]||0,a=i[r],h=Array.isArray(e[r]),f=Array.isArray(a),_=!h&&f;_?e[r]=this._interpolationFunction(a,s):typeof a=="object"&&a?this._updateProperties(e[r],o,a,s):(a=this._handleRelativeValue(o,a),typeof a=="number"&&(e[r]=o+(a-o)*s))}},t.prototype._handleRelativeValue=function(e,n){return typeof n!="string"?n:n.charAt(0)==="+"||n.charAt(0)==="-"?e+parseFloat(n):parseFloat(n)},t.prototype._swapEndStartRepeatValues=function(e){var n=this._valuesStartRepeat[e],i=this._valuesEnd[e];typeof i=="string"?this._valuesStartRepeat[e]=this._valuesStartRepeat[e]+parseFloat(i):this._valuesStartRepeat[e]=this._valuesEnd[e],this._valuesEnd[e]=n},t}(),M=rt;M.getAll.bind(M);M.removeAll.bind(M);M.add.bind(M);M.remove.bind(M);M.update.bind(M);const We=`<svg class="svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1">\r
	<path d="M512 557.223994l249.203712 249.203712c12.491499 12.491499 32.730449 12.489452 45.221948-0.002047s12.493545-32.730449 0.002047-45.221948L557.223994 512l249.203712-249.203712c12.491499-12.491499 12.489452-32.730449-0.002047-45.221948s-32.730449-12.493545-45.221948-0.002047L512 466.776006 262.796288 217.572294c-12.491499-12.491499-32.729425-12.490475-45.220924 0.001023-6.246261 6.246261-9.370415 14.429641-9.370415 22.610974s3.121084 16.365736 9.367345 22.610974L466.774983 512 217.572294 761.203712c-6.246261 6.246261-9.367345 14.428617-9.367345 22.610974s3.125177 16.365736 9.370415 22.610974c12.491499 12.491499 32.729425 12.493545 45.220924 0.002047L512 557.223994z">\r
	</path>\r
</svg>\r
`,Ge="notice-message",Je=`<div class="notice">
                           <div class="icon"></div>
                           <div class="text"></div>
                       </div>`,Qe='<div class="btn-del"></div>',Ve=3e3,Xe=48,Ye=16,_t=new Bt;Wt();function Wt(){requestAnimationFrame(Wt),_t.update()}class Ke{constructor(e){y(this,"content");y(this,"type");y(this,"duration");y(this,"fontSize");y(this,"align");y(this,"closable");y(this,"customClass",[]);y(this,"_onClose");y(this,"_height");y(this,"_html");y(this,"_top",0);y(this,"_gap",0);y(this,"_tweenHide");const{content:n,type:i,duration:s,fontSize:r,align:o,closable:a,height:h,customClass:f,onClose:_}=e;this.content=n,this.type=i,this.duration=s,this.fontSize=r,this.align=o,this.closable=a,this._onClose=_,this._height=h,this._html=it(Je),this._html.classList.add(Ge),this._html.classList.add(i);const l=this._html.querySelector(".text");switch(l&&(l.innerText=this.content,l.style.fontSize=`${r}px`,l.style.lineHeight=`${r}px`),this._html.style.setProperty("height",`${this._height}px`),o){case"left":{this._html.style.setProperty("left","16px");break}case"center":{this._html.style.setProperty("left","50%"),this._html.style.setProperty("transform","translateX(-50%)");break}case"right":{this._html.style.setProperty("right","16px");break}}if(f)if(Array.isArray(f))for(const g of f)typeof g=="string"&&this.addCustomClass(g);else typeof f=="string"&&this.addCustomClass(f);if(a){const g=it(Qe),d=it(We);g.appendChild(d),this._html.appendChild(g),g.addEventListener("click",C=>{this.close()})}}get html(){return this._html}get top(){return this._top}get height(){return this._height}get gap(){return this._gap}get onClose(){return this._onClose}get totalHeight(){return this._height+this._gap}set tweenHide(e){this._tweenHide=e}setTop(e,n=!1){if(this._top=e,n){const s={top:this._top-this.totalHeight},r=new qt(s,_t);r.to({top:this._top},200),r.onUpdate(o=>{this._html.style.setProperty("top",`${o.top}px`)}).onComplete(o=>{this._html.style.setProperty("top",`${o.top}px`)}),r.start()}else this._html.style.setProperty("top",`${this._top}px`)}setGap(e){this._gap=e}close(){this._tweenHide&&(this._tweenHide.isPlaying()&&this._tweenHide.stop(),this._tweenHide.delay(0),this._tweenHide.start())}addCustomClass(e){this._html.classList.add(e),this.customClass.push(e)}}const T=class T{static setContainer(e){this.container=e}static message(e){const{message:n,type:i="default",duration:s=Ve,height:r=Xe,fontSize:o=Ye,align:a="center",closable:h=!1,customClass:f,onClose:_}=e;this.verifyPopParams({duration:s,height:r,fontSize:o,onClose:_});const l=new Ke({content:n,type:i,duration:s,fontSize:o,align:a,closable:h,height:r,customClass:f,onClose:_});let g;if(this.units.length>0){l.setGap(this.gap);const d=this.units[this.units.length-1];g=d.top+d.height+l.gap}else l.setGap(this.offset),g=l.gap;this.container.appendChild(l.html),l.setTop(g,!0),this.units.push(l),this.setTweenHide({duration:s,messageUnit:l})}static verifyPopParams(e){const{duration:n,height:i,fontSize:s,onClose:r}=e;if(n<0)throw new Error("duration 不可小于 0");if(i<1)throw new Error("height 不可小于 1");if(s<12)throw new Error("fontSize 不可小于 12");if(r&&typeof r!="function")throw new Error("onClose 必须为函数")}static setTweenHide(e){const{duration:n,messageUnit:i}=e,s=i.totalHeight,r={slideDistance:s},o=new qt(r,_t);o.to({slideDistance:0},T.slideTime);let a=s;o.onStart(h=>{i.onClose&&i.onClose(i)}).onUpdate(h=>{const f=a-h.slideDistance;a=h.slideDistance;const _=T.units.findIndex(g=>g===i),l=T.units.slice(_);for(const g of l)g.setTop(g.top-f)}).onComplete(h=>{const f=T.units.findIndex(_=>_===i);T.units.splice(f,1),this.container.removeChild(i.html)}),n>0&&(o.delay(n),o.start()),i.tweenHide=o}};y(T,"offset",20),y(T,"gap",16),y(T,"slideTime",300),y(T,"units",[]),y(T,"container",document.body);let P=T;function it(t){return new DOMParser().parseFromString(t,"text/html").body.firstElementChild}const W=c('<div class="bar"></div>'),j=c('<div class="bar"></div>');c("#app").append(W);c("#app").append(j);const Gt=c("<button>默认</button>"),Jt=c("<button>成功</button>"),Qt=c("<button>警告</button>"),Vt=c("<button>错误</button>");W.append(Gt);W.append(Jt);W.append(Qt);W.append(Vt);const Xt=c("<button>随机时间</button>"),Yt=c("<button>随机高度</button>"),Kt=c("<button>不自动关闭</button>"),Zt=c("<button>自定义类名</button>"),te=c("<button>可关闭</button>");j.append(Xt);j.append(Yt);j.append(Kt);j.append(Zt);j.append(te);Gt.on("click",()=>{P.message({message:"Notice Message show"})});Jt.on("click",()=>{P.message({message:"Notice Message show",type:"success"})});Qt.on("click",()=>{P.message({message:"Notice Message show",type:"warning"})});Vt.on("click",()=>{P.message({message:"Notice Message show",type:"error"})});Xt.on("click",()=>{const t=Z(2,5),e=t*1e3,n=yt();P.message({message:`Notice Message show ${t} seconds`,type:n,duration:e})});Yt.on("click",()=>{const e=Z(6,30)*8,n=yt();P.message({message:`Notice Message of ${e}px show`,type:n,height:e})});Kt.on("click",()=>{const e=Z(6,12)*8,n=yt();P.message({message:`Notice Message of ${e}px show`,type:n,height:e,duration:0,closable:!0})});Zt.on("click",()=>{const t=["purple"];P.message({message:"Notice Purple Message show",type:"default",customClass:t,duration:3e3})});te.on("click",()=>{P.message({message:"Click the close button to close me immediately, otherwise I will close automatically after 5 seconds.",type:"default",duration:5e3,height:64,closable:!0,onClose:t=>{}})});function yt(){const t=Z(0,3);return["default","success","warning","error"][t]}function Z(t,e){return Math.round(Ze(t,e))}function Ze(t,e){return Math.random()*(e-t)+t}
