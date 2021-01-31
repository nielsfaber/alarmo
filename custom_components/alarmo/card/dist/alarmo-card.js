!function(t){"use strict";
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
    ***************************************************************************** */function e(t,e,n,s){var r,i=arguments.length,o=i<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,n):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,n,s);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(o=(i<3?r(o):i>3?r(e,n,o):r(e,n))||o);return i>3&&o&&Object.defineProperty(e,n,o),o
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */}const n="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,s=(t,e,n=null)=>{for(;e!==n;){const n=e.nextSibling;t.removeChild(e),e=n}},r=`{{lit-${String(Math.random()).slice(2)}}}`,i=`\x3c!--${r}--\x3e`,o=new RegExp(`${r}|${i}`);class a{constructor(t,e){this.parts=[],this.element=e;const n=[],s=[],i=document.createTreeWalker(e.content,133,null,!1);let a=0,c=-1,u=0;const{strings:p,values:{length:m}}=t;for(;u<m;){const t=i.nextNode();if(null!==t){if(c++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:n}=e;let s=0;for(let t=0;t<n;t++)l(e[t].name,"$lit$")&&s++;for(;s-- >0;){const e=p[u],n=h.exec(e)[2],s=n.toLowerCase()+"$lit$",r=t.getAttribute(s);t.removeAttribute(s);const i=r.split(o);this.parts.push({type:"attribute",index:c,name:n,strings:i}),u+=i.length-1}}"TEMPLATE"===t.tagName&&(s.push(t),i.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(r)>=0){const s=t.parentNode,r=e.split(o),i=r.length-1;for(let e=0;e<i;e++){let n,i=r[e];if(""===i)n=d();else{const t=h.exec(i);null!==t&&l(t[2],"$lit$")&&(i=i.slice(0,t.index)+t[1]+t[2].slice(0,-"$lit$".length)+t[3]),n=document.createTextNode(i)}s.insertBefore(n,t),this.parts.push({type:"node",index:++c})}""===r[i]?(s.insertBefore(d(),t),n.push(t)):t.data=r[i],u+=i}}else if(8===t.nodeType)if(t.data===r){const e=t.parentNode;null!==t.previousSibling&&c!==a||(c++,e.insertBefore(d(),t)),a=c,this.parts.push({type:"node",index:c}),null===t.nextSibling?t.data="":(n.push(t),c--),u++}else{let e=-1;for(;-1!==(e=t.data.indexOf(r,e+1));)this.parts.push({type:"node",index:-1}),u++}}else i.currentNode=s.pop()}for(const t of n)t.parentNode.removeChild(t)}}const l=(t,e)=>{const n=t.length-e.length;return n>=0&&t.slice(n)===e},c=t=>-1!==t.index,d=()=>document.createComment(""),h=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function u(t,e){const{element:{content:n},parts:s}=t,r=document.createTreeWalker(n,133,null,!1);let i=m(s),o=s[i],a=-1,l=0;const c=[];let d=null;for(;r.nextNode();){a++;const t=r.currentNode;for(t.previousSibling===d&&(d=null),e.has(t)&&(c.push(t),null===d&&(d=t)),null!==d&&l++;void 0!==o&&o.index===a;)o.index=null!==d?-1:o.index-l,i=m(s,i),o=s[i]}c.forEach(t=>t.parentNode.removeChild(t))}const p=t=>{let e=11===t.nodeType?0:1;const n=document.createTreeWalker(t,133,null,!1);for(;n.nextNode();)e++;return e},m=(t,e=-1)=>{for(let n=e+1;n<t.length;n++){const e=t[n];if(c(e))return n}return-1};
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
const g=new WeakMap,f=t=>"function"==typeof t&&g.has(t),_={},y={};
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
class v{constructor(t,e,n){this.__parts=[],this.template=t,this.processor=e,this.options=n}update(t){let e=0;for(const n of this.__parts)void 0!==n&&n.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=n?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],s=this.template.parts,r=document.createTreeWalker(t,133,null,!1);let i,o=0,a=0,l=r.nextNode();for(;o<s.length;)if(i=s[o],c(i)){for(;a<i.index;)a++,"TEMPLATE"===l.nodeName&&(e.push(l),r.currentNode=l.content),null===(l=r.nextNode())&&(r.currentNode=e.pop(),l=r.nextNode());if("node"===i.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(l.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,i.name,i.strings,this.options));o++}else this.__parts.push(void 0),o++;return n&&(document.adoptNode(t),customElements.upgrade(t)),t}}
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */const S=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:t=>t}),b=` ${r} `;class w{constructor(t,e,n,s){this.strings=t,this.values=e,this.type=n,this.processor=s}getHTML(){const t=this.strings.length-1;let e="",n=!1;for(let s=0;s<t;s++){const t=this.strings[s],o=t.lastIndexOf("\x3c!--");n=(o>-1||n)&&-1===t.indexOf("--\x3e",o+1);const a=h.exec(t);e+=null===a?t+(n?b:i):t.substr(0,a.index)+a[1]+a[2]+"$lit$"+a[3]+r}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");let e=this.getHTML();return void 0!==S&&(e=S.createHTML(e)),t.innerHTML=e,t}}
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */const x=t=>null===t||!("object"==typeof t||"function"==typeof t),C=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class P{constructor(t,e,n){this.dirty=!0,this.element=t,this.name=e,this.strings=n,this.parts=[];for(let t=0;t<n.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new N(this)}_getValue(){const t=this.strings,e=t.length-1,n=this.parts;if(1===e&&""===t[0]&&""===t[1]){const t=n[0].value;if("symbol"==typeof t)return String(t);if("string"==typeof t||!C(t))return t}let s="";for(let r=0;r<e;r++){s+=t[r];const e=n[r];if(void 0!==e){const t=e.value;if(x(t)||!C(t))s+="string"==typeof t?t:String(t);else for(const e of t)s+="string"==typeof e?e:String(e)}}return s+=t[e],s}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class N{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===_||x(t)&&t===this.value||(this.value=t,f(t)||(this.committer.dirty=!0))}commit(){for(;f(this.value);){const t=this.value;this.value=_,t(this)}this.value!==_&&this.committer.commit()}}class M{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(d()),this.endNode=t.appendChild(d())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=d()),t.__insert(this.endNode=d())}insertAfterPart(t){t.__insert(this.startNode=d()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;f(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=_,t(this)}const t=this.__pendingValue;t!==_&&(x(t)?t!==this.value&&this.__commitText(t):t instanceof w?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):C(t)?this.__commitIterable(t):t===y?(this.value=y,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,n="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=n:this.__commitNode(document.createTextNode(n)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof v&&this.value.template===e)this.value.update(t.values);else{const n=new v(e,t.processor,this.options),s=n._clone();n.update(t.values),this.__commitNode(s),this.value=n}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let n,s=0;for(const r of t)n=e[s],void 0===n&&(n=new M(this.options),e.push(n),0===s?n.appendIntoPart(this):n.insertAfterPart(e[s-1])),n.setValue(r),n.commit(),s++;s<e.length&&(e.length=s,this.clear(n&&n.endNode))}clear(t=this.startNode){s(this.startNode.parentNode,t.nextSibling,this.endNode)}}class A{constructor(t,e,n){if(this.value=void 0,this.__pendingValue=void 0,2!==n.length||""!==n[0]||""!==n[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=n}setValue(t){this.__pendingValue=t}commit(){for(;f(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=_,t(this)}if(this.__pendingValue===_)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=_}}class T extends P{constructor(t,e,n){super(t,e,n),this.single=2===n.length&&""===n[0]&&""===n[1]}_createPart(){return new E(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class E extends N{}let k=!1;(()=>{try{const t={get capture(){return k=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class O{constructor(t,e,n){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=n,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;f(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=_,t(this)}if(this.__pendingValue===_)return;const t=this.__pendingValue,e=this.value,n=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),s=null!=t&&(null==e||n);n&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),s&&(this.__options=D(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=_}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const D=t=>t&&(k?{capture:t.capture,passive:t.passive,once:t.once}:t.capture)
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */;function V(t){let e=$.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},$.set(t.type,e));let n=e.stringsArray.get(t.strings);if(void 0!==n)return n;const s=t.strings.join(r);return n=e.keyString.get(s),void 0===n&&(n=new a(t,t.getTemplateElement()),e.keyString.set(s,n)),e.stringsArray.set(t.strings,n),n}const $=new Map,U=new WeakMap;
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */const Y=new
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
class{handleAttributeExpressions(t,e,n,s){const r=e[0];if("."===r){return new T(t,e.slice(1),n).parts}if("@"===r)return[new O(t,e.slice(1),s.eventContext)];if("?"===r)return[new A(t,e.slice(1),n)];return new P(t,e,n).parts}handleTextExpression(t){return new M(t)}};
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const R=(t,...e)=>new w(t,e,"html",Y)
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */,H=(t,e)=>`${t}--${e}`;let z=!0;void 0===window.ShadyCSS?z=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),z=!1);const j=t=>e=>{const n=H(e.type,t);let s=$.get(n);void 0===s&&(s={stringsArray:new WeakMap,keyString:new Map},$.set(n,s));let i=s.stringsArray.get(e.strings);if(void 0!==i)return i;const o=e.strings.join(r);if(i=s.keyString.get(o),void 0===i){const n=e.getTemplateElement();z&&window.ShadyCSS.prepareTemplateDom(n,t),i=new a(e,n),s.keyString.set(o,i)}return s.stringsArray.set(e.strings,i),i},L=["html","svg"],I=new Set,F=(t,e,n)=>{I.add(t);const s=n?n.element:document.createElement("template"),r=e.querySelectorAll("style"),{length:i}=r;if(0===i)return void window.ShadyCSS.prepareTemplateStyles(s,t);const o=document.createElement("style");for(let t=0;t<i;t++){const e=r[t];e.parentNode.removeChild(e),o.textContent+=e.textContent}(t=>{L.forEach(e=>{const n=$.get(H(e,t));void 0!==n&&n.keyString.forEach(t=>{const{element:{content:e}}=t,n=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{n.add(t)}),u(t,n)})})})(t);const a=s.content;n?function(t,e,n=null){const{element:{content:s},parts:r}=t;if(null==n)return void s.appendChild(e);const i=document.createTreeWalker(s,133,null,!1);let o=m(r),a=0,l=-1;for(;i.nextNode();){l++;for(i.currentNode===n&&(a=p(e),n.parentNode.insertBefore(e,n));-1!==o&&r[o].index===l;){if(a>0){for(;-1!==o;)r[o].index+=a,o=m(r,o);return}o=m(r,o)}}}(n,o,a.firstChild):a.insertBefore(o,a.firstChild),window.ShadyCSS.prepareTemplateStyles(s,t);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)e.insertBefore(l.cloneNode(!0),e.firstChild);else if(n){a.insertBefore(o,a.firstChild);const t=new Set;t.add(o),u(n,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const q={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},B=(t,e)=>e!==t&&(e==e||t==t),W={attribute:!0,type:String,converter:q,reflect:!1,hasChanged:B};class J extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,n)=>{const s=this._attributeNameForProperty(n,e);void 0!==s&&(this._attributeToPropertyMap.set(s,n),t.push(s))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=W){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const n="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,n,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}static getPropertyDescriptor(t,e,n){return{get(){return this[e]},set(s){const r=this[t];this[e]=s,this.requestUpdateInternal(t,r,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||W}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty("finalized")||t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const n of e)this.createProperty(n,t[n])}}static _attributeNameForProperty(t,e){const n=e.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,n=B){return n(t,e)}static _propertyValueFromAttribute(t,e){const n=e.type,s=e.converter||q,r="function"==typeof s?s:s.fromAttribute;return r?r(t,n):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const n=e.type,s=e.converter;return(s&&s.toAttribute||q.toAttribute)(t,n)}initialize(){this._updateState=0,this._updatePromise=new Promise(t=>this._enableUpdatingResolver=t),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,n){e!==n&&this._attributeToProperty(t,n)}_propertyToAttribute(t,e,n=W){const s=this.constructor,r=s._attributeNameForProperty(t,n);if(void 0!==r){const t=s._propertyValueToAttribute(e,n);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(r):this.setAttribute(r,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const n=this.constructor,s=n._attributeToPropertyMap.get(t);if(void 0!==s){const t=n.getPropertyOptions(s);this._updateState=16|this._updateState,this[s]=n._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}requestUpdateInternal(t,e,n){let s=!0;if(void 0!==t){const r=this.constructor;n=n||r.getPropertyOptions(t),r._valueHasChanged(this[t],e,n.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==n.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,n))):s=!1}!this._hasRequestedUpdate&&s&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this.requestUpdateInternal(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}J.finalized=!0;
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
const Z=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:n,elements:s}=e;return{kind:n,elements:s,finisher(e){window.customElements.define(t,e)}}})(t,e),G=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?Object.assign(Object.assign({},e),{finisher(n){n.createProperty(e.key,t)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(n){n.createProperty(e.key,t)}};function K(t){return(e,n)=>void 0!==n?((t,e,n)=>{e.constructor.createProperty(n,t)})(t,e,n):G(t,e)}function Q(t){return K({attribute:!1,hasChanged:null==t?void 0:t.hasChanged})}
/**
    @license
    Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
    This code may only be used under the BSD style license found at
    http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
    http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
    found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
    part of the polymer project is also subject to an additional IP rights grant
    found at http://polymer.github.io/PATENTS.txt
    */const X=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,tt=Symbol();class et{constructor(t,e){if(e!==tt)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(X?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const nt=(t,...e)=>{const n=e.reduce((e,n,s)=>e+(t=>{if(t instanceof et)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(n)+t[s+1],t[0]);return new et(n,tt)};
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const st={};class rt extends J{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(Array.isArray(t)){const e=(t,n)=>t.reduceRight((t,n)=>Array.isArray(n)?e(n,t):(t.add(n),t),n),n=e(t,new Set),s=[];n.forEach(t=>s.unshift(t)),this._styles=s}else this._styles=void 0===t?[]:[t];this._styles=this._styles.map(t=>{if(t instanceof CSSStyleSheet&&!X){const e=Array.prototype.slice.call(t.cssRules).reduce((t,e)=>t+e.cssText,"");return new et(String(e),tt)}return t})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?X?this.renderRoot.adoptedStyleSheets=t.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==st&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){return st}}rt.finalized=!0,rt.render=(t,e,n)=>{if(!n||"object"!=typeof n||!n.scopeName)throw new Error("The `scopeName` option is required.");const r=n.scopeName,i=U.has(e),o=z&&11===e.nodeType&&!!e.host,a=o&&!I.has(r),l=a?document.createDocumentFragment():e;if(((t,e,n)=>{let r=U.get(e);void 0===r&&(s(e,e.firstChild),U.set(e,r=new M(Object.assign({templateFactory:V},n))),r.appendInto(e)),r.setValue(t),r.commit()})(t,l,Object.assign({templateFactory:j(r)},n)),a){const t=U.get(l);U.delete(l);const n=t.value instanceof v?t.value.template:void 0;F(r,l,n),s(e,e.firstChild),e.appendChild(l),U.set(e,t)}!i&&o&&window.ShadyCSS.styleElement(e.host)};var it=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,ot="[^\\s]+",at=/\[([^]*?)\]/gm;function lt(t,e){for(var n=[],s=0,r=t.length;s<r;s++)n.push(t[s].substr(0,e));return n}var ct=function(t){return function(e,n){var s=n[t].map((function(t){return t.toLowerCase()})).indexOf(e.toLowerCase());return s>-1?s:null}};function dt(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];for(var s=0,r=e;s<r.length;s++){var i=r[s];for(var o in i)t[o]=i[o]}return t}var ht=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],ut=["January","February","March","April","May","June","July","August","September","October","November","December"],pt=lt(ut,3),mt={dayNamesShort:lt(ht,3),dayNames:ht,monthNamesShort:pt,monthNames:ut,amPm:["am","pm"],DoFn:function(t){return t+["th","st","nd","rd"][t%10>3?0:(t-t%10!=10?1:0)*t%10]}},gt=dt({},mt),ft=function(t,e){for(void 0===e&&(e=2),t=String(t);t.length<e;)t="0"+t;return t},_t={D:function(t){return String(t.getDate())},DD:function(t){return ft(t.getDate())},Do:function(t,e){return e.DoFn(t.getDate())},d:function(t){return String(t.getDay())},dd:function(t){return ft(t.getDay())},ddd:function(t,e){return e.dayNamesShort[t.getDay()]},dddd:function(t,e){return e.dayNames[t.getDay()]},M:function(t){return String(t.getMonth()+1)},MM:function(t){return ft(t.getMonth()+1)},MMM:function(t,e){return e.monthNamesShort[t.getMonth()]},MMMM:function(t,e){return e.monthNames[t.getMonth()]},YY:function(t){return ft(String(t.getFullYear()),4).substr(2)},YYYY:function(t){return ft(t.getFullYear(),4)},h:function(t){return String(t.getHours()%12||12)},hh:function(t){return ft(t.getHours()%12||12)},H:function(t){return String(t.getHours())},HH:function(t){return ft(t.getHours())},m:function(t){return String(t.getMinutes())},mm:function(t){return ft(t.getMinutes())},s:function(t){return String(t.getSeconds())},ss:function(t){return ft(t.getSeconds())},S:function(t){return String(Math.round(t.getMilliseconds()/100))},SS:function(t){return ft(Math.round(t.getMilliseconds()/10),2)},SSS:function(t){return ft(t.getMilliseconds(),3)},a:function(t,e){return t.getHours()<12?e.amPm[0]:e.amPm[1]},A:function(t,e){return t.getHours()<12?e.amPm[0].toUpperCase():e.amPm[1].toUpperCase()},ZZ:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+ft(100*Math.floor(Math.abs(e)/60)+Math.abs(e)%60,4)},Z:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+ft(Math.floor(Math.abs(e)/60),2)+":"+ft(Math.abs(e)%60,2)}},yt=function(t){return+t-1},vt=[null,"[1-9]\\d?"],St=[null,ot],bt=["isPm",ot,function(t,e){var n=t.toLowerCase();return n===e.amPm[0]?0:n===e.amPm[1]?1:null}],wt=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(t){var e=(t+"").match(/([+-]|\d\d)/gi);if(e){var n=60*+e[1]+parseInt(e[2],10);return"+"===e[0]?n:-n}return 0}],xt=(ct("monthNamesShort"),ct("monthNames"),{default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",isoDate:"YYYY-MM-DD",isoDateTime:"YYYY-MM-DDTHH:mm:ssZ",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"});var Ct=function(t,e,n){if(void 0===e&&(e=xt.default),void 0===n&&(n={}),"number"==typeof t&&(t=new Date(t)),"[object Date]"!==Object.prototype.toString.call(t)||isNaN(t.getTime()))throw new Error("Invalid Date pass to format");var s=[];e=(e=xt[e]||e).replace(at,(function(t,e){return s.push(e),"@@@"}));var r=dt(dt({},gt),n);return(e=e.replace(it,(function(e){return _t[e](t,r)}))).replace(/@@@/g,(function(){return s.shift()}))},Pt=(function(){try{(new Date).toLocaleDateString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(t){return"RangeError"===t.name}}(),function(t,e,n,s){s=s||{},n=null==n?{}:n;var r=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return r.detail=n,t.dispatchEvent(r),r});const Nt=["1","2","3","4","5","6","7","8","9","","0","clear"],Mt={armed_away:"hass:shield-lock",armed_custom_bypass:"hass:security",armed_home:"hass:shield-home",armed_night:"hass:shield-home",disarmed:"hass:shield-check",pending:"hass:shield-outline",triggered:"hass:bell-ring"};let At=class extends rt{setConfig(t){this._config=Object.assign({},t)}get _entity(){return this._config.entity||""}render(){return this._config&&this.hass?R`
      <div class="card-config">
        <ha-entity-picker
          .label="${this.hass.localize("ui.panel.lovelace.editor.card.generic.entity")} (${this.hass.localize("ui.panel.lovelace.editor.card.config.required")})"
          .hass=${this.hass}
          .value="${this._entity}"
          .includeDomains=${["alarm_control_panel"]}
          @change=${this._entityChanged}
          allow-custom-entity
        ></ha-entity-picker>
    `:R``}_entityChanged(t){if(!this._config||!this.hass)return;const e=t.target;""===e.value?(this._config=Object.assign({},this._config),delete this._config.entity):this._config=Object.assign(Object.assign({},this._config),{entity:e.value}),Pt(this,"config-changed",{config:this._config})}};e([K({attribute:!1})],At.prototype,"hass",void 0),e([Q()],At.prototype,"_config",void 0),At=e([Z("alarmo-card-editor")],At);var Tt=Object.freeze({__proto__:null,get AlarmoCardEditor(){return At}});t.AlarmoCard=class extends rt{constructor(){super(...arguments),this._input=""}static async getConfigElement(){return await Promise.resolve().then((function(){return Tt})),document.createElement("alarmo-card-editor")}setConfig(t){if(!t||!t.entity||"alarm_control_panel"!==t.entity.split(".")[0])throw new Error("Invalid configuration");this._config=Object.assign({},t)}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");return!e||e.themes!==this.hass.themes||e.language!==this.hass.language||e.states[this._config.entity]!==this.hass.states[this._config.entity]}render(){if(!this._config||!this.hass)return R``;const t=this.hass.states[this._config.entity];return t?R`
      <ha-card
        .header="${t.attributes.friendly_name||this.hass.localize("component.alarm_control_panel.state._."+t.state)}"
      >

        <ha-label-badge
          class="${t.state}"
          .icon="${Mt[t.state]||"hass:shield-outline"}"
          .label="${this._stateIconLabel(t.state)}"
          @click=${()=>Pt(this,"hass-more-info",{entityId:this._config.entity})}
        ></ha-label-badge>

        <div id="armActions" class="actions">
          ${("disarmed"===t.state?this.calcSupportedStates():["disarm"]).map(t=>R`
              <mwc-button
                @click=${()=>this._handleActionClick(t)}
                outlined
              >
                ${this.hass.localize("ui.card.alarm_control_panel."+t)}
              </mwc-button>
            `)}
        </div>


        ${t.attributes.code_format?R`
              <paper-input
                .value=${this._input}
                .label=${this.hass.localize("ui.card.alarm_control_panel.code")}
                @value-changed=${t=>this._input=t.target.value}
                type="password"
              ></paper-input>
            `:R``}
        ${"number"!==t.attributes.code_format?R``:R`
              <div id="keypad">
                ${Nt.map(t=>""===t?R` <mwc-button disabled></mwc-button> `:R`
                        <mwc-button
                          .value="${t}"
                          @click=${this._handlePadClick}
                          outlined
                          class=${"clear"!==t?"numberKey":""}
                        >
                          ${"clear"===t?this.hass.localize("ui.card.alarm_control_panel.clear_code"):t}
                        </mwc-button>
                      `)}
              </div>
            `}
      </ha-card>
    `:R`
        <hui-warning>
         ${"NOT_RUNNING"!==this.hass.config.state?this.hass.localize("ui.panel.lovelace.warning.entity_not_found","entity",this._config.entity||"[empty]"):this.hass.localize("ui.panel.lovelace.warning.starting")}
        </hui-warning>
      `}calcSupportedStates(){var t;if(!this.hass||!this._config)return[];const e=this.hass.states[null===(t=this._config)||void 0===t?void 0:t.entity].attributes.supported_features||0;let n=[];return 2&e&&n.push("arm_away"),1&e&&n.push("arm_home"),4&e&&n.push("arm_night"),16&e&&n.push("arm_custom_bypass"),n}_handlePadClick(t){const e=t.currentTarget.value;this._input="clear"===e?"":this._input+e}_handleActionClick(t){this.hass.callService("alarm_control_panel","alarm_"+t,{entity_id:this._config.entity,code:this._input}),this._input=""}_stateIconLabel(t){return t.split("_").pop()?this.hass.localize("component.alarm_control_panel.state._."+t):""}static get styles(){return nt`
      ha-card {
        padding-bottom: 16px;
        position: relative;
        height: 100%;
        box-sizing: border-box;
        --alarm-color-disarmed: var(--primary-color);
        --alarm-color-pending: var(--label-badge-yellow);
        --alarm-color-triggered: var(--label-badge-red);
        --alarm-color-armed: var(--label-badge-red);
        --alarm-color-autoarm: rgba(0, 153, 255, 0.1);
        --alarm-state-color: var(--alarm-color-armed);
      }
      ha-label-badge {
        --ha-label-badge-color: var(--alarm-state-color);
        --label-badge-text-color: var(--alarm-state-color);
        --label-badge-background-color: var(--card-background-color);
        color: var(--alarm-state-color);
        position: absolute;
        right: 12px;
        top: 8px;
        cursor: pointer;
      }
      .disarmed {
        --alarm-state-color: var(--alarm-color-disarmed);
      }
      .triggered {
        --alarm-state-color: var(--alarm-color-triggered);
        animation: pulse 1s infinite;
      }
      .arming {
        --alarm-state-color: var(--alarm-color-pending);
        animation: pulse 1s infinite;
      }
      .pending {
        --alarm-state-color: var(--alarm-color-pending);
        animation: pulse 1s infinite;
      }
      @keyframes pulse {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
      .actions {
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
      .actions mwc-button {
        margin: 0 4px 4px;
      }
      paper-input {
        margin: 0 auto 8px;
        max-width: 150px;
        text-align: center;
      }
      #keypad {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin: auto;
        width: 100%;
        max-width: 300px;
      }
      #keypad mwc-button {
        padding: 8px;
        width: 30%;
        box-sizing: border-box;
      }
      mwc-button.numberkey {
        --mdc-typography-button-font-size: var(--keypad-font-size, 0.875rem);
      }
    `}},e([K({attribute:!1})],t.AlarmoCard.prototype,"hass",void 0),e([Q()],t.AlarmoCard.prototype,"_config",void 0),e([Q()],t.AlarmoCard.prototype,"_input",void 0),t.AlarmoCard=e([Z("alarmo-card")],t.AlarmoCard),window.customCards=window.customCards||[],window.customCards.push({type:"alarmo-card",name:"Alarmo Card",description:"Card for operating Alarmo through Lovelace."}),console.info("%c  ALARMO-CARD  \n%c  Version: "+"v1.0.0".padEnd(7," "),"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray")}({});
