(()=>{var e={10:(e,t,n)=>{"use strict";n.d(t,{Z:()=>o});var i=n(537),s=n.n(i),r=n(645),a=n.n(r)()(s());a.push([e.id,".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n","",{version:3,sources:["webpack://./src/framework/view/abstract-view.css"],names:[],mappings:"AAAA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE;;IAEE,wBAAwB;EAC1B;;EAEA;;;;;IAKE,2BAA2B;EAC7B;;EAEA;;;;IAIE,0BAA0B;EAC5B;AACF",sourcesContent:[".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n"],sourceRoot:""}]);const o=a},645:e=>{"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",i=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),i&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),i&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,i,s,r){"string"==typeof e&&(e=[[null,e,void 0]]);var a={};if(i)for(var o=0;o<this.length;o++){var l=this[o][0];null!=l&&(a[l]=!0)}for(var c=0;c<e.length;c++){var u=[].concat(e[c]);i&&a[u[0]]||(void 0!==r&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=r),n&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=n):u[2]=n),s&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=s):u[4]="".concat(s)),t.push(u))}},t}},537:e=>{"use strict";e.exports=function(e){var t=e[1],n=e[3];if(!n)return t;if("function"==typeof btoa){var i=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),s="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(i),r="/*# ".concat(s," */");return[t].concat([r]).join("\n")}return[t].join("\n")}},484:function(e){e.exports=function(){"use strict";var e=6e4,t=36e5,n="millisecond",i="second",s="minute",r="hour",a="day",o="week",l="month",c="quarter",u="year",d="date",f="Invalid Date",p=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,v=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,h={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],n=e%100;return"["+e+(t[(n-20)%10]||t[n]||t[0])+"]"}},m=function(e,t,n){var i=String(e);return!i||i.length>=t?e:""+Array(t+1-i.length).join(n)+e},_={s:m,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),i=Math.floor(n/60),s=n%60;return(t<=0?"+":"-")+m(i,2,"0")+":"+m(s,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var i=12*(n.year()-t.year())+(n.month()-t.month()),s=t.clone().add(i,l),r=n-s<0,a=t.clone().add(i+(r?-1:1),l);return+(-(i+(n-s)/(r?s-a:a-s))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:l,y:u,w:o,d:a,D:d,h:r,m:s,s:i,ms:n,Q:c}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},y="en",g={};g[y]=h;var b="$isDayjsObject",$=function(e){return e instanceof E||!(!e||!e[b])},M=function e(t,n,i){var s;if(!t)return y;if("string"==typeof t){var r=t.toLowerCase();g[r]&&(s=r),n&&(g[r]=n,s=r);var a=t.split("-");if(!s&&a.length>1)return e(a[0])}else{var o=t.name;g[o]=t,s=o}return!i&&s&&(y=s),s||!i&&y},w=function(e,t){if($(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new E(n)},A=_;A.l=M,A.i=$,A.w=function(e,t){return w(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var E=function(){function h(e){this.$L=M(e.locale,null,!0),this.parse(e),this.$x=this.$x||e.x||{},this[b]=!0}var m=h.prototype;return m.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if(A.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var i=t.match(p);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(t)}(e),this.init()},m.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},m.$utils=function(){return A},m.isValid=function(){return!(this.$d.toString()===f)},m.isSame=function(e,t){var n=w(e);return this.startOf(t)<=n&&n<=this.endOf(t)},m.isAfter=function(e,t){return w(e)<this.startOf(t)},m.isBefore=function(e,t){return this.endOf(t)<w(e)},m.$g=function(e,t,n){return A.u(e)?this[t]:this.set(n,e)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(e,t){var n=this,c=!!A.u(t)||t,f=A.p(e),p=function(e,t){var i=A.w(n.$u?Date.UTC(n.$y,t,e):new Date(n.$y,t,e),n);return c?i:i.endOf(a)},v=function(e,t){return A.w(n.toDate()[e].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(t)),n)},h=this.$W,m=this.$M,_=this.$D,y="set"+(this.$u?"UTC":"");switch(f){case u:return c?p(1,0):p(31,11);case l:return c?p(1,m):p(0,m+1);case o:var g=this.$locale().weekStart||0,b=(h<g?h+7:h)-g;return p(c?_-b:_+(6-b),m);case a:case d:return v(y+"Hours",0);case r:return v(y+"Minutes",1);case s:return v(y+"Seconds",2);case i:return v(y+"Milliseconds",3);default:return this.clone()}},m.endOf=function(e){return this.startOf(e,!1)},m.$set=function(e,t){var o,c=A.p(e),f="set"+(this.$u?"UTC":""),p=(o={},o[a]=f+"Date",o[d]=f+"Date",o[l]=f+"Month",o[u]=f+"FullYear",o[r]=f+"Hours",o[s]=f+"Minutes",o[i]=f+"Seconds",o[n]=f+"Milliseconds",o)[c],v=c===a?this.$D+(t-this.$W):t;if(c===l||c===u){var h=this.clone().set(d,1);h.$d[p](v),h.init(),this.$d=h.set(d,Math.min(this.$D,h.daysInMonth())).$d}else p&&this.$d[p](v);return this.init(),this},m.set=function(e,t){return this.clone().$set(e,t)},m.get=function(e){return this[A.p(e)]()},m.add=function(n,c){var d,f=this;n=Number(n);var p=A.p(c),v=function(e){var t=w(f);return A.w(t.date(t.date()+Math.round(e*n)),f)};if(p===l)return this.set(l,this.$M+n);if(p===u)return this.set(u,this.$y+n);if(p===a)return v(1);if(p===o)return v(7);var h=(d={},d[s]=e,d[r]=t,d[i]=1e3,d)[p]||1,m=this.$d.getTime()+n*h;return A.w(m,this)},m.subtract=function(e,t){return this.add(-1*e,t)},m.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return n.invalidDate||f;var i=e||"YYYY-MM-DDTHH:mm:ssZ",s=A.z(this),r=this.$H,a=this.$m,o=this.$M,l=n.weekdays,c=n.months,u=n.meridiem,d=function(e,n,s,r){return e&&(e[n]||e(t,i))||s[n].slice(0,r)},p=function(e){return A.s(r%12||12,e,"0")},h=u||function(e,t,n){var i=e<12?"AM":"PM";return n?i.toLowerCase():i};return i.replace(v,(function(e,i){return i||function(e){switch(e){case"YY":return String(t.$y).slice(-2);case"YYYY":return A.s(t.$y,4,"0");case"M":return o+1;case"MM":return A.s(o+1,2,"0");case"MMM":return d(n.monthsShort,o,c,3);case"MMMM":return d(c,o);case"D":return t.$D;case"DD":return A.s(t.$D,2,"0");case"d":return String(t.$W);case"dd":return d(n.weekdaysMin,t.$W,l,2);case"ddd":return d(n.weekdaysShort,t.$W,l,3);case"dddd":return l[t.$W];case"H":return String(r);case"HH":return A.s(r,2,"0");case"h":return p(1);case"hh":return p(2);case"a":return h(r,a,!0);case"A":return h(r,a,!1);case"m":return String(a);case"mm":return A.s(a,2,"0");case"s":return String(t.$s);case"ss":return A.s(t.$s,2,"0");case"SSS":return A.s(t.$ms,3,"0");case"Z":return s}return null}(e)||s.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(n,d,f){var p,v=this,h=A.p(d),m=w(n),_=(m.utcOffset()-this.utcOffset())*e,y=this-m,g=function(){return A.m(v,m)};switch(h){case u:p=g()/12;break;case l:p=g();break;case c:p=g()/3;break;case o:p=(y-_)/6048e5;break;case a:p=(y-_)/864e5;break;case r:p=y/t;break;case s:p=y/e;break;case i:p=y/1e3;break;default:p=y}return f?p:A.a(p)},m.daysInMonth=function(){return this.endOf(l).$D},m.$locale=function(){return g[this.$L]},m.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),i=M(e,t,!0);return i&&(n.$L=i),n},m.clone=function(){return A.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},h}(),S=E.prototype;return w.prototype=S,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",a],["$M",l],["$y",u],["$D",d]].forEach((function(e){S[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),w.extend=function(e,t){return e.$i||(e(t,E,w),e.$i=!0),w},w.locale=M,w.isDayjs=$,w.unix=function(e){return w(1e3*e)},w.en=g[y],w.Ls=g,w.p={},w}()},181:function(e){e.exports=function(){"use strict";return function(e,t,n){var i=function(e,t){if(!t||!t.length||1===t.length&&!t[0]||1===t.length&&Array.isArray(t[0])&&!t[0].length)return null;var n;1===t.length&&t[0].length>0&&(t=t[0]),n=(t=t.filter((function(e){return e})))[0];for(var i=1;i<t.length;i+=1)t[i].isValid()&&!t[i][e](n)||(n=t[i]);return n};n.max=function(){var e=[].slice.call(arguments,0);return i("isAfter",e)},n.min=function(){var e=[].slice.call(arguments,0);return i("isBefore",e)}}}()},379:e=>{"use strict";var t=[];function n(e){for(var n=-1,i=0;i<t.length;i++)if(t[i].identifier===e){n=i;break}return n}function i(e,i){for(var r={},a=[],o=0;o<e.length;o++){var l=e[o],c=i.base?l[0]+i.base:l[0],u=r[c]||0,d="".concat(c," ").concat(u);r[c]=u+1;var f=n(d),p={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==f)t[f].references++,t[f].updater(p);else{var v=s(p,i);i.byIndex=o,t.splice(o,0,{identifier:d,updater:v,references:1})}a.push(d)}return a}function s(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,s){var r=i(e=e||[],s=s||{});return function(e){e=e||[];for(var a=0;a<r.length;a++){var o=n(r[a]);t[o].references--}for(var l=i(e,s),c=0;c<r.length;c++){var u=n(r[c]);0===t[u].references&&(t[u].updater(),t.splice(u,1))}r=l}}},569:e=>{"use strict";var t={};e.exports=function(e,n){var i=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(n)}},216:e=>{"use strict";e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:(e,t,n)=>{"use strict";e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},795:e=>{"use strict";e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var i="";n.supports&&(i+="@supports (".concat(n.supports,") {")),n.media&&(i+="@media ".concat(n.media," {"));var s=void 0!==n.layer;s&&(i+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),i+=n.css,s&&(i+="}"),n.media&&(i+="}"),n.supports&&(i+="}");var r=n.sourceMap;r&&"undefined"!=typeof btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),t.styleTagTransform(i,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:e=>{"use strict";e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function n(i){var s=t[i];if(void 0!==s)return s.exports;var r=t[i]={id:i,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.nc=void 0,(()=>{"use strict";var e=n(379),t=n.n(e),i=n(795),s=n.n(i),r=n(569),a=n.n(r),o=n(565),l=n.n(o),c=n(216),u=n.n(c),d=n(589),f=n.n(d),p=n(10),v={};v.styleTagTransform=f(),v.setAttributes=l(),v.insert=a().bind(null,"head"),v.domAPI=s(),v.insertStyleElement=u(),t()(p.Z,v),p.Z&&p.Z.locals&&p.Z.locals;const h="shake";class m{#e=null;constructor(){if(new.target===m)throw new Error("Can't instantiate AbstractView, only concrete one.")}get element(){return this.#e||(this.#e=function(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}(this.template)),this.#e}get template(){throw new Error("Abstract method not implemented: get template")}removeElement(){this.#e=null}shake(e){this.element.classList.add(h),setTimeout((()=>{this.element.classList.remove(h),e?.()}),600)}}function _(e,t,n="beforeend"){if(!(e instanceof m))throw new Error("Can render only components");if(null===t)throw new Error("Container element doesn't exist");t.insertAdjacentElement(n,e.element)}function y(e,t){if(!(e instanceof m&&t instanceof m))throw new Error("Can replace only components");const n=e.element,i=t.element,s=i.parentElement;if(null===s)throw new Error("Parent element doesn't exist");s.replaceChild(n,i)}const g="HH:mm",b=100,$=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaurant"],M=["Lorem ipsum dolor sit amet, consectetur adipiscing elit.","Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.","Aliquam id orci ut lectus varius viverra.","Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.","Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.","Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.","Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.","Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui."],w=["Istanbul","London","Berlin","Madrid","Rome","Paris","Barcelona","Prague","Moscow"],A=["Add luggage","Switch to comfort class","Add meal","Choose seats","Travel by train"];var E=n(484),S=n.n(E),C=n(181),D=n.n(C);function x(e){return e?S()(e).format(g):""}function k(e){return e[Math.floor(Math.random()*e.length)]}function P(e){return Math.ceil(Math.random()*e)}function O(e,t){return Math.floor(Math.random()*(t-e))+e}function L(){return Math.random()>=.5}function T(e){return`\n      <option value="${e.name}">${e.name}</option>\n  `}S().extend(D());class H extends m{#t=null;#n=null;#i=null;#s=null;#r=null;#a=null;constructor({destinations:e,destination:t,eventPoint:n,offers:i,onCloseClick:s,onSaveEdit:r}){super(),this.#t=e,this.#r=t,this.#a=n,this.#n=i,this.#i=s,this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#i),this.#s=r,this.element.querySelector(".event__save-btn").addEventListener("click",this.#s)}get template(){return function(e,t,n,i){const{name:s,description:r}=t,{basePrice:a,dateFrom:o,dateTo:l,type:c,id:u}=n,d=new Date(o).toLocaleString("en-US",{dateStyle:"short",timeStyle:"short",hour12:!1}),f=new Date(l).toLocaleString("en-US",{dateStyle:"short",timeStyle:"short",hour12:!1});return`<li class="trip-events__item">\n        <form class="event event--edit" action="#" method="post">\n          <header class="event__header">\n            <div class="event__type-wrapper">\n              <label class="event__type  event__type-btn" for="event-type-toggle-1">\n                <span class="visually-hidden">Choose event type</span>\n                <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">\n              </label>\n              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${u}" type="checkbox">\n\n              <div class="event__type-list">\n                <fieldset class="event__type-group">\n                  <legend class="visually-hidden">Event type</legend>\n                    ${p=$,p.map((e=>{const t=e.toLowerCase();return`<div class="event__type-item">\n              <input id="event-type-${t}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${t}">\n              <label class="event__type-label  event__type-label--${t}" for="event-type-${t}-1">${e}</label>\n            </div>`})).join("")}\n                </fieldset>\n              </div>\n            </div>\n\n            <div class="event__field-group  event__field-group--destination">\n              <label class="event__label  event__type-output" for="event-destination-${u}">\n\n                ${c}\n\n              </label>\n              <input class="event__input  event__input--destination" id="event-destination-${u}" type="text" name="event-destination" value=${s} list="destination-list-${u}">\n              <datalist id="destination-list-1">\n\n                ${e.map(T).join("")}\n\n              </datalist>\n            </div>\n\n            <div class="event__field-group  event__field-group--time">\n              <label class="visually-hidden" for="event-start-time-1">From</label>\n              <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${d}">\n              &mdash;\n              <label class="visually-hidden" for="event-end-time-1">To</label>\n              <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${f}">\n            </div>\n\n            <div class="event__field-group  event__field-group--price">\n              <label class="event__label" for="event-price-1">\n                <span class="visually-hidden">Price</span>\n                &euro;\n              </label>\n              <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${a}">\n            </div>\n\n            <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n            <button class="event__reset-btn" type="reset">Delete</button>\n            <button class="event__rollup-btn" type="button">\n              <span class="visually-hidden">Open event</span>\n            </button>\n          </header>\n          <section class="event__details">\n\n            ${function({offers:e}){if(0!==e.length)return`<section class="event__section  event__section--offers">\n              <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n              <div class="event__available-offers">\n\n                 ${e.map((e=>function(e){const{id:t,title:n,price:i}=e;return`<div class="event__offer-selector">\n                  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${t}-1" type="checkbox" name="event-offer-${t}" ${L()?"checked":""}>\n                  <label class="event__offer-label" for="event-offer-${t}-1">\n                    <span class="event__offer-title">${n}</span>\n                    &plus;&euro;&nbsp;\n                    <span class="event__offer-price">${i}</span>\n                  </label>\n                </div>`}(e))).join("")}\n\n              </div>\n            </section>`}(i)}\n\n            <section class="event__section  event__section--destination">\n              <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n              <p class="event__destination-description">${r}</p>\n            </section>\n          </section>\n        </form>\n      </li>`;var p}(this.#t,this.#r,this.#a,this.#n)}}class I extends m{get template(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n        <div class="trip-sort__item  trip-sort__item--day">\n          <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day">\n          <label class="trip-sort__btn" for="sort-day">Day</label>\n        </div>\n\n        <div class="trip-sort__item  trip-sort__item--event">\n          <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n          <label class="trip-sort__btn" for="sort-event">Event</label>\n        </div>\n\n        <div class="trip-sort__item  trip-sort__item--time">\n          <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n          <label class="trip-sort__btn" for="sort-time">Time</label>\n        </div>\n\n        <div class="trip-sort__item  trip-sort__item--price">\n          <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" checked>\n          <label class="trip-sort__btn" for="sort-price">Price</label>\n        </div>\n\n        <div class="trip-sort__item  trip-sort__item--offer">\n          <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n          <label class="trip-sort__btn" for="sort-offer">Offers</label>\n        </div>\n      </form>'}}class B extends m{get template(){return'<ul class="trip-events__list"></ul>'}}class F extends m{#r=null;#a=null;#n=null;#o=null;constructor({destination:e,eventPoint:t,offers:n,onEditClick:i}){super(),this.#a=t,this.#r=e,this.#n=n,this.#o=i,this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#o)}get template(){return function(e,t,n){const{name:i}=e,{type:s,basePrice:r,isFavorite:a,dateFrom:o,dateTo:l}=t,c=a?"event__favorite-btn--active":"";return`<li class="trip-events__item">\n      <div class="event">\n        <time class="event__date" datetime=${o}>${u=o,u?S()(u).format("MMM D"):""}</time>\n        <div class="event__type">\n          <img class="event__type-icon" width="42" height="42" src="img/icons/${s}.png" alt="Event type icon">\n        </div>\n        <h3 class="event__title">${s} ${i}</h3>\n        <div class="event__schedule">\n          <p class="event__time">\n            <time class="event__start-time" datetime=${o}>${x(o)}</time>\n            &mdash;\n            <time class="event__end-time" datetime=${l}>${x(l)}</time>\n          </p>\n          <p class="event__duration">${function(e,t){const n=S()(t).diff(e)/b;return n<b?S()(n).format("mm[M]"):n>b&&n<2400?S()(n).format("HH[H] mm[M]"):S()(n).format("DD[D] HH[H] mm[M]")}(o,l)}</p>\n        </div>\n        <p class="event__price">\n          &euro;&nbsp;<span class="event__price-value">${r}</span>\n        </p>\n        <h4 class="visually-hidden">Offers:</h4>\n        <ul class="event__selected-offers">\n            ${function({offers:e}){return e.map((({title:e,price:t})=>`<li class="event__offer">\n        <span class="event__offer-title">${e}</span>\n        &plus;&euro;&nbsp;\n        <span class="event__offer-price">${t}</span>\n      </li>`)).join("")}(n)}\n        </ul>\n        <button class="event__favorite-btn ${c}" type="button">\n          <span class="visually-hidden">Add to favorite</span>\n          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n          </svg>\n        </button>\n        <button class="event__rollup-btn" type="button">\n          <span class="visually-hidden">Open event</span>\n        </button>\n      </div>\n    </li>`;var u}(this.#r,this.#a,this.#n)}}class U extends m{get template(){return'<section class="trip-main__trip-info  trip-info">\n      <div class="trip-info__main">\n        <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\n        <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>\n      </div>\n      <p class="trip-info__cost">\n        Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>\n      </p>\n    </section>'}}class j extends m{get template(){return'<form class="trip-filters" action="#" method="get">\n        <div class="trip-filters__filter">\n          <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">\n          <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n        </div>\n\n        <div class="trip-filters__filter">\n          <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n          <label class="trip-filters__filter-label" for="filter-future">Future</label>\n        </div>\n\n        <div class="trip-filters__filter">\n          <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n          <label class="trip-filters__filter-label" for="filter-present">Present</label>\n        </div>\n\n        <div class="trip-filters__filter">\n          <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" checked>\n          <label class="trip-filters__filter-label" for="filter-past">Past</label>\n        </div>\n\n        <button class="visually-hidden" type="submit">Accept filter</button>\n      </form>'}}const q=()=>({id:crypto.randomUUID(),title:k(A),price:P(69)}),Y=()=>{const e=k(w);return{id:crypto.randomUUID(),name:e,description:k(M),pictures:Array.from({length:P(5)},(()=>({src:`https://loremflickr.com/666/666?${crypto.randomUUID()}`,description:`It is ${e} description`})))}};let N=S()().subtract(O(1,15),"day").toDate();const W=({next:e})=>{const t=O(1,15),n=O(1,6),i=O(0,24);return e&&(N=S()(N).add(i,"minute").add(n,"hour").add(t,"day").toDate()),N},Z=document.querySelector(".trip-main"),z=document.querySelector(".trip-events"),J=document.querySelector(".trip-controls__filters"),R=new class{destinations=[];offers=[];eventPoints=[];constructor(){this.destinations=this.generateDestinations(),this.offers=this.generateOffers(),this.eventPoints=this.generateEventPoints()}getDestinations(){return this.destinations}getOffers(){return this.offers}getEventPoints(){return this.eventPoints}generateDestinations(){return Array.from({length:w.length},Y)}generateOffers(){return $.map((e=>({type:e,offers:Array.from({length:O(1,5)},q)})))}generateEventPoints(){return Array.from({length:$.length},(()=>{const e=k($),t=k(this.destinations),n=this.offers.find((t=>t.type===e)),i=new Set;Array.from({length:O(1,n.offers.length)},(()=>{i.add(k(n.offers))}));const s=i.size>0&&[...i][0]?[...i].map((e=>e.id)):[];return((e,t,n)=>({id:crypto.randomUUID(),basePrice:P(1500),dateFrom:W({next:!1}),dateTo:W({next:!0}),destination:t,isFavorite:L(),offers:n,type:e}))(e,t.id,s)}))}},X=new class{#t=[];constructor(e){this.service=e,this.#t=this.service.getDestinations()}get(){return this.#t}getById(e){return this.#t.find((t=>t.id===e))}}(R),V=new class{#l=[];constructor(e){this.#l=e.getEventPoints()}get(){return this.#l}}(R),G=new class{#n=[];constructor(e){this.service=e,this.#n=this.service.getOffers()}get(){return this.#n}getByType(e){return this.#n.find((t=>t.type===e.toString()))||null}}(R),K=new class{constructor({tripHeaderInfo:e,tripHeaderFilter:t}){this.tripHeaderInfo=e,this.tripHeaderFilter=t}init(){_(new U,this.tripHeaderInfo,"afterbegin"),_(new j,this.tripHeaderFilter)}}({tripHeaderInfo:Z,tripHeaderFilter:J}),Q=new class{#c=null;#u=null;#d=null;#f=null;#p=new I;#v=new B;#l=[];#t=[];constructor({tripContainer:e,destinationModel:t,eventPointsModel:n,offersModel:i}){this.#c=e,this.#u=t,this.#d=n,this.#f=i,this.#l=this.#d.get(),this.#t=this.#u.get(),this.offers=this.#f.get()}init(){_(this.#p,this.#c),_(this.#v,this.#c),this.#l.forEach((e=>{const t=this.#u.getById(e.destination);this.#h(this.#t,t,e,this.#f.getByType(e.type))}))}#h(e,t,n,i){const s=e=>{"Escape"===e.key&&(e.preventDefault(),o(),document.removeEventListener("keydown",s))},r=new F({destination:t,eventPoint:n,offers:i,onEditClick:()=>{y(a,r),document.addEventListener("keydown",s)}}),a=new H({destinations:e,destination:t,eventPoint:n,offers:i,onCloseClick:()=>{o(),document.removeEventListener("keydown",s)},onSaveEdit:()=>{o(),document.removeEventListener("keydown",s)}});function o(){y(r,a)}_(r,this.#v.element)}}({tripContainer:z,destinationModel:X,eventPointsModel:V,offersModel:G});K.init(),Q.init()})()})();
//# sourceMappingURL=bundle.b1be25cd60ecf461e42f.js.map