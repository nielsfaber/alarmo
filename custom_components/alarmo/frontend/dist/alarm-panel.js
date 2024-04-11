!function(e){"use strict";var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])})(e,i)};function i(e,i){if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");function a(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(a.prototype=i.prototype,new a)}var a=function(){return(a=Object.assign||function(e){for(var t,i=1,a=arguments.length;i<a;i++)for(var n in t=arguments[i])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}).apply(this,arguments)};function n(e,t,i,a){var n,s=arguments.length,r=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,a);else for(var o=e.length-1;o>=0;o--)(n=e[o])&&(r=(s<3?n(r):s>3?n(t,i,r):n(t,i))||r);return s>3&&r&&Object.defineProperty(t,i,r),r}function s(e,t,i){if(i||2===arguments.length)for(var a,n=0,s=t.length;n<s;n++)!a&&n in t||(a||(a=Array.prototype.slice.call(t,0,n)),a[n]=t[n]);return e.concat(a||Array.prototype.slice.call(t))}"function"==typeof SuppressedError&&SuppressedError;
/**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const r=window,o=r.ShadowRoot&&(void 0===r.ShadyCSS||r.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,d=Symbol(),l=new WeakMap;class c{constructor(e,t,i){if(this._$cssResult$=!0,i!==d)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(o&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=l.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&l.set(t,e))}return e}toString(){return this.cssText}}const h=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,a)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[a+1],e[0]);return new c(i,e,d)},m=(e,t)=>{o?e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(t=>{const i=document.createElement("style"),a=r.litNonce;void 0!==a&&i.setAttribute("nonce",a),i.textContent=t.cssText,e.appendChild(i)})},u=o?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new c("string"==typeof e?e:e+"",void 0,d))(t)})(e):e
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */;var p;const g=window,v=g.trustedTypes,_=v?v.emptyScript:"",f=g.reactiveElementPolyfillSupport,b={toAttribute(e,t){switch(t){case Boolean:e=e?_:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},y=(e,t)=>t!==e&&(t==t||e==e),k={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:y},w="finalized";class A extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const a=this._$Ep(i,t);void 0!==a&&(this._$Ev.set(a,i),e.push(a))}),e}static createProperty(e,t=k){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,a=this.getPropertyDescriptor(e,i,t);void 0!==a&&Object.defineProperty(this.prototype,e,a)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(a){const n=this[e];this[t]=a,this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||k}static finalize(){if(this.hasOwnProperty(w))return!1;this[w]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(u(e))}else void 0!==e&&t.push(u(e));return t}static _$Ep(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach(e=>e(this))}addController(e){var t,i;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return m(t,this.constructor.elementStyles),t}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)})}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=k){var a;const n=this.constructor._$Ep(e,i);if(void 0!==n&&!0===i.reflect){const s=(void 0!==(null===(a=i.converter)||void 0===a?void 0:a.toAttribute)?i.converter:b).toAttribute(t,i.type);this._$El=e,null==s?this.removeAttribute(n):this.setAttribute(n,s),this._$El=null}}_$AK(e,t){var i;const a=this.constructor,n=a._$Ev.get(e);if(void 0!==n&&this._$El!==n){const e=a.getPropertyOptions(n),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(i=e.converter)||void 0===i?void 0:i.fromAttribute)?e.converter:b;this._$El=n,this[n]=s.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,i){let a=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||y)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,i))):a=!1),!this.isUpdatePending&&a&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((e,t)=>this[t]=e),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)}),this.update(i)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach(e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach((e,t)=>this._$EO(t,this[t],e)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var $;A[w]=!0,A.elementProperties=new Map,A.elementStyles=[],A.shadowRootOptions={mode:"open"},null==f||f({ReactiveElement:A}),(null!==(p=g.reactiveElementVersions)&&void 0!==p?p:g.reactiveElementVersions=[]).push("1.6.3");const T=window,E=T.trustedTypes,j=E?E.createPolicy("lit-html",{createHTML:e=>e}):void 0,x=`lit$${(Math.random()+"").slice(9)}$`,S="?"+x,z=`<${S}>`,O=document,C=()=>O.createComment(""),M=e=>null===e||"object"!=typeof e&&"function"!=typeof e,N=Array.isArray,D="[ \t\n\f\r]",L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,P=/-->/g,H=/>/g,B=RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),q=/'/g,I=/"/g,U=/^(?:script|style|textarea|title)$/i,R=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),G=new WeakMap,F=O.createTreeWalker(O,129,null,!1);function K(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==j?j.createHTML(t):t}const Z=(e,t)=>{const i=e.length-1,a=[];let n,s=2===t?"<svg>":"",r=L;for(let t=0;t<i;t++){const i=e[t];let o,d,l=-1,c=0;for(;c<i.length&&(r.lastIndex=c,d=r.exec(i),null!==d);)c=r.lastIndex,r===L?"!--"===d[1]?r=P:void 0!==d[1]?r=H:void 0!==d[2]?(U.test(d[2])&&(n=RegExp("</"+d[2],"g")),r=B):void 0!==d[3]&&(r=B):r===B?">"===d[0]?(r=null!=n?n:L,l=-1):void 0===d[1]?l=-2:(l=r.lastIndex-d[2].length,o=d[1],r=void 0===d[3]?B:'"'===d[3]?I:q):r===I||r===q?r=B:r===P||r===H?r=L:(r=B,n=void 0);const h=r===B&&e[t+1].startsWith("/>")?" ":"";s+=r===L?i+z:l>=0?(a.push(o),i.slice(0,l)+"$lit$"+i.slice(l)+x+h):i+x+(-2===l?(a.push(void 0),t):h)}return[K(e,s+(e[i]||"<?>")+(2===t?"</svg>":"")),a]};class Q{constructor({strings:e,_$litType$:t},i){let a;this.parts=[];let n=0,s=0;const r=e.length-1,o=this.parts,[d,l]=Z(e,t);if(this.el=Q.createElement(d,i),F.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(a=F.nextNode())&&o.length<r;){if(1===a.nodeType){if(a.hasAttributes()){const e=[];for(const t of a.getAttributeNames())if(t.endsWith("$lit$")||t.startsWith(x)){const i=l[s++];if(e.push(t),void 0!==i){const e=a.getAttribute(i.toLowerCase()+"$lit$").split(x),t=/([.?@])?(.*)/.exec(i);o.push({type:1,index:n,name:t[2],strings:e,ctor:"."===t[1]?ee:"?"===t[1]?ie:"@"===t[1]?ae:J})}else o.push({type:6,index:n})}for(const t of e)a.removeAttribute(t)}if(U.test(a.tagName)){const e=a.textContent.split(x),t=e.length-1;if(t>0){a.textContent=E?E.emptyScript:"";for(let i=0;i<t;i++)a.append(e[i],C()),F.nextNode(),o.push({type:2,index:++n});a.append(e[t],C())}}}else if(8===a.nodeType)if(a.data===S)o.push({type:2,index:n});else{let e=-1;for(;-1!==(e=a.data.indexOf(x,e+1));)o.push({type:7,index:n}),e+=x.length-1}n++}}static createElement(e,t){const i=O.createElement("template");return i.innerHTML=e,i}}function Y(e,t,i=e,a){var n,s,r,o;if(t===R)return t;let d=void 0!==a?null===(n=i._$Co)||void 0===n?void 0:n[a]:i._$Cl;const l=M(t)?void 0:t._$litDirective$;return(null==d?void 0:d.constructor)!==l&&(null===(s=null==d?void 0:d._$AO)||void 0===s||s.call(d,!1),void 0===l?d=void 0:(d=new l(e),d._$AT(e,i,a)),void 0!==a?(null!==(r=(o=i)._$Co)&&void 0!==r?r:o._$Co=[])[a]=d:i._$Cl=d),void 0!==d&&(t=Y(e,d._$AS(e,t.values),d,a)),t}class W{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:a}=this._$AD,n=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:O).importNode(i,!0);F.currentNode=n;let s=F.nextNode(),r=0,o=0,d=a[0];for(;void 0!==d;){if(r===d.index){let t;2===d.type?t=new X(s,s.nextSibling,this,e):1===d.type?t=new d.ctor(s,d.name,d.strings,this,e):6===d.type&&(t=new ne(s,this,e)),this._$AV.push(t),d=a[++o]}r!==(null==d?void 0:d.index)&&(s=F.nextNode(),r++)}return F.currentNode=O,n}v(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class X{constructor(e,t,i,a){var n;this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=a,this._$Cp=null===(n=null==a?void 0:a.isConnected)||void 0===n||n}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Y(this,e,t),M(e)?e===V||null==e||""===e?(this._$AH!==V&&this._$AR(),this._$AH=V):e!==this._$AH&&e!==R&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):(e=>N(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==V&&M(this._$AH)?this._$AA.nextSibling.data=e:this.$(O.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:a}=e,n="number"==typeof a?this._$AC(e):(void 0===a.el&&(a.el=Q.createElement(K(a.h,a.h[0]),this.options)),a);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===n)this._$AH.v(i);else{const e=new W(n,this),t=e.u(this.options);e.v(i),this.$(t),this._$AH=e}}_$AC(e){let t=G.get(e.strings);return void 0===t&&G.set(e.strings,t=new Q(e)),t}T(e){N(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,a=0;for(const n of e)a===t.length?t.push(i=new X(this.k(C()),this.k(C()),this,this.options)):i=t[a],i._$AI(n),a++;a<t.length&&(this._$AR(i&&i._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class J{constructor(e,t,i,a,n){this.type=1,this._$AH=V,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,a){const n=this.strings;let s=!1;if(void 0===n)e=Y(this,e,t,0),s=!M(e)||e!==this._$AH&&e!==R,s&&(this._$AH=e);else{const a=e;let r,o;for(e=n[0],r=0;r<n.length-1;r++)o=Y(this,a[i+r],t,r),o===R&&(o=this._$AH[r]),s||(s=!M(o)||o!==this._$AH[r]),o===V?e=V:e!==V&&(e+=(null!=o?o:"")+n[r+1]),this._$AH[r]=o}s&&!a&&this.j(e)}j(e){e===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class ee extends J{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===V?void 0:e}}const te=E?E.emptyScript:"";class ie extends J{constructor(){super(...arguments),this.type=4}j(e){e&&e!==V?this.element.setAttribute(this.name,te):this.element.removeAttribute(this.name)}}class ae extends J{constructor(e,t,i,a,n){super(e,t,i,a,n),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=Y(this,e,t,0))&&void 0!==i?i:V)===R)return;const a=this._$AH,n=e===V&&a!==V||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,s=e!==V&&(a===V||n);n&&this.element.removeEventListener(this.name,this,a),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class ne{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Y(this,e)}}const se=T.litHtmlPolyfillSupport;
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var re;null==se||se(Q,X),(null!==($=T.litHtmlVersions)&&void 0!==$?$:T.litHtmlVersions=[]).push("2.8.0");const oe=window,de=oe.trustedTypes,le=de?de.createPolicy("lit-html",{createHTML:e=>e}):void 0,ce=`lit$${(Math.random()+"").slice(9)}$`,he="?"+ce,me=`<${he}>`,ue=document,pe=()=>ue.createComment(""),ge=e=>null===e||"object"!=typeof e&&"function"!=typeof e,ve=Array.isArray,_e="[ \t\n\f\r]",fe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,be=/-->/g,ye=/>/g,ke=RegExp(`>|${_e}(?:([^\\s"'>=/]+)(${_e}*=${_e}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),we=/'/g,Ae=/"/g,$e=/^(?:script|style|textarea|title)$/i,Te=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),Ee=Symbol.for("lit-noChange"),je=Symbol.for("lit-nothing"),xe=new WeakMap,Se=ue.createTreeWalker(ue,129,null,!1);function ze(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==le?le.createHTML(t):t}class Oe{constructor({strings:e,_$litType$:t},i){let a;this.parts=[];let n=0,s=0;const r=e.length-1,o=this.parts,[d,l]=((e,t)=>{const i=e.length-1,a=[];let n,s=2===t?"<svg>":"",r=fe;for(let t=0;t<i;t++){const i=e[t];let o,d,l=-1,c=0;for(;c<i.length&&(r.lastIndex=c,d=r.exec(i),null!==d);)c=r.lastIndex,r===fe?"!--"===d[1]?r=be:void 0!==d[1]?r=ye:void 0!==d[2]?($e.test(d[2])&&(n=RegExp("</"+d[2],"g")),r=ke):void 0!==d[3]&&(r=ke):r===ke?">"===d[0]?(r=null!=n?n:fe,l=-1):void 0===d[1]?l=-2:(l=r.lastIndex-d[2].length,o=d[1],r=void 0===d[3]?ke:'"'===d[3]?Ae:we):r===Ae||r===we?r=ke:r===be||r===ye?r=fe:(r=ke,n=void 0);const h=r===ke&&e[t+1].startsWith("/>")?" ":"";s+=r===fe?i+me:l>=0?(a.push(o),i.slice(0,l)+"$lit$"+i.slice(l)+ce+h):i+ce+(-2===l?(a.push(void 0),t):h)}return[ze(e,s+(e[i]||"<?>")+(2===t?"</svg>":"")),a]})(e,t);if(this.el=Oe.createElement(d,i),Se.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(a=Se.nextNode())&&o.length<r;){if(1===a.nodeType){if(a.hasAttributes()){const e=[];for(const t of a.getAttributeNames())if(t.endsWith("$lit$")||t.startsWith(ce)){const i=l[s++];if(e.push(t),void 0!==i){const e=a.getAttribute(i.toLowerCase()+"$lit$").split(ce),t=/([.?@])?(.*)/.exec(i);o.push({type:1,index:n,name:t[2],strings:e,ctor:"."===t[1]?Le:"?"===t[1]?He:"@"===t[1]?Be:De})}else o.push({type:6,index:n})}for(const t of e)a.removeAttribute(t)}if($e.test(a.tagName)){const e=a.textContent.split(ce),t=e.length-1;if(t>0){a.textContent=de?de.emptyScript:"";for(let i=0;i<t;i++)a.append(e[i],pe()),Se.nextNode(),o.push({type:2,index:++n});a.append(e[t],pe())}}}else if(8===a.nodeType)if(a.data===he)o.push({type:2,index:n});else{let e=-1;for(;-1!==(e=a.data.indexOf(ce,e+1));)o.push({type:7,index:n}),e+=ce.length-1}n++}}static createElement(e,t){const i=ue.createElement("template");return i.innerHTML=e,i}}function Ce(e,t,i=e,a){var n,s,r,o;if(t===Ee)return t;let d=void 0!==a?null===(n=i._$Co)||void 0===n?void 0:n[a]:i._$Cl;const l=ge(t)?void 0:t._$litDirective$;return(null==d?void 0:d.constructor)!==l&&(null===(s=null==d?void 0:d._$AO)||void 0===s||s.call(d,!1),void 0===l?d=void 0:(d=new l(e),d._$AT(e,i,a)),void 0!==a?(null!==(r=(o=i)._$Co)&&void 0!==r?r:o._$Co=[])[a]=d:i._$Cl=d),void 0!==d&&(t=Ce(e,d._$AS(e,t.values),d,a)),t}class Me{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:a}=this._$AD,n=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:ue).importNode(i,!0);Se.currentNode=n;let s=Se.nextNode(),r=0,o=0,d=a[0];for(;void 0!==d;){if(r===d.index){let t;2===d.type?t=new Ne(s,s.nextSibling,this,e):1===d.type?t=new d.ctor(s,d.name,d.strings,this,e):6===d.type&&(t=new qe(s,this,e)),this._$AV.push(t),d=a[++o]}r!==(null==d?void 0:d.index)&&(s=Se.nextNode(),r++)}return Se.currentNode=ue,n}v(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Ne{constructor(e,t,i,a){var n;this.type=2,this._$AH=je,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=a,this._$Cp=null===(n=null==a?void 0:a.isConnected)||void 0===n||n}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Ce(this,e,t),ge(e)?e===je||null==e||""===e?(this._$AH!==je&&this._$AR(),this._$AH=je):e!==this._$AH&&e!==Ee&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):(e=>ve(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==je&&ge(this._$AH)?this._$AA.nextSibling.data=e:this.$(ue.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:a}=e,n="number"==typeof a?this._$AC(e):(void 0===a.el&&(a.el=Oe.createElement(ze(a.h,a.h[0]),this.options)),a);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===n)this._$AH.v(i);else{const e=new Me(n,this),t=e.u(this.options);e.v(i),this.$(t),this._$AH=e}}_$AC(e){let t=xe.get(e.strings);return void 0===t&&xe.set(e.strings,t=new Oe(e)),t}T(e){ve(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,a=0;for(const n of e)a===t.length?t.push(i=new Ne(this.k(pe()),this.k(pe()),this,this.options)):i=t[a],i._$AI(n),a++;a<t.length&&(this._$AR(i&&i._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class De{constructor(e,t,i,a,n){this.type=1,this._$AH=je,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=je}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,a){const n=this.strings;let s=!1;if(void 0===n)e=Ce(this,e,t,0),s=!ge(e)||e!==this._$AH&&e!==Ee,s&&(this._$AH=e);else{const a=e;let r,o;for(e=n[0],r=0;r<n.length-1;r++)o=Ce(this,a[i+r],t,r),o===Ee&&(o=this._$AH[r]),s||(s=!ge(o)||o!==this._$AH[r]),o===je?e=je:e!==je&&(e+=(null!=o?o:"")+n[r+1]),this._$AH[r]=o}s&&!a&&this.j(e)}j(e){e===je?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class Le extends De{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===je?void 0:e}}const Pe=de?de.emptyScript:"";class He extends De{constructor(){super(...arguments),this.type=4}j(e){e&&e!==je?this.element.setAttribute(this.name,Pe):this.element.removeAttribute(this.name)}}class Be extends De{constructor(e,t,i,a,n){super(e,t,i,a,n),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=Ce(this,e,t,0))&&void 0!==i?i:je)===Ee)return;const a=this._$AH,n=e===je&&a!==je||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,s=e!==je&&(a===je||n);n&&this.element.removeEventListener(this.name,this,a),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class qe{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Ce(this,e)}}const Ie=oe.litHtmlPolyfillSupport;null==Ie||Ie(Oe,Ne),(null!==(re=oe.litHtmlVersions)&&void 0!==re?re:oe.litHtmlVersions=[]).push("2.8.0");const Ue=(e,t,i)=>{var a,n;const s=null!==(a=null==i?void 0:i.renderBefore)&&void 0!==a?a:t;let r=s._$litPart$;if(void 0===r){const e=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;s._$litPart$=r=new Ne(t.insertBefore(pe(),e),e,void 0,null!=i?i:{})}return r._$AI(e),r
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */};var Re,Ve;class Ge extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ue(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return Ee}}Ge.finalized=!0,Ge._$litElement$=!0,null===(Re=globalThis.litElementHydrateSupport)||void 0===Re||Re.call(globalThis,{LitElement:Ge});const Fe=globalThis.litElementPolyfillSupport;null==Fe||Fe({LitElement:Ge}),(null!==(Ve=globalThis.litElementVersions)&&void 0!==Ve?Ve:globalThis.litElementVersions=[]).push("3.3.3");
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
const Ke=e=>t=>"function"==typeof t?((e,t)=>(customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:i,elements:a}=t;return{kind:i,elements:a,finisher(t){customElements.define(e,t)}}})(e,t)
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */,Ze=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(i){i.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};function Qe(e){return(t,i)=>void 0!==i?((e,t,i)=>{t.constructor.createProperty(i,e)})(e,t,i):Ze(e,t)
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */}function Ye(e){return Qe({...e,state:!0})}
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
function We(e,t){return(({finisher:e,descriptor:t})=>(i,a)=>{var n;if(void 0===a){const a=null!==(n=i.originalKey)&&void 0!==n?n:i.key,s=null!=t?{kind:"method",placement:"prototype",key:a,descriptor:t(i.key)}:{...i,key:a};return null!=e&&(s.finisher=function(t){e(t,a)}),s}{const n=i.constructor;void 0!==t&&Object.defineProperty(i,a,t(a)),null==e||e(n,a)}})({descriptor:i=>{const a={get(){var t,i;return null!==(i=null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector(e))&&void 0!==i?i:null},enumerable:!0,configurable:!0};if(t){const t="symbol"==typeof i?Symbol():"__"+i;a.get=function(){var i,a;return void 0===this[t]&&(this[t]=null!==(a=null===(i=this.renderRoot)||void 0===i?void 0:i.querySelector(e))&&void 0!==a?a:null),this[t]}}return a}})}
/**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var Xe;null===(Xe=window.HTMLSlotElement)||void 0===Xe||Xe.prototype.assignedElements;const Je=async()=>{if(customElements.get("ha-checkbox")&&customElements.get("ha-slider")&&!customElements.get("ha-panel-config"))return;await customElements.whenDefined("partial-panel-resolver");const e=document.createElement("partial-panel-resolver");e.hass={panels:[{url_path:"tmp",component_name:"config"}]},e._updateRoutes(),await e.routerOptions.routes.tmp.load(),await customElements.whenDefined("ha-panel-config");const t=document.createElement("ha-panel-config");await t.routerOptions.routes.automation.load()},et=async()=>{var e,t,i,a,n,s,r,o;if(customElements.get("ha-yaml-editor"))return;const d=document.createElement("partial-panel-resolver").getRoutes([{component_name:"developer-tools",url_path:"a"}]);await(null===(i=null===(t=null===(e=null==d?void 0:d.routes)||void 0===e?void 0:e.a)||void 0===t?void 0:t.load)||void 0===i?void 0:i.call(t));const l=document.createElement("developer-tools-router");await(null===(o=null===(r=null===(s=null===(n=null===(a=l)||void 0===a?void 0:a.routerOptions)||void 0===n?void 0:n.routes)||void 0===s?void 0:s.service)||void 0===r?void 0:r.load)||void 0===o?void 0:o.call(r))},tt=e=>e.callWS({type:"alarmo/config"}),it=e=>e.callWS({type:"alarmo/sensors"}),at=e=>e.callWS({type:"alarmo/users"}),nt=e=>e.callWS({type:"alarmo/automations"}),st=e=>e.callWS({type:"alarmo/sensor_groups"}),rt=(e,t)=>e.callApi("POST","alarmo/config",t),ot=(e,t)=>e.callApi("POST","alarmo/sensors",t),dt=(e,t)=>e.callApi("POST","alarmo/users",t),lt=(e,t)=>e.callApi("POST","alarmo/automations",t),ct=(e,t)=>e.callApi("POST","alarmo/automations",{automation_id:t,remove:!0}),ht=e=>e.callWS({type:"alarmo/areas"}),mt=(e,t)=>e.callApi("POST","alarmo/area",t),ut=e=>{class t extends e{connectedCallback(){super.connectedCallback(),this.__checkSubscribed()}disconnectedCallback(){if(super.disconnectedCallback(),this.__unsubs){for(;this.__unsubs.length;){const e=this.__unsubs.pop();e instanceof Promise?e.then(e=>e()):e()}this.__unsubs=void 0}}updated(e){super.updated(e),e.has("hass")&&this.__checkSubscribed()}hassSubscribe(){return[]}__checkSubscribed(){void 0===this.__unsubs&&this.isConnected&&void 0!==this.hass&&(this.__unsubs=this.hassSubscribe())}}return n([Qe({attribute:!1})],t.prototype,"hass",void 0),t};var pt,gt,vt,_t={modes_short:{armed_away:"Fora",armed_home:"Casa",armed_night:"Nit",armed_custom_bypass:"Personalitzat",armed_vacation:"Vacation"},enabled:"Activat",disabled:"Desactivat"},ft={time_slider:{seconds:"seg",minutes:"min",infinite:"infinit",none:"cap"},editor:{ui_mode:"Canvia a UI",yaml_mode:"Canvia a YAML",edit_in_yaml:"Edit in YAML"},table:{filter:{label:"Filter items",item:"Filter by {name}",hidden_items:"{number} {number, plural,\n  one {item is}\n  other {items are}\n} hidden"}}},bt={general:{title:"General",cards:{general:{description:"Aquest tauler defineix alguns paràmetres globals de l'alarma.",fields:{disarm_after_trigger:{heading:"Desactivar després del disparador",description:"Quan hagi transcorregut el temps d’activació, desactiveu l’alarma en lloc de tornar a l’estat armat."},enable_mqtt:{heading:"Activa MQTT",description:"Permet controlar el tauler d'alarma mitjançant MQTT."},enable_master:{heading:"Activa l'alarma mestra",description:"Crea una entitat per controlar totes les àrees simultàniament."}},actions:{setup_mqtt:"Configuració MQTT",setup_master:"Configuració mestra"}},modes:{title:"Modes",description:"Aquest tauler es pot utilitzar per configurar els modes d'activació de l'alarma.",modes:{armed_away:"El mode fora de casa s'utilitzarà quan totes les persones surtin de casa. Es controlen totes les portes i finestres que permeten l'accés a la casa, així com els sensors de moviment dins de la casa.",armed_home:"El mode a casa (també conegut com mode casa) s'utilitzarà quan configureu l'alarma mentre hi hagi persones a la casa. Es controlen totes les portes i finestres que permetin l'accés a la casa, però no els sensors de moviment a l'interior de la casa.",armed_night:"El mode nit s'utilitzarà quan configureu l'alarma abans d'anar a dormir. Es controlaran totes les portes i finestres que permetin l'accés a la casa i es seleccionaran els sensors de moviment (per exemple, a la planta baixa) de la casa.",armed_vacation:"Armed vacation can be used as an extension to the armed away mode in case of absence for longer duration. The delay times and trigger responses can be adapted (as desired) to being distant from home.",armed_custom_bypass:"Un mode addicional per definir el vostre propi perímetre de seguretat."},number_sensors_active:"{number} {number, plural,\n  one {sensor}\n  other {sensors}\n} activa",fields:{status:{heading:"Status",description:"Controls whether the alarm can be armed in this mode."},exit_delay:{heading:"Retard de sortida",description:"Quan activeu l'alarma, en aquest període de temps els sensors encara no activaran l'alarma."},entry_delay:{heading:"Retard d'entrada",description:"Temps de retard fins que s'activi l'alarma després que s'activi un dels sensors."},trigger_time:{heading:"Temps d'activació",description:"Temps durant el qual sonarà la sirena"}}},mqtt:{title:"Configuració MQTT",description:"Aquest tauler es pot utilitzar per configurar la interfície MQTT.",fields:{state_topic:{heading:"Tema d'estat",description:"Tema sobre el qual es publiquen les actualitzacions d'estat"},event_topic:{heading:"Tema d'esdeveniment",description:"Tema sobre el qual es publiquen els esdeveniments d'alarma"},command_topic:{heading:"Tama d'ordre",description:"Tema sobre el qual s'envien les ordres d'activació/desactivació."},require_code:{heading:"Requereix codi",description:"Requereix l'enviament d'un codi amb l'ordre."},state_payload:{heading:"Configura la càrrega útil per estat",item:"Definiu una càrrega útil per a l'estat ''{state}''"},command_payload:{heading:"Configura la càrrega útil per ordre",item:"Definiu una càrrega útil per a l'ordre ''{command}''"}}},areas:{title:"Àrees",description:"Les àrees es poden utilitzar per dividir el sistema d'alarma en diversos compartiments.",no_items:"Encara no hi ha àrees definides.",table:{remarks:"Observacions",summary:"Aquesta àrea conté {summary_sensors} i {summary_automations}.",summary_sensors:"{number} {number, plural,\n  one {sensor}\n  other {sensors}\n}",summary_automations:"{number} {number, plural,\n  one {automatisme}\n  other {automatismes}\n}"},actions:{add:"Afegeix"}}},dialogs:{create_area:{title:"Àrea nova",fields:{copy_from:"Copia la configuració de"}},edit_area:{title:"Edita l'àrea ''{area}''",name_warning:"Nota: si canvieu el nom, es canviarà l'identificador d'entitat"},remove_area:{title:"Voleu eliminar l'àrea?",description:"Confirmeu que voleu eliminar aquesta àrea? Aquesta àrea conté {sensors} sensors i {automatismes} automatismes, que també s'eliminaran."},edit_master:{title:"Configuració mestra"},disable_master:{title:"Voleu desactivar l'alarma mestra?",description:"Confirmeu que voleu eliminar l'alarma mestra? Aquesta àrea conté automatismes {automatismes}, que s'eliminaran amb aquesta acció."}}},sensors:{title:"Sensors",cards:{sensors:{description:"Sensors configurats actualment. Feu clic a una entitat per fer canvis.",table:{no_items:"No hi ha cap sensor per mostrar",arm_modes:"Modes d'armat",always_on:"(Sempre)",no_area_warning:"Sensor is not assigned to any area."}},add_sensors:{title:"Afegeix sensors",description:"Afegiu més sensors. Assegureu-vos que els vostres sensors tinguin un friendly_name perquè pugueu identificar-los.",no_items:"No hi ha entitats HA disponibles que es puguin configurar per a l'alarma. Assegureu-vos d'incloure entitats del tipus binary_sensor.",table:{type:"Detected type"},actions:{add_to_alarm:"afegeix a l'alarma",show_all:"Mostra-ho tot"}},editor:{title:"Edita el sensor",description:"Edita la configuració del sensor de ''{entity}''.",fields:{entity:{heading:"Entidad",description:"Entidad asociada a este sensor"},area:{heading:"Àrea",description:"Seleccioneu una àrea que contingui aquest sensor."},group:{heading:"Group",description:"Group with other sensors for combined triggering."},device_type:{heading:"Tipus de dispositiu",description:"Trieu un tipus de dispositiu per aplicar automàticament la configuració adequada.",choose:{door:{name:"Porta",description:"Porta, porta de garatge o altra entrada que s'utilitzi per entrar/sortir de casa."},window:{name:"Finestra",description:"Finestra o una porta que no s'utilitza per entrar a la casa, com ara un balcó."},motion:{name:"Moviment",description:"Sensor de presència o dispositiu similar que té un retard entre les activacions."},tamper:{name:"Antisabotatge",description:"Detector de retirada de la coberta del sensor, sensor de trencament de vidre, etc."},environmental:{name:"Ambiental",description:"Sensor de fum o gas, detector de fuites, etc. (no relacionat amb la protecció antirobatori)."},other:{name:"Genèric"}}},always_on:{heading:"Sempre activat",description:"El sensor sempre ha de disparar l'alarma."},modes:{heading:"Modes habilitats",description:"Modes d'alarma en què aquest sensor està actiu."},arm_on_close:{heading:"Arma després de tancar",description:"Després de la desactivació d'aquest sensor, s'omet automàticament el temps de retard de sortida restant."},use_exit_delay:{heading:"Use exit delay",description:"Sensor is allowed to be active when the exit delay starts."},use_entry_delay:{heading:"Use entry delay",description:"Sensor activation triggers the alarm after the entry delay rather than directly."},allow_open:{heading:"Permet obrir mentre s'arma l'alarma",description:"Permeteu que aquest sensor estigui actiu poc després de configurar-lo de manera que no bloquegi l'activació de l'alarma."},auto_bypass:{heading:"Omet automàticament",description:"Excloeu aquest sensor de l'alarma si està obert mentre s'arma l'alarma.",modes:"Modes in which sensor may be bypassed"},trigger_unavailable:{heading:"Activador quan no estigui disponible",description:"Quan l'estat del sensor no estigui disponible, això activarà el sensor."}},actions:{toggle_advanced:"Configuració avançada",remove:"Elimina",setup_groups:"Setup groups"},errors:{description:"Corregiu els errors següents:",no_area:"No s'ha seleccionat cap àrea",no_modes:"No s'han seleccionat modes per als quals el sensor hauria d'estar actiu",no_auto_bypass_modes:"No modes are selected for the sensor may be automatically bypassed"}}},dialogs:{manage_groups:{title:"Manage sensor groups",description:"In a sensor group multiple sensors must be activated within a time period before the alarm is triggered.",no_items:"No groups yet",actions:{new_group:"New group"}},create_group:{title:"New sensor group",fields:{name:{heading:"Name",description:"Name for sensor group"},timeout:{heading:"Time-out",description:"Time period during which consecutive sensor activations triggers the alarm."},event_count:{heading:"Nombre",description:"Quantitat de sensors diferents que cal activar per activar l'alarma."},sensors:{heading:"Sensors",description:"Select the sensors which are contained by this group."}},errors:{invalid_name:"Invalid name provided.",insufficient_sensors:"At least 2 sensors need to be selected."}},edit_group:{title:"Edit sensor group ''{name}''"}}},codes:{title:"Codis",cards:{codes:{description:"Canvieu la configuració del codi.",fields:{code_arm_required:{heading:"Utilitzeu un codi d'activació",description:"Requereix un codi per activar l'alarma."},code_disarm_required:{heading:"Utilitzeu un codi de desactivació",description:"Requereix un codi per desactivar l'alarma."},code_mode_change_required:{heading:"Requerir un codi para cambiar de modo",description:"Se necesita un codi válido para cambiar el modo de armado que está activo."},code_format:{heading:"Format del codi",description:"Estableix el tipus de codi per a la targeta d'alarma Lovelace.",code_format_number:"codi PIN",code_format_text:"contrasenya"}}},user_management:{title:"Gestió d'usuaris",description:"Cada usuari té el seu propi codi per activar/desactivar l'alarma.",no_items:"Encara no hi ha usuaris",actions:{new_user:"usuari nou"}},new_user:{title:"Crea un usuari nou",description:"Es poden crear usuaris per proporcionar accés al funcionament de l'alarma.",fields:{name:{heading:"Nom",description:"Nom de l'usuari."},code:{heading:"Codi",description:"Codi d'aquest usuari."},confirm_code:{heading:"Confirmeu el codi",description:"Repetiu el codi."},can_arm:{heading:"Permetre que el codi active l'alarma",description:"Entering this code activates the alarm"},can_disarm:{heading:"Permetre que el codi desactive l'alarma",description:"Entering this code deactivates the alarm"},is_override_code:{heading:"És un codi de sobreescriptura",description:"Si introduïu aquest codi, es forçarà l'estat d'activació de l'alarma"},area_limit:{heading:"Restricted areas",description:"Limit user to control only the selected areas"}},errors:{no_name:"No s'ha proporcionat cap nom.",no_code:"El codi ha de tenir 4 caràcters o números com a mínim.",code_mismatch:"Els codis no coincideixen."}},edit_user:{title:"Edita l'usuari",description:"Canvia la configuració de l'usuari ''{name}''.",fields:{old_code:{heading:"Codi actual",description:"Codi actual, deixeu-lo en blanc per deixar-lo sense canvis."}}}}},actions:{title:"Accions",cards:{notifications:{title:"Notificacions",description:"Utilitzant aquest tauler, podeu gestionar les notificacions que s'envien quan es produeix un determinat esdeveniment d'alarma.",table:{no_items:"Encara no s'han creat notificacions.",no_area_warning:"Action is not assigned to any area."},actions:{new_notification:"nova notificació"}},actions:{description:"Aquest tauler es pot utilitzar per canviar un dispositiu quan l'estat d'alarma canvia.",table:{no_items:"Encara no s'han creat accions."},actions:{new_action:"nova acció"}},new_notification:{title:"Crea una notificació",description:"Crea una nova notificació.",trigger:"Condition",action:"Task",options:"Options",fields:{event:{heading:"Esdeveniment",description:"Quan s'ha d'enviar la notificació",choose:{armed:{name:"L'alarma està activada",description:"L'alarma s'ha activat correctament"},disarmed:{name:"L'alarma està desactivada",description:"L'alarma està desactivada"},triggered:{name:"L'alarma s'activat per esdeveniment",description:"L'alarma s'activat per esdeveniment"},untriggered:{name:"Alarm not longer triggered",description:"The triggered state of the alarm has ended"},arm_failure:{name:"No s'ha pogut activar l'alarma",description:"L'activació de l'alarma ha fallat a causa d'un o més sensors estan oberts"},arming:{name:"S'ha iniciat el retard de sortida",description:"S'ha iniciat el retard de sortida, a punt per sortir de casa."},pending:{name:"S'ha iniciat el retard d'entrada",description:"El retard d'entrada s'ha iniciat, l'alarma s'activarà aviat."}}},mode:{heading:"Mode",description:"Limita l'acció a modes específics d'activació (opcional)"},title:{heading:"Títol",description:"Títol del missatge de notificació"},message:{heading:"Missatge",description:"Contingut del missatge de notificació",insert_wildcard:"Insert wildcard",placeholders:{armed:"The alarm is set to {{arm_mode}}",disarmed:"The alarm is now OFF",triggered:"The alarm is triggered! Cause: {{open_sensors}}.",untriggered:"The alarm is not longer triggered.",arm_failure:"The alarm could not be armed right now, due to: {{open_sensors}}.",arming:"The alarm will be armed soon, please leave the house.",pending:"The alarm is about to trigger, disarm it quickly!"}},open_sensors_format:{heading:"Format for open_sensors wildcard",description:"Choose which sensor information in inserted in the message",options:{default:"Names and states",short:"Names only"}},arm_mode_format:{heading:"Translation for arm_mode wildcard",description:"Choose in which language the arm mode is inserted in the message"},target:{heading:"Destinatari",description:"Dispositiu al qual enviar el missatge"},name:{heading:"Nom",description:"Descripció d'aquesta notificació",placeholders:{armed:"Notify {target} upon arming",disarmed:"Notify {target} upon disarming",triggered:"Notify {target} when triggered",untriggered:"Notify {target} when triggering stops",arm_failure:"Notify {target} on failure",arming:"Notify {target} when leaving",pending:"Notify {target} when arriving"}},delete:{heading:"Delete automation",description:"Permanently remove this automation"}},actions:{test:"Prova-ho"}},new_action:{title:"Crea una acció",description:"Aquest tauler es pot utilitzar per canviar un dispositiu quan l'estat d'alarma canvia.",fields:{event:{heading:"Esdeveniment",description:"Quan s'ha d'executar l'acció"},area:{heading:"Àrea",description:"Àrea per a la qual s'aplica l'esdeveniment."},mode:{heading:"Mode",description:"Limita l'acció a modes específics d'activació (opcional)"},entity:{heading:"Entitat",description:"Entitat en què es realitzarà l'acció"},action:{heading:"Acció",description:"Acció a realitzar a l'entitat",no_common_actions:"Actions can only be assigned in YAML mode for the selected entities."},name:{heading:"Nom",description:"Descripció d'aquesta acció",placeholders:{armed:"Set {entity} to {state} upon arming",disarmed:"Set {entity} to {state} upon disarming",triggered:"Set {entity} to {state} when triggered",untriggered:"Set {entity} to {state} when triggering stops",arm_failure:"Set {entity} to {state} on failure",arming:"Set {entity} to {state} when leaving",pending:"Set {entity} to {state} when arriving"}}}}}}},yt={common:_t,components:ft,title:"Tauler alarma",panels:bt},kt=Object.freeze({__proto__:null,common:_t,components:ft,title:"Tauler alarma",panels:bt,default:yt}),wt={modes_short:{armed_away:"Pryč",armed_home:"Doma",armed_night:"Noc",armed_custom_bypass:"Vlastní",armed_vacation:"Dovolená"},enabled:"Povoleno",disabled:"Zakázáno"},At={time_slider:{seconds:"sek",minutes:"min",infinite:"neomezeno",none:"žádné"},editor:{ui_mode:"Do UI",yaml_mode:"Do YAML",edit_in_yaml:"Upravit v YAML"},table:{filter:{label:"Filtrovat položky",item:"Filtrovat podle {name}",hidden_items:"{number} {number, plural,\n  one {položka je}\n  other {položky jsou}\n} skryté"}}},$t={general:{title:"Obecné",cards:{general:{description:"Tento panel definuje obecné nastavení alarmu.",fields:{disarm_after_trigger:{heading:"Deaktivovat alarm po spuštění",description:"Po vypršení času spuštěného alarmu, deatkivovat alarm místo návratu do zajištěného stavu."},enable_mqtt:{heading:"Povolit MQTT",description:"Povolení kontroly alarmu přes MQTT."},enable_master:{heading:"Povolit centrální alarm",description:"Vytvoří entitu pro kontrolu alarmu pro všechny zóny."}},actions:{setup_mqtt:"Nastavení MQTT",setup_master:"Nastavení centrálního alarmu"}},modes:{title:"Režimy",description:"Tento panel slouží k nastavení režimů alarmu.",modes:{armed_away:"Zajištěno Pryč se používá v případě, že nikdo není doma. Veškeré dveře a okna jsou hlídaná proti otevření a pohybové senzory kontrolují uvnitř",armed_home:"Zajištěno Doma se používá v případě, že se někdo v domě pohybuje. Veškeré dveře a okna jsou hlídaná proti otevření, ale pohybové senzory hlídané nejsou.",armed_night:"Zajištěno Noc se používá v případe, že chceme zajistit při spánku. Můžete vybrat které dveře a pohybové senzory spustí alarm a které ne. (například v přízemí domu)",armed_vacation:"Zajištěno Dovolená se používá jako rošíření Zajištěno Pryč, pro nastavení různého chování alarmu. Například delší doba sirény, odeslání notifikace ...",armed_custom_bypass:"Speciální režim pro kompletní kontrolu nad nastavením alarmu."},number_sensors_active:"{number} {number, plural,\n  one {senzor}\n  other {senzorů}\n} aktivní",fields:{status:{heading:"Stav",description:"Určuje, zda v tomto režimu je možné alarm zajistit."},exit_delay:{heading:"Čekání na odchod",description:"V případě zajištění alarmu, po tuto dobu nebudou vyhodnoceny změny seznorů (například otevření hlavních dveří)"},entry_delay:{heading:"Čekání při příchodu",description:"Zpoždění spuštění alarmu pro možnost zadání kódu při příchodu domů."},trigger_time:{heading:"Délka spuštění alarmu",description:"Doba po kterou alarm zůstane ve spuštěném stavu."}}},mqtt:{title:"Nastavení MQTT",description:"Tento panel slouží pro nastavení MQTT komunikace.",fields:{state_topic:{heading:"State topic",description:"Topic on which state updates are published"},event_topic:{heading:"Event topic",description:"Topic on which alarm events are published"},command_topic:{heading:"Command topic",description:"Topic which Alarmo listens to for arm/disarm commands."},require_code:{heading:"Require code",description:"Require the code to be sent with the command."},state_payload:{heading:"Configure payload per state",item:"Define a payload for state ''{state}''"},command_payload:{heading:"Configure payload per command",item:"Define a payload for command ''{command}''"}}},areas:{title:"Zóny",description:"Zóny mohou být použity pro rozdělení alarmu do více oblastí.",no_items:"Zatím nejsou definované žádné zóny.",table:{remarks:"Poznámka",summary:"Tato zóna obsahuje {summary_sensors} a {summary_automations}.",summary_sensors:"{number} {number, plural,\n  one {senzor}\n  other {senzorů}\n}",summary_automations:"{number} {number, plural,\n  one {automatizace}\n  other {automatiací}\n}"},actions:{add:"Přidat"}}},dialogs:{create_area:{title:"Nové zóna",fields:{copy_from:"Zkopírovat nastavení z"}},edit_area:{title:"Úprava zóny ''{area}''",name_warning:"Poznámka: změna jména zárověň změní i ID entity"},remove_area:{title:"Odebrat zónu?",description:"Jste si jistí? Tato zóna obsahuje {sensors} senzory a {automations} automatizace, které budou odstraněny také."},edit_master:{title:"Centrální nastavení"},disable_master:{title:"Zakázat centrální ovládání?",description:"Jste si jistí?  Tato zóna obsahuje {sensors} senzory a {automations} automatizace, které budou odstraněny také."}}},sensors:{title:"Senzory",cards:{sensors:{description:"Aktuálně nastavené senzory. Pro změnu klikněte na položku.",table:{no_items:"Žádné senzory k zobrazení.",no_area_warning:"Senzor není přiřazen k žádné zóně",arm_modes:"Režimy alarmu",always_on:"(Vždy)"}},add_sensors:{title:"Přidat Senzor",description:"Přidat další senzory. Ujistěte se, že vaše senzory jsou správně pojmenovány.",no_items:"Nejsou žádné dostupné HA entity, které mohou být nastaveny pro alarm. Přidejte prosím pouze entity typu binary_sensor.",table:{type:"Zjištěný typ"},actions:{add_to_alarm:"přidat do alarmu",filter_supported:"Skrýt položky neznámého typu"}},editor:{title:"Upravit Senzor",description:"Nastavení senzoru entity ''{entity}''.",fields:{entity:{heading:"Entita",description:"Entidad asociada a este sensor"},area:{heading:"Zóna",description:"Vyberte zónu do které má senzor patřit."},group:{heading:"Skupina",description:"Seskupit senzory pro kombinované spuštění alarmu."},device_type:{heading:"Typ zařízení",description:"Vyberte typ zařízení pro automatické předvyplnění parametrů.",choose:{door:{name:"Dveře",description:"Dveře, brána nebo jiný prostředek pro vstup/opuštění domu."},window:{name:"Okno",description:"Okno nebo balkonové dveře, které neslouží pro vstup do domu."},motion:{name:"Pohyb",description:"Pohybový senzor nebo podobné zařízeni pro zjištění přítomnosti osob."},tamper:{name:"Manipulace",description:"Detektor manipulace se senzorem, senzor rozbitého okna, atd."},environmental:{name:"Prostředí",description:"Senzor kouře/plynu, detektor úniku vody, atd. (neslouží k ochraně před zloději)."},other:{name:"Obecné"}}},always_on:{heading:"Vždy zapnuto",description:"Senzor vždy spustí alarm."},modes:{heading:"Povolené režimy",description:"Režimy alarmu, pro které se má senzor vyhodnocovat."},arm_on_close:{heading:"Zajistit po zavření",description:"Po deaktivaci tohoto senzoru, přeskočit čekání na odchod."},use_exit_delay:{heading:"Použít při čekání na odchod",description:"Senzor může být aktivní když začne čekání na odchod."},use_entry_delay:{heading:"Použíy čekání na vstup",description:"Aktivace senzoru spustí alarm až uplyne doba čekání na vstup."},allow_open:{heading:"Povolit aktivní senzor po zajištění",description:"Pokud je senzor stále aktivní i po čekání na odchod, nezpůsobí chybu zajištění."},auto_bypass:{heading:"Automaticky vyřadit senzor",description:"Pokud je senzor v době zajištění aktivní, bude automaticky vyřazen z alarmu.",modes:"Režimy, ve kterých může být senzor automaticky vyřazen"},trigger_unavailable:{heading:"Spustit alarm při nedostupnosti",description:"Pokud stav senzoru není dostupný, spustí alarm."}},actions:{toggle_advanced:"Rozšířené nastavení",remove:"Odebrat",setup_groups:"Nastavit skupiny"},errors:{description:"Prosím opravte následující chyby:",no_area:"Není vybrána žádná zóna",no_modes:"Není vybrán žádný režim, ve kterém má být seznor aktivní",no_auto_bypass_modes:"Není vybrán žádný režim, ve kterém má být senzor automaticky vyřazen"}}},dialogs:{manage_groups:{title:"Spravovat skupiny senzorů",description:"Ve skupině senzorů musí byt aktivováno více senzorů v určitém časovém úseku pro spuštění alarmu.",no_items:"Nejsou žádné skupiny",actions:{new_group:"Nová skupina"}},create_group:{title:"Nová skupina senzorů",fields:{name:{heading:"Název",description:"Název skupiny senzorů"},timeout:{heading:"Časový úsek",description:"Časový úsek ve kterém musí být aktivovány senzory aby byl alarm spuštěn."},event_count:{heading:"Počet",description:"Množství různých senzorů, které je třeba aktivovat ke spuštění poplachu."},sensors:{heading:"Senzory",description:"Vyberte senzory, které mají být v této skupině."}},errors:{invalid_name:"Neplatné jméno.",insufficient_sensors:"Musí být vybrány alespoň 2 senzory."}},edit_group:{title:"Upravit skupinu senzorů ''{name}''"}}},codes:{title:"Kódy",cards:{codes:{description:"Změnit nastavení kódu.",fields:{code_arm_required:{heading:"Použít kód k zajištění",description:"Vyžadovat kód při zajištění alarmu"},code_disarm_required:{heading:"Použít kód k deaktivaci alarmu",description:"Vyžadovat kód pro deaktivaci alarmu"},code_mode_change_required:{heading:"Vyžadovat kód pro přepínání režimu",description:"Pro změnu aktivního režimu aktivace je nutné zadat platný kód."},code_format:{heading:"Formát kódu",description:"Nastaví typ klávesnice pro kartu alarmu v Lovelace.",code_format_number:"pin",code_format_text:"heslo"}}},user_management:{title:"Správa uživatelů",description:"Každý uživatel má svůj vlastní kód pro zajištění/deaktivaci alarmu.",no_items:"Neexistují žádní uživatelé",actions:{new_user:"nový uživatel"}},new_user:{title:"Vytvořit nového uživatele",description:"Uživatelé mohou být vytvořeni pro práci s alarmem.",fields:{name:{heading:"Jméno",description:"Jméno uživatele."},code:{heading:"Kód",description:"Kód uživatele."},confirm_code:{heading:"Ověření kódu",description:"Zopakujte kód."},can_arm:{heading:"Povolit kód pro zajištění",description:"Zadání tohoto kódu zajistí alarm"},can_disarm:{heading:"Povolit kód pro deaktivaci",description:"Zadání tohoto kódu deaktivuje alarm"},is_override_code:{heading:"Je to override kód",description:"Zadání tohoto kódu zajistí alarm i přes otevřené senzory"},area_limit:{heading:"Povolené zóny",description:"Omezení uživatele ovládat pouze vybrané zóny alarmu"}},errors:{no_name:"Není zadáno jméno.",no_code:"Kód by měl mít minimálně 4 znaky.",code_mismatch:"Kódy se neshodují."}},edit_user:{title:"Upravit uživatele",description:"ZMěnit nastavení uživatele ''{name}''.",fields:{old_code:{heading:"Aktuální kód",description:"Aktuální kód, nechte prázdné pokud nechcete měnit."}}}}},actions:{title:"Akce",cards:{notifications:{title:"Notifikace",description:"Tento panel slouží k nastavení notifikací, které mají být odeslány v případě určitých událostí alarmu.",table:{no_items:"Nejsou žádné vytvořené notifikace.",no_area_warning:"Akce není přiřazena k žádné zóně."},actions:{new_notification:"nová notifikace"}},actions:{description:"Tento panel slouží k nastavení změny zařízení v případě změny stavu alarmu.",table:{no_items:"Nejsou žádné vytvořené akce."},actions:{new_action:"nová akce"}},new_notification:{title:"Nastavení notifikací",description:"Odeslání notifikace při zajištění/deaktivaci alarmu, při spuštění alarmu, atd.",trigger:"Podmínka",action:"Akce",options:"Možnosti",fields:{event:{heading:"Událost",description:"Kdy by měla být notifikace odeslána",choose:{armed:{name:"Alarm je zajištěný",description:"Zajištění alarmu proběhlo úspěšně"},disarmed:{name:"Alarm je deaktivovaný",description:"Deaktivace alarmu proběhla úspěšně"},triggered:{name:"Alarm je spuštěný",description:"Byl spustěný alarm"},untriggered:{name:"Spuštěný alarm skončil",description:"Skončilo spustění alarmu (například vypršením nastavené doby nebo deaktivací)"},arm_failure:{name:"Zajištění se nepodařilo",description:"Zajištění alarmu se nepodařilo díky jendomu nebo více aktivním senzorům"},arming:{name:"Čas na odchod začal",description:"Začal odpočet času pro odchod."},pending:{name:"Čas na příchod",description:"Začal odpočet času na příchod."}}},mode:{heading:"Režim",description:"Omezit notifikaci na specifický režim alarmu (nepovinné)"},title:{heading:"Nadpis",description:"Nadpis notifikace"},message:{heading:"Zpráva",description:"Obsah zprávy v notifikaci",insert_wildcard:"Vložit proměnnou",placeholders:{armed:"Alarm je nastaven na {{arm_mode}}",disarmed:"Alarm je deaktovovaný",triggered:"Alarm je spuštěný! Příčina: {{open_sensors}}.",untriggered:"Alarm byl ukončen.",arm_failure:"Alarm nemohl být zajištěný v tuto chvíli, kvůli: {{open_sensors}}.",arming:"Probíhá zajištění alarmu, můžete opustit dům.",pending:"Alarm bude brzy spuštěný, rychle ho deaktivujte!"}},open_sensors_format:{heading:"Formát pro open_sensors proměnnou",description:"Vyberte, které informace o senzoru budou do zprávy přidány",options:{default:"Jména a stavy",short:"Pouze jména"}},arm_mode_format:{heading:"Překlad pro arm_mode proměnnou",description:"Vyberte ve kterém jazyce se má do zprávy přidat režim alarmu"},target:{heading:"Přijemce",description:"Na které zařízení má být notifikace odeslána"},name:{heading:"Jméno",description:"Popis této notifikace",placeholders:{armed:"Upozornit {target} při zajištění",disarmed:"Upozornit {target} při deaktivaci",triggered:"Upozornit {target} při spuštění",untriggered:"Upozornit {target} když se alarm ukončí",arm_failure:"Upozornit {target} při chybě v zajištění",arming:"Upozornit {target} při odchodu",pending:"Upozornit {target} při příchodu"}},delete:{heading:"Odstranit automatizaci",description:"Trvale odstranit tuto automatizaci"}},actions:{test:"Vyzkoušet"}},new_action:{title:"Nastavení akce",description:"Rozsvítit světla, spustit sirénu například při spuštění alarmu.",fields:{event:{heading:"Událost",description:"Kdy by měla být akce provedena"},area:{heading:"Zóna",description:"Pro kterou zónu se má akce provést."},mode:{heading:"Režim",description:"Omezit akci na specifický režim alarmu (nepovinné)"},entity:{heading:"Entita",description:"Na které entitě má být akce provedena"},action:{heading:"Akce",description:"Akce, která má být provedena na entitě",no_common_actions:"Pro vybrané entity může být akce nastavena pouze v YAML."},name:{heading:"Název",description:"Popis této akce",placeholders:{armed:"Nastav {entity} na {state} při zajištění",disarmed:"Nastav {entity} na {state} při deaktivaci",triggered:"Nastav {entity} na {state} při spuštění",untriggered:"Nastav {entity} na {state} když se alarm ukončí",arm_failure:"Nastav {entity} na {state} při chybě v zajištění",arming:"Nastav {entity} na {state} při odchod",pending:"Nastav {entity} na {state} při příchodu"}}}}}}},Tt={common:wt,components:At,title:"Alarm panel",panels:$t},Et=Object.freeze({__proto__:null,common:wt,components:At,title:"Alarm panel",panels:$t,default:Tt}),jt={modes_short:{armed_away:"Ude",armed_home:"Hjemme",armed_night:"Nat",armed_custom_bypass:"Tilpasset",armed_vacation:"Ferie"},enabled:"Aktiveret",disabled:"deaktiveret"},xt={time_slider:{seconds:"sek",minutes:"min",infinite:"Uendeligt",none:"ingen"},editor:{ui_mode:"Til UI",yaml_mode:"Til YAML",edit_in_yaml:"Ret i YAML"},table:{filter:{label:"Filtrer genstande",item:"Filtrer efter {name}",hidden_items:"{number} {number, plural,\n one {enhed er}\n  other {enheder er}\n} skjult"}}},St={general:{title:"Generelt",cards:{general:{description:"Dette panel definerer nogle globale indstillinger for alarmen.",fields:{disarm_after_trigger:{heading:"Frakobling efter alarm",description:"Efter udløsningstid er udløbet, deaktiver alarmen i stedet for at vende tilbage til aktiveret tilstand."},enable_mqtt:{heading:"Aktiver MQTT",description:"Tillad at alarmpanelet blive styret igennem MQTT."},enable_master:{heading:"Aktiver alarmmaster",description:"Opretter en enhed til at kontrollere alle områder samtidigt."}},actions:{setup_mqtt:"MQTT indstillinger",setup_master:"Master indstillinger"}},modes:{title:"Tilstande",description:"Dette panel kan bruges til at indstille alarmens tilkoblingstilstande.",modes:{armed_away:"Tilkobling ude bliver brugt når alle mennesker forlader huset. Alle døre og vinduer der giver adgang til huset vil blive overvåget, samt bevægelsessensorer inde i huset.",armed_home:"Tilkobling hjemme (også kendt som tilkoblet ophold), bliver brugt når alarmen aktiveret når der er mennesker i huset. Alle døre og vinduer der giver adgang til huset vil være overvåget, men ikke bevægelsessensorer inde i huset.",armed_night:"Tilkobling nat vil blive brugt når du aktiveret alarmen før du går i seng. Alle døre og vinduer der giver adgang til huset vil være overvåget og udvalgte bevægelsessensorer i huset.",armed_vacation:"Tilkobling ferie kan bruges som en forlængelse af tilkobet udetilstand i tilfælde af længerevarende fravær. Forsinkelsestider og udløsningstider kan tilpasses (efter ønske) til at være lang tid hjemmefra.",armed_custom_bypass:"En ekstra tilstand til at definere din egen sikkerhedsperimeter."},number_sensors_active:"{number} {number, plural,\n  one {sensor}\n  other {sensorer}\n} aktive",fields:{status:{heading:"Status",description:"Styrer om alarmen kan aktiveres i denne tilstand."},exit_delay:{heading:"Udgangstid",description:"Når alarmen aktiveres, vil sensorerne ikke udløse alarmen inden for denne tidsperiode."},entry_delay:{heading:"Indgangstid",description:"Forsinkelsestid indtil alarmen udløses, efter at en af sensorerne er aktiveret."},trigger_time:{heading:"Sirenetid",description:"Tid hvor sirenen er aktiv efter udløsning."}}},mqtt:{title:"MQTT indstillinger",description:"Dette panel kan bruges til indstilling af MQTT-grænsefladen.",fields:{state_topic:{heading:"Status topic",description:"Topic hvor status sendes til."},event_topic:{heading:"Event topic",description:"Topic hvor alarm events sendes til."},command_topic:{heading:"Kommando topic",description:"Topic som alarmo lytter efter tilkobling/frakobling kommandoer."},require_code:{heading:"Kræv kode",description:"Kræv at koden bliver sendt med kommandoen."},state_payload:{heading:"Indstil last pr tilstand",item:"Definerer en last for tilstanden ''{state}''"},command_payload:{heading:"Indstil last pr kommando",item:"Definerer en last for kommando ''{command}''"}}},areas:{title:"Områder",description:"Områder kan bruges til at opdele dit alarmsystem i flere rum.",no_items:"Der er ikke defineret områder endnu.",table:{remarks:"Kommentarer",summary:"Dette område indeholder {summary_sensors} og {summary_automations}.",summary_sensors:"{number} {number, plural,\n  one {sensor}\n  other {sensorer}\n}",summary_automations:"{number} {number, plural,\n  one {automation}\n  other {automationer}\n}"},actions:{add:"Tilføj"}}},dialogs:{create_area:{title:"Nyt område",fields:{copy_from:"Kopier indstillinger fra"}},edit_area:{title:"Redigerer område ''{area}''",name_warning:"Note: ændring af navnet ændrer også enheds id"},remove_area:{title:"Fjern område?",description:"Er du sikker på at du ønsker at fjerne området? Dette område indeholder {sensors} sensorer og {automations} automationer, hvilket også vil blive fjernet."},edit_master:{title:"Master indstillinger"},disable_master:{title:"Deaktiver master?",description:"Er du sikker på du ønsker at fjerne alarm master? Dette område indeholder {automations} automationer, hvilket vil blive fjernet."}}},sensors:{title:"Sensorer",cards:{sensors:{description:"Aktuelt konfigurerede sensorer. Klik på et element for at foretage ændringer.",table:{no_items:"Der er ingen sensorer der kan vises her.",no_area_warning:"Sensoren er ikke tildelt noget område.",arm_modes:"Tilkoblings tilstande",always_on:"(Altid)"}},add_sensors:{title:"Tilføj Sensorer",description:"Tilføj flere sensorer. Sørg for din sensor har en passende navn, så du senere kan identificere dem.",no_items:"Der er ingen tilgængelige HA-enheder, der kan konfigureres til alarmen. Sørg for at inkludere enheder af typen binary_sensor.",table:{type:"Registreret type"},actions:{add_to_alarm:"tilføj til alarm",filter_supported:"Gem enheder af ukendt type"}},editor:{title:"Rediger Sensor",description:"Konfigurer sensor indstillinger for ''{entity}''.",fields:{entity:{heading:"Entitet",description:"Entitet tilknyttet denne sensor"},area:{heading:"Område",description:"Vælg det område som indeholder denne sensor."},group:{heading:"Gruppe",description:"Gruppe med andre sensorer for kombineret udløsning."},device_type:{heading:"enheds type",description:"Vælg enheds typen for automatisk at tilføje de korrekte indstillinger.",choose:{door:{name:"Dør",description:"En dør, åbning eller anden indgang der bruges til at komme ind/ud af huset."},window:{name:"Vindue",description:"Et vindue, eller en dør som ikke bruges til at komme ind/ud af huset (f.eks. en balkon/altan)."},motion:{name:"Bevægelsessensor",description:"Tilstedeværelses sensorer eller lignende enheder som har en forsinkelse imellem aktiveringer."},tamper:{name:"Tamper",description:"Detektor for fjernelse af sensordæksel, glasbrudssensor mv."},environmental:{name:"Miljømæssige",description:"Røg-/gassensor, lækagedetektor osv. (ikke relateret til tyverisikring)."},other:{name:"Generisk"}}},always_on:{heading:"Altid til",description:"Sensor skal altid udløse alarmen."},modes:{heading:"Aktiveret tilstande",description:"Alarmtilstande hvor denne sensor er aktiv."},arm_on_close:{heading:"Tilkoble efter lukning",description:"Efter deaktivering af denne sensor, springes den resterende udgangstid automatisk over."},use_exit_delay:{heading:"Brug udgangstid",description:"Sensorer må være aktiv når udgangstid starter."},use_entry_delay:{heading:"Brug indgangstid",description:"Sensor aktivering udløser alarmen efter indgangstiden i stedet for med det samme."},allow_open:{heading:"Tillad åbning efter tilkobling",description:"Oprindelige tilstand på sensoren ignoreres ved tilkobling."},auto_bypass:{heading:"Omgå automatisk",description:"Udeluk denne sensor fra alarmen, hvis den er åben under aktivering.",modes:"Tilstande hvor sensoren kan omgås"},trigger_unavailable:{heading:"Udløs når den ikke er tilgængelig",description:"Når sensortilstanden bliver 'utilgængelig', vil dette aktivere sensoren."}},actions:{toggle_advanced:"Avancerede indstillinger",remove:"Fjern",setup_groups:"Opsæt grupper"},errors:{description:"Ret venligst følgende fejl:",no_area:"Intet område er valgt",no_modes:"Der er ikke valgt tilstande, som sensoren skal være aktiv for",no_auto_bypass_modes:"Ingen tilstande er valgt for sensoren som automatisk kan omgås"}}},dialogs:{manage_groups:{title:"Administrer sensorgrupper",description:"I en sensorgruppe skal flere sensorer aktiveres inden for et tidsrum, før alarmen udløses.",no_items:"Ingen gruppe endnu",actions:{new_group:"Ny gruppe"}},create_group:{title:"Ny sensorgruppe",fields:{name:{heading:"Navn",description:"Sensorgruppe navn"},timeout:{heading:"Tiden er gået",description:"Tidsperioden i hvilken på hinanden følgende sensoraktiveringer udløser alarmen."},event_count:{heading:"Tælle",description:"Antal forskellige sensorer, der skal aktiveres for at udløse alarmen."},sensors:{heading:"Sensorer",description:"Vælg de sensorer, som denne gruppe indeholder."}},errors:{invalid_name:"Ugyldigt navn angivet.",insufficient_sensors:"Der skal vælges mindst 2 sensorer."}},edit_group:{title:"Rediger sensorgruppe ''{name}''"}}},codes:{title:"Koder",cards:{codes:{description:"Skift indstillinger for koden.",fields:{code_arm_required:{heading:"Brug kode ved tilkobling",description:"Kræv kode for at tilkoble alarmen"},code_disarm_required:{heading:"Brug kode ved frakobling",description:"Kræv kode for at frakoble alarmen"},code_mode_change_required:{heading:"Kræv kode for at skifte tilstand",description:"En gyldig kode skal angives for at ændre aktiveringstilstanden."},code_format:{heading:"Kode format",description:"Indstil input typen for lovelace alarm kortet.",code_format_number:"pinkode",code_format_text:"kodeord"}}},user_management:{title:"Brugeradministration",description:"Hver bruger har sin egen kode til at til/fra-koble alarmen.",no_items:"Der er ingen brugere endnu",actions:{new_user:"ny bruger"}},new_user:{title:"Opret ny bruger",description:"Brugere kan oprettes for at give adgang til at styre alarmen.",fields:{name:{heading:"Navn",description:"Brugeren navn."},code:{heading:"Kode",description:"Kode til denne bruger."},confirm_code:{heading:"Bekræft kode",description:"Gentag koden."},can_arm:{heading:"Tillad at bruge til tilkobling",description:"Indtastning af koden tilkobler alarmen"},can_disarm:{heading:"Tillad kode for frakobling",description:"Indtastning af koden frakobler alarmen"},is_override_code:{heading:"Overstyringskode",description:"Indtastning af denne kode vil tilkoble alarmen uanset tilstande"},area_limit:{heading:"Begrænset område",description:"Begræns brugeren til kun at styre det valgte område"}},errors:{no_name:"Ingen navn givet.",no_code:"Koden skal være på mindst 4 karakterer/numre.",code_mismatch:"Koderne er ikke ens."}},edit_user:{title:"Rediger bruger",description:"Ændre indstillinger for brugeren ''{name}''.",fields:{old_code:{heading:"Nuværende kode",description:"Nuværende kode, lad være tomt hvis uændret."}}}}},actions:{title:"Handlinger",cards:{notifications:{title:"Meddelelser",description:"Ved hjælp af dette panel kan du administrere meddelelser, der skal sendes når en bestemt alarmhændelse opstår.",table:{no_items:"Der er ingen meddelelser oprettet endnu.",no_area_warning:"Handlingen er ikke tildelt noget område."},actions:{new_notification:"ny meddelelse"}},actions:{description:"Dette panel kan bruges til at ændre en enhed, når alarmtilstanden ændres.",table:{no_items:"Der er ingen handlinger oprettet endnu."},actions:{new_action:"ny handling"}},new_notification:{title:"Konfigurer meddelelse",description:"Modtag en besked ved til-/frakobling af alarmen, ved aktivering osv.",trigger:"Betingelse",action:"Opgave",options:"Valgmuligheder",fields:{event:{heading:"Event",description:"Hvornår skal meddelelsen sendes",choose:{armed:{name:"Alarm aktiveret",description:"Alarmen er aktiveret med succes"},disarmed:{name:"Alarm frakoblet",description:"Alarmen er frakoblet"},triggered:{name:"Alarm udløst",description:"Alarmen er blevet udløst"},untriggered:{name:"Alarm ikke længere udløst",description:"Udløst tilstanden på alarmen er slut"},arm_failure:{name:"Kunne ikke tilkoble",description:"Alarmen kunne ikke tilkobles pga en eller flere åbne sensorer"},arming:{name:"Udgangstid startet",description:"Udgangstiden tæller ned, klar til at forlade huset."},pending:{name:"Indgangstid startet",description:"Indgangstiden tæller ned, alarmen udløses snart."}}},mode:{heading:"Tilstand",description:"Begræns handlingen til specifikke til/fra-koblings tilstande (valgfrit)"},title:{heading:"Titel",description:"Titel for en meddelelse"},message:{heading:"Meddelelse",description:"Indhold på meddelelse",insert_wildcard:"Indsæt wildcard",placeholders:{armed:"Alarmen er nu {{arm_mode}}",disarmed:"Alarmen er nu frakoblet",triggered:"Alarmen er udløst! Årsag: {{open_sensors}}.",untriggered:"Alarmen er ikke længere udløst.",arm_failure:"Alarmen kan ikke tilkobles lige nu pga: {{open_sensors}}.",arming:"Alarmen til blive tilkoblet snart, venligst forlad huset.",pending:"Alarmen udløses snart, vær hurtig til at frakoble!"}},open_sensors_format:{heading:"Format for open_sensors wildcard",description:"Vælg hvilken sensorinformation der skal indsættes i meddelelsen",options:{default:"Navne og tilstande",short:"Kun navne"}},arm_mode_format:{heading:"Oversættelse for arm_mode wildcard",description:"Vælg på hvilket sprog tilkoblingstilstanden indsættes i beskeden"},target:{heading:"Target",description:"Enhed meddelelsen sendes til"},name:{heading:"Navn",description:"Beskrivelse af denne meddelelse",placeholders:{armed:"Underret {target} ved tilkobling",disarmed:"Underret {target} ved frakobling",triggered:"Underret {target} når udløst",untriggered:"Underret {target} når udløst tilstant stoppes",arm_failure:"Underret {target} ved fejl",arming:"Underret {target} når tilkobling er i gang",pending:"Underret {target} når frakobling er i gang"}},delete:{heading:"Slet automatisering",description:"Fjern automatiseringen permanent"}},actions:{test:"Prøv det"}},new_action:{title:"Konfigurer handling",description:"Skift lys eller anden enhed (såsom sirener) ved til-/frakobling af alarmen, ved aktivering osv.",fields:{event:{heading:"Event",description:"Hvornår skal handlingen udføres"},area:{heading:"Område",description:"Område som hændelsen gælder for."},mode:{heading:"Tilstand",description:"Begræns handlingen til specifikke tilkonlingstilstande (valgfrit)"},entity:{heading:"Enhed",description:"Enhed handlingen udføres på"},action:{heading:"Handling",description:"Handling som skal udføres på enhed",no_common_actions:"Handlinger kan kun tildeles i YAML-tilstand for de valgte enheder."},name:{heading:"Navn",description:"Beskrivelse for denne handling",placeholders:{armed:"Sæt {entity} til {state} ved tilkobling",disarmed:"Sæt {entity} til {state} ved frakobling",triggered:"Sæt {entity} til {state} når alarm udløses",untriggered:"Sæt {entity} til {state} når udløst alarm stopper",arm_failure:"Sæt {entity} til {state} ved fejl",arming:"Sæt {entity} til {state} når tilkobling er i gang",pending:"Sæt {entity} til {state} når frakobling er i gang"}}}}}}},zt={common:jt,components:xt,title:"Alarm panel",panels:St},Ot=Object.freeze({__proto__:null,common:jt,components:xt,title:"Alarm panel",panels:St,default:zt}),Ct={modes_short:{armed_away:"Abwesend",armed_home:"Zuhause",armed_night:"Nacht",armed_custom_bypass:"Benutzerdefiniert",armed_vacation:"Urlaub"},enabled:"Aktiviert",disabled:"Deaktiviert"},Mt={time_slider:{seconds:"s",minutes:"m",infinite:"unendlich",none:"keine"},editor:{ui_mode:"Zu UI",yaml_mode:"Zu YAML",edit_in_yaml:"In YAML bearbeiten"},table:{filter:{label:"Elemente filtern",item:"Filtern nach {name}",hidden_items:"{number} {number, plural,\n  one {item is}\n other {items are}\n} versteckt"}}},Nt={general:{title:"Allgemein",cards:{general:{description:"Dieses Panel legt globale Einstellungen für den Alarm fest.",fields:{disarm_after_trigger:{heading:"Entschärfen nach Auslösung",description:"Nach Ablauf der Auslösezeit wird der Alarm entschärft, anstatt in den scharfen Zustand zurückzukehren."},enable_mqtt:{heading:"MQTT aktivieren",description:"Erlaubt die Steuerung der Alarmzentrale über MQTT."},enable_master:{heading:"Alarm-Master aktivieren",description:"Erzeugt eine Entität zur gleichzeitigen Kontrolle aller Bereiche."}},actions:{setup_mqtt:"MQTT Konfiguration",setup_master:"Master Konfiguration"}},modes:{title:"Modi",description:"Mit diesem Panel können die Scharfschaltmodi des Alarms eingestellt werden.",modes:{armed_away:"Abwesend wird verwendet, wenn alle Personen das Haus verlassen haben. Alle Türen und Fenster, die den Zugang zum Haus ermöglichen, werden bewacht, ebenso wie die Bewegungsmelder im Haus.",armed_home:"Zuhause wird verwendet, wenn der Alarm ausgelöst wird, während sich Personen im Haus befinden. Alle Türen und Fenster, die den Zugang zum Haus ermöglichen, werden bewacht, aber nicht die Bewegungsmelder im Haus.",armed_night:"Nacht wird verwendet, wenn der Alarm vor dem Schlafengehen eingestellt wird. Alle Türen und Fenster, die den Zugang zum Haus ermöglichen, werden überwacht, und ausgewählte Bewegungssensoren (im Erdgeschoss) im Haus.",armed_vacation:"Urlaub kann als Erweiterung von Abwesend bei längerer Abwesenheit verwendet werden. Die Verzögerungszeiten und Auslösereaktionen können (wie gewünscht) an die Abwesenheit angepasst werden.",armed_custom_bypass:"Individuell: ein zusätzlicher Modus, um Ihren eigenen Sicherheitsbereich zu definieren."},number_sensors_active:"{number} {number, plural,\n one {Sensor}\n other {Sensoren}\n} aktiv",fields:{status:{heading:"Status",description:"Steuert, ob der Alarm in diesem Modus aktiviert werden kann."},exit_delay:{heading:"Aktivierungsverzögerung",description:"Beim Scharfschalten des Alarms lösen die Sensoren innerhalb dieser Zeitspanne noch nicht den Alarm aus."},entry_delay:{heading:"Auslöseverzögerung",description:"Verzögerungszeit bis zur Auslösung des Alarms, nachdem einer der Sensoren aktiviert wurde."},trigger_time:{heading:"Auslösezeit",description:"Zeit, in der der Alarm nach der Aktivierung im ausgelösten Zustand bleibt."}}},mqtt:{title:"MQTT Konfiguration",description:"Dieses Panel kann für die Konfiguration der MQTT-Schnittstelle verwendet werden.",fields:{state_topic:{heading:"Status-Topic",description:"Topic, unter dem Statusaktualisierungen veröffentlicht werden"},event_topic:{heading:"Ereignis-Topic",description:"Topic, unter dem Alarmereignisse veröffentlicht werden"},command_topic:{heading:"Kommando-Topic",description:"Topic, auf das Alarmo bei Scharf-/Unscharfschaltbefehlen hört"},require_code:{heading:"Code notwendig",description:"Code muss mit dem Befehl gesendet werden"},state_payload:{heading:"Konfiguriere Payload pro Zustand",item:"Definiere Payload für den Zustand ''{state}''"},command_payload:{heading:"Konfiguriere Payload pro Kommando",item:"Definiere Payload für das Kommando ''{command}''"}}},areas:{title:"Bereiche",description:"Bereiche können verwendet werden, um Ihr Alarmsystem zu unterteilen.",no_items:"Es sind noch keine Bereiche definiert.",table:{remarks:"Bemerkungen",summary:"Dieser Bereich enthält {summary_sensors} und {summary_automations}.",summary_sensors:"{number} {number, plural,\n  one {Sensor}\n  other {Sensoren}\n}",summary_automations:"{number} {number, plural,\n  one {Aktion}\n  other {Aktionen}\n}"},actions:{add:"Hinzufügen"}}},dialogs:{create_area:{title:"Neuer Bereich",fields:{copy_from:"Einstellungen kopieren von"}},edit_area:{title:"Bereich  ''{area}'' bearbeiten",name_warning:"Hinweis: Das Ändern des Namens ändert die Entity-ID!"},remove_area:{title:"Bereich entfernen?",description:"Sind Sie sicher, dass Sie diesen Bereich entfernen möchten? Dieser Bereich enthält {sensors} Sensoren und {automations} Aktionen, die ebenfalls entfernt werden."},edit_master:{title:"Master-Konfiguration"},disable_master:{title:"Master deaktivieren?",description:"Sind Sie sicher, dass Sie den Alarmmaster entfernen möchten? Dieser Bereich enthält {automations} Aktionen, die ebenfalls entfernt werden."}}},sensors:{title:"Sensoren",cards:{sensors:{description:"Derzeit konfigurierte Sensoren. Klicken Sie auf ein Element, um Änderungen vorzunehmen.",table:{no_items:"Hier gibt es keine Sensoren, die angezeigt werden sollen.",no_area_warning:"Der Sensor ist keinem Bereich zugeordnet.",arm_modes:"Aktivierungsmodi",always_on:"(Immer)"}},add_sensors:{title:"Sensoren hinzufügen",description:"Fügen Sie weitere Sensoren hinzu. Achten Sie darauf, dass Ihre Sensoren einen passenden Namen haben, damit Sie sie identifizieren können.",no_items:"Es gibt keine verfügbaren HA-Entitäten, die für den Alarm konfiguriert werden können. Stellen Sie sicher, dass Sie Entitäten des Typs binary_sensor einschließen.",table:{type:"Erkannter Typ"},actions:{add_to_alarm:"zum Alarm hinzufügen",filter_supported:"Elemente mit unbekanntem Typ ausblenden"}},editor:{title:"Sensor bearbeiten",description:"Konfigurieren der Sensoreinstellungen von ''{entity}''.",fields:{entity:{heading:"Entität",description:"Entität, die diesem Sensor zugeordnet ist"},area:{heading:"Bereich",description:"Wählen Sie einen Bereich, der diesen Sensor enthält."},group:{heading:"Gruppieren",description:"Mit anderen Sensoren gruppieren für kombinierte Auslösung."},device_type:{heading:"Gerätetyp",description:"Wählen Sie einen Gerätetyp, um die entsprechenden Einstellungen automatisch anzuwenden.",choose:{door:{name:"Tür",description:"Eine Tür, ein Tor oder ein anderer Eingang, die/das/der zum Betreten/Verlassen der Wohnung verwendet wird."},window:{name:"Fenster",description:"Ein Fenster oder eine Tür, das/die nicht zum Betreten des Hauses verwendet wird, z. B. ein Balkon."},motion:{name:"Bewegung",description:"Anwesenheitssensor oder ähnliches Gerät mit einer Verzögerung zwischen den Aktivierungen."},tamper:{name:"Sabotagekontakt",description:"Detektor für das Entfernen der Sensorabdeckung, Glasbruchsensor usw."},environmental:{name:"Umwelt",description:"Rauch-/Gassensor, Leckdetektor usw. (nicht im Zusammenhang mit Einbruchschutz)."},other:{name:"Allgemein"}}},always_on:{heading:"Immer aktiv",description:"Der Sensor soll immer den Alarm auslösen."},modes:{heading:"Aktivierte Modi",description:"Alarmmodi, in denen dieser Sensor aktiv ist."},arm_on_close:{heading:"Scharfschalten nach Schließen",description:"Nach der Deaktivierung dieses Sensors wird die verbleibende Ausgangsverzögerung automatisch übersprungen."},use_exit_delay:{heading:"Aktivierungsverzögerung verwenden",description:"Der Sensor darf aktiv sein, wenn die Aktivierungsverzögerung beginnt."},use_entry_delay:{heading:"Auslöseverzögerung verwenden",description:"Die Sensoraktivierung löst den Alarm nach der Auslöseverzögerung aus und nicht direkt."},allow_open:{heading:"Offen bei Scharfschaltung zulassen",description:"Der Zustand OFFEN während der Scharfschaltung wird ignoriert (eine nachfolgende Sensoraktivierung löst den Alarm aus)."},auto_bypass:{heading:"Automatische Umgehung",description:"Diesen Sensor vom Alarm ausschließen, wenn er während des Scharfschaltens offen ist.",modes:"Modi, in denen der Sensor umgangen werden kann"},trigger_unavailable:{heading:"Auslösen, wenn nicht verfügbar",description:"Wenn der Sensorstatus 'nicht verfügbar' wird, wird der Sensor aktiviert."}},actions:{toggle_advanced:"Erweiterte Einstellungen",remove:"Entfernen",setup_groups:"Gruppen einrichten"},errors:{description:"Bitte korrigieren Sie die folgenden Fehler:",no_area:"Es ist kein Bereich ausgewählt",no_modes:"Es sind keine Modi ausgewählt, für die der Sensor aktiv sein sollte",no_auto_bypass_modes:"Es sind keine Modi ausgewählt, für die der Sensor automatisch umgangen werden kann"}}},dialogs:{manage_groups:{title:"Sensorgruppen verwalten",description:"In einer Sensorgruppe müssen mehrere Sensoren innerhalb eines Zeitraums aktiviert werden, bevor der Alarm ausgelöst wird.",no_items:"Noch keine Gruppen",actions:{new_group:"Neue Gruppe"}},create_group:{title:"Neue Sensorgruppe",fields:{name:{heading:"Name",description:"Name der Sensorgruppe"},timeout:{heading:"Time-out",description:"Zeitspanne, in der aufeinanderfolgende Sensoraktivierungen den Alarm auslösen."},event_count:{heading:"Menge",description:"Anzahl verschiedener Sensoren, die aktiviert werden müssen, um den Alarm auszulösen."},sensors:{heading:"Sensoren",description:"Wählen Sie die Sensoren aus, die in dieser Gruppe enthalten sind."}},errors:{invalid_name:"Ungültiger Name angegeben.",insufficient_sensors:"Es müssen mindestens 2 Sensoren ausgewählt werden."}},edit_group:{title:"Sensorgruppe ''{name}'' bearbeiten"}}},codes:{title:"Codes",cards:{codes:{description:"Einstellungen für den Code ändern.",fields:{code_arm_required:{heading:"Scharfschalt-Code verwenden",description:"Scharfschaltung erfordert einen Code"},code_disarm_required:{heading:"Entschärfungscode verwenden",description:"Unscharfschaltung erfordert einen Code"},code_mode_change_required:{heading:"Code verwenden zum Umschalten des Modus",description:"Um den aktiven Scharfschaltmodus zu ändern, ist ein gültiger Code erforderlich."},code_format:{heading:"Code-Format",description:"Legt den Eingabetyp für die Lovelace-Alarmkarte fest.",code_format_number:"Pincode",code_format_text:"Passwort"}}},user_management:{title:"Benutzerverwaltung",description:"Jeder Benutzer hat seinen eigenen Code zum Scharf-/Unscharfschalten des Alarms.",no_items:"Es sind noch keine Benutzer vorhanden",actions:{new_user:"neuer Benutzer"}},new_user:{title:"Neuen Benutzer anlegen",description:"Es können Benutzer angelegt werden, die Zugriff auf die Bedienung des Alarms haben.",fields:{name:{heading:"Name",description:"Name des Benutzers."},code:{heading:"Code",description:"Code für diesen Benutzer."},confirm_code:{heading:"Code wiederholen",description:"Geben Sie den Code erneut ein."},can_arm:{heading:"Code für Scharfschaltung zulassen",description:"Durch Eingabe dieses Codes wird der Alarm aktiviert"},can_disarm:{heading:"Code zur Entschärfung zulassen",description:"Durch Eingabe dieses Codes wird der Alarm deaktiviert"},is_override_code:{heading:"Ist Übersteuerungs-Code",description:"Die Eingabe dieses Codes schaltet den Alarm zwangsweise scharf"},area_limit:{heading:"Eingeschränkte Bereiche",description:"Beschränkung der Kontrolle des Benutzers auf die ausgewählten Bereiche"}},errors:{no_name:"Kein Name angegeben.",no_code:"Der Code sollte mindestens 4 Zeichen/Zahlen enthalten.",code_mismatch:"Die Codes stimmen nicht überein."}},edit_user:{title:"Nutzer bearbeiten",description:"Ändere die Konfiguration für den Nutzer ''{name}''.",fields:{old_code:{heading:"Aktueller Code",description:"Aktueller Code (leer lassen, um Code nicht zu ändern)."}}}}},actions:{title:"Aktionen",cards:{notifications:{title:"Benachrichtigungen",description:"Mit diesem Panel können Sie Benachrichtigungen verwalten, die beim Auftreten eines bestimmten Alarmereignisses gesendet werden.",table:{no_items:"Es sind noch keine Benachrichtigungen erstellt worden.",no_area_warning:"Die Aktion ist keinem Bereich zugeordnet."},actions:{new_notification:"neue Benachrichtigung"}},actions:{description:"Dieses Panel kann verwendet werden, um ein Gerät zu schalten, wenn sich der Alarmzustand ändert.",table:{no_items:"Es sind noch keine Aktionen erstellt worden."},actions:{new_action:"neue Aktion"}},new_notification:{title:"Benachrichtigung konfigurieren",description:"Erhalten Sie eine Benachrichtigung beim Scharf-/Unscharfschalten des Alarms, bei Aktivierung usw.",trigger:"Bedingung",action:"Aktion",options:"Optionen",fields:{event:{heading:"Ereignis",description:"Wann soll die Benachrichtigung gesendet werden",choose:{armed:{name:"Alarm ist scharf",description:"Der Alarm wurde erfolgreich scharfgeschaltet"},disarmed:{name:"Alarm ist unscharf",description:"Der Alarm wurde unscharf"},triggered:{name:"Alarm ist ausgelöst",description:"Der Alarm wurde ausgelöst"},untriggered:{name:"Alarm ist nicht mehr ausgelöst",description:"Der ausgelöste Zustand des Alarms ist beendet"},arm_failure:{name:"Scharfschaltung fehlgeschlagen",description:"Die Scharfschaltung des Alarms ist aufgrund eines oder mehrerer offener Sensoren fehlgeschlagen"},arming:{name:"Aktivierungsverzögerung gestartet",description:"Aktivierungsverzögerung ist gestartet, bereit, das Haus zu verlassen."},pending:{name:"Auslöseverzögerung gestartet",description:"Auslöseverzögerung ist gestartet, der Alarm wird bald ausgelöst."}}},mode:{heading:"Modus",description:"Beschränkung der Aktion auf bestimmte Alarm-Modi (optional)"},title:{heading:"Titel",description:"Titel für die Benachrichtigungsmeldung"},message:{heading:"Nachricht",description:"Inhalt der Benachrichtigungsmeldung",insert_wildcard:"Platzhalter einfügen",placeholders:{armed:"Der Alarm ist auf {{arm_mode}} eingestellt",disarmed:"Der Alarm ist jetzt AUS",triggered:"Der Alarm wurde ausgelöst! Ursache: {{open_sensors}}.",untriggered:"Der Alarm ist nicht mehr ausgelöst.",arm_failure:"Der Alarm konnte im Moment nicht scharfgeschaltet werden, aufgrund von: {{open_sensors}}.",arming:"Der Alarm wird bald scharf geschaltet, bitte verlassen Sie das Haus.",pending:"Der Alarm wird in Kürze ausgelöst, bitte entschärfen Sie ihn schnell!"}},open_sensors_format:{heading:"Format für open_sensors Platzhalter",description:"Wählen Sie, welche Sensorinformationen in die Nachricht eingefügt werden",options:{default:"Namen und Zustände",short:"Nur Namen"}},arm_mode_format:{heading:"Übersetzung für arm_mode Platzhalter",description:"Wählen Sie, in welcher Sprache der Scharfschaltungsmodus in die Nachricht eingefügt wird"},target:{heading:"Ziel",description:"Gerät, an das die Benachrichtigung gesendet werden soll"},name:{heading:"Name",description:"Beschreibung für diese Meldung",placeholders:{armed:"Benachrichtigt {target} beim Scharfschalten",disarmed:"Benachrichtigt {target} beim Entschärfen",triggered:"Benachrichtigt {target} bei Auslösung",untriggered:"Benachrichtigt {target}, wenn Auslösung beendet",arm_failure:"Benachrichtigt {target}, wenn Scharfschaltung nicht möglich",arming:"Benachrichtigt {target} bei Beginn Aktivierungsverzögerung",pending:"Benachrichtigt {target} bei Beginn Auslöseverzögerung"}},delete:{heading:"Automatisierung löschen",description:"Diese Automatisierung dauerhaft entfernen"}},actions:{test:"Testen"}},new_action:{title:"Aktion konfigurieren",description:"Schaltet Lichter oder Geräte (z. B. Sirenen) beim Scharf-/Unscharfschalten des Alarms, bei Aktivierung usw.",fields:{event:{heading:"Ereignis",description:"Wann soll die Aktion ausgeführt werden"},area:{heading:"Bereich",description:"Bereich, für den das Ereignis gilt."},mode:{heading:"Modus",description:"Beschränkung der Aktion auf bestimmte Alarm-Modi (optional)"},entity:{heading:"Entität",description:"Entität, für die eine Aktion durchgeführt werden soll"},action:{heading:"Aktion",description:"Aktion, die mit der Entität durchgeführt werden soll",no_common_actions:"Aktionen können nur im YAML-Modus für die ausgewählten Entitäten zugewiesen werden."},name:{heading:"Name",description:"Beschreibung für diese Aktion",placeholders:{armed:"Setzt {entity} beim Scharfschalten auf {state}",disarmed:"Setzt {entity} bei Entschärfung auf {state}",triggered:"Setzt {entity} bei Auslösung auf {state}",untriggered:"Setzt {entity} auf {state}, wenn die Auslösung endet",arm_failure:"Setzt {entity} im Fehlerfall auf {state}",arming:"Setzt {entity} bei Beginn Aktivierungsverzögerung auf {state}",pending:"Setzt {entity} bei Beginn Auslöseverzögerung auf {state}"}}}}}}},Dt={common:Ct,components:Mt,title:"Alarm Panel",panels:Nt},Lt=Object.freeze({__proto__:null,common:Ct,components:Mt,title:"Alarm Panel",panels:Nt,default:Dt}),Pt={modes_short:{armed_away:"Away",armed_home:"Home",armed_night:"Night",armed_custom_bypass:"Custom",armed_vacation:"Vacation"},enabled:"Enabled",disabled:"Disabled"},Ht={time_slider:{seconds:"sec",minutes:"min",infinite:"infinite",none:"none"},editor:{ui_mode:"To UI",yaml_mode:"To YAML",edit_in_yaml:"Edit in YAML"},table:{filter:{label:"Filter items",item:"Filter by {name}",hidden_items:"{number} {number, plural,\n  one {item is}\n  other {items are}\n} hidden"}}},Bt={general:{title:"General",cards:{general:{description:"This panel defines some global settings for the alarm.",fields:{disarm_after_trigger:{heading:"Disarm after trigger",description:"After trigger time has expired, disarm the alarm instead of returning to armed state."},enable_mqtt:{heading:"Enable MQTT",description:"Allow the alarm panel to be controlled through MQTT."},enable_master:{heading:"Enable alarm master",description:"Creates an entity for controlling all areas simultaneously."}},actions:{setup_mqtt:"MQTT Configuration",setup_master:"Master Configuration"}},modes:{title:"Modes",description:"This panel can be used to set up the arm modes of the alarm.",modes:{armed_away:"Armed away will be used when all people left the house. All doors and windows allowing access to the house will be guarded, as well as motion sensors inside the house.",armed_home:"Armed home (also known as armed stay) will be used when setting the alarm while people are in the house. All doors and windows allowing access to the house will be guarded, but not motion sensors inside the house.",armed_night:"Armed night will be used when setting the alarm before going to sleep. All doors and windows allowing access to the house will be guarded, and selected motion sensors (downstairs) in the house.",armed_vacation:"Armed vacation can be used as an extension to the armed away mode in case of absence for longer duration. The delay times and trigger responses can be adapted (as desired) to being distant from home.",armed_custom_bypass:"An extra mode for defining your own security perimeter."},number_sensors_active:"{number} {number, plural,\n  one {sensor}\n  other {sensors}\n} active",fields:{status:{heading:"Status",description:"Controls whether the alarm can be armed in this mode."},exit_delay:{heading:"Exit delay",description:"When arming the alarm, within this time period the sensors will not trigger the alarm yet."},entry_delay:{heading:"Entry delay",description:"Delay time until the alarm is triggered after one of the sensors is activated."},trigger_time:{heading:"Trigger time",description:"Time during which the alarm will remain in the triggered state after activation."}}},mqtt:{title:"MQTT configuration",description:"This panel can be used for configuration of the MQTT interface.",fields:{state_topic:{heading:"State topic",description:"Topic on which state updates are published"},event_topic:{heading:"Event topic",description:"Topic on which alarm events are published"},command_topic:{heading:"Command topic",description:"Topic which Alarmo listens to for arm/disarm commands."},require_code:{heading:"Require code",description:"Require the code to be sent with the command."},state_payload:{heading:"Configure payload per state",item:"Define a payload for state ''{state}''"},command_payload:{heading:"Configure payload per command",item:"Define a payload for command ''{command}''"}}},areas:{title:"Areas",description:"Areas can be used for dividing your alarm system into multiple compartments.",no_items:"There are no areas defined yet.",table:{remarks:"Remarks",summary:"This area contains {summary_sensors} and {summary_automations}.",summary_sensors:"{number} {number, plural,\n  one {sensor}\n  other {sensors}\n}",summary_automations:"{number} {number, plural,\n  one {automation}\n  other {automations}\n}"},actions:{add:"Add"}}},dialogs:{create_area:{title:"New area",fields:{copy_from:"Copy settings from"}},edit_area:{title:"Editing area ''{area}''",name_warning:"Note: changing the name will change the entity ID"},remove_area:{title:"Remove area?",description:"Are you sure you want to remove this area? This area contains {sensors} sensors and {automations} automations, which will be removed as well."},edit_master:{title:"Master configuration"},disable_master:{title:"Disable master?",description:"Are you sure you want to remove the alarm master? This area contains {automations} automations, which will be removed with this action."}}},sensors:{title:"Sensors",cards:{sensors:{description:"Currently configured sensors. Click on an item to make changes.",table:{no_items:"There are no sensors to be displayed here.",no_area_warning:"Sensor is not assigned to any area.",arm_modes:"Arm Modes",always_on:"(Always)"}},add_sensors:{title:"Add Sensors",description:"Add more sensors. Make sure that your sensors have a suitable name, so you can identify them.",no_items:"There are no available HA entities that can be configured for the alarm. Make sure to include entities of the type binary_sensor.",table:{type:"Detected type"},actions:{add_to_alarm:"add to alarm",filter_supported:"Hide items with unknown type"}},editor:{title:"Edit Sensor",description:"Configuring the sensor settings of ''{entity}''.",fields:{entity:{heading:"Entity",description:"Entity associated with this sensor"},area:{heading:"Area",description:"Select an area which contains this sensor."},group:{heading:"Group",description:"Group with other sensors for combined triggering."},device_type:{heading:"Device Type",description:"Choose a device type to automatically apply appropriate settings.",choose:{door:{name:"Door",description:"A door, gate or other entrance that is used for entering/leaving the home."},window:{name:"Window",description:"A window, or a door not used for entering the house such as balcony."},motion:{name:"Motion",description:"Presence sensor or similar device having a delay between activations."},tamper:{name:"Tamper",description:"Detector of sensor cover removal, glass break sensor, etc."},environmental:{name:"Environmental",description:"Smoke/gas sensor, leak detector, etc. (not related to burglar protection)."},other:{name:"Generic"}}},always_on:{heading:"Always on",description:"Sensor should always trigger the alarm."},modes:{heading:"Enabled modes",description:"Alarm modes in which this sensor is active."},arm_on_close:{heading:"Arm after closing",description:"After deactivation of this sensor, the remaining exit delay will automatically be skipped."},use_exit_delay:{heading:"Use exit delay",description:"Sensor is allowed to be active when the exit delay starts."},use_entry_delay:{heading:"Use entry delay",description:"Sensor activation triggers the alarm after the entry delay rather than directly."},allow_open:{heading:"Allow open initially",description:"Open state while arming is ignored (subsequent sensor activation will trigger alarm)."},auto_bypass:{heading:"Bypass automatically",description:"Exclude this sensor from the alarm if it is open while arming.",modes:"Modes in which sensor may be bypassed"},trigger_unavailable:{heading:"Trigger when unavailable",description:"When the sensor state becomes 'unavailable', this will activate the sensor."}},actions:{toggle_advanced:"Advanced settings",remove:"Remove",setup_groups:"Setup groups"},errors:{description:"Please correct the following errors:",no_area:"No area is selected",no_modes:"No modes are selected for which the sensor should be active",no_auto_bypass_modes:"No modes are selected for the sensor may be automatically bypassed"}}},dialogs:{manage_groups:{title:"Manage sensor groups",description:"In a sensor group multiple sensors must be activated within a time period before the alarm is triggered.",no_items:"No groups yet",actions:{new_group:"New group"}},create_group:{title:"New sensor group",fields:{name:{heading:"Name",description:"Name for sensor group"},timeout:{heading:"Time-out",description:"Time period during which consecutive sensor activations triggers the alarm."},event_count:{heading:"Count",description:"Amount of different sensors that need to be activated to trigger the alarm."},sensors:{heading:"Sensors",description:"Select the sensors which are contained by this group."}},errors:{invalid_name:"Invalid name provided.",insufficient_sensors:"At least 2 sensors need to be selected."}},edit_group:{title:"Edit sensor group ''{name}''"}}},codes:{title:"Codes",cards:{codes:{description:"Change settings for the code.",fields:{code_arm_required:{heading:"Require code for arming",description:"A valid code must be provided to arm the alarm."},code_disarm_required:{heading:"Require code for disarming",description:"A valid code must be provided to disarm the alarm."},code_mode_change_required:{heading:"Require code for switching mode",description:"A valid code must be provided to change the arm mode which is active."},code_format:{heading:"Code format",description:"Sets the input type for Lovelace alarm card.",code_format_number:"pincode",code_format_text:"password"}}},user_management:{title:"User management",description:"Each user has its own code to arm/disarm the alarm.",no_items:"There are no users yet",actions:{new_user:"new user"}},new_user:{title:"Create new user",description:"Users can be created for providing access to operating the alarm.",fields:{name:{heading:"Name",description:"Name of the user."},code:{heading:"Code",description:"Code for this user."},confirm_code:{heading:"Confirm code",description:"Repeat the code."},can_arm:{heading:"Allow code for arming",description:"Entering this code activates the alarm"},can_disarm:{heading:"Allow code for disarming",description:"Entering this code deactivates the alarm"},is_override_code:{heading:"Is override code",description:"Entering this code will arm the alarm in force"},area_limit:{heading:"Restricted areas",description:"Limit user to control only the selected areas"}},errors:{no_name:"No name provided.",no_code:"Code should have 4 characters/numbers minimum.",code_mismatch:"The codes don't match."}},edit_user:{title:"Edit User",description:"Change configuration for user ''{name}''.",fields:{old_code:{heading:"Current code",description:"Current code, leave empty to leave unchanged."}}}}},actions:{title:"Actions",cards:{notifications:{title:"Notifications",description:"Using this panel, you can manage notifications to be sent when a certain alarm event occurs.",table:{no_items:"There are no notifications created yet.",no_area_warning:"Action is not assigned to any area."},actions:{new_notification:"new notification"}},actions:{description:"This panel can be used to switch a device when the alarm state changes.",table:{no_items:"There are no actions created yet."},actions:{new_action:"new action"}},new_notification:{title:"Configure notification",description:"Receive a notification when arming/disarming the alarm, on activation, etc.",trigger:"Condition",action:"Task",options:"Options",fields:{event:{heading:"Event",description:"When should the notification be sent",choose:{armed:{name:"Alarm is armed",description:"The alarm is succesfully armed"},disarmed:{name:"Alarm is disarmed",description:"The alarm is disarmed"},triggered:{name:"Alarm is triggered",description:"The alarm is triggered"},untriggered:{name:"Alarm no longer triggered",description:"The triggered state of the alarm has ended"},arm_failure:{name:"Failed to arm",description:"The arming of the alarm failed due to one or more open sensors"},arming:{name:"Exit delay started",description:"Exit delay started, ready to leave the house."},pending:{name:"Entry delay started",description:"Entry delay started, the alarm will trigger soon."}}},mode:{heading:"Mode",description:"Limit the action to specific arm modes (optional)"},title:{heading:"Title",description:"Title for the notification message"},message:{heading:"Message",description:"Content of the notification message",insert_wildcard:"Insert wildcard",placeholders:{armed:"The alarm is set to {{arm_mode}}",disarmed:"The alarm is now OFF",triggered:"The alarm is triggered! Cause: {{open_sensors}}.",untriggered:"The alarm is no longer triggered.",arm_failure:"The alarm could not be armed right now, due to: {{open_sensors}}.",arming:"The alarm will be armed soon, please leave the house.",pending:"The alarm is about to trigger, disarm it quickly!"}},open_sensors_format:{heading:"Format for open_sensors wildcard",description:"Choose which sensor information is inserted in the message",options:{default:"Names and states",short:"Names only"}},arm_mode_format:{heading:"Translation for arm_mode wildcard",description:"Choose in which language the arm mode is inserted in the message"},target:{heading:"Target",description:"Device to send the notification to"},name:{heading:"Name",description:"Description for this notification",placeholders:{armed:"Notify {target} upon arming",disarmed:"Notify {target} upon disarming",triggered:"Notify {target} when triggered",untriggered:"Notify {target} when triggering stops",arm_failure:"Notify {target} on failure",arming:"Notify {target} when leaving",pending:"Notify {target} when arriving"}},delete:{heading:"Delete automation",description:"Permanently remove this automation"}},actions:{test:"Try it"}},new_action:{title:"Configure action",description:"Switch lights or devices (such as sirens) when arming/disarming the alarm, on activation, etc.",fields:{event:{heading:"Event",description:"When should the action be executed"},area:{heading:"Area",description:"Alarm area for which the event applies."},mode:{heading:"Mode",description:"Limit the action to specific arm modes (optional)"},entity:{heading:"Entity",description:"Entity to perform action on"},action:{heading:"Action",description:"Action to perform on the entity",no_common_actions:"Actions can only be assigned in YAML mode for the selected entities."},name:{heading:"Name",description:"Description for this action",placeholders:{armed:"Set {entity} to {state} upon arming",disarmed:"Set {entity} to {state} upon disarming",triggered:"Set {entity} to {state} when triggered",untriggered:"Set {entity} to {state} when triggering stops",arm_failure:"Set {entity} to {state} on failure",arming:"Set {entity} to {state} when leaving",pending:"Set {entity} to {state} when arriving"}}}}}}},qt={common:Pt,components:Ht,title:"Alarm panel",panels:Bt},It=Object.freeze({__proto__:null,common:Pt,components:Ht,title:"Alarm panel",panels:Bt,default:qt}),Ut={modes_short:{armed_away:"Ausente",armed_home:"En casa",armed_night:"Nocturno",armed_custom_bypass:"Personalizado",armed_vacation:"Vacaciones"},enabled:"Habilitar",disabled:"Deshabilitar"},Rt={time_slider:{seconds:"seg",minutes:"min",infinite:"infinito",none:"ninguno"},editor:{ui_mode:"Editar en la UI",yaml_mode:"Editar en YAML",edit_in_yaml:"Editar en YAML"},table:{filter:{label:"Filtrar entidades",item:"Filtrar por {name}",hidden_items:"{number} {number, plural,\n  one {entidas está}\n  other {entidades están}\n} oculta"}}},Vt={general:{title:"General",cards:{general:{description:"Este panel define algunos ajustes globales para la alarma.",fields:{disarm_after_trigger:{heading:"Desarmar después de disparar",description:"Una vez transcurrido el tiempo de activación, desactivar la alarma en lugar de volver al estado de armada."},enable_mqtt:{heading:"Habilitar MQTT",description:"Permitir que el panel de alarma se controle a través de MQTT."},enable_master:{heading:"Habilitar alarma maestra",description:"Crea una entidad para controlar todas las áreas simultáneamente."}},actions:{setup_mqtt:"Configuración MQTT",setup_master:"Configuración maestra"}},modes:{title:"Modos",description:"Este panel se puede utilizar para configurar los modos de armado de la alarma.",modes:{armed_away:"Armado ausente se utilizará cuando todas las personas salgan de la casa. Todas las puertas y ventanas que permitan el acceso a la casa estarán vigiladas, así como los sensores de movimiento dentro de la casa.",armed_home:"Armado en casa (también conocido como estancia armada) se utilizará cuando se active la alarma mientras haya personas en la casa. Todas las puertas y ventanas que permitan el acceso a la casa estarán protegidas, pero no los sensores de movimiento dentro de la casa.",armed_night:"Armado nocturno se usará al configurar la alarma antes de irse a dormir. Todas las puertas y ventanas que permitan el acceso a la casa estarán resguardadas y se seleccionarán sensores de movimiento en la casa.",armed_vacation:"Armado en vacaciones se puede usar como una extensión del modo armado ausente en caso de ausencia de mayor duración. Los tiempos de retardo y las respuestas de activación se pueden adaptar (como se desee) a estar lejos de casa.",armed_custom_bypass:"Un modo adicional para definir su propio perímetro de seguridad."},number_sensors_active:"{number} {number, plural,\n  one {sensor}\n  other {sensores}\n} activo",fields:{status:{heading:"Estado",description:"Controla si la alarma se puede armar en este modo."},exit_delay:{heading:"Retardo de salida",description:"Al armar la alarma, dentro de este período de tiempo, los sensores aún no dispararán la alarma."},entry_delay:{heading:"Retardo de entrada",description:"Tiempo de retardo hasta que se activa la alarma después de que se active alguno de los sensores."},trigger_time:{heading:"Tiempo de activación",description:"Tiempo durante el cual sonará la sirena."}}},mqtt:{title:"Configuración MQTT",description:"Este panel se puede utilizar para configurar la interfaz MQTT.",fields:{state_topic:{heading:"Tema del estado",description:"Tema sobre el que se publican las actualizaciones de estado."},event_topic:{heading:"Tema del evento",description:"Tema sobre el que se publican los eventos de alarma."},command_topic:{heading:"Tema del comando",description:"Tema sobre el que se envían los comandos de armado / desarmado."},require_code:{heading:"Requerir código",description:"Requiere que el código se envíe con el comando."},state_payload:{heading:"Configurar la carga útil por estado",item:"Defina una carga útil para el estado ''{state}''"},command_payload:{heading:"Configurar la carga útil por comando",item:"Defina una carga útil para el comando ''{command}''"}}},areas:{title:"Áreas",description:"Las áreas se pueden utilizar para dividir su sistema de alarma en varios compartimentos.",no_items:"Aún no hay áreas definidas.",table:{remarks:"Comentarios",summary:"Esta área contiene {summary_sensors} y {summary_automations}.",summary_sensors:"{number} {number, plural,\n  one {sensor}\n  other {sensores}\n}",summary_automations:"{number} {number, plural,\n  one {automatizacion}\n  other {automatizaciones}\n}"},actions:{add:"Agregar"}}},dialogs:{create_area:{title:"Nueva área",fields:{copy_from:"Copiar la configuración de"}},edit_area:{title:"Editando área ''{area}''",name_warning:"Nota: cambiar el nombre cambiará el ID de la entidad."},remove_area:{title:"¿Eliminar área?",description:"¿Está seguro de que desea eliminar esta área? Esta área contiene {sensors} sensores y {automations} automatizaciones que también se eliminarán."},edit_master:{title:"Configuración maestra"},disable_master:{title:"¿Deshabilitar maestro?",description:"¿Está seguro de que desea eliminar la alarma maestra? Esta área contiene {sensors} sensores y {automations} automatizaciones que también se eliminarán."}}},sensors:{title:"Sensores",cards:{sensors:{description:"Sensores configurados actualmente. Haga clic en una entidad para realizar cambios.",table:{no_items:"No hay sensores para mostrar aquí.",no_area_warning:"El sensor no está asignado a ningún área.",arm_modes:"Modos de armado",always_on:"(Siempre)"}},add_sensors:{title:"Agregar sensores",description:"Agrega más sensores. Asegúrate de que tus sensores tengan un nombre amigable, para que puedas identificarlos.",no_items:"No hay entidades HA disponibles que se puedan configurar para la alarma. Asegúrese de incluir entidades del tipo sensor binario.",table:{type:"Tipo detectado"},actions:{add_to_alarm:"agregar a la alarma",filter_supported:"Ocultar elementos con tipo desconocido"}},editor:{title:"Editar sensor",description:"Configurando los ajustes del sensor de ''{entity}''.",fields:{entity:{heading:"Entidad",description:"Entidad asociada a este sensor"},area:{heading:"Área",description:"Seleccione un área que contenga este sensor."},group:{heading:"Grupo",description:"Agrupar con otros sensores para un disparado combinado."},device_type:{heading:"Tipo de dispositivo",description:"Elija un tipo de dispositivo para aplicar automáticamente la configuración adecuada.",choose:{door:{name:"Puerta",description:"Una puerta, portón u otra entrada que se utilice para entrar / salir de la casa."},window:{name:"Ventana",description:"Una ventana o una puerta que no se use para entrar a la casa, como un balcón."},motion:{name:"Movimiento",description:"Sensor de presencia o dispositivo similar que tiene un retardo entre activaciones."},tamper:{name:"Sabotaje",description:"Detector de extracción de la cubierta del sensor, sensor de rotura de vidrio, etc."},environmental:{name:"Medioambiental",description:"Sensor de humo / gas, detector de fugas, etc. (no relacionado con la protección antirrobo)."},other:{name:"Genérico"}}},always_on:{heading:"Siempre encendido",description:"El sensor siempre debe activar la alarma."},modes:{heading:"Modos habilitados",description:"Modos de alarma en los que este sensor está activo."},arm_on_close:{heading:"Armar después de cerrar",description:"Después de la desactivación de este sensor, se saltará automáticamente el retardo de salida restante."},use_exit_delay:{heading:"Usar retardo de salida",description:"Se permite que el sensor esté activo cuando comienza el retardo de salida."},use_entry_delay:{heading:"Usar retardo de entrada",description:"La activación del sensor activa la alarma después del retardo de entrada en lugar de directamente."},allow_open:{heading:"Permitir abrir mientras se arma",description:"Si el sensor aún está activo después del retardo de salida, esto no hará que falle el armado."},auto_bypass:{heading:"Omitir automáticamente",description:"Excluya este sensor de la alarma si está abierto mientras se arma.",modes:"Modos en los que se puede omitir el sensor"},trigger_unavailable:{heading:"Activar cuando no esté disponible",description:"Cuando el estado del sensor se vuelve 'no disponible', esto activará el sensor."}},actions:{toggle_advanced:"Configuración avanzada",remove:"Eliminar",setup_groups:"Configurar grupos"},errors:{description:"Por favor, corrija los siguientes errores:",no_area:"No se ha seleccionado ninguna área",no_modes:"No se han seleccionados modos para los que el sensor deba estar activo",no_auto_bypass_modes:"No se han seleccionados modos para los que el sensor pueda ser omitido"}}},dialogs:{manage_groups:{title:"Administrar grupos de sensores",description:"En un grupo de sensores, se deben activar varios sensores dentro de un período de tiempo antes de que se dispare la alarma.",no_items:"Todavía no hay grupos",actions:{new_group:"Nuevo grupo"}},create_group:{title:"Nuevo grupo de sensores",fields:{name:{heading:"Nombre",description:"Nombre del grupo de sensores"},timeout:{heading:"Tiempo muerto",description:"Período de tiempo durante el cual las activaciones consecutivas del sensor activan la alarma."},event_count:{heading:"Nombre",description:"Cantidad de sensores diferentes que deben activarse para activar la alarma."},sensors:{heading:"Sensores",description:"Seleccione los sensores que están contenidos en este grupo."}},errors:{invalid_name:"Nombre proporcionado no válido.",insufficient_sensors:"Se deben seleccionar al menos 2 sensores."}},edit_group:{title:"Editar grupo de sensores '{name}'"}}},codes:{title:"Códigos",cards:{codes:{description:"Cambiar la configuración del código.",fields:{code_arm_required:{heading:"Usar código de armado",description:"Requiere un código para armar la alarma."},code_disarm_required:{heading:"Usar código de desarmado",description:"Requiere un código para desarmar la alarma."},code_mode_change_required:{heading:"Requerir código para cambiar de modo",description:"Se necesita un código válido para cambiar el modo de armado que está activo."},code_format:{heading:"Formato del código",description:"Establece el tipo de entrada para la tarjeta de la alarma.",code_format_number:"código PIN",code_format_text:"contraseña"}}},user_management:{title:"Gestión de usuarios",description:"Cada usuario tiene su propio código para armar / desarmar la alarma.",no_items:"Aún no hay usuarios",actions:{new_user:"nuevo usuario"}},new_user:{title:"Crear nuevo usuario",description:"Se pueden crear usuarios para proporcionar acceso a la operación de la alarma.",fields:{name:{heading:"Nombre",description:"Nombre del usuario."},code:{heading:"Código",description:"Código para este usuario."},confirm_code:{heading:"Confirmar código",description:"Repite el código."},can_arm:{heading:"Permitir código para armar",description:"Al ingresar este código se activa la alarma."},can_disarm:{heading:"Permitir código para desarmar",description:"Al ingresar este código se desactiva la alarma."},is_override_code:{heading:"Es un código de anulación",description:"Al ingresar este código se forzará el armado de la alarma."},area_limit:{heading:"Áreas restringidas",description:"Limitar al usuario a controlar solo las áreas seleccionadas"}},errors:{no_name:"No se proporcionó ningún nombre.",no_code:"El código debe tener 4 caracteres / números como mínimo.",code_mismatch:"Los códigos no coinciden."}},edit_user:{title:"Editar usuario",description:"Cambiar la configuración del usuario ''{name}''.",fields:{old_code:{heading:"Código actual",description:"Código actual, déjelo en blanco para no modificarlo."}}}}},actions:{title:"Acciones",cards:{notifications:{title:"Notificaciones",description:"Usando este panel, puede administrar las notificaciones que se enviarán durante un evento de alarma determinado.",table:{no_items:"Aún no se han creado notificaciones.",no_area_warning:"La acción no está asignada a ningún área."},actions:{new_notification:"nueva notificación"}},actions:{description:"Este panel se puede utilizar para cambiar un dispositivo cuando cambia el estado de alarma.",table:{no_items:"Aún no se han creado acciones."},actions:{new_action:"nueva acción"}},new_notification:{title:"Crear notificación",description:"Crear una nueva notificación.",trigger:"Condición",action:"Tarea",options:"Opciones",fields:{event:{heading:"Evento",description:"Cuándo debe enviarse la notificación.",choose:{armed:{name:"La alarma está armada",description:"La alarma está correctamente armada."},disarmed:{name:"La alarma está desarmada",description:"La alarma está desarmada."},triggered:{name:"Se ha disparado la alarma",description:"La alarma se ha disparado."},untriggered:{name:"Alarm not longer triggered",description:"The triggered state of the alarm has ended"},arm_failure:{name:"No se pudo armar",description:"El armado de la alarma falló debido a uno o más sensores abiertos."},arming:{name:"Se ha iniciado el retardo de salida",description:"Se ha iniciado el retardo de salida, listo para salir de la casa."},pending:{name:"Se ha iniciado el retardo de entrada",description:"Se ha iniciado el retardo de entrada, la alarma se disparará pronto."}}},mode:{heading:"Modo",description:"Limita la acción a modos de armado específicos (opcional)."},title:{heading:"Título",description:"Título del mensaje de notificación."},message:{heading:"Mensaje",description:"Contenido del mensaje de notificación.",insert_wildcard:"Insertar comodín",placeholders:{armed:"La alarma está configurada en {{arm_mode}}",disarmed:"Ahora la alarma está APAGADA",triggered:"¡Se ha disparado la alarma! Causa: {{open_sensors}}.",untriggered:"The alarm is not longer triggered.",arm_failure:"No se pudo armar la alarma en este momento debido a: {{open_sensors}}.",arming:"Se armará pronto la alarma, por favor, salga de la casa.",pending:"¡La alarma está a punto de dispararse, desarme rápidamente!"}},open_sensors_format:{heading:"Formato para el comodín open_sensors",description:"Elija qué información del sensor se inserta en el mensaje",options:{default:"Nombres y estados",short:"Solo nombres"}},arm_mode_format:{heading:"Traducción del comodín arm_mode",description:"Elija en qué idioma se inserta el modo de armado en el mensaje"},target:{heading:"Objetivo",description:"Dispositivo al que enviar el mensaje push."},name:{heading:"Nombre",description:"Descripción de esta notificación.",placeholders:{armed:"Notificar a {target} al armar",disarmed:"Notificar a {target} al desarmar",triggered:"Notificar a {target} cuando se dispare",untriggered:"Notify {target} when triggering stops",arm_failure:"Notificar a {target} si falla",arming:"Notificar a {target} cuando se vaya",pending:"Notificar a {target} cuando llegue"}},delete:{heading:"Eliminar automatización",description:"Eliminar esta automatización de forma permanente"}},actions:{test:"Pruébelo"}},new_action:{title:"Crear acción",description:"Este panel se puede utilizar para cambiar un dispositivo cuando cambia el estado de la alarma.",fields:{event:{heading:"Evento",description:"¿Cuándo debe ejecutarse la acción?"},area:{heading:"Área",description:"Área para la que se aplica el evento."},mode:{heading:"Modo",description:"Limita la acción a modos de armado específicos (opcional)"},entity:{heading:"Entidad",description:"Entidad sobre la que realizar la acción."},action:{heading:"Acción",description:"Acción a realizar en la entidad.",no_common_actions:"Las acciones solo se pueden asignar en modo YAML para las entidades seleccionadas."},name:{heading:"Nombre",description:"Descripción de esta acción.",placeholders:{armed:"Establecer {entity} en {state} al armar",disarmed:"Establecer {entity} en {state} al desarmar",triggered:"Establecer {entity} en {state} cuando se dispare",untriggered:"Set {entity} to {state} when triggering stops",arm_failure:"Establecer {entity} en {state} si falla",arming:"Establecer {entity} en {state} cuando se vaya",pending:"Establecer {entity} en {state} cuando llegue"}}}}}}},Gt={common:Ut,components:Rt,title:"Panel de alarma",panels:Vt},Ft=Object.freeze({__proto__:null,common:Ut,components:Rt,title:"Panel de alarma",panels:Vt,default:Gt}),Kt={modes_short:{armed_away:"Eemal",armed_home:"Kodus",armed_night:"Ööseks",armed_custom_bypass:"Valikuline",armed_vacation:"Vacation"},enabled:"Lubatud",disabled:"Keelatud"},Zt={time_slider:{seconds:"sek",minutes:"min",infinite:"piiranguta",none:"puudub"},editor:{ui_mode:"Kasutajaliides",yaml_mode:"Koodiredaktor",edit_in_yaml:"Edit in YAML"},table:{filter:{label:"Filter items",item:"Filter by {name}",hidden_items:"{number} {number, plural,\n  one {item is}\n  other {items are}\n} hidden"}}},Qt={general:{title:"Üldsätted",cards:{general:{description:"Need seaded kehtivad kõikides valve olekutes.",fields:{disarm_after_trigger:{heading:"Häire summutamine",description:"Peale häire lõppu võta valvest maha miite ära valvesta uuesti."},enable_mqtt:{heading:"Luba MQTT juhtimine",description:"Luba nupustiku juhtimist MQTT abil."},enable_master:{heading:"Luba põhivalvestus",description:"Loob olemi mis haldab kõiki valvestamise alasid korraga."}},actions:{setup_mqtt:"MQTT seadistamine",setup_master:"Põhivalvestuse sätted"}},modes:{title:"Režiimid",description:"Selles vaates seadistatakse valvestamise režiime.",modes:{armed_away:"Täielik valvestamine kui kedagi pole kodus. Kasutusel on kõik andurid.",armed_home:"Valvestatud kodus ei kasuta liikumisandureid kuid väisuksed ja aknad on valve all.",armed_night:"Valvestatud ööseks ei kasuta määratud liikumisandureid, välisperimeeter on valve all.",armed_vacation:"Armed vacation can be used as an extension to the armed away mode in case of absence for longer duration. The delay times and trigger responses can be adapted (as desired) to being distant from home.",armed_custom_bypass:"Valikulise valvestuse puhul saab määrata kasutatavad andurid."},number_sensors_active:"{number} {number, plural,\n  one {andur}\n  other {andurit}\n} aktiiv",fields:{status:{heading:"Status",description:"Controls whether the alarm can be armed in this mode."},exit_delay:{heading:"Ooteaeg valvestamisel",description:"Viivitus enne valvestamise rakendumist."},entry_delay:{heading:"Sisenemise viivitus",description:"Viivitus sisenemisel enne häire rakendumist."},trigger_time:{heading:"Häire kestus",description:"Sireeni jne. aktiveerimise kestus."}}},mqtt:{title:"MQTT sätted",description:"MQTT parameetrite seadistamine.",fields:{state_topic:{heading:"Oleku teema (topic)",description:"Teema milles avaldatakse oleku muutused."},event_topic:{heading:"Event topic",description:"Topic on which alarm events are published"},command_topic:{heading:"Käskude teema (topic)",description:"Teema milles avaldatakse valvestamise käsud."},require_code:{heading:"Nõua PIN koodi",description:"Käskude edastamiseks on vajalik PIN kood."},state_payload:{heading:"Määra olekute toimeandmed",item:"Määra oleku ''{state}'' toimeandmed"},command_payload:{heading:"Määra käskude toimeandmed",item:"Määra käsu ''{command}'' toimeandmed"}}},areas:{title:"Alad",description:"Alasid kasutatakse elamise jagamiseks valvetsoonideks.",no_items:"Valvestamise alad on loomata.",table:{remarks:"Ala teave",summary:"See ala sisaldab {summary_sensors} ja {summary_automations}.",summary_sensors:"{number} {number, plural,\n  one {andur}\n  other {andurit}\n}",summary_automations:"{number} {number, plural,\n  one {automatiseering}\n  other {automatiseeringut}\n}"},actions:{add:"Lisa"}}},dialogs:{create_area:{title:"Uus ala",fields:{copy_from:"Kopeeri sätted allikast:"}},edit_area:{title:"Ala ''{area}'' muutmine",name_warning:"NB! Nime muutmisel muutub ka olemi ID"},remove_area:{title:"Kas kustutada ala?",description:"Kas kustutada see ala? Ala kaasab andurid {sensors} ja automatiseeringud {automations} mis samuti eemaldatakse."},edit_master:{title:"Põhiala seaded"},disable_master:{title:"Kas keelata põhiala?",description:"Kas keelata põhiala? Ala kaasab andurid {sensors} ja automatiseeringud {automations} mis samuti eemaldatakse.."}}},sensors:{title:"Andurid",cards:{sensors:{description:"Kasutusel olevad andurid. Klõpsa olemil, et seadistada.",table:{no_items:"Andureid pole lisatud. Alustuseks lisa mõni andur.",no_area_warning:"Sensor is not assigned to any area.",arm_modes:"Valvestamise olek",always_on:"(alati)"}},add_sensors:{title:"Andurite lisamine",description:"Lisa veel andureid. Mõistlik on panna neile arusaadav nimi (friendly_name).",no_items:"Puuduvad valvestamiseks sobivad Home Assistanti olemid. Lisatavad olemid peavad olema olekuandurid (binary_sensor).",table:{type:"Detected type"},actions:{add_to_alarm:"Lisa valvesüsteemile",filter_supported:"Hide items with unknown type"}},editor:{title:"Andurite sätted",description:"Muuda olemi ''{entity}'' sätteid.",fields:{entity:{heading:"Olem",description:"Selle anduriga seotud olem"},area:{heading:"Ala",description:"Vali ala kus see andur asub."},group:{heading:"Group",description:"Group with other sensors for combined triggering."},device_type:{heading:"Seadme tüüp",description:"Vali anduri tüüp, et automaatselt rakendada sobivad sätted.",choose:{door:{name:"Uks",description:"Uks, värav või muu piire mida kasutatakse sisenemiseks või väljumiseks."},window:{name:"Aken",description:"Aken või uks mida ei kasutata sisenemiseks nagu rõduuks."},motion:{name:"Liikumisandur",description:"Kohaloleku andurid mille rakendumiste vahel on viide."},tamper:{name:"Terviklikkus",description:"Anduri muukimine või klaasipurustusandur jms."},environmental:{name:"Ohu andurid",description:"Suitsu või gaasilekke andur, veeleke jne. (ei ole seotud sissetungimisega)."},other:{name:"Tavaandur"}}},always_on:{heading:"Alati kasutusel",description:"Andur käivitab häire igas valve olekus."},modes:{heading:"Valve olekute valik",description:"Valve olekud kus seda andurit kasutatakse."},arm_on_close:{heading:"Valvesta sulgemisel",description:"Selle anduri rakendumisel valvestatakse kohe ilma viiveta."},use_exit_delay:{heading:"Use exit delay",description:"Sensor is allowed to be active when the exit delay starts."},use_entry_delay:{heading:"Use entry delay",description:"Sensor activation triggers the alarm after the entry delay rather than directly."},allow_open:{heading:"Lahkumisviivitus",description:"See andur ei aktiveeru enne lahkumisviivituse lõppu."},auto_bypass:{heading:"Bypass automatically",description:"Exclude this sensor from the alarm if it is open while arming.",modes:"Modes in which sensor may be bypassed"},trigger_unavailable:{heading:"Andurite saadavus",description:"Käivita häire kui andur muutub kättesaamatuks."}},actions:{toggle_advanced:"Täpsemad sätted",remove:"Eemalda",setup_groups:"Setup groups"},errors:{description:"Palun paranda jägmised vead:",no_area:"Ala pole määratud",no_modes:"Anduri tüüp on määramata, ei tea kuida kasutada",no_auto_bypass_modes:"No modes are selected for the sensor may be automatically bypassed"}}},dialogs:{manage_groups:{title:"Manage sensor groups",description:"In a sensor group multiple sensors must be activated within a time period before the alarm is triggered.",no_items:"No groups yet",actions:{new_group:"New group"}},create_group:{title:"New sensor group",fields:{name:{heading:"Name",description:"Name for sensor group"},timeout:{heading:"Time-out",description:"Time period during which consecutive sensor activations triggers the alarm."},event_count:{heading:"Kogus",description:"Erinevate andurite arv, mis tuleb häire käivitamiseks aktiveerida."},sensors:{heading:"Sensors",description:"Select the sensors which are contained by this group."}},errors:{invalid_name:"Invalid name provided.",insufficient_sensors:"At least 2 sensors need to be selected."}},edit_group:{title:"Edit sensor group ''{name}''"}}},codes:{title:"Koodid",cards:{codes:{description:"Valvestuskoodide muutmine.",fields:{code_arm_required:{heading:"Valvestamine koodiga",description:"Valvestamiseks tuleb sisestada kood"},code_disarm_required:{heading:"Valvest vabastamise kood",description:"Valvest vabastamiseks tulem sisestada kood"},code_mode_change_required:{heading:"Nõua režiimi vahetamiseks koodi",description:"Aktiivse valverežiimi muutmiseks tuleb esitada kehtiv kood."},code_format:{heading:"Koodi vorming",description:"Kasutajaliidese koodi tüübid.",code_format_number:"PIN kood",code_format_text:"Salasõna"}}},user_management:{title:"Kasutajate haldus",description:"Igal kasutajal on oma juhtkood.",no_items:"Kasutajaid pole määratud",actions:{new_user:"Uus kasutaja"}},new_user:{title:"Lisa uus kasutaja",description:"Valvesüsteemi kasutaja lisamine.",fields:{name:{heading:"Nimi",description:"Kasutaja nimi."},code:{heading:"Valvestuskood",description:"Selle kasutaja kood."},confirm_code:{heading:"Koodi kinnitamine",description:"Sisesta sama kood uuesti."},can_arm:{heading:"Tohib valvestada",description:"Koodi sisestamine valvestab."},can_disarm:{heading:"Tohib valvest maha võtta",description:"Koodi sisestamine võtab valvest maha."},is_override_code:{heading:"Alistuskood",description:"Koodi sisestamine käivitab kohese häire"},area_limit:{heading:"Restricted areas",description:"Limit user to control only the selected areas"}},errors:{no_name:"Nimi puudub.",no_code:"Kood peab olema vhemalt 4 tärki.",code_mismatch:"Sisestatud koodid ei klapi."}},edit_user:{title:"Muuda kasutaja sätteid",description:"Muuda kasutaja ''{name}'' sätteid.",fields:{old_code:{heading:"Kehtiv kood",description:"Kehtiv kood, jäta tühjaks kui ei taha muuta."}}}}},actions:{title:"Toimingud",cards:{notifications:{title:"Teavitused",description:"Halda saadetavaid teavitusi",table:{no_items:"Teavitusi pole veel loodud.",no_area_warning:"Action is not assigned to any area."},actions:{new_notification:"Uus teavitus"}},actions:{description:"Arenduses, mõeldud seadmete lülitamiseks.",table:{no_items:"Toiminguid pole veel määratud."},actions:{new_action:"Uus toiming"}},new_notification:{title:"Loo teavitus",description:"Uue teavituse loomine.",trigger:"Condition",action:"Task",options:"Options",fields:{event:{heading:"Sündmus",description:"Mille puhul teavitada",choose:{armed:{name:"Valvestatud",description:"Valvestamine oli edukas"},disarmed:{name:"Valvest maas",description:"Valve mahavõtmine õnnestus"},triggered:{name:"Häire",description:"Valvesüsteem andis häire"},untriggered:{name:"Alarm not longer triggered",description:"The triggered state of the alarm has ended"},arm_failure:{name:"Valvestamine nurjus",description:"Valvestamine ei õnnestunud mõne anduri oleku või vea tõttu"},arming:{name:"Valvestamise eelne viivitus algas",description:"Algas valvestamise eelviide, majast võib lahkuda."},pending:{name:"Sisenemise viide rakendus",description:"Märgati sisenemist, häire rakendub peale viidet."}}},mode:{heading:"Olek",description:"Millises valve olekus teavitada (valikuline)"},title:{heading:"Päis",description:"Teavitussõnumi päis"},message:{heading:"Sisu",description:"Teavitussõnumi tekst",insert_wildcard:"Insert wildcard",placeholders:{armed:"The alarm is set to {{arm_mode}}",disarmed:"The alarm is now OFF",triggered:"The alarm is triggered! Cause: {{open_sensors}}.",untriggered:"The alarm is not longer triggered.",arm_failure:"The alarm could not be armed right now, due to: {{open_sensors}}.",arming:"The alarm will be armed soon, please leave the house.",pending:"The alarm is about to trigger, disarm it quickly!"}},open_sensors_format:{heading:"Format for open_sensors wildcard",description:"Choose which sensor information in inserted in the message",options:{default:"Names and states",short:"Names only"}},arm_mode_format:{heading:"Translation for arm_mode wildcard",description:"Choose in which language the arm mode is inserted in the message"},target:{heading:"Saaja",description:"Seade millele edastada teavitus"},name:{heading:"Nimi",description:"Teavituse kirjeldus",placeholders:{armed:"Notify {target} upon arming",disarmed:"Notify {target} upon disarming",triggered:"Notify {target} when triggered",untriggered:"Notify {target} when triggering stops",arm_failure:"Notify {target} on failure",arming:"Notify {target} when leaving",pending:"Notify {target} when arriving"}},delete:{heading:"Delete automation",description:"Permanently remove this automation"}},actions:{test:"Try it"}},new_action:{title:"Loo toiming",description:"Seadme oleku muutmine valve oleku muutmisel.",fields:{event:{heading:"Sündmus",description:"Millisel juhul käivitada toiming"},area:{heading:"Ala",description:"Ala millele sündmus rakendub."},mode:{heading:"Olek",description:"Millises valve olekus toiming käivitada (valikuline)"},entity:{heading:"Olem",description:"Toimingu olem"},action:{heading:"Toiming",description:"Olemi toiming",no_common_actions:"Actions can only be assigned in YAML mode for the selected entities."},name:{heading:"Nimi",description:"Toimingu kirjeldus",placeholders:{armed:"Set {entity} to {state} upon arming",disarmed:"Set {entity} to {state} upon disarming",triggered:"Set {entity} to {state} when triggered",untriggered:"Set {entity} to {state} when triggering stops",arm_failure:"Set {entity} to {state} on failure",arming:"Set {entity} to {state} when leaving",pending:"Set {entity} to {state} when arriving"}}}}}}},Yt={common:Kt,components:Zt,title:"Alarm panel",panels:Qt},Wt=Object.freeze({__proto__:null,common:Kt,components:Zt,title:"Alarm panel",panels:Qt,default:Yt}),Xt={modes_short:{armed_away:"Absence",armed_home:"Présence",armed_night:"Nuit",armed_custom_bypass:"Personnalisé",armed_vacation:"Vacances"},enabled:"Actif",disabled:"Inactif"},Jt={time_slider:{seconds:"sec",minutes:"min",infinite:"infini",none:"Aucune"},editor:{ui_mode:"Afficher l'éditeur visuel",yaml_mode:"Afficher l'éditeur de code",edit_in_yaml:"Editer en YAML"},table:{filter:{label:"Filtrer par items",item:"Filtrer par {name}",hidden_items:"{number} {number, plural,\n  one { item est caché}\n  other { items sont cachés}\n} "}}},ei="Configuration de l'alarme",ti={general:{title:"Généraux",cards:{general:{description:"Ce panneau définit les paramètres globaux de l'alarme.",fields:{disarm_after_trigger:{heading:"Désactivation après déclenchement",description:"Lorsque le temps de fonctionnement de la sirène est écoulé, désactive l'alarme au lieu de la réactiver."},enable_mqtt:{heading:"Utilisation avec MQTT",description:"Permet au panneau d'alarme d'être contrôlé via MQTT."},enable_master:{heading:"Activation de commande centralisée",description:"Créer une entité pour piloter toutes les zones en même temps."}},actions:{setup_mqtt:"Configuration MQTT",setup_master:"Configuration pricipale"}},modes:{title:"Modes",description:"Ce panneau définit le mode de gestion pour chaque type d'activation.",modes:{armed_away:"Ce mode sera utilisé lorsque toutes les personnes auront quitté la maison. Toutes les portes et fenêtres permettant l'accès à la maison seront surveillées, les détecteurs de mouvement à l'intérieur de la maison seront opérationnels.",armed_home:"Ce mode sera utilisée lorsque des personnes sont dans la maison. Toutes les portes et fenêtres permettant l'accès à la maison seront surveillées (périmétrie), les détecteurs de mouvement à l'intérieur de la maison seront inopérants.",armed_night:"Ce mode sera utilisé lors du réglage de l'alarme avant de s'endormir. Toutes les portes et fenêtres permettant l'accès à la maison seront surveillées, et les capteurs de mouvement sélectionnés (ex : rez de chaussée) dans la maison seront opérationnels.",armed_vacation:"Ce mode peut être utilisé comme une extension du mode armé absent en cas d'absence pour une durée plus longue. Les temps de retard et les réponses de déclenchement peuvent être adaptés (au choix) à l'éloignement du domicile.",armed_custom_bypass:"Ce mode supplémentaire permet de définir votre propre périmètre de sécurité."},number_sensors_active:"{number} {number, plural,\n  one {capteur actif}\n  other {capteurs actifs}\n} ",fields:{status:{heading:"Statut",description:"Active l'alarme dans ce mode."},exit_delay:{heading:"Délai pour sortir",description:"Lors de l'activation, pendant cette période, les capteurs ne déclencheront pas l'alarme."},entry_delay:{heading:"Délai pour entrer",description:"Temps d'attente avant que l'alarme ne se déclenche après détection d'un des capteurs."},trigger_time:{heading:"Temps de fonctionnement avant réarmement",description:"Temps pendant lequel l'alarme restera dans l'état déclenché après intrusion."}}},mqtt:{title:"Configuration MQTT",description:"Ce panneau peut être utilisé pour la configuration de l'interface MQTT.",fields:{state_topic:{heading:"Etat des données",description:"Topic sur lequel les mises à jour d'état sont publiées."},event_topic:{heading:"Evènement de données",description:"Topic sur lequel les évènements d'état sont publiés."},command_topic:{heading:"Commande de données",description:"Topic sur lequel les commandes d'armement / désarmement sont envoyées."},require_code:{heading:"Code requis",description:"Exige que le code soit envoyé avec la commande."},state_payload:{heading:"Configurer une valeur par état",item:"Définir une valeur pour l'état ''{state}''."},command_payload:{heading:"Configurer une valeur par commande",item:"Définir une valeur pour la commande ''{command}''."}}},areas:{title:"Zones",description:"Les zones peuvent être utilisées pour diviser votre système d'alarme en plusieurs secteurs.",no_items:"Il n'y a pas encore de zone définie.",table:{remarks:"Remarque",summary:"Cette zone contient {summary_sensors} et {summary_automations}.",summary_sensors:"{number} {number, plural,\n  one {capteur}\n  other {capteurs}\n}",summary_automations:"{number} {number, plural,\n  one {automatisation}\n  other {automatisations}\n}"},actions:{add:"Ajouter"}}},dialogs:{create_area:{title:"Nouvelle zone",fields:{copy_from:"Copier les paramètres"}},edit_area:{title:"Editer la zone ''{area}''",name_warning:"Note : Changer le nom, changera l'entity ID"},remove_area:{title:"Suppression de zone ?",description:"Êtes-vous sur de vouloir supprimer cette zone ? Cette zone contient {sensors} capteur(s) et {automations} automatisation(s), qui seront également supprimés."},edit_master:{title:"Configuration principale"},disable_master:{title:"Désactiver la configuration principale ?",description:"Êtes-vous sur de vouloir supprimer la configuration principale ? Cette zone contient {automations} automatisation(s), qui seront également supprimées."}}},sensors:{title:"Capteurs",cards:{sensors:{description:"Capteurs actuellement configurés. Cliquez sur une entité pour apporter des modifications.",table:{no_items:"Il n'y a pas encore de capteur ajouté à l'alarme. Assurez-vous de les ajouter d'abord.",no_area_warning:"Le capteur n'est affecté à aucune zone.",arm_modes:"Type d'activation",always_on:"(Toujours)"}},add_sensors:{title:"Ajouter un capteur",description:"Ajoutez plus de capteurs. Assurez-vous que vos capteurs ont un nom personnalisé afin de pouvoir les identifier.",no_items:"Aucune entité HA disponible ne peut être configurée pour l'alarme. Assurez-vous d'inclure les entités de type binary_sensor.",table:{type:"Type de détection"},actions:{add_to_alarm:"Ajouter à l'alarme",filter_supported:"Masquer les éléments de type inconnu"}},editor:{title:"Editer un capteur",description:"Configurer les paramètres du capteur ''{entity}''.",fields:{entity:{heading:"Entité",description:"Entité associée à ce capteur"},area:{heading:"Zone",description:"Sélectionner une zone contenant ce capteur."},group:{heading:"Groupe",description:"Grouper avec d'autres capteurs pour un déclenchement combiné."},device_type:{heading:"Type de détection",description:"Choisissez un type de détection pour appliquer automatiquement les paramètres appropriés.",choose:{door:{name:"Porte",description:"Une porte, un portail ou une autre entrée utilisée pour entrer / sortir de la maison."},window:{name:"Fenêtre",description:"Une fenêtre, ou une porte non utilisée pour entrer dans la maison comme un balcon."},motion:{name:"Mouvement",description:"Capteur de présence ou appareil similaire présentant un délai entre les activations."},tamper:{name:"Effraction",description:"Détection d'arrachage du capteur, capteur de bris de verre, etc."},environmental:{name:"Détecteur Environmental",description:"Détecteur de fumée / gaz, détecteur de fuite, etc. (non lié à la protection anti-effraction)."},other:{name:"Générique"}}},always_on:{heading:"Toujours en service",description:"Le capteur doit toujours déclencher l'alarme."},modes:{heading:"Mode possible",description:"Modes d'alarme dans lesquels ce capteur est actif."},arm_on_close:{heading:"Activer après fermeture",description:"Après la désactivation de ce capteur, le délai de sortie restant sera automatiquement ignoré."},use_exit_delay:{heading:"Utiliser le délai de sortie",description:"Le capteur sera actif à la fin du délai de sortie."},use_entry_delay:{heading:"Utiliser le délai d'entrée",description:"L'activation du capteur déclenche l'alarme après le délai d'entrée plutôt qu'instantanément."},allow_open:{heading:"Autoriser l'ouverture lors de l'activation",description:"Permet à ce capteur d'être actif, peu de temps après votre départ afin qu'il ne bloque pas l'armement."},auto_bypass:{heading:"Bypass automatique",description:"Exclut ce capteur de l'alarme s'il est ouvert lors de l'armement.",modes:"Modes dans lesquels le capteur peut être ignoré"},trigger_unavailable:{heading:"Déclenchement lorsqu'il n'est pas disponible",description:"Lorsque l'état du capteur devient `` indisponible '', cela activera l'alarme."}},actions:{toggle_advanced:"Paramètres avancées",remove:"Supprimer",setup_groups:"Configuration de Groupe"},errors:{description:"Veuillez corriger les erreurs suivantes :",no_area:"Aucune zone n'est sélectionnée",no_modes:"Aucun mode sélectionné pour lequel le capteur doit être actif",no_auto_bypass_modes:"Aucun mode n'est sélectionné car le capteur peut être automatiquement ignoré"}}},dialogs:{manage_groups:{title:"Gérer les groupes de capteurs",description:"Dans un groupe de capteurs, plusieurs capteurs doivent être activés dans un laps de temps avant que l'alarme ne se déclenche.",no_items:"Aucun groupe",actions:{new_group:"Nouveau groupe"}},create_group:{title:"Nouveau groupe de capteurs",fields:{name:{heading:"Nom",description:"Nom du nouveau groupe de capteurs"},timeout:{heading:"Laps de temps",description:"Période de temps pendant laquelle les activations consécutives du capteur déclenchent l'alarme."},event_count:{heading:"nombre d'événements",description:"Nombre de capteurs différents qui doivent être activés pour déclencher l'alarme."},sensors:{heading:"Capteurs",description:"Sélectionnez les capteurs qui sont contenus dans ce groupe."}},errors:{invalid_name:"Nom fourni non valide.",insufficient_sensors:"Au moins 2 capteurs doivent être sélectionnés."}},edit_group:{title:"Editer le groupe de capteurs ''{name}''"}}},codes:{title:"Codes",cards:{codes:{description:"Gestion des paramètres des codes.",fields:{code_arm_required:{heading:"Utiliser un code pour l'activation",description:"Code requis pour l'activation de l'alarme"},code_disarm_required:{heading:"Utiliser un code pour la désactivation",description:"Code requis pour la désactivation de l'alarme"},code_mode_change_required:{heading:"Exiger un code pour changer de mode",description:"Un code valide doit être fourni pour changer le mode d'armement en cours."},code_format:{heading:"Format du code",description:"Définit le type d'entrée pour la carte d'alarme Lovelace.",code_format_number:"pincode",code_format_text:"password"}}},user_management:{title:"Gestion des utilisateurs",description:"Chaque utilisateur a son propre code pour activer / désactiver l'alarme.",no_items:"Il n'y a aucun utilisateur de défini",actions:{new_user:"Nouvel utilisateur"}},new_user:{title:"Créer un nouvel utilisateur",description:"Des utilisateurs peuvent être créés pour donner accès au fonctionnement de l'alarme.",fields:{name:{heading:"Nom",description:"Nom de l'utilisateur."},code:{heading:"Code",description:"Code personnel de l'utilisateur."},confirm_code:{heading:"Confirmation du code",description:"Répèter le code."},can_arm:{heading:"Demande de code pour l'activation",description:"Entrer ce code pour activer l'alarme."},can_disarm:{heading:"Demande de code pour désactivation",description:"Entrer ce code pour désactiver l'alarme."},is_override_code:{heading:"Code de sécurité",description:"La saisie de ce code forcera l'activation l'alarme."},area_limit:{heading:"Zones Restreintes",description:"L'utilisateur ne peut contrôler uniquement les zones sélectionnées."}},errors:{no_name:"Aucun nom saisi.",no_code:"Le code doit contenir 4 caractères/chiffres minimum.",code_mismatch:"Les codes sont différents."}},edit_user:{title:"Editer l'utilisateur",description:"Changer la configuration pour l'utilisateur ''{name}''.",fields:{old_code:{heading:"Code utilisé",description:"Code actuel, laissez vide pour ne rien changer."}}}}},actions:{title:"Actions",cards:{notifications:{title:"Notifications",description:"À l'aide de ce panneau, vous pouvez gérer les notifications à envoyer lors d'un évènement d'alarme.",table:{no_items:"Il n'y a aucune notification de créée.",no_area_warning:"L'action n'est affectée à aucune zone."},actions:{new_notification:"Nouvelle notification"}},actions:{description:"Ce panneau est utilisé pour changer d'état les appareils de votre choix.",table:{no_items:"Il n'y a aucune action de créée."},actions:{new_action:"Nouvelle action"}},new_notification:{title:"Créer une notification",description:"Créer une nouvelle notification.",trigger:"Condition",action:"Action",options:"Options",fields:{event:{heading:"Évènement",description:"Détermine quand la notification doit être envoyée.",choose:{armed:{name:"Alarme activée",description:"L'alarme s'est correctement activée."},disarmed:{name:"Alarme désactivée",description:"L'alarme est désactivée."},triggered:{name:"Alarme déclenchée",description:"L'alarme est déclenchée."},untriggered:{name:"L'alarme n'est plus déclenchée",description:"Le temps de déclenchement de l'alarme est terminé."},arm_failure:{name:"Armement impossible",description:"L'armement est impossible dû à un ou plusieurs capteurs."},arming:{name:"Délai de sortie activé",description:"Le délai de sortie est activé, vous devez quitter la maison."},pending:{name:"Délai d'entrée activé",description:"Le délai d'entrée est activé, sans action de désarmement, l'alarme va se déclencher."}}},mode:{heading:"Mode",description:"Limite la notification à un mode spécifique (optionnel)"},title:{heading:"Titre",description:"Titre du message de la notification"},message:{heading:"Message",description:"Contenu du message de la notification",insert_wildcard:"Inserer la wildcard",placeholders:{armed:"L'alarme est réglée sur {{arm_mode}}",disarmed:"L'alarme est maintenant désactivée",triggered:"L'alarme s'est déclenchée ! Cause : {{open_sensors}}.",untriggered:"L'alarme n'est plus déclenchée.",arm_failure:"L'alarme n'a pas pu être armée pour le moment, à cause de : {{open_sensors}}.",arming:"L'alarme sera bientôt armée, veuillez quitter la maison.",pending:"L'alarme est sur le point de se déclencher, désarmez-la rapidement !"}},open_sensors_format:{heading:"Format pour les 'open_sensors wildcard'",description:"Choisissez les informations du capteur à insérer dans le message",options:{default:"Noms et états",short:"Noms seulement"}},arm_mode_format:{heading:"Traduction pour 'arm_mode wildcard'",description:"Choisissez dans quelle langue le mode d'armement est inséré dans le message"},target:{heading:"Cible",description:"Appareil recevant le message"},name:{heading:"Nom",description:"Description de la notification",placeholders:{armed:"Notifie {target} à l'armement",disarmed:"Notifie {target} au désarmement",triggered:"Notifie {target} au déclenchement",untriggered:"Notifie {target} quand le temps de déclenchement est terminé",arm_failure:"Notifie {target} en cas d'échec de l'armement",arming:"Notifie {target} lors du départ de la maison",pending:"Notifie {target} lors du retour à la maison"}},delete:{heading:"Supprimer l'automatisme",description:"Supprimer définitivement cet automatisme"}},actions:{test:"Essai"}},new_action:{title:"Créer une action",description:"Ce panneau peut être utilisé pour commuter un appareil lorsque l'état de l'alarme change.",fields:{event:{heading:"Evènement",description:"Détermine quand l'action doit être exécutée."},area:{heading:"Zone",description:"Zone pour laquelle l'évènement s'applique."},mode:{heading:"Mode",description:"Limite l'action à un mode spécifique (optionnel)."},entity:{heading:"Entité",description:"Entité sur laquelle effectuer une action."},action:{heading:"Action",description:"Action à exécuter sur l'entité",no_common_actions:"Les actions ne peuvent être affectées qu'en mode YAML pour les entités sélectionnées."},name:{heading:"Nom",description:"Description de l'action",placeholders:{armed:"Mettre {entity} à {state} lors de l'armement",disarmed:"Mettre {entity} à {state} lors du désarmement",triggered:"Mettre {entity} à {state} lors du déclenchement de l'alarme",untriggered:"Mettre {entity} à {state} quand le temps de déclenchement s'arrête",arm_failure:"Mettre {entity} à {state} en cas d'échec de l'armement",arming:"Mettre {entity} à {state} lors du départ de la maison",pending:"Mettre {entity} à {state} lors du retour à la maison"}}}}}}},ii={common:Xt,components:Jt,title:ei,panels:ti},ai=Object.freeze({__proto__:null,common:Xt,components:Jt,title:ei,panels:ti,default:ii}),ni={modes_short:{armed_away:"Fuori casa",armed_home:"In casa",armed_night:"Notte",armed_custom_bypass:"Personalizzato",armed_vacation:"Vacanza"},enabled:"Abilitato",disabled:"Disabilitato"},si={time_slider:{seconds:"sec",minutes:"min",infinite:"infinito",none:"niente"},editor:{ui_mode:"Passa a UI",yaml_mode:"Passa a YAML",edit_in_yaml:"Modifica in YAML"},table:{filter:{label:"Filtra elementi",item:"Filtra per {name}",hidden_items:"{number} {number, plural,\n  one {item is}\n  other {items are}\n} hidden"}}},ri={general:{title:"Generale",cards:{general:{description:"Questo pannello definisce alcune impostazioni da applicare alle modalità di allarme.",fields:{disarm_after_trigger:{heading:"Disattiva allarme dopo l'attivazione",description:"Dopo che il tempo di attivazione è scaduto, disattivare l'allarme invece di tornare allo stato inserito."},enable_mqtt:{heading:"Abilita MQTT",description:"Permetti al pannello allarme di essere controllato attraverso MQTT."},enable_master:{heading:"Abilita Allarme Master",description:"Crea una entità per controllare tutte le aree simultaneamente."}},actions:{setup_mqtt:"Configurazione MQTT",setup_master:"Configurazione Master"}},modes:{title:"Modalità",description:"Questo pannello può essere usato per impostare le modalità dell'allarme.",modes:{armed_away:"Modalità 'fuori casa': da utilizzare quando tutte le persone lasciano la casa. Tutti i sensori di porte e finestre che consentono l'accesso alla casa saranno attivi, così come i sensori di movimento all'interno della casa.",armed_home:"Modalità 'in casa': da utilizzare quando si attiva l'allarme mentre le persone sono in casa. Tutti i sensori di porte e finestre che consentono l'accesso alla casa saranno attivi, ma non i sensori di movimento all'interno della casa.",armed_night:"Modalità 'notte': da utilizzare quando si imposta la sveglia prima di andare a dormire. Tutti i sensori di porte e finestre che consentono l'accesso alla casa saranno attivi e sensori di movimento selezionati (ad esempio al piano di sotto) nella casa.",armed_vacation:"Modalità 'vacanza': da utlizzare come estensione della modalità 'fuori casa' in caso di assenza prolungata. I ritardi e i tempi di attivazione possono essere adattati per essere distanti da casa.",armed_custom_bypass:"Modalità 'personalizzato': da utilizzare per definire una modalità di allarme specifica per le esigenze dell'utilizzatore."},number_sensors_active:"{number} {number, plural,\n  one {sensor}\n  other {sensors}\n} active",fields:{status:{heading:"Stato",description:"Definisce quando l'allarme può essere armato in questa modalità."},exit_delay:{heading:"Tempo di preattivazione",description:"Quando si attiva l'allarme, entro questo periodo di tempo i sensori non attiveranno ancora l'allarme."},entry_delay:{heading:"Ritardo di attivazione",description:"Tempo di ritardo fino allo scatto dell'allarme dopo l'attivazione di uno dei sensori."},trigger_time:{heading:"Tempo di attivazione",description:"Tempo durante il quale suonerà la sirena."}}},mqtt:{title:"Configurazione MQTT",description:"Questo pannello può essere usato per le impostazioni MQTT.",fields:{state_topic:{heading:"Topic di stato",description:"Topic su cui vengono pubblicati gli aggiornamenti di stato"},event_topic:{heading:"Event topic",description:"opic su cui vengono pubblicati gli eventi"},command_topic:{heading:"Topic di comando",description:"Topic su cui vengono inviati i comandi di inserimento / disinserimento."},require_code:{heading:"Richiedi Codice",description:"Richiedi il codice da inviare con il comando."},state_payload:{heading:"Configura payload per stato",item:"Definisci un payload per lo stato ''{state}''"},command_payload:{heading:"Configura payload per comando",item:"Definisci un payload per il comando ''{command}''"}}},areas:{title:"Aree",description:"Le aree possono essere utilizzate per dividere il tuo allarme in più sezioni.",no_items:"Non ci sono ancora aree definite.",table:{remarks:"Commenti",summary:"Questa area contiene {summary_sensors} e {summary_automations}.",summary_sensors:"{number} {number, plural,\n  one {sensor}\n  other {sensors}\n}",summary_automations:"{number} {number, plural,\n  one {automation}\n  other {automations}\n}"},actions:{add:"Aggiungi"}}},dialogs:{create_area:{title:"Nuova area",fields:{copy_from:"Copia impostazioni da"}},edit_area:{title:"Modifica Area ''{area}''",name_warning:"Nota: cambiare il nome modificherà l'entity ID"},remove_area:{title:"Rimuovi Area?",description:"Sei sicuro che vuoi rimuovere questa area? Questa area contiene {sensors} sensori e {automations} automazioni, che verranno anch'esse rimossi."},edit_master:{title:"Configura Master"},disable_master:{title:"Disabilita Master?",description:"Sei sicuro che vuoi rimuovere l'allarme master? Questa area contiene {automations} automazioni, che verranno eliminate con questa azione."}}},sensors:{title:"Sensori",cards:{sensors:{description:"Sensori attualmente configurati. Clicca sull'entità per modificare.",table:{no_items:"Non ci sono ancora sensori aggiunti a questo allarme. Assicurati di aggiungerli prima.",no_area_warning:"Sensore non assegnato a nessuna area.",arm_modes:"Modalità di attivazione",always_on:"(Sempre)"}},add_sensors:{title:"Aggiungi Sensori",description:"Aggiungi più sensori. Assicurati che i sensori abbiano un friendly_name (nome amichevole), in modo da identificarli più facilmente.",no_items:"Non ci sono entità disponibili che possono essere configurate con l'allarme. Assicurati di includere entità del tipo binary_sensor (sensore binario).",table:{type:"Tipologia Innesco"},actions:{add_to_alarm:"Aggiungi all'allarme",filter_supported:"Nascondi elementi con tipologia sconosciuta"}},editor:{title:"Modifica Sensore",description:"Configura le impostazioni del sensore ''{entity}''.",fields:{entity:{heading:"Entità",description:"Entità associata a questo sensore"},area:{heading:"Area",description:"Seleziona una area che contiene questo sensore."},group:{heading:"Gruppo",description:"Raggruppa con altri sensori per inneschi combinati."},device_type:{heading:"Tipologia Dispositivo",description:"Scegli la tipologia del dispositivo per applicare le impostazioni appropriate.",choose:{door:{name:"Porta",description:"Una porta, cancello o altro ingresso che è usato per entrare/lasciare casa."},window:{name:"Finestra",description:"Una finestra, o una porta-finestra non usata per accedere alla casa."},motion:{name:"Movimento",description:"Sensore di presenza o simile che ha un ritardo tra le attivazioni."},tamper:{name:"Vibrazione",description:"Rilaveamento di vibrazione, rottura vetri, ecc."},environmental:{name:"Ambientale",description:"Rilevatori fumo/gas, ecc. (non correlati alla protezione intrusi)."},other:{name:"Generico"}}},always_on:{heading:"Sempre attivo",description:"Il sensore attiverà sempre l'allarme."},modes:{heading:"Modalità attive",description:"Modalità di allarme in cui il sensore risulta collegato."},arm_on_close:{heading:"Attiva dopo chisura",description:"Dopo la disattivazione di questo sensore il ritardo rimanente verrà automaticamente ignorato."},use_exit_delay:{heading:"Usa ritardo d'uscita",description:"Sensore che può rimanre attivo mentre il ritardo di uscita è in corso."},use_entry_delay:{heading:"Usa ritardo in ingresso",description:"Sensore che innesca l'allarme dopo il ritardo in ingresso anzichè direttamente."},allow_open:{heading:"Permetti apertura",description:"Consentire a questo sensore di rimanere attivo poco dopo essere usciti."},auto_bypass:{heading:"Esclusione automatica",description:"Escludi questo sensore dall'allarme se è aperto durante l'attivazione.",modes:"Modalità in cui il sensore può essere escluso"},trigger_unavailable:{heading:"Fai scattare l'allarme quando non disponibile",description:"L'allarme scatterà quando lo stato del sensore diverrà 'non disponibile'."}},actions:{toggle_advanced:"Impostazione avanzate",remove:"Rimuovi",setup_groups:"Configurazione gruppi"},errors:{description:"Per favore correggi i seguenti errori:",no_area:"Nessuna area è selezionata",no_modes:"Nessuna modalità è selezionata per la quale il sensore dovrebbe essere attivo",no_auto_bypass_modes:"Nessuna modalità è selezionata per il sensore che può essere automaticamente escluso"}}},dialogs:{manage_groups:{title:"Gestisci gruppi sensori",description:"In un gruppo sensori più sensori devono essere attivi in un intevallo di tempo prima che l'allarme sia innescato.",no_items:"Nessun gruppo",actions:{new_group:"Nuovo gruppo"}},create_group:{title:"Nuovo gruppo sensori",fields:{name:{heading:"Nome",description:"Nome del gruppo sensori"},timeout:{heading:"Time-out",description:"Periodo di tempo durante il quale l'attivazione consecutiva innesca l'allarme."},event_count:{heading:"Numero",description:"Quantità di sensori diversi che devono essere attivati per attivare l'allarme."},sensors:{heading:"Sensori",description:"Seleziona i sensori che fanno parte di questo gruppo."}},errors:{invalid_name:"Nome non valido.",insufficient_sensors:"Almeno 2 sensori devono essere selezionati."}},edit_group:{title:"Modifica gruppo sensori ''{name}''"}}},codes:{title:"Codici",cards:{codes:{description:"Modifica le impostazioni dei codici.",fields:{code_arm_required:{heading:"Usa codice d'attivazione",description:"Richiedi un codice per attivare l'allarme"},code_disarm_required:{heading:"Usa codice di disattivazione",description:"Richiedi un codice per disattivare l'allarme"},code_mode_change_required:{heading:"Richiede il codice per cambiare modalità",description:"È necessario fornire un codice valido per modificare la modalità di inserimento attiva."},code_format:{heading:"Formato del codice",description:"Imposta il tipo di codice da digitare nella card di Lovelace.",code_format_number:"codice numerico",code_format_text:"password"}}},user_management:{title:"Gestione utente",description:"Ogni utente ha il suo codice per attivare/disattivare l'allarme.",no_items:"Non è stato ancora creato nessun utente.",actions:{new_user:"Nuovo utente"}},new_user:{title:"Crea nuovo utente",description:"Gli utenti potranno operare con l'allarme.",fields:{name:{heading:"Nome",description:"Nome dell'utente."},code:{heading:"Codice operativo",description:"Codice che utilizzerà quest'utente."},confirm_code:{heading:"Ripeti codice operativo",description:"Ripeti il codice operativo scelto."},can_arm:{heading:"Utilizza codice per attivare l'allarme",description:"Utilizza codice per attivare l'allarme"},can_disarm:{heading:"Utilizza codice per disattivare l'allarme",description:"Utilizza codice per disattivare l'allarme"},is_override_code:{heading:"E' un codice di forzatura",description:"Inserendo questo codice forzerai lo stato di attivazione dell'allarme"},area_limit:{heading:"Aree riservate areas",description:"Limita l'utente a controllare solo le aree selezionate"}},errors:{no_name:"Non hai inserito il nome.",no_code:"Il codice deve avere almeno 4 numeri o caratteri.",code_mismatch:"Il codice scelto non combacia, verifica il codice inserito."}},edit_user:{title:"Modifica Utente",description:"Cambia impostazioni per l'utente ''{name}''.",fields:{old_code:{heading:"Modifica Codice",description:"Codice attuale, lascia vuoto per non modificare."}}}}},actions:{title:"Azioni",cards:{notifications:{title:"Notifiche",description:"Con questo pannello puoi gestire le notifiche da inviare quanto accade un determinato evento",table:{no_items:"Non è stata ancora creata nessuna notifica.",no_area_warning:"Azione non assegnata a nessuna."},actions:{new_notification:"Nuova notifica"}},actions:{description:"Questo pannello può essere usato per cambiare lo stato di una o più entità.",table:{no_items:"Non è stata ancora creata nessuna azione."},actions:{new_action:"Nuova azione"}},new_notification:{title:"Crea notifica",description:"Crea una nuova notifica.",trigger:"Condizione",action:"Azione",options:"Opzioni",fields:{event:{heading:"Evento",description:"Quando questa notifica deve essere inviata",choose:{armed:{name:"Allarme attivato",description:"L'allarme è attivo"},disarmed:{name:"Allarme disattivato",description:"L'allarme è disattivato"},triggered:{name:"Allarme innescato",description:"L'allarme è innescato"},untriggered:{name:"Allarme non innescato",description:"L'allarme non è più innescato"},arm_failure:{name:"Impossibile attivare",description:"L'attivazione dell'allarme non è riuscita a casa di uno o più sensori aperti"},arming:{name:"Ritardo d'uscita partito",description:"Ritardo d'uscita partito, preparati a lasciare la casa."},pending:{name:"Ritardo in ingresso partito",description:"Ritardo in ingresso partito, l'allarme verrà innescato a breve."}}},mode:{heading:"Modalità",description:"Limita ad una specifica modalità di allarme (opzionale)"},title:{heading:"Titolo",description:"Titolo per il messaggio di notifica"},message:{heading:"Messaggio",description:"Contenuto del messaggio di notifica",insert_wildcard:"Inserisci wildcard",placeholders:{armed:"L'allarme è impostato in {{arm_mode}}",disarmed:"L'allarme è disattivatoF",triggered:"L'allarme è stato innescato! Causa: {{open_sensors}}.",untriggered:"The alarm is not longer triggered.",arm_failure:"L'allarme non può essere attivato adesso. Causa: {{open_sensors}}.",arming:"L'allarme verrà attivato a breve, per favore lascia la casa.",pending:"L'allarme sta per essere innescato, disattivalo velocemente!"}},open_sensors_format:{heading:"Formato per la wildcard open_sensors",description:"Scegli quale informazione è inserita nel messaggio",options:{default:"Nomi e stati",short:"Nomi soltanto"}},arm_mode_format:{heading:"Traduzione per le wildcard per arm_mode",description:"Scegli la lingua in cui è scritto il messaggio"},target:{heading:"Destinatario",description:"Dispositivo a cui inviare il messaggio di notifica"},name:{heading:"Nome",description:"Descrizione della notifica",placeholders:{armed:"Notifica {target} in attivazione",disarmed:"Notifica {target} in disattivazione",triggered:"Notifica {target} quando innescato",untriggered:"Notifica {target} quando l'innesco termina",arm_failure:"Notifica {target} quando impossibile attivare",arming:"Notifica {target} in uscita",pending:"Notifica {target} in ingresso"}},delete:{heading:"Elimina automazione",description:"Elimina l'automazione permanentemente"}},actions:{test:"Prova"}},new_action:{title:"Crea azione",description:"Questo pannello può essere usato per cambiare lo stato di un entità quando lo stato dell'allarme cambia.",fields:{event:{heading:"Evento",description:"Quando questa azione deve essere eseguita"},area:{heading:"Area",description:"Area nella quale l'evento avviene."},mode:{heading:"Modalità",description:"Limita ad una specifica modalità di allarme (opzionale)"},entity:{heading:"Entità",description:"Entità su cui eseguire l'azione"},action:{heading:"Azione",description:"Azione che deve eseguire l'entità",no_common_actions:"Le azioni possono essere definite solo in YAML mode per le entità selezionate."},name:{heading:"Nome",description:"Descrizione dell'azione",placeholders:{armed:"Imposta {entity} su {state} in attivazione",disarmed:"Imposta {entity} su {state} in disattivazione",triggered:"Imposta {entity} su {state} in innesco",untriggered:"Imposta {entity} su {state} quando l'innesco termina",arm_failure:"Imposta {entity} su {state} quando è impossibile attivare",arming:"Imposta {entity} su {state} in uscita",pending:"Imposta {entity} su {state} in entrata"}}}}}}},oi={common:ni,components:si,title:"Pannello Allarme",panels:ri},di=Object.freeze({__proto__:null,common:ni,components:si,title:"Pannello Allarme",panels:ri,default:oi}),li={modes_short:{armed_away:"Afwezig",armed_home:"Thuis",armed_night:"Nacht",armed_custom_bypass:"Aangepast",armed_vacation:"Vakantie"},enabled:"Actief",disabled:"Inactief"},ci={time_slider:{seconds:"sec",minutes:"min",infinite:"oneindig",none:"geen"},editor:{ui_mode:"Naar UI",yaml_mode:"Naar YAML",edit_in_yaml:"In YAML bewerken"},table:{filter:{label:"Items filteren",item:"Filter op {name}",hidden_items:"{number} {number, plural,\n  one {item is}\n  other {items zijn}\n} verborgen"}}},hi={general:{title:"Algemeen",cards:{general:{description:"Dit paneel definieert enkele instellingen die van toepassing zijn op alle inschakelmodi.",fields:{disarm_after_trigger:{heading:"Uitschakelen na activatie",description:"Nadat de triggertijd is verstreken, schakelt u het alarm uit in plaats van terug te keren naar de ingeschakelde toestand."},enable_mqtt:{heading:"MQTT inschakelen",description:"Toestaan het alarmpaneel via MQTT aan te sturen."},enable_master:{heading:"Master alarm inschakelen",description:"Creëert een entiteit om alle gebieden tegelijkertijd te besturen."}},actions:{setup_mqtt:"MQTT Configuratie",setup_master:"Master configuratie"}},modes:{title:"Beveiligingsmodi",description:"Dit paneel kan worden gebruikt om de beveiligingsmodi van het alarm in te stellen.",modes:{armed_away:"De afwezigheidsmodus wordt gebruikt als alle mensen het huis hebben verlaten. Alle deuren en ramen die toegang geven tot het huis worden bewaakt, evenals bewegingssensoren in het huis.",armed_home:"De thuismodus wordt gebruikt bij het instellen van het alarm terwijl er mensen in huis zijn. Alle deuren en ramen die toegang geven tot het huis worden bewaakt, maar bewegingssensoren in het huis worden niet gebruikt.",armed_night:"De nachtmodus wordt gebruikt bij het instellen van het alarm voordat u gaat slapen. Alle deuren en ramen die toegang geven tot het huis worden bewaakt, en geselecteerde bewegingssensoren (beneden) in het huis.",armed_vacation:"De vakantiemodus dient voor afwezigheid voor langere duur. Er kunnen desgewenst andere vertragingstijden en acties worden ingesteld die beter passen bij de situatie.",armed_custom_bypass:"Een extra modus om uw eigen beveiligingsperimeter te definiëren."},number_sensors_active:"{number} {number, plural,\n  one {sensor}\n  other {sensoren}\n} ingesteld",fields:{status:{heading:"Status",description:"Stel in of het alarm op deze modus kan worden ingesteld."},exit_delay:{heading:"Vertrek vertraging",description:"Bij het inschakelen van het alarm zullen de sensoren binnen deze tijdsperiode het alarm nog niet activeren."},entry_delay:{heading:"Binnenkomst vertraging",description:"Vertragingstijd totdat het alarm afgaat nadat een van de sensoren is geactiveerd."},trigger_time:{heading:"Activatie tijd",description:"Tijd waarin het alarm in de geactiveerde toestand blijft na activatie."}}},mqtt:{title:"MQTT configuratie",description:"Dit paneel kan worden gebruikt voor configuratie van de MQTT-interface.",fields:{state_topic:{heading:"Toestand topic",description:"Topic waarop statusupdates worden gepubliceerd"},event_topic:{heading:"Gebeurtenis topic",description:"Topic waarop gebeurtenissen worden gepubliceerd"},command_topic:{heading:"Commando topic",description:"Topic waarop commando's voor in- / uitschakelen worden verzonden."},require_code:{heading:"Vereis code",description:"Vereis dat de code wordt verzonden met de opdracht."},state_payload:{heading:"Configureer de payload per toestand",item:"Definieer een payload voor toestand ''{state}''"},command_payload:{heading:"Configureer een payload per commando",item:"Definieer een payload voor commando ''{command}''"}}},areas:{title:"Gebieden",description:"Gebieden kunnen worden gebruikt om uw alarmsysteem in meerdere compartimenten op te delen.",no_items:"Er zijn nog geen gebieden gedefinieerd.",table:{remarks:"Opmerkingen",summary:"Dit gebied bevat {summary_sensors} en {summary_automations}.",summary_sensors:"{number} {number, plural,\n  one {sensor}\n  other {sensoren}\n}",summary_automations:"{number} {number, plural,\n  one {automatisering}\n  other {automatiseringen}\n}"},actions:{add:"Toevoegen"}}},dialogs:{create_area:{title:"Nieuw gebied",fields:{copy_from:"Kopieer instellingen van"}},edit_area:{title:"Bewerken van gebied ''{area}''",name_warning:"Opmerking: als u de naam wijzigt, wordt de entiteits-ID gewijzigd"},remove_area:{title:"Gebied verwijderen?",description:"Weet u zeker dat u dit gebied wilt verwijderen? Dit gebied bevat {sensors} sensoren en {automations} automatiseringen, die ook zullen worden verwijderd."},edit_master:{title:"Master configuratie"},disable_master:{title:"Master uitschakelen?",description:"Weet u zeker dat u het master alarm wilt verwijderen? Dit gebied bevat {automations} automatiseringen, die met deze actie worden verwijderd."}}},sensors:{title:"Sensoren",cards:{sensors:{description:"Momenteel geconfigureerde sensoren. Klik op een entiteit om wijzigingen aan te brengen.",table:{no_items:"Er zijn nog geen sensoren aan het alarm toegevoegd. Zorg ervoor dat u ze eerst toevoegt.",no_area_warning:"Sensor is niet aan een gebied toegewezen.",arm_modes:"Inschakelmodi",always_on:"(Altijd)"}},add_sensors:{title:"Voeg sensoren toe",description:"Voeg meer sensoren toe. Zorg ervoor dat uw sensoren een duidelijke naam hebben, zodat u ze kunt identificeren.",no_items:"Er zijn geen beschikbare HA-entiteiten die voor het alarm kunnen worden geconfigureerd. Zorg ervoor dat u entiteiten van het type binary_sensor opneemt.",table:{type:"Gedetecteerd type"},actions:{add_to_alarm:"Voeg aan alarm toe",filter_supported:"Verberg items met onbekend type"}},editor:{title:"Wijzig Sensor",description:"Configureren van de sensorinstellingen van ''{entity}''.",fields:{entity:{heading:"Entiteit",description:"Entiteit die verwant is aan deze sensor"},area:{heading:"Gebied",description:"Selecteer een gebied dat deze sensor bevat."},group:{heading:"Groep",description:"Groepeer met andere sensors voor gecombineerde triggers."},device_type:{heading:"Apparaat Type",description:"Kies een apparaattype om automatisch de juiste instellingen toe te passen.",choose:{door:{name:"Deur",description:"Een deur, poort of andere ingang die wordt gebruikt voor het betreden/verlaten van de woning."},window:{name:"Raam",description:"Een raam of een deur die niet wordt gebruikt om het huis binnen te komen, zoals een balkon."},motion:{name:"Beweging",description:"Aanwezigheidssensor of soortgelijk apparaat met een vertraging tussen activeringen."},tamper:{name:"Sabotage",description:"Detector van verwijdering van sensorkap, glasbreuksensor, enz."},environmental:{name:"Klimaat",description:"Rook/gassensor, lekkage detector, etc. (niet gerelateerd aan inbraakbeveiliging)."},other:{name:"Algemeen"}}},always_on:{heading:"Altijd aan",description:"Een sensor moet altijd het alarm activeren."},modes:{heading:"Ingeschakelde modi",description:"Alarmmodi waarin deze sensor actief is."},arm_on_close:{heading:"Inschakelen na sluiten",description:"Na deactivering van deze sensor wordt de resterende vertrek vertraging automatisch overgeslagen."},use_exit_delay:{heading:"Vertragingstijd bij vertrek",description:"De sensor mag actief zijn wanneer de vertrekperiode wordt gestart."},use_entry_delay:{heading:"Vertragingstijd bij binnenkomst",description:"Als de sensor actief wordt, activeert deze het alarm pas na de vertragingstijd voor binnenkomst."},allow_open:{heading:"Actieve toestand toestaan bij inschakelen",description:"Initiële toestand bij inschakelen van het alarm wordt genegeerd."},auto_bypass:{heading:"Automatisch omzeilen",description:"Elimineer de sensor als deze actief is tijdens het inschakelen van het alarm.",modes:"Modi waarin de sensor automatisch omzeild mag worden"},trigger_unavailable:{heading:"Activeren indien niet beschikbaar",description:"Wanneer de sensorstatus 'niet beschikbaar' wordt, wordt de sensor geactiveerd."}},actions:{toggle_advanced:"Geavanceerde instellingen",remove:"Verwijder",setup_groups:"Configureer groepen"},errors:{description:"Corrigeer de volgende fouten:",no_area:"Er is geen gebied geselecteerd",no_modes:"Er zijn geen modi geselecteerd waarvoor de sensor actief zou moeten zijn",no_auto_bypass_modes:"Er zijn geen modi geselecteerd waarin de sensor automatisch omzeild mag worden"}}},dialogs:{manage_groups:{title:"Beheer sensorgroepen",description:"In een sensorgroep moeten twee of meer sensoren worden geactiveerd binnen een tijdsperiode voordat het alarm wordt geactiveerd.",no_items:"Nog geen groepen ingesteld.",actions:{new_group:"Nieuwe groep"}},create_group:{title:"Nieuwe sensorgroep",fields:{name:{heading:"Naam",description:"Naam voor sensorgroep."},timeout:{heading:"Time-out",description:"Tijdsperiode waarin meerdere sensoren moeten worden geactiveerd om het alarm te activeren."},event_count:{heading:"Aantal",description:"Aantal verschillende sensoren dat moet worden geactiveerd om het alarm te activeren."},sensors:{heading:"Sensoren",description:"Selecteer de sensoren die deel moeten uitmaken van deze groep."}},errors:{invalid_name:"Verkeerde naam opgegeven.",insufficient_sensors:"Tenminste 2 sensoren moeten worden geselecteerd."}},edit_group:{title:"Bewerk sensorgroep ''{name}''"}}},codes:{title:"Codes",cards:{codes:{description:"Wijzig de instellingen voor de code.",fields:{code_arm_required:{heading:"Vereis code voor inschakelen",description:"Een correcte code moet worden ingevoerd om het alarm te kunnen inschakelen."},code_disarm_required:{heading:"Vereis code voor uitschakelen",description:"Een correcte code moet worden ingevoerd om het alarm te kunnen uitschakelen."},code_mode_change_required:{heading:"Vereis code voor mode omschakeling",description:"Een correcte code moet worden ingevoerd om de actieve beveiligingsmodus te veranderen."},code_format:{heading:"Code opmaak",description:"Stelt het invoertype in voor de Lovelace alarmkaart.",code_format_number:"pincode",code_format_text:"wachtwoord"}}},user_management:{title:"Gebruikersbeheer",description:"Elke gebruiker heeft zijn eigen code om het alarm in/uit te schakelen.",no_items:"Er zijn nog geen gebruikers",actions:{new_user:"nieuwe gebruiker"}},new_user:{title:"Maak een nieuwe gebruiker aan",description:"Gebruikers kunnen worden aangemaakt om toegang te verlenen tot het bedienen van het alarm.",fields:{name:{heading:"Naam",description:"Naam van de gebruiker."},code:{heading:"Code",description:"Code voor deze gebruiker."},confirm_code:{heading:"Bevestig de code",description:"Herhaal de code."},can_arm:{heading:"Code toestaan voor inschakeling",description:"Door deze code in te voeren, wordt het alarm geactiveerd"},can_disarm:{heading:"Code toestaan voor uitschakelen",description:"Door deze code in te voeren, wordt het alarm gedeactiveerd"},is_override_code:{heading:"Is een forceer code",description:"Als u deze code invoert, wordt het alarm geforceerd geactiveerd"},area_limit:{heading:"Beperk gebieden",description:"Beperk de gebruiker tot controle over alleen de gelesecteerde gebieden"}},errors:{no_name:"Geen naam opgegeven.",no_code:"Code moet minimaal 4 tekens/cijfers bevatten.",code_mismatch:"De codes komen niet overeen."}},edit_user:{title:"Wijzig Gebruiker",description:"Wijzig de configuratie voor gebruiker ''{name}''.",fields:{old_code:{heading:"Huidige code",description:"Huidige code, laat leeg om ongewijzigd te laten."}}}}},actions:{title:"Acties",cards:{notifications:{title:"Meldingen",description:"Met dit paneel kunt u meldingen beheren die moeten worden verzonden tijdens een bepaalde alarmgebeurtenis",table:{no_items:"Er zijn nog geen notificaties aangemaakt.",no_area_warning:"Actie is niet toegewezen aan een gebied."},actions:{new_notification:"nieuwe melding"}},actions:{description:"Dit paneel kan worden gebruikt om een apparaat te schakelen wanneer de status van het alarm veranderd.",table:{no_items:"Er zijn nog geen acties gemaakt."},actions:{new_action:"nieuwe actie"}},new_notification:{title:"Notificatie instellen",description:"Ontvang een notificatie wanneer het alarm wordt in- of uitgeschakeld, wordt geactiveerd etc.",trigger:"Conditie",action:"Taak",options:"Opties",fields:{event:{heading:"Gebeurtenis",description:"Wanneer moet de notificatie worden verzonden",choose:{armed:{name:"Alarm is ingeschakeld",description:"Het alarm is succesvol ingeschakeld"},disarmed:{name:"Alarm is uitgeschakeld",description:"Het alarm is uitgeschakeld"},triggered:{name:"Alarm is afgegaan",description:"Het alarm gaat af"},untriggered:{name:"Gestopt na afgaan",description:"Het alarm gaat niet meer af"},arm_failure:{name:"Kan niet inschakelen",description:"Het inschakelen van het alarm is mislukt vanwege een of meerdere blokkerende sensoren"},arming:{name:"Vertrek",description:"Vertrekvertraging ingegaan, tijd om het huis te verlaten."},pending:{name:"Binnenkomst",description:"Binnenkomstvertraging ingegaan, het alarm dient te worden uitgeschakeld."}}},mode:{heading:"Modi",description:"Beperk de actie tot specifieke inschakel modi."},title:{heading:"Titel",description:"Titel voor de notificatie"},message:{heading:"Bericht",description:"Tekst voor de notificatie",insert_wildcard:"Wildcard invoegen",placeholders:{armed:"Het alarm is ingeschakeld op {{arm_mode}}",disarmed:"Het alarm is nu uit",triggered:"Het alarm is geactiveerd! Oorzaak: {{open_sensors}}.",untriggered:"The alarm gaat niet langer af.",arm_failure:"Het alarm kon niet worden ingeschakeld. Oorzaak: {{open_sensors}}.",arming:"Het alarm wordt ingeschakeld, verlaat het huis.",pending:"Het alarm moet nu worden uitgeschakeld, anders wordt deze geactiveerd."}},open_sensors_format:{heading:"Opmaak voor open_sensors wildcard",description:"Kies welke sensor informatie wordt weergegeven in het bericht",options:{default:"Naam en status",short:"Alleen naam"}},arm_mode_format:{heading:"Vertaling voor arm_mode wildcard",description:"Kies in welke taal de inschakelmodus wordt weergegeven in het bericht"},target:{heading:"Doel",description:"Apparaat om het push-bericht naar te sturen"},name:{heading:"Naam",description:"Beschrijving voor deze notificatie",placeholders:{armed:"Stuur notificatie naar {target} bij inschakelen",disarmed:"Stuur notificatie naar {target} bij uitschakelen",triggered:"Stuur notificatie naar {target} bij alarm",untriggered:"Stuur notificatie naar {target} als het alarm stopt met afgaan",arm_failure:"Stuur notificatie naar {target} bij fout",arming:"Stuur notificatie naar {target} bij vertrek",pending:"Stuur notificatie naar {target} bij binnenkomst"}},delete:{heading:"Automatisering verwijderen",description:"Verwijder deze automatisering permanent"}},actions:{test:"Testen"}},new_action:{title:"Actie instellen",description:"Schakel verlichting of apparaatuur (bijv. sirene) wanneer het alarm wordt in- of uitgeschakeld of wordt geactiveerd etc.",fields:{event:{heading:"Gebeurtenis",description:"Wanneer moet de actie worden uitgevoerd"},area:{heading:"Gebied",description:"Het gebied waarop de gebeurtenis van toepassing is."},mode:{heading:"Mode",description:"Beperk de actie tot specifieke inschakel modi (optioneel)"},entity:{heading:"Entiteit",description:"Entiteit om actie op uit te voeren"},action:{heading:"Actie",description:"Actie die op de entiteit moet worden uitgevoerd",no_common_actions:"Acties kunnen alleen worden toegewezen in de YAML modus voor de geselecteerde entiteiten."},name:{heading:"Naam",description:"Beschrijving voor deze actie",placeholders:{armed:"Schakel {entity} naar {state} bij inschakelen",disarmed:"Schakel {entity} naar {state} bij uitschakelen",triggered:"Schakel {entity} naar {state} bij alarm",untriggered:"Set {entity} to {state} when triggering stops",arm_failure:"Schakel {entity} naar {state} bij fout",arming:"Schakel {entity} naar {state} bij vertrek",pending:"Schakel {entity} naar {state} bij binnenkomst"}}}}}}},mi={common:li,components:ci,title:"Alarmpaneel",panels:hi},ui=Object.freeze({__proto__:null,common:li,components:ci,title:"Alarmpaneel",panels:hi,default:mi}),pi={modes_short:{armed_away:"Preč",armed_home:"Doma",armed_night:"Noc",armed_custom_bypass:"Vlastné",armed_vacation:"Dovolenka"},enabled:"Aktivovaný",disabled:"Deaktivovaný"},gi={time_slider:{seconds:"sek",minutes:"min",infinite:"nekonečný",none:"nie je"},editor:{ui_mode:"Do UI",yaml_mode:"Do YAML",edit_in_yaml:"Upraviť v YAML"},table:{filter:{label:"Filtrovať položky",item:"Filter podľa {name}",hidden_items:"{number} {number, plural,\n  jeden {item is}\n  other {items are}\n} skriť"}}},vi={general:{title:"Hlavný",cards:{general:{description:"Tento panel definuje niektoré globálne nastavenia pre alarm.",fields:{disarm_after_trigger:{heading:"Deaktivujte po spustení",description:"Po uplynutí času spustenia alarm namiesto návratu do stráženého stavu deaktivujte."},enable_mqtt:{heading:"Povoliť MQTT",description:"Umožnite, aby bol panel alarmu ovládaný cez MQTT."},enable_master:{heading:"Povoliť hlavný alarm",description:"Vytvorí entitu na kontrolu všetkých oblastí súčasne."}},actions:{setup_mqtt:"MQTT Konfigurácia",setup_master:"Hlavná konfigurácia"}},modes:{title:"Režimy",description:"Tento panel možno použiť na nastavenie režimov stráženia alarmu.",modes:{armed_away:"Aktivovaný preč sa použije, keď všetci ľudia opustia dom. Všetky dvere a okná umožňujúce vstup do domu budú strážené, ako aj pohybové senzory vo vnútri domu.",armed_home:"Aktivovaný doma (známy aj ako zabezpečený pobyt) sa použije pri nastavovaní alarmu, keď sú ľudia v dome. Strážené budú všetky dvere a okná umožňujúce vstup do domu, nie však pohybové senzory vo vnútri domu.",armed_night:"Aktivovaný noc sa použije pri nastavovaní alarmu pred spaním. Všetky dvere a okná umožňujúce vstup do domu budú strážené a vybrané pohybové senzory (na prízemí) v dome.",armed_vacation:"Aktivovaný dovolenku možno použiť ako rozšírenie režimu stráženia v prípade dlhšej neprítomnosti. Časy oneskorenia a odozvy spúšťača je možné prispôsobiť podľa potreby.",armed_custom_bypass:"Extra režim na definovanie vlastného bezpečnostného obvodu."},number_sensors_active:"{number} {number, plural,\n  jeden {sensor}\n  other {sensors}\n} aktívny",fields:{status:{heading:"Stav",description:"Ovláda, či je možné v tomto režime zapnúť alarm."},exit_delay:{heading:"Oneskorenie odchodu",description:"Pri aktivácii alarmu v tomto časovom období senzory ešte nespustia alarm."},entry_delay:{heading:"Oneskorenie pri vstupe",description:"Čas oneskorenia, kým sa spustí alarm po aktivácii jedného zo senzorov."},trigger_time:{heading:"Spúšťací čas",description:"Čas, počas ktorého zostane alarm po aktivácii v spustenom stave."}}},mqtt:{title:"MQTT konfigurácia",description:"Tento panel je možné použiť na konfiguráciu rozhrania MQTT.",fields:{state_topic:{heading:"Stav topic",description:"Topic o ktorom zverejňuje aktualizácia stavu"},event_topic:{heading:"Udalosť topic",description:"Topicna na ktorý sa zverejňujú poplachové udalosti"},command_topic:{heading:"Príkazový topic",description:"Topic na ktorý Alarmo počúva príkazy na zapnutie/vypnutie."},require_code:{heading:"Vyžadovať kód",description:"Vyžadovať kódu ktorý sa má odoslať s príkazom."},state_payload:{heading:"Konfiguračný payload pre stav",item:"Definuje payload pre stav ''{state}''"},command_payload:{heading:"Konfiguračný payload pre príkaz",item:"Definuje payload pre príkaz ''{command}''"}}},areas:{title:"Oblasti",description:"Oblasti môžu byť použité na rozdelenie vášho poplašného systému do viacerých oddelení.",no_items:"Zatiaľ nie sú definované žiadne oblasti.",table:{remarks:"Poznámky",summary:"Táto oblasť obsahuje {summary_sensors} a {summary_automations}.",summary_sensors:"{number} {number, plural,\n  jeden {sensor}\n  other {sensors}\n}",summary_automations:"{number} {number, plural,\n  jeden {automation}\n  other {automations}\n}"},actions:{add:"Pridať"}}},dialogs:{create_area:{title:"Nová oblasť",fields:{copy_from:"Kopírovať nastavenia z"}},edit_area:{title:"Úprava oblasti ''{area}''",name_warning:"Poznámka: Zmena názvu zmení ID entity"},remove_area:{title:"Odstrániť oblasť?",description:"Naozaj chcete odstrániť túto oblasť? Táto oblasť obsahuje {sensors} senzory a {automations} automatizácie, ktoré budú tiež odstránené."},edit_master:{title:"Hlavná konfigurácia"},disable_master:{title:"Zakázať hlavnú?",description:"Naozaj chcete odstrániť hlavný alarm? Táto oblasť obsahuje {automations} automatizácie, ktoré budú touto akciou odstránené."}}},sensors:{title:"Senzory",cards:{sensors:{description:"Aktuálne nakonfigurované senzory. Kliknutím na položku vykonáte zmeny.",table:{no_items:"Nie sú tu žiadne senzory na zobrazenie.",no_area_warning:"Senzor nie je priradený k žiadnej oblasti.",arm_modes:"Režim alarmu",always_on:"(Vždy zapnutý)"}},add_sensors:{title:"pridať senzor",description:"Pridajte ďalšie senzory. Uistite sa, že vaše senzory majú vhodný názov, aby ste ich mohli identifikovať.",no_items:"Neexistujú žiadne dostupné entity HA, ktoré je možné nakonfigurovať pre alarm. Nezabudnite zahrnúť entity typu binárny_senzor.",table:{type:"Zistený typ"},actions:{add_to_alarm:"pridať k alarmu",filter_supported:"Skryť položky s neznámym typom"}},editor:{title:"Upraviť senzor",description:"Konfigurácia nastavení senzorov ''{entity}''.",fields:{entity:{heading:"Entita",description:"Entita spojená s týmto senzorom"},area:{heading:"Oblasť",description:"Vyberte oblasť, ktorá obsahuje tento senzor."},group:{heading:"Skupina",description:"Zoskupenie s ďalšími snímačmi pre kombinované spúšťanie."},device_type:{heading:"Typ zariadenia",description:"Vyberte typ zariadenia, aby sa automaticky použili príslušné nastavenia.",choose:{door:{name:"Dvere",description:"Dvere, brána alebo iný vchod, ktorý sa používa na vstup/výstup z domu."},window:{name:"Okno",description:"Okno alebo dvere, ktoré sa nepoužívajú na vstup do domu, ako je balkón."},motion:{name:"Senzor pohybu",description:"Snímač prítomnosti alebo podobné zariadenie s oneskorením medzi aktiváciami."},tamper:{name:"Tamper",description:"Detektor odstránenia krytu snímača, snímač rozbitia skla atď."},environmental:{name:"Environmentálne",description:"Snímač dymu/plynu, detektor úniku atď. (nesúvisí s ochranou proti vlámaniu)."},other:{name:"Generic"}}},always_on:{heading:"Vždy zapnutý",description:"Senzor by mal vždy spustiť alarm."},modes:{heading:"Povolené režimy",description:"Alarmové režimy, v ktorých je tento snímač aktívny."},arm_on_close:{heading:"Zabezpečiť po zatvorní",description:"Po deaktivácii tohto senzora sa zostávajúce odchodové oneskorenie automaticky preskočí."},use_exit_delay:{heading:"Použite odchodové oneskoreniey",description:"Snímač môže byť aktívny, keď sa spustí odchodové oneskorenie."},use_entry_delay:{heading:"Použite oneskorenie vstupu",description:"Aktivácia senzora spustí alarm po vstupnom oneskorení, nie priamo."},allow_open:{heading:"Po aktivácii povoliť otvorené",description:"Ak je senzor aktívny aj po odchodovom oneskorení, nespôsobí to zlyhanie stráženia."},auto_bypass:{heading:"Obísť automaticky",description:"Vylúčte tento senzor z alarmu, ak je otvorený počas zapnutia stráženia.",modes:"Režimy, v ktorých môže byť senzor obídený"},trigger_unavailable:{heading:"Spustiť, keď nie je k dispozícii",description:"Keď sa stav senzora stane „nedostupným“, senzor sa aktivuje."}},actions:{toggle_advanced:"Pokročilé nastavenia",remove:"Odstrániť",setup_groups:"Nastavte skupiny"},errors:{description:"Opravte nasledujúce chyby:",no_area:"Nie je vybratá žiadna oblasť",no_modes:"Nie sú zvolené žiadne režimy, pre ktoré by mal byť snímač aktívny",no_auto_bypass_modes:"Nie sú zvolené žiadne režimy, aby sa senzor mohol automaticky obísť"}}},dialogs:{manage_groups:{title:"Spravujte skupiny senzorov",description:"V skupine senzorov musí byť aktivovaných viacero senzorov v časovom úseku pred spustením alarmu.",no_items:"Zatiaľ žiadne skupiny",actions:{new_group:"Nová skupina"}},create_group:{title:"Nová skupina senzorov",fields:{name:{heading:"Názov",description:"Názov skupiny senzorov"},timeout:{heading:"Čas vypršal",description:"Časové obdobie, počas ktorého po sebe idúce aktivácie senzora spustia alarm."},event_count:{heading:"Číslo",description:"Množstvo rôznych senzorov, ktoré je potrebné aktivovať na spustenie alarmu."},sensors:{heading:"Senzory",description:"Vyberte snímače, ktoré sú obsiahnuté v tejto skupine."}},errors:{invalid_name:"Zadané neplatné meno.",insufficient_sensors:"Je potrebné vybrať aspoň 2 senzory."}},edit_group:{title:"Upravte skupinu senzorov ''{name}''"}}},codes:{title:"Kódy",cards:{codes:{description:"Zmeňte nastavenia kódu.",fields:{code_arm_required:{heading:"Použite kód zabezpečenia",description:"Vyžaduje sa kód na aktiváciu alarmu"},code_disarm_required:{heading:"Použite deaktivačný kód",description:"Vyžaduje sa kód na vypnutie alarmu"},code_mode_change_required:{heading:"Vyžadovať kód pre režim prepínania",description:"Ak chcete zmeniť aktívny režim stráženia, musíte zadať platný kód."},code_format:{heading:"Formát kódu",description:"Nastaví typ vstupu pre kartu alarmu Lovelace.",code_format_number:"PIN",code_format_text:"heslo"}}},user_management:{title:"Správa užívateľov",description:"Každý užívateľ má svoj vlastný kód na zapnutie/vypnutie alarmu.",no_items:"Zatiaľ nie sú žiadni používatelia",actions:{new_user:"nový užívateľ"}},new_user:{title:"Vytvoriť nového používateľa",description:"Je možné vytvoriť používateľov na poskytovanie prístupu k ovládaniu alarmu.",fields:{name:{heading:"Meno",description:"Meno používateľa."},code:{heading:"Kód",description:"Kód pre tohto používateľa."},confirm_code:{heading:"Potvrďte kód",description:"Opakujte kód."},can_arm:{heading:"Povoliť kód na zapnutie stráženia",description:"Zadaním tohto kódu sa aktivuje alarm"},can_disarm:{heading:"Povoliť kód na vypnutie stráženia",description:"Zadaním tohto kódu sa alarm deaktivuje"},is_override_code:{heading:"Povinný kód",description:"Zadaním tohto kódu aktivujete alarm"},area_limit:{heading:"Zakázané oblasti",description:"Obmedzte používateľa na ovládanie iba vybraných oblastí"}},errors:{no_name:"Nebolo zadané žiadne meno.",no_code:"Kód by mal mať minimálne 4 znaky/čísla.",code_mismatch:"Kódy sa nezhodujú."}},edit_user:{title:"Upraviť používateľa",description:"Zmena konfigurácie pre používateľa ''{name}''.",fields:{old_code:{heading:"Aktuálny kód",description:"Aktuálny kód, ponechajte pole prázdne, ak chcete ponechať nezmenené."}}}}},actions:{title:"Akcie",cards:{notifications:{title:"Upozornenia",description:"Pomocou tohto panela môžete spravovať upozornenia, ktoré sa majú odoslať, keď nastane určitá poplachová udalosť.",table:{no_items:"Zatiaľ nie sú vytvorené žiadne upozornenia.",no_area_warning:"Akcia nie je priradená žiadnej oblasti."},actions:{new_notification:"nová notifikácia"}},actions:{description:"Tento panel je možné použiť na prepnutie zariadenia pri zmene stavu alarmu.",table:{no_items:"Zatiaľ nie sú vytvorené žiadne akcie."},actions:{new_action:"nová akcia"}},new_notification:{title:"Konfigurácia upozornenia",description:"Dostávať upozornenie pri zapnutí/vypnutí alarmu, aktivácii atď.",trigger:"Podmienka",action:"Úloha",options:"Možnosti",fields:{event:{heading:"Udalosť",description:"Kedy treba poslať oznámenie",choose:{armed:{name:"Alarm je aktivovaný",description:"Alarm je úspešne aktivovaný"},disarmed:{name:"Alarm je deaktivovaný",description:"Alarm je deaktivovaný"},triggered:{name:"Alarm je spustený",description:"Alarm sa spustí"},untriggered:{name:"Alarm už nie je spustený",description:"Spustený stav poplachu skončil"},arm_failure:{name:"Nepodarilo sa zapnúť",description:"Zapnutie alarmu zlyhalo kvôli jednému alebo viacerým otvoreným senzorom"},arming:{name:"Oneskorenie odchodu začalo",description:"Spustilo sa oneskorenie odchodu, pripravený opustiť dom."},pending:{name:"Začalo sa oneskorenie vstupu",description:"Vstupné oneskorenie začalo, alarm sa spustí čoskoro."}}},mode:{heading:"Režim",description:"Obmedzte akciu na konkrétne režimy spustenia (voliteľné)"},title:{heading:"Názov",description:"Názov správy s upozornením"},message:{heading:"Správa",description:"Obsah správy s upozornením",insert_wildcard:"Vložte zástupný znak",placeholders:{armed:"Alarm je nastavený na {{arm_mode}}",disarmed:"Alarm je teraz VYPNUTÝ",triggered:"Spustil sa alarm! dôvod: {{open_sensors}}.",untriggered:"Alarm už nie je spustený.",arm_failure:"Alarm teraz nebolo možné aktivovať z nasledujúcich dôvodov: {{open_sensors}}.",arming:"Alarm bude čoskoro aktivovaný, prosím opustite dom.",pending:"Alarm sa spustí, rýchlo ho deaktivujte!"}},open_sensors_format:{heading:"Formát pre zástupný znak open_sensors",description:"Vyberte, ktoré informácie o senzore sa vložia do správy",options:{default:"Meno a stav",short:"Iba mená"}},arm_mode_format:{heading:"Preklad pre zástupný znak režimu alarmu",description:"Vyberte, v akom jazyku sa do správy vloží režim stráženia"},target:{heading:"Cieľ",description:"Zariadenie, do ktorého sa má odoslať upozornenie"},name:{heading:"Názov",description:"Popis tohto upozornenia",placeholders:{armed:"Upozorniť {target} pri aktivácii",disarmed:"Upozorniť {target} pri deaktivácii",triggered:"Upozorniť {target} pri spustení",untriggered:"Upozorniť {target}, keď sa spúšťanie zastaví",arm_failure:"Upozorniť {target} na zlyhanie",arming:"Upozorniť {target} pri odchode",pending:"Upozorniť {target} pri príchode"}},delete:{heading:"Odstrániť automatizáciu",description:"Natrvalo odstráňte túto automatizáciu"}},actions:{test:"Skús to"}},new_action:{title:"Konfigurovať akciu",description:"Zapnite svetlá alebo zariadenia (napríklad sirény) pri zapínaní/vypínaní stráženia, pri aktivácii atď.",fields:{event:{heading:"Udalosť",description:"Kedy sa má akcia vykonať"},area:{heading:"Oblasť",description:"Oblasť, pre ktorú sa udalosť vzťahuje."},mode:{heading:"Režim",description:"Obmedzte akciu na konkrétne režimy stráženia (voliteľné)"},entity:{heading:"Entity",description:"Entita, na ktorej sa má vykonať akcia"},action:{heading:"Akcia",description:"Akcia, ktorá sa má vykonať na entite",no_common_actions:"Akcie môžu byť priradené iba v režime YAML pre vybrané entity."},name:{heading:"Názov",description:"Popis tejto akcie",placeholders:{armed:"Nastavte {entity} na {state} pri aktivácii",disarmed:"Nastavte {entity} na {state} pri deaktivácii",triggered:"Nastavte {entity} na {state} pri spustení",untriggered:"Nastavte {entity} na {state}, keď sa spúšťanie zastaví",arm_failure:"Nastavte {entity} na {state} pri zlyhani",arming:"Nastavte {entity} na {state} pri odchode",pending:"Nastavte {entity} na {state} pri príchode"}}}}}}},_i={common:pi,components:gi,title:"Alarový panel",panels:vi},fi=Object.freeze({__proto__:null,common:pi,components:gi,title:"Alarový panel",panels:vi,default:_i}),bi={modes_short:{armed_away:"Borta",armed_home:"Hemma",armed_night:"Natt",armed_custom_bypass:"Anpassad",armed_vacation:"Semester"},enabled:"Aktiverat",disabled:"Inaktiverat"},yi={time_slider:{seconds:"sek",minutes:"min",infinite:"oändligt",none:"inget"},editor:{ui_mode:"Till UI",yaml_mode:"Till YAML",edit_in_yaml:"Redigera i YAML"},table:{filter:{label:"Filtrera sensorer",item:"Filtrera med {name}",hidden_items:"{number} {number, plural,\n  en {item is}\n  other {items are}\n} dolda"}}},ki={general:{title:"Generellt",cards:{general:{description:"Denna panel definierar några globala inställningar för larmet.",fields:{disarm_after_trigger:{heading:"Larma av efter utlös",description:"Efter utlös tiden har gått ut, larma av larmet istället för att återgå till larmat läge."},enable_mqtt:{heading:"Aktivera MQTT",description:"Tillåt alarm panelen att kontrolleras via MQTT."},enable_master:{heading:"Aktivera alarm master",description:"Skapar en entity för att kontrollera alla områden samtidigt."}},actions:{setup_mqtt:"MQTT konfiguration",setup_master:"Master konfiguration"}},modes:{title:"Lägen",description:"Denna panel kan användas för att konfigurera larmets olika larmlägen.",modes:{armed_away:"Larmat borta används när alla personer lämnat huset. Alla dörrar och fönster som tillåter tillgång till huset kommer att larmas, det samma gäller rörelsesensorer inne i huset.",armed_home:"Larmat hemma används när det finns personer kvar i huset. Alla dörrar och fönster som tillåter tillgång till huset kommer att larmas, dock inga rörelsesensorer inne i huset.",armed_night:"Larmat natt används när du aktiverar larmen innan du lägger dig. Alla dörrar och fönster som tillåter tillgång till huset kommer att larmas, det samma gäller utvalda rörelsesensorer inne i huset.",armed_vacation:"Larmat semester kan användas som en förlängning av läget för larmat borta vid längre frånvaro. Fördröjningstiderna och utlössvaren kan anpassas (efter önskemål) för att vara borta längre tid från hemmet.",armed_custom_bypass:"Ett extra läge för för att definiera sin egen säkerhetsperimeter."},number_sensors_active:"{number} {number, plural,\n  en {sensor}\n  other {sensorer}\n} aktiv",fields:{status:{heading:"Status",description:"Styr om larmet kan aktiveras i detta läge."},exit_delay:{heading:"Lämna fördröjning",description:"Efter att du har aktiverat larmet kommer dina sensorer inte utlösa ditt larm inom denna tid."},entry_delay:{heading:"Ankomst fördröjning",description:"Fördröjning i tid tills att ditt larm triggas efter att en av dina sensorer har aktiverats."},trigger_time:{heading:"Utlös tid",description:"Tid som ditt larm kommer vara i utlöst läge efter att ett larm har utlösts."}}},mqtt:{title:"MQTT konfiguration",description:"Denna panel kan användas för att anpassa konfigurationen av MQTT.",fields:{state_topic:{heading:"Status topic",description:"Topic på vilket status uppdateringar publiceras till."},event_topic:{heading:"Event topic",description:"Topic på vilket alarm events publiceras till."},command_topic:{heading:"Kommando topic",description:"Topic på vilket Alarmo lyssnar på för larma/larma av kommandon."},require_code:{heading:"Kräv kod",description:"Kräv att koden ska skickas med kommandot."},state_payload:{heading:"Konfigurera payload per state",item:"Definiera en payload för state ''{state}''"},command_payload:{heading:"Konfigurera payload per kommando",item:"Definiera en payload för kommando ''{command}''"}}},areas:{title:"Områden",description:"Områden kan användas för att dela upp ditt larm till flera områden.",no_items:"Det är inga områden definierade än.",table:{remarks:"Anmärkningar",summary:"Detta område innehåller {summary_sensors} och {summary_automations}.",summary_sensors:"{number} {number, plural,\n  en {sensor}\n  other {sensorer}\n}",summary_automations:"{number} {number, plural,\n  en {automation}\n  other {automationer}\n}"},actions:{add:"Lägg till"}}},dialogs:{create_area:{title:"Nytt område",fields:{copy_from:"Kopiera inställningarna från"}},edit_area:{title:"Redigera område ''{area}''",name_warning:"OBS: Ändrar du namn kommer entitetens ID att ändras"},remove_area:{title:"Ta bort område?",description:"Är du säker att du vill ta bort detta område? Detta område innehåller {sensors} sensorer och {automations} automationer, som också kommer att tas bort."},edit_master:{title:"Master konfiguration"},disable_master:{title:"Inaktivera master?",description:"Är du säker att du vill ta bort master alarm? Detta område innehåller {automations} automationer, som kommer att tas bort med detta val."}}},sensors:{title:"Sensorer",cards:{sensors:{description:"Nuvarande konfigurerade sensorer. Klicka på ett entity för att göra förändringar.",table:{no_items:"Det finns inga sensorer att visa här.",no_area_warning:"Sensor är inte tilldelat till något område.",arm_modes:"Larmläge",always_on:"(Alltid)"}},add_sensors:{title:"Lägg till sensorer",description:"Lägg till mer sensorer. Säkerställ att dina sensorer har ett friendly_name, så du kan identifiera dem.",no_items:"Det finns inga tillgängliga HA entities som kan konfigureras för larmet. Säkerställ att inkludera entiteter av typen binary_sensor.",table:{type:"Detekteringstyp"},actions:{add_to_alarm:"Addera till larmet",filter_supported:"Dölj sensorer av typen unknown"}},editor:{title:"Justera Sensor",description:"Justera inställningarna för sensor ''{entity}''.",fields:{entity:{heading:"Entitet",description:"Entitet associerad med denna sensor"},area:{heading:"Område",description:"Välj ett område som innehåller denna sensor."},group:{heading:"Grupp",description:"Gruppera med andra sensorer för kombinerad trigger."},device_type:{heading:"Enhetstyp",description:"Välj en enhetstyp att automatiskt applicera rekommenderade inställningar på.",choose:{door:{name:"Dörr",description:"En dörr, grind eller annan entre som används för att gå in/lämna hemmet."},window:{name:"Fönster",description:"Ett fönster eller en dörr som inte används för att gå in/lämna huset, t.ex. en balkongdörr."},motion:{name:"Rörelse",description:"Närvarosensor eller liknande som har fördröjning mellan sina aktiveringar."},tamper:{name:"Manipulering",description:"Detektor av sensorskydd, glaskross sensor etc."},environmental:{name:"Miljö",description:"Rök/gas sensor eller läckage sensor etc. (Inte relaterat till inbrottsskydd)."},other:{name:"Generell"}}},always_on:{heading:"Larma alltid",description:"Sensorn ska alltid utlösa larmet."},modes:{heading:"Aktiverat läge",description:"Larmläge när sensorn ska vara aktiv."},arm_on_close:{heading:"Larma efter stängning",description:"Resterande lämna fördröjning skippas automatiskt när denna sensor inaktiveras."},use_exit_delay:{heading:"Använd lämna fördröjning",description:"Sensorn är tillåten att vara aktiv när lämna fördröjningen startar."},use_entry_delay:{heading:"Använd ankomst fördröjning",description:"Sensor aktivering utlöser larmet efter ankomst fördröjningen istället för direkt."},allow_open:{heading:"Tillåt öppnad efter larmning.",description:"Om sensorn fortfarande är aktiv efter lämna fördröjningen kommer det inte misslyckas att larma."},auto_bypass:{heading:"Exkludera automatiskt",description:"Exkludera denna sensor från larmet om den är öppen vid pålarmning.",modes:"Lägen där sensor kan bli exkluderad"},trigger_unavailable:{heading:"Trigga vid otillgänglig",description:"Detta kommer aktiveras när sensorns status blir 'unavailable'."}},actions:{toggle_advanced:"Avancerade inställningar",remove:"Ta bort",setup_groups:"Hantera grupper"},errors:{description:"Var vänlig att justera följande fel:",no_area:"Inget område är vald",no_modes:"Inga lägen är valda när sensorn ska vara aktiv",no_auto_bypass_modes:"Inga lägen är valda när sensorn eventuellt automatiskt ska förbikopplas"}}},dialogs:{manage_groups:{title:"Hantera sensor grupper",description:"I en sensor grupp måste flera sensorer bli aktiverade inom en tidsperiod för att larmet ska triggas.",no_items:"Inga grupper ännu",actions:{new_group:"Ny grupp"}},create_group:{title:"Ny sensor grupp",fields:{name:{heading:"Namn",description:"Namn för sensor gruppen"},timeout:{heading:"Time-out",description:"Tidsperiod för de sammankopplade sensorernas aktivitet ska utlösa larmet."},event_count:{heading:"Siffra",description:"Mängd olika sensorer som behöver aktiveras för att utlösa larmet."},sensors:{heading:"Sensorer",description:"Välj sensorer som tillhöra gruppen."}},errors:{invalid_name:"Ogiltigt namn specificerat.",insufficient_sensors:"Minst två sensorer behöver väljas."}},edit_group:{title:"Justera sensor grupp ''{name}''"}}},codes:{title:"Koder",cards:{codes:{description:"Ändra inställningar för kod.",fields:{code_arm_required:{heading:"Använd pålarmningskod",description:"Kräv en kod för att aktivera larmet"},code_disarm_required:{heading:"Använd avlarmningskod",description:"Kräv en kod för att inaktivera larmet"},code_mode_change_required:{heading:"Kräv kod för att byta läge",description:"En giltig kod måste tillhandahållas för att ändra aktiveringsläget."},code_format:{heading:"Kodformat",description:"Ändra inmatningstyp för Lovelace alarm kortet.",code_format_number:"pinkod",code_format_text:"lösenord"}}},user_management:{title:"Användarhantering",description:"Varje användare har sin egen kod för aktivera/inaktivera larmet.",no_items:"Det finns inga användare än",actions:{new_user:"Ny användare"}},new_user:{title:"Skapa en ny användare",description:"Användare kan skapas för att ge tillgång att styra larmet.",fields:{name:{heading:"Namn",description:"Namn på användaren"},code:{heading:"Kod",description:"Koden för användaren."},confirm_code:{heading:"Repetera koden",description:"Repetera koden."},can_arm:{heading:"Tillåt kod för pålarmning",description:"Denna kod aktiverar larmet"},can_disarm:{heading:"Tillåt kod för avlarmning",description:"Denna kod inaktiverar larmet"},is_override_code:{heading:"Tvingande kod",description:"Denna kod tvingar aktivering av larmet"},area_limit:{heading:"Begränsade områden",description:"Begränsa användare att hantera utvalda områden"}},errors:{no_name:"Inget namn angivet.",no_code:"Koden ska vara minst 4 tecken eller siffror.",code_mismatch:"Koderna matchar inte."}},edit_user:{title:"Justera användare",description:"Ändra inställningar för användare ''{name}''.",fields:{old_code:{heading:"Nuvarande kod",description:"Nuvarande kod, lämna tomt för att inte ändra."}}}}},actions:{title:"Åtgärder",cards:{notifications:{title:"Notifikationer",description:"Du använder denna panel för att hantera notifikationer som ska skickas vid utvalda larmevents.",table:{no_items:"Det är inga notifikationer skapade än.",no_area_warning:"Åtgärd är inte tilldelad till något område."},actions:{new_notification:"ny notifikation"}},actions:{description:"I denna panel kan du trigga olika beteende på enheter baserat på olika events från ditt larm.",table:{no_items:"Det finns inga åtgärder skapade ännu."},actions:{new_action:"ny åtgärd"}},new_notification:{title:"Konfigurera notifikationer",description:"Ta emot en notifikation när ditt larm aktivera/inaktiveras eller om en sensor aktiveras eller liknande.",trigger:"Villkor",action:"Åtgärd",options:"Inställningar",fields:{event:{heading:"Event",description:"När ska notifikationen skickas",choose:{armed:{name:"Larmet är aktiverat",description:"Larmet aktiveras framgångsrikt"},disarmed:{name:"Larmet är inaktiverat",description:"Larmet är inaktiverat"},triggered:{name:"Larmet har utlösts",description:"Larmet har utlösts"},untriggered:{name:"Larmet inte längre utlöst",description:"Larmet inte längre utlöst"},arm_failure:{name:"Misslyckas att aktivera larm",description:"Larmet misslyckas att aktiveras på grund av någon sensor"},arming:{name:"Lämna fördröjning startas",description:"Lämna fördröjning startas, redo att lämna huset."},pending:{name:"Ankomst fördröjning startas",description:"Ankomst fördröjning startas, larmet kommer triggas snart."}}},mode:{heading:"Läge",description:"Begränsa åtgärd till specifikt larmläge (valfritt)"},title:{heading:"Titel",description:"Titel för notifikationsmeddelandet"},message:{heading:"Meddelande",description:"Innehåll av notifikationsmeddelandet",insert_wildcard:"Lägg in wildcard",placeholders:{armed:"Larmet har bytt status till {{arm_mode}}",disarmed:"Larmet är nu AVSTÄNGT",triggered:"Larmet har utlösts! Anledning: {{open_sensors}}.",untriggered:"Larmet inte längre utlöst.",arm_failure:"Larmet kunde inte aktiveras nu, detta på grund av: {{open_sensors}}.",arming:"Larmet kommer aktiveras snart, lämna huset.",pending:"Larmet kommer snart utlösas, inaktivera larmet snarast!"}},open_sensors_format:{heading:"Format för open_sensors wildcard",description:"Välj vilken sensorinformation som ska infogas i meddelandet",options:{default:"Namn och tillstånd",short:"Endast namn"}},arm_mode_format:{heading:"Översättning för larmläge wildcard",description:"Välj vilket språk som larmläge ska infogas i meddelandet"},target:{heading:"Mål",description:"Enhet att skicka push-meddelandet till"},name:{heading:"Namn",description:"Beskrivning av notifikationen",placeholders:{armed:"Notifiera {target} vid aktivering av larm",disarmed:"Notifiera {target} vid inaktivering av larm",triggered:"Notifiera {target} vid utlöst larm",untriggered:"Notifiera {target} när larm inte längre utlöst",arm_failure:"Notifiera {target} vid fel av larm",arming:"Notifiera {target} vid utpassering",pending:"Notifiera {target} vid ankomst"}},delete:{heading:"Ta bort automation",description:"Ta bort automation permanent"}},actions:{test:"Testa"}},new_action:{title:"Konfigurera action",description:"Aktivera lampor eller andra enheter som sirener eller högtalare vid aktivering/inaktivering av larmet, triggning av larmet osv.",fields:{event:{heading:"Event",description:"När ska denna action aktiveras"},area:{heading:"Område",description:"Område som detta event ska appliceras på."},mode:{heading:"Läge",description:"Begränsa åtgärd till specifika larmlägen (frivilligt)"},entity:{heading:"Entitet",description:"Entitet att utföra åtgärd på"},action:{heading:"Åtgärd",description:"Åtgärd att utföra på entitet",no_common_actions:"Åtgärder kan enbart bli applicerade i YAML läge för utvalda entiteter."},name:{heading:"Namn",description:"Beskrivning av denna åtgärd",placeholders:{armed:"Sätt {entity} till {state} vid aktivering av larmet",disarmed:"Sätt {entity} till {state} vid inaktivering av larmet",triggered:"Sätt {entity} till {state} när larmet utlöses",untriggered:"Sätt {entity} till {state} när larmet inte längre utlöst",arm_failure:"Sätt {entity} till {state} vid fel av larmet",arming:"Sätt {entity} till {state} vid utpassering",pending:"Sätt {entity} till {state} vid ankomst"}}}}}}},wi={common:bi,components:yi,title:"Alarm panel",panels:ki},Ai=Object.freeze({__proto__:null,common:bi,components:yi,title:"Alarm panel",panels:ki,default:wi}),$i={modes_short:{armed_away:"Đi vắng",armed_home:"Ở nhà",armed_night:"Ban đêm",armed_custom_bypass:"Tùy chỉnh",armed_vacation:"Đi nghỉ"},enabled:"Đang bật",disabled:"Đang tắt"},Ti={time_slider:{seconds:"giây",minutes:"phút",infinite:"vô hạn",none:"không có"},editor:{ui_mode:"Chế độ giao diện",yaml_mode:"Chế độ YAML",edit_in_yaml:"Soạn bằng YAML"},table:{filter:{label:"Lọc mục",item:"Lọc theo {name}",hidden_items:"{number} {number, plural,\n  one {mục}\n  other {mục}\n} bị ẩn"}}},Ei="Bảng điều khiển báo động",ji={general:{title:"Tổng quan",cards:{general:{description:"Bảng điều khiển này đặt một số thiết lập toàn cục cho hệ thống báo động.",fields:{disarm_after_trigger:{heading:"Tắt bảo vệ sau khi báo động",description:"Sau khi đã hết thời gian kích hoạt báo động, tắt bảo vệ thay vì trở lại trạng thái bảo vệ trước đó."},enable_mqtt:{heading:"Bật MQTT",description:"Cho phép quản lý bảng điều khiển báo động qua MQTT."},enable_master:{heading:"Bật báo động tổng",description:"Tạo một thực thể để quản lý đồng thời mọi khu vực."}},actions:{setup_mqtt:"Cấu hình MQTT",setup_master:"Cấu hình báo động tổng"}},modes:{title:"Chế độ",description:"Bảng điều khiển này dùng để cài đặt các chế độ bảo vệ của hệ thống.",modes:{armed_away:"Bảo vệ khi đi vắng được dùng khi mọi người đã rời khỏi nhà. Tất cả cửa lớn và cửa sổ dẫn vào nhà, cũng như các cảm biến chuyển động trong nhà, sẽ được theo dõi.",armed_home:"Bảo vệ khi ở nhà được dùng để thiết lập báo động khi có người ở nhà. Tất cả cửa lớn và cửa sổ dẫn vào nhà, nhưng không theo dõi cảm biến chuyển động trong nhà, sẽ được theo dõi.",armed_night:"Bảo vệ vào ban đêm được dùng để thiết lập báo động trước khi đi ngủ. Tất cả cửa lớn và cửa sổ dẫn vào nhà, và một số cảm biến chuyển động (tầng dưới) trong nhà, sẽ được theo dõi.",armed_vacation:"Bảo vệ khi đi nghỉ có thể được coi là mở rộng của chế độ bảo vệ khi đi vắng khi bạn vắng nhà trong thời gian dài. Thời gian đếm giờ và phản ứng khi có kích hoạt sẽ được thay đổi (nếu muốn) khi ở xa nhà.",armed_custom_bypass:"Chế độ bổ sung để xác định phạm vi an ninh riêng của bạn."},number_sensors_active:"{number} {number, plural,\n  one {cảm biến}\n  other {cảm biến}\n} đang hoạt động",fields:{status:{heading:"Tình trạng",description:"Quyết định xem hệ thống có bảo vệ trong chế độ này không."},exit_delay:{heading:"Đếm giờ đi ra",description:"Khi đang bật bảo vệ, trong khoảng thời gian này các cảm biến sẽ chưa kích hoạt báo động."},entry_delay:{heading:"Đếm giờ đi vào",description:"Thời gian đếm lùi từ khi cảm biến bị kích hoạt cho đến khi báo động."},trigger_time:{heading:"Thời gian kích hoạt báo động",description:"Thời gian duy trì trạng thái báo động sau khi bị kích hoạt."}}},mqtt:{title:"Cấu hình MQTT",description:"Bảng điều khiển này dùng để cấu hình giao diện MQTT.",fields:{state_topic:{heading:"Chủ đề trạng thái",description:"Chủ đề đăng tải cập nhật trạng thái"},event_topic:{heading:"Chủ đề sự kiện",description:"Chủ đề đăng tải sự kiện báo động"},command_topic:{heading:"Chủ đề câu lệnh",description:"Chủ đề để Alarmo lắng nghe lệnh bật/tắt bảo vệ."},require_code:{heading:"Yêu cầu mã",description:"Yêu cầu phải gửi mã cùng với câu lệnh."},state_payload:{heading:"Cấu hình phụ tải trong mỗi trạng thái",item:"Định nghĩa phụ tải cho trạng thái ''{state}''"},command_payload:{heading:"Cấu hình phụ tải trong mỗi câu lệnh",item:"Định nghĩa phụ tải cho câu lệnh ''{command}''"}}},areas:{title:"Khu vực",description:"Khu vực có thể dùng để chia hệ thống báo động làm nhiều phần.",no_items:"Hiện chưa xác định khu vực.",table:{remarks:"Lưu ý",summary:"Khu vực này có {summary_sensors} và {summary_automations}.",summary_sensors:"{number} {number, plural,\n  one {cảm biến}\n  other {cảm biến}\n}",summary_automations:"{number} {number, plural,\n  one {tự động hóa}\n  other {tự động hóa}\n}"},actions:{add:"Thêm"}}},dialogs:{create_area:{title:"Khu vực mới",fields:{copy_from:"Chép thiết lập từ"}},edit_area:{title:"Sửa khu vực ''{area}''",name_warning:"Ghi chú: đổi tên sẽ làm đổi mã thực thể"},remove_area:{title:"Xóa khu vực?",description:"Bạn có chắc chắn muốn xóa khu vực này? Khu vực này có {sensors} cảm biến và {automations} tự động hóa, sẽ đều bị xóa theo."},edit_master:{title:"Cấu hình báo động tổng"},disable_master:{title:"Tắt báo động tổng?",description:"Bạn có chắc chắn muốn xóa báo động tổng không? Khu vực này có {sensors} cảm biến và {automations} tự động hóa, sẽ đều bị xóa theo."}}},sensors:{title:"Cảm biến",cards:{sensors:{description:"Cảm biến đã được cấu hình. Nhấn vào mục để thay đổi.",table:{no_items:"Không có cảm biến nào.",no_area_warning:"Chưa gán cảm biến vào bất kỳ khu vực nào.",arm_modes:"Chế độ bảo vệ",always_on:"(Luôn luôn)"}},add_sensors:{title:"Thêm cảm biến",description:"Bổ sung cảm biến. Hãy đảm bảo cảm biến của bạn có tên phù hợp để dễ nhận ra.",no_items:"Không có thực thể HA sẵn có nào có thể cấu hình cho hệ thống báo động. Hãy đảm bảo đưa vào thực thể thuộc kiểu binary_sensor.",table:{type:"Kiểu được phát hiện"},actions:{add_to_alarm:"thêm vào hệ thống",filter_supported:"Ẩn mục không rõ kiểu"}},editor:{title:"Sửa cảm biến",description:"Cấu hình thiết lập cảm biến ''{entity}''.",fields:{entity:{heading:"Thực thể",description:"Thực thể được liên kết với cảm biến này"},area:{heading:"Khu vực",description:"Chọn một khu vực để đưa cảm biến này vào."},group:{heading:"Nhóm",description:"Gom chung với các cảm biến khác để kích hoạt chung."},device_type:{heading:"Kiểu thiết bị",description:"Chọn một kiểu thiết bị để tự động áp dụng thiết lập phù hợp.",choose:{door:{name:"Cửa lớn",description:"Cửa ra vào, cổng hoặc nơi khác dùng để ra vào nhà."},window:{name:"Cửa sổ",description:"Cửa sổ, hoặc cửa lớn nhưng không dùng để ra vào nhà, như ban công chẳng hạn."},motion:{name:"Chuyển động",description:"Cảm biến hiện diện hoặc thiết bị tương tự có thời gian nghỉ giữa các lần kích hoạt."},tamper:{name:"Phá hoại",description:"Bộ phát hiện mở nắp cảm biến, cảm biến vỡ kính, v.v."},environmental:{name:"Môi trường",description:"Cảm biến khói/khí đốt, phát hiện rò rỉ, v.v. (không liên quan đến chống trộm)."},other:{name:"Chung chung"}}},always_on:{heading:"Luôn bật",description:"Cảm biến luôn kích hoạt báo động."},modes:{heading:"Chế độ được bật",description:"Các chế độ báo động có kích hoạt cảm biến này."},arm_on_close:{heading:"Bảo vệ sau khi đóng",description:"Sau khi tắt kích hoạt cảm biến này, đếm giờ đi ra sẽ được tự động bỏ qua."},use_exit_delay:{heading:"Dùng đếm giờ đi ra",description:"Cảm biến được phép hoạt động khi bắt đầu đếm giờ đi ra."},use_entry_delay:{heading:"Dùng đếm giờ đi vào",description:"Kích hoạt cảm biến sẽ kích hoạt báo động sau khi đã hết thời gian đếm giờ đi vào, chứ không kích hoạt ngay."},allow_open:{heading:"Cho phép mở lúc đầu",description:"Trạng thái mở lúc bật bảo vệ sẽ được bỏ qua (những lần kích hoạt cảm biến sau đó sẽ kích hoạt báo động)."},auto_bypass:{heading:"Tự động bỏ qua",description:"Bỏ qua cảm biến này không kích hoạt báo động nếu nó đang mở khi bắt đầu bảo vệ.",modes:"Các chế độ mà cảm biến này có thể được bỏ qua"},trigger_unavailable:{heading:"Báo động khi không khả dụng",description:"Khi trạng thái của cảm biến trở thành 'không khả dụng', nó sẽ kích hoạt cảm biến."}},actions:{toggle_advanced:"Thiết lập nâng cao",remove:"Xóa",setup_groups:"Cài đặt nhóm"},errors:{description:"Vui lòng sửa các lỗi sau:",no_area:"Chưa chọn khu vực",no_modes:"Chưa chọn chế độ để bật cảm biến",no_auto_bypass_modes:"Chưa chọn chế độ để cảm biến được tự động bỏ qua"}}},dialogs:{manage_groups:{title:"Quản lý nhóm cảm biến",description:"Trong một nhóm cảm biến, các cảm biến này phải được kích hoạt trong cùng khoảng thời gian thì mới kích hoạt báo động.",no_items:"Chưa có nhóm",actions:{new_group:"Nhóm mới"}},create_group:{title:"Nhóm cảm biến mới",fields:{name:{heading:"Tên",description:"Tên của nhóm cảm biến"},timeout:{heading:"Thời hạn",description:"Khoảng thời gian các cảm biến phải lần lượt được kích hoạt thì mới kích hoạt báo động."},event_count:{heading:"Số lượng",description:"Số lượng cảm biến khác nhau cần được kích hoạt để kích hoạt báo động."},sensors:{heading:"Cảm biến",description:"Chọn cảm biến để đưa vào nhóm này."}},errors:{invalid_name:"Đã cung cấp tên không hợp lệ.",insufficient_sensors:"Phải chọn ít nhất 2 cảm biến."}},edit_group:{title:"Sửa nhóm cảm biến ''{name}''"}}},codes:{title:"Mã",cards:{codes:{description:"Thay đổi thiết lập mã.",fields:{code_arm_required:{heading:"Yêu cầu nhập mã để bật",description:"Phải nhập mã đúng để bật hệ thống báo động."},code_disarm_required:{heading:"Yêu cầu nhập mã để tắt",description:"Phải nhập mã đúng để tắt hệ thống báo động."},code_mode_change_required:{heading:"Yêu cầu nhập mã để chuyển chế độ",description:"Phải nhập mã đúng để thay đổi chế độ bảo vệ đang hoạt động."},code_format:{heading:"Định dạng mã",description:"Thiết lập kiểu nhập liệu cho thẻ bảo vệ Lovelace.",code_format_number:"mã số",code_format_text:"mật khẩu"}}},user_management:{title:"Quản lý người dùng",description:"Mỗi người dùng sẽ có một mã riêng để bật/tắt hệ thống báo động.",no_items:"Chưa có người dùng nào",actions:{new_user:"người dùng mới"}},new_user:{title:"Tạo người dùng mới",description:"Người dùng phải được tạo để cấp quyền vận hành hệ thống báo động.",fields:{name:{heading:"Tên",description:"Tên người dùng."},code:{heading:"Mã",description:"Mã dành cho người dùng này."},confirm_code:{heading:"Xác nhận mã",description:"Lặp lại mã."},can_arm:{heading:"Cho phép nhập mã để bật",description:"Nhập mã này để bật bảo vệ"},can_disarm:{heading:"Cho phép nhập mã để tắt",description:"Nhập mã này để tắt bảo vệ"},is_override_code:{heading:"Có phải mã vượt quyền không",description:"Nhập mã này sẽ buộc hệ thống phải bật bảo vệ ngay"},area_limit:{heading:"Khu vực giới hạn",description:"Giới hạn chỉ cho phép người dùng điều khiển các khu vực cụ thể"}},errors:{no_name:"Chưa cung cấp tên.",no_code:"Mã cần có ít nhất 4 ký tự/ký số.",code_mismatch:"Mã không trùng khớp."}},edit_user:{title:"Sửa người dùng",description:"Thay đổi cấu hình cho người dùng ''{name}''.",fields:{old_code:{heading:"Mã hiện tại",description:"Mã hiện tại, để trống khi không thay đổi."}}}}},actions:{title:"Hành động",cards:{notifications:{title:"Thông báo",description:"Khi dùng bảng điều khiển này, bạn có thể quản lý thông báo gửi đi khi có một sự kiện báo động xảy ra.",table:{no_items:"Chưa tạo thông báo nào.",no_area_warning:"Chưa gán hành động vào khu vực nào cả."},actions:{new_notification:"thông báo mới"}},actions:{description:"Bảng điều khiển này có thể dùng để bật tắt thiết bị khi trạng thái báo động thay đổi.",table:{no_items:"Chưa tạo hành động nào."},actions:{new_action:"hành động mới"}},new_notification:{title:"Cấu hình thông báo",description:"Nhận thông báo khi bật/tắt hệ thống báo động, khi bị kích hoạt, v.v.",trigger:"Điều kiện",action:"Nhiệm vụ",options:"Tùy chọn",fields:{event:{heading:"Sự kiện",description:"Khi nào thì gửi thông báo",choose:{armed:{name:"Hệ thống báo động được bật",description:"Hệ thống báo động đã được bật thành công"},disarmed:{name:"Hệ thống báo động được tắt",description:"Hệ thống báo động đã được tắt"},triggered:{name:"Hệ thống báo động bị kích hoạt",description:"Hệ thống báo động bị kích hoạt"},untriggered:{name:"Hệ thống báo động không còn bị kích hoạt",description:"Trạng thái kích hoạt của hệ thống đã kết thúc"},arm_failure:{name:"Bật bảo vệ thất bại",description:"Bật hệ thống báo động thất bại do một hay nhiều cảm biến đang mở"},arming:{name:"Bắt đầu đếm giờ đi ra",description:"Bắt đầu đếm giờ đi ra, hãy sẵn sàng rời khỏi nhà."},pending:{name:"Bắt đầu đếm giờ đi vào",description:"Bắt đầu đếm giờ đi vào, báo động sẽ sớm bị kích hoạt."}}},mode:{heading:"Chế độ",description:"Giới hạn hành động chỉ trong một số chế độ bảo vệ (tùy chọn)"},title:{heading:"Tiêu đề",description:"Tiêu đề của tin nhắn thông báo"},message:{heading:"Thông báo",description:"Nội dung tin nhắn thông báo",insert_wildcard:"Nhập mẫu",placeholders:{armed:"Hệ thống báo động chuyển sang {{arm_mode}}",disarmed:"Hệ thống báo động giờ đã TẮT",triggered:"Hệ thống báo động bị kích hoạt! {{open_sensors}}.",untriggered:"Hệ thống báo động không còn bị kích hoạt.",arm_failure:"Hệ thống báo động không bật bảo vệ được, lý do: {{open_sensors}}.",arming:"Hệ thống báo động sẽ sớm được bật, vui lòng rời khởi nhà.",pending:"Hệ thống báo động sắp bị kích hoạt, hãy tắt nó nhanh!"}},open_sensors_format:{heading:"Định dạng cho mẫu open_sensors",description:"Chọn thông tin cảm biến nào để chèn vào thông báo",options:{default:"Tên và trạng thái",short:"Chỉ tên"}},arm_mode_format:{heading:"Bản dịch cho mẫu arm_mode",description:"Chọn ngôn ngữ chế độ bảo vệ sẽ chèn vào thông báo"},target:{heading:"Mục tiêu",description:"Thiết bị để gửi thông báo tới"},name:{heading:"Tên",description:"Miêu tả của thông báo này",placeholders:{armed:"Thông báo đến {target} khi bật bảo vệ",disarmed:"Thông báo đến {target} khi tắt bảo vệ",triggered:"Thông báo đến {target} khi kích hoạt báo động",untriggered:"Thông báo đến {target} khi dừng báo động",arm_failure:"Thông báo đến {target} khi thất bại",arming:"Thông báo đến {target} khi đi ra",pending:"Thông báo đến {target} khi đi vào"}},delete:{heading:"Xóa tự động hóa",description:"Xóa vĩnh viễn tự động hóa này"}},actions:{test:"Chạy thử"}},new_action:{title:"Cấu hình hành động",description:"Bật đèn hoặc thiết bị (như chuông báo động) khi bật/tắt hệ thống báo động, khi bị kích hoạt, v.v.",fields:{event:{heading:"Sự kiện",description:"Khi nào nên thực hiện hành động"},area:{heading:"Khu vực",description:"Khu vực áp dụng sự kiện."},mode:{heading:"Chế độ",description:"Giới hạn hành động chỉ cho những chế độ bảo vệ cụ thể (tùy chọn)"},entity:{heading:"Thực thể",description:"Thực thể bị hành động tác động"},action:{heading:"Hành động",description:"Hành động tác động lên thực thể",no_common_actions:"Hành động chỉ có thể được gán trong chế độ YAML đối với thực thể đã chọn."},name:{heading:"Tên",description:"Miêu tả hành động này",placeholders:{armed:"Đặt {entity} thành {state} khi bật bảo vệ",disarmed:"Đặt {entity} thành {state} khi tắt bảo vệ",triggered:"Đặt {entity} thành {state} khi kích hoạt báo động",untriggered:"Đặt {entity} thành {state} khi dừng báo động",arm_failure:"Đặt {entity} thành {state} khi thất bại",arming:"Đặt {entity} thành {state} khi đi ra",pending:"Đặt {entity} thành {state} khi đi vào"}}}}}}},xi={common:$i,components:Ti,title:Ei,panels:ji},Si=Object.freeze({__proto__:null,common:$i,components:Ti,title:Ei,panels:ji,default:xi}),zi={modes_short:{armed_away:"离家警戒",armed_home:"在家警戒",armed_night:"夜间警戒",armed_custom_bypass:"自定义警戒",armed_vacation:"度假警戒"},enabled:"已启用",disabled:"已禁用"},Oi={time_slider:{seconds:"秒",minutes:"分",infinite:"无限",none:"无"},editor:{ui_mode:"UI模式",yaml_mode:"YAML模式",edit_in_yaml:"在YAML中编辑"},table:{filter:{label:"过滤项目",item:"通过{name}过滤",hidden_items:"{number} {number, plural,\n  one {项目}\n  other {项目}\n} 已隐藏"}}},Ci={general:{title:"通用",cards:{general:{description:"该面板定义了警戒的一些全局设置。",fields:{disarm_after_trigger:{heading:"触发后解除警戒",description:"触发超时后解除警报，而不是返回到警戒状态。"},enable_mqtt:{heading:"启用MQTT",description:"允许通过MQTT控制警戒面板。"},enable_master:{heading:"启用警戒主控",description:"创建一个实体，用于同时控制所有区域。"}},actions:{setup_mqtt:"MQTT配置",setup_master:"主控配置"}},modes:{title:"模式",description:"该面板可用于设置报警器的警戒模式。",modes:{armed_away:"当所有的人离开房子时，将使用离家警戒。所有接入房屋的门窗传感器都将被监听状态，包括有动作传感器。",armed_home:"当有人在家时，设置警戒时将使用在家警戒（也称为停留警戒）。所有接入房屋的门窗传感器都将被监听状态，但房屋的动作传感器不受监听。",armed_night:"在睡觉前设置警报时，将使用夜间警报。所有接入房屋的门窗传感器都将被监听状态，并且指定的动作传感器（例如：楼梯）也将被监听。",armed_vacation:"度假警戒可以作为离家警戒模式的拓展，以应对长时间的离家情况。延迟时间和触发反应可以根据离家的时间按需调整。",armed_custom_bypass:"一个额外的模式，用于定义你自己的警戒模式。"},number_sensors_active:"{number} {number, plural,\n  one {传感器}\n  other {传感器}\n} 激活",fields:{status:{heading:"状态",description:"控制警报器是否可以在此模式下警戒。"},exit_delay:{heading:"离开延迟",description:"当开启警戒时，在这个时间段内，传感器还不会触发警报。"},entry_delay:{heading:"进入延迟",description:"在其中一个传感器被触发后，直到触发警报的延迟时间。"},trigger_time:{heading:"触发时间",description:"警戒在激活后保持在触发状态的时间。"}}},mqtt:{title:"MQTT配置",description:"该面板可用于配置MQTT接口。",fields:{state_topic:{heading:"状态主题（Topic）",description:"更新状态发布的主题"},event_topic:{heading:"事件主题（Topic）",description:"警戒事件发布的主题"},command_topic:{heading:"指令主题（Topic）",description:"Alarmo 监听警戒或者解除警戒的主题"},require_code:{heading:"需要密码",description:"需要密码和指令一起发送"},state_payload:{heading:"配置每个状态的有效载荷",item:"定义状态的有效载荷 ''{state}''"},command_payload:{heading:"配置每个指令的有效载荷",item:"定义指令的有效载荷 ''{command}''"}}},areas:{title:"区域",description:"区域可用于将您的报警系统划分为多个区间。",no_items:"目前还没有定义任何区域。",table:{remarks:"备注",summary:"当前区域包含 {summary_sensors} 和 {summary_automations}.",summary_sensors:"{number} {number, plural,\n  one {传感器}\n  other {传感器}\n}",summary_automations:"{number} {number, plural,\n  one {自动化}\n  other {自动化}\n}"},actions:{add:"添加"}}},dialogs:{create_area:{title:"新区域",fields:{copy_from:"复制设置，从"}},edit_area:{title:"编辑区域 ''{area}''",name_warning:"注意：改变名称将改变实体ID。"},remove_area:{title:"删除区域?",description:"你确定要删除区域吗? 当前区域包含 {sensors} 传感器和 {automations} 自动化, 也会一起删除。"},edit_master:{title:"主控配置"},disable_master:{title:"禁用主控?",description:"你确定你要删除警报器主控吗? 当前区域包含 {automations} 自动化, 也会一起删除。"}}},sensors:{title:"传感器",cards:{sensors:{description:"目前配置的传感器。点击一个项目来进行修改。",table:{no_items:"这里没有要显示的传感器。",no_area_warning:"传感器没有被分配到任何区域。",arm_modes:"警戒模式",always_on:"(一直开启)"}},add_sensors:{title:"添加传感器",description:"添加更多的传感器。确保你的传感器有一个合适的名字，这样你就可以识别它们。",no_items:"没有可用的HA实体可以被配置为报警器。请确保包含 binary_sensor 类型的实体。",table:{type:"检测到的类型"},actions:{add_to_alarm:"添加到报警器",filter_supported:"隐藏未知类型的项目"}},editor:{title:"编辑传感器",description:"配置传感器 ''{entity}'' 的设置。",fields:{entity:{heading:"实体",description:"与该传感器关联的实体"},area:{heading:"区域",description:"选择一个包含该传感器的区域。"},group:{heading:"群组",description:"与其他传感器分组进行联合触发。"},device_type:{heading:"设备类型",description:"选择一个设备类型来自动应用适当的设置。",choose:{door:{name:"门",description:"用于进入/离开房屋的门或其他入口。"},window:{name:"窗",description:"窗户或不用于进入房屋的门，如阳台。"},motion:{name:"动作",description:"存在传感器或类似装置，在激活之间有一个延迟。"},tamper:{name:"篡改",description:"移除传感器盖的探测器，玻璃破碎传感器等。"},environmental:{name:"环境",description:"烟雾/气体传感器、泄漏探测器等（与防盗不相关）。"},other:{name:"通用"}}},always_on:{heading:"总是开启",description:"传感器应始终触发警报。"},modes:{heading:"启用的模式",description:"该传感器处于活动状态的警戒模式。"},arm_on_close:{heading:"关闭后警戒",description:"该传感器停用后，剩余的离开延迟将被自动跳过。"},use_exit_delay:{heading:"使用离开延迟",description:"当离开延迟开始时，传感器被允许处于活动状态。"},use_entry_delay:{heading:"使用进入延迟",description:"传感器的激活会在进入延迟后触发警报，而不是直接触发。"},allow_open:{heading:"允许在警戒后打开",description:"在警戒时，传感器的初始状态将被忽略。"},auto_bypass:{heading:"自动旁路",description:"如果该传感器在警戒时被触发，则将其排除在报警之外。",modes:"可绕过传感器的模式"},trigger_unavailable:{heading:"不可用时触发",description:'当传感器状态变成"不可用"时，将激活传感器。'}},actions:{toggle_advanced:"高级设定",remove:"删除",setup_groups:"配置群组"},errors:{description:"请修正以下错误：",no_area:"没有选择任何区域",no_modes:"没有选择传感器应处于活动状态的模式",no_auto_bypass_modes:"没有选择任何模式的传感器可能会被自动绕过。"}}},dialogs:{manage_groups:{title:"管理传感器群组",description:"在一个传感器群组中，多个传感器必须在一个时间段内被触发，才能触发警报。",no_items:"无群组",actions:{new_group:"新群组"}},create_group:{title:"新传感器群组",fields:{name:{heading:"名称",description:"传感器群组的名称"},timeout:{heading:"超时",description:"连续的传感器激活触发报警的时间段。"},event_count:{heading:"数字",description:"需要激活才能触发警报的不同传感器的数量。"},sensors:{heading:"传感器",description:"选择该群组所包含的传感器。"}},errors:{invalid_name:"提供的名称无效。",insufficient_sensors:"至少需要选择2个传感器。"}},edit_group:{title:"编辑传感器群组''{name}''"}}},codes:{title:"密码",cards:{codes:{description:"更改密码的设置。",fields:{code_arm_required:{heading:"使用警戒密码",description:"需要密码才能启用警报器"},code_disarm_required:{heading:"使用解除警戒密码",description:"需要密码才能解除警报器"},code_mode_change_required:{heading:"切换模式需要代码",description:"必须提供有效的代码才能更改处于活动状态的手臂模式。"},code_format:{heading:"密码格式",description:"设置 Lovelace Alarm Card 的输入类型。",code_format_number:"PIN码",code_format_text:"密码"}}},user_management:{title:"用户管理",description:"每个用户都有自己的密码来启用/解除警报。",no_items:"无用户",actions:{new_user:"新用户"}},new_user:{title:"创建新用户",description:"可以创建用户以提供操作警报器的权限。",fields:{name:{heading:"名称",description:"该用户的名称。"},code:{heading:"密码",description:"该用户的密码"},confirm_code:{heading:"确认密码",description:"重复输入密码。"},can_arm:{heading:"允许密码用于警戒",description:"输入此密码可激活警戒"},can_disarm:{heading:"允许密码用于解除警戒",description:"输入此密码可解除警戒"},is_override_code:{heading:"是覆盖密码",description:"输入此密码将强制激活警戒。"},area_limit:{heading:"限制区域",description:"限制用户只控制选定的区域"}},errors:{no_name:"没有提供名称。",no_code:"密码应至少有4个字符/数字。",code_mismatch:"密码不匹配。"}},edit_user:{title:"编辑用户",description:"为用户 ''{name}'' 变更配置。",fields:{old_code:{heading:"当前密码",description:"当前密码，留空表示保持不变。"}}}}},actions:{title:"动作",cards:{notifications:{title:"提醒",description:"使用此面板，你可以管理当某个报警事件发生时要发送的通知。",table:{no_items:"目前还没有创建任何通知。",no_area_warning:"动作没有被分配到任何领域。"},actions:{new_notification:"新通知"}},actions:{description:"当报警状态改变时，这个面板可以用来切换设备。",table:{no_items:"目前还没有创建任何动作。"},actions:{new_action:"新动作"}},new_notification:{title:"配置通知",description:"在启动/解除警报时、激活时等收到通知。",trigger:"条件",action:"任务",options:"选项",fields:{event:{heading:"事件",description:"应在何时发送通知",choose:{armed:{name:"警报器已警戒",description:"警报器已成功警戒"},disarmed:{name:"警报器已解除警戒",description:"警报器已解除警戒"},triggered:{name:"警报器已触发",description:"警报器已触发"},untriggered:{name:"警报器不再被触发",description:"警报器的触发状态已经结束"},arm_failure:{name:"警戒失败",description:"由于一个或多个传感器打开，警报器的警戒失败。"},arming:{name:"离开延迟开始",description:"离开延迟开始，准备离开房屋。"},pending:{name:"进入延迟开始",description:"进入延迟开始，警报将很快触发。"}}},mode:{heading:"模式",description:"将动作限制在特定的警戒模式（可选）。"},title:{heading:"标题",description:"通知信息的标题"},message:{heading:"信息",description:"通知信息的内容",insert_wildcard:"插入通配符",placeholders:{armed:"报警器被设置为 {{arm_mode}}",disarmed:"警报器现在是关闭的。",triggered:"警报被触发了! 因为：{{open_sensors}}.",untriggered:"警报器不再被触发。",arm_failure:"警报器现在无法启动，因为： {{open_sensors}}.",arming:"警报器很快就会警戒，请离开房屋。",pending:"警报器即将触发，请迅速解除警报!"}},open_sensors_format:{heading:"open_sensors通配符的格式",description:"选择在信息中插入哪些传感器信息",options:{default:"名称和状态",short:"仅名称"}},arm_mode_format:{heading:"警戒模式通配符的翻译",description:"选择在信息中插入警戒模式的语言"},target:{heading:"目标",description:"要发送通知的设备"},name:{heading:"名称",description:"该通知的描述",placeholders:{armed:"警戒时通知 {target}",disarmed:"解除警戒时通知 {target}",triggered:"触发警报时通知 {target}",untriggered:"警报解除时通知 {target}",arm_failure:"警戒失败时通知 {target}",arming:"警戒延迟开始时通知 {target}",pending:"警报即将触发时通知 {target}"}},delete:{heading:"删除自动化",description:"永久性地删除这个自动化"}},actions:{test:"测试"}},new_action:{title:"配置动作",description:"在启动/解除警报时，在激活时，切换灯光或设备（如警笛）。",fields:{event:{heading:"事件",description:"什么时候应该执行该动作"},area:{heading:"区域",description:"事件适用的区域。"},mode:{heading:"模式",description:"将动作限制在特定的警戒模式（可选）。"},entity:{heading:"实体",description:"要执行动作的实体"},action:{heading:"动作",description:"对实体执行的动作",no_common_actions:"动作只能在YAML模式下为选定的实体分配。"},name:{heading:"名称",description:"该动作的描述",placeholders:{armed:"警戒时将 {entity} 设置为 {state}。",disarmed:"解除警戒时将 {entity} 设置为 {state}。",triggered:"触发警报时将 {entity} 设置为 {state}。",untriggered:"警报解除时将 {entity} 设置为 {state}。",arm_failure:"警戒失败时将 {entity} 设置为 {state}。",arming:"警戒延迟开始时将 {entity} 设置为 {state}。",pending:"警报即将触发时将 {entity} 设置为 {state}。"}}}}}}},Mi={common:zi,components:Oi,title:"警戒面板",panels:Ci},Ni=Object.freeze({__proto__:null,common:zi,components:Oi,title:"警戒面板",panels:Ci,default:Mi}),Di={modes_short:{armed_away:"離家警戒",armed_home:"在家警戒",armed_night:"夜間警戒",armed_custom_bypass:"自定義警戒",armed_vacation:"度假警戒"},enabled:"已啟用",disabled:"已禁用"},Li={time_slider:{seconds:"秒",minutes:"分",infinite:"無限",none:"無"},editor:{ui_mode:"UI模式",yaml_mode:"YAML模式",edit_in_yaml:"在YAML中編輯"},table:{filter:{label:"過濾項目",item:"通過{name}過濾",hidden_items:"{number} {number, plural,\n  one {項目}\n  other {項目}\n} 已隱藏"}}},Pi={general:{title:"通用",cards:{general:{description:"該面板定義了警戒的一些全局設置。",fields:{disarm_after_trigger:{heading:"觸發後解除警戒",description:"觸發超時後解除警報，而不是返回到警戒狀態。"},enable_mqtt:{heading:"啟用MQTT",description:"允許通過MQTT控制警戒面板。"},enable_master:{heading:"啟用警戒主控",description:"創建一個實體，用於同時控制所有區域。"}},actions:{setup_mqtt:"MQTT配置",setup_master:"主控配置"}},modes:{title:"模式",description:"該面板可用於設置報警器的警戒模式。",modes:{armed_away:"當所有的人離開房子時，將使用離家警戒。所有接入房屋的門窗傳感器都將被監聽狀態，包括有動作傳感器。",armed_home:"當有人在家時，設置警戒時將使用在家警戒（也稱為停留警戒）。所有接入房屋的門窗傳感器都將被監聽狀態，但房屋的動作傳感器不受監聽。",armed_night:"在睡覺前設置警報時，將使用夜間警報。所有接入房屋的門窗傳感器都將被監聽狀態，並且指定的動作傳感器（例如：樓梯）也將被監聽。",armed_vacation:"度假警戒可以作為離家警戒模式的拓展，以應對長時間的離家情況。延遲時間和觸發反應可以根據離家的時間按需調整。",armed_custom_bypass:"一個額外的模式，用於定義你自己的警戒模式。"},number_sensors_active:"{number} {number, plural,\n  one {傳感器}\n  other {傳感器}\n} 激活",fields:{status:{heading:"狀態",description:"控制警報器是否可以在此模式下警戒。"},exit_delay:{heading:"離開延遲",description:"當開啟警戒時，在這個時間段內，傳感器還不會觸發警報。"},entry_delay:{heading:"進入延遲",description:"在其中一個傳感器被觸發後，直到觸發警報的延遲時間。"},trigger_time:{heading:"觸發時間",description:"警戒在激活後保持在觸發狀態的時間。"}}},mqtt:{title:"MQTT配置",description:"該面板可用於配置MQTT接口。",fields:{state_topic:{heading:"狀態主題（Topic）",description:"更新狀態發布的主題"},event_topic:{heading:"事件主題（Topic）",description:"警戒事件發布的主題"},command_topic:{heading:"指令主題（Topic）",description:"Alarmo 監聽警戒或者解除警戒的主題"},require_code:{heading:"需要密碼",description:"需要密碼和指令一起發送"},state_payload:{heading:"配置每個狀態的有效載荷",item:"定義狀態的有效載荷 ''{state}''"},command_payload:{heading:"配置每個指令的有效載荷",item:"定義指令的有效載荷 ''{command}''"}}},areas:{title:"區域",description:"區域可用於將您的報警系統劃分為多個區間。",no_items:"目前還沒有定義任何區域。",table:{remarks:"備註",summary:"當前區域包含 {summary_sensors} 和 {summary_automations}.",summary_sensors:"{number} {number, plural,\n  one {傳感器}\n  other {傳感器}\n}",summary_automations:"{number} {number, plural,\n  one {自動化}\n  other {自動化}\n}"},actions:{add:"添加"}}},dialogs:{create_area:{title:"新區域",fields:{copy_from:"覆制設置，從"}},edit_area:{title:"編輯區域 ''{area}''",name_warning:"註意：改變名稱將改變實體ID。"},remove_area:{title:"刪除區域?",description:"你確定要刪除區域嗎? 當前區域包含 {sensors} 傳感器和 {automations} 自動化, 也會一起刪除。"},edit_master:{title:"主控配置"},disable_master:{title:"禁用主控?",description:"你確定你要刪除警報器主控嗎? 當前區域包含 {automations} 自動化, 也會一起刪除。"}}},sensors:{title:"傳感器",cards:{sensors:{description:"目前配置的傳感器。點擊一個項目來進行修改。",table:{no_items:"這裏沒有要顯示的傳感器。",no_area_warning:"傳感器沒有被分配到任何區域。",arm_modes:"警戒模式",always_on:"(一直開啟)"}},add_sensors:{title:"添加傳感器",description:"添加更多的傳感器。確保你的傳感器有一個合適的名字，這樣你就可以識別它們。",no_items:"沒有可用的HA實體可以被配置為報警器。請確保包含 binary_sensor 類型的實體。",table:{type:"檢測到的類型"},actions:{add_to_alarm:"添加到報警器",filter_supported:"隱藏未知類型的項目"}},editor:{title:"編輯傳感器",description:"配置傳感器 ''{entity}'' 的設置。",fields:{entity:{heading:"實體",description:"與該感測器關聯的實體"},area:{heading:"區域",description:"選擇一個包含該傳感器的區域。"},group:{heading:"群組",description:"與其他傳感器分組進行聯合觸發。"},device_type:{heading:"設備類型",description:"選擇一個設備類型來自動應用適當的設置。",choose:{door:{name:"門",description:"用於進入/離開房屋的門或其他入口。"},window:{name:"窗",description:"窗戶或不用於進入房屋的門，如陽台。"},motion:{name:"動作",description:"存在傳感器或類似裝置，在激活之間有一個延遲。"},tamper:{name:"篡改",description:"移除傳感器蓋的探測器，玻璃破碎傳感器等。"},environmental:{name:"環境",description:"煙霧/氣體傳感器、泄漏探測器等（與防盜不相關）。"},other:{name:"通用"}}},always_on:{heading:"總是開啟",description:"傳感器應始終觸發警報。"},modes:{heading:"啟用的模式",description:"該傳感器處於活動狀態的警戒模式。"},arm_on_close:{heading:"關閉後警戒",description:"該傳感器停用後，剩余的離開延遲將被自動跳過。"},use_exit_delay:{heading:"使用離開延遲",description:"當離開延遲開始時，傳感器被允許處於活動狀態。"},use_entry_delay:{heading:"使用進入延遲",description:"傳感器的激活會在進入延遲後觸發警報，而不是直接觸發。"},allow_open:{heading:"允許在警戒後打開",description:"在警戒時，傳感器的初始狀態將被忽略。"},auto_bypass:{heading:"自動旁路",description:"如果該傳感器在警戒時被觸發，則將其排除在報警之外。",modes:"可繞過傳感器的模式"},trigger_unavailable:{heading:"不可用時觸發",description:'當傳感器狀態變成"不可用"時，將激活傳感器。'}},actions:{toggle_advanced:"高級設定",remove:"刪除",setup_groups:"配置群組"},errors:{description:"請修正以下錯誤：",no_area:"沒有選擇任何區域",no_modes:"沒有選擇傳感器應處於活動狀態的模式",no_auto_bypass_modes:"沒有選擇任何模式的傳感器可能會被自動繞過。"}}},dialogs:{manage_groups:{title:"管理傳感器群組",description:"在一個傳感器群組中，多個傳感器必須在一個時間段內被觸發，才能觸發警報。",no_items:"無群組",actions:{new_group:"新群組"}},create_group:{title:"新傳感器群組",fields:{name:{heading:"名稱",description:"傳感器群組的名稱"},timeout:{heading:"超時",description:"連續的傳感器激活觸發報警的時間段。"},event_count:{heading:"數位",description:"需要啟動才能觸發警報的不同感測器的數量。"},sensors:{heading:"傳感器",description:"選擇該群組所包含的傳感器。"}},errors:{invalid_name:"提供的名稱無效。",insufficient_sensors:"至少需要選擇2個傳感器。"}},edit_group:{title:"編輯傳感器群組''{name}''"}}},codes:{title:"密碼",cards:{codes:{description:"更改密碼的設置。",fields:{code_arm_required:{heading:"使用警戒密碼",description:"需要密碼才能啟用警報器"},code_disarm_required:{heading:"使用解除警戒密碼",description:"需要密碼才能解除警報器"},code_mode_change_required:{heading:"切換模式需要代碼",description:"必須提供有效的代碼才能更改處於活動狀態的手臂模式。"},code_format:{heading:"密碼格式",description:"設置 Lovelace Alarm Card 的輸入類型。",code_format_number:"PIN碼",code_format_text:"密碼"}}},user_management:{title:"用戶管理",description:"每個用戶都有自己的密碼來啟用/解除警報。",no_items:"無用戶",actions:{new_user:"新用戶"}},new_user:{title:"創建新用戶",description:"可以創建用戶以提供操作警報器的權限。",fields:{name:{heading:"名稱",description:"該用戶的名稱。"},code:{heading:"密碼",description:"該用戶的密碼"},confirm_code:{heading:"確認密碼",description:"重覆輸入密碼。"},can_arm:{heading:"允許密碼用於警戒",description:"輸入此密碼可激活警戒"},can_disarm:{heading:"允許密碼用於解除警戒",description:"輸入此密碼可解除警戒"},is_override_code:{heading:"是覆蓋密碼",description:"輸入此密碼將強制激活警戒。"},area_limit:{heading:"限制區域",description:"限制用戶只控制選定的區域"}},errors:{no_name:"沒有提供名稱。",no_code:"密碼應至少有4個字符/數字。",code_mismatch:"密碼不匹配。"}},edit_user:{title:"編輯用戶",description:"為用戶 ''{name}'' 變更配置。",fields:{old_code:{heading:"當前密碼",description:"當前密碼，留空表示保持不變。"}}}}},actions:{title:"動作",cards:{notifications:{title:"提醒",description:"使用此面板，你可以管理當某個報警事件發生時要發送的通知。",table:{no_items:"目前還沒有創建任何通知。",no_area_warning:"動作沒有被分配到任何領域。"},actions:{new_notification:"新通知"}},actions:{description:"當報警狀態改變時，這個面板可以用來切換設備。",table:{no_items:"目前還沒有創建任何動作。"},actions:{new_action:"新動作"}},new_notification:{title:"配置通知",description:"在啟動/解除警報時、激活時等收到通知。",trigger:"條件",action:"任務",options:"選項",fields:{event:{heading:"事件",description:"應在何時發送通知",choose:{armed:{name:"警報器已警戒",description:"警報器已成功警戒"},disarmed:{name:"警報器已解除警戒",description:"警報器已解除警戒"},triggered:{name:"警報器已觸發",description:"警報器已觸發"},untriggered:{name:"警報器不再被觸發",description:"警報器的觸發狀態已經結束"},arm_failure:{name:"警戒失敗",description:"由於一個或多個傳感器打開，警報器的警戒失敗。"},arming:{name:"離開延遲開始",description:"離開延遲開始，準備離開房屋。"},pending:{name:"進入延遲開始",description:"進入延遲開始，警報將很快觸發。"}}},mode:{heading:"模式",description:"將動作限制在特定的警戒模式（可選）。"},title:{heading:"標題",description:"通知信息的標題"},message:{heading:"信息",description:"通知信息的內容",insert_wildcard:"插入通配符",placeholders:{armed:"報警器被設置為 {{arm_mode}}",disarmed:"警報器現在是關閉的。",triggered:"警報被觸發了! 因為：{{open_sensors}}.",untriggered:"警報器不再被觸發。",arm_failure:"警報器現在無法啟動，因為： {{open_sensors}}.",arming:"警報器很快就會警戒，請離開房屋。",pending:"警報器即將觸發，請迅速解除警報!"}},open_sensors_format:{heading:"open_sensors通配符的格式",description:"選擇在信息中插入哪些傳感器信息",options:{default:"名稱和狀態",short:"僅名稱"}},arm_mode_format:{heading:"警戒模式通配符的翻譯",description:"選擇在信息中插入警戒模式的語言"},target:{heading:"目標",description:"要發送通知的設備"},name:{heading:"名稱",description:"該通知的描述",placeholders:{armed:"警戒時通知 {target}",disarmed:"解除警戒時通知 {target}",triggered:"觸發警報時通知 {target}",untriggered:"警報解除時通知 {target}",arm_failure:"警戒失敗時通知 {target}",arming:"警戒延遲開始時通知 {target}",pending:"警報即將觸發時通知 {target}"}},delete:{heading:"刪除自動化",description:"永久性地刪除這個自動化"}},actions:{test:"測試"}},new_action:{title:"配置動作",description:"在啟動/解除警報時，在激活時，切換燈光或設備（如警笛）。",fields:{event:{heading:"事件",description:"什麽時候應該執行該動作"},area:{heading:"區域",description:"事件適用的區域。"},mode:{heading:"模式",description:"將動作限制在特定的警戒模式（可選）。"},entity:{heading:"實體",description:"要執行動作的實體"},action:{heading:"動作",description:"對實體執行的動作",no_common_actions:"動作只能在YAML模式下為選定的實體分配。"},name:{heading:"名稱",description:"該動作的描述",placeholders:{armed:"警戒時將 {entity} 設置為 {state}。",disarmed:"解除警戒時將 {entity} 設置為 {state}。",triggered:"觸發警報時將 {entity} 設置為 {state}。",untriggered:"警報解除時將 {entity} 設置為 {state}。",arm_failure:"警戒失敗時將 {entity} 設置為 {state}。",arming:"警戒延遲開始時將 {entity} 設置為 {state}。",pending:"警報即將觸發時將 {entity} 設置為 {state}。"}}}}}}},Hi={common:Di,components:Li,title:"警戒面板",panels:Pi},Bi=Object.freeze({__proto__:null,common:Di,components:Li,title:"警戒面板",panels:Pi,default:Hi}),qi={modes_short:{armed_away:"Полная охрана",armed_home:"Охрана дома",armed_night:"Охрана ночью",armed_custom_bypass:"Своя",armed_vacation:"Охрана отпуск"},enabled:"Включено",disabled:"Выключено"},Ii={time_slider:{seconds:"сек",minutes:"мин",infinite:"цикл",none:"не задано"},editor:{ui_mode:"В пользовательский интерфейс",yaml_mode:"В YAML",edit_in_yaml:"Редактировать в YAML"},table:{filter:{label:"Фильтр элементов",item:"Фильтровать по {name}",hidden_items:"{number} {number, plural,\n  one {item is}\n  other {items are}\n} скрыты"}}},Ui={general:{title:"Общие",cards:{general:{description:"Эта панель содержит общие настройки для сигнализации.",fields:{disarm_after_trigger:{heading:"Снять с охраны после срабатывания",description:"По истечении времени срабатывания отключит сигнализацию вместо возврата в состояние охраны."},enable_mqtt:{heading:"Включить MQTT",description:"Разрешить управление панелью сигнализации через MQTT."},enable_master:{heading:"Включить мастер сигнализации",description:"Создает объект для одновременного управления всеми областями."}},actions:{setup_mqtt:"Конфигурация MQTT",setup_master:"Мастер конфигурации"}},modes:{title:"Режимы",description:"Эту панель можно использовать для настройки режимов включения сигнализации.",modes:{armed_away:"Полная охрана будет использоваться, когда все люди покинут дом. Все двери и окна, позволяющие получить доступ в дом, будут охраняться, так же как и датчики движения внутри дома.",armed_home:"Охрана дома будет использоваться при установке сигнализации, пока люди находятся в доме. Все двери и окна, позволяющие получить доступ в дом, будут охраняться, но не датчики движения внутри дома.",armed_night:"Охрана ночью будет использоваться при установке сигнализации перед сном. Все двери и окна, позволяющие получить доступ в дом, будут охраняться, а в доме будут установлены датчики движения (внизу).",armed_vacation:"Охрана отпуск может использоваться в качестве дополнения к режиму Охрана не дома в случае более длительного отсутствия. Время задержки и срабатывания триггера могут быть адаптированы (по желанию) к удаленности от дома.",armed_custom_bypass:"Дополнительный режим для определения вашего собственного периметра безопасности."},number_sensors_active:"{number} {number, plural,\n  one {sensor}\n other {sensors}\n} активны",fields:{status:{heading:"Статус",description:"Определяет, может ли сигнализация быть включена в этом режиме."},exit_delay:{heading:"Время для выхода",description:"При включении сигнализации в течение этого периода времени датчики еще не активируют сигнал тревоги."},entry_delay:{heading:"Время для входа",description:"Время задержки до срабатывания сигнализации после активации одного из датчиков."},trigger_time:{heading:"Время срабатывания",description:"Время, в течение которого сигнализация будет оставаться в срабатывающем состоянии после активации."}}},mqtt:{title:"Конфигурация MQTT",description:"Эта панель может быть использована для настройки интерфейса MQTT.",fields:{state_topic:{heading:"Состояние темы",description:"Тема, по которой публикуются обновления состояния"},event_topic:{heading:"Тема мероприятия",description:"Тема, по которой публикуются тревожные события"},command_topic:{heading:"Команда темы",description:"Тема, которую Аламо прослушивает для команд включения / выключения."},require_code:{heading:"Требовать код",description:"Требовать отправки кода вместе с командой."},state_payload:{heading:"Настройка полезной нагрузки для каждого состояния",item:"Определите полезную нагрузку для состояния ''{state}''"},command_payload:{heading:"Настройка полезной нагрузки для каждой команды",item:"Определите полезную нагрузку для команды ''{command}''"}}},areas:{title:"Зоны",description:"Зоны можно использовать для разделения вашей системы сигнализации на несколько отсеков.",no_items:"Пока еще не определены зоны.",table:{remarks:"Замечания",summary:"Эта зона содержит {summary_sensors} и {summary_automations}.",summary_sensors:"{number} {number, plural,\n  one {sensor}\n  other {sensors}\n}",summary_automations:"{number} {number, plural,\n  one {automation}\n  other {automations}\n}"},actions:{add:"Добавить"}}},dialogs:{create_area:{title:"Новая зона",fields:{copy_from:"Копировать настройки из"}},edit_area:{title:"Редактирование зоны ''{area}''",name_warning:"Примечание: изменение имени приведет к изменению идентификатора объекта"},remove_area:{title:"Удалить зону?",description:"Вы уверены, что хотите удалить эту зону? Эта зона содержит {sensors} датчики и {automations} автоматизации, которые также будут удалены."},edit_master:{title:"Мастер конфигурации"},disable_master:{title:"Отключить мастер?",description:"Вы уверены, что хотите удалить мастер сигнализации? Эта область содержит {automations} автоматизации, которые будут удалены с помощью этого действия."}}},sensors:{title:"Датчики",cards:{sensors:{description:"Настроенные в данный момент датчики. Нажмите на элемент, чтобы внести изменения.",table:{no_items:"Здесь нет датчиков, которые будут отображаться.",no_area_warning:"Датчик не привязан ни к какой зоне.",arm_modes:"Режимы охраны",always_on:"(Always)"}},add_sensors:{title:"Добавить датчики",description:"Добавьте больше датчиков. Убедитесь, что у ваших датчиков есть подходящее название, чтобы вы могли их идентифицировать.",no_items:"Нет доступных объектов HA, которые можно было бы настроить для сигнализации. Обязательно включите объекты типа binary_sensor.",table:{type:"Тип обнаружения"},actions:{add_to_alarm:"добавить в сигнализацию",filter_supported:"Скрыть элементы с неизвестным типом"}},editor:{title:"Редактировать датчик",description:"Настройка параметров датчика ''{entity}''.",fields:{entity:{heading:"Объект",description:"Объект, связанный с этим датчиком"},area:{heading:"Зона",description:"Выберите зону, содержащую этот датчик."},group:{heading:"Группа",description:"Объедините с другими датчиками для комбинированного срабатывания."},device_type:{heading:"Тип устройства",description:"Выберите тип устройства, чтобы автоматически применить соответствующие настройки.",choose:{door:{name:"Дверь",description:"Дверь, ворота или другой вход, который используется для входа / выхода из дома."},window:{name:"Окно",description:"Окно или дверь, не используемые для входа в дом, такие как балкон."},motion:{name:"Движение",description:"Датчик присутствия или аналогичное устройство, имеющее задержку между активациями."},tamper:{name:"Тампер",description:"Датчик снятия крышки датчика, датчик разбитого стекла и т.д."},environmental:{name:"Экологический",description:"Датчик дыма / газа, течеискатель и т.д. (не связано с защитой от взлома)."},other:{name:"Общий"}}},always_on:{heading:"Всегда включен",description:"Датчик всегда должен подавать сигнал тревоги."},modes:{heading:"Включенные режимы",description:"Режимы сигнализации, в которых активен этот датчик."},arm_on_close:{heading:"Рычаг после закрытия",description:"После деактивации этого датчика оставшаяся задержка выхода будет автоматически пропущена."},use_exit_delay:{heading:"Используйте задержку для выхода",description:"Датчику разрешается быть активным, когда начинается задержка выхода."},use_entry_delay:{heading:"Используйте задержку для входа",description:"Активация датчика запускает сигнал тревоги после задержки входа, а не непосредственно."},allow_open:{heading:"Разрешить открытие после постановки на охрану",description:"Начальное состояние датчика игнорируется при постановке на охрану."},auto_bypass:{heading:"Автоматический исключение",description:"Исключите этот датчик из системы сигнализации, если он открыт во время постановки на охрану.",modes:"Режимы, в которых датчик может быть исключен"},trigger_unavailable:{heading:"Срабатывает, когда недоступен",description:"Когда состояние датчика становится недоступным, это активирует датчик."}},actions:{toggle_advanced:"Дополнительные настройки",remove:"Удалить",setup_groups:"Настройки групп"},errors:{description:"Пожалуйста, исправьте следующие ошибки:",no_area:"Зона не выбрана",no_modes:"Не выбраны режимы, для которых датчик должен быть активен",no_auto_bypass_modes:"Никакие режимы не выбраны для датчика, который может быть автоматически исключен"}}},dialogs:{manage_groups:{title:"Управление группами датчиков",description:"В группе датчиков несколько датчиков должны быть активированы в течение определенного периода времени до срабатывания сигнализации.",no_items:"Групп пока нет",actions:{new_group:"Новая группа"}},create_group:{title:"Новая группа датчиков",fields:{name:{heading:"Название",description:"Название для группы датчиков"},timeout:{heading:"Тайм-аут",description:"Период времени, в течение которого последовательные срабатывания датчика вызывают сигнал тревоги."},event_count:{heading:"Число",description:"Количество различных датчиков, которые необходимо активировать для срабатывания сигнализации."},sensors:{heading:"Датчики",description:"Выберите датчики, входящие в эту группу."}},errors:{invalid_name:"Неверное название.",insufficient_sensors:"Необходимо выбрать по крайней мере 2 датчика."}},edit_group:{title:"Редактировать группу датчиков ''{name}''"}}},codes:{title:"Коды",cards:{codes:{description:"Измените настройки для кода.",fields:{code_arm_required:{heading:"Используйте код включения сигнализации",description:"Требуется код для включения сигнализации"},code_disarm_required:{heading:"Используйте код снятия с охраны",description:"Требуется код для снятия сигнализации с охраны"},code_mode_change_required:{heading:"Требовать код для переключения режима",description:"Для изменения активного режима охраны необходимо предоставить действительный код."},code_format:{heading:"Формат кода",description:"Задает тип ввода для карты сигнализации Lovelace.",code_format_number:"пинкод",code_format_text:"пароль"}}},user_management:{title:"Управление пользователями",description:"У каждого пользователя есть свой собственный код для включения / выключения сигнализации.",no_items:"Пользователей пока нет",actions:{new_user:"новый пользователь"}},new_user:{title:"Создать нового пользователя",description:"Пользователи могут быть созданы для предоставления доступа к управлению сигнализацией.",fields:{name:{heading:"Имя",description:"Имя пользователя."},code:{heading:"Код",description:"Код для этого пользователя."},confirm_code:{heading:"Подтвердите код",description:"Повторите код."},can_arm:{heading:"Разрешить код для постановки на охрану",description:"Ввод этого кода активирует сигнализацию"},can_disarm:{heading:"Разрешающить код для снятия с охраны",description:"Ввод этого кода отключает сигнализацию"},is_override_code:{heading:"Является переопределяющим кодом",description:"Ввод этого кода приведет к включению сигнализации в действие"},area_limit:{heading:"Запретные зоны",description:"Ограничить пользователя контролем только над выбранными зонами"}},errors:{no_name:"Имя не указано.",no_code:"Код должен содержать минимум 4 символа/ цифры.",code_mismatch:"Коды не совпадают."}},edit_user:{title:"Редактировать пользователя",description:"Изменить конфигурацию для пользователя ''{name}''.",fields:{old_code:{heading:"Текущий код",description:"Текущий код, оставьте пустым, чтобы оставить без изменений."}}}}},actions:{title:"Действия",cards:{notifications:{title:"Уведомления",description:"Используя эту панель, вы можете управлять уведомлениями, которые будут отправляться при возникновении определенного тревожного события.",table:{no_items:"Уведомления еще не созданы.",no_area_warning:"Действие не назначено ни для какой зоны."},actions:{new_notification:"новое уведомление"}},actions:{description:"Эта панель может использоваться для переключения устройства при изменении состояния тревоги.",table:{no_items:"Еще не создано никаких действий."},actions:{new_action:"новое действие"}},new_notification:{title:"Настройка уведомления",description:"Получать уведомление при постановке на охрану / снятии с охраны сигнализации, при активации и т.д.",trigger:"Состояние",action:"Задача",options:"Опции",fields:{event:{heading:"Событие",description:"Когда должно быть отправлено уведомление",choose:{armed:{name:"Сигнализация включена",description:"Сигнализация успешно включена"},disarmed:{name:"Сигнализация отключена",description:"Сигнализация отключена"},triggered:{name:"Срабатывает сигнализация",description:"Срабатывает сигнализация"},untriggered:{name:"Тревога больше не срабатывает",description:"Состояние срабатывания сигнализации завершилось"},arm_failure:{name:"Включение сигнализации не удалось",description:"Включение сигнализации не удалось из-за одного или нескольких открытых датчиков"},arming:{name:"Началась задержка для выхода",description:"Началась задержка для выхода, выйдите из дома."},pending:{name:"Началась задержка для входа",description:"Началась задержка для входа, скоро сработает сигнализация."}}},mode:{heading:"Режим",description:"Ограничьте действие определенными режимами  (необязательно)"},title:{heading:"Заголовок",description:"Заголовок для сообщения с уведомлением"},message:{heading:"Сообщение",description:"Содержание сообщения-уведомления",insert_wildcard:"Вставить подстановочный знак",placeholders:{armed:"Сигнализация включена на {{arm_mode}}",disarmed:"Сигнализация включена",triggered:"Сработала сигнализация! Причина: {{open_sensors}}.",untriggered:"Сигнал тревоги больше не срабатывает.",arm_failure:"Сигнализация не могла быть включена прямо сейчас из-за: {{open_sensors}}.",arming:"Сигнализация скоро включится, пожалуйста, покиньте дом.",pending:"Сигнализация вот-вот сработает, быстро отключите ее!"}},open_sensors_format:{heading:"Формат для подстановочного знака open_sensors",description:"Выберите, информация о каком датчике будет вставлена в сообщение",options:{default:"Названия и состояния",short:"Только имена"}},arm_mode_format:{heading:"Перевод для подстановочного знака arm_mode",description:"Выберите, на каком языке режим arm будет вставлен в сообщение"},target:{heading:"Цель",description:"Устройство для отправки уведомления на"},name:{heading:"название",description:"Описание для этого уведомления",placeholders:{armed:"Уведомлять {target} при постановке на охрану",disarmed:"Уведомлять {target} после снятия с охраны",triggered:"Уведомлять {target} при срабатывании",untriggered:"Уведомлять {target} когда срабатывание прекращается",arm_failure:"Уведомлять {target} при неудаче",arming:"Уведомлять {target} при выходе",pending:"Уведомлять {target} при входе"}},delete:{heading:"Удалить автоматизацию",description:"Навсегда удалите эту автоматизацию"}},actions:{test:"Попробовать это"}},new_action:{title:"Настройки Действия",description:"Включайте освещение или устройства (например, сирены) при постановке на охрану/снятии с охраны сигнализации, при активации и т.д.",fields:{event:{heading:"Событие",description:"Когда должно быть выполнено действие"},area:{heading:"Зона",description:"Зона, для которой применяется событие."},mode:{heading:"Режим",description:"Ограничьте действие определенными режимами arm (необязательно)"},entity:{heading:"Объект",description:"Объект для выполнения действия над"},action:{heading:"Действие",description:"Действие, которое необходимо выполнить над объектом",no_common_actions:"Действия могут быть назначены только в режиме YAML для выбранных объектов."},name:{heading:"Название",description:"Описание для этого действия",placeholders:{armed:"Установите  {entity} в {state} при постановке на охрану",disarmed:"Установите  {entity} в {state} после снятия с охраны",triggered:"Установите  {entity} в {state} при срабатывании",untriggered:"Установите  {entity} в {state} когда срабатывание прекращается",arm_failure:"Установите  {entity} в {state} при неудаче",arming:"Установите  {entity} в {state} при выходе",pending:"Установите  {entity} в {state} при входе"}}}}}}},Ri={common:qi,components:Ii,title:"Панель сигнализации",panels:Ui},Vi=Object.freeze({__proto__:null,common:qi,components:Ii,title:"Панель сигнализации",panels:Ui,default:Ri});function Gi(e){return e.type===gt.literal}function Fi(e){return e.type===gt.argument}function Ki(e){return e.type===gt.number}function Zi(e){return e.type===gt.date}function Qi(e){return e.type===gt.time}function Yi(e){return e.type===gt.select}function Wi(e){return e.type===gt.plural}function Xi(e){return e.type===gt.pound}function Ji(e){return e.type===gt.tag}function ea(e){return!(!e||"object"!=typeof e||e.type!==vt.number)}function ta(e){return!(!e||"object"!=typeof e||e.type!==vt.dateTime)}!function(e){e[e.EXPECT_ARGUMENT_CLOSING_BRACE=1]="EXPECT_ARGUMENT_CLOSING_BRACE",e[e.EMPTY_ARGUMENT=2]="EMPTY_ARGUMENT",e[e.MALFORMED_ARGUMENT=3]="MALFORMED_ARGUMENT",e[e.EXPECT_ARGUMENT_TYPE=4]="EXPECT_ARGUMENT_TYPE",e[e.INVALID_ARGUMENT_TYPE=5]="INVALID_ARGUMENT_TYPE",e[e.EXPECT_ARGUMENT_STYLE=6]="EXPECT_ARGUMENT_STYLE",e[e.INVALID_NUMBER_SKELETON=7]="INVALID_NUMBER_SKELETON",e[e.INVALID_DATE_TIME_SKELETON=8]="INVALID_DATE_TIME_SKELETON",e[e.EXPECT_NUMBER_SKELETON=9]="EXPECT_NUMBER_SKELETON",e[e.EXPECT_DATE_TIME_SKELETON=10]="EXPECT_DATE_TIME_SKELETON",e[e.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE=11]="UNCLOSED_QUOTE_IN_ARGUMENT_STYLE",e[e.EXPECT_SELECT_ARGUMENT_OPTIONS=12]="EXPECT_SELECT_ARGUMENT_OPTIONS",e[e.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE=13]="EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE",e[e.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE=14]="INVALID_PLURAL_ARGUMENT_OFFSET_VALUE",e[e.EXPECT_SELECT_ARGUMENT_SELECTOR=15]="EXPECT_SELECT_ARGUMENT_SELECTOR",e[e.EXPECT_PLURAL_ARGUMENT_SELECTOR=16]="EXPECT_PLURAL_ARGUMENT_SELECTOR",e[e.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT=17]="EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT",e[e.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT=18]="EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT",e[e.INVALID_PLURAL_ARGUMENT_SELECTOR=19]="INVALID_PLURAL_ARGUMENT_SELECTOR",e[e.DUPLICATE_PLURAL_ARGUMENT_SELECTOR=20]="DUPLICATE_PLURAL_ARGUMENT_SELECTOR",e[e.DUPLICATE_SELECT_ARGUMENT_SELECTOR=21]="DUPLICATE_SELECT_ARGUMENT_SELECTOR",e[e.MISSING_OTHER_CLAUSE=22]="MISSING_OTHER_CLAUSE",e[e.INVALID_TAG=23]="INVALID_TAG",e[e.INVALID_TAG_NAME=25]="INVALID_TAG_NAME",e[e.UNMATCHED_CLOSING_TAG=26]="UNMATCHED_CLOSING_TAG",e[e.UNCLOSED_TAG=27]="UNCLOSED_TAG"}(pt||(pt={})),function(e){e[e.literal=0]="literal",e[e.argument=1]="argument",e[e.number=2]="number",e[e.date=3]="date",e[e.time=4]="time",e[e.select=5]="select",e[e.plural=6]="plural",e[e.pound=7]="pound",e[e.tag=8]="tag"}(gt||(gt={})),function(e){e[e.number=0]="number",e[e.dateTime=1]="dateTime"}(vt||(vt={}));var ia=/[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/,aa=/(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;function na(e){var t={};return e.replace(aa,(function(e){var i=e.length;switch(e[0]){case"G":t.era=4===i?"long":5===i?"narrow":"short";break;case"y":t.year=2===i?"2-digit":"numeric";break;case"Y":case"u":case"U":case"r":throw new RangeError("`Y/u/U/r` (year) patterns are not supported, use `y` instead");case"q":case"Q":throw new RangeError("`q/Q` (quarter) patterns are not supported");case"M":case"L":t.month=["numeric","2-digit","short","long","narrow"][i-1];break;case"w":case"W":throw new RangeError("`w/W` (week) patterns are not supported");case"d":t.day=["numeric","2-digit"][i-1];break;case"D":case"F":case"g":throw new RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");case"E":t.weekday=4===i?"short":5===i?"narrow":"short";break;case"e":if(i<4)throw new RangeError("`e..eee` (weekday) patterns are not supported");t.weekday=["short","long","narrow","short"][i-4];break;case"c":if(i<4)throw new RangeError("`c..ccc` (weekday) patterns are not supported");t.weekday=["short","long","narrow","short"][i-4];break;case"a":t.hour12=!0;break;case"b":case"B":throw new RangeError("`b/B` (period) patterns are not supported, use `a` instead");case"h":t.hourCycle="h12",t.hour=["numeric","2-digit"][i-1];break;case"H":t.hourCycle="h23",t.hour=["numeric","2-digit"][i-1];break;case"K":t.hourCycle="h11",t.hour=["numeric","2-digit"][i-1];break;case"k":t.hourCycle="h24",t.hour=["numeric","2-digit"][i-1];break;case"j":case"J":case"C":throw new RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");case"m":t.minute=["numeric","2-digit"][i-1];break;case"s":t.second=["numeric","2-digit"][i-1];break;case"S":case"A":throw new RangeError("`S/A` (second) patterns are not supported, use `s` instead");case"z":t.timeZoneName=i<4?"short":"long";break;case"Z":case"O":case"v":case"V":case"X":case"x":throw new RangeError("`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead")}return""})),t}var sa=/[\t-\r \x85\u200E\u200F\u2028\u2029]/i;var ra=/^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g,oa=/^(@+)?(\+|#+)?[rs]?$/g,da=/(\*)(0+)|(#+)(0+)|(0+)/g,la=/^(0+)$/;function ca(e){var t={};return"r"===e[e.length-1]?t.roundingPriority="morePrecision":"s"===e[e.length-1]&&(t.roundingPriority="lessPrecision"),e.replace(oa,(function(e,i,a){return"string"!=typeof a?(t.minimumSignificantDigits=i.length,t.maximumSignificantDigits=i.length):"+"===a?t.minimumSignificantDigits=i.length:"#"===i[0]?t.maximumSignificantDigits=i.length:(t.minimumSignificantDigits=i.length,t.maximumSignificantDigits=i.length+("string"==typeof a?a.length:0)),""})),t}function ha(e){switch(e){case"sign-auto":return{signDisplay:"auto"};case"sign-accounting":case"()":return{currencySign:"accounting"};case"sign-always":case"+!":return{signDisplay:"always"};case"sign-accounting-always":case"()!":return{signDisplay:"always",currencySign:"accounting"};case"sign-except-zero":case"+?":return{signDisplay:"exceptZero"};case"sign-accounting-except-zero":case"()?":return{signDisplay:"exceptZero",currencySign:"accounting"};case"sign-never":case"+_":return{signDisplay:"never"}}}function ma(e){var t;if("E"===e[0]&&"E"===e[1]?(t={notation:"engineering"},e=e.slice(2)):"E"===e[0]&&(t={notation:"scientific"},e=e.slice(1)),t){var i=e.slice(0,2);if("+!"===i?(t.signDisplay="always",e=e.slice(2)):"+?"===i&&(t.signDisplay="exceptZero",e=e.slice(2)),!la.test(e))throw new Error("Malformed concise eng/scientific notation");t.minimumIntegerDigits=e.length}return t}function ua(e){var t=ha(e);return t||{}}function pa(e){for(var t={},i=0,n=e;i<n.length;i++){var s=n[i];switch(s.stem){case"percent":case"%":t.style="percent";continue;case"%x100":t.style="percent",t.scale=100;continue;case"currency":t.style="currency",t.currency=s.options[0];continue;case"group-off":case",_":t.useGrouping=!1;continue;case"precision-integer":case".":t.maximumFractionDigits=0;continue;case"measure-unit":case"unit":t.style="unit",t.unit=s.options[0].replace(/^(.*?)-/,"");continue;case"compact-short":case"K":t.notation="compact",t.compactDisplay="short";continue;case"compact-long":case"KK":t.notation="compact",t.compactDisplay="long";continue;case"scientific":t=a(a(a({},t),{notation:"scientific"}),s.options.reduce((function(e,t){return a(a({},e),ua(t))}),{}));continue;case"engineering":t=a(a(a({},t),{notation:"engineering"}),s.options.reduce((function(e,t){return a(a({},e),ua(t))}),{}));continue;case"notation-simple":t.notation="standard";continue;case"unit-width-narrow":t.currencyDisplay="narrowSymbol",t.unitDisplay="narrow";continue;case"unit-width-short":t.currencyDisplay="code",t.unitDisplay="short";continue;case"unit-width-full-name":t.currencyDisplay="name",t.unitDisplay="long";continue;case"unit-width-iso-code":t.currencyDisplay="symbol";continue;case"scale":t.scale=parseFloat(s.options[0]);continue;case"integer-width":if(s.options.length>1)throw new RangeError("integer-width stems only accept a single optional option");s.options[0].replace(da,(function(e,i,a,n,s,r){if(i)t.minimumIntegerDigits=a.length;else{if(n&&s)throw new Error("We currently do not support maximum integer digits");if(r)throw new Error("We currently do not support exact integer digits")}return""}));continue}if(la.test(s.stem))t.minimumIntegerDigits=s.stem.length;else if(ra.test(s.stem)){if(s.options.length>1)throw new RangeError("Fraction-precision stems only accept a single optional option");s.stem.replace(ra,(function(e,i,a,n,s,r){return"*"===a?t.minimumFractionDigits=i.length:n&&"#"===n[0]?t.maximumFractionDigits=n.length:s&&r?(t.minimumFractionDigits=s.length,t.maximumFractionDigits=s.length+r.length):(t.minimumFractionDigits=i.length,t.maximumFractionDigits=i.length),""}));var r=s.options[0];"w"===r?t=a(a({},t),{trailingZeroDisplay:"stripIfInteger"}):r&&(t=a(a({},t),ca(r)))}else if(oa.test(s.stem))t=a(a({},t),ca(s.stem));else{var o=ha(s.stem);o&&(t=a(a({},t),o));var d=ma(s.stem);d&&(t=a(a({},t),d))}}return t}var ga,va={AX:["H"],BQ:["H"],CP:["H"],CZ:["H"],DK:["H"],FI:["H"],ID:["H"],IS:["H"],ML:["H"],NE:["H"],RU:["H"],SE:["H"],SJ:["H"],SK:["H"],AS:["h","H"],BT:["h","H"],DJ:["h","H"],ER:["h","H"],GH:["h","H"],IN:["h","H"],LS:["h","H"],PG:["h","H"],PW:["h","H"],SO:["h","H"],TO:["h","H"],VU:["h","H"],WS:["h","H"],"001":["H","h"],AL:["h","H","hB"],TD:["h","H","hB"],"ca-ES":["H","h","hB"],CF:["H","h","hB"],CM:["H","h","hB"],"fr-CA":["H","h","hB"],"gl-ES":["H","h","hB"],"it-CH":["H","h","hB"],"it-IT":["H","h","hB"],LU:["H","h","hB"],NP:["H","h","hB"],PF:["H","h","hB"],SC:["H","h","hB"],SM:["H","h","hB"],SN:["H","h","hB"],TF:["H","h","hB"],VA:["H","h","hB"],CY:["h","H","hb","hB"],GR:["h","H","hb","hB"],CO:["h","H","hB","hb"],DO:["h","H","hB","hb"],KP:["h","H","hB","hb"],KR:["h","H","hB","hb"],NA:["h","H","hB","hb"],PA:["h","H","hB","hb"],PR:["h","H","hB","hb"],VE:["h","H","hB","hb"],AC:["H","h","hb","hB"],AI:["H","h","hb","hB"],BW:["H","h","hb","hB"],BZ:["H","h","hb","hB"],CC:["H","h","hb","hB"],CK:["H","h","hb","hB"],CX:["H","h","hb","hB"],DG:["H","h","hb","hB"],FK:["H","h","hb","hB"],GB:["H","h","hb","hB"],GG:["H","h","hb","hB"],GI:["H","h","hb","hB"],IE:["H","h","hb","hB"],IM:["H","h","hb","hB"],IO:["H","h","hb","hB"],JE:["H","h","hb","hB"],LT:["H","h","hb","hB"],MK:["H","h","hb","hB"],MN:["H","h","hb","hB"],MS:["H","h","hb","hB"],NF:["H","h","hb","hB"],NG:["H","h","hb","hB"],NR:["H","h","hb","hB"],NU:["H","h","hb","hB"],PN:["H","h","hb","hB"],SH:["H","h","hb","hB"],SX:["H","h","hb","hB"],TA:["H","h","hb","hB"],ZA:["H","h","hb","hB"],"af-ZA":["H","h","hB","hb"],AR:["H","h","hB","hb"],CL:["H","h","hB","hb"],CR:["H","h","hB","hb"],CU:["H","h","hB","hb"],EA:["H","h","hB","hb"],"es-BO":["H","h","hB","hb"],"es-BR":["H","h","hB","hb"],"es-EC":["H","h","hB","hb"],"es-ES":["H","h","hB","hb"],"es-GQ":["H","h","hB","hb"],"es-PE":["H","h","hB","hb"],GT:["H","h","hB","hb"],HN:["H","h","hB","hb"],IC:["H","h","hB","hb"],KG:["H","h","hB","hb"],KM:["H","h","hB","hb"],LK:["H","h","hB","hb"],MA:["H","h","hB","hb"],MX:["H","h","hB","hb"],NI:["H","h","hB","hb"],PY:["H","h","hB","hb"],SV:["H","h","hB","hb"],UY:["H","h","hB","hb"],JP:["H","h","K"],AD:["H","hB"],AM:["H","hB"],AO:["H","hB"],AT:["H","hB"],AW:["H","hB"],BE:["H","hB"],BF:["H","hB"],BJ:["H","hB"],BL:["H","hB"],BR:["H","hB"],CG:["H","hB"],CI:["H","hB"],CV:["H","hB"],DE:["H","hB"],EE:["H","hB"],FR:["H","hB"],GA:["H","hB"],GF:["H","hB"],GN:["H","hB"],GP:["H","hB"],GW:["H","hB"],HR:["H","hB"],IL:["H","hB"],IT:["H","hB"],KZ:["H","hB"],MC:["H","hB"],MD:["H","hB"],MF:["H","hB"],MQ:["H","hB"],MZ:["H","hB"],NC:["H","hB"],NL:["H","hB"],PM:["H","hB"],PT:["H","hB"],RE:["H","hB"],RO:["H","hB"],SI:["H","hB"],SR:["H","hB"],ST:["H","hB"],TG:["H","hB"],TR:["H","hB"],WF:["H","hB"],YT:["H","hB"],BD:["h","hB","H"],PK:["h","hB","H"],AZ:["H","hB","h"],BA:["H","hB","h"],BG:["H","hB","h"],CH:["H","hB","h"],GE:["H","hB","h"],LI:["H","hB","h"],ME:["H","hB","h"],RS:["H","hB","h"],UA:["H","hB","h"],UZ:["H","hB","h"],XK:["H","hB","h"],AG:["h","hb","H","hB"],AU:["h","hb","H","hB"],BB:["h","hb","H","hB"],BM:["h","hb","H","hB"],BS:["h","hb","H","hB"],CA:["h","hb","H","hB"],DM:["h","hb","H","hB"],"en-001":["h","hb","H","hB"],FJ:["h","hb","H","hB"],FM:["h","hb","H","hB"],GD:["h","hb","H","hB"],GM:["h","hb","H","hB"],GU:["h","hb","H","hB"],GY:["h","hb","H","hB"],JM:["h","hb","H","hB"],KI:["h","hb","H","hB"],KN:["h","hb","H","hB"],KY:["h","hb","H","hB"],LC:["h","hb","H","hB"],LR:["h","hb","H","hB"],MH:["h","hb","H","hB"],MP:["h","hb","H","hB"],MW:["h","hb","H","hB"],NZ:["h","hb","H","hB"],SB:["h","hb","H","hB"],SG:["h","hb","H","hB"],SL:["h","hb","H","hB"],SS:["h","hb","H","hB"],SZ:["h","hb","H","hB"],TC:["h","hb","H","hB"],TT:["h","hb","H","hB"],UM:["h","hb","H","hB"],US:["h","hb","H","hB"],VC:["h","hb","H","hB"],VG:["h","hb","H","hB"],VI:["h","hb","H","hB"],ZM:["h","hb","H","hB"],BO:["H","hB","h","hb"],EC:["H","hB","h","hb"],ES:["H","hB","h","hb"],GQ:["H","hB","h","hb"],PE:["H","hB","h","hb"],AE:["h","hB","hb","H"],"ar-001":["h","hB","hb","H"],BH:["h","hB","hb","H"],DZ:["h","hB","hb","H"],EG:["h","hB","hb","H"],EH:["h","hB","hb","H"],HK:["h","hB","hb","H"],IQ:["h","hB","hb","H"],JO:["h","hB","hb","H"],KW:["h","hB","hb","H"],LB:["h","hB","hb","H"],LY:["h","hB","hb","H"],MO:["h","hB","hb","H"],MR:["h","hB","hb","H"],OM:["h","hB","hb","H"],PH:["h","hB","hb","H"],PS:["h","hB","hb","H"],QA:["h","hB","hb","H"],SA:["h","hB","hb","H"],SD:["h","hB","hb","H"],SY:["h","hB","hb","H"],TN:["h","hB","hb","H"],YE:["h","hB","hb","H"],AF:["H","hb","hB","h"],LA:["H","hb","hB","h"],CN:["H","hB","hb","h"],LV:["H","hB","hb","h"],TL:["H","hB","hb","h"],"zu-ZA":["H","hB","hb","h"],CD:["hB","H"],IR:["hB","H"],"hi-IN":["hB","h","H"],"kn-IN":["hB","h","H"],"ml-IN":["hB","h","H"],"te-IN":["hB","h","H"],KH:["hB","h","H","hb"],"ta-IN":["hB","h","hb","H"],BN:["hb","hB","h","H"],MY:["hb","hB","h","H"],ET:["hB","hb","h","H"],"gu-IN":["hB","hb","h","H"],"mr-IN":["hB","hb","h","H"],"pa-IN":["hB","hb","h","H"],TW:["hB","hb","h","H"],KE:["hB","hb","H","h"],MM:["hB","hb","H","h"],TZ:["hB","hb","H","h"],UG:["hB","hb","H","h"]};function _a(e){var t=e.hourCycle;if(void 0===t&&e.hourCycles&&e.hourCycles.length&&(t=e.hourCycles[0]),t)switch(t){case"h24":return"k";case"h23":return"H";case"h12":return"h";case"h11":return"K";default:throw new Error("Invalid hourCycle")}var i,a=e.language;return"root"!==a&&(i=e.maximize().region),(va[i||""]||va[a||""]||va["".concat(a,"-001")]||va["001"])[0]}var fa=new RegExp("^".concat(ia.source,"*")),ba=new RegExp("".concat(ia.source,"*$"));function ya(e,t){return{start:e,end:t}}var ka=!!String.prototype.startsWith,wa=!!String.fromCodePoint,Aa=!!Object.fromEntries,$a=!!String.prototype.codePointAt,Ta=!!String.prototype.trimStart,Ea=!!String.prototype.trimEnd,ja=!!Number.isSafeInteger?Number.isSafeInteger:function(e){return"number"==typeof e&&isFinite(e)&&Math.floor(e)===e&&Math.abs(e)<=9007199254740991},xa=!0;try{xa="a"===(null===(ga=La("([^\\p{White_Space}\\p{Pattern_Syntax}]*)","yu").exec("a"))||void 0===ga?void 0:ga[0])}catch(P){xa=!1}var Sa,za=ka?function(e,t,i){return e.startsWith(t,i)}:function(e,t,i){return e.slice(i,i+t.length)===t},Oa=wa?String.fromCodePoint:function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];for(var i,a="",n=e.length,s=0;n>s;){if((i=e[s++])>1114111)throw RangeError(i+" is not a valid code point");a+=i<65536?String.fromCharCode(i):String.fromCharCode(55296+((i-=65536)>>10),i%1024+56320)}return a},Ca=Aa?Object.fromEntries:function(e){for(var t={},i=0,a=e;i<a.length;i++){var n=a[i],s=n[0],r=n[1];t[s]=r}return t},Ma=$a?function(e,t){return e.codePointAt(t)}:function(e,t){var i=e.length;if(!(t<0||t>=i)){var a,n=e.charCodeAt(t);return n<55296||n>56319||t+1===i||(a=e.charCodeAt(t+1))<56320||a>57343?n:a-56320+(n-55296<<10)+65536}},Na=Ta?function(e){return e.trimStart()}:function(e){return e.replace(fa,"")},Da=Ea?function(e){return e.trimEnd()}:function(e){return e.replace(ba,"")};function La(e,t){return new RegExp(e,t)}if(xa){var Pa=La("([^\\p{White_Space}\\p{Pattern_Syntax}]*)","yu");Sa=function(e,t){var i;return Pa.lastIndex=t,null!==(i=Pa.exec(e)[1])&&void 0!==i?i:""}}else Sa=function(e,t){for(var i=[];;){var a=Ma(e,t);if(void 0===a||Ia(a)||Ua(a))break;i.push(a),t+=a>=65536?2:1}return Oa.apply(void 0,i)};var Ha=function(){function e(e,t){void 0===t&&(t={}),this.message=e,this.position={offset:0,line:1,column:1},this.ignoreTag=!!t.ignoreTag,this.locale=t.locale,this.requiresOtherClause=!!t.requiresOtherClause,this.shouldParseSkeletons=!!t.shouldParseSkeletons}return e.prototype.parse=function(){if(0!==this.offset())throw Error("parser can only be used once");return this.parseMessage(0,"",!1)},e.prototype.parseMessage=function(e,t,i){for(var a=[];!this.isEOF();){var n=this.char();if(123===n){if((s=this.parseArgument(e,i)).err)return s;a.push(s.val)}else{if(125===n&&e>0)break;if(35!==n||"plural"!==t&&"selectordinal"!==t){if(60===n&&!this.ignoreTag&&47===this.peek()){if(i)break;return this.error(pt.UNMATCHED_CLOSING_TAG,ya(this.clonePosition(),this.clonePosition()))}if(60===n&&!this.ignoreTag&&Ba(this.peek()||0)){if((s=this.parseTag(e,t)).err)return s;a.push(s.val)}else{var s;if((s=this.parseLiteral(e,t)).err)return s;a.push(s.val)}}else{var r=this.clonePosition();this.bump(),a.push({type:gt.pound,location:ya(r,this.clonePosition())})}}}return{val:a,err:null}},e.prototype.parseTag=function(e,t){var i=this.clonePosition();this.bump();var a=this.parseTagName();if(this.bumpSpace(),this.bumpIf("/>"))return{val:{type:gt.literal,value:"<".concat(a,"/>"),location:ya(i,this.clonePosition())},err:null};if(this.bumpIf(">")){var n=this.parseMessage(e+1,t,!0);if(n.err)return n;var s=n.val,r=this.clonePosition();if(this.bumpIf("</")){if(this.isEOF()||!Ba(this.char()))return this.error(pt.INVALID_TAG,ya(r,this.clonePosition()));var o=this.clonePosition();return a!==this.parseTagName()?this.error(pt.UNMATCHED_CLOSING_TAG,ya(o,this.clonePosition())):(this.bumpSpace(),this.bumpIf(">")?{val:{type:gt.tag,value:a,children:s,location:ya(i,this.clonePosition())},err:null}:this.error(pt.INVALID_TAG,ya(r,this.clonePosition())))}return this.error(pt.UNCLOSED_TAG,ya(i,this.clonePosition()))}return this.error(pt.INVALID_TAG,ya(i,this.clonePosition()))},e.prototype.parseTagName=function(){var e=this.offset();for(this.bump();!this.isEOF()&&qa(this.char());)this.bump();return this.message.slice(e,this.offset())},e.prototype.parseLiteral=function(e,t){for(var i=this.clonePosition(),a="";;){var n=this.tryParseQuote(t);if(n)a+=n;else{var s=this.tryParseUnquoted(e,t);if(s)a+=s;else{var r=this.tryParseLeftAngleBracket();if(!r)break;a+=r}}}var o=ya(i,this.clonePosition());return{val:{type:gt.literal,value:a,location:o},err:null}},e.prototype.tryParseLeftAngleBracket=function(){return this.isEOF()||60!==this.char()||!this.ignoreTag&&(Ba(e=this.peek()||0)||47===e)?null:(this.bump(),"<");var e},e.prototype.tryParseQuote=function(e){if(this.isEOF()||39!==this.char())return null;switch(this.peek()){case 39:return this.bump(),this.bump(),"'";case 123:case 60:case 62:case 125:break;case 35:if("plural"===e||"selectordinal"===e)break;return null;default:return null}this.bump();var t=[this.char()];for(this.bump();!this.isEOF();){var i=this.char();if(39===i){if(39!==this.peek()){this.bump();break}t.push(39),this.bump()}else t.push(i);this.bump()}return Oa.apply(void 0,t)},e.prototype.tryParseUnquoted=function(e,t){if(this.isEOF())return null;var i=this.char();return 60===i||123===i||35===i&&("plural"===t||"selectordinal"===t)||125===i&&e>0?null:(this.bump(),Oa(i))},e.prototype.parseArgument=function(e,t){var i=this.clonePosition();if(this.bump(),this.bumpSpace(),this.isEOF())return this.error(pt.EXPECT_ARGUMENT_CLOSING_BRACE,ya(i,this.clonePosition()));if(125===this.char())return this.bump(),this.error(pt.EMPTY_ARGUMENT,ya(i,this.clonePosition()));var a=this.parseIdentifierIfPossible().value;if(!a)return this.error(pt.MALFORMED_ARGUMENT,ya(i,this.clonePosition()));if(this.bumpSpace(),this.isEOF())return this.error(pt.EXPECT_ARGUMENT_CLOSING_BRACE,ya(i,this.clonePosition()));switch(this.char()){case 125:return this.bump(),{val:{type:gt.argument,value:a,location:ya(i,this.clonePosition())},err:null};case 44:return this.bump(),this.bumpSpace(),this.isEOF()?this.error(pt.EXPECT_ARGUMENT_CLOSING_BRACE,ya(i,this.clonePosition())):this.parseArgumentOptions(e,t,a,i);default:return this.error(pt.MALFORMED_ARGUMENT,ya(i,this.clonePosition()))}},e.prototype.parseIdentifierIfPossible=function(){var e=this.clonePosition(),t=this.offset(),i=Sa(this.message,t),a=t+i.length;return this.bumpTo(a),{value:i,location:ya(e,this.clonePosition())}},e.prototype.parseArgumentOptions=function(e,t,i,n){var s,r=this.clonePosition(),o=this.parseIdentifierIfPossible().value,d=this.clonePosition();switch(o){case"":return this.error(pt.EXPECT_ARGUMENT_TYPE,ya(r,d));case"number":case"date":case"time":this.bumpSpace();var l=null;if(this.bumpIf(",")){this.bumpSpace();var c=this.clonePosition();if((f=this.parseSimpleArgStyleIfPossible()).err)return f;if(0===(p=Da(f.val)).length)return this.error(pt.EXPECT_ARGUMENT_STYLE,ya(this.clonePosition(),this.clonePosition()));l={style:p,styleLocation:ya(c,this.clonePosition())}}if((b=this.tryParseArgumentClose(n)).err)return b;var h=ya(n,this.clonePosition());if(l&&za(null==l?void 0:l.style,"::",0)){var m=Na(l.style.slice(2));if("number"===o)return(f=this.parseNumberSkeletonFromString(m,l.styleLocation)).err?f:{val:{type:gt.number,value:i,location:h,style:f.val},err:null};if(0===m.length)return this.error(pt.EXPECT_DATE_TIME_SKELETON,h);var u=m;this.locale&&(u=function(e,t){for(var i="",a=0;a<e.length;a++){var n=e.charAt(a);if("j"===n){for(var s=0;a+1<e.length&&e.charAt(a+1)===n;)s++,a++;var r=1+(1&s),o=s<2?1:3+(s>>1),d=_a(t);for("H"!=d&&"k"!=d||(o=0);o-- >0;)i+="a";for(;r-- >0;)i=d+i}else i+="J"===n?"H":n}return i}(m,this.locale));var p={type:vt.dateTime,pattern:u,location:l.styleLocation,parsedOptions:this.shouldParseSkeletons?na(u):{}};return{val:{type:"date"===o?gt.date:gt.time,value:i,location:h,style:p},err:null}}return{val:{type:"number"===o?gt.number:"date"===o?gt.date:gt.time,value:i,location:h,style:null!==(s=null==l?void 0:l.style)&&void 0!==s?s:null},err:null};case"plural":case"selectordinal":case"select":var g=this.clonePosition();if(this.bumpSpace(),!this.bumpIf(","))return this.error(pt.EXPECT_SELECT_ARGUMENT_OPTIONS,ya(g,a({},g)));this.bumpSpace();var v=this.parseIdentifierIfPossible(),_=0;if("select"!==o&&"offset"===v.value){if(!this.bumpIf(":"))return this.error(pt.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE,ya(this.clonePosition(),this.clonePosition()));var f;if(this.bumpSpace(),(f=this.tryParseDecimalInteger(pt.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE,pt.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE)).err)return f;this.bumpSpace(),v=this.parseIdentifierIfPossible(),_=f.val}var b,y=this.tryParsePluralOrSelectOptions(e,o,t,v);if(y.err)return y;if((b=this.tryParseArgumentClose(n)).err)return b;var k=ya(n,this.clonePosition());return"select"===o?{val:{type:gt.select,value:i,options:Ca(y.val),location:k},err:null}:{val:{type:gt.plural,value:i,options:Ca(y.val),offset:_,pluralType:"plural"===o?"cardinal":"ordinal",location:k},err:null};default:return this.error(pt.INVALID_ARGUMENT_TYPE,ya(r,d))}},e.prototype.tryParseArgumentClose=function(e){return this.isEOF()||125!==this.char()?this.error(pt.EXPECT_ARGUMENT_CLOSING_BRACE,ya(e,this.clonePosition())):(this.bump(),{val:!0,err:null})},e.prototype.parseSimpleArgStyleIfPossible=function(){for(var e=0,t=this.clonePosition();!this.isEOF();){switch(this.char()){case 39:this.bump();var i=this.clonePosition();if(!this.bumpUntil("'"))return this.error(pt.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE,ya(i,this.clonePosition()));this.bump();break;case 123:e+=1,this.bump();break;case 125:if(!(e>0))return{val:this.message.slice(t.offset,this.offset()),err:null};e-=1;break;default:this.bump()}}return{val:this.message.slice(t.offset,this.offset()),err:null}},e.prototype.parseNumberSkeletonFromString=function(e,t){var i=[];try{i=function(e){if(0===e.length)throw new Error("Number skeleton cannot be empty");for(var t=[],i=0,a=e.split(sa).filter((function(e){return e.length>0}));i<a.length;i++){var n=a[i].split("/");if(0===n.length)throw new Error("Invalid number skeleton");for(var s=n[0],r=n.slice(1),o=0,d=r;o<d.length;o++){if(0===d[o].length)throw new Error("Invalid number skeleton")}t.push({stem:s,options:r})}return t}(e)}catch(e){return this.error(pt.INVALID_NUMBER_SKELETON,t)}return{val:{type:vt.number,tokens:i,location:t,parsedOptions:this.shouldParseSkeletons?pa(i):{}},err:null}},e.prototype.tryParsePluralOrSelectOptions=function(e,t,i,a){for(var n,s=!1,r=[],o=new Set,d=a.value,l=a.location;;){if(0===d.length){var c=this.clonePosition();if("select"===t||!this.bumpIf("="))break;var h=this.tryParseDecimalInteger(pt.EXPECT_PLURAL_ARGUMENT_SELECTOR,pt.INVALID_PLURAL_ARGUMENT_SELECTOR);if(h.err)return h;l=ya(c,this.clonePosition()),d=this.message.slice(c.offset,this.offset())}if(o.has(d))return this.error("select"===t?pt.DUPLICATE_SELECT_ARGUMENT_SELECTOR:pt.DUPLICATE_PLURAL_ARGUMENT_SELECTOR,l);"other"===d&&(s=!0),this.bumpSpace();var m=this.clonePosition();if(!this.bumpIf("{"))return this.error("select"===t?pt.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT:pt.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT,ya(this.clonePosition(),this.clonePosition()));var u=this.parseMessage(e+1,t,i);if(u.err)return u;var p=this.tryParseArgumentClose(m);if(p.err)return p;r.push([d,{value:u.val,location:ya(m,this.clonePosition())}]),o.add(d),this.bumpSpace(),d=(n=this.parseIdentifierIfPossible()).value,l=n.location}return 0===r.length?this.error("select"===t?pt.EXPECT_SELECT_ARGUMENT_SELECTOR:pt.EXPECT_PLURAL_ARGUMENT_SELECTOR,ya(this.clonePosition(),this.clonePosition())):this.requiresOtherClause&&!s?this.error(pt.MISSING_OTHER_CLAUSE,ya(this.clonePosition(),this.clonePosition())):{val:r,err:null}},e.prototype.tryParseDecimalInteger=function(e,t){var i=1,a=this.clonePosition();this.bumpIf("+")||this.bumpIf("-")&&(i=-1);for(var n=!1,s=0;!this.isEOF();){var r=this.char();if(!(r>=48&&r<=57))break;n=!0,s=10*s+(r-48),this.bump()}var o=ya(a,this.clonePosition());return n?ja(s*=i)?{val:s,err:null}:this.error(t,o):this.error(e,o)},e.prototype.offset=function(){return this.position.offset},e.prototype.isEOF=function(){return this.offset()===this.message.length},e.prototype.clonePosition=function(){return{offset:this.position.offset,line:this.position.line,column:this.position.column}},e.prototype.char=function(){var e=this.position.offset;if(e>=this.message.length)throw Error("out of bound");var t=Ma(this.message,e);if(void 0===t)throw Error("Offset ".concat(e," is at invalid UTF-16 code unit boundary"));return t},e.prototype.error=function(e,t){return{val:null,err:{kind:e,message:this.message,location:t}}},e.prototype.bump=function(){if(!this.isEOF()){var e=this.char();10===e?(this.position.line+=1,this.position.column=1,this.position.offset+=1):(this.position.column+=1,this.position.offset+=e<65536?1:2)}},e.prototype.bumpIf=function(e){if(za(this.message,e,this.offset())){for(var t=0;t<e.length;t++)this.bump();return!0}return!1},e.prototype.bumpUntil=function(e){var t=this.offset(),i=this.message.indexOf(e,t);return i>=0?(this.bumpTo(i),!0):(this.bumpTo(this.message.length),!1)},e.prototype.bumpTo=function(e){if(this.offset()>e)throw Error("targetOffset ".concat(e," must be greater than or equal to the current offset ").concat(this.offset()));for(e=Math.min(e,this.message.length);;){var t=this.offset();if(t===e)break;if(t>e)throw Error("targetOffset ".concat(e," is at invalid UTF-16 code unit boundary"));if(this.bump(),this.isEOF())break}},e.prototype.bumpSpace=function(){for(;!this.isEOF()&&Ia(this.char());)this.bump()},e.prototype.peek=function(){if(this.isEOF())return null;var e=this.char(),t=this.offset(),i=this.message.charCodeAt(t+(e>=65536?2:1));return null!=i?i:null},e}();function Ba(e){return e>=97&&e<=122||e>=65&&e<=90}function qa(e){return 45===e||46===e||e>=48&&e<=57||95===e||e>=97&&e<=122||e>=65&&e<=90||183==e||e>=192&&e<=214||e>=216&&e<=246||e>=248&&e<=893||e>=895&&e<=8191||e>=8204&&e<=8205||e>=8255&&e<=8256||e>=8304&&e<=8591||e>=11264&&e<=12271||e>=12289&&e<=55295||e>=63744&&e<=64975||e>=65008&&e<=65533||e>=65536&&e<=983039}function Ia(e){return e>=9&&e<=13||32===e||133===e||e>=8206&&e<=8207||8232===e||8233===e}function Ua(e){return e>=33&&e<=35||36===e||e>=37&&e<=39||40===e||41===e||42===e||43===e||44===e||45===e||e>=46&&e<=47||e>=58&&e<=59||e>=60&&e<=62||e>=63&&e<=64||91===e||92===e||93===e||94===e||96===e||123===e||124===e||125===e||126===e||161===e||e>=162&&e<=165||166===e||167===e||169===e||171===e||172===e||174===e||176===e||177===e||182===e||187===e||191===e||215===e||247===e||e>=8208&&e<=8213||e>=8214&&e<=8215||8216===e||8217===e||8218===e||e>=8219&&e<=8220||8221===e||8222===e||8223===e||e>=8224&&e<=8231||e>=8240&&e<=8248||8249===e||8250===e||e>=8251&&e<=8254||e>=8257&&e<=8259||8260===e||8261===e||8262===e||e>=8263&&e<=8273||8274===e||8275===e||e>=8277&&e<=8286||e>=8592&&e<=8596||e>=8597&&e<=8601||e>=8602&&e<=8603||e>=8604&&e<=8607||8608===e||e>=8609&&e<=8610||8611===e||e>=8612&&e<=8613||8614===e||e>=8615&&e<=8621||8622===e||e>=8623&&e<=8653||e>=8654&&e<=8655||e>=8656&&e<=8657||8658===e||8659===e||8660===e||e>=8661&&e<=8691||e>=8692&&e<=8959||e>=8960&&e<=8967||8968===e||8969===e||8970===e||8971===e||e>=8972&&e<=8991||e>=8992&&e<=8993||e>=8994&&e<=9e3||9001===e||9002===e||e>=9003&&e<=9083||9084===e||e>=9085&&e<=9114||e>=9115&&e<=9139||e>=9140&&e<=9179||e>=9180&&e<=9185||e>=9186&&e<=9254||e>=9255&&e<=9279||e>=9280&&e<=9290||e>=9291&&e<=9311||e>=9472&&e<=9654||9655===e||e>=9656&&e<=9664||9665===e||e>=9666&&e<=9719||e>=9720&&e<=9727||e>=9728&&e<=9838||9839===e||e>=9840&&e<=10087||10088===e||10089===e||10090===e||10091===e||10092===e||10093===e||10094===e||10095===e||10096===e||10097===e||10098===e||10099===e||10100===e||10101===e||e>=10132&&e<=10175||e>=10176&&e<=10180||10181===e||10182===e||e>=10183&&e<=10213||10214===e||10215===e||10216===e||10217===e||10218===e||10219===e||10220===e||10221===e||10222===e||10223===e||e>=10224&&e<=10239||e>=10240&&e<=10495||e>=10496&&e<=10626||10627===e||10628===e||10629===e||10630===e||10631===e||10632===e||10633===e||10634===e||10635===e||10636===e||10637===e||10638===e||10639===e||10640===e||10641===e||10642===e||10643===e||10644===e||10645===e||10646===e||10647===e||10648===e||e>=10649&&e<=10711||10712===e||10713===e||10714===e||10715===e||e>=10716&&e<=10747||10748===e||10749===e||e>=10750&&e<=11007||e>=11008&&e<=11055||e>=11056&&e<=11076||e>=11077&&e<=11078||e>=11079&&e<=11084||e>=11085&&e<=11123||e>=11124&&e<=11125||e>=11126&&e<=11157||11158===e||e>=11159&&e<=11263||e>=11776&&e<=11777||11778===e||11779===e||11780===e||11781===e||e>=11782&&e<=11784||11785===e||11786===e||11787===e||11788===e||11789===e||e>=11790&&e<=11798||11799===e||e>=11800&&e<=11801||11802===e||11803===e||11804===e||11805===e||e>=11806&&e<=11807||11808===e||11809===e||11810===e||11811===e||11812===e||11813===e||11814===e||11815===e||11816===e||11817===e||e>=11818&&e<=11822||11823===e||e>=11824&&e<=11833||e>=11834&&e<=11835||e>=11836&&e<=11839||11840===e||11841===e||11842===e||e>=11843&&e<=11855||e>=11856&&e<=11857||11858===e||e>=11859&&e<=11903||e>=12289&&e<=12291||12296===e||12297===e||12298===e||12299===e||12300===e||12301===e||12302===e||12303===e||12304===e||12305===e||e>=12306&&e<=12307||12308===e||12309===e||12310===e||12311===e||12312===e||12313===e||12314===e||12315===e||12316===e||12317===e||e>=12318&&e<=12319||12320===e||12336===e||64830===e||64831===e||e>=65093&&e<=65094}function Ra(e,t){void 0===t&&(t={}),t=a({shouldParseSkeletons:!0,requiresOtherClause:!0},t);var i=new Ha(e,t).parse();if(i.err){var n=SyntaxError(pt[i.err.kind]);throw n.location=i.err.location,n.originalMessage=i.err.message,n}return(null==t?void 0:t.captureLocation)||function e(t){t.forEach((function(t){if(delete t.location,Yi(t)||Wi(t))for(var i in t.options)delete t.options[i].location,e(t.options[i].value);else Ki(t)&&ea(t.style)||(Zi(t)||Qi(t))&&ta(t.style)?delete t.style.location:Ji(t)&&e(t.children)}))}(i.val),i.val}function Va(e,t){var i=t&&t.cache?t.cache:Xa,a=t&&t.serializer?t.serializer:Qa;return(t&&t.strategy?t.strategy:Za)(e,{cache:i,serializer:a})}function Ga(e,t,i,a){var n,s=null==(n=a)||"number"==typeof n||"boolean"==typeof n?a:i(a),r=t.get(s);return void 0===r&&(r=e.call(this,a),t.set(s,r)),r}function Fa(e,t,i){var a=Array.prototype.slice.call(arguments,3),n=i(a),s=t.get(n);return void 0===s&&(s=e.apply(this,a),t.set(n,s)),s}function Ka(e,t,i,a,n){return i.bind(t,e,a,n)}function Za(e,t){return Ka(e,this,1===e.length?Ga:Fa,t.cache.create(),t.serializer)}var Qa=function(){return JSON.stringify(arguments)};function Ya(){this.cache=Object.create(null)}Ya.prototype.get=function(e){return this.cache[e]},Ya.prototype.set=function(e,t){this.cache[e]=t};var Wa,Xa={create:function(){return new Ya}},Ja={variadic:function(e,t){return Ka(e,this,Fa,t.cache.create(),t.serializer)},monadic:function(e,t){return Ka(e,this,Ga,t.cache.create(),t.serializer)}};!function(e){e.MISSING_VALUE="MISSING_VALUE",e.INVALID_VALUE="INVALID_VALUE",e.MISSING_INTL_API="MISSING_INTL_API"}(Wa||(Wa={}));var en,tn=function(e){function t(t,i,a){var n=e.call(this,t)||this;return n.code=i,n.originalMessage=a,n}return i(t,e),t.prototype.toString=function(){return"[formatjs Error: ".concat(this.code,"] ").concat(this.message)},t}(Error),an=function(e){function t(t,i,a,n){return e.call(this,'Invalid values for "'.concat(t,'": "').concat(i,'". Options are "').concat(Object.keys(a).join('", "'),'"'),Wa.INVALID_VALUE,n)||this}return i(t,e),t}(tn),nn=function(e){function t(t,i,a){return e.call(this,'Value for "'.concat(t,'" must be of type ').concat(i),Wa.INVALID_VALUE,a)||this}return i(t,e),t}(tn),sn=function(e){function t(t,i){return e.call(this,'The intl string context variable "'.concat(t,'" was not provided to the string "').concat(i,'"'),Wa.MISSING_VALUE,i)||this}return i(t,e),t}(tn);function rn(e){return"function"==typeof e}function on(e,t,i,a,n,s,r){if(1===e.length&&Gi(e[0]))return[{type:en.literal,value:e[0].value}];for(var o=[],d=0,l=e;d<l.length;d++){var c=l[d];if(Gi(c))o.push({type:en.literal,value:c.value});else if(Xi(c))"number"==typeof s&&o.push({type:en.literal,value:i.getNumberFormat(t).format(s)});else{var h=c.value;if(!n||!(h in n))throw new sn(h,r);var m=n[h];if(Fi(c))m&&"string"!=typeof m&&"number"!=typeof m||(m="string"==typeof m||"number"==typeof m?String(m):""),o.push({type:"string"==typeof m?en.literal:en.object,value:m});else if(Zi(c)){var u="string"==typeof c.style?a.date[c.style]:ta(c.style)?c.style.parsedOptions:void 0;o.push({type:en.literal,value:i.getDateTimeFormat(t,u).format(m)})}else if(Qi(c)){u="string"==typeof c.style?a.time[c.style]:ta(c.style)?c.style.parsedOptions:a.time.medium;o.push({type:en.literal,value:i.getDateTimeFormat(t,u).format(m)})}else if(Ki(c)){(u="string"==typeof c.style?a.number[c.style]:ea(c.style)?c.style.parsedOptions:void 0)&&u.scale&&(m*=u.scale||1),o.push({type:en.literal,value:i.getNumberFormat(t,u).format(m)})}else{if(Ji(c)){var p=c.children,g=c.value,v=n[g];if(!rn(v))throw new nn(g,"function",r);var _=v(on(p,t,i,a,n,s).map((function(e){return e.value})));Array.isArray(_)||(_=[_]),o.push.apply(o,_.map((function(e){return{type:"string"==typeof e?en.literal:en.object,value:e}})))}if(Yi(c)){if(!(f=c.options[m]||c.options.other))throw new an(c.value,m,Object.keys(c.options),r);o.push.apply(o,on(f.value,t,i,a,n))}else if(Wi(c)){var f;if(!(f=c.options["=".concat(m)])){if(!Intl.PluralRules)throw new tn('Intl.PluralRules is not available in this environment.\nTry polyfilling it using "@formatjs/intl-pluralrules"\n',Wa.MISSING_INTL_API,r);var b=i.getPluralRules(t,{type:c.pluralType}).select(m-(c.offset||0));f=c.options[b]||c.options.other}if(!f)throw new an(c.value,m,Object.keys(c.options),r);o.push.apply(o,on(f.value,t,i,a,n,m-(c.offset||0)))}else;}}}return function(e){return e.length<2?e:e.reduce((function(e,t){var i=e[e.length-1];return i&&i.type===en.literal&&t.type===en.literal?i.value+=t.value:e.push(t),e}),[])}(o)}function dn(e,t){return t?Object.keys(e).reduce((function(i,n){var s,r;return i[n]=(s=e[n],(r=t[n])?a(a(a({},s||{}),r||{}),Object.keys(s).reduce((function(e,t){return e[t]=a(a({},s[t]),r[t]||{}),e}),{})):s),i}),a({},e)):e}function ln(e){return{create:function(){return{get:function(t){return e[t]},set:function(t,i){e[t]=i}}}}}!function(e){e[e.literal=0]="literal",e[e.object=1]="object"}(en||(en={}));var cn=function(){function e(t,i,a,n){var r,o=this;if(void 0===i&&(i=e.defaultLocale),this.formatterCache={number:{},dateTime:{},pluralRules:{}},this.format=function(e){var t=o.formatToParts(e);if(1===t.length)return t[0].value;var i=t.reduce((function(e,t){return e.length&&t.type===en.literal&&"string"==typeof e[e.length-1]?e[e.length-1]+=t.value:e.push(t.value),e}),[]);return i.length<=1?i[0]||"":i},this.formatToParts=function(e){return on(o.ast,o.locales,o.formatters,o.formats,e,void 0,o.message)},this.resolvedOptions=function(){return{locale:o.resolvedLocale.toString()}},this.getAst=function(){return o.ast},this.locales=i,this.resolvedLocale=e.resolveLocale(i),"string"==typeof t){if(this.message=t,!e.__parse)throw new TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");this.ast=e.__parse(t,{ignoreTag:null==n?void 0:n.ignoreTag,locale:this.resolvedLocale})}else this.ast=t;if(!Array.isArray(this.ast))throw new TypeError("A message must be provided as a String or AST.");this.formats=dn(e.formats,a),this.formatters=n&&n.formatters||(void 0===(r=this.formatterCache)&&(r={number:{},dateTime:{},pluralRules:{}}),{getNumberFormat:Va((function(){for(var e,t=[],i=0;i<arguments.length;i++)t[i]=arguments[i];return new((e=Intl.NumberFormat).bind.apply(e,s([void 0],t,!1)))}),{cache:ln(r.number),strategy:Ja.variadic}),getDateTimeFormat:Va((function(){for(var e,t=[],i=0;i<arguments.length;i++)t[i]=arguments[i];return new((e=Intl.DateTimeFormat).bind.apply(e,s([void 0],t,!1)))}),{cache:ln(r.dateTime),strategy:Ja.variadic}),getPluralRules:Va((function(){for(var e,t=[],i=0;i<arguments.length;i++)t[i]=arguments[i];return new((e=Intl.PluralRules).bind.apply(e,s([void 0],t,!1)))}),{cache:ln(r.pluralRules),strategy:Ja.variadic})})}return Object.defineProperty(e,"defaultLocale",{get:function(){return e.memoizedDefaultLocale||(e.memoizedDefaultLocale=(new Intl.NumberFormat).resolvedOptions().locale),e.memoizedDefaultLocale},enumerable:!1,configurable:!0}),e.memoizedDefaultLocale=null,e.resolveLocale=function(e){var t=Intl.NumberFormat.supportedLocalesOf(e);return t.length>0?new Intl.Locale(t[0]):new Intl.Locale("string"==typeof e?e:e[0])},e.__parse=Ra,e.formats={number:{integer:{maximumFractionDigits:0},currency:{style:"currency"},percent:{style:"percent"}},date:{short:{month:"numeric",day:"numeric",year:"2-digit"},medium:{month:"short",day:"numeric",year:"numeric"},long:{month:"long",day:"numeric",year:"numeric"},full:{weekday:"long",month:"long",day:"numeric",year:"numeric"}},time:{short:{hour:"numeric",minute:"numeric"},medium:{hour:"numeric",minute:"numeric",second:"numeric"},long:{hour:"numeric",minute:"numeric",second:"numeric",timeZoneName:"short"},full:{hour:"numeric",minute:"numeric",second:"numeric",timeZoneName:"short"}}},e}(),hn={ca:kt,cs:Et,da:Ot,de:Lt,en:It,et:Wt,es:Ft,fr:ai,it:di,nl:ui,sk:fi,sv:Ai,vi:Si,"zh-Hans":Ni,"zh-Hant":Bi,ru:Vi};function mn(e,t,...i){const a=t.replace(/['"]+/g,"");var n;try{n=e.split(".").reduce((e,t)=>e[t],hn[a])}catch(t){n=e.split(".").reduce((e,t)=>e[t],hn.en)}if(void 0===n&&(n=e.split(".").reduce((e,t)=>e[t],hn.en)),!i.length)return n;const s={};for(let e=0;e<i.length;e+=2){let t=i[e];t=t.replace(/^{([^}]+)?}$/,"$1"),s[t]=i[e+1]}try{return new cn(n,t).format(s)}catch(e){return"Translation "+e}}var un,pn,gn,vn,_n,fn,bn,yn,kn;!function(e){e.ArmedAway="mdi:lock",e.ArmedHome="mdi:home",e.ArmedNight="mdi:moon-waning-crescent",e.ArmedCustom="mdi:shield",e.ArmedVacation="mdi:airplane"}(un||(un={})),function(e){e.STATE_ALARM_DISARMED="disarmed",e.STATE_ALARM_ARMED_HOME="armed_home",e.STATE_ALARM_ARMED_AWAY="armed_away",e.STATE_ALARM_ARMED_NIGHT="armed_night",e.STATE_ALARM_ARMED_CUSTOM_BYPASS="armed_custom_bypass",e.STATE_ALARM_ARMED_VACATION="armed_vacation",e.STATE_ALARM_PENDING="pending",e.STATE_ALARM_ARMING="arming",e.STATE_ALARM_DISARMING="disarming",e.STATE_ALARM_TRIGGERED="triggered"}(pn||(pn={})),function(e){e.COMMAND_ALARM_DISARM="disarm",e.COMMAND_ALARM_ARM_HOME="arm_home",e.COMMAND_ALARM_ARM_AWAY="arm_away",e.COMMAND_ALARM_ARM_NIGHT="arm_night",e.COMMAND_ALARM_ARM_CUSTOM_BYPASS="arm_custom_bypass",e.COMMAND_ALARM_ARM_VACATION="arm_vacation"}(gn||(gn={})),function(e){e.Door="door",e.Window="window",e.Motion="motion",e.Tamper="tamper",e.Environmental="environmental",e.Other="other"}(vn||(vn={})),function(e){e.Door="mdi:door-closed",e.Window="mdi:window-closed",e.Motion="mdi:motion-sensor-off",e.Tamper="mdi:crop-portrait",e.Environmental="mdi:fire",e.Other="mdi:check-circle"}(_n||(_n={})),function(e){e.Door="mdi:door-open",e.Window="mdi:window-open",e.Motion="mdi:motion-sensor",e.Tamper="mdi:vibrate",e.Environmental="mdi:fire-alert",e.Other="mdi:alert-circle"}(fn||(fn={})),function(e){e.Notification="notification",e.Action="action"}(bn||(bn={})),function(e){e.ArmedAway="armed_away",e.ArmedHome="armed_home",e.ArmedNight="armed_night",e.ArmedVacation="armed_vacation",e.ArmedCustom="armed_custom_bypass"}(yn||(yn={})),function(e){e.Armed="armed",e.Disarmed="disarmed",e.Triggered="triggered",e.Untriggered="untriggered",e.ArmFailure="arm_failure",e.Arming="arming",e.Pending="pending"}(kn||(kn={}));const wn=(e,t,i,a)=>{a=a||{},i=null==i?{}:i;const n=new Event(t,{bubbles:void 0===a.bubbles||a.bubbles,cancelable:Boolean(a.cancelable),composed:void 0===a.composed||a.composed});return n.detail=i,e.dispatchEvent(n),n};function An(e){return(e=e.replace("_"," ")).charAt(0).toUpperCase()+e.slice(1)}function $n(e){return e?e.attributes&&e.attributes.friendly_name?e.attributes.friendly_name:String(e.entity_id.split(".").pop()):"(unrecognized entity)"}function Tn(e){let t=[];return e.forEach(e=>{t.find(t=>"object"==typeof e?function(...e){return e.every(t=>JSON.stringify(t)===JSON.stringify(e[0]))}(t,e):t===e)||t.push(e)}),t}function En(e,t){return e.filter(e=>e!==t)}function jn(e,t){return e?Object.entries(e).filter(([e])=>t.includes(e)).reduce((e,[t,i])=>Object.assign(e,{[t]:i}),{}):{}}const xn=(e,...t)=>{const i={};let a;for(a in e)t.includes(a)||(i[a]=e[a]);return i};function Sn(e){return null!=e}function zn(e,t){if(null===e||null===t)return e===t;const i=Object.keys(e),a=Object.keys(t);if(i.length!==a.length)return!1;for(const a of i)if("object"==typeof e[a]&&"object"==typeof t[a]){if(!zn(e[a],t[a]))return!1}else if(e[a]!==t[a])return!1;return!0}function On(e,t){const i=e.hasOwnProperty("tagName")?e:e.target;wn(i,"show-dialog",{dialogTag:"error-dialog",dialogImport:()=>Promise.resolve().then((function(){return Os})),dialogParams:{error:t}})}function Cn(e,t){On(t,Te`
    <b>Something went wrong!</b>
    <br />
    ${e.body.message?Te`
          ${e.body.message}
          <br />
          <br />
        `:""}
    ${e.error}
    <br />
    <br />
    Please
    <a href="https://github.com/nielsfaber/alarmo/issues">report</a>
    the bug.
  `)}const Mn=(e,t)=>{var i,a,n,s,r;if(!e)return!1;switch(e){case pn.STATE_ALARM_ARMED_AWAY:return null===(i=t[yn.ArmedAway])||void 0===i?void 0:i.enabled;case pn.STATE_ALARM_ARMED_HOME:return null===(a=t[yn.ArmedHome])||void 0===a?void 0:a.enabled;case pn.STATE_ALARM_ARMED_NIGHT:return null===(n=t[yn.ArmedNight])||void 0===n?void 0:n.enabled;case pn.STATE_ALARM_ARMED_CUSTOM_BYPASS:return null===(s=t[yn.ArmedCustom])||void 0===s?void 0:s.enabled;case pn.STATE_ALARM_ARMED_VACATION:return null===(r=t[yn.ArmedVacation])||void 0===r?void 0:r.enabled;default:return!0}};function Nn(e,t){return Object.entries(t).forEach(([t,i])=>{e=t in e&&"object"==typeof e[t]&&null!==e[t]?Object.assign(Object.assign({},e),{[t]:Nn(e[t],i)}):Object.assign(Object.assign({},e),{[t]:i})}),e}function Dn(e,t){const i=e=>"object"==typeof e?i(e.name):e.trim().toLowerCase();return i(e)<i(t)?-1:1}const Ln=(e,t,i=!1)=>{i?history.replaceState(null,"",t):history.pushState(null,"",t),wn(window,"location-changed",{replace:i})};function Pn(e){return e.substr(0,e.indexOf("."))}function Hn(e){return e.substr(e.indexOf(".")+1)}function Bn(e,t){const i={alert:"mdi:alert",automation:"mdi:playlist-play",calendar:"mdi:calendar",camera:"mdi:video",climate:"mdi:thermostat",configurator:"mdi:settings",conversation:"mdi:text-to-speech",device_tracker:"mdi:account",fan:"mdi:fan",group:"mdi:google-circles-communities",history_graph:"mdi:chart-line",homeassistant:"mdi:home-assistant",homekit:"mdi:home-automation",image_processing:"mdi:image-filter-frames",input_boolean:"mdi:drawing",input_datetime:"mdi:calendar-clock",input_number:"mdi:ray-vertex",input_select:"mdi:format-list-bulleted",input_text:"mdi:textbox",light:"mdi:lightbulb",mailbox:"mdi:mailbox",notify:"mdi:comment-alert",person:"mdi:account",plant:"mdi:flower",proximity:"mdi:apple-safari",remote:"mdi:remote",scene:"mdi:google-pages",script:"mdi:file-document",sensor:"mdi:eye",simple_alarm:"mdi:bell",sun:"mdi:white-balance-sunny",switch:"mdi:flash",timer:"mdi:timer",updater:"mdi:cloud-upload",vacuum:"mdi:robot-vacuum",water_heater:"mdi:thermometer",weblink:"mdi:open-in-new"};if(e in i)return i[e];switch(e){case"alarm_control_panel":switch(t){case"armed_home":return"mdi:bell-plus";case"armed_night":return"mdi:bell-sleep";case"disarmed":return"mdi:bell-outline";case"triggered":return"mdi:bell-ring";default:return"mdi:bell"}case"binary_sensor":return t&&"off"===t?"mdi:radiobox-blank":"mdi:checkbox-marked-circle";case"cover":return"closed"===t?"mdi:window-closed":"mdi:window-open";case"lock":return t&&"unlocked"===t?"mdi:lock-open":"mdi:lock";case"media_player":return t&&"off"!==t&&"idle"!==t?"mdi:cast-connected":"mdi:cast";case"zwave":switch(t){case"dead":return"mdi:emoticon-dead";case"sleeping":return"mdi:sleep";case"initializing":return"mdi:timer-sand";default:return"mdi:z-wave"}default:return"mdi:bookmark"}}const qn=h`
  ha-card {
    display: flex;
    flex-direction: column;
    margin: 5px;
    max-width: calc(100vw - 10px);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
  }
  .card-header .name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  div.warning {
    color: var(--error-color);
    margin-top: 20px;
  }

  div.checkbox-row {
    min-height: 40px;
    display: flex;
    align-items: center;
  }

  div.checkbox-row ha-switch {
    margin-right: 20px;
  }

  div.checkbox-row.right ha-switch {
    margin-left: 20px;
    position: absolute;
    right: 0px;
  }

  mwc-button.active:not([disabled]) {
    background: var(--primary-color);
    --mdc-theme-primary: var(--text-primary-color);
    border-radius: 4px;
  }
  mwc-button.warning {
    --mdc-theme-primary: var(--error-color);
  }
  mwc-button.success {
    --mdc-theme-primary: var(--success-color);
  }

  div.entity-row {
    display: flex;
    align-items: center;
    flex-direction: row;
    margin: 10px 0px;
  }
  div.entity-row .info {
    margin-left: 16px;
    flex: 1 0 60px;
  }
  div.entity-row .info,
  div.entity-row .info > * {
    color: var(--primary-text-color);
    transition: color 0.2s ease-in-out;
  }
  div.entity-row .secondary {
    display: block;
    color: var(--secondary-text-color);
    transition: color 0.2s ease-in-out;
  }
  div.entity-row state-badge {
    flex: 0 0 40px;
  }

  ha-dialog div.wrapper {
    margin-bottom: -20px;
  }

  ha-textfield {
    min-width: 220px;
  }

  a,
  a:visited {
    color: var(--primary-color);
  }
  mwc-button ha-icon {
    padding-right: 11px;
  }
  mwc-button[trailingIcon] ha-icon {
    padding: 0px 0px 0px 6px;
  }
  mwc-button.vertical {
    height: 60px;
    --mdc-button-height: 60px;
    background: var(--primary-color);
    --mdc-theme-primary: var(--text-primary-color);
  }
  mwc-button.vertical div {
    display: flex;
    flex-direction: column;
  }
  mwc-button.vertical span {
    display: flex;
  }
  mwc-button.vertical ha-icon {
    display: flex;
    margin-left: 50%;
  }
  mwc-tab {
    --mdc-tab-color-default: var(--secondary-text-color);
    --mdc-tab-text-label-color-default: var(--secondary-text-color);
  }
  mwc-tab ha-icon {
    --mdc-icon-size: 20px;
  }
  mwc-tab.disabled {
    --mdc-theme-primary: var(--disabled-text-color);
    --mdc-tab-color-default: var(--disabled-text-color);
    --mdc-tab-text-label-color-default: var(--disabled-text-color);
  }

  ha-card settings-row:first-child,
  ha-card settings-row:first-of-type {
    border-top: 0px;
  }

  ha-card > ha-card {
    margin: 10px;
  }
`,In=h`
  /* mwc-dialog (ha-dialog) styles */
  ha-dialog {
    --mdc-dialog-min-width: 400px;
    --mdc-dialog-max-width: 600px;
    --mdc-dialog-heading-ink-color: var(--primary-text-color);
    --mdc-dialog-content-ink-color: var(--primary-text-color);
    --justify-action-buttons: space-between;
  }
  /* make dialog fullscreen on small screens */
  @media all and (max-width: 450px), all and (max-height: 500px) {
    ha-dialog {
      --mdc-dialog-min-width: calc(100vw - env(safe-area-inset-right) - env(safe-area-inset-left));
      --mdc-dialog-max-width: calc(100vw - env(safe-area-inset-right) - env(safe-area-inset-left));
      --mdc-dialog-min-height: 100%;
      --mdc-dialog-max-height: 100%;
      --vertial-align-dialog: flex-end;
      --ha-dialog-border-radius: 0px;
    }
  }
  ha-dialog div.description {
    margin-bottom: 10px;
  }
`,Un=()=>{const e=e=>{let t={};for(var i=0;i<e.length;i+=2){const a=e[i],n=i<e.length?e[i+1]:void 0;t=Object.assign(Object.assign({},t),{[a]:n})}return t},t=window.location.pathname.split("/");let i={page:t[2]||"general",params:{}};if(t.length>3){let a=t.slice(3);if(t.includes("filter")){const t=a.findIndex(e=>"filter"==e),n=a.slice(t+1);a=a.slice(0,t),i=Object.assign(Object.assign({},i),{filter:e(n)})}a.length&&(a.length%2&&(i=Object.assign(Object.assign({},i),{subpage:a.shift()})),a.length&&(i=Object.assign(Object.assign({},i),{params:e(a)})))}return i},Rn=(e,...t)=>{let i={page:e,params:{}};t.forEach(e=>{"string"==typeof e?i=Object.assign(Object.assign({},i),{subpage:e}):"params"in e?i=Object.assign(Object.assign({},i),{params:e.params}):"filter"in e&&(i=Object.assign(Object.assign({},i),{filter:e.filter}))});const a=e=>{let t=Object.keys(e);t=t.filter(t=>e[t]),t.sort();let i="";return t.forEach(t=>{let a=e[t];i=i.length?`${i}/${t}/${a}`:`${t}/${a}`}),i};let n="/alarmo/"+i.page;return i.subpage&&(n=`${n}/${i.subpage}`),a(i.params).length&&(n=`${n}/${a(i.params)}`),i.filter&&(n=`${n}/filter/${a(i.filter)}`),n};var Vn;!function(e){e.Seconds="sec",e.Minutes="min"}(Vn||(Vn={}));const Gn=(e,t)=>Math.round(e/t)*t;let Fn=class extends Ge{constructor(){super(...arguments),this.min=0,this.max=100,this.value=0,this.step=0,this.scaleFactor=1,this.unit=Vn.Minutes,this.disabled=!1,this._min=0,this._max=0,this._step=0}firstUpdated(){this.value>0&&this.value<60?this.setUnit(Vn.Seconds):this.setUnit(Vn.Minutes)}setUnit(e){this.unit=e,this.scaleFactor=this.unit==Vn.Minutes?1/60:1,this._step=((e,t)=>{let i=(t-e)/12;return i=[10/60,.25,20/60,.5,1,2,5].reduce((e,t)=>Math.abs(t-i)<Math.abs(e-i)?t:e),i})(this.min*this.scaleFactor,(Vn.Minutes?this.max:60)*this.scaleFactor),this.step&&this._step>this.step*this.scaleFactor&&(this._step=this.step*this.scaleFactor);let t=this.min*this.scaleFactor;t<this._step&&(t=this._step),this._min=this.min?Gn(t,this._step):0,this._max=(e==Vn.Minutes?Gn(this.max,this._step):60)*this.scaleFactor}render(){return Te`
      <div class="container">
        <div class="prefix">
          <slot name="prefix"></slot>
        </div>
        <div class="slider">
          ${this.getSlider()}
        </div>
        <div class="value${this.disabled?" disabled":""}" @click=${this.toggleUnit}>
          ${this.getValue()}
        </div>
      </div>
    `}getValue(){const e=Gn(this.value*this.scaleFactor,this._step);return!e&&this.zeroValue?this.zeroValue:`${e} ${this.getUnit()}`}getUnit(){switch(this.unit){case Vn.Seconds:return mn("components.time_slider.seconds",this.hass.language);case Vn.Minutes:return mn("components.time_slider.minutes",this.hass.language);default:return""}}getSlider(){const e=Gn(this.value*this.scaleFactor,this._step);return Te`
      <ha-slider
        labeled
        min=${this._min}
        max=${this._max}
        step=${this._step}
        value=${e}
        ?disabled=${this.disabled}
        @change=${this.updateValue}
      ></ha-slider>
    `}updateValue(e){const t=Number(e.target.value);this.value=Gn(t,this._step)/this.scaleFactor,wn(this,"value-changed",{value:this.value})}toggleUnit(){this.setUnit(this.unit==Vn.Minutes?Vn.Seconds:Vn.Minutes)}};Fn.styles=h`
    :host {
      display: flex;
      flex-direction: column;
      min-width: 250px;
    }

    div.container {
      display: grid;
      grid-template-columns: max-content 1fr 60px;
      grid-template-rows: min-content;
      grid-template-areas: 'prefix slider value';
    }

    div.prefix {
      grid-area: prefix;
      display: flex;
      align-items: center;
    }

    div.slider {
      grid-area: slider;
      display: flex;
      align-items: center;
      flex: 1;
    }

    div.value {
      grid-area: value;
      min-width: 40px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      cursor: pointer;
    }

    ha-slider {
      width: 100%;
    }

    .disabled {
      color: var(--disabled-text-color);
    }
  `,n([Qe({type:Number})],Fn.prototype,"min",void 0),n([Qe({type:Number})],Fn.prototype,"max",void 0),n([Qe({type:Number})],Fn.prototype,"value",void 0),n([Qe({type:Number})],Fn.prototype,"step",void 0),n([Qe()],Fn.prototype,"scaleFactor",void 0),n([Qe({type:Vn})],Fn.prototype,"unit",void 0),n([Qe({type:Boolean})],Fn.prototype,"disabled",void 0),n([Qe({type:String})],Fn.prototype,"zeroValue",void 0),Fn=n([Ke("time-slider")],Fn);var Kn="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z",Zn="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
const Qn=2,Yn=6,Wn=e=>(...t)=>({_$litDirective$:e,values:t});class Xn{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}let Jn=class extends Ge{constructor(){super(...arguments),this.label="",this.items=[],this.clearable=!1,this.icons=!1,this.disabled=!1,this.invalid=!1,this.rowRenderer=e=>{const t=Sn(e.description);return this.icons?Te`
        <style>
          mwc-list-item {
            font-size: 15px;
            --mdc-typography-body2-font-size: 14px;
            --mdc-list-item-meta-size: 8px;
            --mdc-list-item-graphic-margin: 8px;
          }
        </style>
        <mwc-list-item graphic="avatar" .twoline=${t}>
          <ha-icon icon="${e.icon}" slot="graphic"></ha-icon>
          <span>${e.name}</span>
          ${t?Te`
                <span slot="secondary">${e.description}</span>
              `:""}
        </mwc-list-item>
      `:Te`
        <style>
          mwc-list-item {
            font-size: 15px;
            --mdc-typography-body2-font-size: 14px;
          }
        </style>
        <mwc-list-item .twoline=${t}>
          <span>${e.name}</span>
          ${t?Te`
                <span slot="secondary">${e.description}</span>
              `:""}
        </mwc-list-item>
      `}}open(){this.updateComplete.then(()=>{var e,t;null===(t=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector("vaadin-combo-box-light"))||void 0===t||t.open()})}disconnectedCallback(){super.disconnectedCallback(),this._overlayMutationObserver&&(this._overlayMutationObserver.disconnect(),this._overlayMutationObserver=void 0)}focus(){this.updateComplete.then(()=>{var e;(null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector("ha-textfield")).focus()})}shouldUpdate(e){if(e.get("items"))if(zn(this.items,e.get("items"))){if(1==e.size)return!1}else this.firstUpdated();return!0}firstUpdated(){this._comboBox.items=this.items}render(){const e=Sn(this._value)&&this.items.find(e=>e.value==this._value);return Te`
      <vaadin-combo-box-light
        item-value-path="value"
        item-id-path="value"
        item-label-path="name"
        .value=${this._value}
        ${as(this.rowRenderer)}
        .allowCustomValue=${this.allowCustomValue}
        ?disabled=${this.disabled}
        @opened-changed=${this._openedChanged}
        @value-changed=${this._valueChanged}
      >
        <ha-textfield
          .label=${this.label}
          class="input"
          autocapitalize="none"
          autocomplete="off"
          autocorrect="off"
          spellcheck="false"
          ?disabled=${this.disabled}
          ?invalid=${this.invalid}
          .icon=${this.icons&&e}
        >
          <ha-icon
            name="icon"
            slot="leadingIcon"
            icon="${this.icons&&e?this.items.find(e=>e.value==this._value).icon:void 0}"
          ></ha-icon>
        </ha-textfield>
        <ha-svg-icon
          class="toggle-button ${this.items.length?"":"disabled"}"
          .path=${this._opened&&this.items.length?"M7,15L12,10L17,15H7Z":"M7,10L12,15L17,10H7Z"}
          @click=${this._toggleOpen}
        ></ha-svg-icon>
        ${this.clearable&&e?Te`
              <ha-svg-icon class="clear-button" @click=${this._clearValue} .path=${Zn}></ha-svg-icon>
            `:""}
      </vaadin-combo-box-light>
    `}_clearValue(e){e.stopPropagation(),this._setValue("")}get _value(){return Sn(this.value)?this.value:""}_toggleOpen(e){var t,i,a,n,s,r;this.items.length?this._opened?(null===(a=null===(i=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector("vaadin-combo-box-light"))||void 0===i?void 0:i.inputElement)||void 0===a||a.blur(),e.stopPropagation()):null===(r=null===(s=null===(n=this.shadowRoot)||void 0===n?void 0:n.querySelector("vaadin-combo-box-light"))||void 0===s?void 0:s.inputElement)||void 0===r||r.focus():e.stopPropagation()}_openedChanged(e){if(this._opened=e.detail.value,this._opened&&"MutationObserver"in window&&!this._overlayMutationObserver){const e=document.querySelector("vaadin-combo-box-overlay");if(!e)return;this._overlayMutationObserver=new MutationObserver(t=>{t.forEach(t=>{var i;"attributes"===t.type&&"inert"===t.attributeName&&!0===e.inert?(e.inert=!1,null===(i=this._overlayMutationObserver)||void 0===i||i.disconnect(),this._overlayMutationObserver=void 0):"childList"===t.type&&t.removedNodes.forEach(e=>{var t;"VAADIN-COMBO-BOX-OVERLAY"===e.nodeName&&(null===(t=this._overlayMutationObserver)||void 0===t||t.disconnect(),this._overlayMutationObserver=void 0)})})}),this._overlayMutationObserver.observe(e,{attributes:!0}),this._overlayMutationObserver.observe(document.body,{childList:!0})}}_valueChanged(e){const t=e.detail.value;t!==this._value&&this._setValue(t)}_setValue(e){this.value=e,setTimeout(()=>{wn(this,"value-changed",{value:e})},0)}static get styles(){return h`
      :host {
        display: block;
      }
      vaadin-combo-box-light {
        position: relative;
      }
      ha-textfield {
        width: 100%;
      }
      ha-textfield > ha-icon-button {
        --mdc-icon-button-size: 24px;
        padding: 2px;
        color: var(--secondary-text-color);
      }
      ha-svg-icon {
        color: var(--input-dropdown-icon-color);
        position: absolute;
        cursor: pointer;
      }
      ha-svg-icon.disabled {
        cursor: default;
        color: var(--disabled-text-color);
      }
      .toggle-button {
        right: 12px;
        bottom: 5px;
      }
      :host([opened]) .toggle-button {
        color: var(--primary-color);
      }
      .clear-button {
        --mdc-icon-size: 20px;
        bottom: 5px;
        right: 36px;
      }
    `}};n([Qe()],Jn.prototype,"label",void 0),n([Qe()],Jn.prototype,"value",void 0),n([Qe()],Jn.prototype,"items",void 0),n([Qe()],Jn.prototype,"clearable",void 0),n([Qe()],Jn.prototype,"icons",void 0),n([Qe({type:Boolean})],Jn.prototype,"disabled",void 0),n([Ye()],Jn.prototype,"_opened",void 0),n([Qe({attribute:"allow-custom-value",type:Boolean})],Jn.prototype,"allowCustomValue",void 0),n([Qe({type:Boolean})],Jn.prototype,"invalid",void 0),n([We("vaadin-combo-box-light",!0)],Jn.prototype,"_comboBox",void 0),Jn=n([Ke("alarmo-select")],Jn);const es={};class ts extends Xn{constructor(e){if(super(e),this.previousValue=es,e.type!==Yn)throw new Error("renderer only supports binding to element")}render(e,t){return je}update(e,[t,i]){var a;const n=this.previousValue===es;if(!this.hasChanged(i))return je;this.previousValue=Array.isArray(i)?Array.from(i):i;const s=e.element;if(n){const i=null===(a=e.options)||void 0===a?void 0:a.host;this.addRenderer(s,t,{host:i})}else this.runRenderer(s);return je}hasChanged(e){let t=!0;return Array.isArray(e)?Array.isArray(this.previousValue)&&this.previousValue.length===e.length&&e.every((e,t)=>e===this.previousValue[t])&&(t=!1):this.previousValue===e&&(t=!1),t}}const is=Wn(class extends ts{addRenderer(e,t,i){e.renderer=(e,a,n)=>{Ue(t.call(i.host,n.item,n,a),e,i)}}runRenderer(e){e.requestContentUpdate()}}),as=(e,t)=>is(e,t);let ns=class extends Ge{static get styles(){return h`
      :host {
        display: block;
      }
    `}render(){return Te`
      <slot></slot>
    `}constructor(){super(),this.addEventListener("clickHeader",this.manageSpoilers)}manageSpoilers(e){const t=e.target;t.getAttribute("active")?t.removeAttribute("active"):t.setAttribute("active","true"),this.querySelectorAll("alarmo-collapsible-header[active]").forEach((function(e){e!==t&&e.removeAttribute("active")}))}};ns=n([Ke("alarmo-collapsible-group")],ns);let ss=class extends Ge{static get styles(){return h`
      :host {
        display: block;
      }
    `}render(){return Te`
      <slot></slot>
    `}};ss=n([Ke("alarmo-collapsible-item")],ss);let rs=class extends Ge{constructor(){super(),this.clickHeader=new CustomEvent("clickHeader",{detail:{message:"clickHeader happened."},bubbles:!0,composed:!0}),this.active=!1,this.addEventListener("click",this.handleClick)}handleClick(){this.dispatchEvent(this.clickHeader)}render(){return Te`
      <mwc-list-item graphic="avatar" twoline hasMeta>
        <slot name="icon" slot="graphic"></slot>
        <span><slot name="title"></slot></span>
        <span slot="secondary"><slot name="description"></slot></span>
        <ha-icon slot="meta" icon="hass:chevron-down" class="chevron"></ha-icon>
      </mwc-list-item>
    `}static get styles(){return h`
      :host {
        display: block;
        cursor: pointer;
      }
      :host mwc-list-item::before {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        pointer-events: none;
        content: '';
        transition: opacity 15ms linear;
        will-change: opacity;
        background-color: black;
        opacity: 0;
      }
      :host mwc-list-item:hover::before {
        opacity: 0.04;
      }
      :host([active]) mwc-list-item::before {
        opacity: 0.1;
      }
      :host([active]) mwc-list-item:hover::before {
        opacity: 0.12;
      }
      :host mwc-list-item:active::before,
      :host([active]) mwc-list-item:active::before {
        opacity: 0.14;
      }
      ::slotted(ha-icon) {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 16px;
      }
      :host mwc-list-item {
        font-size: 15px;
        --mdc-typography-body2-font-size: 14px;
      }
      :host .chevron {
        display: block;
        transition: 0.4s;
      }
      :host([active]) .chevron {
        transform: rotate(180deg);
      }
    `}attributeChangedCallback(e,t,i){this.hasAttribute("active")&&this.nextElementSibling?this.nextElementSibling.style.maxHeight=this.nextElementSibling.scrollHeight+"px":this.nextElementSibling&&(this.nextElementSibling.style.maxHeight="0px"),super.attributeChangedCallback(e,t,i)}};n([Qe({type:CustomEvent})],rs.prototype,"clickHeader",void 0),n([Qe({type:Boolean,attribute:!0,reflect:!0})],rs.prototype,"active",void 0),rs=n([Ke("alarmo-collapsible-header")],rs);let os=class extends Ge{static get styles(){return h`
      :host {
        display: block;
        background-color: var(--card-background-color);
        max-height: 0px;
        overflow: hidden;
        transition: max-height 0.2s ease-out;
      }
      .wrapper {
      }
    `}render(){return Te`
      <div class="wrapper">
        <slot>Default details</slot>
      </div>
    `}};os=n([Ke("alarmo-collapsible-body")],os);let ds=class extends(ut(Ge)){hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeMessage(()=>this._fetchData(),{type:"alarmo_config_updated"})]}async _fetchData(){this.hass&&(this.areas=await ht(this.hass),this.sensors=await it(this.hass))}async firstUpdated(){await this._fetchData(),this.selectedArea=Object.keys(this.areas)[0],this.data=Object.assign({},this.areas[this.selectedArea].modes)}render(){return this.data?Te`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${mn("panels.general.cards.modes.title",this.hass.language)}
          </div>

          ${Object.keys(this.areas).length>1?Te`
                <alarmo-select
                  .items=${Object.values(this.areas).map(e=>Object({value:e.area_id,name:e.name}))}
                  value=${this.selectedArea}
                  label=${this.hass.localize("ui.components.area-picker.area")}
                  @value-changed=${e=>this.selectArea(e.target.value)}
                ></alarmo-select>
              `:""}
        </div>
        <div class="card-content">
          ${mn("panels.general.cards.modes.description",this.hass.language)}
        </div>

        <alarmo-collapsible-group>
          ${Object.entries(yn).map(([e,t])=>{var i;return Te`
                <alarmo-collapsible-item>
                  <alarmo-collapsible-header>
                    <ha-icon slot="icon" icon="${un[e]}"></ha-icon>
                    <span slot="title">
                      ${this.hass.localize("component.alarm_control_panel.entity_component._.state."+t)}
                    </span>
                    <span slot="description">
                      ${(null===(i=this.data[t])||void 0===i?void 0:i.enabled)?Te`
                            ${mn("common.enabled",this.hass.language)},
                            <a href="${Rn("sensors",{filter:{area:this.selectedArea,mode:t}})}">
                              ${mn("panels.general.cards.modes.number_sensors_active",this.hass.language,"number",this.getSensorsByMode(t))}
                            </a>
                          `:mn("common.disabled",this.hass.language)}
                    </span>
                  </alarmo-collapsible-header>
                  <alarmo-collapsible-body>
                    ${this.renderModeConfig(t)}
                  </alarmo-collapsible-body>
                </alarmo-collapsible-item>
              `})}
        </alarmo-collapsible-group>
      </ha-card>
    `:Te``}getSensorsByMode(e){return Object.values(this.sensors).filter(t=>t.area==this.selectedArea&&(t.modes.includes(e)||t.always_on)).length}renderModeConfig(e){const t=e in this.data?this.data[e]:void 0;return Te`
      <div class="description">
        <ha-icon icon="mdi:information-outline"></ha-icon>
        ${mn("panels.general.cards.modes.modes."+e,this.hass.language)}
      </div>
      <settings-row .narrow=${this.narrow}>
        <span slot="heading">
          ${mn("panels.general.cards.modes.fields.status.heading",this.hass.language)}
        </span>
        <span slot="description">
          ${mn("panels.general.cards.modes.fields.status.description",this.hass.language)}
        </span>
        <div>
          <mwc-button class="${(null==t?void 0:t.enabled)?"active":""}" @click=${()=>this.saveData(e,{enabled:!0})}>
            <ha-icon icon="mdi:check"></ha-icon>
            ${mn("common.enabled",this.hass.language)}
          </mwc-button>
          <mwc-button
            class="${(null==t?void 0:t.enabled)?"":"active"}"
            @click=${()=>this.saveData(e,{enabled:!1})}
          >
            <ha-icon icon="mdi:close"></ha-icon>
            ${mn("common.disabled",this.hass.language)}
          </mwc-button>
        </div>
      </settings-row>
      <settings-row .narrow=${this.narrow}>
        <span slot="heading">
          ${mn("panels.general.cards.modes.fields.exit_delay.heading",this.hass.language)}
        </span>
        <span slot="description">
          ${mn("panels.general.cards.modes.fields.exit_delay.description",this.hass.language)}
        </span>
        <time-slider
          .hass=${this.hass}
          max="300"
          zeroValue=${mn("components.time_slider.none",this.hass.language)}
          value=${(null==t?void 0:t.exit_time)||0}
          @value-changed=${t=>this.saveData(e,{exit_time:t.detail.value})}
          ?disabled=${!(null==t?void 0:t.enabled)}
        ></time-slider>
      </settings-row>
      <settings-row .narrow=${this.narrow}>
        <span slot="heading">
          ${mn("panels.general.cards.modes.fields.entry_delay.heading",this.hass.language)}
        </span>
        <span slot="description">
          ${mn("panels.general.cards.modes.fields.entry_delay.description",this.hass.language)}
        </span>
        <time-slider
          .hass=${this.hass}
          max="300"
          zeroValue=${mn("components.time_slider.none",this.hass.language)}
          value=${(null==t?void 0:t.entry_time)||0}
          @value-changed=${t=>this.saveData(e,{entry_time:t.detail.value})}
          ?disabled=${!(null==t?void 0:t.enabled)}
        ></time-slider>
      </settings-row>
      <settings-row .narrow=${this.narrow}>
        <span slot="heading">
          ${mn("panels.general.cards.modes.fields.trigger_time.heading",this.hass.language)}
        </span>
        <span slot="description">
          ${mn("panels.general.cards.modes.fields.trigger_time.description",this.hass.language)}
        </span>
        <time-slider
          .hass=${this.hass}
          max="3600"
          step="60"
          zeroValue=${mn("components.time_slider.infinite",this.hass.language)}
          value=${(null==t?void 0:t.trigger_time)||0}
          @value-changed=${t=>this.saveData(e,{trigger_time:t.detail.value})}
          ?disabled=${!(null==t?void 0:t.enabled)}
        ></time-slider>
      </settings-row>
    `}selectArea(e){e!=this.selectedArea&&(this.selectedArea=e,this.data=Object.assign({},this.areas[e].modes))}saveClick(e){mt(this.hass,{area_id:this.selectedArea,modes:this.data}).catch(t=>Cn(t,e)).then()}saveData(e,t){this.data=Object.assign(Object.assign({},this.data),{[e]:Object.assign(Object.assign({},this.data[e]||{enabled:!1,exit_time:0,entry_time:0,trigger_time:0}),t)}),mt(this.hass,{area_id:this.selectedArea,modes:this.data}).catch(e=>Cn(e,this.shadowRoot.querySelector("ha-card"))).then()}static get styles(){return h`
      ${qn}
      alarmo-collapsible-header:first-of-type {
        border-top: 1px solid var(--divider-color);
      }
      .description {
        margin: 8px;
        padding: 12px;
        color: var(--primary-color);
        filter: brightness(0.85);
        font-size: 14px;
        line-height: 1.5em;
        min-height: 36px;
        display: flex;
        align-items: center;
        position: relative;
      }
      .description::before {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        pointer-events: none;
        content: '';
        background: rgba(var(--rgb-primary-color), 0.12);
        border-radius: 5px;
      }
      .description ha-icon {
        --mdc-icon-size: 36px;
        display: inline;
        float: left;
        margin-right: 12px;
        align-self: flex-start;
      }
    `}};n([Qe()],ds.prototype,"hass",void 0),n([Qe({type:Boolean})],ds.prototype,"narrow",void 0),n([Qe()],ds.prototype,"config",void 0),n([Qe()],ds.prototype,"areas",void 0),n([Qe()],ds.prototype,"sensors",void 0),n([Qe()],ds.prototype,"data",void 0),n([Qe()],ds.prototype,"selectedArea",void 0),ds=n([Ke("alarm-mode-card")],ds);let ls=class extends Ge{constructor(){super(...arguments),this.threeLine=!1}render(){return Te`
      <div class="info">
        <slot name="heading"></slot>
        <div class="secondary"><slot name="description"></slot></div>
      </div>
      <slot></slot>
    `}static get styles(){return h`
      :host {
        display: flex;
        flex-direction: row;
        padding: 0px 16px;
        align-items: center;
        min-height: 72px;
      }
      :host([large]) {
        align-items: normal;
        flex-direction: column;
        border-top: 1px solid var(--divider-color);
        border-bottom: 1px solid var(--divider-color);
        padding: 16px 16px;
      }
      :host([narrow]) {
        align-items: normal;
        flex-direction: column;
        border-bottom: none;
        border-top: 1px solid var(--divider-color);
        padding: 16px 16px;
      }
      :host([nested]) {
        border: none;
        padding: 8px 16px 16px 16px;
        margin-top: -16px;
        min-height: 40px;
      }
      :host([nested]:not([narrow])) {
        padding: 16px 16px 16px 32px;
      }
      :host([first]) {
        border-top: none;
      }
      :host([last]) {
        border-bottom: none;
      }
      :host([dialog]) {
        border: none;
        padding: 12px 0px;
      }
      ::slotted(ha-switch) {
        padding: 16px 0;
      }
      .info {
        flex: 1 0 60px;
        margin-bottom: 4px;
      }
      :host([large]) .info,
      :host([narrow]) .info {
        flex: 1 0 40px;
      }
      :host([nested]) .info {
        flex: 1 0 26px;
      }
      :host([dialog]) .info {
        flex: 1 0 40px;
        padding-bottom: 8px;
      }
      .secondary {
        color: var(--secondary-text-color);
        margin-top: 4px;
      }
      :host(:not([large]):not([narrow])):not([dialog])) ::slotted(*) {
        max-width: 66%;
      }
    `}};n([Qe({type:Boolean,reflect:!0})],ls.prototype,"narrow",void 0),n([Qe({type:Boolean,reflect:!0})],ls.prototype,"large",void 0),n([Qe({type:Boolean,attribute:"three-line"})],ls.prototype,"threeLine",void 0),n([Qe({type:Boolean})],ls.prototype,"nested",void 0),n([Qe({type:Boolean})],ls.prototype,"dialog",void 0),ls=n([Ke("settings-row")],ls);let cs=class extends Ge{constructor(){super(...arguments),this.header="",this.open=!1}render(){return Te`
      ${this.open?Te`
            <div class="header open">
              <span @click=${()=>{this.open=!1}}>${this.header}</span>
              <ha-icon-button .path=${"M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"} @click=${()=>{this.open=!1}}>
              </ha-icon-button>
            </div>
            <slot></slot>
            <div class="header open">
              <span @click=${()=>{this.open=!1}}>${this.header}</span>
              <ha-icon-button .path=${"M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"} @click=${()=>{this.open=!1}}>
              </ha-icon-button>
            </div>
          `:Te`
            <div class="header">
              <span @click=${()=>{this.open=!0}}>${this.header}</span>
              <ha-icon-button .path=${Kn} @click=${()=>{this.open=!0}}>
              </ha-icon-button>
            </div>
          `}
    `}static get styles(){return h`
      :host {
      }

      div.header {
        display: flex;
        align-items: center;
        padding: 0px 16px;
        cursor: pointer;
      }
      div.header.open:first-of-type {
        border-bottom: 1px solid var(--divider-color);
      }
      div.header.open:last-of-type {
        border-top: 1px solid var(--divider-color);
      }

      :host([narrow]) div.header {
        border-top: 1px solid var(--divider-color);
        border-bottom: none;
      }

      div.header span {
        display: flex;
        flex-grow: 1;
      }

      div.seperator {
        height: 1px;
        background: var(--divider-color);
      }
    `}};n([Qe({type:Boolean,reflect:!0})],cs.prototype,"narrow",void 0),n([Qe()],cs.prototype,"header",void 0),n([Qe()],cs.prototype,"open",void 0),cs=n([Ke("collapsible-section")],cs);let hs=class extends(ut(Ge)){constructor(){super(...arguments),this.areas={}}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeMessage(()=>this._fetchData(),{type:"alarmo_config_updated"})]}async _fetchData(){if(!this.hass)return;const e=await tt(this.hass);this.config=e,this.areas=await ht(this.hass),this.selection=e.mqtt}firstUpdated(){(async()=>{await Je()})()}render(){return this.hass&&this.selection?Te`
      <ha-card>
        <div class="card-header">
          <div class="name">${mn("panels.general.cards.mqtt.title",this.hass.language)}</div>
          <ha-icon-button .path=${Zn} @click=${this.cancelClick}></ha-icon-button>
        </div>
        <div class="card-content">${mn("panels.general.cards.mqtt.description",this.hass.language)}</div>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">
            ${mn("panels.general.cards.mqtt.fields.state_topic.heading",this.hass.language)}
          </span>
          <span slot="description">
            ${mn("panels.general.cards.mqtt.fields.state_topic.description",this.hass.language)}
          </span>
          <ha-textfield
            label="${mn("panels.general.cards.mqtt.fields.state_topic.heading",this.hass.language)}"
            value=${this.selection.state_topic}
            @change=${e=>{this.selection={...this.selection,state_topic:e.target.value}}}
          ></ha-textfield>
        </settings-row>

        <collapsible-section
          .narrow=${this.narrow}
          header=${mn("panels.general.cards.mqtt.fields.state_payload.heading",this.hass.language)}
        >
          ${Object.values(pn).filter(e=>Object.values(this.areas).some(t=>Mn(e,t.modes))).map(e=>Te`
                <settings-row .narrow=${this.narrow}>
                  <span slot="heading">${An(e)}</span>
                  <span slot="description">
                    ${mn("panels.general.cards.mqtt.fields.state_payload.item",this.hass.language,"{state}",An(e))}
                  </span>
                  <ha-textfield
                    label=${An(e)}
                    placeholder=${e}
                    value=${this.selection.state_payload[e]||""}
                    @change=${t=>{this.selection=Nn(this.selection,{state_payload:{[e]:t.target.value}})}}
                  ></ha-textfield>
                </settings-row>
              `)}
        </collapsible-section>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">
            ${mn("panels.general.cards.mqtt.fields.event_topic.heading",this.hass.language)}
          </span>
          <span slot="description">
            ${mn("panels.general.cards.mqtt.fields.event_topic.description",this.hass.language)}
          </span>
          <ha-textfield
            label="${mn("panels.general.cards.mqtt.fields.event_topic.heading",this.hass.language)}"
            value=${this.selection.event_topic}
            @change=${e=>{this.selection={...this.selection,event_topic:e.target.value}}}
          ></ha-textfield>
        </settings-row>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">
            ${mn("panels.general.cards.mqtt.fields.command_topic.heading",this.hass.language)}
          </span>
          <span slot="description">
            ${mn("panels.general.cards.mqtt.fields.command_topic.description",this.hass.language)}
          </span>
          <ha-textfield
            label="${mn("panels.general.cards.mqtt.fields.command_topic.heading",this.hass.language)}"
            value=${this.selection.command_topic}
            @change=${e=>{this.selection={...this.selection,command_topic:e.target.value}}}
          ></ha-textfield>
        </settings-row>

        <collapsible-section
          .narrow=${this.narrow}
          header=${mn("panels.general.cards.mqtt.fields.command_payload.heading",this.hass.language)}
        >
          ${Object.values(gn).filter(e=>Object.values(this.areas).some(t=>Mn((e=>{switch(e){case gn.COMMAND_ALARM_DISARM:return pn.STATE_ALARM_DISARMED;case gn.COMMAND_ALARM_ARM_HOME:return pn.STATE_ALARM_ARMED_HOME;case gn.COMMAND_ALARM_ARM_AWAY:return pn.STATE_ALARM_ARMED_AWAY;case gn.COMMAND_ALARM_ARM_NIGHT:return pn.STATE_ALARM_ARMED_NIGHT;case gn.COMMAND_ALARM_ARM_CUSTOM_BYPASS:return pn.STATE_ALARM_ARMED_CUSTOM_BYPASS;case gn.COMMAND_ALARM_ARM_VACATION:return pn.STATE_ALARM_ARMED_VACATION;default:return}})(e),t.modes))).map(e=>Te`
                <settings-row .narrow=${this.narrow}>
                  <span slot="heading">${An(e)}</span>
                  <span slot="description">
                    ${mn("panels.general.cards.mqtt.fields.command_payload.item",this.hass.language,"{command}",An(e))}
                  </span>
                  <ha-textfield
                    label=${An(e)}
                    placeholder=${e}
                    value=${this.selection.command_payload[e]||""}
                    @change=${t=>{this.selection=Nn(this.selection,{command_payload:{[e]:t.target.value}})}}
                  ></ha-textfield>
                </settings-row>
              `)}
        </collapsible-section>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">
            ${mn("panels.general.cards.mqtt.fields.require_code.heading",this.hass.language)}
          </span>
          <span slot="description">
            ${mn("panels.general.cards.mqtt.fields.require_code.description",this.hass.language)}
          </span>
          <ha-switch
            ?checked=${this.selection.require_code}
            ?disabled=${!this.config.code_arm_required&&!this.config.code_disarm_required}
            @change=${e=>{this.selection={...this.selection,require_code:e.target.checked}}}
          ></ha-switch>
        </settings-row>

        <div class="card-actions">
          <mwc-button @click=${this.saveClick}>
            ${this.hass.localize("ui.common.save")}
          </mwc-button>
        </div>
      </ha-card>
    `:Te``}saveClick(e){this.hass&&rt(this.hass,{mqtt:Object.assign(Object.assign({},this.selection),{enabled:!0})}).catch(t=>Cn(t,e)).then(()=>{this.cancelClick()})}cancelClick(){Ln(0,Rn("general"),!0)}};hs.styles=qn,n([Qe()],hs.prototype,"narrow",void 0),n([Qe()],hs.prototype,"config",void 0),n([Qe()],hs.prototype,"areas",void 0),n([Qe()],hs.prototype,"selection",void 0),hs=n([Ke("mqtt-config-card")],hs);
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
class ms extends Xn{constructor(e){if(super(e),this.et=V,e.type!==Qn)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===V||null==e)return this.ft=void 0,this.et=e;if(e===R)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.et)return this.ft;this.et=e;const t=[e];return t.raw=t,this.ft={_$litType$:this.constructor.resultType,strings:t,values:[]}}}ms.directiveName="unsafeHTML",ms.resultType=1;const us=Wn(ms);let ps=class extends Ge{render(){return Te`
      <div class="chip ${this.checked?"selected":""}" @click=${this._toggleSelect}>
        ${this.renderCheckmark()}
        <slot></slot>
        ${this.renderButton()}
      </div>
    `}renderCheckmark(){return this.checkmark?Te`
      <div class="checkmark-container">
        <ha-icon icon="mdi:check"></ha-icon>
      </div>
    `:Te``}renderButton(){return this.cancellable?Te`
        <div class="button-container" @click=${this._buttonClick}>
          <ha-icon icon="mdi:close"></ha-icon>
        </div>
      `:void 0!==this.badge?Te`
        <div class="badge-container" @click=${this._buttonClick}>
          ${this.badge}
        </div>
      `:Te``}_toggleSelect(){if(!this.value||!this.clickable)return;this.selectable&&(this.checked=!this.checked);const e=new CustomEvent("value-changed",{detail:this.value});this.dispatchEvent(e)}_buttonClick(){const e=new CustomEvent("button-clicked",{detail:this.value});this.dispatchEvent(e)}static get styles(){return h`
      :host {
        margin: 4px;
      }
      .chip {
        display: flex;
        position: relative;
        height: 36px;
        padding: 0px 16px;
        align-items: center;
        color: var(--primary-text-color);
        user-select: none;
        font-weight: 400;
        z-index: 1;
      }
      :host([clickable]) .chip {
        cursor: pointer;
        color: var(--rgb-primary-color);
        opacity: 0.85;
      }
      .chip:before {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        pointer-events: none;
        content: '';
        border-radius: 8px;
        border: 1px solid var(--primary-text-color);
        opacity: 0.24;
        z-index: -1;
      }
      :host([clickable]) .chip:hover,
      :host([clickable]) .chip:active {
        opacity: 1;
      }
      :host([clickable]) .chip:hover:before {
        opacity: 0.3;
      }
      :host([clickable]) .chip:active:before {
        opacity: 0.06;
        background: var(--primary-text-color);
      }
      :host .chip.selected:before,
      :host([cancellable]) .chip:before {
        background: rgba(var(--rgb-primary-color), 0.18);
        border: none;
        opacity: 1;
      }
      :host .chip.selected:hover:before {
        background: rgba(var(--rgb-primary-color), 0.24);
        opacity: 1;
      }
      :host .chip.selected:active:before {
        background: rgba(var(--rgb-primary-color), 0.3);
        opacity: 1;
      }
      .chip div.checkmark-container {
        width: 0px;
        height: 100%;
        transition: width 0.1s ease-in-out;
        overflow: hidden;
        display: flex;
        align-items: center;
        margin: 0px 4px 0px -4px;
        --mdc-icon-size: 18px;
      }
      .chip.selected div.checkmark-container {
        width: 18px;
      }
      .chip div.button-container {
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0px -16px 0px 6px;
        cursor: pointer;
        --mdc-icon-size: 20px;
        position: relative;
        z-index: 1;
        opacity: 0.85;
        color: var(--dark-primary-color);
      }
      .chip div.button-container:before {
        position: absolute;
        top: 3px;
        right: 3px;
        bottom: 3px;
        left: 3px;
        pointer-events: none;
        content: '';
        border-radius: 15px;
        z-index: -1;
      }
      .chip div.button-container:hover,
      .chip div.button-container:hover {
        opacity: 1;
      }
      .chip div.button-container:hover:before {
        background: rgba(var(--rgb-primary-color), 0.12);
      }
      .chip div.button-container:active:before {
        background: rgba(var(--rgb-primary-color), 0.24);
      }
      .chip div.badge-container {
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0px -9px 0px 9px;
        position: relative;
        z-index: 1;
        font-size: 0.875em;
      }
      .chip div.badge-container:before {
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        pointer-events: none;
        content: '';
        border-radius: 50%;
        z-index: -1;
      }
      :host([table]) .chip {
        height: 40px;
      }
      :host([table]) .chip:before {
        border-radius: 4px;
      }
    `}};n([Qe({type:String})],ps.prototype,"value",void 0),n([Qe({type:Boolean})],ps.prototype,"checked",void 0),n([Qe({type:Boolean})],ps.prototype,"checkmark",void 0),n([Qe({type:Boolean})],ps.prototype,"selectable",void 0),n([Qe({type:Boolean})],ps.prototype,"clickable",void 0),n([Qe({type:Boolean})],ps.prototype,"cancellable",void 0),n([Qe({type:Number})],ps.prototype,"badge",void 0),n([Qe({type:Boolean})],ps.prototype,"table",void 0),ps=n([Ke("alarmo-chip")],ps);let gs=class extends Ge{constructor(){super(...arguments),this.value=[]}render(){return this.items?Te`
      ${Object.values(this.items).map(e=>Te`
          <alarmo-chip
            value="${e.value}"
            ?checked=${this.value.includes(e.value)}
            .badge=${e.badge}
            ?selectable=${this.selectable}
            ?checkmark=${this.selectable}
            clickable
            @value-changed=${this._itemChanged}
          >
            ${e.name}
          </alarmo-chip>
        `)}
    `:Te``}_itemChanged(e){const t=e.target.checked,i=String(e.detail);if(this.selectable){this.value.includes(i)&&!t?this.value=this.value.filter(e=>e!=i):!this.value.includes(i)&&t&&(this.value=[...this.value,i]);const e=new CustomEvent("value-changed",{detail:this.value});this.dispatchEvent(e)}else{const e=new CustomEvent("value-changed",{detail:i});this.dispatchEvent(e)}}static get styles(){return h`
      :host {
        display: flex;
        flex-direction: row;
        flex: 1;
        margin: 0px -4px;
        flex-wrap: wrap;
      }
    `}};n([Qe()],gs.prototype,"items",void 0),n([Qe()],gs.prototype,"value",void 0),n([Qe({type:Boolean})],gs.prototype,"selectable",void 0),gs=n([Ke("alarmo-chip-set")],gs);let vs=class extends Ge{set filters(e){this.filterConfig||(this.filterConfig=e)}shouldUpdate(e){return e.get("filters")&&!this.filterConfig&&(this.filterConfig=e.get("filters")),!0}render(){if(!this.columns||!this.data)return Te``;const e=this.data.filter(e=>this.filterTableData(e,this.filterConfig));return Te`
      ${this.renderFilterRow()}
      <div class="table">
        ${this.renderHeaderRow()}
        ${e.length?e.map(e=>this.renderDataRow(e)):Te`
              <div class="table-row">
                <div class="table-cell text grow">
                  <slot></slot>
                </div>
              </div>
            `}
      </div>
    `}renderHeaderRow(){return this.columns?Te`
      <div class="table-row header">
        ${Object.values(this.columns).map(e=>e.hide?"":Te`
                <div
                  class="table-cell ${e.text?"text":""} ${e.grow?"grow":""} ${e.align?e.align:""}"
                  style="${e.grow?"":"width: "+e.width}"
                >
                  <span>${e.title||""}</span>
                </div>
              `)}
      </div>
    `:Te``}renderDataRow(e){return this.columns?Te`
      <div
        class="table-row ${this.selectable?"selectable":""} ${e.warning?"warning":""}"
        @click=${()=>this.handleClick(String(e.id))}
      >
        ${Object.entries(this.columns).map(([t,i])=>i.hide?"":Te`
                <div
                  class="table-cell ${i.text?"text":""} ${i.grow?"grow":""} ${i.align?i.align:""}"
                  style="${i.grow?"":"width: "+i.width}"
                >
                  ${i.renderer?i.renderer(e):e[t]}
                </div>
              `)}
      </div>
    `:Te``}filterTableData(e,t){return!t||Object.keys(t).every(i=>{if(!Object.keys(e).includes(i))return!0;const a=t[i].value;return!a||!a.length||(Array.isArray(e[i])?e[i].some(e=>a.includes(e)):a.includes(e[i]))})}_getFilteredItems(){return this.data.filter(e=>!this.filterTableData(e,this.filterConfig)).length}handleClick(e){if(!this.selectable)return;const t=new CustomEvent("row-click",{detail:{id:e}});this.dispatchEvent(t)}renderFilterRow(){var e;return this.filterConfig?Te`
      <div class="table-filter">
        <ha-icon-button
          .path=${"M6,13H18V11H6M3,6V8H21V6M10,18H14V16H10V18Z"}
          ?disabled=${!(null===(e=this.data)||void 0===e?void 0:e.length)}
          label=${mn("components.table.filter.label",this.hass.language)}
          @click=${this._toggleFilterMenu}
        ></ha-icon-button>
        <mwc-menu .corner=${"BOTTOM_START"} .fixed=${!0} @closed=${this._applyFilterSelection}>
          ${this.renderFilterMenu()}
        </mwc-menu>

        ${this._getFilteredItems()?Te`
              <alarmo-chip cancellable table @button-clicked=${this._clearFilters}>
                ${mn("components.table.filter.hidden_items",this.hass.language,"number",this._getFilteredItems())}
              </alarmo-chip>
            `:""}
      </div>
    `:Te``}_toggleFilterMenu(e){const t=e.target;this._menu.anchor=t,this._menu.open?this._menu.close():(this.filterSelection=Object.entries(this.filterConfig).reduce((e,[t,i])=>Object.assign(Object.assign({},e),{[t]:jn(i,["value"])}),{}),this._menu.show())}renderFilterMenu(){return this.filterConfig&&this.filterSelection?Te`
      <span class="header">
        ${mn("components.table.filter.label",this.hass.language)}
      </span>
      <ha-icon-button
        .path=${Zn}
        @click=${()=>{this._menu.close(),setTimeout(()=>this._menu.anchor.blur(),50)}}
      ></ha-icon-button>
      ${Object.keys(this.filterConfig).map(e=>{if(this.filterConfig[e].binary)return Te`
            <div class="dropdown-item checkbox">
              <ha-checkbox
                @change=${t=>this._updateFilterSelection(e,t.target.checked)}
                ?checked=${this.filterSelection[e].value.length}
              ></ha-checkbox>
              <span class="name">
                ${this.filterConfig[e].name}
              </span>
            </div>
          `;let t=this.filterConfig[e].items;t=t.map(t=>{var i;return t.badge&&"function"==typeof t.badge?{...t,badge:t.badge(null===(i=this.data)||void 0===i?void 0:i.filter(t=>this.filterTableData(t,xn(this.filterSelection,e))))}:t});const i=this.filterSelection[e].value;return Te`
          <div class="dropdown-item">
            <span class="name">
              ${this.filterConfig[e].name}
            </span>
            <alarmo-chip-set
              selectable
              .items=${t}
              @value-changed=${t=>this._updateFilterSelection(e,t.detail)}
              .value=${i}
            ></alarmo-chip-set>
          </div>
        `})}
    `:Te``}_updateFilterSelection(e,t){"boolean"==typeof t&&(t=t?this.filterConfig[e].items[0].value:[],1==Object.keys(this.filterConfig).length&&(this._menu.close(),setTimeout(()=>this._menu.anchor.blur(),50))),this.filterSelection=Object.assign(Object.assign({},this.filterSelection),{[e]:{value:t}})}_clearFilters(){Object.keys(this.filterConfig).forEach(e=>{this.filterConfig=Object.assign(Object.assign({},this.filterConfig),{[e]:Object.assign(Object.assign({},this.filterConfig[e]),{value:[]})})})}_applyFilterSelection(){Object.keys(this.filterConfig).forEach(e=>{this.filterConfig=Object.assign(Object.assign({},this.filterConfig),{[e]:Object.assign(Object.assign({},this.filterConfig[e]),this.filterSelection[e])})})}};vs.styles=h`
    :host {
      width: 100%;
    }
    div.table {
      display: inline-flex;
      flex-direction: column;
      box-sizing: border-box;
      width: 100%;
    }
    div.table .header {
      font-weight: bold;
    }
    div.table-row {
      display: flex;
      width: 100%;
      height: 52px;
      border-top: 1px solid var(--divider-color);
      flex-direction: row;
      position: relative;
    }
    div.table-cell {
      align-self: center;
      overflow: hidden;
      text-overflow: ellipsis;
      flex-shrink: 0;
      box-sizing: border-box;
    }
    div.table-cell.text {
      padding: 4px 16px;
    }
    div.table-cell.grow {
      flex-grow: 1;
      flex-shrink: 1;
    }

    div.table-cell > ha-switch {
      width: 68px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    div.table-cell.center {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    div.table-cell.right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    div.table-cell > ha-icon-button {
      color: var(--secondary-text-color);
    }
    div.table-cell > * {
      transition: color 0.2s ease-in-out;
    }
    div.table .header div.table-cell span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      min-width: 0;
    }
    div.table-row.selectable {
      cursor: pointer;
    }
    .table-row::before {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      opacity: 0.12;
      pointer-events: none;
      content: '';
      border-radius: 4px;
    }
    div.table-row.selectable:hover::before {
      background-color: rgba(var(--rgb-primary-text-color), 0.5);
    }
    div.table-row.warning::before {
      background-color: var(--error-color);
      opacity: 0.06;
    }
    div.table-row.warning:hover::before {
      background-color: var(--error-color);
      opacity: 0.12;
    }
    div.table-row.warning span {
      color: var(--error-color);
    }

    ha-icon {
      color: var(--state-icon-color);
      padding: 8px;
    }

    .secondary {
      color: var(--secondary-text-color);
      display: flex;
      padding-top: 4px;
    }

    a,
    a:visited {
      color: var(--primary-color);
    }

    span.disabled {
      color: var(--secondary-text-color);
    }
    span.secondary.disabled {
      color: var(--disabled-text-color);
    }
    ha-icon.disabled {
      color: var(--state-unavailable-color);
    }

    div.table-filter {
      display: flex;
      width: 100%;
      min-height: 52px;
      border-top: 1px solid var(--divider-color);
      box-sizing: border-box;
      padding: 2px 8px;
      flex: 1;
      position: relative;
      flex-direction: row;
      align-items: center;
    }
    mwc-menu .header {
      display: flex;
      padding: 8px 16px;
      font-weight: bold;
    }
    mwc-menu ha-icon-button {
      position: absolute;
      top: 8px;
      right: 8px;
    }
    div.dropdown-item {
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      padding: 8px 16px;
      width: 100%;
      min-height: 52px;
      box-sizing: border-box;
    }
    div.dropdown-item .name {
      display: inline-flex;
    }
    div.dropdown-item alarmo-chips {
      display: flex;
      flex-direction: row;
    }
    div.dropdown-item.checkbox {
      flex-direction: row;
      align-items: center;
    }
    ha-button-menu mwc-button {
      margin-left: 16px;
    }
  `,n([Qe()],vs.prototype,"hass",void 0),n([Qe()],vs.prototype,"columns",void 0),n([Qe()],vs.prototype,"data",void 0),n([Ye()],vs.prototype,"filterConfig",void 0),n([Ye()],vs.prototype,"filterSelection",void 0),n([Qe({type:Boolean})],vs.prototype,"selectable",void 0),n([We("mwc-menu",!0)],vs.prototype,"_menu",void 0),vs=n([Ke("alarmo-table")],vs);let _s=class extends Ge{async showDialog(e){this._params=e,await this.updateComplete}async closeDialog(){this._params&&this._params.cancel(),this._params=void 0}render(){return this._params?Te`
      <ha-dialog open .heading=${!0} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <ha-dialog-header slot="heading">
          <ha-icon-button slot="navigationIcon" dialogAction="cancel" .path=${Zn}>
          </ha-icon-button>
          <span slot="title">${this._params.title}</span>
        </ha-dialog-header>
        <div class="wrapper">
          ${this._params.description}
        </div>

        <mwc-button slot="primaryAction" @click=${this.cancelClick} dialogAction="close">
          ${this.hass.localize("ui.dialogs.generic.cancel")}
        </mwc-button>
        <mwc-button slot="secondaryAction" style="float: left" @click=${this.confirmClick} dialogAction="close">
          ${this.hass.localize("ui.dialogs.generic.ok")}
        </mwc-button>
      </ha-dialog>
    `:Te``}confirmClick(){this._params.confirm()}cancelClick(){this._params.cancel()}static get styles(){return h`
      ${qn}
      div.wrapper {
        color: var(--primary-text-color);
      }
    `}};n([Qe({attribute:!1})],_s.prototype,"hass",void 0),n([Ye()],_s.prototype,"_params",void 0),_s=n([Ke("confirm-delete-dialog")],_s);var fs=Object.freeze({__proto__:null,get ConfirmDeleteDialog(){return _s}});let bs=class extends(ut(Ge)){constructor(){super(...arguments),this.areas={},this.sensors={},this.automations={},this.name=""}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeMessage(()=>this._fetchData(),{type:"alarmo_config_updated"})]}async _fetchData(){this.hass&&(this.areas=await ht(this.hass),this.sensors=await it(this.hass),this.automations=await nt(this.hass))}async showDialog(e){await this._fetchData(),this._params=e,e.area_id&&(this.area_id=e.area_id,this.name=this.areas[this.area_id].name),await this.updateComplete}async closeDialog(){this._params=void 0,this.area_id=void 0,this.name=""}render(){return this._params?Te`
      <ha-dialog open .heading=${!0} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <ha-dialog-header slot="heading">
          <ha-icon-button slot="navigationIcon" dialogAction="cancel" .path=${Zn}>
          </ha-icon-button>
            <span slot="title">
              ${this.area_id?mn("panels.general.dialogs.edit_area.title",this.hass.language,"{area}",this.areas[this.area_id].name):mn("panels.general.dialogs.create_area.title",this.hass.language)}
            </span>
        </ha-dialog-header>
        <div class="wrapper">
          <ha-textfield
            label=${this.hass.localize("ui.components.area-picker.add_dialog.name")}
            @input=${e=>this.name=e.target.value}
            value="${this.name}"
          ></ha-textfield>
          ${this.area_id?Te`
                <span class="note">
                  ${mn("panels.general.dialogs.edit_area.name_warning",this.hass.language)}
                </span>
              `:""}
          ${this.area_id?"":Te`
                <alarmo-select
                  .items=${Object.values(this.areas).map(e=>Object({value:e.area_id,name:e.name}))}
                  value=${this.selectedArea}
                  label="${mn("panels.general.dialogs.create_area.fields.copy_from",this.hass.language)}"
                  clearable=${!0}
                  @value-changed=${e=>this.selectedArea=e.target.value}
                ></alarmo-select>
              `}
        </div>
        <mwc-button slot="primaryAction" @click=${this.saveClick}>
          ${this.hass.localize("ui.common.save")}
        </mwc-button>
        ${this.area_id?Te`
              <mwc-button
                slot="secondaryAction"
                @click=${this.deleteClick}
                class="warning"
                ?disabled=${1==Object.keys(this.areas).length}
              >
                ${this.hass.localize("ui.common.delete")}
              </mwc-button>
            `:""}
      </ha-dialog>
    `:Te``}saveClick(e){const t=this.name.trim();if(!t.length)return;let i={name:t};this.area_id?i=Object.assign(Object.assign({},i),{area_id:this.area_id}):this.selectedArea&&(i=Object.assign(Object.assign({},i),{modes:Object.assign({},this.areas[this.selectedArea].modes)})),mt(this.hass,i).catch(t=>Cn(t,e)).then(()=>{this.closeDialog()})}async deleteClick(e){if(!this.area_id)return;const t=Object.values(this.sensors).filter(e=>e.area==this.area_id).length,i=Object.values(this.automations).filter(e=>{var t;return null===(t=e.triggers)||void 0===t?void 0:t.map(e=>e.area).includes(this.area_id)}).length;let a=!1;var n,s;a=!t&&!i||await new Promise(a=>{wn(e.target,"show-dialog",{dialogTag:"confirm-delete-dialog",dialogImport:()=>Promise.resolve().then((function(){return fs})),dialogParams:{title:mn("panels.general.dialogs.remove_area.title",this.hass.language),description:mn("panels.general.dialogs.remove_area.description",this.hass.language,"sensors",String(t),"automations",String(i)),cancel:()=>a(!1),confirm:()=>a(!0)}})}),a&&(n=this.hass,s=this.area_id,n.callApi("POST","alarmo/area",{area_id:s,remove:!0})).catch(t=>Cn(t,e)).then(()=>{this.closeDialog()})}static get styles(){return h`
      ${qn}
      div.wrapper {
        color: var(--primary-text-color);
      }
      span.note {
        color: var(--secondary-text-color);
      }
      ha-textfield {
        display: block;
      }
      alarmo-select {
        margin-top: 10px;
      }
    `}};n([Qe({attribute:!1})],bs.prototype,"hass",void 0),n([Ye()],bs.prototype,"_params",void 0),n([Qe()],bs.prototype,"areas",void 0),n([Qe()],bs.prototype,"sensors",void 0),n([Qe()],bs.prototype,"automations",void 0),n([Qe()],bs.prototype,"name",void 0),n([Qe()],bs.prototype,"area_id",void 0),n([Qe()],bs.prototype,"selectedArea",void 0),bs=n([Ke("create-area-dialog")],bs);var ys=Object.freeze({__proto__:null,get CreateAreaDialog(){return bs}});let ks=class extends(ut(Ge)){constructor(){super(...arguments),this.areas={},this.sensors={},this.automations={}}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeMessage(()=>this._fetchData(),{type:"alarmo_config_updated"})]}async _fetchData(){this.hass&&(this.areas=await ht(this.hass),this.sensors=await it(this.hass),this.automations=await nt(this.hass))}render(){if(!this.hass)return Te``;const e=Object.values(this.areas);e.sort(Dn);const t={actions:{width:"48px"},name:{title:this.hass.localize("ui.components.area-picker.add_dialog.name"),width:"40%",grow:!0,text:!0},remarks:{title:mn("panels.general.cards.areas.table.remarks",this.hass.language),width:"60%",hide:this.narrow,text:!0}},i=Object.values(e).map(t=>{const i=Object.values(this.sensors).filter(e=>e.area==t.area_id).length,a=1==Object.values(e).length?Object.values(this.automations).filter(e=>{var i,a;return(null===(i=e.triggers)||void 0===i?void 0:i.map(e=>e.area).includes(t.area_id))||!(null===(a=e.triggers)||void 0===a?void 0:a.map(e=>e.area).length)}).length:Object.values(this.automations).filter(e=>{var i;return null===(i=e.triggers)||void 0===i?void 0:i.map(e=>e.area).includes(t.area_id)}).length,n=`<a href="${Rn("sensors",{filter:{area:t.area_id}})}">${mn("panels.general.cards.areas.table.summary_sensors",this.hass.language,"number",i)}</a>`,s=`<a href="${Rn("actions",{filter:{area:t.area_id}})}">${mn("panels.general.cards.areas.table.summary_automations",this.hass.language,"number",a)}</a>`;return{id:t.area_id,actions:Te`
          <ha-icon-button @click=${e=>this.editClick(e,t.area_id)} .path=${"M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"}></ha-icon-button>
        `,name:An(t.name),remarks:us(mn("panels.general.cards.areas.table.summary",this.hass.language,"summary_sensors",n,"summary_automations",s))}});return Te`
      <ha-card header="${mn("panels.general.cards.areas.title",this.hass.language)}">
        <div class="card-content">
          ${mn("panels.general.cards.areas.description",this.hass.language)}
        </div>

        <alarmo-table .columns=${t} .data=${i}>
          ${mn("panels.general.cards.areas.no_items",this.hass.language)}
        </alarmo-table>
        <div class="card-actions">
          <mwc-button @click=${this.addClick}>
            ${mn("panels.general.cards.areas.actions.add",this.hass.language)}
          </mwc-button>
        </div>
      </ha-card>
    `}addClick(e){const t=e.target;wn(t,"show-dialog",{dialogTag:"create-area-dialog",dialogImport:()=>Promise.resolve().then((function(){return ys})),dialogParams:{}})}editClick(e,t){const i=e.target;wn(i,"show-dialog",{dialogTag:"create-area-dialog",dialogImport:()=>Promise.resolve().then((function(){return ys})),dialogParams:{area_id:t}})}};ks.styles=qn,n([Qe()],ks.prototype,"narrow",void 0),n([Qe()],ks.prototype,"path",void 0),n([Qe()],ks.prototype,"config",void 0),n([Qe()],ks.prototype,"areas",void 0),n([Qe()],ks.prototype,"sensors",void 0),n([Qe()],ks.prototype,"automations",void 0),ks=n([Ke("area-config-card")],ks);let ws=class extends Ge{constructor(){super(...arguments),this.name=""}async showDialog(e){this._params=e;const t=await tt(this.hass);this.name=t.master.name||"",await this.updateComplete}async closeDialog(){this._params=void 0}render(){return this._params?Te`
      <ha-dialog open .heading=${!0} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <ha-dialog-header slot="heading">
          <ha-icon-button slot="navigationIcon" dialogAction="cancel" .path=${Zn}>
          </ha-icon-button>
            <span slot="title">${mn("panels.general.dialogs.edit_master.title",this.hass.language)}</span>
        </ha-dialog-header>
        <div class="wrapper">
          <ha-textfield
            label=${this.hass.localize("ui.components.area-picker.add_dialog.name")}
            @input=${e=>this.name=e.target.value}
            value="${this.name}"
          ></ha-textfield>
          <span class="note">${mn("panels.general.dialogs.edit_area.name_warning",this.hass.language)}</span>
        </div>
        <mwc-button slot="primaryAction" @click=${this.saveClick}>
          ${this.hass.localize("ui.common.save")}
        </mwc-button>
        <mwc-button slot="secondaryAction" @click=${this.closeDialog}>
          ${this.hass.localize("ui.common.cancel")}
        </mwc-button>
      </ha-dialog>
    `:Te``}saveClick(){const e=this.name.trim();e.length&&rt(this.hass,{master:{enabled:!0,name:e}}).catch().then(()=>{this.closeDialog()})}static get styles(){return h`
      div.wrapper {
        color: var(--primary-text-color);
      }
      span.note {
        color: var(--secondary-text-color);
      }
      ha-textfield {
        display: block;
      }
    `}};n([Qe({attribute:!1})],ws.prototype,"hass",void 0),n([Ye()],ws.prototype,"_params",void 0),n([Qe()],ws.prototype,"name",void 0),ws=n([Ke("edit-master-dialog")],ws);var As=Object.freeze({__proto__:null,get EditMasterDialog(){return ws}});let $s=class extends(ut(Ge)){constructor(){super(...arguments),this.areas={},this.automations={}}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeMessage(()=>this._fetchData(),{type:"alarmo_config_updated"})]}async _fetchData(){this.hass&&(this.config=await tt(this.hass),this.areas=await ht(this.hass),this.automations=await nt(this.hass),this.data=jn(this.config,["trigger_time","disarm_after_trigger","mqtt","master"]))}firstUpdated(){(async()=>{await Je()})()}render(){var e,t,i,a,n,s,r,o;return this.hass&&this.config&&this.data?"mqtt_configuration"==this.path.subpage?Te`
        <mqtt-config-card .hass=${this.hass} .narrow=${this.narrow}></mqtt-config-card>
      `:this.path.params.edit_area?Te`
        <area-editor-card
          .hass=${this.hass}
          .narrow=${this.narrow}
          item=${this.path.params.edit_area}
        ></area-editor-card>
      `:Te`
        <ha-card header="${mn("panels.general.title",this.hass.language)}">
          <div class="card-content">
            ${mn("panels.general.cards.general.description",this.hass.language)}
          </div>

          <settings-row .narrow=${this.narrow}>
            <span slot="heading">
              ${mn("panels.general.cards.general.fields.disarm_after_trigger.heading",this.hass.language)}
            </span>
            <span slot="description">
              ${mn("panels.general.cards.general.fields.disarm_after_trigger.description",this.hass.language)}
            </span>
            <ha-switch
              ?checked=${this.data.disarm_after_trigger}
              @change=${e=>{this.saveData({disarm_after_trigger:e.target.checked})}}
            ></ha-switch>
          </settings-row>

          <settings-row .narrow=${this.narrow}>
            <span slot="heading">
              ${mn("panels.general.cards.general.fields.enable_mqtt.heading",this.hass.language)}
            </span>
            <span slot="description">
              ${mn("panels.general.cards.general.fields.enable_mqtt.description",this.hass.language)}
            </span>
            <ha-switch
              ?checked=${null===(t=null===(e=this.data)||void 0===e?void 0:e.mqtt)||void 0===t?void 0:t.enabled}
              @change=${e=>{this.saveData({mqtt:{...this.data.mqtt,enabled:e.target.checked}})}}
            ></ha-switch>
          </settings-row>

          ${(null===(a=null===(i=this.data)||void 0===i?void 0:i.mqtt)||void 0===a?void 0:a.enabled)?Te`
                <div style="padding: 0px 0px 16px 16px">
                  <mwc-button
                    outlined
                    @click=${()=>Ln(0,Rn("general","mqtt_configuration"),!0)}
                  >
                    ${mn("panels.general.cards.general.actions.setup_mqtt",this.hass.language)}
                  </mwc-button>
                </div>
              `:""}
          ${Object.keys(this.areas).length>=2?Te`
                <settings-row .narrow=${this.narrow}>
                  <span slot="heading">
                    ${mn("panels.general.cards.general.fields.enable_master.heading",this.hass.language)}
                  </span>
                  <span slot="description">
                    ${mn("panels.general.cards.general.fields.enable_master.description",this.hass.language)}
                  </span>
                  <ha-switch
                    ?checked=${(null===(s=null===(n=this.data)||void 0===n?void 0:n.master)||void 0===s?void 0:s.enabled)&&Object.keys(this.areas).length>=2}
                    ?disabled=${Object.keys(this.areas).length<2}
                    @change=${this.toggleEnableMaster}
                  ></ha-switch>
                </settings-row>
              `:""}
          ${(null===(o=null===(r=this.data)||void 0===r?void 0:r.master)||void 0===o?void 0:o.enabled)&&Object.keys(this.areas).length>=2?Te`
                <div style="padding: 0px 0px 16px 16px">
                  <mwc-button outlined @click=${this.setupMasterClick}>
                    ${mn("panels.general.cards.general.actions.setup_master",this.hass.language)}
                  </mwc-button>
                </div>
              `:""}
        </ha-card>

        <alarm-mode-card .hass=${this.hass} .narrow=${this.narrow}></alarm-mode-card>

        <area-config-card .hass=${this.hass} .narrow=${this.narrow}></area-config-card>
      `:Te``}setupMasterClick(e){const t=e.target;wn(t,"show-dialog",{dialogTag:"edit-master-dialog",dialogImport:()=>Promise.resolve().then((function(){return As})),dialogParams:{}})}async toggleEnableMaster(e){const t=e.target;let i=t.checked;if(!i){const a=Object.values(this.automations).filter(e=>e.triggers.some(e=>!e.area));if(a.length){await new Promise(e=>{wn(t,"show-dialog",{dialogTag:"confirm-delete-dialog",dialogImport:()=>Promise.resolve().then((function(){return fs})),dialogParams:{title:mn("panels.general.dialogs.disable_master.title",this.hass.language),description:mn("panels.general.dialogs.disable_master.description",this.hass.language,"automations",String(a.length)),cancel:()=>e(!1),confirm:()=>e(!0)}})})?!i&&a.length&&a.forEach(t=>{ct(this.hass,t.automation_id).catch(t=>Cn(t,e))}):(i=!0,t.checked=!0)}}this.saveData({master:Object.assign(Object.assign({},this.data.master),{enabled:i})})}saveData(e){this.hass&&this.data&&(this.data=Object.assign(Object.assign({},this.data),e),rt(this.hass,this.data).catch(e=>Cn(e,this.shadowRoot.querySelector("ha-card"))).then())}};$s.styles=qn,n([Qe()],$s.prototype,"narrow",void 0),n([Qe()],$s.prototype,"path",void 0),n([Qe()],$s.prototype,"data",void 0),n([Qe()],$s.prototype,"config",void 0),n([Qe()],$s.prototype,"areas",void 0),n([Qe()],$s.prototype,"automations",void 0),$s=n([Ke("alarm-view-general")],$s);const Ts=(e,t)=>{if("binary_sensor"==function(e){const t="string"==typeof e?e:e.entity_id;return String(t.split(".").shift())}(e.entity_id)){if(t)return!0;const i=e.attributes.device_class;return!!i&&!!["carbon_monoxide","door","garage_door","gas","heat","lock","moisture","motion","moving","occupancy","opening","presence","safety","smoke","sound","tamper","vibration","window"].includes(i)}return!1},Es=e=>{switch(e.attributes.device_class){case"door":case"garage_door":case"lock":case"opening":return vn.Door;case"window":return vn.Window;case"carbon_monoxide":case"gas":case"heat":case"moisture":case"smoke":case"safety":return vn.Environmental;case"motion":case"moving":case"occupancy":case"presence":return vn.Motion;case"sound":case"vibration":case"tamper":return vn.Tamper;default:return}},js=e=>{const t=t=>t.filter(t=>e.includes(t));return{[vn.Door]:{modes:t([yn.ArmedAway,yn.ArmedHome,yn.ArmedNight,yn.ArmedVacation]),always_on:!1,allow_open:!1,arm_on_close:!1,use_entry_delay:!0,use_exit_delay:!0},[vn.Window]:{modes:t([yn.ArmedAway,yn.ArmedHome,yn.ArmedNight,yn.ArmedVacation]),always_on:!1,allow_open:!1,arm_on_close:!1,use_entry_delay:!1,use_exit_delay:!1},[vn.Motion]:{modes:t([yn.ArmedAway,yn.ArmedVacation]),always_on:!1,allow_open:!0,arm_on_close:!1,use_entry_delay:!0,use_exit_delay:!0},[vn.Tamper]:{modes:t([yn.ArmedAway,yn.ArmedHome,yn.ArmedNight,yn.ArmedVacation,yn.ArmedCustom]),always_on:!1,allow_open:!1,arm_on_close:!1,use_entry_delay:!1,use_exit_delay:!1},[vn.Environmental]:{modes:t([yn.ArmedAway,yn.ArmedHome,yn.ArmedNight,yn.ArmedVacation,yn.ArmedCustom]),always_on:!0,allow_open:!1,arm_on_close:!1,use_entry_delay:!1,use_exit_delay:!1}}};const xs=(e,t,i=!1)=>{const a=Object.values(e.states).filter(e=>Ts(e,i)).filter(e=>!t.includes(e.entity_id)).map(e=>Object({id:e.entity_id,name:$n(e),icon:Ss(e)}));return a.sort(Dn),a},Ss=(e,t)=>{const i="off"===t;switch(null==e?void 0:e.attributes.device_class){case"battery":return i?"mdi:battery":"mdi:battery-outline";case"battery_charging":return i?"mdi:battery":"mdi:battery-charging";case"cold":return i?"mdi:thermometer":"mdi:snowflake";case"connectivity":return i?"mdi:server-network-off":"mdi:server-network";case"door":return i?"mdi:door-closed":"mdi:door-open";case"garage_door":return i?"mdi:garage":"mdi:garage-open";case"power":return i?"mdi:power-plug-off":"mdi:power-plug";case"gas":case"problem":case"safety":case"tamper":return i?"mdi:check-circle":"mdi:alert-circle";case"smoke":return i?"mdi:check-circle":"mdi:smoke";case"heat":return i?"mdi:thermometer":"mdi:fire";case"light":return i?"mdi:brightness-5":"mdi:brightness-7";case"lock":return i?"mdi:lock":"mdi:lock-open";case"moisture":return i?"mdi:water-off":"mdi:water";case"motion":return i?"mdi:walk":"mdi:run";case"occupancy":return i?"mdi:home-outline":"mdi:home";case"opening":return i?"mdi:square":"mdi:square-outline";case"plug":return i?"mdi:power-plug-off":"mdi:power-plug";case"presence":return i?"mdi:home-outline":"mdi:home";case"running":return i?"mdi:stop":"mdi:play";case"sound":return i?"mdi:music-note-off":"mdi:music-note";case"update":return i?"mdi:package":"mdi:package-up";case"vibration":return i?"mdi:crop-portrait":"mdi:vibrate";case"window":return i?"mdi:window-closed":"mdi:window-open";default:return i?"mdi:radiobox-blank":"mdi:checkbox-marked-circle"}};let zs=class extends Ge{async showDialog(e){this._params=e,await this.updateComplete}async closeDialog(){this._params=void 0}render(){return this._params?Te`
      <ha-dialog open .heading=${!0} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <ha-dialog-header slot="heading">
          <ha-icon-button slot="navigationIcon" dialogAction="cancel" .path=${Zn}>
          </ha-icon-button>
            <span slot="title">
              ${this.hass.localize("state_badge.default.error")}
            </span>
        </ha-dialog-header>
        <div class="wrapper">
          ${this._params.error||""}
        </div>

        <mwc-button slot="primaryAction" style="float: left" @click=${this.closeDialog} dialogAction="close">
          ${this.hass.localize("ui.dialogs.generic.ok")}
        </mwc-button>
      </ha-dialog>
    `:Te``}static get styles(){return h`
      div.wrapper {
        color: var(--primary-text-color);
      }
    `}};n([Qe({attribute:!1})],zs.prototype,"hass",void 0),n([Ye()],zs.prototype,"_params",void 0),zs=n([Ke("error-dialog")],zs);var Os=Object.freeze({__proto__:null,get ErrorDialog(){return zs}});let Cs=class extends(ut(Ge)){constructor(){super(...arguments),this.sensorGroups={},this.sensors={}}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeMessage(()=>this._fetchData(),{type:"alarmo_config_updated"})]}async _fetchData(){this.hass&&(this.sensorGroups=await st(this.hass),this.sensors=await it(this.hass))}async showDialog(e){await this._fetchData(),this._params=e,e.group_id&&Object.keys(this.sensorGroups).includes(e.group_id)?this.data=Object.assign({},this.sensorGroups[e.group_id]):this.data={name:"",entities:[],timeout:600,event_count:2},await this.updateComplete}async closeDialog(){this._params=void 0}render(){return this._params?Te`
      <ha-dialog open .heading=${!0} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
      <ha-dialog-header slot="heading">
          <ha-icon-button slot="navigationIcon" dialogAction="close" .path=${Zn}>
          </ha-icon-button>
          <span slot="title">
            ${this.data.group_id?mn("panels.sensors.dialogs.edit_group.title",this.hass.language,"{name}",this.sensorGroups[this.data.group_id].name):mn("panels.sensors.dialogs.create_group.title",this.hass.language)}
          </span>
        </ha-dialog-header>
        <div class="wrapper">
          <settings-row dialog>
            <span slot="heading">
              ${mn("panels.sensors.dialogs.create_group.fields.name.heading",this.hass.language)}
            </span>
            <span slot="description">
              ${mn("panels.sensors.dialogs.create_group.fields.name.description",this.hass.language)}
            </span>
            <ha-textfield
              label=${this.hass.localize("ui.components.area-picker.add_dialog.name")}
              @input=${e=>this.data={...this.data,name:String(e.target.value).trim()}}
              value="${this.data.name}"
            ></ha-textfield>
          </settings-row>

          <settings-row large dialog>
            <span slot="heading">
              ${mn("panels.sensors.dialogs.create_group.fields.sensors.heading",this.hass.language)}
            </span>
            <span slot="description">
              ${mn("panels.sensors.dialogs.create_group.fields.sensors.description",this.hass.language)}
            </span>
            <div>
              ${this.renderSensorOptions()}
            </div>
          </settings-row>

          <settings-row dialog>
            <span slot="heading">
              ${mn("panels.sensors.dialogs.create_group.fields.timeout.heading",this.hass.language)}
            </span>
            <span slot="description">
              ${mn("panels.sensors.dialogs.create_group.fields.timeout.description",this.hass.language)}
            </span>
            <time-slider
              .hass=${this.hass}
              min="10"
              max="900"
              .value=${this.data.timeout}
              @value-changed=${e=>this.data={...this.data,timeout:e.detail.value}}
            ></time-slider>
          </settings-row>

          <settings-row dialog>
            <span slot="heading">
              ${mn("panels.sensors.dialogs.create_group.fields.event_count.heading",this.hass.language)}
            </span>
            <span slot="description">
              ${mn("panels.sensors.dialogs.create_group.fields.event_count.description",this.hass.language)}
            </span>
            <alarmo-select
              .hass=${this.hass}
              .items=${this.renderSensorCountOptions()}
              ?disabled=${this.data.entities.length<=2}
              @value-changed=${e=>{this.data={...this.data,event_count:Number(e.detail.value)}}}
              .value=${String(this.data.event_count>this.data.entities.length?this.data.entities.length:this.data.event_count)}
            ></alarmo-select>
          </settings-row>
        </div>
        <mwc-button slot="secondaryAction" @click=${this.saveClick}>
          ${this.hass.localize("ui.common.save")}
        </mwc-button>
        ${this.data.group_id?Te`
              <mwc-button slot="secondaryAction" @click=${this.deleteClick} class="warning">
                ${this.hass.localize("ui.common.delete")}
              </mwc-button>
            `:""}
      </ha-dialog>
    `:Te``}renderSensorOptions(){const e=Object.keys(this.sensors).filter(e=>!Sn(this.sensors[e].group)||this.sensors[e].group===this.data.group_id).map(e=>{const t=this.hass.states[e],i=Object.entries(vn).find(([,t])=>t==this.sensors[e].type)[0];return{value:e,name:An($n(t)),icon:_n[i]}});return e.sort(Dn),e.length?Te`
      <alarmo-chip-set
        .items=${e}
        .value=${this.data.entities}
        ?selectable=${!0}
        @value-changed=${e=>this.data={...this.data,entities:e.detail}}
      ></alarmo-chip-set>
    `:mn("panels.sensors.cards.sensors.no_items",this.hass.language)}renderSensorCountOptions(){let e=[];for(let t=2;t<=this.data.entities.length;t++)e=[...e,{name:""+t,value:""+t}];return e}saveClick(e){var t,i;this.data.name.length&&(this.data.group_id&&this.data.name==this.sensorGroups[this.data.group_id].name||!Object.values(this.sensorGroups).find(e=>e.name.toLowerCase()==this.data.name.toLowerCase()))?this.data.entities.length<2?On(e,mn("panels.sensors.dialogs.create_group.errors.insufficient_sensors",this.hass.language)):(this.data.event_count>this.data.entities.length&&(this.data=Object.assign(Object.assign({},this.data),{event_count:this.data.entities.length})),(t=this.hass,i=this.data,t.callApi("POST","alarmo/sensor_groups",i)).catch(t=>Cn(t,e)).then(()=>{this.closeDialog()})):On(e,mn("panels.sensors.dialogs.create_group.errors.invalid_name",this.hass.language))}deleteClick(e){var t,i;this.data.group_id&&(t=this.hass,i=this.data.group_id,t.callApi("POST","alarmo/sensor_groups",{group_id:i,remove:!0})).catch(t=>Cn(t,e)).then(()=>{this.closeDialog()})}static get styles(){return h`
      ${In}
      div.wrapper {
        color: var(--primary-text-color);
      }
      mwc-button.warning {
        --mdc-theme-primary: var(--error-color);
      }
    `}};n([Qe({attribute:!1})],Cs.prototype,"hass",void 0),n([Ye()],Cs.prototype,"_params",void 0),n([Qe()],Cs.prototype,"sensorGroups",void 0),n([Qe()],Cs.prototype,"sensors",void 0),n([Qe()],Cs.prototype,"data",void 0),Cs=n([Ke("create-sensor-group-dialog")],Cs);var Ms=Object.freeze({__proto__:null,get CreateSensorGroupDialog(){return Cs}});let Ns=class extends(ut(Ge)){constructor(){super(...arguments),this.sensorGroups={},this.sensors={}}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeMessage(()=>this._fetchData(),{type:"alarmo_config_updated"})]}async _fetchData(){this.hass&&(this.sensorGroups=await st(this.hass),this.sensors=await it(this.hass))}async showDialog(e){await this._fetchData(),this._params=e,await this.updateComplete}async closeDialog(){this._params=void 0}render(){return this._params?Te`
      <ha-dialog open .heading=${!0} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <ha-dialog-header slot="heading">
          <ha-icon-button slot="navigationIcon" dialogAction="close" .path=${Zn}>
          </ha-icon-button>
          <span slot="title">${mn("panels.sensors.dialogs.manage_groups.title",this.hass.language)}</span>
        </ha-dialog-header>
        <div class="wrapper">
          <div class="description">
            ${mn("panels.sensors.dialogs.manage_groups.description",this.hass.language)}
          </div>
          <div class="container">
            ${Object.keys(this.sensorGroups).length?Object.values(this.sensorGroups).map(e=>this.renderGroup(e)):mn("panels.sensors.dialogs.manage_groups.no_items",this.hass.language)}
          </div>
        </div>
        <mwc-button slot="secondaryAction" @click=${this.createGroupClick}>
          <ha-icon icon="hass:plus"></ha-icon>
          ${mn("panels.sensors.dialogs.manage_groups.actions.new_group",this.hass.language)}
        </mwc-button>
      </ha-dialog>
    `:Te``}renderGroup(e){return Te`
    <ha-card
      outlined
      @click=${t=>this.editGroupClick(t,e.group_id)}
    >
      <ha-icon icon="hass:folder-outline"></ha-icon>
      <div>
        <span class="name">${e.name}</span>
        <span class="description">${mn("panels.general.cards.areas.table.summary_sensors",this.hass.language,"{number}",String(e.entities.length))}
      </div>
      <ha-icon-button .path=${Kn}>
      </ha-icon-button>
    </ha-card>
    `}createGroupClick(e){const t=e.target;wn(t,"show-dialog",{dialogTag:"create-sensor-group-dialog",dialogImport:()=>Promise.resolve().then((function(){return Ms})),dialogParams:{}})}editGroupClick(e,t){const i=e.target;wn(i,"show-dialog",{dialogTag:"create-sensor-group-dialog",dialogImport:()=>Promise.resolve().then((function(){return Ms})),dialogParams:{group_id:t}})}static get styles(){return h`
      ${In}

      div.wrapper {
        color: var(--primary-text-color);
      }
      div.container {
        display: flex;
        flex-wrap: wrap;
      }
      ha-card {
        width: 100%;
        text-align: center;
        margin: 4px;
        box-sizing: border-box;
        padding: 8px;
        color: var(--primary-text-color);
        font-size: 16px;
        cursor: pointer;
        display: flex;
        flex-direction: row;
      }
      ha-card:hover {
        background: rgba(var(--rgb-secondary-text-color), 0.1);
      }
      ha-card ha-icon {
        --mdc-icon-size: 24px;
        display: flex;
        flex: 0 0 40px;
        margin: 0px 10px;
        align-items: center;
        color: var(--state-icon-color);
      }
      ha-card ha-icon-button {
        --mdc-icon-size: 24px;
        display: flex;
        flex: 0 0 40px;
        margin: 0px 10px;
        align-items: center;
      }
      ha-card div {
        display: flex;
        flex-wrap: wrap;
        flex: 1;
      }
      ha-card span {
        display: flex;
        flex: 0 0 100%;
      }
      ha-card span.description {
        color: var(--secondary-text-color);
      }
      mwc-button ha-icon {
        padding-right: 11px;
      }
    `}};n([Qe({attribute:!1})],Ns.prototype,"hass",void 0),n([Ye()],Ns.prototype,"_params",void 0),n([Qe()],Ns.prototype,"sensorGroups",void 0),n([Qe()],Ns.prototype,"sensors",void 0),Ns=n([Ke("manage-sensor-groups-dialog")],Ns);var Ds=Object.freeze({__proto__:null,get ManageSensorGroupsDialog(){return Ns}});let Ls=class extends(ut(Ge)){constructor(){super(...arguments),this.showBypassModes=!1,this.sensorsList=[],this.entityIdUnlocked=!1}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeMessage(()=>this._fetchData(),{type:"alarmo_config_updated"})]}async _fetchData(){var e;if(!this.hass)return;const t=await ht(this.hass);this.areas=t;const i=await st(this.hass);this.sensorGroups=i;const a=await it(this.hass);this.data=Object.keys(a).includes(this.item)?a[this.item]:void 0,this.data&&!(null===(e=this.data)||void 0===e?void 0:e.area)&&1==Object.keys(t).length&&(this.data=Object.assign(Object.assign({},this.data),{area:Object.keys(this.areas)[0]}));let n=xs(this.hass,Object.keys(a),!0);this.sensorsList=n.map(e=>Object(Object.assign(Object.assign({},e),{description:e.id,value:e.id}))),this.hass.states[this.item]||(this.entityIdUnlocked=!0)}render(){if(!this.data)return Te``;let e=[...this.sensorsList];e.find(e=>e.value==this.data.entity_id)||(e=[{value:this.data.entity_id,description:this.data.entity_id,name:$n(this.hass.states[this.item]),icon:"hass:help-circle-outline"},...e]);this.hass.states[this.data.entity_id];return Te`
      <ha-card>
        <div class="card-header">
          <div class="name">${mn("panels.sensors.cards.editor.title",this.hass.language)}</div>
          <ha-icon-button .path=${Zn} @click=${this.cancelClick}></ha-icon-button>
        </div>
        <div class="card-content">
          ${mn("panels.sensors.cards.editor.description",this.hass.language,"{entity}",$n(this.hass.states[this.item]))}
        </div>

        <settings-row .narrow=${this.narrow} .large=${!0}>
          <span slot="heading">
            ${mn("panels.sensors.cards.editor.fields.entity.heading",this.hass.language)}
          </span>
          <span slot="description">
            ${mn("panels.sensors.cards.editor.fields.entity.description",this.hass.language)}
          </span>

          <div style="display: flex; flex-direction: row">
            <alarmo-select
              style="flex: 1"
              .items=${e}
              .value=${this.data.entity_id}
              label="${mn("panels.sensors.cards.editor.fields.entity.heading",this.hass.language)}"
              @value-changed=${e=>{this.data={...this.data,new_entity_id:e.target.value}}}
              ?disabled=${!this.entityIdUnlocked}
              ?icons=${!0}
              ?invalid=${void 0===this.hass.states[this.data.new_entity_id||this.data.entity_id]}
            ></alarmo-select>

            <ha-icon-button
              .path=${this.entityIdUnlocked?"M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z":"M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10A2,2 0 0,1 6,8H15V6A3,3 0 0,0 12,3A3,3 0 0,0 9,6H7A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,17A2,2 0 0,0 14,15A2,2 0 0,0 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17Z"}
              @click=${()=>{this.entityIdUnlocked=!this.entityIdUnlocked}}
              style="--mdc-icon-size: 20px; --mdc-icon-button-size: 48px"
            >

            </ha-icon-button>
          </div>
        </settings-row>


        ${Object.keys(this.areas).length>1?Te`
              <settings-row .narrow=${this.narrow}>
                <span slot="heading">
                  ${mn("panels.sensors.cards.editor.fields.area.heading",this.hass.language)}
                </span>
                <span slot="description">
                  ${mn("panels.sensors.cards.editor.fields.area.description",this.hass.language)}
                </span>

                <alarmo-select
                  .items=${Object.values(this.areas).map(e=>Object({value:e.area_id,name:e.name}))}
                  value=${this.data.area}
                  label=${mn("panels.sensors.cards.editor.fields.area.heading",this.hass.language)}
                  @value-changed=${e=>this.data={...this.data,area:e.target.value}}
                  ?invalid=${!this.data.area}
                ></alarmo-select>
              </settings-row>
            `:""}

        <settings-row .narrow=${this.narrow} .large=${!0}>
          <span slot="heading">
            ${mn("panels.sensors.cards.editor.fields.device_type.heading",this.hass.language)}
          </span>
          <span slot="description">
            ${mn("panels.sensors.cards.editor.fields.device_type.description",this.hass.language)}
          </span>

          <alarmo-select
            .hass=${this.hass}
            .items=${t=this.hass,Object.entries(vn).filter(([,e])=>e!=vn.Other).map(([e,i])=>Object({value:i,name:mn(`panels.sensors.cards.editor.fields.device_type.choose.${i}.name`,t.language),description:mn(`panels.sensors.cards.editor.fields.device_type.choose.${i}.description`,t.language),icon:_n[e]}))}
            label=${mn("panels.sensors.cards.editor.fields.device_type.heading",this.hass.language)}
            clearable=${!0}
            icons=${!0}
            value=${this.data.type}
            @value-changed=${e=>this.setType(e.target.value||vn.Other)}
          ></alarmo-select>
        </settings-row>

        <settings-row .narrow=${this.narrow} .large=${this.modesByArea(this.data.area).length>3}>
          <span slot="heading">
            ${mn("panels.sensors.cards.editor.fields.modes.heading",this.hass.language)}
          </span>
          <span slot="description">
            ${mn("panels.sensors.cards.editor.fields.modes.description",this.hass.language)}
          </span>

          <div>
            ${this.modesByArea(this.data.area).map(e=>Te`
                <mwc-button
                  class="${this.data.modes.includes(e)||this.data.always_on?"active":""}"
                  @click=${()=>{this.setMode(e)}}
                  ?disabled=${this.data.always_on}
                >
                  <ha-icon icon="${un[Object.entries(yn).find(([,t])=>t==e)[0]]}"></ha-icon>
                  ${mn("common.modes_short."+e,this.hass.language)}
                </mwc-button>
              `)}
          </div>
        </settings-row>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">
            ${mn("panels.sensors.cards.editor.fields.group.heading",this.hass.language)}
          </span>
          <span slot="description">
            ${mn("panels.sensors.cards.editor.fields.group.description",this.hass.language)}
          </span>

          <div>
            ${Object.keys(this.sensorGroups).length?Te`
                  <alarmo-select
                    .clearable=${!0}
                    .items=${this.getSensorGroups()}
                    value=${this.data.group}
                    label="${mn("panels.sensors.cards.editor.fields.group.heading",this.hass.language)}"
                    @value-changed=${e=>{this.data={...this.data,group:e.detail.value}}}
                  ></alarmo-select>
                `:""}
            <mwc-button @click=${this.manageGroupsClick}>
              ${mn("panels.sensors.cards.editor.actions.setup_groups",this.hass.language)}
            </mwc-button>
          </div>
        </settings-row>

        <collapsible-section
          .narrow=${this.narrow}
          header=${mn("panels.sensors.cards.editor.actions.toggle_advanced",this.hass.language)}
        >
          ${!this.data.type||[vn.Environmental,vn.Other].includes(this.data.type)?Te`
                <settings-row .narrow=${this.narrow}>
                  <span slot="heading">
                    ${mn("panels.sensors.cards.editor.fields.always_on.heading",this.hass.language)}
                  </span>
                  <span slot="description">
                    ${mn("panels.sensors.cards.editor.fields.always_on.description",this.hass.language)}
                  </span>

                  <ha-switch
                    ?checked=${this.data.always_on}
                    @change=${e=>this._SetData({always_on:e.target.checked})}
                  ></ha-switch>
                </settings-row>
              `:""}
          ${!this.data.type||[vn.Window,vn.Door,vn.Motion,vn.Other].includes(this.data.type)?Te`
                <settings-row .narrow=${this.narrow}>
                  <span slot="heading">
                    ${mn("panels.sensors.cards.editor.fields.use_exit_delay.heading",this.hass.language)}
                  </span>
                  <span slot="description">
                    ${mn("panels.sensors.cards.editor.fields.use_exit_delay.description",this.hass.language)}
                  </span>

                  <ha-switch
                    ?checked=${this.data.use_exit_delay}
                    ?disabled=${this.data.always_on}
                    @change=${e=>this._SetData({use_exit_delay:e.target.checked})}
                  ></ha-switch>
                </settings-row>

                ${this.data.type==vn.Motion&&this.data.use_exit_delay?Te`
                      <settings-row .narrow=${this.narrow} nested>
                        <span slot="heading">
                          ${mn("panels.sensors.cards.editor.fields.allow_open.heading",this.hass.language)}
                        </span>
                        <span slot="description">
                          ${mn("panels.sensors.cards.editor.fields.allow_open.description",this.hass.language)}
                        </span>

                        <ha-switch
                          ?checked=${this.data.allow_open}
                          ?disabled=${this.data.always_on||this.data.arm_on_close}
                          @change=${e=>this._SetData({allow_open:e.target.checked})}
                        ></ha-switch>
                      </settings-row>
                    `:""}
              `:""}
          ${!this.data.type||[vn.Window,vn.Door,vn.Motion,vn.Other].includes(this.data.type)?Te`
                <settings-row .narrow=${this.narrow}>
                  <span slot="heading">
                    ${mn("panels.sensors.cards.editor.fields.use_entry_delay.heading",this.hass.language)}
                  </span>
                  <span slot="description">
                    ${mn("panels.sensors.cards.editor.fields.use_entry_delay.description",this.hass.language)}
                  </span>

                  <ha-switch
                    ?checked=${this.data.use_entry_delay}
                    ?disabled=${this.data.always_on}
                    @change=${e=>this._SetData({use_entry_delay:e.target.checked})}
                  ></ha-switch>
                </settings-row>
              `:""}
          ${!this.data.type||[vn.Door,vn.Other].includes(this.data.type)?Te`
                <settings-row .narrow=${this.narrow}>
                  <span slot="heading">
                    ${mn("panels.sensors.cards.editor.fields.arm_on_close.heading",this.hass.language)}
                  </span>
                  <span slot="description">
                    ${mn("panels.sensors.cards.editor.fields.arm_on_close.description",this.hass.language)}
                  </span>

                  <ha-switch
                    ?checked=${this.data.arm_on_close}
                    ?disabled=${this.data.always_on}
                    @change=${e=>this._SetData({arm_on_close:e.target.checked})}
                  ></ha-switch>
                </settings-row>
              `:""}
          ${!this.data.type||[vn.Window,vn.Door,vn.Other].includes(this.data.type)?Te`
                <settings-row .narrow=${this.narrow}>
                  <span slot="heading">
                    ${mn("panels.sensors.cards.editor.fields.auto_bypass.heading",this.hass.language)}
                  </span>
                  <span slot="description">
                    ${mn("panels.sensors.cards.editor.fields.auto_bypass.description",this.hass.language)}
                  </span>

                  <ha-switch
                    ?checked=${this.data.auto_bypass}
                    ?disabled=${this.data.always_on}
                    @change=${e=>this._SetData({auto_bypass:e.target.checked})}
                  ></ha-switch>
                </settings-row>

                ${this.data.auto_bypass?Te`
                      <settings-row .narrow=${this.narrow} .large=${this.modesByArea(this.data.area).length>2} nested>
                        <span slot="heading">
                          ${mn("panels.sensors.cards.editor.fields.auto_bypass.modes",this.hass.language)}
                        </span>
                        <div>
                          ${this.modesByArea(this.data.area).map(e=>Te`
                              <mwc-button
                                class="${this.data.auto_bypass_modes.includes(e)&&this.data.modes.includes(e)?"active":""}"
                                ?disabled=${!this.data.modes.includes(e)}
                                @click=${()=>{this.setBypassMode(e)}}
                              >
                                <ha-icon
                                  icon="${un[Object.entries(yn).find(([,t])=>t==e)[0]]}"
                                ></ha-icon>
                                ${mn("common.modes_short."+e,this.hass.language)}
                              </mwc-button>
                            `)}
                        </div>
                      </settings-row>
                    `:""}
              `:""}

        ${!this.data.type||[vn.Window,vn.Door,vn.Other].includes(this.data.type)?Te`
              <settings-row .narrow=${this.narrow}>
                <span slot="heading">
                  ${mn("panels.sensors.cards.editor.fields.allow_open.heading",this.hass.language)}
                </span>
                <span slot="description">
                  ${mn("panels.sensors.cards.editor.fields.allow_open.description",this.hass.language)}
                </span>

                <ha-switch
                  ?checked=${this.data.allow_open}
                  ?disabled=${this.data.always_on||this.data.arm_on_close}
                  @change=${e=>this._SetData({allow_open:e.target.checked})}
                ></ha-switch>
              </settings-row>
            `:""}

          <settings-row .narrow=${this.narrow}>
            <span slot="heading">
              ${mn("panels.sensors.cards.editor.fields.trigger_unavailable.heading",this.hass.language)}
            </span>
            <span slot="description">
              ${mn("panels.sensors.cards.editor.fields.trigger_unavailable.description",this.hass.language)}
            </span>

            <ha-switch
              ?checked=${this.data.trigger_unavailable}
              @change=${e=>this._SetData({trigger_unavailable:e.target.checked})}
            ></ha-switch>
          </settings-row>
        </collapsible-section>

        <div class="card-actions">
          <mwc-button @click=${this.saveClick}>
            ${this.hass.localize("ui.common.save")}
          </mwc-button>

          <mwc-button class="warning" @click=${this.deleteClick}>
            ${mn("panels.sensors.cards.editor.actions.remove",this.hass.language)}
          </mwc-button>
        </div>
      </ha-card>
    `;var t}modesByArea(e){const t=Object.keys(this.areas).reduce((e,t)=>Object.assign(e,{[t]:Object.entries(this.areas[t].modes).filter(([,e])=>e.enabled).map(([e])=>e)}),{});return e?t[e]:Object.values(t).reduce((e,t)=>e.filter(e=>t.includes(e)))}_SetData(e){if(this.data)for(const[t,i]of Object.entries(e))switch(t){case"always_on":this.data=Object.assign(Object.assign({},this.data),{always_on:1==i}),i&&(this.data=Object.assign(Object.assign({},this.data),{arm_on_close:!1,use_exit_delay:!1,use_entry_delay:!1,allow_open:!1,auto_bypass:!1}));break;case"use_entry_delay":this.data=Object.assign(Object.assign({},this.data),{use_entry_delay:1==i});break;case"use_exit_delay":this.data=Object.assign(Object.assign({},this.data),{use_exit_delay:1==i}),this.data.type!==vn.Motion||i||(this.data=Object.assign(Object.assign({},this.data),{allow_open:!1}));break;case"arm_on_close":this.data=Object.assign(Object.assign({},this.data),{arm_on_close:1==i}),i&&(this.data=Object.assign(Object.assign({},this.data),{always_on:!1,allow_open:!1}));break;case"allow_open":this.data=Object.assign(Object.assign({},this.data),{allow_open:1==i}),i&&(this.data=Object.assign(Object.assign({},this.data),{arm_on_close:!1,always_on:!1}));break;case"auto_bypass":this.data=Object.assign(Object.assign({},this.data),{auto_bypass:1==i}),i&&(this.data=Object.assign(Object.assign({},this.data),{always_on:!1}));break;case"trigger_unavailable":this.data=Object.assign(Object.assign({},this.data),{trigger_unavailable:1==i})}}setMode(e){this.data&&(this.data=Object.assign(Object.assign({},this.data),{modes:this.data.modes.includes(e)?En(this.data.modes,e):Tn(this.data.modes.concat([e]))}))}setBypassMode(e){this.data&&(this.data=Object.assign(Object.assign({},this.data),{auto_bypass_modes:this.data.auto_bypass_modes.includes(e)?En(this.data.auto_bypass_modes,e):Tn(this.data.auto_bypass_modes.concat([e]))}))}setType(e){if(!this.data)return;const t=e!=vn.Other?js(this.modesByArea(this.data.area))[e]:{};this.data=Object.assign(Object.assign(Object.assign({},this.data),{type:e}),t)}deleteClick(e){var t,i;(t=this.hass,i=this.item,t.callApi("POST","alarmo/sensors",{entity_id:i,remove:!0})).catch(t=>Cn(t,e)).then(()=>{this.cancelClick()})}saveClick(e){if(!this.data)return;const t=[];this.data.new_entity_id&&this.data.new_entity_id==this.data.entity_id&&(this.data=xn(this.data,"new_entity_id")),this.data=Object.assign(Object.assign({},this.data),{auto_bypass_modes:this.data.auto_bypass_modes.filter(e=>this.data.modes.includes(e))}),this.data.area||t.push(mn("panels.sensors.cards.editor.errors.no_area",this.hass.language)),this.data.modes.length||this.data.always_on||t.push(mn("panels.sensors.cards.editor.errors.no_modes",this.hass.language)),this.data.auto_bypass&&!this.data.auto_bypass_modes.length&&t.push(mn("panels.sensors.cards.editor.errors.no_auto_bypass_modes",this.hass.language)),t.length?On(e,Te`
          ${mn("panels.sensors.cards.editor.errors.description",this.hass.language)}
          <ul>
            ${t.map(e=>Te`
                  <li>${e}</li>
                `)}
          </ul>
        `):ot(this.hass,Object.assign({},this.data)).catch(t=>Cn(t,e)).then(()=>{this.cancelClick()})}cancelClick(){Ln(0,Rn("sensors"),!0)}manageGroupsClick(e){const t=e.target;wn(t,"show-dialog",{dialogTag:"manage-sensor-groups-dialog",dialogImport:()=>Promise.resolve().then((function(){return Ds})),dialogParams:{}})}getSensorGroups(){return Object.keys(this.sensorGroups).map(e=>Object({value:e,name:this.sensorGroups[e].name}))}};Ls.styles=qn,n([Qe()],Ls.prototype,"hass",void 0),n([Qe()],Ls.prototype,"narrow",void 0),n([Qe()],Ls.prototype,"item",void 0),n([Qe()],Ls.prototype,"data",void 0),n([Qe()],Ls.prototype,"showBypassModes",void 0),n([Ye()],Ls.prototype,"entityIdUnlocked",void 0),Ls=n([Ke("sensor-editor-card")],Ls);const Ps=e=>Object.keys(e.modes).filter(t=>e.modes[t].enabled),Hs=e=>{let t=[];return Object.values(e).forEach(e=>{t=[...t,...Ps(e)]}),t=Tn(t),t.sort((e,t)=>{const i=Object.values(yn);return i.findIndex(t=>t==e)-i.findIndex(e=>e==t)}),t},Bs="no_area";let qs=class extends(ut(Ge)){hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeMessage(()=>this._fetchData(),{type:"alarmo_config_updated"})]}async _fetchData(){this.hass&&(this.areas=await ht(this.hass),this.sensors=await it(this.hass))}async firstUpdated(){this.path&&2==this.path.length&&"filter"==this.path[0]&&(this.selectedArea=this.path[1])}shouldUpdate(e){const t=e.get("hass");return!t||1!=e.size||!this.sensors||Object.keys(this.sensors).some(e=>t.states[e]!==this.hass.states[e])}render(){return this.hass&&this.areas&&this.sensors?Te`
      <ha-card header="${mn("panels.sensors.title",this.hass.language)}">
        <div class="card-content">
          ${mn("panels.sensors.cards.sensors.description",this.hass.language)}
        </div>

        <alarmo-table
          .hass=${this.hass}
          ?selectable=${!0}
          .columns=${this.tableColumns()}
          .data=${this.getTableData()}
          .filters=${this.getTableFilterOptions()}
          @row-click=${e=>Ln(0,Rn("sensors",{params:{edit:e.detail.id}}),!0)}
        >
          ${mn("panels.sensors.cards.sensors.table.no_items",this.hass.language)}
        </alarmo-table>
      </ha-card>
    `:Te``}tableColumns(){const e=()=>Te`
      <simple-tooltip animation-delay="0">
        ${mn("panels.sensors.cards.sensors.table.no_area_warning",this.hass.language)}
      </simple-tooltip>
    `;return{icon:{width:"40px",renderer:t=>{const i=this.hass.states[t.entity_id],a=Object.keys(vn).find(e=>vn[e]==t.type),n=i?"on"===i.state?fn[a]:_n[a]:"hass:help-circle-outline";return t.area==Bs?Te`
                ${e()}
                <ha-icon icon="mdi:alert" style="color: var(--error-color)"></ha-icon>
              `:Te`
                <simple-tooltip animation-delay="0">
                  ${i?mn(`panels.sensors.cards.editor.fields.device_type.choose.${t.type}.name`,this.hass.language):this.hass.localize("state_badge.default.entity_not_found")}
                </simple-tooltip>
                <ha-icon icon="${n}" class="${t.enabled?"":"disabled"}"></ha-icon>
              `}},name:{title:this.hass.localize("ui.components.entity.entity-picker.entity"),width:"60%",grow:!0,text:!0,renderer:t=>Te`
          ${t.area==Bs?e():""}
          <span class="${t.enabled?"":"disabled"}">${t.name}</span>
          <span class="secondary ${t.enabled?"":"disabled"}">${t.entity_id}</span>
        `},modes:{title:mn("panels.sensors.cards.sensors.table.arm_modes",this.hass.language),width:"25%",hide:this.narrow,text:!0,renderer:t=>Te`
          ${t.area==Bs?e():""}
          <span class="${t.enabled?"":"disabled"}">
            ${t.always_on?mn("panels.sensors.cards.sensors.table.always_on",this.hass.language):t.modes.length?t.modes.map(e=>mn("common.modes_short."+e,this.hass.language)).join(", "):this.hass.localize("state_attributes.climate.preset_mode.none")}
          </span>
        `},enabled:{title:mn("common.enabled",this.hass.language),width:"68px",align:"center",renderer:e=>Te`
          <ha-switch
            @click=${e=>{e.stopPropagation()}}
            ?checked=${e.enabled}
            @change=${t=>this.toggleEnabled(t,e.entity_id)}
          ></ha-switch>
        `}}}getTableData(){const e=Object.keys(this.sensors).map(e=>{const t=this.hass.states[e],i=this.sensors[e],a=i.area?Ps(this.areas[i.area]):Hs(this.areas);return Object.assign(Object.assign({},i),{id:e,name:$n(t),modes:i.always_on?a:i.modes.filter(e=>a.includes(e)),warning:!i.area,area:i.area||Bs})});return e.sort(Dn),e}toggleEnabled(e,t){const i=e.target.checked;ot(this.hass,{entity_id:t,enabled:i}).catch(t=>Cn(t,e)).then()}removeCustomName(e){const t={entity_id:e,name:""};ot(this.hass,t)}getTableFilterOptions(){let e=Object.values(this.areas).map(e=>Object({value:e.area_id,name:e.name,badge:t=>t.filter(t=>t.area==e.area_id).length})).sort(Dn);Object.values(this.sensors).filter(e=>!e.area).length&&(e=[{value:Bs,name:this.hass.localize("state_attributes.climate.preset_mode.none"),badge:e=>e.filter(e=>e.area==Bs).length},...e]);const t=Hs(this.areas).map(e=>Object({value:e,name:mn("common.modes_short."+e,this.hass.language),badge:t=>t.filter(t=>t.modes.includes(e)).length}));return{area:{name:mn("components.table.filter.item",this.hass.language,"name",mn("panels.actions.cards.new_action.fields.area.heading",this.hass.language)),items:e,value:this.selectedArea?[this.selectedArea]:[]},modes:{name:mn("components.table.filter.item",this.hass.language,"name",mn("panels.actions.cards.new_action.fields.mode.heading",this.hass.language)),items:t,value:this.selectedMode?[this.selectedMode]:[]}}}};qs.styles=qn,n([Qe()],qs.prototype,"hass",void 0),n([Qe()],qs.prototype,"narrow",void 0),n([Qe()],qs.prototype,"areas",void 0),n([Qe()],qs.prototype,"sensors",void 0),n([Qe()],qs.prototype,"selectedArea",void 0),n([Qe()],qs.prototype,"selectedMode",void 0),n([Qe()],qs.prototype,"path",void 0),qs=n([Ke("sensors-overview-card")],qs);let Is=class extends(ut(Ge)){constructor(){super(...arguments),this.addSelection=[],this.areas={},this.sensors={}}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeMessage(()=>this._fetchData(),{type:"alarmo_config_updated"})]}async _fetchData(){this.hass&&(this.areas=await ht(this.hass))}async firstUpdated(){this.areas=await ht(this.hass),this.sensors=await it(this.hass)}render(){const e={checkbox:{width:"48px",renderer:e=>Te`
          <ha-checkbox
            @change=${t=>this.toggleSelect(t,e.id)}
            ?checked=${this.addSelection.includes(e.id)}
          ></ha-checkbox>
        `},icon:{width:"40px",renderer:e=>Te`
          <state-badge .hass=${this.hass} .stateObj=${this.hass.states[e.id]}></state-badge>
        `},name:{title:this.hass.localize("ui.components.entity.entity-picker.entity"),width:"40%",grow:!0,text:!0,renderer:e=>Te`
          ${An(e.name)}
          <span class="secondary">${e.id}</span>
        `},type:{title:mn("panels.sensors.cards.add_sensors.table.type",this.hass.language),width:"40%",hide:this.narrow,text:!0,renderer:e=>e.type?mn(`panels.sensors.cards.editor.fields.device_type.choose.${e.type}.name`,this.hass.language):this.hass.localize("state.default.unknown")}},t=xs(this.hass,Object.keys(this.sensors),!0).map(e=>Object.assign(Object.assign({},e),{type:Es(this.hass.states[e.id]),isSupportedType:void 0!==Es(this.hass.states[e.id])?"true":"false"}));return Te`
      <ha-card header="${mn("panels.sensors.cards.add_sensors.title",this.hass.language)}">
        <div class="card-content">
          ${mn("panels.sensors.cards.add_sensors.description",this.hass.language)}
        </div>

        <alarmo-table
          .hass=${this.hass}
          .columns=${e}
          .data=${t}
          .filters=${this.getTableFilterOptions()}
        >
          ${mn("panels.sensors.cards.add_sensors.no_items",this.hass.language)}
        </alarmo-table>

        <div class="card-actions">
          <mwc-button @click=${this.addSelected} ?disabled=${0==this.addSelection.length}>
            ${mn("panels.sensors.cards.add_sensors.actions.add_to_alarm",this.hass.language)}
          </mwc-button>
        </div>
      </ha-card>
    `}toggleSelect(e,t){const i=e.target.checked;this.addSelection=i&&!this.addSelection.includes(t)?[...this.addSelection,t]:i?this.addSelection:this.addSelection.filter(e=>e!=t)}addSelected(e){if(!this.hass)return;const t=Object.values(this.areas).map(e=>Object.entries(e.modes).filter(([,e])=>e.enabled).map(([e])=>e)).reduce((e,t)=>e.filter(e=>t.includes(e)));this.addSelection.map(e=>function(e,t){if(!e)return null;const i=Pn(e.entity_id);let a={entity_id:e.entity_id,modes:[],use_entry_delay:!0,use_exit_delay:!0,arm_on_close:!1,allow_open:!1,always_on:!1,auto_bypass:!1,auto_bypass_modes:[],trigger_unavailable:!1,type:vn.Other,enabled:!0};if("binary_sensor"==i){const i=Es(e);i&&(a=Object.assign(Object.assign(Object.assign({},a),{type:i}),js(t)[i]))}return a}(this.hass.states[e],t)).map(e=>1==Object.keys(this.areas).length?Object.assign(e,{area:Object.keys(this.areas)[0]}):e).filter(e=>e).forEach(t=>{ot(this.hass,t).catch(t=>Cn(t,e)).then()}),this.addSelection=[]}getTableFilterOptions(){return{isSupportedType:{name:mn("panels.sensors.cards.add_sensors.actions.filter_supported",this.hass.language),items:[{value:"true",name:"true"}],value:["true"],binary:!0}}}};Is.styles=qn,n([Qe()],Is.prototype,"hass",void 0),n([Qe()],Is.prototype,"narrow",void 0),n([Qe()],Is.prototype,"addSelection",void 0),n([Qe()],Is.prototype,"areas",void 0),n([Qe()],Is.prototype,"sensors",void 0),Is=n([Ke("add-sensors-card")],Is);let Us=class extends Ge{firstUpdated(){(async()=>{await Je()})()}render(){var e,t;if(!this.hass)return Te``;if(this.path.params.edit)return Te`
        <sensor-editor-card
          .hass=${this.hass}
          .narrow=${this.narrow}
          .item=${this.path.params.edit}
        ></sensor-editor-card>
      `;{const i=null===(e=this.path.filter)||void 0===e?void 0:e.area,a=null===(t=this.path.filter)||void 0===t?void 0:t.mode;return Te`
        <sensors-overview-card
          .hass=${this.hass}
          .narrow=${this.narrow}
          .selectedArea=${i}
          .selectedMode=${a}
        ></sensors-overview-card>
        <add-sensors-card .hass=${this.hass} .narrow=${this.narrow}></add-sensors-card>
      `}}};n([Qe()],Us.prototype,"hass",void 0),n([Qe()],Us.prototype,"narrow",void 0),n([Qe()],Us.prototype,"path",void 0),Us=n([Ke("alarm-view-sensors")],Us);let Rs=class extends Ge{constructor(){super(...arguments),this.data={can_arm:!0,can_disarm:!0,is_override_code:!1},this.repeatCode="",this.areas={}}async firstUpdated(){if(this.users=await at(this.hass),this.areas=await ht(this.hass),this.item){const e=this.users[this.item];this.data=xn(e,"code","code_format","code_length")}this.data=Object.assign(Object.assign({},this.data),{area_limit:(this.data.area_limit||[]).filter(e=>Object.keys(this.areas).includes(e))}),(this.data.area_limit||[]).length||(this.data=Object.assign(Object.assign({},this.data),{area_limit:Object.keys(this.areas)}))}render(){var e;return this.users?Te`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${this.item?mn("panels.codes.cards.edit_user.title",this.hass.language):mn("panels.codes.cards.new_user.title",this.hass.language)}
          </div>
          <ha-icon-button .path=${Zn} @click=${this.cancelClick}></ha-icon-button>
        </div>
        <div class="card-content">
          ${this.item?mn("panels.codes.cards.edit_user.description",this.hass.language,"{name}",this.users[this.item].name):mn("panels.codes.cards.new_user.description",this.hass.language)}
        </div>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${mn("panels.codes.cards.new_user.fields.name.heading",this.hass.language)}</span>
          <span slot="description">
            ${mn("panels.codes.cards.new_user.fields.name.description",this.hass.language)}
          </span>

          <ha-textfield
            label="${mn("panels.codes.cards.new_user.fields.name.heading",this.hass.language)}"
            placeholder=""
            value=${this.data.name}
            @input=${e=>this.data={...this.data,name:e.target.value}}
          ></ha-textfield>
        </settings-row>

        ${this.item?Te`
              <settings-row .narrow=${this.narrow}>
                <span slot="heading">
                  ${mn("panels.codes.cards.edit_user.fields.old_code.heading",this.hass.language)}
                </span>
                <span slot="description">
                  ${mn("panels.codes.cards.edit_user.fields.old_code.description",this.hass.language)}
                </span>

                <ha-textfield
                  label="${mn("panels.codes.cards.edit_user.fields.old_code.heading",this.hass.language)}"
                  placeholder=""
                  type="password"
                  value=${this.data.old_code||""}
                  @input=${e=>this.data={...this.data,old_code:String(e.target.value).trim()}}
                ></ha-textfield>
              </settings-row>
            `:""}
        ${this.item&&!(null===(e=this.data.old_code)||void 0===e?void 0:e.length)?"":Te`
              <settings-row .narrow=${this.narrow}>
                <span slot="heading">
                  ${mn("panels.codes.cards.new_user.fields.code.heading",this.hass.language)}
                </span>
                <span slot="description">
                  ${mn("panels.codes.cards.new_user.fields.code.description",this.hass.language)}
                </span>

                <ha-textfield
                  label="${mn("panels.codes.cards.new_user.fields.code.heading",this.hass.language)}"
                  placeholder=""
                  type="password"
                  value=${this.data.code}
                  @input=${e=>this.data={...this.data,code:String(e.target.value).trim()}}
                ></ha-textfield>
              </settings-row>

              <settings-row .narrow=${this.narrow}>
                <span slot="heading">
                  ${mn("panels.codes.cards.new_user.fields.confirm_code.heading",this.hass.language)}
                </span>
                <span slot="description">
                  ${mn("panels.codes.cards.new_user.fields.confirm_code.description",this.hass.language)}
                </span>

                <ha-textfield
                  label="${mn("panels.codes.cards.new_user.fields.confirm_code.heading",this.hass.language)}"
                  placeholder=""
                  type="password"
                  value=${this.repeatCode||""}
                  @input=${e=>this.repeatCode=String(e.target.value).trim()}
                ></ha-textfield>
              </settings-row>
            `}

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">
            ${mn("panels.codes.cards.new_user.fields.can_arm.heading",this.hass.language)}
          </span>
          <span slot="description">
            ${mn("panels.codes.cards.new_user.fields.can_arm.description",this.hass.language)}
          </span>

          <ha-switch
            ?checked=${this.data.can_arm}
            @change=${e=>this.data={...this.data,can_arm:e.target.checked}}
          ></ha-switch>
        </settings-row>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">
            ${mn("panels.codes.cards.new_user.fields.can_disarm.heading",this.hass.language)}
          </span>
          <span slot="description">
            ${mn("panels.codes.cards.new_user.fields.can_disarm.description",this.hass.language)}
          </span>

          <ha-switch
            ?checked=${this.data.can_disarm}
            @change=${e=>this.data={...this.data,can_disarm:e.target.checked}}
          ></ha-switch>
        </settings-row>

        ${this.getAreaOptions().length>=2?Te`
              <settings-row .narrow=${this.narrow}>
                <span slot="heading">
                  ${mn("panels.codes.cards.new_user.fields.area_limit.heading",this.hass.language)}
                </span>
                <span slot="description">
                  ${mn("panels.codes.cards.new_user.fields.area_limit.description",this.hass.language)}
                </span>

                <div class="checkbox-list">
                  ${this.getAreaOptions().map(e=>{var t;const i=(this.data.area_limit||[]).includes(e.value)||!(null===(t=this.data.area_limit)||void 0===t?void 0:t.length);return Te`
                      <div>
                        <ha-checkbox
                          @change=${t=>this.toggleSelectArea(e.value,t.target.checked)}
                          ?disabled=${i&&(this.data.area_limit||[]).length<=1}
                          ?checked=${i}
                        ></ha-checkbox>
                        <span @click=${()=>this.toggleSelectArea(e.value,!i)}>
                          ${e.name}
                        </span>
                      </div>
                    `})}
                </div>
              </settings-row>
            `:""}

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">
            ${mn("panels.codes.cards.new_user.fields.is_override_code.heading",this.hass.language)}
          </span>
          <span slot="description">
            ${mn("panels.codes.cards.new_user.fields.is_override_code.description",this.hass.language)}
          </span>

          <ha-switch
            ?checked=${this.data.is_override_code}
            @change=${e=>this.data={...this.data,is_override_code:e.target.checked}}
          ></ha-switch>
        </settings-row>

        <div class="card-actions">
          <mwc-button @click=${this.saveClick}>
            ${this.hass.localize("ui.common.save")}
          </mwc-button>

          ${this.item?Te`
                <mwc-button class="warning" @click=${this.deleteClick}>
                  ${this.hass.localize("ui.common.delete")}
                </mwc-button>
              `:""}
        </div>
      </ha-card>
    `:Te``}getAreaOptions(){let e=Object.keys(this.areas||{}).map(e=>Object({value:e,name:this.areas[e].name}));return e.sort(Dn),e}toggleSelectArea(e,t){if((this.data.area_limit||[]).length<=1&&!t)return;let i=this.data.area_limit||[];i=t?i.includes(e)?i:[...i,e]:i.includes(e)?i.filter(t=>t!=e):i,this.data=Object.assign(Object.assign({},this.data),{area_limit:i})}deleteClick(e){var t,i;this.item&&(t=this.hass,i=this.item,t.callApi("POST","alarmo/users",{user_id:i,remove:!0})).catch(t=>Cn(t,e)).then(()=>{this.cancelClick()})}saveClick(e){var t,i,a;let n=Object.assign({},this.data);(null===(t=n.name)||void 0===t?void 0:t.length)?(null===(i=n.code)||void 0===i?void 0:i.length)&&!(n.code.length<4)||this.item&&!(null===(a=n.old_code)||void 0===a?void 0:a.length)?(n.code||"").length&&n.code!==this.repeatCode?(On(e,mn("panels.codes.cards.new_user.errors.code_mismatch",this.hass.language)),this.data=xn(this.data,"code"),this.repeatCode=""):(this.item&&(n.old_code||"").length<4&&xn(n,"old_code","code"),this.getAreaOptions().length&&!this.getAreaOptions().every(e=>(this.data.area_limit||[]).includes(e.value))||(n=Object.assign(Object.assign({},n),{area_limit:[]})),dt(this.hass,n).catch(t=>Cn(t,e)).then(()=>{this.cancelClick()})):On(e,mn("panels.codes.cards.new_user.errors.no_code",this.hass.language)):On(e,mn("panels.codes.cards.new_user.errors.no_name",this.hass.language))}cancelClick(){Ln(0,Rn("codes"),!0)}static get styles(){return h`
      ${qn}
      div.checkbox-list {
        display: flex;
        flex-direction: row;
      }
      div.checkbox-list div {
        display: flex;
        align-items: center;
      }
      div.checkbox-list div span {
        cursor: pointer;
      }
    `}};n([Qe()],Rs.prototype,"hass",void 0),n([Qe()],Rs.prototype,"narrow",void 0),n([Qe()],Rs.prototype,"item",void 0),n([Qe()],Rs.prototype,"data",void 0),n([Qe()],Rs.prototype,"repeatCode",void 0),Rs=n([Ke("user-editor-card")],Rs);let Vs=class extends(ut(Ge)){constructor(){super(...arguments),this.users={}}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeMessage(()=>this._fetchData(),{type:"alarmo_config_updated"})]}async _fetchData(){if(!this.hass)return;const e=await tt(this.hass);this.data=jn(e,["code_arm_required","code_disarm_required","code_mode_change_required","code_format"]);const t=await at(this.hass);this.users=t}render(){if(!this.hass||!this.data)return Te``;if("new_user"==this.path.subpage)return Te`
        <user-editor-card .hass=${this.hass} .narrow=${this.narrow}></user-editor-card>
      `;if(this.path.params.edit_user)return Te`
        <user-editor-card
          .hass=${this.hass}
          .narrow=${this.narrow}
          item=${this.path.params.edit_user}
        ></user-editor-card>
      `;{const e=this.data.code_arm_required||this.data.code_disarm_required||this.data.code_mode_change_required;return Te`
        <ha-card header="${mn("panels.codes.title",this.hass.language)}">
          <div class="card-content">${mn("panels.codes.cards.codes.description",this.hass.language)}</div>

          <settings-row .narrow=${this.narrow}>
            <span slot="heading">
              ${mn("panels.codes.cards.codes.fields.code_arm_required.heading",this.hass.language)}
            </span>
            <span slot="description">
              ${mn("panels.codes.cards.codes.fields.code_arm_required.description",this.hass.language)}
            </span>
            <ha-switch
              ?checked=${this.data.code_arm_required}
              @change=${e=>{this.saveData({code_arm_required:e.target.checked})}}
            ></ha-switch>
          </settings-row>

          <settings-row .narrow=${this.narrow}>
            <span slot="heading">
              ${mn("panels.codes.cards.codes.fields.code_disarm_required.heading",this.hass.language)}
            </span>
            <span slot="description">
              ${mn("panels.codes.cards.codes.fields.code_disarm_required.description",this.hass.language)}
            </span>
            <ha-switch
              ?checked=${this.data.code_disarm_required}
              @change=${e=>{this.saveData({code_disarm_required:e.target.checked})}}
            ></ha-switch>
          </settings-row>

          <settings-row .narrow=${this.narrow}>
            <span slot="heading">
              ${mn("panels.codes.cards.codes.fields.code_mode_change_required.heading",this.hass.language)}
            </span>
            <span slot="description">
              ${mn("panels.codes.cards.codes.fields.code_mode_change_required.description",this.hass.language)}
            </span>
            <ha-switch
              ?checked=${this.data.code_mode_change_required}
              @change=${e=>{this.saveData({code_mode_change_required:e.target.checked})}}
            ></ha-switch>
          </settings-row>

          <settings-row .narrow=${this.narrow}>
            <span slot="heading">
              ${mn("panels.codes.cards.codes.fields.code_format.heading",this.hass.language)}
            </span>
            <span slot="description">
              ${mn("panels.codes.cards.codes.fields.code_format.description",this.hass.language)}
            </span>
            <mwc-button
              class="${"number"==this.data.code_format?"active":""} ${e?"":"disabled"}"
              @click=${()=>{this.saveData({code_format:"number"})}}
              ?disabled=${!e}
            >
              ${mn("panels.codes.cards.codes.fields.code_format.code_format_number",this.hass.language)}
            </mwc-button>
            <mwc-button
              class="${"text"==this.data.code_format?"active":""} ${e?"":"disabled"}"
              @click=${()=>{this.saveData({code_format:"text"})}}
              ?disabled=${!e}
            >
              ${mn("panels.codes.cards.codes.fields.code_format.code_format_text",this.hass.language)}
            </mwc-button>
          </settings-row>
        </ha-card>

        ${this.usersPanel()}
      `}}usersPanel(){if(!this.hass)return Te``;const e=Object.values(this.users);e.sort(Dn);const t={icon:{width:"40px"},name:{title:this.hass.localize("ui.components.area-picker.add_dialog.name"),width:"40%",grow:!0,text:!0},code_format:{title:mn("panels.codes.cards.codes.fields.code_format.heading",this.hass.language),width:"40%",hide:this.narrow,text:!0},enabled:{title:mn("common.enabled",this.hass.language),width:"68px",align:"center"}},i=e.map(e=>({id:e.user_id,icon:Te`
          <ha-icon icon="mdi:account-outline"></ha-icon>
        `,name:An(e.name),code_format:"number"==e.code_format?An(mn("panels.codes.cards.codes.fields.code_format.code_format_number",this.hass.language)):"text"==e.code_format?An(mn("panels.codes.cards.codes.fields.code_format.code_format_text",this.hass.language)):this.hass.localize("state.default.unknown"),enabled:Te`
          <ha-switch
            @click=${e=>{e.stopPropagation()}}
            ?checked=${e.enabled}
            @change=${t=>this.toggleEnabled(t,e.user_id)}
          ></ha-switch>
        `}));return Te`
      <ha-card header="${mn("panels.codes.cards.user_management.title",this.hass.language)}">
        <div class="card-content">
          ${mn("panels.codes.cards.user_management.description",this.hass.language)}
        </div>

        <alarmo-table
          ?selectable=${!0}
          .columns=${t}
          .data=${i}
          @row-click=${e=>{const t=String(e.detail.id);Ln(0,Rn("codes",{params:{edit_user:t}}),!0)}}
        >
          ${mn("panels.codes.cards.user_management.no_items",this.hass.language)}
        </alarmo-table>
        <div class="card-actions">
          <mwc-button @click=${this.addUserClick}>
            ${mn("panels.codes.cards.user_management.actions.new_user",this.hass.language)}
          </mwc-button>
        </div>
      </ha-card>
    `}addUserClick(){Ln(0,Rn("codes","new_user"),!0)}saveData(e){this.hass&&(this.data=Object.assign(Object.assign({},this.data),e),rt(this.hass,this.data).catch(e=>Cn(e,this.shadowRoot.querySelector("ha-card"))).then())}toggleEnabled(e,t){const i=e.target.checked;dt(this.hass,{user_id:t,enabled:i}).catch(t=>Cn(t,e)).then()}};Vs.styles=qn,n([Qe()],Vs.prototype,"hass",void 0),n([Qe()],Vs.prototype,"narrow",void 0),n([Qe()],Vs.prototype,"path",void 0),n([Qe()],Vs.prototype,"data",void 0),n([Qe()],Vs.prototype,"users",void 0),Vs=n([Ke("alarm-view-codes")],Vs);const Gs=(e,t)=>{switch(e){case yn.ArmedAway:return{value:yn.ArmedAway,name:mn("common.modes_short.armed_away",t.language),icon:un.ArmedAway};case yn.ArmedHome:return{value:yn.ArmedHome,name:mn("common.modes_short.armed_home",t.language),icon:un.ArmedHome};case yn.ArmedNight:return{value:yn.ArmedNight,name:mn("common.modes_short.armed_night",t.language),icon:un.ArmedNight};case yn.ArmedCustom:return{value:yn.ArmedCustom,name:mn("common.modes_short.armed_custom_bypass",t.language),icon:un.ArmedCustom};case yn.ArmedVacation:return{value:yn.ArmedVacation,name:mn("common.modes_short.armed_vacation",t.language),icon:un.ArmedVacation}}},Fs=(e,t)=>{switch(e){case kn.Armed:return{value:kn.Armed,name:mn("panels.actions.cards.new_notification.fields.event.choose.armed.name",t.language),description:mn("panels.actions.cards.new_notification.fields.event.choose.armed.description",t.language),icon:"hass:shield-check-outline"};case kn.Disarmed:return{value:kn.Disarmed,name:mn("panels.actions.cards.new_notification.fields.event.choose.disarmed.name",t.language),description:mn("panels.actions.cards.new_notification.fields.event.choose.disarmed.description",t.language),icon:"hass:shield-off-outline"};case kn.Triggered:return{value:kn.Triggered,name:mn("panels.actions.cards.new_notification.fields.event.choose.triggered.name",t.language),description:mn("panels.actions.cards.new_notification.fields.event.choose.triggered.description",t.language),icon:"hass:bell-alert-outline"};case kn.Untriggered:return{value:kn.Untriggered,name:mn("panels.actions.cards.new_notification.fields.event.choose.untriggered.name",t.language),description:mn("panels.actions.cards.new_notification.fields.event.choose.untriggered.description",t.language),icon:"hass:bell-off-outline"};case kn.ArmFailure:return{value:kn.ArmFailure,name:mn("panels.actions.cards.new_notification.fields.event.choose.arm_failure.name",t.language),description:mn("panels.actions.cards.new_notification.fields.event.choose.arm_failure.description",t.language),icon:"hass:alert-outline"};case kn.Arming:return{value:kn.Arming,name:mn("panels.actions.cards.new_notification.fields.event.choose.arming.name",t.language),description:mn("panels.actions.cards.new_notification.fields.event.choose.arming.description",t.language),icon:"hass:home-export-outline"};case kn.Pending:return{value:kn.Pending,name:mn("panels.actions.cards.new_notification.fields.event.choose.pending.name",t.language),description:mn("panels.actions.cards.new_notification.fields.event.choose.pending.description",t.language),icon:"hass:home-import-outline"}}},Ks=(e,t,i)=>0==e?{name:i.master.name,value:0}:Object.keys(t).includes(String(e))?{name:t[e].name,value:e}:{name:String(e),value:e},Zs=(e,...t)=>{const i=t.map(t=>{if(!t)return null;const i=Pn(t),a=Hn(t);let n={value:t,name:a.replace(/_/g," ").split(" ").map(e=>e.substring(0,1).toUpperCase()+e.substring(1)).join(" "),icon:"hass:home",description:t};switch(i){case"notify":const t=e.states["device_tracker."+a.replace("mobile_app_","")];n=t?Object.assign(Object.assign({},n),{name:t.attributes.friendly_name||Hn(t.entity_id),icon:t.attributes.icon||"hass:cellphone-text"}):Object.assign(Object.assign({},n),{icon:"hass:comment-alert"});break;case"tts":n=Object.assign(Object.assign({},n),{icon:"hass:microphone"})}return n}).filter(Sn);return i.sort((e,t)=>{const i=Pn(e.value),a=Pn(t.value);return i!=a?Dn(i,a):Dn(e,t)}),i},Qs=(e,t)=>{let i=[];const a=Object.keys(e).filter(t=>Object.values(e[t].modes).some(e=>e.enabled));return t.master.enabled&&a.length>1&&(i=[...i,0]),i=[...i,...a],i},Ys=(e,t)=>{const i=e=>Object.keys(e.modes).filter(t=>e.modes[t].enabled);if(Sn(e)&&Object.keys(t).includes(String(e)))return i(t[e]);{const e=Object.keys(t).map(e=>i(t[e]));return e[0].filter(t=>e.every(e=>e.includes(t)))}},Ws=(e,t)=>e.map(e=>({value:e,name:e in t.states?t.states[e].attributes.friendly_name||Hn(e):e,icon:e in t.states?t.states[e].attributes.icon||Bn(Pn(e)):void 0,description:e})),Xs=e=>{let t=[];return"notify"in e.services&&(t=[...t,...Object.keys(e.services.notify).map(e=>"notify."+e)]),"tts"in e.services&&(t=[...t,...Object.keys(e.services.tts).filter(e=>"clear_cache"!=e).map(e=>"tts."+e)]),t},Js=(...e)=>{if(!e.length||!e.every(e=>e.length))return[];if(1==e.length&&e[0].length>1&&Tn(e[0].map(Pn)).length>1)return Js(...e[0].map(e=>Array(e)));let t=[...e[0]];return e.forEach(e=>{t=t.map(t=>e.includes(t)?t:"script"==Pn(t)&&e.map(Pn).includes("script")?"script.script":e.map(Hn).includes(Hn(t))?"homeassistant."+Hn(t):null).filter(Sn)}),t},er=(e,t,i=1)=>{if(i>10)return[];if(Array.isArray(e)){const a=e.map(e=>er(e,t,i+1));return Js(...a)}if(!Sn(e))return[];const a=Pn(e);switch(a){case"light":case"switch":case"input_boolean":case"siren":return[a+".turn_on",a+".turn_off"];case"script":return[e];case"lock":return["lock.lock","lock.unlock"];case"group":const n=e in t.states?t.states[e]:void 0,s=(null==n?void 0:n.attributes.entity_id)||[];return er(s,t,i+1);default:return[]}},tr=(e,t)=>{let i=[...Object.keys(e.states).filter(t=>er(t,e).length)];return t&&t.length&&(i=[...i,...t.filter(e=>!i.includes(e))]),i.sort(Dn),i},ir=(e,...t)=>{let i=[...Object.keys(e.states).filter(e=>t.includes(Pn(e)))];return i.sort(Dn),i},ar=e=>{let t=[{value:"{{arm_mode}}",name:e.translationMetadata.translations.en.nativeName}];return"en"!=e.language&&(t=[...t,{value:`{{arm_mode|lang=${e.language}}}`,name:e.translationMetadata.translations[e.language].nativeName}]),t},nr=e=>"string"==typeof e&&e.trim().length,sr=(e,t)=>nr(e)&&t.services[Pn(e)]&&t.services[Pn(e)][Hn(e)],rr=(e,t)=>nr(e)&&t.states[e],or=e=>"object"==typeof e&&null!==e&&!Array.isArray(e),dr=e=>"string"==typeof e;let lr=class extends Ge{constructor(){super(...arguments),this.items=[],this.value=[],this.label="",this.invalid=!1}shouldUpdate(e){return e.get("items")&&(zn(this.items,e.get("items"))||this.firstUpdated()),!0}firstUpdated(){this.value.some(e=>!this.items.map(e=>e.value).includes(e))&&(this.value=this.value.filter(e=>this.items.map(e=>e.value).includes(e)),wn(this,"value-changed",{value:this.value}))}render(){return Te`
      <div class="chip-set">
        ${this.value.length?this.value.map(e=>this.items.find(t=>t.value==e)).filter(Sn).map(e=>Te`
          <div class="chip">
            <ha-icon class="icon" icon=${e.icon}>
            </ha-icon>
            <span class="label">
              ${e.name}
            </span>            
            <ha-icon class="button" icon="hass:close" @click=${()=>this._removeClick(e.value)}>
            </ha-icon>
            </mwc-icon-button>
          </div>
        `):""}
      </div>
      <alarmo-select
        .hass=${this.hass}
        .items=${this.items.filter(e=>!this.value.includes(e.value))}
        ?disabled=${this.value.length==this.items.length}
        label=${this.label}
        icons=${!0}
        @value-changed=${this._addClick}
        ?invalid=${this.invalid&&this.value.length!=this.items.length}
      ></alarmo-select>
    `}_removeClick(e){this.value=this.value.filter(t=>t!==e),wn(this,"value-changed",{value:this.value})}_addClick(e){e.stopPropagation();const t=e.target,i=t.value;this.value.includes(i)||(this.value=[...this.value,i]),t.value="",wn(this,"value-changed",{value:[...this.value]})}static get styles(){return h`
      div.chip-set {
        margin: 0px -4px;
      }
      div.chip {
        height: 32px;
        border-radius: 16px;
        border: 2px solid rgb(168, 232, 251);
        line-height: 1.25rem;
        font-size: 0.875rem;
        font-weight: 400;
        padding: 0px 12px;
        display: inline-flex;
        align-items: center;
        box-sizing: border-box;
        margin: 4px;
      }
      .icon {
        vertical-align: middle;
        outline: none;
        display: flex;
        align-items: center;
        border-radius: 50%;
        padding: 6px;
        color: rgba(0, 0, 0, 0.54);
        background: rgb(168, 232, 251);
        --mdc-icon-size: 20px;
        margin-left: -14px !important;
      }
      .label {
        margin: 0px 4px;
      }
      .button {
        cursor: pointer;
        background: var(--secondary-text-color);
        border-radius: 50%;
        --mdc-icon-size: 14px;
        color: var(--card-background-color);
        width: 16px;
        height: 16px;
        padding: 1px;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        margin-right: -6px !important;
      }
    `}};var cr;n([Qe()],lr.prototype,"hass",void 0),n([Qe()],lr.prototype,"items",void 0),n([Qe({type:Array})],lr.prototype,"value",void 0),n([Qe()],lr.prototype,"label",void 0),n([Qe({type:Boolean})],lr.prototype,"invalid",void 0),lr=n([Ke("alarmo-selector")],lr),function(e){e[e.Yaml=0]="Yaml",e[e.UI=1]="UI"}(cr||(cr={}));let hr=class extends Ge{constructor(){super(...arguments),this.config={type:bn.Notification,triggers:[{}],actions:[{}]},this.viewMode=cr.UI,this.errors={}}async firstUpdated(){if(await et(),this.areas=await ht(this.hass),this.alarmoConfig=await tt(this.hass),this.item){let e=this.item.actions.map(e=>xn(e,"entity_id"));this.config=Object.assign(Object.assign({},this.item),{actions:[e[0],...e.slice(1)]}),this.config.triggers.length>1&&(this.config=Object.assign(Object.assign({},this.config),{triggers:[this.config.triggers[0]]}));let t=this.config.triggers[0].area;Sn(t)&&!Qs(this.areas,this.alarmoConfig).includes(t)?t=void 0:null===t&&(t=0),this._setArea(new CustomEvent("value-changed",{detail:{value:t}}))}if(!Sn(this.config.triggers[0].area)){const e=Qs(this.areas,this.alarmoConfig);1==e.length?this._setArea(new CustomEvent("value-changed",{detail:{value:e[0]}})):e.includes(0)&&this._setArea(new CustomEvent("value-changed",{detail:{value:0}}))}}render(){var e,t,i,a;return this.hass&&this.areas&&this.alarmoConfig?Te`
      <div class="heading">
        <ha-icon-button .path=${Zn} @click=${this._cancelClick} class="icon"></ha-icon-button>
        <div class="header">${mn("panels.actions.cards.new_notification.title",this.hass.language)}</div>
        <div class="description">
          ${mn("panels.actions.cards.new_notification.description",this.hass.language)}
        </div>
      </div>
      <div class="section-header">${mn("panels.actions.cards.new_notification.trigger",this.hass.language)}</div>
      <ha-card>
        <div class="card-content">
          <settings-row .narrow=${this.narrow} .large=${!0} first>
            <span slot="heading">
              ${mn("panels.actions.cards.new_notification.fields.event.heading",this.hass.language)}
            </span>
            <span slot="description">
              ${mn("panels.actions.cards.new_notification.fields.event.description",this.hass.language)}
            </span>

            <alarmo-select
              .hass=${this.hass}
              .items=${Object.values(kn).map(e=>Fs(e,this.hass))}
              label=${mn("panels.actions.cards.new_action.fields.event.heading",this.hass.language)}
              icons=${!0}
              .value=${this.config.triggers[0].event}
              @value-changed=${this._setEvent}
              ?invalid=${this.errors.event}
            ></alarmo-select>
          </settings-row>

          ${Object.keys(this.areas).length>1?Te`
                <settings-row .narrow=${this.narrow} .large=${!0}>
                  <span slot="heading">
                    ${mn("panels.actions.cards.new_action.fields.area.heading",this.hass.language)}
                  </span>
                  <span slot="description">
                    ${mn("panels.actions.cards.new_action.fields.area.description",this.hass.language)}
                  </span>

                  <alarmo-select
                    .hass=${this.hass}
                    .items=${Qs(this.areas,this.alarmoConfig).map(e=>Ks(e,this.areas,this.alarmoConfig))}
                    clearable=${!0}
                    label=${mn("panels.actions.cards.new_action.fields.area.heading",this.hass.language)}
                    .value=${this.config.triggers[0].area}
                    @value-changed=${this._setArea}
                    ?invalid=${this.errors.area||!this.config.triggers[0].area&&!this.alarmoConfig.master.enabled}
                  ></alarmo-select>
                </settings-row>
              `:""}

          <settings-row .narrow=${this.narrow} .large=${!0} last>
            <span slot="heading">
              ${mn("panels.actions.cards.new_notification.fields.mode.heading",this.hass.language)}
            </span>
            <span slot="description">
              ${mn("panels.actions.cards.new_notification.fields.mode.description",this.hass.language)}
            </span>

            <alarmo-selector
              .hass=${this.hass}
              .items=${Ys(this.config.triggers[0].area,this.areas).map(e=>Gs(e,this.hass))}
              label=${mn("panels.actions.cards.new_action.fields.mode.heading",this.hass.language)}
              .value=${this.config.triggers[0].modes||[]}
              @value-changed=${this._setModes}
              ?invalid=${this.errors.modes}
            ></alarmo-selector>
          </settings-row>
        </div>
      </ha-card>

      <div class="section-header">${mn("panels.actions.cards.new_notification.action",this.hass.language)}</div>
      <ha-card>
        <div class="card-content">
          ${this.viewMode==cr.UI?Te`
                <settings-row .narrow=${this.narrow} .large=${!0} first>
                  <span slot="heading">
                    ${mn("panels.actions.cards.new_notification.fields.target.heading",this.hass.language)}
                  </span>
                  <span slot="description">
                    ${mn("panels.actions.cards.new_notification.fields.target.description",this.hass.language)}
                  </span>

                  <alarmo-select
                    .hass=${this.hass}
                    .items=${Zs(this.hass,...Xs(this.hass))}
                    ?disabled=${!Xs(this.hass).length}
                    label=${mn("panels.actions.cards.new_notification.fields.target.heading",this.hass.language)}
                    icons=${!0}
                    .value=${this.config.actions[0].service}
                    @value-changed=${this._setService}
                    ?invalid=${this.errors.service}
                    allow-custom-value
                  ></alarmo-select>
                </settings-row>

                ${this.config.actions[0].service&&"notify"!=Pn(this.config.actions[0].service)?"":Te`
                      <settings-row .narrow=${this.narrow}>
                        <span slot="heading">
                          ${mn("panels.actions.cards.new_notification.fields.title.heading",this.hass.language)}
                        </span>
                        <span slot="description">
                          ${mn("panels.actions.cards.new_notification.fields.title.description",this.hass.language)}
                        </span>

                        <ha-textfield
                          label="${mn("panels.actions.cards.new_notification.fields.title.heading",this.hass.language)}"
                          .value=${(null===(e=this.config.actions[0].data)||void 0===e?void 0:e.title)||""}
                          @input=${this._setTitle}
                          ?invalid=${this.errors.title}
                        ></ha-textfield>
                      </settings-row>
                    `}
                ${this.config.actions[0].service&&"tts"==Pn(this.config.actions[0].service)?Te`
                      <settings-row .narrow=${this.narrow} .large=${!0} first>
                        <span slot="heading">
                          ${mn("panels.actions.cards.new_action.fields.entity.heading",this.hass.language)}
                        </span>
                        <span slot="description">
                          ${mn("panels.actions.cards.new_action.fields.entity.description",this.hass.language)}
                        </span>

                        <alarmo-select
                          .items=${Ws(ir(this.hass,"media_player","tts"),this.hass)}
                          label=${mn("panels.actions.cards.new_action.fields.entity.heading",this.hass.language)}
                          .value=${(null===(t=this.config.actions[0].data)||void 0===t?void 0:t.entity_id)||""}
                          @value-changed=${this._setEntity}
                          .icons=${!0}
                          ?invalid=${this.errors.entity}
                        ></alarmo-select>
                      </settings-row>
                    `:""}

                <settings-row .narrow=${this.narrow} .large=${!0} last>
                  <span slot="heading">
                    ${mn("panels.actions.cards.new_notification.fields.message.heading",this.hass.language)}
                  </span>
                  <span slot="description">
                    ${mn("panels.actions.cards.new_notification.fields.message.description",this.hass.language)}
                  </span>

                  <ha-textarea
                    id="message"
                    label="${mn("panels.actions.cards.new_notification.fields.message.heading",this.hass.language)}"
                    placeholder=${this._messagePlaceholder()}
                    .value=${(null===(i=this.config.actions[0].data)||void 0===i?void 0:i.message)||""}
                    @input=${e=>this._setMessage(e.target.value)}
                    ?invalid=${this.errors.message}
                  ></ha-textarea>

                  ${this.config.triggers[0].event?Te`
                        <div style="margin-top: 10px">
                          <span style="padding-right: 10px">
                            ${mn("panels.actions.cards.new_notification.fields.message.insert_wildcard",this.hass.language)}:
                          </span>
                          <alarmo-chip-set
                            .items=${((e,t)=>{let i=[];return i=[],e&&![kn.Pending,kn.Triggered,kn.ArmFailure].includes(e)||(i=[...i,{name:"Open Sensors",value:"{{open_sensors}}"}]),e&&![kn.Armed].includes(e)||(i=[...i,{name:"Bypassed Sensors",value:"{{bypassed_sensors}}"}]),(!e||(null==t?void 0:t.code_arm_required)&&[kn.Armed,kn.Arming,kn.ArmFailure].includes(e)||(null==t?void 0:t.code_disarm_required)&&[kn.Disarmed,kn.Untriggered].includes(e))&&(i=[...i,{name:"Changed By",value:"{{changed_by}}"}]),e&&![kn.Armed,kn.Arming,kn.Pending,kn.Triggered,kn.ArmFailure].includes(e)||(i=[...i,{name:"Arm Mode",value:"{{arm_mode}}"}]),e&&![kn.Arming,kn.Pending].includes(e)||(i=[...i,{name:"Delay",value:"{{delay}}"}]),i})(this.config.triggers[0].event,this.alarmoConfig)}
                            @value-changed=${e=>this._insertWildCard(e.detail)}
                          ></alarmo-chip-set>
                        </div>
                      `:""}
                </settings-row>

                ${null!==this._getOpenSensorsFormat()?Te`
                      <settings-row .narrow=${this.narrow} .large=${!0}>
                        <span slot="heading">
                          ${mn("panels.actions.cards.new_notification.fields.open_sensors_format.heading",this.hass.language)}
                        </span>

                        <span slot="description">
                          ${mn("panels.actions.cards.new_notification.fields.open_sensors_format.description",this.hass.language)}
                        </span>

                        <alarmo-select
                          .items=${(e=>{let t=[];return t="en"!=e.language?[...t,{value:"{{open_sensors}}",name:`${mn("panels.actions.cards.new_notification.fields.open_sensors_format.options.default",e.language)} (${e.translationMetadata.translations.en.nativeName})`},{value:`{{open_sensors|lang=${e.language}}}`,name:`${mn("panels.actions.cards.new_notification.fields.open_sensors_format.options.default",e.language)} (${e.translationMetadata.translations[e.language].nativeName})`}]:[...t,{value:"{{open_sensors}}",name:mn("panels.actions.cards.new_notification.fields.open_sensors_format.options.default",e.language)}],t=[...t,{value:"{{open_sensors|format=short}}",name:mn("panels.actions.cards.new_notification.fields.open_sensors_format.options.short",e.language)}],t})(this.hass)}
                          .value=${this._getOpenSensorsFormat(!0)}
                          @value-changed=${this._setOpenSensorsFormat}
                        ></alarmo-select>
                      </settings-row>
                    `:""}
                ${null!==this._getArmModeFormat()&&(ar(this.hass).length>1||1==ar(this.hass).length&&ar(this.hass)[0].value!=this._getArmModeFormat())?Te`
                      <settings-row .narrow=${this.narrow} .large=${!0}>
                        <span slot="heading">
                          ${mn("panels.actions.cards.new_notification.fields.arm_mode_format.heading",this.hass.language)}
                        </span>

                        <span slot="description">
                          ${mn("panels.actions.cards.new_notification.fields.arm_mode_format.description",this.hass.language)}
                        </span>

                        <alarmo-select
                          .items=${ar(this.hass)}
                          .value=${this._getArmModeFormat(!0)}
                          @value-changed=${this._setArmModeFormat}
                        ></alarmo-select>
                      </settings-row>
                    `:""}
              `:Te`
                <h2>${mn("components.editor.edit_in_yaml",this.hass.language)}</h2>

                <ha-yaml-editor
                  .defaultValue=${this.config.actions[0]||""}
                  @value-changed=${this._setYaml}
                ></ha-yaml-editor>

                ${this.errors.service||this.errors.title||this.errors.message||this.errors.entity?Te`
                      <span class="error-message">
                        ${this.hass.localize("ui.errors.config.key_missing","key",Object.entries(this.errors).find(([e,t])=>t&&["service","title","message","entity"].includes(e))[0])}
                      </span>
                    `:""}
              `}
        </div>

        <div class="toggle-button">
          <mwc-button @click=${this._toggleYamlMode}>
            <ha-icon icon="hass:shuffle-variant"></ha-icon>
            ${this.viewMode==cr.Yaml?mn("components.editor.ui_mode",this.hass.language):mn("components.editor.yaml_mode",this.hass.language)}
          </mwc-button>
        </div>

        <div class="card-actions">
          <mwc-button trailingIcon ?disabled=${!this._validAction()} @click=${this._testClick}>
            ${mn("panels.actions.cards.new_notification.actions.test",this.hass.language)}
            <ha-icon icon="hass:arrow-right"></ha-icon>
          </mwc-button>
        </div>
      </ha-card>

      <div class="section-header">${mn("panels.actions.cards.new_notification.options",this.hass.language)}</div>
      <ha-card>
        <div class="card-content">
          <settings-row .narrow=${this.narrow} .large=${!0} first>
            <span slot="heading">
              ${mn("panels.actions.cards.new_notification.fields.name.heading",this.hass.language)}
            </span>
            <span slot="description">
              ${mn("panels.actions.cards.new_notification.fields.name.description",this.hass.language)}
            </span>

            <ha-textfield
              label="${mn("panels.actions.cards.new_notification.fields.name.heading",this.hass.language)}"
              .placeholder=${this._namePlaceholder()}
              .value=${this.config.name||""}
              @input=${this._setName}
              ?invalid=${this.errors.name}
            ></ha-textfield>
          </settings-row>

          ${(null===(a=this.item)||void 0===a?void 0:a.automation_id)?Te`
                <settings-row .narrow=${this.narrow}>
                  <span slot="heading">
                    ${mn("panels.actions.cards.new_notification.fields.delete.heading",this.hass.language)}
                  </span>
                  <span slot="description">
                    ${mn("panels.actions.cards.new_notification.fields.delete.description",this.hass.language)}
                  </span>
                  <div>
                    <mwc-button class="warning" outlined @click=${this._deleteClick}>
                      <ha-icon icon="hass:trash-can-outline"></ha-icon>
                      ${this.hass.localize("ui.common.delete")}
                    </mwc-button>
                  </div>
                </settings-row>
              `:""}
        </div>
      </ha-card>

      <div class="actions">
        <mwc-button raised @click=${this._saveClick} style="width: 100%" class="save-button">
          <ha-icon icon="hass:content-save-outline"></ha-icon>
          ${this.hass.localize("ui.common.save")}
        </mwc-button>
      </div>
    `:Te``}_setEvent(e){e.stopPropagation();const t=e.detail.value;let i=this.config.triggers;Object.assign(i,{0:Object.assign(Object.assign({},i[0]),{event:t})}),this.config=Object.assign(Object.assign({},this.config),{triggers:i}),Object.keys(this.errors).includes("event")&&this._validateConfig()}_setArea(e){var t;e.stopPropagation();const i=e.detail.value;let a=this.config.triggers;Object.assign(a,{0:Object.assign(Object.assign({},a[0]),{area:i})});const n=Ys(i,this.areas);(null===(t=a[0].modes)||void 0===t?void 0:t.length)&&this._setModes(new CustomEvent("value-changed",{detail:{value:a[0].modes.filter(e=>n.includes(e))}})),this.config=Object.assign(Object.assign({},this.config),{triggers:a}),Object.keys(this.errors).includes("area")&&this._validateConfig()}_setModes(e){e.stopPropagation();const t=e.detail.value;let i=this.config.triggers;Object.assign(i,{0:Object.assign(Object.assign({},i[0]),{modes:t})}),this.config=Object.assign(Object.assign({},this.config),{triggers:i}),Object.keys(this.errors).includes("modes")&&this._validateConfig()}_setService(e){e.stopPropagation();const t=String(e.detail.value);let i=this.config.actions;Object.assign(i,{0:Object.assign(Object.assign(Object.assign({},i[0]),{service:t}),xn(i[0],"service"))}),(i[0].data||{}).entity_id&&"notify"==Pn(t)&&Object.assign(i,{0:Object.assign(Object.assign({},i[0]),{data:xn(i[0].data||{},"entity_id")})}),this.config=Object.assign(Object.assign({},this.config),{actions:i}),Object.keys(this.errors).includes("service")&&this._validateConfig()}_setTitle(e){e.stopPropagation();const t=e.target.value;let i=this.config.actions;Object.assign(i,{0:Object.assign(Object.assign({},i[0]),{service:i[0].service||"",data:Object.assign(Object.assign({},i[0].data||{}),{title:t})})}),this.config=Object.assign(Object.assign({},this.config),{actions:i}),Object.keys(this.errors).includes("title")&&this._validateConfig()}_setEntity(e){e.stopPropagation();const t=e.target.value;let i=this.config.actions;Object.assign(i,{0:Object.assign(Object.assign({},i[0]),{service:i[0].service||"",data:Object.assign(Object.assign({},i[0].data||{}),{entity_id:t})})}),this.config=Object.assign(Object.assign({},this.config),{actions:i}),Object.keys(this.errors).includes("entity")&&this._validateConfig()}_setMessage(e){let t=this.config.actions;Object.assign(t,{0:Object.assign(Object.assign({},t[0]),{service:t[0].service||"",data:Object.assign(Object.assign({},t[0].data||{}),{message:e})})}),this.config=Object.assign(Object.assign({},this.config),{actions:t}),Object.keys(this.errors).includes("message")&&this._validateConfig()}_setName(e){e.stopPropagation();const t=e.target.value;this.config=Object.assign(Object.assign({},this.config),{name:t})}_setYaml(e){const t=e.detail.value;let i={};dr(null==t?void 0:t.service)&&(i=Object.assign(Object.assign({},i),{service:String(t.service)})),or(null==t?void 0:t.data)&&(i=Object.assign(Object.assign({},i),{data:t.data})),Object.keys(i).length&&(this.config=Object.assign(Object.assign({},this.config),{actions:Object.assign(this.config.actions,{0:Object.assign(Object.assign({},this.config.actions[0]),i)})})),Object.keys(this.errors).some(e=>["service","message","title"].includes(e))&&this._validateConfig()}_validateConfig(){var e;this.errors={};const t=this._parseAutomation(),i=t.triggers[0];i.event&&Object.values(kn).includes(i.event)||(this.errors=Object.assign(Object.assign({},this.errors),{event:!0})),Sn(i.area)&&Qs(this.areas,this.alarmoConfig).includes(i.area)||(this.errors=Object.assign(Object.assign({},this.errors),{area:!0})),(i.modes||[]).every(e=>Ys(i.area,this.areas).includes(e))||(this.errors=Object.assign(Object.assign({},this.errors),{modes:!0}));const a=t.actions[0];return!a.service||!Xs(this.hass).includes(a.service)&&"script"!=Pn(a.service)?this.errors=Object.assign(Object.assign({},this.errors),{service:!0}):!a.service||"tts"!=Pn(a.service)||Object.keys(a.data||{}).includes("entity_id")&&ir(this.hass,"media_player","tts").includes(a.data.entity_id)||(this.errors=Object.assign(Object.assign({},this.errors),{entity:!0})),nr(null===(e=a.data)||void 0===e?void 0:e.message)||(this.errors=Object.assign(Object.assign({},this.errors),{message:!0})),nr(t.name)||(this.errors=Object.assign(Object.assign({},this.errors),{name:!0})),!Object.values(this.errors).length}_validAction(){var e;const t=this._parseAutomation().actions[0];return t.service&&("script"==Pn(t.service)||Xs(this.hass).includes(t.service))&&nr(null===(e=t.data)||void 0===e?void 0:e.message)}_insertWildCard(e){var t;const i=this.shadowRoot.querySelector("#message");i&&i.focus();let a=(null===(t=this.config.actions[0].data)||void 0===t?void 0:t.message)||"";a=i&&null!==i.selectionStart&&null!==i.selectionEnd?a.substring(0,i.selectionStart)+e+a.substring(i.selectionEnd,a.length):a+e,this._setMessage(a)}_toggleYamlMode(){if(this.viewMode=this.viewMode==cr.UI?cr.Yaml:cr.UI,this.viewMode==cr.Yaml){let e=Object.assign({},this.config.actions[0]),t="object"==typeof e.data&&Sn(e.data)?e.data:{};e=Object.assign(Object.assign({},e),{service:e.service||""}),t.message||(t=Object.assign(Object.assign({},t),{message:""})),Xs(this.hass).includes(e.service)&&("notify"!=Pn(e.service)||t.title||(t=Object.assign(Object.assign({},t),{title:""})),"tts"!=Pn(e.service)||t.entity_id||(t=Object.assign(Object.assign({},t),{entity_id:""}))),e=Object.assign(Object.assign({},e),{data:t}),this.config=Object.assign(Object.assign({},this.config),{actions:Object.assign(this.config.actions,{0:e})})}}_namePlaceholder(){const e=this.config.triggers[0].event,t=this.config.actions[0].service?Pn(this.config.actions[0].service):null;if(!e)return"";if("notify"==t){const t=Zs(this.hass,this.config.actions[0].service);return t.length?mn("panels.actions.cards.new_notification.fields.name.placeholders."+e,this.hass.language,"{target}",t[0].name):""}if("tts"==t){const t="object"==typeof this.config.actions[0].data&&Sn(this.config.actions[0].data)?this.config.actions[0].data.entity_id:null;if(!t||!this.hass.states[t])return"";const i=$n(this.hass.states[t]);return mn("panels.actions.cards.new_notification.fields.name.placeholders."+e,this.hass.language,"{target}",i)}return""}_messagePlaceholder(){const e=this.config.triggers[0].event;return e?mn("panels.actions.cards.new_notification.fields.message.placeholders."+e,this.hass.language):""}_parseAutomation(){var e;let t=Object.assign({},this.config),i=t.actions[0];return!nr(null===(e=i.data)||void 0===e?void 0:e.message)&&this.viewMode==cr.UI&&this._messagePlaceholder()&&(i=Object.assign(Object.assign({},i),{data:Object.assign(Object.assign({},i.data),{message:this._messagePlaceholder()})}),Object.assign(t,{actions:Object.assign(t.actions,{0:i})})),!nr(t.name)&&this._namePlaceholder()&&(t=Object.assign(Object.assign({},t),{name:this._namePlaceholder()})),t}_getOpenSensorsFormat(e=!1){var t;const i=((null===(t=this.config.actions[0].data)||void 0===t?void 0:t.message)||"").match(/{{open_sensors(\|[^}]+)?}}/);return null!==i?i[0]:e?"{{open_sensors}}":null}_setOpenSensorsFormat(e){var t;e.stopPropagation();const i=String(e.detail.value);let a=(null===(t=this.config.actions[0].data)||void 0===t?void 0:t.message)||"";a=a.replace(/{{open_sensors(\|[^}]+)?}}/,i);let n=this.config.actions;Object.assign(n,{0:Object.assign(Object.assign({},n[0]),{service:n[0].service||"",data:Object.assign(Object.assign({},n[0].data||{}),{message:a})})}),this.config=Object.assign(Object.assign({},this.config),{actions:n})}_getArmModeFormat(e=!1){var t;const i=((null===(t=this.config.actions[0].data)||void 0===t?void 0:t.message)||"").match(/{{arm_mode(\|[^}]+)?}}/);return null!==i?i[0]:e?"{{arm_mode}}":null}_setArmModeFormat(e){var t;e.stopPropagation();const i=String(e.detail.value);let a=(null===(t=this.config.actions[0].data)||void 0===t?void 0:t.message)||"";a=a.replace(/{{arm_mode(\|[^}]+)?}}/,i);let n=this.config.actions;Object.assign(n,{0:Object.assign(Object.assign({},n[0]),{service:n[0].service||"",data:Object.assign(Object.assign({},n[0].data||{}),{message:a})})}),this.config=Object.assign(Object.assign({},this.config),{actions:n})}_saveClick(e){if(!this._validateConfig())return;let t=this._parseAutomation();Ys(t.triggers[0].area,this.areas).every(e=>{var i;return null===(i=t.triggers[0].modes)||void 0===i?void 0:i.includes(e)})&&(t=Object.assign(Object.assign({},t),{triggers:Object.assign(t.triggers,{0:Object.assign(Object.assign({},t.triggers[0]),{modes:[]})})})),this.item&&(t=Object.assign(Object.assign({},t),{automation_id:this.item.automation_id})),lt(this.hass,t).catch(t=>Cn(t,e)).then(()=>this._cancelClick())}_deleteClick(e){var t;(null===(t=this.item)||void 0===t?void 0:t.automation_id)&&ct(this.hass,this.item.automation_id).catch(t=>Cn(t,e)).then(()=>this._cancelClick())}_testClick(e){const t=this._parseAutomation().actions[0],[i,a]=t.service.split(".");let n=t.data.message;n=n.replace("{{open_sensors|format=short}}","Some Example Sensor"),n=n.replace(/{{open_sensors(\|[^}]+)?}}/,"Some Example Sensor is open"),n=n.replace("{{bypassed_sensors}}","Some Bypassed Sensor"),n=n.replace(/{{arm_mode(\|[^}]+)?}}/,"Armed away"),n=n.replace("{{changed_by}}","Some Example User"),n=n.replace("{{delay}}","30"),this.hass.callService(i,a,Object.assign(Object.assign({},t.data),{message:n})).then().catch(t=>{On(e,t.message)})}_cancelClick(){Ln(0,Rn("actions"),!0)}static get styles(){return h`
      div.content {
        padding: 28px 20px 0;
        max-width: 1040px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
      }
      div.header {
        font-size: 24px;
        font-weight: 400;
        letter-spacing: -0.012em;
        line-height: 32px;
        opacity: var(--dark-primary-opacity);
      }
      div.section-header {
        font-size: 18px;
        font-weight: 400;
        letter-spacing: -0.012em;
        line-height: 32px;
        opacity: var(--dark-primary-opacity);
        margin: 20px 0px 5px 10px;
      }
      div.actions {
        padding: 20px 0px 30px 0px;
      }
      mwc-button ha-icon {
        margin-right: 6px;
        --mdc-icon-size: 20px;
      }
      .toggle-button {
        position: absolute;
        right: 20px;
        top: 20px;
      }
      h2 {
        margin-top: 10px;
        font-size: 24px;
        font-weight: 400;
        letter-spacing: -0.012em;
      }
      span.error-message {
        color: var(--error-color);
      }
      mwc-button.warning {
        --mdc-theme-primary: var(--error-color);
      }
      mwc-button.save-button {
        --mdc-theme-primary: rgba(var(--rgb-primary-color), 0.8);
      }
      div.heading {
        display: grid;
        grid-template-areas:
          'header icon'
          'description icon';
        grid-template-rows: 1fr 1fr;
        grid-template-columns: 1fr 48px;
        margin: 20px 0px 10px 10px;
      }
      div.heading .icon {
        grid-area: icon;
      }
      div.heading .header {
        grid-area: header;
      }
      div.heading .description {
        grid-area: description;
      }
      ha-textarea[invalid] {
        --mdc-text-field-idle-line-color: var(--mdc-theme-error);
        --mdc-text-field-label-ink-color: var(--mdc-theme-error);
      }
    `}};var mr;n([Qe({attribute:!1})],hr.prototype,"hass",void 0),n([Qe()],hr.prototype,"narrow",void 0),n([Qe()],hr.prototype,"config",void 0),n([Qe()],hr.prototype,"item",void 0),n([Qe()],hr.prototype,"areas",void 0),n([Qe()],hr.prototype,"alarmoConfig",void 0),n([Qe()],hr.prototype,"viewMode",void 0),n([Qe()],hr.prototype,"errors",void 0),hr=n([Ke("notification-editor-card")],hr),function(e){e[e.Yaml=0]="Yaml",e[e.UI=1]="UI"}(mr||(mr={}));let ur=class extends Ge{constructor(){super(...arguments),this.config={type:bn.Action,triggers:[{}],actions:[{}]},this.viewMode=mr.UI,this.errors={}}async firstUpdated(){if(await et(),this.areas=await ht(this.hass),this.alarmoConfig=await tt(this.hass),this.item){let e=this.item.actions.map(e=>e.entity_id?e:xn(e,"entity_id"));this.config=Object.assign(Object.assign({},this.item),{actions:[e[0],...e.slice(1)]}),this.config.triggers.length>1&&(this.config=Object.assign(Object.assign({},this.config),{triggers:[this.config.triggers[0]]}));let t=this.config.triggers[0].area;Sn(t)&&!Qs(this.areas,this.alarmoConfig).includes(t)?t=void 0:null===t&&(t=0),this._setArea(new CustomEvent("value-changed",{detail:{value:t}})),this._hasCustomEntities()&&(this.viewMode=mr.Yaml)}if(!Sn(this.config.triggers[0].area)){const e=Qs(this.areas,this.alarmoConfig);1==e.length?this._setArea(new CustomEvent("value-changed",{detail:{value:e[0]}})):e.includes(0)&&this._setArea(new CustomEvent("value-changed",{detail:{value:0}}))}!this.item||this.config.triggers[0].area||this.alarmoConfig.master.enabled||(this.errors=Object.assign(Object.assign({},this.errors),{area:!0}))}render(){var e;return this.hass&&this.areas&&this.alarmoConfig?Te`
      <div class="heading">
        <ha-icon-button .path=${Zn} @click=${this._cancelClick} class="icon"></ha-icon-button>
        <div class="header">${mn("panels.actions.cards.new_action.title",this.hass.language)}</div>
        <div class="description">${mn("panels.actions.cards.new_action.description",this.hass.language)}</div>
      </div>
      <div class="section-header">${mn("panels.actions.cards.new_notification.trigger",this.hass.language)}</div>
      <ha-card>
        <div class="card-content">
          <settings-row .narrow=${this.narrow} .large=${!0} first>
            <span slot="heading">
              ${mn("panels.actions.cards.new_action.fields.event.heading",this.hass.language)}
            </span>
            <span slot="description">
              ${mn("panels.actions.cards.new_action.fields.event.description",this.hass.language)}
            </span>

            <alarmo-select
              .hass=${this.hass}
              .items=${Object.values(kn).map(e=>Fs(e,this.hass))}
              label=${mn("panels.actions.cards.new_action.fields.event.heading",this.hass.language)}
              icons=${!0}
              .value=${this.config.triggers[0].event}
              @value-changed=${this._setEvent}
              ?invalid=${this.errors.event}
            ></alarmo-select>
          </settings-row>

          ${Object.keys(this.areas).length>1?Te`
                <settings-row .narrow=${this.narrow} .large=${!0}>
                  <span slot="heading">
                    ${mn("panels.actions.cards.new_action.fields.area.heading",this.hass.language)}
                  </span>
                  <span slot="description">
                    ${mn("panels.actions.cards.new_action.fields.area.description",this.hass.language)}
                  </span>

                  <alarmo-select
                    .hass=${this.hass}
                    .items=${Qs(this.areas,this.alarmoConfig).map(e=>Ks(e,this.areas,this.alarmoConfig))}
                    clearable=${!0}
                    label=${mn("panels.actions.cards.new_action.fields.area.heading",this.hass.language)}
                    .value=${this.config.triggers[0].area}
                    @value-changed=${this._setArea}
                    ?invalid=${this.errors.area}
                  ></alarmo-select>
                </settings-row>
              `:""}

          <settings-row .narrow=${this.narrow} .large=${!0} last>
            <span slot="heading">
              ${mn("panels.actions.cards.new_notification.fields.mode.heading",this.hass.language)}
            </span>
            <span slot="description">
              ${mn("panels.actions.cards.new_notification.fields.mode.description",this.hass.language)}
            </span>

            <alarmo-selector
              .hass=${this.hass}
              .items=${Ys(this.config.triggers[0].area,this.areas).map(e=>Gs(e,this.hass))}
              label=${mn("panels.actions.cards.new_action.fields.mode.heading",this.hass.language)}
              .value=${this.config.triggers[0].modes||[]}
              @value-changed=${this._setModes}
              ?invalid=${this.errors.modes}
            ></alarmo-selector>
          </settings-row>
        </div>
      </ha-card>

      <div class="section-header">${mn("panels.actions.cards.new_notification.action",this.hass.language)}</div>
      <ha-card>
        <div class="card-content">
          ${this.viewMode==mr.UI?Te`
                <settings-row .narrow=${this.narrow} .large=${!0} first>
                  <span slot="heading">
                    ${mn("panels.actions.cards.new_action.fields.entity.heading",this.hass.language)}
                  </span>
                  <span slot="description">
                    ${mn("panels.actions.cards.new_action.fields.entity.description",this.hass.language)}
                  </span>

                  <alarmo-selector
                    .hass=${this.hass}
                    .items=${Ws(tr(this.hass,this._getEntities()),this.hass)}
                    ?disabled=${!tr(this.hass,this._getEntities()).length}
                    label=${mn("panels.actions.cards.new_action.fields.entity.heading",this.hass.language)}
                    .value=${this._getEntities()}
                    @value-changed=${this._setEntity}
                    ?invalid=${this.errors.entity_id}
                  ></alarmo-selector>
                </settings-row>

                ${this._getEntities().length?Te`
                      <settings-row .narrow=${this.narrow} .large=${!0}>
                        <span slot="heading">
                          ${mn("panels.actions.cards.new_action.fields.action.heading",this.hass.language)}
                        </span>
                        <span slot="description">
                          ${mn("panels.actions.cards.new_action.fields.action.description",this.hass.language)}
                        </span>

                        <div>
                          ${this.renderActions()||mn("panels.actions.cards.new_action.fields.action.no_common_actions",this.hass.language)}
                        </div>
                        ${this.errors.service?Te`
                              <span class="error-message">
                                ${this.hass.localize("ui.common.error_required",this.hass.language)}
                              </span>
                            `:""}
                      </settings-row>
                    `:""}
              `:Te`
                <h2>${mn("components.editor.edit_in_yaml",this.hass.language)}</h2>

                <ha-yaml-editor
                  .defaultValue=${this.config.actions||""}
                  @value-changed=${this._setYaml}
                ></ha-yaml-editor>

                ${this.errors.service||this.errors.entity_id?Te`
                      <span class="error-message">
                        ${this.hass.localize("ui.errors.config.key_missing","key",Object.entries(this.errors).find(([e,t])=>t&&["service","entity_id"].includes(e))[0])}
                      </span>
                    `:""}
              `}
        </div>

        <div class="toggle-button">
          <mwc-button @click=${this._toggleYamlMode}>
            <ha-icon icon="hass:shuffle-variant"></ha-icon>
            ${this.viewMode==mr.Yaml?mn("components.editor.ui_mode",this.hass.language):mn("components.editor.yaml_mode",this.hass.language)}
          </mwc-button>
        </div>

        <div class="card-actions">
          <mwc-button trailingIcon ?disabled=${!this._validAction()} @click=${this._testClick}>
            ${mn("panels.actions.cards.new_notification.actions.test",this.hass.language)}
            <ha-icon icon="hass:arrow-right"></ha-icon>
          </mwc-button>
        </div>
      </ha-card>

      <div class="section-header">${mn("panels.actions.cards.new_notification.options",this.hass.language)}</div>
      <ha-card>
        <div class="card-content">
          <settings-row .narrow=${this.narrow} .large=${!0} first>
            <span slot="heading">
              ${mn("panels.actions.cards.new_action.fields.name.heading",this.hass.language)}
            </span>
            <span slot="description">
              ${mn("panels.actions.cards.new_action.fields.name.description",this.hass.language)}
            </span>

            <ha-textfield
              label="${mn("panels.actions.cards.new_action.fields.name.heading",this.hass.language)}"
              .placeholder=${this._namePlaceholder()}
              .value=${this.config.name||""}
              @input=${this._setName}
              ?invalid=${this.errors.name}
            ></ha-textfield>
          </settings-row>

          ${(null===(e=this.item)||void 0===e?void 0:e.automation_id)?Te`
                <settings-row .narrow=${this.narrow}>
                  <span slot="heading">
                    ${mn("panels.actions.cards.new_notification.fields.delete.heading",this.hass.language)}
                  </span>
                  <span slot="description">
                    ${mn("panels.actions.cards.new_notification.fields.delete.description",this.hass.language)}
                  </span>
                  <div>
                    <mwc-button class="warning" outlined @click=${this._deleteClick}>
                      <ha-icon icon="hass:trash-can-outline"></ha-icon>
                      ${this.hass.localize("ui.common.delete")}
                    </mwc-button>
                  </div>
                </settings-row>
              `:""}
        </div>
      </ha-card>

      <div class="actions">
        <mwc-button raised @click=${this._saveClick} style="width: 100%" class="save-button">
          <ha-icon icon="hass:content-save-outline"></ha-icon>
          ${this.hass.localize("ui.common.save")}
        </mwc-button>
      </div>
    `:Te``}renderActions(){let e=this.config.actions.map(e=>e.entity_id),t=er(e,this.hass);if(!t.length)return;return t.map(e=>Te`
        <mwc-button
          class="${((...e)=>!!e.every(Sn)&&1==Tn(Js(e.filter(Sn))).length)(this._selectedAction(),e)?"active":""}"
          @click=${()=>this._setAction(e)}
        >
          ${((e,t)=>{let i=Hn(e);switch("script"==Pn(e)&&(i="run"),i){case"turn_on":return t.localize("ui.card.media_player.turn_on");case"turn_off":return t.localize("ui.card.media_player.turn_off");case"lock":return t.localize("ui.card.lock.lock");case"unlock":return t.localize("ui.card.lock.unlock");case"run":return t.localize("ui.card.script.run");default:return i}})(e,this.hass)}
        </mwc-button>
      `)}_selectedAction(){let e=this.config.actions.map(e=>e.service);return e.every(Sn)?(e=Tn(Js(e.filter(Sn))),1==e.length?e[0]:null):null}_setEvent(e){e.stopPropagation();const t=e.detail.value;let i=this.config.triggers;Object.assign(i,{0:Object.assign(Object.assign({},i[0]),{event:t})}),this.config=Object.assign(Object.assign({},this.config),{triggers:i}),Object.keys(this.errors).includes("event")&&this._validateConfig()}_setArea(e){var t;e.stopPropagation();const i=e.detail.value;let a=this.config.triggers;Object.assign(a,{0:Object.assign(Object.assign({},a[0]),{area:i})});const n=Ys(i,this.areas);(null===(t=a[0].modes)||void 0===t?void 0:t.length)&&this._setModes(new CustomEvent("value-changed",{detail:{value:a[0].modes.filter(e=>n.includes(e))}})),this.config=Object.assign(Object.assign({},this.config),{triggers:a}),Object.keys(this.errors).includes("area")&&this._validateConfig()}_setModes(e){e.stopPropagation();const t=e.detail.value,i=this.config.triggers;Object.assign(i,{0:Object.assign(Object.assign({},i[0]),{modes:t})}),this.config=Object.assign(Object.assign({},this.config),{triggers:i}),Object.keys(this.errors).includes("service")&&this._validateConfig()}_setEntity(e){e.stopPropagation();const t=e.detail.value;let i=this.config.actions,a=null;if(t.length>i.length&&this._selectedAction()&&(a=this._selectedAction()),i.length>t.length){let e=i.findIndex(e=>!t.includes(e.entity_id||""));e<0&&(e=i.length-1),i.splice(e,1)}t.length||Object.assign(i,{0:xn(i[0],"entity_id")}),t.forEach((e,t)=>{let a=i.length>t?Object.assign({},i[t]):{};a=a.entity_id==e?Object.assign({},a):{entity_id:e},Object.assign(i,{[t]:a})}),this.config=Object.assign(Object.assign({},this.config),{actions:i}),a&&this._setAction(a),Object.keys(this.errors).includes("entity_id")&&this._validateConfig()}_setAction(e){let t=this.config.actions,i=this.config.actions.map(e=>e.entity_id);er(i,this.hass).length&&(t.forEach((i,a)=>{let n=er(i.entity_id,this.hass),s=(r=e,n.find(e=>e==r||"turn_on"==Hn(r)&&"turn_on"==Hn(e)||"turn_off"==Hn(r)&&"turn_off"==Hn(e)||"script"==Pn(r)&&"script"==Pn(e)));var r;Object.assign(t,{[a]:Object.assign({service:s},xn(i,"service"))})}),this.config=Object.assign(Object.assign({},this.config),{actions:t}),Object.keys(this.errors).includes("service")&&this._validateConfig())}_setName(e){e.stopPropagation();const t=e.target.value;this.config=Object.assign(Object.assign({},this.config),{name:t})}_setYaml(e){let t=e.detail.value,i=[{}];var a;or(t)&&(t=[t]),"object"==typeof(a=t)&&null!==a&&Array.isArray(a)&&(t.forEach((e,t)=>{let a={};or(e)&&dr(e.service)&&(a=Object.assign(Object.assign({},a),{service:e.service})),or(e)&&dr(e.entity_id)&&(a=Object.assign(Object.assign({},a),{entity_id:e.entity_id})),or(e)&&or(e.data)&&(a=Object.assign(Object.assign({},a),{data:e.data})),Object.assign(i,{[t]:a})}),this.config=Object.assign(Object.assign({},this.config),{actions:i}))}_validateConfig(){this.errors={};const e=this._parseAutomation(),t=e.triggers[0];t.event&&Object.values(kn).includes(t.event)||(this.errors=Object.assign(Object.assign({},this.errors),{event:!0})),Sn(t.area)&&Qs(this.areas,this.alarmoConfig).includes(t.area)||(this.errors=Object.assign(Object.assign({},this.errors),{area:!0})),(t.modes||[]).every(e=>Ys(t.area,this.areas).includes(e))||(this.errors=Object.assign(Object.assign({},this.errors),{modes:!0}));let i=e.actions.map(e=>e.entity_id);this.viewMode==mr.Yaml&&(i=i.filter(Sn)),e.actions.length&&i.every(e=>rr(e,this.hass))||(this.errors=Object.assign(Object.assign({},this.errors),{entity_id:!0}));const a=e.actions.map(e=>e.service).filter(Sn);if(!a.length||!a.every(e=>sr(e,this.hass))){this.errors=Object.assign(Object.assign({},this.errors),{service:!0}),!er(i,this.hass).length&&a.length&&(this.viewMode=mr.Yaml)}return nr(e.name)||(this.errors=Object.assign(Object.assign({},this.errors),{name:!0})),!Object.values(this.errors).length}_validAction(){const e=this._parseAutomation(),t=e.actions.map(e=>e.service);let i=e.actions.map(e=>e.entity_id);return this.viewMode==mr.Yaml&&(i=i.filter(Sn)),t.length&&t.every(e=>sr(e,this.hass))&&i.every(e=>rr(e,this.hass))}_toggleYamlMode(){this.viewMode=this.viewMode==mr.UI?mr.Yaml:mr.UI,this.viewMode==mr.Yaml&&(this.config=Object.assign(Object.assign({},this.config),{actions:Object.assign(this.config.actions,{0:Object.assign(Object.assign({},this.config.actions[0]),{service:this.config.actions[0].service||"",data:Object.assign({},this.config.actions[0].data||{})})})}))}_namePlaceholder(){var e,t,i,a;if(!this._validAction)return"";const n=this.config.triggers[0].event,s=this.config.actions.map(e=>e.entity_id).filter(Sn),r=Ws(s,this.hass).map(e=>e.name).join(", "),o=Tn(this.config.actions.map(e=>e.service).filter(Sn).map(e=>Hn(e)));let d=void 0;return 1==o.length&&(null===(e=o[0])||void 0===e?void 0:e.includes("turn_on"))&&(d=this.hass.localize("state.default.on")),1==o.length&&(null===(t=o[0])||void 0===t?void 0:t.includes("turn_off"))&&(d=this.hass.localize("state.default.off")),1==o.length&&(null===(i=o[0])||void 0===i?void 0:i.includes("lock"))&&(d=this.hass.localize("component.lock.state._.locked")),1==o.length&&(null===(a=o[0])||void 0===a?void 0:a.includes("unlock"))&&(d=this.hass.localize("component.lock.state._.unlocked")),n&&r&&d?mn("panels.actions.cards.new_action.fields.name.placeholders."+n,this.hass.language,"entity",r,"state",d):""}_getEntities(){return Tn(this.config.actions.map(e=>e.entity_id).filter(Sn))||[]}_hasCustomEntities(){return this._getEntities().some(e=>!tr(this.hass).includes(e))}_parseAutomation(){let e=Object.assign({},this.config);return!nr(e.name)&&this._namePlaceholder()&&(e=Object.assign(Object.assign({},e),{name:this._namePlaceholder()})),e}_saveClick(e){if(!this._validateConfig())return;let t=this._parseAutomation();Ys(t.triggers[0].area,this.areas).every(e=>{var i;return null===(i=t.triggers[0].modes)||void 0===i?void 0:i.includes(e)})&&(t=Object.assign(Object.assign({},t),{triggers:Object.assign(t.triggers,{0:Object.assign(Object.assign({},t.triggers[0]),{modes:[]})})})),lt(this.hass,t).catch(t=>Cn(t,e)).then(()=>this._cancelClick())}_deleteClick(e){var t;(null===(t=this.item)||void 0===t?void 0:t.automation_id)&&ct(this.hass,this.item.automation_id).catch(t=>Cn(t,e)).then(()=>this._cancelClick())}_testClick(e){this._parseAutomation().actions.forEach(t=>{const[i,a]=t.service.split(".");let n=Object.assign({},t.data);t.entity_id&&(n=Object.assign(Object.assign({},n),{entity_id:t.entity_id})),this.hass.callService(i,a,n).then().catch(t=>{On(e,t.message)})})}_cancelClick(){Ln(0,Rn("actions"),!0)}static get styles(){return h`
      div.content {
        padding: 28px 20px 0;
        max-width: 1040px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
      }
      div.header {
        font-size: 24px;
        font-weight: 400;
        letter-spacing: -0.012em;
        line-height: 32px;
        opacity: var(--dark-primary-opacity);
      }
      div.section-header {
        font-size: 18px;
        font-weight: 400;
        letter-spacing: -0.012em;
        line-height: 32px;
        opacity: var(--dark-primary-opacity);
        margin: 20px 0px 5px 10px;
      }
      div.actions {
        padding: 20px 0px 30px 0px;
      }
      mwc-button ha-icon {
        margin-right: 6px;
        --mdc-icon-size: 20px;
      }
      .toggle-button {
        position: absolute;
        right: 20px;
        top: 20px;
      }
      h2 {
        margin-top: 10px;
        font-size: 24px;
        font-weight: 400;
        letter-spacing: -0.012em;
      }
      span.error-message {
        color: var(--error-color);
        font-size: 0.875rem;
        display: flex;
        margin-top: 10px;
      }
      mwc-button.warning {
        --mdc-theme-primary: var(--error-color);
      }
      mwc-button.save-button {
        --mdc-theme-primary: rgba(var(--rgb-primary-color), 0.8);
      }
      mwc-button.active {
        background: var(--primary-color);
        --mdc-theme-primary: var(--text-primary-color);
        border-radius: 4px;
      }
      mwc-button[disabled].active {
        background: var(--disabled-text-color);
        --mdc-button-disabled-ink-color: var(--text-primary-color);
      }
      div.heading {
        display: grid;
        grid-template-areas:
          'header icon'
          'description icon';
        grid-template-rows: 1fr 1fr;
        grid-template-columns: 1fr 48px;
        margin: 20px 0px 10px 10px;
      }
      div.heading .icon {
        grid-area: icon;
      }
      div.heading .header {
        grid-area: header;
      }
      div.heading .description {
        grid-area: description;
      }
    `}};n([Qe({attribute:!1})],ur.prototype,"hass",void 0),n([Qe()],ur.prototype,"narrow",void 0),n([Qe()],ur.prototype,"config",void 0),n([Qe()],ur.prototype,"item",void 0),n([Qe()],ur.prototype,"areas",void 0),n([Qe()],ur.prototype,"alarmoConfig",void 0),n([Qe()],ur.prototype,"viewMode",void 0),n([Qe()],ur.prototype,"errors",void 0),ur=n([Ke("automation-editor-card")],ur);let pr=class extends(ut(Ge)){constructor(){super(...arguments),this.areas={},this.getAreaForAutomation=e=>{if(!this.config)return;const t=Qs(this.areas,this.config);let i=e.triggers[0].area;return Sn(i)&&t.includes(i)?i:void 0}}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeMessage(()=>this._fetchData(),{type:"alarmo_config_updated"})]}async _fetchData(){if(!this.hass)return;const e=await nt(this.hass);this.automations=Object.values(e),this.areas=await ht(this.hass),this.config=await tt(this.hass)}firstUpdated(){var e;this.path.filter&&(this.selectedArea=null===(e=this.path.filter)||void 0===e?void 0:e.area),(async()=>{await Je()})()}render(){if(!this.hass||!this.automations||!this.config)return Te``;if("new_notification"==this.path.subpage)return Te`
        <notification-editor-card .hass=${this.hass} .narrow=${this.narrow}></notification-editor-card>
      `;if(this.path.params.edit_notification){const e=this.automations.find(e=>e.automation_id==this.path.params.edit_notification&&e.type==bn.Notification);return Te`
        <notification-editor-card .hass=${this.hass} .narrow=${this.narrow} .item=${e}></notification-editor-card>
      `}if("new_action"==this.path.subpage)return Te`
        <automation-editor-card .hass=${this.hass} .narrow=${this.narrow}></automation-editor-card>
      `;if(this.path.params.edit_action){const e=this.automations.find(e=>e.automation_id==this.path.params.edit_action&&e.type==bn.Action);return Te`
        <automation-editor-card .hass=${this.hass} .narrow=${this.narrow} .item=${e}></automation-editor-card>
      `}{const e=()=>Te`
        <paper-tooltip animation-delay="0">
          ${mn("panels.actions.cards.notifications.table.no_area_warning",this.hass.language)}
        </paper-tooltip>
      `,t={type:{width:"40px",renderer:t=>"no_area"!=t.area||this.config.master.enabled?t.type==bn.Notification?Te`
                  <ha-icon icon="hass:message-text-outline"  class="${t.enabled?"":"disabled"}"></ha-icon>
                `:Te`
                  <ha-icon icon="hass:flash"  class="${t.enabled?"":"disabled"}"></ha-icon>
                `:Te`
                  ${e()}
                  <ha-icon icon="mdi:alert" style="color: var(--error-color)"></ha-icon>
                `},name:{title:this.hass.localize("ui.components.area-picker.add_dialog.name"),renderer:t=>Te`
            ${"no_area"!=t.area||this.config.master.enabled?"":e()}
            <span class="${t.enabled?"":"disabled"}">${t.name}</span>
          `,width:"40%",grow:!0,text:!0},enabled:{title:mn("common.enabled",this.hass.language),width:"68px",align:"center",renderer:e=>Te`
            <ha-switch
              ?checked=${e.enabled}
              @click=${t=>{t.stopPropagation(),this.toggleEnable(t,e.automation_id)}}
            ></ha-switch>
          `}},i=this.automations.filter(e=>e.type==bn.Notification).map(e=>Object(Object.assign(Object.assign({},e),{id:e.automation_id,warning:!this.config.master.enabled&&!this.getAreaForAutomation(e),area:this.getAreaForAutomation(e)||"no_area"}))),a=this.automations.filter(e=>e.type==bn.Action).map(e=>Object(Object.assign(Object.assign({},e),{id:e.automation_id,warning:!this.config.master.enabled&&!this.getAreaForAutomation(e),area:this.getAreaForAutomation(e)||"no_area"})));return Te`
        <ha-card header="${mn("panels.actions.cards.notifications.title",this.hass.language)}">
          <div class="card-content">
            ${mn("panels.actions.cards.notifications.description",this.hass.language)}
          </div>

          <alarmo-table
            .hass=${this.hass}
            ?selectable=${!0}
            .columns=${t}
            .data=${i}
            .filters=${this.getTableFilterOptions()}
            @row-click=${e=>Ln(0,Rn("actions",{params:{edit_notification:e.detail.id}}),!0)}
          >
            ${mn("panels.actions.cards.notifications.table.no_items",this.hass.language)}
          </alarmo-table>

          <div class="card-actions">
            <mwc-button @click=${this.addNotificationClick}>
              ${mn("panels.actions.cards.notifications.actions.new_notification",this.hass.language)}
            </mwc-button>
          </div>
        </ha-card>

        <ha-card header="${mn("panels.actions.title",this.hass.language)}">
          <div class="card-content">${mn("panels.actions.cards.actions.description",this.hass.language)}</div>

          <alarmo-table
            .hass=${this.hass}
            ?selectable=${!0}
            .columns=${t}
            .data=${a}
            .filters=${this.getTableFilterOptions()}
            @row-click=${e=>Ln(0,Rn("actions",{params:{edit_action:e.detail.id}}),!0)}
          >
            ${mn("panels.actions.cards.actions.table.no_items",this.hass.language)}
          </alarmo-table>

          <div class="card-actions">
            <mwc-button @click=${this.addActionClick}>
              ${mn("panels.actions.cards.actions.actions.new_action",this.hass.language)}
            </mwc-button>
          </div>
        </ha-card>
      `}}toggleEnable(e,t){lt(this.hass,{automation_id:t,enabled:!e.target.checked}).catch(t=>Cn(t,e)).then()}getTableFilterOptions(){if(!this.hass)return;let e=Object.values(this.areas).map(e=>Object({value:e.area_id,name:e.name,badge:t=>t.filter(t=>t.area==e.area_id).length})).sort(Dn);Object.values(this.automations||[]).filter(e=>!this.getAreaForAutomation(e)).length&&(e=[{value:"no_area",name:this.config.master.enabled?this.config.master.name:this.hass.localize("state_attributes.climate.preset_mode.none"),badge:e=>e.filter(e=>"no_area"==e.area).length},...e]);return{area:{name:mn("components.table.filter.item",this.hass.language,"name",mn("panels.actions.cards.new_action.fields.area.heading",this.hass.language)),items:e,value:this.selectedArea?[this.selectedArea]:[]}}}addNotificationClick(){Ln(0,Rn("actions","new_notification"),!0)}addActionClick(){Ln(0,Rn("actions","new_action"),!0)}};pr.styles=qn,n([Qe()],pr.prototype,"hass",void 0),n([Qe()],pr.prototype,"narrow",void 0),n([Qe()],pr.prototype,"path",void 0),n([Qe()],pr.prototype,"alarmEntity",void 0),n([Qe()],pr.prototype,"automations",void 0),n([Qe()],pr.prototype,"areas",void 0),n([Qe()],pr.prototype,"config",void 0),n([Qe()],pr.prototype,"selectedArea",void 0),pr=n([Ke("alarm-view-actions")],pr),e.MyAlarmPanel=class extends Ge{async firstUpdated(){window.addEventListener("location-changed",()=>{window.location.pathname.includes("alarmo")&&this.requestUpdate()}),await Je(),this.userConfig=await at(this.hass),this.requestUpdate()}render(){if(!customElements.get("ha-panel-config")||!this.userConfig)return Te`
        loading...
      `;const e=Un();return Te`
      <div class="header">
        <div class="toolbar">
          <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
          <div class="main-title">
            ${mn("title",this.hass.language)}
          </div>
          <div class="version">
            v${"1.10.0"}
          </div>
        </div>

        <ha-tabs
          scrollable
          attr-for-selected="page-name"
          .selected=${e.page}
          @iron-activate=${this.handlePageSelected}
        >
          <paper-tab page-name="general">
            ${mn("panels.general.title",this.hass.language)}
          </paper-tab>
          <paper-tab page-name="sensors">
            ${mn("panels.sensors.title",this.hass.language)}
          </paper-tab>
          <paper-tab page-name="codes">
            ${mn("panels.codes.title",this.hass.language)}
          </paper-tab>
          <paper-tab page-name="actions">
            ${mn("panels.actions.title",this.hass.language)}
          </paper-tab>
        </ha-tabs>
      </div>
      <div class="view">
        ${this.getView(e)}
      </div>
    `}getView(e){switch(e.page){case"general":return Te`
          <alarm-view-general .hass=${this.hass} .narrow=${this.narrow} .path=${e}></alarm-view-general>
        `;case"sensors":return Te`
          <alarm-view-sensors .hass=${this.hass} .narrow=${this.narrow} .path=${e}></alarm-view-sensors>
        `;case"codes":return Te`
          <alarm-view-codes .hass=${this.hass} .narrow=${this.narrow} .path=${e}></alarm-view-codes>
        `;case"actions":return Te`
          <alarm-view-actions .hass=${this.hass} .narrow=${this.narrow} .path=${e}></alarm-view-actions>
        `;default:return Te`
          <ha-card header="Page not found">
            <div class="card-content">
              The page you are trying to reach cannot be found. Please select a page from the menu above to continue.
            </div>
          </ha-card>
        `}}handlePageSelected(e){const t=e.detail.item.getAttribute("page-name");t!==Un()?(Ln(0,Rn(t)),this.requestUpdate()):scrollTo(0,0)}static get styles(){return h`
      ${qn} :host {
        color: var(--primary-text-color);
        --paper-card-header-color: var(--primary-text-color);
      }
      .header {
        background-color: var(--app-header-background-color);
        color: var(--app-header-text-color, white);
        border-bottom: var(--app-header-border-bottom, none);
      }
      .toolbar {
        height: var(--header-height);
        display: flex;
        align-items: center;
        font-size: 20px;
        padding: 0 16px;
        font-weight: 400;
        box-sizing: border-box;
      }
      .main-title {
        margin: 0 0 0 24px;
        line-height: 20px;
        flex-grow: 1;
      }
      ha-tabs {
        margin-left: max(env(safe-area-inset-left), 24px);
        margin-right: max(env(safe-area-inset-right), 24px);
        --paper-tabs-selection-bar-color: var(--app-header-selection-bar-color, var(--app-header-text-color, #fff));
        text-transform: uppercase;
      }

      .view {
        height: calc(100vh - 112px);
        display: flex;
        justify-content: center;
      }

      .view > * {
        width: 600px;
        max-width: 600px;
      }

      .view > *:last-child {
        margin-bottom: 20px;
      }

      .version {
        font-size: 14px;
        font-weight: 500;
        color: rgba(var(--rgb-text-primary-color), 0.9);
      }
    `}},n([Qe()],e.MyAlarmPanel.prototype,"hass",void 0),n([Qe({type:Boolean,reflect:!0})],e.MyAlarmPanel.prototype,"narrow",void 0),n([Qe()],e.MyAlarmPanel.prototype,"userConfig",void 0),e.MyAlarmPanel=n([Ke("alarm-panel")],e.MyAlarmPanel)}({});
