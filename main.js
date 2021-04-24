!function(e){var t={};function n(o){if(t[o])return t[o].exports;var l=t[o]={i:o,l:!1,exports:{}};return e[o].call(l.exports,l,l.exports,n),l.l=!0,l.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)n.d(o,l,function(t){return e[t]}.bind(null,l));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){"use strict";var o=this&&this.__assign||function(){return(o=Object.assign||function(e){for(var t,n=1,o=arguments.length;n<o;n++)for(var l in t=arguments[n])Object.prototype.hasOwnProperty.call(t,l)&&(e[l]=t[l]);return e}).apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e){this.element=e}return e.prototype.getHorizontalScroll=function(){return this.element.scrollLeft},e.prototype.getVerticalScroll=function(){return this.element.scrollTop},e.prototype.getMaxHorizontalScroll=function(){return this.element.scrollWidth-this.element.clientWidth},e.prototype.getMaxVerticalScroll=function(){return this.element.scrollHeight-this.element.clientHeight},e.prototype.getHorizontalElementScrollOffset=function(e){return e.getBoundingClientRect().left+this.element.scrollLeft-this.element.getBoundingClientRect().left},e.prototype.getVerticalElementScrollOffset=function(e){return e.getBoundingClientRect().top+this.element.scrollTop-this.element.getBoundingClientRect().top},e.prototype.scrollTo=function(e,t){this.element.scrollLeft=e,this.element.scrollTop=t},e}(),r=function(){function e(){}return e.prototype.getHorizontalScroll=function(){return window.scrollX||document.documentElement.scrollLeft},e.prototype.getVerticalScroll=function(){return window.scrollY||document.documentElement.scrollTop},e.prototype.getMaxHorizontalScroll=function(){return Math.max(document.body.scrollWidth,document.documentElement.scrollWidth,document.body.offsetWidth,document.documentElement.offsetWidth,document.body.clientWidth,document.documentElement.clientWidth)-window.innerWidth},e.prototype.getMaxVerticalScroll=function(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)-window.innerHeight},e.prototype.getHorizontalElementScrollOffset=function(e){return(window.scrollX||document.documentElement.scrollLeft)+e.getBoundingClientRect().left},e.prototype.getVerticalElementScrollOffset=function(e){return(window.scrollY||document.documentElement.scrollTop)+e.getBoundingClientRect().top},e.prototype.scrollTo=function(e,t){window.scrollTo(e,t)},e}(),i={elements:[],cancelMethods:[],add:function(e,t){i.elements.push(e),i.cancelMethods.push(t)},stop:function(e){var t=i.elements.indexOf(e);t>-1&&(i.cancelMethods[t](),i.elements.splice(t,1),i.cancelMethods.splice(t,1))}},c="undefined"!=typeof window,a={cancelOnUserAction:!0,easing:function(e){return--e*e*e+1},elementToScroll:c?window:null,horizontalOffset:0,maxDuration:3e3,minDuration:250,speed:500,verticalOffset:0};function s(e,t){if(void 0===t&&(t={}),!c)return new Promise((function(e){e(!1)}));if(!window.Promise)throw"Browser doesn't support Promises, and animated-scroll-to depends on it, please provide a polyfill.";var n,s,u,d=o(o({},a),t),m=d.elementToScroll===window,f=!!d.elementToScroll.nodeName;if(!m&&!f)throw"Element to scroll needs to be either window or DOM element.";var p=m?new r:new l(d.elementToScroll);if(e instanceof Element)u=e,n=p.getHorizontalElementScrollOffset(u),s=p.getVerticalElementScrollOffset(u);else if("number"==typeof e)n=p.getHorizontalScroll(),s=e;else{if(!Array.isArray(e)||2!==e.length)throw"Wrong function signature. Check documentation.\nAvailable method signatures are:\n  animateScrollTo(y:number, options)\n  animateScrollTo([x:number | null, y:number | null], options)\n  animateScrollTo(scrollToElement:Element, options)";n=null===e[0]?p.getHorizontalScroll():e[0],s=null===e[1]?p.getVerticalScroll():e[1]}n+=d.horizontalOffset,s+=d.verticalOffset;var g=p.getMaxHorizontalScroll(),h=p.getHorizontalScroll();n>g&&(n=g);var y=n-h,v=p.getMaxVerticalScroll(),w=p.getVerticalScroll();s>v&&(s=v);var S=s-w,b=Math.abs(Math.round(y/1e3*d.speed)),E=Math.abs(Math.round(S/1e3*d.speed)),T=b>E?b:E;return T<d.minDuration?T=d.minDuration:T>d.maxDuration&&(T=d.maxDuration),new Promise((function(e,t){var o;0===y&&0===S&&e(!0),i.stop(d.elementToScroll);var l=function(){u(),cancelAnimationFrame(o),e(!1)};i.add(d.elementToScroll,l);var r=d.cancelOnUserAction?l:function(e){return e.preventDefault()},c=d.cancelOnUserAction?{passive:!0}:{passive:!1},a=["wheel","touchstart","keydown","mousedown"],u=function(){a.forEach((function(e){d.elementToScroll.removeEventListener(e,r)}))};a.forEach((function(e){d.elementToScroll.addEventListener(e,r,c)}));var m=Date.now(),f=function(){var t=Date.now()-m,l=t/T,r=Math.round(h+y*d.easing(l)),i=Math.round(w+S*d.easing(l));t<T&&(r!==n||i!==s)?(p.scrollTo(r,i),o=requestAnimationFrame(f)):(p.scrollTo(n,s),cancelAnimationFrame(o),u(),e(!0))};o=requestAnimationFrame(f)}))}t.default=s,c&&(window.animateScrollTo=s)},function(e,t,n){n(3),e.exports=n(2)},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var o=n(0),l=n.n(o);const r=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent),i=document.querySelector(".js_header"),c=()=>{(document.querySelector(".js_menu-button")||!1).addEventListener("click",()=>{(()=>{const e=i,t=document.getElementsByTagName("body")[0];e.classList.toggle("header_opened"),t.classList.toggle("scroll-fixed")})()})},a=()=>{let e;document.querySelectorAll(".menu-handler").forEach(t=>{t.addEventListener("click",t=>{t.preventDefault();const n=t.target,o=n.getAttribute("data-id"),i=document.getElementById(o);i&&(e&&e.classList.toggle("header__menu-item_active"),e=n,n.classList.toggle("header__menu-item_active"),l()(i,{verticalOffset:-30}),r&&(()=>{const e=document.querySelector(".js_header"),t=document.getElementsByTagName("body")[0];e.classList.remove("header_opened"),t.classList.remove("scroll-fixed")})())})})};let s;window.addEventListener("scroll",()=>{window.clearTimeout(s),s=setTimeout(()=>{console.log("Scrolling has stopped."),document.body.getBoundingClientRect().top<0?i.classList.add("js_header_active"):i.classList.remove("js_header_active")},5)},!1),document.addEventListener("DOMContentLoaded",(function(){r&&c(),a()}))}]);