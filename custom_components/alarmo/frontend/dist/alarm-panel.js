(function (exports) {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const t=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e=Symbol();class s{constructor(t,s){if(s!==e)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t;}get styleSheet(){return t&&void 0===this.t&&(this.t=new CSSStyleSheet,this.t.replaceSync(this.cssText)),this.t}toString(){return this.cssText}}const n=new Map,o=t=>{let o=n.get(t);return void 0===o&&n.set(t,o=new s(t,e)),o},r=t=>o("string"==typeof t?t:t+""),i=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,n,o)=>e+(t=>{if(t instanceof s)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+t[o+1]),t[0]);return o(n)},S=(e,s)=>{t?e.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):s.forEach((t=>{const s=document.createElement("style");s.textContent=t.cssText,e.appendChild(s);}));},u=t?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r(e)})(t):t;

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var s$1,e$1,h,r$1;const o$1={toAttribute(t,i){switch(i){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},n$1=(t,i)=>i!==t&&(i==i||t==t),l={attribute:!0,type:String,converter:o$1,reflect:!1,hasChanged:n$1};class a extends HTMLElement{constructor(){super(),this.Πi=new Map,this.Πo=void 0,this.Πl=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.Πh=null,this.u();}static addInitializer(t){var i;null!==(i=this.v)&&void 0!==i||(this.v=[]),this.v.push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this.Πp(s,i);void 0!==e&&(this.Πm.set(e,s),t.push(e));})),t}static createProperty(t,i=l){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const h=this[t];this[i]=e,this.requestUpdate(t,h,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l}static finalize(){if(this.hasOwnProperty("finalized"))return !1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this.Πm=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(u(i));}else void 0!==i&&s.push(u(i));return s}static Πp(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this.Πg=new Promise((t=>this.enableUpdating=t)),this.L=new Map,this.Π_(),this.requestUpdate(),null===(t=this.constructor.v)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this.ΠU)&&void 0!==i?i:this.ΠU=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this.ΠU)||void 0===i||i.splice(this.ΠU.indexOf(t)>>>0,1);}Π_(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this.Πi.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return S(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)})),this.Πl&&(this.Πl(),this.Πo=this.Πl=void 0);}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)})),this.Πo=new Promise((t=>this.Πl=t));}attributeChangedCallback(t,i,s){this.K(t,s);}Πj(t,i,s=l){var e,h;const r=this.constructor.Πp(t,s);if(void 0!==r&&!0===s.reflect){const n=(null!==(h=null===(e=s.converter)||void 0===e?void 0:e.toAttribute)&&void 0!==h?h:o$1.toAttribute)(i,s.type);this.Πh=t,null==n?this.removeAttribute(r):this.setAttribute(r,n),this.Πh=null;}}K(t,i){var s,e,h;const r=this.constructor,n=r.Πm.get(t);if(void 0!==n&&this.Πh!==n){const t=r.getPropertyOptions(n),l=t.converter,a=null!==(h=null!==(e=null===(s=l)||void 0===s?void 0:s.fromAttribute)&&void 0!==e?e:"function"==typeof l?l:null)&&void 0!==h?h:o$1.fromAttribute;this.Πh=n,this[n]=a(i,t.type),this.Πh=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||n$1)(this[t],i)?(this.L.has(t)||this.L.set(t,i),!0===s.reflect&&this.Πh!==t&&(void 0===this.Πk&&(this.Πk=new Map),this.Πk.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this.Πg=this.Πq());}async Πq(){this.isUpdatePending=!0;try{for(await this.Πg;this.Πo;)await this.Πo;}catch(t){Promise.reject(t);}const t=this.performUpdate();return null!=t&&await t,!this.isUpdatePending}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this.Πi&&(this.Πi.forEach(((t,i)=>this[i]=t)),this.Πi=void 0);let i=!1;const s=this.L;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this.Π$();}catch(t){throw i=!1,this.Π$(),t}i&&this.E(s);}willUpdate(t){}E(t){var i;null===(i=this.ΠU)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}Π$(){this.L=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.Πg}shouldUpdate(t){return !0}update(t){void 0!==this.Πk&&(this.Πk.forEach(((t,i)=>this.Πj(i,this[i],t))),this.Πk=void 0),this.Π$();}updated(t){}firstUpdated(t){}}a.finalized=!0,a.elementProperties=new Map,a.elementStyles=[],a.shadowRootOptions={mode:"open"},null===(e$1=(s$1=globalThis).reactiveElementPlatformSupport)||void 0===e$1||e$1.call(s$1,{ReactiveElement:a}),(null!==(h=(r$1=globalThis).reactiveElementVersions)&&void 0!==h?h:r$1.reactiveElementVersions=[]).push("1.0.0-rc.2");

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    var t$1,i$1,s$2,e$2;const o$2=globalThis.trustedTypes,l$1=o$2?o$2.createPolicy("lit-html",{createHTML:t=>t}):void 0,n$2=`lit$${(Math.random()+"").slice(9)}$`,h$1="?"+n$2,r$2=`<${h$1}>`,u$1=document,c=(t="")=>u$1.createComment(t),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,v=Array.isArray,a$1=t=>{var i;return v(t)||"function"==typeof(null===(i=t)||void 0===i?void 0:i[Symbol.iterator])},f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,$=/'/g,g=/"/g,y=/^(?:script|style|textarea)$/i,b=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),T=b(1),w=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),P=new WeakMap,V=(t,i,s)=>{var e,o;const l=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let n=l._$litPart$;if(void 0===n){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;l._$litPart$=n=new C(i.insertBefore(c(),t),t,void 0,s);}return n.I(t),n},E=u$1.createTreeWalker(u$1,129,null,!1),M=(t,i)=>{const s=t.length-1,e=[];let o,h=2===i?"<svg>":"",u=f;for(let i=0;i<s;i++){const s=t[i];let l,c,d=-1,v=0;for(;v<s.length&&(u.lastIndex=v,c=u.exec(s),null!==c);)v=u.lastIndex,u===f?"!--"===c[1]?u=_:void 0!==c[1]?u=m:void 0!==c[2]?(y.test(c[2])&&(o=RegExp("</"+c[2],"g")),u=p):void 0!==c[3]&&(u=p):u===p?">"===c[0]?(u=null!=o?o:f,d=-1):void 0===c[1]?d=-2:(d=u.lastIndex-c[2].length,l=c[1],u=void 0===c[3]?p:'"'===c[3]?g:$):u===g||u===$?u=p:u===_||u===m?u=f:(u=p,o=void 0);const a=u===p&&t[i+1].startsWith("/>")?" ":"";h+=u===f?s+r$2:d>=0?(e.push(l),s.slice(0,d)+"$lit$"+s.slice(d)+n$2+a):s+n$2+(-2===d?(e.push(void 0),i):a);}const c=h+(t[s]||"<?>")+(2===i?"</svg>":"");return [void 0!==l$1?l$1.createHTML(c):c,e]};class N{constructor({strings:t,_$litType$:i},s){let e;this.parts=[];let l=0,r=0;const u=t.length-1,d=this.parts,[v,a]=M(t,i);if(this.el=N.createElement(v,s),E.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(e=E.nextNode())&&d.length<u;){if(1===e.nodeType){if(e.hasAttributes()){const t=[];for(const i of e.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(n$2)){const s=a[r++];if(t.push(i),void 0!==s){const t=e.getAttribute(s.toLowerCase()+"$lit$").split(n$2),i=/([.?@])?(.*)/.exec(s);d.push({type:1,index:l,name:i[2],strings:t,ctor:"."===i[1]?I:"?"===i[1]?L:"@"===i[1]?R:H});}else d.push({type:6,index:l});}for(const i of t)e.removeAttribute(i);}if(y.test(e.tagName)){const t=e.textContent.split(n$2),i=t.length-1;if(i>0){e.textContent=o$2?o$2.emptyScript:"";for(let s=0;s<i;s++)e.append(t[s],c()),E.nextNode(),d.push({type:2,index:++l});e.append(t[i],c());}}}else if(8===e.nodeType)if(e.data===h$1)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=e.data.indexOf(n$2,t+1));)d.push({type:7,index:l}),t+=n$2.length-1;}l++;}}static createElement(t,i){const s=u$1.createElement("template");return s.innerHTML=t,s}}function S$1(t,i,s=t,e){var o,l,n,h;if(i===w)return i;let r=void 0!==e?null===(o=s.Σi)||void 0===o?void 0:o[e]:s.Σo;const u=d(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(l=null==r?void 0:r.O)||void 0===l||l.call(r,!1),void 0===u?r=void 0:(r=new u(t),r.T(t,s,e)),void 0!==e?(null!==(n=(h=s).Σi)&&void 0!==n?n:h.Σi=[])[e]=r:s.Σo=r),void 0!==r&&(i=S$1(t,r.S(t,i.values),r,e)),i}class k{constructor(t,i){this.l=[],this.N=void 0,this.D=t,this.M=i;}u(t){var i;const{el:{content:s},parts:e}=this.D,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:u$1).importNode(s,!0);E.currentNode=o;let l=E.nextNode(),n=0,h=0,r=e[0];for(;void 0!==r;){if(n===r.index){let i;2===r.type?i=new C(l,l.nextSibling,this,t):1===r.type?i=new r.ctor(l,r.name,r.strings,this,t):6===r.type&&(i=new z(l,this,t)),this.l.push(i),r=e[++h];}n!==(null==r?void 0:r.index)&&(l=E.nextNode(),n++);}return o}v(t){let i=0;for(const s of this.l)void 0!==s&&(void 0!==s.strings?(s.I(t,s,i),i+=s.strings.length-2):s.I(t[i])),i++;}}class C{constructor(t,i,s,e){this.type=2,this.N=void 0,this.A=t,this.B=i,this.M=s,this.options=e;}setConnected(t){var i;null===(i=this.P)||void 0===i||i.call(this,t);}get parentNode(){return this.A.parentNode}get startNode(){return this.A}get endNode(){return this.B}I(t,i=this){t=S$1(this,t,i),d(t)?t===A||null==t||""===t?(this.H!==A&&this.R(),this.H=A):t!==this.H&&t!==w&&this.m(t):void 0!==t._$litType$?this._(t):void 0!==t.nodeType?this.$(t):a$1(t)?this.g(t):this.m(t);}k(t,i=this.B){return this.A.parentNode.insertBefore(t,i)}$(t){this.H!==t&&(this.R(),this.H=this.k(t));}m(t){const i=this.A.nextSibling;null!==i&&3===i.nodeType&&(null===this.B?null===i.nextSibling:i===this.B.previousSibling)?i.data=t:this.$(u$1.createTextNode(t)),this.H=t;}_(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this.C(t):(void 0===e.el&&(e.el=N.createElement(e.h,this.options)),e);if((null===(i=this.H)||void 0===i?void 0:i.D)===o)this.H.v(s);else {const t=new k(o,this),i=t.u(this.options);t.v(s),this.$(i),this.H=t;}}C(t){let i=P.get(t.strings);return void 0===i&&P.set(t.strings,i=new N(t)),i}g(t){v(this.H)||(this.H=[],this.R());const i=this.H;let s,e=0;for(const o of t)e===i.length?i.push(s=new C(this.k(c()),this.k(c()),this,this.options)):s=i[e],s.I(o),e++;e<i.length&&(this.R(s&&s.B.nextSibling,e),i.length=e);}R(t=this.A.nextSibling,i){var s;for(null===(s=this.P)||void 0===s||s.call(this,!1,!0,i);t&&t!==this.B;){const i=t.nextSibling;t.remove(),t=i;}}}class H{constructor(t,i,s,e,o){this.type=1,this.H=A,this.N=void 0,this.V=void 0,this.element=t,this.name=i,this.M=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this.H=Array(s.length-1).fill(A),this.strings=s):this.H=A;}get tagName(){return this.element.tagName}I(t,i=this,s,e){const o=this.strings;let l=!1;if(void 0===o)t=S$1(this,t,i,0),l=!d(t)||t!==this.H&&t!==w,l&&(this.H=t);else {const e=t;let n,h;for(t=o[0],n=0;n<o.length-1;n++)h=S$1(this,e[s+n],i,n),h===w&&(h=this.H[n]),l||(l=!d(h)||h!==this.H[n]),h===A?t=A:t!==A&&(t+=(null!=h?h:"")+o[n+1]),this.H[n]=h;}l&&!e&&this.W(t);}W(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class I extends H{constructor(){super(...arguments),this.type=3;}W(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}W(t){t&&t!==A?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name);}}class R extends H{constructor(){super(...arguments),this.type=5;}I(t,i=this){var s;if((t=null!==(s=S$1(this,t,i,0))&&void 0!==s?s:A)===w)return;const e=this.H,o=t===A&&e!==A||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,l=t!==A&&(e===A||o);o&&this.element.removeEventListener(this.name,this,e),l&&this.element.addEventListener(this.name,this,t),this.H=t;}handleEvent(t){var i,s;"function"==typeof this.H?this.H.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this.H.handleEvent(t);}}class z{constructor(t,i,s){this.element=t,this.type=6,this.N=void 0,this.V=void 0,this.M=i,this.options=s;}I(t){S$1(this,t);}}null===(i$1=(t$1=globalThis).litHtmlPlatformSupport)||void 0===i$1||i$1.call(t$1,N,C),(null!==(s$2=(e$2=globalThis).litHtmlVersions)&&void 0!==s$2?s$2:e$2.litHtmlVersions=[]).push("2.0.0-rc.3");

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var i$2,l$2,o$3,s$3,n$3,a$2;(null!==(i$2=(a$2=globalThis).litElementVersions)&&void 0!==i$2?i$2:a$2.litElementVersions=[]).push("3.0.0-rc.2");class h$2 extends a{constructor(){super(...arguments),this.renderOptions={host:this},this.Φt=void 0;}createRenderRoot(){var t,e;const r=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=r.firstChild),r}update(t){const r=this.render();super.update(t),this.Φt=V(r,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!1);}render(){return w}}h$2.finalized=!0,h$2._$litElement$=!0,null===(o$3=(l$2=globalThis).litElementHydrateSupport)||void 0===o$3||o$3.call(l$2,{LitElement:h$2}),null===(n$3=(s$3=globalThis).litElementPlatformSupport)||void 0===n$3||n$3.call(s$3,{LitElement:h$2});

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const n$4=n=>e=>"function"==typeof e?((n,e)=>(window.customElements.define(n,e),e))(n,e):((n,e)=>{const{kind:t,elements:i}=e;return {kind:t,elements:i,finisher(e){window.customElements.define(n,e);}}})(n,e);

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const i$3=(i,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(n){n.createProperty(e.key,i);}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this));},finisher(n){n.createProperty(e.key,i);}};function e$3(e){return (n,t)=>void 0!==t?((i,e,n)=>{e.constructor.createProperty(n,i);})(e,n,t):i$3(e,n)}

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */function r$3(r){return e$3({...r,state:!0,attribute:!1})}

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const o$4=({finisher:e,descriptor:t})=>(o,n)=>{var r;if(void 0===n){const n=null!==(r=o.originalKey)&&void 0!==r?r:o.key,i=null!=t?{kind:"method",placement:"prototype",key:n,descriptor:t(o.key)}:{...o,key:n};return null!=e&&(i.finisher=function(t){e(t,n);}),i}{const r=o.constructor;void 0!==t&&Object.defineProperty(o,n,t(n)),null==e||e(r,n);}};

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */function o$5(o,r){return o$4({descriptor:t=>{const i={get(){var t;return null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector(o)},enumerable:!0,configurable:!0};if(r){const r="symbol"==typeof t?Symbol():"__"+t;i.get=function(){var t;return void 0===this[r]&&(this[r]=null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector(o)),this[r]};}return i}})}

    var token = /d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g;
    var twoDigitsOptional = "[1-9]\\d?";
    var twoDigits = "\\d\\d";
    var threeDigits = "\\d{3}";
    var fourDigits = "\\d{4}";
    var word = "[^\\s]+";
    var literal = /\[([^]*?)\]/gm;
    function shorten(arr, sLen) {
        var newArr = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            newArr.push(arr[i].substr(0, sLen));
        }
        return newArr;
    }
    var monthUpdate = function (arrName) { return function (v, i18n) {
        var lowerCaseArr = i18n[arrName].map(function (v) { return v.toLowerCase(); });
        var index = lowerCaseArr.indexOf(v.toLowerCase());
        if (index > -1) {
            return index;
        }
        return null;
    }; };
    function assign(origObj) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
            var obj = args_1[_a];
            for (var key in obj) {
                // @ts-ignore ex
                origObj[key] = obj[key];
            }
        }
        return origObj;
    }
    var dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    var monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    var monthNamesShort = shorten(monthNames, 3);
    var dayNamesShort = shorten(dayNames, 3);
    var defaultI18n = {
        dayNamesShort: dayNamesShort,
        dayNames: dayNames,
        monthNamesShort: monthNamesShort,
        monthNames: monthNames,
        amPm: ["am", "pm"],
        DoFn: function (dayOfMonth) {
            return (dayOfMonth +
                ["th", "st", "nd", "rd"][dayOfMonth % 10 > 3
                    ? 0
                    : ((dayOfMonth - (dayOfMonth % 10) !== 10 ? 1 : 0) * dayOfMonth) % 10]);
        }
    };
    var globalI18n = assign({}, defaultI18n);
    var setGlobalDateI18n = function (i18n) {
        return (globalI18n = assign(globalI18n, i18n));
    };
    var regexEscape = function (str) {
        return str.replace(/[|\\{()[^$+*?.-]/g, "\\$&");
    };
    var pad = function (val, len) {
        if (len === void 0) { len = 2; }
        val = String(val);
        while (val.length < len) {
            val = "0" + val;
        }
        return val;
    };
    var formatFlags = {
        D: function (dateObj) { return String(dateObj.getDate()); },
        DD: function (dateObj) { return pad(dateObj.getDate()); },
        Do: function (dateObj, i18n) {
            return i18n.DoFn(dateObj.getDate());
        },
        d: function (dateObj) { return String(dateObj.getDay()); },
        dd: function (dateObj) { return pad(dateObj.getDay()); },
        ddd: function (dateObj, i18n) {
            return i18n.dayNamesShort[dateObj.getDay()];
        },
        dddd: function (dateObj, i18n) {
            return i18n.dayNames[dateObj.getDay()];
        },
        M: function (dateObj) { return String(dateObj.getMonth() + 1); },
        MM: function (dateObj) { return pad(dateObj.getMonth() + 1); },
        MMM: function (dateObj, i18n) {
            return i18n.monthNamesShort[dateObj.getMonth()];
        },
        MMMM: function (dateObj, i18n) {
            return i18n.monthNames[dateObj.getMonth()];
        },
        YY: function (dateObj) {
            return pad(String(dateObj.getFullYear()), 4).substr(2);
        },
        YYYY: function (dateObj) { return pad(dateObj.getFullYear(), 4); },
        h: function (dateObj) { return String(dateObj.getHours() % 12 || 12); },
        hh: function (dateObj) { return pad(dateObj.getHours() % 12 || 12); },
        H: function (dateObj) { return String(dateObj.getHours()); },
        HH: function (dateObj) { return pad(dateObj.getHours()); },
        m: function (dateObj) { return String(dateObj.getMinutes()); },
        mm: function (dateObj) { return pad(dateObj.getMinutes()); },
        s: function (dateObj) { return String(dateObj.getSeconds()); },
        ss: function (dateObj) { return pad(dateObj.getSeconds()); },
        S: function (dateObj) {
            return String(Math.round(dateObj.getMilliseconds() / 100));
        },
        SS: function (dateObj) {
            return pad(Math.round(dateObj.getMilliseconds() / 10), 2);
        },
        SSS: function (dateObj) { return pad(dateObj.getMilliseconds(), 3); },
        a: function (dateObj, i18n) {
            return dateObj.getHours() < 12 ? i18n.amPm[0] : i18n.amPm[1];
        },
        A: function (dateObj, i18n) {
            return dateObj.getHours() < 12
                ? i18n.amPm[0].toUpperCase()
                : i18n.amPm[1].toUpperCase();
        },
        ZZ: function (dateObj) {
            var offset = dateObj.getTimezoneOffset();
            return ((offset > 0 ? "-" : "+") +
                pad(Math.floor(Math.abs(offset) / 60) * 100 + (Math.abs(offset) % 60), 4));
        },
        Z: function (dateObj) {
            var offset = dateObj.getTimezoneOffset();
            return ((offset > 0 ? "-" : "+") +
                pad(Math.floor(Math.abs(offset) / 60), 2) +
                ":" +
                pad(Math.abs(offset) % 60, 2));
        }
    };
    var monthParse = function (v) { return +v - 1; };
    var emptyDigits = [null, twoDigitsOptional];
    var emptyWord = [null, word];
    var amPm = [
        "isPm",
        word,
        function (v, i18n) {
            var val = v.toLowerCase();
            if (val === i18n.amPm[0]) {
                return 0;
            }
            else if (val === i18n.amPm[1]) {
                return 1;
            }
            return null;
        }
    ];
    var timezoneOffset = [
        "timezoneOffset",
        "[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",
        function (v) {
            var parts = (v + "").match(/([+-]|\d\d)/gi);
            if (parts) {
                var minutes = +parts[1] * 60 + parseInt(parts[2], 10);
                return parts[0] === "+" ? minutes : -minutes;
            }
            return 0;
        }
    ];
    var parseFlags = {
        D: ["day", twoDigitsOptional],
        DD: ["day", twoDigits],
        Do: ["day", twoDigitsOptional + word, function (v) { return parseInt(v, 10); }],
        M: ["month", twoDigitsOptional, monthParse],
        MM: ["month", twoDigits, monthParse],
        YY: [
            "year",
            twoDigits,
            function (v) {
                var now = new Date();
                var cent = +("" + now.getFullYear()).substr(0, 2);
                return +("" + (+v > 68 ? cent - 1 : cent) + v);
            }
        ],
        h: ["hour", twoDigitsOptional, undefined, "isPm"],
        hh: ["hour", twoDigits, undefined, "isPm"],
        H: ["hour", twoDigitsOptional],
        HH: ["hour", twoDigits],
        m: ["minute", twoDigitsOptional],
        mm: ["minute", twoDigits],
        s: ["second", twoDigitsOptional],
        ss: ["second", twoDigits],
        YYYY: ["year", fourDigits],
        S: ["millisecond", "\\d", function (v) { return +v * 100; }],
        SS: ["millisecond", twoDigits, function (v) { return +v * 10; }],
        SSS: ["millisecond", threeDigits],
        d: emptyDigits,
        dd: emptyDigits,
        ddd: emptyWord,
        dddd: emptyWord,
        MMM: ["month", word, monthUpdate("monthNamesShort")],
        MMMM: ["month", word, monthUpdate("monthNames")],
        a: amPm,
        A: amPm,
        ZZ: timezoneOffset,
        Z: timezoneOffset
    };
    // Some common format strings
    var globalMasks = {
        default: "ddd MMM DD YYYY HH:mm:ss",
        shortDate: "M/D/YY",
        mediumDate: "MMM D, YYYY",
        longDate: "MMMM D, YYYY",
        fullDate: "dddd, MMMM D, YYYY",
        isoDate: "YYYY-MM-DD",
        isoDateTime: "YYYY-MM-DDTHH:mm:ssZ",
        shortTime: "HH:mm",
        mediumTime: "HH:mm:ss",
        longTime: "HH:mm:ss.SSS"
    };
    var setGlobalDateMasks = function (masks) { return assign(globalMasks, masks); };
    /***
     * Format a date
     * @method format
     * @param {Date|number} dateObj
     * @param {string} mask Format of the date, i.e. 'mm-dd-yy' or 'shortDate'
     * @returns {string} Formatted date string
     */
    var format = function (dateObj, mask, i18n) {
        if (mask === void 0) { mask = globalMasks["default"]; }
        if (i18n === void 0) { i18n = {}; }
        if (typeof dateObj === "number") {
            dateObj = new Date(dateObj);
        }
        if (Object.prototype.toString.call(dateObj) !== "[object Date]" ||
            isNaN(dateObj.getTime())) {
            throw new Error("Invalid Date pass to format");
        }
        mask = globalMasks[mask] || mask;
        var literals = [];
        // Make literals inactive by replacing them with @@@
        mask = mask.replace(literal, function ($0, $1) {
            literals.push($1);
            return "@@@";
        });
        var combinedI18nSettings = assign(assign({}, globalI18n), i18n);
        // Apply formatting rules
        mask = mask.replace(token, function ($0) {
            return formatFlags[$0](dateObj, combinedI18nSettings);
        });
        // Inline literal values back into the formatted value
        return mask.replace(/@@@/g, function () { return literals.shift(); });
    };
    /**
     * Parse a date string into a Javascript Date object /
     * @method parse
     * @param {string} dateStr Date string
     * @param {string} format Date parse format
     * @param {i18n} I18nSettingsOptional Full or subset of I18N settings
     * @returns {Date|null} Returns Date object. Returns null what date string is invalid or doesn't match format
     */
    function parse(dateStr, format, i18n) {
        if (i18n === void 0) { i18n = {}; }
        if (typeof format !== "string") {
            throw new Error("Invalid format in fecha parse");
        }
        // Check to see if the format is actually a mask
        format = globalMasks[format] || format;
        // Avoid regular expression denial of service, fail early for really long strings
        // https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS
        if (dateStr.length > 1000) {
            return null;
        }
        // Default to the beginning of the year.
        var today = new Date();
        var dateInfo = {
            year: today.getFullYear(),
            month: 0,
            day: 1,
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0,
            isPm: null,
            timezoneOffset: null
        };
        var parseInfo = [];
        var literals = [];
        // Replace all the literals with @@@. Hopefully a string that won't exist in the format
        var newFormat = format.replace(literal, function ($0, $1) {
            literals.push(regexEscape($1));
            return "@@@";
        });
        var specifiedFields = {};
        var requiredFields = {};
        // Change every token that we find into the correct regex
        newFormat = regexEscape(newFormat).replace(token, function ($0) {
            var info = parseFlags[$0];
            var field = info[0], regex = info[1], requiredField = info[3];
            // Check if the person has specified the same field twice. This will lead to confusing results.
            if (specifiedFields[field]) {
                throw new Error("Invalid format. " + field + " specified twice in format");
            }
            specifiedFields[field] = true;
            // Check if there are any required fields. For instance, 12 hour time requires AM/PM specified
            if (requiredField) {
                requiredFields[requiredField] = true;
            }
            parseInfo.push(info);
            return "(" + regex + ")";
        });
        // Check all the required fields are present
        Object.keys(requiredFields).forEach(function (field) {
            if (!specifiedFields[field]) {
                throw new Error("Invalid format. " + field + " is required in specified format");
            }
        });
        // Add back all the literals after
        newFormat = newFormat.replace(/@@@/g, function () { return literals.shift(); });
        // Check if the date string matches the format. If it doesn't return null
        var matches = dateStr.match(new RegExp(newFormat, "i"));
        if (!matches) {
            return null;
        }
        var combinedI18nSettings = assign(assign({}, globalI18n), i18n);
        // For each match, call the parser function for that date part
        for (var i = 1; i < matches.length; i++) {
            var _a = parseInfo[i - 1], field = _a[0], parser = _a[2];
            var value = parser
                ? parser(matches[i], combinedI18nSettings)
                : +matches[i];
            // If the parser can't make sense of the value, return null
            if (value == null) {
                return null;
            }
            dateInfo[field] = value;
        }
        if (dateInfo.isPm === 1 && dateInfo.hour != null && +dateInfo.hour !== 12) {
            dateInfo.hour = +dateInfo.hour + 12;
        }
        else if (dateInfo.isPm === 0 && +dateInfo.hour === 12) {
            dateInfo.hour = 0;
        }
        var dateWithoutTZ = new Date(dateInfo.year, dateInfo.month, dateInfo.day, dateInfo.hour, dateInfo.minute, dateInfo.second, dateInfo.millisecond);
        var validateFields = [
            ["month", "getMonth"],
            ["day", "getDate"],
            ["hour", "getHours"],
            ["minute", "getMinutes"],
            ["second", "getSeconds"]
        ];
        for (var i = 0, len = validateFields.length; i < len; i++) {
            // Check to make sure the date field is within the allowed range. Javascript dates allows values
            // outside the allowed range. If the values don't match the value was invalid
            if (specifiedFields[validateFields[i][0]] &&
                dateInfo[validateFields[i][0]] !== dateWithoutTZ[validateFields[i][1]]()) {
                return null;
            }
        }
        if (dateInfo.timezoneOffset == null) {
            return dateWithoutTZ;
        }
        return new Date(Date.UTC(dateInfo.year, dateInfo.month, dateInfo.day, dateInfo.hour, dateInfo.minute - dateInfo.timezoneOffset, dateInfo.second, dateInfo.millisecond));
    }
    var fecha = {
        format: format,
        parse: parse,
        defaultI18n: defaultI18n,
        setGlobalDateI18n: setGlobalDateI18n,
        setGlobalDateMasks: setGlobalDateMasks
    };

    var a$3=function(){try{(new Date).toLocaleDateString("i");}catch(e){return "RangeError"===e.name}return !1}()?function(e,t){return e.toLocaleDateString(t,{year:"numeric",month:"long",day:"numeric"})}:function(t){return fecha.format(t,"mediumDate")},r$4=function(){try{(new Date).toLocaleString("i");}catch(e){return "RangeError"===e.name}return !1}()?function(e,t){return e.toLocaleString(t,{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"2-digit"})}:function(t){return fecha.format(t,"haDateTime")},n$5=function(){try{(new Date).toLocaleTimeString("i");}catch(e){return "RangeError"===e.name}return !1}()?function(e,t){return e.toLocaleTimeString(t,{hour:"numeric",minute:"2-digit"})}:function(t){return fecha.format(t,"shortTime")};function d$1(e){return e.substr(0,e.indexOf("."))}function f$1(e){return e.substr(e.indexOf(".")+1)}var _$1="hass:bookmark",C$1=function(e,t,a,r){r=r||{},a=null==a?{}:a;var n=new Event(t,{bubbles:void 0===r.bubbles||r.bubbles,cancelable:Boolean(r.cancelable),composed:void 0===r.composed||r.composed});return n.detail=a,e.dispatchEvent(n),n},N$1={alert:"hass:alert",automation:"hass:playlist-play",calendar:"hass:calendar",camera:"hass:video",climate:"hass:thermostat",configurator:"hass:settings",conversation:"hass:text-to-speech",device_tracker:"hass:account",fan:"hass:fan",group:"hass:google-circles-communities",history_graph:"hass:chart-line",homeassistant:"hass:home-assistant",homekit:"hass:home-automation",image_processing:"hass:image-filter-frames",input_boolean:"hass:drawing",input_datetime:"hass:calendar-clock",input_number:"hass:ray-vertex",input_select:"hass:format-list-bulleted",input_text:"hass:textbox",light:"hass:lightbulb",mailbox:"hass:mailbox",notify:"hass:comment-alert",person:"hass:account",plant:"hass:flower",proximity:"hass:apple-safari",remote:"hass:remote",scene:"hass:google-pages",script:"hass:file-document",sensor:"hass:eye",simple_alarm:"hass:bell",sun:"hass:white-balance-sunny",switch:"hass:flash",timer:"hass:timer",updater:"hass:cloud-upload",vacuum:"hass:robot-vacuum",water_heater:"hass:thermometer",weblink:"hass:open-in-new"};function O(e,t){if(e in N$1)return N$1[e];switch(e){case"alarm_control_panel":switch(t){case"armed_home":return "hass:bell-plus";case"armed_night":return "hass:bell-sleep";case"disarmed":return "hass:bell-outline";case"triggered":return "hass:bell-ring";default:return "hass:bell"}case"binary_sensor":return t&&"off"===t?"hass:radiobox-blank":"hass:checkbox-marked-circle";case"cover":return "closed"===t?"hass:window-closed":"hass:window-open";case"lock":return t&&"unlocked"===t?"hass:lock-open":"hass:lock";case"media_player":return t&&"off"!==t&&"idle"!==t?"hass:cast-connected":"hass:cast";case"zwave":switch(t){case"dead":return "hass:emoticon-dead";case"sleeping":return "hass:sleep";case"initializing":return "hass:timer-sand";default:return "hass:z-wave"}default:return console.warn("Unable to find icon for domain "+e+" ("+t+")"),_$1}}var F=function(e,t,a){void 0===a&&(a=!1),a?history.replaceState(null,"",t):history.pushState(null,"",t),C$1(window,"location-changed",{replace:a});};var K={humidity:"hass:water-percent",illuminance:"hass:brightness-5",temperature:"hass:thermometer",pressure:"hass:gauge",power:"hass:flash",signal_strength:"hass:wifi"},P$1={binary_sensor:function(e){var t=e.state&&"off"===e.state;switch(e.attributes.device_class){case"battery":return t?"hass:battery":"hass:battery-outline";case"cold":return t?"hass:thermometer":"hass:snowflake";case"connectivity":return t?"hass:server-network-off":"hass:server-network";case"door":return t?"hass:door-closed":"hass:door-open";case"garage_door":return t?"hass:garage":"hass:garage-open";case"gas":case"power":case"problem":case"safety":case"smoke":return t?"hass:shield-check":"hass:alert";case"heat":return t?"hass:thermometer":"hass:fire";case"light":return t?"hass:brightness-5":"hass:brightness-7";case"lock":return t?"hass:lock":"hass:lock-open";case"moisture":return t?"hass:water-off":"hass:water";case"motion":return t?"hass:walk":"hass:run";case"occupancy":return t?"hass:home-outline":"hass:home";case"opening":return t?"hass:square":"hass:square-outline";case"plug":return t?"hass:power-plug-off":"hass:power-plug";case"presence":return t?"hass:home-outline":"hass:home";case"sound":return t?"hass:music-note-off":"hass:music-note";case"vibration":return t?"hass:crop-portrait":"hass:vibrate";case"window":return t?"hass:window-closed":"hass:window-open";default:return t?"hass:radiobox-blank":"hass:checkbox-marked-circle"}},cover:function(e){var t="closed"!==e.state;switch(e.attributes.device_class){case"garage":return t?"hass:garage-open":"hass:garage";case"door":return t?"hass:door-open":"hass:door-closed";case"shutter":return t?"hass:window-shutter-open":"hass:window-shutter";case"blind":return t?"hass:blinds-open":"hass:blinds";case"window":return t?"hass:window-open":"hass:window-closed";default:return O("cover",e.state)}},sensor:function(e){var t=e.attributes.device_class;if(t&&t in K)return K[t];if("battery"===t){var a=Number(e.state);if(isNaN(a))return "hass:battery-unknown";var r=10*Math.round(a/10);return r>=100?"hass:battery":r<=0?"hass:battery-alert":"hass:battery-"+r}var n=e.attributes.unit_of_measurement;return "°C"===n||"°F"===n?"hass:thermometer":O("sensor")},input_datetime:function(e){return e.attributes.has_date?e.attributes.has_time?O("input_datetime"):"hass:calendar":"hass:clock"}},Q=function(e){if(!e)return _$1;if(e.attributes.icon)return e.attributes.icon;var t=d$1(e.entity_id);return t in P$1?P$1[t](e):O(t,e.state)};

    const loadHaForm = async () => {
      if (customElements.get("ha-checkbox") && customElements.get("ha-slider")) return;
      await customElements.whenDefined("partial-panel-resolver");
      const ppr = document.createElement('partial-panel-resolver');
      ppr.hass = {
        panels: [{
          url_path: "tmp",
          component_name: "config"
        }]
      };

      ppr._updateRoutes();

      await ppr.routerOptions.routes.tmp.load();
      await customElements.whenDefined("ha-panel-config");
      const cpr = document.createElement("ha-panel-config");
      await cpr.routerOptions.routes.automation.load();
      ppr.hass = {
        panels: [{
          url_path: "tmp",
          component_name: "developer-tools"
        }]
      };

      ppr._updateRoutes();

      await ppr.routerOptions.routes.tmp.load();
      await customElements.whenDefined("ha-app-layout");
    };

    const commonStyle = i `
  ha-card {
    display: flex;
    flex-direction: column;
    margin: 5px;
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

  mwc-button.active {
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

  mwc-button.disabled.active {
    opacity: 0.5;
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

  paper-textarea {
    width: 100%;
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

  div.table-filter {
    display: flex;
    width: 100%;
    min-height: 52px;
    border-top: 1px solid var(--divider-color);
    box-sizing: border-box;
    padding: 2px 8px;
    flex-direction: row;
    align-items: center;
  }
  div.table-filter .header {
    display: flex;
    white-space: nowrap;
    padding: 8px 8px;
  }
  div.table-filter[narrow] {
    flex-direction: column;
    align-items: flex-start;
  }
`;
    const dialogStyle = i `
  @media all and (min-width: 450px) and (min-height: 500px) {
    ha-paper-dialog {
      min-width: 400px;
    }
  }
  @media all and (max-width: 450px), all and (max-height: 500px) {
    paper-dialog,
    ha-paper-dialog {
      margin: 0;
      width: calc(
        100% - env(safe-area-inset-right) - env(safe-area-inset-left)
      ) !important;
      min-width: calc(
        100% - env(safe-area-inset-right) - env(safe-area-inset-left)
      ) !important;
      max-width: calc(
        100% - env(safe-area-inset-right) - env(safe-area-inset-left)
      ) !important;
      max-height: calc(100% - var(--header-height));
      position: fixed !important;
      bottom: 0px;
      left: env(safe-area-inset-left);
      right: env(safe-area-inset-right);
      overflow: scroll;
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
    }
  }
  /* mwc-dialog (ha-dialog) styles */
  ha-dialog {
    --mdc-dialog-min-width: 400px;
    --mdc-dialog-max-width: 600px;
    --mdc-dialog-heading-ink-color: var(--primary-text-color);
    --mdc-dialog-content-ink-color: var(--primary-text-color);
    --justify-action-buttons: space-between;
  }

  @media all and (max-width: 450px), all and (max-height: 500px) {
    /* overrule the ha-style-dialog max-height on small screens */
    ha-dialog {
      --mdc-dialog-max-height: 100%;
      height: 100%;
    }
  }
  @media all and (min-width: 850px) {
    ha-dialog {
      --mdc-dialog-min-width: 550px;
    }
  }
  ha-dialog div.description {
    margin-bottom: 10px;
  }
`;

    var common = {
    	modes_long: {
    		armed_away: "Mode fora de casa activat",
    		armed_home: "Mode a casa activat",
    		armed_night: "Mode nit activat",
    		armed_custom_bypass: "Mode personalitzat activat"
    	},
    	modes_short: {
    		armed_away: "Fora",
    		armed_home: "Casa",
    		armed_night: "Nit",
    		armed_custom_bypass: "Personalitzat"
    	}
    };
    var components = {
    	time_slider: {
    		seconds: "seg",
    		minutes: "min",
    		infinite: "infinit",
    		none: "cap"
    	},
    	editor: {
    		ui_mode: "Canvia a UI",
    		yaml_mode: "Canvia a YAML",
    		edit_in_yaml: "Edit in YAML"
    	}
    };
    var title = "Tauler alarma";
    var panels = {
    	general: {
    		title: "General",
    		cards: {
    			general: {
    				description: "Aquest tauler defineix alguns paràmetres globals de l'alarma.",
    				fields: {
    					disarm_after_trigger: {
    						heading: "Desactivar després del disparador",
    						description: "Quan hagi transcorregut el temps d’activació, desactiveu l’alarma en lloc de tornar a l’estat armat."
    					},
    					enable_mqtt: {
    						heading: "Activa MQTT",
    						description: "Permet controlar el tauler d'alarma mitjançant MQTT."
    					},
    					enable_master: {
    						heading: "Activa l'alarma mestra",
    						description: "Crea una entitat per controlar totes les àrees simultàniament."
    					}
    				},
    				actions: {
    					setup_mqtt: "Configuració MQTT",
    					setup_master: "Configuració mestra"
    				}
    			},
    			modes: {
    				title: "Modes",
    				description: "Aquest tauler es pot utilitzar per configurar els modes d'activació de l'alarma.",
    				fields: {
    					mode: {
    						armed_away: "El mode fora de casa s'utilitzarà quan totes les persones surtin de casa. Es controlen totes les portes i finestres que permeten l'accés a la casa, així com els sensors de moviment dins de la casa.",
    						armed_home: "El mode a casa (també conegut com mode casa) s'utilitzarà quan configureu l'alarma mentre hi hagi persones a la casa. Es controlen totes les portes i finestres que permetin l'accés a la casa, però no els sensors de moviment a l'interior de la casa.",
    						armed_night: "El mode nit s'utilitzarà quan configureu l'alarma abans d'anar a dormir. Es controlaran totes les portes i finestres que permetin l'accés a la casa i es seleccionaran els sensors de moviment (per exemple, a la planta baixa) de la casa.",
    						armed_custom_bypass: "Un mode addicional per definir el vostre propi perímetre de seguretat.",
    						enabled: "Activat",
    						disabled: "Desactivat"
    					},
    					exit_delay: {
    						heading: "Retard de sortida",
    						description: "Quan activeu l'alarma, en aquest període de temps els sensors encara no activaran l'alarma."
    					},
    					entry_delay: {
    						heading: "Retard d'entrada",
    						description: "Temps de retard fins que s'activi l'alarma després que s'activi un dels sensors."
    					},
    					trigger_time: {
    						heading: "Temps d'activació",
    						description: "Temps durant el qual sonarà la sirena"
    					}
    				}
    			},
    			mqtt: {
    				title: "Configuració MQTT",
    				description: "Aquest tauler es pot utilitzar per configurar la interfície MQTT.",
    				fields: {
    					state_topic: {
    						heading: "Tema d'estat",
    						description: "Tema sobre el qual es publiquen les actualitzacions d'estat"
    					},
    					event_topic: {
    						heading: "Tema d'esdeveniment",
    						description: "Tema sobre el qual es publiquen els esdeveniments d'alarma"
    					},
    					command_topic: {
    						heading: "Tama d'ordre",
    						description: "Tema sobre el qual s'envien les ordres d'activació/desactivació."
    					},
    					require_code: {
    						heading: "Requereix codi",
    						description: "Requereix l'enviament d'un codi amb l'ordre."
    					},
    					state_payload: {
    						heading: "Configura la càrrega útil per estat",
    						item: "Definiu una càrrega útil per a l'estat '{state}'"
    					},
    					command_payload: {
    						heading: "Configura la càrrega útil per ordre",
    						item: "Definiu una càrrega útil per a l'ordre '{command}'"
    					}
    				}
    			},
    			areas: {
    				title: "Àrees",
    				description: "Les àrees es poden utilitzar per dividir el sistema d'alarma en diversos compartiments.",
    				no_items: "Encara no hi ha àrees definides.",
    				table: {
    					remarks: "Observacions",
    					summary: "Aquesta àrea conté {summary_sensors} i {summary_automations}.",
    					summary_sensors: "{number} sensors",
    					summary_automations: "{number} automatismes"
    				},
    				actions: {
    					add: "Afegeix"
    				}
    			}
    		},
    		dialogs: {
    			create_area: {
    				title: "Àrea nova",
    				fields: {
    					copy_from: "Copia la configuració de"
    				}
    			},
    			edit_area: {
    				title: "Edita l'àrea '{area}'",
    				name_warning: "Nota: si canvieu el nom, es canviarà l'identificador d'entitat"
    			},
    			remove_area: {
    				title: "Voleu eliminar l'àrea?",
    				description: "Confirmeu que voleu eliminar aquesta àrea? Aquesta àrea conté {sensors} sensors i {automatismes} automatismes, que també s'eliminaran."
    			},
    			edit_master: {
    				title: "Configuració mestra"
    			},
    			disable_master: {
    				title: "Voleu desactivar l'alarma mestra?",
    				description: "Confirmeu que voleu eliminar l'alarma mestra? Aquesta àrea conté automatismes {automatismes}, que s'eliminaran amb aquesta acció."
    			}
    		}
    	},
    	sensors: {
    		title: "Sensors",
    		cards: {
    			sensors: {
    				description: "Sensors configurats actualment. Feu clic a una entitat per fer canvis.",
    				no_items: "No hi ha cap sensor per mostrar",
    				table: {
    					arm_modes: "Modes d'armat",
    					always_on: "(Sempre)"
    				},
    				filter: {
    					label: "Filtra per àrea",
    					no_area: "(Sense àrea)"
    				}
    			},
    			add_sensors: {
    				title: "Afegeix sensors",
    				description: "Afegiu més sensors. Assegureu-vos que els vostres sensors tinguin un friendly_name perquè pugueu identificar-los.",
    				no_items: "No hi ha entitats HA disponibles que es puguin configurar per a l'alarma. Assegureu-vos d'incloure entitats del tipus binary_sensor.",
    				table: {
    					type: "Detected type"
    				},
    				actions: {
    					add_to_alarm: "afegeix a l'alarma",
    					show_all: "Mostra-ho tot"
    				}
    			},
    			editor: {
    				title: "Edita el sensor",
    				description: "Edita la configuració del sensor de '{entity}'.",
    				fields: {
    					name: {
    						heading: "Nom",
    						description: "Sobreescriu el friendly_name"
    					},
    					area: {
    						heading: "Àrea",
    						description: "Seleccioneu una àrea que contingui aquest sensor."
    					},
    					group: {
    						heading: "Group",
    						description: "Group with other sensors for combined triggering."
    					},
    					device_type: {
    						heading: "Tipus de dispositiu",
    						description: "Trieu un tipus de dispositiu per aplicar automàticament la configuració adequada.",
    						choose: {
    							door: {
    								name: "Porta",
    								description: "Porta, porta de garatge o altra entrada que s'utilitzi per entrar/sortir de casa."
    							},
    							window: {
    								name: "Finestra",
    								description: "Finestra o una porta que no s'utilitza per entrar a la casa, com ara un balcó."
    							},
    							motion: {
    								name: "Moviment",
    								description: "Sensor de presència o dispositiu similar que té un retard entre les activacions."
    							},
    							tamper: {
    								name: "Antisabotatge",
    								description: "Detector de retirada de la coberta del sensor, sensor de trencament de vidre, etc."
    							},
    							environmental: {
    								name: "Ambiental",
    								description: "Sensor de fum o gas, detector de fuites, etc. (no relacionat amb la protecció antirobatori)."
    							},
    							other: {
    								name: "Genèric"
    							}
    						}
    					},
    					always_on: {
    						heading: "Sempre activat",
    						description: "El sensor sempre ha de disparar l'alarma."
    					},
    					modes: {
    						heading: "Modes habilitats",
    						description: "Modes d'alarma en què aquest sensor està actiu."
    					},
    					arm_on_close: {
    						heading: "Arma després de tancar",
    						description: "Després de la desactivació d'aquest sensor, s'omet automàticament el temps de retard de sortida restant."
    					},
    					use_exit_delay: {
    						heading: "Use exit delay",
    						description: "Sensor is allowed to be active when the exit delay starts."
    					},
    					use_entry_delay: {
    						heading: "Use entry delay",
    						description: "Sensor activation triggers the alarm after the entry delay rather than directly."
    					},
    					allow_open: {
    						heading: "Permet obrir mentre s'arma l'alarma",
    						description: "Permeteu que aquest sensor estigui actiu poc després de configurar-lo de manera que no bloquegi l'activació de l'alarma."
    					},
    					auto_bypass: {
    						heading: "Omet automàticament",
    						description: "Excloeu aquest sensor de l'alarma si està obert mentre s'arma l'alarma.",
    						modes: "Modes in which sensor may be bypassed"
    					},
    					trigger_unavailable: {
    						heading: "Activador quan no estigui disponible",
    						description: "Quan l'estat del sensor no estigui disponible, això activarà el sensor."
    					}
    				},
    				actions: {
    					toggle_advanced: "Configuració avançada",
    					remove: "Elimina",
    					setup_groups: "Setup groups"
    				},
    				errors: {
    					description: "Corregiu els errors següents:",
    					no_area: "No s'ha seleccionat cap àrea",
    					no_modes: "No s'han seleccionat modes per als quals el sensor hauria d'estar actiu",
    					no_auto_bypass_modes: "No modes are selected for the sensor may be automatically bypassed"
    				}
    			}
    		},
    		dialogs: {
    			manage_groups: {
    				title: "Manage sensor groups",
    				description: "In a sensor group multiple sensors must be activated within a time period before the alarm is triggered.",
    				no_items: "No groups yet",
    				actions: {
    					new_group: "New group"
    				}
    			},
    			create_group: {
    				title: "New sensor group",
    				fields: {
    					name: {
    						heading: "Name",
    						description: "Name for sensor group"
    					},
    					timeout: {
    						heading: "Time-out",
    						description: "Time period during which consecutive sensor activations triggers the alarm."
    					},
    					sensors: {
    						heading: "Sensors",
    						description: "Select the sensors which are contained by this group."
    					}
    				},
    				errors: {
    					invalid_name: "Invalid name provided.",
    					insufficient_sensors: "At least 2 sensors need to be selected."
    				}
    			},
    			edit_group: {
    				title: "Edit sensor group '{name}'"
    			}
    		}
    	},
    	codes: {
    		title: "Codis",
    		cards: {
    			codes: {
    				description: "Canvieu la configuració del codi.",
    				fields: {
    					code_arm_required: {
    						heading: "Utilitzeu un codi d'activació",
    						description: "Requereix un codi per activar l'alarma"
    					},
    					code_disarm_required: {
    						heading: "Utilitzeu un codi de desactivació",
    						description: "Requereix un codi per desactivar l'alarma"
    					},
    					code_format: {
    						heading: "Format del codi",
    						description: "Estableix el tipus de codi per a la targeta d'alarma Lovelace.",
    						code_format_number: "codi PIN",
    						code_format_text: "contrasenya"
    					}
    				}
    			},
    			user_management: {
    				title: "Gestió d'usuaris",
    				description: "Cada usuari té el seu propi codi per activar/desactivar l'alarma.",
    				no_items: "Encara no hi ha usuaris",
    				table: {
    					remarks: "Observacions",
    					administrator: "Administrador"
    				},
    				actions: {
    					new_user: "usuari nou"
    				}
    			},
    			new_user: {
    				title: "Crea un usuari nou",
    				description: "Es poden crear usuaris per proporcionar accés al funcionament de l'alarma.",
    				fields: {
    					name: {
    						heading: "Nom",
    						description: "Nom de l'usuari."
    					},
    					code: {
    						heading: "Codi",
    						description: "Codi d'aquest usuari."
    					},
    					confirm_code: {
    						heading: "Confirmeu el codi",
    						description: "Repetiu el codi."
    					},
    					is_admin: {
    						heading: "L'usuari és administrador",
    						description: "Permetre a l'usuari fer canvis"
    					},
    					can_arm: {
    						heading: "Permetre que el codi active l'alarma",
    						description: "Entering this code activates the alarm"
    					},
    					can_disarm: {
    						heading: "Permetre que el codi desactive l'alarma",
    						description: "Entering this code deactivates the alarm"
    					},
    					is_override_code: {
    						heading: "És un codi de sobreescriptura",
    						description: "Si introduïu aquest codi, es forçarà l'estat d'activació de l'alarma"
    					},
    					area_limit: {
    						heading: "Restricted areas",
    						description: "Limit user to control only the selected areas"
    					}
    				},
    				errors: {
    					no_name: "No s'ha proporcionat cap nom.",
    					no_code: "El codi ha de tenir 4 caràcters o números com a mínim.",
    					code_mismatch: "Els codis no coincideixen."
    				}
    			},
    			edit_user: {
    				title: "Edita l'usuari",
    				description: "Canvia la configuració de l'usuari '{name}'.",
    				fields: {
    					old_code: {
    						heading: "Codi actual",
    						description: "Codi actual, deixeu-lo en blanc per deixar-lo sense canvis."
    					}
    				}
    			}
    		}
    	},
    	actions: {
    		title: "Accions",
    		cards: {
    			notifications: {
    				title: "Notificacions",
    				description: "Utilitzant aquest tauler, podeu gestionar les notificacions que s'envien quan es produeix un determinat esdeveniment d'alarma.",
    				table: {
    					enabled: "Activat",
    					no_items: "Encara no s'han creat notificacions."
    				},
    				actions: {
    					new_notification: "nova notificació"
    				},
    				filter: {
    					label: "Filtra per àrea",
    					no_area: "(Sense àrea)"
    				}
    			},
    			actions: {
    				description: "Aquest tauler es pot utilitzar per canviar un dispositiu quan l'estat d'alarma canvia.",
    				table: {
    					no_items: "Encara no s'han creat accions."
    				},
    				actions: {
    					new_action: "nova acció"
    				}
    			},
    			new_notification: {
    				title: "Crea una notificació",
    				description: "Crea una nova notificació.",
    				trigger: "Condition",
    				action: "Task",
    				options: "Options",
    				fields: {
    					event: {
    						heading: "Esdeveniment",
    						description: "Quan s'ha d'enviar la notificació",
    						choose: {
    							armed: {
    								name: "L'alarma està activada",
    								description: "L'alarma s'ha activat correctament"
    							},
    							disarmed: {
    								name: "L'alarma està desactivada",
    								description: "L'alarma està desactivada"
    							},
    							triggered: {
    								name: "L'alarma s'activat per esdeveniment",
    								description: "L'alarma s'activat per esdeveniment"
    							},
    							arm_failure: {
    								name: "No s'ha pogut activar l'alarma",
    								description: "L'activació de l'alarma ha fallat a causa d'un o més sensors estan oberts"
    							},
    							arming: {
    								name: "S'ha iniciat el retard de sortida",
    								description: "S'ha iniciat el retard de sortida, a punt per sortir de casa."
    							},
    							pending: {
    								name: "S'ha iniciat el retard d'entrada",
    								description: "El retard d'entrada s'ha iniciat, l'alarma s'activarà aviat."
    							}
    						}
    					},
    					mode: {
    						heading: "Mode",
    						description: "Limita l'acció a modes específics d'activació (opcional)"
    					},
    					title: {
    						heading: "Títol",
    						description: "Títol del missatge de notificació"
    					},
    					message: {
    						heading: "Missatge",
    						description: "Contingut del missatge de notificació",
    						insert_wildcard: "Insert wildcard",
    						placeholders: {
    							armed: "The alarm is set to {{arm_mode}}",
    							disarmed: "The alarm is now OFF",
    							triggered: "The alarm is triggered! Cause: {{open_sensors}}.",
    							arm_failure: "The alarm could not be armed right now, due to: {{open_sensors}}.",
    							arming: "The alarm will be armed soon, please leave the house.",
    							pending: "The alarm is about to trigger, disarm it quickly!"
    						}
    					},
    					open_sensors_format: {
    						heading: "Format for open_sensors wildcard",
    						description: "Choose which sensor information in inserted in the message",
    						options: {
    							"default": "Names and states",
    							short: "Names only"
    						}
    					},
    					target: {
    						heading: "Destinatari",
    						description: "Dispositiu al qual enviar el missatge"
    					},
    					name: {
    						heading: "Nom",
    						description: "Descripció d'aquesta notificació",
    						placeholders: {
    							armed: "Notify {target} upon arming",
    							disarmed: "Notify {target} upon disarming",
    							triggered: "Notify {target} when triggered",
    							arm_failure: "Notify {target} on failure",
    							arming: "Notify {target} when leaving",
    							pending: "Notify {target} when arriving"
    						}
    					},
    					"delete": {
    						heading: "Delete automation",
    						description: "Permanently remove this automation"
    					}
    				},
    				actions: {
    					test: "Prova-ho"
    				}
    			},
    			new_action: {
    				title: "Crea una acció",
    				description: "Aquest tauler es pot utilitzar per canviar un dispositiu quan l'estat d'alarma canvia.",
    				fields: {
    					event: {
    						heading: "Esdeveniment",
    						description: "Quan s'ha d'executar l'acció"
    					},
    					area: {
    						heading: "Àrea",
    						description: "Àrea per a la qual s'aplica l'esdeveniment, deixeu-la en blanc per seleccionar l'alarma global."
    					},
    					mode: {
    						heading: "Mode",
    						description: "Limita l'acció a modes específics d'activació (opcional)"
    					},
    					entity: {
    						heading: "Entitat",
    						description: "Entitat en què es realitzarà l'acció"
    					},
    					action: {
    						heading: "Acció",
    						description: "Acció a realitzar a l'entitat",
    						no_common_actions: "Actions can only be assigned in YAML mode for the selected entities."
    					},
    					name: {
    						heading: "Nom",
    						description: "Descripció d'aquesta acció",
    						placeholders: {
    							armed: "Set {entity} to {state} upon arming",
    							disarmed: "Set {entity} to {state} upon disarming",
    							triggered: "Set {entity} to {state} when triggered",
    							arm_failure: "Set {entity} to {state} on failure",
    							arming: "Set {entity} to {state} when leaving",
    							pending: "Set {entity} to {state} when arriving"
    						}
    					}
    				}
    			}
    		}
    	}
    };
    var ca = {
    	common: common,
    	components: components,
    	title: title,
    	panels: panels
    };

    var ca$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        common: common,
        components: components,
        title: title,
        panels: panels,
        'default': ca
    });

    var common$1 = {
    	modes_long: {
    		armed_away: "Armed Away",
    		armed_home: "Armed Home",
    		armed_night: "Armed Night",
    		armed_custom_bypass: "Armed Custom"
    	},
    	modes_short: {
    		armed_away: "Away",
    		armed_home: "Home",
    		armed_night: "Night",
    		armed_custom_bypass: "Custom"
    	}
    };
    var components$1 = {
    	time_slider: {
    		seconds: "sec",
    		minutes: "min",
    		infinite: "infinite",
    		none: "none"
    	},
    	editor: {
    		ui_mode: "To UI",
    		yaml_mode: "To YAML",
    		edit_in_yaml: "Edit in YAML"
    	}
    };
    var title$1 = "Alarm panel";
    var panels$1 = {
    	general: {
    		title: "General",
    		cards: {
    			general: {
    				description: "This panel defines some global settings for the alarm.",
    				fields: {
    					disarm_after_trigger: {
    						heading: "Disarm after trigger",
    						description: "After trigger time has expired, disarm the alarm instead of returning to armed state."
    					},
    					enable_mqtt: {
    						heading: "Enable MQTT",
    						description: "Allow the alarm panel to be controlled through MQTT."
    					},
    					enable_master: {
    						heading: "Enable alarm master",
    						description: "Creates an entity for controlling all areas simultaneously."
    					}
    				},
    				actions: {
    					setup_mqtt: "MQTT Configuration",
    					setup_master: "Master Configuration"
    				}
    			},
    			modes: {
    				title: "Modes",
    				description: "This panel can be used to set up the arm modes of the alarm.",
    				fields: {
    					mode: {
    						armed_away: "Armed away will be used when all people left the house. All doors and windows allowing access to the house will be guarded, as well as motion sensors inside the house.",
    						armed_home: "Armed home (also known as armed stay) will be used when setting the alarm while people are in the house. All doors and windows allowing access to the house will be guarded, but not motion sensors inside the house.",
    						armed_night: "Armed night will be used when setting the alarm before going to sleep. All doors and windows allowing access to the house will be guarded, and selected motion sensors (downstairs) in the house.",
    						armed_custom_bypass: "An extra mode for defining your own security perimeter.",
    						enabled: "Enabled",
    						disabled: "Disabled"
    					},
    					exit_delay: {
    						heading: "Exit delay",
    						description: "When arming the alarm, within this time period the sensors will not trigger the alarm yet."
    					},
    					entry_delay: {
    						heading: "Entry delay",
    						description: "Delay time until the alarm is triggered after one of the sensors is activated."
    					},
    					trigger_time: {
    						heading: "Trigger time",
    						description: "Time during which the alarm will remain in the triggered state after activation."
    					}
    				}
    			},
    			mqtt: {
    				title: "MQTT configuration",
    				description: "This panel can be used for configuration of the MQTT interface.",
    				fields: {
    					state_topic: {
    						heading: "State topic",
    						description: "Topic on which state updates are published"
    					},
    					event_topic: {
    						heading: "Event topic",
    						description: "Topic on which alarm events are published"
    					},
    					command_topic: {
    						heading: "Command topic",
    						description: "Topic which Alarmo listens to for arm/disarm commands."
    					},
    					require_code: {
    						heading: "Require code",
    						description: "Require the code to be sent with the command."
    					},
    					state_payload: {
    						heading: "Configure payload per state",
    						item: "Define a payload for state '{state}'"
    					},
    					command_payload: {
    						heading: "Configure payload per command",
    						item: "Define a payload for command '{command}'"
    					}
    				}
    			},
    			areas: {
    				title: "Areas",
    				description: "Areas can be used for dividing your alarm system into multiple compartments.",
    				no_items: "There are no areas defined yet.",
    				table: {
    					remarks: "Remarks",
    					summary: "This area contains {summary_sensors} and {summary_automations}.",
    					summary_sensors: "{number} sensors",
    					summary_automations: "{number} automations"
    				},
    				actions: {
    					add: "Add"
    				}
    			}
    		},
    		dialogs: {
    			create_area: {
    				title: "New area",
    				fields: {
    					copy_from: "Copy settings from"
    				}
    			},
    			edit_area: {
    				title: "Editing area '{area}'",
    				name_warning: "Note: changing the name will change the entity ID"
    			},
    			remove_area: {
    				title: "Remove area?",
    				description: "Are you sure you want to remove this area? This area contains {sensors} sensors and {automations} automations, which will be removed as well."
    			},
    			edit_master: {
    				title: "Master configuration"
    			},
    			disable_master: {
    				title: "Disable master?",
    				description: "Are you sure you want to remove the alarm master? This area contains {automations} automations, which will be removed with this action."
    			}
    		}
    	},
    	sensors: {
    		title: "Sensors",
    		cards: {
    			sensors: {
    				description: "Currently configured sensors. Click on an entity to make changes.",
    				no_items: "There are no sensors to be displayed here.",
    				table: {
    					arm_modes: "Arm Modes",
    					always_on: "(Always)"
    				},
    				filter: {
    					label: "Filter by area",
    					no_area: "(No area)"
    				}
    			},
    			add_sensors: {
    				title: "Add Sensors",
    				description: "Add more sensors. Make sure that your sensors have a friendly_name, so you can identify them.",
    				no_items: "There are no available HA entities that can be configured for the alarm. Make sure to include entities of the type binary_sensor.",
    				table: {
    					type: "Detected type"
    				},
    				actions: {
    					add_to_alarm: "add to alarm",
    					show_all: "Show all"
    				}
    			},
    			editor: {
    				title: "Edit Sensor",
    				description: "Configuring the sensor settings of '{entity}'.",
    				fields: {
    					name: {
    						heading: "Name",
    						description: "Overwrite friendly name."
    					},
    					area: {
    						heading: "Area",
    						description: "Select an area which contains this sensor."
    					},
    					group: {
    						heading: "Group",
    						description: "Group with other sensors for combined triggering."
    					},
    					device_type: {
    						heading: "Device Type",
    						description: "Choose a device type to automatically apply appropriate settings.",
    						choose: {
    							door: {
    								name: "Door",
    								description: "A door, gate or other entrance that is used for entering/leaving the home."
    							},
    							window: {
    								name: "Window",
    								description: "A window, or a door not used for entering the house such as balcony."
    							},
    							motion: {
    								name: "Motion",
    								description: "Presence sensor or similar device having a delay between activations."
    							},
    							tamper: {
    								name: "Tamper",
    								description: "Detector of sensor cover removal, glass break sensor, etc."
    							},
    							environmental: {
    								name: "Environmental",
    								description: "Smoke/gas sensor, leak detector, etc. (not related to burglar protection)."
    							},
    							other: {
    								name: "Generic"
    							}
    						}
    					},
    					always_on: {
    						heading: "Always on",
    						description: "Sensor should always trigger the alarm."
    					},
    					modes: {
    						heading: "Enabled modes",
    						description: "Alarm modes in which this sensor is active."
    					},
    					arm_on_close: {
    						heading: "Arm after closing",
    						description: "After deactivation of this sensor, the remaining exit delay will automatically be skipped."
    					},
    					use_exit_delay: {
    						heading: "Use exit delay",
    						description: "Sensor is allowed to be active when the exit delay starts."
    					},
    					use_entry_delay: {
    						heading: "Use entry delay",
    						description: "Sensor activation triggers the alarm after the entry delay rather than directly."
    					},
    					allow_open: {
    						heading: "Allow open after arming",
    						description: "If the sensor is still active after the exit delay, this will not cause arming to fail."
    					},
    					auto_bypass: {
    						heading: "Bypass automatically",
    						description: "Exclude this sensor from the alarm if it is open while arming.",
    						modes: "Modes in which sensor may be bypassed"
    					},
    					trigger_unavailable: {
    						heading: "Trigger when unavailable",
    						description: "When the sensor state becomes 'unavailable', this will activate the sensor."
    					}
    				},
    				actions: {
    					toggle_advanced: "Advanced settings",
    					remove: "Remove",
    					setup_groups: "Setup groups"
    				},
    				errors: {
    					description: "Please correct the following errors:",
    					no_area: "No area is selected",
    					no_modes: "No modes are selected for which the sensor should be active",
    					no_auto_bypass_modes: "No modes are selected for the sensor may be automatically bypassed"
    				}
    			}
    		},
    		dialogs: {
    			manage_groups: {
    				title: "Manage sensor groups",
    				description: "In a sensor group multiple sensors must be activated within a time period before the alarm is triggered.",
    				no_items: "No groups yet",
    				actions: {
    					new_group: "New group"
    				}
    			},
    			create_group: {
    				title: "New sensor group",
    				fields: {
    					name: {
    						heading: "Name",
    						description: "Name for sensor group"
    					},
    					timeout: {
    						heading: "Time-out",
    						description: "Time period during which consecutive sensor activations triggers the alarm."
    					},
    					sensors: {
    						heading: "Sensors",
    						description: "Select the sensors which are contained by this group."
    					}
    				},
    				errors: {
    					invalid_name: "Invalid name provided.",
    					insufficient_sensors: "At least 2 sensors need to be selected."
    				}
    			},
    			edit_group: {
    				title: "Edit sensor group '{name}'"
    			}
    		}
    	},
    	codes: {
    		title: "Codes",
    		cards: {
    			codes: {
    				description: "Change settings for the code.",
    				fields: {
    					code_arm_required: {
    						heading: "Use arm code",
    						description: "Require a code for arming the alarm"
    					},
    					code_disarm_required: {
    						heading: "Use disarm code",
    						description: "Require a code for disarming the alarm"
    					},
    					code_format: {
    						heading: "Code format",
    						description: "Sets the input type for Lovelace alarm card.",
    						code_format_number: "pincode",
    						code_format_text: "password"
    					}
    				}
    			},
    			user_management: {
    				title: "User management",
    				description: "Each user has its own code to arm/disarm the alarm.",
    				no_items: "There are no users yet",
    				table: {
    					remarks: "Remarks",
    					administrator: "Administrator"
    				},
    				actions: {
    					new_user: "new user"
    				}
    			},
    			new_user: {
    				title: "Create new user",
    				description: "Users can be created for providing access to operating the alarm.",
    				fields: {
    					name: {
    						heading: "Name",
    						description: "Name of the user."
    					},
    					code: {
    						heading: "Code",
    						description: "Code for this user."
    					},
    					confirm_code: {
    						heading: "Confirm code",
    						description: "Repeat the code."
    					},
    					is_admin: {
    						heading: "User is administrator",
    						description: "Allow user to make changes"
    					},
    					can_arm: {
    						heading: "Allow code for arming",
    						description: "Entering this code activates the alarm"
    					},
    					can_disarm: {
    						heading: "Allow code for disarming",
    						description: "Entering this code deactivates the alarm"
    					},
    					is_override_code: {
    						heading: "Is override code",
    						description: "Entering this code will arm the alarm in force"
    					},
    					area_limit: {
    						heading: "Restricted areas",
    						description: "Limit user to control only the selected areas"
    					}
    				},
    				errors: {
    					no_name: "No name provided.",
    					no_code: "Code should have 4 characters/numbers minimum.",
    					code_mismatch: "The codes don't match."
    				}
    			},
    			edit_user: {
    				title: "Edit User",
    				description: "Change configuration for user '{name}'.",
    				fields: {
    					old_code: {
    						heading: "Current code",
    						description: "Current code, leave empty to leave unchanged."
    					}
    				}
    			}
    		}
    	},
    	actions: {
    		title: "Actions",
    		cards: {
    			notifications: {
    				title: "Notifications",
    				description: "Using this panel, you can manage notifications to be sent when during a certain alarm event.",
    				table: {
    					enabled: "Enabled",
    					no_items: "There are no notifications created yet."
    				},
    				actions: {
    					new_notification: "new notification"
    				},
    				filter: {
    					label: "Filter by area",
    					no_area: "(No area)"
    				}
    			},
    			actions: {
    				description: "This panel can be used to switch a device when the alarm state changes.",
    				table: {
    					no_items: "There are no actions created yet."
    				},
    				actions: {
    					new_action: "new action"
    				}
    			},
    			new_notification: {
    				title: "Configure notification",
    				description: "Receive a notification when arming/disarming the alarm, on activation, etc.",
    				trigger: "Condition",
    				action: "Task",
    				options: "Options",
    				fields: {
    					event: {
    						heading: "Event",
    						description: "When should the notification be sent",
    						choose: {
    							armed: {
    								name: "Alarm is armed",
    								description: "The alarm is succesfully armed"
    							},
    							disarmed: {
    								name: "Alarm is disarmed",
    								description: "The alarm is disarmed"
    							},
    							triggered: {
    								name: "Alarm is triggered",
    								description: "The alarm is triggered"
    							},
    							arm_failure: {
    								name: "Failed to arm",
    								description: "The arming of the alarm failed due to one or more open sensors"
    							},
    							arming: {
    								name: "Exit delay started",
    								description: "Exit delay started, ready to leave the house."
    							},
    							pending: {
    								name: "Entry delay started",
    								description: "Entry delay started, the alarm will trigger soon."
    							}
    						}
    					},
    					mode: {
    						heading: "Mode",
    						description: "Limit the action to specific arm modes (optional)"
    					},
    					title: {
    						heading: "Title",
    						description: "Title for the notification message"
    					},
    					message: {
    						heading: "Message",
    						description: "Content of the notification message",
    						insert_wildcard: "Insert wildcard",
    						placeholders: {
    							armed: "The alarm is set to {{arm_mode}}",
    							disarmed: "The alarm is now OFF",
    							triggered: "The alarm is triggered! Cause: {{open_sensors}}.",
    							arm_failure: "The alarm could not be armed right now, due to: {{open_sensors}}.",
    							arming: "The alarm will be armed soon, please leave the house.",
    							pending: "The alarm is about to trigger, disarm it quickly!"
    						}
    					},
    					open_sensors_format: {
    						heading: "Format for open_sensors wildcard",
    						description: "Choose which sensor information in inserted in the message",
    						options: {
    							"default": "Names and states",
    							short: "Names only"
    						}
    					},
    					target: {
    						heading: "Target",
    						description: "Device to send the push message to"
    					},
    					name: {
    						heading: "Name",
    						description: "Description for this notification",
    						placeholders: {
    							armed: "Notify {target} upon arming",
    							disarmed: "Notify {target} upon disarming",
    							triggered: "Notify {target} when triggered",
    							arm_failure: "Notify {target} on failure",
    							arming: "Notify {target} when leaving",
    							pending: "Notify {target} when arriving"
    						}
    					},
    					"delete": {
    						heading: "Delete automation",
    						description: "Permanently remove this automation"
    					}
    				},
    				actions: {
    					test: "Try it"
    				}
    			},
    			new_action: {
    				title: "Configure action",
    				description: "Switch lights or devices (such as sirens) when arming/disarming the alarm, on activation, etc.",
    				fields: {
    					event: {
    						heading: "Event",
    						description: "When should the action be executed"
    					},
    					area: {
    						heading: "Area",
    						description: "Area for which the event applies, leave empty to select the global alarm."
    					},
    					mode: {
    						heading: "Mode",
    						description: "Limit the action to specific arm modes (optional)"
    					},
    					entity: {
    						heading: "Entity",
    						description: "Entity to perform action on"
    					},
    					action: {
    						heading: "Action",
    						description: "Action to perform on the entity",
    						no_common_actions: "Actions can only be assigned in YAML mode for the selected entities."
    					},
    					name: {
    						heading: "Name",
    						description: "Description for this action",
    						placeholders: {
    							armed: "Set {entity} to {state} upon arming",
    							disarmed: "Set {entity} to {state} upon disarming",
    							triggered: "Set {entity} to {state} when triggered",
    							arm_failure: "Set {entity} to {state} on failure",
    							arming: "Set {entity} to {state} when leaving",
    							pending: "Set {entity} to {state} when arriving"
    						}
    					}
    				}
    			}
    		}
    	}
    };
    var en = {
    	common: common$1,
    	components: components$1,
    	title: title$1,
    	panels: panels$1
    };

    var en$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        common: common$1,
        components: components$1,
        title: title$1,
        panels: panels$1,
        'default': en
    });

    var common$2 = {
    	modes_long: {
    		armed_away: "Armado ausente",
    		armed_home: "Armado en casa",
    		armed_night: "Armado nocturno",
    		armed_custom_bypass: "Armado personalizado"
    	},
    	modes_short: {
    		armed_away: "Ausente",
    		armed_home: "En casa",
    		armed_night: "Nocturno",
    		armed_custom_bypass: "Personalizado"
    	}
    };
    var components$2 = {
    	time_slider: {
    		seconds: "seg",
    		minutes: "min",
    		infinite: "infinito",
    		none: "ninguno"
    	},
    	editor: {
    		ui_mode: "Editar en la UI",
    		yaml_mode: "Editar en YAML",
    		edit_in_yaml: "Edit in YAML"
    	}
    };
    var title$2 = "Panel de alarma";
    var panels$2 = {
    	general: {
    		title: "General",
    		cards: {
    			general: {
    				description: "Este panel define algunos ajustes globales para la alarma.",
    				fields: {
    					disarm_after_trigger: {
    						heading: "Desarmar después de disparar",
    						description: "Una vez transcurrido el tiempo de activación, desactivar la alarma en lugar de volver al estado de armada."
    					},
    					enable_mqtt: {
    						heading: "Habilitar MQTT",
    						description: "Permitir que el panel de alarma se controle a través de MQTT."
    					},
    					enable_master: {
    						heading: "Habilitar alarma maestra",
    						description: "Crea una entidad para controlar todas las áreas simultáneamente."
    					}
    				},
    				actions: {
    					setup_mqtt: "Configuración MQTT",
    					setup_master: "Configuración maestra"
    				}
    			},
    			modes: {
    				title: "Modos",
    				description: "Este panel se puede utilizar para configurar los modos de armado de la alarma.",
    				fields: {
    					mode: {
    						armed_away: "Armado ausente se utilizará cuando todas las personas salgan de la casa. Todas las puertas y ventanas que permitan el acceso a la casa estarán vigiladas, así como los sensores de movimiento dentro de la casa.",
    						armed_home: "Armado en casa (también conocido como estancia armada) se utilizará cuando se active la alarma mientras haya personas en la casa. Todas las puertas y ventanas que permitan el acceso a la casa estarán protegidas, pero no los sensores de movimiento dentro de la casa.",
    						armed_night: "Armado nocturno se usará al configurar la alarma antes de irse a dormir. Todas las puertas y ventanas que permitan el acceso a la casa estarán resguardadas y se seleccionarán sensores de movimiento en la casa.",
    						armed_custom_bypass: "Un modo adicional para definir su propio perímetro de seguridad.",
    						enabled: "Habilitar",
    						disabled: "Deshabilitar"
    					},
    					exit_delay: {
    						heading: "Retardo de salida",
    						description: "Al armar la alarma, dentro de este período de tiempo, los sensores aún no dispararán la alarma."
    					},
    					entry_delay: {
    						heading: "Retardo de entrada",
    						description: "Tiempo de retardo hasta que se activa la alarma después de que se active alguno de los sensores."
    					},
    					trigger_time: {
    						heading: "Tiempo de activación",
    						description: "Tiempo durante el cual sonará la sirena."
    					}
    				}
    			},
    			mqtt: {
    				title: "Configuración MQTT",
    				description: "Este panel se puede utilizar para configurar la interfaz MQTT.",
    				fields: {
    					state_topic: {
    						heading: "Tema del estado",
    						description: "Tema sobre el que se publican las actualizaciones de estado."
    					},
    					event_topic: {
    						heading: "Tema del evento",
    						description: "Tema sobre el que se publican los eventos de alarma."
    					},
    					command_topic: {
    						heading: "Tema del comando",
    						description: "Tema sobre el que se envían los comandos de armado / desarmado."
    					},
    					require_code: {
    						heading: "Requerir código",
    						description: "Requiere que el código se envíe con el comando."
    					},
    					state_payload: {
    						heading: "Configurar la carga útil por estado",
    						item: "Defina una carga útil para el estado '{state}'"
    					},
    					command_payload: {
    						heading: "Configurar la carga útil por comando",
    						item: "Defina una carga útil para el comando '{command}'"
    					}
    				}
    			},
    			areas: {
    				title: "Áreas",
    				description: "Las áreas se pueden utilizar para dividir su sistema de alarma en varios compartimentos.",
    				no_items: "Aún no hay áreas definidas.",
    				table: {
    					remarks: "Comentarios",
    					summary: "Esta área contiene {summary_sensors} y {summary_automations}.",
    					summary_sensors: "{number} sensores",
    					summary_automations: "{number} automatizaciones"
    				},
    				actions: {
    					add: "Agregar"
    				}
    			}
    		},
    		dialogs: {
    			create_area: {
    				title: "Nueva área",
    				fields: {
    					copy_from: "Copiar la configuración de"
    				}
    			},
    			edit_area: {
    				title: "Editando área '{area}'",
    				name_warning: "Nota: cambiar el nombre cambiará el ID de la entidad."
    			},
    			remove_area: {
    				title: "¿Eliminar área?",
    				description: "¿Está seguro de que desea eliminar esta área? Esta área contiene {sensors} sensores y {automations} automatizaciones que también se eliminarán."
    			},
    			edit_master: {
    				title: "Configuración maestra"
    			},
    			disable_master: {
    				title: "¿Deshabilitar maestro?",
    				description: "¿Está seguro de que desea eliminar la alarma maestra? Esta área contiene {sensors} sensores y {automations} automatizaciones que también se eliminarán."
    			}
    		}
    	},
    	sensors: {
    		title: "Sensores",
    		cards: {
    			sensors: {
    				description: "Sensores configurados actualmente. Haga clic en una entidad para realizar cambios.",
    				no_items: "No hay sensores para mostrar aquí.",
    				table: {
    					arm_modes: "Modos de armado",
    					always_on: "(Siempre)"
    				},
    				filter: {
    					label: "Filtrar por área",
    					no_area: "(Sin área)"
    				}
    			},
    			add_sensors: {
    				title: "Agregar  sensores",
    				description: "Agrega más sensores. Asegúrate de que tus sensores tengan un nombre amigable, para que puedas identificarlos.",
    				no_items: "No hay entidades HA disponibles que se puedan configurar para la alarma. Asegúrese de incluir entidades del tipo sensor binario.",
    				table: {
    					type: "Detected type"
    				},
    				actions: {
    					add_to_alarm: "agregar a la alarma",
    					show_all: "Mostrar todo"
    				}
    			},
    			editor: {
    				title: "Editar sensor",
    				description: "Configurando los ajustes del sensor de '{entity}'.",
    				fields: {
    					name: {
    						heading: "Nombre",
    						description: "Sobrescribir nombre descriptivo."
    					},
    					area: {
    						heading: "Área",
    						description: "Seleccione un área que contenga este sensor."
    					},
    					group: {
    						heading: "Group",
    						description: "Group with other sensors for combined triggering."
    					},
    					device_type: {
    						heading: "Tipo de dispositivo",
    						description: "Elija un tipo de dispositivo para aplicar automáticamente la configuración adecuada.",
    						choose: {
    							door: {
    								name: "Puerta",
    								description: "Una puerta, portón u otra entrada que se utilice para entrar / salir de la casa."
    							},
    							window: {
    								name: "Ventana",
    								description: "Una ventana o una puerta que no se use para entrar a la casa, como un balcón."
    							},
    							motion: {
    								name: "Movimiento",
    								description: "Sensor de presencia o dispositivo similar que tiene un retardo entre activaciones."
    							},
    							tamper: {
    								name: "Sabotaje",
    								description: "Detector de extracción de la cubierta del sensor, sensor de rotura de vidrio, etc."
    							},
    							environmental: {
    								name: "Medioambiental",
    								description: "Sensor de humo / gas, detector de fugas, etc. (no relacionado con la protección antirrobo)."
    							},
    							other: {
    								name: "Genérico"
    							}
    						}
    					},
    					always_on: {
    						heading: "Siempre encendido",
    						description: "El sensor siempre debe activar la alarma."
    					},
    					modes: {
    						heading: "Modos habilitados",
    						description: "Modos de alarma en los que este sensor está activo."
    					},
    					arm_on_close: {
    						heading: "Armar después de cerrar",
    						description: "Después de la desactivación de este sensor, el retardo de salida restante se saltará automáticamente."
    					},
    					use_exit_delay: {
    						heading: "Use exit delay",
    						description: "Sensor is allowed to be active when the exit delay starts."
    					},
    					use_entry_delay: {
    						heading: "Use entry delay",
    						description: "Sensor activation triggers the alarm after the entry delay rather than directly."
    					},
    					allow_open: {
    						heading: "Permitir abrir mientras se arma",
    						description: "Permita que este sensor se active poco después de salir de manera que no bloquee el armado."
    					},
    					auto_bypass: {
    						heading: "Omitir automáticamente",
    						description: "Excluya este sensor de la alarma si está abierto mientras se arma.",
    						modes: "Modes in which sensor may be bypassed"
    					},
    					trigger_unavailable: {
    						heading: "Activar cuando no esté disponible",
    						description: "Cuando el estado del sensor se vuelve 'no disponible', esto activará el sensor."
    					}
    				},
    				actions: {
    					toggle_advanced: "Configuración avanzada",
    					remove: "Eliminar",
    					setup_groups: "Setup groups"
    				},
    				errors: {
    					description: "Por favor, corrija los siguientes errores:",
    					no_area: "No se ha seleccionado ninguna área.",
    					no_modes: "No se han seleccionados modos para los que el sensor deba estar activo.",
    					no_auto_bypass_modes: "No modes are selected for the sensor may be automatically bypassed"
    				}
    			}
    		},
    		dialogs: {
    			manage_groups: {
    				title: "Manage sensor groups",
    				description: "In a sensor group multiple sensors must be activated within a time period before the alarm is triggered.",
    				no_items: "No groups yet",
    				actions: {
    					new_group: "New group"
    				}
    			},
    			create_group: {
    				title: "New sensor group",
    				fields: {
    					name: {
    						heading: "Name",
    						description: "Name for sensor group"
    					},
    					timeout: {
    						heading: "Time-out",
    						description: "Time period during which consecutive sensor activations triggers the alarm."
    					},
    					sensors: {
    						heading: "Sensors",
    						description: "Select the sensors which are contained by this group."
    					}
    				},
    				errors: {
    					invalid_name: "Invalid name provided.",
    					insufficient_sensors: "At least 2 sensors need to be selected."
    				}
    			},
    			edit_group: {
    				title: "Edit sensor group '{name}'"
    			}
    		}
    	},
    	codes: {
    		title: "Códigos",
    		cards: {
    			codes: {
    				description: "Cambiar la configuración del código.",
    				fields: {
    					code_arm_required: {
    						heading: "Usar código de armado",
    						description: "Requiere un código para armar la alarma."
    					},
    					code_disarm_required: {
    						heading: "Usar código de desarmado",
    						description: "Requiere un código para desarmar la alarma."
    					},
    					code_format: {
    						heading: "Formato del código",
    						description: "Establece el tipo de entrada para la tarjeta de la alarma.",
    						code_format_number: "código PIN",
    						code_format_text: "contraseña"
    					}
    				}
    			},
    			user_management: {
    				title: "Gestión de usuarios",
    				description: "Cada usuario tiene su propio código para armar / desarmar la alarma.",
    				no_items: "Aún no hay usuarios",
    				table: {
    					remarks: "Comentarios",
    					administrator: "Administrador"
    				},
    				actions: {
    					new_user: "nuevo usuario"
    				}
    			},
    			new_user: {
    				title: "Crear nuevo usuario",
    				description: "Se pueden crear usuarios para proporcionar acceso a la operación de la alarma.",
    				fields: {
    					name: {
    						heading: "Nombre",
    						description: "Nombre del usuario."
    					},
    					code: {
    						heading: "Código",
    						description: "Código para este usuario."
    					},
    					confirm_code: {
    						heading: "Confirmar código",
    						description: "Repite el código."
    					},
    					is_admin: {
    						heading: "El usuario es administrador",
    						description: "Permitir al usuario realizar cambios."
    					},
    					can_arm: {
    						heading: "Permitir código para armar",
    						description: "Al ingresar este código se activa la alarma."
    					},
    					can_disarm: {
    						heading: "Permitir código para desarmar",
    						description: "Al ingresar este código se desactiva la alarma."
    					},
    					is_override_code: {
    						heading: "Es un código de anulación",
    						description: "Al ingresar este código se forzará el armado de la alarma."
    					},
    					area_limit: {
    						heading: "Restricted areas",
    						description: "Limit user to control only the selected areas"
    					}
    				},
    				errors: {
    					no_name: "No se proporcionó ningún nombre.",
    					no_code: "El código debe tener 4 caracteres / números como mínimo.",
    					code_mismatch: "Los códigos no coinciden."
    				}
    			},
    			edit_user: {
    				title: "Editar usuario",
    				description: "Cambiar la configuración del usuario '{name}'.",
    				fields: {
    					old_code: {
    						heading: "Código actual",
    						description: "Código actual, déjelo en blanco para no modificarlo."
    					}
    				}
    			}
    		}
    	},
    	actions: {
    		title: "Acciones",
    		cards: {
    			notifications: {
    				title: "Notificaciones",
    				description: "Usando este panel, puede administrar las notificaciones que se enviarán durante un evento de alarma determinado.",
    				table: {
    					enabled: "Habilitado",
    					no_items: "Aún no se han creado notificaciones."
    				},
    				actions: {
    					new_notification: "nueva notificación"
    				},
    				filter: {
    					label: "Filtrar por área",
    					no_area: "(Sin área)"
    				}
    			},
    			actions: {
    				description: "Este panel se puede utilizar para cambiar un dispositivo cuando cambia el estado de alarma.",
    				table: {
    					no_items: "Aún no se han creado acciones."
    				},
    				actions: {
    					new_action: "nueva acción"
    				}
    			},
    			new_notification: {
    				title: "Crear notificación",
    				description: "Crear una nueva notificación.",
    				trigger: "Condition",
    				action: "Task",
    				options: "Options",
    				fields: {
    					event: {
    						heading: "Evento",
    						description: "Cuándo debe enviarse la notificación.",
    						choose: {
    							armed: {
    								name: "La alarma está armada",
    								description: "La alarma está correctamente armada."
    							},
    							disarmed: {
    								name: "La alarma está desarmada",
    								description: "La alarma está desarmada."
    							},
    							triggered: {
    								name: "Se ha disparado la alarma",
    								description: "La alarma se ha disparado."
    							},
    							arm_failure: {
    								name: "No se pudo armar",
    								description: "El armado de la alarma falló debido a uno o más sensores abiertos."
    							},
    							arming: {
    								name: "Se ha iniciado el retardo de salida",
    								description: "Se ha iniciado el retardo de salida, listo para salir de la casa."
    							},
    							pending: {
    								name: "Se ha iniciado el retardo de entrada",
    								description: "Se ha iniciado el retardo de entrada, la alarma se disparará pronto."
    							}
    						}
    					},
    					mode: {
    						heading: "Modo",
    						description: "Limita la acción a modos de armado específicos (opcional)."
    					},
    					title: {
    						heading: "Título",
    						description: "Título del mensaje de notificación."
    					},
    					message: {
    						heading: "Mensaje",
    						description: "Contenido del mensaje de notificación.",
    						insert_wildcard: "Insertar comodín",
    						placeholders: {
    							armed: "La alarma está configurada en {{arm_mode}}",
    							disarmed: "Ahora la alarma está APAGADA",
    							triggered: "¡Se ha disparado la alarma! Causa: {{open_sensors}}.",
    							arm_failure: "No se pudo armar la alarma en este momento debido a: {{open_sensors}}.",
    							arming: "Se armará pronto la alarma, por favor, salga de la casa.",
    							pending: "¡La alarma está a punto de dispararse, desarme rápidamente!"
    						}
    					},
    					open_sensors_format: {
    						heading: "Format for open_sensors wildcard",
    						description: "Choose which sensor information in inserted in the message",
    						options: {
    							"default": "Names and states",
    							short: "Names only"
    						}
    					},
    					target: {
    						heading: "Objetivo",
    						description: "Dispositivo al que enviar el mensaje push."
    					},
    					name: {
    						heading: "Nombre",
    						description: "Descripción de esta notificación.",
    						placeholders: {
    							armed: "Notificar a {target} al armar",
    							disarmed: "Notificar a {target} al desarmar",
    							triggered: "Notificar a {target} cuando se dispare",
    							arm_failure: "Notificar a {target} si falla",
    							arming: "Notificar a {target} cuando se vaya",
    							pending: "Notificar a {target} cuando llegue"
    						}
    					},
    					"delete": {
    						heading: "Eliminar automatización",
    						description: "Eliminar esta automatización de forma permanente"
    					}
    				},
    				actions: {
    					test: "Pruébelo"
    				}
    			},
    			new_action: {
    				title: "Crear acción",
    				description: "Este panel se puede utilizar para cambiar un dispositivo cuando cambia el estado de la alarma.",
    				fields: {
    					event: {
    						heading: "Evento",
    						description: "¿Cuándo debe ejecutarse la acción?"
    					},
    					area: {
    						heading: "Área",
    						description: "Área para la que se aplica el evento, déjelo en blanco para seleccionar la alarma global."
    					},
    					mode: {
    						heading: "Modo",
    						description: "Limita la acción a modos de armado específicos (opcional)"
    					},
    					entity: {
    						heading: "Entidad",
    						description: "Entidad sobre la que realizar la acción."
    					},
    					action: {
    						heading: "Acción",
    						description: "Acción a realizar en la entidad.",
    						no_common_actions: "Actions can only be assigned in YAML mode for the selected entities."
    					},
    					name: {
    						heading: "Nombre",
    						description: "Descripción de esta acción.",
    						placeholders: {
    							armed: "Establecer {entity} en {state} al armar",
    							disarmed: "Establecer {entity} en {state} al desarmar",
    							triggered: "Establecer {entity} en {state} cuando se dispare",
    							arm_failure: "Establecer {entity} en {state} si falla",
    							arming: "Establecer {entity} en {state} cuando se vaya",
    							pending: "Establecer {entity} en {state} cuando llegue"
    						}
    					}
    				}
    			}
    		}
    	}
    };
    var es = {
    	common: common$2,
    	components: components$2,
    	title: title$2,
    	panels: panels$2
    };

    var es$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        common: common$2,
        components: components$2,
        title: title$2,
        panels: panels$2,
        'default': es
    });

    var common$3 = {
    	modes_long: {
    		armed_away: "Valvestatud eemal",
    		armed_home: "Valvestatud kodus",
    		armed_night: "Valvestatud ööseks",
    		armed_custom_bypass: "Valikuline valvestus"
    	},
    	modes_short: {
    		armed_away: "Eemal",
    		armed_home: "Kodus",
    		armed_night: "Ööseks",
    		armed_custom_bypass: "Valikuline"
    	}
    };
    var components$3 = {
    	time_slider: {
    		seconds: "sek",
    		minutes: "min",
    		infinite: "piiranguta",
    		none: "puudub"
    	},
    	editor: {
    		ui_mode: "Kasutajaliides",
    		yaml_mode: "Koodiredaktor",
    		edit_in_yaml: "Edit in YAML"
    	}
    };
    var title$3 = "Alarm panel";
    var panels$3 = {
    	general: {
    		title: "Üldsätted",
    		cards: {
    			general: {
    				description: "Need seaded kehtivad kõikides valve olekutes.",
    				fields: {
    					disarm_after_trigger: {
    						heading: "Häire summutamine",
    						description: "Peale häire lõppu võta valvest maha miite ära valvesta uuesti."
    					},
    					enable_mqtt: {
    						heading: "Luba MQTT juhtimine",
    						description: "Luba nupustiku juhtimist MQTT abil."
    					},
    					enable_master: {
    						heading: "Luba põhivalvestus",
    						description: "Loob olemi mis haldab kõiki valvestamise alasid korraga."
    					}
    				},
    				actions: {
    					setup_mqtt: "MQTT seadistamine",
    					setup_master: "Põhivalvestuse sätted"
    				}
    			},
    			modes: {
    				title: "Režiimid",
    				description: "Selles vaates seadistatakse valvestamise režiime.",
    				fields: {
    					mode: {
    						armed_away: "Täielik valvestamine kui kedagi pole kodus. Kasutusel on kõik andurid.",
    						armed_home: "Valvestatud kodus ei kasuta liikumisandureid kuid väisuksed ja aknad on valve all.",
    						armed_night: "Valvestatud ööseks ei kasuta määratud liikumisandureid, välisperimeeter on valve all.",
    						armed_custom_bypass: "Valikulise valvestuse puhul saab määrata kasutatavad andurid.",
    						enabled: "Lubatud",
    						disabled: "Keelatud"
    					},
    					exit_delay: {
    						heading: "Ooteaeg valvestamisel",
    						description: "Viivitus enne valvestamise rakendumist."
    					},
    					entry_delay: {
    						heading: "Sisenemise viivitus",
    						description: "Viivitus sisenemisel enne häire rakendumist."
    					},
    					trigger_time: {
    						heading: "Häire kestus",
    						description: "Sireeni jne. aktiveerimise kestus."
    					}
    				}
    			},
    			mqtt: {
    				title: "MQTT sätted",
    				description: "MQTT parameetrite seadistamine.",
    				fields: {
    					state_topic: {
    						heading: "Oleku teema (topic)",
    						description: "Teema milles avaldatakse oleku muutused."
    					},
    					event_topic: {
    						heading: "Event topic",
    						description: "Topic on which alarm events are published"
    					},
    					command_topic: {
    						heading: "Käskude teema (topic)",
    						description: "Teema milles avaldatakse valvestamise käsud."
    					},
    					require_code: {
    						heading: "Nõua PIN koodi",
    						description: "Käskude edastamiseks on vajalik PIN kood."
    					},
    					state_payload: {
    						heading: "Määra olekute toimeandmed",
    						item: "Määra oleku '{state}' toimeandmed"
    					},
    					command_payload: {
    						heading: "Määra käskude toimeandmed",
    						item: "Määra käsu '{command}' toimeandmed"
    					}
    				}
    			},
    			areas: {
    				title: "Alad",
    				description: "Alasid kasutatakse elamise jagamiseks valvetsoonideks.",
    				no_items: "Valvestamise alad on loomata.",
    				table: {
    					remarks: "Ala teave",
    					summary: "See ala sisaldab {summary_sensors} ja {summary_automations}.",
    					summary_sensors: "{number} andur(it)",
    					summary_automations: "{number} automatiseering(ut)"
    				},
    				actions: {
    					add: "Lisa"
    				}
    			}
    		},
    		dialogs: {
    			create_area: {
    				title: "Uus ala",
    				fields: {
    					copy_from: "Kopeeri sätted allikast:"
    				}
    			},
    			edit_area: {
    				title: "Ala '{area}' muutmine",
    				name_warning: "NB! Nime muutmisel muutub ka olemi ID"
    			},
    			remove_area: {
    				title: "Kas kustutada ala?",
    				description: "Kas kustutada see ala? Ala kaasab andurid {sensors} ja automatiseeringud {automations} mis samuti eemaldatakse."
    			},
    			edit_master: {
    				title: "Põhiala seaded"
    			},
    			disable_master: {
    				title: "Kas keelata põhiala?",
    				description: "Kas keelata põhiala? Ala kaasab andurid {sensors} ja automatiseeringud {automations} mis samuti eemaldatakse.."
    			}
    		}
    	},
    	sensors: {
    		title: "Andurid",
    		cards: {
    			sensors: {
    				description: "Kasutusel olevad andurid. Klõpsa olemil, et seadistada.",
    				no_items: "Andureid pole lisatud. Alustuseks lisa mõni andur.",
    				table: {
    					arm_modes: "Valvestamise olek",
    					always_on: "(alati)"
    				},
    				filter: {
    					label: "Sordi ala järgi",
    					no_area: "(Alad puuduvad)"
    				}
    			},
    			add_sensors: {
    				title: "Andurite lisamine",
    				description: "Lisa veel andureid. Mõistlik on panna neile arusaadav nimi (friendly_name).",
    				no_items: "Puuduvad valvestamiseks sobivad Home Assistanti olemid. Lisatavad olemid peavad olema olekuandurid (binary_sensor).",
    				table: {
    					type: "Detected type"
    				},
    				actions: {
    					add_to_alarm: "Lisa valvesüsteemile",
    					show_all: "Kuva kõik andurid"
    				}
    			},
    			editor: {
    				title: "Andurite sätted",
    				description: "Muuda olemi '{entity}' sätteid.",
    				fields: {
    					name: {
    						heading: "Nimi",
    						description: "Muuda kuvatavat nime."
    					},
    					area: {
    						heading: "Ala",
    						description: "Vali ala kus see andur asub."
    					},
    					group: {
    						heading: "Group",
    						description: "Group with other sensors for combined triggering."
    					},
    					device_type: {
    						heading: "Seadme tüüp",
    						description: "Vali anduri tüüp, et automaatselt rakendada sobivad sätted.",
    						choose: {
    							door: {
    								name: "Uks",
    								description: "Uks, värav või muu piire mida kasutatakse sisenemiseks või väljumiseks."
    							},
    							window: {
    								name: "Aken",
    								description: "Aken või uks mida ei kasutata sisenemiseks nagu rõduuks."
    							},
    							motion: {
    								name: "Liikumisandur",
    								description: "Kohaloleku andurid mille rakendumiste vahel on viide."
    							},
    							tamper: {
    								name: "Terviklikkus",
    								description: "Anduri muukimine või klaasipurustusandur jms."
    							},
    							environmental: {
    								name: "Ohu andurid",
    								description: "Suitsu või gaasilekke andur, veeleke jne. (ei ole seotud sissetungimisega)."
    							},
    							other: {
    								name: "Tavaandur"
    							}
    						}
    					},
    					always_on: {
    						heading: "Alati kasutusel",
    						description: "Andur käivitab häire igas valve olekus."
    					},
    					modes: {
    						heading: "Valve olekute valik",
    						description: "Valve olekud kus seda andurit kasutatakse."
    					},
    					arm_on_close: {
    						heading: "Valvesta sulgemisel",
    						description: "Selle anduri rakendumisel valvestatakse kohe ilma viiveta."
    					},
    					use_exit_delay: {
    						heading: "Use exit delay",
    						description: "Sensor is allowed to be active when the exit delay starts."
    					},
    					use_entry_delay: {
    						heading: "Use entry delay",
    						description: "Sensor activation triggers the alarm after the entry delay rather than directly."
    					},
    					allow_open: {
    						heading: "Lahkumisviivitus",
    						description: "See andur ei aktiveeru enne lahkumisviivituse lõppu."
    					},
    					auto_bypass: {
    						heading: "Bypass automatically",
    						description: "Exclude this sensor from the alarm if it is open while arming.",
    						modes: "Modes in which sensor may be bypassed"
    					},
    					trigger_unavailable: {
    						heading: "Andurite saadavus",
    						description: "Käivita häire kui andur muutub kättesaamatuks."
    					}
    				},
    				actions: {
    					toggle_advanced: "Täpsemad sätted",
    					remove: "Eemalda",
    					setup_groups: "Setup groups"
    				},
    				errors: {
    					description: "Palun paranda jägmised vead:",
    					no_area: "Ala pole määratud",
    					no_modes: "Anduri tüüp on määramata, ei tea kuida kasutada",
    					no_auto_bypass_modes: "No modes are selected for the sensor may be automatically bypassed"
    				}
    			}
    		},
    		dialogs: {
    			manage_groups: {
    				title: "Manage sensor groups",
    				description: "In a sensor group multiple sensors must be activated within a time period before the alarm is triggered.",
    				no_items: "No groups yet",
    				actions: {
    					new_group: "New group"
    				}
    			},
    			create_group: {
    				title: "New sensor group",
    				fields: {
    					name: {
    						heading: "Name",
    						description: "Name for sensor group"
    					},
    					timeout: {
    						heading: "Time-out",
    						description: "Time period during which consecutive sensor activations triggers the alarm."
    					},
    					sensors: {
    						heading: "Sensors",
    						description: "Select the sensors which are contained by this group."
    					}
    				},
    				errors: {
    					invalid_name: "Invalid name provided.",
    					insufficient_sensors: "At least 2 sensors need to be selected."
    				}
    			},
    			edit_group: {
    				title: "Edit sensor group '{name}'"
    			}
    		}
    	},
    	codes: {
    		title: "Koodid",
    		cards: {
    			codes: {
    				description: "Valvestuskoodide muutmine.",
    				fields: {
    					code_arm_required: {
    						heading: "Valvestamine koodiga",
    						description: "Valvestamiseks tuleb sisestada kood"
    					},
    					code_disarm_required: {
    						heading: "Valvest vabastamise kood",
    						description: "Valvest vabastamiseks tulem sisestada kood"
    					},
    					code_format: {
    						heading: "Koodi vorming",
    						description: "Kasutajaliidese koodi tüübid.",
    						code_format_number: "PIN kood",
    						code_format_text: "Salasõna"
    					}
    				}
    			},
    			user_management: {
    				title: "Kasutajate haldus",
    				description: "Igal kasutajal on oma juhtkood.",
    				no_items: "Kasutajaid pole määratud",
    				table: {
    					remarks: "Märkused",
    					administrator: "Haldaja"
    				},
    				actions: {
    					new_user: "Uus kasutaja"
    				}
    			},
    			new_user: {
    				title: "Lisa uus kasutaja",
    				description: "Valvesüsteemi kasutaja lisamine.",
    				fields: {
    					name: {
    						heading: "Nimi",
    						description: "Kasutaja nimi."
    					},
    					code: {
    						heading: "Valvestuskood",
    						description: "Selle kasutaja kood."
    					},
    					confirm_code: {
    						heading: "Koodi kinnitamine",
    						description: "Sisesta sama kood uuesti."
    					},
    					is_admin: {
    						heading: "Kasutajal on haldusõigused",
    						description: "Kasutaja saab teha muudatusi."
    					},
    					can_arm: {
    						heading: "Tohib valvestada",
    						description: "Koodi sisestamine valvestab."
    					},
    					can_disarm: {
    						heading: "Tohib valvest maha võtta",
    						description: "Koodi sisestamine võtab valvest maha."
    					},
    					is_override_code: {
    						heading: "Alistuskood",
    						description: "Koodi sisestamine käivitab kohese häire"
    					},
    					area_limit: {
    						heading: "Restricted areas",
    						description: "Limit user to control only the selected areas"
    					}
    				},
    				errors: {
    					no_name: "Nimi puudub.",
    					no_code: "Kood peab olema vhemalt 4 tärki.",
    					code_mismatch: "Sisestatud koodid ei klapi."
    				}
    			},
    			edit_user: {
    				title: "Muuda kasutaja sätteid",
    				description: "Muuda kasutaja '{name}' sätteid.",
    				fields: {
    					old_code: {
    						heading: "Kehtiv kood",
    						description: "Kehtiv kood, jäta tühjaks kui ei taha muuta."
    					}
    				}
    			}
    		}
    	},
    	actions: {
    		title: "Toimingud",
    		cards: {
    			notifications: {
    				title: "Teavitused",
    				description: "Halda saadetavaid teavitusi",
    				table: {
    					enabled: "Lubatud",
    					no_items: "Teavitusi pole veel loodud."
    				},
    				actions: {
    					new_notification: "Uus teavitus"
    				},
    				filter: {
    					label: "Sordi alade järgi",
    					no_area: "(Alad puuduvad)"
    				}
    			},
    			actions: {
    				description: "Arenduses, mõeldud seadmete lülitamiseks.",
    				table: {
    					no_items: "Toiminguid pole veel määratud."
    				},
    				actions: {
    					new_action: "Uus toiming"
    				}
    			},
    			new_notification: {
    				title: "Loo teavitus",
    				description: "Uue teavituse loomine.",
    				trigger: "Condition",
    				action: "Task",
    				options: "Options",
    				fields: {
    					event: {
    						heading: "Sündmus",
    						description: "Mille puhul teavitada",
    						choose: {
    							armed: {
    								name: "Valvestatud",
    								description: "Valvestamine oli edukas"
    							},
    							disarmed: {
    								name: "Valvest maas",
    								description: "Valve mahavõtmine õnnestus"
    							},
    							triggered: {
    								name: "Häire",
    								description: "Valvesüsteem andis häire"
    							},
    							arm_failure: {
    								name: "Valvestamine nurjus",
    								description: "Valvestamine ei õnnestunud mõne anduri oleku või vea tõttu"
    							},
    							arming: {
    								name: "Valvestamise eelne viivitus algas",
    								description: "Algas valvestamise eelviide, majast võib lahkuda."
    							},
    							pending: {
    								name: "Sisenemise viide rakendus",
    								description: "Märgati sisenemist, häire rakendub peale viidet."
    							}
    						}
    					},
    					mode: {
    						heading: "Olek",
    						description: "Millises valve olekus teavitada (valikuline)"
    					},
    					title: {
    						heading: "Päis",
    						description: "Teavitussõnumi päis"
    					},
    					message: {
    						heading: "Sisu",
    						description: "Teavitussõnumi tekst",
    						insert_wildcard: "Insert wildcard",
    						placeholders: {
    							armed: "The alarm is set to {{arm_mode}}",
    							disarmed: "The alarm is now OFF",
    							triggered: "The alarm is triggered! Cause: {{open_sensors}}.",
    							arm_failure: "The alarm could not be armed right now, due to: {{open_sensors}}.",
    							arming: "The alarm will be armed soon, please leave the house.",
    							pending: "The alarm is about to trigger, disarm it quickly!"
    						}
    					},
    					open_sensors_format: {
    						heading: "Format for open_sensors wildcard",
    						description: "Choose which sensor information in inserted in the message",
    						options: {
    							"default": "Names and states",
    							short: "Names only"
    						}
    					},
    					target: {
    						heading: "Saaja",
    						description: "Seade millele edastada teavitus"
    					},
    					name: {
    						heading: "Nimi",
    						description: "Teavituse kirjeldus",
    						placeholders: {
    							armed: "Notify {target} upon arming",
    							disarmed: "Notify {target} upon disarming",
    							triggered: "Notify {target} when triggered",
    							arm_failure: "Notify {target} on failure",
    							arming: "Notify {target} when leaving",
    							pending: "Notify {target} when arriving"
    						}
    					},
    					"delete": {
    						heading: "Delete automation",
    						description: "Permanently remove this automation"
    					}
    				},
    				actions: {
    					test: "Try it"
    				}
    			},
    			new_action: {
    				title: "Loo toiming",
    				description: "Seadme oleku muutmine valve oleku muutmisel.",
    				fields: {
    					event: {
    						heading: "Sündmus",
    						description: "Millisel juhul käivitada toiming"
    					},
    					area: {
    						heading: "Ala",
    						description: "Ala millele sündmus rakendub, põhiala puhul jäta tühjaks."
    					},
    					mode: {
    						heading: "Olek",
    						description: "Millises valve olekus toiming käivitada (valikuline)"
    					},
    					entity: {
    						heading: "Olem",
    						description: "Toimingu olem"
    					},
    					action: {
    						heading: "Toiming",
    						description: "Olemi toiming",
    						no_common_actions: "Actions can only be assigned in YAML mode for the selected entities."
    					},
    					name: {
    						heading: "Nimi",
    						description: "Toimingu kirjeldus",
    						placeholders: {
    							armed: "Set {entity} to {state} upon arming",
    							disarmed: "Set {entity} to {state} upon disarming",
    							triggered: "Set {entity} to {state} when triggered",
    							arm_failure: "Set {entity} to {state} on failure",
    							arming: "Set {entity} to {state} when leaving",
    							pending: "Set {entity} to {state} when arriving"
    						}
    					}
    				}
    			}
    		}
    	}
    };
    var et = {
    	common: common$3,
    	components: components$3,
    	title: title$3,
    	panels: panels$3
    };

    var et$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        common: common$3,
        components: components$3,
        title: title$3,
        panels: panels$3,
        'default': et
    });

    var common$4 = {
    	modes_long: {
    		armed_away: "Activée en mode absence",
    		armed_home: "Activée en mode présence",
    		armed_night: "Activée en mode nuit",
    		armed_custom_bypass: "Activée en mode personnalisé"
    	},
    	modes_short: {
    		armed_away: "Absence",
    		armed_home: "Présence",
    		armed_night: "Nuit",
    		armed_custom_bypass: "Personnalisé"
    	}
    };
    var components$4 = {
    	time_slider: {
    		seconds: "sec",
    		minutes: "min",
    		infinite: "infini",
    		none: "Aucune"
    	},
    	editor: {
    		ui_mode: "Afficher l'éditeur visuel",
    		yaml_mode: "Afficher l'éditeur de code",
    		edit_in_yaml: "Editer en YAML"
    	}
    };
    var title$4 = "Configuration de l' alarme";
    var panels$4 = {
    	general: {
    		title: "Généraux",
    		cards: {
    			general: {
    				description: "Ce panneau définit les paramètres globaux de l'alarme.",
    				fields: {
    					disarm_after_trigger: {
    						heading: "Désactivation après déclenchement",
    						description: "Lors que le temps de fonctionnement de la sirène est écoulé, désactive l'alarme au lieu de la réactiver."
    					},
    					enable_mqtt: {
    						heading: "Utilisation avec MQTT",
    						description: "Permet au panneau d'alarme d'être contrôlé via MQTT."
    					},
    					enable_master: {
    						heading: "Activation de commande centralisée",
    						description: "Créer une entité pour piloter toutes les zone en même temps."
    					}
    				},
    				actions: {
    					setup_mqtt: "Configuration MQTT",
    					setup_master: "Configuration pricipale"
    				}
    			},
    			modes: {
    				title: "Modes",
    				description: "Ce panneau définit le mode de gestion pour chaque type d'activation.",
    				fields: {
    					mode: {
    						armed_away: "Ce mode sera utilisé lorsque toutes les personnes auront quitté la maison. Toutes les portes et fenêtres permettant l'accès à la maison seront surveillées, les détecteurs de mouvement à l'intérieur de la maison seront opérationnels.",
    						armed_home: "Ce mode sera utilisée lorsque des personnes sont dans la maison. Toutes les portes et fenêtres permettant l'accès à la maison seront surveillées (périmétrie), les détecteurs de mouvement à l'intérieur de la maison seront inopérants.",
    						armed_night: "Ce mode sera utilisée lors du réglage de l'alarme avant de s'endormir. Toutes les portes et fenêtres permettant l'accès à la maison seront surveillées, et les capteurs de mouvement sélectionnés (ex : rez de chaussée) dans la maison seront opérationnels.",
    						armed_custom_bypass: "Ce mode supplémentaire permet de définir votre propre périmètre de sécurité.",
    						enabled: "Actif",
    						disabled: "Inactif"
    					},
    					exit_delay: {
    						heading: "Délai pour sortir",
    						description: "Lors de l'activation, pendant cette période, les capteurs ne déclencheront pas l'alarme."
    					},
    					entry_delay: {
    						heading: "Délai pour entrer",
    						description: "Temps d'attente avant que l'alarme ne se déclenche après détection d'un des capteurs."
    					},
    					trigger_time: {
    						heading: "Temps de fonctionnement",
    						description: "Temps de fonctionnement de la sirène"
    					}
    				}
    			},
    			mqtt: {
    				title: "Configuration MQTT",
    				description: "Ce panneau peut être utilisé pour la configuration de l'interface MQTT.",
    				fields: {
    					state_topic: {
    						heading: "Etat de données",
    						description: "Donnée sur laquelle les mises à jour d'état sont publiées"
    					},
    					event_topic: {
    						heading: "Evènement de données",
    						description: "Donnée sur laquelle les évènements d'état sont publiés"
    					},
    					command_topic: {
    						heading: "Commande de donnée",
    						description: "Donnée sur laquelle les commandes d'armement / désarmement sont envoyées."
    					},
    					require_code: {
    						heading: "Code requis",
    						description: "Exige que le code soit envoyé avec la commande."
    					},
    					state_payload: {
    						heading: "Configurer une valeur par état",
    						item: "Définir une valeur par état '{state}'"
    					},
    					command_payload: {
    						heading: "Configurer une valeur par commande",
    						item: "Définir une valeur par commande '{command}'"
    					}
    				}
    			},
    			areas: {
    				title: "Zones",
    				description: "Les zones peuvent être utilisées pour diviser votre système d'alarme en plusieurs secteurs.",
    				no_items: "Il n'y a pas encore de zones définies.",
    				table: {
    					remarks: "Remarque",
    					summary: "Cette zone contient des {summary_sensors} et {summary_automations}.",
    					summary_sensors: "{number} capteurs",
    					summary_automations: "{number} automatisations"
    				},
    				actions: {
    					add: "Ajouter"
    				}
    			}
    		},
    		dialogs: {
    			create_area: {
    				title: "Nouvelle zone",
    				fields: {
    					copy_from: "Copier les paramètres"
    				}
    			},
    			edit_area: {
    				title: "Editer la zone '{area}'",
    				name_warning: "Note: Changer le nom, changera l'entity ID"
    			},
    			remove_area: {
    				title: "Suppression de zone?",
    				description: "Etes vous sur de vouloir supprimer cette zone? Cette zone contient {sensors} des capteurs et {automations} automatisations, qui seront également supprimés."
    			},
    			edit_master: {
    				title: "Configuration principale"
    			},
    			disable_master: {
    				title: "Désactiver la configuration principale?",
    				description: "Etes vous sur de vouloir supprimer la configuration principale? Cette zone contient {automations} automatisations, qui seront également supprimées."
    			}
    		}
    	},
    	sensors: {
    		title: "Capteurs",
    		cards: {
    			sensors: {
    				description: "Capteurs actuellement configurés. Cliquez sur une entité pour apporter des modifications.",
    				no_items: "Il n'y a pas encore de capteur ajouté à l'alarme. Assurez-vous de les ajouter d'abord.",
    				table: {
    					arm_modes: "Type d'activation",
    					always_on: "(Toujours)"
    				},
    				filter: {
    					label: "Filtrer par zone",
    					no_area: "(Aucune zone)"
    				}
    			},
    			add_sensors: {
    				title: "Ajouter un capteur",
    				description: "Ajoutez plus de capteurs. Assurez-vous que vos capteurs ont un nom personnalisé afin de pouvoir les identifier.",
    				no_items: "Aucune entité HA disponible ne peut être configurée pour l'alarme. Assurez-vous d'inclure les entités de type binary_sensor.",
    				table: {
    					type: "Type de détection"
    				},
    				actions: {
    					add_to_alarm: "Ajouter à l'alarme",
    					show_all: "Tout montrer"
    				}
    			},
    			editor: {
    				title: "Editer un capteur",
    				description: "Configurer les paramètres du capteur '{entity}'.",
    				fields: {
    					name: {
    						heading: "Nom",
    						description: "Remplacer le nom personnalisé (friendly name)."
    					},
    					area: {
    						heading: "Zone",
    						description: "Selectionner une zone contenant ce capteur."
    					},
    					group: {
    						heading: "Groupe",
    						description: "Grouper avec d'autres capteurs pour un déclenchement combiné."
    					},
    					device_type: {
    						heading: "Type de détection",
    						description: "Choisissez un type de détection pour appliquer automatiquement les paramètres appropriés.",
    						choose: {
    							door: {
    								name: "Porte",
    								description: "Une porte, un portail ou une autre entrée utilisée pour entrer / sortir de la maison."
    							},
    							window: {
    								name: "Fenêtre",
    								description: "Une fenêtre, ou une porte non utilisée pour entrer dans la maison comme un balcon."
    							},
    							motion: {
    								name: "Mouvement",
    								description: "Capteur de présence ou appareil similaire présentant un délai entre les activations."
    							},
    							tamper: {
    								name: "Effraction",
    								description: "Détection d'arrachage du capteur, capteur de bris de verre, etc.."
    							},
    							environmental: {
    								name: "Détecteur Environmental",
    								description: "Détecteur de fumée / gaz, détecteur de fuite, etc. (non lié à la protection anti-effraction)."
    							},
    							other: {
    								name: "Générique"
    							}
    						}
    					},
    					always_on: {
    						heading: "Toujours en service",
    						description: "Le capteur doit toujours déclencher l'alarme."
    					},
    					modes: {
    						heading: "Mode possible",
    						description: "Modes d'alarme dans lesquels ce capteur est actif."
    					},
    					arm_on_close: {
    						heading: "Activer après fermeture",
    						description: "Après la désactivation de ce capteur, le délai de sortie restant sera automatiquement ignoré."
    					},
    					use_exit_delay: {
    						heading: "Utiliser le délai de sortie",
    						description: "Le capteur est autorisé à être actif lorsque le délai de sortie commence."
    					},
    					use_entry_delay: {
    						heading: "Utiliser le délai d'entrée",
    						description: "L'activation du capteur déclenche l'alarme après le délai d'entrée plutôt qu'instantanément."
    					},
    					allow_open: {
    						heading: "Autoriser l'ouverture lors de l'activation",
    						description: "Permet à ce capteur d'être actif, peu de temps après votre départ afin qu'il ne bloque pas l'armement."
    					},
    					auto_bypass: {
    						heading: "Bypass automatique",
    						description: "Exclut ce capteur de l'alarme s'il est ouvert lors de l'armement.",
    						modes: "Modes dans lesquels le capteur peut être  ignoré"
    					},
    					trigger_unavailable: {
    						heading: "Déclenchement lorsqu'il n'est pas disponible",
    						description: "Lorsque l'état du capteur devient `` indisponible '', cela activera le capteur."
    					}
    				},
    				actions: {
    					toggle_advanced: "Paramètres avancées",
    					remove: "Supprimer",
    					setup_groups: "Configuration de Groupe"
    				},
    				errors: {
    					description: "Veuillez corriger les erreurs suivantes:",
    					no_area: "Aucune zone n'est sélectionnée",
    					no_modes: "Aucun mode sélectionné pour lequel le capteur doit être actif",
    					no_auto_bypass_modes: "Aucun mode n'est sélectionné car le capteur peut être automatiquement ignoré"
    				}
    			}
    		},
    		dialogs: {
    			manage_groups: {
    				title: "Gérer les groupes de capteurs",
    				description: "Dans un groupe de capteurs, plusieurs capteurs doivent être activés dans un laps de temps avant que l'alarme ne se déclenche.",
    				no_items: "Aucun groupe",
    				actions: {
    					new_group: "Nouveau groupe"
    				}
    			},
    			create_group: {
    				title: "Nouveau groupe de capteurs",
    				fields: {
    					name: {
    						heading: "Nom",
    						description: "Nom du nouveau groupe de capteurs"
    					},
    					timeout: {
    						heading: "Laps de temps",
    						description: "Période de temps pendant laquelle les activations consécutives du capteur déclenchent l'alarme."
    					},
    					sensors: {
    						heading: "Capteurs",
    						description: "Sélectionnez les capteurs qui sont contenus dans ce groupe."
    					}
    				},
    				errors: {
    					invalid_name: "Nom fourni non valide.",
    					insufficient_sensors: "Au moins 2 capteurs doivent être sélectionnés."
    				}
    			},
    			edit_group: {
    				title: "Editer le groupe de capteurs '{name}'"
    			}
    		}
    	},
    	codes: {
    		title: "Codes",
    		cards: {
    			codes: {
    				description: "Gestion des paramètres des codes.",
    				fields: {
    					code_arm_required: {
    						heading: "Utiliser un code pour l'activation",
    						description: "Code requis pour l'activation de l'alarme"
    					},
    					code_disarm_required: {
    						heading: "Utiliser un code pour la désactivation",
    						description: "Code requis pour la désactivation de l'alarme"
    					},
    					code_format: {
    						heading: "Format du code",
    						description: "Définit le type d'entrée pour la carte d'alarme Lovelace.",
    						code_format_number: "pincode",
    						code_format_text: "password"
    					}
    				}
    			},
    			user_management: {
    				title: "Gestion des utilisateurs",
    				description: "Chaque utilisateur a son propre code pour activer / désactiver l'alarme.",
    				no_items: "Il n'y a aucun utilisateur de défini",
    				table: {
    					remarks: "Remarque",
    					administrator: "Administrateur"
    				},
    				actions: {
    					new_user: "Nouvel utilisateur"
    				}
    			},
    			new_user: {
    				title: "Créer un nouvel utilisateur",
    				description: "Des utilisateurs peuvent être créés pour donner accès au fonctionnement de l'alarme.",
    				fields: {
    					name: {
    						heading: "Nom",
    						description: "Nom de l'utilisateur."
    					},
    					code: {
    						heading: "Code",
    						description: "Code personnel de l'utilisateur."
    					},
    					confirm_code: {
    						heading: "Confirmation du code",
    						description: "Répèter le  code."
    					},
    					is_admin: {
    						heading: "L'utilisateur est aussi administrateur",
    						description: "Autorise l'utilisateur à effectuer des changements."
    					},
    					can_arm: {
    						heading: "Demande de code pour l'activation",
    						description: "Entrer ce code pour activer l'alarme."
    					},
    					can_disarm: {
    						heading: "Demande de code pour désactivation",
    						description: "Entrer ce code pour désactiver l'alarme."
    					},
    					is_override_code: {
    						heading: "Code de sécurité",
    						description: "La saisie de ce code forcera l'activation l'alarme."
    					},
    					area_limit: {
    						heading: "Zones Restreintes",
    						description: "L'utilisateur ne peut contrôler uniquement les zones sélectionnées"
    					}
    				},
    				errors: {
    					no_name: "Aucun nom saisi.",
    					no_code: "Le code doit contenir 4 caractères/chiffres minimum.",
    					code_mismatch: "Les codes sont différents."
    				}
    			},
    			edit_user: {
    				title: "Editer l'utilisateur",
    				description: "Changer la  configuration pour l'utilisateur '{name}'.",
    				fields: {
    					old_code: {
    						heading: "Code utilisé",
    						description: "Code actuel, laissez vide pour ne rien changer."
    					}
    				}
    			}
    		}
    	},
    	actions: {
    		title: "Actions",
    		cards: {
    			notifications: {
    				title: "Notifications",
    				description: "À l'aide de ce panneau, vous pouvez gérer les notifications à envoyer lors d'un évènement d'alarme",
    				table: {
    					enabled: "Active",
    					no_items: "Il n'y a aucune notification de  créée."
    				},
    				actions: {
    					new_notification: "Nouvelle notification"
    				},
    				filter: {
    					label: "Filtrer par zone",
    					no_area: "(Aucune zone)"
    				}
    			},
    			actions: {
    				description: "Ce panneau est  utilisé pour changer d'état les appareils de votre choix.",
    				table: {
    					no_items: "Il n'y a aucune action de créer."
    				},
    				actions: {
    					new_action: "Nouvelle action"
    				}
    			},
    			new_notification: {
    				title: "Créer une notification",
    				description: "Créer une nouvelle notification.",
    				trigger: "Condition",
    				action: "Action",
    				options: "Options",
    				fields: {
    					event: {
    						heading: "Evènement",
    						description: "Détermine quand la notification doit être envoyée",
    						choose: {
    							armed: {
    								name: "Alarme activée ",
    								description: "l'alarme s'est correctement activée"
    							},
    							disarmed: {
    								name: "Alarme désactivée",
    								description: "L'alarme est désactivée"
    							},
    							triggered: {
    								name: "Alarme déclenchée",
    								description: "L'alarme est déclenchée"
    							},
    							arm_failure: {
    								name: "Armement impossible",
    								description: "L'armement est impossible dû à un ou plusieurs capteurs"
    							},
    							arming: {
    								name: "Délai de sortie activé",
    								description: "Le délai de sortie est activé, vous devez quitter la maison."
    							},
    							pending: {
    								name: "Délai d'entrée activé",
    								description: "Le délai d'entrée est activé, l'alarme va se déclencher."
    							}
    						}
    					},
    					mode: {
    						heading: "Mode",
    						description: "Limite la notification à un mode spécifique (optionnel)"
    					},
    					title: {
    						heading: "Titre",
    						description: "Titre du message de la notification"
    					},
    					message: {
    						heading: "Message",
    						description: "Contenu du message de la notification",
    						insert_wildcard: "Inserer la wildcard",
    						placeholders: {
    							armed: "L'alarme est réglée sur {{arm_mode}}",
    							disarmed: "L'alarme est maintenant désactivée",
    							triggered: "L'alarme est déclenchée! Cause: {{open_sensors}}.",
    							arm_failure: "L'alarme n'a pas pu être armée pour le moment, en cause: {{open_sensors}}.",
    							arming: "L'alarme sera bientôt armée, veuillez quitter la maison.",
    							pending: "L'alarme est sur le point de se déclencher, désarmez-la rapidement!"
    						}
    					},
    					open_sensors_format: {
    						heading: "Format for open_sensors wildcard",
    						description: "Choose which sensor information in inserted in the message",
    						options: {
    							"default": "Names and states",
    							short: "Names only"
    						}
    					},
    					target: {
    						heading: "Cible",
    						description: "Appareil recevant le message"
    					},
    					name: {
    						heading: "Nom",
    						description: "Description de la notification",
    						placeholders: {
    							armed: "Notification à l'armement de : {target}",
    							disarmed: "Notification au désarmement de : {target}",
    							triggered: "Notification au déclenchement de : {target}",
    							arm_failure: "Notification en cas d'échec de : {target}",
    							arming: "Notification en quittant de : {target}",
    							pending: "Notification au retour de : {target}"
    						}
    					},
    					"delete": {
    						heading: "Supprimer l'automatisme",
    						description: "Supprimer définitivement cet automatisme"
    					}
    				},
    				actions: {
    					test: "Essai"
    				}
    			},
    			new_action: {
    				title: "Créer une action",
    				description: "Ce panneau peut être utilisé pour commuter un appareil lorsque l'état de l'alarme change.",
    				fields: {
    					event: {
    						heading: "Evènement",
    						description: "Détermine quand l'action doit être exécutée"
    					},
    					area: {
    						heading: "Zone",
    						description: "Zone pour laquelle l'évènement s'applique, laissez vide pour sélectionner l'alarme globale."
    					},
    					mode: {
    						heading: "Mode",
    						description: "Limite l'action à un mode spécifique (optionnel)"
    					},
    					entity: {
    						heading: "Entité",
    						description: "Entité sur laquelle effectuer une action"
    					},
    					action: {
    						heading: "Action",
    						description: "Action à exécuter sur l'entité",
    						no_common_actions: "Les actions ne peuvent être affectées qu'en mode YAML pour les entités sélectionnées."
    					},
    					name: {
    						heading: "Nom",
    						description: "Description de  l'action",
    						placeholders: {
    							armed: "Mettre {entity} à {state} lors de l'armement",
    							disarmed: "Mettre {entity} à {state} lors du désarmement",
    							triggered: "Mettre {entity} à {state} lors du déclenchement de l'alarme",
    							arm_failure: "Mettre {entity} à {state} en cas d'échec de l'armement",
    							arming: "Mettre {entity} à {state} lors du départ de la maison",
    							pending: "Mettre {entity} à {state} lors du retour à la maison"
    						}
    					}
    				}
    			}
    		}
    	}
    };
    var fr = {
    	common: common$4,
    	components: components$4,
    	title: title$4,
    	panels: panels$4
    };

    var fr$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        common: common$4,
        components: components$4,
        title: title$4,
        panels: panels$4,
        'default': fr
    });

    var common$5 = {
    	modes_long: {
    		armed_away: "Modalità 'fuori casa' attiva",
    		armed_home: "Modalità 'in casa' attiva",
    		armed_night: "Modalità 'notte' attiva",
    		armed_custom_bypass: "Modalità 'personalizzato' attiva"
    	},
    	modes_short: {
    		armed_away: "Fuori casa",
    		armed_home: "In casa",
    		armed_night: "Notte",
    		armed_custom_bypass: "Personalizzato"
    	}
    };
    var components$5 = {
    	time_slider: {
    		seconds: "sec",
    		minutes: "min",
    		infinite: "infinito",
    		none: "niente"
    	},
    	editor: {
    		ui_mode: "Passa a UI",
    		yaml_mode: "Passa a YAML",
    		edit_in_yaml: "Edit in YAML"
    	}
    };
    var title$5 = "Alarm panel";
    var panels$5 = {
    	general: {
    		title: "Generali",
    		cards: {
    			general: {
    				description: "Questo pannello definisce alcune impostazioni da applicare alle modalità di allarme.",
    				fields: {
    					disarm_after_trigger: {
    						heading: "Disattiva allarme dopo l'attivazione",
    						description: "Dopo che il tempo di attivazione è scaduto, disattivare l'allarme invece di tornare allo stato inserito."
    					},
    					enable_mqtt: {
    						heading: "Abilita MQTT",
    						description: "Permetti al pannello allarme di essere controllato attraverso MQTT."
    					},
    					enable_master: {
    						heading: "Enable alarm master",
    						description: "Creates an entity for controlling all areas simultaneously."
    					}
    				},
    				actions: {
    					setup_mqtt: "Configurazione MQTT",
    					setup_master: "Master Configuration"
    				}
    			},
    			modes: {
    				title: "Modes",
    				description: "This panel can be used to set up the arm modes of the alarm.",
    				fields: {
    					mode: {
    						armed_away: "Modalità 'fuori casa': da utilizzare quando tutte le persone lasciano la casa. Tutti i sensori di porte e finestre che consentono l'accesso alla casa saranno attivi, così come i sensori di movimento all'interno della casa.",
    						armed_home: "Modalità 'in casa': da utilizzare quando si attiva l'allarme mentre le persone sono in casa. Tutti i sensori di porte e finestre che consentono l'accesso alla casa saranno attivi, ma non i sensori di movimento all'interno della casa.",
    						armed_night: "Modalità 'notte': da utilizzare quando si imposta la sveglia prima di andare a dormire. Tutti i sensori di porte e finestre che consentono l'accesso alla casa saranno attivi e sensori di movimento selezionati (ad esempio al piano di sotto) nella casa.",
    						armed_custom_bypass: "Modalità 'personalizzato': da utilizzare per definire una modalità di allarme specifica per le esigenze dell'utilizzatore.",
    						enabled: "Enabled",
    						disabled: "Disabled"
    					},
    					exit_delay: {
    						heading: "Tempo di preattivazione",
    						description: "Quando si attiva l'allarme, entro questo periodo di tempo i sensori non attiveranno ancora l'allarme."
    					},
    					entry_delay: {
    						heading: "Ritardo di attivazione",
    						description: "Tempo di ritardo fino allo scatto dell'allarme dopo l'attivazione di uno dei sensori."
    					},
    					trigger_time: {
    						heading: "Tempo di attivazione",
    						description: "Tempo durante il quale suonerà la sirena"
    					}
    				}
    			},
    			mqtt: {
    				title: "Configurazione MQTT",
    				description: "Questo pannello può essere usato per le impostazioni MQTT.",
    				fields: {
    					state_topic: {
    						heading: "Topic di stato",
    						description: "Topic su cui vengono pubblicati gli aggiornamenti di stato"
    					},
    					event_topic: {
    						heading: "Event topic",
    						description: "Topic on which alarm events are published"
    					},
    					command_topic: {
    						heading: "Topic di comando",
    						description: "Topic su cui vengono inviati i comandi di inserimento / disinserimento."
    					},
    					require_code: {
    						heading: "Richiedi Codice",
    						description: "Richiedi il codice da inviare con il comando."
    					},
    					state_payload: {
    						heading: "Configura payload per stato",
    						item: "Definisci un payload per lo stato '{state}'"
    					},
    					command_payload: {
    						heading: "Configura payload per comando",
    						item: "Definisci un payload per il comando '{command}'"
    					}
    				}
    			},
    			areas: {
    				title: "Areas",
    				description: "Areas can be used for dividing your alarm system into multiple compartments.",
    				no_items: "There are no areas defined yet.",
    				table: {
    					remarks: "Remarks",
    					summary: "This area contains {summary_sensors} and {summary_automations}.",
    					summary_sensors: "{number} sensors",
    					summary_automations: "{number} automations"
    				},
    				actions: {
    					add: "Add"
    				}
    			}
    		},
    		dialogs: {
    			create_area: {
    				title: "New area",
    				fields: {
    					copy_from: "Copy settings from"
    				}
    			},
    			edit_area: {
    				title: "Editing area '{area}'",
    				name_warning: "Note: changing the name will change the entity ID"
    			},
    			remove_area: {
    				title: "Remove area?",
    				description: "Are you sure you want to remove this area? This area contains {sensors} sensors and {automations} automations, which will be removed as well."
    			},
    			edit_master: {
    				title: "Master configuration"
    			},
    			disable_master: {
    				title: "Disable master?",
    				description: "Are you sure you want to remove the alarm master? This area contains {automations} automations, which will be removed with this action."
    			}
    		}
    	},
    	sensors: {
    		title: "Sensori",
    		cards: {
    			sensors: {
    				description: "Sensori attualmente configurati. Clicca sull'entità per modificare.",
    				no_items: "Non ci sono ancora sensori aggiunti a questo allarme. Assicurati di aggiungerli prima.",
    				table: {
    					arm_modes: "Modalità di attivazione",
    					always_on: "(Sempre)"
    				},
    				filter: {
    					label: "Filter by area",
    					no_area: "(No area)"
    				}
    			},
    			add_sensors: {
    				title: "Aggiungi Sensori",
    				description: "Aggiungi più sensori. Assicurati che i sensori abbiano un friendly_name (nome amichevole), in modo da identificarli più facilmente.",
    				no_items: "Non ci sono entità disponibili che possono essere configurate con l'allarme. Assicurati di includere entità del tipo binary_sensor (sensore binario).",
    				table: {
    					type: "Detected type"
    				},
    				actions: {
    					add_to_alarm: "aggiungi all'allarme",
    					show_all: "Mostra tutti"
    				}
    			},
    			editor: {
    				title: "Modifica Sensore",
    				description: "Configura le impostazioni del sensore '{entity}'.",
    				fields: {
    					name: {
    						heading: "Nome",
    						description: "Sovrascrivi friendly name."
    					},
    					area: {
    						heading: "Area",
    						description: "Select an area which contains this sensor."
    					},
    					group: {
    						heading: "Group",
    						description: "Group with other sensors for combined triggering."
    					},
    					device_type: {
    						heading: "Device Type",
    						description: "Choose a device type to automatically apply appropriate settings.",
    						choose: {
    							door: {
    								name: "Door",
    								description: "A door, gate or other entrance that is used for entering/leaving the home."
    							},
    							window: {
    								name: "Window",
    								description: "A window, or a door not used for entering the house such as balcony."
    							},
    							motion: {
    								name: "Motion",
    								description: "Presence sensor or similar device having a delay between activations."
    							},
    							tamper: {
    								name: "Tamper",
    								description: "Detector of sensor cover removal, glass break sensor, etc."
    							},
    							environmental: {
    								name: "Environmental",
    								description: "Smoke/gas sensor, leak detector, etc. (not related to burglar protection)."
    							},
    							other: {
    								name: "Generic"
    							}
    						}
    					},
    					always_on: {
    						heading: "Sempre attivo",
    						description: "Il sensore attiverà sempre l'allarme."
    					},
    					modes: {
    						heading: "Modalità attive",
    						description: "Modalità di allarme in cui il sensore risulta collegato."
    					},
    					arm_on_close: {
    						heading: "Arm after closing",
    						description: "After deactivation of this sensor, the remaining exit delay will automatically be skipped."
    					},
    					use_exit_delay: {
    						heading: "Use exit delay",
    						description: "Sensor is allowed to be active when the exit delay starts."
    					},
    					use_entry_delay: {
    						heading: "Use entry delay",
    						description: "Sensor activation triggers the alarm after the entry delay rather than directly."
    					},
    					allow_open: {
    						heading: "Permetti apertura",
    						description: "Consentire a questo sensore di rimanere attivo poco dopo essere usciti."
    					},
    					auto_bypass: {
    						heading: "Bypass automatically",
    						description: "Exclude this sensor from the alarm if it is open while arming.",
    						modes: "Modes in which sensor may be bypassed"
    					},
    					trigger_unavailable: {
    						heading: "Fai scattare l'allarme quando non disponibile",
    						description: "L'allarme scatterà quando lo stato del sensore diverrà 'non disponibile'."
    					}
    				},
    				actions: {
    					toggle_advanced: "Advanced settings",
    					remove: "Remove",
    					setup_groups: "Setup groups"
    				},
    				errors: {
    					description: "Please correct the following errors:",
    					no_area: "No area is selected",
    					no_modes: "No modes are selected for which the sensor should be active",
    					no_auto_bypass_modes: "No modes are selected for the sensor may be automatically bypassed"
    				}
    			}
    		},
    		dialogs: {
    			manage_groups: {
    				title: "Manage sensor groups",
    				description: "In a sensor group multiple sensors must be activated within a time period before the alarm is triggered.",
    				no_items: "No groups yet",
    				actions: {
    					new_group: "New group"
    				}
    			},
    			create_group: {
    				title: "New sensor group",
    				fields: {
    					name: {
    						heading: "Name",
    						description: "Name for sensor group"
    					},
    					timeout: {
    						heading: "Time-out",
    						description: "Time period during which consecutive sensor activations triggers the alarm."
    					},
    					sensors: {
    						heading: "Sensors",
    						description: "Select the sensors which are contained by this group."
    					}
    				},
    				errors: {
    					invalid_name: "Invalid name provided.",
    					insufficient_sensors: "At least 2 sensors need to be selected."
    				}
    			},
    			edit_group: {
    				title: "Edit sensor group '{name}'"
    			}
    		}
    	},
    	codes: {
    		title: "Codici",
    		cards: {
    			codes: {
    				description: "Modifica le impostazioni dei codici.",
    				fields: {
    					code_arm_required: {
    						heading: "Usa codice d'attivazione",
    						description: "Richiedi un codice per attivare l'allarme"
    					},
    					code_disarm_required: {
    						heading: "Usa codice di disattivazione",
    						description: "Richiedi un codice per disattivare l'allarme"
    					},
    					code_format: {
    						heading: "Formato del codice",
    						description: "Imposta il tipo di codice da digitare nella card di Lovelace.",
    						code_format_number: "codice numerico",
    						code_format_text: "password"
    					}
    				}
    			},
    			user_management: {
    				title: "Gestione utente",
    				description: "Ogni utente ha il suo codice per attivare/disattivare l'allarme.",
    				no_items: "Non è stato creato nessun utente per ora",
    				table: {
    					remarks: "Ruolo",
    					administrator: "Amministratore"
    				},
    				actions: {
    					new_user: "nuovo utente"
    				}
    			},
    			new_user: {
    				title: "Crea nuovo utente",
    				description: "Gli utenti potranno operare con l'allarme.",
    				fields: {
    					name: {
    						heading: "Nome",
    						description: "Nome dell'utente."
    					},
    					code: {
    						heading: "Codice operativo",
    						description: "Codice che utilizzerà quest'utente."
    					},
    					confirm_code: {
    						heading: "Ripeti codice operativo",
    						description: "Ripeti il codice operativo scelto."
    					},
    					is_admin: {
    						heading: "L'utente è un amministratore",
    						description: "Ciò consente al utente di effettuare modifiche al sistema di allarme"
    					},
    					can_arm: {
    						heading: "Utilizza codice per attivare l'allarme",
    						description: "Utilizza codice per attivare l'allarme"
    					},
    					can_disarm: {
    						heading: "Utilizza codice per disattivare l'allarme",
    						description: "Utilizza codice per disattivare l'allarme"
    					},
    					is_override_code: {
    						heading: "E' un codice di forzatura",
    						description: "Inserendo questo codice forzerai lo stato di attivazione dell'allarme"
    					},
    					area_limit: {
    						heading: "Restricted areas",
    						description: "Limit user to control only the selected areas"
    					}
    				},
    				errors: {
    					no_name: "Non hai inserito il nome.",
    					no_code: "Il codice deve avere almeno 4 numeri o caratteri.",
    					code_mismatch: "Il codice scelto non combacia, verifica il codice inserito."
    				}
    			},
    			edit_user: {
    				title: "Modifica Utente",
    				description: "Cambia impostazioni per l'utente '{name}'.",
    				fields: {
    					old_code: {
    						heading: "Modifica Codice",
    						description: "Codice attuale, lascia vuoto per non modificare."
    					}
    				}
    			}
    		}
    	},
    	actions: {
    		title: "Azioni",
    		cards: {
    			notifications: {
    				title: "Notifiche",
    				description: "Con questo pannello puoi gestire le notifiche da inviare quanto accade un determinato evento",
    				table: {
    					enabled: "Abilitato",
    					no_items: "Non è stata creata nessuna notifica per ora."
    				},
    				actions: {
    					new_notification: "nuova notifica"
    				},
    				filter: {
    					label: "Filter by area",
    					no_area: "(No area)"
    				}
    			},
    			actions: {
    				description: "Questo pannello è in fase di sviluppo. Sarà usato per cambiare lo stato di una o più entità.",
    				table: {
    					no_items: "Non è stata creata nessuna azione per ora."
    				},
    				actions: {
    					new_action: "nuova azione"
    				}
    			},
    			new_notification: {
    				title: "Crea notifica",
    				description: "Crea una nuova notifica.",
    				trigger: "Condition",
    				action: "Task",
    				options: "Options",
    				fields: {
    					event: {
    						heading: "Evento",
    						description: "Quando questa notifica deve essere inviata",
    						choose: {
    							armed: {
    								name: "Alarm is armed",
    								description: "The alarm is succesfully armed"
    							},
    							disarmed: {
    								name: "Alarm is disarmed",
    								description: "The alarm is disarmed"
    							},
    							triggered: {
    								name: "Alarm is triggered",
    								description: "The alarm is triggered"
    							},
    							arm_failure: {
    								name: "Failed to arm",
    								description: "The arming of the alarm failed due to one or more open sensors"
    							},
    							arming: {
    								name: "Exit delay started",
    								description: "Exit delay started, ready to leave the house."
    							},
    							pending: {
    								name: "Entry delay started",
    								description: "Entry delay started, the alarm will trigger soon."
    							}
    						}
    					},
    					mode: {
    						heading: "Modalità",
    						description: "Limita ad una specifica modalità di allarme (opzionale)"
    					},
    					title: {
    						heading: "Titolo",
    						description: "Titolo per il messaggio di notifica"
    					},
    					message: {
    						heading: "Messaggio",
    						description: "Contenuto del messaggio di notifica",
    						insert_wildcard: "Insert wildcard",
    						placeholders: {
    							armed: "The alarm is set to {{arm_mode}}",
    							disarmed: "The alarm is now OFF",
    							triggered: "The alarm is triggered! Cause: {{open_sensors}}.",
    							arm_failure: "The alarm could not be armed right now, due to: {{open_sensors}}.",
    							arming: "The alarm will be armed soon, please leave the house.",
    							pending: "The alarm is about to trigger, disarm it quickly!"
    						}
    					},
    					open_sensors_format: {
    						heading: "Format for open_sensors wildcard",
    						description: "Choose which sensor information in inserted in the message",
    						options: {
    							"default": "Names and states",
    							short: "Names only"
    						}
    					},
    					target: {
    						heading: "Destinatario",
    						description: "Dispositivo a cui inviare il messaggio di notifica"
    					},
    					name: {
    						heading: "Nome",
    						description: "Descrizione della notifica",
    						placeholders: {
    							armed: "Notify {target} upon arming",
    							disarmed: "Notify {target} upon disarming",
    							triggered: "Notify {target} when triggered",
    							arm_failure: "Notify {target} on failure",
    							arming: "Notify {target} when leaving",
    							pending: "Notify {target} when arriving"
    						}
    					},
    					"delete": {
    						heading: "Delete automation",
    						description: "Permanently remove this automation"
    					}
    				},
    				actions: {
    					test: "Try it"
    				}
    			},
    			new_action: {
    				title: "Crea azione",
    				description: "Questo pannello può essere usato per cambiare lo stato di un entità quando lo stato dell'allarme cambia.",
    				fields: {
    					event: {
    						heading: "Evento",
    						description: "Quando questa azione deve essere eseguita"
    					},
    					area: {
    						heading: "Area",
    						description: "Area for which the event applies, leave empty to select the global alarm."
    					},
    					mode: {
    						heading: "Modalità",
    						description: "Limita ad una specifica modalità di allarme (opzionale)"
    					},
    					entity: {
    						heading: "Entità",
    						description: "Entità su cui eseguire l'azione"
    					},
    					action: {
    						heading: "Azione",
    						description: "Azione che deve eseguire l'entità",
    						no_common_actions: "Actions can only be assigned in YAML mode for the selected entities."
    					},
    					name: {
    						heading: "Nome",
    						description: "Descrizione dell'azione",
    						placeholders: {
    							armed: "Set {entity} to {state} upon arming",
    							disarmed: "Set {entity} to {state} upon disarming",
    							triggered: "Set {entity} to {state} when triggered",
    							arm_failure: "Set {entity} to {state} on failure",
    							arming: "Set {entity} to {state} when leaving",
    							pending: "Set {entity} to {state} when arriving"
    						}
    					}
    				}
    			}
    		}
    	}
    };
    var it = {
    	common: common$5,
    	components: components$5,
    	title: title$5,
    	panels: panels$5
    };

    var it$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        common: common$5,
        components: components$5,
        title: title$5,
        panels: panels$5,
        'default': it
    });

    var common$6 = {
    	modes_long: {
    		armed_away: "Ingeschakeld Afwezig",
    		armed_home: "Ingeschakeld Thuis",
    		armed_night: "Ingeschakeld Nacht",
    		armed_custom_bypass: "Ingeschakeld Aangepast"
    	},
    	modes_short: {
    		armed_away: "Afwezig",
    		armed_home: "Thuis",
    		armed_night: "Nacht",
    		armed_custom_bypass: "Aangepast"
    	}
    };
    var components$6 = {
    	time_slider: {
    		seconds: "sec",
    		minutes: "min",
    		infinite: "oneindig",
    		none: "geen"
    	},
    	editor: {
    		ui_mode: "Naar UI",
    		yaml_mode: "Naar YAML",
    		edit_in_yaml: "In YAML bewerken"
    	}
    };
    var title$6 = "Alarmpaneel";
    var panels$6 = {
    	general: {
    		title: "Algemeen",
    		cards: {
    			general: {
    				description: "Dit paneel definieert enkele instellingen die van toepassing zijn op alle inschakelmodi.",
    				fields: {
    					disarm_after_trigger: {
    						heading: "Uitschakelen na activatie",
    						description: "Nadat de triggertijd is verstreken, schakelt u het alarm uit in plaats van terug te keren naar de ingeschakelde toestand."
    					},
    					enable_mqtt: {
    						heading: "MQTT inschakelen",
    						description: "Toestaan het alarmpaneel via MQTT aan te sturen."
    					},
    					enable_master: {
    						heading: "Master alarm inschakelen",
    						description: "Creëert een entiteit om alle gebieden tegelijkertijd te besturen."
    					}
    				},
    				actions: {
    					setup_mqtt: "MQTT Configuratie",
    					setup_master: "Master configuratie"
    				}
    			},
    			modes: {
    				title: "Modi",
    				description: "Dit paneel kan worden gebruikt om de inschakelmodi van het alarm in te stellen.",
    				fields: {
    					mode: {
    						armed_away: "Ingeschakeld weg wordt gebruikt als alle mensen het huis hebben verlaten. Alle deuren en ramen die toegang geven tot het huis worden bewaakt, evenals bewegingssensoren in het huis.",
    						armed_home: "Ingeschakeld thuis (ook wel ingeschakeld thuisblijven genoemd) wordt gebruikt bij het instellen van het alarm terwijl er mensen in huis zijn. Alle deuren en ramen die toegang geven tot het huis worden bewaakt, maar bewegingssensoren in het huis worden niet gebruikt.",
    						armed_night: "Ingeschakeld nacht wordt gebruikt bij het instellen van het alarm voordat u gaat slapen. Alle deuren en ramen die toegang geven tot het huis worden bewaakt, en geselecteerde bewegingssensoren (beneden) in het huis.",
    						armed_custom_bypass: "Een extra modus om uw eigen beveiligingsperimeter te definiëren.",
    						enabled: "Enabled",
    						disabled: "Disabled"
    					},
    					exit_delay: {
    						heading: "Vertrek vertraging",
    						description: "Bij het inschakelen van het alarm zullen de sensoren binnen deze tijdsperiode het alarm nog niet activeren."
    					},
    					entry_delay: {
    						heading: "Binnenkomst vertraging",
    						description: "Vertragingstijd totdat het alarm afgaat nadat een van de sensoren is geactiveerd."
    					},
    					trigger_time: {
    						heading: "Activeer tijd",
    						description: "Tijd waarin het alarm in de geactiveerde toestand blijft na activatie."
    					}
    				}
    			},
    			mqtt: {
    				title: "MQTT configuratie",
    				description: "Dit paneel kan worden gebruikt voor configuratie van de MQTT-interface.",
    				fields: {
    					state_topic: {
    						heading: "Toestand topic",
    						description: "Topic waarop statusupdates worden gepubliceerd"
    					},
    					event_topic: {
    						heading: "Gebeurtenis topic",
    						description: "Topic waarop gebeurtenissen worden gepubliceerd"
    					},
    					command_topic: {
    						heading: "Commando topic",
    						description: "Topic waarop commando's voor in- / uitschakelen worden verzonden."
    					},
    					require_code: {
    						heading: "Vereis code",
    						description: "Vereis dat de code wordt verzonden met de opdracht."
    					},
    					state_payload: {
    						heading: "Configureer de payload per toestand",
    						item: "Definieer een payload voor toestand '{state}'"
    					},
    					command_payload: {
    						heading: "Configureer een payload per commando",
    						item: "Definieer een payload voor commando '{command}'"
    					}
    				}
    			},
    			areas: {
    				title: "Gebieden",
    				description: "Gebieden kunnen worden gebruikt om uw alarmsysteem in meerdere compartimenten op te delen.",
    				no_items: "Er zijn nog geen gebieden gedefinieerd.",
    				table: {
    					remarks: "Opmerkingen",
    					summary: "Dit gebied bevat {summary_sensors} en {summary_automations}.",
    					summary_sensors: "{number} sensoren",
    					summary_automations: "{number} automatiseringen"
    				},
    				actions: {
    					add: "Toevoegen"
    				}
    			}
    		},
    		dialogs: {
    			create_area: {
    				title: "Nieuw gebied",
    				fields: {
    					copy_from: "Kopieer instellingen van"
    				}
    			},
    			edit_area: {
    				title: "Bewerken van gebied '{area}'",
    				name_warning: "Opmerking: als u de naam wijzigt, wordt de entiteits-ID gewijzigd"
    			},
    			remove_area: {
    				title: "Gebied verwijderen?",
    				description: "Weet u zeker dat u dit gebied wilt verwijderen? Dit gebied bevat {sensors} sensoren en {automations} automatiseringen, die ook zullen worden verwijderd."
    			},
    			edit_master: {
    				title: "Master configuratie"
    			},
    			disable_master: {
    				title: "Master uitschakelen?",
    				description: "Weet u zeker dat u het master alarm wilt verwijderen? Dit gebied bevat {automations} automatiseringen, die met deze actie worden verwijderd."
    			}
    		}
    	},
    	sensors: {
    		title: "Sensoren",
    		cards: {
    			sensors: {
    				description: "Momenteel geconfigureerde sensoren. Klik op een entiteit om wijzigingen aan te brengen.",
    				no_items: "Er zijn nog geen sensoren aan het alarm toegevoegd. Zorg ervoor dat u ze eerst toevoegt.",
    				table: {
    					arm_modes: "Inschakelmodi",
    					always_on: "(Altijd)"
    				},
    				filter: {
    					label: "Filter op gebied",
    					no_area: "(Geen gebied)"
    				}
    			},
    			add_sensors: {
    				title: "Voeg sensoren toe",
    				description: "Voeg meer sensoren toe. Zorg ervoor dat uw sensoren een friendly_name hebben, zodat u ze kunt identificeren.",
    				no_items: "Er zijn geen beschikbare HA-entiteiten die voor het alarm kunnen worden geconfigureerd. Zorg ervoor dat u entiteiten van het type binary_sensor opneemt.",
    				table: {
    					type: "Gedetecteerd type"
    				},
    				actions: {
    					add_to_alarm: "Voeg aan alarm toe",
    					show_all: "Toon alle"
    				}
    			},
    			editor: {
    				title: "Wijzig Sensor",
    				description: "Configureren van de sensorinstellingen van '{entity}'.",
    				fields: {
    					name: {
    						heading: "Naam",
    						description: "Overschrijf vriendelijke naam."
    					},
    					area: {
    						heading: "Gebied",
    						description: "Selecteer een gebied dat deze sensor bevat."
    					},
    					group: {
    						heading: "Groep",
    						description: "Groepeer met andere sensors voor gecombineerde triggers."
    					},
    					device_type: {
    						heading: "Apparaat Type",
    						description: "Kies een apparaattype om automatisch de juiste instellingen toe te passen.",
    						choose: {
    							door: {
    								name: "Deur",
    								description: "Een deur, poort of andere ingang die wordt gebruikt voor het betreden/verlaten van de woning."
    							},
    							window: {
    								name: "Raam",
    								description: "Een raam of een deur die niet wordt gebruikt om het huis binnen te komen, zoals een balkon."
    							},
    							motion: {
    								name: "Beweging",
    								description: "Aanwezigheidssensor of soortgelijk apparaat met een vertraging tussen activeringen."
    							},
    							tamper: {
    								name: "Sabotage",
    								description: "Detector van verwijdering van sensorkap, glasbreuksensor, enz."
    							},
    							environmental: {
    								name: "Klimaat",
    								description: "Rook/gassensor, lekkage detector, etc. (niet gerelateerd aan inbraakbeveiliging)."
    							},
    							other: {
    								name: "Algemeen"
    							}
    						}
    					},
    					always_on: {
    						heading: "Altijd aan",
    						description: "Een sensor moet altijd het alarm activeren."
    					},
    					modes: {
    						heading: "Ingeschakelde modi",
    						description: "Alarmmodi waarin deze sensor actief is."
    					},
    					arm_on_close: {
    						heading: "Inschakelen na sluiten",
    						description: "Na deactivering van deze sensor wordt de resterende vertrek vertraging automatisch overgeslagen."
    					},
    					use_exit_delay: {
    						heading: "Vertragingstijd bij vertrek",
    						description: "De sensor mag actief zijn wanneer de vertrekperiode wordt gestart."
    					},
    					use_entry_delay: {
    						heading: "Vertragingstijd bij binnenkomst",
    						description: "Als de sensor actief wordt, activeert deze het alarm pas na de vertragingstijd voor binnenkomst."
    					},
    					allow_open: {
    						heading: "Sta open toe tijdens het inschakelen",
    						description: "Sta toe dat deze sensor kort na het verlaten actief is, zodat hij het inschakelen niet blokkeert."
    					},
    					auto_bypass: {
    						heading: "Automatisch omzeilen",
    						description: "Elimineer de sensor als deze actief is tijdens het inschakelen van het alarm.",
    						modes: "Modi waarin de sensor automatisch omzeild mag worden"
    					},
    					trigger_unavailable: {
    						heading: "Activeren indien niet beschikbaar",
    						description: "Wanneer de sensorstatus 'niet beschikbaar' wordt, wordt de sensor geactiveerd."
    					}
    				},
    				actions: {
    					toggle_advanced: "Geavanceerde instellingen",
    					remove: "Verwijder",
    					setup_groups: "Configureer groepen"
    				},
    				errors: {
    					description: "Corrigeer de volgende fouten:",
    					no_area: "Er is geen gebied geselecteerd",
    					no_modes: "Er zijn geen modi geselecteerd waarvoor de sensor actief zou moeten zijn",
    					no_auto_bypass_modes: "Er zijn geen modi geselecteerd waarin de sensor automatisch omzeild mag worden"
    				}
    			}
    		},
    		dialogs: {
    			manage_groups: {
    				title: "Beheer sensorgroepen",
    				description: "In een sensorgroep moeten twee of meer sensoren worden geactiveerd binnen een tijdsperiode voordat het alarm wordt geactiveerd.",
    				no_items: "Nog geen groepen ingesteld.",
    				actions: {
    					new_group: "Nieuwe groep"
    				}
    			},
    			create_group: {
    				title: "Nieuwe sensorgroep",
    				fields: {
    					name: {
    						heading: "Naam",
    						description: "Naam voor sensorgroep."
    					},
    					timeout: {
    						heading: "Time-out",
    						description: "Tijdsperiode waarin meerdere sensoren moeten worden geactiveerd om het alarm te activeren."
    					},
    					sensors: {
    						heading: "Sensoren",
    						description: "Selecteer de sensoren die deel moeten uitmaken van deze groep."
    					}
    				},
    				errors: {
    					invalid_name: "Verkeerde naam opgegeven.",
    					insufficient_sensors: "Tenminste 2 sensoren moeten worden geselecteerd."
    				}
    			},
    			edit_group: {
    				title: "Bewerk sensorgroep '{name}'"
    			}
    		}
    	},
    	codes: {
    		title: "Codes",
    		cards: {
    			codes: {
    				description: "Wijzig de instellingen voor de code.",
    				fields: {
    					code_arm_required: {
    						heading: "Gebruik inschakel code",
    						description: "Vereist een code voor het inschakelen van het alarm"
    					},
    					code_disarm_required: {
    						heading: "Gebruik uitschakelcode",
    						description: "Vereist een code om het alarm uit te schakelen"
    					},
    					code_format: {
    						heading: "Code opmaak",
    						description: "Stelt het invoertype in voor de Lovelace alarmkaart.",
    						code_format_number: "pincode",
    						code_format_text: "wachtwoord"
    					}
    				}
    			},
    			user_management: {
    				title: "Gebruikersbeheer",
    				description: "Elke gebruiker heeft zijn eigen code om het alarm in/uit te schakelen.",
    				no_items: "Er zijn nog geen gebruikers",
    				table: {
    					remarks: "Opmerkingen",
    					administrator: "Beheerder"
    				},
    				actions: {
    					new_user: "nieuwe gebruiker"
    				}
    			},
    			new_user: {
    				title: "Maak een nieuwe gebruiker aan",
    				description: "Gebruikers kunnen worden aangemaakt om toegang te verlenen tot het bedienen van het alarm.",
    				fields: {
    					name: {
    						heading: "Naam",
    						description: "Naam van de gebruiker."
    					},
    					code: {
    						heading: "Code",
    						description: "Code voor deze gebruiker."
    					},
    					confirm_code: {
    						heading: "Bevestig de code",
    						description: "Herhaal de code."
    					},
    					is_admin: {
    						heading: "Gebruiker is beheerder",
    						description: "Sta de gebruiker toe om wijzigingen aan te brengen"
    					},
    					can_arm: {
    						heading: "Code toestaan voor inschakeling",
    						description: "Door deze code in te voeren, wordt het alarm geactiveerd"
    					},
    					can_disarm: {
    						heading: "Code toestaan voor uitschakelen",
    						description: "Door deze code in te voeren, wordt het alarm gedeactiveerd"
    					},
    					is_override_code: {
    						heading: "Is een forceer code",
    						description: "Als u deze code invoert, wordt het alarm geforceerd geactiveerd"
    					},
    					area_limit: {
    						heading: "Beperk gebieden",
    						description: "Beperk de gebruiker tot controle over alleen de gelesecteerde gebieden"
    					}
    				},
    				errors: {
    					no_name: "Geen naam opgegeven.",
    					no_code: "Code moet minimaal 4 tekens/cijfers bevatten.",
    					code_mismatch: "De codes komen niet overeen."
    				}
    			},
    			edit_user: {
    				title: "Wijzig Gebruiker",
    				description: "Wijzig de configuratie voor gebruiker '{name}'.",
    				fields: {
    					old_code: {
    						heading: "Huidige code",
    						description: "Huidige code, laat leeg om ongewijzigd te laten."
    					}
    				}
    			}
    		}
    	},
    	actions: {
    		title: "Acties",
    		cards: {
    			notifications: {
    				title: "Meldingen",
    				description: "Met dit paneel kunt u meldingen beheren die moeten worden verzonden tijdens een bepaalde alarmgebeurtenis",
    				table: {
    					enabled: "Actief",
    					no_items: "Er zijn nog geen notificaties aangemaakt."
    				},
    				actions: {
    					new_notification: "nieuwe melding"
    				},
    				filter: {
    					label: "Filter op gebied",
    					no_area: "(Geen gebied)"
    				}
    			},
    			actions: {
    				description: "Dit paneel kan worden gebruikt om een apparaat te schakelen wanneer de status van het alarm veranderd.",
    				table: {
    					no_items: "Er zijn nog geen acties gemaakt."
    				},
    				actions: {
    					new_action: "nieuwe actie"
    				}
    			},
    			new_notification: {
    				title: "Notificatie instellen",
    				description: "Ontvang een notificatie wanneer het alarm wordt in- of uitgeschakeld, wordt geactiveerd etc.",
    				trigger: "Conditie",
    				action: "Taak",
    				options: "Opties",
    				fields: {
    					event: {
    						heading: "Gebeurtenis",
    						description: "Wanneer moet de notificatie worden verzonden",
    						choose: {
    							armed: {
    								name: "Alarm is ingeschakeld",
    								description: "Het alarm is succesvol ingeschakeld"
    							},
    							disarmed: {
    								name: "Alarm is uitgeschakeld",
    								description: "Het alarm is uitgeschakeld"
    							},
    							triggered: {
    								name: "Alarm is afgegaan",
    								description: "Het alarm gaat af"
    							},
    							arm_failure: {
    								name: "Kan niet inschakelen",
    								description: "Het inschakelen van het alarm is mislukt vanwege een of meerdere blokkerende sensoren"
    							},
    							arming: {
    								name: "Vertrek",
    								description: "Vertrekvertraging ingegaan, tijd om het huis te verlaten."
    							},
    							pending: {
    								name: "Binnenkomst",
    								description: "Binnenkomstvertraging ingegaan, het alarm dient te worden uitgeschakeld."
    							}
    						}
    					},
    					mode: {
    						heading: "Modi",
    						description: "Beperk de actie tot specifieke inschakel modi."
    					},
    					title: {
    						heading: "Titel",
    						description: "Titel voor de notificatie"
    					},
    					message: {
    						heading: "Bericht",
    						description: "Tekst voor de notificatie",
    						insert_wildcard: "Wildcard invoegen",
    						placeholders: {
    							armed: "Het alarm is ingeschakeld op {{arm_mode}}",
    							disarmed: "Het alarm is nu uit",
    							triggered: "Het alarm is geactiveerd! Oorzaak: {{open_sensors}}.",
    							arm_failure: "Het alarm kon niet worden ingeschakeld. Oorzaak: {{open_sensors}}.",
    							arming: "Het alarm wordt ingeschakeld, verlaat het huis.",
    							pending: "Het alarm moet nu worden uitgeschakeld, anders wordt deze geactiveerd."
    						}
    					},
    					open_sensors_format: {
    						heading: "Opmaak voor open_sensors wildcard",
    						description: "Kies welke sensor informatie wordt weergegeven in het bericht",
    						options: {
    							"default": "Naam en status",
    							short: "Alleen naam"
    						}
    					},
    					target: {
    						heading: "Doel",
    						description: "Apparaat om het push-bericht naar te sturen"
    					},
    					name: {
    						heading: "Naam",
    						description: "Beschrijving voor deze notificatie",
    						placeholders: {
    							armed: "Stuur notificatie naar {target} bij inschakelen",
    							disarmed: "Stuur notificatie naar {target} bij uitschakelen",
    							triggered: "Stuur notificatie naar {target} bij alarm",
    							arm_failure: "Stuur notificatie naar {target} bij fout",
    							arming: "Stuur notificatie naar {target} bij vertrek",
    							pending: "Stuur notificatie naar {target} bij binnenkomst"
    						}
    					},
    					"delete": {
    						heading: "Automatisering verwijderen",
    						description: "Verwijder deze automatisering permanent"
    					}
    				},
    				actions: {
    					test: "Testen"
    				}
    			},
    			new_action: {
    				title: "Actie instellen",
    				description: "Schakel verlichting of apparaatuur (bijv. sirene) wanneer het alarm wordt in- of uitgeschakeld of wordt geactiveerd etc.",
    				fields: {
    					event: {
    						heading: "Gebeurtenis",
    						description: "Wanneer moet de actie worden uitgevoerd"
    					},
    					area: {
    						heading: "Gebied",
    						description: "Het gebied waarop de gebeurtenis van toepassing is, laat leeg om het algemene alarm te selecteren."
    					},
    					mode: {
    						heading: "Mode",
    						description: "Beperk de actie tot specifieke inschakel modi (optioneel)"
    					},
    					entity: {
    						heading: "Entiteit",
    						description: "Entiteit om actie op uit te voeren"
    					},
    					action: {
    						heading: "Actie",
    						description: "Actie die op de entiteit moet worden uitgevoerd",
    						no_common_actions: "Acties kunnen alleen worden toegewezen in de YAML modus voor de geselecteerde entiteiten."
    					},
    					name: {
    						heading: "Naam",
    						description: "Beschrijving voor deze actie",
    						placeholders: {
    							armed: "Schakel {entity} naar {state} bij inschakelen",
    							disarmed: "Schakel {entity} naar {state} bij uitschakelen",
    							triggered: "Schakel {entity} naar {state} bij alarm",
    							arm_failure: "Schakel {entity} naar {state} bij fout",
    							arming: "Schakel {entity} naar {state} bij vertrek",
    							pending: "Schakel {entity} naar {state} bij binnenkomst"
    						}
    					}
    				}
    			}
    		}
    	}
    };
    var nl = {
    	common: common$6,
    	components: components$6,
    	title: title$6,
    	panels: panels$6
    };

    var nl$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        common: common$6,
        components: components$6,
        title: title$6,
        panels: panels$6,
        'default': nl
    });

    var common$7 = {
    	modes_long: {
    		armed_away: "Larmat borta",
    		armed_home: "Larmat hemma",
    		armed_night: "Larmat natt",
    		armed_custom_bypass: "Larmat anpassad"
    	},
    	modes_short: {
    		armed_away: "Borta",
    		armed_home: "Hemma",
    		armed_night: "Natt",
    		armed_custom_bypass: "Anpassad"
    	}
    };
    var components$7 = {
    	time_slider: {
    		seconds: "sek",
    		minutes: "min",
    		infinite: "oändligt",
    		none: "inget"
    	},
    	editor: {
    		ui_mode: "Till UI",
    		yaml_mode: "Till YAML",
    		edit_in_yaml: "Redigera i YAML"
    	}
    };
    var title$7 = "Alarm panel";
    var panels$7 = {
    	general: {
    		title: "Generellt",
    		cards: {
    			general: {
    				description: "Denna panel definierar några globala inställningar för larmet.",
    				fields: {
    					disarm_after_trigger: {
    						heading: "Larma av efter trigger",
    						description: "Efter trigger tiden har gått ut, larma av larmet istället för att återgå till larmat läge."
    					},
    					enable_mqtt: {
    						heading: "Aktivera MQTT",
    						description: "Tillåt alarm panelen att kontrolleras via MQTT."
    					},
    					enable_master: {
    						heading: "Aktivera alarm master",
    						description: "Skapar en entity för att kontrollera alla areor samtidigt."
    					}
    				},
    				actions: {
    					setup_mqtt: "MQTT konfiguration",
    					setup_master: "Master konfiguration"
    				}
    			},
    			modes: {
    				title: "Lägen",
    				description: "Denna panel kan användas för att konfiguera larmets olika larmlägen.",
    				fields: {
    					mode: {
    						armed_away: "Larmat borta användas när alla personer lämnat huset. Alla dörrar och fönster som tillåter tillgång till huset kommer att larmas, det samma gäller rörelsesensorer inne i huset.",
    						armed_home: "Larmat hemma används när det finns personer kvar i huset. Alla dörrar och fönster som tillåter tillgång till huset kommer att larmas, dock inga rörelsesensorer inne i huset.",
    						armed_night: "Larmat natt används när du aktiverar larmen innan du lägger dig. Alla dörrar och fönster som tillåter tillgång till huset kommer att larmas, det samma gäller utvalda rörelsesensorer inne i huset.",
    						armed_custom_bypass: "Ett extra läge för för att definiera sin egen säkerhetsperimeter.",
    						enabled: "Aktiverat",
    						disabled: "Inaktiverat"
    					},
    					exit_delay: {
    						heading: "Lämna fördröjning",
    						description: "Efter att du har aktiverat larmet kommer dina sensorer inte trigga ditt larm inom denna tid."
    					},
    					entry_delay: {
    						heading: "Ankomst fördröjning",
    						description: "Fördröjning i tid tills att ditt larm triggas efter att en av dina sensorer har aktiverats."
    					},
    					trigger_time: {
    						heading: "Trigger tid",
    						description: "Tid som ditt larm kommer vara i triggat läge efter att ett larm har triggats."
    					}
    				}
    			},
    			mqtt: {
    				title: "MQTT konfiguration",
    				description: "Denna panel kan användas för att anpassa konfigurationen av MQTT.",
    				fields: {
    					state_topic: {
    						heading: "Status topic",
    						description: "Topic på vilket status uppdateringar publiceras till."
    					},
    					event_topic: {
    						heading: "Event topic",
    						description: "Topic på vilket alarm events publiceras till."
    					},
    					command_topic: {
    						heading: "Kommando topic",
    						description: "Topic på vilket Alarmo lyssnar på för larma/larma av kommandon."
    					},
    					require_code: {
    						heading: "Kräv kod",
    						description: "Kräv att koden ska skickas med kommandot."
    					},
    					state_payload: {
    						heading: "Konfiguera payload per state",
    						item: "Definiera en payload för state '{state}'"
    					},
    					command_payload: {
    						heading: "Konfiguera payload per kommando",
    						item: "Definiera en payload för kommando '{command}'"
    					}
    				}
    			},
    			areas: {
    				title: "Areor",
    				description: "Areor kan användas för att dela upp ditt larm till flera delar.",
    				no_items: "Det är inga areor definierade än.",
    				table: {
    					remarks: "Anmärkningar",
    					summary: "Denna area innehåller {summary_sensors} och {summary_automations}.",
    					summary_sensors: "{number} sensorer",
    					summary_automations: "{number} automationer"
    				},
    				actions: {
    					add: "Lägg till"
    				}
    			}
    		},
    		dialogs: {
    			create_area: {
    				title: "Ny area",
    				fields: {
    					copy_from: "Kopiera inställningarna från"
    				}
    			},
    			edit_area: {
    				title: "Redigera area '{area}'",
    				name_warning: "OBS: Ändrar du namn kommer entity ID att ändras"
    			},
    			remove_area: {
    				title: "Ta bort area?",
    				description: "Är du säker att du vill ta bort denna area? Denna area innehåller {sensors} sensorer och {automations} automationer, som också kommer att tas bort."
    			},
    			edit_master: {
    				title: "Master konfiguration"
    			},
    			disable_master: {
    				title: "Inaktivera master?",
    				description: "Är du säker att du vill ta bort master alarm? Denna area innehåller {automations} automationer, som kommer att tas bort med detta val."
    			}
    		}
    	},
    	sensors: {
    		title: "Sensorer",
    		cards: {
    			sensors: {
    				description: "Nuvarande konfiguerade sensorer. Klicka på ett entity för att göra förändringar.",
    				no_items: "Det finns inga sensorer att visa här.",
    				table: {
    					arm_modes: "Larmläge",
    					always_on: "(Alltid)"
    				},
    				filter: {
    					label: "Filtrera per area",
    					no_area: "(Ingen area)"
    				}
    			},
    			add_sensors: {
    				title: "Lägg till sensorer",
    				description: "Lägg till mer sensorer. Säkerhetsställ att dina sensorer har ett friendly_name, så du kan identifiera dem.",
    				no_items: "Det finns inga tillgängliga HA entities som kan konfigueras för larmet. Säkerhetsställ att inkludera entities av type binary_sensor.",
    				table: {
    					type: "Detekteringstyp"
    				},
    				actions: {
    					add_to_alarm: "Addera till larmet",
    					show_all: "Visa alla"
    				}
    			},
    			editor: {
    				title: "Justera Sensor",
    				description: "Justera inställningarna för sensor '{entity}'.",
    				fields: {
    					name: {
    						heading: "Namn",
    						description: "Skriv över friendly name."
    					},
    					area: {
    						heading: "Area",
    						description: "Välj en area som innehåller denna sensor."
    					},
    					group: {
    						heading: "Grupp",
    						description: "Gruppera med andra sensorer för kombinerad trigger."
    					},
    					device_type: {
    						heading: "Enhetstyp",
    						description: "Välj en enhetstyp att automatiskt applicera rekomenderade inställningar på.",
    						choose: {
    							door: {
    								name: "Dörr",
    								description: "En dörr, grind eller annan entre som används för att gå in/lämna hemmet."
    							},
    							window: {
    								name: "Fönster",
    								description: "Ett fönster eller en dörr som inte används för att gå in/lämna huset, t.ex. en balkongdörr."
    							},
    							motion: {
    								name: "Rörelse",
    								description: "Närvarosensor eller liknande som har fördröjning mellan sina aktiveringar."
    							},
    							tamper: {
    								name: "Manipulering",
    								description: "Detektor av sensorskydd, glaskross sensor etc."
    							},
    							environmental: {
    								name: "Miljö",
    								description: "Rök/gas sensor eller läckage sensor etc. (Inte relaterat till inbrottsskydd)."
    							},
    							other: {
    								name: "Generell"
    							}
    						}
    					},
    					always_on: {
    						heading: "Larma alltid",
    						description: "Sensorn ska alltid trigga larmet."
    					},
    					modes: {
    						heading: "Aktiverat läge",
    						description: "Larmläge när sensorn ska vara aktiv."
    					},
    					arm_on_close: {
    						heading: "Larma efter stängning",
    						description: "Resternade lämna fördröjning skippas automatiskt när denna sensor inaktiveras."
    					},
    					use_exit_delay: {
    						heading: "Anväld lämna fördröjning",
    						description: "Sensorn är tillåten att vara aktiv när lämna fördröjningen startar."
    					},
    					use_entry_delay: {
    						heading: "Använd ankomst fördröjning",
    						description: "Sensor aktivering triggar larmet after ankomst fördröjningen istället för direkt."
    					},
    					allow_open: {
    						heading: "Tillåt öppnad efter larmning.",
    						description: "Om sensorn fortfarande är aktiv efter lämna fördröjningen kommer det inte misslyckas att larma."
    					},
    					auto_bypass: {
    						heading: "Exkludera automatiskt",
    						description: "Exkludera denna sensor fr¨ån larmet open den är öppen vid pålarmning.",
    						modes: "Lägen där sensor kan bli exkluderad"
    					},
    					trigger_unavailable: {
    						heading: "Trigga vid otillgänglig",
    						description: "Detta kommer aktiveras när sensorns status blir 'unavailable'."
    					}
    				},
    				actions: {
    					toggle_advanced: "Avancerade inställningar",
    					remove: "Ta bort",
    					setup_groups: "Hantera grupper"
    				},
    				errors: {
    					description: "Var vänlig att justera följande fel:",
    					no_area: "Ingen area är vald",
    					no_modes: "Inga lägen är valda när sensorn ska vara aktiv",
    					no_auto_bypass_modes: "Inga lägen är valda när sensorn eventuellt automatiskt ska förbikopplas"
    				}
    			}
    		},
    		dialogs: {
    			manage_groups: {
    				title: "Hantera sensor grupper",
    				description: "I en sensor grupp måste flera sensorer bli aktiverade inom en tidsperiod för att larmet ska triggas.",
    				no_items: "Inga grupper ännu",
    				actions: {
    					new_group: "Ny grupp"
    				}
    			},
    			create_group: {
    				title: "Ny sensor grupp",
    				fields: {
    					name: {
    						heading: "Namn",
    						description: "Namn för sensor gruppen"
    					},
    					timeout: {
    						heading: "Time-out",
    						description: "Tidsperiod för de sammankopplade sensorernas aktivitet ska trigga larmet."
    					},
    					sensors: {
    						heading: "Sensorer",
    						description: "Välj sensorer som tillhöra gruppen."
    					}
    				},
    				errors: {
    					invalid_name: "Ogiltigt namn specificerat.",
    					insufficient_sensors: "Minst två sensorer behöver väljas."
    				}
    			},
    			edit_group: {
    				title: "Justera sensor grupp '{name}'"
    			}
    		}
    	},
    	codes: {
    		title: "Koder",
    		cards: {
    			codes: {
    				description: "Ändra inställningar för kod.",
    				fields: {
    					code_arm_required: {
    						heading: "Använd pålarmningskod",
    						description: "Kräv en kod för att aktivera larmet"
    					},
    					code_disarm_required: {
    						heading: "Använd avlarmningskod",
    						description: "Kräv en kod för att inaktivera larmet"
    					},
    					code_format: {
    						heading: "Kodformat",
    						description: "Ändra inmatningstyp för Lovelace alarm kortet.",
    						code_format_number: "pinkod",
    						code_format_text: "lösenord"
    					}
    				}
    			},
    			user_management: {
    				title: "Användarhantering",
    				description: "Varje användare har sin egen kod för aktivera/inaktivera larmet.",
    				no_items: "Det finns inga användae än",
    				table: {
    					remarks: "Anteckningar",
    					administrator: "Administratör"
    				},
    				actions: {
    					new_user: "ny användare"
    				}
    			},
    			new_user: {
    				title: "Skapa en ny användare",
    				description: "Users can be created for providing access to operating the alarm.",
    				fields: {
    					name: {
    						heading: "Namn",
    						description: "Namn på användaren"
    					},
    					code: {
    						heading: "Kod",
    						description: "Koden för användaren."
    					},
    					confirm_code: {
    						heading: "Repetra koden",
    						description: "Repetra koden."
    					},
    					is_admin: {
    						heading: "Användaren är administratör",
    						description: "Tillåt användaren att göra förändringar"
    					},
    					can_arm: {
    						heading: "Tillåt kod för pålarming",
    						description: "Denna kod aktiverar larmet"
    					},
    					can_disarm: {
    						heading: "Tillåt kod för avlarming",
    						description: "Denna kod inaktiverar larmet"
    					},
    					is_override_code: {
    						heading: "Tvingande kod",
    						description: "Denna kod tvingar aktivering av larmet"
    					},
    					area_limit: {
    						heading: "Begränsade areor",
    						description: "Begränsa användare att hantera utvalda areor"
    					}
    				},
    				errors: {
    					no_name: "Ingen namn angivet.",
    					no_code: "Koden ska vara minst 4 tecken eller siffror.",
    					code_mismatch: "Koderna matchar inte."
    				}
    			},
    			edit_user: {
    				title: "Justera användare",
    				description: "Ändra inställningar för användare '{name}'.",
    				fields: {
    					old_code: {
    						heading: "Nuvarande kod",
    						description: "Nuvarande kod, lämna tomt för att inte ändra."
    					}
    				}
    			}
    		}
    	},
    	actions: {
    		title: "Actions",
    		cards: {
    			notifications: {
    				title: "Notifikationer",
    				description: "Du använder denna panel för att hantera notifikationer som ska sändas vid utvalda larmevents.",
    				table: {
    					enabled: "Aktiverad",
    					no_items: "Det är inga notifikationer skapade än."
    				},
    				actions: {
    					new_notification: "ny notifikation"
    				},
    				filter: {
    					label: "Filtrera after area",
    					no_area: "(Ingen area)"
    				}
    			},
    			actions: {
    				description: "I denna panel kan du trigga olika beteende på enheter baserat på oliak events från ditt larm.",
    				table: {
    					no_items: "Det finns inga actions skapade ännu."
    				},
    				actions: {
    					new_action: "ny action"
    				}
    			},
    			new_notification: {
    				title: "Konfiguera notifikationer",
    				description: "Ta emot en notifikation när ditt larm aktivera/inaktiveras eller om en sensor aktiveras eller liknande.",
    				trigger: "Villkor",
    				action: "Task",
    				options: "Inställningar",
    				fields: {
    					event: {
    						heading: "Event",
    						description: "När ska notifikationen skickas",
    						choose: {
    							armed: {
    								name: "Larmet är aktiverat",
    								description: "Larmet aktiveras framgångsrikt"
    							},
    							disarmed: {
    								name: "Larmet är inaktiverat",
    								description: "Larmet är inaktiverat"
    							},
    							triggered: {
    								name: "Larmet har triggats",
    								description: "Larmet har triggats"
    							},
    							arm_failure: {
    								name: "Misslyckas att aktivera larm",
    								description: "Larmet misslyckas att kativeras på grund av någon sensor"
    							},
    							arming: {
    								name: "Lämna fördröjning startas",
    								description: "Lämna fördröjning startas, redo att lämna huset."
    							},
    							pending: {
    								name: "Ankomst fördröjning startas",
    								description: "Ankomst fördröjning startas, larmet kommer triggas snart."
    							}
    						}
    					},
    					mode: {
    						heading: "Läge",
    						description: "Begräns action till specifikt larmläge (valfritt)"
    					},
    					title: {
    						heading: "Titel",
    						description: "Titel för notifikationsmeddelandet"
    					},
    					message: {
    						heading: "Meddelande",
    						description: "Innehåll av notifikationsmeddelandet",
    						insert_wildcard: "Lägg in wildcard",
    						placeholders: {
    							armed: "Larmet har bytt status till {{arm_mode}}",
    							disarmed: "Larmet är nu AVSTÄNGT",
    							triggered: "Larmet har triggats! Anledning: {{open_sensors}}.",
    							arm_failure: "Larmet kunde inte aktiveras nu, detta på grund av: {{open_sensors}}.",
    							arming: "Larmet kommer aktiveras snart, lämna huset.",
    							pending: "Larmet kommer snart triggas, inaktivera larmet snarast!"
    						}
    					},
    					open_sensors_format: {
    						heading: "Format for open_sensors wildcard",
    						description: "Choose which sensor information in inserted in the message",
    						options: {
    							"default": "Names and states",
    							short: "Names only"
    						}
    					},
    					target: {
    						heading: "Mål",
    						description: "Enhet att skicka push-meddelandet till"
    					},
    					name: {
    						heading: "Namn",
    						description: "Beskrivning av notifikationen",
    						placeholders: {
    							armed: "Notifiera {target} vid aktivering av larm",
    							disarmed: "Notifiera {target} vid inaktivering av larm",
    							triggered: "Notifiera {target} vid triggning av larm",
    							arm_failure: "Notifiera {target} vid fel av larm",
    							arming: "Notifiera {target} vid utpassering",
    							pending: "Notifiera {target} vid ankomst"
    						}
    					},
    					"delete": {
    						heading: "Ta bort automation",
    						description: "Ta bort automation permanent"
    					}
    				},
    				actions: {
    					test: "Testa"
    				}
    			},
    			new_action: {
    				title: "Konfiguera action",
    				description: "Aktivera lampor eller andra enheter som sirener eller högatalare vid aktivering/inaktivering av larmet, triggning av larmet osv.",
    				fields: {
    					event: {
    						heading: "Event",
    						description: "När ska denna action aktiveras"
    					},
    					area: {
    						heading: "Area",
    						description: "Area som etta event ska appliceras på, lämna tomt om det ska gälla globalt."
    					},
    					mode: {
    						heading: "Läge",
    						description: "Begränsa action till specifika larmläge (frivilligt)"
    					},
    					entity: {
    						heading: "Entity",
    						description: "Entity att utföra action på"
    					},
    					action: {
    						heading: "Action",
    						description: "Action att utföra på entity",
    						no_common_actions: "Actions kan enbart bli applicerade i YAML läge för utvalda entities."
    					},
    					name: {
    						heading: "Namn",
    						description: "Beskrivning av denna action",
    						placeholders: {
    							armed: "Sätt {entity} till {state} vid aktivering av larmet",
    							disarmed: "Sätt {entity} till {state} vid inaktivering av larmet",
    							triggered: "Sätt {entity} till {state} när larmet triggas",
    							arm_failure: "Sätt {entity} till {state} vid fel av larmet",
    							arming: "Sätt {entity} till {state} vid utpassering",
    							pending: "Sätt {entity} till {state} vid ankomst"
    						}
    					}
    				}
    			}
    		}
    	}
    };
    var se = {
    	common: common$7,
    	components: components$7,
    	title: title$7,
    	panels: panels$7
    };

    var se$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        common: common$7,
        components: components$7,
        title: title$7,
        panels: panels$7,
        'default': se
    });

    var languages = {
        ca: ca$1,
        en: en$1,
        et: et$1,
        es: es$1,
        fr: fr$1,
        it: it$1,
        nl: nl$1,
        se: se$1
    };
    function localize(string, language, search = '', replace = '') {
        const lang = language.replace(/['"]+/g, '').replace('-', '_');
        var translated;
        try {
            translated = string.split('.').reduce((o, i) => o[i], languages[lang]);
        }
        catch (e) {
            translated = string.split('.').reduce((o, i) => o[i], languages['en']);
        }
        if (translated === undefined)
            translated = string.split('.').reduce((o, i) => o[i], languages['en']);
        if (search !== '' && replace !== '') {
            if (!Array.isArray(search))
                search = [search];
            if (!Array.isArray(replace))
                replace = [replace];
            for (let i = 0; i < search.length; i++) {
                translated = translated.replace(search[i], replace[i]);
            }
        }
        return translated;
    }

    var EArmModes;
    (function (EArmModes) {
        EArmModes["ArmedAway"] = "armed_away";
        EArmModes["ArmedHome"] = "armed_home";
        EArmModes["ArmedNight"] = "armed_night";
        EArmModes["ArmedCustom"] = "armed_custom_bypass";
    })(EArmModes || (EArmModes = {}));
    var EAlarmEvent;
    (function (EAlarmEvent) {
        EAlarmEvent["Armed"] = "armed";
        EAlarmEvent["Disarmed"] = "disarmed";
        EAlarmEvent["Triggered"] = "triggered";
        EAlarmEvent["ArmFailure"] = "arm_failure";
        EAlarmEvent["Arming"] = "arming";
        EAlarmEvent["Pending"] = "pending";
    })(EAlarmEvent || (EAlarmEvent = {}));

    const fetchConfig = (hass) => hass.callWS({
        type: 'alarmo/config',
    });
    const fetchSensors = (hass) => hass.callWS({
        type: 'alarmo/sensors',
    });
    const fetchUsers = (hass) => hass.callWS({
        type: 'alarmo/users',
    });
    const fetchAutomations = (hass) => hass.callWS({
        type: 'alarmo/automations',
    });
    const fetchSensorGroups = (hass) => hass.callWS({
        type: 'alarmo/sensor_groups',
    });
    const saveConfig = (hass, config) => {
        return hass.callApi('POST', 'alarmo/config', config);
    };
    const saveSensor = (hass, config) => {
        return hass.callApi('POST', 'alarmo/sensors', config);
    };
    const deleteSensor = (hass, entity_id) => {
        return hass.callApi('POST', 'alarmo/sensors', {
            entity_id: entity_id,
            remove: true,
        });
    };
    const saveUser = (hass, config) => {
        return hass.callApi('POST', 'alarmo/users', config);
    };
    const deleteUser = (hass, user_id) => {
        return hass.callApi('POST', 'alarmo/users', {
            user_id: user_id,
            remove: true,
        });
    };
    const saveAutomation = (hass, config) => {
        return hass.callApi('POST', 'alarmo/automations', config);
    };
    const deleteAutomation = (hass, automation_id) => {
        return hass.callApi('POST', 'alarmo/automations', {
            automation_id: automation_id,
            remove: true,
        });
    };
    const fetchAreas = (hass) => hass.callWS({
        type: 'alarmo/areas',
    });
    const saveArea = (hass, config) => {
        return hass.callApi('POST', 'alarmo/area', config);
    };
    const deleteArea = (hass, area_id) => {
        return hass.callApi('POST', 'alarmo/area', {
            area_id: area_id,
            remove: true,
        });
    };
    const saveSensorGroup = (hass, config) => {
        return hass.callApi('POST', 'alarmo/sensor_groups', config);
    };
    const deleteSensorGroup = (hass, group_id) => {
        return hass.callApi('POST', 'alarmo/sensor_groups', {
            group_id: group_id,
            remove: true,
        });
    };

    const VERSION = '1.7.6';
    var EArmModeIcons;
    (function (EArmModeIcons) {
        EArmModeIcons["ArmedAway"] = "hass:car-traction-control";
        EArmModeIcons["ArmedHome"] = "hass:home-outline";
        EArmModeIcons["ArmedNight"] = "hass:weather-night";
        EArmModeIcons["ArmedCustom"] = "hass:star-outline";
    })(EArmModeIcons || (EArmModeIcons = {}));
    var AlarmStates;
    (function (AlarmStates) {
        AlarmStates["STATE_ALARM_DISARMED"] = "disarmed";
        AlarmStates["STATE_ALARM_ARMED_HOME"] = "armed_home";
        AlarmStates["STATE_ALARM_ARMED_AWAY"] = "armed_away";
        AlarmStates["STATE_ALARM_ARMED_NIGHT"] = "armed_night";
        AlarmStates["STATE_ALARM_ARMED_CUSTOM_BYPASS"] = "armed_custom_bypass";
        AlarmStates["STATE_ALARM_PENDING"] = "pending";
        AlarmStates["STATE_ALARM_ARMING"] = "arming";
        AlarmStates["STATE_ALARM_DISARMING"] = "disarming";
        AlarmStates["STATE_ALARM_TRIGGERED"] = "triggered";
    })(AlarmStates || (AlarmStates = {}));
    var AlarmCommands;
    (function (AlarmCommands) {
        AlarmCommands["COMMAND_ALARM_DISARM"] = "disarm";
        AlarmCommands["COMMAND_ALARM_ARM_HOME"] = "arm_home";
        AlarmCommands["COMMAND_ALARM_ARM_AWAY"] = "arm_away";
        AlarmCommands["COMMAND_ALARM_ARM_NIGHT"] = "arm_night";
        AlarmCommands["COMMAND_ALARM_ARM_CUSTOM_BYPASS"] = "arm_custom_bypass";
    })(AlarmCommands || (AlarmCommands = {}));
    var ESensorTypes;
    (function (ESensorTypes) {
        ESensorTypes["Door"] = "door";
        ESensorTypes["Window"] = "window";
        ESensorTypes["Motion"] = "motion";
        ESensorTypes["Tamper"] = "tamper";
        ESensorTypes["Environmental"] = "environmental";
        ESensorTypes["Other"] = "other";
    })(ESensorTypes || (ESensorTypes = {}));
    var ESensorIcons;
    (function (ESensorIcons) {
        ESensorIcons["Door"] = "hass:door-closed";
        ESensorIcons["Window"] = "hass:window-closed";
        ESensorIcons["Motion"] = "hass:motion-sensor";
        ESensorIcons["Tamper"] = "hass:vibrate";
        ESensorIcons["Environmental"] = "hass:fire";
        ESensorIcons["Other"] = "hass:contactless-payment-circle-outline";
    })(ESensorIcons || (ESensorIcons = {}));
    var EAutomationTypes;
    (function (EAutomationTypes) {
        EAutomationTypes["Notification"] = "notification";
        EAutomationTypes["Action"] = "action";
    })(EAutomationTypes || (EAutomationTypes = {}));

    function getDomain(entity) {
        const entity_id = typeof entity == 'string' ? entity : entity.entity_id;
        return String(entity_id.split('.').shift());
    }
    function computeIcon(entity) {
        return Q(entity);
    }
    function prettyPrint(input) {
        input = input.replace('_', ' ');
        return input.charAt(0).toUpperCase() + input.slice(1);
    }
    function computeName(entity) {
        if (!entity)
            return '(unrecognized entity)';
        if (entity.attributes && entity.attributes.friendly_name)
            return entity.attributes.friendly_name;
        else
            return String(entity.entity_id.split('.').pop());
    }
    function isEqual(...arr) {
        return arr.every(e => JSON.stringify(e) === JSON.stringify(arr[0]));
    }
    function Unique(arr) {
        let res = [];
        arr.forEach(item => {
            if (!res.find(e => typeof item === "object" ? isEqual(e, item) : e === item))
                res.push(item);
        });
        return res;
    }
    function Without(array, item) {
        return array.filter(e => e !== item);
    }
    function pick(obj, keys) {
        if (!obj)
            return {};
        return Object.entries(obj)
            .filter(([key]) => keys.includes(key))
            .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {});
    }
    const omit = (obj, ...keys) => {
        const ret = {};
        let key;
        for (key in obj) {
            if (!(keys.includes(key))) {
                ret[key] = obj[key];
            }
        }
        return ret;
    };
    function isDefined(value) {
        return value !== null && value !== undefined;
    }
    function IsEqual(obj1, obj2) {
        if (obj1 === null || obj2 === null)
            return obj1 === obj2;
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        if (keys1.length !== keys2.length)
            return false;
        for (const key of keys1) {
            if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
                if (!IsEqual(obj1[key], obj2[key]))
                    return false;
            }
            else if (obj1[key] !== obj2[key])
                return false;
        }
        return true;
    }
    function showErrorDialog(ev, error) {
        const elem = ev.target;
        C$1(elem, 'show-dialog', {
            dialogTag: 'error-dialog',
            dialogImport: () => Promise.resolve().then(function () { return errorDialog; }),
            dialogParams: { error: error },
        });
    }
    function handleError(err, ev) {
        const errorMessage = T `
    <b>Something went wrong!</b><br />
    ${err.body.message
        ? T `
          ${err.body.message}<br /><br />
        `
        : ''}
    ${err.error}<br /><br />
    Please <a href="https://github.com/nielsfaber/alarmo/issues">report</a> the bug.
  `;
        showErrorDialog(ev, errorMessage);
    }
    const commandToState = (command) => {
        switch (command) {
            case AlarmCommands.COMMAND_ALARM_DISARM:
                return AlarmStates.STATE_ALARM_DISARMED;
            case AlarmCommands.COMMAND_ALARM_ARM_HOME:
                return AlarmStates.STATE_ALARM_ARMED_HOME;
            case AlarmCommands.COMMAND_ALARM_ARM_AWAY:
                return AlarmStates.STATE_ALARM_ARMED_AWAY;
            case AlarmCommands.COMMAND_ALARM_ARM_NIGHT:
                return AlarmStates.STATE_ALARM_ARMED_NIGHT;
            case AlarmCommands.COMMAND_ALARM_ARM_CUSTOM_BYPASS:
                return AlarmStates.STATE_ALARM_ARMED_CUSTOM_BYPASS;
            default:
                return undefined;
        }
    };
    const filterState = (state, config) => {
        if (!state)
            return false;
        switch (state) {
            case AlarmStates.STATE_ALARM_ARMED_AWAY:
                return config[EArmModes.ArmedAway].enabled;
            case AlarmStates.STATE_ALARM_ARMED_HOME:
                return config[EArmModes.ArmedHome].enabled;
            case AlarmStates.STATE_ALARM_ARMED_NIGHT:
                return config[EArmModes.ArmedNight].enabled;
            case AlarmStates.STATE_ALARM_ARMED_CUSTOM_BYPASS:
                return config[EArmModes.ArmedCustom].enabled;
            default:
                return true;
        }
    };
    function Assign(obj, changes) {
        Object.entries(changes).forEach(([key, val]) => {
            if (key in obj && typeof obj[key] == 'object' && obj[key] !== null)
                obj = Object.assign(Object.assign({}, obj), { [key]: Assign(obj[key], val) });
            else
                obj = Object.assign(Object.assign({}, obj), { [key]: val });
        });
        return obj;
    }
    function sortAlphabetically(a, b) {
        const stringVal = (s) => typeof s === 'object' ? stringVal(s.name) : s.trim().toLowerCase();
        return stringVal(a) < stringVal(b) ? -1 : 1;
    }

    const SubscribeMixin = (superClass) => {
        class SubscribeClass extends superClass {
            connectedCallback() {
                super.connectedCallback();
                this.__checkSubscribed();
            }
            disconnectedCallback() {
                super.disconnectedCallback();
                if (this.__unsubs) {
                    while (this.__unsubs.length) {
                        const unsub = this.__unsubs.pop();
                        if (unsub instanceof Promise) {
                            unsub.then(unsubFunc => unsubFunc());
                        }
                        else {
                            unsub();
                        }
                    }
                    this.__unsubs = undefined;
                }
            }
            updated(changedProps) {
                super.updated(changedProps);
                if (changedProps.has('hass')) {
                    this.__checkSubscribed();
                }
            }
            hassSubscribe() {
                return [];
            }
            __checkSubscribed() {
                if (this.__unsubs !== undefined || !this.isConnected || this.hass === undefined) {
                    return;
                }
                this.__unsubs = this.hassSubscribe();
            }
        }
        __decorate([
            e$3({ attribute: false })
        ], SubscribeClass.prototype, "hass", void 0);
        return SubscribeClass;
    };

    let TimeSlider = class TimeSlider extends h$2 {
        constructor() {
            super(...arguments);
            this.min = 0;
            this.max = 100;
            this.step = 10;
            this.value = 0;
            this.scaleFactor = 1;
            this.unit = '';
            this.disabled = false;
        }
        firstUpdated() {
            if (this.value > 0 && this.value < 60)
                this.unit = 'sec';
            if (this.unit == 'min')
                this.scaleFactor = 1 / 60;
            if (this.unit == 'min')
                this.step = 1;
        }
        render() {
            return T `
      <div class="container">
        <div class="prefix">
          <slot name="prefix"></slot>
        </div>
        <div class="slider">
          ${this.getSlider()}
        </div>
        <div class="value${this.disabled ? ' disabled' : ''}" @click=${this.toggleUnit}>
          ${this.getValue()}
        </div>
      </div>
    `;
        }
        getValue() {
            const value = Number(Math.round(this.value * this.scaleFactor));
            if (!value && this.zeroValue) {
                return this.zeroValue;
            }
            return `${value} ${this.getUnit()}`;
        }
        getUnit() {
            switch (this.unit) {
                case 'sec':
                    return localize('components.time_slider.seconds', this.hass.language);
                case 'min':
                    return localize('components.time_slider.minutes', this.hass.language);
                default:
                    return '';
            }
        }
        getSlider() {
            return T `
      <ha-slider
        pin
        min=${Math.round(this.min * this.scaleFactor)}
        max=${Math.round(this.max * this.scaleFactor)}
        step=${this.step}
        value=${Math.round(this.value * this.scaleFactor)}
        ?disabled=${this.disabled}
        @change=${this.updateValue}
      ></ha-slider>
    `;
        }
        updateValue(e) {
            const value = Number(e.target.value);
            this.value = Math.round(value / this.scaleFactor);
        }
        toggleUnit() {
            this.unit = this.unit == 'min' ? 'sec' : 'min';
            this.scaleFactor = this.unit == 'min' ? 1 / 60 : 1;
            this.step = this.unit == 'min' ? 1 : 10;
        }
    };
    TimeSlider.styles = i `
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
      --paper-slider-pin-start-color: var(--primary-color);
      width: 100%;
    }

    .disabled {
      color: var(--disabled-text-color);
    }
  `;
    __decorate([
        e$3({ type: Number })
    ], TimeSlider.prototype, "min", void 0);
    __decorate([
        e$3({ type: Number })
    ], TimeSlider.prototype, "max", void 0);
    __decorate([
        e$3({ type: Number })
    ], TimeSlider.prototype, "step", void 0);
    __decorate([
        e$3({ type: Number })
    ], TimeSlider.prototype, "value", void 0);
    __decorate([
        e$3()
    ], TimeSlider.prototype, "scaleFactor", void 0);
    __decorate([
        e$3({ type: String })
    ], TimeSlider.prototype, "unit", void 0);
    __decorate([
        e$3({ type: Boolean })
    ], TimeSlider.prototype, "disabled", void 0);
    __decorate([
        e$3({ type: String })
    ], TimeSlider.prototype, "zeroValue", void 0);
    TimeSlider = __decorate([
        n$4('time-slider')
    ], TimeSlider);

    let AlarmoSelect = class AlarmoSelect extends h$2 {
        constructor() {
            super(...arguments);
            this.label = '';
            this.items = [];
            this.clearable = false;
            this.icons = false;
            this.disabled = false;
            this.invalid = false;
            this.rowRenderer = (root, _owner, entry) => {
                if (!root.firstElementChild && this.icons) {
                    root.innerHTML = `
        <style>
          paper-icon-item {
              margin: -10px;
              padding: 0;
          }
          ha-icon {
              display: flex;
              flex: 0 0 40px;
              color: var(--state-icon-color);
          }
          :host([selected]) paper-icon-item {
            margin-left: 24px;
          }
        </style>
        <paper-icon-item>
          <ha-icon icon="" slot="item-icon"></ha-icon>
          <paper-item-body two-line>
            <div class="name"></div>
            <div secondary></div>
          </paper-item-body>
        </paper-icon-item>
        `;
                }
                else if (!root.firstElementChild) {
                    root.innerHTML = `
        <style>
          paper-item {
              margin: -10px;
              padding: 0;
          }
          :host([selected]) paper-item {
            margin-left: 24px;
          }
        </style>
        <paper-item>
          <paper-item-body two-line>
            <div class="name"></div>
            <div secondary></div>
          </paper-item-body>
        </paper-item>
        `;
                }
                root.querySelector('.name').textContent = entry.item.name;
                root.querySelector('[secondary]').textContent = entry.item.description || '';
                if (this.icons)
                    root.querySelector('ha-icon').icon = entry.item.icon;
            };
        }
        open() {
            this.updateComplete.then(() => {
                var _a, _b;
                (_b = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('vaadin-combo-box-light')) === null || _b === void 0 ? void 0 : _b.open();
            });
        }
        focus() {
            this.updateComplete.then(() => {
                var _a;
                ((_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('paper-input')).focus();
            });
        }
        shouldUpdate(changedProps) {
            if (changedProps.get('items')) {
                if (!IsEqual(this.items, changedProps.get('items')))
                    this.firstUpdated();
                else if (changedProps.size == 1)
                    return false;
            }
            return true;
        }
        firstUpdated() {
            this._comboBox.items = this.items;
        }
        render() {
            return T `
      <vaadin-combo-box-light
        item-value-path="value"
        item-id-path="value"
        item-label-path="name"
        .value=${this._value}
        .renderer=${this.rowRenderer}
        .allowCustomValue=${this.allowCustomValue}
        ?disabled=${this.disabled}
        @opened-changed=${this._openedChanged}
        @value-changed=${this._valueChanged}
      >
        <paper-input
          .label=${this.label}
          class="input"
          autocapitalize="none"
          autocomplete="off"
          autocorrect="off"
          spellcheck="false"
          ?disabled=${this.disabled}
          ?invalid=${this.invalid}
        >
          ${isDefined(this._value) && this.items.find(e => e.value == this._value)
            ? T `
                ${this.icons
                ? T `
                      <ha-icon slot="prefix" icon="${this.items.find(e => e.value == this._value).icon}"> </ha-icon>
                    `
                : ''}
                ${this.clearable
                ? T `
                      <ha-icon-button slot="suffix" class="clear-button" @click=${this._clearValue} icon="hass:close">
                        <ha-icon icon="hass:close"></ha-icon>
                      </ha-icon-button>
                    `
                : ''}
              `
            : ''}
          <ha-icon-button
            slot="suffix"
            class="toggle-button"
            icon="${this._opened ? 'hass:menu-up' : 'hass:menu-down'}"
          >
            <ha-icon icon="${this._opened ? 'hass:menu-up' : 'hass:menu-down'}"></ha-icon>
          </ha-icon-button>
        </paper-input>
      </vaadin-combo-box-light>
    `;
        }
        _clearValue(ev) {
            ev.stopPropagation();
            this._setValue('');
        }
        get _value() {
            return isDefined(this.value) ? this.value : '';
        }
        _openedChanged(ev) {
            this._opened = ev.detail.value;
        }
        _valueChanged(ev) {
            const newValue = ev.detail.value;
            if (newValue !== this._value) {
                this._setValue(newValue);
            }
        }
        _setValue(value) {
            this.value = value;
            setTimeout(() => {
                C$1(this, 'value-changed', { value });
            }, 0);
        }
        static get styles() {
            return i `
      :host {
        line-height: 1em;
      }
      paper-input > ha-icon-button {
        --mdc-icon-button-size: 24px;
        padding: 2px;
        color: var(--secondary-text-color);
      }
      [hidden] {
        display: none;
      }
      paper-input > ha-icon {
        display: flex;
        flex: 0 0 40px;
        color: var(--state-icon-color);
        width: 40px;
        height: 26px;
        align-items: center;
      }
    `;
        }
    };
    __decorate([
        e$3()
    ], AlarmoSelect.prototype, "label", void 0);
    __decorate([
        e$3()
    ], AlarmoSelect.prototype, "value", void 0);
    __decorate([
        e$3()
    ], AlarmoSelect.prototype, "items", void 0);
    __decorate([
        e$3()
    ], AlarmoSelect.prototype, "clearable", void 0);
    __decorate([
        e$3()
    ], AlarmoSelect.prototype, "icons", void 0);
    __decorate([
        e$3({ type: Boolean })
    ], AlarmoSelect.prototype, "disabled", void 0);
    __decorate([
        r$3()
    ], AlarmoSelect.prototype, "_opened", void 0);
    __decorate([
        e$3({ attribute: 'allow-custom-value', type: Boolean })
    ], AlarmoSelect.prototype, "allowCustomValue", void 0);
    __decorate([
        e$3({ type: Boolean })
    ], AlarmoSelect.prototype, "invalid", void 0);
    __decorate([
        o$5('vaadin-combo-box-light', true)
    ], AlarmoSelect.prototype, "_comboBox", void 0);
    AlarmoSelect = __decorate([
        n$4('alarmo-select')
    ], AlarmoSelect);

    let AlarmModeCard = class AlarmModeCard extends SubscribeMixin(h$2) {
        constructor() {
            super(...arguments);
            this.currentTab = 0;
        }
        hassSubscribe() {
            this._fetchData();
            return [this.hass.connection.subscribeMessage(() => this._fetchData(), { type: 'alarmo_config_updated' })];
        }
        async _fetchData() {
            if (!this.hass) {
                return;
            }
            this.areas = await fetchAreas(this.hass);
        }
        async firstUpdated() {
            this.areas = await fetchAreas(this.hass);
            this.selectedArea = Object.keys(this.areas)[0];
            this.data = Object.assign({}, this.areas[this.selectedArea].modes);
        }
        render() {
            if (!this.data)
                return T ``;
            const mode = Object.values(EArmModes)[this.currentTab];
            return T `
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${localize('panels.general.cards.modes.title', this.hass.language)}
          </div>

          ${Object.keys(this.areas).length > 1
            ? T `
              <alarmo-select
            .items=${Object.values(this.areas).map(e => Object({ value: e.area_id, name: e.name }))}
            value=${this.selectedArea}
            label=${this.hass.localize('ui.components.area-picker.area')}
            @value-changed=${(ev) => this.selectArea(ev.target.value)}

              </alarmo-select>
              `
            : ''}
        </div>
        <div class="card-content">
          ${localize('panels.general.cards.modes.description', this.hass.language)}
        </div>

        <mwc-tab-bar
          .activeIndex=${this.currentTab}
          @MDCTabBar:activated=${(ev) => (this.currentTab = Number(ev.detail.index))}
        >
          ${Object.entries(EArmModes).map(([k, v]) => T `
              <mwc-tab
                label="${localize(`common.modes_short.${v}`, this.hass.language)}"
                hasImageIcon
                stacked
                class="${this.data[v].enabled ? '' : 'disabled'}"
              >
                <ha-icon icon="${EArmModeIcons[k]}" slot="icon"></ha-icon>
              </mwc-tab>
            `)}
        </mwc-tab-bar>

        <settings-row .narrow=${this.narrow} .large=${true}>
          <span slot="heading">${localize(`common.modes_long.${mode}`, this.hass.language)}</span>
          <span slot="description"
            >${localize(`panels.general.cards.modes.fields.mode.${mode}`, this.hass.language)}</span
          >

          <div style="display: flex; margin: 10px 0px; justify-content: center; width: 100%">
            <mwc-button
              class="${this.data[mode].enabled ? 'active' : ''}"
              @click=${() => (this.data = { ...this.data, [mode]: { ...this.data[mode], enabled: true } })}
            >
              ${localize('panels.general.cards.modes.fields.mode.enabled', this.hass.language)}
            </mwc-button>
            <mwc-button
              class="${this.data[mode].enabled ? '' : 'active'}"
              @click=${() => (this.data = { ...this.data, [mode]: { ...this.data[mode], enabled: false } })}
            >
              ${localize('panels.general.cards.modes.fields.mode.disabled', this.hass.language)}
            </mwc-button>
          </div>
        </settings-row>

        ${this.data[mode].enabled
            ? T `
              <settings-row .narrow=${this.narrow}>
                <span slot="heading"
                  >${localize('panels.general.cards.modes.fields.exit_delay.heading', this.hass.language)}</span
                >
                <span slot="description"
                  >${localize('panels.general.cards.modes.fields.exit_delay.description', this.hass.language)}</span
                >
                <time-slider
                  .hass=${this.hass}
                  unit="sec"
                  max="180"
                  zeroValue=${localize('components.time_slider.none', this.hass.language)}
                  value=${this.data[mode].exit_time || 0}
                  @change=${(ev) => (this.data = {
                ...this.data,
                [mode]: { ...this.data[mode], exit_time: Number(ev.target.value) },
            })}
                >
                </time-slider>
              </settings-row>

              <settings-row .narrow=${this.narrow}>
                <span slot="heading"
                  >${localize('panels.general.cards.modes.fields.entry_delay.heading', this.hass.language)}</span
                >
                <span slot="description"
                  >${localize('panels.general.cards.modes.fields.entry_delay.description', this.hass.language)}</span
                >
                <time-slider
                  .hass=${this.hass}
                  unit="sec"
                  max="180"
                  zeroValue=${localize('components.time_slider.none', this.hass.language)}
                  value=${this.data[mode].entry_time || 0}
                  @change=${(ev) => (this.data = {
                ...this.data,
                [mode]: { ...this.data[mode], entry_time: Number(ev.target.value) },
            })}
                >
                </time-slider>
              </settings-row>

              <settings-row .narrow=${this.narrow}>
                <span slot="heading"
                  >${localize('panels.general.cards.modes.fields.trigger_time.heading', this.hass.language)}</span
                >
                <span slot="description"
                  >${localize('panels.general.cards.modes.fields.trigger_time.description', this.hass.language)}</span
                >
                <time-slider
                  .hass=${this.hass}
                  unit="min"
                  max="3600"
                  zeroValue=${localize('components.time_slider.infinite', this.hass.language)}
                  value=${this.data[mode].trigger_time || 0}
                  @change=${(ev) => (this.data = {
                ...this.data,
                [mode]: { ...this.data[mode], trigger_time: Number(ev.target.value) },
            })}
                >
                </time-slider>
              </settings-row>
            `
            : ''}

        <div class="card-actions">
          <mwc-button @click=${this.saveClick}>
            ${this.hass.localize('ui.common.save')}
          </mwc-button>
        </div>
      </ha-card>
    `;
        }
        selectArea(area_id) {
            if (area_id == this.selectedArea)
                return;
            this.selectedArea = area_id;
            this.data = Object.assign({}, this.areas[area_id].modes);
        }
        saveClick(ev) {
            saveArea(this.hass, { area_id: this.selectedArea, modes: this.data })
                .catch(e => handleError(e, ev))
                .then();
        }
    };
    AlarmModeCard.styles = commonStyle;
    __decorate([
        e$3()
    ], AlarmModeCard.prototype, "hass", void 0);
    __decorate([
        e$3()
    ], AlarmModeCard.prototype, "narrow", void 0);
    __decorate([
        e$3()
    ], AlarmModeCard.prototype, "currentTab", void 0);
    __decorate([
        e$3()
    ], AlarmModeCard.prototype, "config", void 0);
    __decorate([
        e$3()
    ], AlarmModeCard.prototype, "areas", void 0);
    __decorate([
        e$3()
    ], AlarmModeCard.prototype, "data", void 0);
    __decorate([
        e$3()
    ], AlarmModeCard.prototype, "selectedArea", void 0);
    AlarmModeCard = __decorate([
        n$4('alarm-mode-card')
    ], AlarmModeCard);

    let SettingsRow = class SettingsRow extends h$2 {
        constructor() {
            super(...arguments);
            this.threeLine = false;
        }
        render() {
            return T `
      <div class="info">
        <slot name="heading"></slot>
        <div class="secondary"><slot name="description"></slot></div>
      </div>
      <slot></slot>
    `;
        }
        static get styles() {
            return i `
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
        padding: 0px 16px 16px 16px;
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
      }
      :host(:not([large]):not([narrow])):not([dialog])) ::slotted(*) {
        max-width: 66%;
      }
    `;
        }
    };
    __decorate([
        e$3({ type: Boolean, reflect: true })
    ], SettingsRow.prototype, "narrow", void 0);
    __decorate([
        e$3({ type: Boolean, reflect: true })
    ], SettingsRow.prototype, "large", void 0);
    __decorate([
        e$3({ type: Boolean, attribute: 'three-line' })
    ], SettingsRow.prototype, "threeLine", void 0);
    __decorate([
        e$3({ type: Boolean })
    ], SettingsRow.prototype, "nested", void 0);
    __decorate([
        e$3({ type: Boolean })
    ], SettingsRow.prototype, "dialog", void 0);
    SettingsRow = __decorate([
        n$4('settings-row')
    ], SettingsRow);

    let CollapsibleSection = class CollapsibleSection extends h$2 {
        constructor() {
            super(...arguments);
            this.header = '';
            this.open = false;
        }
        render() {
            return T `
      ${this.open
            ? T `
            <div class="header open">
              <span
                @click=${() => {
                this.open = false;
            }}
              >
                ${this.header}
              </span>
              <ha-icon-button
                icon="hass:chevron-down"
                @click=${() => {
                this.open = false;
            }}
              >
                <ha-icon icon="hass:chevron-down"></ha-icon>
              </ha-icon-button>
            </div>
            <slot></slot>
            <div class="header open">
              <span
                @click=${() => {
                this.open = false;
            }}
              >
                ${this.header}
              </span>
              <ha-icon-button
                icon="hass:chevron-up"
                @click=${() => {
                this.open = false;
            }}
              >
                <ha-icon icon="hass:chevron-up"></ha-icon>
              </ha-icon-button>
            </div>
          `
            : T `
            <div class="header">
              <span
                @click=${() => {
                this.open = true;
            }}
              >
                ${this.header}
              </span>
              <ha-icon-button
                icon="hass:chevron-right"
                @click=${() => {
                this.open = true;
            }}
              >
                <ha-icon icon="hass:chevron-right"></ha-icon>
              </ha-icon-button>
            </div>
          `}
    `;
        }
        static get styles() {
            return i `
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
    `;
        }
    };
    __decorate([
        e$3({ type: Boolean, reflect: true })
    ], CollapsibleSection.prototype, "narrow", void 0);
    __decorate([
        e$3()
    ], CollapsibleSection.prototype, "header", void 0);
    __decorate([
        e$3()
    ], CollapsibleSection.prototype, "open", void 0);
    CollapsibleSection = __decorate([
        n$4('collapsible-section')
    ], CollapsibleSection);

    let MqttConfigCard = class MqttConfigCard extends SubscribeMixin(h$2) {
        constructor() {
            super(...arguments);
            this.areas = {};
        }
        hassSubscribe() {
            this._fetchData();
            return [this.hass.connection.subscribeMessage(() => this._fetchData(), { type: 'alarmo_config_updated' })];
        }
        async _fetchData() {
            if (!this.hass) {
                return;
            }
            const config = await fetchConfig(this.hass);
            this.config = config;
            this.areas = await fetchAreas(this.hass);
            this.selection = config.mqtt;
        }
        firstUpdated() {
            (async () => await loadHaForm())();
        }
        render() {
            if (!this.hass || !this.selection)
                return T ``;
            return T `
      <ha-card>
        <div class="card-header">
          <div class="name">${localize('panels.general.cards.mqtt.title', this.hass.language)}</div>
          <ha-icon-button icon="hass:close" @click=${this.cancelClick}>
            <ha-icon icon="hass:close"></ha-icon>
          </ha-icon-button>
        </div>
        <div class="card-content">${localize('panels.general.cards.mqtt.description', this.hass.language)}</div>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading"
            >${localize('panels.general.cards.mqtt.fields.state_topic.heading', this.hass.language)}</span
          >
          <span slot="description"
            >${localize('panels.general.cards.mqtt.fields.state_topic.description', this.hass.language)}</span
          >
          <paper-input
            label="${localize('panels.general.cards.mqtt.fields.state_topic.heading', this.hass.language)}"
            value=${this.selection.state_topic}
            @change=${(ev) => {
            this.selection = { ...this.selection, state_topic: ev.target.value };
        }}
          ></paper-input>
        </settings-row>

        <collapsible-section
          .narrow=${this.narrow}
          header=${localize('panels.general.cards.mqtt.fields.state_payload.heading', this.hass.language)}
        >
          ${Object.values(AlarmStates)
            .filter(state => Object.values(this.areas).some(area => filterState(state, area.modes)))
            .map(e => T `
                <settings-row .narrow=${this.narrow}>
                  <span slot="heading">${prettyPrint(e)}</span>
                  <span slot="description"
                    >${localize('panels.general.cards.mqtt.fields.state_payload.item', this.hass.language, '{state}', prettyPrint(e))}</span
                  >
                  <paper-input
                    label=${prettyPrint(e)}
                    placeholder=${e}
                    value=${this.selection.state_payload[e] || ''}
                    @change=${(ev) => {
            this.selection = Assign(this.selection, {
                state_payload: { [e]: ev.target.value },
            });
        }}
                  >
                  </paper-input>
                </settings-row>
              `)}
        </collapsible-section>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading"
            >${localize('panels.general.cards.mqtt.fields.event_topic.heading', this.hass.language)}</span
          >
          <span slot="description"
            >${localize('panels.general.cards.mqtt.fields.event_topic.description', this.hass.language)}</span
          >
          <paper-input
            label="${localize('panels.general.cards.mqtt.fields.event_topic.heading', this.hass.language)}"
            value=${this.selection.event_topic}
            @change=${(ev) => {
            this.selection = { ...this.selection, event_topic: ev.target.value };
        }}
          ></paper-input>
        </settings-row>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading"
            >${localize('panels.general.cards.mqtt.fields.command_topic.heading', this.hass.language)}</span
          >
          <span slot="description"
            >${localize('panels.general.cards.mqtt.fields.command_topic.description', this.hass.language)}</span
          >
          <paper-input
            label="${localize('panels.general.cards.mqtt.fields.command_topic.heading', this.hass.language)}"
            value=${this.selection.command_topic}
            @change=${(ev) => {
            this.selection = { ...this.selection, command_topic: ev.target.value };
        }}
          ></paper-input>
        </settings-row>

        <collapsible-section
          .narrow=${this.narrow}
          header=${localize('panels.general.cards.mqtt.fields.command_payload.heading', this.hass.language)}
        >
          ${Object.values(AlarmCommands)
            .filter(command => Object.values(this.areas).some(area => filterState(commandToState(command), area.modes)))
            .map(e => T `
                <settings-row .narrow=${this.narrow}>
                  <span slot="heading">${prettyPrint(e)}</span>
                  <span slot="description"
                    >${localize('panels.general.cards.mqtt.fields.command_payload.item', this.hass.language, '{command}', prettyPrint(e))}</span
                  >
                  <paper-input
                    label=${prettyPrint(e)}
                    placeholder=${e}
                    value=${this.selection.command_payload[e] || ''}
                    @change=${(ev) => {
            this.selection = Assign(this.selection, {
                command_payload: { [e]: ev.target.value },
            });
        }}
                  >
                  </paper-input>
                </settings-row>
              `)}
        </collapsible-section>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading"
            >${localize('panels.general.cards.mqtt.fields.require_code.heading', this.hass.language)}</span
          >
          <span slot="description"
            >${localize('panels.general.cards.mqtt.fields.require_code.description', this.hass.language)}</span
          >
          <ha-switch
            ?checked=${this.selection.require_code}
            ?disabled=${!this.config.code_arm_required && !this.config.code_disarm_required}
            @change=${(ev) => {
            this.selection = { ...this.selection, require_code: ev.target.checked };
        }}
          >
          </ha-switch>
        </settings-row>

        <div class="card-actions">
          <mwc-button @click=${this.saveClick}>
            ${this.hass.localize('ui.common.save')}
          </mwc-button>
        </div>
      </ha-card>
    `;
        }
        saveClick(ev) {
            if (!this.hass)
                return;
            saveConfig(this.hass, { mqtt: Object.assign(Object.assign({}, this.selection), { enabled: true }) })
                .catch(e => handleError(e, ev))
                .then(() => {
                this.cancelClick();
            });
        }
        cancelClick() {
            F(this, '/alarmo/general', true);
        }
    };
    MqttConfigCard.styles = commonStyle;
    __decorate([
        e$3()
    ], MqttConfigCard.prototype, "narrow", void 0);
    __decorate([
        e$3()
    ], MqttConfigCard.prototype, "config", void 0);
    __decorate([
        e$3()
    ], MqttConfigCard.prototype, "areas", void 0);
    __decorate([
        e$3()
    ], MqttConfigCard.prototype, "selection", void 0);
    MqttConfigCard = __decorate([
        n$4('mqtt-config-card')
    ], MqttConfigCard);

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const t$2={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},i$4=t=>(...i)=>({_$litDirective$:t,values:i});class s$4{constructor(t){}T(t,i,s){this.Σdt=t,this.M=i,this.Σct=s;}S(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}}

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */class n$6 extends s$4{constructor(i){if(super(i),this.vt=A,i.type!==t$2.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(r){if(r===A)return this.Vt=void 0,this.vt=r;if(r===w)return r;if("string"!=typeof r)throw Error(this.constructor.directiveName+"() called with a non-string value");if(r===this.vt)return this.Vt;this.vt=r;const s=[r];return s.raw=s,this.Vt={_$litType$:this.constructor.resultType,strings:s,values:[]}}}n$6.directiveName="unsafeHTML",n$6.resultType=1;const o$6=i$4(n$6);

    let AlarmoTable = class AlarmoTable extends h$2 {
        render() {
            if (!this.columns || !this.data)
                return T ``;
            return T `
      <div class="table">
        ${this.renderHeaderRow()}
        ${this.data.length
            ? this.data.map(e => this.renderDataRow(e))
            : T `
              <div class="table-row">
                <div class="table-cell text grow">
                  <slot></slot>
                </div>
              </div>
            `}
      </div>
    `;
        }
        renderHeaderRow() {
            if (!this.columns)
                return T ``;
            return T `
      <div class="table-row header">
        ${Object.values(this.columns).map(e => e.hide
            ? ''
            : T `
                <div
                  class="table-cell ${e.text ? 'text' : ''} ${e.grow ? 'grow' : ''} ${e.align ? e.align : ''}"
                  style="${e.grow ? '' : `width: ${e.width}`}"
                >
                  <span>${e.title || ''}</span>
                </div>
              `)}
      </div>
    `;
        }
        renderDataRow(data) {
            if (!this.columns)
                return T ``;
            return T `
      <div class="table-row ${this.selectable ? 'selectable' : ''}" @click=${() => this.handleClick(String(data.id))}>
        ${Object.entries(this.columns).map(([col, e]) => e.hide
            ? ''
            : T `
                <div
                  class="table-cell ${e.text ? 'text' : ''} ${e.grow ? 'grow' : ''} ${e.align ? e.align : ''}"
                  style="${e.grow ? '' : `width: ${e.width}`}"
                >
                  ${data[col]}
                </div>
              `)}
      </div>
    `;
        }
        handleClick(id) {
            if (!this.selectable)
                return;
            const myEvent = new CustomEvent('row-click', { detail: { id: id } });
            this.dispatchEvent(myEvent);
        }
    };
    AlarmoTable.styles = i `
    :host {
      width: 100%;
    }
    div.table {
      display: inline-flex;
      flex-direction: column;
      box-sizing: border-box;
      overflow: hidden;
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
    div.table .header div.table-cell span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      min-width: 0;
    }

    div.table-row.selectable {
      cursor: pointer;
    }
    div.table-row.selectable:hover {
      background-color: rgba(var(--rgb-primary-text-color), 0.04);
    }

    ha-icon {
      color: var(--paper-item-icon-color);
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
  `;
    __decorate([
        e$3()
    ], AlarmoTable.prototype, "columns", void 0);
    __decorate([
        e$3()
    ], AlarmoTable.prototype, "data", void 0);
    __decorate([
        e$3({ type: Boolean })
    ], AlarmoTable.prototype, "selectable", void 0);
    AlarmoTable = __decorate([
        n$4('alarmo-table')
    ], AlarmoTable);

    let ConfirmDeleteDialog = class ConfirmDeleteDialog extends h$2 {
        async showDialog(params) {
            this._params = params;
            await this.updateComplete;
        }
        async closeDialog() {
            if (this._params)
                this._params.cancel();
            this._params = undefined;
        }
        render() {
            if (!this._params)
                return T ``;
            return T `
      <ha-dialog open .heading=${true} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <div slot="heading">
          <ha-header-bar>
            <ha-icon-button slot="navigationIcon" dialogAction="cancel" icon="mdi:close">
              <ha-icon icon="mdi:close"></ha-icon>
            </ha-icon-button>
            <span slot="title">
              ${this._params.title}
            </span>
          </ha-header-bar>
        </div>
        <div class="wrapper">
          ${this._params.description}
        </div>

        <mwc-button slot="primaryAction" @click=${this.cancelClick} dialogAction="close">
          ${this.hass.localize('ui.dialogs.generic.cancel')}
        </mwc-button>
        <mwc-button slot="secondaryAction" style="float: left" @click=${this.confirmClick} dialogAction="close">
          ${this.hass.localize('ui.dialogs.generic.ok')}
        </mwc-button>
      </ha-dialog>
    `;
        }
        confirmClick() {
            this._params.confirm();
        }
        cancelClick() {
            this._params.cancel();
        }
        static get styles() {
            return i `
      ${commonStyle}
      div.wrapper {
        color: var(--primary-text-color);
      }
    `;
        }
    };
    __decorate([
        e$3({ attribute: false })
    ], ConfirmDeleteDialog.prototype, "hass", void 0);
    __decorate([
        r$3()
    ], ConfirmDeleteDialog.prototype, "_params", void 0);
    ConfirmDeleteDialog = __decorate([
        n$4('confirm-delete-dialog')
    ], ConfirmDeleteDialog);

    var confirmDeleteDialog = /*#__PURE__*/Object.freeze({
        __proto__: null,
        get ConfirmDeleteDialog () { return ConfirmDeleteDialog; }
    });

    let CreateAreaDialog = class CreateAreaDialog extends SubscribeMixin(h$2) {
        constructor() {
            super(...arguments);
            this.areas = {};
            this.sensors = {};
            this.automations = {};
            this.name = '';
        }
        hassSubscribe() {
            this._fetchData();
            return [this.hass.connection.subscribeMessage(() => this._fetchData(), { type: 'alarmo_config_updated' })];
        }
        async _fetchData() {
            if (!this.hass)
                return;
            this.areas = await fetchAreas(this.hass);
            this.sensors = await fetchSensors(this.hass);
            this.automations = await fetchAutomations(this.hass);
        }
        async showDialog(params) {
            await this._fetchData();
            this._params = params;
            if (params.area_id) {
                this.area_id = params.area_id;
                this.name = this.areas[this.area_id].name;
            }
            await this.updateComplete;
        }
        async closeDialog() {
            this._params = undefined;
            this.area_id = undefined;
            this.name = '';
        }
        render() {
            if (!this._params)
                return T ``;
            return T `
      <ha-dialog open .heading=${true} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <div slot="heading">
          <ha-header-bar>
            <ha-icon-button slot="navigationIcon" dialogAction="cancel" icon="mdi:close">
              <ha-icon icon="mdi:close"></ha-icon>
            </ha-icon-button>
            <span slot="title">
              ${this.area_id
            ? localize('panels.general.dialogs.edit_area.title', this.hass.language, '{area}', this.areas[this.area_id].name)
            : localize('panels.general.dialogs.create_area.title', this.hass.language)}
            </span>
          </ha-header-bar>
        </div>
        <div class="wrapper">
          <paper-input
            label=${this.hass.localize('ui.components.area-picker.add_dialog.name')}
            @value-changed=${(ev) => (this.name = ev.target.value)}
            value="${this.name}"
          >
          </paper-input>
          ${this.area_id
            ? T `
                <span class="note"
                  >${localize('panels.general.dialogs.edit_area.name_warning', this.hass.language)}</span
                >
              `
            : ''}
          ${!this.area_id
            ? T `
                <alarmo-select
                  .items=${Object.values(this.areas).map(e => Object({ value: e.area_id, name: e.name }))}
                  value=${this.selectedArea}
                  label="${localize('panels.general.dialogs.create_area.fields.copy_from', this.hass.language)}"
                  clearable=${true}
                  @value-changed=${(ev) => (this.selectedArea = ev.target.value)}
                >
                </alarmo-select>
              `
            : ''}
        </div>
        <mwc-button slot="primaryAction" @click=${this.saveClick}>
          ${this.hass.localize('ui.common.save')}
        </mwc-button>
        ${this.area_id
            ? T `
              <mwc-button
                slot="secondaryAction"
                @click=${this.deleteClick}
                class="warning"
                ?disabled=${Object.keys(this.areas).length == 1}
              >
                ${this.hass.localize('ui.common.delete')}
              </mwc-button>
            `
            : ''}
      </ha-dialog>
    `;
        }
        saveClick(ev) {
            const name = this.name.trim();
            if (!name.length)
                return;
            let data = {
                name: name,
            };
            if (this.area_id)
                data = Object.assign(Object.assign({}, data), { area_id: this.area_id });
            else if (this.selectedArea)
                data = Object.assign(Object.assign({}, data), { modes: Object.assign({}, this.areas[this.selectedArea].modes) });
            saveArea(this.hass, data)
                .catch(e => handleError(e, ev))
                .then(() => {
                this.closeDialog();
            });
        }
        async deleteClick(ev) {
            if (!this.area_id)
                return;
            const sensors = Object.values(this.sensors).filter(e => e.area == this.area_id).length;
            const automations = Object.values(this.automations).filter(e => { var _a; return (_a = e.triggers) === null || _a === void 0 ? void 0 : _a.map(e => e.area).includes(this.area_id); })
                .length;
            let result = false;
            if (sensors || automations) {
                result = await new Promise(resolve => {
                    C$1(ev.target, 'show-dialog', {
                        dialogTag: 'confirm-delete-dialog',
                        dialogImport: () => Promise.resolve().then(function () { return confirmDeleteDialog; }),
                        dialogParams: {
                            title: localize('panels.general.dialogs.remove_area.title', this.hass.language),
                            description: localize('panels.general.dialogs.remove_area.description', this.hass.language, ['{sensors}', '{automations}'], [String(sensors), String(automations)]),
                            cancel: () => resolve(false),
                            confirm: () => resolve(true),
                        },
                    });
                });
            }
            else
                result = true;
            if (result) {
                deleteArea(this.hass, this.area_id)
                    .catch(e => handleError(e, ev))
                    .then(() => {
                    this.closeDialog();
                });
            }
        }
        static get styles() {
            return i `
      ${commonStyle}
      div.wrapper {
        color: var(--primary-text-color);
      }
      span.note {
        color: var(--secondary-text-color);
      }
    `;
        }
    };
    __decorate([
        e$3({ attribute: false })
    ], CreateAreaDialog.prototype, "hass", void 0);
    __decorate([
        r$3()
    ], CreateAreaDialog.prototype, "_params", void 0);
    __decorate([
        e$3()
    ], CreateAreaDialog.prototype, "areas", void 0);
    __decorate([
        e$3()
    ], CreateAreaDialog.prototype, "sensors", void 0);
    __decorate([
        e$3()
    ], CreateAreaDialog.prototype, "automations", void 0);
    __decorate([
        e$3()
    ], CreateAreaDialog.prototype, "name", void 0);
    __decorate([
        e$3()
    ], CreateAreaDialog.prototype, "area_id", void 0);
    __decorate([
        e$3()
    ], CreateAreaDialog.prototype, "selectedArea", void 0);
    CreateAreaDialog = __decorate([
        n$4('create-area-dialog')
    ], CreateAreaDialog);

    var createAreaDialog = /*#__PURE__*/Object.freeze({
        __proto__: null,
        get CreateAreaDialog () { return CreateAreaDialog; }
    });

    let AreaConfigCard = class AreaConfigCard extends SubscribeMixin(h$2) {
        constructor() {
            super(...arguments);
            this.areas = {};
            this.sensors = {};
            this.automations = {};
        }
        hassSubscribe() {
            this._fetchData();
            return [this.hass.connection.subscribeMessage(() => this._fetchData(), { type: 'alarmo_config_updated' })];
        }
        async _fetchData() {
            if (!this.hass)
                return;
            this.areas = await fetchAreas(this.hass);
            this.sensors = await fetchSensors(this.hass);
            this.automations = await fetchAutomations(this.hass);
        }
        render() {
            if (!this.hass)
                return T ``;
            const areas = Object.values(this.areas);
            areas.sort(sortAlphabetically);
            const columns = {
                actions: {
                    width: '48px',
                },
                name: {
                    title: this.hass.localize('ui.components.area-picker.add_dialog.name'),
                    width: '40%',
                    grow: true,
                    text: true,
                },
                remarks: {
                    title: localize('panels.general.cards.areas.table.remarks', this.hass.language),
                    width: '60%',
                    hide: this.narrow,
                    text: true,
                },
            };
            const data = Object.values(areas).map(item => {
                const sensors = Object.values(this.sensors).filter(e => e.area == item.area_id).length;
                const automations = Object.values(areas).length == 1
                    ? Object.values(this.automations).filter(e => { var _a, _b; return ((_a = e.triggers) === null || _a === void 0 ? void 0 : _a.map(e => e.area).includes(item.area_id)) || !((_b = e.triggers) === null || _b === void 0 ? void 0 : _b.map(e => e.area).length); }).length
                    : Object.values(this.automations).filter(e => { var _a; return (_a = e.triggers) === null || _a === void 0 ? void 0 : _a.map(e => e.area).includes(item.area_id); }).length;
                const summary_sensors = `<a href="/alarmo/sensors/filter/${item.area_id}">${localize('panels.general.cards.areas.table.summary_sensors', this.hass.language, '{number}', String(sensors))}</a>`;
                const summary_automations = `<a href="/alarmo/actions/filter/${item.area_id}">${localize('panels.general.cards.areas.table.summary_automations', this.hass.language, '{number}', String(automations))}</a>`;
                const output = {
                    id: item.area_id,
                    actions: T `
          <ha-icon-button @click=${(ev) => this.editClick(ev, item.area_id)} icon="hass:pencil">
            <ha-icon icon="hass:pencil"></ha-icon>
          </ha-icon-button>
        `,
                    name: prettyPrint(item.name),
                    remarks: o$6(localize('panels.general.cards.areas.table.summary', this.hass.language, ['{summary_sensors}', '{summary_automations}'], [summary_sensors, summary_automations])),
                };
                return output;
            });
            return T `
      <ha-card header="${localize('panels.general.cards.areas.title', this.hass.language)}">
        <div class="card-content">
          ${localize('panels.general.cards.areas.description', this.hass.language)}
        </div>

        <alarmo-table .columns=${columns} .data=${data}>
          ${localize('panels.general.cards.areas.no_items', this.hass.language)}
        </alarmo-table>
        <div class="card-actions">
          <mwc-button @click=${this.addClick}>
            ${localize('panels.general.cards.areas.actions.add', this.hass.language)}
          </mwc-button>
        </div>
      </ha-card>
    `;
        }
        addClick(ev) {
            const element = ev.target;
            C$1(element, 'show-dialog', {
                dialogTag: 'create-area-dialog',
                dialogImport: () => Promise.resolve().then(function () { return createAreaDialog; }),
                dialogParams: {},
            });
        }
        editClick(ev, area_id) {
            const element = ev.target;
            C$1(element, 'show-dialog', {
                dialogTag: 'create-area-dialog',
                dialogImport: () => Promise.resolve().then(function () { return createAreaDialog; }),
                dialogParams: { area_id: area_id },
            });
        }
    };
    AreaConfigCard.styles = commonStyle;
    __decorate([
        e$3()
    ], AreaConfigCard.prototype, "narrow", void 0);
    __decorate([
        e$3()
    ], AreaConfigCard.prototype, "path", void 0);
    __decorate([
        e$3()
    ], AreaConfigCard.prototype, "config", void 0);
    __decorate([
        e$3()
    ], AreaConfigCard.prototype, "areas", void 0);
    __decorate([
        e$3()
    ], AreaConfigCard.prototype, "sensors", void 0);
    __decorate([
        e$3()
    ], AreaConfigCard.prototype, "automations", void 0);
    AreaConfigCard = __decorate([
        n$4('area-config-card')
    ], AreaConfigCard);

    let EditMasterDialog = class EditMasterDialog extends h$2 {
        constructor() {
            super(...arguments);
            this.name = '';
        }
        async showDialog(params) {
            this._params = params;
            const config = await fetchConfig(this.hass);
            this.name = config.master['name'] || '';
            await this.updateComplete;
        }
        async closeDialog() {
            this._params = undefined;
        }
        render() {
            if (!this._params)
                return T ``;
            return T `
      <ha-dialog open .heading=${true} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <div slot="heading">
          <ha-header-bar>
            <ha-icon-button slot="navigationIcon" dialogAction="cancel" icon="mdi:close">
              <ha-icon icon="mdi:close"></ha-icon>
            </ha-icon-button>
            <span slot="title"> ${localize('panels.general.dialogs.edit_master.title', this.hass.language)}</span>
          </ha-header-bar>
        </div>
        <div class="wrapper">
          <paper-input
            label=${this.hass.localize('ui.components.area-picker.add_dialog.name')}
            @value-changed=${(ev) => (this.name = ev.target.value)}
            value="${this.name}"
          >
          </paper-input>
          <span class="note">${localize('panels.general.dialogs.edit_area.name_warning', this.hass.language)}</span>
        </div>
        <mwc-button slot="primaryAction" @click=${this.saveClick}>
          ${this.hass.localize('ui.common.save')}
        </mwc-button>
        <mwc-button slot="secondaryAction" @click=${this.closeDialog}>
          ${this.hass.localize('ui.common.cancel')}
        </mwc-button>
      </ha-dialog>
    `;
        }
        saveClick() {
            const name = this.name.trim();
            if (!name.length)
                return;
            saveConfig(this.hass, {
                master: {
                    enabled: true,
                    name: name,
                },
            })
                .catch()
                .then(() => {
                this.closeDialog();
            });
        }
        static get styles() {
            return i `
      div.wrapper {
        color: var(--primary-text-color);
      }
      span.note {
        color: var(--secondary-text-color);
      }
    `;
        }
    };
    __decorate([
        e$3({ attribute: false })
    ], EditMasterDialog.prototype, "hass", void 0);
    __decorate([
        r$3()
    ], EditMasterDialog.prototype, "_params", void 0);
    __decorate([
        e$3()
    ], EditMasterDialog.prototype, "name", void 0);
    EditMasterDialog = __decorate([
        n$4('edit-master-dialog')
    ], EditMasterDialog);

    var editMasterDialog = /*#__PURE__*/Object.freeze({
        __proto__: null,
        get EditMasterDialog () { return EditMasterDialog; }
    });

    let AlarmViewGeneral = class AlarmViewGeneral extends SubscribeMixin(h$2) {
        constructor() {
            super(...arguments);
            this.areas = {};
            this.automations = {};
        }
        hassSubscribe() {
            this._fetchData();
            return [this.hass.connection.subscribeMessage(() => this._fetchData(), { type: 'alarmo_config_updated' })];
        }
        async _fetchData() {
            if (!this.hass) {
                return;
            }
            this.config = await fetchConfig(this.hass);
            this.areas = await fetchAreas(this.hass);
            this.automations = await fetchAutomations(this.hass);
            this.data = pick(this.config, ['trigger_time', 'disarm_after_trigger', 'mqtt', 'master']);
        }
        firstUpdated() {
            (async () => await loadHaForm())();
        }
        render() {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            if (!this.hass || !this.config || !this.data)
                return T ``;
            if (this.path && this.path[0] == 'mqtt_configuration') {
                return T `
        <mqtt-config-card .hass=${this.hass} .narrow=${this.narrow}> </mqtt-config-card>
      `;
            }
            if (this.path && this.path[0] == 'edit_area' && this.path.length == 2) {
                return T `
        <area-editor-card .hass=${this.hass} .narrow=${this.narrow} item=${this.path[1]}> </area-editor-card>
      `;
            }
            else {
                return T `
        <ha-card header="${localize('panels.general.title', this.hass.language)}">
          <div class="card-content">
            ${localize('panels.general.cards.general.description', this.hass.language)}
          </div>

          <settings-row .narrow=${this.narrow}>
            <span slot="heading"
              >${localize('panels.general.cards.general.fields.disarm_after_trigger.heading', this.hass.language)}</span
            >
            <span slot="description"
              >${localize('panels.general.cards.general.fields.disarm_after_trigger.description', this.hass.language)}</span
            >
            <ha-switch
              ?checked=${this.data.disarm_after_trigger}
              @change=${(ev) => (this.data = { ...this.data, disarm_after_trigger: ev.target.checked })}
              }}
            >
            </ha-switch>
          </settings-row>

          <settings-row .narrow=${this.narrow}>
            <span slot="heading"
              >${localize('panels.general.cards.general.fields.enable_mqtt.heading', this.hass.language)}</span
            >
            <span slot="description"
              >${localize('panels.general.cards.general.fields.enable_mqtt.description', this.hass.language)}</span
            >
            <ha-switch
              ?checked=${(_b = (_a = this.data) === null || _a === void 0 ? void 0 : _a.mqtt) === null || _b === void 0 ? void 0 : _b.enabled}
              @change=${(ev) => {
                this.data = {
                    ...this.data,
                    mqtt: { ...this.data.mqtt, enabled: ev.target.checked },
                };
            }}
            >
            </ha-switch>
          </settings-row>

          ${((_d = (_c = this.data) === null || _c === void 0 ? void 0 : _c.mqtt) === null || _d === void 0 ? void 0 : _d.enabled) ? T `
                <div style="padding: 0px 0px 16px 16px">
                  <mwc-button outlined @click=${() => F(this, '/alarmo/general/mqtt_configuration', true)}>
                    ${localize('panels.general.cards.general.actions.setup_mqtt', this.hass.language)}
                  </mwc-button>
                </div>
              `
                : ''}
          ${Object.keys(this.areas).length >= 2
                ? T `
                <settings-row .narrow=${this.narrow}>
                  <span slot="heading"
                    >${localize('panels.general.cards.general.fields.enable_master.heading', this.hass.language)}</span
                  >
                  <span slot="description"
                    >${localize('panels.general.cards.general.fields.enable_master.description', this.hass.language)}</span
                  >
                  <ha-switch
                    ?checked=${((_f = (_e = this.data) === null || _e === void 0 ? void 0 : _e.master) === null || _f === void 0 ? void 0 : _f.enabled) && Object.keys(this.areas).length >= 2}
                    ?disabled=${Object.keys(this.areas).length < 2}
                    @change=${this.toggleEnableMaster}
                  >
                  </ha-switch>
                </settings-row>
              `
                : ''}
          ${((_h = (_g = this.data) === null || _g === void 0 ? void 0 : _g.master) === null || _h === void 0 ? void 0 : _h.enabled) && Object.keys(this.areas).length >= 2
                ? T `
                <div style="padding: 0px 0px 16px 16px">
                  <mwc-button outlined @click=${this.setupMasterClick}>
                    ${localize('panels.general.cards.general.actions.setup_master', this.hass.language)}
                  </mwc-button>
                </div>
              `
                : ''}

          <div class="card-actions">
            <mwc-button @click=${this.saveClick}>
              ${this.hass.localize('ui.common.save')}
            </mwc-button>
          </div>
        </ha-card>

        <alarm-mode-card .hass=${this.hass} .narrow=${this.narrow}> </alarm-mode-card>

        <area-config-card .hass=${this.hass} .narrow=${this.narrow}> </area-config-card>
      `;
            }
        }
        setupMasterClick(ev) {
            const element = ev.target;
            C$1(element, 'show-dialog', {
                dialogTag: 'edit-master-dialog',
                dialogImport: () => Promise.resolve().then(function () { return editMasterDialog; }),
                dialogParams: {},
            });
        }
        async toggleEnableMaster(ev) {
            const target = ev.target;
            let enabled = target.checked;
            if (!enabled) {
                const automations = Object.values(this.automations).filter(e => { var _a; return !((_a = e.triggers) === null || _a === void 0 ? void 0 : _a.map(e => e.area).length); }).length;
                if (automations) {
                    const result = await new Promise(resolve => {
                        C$1(target, 'show-dialog', {
                            dialogTag: 'confirm-delete-dialog',
                            dialogImport: () => Promise.resolve().then(function () { return confirmDeleteDialog; }),
                            dialogParams: {
                                title: localize('panels.general.dialogs.disable_master.title', this.hass.language),
                                description: localize('panels.general.dialogs.disable_master.description', this.hass.language, ['{automations}'], [String(automations)]),
                                cancel: () => resolve(false),
                                confirm: () => resolve(true),
                            },
                        });
                    });
                    if (!result) {
                        enabled = true;
                        target.checked = true;
                    }
                }
            }
            this.data = Object.assign(Object.assign({}, this.data), { master: Object.assign(Object.assign({}, this.data.master), { enabled: enabled }) });
        }
        saveClick(ev) {
            if (!this.hass || !this.data)
                return;
            saveConfig(this.hass, this.data)
                .catch(e => handleError(e, ev))
                .then();
        }
    };
    AlarmViewGeneral.styles = commonStyle;
    __decorate([
        e$3()
    ], AlarmViewGeneral.prototype, "narrow", void 0);
    __decorate([
        e$3()
    ], AlarmViewGeneral.prototype, "path", void 0);
    __decorate([
        e$3()
    ], AlarmViewGeneral.prototype, "data", void 0);
    __decorate([
        e$3()
    ], AlarmViewGeneral.prototype, "config", void 0);
    __decorate([
        e$3()
    ], AlarmViewGeneral.prototype, "areas", void 0);
    __decorate([
        e$3()
    ], AlarmViewGeneral.prototype, "automations", void 0);
    AlarmViewGeneral = __decorate([
        n$4('alarm-view-general')
    ], AlarmViewGeneral);

    const isValidSensor = (entity, showAllDeviceClasses) => {
        const domain = getDomain(entity.entity_id);
        if (domain == 'binary_sensor') {
            if (showAllDeviceClasses)
                return true;
            const type = entity.attributes.device_class;
            if (!type)
                return false;
            if ([
                'door',
                'garage_door',
                'gas',
                'heat',
                'lock',
                'moisture',
                'motion',
                'moving',
                'occupancy',
                'opening',
                'presence',
                'safety',
                'smoke',
                'sound',
                'vibration',
                'window',
            ].includes(type))
                return true;
            return false;
        }
        return false;
    };
    const sensorClassToType = (stateObj) => {
        switch (stateObj.attributes.device_class) {
            case 'door':
            case 'garage_door':
            case 'lock':
                return ESensorTypes.Door;
            case 'window':
                return ESensorTypes.Window;
            case 'gas':
            case 'heat':
            case 'moisture':
            case 'smoke':
            case 'safety':
                return ESensorTypes.Environmental;
            case 'motion':
            case 'moving':
            case 'occupancy':
            case 'presence':
                return ESensorTypes.Motion;
            case 'sound':
            case 'opening':
            case 'vibration':
            case 'problem':
                return ESensorTypes.Tamper;
            default:
                return;
        }
    };
    const sensorConfigByType = (modeList) => {
        const filterModes = (modes) => modes.filter(e => modeList.includes(e));
        return {
            [ESensorTypes.Door]: {
                modes: filterModes([EArmModes.ArmedAway, EArmModes.ArmedHome, EArmModes.ArmedNight]),
                always_on: false,
                allow_open: false,
                arm_on_close: false,
                use_entry_delay: true,
                use_exit_delay: false,
            },
            [ESensorTypes.Window]: {
                modes: filterModes([EArmModes.ArmedAway, EArmModes.ArmedHome, EArmModes.ArmedNight]),
                always_on: false,
                allow_open: false,
                arm_on_close: false,
                use_entry_delay: false,
                use_exit_delay: false,
            },
            [ESensorTypes.Motion]: {
                modes: filterModes([EArmModes.ArmedAway]),
                always_on: false,
                allow_open: true,
                arm_on_close: false,
                use_entry_delay: true,
                use_exit_delay: true,
            },
            [ESensorTypes.Tamper]: {
                modes: filterModes([EArmModes.ArmedAway, EArmModes.ArmedHome, EArmModes.ArmedNight, EArmModes.ArmedCustom]),
                always_on: false,
                allow_open: false,
                arm_on_close: false,
                use_entry_delay: false,
                use_exit_delay: false,
            },
            [ESensorTypes.Environmental]: {
                modes: filterModes([EArmModes.ArmedAway, EArmModes.ArmedHome, EArmModes.ArmedNight, EArmModes.ArmedCustom]),
                always_on: true,
                allow_open: false,
                arm_on_close: false,
                use_entry_delay: false,
                use_exit_delay: false,
            },
        };
    };
    function defaultSensorConfig(stateObj, modeList) {
        if (!stateObj)
            return null;
        const domain = d$1(stateObj.entity_id);
        let config = {
            entity_id: stateObj.entity_id,
            name: stateObj.attributes.friendly_name || stateObj.entity_id,
            modes: [],
            use_entry_delay: true,
            use_exit_delay: true,
            arm_on_close: false,
            allow_open: false,
            always_on: false,
            auto_bypass: false,
            auto_bypass_modes: [],
            trigger_unavailable: false,
            type: ESensorTypes.Other,
            enabled: true,
        };
        if (domain == 'binary_sensor') {
            const type = sensorClassToType(stateObj);
            if (type) {
                config = Object.assign(Object.assign(Object.assign({}, config), { type: type }), sensorConfigByType(modeList)[type]);
            }
        }
        return config;
    }
    const getSensorTypeOptions = (hass) => Object.entries(ESensorTypes)
        .filter(([, e]) => e != ESensorTypes.Other)
        .map(([k, v]) => Object({
        value: v,
        name: localize(`panels.sensors.cards.editor.fields.device_type.choose.${v}.name`, hass.language),
        description: localize(`panels.sensors.cards.editor.fields.device_type.choose.${v}.description`, hass.language),
        icon: ESensorIcons[k],
    }));
    const getConfigurableSensors = (hass, includedSensors, showAllBinarySensors = false) => {
        const list = Object.values(hass.states)
            .filter(e => isValidSensor(e, showAllBinarySensors))
            .filter(e => !includedSensors.includes(e.entity_id))
            .map(e => Object({
            id: e.entity_id,
            name: computeName(e),
            icon: computeIcon(e),
        }));
        list.sort(sortAlphabetically);
        return list;
    };

    let ErrorDialog = class ErrorDialog extends h$2 {
        async showDialog(params) {
            this._params = params;
            await this.updateComplete;
        }
        async closeDialog() {
            this._params = undefined;
        }
        render() {
            if (!this._params)
                return T ``;
            return T `
      <ha-dialog open .heading=${true} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <div slot="heading">
          <ha-header-bar>
            <ha-icon-button slot="navigationIcon" dialogAction="cancel" icon="mdi:close">
              <ha-icon icon="mdi:close"></ha-icon>
            </ha-icon-button>
            <span slot="title">
              ${this.hass.localize('state_badge.default.error')}
            </span>
          </ha-header-bar>
        </div>
        <div class="wrapper">
          ${this._params.error || ''}
        </div>

        <mwc-button slot="primaryAction" style="float: left" @click=${this.closeDialog} dialogAction="close">
          ${this.hass.localize('ui.dialogs.generic.ok')}
        </mwc-button>
      </ha-dialog>
    `;
        }
        static get styles() {
            return i `
      div.wrapper {
        color: var(--primary-text-color);
      }
    `;
        }
    };
    __decorate([
        e$3({ attribute: false })
    ], ErrorDialog.prototype, "hass", void 0);
    __decorate([
        r$3()
    ], ErrorDialog.prototype, "_params", void 0);
    ErrorDialog = __decorate([
        n$4('error-dialog')
    ], ErrorDialog);

    var errorDialog = /*#__PURE__*/Object.freeze({
        __proto__: null,
        get ErrorDialog () { return ErrorDialog; }
    });

    let AlarmoChips = class AlarmoChips extends h$2 {
        constructor() {
            super(...arguments);
            this.items = [];
            this.value = null;
            this.selectable = false;
            this.multiple = false;
        }
        render() {
            return T `
      ${this.items.map(e => T `
            <div
              class="chip ${(Array.isArray(this.value) && this.value.includes(e.value)) || this.value == e.value
            ? 'selected'
            : ''}"
              @click=${() => this.selectItem(e.value)}
            >
              ${this.renderBadge(e)}
              <span class="label">
                ${e.name}
              </span>
            </div>
          `)}
    `;
        }
        renderBadge(item) {
            return T `
      ${item.count !== undefined
            ? T `
            <span class="count">${item.count > 99 ? 99 : item.count}</span>
          `
            : item.icon !== undefined
                ? T `
            <ha-icon icon="${item.icon}"></ha-icon>
          `
                : ''}
    `;
        }
        selectItem(value) {
            let retval = value;
            if (this.selectable) {
                if (this.multiple) {
                    const list = Array.isArray(this.value) ? [...this.value] : isDefined(this.value) ? [this.value] : [];
                    this.value = list.includes(value) ? Without(list, value) : [...list, value];
                }
                else {
                    this.value = this.value == value ? null : value;
                }
                retval = this.value;
            }
            C$1(this, 'value-changed', { value: retval });
        }
        static get styles() {
            return i `
      :host {
      }
      .chip {
        display: inline-flex;
        background: rgba(var(--rgb-primary-text-color), 0.08);
        color: rgba(var(--rgb-primary-text-color), 0.8);
        align-items: center;
        justify-content: center;
        border-radius: 16px;
        padding: 0px 6px;
        margin: 1px 0px;
        height: 32px;
        min-width: 35px;
        font-weight: 500;
        font-size: 0.9rem;
        cursor: pointer;
        user-select: none;
      }
      .chip span.label {
        margin: 0px 6px;
      }
      .chip span.count {
        background: rgba(var(--rgb-secondary-text-color), 0.85);
        color: rgba(var(--rgb-text-primary-color), 1);
        border-radius: 10px;
        height: 20px;
        display: flex;
        width: 20px;
        justify-content: center;
        align-items: flex-start;
        font-size: 0.8rem;
        line-height: 20px;
      }
      .chip ha-icon {
        height: 24px;
        display: flex;
        width: 24px;
        justify-content: center;
        align-items: flex-start;
        font-size: 0.8rem;
        line-height: 24px;
        padding-left: 4px;
      }
      .chip:hover {
        background: rgba(var(--rgb-primary-text-color), 0.12);
      }
      .chip:active {
        background: rgba(var(--rgb-primary-text-color), 0.24);
      }
      .chip.selected {
        background: rgba(var(--rgb-primary-color), 0.9);
        color: var(--text-primary-color);
      }
      .chip.selected:hover {
        background: rgba(var(--rgb-primary-color), 0.85);
      }
      .chip.selected:active {
        background: rgba(var(--rgb-primary-color), 0.74);
      }
    `;
        }
    };
    __decorate([
        e$3()
    ], AlarmoChips.prototype, "items", void 0);
    __decorate([
        e$3()
    ], AlarmoChips.prototype, "value", void 0);
    __decorate([
        e$3({ type: Boolean })
    ], AlarmoChips.prototype, "selectable", void 0);
    __decorate([
        e$3({ type: Boolean })
    ], AlarmoChips.prototype, "multiple", void 0);
    AlarmoChips = __decorate([
        n$4('alarmo-chips')
    ], AlarmoChips);

    let CreateSensorGroupDialog = class CreateSensorGroupDialog extends SubscribeMixin(h$2) {
        constructor() {
            super(...arguments);
            this.sensorGroups = {};
            this.sensors = {};
        }
        hassSubscribe() {
            this._fetchData();
            return [this.hass.connection.subscribeMessage(() => this._fetchData(), { type: 'alarmo_config_updated' })];
        }
        async _fetchData() {
            if (!this.hass)
                return;
            this.sensorGroups = await fetchSensorGroups(this.hass);
            this.sensors = await fetchSensors(this.hass);
        }
        async showDialog(params) {
            await this._fetchData();
            this._params = params;
            if (params.group_id && Object.keys(this.sensorGroups).includes(params.group_id)) {
                this.data = Object.assign({}, this.sensorGroups[params.group_id]);
            }
            else {
                this.data = {
                    name: '',
                    entities: [],
                    timeout: 600,
                };
            }
            await this.updateComplete;
        }
        async closeDialog() {
            this._params = undefined;
        }
        render() {
            if (!this._params)
                return T ``;
            return T `
      <ha-dialog open @closed=${this.closeDialog} @close-dialog=${this.closeDialog} .heading=${this.renderHeader()}>
        <div class="wrapper">
          <settings-row dialog>
            <span slot="heading"
              >${localize('panels.sensors.dialogs.create_group.fields.name.heading', this.hass.language)}</span
            >
            <span slot="description"
              >${localize('panels.sensors.dialogs.create_group.fields.name.description', this.hass.language)}</span
            >
            <paper-input
              label=${this.hass.localize('ui.components.area-picker.add_dialog.name')}
              @value-changed=${(ev) => (this.data = { ...this.data, name: String(ev.target.value).trim() })}
              value="${this.data.name}"
            >
            </paper-input>
          </settings-row>

          <settings-row large dialog>
            <span slot="heading"
              >${localize('panels.sensors.dialogs.create_group.fields.sensors.heading', this.hass.language)}</span
            >
            <span slot="description"
              >${localize('panels.sensors.dialogs.create_group.fields.sensors.description', this.hass.language)}</span
            >

            <div>
              ${this.renderSensorOptions()}
            </div>
          </settings-row>

          <settings-row dialog>
            <span slot="heading"
              >${localize('panels.sensors.dialogs.create_group.fields.timeout.heading', this.hass.language)}</span
            >
            <span slot="description"
              >${localize('panels.sensors.dialogs.create_group.fields.timeout.description', this.hass.language)}</span
            >

            <time-slider
              .hass=${this.hass}
              unit="min"
              max="1200"
              .value=${this.data.timeout}
              @change=${(ev) => (this.data = { ...this.data, timeout: Number(ev.target.value) })}
            >
            </time-slider>
          </settings-row>
        </div>
        <mwc-button slot="secondaryAction" @click=${this.saveClick}>
          ${this.hass.localize('ui.common.save')}
        </mwc-button>
        ${this.data.group_id
            ? T `
              <mwc-button slot="secondaryAction" @click=${this.deleteClick} class="warning">
                ${this.hass.localize('ui.common.delete')}
              </mwc-button>
            `
            : ''}
      </ha-dialog>
    `;
        }
        renderHeader() {
            return T `
      <span class="header_title">
        ${this.data.group_id
            ? localize('panels.sensors.dialogs.edit_group.title', this.hass.language, '{name}', this.sensorGroups[this.data.group_id].name)
            : localize('panels.sensors.dialogs.create_group.title', this.hass.language)}
      </span>
      <ha-icon-button
        .label=${this.hass.localize('ui.dialogs.generic.close')}
        icon="mdi:close"
        dialogAction="close"
        class="header_button"
      >
        <ha-icon icon="mdi:close"></ha-icon>
      </ha-icon-button>
    `;
        }
        renderSensorOptions() {
            const sensors = Object.keys(this.sensors)
                .filter(e => !isDefined(this.sensors[e].group) || this.sensors[e].group === this.data.group_id)
                .map(e => {
                const stateObj = this.hass.states[e];
                const type = Object.entries(ESensorTypes).find(([, v]) => v == this.sensors[e].type)[0];
                return {
                    value: e,
                    name: this.sensors[e].name || prettyPrint(computeName(stateObj)),
                    icon: ESensorIcons[type],
                };
            });
            sensors.sort(sortAlphabetically);
            if (!sensors.length)
                return localize('panels.sensors.cards.sensors.no_items', this.hass.language);
            return T `
      <alarmo-chips
        .items=${sensors}
        .value=${this.data.entities}
        ?selectable=${true}
        ?multiple=${true}
        @value-changed=${(ev) => (this.data = { ...this.data, entities: ev.detail.value })}
      >
      </alarmo-chips>
    `;
        }
        saveClick(ev) {
            if (!this.data.name.length)
                showErrorDialog(ev, localize('panels.sensors.dialogs.create_group.errors.invalid_name', this.hass.language));
            else if ((!this.data.group_id || this.data.name != this.sensorGroups[this.data.group_id].name) &&
                Object.values(this.sensorGroups).find(e => e.name.toLowerCase() == this.data.name.toLowerCase()))
                showErrorDialog(ev, localize('panels.sensors.dialogs.create_group.errors.invalid_name', this.hass.language));
            else if (this.data.entities.length < 2)
                showErrorDialog(ev, localize('panels.sensors.dialogs.create_group.errors.insufficient_sensors', this.hass.language));
            else {
                saveSensorGroup(this.hass, this.data)
                    .catch(e => handleError(e, ev))
                    .then(() => {
                    this.closeDialog();
                });
            }
        }
        deleteClick(ev) {
            if (!this.data.group_id)
                return;
            deleteSensorGroup(this.hass, this.data.group_id)
                .catch(e => handleError(e, ev))
                .then(() => {
                this.closeDialog();
            });
        }
        static get styles() {
            return i `
      ${dialogStyle}
      div.wrapper {
        color: var(--primary-text-color);
      }
      mwc-button.warning {
        --mdc-theme-primary: var(--error-color);
      }
    `;
        }
    };
    __decorate([
        e$3({ attribute: false })
    ], CreateSensorGroupDialog.prototype, "hass", void 0);
    __decorate([
        r$3()
    ], CreateSensorGroupDialog.prototype, "_params", void 0);
    __decorate([
        e$3()
    ], CreateSensorGroupDialog.prototype, "sensorGroups", void 0);
    __decorate([
        e$3()
    ], CreateSensorGroupDialog.prototype, "sensors", void 0);
    __decorate([
        e$3()
    ], CreateSensorGroupDialog.prototype, "data", void 0);
    CreateSensorGroupDialog = __decorate([
        n$4('create-sensor-group-dialog')
    ], CreateSensorGroupDialog);

    var createSensorGroupDialog = /*#__PURE__*/Object.freeze({
        __proto__: null,
        get CreateSensorGroupDialog () { return CreateSensorGroupDialog; }
    });

    let ManageSensorGroupsDialog = class ManageSensorGroupsDialog extends SubscribeMixin(h$2) {
        constructor() {
            super(...arguments);
            this.sensorGroups = {};
            this.sensors = {};
        }
        hassSubscribe() {
            this._fetchData();
            return [this.hass.connection.subscribeMessage(() => this._fetchData(), { type: 'alarmo_config_updated' })];
        }
        async _fetchData() {
            if (!this.hass)
                return;
            this.sensorGroups = await fetchSensorGroups(this.hass);
            this.sensors = await fetchSensors(this.hass);
        }
        async showDialog(params) {
            await this._fetchData();
            this._params = params;
            await this.updateComplete;
        }
        async closeDialog() {
            this._params = undefined;
        }
        render() {
            if (!this._params)
                return T ``;
            return T `
      <ha-dialog open .heading=${this.renderHeader()} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <div class="wrapper">
          <div class="description">
            ${localize('panels.sensors.dialogs.manage_groups.description', this.hass.language)}
          </div>
          <div class="container">
            ${Object.keys(this.sensorGroups).length
            ? Object.values(this.sensorGroups).map(e => this.renderGroup(e))
            : localize('panels.sensors.dialogs.manage_groups.no_items', this.hass.language)}
          </div>
        </div>
        <mwc-button slot="secondaryAction" @click=${this.createGroupClick}>
          <ha-icon icon="hass:plus"></ha-icon>
          ${localize('panels.sensors.dialogs.manage_groups.actions.new_group', this.hass.language)}
        </mwc-button>
      </ha-dialog>
    `;
        }
        renderHeader() {
            return T `
      <span class="header_title">${localize('panels.sensors.dialogs.manage_groups.title', this.hass.language)}</span>
      <ha-icon-button
        .label=${this.hass.localize('ui.dialogs.generic.close')}
        icon="mdi:close"
        dialogAction="close"
        class="header_button"
      >
        <ha-icon icon="mdi:close"></ha-icon>
      </ha-icon-button>
    `;
        }
        renderGroup(item) {
            return T `
    <ha-card
      outlined
      @click=${(ev) => this.editGroupClick(ev, item.group_id)}
    >
      <ha-icon icon="hass:folder-outline"></ha-icon>
      <div>
        <span class="name">${item.name}</span>
        <span class="description">${localize('panels.general.cards.areas.table.summary_sensors', this.hass.language, '{number}', String(item.entities.length))}
      </div>
      <ha-icon-button icon="hass:chevron-right">
        <ha-icon icon="hass:chevron-right"></ha-icon>
      </ha-icon-button>
    </ha-card>
    `;
        }
        createGroupClick(ev) {
            const element = ev.target;
            C$1(element, 'show-dialog', {
                dialogTag: 'create-sensor-group-dialog',
                dialogImport: () => Promise.resolve().then(function () { return createSensorGroupDialog; }),
                dialogParams: {},
            });
        }
        editGroupClick(ev, group_id) {
            const element = ev.target;
            C$1(element, 'show-dialog', {
                dialogTag: 'create-sensor-group-dialog',
                dialogImport: () => Promise.resolve().then(function () { return createSensorGroupDialog; }),
                dialogParams: { group_id: group_id },
            });
        }
        static get styles() {
            return i `
      ${dialogStyle}

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
    `;
        }
    };
    __decorate([
        e$3({ attribute: false })
    ], ManageSensorGroupsDialog.prototype, "hass", void 0);
    __decorate([
        r$3()
    ], ManageSensorGroupsDialog.prototype, "_params", void 0);
    __decorate([
        e$3()
    ], ManageSensorGroupsDialog.prototype, "sensorGroups", void 0);
    __decorate([
        e$3()
    ], ManageSensorGroupsDialog.prototype, "sensors", void 0);
    ManageSensorGroupsDialog = __decorate([
        n$4('manage-sensor-groups-dialog')
    ], ManageSensorGroupsDialog);

    var manageSensorGroupsDialog = /*#__PURE__*/Object.freeze({
        __proto__: null,
        get ManageSensorGroupsDialog () { return ManageSensorGroupsDialog; }
    });

    let SensorEditorCard = class SensorEditorCard extends SubscribeMixin(h$2) {
        constructor() {
            super(...arguments);
            this.showBypassModes = false;
        }
        hassSubscribe() {
            this._fetchData();
            return [this.hass.connection.subscribeMessage(() => this._fetchData(), { type: 'alarmo_config_updated' })];
        }
        async _fetchData() {
            var _a;
            if (!this.hass)
                return;
            const areas = await fetchAreas(this.hass);
            this.areas = areas;
            const sensorGroups = await fetchSensorGroups(this.hass);
            this.sensorGroups = sensorGroups;
            const sensors = await fetchSensors(this.hass);
            this.data = Object.keys(sensors).includes(this.item) ? sensors[this.item] : undefined;
            if (this.data && !((_a = this.data) === null || _a === void 0 ? void 0 : _a.area) && Object.keys(areas).length == 1)
                this.data = Object.assign(Object.assign({}, this.data), { area: Object.keys(this.areas)[0] });
        }
        render() {
            if (!this.data)
                return T ``;
            const stateObj = this.hass.states[this.data.entity_id];
            return T `
      <ha-card>
        <div class="card-header">
          <div class="name">${localize('panels.sensors.cards.editor.title', this.hass.language)}</div>
          <ha-icon-button icon="hass:close" @click=${this.cancelClick}>
            <ha-icon icon="hass:close"></ha-icon>
          </ha-icon-button>
        </div>
        <div class="card-content">
          ${localize('panels.sensors.cards.editor.description', this.hass.language, '{entity}', this.item)}
        </div>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${localize('panels.sensors.cards.editor.fields.name.heading', this.hass.language)}</span>
          <span slot="description">${localize('panels.sensors.cards.editor.fields.name.description', this.hass.language)}</span>

          <paper-input
            label="${localize('panels.sensors.cards.editor.fields.name.heading', this.hass.language)}"
            placeholder=${(stateObj === null || stateObj === void 0 ? void 0 : stateObj.attributes.friendly_name) || ''}
            value=${this.data.name}
            @change=${(ev) => (this.data = { ...this.data, name: ev.target.value })}
          >
          </paper-input>
        </settings-row>

        ${Object.keys(this.areas).length > 1
            ? T `
        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${localize('panels.sensors.cards.editor.fields.area.heading', this.hass.language)}</span>
          <span slot="description">${localize('panels.sensors.cards.editor.fields.area.description', this.hass.language)}</span>

          <alarmo-select
            .items=${Object.values(this.areas).map(e => Object({ value: e.area_id, name: e.name }))}
            value=${this.data.area}
            label=${localize('panels.sensors.cards.editor.fields.area.heading', this.hass.language)}
            @value-changed=${(ev) => (this.data = { ...this.data, area: ev.target.value })}
          </alarmo-select>
        </settings-row>`
            : ''}

        <settings-row .narrow=${this.narrow} .large=${true}>
          <span slot="heading">${localize('panels.sensors.cards.editor.fields.device_type.heading', this.hass.language)}</span>
          <span slot="description">${localize('panels.sensors.cards.editor.fields.device_type.description', this.hass.language)}</span>

          <alarmo-select
            .hass=${this.hass}
            .items=${getSensorTypeOptions(this.hass)}
            label=${localize('panels.sensors.cards.editor.fields.device_type.heading', this.hass.language)}
            clearable=${true}
            icons=${true}
            value=${this.data['type']}
            @value-changed=${(ev) => this.setType((ev.target.value || ESensorTypes.Other))}
          >
          </alarmo-select>
        </settings-row>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${localize('panels.sensors.cards.editor.fields.modes.heading', this.hass.language)}</span>
          <span slot="description">${localize('panels.sensors.cards.editor.fields.modes.description', this.hass.language)}</span>

          <div>
            ${this.modesByArea(this.data.area).map(el => T `
                <mwc-button
                  class="${this.data.modes.includes(el) ? 'active' : ''}"
                  @click=${() => { this.setMode(el); }}
                >
                  <ha-icon icon="${EArmModeIcons[Object.entries(EArmModes).find(([, v]) => v == el)[0]]}"></ha-icon>
                  ${localize(`common.modes_short.${el}`, this.hass.language)}
                </mwc-button>
              `)}
          </div>
        </settings-row>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${localize('panels.sensors.cards.editor.fields.group.heading', this.hass.language)}</span>
          <span slot="description">${localize('panels.sensors.cards.editor.fields.group.description', this.hass.language)}</span>

          <div>
           ${Object.keys(this.sensorGroups).length
            ? T `
            <alarmo-select
              .clearable=${true}
              .items=${this.getSensorGroups()}
              value=${this.data.group}
              label="${localize('panels.sensors.cards.editor.fields.group.heading', this.hass.language)}"
              @value-changed=${(ev) => { this.data = { ...this.data, group: ev.detail.value }; }}
            >
            </alarmo-select>
            ` : ''}
            <mwc-button
              @click=${this.manageGroupsClick}
            >
              ${localize('panels.sensors.cards.editor.actions.setup_groups', this.hass.language)}
            </mwc-button>
          </div>

        </settings-row>

        <collapsible-section
          .narrow=${this.narrow}
          header=${localize('panels.sensors.cards.editor.actions.toggle_advanced', this.hass.language)}
        >
        ${!this.data.type || [ESensorTypes.Environmental, ESensorTypes.Other].includes(this.data.type)
            ? T `
          <settings-row .narrow=${this.narrow}>
            <span slot="heading">${localize('panels.sensors.cards.editor.fields.always_on.heading', this.hass.language)}</span>
            <span slot="description">${localize('panels.sensors.cards.editor.fields.always_on.description', this.hass.language)}</span>

            <ha-switch
              ?checked=${this.data.always_on}
              @change=${(ev) => this._SetData({ always_on: ev.target.checked })}
            >
            </ha-switch>
          </settings-row>
        ` : ''}

        ${!this.data.type || [ESensorTypes.Window, ESensorTypes.Door, ESensorTypes.Motion, ESensorTypes.Other].includes(this.data.type)
            ? T `
          <settings-row .narrow=${this.narrow}>
            <span slot="heading">${localize('panels.sensors.cards.editor.fields.use_exit_delay.heading', this.hass.language)}</span>
            <span slot="description">${localize('panels.sensors.cards.editor.fields.use_exit_delay.description', this.hass.language)}</span>

            <ha-switch
              ?checked=${this.data.use_exit_delay}
              ?disabled=${this.data.always_on}
              @change=${(ev) => this._SetData({ use_exit_delay: ev.target.checked })}
            >
            </ha-switch>
          </settings-row>

        ${(!this.data.type || [ESensorTypes.Motion, ESensorTypes.Other].includes(this.data.type)) && this.data.use_exit_delay
                ? T `
          <settings-row .narrow=${this.narrow} nested>
            <span slot="heading">${localize('panels.sensors.cards.editor.fields.allow_open.heading', this.hass.language)}</span>
            <span slot="description">${localize('panels.sensors.cards.editor.fields.allow_open.description', this.hass.language)}</span>

            <ha-switch
              ?checked=${this.data.allow_open}
              ?disabled=${this.data.always_on || this.data.arm_on_close}
              @change=${(ev) => this._SetData({ allow_open: ev.target.checked })}
            >
            </ha-switch>
          </settings-row>
        ` : ''}


        ` : ''}

        ${!this.data.type || [ESensorTypes.Window, ESensorTypes.Door, ESensorTypes.Motion, ESensorTypes.Other].includes(this.data.type)
            ? T `
          <settings-row .narrow=${this.narrow}>
            <span slot="heading">${localize('panels.sensors.cards.editor.fields.use_entry_delay.heading', this.hass.language)}</span>
            <span slot="description">${localize('panels.sensors.cards.editor.fields.use_entry_delay.description', this.hass.language)}</span>

            <ha-switch
              ?checked=${this.data.use_entry_delay}
              ?disabled=${this.data.always_on}
              @change=${(ev) => this._SetData({ use_entry_delay: ev.target.checked })}
            >
            </ha-switch>
          </settings-row>
        ` : ''}

        ${!this.data.type || [ESensorTypes.Door, ESensorTypes.Other].includes(this.data.type)
            ? T `
          <settings-row .narrow=${this.narrow}>
            <span slot="heading">${localize('panels.sensors.cards.editor.fields.arm_on_close.heading', this.hass.language)}</span>
            <span slot="description">${localize('panels.sensors.cards.editor.fields.arm_on_close.description', this.hass.language)}</span>

            <ha-switch
              ?checked=${this.data.arm_on_close}
              ?disabled=${this.data.always_on}
              @change=${(ev) => this._SetData({ arm_on_close: ev.target.checked })}
            >
            </ha-switch>
          </settings-row>
        ` : ''}

        ${!this.data.type || [ESensorTypes.Window, ESensorTypes.Door, ESensorTypes.Other].includes(this.data.type)
            ? T `
          <settings-row .narrow=${this.narrow}>
            <span slot="heading">${localize('panels.sensors.cards.editor.fields.auto_bypass.heading', this.hass.language)}</span>
            <span slot="description">${localize('panels.sensors.cards.editor.fields.auto_bypass.description', this.hass.language)}</span>

            <ha-switch
              ?checked=${this.data.auto_bypass}
              ?disabled=${this.data.always_on}
              @change=${(ev) => this._SetData({ auto_bypass: ev.target.checked })}
            >
            </ha-switch>
          </settings-row>

          ${this.data.auto_bypass
                ? T `
            <settings-row .narrow=${this.narrow} nested>
              <span slot="heading">${localize('panels.sensors.cards.editor.fields.auto_bypass.modes', this.hass.language)}</span>
              <div>
              ${this.modesByArea(this.data.area).map(el => T `
                <mwc-button
                  class="${this.data.auto_bypass_modes.includes(el) && this.data.modes.includes(el) ? 'active' : ''}"
                  ?disabled=${!this.data.modes.includes(el)}
                  @click=${() => { this.setBypassMode(el); }}
                >
                  <ha-icon icon="${EArmModeIcons[Object.entries(EArmModes).find(([, v]) => v == el)[0]]}"></ha-icon>
                  ${localize(`common.modes_short.${el}`, this.hass.language)}
                </mwc-button>
                  `)}
              </div>
            </settings-row>
          ` : ''}
        ` : ''}

          <settings-row .narrow=${this.narrow}>
            <span slot="heading">${localize('panels.sensors.cards.editor.fields.trigger_unavailable.heading', this.hass.language)}</span>
            <span slot="description">${localize('panels.sensors.cards.editor.fields.trigger_unavailable.description', this.hass.language)}</span>

            <ha-switch
              ?checked=${this.data.trigger_unavailable}
              @change=${(ev) => this._SetData({ trigger_unavailable: ev.target.checked })}
            >
            </ha-switch>
          </settings-row>
        </collapsible-section>

        <div class="card-actions">
          <mwc-button @click=${this.saveClick}>
            ${this.hass.localize('ui.common.save')}
          </mwc-button>

          <mwc-button class="warning" @click=${this.deleteClick}>
            ${localize('panels.sensors.cards.editor.actions.remove', this.hass.language)}
          </mwc-button>
        </div>
      </ha-card>
    `;
        }
        modesByArea(area_id) {
            const modesPerArea = Object.keys(this.areas).reduce((obj, e) => Object.assign(obj, {
                [e]: Object.entries(this.areas[e].modes)
                    .filter(([, v]) => v.enabled)
                    .map(([k]) => k),
            }), {});
            return area_id ? modesPerArea[area_id] : Object.values(modesPerArea).reduce((a, b) => a.filter(i => b.includes(i)));
        }
        _SetData(data) {
            if (!this.data)
                return;
            for (const [key, val] of Object.entries(data)) {
                switch (key) {
                    case 'always_on':
                        this.data = Object.assign(Object.assign({}, this.data), { always_on: val == true });
                        if (val)
                            this.data = Object.assign(Object.assign({}, this.data), { arm_on_close: false, use_exit_delay: false, use_entry_delay: false, allow_open: false, auto_bypass: false });
                        break;
                    case 'use_entry_delay':
                        this.data = Object.assign(Object.assign({}, this.data), { use_entry_delay: val == true });
                        break;
                    case 'use_exit_delay':
                        this.data = Object.assign(Object.assign({}, this.data), { use_exit_delay: val == true });
                        if (val)
                            this.data = Object.assign(Object.assign({}, this.data), { allow_open: false });
                        break;
                    case 'arm_on_close':
                        this.data = Object.assign(Object.assign({}, this.data), { arm_on_close: val == true });
                        if (val)
                            this.data = Object.assign(Object.assign({}, this.data), { always_on: false, allow_open: false });
                        break;
                    case 'allow_open':
                        this.data = Object.assign(Object.assign({}, this.data), { allow_open: val == true });
                        if (val)
                            this.data = Object.assign(Object.assign({}, this.data), { arm_on_close: false, always_on: false, use_exit_delay: true });
                        break;
                    case 'auto_bypass':
                        this.data = Object.assign(Object.assign({}, this.data), { auto_bypass: val == true });
                        if (val)
                            this.data = Object.assign(Object.assign({}, this.data), { always_on: false });
                        break;
                    case 'trigger_unavailable':
                        this.data = Object.assign(Object.assign({}, this.data), { trigger_unavailable: val == true });
                        break;
                }
            }
        }
        setMode(mode) {
            if (!this.data)
                return;
            this.data = Object.assign(Object.assign({}, this.data), { modes: this.data.modes.includes(mode)
                    ? Without(this.data.modes, mode)
                    : Unique(this.data.modes.concat([mode])) });
        }
        ;
        setBypassMode(mode) {
            if (!this.data)
                return;
            this.data = Object.assign(Object.assign({}, this.data), { auto_bypass_modes: this.data.auto_bypass_modes.includes(mode)
                    ? Without(this.data.auto_bypass_modes, mode)
                    : Unique(this.data.auto_bypass_modes.concat([mode])) });
        }
        ;
        setType(type) {
            if (!this.data)
                return;
            const settings = type != ESensorTypes.Other ? sensorConfigByType(this.modesByArea(this.data.area))[type] : {};
            this.data = Object.assign(Object.assign(Object.assign({}, this.data), { type: type }), settings);
        }
        deleteClick(ev) {
            deleteSensor(this.hass, this.item)
                .catch(e => handleError(e, ev))
                .then(() => {
                this.cancelClick();
            });
        }
        saveClick(ev) {
            if (!this.data)
                return;
            const errors = [];
            this.data = Object.assign(Object.assign({}, this.data), { auto_bypass_modes: this.data.auto_bypass_modes.filter(e => this.data.modes.includes(e)) });
            if (!this.data.area)
                errors.push(localize('panels.sensors.cards.editor.errors.no_area', this.hass.language));
            if (!this.data.modes.length && !this.data.always_on)
                errors.push(localize('panels.sensors.cards.editor.errors.no_modes', this.hass.language));
            if (this.data.auto_bypass && !this.data.auto_bypass_modes.length)
                errors.push(localize('panels.sensors.cards.editor.errors.no_auto_bypass_modes', this.hass.language));
            if (errors.length) {
                showErrorDialog(ev, T `
          ${localize('panels.sensors.cards.editor.errors.description', this.hass.language)}
          <ul>
            ${errors.map(e => T `<li>${e}</li>`)}
          </ul>
        `);
            }
            else {
                saveSensor(this.hass, Object.assign({}, this.data))
                    .catch(e => handleError(e, ev))
                    .then(() => {
                    this.cancelClick();
                });
            }
        }
        cancelClick() {
            F(this, '/alarmo/sensors', true);
        }
        manageGroupsClick(ev) {
            const element = ev.target;
            C$1(element, 'show-dialog', {
                dialogTag: 'manage-sensor-groups-dialog',
                dialogImport: () => Promise.resolve().then(function () { return manageSensorGroupsDialog; }),
                dialogParams: {},
            });
        }
        getSensorGroups() {
            return Object.keys(this.sensorGroups)
                .map(e => Object({
                value: e,
                name: this.sensorGroups[e].name,
            }));
        }
    };
    SensorEditorCard.styles = commonStyle;
    __decorate([
        e$3()
    ], SensorEditorCard.prototype, "hass", void 0);
    __decorate([
        e$3()
    ], SensorEditorCard.prototype, "narrow", void 0);
    __decorate([
        e$3()
    ], SensorEditorCard.prototype, "item", void 0);
    __decorate([
        e$3()
    ], SensorEditorCard.prototype, "data", void 0);
    __decorate([
        e$3()
    ], SensorEditorCard.prototype, "showBypassModes", void 0);
    SensorEditorCard = __decorate([
        n$4('sensor-editor-card')
    ], SensorEditorCard);

    let SensorsOverviewCard = class SensorsOverviewCard extends SubscribeMixin(h$2) {
        constructor() {
            super(...arguments);
            this.areas = {};
            this.sensors = {};
            this.areaFilterOptions = [];
        }
        hassSubscribe() {
            this._fetchData();
            return [this.hass.connection.subscribeMessage(() => this._fetchData(), { type: 'alarmo_config_updated' })];
        }
        async _fetchData() {
            if (!this.hass) {
                return;
            }
            this.areas = await fetchAreas(this.hass);
            this.sensors = await fetchSensors(this.hass);
            this.areaFilterOptions = Object.values(this.areas)
                .map(e => Object({
                value: e.area_id,
                name: e.name,
                count: Object.values(this.sensors).filter(el => el.area == e.area_id).length
            }))
                .sort(sortAlphabetically);
            if (Object.values(this.sensors).filter(e => !e.area).length)
                this.areaFilterOptions = [{
                        value: 'no_area',
                        name: localize('panels.sensors.cards.sensors.filter.no_area', this.hass.language),
                        count: Object.values(this.sensors).filter(e => !e.area).length
                    }, ...this.areaFilterOptions];
        }
        async firstUpdated() {
            if (this.path && this.path.length == 2 && this.path[0] == 'filter')
                this.selectedArea = this.path[1];
        }
        render() {
            if (!this.hass)
                return T ``;
            return T `
      <ha-card header="${localize('panels.sensors.title', this.hass.language)}">
        <div class="card-content">
          ${localize('panels.sensors.cards.sensors.description', this.hass.language)}
        </div>

        ${this.areaFilterOptions.length > 1
            ? T `
            <div class="table-filter" ?narrow=${this.narrow}>
            <span class="header">${localize('panels.sensors.cards.sensors.filter.label', this.hass.language)}:</span>
            <alarmo-chips
              .items=${this.areaFilterOptions}
              value=${this.selectedArea}
              selectable
              @value-changed=${(ev) => (this.selectedArea = ev.target.value)}
            >
            </alarmo-chips>
            </div>
        ` : ''}

        <alarmo-table
          ?selectable=${true}
          .columns=${this.tableColumns()}
          .data=${this.renderTableData()}
          @row-click=${(ev) => { F(this, `/alarmo/sensors/edit/${String(ev.detail.id)}`, true); }}
        >
          ${localize('panels.sensors.cards.sensors.no_items', this.hass.language)}
        </alarmo-table>
      </ha-card>
    `;
        }
        tableColumns() {
            return {
                icon: {
                    width: '40px',
                },
                name: {
                    title: this.hass.localize('ui.components.entity.entity-picker.entity'),
                    width: '60%',
                    grow: true,
                    text: true,
                },
                modes: {
                    title: localize('panels.sensors.cards.sensors.table.arm_modes', this.hass.language),
                    width: '25%',
                    hide: this.narrow,
                    text: true,
                },
                enabled: {
                    title: localize('panels.actions.cards.notifications.table.enabled', this.hass.language),
                    width: '68px',
                    align: 'center',
                },
            };
        }
        renderTableData() {
            let sensorsList = Object.keys(this.sensors).map(e => {
                const stateObj = this.hass.states[e];
                return {
                    id: e,
                    name: computeName(stateObj),
                    icon: computeIcon(stateObj),
                };
            });
            sensorsList.sort(sortAlphabetically);
            sensorsList = sensorsList
                .filter(e => !this.selectedArea ||
                !this.areaFilterOptions.find(e => e.value == this.selectedArea) ||
                this.sensors[e.id].area == this.selectedArea ||
                (this.selectedArea === 'no_area' && !this.sensors[e.id].area));
            return sensorsList.map(e => this.renderTableDataRow(e));
        }
        renderTableDataRow(item) {
            const type = Object.entries(ESensorTypes).find(([, v]) => v == this.sensors[item.id].type)[0];
            const stateObj = this.hass.states[item.id];
            const output = {
                icon: T `
        <paper-tooltip animation-delay="0">
          ${stateObj
                ? localize(`panels.sensors.cards.editor.fields.device_type.choose.${ESensorTypes[type]}.name`, this.hass.language)
                : this.hass.localize("state_badge.default.entity_not_found")}
        </paper-tooltip>
        <ha-icon icon="${stateObj ? ESensorIcons[type] : "hass:help-circle-outline"}"> </ha-icon>
      `,
                name: T `
        ${stateObj
                ? this.sensors[item.id].name || prettyPrint(item.name)
                : prettyPrint(item.name)}
        <span class="secondary">${item.id}</span>
      `,
                id: item.id,
                modes: T `
        ${this.sensors[item.id].always_on
                ? localize('panels.sensors.cards.sensors.table.always_on', this.hass.language)
                : Object.values(EArmModes)
                    .filter(e => this.sensors[item.id].modes.includes(e))
                    .map(e => localize(`common.modes_short.${e}`, this.hass.language))
                    .join(', ')}
      `,
                enabled: T `
        <ha-switch
          @click=${(ev) => { ev.stopPropagation(); }}
          ?checked=${this.sensors[item.id].enabled}
          @change=${(ev) => this.toggleEnabled(ev, item.id)}
        >
        </ha-switch>
      `,
            };
            return output;
        }
        toggleEnabled(ev, id) {
            const enabled = ev.target.checked;
            saveSensor(this.hass, { entity_id: id, enabled: enabled })
                .catch(e => handleError(e, ev))
                .then();
        }
    };
    SensorsOverviewCard.styles = commonStyle;
    __decorate([
        e$3()
    ], SensorsOverviewCard.prototype, "hass", void 0);
    __decorate([
        e$3()
    ], SensorsOverviewCard.prototype, "narrow", void 0);
    __decorate([
        e$3()
    ], SensorsOverviewCard.prototype, "areas", void 0);
    __decorate([
        e$3()
    ], SensorsOverviewCard.prototype, "sensors", void 0);
    __decorate([
        e$3()
    ], SensorsOverviewCard.prototype, "selectedArea", void 0);
    __decorate([
        e$3()
    ], SensorsOverviewCard.prototype, "areaFilterOptions", void 0);
    __decorate([
        e$3()
    ], SensorsOverviewCard.prototype, "path", void 0);
    SensorsOverviewCard = __decorate([
        n$4('sensors-overview-card')
    ], SensorsOverviewCard);

    let AddSensorsCard = class AddSensorsCard extends SubscribeMixin(h$2) {
        constructor() {
            super(...arguments);
            this.showAllSensorEntities = false;
            this.addSelection = [];
            this.areas = {};
            this.sensors = {};
        }
        hassSubscribe() {
            this._fetchData();
            return [this.hass.connection.subscribeMessage(() => this._fetchData(), { type: 'alarmo_config_updated' })];
        }
        async _fetchData() {
            if (!this.hass) {
                return;
            }
            this.areas = await fetchAreas(this.hass);
        }
        async firstUpdated() {
            this.areas = await fetchAreas(this.hass);
            this.sensors = await fetchSensors(this.hass);
        }
        render() {
            const columns = {
                checkbox: {
                    width: '48px',
                },
                icon: {
                    width: '40px',
                },
                name: {
                    title: this.hass.localize('ui.components.entity.entity-picker.entity'),
                    width: '40%',
                    grow: true,
                    text: true,
                },
                type: {
                    title: localize('panels.sensors.cards.add_sensors.table.type', this.hass.language),
                    width: '40%',
                    hide: this.narrow,
                    text: true,
                },
            };
            const sensorList = getConfigurableSensors(this.hass, Object.keys(this.sensors), this.showAllSensorEntities);
            const tableData = sensorList.map(item => {
                const output = {
                    checkbox: T `
            <ha-checkbox
              @change=${(e) => this.toggleSelect(e, item.id)}
              ?checked=${this.addSelection.includes(item.id)}
            >
            </ha-checkbox>
          `,
                    icon: T `
            <state-badge .hass=${this.hass} .stateObj=${this.hass.states[item.id]}></state-badge>
          `,
                    name: T `
            ${prettyPrint(item.name)}
            <span class="secondary">${item.id}</span>
          `,
                    type: sensorClassToType(this.hass.states[item.id])
                        ? localize(`panels.sensors.cards.editor.fields.device_type.choose.${sensorClassToType(this.hass.states[item.id])}.name`, this.hass.language)
                        : this.hass.localize('state.default.unknown')
                };
                return output;
            });
            return T `
    <ha-card header="${localize('panels.sensors.cards.add_sensors.title', this.hass.language)}">
      <div class="card-content">
        ${localize('panels.sensors.cards.add_sensors.description', this.hass.language)}
      </div>

      <div style="display: flex; justify-content: flex-end; padding: 8px 16px">
        <ha-switch
          @change=${(ev) => this.showAllSensorEntities = ev.target.checked}
          style="padding: 0px 8px"
        >
        </ha-switch>
        ${localize('panels.sensors.cards.add_sensors.actions.show_all', this.hass.language)}
      </div>

      <alarmo-table .columns=${columns} .data=${tableData}>
        ${localize('panels.sensors.cards.add_sensors.no_items', this.hass.language)}
      </alarmo-table>

      <div class="card-actions">
        <mwc-button @click=${this.addSelected} ?disabled=${this.addSelection.length == 0}>
          ${localize('panels.sensors.cards.add_sensors.actions.add_to_alarm', this.hass.language)}
        </mwc-button>
      </div>
    </ha-card>
  `;
        }
        toggleSelect(ev, id) {
            const checked = ev.target.checked;
            this.addSelection =
                checked && !this.addSelection.includes(id)
                    ? [...this.addSelection, id]
                    : !checked
                        ? this.addSelection.filter(e => e != id)
                        : this.addSelection;
        }
        addSelected(ev) {
            if (!this.hass)
                return;
            const modeList = Object.values(this.areas)
                .map(e => Object.entries(e.modes)
                .filter(([, v]) => v.enabled)
                .map(([k]) => k))
                .reduce((a, b) => a.filter(i => b.includes(i)));
            const data = this.addSelection
                .map(e => defaultSensorConfig(this.hass.states[e], modeList))
                .map(e => Object.keys(this.areas).length == 1
                ? Object.assign(e, {
                    area: Object.keys(this.areas)[0],
                })
                : e)
                .filter(e => e);
            data.forEach(el => {
                saveSensor(this.hass, el)
                    .catch(e => handleError(e, ev))
                    .then();
            });
            this.addSelection = [];
        }
    };
    AddSensorsCard.styles = commonStyle;
    __decorate([
        e$3()
    ], AddSensorsCard.prototype, "hass", void 0);
    __decorate([
        e$3()
    ], AddSensorsCard.prototype, "narrow", void 0);
    __decorate([
        e$3()
    ], AddSensorsCard.prototype, "showAllSensorEntities", void 0);
    __decorate([
        e$3()
    ], AddSensorsCard.prototype, "addSelection", void 0);
    __decorate([
        e$3()
    ], AddSensorsCard.prototype, "areas", void 0);
    __decorate([
        e$3()
    ], AddSensorsCard.prototype, "sensors", void 0);
    AddSensorsCard = __decorate([
        n$4('add-sensors-card')
    ], AddSensorsCard);

    let AlarmViewSensors = class AlarmViewSensors extends h$2 {
        firstUpdated() {
            (async () => await loadHaForm())();
            if (this.path && this.path.length == 2 && this.path[0] == 'filter')
                this.selectedArea = this.path[1];
        }
        render() {
            if (!this.hass)
                return T ``;
            if (this.path && this.path.length == 2 && this.path[0] == 'edit') {
                return T `
        <sensor-editor-card .hass=${this.hass} .narrow=${this.narrow} .item=${this.path[1]}> </sensor-editor-card>
      `;
            }
            else {
                return T `
        <sensors-overview-card
          .hass=${this.hass}
          .narrow=${this.narrow}
          .selectedArea=${this.selectedArea}
        >
        </sensors-overview-card>
        <add-sensors-card
          .hass=${this.hass}
          .narrow=${this.narrow}
        >
        </add-sensors-card>
      `;
            }
        }
    };
    __decorate([
        e$3()
    ], AlarmViewSensors.prototype, "hass", void 0);
    __decorate([
        e$3()
    ], AlarmViewSensors.prototype, "narrow", void 0);
    __decorate([
        e$3()
    ], AlarmViewSensors.prototype, "path", void 0);
    __decorate([
        e$3()
    ], AlarmViewSensors.prototype, "selectedArea", void 0);
    AlarmViewSensors = __decorate([
        n$4('alarm-view-sensors')
    ], AlarmViewSensors);

    let UserEditorCard = class UserEditorCard extends h$2 {
        constructor() {
            super(...arguments);
            this.data = {
                is_admin: false,
                can_arm: true,
                can_disarm: true,
                is_override_code: false,
            };
            this.repeatCode = '';
            this.areas = {};
        }
        async firstUpdated() {
            this.users = await fetchUsers(this.hass);
            this.areas = await fetchAreas(this.hass);
            if (this.item) {
                const user = this.users[this.item];
                this.data = omit(user, 'code', 'code_format', 'code_length');
            }
            this.data = Object.assign(Object.assign({}, this.data), { area_limit: (this.data.area_limit || []).filter(e => Object.keys(this.areas).includes(e)) });
            if (!(this.data.area_limit || []).length)
                this.data = Object.assign(Object.assign({}, this.data), { area_limit: Object.keys(this.areas) });
        }
        render() {
            var _a;
            if (!this.users)
                return T ``;
            return T `
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${this.item
            ? localize('panels.codes.cards.edit_user.title', this.hass.language)
            : localize('panels.codes.cards.new_user.title', this.hass.language)}
          </div>
          <ha-icon-button icon="hass:close" @click=${this.cancelClick}>
            <ha-icon icon="hass:close"></ha-icon>
          </ha-icon-button>
        </div>
        <div class="card-content">
          ${this.item
            ? localize('panels.codes.cards.edit_user.description', this.hass.language, '{name}', this.users[this.item].name)
            : localize('panels.codes.cards.new_user.description', this.hass.language)}
        </div>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${localize('panels.codes.cards.new_user.fields.name.heading', this.hass.language)}</span>
          <span slot="description">${localize('panels.codes.cards.new_user.fields.name.description', this.hass.language)}</span>

          <paper-input
            label="${localize('panels.codes.cards.new_user.fields.name.heading', this.hass.language)}"
            placeholder=""
            value=${this.data.name}
            @change=${(ev) => (this.data = { ...this.data, name: ev.target.value })}
          >
          </paper-input>
        </settings-row>

        ${this.item
            ? T `
              <settings-row .narrow=${this.narrow}>
                <span slot="heading">${localize('panels.codes.cards.edit_user.fields.old_code.heading', this.hass.language)}</span>
                <span slot="description">${localize('panels.codes.cards.edit_user.fields.old_code.description', this.hass.language)}</span>

                <paper-input
                  label="${localize('panels.codes.cards.edit_user.fields.old_code.heading', this.hass.language)}"
                  placeholder=""
                  type="password"
                  value=${this.data.old_code || ''}
                  @change=${(ev) => (this.data = { ...this.data, old_code: String(ev.target.value).trim() })}
                >
                </paper-input>
              </settings-row>
            `
            : ''}
        ${this.item && !((_a = this.data.old_code) === null || _a === void 0 ? void 0 : _a.length)
            ? ''
            : T `
              <settings-row .narrow=${this.narrow}>
                <span slot="heading">${localize('panels.codes.cards.new_user.fields.code.heading', this.hass.language)}</span>
                <span slot="description">${localize('panels.codes.cards.new_user.fields.code.description', this.hass.language)}</span>

                <paper-input
                  label="${localize('panels.codes.cards.new_user.fields.code.heading', this.hass.language)}"
                  placeholder=""
                  type="password"
                  value=${this.data.code}
                  @change=${(ev) => (this.data = { ...this.data, code: String(ev.target.value).trim() })}
                >
                </paper-input>
              </settings-row>

              <settings-row .narrow=${this.narrow}>
                <span slot="heading">${localize('panels.codes.cards.new_user.fields.confirm_code.heading', this.hass.language)}</span>
                <span slot="description">${localize('panels.codes.cards.new_user.fields.confirm_code.description', this.hass.language)}</span>

                <paper-input
                  label="${localize('panels.codes.cards.new_user.fields.confirm_code.heading', this.hass.language)}"
                  placeholder=""
                  type="password"
                  value=${this.repeatCode || ''}
                  @change=${(ev) => this.repeatCode = String(ev.target.value).trim()}
                >
                </paper-input>
              </settings-row>
            `}

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${localize('panels.codes.cards.new_user.fields.is_admin.heading', this.hass.language)}</span>
          <span slot="description">${localize('panels.codes.cards.new_user.fields.is_admin.description', this.hass.language)}</span>

          <ha-switch
            ?checked=${this.data.is_admin}
            @change=${(ev) => (this.data = { ...this.data, is_admin: ev.target.checked })}
          >
          </ha-switch>
        </settings-row>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${localize('panels.codes.cards.new_user.fields.can_arm.heading', this.hass.language)}</span>
          <span slot="description">${localize('panels.codes.cards.new_user.fields.can_arm.description', this.hass.language)}</span>

          <ha-switch
            ?checked=${this.data.can_arm || this.data.is_admin}
            ?disabled=${this.data.is_admin}
            @change=${(ev) => (this.data = { ...this.data, can_arm: ev.target.checked })}
          >
          </ha-switch>
        </settings-row>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${localize('panels.codes.cards.new_user.fields.can_disarm.heading', this.hass.language)}</span>
          <span slot="description">${localize('panels.codes.cards.new_user.fields.can_disarm.description', this.hass.language)}</span>

          <ha-switch
            ?checked=${this.data.can_disarm || this.data.is_admin}
            ?disabled=${this.data.is_admin}
            @change=${(ev) => (this.data = { ...this.data, can_disarm: ev.target.checked })}
          >
          </ha-switch>
        </settings-row>

        ${this.getAreaOptions().length >= 2
            ? T `
        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${localize('panels.codes.cards.new_user.fields.area_limit.heading', this.hass.language)}</span>
          <span slot="description">${localize('panels.codes.cards.new_user.fields.area_limit.description', this.hass.language)}</span>

          <div class="checkbox-list">
            ${this.getAreaOptions().map(e => {
                var _a;
                const checked = (this.data.area_limit || []).includes(e.value) || !((_a = this.data.area_limit) === null || _a === void 0 ? void 0 : _a.length) || this.data.is_admin;
                return T `
              <div>
                <ha-checkbox
                  @change=${(ev) => this.toggleSelectArea(e.value, ev.target.checked)}
                  ?disabled=${this.data.is_admin || (checked && (this.data.area_limit || []).length <= 1)}
                  ?checked=${checked}
                >
                </ha-checkbox>
                <span
                  @click=${() => this.toggleSelectArea(e.value, !checked)}
                >
                  ${e.name}
                </span>
              </div>
            `;
            })}
          </div>
        </settings-row>
        `
            : ''}

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${localize('panels.codes.cards.new_user.fields.is_override_code.heading', this.hass.language)}</span>
          <span slot="description">${localize('panels.codes.cards.new_user.fields.is_override_code.description', this.hass.language)}</span>

          <ha-switch
            ?checked=${this.data.is_override_code}
            @change=${(ev) => (this.data = { ...this.data, is_override_code: ev.target.checked })}
          >
          </ha-switch>
        </settings-row>

        <div class="card-actions">
          <mwc-button @click=${this.saveClick}>
            ${this.hass.localize('ui.common.save')}
          </mwc-button>

          ${this.item
            ? T `
                <mwc-button class="warning" @click=${this.deleteClick}>
                  ${this.hass.localize('ui.common.delete')}
                </mwc-button>
              `
            : ''}
        </div>
      </ha-card>
    `;
        }
        getAreaOptions() {
            let areas = Object.keys(this.areas || {})
                .map(e => Object({
                value: e,
                name: this.areas[e].name,
            }));
            areas.sort(sortAlphabetically);
            return areas;
        }
        toggleSelectArea(id, checked) {
            if (this.data.is_admin || ((this.data.area_limit || []).length <= 1 && !checked))
                return;
            let areaLimit = this.data.area_limit || [];
            areaLimit = checked
                ? areaLimit.includes(id)
                    ? areaLimit
                    : [...areaLimit, id]
                : areaLimit.includes(id)
                    ? areaLimit.filter(e => e != id)
                    : areaLimit;
            this.data = Object.assign(Object.assign({}, this.data), { area_limit: areaLimit });
        }
        deleteClick(ev) {
            if (!this.item)
                return;
            deleteUser(this.hass, this.item)
                .catch(e => handleError(e, ev))
                .then(() => {
                this.cancelClick();
            });
        }
        saveClick(ev) {
            var _a, _b, _c;
            let data = Object.assign({}, this.data);
            if (!((_a = data.name) === null || _a === void 0 ? void 0 : _a.length))
                showErrorDialog(ev, localize('panels.codes.cards.new_user.errors.no_name', this.hass.language));
            else if ((!((_b = data.code) === null || _b === void 0 ? void 0 : _b.length) || data.code.length < 4) && (!this.item || ((_c = data.old_code) === null || _c === void 0 ? void 0 : _c.length)))
                showErrorDialog(ev, localize('panels.codes.cards.new_user.errors.no_code', this.hass.language));
            else if ((data.code || '').length && data.code !== this.repeatCode) {
                showErrorDialog(ev, localize('panels.codes.cards.new_user.errors.code_mismatch', this.hass.language));
                this.data = omit(this.data, 'code');
                this.repeatCode = '';
            }
            else {
                if (data.is_admin)
                    data = Object.assign(Object.assign({}, data), { can_arm: true, can_disarm: true, area_limit: [] });
                if (this.item) {
                    if ((data.old_code || '').length < 4)
                        omit(data, 'old_code', 'code');
                }
                if (!this.getAreaOptions().length || this.getAreaOptions().every(e => (this.data.area_limit || []).includes(e.value)))
                    data = Object.assign(Object.assign({}, data), { area_limit: [] });
                saveUser(this.hass, data)
                    .catch(e => handleError(e, ev))
                    .then(() => {
                    this.cancelClick();
                });
            }
        }
        cancelClick() {
            F(this, '/alarmo/codes', true);
        }
        static get styles() {
            return i `
      ${commonStyle}
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
    `;
        }
    };
    __decorate([
        e$3()
    ], UserEditorCard.prototype, "hass", void 0);
    __decorate([
        e$3()
    ], UserEditorCard.prototype, "narrow", void 0);
    __decorate([
        e$3()
    ], UserEditorCard.prototype, "item", void 0);
    __decorate([
        e$3()
    ], UserEditorCard.prototype, "data", void 0);
    __decorate([
        e$3()
    ], UserEditorCard.prototype, "repeatCode", void 0);
    UserEditorCard = __decorate([
        n$4('user-editor-card')
    ], UserEditorCard);

    let AlarmViewCodes = class AlarmViewCodes extends SubscribeMixin(h$2) {
        constructor() {
            super(...arguments);
            this.users = {};
            this.code_arm_required = false;
            this.code_disarm_required = false;
            this.code_format = 'number';
        }
        hassSubscribe() {
            this._fetchData();
            return [this.hass.connection.subscribeMessage(() => this._fetchData(), { type: 'alarmo_config_updated' })];
        }
        async _fetchData() {
            if (!this.hass) {
                return;
            }
            const config = await fetchConfig(this.hass);
            this.config = config;
            this.code_arm_required = config.code_arm_required;
            this.code_disarm_required = config.code_disarm_required;
            this.code_format = config.code_format;
            const users = await fetchUsers(this.hass);
            this.users = users;
        }
        render() {
            if (!this.hass)
                return T ``;
            if (this.path && this.path[0] == 'new_user') {
                return T `
        <user-editor-card .hass=${this.hass} .narrow=${this.narrow}> </user-editor-card>
      `;
            }
            else if (this.path && this.path.length == 2 && this.path[0] == 'edit_user') {
                return T `
        <user-editor-card .hass=${this.hass} .narrow=${this.narrow} item=${this.path[1]}> </user-editor-card>
      `;
            }
            else {
                return T `
        <ha-card header="${localize('panels.codes.title', this.hass.language)}">
          <div class="card-content">
            ${localize('panels.codes.cards.codes.description', this.hass.language)}
          </div>

          <settings-row .narrow=${this.narrow}>
            <span slot="heading"
              >${localize('panels.codes.cards.codes.fields.code_arm_required.heading', this.hass.language)}</span
            >
            <span slot="description"
              >${localize('panels.codes.cards.codes.fields.code_arm_required.description', this.hass.language)}</span
            >
            <ha-switch
              ?checked=${this.code_arm_required}
              @change=${(ev) => {
                this.code_arm_required = ev.target.checked;
            }}
            >
            </ha-switch>
          </settings-row>

          <settings-row .narrow=${this.narrow}>
            <span slot="heading"
              >${localize('panels.codes.cards.codes.fields.code_disarm_required.heading', this.hass.language)}</span
            >
            <span slot="description"
              >${localize('panels.codes.cards.codes.fields.code_disarm_required.description', this.hass.language)}</span
            >
            <ha-switch
              ?checked=${this.code_disarm_required}
              @change=${(ev) => {
                this.code_disarm_required = ev.target.checked;
            }}
            >
            </ha-switch>
          </settings-row>

          <settings-row .narrow=${this.narrow}>
            <span slot="heading"
              >${localize('panels.codes.cards.codes.fields.code_format.heading', this.hass.language)}</span
            >
            <span slot="description"
              >${localize('panels.codes.cards.codes.fields.code_format.description', this.hass.language)}</span
            >
            <mwc-button
              class="${this.code_format == 'number' ? 'active' : ''} ${!this.code_arm_required &&
                !this.code_disarm_required
                ? 'disabled'
                : ''}"
              @click=${() => {
                this.code_format = 'number';
            }}
              ?disabled=${!this.code_arm_required && !this.code_disarm_required}
              >${localize('panels.codes.cards.codes.fields.code_format.code_format_number', this.hass.language)}</mwc-button
            >
            <mwc-button
              class="${this.code_format == 'text' ? 'active' : ''} ${!this.code_arm_required &&
                !this.code_disarm_required
                ? 'disabled'
                : ''}"
              @click=${() => {
                this.code_format = 'text';
            }}
              ?disabled=${!this.code_arm_required && !this.code_disarm_required}
            >
              ${localize('panels.codes.cards.codes.fields.code_format.code_format_text', this.hass.language)}</mwc-button
            >
          </settings-row>

          <div class="card-actions">
            <mwc-button @click=${this.saveClick}>
              ${this.hass.localize('ui.common.save')}
            </mwc-button>
          </div>
        </ha-card>

        ${this.usersPanel()}
      `;
            }
        }
        usersPanel() {
            if (!this.hass)
                return T ``;
            const users = Object.values(this.users);
            users.sort(sortAlphabetically);
            const columns = {
                icon: {
                    width: '40px',
                },
                name: {
                    title: this.hass.localize('ui.components.area-picker.add_dialog.name'),
                    width: '40%',
                    grow: true,
                    text: true,
                },
                remarks: {
                    title: localize('panels.codes.cards.user_management.table.remarks', this.hass.language),
                    width: '40%',
                    hide: this.narrow,
                    text: true,
                },
            };
            const data = users.map(item => {
                const output = {
                    id: item.user_id,
                    icon: T `
          <ha-icon icon="mdi:account-outline"></ha-icon>
        `,
                    name: prettyPrint(item.name),
                    remarks: item.is_admin
                        ? localize('panels.codes.cards.user_management.table.administrator', this.hass.language)
                        : '',
                };
                return output;
            });
            return T `
      <ha-card header="${localize('panels.codes.cards.user_management.title', this.hass.language)}">
        <div class="card-content">
          ${localize('panels.codes.cards.user_management.description', this.hass.language)}
        </div>

        <alarmo-table
          ?selectable=${true}
          .columns=${columns}
          .data=${data}
          @row-click=${(ev) => {
            const id = String(ev.detail.id);
            F(this, `/alarmo/codes/edit_user/${id}`, true);
        }}
        >
          ${localize('panels.codes.cards.user_management.no_items', this.hass.language)}
        </alarmo-table>
        <div class="card-actions">
          <mwc-button @click=${this.addUserClick}>
            ${localize('panels.codes.cards.user_management.actions.new_user', this.hass.language)}
          </mwc-button>
        </div>
      </ha-card>
    `;
        }
        addUserClick() {
            F(this, '/alarmo/codes/new_user', true);
        }
        saveClick(ev) {
            if (!this.hass)
                return;
            saveConfig(this.hass, {
                code_arm_required: this.code_arm_required,
                code_disarm_required: this.code_disarm_required,
                code_format: this.code_format,
            })
                .catch(e => handleError(e, ev))
                .then();
        }
    };
    AlarmViewCodes.styles = commonStyle;
    __decorate([
        e$3()
    ], AlarmViewCodes.prototype, "narrow", void 0);
    __decorate([
        e$3()
    ], AlarmViewCodes.prototype, "path", void 0);
    __decorate([
        e$3()
    ], AlarmViewCodes.prototype, "config", void 0);
    __decorate([
        e$3()
    ], AlarmViewCodes.prototype, "users", void 0);
    __decorate([
        e$3()
    ], AlarmViewCodes.prototype, "code_arm_required", void 0);
    __decorate([
        e$3()
    ], AlarmViewCodes.prototype, "code_disarm_required", void 0);
    __decorate([
        e$3()
    ], AlarmViewCodes.prototype, "code_format", void 0);
    AlarmViewCodes = __decorate([
        n$4('alarm-view-codes')
    ], AlarmViewCodes);

    const computeArmModeDisplay = (val, hass) => {
        switch (val) {
            case EArmModes.ArmedAway:
                return {
                    value: EArmModes.ArmedAway,
                    name: localize('common.modes_long.armed_away', hass.language),
                    icon: EArmModeIcons.ArmedAway,
                };
            case EArmModes.ArmedHome:
                return {
                    value: EArmModes.ArmedHome,
                    name: localize('common.modes_long.armed_home', hass.language),
                    icon: EArmModeIcons.ArmedHome,
                };
            case EArmModes.ArmedNight:
                return {
                    value: EArmModes.ArmedNight,
                    name: localize('common.modes_long.armed_night', hass.language),
                    icon: EArmModeIcons.ArmedNight,
                };
            case EArmModes.ArmedCustom:
                return {
                    value: EArmModes.ArmedCustom,
                    name: localize('common.modes_long.armed_custom_bypass', hass.language),
                    icon: EArmModeIcons.ArmedCustom,
                };
        }
    };
    const computeEventDisplay = (event, hass) => {
        switch (event) {
            case EAlarmEvent.Armed:
                return {
                    value: EAlarmEvent.Armed,
                    name: localize('panels.actions.cards.new_notification.fields.event.choose.armed.name', hass.language),
                    description: localize('panels.actions.cards.new_notification.fields.event.choose.armed.description', hass.language),
                    icon: 'hass:shield-check-outline',
                };
            case EAlarmEvent.Disarmed:
                return {
                    value: EAlarmEvent.Disarmed,
                    name: localize('panels.actions.cards.new_notification.fields.event.choose.disarmed.name', hass.language),
                    description: localize('panels.actions.cards.new_notification.fields.event.choose.disarmed.description', hass.language),
                    icon: 'hass:shield-off-outline',
                };
            case EAlarmEvent.Triggered:
                return {
                    value: EAlarmEvent.Triggered,
                    name: localize('panels.actions.cards.new_notification.fields.event.choose.triggered.name', hass.language),
                    description: localize('panels.actions.cards.new_notification.fields.event.choose.triggered.description', hass.language),
                    icon: 'hass:bell-alert-outline',
                };
            case EAlarmEvent.ArmFailure:
                return {
                    value: EAlarmEvent.ArmFailure,
                    name: localize('panels.actions.cards.new_notification.fields.event.choose.arm_failure.name', hass.language),
                    description: localize('panels.actions.cards.new_notification.fields.event.choose.arm_failure.description', hass.language),
                    icon: 'hass:alert-outline',
                };
            case EAlarmEvent.Arming:
                return {
                    value: EAlarmEvent.Arming,
                    name: localize('panels.actions.cards.new_notification.fields.event.choose.arming.name', hass.language),
                    description: localize('panels.actions.cards.new_notification.fields.event.choose.arming.description', hass.language),
                    icon: 'hass:home-export-outline',
                };
            case EAlarmEvent.Pending:
                return {
                    value: EAlarmEvent.Pending,
                    name: localize('panels.actions.cards.new_notification.fields.event.choose.pending.name', hass.language),
                    description: localize('panels.actions.cards.new_notification.fields.event.choose.pending.description', hass.language),
                    icon: 'hass:home-import-outline',
                };
        }
    };
    const computeAreaDisplay = (area, areaConfig, alarmoConfig) => {
        if (area == 0) {
            return {
                name: alarmoConfig.master.name,
                value: 0,
            };
        }
        else if (Object.keys(areaConfig).includes(String(area))) {
            return {
                name: areaConfig[area].name,
                value: area,
            };
        }
        else {
            return {
                name: String(area),
                value: area,
            };
        }
    };
    const computeServiceDisplay = (hass, ...services) => {
        const output = services
            .map(service => {
            if (!service)
                return null;
            const domain = d$1(service);
            const domainService = f$1(service);
            let data = {
                value: service,
                name: domainService
                    .replace(/_/g, ' ')
                    .split(' ')
                    .map(e => e.substring(0, 1).toUpperCase() + e.substring(1))
                    .join(' '),
                icon: 'hass:home',
                description: service,
            };
            switch (domain) {
                case 'notify':
                    const stateObj = hass.states[`device_tracker.${domainService.replace('mobile_app_', '')}`];
                    data = stateObj
                        ? Object.assign(Object.assign({}, data), { name: stateObj.attributes.friendly_name || f$1(stateObj.entity_id), icon: stateObj.attributes.icon || 'hass:cellphone-text' }) : Object.assign(Object.assign({}, data), { icon: 'hass:comment-alert' });
                    break;
                case 'tts':
                    data = Object.assign(Object.assign({}, data), { icon: 'hass:microphone' });
                    break;
            }
            return data;
        })
            .filter(isDefined);
        output.sort(sortAlphabetically);
        return output;
    };
    const getAreaOptions = (areaConfig, alarmoConfig) => {
        let areas = [];
        const area_ids = Object.keys(areaConfig).filter(e => Object.values(areaConfig[e].modes).some(v => v.enabled));
        if (alarmoConfig.master.enabled && area_ids.length > 1)
            areas = [...areas, 0];
        areas = [...areas, ...area_ids];
        return areas;
    };
    const getArmModeOptions = (area, areaConfig) => {
        const areaList = (areaCfg) => Object.keys(areaCfg.modes).filter(mode => areaCfg.modes[mode].enabled);
        if (!isDefined(area) || !Object.keys(areaConfig).includes(String(area))) {
            const modeLists = Object.keys(areaConfig).map(e => areaList(areaConfig[e]));
            return modeLists[0].filter(e => modeLists.every(m => m.includes(e)));
        }
        else {
            return areaList(areaConfig[area]);
        }
    };
    const computeEntityDisplay = (entity_id, hass) => {
        const data = entity_id.map(e => {
            const output = {
                value: e,
                name: e in hass.states ? hass.states[e].attributes.friendly_name || f$1(e) : e,
                icon: e in hass.states ? hass.states[e].attributes.icon || O(d$1(e)) : undefined,
                description: e,
            };
            return output;
        });
        return data;
    };
    const getNotifyServices = (hass) => [
        ...Object.keys(hass.services.notify).map(service => `notify.${service}`),
    ];
    const computeMergedActions = (...actionLists) => {
        if (!actionLists.length || !actionLists.every(e => e.length))
            return [];
        if (actionLists.length == 1 && actionLists[0].length > 1 && Unique(actionLists[0].map(d$1)).length > 1)
            return computeMergedActions(...actionLists[0].map(e => Array(e)));
        let intersection = [...actionLists[0]];
        actionLists.forEach(list => {
            intersection = intersection
                .map(e => {
                if (list.includes(e))
                    return e;
                else if (d$1(e) == 'script' && list.map(d$1).includes('script'))
                    return `script.script`;
                else if (list.map(f$1).includes(f$1(e)))
                    return `homeassistant.${f$1(e)}`;
                else
                    return null;
            })
                .filter(isDefined);
        });
        return intersection;
    };
    const computeActions = (entity_id, hass) => {
        if (Array.isArray(entity_id)) {
            const actionLists = entity_id.map(e => computeActions(e, hass));
            return computeMergedActions(...actionLists);
        }
        else if (!isDefined(entity_id))
            return [];
        const domain = d$1(entity_id);
        switch (domain) {
            case 'light':
            case 'switch':
            case 'input_boolean':
            case 'siren':
                return [`${domain}.turn_on`, `${domain}.turn_off`];
            case 'script':
                return [entity_id];
            case 'lock':
                return ['lock.lock', 'lock.unlock'];
            case 'group':
                const groupObj = entity_id in hass.states ? hass.states[entity_id] : undefined;
                const entities = (groupObj === null || groupObj === void 0 ? void 0 : groupObj.attributes.entity_id) || [];
                return computeActions(entities, hass);
            default:
                return [];
        }
    };
    const getAutomationEntities = (hass, additionalEntities) => {
        let entities = [...Object.keys(hass.states).filter(e => computeActions(e, hass).length)];
        if (additionalEntities && additionalEntities.length) {
            entities = [...entities, ...additionalEntities.filter(e => !entities.includes(e))];
        }
        entities.sort(sortAlphabetically);
        return entities;
    };
    const getWildcardOptions = (event) => {
        let options = [];
        options = [];
        if (!event || [EAlarmEvent.Pending, EAlarmEvent.Triggered, EAlarmEvent.ArmFailure].includes(event))
            options = [
                ...options,
                {
                    name: 'Open Sensors',
                    value: '{{open_sensors}}',
                },
            ];
        if (!event || [EAlarmEvent.Armed].includes(event))
            options = [
                ...options,
                {
                    name: 'Bypassed Sensors',
                    value: '{{bypassed_sensors}}',
                },
            ];
        if (!event || [EAlarmEvent.Armed, EAlarmEvent.Arming, EAlarmEvent.Disarmed].includes(event))
            options = [
                ...options,
                {
                    name: 'Changed By',
                    value: '{{changed_by}}',
                },
            ];
        if (!event ||
            [
                EAlarmEvent.Armed,
                EAlarmEvent.Arming,
                EAlarmEvent.Pending,
                EAlarmEvent.Triggered,
                EAlarmEvent.ArmFailure,
            ].includes(event))
            options = [
                ...options,
                {
                    name: 'Arm Mode',
                    value: '{{arm_mode}}',
                },
            ];
        return options;
    };
    const getOpenSensorsWildCardOptions = (hass) => {
        let options = [];
        if (hass.language != 'en')
            options = [
                ...options,
                {
                    value: '{{open_sensors}}',
                    name: `${localize('panels.actions.cards.new_notification.fields.open_sensors_format.options.default', hass.language)} (${hass.translationMetadata.translations['en'].nativeName})`
                },
                {
                    value: `{{open_sensors|lang=${hass.language}}}`,
                    name: `${localize('panels.actions.cards.new_notification.fields.open_sensors_format.options.default', hass.language)} (${hass.translationMetadata.translations[hass.language].nativeName})`
                }
            ];
        else
            options = [
                ...options,
                {
                    value: '{{open_sensors}}',
                    name: localize('panels.actions.cards.new_notification.fields.open_sensors_format.options.default', hass.language)
                }
            ];
        options = [
            ...options,
            {
                value: '{{open_sensors|format=short}}',
                name: localize('panels.actions.cards.new_notification.fields.open_sensors_format.options.short', hass.language)
            }
        ];
        return options;
    };
    const isValidString = (input) => {
        return typeof input == 'string' && input.trim().length;
    };
    const isValidService = (input, hass) => {
        return (isValidString(input) &&
            hass.services[d$1(input)] &&
            hass.services[d$1(input)][f$1(input)]);
    };
    const isValidEntity = (input, hass) => {
        return isValidString(input) && hass.states[input];
    };
    const isObject = (input) => typeof input === 'object' && input !== null && !Array.isArray(input);
    const isArray = (input) => typeof input === 'object' && input !== null && Array.isArray(input);
    const isString = (input) => typeof input === 'string';
    const computeActionDisplay = (action, hass) => {
        let service = f$1(action);
        if (d$1(action) == 'script')
            service = 'run';
        switch (service) {
            case 'turn_on':
                return hass.localize('ui.card.media_player.turn_on');
            case 'turn_off':
                return hass.localize('ui.card.media_player.turn_off');
            case 'lock':
                return hass.localize('ui.card.lock.lock');
            case 'unlock':
                return hass.localize('ui.card.lock.unlock');
            case 'run':
                return hass.localize('ui.card.script.run');
            default:
                return service;
        }
    };
    const findMatchingAction = (actionList, matchedAction) => {
        return actionList.find(action => {
            return (action == matchedAction ||
                (f$1(matchedAction) == 'turn_on' && f$1(action) == 'turn_on') ||
                (f$1(matchedAction) == 'turn_off' && f$1(action) == 'turn_off') ||
                (d$1(matchedAction) == 'script' && d$1(action) == 'script'));
        });
    };

    let AlarmoSelector = class AlarmoSelector extends h$2 {
        constructor() {
            super(...arguments);
            this.items = [];
            this.value = [];
            this.label = '';
            this.invalid = false;
        }
        shouldUpdate(changedProps) {
            if (changedProps.get('items')) {
                if (!IsEqual(this.items, changedProps.get('items')))
                    this.firstUpdated();
            }
            return true;
        }
        firstUpdated() {
            //remove items from selection which are not in the list (anymore)
            if (this.value.some(e => !this.items.map(v => v.value).includes(e))) {
                this.value = this.value.filter(e => this.items.map(v => v.value).includes(e));
                C$1(this, 'value-changed', { value: this.value });
            }
        }
        render() {
            return T `
      <div class="chip-set">
        ${this.value.length
            ? this.value
                .map(val => this.items.find(e => e.value == val))
                .filter(isDefined)
                .map(e => T `
          <div class="chip">
            <ha-icon class="icon" icon=${e.icon}>
            </ha-icon>
            <span class="label">
              ${e.name}
            </span>            
            <ha-icon class="button" icon="hass:close" @click=${() => this._removeClick(e.value)}>
            </ha-icon>
            </mwc-icon-button>
          </div>
        `)
            : ''}
        <alarmo-select
          .hass=${this.hass}
          .items=${this.items.filter(e => !this.value.includes(e.value))}
          ?disabled=${this.value.length == this.items.length}
          label=${this.label}
          icons=${true}
          @value-changed=${this._addClick}
          ?invalid=${this.invalid && this.value.length != this.items.length}
        >
        </alarmo-select>
      </div>
    `;
        }
        _removeClick(value) {
            this.value = this.value.filter(e => e !== value);
            C$1(this, 'value-changed', { value: this.value });
        }
        _addClick(ev) {
            ev.stopPropagation();
            const target = ev.target;
            const value = target.value;
            if (!this.value.includes(value))
                this.value = [...this.value, value];
            target.value = '';
            C$1(this, 'value-changed', { value: [...this.value] });
        }
        static get styles() {
            return i `
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
        margin: 1px 0px;
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
    `;
        }
    };
    __decorate([
        e$3()
    ], AlarmoSelector.prototype, "hass", void 0);
    __decorate([
        e$3()
    ], AlarmoSelector.prototype, "items", void 0);
    __decorate([
        e$3({ type: Array })
    ], AlarmoSelector.prototype, "value", void 0);
    __decorate([
        e$3()
    ], AlarmoSelector.prototype, "label", void 0);
    __decorate([
        e$3({ type: Boolean })
    ], AlarmoSelector.prototype, "invalid", void 0);
    AlarmoSelector = __decorate([
        n$4('alarmo-selector')
    ], AlarmoSelector);

    var ViewMode;
    (function (ViewMode) {
        ViewMode[ViewMode["Yaml"] = 0] = "Yaml";
        ViewMode[ViewMode["UI"] = 1] = "UI";
    })(ViewMode || (ViewMode = {}));
    let NotificationEditorCard = class NotificationEditorCard extends h$2 {
        constructor() {
            super(...arguments);
            this.config = {
                type: EAutomationTypes.Notification,
                triggers: [{}],
                actions: [{}]
            };
            this.viewMode = ViewMode.UI;
            this.errors = {};
        }
        async firstUpdated() {
            this.areas = await fetchAreas(this.hass);
            this.alarmoConfig = await fetchConfig(this.hass);
            if (this.item) {
                let actions = this.item.actions.map(e => omit(e, 'entity_id'));
                this.config = Object.assign(Object.assign({}, this.item), { actions: [actions[0], ...actions.slice(1)] });
                if (this.config.triggers.length > 1)
                    this.config = Object.assign(Object.assign({}, this.config), { triggers: [this.config.triggers[0]] });
                let area = this.config.triggers[0].area;
                if (isDefined(area) && !getAreaOptions(this.areas, this.alarmoConfig).includes(area))
                    area = undefined;
                else if (area === null)
                    area = 0;
                this._setArea(new CustomEvent('value-changed', { detail: { value: area } }));
            }
            //automatically set area if there is only 1 option
            if (!isDefined(this.config.triggers[0].area)) {
                const areaOptions = getAreaOptions(this.areas, this.alarmoConfig);
                if (areaOptions.length == 1)
                    this._setArea(new CustomEvent('value-changed', { detail: { value: areaOptions[0] } }));
                else if (areaOptions.includes(0))
                    this._setArea(new CustomEvent('value-changed', { detail: { value: 0 } }));
            }
        }
        render() {
            var _a, _b, _c;
            if (!this.hass || !this.areas || !this.alarmoConfig)
                return T ``;
            return T `
      <div class="heading">
        <ha-icon-button icon="hass:close" @click=${this._cancelClick} class="icon">
          <ha-icon icon="hass:close"></ha-icon>
        </ha-icon-button>
        <div class="header">${localize('panels.actions.cards.new_notification.title', this.hass.language)}</div>
        <div class="description">${localize('panels.actions.cards.new_notification.description', this.hass.language)}</div>
      </div>
      <div class="section-header">${localize('panels.actions.cards.new_notification.trigger', this.hass.language)}</div>
      <ha-card>
        <div class="card-content">
          <settings-row .narrow=${this.narrow} .large=${true} first>
            <span slot="heading">
              ${localize('panels.actions.cards.new_notification.fields.event.heading', this.hass.language)}
            </span>
            <span slot="description">
              ${localize('panels.actions.cards.new_notification.fields.event.description', this.hass.language)}
            </span>

            <alarmo-select
              .hass=${this.hass}
              .items=${Object.values(EAlarmEvent).map(e => computeEventDisplay(e, this.hass))}
              label=${localize('panels.actions.cards.new_action.fields.event.heading', this.hass.language)}
              icons=${true}
              .value=${this.config.triggers[0].event}
              @value-changed=${this._setEvent}
              ?invalid=${this.errors.event}
            ></alarmo-select>
          </settings-row>

          ${Object.keys(this.areas).length > 1
            ? T `
          <settings-row .narrow=${this.narrow} .large=${true}>
            <span slot="heading">
              ${localize('panels.actions.cards.new_action.fields.area.heading', this.hass.language)}
            </span>
            <span slot="description">
              ${localize('panels.actions.cards.new_action.fields.area.description', this.hass.language)}
            </span>
            
            <alarmo-select
              .hass=${this.hass}
              .items=${getAreaOptions(this.areas, this.alarmoConfig).map(e => computeAreaDisplay(e, this.areas, this.alarmoConfig))}
              clearable=${true}
              label=${localize('panels.actions.cards.new_action.fields.area.heading', this.hass.language)}
              .value=${this.config.triggers[0].area}
              @value-changed=${this._setArea}
              ?invalid=${this.errors.area}
            ></alarmo-select>
          </settings-row>
          ` : ''}

          <settings-row .narrow=${this.narrow} .large=${true} last>
            <span slot="heading">
              ${localize('panels.actions.cards.new_notification.fields.mode.heading', this.hass.language)}
            </span>
            <span slot="description">
              ${localize('panels.actions.cards.new_notification.fields.mode.description', this.hass.language)}
            </span>

            <alarmo-selector
              .hass=${this.hass}
              .items=${getArmModeOptions(this.config.triggers[0].area, this.areas).map(e => computeArmModeDisplay(e, this.hass))}
              label=${localize('panels.actions.cards.new_action.fields.mode.heading', this.hass.language)}
              .value=${this.config.triggers[0].modes || []}
              @value-changed=${this._setModes}
              ?invalid=${this.errors.modes}
            ></alarmo-selector>
          </settings-row>
        </div>
      </ha-card>
  
      <div class="section-header">${localize('panels.actions.cards.new_notification.action', this.hass.language)}</div>
      <ha-card>
        <div class="card-content">
          ${this.viewMode == ViewMode.UI
            ? T `
          <settings-row .narrow=${this.narrow} .large=${true} first>
            <span slot="heading">
              ${localize('panels.actions.cards.new_notification.fields.target.heading', this.hass.language)}
            </span>
            <span slot="description">
              ${localize('panels.actions.cards.new_notification.fields.target.description', this.hass.language)}
            </span>
    
            <alarmo-select
              .hass=${this.hass}
              .items=${computeServiceDisplay(this.hass, ...getNotifyServices(this.hass))}
              ?disabled=${!getNotifyServices(this.hass).length}
              label=${localize('panels.actions.cards.new_notification.fields.target.heading', this.hass.language)}
              icons=${true}
              .value=${this.config.actions[0].service}
              @value-changed=${this._setService}
              ?invalid=${this.errors.service}
              allow-custom-value
            ></alarmo-select>
          </settings-row>
    
          <settings-row .narrow=${this.narrow}>
            <span slot="heading">
              ${localize('panels.actions.cards.new_notification.fields.title.heading', this.hass.language)}
            </span>
            <span slot="description">
              ${localize('panels.actions.cards.new_notification.fields.title.description', this.hass.language)}
            </span>
    
            <paper-input
              label="${localize('panels.actions.cards.new_notification.fields.title.heading', this.hass.language)}"
              .value=${(_a = this.config.actions[0].service_data) === null || _a === void 0 ? void 0 : _a.title}
              @value-changed=${this._setTitle}
              ?invalid=${this.errors.title}
            ></paper-input>
          </settings-row>
    
          <settings-row .narrow=${this.narrow} .large=${true} last>
            <span slot="heading">
              ${localize('panels.actions.cards.new_notification.fields.message.heading', this.hass.language)}
            </span>
            <span slot="description">
              ${localize('panels.actions.cards.new_notification.fields.message.description', this.hass.language)}
            </span>
    
            <paper-textarea
              id="message"
              label="${localize('panels.actions.cards.new_notification.fields.message.heading', this.hass.language)}"
              placeholder=${this._messagePlaceholder()}
              .value=${(_b = this.config.actions[0].service_data) === null || _b === void 0 ? void 0 : _b.message}
              @value-changed=${this._setMessage}
              ?invalid=${this.errors.message}
            ></paper-textarea>
    
            ${this.config.triggers[0].event
                ? T `
            <div style="margin-top: 10px">
              <span style="padding-right: 10px">
                ${localize('panels.actions.cards.new_notification.fields.message.insert_wildcard', this.hass.language)}:
              </span>
              <alarmo-chips
                .items=${getWildcardOptions(this.config.triggers[0].event)}
                @value-changed=${(ev) => this._insertWildCard(ev.detail.value)}
              ></alarmo-chips>
            </div>`
                : ''}

          </settings-row>

            ${this._getOpenSensorsFormat() !== null ? T `

            <settings-row .narrow=${this.narrow} .large=${true}>
              <span slot="heading">
                ${localize('panels.actions.cards.new_notification.fields.open_sensors_format.heading', this.hass.language)}
              </span>

              <span slot="description">
                ${localize('panels.actions.cards.new_notification.fields.open_sensors_format.description', this.hass.language)}
              </span>

              <alarmo-select
                .items=${getOpenSensorsWildCardOptions(this.hass)}
                .value=${this._getOpenSensorsFormat(true)}
                @value-changed=${this._setOpenSensorsFormat}
              >

              </alarmo-select>
            </settings-row>
            ` : ''}
        `
            : T `
          <h2>${localize('components.editor.edit_in_yaml', this.hass.language)}</h2>
  
          <ha-yaml-editor
            .defaultValue=${this.config.actions[0] || ""}
            @value-changed=${this._setYaml}
          ></ha-yaml-editor>

          ${this.errors.service || this.errors.title || this.errors.message
                ? T `
          <span class="error-message">
            ${this.hass.localize('ui.errors.config.key_missing', 'key', Object.entries(this.errors).find(([k, v]) => v && ['service', 'title', 'message'].includes(k))[0])}
          </span>
            ` : ''}
          `}
        </div>

        <div class="toggle-button">
          <mwc-button @click=${this._toggleYamlMode}>
            <ha-icon icon="hass:shuffle-variant"></ha-icon>
            ${this.viewMode == ViewMode.Yaml ? localize('components.editor.ui_mode', this.hass.language) : localize('components.editor.yaml_mode', this.hass.language)}
          </mwc-button>
        </div>

        <div class="card-actions">
          <mwc-button trailingIcon ?disabled=${!this._validAction()} @click=${this._testClick}>
            ${localize('panels.actions.cards.new_notification.actions.test', this.hass.language)}
            <ha-icon icon="hass:arrow-right"></ha-icon>
          </mwc-button>
        </div>
      </ha-card>

      <div class="section-header">${localize('panels.actions.cards.new_notification.options', this.hass.language)}</div>
      <ha-card>
        <div class="card-content">
          <settings-row .narrow=${this.narrow} .large=${true} first>
            <span slot="heading">
              ${localize('panels.actions.cards.new_notification.fields.name.heading', this.hass.language)}
            </span>
            <span slot="description">
              ${localize('panels.actions.cards.new_notification.fields.name.description', this.hass.language)}
            </span>

            <paper-input
              label="${localize('panels.actions.cards.new_notification.fields.name.heading', this.hass.language)}"
              placeholder=${this._namePlaceholder()}
              .value=${this.config.name}
              @value-changed=${this._setName}
              ?invalid=${this.errors.name}
            ></paper-input>
          </settings-row>

        ${((_c = this.item) === null || _c === void 0 ? void 0 : _c.automation_id) ? T `
          <settings-row .narrow=${this.narrow}>
          <span slot="heading">
            ${localize('panels.actions.cards.new_notification.fields.delete.heading', this.hass.language)}
          </span>
          <span slot="description">
            ${localize('panels.actions.cards.new_notification.fields.delete.description', this.hass.language)}
          </span>
          <div>
            <mwc-button class="warning" outlined @click=${this._deleteClick}>
              <ha-icon icon="hass:trash-can-outline"></ha-icon>
              ${this.hass.localize('ui.common.delete')}
            </mwc-button>
          </div>
          </settings-row>
          ` : ''}
        </div>
      </ha-card>

      <div class="actions">
        <mwc-button raised @click=${this._saveClick} style="width: 100%" class="save-button">
          <ha-icon icon="hass:content-save-outline"></ha-icon>
          ${this.hass.localize('ui.common.save')}
        </mwc-button>
      </div>

    `;
        }
        _setEvent(ev) {
            ev.stopPropagation();
            const value = ev.detail.value;
            let triggerConfig = this.config.triggers;
            Object.assign(triggerConfig, { [0]: Object.assign(Object.assign({}, triggerConfig[0]), { event: value }) });
            this.config = Object.assign(Object.assign({}, this.config), { triggers: triggerConfig });
            if (Object.keys(this.errors).includes('event'))
                this._validateConfig();
        }
        _setArea(ev) {
            var _a;
            ev.stopPropagation();
            const value = ev.detail.value;
            let triggerConfig = this.config.triggers;
            Object.assign(triggerConfig, { [0]: Object.assign(Object.assign({}, triggerConfig[0]), { area: value }) });
            const armModes = getArmModeOptions(value, this.areas);
            if (!((_a = triggerConfig[0].modes) === null || _a === void 0 ? void 0 : _a.length))
                this._setModes(new CustomEvent('value-changed', { detail: { value: armModes } }));
            else
                this._setModes(new CustomEvent('value-changed', { detail: { value: triggerConfig[0].modes.filter(e => armModes.includes(e)) } }));
            this.config = Object.assign(Object.assign({}, this.config), { triggers: triggerConfig });
            if (Object.keys(this.errors).includes('area'))
                this._validateConfig();
        }
        _setModes(ev) {
            ev.stopPropagation();
            const value = ev.detail.value;
            let triggerConfig = this.config.triggers;
            Object.assign(triggerConfig, { [0]: Object.assign(Object.assign({}, triggerConfig[0]), { modes: value }) });
            this.config = Object.assign(Object.assign({}, this.config), { triggers: triggerConfig });
            if (Object.keys(this.errors).includes('modes'))
                this._validateConfig();
        }
        _setService(ev) {
            ev.stopPropagation();
            const value = String(ev.detail.value);
            let actionConfig = this.config.actions;
            Object.assign(actionConfig, { [0]: Object.assign(Object.assign(Object.assign({}, actionConfig[0]), { service: value }), omit(actionConfig[0], 'service')) });
            this.config = Object.assign(Object.assign({}, this.config), { actions: actionConfig });
            if (Object.keys(this.errors).includes('service'))
                this._validateConfig();
        }
        _setTitle(ev) {
            ev.stopPropagation();
            const value = String(ev.detail.value);
            let actionConfig = this.config.actions;
            Object.assign(actionConfig, { [0]: Object.assign(Object.assign({}, actionConfig[0]), { service: actionConfig[0].service || '', service_data: Object.assign(Object.assign({}, actionConfig[0].service_data || {}), { title: value }) }) });
            this.config = Object.assign(Object.assign({}, this.config), { actions: actionConfig });
            if (Object.keys(this.errors).includes('title'))
                this._validateConfig();
        }
        _setMessage(ev) {
            ev.stopPropagation();
            const value = String(ev.detail.value);
            let actionConfig = this.config.actions;
            Object.assign(actionConfig, { [0]: Object.assign(Object.assign({}, actionConfig[0]), { service: actionConfig[0].service || '', service_data: Object.assign(Object.assign({}, actionConfig[0].service_data || {}), { message: value }) }) });
            this.config = Object.assign(Object.assign({}, this.config), { actions: actionConfig });
            if (Object.keys(this.errors).includes('message'))
                this._validateConfig();
        }
        _setName(ev) {
            ev.stopPropagation();
            const value = String(ev.detail.value);
            this.config = Object.assign(Object.assign({}, this.config), { name: value });
        }
        _setYaml(ev) {
            const value = ev.detail.value;
            let output = {};
            if (isString(value === null || value === void 0 ? void 0 : value.service))
                output = Object.assign(Object.assign({}, output), { service: String(value.service) });
            if (isObject(value === null || value === void 0 ? void 0 : value.service_data))
                output = Object.assign(Object.assign({}, output), { service_data: value.service_data });
            if (Object.keys(output).length)
                this.config = Object.assign(Object.assign({}, this.config), { actions: Object.assign(this.config.actions, { [0]: Object.assign(Object.assign({}, this.config.actions[0]), output) }) });
            if (Object.keys(this.errors).some(e => ['service', 'message', 'title'].includes(e)))
                this._validateConfig();
        }
        _validateConfig() {
            var _a, _b;
            this.errors = {};
            const data = this._parseAutomation();
            const triggerConfig = data.triggers[0];
            if (!triggerConfig.event || !Object.values(EAlarmEvent).includes(triggerConfig.event))
                this.errors = Object.assign(Object.assign({}, this.errors), { event: true });
            if (!isDefined(triggerConfig.area) || !getAreaOptions(this.areas, this.alarmoConfig).includes(triggerConfig.area))
                this.errors = Object.assign(Object.assign({}, this.errors), { area: true });
            if (!((_a = triggerConfig.modes) === null || _a === void 0 ? void 0 : _a.every(e => getArmModeOptions(triggerConfig.area, this.areas).includes(e))))
                this.errors = Object.assign(Object.assign({}, this.errors), { modes: true });
            const actionConfig = data.actions[0];
            if (!actionConfig.service || (!getNotifyServices(this.hass).includes(actionConfig.service) && d$1(actionConfig.service) != 'script'))
                this.errors = Object.assign(Object.assign({}, this.errors), { service: true });
            if (!isValidString((_b = actionConfig.service_data) === null || _b === void 0 ? void 0 : _b.message))
                this.errors = Object.assign(Object.assign({}, this.errors), { message: true });
            // title is optional
            // if (!isValidString(actionConfig.service_data?.title))
            //   this.errors = { ...this.errors, title: true };
            if (!isValidString(data.name))
                this.errors = Object.assign(Object.assign({}, this.errors), { name: true });
            return !Object.values(this.errors).length;
        }
        _validAction() {
            var _a;
            const data = this._parseAutomation();
            const actionConfig = data.actions[0];
            return (actionConfig.service &&
                (d$1(actionConfig.service) == 'script' || getNotifyServices(this.hass).includes(actionConfig.service)) &&
                isValidString((_a = actionConfig.service_data) === null || _a === void 0 ? void 0 : _a.message));
        }
        _insertWildCard(value) {
            var _a;
            const field = this.shadowRoot.querySelector("#message");
            if (field)
                field.focus();
            let message = ((_a = this.config.actions[0].service_data) === null || _a === void 0 ? void 0 : _a.message) || "";
            message = field && field.selectionStart !== null && field.selectionEnd !== null
                ? message.substring(0, field.selectionStart) + value + message.substring(field.selectionEnd, message.length)
                : message + value;
            this._setMessage(new CustomEvent('value-changed', { detail: { value: message } }));
        }
        _toggleYamlMode() {
            var _a, _b;
            this.viewMode = this.viewMode == ViewMode.UI
                ? ViewMode.Yaml
                : ViewMode.UI;
            if (this.viewMode == ViewMode.Yaml)
                this.config = Object.assign(Object.assign({}, this.config), { actions: Object.assign(this.config.actions, {
                        [0]: Object.assign(Object.assign({}, this.config.actions[0]), { service: this.config.actions[0].service || '', service_data: Object.assign(Object.assign({}, this.config.actions[0].service_data || {}), { title: ((_a = this.config.actions[0].service_data) === null || _a === void 0 ? void 0 : _a.title) || '', message: ((_b = this.config.actions[0].service_data) === null || _b === void 0 ? void 0 : _b.message) || '' }) })
                    }) });
        }
        _namePlaceholder() {
            const event = this.config.triggers[0].event;
            const domain = this.config.actions[0].service ? d$1(this.config.actions[0].service) : null;
            const target = computeServiceDisplay(this.hass, this.config.actions[0].service);
            if (!event || domain != 'notify' || !target.length)
                return "";
            else
                return localize(`panels.actions.cards.new_notification.fields.name.placeholders.${event}`, this.hass.language, '{target}', target[0].name);
        }
        _messagePlaceholder() {
            const event = this.config.triggers[0].event;
            if (!event)
                return "";
            else
                return localize(`panels.actions.cards.new_notification.fields.message.placeholders.${event}`, this.hass.language);
        }
        _parseAutomation() {
            var _a;
            let data = Object.assign({}, this.config);
            let action = data.actions[0];
            //fill in message placeholder
            if (!isValidString((_a = action.service_data) === null || _a === void 0 ? void 0 : _a.message) &&
                this.viewMode == ViewMode.UI &&
                this._messagePlaceholder()) {
                action = Object.assign(Object.assign({}, action), { service_data: Object.assign(Object.assign({}, action.service_data), { message: this._messagePlaceholder() }) });
                Object.assign(data, { actions: Object.assign(data.actions, { [0]: action }) });
            }
            //fill in name placeholder
            if (!isValidString(data.name) && this._namePlaceholder())
                data = Object.assign(Object.assign({}, data), { name: this._namePlaceholder() });
            return data;
        }
        _getOpenSensorsFormat(forceResult = false) {
            var _a;
            const message = ((_a = this.config.actions[0].service_data) === null || _a === void 0 ? void 0 : _a.message) || '';
            const res = message.match(/{{open_sensors(\|[^}]+)?}}/);
            if (res !== null)
                return res[0];
            else
                return forceResult ? '{{open_sensors}}' : null;
        }
        _setOpenSensorsFormat(ev) {
            var _a;
            ev.stopPropagation();
            const value = String(ev.detail.value);
            let message = ((_a = this.config.actions[0].service_data) === null || _a === void 0 ? void 0 : _a.message) || '';
            message = message.replace(/{{open_sensors(\|[^}]+)?}}/, value);
            let actionConfig = this.config.actions;
            Object.assign(actionConfig, { [0]: Object.assign(Object.assign({}, actionConfig[0]), { service: actionConfig[0].service || '', service_data: Object.assign(Object.assign({}, actionConfig[0].service_data || {}), { message: message }) }) });
            this.config = Object.assign(Object.assign({}, this.config), { actions: actionConfig });
        }
        _saveClick(ev) {
            if (!this._validateConfig())
                return;
            let data = this._parseAutomation();
            //keep modes array empty if all modes are selected 
            if (getArmModeOptions(data.triggers[0].area, this.areas).every(e => { var _a; return (_a = data.triggers[0].modes) === null || _a === void 0 ? void 0 : _a.includes(e); })) {
                data = Object.assign(Object.assign({}, data), { triggers: Object.assign(data.triggers, { [0]: Object.assign(Object.assign({}, data.triggers[0]), { modes: [] }) }) });
            }
            if (this.item)
                data = Object.assign(Object.assign({}, data), { automation_id: this.item.automation_id });
            saveAutomation(this.hass, data)
                .catch(e => handleError(e, ev))
                .then(() => this._cancelClick());
        }
        _deleteClick(ev) {
            var _a;
            if (!((_a = this.item) === null || _a === void 0 ? void 0 : _a.automation_id))
                return;
            deleteAutomation(this.hass, this.item.automation_id)
                .catch(e => handleError(e, ev))
                .then(() => this._cancelClick());
        }
        _testClick(ev) {
            const data = this._parseAutomation();
            const action = data.actions[0];
            const [domain, service] = action.service.split('.');
            let message = action.service_data.message;
            message = message.replace('{{open_sensors|format=short}}', 'Some Example Sensor');
            message = message.replace(/{{open_sensors(\|[^}]+)?}}/, 'Some Example Sensor is open');
            message = message.replace('{{bypassed_sensors}}', 'Some Bypassed Sensor');
            message = message.replace('{{arm_mode}}', 'Armed away');
            message = message.replace('{{changed_by}}', 'Some Example User');
            this.hass
                .callService(domain, service, Object.assign(Object.assign({}, action.service_data), { message: message }))
                .then()
                .catch(e => {
                showErrorDialog(ev, e.message);
                return;
            });
        }
        _cancelClick() {
            F(this, '/alarmo/actions', true);
        }
        static get styles() {
            return i `
      div.content {
        padding: 28px 20px 0;
        max-width: 1040px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
      } 
      div.header {
        font-family: var(--paper-font-headline_-_font-family);
        -webkit-font-smoothing: var(
          --paper-font-headline_-_-webkit-font-smoothing
        );
        font-size: var(--paper-font-headline_-_font-size);
        font-weight: var(--paper-font-headline_-_font-weight);
        letter-spacing: var(--paper-font-headline_-_letter-spacing);
        line-height: var(--paper-font-headline_-_line-height);
        opacity: var(--dark-primary-opacity);
      }
      div.section-header {
        font-family: var(--paper-font-headline_-_font-family);
        -webkit-font-smoothing: var(
          --paper-font-headline_-_-webkit-font-smoothing
        );
        font-size: 18px;
        font-weight: var(--paper-font-headline_-_font-weight);
        letter-spacing: var(--paper-font-headline_-_letter-spacing);
        line-height: var(--paper-font-headline_-_line-height);
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
        font-size: var(--paper-font-headline_-_font-size);
        font-weight: var(--paper-font-headline_-_font-weight);
        letter-spacing: var(--paper-font-headline_-_letter-spacing);
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
        grid-template-areas: 'header icon'
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
    `;
        }
    };
    __decorate([
        e$3({ attribute: false })
    ], NotificationEditorCard.prototype, "hass", void 0);
    __decorate([
        e$3()
    ], NotificationEditorCard.prototype, "narrow", void 0);
    __decorate([
        e$3()
    ], NotificationEditorCard.prototype, "config", void 0);
    __decorate([
        e$3()
    ], NotificationEditorCard.prototype, "item", void 0);
    __decorate([
        e$3()
    ], NotificationEditorCard.prototype, "areas", void 0);
    __decorate([
        e$3()
    ], NotificationEditorCard.prototype, "alarmoConfig", void 0);
    __decorate([
        e$3()
    ], NotificationEditorCard.prototype, "viewMode", void 0);
    __decorate([
        e$3()
    ], NotificationEditorCard.prototype, "errors", void 0);
    NotificationEditorCard = __decorate([
        n$4('notification-editor-card')
    ], NotificationEditorCard);

    var ViewMode$1;
    (function (ViewMode) {
        ViewMode[ViewMode["Yaml"] = 0] = "Yaml";
        ViewMode[ViewMode["UI"] = 1] = "UI";
    })(ViewMode$1 || (ViewMode$1 = {}));
    let AutomationEditorCard = class AutomationEditorCard extends h$2 {
        constructor() {
            super(...arguments);
            this.config = {
                type: EAutomationTypes.Action,
                triggers: [{}],
                actions: [{}],
            };
            this.viewMode = ViewMode$1.UI;
            this.errors = {};
        }
        async firstUpdated() {
            this.areas = await fetchAreas(this.hass);
            this.alarmoConfig = await fetchConfig(this.hass);
            if (this.item) {
                let actions = this.item.actions.map(e => e.entity_id ? e : omit(e, 'entity_id'));
                this.config = Object.assign(Object.assign({}, this.item), { actions: [actions[0], ...actions.slice(1)] });
                if (this.config.triggers.length > 1)
                    this.config = Object.assign(Object.assign({}, this.config), { triggers: [this.config.triggers[0]] });
                let area = this.config.triggers[0].area;
                if (isDefined(area) && !getAreaOptions(this.areas, this.alarmoConfig).includes(area))
                    area = undefined;
                else if (area === null)
                    area = 0;
                this._setArea(new CustomEvent('value-changed', { detail: { value: area } }));
                if (this._hasCustomEntities())
                    this.viewMode = ViewMode$1.Yaml;
            }
            //automatically set area if there is only 1 option
            if (!isDefined(this.config.triggers[0].area)) {
                const areaOptions = getAreaOptions(this.areas, this.alarmoConfig);
                if (areaOptions.length == 1)
                    this._setArea(new CustomEvent('value-changed', { detail: { value: areaOptions[0] } }));
                else if (areaOptions.includes(0))
                    this._setArea(new CustomEvent('value-changed', { detail: { value: 0 } }));
            }
        }
        render() {
            var _a;
            if (!this.hass || !this.areas || !this.alarmoConfig)
                return T ``;
            return T `
      <div class="heading">
        <ha-icon-button icon="hass:close" @click=${this._cancelClick} class="icon">
          <ha-icon icon="hass:close"></ha-icon>
        </ha-icon-button>
        <div class="header">${localize('panels.actions.cards.new_action.title', this.hass.language)}</div>
        <div class="description">${localize('panels.actions.cards.new_action.description', this.hass.language)}</div>
      </div>
      <div class="section-header">${localize('panels.actions.cards.new_notification.trigger', this.hass.language)}</div>
      <ha-card>
        <div class="card-content">
          <settings-row .narrow=${this.narrow} .large=${true} first>
            <span slot="heading">
              ${localize('panels.actions.cards.new_notification.fields.event.heading', this.hass.language)}
            </span>
            <span slot="description">
              ${localize('panels.actions.cards.new_notification.fields.event.description', this.hass.language)}
            </span>

            <alarmo-select
              .hass=${this.hass}
              .items=${Object.values(EAlarmEvent).map(e => computeEventDisplay(e, this.hass))}
              label=${localize('panels.actions.cards.new_action.fields.event.heading', this.hass.language)}
              icons=${true}
              .value=${this.config.triggers[0].event}
              @value-changed=${this._setEvent}
              ?invalid=${this.errors.event}
            ></alarmo-select>
          </settings-row>

          ${Object.keys(this.areas).length > 1
            ? T `
          <settings-row .narrow=${this.narrow} .large=${true}>
            <span slot="heading">
              ${localize('panels.actions.cards.new_action.fields.area.heading', this.hass.language)}
            </span>
            <span slot="description">
              ${localize('panels.actions.cards.new_action.fields.area.description', this.hass.language)}
            </span>
            
            <alarmo-select
              .hass=${this.hass}
              .items=${getAreaOptions(this.areas, this.alarmoConfig).map(e => computeAreaDisplay(e, this.areas, this.alarmoConfig))}
              clearable=${true}
              label=${localize('panels.actions.cards.new_action.fields.area.heading', this.hass.language)}
              .value=${this.config.triggers[0].area}
              @value-changed=${this._setArea}
              ?invalid=${this.errors.area}
            ></alarmo-select>
          </settings-row>
          ` : ''}

          <settings-row .narrow=${this.narrow} .large=${true} last>
            <span slot="heading">
              ${localize('panels.actions.cards.new_notification.fields.mode.heading', this.hass.language)}
            </span>
            <span slot="description">
              ${localize('panels.actions.cards.new_notification.fields.mode.description', this.hass.language)}
            </span>

            <alarmo-selector
              .hass=${this.hass}
              .items=${getArmModeOptions(this.config.triggers[0].area, this.areas).map(e => computeArmModeDisplay(e, this.hass))}
              label=${localize('panels.actions.cards.new_action.fields.mode.heading', this.hass.language)}
              .value=${this.config.triggers[0].modes || []}
              @value-changed=${this._setModes}
              ?invalid=${this.errors.modes}
            ></alarmo-selector>
          </settings-row>
        </div>
      </ha-card>
  
      <div class="section-header">${localize('panels.actions.cards.new_notification.action', this.hass.language)}</div>
      <ha-card>
        <div class="card-content">
          ${this.viewMode == ViewMode$1.UI
            ? T `
          <settings-row .narrow=${this.narrow} .large=${true} first>
            <span slot="heading">
              ${localize('panels.actions.cards.new_action.fields.entity.heading', this.hass.language)}
            </span>
            <span slot="description">
              ${localize('panels.actions.cards.new_action.fields.entity.description', this.hass.language)}
            </span>
    
            <alarmo-selector
              .hass=${this.hass}
              .items=${computeEntityDisplay(getAutomationEntities(this.hass, this._getEntities()), this.hass)}
              ?disabled=${!getAutomationEntities(this.hass, this._getEntities()).length}
              label=${localize('panels.actions.cards.new_action.fields.entity.heading', this.hass.language)}
              .value=${this._getEntities()}
              @value-changed=${this._setEntity}
              ?invalid=${this.errors.entity_id}
            ></alarmo-selector>
          </settings-row>

        ${this.config.actions.map(e => e.entity_id).length
                ? T `        
          <settings-row .narrow=${this.narrow}>
            <span slot="heading">
              ${localize('panels.actions.cards.new_action.fields.action.heading', this.hass.language)}
            </span>
            <span slot="description">
              ${localize('panels.actions.cards.new_action.fields.action.description', this.hass.language)}
            </span>
            
            <div>
              ${this.renderActions()}
            </div>
          </settings-row>
          `
                : ''}
        `
            : T `
          <h2>${localize('components.editor.edit_in_yaml', this.hass.language)}</h2>
  
          <ha-yaml-editor
            .defaultValue=${this.config.actions || ""}
            @value-changed=${this._setYaml}
          ></ha-yaml-editor>

        ${this.errors.service || this.errors.entity_id
                ? T `
          <span class="error-message">
            ${this.hass.localize('ui.errors.config.key_missing', 'key', Object.entries(this.errors).find(([k, v]) => v && ['service', 'entity_id'].includes(k))[0])}
          </span>
        ` : ''}
          `}
        </div>

        <div class="toggle-button">
          <mwc-button @click=${this._toggleYamlMode}>
            <ha-icon icon="hass:shuffle-variant"></ha-icon>
            ${this.viewMode == ViewMode$1.Yaml ? localize('components.editor.ui_mode', this.hass.language) : localize('components.editor.yaml_mode', this.hass.language)}
          </mwc-button>
        </div>

        <div class="card-actions">
          <mwc-button trailingIcon ?disabled=${!this._validAction()} @click=${this._testClick}>
            ${localize('panels.actions.cards.new_notification.actions.test', this.hass.language)}
            <ha-icon icon="hass:arrow-right"></ha-icon>
          </mwc-button>
        </div>
      </ha-card>

      <div class="section-header">${localize('panels.actions.cards.new_notification.options', this.hass.language)}</div>
      <ha-card>
        <div class="card-content">
          <settings-row .narrow=${this.narrow} .large=${true} first>
            <span slot="heading">
              ${localize('panels.actions.cards.new_action.fields.name.heading', this.hass.language)}
            </span>
            <span slot="description">
              ${localize('panels.actions.cards.new_action.fields.name.description', this.hass.language)}
            </span>

            <paper-input
              label="${localize('panels.actions.cards.new_action.fields.name.heading', this.hass.language)}"
              placeholder=${this._namePlaceholder()}
              .value=${this.config.name}
              @value-changed=${this._setName}
              ?invalid=${this.errors.name}
            ></paper-input>
          </settings-row>

        ${((_a = this.item) === null || _a === void 0 ? void 0 : _a.automation_id) ? T `
          <settings-row .narrow=${this.narrow}>
          <span slot="heading">
            ${localize('panels.actions.cards.new_notification.fields.delete.heading', this.hass.language)}
          </span>
          <span slot="description">
            ${localize('panels.actions.cards.new_notification.fields.delete.description', this.hass.language)}
          </span>
          <div>
            <mwc-button class="warning" outlined @click=${this._deleteClick}>
              <ha-icon icon="hass:trash-can-outline"></ha-icon>
              ${this.hass.localize('ui.common.delete')}
            </mwc-button>
          </div>
          </settings-row>
        ` : ''}
        </div>
      </ha-card>

      <div class="actions">
        <mwc-button raised @click=${this._saveClick} style="width: 100%" class="save-button">
          <ha-icon icon="hass:content-save-outline"></ha-icon>
          ${this.hass.localize('ui.common.save')}
        </mwc-button>
      </div>
    `;
        }
        renderActions() {
            let selectedEntities = this.config.actions.map(e => e.entity_id);
            let actions = computeActions(selectedEntities, this.hass);
            if (!actions.length) {
                return localize('panels.actions.cards.new_action.fields.action.no_common_actions', this.hass.language);
            }
            const isMatchingAction = (...actions) => {
                if (!actions.every(isDefined))
                    return false;
                return Unique(computeMergedActions(actions.filter(isDefined))).length == 1;
            };
            return actions.map(action => {
                return T `
      <mwc-button
        class="${isMatchingAction(this._selectedAction(), action) ? 'active' : ''}"
        @click=${() => this._setAction(action)}
        ?invalid=${this.errors.service}
        ?disabled=${actions.length == 1}
      >
        ${computeActionDisplay(action, this.hass)}
      </mwc-button>
      `;
            });
        }
        _selectedAction() {
            let selectedActions = this.config.actions.map(e => e.service);
            if (!selectedActions.every(isDefined))
                return null;
            selectedActions = Unique(computeMergedActions(selectedActions.filter(isDefined)));
            if (selectedActions.length == 1)
                return selectedActions[0];
            else
                return null;
        }
        _setEvent(ev) {
            ev.stopPropagation();
            const value = ev.detail.value;
            let triggerConfig = this.config.triggers;
            Object.assign(triggerConfig, { [0]: Object.assign(Object.assign({}, triggerConfig[0]), { event: value }) });
            this.config = Object.assign(Object.assign({}, this.config), { triggers: triggerConfig });
            if (Object.keys(this.errors).includes('event'))
                this._validateConfig();
        }
        _setArea(ev) {
            var _a;
            ev.stopPropagation();
            const value = ev.detail.value;
            let triggerConfig = this.config.triggers;
            Object.assign(triggerConfig, { [0]: Object.assign(Object.assign({}, triggerConfig[0]), { area: value }) });
            this.config = Object.assign(Object.assign({}, this.config), { triggers: triggerConfig });
            if (!((_a = this.config.triggers[0].modes) === null || _a === void 0 ? void 0 : _a.length))
                this._setModes(new CustomEvent('value-changed', { detail: { value: getArmModeOptions(value, this.areas) } }));
            if (Object.keys(this.errors).includes('area'))
                this._validateConfig();
        }
        _setModes(ev) {
            ev.stopPropagation();
            const value = ev.detail.value;
            const triggerConfig = this.config.triggers;
            Object.assign(triggerConfig, { [0]: Object.assign(Object.assign({}, triggerConfig[0]), { modes: value }) });
            this.config = Object.assign(Object.assign({}, this.config), { triggers: triggerConfig });
            if (Object.keys(this.errors).includes('service'))
                this._validateConfig();
        }
        _setEntity(ev) {
            ev.stopPropagation();
            const selectedEntities = ev.detail.value;
            let actionConfig = this.config.actions;
            //assign service for added entity if it is in common
            let serviceSetting = null;
            if (selectedEntities.length > actionConfig.length && this._selectedAction())
                serviceSetting = this._selectedAction();
            if (actionConfig.length > selectedEntities.length) {
                let removedAction = actionConfig.findIndex(e => !selectedEntities.includes(e.entity_id || ""));
                if (removedAction < 0)
                    removedAction = actionConfig.length - 1;
                actionConfig.splice(removedAction, 1);
            }
            if (!selectedEntities.length)
                Object.assign(actionConfig, { [0]: omit(actionConfig[0], 'entity_id') });
            selectedEntities.forEach((entity, i) => {
                let action = actionConfig.length > i ? Object.assign({}, actionConfig[i]) : {};
                action = action.entity_id == entity ? Object.assign({}, action) : { entity_id: entity };
                Object.assign(actionConfig, { [i]: action });
            });
            this.config = Object.assign(Object.assign({}, this.config), { actions: actionConfig });
            if (serviceSetting)
                this._setAction(serviceSetting);
            if (Object.keys(this.errors).includes('entity_id'))
                this._validateConfig();
        }
        _setAction(selectedAction) {
            let actionConfig = this.config.actions;
            let selectedEntities = this.config.actions.map(e => e.entity_id);
            let availableActions = computeActions(selectedEntities, this.hass);
            if (!availableActions.length)
                return;
            actionConfig.forEach((e, i) => {
                let actions = computeActions(e.entity_id, this.hass);
                let service = findMatchingAction(actions, selectedAction);
                Object.assign(actionConfig, { [i]: Object.assign({ service: service }, omit(e, 'service')) });
            });
            this.config = Object.assign(Object.assign({}, this.config), { actions: actionConfig });
        }
        _setName(ev) {
            ev.stopPropagation();
            const value = String(ev.detail.value);
            this.config = Object.assign(Object.assign({}, this.config), { name: value });
        }
        _setYaml(ev) {
            let value = ev.detail.value;
            let actionConfig = [{}];
            if (isObject(value))
                value = [value];
            if (isArray(value)) {
                value.forEach((entry, i) => {
                    let output = {};
                    if (isObject(entry) && isString(entry.service))
                        output = Object.assign(Object.assign({}, output), { service: entry.service });
                    if (isObject(entry) && isString(entry.entity_id))
                        output = Object.assign(Object.assign({}, output), { entity_id: entry.entity_id });
                    if (isObject(entry) && isObject(entry.service_data))
                        output = Object.assign(Object.assign({}, output), { service_data: entry.service_data });
                    Object.assign(actionConfig, { [i]: output });
                });
                this.config = Object.assign(Object.assign({}, this.config), { actions: actionConfig });
            }
        }
        _validateConfig() {
            var _a;
            this.errors = {};
            const data = this._parseAutomation();
            const triggerConfig = data.triggers[0];
            if (!triggerConfig.event || !Object.values(EAlarmEvent).includes(triggerConfig.event))
                this.errors = Object.assign(Object.assign({}, this.errors), { event: true });
            if (!isDefined(triggerConfig.area) || !getAreaOptions(this.areas, this.alarmoConfig).includes(triggerConfig.area))
                this.errors = Object.assign(Object.assign({}, this.errors), { area: true });
            if (!((_a = triggerConfig.modes) === null || _a === void 0 ? void 0 : _a.every(e => getArmModeOptions(triggerConfig.area, this.areas).includes(e))))
                this.errors = Object.assign(Object.assign({}, this.errors), { modes: true });
            let entities = data.actions.map(e => e.entity_id);
            if (this.viewMode == ViewMode$1.Yaml)
                entities = entities.filter(isDefined);
            if (!data.actions.length || !entities.every(e => isValidEntity(e, this.hass)))
                this.errors = Object.assign(Object.assign({}, this.errors), { entity_id: true });
            const services = data.actions.map(e => e.service);
            if (!services.length || !services.every(e => isValidService(e, this.hass))) {
                this.errors = Object.assign(Object.assign({}, this.errors), { service: true });
                let availableActions = computeActions(entities, this.hass);
                if (!availableActions.length)
                    this.viewMode = ViewMode$1.Yaml;
            }
            if (!isValidString(data.name))
                this.errors = Object.assign(Object.assign({}, this.errors), { name: true });
            return !Object.values(this.errors).length;
        }
        _validAction() {
            const data = this._parseAutomation();
            const services = data.actions.map(e => e.service);
            let entities = data.actions.map(e => e.entity_id);
            if (this.viewMode == ViewMode$1.Yaml)
                entities = entities.filter(isDefined);
            return (services.length &&
                services.every(e => isValidService(e, this.hass)) &&
                entities.every(e => isValidEntity(e, this.hass)));
        }
        _toggleYamlMode() {
            this.viewMode = this.viewMode == ViewMode$1.UI
                ? ViewMode$1.Yaml
                : ViewMode$1.UI;
            if (this.viewMode == ViewMode$1.Yaml)
                this.config = Object.assign(Object.assign({}, this.config), { actions: Object.assign(this.config.actions, {
                        [0]: Object.assign(Object.assign({}, this.config.actions[0]), { service: this.config.actions[0].service || '', service_data: Object.assign({}, this.config.actions[0].service_data || {}) })
                    }) });
        }
        _namePlaceholder() {
            var _a, _b, _c, _d;
            if (!this._validAction)
                return "";
            const event = this.config.triggers[0].event;
            const entities = this.config.actions.map(e => e.entity_id).filter(isDefined);
            const entity = computeEntityDisplay(entities, this.hass).map(e => e.name).join(", ");
            const services = Unique(this.config.actions.map(e => e.service).filter(isDefined).map(e => f$1(e)));
            let state = undefined;
            if (services.length == 1 && ((_a = services[0]) === null || _a === void 0 ? void 0 : _a.includes("turn_on")))
                state = this.hass.localize("state.default.on");
            if (services.length == 1 && ((_b = services[0]) === null || _b === void 0 ? void 0 : _b.includes("turn_off")))
                state = this.hass.localize("state.default.off");
            if (services.length == 1 && ((_c = services[0]) === null || _c === void 0 ? void 0 : _c.includes("lock")))
                state = this.hass.localize("component.lock.state._.locked");
            if (services.length == 1 && ((_d = services[0]) === null || _d === void 0 ? void 0 : _d.includes("unlock")))
                state = this.hass.localize("component.lock.state._.unlocked");
            if (!event || !entity || !state)
                return "";
            else
                return localize(`panels.actions.cards.new_action.fields.name.placeholders.${event}`, this.hass.language, ['{entity}', '{state}'], [entity, state]);
        }
        _getEntities() {
            return Unique(this.config.actions
                .map(e => e.entity_id)
                .filter(isDefined)) || [];
        }
        _hasCustomEntities() {
            return this._getEntities().some(e => !getAutomationEntities(this.hass).includes(e));
        }
        _parseAutomation() {
            let data = Object.assign({}, this.config);
            //fill in name placeholder
            if (!isValidString(data.name) && this._namePlaceholder())
                data = Object.assign(Object.assign({}, data), { name: this._namePlaceholder() });
            return data;
        }
        _saveClick(ev) {
            if (!this._validateConfig())
                return;
            let data = this._parseAutomation();
            //keep modes array empty if all modes are selected
            if (getArmModeOptions(data.triggers[0].area, this.areas).every(e => { var _a; return (_a = data.triggers[0].modes) === null || _a === void 0 ? void 0 : _a.includes(e); })) {
                data = Object.assign(Object.assign({}, data), { triggers: Object.assign(data.triggers, { [0]: Object.assign(Object.assign({}, data.triggers[0]), { modes: [] }) }) });
            }
            saveAutomation(this.hass, data)
                .catch(e => handleError(e, ev))
                .then(() => this._cancelClick());
        }
        _deleteClick(ev) {
            var _a;
            if (!((_a = this.item) === null || _a === void 0 ? void 0 : _a.automation_id))
                return;
            deleteAutomation(this.hass, this.item.automation_id)
                .catch(e => handleError(e, ev))
                .then(() => this._cancelClick());
        }
        _testClick(ev) {
            const data = this._parseAutomation();
            data.actions.forEach(action => {
                const [domain, service] = action.service.split('.');
                let serviceData = Object.assign({}, action.service_data);
                if (action.entity_id)
                    serviceData = Object.assign(Object.assign({}, serviceData), { entity_id: action.entity_id });
                this.hass
                    .callService(domain, service, serviceData)
                    .then()
                    .catch(e => {
                    showErrorDialog(ev, e.message);
                    return;
                });
            });
        }
        _cancelClick() {
            F(this, '/alarmo/actions', true);
        }
        static get styles() {
            return i `
      div.content {
        padding: 28px 20px 0;
        max-width: 1040px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
      } 
      div.header {
        font-family: var(--paper-font-headline_-_font-family);
        -webkit-font-smoothing: var(
          --paper-font-headline_-_-webkit-font-smoothing
        );
        font-size: var(--paper-font-headline_-_font-size);
        font-weight: var(--paper-font-headline_-_font-weight);
        letter-spacing: var(--paper-font-headline_-_letter-spacing);
        line-height: var(--paper-font-headline_-_line-height);
        opacity: var(--dark-primary-opacity);
      }
      div.section-header {
        font-family: var(--paper-font-headline_-_font-family);
        -webkit-font-smoothing: var(
          --paper-font-headline_-_-webkit-font-smoothing
        );
        font-size: 18px;
        font-weight: var(--paper-font-headline_-_font-weight);
        letter-spacing: var(--paper-font-headline_-_letter-spacing);
        line-height: var(--paper-font-headline_-_line-height);
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
        font-size: var(--paper-font-headline_-_font-size);
        font-weight: var(--paper-font-headline_-_font-weight);
        letter-spacing: var(--paper-font-headline_-_letter-spacing);
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
        grid-template-areas: 'header icon'
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
    `;
        }
    };
    __decorate([
        e$3({ attribute: false })
    ], AutomationEditorCard.prototype, "hass", void 0);
    __decorate([
        e$3()
    ], AutomationEditorCard.prototype, "narrow", void 0);
    __decorate([
        e$3()
    ], AutomationEditorCard.prototype, "config", void 0);
    __decorate([
        e$3()
    ], AutomationEditorCard.prototype, "item", void 0);
    __decorate([
        e$3()
    ], AutomationEditorCard.prototype, "areas", void 0);
    __decorate([
        e$3()
    ], AutomationEditorCard.prototype, "alarmoConfig", void 0);
    __decorate([
        e$3()
    ], AutomationEditorCard.prototype, "viewMode", void 0);
    __decorate([
        e$3()
    ], AutomationEditorCard.prototype, "errors", void 0);
    AutomationEditorCard = __decorate([
        n$4('automation-editor-card')
    ], AutomationEditorCard);

    let AlarmViewActions = class AlarmViewActions extends SubscribeMixin(h$2) {
        constructor() {
            super(...arguments);
            this.areas = {};
            this.notificationFilterOptions = [];
            this.automationFilterOptions = [];
            this.getAreaForAutomation = (automation) => {
                const areaOptions = getAreaOptions(this.areas, this.config);
                let area = automation.triggers[0].area;
                return isDefined(area) && areaOptions.includes(area)
                    ? area
                    : undefined;
            };
        }
        hassSubscribe() {
            this._fetchData();
            return [this.hass.connection.subscribeMessage(() => this._fetchData(), { type: 'alarmo_config_updated' })];
        }
        async _fetchData() {
            if (!this.hass) {
                return;
            }
            const automations = await fetchAutomations(this.hass);
            this.automations = Object.values(automations);
            this.areas = await fetchAreas(this.hass);
            this.config = await fetchConfig(this.hass);
            this.notificationFilterOptions = [
                ...getAreaOptions(this.areas, this.config)
                    .map(a => Object(Object.assign(Object.assign({}, computeAreaDisplay(a, this.areas, this.config)), { count: Object.values(automations).filter(e => e.type == EAutomationTypes.Notification).map(this.getAreaForAutomation).filter(e => e == a).length })))
            ]
                .sort(sortAlphabetically);
            this.automationFilterOptions = [
                ...getAreaOptions(this.areas, this.config)
                    .map(a => Object(Object.assign(Object.assign({}, computeAreaDisplay(a, this.areas, this.config)), { count: Object.values(automations).filter(e => e.type == EAutomationTypes.Action).map(this.getAreaForAutomation).filter(e => e == a).length })))
            ]
                .sort(sortAlphabetically);
            if (Object.values(automations).filter(e => e.type == EAutomationTypes.Notification).map(this.getAreaForAutomation).filter(e => !isDefined(e)).length)
                this.notificationFilterOptions = [{
                        value: 'no_area',
                        name: localize('panels.actions.cards.notifications.filter.no_area', this.hass.language),
                        count: Object.values(automations).filter(e => e.type == EAutomationTypes.Notification).map(this.getAreaForAutomation).filter(e => !isDefined(e)).length
                    }, ...this.notificationFilterOptions];
            if (Object.values(automations).filter(e => e.type == EAutomationTypes.Action).map(this.getAreaForAutomation).filter(e => !isDefined(e)).length)
                this.automationFilterOptions = [{
                        value: 'no_area',
                        name: localize('panels.actions.cards.notifications.filter.no_area', this.hass.language),
                        count: Object.values(automations).filter(e => e.type == EAutomationTypes.Action).map(this.getAreaForAutomation).filter(e => !isDefined(e)).length
                    }, ...this.automationFilterOptions];
        }
        firstUpdated() {
            if (this.path && this.path.length == 2 && this.path[0] == 'filter') {
                this.notificationFilter = this.path[1];
                this.automationFilter = this.path[1];
            }
            (async () => await loadHaForm())();
        }
        render() {
            var _a;
            if (!this.hass || !this.automations)
                return T ``;
            if (((_a = this.path) === null || _a === void 0 ? void 0 : _a.length) &&
                ['new_notification', 'edit_notification'].includes(this.path[0])) {
                const config = this.automations.find(e => this.path.length > 1 && e.automation_id == this.path[1] && e.type == EAutomationTypes.Notification);
                return T `
        <notification-editor-card
          .hass=${this.hass}
          .narrow=${this.narrow}
          .item=${config}
        ></notification-editor-card>
      `;
            }
            else if (this.path && this.path.length && this.path[0] == 'new_action') {
                return T `
        <automation-editor-card
          .hass=${this.hass}
          .narrow=${this.narrow}>
        ?</automation-editor-card>
      `;
            }
            else if (this.path && this.path.length == 2 && this.path[0] == 'edit_action') {
                const config = this.automations.find(e => this.path.length > 1 && e.automation_id == this.path[1] && e.type == EAutomationTypes.Action);
                return T `
        <automation-editor-card
          .hass=${this.hass}
          .narrow=${this.narrow}
          .item=${config}
        >
        </automation-editor-card>
      `;
            }
            else {
                const columns = {
                    type: {
                        width: '40px',
                    },
                    name: {
                        title: this.hass.localize('ui.components.area-picker.add_dialog.name'),
                        width: '40%',
                        grow: true,
                        text: true,
                    },
                    enabled: {
                        title: localize('panels.actions.cards.notifications.table.enabled', this.hass.language),
                        width: '68px',
                        align: 'center',
                    },
                };
                const notificationData = this.automations
                    .filter(e => e.type == EAutomationTypes.Notification)
                    .filter(e => !isDefined(this.notificationFilter) ||
                    !this.notificationFilterOptions.find(e => e.value == this.notificationFilter) ||
                    this.getAreaForAutomation(e) == this.notificationFilter ||
                    (this.notificationFilter === 'no_area' && !isDefined(this.getAreaForAutomation(e))))
                    .map(e => Object({
                    id: e.automation_id,
                    type: T `
              <ha-icon icon="hass:message-text-outline"></ha-icon>
            `,
                    name: e.name,
                    enabled: T `
              <ha-switch
                ?checked=${e.enabled}
                @click=${(ev) => {
                    ev.stopPropagation();
                    this.toggleEnable(ev, e.automation_id);
                }}
              ></ha-switch>
            `,
                }));
                const automationData = this.automations
                    .filter(e => e.type == EAutomationTypes.Action)
                    .filter(e => !isDefined(this.notificationFilter) ||
                    !this.automationFilterOptions.find(e => e.value == this.automationFilter) ||
                    this.getAreaForAutomation(e) == this.notificationFilter ||
                    (this.notificationFilter === 'no_area' && !isDefined(this.getAreaForAutomation(e))))
                    .map(e => Object({
                    id: e.automation_id,
                    type: T `
              <ha-icon icon="hass:flash"></ha-icon>
            `,
                    name: e.name,
                    enabled: T `
              <ha-switch
                ?checked=${e.enabled}
                @click=${(ev) => {
                    ev.stopPropagation();
                    this.toggleEnable(ev, e.automation_id);
                }}
              ></ha-switch>
            `,
                }));
                return T `
        <ha-card header="${localize('panels.actions.cards.notifications.title', this.hass.language)}">
          <div class="card-content">
            ${localize('panels.actions.cards.notifications.description', this.hass.language)}
          </div>

          ${this.notificationFilterOptions.length > 1
                ? T `
                <div class="table-filter" ?narrow=${this.narrow}>
                  <span class="header"
                    >${localize('panels.actions.cards.notifications.filter.label', this.hass.language)}:</span
                  >
                  <alarmo-chips
                    .items=${this.notificationFilterOptions}
                    value=${this.notificationFilter}
                    selectable
                    @value-changed=${(ev) => (this.notificationFilter = ev.target.value)}
                  >
                  </alarmo-chips>
                </div>
              `
                : ''}
          <alarmo-table
            ?selectable=${true}
            .columns=${columns}
            .data=${notificationData}
            @row-click=${(ev) => {
                const id = String(ev.detail.id);
                F(this, `/alarmo/actions/edit_notification/${id}`, true);
            }}
          >
            ${localize('panels.actions.cards.notifications.table.no_items', this.hass.language)}
          </alarmo-table>

          <div class="card-actions">
            <mwc-button @click=${this.addNotificationClick}>
              ${localize('panels.actions.cards.notifications.actions.new_notification', this.hass.language)}
            </mwc-button>
          </div>
        </ha-card>

        <ha-card header="${localize('panels.actions.title', this.hass.language)}">
          <div class="card-content">${localize('panels.actions.cards.actions.description', this.hass.language)}</div>

          ${this.automationFilterOptions.length > 1
                ? T `
                <div class="table-filter" ?narrow=${this.narrow}>
                  <span class="header"
                    >${localize('panels.actions.cards.notifications.filter.label', this.hass.language)}:</span
                  >
                  <alarmo-chips
                    .items=${this.automationFilterOptions}
                    value=${this.automationFilter}
                    selectable
                    @value-changed=${(ev) => (this.automationFilter = ev.target.value)}
                  >
                  </alarmo-chips>
                </div>
              `
                : ''}
          <alarmo-table
            ?selectable=${true}
            .columns=${columns}
            .data=${automationData}
            @row-click=${(ev) => {
                const id = String(ev.detail.id);
                F(this, `/alarmo/actions/edit_action/${id}`, true);
            }}
          >
            ${localize('panels.actions.cards.actions.table.no_items', this.hass.language)}
          </alarmo-table>

          <div class="card-actions">
            <mwc-button @click=${this.addActionClick}>
              ${localize('panels.actions.cards.actions.actions.new_action', this.hass.language)}
            </mwc-button>
          </div>
        </ha-card>
      `;
            }
        }
        toggleEnable(ev, item_id) {
            saveAutomation(this.hass, { automation_id: item_id, enabled: !ev.target.checked })
                .catch(e => handleError(e, ev))
                .then();
        }
        addNotificationClick() {
            F(this, '/alarmo/actions/new_notification', true);
        }
        addActionClick() {
            F(this, '/alarmo/actions/new_action', true);
        }
    };
    AlarmViewActions.styles = commonStyle;
    __decorate([
        e$3()
    ], AlarmViewActions.prototype, "hass", void 0);
    __decorate([
        e$3()
    ], AlarmViewActions.prototype, "narrow", void 0);
    __decorate([
        e$3()
    ], AlarmViewActions.prototype, "path", void 0);
    __decorate([
        e$3()
    ], AlarmViewActions.prototype, "alarmEntity", void 0);
    __decorate([
        e$3()
    ], AlarmViewActions.prototype, "automations", void 0);
    __decorate([
        e$3()
    ], AlarmViewActions.prototype, "areas", void 0);
    __decorate([
        e$3()
    ], AlarmViewActions.prototype, "config", void 0);
    __decorate([
        e$3()
    ], AlarmViewActions.prototype, "notificationFilter", void 0);
    __decorate([
        e$3()
    ], AlarmViewActions.prototype, "automationFilter", void 0);
    __decorate([
        e$3()
    ], AlarmViewActions.prototype, "notificationFilterOptions", void 0);
    __decorate([
        e$3()
    ], AlarmViewActions.prototype, "automationFilterOptions", void 0);
    AlarmViewActions = __decorate([
        n$4('alarm-view-actions')
    ], AlarmViewActions);

    exports.MyAlarmPanel = class MyAlarmPanel extends h$2 {
        async firstUpdated() {
            window.addEventListener('location-changed', () => {
                this.requestUpdate();
            });
            await loadHaForm();
            this.userConfig = await fetchUsers(this.hass);
            this.requestUpdate();
        }
        render() {
            if (!customElements.get('ha-app-layout') || !this.userConfig)
                return T `
        loading...
      `;
            const matchingUser = Object.values(this.userConfig).find(e => e.name.toLowerCase() == this.hass.user.name.toLowerCase());
            if (!this.hass.user.is_admin && (!matchingUser || !matchingUser.is_admin)) {
                return T `
        <ha-app-layout>
          <app-header fixed slot="header">
            <app-toolbar>
              <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}> </ha-menu-button>
              <div main-title>
                Alarm panel
              </div>
            </app-toolbar>
          </app-header>
        </ha-app-layout>
        <div class="view">
          <div>
            <ha-card header="Access is blocked">
              <div class="card-content">
                You have no access to view this page. Please check the following:
                <ul>
                  <li>
                    You are logged in using HA user account <b>'${this.hass.user.name}'</b>. This account
                    <b>${this.hass.user.is_admin ? 'does' : 'does NOT'}</b> have administrator permission.
                  </li>
                </ul>
                <ul>
                  <li>
                    There is ${matchingUser ? 'a' : 'no'} user configured in Alarmo with name
                    <b>'${this.hass.user.name}'</b>.
                    ${matchingUser
                ? T `This user <b>${matchingUser.is_admin ? 'does' : 'does NOT'}</b> have administrator permission. `
                : ''}
                  </li>
                </ul>
              </div>
            </ha-card>
          </div>
        </div>
      `;
            }
            else {
                return T `
        <ha-app-layout>
          <app-header fixed slot="header">
            <app-toolbar>
              <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}> </ha-menu-button>
              <div main-title>
                ${localize('title', this.hass.language)}
              </div>
              <div class="version">
                v${VERSION}
              </div>
            </app-toolbar>
            <ha-tabs
              scrollable
              attr-for-selected="page-name"
              .selected=${this.getPath()[2] || "general"}
              @iron-activate=${this.handlePageSelected}
            >
              <paper-tab page-name="general">
                ${localize('panels.general.title', this.hass.language)}
              </paper-tab>
              <paper-tab page-name="sensors">
                ${localize('panels.sensors.title', this.hass.language)}
              </paper-tab>
              <paper-tab page-name="codes">
                ${localize('panels.codes.title', this.hass.language)}
              </paper-tab>
              <paper-tab page-name="actions">
                ${localize('panels.actions.title', this.hass.language)}
              </paper-tab>
            </ha-tabs>
          </app-header>
        </ha-app-layout>
        <div class="view">
          ${this.getView()}
        </div>
      `;
            }
        }
        getPath() {
            return window.location.pathname.split('/');
        }
        getView() {
            const path = this.getPath();
            const view = path[2] || 'general';
            const args = path.slice(3);
            switch (view) {
                case 'general':
                    return T `
          <alarm-view-general
            .hass=${this.hass}
            .narrow=${this.narrow}
            .path=${args.length ? args : null}
          ></alarm-view-general>
        `;
                case 'sensors':
                    return T `
          <alarm-view-sensors .hass=${this.hass} .narrow=${this.narrow} .path=${args.length ? args : null}>
          </alarm-view-sensors>
        `;
                case 'codes':
                    return T `
          <alarm-view-codes .hass=${this.hass} .narrow=${this.narrow} .path=${args.length ? args : null}>
          </alarm-view-codes>
        `;
                case 'actions':
                    return T `
          <alarm-view-actions .hass=${this.hass} .narrow=${this.narrow} .path=${args.length ? args : null}>
          </alarm-view-actions>
        `;
                default:
                    return T `
            <ha-card header="Page not found">
              <div class="card-content">
                The page you are trying to reach cannot be found. 
                Please select a page from the menu above to continue.
              </div>
            </ha-card>
        `;
            }
        }
        handlePageSelected(ev) {
            const newPage = ev.detail.item.getAttribute('page-name');
            if (newPage !== this.getPath()) {
                F(this, `/alarmo/${newPage}`);
                this.requestUpdate();
            }
            else {
                scrollTo(0, 0);
            }
        }
        static get styles() {
            return i `
      ${commonStyle}

      :host {
        color: var(--primary-text-color);
        --paper-card-header-color: var(--primary-text-color);
      }

      app-header,
      app-toolbar {
        background-color: var(--app-header-background-color);
        font-weight: 400;
        color: var(--app-header-text-color, white);
      }
      app-toolbar {
        height: var(--header-height);
      }

      ha-app-layout {
        display: block;
        z-index: 2;
      }

      app-toolbar [main-title] {
        margin-left: 20px;
      }

      ha-tabs {
        margin-left: max(env(safe-area-inset-left), 24px);
        margin-right: max(env(safe-area-inset-right), 24px);
        --paper-tabs-selection-bar-color: var(
          --app-header-selection-bar-color,
          var(--app-header-text-color, #fff)
        );
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
    `;
        }
    };
    __decorate([
        e$3()
    ], exports.MyAlarmPanel.prototype, "hass", void 0);
    __decorate([
        e$3({ type: Boolean, reflect: true })
    ], exports.MyAlarmPanel.prototype, "narrow", void 0);
    __decorate([
        e$3()
    ], exports.MyAlarmPanel.prototype, "userConfig", void 0);
    exports.MyAlarmPanel = __decorate([
        n$4('alarm-panel')
    ], exports.MyAlarmPanel);

    return exports;

}({}));
