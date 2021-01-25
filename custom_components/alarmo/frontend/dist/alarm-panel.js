!function(e){"use strict";
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
    ***************************************************************************** */function t(e,t,a,s){var i,n=arguments.length,r=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,a):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,a,s);else for(var o=e.length-1;o>=0;o--)(i=e[o])&&(r=(n<3?i(r):n>3?i(t,a,r):i(t,a))||r);return n>3&&r&&Object.defineProperty(t,a,r),r
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
     */}const a="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,s=(e,t,a=null)=>{for(;t!==a;){const a=t.nextSibling;e.removeChild(t),t=a}},i=`{{lit-${String(Math.random()).slice(2)}}}`,n=`\x3c!--${i}--\x3e`,r=new RegExp(`${i}|${n}`);class o{constructor(e,t){this.parts=[],this.element=t;const a=[],s=[],n=document.createTreeWalker(t.content,133,null,!1);let o=0,l=-1,p=0;const{strings:u,values:{length:m}}=e;for(;p<m;){const e=n.nextNode();if(null!==e){if(l++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:a}=t;let s=0;for(let e=0;e<a;e++)d(t[e].name,"$lit$")&&s++;for(;s-- >0;){const t=u[p],a=h.exec(t)[2],s=a.toLowerCase()+"$lit$",i=e.getAttribute(s);e.removeAttribute(s);const n=i.split(r);this.parts.push({type:"attribute",index:l,name:a,strings:n}),p+=n.length-1}}"TEMPLATE"===e.tagName&&(s.push(e),n.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(i)>=0){const s=e.parentNode,i=t.split(r),n=i.length-1;for(let t=0;t<n;t++){let a,n=i[t];if(""===n)a=c();else{const e=h.exec(n);null!==e&&d(e[2],"$lit$")&&(n=n.slice(0,e.index)+e[1]+e[2].slice(0,-"$lit$".length)+e[3]),a=document.createTextNode(n)}s.insertBefore(a,e),this.parts.push({type:"node",index:++l})}""===i[n]?(s.insertBefore(c(),e),a.push(e)):e.data=i[n],p+=n}}else if(8===e.nodeType)if(e.data===i){const t=e.parentNode;null!==e.previousSibling&&l!==o||(l++,t.insertBefore(c(),e)),o=l,this.parts.push({type:"node",index:l}),null===e.nextSibling?e.data="":(a.push(e),l--),p++}else{let t=-1;for(;-1!==(t=e.data.indexOf(i,t+1));)this.parts.push({type:"node",index:-1}),p++}}else n.currentNode=s.pop()}for(const e of a)e.parentNode.removeChild(e)}}const d=(e,t)=>{const a=e.length-t.length;return a>=0&&e.slice(a)===t},l=e=>-1!==e.index,c=()=>document.createComment(""),h=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function p(e,t){const{element:{content:a},parts:s}=e,i=document.createTreeWalker(a,133,null,!1);let n=m(s),r=s[n],o=-1,d=0;const l=[];let c=null;for(;i.nextNode();){o++;const e=i.currentNode;for(e.previousSibling===c&&(c=null),t.has(e)&&(l.push(e),null===c&&(c=e)),null!==c&&d++;void 0!==r&&r.index===o;)r.index=null!==c?-1:r.index-d,n=m(s,n),r=s[n]}l.forEach(e=>e.parentNode.removeChild(e))}const u=e=>{let t=11===e.nodeType?0:1;const a=document.createTreeWalker(e,133,null,!1);for(;a.nextNode();)t++;return t},m=(e,t=-1)=>{for(let a=t+1;a<e.length;a++){const t=e[a];if(l(t))return a}return-1};
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
const g=new WeakMap,v=e=>"function"==typeof e&&g.has(e),_={},f={};
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
class b{constructor(e,t,a){this.__parts=[],this.template=e,this.processor=t,this.options=a}update(e){let t=0;for(const a of this.__parts)void 0!==a&&a.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=a?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],s=this.template.parts,i=document.createTreeWalker(e,133,null,!1);let n,r=0,o=0,d=i.nextNode();for(;r<s.length;)if(n=s[r],l(n)){for(;o<n.index;)o++,"TEMPLATE"===d.nodeName&&(t.push(d),i.currentNode=d.content),null===(d=i.nextNode())&&(i.currentNode=t.pop(),d=i.nextNode());if("node"===n.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(d.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(d,n.name,n.strings,this.options));r++}else this.__parts.push(void 0),r++;return a&&(document.adoptNode(e),customElements.upgrade(e)),e}}
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
     */const w=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),y=` ${i} `;class ${constructor(e,t,a,s){this.strings=e,this.values=t,this.type=a,this.processor=s}getHTML(){const e=this.strings.length-1;let t="",a=!1;for(let s=0;s<e;s++){const e=this.strings[s],r=e.lastIndexOf("\x3c!--");a=(r>-1||a)&&-1===e.indexOf("--\x3e",r+1);const o=h.exec(e);t+=null===o?e+(a?y:n):e.substr(0,o.index)+o[1]+o[2]+"$lit$"+o[3]+i}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==w&&(t=w.createHTML(t)),e.innerHTML=t,e}}
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
     */const k=e=>null===e||!("object"==typeof e||"function"==typeof e),x=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class A{constructor(e,t,a){this.dirty=!0,this.element=e,this.name=t,this.strings=a,this.parts=[];for(let e=0;e<a.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new O(this)}_getValue(){const e=this.strings,t=e.length-1,a=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=a[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!x(e))return e}let s="";for(let i=0;i<t;i++){s+=e[i];const t=a[i];if(void 0!==t){const e=t.value;if(k(e)||!x(e))s+="string"==typeof e?e:String(e);else for(const t of e)s+="string"==typeof t?t:String(t)}}return s+=e[t],s}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class O{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===_||k(e)&&e===this.value||(this.value=e,v(e)||(this.committer.dirty=!0))}commit(){for(;v(this.value);){const e=this.value;this.value=_,e(this)}this.value!==_&&this.committer.commit()}}class S{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(c()),this.endNode=e.appendChild(c())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=c()),e.__insert(this.endNode=c())}insertAfterPart(e){e.__insert(this.startNode=c()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;v(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=_,e(this)}const e=this.__pendingValue;e!==_&&(k(e)?e!==this.value&&this.__commitText(e):e instanceof $?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):x(e)?this.__commitIterable(e):e===f?(this.value=f,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,a="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=a:this.__commitNode(document.createTextNode(a)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof b&&this.value.template===t)this.value.update(e.values);else{const a=new b(t,e.processor,this.options),s=a._clone();a.update(e.values),this.__commitNode(s),this.value=a}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let a,s=0;for(const i of e)a=t[s],void 0===a&&(a=new S(this.options),t.push(a),0===s?a.appendIntoPart(this):a.insertAfterPart(t[s-1])),a.setValue(i),a.commit(),s++;s<t.length&&(t.length=s,this.clear(a&&a.endNode))}clear(e=this.startNode){s(this.startNode.parentNode,e.nextSibling,this.endNode)}}class j{constructor(e,t,a){if(this.value=void 0,this.__pendingValue=void 0,2!==a.length||""!==a[0]||""!==a[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=a}setValue(e){this.__pendingValue=e}commit(){for(;v(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=_,e(this)}if(this.__pendingValue===_)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=_}}class C extends A{constructor(e,t,a){super(e,t,a),this.single=2===a.length&&""===a[0]&&""===a[1]}_createPart(){return new M(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class M extends O{}let T=!1;(()=>{try{const e={get capture(){return T=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class E{constructor(e,t,a){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=a,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;v(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=_,e(this)}if(this.__pendingValue===_)return;const e=this.__pendingValue,t=this.value,a=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),s=null!=e&&(null==t||a);a&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),s&&(this.__options=D(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=_}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const D=e=>e&&(T?{capture:e.capture,passive:e.passive,once:e.once}:e.capture)
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
     */;function N(e){let t=P.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},P.set(e.type,t));let a=t.stringsArray.get(e.strings);if(void 0!==a)return a;const s=e.strings.join(i);return a=t.keyString.get(s),void 0===a&&(a=new o(e,e.getTemplateElement()),t.keyString.set(s,a)),t.stringsArray.set(e.strings,a),a}const P=new Map,q=new WeakMap;
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
     */const z=new
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
class{handleAttributeExpressions(e,t,a,s){const i=t[0];if("."===i){return new C(e,t.slice(1),a).parts}if("@"===i)return[new E(e,t.slice(1),s.eventContext)];if("?"===i)return[new j(e,t.slice(1),a)];return new A(e,t,a).parts}handleTextExpression(e){return new S(e)}};
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
     */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const R=(e,...t)=>new $(e,t,"html",z)
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
     */,V=(e,t)=>`${e}--${t}`;let L=!0;void 0===window.ShadyCSS?L=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),L=!1);const U=e=>t=>{const a=V(t.type,e);let s=P.get(a);void 0===s&&(s={stringsArray:new WeakMap,keyString:new Map},P.set(a,s));let n=s.stringsArray.get(t.strings);if(void 0!==n)return n;const r=t.strings.join(i);if(n=s.keyString.get(r),void 0===n){const a=t.getTemplateElement();L&&window.ShadyCSS.prepareTemplateDom(a,e),n=new o(t,a),s.keyString.set(r,n)}return s.stringsArray.set(t.strings,n),n},F=["html","svg"],I=new Set,H=(e,t,a)=>{I.add(e);const s=a?a.element:document.createElement("template"),i=t.querySelectorAll("style"),{length:n}=i;if(0===n)return void window.ShadyCSS.prepareTemplateStyles(s,e);const r=document.createElement("style");for(let e=0;e<n;e++){const t=i[e];t.parentNode.removeChild(t),r.textContent+=t.textContent}(e=>{F.forEach(t=>{const a=P.get(V(t,e));void 0!==a&&a.keyString.forEach(e=>{const{element:{content:t}}=e,a=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{a.add(e)}),p(e,a)})})})(e);const o=s.content;a?function(e,t,a=null){const{element:{content:s},parts:i}=e;if(null==a)return void s.appendChild(t);const n=document.createTreeWalker(s,133,null,!1);let r=m(i),o=0,d=-1;for(;n.nextNode();){d++;for(n.currentNode===a&&(o=u(t),a.parentNode.insertBefore(t,a));-1!==r&&i[r].index===d;){if(o>0){for(;-1!==r;)i[r].index+=o,r=m(i,r);return}r=m(i,r)}}}(a,r,o.firstChild):o.insertBefore(r,o.firstChild),window.ShadyCSS.prepareTemplateStyles(s,e);const d=o.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==d)t.insertBefore(d.cloneNode(!0),t.firstChild);else if(a){o.insertBefore(r,o.firstChild);const e=new Set;e.add(r),p(a,e)}};window.JSCompiler_renameProperty=(e,t)=>e;const Y={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},B=(e,t)=>t!==e&&(t==t||e==e),W={attribute:!0,type:String,converter:Y,reflect:!1,hasChanged:B};class K extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach((t,a)=>{const s=this._attributeNameForProperty(a,t);void 0!==s&&(this._attributeToPropertyMap.set(s,a),e.push(s))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,t)=>this._classProperties.set(t,e))}}static createProperty(e,t=W){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const a="symbol"==typeof e?Symbol():"__"+e,s=this.getPropertyDescriptor(e,a,t);void 0!==s&&Object.defineProperty(this.prototype,e,s)}static getPropertyDescriptor(e,t,a){return{get(){return this[t]},set(s){const i=this[e];this[t]=s,this.requestUpdateInternal(e,i,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||W}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const a of t)this.createProperty(a,e[a])}}static _attributeNameForProperty(e,t){const a=t.attribute;return!1===a?void 0:"string"==typeof a?a:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,a=B){return a(e,t)}static _propertyValueFromAttribute(e,t){const a=t.type,s=t.converter||Y,i="function"==typeof s?s:s.fromAttribute;return i?i(e,a):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const a=t.type,s=t.converter;return(s&&s.toAttribute||Y.toAttribute)(e,a)}initialize(){this._updateState=0,this._updatePromise=new Promise(e=>this._enableUpdatingResolver=e),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,a){t!==a&&this._attributeToProperty(e,a)}_propertyToAttribute(e,t,a=W){const s=this.constructor,i=s._attributeNameForProperty(e,a);if(void 0!==i){const e=s._propertyValueToAttribute(t,a);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(i):this.setAttribute(i,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const a=this.constructor,s=a._attributeToPropertyMap.get(e);if(void 0!==s){const e=a.getPropertyOptions(s);this._updateState=16|this._updateState,this[s]=a._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,a){let s=!0;if(void 0!==e){const i=this.constructor;a=a||i.getPropertyOptions(e),i._valueHasChanged(this[e],t,a.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==a.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,a))):s=!1}!this._hasRequestedUpdate&&s&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((e,t)=>this._propertyToAttribute(t,this[t],e)),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}K.finalized=!0;
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
const G=e=>t=>"function"==typeof t?((e,t)=>(window.customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:a,elements:s}=t;return{kind:a,elements:s,finisher(t){window.customElements.define(e,t)}}})(e,t),J=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?Object.assign(Object.assign({},t),{finisher(a){a.createProperty(t.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(a){a.createProperty(t.key,e)}};function Q(e){return(t,a)=>void 0!==a?((e,t,a)=>{t.constructor.createProperty(a,e)})(e,t,a):J(e,t)}function Z(e){return Q({attribute:!1,hasChanged:null==e?void 0:e.hasChanged})}const X=(e,t,a)=>{Object.defineProperty(t,a,e)},ee=(e,t)=>({kind:"method",placement:"prototype",key:t.key,descriptor:e})
/**
    @license
    Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
    This code may only be used under the BSD style license found at
    http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
    http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
    found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
    part of the polymer project is also subject to an additional IP rights grant
    found at http://polymer.github.io/PATENTS.txt
    */,te=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ae=Symbol();class se{constructor(e,t){if(t!==ae)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(te?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const ie=(e,...t)=>{const a=t.reduce((t,a,s)=>t+(e=>{if(e instanceof se)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(a)+e[s+1],e[0]);return new se(a,ae)};
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const ne={};class re extends K{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,a)=>e.reduceRight((e,a)=>Array.isArray(a)?t(a,e):(e.add(a),e),a),a=t(e,new Set),s=[];a.forEach(e=>s.unshift(e)),this._styles=s}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map(e=>{if(e instanceof CSSStyleSheet&&!te){const t=Array.prototype.slice.call(e.cssRules).reduce((e,t)=>e+t.cssText,"");return new se(String(t),ae)}return e})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?te?this.renderRoot.adoptedStyleSheets=e.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==ne&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){return ne}}re.finalized=!0,re.render=(e,t,a)=>{if(!a||"object"!=typeof a||!a.scopeName)throw new Error("The `scopeName` option is required.");const i=a.scopeName,n=q.has(t),r=L&&11===t.nodeType&&!!t.host,o=r&&!I.has(i),d=o?document.createDocumentFragment():t;if(((e,t,a)=>{let i=q.get(t);void 0===i&&(s(t,t.firstChild),q.set(t,i=new S(Object.assign({templateFactory:N},a))),i.appendInto(t)),i.setValue(e),i.commit()})(e,d,Object.assign({templateFactory:U(i)},a)),o){const e=q.get(d);q.delete(d);const a=e.value instanceof b?e.value.template:void 0;H(i,d,a),s(t,t.firstChild),t.appendChild(d),q.set(t,e)}!n&&r&&window.ShadyCSS.styleElement(t.host)};var oe=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,de="[^\\s]+",le=/\[([^]*?)\]/gm;function ce(e,t){for(var a=[],s=0,i=e.length;s<i;s++)a.push(e[s].substr(0,t));return a}var he=function(e){return function(t,a){var s=a[e].map((function(e){return e.toLowerCase()})).indexOf(t.toLowerCase());return s>-1?s:null}};function pe(e){for(var t=[],a=1;a<arguments.length;a++)t[a-1]=arguments[a];for(var s=0,i=t;s<i.length;s++){var n=i[s];for(var r in n)e[r]=n[r]}return e}var ue=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],me=["January","February","March","April","May","June","July","August","September","October","November","December"],ge=ce(me,3),ve={dayNamesShort:ce(ue,3),dayNames:ue,monthNamesShort:ge,monthNames:me,amPm:["am","pm"],DoFn:function(e){return e+["th","st","nd","rd"][e%10>3?0:(e-e%10!=10?1:0)*e%10]}},_e=pe({},ve),fe=function(e,t){for(void 0===t&&(t=2),e=String(e);e.length<t;)e="0"+e;return e},be={D:function(e){return String(e.getDate())},DD:function(e){return fe(e.getDate())},Do:function(e,t){return t.DoFn(e.getDate())},d:function(e){return String(e.getDay())},dd:function(e){return fe(e.getDay())},ddd:function(e,t){return t.dayNamesShort[e.getDay()]},dddd:function(e,t){return t.dayNames[e.getDay()]},M:function(e){return String(e.getMonth()+1)},MM:function(e){return fe(e.getMonth()+1)},MMM:function(e,t){return t.monthNamesShort[e.getMonth()]},MMMM:function(e,t){return t.monthNames[e.getMonth()]},YY:function(e){return fe(String(e.getFullYear()),4).substr(2)},YYYY:function(e){return fe(e.getFullYear(),4)},h:function(e){return String(e.getHours()%12||12)},hh:function(e){return fe(e.getHours()%12||12)},H:function(e){return String(e.getHours())},HH:function(e){return fe(e.getHours())},m:function(e){return String(e.getMinutes())},mm:function(e){return fe(e.getMinutes())},s:function(e){return String(e.getSeconds())},ss:function(e){return fe(e.getSeconds())},S:function(e){return String(Math.round(e.getMilliseconds()/100))},SS:function(e){return fe(Math.round(e.getMilliseconds()/10),2)},SSS:function(e){return fe(e.getMilliseconds(),3)},a:function(e,t){return e.getHours()<12?t.amPm[0]:t.amPm[1]},A:function(e,t){return e.getHours()<12?t.amPm[0].toUpperCase():t.amPm[1].toUpperCase()},ZZ:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+fe(100*Math.floor(Math.abs(t)/60)+Math.abs(t)%60,4)},Z:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+fe(Math.floor(Math.abs(t)/60),2)+":"+fe(Math.abs(t)%60,2)}},we=function(e){return+e-1},ye=[null,"[1-9]\\d?"],$e=[null,de],ke=["isPm",de,function(e,t){var a=e.toLowerCase();return a===t.amPm[0]?0:a===t.amPm[1]?1:null}],xe=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(e){var t=(e+"").match(/([+-]|\d\d)/gi);if(t){var a=60*+t[1]+parseInt(t[2],10);return"+"===t[0]?a:-a}return 0}],Ae=(he("monthNamesShort"),he("monthNames"),{default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",isoDate:"YYYY-MM-DD",isoDateTime:"YYYY-MM-DDTHH:mm:ssZ",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"});var Oe=function(e,t,a){if(void 0===t&&(t=Ae.default),void 0===a&&(a={}),"number"==typeof e&&(e=new Date(e)),"[object Date]"!==Object.prototype.toString.call(e)||isNaN(e.getTime()))throw new Error("Invalid Date pass to format");var s=[];t=(t=Ae[t]||t).replace(le,(function(e,t){return s.push(t),"@@@"}));var i=pe(pe({},_e),a);return(t=t.replace(oe,(function(t){return be[t](e,i)}))).replace(/@@@/g,(function(){return s.shift()}))};(function(){try{(new Date).toLocaleDateString("i")}catch(e){return"RangeError"===e.name}})(),function(){try{(new Date).toLocaleString("i")}catch(e){return"RangeError"===e.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(e){return"RangeError"===e.name}}();function Se(e){return e.substr(0,e.indexOf("."))}function je(e){return e.substr(e.indexOf(".")+1)}var Ce="hass:bookmark",Me=function(e,t,a,s){s=s||{},a=null==a?{}:a;var i=new Event(t,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return i.detail=a,e.dispatchEvent(i),i},Te={alert:"hass:alert",automation:"hass:playlist-play",calendar:"hass:calendar",camera:"hass:video",climate:"hass:thermostat",configurator:"hass:settings",conversation:"hass:text-to-speech",device_tracker:"hass:account",fan:"hass:fan",group:"hass:google-circles-communities",history_graph:"hass:chart-line",homeassistant:"hass:home-assistant",homekit:"hass:home-automation",image_processing:"hass:image-filter-frames",input_boolean:"hass:drawing",input_datetime:"hass:calendar-clock",input_number:"hass:ray-vertex",input_select:"hass:format-list-bulleted",input_text:"hass:textbox",light:"hass:lightbulb",mailbox:"hass:mailbox",notify:"hass:comment-alert",person:"hass:account",plant:"hass:flower",proximity:"hass:apple-safari",remote:"hass:remote",scene:"hass:google-pages",script:"hass:file-document",sensor:"hass:eye",simple_alarm:"hass:bell",sun:"hass:white-balance-sunny",switch:"hass:flash",timer:"hass:timer",updater:"hass:cloud-upload",vacuum:"hass:robot-vacuum",water_heater:"hass:thermometer",weblink:"hass:open-in-new"};function Ee(e,t){if(e in Te)return Te[e];switch(e){case"alarm_control_panel":switch(t){case"armed_home":return"hass:bell-plus";case"armed_night":return"hass:bell-sleep";case"disarmed":return"hass:bell-outline";case"triggered":return"hass:bell-ring";default:return"hass:bell"}case"binary_sensor":return t&&"off"===t?"hass:radiobox-blank":"hass:checkbox-marked-circle";case"cover":return"closed"===t?"hass:window-closed":"hass:window-open";case"lock":return t&&"unlocked"===t?"hass:lock-open":"hass:lock";case"media_player":return t&&"off"!==t&&"idle"!==t?"hass:cast-connected":"hass:cast";case"zwave":switch(t){case"dead":return"hass:emoticon-dead";case"sleeping":return"hass:sleep";case"initializing":return"hass:timer-sand";default:return"hass:z-wave"}default:return console.warn("Unable to find icon for domain "+e+" ("+t+")"),Ce}}var De=function(e,t,a){void 0===a&&(a=!1),a?history.replaceState(null,"",t):history.pushState(null,"",t),Me(window,"location-changed",{replace:a})},Ne={humidity:"hass:water-percent",illuminance:"hass:brightness-5",temperature:"hass:thermometer",pressure:"hass:gauge",power:"hass:flash",signal_strength:"hass:wifi"},Pe={binary_sensor:function(e){var t=e.state&&"off"===e.state;switch(e.attributes.device_class){case"battery":return t?"hass:battery":"hass:battery-outline";case"cold":return t?"hass:thermometer":"hass:snowflake";case"connectivity":return t?"hass:server-network-off":"hass:server-network";case"door":return t?"hass:door-closed":"hass:door-open";case"garage_door":return t?"hass:garage":"hass:garage-open";case"gas":case"power":case"problem":case"safety":case"smoke":return t?"hass:shield-check":"hass:alert";case"heat":return t?"hass:thermometer":"hass:fire";case"light":return t?"hass:brightness-5":"hass:brightness-7";case"lock":return t?"hass:lock":"hass:lock-open";case"moisture":return t?"hass:water-off":"hass:water";case"motion":return t?"hass:walk":"hass:run";case"occupancy":return t?"hass:home-outline":"hass:home";case"opening":return t?"hass:square":"hass:square-outline";case"plug":return t?"hass:power-plug-off":"hass:power-plug";case"presence":return t?"hass:home-outline":"hass:home";case"sound":return t?"hass:music-note-off":"hass:music-note";case"vibration":return t?"hass:crop-portrait":"hass:vibrate";case"window":return t?"hass:window-closed":"hass:window-open";default:return t?"hass:radiobox-blank":"hass:checkbox-marked-circle"}},cover:function(e){var t="closed"!==e.state;switch(e.attributes.device_class){case"garage":return t?"hass:garage-open":"hass:garage";case"door":return t?"hass:door-open":"hass:door-closed";case"shutter":return t?"hass:window-shutter-open":"hass:window-shutter";case"blind":return t?"hass:blinds-open":"hass:blinds";case"window":return t?"hass:window-open":"hass:window-closed";default:return Ee("cover",e.state)}},sensor:function(e){var t=e.attributes.device_class;if(t&&t in Ne)return Ne[t];if("battery"===t){var a=Number(e.state);if(isNaN(a))return"hass:battery-unknown";var s=10*Math.round(a/10);return s>=100?"hass:battery":s<=0?"hass:battery-alert":"hass:battery-"+s}var i=e.attributes.unit_of_measurement;return"°C"===i||"°F"===i?"hass:thermometer":Ee("sensor")},input_datetime:function(e){return e.attributes.has_date?e.attributes.has_time?Ee("input_datetime"):"hass:calendar":"hass:clock"}};const qe=async()=>{if(customElements.get("ha-checkbox")&&customElements.get("ha-slider"))return;await customElements.whenDefined("partial-panel-resolver");const e=document.createElement("partial-panel-resolver");e.hass={panels:[{url_path:"tmp",component_name:"config"}]},e._updateRoutes(),await e.routerOptions.routes.tmp.load(),await customElements.whenDefined("ha-panel-config");const t=document.createElement("ha-panel-config");await t.routerOptions.routes.automation.load(),e.hass={panels:[{url_path:"tmp",component_name:"developer-tools"}]},e._updateRoutes(),await e.routerOptions.routes.tmp.load(),await customElements.whenDefined("ha-app-layout")},ze=ie`
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

  a, a:visited { 
    color: var(--primary-color);
  }
  mwc-button ha-icon {
    padding-right: 11px;
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

  ha-card settings-row:first-child, ha-card settings-row:first-of-type {
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
`;var Re={modes_long:{armed_away:"Armed Away",armed_home:"Armed Home",armed_night:"Armed Night",armed_custom_bypass:"Armed Custom"},modes_short:{armed_away:"Away",armed_home:"Home",armed_night:"Night",armed_custom_bypass:"Custom"}},Ve={time_slider:{seconds:"sec",minutes:"min",infinite:"infinite",none:"none"},editor:{ui_mode:"Switch to UI",yaml_mode:"Switch to YAML"}},Le={general:{cards:{general:{title:"General settings",description:"This panel defines some global settings for the alarm.",fields:{disarm_after_trigger:{heading:"Disarm after trigger",description:"After trigger time has expired, disarm the alarm instead of returning to armed state."},enable_mqtt:{heading:"Enable MQTT",description:"Allow the alarm panel to be controlled through MQTT."},enable_master:{heading:"Enable alarm master",description:"Creates an entity for controlling all areas simultaneously."}},actions:{setup_mqtt:"MQTT Configuration",setup_master:"Master Configuration"}},modes:{title:"Modes",description:"This panel can be used to set up the arm modes of the alarm.",fields:{mode:{armed_away:"Armed away will be used when all people left the house. All doors and windows allowing access to the house will be guarded, as well as motion sensors inside the house.",armed_home:"Armed home (also known as armed stay) will be used when setting the alarm while people are in the house. All doors and windows allowing access to the house will be guarded, but not motion sensors inside the house.",armed_night:"Armed night will be used when setting the alarm before going to sleep. All doors and windows allowing access to the house will be guarded, and selected motion sensors (downstairs) in the house.",armed_custom_bypass:"An extra mode for defining your own security perimeter.",enabled:"Enabled",disabled:"Disabled"},exit_delay:{heading:"Exit delay",description:"When arming the alarm, within this time period the sensors will not trigger the alarm yet."},entry_delay:{heading:"Entry delay",description:"Delay time until the alarm is triggered after one of the sensors is activated."},trigger_time:{heading:"Trigger time",description:"Time during which the siren will sound"}}},mqtt:{title:"MQTT configuration",description:"This panel can be used for configuration of the MQTT interface.",fields:{state_topic:{heading:"State topic",description:"Topic on which state updates are published"},command_topic:{heading:"Command topic",description:"Topic on which arm/disarm commands are sent."},require_code:{heading:"Require code",description:"Require the code to be sent with the command."},state_payload:{heading:"Configure payload per state",item:"Define a payload for state '{state}'"},command_payload:{heading:"Configure payload per command",item:"Define a payload for command '{command}'"}}},areas:{title:"Areas",description:"Areas can be used for dividing your alarm system into multiple compartments.",no_items:"There are no areas defined yet.",table:{remarks:"Remarks",summary:"This area contains {summary_sensors} and {summary_automations}.",summary_sensors:"{number} sensors",summary_automations:"{number} automations"},actions:{add:"Add"}}},dialogs:{create_area:{title:"New area",fields:{copy_from:"Copy settings from"}},edit_area:{title:"Editing area '{area}'",name_warning:"Note: changing the name will change the entity ID"},remove_area:{title:"Remove area?",description:"Are you sure you want to remove this area? This area contains {sensors} sensors and {automations} automations, which will be removed as well."},edit_master:{title:"Master configuration"},disable_master:{title:"Disable master?",description:"Are you sure you want to remove the alarm master? This area contains {automations} automations, which will be removed with this action."}}},sensors:{cards:{sensors:{title:"Sensors",description:"Currently configured sensors. Click on an entity to make changes.",no_items:"There are no sensors to be displayed here.",table:{arm_modes:"Arm Modes",always_on:"(Always)"},filter:{label:"Filter by area",no_area:"(No area)"}},add_sensors:{title:"Add Sensors",description:"Add more sensors. Make sure that your sensors have a friendly_name, so you can identify them.",no_items:"There are no available HA entities that can be configured for the alarm. Make sure to include entities of the type binary_sensor.",actions:{add_to_alarm:"add to alarm",show_all:"Show all"}},editor:{title:"Edit Sensor",description:"Configuring the sensor settings of '{entity}'.",fields:{name:{heading:"Name",description:"Overwrite friendly name."},area:{heading:"Area",description:"Select an area which contains this sensor."},device_type:{heading:"Device Type",description:"Choose a device type to automatically apply appropriate settings.",choose:{door:{name:"Door",description:"A door, gate or other entrance that is used for entering/leaving the home."},window:{name:"Window",description:"A window, or a door not used for entering the house such as balcony."},motion:{name:"Motion",description:"Presence sensor or similar device having a delay between activations."},tamper:{name:"Tamper",description:"Detector of sensor cover removal, glass break sensor, etc."},environmental:{name:"Environmental",description:"Smoke/gas sensor, leak detector, etc. (not related to burglar protection)."},other:{name:"Generic"}}},always_on:{heading:"Always on",description:"Sensor should always trigger the alarm."},modes:{heading:"Enabled modes",description:"Alarm modes in which this sensor is active."},arm_on_close:{heading:"Arm after closing",description:"After deactivation of this sensor, the remaining exit delay will automatically be skipped."},immediate:{heading:"Immediate",description:"Activating this sensor will trigger the alarm directly instead of after entry delay."},allow_open:{heading:"Allow open while arming",description:"Allow this sensor to be active shortly after leaving such that it will not block arming."},trigger_unavailable:{heading:"Trigger when unavailable",description:"When the sensor state becomes 'unavailable', this will activate the sensor."}},actions:{toggle_advanced:"Advanced settings",remove:"Remove"},errors:{description:"Please correct the following errors:",no_area:"No area is selected",no_modes:"No modes are selected for which the sensor should be active"}}}},codes:{cards:{codes:{title:"Codes",description:"Change settings for the code.",fields:{code_arm_required:{heading:"Use arm code",description:"Require a code for arming the alarm"},code_disarm_required:{heading:"Use disarm code",description:"Require a code for disarming the alarm"},code_format:{heading:"Code format",description:"Sets the input type for Lovelace alarm card.",code_format_number:"pincode",code_format_text:"password"}}},user_management:{title:"User management",description:"Each user has its own code to arm/disarm the alarm.",no_items:"There are no users yet",table:{remarks:"Remarks",administrator:"Administrator"},actions:{new_user:"new user"}},new_user:{title:"Create new user",description:"Users can be created for providing access to operating the alarm.",fields:{name:{heading:"Name",description:"Name of the user."},code:{heading:"Code",description:"Code for this user."},confirm_code:{heading:"Confirm code",description:"Repeat the code."},is_admin:{heading:"User is administrator",description:"Allow user to make changes"},can_arm:{heading:"Allow code for arming",description:"Entering this code activates the alarm"},can_disarm:{heading:"Allow code for disarming",description:"Entering this code deactivates the alarm"},is_override_code:{heading:"Is override code",description:"Entering this code will arm the alarm in force"}},errors:{no_name:"No name provided.",no_code:"Code should have 4 characters/numbers minimum.",code_mismatch:"The codes don't match."}},edit_user:{title:"Edit User",description:"Change configuration for user '{name}'.",fields:{old_code:{heading:"Current code",description:"Current code, leave empty to leave unchanged."}}}}},actions:{cards:{notifications:{title:"Notifications",description:"Using this panel, you can manage notifications to be sent when during a certain alarm event.",table:{enabled:"Enabled",no_items:"There are no notifications created yet."},actions:{new_notification:"new notification"},filter:{label:"Filter by area",no_area:"Alarm master"}},actions:{title:"Actions",description:"This panel can be used to switch a device when the alarm state changes.",table:{no_items:"There are no actions created yet."},actions:{new_action:"new action"}},new_notification:{title:"Create notification",description:"Create a new notification.",fields:{name:{heading:"Name",description:"Description for this notification"},event:{heading:"Event",description:"When should the notification be sent"},mode:{heading:"Mode",description:"Limit the action to specific arm modes (optional)"},title:{heading:"Title",description:"Title for the notification message"},message:{heading:"Message",description:"Content of the notification message"},target:{heading:"Target",description:"Device to send the push message to"}}},new_action:{title:"Create action",description:"This panel can be used to switch a device when the alarm state changes.",fields:{name:{heading:"Name",description:"Description for this action"},event:{heading:"Event",description:"When should the action be executed"},area:{heading:"Area",description:"Area for which the event applies, leave empty to select the global alarm."},mode:{heading:"Mode",description:"Limit the action to specific arm modes (optional)"},entity:{heading:"Entity",description:"Entity to perform action on"},action:{heading:"Action",description:"Action to perform on the entity",turn_on:"Turn on",turn_off:"Turn off"}}}},validation_errors:{no_triggers:"No state or event provided for the triggering of this automation.",empty_trigger:"One of the triggers has no state or event provided.",invalid_trigger:"One of the triggers has an invalid value: {trigger}",invalid_mode:"Invalid input provided for 'mode': {mode}",no_actions:"No actions are provided to be performed by this automation.",no_service:"One of the actions is missing a service.",invalid_service:"An invalid service name was provided for one of the actions: {service}",no_service_data:"No service data was provided for one of the actions.",no_entity_in_service_data:"No entity_id was provided in the service_data of one of the actions.",no_message_in_service_data:"No message was provided in the service_data of one of the actions."}}},Ue={common:Re,components:Ve,panels:Le},Fe={modes_long:{armed_away:"Valvestatud eemal",armed_home:"Valvestatud kodus",armed_night:"Valvestatud ööseks",armed_custom_bypass:"Valikuline valvestus"},modes_short:{armed_away:"Eemal",armed_home:"Kodus",armed_night:"Ööseks",armed_custom_bypass:"Valikuline"}},Ie={time_slider:{seconds:"sek",minutes:"min",infinite:"piiranguta",none:"puudub"},editor:{ui_mode:"Kasutajaliides",yaml_mode:"Koodiredaktor"}},He={general:{cards:{general:{title:"Üldsätted",description:"Need seaded kehtivad kõikides valve olekutes.",fields:{trigger_time:{heading:"Häire kestus",description:"Sireeni jne. aktiveerimise kestus."},disarm_after_trigger:{heading:"Häire summutamine",description:"Peale häire lõppu võta valvest maha miite ära valvesta uuesti."},enable_mqtt:{heading:"Luba MQTT juhtimine",description:"Luba nupustiku juhtimist MQTT abil."}},actions:{setup_mqtt:"MQTT seadistamine"}},common:{fields:{leave_time:{heading:"Ooteaeg valvestamisel",description:"Viivitus enne valvestamise rakendumist."},entry_time:{heading:"Sisenemise viivitus",description:"Viivitus sisenemisel enne häire rakendumist."}}},armed_away:{description:"Täielik valvestamine kui kedagi pole kodus. Kasutusel on kõik andurid."},armed_home:{description:"Valvestatud kodus ei kasuta liikumisandureid kuid väisuksed ja aknad on valve all."},armed_night:{description:"Valvestatud ööseks ei kasuta määratud liikumisandureid, välisperimeeter on valve all."},armed_custom:{description:"Valikulise valvestuse puhul saab määrata kasutatavad andurid."},mqtt:{title:"MQTT sätted",description:"MQTT parameetrite seadistamine.",fields:{state_topic:{heading:"Oleku teema (topic)",description:"Teema milles avaldatakse oleku muutused."},command_topic:{heading:"Käskude teema (topic)",description:"Teema milles avaldatakse valvestamise käsud."},require_code:{heading:"Nõua PIN koodi",description:"Käskude edastamiseks on vajalik PIN kood."},state_payload:{heading:"Määra olekute toimeandmed",item:"Määra oleku '{state}' toimeandmed"},command_payload:{heading:"Määra käskude toimeandmed",item:"Määra käsu '{command}' toimeandmed"}}}}},sensors:{cards:{sensors:{title:"Andurid",description:"Kasutusel olevad andurid. Klõpsa olemil, et seadistada.",no_items:"Andureid pole lisatud. Alustuseks lisa mõni andur.",table:{arm_modes:"Valvestamise olek",always_on:"(alati)"}},add_sensors:{title:"Andurite lisamine",description:"Lisa veel andureid. Mõistlik on panna neile arusaadav nimi (friendly_name).",no_items:"Puuduvad valvestamiseks sobivad Home Assistanti olemid. Lisatavad olemid peavad olema olekuandurid (binary_sensor).",actions:{add_to_alarm:"Lisa valvesüsteemile",show_all:"Kuva kõik andurid"}},editor:{title:"Andurite sätted",description:"Muuda olemi '{entity}' sätteid.",fields:{name:{heading:"Nimi",description:"Muuda kuvatavat nime."},always_on:{heading:"Alati kasutusel",description:"Andur käivitab häire igas valve olekus."},modes:{heading:"Valve olekute valik",description:"Valve olekud kus seda andurit kasutatakse."},immediate:{heading:"Viivituseta",description:"Andur annab häire ilma viiteta."},allow_open:{heading:"Lahkumisviivitus",description:"See andur ei aktiveeru enne lahkumisviivituse lõppu."},trigger_unavailable:{heading:"Andurite saadavus",description:"Käivita häire kui andur muutub kättesaamatuks."}}}}},codes:{cards:{codes:{title:"Koodid",description:"Valvestuskoodide muutmine.",fields:{code_arm_required:{heading:"Valvestamine koodiga",description:"Valvestamiseks tuleb sisestada kood"},code_disarm_required:{heading:"Valvest vabastamise kood",description:"Valvest vabastamiseks tulem sisestada kood"},code_format:{heading:"Koodi vorming",description:"Kasutajaliidese koodi tüübid.",code_format_number:"PIN kood",code_format_text:"Salasõna"}}},user_management:{title:"Kasutajate haldus",description:"Igal kasutajal on oma juhtkood.",no_items:"Kasutajaid pole määratud",table:{remarks:"Märkused",administrator:"Haldaja"},actions:{new_user:"Uus kasutaja"}},new_user:{title:"Lisa uus kasutaja",description:"Valvesüsteemi kasutaja lisamine.",fields:{name:{heading:"Nimi",description:"Kasutaja nimi."},code:{heading:"Valvestuskood",description:"Selle kasutaja kood."},confirm_code:{heading:"Koodi kinnitamine",description:"Sisesta sama kood uuesti."},is_admin:{heading:"Kasutajal on haldusõigused",description:"Kasutaja saab teha muudatusi."},can_arm:{heading:"Tohib valvestada",description:"Koodi sisestamine valvestab."},can_disarm:{heading:"Tohib valvest maha võtta",description:"Koodi sisestamine võtab valvest maha."},is_override_code:{heading:"Alistuskood",description:"Koodi sisestamine käivitab kohese häire"}},errors:{no_name:"Nimi puudub.",no_code:"Kood peab olema vhemalt 4 tärki.",code_mismatch:"Sisestatud koodid ei klapi."}},edit_user:{title:"Muuda kasutaja sätteid",description:"Muuda kasutaja '{name}' sätteid.",fields:{old_code:{heading:"Kehtiv kood",description:"Kehtiv kood, jäta tühjaks kui ei taha muuta."}}}}},actions:{cards:{notifications:{title:"Teavitused",description:"Halda saadetavaid teavitusi",table:{enabled:"Lubatud",no_items:"Teavitusi pole veel loodud."},actions:{new_notification:"Uus teavitus"}},actions:{title:"Toimingud",description:"Arenduses, mõeldud seadmete lülitamiseks.",table:{no_items:"Toiminguid pole veel määratud."},actions:{new_action:"Uus toiming"}},new_notification:{title:"Loo teavitus",description:"Uue teavituse loomine.",fields:{name:{heading:"Nimi",description:"Teavituse kirjeldus"},event:{heading:"Sündmus",description:"Mille puhul teavitada"},mode:{heading:"Olek",description:"Millises valve olekus teavitada (valikuline)"},title:{heading:"Päis",description:"Teavitussõnumi päis"},message:{heading:"Sisu",description:"Teavitussõnumi tekst"},target:{heading:"Saaja",description:"Seade millele edastada teavitus"}}},new_action:{title:"Loo toiming",description:"Seadme oleku muutmine valve oleku muutmisel.",fields:{name:{heading:"Nimi",description:"Toimingu kirjeldus"},event:{heading:"Sündmus",description:"Millisel juhul käivitada toiming"},mode:{heading:"Olek",description:"Millises valve olekus toiming käivitada (valikuline)"},entity:{heading:"Olem",description:"Toimingu olem"},action:{heading:"Toiming",description:"Olemi toiming",turn_on:"Lülita sisse",turn_off:"Lülita välja"}}}},validation_errors:{no_triggers:"Selle tegevuse käivitamiseks puudub vajalik olek või sündmus.",empty_trigger:"Ühel päästikul puudub oleku või sündmuse tingimus.",invalid_trigger:"Ühel päästikul: {trigger} on vigane väärtus",invalid_mode:"Valve olekule: {mode} on sisestatud vigane väärtus",no_actions:"Sellele toimingule pole määratud tegevust.",no_service:"Ühel toimingutest puudub nõutav teenus.",invalid_service:"Ühele toimingule on omistatud sobimatu teenus: {service}",no_service_data:"Ühel toimingul puuduvad teenuse andmed.",no_entity_in_service_data:"Ühel toimingul puudub teenuse andmetes olemi ID.",no_message_in_service_data:"Ühe toimingu teenuse andmetes puuduvad teenuse andmed."}}},Ye={common:Fe,components:Ie,panels:He},Be={modes_long:{armed_away:"Ingeschakeld Weg",armed_home:"Ingeschakeld Thuis",armed_night:"Ingeschakeld Nacht",armed_custom_bypass:"Ingeschakeld Aangepast"},modes_short:{armed_away:"Weg",armed_home:"Thuis",armed_night:"Nacht",armed_custom_bypass:"Aangepast"}},We={time_slider:{seconds:"sec",minutes:"min",infinite:"oneindig",none:"geen"},editor:{ui_mode:"Wissel naar UI",yaml_mode:"Wissel naar YAML"}},Ke={general:{cards:{general:{title:"Algemene instellingen",description:"Dit paneel definieert enkele instellingen die van toepassing zijn op alle inschakelmodi.",fields:{trigger_time:{heading:"Activeer tijd",description:"Tijd waarin de sirene af gaat."},disarm_after_trigger:{heading:"Uitschakelen na activatie",description:"Nadat de triggertijd is verstreken, schakelt u het alarm uit in plaats van terug te keren naar de ingeschakelde toestand."},enable_mqtt:{heading:"MQTT inschakelen",description:"Allow the alarm panel to be controlled through MQTT."}},actions:{setup_mqtt:"MQTT Configuratie"}},common:{fields:{leave_time:{heading:"Vertrek vertraging",description:"Bij het inschakelen van het alarm zullen de sensoren binnen deze tijdsperiode het alarm nog niet activeren."},entry_time:{heading:"Binnenkomst vertraging",description:"Vertragingstijd totdat het alarm afgaat nadat een van de sensoren is geactiveerd."}}},armed_away:{description:"Ingeschakeld weg wordt gebruikt als alle mensen het huis hebben verlaten. Alle deuren en ramen die toegang geven tot het huis worden bewaakt, evenals bewegingssensoren in het huis."},armed_home:{description:"Ingeschakeld thuis (ook wel ingeschakeld thuisblijven genoemd) wordt gebruikt bij het instellen van het alarm terwijl er mensen in huis zijn. Alle deuren en ramen die toegang geven tot het huis worden bewaakt, maar bewegingssensoren in het huis worden niet gebruikt."},armed_night:{description:"Ingeschakeld nacht wordt gebruikt bij het instellen van het alarm voordat u gaat slapen. Alle deuren en ramen die toegang geven tot het huis worden bewaakt, en geselecteerde bewegingssensoren (beneden) in het huis."},armed_custom:{description:"Een extra modus om uw eigen beveiligingsperimeter te definiëren."},mqtt:{title:"MQTT configuratie",description:"Dit paneel kan worden gebruikt voor configuratie van de MQTT-interface.",fields:{state_topic:{heading:"Toestand topic",description:"Topic waarop statusupdates worden gepubliceerd"},command_topic:{heading:"Commando topic",description:"Topic waarop commando's voor in- / uitschakelen worden verzonden."},require_code:{heading:"Vereis code",description:"Vereis dat de code wordt verzonden met de opdracht."},state_payload:{heading:"Configureer de payload per toestand",item:"Definieer een payload voor toestand '{state}'"},command_payload:{heading:"Configureer een payload per commando",item:"Definieer een payload voor commando '{command}'"}}}}},sensors:{cards:{sensors:{title:"Sensoren",description:"Momenteel geconfigureerde sensoren. Klik op een entiteit om wijzigingen aan te brengen.",no_items:"Er zijn nog geen sensoren aan het alarm toegevoegd. Zorg ervoor dat u ze eerst toevoegt.",table:{arm_modes:"Inschakelmodi",always_on:"(Altijd)"}},add_sensors:{title:"Voeg sensoren toe",description:"Voeg meer sensoren toe. Zorg ervoor dat uw sensoren een friendly_name hebben, zodat u ze kunt identificeren.",no_items:"Er zijn geen beschikbare HA-entiteiten die voor het alarm kunnen worden geconfigureerd. Zorg ervoor dat u entiteiten van het type binary_sensor opneemt.",actions:{add_to_alarm:"Voeg aan alarm toe",show_all:"Toon alle"}},editor:{title:"Wijzig Sensor",description:"Configureren van de sensorinstellingen van '{entity}'.",fields:{name:{heading:"Naam",description:"Overschrijf vriendelijke naam."},device_type:{heading:"Apparaat Type",description:"Kies een apparaattype om automatisch de juiste instellingen toe te passen.",choose:{door:{name:"Deur",description:"Een deur, poort of andere ingang die wordt gebruikt voor het betreden/verlaten van de woning."},window:{name:"Raam",description:"Een raam of een deur die niet wordt gebruikt om het huis binnen te komen, zoals een balkon."},motion:{name:"Beweging",description:"Aanwezigheidssensor of soortgelijk apparaat met een vertraging tussen activeringen."},tamper:{name:"Sabotage",description:"Detector van verwijdering van sensorkap, glasbreuksensor, enz."},environmental:{name:"Omgeving",description:"Rook/gassensor, lekdetector, etc. (niet gerelateerd aan inbraakbeveiliging)."}}},always_on:{heading:"Altijd aan",description:"Sensor should always trigger the alarm."},modes:{heading:"Ingeschakelde modi",description:"Alarmmodi waarin deze sensor actief is."},arm_on_close:{heading:"Inschakelen na sluiten",description:"Na deactivering van deze sensor wordt de resterende vertrek vertraging automatisch overgeslagen."},immediate:{heading:"Onmiddelijk",description:"Als deze sensor wordt geactiveerd, wordt het alarm direct geactiveerd in plaats van na de binnenkomst vertraging."},allow_open:{heading:"Sta open toe tijdens het inschakelen",description:"Sta toe dat deze sensor kort na het verlaten actief is, zodat hij het inschakelen niet blokkeert."},trigger_unavailable:{heading:"Activeren indien niet beschikbaar",description:"Wanneer de sensorstatus 'niet beschikbaar' wordt, wordt de sensor geactiveerd."}},actions:{toggle_advanced:"Geavanceerde instellingen"}}}},codes:{cards:{codes:{title:"Codes",description:"Wijzig de instellingen voor de code.",fields:{code_arm_required:{heading:"Gebruik inschakel code",description:"Vereist een code voor het inschakelen van het alarm"},code_disarm_required:{heading:"Gebruik uitschakelcode",description:"Vereist een code om het alarm uit te schakelen"},code_format:{heading:"Code opmaak",description:"Stelt het invoertype in voor de Lovelace alarmkaart.",code_format_number:"pincode",code_format_text:"wachtwoord"}}},user_management:{title:"Gebruikersbeheer",description:"Elke gebruiker heeft zijn eigen code om het alarm in/uit te schakelen.",no_items:"Er zijn nog geen gebruikers",table:{remarks:"Opmerkingen",administrator:"Beheerder"},actions:{new_user:"nieuwe gebruiker"}},new_user:{title:"Maak een nieuwe gebruiker aan",description:"Gebruikers kunnen worden aangemaakt om toegang te verlenen tot het bedienen van het alarm.",fields:{name:{heading:"Naam",description:"Naam van de gebruiker."},code:{heading:"Code",description:"Code voor deze gebruiker."},confirm_code:{heading:"Bevestig de code",description:"Herhaal de code."},is_admin:{heading:"Gebruiker is beheerder",description:"Sta de gebruiker toe om wijzigingen aan te brengen"},can_arm:{heading:"Code toestaan voor inschakeling",description:"Door deze code in te voeren, wordt het alarm geactiveerd"},can_disarm:{heading:"Code toestaan voor uitschakelen",description:"Door deze code in te voeren, wordt het alarm gedeactiveerd"},is_override_code:{heading:"Is een forceer code",description:"Als u deze code invoert, wordt het alarm geforceerd geactiveerd"}},errors:{no_name:"Geen naam opgegeven.",no_code:"Code moet minimaal 4 tekens/cijfers bevatten.",code_mismatch:"De codes komen niet overeen."}},edit_user:{title:"Wijzig Gebruiker",description:"Wijzig de configuratie voor gebruiker '{name}'.",fields:{old_code:{heading:"Huidige code",description:"Huidige code, laat leeg om ongewijzigd te laten."}}}}},actions:{cards:{notifications:{title:"Meldingen",description:"Met dit paneel kunt u meldingen beheren die moeten worden verzonden tijdens een bepaalde alarmgebeurtenis",table:{enabled:"Ingeschakeld",no_items:"Er zijn nog geen notificaties aangemaakt."},actions:{new_notification:"nieuwe melding"}},actions:{title:"Acties",description:"Dit paneel is nog in ontwikkeling. Het wordt gebruikt apparaten te in/uit te schakelen.",table:{no_items:"Er zijn nog geen acties gemaakt."},actions:{new_action:"nieuwe actie"}},new_notification:{title:"Maak een melding",description:"Maak een nieuwe melding.",fields:{name:{heading:"Naam",description:"Beschrijving voor deze melding"},event:{heading:"Gebeurtenis",description:"Wanneer moet de melding worden verzonden"},mode:{heading:"Mode",description:"Beperk de actie tot specifieke inschakel modi (optioneel)"},title:{heading:"Titel",description:"Titel voor het meldingsbericht"},message:{heading:"Bericht",description:"Inhoud van het meldingsbericht"},target:{heading:"Doel",description:"Apparaat om het push-bericht naar te sturen"}}},new_action:{title:"Maak een actie",description:"Dit paneel kan worden gebruikt om een apparaat te schakelen wanneer de alarmstatus verandert.",fields:{name:{heading:"Naam",description:"Beschrijving voor deze actie"},event:{heading:"Gebeurtenis",description:"Wanneer moet de actie worden uitgevoerd"},mode:{heading:"Mode",description:"Beperk de actie tot specifieke inschakel modi (optioneel)"},entity:{heading:"Entiteit",description:"Entiteit om actie op uit te voeren"},action:{heading:"Actie",description:"Actie die op de entiteit moet worden uitgevoerd",turn_on:"Zet aan",turn_off:"Zet uit"}}}},validation_errors:{no_triggers:"Er is geen toestand of gebeurtenis voorzien voor het activeren van deze automatisering.",empty_trigger:"Voor een van de triggers is geen status of gebeurtenis opgegeven.",invalid_trigger:"Een van de triggers heeft een ongeldige waarde: {trigger}",invalid_mode:"Ongeldige invoer opgegeven voor 'mode': {mode}",no_actions:"Er zijn geen acties ingesteld uit te voeren door deze automatisering.",no_service:"Een van de acties mist een service.",invalid_service:"Er is een ongeldige servicenaam opgegeven voor een van de acties: {service}",no_service_data:"Voor een van de acties zijn geen servicegegevens opgegeven.",no_entity_in_service_data:"Er is geen entity_id opgegeven in de service_data van een van de acties.",no_message_in_service_data:"Er is geen bericht opgegeven in de service_data van een van de acties."}}},Ge={common:Be,components:We,panels:Ke},Je={en:Object.freeze({__proto__:null,common:Re,components:Ve,panels:Le,default:Ue}),et:Object.freeze({__proto__:null,common:Fe,components:Ie,panels:He,default:Ye}),nl:Object.freeze({__proto__:null,common:Be,components:We,panels:Ke,default:Ge})};function Qe(e,t,a="",s=""){const i=t.replace(/['"]+/g,"").replace("-","_");var n;try{n=e.split(".").reduce((e,t)=>e[t],Je[i])}catch(t){n=e.split(".").reduce((e,t)=>e[t],Je.en)}if(void 0===n&&(n=e.split(".").reduce((e,t)=>e[t],Je.en)),""!==a&&""!==s){Array.isArray(a)||(a=[a]),Array.isArray(s)||(s=[s]);for(let e=0;e<a.length;e++)n=n.replace(a[e],s[e])}return n}let Ze=class extends re{constructor(){super(...arguments),this.min=0,this.max=100,this.step=10,this.value=0,this.scaleFactor=1,this.unit="",this.disabled=!1}firstUpdated(){this.value>0&&this.value<60&&(this.unit="sec"),"min"==this.unit&&(this.scaleFactor=1/60),"min"==this.unit&&(this.step=1)}render(){return R`
      <div class="container">
        <div class="prefix">
          <slot name="prefix"></slot>
        </div>
        <div class="slider">
          ${this.getSlider()}
        </div>
        <div
          class="value${this.disabled?" disabled":""}"
          @click=${this.toggleUnit}
        >
          ${this.getValue()}
        </div>
      </div>
    `}getValue(){let e=Number(Math.round(this.value*this.scaleFactor));return!e&&this.zeroValue?this.zeroValue:`${e} ${this.getUnit()}`}getUnit(){switch(this.unit){case"sec":return Qe("components.time_slider.seconds",this.hass.language);case"min":return Qe("components.time_slider.minutes",this.hass.language);default:return""}}getSlider(){return R`
      <ha-slider
        pin
        min=${Math.round(this.min*this.scaleFactor)}
        max=${Math.round(this.max*this.scaleFactor)}
        step=${this.step}
        value=${Math.round(this.value*this.scaleFactor)}
        ?disabled=${this.disabled}
        @change=${this.updateValue}
      ></ha-slider>
    `}updateValue(e){const t=Number(e.target.value);this.value=Math.round(t/this.scaleFactor)}toggleUnit(){this.unit="min"==this.unit?"sec":"min",this.scaleFactor="min"==this.unit?1/60:1,this.step="min"==this.unit?1:10}};Ze.styles=ie`
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
  `,t([Q({type:Number})],Ze.prototype,"min",void 0),t([Q({type:Number})],Ze.prototype,"max",void 0),t([Q({type:Number})],Ze.prototype,"step",void 0),t([Q({type:Number})],Ze.prototype,"value",void 0),t([Q()],Ze.prototype,"scaleFactor",void 0),t([Q({type:String})],Ze.prototype,"unit",void 0),t([Q({type:Boolean})],Ze.prototype,"disabled",void 0),t([Q({type:String})],Ze.prototype,"zeroValue",void 0),Ze=t([G("time-slider")],Ze);let Xe=class extends re{constructor(){super(...arguments),this.label="",this.items=[],this.clearable=!1,this.icons=!1,this.rowRenderer=(e,t,a)=>{!e.firstElementChild&&this.icons?e.innerHTML='\n        <style>\n          paper-icon-item {\n              margin: -10px;\n              padding: 0;\n          }\n          ha-icon {\n              display: flex;\n              flex: 0 0 40px;\n              color: var(--state-icon-color);\n          }\n        </style>\n        <paper-icon-item>\n          <ha-icon icon="" slot="item-icon"></ha-icon>\n          <paper-item-body two-line>\n            <div class="name"></div>\n            <div secondary></div>\n          </paper-item-body>\n        </paper-icon-item>\n        ':e.firstElementChild||(e.innerHTML='\n        <style>\n          paper-item {\n              margin: -10px;\n              padding: 0;\n          }\n        </style>\n        <paper-item>\n          <paper-item-body two-line>\n            <div class="name"></div>\n            <div secondary></div>\n          </paper-item-body>\n        </paper-item>\n        '),e.querySelector(".name").textContent=a.item.name,e.querySelector("[secondary]").textContent=a.item.description,this.icons&&(e.querySelector("ha-icon").icon=a.item.icon)}}open(){this.updateComplete.then(()=>{var e,t;null===(t=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector("vaadin-combo-box-light"))||void 0===t||t.open()})}focus(){this.updateComplete.then(()=>{var e;(null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector("paper-input")).focus()})}firstUpdated(){this._comboBox.items=this.items}render(){return R`
      <vaadin-combo-box-light
        item-value-path="value"
        item-id-path="value"
        item-label-path="name"
        .value=${this._value}
        .renderer=${this.rowRenderer}
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
        >
          ${this._value&&this.items.find(e=>e.value==this._value)?R`
                ${this.icons?R`
                <ha-icon 
                  slot="prefix"
                  icon="${this.items.find(e=>e.value==this._value).icon}"
                >
                </ha-icon>
                `:""}
                ${this.clearable?R`
                <ha-icon-button
                  slot="suffix"
                  class="clear-button"
                  @click=${this._clearValue}
                  icon="hass:close"
                >
                </ha-icon-button>
                `:""}
              `:""}
          <ha-icon-button
            slot="suffix"
            class="toggle-button"
            icon="${this._opened?"hass:menu-up":"hass:menu-down"}"
          >
          </ha-icon-button>
        </paper-input>
      </vaadin-combo-box-light>
    `}_clearValue(e){e.stopPropagation(),this._setValue("")}get _value(){return this.value||""}_openedChanged(e){this._opened=e.detail.value}_valueChanged(e){const t=e.detail.value;t!==this._value&&this._setValue(t)}_setValue(e){this.value=e,setTimeout(()=>{Me(this,"value-changed",{value:e})},0)}static get styles(){return ie`
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
    `}};var et,tt,at,st,it;t([Q({attribute:!1})],Xe.prototype,"hass",void 0),t([Q()],Xe.prototype,"label",void 0),t([Q()],Xe.prototype,"value",void 0),t([Q()],Xe.prototype,"items",void 0),t([Q()],Xe.prototype,"clearable",void 0),t([Q()],Xe.prototype,"icons",void 0),t([Z()],Xe.prototype,"_opened",void 0),t([(et="vaadin-combo-box-light",tt=!0,(e,t)=>{const a={get(){return this.renderRoot.querySelector(et)},enumerable:!0,configurable:!0};if(tt){const e="symbol"==typeof t?Symbol():"__"+t;a.get=function(){return void 0===this[e]&&(this[e]=this.renderRoot.querySelector(et)),this[e]}}return void 0!==t?X(a,e,t):ee(a,e)})],Xe.prototype,"_comboBox",void 0),Xe=t([G("alarmo-select")],Xe),function(e){e.ArmedAway="armed_away",e.ArmedHome="armed_home",e.ArmedNight="armed_night",e.ArmedCustom="armed_custom_bypass"}(at||(at={})),function(e){e.Disarmed="disarmed",e.Armed="armed",e.Triggered="triggered",e.Pending="pending",e.Arming="arming"}(st||(st={})),function(e){e.ArmFailure="arm_failure"}(it||(it={}));const nt=e=>e.callWS({type:"alarmo/config"}),rt=e=>e.callWS({type:"alarmo/sensors"}),ot=e=>e.callWS({type:"alarmo/users"}),dt=e=>e.callWS({type:"alarmo/automations"}),lt=(e,t)=>e.callApi("POST","alarmo/config",t),ct=(e,t)=>e.callApi("POST","alarmo/sensors",t),ht=(e,t)=>e.callApi("POST","alarmo/users",t),pt=(e,t)=>e.callApi("POST","alarmo/automations",t),ut=(e,t)=>e.callApi("POST","alarmo/automations",{automation_id:t,remove:!0}),mt=e=>e.callWS({type:"alarmo/areas"}),gt=(e,t)=>e.callApi("POST","alarmo/area",t);var vt,_t,ft,bt,wt;function yt(e){return function(e){if(!e)return Ce;if(e.attributes.icon)return e.attributes.icon;var t=Se(e.entity_id);return t in Pe?Pe[t](e):Ee(t,e.state)}(e)}function $t(e){return(e=e.replace("_"," ")).charAt(0).toUpperCase()+e.slice(1)}function kt(e){return e?e.attributes&&e.attributes.friendly_name?e.attributes.friendly_name:String(e.entity_id.split(".").pop()):"(unrecognized entity)"}function xt(e){return e.filter((e,t,a)=>a.indexOf(e)===t)}function At(e,t){return e?Object.entries(e).filter(([e])=>t.includes(e)).reduce((e,[t,a])=>Object.assign(e,{[t]:a}),{}):{}}function Ot(e,t){return e?Object.entries(e).filter(([e])=>!t.includes(e)).reduce((e,[t,a])=>Object.assign(e,{[t]:a}),{}):{}}function St(e,t){const a=e.target;Me(a,"show-dialog",{dialogTag:"error-dialog",dialogImport:()=>Promise.resolve().then((function(){return Kt})),dialogParams:{error:t}})}function jt(e,t){St(t,R`
    <b>Something went wrong!</b><br>
    ${e.body.message}<br><br>
    ${e.error}<br><br>
    Please <a href="https://github.com/nielsfaber/alarmo/issues">report</a> the bug.
  `)}!function(e){e.ArmedAway="hass:car-traction-control",e.ArmedHome="hass:home-outline",e.ArmedNight="hass:weather-night",e.ArmedCustom="hass:star-outline"}(vt||(vt={})),function(e){e.STATE_ALARM_DISARMED="disarmed",e.STATE_ALARM_ARMED_HOME="armed_home",e.STATE_ALARM_ARMED_AWAY="armed_away",e.STATE_ALARM_ARMED_NIGHT="armed_night",e.STATE_ALARM_ARMED_CUSTOM_BYPASS="armed_custom_bypass",e.STATE_ALARM_PENDING="pending",e.STATE_ALARM_ARMING="arming",e.STATE_ALARM_DISARMING="disarming",e.STATE_ALARM_TRIGGERED="triggered"}(_t||(_t={})),function(e){e.COMMAND_ALARM_DISARM="disarm",e.COMMAND_ALARM_ARM_HOME="arm_home",e.COMMAND_ALARM_ARM_AWAY="arm_away",e.COMMAND_ALARM_ARM_NIGHT="arm_night",e.COMMAND_ALARM_ARM_CUSTOM_BYPASS="arm_custom_bypass"}(ft||(ft={})),function(e){e.Door="door",e.Window="window",e.Motion="motion",e.Tamper="tamper",e.Environmental="environmental",e.Other="other"}(bt||(bt={})),function(e){e.Door="hass:door-closed",e.Window="hass:window-closed",e.Motion="hass:motion-sensor",e.Tamper="hass:vibrate",e.Environmental="hass:fire",e.Other="hass:contactless-payment-circle-outline"}(wt||(wt={}));const Ct=(e,t)=>{if(!e)return!1;switch(e){case _t.STATE_ALARM_ARMED_AWAY:case _t.STATE_ALARM_ARMED_HOME:case _t.STATE_ALARM_ARMED_NIGHT:case _t.STATE_ALARM_ARMED_CUSTOM_BYPASS:default:return!0}};function Mt(e,t){return Object.entries(t).forEach(([t,a])=>{e=t in e&&"object"==typeof e[t]&&null!==e[t]?Object.assign(Object.assign({},e),{[t]:Mt(e[t],a)}):Object.assign(Object.assign({},e),{[t]:a})}),e}const Tt=e=>{class a extends e{connectedCallback(){super.connectedCallback(),this.__checkSubscribed()}disconnectedCallback(){if(super.disconnectedCallback(),this.__unsubs){for(;this.__unsubs.length;){const e=this.__unsubs.pop();e instanceof Promise?e.then(e=>e()):e()}this.__unsubs=void 0}}updated(e){super.updated(e),e.has("hass")&&this.__checkSubscribed()}hassSubscribe(){return[]}__checkSubscribed(){void 0===this.__unsubs&&this.isConnected&&void 0!==this.hass&&(this.__unsubs=this.hassSubscribe())}}return t([Q({attribute:!1})],a.prototype,"hass",void 0),a};let Et=class extends(Tt(re)){constructor(){super(...arguments),this.currentTab=0}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeEvents(()=>this._fetchData(),"alarmo_updated")]}async _fetchData(){this.hass&&(this.areas=await mt(this.hass))}async firstUpdated(){this.areas=await mt(this.hass),this.selectedArea=Object.keys(this.areas)[0],this.data=Object.assign({},this.areas[this.selectedArea].modes)}render(){if(!this.data)return R``;const e=Object.values(at)[this.currentTab];return R`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${Qe("panels.general.cards.modes.title",this.hass.language)}
          </div>

          ${Object.keys(this.areas).length>1?R`
              <alarmo-select
            .items=${Object.values(this.areas).map(e=>Object({value:e.area_id,name:e.name}))}
            value=${this.selectedArea}
            label=${this.hass.localize("ui.components.area-picker.area")}
            @value-changed=${e=>this.selectArea(e.target.value)}

              </alarmo-select>
              `:""}

        </div>
        <div class="card-content">
          ${Qe("panels.general.cards.modes.description",this.hass.language)}
        </div>

        <mwc-tab-bar
          .activeIndex=${this.currentTab}
          @MDCTabBar:activated=${e=>this.currentTab=Number(e.detail.index)}
        >
          ${Object.entries(at).map(([e,t])=>R`
          <mwc-tab
            label="${Qe("common.modes_short."+t,this.hass.language)}"
            hasImageIcon
            stacked
            class="${this.data[t].enabled?"":"disabled"}"
          >
            <ha-icon icon="${vt[e]}" slot="icon"></ha-icon>
          </mwc-tab>
          `)}
        </mwc-tab-bar>

        <settings-row .narrow=${this.narrow} .large=${!0}>
          <span slot="heading">${Qe("common.modes_long."+e,this.hass.language)}</span>
          <span slot="description">${Qe("panels.general.cards.modes.fields.mode."+e,this.hass.language)}</span>

          <div style="display: flex; margin: 10px 0px; justify-content: center; width: 100%">
            <mwc-button
              class="${this.data[e].enabled?"active":""}"
              @click=${()=>this.data={...this.data,[e]:{...this.data[e],enabled:!0}}}
            >
              ${Qe("panels.general.cards.modes.fields.mode.enabled",this.hass.language)}
            </mwc-button>
            <mwc-button
              class="${this.data[e].enabled?"":"active"}"
              @click=${()=>this.data={...this.data,[e]:{...this.data[e],enabled:!1}}}
            >
              ${Qe("panels.general.cards.modes.fields.mode.disabled",this.hass.language)}
            </mwc-button>
          </div>
        </settings-row>

        ${this.data[e].enabled?R`

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${Qe("panels.general.cards.modes.fields.exit_delay.heading",this.hass.language)}</span>
          <span slot="description">${Qe("panels.general.cards.modes.fields.exit_delay.description",this.hass.language)}</span>
          <time-slider
            .hass=${this.hass}
            unit="sec"
            max="180"
            zeroValue=${Qe("components.time_slider.none",this.hass.language)}
            value=${this.data[e].exit_time||0}
            @change=${t=>this.data={...this.data,[e]:{...this.data[e],exit_time:Number(t.target.value)}}}
          >
          </time-slider>
        </settings-row>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${Qe("panels.general.cards.modes.fields.entry_delay.heading",this.hass.language)}</span>
          <span slot="description">${Qe("panels.general.cards.modes.fields.entry_delay.description",this.hass.language)}</span>
          <time-slider
            .hass=${this.hass}
            unit="sec"
            max="180"
            zeroValue=${Qe("components.time_slider.none",this.hass.language)}
            value=${this.data[e].entry_time||0}
            @change=${t=>this.data={...this.data,[e]:{...this.data[e],entry_time:Number(t.target.value)}}}
          >
          </time-slider>
        </settings-row>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${Qe("panels.general.cards.modes.fields.trigger_time.heading",this.hass.language)}</span>
          <span slot="description">${Qe("panels.general.cards.modes.fields.trigger_time.description",this.hass.language)}</span>
          <time-slider
            .hass=${this.hass}
            unit="min"
            max="3600"
            zeroValue=${Qe("components.time_slider.infinite",this.hass.language)}
            value=${this.data[e].trigger_time||0}
            @change=${t=>this.data={...this.data,[e]:{...this.data[e],trigger_time:Number(t.target.value)}}}          >
          </time-slider>
        </settings-row>

        `:""}

        <div class="card-actions">
          <mwc-button @click=${this.saveClick}>
            ${this.hass.localize("ui.common.save")}
          </mwc-button>
        </div>
      </ha-card>
    `}selectArea(e){e!=this.selectedArea&&(this.selectedArea=e,this.data=Object.assign({},this.areas[e].modes))}saveClick(e){gt(this.hass,{area_id:this.selectedArea,modes:this.data}).catch(t=>jt(t,e)).then(()=>{})}};Et.styles=ze,t([Q()],Et.prototype,"hass",void 0),t([Q()],Et.prototype,"narrow",void 0),t([Q()],Et.prototype,"currentTab",void 0),t([Q()],Et.prototype,"config",void 0),t([Q()],Et.prototype,"areas",void 0),t([Q()],Et.prototype,"data",void 0),t([Q()],Et.prototype,"selectedArea",void 0),Et=t([G("alarm-mode-card")],Et);let Dt=class extends re{constructor(){super(...arguments),this.threeLine=!1}render(){return R`
      <div class="info">
        <slot name="heading"></slot>
        <div class="secondary"><slot name="description"></slot></div>
      </div>
      <slot></slot>
    `}static get styles(){return ie`
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
      ::slotted(ha-switch) {
        padding: 16px 0;
      }
      .info {
        flex: 1 0 60px;
      }
      :host([large]) .info, :host([narrow]) .info {
        flex: 1 0 40px;
      }
      .secondary {
        color: var(--secondary-text-color);
      }
    `}};t([Q({type:Boolean,reflect:!0})],Dt.prototype,"narrow",void 0),t([Q({type:Boolean,reflect:!0})],Dt.prototype,"large",void 0),t([Q({type:Boolean,attribute:"three-line"})],Dt.prototype,"threeLine",void 0),Dt=t([G("settings-row")],Dt);let Nt=class extends re{constructor(){super(...arguments),this.header="",this.open=!1}render(){return R`
      ${this.open?R`
        <div class="header open">
          <span
            @click=${()=>{this.open=!1}}
          >
            ${this.header}
          </span>
          <ha-icon-button
            icon="hass:chevron-down"
            @click=${()=>{this.open=!1}}
          >
          </ha-icon-button>
        </div>
        <slot></slot>
        <div class="header open">
          <span
            @click=${()=>{this.open=!1}}
          >
            ${this.header}
          </span>
          <ha-icon-button
            icon="hass:chevron-up"
            @click=${()=>{this.open=!1}}
          >
          </ha-icon-button>
        </div>
        `:R`
        <div class="header">
          <span
            @click=${()=>{this.open=!0}}
          >
            ${this.header}
          </span>
          <ha-icon-button
            icon="hass:chevron-right"
            @click=${()=>{this.open=!0}}
          >
          </ha-icon-button>
        </div>
      `}

    `}static get styles(){return ie`

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
    `}};t([Q({type:Boolean,reflect:!0})],Nt.prototype,"narrow",void 0),t([Q()],Nt.prototype,"header",void 0),t([Q()],Nt.prototype,"open",void 0),Nt=t([G("collapsible-section")],Nt);let Pt=class extends(Tt(re)){hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeEvents(()=>this._fetchData(),"alarmo_updated")]}async _fetchData(){if(!this.hass)return;const e=await nt(this.hass);this.config=e,this.selection=Ot(e.mqtt,["availability_topic"])}firstUpdated(){(async()=>{await qe()})()}render(){return this.hass&&this.selection?R`
      <ha-card>
        <div class="card-header">
          <div class="name">${Qe("panels.general.cards.mqtt.title",this.hass.language)}</div>
          <ha-icon-button
            icon="hass:close"
            @click=${this.cancelClick}
          >
          </ha-icon-button>
        </div>
        <div class="card-content">${Qe("panels.general.cards.mqtt.description",this.hass.language)}</div>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${Qe("panels.general.cards.mqtt.fields.state_topic.heading",this.hass.language)}</span>
          <span slot="description">${Qe("panels.general.cards.mqtt.fields.state_topic.description",this.hass.language)}</span>
          <paper-input
            label="${Qe("panels.general.cards.mqtt.fields.state_topic.heading",this.hass.language)}"
            value=${this.selection.state_topic}
            @change=${e=>{this.selection={...this.selection,state_topic:e.target.value}}}
          ></paper-input>
        </settings-row>

        <collapsible-section
           .narrow=${this.narrow}
          header=${Qe("panels.general.cards.mqtt.fields.state_payload.heading",this.hass.language)}
        >
          ${Object.values(_t).filter(e=>Ct(e,this.config)).map(e=>R`
          <settings-row .narrow=${this.narrow}>
            <span slot="heading">${$t(e)}</span>
            <span slot="description">${Qe("panels.general.cards.mqtt.fields.state_payload.item",this.hass.language,"{state}",$t(e))}</span>
            <paper-input
              label=${$t(e)}
              placeholder=${e}
              value=${this.selection.state_payload[e]||""}
              @change=${t=>{this.selection=Mt(this.selection,{state_payload:{[e]:t.target.value}})}}
            >
            </paper-input>
          </settings-row>
          `)}
        </collapsible-section>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${Qe("panels.general.cards.mqtt.fields.command_topic.heading",this.hass.language)}</span>
          <span slot="description">${Qe("panels.general.cards.mqtt.fields.command_topic.description",this.hass.language)}</span>
          <paper-input
            label="${Qe("panels.general.cards.mqtt.fields.command_topic.heading",this.hass.language)}"
            value=${this.selection.command_topic}
            @change=${e=>{this.selection={...this.selection,command_topic:e.target.value}}}
          ></paper-input>
        </settings-row>

        <collapsible-section
           .narrow=${this.narrow}
          header=${Qe("panels.general.cards.mqtt.fields.command_payload.heading",this.hass.language)}
        >
          ${Object.values(ft).filter(e=>Ct((e=>{switch(e){case ft.COMMAND_ALARM_DISARM:return _t.STATE_ALARM_DISARMED;case ft.COMMAND_ALARM_ARM_HOME:return _t.STATE_ALARM_ARMED_HOME;case ft.COMMAND_ALARM_ARM_AWAY:return _t.STATE_ALARM_ARMED_AWAY;case ft.COMMAND_ALARM_ARM_NIGHT:return _t.STATE_ALARM_ARMED_NIGHT;case ft.COMMAND_ALARM_ARM_CUSTOM_BYPASS:return _t.STATE_ALARM_ARMED_CUSTOM_BYPASS;default:return}})(e),this.config)).map(e=>R`
          <settings-row .narrow=${this.narrow}>
            <span slot="heading">${$t(e)}</span>
            <span slot="description">${Qe("panels.general.cards.mqtt.fields.command_payload.item",this.hass.language,"{command}",$t(e))}</span>
            <paper-input
              label=${$t(e)}
              placeholder=${e}
              value=${this.selection.command_payload[e]||""}
              @change=${t=>{this.selection=Mt(this.selection,{command_payload:{[e]:t.target.value}})}}
            >
            </paper-input>
          </settings-row>
          `)}
        </collapsible-section>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${Qe("panels.general.cards.mqtt.fields.require_code.heading",this.hass.language)}</span>
          <span slot="description">${Qe("panels.general.cards.mqtt.fields.require_code.description",this.hass.language)}</span>
          <ha-switch
            ?checked=${this.selection.require_code}
            ?disabled=${!this.config.code_arm_required&&!this.config.code_disarm_required}
            @change=${e=>{this.selection={...this.selection,require_code:e.target.checked}}}
          >
          </ha-switch>
        </settings-row>

        <div class="card-actions">
          <mwc-button @click=${this.saveClick}>
            ${this.hass.localize("ui.common.save")}
          </mwc-button>
        </div>
      </ha-card>
      
    `:R``}saveClick(e){this.hass&&lt(this.hass,{mqtt:Object.assign(Object.assign({},this.selection),{enabled:!0})}).catch(t=>jt(t,e)).then(()=>{this.cancelClick()})}cancelClick(){De(0,"/alarmo/general",!0)}};Pt.styles=ze,t([Q()],Pt.prototype,"narrow",void 0),t([Q()],Pt.prototype,"config",void 0),t([Q()],Pt.prototype,"selection",void 0),Pt=t([G("mqtt-config-card")],Pt);
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
const qt=new WeakMap,zt=(e=>(...t)=>{const a=e(...t);return g.set(a,!0),a})(e=>t=>{if(!(t instanceof S))throw new Error("unsafeHTML can only be used in text bindings");const a=qt.get(t);if(void 0!==a&&k(e)&&e===a.value&&t.value===a.fragment)return;const s=document.createElement("template");s.innerHTML=e;const i=document.importNode(s.content,!0);t.setValue(i),qt.set(t,{value:e,fragment:i})});let Rt=class extends re{render(){return this.columns&&this.data?R`
      <div class="table">
        ${this.renderHeaderRow()}
        ${this.data.length?this.data.map(e=>this.renderDataRow(e)):R`
          <div class="table-row">
            <div class="table-cell text grow">
              <slot></slot>
            </div>
          </div>
        `}
      </div>
    `:R``}renderHeaderRow(){return this.columns?R`
      <div class="table-row header">
        ${Object.values(this.columns).map(e=>e.hide?"":R`
          <div
            class="table-cell ${e.text?"text":""} ${e.grow?"grow":""} ${e.align?e.align:""}" style="${e.grow?"":"width: "+e.width}"
          >
            ${e.title||""}
          </div>
        `)}
      </div>
    `:R``}renderDataRow(e){return this.columns?R`
      <div
        class="table-row ${this.selectable?"selectable":""}"
        @click=${()=>this.handleClick(String(e.id))}
      >
        ${Object.entries(this.columns).map(([t,a])=>a.hide?"":R`
          <div
            class="table-cell ${a.text?"text":""} ${a.grow?"grow":""} ${a.align?a.align:""}" style="${a.grow?"":"width: "+a.width}"
          >
            ${e[t]}
          </div>
        `)}
      </div>
    `:R``}handleClick(e){if(!this.selectable)return;const t=new CustomEvent("row-click",{detail:{id:e}});this.dispatchEvent(t)}};Rt.styles=ie`
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

      a, a:visited {
        color: var(--primary-color);
      }
  `,t([Q()],Rt.prototype,"columns",void 0),t([Q()],Rt.prototype,"data",void 0),t([Q({type:Boolean})],Rt.prototype,"selectable",void 0),Rt=t([G("alarmo-table")],Rt);let Vt=class extends re{async showDialog(e){this._params=e,await this.updateComplete}async closeDialog(){this._params&&this._params.cancel(),this._params=void 0}render(){return this._params?R`
      <ha-dialog
        open
        .heading=${!0}
        @closed=${this.closeDialog}
        @close-dialog=${this.closeDialog}
      >
      <div slot="heading">
        <ha-header-bar>
          <ha-icon-button
            slot="navigationIcon"
            dialogAction="cancel"
            icon="mdi:close"
          >
          </ha-icon-button>
          <span slot="title">
            ${this._params.title}
          </span>
        </ha-header-bar>
      </div>
      <div class="wrapper">
        ${this._params.description}
      </div>
    
        <mwc-button
          slot="primaryAction"
          @click=${this.cancelClick}
          dialogAction="close"
        >
            ${this.hass.localize("ui.dialogs.generic.cancel")}
        </mwc-button>
        <mwc-button
          slot="secondaryAction"
          style="float: left"
          @click=${this.confirmClick}
          dialogAction="close"
        >
            ${this.hass.localize("ui.dialogs.generic.ok")}
        </mwc-button>
      </ha-dialog>
      
    `:R``}confirmClick(){this._params.confirm()}cancelClick(){this._params.cancel()}static get styles(){return ie`
      ${ze}
      div.wrapper {
        color: var(--primary-text-color);
      }
    `}};t([Q({attribute:!1})],Vt.prototype,"hass",void 0),t([Z()],Vt.prototype,"_params",void 0),Vt=t([G("confirm-delete-dialog")],Vt);var Lt=Object.freeze({__proto__:null,get ConfirmDeleteDialog(){return Vt}});let Ut=class extends(Tt(re)){constructor(){super(...arguments),this.areas={},this.sensors={},this.automations={},this.name=""}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeEvents(()=>this._fetchData(),"alarmo_updated")]}async _fetchData(){this.hass&&(this.areas=await mt(this.hass),this.sensors=await rt(this.hass),this.automations=await dt(this.hass))}async showDialog(e){await this._fetchData(),this._params=e,e.area_id&&(this.area_id=e.area_id,this.name=this.areas[this.area_id].name),await this.updateComplete}async closeDialog(){this._params=void 0,this.area_id=void 0,this.name=""}render(){return this._params?R`
      <ha-dialog
        open
        .heading=${!0}
        @closed=${this.closeDialog}
        @close-dialog=${this.closeDialog}
      >
        <div slot="heading">
          <ha-header-bar>
            <ha-icon-button
              slot="navigationIcon"
              dialogAction="cancel"
              icon="mdi:close"
            >
            </ha-icon-button>
            <span slot="title">
      ${this.area_id?Qe("panels.general.dialogs.edit_area.title",this.hass.language,"{area}",this.areas[this.area_id].name):Qe("panels.general.dialogs.create_area.title",this.hass.language)}
            </span>
          </ha-header-bar>
        </div>
        <div class="wrapper">
          <paper-input
            label=${this.hass.localize("ui.components.area-picker.add_dialog.name")}
            @value-changed=${e=>this.name=e.target.value}
            value="${this.name}"
          >
          </paper-input>
      ${this.area_id?R`<span class="note">${Qe("panels.general.dialogs.edit_area.name_warning",this.hass.language)}</span>`:""}
      ${this.area_id?"":R`
        <alarmo-select
          .items=${Object.values(this.areas).map(e=>Object({value:e.area_id,name:e.name}))}
          value=${this.selectedArea}
          label="${Qe("panels.general.dialogs.create_area.fields.copy_from",this.hass.language)}"
          clearable=${!0}
          @value-changed=${e=>this.selectedArea=e.target.value}
        >
        </alarmo-select>
        `}
        </div>
        <mwc-button
          slot="primaryAction"
          @click=${this.saveClick}
        >
          ${this.hass.localize("ui.common.save")}
        </mwc-button>
        ${this.area_id?R`
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
    `:R``}saveClick(){const e=this.name.trim();if(!e.length)return;let t={name:e};this.area_id?t=Object.assign(Object.assign({},t),{area_id:this.area_id}):this.selectedArea&&(t=Object.assign(Object.assign({},t),{modes:Object.assign({},this.areas[this.selectedArea].modes)})),gt(this.hass,t).catch(()=>{}).then(()=>{this.closeDialog()})}async deleteClick(e){if(!this.area_id)return;const t=Object.values(this.sensors).filter(e=>e.area==this.area_id).length,a=Object.values(this.automations).filter(e=>e.area==this.area_id).length;let s=!1;var i,n;s=!t&&!a||await new Promise(s=>{Me(e.target,"show-dialog",{dialogTag:"confirm-delete-dialog",dialogImport:()=>Promise.resolve().then((function(){return Lt})),dialogParams:{title:Qe("panels.general.dialogs.remove_area.title",this.hass.language),description:Qe("panels.general.dialogs.remove_area.description",this.hass.language,["{sensors}","{automations}"],[String(t),String(a)]),cancel:()=>s(!1),confirm:()=>s(!0)}})}),s&&(i=this.hass,n=this.area_id,i.callApi("POST","alarmo/area",{area_id:n,remove:!0})).catch(()=>{}).then(()=>{this.closeDialog()})}static get styles(){return ie`
      ${ze}
      div.wrapper {
        color: var(--primary-text-color);
      }
      span.note {
        color: var(--secondary-text-color);
      }
    `}};t([Q({attribute:!1})],Ut.prototype,"hass",void 0),t([Z()],Ut.prototype,"_params",void 0),t([Q()],Ut.prototype,"areas",void 0),t([Q()],Ut.prototype,"sensors",void 0),t([Q()],Ut.prototype,"automations",void 0),t([Q()],Ut.prototype,"name",void 0),t([Q()],Ut.prototype,"area_id",void 0),t([Q()],Ut.prototype,"selectedArea",void 0),Ut=t([G("create-area-dialog")],Ut);var Ft=Object.freeze({__proto__:null,get CreateAreaDialog(){return Ut}});let It=class extends(Tt(re)){constructor(){super(...arguments),this.areas={},this.sensors={},this.automations={}}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeEvents(()=>this._fetchData(),"alarmo_updated")]}async _fetchData(){this.hass&&(this.areas=await mt(this.hass),this.sensors=await rt(this.hass),this.automations=await dt(this.hass))}render(){if(!this.hass)return R``;let e=Object.values(this.areas);e.sort((e,t)=>e.name.toLowerCase()<t.name.toLowerCase()?-1:1);const t={actions:{width:"48px"},name:{title:this.hass.localize("ui.components.area-picker.add_dialog.name"),width:"40%",grow:!0,text:!0},remarks:{title:Qe("panels.general.cards.areas.table.remarks",this.hass.language),width:"60%",hide:this.narrow,text:!0}},a=Object.values(e).map(t=>{const a=Object.values(this.sensors).filter(e=>e.area==t.area_id).length,s=1==Object.values(e).length?Object.values(this.automations).filter(e=>!e.area||e.area==t.area_id).length:Object.values(this.automations).filter(e=>e.area==t.area_id).length,i=`<a href="/alarmo/sensors/filter/${t.area_id}">${Qe("panels.general.cards.areas.table.summary_sensors",this.hass.language,"{number}",String(a))}</a>`,n=`<a href="/alarmo/actions/filter/${t.area_id}">${Qe("panels.general.cards.areas.table.summary_automations",this.hass.language,"{number}",String(s))}</a>`;return{id:t.area_id,actions:R`<ha-icon-button @click=${e=>this.editClick(e,t.area_id)} icon="hass:pencil"></ha-icon-button>`,name:$t(t.name),remarks:zt(Qe("panels.general.cards.areas.table.summary",this.hass.language,["{summary_sensors}","{summary_automations}"],[i,n]))}});return R`
      <ha-card header="${Qe("panels.general.cards.areas.title",this.hass.language)}">
        <div class="card-content">
          ${Qe("panels.general.cards.areas.description",this.hass.language)}
        </div>

      <alarmo-table
      .columns=${t}
      .data=${a}
      >
        ${Qe("panels.general.cards.areas.no_items",this.hass.language)}
      </alarmo-table>
      <div class="card-actions">
        <mwc-button @click=${this.addClick}>
          ${Qe("panels.general.cards.areas.actions.add",this.hass.language)}
        </mwc-button>
      </div>
    </ha-card>
    `}addClick(e){const t=e.target;Me(t,"show-dialog",{dialogTag:"create-area-dialog",dialogImport:()=>Promise.resolve().then((function(){return Ft})),dialogParams:{}})}editClick(e,t){const a=e.target;Me(a,"show-dialog",{dialogTag:"create-area-dialog",dialogImport:()=>Promise.resolve().then((function(){return Ft})),dialogParams:{area_id:t}})}};It.styles=ze,t([Q()],It.prototype,"narrow",void 0),t([Q()],It.prototype,"path",void 0),t([Q()],It.prototype,"config",void 0),t([Q()],It.prototype,"areas",void 0),t([Q()],It.prototype,"sensors",void 0),t([Q()],It.prototype,"automations",void 0),It=t([G("area-config-card")],It);let Ht=class extends re{constructor(){super(...arguments),this.name=""}async showDialog(e){this._params=e;const t=await nt(this.hass);this.name=t.master.name||"",await this.updateComplete}async closeDialog(){this._params=void 0}render(){return this._params?R`
      <ha-dialog
        open
        .heading=${!0}
        @closed=${this.closeDialog}
        @close-dialog=${this.closeDialog}
      >
        <div slot="heading">
          <ha-header-bar>
            <ha-icon-button
              slot="navigationIcon"
              dialogAction="cancel"
              icon="mdi:close"
            >
            </ha-icon-button>
            <span slot="title"> ${Qe("panels.general.dialogs.edit_master.title",this.hass.language)}</span>
          </ha-header-bar>
        </div>
        <div class="wrapper">
          <paper-input
            label=${this.hass.localize("ui.components.area-picker.add_dialog.name")}
            @value-changed=${e=>this.name=e.target.value}
            value="${this.name}"
          >
          </paper-input>
          <span class="note">${Qe("panels.general.dialogs.edit_area.name_warning",this.hass.language)}</span>
        </div>
        <mwc-button
          slot="primaryAction"
          @click=${this.saveClick}
        >
          ${this.hass.localize("ui.common.save")}
        </mwc-button>
        <mwc-button
          slot="secondaryAction"
          @click=${this.closeDialog}
        >
          ${this.hass.localize("ui.common.cancel")}
        </mwc-button>
      </ha-dialog>
      
    `:R``}saveClick(){const e=this.name.trim();e.length&&lt(this.hass,{master:{enabled:!0,name:e}}).catch(()=>{}).then(()=>{this.closeDialog()})}static get styles(){return ie`
      div.wrapper {
        color: var(--primary-text-color);
      }
      span.note {
        color: var(--secondary-text-color);
      }
    `}};t([Q({attribute:!1})],Ht.prototype,"hass",void 0),t([Z()],Ht.prototype,"_params",void 0),t([Q()],Ht.prototype,"name",void 0),Ht=t([G("edit-master-dialog")],Ht);var Yt=Object.freeze({__proto__:null,get EditMasterDialog(){return Ht}});let Bt=class extends(Tt(re)){constructor(){super(...arguments),this.areas={},this.automations={}}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeEvents(()=>this._fetchData(),"alarmo_updated")]}async _fetchData(){this.hass&&(this.config=await nt(this.hass),this.areas=await mt(this.hass),this.automations=await dt(this.hass),this.data=At(this.config,["trigger_time","disarm_after_trigger","mqtt","master"]))}firstUpdated(){(async()=>{await qe()})()}render(){var e,t,a,s,i,n,r,o;return this.hass&&this.config&&this.data?this.path&&"mqtt_configuration"==this.path[0]?R`
      <mqtt-config-card
        .hass=${this.hass}
        .narrow=${this.narrow}
      >
      </mqtt-config-card>
    `:this.path&&"edit_area"==this.path[0]&&2==this.path.length?R`
      <area-editor-card
        .hass=${this.hass}
        .narrow=${this.narrow}
        item=${this.path[1]}
      >
      </area-editor-card>
      `:R`
      <ha-card header="${Qe("panels.general.cards.general.title",this.hass.language)}">


        <div class="card-content">
          ${Qe("panels.general.cards.general.description",this.hass.language)}
        </div>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${Qe("panels.general.cards.general.fields.disarm_after_trigger.heading",this.hass.language)}</span>
          <span slot="description">${Qe("panels.general.cards.general.fields.disarm_after_trigger.description",this.hass.language)}</span>
          <ha-switch
            ?checked=${this.data.disarm_after_trigger}
            @change=${e=>this.data={...this.data,disarm_after_trigger:e.target.checked}}
        }}
          >
          </ha-switch>
        </settings-row>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${Qe("panels.general.cards.general.fields.enable_mqtt.heading",this.hass.language)}</span>
          <span slot="description">${Qe("panels.general.cards.general.fields.enable_mqtt.description",this.hass.language)}</span>
          <ha-switch
            ?checked=${null===(t=null===(e=this.data)||void 0===e?void 0:e.mqtt)||void 0===t?void 0:t.enabled}
            @change=${e=>{this.data={...this.data,mqtt:{...this.data.mqtt,enabled:e.target.checked}}}}
          >
          </ha-switch>
        </settings-row>

        ${(null===(s=null===(a=this.data)||void 0===a?void 0:a.mqtt)||void 0===s?void 0:s.enabled)?R`
        <div style="padding: 0px 0px 16px 16px">
          <mwc-button
            outlined
            @click=${()=>De(0,"/alarmo/general/mqtt_configuration",!0)}
          >
            ${Qe("panels.general.cards.general.actions.setup_mqtt",this.hass.language)}
          </mwc-button>
        </div>
        `:""}

        ${Object.keys(this.areas).length>=2?R`
        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${Qe("panels.general.cards.general.fields.enable_master.heading",this.hass.language)}</span>
          <span slot="description">${Qe("panels.general.cards.general.fields.enable_master.description",this.hass.language)}</span>
          <ha-switch
            ?checked=${(null===(n=null===(i=this.data)||void 0===i?void 0:i.master)||void 0===n?void 0:n.enabled)&&Object.keys(this.areas).length>=2}
            ?disabled=${Object.keys(this.areas).length<2}
            @change=${this.toggleEnableMaster}
          >
          </ha-switch>
        </settings-row>
        `:""}

        ${(null===(o=null===(r=this.data)||void 0===r?void 0:r.master)||void 0===o?void 0:o.enabled)&&Object.keys(this.areas).length>=2?R`
        <div style="padding: 0px 0px 16px 16px">
          <mwc-button
            outlined
            @click=${this.setupMasterClick}
          >
            ${Qe("panels.general.cards.general.actions.setup_master",this.hass.language)}
          </mwc-button>
        </div>
        `:""}

        <div class="card-actions">
          <mwc-button @click=${this.saveClick}>
            ${this.hass.localize("ui.common.save")}
          </mwc-button>
        </div>
      </ha-card>

      <alarm-mode-card
        .hass=${this.hass}
        .narrow=${this.narrow}
      >
      </alarm-mode-card>

      <area-config-card
        .hass=${this.hass}
        .narrow=${this.narrow}
      >
      </area-config-card>
    `:R``}setupMasterClick(e){const t=e.target;Me(t,"show-dialog",{dialogTag:"edit-master-dialog",dialogImport:()=>Promise.resolve().then((function(){return Yt})),dialogParams:{}})}async toggleEnableMaster(e){const t=e.target;let a=t.checked;if(!a){const e=Object.values(this.automations).filter(e=>!e.area).length;if(e){await new Promise(a=>{Me(t,"show-dialog",{dialogTag:"confirm-delete-dialog",dialogImport:()=>Promise.resolve().then((function(){return Lt})),dialogParams:{title:Qe("panels.general.dialogs.disable_master.title",this.hass.language),description:Qe("panels.general.dialogs.disable_master.description",this.hass.language,["{automations}"],[String(e)]),cancel:()=>a(!1),confirm:()=>a(!0)}})})||(a=!0,t.checked=!0)}}this.data=Object.assign(Object.assign({},this.data),{master:Object.assign(Object.assign({},this.data.master),{enabled:a})})}saveClick(e){this.hass&&this.data&&lt(this.hass,this.data).catch(t=>jt(t,e)).then(()=>{})}};Bt.styles=ze,t([Q()],Bt.prototype,"narrow",void 0),t([Q()],Bt.prototype,"path",void 0),t([Q()],Bt.prototype,"data",void 0),t([Q()],Bt.prototype,"config",void 0),t([Q()],Bt.prototype,"areas",void 0),t([Q()],Bt.prototype,"automations",void 0),Bt=t([G("alarm-view-general")],Bt);let Wt=class extends re{async showDialog(e){this._params=e,await this.updateComplete}async closeDialog(){this._params=void 0}render(){return this._params?R`
      <ha-dialog
        open
        .heading=${!0}
        @closed=${this.closeDialog}
        @close-dialog=${this.closeDialog}
      >
      <div slot="heading">
        <ha-header-bar>
          <ha-icon-button
            slot="navigationIcon"
            dialogAction="cancel"
            icon="mdi:close"
          >
          </ha-icon-button>
          <span slot="title">
        ${this.hass.localize("state_badge.default.error")}
          </span>
        </ha-header-bar>
      </div>
      <div class="wrapper">
        ${this._params.error||""}
      </div>
    
        <mwc-button
          slot="primaryAction"
          style="float: left"
          @click=${this.closeDialog}
          dialogAction="close"
        >
            ${this.hass.localize("ui.dialogs.generic.ok")}
        </mwc-button>
      </ha-dialog>
      
    `:R``}static get styles(){return ie`
      div.wrapper {
        color: var(--primary-text-color);
      }
    `}};t([Q({attribute:!1})],Wt.prototype,"hass",void 0),t([Z()],Wt.prototype,"_params",void 0),Wt=t([G("error-dialog")],Wt);var Kt=Object.freeze({__proto__:null,get ErrorDialog(){return Wt}});const Gt=(e,t)=>{if("binary_sensor"==function(e){const t="string"==typeof e?e:e.entity_id;return String(t.split(".").shift())}(e.entity_id)){if(t)return!0;const a=e.attributes.device_class;return!!a&&!!["door","garage_door","gas","heat","lock","moisture","motion","moving","occupancy","opening","presence","safety","smoke","sound","vibration","window"].includes(a)}return!1};function Jt(e,t){if(!e)return null;const a=Se(e.entity_id);let s={entity_id:e.entity_id,name:e.attributes.friendly_name||e.entity_id,modes:[],immediate:!1,arm_on_close:!1,allow_open:!1,always_on:!1,trigger_unavailable:!1,type:bt.Other,enabled:!0};if("binary_sensor"==a){const a=(e=>{switch(e.attributes.device_class){case"door":case"garage_door":case"lock":case"opening":return bt.Door;case"window":return bt.Window;case"gas":case"heat":case"moisture":case"smoke":case"safety":return bt.Environmental;case"motion":case"moving":case"occupancy":case"presence":return bt.Motion;case"sound":case"opening":case"vibration":return bt.Tamper;default:return}})(e);a&&(s=Object.assign(Object.assign(Object.assign({},s),{type:a}),Qt(t)[a]))}return s}const Qt=e=>{const t=t=>t.filter(t=>e.includes(t));return{[bt.Door]:{modes:t([at.ArmedAway,at.ArmedHome,at.ArmedNight]),always_on:!1,allow_open:!1,arm_on_close:!0,immediate:!1},[bt.Window]:{modes:t([at.ArmedAway,at.ArmedHome,at.ArmedNight]),always_on:!1,allow_open:!1,arm_on_close:!1,immediate:!0},[bt.Motion]:{modes:t([at.ArmedAway]),always_on:!1,allow_open:!0,arm_on_close:!1,immediate:!1},[bt.Tamper]:{modes:t([at.ArmedAway,at.ArmedHome,at.ArmedNight,at.ArmedCustom]),always_on:!1,allow_open:!1,arm_on_close:!1,immediate:!0},[bt.Environmental]:{modes:t([at.ArmedAway,at.ArmedHome,at.ArmedNight,at.ArmedCustom]),always_on:!0,allow_open:!1,arm_on_close:!1,immediate:!1}}};let Zt=class extends re{async firstUpdated(){const e=await mt(this.hass);this.areas=e;const t=await rt(this.hass);this.data=t[this.item],this.data.area||1!=Object.keys(e).length||(this.data=Object.assign(Object.assign({},this.data),{area:Object.keys(this.areas)[0]}))}render(){if(!this.data)return R``;const e=this.hass.states[this.data.entity_id];return R`
        <ha-card
        >
          <div class="card-header">
            <div class="name">
              ${Qe("panels.sensors.cards.editor.title",this.hass.language)}
            </div>
            <ha-icon-button
              icon="hass:close"
              @click=${this.cancelClick}
            >
            </ha-icon-button>
          </div>
          <div class="card-content">
              ${Qe("panels.sensors.cards.editor.description",this.hass.language,"{entity}",this.item)}
          </div>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${Qe("panels.sensors.cards.editor.fields.name.heading",this.hass.language)}</span>
          <span slot="description">${Qe("panels.sensors.cards.editor.fields.name.description",this.hass.language)}</span>

          <paper-input
            label="${Qe("panels.sensors.cards.editor.fields.name.heading",this.hass.language)}"
            placeholder=${(null==e?void 0:e.attributes.friendly_name)||""}
            value=${this.data.name}
            @change=${e=>this.data={...this.data,name:e.target.value}}
          >
          </paper-input>

        </settings-row>

        ${Object.keys(this.areas).length>1?R`
        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${Qe("panels.sensors.cards.editor.fields.area.heading",this.hass.language)}</span>
          <span slot="description">${Qe("panels.sensors.cards.editor.fields.area.description",this.hass.language)}</span>

          <alarmo-select
            .items=${Object.values(this.areas).map(e=>Object({value:e.area_id,name:e.name}))}
            value=${this.data.area}
            label=${Qe("panels.sensors.cards.editor.fields.area.heading",this.hass.language)}
            @value-changed=${e=>this.data={...this.data,area:e.target.value}}
          </alarmo-select>
        </settings-row>`:""}
        
        <settings-row .narrow=${this.narrow}  .large=${!0}>
          <span slot="heading">${Qe("panels.sensors.cards.editor.fields.device_type.heading",this.hass.language)}</span>
          <span slot="description">${Qe("panels.sensors.cards.editor.fields.device_type.description",this.hass.language)}</span>

          <alarmo-select
            .hass=${this.hass}
            .items=${Object.entries(bt).filter(([,e])=>e!=bt.Other).map(([e,t])=>Object({value:t,name:Qe(`panels.sensors.cards.editor.fields.device_type.choose.${t}.name`,this.hass.language),description:Qe(`panels.sensors.cards.editor.fields.device_type.choose.${t}.description`,this.hass.language),icon:wt[e]}))}
            label=${Qe("panels.sensors.cards.editor.fields.device_type.heading",this.hass.language)}
            clearable=${!0}
            icons=${!0}
            value=${this.data.type}
            @value-changed=${e=>this.setType(e.target.value||bt.Other)}
          >
          </alarmo-select>
        </settings-row>
        
        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${Qe("panels.sensors.cards.editor.fields.modes.heading",this.hass.language)}</span>
          <span slot="description">${Qe("panels.sensors.cards.editor.fields.modes.description",this.hass.language)}</span>
          
          <div>
            ${this.modesByArea(this.data.area).map(e=>R`
              <mwc-button
                class="${this.data.modes.includes(e)?"active":""}"
                @click=${()=>{var t,a;this.data={...this.data,modes:this.data.modes.includes(e)?(t=this.data.modes,a=e,t.filter(e=>e!==a)):xt(this.data.modes.concat([e]))}}}
              >
                <ha-icon icon="${vt[Object.entries(at).find(([,t])=>t==e)[0]]}"></ha-icon>
                ${Qe("common.modes_short."+e,this.hass.language)}
              </mwc-button>
              `)}
          </div>

        </settings-row>

        <collapsible-section
           .narrow=${this.narrow}
          header=${Qe("panels.sensors.cards.editor.actions.toggle_advanced",this.hass.language)}
        >
      ${!this.data.type||[bt.Environmental,bt.Other].includes(this.data.type)?R`
          <settings-row .narrow=${this.narrow}>
            <span slot="heading">${Qe("panels.sensors.cards.editor.fields.always_on.heading",this.hass.language)}</span>
            <span slot="description">${Qe("panels.sensors.cards.editor.fields.always_on.description",this.hass.language)}</span>

            <ha-switch
              ?checked=${this.data.always_on}
              @change=${e=>this.data=e.target.checked?{...this.data,always_on:!0,arm_on_close:!1,immediate:!0,allow_open:!1}:{...this.data,always_on:!1}}
            >
            </ha-switch>
          </settings-row>
          `:""}
  
      ${!this.data.type||[bt.Door,bt.Other].includes(this.data.type)?R`
          <settings-row .narrow=${this.narrow}>
            <span slot="heading">${Qe("panels.sensors.cards.editor.fields.arm_on_close.heading",this.hass.language)}</span>
            <span slot="description">${Qe("panels.sensors.cards.editor.fields.arm_on_close.description",this.hass.language)}</span>

            <ha-switch
              ?checked=${this.data.arm_on_close}
              ?disabled=${this.data.always_on}
              @change=${e=>this.data=e.target.checked?{...this.data,arm_on_close:!0,allow_open:!1,immediate:!1,always_on:!1}:{...this.data,arm_on_close:!1}}
            >
            </ha-switch>
          </settings-row>
          `:""}

      ${!this.data.type||[bt.Window,bt.Door,bt.Motion,bt.Tamper,bt.Other].includes(this.data.type)?R`
          <settings-row .narrow=${this.narrow}>
            <span slot="heading">${Qe("panels.sensors.cards.editor.fields.immediate.heading",this.hass.language)}</span>
            <span slot="description">${Qe("panels.sensors.cards.editor.fields.immediate.description",this.hass.language)}</span>

            <ha-switch
              ?checked=${this.data.immediate}
              ?disabled=${this.data.always_on||this.data.arm_on_close}
              @change=${e=>this.data=e.target.checked?{...this.data,immediate:!0,arm_on_close:!1,always_on:!1,allow_open:!1}:{...this.data,immediate:!1}}
            >
            </ha-switch>
          </settings-row>
          `:""}
        
      ${!this.data.type||[bt.Motion,bt.Other].includes(this.data.type)?R`
          <settings-row .narrow=${this.narrow}>
            <span slot="heading">${Qe("panels.sensors.cards.editor.fields.allow_open.heading",this.hass.language)}</span>
            <span slot="description">${Qe("panels.sensors.cards.editor.fields.allow_open.description",this.hass.language)}</span>

            <ha-switch
              ?checked=${this.data.allow_open}
              ?disabled=${this.data.always_on||this.data.immediate||this.data.arm_on_close}
              @change=${e=>this.data=e.target.checked?{...this.data,allow_open:!0,arm_on_close:!1,always_on:!1,immediate:!1}:{...this.data,allow_open:!1}}
            >
            </ha-switch>
          </settings-row>
          `:""}

          <settings-row .narrow=${this.narrow}>
            <span slot="heading">${Qe("panels.sensors.cards.editor.fields.trigger_unavailable.heading",this.hass.language)}</span>
            <span slot="description">${Qe("panels.sensors.cards.editor.fields.trigger_unavailable.description",this.hass.language)}</span>

            <ha-switch
              ?checked=${this.data.trigger_unavailable}
              @change=${e=>this.data={...this.data,trigger_unavailable:e.target.checked}}
            >
            </ha-switch>
          </settings-row>

          
        </collapsible-section>
  
          <div class="card-actions">
            <mwc-button
              @click=${this.saveClick}
            >
              ${this.hass.localize("ui.common.save")}
            </mwc-button>

            <mwc-button
              class="warning"
              @click=${this.deleteClick}
            >
              ${Qe("panels.sensors.cards.editor.actions.remove",this.hass.language)}
            </mwc-button>
          </div>
        </ha-card>
    `}modesByArea(e){const t=Object.keys(this.areas).reduce((e,t)=>Object.assign(e,{[t]:Object.entries(this.areas[t].modes).filter(([,e])=>e.enabled).map(([e])=>e)}),{});return e?t[e]:Object.values(t).reduce((e,t)=>e.filter(e=>t.includes(e)))}setType(e){this.data.area?this.areas[this.data.area].modes:Object.values(this.areas).map(e=>e.modes)[0];const t=e!=bt.Other?Qt(this.modesByArea(this.data.area))[e]:{};this.data=Object.assign(Object.assign(Object.assign({},this.data),{type:e}),t)}deleteClick(e){var t,a;(t=this.hass,a=this.item,t.callApi("POST","alarmo/sensors",{entity_id:a,remove:!0})).catch(t=>jt(t,e)).then(()=>{this.cancelClick()})}saveClick(e){let t=[];this.data.area||t.push(Qe("panels.sensors.cards.editor.errors.no_area",this.hass.language)),this.data.modes.length||this.data.always_on||t.push(Qe("panels.sensors.cards.editor.errors.no_modes",this.hass.language)),t.length?St(e,R`
        ${Qe("panels.sensors.cards.editor.errors.description",this.hass.language)}
        <ul>
          ${t.map(e=>R`<li>${e}</li>`)}
        </ul>
      `):ct(this.hass,Object.assign({},this.data)).catch(t=>jt(t,e)).then(()=>{this.cancelClick()})}cancelClick(){De(0,"/alarmo/sensors",!0)}};Zt.styles=ze,t([Q()],Zt.prototype,"hass",void 0),t([Q()],Zt.prototype,"narrow",void 0),t([Q()],Zt.prototype,"item",void 0),t([Q()],Zt.prototype,"data",void 0),Zt=t([G("sensor-editor-card")],Zt);let Xt=class extends re{constructor(){super(...arguments),this.items=[],this.value=null}render(){return R`
      ${this.items.map(e=>R`
          <div class="chip ${this.value==e.value?"selected":""}" @click=${()=>this.selectItem(e.value)}>
            ${void 0!==e.count?R`<span class="count">${e.count>99?99:e.count}</span>`:""}
            <span class="label">${e.name}</span>
          </div>
        `)}
    `}selectItem(e){this.value=this.value==e?null:e,Me(this,"value-changed")}static get styles(){return ie`
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
        font-size: 12px;
        line-height: 20px;
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
    `}};t([Q({attribute:!1})],Xt.prototype,"hass",void 0),t([Q()],Xt.prototype,"items",void 0),t([Q()],Xt.prototype,"value",void 0),Xt=t([G("alarmo-chips")],Xt);let ea=class extends(Tt(re)){constructor(){super(...arguments),this.areas={},this.sensors={},this.addSelection=[],this.showAllSensorEntities=!1,this.areaFilterOptions=[]}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeEvents(()=>this._fetchData(),"alarmo_updated")]}async _fetchData(){this.hass&&(this.areas=await mt(this.hass),this.sensors=await rt(this.hass),this.areaFilterOptions=[{value:"no_area",name:Qe("panels.sensors.cards.sensors.filter.no_area",this.hass.language),count:Object.values(this.sensors).filter(e=>!e.area).length}].concat(Object.values(this.areas).map(e=>Object({value:e.area_id,name:e.name,count:Object.values(this.sensors).filter(t=>t.area==e.area_id).length})).sort((e,t)=>e.name.toLowerCase()<t.name.toLowerCase()?-1:1)))}firstUpdated(){(async()=>{await qe()})(),this.path&&2==this.path.length&&"filter"==this.path[0]&&(this.selectedArea=this.path[1])}render(){return this.hass?this.path&&2==this.path.length&&"edit"==this.path[0]?R`
      <sensor-editor-card
        .hass=${this.hass}
        .narrow=${this.narrow}
        .item=${this.path[1]}
      >

      </sensor-editor-card>
    `:R`
      ${this.sensorsPanel()}
      ${this.addSensorsPanel()}

    `:R``}sensorsPanel(){if(!this.hass)return R``;let e=Object.keys(this.sensors).map(e=>{const t=this.hass.states[e];return{id:e,name:kt(t),icon:yt(t)}});e.sort((e,t)=>e.name.toLowerCase()<t.name.toLowerCase()?-1:1);const t={icon:{width:"40px"},name:{title:this.hass.localize("ui.components.entity.entity-picker.entity"),width:"60%",grow:!0,text:!0},modes:{title:Qe("panels.sensors.cards.sensors.table.arm_modes",this.hass.language),width:"25%",hide:this.narrow,text:!0},enabled:{title:"Enabled",width:"68px",align:"center"}},a=e.filter(e=>!this.selectedArea||!this.areaFilterOptions.find(e=>e.value==this.selectedArea)||this.sensors[e.id].area==this.selectedArea||"no_area"===this.selectedArea&&!this.sensors[e.id].area).map(e=>{const t=Object.entries(bt).find(([,t])=>t==this.sensors[e.id].type)[0];return{icon:R`
          <paper-tooltip animation-delay="0">
            ${Qe(`panels.sensors.cards.editor.fields.device_type.choose.${bt[t]}.name`,this.hass.language)}
          </paper-tooltip>
          <ha-icon
            icon="${wt[t]}"
          >
          </ha-icon>`,name:R`
          ${this.sensors[e.id].name||$t(e.name)}
          <span class="secondary">${e.id}</span>
        `,id:e.id,modes:R`
          ${this.sensors[e.id].always_on?Qe("panels.sensors.cards.sensors.table.always_on",this.hass.language):Object.values(at).filter(t=>this.sensors[e.id].modes.includes(t)).map(e=>Qe("common.modes_short."+e,this.hass.language)).join(", ")}
        `,enabled:R`
          <ha-switch
            @click=${e=>{e.stopPropagation()}}
            ?checked=${this.sensors[e.id].enabled}
            @change=${t=>this.toggleEnabled(t,e.id)}
          >
          </ha-switch>
        `}});return R`
    <ha-card header="${Qe("panels.sensors.cards.sensors.title",this.hass.language)}">
      <div class="card-content">
        ${Qe("panels.sensors.cards.sensors.description",this.hass.language)}
      </div>

      ${this.areaFilterOptions.length>1?R`
      <div class="table-filter" ?narrow=${this.narrow}>
       <span class="header">${Qe("panels.sensors.cards.sensors.filter.label",this.hass.language)}:</span>
        <alarmo-chips
          .items=${this.areaFilterOptions}
          value=${this.selectedArea}
          @value-changed=${e=>this.selectedArea=e.target.value}
        >
        </alarmo-chips>
      </div>
      `:""}
      <alarmo-table
        ?selectable=${!0}
        .columns=${t}
        .data=${a}
        @row-click=${e=>{const t=String(e.detail.id);De(0,"/alarmo/sensors/edit/"+t,!0)}}
      >
        ${Qe("panels.sensors.cards.sensors.no_items",this.hass.language)}
      </alarmo-table>
    </ha-card>
    `}addSensorsPanel(){if(!this.hass)return R``;let e=Object.values(this.hass.states).filter(e=>Gt(e,this.showAllSensorEntities)).filter(e=>!Object.keys(this.sensors).includes(e.entity_id)).map(e=>Object({id:e.entity_id,name:kt(e),icon:yt(e)}));e.sort((e,t)=>e.name.toLowerCase()<t.name.toLowerCase()?-1:1);const t={checkbox:{width:"48px"},icon:{width:"40px"},name:{title:this.hass.localize("ui.components.area-picker.add_dialog.name"),width:"40%",grow:!0,text:!0},id:{title:this.hass.localize("ui.components.entity.entity-picker.entity"),width:"40%",hide:this.narrow,text:!0}},a=e.map(e=>({checkbox:R`
        <ha-checkbox
          @change=${t=>this.toggleSelect(t,e.id)}
          ?checked=${this.addSelection.includes(e.id)}
        >
        </ha-checkbox>`,icon:R`<state-badge .hass=${this.hass} .stateObj=${this.hass.states[e.id]}></state-badge>`,name:$t(e.name),id:e.id}));return R`
    <ha-card header="${Qe("panels.sensors.cards.add_sensors.title",this.hass.language)}">
      <div class="card-content">
        ${Qe("panels.sensors.cards.add_sensors.description",this.hass.language)}
      </div>

      <div style="display: flex; justify-content: flex-end; padding: 8px 16px">
        <ha-switch
          @change=${e=>{this.showAllSensorEntities=e.target.checked}}
          style="padding: 0px 8px"
        >
        </ha-switch>
        ${Qe("panels.sensors.cards.add_sensors.actions.show_all",this.hass.language)}
      </div>

      <alarmo-table
        .columns=${t}
        .data=${a}
      >
        ${Qe("panels.sensors.cards.add_sensors.no_items",this.hass.language)}
      </alarmo-table>
        
      <div class="card-actions">
        <mwc-button
          @click=${this.addSelected}
          ?disabled=${0==this.addSelection.length}
        >
          ${Qe("panels.sensors.cards.add_sensors.actions.add_to_alarm",this.hass.language)}
        </mwc-button>
      </div>
    </ha-card>
    `}toggleSelect(e,t){const a=e.target.checked;this.addSelection=a&&!this.addSelection.includes(t)?[...this.addSelection,t]:a?this.addSelection:this.addSelection.filter(e=>e!=t)}toggleEnabled(e,t){const a=e.target.checked;ct(this.hass,{entity_id:t,enabled:a}).catch(t=>jt(t,e)).then(()=>{})}addSelected(e){if(!this.hass)return;const t=Object.values(this.areas).map(e=>Object.entries(e.modes).filter(([,e])=>e.enabled).map(([e])=>e)).reduce((e,t)=>e.filter(e=>t.includes(e)));this.addSelection.map(e=>Jt(this.hass.states[e],t)).map(e=>1==Object.keys(this.areas).length?Object.assign(e,{area:Object.keys(this.areas)[0]}):e).filter(e=>e).forEach(t=>{ct(this.hass,t).catch(t=>jt(t,e)).then(()=>{})}),this.addSelection=[]}};ea.styles=ze,t([Q()],ea.prototype,"narrow",void 0),t([Q()],ea.prototype,"path",void 0),t([Q()],ea.prototype,"areas",void 0),t([Q()],ea.prototype,"sensors",void 0),t([Q()],ea.prototype,"addSelection",void 0),t([Q()],ea.prototype,"showAllSensorEntities",void 0),t([Q()],ea.prototype,"selectedArea",void 0),t([Q()],ea.prototype,"areaFilterOptions",void 0),ea=t([G("alarm-view-sensors")],ea);let ta=class extends re{async firstUpdated(){if(this.users=await ot(this.hass),this.data={name:"",code:"",old_code:"",confirm_code:"",is_admin:!1,can_arm:!0,can_disarm:!0,is_override_code:!1},this.item){const e=this.users[this.item];this.data=Object.assign(Object.assign({},this.data),At(e,["name","is_admin","can_arm","can_disarm","is_override_code"]))}}render(){return this.data?R`
<ha-card>
  <div class="card-header">
    <div class="name">
      ${this.item?Qe("panels.codes.cards.edit_user.title",this.hass.language):Qe("panels.codes.cards.new_user.title",this.hass.language)}
    </div>
    <ha-icon-button
      icon="hass:close"
      @click=${this.cancelClick}
    >
    </ha-icon-button>
  </div>
  <div class="card-content">
    ${this.item?Qe("panels.codes.cards.edit_user.description",this.hass.language,"{name}",this.users[this.item].name):Qe("panels.codes.cards.new_user.description",this.hass.language)}
  </div>

  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${Qe("panels.codes.cards.new_user.fields.name.heading",this.hass.language)}</span>
    <span slot="description">${Qe("panels.codes.cards.new_user.fields.name.description",this.hass.language)}</span>

    <paper-input
      label="${Qe("panels.codes.cards.new_user.fields.name.heading",this.hass.language)}"
      placeholder=""
      value=${this.data.name}
      @change=${e=>this.data={...this.data,name:e.target.value}}
    >
    </paper-input>
  </settings-row>

      ${this.item?R`
  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${Qe("panels.codes.cards.edit_user.fields.old_code.heading",this.hass.language)}</span>
    <span slot="description">${Qe("panels.codes.cards.edit_user.fields.old_code.description",this.hass.language)}</span>

    <paper-input
      label="${Qe("panels.codes.cards.edit_user.fields.old_code.heading",this.hass.language)}"
      placeholder=""
      type="password"
      value=${this.data.old_code}
      @change=${e=>this.data={...this.data,old_code:e.target.value}}
    >
    </paper-input>
  </settings-row>
        `:""}
      
      ${this.item&&!this.data.old_code.length?"":R`
  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${Qe("panels.codes.cards.new_user.fields.code.heading",this.hass.language)}</span>
    <span slot="description">${Qe("panels.codes.cards.new_user.fields.code.description",this.hass.language)}</span>

    <paper-input
      label="${Qe("panels.codes.cards.new_user.fields.code.heading",this.hass.language)}"
      placeholder=""
      type="password"
      value=${this.data.code}
      @change=${e=>this.data={...this.data,code:e.target.value}}
    >
    </paper-input>
  </settings-row>

  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${Qe("panels.codes.cards.new_user.fields.confirm_code.heading",this.hass.language)}</span>
    <span slot="description">${Qe("panels.codes.cards.new_user.fields.confirm_code.description",this.hass.language)}</span>

    <paper-input
      label="${Qe("panels.codes.cards.new_user.fields.confirm_code.heading",this.hass.language)}"
      placeholder=""
      type="password"
      value=${this.data.confirm_code}
      @change=${e=>this.data={...this.data,confirm_code:e.target.value}}
    >
    </paper-input>
  </settings-row>
    `}

  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${Qe("panels.codes.cards.new_user.fields.is_admin.heading",this.hass.language)}</span>
    <span slot="description">${Qe("panels.codes.cards.new_user.fields.is_admin.description",this.hass.language)}</span>

    <ha-switch
      ?checked=${this.data.is_admin}
      @change=${e=>this.data={...this.data,is_admin:e.target.checked}}
    >
    </ha-switch>
  </settings-row>

  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${Qe("panels.codes.cards.new_user.fields.can_arm.heading",this.hass.language)}</span>
    <span slot="description">${Qe("panels.codes.cards.new_user.fields.can_arm.description",this.hass.language)}</span>

    <ha-switch
      ?checked=${this.data.can_arm||this.data.is_admin}
      ?disabled=${this.data.is_admin}
      @change=${e=>this.data={...this.data,can_arm:e.target.checked}}
    >
    </ha-switch>
  </settings-row>

  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${Qe("panels.codes.cards.new_user.fields.can_disarm.heading",this.hass.language)}</span>
    <span slot="description">${Qe("panels.codes.cards.new_user.fields.can_disarm.description",this.hass.language)}</span>

    <ha-switch
      ?checked=${this.data.can_disarm||this.data.is_admin}
      ?disabled=${this.data.is_admin}
      @change=${e=>this.data={...this.data,can_disarm:e.target.checked}}
    >
    </ha-switch>
  </settings-row>

  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${Qe("panels.codes.cards.new_user.fields.is_override_code.heading",this.hass.language)}</span>
    <span slot="description">${Qe("panels.codes.cards.new_user.fields.is_override_code.description",this.hass.language)}</span>

    <ha-switch
      ?checked=${this.data.is_override_code}
      @change=${e=>this.data={...this.data,is_override_code:e.target.checked}}
    >
    </ha-switch>
  </settings-row>
        
  <div class="card-actions">
    <mwc-button @click=${this.saveClick}>
      ${this.hass.localize("ui.common.save")}
    </mwc-button>

  ${this.item?R`
    <mwc-button
      class="warning"
      @click=${this.deleteClick}
    >
      ${this.hass.localize("ui.common.delete")}
    </mwc-button>`:""}
  </div>
</ha-card>
    `:R``}deleteClick(e){var t,a;this.item&&(t=this.hass,a=this.item,t.callApi("POST","alarmo/users",{user_id:a,remove:!0})).catch(t=>jt(t,e)).then(()=>{this.cancelClick()})}saveClick(e){if(this.data)if(this.data.name.length)if(this.data.code.length<4&&(!this.item||this.data.old_code.length))St(e,Qe("panels.codes.cards.new_user.errors.no_code",this.hass.language));else if(this.data.code!==this.data.confirm_code)St(e,Qe("panels.codes.cards.new_user.errors.code_mismatch",this.hass.language));else if(this.data.is_admin&&(this.data=Object.assign(Object.assign({},this.data),{can_arm:!0,can_disarm:!0})),this.item){let t=Object.assign(Object.assign({},At(this.data,["name","is_admin","can_arm","can_disarm"])),{user_id:this.item});this.data.old_code.length&&(t=Object.assign(Object.assign({},t),{old_code:this.data.old_code,code:this.data.code})),ht(this.hass,t).catch(t=>jt(t,e)).then(()=>{this.cancelClick()})}else ht(this.hass,Ot(this.data,["confirm_code","old_code"])).catch(t=>jt(t,e)).then(()=>{this.cancelClick()});else St(e,Qe("panels.codes.cards.new_user.errors.no_name",this.hass.language))}cancelClick(){De(0,"/alarmo/codes",!0)}};ta.styles=ze,t([Q()],ta.prototype,"hass",void 0),t([Q()],ta.prototype,"narrow",void 0),t([Q()],ta.prototype,"item",void 0),t([Q()],ta.prototype,"data",void 0),ta=t([G("user-editor-card")],ta);let aa=class extends(Tt(re)){constructor(){super(...arguments),this.users={},this.code_arm_required=!1,this.code_disarm_required=!1,this.code_format="number"}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeEvents(()=>this._fetchData(),"alarmo_updated")]}async _fetchData(){if(!this.hass)return;const e=await nt(this.hass);this.config=e,this.code_arm_required=e.code_arm_required,this.code_disarm_required=e.code_disarm_required,this.code_format=e.code_format;const t=await ot(this.hass);this.users=t}render(){return this.hass?this.path&&"new_user"==this.path[0]?R`
      <user-editor-card
        .hass=${this.hass}
        .narrow=${this.narrow}
      >
      </user-editor-card>
    `:this.path&&2==this.path.length&&"edit_user"==this.path[0]?R`
      <user-editor-card
        .hass=${this.hass}
        .narrow=${this.narrow}
        item=${this.path[1]}
      >
      </user-editor-card>
    `:R`
      <ha-card header="${Qe("panels.codes.cards.codes.title",this.hass.language)}">
        <div class="card-content">
          ${Qe("panels.codes.cards.codes.description",this.hass.language)}
        </div>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${Qe("panels.codes.cards.codes.fields.code_arm_required.heading",this.hass.language)}</span>
          <span slot="description">${Qe("panels.codes.cards.codes.fields.code_arm_required.description",this.hass.language)}</span>
          <ha-switch
            ?checked=${this.code_arm_required}
            @change=${e=>{this.code_arm_required=e.target.checked}}
          >
          </ha-switch>
        </settings-row>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${Qe("panels.codes.cards.codes.fields.code_disarm_required.heading",this.hass.language)}</span>
          <span slot="description">${Qe("panels.codes.cards.codes.fields.code_disarm_required.description",this.hass.language)}</span>
          <ha-switch
            ?checked=${this.code_disarm_required}
            @change=${e=>{this.code_disarm_required=e.target.checked}}
          >
          </ha-switch>
        </settings-row>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${Qe("panels.codes.cards.codes.fields.code_format.heading",this.hass.language)}</span>
          <span slot="description">${Qe("panels.codes.cards.codes.fields.code_format.description",this.hass.language)}</span>
          <mwc-button
            class="${"number"==this.code_format?"active":""} ${this.code_arm_required||this.code_disarm_required?"":"disabled"}"
            @click=${()=>{this.code_format="number"}}
            ?disabled=${!this.code_arm_required&&!this.code_disarm_required}
            >${Qe("panels.codes.cards.codes.fields.code_format.code_format_number",this.hass.language)}</mwc-button
          >
          <mwc-button
            class="${"text"==this.code_format?"active":""} ${this.code_arm_required||this.code_disarm_required?"":"disabled"}"
            @click=${()=>{this.code_format="text"}}
            ?disabled=${!this.code_arm_required&&!this.code_disarm_required}
          >
            ${Qe("panels.codes.cards.codes.fields.code_format.code_format_text",this.hass.language)}</mwc-button
          >
        </settings-row>

        <div class="card-actions">
          <mwc-button @click=${this.saveClick}>
            ${this.hass.localize("ui.common.save")}
          </mwc-button>
        </div>
      </ha-card>

      ${this.usersPanel()}
    `:R``}usersPanel(){if(!this.hass)return R``;let e=Object.values(this.users);e.sort((e,t)=>e.name.toLowerCase()<t.name.toLowerCase()?-1:1);const t={icon:{width:"40px"},name:{title:this.hass.localize("ui.components.area-picker.add_dialog.name"),width:"40%",grow:!0,text:!0},remarks:{title:Qe("panels.codes.cards.user_management.table.remarks",this.hass.language),width:"40%",hide:this.narrow,text:!0}},a=e.map(e=>({id:e.user_id,icon:R`<ha-icon icon="mdi:account-outline"></ha-icon>`,name:$t(e.name),remarks:e.is_admin?Qe("panels.codes.cards.user_management.table.administrator",this.hass.language):""}));return R`
      <ha-card header="${Qe("panels.codes.cards.user_management.title",this.hass.language)}">
        <div class="card-content">
          ${Qe("panels.codes.cards.user_management.description",this.hass.language)}
        </div>

      <alarmo-table
        ?selectable=${!0}
        .columns=${t}
        .data=${a}
        @row-click=${e=>{const t=String(e.detail.id);De(0,"/alarmo/codes/edit_user/"+t,!0)}}
      >
        ${Qe("panels.codes.cards.user_management.no_items",this.hass.language)}
      </alarmo-table>
      <div class="card-actions">
        <mwc-button @click=${this.addUserClick}>
          ${Qe("panels.codes.cards.user_management.actions.new_user",this.hass.language)}
        </mwc-button>
      </div>
    </ha-card>
    `}addUserClick(){De(0,"/alarmo/codes/new_user",!0)}saveClick(e){this.hass&&lt(this.hass,{code_arm_required:this.code_arm_required,code_disarm_required:this.code_disarm_required,code_format:this.code_format}).catch(t=>jt(t,e)).then(()=>{})}};aa.styles=ze,t([Q()],aa.prototype,"narrow",void 0),t([Q()],aa.prototype,"path",void 0),t([Q()],aa.prototype,"config",void 0),t([Q()],aa.prototype,"users",void 0),t([Q()],aa.prototype,"code_arm_required",void 0),t([Q()],aa.prototype,"code_disarm_required",void 0),t([Q()],aa.prototype,"code_format",void 0),aa=t([G("alarm-view-codes")],aa);let sa=class extends re{constructor(){super(...arguments),this.label="",this.options=[],this.value=[],this.numOptions=1}firstUpdated(){this.value||(this.value=[]),this.value.length>1&&(this.numOptions=this.value.length)}render(){return R`
      <div class="container">
      ${[...Array(this.numOptions).keys()].map(e=>this.renderSelect(e))}
      </div>
    `}renderSelect(e){return R`
      <div>
      <paper-dropdown-menu
          label=${this.label}
          ?disabled=${this.disabled}
      >
        <paper-listbox
          slot="dropdown-content"
          selected=${this.getSelected(e)}
          @selected-item-changed=${t=>this.selectedChange(t,e)}
        >
          ${this.renderOptions(e)}
        </paper-listbox>
      </paper-dropdown-menu>
      ${this.renderButton(e)}
  </div>`}renderButton(e){return e!=this.numOptions-1||e==this.options.length-1?R`<ha-icon icon="hass:minus" @click=${()=>this.removeOption(e)}></ha-icon>`:this.value&&this.value.length>e?R`<ha-icon icon="hass:plus" @click=${this.addOption}></ha-icon>`:R`<ha-icon class="disabled" icon="hass:plus"></ha-icon>`}renderOptions(e){const t=this.value.slice(0,e).concat(this.value.slice(e+1));return this.options.filter(e=>e.value).map(e=>R`
      <paper-item
    value="${e.value}"
    ?disabled=${t.includes(e.value)}
      >
      ${e.name||e.value}
    </paper-item>
      `)}getSelected(e){return this.options.filter(e=>e.value).findIndex(t=>t.value==this.value[e])}selectedChange(e,t){if(!e.target.selectedItem)return;const a=e.target.selectedItem.getAttribute("value");this.value=this.value.length==t?[...this.value,a]:this.value.slice(0,t).concat(a,this.value.slice(t+1));const s=new CustomEvent("change");this.dispatchEvent(s)}addOption(){this.numOptions=this.numOptions+1}removeOption(e){this.numOptions=this.numOptions-1,e==this.value.length-1?this.value=this.value.slice(0,e):this.value=this.value.slice(0,e).concat(this.value.slice(e+1))}};sa.styles=ie`
    ha-icon {
      padding: 4px;
      display: inline-block;
      vertical-align: bottom;
      cursor: pointer;
    }

    ha-icon.disabled {
      color: var(--disabled-text-color);
    }

    div.container {
      display: flex;
      flex-direction: column;
    }
    `,t([Q()],sa.prototype,"label",void 0),t([Q()],sa.prototype,"options",void 0),t([Q()],sa.prototype,"value",void 0),t([Q({type:Boolean})],sa.prototype,"disabled",void 0),t([Q()],sa.prototype,"numOptions",void 0),sa=t([G("alarmo-multi-select")],sa);const ia=e=>[{value:st.Armed,name:"Alarm is armed",description:"The alarm is succesfully armed",icon:"hass:shield-check-outline",trigger:{state:st.Armed}},{value:st.Disarmed,name:"Alarm is disarmed",description:"The alarm is disarmed",icon:"hass:shield-off-outline",trigger:{state:st.Disarmed}},{value:st.Triggered,name:"Alarm is triggered",description:"The alarm is triggered",icon:"hass:bell-alert-outline",trigger:{state:st.Triggered}},{value:it.ArmFailure,name:"Failed to arm",description:"The arming of the alarm failed due to one or more open sensors",icon:"hass:alert-outline",trigger:{event:it.ArmFailure}},{value:st.Arming,name:"Exit delay started",description:"Exit delay started, ready to leave the house.",icon:"hass:home-export-outline",trigger:{state:st.Arming}},{value:st.Pending,name:"Entry delay started",description:"Entry delay started, the alarm will trigger soon.",icon:"hass:home-import-outline",trigger:{state:st.Pending}}];function na(e){let t=Object.keys(e.services.notify).map(t=>{let a={value:"notify."+t,name:t};const s=e.states["device_tracker."+t.replace("mobile_app_","")];return s&&(a=Object.assign(Object.assign({},a),{name:s.attributes.friendly_name||je(s.entity_id)})),a});return t.sort((e,t)=>e.name.toLowerCase()<t.name.toLowerCase()?-1:1),t}const ra={name:"",triggers:[],actions:[{service:"",service_data:{message:""}}]},oa={name:"",triggers:[],actions:[{service:"",service_data:{}}]};function da(e){if(1!=e.triggers.length)return"";if(e.triggers[0].state)switch(e.triggers[0].state){case st.Armed:return"The alarm is now ON.";case st.Disarmed:return"The alarm is now OFF.";case st.Arming:return"The alarm will be armed soon, please leave the house.";case st.Pending:return"The alarm is about to trigger, disarm it quickly!";case st.Triggered:return"The alarm is triggered! Cause: {{open_sensors}}.";default:return""}else if(e.triggers[0].event)switch(e.triggers[0].event){case it.ArmFailure:return"The alarm could not be armed right now, due to: {{open_sensors}}.";default:return""}return""}const la=["switch","input_boolean","light","script"];function ca(e,t){if(!e.triggers.length)return Qe("panels.actions.validation_errors.no_triggers",t.language);for(let a=0;a<e.triggers.length;a++){const s=e.triggers[a];if(!s.event&&!s.state)return Qe("panels.actions.validation_errors.empty_trigger",t.language);if(!ia().find(e=>JSON.stringify(e.trigger)===JSON.stringify(s)))return Qe("panels.actions.validation_errors.invalid_trigger",t.language,"{trigger}",JSON.stringify(s))}if(void 0!==e.modes&&e.modes.length)for(let a=0;a<e.modes.length;a++){const s=e.modes[a];if(!Object.values(at).includes(s))return Qe("panels.actions.validation_errors.empty_trigger",t.language,"{mode}",s)}if(!e.actions.length)return Qe("panels.actions.validation_errors.no_actions",t.language);for(let a=0;a<e.actions.length;a++){const s=e.actions[a];if(!s.service)return Qe("panels.actions.validation_errors.no_service",t.language);if(!Object.keys(t.services).includes(Se(s.service)))return Qe("panels.actions.validation_errors.invalid_service",t.language,"{service}",s.service);if(!Object.keys(t.services[Se(s.service)]).includes(je(s.service)))return Qe("panels.actions.validation_errors.invalid_service",t.language,"{service}",s.service);if(!s.service_data||!Object.keys(s.service_data).length)return Qe("panels.actions.validation_errors.no_service_data",t.language);if(e.is_notification){if(!Object.keys(s.service_data).includes("message")||!s.service_data.message.length)return Qe("panels.actions.validation_errors.no_message_in_service_data",t.language)}else if(!Object.keys(s.service_data).includes("entity_id"))return Qe("panels.actions.validation_errors.no_entity_in_service_data",t.language)}}let ha=class extends re{constructor(){super(...arguments),this.yamlMode=!1,this.namePlaceholder="",this.areas={}}async firstUpdated(){const e=await mt(this.hass);this.areas=e;const t=await dt(this.hass);if(this.item)t[this.item]&&t[this.item].is_notification?this.data=Ot(t[this.item],["automation_id","is_notification","enabled"]):this.data=Object.assign({},ra);else{this.data=Object.assign({},ra);let t="My notification";const a=await dt(this.hass);if(Object.values(a).find(e=>e.name==t)){let e=2;for(;Object.values(a).find(a=>a.name==`${t} ${e}`);)e++;t=`${t} ${e}`}this.namePlaceholder=t,this.data.area||1!=Object.keys(e).length||(this.data=Object.assign(Object.assign({},this.data),{area:Object.keys(this.areas)[0]}))}}render(){return this.data?R`
<ha-card>
  <div class="card-header">
    <div class="name">
      ${Qe("panels.actions.cards.new_notification.title",this.hass.language)}
    </div>
    <ha-icon-button
      icon="hass:close"
      @click=${this.cancelClick}
    >
    </ha-icon-button>
  </div>
  <div class="card-content">
      ${Qe("panels.actions.cards.new_notification.description",this.hass.language)}
  </div>

  <div style="text-align: right; padding: 0px 16px 16px 16px">
    <mwc-button @click=${this.toggleYaml}>
      ${this.yamlMode?Qe("components.editor.ui_mode",this.hass.language):Qe("components.editor.yaml_mode",this.hass.language)}
    </mwc-button>
  </div>

  ${this.yamlMode?R`
      <ha-yaml-editor
        .label="Label"
        .name="Data"  
        .defaultValue=${this.data}
        @value-changed=${e=>{this.yamlCode=e.detail.value}}
      >
      </ha-yaml-editor>
    `:R`

  <settings-row .narrow=${this.narrow} .large=${!0}>
    <span slot="heading">${Qe("panels.actions.cards.new_notification.fields.event.heading",this.hass.language)}</span>
    <span slot="description">${Qe("panels.actions.cards.new_notification.fields.event.description",this.hass.language)}</span>

    <alarmo-select
      .hass=${this.hass}
      .items=${ia(this.hass)}
      label=${Qe("panels.actions.cards.new_action.fields.event.heading",this.hass.language)}
      icons=${!0}
      .value=${this.data.triggers.map(e=>ia(this.hass).find(t=>JSON.stringify(t.trigger)==JSON.stringify(e)).value)[0]}
      @value-changed=${e=>this.updateTriggers(e.target.value)}
    >
    </alarmo-select>

  </settings-row>
  
  ${this.areas&&Object.keys(this.areas).length>1?R`
  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${Qe("panels.actions.cards.new_action.fields.area.heading",this.hass.language)}</span>
    <span slot="description">${Qe("panels.actions.cards.new_action.fields.area.description",this.hass.language)}</span>

    <alarmo-select
      .items=${Object.values(this.areas).map(e=>Object({value:e.area_id,name:e.name}))}
      value=${this.data.area||""}
      clearable=${!0}
      label=${Qe("panels.sensors.cards.editor.fields.area.heading",this.hass.language)}
      @value-changed=${e=>this.data={...this.data,area:e.target.value}}
    </alarmo-select>
  </settings-row>`:""}

  <div class="separator"></div>

  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${Qe("panels.actions.cards.new_notification.fields.mode.heading",this.hass.language)}</span>
    <span slot="description">${Qe("panels.actions.cards.new_notification.fields.mode.description",this.hass.language)}</span>

    <alarmo-multi-select
      label=${Qe("panels.actions.cards.new_notification.fields.mode.heading",this.hass.language)}
      ?disabled=${!this.data.triggers.length||this.data.triggers.some(e=>e.state&&e.state==st.Disarmed)}
      .options=${this.getModeList()}
      .value=${this.data.modes||[]}
      @change=${e=>this.updateModes(e.target.value)}
    </alarmo-multi-select>

  </settings-row>
  
  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${Qe("panels.actions.cards.new_notification.fields.title.heading",this.hass.language)}</span>
    <span slot="description">${Qe("panels.actions.cards.new_notification.fields.title.description",this.hass.language)}</span>

    <paper-input
      label="${Qe("panels.actions.cards.new_notification.fields.title.heading",this.hass.language)}"
      placeholder=""
      value=${this.data.actions[0].service_data.title||""}
      @change=${e=>this.updateTitle(e.target.value)}
    >
    </paper-input>
  </settings-row>

    <settings-row .narrow=${this.narrow} .large=${!0}>
    <span slot="heading">${Qe("panels.actions.cards.new_notification.fields.message.heading",this.hass.language)}</span>
    <span slot="description">${Qe("panels.actions.cards.new_notification.fields.message.description",this.hass.language)}</span>

    <paper-textarea
      label="${Qe("panels.actions.cards.new_notification.fields.message.heading",this.hass.language)}"
      placeholder=${da(this.data)}
      value=${this.data.actions[0].service_data.message||""}
      @blur=${e=>{this.updateMessage(e.target.value)}}
    >
    </paper-textarea>
  </settings-row>

  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${Qe("panels.actions.cards.new_notification.fields.target.heading",this.hass.language)}</span>
    <span slot="description">${Qe("panels.actions.cards.new_notification.fields.target.description",this.hass.language)}</span>

    <alarmo-multi-select
      label=${Qe("panels.actions.cards.new_notification.fields.target.heading",this.hass.language)}
      .options=${this.getTargetList()}
      .value=${this.data.actions.map(e=>e.service)}
      @change=${e=>this.updateTargets(e.target.value)}
    </alarmo-multi-select>
  </settings-row>

  <settings-row .narrow=${this.narrow} .large=${!0}>
    <span slot="heading">${Qe("panels.actions.cards.new_notification.fields.name.heading",this.hass.language)}</span>
    <span slot="description">${Qe("panels.actions.cards.new_notification.fields.name.description",this.hass.language)}</span>

    <paper-input
      label="${Qe("panels.actions.cards.new_notification.fields.name.heading",this.hass.language)}"
      placeholder=${this.namePlaceholder}
      value=${this.data.name}
      @change=${e=>this.data={...this.data,name:e.target.value}}
    >
    </paper-input>
  </settings-row>
  `}
        
  <div class="card-actions">
    <mwc-button @click=${this.saveClick}>
      ${this.hass.localize("ui.common.save")}
    </mwc-button>

  ${this.item?R`
    <mwc-button
      class="warning"
      @click=${this.deleteClick}
    >
      ${this.hass.localize("ui.common.delete")}
    </mwc-button>`:""}
  </div>
</ha-card>
    `:R``}getTargetList(){return[...Object.values(na(this.hass)),,...this.data.actions.filter(e=>!na(this.hass).find(t=>t.value==e.service)).map(e=>Object({value:e.service}))]}getModeList(){var e;return((null===(e=this.data)||void 0===e?void 0:e.area)?Object.entries(this.areas[this.data.area].modes).filter(([,e])=>e.enabled).map(([e])=>e):Object.values(this.areas).map(e=>Object.entries(e.modes).filter(([,e])=>e.enabled).map(([e])=>e)).reduce((e,t)=>e.filter(e=>t.includes(e)))).map(e=>Object({name:Qe("common.modes_long."+e,this.hass.language),value:e}))}updateTriggers(e){this.data=Object.assign(Object.assign({},this.data),{triggers:[ia(this.hass).find(t=>t.value==e).trigger]})}updateModes(e){this.data=Object.assign(Object.assign({},this.data),{modes:e})}updateTitle(e){this.data=Object.assign(Object.assign({},this.data),{actions:this.data.actions.map(t=>Object(Object.assign(Object.assign({},t),{service_data:Object.assign(Object.assign({},t.service_data),{title:e})})))})}updateMessage(e){this.data=Object.assign(Object.assign({},this.data),{actions:this.data.actions.map(t=>Object(Object.assign(Object.assign({},t),{service_data:Object.assign(Object.assign({},t.service_data),{message:e})})))})}updateTargets(e){this.data=Object.assign(Object.assign({},this.data),{actions:e.map(e=>Object({service:e,service_data:Object.assign({},this.data.actions[0].service_data)}))})}deleteClick(e){this.item&&ut(this.hass,this.item).catch(t=>jt(t,e)).then(()=>{this.cancelClick()})}async saveClick(e){let t=this.yamlMode?Object.assign({},this.yamlCode):this.data;t=Object.assign(Object.assign({},t),{is_notification:!0,actions:t.actions.map(e=>!e.service_data||e.service_data.message&&e.service_data.message.length?e:Object.assign(Object.assign({},e),{service_data:Object.assign(Object.assign({},e.service_data),{message:da(t)})})),name:t.name||this.namePlaceholder,area:t.area||""});const a=ca(t,this.hass);a?St(e,a):(this.item&&(t=Object.assign(Object.assign({},t),{automation_id:this.item})),pt(this.hass,t).catch(t=>jt(t,e)).then(()=>{this.cancelClick()}))}toggleYaml(){this.data&&(this.yamlMode=!this.yamlMode,!this.yamlMode&&this.yamlCode?this.data=Object.assign({},this.yamlCode):this.yamlCode=Object.assign({},this.data))}cancelClick(){De(0,"/alarmo/actions",!0)}};ha.styles=ze,t([Q()],ha.prototype,"narrow",void 0),t([Q()],ha.prototype,"item",void 0),t([Q()],ha.prototype,"data",void 0),t([Q()],ha.prototype,"yamlMode",void 0),t([Q()],ha.prototype,"namePlaceholder",void 0),t([Q()],ha.prototype,"areas",void 0),ha=t([G("notification-editor-card")],ha);let pa=class extends re{constructor(){super(...arguments),this.includeDomains=[],this.options=[],this.value=[],this.numOptions=1}firstUpdated(){this.value.length>1&&(this.numOptions=this.value.length)}render(){return this.hass?R`
      <div class="container">
      ${[...Array(this.numOptions).keys()].map(e=>this.renderSelect(e))}
      </div>
    `:R``}renderSelect(e){return R`
      <div class="container-item">
        <div class="dropdown-holder">
          <ha-entity-picker
            @change=${t=>{this.selectedChange(t,e)}}
            .includeDomains=${this.includeDomains}
            .hass=${this.hass}
            value=${this.getValue(e)}
            .allowCustomEntity=${!0}
          ></ha-entity-picker>
        </div>
        <div class="icon-holder">
          ${this.renderButton(e)}
        </div>
      </div>`}renderButton(e){return e!=this.numOptions-1||e==this.options.length-1?R`<ha-icon icon="hass:minus" @click=${()=>this.removeOption(e)}></ha-icon>`:this.value&&this.value.length>e?R`<ha-icon icon="hass:plus" @click=${this.addOption}></ha-icon>`:R`<ha-icon class="disabled" icon="hass:plus"></ha-icon>`}getValue(e){return e>this.value.length-1?"":this.value[e]}entityFilter(e,t){return!this.value.slice(0,t).concat(this.value.slice(t+1)).includes(e)}selectedChange(e,t){let a=e.target.value;if(!this.entityFilter(a,t))return void this.removeOption(t);const s=this.value.length==t?[...this.value,a]:this.value.slice(0,t).concat(a,this.value.slice(t+1));this.value=s.filter(e=>e);const i=new CustomEvent("change");this.dispatchEvent(i)}addOption(){this.numOptions=this.numOptions+1}removeOption(e){this.numOptions=this.numOptions-1,e==this.value.length-1?this.value=this.value.slice(0,e):this.value=this.value.slice(0,e).concat(this.value.slice(e+1))}};pa.styles=ie`
    ha-icon {
      padding: 4px;
      display: inline-block;
      vertical-align: bottom;
      cursor: pointer;
    }

    ha-icon.disabled {
      color: var(--disabled-text-color);
    }

    div.container {
      display: flex;
      flex-direction: column;
    }

    div.container-item {
      display: grid;
      grid-template-columns: 1fr max-content;
      grid-template-rows: min-content;
      grid-template-areas: "dropdown icon";
      align-items: flex-end;
    }

    div.dropdown-holder {
      grid-area: dropdown;
    }
    div.icon-holder {
      grid-area: icon;
    }
    `,t([Q()],pa.prototype,"includeDomains",void 0),t([Q()],pa.prototype,"options",void 0),t([Q()],pa.prototype,"value",void 0),t([Q()],pa.prototype,"numOptions",void 0),pa=t([G("alarmo-multi-entity-select")],pa);let ua=class extends re{constructor(){super(...arguments),this.yamlMode=!1,this.namePlaceholder="",this.areas={}}async firstUpdated(){const e=await mt(this.hass);this.areas=e;const t=await dt(this.hass);if(this.item)t[this.item]&&!t[this.item].is_notification?this.data=Ot(t[this.item],["automation_id","is_notification","enabled"]):this.data=Object.assign({},oa);else{this.data=Object.assign({},oa);let t="My notification";const a=await dt(this.hass);if(Object.values(a).find(e=>e.name==t)){let e=2;for(;Object.values(a).find(a=>a.name==`${t} ${e}`);)e++;t=`${t} ${e}`}this.namePlaceholder=t,this.data.area||1!=Object.keys(e).length||(this.data=Object.assign(Object.assign({},this.data),{area:Object.keys(this.areas)[0]}))}}render(){return this.data?R`
<ha-card>
  <div class="card-header">
    <div class="name">
      ${Qe("panels.actions.cards.new_action.title",this.hass.language)}
    </div>
    <ha-icon-button
      icon="hass:close"
      @click=${this.cancelClick}
    >
    </ha-icon-button>
  </div>
  <div class="card-content">
      ${Qe("panels.actions.cards.new_action.description",this.hass.language)}
  </div>

  <div style="text-align: right; padding: 0px 16px 16px 16px">
    <mwc-button @click=${this.toggleYaml}>
      ${this.yamlMode?Qe("components.editor.ui_mode",this.hass.language):Qe("components.editor.yaml_mode",this.hass.language)}
    </mwc-button>
  </div>

  ${this.yamlMode?R`
      <ha-yaml-editor
        .label="Label"
        .name="Data"  
        .defaultValue=${this.data}
        @value-changed=${e=>{this.yamlCode=e.detail.value}}
      >
      </ha-yaml-editor>
    `:R`

  <settings-row .narrow=${this.narrow} .large=${!0}>
    <span slot="heading">${Qe("panels.actions.cards.new_action.fields.event.heading",this.hass.language)}</span>
    <span slot="description">${Qe("panels.actions.cards.new_action.fields.event.description",this.hass.language)}</span>

    <alarmo-select
      .hass=${this.hass}
      .items=${ia(this.hass)}
      label=${Qe("panels.actions.cards.new_action.fields.event.heading",this.hass.language)}
      icons=${!0}
      .value=${this.data.triggers.map(e=>ia(this.hass).find(t=>JSON.stringify(t.trigger)==JSON.stringify(e)).value)[0]}
      @value-changed=${e=>this.updateTriggers(e.target.value)}
    >
    </alarmo-select>

  </settings-row>

  ${this.areas&&Object.keys(this.areas).length>1?R`
  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${Qe("panels.actions.cards.new_action.fields.area.heading",this.hass.language)}</span>
    <span slot="description">${Qe("panels.actions.cards.new_action.fields.area.description",this.hass.language)}</span>

    <alarmo-select
      .items=${Object.values(this.areas).map(e=>Object({value:e.area_id,name:e.name}))}
      value=${this.data.area||""}
      clearable=${!0}
      label=${Qe("panels.sensors.cards.editor.fields.area.heading",this.hass.language)}
      @value-changed=${e=>this.data={...this.data,area:e.target.value}}
    </alarmo-select>
  </settings-row>`:""}

  <div class="separator"></div>

  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${Qe("panels.actions.cards.new_action.fields.mode.heading",this.hass.language)}</span>
    <span slot="description">${Qe("panels.actions.cards.new_action.fields.mode.description",this.hass.language)}</span>

    <alarmo-multi-select
      label=${Qe("panels.actions.cards.new_action.fields.mode.heading",this.hass.language)}
      ?disabled=${!this.data.triggers.length||this.data.triggers.some(e=>e.state&&e.state==st.Disarmed)}
      .options=${this.getModeList()}
      .value=${this.data.modes||[]}
      @change=${e=>this.updateModes(e.target.value)}
    </alarmo-multi-select>

  </settings-row>

  <settings-row .narrow=${this.narrow} .large=${!0}>
    <span slot="heading">${Qe("panels.actions.cards.new_action.fields.entity.heading",this.hass.language)}</span>
    <span slot="description">${Qe("panels.actions.cards.new_action.fields.entity.description",this.hass.language)}</span>

    <alarmo-multi-entity-select
      .hass=${this.hass}
      .includeDomains=${la}
      .value=${this.getEntityValues()}
      @change=${e=>this.updateEntities(e.target.value)}
    ></alarmo-multi-entity-select>
  </settings-row>

  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${Qe("panels.actions.cards.new_action.fields.action.heading",this.hass.language)}</span>
    <span slot="description">${Qe("panels.actions.cards.new_action.fields.action.description",this.hass.language)}</span>
    <div>
    <mwc-button
      class="${"turn_on"==this.getAction()?"active":""}"
      @click=${()=>{this.updateAction("turn_on")}}
      >
        ${Qe("panels.actions.cards.new_action.fields.action.turn_on",this.hass.language)}
      </mwc-button>
    <mwc-button
      class="${"turn_off"==this.getAction()?"active":""}"
      @click=${()=>{this.updateAction("turn_off")}}
    >
      ${Qe("panels.actions.cards.new_action.fields.action.turn_off",this.hass.language)}
    </mwc-button>
    </div>
  </settings-row>

  <settings-row .narrow=${this.narrow} .large=${!0}>
    <span slot="heading">${Qe("panels.actions.cards.new_action.fields.name.heading",this.hass.language)}</span>
    <span slot="description">${Qe("panels.actions.cards.new_action.fields.name.description",this.hass.language)}</span>

    <paper-input
      label="${Qe("panels.actions.cards.new_action.fields.name.heading",this.hass.language)}"
      placeholder=""
      value=${this.data.name}
      @change=${e=>this.data={...this.data,name:e.target.value}}
    >
    </paper-input>
  </settings-row>

  `}
        
  <div class="card-actions">
    <mwc-button @click=${this.saveClick}>
      ${this.hass.localize("ui.common.save")}
    </mwc-button>

  ${this.item?R`
    <mwc-button
      class="warning"
      @click=${this.deleteClick}
    >
      ${this.hass.localize("ui.common.delete")}
    </mwc-button>`:""}
  </div>
</ha-card>
    `:R``}getEntityValues(){var e;return null===(e=this.data)||void 0===e?void 0:e.actions.map(e=>{var t;return null===(t=e.service_data)||void 0===t?void 0:t.entity_id}).filter(e=>e)}getModeList(){var e;return((null===(e=this.data)||void 0===e?void 0:e.area)?Object.entries(this.areas[this.data.area].modes).filter(([,e])=>e.enabled).map(([e])=>e):Object.values(this.areas).map(e=>Object.entries(e.modes).filter(([,e])=>e.enabled).map(([e])=>e)).reduce((e,t)=>e.filter(e=>t.includes(e)))).map(e=>Object({name:Qe("common.modes_long."+e,this.hass.language),value:e}))}updateTriggers(e){this.data=Object.assign(Object.assign({},this.data),{triggers:[ia(this.hass).find(t=>t.value==e).trigger]})}updateModes(e){this.data=Object.assign(Object.assign({},this.data),{modes:e})}updateEntities(e){var t;const a=this.getAction();let s=[...(null===(t=this.data)||void 0===t?void 0:t.actions)||[]];e.forEach((e,t)=>{var i;t<s.length&&Se(s[t].service||(null===(i=s[t].service_data)||void 0===i?void 0:i.entity_id)||"")==Se(e[t])?s[t]=Object.assign(Object.assign({},s[t]),{service_data:Object.assign(Object.assign({},s[t].service_data),{entity_id:e})}):t<s.length?s[t]={service:a?Se(e)+"."+a:"",service_data:{entity_id:e}}:s.push({service:a?Se(e)+"."+a:"",service_data:{entity_id:e}})}),this.data=Object.assign(Object.assign({},this.data),{actions:s})}getAction(){var e;const t=(null===(e=this.data)||void 0===e?void 0:e.actions.map(e=>je(e.service)).filter(e=>e))||[];return 1==xt(t).length?t[0]:""}updateAction(e){this.data=Object.assign(Object.assign({},this.data),{actions:this.data.actions.map(t=>{var a;return Object(Object.assign(Object.assign({},t),{service:(Se((null===(a=t.service_data)||void 0===a?void 0:a.entity_id)||"")||"homeassistant")+"."+e}))})})}deleteClick(e){this.item&&ut(this.hass,this.item).catch(t=>jt(t,e)).then(()=>{this.cancelClick()})}saveClick(e){let t=this.yamlMode?Object.assign({},this.yamlCode):this.data;t=Object.assign(Object.assign({},t),{name:t.name||this.namePlaceholder});const a=ca(t,this.hass);a?St(e,a):(this.item&&(t=Object.assign(Object.assign({},t),{automation_id:this.item})),pt(this.hass,t).catch(t=>jt(t,e)).then(()=>{this.cancelClick()}))}toggleYaml(){this.data&&(this.yamlMode=!this.yamlMode,!this.yamlMode&&this.yamlCode?this.data=Object.assign({},this.yamlCode):this.yamlCode=Object.assign({},this.data))}cancelClick(){De(0,"/alarmo/actions",!0)}};ua.styles=ze,t([Q()],ua.prototype,"narrow",void 0),t([Q()],ua.prototype,"item",void 0),t([Q()],ua.prototype,"data",void 0),t([Q()],ua.prototype,"yamlMode",void 0),t([Q()],ua.prototype,"namePlaceholder",void 0),t([Q()],ua.prototype,"areas",void 0),ua=t([G("automation-editor-card")],ua);let ma=class extends(Tt(re)){constructor(){super(...arguments),this.automations=[],this.areas={},this.notificationFilterOptions=[],this.automationFilterOptions=[]}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeEvents(()=>this._fetchData(),"alarmo_updated")]}async _fetchData(){if(!this.hass)return;const e=await dt(this.hass);this.automations=Object.values(e),this.areas=await mt(this.hass),this.notificationFilterOptions=[{value:"no_area",name:Qe("panels.actions.cards.notifications.filter.no_area",this.hass.language),count:Object.values(this.automations).filter(e=>e.is_notification&&!e.area).length}].concat(Object.values(this.areas).map(e=>Object({value:e.area_id,name:e.name,count:Object.values(this.automations).filter(t=>t.is_notification&&t.area==e.area_id).length})).sort((e,t)=>e.name.toLowerCase()<t.name.toLowerCase()?-1:1)),this.automationFilterOptions=[{value:"no_area",name:Qe("panels.actions.cards.notifications.filter.no_area",this.hass.language),count:Object.values(this.automations).filter(e=>!e.is_notification&&!e.area).length}].concat(Object.values(this.areas).map(e=>Object({value:e.area_id,name:e.name,count:Object.values(this.automations).filter(t=>!t.is_notification&&t.area==e.area_id).length})).sort((e,t)=>e.name.toLowerCase()<t.name.toLowerCase()?-1:1))}firstUpdated(){this.path&&2==this.path.length&&"filter"==this.path[0]&&(this.notificationFilter=this.path[1],this.automationFilter=this.path[1])}render(){if(!this.hass)return R``;if(this.path&&this.path.length&&"new_notification"==this.path[0])return R`
        <notification-editor-card
          .hass=${this.hass}
          .narrow=${this.narrow}
        >

        </notification-editor-card>
      `;if(this.path&&2==this.path.length&&"edit_notification"==this.path[0])return R`
        <notification-editor-card
          .hass=${this.hass}
          .narrow=${this.narrow}
          item=${this.path[1]}
        >

        </notification-editor-card>
      `;if(this.path&&this.path.length&&"new_action"==this.path[0])return R`
        <automation-editor-card
          .hass=${this.hass}
          .narrow=${this.narrow}
        >

        </automation-editor-card>
      `;if(this.path&&2==this.path.length&&"edit_action"==this.path[0])return R`
        <automation-editor-card
          .hass=${this.hass}
          .narrow=${this.narrow}
          item=${this.path[1]}
        >

        </automation-editor-card>
      `;{const e={type:{width:"40px"},name:{title:this.hass.localize("ui.components.area-picker.add_dialog.name"),width:"40%",grow:!0,text:!0},enabled:{title:Qe("panels.actions.cards.notifications.table.enabled",this.hass.language),width:"68px",align:"center"}},t=this.automations.filter(e=>e.is_notification).filter(e=>!this.notificationFilter||!this.notificationFilterOptions.find(e=>e.value==this.notificationFilter)||e.area==this.notificationFilter||"no_area"===this.notificationFilter&&!e.area).map(e=>Object({id:e.automation_id,type:R`<ha-icon icon="hass:message-text-outline"></ha-icon>`,name:e.name,enabled:R`<ha-switch
        ?checked=${e.enabled}
        @click=${t=>{t.stopPropagation(),this.toggleEnable(t,e.automation_id)}}
      ></ha-switch>`})),a=this.automations.filter(e=>!e.is_notification).filter(e=>!this.automationFilter||!this.automationFilterOptions.find(e=>e.value==this.automationFilter)||e.area==this.automationFilter||"no_area"===this.automationFilter&&!e.area).map(e=>Object({id:e.automation_id,type:R`<ha-icon icon="hass:flash"></ha-icon>`,name:e.name,enabled:R`<ha-switch
        ?checked=${e.enabled}
        @click=${t=>{t.stopPropagation(),this.toggleEnable(t,e.automation_id)}}
      ></ha-switch>`}));return R`

      <ha-card header="${Qe("panels.actions.cards.notifications.title",this.hass.language)}">
      <div class="card-content">${Qe("panels.actions.cards.notifications.description",this.hass.language)}</div>
      
      ${this.notificationFilterOptions.length>1?R`
      <div class="table-filter" ?narrow=${this.narrow}>
      <span class="header">${Qe("panels.actions.cards.notifications.filter.label",this.hass.language)}:</span>
       <alarmo-chips
         .items=${this.notificationFilterOptions}
         value=${this.notificationFilter}
         @value-changed=${e=>this.notificationFilter=e.target.value}
       >
       </alarmo-chips>
     </div>
     `:""}
      <alarmo-table
        ?selectable=${!0}
        .columns=${e}
        .data=${t}
        @row-click=${e=>{const t=String(e.detail.id);De(0,"/alarmo/actions/edit_notification/"+t,!0)}}
      >
        ${Qe("panels.actions.cards.notifications.table.no_items",this.hass.language)}
      </alarmo-table>

        <div class="card-actions">
          <mwc-button
            @click=${this.addNotificationClick}
          >
            ${Qe("panels.actions.cards.notifications.actions.new_notification",this.hass.language)}
          </mwc-button>
        </div>
      </ha-card>

      
      <ha-card header="${Qe("panels.actions.cards.actions.title",this.hass.language)}">
        <div class="card-content">${Qe("panels.actions.cards.actions.description",this.hass.language)}</div>
      
        ${this.automationFilterOptions.length>1?R`
        <div class="table-filter" ?narrow=${this.narrow}>
        <span class="header">${Qe("panels.actions.cards.notifications.filter.label",this.hass.language)}:</span>
         <alarmo-chips
           .items=${this.automationFilterOptions}
           value=${this.automationFilter}
           @value-changed=${e=>this.automationFilter=e.target.value}
         >
         </alarmo-chips>
       </div>
       `:""}
      <alarmo-table
        ?selectable=${!0}
        .columns=${e}
        .data=${a}
        @row-click=${e=>{const t=String(e.detail.id);De(0,"/alarmo/actions/edit_action/"+t,!0)}}
      >
        ${Qe("panels.actions.cards.actions.table.no_items",this.hass.language)}
      </alarmo-table>

        <div class="card-actions">
          <mwc-button
            @click=${this.addActionClick}
          >
            ${Qe("panels.actions.cards.actions.actions.new_action",this.hass.language)}
          </mwc-button>
        </div>
      </ha-card>
    `}}toggleEnable(e,t){pt(this.hass,{automation_id:t,enabled:!e.target.checked}).catch(t=>jt(t,e)).then(()=>{})}addNotificationClick(){De(0,"/alarmo/actions/new_notification",!0)}addActionClick(){De(0,"/alarmo/actions/new_action",!0)}};ma.styles=ze,t([Q()],ma.prototype,"hass",void 0),t([Q()],ma.prototype,"narrow",void 0),t([Q()],ma.prototype,"path",void 0),t([Q()],ma.prototype,"alarmEntity",void 0),t([Q()],ma.prototype,"automations",void 0),t([Q()],ma.prototype,"areas",void 0),t([Q()],ma.prototype,"notificationFilter",void 0),t([Q()],ma.prototype,"automationFilter",void 0),t([Q()],ma.prototype,"notificationFilterOptions",void 0),t([Q()],ma.prototype,"automationFilterOptions",void 0),ma=t([G("alarm-view-actions")],ma),e.MyAlarmPanel=class extends re{async firstUpdated(){window.addEventListener("location-changed",()=>{this.requestUpdate()}),await qe(),this.userConfig=await ot(this.hass),this.requestUpdate()}render(){if(!customElements.get("ha-app-layout")||!this.userConfig)return R`loading...`;const e=Object.values(this.userConfig).find(e=>e.name.toLowerCase()==this.hass.user.name.toLowerCase());return this.hass.user.is_admin||e&&e.is_admin?R`
      <ha-app-layout>
        <app-header fixed slot="header">
          <app-toolbar>
            <ha-menu-button
              .hass=${this.hass}
              .narrow=${this.narrow}
            >
            </ha-menu-button>
            <div main-title>
              Alarm panel
            </div>
            <div class="version">
              v${"1.5.0"}
            </div>
          </app-toolbar>
          <paper-tabs
            scrollable
            attr-for-selected="page-name"
            .selected=${this.getPath()}
            @iron-activate=${this.handlePageSelected}
          >
            <paper-tab page-name="general">
              General
            </paper-tab>
            <paper-tab page-name="sensors">
              sensors
            </paper-tab>
            <paper-tab page-name="codes">
              Codes
            </paper-tab>
            <paper-tab page-name="actions">
              actions
            </paper-tab>
          </paper-tabs>
        </app-header>
      </ha-app-layout>
      <div class="view">
        ${this.getView()}
      </div>
    `:R`
      <ha-app-layout>
        <app-header fixed slot="header">
          <app-toolbar>
            <ha-menu-button
              .hass=${this.hass}
              .narrow=${this.narrow}
            >
            </ha-menu-button>
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
              You have no access to view this page.
              Please check the following:
              <ul>
                <li>
                  You are logged in using HA user account <b>${this.hass.user.name}</b>.
                  This account <b>${this.hass.user.is_admin?"does":"does NOT"}</b> have administrator permission.
                </li>
              </ul>
              <ul>
                <li>
                  There is <b>${e?"a":"NO"}</b> user configured in Alarmo with name <b>${this.hass.user.name}</b>.
                  ${e?`This user ${e.is_admin?"does":"does NOT"}</b> have administrator permission. `:""}
                </li>
              </ul>
            </div>
          </ha-card>
        </div>
      </div>
      `}getPath(){return window.location.pathname.split("/")}getView(){const e=this.getPath(),t=e[2]||"general",a=e.slice(3);switch(t){case"general":return R`
        <alarm-view-general
          .hass=${this.hass}
          .narrow=${this.narrow}
          .path=${a.length?a:null}
        ></alarm-view-general>
      `;case"sensors":return R`
        <alarm-view-sensors
          .hass=${this.hass}
          .narrow=${this.narrow}
          .path=${a.length?a:null}
        >
        </alarm-view-sensors>
      `;case"codes":return R`
        <alarm-view-codes
          .hass=${this.hass}
          .narrow=${this.narrow}
          .path=${a.length?a:null}
        >
        </alarm-view-codes>
      `;case"actions":return R`
        <alarm-view-actions
          .hass=${this.hass}
          .narrow=${this.narrow}
          .path=${a.length?a:null}
        >
        </alarm-view-actions>
      `;default:return R`no view`}}handlePageSelected(e){const t=e.detail.item.getAttribute("page-name");t!==this.getPath()?(De(0,"/alarmo/"+t),this.requestUpdate()):scrollTo(0,0)}static get styles(){return ie`
      ${ze}

      :host {
        color: var(--primary-text-color);
        --paper-card-header-color: var(--primary-text-color);
      }

      ha-app-layout,
      app-toolbar,
      paper-tabs {
        background: var(--primary-color);
        color: var(--text-primary-color);
      }

      ha-app-layout {
        display: block;
        z-index: 2;
      }

      paper-tabs {
        --paper-tabs-selection-bar-color: #fff;
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
    `}},t([Q()],e.MyAlarmPanel.prototype,"hass",void 0),t([Q({type:Boolean,reflect:!0})],e.MyAlarmPanel.prototype,"narrow",void 0),t([Q()],e.MyAlarmPanel.prototype,"userConfig",void 0),e.MyAlarmPanel=t([G("alarm-panel")],e.MyAlarmPanel)}({});
