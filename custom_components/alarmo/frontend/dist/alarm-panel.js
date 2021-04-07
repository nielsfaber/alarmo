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
    ***************************************************************************** */function a(e,a,t,i){var s,n=arguments.length,r=n<3?a:null===i?i=Object.getOwnPropertyDescriptor(a,t):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,a,t,i);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(r=(n<3?s(r):n>3?s(a,t,r):s(a,t))||r);return n>3&&r&&Object.defineProperty(a,t,r),r
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
     */}const t="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,i=(e,a,t=null)=>{for(;a!==t;){const t=a.nextSibling;e.removeChild(a),a=t}},s=`{{lit-${String(Math.random()).slice(2)}}}`,n=`\x3c!--${s}--\x3e`,r=new RegExp(`${s}|${n}`);class o{constructor(e,a){this.parts=[],this.element=a;const t=[],i=[],n=document.createTreeWalker(a.content,133,null,!1);let o=0,l=-1,u=0;const{strings:m,values:{length:p}}=e;for(;u<p;){const e=n.nextNode();if(null!==e){if(l++,1===e.nodeType){if(e.hasAttributes()){const a=e.attributes,{length:t}=a;let i=0;for(let e=0;e<t;e++)d(a[e].name,"$lit$")&&i++;for(;i-- >0;){const a=m[u],t=h.exec(a)[2],i=t.toLowerCase()+"$lit$",s=e.getAttribute(i);e.removeAttribute(i);const n=s.split(r);this.parts.push({type:"attribute",index:l,name:t,strings:n}),u+=n.length-1}}"TEMPLATE"===e.tagName&&(i.push(e),n.currentNode=e.content)}else if(3===e.nodeType){const a=e.data;if(a.indexOf(s)>=0){const i=e.parentNode,s=a.split(r),n=s.length-1;for(let a=0;a<n;a++){let t,n=s[a];if(""===n)t=c();else{const e=h.exec(n);null!==e&&d(e[2],"$lit$")&&(n=n.slice(0,e.index)+e[1]+e[2].slice(0,-"$lit$".length)+e[3]),t=document.createTextNode(n)}i.insertBefore(t,e),this.parts.push({type:"node",index:++l})}""===s[n]?(i.insertBefore(c(),e),t.push(e)):e.data=s[n],u+=n}}else if(8===e.nodeType)if(e.data===s){const a=e.parentNode;null!==e.previousSibling&&l!==o||(l++,a.insertBefore(c(),e)),o=l,this.parts.push({type:"node",index:l}),null===e.nextSibling?e.data="":(t.push(e),l--),u++}else{let a=-1;for(;-1!==(a=e.data.indexOf(s,a+1));)this.parts.push({type:"node",index:-1}),u++}}else n.currentNode=i.pop()}for(const e of t)e.parentNode.removeChild(e)}}const d=(e,a)=>{const t=e.length-a.length;return t>=0&&e.slice(t)===a},l=e=>-1!==e.index,c=()=>document.createComment(""),h=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function u(e,a){const{element:{content:t},parts:i}=e,s=document.createTreeWalker(t,133,null,!1);let n=p(i),r=i[n],o=-1,d=0;const l=[];let c=null;for(;s.nextNode();){o++;const e=s.currentNode;for(e.previousSibling===c&&(c=null),a.has(e)&&(l.push(e),null===c&&(c=e)),null!==c&&d++;void 0!==r&&r.index===o;)r.index=null!==c?-1:r.index-d,n=p(i,n),r=i[n]}l.forEach(e=>e.parentNode.removeChild(e))}const m=e=>{let a=11===e.nodeType?0:1;const t=document.createTreeWalker(e,133,null,!1);for(;t.nextNode();)a++;return a},p=(e,a=-1)=>{for(let t=a+1;t<e.length;t++){const a=e[t];if(l(a))return t}return-1};
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
class b{constructor(e,a,t){this.__parts=[],this.template=e,this.processor=a,this.options=t}update(e){let a=0;for(const t of this.__parts)void 0!==t&&t.setValue(e[a]),a++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=t?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),a=[],i=this.template.parts,s=document.createTreeWalker(e,133,null,!1);let n,r=0,o=0,d=s.nextNode();for(;r<i.length;)if(n=i[r],l(n)){for(;o<n.index;)o++,"TEMPLATE"===d.nodeName&&(a.push(d),s.currentNode=d.content),null===(d=s.nextNode())&&(s.currentNode=a.pop(),d=s.nextNode());if("node"===n.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(d.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(d,n.name,n.strings,this.options));r++}else this.__parts.push(void 0),r++;return t&&(document.adoptNode(e),customElements.upgrade(e)),e}}
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
     */const w=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),y=` ${s} `;class ${constructor(e,a,t,i){this.strings=e,this.values=a,this.type=t,this.processor=i}getHTML(){const e=this.strings.length-1;let a="",t=!1;for(let i=0;i<e;i++){const e=this.strings[i],r=e.lastIndexOf("\x3c!--");t=(r>-1||t)&&-1===e.indexOf("--\x3e",r+1);const o=h.exec(e);a+=null===o?e+(t?y:n):e.substr(0,o.index)+o[1]+o[2]+"$lit$"+o[3]+s}return a+=this.strings[e],a}getTemplateElement(){const e=document.createElement("template");let a=this.getHTML();return void 0!==w&&(a=w.createHTML(a)),e.innerHTML=a,e}}
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
     */const k=e=>null===e||!("object"==typeof e||"function"==typeof e),A=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class x{constructor(e,a,t){this.dirty=!0,this.element=e,this.name=a,this.strings=t,this.parts=[];for(let e=0;e<t.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new S(this)}_getValue(){const e=this.strings,a=e.length-1,t=this.parts;if(1===a&&""===e[0]&&""===e[1]){const e=t[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!A(e))return e}let i="";for(let s=0;s<a;s++){i+=e[s];const a=t[s];if(void 0!==a){const e=a.value;if(k(e)||!A(e))i+="string"==typeof e?e:String(e);else for(const a of e)i+="string"==typeof a?a:String(a)}}return i+=e[a],i}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class S{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===_||k(e)&&e===this.value||(this.value=e,v(e)||(this.committer.dirty=!0))}commit(){for(;v(this.value);){const e=this.value;this.value=_,e(this)}this.value!==_&&this.committer.commit()}}class O{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(c()),this.endNode=e.appendChild(c())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=c()),e.__insert(this.endNode=c())}insertAfterPart(e){e.__insert(this.startNode=c()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;v(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=_,e(this)}const e=this.__pendingValue;e!==_&&(k(e)?e!==this.value&&this.__commitText(e):e instanceof $?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):A(e)?this.__commitIterable(e):e===f?(this.value=f,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const a=this.startNode.nextSibling,t="string"==typeof(e=null==e?"":e)?e:String(e);a===this.endNode.previousSibling&&3===a.nodeType?a.data=t:this.__commitNode(document.createTextNode(t)),this.value=e}__commitTemplateResult(e){const a=this.options.templateFactory(e);if(this.value instanceof b&&this.value.template===a)this.value.update(e.values);else{const t=new b(a,e.processor,this.options),i=t._clone();t.update(e.values),this.__commitNode(i),this.value=t}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const a=this.value;let t,i=0;for(const s of e)t=a[i],void 0===t&&(t=new O(this.options),a.push(t),0===i?t.appendIntoPart(this):t.insertAfterPart(a[i-1])),t.setValue(s),t.commit(),i++;i<a.length&&(a.length=i,this.clear(t&&t.endNode))}clear(e=this.startNode){i(this.startNode.parentNode,e.nextSibling,this.endNode)}}class C{constructor(e,a,t){if(this.value=void 0,this.__pendingValue=void 0,2!==t.length||""!==t[0]||""!==t[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=a,this.strings=t}setValue(e){this.__pendingValue=e}commit(){for(;v(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=_,e(this)}if(this.__pendingValue===_)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=_}}class j extends x{constructor(e,a,t){super(e,a,t),this.single=2===t.length&&""===t[0]&&""===t[1]}_createPart(){return new T(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class T extends S{}let M=!1;(()=>{try{const e={get capture(){return M=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class E{constructor(e,a,t){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=a,this.eventContext=t,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;v(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=_,e(this)}if(this.__pendingValue===_)return;const e=this.__pendingValue,a=this.value,t=null==e||null!=a&&(e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive),i=null!=e&&(null==a||t);t&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),i&&(this.__options=q(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=_}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const q=e=>e&&(M?{capture:e.capture,passive:e.passive,once:e.once}:e.capture)
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
     */;function z(e){let a=D.get(e.type);void 0===a&&(a={stringsArray:new WeakMap,keyString:new Map},D.set(e.type,a));let t=a.stringsArray.get(e.strings);if(void 0!==t)return t;const i=e.strings.join(s);return t=a.keyString.get(i),void 0===t&&(t=new o(e,e.getTemplateElement()),a.keyString.set(i,t)),a.stringsArray.set(e.strings,t),t}const D=new Map,N=new WeakMap;
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
     */const P=new
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
class{handleAttributeExpressions(e,a,t,i){const s=a[0];if("."===s){return new j(e,a.slice(1),t).parts}if("@"===s)return[new E(e,a.slice(1),i.eventContext)];if("?"===s)return[new C(e,a.slice(1),t)];return new x(e,a,t).parts}handleTextExpression(e){return new O(e)}};
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
     */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const L=(e,...a)=>new $(e,a,"html",P)
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
     */,R=(e,a)=>`${e}--${a}`;let V=!0;void 0===window.ShadyCSS?V=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),V=!1);const U=e=>a=>{const t=R(a.type,e);let i=D.get(t);void 0===i&&(i={stringsArray:new WeakMap,keyString:new Map},D.set(t,i));let n=i.stringsArray.get(a.strings);if(void 0!==n)return n;const r=a.strings.join(s);if(n=i.keyString.get(r),void 0===n){const t=a.getTemplateElement();V&&window.ShadyCSS.prepareTemplateDom(t,e),n=new o(a,t),i.keyString.set(r,n)}return i.stringsArray.set(a.strings,n),n},I=["html","svg"],F=new Set,H=(e,a,t)=>{F.add(e);const i=t?t.element:document.createElement("template"),s=a.querySelectorAll("style"),{length:n}=s;if(0===n)return void window.ShadyCSS.prepareTemplateStyles(i,e);const r=document.createElement("style");for(let e=0;e<n;e++){const a=s[e];a.parentNode.removeChild(a),r.textContent+=a.textContent}(e=>{I.forEach(a=>{const t=D.get(R(a,e));void 0!==t&&t.keyString.forEach(e=>{const{element:{content:a}}=e,t=new Set;Array.from(a.querySelectorAll("style")).forEach(e=>{t.add(e)}),u(e,t)})})})(e);const o=i.content;t?function(e,a,t=null){const{element:{content:i},parts:s}=e;if(null==t)return void i.appendChild(a);const n=document.createTreeWalker(i,133,null,!1);let r=p(s),o=0,d=-1;for(;n.nextNode();){d++;for(n.currentNode===t&&(o=m(a),t.parentNode.insertBefore(a,t));-1!==r&&s[r].index===d;){if(o>0){for(;-1!==r;)s[r].index+=o,r=p(s,r);return}r=p(s,r)}}}(t,r,o.firstChild):o.insertBefore(r,o.firstChild),window.ShadyCSS.prepareTemplateStyles(i,e);const d=o.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==d)a.insertBefore(d.cloneNode(!0),a.firstChild);else if(t){o.insertBefore(r,o.firstChild);const e=new Set;e.add(r),u(t,e)}};window.JSCompiler_renameProperty=(e,a)=>e;const Y={toAttribute(e,a){switch(a){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,a){switch(a){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},B=(e,a)=>a!==e&&(a==a||e==e),W={attribute:!0,type:String,converter:Y,reflect:!1,hasChanged:B};class Q extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach((a,t)=>{const i=this._attributeNameForProperty(t,a);void 0!==i&&(this._attributeToPropertyMap.set(i,t),e.push(i))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,a)=>this._classProperties.set(a,e))}}static createProperty(e,a=W){if(this._ensureClassProperties(),this._classProperties.set(e,a),a.noAccessor||this.prototype.hasOwnProperty(e))return;const t="symbol"==typeof e?Symbol():"__"+e,i=this.getPropertyDescriptor(e,t,a);void 0!==i&&Object.defineProperty(this.prototype,e,i)}static getPropertyDescriptor(e,a,t){return{get(){return this[a]},set(i){const s=this[e];this[a]=i,this.requestUpdateInternal(e,s,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||W}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,a=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const t of a)this.createProperty(t,e[t])}}static _attributeNameForProperty(e,a){const t=a.attribute;return!1===t?void 0:"string"==typeof t?t:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,a,t=B){return t(e,a)}static _propertyValueFromAttribute(e,a){const t=a.type,i=a.converter||Y,s="function"==typeof i?i:i.fromAttribute;return s?s(e,t):e}static _propertyValueToAttribute(e,a){if(void 0===a.reflect)return;const t=a.type,i=a.converter;return(i&&i.toAttribute||Y.toAttribute)(e,t)}initialize(){this._updateState=0,this._updatePromise=new Promise(e=>this._enableUpdatingResolver=e),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,a)=>{if(this.hasOwnProperty(a)){const e=this[a];delete this[a],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(a,e)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,a)=>this[a]=e),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,a,t){a!==t&&this._attributeToProperty(e,t)}_propertyToAttribute(e,a,t=W){const i=this.constructor,s=i._attributeNameForProperty(e,t);if(void 0!==s){const e=i._propertyValueToAttribute(a,t);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(s):this.setAttribute(s,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,a){if(8&this._updateState)return;const t=this.constructor,i=t._attributeToPropertyMap.get(e);if(void 0!==i){const e=t.getPropertyOptions(i);this._updateState=16|this._updateState,this[i]=t._propertyValueFromAttribute(a,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,a,t){let i=!0;if(void 0!==e){const s=this.constructor;t=t||s.getPropertyOptions(e),s._valueHasChanged(this[e],a,t.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,a),!0!==t.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,t))):i=!1}!this._hasRequestedUpdate&&i&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,a){return this.requestUpdateInternal(e,a),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const a=this._changedProperties;try{e=this.shouldUpdate(a),e?this.update(a):this._markUpdated()}catch(a){throw e=!1,this._markUpdated(),a}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(a)),this.updated(a))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((e,a)=>this._propertyToAttribute(a,this[a],e)),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}Q.finalized=!0;
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
const G=e=>a=>"function"==typeof a?((e,a)=>(window.customElements.define(e,a),a))(e,a):((e,a)=>{const{kind:t,elements:i}=a;return{kind:t,elements:i,finisher(a){window.customElements.define(e,a)}}})(e,a),K=(e,a)=>"method"===a.kind&&a.descriptor&&!("value"in a.descriptor)?Object.assign(Object.assign({},a),{finisher(t){t.createProperty(a.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof a.initializer&&(this[a.key]=a.initializer.call(this))},finisher(t){t.createProperty(a.key,e)}};function Z(e){return(a,t)=>void 0!==t?((e,a,t)=>{a.constructor.createProperty(t,e)})(e,a,t):K(e,a)}function J(e){return Z({attribute:!1,hasChanged:null==e?void 0:e.hasChanged})}const X=(e,a,t)=>{Object.defineProperty(a,t,e)},ee=(e,a)=>({kind:"method",placement:"prototype",key:a.key,descriptor:e})
/**
    @license
    Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
    This code may only be used under the BSD style license found at
    http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
    http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
    found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
    part of the polymer project is also subject to an additional IP rights grant
    found at http://polymer.github.io/PATENTS.txt
    */,ae=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,te=Symbol();class ie{constructor(e,a){if(a!==te)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(ae?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const se=(e,...a)=>{const t=a.reduce((a,t,i)=>a+(e=>{if(e instanceof ie)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(t)+e[i+1],e[0]);return new ie(t,te)};
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const ne={};class re extends Q{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const a=(e,t)=>e.reduceRight((e,t)=>Array.isArray(t)?a(t,e):(e.add(t),e),t),t=a(e,new Set),i=[];t.forEach(e=>i.unshift(e)),this._styles=i}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map(e=>{if(e instanceof CSSStyleSheet&&!ae){const a=Array.prototype.slice.call(e.cssRules).reduce((e,a)=>e+a.cssText,"");return new ie(String(a),te)}return e})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?ae?this.renderRoot.adoptedStyleSheets=e.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const a=this.render();super.update(e),a!==ne&&this.constructor.render(a,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(e=>{const a=document.createElement("style");a.textContent=e.cssText,this.renderRoot.appendChild(a)}))}render(){return ne}}re.finalized=!0,re.render=(e,a,t)=>{if(!t||"object"!=typeof t||!t.scopeName)throw new Error("The `scopeName` option is required.");const s=t.scopeName,n=N.has(a),r=V&&11===a.nodeType&&!!a.host,o=r&&!F.has(s),d=o?document.createDocumentFragment():a;if(((e,a,t)=>{let s=N.get(a);void 0===s&&(i(a,a.firstChild),N.set(a,s=new O(Object.assign({templateFactory:z},t))),s.appendInto(a)),s.setValue(e),s.commit()})(e,d,Object.assign({templateFactory:U(s)},t)),o){const e=N.get(d);N.delete(d);const t=e.value instanceof b?e.value.template:void 0;H(s,d,t),i(a,a.firstChild),a.appendChild(d),N.set(a,e)}!n&&r&&window.ShadyCSS.styleElement(a.host)};var oe=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,de="[^\\s]+",le=/\[([^]*?)\]/gm;function ce(e,a){for(var t=[],i=0,s=e.length;i<s;i++)t.push(e[i].substr(0,a));return t}var he=function(e){return function(a,t){var i=t[e].map((function(e){return e.toLowerCase()})).indexOf(a.toLowerCase());return i>-1?i:null}};function ue(e){for(var a=[],t=1;t<arguments.length;t++)a[t-1]=arguments[t];for(var i=0,s=a;i<s.length;i++){var n=s[i];for(var r in n)e[r]=n[r]}return e}var me=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],pe=["January","February","March","April","May","June","July","August","September","October","November","December"],ge=ce(pe,3),ve={dayNamesShort:ce(me,3),dayNames:me,monthNamesShort:ge,monthNames:pe,amPm:["am","pm"],DoFn:function(e){return e+["th","st","nd","rd"][e%10>3?0:(e-e%10!=10?1:0)*e%10]}},_e=ue({},ve),fe=function(e,a){for(void 0===a&&(a=2),e=String(e);e.length<a;)e="0"+e;return e},be={D:function(e){return String(e.getDate())},DD:function(e){return fe(e.getDate())},Do:function(e,a){return a.DoFn(e.getDate())},d:function(e){return String(e.getDay())},dd:function(e){return fe(e.getDay())},ddd:function(e,a){return a.dayNamesShort[e.getDay()]},dddd:function(e,a){return a.dayNames[e.getDay()]},M:function(e){return String(e.getMonth()+1)},MM:function(e){return fe(e.getMonth()+1)},MMM:function(e,a){return a.monthNamesShort[e.getMonth()]},MMMM:function(e,a){return a.monthNames[e.getMonth()]},YY:function(e){return fe(String(e.getFullYear()),4).substr(2)},YYYY:function(e){return fe(e.getFullYear(),4)},h:function(e){return String(e.getHours()%12||12)},hh:function(e){return fe(e.getHours()%12||12)},H:function(e){return String(e.getHours())},HH:function(e){return fe(e.getHours())},m:function(e){return String(e.getMinutes())},mm:function(e){return fe(e.getMinutes())},s:function(e){return String(e.getSeconds())},ss:function(e){return fe(e.getSeconds())},S:function(e){return String(Math.round(e.getMilliseconds()/100))},SS:function(e){return fe(Math.round(e.getMilliseconds()/10),2)},SSS:function(e){return fe(e.getMilliseconds(),3)},a:function(e,a){return e.getHours()<12?a.amPm[0]:a.amPm[1]},A:function(e,a){return e.getHours()<12?a.amPm[0].toUpperCase():a.amPm[1].toUpperCase()},ZZ:function(e){var a=e.getTimezoneOffset();return(a>0?"-":"+")+fe(100*Math.floor(Math.abs(a)/60)+Math.abs(a)%60,4)},Z:function(e){var a=e.getTimezoneOffset();return(a>0?"-":"+")+fe(Math.floor(Math.abs(a)/60),2)+":"+fe(Math.abs(a)%60,2)}},we=function(e){return+e-1},ye=[null,"[1-9]\\d?"],$e=[null,de],ke=["isPm",de,function(e,a){var t=e.toLowerCase();return t===a.amPm[0]?0:t===a.amPm[1]?1:null}],Ae=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(e){var a=(e+"").match(/([+-]|\d\d)/gi);if(a){var t=60*+a[1]+parseInt(a[2],10);return"+"===a[0]?t:-t}return 0}],xe=(he("monthNamesShort"),he("monthNames"),{default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",isoDate:"YYYY-MM-DD",isoDateTime:"YYYY-MM-DDTHH:mm:ssZ",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"});var Se=function(e,a,t){if(void 0===a&&(a=xe.default),void 0===t&&(t={}),"number"==typeof e&&(e=new Date(e)),"[object Date]"!==Object.prototype.toString.call(e)||isNaN(e.getTime()))throw new Error("Invalid Date pass to format");var i=[];a=(a=xe[a]||a).replace(le,(function(e,a){return i.push(a),"@@@"}));var s=ue(ue({},_e),t);return(a=a.replace(oe,(function(a){return be[a](e,s)}))).replace(/@@@/g,(function(){return i.shift()}))};(function(){try{(new Date).toLocaleDateString("i")}catch(e){return"RangeError"===e.name}})(),function(){try{(new Date).toLocaleString("i")}catch(e){return"RangeError"===e.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(e){return"RangeError"===e.name}}();function Oe(e){return e.substr(0,e.indexOf("."))}function Ce(e){return e.substr(e.indexOf(".")+1)}var je="hass:bookmark",Te=function(e,a,t,i){i=i||{},t=null==t?{}:t;var s=new Event(a,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});return s.detail=t,e.dispatchEvent(s),s},Me={alert:"hass:alert",automation:"hass:playlist-play",calendar:"hass:calendar",camera:"hass:video",climate:"hass:thermostat",configurator:"hass:settings",conversation:"hass:text-to-speech",device_tracker:"hass:account",fan:"hass:fan",group:"hass:google-circles-communities",history_graph:"hass:chart-line",homeassistant:"hass:home-assistant",homekit:"hass:home-automation",image_processing:"hass:image-filter-frames",input_boolean:"hass:drawing",input_datetime:"hass:calendar-clock",input_number:"hass:ray-vertex",input_select:"hass:format-list-bulleted",input_text:"hass:textbox",light:"hass:lightbulb",mailbox:"hass:mailbox",notify:"hass:comment-alert",person:"hass:account",plant:"hass:flower",proximity:"hass:apple-safari",remote:"hass:remote",scene:"hass:google-pages",script:"hass:file-document",sensor:"hass:eye",simple_alarm:"hass:bell",sun:"hass:white-balance-sunny",switch:"hass:flash",timer:"hass:timer",updater:"hass:cloud-upload",vacuum:"hass:robot-vacuum",water_heater:"hass:thermometer",weblink:"hass:open-in-new"};function Ee(e,a){if(e in Me)return Me[e];switch(e){case"alarm_control_panel":switch(a){case"armed_home":return"hass:bell-plus";case"armed_night":return"hass:bell-sleep";case"disarmed":return"hass:bell-outline";case"triggered":return"hass:bell-ring";default:return"hass:bell"}case"binary_sensor":return a&&"off"===a?"hass:radiobox-blank":"hass:checkbox-marked-circle";case"cover":return"closed"===a?"hass:window-closed":"hass:window-open";case"lock":return a&&"unlocked"===a?"hass:lock-open":"hass:lock";case"media_player":return a&&"off"!==a&&"idle"!==a?"hass:cast-connected":"hass:cast";case"zwave":switch(a){case"dead":return"hass:emoticon-dead";case"sleeping":return"hass:sleep";case"initializing":return"hass:timer-sand";default:return"hass:z-wave"}default:return console.warn("Unable to find icon for domain "+e+" ("+a+")"),je}}var qe=function(e,a,t){void 0===t&&(t=!1),t?history.replaceState(null,"",a):history.pushState(null,"",a),Te(window,"location-changed",{replace:t})},ze={humidity:"hass:water-percent",illuminance:"hass:brightness-5",temperature:"hass:thermometer",pressure:"hass:gauge",power:"hass:flash",signal_strength:"hass:wifi"},De={binary_sensor:function(e){var a=e.state&&"off"===e.state;switch(e.attributes.device_class){case"battery":return a?"hass:battery":"hass:battery-outline";case"cold":return a?"hass:thermometer":"hass:snowflake";case"connectivity":return a?"hass:server-network-off":"hass:server-network";case"door":return a?"hass:door-closed":"hass:door-open";case"garage_door":return a?"hass:garage":"hass:garage-open";case"gas":case"power":case"problem":case"safety":case"smoke":return a?"hass:shield-check":"hass:alert";case"heat":return a?"hass:thermometer":"hass:fire";case"light":return a?"hass:brightness-5":"hass:brightness-7";case"lock":return a?"hass:lock":"hass:lock-open";case"moisture":return a?"hass:water-off":"hass:water";case"motion":return a?"hass:walk":"hass:run";case"occupancy":return a?"hass:home-outline":"hass:home";case"opening":return a?"hass:square":"hass:square-outline";case"plug":return a?"hass:power-plug-off":"hass:power-plug";case"presence":return a?"hass:home-outline":"hass:home";case"sound":return a?"hass:music-note-off":"hass:music-note";case"vibration":return a?"hass:crop-portrait":"hass:vibrate";case"window":return a?"hass:window-closed":"hass:window-open";default:return a?"hass:radiobox-blank":"hass:checkbox-marked-circle"}},cover:function(e){var a="closed"!==e.state;switch(e.attributes.device_class){case"garage":return a?"hass:garage-open":"hass:garage";case"door":return a?"hass:door-open":"hass:door-closed";case"shutter":return a?"hass:window-shutter-open":"hass:window-shutter";case"blind":return a?"hass:blinds-open":"hass:blinds";case"window":return a?"hass:window-open":"hass:window-closed";default:return Ee("cover",e.state)}},sensor:function(e){var a=e.attributes.device_class;if(a&&a in ze)return ze[a];if("battery"===a){var t=Number(e.state);if(isNaN(t))return"hass:battery-unknown";var i=10*Math.round(t/10);return i>=100?"hass:battery":i<=0?"hass:battery-alert":"hass:battery-"+i}var s=e.attributes.unit_of_measurement;return"°C"===s||"°F"===s?"hass:thermometer":Ee("sensor")},input_datetime:function(e){return e.attributes.has_date?e.attributes.has_time?Ee("input_datetime"):"hass:calendar":"hass:clock"}};const Ne=async()=>{if(customElements.get("ha-checkbox")&&customElements.get("ha-slider"))return;await customElements.whenDefined("partial-panel-resolver");const e=document.createElement("partial-panel-resolver");e.hass={panels:[{url_path:"tmp",component_name:"config"}]},e._updateRoutes(),await e.routerOptions.routes.tmp.load(),await customElements.whenDefined("ha-panel-config");const a=document.createElement("ha-panel-config");await a.routerOptions.routes.automation.load(),e.hass={panels:[{url_path:"tmp",component_name:"developer-tools"}]},e._updateRoutes(),await e.routerOptions.routes.tmp.load(),await customElements.whenDefined("ha-app-layout")},Pe=se`
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
`;var Le={modes_long:{armed_away:"Armed Away",armed_home:"Armed Home",armed_night:"Armed Night",armed_custom_bypass:"Armed Custom"},modes_short:{armed_away:"Away",armed_home:"Home",armed_night:"Night",armed_custom_bypass:"Custom"}},Re={time_slider:{seconds:"sec",minutes:"min",infinite:"infinite",none:"none"},editor:{ui_mode:"Switch to UI",yaml_mode:"Switch to YAML"}},Ve={general:{title:"General",cards:{general:{description:"This panel defines some global settings for the alarm.",fields:{disarm_after_trigger:{heading:"Disarm after trigger",description:"After trigger time has expired, disarm the alarm instead of returning to armed state."},enable_mqtt:{heading:"Enable MQTT",description:"Allow the alarm panel to be controlled through MQTT."},enable_master:{heading:"Enable alarm master",description:"Creates an entity for controlling all areas simultaneously."}},actions:{setup_mqtt:"MQTT Configuration",setup_master:"Master Configuration"}},modes:{title:"Modes",description:"This panel can be used to set up the arm modes of the alarm.",fields:{mode:{armed_away:"Armed away will be used when all people left the house. All doors and windows allowing access to the house will be guarded, as well as motion sensors inside the house.",armed_home:"Armed home (also known as armed stay) will be used when setting the alarm while people are in the house. All doors and windows allowing access to the house will be guarded, but not motion sensors inside the house.",armed_night:"Armed night will be used when setting the alarm before going to sleep. All doors and windows allowing access to the house will be guarded, and selected motion sensors (downstairs) in the house.",armed_custom_bypass:"An extra mode for defining your own security perimeter.",enabled:"Enabled",disabled:"Disabled"},exit_delay:{heading:"Exit delay",description:"When arming the alarm, within this time period the sensors will not trigger the alarm yet."},entry_delay:{heading:"Entry delay",description:"Delay time until the alarm is triggered after one of the sensors is activated."},trigger_time:{heading:"Trigger time",description:"Time during which the siren will sound"}}},mqtt:{title:"MQTT configuration",description:"This panel can be used for configuration of the MQTT interface.",fields:{state_topic:{heading:"State topic",description:"Topic on which state updates are published"},event_topic:{heading:"Event topic",description:"Topic on which alarm events are published"},command_topic:{heading:"Command topic",description:"Topic on which arm/disarm commands are sent."},require_code:{heading:"Require code",description:"Require the code to be sent with the command."},state_payload:{heading:"Configure payload per state",item:"Define a payload for state '{state}'"},command_payload:{heading:"Configure payload per command",item:"Define a payload for command '{command}'"}}},areas:{title:"Areas",description:"Areas can be used for dividing your alarm system into multiple compartments.",no_items:"There are no areas defined yet.",table:{remarks:"Remarks",summary:"This area contains {summary_sensors} and {summary_automations}.",summary_sensors:"{number} sensors",summary_automations:"{number} automations"},actions:{add:"Add"}}},dialogs:{create_area:{title:"New area",fields:{copy_from:"Copy settings from"}},edit_area:{title:"Editing area '{area}'",name_warning:"Note: changing the name will change the entity ID"},remove_area:{title:"Remove area?",description:"Are you sure you want to remove this area? This area contains {sensors} sensors and {automations} automations, which will be removed as well."},edit_master:{title:"Master configuration"},disable_master:{title:"Disable master?",description:"Are you sure you want to remove the alarm master? This area contains {automations} automations, which will be removed with this action."}}},sensors:{title:"Sensors",cards:{sensors:{description:"Currently configured sensors. Click on an entity to make changes.",no_items:"There are no sensors to be displayed here.",table:{arm_modes:"Arm Modes",always_on:"(Always)"},filter:{label:"Filter by area",no_area:"(No area)"}},add_sensors:{title:"Add Sensors",description:"Add more sensors. Make sure that your sensors have a friendly_name, so you can identify them.",no_items:"There are no available HA entities that can be configured for the alarm. Make sure to include entities of the type binary_sensor.",actions:{add_to_alarm:"add to alarm",show_all:"Show all"}},editor:{title:"Edit Sensor",description:"Configuring the sensor settings of '{entity}'.",fields:{name:{heading:"Name",description:"Overwrite friendly name."},area:{heading:"Area",description:"Select an area which contains this sensor."},device_type:{heading:"Device Type",description:"Choose a device type to automatically apply appropriate settings.",choose:{door:{name:"Door",description:"A door, gate or other entrance that is used for entering/leaving the home."},window:{name:"Window",description:"A window, or a door not used for entering the house such as balcony."},motion:{name:"Motion",description:"Presence sensor or similar device having a delay between activations."},tamper:{name:"Tamper",description:"Detector of sensor cover removal, glass break sensor, etc."},environmental:{name:"Environmental",description:"Smoke/gas sensor, leak detector, etc. (not related to burglar protection)."},other:{name:"Generic"}}},always_on:{heading:"Always on",description:"Sensor should always trigger the alarm."},modes:{heading:"Enabled modes",description:"Alarm modes in which this sensor is active."},arm_on_close:{heading:"Arm after closing",description:"After deactivation of this sensor, the remaining exit delay will automatically be skipped."},immediate:{heading:"Immediate",description:"Activating this sensor will trigger the alarm directly instead of after entry delay."},allow_open:{heading:"Allow open while arming",description:"Allow this sensor to be active shortly after leaving such that it will not block arming."},auto_bypass:{heading:"Bypass automatically",description:"Exclude this sensor from the alarm if it is open while arming."},trigger_unavailable:{heading:"Trigger when unavailable",description:"When the sensor state becomes 'unavailable', this will activate the sensor."}},actions:{toggle_advanced:"Advanced settings",remove:"Remove"},errors:{description:"Please correct the following errors:",no_area:"No area is selected",no_modes:"No modes are selected for which the sensor should be active"}}}},codes:{title:"Codes",cards:{codes:{description:"Change settings for the code.",fields:{code_arm_required:{heading:"Use arm code",description:"Require a code for arming the alarm"},code_disarm_required:{heading:"Use disarm code",description:"Require a code for disarming the alarm"},code_format:{heading:"Code format",description:"Sets the input type for Lovelace alarm card.",code_format_number:"pincode",code_format_text:"password"}}},user_management:{title:"User management",description:"Each user has its own code to arm/disarm the alarm.",no_items:"There are no users yet",table:{remarks:"Remarks",administrator:"Administrator"},actions:{new_user:"new user"}},new_user:{title:"Create new user",description:"Users can be created for providing access to operating the alarm.",fields:{name:{heading:"Name",description:"Name of the user."},code:{heading:"Code",description:"Code for this user."},confirm_code:{heading:"Confirm code",description:"Repeat the code."},is_admin:{heading:"User is administrator",description:"Allow user to make changes"},can_arm:{heading:"Allow code for arming",description:"Entering this code activates the alarm"},can_disarm:{heading:"Allow code for disarming",description:"Entering this code deactivates the alarm"},is_override_code:{heading:"Is override code",description:"Entering this code will arm the alarm in force"}},errors:{no_name:"No name provided.",no_code:"Code should have 4 characters/numbers minimum.",code_mismatch:"The codes don't match."}},edit_user:{title:"Edit User",description:"Change configuration for user '{name}'.",fields:{old_code:{heading:"Current code",description:"Current code, leave empty to leave unchanged."}}}}},actions:{title:"Actions",cards:{notifications:{title:"Notifications",description:"Using this panel, you can manage notifications to be sent when during a certain alarm event.",table:{enabled:"Enabled",no_items:"There are no notifications created yet."},actions:{new_notification:"new notification"},filter:{label:"Filter by area",no_area:"Alarm master"}},actions:{description:"This panel can be used to switch a device when the alarm state changes.",table:{no_items:"There are no actions created yet."},actions:{new_action:"new action"}},new_notification:{title:"Create notification",description:"Create a new notification.",fields:{name:{heading:"Name",description:"Description for this notification"},event:{heading:"Event",description:"When should the notification be sent",choose:{armed:{name:"Alarm is armed",description:"The alarm is succesfully armed"},disarmed:{name:"Alarm is disarmed",description:"The alarm is disarmed"},triggered:{name:"Alarm is triggered",description:"The alarm is triggered"},arm_failure:{name:"Failed to arm",description:"The arming of the alarm failed due to one or more open sensors"},arming:{name:"Exit delay started",description:"Exit delay started, ready to leave the house."},pending:{name:"Entry delay started",description:"Entry delay started, the alarm will trigger soon."}}},mode:{heading:"Mode",description:"Limit the action to specific arm modes (optional)"},title:{heading:"Title",description:"Title for the notification message"},message:{heading:"Message",description:"Content of the notification message"},target:{heading:"Target",description:"Device to send the push message to"}},actions:{test:"Try it"}},new_action:{title:"Create action",description:"This panel can be used to switch a device when the alarm state changes.",fields:{name:{heading:"Name",description:"Description for this action"},event:{heading:"Event",description:"When should the action be executed"},area:{heading:"Area",description:"Area for which the event applies, leave empty to select the global alarm."},mode:{heading:"Mode",description:"Limit the action to specific arm modes (optional)"},entity:{heading:"Entity",description:"Entity to perform action on"},action:{heading:"Action",description:"Action to perform on the entity",turn_on:"Turn on",turn_off:"Turn off"}}}},validation_errors:{no_triggers:"No state or event provided for the triggering of this automation.",empty_trigger:"One of the triggers has no state or event provided.",invalid_trigger:"One of the triggers has an invalid value: {trigger}",invalid_mode:"Invalid input provided for 'mode': {mode}",no_actions:"No actions are provided to be performed by this automation.",no_service:"One of the actions is missing a service.",invalid_service:"An invalid service name was provided for one of the actions: {service}",no_service_data:"No service data was provided for one of the actions.",no_entity_in_service_data:"No entity_id was provided in the service_data of one of the actions.",no_message_in_service_data:"No message was provided in the service_data of one of the actions."}}},Ue={common:Le,components:Re,title:"Alarm panel",panels:Ve},Ie={modes_long:{armed_away:"Valvestatud eemal",armed_home:"Valvestatud kodus",armed_night:"Valvestatud ööseks",armed_custom_bypass:"Valikuline valvestus"},modes_short:{armed_away:"Eemal",armed_home:"Kodus",armed_night:"Ööseks",armed_custom_bypass:"Valikuline"}},Fe={time_slider:{seconds:"sek",minutes:"min",infinite:"piiranguta",none:"puudub"},editor:{ui_mode:"Kasutajaliides",yaml_mode:"Koodiredaktor"}},He={general:{title:"Üldsätted",cards:{general:{description:"Need seaded kehtivad kõikides valve olekutes.",fields:{disarm_after_trigger:{heading:"Häire summutamine",description:"Peale häire lõppu võta valvest maha miite ära valvesta uuesti."},enable_mqtt:{heading:"Luba MQTT juhtimine",description:"Luba nupustiku juhtimist MQTT abil."},enable_master:{heading:"Luba põhivalvestus",description:"Loob olemi mis haldab kõiki valvestamise alasid korraga."}},actions:{setup_mqtt:"MQTT seadistamine",setup_master:"Põhivalvestuse sätted"}},modes:{title:"Režiimid",description:"Selles vaates seadistatakse valvestamise režiime.",fields:{mode:{armed_away:"Täielik valvestamine kui kedagi pole kodus. Kasutusel on kõik andurid.",armed_home:"Valvestatud kodus ei kasuta liikumisandureid kuid väisuksed ja aknad on valve all.",armed_night:"Valvestatud ööseks ei kasuta määratud liikumisandureid, välisperimeeter on valve all.",armed_custom_bypass:"Valikulise valvestuse puhul saab määrata kasutatavad andurid.",enabled:"Lubatud",disabled:"Keelatud"},exit_delay:{heading:"Ooteaeg valvestamisel",description:"Viivitus enne valvestamise rakendumist."},entry_delay:{heading:"Sisenemise viivitus",description:"Viivitus sisenemisel enne häire rakendumist."},trigger_time:{heading:"Häire kestus",description:"Sireeni jne. aktiveerimise kestus."}}},mqtt:{title:"MQTT sätted",description:"MQTT parameetrite seadistamine.",fields:{state_topic:{heading:"Oleku teema (topic)",description:"Teema milles avaldatakse oleku muutused."},command_topic:{heading:"Käskude teema (topic)",description:"Teema milles avaldatakse valvestamise käsud."},require_code:{heading:"Nõua PIN koodi",description:"Käskude edastamiseks on vajalik PIN kood."},state_payload:{heading:"Määra olekute toimeandmed",item:"Määra oleku '{state}' toimeandmed"},command_payload:{heading:"Määra käskude toimeandmed",item:"Määra käsu '{command}' toimeandmed"}}},areas:{title:"Alad",description:"Alasid kasutatakse elamise jagamiseks valvetsoonideks.",no_items:"Valvestamise alad on loomata.",table:{remarks:"Ala teave",summary:"See ala sisaldab {summary_sensors} ja {summary_automations}.",summary_sensors:"{number} andur(it)",summary_automations:"{number} automatiseering(ut)"},actions:{add:"Lisa"}}},dialogs:{create_area:{title:"Uus ala",fields:{copy_from:"Kopeeri sätted allikast:"}},edit_area:{title:"Ala '{area}' muutmine",name_warning:"NB! Nime muutmisel muutub ka olemi ID"},remove_area:{title:"Kas kustutada ala?",description:"Kas kustutada see ala? Ala kaasab andurid {sensors} ja automatiseeringud {automations} mis samuti eemaldatakse."},edit_master:{title:"Põhiala seaded"},disable_master:{title:"Kas keelata põhiala?",description:"Kas keelata põhiala? Ala kaasab andurid {sensors} ja automatiseeringud {automations} mis samuti eemaldatakse.."}}},sensors:{title:"Andurid",cards:{sensors:{description:"Kasutusel olevad andurid. Klõpsa olemil, et seadistada.",no_items:"Andureid pole lisatud. Alustuseks lisa mõni andur.",table:{arm_modes:"Valvestamise olek",always_on:"(alati)"},filter:{label:"Sordi ala järgi",no_area:"(Alad puuduvad)"}},add_sensors:{title:"Andurite lisamine",description:"Lisa veel andureid. Mõistlik on panna neile arusaadav nimi (friendly_name).",no_items:"Puuduvad valvestamiseks sobivad Home Assistanti olemid. Lisatavad olemid peavad olema olekuandurid (binary_sensor).",actions:{add_to_alarm:"Lisa valvesüsteemile",show_all:"Kuva kõik andurid"}},editor:{title:"Andurite sätted",description:"Muuda olemi '{entity}' sätteid.",fields:{name:{heading:"Nimi",description:"Muuda kuvatavat nime."},area:{heading:"Ala",description:"Vali ala kus see andur asub."},device_type:{heading:"Seadme tüüp",description:"Vali anduri tüüp, et automaatselt rakendada sobivad sätted.",choose:{door:{name:"Uks",description:"Uks, värav või muu piire mida kasutatakse sisenemiseks või väljumiseks."},window:{name:"Aken",description:"Aken või uks mida ei kasutata sisenemiseks nagu rõduuks."},motion:{name:"Liikumisandur",description:"Kohaloleku andurid mille rakendumiste vahel on viide."},tamper:{name:"Terviklikkus",description:"Anduri muukimine või klaasipurustusandur jms."},environmental:{name:"Ohu andurid",description:"Suitsu või gaasilekke andur, veeleke jne. (ei ole seotud sissetungimisega)."},other:{name:"Tavaandur"}}},always_on:{heading:"Alati kasutusel",description:"Andur käivitab häire igas valve olekus."},modes:{heading:"Valve olekute valik",description:"Valve olekud kus seda andurit kasutatakse."},arm_on_close:{heading:"Valvesta sulgemisel",description:"Selle anduri rakendumisel valvestatakse kohe ilma viiveta."},immediate:{heading:"Viivituseta",description:"Andur annab häire ilma viiteta."},allow_open:{heading:"Lahkumisviivitus",description:"See andur ei aktiveeru enne lahkumisviivituse lõppu."},auto_bypass:{heading:"Bypass automatically",description:"Exclude this sensor from the alarm if it is open while arming."},trigger_unavailable:{heading:"Andurite saadavus",description:"Käivita häire kui andur muutub kättesaamatuks."}},actions:{toggle_advanced:"Täpsemad sätted",remove:"Eemalda"},errors:{description:"Palun paranda jägmised vead:",no_area:"Ala pole määratud",no_modes:"Anduri tüüp on määramata, ei tea kuida kasutada"}}}},codes:{title:"Koodid",cards:{codes:{description:"Valvestuskoodide muutmine.",fields:{code_arm_required:{heading:"Valvestamine koodiga",description:"Valvestamiseks tuleb sisestada kood"},code_disarm_required:{heading:"Valvest vabastamise kood",description:"Valvest vabastamiseks tulem sisestada kood"},code_format:{heading:"Koodi vorming",description:"Kasutajaliidese koodi tüübid.",code_format_number:"PIN kood",code_format_text:"Salasõna"}}},user_management:{title:"Kasutajate haldus",description:"Igal kasutajal on oma juhtkood.",no_items:"Kasutajaid pole määratud",table:{remarks:"Märkused",administrator:"Haldaja"},actions:{new_user:"Uus kasutaja"}},new_user:{title:"Lisa uus kasutaja",description:"Valvesüsteemi kasutaja lisamine.",fields:{name:{heading:"Nimi",description:"Kasutaja nimi."},code:{heading:"Valvestuskood",description:"Selle kasutaja kood."},confirm_code:{heading:"Koodi kinnitamine",description:"Sisesta sama kood uuesti."},is_admin:{heading:"Kasutajal on haldusõigused",description:"Kasutaja saab teha muudatusi."},can_arm:{heading:"Tohib valvestada",description:"Koodi sisestamine valvestab."},can_disarm:{heading:"Tohib valvest maha võtta",description:"Koodi sisestamine võtab valvest maha."},is_override_code:{heading:"Alistuskood",description:"Koodi sisestamine käivitab kohese häire"}},errors:{no_name:"Nimi puudub.",no_code:"Kood peab olema vhemalt 4 tärki.",code_mismatch:"Sisestatud koodid ei klapi."}},edit_user:{title:"Muuda kasutaja sätteid",description:"Muuda kasutaja '{name}' sätteid.",fields:{old_code:{heading:"Kehtiv kood",description:"Kehtiv kood, jäta tühjaks kui ei taha muuta."}}}}},actions:{title:"Toimingud",cards:{notifications:{title:"Teavitused",description:"Halda saadetavaid teavitusi",table:{enabled:"Lubatud",no_items:"Teavitusi pole veel loodud."},actions:{new_notification:"Uus teavitus"},filter:{label:"Sordi alade järgi",no_area:"Põhiala"}},actions:{description:"Arenduses, mõeldud seadmete lülitamiseks.",table:{no_items:"Toiminguid pole veel määratud."},actions:{new_action:"Uus toiming"}},new_notification:{title:"Loo teavitus",description:"Uue teavituse loomine.",fields:{name:{heading:"Nimi",description:"Teavituse kirjeldus"},event:{heading:"Sündmus",description:"Mille puhul teavitada",choose:{armed:{name:"Valvestatud",description:"Valvestamine oli edukas"},disarmed:{name:"Valvest maas",description:"Valve mahavõtmine õnnestus"},triggered:{name:"Häire",description:"Valvesüsteem andis häire"},arm_failure:{name:"Valvestamine nurjus",description:"Valvestamine ei õnnestunud mõne anduri oleku või vea tõttu"},arming:{name:"Valvestamise eelne viivitus algas",description:"Algas valvestamise eelviide, majast võib lahkuda."},pending:{name:"Sisenemise viide rakendus",description:"Märgati sisenemist, häire rakendub peale viidet."}}},mode:{heading:"Olek",description:"Millises valve olekus teavitada (valikuline)"},title:{heading:"Päis",description:"Teavitussõnumi päis"},message:{heading:"Sisu",description:"Teavitussõnumi tekst"},target:{heading:"Saaja",description:"Seade millele edastada teavitus"}},actions:{test:"Try it"}},new_action:{title:"Loo toiming",description:"Seadme oleku muutmine valve oleku muutmisel.",fields:{name:{heading:"Nimi",description:"Toimingu kirjeldus"},event:{heading:"Sündmus",description:"Millisel juhul käivitada toiming"},area:{heading:"Ala",description:"Ala millele sündmus rakendub, põhiala puhul jäta tühjaks."},mode:{heading:"Olek",description:"Millises valve olekus toiming käivitada (valikuline)"},entity:{heading:"Olem",description:"Toimingu olem"},action:{heading:"Toiming",description:"Olemi toiming",turn_on:"Lülita sisse",turn_off:"Lülita välja"}}}},validation_errors:{no_triggers:"Selle tegevuse käivitamiseks puudub vajalik olek või sündmus.",empty_trigger:"Ühel päästikul puudub oleku või sündmuse tingimus.",invalid_trigger:"Ühel päästikul: {trigger} on vigane väärtus",invalid_mode:"Valve olekule: {mode} on sisestatud vigane väärtus",no_actions:"Sellele toimingule pole määratud tegevust.",no_service:"Ühel toimingutest puudub nõutav teenus.",invalid_service:"Ühele toimingule on omistatud sobimatu teenus: {service}",no_service_data:"Ühel toimingul puuduvad teenuse andmed.",no_entity_in_service_data:"Ühel toimingul puudub teenuse andmetes olemi ID.",no_message_in_service_data:"Ühe toimingu teenuse andmetes puuduvad teenuse andmed."}}},Ye={common:Ie,components:Fe,title:"Alarm panel",panels:He},Be={modes_long:{armed_away:"Ingeschakeld Weg",armed_home:"Ingeschakeld Thuis",armed_night:"Ingeschakeld Nacht",armed_custom_bypass:"Ingeschakeld Aangepast"},modes_short:{armed_away:"Weg",armed_home:"Thuis",armed_night:"Nacht",armed_custom_bypass:"Aangepast"}},We={time_slider:{seconds:"sec",minutes:"min",infinite:"oneindig",none:"geen"},editor:{ui_mode:"Wissel naar UI",yaml_mode:"Wissel naar YAML"}},Qe={general:{title:"Algemeen",cards:{general:{description:"Dit paneel definieert enkele instellingen die van toepassing zijn op alle inschakelmodi.",fields:{disarm_after_trigger:{heading:"Uitschakelen na activatie",description:"Nadat de triggertijd is verstreken, schakelt u het alarm uit in plaats van terug te keren naar de ingeschakelde toestand."},enable_mqtt:{heading:"MQTT inschakelen",description:"Allow the alarm panel to be controlled through MQTT."},enable_master:{heading:"Master alarm inschakelen",description:"Creëert een entiteit om alle gebieden tegelijkertijd te besturen."}},actions:{setup_mqtt:"MQTT Configuratie",setup_master:"Master configuratie"}},modes:{title:"Modi",description:"Dit paneel kan worden gebruikt om de inschakelmodi van het alarm in te stellen.",fields:{mode:{armed_away:"Ingeschakeld weg wordt gebruikt als alle mensen het huis hebben verlaten. Alle deuren en ramen die toegang geven tot het huis worden bewaakt, evenals bewegingssensoren in het huis.",armed_home:"Ingeschakeld thuis (ook wel ingeschakeld thuisblijven genoemd) wordt gebruikt bij het instellen van het alarm terwijl er mensen in huis zijn. Alle deuren en ramen die toegang geven tot het huis worden bewaakt, maar bewegingssensoren in het huis worden niet gebruikt.",armed_night:"Ingeschakeld nacht wordt gebruikt bij het instellen van het alarm voordat u gaat slapen. Alle deuren en ramen die toegang geven tot het huis worden bewaakt, en geselecteerde bewegingssensoren (beneden) in het huis.",armed_custom_bypass:"Een extra modus om uw eigen beveiligingsperimeter te definiëren.",enabled:"Enabled",disabled:"Disabled"},exit_delay:{heading:"Vertrek vertraging",description:"Bij het inschakelen van het alarm zullen de sensoren binnen deze tijdsperiode het alarm nog niet activeren."},entry_delay:{heading:"Binnenkomst vertraging",description:"Vertragingstijd totdat het alarm afgaat nadat een van de sensoren is geactiveerd."},trigger_time:{heading:"Activeer tijd",description:"Tijd waarin de sirene af gaat."}}},mqtt:{title:"MQTT configuratie",description:"Dit paneel kan worden gebruikt voor configuratie van de MQTT-interface.",fields:{state_topic:{heading:"Toestand topic",description:"Topic waarop statusupdates worden gepubliceerd"},command_topic:{heading:"Commando topic",description:"Topic waarop commando's voor in- / uitschakelen worden verzonden."},require_code:{heading:"Vereis code",description:"Vereis dat de code wordt verzonden met de opdracht."},state_payload:{heading:"Configureer de payload per toestand",item:"Definieer een payload voor toestand '{state}'"},command_payload:{heading:"Configureer een payload per commando",item:"Definieer een payload voor commando '{command}'"}}},areas:{title:"Gebieden",description:"Gebieden kunnen worden gebruikt om uw alarmsysteem in meerdere compartimenten op te delen.",no_items:"Er zijn nog geen gebieden gedefinieerd.",table:{remarks:"Opmerkingen",summary:"Dit gebied bevat {summary_sensors} en {summary_automations}.",summary_sensors:"{number} sensoren",summary_automations:"{number} automatiseringen"},actions:{add:"Toevoegen"}}},dialogs:{create_area:{title:"Nieuw gebied",fields:{copy_from:"Kopieer instellingen van"}},edit_area:{title:"Bewerken van gebied '{area}'",name_warning:"Opmerking: als u de naam wijzigt, wordt de entiteits-ID gewijzigd"},remove_area:{title:"Gebied verwijderen?",description:"Weet u zeker dat u dit gebied wilt verwijderen? Dit gebied bevat {sensors} sensoren en {automations} automatiseringen, die ook zullen worden verwijderd."},edit_master:{title:"Master configuratie"},disable_master:{title:"Master uitschakelen?",description:"Weet u zeker dat u het master alarm wilt verwijderen? Dit gebied bevat {automations} automatiseringen, die met deze actie worden verwijderd."}}},sensors:{title:"Sensoren",cards:{sensors:{description:"Momenteel geconfigureerde sensoren. Klik op een entiteit om wijzigingen aan te brengen.",no_items:"Er zijn nog geen sensoren aan het alarm toegevoegd. Zorg ervoor dat u ze eerst toevoegt.",table:{arm_modes:"Inschakelmodi",always_on:"(Altijd)"},filter:{label:"Filter op gebied",no_area:"(Geen gebied)"}},add_sensors:{title:"Voeg sensoren toe",description:"Voeg meer sensoren toe. Zorg ervoor dat uw sensoren een friendly_name hebben, zodat u ze kunt identificeren.",no_items:"Er zijn geen beschikbare HA-entiteiten die voor het alarm kunnen worden geconfigureerd. Zorg ervoor dat u entiteiten van het type binary_sensor opneemt.",actions:{add_to_alarm:"Voeg aan alarm toe",show_all:"Toon alle"}},editor:{title:"Wijzig Sensor",description:"Configureren van de sensorinstellingen van '{entity}'.",fields:{name:{heading:"Naam",description:"Overschrijf vriendelijke naam."},area:{heading:"Gebied",description:"Selecteer een gebied dat deze sensor bevat."},device_type:{heading:"Apparaat Type",description:"Kies een apparaattype om automatisch de juiste instellingen toe te passen.",choose:{door:{name:"Deur",description:"Een deur, poort of andere ingang die wordt gebruikt voor het betreden/verlaten van de woning."},window:{name:"Raam",description:"Een raam of een deur die niet wordt gebruikt om het huis binnen te komen, zoals een balkon."},motion:{name:"Beweging",description:"Aanwezigheidssensor of soortgelijk apparaat met een vertraging tussen activeringen."},tamper:{name:"Sabotage",description:"Detector van verwijdering van sensorkap, glasbreuksensor, enz."},environmental:{name:"Omgeving",description:"Rook/gassensor, lekdetector, etc. (niet gerelateerd aan inbraakbeveiliging)."},other:{name:"Algemeen"}}},always_on:{heading:"Altijd aan",description:"Sensor should always trigger the alarm."},modes:{heading:"Ingeschakelde modi",description:"Alarmmodi waarin deze sensor actief is."},arm_on_close:{heading:"Inschakelen na sluiten",description:"Na deactivering van deze sensor wordt de resterende vertrek vertraging automatisch overgeslagen."},immediate:{heading:"Onmiddelijk",description:"Als deze sensor wordt geactiveerd, wordt het alarm direct geactiveerd in plaats van na de binnenkomst vertraging."},allow_open:{heading:"Sta open toe tijdens het inschakelen",description:"Sta toe dat deze sensor kort na het verlaten actief is, zodat hij het inschakelen niet blokkeert."},auto_bypass:{heading:"Automatisch uitsluiten",description:"Elimineer de sensor als deze actief is tijdens het inschakelen van het alarm."},trigger_unavailable:{heading:"Activeren indien niet beschikbaar",description:"Wanneer de sensorstatus 'niet beschikbaar' wordt, wordt de sensor geactiveerd."}},actions:{toggle_advanced:"Geavanceerde instellingen",remove:"Verwijder"},errors:{description:"Corrigeer de volgende fouten:",no_area:"Er is geen gebied geselecteerd",no_modes:"Er zijn geen modi geselecteerd waarvoor de sensor actief zou moeten zijn"}}}},codes:{title:"Codes",cards:{codes:{description:"Wijzig de instellingen voor de code.",fields:{code_arm_required:{heading:"Gebruik inschakel code",description:"Vereist een code voor het inschakelen van het alarm"},code_disarm_required:{heading:"Gebruik uitschakelcode",description:"Vereist een code om het alarm uit te schakelen"},code_format:{heading:"Code opmaak",description:"Stelt het invoertype in voor de Lovelace alarmkaart.",code_format_number:"pincode",code_format_text:"wachtwoord"}}},user_management:{title:"Gebruikersbeheer",description:"Elke gebruiker heeft zijn eigen code om het alarm in/uit te schakelen.",no_items:"Er zijn nog geen gebruikers",table:{remarks:"Opmerkingen",administrator:"Beheerder"},actions:{new_user:"nieuwe gebruiker"}},new_user:{title:"Maak een nieuwe gebruiker aan",description:"Gebruikers kunnen worden aangemaakt om toegang te verlenen tot het bedienen van het alarm.",fields:{name:{heading:"Naam",description:"Naam van de gebruiker."},code:{heading:"Code",description:"Code voor deze gebruiker."},confirm_code:{heading:"Bevestig de code",description:"Herhaal de code."},is_admin:{heading:"Gebruiker is beheerder",description:"Sta de gebruiker toe om wijzigingen aan te brengen"},can_arm:{heading:"Code toestaan voor inschakeling",description:"Door deze code in te voeren, wordt het alarm geactiveerd"},can_disarm:{heading:"Code toestaan voor uitschakelen",description:"Door deze code in te voeren, wordt het alarm gedeactiveerd"},is_override_code:{heading:"Is een forceer code",description:"Als u deze code invoert, wordt het alarm geforceerd geactiveerd"}},errors:{no_name:"Geen naam opgegeven.",no_code:"Code moet minimaal 4 tekens/cijfers bevatten.",code_mismatch:"De codes komen niet overeen."}},edit_user:{title:"Wijzig Gebruiker",description:"Wijzig de configuratie voor gebruiker '{name}'.",fields:{old_code:{heading:"Huidige code",description:"Huidige code, laat leeg om ongewijzigd te laten."}}}}},actions:{title:"Acties",cards:{notifications:{title:"Meldingen",description:"Met dit paneel kunt u meldingen beheren die moeten worden verzonden tijdens een bepaalde alarmgebeurtenis",table:{enabled:"Ingeschakeld",no_items:"Er zijn nog geen notificaties aangemaakt."},actions:{new_notification:"nieuwe melding"},filter:{label:"Filter op gebied",no_area:"Alarm master"}},actions:{description:"Dit paneel kan worden gebruikt om een apparaat te schakelen wanneer de status van het alarm veranderd.",table:{no_items:"Er zijn nog geen acties gemaakt."},actions:{new_action:"nieuwe actie"}},new_notification:{title:"Maak een melding",description:"Maak een nieuwe melding.",fields:{name:{heading:"Naam",description:"Beschrijving voor deze melding"},event:{heading:"Gebeurtenis",description:"Wanneer moet de melding worden verzonden",choose:{armed:{name:"Alarm is is ingeschakeld",description:"Het alarm is succesvol ingeschakeld"},disarmed:{name:"Alarm is uitgeschakeld",description:"Het alarm is uitgeschakeld"},triggered:{name:"Alarm is afgegaan",description:"Het alarm gaat af"},arm_failure:{name:"Kan niet inschakelen",description:"Het inschakelen van het alarm is mislukt vanwege een of meerdere blokkerende sensoren"},arming:{name:"Vertrek",description:"Vertrekvertraging ingegaan, tijd om het huis te verlaten."},pending:{name:"Binnenkomst",description:"Binnenkomstvertraging ingegaan, het alarm dient te worden uitgeschakeld."}}},mode:{heading:"Mode",description:"Beperk de actie tot specifieke inschakel modi (optioneel)"},title:{heading:"Titel",description:"Titel voor het meldingsbericht"},message:{heading:"Bericht",description:"Inhoud van het meldingsbericht"},target:{heading:"Doel",description:"Apparaat om het push-bericht naar te sturen"}},actions:{test:"Uitproberen"}},new_action:{title:"Maak een actie",description:"Dit paneel kan worden gebruikt om een apparaat te schakelen wanneer de alarmstatus verandert.",fields:{name:{heading:"Naam",description:"Beschrijving voor deze actie"},event:{heading:"Gebeurtenis",description:"Wanneer moet de actie worden uitgevoerd"},area:{heading:"Gebied",description:"Het gebied waarop de gebeurtenis van toepassing is, laat leeg om het algemene alarm te selecteren."},mode:{heading:"Mode",description:"Beperk de actie tot specifieke inschakel modi (optioneel)"},entity:{heading:"Entiteit",description:"Entiteit om actie op uit te voeren"},action:{heading:"Actie",description:"Actie die op de entiteit moet worden uitgevoerd",turn_on:"Zet aan",turn_off:"Zet uit"}}}},validation_errors:{no_triggers:"Er is geen toestand of gebeurtenis voorzien voor het activeren van deze automatisering.",empty_trigger:"Voor een van de triggers is geen status of gebeurtenis opgegeven.",invalid_trigger:"Een van de triggers heeft een ongeldige waarde: {trigger}",invalid_mode:"Ongeldige invoer opgegeven voor 'mode': {mode}",no_actions:"Er zijn geen acties ingesteld uit te voeren door deze automatisering.",no_service:"Een van de acties mist een service.",invalid_service:"Er is een ongeldige servicenaam opgegeven voor een van de acties: {service}",no_service_data:"Voor een van de acties zijn geen servicegegevens opgegeven.",no_entity_in_service_data:"Er is geen entity_id opgegeven in de service_data van een van de acties.",no_message_in_service_data:"Er is geen bericht opgegeven in de service_data van een van de acties."}}},Ge={common:Be,components:We,title:"Alarmpaneel",panels:Qe},Ke={modes_long:{armed_away:"Activée en mode absence",armed_home:"Activée en mode présence",armed_night:"Activée en mode nuit",armed_custom_bypass:"Activée en mode personnalisé"},modes_short:{armed_away:"Absence",armed_home:"Présence",armed_night:"Nuit",armed_custom_bypass:"Personnalisé"}},Ze={time_slider:{seconds:"sec",minutes:"min",infinite:"infini",none:"Aucune"},editor:{ui_mode:"Afficher l'éditeur visuel",yaml_mode:"Afficher l'éditeur de code"}},Je={general:{title:"Généraux",cards:{general:{description:"Ce panneau définit les paramètres globaux de l'alarme.",fields:{disarm_after_trigger:{heading:"Désactivation après déclenchement",description:"Lors que le temps de fonctionnement de la sirène est écoulé, désactive l'alarme au lieu de la réactiver."},enable_mqtt:{heading:"Utilisation avec MQTT",description:"Permet au panneau d'alarme d'être contrôlé via MQTT."},enable_master:{heading:"Activation de commande centralisée",description:"Créer une entité pour piloter toutes les zone en même temps."}},actions:{setup_mqtt:"Configuration MQTT",setup_master:"Configuration pricipale"}},modes:{title:"Modes",description:"Ce panneau définit le mode de gestion pour chaque type d'activation.",fields:{mode:{armed_away:"Ce mode sera utilisé lorsque toutes les personnes auront quitté la maison. Toutes les portes et fenêtres permettant l'accès à la maison seront surveillées, les détecteurs de mouvement à l'intérieur de la maison seront opérationnels.",armed_home:"Ce mode sera utilisée lorsque des personnes sont dans la maison. Toutes les portes et fenêtres permettant l'accès à la maison seront surveillées (périmétrie), les détecteurs de mouvement à l'intérieur de la maison seront inopérants.",armed_night:"Ce mode sera utilisée lors du réglage de l'alarme avant de s'endormir. Toutes les portes et fenêtres permettant l'accès à la maison seront surveillées, et les capteurs de mouvement sélectionnés (ex : rez de chaussée) dans la maison seront opérationnels.",armed_custom_bypass:"Ce mode supplémentaire permet de définir votre propre périmètre de sécurité.",enabled:"Actif",disabled:"Inactif"},exit_delay:{heading:"Délai pour sortir",description:"Lors de l'activation, pendant cette période, les capteurs ne déclencheront pas l'alarme."},entry_delay:{heading:"Délai pour entrer",description:"Temps d'attente avant que l'alarme ne se déclenche après détection d'un des capteurs."},trigger_time:{heading:"Temps de fonctionnement",description:"Temps de fonctionnement de la sirène"}}},mqtt:{title:"Configuration MQTT",description:"Ce panneau peut être utilisé pour la configuration de l'interface MQTT.",fields:{state_topic:{heading:"Etat de données",description:"Donnée sur laquelle les mises à jour d'état sont publiées"},event_topic:{heading:"Evènement de données",description:"Donnée sur laquelle les évènements d'état sont publiés"},command_topic:{heading:"Commande de donnée",description:"Donnée sur laquelle les commandes d'armement / désarmement sont envoyées."},require_code:{heading:"Code requis",description:"Exige que le code soit envoyé avec la commande."},state_payload:{heading:"Configurer une valeur par état",item:"Définir une valeur par état '{state}'"},command_payload:{heading:"Configurer une valeur par commande",item:"Définir une valeur par commande '{command}'"}}},areas:{title:"Zones",description:"Les zones peuvent être utilisées pour diviser votre système d'alarme en plusieurs secteurs.",no_items:"Il n'y a pas encore de zones définies.",table:{remarks:"Remarque",summary:"Cette zone contient des {summary_sensors} et {summary_automations}.",summary_sensors:"{number} capteurs",summary_automations:"{number} automations"},actions:{add:"Ajouter"}}},dialogs:{create_area:{title:"Nouvelle zone",fields:{copy_from:"Copy settings from"}},edit_area:{title:"Editer la zone '{area}'",name_warning:"Note: Changer le nom changera l'entity ID"},remove_area:{title:"Suppression de zone?",description:"Etes vous sur de vouloir supprimer cette zone? Cette zone contient {sensors} des capteurs et {automations} automatisations, qui seront également supprimés."},edit_master:{title:"Configuration principale"},disable_master:{title:"Désactiver la configuration principale?",description:"Etes vous sur de vouloir supprimer la configuration principale? Cette zone contient {automations} automatisations, qui seront également supprimées."}}},sensors:{title:"Capteurs",cards:{sensors:{description:"Capteurs actuellement configurés. Cliquez sur une entité pour apporter des modifications.",no_items:"Il n'y a pas encore de capteur ajouté à l'alarme. Assurez-vous de les ajouter d'abord.",table:{arm_modes:"Type d'activation",always_on:"(Toujours)"},filter:{label:"Filtrer par zone",no_area:"Aucune zone"}},add_sensors:{title:"Ajouter un capteur",description:"Ajoutez plus de capteurs. Assurez-vous que vos capteurs ont un nom personnalisé afin de pouvoir les identifier.",no_items:"Aucune entité HA disponible ne peut être configurée pour l'alarme. Assurez-vous d'inclure les entités de type binary_sensor.",actions:{add_to_alarm:"Ajouter à l'alarme",show_all:"Tout montrer"}},editor:{title:"Editer un capteur",description:"Configurer les paramètres du capteur '{entity}'.",fields:{name:{heading:"Nom",description:"Remplacer le nom personnalisé (friendly name)."},area:{heading:"Zone",description:"Selectionner une zone contenant ce capteur."},device_type:{heading:"Type de détection",description:"Choisissez un type de détection pour appliquer automatiquement les paramètres appropriés.",choose:{door:{name:"Porte",description:"Une porte, un portail ou une autre entrée utilisée pour entrer / sortir de la maison."},window:{name:"Fenêtre",description:"Une fenêtre, ou une porte non utilisée pour entrer dans la maison comme un balcon."},motion:{name:"Mouvement",description:"Capteur de présence ou appareil similaire présentant un délai entre les activations."},tamper:{name:"Effraction",description:"Détection d'arrachage du capteur, capteur de bris de verre, etc.."},environmental:{name:"Détecteur Environmental",description:"Détecteur de fumée / gaz, détecteur de fuite, etc. (non lié à la protection anti-effraction)."},other:{name:"Générique"}}},always_on:{heading:"Toujours en service",description:"Le capteur doit toujours déclencher l'alarme."},modes:{heading:"Mode possible",description:"Modes d'alarme dans lesquels ce capteur est actif."},arm_on_close:{heading:"Activer après fermeture",description:"Après la désactivation de ce capteur, le délai de sortie restant sera automatiquement ignoré."},immediate:{heading:"Immédiat",description:"L'activation de ce capteur déclenchera l'alarme immédiatement plutôt qu'après le délai d'entrée."},allow_open:{heading:"Autoriser l'ouverture lors de l'activation",description:"Permet à ce capteur d'être actif, peu de temps après votre départ afin qu'il ne bloque pas l'armement."},auto_bypass:{heading:"Bypass automatically",description:"Exclude this sensor from the alarm if it is open while arming."},trigger_unavailable:{heading:"Déclenchement lorsqu'il n'est pas disponible",description:"Lorsque l'état du capteur devient `` indisponible '', cela activera le capteur."}},actions:{toggle_advanced:"Paramètres avancées",remove:"Supprimer"},errors:{description:"Veuillez corriger les erreurs suivantes:",no_area:"Aucune zone n'est sélectionnée",no_modes:"Aucun mode sélectionné pour lequel le capteur doit être actif"}}}},codes:{title:"Codes",cards:{codes:{description:"Gestion des paramètres des codes.",fields:{code_arm_required:{heading:"Utiliser un code pour l'activation",description:"Code requis pour l'activation de l'alarme"},code_disarm_required:{heading:"Utiliser un code pour la désactivation",description:"Code requis pour la désactivation de l'alarme"},code_format:{heading:"Format du code",description:"Définit le type d'entrée pour la carte d'alarme Lovelace.",code_format_number:"pincode",code_format_text:"password"}}},user_management:{title:"Gestion des utilisateurs",description:"Chaque utilisateur a son propre code pour activer / désactiver l'alarme.",no_items:"Il n'y a aucun utilisateur de défini",table:{remarks:"Remarque",administrator:"Administrateur"},actions:{new_user:"Nouvel utilisateur"}},new_user:{title:"Créer un nouvel utilisateur",description:"Des utilisateurs peuvent être créés pour donner accès au fonctionnement de l'alarme.",fields:{name:{heading:"Nom",description:"Nom de l'utilisateur."},code:{heading:"Code",description:"Code personnel de l'utilisateur."},confirm_code:{heading:"Confirmation du code",description:"Répèter le  code."},is_admin:{heading:"L'utilisateur est aussi administrateur",description:"Autorise l'utilisateur à effectuer des changements."},can_arm:{heading:"Demande de code pour l'activation",description:"Entrer ce code pour activer l'alarme."},can_disarm:{heading:"Demande de code pour désactivation",description:"Entrer ce code pour désactiver l'alarme."},is_override_code:{heading:"Code de sécurité",description:"La saisie de ce code forcera l'activation l'alarme."}},errors:{no_name:"Aucun nom saisi.",no_code:"Le code doit contenir 4 caractères/chiffres minimum.",code_mismatch:"Les codes sont différents."}},edit_user:{title:"Editer l'utilisateur",description:"Changer la  configuration pour l'utilisateur '{name}'.",fields:{old_code:{heading:"Code utilisé",description:"Code actuel, laissez vide pour ne rien changer."}}}}},actions:{title:"Actions",cards:{notifications:{title:"Notifications",description:"À l'aide de ce panneau, vous pouvez gérer les notifications à envoyer lors d'un évènement d'alarme",table:{enabled:"Active",no_items:"Il n'y a aucune notification de  créée."},actions:{new_notification:"Nouvelle notification"},filter:{label:"Filtrer par zone",no_area:"Alarme principale"}},actions:{description:"Ce panneau est  utilisé pour changer d'état les appareils de votre choix.",table:{no_items:"Il n'y a aucune action de créer."},actions:{new_action:"Nouvelle action"}},new_notification:{title:"Créer une notification",description:"Créer une nouvelle notification.",fields:{name:{heading:"Nom",description:"Description de la notification"},event:{heading:"Evènement",description:"Détermine quand la notification doit être envoyée",choose:{armed:{name:"Alarme activée ",description:"l'alarme s'est correctement activée"},disarmed:{name:"Alarme désactivée",description:"L'alarme est désactivée"},triggered:{name:"Alarme déclenchée",description:"L'alarme est déclenchée"},arm_failure:{name:"Armement impossible",description:"L'armement est impossible dû à un ou plusieurs capteurs"},arming:{name:"Délai de sortie activé",description:"Le délai de sortie est activé, vous devez quitter la maison."},pending:{name:"Délai d'entrée activé",description:"Le délai d'entrée est activé, l'alarme va se déclencher."}}},mode:{heading:"Mode",description:"Limite la notification à un mode spécifique (optionnel)"},title:{heading:"Titre",description:"Titre du message de la notification"},message:{heading:"Message",description:"Contenu du message de la notification"},target:{heading:"Cible",description:"Appareil recevant le message"}},actions:{test:"Essai"}},new_action:{title:"Créer une action",description:"Ce panneau peut être utilisé pour commuter un appareil lorsque l'état de l'alarme change.",fields:{name:{heading:"Nom",description:"Description de  l'action"},event:{heading:"Evènement",description:"Détermine quand l'action doit être exécutée"},area:{heading:"Zone",description:"Zone pour laquelle l'évènement s'applique, laissez vide pour sélectionner l'alarme globale."},mode:{heading:"Mode",description:"Limite l'action à un mode spécifique (optionnel)"},entity:{heading:"Entité",description:"Entité sur laquelle effectuer une action"},action:{heading:"Action",description:"Action à exécuter sur l'entité",turn_on:"Mettre à on",turn_off:"Mettre à off"}}}},validation_errors:{no_triggers:"Aucun état ou évènement prévu pour le déclenchement de cette automatisation.",empty_trigger:"L'un des déclencheurs n'a aucun état ou évènement fourni.",invalid_trigger:"L'un des déclencheurs a une valeur non valide: {trigger}",invalid_mode:"Entrée non valide fournie par  le 'mode': {mode}",no_actions:"Aucune action n'est prévue pour être effectuée par cette automatisation.",no_service:"Il manque un service dans l’une des actions.",invalid_service:"Un nom de service non valide a été fourni pour l'une des actions: {service}",no_service_data:"Aucune donnée de service n'a été fournie pour l'une des actions.",no_entity_in_service_data:"Aucun entity_id n'a été fourni dans le service_data de l'une des actions.",no_message_in_service_data:"Aucun message n'a été fourni dans le service_data de l'une des actions."}}},Xe={common:Ke,components:Ze,title:"Gestion de L'alarme",panels:Je},ea={modes_long:{armed_away:"Modalità 'fuori casa' attiva",armed_home:"Modalità 'in casa' attiva",armed_night:"Modalità 'notte' attiva",armed_custom_bypass:"Modalità 'personalizzato' attiva"},modes_short:{armed_away:"Fuori casa",armed_home:"In casa",armed_night:"Notte",armed_custom_bypass:"Personalizzato"}},aa={time_slider:{seconds:"sec",minutes:"min",infinite:"infinito",none:"niente"},editor:{ui_mode:"Passa a UI",yaml_mode:"Passa a YAML"}},ta={general:{title:"Generali",cards:{general:{description:"Questo pannello definisce alcune impostazioni da applicare alle modalità di allarme.",fields:{disarm_after_trigger:{heading:"Disattiva allarme dopo l'attivazione",description:"Dopo che il tempo di attivazione è scaduto, disattivare l'allarme invece di tornare allo stato inserito."},enable_mqtt:{heading:"Abilita MQTT",description:"Permetti al pannello allarme di essere controllato attraverso MQTT."},enable_master:{heading:"Enable alarm master",description:"Creates an entity for controlling all areas simultaneously."}},actions:{setup_mqtt:"Configurazione MQTT",setup_master:"Master Configuration"}},modes:{title:"Modes",description:"This panel can be used to set up the arm modes of the alarm.",fields:{mode:{armed_away:"Modalità 'fuori casa': da utilizzare quando tutte le persone lasciano la casa. Tutti i sensori di porte e finestre che consentono l'accesso alla casa saranno attivi, così come i sensori di movimento all'interno della casa.",armed_home:"Modalità 'in casa': da utilizzare quando si attiva l'allarme mentre le persone sono in casa. Tutti i sensori di porte e finestre che consentono l'accesso alla casa saranno attivi, ma non i sensori di movimento all'interno della casa.",armed_night:"Modalità 'notte': da utilizzare quando si imposta la sveglia prima di andare a dormire. Tutti i sensori di porte e finestre che consentono l'accesso alla casa saranno attivi e sensori di movimento selezionati (ad esempio al piano di sotto) nella casa.",armed_custom_bypass:"Modalità 'personalizzato': da utilizzare per definire una modalità di allarme specifica per le esigenze dell'utilizzatore.",enabled:"Enabled",disabled:"Disabled"},exit_delay:{heading:"Tempo di preattivazione",description:"Quando si attiva l'allarme, entro questo periodo di tempo i sensori non attiveranno ancora l'allarme."},entry_delay:{heading:"Ritardo di attivazione",description:"Tempo di ritardo fino allo scatto dell'allarme dopo l'attivazione di uno dei sensori."},trigger_time:{heading:"Tempo di attivazione",description:"Tempo durante il quale suonerà la sirena"}}},mqtt:{title:"Configurazione MQTT",description:"Questo pannello può essere usato per le impostazioni MQTT.",fields:{state_topic:{heading:"Topic di stato",description:"Topic su cui vengono pubblicati gli aggiornamenti di stato"},command_topic:{heading:"Topic di comando",description:"Topic su cui vengono inviati i comandi di inserimento / disinserimento."},require_code:{heading:"Richiedi Codice",description:"Richiedi il codice da inviare con il comando."},state_payload:{heading:"Configura payload per stato",item:"Definisci un payload per lo stato '{state}'"},command_payload:{heading:"Configura payload per comando",item:"Definisci un payload per il comando '{command}'"}}},areas:{title:"Areas",description:"Areas can be used for dividing your alarm system into multiple compartments.",no_items:"There are no areas defined yet.",table:{remarks:"Remarks",summary:"This area contains {summary_sensors} and {summary_automations}.",summary_sensors:"{number} sensors",summary_automations:"{number} automations"},actions:{add:"Add"}}},dialogs:{create_area:{title:"New area",fields:{copy_from:"Copy settings from"}},edit_area:{title:"Editing area '{area}'",name_warning:"Note: changing the name will change the entity ID"},remove_area:{title:"Remove area?",description:"Are you sure you want to remove this area? This area contains {sensors} sensors and {automations} automations, which will be removed as well."},edit_master:{title:"Master configuration"},disable_master:{title:"Disable master?",description:"Are you sure you want to remove the alarm master? This area contains {automations} automations, which will be removed with this action."}}},sensors:{title:"Sensori",cards:{sensors:{description:"Sensori attualmente configurati. Clicca sull'entità per modificare.",no_items:"Non ci sono ancora sensori aggiunti a questo allarme. Assicurati di aggiungerli prima.",table:{arm_modes:"Modalità di attivazione",always_on:"(Sempre)"},filter:{label:"Filter by area",no_area:"(No area)"}},add_sensors:{title:"Aggiungi Sensori",description:"Aggiungi più sensori. Assicurati che i sensori abbiano un friendly_name (nome amichevole), in modo da identificarli più facilmente.",no_items:"Non ci sono entità disponibili che possono essere configurate con l'allarme. Assicurati di includere entità del tipo binary_sensor (sensore binario).",actions:{add_to_alarm:"aggiungi all'allarme",show_all:"Mostra tutti"}},editor:{title:"Modifica Sensore",description:"Configura le impostazioni del sensore '{entity}'.",fields:{name:{heading:"Nome",description:"Sovrascrivi friendly name."},area:{heading:"Area",description:"Select an area which contains this sensor."},device_type:{heading:"Device Type",description:"Choose a device type to automatically apply appropriate settings.",choose:{door:{name:"Door",description:"A door, gate or other entrance that is used for entering/leaving the home."},window:{name:"Window",description:"A window, or a door not used for entering the house such as balcony."},motion:{name:"Motion",description:"Presence sensor or similar device having a delay between activations."},tamper:{name:"Tamper",description:"Detector of sensor cover removal, glass break sensor, etc."},environmental:{name:"Environmental",description:"Smoke/gas sensor, leak detector, etc. (not related to burglar protection)."},other:{name:"Generic"}}},always_on:{heading:"Sempre attivo",description:"Il sensore attiverà sempre l'allarme."},modes:{heading:"Modalità attive",description:"Modalità di allarme in cui il sensore risulta collegato."},arm_on_close:{heading:"Arm after closing",description:"After deactivation of this sensor, the remaining exit delay will automatically be skipped."},immediate:{heading:"Immediato",description:"Il sensore si attiva saltando il ritardo."},allow_open:{heading:"Permetti apertura",description:"Consentire a questo sensore di rimanere attivo poco dopo essere usciti."},auto_bypass:{heading:"Bypass automatically",description:"Exclude this sensor from the alarm if it is open while arming."},trigger_unavailable:{heading:"Fai scattare l'allarme quando non disponibile",description:"L'allarme scatterà quando lo stato del sensore diverrà 'non disponibile'."}},actions:{toggle_advanced:"Advanced settings",remove:"Remove"},errors:{description:"Please correct the following errors:",no_area:"No area is selected",no_modes:"No modes are selected for which the sensor should be active"}}}},codes:{title:"Codici",cards:{codes:{description:"Modifica le impostazioni dei codici.",fields:{code_arm_required:{heading:"Usa codice d'attivazione",description:"Richiedi un codice per attivare l'allarme"},code_disarm_required:{heading:"Usa codice di disattivazione",description:"Richiedi un codice per disattivare l'allarme"},code_format:{heading:"Formato del codice",description:"Imposta il tipo di codice da digitare nella card di Lovelace.",code_format_number:"codice numerico",code_format_text:"password"}}},user_management:{title:"Gestione utente",description:"Ogni utente ha il suo codice per attivare/disattivare l'allarme.",no_items:"Non è stato creato nessun utente per ora",table:{remarks:"Ruolo",administrator:"Amministratore"},actions:{new_user:"nuovo utente"}},new_user:{title:"Crea nuovo utente",description:"Gli utenti potranno operare con l'allarme.",fields:{name:{heading:"Nome",description:"Nome dell'utente."},code:{heading:"Codice operativo",description:"Codice che utilizzerà quest'utente."},confirm_code:{heading:"Ripeti codice operativo",description:"Ripeti il codice operativo scelto."},is_admin:{heading:"L'utente è un amministratore",description:"Ciò consente al utente di effettuare modifiche al sistema di allarme"},can_arm:{heading:"Utilizza codice per attivare l'allarme",description:"Utilizza codice per attivare l'allarme"},can_disarm:{heading:"Utilizza codice per disattivare l'allarme",description:"Utilizza codice per disattivare l'allarme"},is_override_code:{heading:"E' un codice di forzatura",description:"Inserendo questo codice forzerai lo stato di attivazione dell'allarme"}},errors:{no_name:"Non hai inserito il nome.",no_code:"Il codice deve avere almeno 4 numeri o caratteri.",code_mismatch:"Il codice scelto non combacia, verifica il codice inserito."}},edit_user:{title:"Modifica Utente",description:"Cambia impostazioni per l'utente '{name}'.",fields:{old_code:{heading:"Modifica Codice",description:"Codice attuale, lascia vuoto per non modificare."}}}}},actions:{title:"Azioni",cards:{notifications:{title:"Notifiche",description:"Con questo pannello puoi gestire le notifiche da inviare quanto accade un determinato evento",table:{enabled:"Abilitato",no_items:"Non è stata creata nessuna notifica per ora."},actions:{new_notification:"nuova notifica"},filter:{label:"Filter by area",no_area:"Alarm master"}},actions:{description:"Questo pannello è in fase di sviluppo. Sarà usato per cambiare lo stato di una o più entità.",table:{no_items:"Non è stata creata nessuna azione per ora."},actions:{new_action:"nuova azione"}},new_notification:{title:"Crea notifica",description:"Crea una nuova notifica.",fields:{name:{heading:"Nome",description:"Descrizione della notifica"},event:{heading:"Evento",description:"Quando questa notifica deve essere inviata",choose:{armed:{name:"Alarm is armed",description:"The alarm is succesfully armed"},disarmed:{name:"Alarm is disarmed",description:"The alarm is disarmed"},triggered:{name:"Alarm is triggered",description:"The alarm is triggered"},arm_failure:{name:"Failed to arm",description:"The arming of the alarm failed due to one or more open sensors"},arming:{name:"Exit delay started",description:"Exit delay started, ready to leave the house."},pending:{name:"Entry delay started",description:"Entry delay started, the alarm will trigger soon."}}},mode:{heading:"Modalità",description:"Limita ad una specifica modalità di allarme (opzionale)"},title:{heading:"Titolo",description:"Titolo per il messaggio di notifica"},message:{heading:"Messaggio",description:"Contenuto del messaggio di notifica"},target:{heading:"Destinatario",description:"Dispositivo a cui inviare il messaggio di notifica"}},actions:{test:"Try it"}},new_action:{title:"Crea azione",description:"Questo pannello può essere usato per cambiare lo stato di un entità quando lo stato dell'allarme cambia.",fields:{name:{heading:"Nome",description:"Descrizione dell'azione"},event:{heading:"Evento",description:"Quando questa azione deve essere eseguita"},area:{heading:"Area",description:"Area for which the event applies, leave empty to select the global alarm."},mode:{heading:"Modalità",description:"Limita ad una specifica modalità di allarme (opzionale)"},entity:{heading:"Entità",description:"Entità su cui eseguire l'azione"},action:{heading:"Azione",description:"Azione che deve eseguire l'entità",turn_on:"Accendi",turn_off:"Spegni"}}}},validation_errors:{no_triggers:"Nessuno evento o modalità scelto per l'attivazione di questa azione.",empty_trigger:"Evento o modalità mancante per questa azione.",invalid_trigger:"Uno degli eventi selezionati ha un valore non valido: {trigger}",invalid_mode:"Input selezionato non valido per la modalità: {mode}",no_actions:"Nessuna azione è stata scelta per questa azione.",no_service:"Una di queste azioni ha un servizio mancante.",invalid_service:"Il nome del servizio non è valido per una delle azioni: {service}",no_service_data:"Dati del servizio non inseriti per una delle azioni.",no_entity_in_service_data:"Nessun entity_id è stata inserita in service_data di una delle azioni.",no_message_in_service_data:"Nessun messaggio è stato inserito nel service_data di una delle azioni."}}},ia={common:ea,components:aa,title:"Alarm panel",panels:ta},sa={modes_long:{armed_away:"Mode fora de casa activat",armed_home:"Mode a casa activat",armed_night:"Mode nit activat",armed_custom_bypass:"Mode personalitzat activat"},modes_short:{armed_away:"Fora",armed_home:"Casa",armed_night:"Nit",armed_custom_bypass:"Personalitzat"}},na={time_slider:{seconds:"seg",minutes:"min",infinite:"infinit",none:"cap"},editor:{ui_mode:"Canvia a UI",yaml_mode:"Canvia a YAML"}},ra={general:{title:"General",cards:{general:{description:"Aquest tauler defineix alguns paràmetres globals de l'alarma.",fields:{disarm_after_trigger:{heading:"Desactivar després del disparador",description:"Quan hagi transcorregut el temps d’activació, desactiveu l’alarma en lloc de tornar a l’estat armat."},enable_mqtt:{heading:"Activa MQTT",description:"Permet controlar el tauler d'alarma mitjançant MQTT."},enable_master:{heading:"Activa l'alarma mestra",description:"Crea una entitat per controlar totes les àrees simultàniament."}},actions:{setup_mqtt:"Configuració MQTT",setup_master:"Configuració mestra"}},modes:{title:"Modes",description:"Aquest tauler es pot utilitzar per configurar els modes d'activació de l'alarma.",fields:{mode:{armed_away:"El mode fora de casa s'utilitzarà quan totes les persones surtin de casa. Es controlen totes les portes i finestres que permeten l'accés a la casa, així com els sensors de moviment dins de la casa.",armed_home:"El mode a casa (també conegut com mode casa) s'utilitzarà quan configureu l'alarma mentre hi hagi persones a la casa. Es controlen totes les portes i finestres que permetin l'accés a la casa, però no els sensors de moviment a l'interior de la casa.",armed_night:"El mode nit s'utilitzarà quan configureu l'alarma abans d'anar a dormir. Es controlaran totes les portes i finestres que permetin l'accés a la casa i es seleccionaran els sensors de moviment (per exemple, a la planta baixa) de la casa.",armed_custom_bypass:"Un mode addicional per definir el vostre propi perímetre de seguretat.",enabled:"Activat",disabled:"Desactivat"},exit_delay:{heading:"Retard de sortida",description:"Quan activeu l'alarma, en aquest període de temps els sensors encara no activaran l'alarma."},entry_delay:{heading:"Retard d'entrada",description:"Temps de retard fins que s'activi l'alarma després que s'activi un dels sensors."},trigger_time:{heading:"Temps d'activació",description:"Temps durant el qual sonarà la sirena"}}},mqtt:{title:"Configuració MQTT",description:"Aquest tauler es pot utilitzar per configurar la interfície MQTT.",fields:{state_topic:{heading:"Tema d'estat",description:"Tema sobre el qual es publiquen les actualitzacions d'estat"},event_topic:{heading:"Tema d'esdeveniment",description:"Tema sobre el qual es publiquen els esdeveniments d'alarma"},command_topic:{heading:"Tama d'ordre",description:"Tema sobre el qual s'envien les ordres d'activació/desactivació."},require_code:{heading:"Requereix codi",description:"Requereix l'enviament d'un codi amb l'ordre."},state_payload:{heading:"Configura la càrrega útil per estat",item:"Definiu una càrrega útil per a l'estat '{state}'"},command_payload:{heading:"Configura la càrrega útil per ordre",item:"Definiu una càrrega útil per a l'ordre '{command}'"}}},areas:{title:"Àrees",description:"Les àrees es poden utilitzar per dividir el sistema d'alarma en diversos compartiments.",no_items:"Encara no hi ha àrees definides.",table:{remarks:"Observacions",summary:"Aquesta àrea conté {summary_sensors} i {summary_automations}.",summary_sensors:"{number} sensors",summary_automations:"{number} automatismes"},actions:{add:"Afegeix"}}},dialogs:{create_area:{title:"Àrea nova",fields:{copy_from:"Copia la configuració de"}},edit_area:{title:"Edita l'àrea '{area}'",name_warning:"Nota: si canvieu el nom, es canviarà l'identificador d'entitat"},remove_area:{title:"Voleu eliminar l'àrea?",description:"Confirmeu que voleu eliminar aquesta àrea? Aquesta àrea conté {sensors} sensors i {automatismes} automatismes, que també s'eliminaran."},edit_master:{title:"Configuració mestra"},disable_master:{title:"Voleu desactivar l'alarma mestra?",description:"Confirmeu que voleu eliminar l'alarma mestra? Aquesta àrea conté automatismes {automatismes}, que s'eliminaran amb aquesta acció."}}},sensors:{title:"Sensors",cards:{sensors:{description:"Sensors configurats actualment. Feu clic a una entitat per fer canvis.",no_items:"No hi ha cap sensor per mostrar",table:{arm_modes:"Modes d'armat",always_on:"(Sempre)"},filter:{label:"Filtra per àrea",no_area:"(Sense àrea)"}},add_sensors:{title:"Afegeix sensors",description:"Afegiu més sensors. Assegureu-vos que els vostres sensors tinguin un friendly_name perquè pugueu identificar-los.",no_items:"No hi ha entitats HA disponibles que es puguin configurar per a l'alarma. Assegureu-vos d'incloure entitats del tipus binary_sensor.",actions:{add_to_alarm:"afegeix a l'alarma",show_all:"Mostra-ho tot"}},editor:{title:"Edita el sensor",description:"Edita la configuració del sensor de '{entity}'.",fields:{name:{heading:"Nom",description:"Sobreescriu el friendly_name"},area:{heading:"Àrea",description:"Seleccioneu una àrea que contingui aquest sensor."},device_type:{heading:"Tipus de dispositiu",description:"Trieu un tipus de dispositiu per aplicar automàticament la configuració adequada.",choose:{door:{name:"Porta",description:"Porta, porta de garatge o altra entrada que s'utilitzi per entrar/sortir de casa."},window:{name:"Finestra",description:"Finestra o una porta que no s'utilitza per entrar a la casa, com ara un balcó."},motion:{name:"Moviment",description:"Sensor de presència o dispositiu similar que té un retard entre les activacions."},tamper:{name:"Antisabotatge",description:"Detector de retirada de la coberta del sensor, sensor de trencament de vidre, etc."},environmental:{name:"Ambiental",description:"Sensor de fum o gas, detector de fuites, etc. (no relacionat amb la protecció antirobatori)."},other:{name:"Genèric"}}},always_on:{heading:"Sempre activat",description:"El sensor sempre ha de disparar l'alarma."},modes:{heading:"Modes habilitats",description:"Modes d'alarma en què aquest sensor està actiu."},arm_on_close:{heading:"Arma després de tancar",description:"Després de la desactivació d'aquest sensor, s'omet automàticament el temps de retard de sortida restant."},immediate:{heading:"Immediat",description:"L'activació d'aquest sensor activarà l'alarma directament sense temps de retard a l'entrada."},allow_open:{heading:"Permet obrir mentre s'arma l'alarma",description:"Permeteu que aquest sensor estigui actiu poc després de configurar-lo de manera que no bloquegi l'activació de l'alarma."},auto_bypass:{heading:"Omet automàticament",description:"Excloeu aquest sensor de l'alarma si està obert mentre s'arma l'alarma."},trigger_unavailable:{heading:"Activador quan no estigui disponible",description:"Quan l'estat del sensor no estigui disponible, això activarà el sensor."}},actions:{toggle_advanced:"Configuració avançada",remove:"Elimina"},errors:{description:"Corregiu els errors següents:",no_area:"No s'ha seleccionat cap àrea",no_modes:"No s'han seleccionat modes per als quals el sensor hauria d'estar actiu"}}}},codes:{title:"Codis",cards:{codes:{description:"Canvieu la configuració del codi.",fields:{code_arm_required:{heading:"Utilitzeu un codi d'activació",description:"Requereix un codi per activar l'alarma"},code_disarm_required:{heading:"Utilitzeu un codi de desactivació",description:"Requereix un codi per desactivar l'alarma"},code_format:{heading:"Format del codi",description:"Estableix el tipus de codi per a la targeta d'alarma Lovelace.",code_format_number:"codi PIN",code_format_text:"contrasenya"}}},user_management:{title:"Gestió d'usuaris",description:"Cada usuari té el seu propi codi per activar/desactivar l'alarma.",no_items:"Encara no hi ha usuaris",table:{remarks:"Observacions",administrator:"Administrador"},actions:{new_user:"usuari nou"}},new_user:{title:"Crea un usuari nou",description:"Es poden crear usuaris per proporcionar accés al funcionament de l'alarma.",fields:{name:{heading:"Nom",description:"Nom de l'usuari."},code:{heading:"Codi",description:"Codi d'aquest usuari."},confirm_code:{heading:"Confirmeu el codi",description:"Repetiu el codi."},is_admin:{heading:"L'usuari és administrador",description:"Permetre a l'usuari fer canvis"},can_arm:{heading:"Permetre que el codi active l'alarma",description:"Entering this code activates the alarm"},can_disarm:{heading:"Permetre que el codi desactive l'alarma",description:"Entering this code deactivates the alarm"},is_override_code:{heading:"És un codi de sobreescriptura",description:"Si introduïu aquest codi, es forçarà l'estat d'activació de l'alarma"}},errors:{no_name:"No s'ha proporcionat cap nom.",no_code:"El codi ha de tenir 4 caràcters o números com a mínim.",code_mismatch:"Els codis no coincideixen."}},edit_user:{title:"Edita l'usuari",description:"Canvia la configuració de l'usuari '{name}'.",fields:{old_code:{heading:"Codi actual",description:"Codi actual, deixeu-lo en blanc per deixar-lo sense canvis."}}}}},actions:{title:"Accions",cards:{notifications:{title:"Notificacions",description:"Utilitzant aquest tauler, podeu gestionar les notificacions que s'envien quan es produeix un determinat esdeveniment d'alarma.",table:{enabled:"Activat",no_items:"Encara no s'han creat notificacions."},actions:{new_notification:"nova notificació"},filter:{label:"Filtra per àrea",no_area:"Alarma mestra"}},actions:{description:"Aquest tauler es pot utilitzar per canviar un dispositiu quan l'estat d'alarma canvia.",table:{no_items:"Encara no s'han creat accions."},actions:{new_action:"nova acció"}},new_notification:{title:"Crea una notificació",description:"Crea una nova notificació.",fields:{name:{heading:"Nom",description:"Descripció d'aquesta notificació"},event:{heading:"Esdeveniment",description:"Quan s'ha d'enviar la notificació",choose:{armed:{name:"L'alarma està activada",description:"L'alarma s'ha activat correctament"},disarmed:{name:"L'alarma està desactivada",description:"L'alarma està desactivada"},triggered:{name:"L'alarma s'activat per esdeveniment",description:"L'alarma s'activat per esdeveniment"},arm_failure:{name:"No s'ha pogut activar l'alarma",description:"L'activació de l'alarma ha fallat a causa d'un o més sensors estan oberts"},arming:{name:"S'ha iniciat el retard de sortida",description:"S'ha iniciat el retard de sortida, a punt per sortir de casa."},pending:{name:"S'ha iniciat el retard d'entrada",description:"El retard d'entrada s'ha iniciat, l'alarma s'activarà aviat."}}},mode:{heading:"Mode",description:"Limita l'acció a modes específics d'activació (opcional)"},title:{heading:"Títol",description:"Títol del missatge de notificació"},message:{heading:"Missatge",description:"Contingut del missatge de notificació"},target:{heading:"Destinatari",description:"Dispositiu al qual enviar el missatge"}},actions:{test:"Prova-ho"}},new_action:{title:"Crea una acció",description:"Aquest tauler es pot utilitzar per canviar un dispositiu quan l'estat d'alarma canvia.",fields:{name:{heading:"Nom",description:"Descripció d'aquesta acció"},event:{heading:"Esdeveniment",description:"Quan s'ha d'executar l'acció"},area:{heading:"Àrea",description:"Àrea per a la qual s'aplica l'esdeveniment, deixeu-la en blanc per seleccionar l'alarma global."},mode:{heading:"Mode",description:"Limita l'acció a modes específics d'activació (opcional)"},entity:{heading:"Entitat",description:"Entitat en què es realitzarà l'acció"},action:{heading:"Acció",description:"Acció a realitzar a l'entitat",turn_on:"Activa",turn_off:"Desactiva"}}}},validation_errors:{no_triggers:"No s'ha proporcionat cap estat ni cap esdeveniment per activar aquesta automatització.",empty_trigger:"No s'ha proporcionat estat ni esdeveniment d'un dels activadors.",invalid_trigger:"Un dels activadors té un valor no vàlid: {trigger}",invalid_mode:"S'ha proporcionat una entrada no vàlida per al mode: {mode}",no_actions:"No s'han indicat accions per aquesta automatització",no_service:"Falta un servei a una de les accions.",invalid_service:"S'ha proporcionat un nom de servei no vàlid per a una de les accions: {service}",no_service_data:"No s'han proporcionat dades de servei per a una de les accions.",no_entity_in_service_data:"No s'ha proporcionat cap entity_id a la service_data d'una de les accions.",no_message_in_service_data:"No s'ha proporcionat cap missatge a la service_data d'una de les accions."}}},oa={common:sa,components:na,title:"Tauler alarma",panels:ra},da={en:Object.freeze({__proto__:null,common:Le,components:Re,title:"Alarm panel",panels:Ve,default:Ue}),et:Object.freeze({__proto__:null,common:Ie,components:Fe,title:"Alarm panel",panels:He,default:Ye}),nl:Object.freeze({__proto__:null,common:Be,components:We,title:"Alarmpaneel",panels:Qe,default:Ge}),fr:Object.freeze({__proto__:null,common:Ke,components:Ze,title:"Gestion de L'alarme",panels:Je,default:Xe}),it:Object.freeze({__proto__:null,common:ea,components:aa,title:"Alarm panel",panels:ta,default:ia}),ca:Object.freeze({__proto__:null,common:sa,components:na,title:"Tauler alarma",panels:ra,default:oa})};function la(e,a,t="",i=""){const s=a.replace(/['"]+/g,"").replace("-","_");var n;try{n=e.split(".").reduce((e,a)=>e[a],da[s])}catch(a){n=e.split(".").reduce((e,a)=>e[a],da.en)}if(void 0===n&&(n=e.split(".").reduce((e,a)=>e[a],da.en)),""!==t&&""!==i){Array.isArray(t)||(t=[t]),Array.isArray(i)||(i=[i]);for(let e=0;e<t.length;e++)n=n.replace(t[e],i[e])}return n}let ca=class extends re{constructor(){super(...arguments),this.min=0,this.max=100,this.step=10,this.value=0,this.scaleFactor=1,this.unit="",this.disabled=!1}firstUpdated(){this.value>0&&this.value<60&&(this.unit="sec"),"min"==this.unit&&(this.scaleFactor=1/60),"min"==this.unit&&(this.step=1)}render(){return L`
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
    `}getValue(){const e=Number(Math.round(this.value*this.scaleFactor));return!e&&this.zeroValue?this.zeroValue:`${e} ${this.getUnit()}`}getUnit(){switch(this.unit){case"sec":return la("components.time_slider.seconds",this.hass.language);case"min":return la("components.time_slider.minutes",this.hass.language);default:return""}}getSlider(){return L`
      <ha-slider
        pin
        min=${Math.round(this.min*this.scaleFactor)}
        max=${Math.round(this.max*this.scaleFactor)}
        step=${this.step}
        value=${Math.round(this.value*this.scaleFactor)}
        ?disabled=${this.disabled}
        @change=${this.updateValue}
      ></ha-slider>
    `}updateValue(e){const a=Number(e.target.value);this.value=Math.round(a/this.scaleFactor)}toggleUnit(){this.unit="min"==this.unit?"sec":"min",this.scaleFactor="min"==this.unit?1/60:1,this.step="min"==this.unit?1:10}};ca.styles=se`
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
  `,a([Z({type:Number})],ca.prototype,"min",void 0),a([Z({type:Number})],ca.prototype,"max",void 0),a([Z({type:Number})],ca.prototype,"step",void 0),a([Z({type:Number})],ca.prototype,"value",void 0),a([Z()],ca.prototype,"scaleFactor",void 0),a([Z({type:String})],ca.prototype,"unit",void 0),a([Z({type:Boolean})],ca.prototype,"disabled",void 0),a([Z({type:String})],ca.prototype,"zeroValue",void 0),ca=a([G("time-slider")],ca);var ha,ua,ma,pa,ga,va,_a,fa;function ba(e){return function(e){if(!e)return je;if(e.attributes.icon)return e.attributes.icon;var a=Oe(e.entity_id);return a in De?De[a](e):Ee(a,e.state)}(e)}function wa(e){return(e=e.replace("_"," ")).charAt(0).toUpperCase()+e.slice(1)}function ya(e){return e?e.attributes&&e.attributes.friendly_name?e.attributes.friendly_name:String(e.entity_id.split(".").pop()):"(unrecognized entity)"}function $a(e){return e.filter((e,a,t)=>t.indexOf(e)===a)}function ka(e,a){return e?Object.entries(e).filter(([e])=>a.includes(e)).reduce((e,[a,t])=>Object.assign(e,{[a]:t}),{}):{}}function Aa(e,a){return e?Object.entries(e).filter(([e])=>!a.includes(e)).reduce((e,[a,t])=>Object.assign(e,{[a]:t}),{}):{}}function xa(e,a){const t=Object.keys(e),i=Object.keys(a);if(t.length!==i.length)return!1;for(const i of t)if("object"==typeof e[i]&&"object"==typeof a[i]){if(xa(e[i],a[i]))return!1}else if(e[i]!==a[i])return!1;return!0}function Sa(e,a){const t=e.target;Te(t,"show-dialog",{dialogTag:"error-dialog",dialogImport:()=>Promise.resolve().then((function(){return ot})),dialogParams:{error:a}})}function Oa(e,a){Sa(a,L`
    <b>Something went wrong!</b><br />
    ${e.body.message?L`
          ${e.body.message}<br /><br />
        `:""}
    ${e.error}<br /><br />
    Please <a href="https://github.com/nielsfaber/alarmo/issues">report</a> the bug.
  `)}!function(e){e.ArmedAway="hass:car-traction-control",e.ArmedHome="hass:home-outline",e.ArmedNight="hass:weather-night",e.ArmedCustom="hass:star-outline"}(ha||(ha={})),function(e){e.STATE_ALARM_DISARMED="disarmed",e.STATE_ALARM_ARMED_HOME="armed_home",e.STATE_ALARM_ARMED_AWAY="armed_away",e.STATE_ALARM_ARMED_NIGHT="armed_night",e.STATE_ALARM_ARMED_CUSTOM_BYPASS="armed_custom_bypass",e.STATE_ALARM_PENDING="pending",e.STATE_ALARM_ARMING="arming",e.STATE_ALARM_DISARMING="disarming",e.STATE_ALARM_TRIGGERED="triggered"}(ua||(ua={})),function(e){e.COMMAND_ALARM_DISARM="disarm",e.COMMAND_ALARM_ARM_HOME="arm_home",e.COMMAND_ALARM_ARM_AWAY="arm_away",e.COMMAND_ALARM_ARM_NIGHT="arm_night",e.COMMAND_ALARM_ARM_CUSTOM_BYPASS="arm_custom_bypass"}(ma||(ma={})),function(e){e.Door="door",e.Window="window",e.Motion="motion",e.Tamper="tamper",e.Environmental="environmental",e.Other="other"}(pa||(pa={})),function(e){e.Door="hass:door-closed",e.Window="hass:window-closed",e.Motion="hass:motion-sensor",e.Tamper="hass:vibrate",e.Environmental="hass:fire",e.Other="hass:contactless-payment-circle-outline"}(ga||(ga={})),function(e){e.ArmedAway="armed_away",e.ArmedHome="armed_home",e.ArmedNight="armed_night",e.ArmedCustom="armed_custom_bypass"}(va||(va={})),function(e){e.Disarmed="disarmed",e.Armed="armed",e.Triggered="triggered",e.Pending="pending",e.Arming="arming"}(_a||(_a={})),function(e){e.ArmFailure="arm_failure"}(fa||(fa={}));const Ca=(e,a)=>{if(!e)return!1;switch(e){case ua.STATE_ALARM_ARMED_AWAY:return a[va.ArmedAway].enabled;case ua.STATE_ALARM_ARMED_HOME:return a[va.ArmedHome].enabled;case ua.STATE_ALARM_ARMED_NIGHT:return a[va.ArmedNight].enabled;case ua.STATE_ALARM_ARMED_CUSTOM_BYPASS:return a[va.ArmedCustom].enabled;default:return!0}};function ja(e,a){return Object.entries(a).forEach(([a,t])=>{e=a in e&&"object"==typeof e[a]&&null!==e[a]?Object.assign(Object.assign({},e),{[a]:ja(e[a],t)}):Object.assign(Object.assign({},e),{[a]:t})}),e}let Ta=class extends re{constructor(){super(...arguments),this.label="",this.items=[],this.clearable=!1,this.icons=!1,this.rowRenderer=(e,a,t)=>{!e.firstElementChild&&this.icons?e.innerHTML='\n        <style>\n          paper-icon-item {\n              margin: -10px;\n              padding: 0;\n          }\n          ha-icon {\n              display: flex;\n              flex: 0 0 40px;\n              color: var(--state-icon-color);\n          }\n        </style>\n        <paper-icon-item>\n          <ha-icon icon="" slot="item-icon"></ha-icon>\n          <paper-item-body two-line>\n            <div class="name"></div>\n            <div secondary></div>\n          </paper-item-body>\n        </paper-icon-item>\n        ':e.firstElementChild||(e.innerHTML='\n        <style>\n          paper-item {\n              margin: -10px;\n              padding: 0;\n          }\n        </style>\n        <paper-item>\n          <paper-item-body two-line>\n            <div class="name"></div>\n            <div secondary></div>\n          </paper-item-body>\n        </paper-item>\n        '),e.querySelector(".name").textContent=t.item.name,e.querySelector("[secondary]").textContent=t.item.description,this.icons&&(e.querySelector("ha-icon").icon=t.item.icon)}}open(){this.updateComplete.then(()=>{var e,a;null===(a=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector("vaadin-combo-box-light"))||void 0===a||a.open()})}focus(){this.updateComplete.then(()=>{var e;(null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector("paper-input")).focus()})}shouldUpdate(e){if(e.get("items")){if(xa(this.items,e.get("items")))return!1;this.firstUpdated()}return!0}firstUpdated(){this._comboBox.items=this.items}render(){return L`
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
          ${this._value&&this.items.find(e=>e.value==this._value)?L`
                ${this.icons?L`
                      <ha-icon slot="prefix" icon="${this.items.find(e=>e.value==this._value).icon}"> </ha-icon>
                    `:""}
                ${this.clearable?L`
                      <ha-icon-button slot="suffix" class="clear-button" @click=${this._clearValue} icon="hass:close">
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
    `}_clearValue(e){e.stopPropagation(),this._setValue("")}get _value(){return this.value||""}_openedChanged(e){this._opened=e.detail.value}_valueChanged(e){const a=e.detail.value;a!==this._value&&this._setValue(a)}_setValue(e){this.value=e,setTimeout(()=>{Te(this,"value-changed",{value:e})},0)}static get styles(){return se`
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
    `}};var Ma,Ea;a([Z({attribute:!1})],Ta.prototype,"hass",void 0),a([Z()],Ta.prototype,"label",void 0),a([Z()],Ta.prototype,"value",void 0),a([Z()],Ta.prototype,"items",void 0),a([Z()],Ta.prototype,"clearable",void 0),a([Z()],Ta.prototype,"icons",void 0),a([J()],Ta.prototype,"_opened",void 0),a([(Ma="vaadin-combo-box-light",Ea=!0,(e,a)=>{const t={get(){return this.renderRoot.querySelector(Ma)},enumerable:!0,configurable:!0};if(Ea){const e="symbol"==typeof a?Symbol():"__"+a;t.get=function(){return void 0===this[e]&&(this[e]=this.renderRoot.querySelector(Ma)),this[e]}}return void 0!==a?X(t,e,a):ee(t,e)})],Ta.prototype,"_comboBox",void 0),Ta=a([G("alarmo-select")],Ta);const qa=e=>e.callWS({type:"alarmo/config"}),za=e=>e.callWS({type:"alarmo/sensors"}),Da=e=>e.callWS({type:"alarmo/users"}),Na=e=>e.callWS({type:"alarmo/automations"}),Pa=(e,a)=>e.callApi("POST","alarmo/config",a),La=(e,a)=>e.callApi("POST","alarmo/sensors",a),Ra=(e,a)=>e.callApi("POST","alarmo/users",a),Va=(e,a)=>e.callApi("POST","alarmo/automations",a),Ua=(e,a)=>e.callApi("POST","alarmo/automations",{automation_id:a,remove:!0}),Ia=e=>e.callWS({type:"alarmo/areas"}),Fa=(e,a)=>e.callApi("POST","alarmo/area",a),Ha=e=>{class t extends e{connectedCallback(){super.connectedCallback(),this.__checkSubscribed()}disconnectedCallback(){if(super.disconnectedCallback(),this.__unsubs){for(;this.__unsubs.length;){const e=this.__unsubs.pop();e instanceof Promise?e.then(e=>e()):e()}this.__unsubs=void 0}}updated(e){super.updated(e),e.has("hass")&&this.__checkSubscribed()}hassSubscribe(){return[]}__checkSubscribed(){void 0===this.__unsubs&&this.isConnected&&void 0!==this.hass&&(this.__unsubs=this.hassSubscribe())}}return a([Z({attribute:!1})],t.prototype,"hass",void 0),t};let Ya=class extends(Ha(re)){constructor(){super(...arguments),this.currentTab=0}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeEvents(()=>this._fetchData(),"alarmo_updated")]}async _fetchData(){this.hass&&(this.areas=await Ia(this.hass))}async firstUpdated(){this.areas=await Ia(this.hass),this.selectedArea=Object.keys(this.areas)[0],this.data=Object.assign({},this.areas[this.selectedArea].modes)}render(){if(!this.data)return L``;const e=Object.values(va)[this.currentTab];return L`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${la("panels.general.cards.modes.title",this.hass.language)}
          </div>

          ${Object.keys(this.areas).length>1?L`
              <alarmo-select
            .items=${Object.values(this.areas).map(e=>Object({value:e.area_id,name:e.name}))}
            value=${this.selectedArea}
            label=${this.hass.localize("ui.components.area-picker.area")}
            @value-changed=${e=>this.selectArea(e.target.value)}

              </alarmo-select>
              `:""}
        </div>
        <div class="card-content">
          ${la("panels.general.cards.modes.description",this.hass.language)}
        </div>

        <mwc-tab-bar
          .activeIndex=${this.currentTab}
          @MDCTabBar:activated=${e=>this.currentTab=Number(e.detail.index)}
        >
          ${Object.entries(va).map(([e,a])=>L`
              <mwc-tab
                label="${la("common.modes_short."+a,this.hass.language)}"
                hasImageIcon
                stacked
                class="${this.data[a].enabled?"":"disabled"}"
              >
                <ha-icon icon="${ha[e]}" slot="icon"></ha-icon>
              </mwc-tab>
            `)}
        </mwc-tab-bar>

        <settings-row .narrow=${this.narrow} .large=${!0}>
          <span slot="heading">${la("common.modes_long."+e,this.hass.language)}</span>
          <span slot="description"
            >${la("panels.general.cards.modes.fields.mode."+e,this.hass.language)}</span
          >

          <div style="display: flex; margin: 10px 0px; justify-content: center; width: 100%">
            <mwc-button
              class="${this.data[e].enabled?"active":""}"
              @click=${()=>this.data={...this.data,[e]:{...this.data[e],enabled:!0}}}
            >
              ${la("panels.general.cards.modes.fields.mode.enabled",this.hass.language)}
            </mwc-button>
            <mwc-button
              class="${this.data[e].enabled?"":"active"}"
              @click=${()=>this.data={...this.data,[e]:{...this.data[e],enabled:!1}}}
            >
              ${la("panels.general.cards.modes.fields.mode.disabled",this.hass.language)}
            </mwc-button>
          </div>
        </settings-row>

        ${this.data[e].enabled?L`
              <settings-row .narrow=${this.narrow}>
                <span slot="heading"
                  >${la("panels.general.cards.modes.fields.exit_delay.heading",this.hass.language)}</span
                >
                <span slot="description"
                  >${la("panels.general.cards.modes.fields.exit_delay.description",this.hass.language)}</span
                >
                <time-slider
                  .hass=${this.hass}
                  unit="sec"
                  max="180"
                  zeroValue=${la("components.time_slider.none",this.hass.language)}
                  value=${this.data[e].exit_time||0}
                  @change=${a=>this.data={...this.data,[e]:{...this.data[e],exit_time:Number(a.target.value)}}}
                >
                </time-slider>
              </settings-row>

              <settings-row .narrow=${this.narrow}>
                <span slot="heading"
                  >${la("panels.general.cards.modes.fields.entry_delay.heading",this.hass.language)}</span
                >
                <span slot="description"
                  >${la("panels.general.cards.modes.fields.entry_delay.description",this.hass.language)}</span
                >
                <time-slider
                  .hass=${this.hass}
                  unit="sec"
                  max="180"
                  zeroValue=${la("components.time_slider.none",this.hass.language)}
                  value=${this.data[e].entry_time||0}
                  @change=${a=>this.data={...this.data,[e]:{...this.data[e],entry_time:Number(a.target.value)}}}
                >
                </time-slider>
              </settings-row>

              <settings-row .narrow=${this.narrow}>
                <span slot="heading"
                  >${la("panels.general.cards.modes.fields.trigger_time.heading",this.hass.language)}</span
                >
                <span slot="description"
                  >${la("panels.general.cards.modes.fields.trigger_time.description",this.hass.language)}</span
                >
                <time-slider
                  .hass=${this.hass}
                  unit="min"
                  max="3600"
                  zeroValue=${la("components.time_slider.infinite",this.hass.language)}
                  value=${this.data[e].trigger_time||0}
                  @change=${a=>this.data={...this.data,[e]:{...this.data[e],trigger_time:Number(a.target.value)}}}
                >
                </time-slider>
              </settings-row>
            `:""}

        <div class="card-actions">
          <mwc-button @click=${this.saveClick}>
            ${this.hass.localize("ui.common.save")}
          </mwc-button>
        </div>
      </ha-card>
    `}selectArea(e){e!=this.selectedArea&&(this.selectedArea=e,this.data=Object.assign({},this.areas[e].modes))}saveClick(e){Fa(this.hass,{area_id:this.selectedArea,modes:this.data}).catch(a=>Oa(a,e)).then()}};Ya.styles=Pe,a([Z()],Ya.prototype,"hass",void 0),a([Z()],Ya.prototype,"narrow",void 0),a([Z()],Ya.prototype,"currentTab",void 0),a([Z()],Ya.prototype,"config",void 0),a([Z()],Ya.prototype,"areas",void 0),a([Z()],Ya.prototype,"data",void 0),a([Z()],Ya.prototype,"selectedArea",void 0),Ya=a([G("alarm-mode-card")],Ya);let Ba=class extends re{constructor(){super(...arguments),this.threeLine=!1}render(){return L`
      <div class="info">
        <slot name="heading"></slot>
        <div class="secondary"><slot name="description"></slot></div>
      </div>
      <slot></slot>
    `}static get styles(){return se`
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
      :host([large]) .info,
      :host([narrow]) .info {
        flex: 1 0 40px;
      }
      .secondary {
        color: var(--secondary-text-color);
      }
    `}};a([Z({type:Boolean,reflect:!0})],Ba.prototype,"narrow",void 0),a([Z({type:Boolean,reflect:!0})],Ba.prototype,"large",void 0),a([Z({type:Boolean,attribute:"three-line"})],Ba.prototype,"threeLine",void 0),Ba=a([G("settings-row")],Ba);let Wa=class extends re{constructor(){super(...arguments),this.header="",this.open=!1}render(){return L`
      ${this.open?L`
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
          `:L`
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
    `}static get styles(){return se`
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
    `}};a([Z({type:Boolean,reflect:!0})],Wa.prototype,"narrow",void 0),a([Z()],Wa.prototype,"header",void 0),a([Z()],Wa.prototype,"open",void 0),Wa=a([G("collapsible-section")],Wa);let Qa=class extends(Ha(re)){constructor(){super(...arguments),this.areas={}}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeEvents(()=>this._fetchData(),"alarmo_updated")]}async _fetchData(){if(!this.hass)return;const e=await qa(this.hass);this.config=e,this.areas=await Ia(this.hass),this.selection=Aa(e.mqtt,["availability_topic"])}firstUpdated(){(async()=>{await Ne()})()}render(){return this.hass&&this.selection?L`
      <ha-card>
        <div class="card-header">
          <div class="name">${la("panels.general.cards.mqtt.title",this.hass.language)}</div>
          <ha-icon-button icon="hass:close" @click=${this.cancelClick}> </ha-icon-button>
        </div>
        <div class="card-content">${la("panels.general.cards.mqtt.description",this.hass.language)}</div>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading"
            >${la("panels.general.cards.mqtt.fields.state_topic.heading",this.hass.language)}</span
          >
          <span slot="description"
            >${la("panels.general.cards.mqtt.fields.state_topic.description",this.hass.language)}</span
          >
          <paper-input
            label="${la("panels.general.cards.mqtt.fields.state_topic.heading",this.hass.language)}"
            value=${this.selection.state_topic}
            @change=${e=>{this.selection={...this.selection,state_topic:e.target.value}}}
          ></paper-input>
        </settings-row>

        <collapsible-section
          .narrow=${this.narrow}
          header=${la("panels.general.cards.mqtt.fields.state_payload.heading",this.hass.language)}
        >
          ${Object.values(ua).filter(e=>Object.values(this.areas).some(a=>Ca(e,a.modes))).map(e=>L`
                <settings-row .narrow=${this.narrow}>
                  <span slot="heading">${wa(e)}</span>
                  <span slot="description"
                    >${la("panels.general.cards.mqtt.fields.state_payload.item",this.hass.language,"{state}",wa(e))}</span
                  >
                  <paper-input
                    label=${wa(e)}
                    placeholder=${e}
                    value=${this.selection.state_payload[e]||""}
                    @change=${a=>{this.selection=ja(this.selection,{state_payload:{[e]:a.target.value}})}}
                  >
                  </paper-input>
                </settings-row>
              `)}
        </collapsible-section>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading"
            >${la("panels.general.cards.mqtt.fields.event_topic.heading",this.hass.language)}</span
          >
          <span slot="description"
            >${la("panels.general.cards.mqtt.fields.event_topic.description",this.hass.language)}</span
          >
          <paper-input
            label="${la("panels.general.cards.mqtt.fields.event_topic.heading",this.hass.language)}"
            value=${this.selection.event_topic}
            @change=${e=>{this.selection={...this.selection,event_topic:e.target.value}}}
          ></paper-input>
        </settings-row>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading"
            >${la("panels.general.cards.mqtt.fields.command_topic.heading",this.hass.language)}</span
          >
          <span slot="description"
            >${la("panels.general.cards.mqtt.fields.command_topic.description",this.hass.language)}</span
          >
          <paper-input
            label="${la("panels.general.cards.mqtt.fields.command_topic.heading",this.hass.language)}"
            value=${this.selection.command_topic}
            @change=${e=>{this.selection={...this.selection,command_topic:e.target.value}}}
          ></paper-input>
        </settings-row>

        <collapsible-section
          .narrow=${this.narrow}
          header=${la("panels.general.cards.mqtt.fields.command_payload.heading",this.hass.language)}
        >
          ${Object.values(ma).filter(e=>Object.values(this.areas).some(a=>Ca((e=>{switch(e){case ma.COMMAND_ALARM_DISARM:return ua.STATE_ALARM_DISARMED;case ma.COMMAND_ALARM_ARM_HOME:return ua.STATE_ALARM_ARMED_HOME;case ma.COMMAND_ALARM_ARM_AWAY:return ua.STATE_ALARM_ARMED_AWAY;case ma.COMMAND_ALARM_ARM_NIGHT:return ua.STATE_ALARM_ARMED_NIGHT;case ma.COMMAND_ALARM_ARM_CUSTOM_BYPASS:return ua.STATE_ALARM_ARMED_CUSTOM_BYPASS;default:return}})(e),a.modes))).map(e=>L`
                <settings-row .narrow=${this.narrow}>
                  <span slot="heading">${wa(e)}</span>
                  <span slot="description"
                    >${la("panels.general.cards.mqtt.fields.command_payload.item",this.hass.language,"{command}",wa(e))}</span
                  >
                  <paper-input
                    label=${wa(e)}
                    placeholder=${e}
                    value=${this.selection.command_payload[e]||""}
                    @change=${a=>{this.selection=ja(this.selection,{command_payload:{[e]:a.target.value}})}}
                  >
                  </paper-input>
                </settings-row>
              `)}
        </collapsible-section>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading"
            >${la("panels.general.cards.mqtt.fields.require_code.heading",this.hass.language)}</span
          >
          <span slot="description"
            >${la("panels.general.cards.mqtt.fields.require_code.description",this.hass.language)}</span
          >
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
    `:L``}saveClick(e){this.hass&&Pa(this.hass,{mqtt:Object.assign(Object.assign({},this.selection),{enabled:!0})}).catch(a=>Oa(a,e)).then(()=>{this.cancelClick()})}cancelClick(){qe(0,"/alarmo/general",!0)}};Qa.styles=Pe,a([Z()],Qa.prototype,"narrow",void 0),a([Z()],Qa.prototype,"config",void 0),a([Z()],Qa.prototype,"areas",void 0),a([Z()],Qa.prototype,"selection",void 0),Qa=a([G("mqtt-config-card")],Qa);
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
const Ga=new WeakMap,Ka=(e=>(...a)=>{const t=e(...a);return g.set(t,!0),t})(e=>a=>{if(!(a instanceof O))throw new Error("unsafeHTML can only be used in text bindings");const t=Ga.get(a);if(void 0!==t&&k(e)&&e===t.value&&a.value===t.fragment)return;const i=document.createElement("template");i.innerHTML=e;const s=document.importNode(i.content,!0);a.setValue(s),Ga.set(a,{value:e,fragment:s})});let Za=class extends re{render(){return this.columns&&this.data?L`
      <div class="table">
        ${this.renderHeaderRow()}
        ${this.data.length?this.data.map(e=>this.renderDataRow(e)):L`
              <div class="table-row">
                <div class="table-cell text grow">
                  <slot></slot>
                </div>
              </div>
            `}
      </div>
    `:L``}renderHeaderRow(){return this.columns?L`
      <div class="table-row header">
        ${Object.values(this.columns).map(e=>e.hide?"":L`
                <div
                  class="table-cell ${e.text?"text":""} ${e.grow?"grow":""} ${e.align?e.align:""}"
                  style="${e.grow?"":"width: "+e.width}"
                >
                  ${e.title||""}
                </div>
              `)}
      </div>
    `:L``}renderDataRow(e){return this.columns?L`
      <div class="table-row ${this.selectable?"selectable":""}" @click=${()=>this.handleClick(String(e.id))}>
        ${Object.entries(this.columns).map(([a,t])=>t.hide?"":L`
                <div
                  class="table-cell ${t.text?"text":""} ${t.grow?"grow":""} ${t.align?t.align:""}"
                  style="${t.grow?"":"width: "+t.width}"
                >
                  ${e[a]}
                </div>
              `)}
      </div>
    `:L``}handleClick(e){if(!this.selectable)return;const a=new CustomEvent("row-click",{detail:{id:e}});this.dispatchEvent(a)}};Za.styles=se`
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

    a,
    a:visited {
      color: var(--primary-color);
    }
  `,a([Z()],Za.prototype,"columns",void 0),a([Z()],Za.prototype,"data",void 0),a([Z({type:Boolean})],Za.prototype,"selectable",void 0),Za=a([G("alarmo-table")],Za);let Ja=class extends re{async showDialog(e){this._params=e,await this.updateComplete}async closeDialog(){this._params&&this._params.cancel(),this._params=void 0}render(){return this._params?L`
      <ha-dialog open .heading=${!0} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <div slot="heading">
          <ha-header-bar>
            <ha-icon-button slot="navigationIcon" dialogAction="cancel" icon="mdi:close"> </ha-icon-button>
            <span slot="title">
              ${this._params.title}
            </span>
          </ha-header-bar>
        </div>
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
    `:L``}confirmClick(){this._params.confirm()}cancelClick(){this._params.cancel()}static get styles(){return se`
      ${Pe}
      div.wrapper {
        color: var(--primary-text-color);
      }
    `}};a([Z({attribute:!1})],Ja.prototype,"hass",void 0),a([J()],Ja.prototype,"_params",void 0),Ja=a([G("confirm-delete-dialog")],Ja);var Xa=Object.freeze({__proto__:null,get ConfirmDeleteDialog(){return Ja}});let et=class extends(Ha(re)){constructor(){super(...arguments),this.areas={},this.sensors={},this.automations={},this.name=""}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeEvents(()=>this._fetchData(),"alarmo_updated")]}async _fetchData(){this.hass&&(this.areas=await Ia(this.hass),this.sensors=await za(this.hass),this.automations=await Na(this.hass))}async showDialog(e){await this._fetchData(),this._params=e,e.area_id&&(this.area_id=e.area_id,this.name=this.areas[this.area_id].name),await this.updateComplete}async closeDialog(){this._params=void 0,this.area_id=void 0,this.name=""}render(){return this._params?L`
      <ha-dialog open .heading=${!0} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <div slot="heading">
          <ha-header-bar>
            <ha-icon-button slot="navigationIcon" dialogAction="cancel" icon="mdi:close"> </ha-icon-button>
            <span slot="title">
              ${this.area_id?la("panels.general.dialogs.edit_area.title",this.hass.language,"{area}",this.areas[this.area_id].name):la("panels.general.dialogs.create_area.title",this.hass.language)}
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
          ${this.area_id?L`
                <span class="note"
                  >${la("panels.general.dialogs.edit_area.name_warning",this.hass.language)}</span
                >
              `:""}
          ${this.area_id?"":L`
                <alarmo-select
                  .items=${Object.values(this.areas).map(e=>Object({value:e.area_id,name:e.name}))}
                  value=${this.selectedArea}
                  label="${la("panels.general.dialogs.create_area.fields.copy_from",this.hass.language)}"
                  clearable=${!0}
                  @value-changed=${e=>this.selectedArea=e.target.value}
                >
                </alarmo-select>
              `}
        </div>
        <mwc-button slot="primaryAction" @click=${this.saveClick}>
          ${this.hass.localize("ui.common.save")}
        </mwc-button>
        ${this.area_id?L`
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
    `:L``}saveClick(e){const a=this.name.trim();if(!a.length)return;let t={name:a};this.area_id?t=Object.assign(Object.assign({},t),{area_id:this.area_id}):this.selectedArea&&(t=Object.assign(Object.assign({},t),{modes:Object.assign({},this.areas[this.selectedArea].modes)})),Fa(this.hass,t).catch(a=>Oa(a,e)).then(()=>{this.closeDialog()})}async deleteClick(e){if(!this.area_id)return;const a=Object.values(this.sensors).filter(e=>e.area==this.area_id).length,t=Object.values(this.automations).filter(e=>e.area==this.area_id).length;let i=!1;var s,n;i=!a&&!t||await new Promise(i=>{Te(e.target,"show-dialog",{dialogTag:"confirm-delete-dialog",dialogImport:()=>Promise.resolve().then((function(){return Xa})),dialogParams:{title:la("panels.general.dialogs.remove_area.title",this.hass.language),description:la("panels.general.dialogs.remove_area.description",this.hass.language,["{sensors}","{automations}"],[String(a),String(t)]),cancel:()=>i(!1),confirm:()=>i(!0)}})}),i&&(s=this.hass,n=this.area_id,s.callApi("POST","alarmo/area",{area_id:n,remove:!0})).catch(a=>Oa(a,e)).then(()=>{this.closeDialog()})}static get styles(){return se`
      ${Pe}
      div.wrapper {
        color: var(--primary-text-color);
      }
      span.note {
        color: var(--secondary-text-color);
      }
    `}};a([Z({attribute:!1})],et.prototype,"hass",void 0),a([J()],et.prototype,"_params",void 0),a([Z()],et.prototype,"areas",void 0),a([Z()],et.prototype,"sensors",void 0),a([Z()],et.prototype,"automations",void 0),a([Z()],et.prototype,"name",void 0),a([Z()],et.prototype,"area_id",void 0),a([Z()],et.prototype,"selectedArea",void 0),et=a([G("create-area-dialog")],et);var at=Object.freeze({__proto__:null,get CreateAreaDialog(){return et}});let tt=class extends(Ha(re)){constructor(){super(...arguments),this.areas={},this.sensors={},this.automations={}}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeEvents(()=>this._fetchData(),"alarmo_updated")]}async _fetchData(){this.hass&&(this.areas=await Ia(this.hass),this.sensors=await za(this.hass),this.automations=await Na(this.hass))}render(){if(!this.hass)return L``;const e=Object.values(this.areas);e.sort((e,a)=>e.name.toLowerCase()<a.name.toLowerCase()?-1:1);const a={actions:{width:"48px"},name:{title:this.hass.localize("ui.components.area-picker.add_dialog.name"),width:"40%",grow:!0,text:!0},remarks:{title:la("panels.general.cards.areas.table.remarks",this.hass.language),width:"60%",hide:this.narrow,text:!0}},t=Object.values(e).map(a=>{const t=Object.values(this.sensors).filter(e=>e.area==a.area_id).length,i=1==Object.values(e).length?Object.values(this.automations).filter(e=>!e.area||e.area==a.area_id).length:Object.values(this.automations).filter(e=>e.area==a.area_id).length,s=`<a href="/alarmo/sensors/filter/${a.area_id}">${la("panels.general.cards.areas.table.summary_sensors",this.hass.language,"{number}",String(t))}</a>`,n=`<a href="/alarmo/actions/filter/${a.area_id}">${la("panels.general.cards.areas.table.summary_automations",this.hass.language,"{number}",String(i))}</a>`;return{id:a.area_id,actions:L`
          <ha-icon-button @click=${e=>this.editClick(e,a.area_id)} icon="hass:pencil"></ha-icon-button>
        `,name:wa(a.name),remarks:Ka(la("panels.general.cards.areas.table.summary",this.hass.language,["{summary_sensors}","{summary_automations}"],[s,n]))}});return L`
      <ha-card header="${la("panels.general.cards.areas.title",this.hass.language)}">
        <div class="card-content">
          ${la("panels.general.cards.areas.description",this.hass.language)}
        </div>

        <alarmo-table .columns=${a} .data=${t}>
          ${la("panels.general.cards.areas.no_items",this.hass.language)}
        </alarmo-table>
        <div class="card-actions">
          <mwc-button @click=${this.addClick}>
            ${la("panels.general.cards.areas.actions.add",this.hass.language)}
          </mwc-button>
        </div>
      </ha-card>
    `}addClick(e){const a=e.target;Te(a,"show-dialog",{dialogTag:"create-area-dialog",dialogImport:()=>Promise.resolve().then((function(){return at})),dialogParams:{}})}editClick(e,a){const t=e.target;Te(t,"show-dialog",{dialogTag:"create-area-dialog",dialogImport:()=>Promise.resolve().then((function(){return at})),dialogParams:{area_id:a}})}};tt.styles=Pe,a([Z()],tt.prototype,"narrow",void 0),a([Z()],tt.prototype,"path",void 0),a([Z()],tt.prototype,"config",void 0),a([Z()],tt.prototype,"areas",void 0),a([Z()],tt.prototype,"sensors",void 0),a([Z()],tt.prototype,"automations",void 0),tt=a([G("area-config-card")],tt);let it=class extends re{constructor(){super(...arguments),this.name=""}async showDialog(e){this._params=e;const a=await qa(this.hass);this.name=a.master.name||"",await this.updateComplete}async closeDialog(){this._params=void 0}render(){return this._params?L`
      <ha-dialog open .heading=${!0} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <div slot="heading">
          <ha-header-bar>
            <ha-icon-button slot="navigationIcon" dialogAction="cancel" icon="mdi:close"> </ha-icon-button>
            <span slot="title"> ${la("panels.general.dialogs.edit_master.title",this.hass.language)}</span>
          </ha-header-bar>
        </div>
        <div class="wrapper">
          <paper-input
            label=${this.hass.localize("ui.components.area-picker.add_dialog.name")}
            @value-changed=${e=>this.name=e.target.value}
            value="${this.name}"
          >
          </paper-input>
          <span class="note">${la("panels.general.dialogs.edit_area.name_warning",this.hass.language)}</span>
        </div>
        <mwc-button slot="primaryAction" @click=${this.saveClick}>
          ${this.hass.localize("ui.common.save")}
        </mwc-button>
        <mwc-button slot="secondaryAction" @click=${this.closeDialog}>
          ${this.hass.localize("ui.common.cancel")}
        </mwc-button>
      </ha-dialog>
    `:L``}saveClick(){const e=this.name.trim();e.length&&Pa(this.hass,{master:{enabled:!0,name:e}}).catch().then(()=>{this.closeDialog()})}static get styles(){return se`
      div.wrapper {
        color: var(--primary-text-color);
      }
      span.note {
        color: var(--secondary-text-color);
      }
    `}};a([Z({attribute:!1})],it.prototype,"hass",void 0),a([J()],it.prototype,"_params",void 0),a([Z()],it.prototype,"name",void 0),it=a([G("edit-master-dialog")],it);var st=Object.freeze({__proto__:null,get EditMasterDialog(){return it}});let nt=class extends(Ha(re)){constructor(){super(...arguments),this.areas={},this.automations={}}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeEvents(()=>this._fetchData(),"alarmo_updated")]}async _fetchData(){this.hass&&(this.config=await qa(this.hass),this.areas=await Ia(this.hass),this.automations=await Na(this.hass),this.data=ka(this.config,["trigger_time","disarm_after_trigger","mqtt","master"]))}firstUpdated(){(async()=>{await Ne()})()}render(){var e,a,t,i,s,n,r,o;return this.hass&&this.config&&this.data?this.path&&"mqtt_configuration"==this.path[0]?L`
        <mqtt-config-card .hass=${this.hass} .narrow=${this.narrow}> </mqtt-config-card>
      `:this.path&&"edit_area"==this.path[0]&&2==this.path.length?L`
        <area-editor-card .hass=${this.hass} .narrow=${this.narrow} item=${this.path[1]}> </area-editor-card>
      `:L`
        <ha-card header="${la("panels.general.title",this.hass.language)}">
          <div class="card-content">
            ${la("panels.general.cards.general.description",this.hass.language)}
          </div>

          <settings-row .narrow=${this.narrow}>
            <span slot="heading"
              >${la("panels.general.cards.general.fields.disarm_after_trigger.heading",this.hass.language)}</span
            >
            <span slot="description"
              >${la("panels.general.cards.general.fields.disarm_after_trigger.description",this.hass.language)}</span
            >
            <ha-switch
              ?checked=${this.data.disarm_after_trigger}
              @change=${e=>this.data={...this.data,disarm_after_trigger:e.target.checked}}
              }}
            >
            </ha-switch>
          </settings-row>

          <settings-row .narrow=${this.narrow}>
            <span slot="heading"
              >${la("panels.general.cards.general.fields.enable_mqtt.heading",this.hass.language)}</span
            >
            <span slot="description"
              >${la("panels.general.cards.general.fields.enable_mqtt.description",this.hass.language)}</span
            >
            <ha-switch
              ?checked=${null===(a=null===(e=this.data)||void 0===e?void 0:e.mqtt)||void 0===a?void 0:a.enabled}
              @change=${e=>{this.data={...this.data,mqtt:{...this.data.mqtt,enabled:e.target.checked}}}}
            >
            </ha-switch>
          </settings-row>

          ${(null===(i=null===(t=this.data)||void 0===t?void 0:t.mqtt)||void 0===i?void 0:i.enabled)?L`
                <div style="padding: 0px 0px 16px 16px">
                  <mwc-button outlined @click=${()=>qe(0,"/alarmo/general/mqtt_configuration",!0)}>
                    ${la("panels.general.cards.general.actions.setup_mqtt",this.hass.language)}
                  </mwc-button>
                </div>
              `:""}
          ${Object.keys(this.areas).length>=2?L`
                <settings-row .narrow=${this.narrow}>
                  <span slot="heading"
                    >${la("panels.general.cards.general.fields.enable_master.heading",this.hass.language)}</span
                  >
                  <span slot="description"
                    >${la("panels.general.cards.general.fields.enable_master.description",this.hass.language)}</span
                  >
                  <ha-switch
                    ?checked=${(null===(n=null===(s=this.data)||void 0===s?void 0:s.master)||void 0===n?void 0:n.enabled)&&Object.keys(this.areas).length>=2}
                    ?disabled=${Object.keys(this.areas).length<2}
                    @change=${this.toggleEnableMaster}
                  >
                  </ha-switch>
                </settings-row>
              `:""}
          ${(null===(o=null===(r=this.data)||void 0===r?void 0:r.master)||void 0===o?void 0:o.enabled)&&Object.keys(this.areas).length>=2?L`
                <div style="padding: 0px 0px 16px 16px">
                  <mwc-button outlined @click=${this.setupMasterClick}>
                    ${la("panels.general.cards.general.actions.setup_master",this.hass.language)}
                  </mwc-button>
                </div>
              `:""}

          <div class="card-actions">
            <mwc-button @click=${this.saveClick}>
              ${this.hass.localize("ui.common.save")}
            </mwc-button>
          </div>
        </ha-card>

        <alarm-mode-card .hass=${this.hass} .narrow=${this.narrow}> </alarm-mode-card>

        <area-config-card .hass=${this.hass} .narrow=${this.narrow}> </area-config-card>
      `:L``}setupMasterClick(e){const a=e.target;Te(a,"show-dialog",{dialogTag:"edit-master-dialog",dialogImport:()=>Promise.resolve().then((function(){return st})),dialogParams:{}})}async toggleEnableMaster(e){const a=e.target;let t=a.checked;if(!t){const e=Object.values(this.automations).filter(e=>!e.area).length;if(e){await new Promise(t=>{Te(a,"show-dialog",{dialogTag:"confirm-delete-dialog",dialogImport:()=>Promise.resolve().then((function(){return Xa})),dialogParams:{title:la("panels.general.dialogs.disable_master.title",this.hass.language),description:la("panels.general.dialogs.disable_master.description",this.hass.language,["{automations}"],[String(e)]),cancel:()=>t(!1),confirm:()=>t(!0)}})})||(t=!0,a.checked=!0)}}this.data=Object.assign(Object.assign({},this.data),{master:Object.assign(Object.assign({},this.data.master),{enabled:t})})}saveClick(e){this.hass&&this.data&&Pa(this.hass,this.data).catch(a=>Oa(a,e)).then()}};nt.styles=Pe,a([Z()],nt.prototype,"narrow",void 0),a([Z()],nt.prototype,"path",void 0),a([Z()],nt.prototype,"data",void 0),a([Z()],nt.prototype,"config",void 0),a([Z()],nt.prototype,"areas",void 0),a([Z()],nt.prototype,"automations",void 0),nt=a([G("alarm-view-general")],nt);let rt=class extends re{async showDialog(e){this._params=e,await this.updateComplete}async closeDialog(){this._params=void 0}render(){return this._params?L`
      <ha-dialog open .heading=${!0} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <div slot="heading">
          <ha-header-bar>
            <ha-icon-button slot="navigationIcon" dialogAction="cancel" icon="mdi:close"> </ha-icon-button>
            <span slot="title">
              ${this.hass.localize("state_badge.default.error")}
            </span>
          </ha-header-bar>
        </div>
        <div class="wrapper">
          ${this._params.error||""}
        </div>

        <mwc-button slot="primaryAction" style="float: left" @click=${this.closeDialog} dialogAction="close">
          ${this.hass.localize("ui.dialogs.generic.ok")}
        </mwc-button>
      </ha-dialog>
    `:L``}static get styles(){return se`
      div.wrapper {
        color: var(--primary-text-color);
      }
    `}};a([Z({attribute:!1})],rt.prototype,"hass",void 0),a([J()],rt.prototype,"_params",void 0),rt=a([G("error-dialog")],rt);var ot=Object.freeze({__proto__:null,get ErrorDialog(){return rt}});const dt=(e,a)=>{if("binary_sensor"==function(e){const a="string"==typeof e?e:e.entity_id;return String(a.split(".").shift())}(e.entity_id)){if(a)return!0;const t=e.attributes.device_class;return!!t&&!!["door","garage_door","gas","heat","lock","moisture","motion","moving","occupancy","opening","presence","safety","smoke","sound","vibration","window"].includes(t)}return!1},lt=e=>{const a=a=>a.filter(a=>e.includes(a));return{[pa.Door]:{modes:a([va.ArmedAway,va.ArmedHome,va.ArmedNight]),always_on:!1,allow_open:!1,arm_on_close:!0,immediate:!1},[pa.Window]:{modes:a([va.ArmedAway,va.ArmedHome,va.ArmedNight]),always_on:!1,allow_open:!1,arm_on_close:!1,immediate:!0},[pa.Motion]:{modes:a([va.ArmedAway]),always_on:!1,allow_open:!0,arm_on_close:!1,immediate:!1},[pa.Tamper]:{modes:a([va.ArmedAway,va.ArmedHome,va.ArmedNight,va.ArmedCustom]),always_on:!1,allow_open:!1,arm_on_close:!1,immediate:!0},[pa.Environmental]:{modes:a([va.ArmedAway,va.ArmedHome,va.ArmedNight,va.ArmedCustom]),always_on:!0,allow_open:!1,arm_on_close:!1,immediate:!1}}};function ct(e,a){if(!e)return null;const t=Oe(e.entity_id);let i={entity_id:e.entity_id,name:e.attributes.friendly_name||e.entity_id,modes:[],immediate:!1,arm_on_close:!1,allow_open:!1,always_on:!1,auto_bypass:!1,trigger_unavailable:!1,type:pa.Other,enabled:!0};if("binary_sensor"==t){const t=(e=>{switch(e.attributes.device_class){case"door":case"garage_door":case"lock":case"opening":return pa.Door;case"window":return pa.Window;case"gas":case"heat":case"moisture":case"smoke":case"safety":return pa.Environmental;case"motion":case"moving":case"occupancy":case"presence":return pa.Motion;case"sound":case"opening":case"vibration":return pa.Tamper;default:return}})(e);t&&(i=Object.assign(Object.assign(Object.assign({},i),{type:t}),lt(a)[t]))}return i}let ht=class extends re{async firstUpdated(){const e=await Ia(this.hass);this.areas=e;const a=await za(this.hass);this.data=a[this.item],this.data.area||1!=Object.keys(e).length||(this.data=Object.assign(Object.assign({},this.data),{area:Object.keys(this.areas)[0]}))}render(){if(!this.data)return L``;const e=this.hass.states[this.data.entity_id];return L`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${la("panels.sensors.cards.editor.title",this.hass.language)}
          </div>
          <ha-icon-button icon="hass:close" @click=${this.cancelClick}> </ha-icon-button>
        </div>
        <div class="card-content">
          ${la("panels.sensors.cards.editor.description",this.hass.language,"{entity}",this.item)}
        </div>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${la("panels.sensors.cards.editor.fields.name.heading",this.hass.language)}</span>
          <span slot="description"
            >${la("panels.sensors.cards.editor.fields.name.description",this.hass.language)}</span
          >

          <paper-input
            label="${la("panels.sensors.cards.editor.fields.name.heading",this.hass.language)}"
            placeholder=${(null==e?void 0:e.attributes.friendly_name)||""}
            value=${this.data.name}
            @change=${e=>this.data={...this.data,name:e.target.value}}
          >
          </paper-input>
        </settings-row>

        ${Object.keys(this.areas).length>1?L`
        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${la("panels.sensors.cards.editor.fields.area.heading",this.hass.language)}</span>
          <span slot="description">${la("panels.sensors.cards.editor.fields.area.description",this.hass.language)}</span>

          <alarmo-select
            .items=${Object.values(this.areas).map(e=>Object({value:e.area_id,name:e.name}))}
            value=${this.data.area}
            label=${la("panels.sensors.cards.editor.fields.area.heading",this.hass.language)}
            @value-changed=${e=>this.data={...this.data,area:e.target.value}}
          </alarmo-select>
        </settings-row>`:""}

        <settings-row .narrow=${this.narrow} .large=${!0}>
          <span slot="heading"
            >${la("panels.sensors.cards.editor.fields.device_type.heading",this.hass.language)}</span
          >
          <span slot="description"
            >${la("panels.sensors.cards.editor.fields.device_type.description",this.hass.language)}</span
          >

          <alarmo-select
            .hass=${this.hass}
            .items=${Object.entries(pa).filter(([,e])=>e!=pa.Other).map(([e,a])=>Object({value:a,name:la(`panels.sensors.cards.editor.fields.device_type.choose.${a}.name`,this.hass.language),description:la(`panels.sensors.cards.editor.fields.device_type.choose.${a}.description`,this.hass.language),icon:ga[e]}))}
            label=${la("panels.sensors.cards.editor.fields.device_type.heading",this.hass.language)}
            clearable=${!0}
            icons=${!0}
            value=${this.data.type}
            @value-changed=${e=>this.setType(e.target.value||pa.Other)}
          >
          </alarmo-select>
        </settings-row>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading"
            >${la("panels.sensors.cards.editor.fields.modes.heading",this.hass.language)}</span
          >
          <span slot="description"
            >${la("panels.sensors.cards.editor.fields.modes.description",this.hass.language)}</span
          >

          <div>
            ${this.modesByArea(this.data.area).map(e=>L`
                <mwc-button
                  class="${this.data.modes.includes(e)?"active":""}"
                  @click=${()=>{var a,t;this.data={...this.data,modes:this.data.modes.includes(e)?(a=this.data.modes,t=e,a.filter(e=>e!==t)):$a(this.data.modes.concat([e]))}}}
                >
                  <ha-icon icon="${ha[Object.entries(va).find(([,a])=>a==e)[0]]}"></ha-icon>
                  ${la("common.modes_short."+e,this.hass.language)}
                </mwc-button>
              `)}
          </div>
        </settings-row>

        <collapsible-section
          .narrow=${this.narrow}
          header=${la("panels.sensors.cards.editor.actions.toggle_advanced",this.hass.language)}
        >
          ${!this.data.type||[pa.Environmental,pa.Other].includes(this.data.type)?L`
                <settings-row .narrow=${this.narrow}>
                  <span slot="heading"
                    >${la("panels.sensors.cards.editor.fields.always_on.heading",this.hass.language)}</span
                  >
                  <span slot="description"
                    >${la("panels.sensors.cards.editor.fields.always_on.description",this.hass.language)}</span
                  >

                  <ha-switch
                    ?checked=${this.data.always_on}
                    @change=${e=>this.data=e.target.checked?{...this.data,always_on:!0,arm_on_close:!1,immediate:!0,allow_open:!1,auto_bypass:!1}:{...this.data,always_on:!1}}
                  >
                  </ha-switch>
                </settings-row>
              `:""}
          ${!this.data.type||[pa.Door,pa.Other].includes(this.data.type)?L`
                <settings-row .narrow=${this.narrow}>
                  <span slot="heading"
                    >${la("panels.sensors.cards.editor.fields.arm_on_close.heading",this.hass.language)}</span
                  >
                  <span slot="description"
                    >${la("panels.sensors.cards.editor.fields.arm_on_close.description",this.hass.language)}</span
                  >

                  <ha-switch
                    ?checked=${this.data.arm_on_close}
                    ?disabled=${this.data.always_on}
                    @change=${e=>this.data=e.target.checked?{...this.data,arm_on_close:!0,allow_open:!1,immediate:!1,always_on:!1}:{...this.data,arm_on_close:!1}}
                  >
                  </ha-switch>
                </settings-row>
              `:""}
          ${!this.data.type||[pa.Window,pa.Door,pa.Motion,pa.Tamper,pa.Other].includes(this.data.type)?L`
                <settings-row .narrow=${this.narrow}>
                  <span slot="heading"
                    >${la("panels.sensors.cards.editor.fields.immediate.heading",this.hass.language)}</span
                  >
                  <span slot="description"
                    >${la("panels.sensors.cards.editor.fields.immediate.description",this.hass.language)}</span
                  >

                  <ha-switch
                    ?checked=${this.data.immediate}
                    ?disabled=${this.data.always_on||this.data.arm_on_close}
                    @change=${e=>this.data=e.target.checked?{...this.data,immediate:!0,arm_on_close:!1,always_on:!1}:{...this.data,immediate:!1}}
                  >
                  </ha-switch>
                </settings-row>
              `:""}
          ${!this.data.type||[pa.Motion,pa.Other].includes(this.data.type)?L`
                <settings-row .narrow=${this.narrow}>
                  <span slot="heading"
                    >${la("panels.sensors.cards.editor.fields.allow_open.heading",this.hass.language)}</span
                  >
                  <span slot="description"
                    >${la("panels.sensors.cards.editor.fields.allow_open.description",this.hass.language)}</span
                  >

                  <ha-switch
                    ?checked=${this.data.allow_open}
                    ?disabled=${this.data.always_on||this.data.arm_on_close}
                    @change=${e=>this.data=e.target.checked?{...this.data,allow_open:!0,arm_on_close:!1,always_on:!1}:{...this.data,allow_open:!1}}
                  >
                  </ha-switch>
                </settings-row>
              `:""}

            ${!this.data.type||[pa.Window,pa.Other].includes(this.data.type)?L`
                  <settings-row .narrow=${this.narrow}>
                    <span slot="heading"
                      >${la("panels.sensors.cards.editor.fields.auto_bypass.heading",this.hass.language)}</span
                    >
                    <span slot="description"
                      >${la("panels.sensors.cards.editor.fields.auto_bypass.description",this.hass.language)}</span
                    >
  
                    <ha-switch
                      ?checked=${this.data.auto_bypass}
                      ?disabled=${this.data.always_on}
                      @change=${e=>this.data=e.target.checked?{...this.data,auto_bypass:!0,always_on:!1}:{...this.data,auto_bypass:!1}}
                    >
                    </ha-switch>
                  </settings-row>
                `:""}

          <settings-row .narrow=${this.narrow}>
            <span slot="heading"
              >${la("panels.sensors.cards.editor.fields.trigger_unavailable.heading",this.hass.language)}</span
            >
            <span slot="description"
              >${la("panels.sensors.cards.editor.fields.trigger_unavailable.description",this.hass.language)}</span
            >

            <ha-switch
              ?checked=${this.data.trigger_unavailable}
              @change=${e=>this.data={...this.data,trigger_unavailable:e.target.checked}}
            >
            </ha-switch>
          </settings-row>
        </collapsible-section>

        <div class="card-actions">
          <mwc-button @click=${this.saveClick}>
            ${this.hass.localize("ui.common.save")}
          </mwc-button>

          <mwc-button class="warning" @click=${this.deleteClick}>
            ${la("panels.sensors.cards.editor.actions.remove",this.hass.language)}
          </mwc-button>
        </div>
      </ha-card>
    `}modesByArea(e){const a=Object.keys(this.areas).reduce((e,a)=>Object.assign(e,{[a]:Object.entries(this.areas[a].modes).filter(([,e])=>e.enabled).map(([e])=>e)}),{});return e?a[e]:Object.values(a).reduce((e,a)=>e.filter(e=>a.includes(e)))}setType(e){const a=e!=pa.Other?lt(this.modesByArea(this.data.area))[e]:{};this.data=Object.assign(Object.assign(Object.assign({},this.data),{type:e}),a)}deleteClick(e){var a,t;(a=this.hass,t=this.item,a.callApi("POST","alarmo/sensors",{entity_id:t,remove:!0})).catch(a=>Oa(a,e)).then(()=>{this.cancelClick()})}saveClick(e){const a=[];this.data.area||a.push(la("panels.sensors.cards.editor.errors.no_area",this.hass.language)),this.data.modes.length||this.data.always_on||a.push(la("panels.sensors.cards.editor.errors.no_modes",this.hass.language)),a.length?Sa(e,L`
          ${la("panels.sensors.cards.editor.errors.description",this.hass.language)}
          <ul>
            ${a.map(e=>L`
                  <li>${e}</li>
                `)}
          </ul>
        `):La(this.hass,Object.assign({},this.data)).catch(a=>Oa(a,e)).then(()=>{this.cancelClick()})}cancelClick(){qe(0,"/alarmo/sensors",!0)}};ht.styles=Pe,a([Z()],ht.prototype,"hass",void 0),a([Z()],ht.prototype,"narrow",void 0),a([Z()],ht.prototype,"item",void 0),a([Z()],ht.prototype,"data",void 0),ht=a([G("sensor-editor-card")],ht);let ut=class extends re{constructor(){super(...arguments),this.items=[],this.value=null}render(){return L`
      ${this.items.map(e=>L`
          <div class="chip ${this.value==e.value?"selected":""}" @click=${()=>this.selectItem(e.value)}>
            ${void 0!==e.count?L`
                  <span class="count">${e.count>99?99:e.count}</span>
                `:""}
            <span class="label">${e.name}</span>
          </div>
        `)}
    `}selectItem(e){this.value=this.value==e?null:e,Te(this,"value-changed")}static get styles(){return se`
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
    `}};a([Z({attribute:!1})],ut.prototype,"hass",void 0),a([Z()],ut.prototype,"items",void 0),a([Z()],ut.prototype,"value",void 0),ut=a([G("alarmo-chips")],ut);let mt=class extends(Ha(re)){constructor(){super(...arguments),this.areas={},this.sensors={},this.addSelection=[],this.showAllSensorEntities=!1,this.areaFilterOptions=[]}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeEvents(()=>this._fetchData(),"alarmo_updated")]}async _fetchData(){this.hass&&(this.areas=await Ia(this.hass),this.sensors=await za(this.hass),this.areaFilterOptions=[{value:"no_area",name:la("panels.sensors.cards.sensors.filter.no_area",this.hass.language),count:Object.values(this.sensors).filter(e=>!e.area).length}].concat(Object.values(this.areas).map(e=>Object({value:e.area_id,name:e.name,count:Object.values(this.sensors).filter(a=>a.area==e.area_id).length})).sort((e,a)=>e.name.toLowerCase()<a.name.toLowerCase()?-1:1)))}firstUpdated(){(async()=>{await Ne()})(),this.path&&2==this.path.length&&"filter"==this.path[0]&&(this.selectedArea=this.path[1])}render(){return this.hass?this.path&&2==this.path.length&&"edit"==this.path[0]?L`
        <sensor-editor-card .hass=${this.hass} .narrow=${this.narrow} .item=${this.path[1]}> </sensor-editor-card>
      `:L`
        ${this.sensorsPanel()} ${this.addSensorsPanel()}
      `:L``}sensorsPanel(){if(!this.hass)return L``;const e=Object.keys(this.sensors).map(e=>{const a=this.hass.states[e];return{id:e,name:ya(a),icon:ba(a)}});e.sort((e,a)=>e.name.toLowerCase()<a.name.toLowerCase()?-1:1);const a={icon:{width:"40px"},name:{title:this.hass.localize("ui.components.entity.entity-picker.entity"),width:"60%",grow:!0,text:!0},modes:{title:la("panels.sensors.cards.sensors.table.arm_modes",this.hass.language),width:"25%",hide:this.narrow,text:!0},enabled:{title:"Enabled",width:"68px",align:"center"}},t=e.filter(e=>!this.selectedArea||!this.areaFilterOptions.find(e=>e.value==this.selectedArea)||this.sensors[e.id].area==this.selectedArea||"no_area"===this.selectedArea&&!this.sensors[e.id].area).map(e=>{const a=Object.entries(pa).find(([,a])=>a==this.sensors[e.id].type)[0];return{icon:L`
            <paper-tooltip animation-delay="0">
              ${la(`panels.sensors.cards.editor.fields.device_type.choose.${pa[a]}.name`,this.hass.language)}
            </paper-tooltip>
            <ha-icon icon="${ga[a]}"> </ha-icon>
          `,name:L`
            ${this.sensors[e.id].name||wa(e.name)}
            <span class="secondary">${e.id}</span>
          `,id:e.id,modes:L`
            ${this.sensors[e.id].always_on?la("panels.sensors.cards.sensors.table.always_on",this.hass.language):Object.values(va).filter(a=>this.sensors[e.id].modes.includes(a)).map(e=>la("common.modes_short."+e,this.hass.language)).join(", ")}
          `,enabled:L`
            <ha-switch
              @click=${e=>{e.stopPropagation()}}
              ?checked=${this.sensors[e.id].enabled}
              @change=${a=>this.toggleEnabled(a,e.id)}
            >
            </ha-switch>
          `}});return L`
      <ha-card header="${la("panels.sensors.title",this.hass.language)}">
        <div class="card-content">
          ${la("panels.sensors.cards.sensors.description",this.hass.language)}
        </div>

        ${this.areaFilterOptions.length>1?L`
              <div class="table-filter" ?narrow=${this.narrow}>
                <span class="header"
                  >${la("panels.sensors.cards.sensors.filter.label",this.hass.language)}:</span
                >
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
          .columns=${a}
          .data=${t}
          @row-click=${e=>{const a=String(e.detail.id);qe(0,"/alarmo/sensors/edit/"+a,!0)}}
        >
          ${la("panels.sensors.cards.sensors.no_items",this.hass.language)}
        </alarmo-table>
      </ha-card>
    `}addSensorsPanel(){if(!this.hass)return L``;const e=Object.values(this.hass.states).filter(e=>dt(e,this.showAllSensorEntities)).filter(e=>!Object.keys(this.sensors).includes(e.entity_id)).map(e=>Object({id:e.entity_id,name:ya(e),icon:ba(e)}));e.sort((e,a)=>e.name.toLowerCase()<a.name.toLowerCase()?-1:1);const a={checkbox:{width:"48px"},icon:{width:"40px"},name:{title:this.hass.localize("ui.components.area-picker.add_dialog.name"),width:"40%",grow:!0,text:!0},id:{title:this.hass.localize("ui.components.entity.entity-picker.entity"),width:"40%",hide:this.narrow,text:!0}},t=e.map(e=>({checkbox:L`
          <ha-checkbox
            @change=${a=>this.toggleSelect(a,e.id)}
            ?checked=${this.addSelection.includes(e.id)}
          >
          </ha-checkbox>
        `,icon:L`
          <state-badge .hass=${this.hass} .stateObj=${this.hass.states[e.id]}></state-badge>
        `,name:wa(e.name),id:e.id}));return L`
      <ha-card header="${la("panels.sensors.cards.add_sensors.title",this.hass.language)}">
        <div class="card-content">
          ${la("panels.sensors.cards.add_sensors.description",this.hass.language)}
        </div>

        <div style="display: flex; justify-content: flex-end; padding: 8px 16px">
          <ha-switch
            @change=${e=>{this.showAllSensorEntities=e.target.checked}}
            style="padding: 0px 8px"
          >
          </ha-switch>
          ${la("panels.sensors.cards.add_sensors.actions.show_all",this.hass.language)}
        </div>

        <alarmo-table .columns=${a} .data=${t}>
          ${la("panels.sensors.cards.add_sensors.no_items",this.hass.language)}
        </alarmo-table>

        <div class="card-actions">
          <mwc-button @click=${this.addSelected} ?disabled=${0==this.addSelection.length}>
            ${la("panels.sensors.cards.add_sensors.actions.add_to_alarm",this.hass.language)}
          </mwc-button>
        </div>
      </ha-card>
    `}toggleSelect(e,a){const t=e.target.checked;this.addSelection=t&&!this.addSelection.includes(a)?[...this.addSelection,a]:t?this.addSelection:this.addSelection.filter(e=>e!=a)}toggleEnabled(e,a){const t=e.target.checked;La(this.hass,{entity_id:a,enabled:t}).catch(a=>Oa(a,e)).then()}addSelected(e){if(!this.hass)return;const a=Object.values(this.areas).map(e=>Object.entries(e.modes).filter(([,e])=>e.enabled).map(([e])=>e)).reduce((e,a)=>e.filter(e=>a.includes(e)));this.addSelection.map(e=>ct(this.hass.states[e],a)).map(e=>1==Object.keys(this.areas).length?Object.assign(e,{area:Object.keys(this.areas)[0]}):e).filter(e=>e).forEach(a=>{La(this.hass,a).catch(a=>Oa(a,e)).then()}),this.addSelection=[]}};mt.styles=Pe,a([Z()],mt.prototype,"narrow",void 0),a([Z()],mt.prototype,"path",void 0),a([Z()],mt.prototype,"areas",void 0),a([Z()],mt.prototype,"sensors",void 0),a([Z()],mt.prototype,"addSelection",void 0),a([Z()],mt.prototype,"showAllSensorEntities",void 0),a([Z()],mt.prototype,"selectedArea",void 0),a([Z()],mt.prototype,"areaFilterOptions",void 0),mt=a([G("alarm-view-sensors")],mt);let pt=class extends re{async firstUpdated(){if(this.users=await Da(this.hass),this.data={name:"",code:"",old_code:"",confirm_code:"",is_admin:!1,can_arm:!0,can_disarm:!0,is_override_code:!1},this.item){const e=this.users[this.item];this.data=Object.assign(Object.assign({},this.data),ka(e,["name","is_admin","can_arm","can_disarm","is_override_code"]))}}render(){return this.data?L`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${this.item?la("panels.codes.cards.edit_user.title",this.hass.language):la("panels.codes.cards.new_user.title",this.hass.language)}
          </div>
          <ha-icon-button icon="hass:close" @click=${this.cancelClick}> </ha-icon-button>
        </div>
        <div class="card-content">
          ${this.item?la("panels.codes.cards.edit_user.description",this.hass.language,"{name}",this.users[this.item].name):la("panels.codes.cards.new_user.description",this.hass.language)}
        </div>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${la("panels.codes.cards.new_user.fields.name.heading",this.hass.language)}</span>
          <span slot="description"
            >${la("panels.codes.cards.new_user.fields.name.description",this.hass.language)}</span
          >

          <paper-input
            label="${la("panels.codes.cards.new_user.fields.name.heading",this.hass.language)}"
            placeholder=""
            value=${this.data.name}
            @change=${e=>this.data={...this.data,name:e.target.value}}
          >
          </paper-input>
        </settings-row>

        ${this.item?L`
              <settings-row .narrow=${this.narrow}>
                <span slot="heading"
                  >${la("panels.codes.cards.edit_user.fields.old_code.heading",this.hass.language)}</span
                >
                <span slot="description"
                  >${la("panels.codes.cards.edit_user.fields.old_code.description",this.hass.language)}</span
                >

                <paper-input
                  label="${la("panels.codes.cards.edit_user.fields.old_code.heading",this.hass.language)}"
                  placeholder=""
                  type="password"
                  value=${this.data.old_code}
                  @change=${e=>this.data={...this.data,old_code:e.target.value}}
                >
                </paper-input>
              </settings-row>
            `:""}
        ${this.item&&!this.data.old_code.length?"":L`
              <settings-row .narrow=${this.narrow}>
                <span slot="heading"
                  >${la("panels.codes.cards.new_user.fields.code.heading",this.hass.language)}</span
                >
                <span slot="description"
                  >${la("panels.codes.cards.new_user.fields.code.description",this.hass.language)}</span
                >

                <paper-input
                  label="${la("panels.codes.cards.new_user.fields.code.heading",this.hass.language)}"
                  placeholder=""
                  type="password"
                  value=${this.data.code}
                  @change=${e=>this.data={...this.data,code:e.target.value}}
                >
                </paper-input>
              </settings-row>

              <settings-row .narrow=${this.narrow}>
                <span slot="heading"
                  >${la("panels.codes.cards.new_user.fields.confirm_code.heading",this.hass.language)}</span
                >
                <span slot="description"
                  >${la("panels.codes.cards.new_user.fields.confirm_code.description",this.hass.language)}</span
                >

                <paper-input
                  label="${la("panels.codes.cards.new_user.fields.confirm_code.heading",this.hass.language)}"
                  placeholder=""
                  type="password"
                  value=${this.data.confirm_code}
                  @change=${e=>this.data={...this.data,confirm_code:e.target.value}}
                >
                </paper-input>
              </settings-row>
            `}

        <settings-row .narrow=${this.narrow}>
          <span slot="heading"
            >${la("panels.codes.cards.new_user.fields.is_admin.heading",this.hass.language)}</span
          >
          <span slot="description"
            >${la("panels.codes.cards.new_user.fields.is_admin.description",this.hass.language)}</span
          >

          <ha-switch
            ?checked=${this.data.is_admin}
            @change=${e=>this.data={...this.data,is_admin:e.target.checked}}
          >
          </ha-switch>
        </settings-row>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading"
            >${la("panels.codes.cards.new_user.fields.can_arm.heading",this.hass.language)}</span
          >
          <span slot="description"
            >${la("panels.codes.cards.new_user.fields.can_arm.description",this.hass.language)}</span
          >

          <ha-switch
            ?checked=${this.data.can_arm||this.data.is_admin}
            ?disabled=${this.data.is_admin}
            @change=${e=>this.data={...this.data,can_arm:e.target.checked}}
          >
          </ha-switch>
        </settings-row>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading"
            >${la("panels.codes.cards.new_user.fields.can_disarm.heading",this.hass.language)}</span
          >
          <span slot="description"
            >${la("panels.codes.cards.new_user.fields.can_disarm.description",this.hass.language)}</span
          >

          <ha-switch
            ?checked=${this.data.can_disarm||this.data.is_admin}
            ?disabled=${this.data.is_admin}
            @change=${e=>this.data={...this.data,can_disarm:e.target.checked}}
          >
          </ha-switch>
        </settings-row>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading"
            >${la("panels.codes.cards.new_user.fields.is_override_code.heading",this.hass.language)}</span
          >
          <span slot="description"
            >${la("panels.codes.cards.new_user.fields.is_override_code.description",this.hass.language)}</span
          >

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

          ${this.item?L`
                <mwc-button class="warning" @click=${this.deleteClick}>
                  ${this.hass.localize("ui.common.delete")}
                </mwc-button>
              `:""}
        </div>
      </ha-card>
    `:L``}deleteClick(e){var a,t;this.item&&(a=this.hass,t=this.item,a.callApi("POST","alarmo/users",{user_id:t,remove:!0})).catch(a=>Oa(a,e)).then(()=>{this.cancelClick()})}saveClick(e){if(this.data)if(this.data.name.length)if(this.data.code.length<4&&(!this.item||this.data.old_code.length))Sa(e,la("panels.codes.cards.new_user.errors.no_code",this.hass.language));else if(this.data.code!==this.data.confirm_code)Sa(e,la("panels.codes.cards.new_user.errors.code_mismatch",this.hass.language));else if(this.data.is_admin&&(this.data=Object.assign(Object.assign({},this.data),{can_arm:!0,can_disarm:!0})),this.item){let a=Object.assign(Object.assign({},ka(this.data,["name","is_admin","can_arm","can_disarm"])),{user_id:this.item});this.data.old_code.length&&(a=Object.assign(Object.assign({},a),{old_code:this.data.old_code,code:this.data.code})),Ra(this.hass,a).catch(a=>Oa(a,e)).then(()=>{this.cancelClick()})}else Ra(this.hass,Aa(this.data,["confirm_code","old_code"])).catch(a=>Oa(a,e)).then(()=>{this.cancelClick()});else Sa(e,la("panels.codes.cards.new_user.errors.no_name",this.hass.language))}cancelClick(){qe(0,"/alarmo/codes",!0)}};pt.styles=Pe,a([Z()],pt.prototype,"hass",void 0),a([Z()],pt.prototype,"narrow",void 0),a([Z()],pt.prototype,"item",void 0),a([Z()],pt.prototype,"data",void 0),pt=a([G("user-editor-card")],pt);let gt=class extends(Ha(re)){constructor(){super(...arguments),this.users={},this.code_arm_required=!1,this.code_disarm_required=!1,this.code_format="number"}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeEvents(()=>this._fetchData(),"alarmo_updated")]}async _fetchData(){if(!this.hass)return;const e=await qa(this.hass);this.config=e,this.code_arm_required=e.code_arm_required,this.code_disarm_required=e.code_disarm_required,this.code_format=e.code_format;const a=await Da(this.hass);this.users=a}render(){return this.hass?this.path&&"new_user"==this.path[0]?L`
        <user-editor-card .hass=${this.hass} .narrow=${this.narrow}> </user-editor-card>
      `:this.path&&2==this.path.length&&"edit_user"==this.path[0]?L`
        <user-editor-card .hass=${this.hass} .narrow=${this.narrow} item=${this.path[1]}> </user-editor-card>
      `:L`
        <ha-card header="${la("panels.codes.title",this.hass.language)}">
          <div class="card-content">
            ${la("panels.codes.cards.codes.description",this.hass.language)}
          </div>

          <settings-row .narrow=${this.narrow}>
            <span slot="heading"
              >${la("panels.codes.cards.codes.fields.code_arm_required.heading",this.hass.language)}</span
            >
            <span slot="description"
              >${la("panels.codes.cards.codes.fields.code_arm_required.description",this.hass.language)}</span
            >
            <ha-switch
              ?checked=${this.code_arm_required}
              @change=${e=>{this.code_arm_required=e.target.checked}}
            >
            </ha-switch>
          </settings-row>

          <settings-row .narrow=${this.narrow}>
            <span slot="heading"
              >${la("panels.codes.cards.codes.fields.code_disarm_required.heading",this.hass.language)}</span
            >
            <span slot="description"
              >${la("panels.codes.cards.codes.fields.code_disarm_required.description",this.hass.language)}</span
            >
            <ha-switch
              ?checked=${this.code_disarm_required}
              @change=${e=>{this.code_disarm_required=e.target.checked}}
            >
            </ha-switch>
          </settings-row>

          <settings-row .narrow=${this.narrow}>
            <span slot="heading"
              >${la("panels.codes.cards.codes.fields.code_format.heading",this.hass.language)}</span
            >
            <span slot="description"
              >${la("panels.codes.cards.codes.fields.code_format.description",this.hass.language)}</span
            >
            <mwc-button
              class="${"number"==this.code_format?"active":""} ${this.code_arm_required||this.code_disarm_required?"":"disabled"}"
              @click=${()=>{this.code_format="number"}}
              ?disabled=${!this.code_arm_required&&!this.code_disarm_required}
              >${la("panels.codes.cards.codes.fields.code_format.code_format_number",this.hass.language)}</mwc-button
            >
            <mwc-button
              class="${"text"==this.code_format?"active":""} ${this.code_arm_required||this.code_disarm_required?"":"disabled"}"
              @click=${()=>{this.code_format="text"}}
              ?disabled=${!this.code_arm_required&&!this.code_disarm_required}
            >
              ${la("panels.codes.cards.codes.fields.code_format.code_format_text",this.hass.language)}</mwc-button
            >
          </settings-row>

          <div class="card-actions">
            <mwc-button @click=${this.saveClick}>
              ${this.hass.localize("ui.common.save")}
            </mwc-button>
          </div>
        </ha-card>

        ${this.usersPanel()}
      `:L``}usersPanel(){if(!this.hass)return L``;const e=Object.values(this.users);e.sort((e,a)=>e.name.toLowerCase()<a.name.toLowerCase()?-1:1);const a={icon:{width:"40px"},name:{title:this.hass.localize("ui.components.area-picker.add_dialog.name"),width:"40%",grow:!0,text:!0},remarks:{title:la("panels.codes.cards.user_management.table.remarks",this.hass.language),width:"40%",hide:this.narrow,text:!0}},t=e.map(e=>({id:e.user_id,icon:L`
          <ha-icon icon="mdi:account-outline"></ha-icon>
        `,name:wa(e.name),remarks:e.is_admin?la("panels.codes.cards.user_management.table.administrator",this.hass.language):""}));return L`
      <ha-card header="${la("panels.codes.cards.user_management.title",this.hass.language)}">
        <div class="card-content">
          ${la("panels.codes.cards.user_management.description",this.hass.language)}
        </div>

        <alarmo-table
          ?selectable=${!0}
          .columns=${a}
          .data=${t}
          @row-click=${e=>{const a=String(e.detail.id);qe(0,"/alarmo/codes/edit_user/"+a,!0)}}
        >
          ${la("panels.codes.cards.user_management.no_items",this.hass.language)}
        </alarmo-table>
        <div class="card-actions">
          <mwc-button @click=${this.addUserClick}>
            ${la("panels.codes.cards.user_management.actions.new_user",this.hass.language)}
          </mwc-button>
        </div>
      </ha-card>
    `}addUserClick(){qe(0,"/alarmo/codes/new_user",!0)}saveClick(e){this.hass&&Pa(this.hass,{code_arm_required:this.code_arm_required,code_disarm_required:this.code_disarm_required,code_format:this.code_format}).catch(a=>Oa(a,e)).then()}};gt.styles=Pe,a([Z()],gt.prototype,"narrow",void 0),a([Z()],gt.prototype,"path",void 0),a([Z()],gt.prototype,"config",void 0),a([Z()],gt.prototype,"users",void 0),a([Z()],gt.prototype,"code_arm_required",void 0),a([Z()],gt.prototype,"code_disarm_required",void 0),a([Z()],gt.prototype,"code_format",void 0),gt=a([G("alarm-view-codes")],gt);let vt=class extends re{constructor(){super(...arguments),this.label="",this.options=[],this.value=[],this.numOptions=1}firstUpdated(){this.value||(this.value=[]),this.value.length>1&&(this.numOptions=this.value.length)}render(){return L`
      <div class="container">
        ${[...Array(this.numOptions).keys()].map(e=>this.renderSelect(e))}
      </div>
    `}renderSelect(e){return L`
      <div>
        <paper-dropdown-menu label=${this.label} ?disabled=${this.disabled}>
          <paper-listbox
            slot="dropdown-content"
            selected=${this.getSelected(e)}
            @selected-item-changed=${a=>this.selectedChange(a,e)}
          >
            ${this.renderOptions(e)}
          </paper-listbox>
        </paper-dropdown-menu>
        ${this.renderButton(e)}
      </div>
    `}renderButton(e){return e!=this.numOptions-1||e==this.options.length-1?L`
        <ha-icon icon="hass:minus" @click=${()=>this.removeOption(e)}></ha-icon>
      `:this.value&&this.value.length>e?L`
        <ha-icon icon="hass:plus" @click=${this.addOption}></ha-icon>
      `:L`
        <ha-icon class="disabled" icon="hass:plus"></ha-icon>
      `}renderOptions(e){const a=this.value.slice(0,e).concat(this.value.slice(e+1));return this.options.filter(e=>e.value).map(e=>L`
          <paper-item value="${e.value}" ?disabled=${a.includes(e.value)}>
            ${e.name||e.value}
          </paper-item>
        `)}getSelected(e){return this.options.filter(e=>e.value).findIndex(a=>a.value==this.value[e])}selectedChange(e,a){if(!e.target.selectedItem)return;const t=e.target.selectedItem.getAttribute("value"),i=this.value.length==a?[...this.value,t]:this.value.slice(0,a).concat(t,this.value.slice(a+1));if(xa(i,this.value))return;this.value=i;const s=new CustomEvent("change");this.dispatchEvent(s)}addOption(){this.numOptions=this.numOptions+1}removeOption(e){this.numOptions=this.numOptions-1,e==this.value.length-1?this.value=this.value.slice(0,e):this.value=this.value.slice(0,e).concat(this.value.slice(e+1))}};vt.styles=se`
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
  `,a([Z()],vt.prototype,"label",void 0),a([Z()],vt.prototype,"options",void 0),a([Z()],vt.prototype,"value",void 0),a([Z({type:Boolean})],vt.prototype,"disabled",void 0),a([Z()],vt.prototype,"numOptions",void 0),vt=a([G("alarmo-multi-select")],vt);const _t=e=>[{value:_a.Armed,name:la("panels.actions.cards.new_notification.fields.event.choose.armed.name",e.language),description:la("panels.actions.cards.new_notification.fields.event.choose.armed.description",e.language),icon:"hass:shield-check-outline",trigger:{state:_a.Armed}},{value:_a.Disarmed,name:la("panels.actions.cards.new_notification.fields.event.choose.disarmed.name",e.language),description:la("panels.actions.cards.new_notification.fields.event.choose.disarmed.description",e.language),icon:"hass:shield-off-outline",trigger:{state:_a.Disarmed}},{value:_a.Triggered,name:la("panels.actions.cards.new_notification.fields.event.choose.triggered.name",e.language),description:la("panels.actions.cards.new_notification.fields.event.choose.triggered.description",e.language),icon:"hass:bell-alert-outline",trigger:{state:_a.Triggered}},{value:fa.ArmFailure,name:la("panels.actions.cards.new_notification.fields.event.choose.arm_failure.name",e.language),description:la("panels.actions.cards.new_notification.fields.event.choose.arm_failure.description",e.language),icon:"hass:alert-outline",trigger:{event:fa.ArmFailure}},{value:_a.Arming,name:la("panels.actions.cards.new_notification.fields.event.choose.arming.name",e.language),description:la("panels.actions.cards.new_notification.fields.event.choose.arming.description",e.language),icon:"hass:home-export-outline",trigger:{state:_a.Arming}},{value:_a.Pending,name:la("panels.actions.cards.new_notification.fields.event.choose.pending.name",e.language),description:la("panels.actions.cards.new_notification.fields.event.choose.pending.description",e.language),icon:"hass:home-import-outline",trigger:{state:_a.Pending}}];function ft(e){const a=Object.keys(e.services.notify).map(a=>{let t={value:"notify."+a,name:a};const i=e.states["device_tracker."+a.replace("mobile_app_","")];return i&&(t=Object.assign(Object.assign({},t),{name:i.attributes.friendly_name||Ce(i.entity_id)})),t});return a.sort((e,a)=>e.name.toLowerCase()<a.name.toLowerCase()?-1:1),a}const bt={name:"",triggers:[],actions:[{service:"",service_data:{message:""}}]},wt={name:"",triggers:[],actions:[{service:"",service_data:{}}]};function yt(e){if(1!=e.triggers.length)return"";if(e.triggers[0].state)switch(e.triggers[0].state){case _a.Armed:return"The alarm is now ON.";case _a.Disarmed:return"The alarm is now OFF.";case _a.Arming:return"The alarm will be armed soon, please leave the house.";case _a.Pending:return"The alarm is about to trigger, disarm it quickly!";case _a.Triggered:return"The alarm is triggered! Cause: {{open_sensors}}.";default:return""}else if(e.triggers[0].event)switch(e.triggers[0].event){case fa.ArmFailure:return"The alarm could not be armed right now, due to: {{open_sensors}}.";default:return""}return""}const $t=["switch","input_boolean","light","script"];function kt(e,a){if(!e.triggers.length)return la("panels.actions.validation_errors.no_triggers",a.language);for(let t=0;t<e.triggers.length;t++){const i=e.triggers[t];if(!i.event&&!i.state)return la("panels.actions.validation_errors.empty_trigger",a.language);if(!_t(a).find(e=>JSON.stringify(e.trigger)===JSON.stringify(i)))return la("panels.actions.validation_errors.invalid_trigger",a.language,"{trigger}",JSON.stringify(i))}if(void 0!==e.modes&&e.modes.length)for(let t=0;t<e.modes.length;t++){const i=e.modes[t];if(!Object.values(va).includes(i))return la("panels.actions.validation_errors.empty_trigger",a.language,"{mode}",i)}if(!e.actions.length)return la("panels.actions.validation_errors.no_actions",a.language);for(let t=0;t<e.actions.length;t++){const i=e.actions[t];if(!i.service)return la("panels.actions.validation_errors.no_service",a.language);if(!Object.keys(a.services).includes(Oe(i.service)))return la("panels.actions.validation_errors.invalid_service",a.language,"{service}",i.service);if(!Object.keys(a.services[Oe(i.service)]).includes(Ce(i.service)))return la("panels.actions.validation_errors.invalid_service",a.language,"{service}",i.service);if(!i.service_data||!Object.keys(i.service_data).length)return la("panels.actions.validation_errors.no_service_data",a.language);if(e.is_notification){if(!Object.keys(i.service_data).includes("message")||!i.service_data.message.length)return la("panels.actions.validation_errors.no_message_in_service_data",a.language)}else if(!Object.keys(i.service_data).includes("entity_id"))return la("panels.actions.validation_errors.no_entity_in_service_data",a.language)}}let At=class extends re{constructor(){super(...arguments),this.yamlMode=!1,this.namePlaceholder="",this.areas={}}async firstUpdated(){const e=await Ia(this.hass);this.areas=e;const a=await Na(this.hass);if(this.item)a[this.item]&&a[this.item].is_notification?this.data=Aa(a[this.item],["automation_id","is_notification","enabled"]):this.data=Object.assign({},bt);else{this.data=Object.assign({},bt);let a="My notification";const t=await Na(this.hass);if(Object.values(t).find(e=>e.name==a)){let e=2;for(;Object.values(t).find(t=>t.name==`${a} ${e}`);)e++;a=`${a} ${e}`}this.namePlaceholder=a,this.data.area||1!=Object.keys(e).length||(this.data=Object.assign(Object.assign({},this.data),{area:Object.keys(this.areas)[0]}))}}render(){return this.data?L`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${la("panels.actions.cards.new_notification.title",this.hass.language)}
          </div>
          <ha-icon-button icon="hass:close" @click=${this.cancelClick}> </ha-icon-button>
        </div>
        <div class="card-content">
          ${la("panels.actions.cards.new_notification.description",this.hass.language)}
        </div>

        <div style="text-align: right; padding: 0px 16px 16px 16px">
          <mwc-button @click=${this.toggleYaml}>
            ${this.yamlMode?la("components.editor.ui_mode",this.hass.language):la("components.editor.yaml_mode",this.hass.language)}
          </mwc-button>
        </div>

        ${this.yamlMode?L`
              <ha-yaml-editor
                .label="Label"
                .name="Data"
                .defaultValue=${this.data}
                @value-changed=${e=>{this.yamlCode=e.detail.value}}
              >
              </ha-yaml-editor>
            `:L`

  <settings-row .narrow=${this.narrow} .large=${!0}>
    <span slot="heading">${la("panels.actions.cards.new_notification.fields.event.heading",this.hass.language)}</span>
    <span slot="description">${la("panels.actions.cards.new_notification.fields.event.description",this.hass.language)}</span>

    <alarmo-select
      .hass=${this.hass}
      .items=${_t(this.hass)}
      label=${la("panels.actions.cards.new_action.fields.event.heading",this.hass.language)}
      icons=${!0}
      .value=${this.data.triggers.map(e=>_t(this.hass).find(a=>JSON.stringify(a.trigger)==JSON.stringify(e)).value)[0]}
      @value-changed=${e=>this.updateTriggers(e.target.value)}
    >
    </alarmo-select>

  </settings-row>
  
  ${this.areas&&Object.keys(this.areas).length>1?L`
  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${la("panels.actions.cards.new_action.fields.area.heading",this.hass.language)}</span>
    <span slot="description">${la("panels.actions.cards.new_action.fields.area.description",this.hass.language)}</span>

    <alarmo-select
      .items=${Object.values(this.areas).map(e=>Object({value:e.area_id,name:e.name}))}
      value=${this.data.area||""}
      clearable=${!0}
      label=${la("panels.sensors.cards.editor.fields.area.heading",this.hass.language)}
      @value-changed=${e=>this.data={...this.data,area:e.target.value}}
    </alarmo-select>
  </settings-row>`:""}

  <div class="separator"></div>

  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${la("panels.actions.cards.new_notification.fields.mode.heading",this.hass.language)}</span>
    <span slot="description">${la("panels.actions.cards.new_notification.fields.mode.description",this.hass.language)}</span>

    <alarmo-multi-select
      label=${la("panels.actions.cards.new_notification.fields.mode.heading",this.hass.language)}
      ?disabled=${!this.data.triggers.length||this.data.triggers.some(e=>e.state&&e.state==_a.Disarmed)}
      .options=${this.getModeList()}
      .value=${this.data.modes||[]}
      @change=${e=>this.updateModes(e.target.value)}
    </alarmo-multi-select>

  </settings-row>
  
  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${la("panels.actions.cards.new_notification.fields.title.heading",this.hass.language)}</span>
    <span slot="description">${la("panels.actions.cards.new_notification.fields.title.description",this.hass.language)}</span>

    <paper-input
      label="${la("panels.actions.cards.new_notification.fields.title.heading",this.hass.language)}"
      placeholder=""
      value=${this.data.actions[0].service_data.title||""}
      @change=${e=>this.updateTitle(e.target.value)}
    >
    </paper-input>
  </settings-row>

    <settings-row .narrow=${this.narrow} .large=${!0}>
    <span slot="heading">${la("panels.actions.cards.new_notification.fields.message.heading",this.hass.language)}</span>
    <span slot="description">${la("panels.actions.cards.new_notification.fields.message.description",this.hass.language)}</span>

    <paper-textarea
      label="${la("panels.actions.cards.new_notification.fields.message.heading",this.hass.language)}"
      placeholder=${yt(this.data)}
      value=${this.data.actions[0].service_data.message||""}
      @blur=${e=>{this.updateMessage(e.target.value)}}
    >
    </paper-textarea>
  </settings-row>

  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${la("panels.actions.cards.new_notification.fields.target.heading",this.hass.language)}</span>
    <span slot="description">${la("panels.actions.cards.new_notification.fields.target.description",this.hass.language)}</span>

    <alarmo-multi-select
      label=${la("panels.actions.cards.new_notification.fields.target.heading",this.hass.language)}
      .options=${this.getTargetList()}
      .value=${this.data.actions.map(e=>e.service)}
      @change=${e=>this.updateTargets(e.target.value)}
    </alarmo-multi-select>
  </settings-row>

  <settings-row .narrow=${this.narrow} .large=${!0}>
    <span slot="heading">${la("panels.actions.cards.new_notification.fields.name.heading",this.hass.language)}</span>
    <span slot="description">${la("panels.actions.cards.new_notification.fields.name.description",this.hass.language)}</span>

    <paper-input
      label="${la("panels.actions.cards.new_notification.fields.name.heading",this.hass.language)}"
      placeholder=${this.namePlaceholder}
      value=${this.data.name}
      @change=${e=>this.data={...this.data,name:e.target.value}}
    >
    </paper-input>
  </settings-row>
  `}

        <div class="card-actions">
          <mwc-button @click=${this.saveClick}>
            <ha-icon icon="hass:content-save-outline"></ha-icon>
            ${this.hass.localize("ui.common.save")}
          </mwc-button>

          ${this.item?L`
                <mwc-button class="warning" @click=${this.deleteClick}>
                  <ha-icon icon="hass:trash-can-outline"></ha-icon>
                  ${this.hass.localize("ui.common.delete")}
                </mwc-button>
              `:""}

          <mwc-button @click=${this.testClick} style="float: right" trailingIcon>
            ${la("panels.actions.cards.new_notification.actions.test",this.hass.language)}
            <ha-icon icon="hass:arrow-right"></ha-icon>
          </mwc-button>
        </div>
      </ha-card>
    `:L``}getTargetList(){return[...Object.values(ft(this.hass)),,...this.data.actions.filter(e=>!ft(this.hass).find(a=>a.value==e.service)).map(e=>Object({value:e.service}))]}getModeList(){var e;return((null===(e=this.data)||void 0===e?void 0:e.area)?this.areas[this.data.area]?Object.entries(this.areas[this.data.area].modes).filter(([,e])=>e.enabled).map(([e])=>e):[]:Object.values(this.areas).map(e=>Object.entries(e.modes).filter(([,e])=>e.enabled).map(([e])=>e)).reduce((e,a)=>e.filter(e=>a.includes(e)))).map(e=>Object({name:la("common.modes_long."+e,this.hass.language),value:e}))}updateTriggers(e){this.data=Object.assign(Object.assign({},this.data),{triggers:[_t(this.hass).find(a=>a.value==e).trigger]})}updateModes(e){this.data=Object.assign(Object.assign({},this.data),{modes:e})}updateTitle(e){this.data=Object.assign(Object.assign({},this.data),{actions:this.data.actions.map(a=>Object(Object.assign(Object.assign({},a),{service_data:Object.assign(Object.assign({},a.service_data),{title:e})})))})}updateMessage(e){this.data=Object.assign(Object.assign({},this.data),{actions:this.data.actions.map(a=>Object(Object.assign(Object.assign({},a),{service_data:Object.assign(Object.assign({},a.service_data),{message:e})})))})}updateTargets(e){this.data=Object.assign(Object.assign({},this.data),{actions:e.map(e=>Object({service:e,service_data:Object.assign({},this.data.actions[0].service_data)}))})}deleteClick(e){this.item&&Ua(this.hass,this.item).catch(a=>Oa(a,e)).then(()=>{this.cancelClick()})}loadFormData(){let e=this.yamlMode?Object.assign({},this.yamlCode):this.data;return e=Object.assign(Object.assign({},e),{is_notification:!0,actions:e.actions.map(a=>!a.service_data||a.service_data.message&&a.service_data.message.length?a:Object.assign(Object.assign({},a),{service_data:Object.assign(Object.assign({},a.service_data),{message:yt(e)})})),name:e.name||this.namePlaceholder,area:e.area||""}),e}async saveClick(e){let a=this.loadFormData();const t=kt(a,this.hass);t?Sa(e,t):(this.item&&(a=Object.assign(Object.assign({},a),{automation_id:this.item})),Va(this.hass,a).catch(a=>Oa(a,e)).then(()=>{this.cancelClick()}))}toggleYaml(){this.data&&(this.yamlMode=!this.yamlMode,!this.yamlMode&&this.yamlCode?this.data=Object.assign({},this.yamlCode):this.yamlCode=Object.assign({},this.data))}cancelClick(){qe(0,"/alarmo/actions",!0)}testClick(e){const a=this.loadFormData(),t=kt(a,this.hass);t?Sa(e,t):a.actions.forEach(a=>{const[t,i]=a.service.split(".");let s=a.service_data.message;s=s.replace("{{open_sensors}}","Some Example Sensor is open"),s=s.replace("{{bypassed_sensors}}","Some Bypassed Sensor"),s=s.replace("{{arm_mode}}","armed_away"),s=s.replace("{{changed_by}}","Some Example User"),a=Object.assign(Object.assign({},a),{service_data:Object.assign(Object.assign({},a.service_data),{message:s})}),this.hass.callService(t,i,a.service_data).then().catch(a=>{Sa(e,a.message)})})}};At.styles=Pe,a([Z()],At.prototype,"narrow",void 0),a([Z()],At.prototype,"item",void 0),a([Z()],At.prototype,"data",void 0),a([Z()],At.prototype,"yamlMode",void 0),a([Z()],At.prototype,"namePlaceholder",void 0),a([Z()],At.prototype,"areas",void 0),At=a([G("notification-editor-card")],At);let xt=class extends re{constructor(){super(...arguments),this.includeDomains=[],this.options=[],this.value=[],this.numOptions=1}firstUpdated(){this.value.length>1&&(this.numOptions=this.value.length)}render(){return this.hass?L`
      <div class="container">
        ${[...Array(this.numOptions).keys()].map(e=>this.renderSelect(e))}
      </div>
    `:L``}renderSelect(e){return L`
      <div class="container-item">
        <div class="dropdown-holder">
          <ha-entity-picker
            @change=${a=>{this.selectedChange(a,e)}}
            .includeDomains=${this.includeDomains}
            .hass=${this.hass}
            value=${this.getValue(e)}
            .allowCustomEntity=${!0}
          ></ha-entity-picker>
        </div>
        <div class="icon-holder">
          ${this.renderButton(e)}
        </div>
      </div>
    `}renderButton(e){return e!=this.numOptions-1||e==this.options.length-1?L`
        <ha-icon icon="hass:minus" @click=${()=>this.removeOption(e)}></ha-icon>
      `:this.value&&this.value.length>e?L`
        <ha-icon icon="hass:plus" @click=${this.addOption}></ha-icon>
      `:L`
        <ha-icon class="disabled" icon="hass:plus"></ha-icon>
      `}getValue(e){return e>this.value.length-1?"":this.value[e]}entityFilter(e,a){return!this.value.slice(0,a).concat(this.value.slice(a+1)).includes(e)}selectedChange(e,a){const t=e.target.value;if(!this.entityFilter(t,a))return void this.removeOption(a);const i=this.value.length==a?[...this.value,t]:this.value.slice(0,a).concat(t,this.value.slice(a+1));this.value=i.filter(e=>e);const s=new CustomEvent("change");this.dispatchEvent(s)}addOption(){this.numOptions=this.numOptions+1}removeOption(e){this.numOptions=this.numOptions-1,e==this.value.length-1?this.value=this.value.slice(0,e):this.value=this.value.slice(0,e).concat(this.value.slice(e+1))}};xt.styles=se`
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
      grid-template-areas: 'dropdown icon';
      align-items: flex-end;
    }

    div.dropdown-holder {
      grid-area: dropdown;
    }
    div.icon-holder {
      grid-area: icon;
    }
  `,a([Z()],xt.prototype,"includeDomains",void 0),a([Z()],xt.prototype,"options",void 0),a([Z()],xt.prototype,"value",void 0),a([Z()],xt.prototype,"numOptions",void 0),xt=a([G("alarmo-multi-entity-select")],xt);let St=class extends re{constructor(){super(...arguments),this.yamlMode=!1,this.namePlaceholder="",this.areas={}}async firstUpdated(){const e=await Ia(this.hass);this.areas=e;const a=await Na(this.hass);if(this.item)a[this.item]&&!a[this.item].is_notification?this.data=Aa(a[this.item],["automation_id","is_notification","enabled"]):this.data=Object.assign({},wt);else{this.data=Object.assign({},wt);let a="My notification";const t=await Na(this.hass);if(Object.values(t).find(e=>e.name==a)){let e=2;for(;Object.values(t).find(t=>t.name==`${a} ${e}`);)e++;a=`${a} ${e}`}this.namePlaceholder=a,this.data.area||1!=Object.keys(e).length||(this.data=Object.assign(Object.assign({},this.data),{area:Object.keys(this.areas)[0]}))}}render(){return this.data?L`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${la("panels.actions.cards.new_action.title",this.hass.language)}
          </div>
          <ha-icon-button icon="hass:close" @click=${this.cancelClick}> </ha-icon-button>
        </div>
        <div class="card-content">
          ${la("panels.actions.cards.new_action.description",this.hass.language)}
        </div>

        <div style="text-align: right; padding: 0px 16px 16px 16px">
          <mwc-button @click=${this.toggleYaml}>
            ${this.yamlMode?la("components.editor.ui_mode",this.hass.language):la("components.editor.yaml_mode",this.hass.language)}
          </mwc-button>
        </div>

        ${this.yamlMode?L`
              <ha-yaml-editor
                .label="Label"
                .name="Data"
                .defaultValue=${this.data}
                @value-changed=${e=>{this.yamlCode=e.detail.value}}
              >
              </ha-yaml-editor>
            `:L`

  <settings-row .narrow=${this.narrow} .large=${!0}>
    <span slot="heading">${la("panels.actions.cards.new_action.fields.event.heading",this.hass.language)}</span>
    <span slot="description">${la("panels.actions.cards.new_action.fields.event.description",this.hass.language)}</span>

    <alarmo-select
      .hass=${this.hass}
      .items=${_t(this.hass)}
      label=${la("panels.actions.cards.new_action.fields.event.heading",this.hass.language)}
      icons=${!0}
      .value=${this.data.triggers.map(e=>_t(this.hass).find(a=>JSON.stringify(a.trigger)==JSON.stringify(e)).value)[0]}
      @value-changed=${e=>this.updateTriggers(e.target.value)}
    >
    </alarmo-select>

  </settings-row>

  ${this.areas&&Object.keys(this.areas).length>1?L`
  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${la("panels.actions.cards.new_action.fields.area.heading",this.hass.language)}</span>
    <span slot="description">${la("panels.actions.cards.new_action.fields.area.description",this.hass.language)}</span>

    <alarmo-select
      .items=${Object.values(this.areas).map(e=>Object({value:e.area_id,name:e.name}))}
      value=${this.data.area||""}
      clearable=${!0}
      label=${la("panels.sensors.cards.editor.fields.area.heading",this.hass.language)}
      @value-changed=${e=>this.data={...this.data,area:e.target.value}}
    </alarmo-select>
  </settings-row>`:""}

  <div class="separator"></div>

  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${la("panels.actions.cards.new_action.fields.mode.heading",this.hass.language)}</span>
    <span slot="description">${la("panels.actions.cards.new_action.fields.mode.description",this.hass.language)}</span>

    <alarmo-multi-select
      label=${la("panels.actions.cards.new_action.fields.mode.heading",this.hass.language)}
      ?disabled=${!this.data.triggers.length||this.data.triggers.some(e=>e.state&&e.state==_a.Disarmed)}
      .options=${this.getModeList()}
      .value=${this.data.modes||[]}
      @change=${e=>this.updateModes(e.target.value)}
    </alarmo-multi-select>

  </settings-row>

  <settings-row .narrow=${this.narrow} .large=${!0}>
    <span slot="heading">${la("panels.actions.cards.new_action.fields.entity.heading",this.hass.language)}</span>
    <span slot="description">${la("panels.actions.cards.new_action.fields.entity.description",this.hass.language)}</span>

    <alarmo-multi-entity-select
      .hass=${this.hass}
      .includeDomains=${$t}
      .value=${this.getEntityValues()}
      @change=${e=>this.updateEntities(e.target.value)}
    ></alarmo-multi-entity-select>
  </settings-row>

  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${la("panels.actions.cards.new_action.fields.action.heading",this.hass.language)}</span>
    <span slot="description">${la("panels.actions.cards.new_action.fields.action.description",this.hass.language)}</span>
    <div>
    <mwc-button
      class="${"turn_on"==this.getAction()?"active":""}"
      @click=${()=>{this.updateAction("turn_on")}}
      >
        ${la("panels.actions.cards.new_action.fields.action.turn_on",this.hass.language)}
      </mwc-button>
    <mwc-button
      class="${"turn_off"==this.getAction()?"active":""}"
      @click=${()=>{this.updateAction("turn_off")}}
    >
      ${la("panels.actions.cards.new_action.fields.action.turn_off",this.hass.language)}
    </mwc-button>
    </div>
  </settings-row>

  <settings-row .narrow=${this.narrow} .large=${!0}>
    <span slot="heading">${la("panels.actions.cards.new_action.fields.name.heading",this.hass.language)}</span>
    <span slot="description">${la("panels.actions.cards.new_action.fields.name.description",this.hass.language)}</span>

    <paper-input
      label="${la("panels.actions.cards.new_action.fields.name.heading",this.hass.language)}"
      placeholder=""
      value=${this.data.name}
      @change=${e=>this.data={...this.data,name:e.target.value}}
    >
    </paper-input>
  </settings-row>

  `}

        <div class="card-actions">
          <mwc-button @click=${this.saveClick}>
            <ha-icon icon="hass:content-save-outline"></ha-icon>
            ${this.hass.localize("ui.common.save")}
          </mwc-button>

          ${this.item?L`
                <mwc-button class="warning" @click=${this.deleteClick}>
                  <ha-icon icon="hass:trash-can-outline"></ha-icon>
                  ${this.hass.localize("ui.common.delete")}
                </mwc-button>
              `:""}

          <mwc-button @click=${this.testClick} style="float: right" trailingIcon>
            ${la("panels.actions.cards.new_notification.actions.test",this.hass.language)}
            <ha-icon icon="hass:arrow-right"></ha-icon>
          </mwc-button>
        </div>
      </ha-card>
    `:L``}getEntityValues(){var e;return null===(e=this.data)||void 0===e?void 0:e.actions.map(e=>{var a;return null===(a=e.service_data)||void 0===a?void 0:a.entity_id}).filter(e=>e)}getModeList(){var e;return((null===(e=this.data)||void 0===e?void 0:e.area)?this.areas[this.data.area]?Object.entries(this.areas[this.data.area].modes).filter(([,e])=>e.enabled).map(([e])=>e):[]:Object.values(this.areas).map(e=>Object.entries(e.modes).filter(([,e])=>e.enabled).map(([e])=>e)).reduce((e,a)=>e.filter(e=>a.includes(e)))).map(e=>Object({name:la("common.modes_long."+e,this.hass.language),value:e}))}updateTriggers(e){this.data=Object.assign(Object.assign({},this.data),{triggers:[_t(this.hass).find(a=>a.value==e).trigger]})}updateModes(e){this.data=Object.assign(Object.assign({},this.data),{modes:e})}updateEntities(e){var a;const t=this.getAction(),i=[...(null===(a=this.data)||void 0===a?void 0:a.actions)||[]];e.forEach((e,a)=>{var s;a<i.length&&Oe(i[a].service||(null===(s=i[a].service_data)||void 0===s?void 0:s.entity_id)||"")==Oe(e[a])?i[a]=Object.assign(Object.assign({},i[a]),{service_data:Object.assign(Object.assign({},i[a].service_data),{entity_id:e})}):a<i.length?i[a]={service:t?Oe(e)+"."+t:"",service_data:{entity_id:e}}:i.push({service:t?Oe(e)+"."+t:"",service_data:{entity_id:e}})}),this.data=Object.assign(Object.assign({},this.data),{actions:i})}getAction(){var e;const a=(null===(e=this.data)||void 0===e?void 0:e.actions.map(e=>Ce(e.service)).filter(e=>e))||[];return 1==$a(a).length?a[0]:""}updateAction(e){this.data=Object.assign(Object.assign({},this.data),{actions:this.data.actions.map(a=>{var t;return Object(Object.assign(Object.assign({},a),{service:(Oe((null===(t=a.service_data)||void 0===t?void 0:t.entity_id)||"")||"homeassistant")+"."+e}))})})}deleteClick(e){this.item&&Ua(this.hass,this.item).catch(a=>Oa(a,e)).then(()=>{this.cancelClick()})}loadFormData(){let e=this.yamlMode?Object.assign({},this.yamlCode):this.data;return e=Object.assign(Object.assign({},e),{name:e.name||this.namePlaceholder,area:e.area||""}),e}saveClick(e){let a=this.loadFormData();const t=kt(a,this.hass);t?Sa(e,t):(this.item&&(a=Object.assign(Object.assign({},a),{automation_id:this.item})),Va(this.hass,a).catch(a=>Oa(a,e)).then(()=>{this.cancelClick()}))}toggleYaml(){this.data&&(this.yamlMode=!this.yamlMode,!this.yamlMode&&this.yamlCode?this.data=Object.assign({},this.yamlCode):this.yamlCode=Object.assign({},this.data))}cancelClick(){qe(0,"/alarmo/actions",!0)}testClick(e){const a=this.loadFormData(),t=kt(a,this.hass);t?Sa(e,t):a.actions.forEach(a=>{const[t,i]=a.service.split(".");this.hass.callService(t,i,a.service_data).then().catch(a=>{Sa(e,a.message)})})}};St.styles=Pe,a([Z()],St.prototype,"narrow",void 0),a([Z()],St.prototype,"item",void 0),a([Z()],St.prototype,"data",void 0),a([Z()],St.prototype,"yamlMode",void 0),a([Z()],St.prototype,"namePlaceholder",void 0),a([Z()],St.prototype,"areas",void 0),St=a([G("automation-editor-card")],St);let Ot=class extends(Ha(re)){constructor(){super(...arguments),this.automations=[],this.areas={},this.notificationFilterOptions=[],this.automationFilterOptions=[]}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeEvents(()=>this._fetchData(),"alarmo_updated")]}async _fetchData(){if(!this.hass)return;const e=await Na(this.hass);this.automations=Object.values(e),this.areas=await Ia(this.hass),this.notificationFilterOptions=[{value:"no_area",name:la("panels.actions.cards.notifications.filter.no_area",this.hass.language),count:Object.values(this.automations).filter(e=>e.is_notification&&!e.area).length}].concat(Object.values(this.areas).map(e=>Object({value:e.area_id,name:e.name,count:Object.values(this.automations).filter(a=>a.is_notification&&a.area==e.area_id).length})).sort((e,a)=>e.name.toLowerCase()<a.name.toLowerCase()?-1:1)),this.automationFilterOptions=[{value:"no_area",name:la("panels.actions.cards.notifications.filter.no_area",this.hass.language),count:Object.values(this.automations).filter(e=>!e.is_notification&&!e.area).length}].concat(Object.values(this.areas).map(e=>Object({value:e.area_id,name:e.name,count:Object.values(this.automations).filter(a=>!a.is_notification&&a.area==e.area_id).length})).sort((e,a)=>e.name.toLowerCase()<a.name.toLowerCase()?-1:1))}firstUpdated(){this.path&&2==this.path.length&&"filter"==this.path[0]&&(this.notificationFilter=this.path[1],this.automationFilter=this.path[1]),(async()=>{await Ne()})()}render(){if(!this.hass)return L``;if(this.path&&this.path.length&&"new_notification"==this.path[0])return L`
        <notification-editor-card .hass=${this.hass} .narrow=${this.narrow}> </notification-editor-card>
      `;if(this.path&&2==this.path.length&&"edit_notification"==this.path[0])return L`
        <notification-editor-card .hass=${this.hass} .narrow=${this.narrow} item=${this.path[1]}>
        </notification-editor-card>
      `;if(this.path&&this.path.length&&"new_action"==this.path[0])return L`
        <automation-editor-card .hass=${this.hass} .narrow=${this.narrow}> </automation-editor-card>
      `;if(this.path&&2==this.path.length&&"edit_action"==this.path[0])return L`
        <automation-editor-card .hass=${this.hass} .narrow=${this.narrow} item=${this.path[1]}>
        </automation-editor-card>
      `;{const e={type:{width:"40px"},name:{title:this.hass.localize("ui.components.area-picker.add_dialog.name"),width:"40%",grow:!0,text:!0},enabled:{title:la("panels.actions.cards.notifications.table.enabled",this.hass.language),width:"68px",align:"center"}},a=this.automations.filter(e=>e.is_notification).filter(e=>!this.notificationFilter||!this.notificationFilterOptions.find(e=>e.value==this.notificationFilter)||e.area==this.notificationFilter||"no_area"===this.notificationFilter&&!e.area).map(e=>Object({id:e.automation_id,type:L`
              <ha-icon icon="hass:message-text-outline"></ha-icon>
            `,name:e.name,enabled:L`
              <ha-switch
                ?checked=${e.enabled}
                @click=${a=>{a.stopPropagation(),this.toggleEnable(a,e.automation_id)}}
              ></ha-switch>
            `})),t=this.automations.filter(e=>!e.is_notification).filter(e=>!this.automationFilter||!this.automationFilterOptions.find(e=>e.value==this.automationFilter)||e.area==this.automationFilter||"no_area"===this.automationFilter&&!e.area).map(e=>Object({id:e.automation_id,type:L`
              <ha-icon icon="hass:flash"></ha-icon>
            `,name:e.name,enabled:L`
              <ha-switch
                ?checked=${e.enabled}
                @click=${a=>{a.stopPropagation(),this.toggleEnable(a,e.automation_id)}}
              ></ha-switch>
            `}));return L`
        <ha-card header="${la("panels.actions.cards.notifications.title",this.hass.language)}">
          <div class="card-content">
            ${la("panels.actions.cards.notifications.description",this.hass.language)}
          </div>

          ${this.notificationFilterOptions.length>1?L`
                <div class="table-filter" ?narrow=${this.narrow}>
                  <span class="header"
                    >${la("panels.actions.cards.notifications.filter.label",this.hass.language)}:</span
                  >
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
            .data=${a}
            @row-click=${e=>{const a=String(e.detail.id);qe(0,"/alarmo/actions/edit_notification/"+a,!0)}}
          >
            ${la("panels.actions.cards.notifications.table.no_items",this.hass.language)}
          </alarmo-table>

          <div class="card-actions">
            <mwc-button @click=${this.addNotificationClick}>
              ${la("panels.actions.cards.notifications.actions.new_notification",this.hass.language)}
            </mwc-button>
          </div>
        </ha-card>

        <ha-card header="${la("panels.actions.title",this.hass.language)}">
          <div class="card-content">${la("panels.actions.cards.actions.description",this.hass.language)}</div>

          ${this.automationFilterOptions.length>1?L`
                <div class="table-filter" ?narrow=${this.narrow}>
                  <span class="header"
                    >${la("panels.actions.cards.notifications.filter.label",this.hass.language)}:</span
                  >
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
            .data=${t}
            @row-click=${e=>{const a=String(e.detail.id);qe(0,"/alarmo/actions/edit_action/"+a,!0)}}
          >
            ${la("panels.actions.cards.actions.table.no_items",this.hass.language)}
          </alarmo-table>

          <div class="card-actions">
            <mwc-button @click=${this.addActionClick}>
              ${la("panels.actions.cards.actions.actions.new_action",this.hass.language)}
            </mwc-button>
          </div>
        </ha-card>
      `}}toggleEnable(e,a){Va(this.hass,{automation_id:a,enabled:!e.target.checked}).catch(a=>Oa(a,e)).then()}addNotificationClick(){qe(0,"/alarmo/actions/new_notification",!0)}addActionClick(){qe(0,"/alarmo/actions/new_action",!0)}};Ot.styles=Pe,a([Z()],Ot.prototype,"hass",void 0),a([Z()],Ot.prototype,"narrow",void 0),a([Z()],Ot.prototype,"path",void 0),a([Z()],Ot.prototype,"alarmEntity",void 0),a([Z()],Ot.prototype,"automations",void 0),a([Z()],Ot.prototype,"areas",void 0),a([Z()],Ot.prototype,"notificationFilter",void 0),a([Z()],Ot.prototype,"automationFilter",void 0),a([Z()],Ot.prototype,"notificationFilterOptions",void 0),a([Z()],Ot.prototype,"automationFilterOptions",void 0),Ot=a([G("alarm-view-actions")],Ot),e.MyAlarmPanel=class extends re{async firstUpdated(){window.addEventListener("location-changed",()=>{this.requestUpdate()}),await Ne(),this.userConfig=await Da(this.hass),this.requestUpdate()}render(){if(!customElements.get("ha-app-layout")||!this.userConfig)return L`
        loading...
      `;const e=Object.values(this.userConfig).find(e=>e.name.toLowerCase()==this.hass.user.name.toLowerCase());return this.hass.user.is_admin||e&&e.is_admin?L`
        <ha-app-layout>
          <app-header fixed slot="header">
            <app-toolbar>
              <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}> </ha-menu-button>
              <div main-title>
                ${la("title",this.hass.language)}
              </div>
              <div class="version">
                v${"1.5.6"}
              </div>
            </app-toolbar>
            <ha-tabs
              scrollable
              attr-for-selected="page-name"
              .selected=${this.getPath()[2]||"general"}
              @iron-activate=${this.handlePageSelected}
            >
              <paper-tab page-name="general">
                ${la("panels.general.title",this.hass.language)}
              </paper-tab>
              <paper-tab page-name="sensors">
                ${la("panels.sensors.title",this.hass.language)}
              </paper-tab>
              <paper-tab page-name="codes">
                ${la("panels.codes.title",this.hass.language)}
              </paper-tab>
              <paper-tab page-name="actions">
                ${la("panels.actions.title",this.hass.language)}
              </paper-tab>
            </ha-tabs>
          </app-header>
        </ha-app-layout>
        <div class="view">
          ${this.getView()}
        </div>
      `:L`
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
                    You are logged in using HA user account <b>${this.hass.user.name}</b>. This account
                    <b>${this.hass.user.is_admin?"does":"does NOT"}</b> have administrator permission.
                  </li>
                </ul>
                <ul>
                  <li>
                    There is <b>${e?"a":"NO"}</b> user configured in Alarmo with name
                    <b>${this.hass.user.name}</b>.
                    ${e?`This user <b>${e.is_admin?"does":"does NOT"}</b> have administrator permission. `:""}
                  </li>
                </ul>
              </div>
            </ha-card>
          </div>
        </div>
      `}getPath(){return window.location.pathname.split("/")}getView(){const e=this.getPath(),a=e[2]||"general",t=e.slice(3);switch(a){case"general":return L`
          <alarm-view-general
            .hass=${this.hass}
            .narrow=${this.narrow}
            .path=${t.length?t:null}
          ></alarm-view-general>
        `;case"sensors":return L`
          <alarm-view-sensors .hass=${this.hass} .narrow=${this.narrow} .path=${t.length?t:null}>
          </alarm-view-sensors>
        `;case"codes":return L`
          <alarm-view-codes .hass=${this.hass} .narrow=${this.narrow} .path=${t.length?t:null}>
          </alarm-view-codes>
        `;case"actions":return L`
          <alarm-view-actions .hass=${this.hass} .narrow=${this.narrow} .path=${t.length?t:null}>
          </alarm-view-actions>
        `;default:return L`
          no view
        `}}handlePageSelected(e){const a=e.detail.item.getAttribute("page-name");a!==this.getPath()?(qe(0,"/alarmo/"+a),this.requestUpdate()):scrollTo(0,0)}static get styles(){return se`
      ${Pe}

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
    `}},a([Z()],e.MyAlarmPanel.prototype,"hass",void 0),a([Z({type:Boolean,reflect:!0})],e.MyAlarmPanel.prototype,"narrow",void 0),a([Z()],e.MyAlarmPanel.prototype,"userConfig",void 0),e.MyAlarmPanel=a([G("alarm-panel")],e.MyAlarmPanel)}({});
