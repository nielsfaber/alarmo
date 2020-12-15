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
    ***************************************************************************** */function t(e,t,s,a){var i,n=arguments.length,o=n<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,s):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,s,a);else for(var r=e.length-1;r>=0;r--)(i=e[r])&&(o=(n<3?i(o):n>3?i(t,s,o):i(t,s))||o);return n>3&&o&&Object.defineProperty(t,s,o),o
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
     */}const s="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,a=(e,t,s=null)=>{for(;t!==s;){const s=t.nextSibling;e.removeChild(t),t=s}},i=`{{lit-${String(Math.random()).slice(2)}}}`,n=`\x3c!--${i}--\x3e`,o=new RegExp(`${i}|${n}`);class r{constructor(e,t){this.parts=[],this.element=t;const s=[],a=[],n=document.createTreeWalker(t.content,133,null,!1);let r=0,l=-1,u=0;const{strings:p,values:{length:m}}=e;for(;u<m;){const e=n.nextNode();if(null!==e){if(l++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:s}=t;let a=0;for(let e=0;e<s;e++)d(t[e].name,"$lit$")&&a++;for(;a-- >0;){const t=p[u],s=h.exec(t)[2],a=s.toLowerCase()+"$lit$",i=e.getAttribute(a);e.removeAttribute(a);const n=i.split(o);this.parts.push({type:"attribute",index:l,name:s,strings:n}),u+=n.length-1}}"TEMPLATE"===e.tagName&&(a.push(e),n.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(i)>=0){const a=e.parentNode,i=t.split(o),n=i.length-1;for(let t=0;t<n;t++){let s,n=i[t];if(""===n)s=c();else{const e=h.exec(n);null!==e&&d(e[2],"$lit$")&&(n=n.slice(0,e.index)+e[1]+e[2].slice(0,-"$lit$".length)+e[3]),s=document.createTextNode(n)}a.insertBefore(s,e),this.parts.push({type:"node",index:++l})}""===i[n]?(a.insertBefore(c(),e),s.push(e)):e.data=i[n],u+=n}}else if(8===e.nodeType)if(e.data===i){const t=e.parentNode;null!==e.previousSibling&&l!==r||(l++,t.insertBefore(c(),e)),r=l,this.parts.push({type:"node",index:l}),null===e.nextSibling?e.data="":(s.push(e),l--),u++}else{let t=-1;for(;-1!==(t=e.data.indexOf(i,t+1));)this.parts.push({type:"node",index:-1}),u++}}else n.currentNode=a.pop()}for(const e of s)e.parentNode.removeChild(e)}}const d=(e,t)=>{const s=e.length-t.length;return s>=0&&e.slice(s)===t},l=e=>-1!==e.index,c=()=>document.createComment(""),h=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function u(e,t){const{element:{content:s},parts:a}=e,i=document.createTreeWalker(s,133,null,!1);let n=m(a),o=a[n],r=-1,d=0;const l=[];let c=null;for(;i.nextNode();){r++;const e=i.currentNode;for(e.previousSibling===c&&(c=null),t.has(e)&&(l.push(e),null===c&&(c=e)),null!==c&&d++;void 0!==o&&o.index===r;)o.index=null!==c?-1:o.index-d,n=m(a,n),o=a[n]}l.forEach(e=>e.parentNode.removeChild(e))}const p=e=>{let t=11===e.nodeType?0:1;const s=document.createTreeWalker(e,133,null,!1);for(;s.nextNode();)t++;return t},m=(e,t=-1)=>{for(let s=t+1;s<e.length;s++){const t=e[s];if(l(t))return s}return-1};
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
class w{constructor(e,t,s){this.__parts=[],this.template=e,this.processor=t,this.options=s}update(e){let t=0;for(const s of this.__parts)void 0!==s&&s.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=s?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],a=this.template.parts,i=document.createTreeWalker(e,133,null,!1);let n,o=0,r=0,d=i.nextNode();for(;o<a.length;)if(n=a[o],l(n)){for(;r<n.index;)r++,"TEMPLATE"===d.nodeName&&(t.push(d),i.currentNode=d.content),null===(d=i.nextNode())&&(i.currentNode=t.pop(),d=i.nextNode());if("node"===n.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(d.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(d,n.name,n.strings,this.options));o++}else this.__parts.push(void 0),o++;return s&&(document.adoptNode(e),customElements.upgrade(e)),e}}
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
     */const b=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),y=` ${i} `;class ${constructor(e,t,s,a){this.strings=e,this.values=t,this.type=s,this.processor=a}getHTML(){const e=this.strings.length-1;let t="",s=!1;for(let a=0;a<e;a++){const e=this.strings[a],o=e.lastIndexOf("\x3c!--");s=(o>-1||s)&&-1===e.indexOf("--\x3e",o+1);const r=h.exec(e);t+=null===r?e+(s?y:n):e.substr(0,r.index)+r[1]+r[2]+"$lit$"+r[3]+i}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==b&&(t=b.createHTML(t)),e.innerHTML=t,e}}
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
     */const k=e=>null===e||!("object"==typeof e||"function"==typeof e),S=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class x{constructor(e,t,s){this.dirty=!0,this.element=e,this.name=t,this.strings=s,this.parts=[];for(let e=0;e<s.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new A(this)}_getValue(){const e=this.strings,t=e.length-1,s=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=s[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!S(e))return e}let a="";for(let i=0;i<t;i++){a+=e[i];const t=s[i];if(void 0!==t){const e=t.value;if(k(e)||!S(e))a+="string"==typeof e?e:String(e);else for(const t of e)a+="string"==typeof t?t:String(t)}}return a+=e[t],a}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class A{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===_||k(e)&&e===this.value||(this.value=e,v(e)||(this.committer.dirty=!0))}commit(){for(;v(this.value);){const e=this.value;this.value=_,e(this)}this.value!==_&&this.committer.commit()}}class O{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(c()),this.endNode=e.appendChild(c())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=c()),e.__insert(this.endNode=c())}insertAfterPart(e){e.__insert(this.startNode=c()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;v(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=_,e(this)}const e=this.__pendingValue;e!==_&&(k(e)?e!==this.value&&this.__commitText(e):e instanceof $?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):S(e)?this.__commitIterable(e):e===f?(this.value=f,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,s="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=s:this.__commitNode(document.createTextNode(s)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof w&&this.value.template===t)this.value.update(e.values);else{const s=new w(t,e.processor,this.options),a=s._clone();s.update(e.values),this.__commitNode(a),this.value=s}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let s,a=0;for(const i of e)s=t[a],void 0===s&&(s=new O(this.options),t.push(s),0===a?s.appendIntoPart(this):s.insertAfterPart(t[a-1])),s.setValue(i),s.commit(),a++;a<t.length&&(t.length=a,this.clear(s&&s.endNode))}clear(e=this.startNode){a(this.startNode.parentNode,e.nextSibling,this.endNode)}}class M{constructor(e,t,s){if(this.value=void 0,this.__pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=s}setValue(e){this.__pendingValue=e}commit(){for(;v(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=_,e(this)}if(this.__pendingValue===_)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=_}}class C extends x{constructor(e,t,s){super(e,t,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new T(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class T extends A{}let j=!1;(()=>{try{const e={get capture(){return j=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class N{constructor(e,t,s){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=s,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;v(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=_,e(this)}if(this.__pendingValue===_)return;const e=this.__pendingValue,t=this.value,s=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),a=null!=e&&(null==t||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),a&&(this.__options=E(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=_}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const E=e=>e&&(j?{capture:e.capture,passive:e.passive,once:e.once}:e.capture)
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
     */;function P(e){let t=D.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},D.set(e.type,t));let s=t.stringsArray.get(e.strings);if(void 0!==s)return s;const a=e.strings.join(i);return s=t.keyString.get(a),void 0===s&&(s=new r(e,e.getTemplateElement()),t.keyString.set(a,s)),t.stringsArray.set(e.strings,s),s}const D=new Map,q=new WeakMap;
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
     */const R=new
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
class{handleAttributeExpressions(e,t,s,a){const i=t[0];if("."===i){return new C(e,t.slice(1),s).parts}if("@"===i)return[new N(e,t.slice(1),a.eventContext)];if("?"===i)return[new M(e,t.slice(1),s)];return new x(e,t,s).parts}handleTextExpression(e){return new O(e)}};
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
     */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const V=(e,...t)=>new $(e,t,"html",R)
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
     */,L=(e,t)=>`${e}--${t}`;let U=!0;void 0===window.ShadyCSS?U=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),U=!1);const H=e=>t=>{const s=L(t.type,e);let a=D.get(s);void 0===a&&(a={stringsArray:new WeakMap,keyString:new Map},D.set(s,a));let n=a.stringsArray.get(t.strings);if(void 0!==n)return n;const o=t.strings.join(i);if(n=a.keyString.get(o),void 0===n){const s=t.getTemplateElement();U&&window.ShadyCSS.prepareTemplateDom(s,e),n=new r(t,s),a.keyString.set(o,n)}return a.stringsArray.set(t.strings,n),n},z=["html","svg"],Y=new Set,I=(e,t,s)=>{Y.add(e);const a=s?s.element:document.createElement("template"),i=t.querySelectorAll("style"),{length:n}=i;if(0===n)return void window.ShadyCSS.prepareTemplateStyles(a,e);const o=document.createElement("style");for(let e=0;e<n;e++){const t=i[e];t.parentNode.removeChild(t),o.textContent+=t.textContent}(e=>{z.forEach(t=>{const s=D.get(L(t,e));void 0!==s&&s.keyString.forEach(e=>{const{element:{content:t}}=e,s=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{s.add(e)}),u(e,s)})})})(e);const r=a.content;s?function(e,t,s=null){const{element:{content:a},parts:i}=e;if(null==s)return void a.appendChild(t);const n=document.createTreeWalker(a,133,null,!1);let o=m(i),r=0,d=-1;for(;n.nextNode();){d++;for(n.currentNode===s&&(r=p(t),s.parentNode.insertBefore(t,s));-1!==o&&i[o].index===d;){if(r>0){for(;-1!==o;)i[o].index+=r,o=m(i,o);return}o=m(i,o)}}}(s,o,r.firstChild):r.insertBefore(o,r.firstChild),window.ShadyCSS.prepareTemplateStyles(a,e);const d=r.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==d)t.insertBefore(d.cloneNode(!0),t.firstChild);else if(s){r.insertBefore(o,r.firstChild);const e=new Set;e.add(o),u(s,e)}};window.JSCompiler_renameProperty=(e,t)=>e;const F={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},B=(e,t)=>t!==e&&(t==t||e==e),W={attribute:!0,type:String,converter:F,reflect:!1,hasChanged:B};class K extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach((t,s)=>{const a=this._attributeNameForProperty(s,t);void 0!==a&&(this._attributeToPropertyMap.set(a,s),e.push(a))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,t)=>this._classProperties.set(t,e))}}static createProperty(e,t=W){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const s="symbol"==typeof e?Symbol():"__"+e,a=this.getPropertyDescriptor(e,s,t);void 0!==a&&Object.defineProperty(this.prototype,e,a)}static getPropertyDescriptor(e,t,s){return{get(){return this[t]},set(a){const i=this[e];this[t]=a,this.requestUpdateInternal(e,i,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||W}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const s of t)this.createProperty(s,e[s])}}static _attributeNameForProperty(e,t){const s=t.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,s=B){return s(e,t)}static _propertyValueFromAttribute(e,t){const s=t.type,a=t.converter||F,i="function"==typeof a?a:a.fromAttribute;return i?i(e,s):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const s=t.type,a=t.converter;return(a&&a.toAttribute||F.toAttribute)(e,s)}initialize(){this._updateState=0,this._updatePromise=new Promise(e=>this._enableUpdatingResolver=e),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,s){t!==s&&this._attributeToProperty(e,s)}_propertyToAttribute(e,t,s=W){const a=this.constructor,i=a._attributeNameForProperty(e,s);if(void 0!==i){const e=a._propertyValueToAttribute(t,s);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(i):this.setAttribute(i,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const s=this.constructor,a=s._attributeToPropertyMap.get(e);if(void 0!==a){const e=s.getPropertyOptions(a);this._updateState=16|this._updateState,this[a]=s._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,s){let a=!0;if(void 0!==e){const i=this.constructor;s=s||i.getPropertyOptions(e),i._valueHasChanged(this[e],t,s.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==s.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,s))):a=!1}!this._hasRequestedUpdate&&a&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((e,t)=>this._propertyToAttribute(t,this[t],e)),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}K.finalized=!0;
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
const J=e=>t=>"function"==typeof t?((e,t)=>(window.customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:s,elements:a}=t;return{kind:s,elements:a,finisher(t){window.customElements.define(e,t)}}})(e,t),G=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?Object.assign(Object.assign({},t),{finisher(s){s.createProperty(t.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(s){s.createProperty(t.key,e)}};function Q(e){return(t,s)=>void 0!==s?((e,t,s)=>{t.constructor.createProperty(s,e)})(e,t,s):G(e,t)}function Z(e){return Q({attribute:!1,hasChanged:null==e?void 0:e.hasChanged})}const X=(e,t,s)=>{Object.defineProperty(t,s,e)},ee=(e,t)=>({kind:"method",placement:"prototype",key:t.key,descriptor:e})
/**
    @license
    Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
    This code may only be used under the BSD style license found at
    http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
    http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
    found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
    part of the polymer project is also subject to an additional IP rights grant
    found at http://polymer.github.io/PATENTS.txt
    */,te=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,se=Symbol();class ae{constructor(e,t){if(t!==se)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(te?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const ie=(e,...t)=>{const s=t.reduce((t,s,a)=>t+(e=>{if(e instanceof ae)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+e[a+1],e[0]);return new ae(s,se)};
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const ne={};class oe extends K{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,s)=>e.reduceRight((e,s)=>Array.isArray(s)?t(s,e):(e.add(s),e),s),s=t(e,new Set),a=[];s.forEach(e=>a.unshift(e)),this._styles=a}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map(e=>{if(e instanceof CSSStyleSheet&&!te){const t=Array.prototype.slice.call(e.cssRules).reduce((e,t)=>e+t.cssText,"");return new ae(String(t),se)}return e})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?te?this.renderRoot.adoptedStyleSheets=e.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==ne&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){return ne}}oe.finalized=!0,oe.render=(e,t,s)=>{if(!s||"object"!=typeof s||!s.scopeName)throw new Error("The `scopeName` option is required.");const i=s.scopeName,n=q.has(t),o=U&&11===t.nodeType&&!!t.host,r=o&&!Y.has(i),d=r?document.createDocumentFragment():t;if(((e,t,s)=>{let i=q.get(t);void 0===i&&(a(t,t.firstChild),q.set(t,i=new O(Object.assign({templateFactory:P},s))),i.appendInto(t)),i.setValue(e),i.commit()})(e,d,Object.assign({templateFactory:H(i)},s)),r){const e=q.get(d);q.delete(d);const s=e.value instanceof w?e.value.template:void 0;I(i,d,s),a(t,t.firstChild),t.appendChild(d),q.set(t,e)}!n&&o&&window.ShadyCSS.styleElement(t.host)};var re=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,de="[^\\s]+",le=/\[([^]*?)\]/gm;function ce(e,t){for(var s=[],a=0,i=e.length;a<i;a++)s.push(e[a].substr(0,t));return s}var he=function(e){return function(t,s){var a=s[e].map((function(e){return e.toLowerCase()})).indexOf(t.toLowerCase());return a>-1?a:null}};function ue(e){for(var t=[],s=1;s<arguments.length;s++)t[s-1]=arguments[s];for(var a=0,i=t;a<i.length;a++){var n=i[a];for(var o in n)e[o]=n[o]}return e}var pe=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],me=["January","February","March","April","May","June","July","August","September","October","November","December"],ge=ce(me,3),ve={dayNamesShort:ce(pe,3),dayNames:pe,monthNamesShort:ge,monthNames:me,amPm:["am","pm"],DoFn:function(e){return e+["th","st","nd","rd"][e%10>3?0:(e-e%10!=10?1:0)*e%10]}},_e=ue({},ve),fe=function(e,t){for(void 0===t&&(t=2),e=String(e);e.length<t;)e="0"+e;return e},we={D:function(e){return String(e.getDate())},DD:function(e){return fe(e.getDate())},Do:function(e,t){return t.DoFn(e.getDate())},d:function(e){return String(e.getDay())},dd:function(e){return fe(e.getDay())},ddd:function(e,t){return t.dayNamesShort[e.getDay()]},dddd:function(e,t){return t.dayNames[e.getDay()]},M:function(e){return String(e.getMonth()+1)},MM:function(e){return fe(e.getMonth()+1)},MMM:function(e,t){return t.monthNamesShort[e.getMonth()]},MMMM:function(e,t){return t.monthNames[e.getMonth()]},YY:function(e){return fe(String(e.getFullYear()),4).substr(2)},YYYY:function(e){return fe(e.getFullYear(),4)},h:function(e){return String(e.getHours()%12||12)},hh:function(e){return fe(e.getHours()%12||12)},H:function(e){return String(e.getHours())},HH:function(e){return fe(e.getHours())},m:function(e){return String(e.getMinutes())},mm:function(e){return fe(e.getMinutes())},s:function(e){return String(e.getSeconds())},ss:function(e){return fe(e.getSeconds())},S:function(e){return String(Math.round(e.getMilliseconds()/100))},SS:function(e){return fe(Math.round(e.getMilliseconds()/10),2)},SSS:function(e){return fe(e.getMilliseconds(),3)},a:function(e,t){return e.getHours()<12?t.amPm[0]:t.amPm[1]},A:function(e,t){return e.getHours()<12?t.amPm[0].toUpperCase():t.amPm[1].toUpperCase()},ZZ:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+fe(100*Math.floor(Math.abs(t)/60)+Math.abs(t)%60,4)},Z:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+fe(Math.floor(Math.abs(t)/60),2)+":"+fe(Math.abs(t)%60,2)}},be=function(e){return+e-1},ye=[null,"[1-9]\\d?"],$e=[null,de],ke=["isPm",de,function(e,t){var s=e.toLowerCase();return s===t.amPm[0]?0:s===t.amPm[1]?1:null}],Se=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(e){var t=(e+"").match(/([+-]|\d\d)/gi);if(t){var s=60*+t[1]+parseInt(t[2],10);return"+"===t[0]?s:-s}return 0}],xe=(he("monthNamesShort"),he("monthNames"),{default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",isoDate:"YYYY-MM-DD",isoDateTime:"YYYY-MM-DDTHH:mm:ssZ",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"});var Ae=function(e,t,s){if(void 0===t&&(t=xe.default),void 0===s&&(s={}),"number"==typeof e&&(e=new Date(e)),"[object Date]"!==Object.prototype.toString.call(e)||isNaN(e.getTime()))throw new Error("Invalid Date pass to format");var a=[];t=(t=xe[t]||t).replace(le,(function(e,t){return a.push(t),"@@@"}));var i=ue(ue({},_e),s);return(t=t.replace(re,(function(t){return we[t](e,i)}))).replace(/@@@/g,(function(){return a.shift()}))};(function(){try{(new Date).toLocaleDateString("i")}catch(e){return"RangeError"===e.name}})(),function(){try{(new Date).toLocaleString("i")}catch(e){return"RangeError"===e.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(e){return"RangeError"===e.name}}();function Oe(e){return e.substr(0,e.indexOf("."))}function Me(e){return e.substr(e.indexOf(".")+1)}var Ce="hass:bookmark",Te=function(e,t,s,a){a=a||{},s=null==s?{}:s;var i=new Event(t,{bubbles:void 0===a.bubbles||a.bubbles,cancelable:Boolean(a.cancelable),composed:void 0===a.composed||a.composed});return i.detail=s,e.dispatchEvent(i),i},je={alert:"hass:alert",automation:"hass:playlist-play",calendar:"hass:calendar",camera:"hass:video",climate:"hass:thermostat",configurator:"hass:settings",conversation:"hass:text-to-speech",device_tracker:"hass:account",fan:"hass:fan",group:"hass:google-circles-communities",history_graph:"hass:chart-line",homeassistant:"hass:home-assistant",homekit:"hass:home-automation",image_processing:"hass:image-filter-frames",input_boolean:"hass:drawing",input_datetime:"hass:calendar-clock",input_number:"hass:ray-vertex",input_select:"hass:format-list-bulleted",input_text:"hass:textbox",light:"hass:lightbulb",mailbox:"hass:mailbox",notify:"hass:comment-alert",person:"hass:account",plant:"hass:flower",proximity:"hass:apple-safari",remote:"hass:remote",scene:"hass:google-pages",script:"hass:file-document",sensor:"hass:eye",simple_alarm:"hass:bell",sun:"hass:white-balance-sunny",switch:"hass:flash",timer:"hass:timer",updater:"hass:cloud-upload",vacuum:"hass:robot-vacuum",water_heater:"hass:thermometer",weblink:"hass:open-in-new"};function Ne(e,t){if(e in je)return je[e];switch(e){case"alarm_control_panel":switch(t){case"armed_home":return"hass:bell-plus";case"armed_night":return"hass:bell-sleep";case"disarmed":return"hass:bell-outline";case"triggered":return"hass:bell-ring";default:return"hass:bell"}case"binary_sensor":return t&&"off"===t?"hass:radiobox-blank":"hass:checkbox-marked-circle";case"cover":return"closed"===t?"hass:window-closed":"hass:window-open";case"lock":return t&&"unlocked"===t?"hass:lock-open":"hass:lock";case"media_player":return t&&"off"!==t&&"idle"!==t?"hass:cast-connected":"hass:cast";case"zwave":switch(t){case"dead":return"hass:emoticon-dead";case"sleeping":return"hass:sleep";case"initializing":return"hass:timer-sand";default:return"hass:z-wave"}default:return console.warn("Unable to find icon for domain "+e+" ("+t+")"),Ce}}var Ee=function(e,t,s){void 0===s&&(s=!1),s?history.replaceState(null,"",t):history.pushState(null,"",t),Te(window,"location-changed",{replace:s})},Pe={humidity:"hass:water-percent",illuminance:"hass:brightness-5",temperature:"hass:thermometer",pressure:"hass:gauge",power:"hass:flash",signal_strength:"hass:wifi"},De={binary_sensor:function(e){var t=e.state&&"off"===e.state;switch(e.attributes.device_class){case"battery":return t?"hass:battery":"hass:battery-outline";case"cold":return t?"hass:thermometer":"hass:snowflake";case"connectivity":return t?"hass:server-network-off":"hass:server-network";case"door":return t?"hass:door-closed":"hass:door-open";case"garage_door":return t?"hass:garage":"hass:garage-open";case"gas":case"power":case"problem":case"safety":case"smoke":return t?"hass:shield-check":"hass:alert";case"heat":return t?"hass:thermometer":"hass:fire";case"light":return t?"hass:brightness-5":"hass:brightness-7";case"lock":return t?"hass:lock":"hass:lock-open";case"moisture":return t?"hass:water-off":"hass:water";case"motion":return t?"hass:walk":"hass:run";case"occupancy":return t?"hass:home-outline":"hass:home";case"opening":return t?"hass:square":"hass:square-outline";case"plug":return t?"hass:power-plug-off":"hass:power-plug";case"presence":return t?"hass:home-outline":"hass:home";case"sound":return t?"hass:music-note-off":"hass:music-note";case"vibration":return t?"hass:crop-portrait":"hass:vibrate";case"window":return t?"hass:window-closed":"hass:window-open";default:return t?"hass:radiobox-blank":"hass:checkbox-marked-circle"}},cover:function(e){var t="closed"!==e.state;switch(e.attributes.device_class){case"garage":return t?"hass:garage-open":"hass:garage";case"door":return t?"hass:door-open":"hass:door-closed";case"shutter":return t?"hass:window-shutter-open":"hass:window-shutter";case"blind":return t?"hass:blinds-open":"hass:blinds";case"window":return t?"hass:window-open":"hass:window-closed";default:return Ne("cover",e.state)}},sensor:function(e){var t=e.attributes.device_class;if(t&&t in Pe)return Pe[t];if("battery"===t){var s=Number(e.state);if(isNaN(s))return"hass:battery-unknown";var a=10*Math.round(s/10);return a>=100?"hass:battery":a<=0?"hass:battery-alert":"hass:battery-"+a}var i=e.attributes.unit_of_measurement;return"°C"===i||"°F"===i?"hass:thermometer":Ne("sensor")},input_datetime:function(e){return e.attributes.has_date?e.attributes.has_time?Ne("input_datetime"):"hass:calendar":"hass:clock"}};const qe=async()=>{if(customElements.get("ha-checkbox")&&customElements.get("ha-slider"))return;await customElements.whenDefined("partial-panel-resolver");const e=document.createElement("partial-panel-resolver");e.hass={panels:[{url_path:"tmp",component_name:"config"}]},e._updateRoutes(),await e.routerOptions.routes.tmp.load(),await customElements.whenDefined("ha-panel-config");const t=document.createElement("ha-panel-config");await t.routerOptions.routes.automation.load(),e.hass={panels:[{url_path:"tmp",component_name:"developer-tools"}]},e._updateRoutes(),await e.routerOptions.routes.tmp.load(),await customElements.whenDefined("ha-app-layout")};var Re,Ve,Le,Ue;!function(e){e.ArmedAway="armed_away",e.ArmedHome="armed_home",e.ArmedNight="armed_night",e.ArmedCustom="armed_custom_bypass"}(Re||(Re={})),function(e){e.Disarmed="disarmed",e.Armed="armed",e.Triggered="triggered",e.Pending="pending",e.Arming="arming"}(Ve||(Ve={})),function(e){e.ArmFailure="arm_failure"}(Le||(Le={})),function(e){e.Door="door",e.Window="window",e.Motion="motion",e.Tamper="tamper",e.Environmental="environmental",e.Other="other"}(Ue||(Ue={}));const He=ie`
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

  a { 
    color: var(--primary-color);
  }
  mwc-button ha-icon {
    padding-right: 11px;
  }
`;var ze={modes_long:{armed_away:"Armed Away",armed_home:"Armed Home",armed_night:"Armed Night",armed_custom_bypass:"Armed Custom"},modes_short:{armed_away:"Away",armed_home:"Home",armed_night:"Night",armed_custom_bypass:"Custom"}},Ye={time_slider:{seconds:"sec",minutes:"min",infinite:"infinite",none:"none"},editor:{ui_mode:"Switch to UI",yaml_mode:"Switch to YAML"}},Ie={general:{cards:{general:{title:"General settings",description:"This panel defines some settings that apply to all arm modes.",fields:{trigger_time:{heading:"Trigger time",description:"Time during which the siren will sound"},disarm_after_trigger:{heading:"Disarm after trigger",description:"After trigger time has expired, disarm the alarm instead of returning to armed state."},enable_mqtt:{heading:"Enable MQTT",description:"Allow the alarm panel to be controlled through MQTT."}},actions:{setup_mqtt:"MQTT Configuration"}},common:{fields:{leave_time:{heading:"Exit delay",description:"When arming the alarm, within this time period the sensors will not trigger the alarm yet."},entry_time:{heading:"Entry delay",description:"Delay time until the alarm is triggered after one of the sensors is activated."}}},armed_away:{description:"Armed away will be used when all people left the house. All doors and windows allowing access to the house will be guarded, as well as motion sensors inside the house."},armed_home:{description:"Armed home (also known as armed stay) will be used when setting the alarm while people are in the house. All doors and windows allowing access to the house will be guarded, but not motion sensors inside the house."},armed_night:{description:"Armed night will be used when setting the alarm before going to sleep. All doors and windows allowing access to the house will be guarded, and selected motion sensors (downstairs) in the house."},armed_custom:{description:"An extra mode for defining your own security perimeter."},mqtt:{title:"MQTT configuration",description:"This panel can be used for configuration of the MQTT interface.",fields:{state_topic:{heading:"State topic",description:"Topic on which state updates are published"},command_topic:{heading:"Command topic",description:"Topic on which arm/disarm commands are sent."},require_code:{heading:"Require code",description:"Require the code to be sent with the command."},state_payload:{heading:"Configure payload per state",item:"Define a payload for state '{state}'"},command_payload:{heading:"Configure payload per command",item:"Define a payload for command '{command}'"}}}}},sensors:{cards:{sensors:{title:"Sensors",description:"Currently configured sensors. Click on an entity to make changes.",no_items:"There are no sensors added to the alarm yet. Make sure to add them first.",table:{arm_modes:"Arm Modes",always_on:"(Always)"}},add_sensors:{title:"Add Sensors",description:"Add more sensors. Make sure that your sensors have a friendly_name, so you can identify them.",no_items:"There are no available HA entities that can be configured for the alarm. Make sure to include entities of the type binary_sensor.",actions:{add_to_alarm:"add to alarm",show_all:"Show all"}},editor:{title:"Edit Sensor",description:"Configuring the sensor settings of '{entity}'.",fields:{name:{heading:"Name",description:"Overwrite friendly name."},device_type:{heading:"Device Type",description:"Choose a device type to automatically apply appropriate settings.",choose:{door:{name:"Door",description:"A door, gate or other entrance that is used for entering/leaving the home."},window:{name:"Window",description:"A window, or a door not used for entering the house such as balcony."},motion:{name:"Motion",description:"Presence sensor or similar device having a delay between activations."},tamper:{name:"Tamper",description:"Detector of sensor cover removal, glass break sensor, etc."},environmental:{name:"Environmental",description:"Smoke/gas sensor, leak detector, etc. (not related to burglar protection)."}}},always_on:{heading:"Always on",description:"Sensor should always trigger the alarm."},modes:{heading:"Enabled modes",description:"Alarm modes in which this sensor is active."},arm_on_close:{heading:"Arm after closing",description:"After deactivation of this sensor, the remaining exit delay will automatically be skipped."},immediate:{heading:"Immediate",description:"Activating this sensor will trigger the alarm directly instead of after entry delay."},allow_open:{heading:"Allow open while arming",description:"Allow this sensor to be active shortly after leaving such that it will not block arming."},trigger_unavailable:{heading:"Trigger when unavailable",description:"When the sensor state becomes 'unavailable', this will activate the sensor."}},actions:{toggle_advanced:"Advanced settings"}}}},codes:{cards:{codes:{title:"Codes",description:"Change settings for the code.",fields:{code_arm_required:{heading:"Use arm code",description:"Require a code for arming the alarm"},code_disarm_required:{heading:"Use disarm code",description:"Require a code for disarming the alarm"},code_format:{heading:"Code format",description:"Sets the input type for Lovelace alarm card.",code_format_number:"pincode",code_format_text:"password"}}},user_management:{title:"User management",description:"Each user has its own code to arm/disarm the alarm.",no_items:"There are no users yet",table:{remarks:"Remarks",administrator:"Administrator"},actions:{new_user:"new user"}},new_user:{title:"Create new user",description:"Users can be created for providing access to operating the alarm.",fields:{name:{heading:"Name",description:"Name of the user."},code:{heading:"Code",description:"Code for this user."},confirm_code:{heading:"Confirm code",description:"Repeat the code."},is_admin:{heading:"User is administrator",description:"Allow user to make changes"},can_arm:{heading:"Allow code for arming",description:"Entering this code activates the alarm"},can_disarm:{heading:"Allow code for disarming",description:"Entering this code deactivates the alarm"},is_override_code:{heading:"Is override code",description:"Entering this code will arm the alarm in force"}},errors:{no_name:"No name provided.",no_code:"Code should have 4 characters/numbers minimum.",code_mismatch:"The codes don't match."}},edit_user:{title:"Edit User",description:"Change configuration for user '{name}'.",fields:{old_code:{heading:"Current code",description:"Current code, leave empty to leave unchanged."}}}}},actions:{cards:{notifications:{title:"Notifications",description:"Using this panel, you can manage notifications to be sent when during a certain alarm event",table:{enabled:"Enabled",no_items:"There are no notifications created yet."},actions:{new_notification:"new notification"}},actions:{title:"Actions",description:"This panel is still in development. It will be used for switching devices.",table:{no_items:"There are no actions created yet."},actions:{new_action:"new action"}},new_notification:{title:"Create notification",description:"Create a new notification.",fields:{name:{heading:"Name",description:"Description for this notification"},event:{heading:"Event",description:"When should the notification be sent"},mode:{heading:"Mode",description:"Limit the action to specific arm modes (optional)"},title:{heading:"Title",description:"Title for the notification message"},message:{heading:"Message",description:"Content of the notification message"},target:{heading:"Target",description:"Device to send the push message to"}}},new_action:{title:"Create action",description:"This panel can be used to switch a device when the alarm state changes.",fields:{name:{heading:"Name",description:"Description for this action"},event:{heading:"Event",description:"When should the action be executed"},mode:{heading:"Mode",description:"Limit the action to specific arm modes (optional)"},entity:{heading:"Entity",description:"Entity to perform action on"},action:{heading:"Action",description:"Action to perform on the entity",turn_on:"Turn on",turn_off:"Turn off"}}}},validation_errors:{no_triggers:"No state or event provided for the triggering of this automation.",empty_trigger:"One of the triggers has no state or event provided.",invalid_trigger:"One of the triggers has an invalid value: {trigger}",invalid_mode:"Invalid input provided for 'mode': {mode}",no_actions:"No actions are provided to be performed by this automation.",no_service:"One of the actions is missing a service.",invalid_service:"An invalid service name was provided for one of the actions: {service}",no_service_data:"No service data was provided for one of the actions.",no_entity_in_service_data:"No entity_id was provided in the service_data of one of the actions.",no_message_in_service_data:"No message was provided in the service_data of one of the actions."}}},Fe={common:ze,components:Ye,panels:Ie},Be={modes_long:{armed_away:"Valvestatud eemal",armed_home:"Valvestatud kodus",armed_night:"Valvestatud ööseks",armed_custom_bypass:"Valikuline valvestus"},modes_short:{armed_away:"Eemal",armed_home:"Kodus",armed_night:"Ööseks",armed_custom_bypass:"Valikuline"}},We={time_slider:{seconds:"sek",minutes:"min",infinite:"piiranguta",none:"puudub"},editor:{ui_mode:"Kasutajaliides",yaml_mode:"Koodiredaktor"}},Ke={general:{cards:{general:{title:"Üldsätted",description:"Need seaded kehtivad kõikides valve olekutes.",fields:{trigger_time:{heading:"Häire kestus",description:"Sireeni jne. aktiveerimise kestus."},disarm_after_trigger:{heading:"Häire summutamine",description:"Peale häire lõppu võta valvest maha miite ära valvesta uuesti."},enable_mqtt:{heading:"Luba MQTT juhtimine",description:"Luba nupustiku juhtimist MQTT abil."}},actions:{setup_mqtt:"MQTT seadistamine"}},common:{fields:{leave_time:{heading:"Ooteaeg valvestamisel",description:"Viivitus enne valvestamise rakendumist."},entry_time:{heading:"Sisenemise viivitus",description:"Viivitus sisenemisel enne häire rakendumist."}}},armed_away:{description:"Täielik valvestamine kui kedagi pole kodus. Kasutusel on kõik andurid."},armed_home:{description:"Valvestatud kodus ei kasuta liikumisandureid kuid väisuksed ja aknad on valve all."},armed_night:{description:"Valvestatud ööseks ei kasuta määratud liikumisandureid, välisperimeeter on valve all."},armed_custom:{description:"Valikulise valvestuse puhul saab määrata kasutatavad andurid."},mqtt:{title:"MQTT sätted",description:"MQTT parameetrite seadistamine.",fields:{state_topic:{heading:"Oleku teema (topic)",description:"Teema milles avaldatakse oleku muutused."},command_topic:{heading:"Käskude teema (topic)",description:"Teema milles avaldatakse valvestamise käsud."},require_code:{heading:"Nõua PIN koodi",description:"Käskude edastamiseks on vajalik PIN kood."},state_payload:{heading:"Määra olekute toimeandmed",item:"Määra oleku '{state}' toimeandmed"},command_payload:{heading:"Määra käskude toimeandmed",item:"Määra käsu '{command}' toimeandmed"}}}}},sensors:{cards:{sensors:{title:"Andurid",description:"Kasutusel olevad andurid. Klõpsa olemil, et seadistada.",no_items:"Andureid pole lisatud. Alustuseks lisa mõni andur.",table:{arm_modes:"Valvestamise olek",always_on:"(alati)"}},add_sensors:{title:"Andurite lisamine",description:"Lisa veel andureid. Mõistlik on panna neile arusaadav nimi (friendly_name).",no_items:"Puuduvad valvestamiseks sobivad Home Assistanti olemid. Lisatavad olemid peavad olema olekuandurid (binary_sensor).",actions:{add_to_alarm:"Lisa valvesüsteemile",show_all:"Kuva kõik andurid"}},editor:{title:"Andurite sätted",description:"Muuda olemi '{entity}' sätteid.",fields:{name:{heading:"Nimi",description:"Muuda kuvatavat nime."},always_on:{heading:"Alati kasutusel",description:"Andur käivitab häire igas valve olekus."},modes:{heading:"Valve olekute valik",description:"Valve olekud kus seda andurit kasutatakse."},immediate:{heading:"Viivituseta",description:"Andur annab häire ilma viiteta."},allow_open:{heading:"Lahkumisviivitus",description:"See andur ei aktiveeru enne lahkumisviivituse lõppu."},trigger_unavailable:{heading:"Andurite saadavus",description:"Käivita häire kui andur muutub kättesaamatuks."}}}}},codes:{cards:{codes:{title:"Koodid",description:"Valvestuskoodide muutmine.",fields:{code_arm_required:{heading:"Valvestamine koodiga",description:"Valvestamiseks tuleb sisestada kood"},code_disarm_required:{heading:"Valvest vabastamise kood",description:"Valvest vabastamiseks tulem sisestada kood"},code_format:{heading:"Koodi vorming",description:"Kasutajaliidese koodi tüübid.",code_format_number:"PIN kood",code_format_text:"Salasõna"}}},user_management:{title:"Kasutajate haldus",description:"Igal kasutajal on oma juhtkood.",no_items:"Kasutajaid pole määratud",table:{remarks:"Märkused",administrator:"Haldaja"},actions:{new_user:"Uus kasutaja"}},new_user:{title:"Lisa uus kasutaja",description:"Valvesüsteemi kasutaja lisamine.",fields:{name:{heading:"Nimi",description:"Kasutaja nimi."},code:{heading:"Valvestuskood",description:"Selle kasutaja kood."},confirm_code:{heading:"Koodi kinnitamine",description:"Sisesta sama kood uuesti."},is_admin:{heading:"Kasutajal on haldusõigused",description:"Kasutaja saab teha muudatusi."},can_arm:{heading:"Tohib valvestada",description:"Koodi sisestamine valvestab."},can_disarm:{heading:"Tohib valvest maha võtta",description:"Koodi sisestamine võtab valvest maha."},is_override_code:{heading:"Alistuskood",description:"Koodi sisestamine käivitab kohese häire"}},errors:{no_name:"Nimi puudub.",no_code:"Kood peab olema vhemalt 4 tärki.",code_mismatch:"Sisestatud koodid ei klapi."}},edit_user:{title:"Muuda kasutaja sätteid",description:"Muuda kasutaja '{name}' sätteid.",fields:{old_code:{heading:"Kehtiv kood",description:"Kehtiv kood, jäta tühjaks kui ei taha muuta."}}}}},actions:{cards:{notifications:{title:"Teavitused",description:"Halda saadetavaid teavitusi",table:{enabled:"Lubatud",no_items:"Teavitusi pole veel loodud."},actions:{new_notification:"Uus teavitus"}},actions:{title:"Toimingud",description:"Arenduses, mõeldud seadmete lülitamiseks.",table:{no_items:"Toiminguid pole veel määratud."},actions:{new_action:"Uus toiming"}},new_notification:{title:"Loo teavitus",description:"Uue teavituse loomine.",fields:{name:{heading:"Nimi",description:"Teavituse kirjeldus"},event:{heading:"Sündmus",description:"Mille puhul teavitada"},mode:{heading:"Olek",description:"Millises valve olekus teavitada (valikuline)"},title:{heading:"Päis",description:"Teavitussõnumi päis"},message:{heading:"Sisu",description:"Teavitussõnumi tekst"},target:{heading:"Saaja",description:"Seade millele edastada teavitus"}}},new_action:{title:"Loo toiming",description:"Seadme oleku muutmine valve oleku muutmisel.",fields:{name:{heading:"Nimi",description:"Toimingu kirjeldus"},event:{heading:"Sündmus",description:"Millisel juhul käivitada toiming"},mode:{heading:"Olek",description:"Millises valve olekus toiming käivitada (valikuline)"},entity:{heading:"Olem",description:"Toimingu olem"},action:{heading:"Toiming",description:"Olemi toiming",turn_on:"Lülita sisse",turn_off:"Lülita välja"}}}},validation_errors:{no_triggers:"Selle tegevuse käivitamiseks puudub vajalik olek või sündmus.",empty_trigger:"Ühel päästikul puudub oleku või sündmuse tingimus.",invalid_trigger:"Ühel päästikul: {trigger} on vigane väärtus",invalid_mode:"Valve olekule: {mode} on sisestatud vigane väärtus",no_actions:"Sellele toimingule pole määratud tegevust.",no_service:"Ühel toimingutest puudub nõutav teenus.",invalid_service:"Ühele toimingule on omistatud sobimatu teenus: {service}",no_service_data:"Ühel toimingul puuduvad teenuse andmed.",no_entity_in_service_data:"Ühel toimingul puudub teenuse andmetes olemi ID.",no_message_in_service_data:"Ühe toimingu teenuse andmetes puuduvad teenuse andmed."}}},Je={common:Be,components:We,panels:Ke},Ge={en:Object.freeze({__proto__:null,common:ze,components:Ye,panels:Ie,default:Fe}),et:Object.freeze({__proto__:null,common:Be,components:We,panels:Ke,default:Je})};function Qe(e,t,s="",a=""){const i=t.replace(/['"]+/g,"").replace("-","_");var n;try{n=e.split(".").reduce((e,t)=>e[t],Ge[i])}catch(t){n=e.split(".").reduce((e,t)=>e[t],Ge.en)}return void 0===n&&(n=e.split(".").reduce((e,t)=>e[t],Ge.en)),""!==s&&""!==a&&(n=n.replace(s,a)),n}let Ze=class extends oe{constructor(){super(...arguments),this.min=0,this.max=100,this.step=10,this.value=0,this.scaleFactor=1,this.unit="",this.disabled=!1}firstUpdated(){"min"==this.unit&&(this.scaleFactor=1/60),"min"==this.unit&&(this.step=1)}render(){return V`
      <div class="container">
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
    `}getValue(){let e=Number(Math.round(this.value*this.scaleFactor));return!e&&this.zeroValue?this.zeroValue:`${e} ${this.getUnit()}`}getUnit(){switch(this.unit){case"sec":return Qe("components.time_slider.seconds",this.hass.language);case"min":return Qe("components.time_slider.minutes",this.hass.language);default:return""}}getSlider(){return V`
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
      grid-template-columns: 1fr 60px;
      grid-template-rows: min-content;
      grid-template-areas: 'slider value';
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
  `,t([Q({type:Number})],Ze.prototype,"min",void 0),t([Q({type:Number})],Ze.prototype,"max",void 0),t([Q({type:Number})],Ze.prototype,"step",void 0),t([Q({type:Number})],Ze.prototype,"value",void 0),t([Q()],Ze.prototype,"scaleFactor",void 0),t([Q({type:String})],Ze.prototype,"unit",void 0),t([Q({type:Boolean})],Ze.prototype,"disabled",void 0),t([Q({type:String})],Ze.prototype,"zeroValue",void 0),Ze=t([J("time-slider")],Ze);const Xe=e=>e.callWS({type:"alarmo/config"}),et=e=>e.callWS({type:"alarmo/sensors"}),tt=e=>e.callWS({type:"alarmo/users"}),st=e=>e.callWS({type:"alarmo/automations"}),at=(e,t)=>e.callApi("POST","alarmo/config",t),it=(e,t)=>e.callApi("POST","alarmo/mode",t),nt=(e,t)=>e.callApi("POST","alarmo/sensors",t),ot=(e,t)=>e.callApi("POST","alarmo/users",t),rt=(e,t)=>e.callApi("POST","alarmo/automations",t),dt=(e,t)=>e.callApi("POST","alarmo/automations",{automation_id:t,remove:!0});let lt=class extends oe{constructor(){super(...arguments),this.enabled=!1,this.leave_time=0,this.entry_time=0}firstUpdated(){this.config&&(this.enabled=this.config.enabled,this.leave_time=this.config.leave_time,this.entry_time=this.config.entry_time)}render(){return this.hass?V`
        <ha-card
        >
          <div class="card-header">
            <div class="name">
              <slot name="heading"></slot>
            </div>
            <ha-switch
              ?disabled=${this.mode==Re.ArmedAway}
              ?checked=${this.enabled}
              @change=${this.toggleEnable}
            >
            </ha-switch>
          </div>
          <div class="card-content">
              <slot name="description"></slot>
          </div>

          ${this.enabled?V`
          <settings-row .narrow=${this.narrow}>
            <span slot="heading">${Qe("panels.general.cards.common.fields.leave_time.heading",this.hass.language)}</span>
            <span slot="description">${Qe("panels.general.cards.common.fields.leave_time.description",this.hass.language)}</span>
            <time-slider
              .hass=${this.hass}
              ?disabled=${!this.enabled}
              unit="sec"
              max="180"
              zeroValue=${Qe("components.time_slider.none",this.hass.language)}
              value=${this.leave_time}
              @change=${e=>{this.leave_time=Number(e.target.value)}}
            >
            </time-slider>
          </settings-row>

          <settings-row .narrow=${this.narrow}>
            <span slot="heading">${Qe("panels.general.cards.common.fields.entry_time.heading",this.hass.language)}</span>
            <span slot="description">${Qe("panels.general.cards.common.fields.entry_time.description",this.hass.language)}</span>
            <time-slider
              .hass=${this.hass}
              ?disabled=${!this.enabled}
              unit="sec"
              max="180"
              zeroValue=${Qe("components.time_slider.none",this.hass.language)}
              value=${this.entry_time}
              @change=${e=>{this.entry_time=Number(e.target.value)}}
            >
            </time-slider>
          </settings-row>
          `:""}
          <div class="card-actions">
            <mwc-button ?disabled=${!this.enabled} @click=${this.saveClick}>
              ${this.hass.localize("ui.common.save")}
            </mwc-button>
          </div>
        </ha-card>
    `:V``}toggleEnable(e){this.hass&&this.mode&&(this.enabled=e.target.checked,it(this.hass,{mode:this.mode,enabled:this.enabled}).catch(()=>{}).then(()=>{}))}saveClick(){this.hass&&this.mode&&it(this.hass,{mode:this.mode,leave_time:this.leave_time,entry_time:this.entry_time}).catch(()=>{}).then(()=>{})}};lt.styles=He,t([Q()],lt.prototype,"hass",void 0),t([Q()],lt.prototype,"narrow",void 0),t([Q({type:String})],lt.prototype,"mode",void 0),t([Q({type:Object})],lt.prototype,"config",void 0),t([Q()],lt.prototype,"enabled",void 0),t([Q()],lt.prototype,"leave_time",void 0),t([Q()],lt.prototype,"entry_time",void 0),lt=t([J("alarm-mode-card")],lt);let ct=class extends oe{constructor(){super(...arguments),this.threeLine=!1}render(){return V`
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
    `}};t([Q({type:Boolean,reflect:!0})],ct.prototype,"narrow",void 0),t([Q({type:Boolean,reflect:!0})],ct.prototype,"large",void 0),t([Q({type:Boolean,attribute:"three-line"})],ct.prototype,"threeLine",void 0),ct=t([J("settings-row")],ct);let ht=class extends oe{constructor(){super(...arguments),this.header="",this.open=!1}render(){return V`
      ${this.open?V`
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
        `:V`
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
    `}};t([Q({type:Boolean,reflect:!0})],ht.prototype,"narrow",void 0),t([Q()],ht.prototype,"header",void 0),t([Q()],ht.prototype,"open",void 0),ht=t([J("collapsible-section")],ht);const ut=e=>{class s extends e{connectedCallback(){super.connectedCallback(),this.__checkSubscribed()}disconnectedCallback(){if(super.disconnectedCallback(),this.__unsubs){for(;this.__unsubs.length;){const e=this.__unsubs.pop();e instanceof Promise?e.then(e=>e()):e()}this.__unsubs=void 0}}updated(e){super.updated(e),e.has("hass")&&this.__checkSubscribed()}hassSubscribe(){return[]}__checkSubscribed(){void 0===this.__unsubs&&this.isConnected&&void 0!==this.hass&&(this.__unsubs=this.hassSubscribe())}}return t([Q({attribute:!1})],s.prototype,"hass",void 0),s};var pt,mt;function gt(e){return function(e){if(!e)return Ce;if(e.attributes.icon)return e.attributes.icon;var t=Oe(e.entity_id);return t in De?De[t](e):Ne(t,e.state)}(e)}function vt(e){return(e=e.replace("_"," ")).charAt(0).toUpperCase()+e.slice(1)}function _t(e){return e?e.attributes&&e.attributes.friendly_name?e.attributes.friendly_name:String(e.entity_id.split(".").pop()):"(unrecognized entity)"}function ft(e){return e.filter((e,t,s)=>s.indexOf(e)===t)}function wt(e,t){return e?Object.entries(e).filter(([e])=>t.includes(e)).reduce((e,[t,s])=>Object.assign(e,{[t]:s}),{}):{}}function bt(e,t){return e?Object.entries(e).filter(([e])=>!t.includes(e)).reduce((e,[t,s])=>Object.assign(e,{[t]:s}),{}):{}}function yt(e,t){const s=e.target;Te(s,"show-dialog",{dialogTag:"error-dialog",dialogImport:()=>Promise.resolve().then((function(){return Mt})),dialogParams:{error:t}})}function $t(e,t){yt(t,V`
    <b>Something went wrong!</b><br>
    ${e.body.message}<br><br>
    ${e.error}<br><br>
    Please <a href="https://github.com/nielsfaber/alarmo/issues">report</a> the bug.
  `)}!function(e){e.STATE_ALARM_DISARMED="disarmed",e.STATE_ALARM_ARMED_HOME="armed_home",e.STATE_ALARM_ARMED_AWAY="armed_away",e.STATE_ALARM_ARMED_NIGHT="armed_night",e.STATE_ALARM_ARMED_CUSTOM_BYPASS="armed_custom_bypass",e.STATE_ALARM_PENDING="pending",e.STATE_ALARM_ARMING="arming",e.STATE_ALARM_DISARMING="disarming",e.STATE_ALARM_TRIGGERED="triggered"}(pt||(pt={})),function(e){e.COMMAND_ALARM_DISARM="disarm",e.COMMAND_ALARM_ARM_HOME="arm_home",e.COMMAND_ALARM_ARM_AWAY="arm_away",e.COMMAND_ALARM_ARM_NIGHT="arm_night",e.COMMAND_ALARM_ARM_CUSTOM_BYPASS="arm_custom_bypass"}(mt||(mt={}));const kt=(e,t)=>{if(!e)return!1;switch(e){case pt.STATE_ALARM_ARMED_AWAY:return t.modes[Re.ArmedAway].enabled;case pt.STATE_ALARM_ARMED_HOME:return t.modes[Re.ArmedHome].enabled;case pt.STATE_ALARM_ARMED_NIGHT:return t.modes[Re.ArmedNight].enabled;case pt.STATE_ALARM_ARMED_CUSTOM_BYPASS:return t.modes[Re.ArmedCustom].enabled;default:return!0}};function St(e,t){return Object.entries(t).forEach(([t,s])=>{e=t in e&&"object"==typeof e[t]&&null!==e[t]?Object.assign(Object.assign({},e),{[t]:St(e[t],s)}):Object.assign(Object.assign({},e),{[t]:s})}),e}let xt=class extends(ut(oe)){hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeEvents(()=>this._fetchData(),"alarmo_updated")]}async _fetchData(){if(!this.hass)return;const e=await Xe(this.hass);this.config=e,this.selection=bt(e.mqtt,["availability_topic"])}firstUpdated(){(async()=>{await qe()})()}render(){return this.hass&&this.selection?V`
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
          ${Object.values(pt).filter(e=>kt(e,this.config)).map(e=>V`
          <settings-row .narrow=${this.narrow}>
            <span slot="heading">${vt(e)}</span>
            <span slot="description">${Qe("panels.general.cards.mqtt.fields.state_payload.item",this.hass.language,"{state}",vt(e))}</span>
            <paper-input
              label=${vt(e)}
              placeholder=${e}
              value=${this.selection.state_payload[e]||""}
              @change=${t=>{this.selection=St(this.selection,{state_payload:{[e]:t.target.value}})}}
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
          ${Object.values(mt).filter(e=>kt((e=>{switch(e){case mt.COMMAND_ALARM_DISARM:return pt.STATE_ALARM_DISARMED;case mt.COMMAND_ALARM_ARM_HOME:return pt.STATE_ALARM_ARMED_HOME;case mt.COMMAND_ALARM_ARM_AWAY:return pt.STATE_ALARM_ARMED_AWAY;case mt.COMMAND_ALARM_ARM_NIGHT:return pt.STATE_ALARM_ARMED_NIGHT;case mt.COMMAND_ALARM_ARM_CUSTOM_BYPASS:return pt.STATE_ALARM_ARMED_CUSTOM_BYPASS;default:return}})(e),this.config)).map(e=>V`
          <settings-row .narrow=${this.narrow}>
            <span slot="heading">${vt(e)}</span>
            <span slot="description">${Qe("panels.general.cards.mqtt.fields.command_payload.item",this.hass.language,"{command}",vt(e))}</span>
            <paper-input
              label=${vt(e)}
              placeholder=${e}
              value=${this.selection.command_payload[e]||""}
              @change=${t=>{this.selection=St(this.selection,{command_payload:{[e]:t.target.value}})}}
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
      
    `:V``}saveClick(e){this.hass&&at(this.hass,{mqtt:Object.assign(Object.assign({},this.selection),{enabled:!0})}).catch(t=>$t(t,e)).then(()=>{this.cancelClick()})}cancelClick(){Ee(0,"/alarmo/general",!0)}};xt.styles=He,t([Q()],xt.prototype,"narrow",void 0),t([Q()],xt.prototype,"config",void 0),t([Q()],xt.prototype,"selection",void 0),xt=t([J("mqtt-config-card")],xt);let At=class extends(ut(oe)){constructor(){super(...arguments),this.trigger_time=0,this.disarm_after_trigger=!1}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeEvents(()=>this._fetchData(),"alarmo_updated")]}async _fetchData(){if(!this.hass)return;const e=await Xe(this.hass);this.config=e,this.data=wt(this.config,["trigger_time","disarm_after_trigger","mqtt"]),this.trigger_time=e.trigger_time,this.disarm_after_trigger=e.disarm_after_trigger}firstUpdated(){(async()=>{await qe()})()}render(){var e,t,s,a;return this.hass&&this.config&&this.data?this.path&&"mqtt_configuration"==this.path[0]?V`
      <mqtt-config-card
        .hass=${this.hass}
        .narrow=${this.narrow}
      >
      </mqtt-config-card>
    `:V`
      <ha-card header="${Qe("panels.general.cards.general.title",this.hass.language)}">
        <div class="card-content">
          ${Qe("panels.general.cards.general.description",this.hass.language)}
        </div>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${Qe("panels.general.cards.general.fields.trigger_time.heading",this.hass.language)}</span>
          <span slot="description">${Qe("panels.general.cards.general.fields.trigger_time.description",this.hass.language)}</span>
          <time-slider
            .hass=${this.hass}
            unit="min"
            max="3600"
            zeroValue=${Qe("components.time_slider.infinite",this.hass.language)}
            value=${Math.round(this.data.trigger_time)}
            @change=${e=>this.data={...this.data,trigger_time:Number(e.target.value)}}
        }}
          >
          </time-slider>
        </settings-row>

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

        ${(null===(a=null===(s=this.data)||void 0===s?void 0:s.mqtt)||void 0===a?void 0:a.enabled)?V`
        <div style="padding: 0px 0px 16px 16px">
          <mwc-button
            outlined
            @click=${()=>Ee(0,"/alarmo/general/mqtt_configuration",!0)}
          >
            ${Qe("panels.general.cards.general.actions.setup_mqtt",this.hass.language)}
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
        mode=${Re.ArmedAway}
        .config=${this.config.modes[Re.ArmedAway]}
        .narrow=${this.narrow}
      >
        <span slot="heading">${Qe("common.modes_long.armed_away",this.hass.language)}</span>
        <span slot="description">${Qe("panels.general.cards.armed_away.description",this.hass.language)}</slot>
      </alarm-mode-card>

      <alarm-mode-card
        .hass=${this.hass}
        mode=${Re.ArmedNight}
        .config=${this.config.modes[Re.ArmedNight]}
        .narrow=${this.narrow}
      >
        <span slot="heading">${Qe("common.modes_long.armed_night",this.hass.language)}</span>
        <span slot="description">${Qe("panels.general.cards.armed_night.description",this.hass.language)}</slot>
      </alarm-mode-card>

      <alarm-mode-card
        .hass=${this.hass}
        mode=${Re.ArmedHome}
        .config=${this.config.modes[Re.ArmedHome]}
        .narrow=${this.narrow}
      >
        <span slot="heading">${Qe("common.modes_long.armed_home",this.hass.language)}</span>
        <span slot="description">${Qe("panels.general.cards.armed_home.description",this.hass.language)}</slot>
      </alarm-mode-card>

      <alarm-mode-card
        .hass=${this.hass}
        mode=${Re.ArmedCustom}
        .config=${this.config.modes[Re.ArmedCustom]}
        .narrow=${this.narrow}
      >
        <span slot="heading">${Qe("common.modes_long.armed_custom",this.hass.language)}</span>
        <span slot="description">${Qe("panels.general.cards.armed_custom.description",this.hass.language)}</slot>
      </alarm-mode-card>
    `:V``}saveClick(e){this.hass&&this.data&&at(this.hass,this.data).catch(t=>$t(t,e)).then(()=>{})}};At.styles=He,t([Q()],At.prototype,"narrow",void 0),t([Q()],At.prototype,"path",void 0),t([Q()],At.prototype,"data",void 0),t([Q()],At.prototype,"config",void 0),t([Q()],At.prototype,"trigger_time",void 0),t([Q()],At.prototype,"disarm_after_trigger",void 0),At=t([J("alarm-view-general")],At);let Ot=class extends oe{async showDialog(e){this._params=e,await this.updateComplete}async closeDialog(){this._params=void 0}render(){return this._params?V`
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
      
    `:V``}static get styles(){return ie`
      div.wrapper {
        color: var(--primary-text-color);
      }
    `}};t([Q({attribute:!1})],Ot.prototype,"hass",void 0),t([Z()],Ot.prototype,"_params",void 0),Ot=t([J("error-dialog")],Ot);var Mt=Object.freeze({__proto__:null,get ErrorDialog(){return Ot}});const Ct=(e,t,s)=>{e.firstElementChild||(e.innerHTML='\n      <style>\n        paper-icon-item {\n            margin: -10px;\n            padding: 0;\n        }\n        ha-icon {\n            display: flex;\n            flex: 0 0 40px;\n            color: var(--state-icon-color);\n        }\n      </style>\n      <paper-icon-item>\n        <ha-icon icon="" slot="item-icon"></ha-icon>\n        <paper-item-body two-line>\n          <div class="name"></div>\n          <div secondary></div>\n        </paper-item-body>\n      </paper-icon-item>\n      '),e.querySelector(".name").textContent=s.item.name,e.querySelector("[secondary]").textContent=s.item.description,e.querySelector("ha-icon").icon=s.item.icon};let Tt=class extends oe{constructor(){super(...arguments),this.label="",this.items=[]}open(){this.updateComplete.then(()=>{var e,t;null===(t=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector("vaadin-combo-box-light"))||void 0===t||t.open()})}focus(){this.updateComplete.then(()=>{var e;(null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector("paper-input")).focus()})}firstUpdated(){this._comboBox.items=this.items}render(){return V`
      <vaadin-combo-box-light
        item-value-path="value"
        item-id-path="value"
        item-label-path="name"
        .value=${this._value}
        .renderer=${Ct}
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
          ${this._value&&this.items.find(e=>e.value==this._value)?V`
                <ha-icon 
                  slot="prefix"
                  icon="${this.items.find(e=>e.value==this._value).icon}"
                >
                </ha-icon>
                <ha-icon-button
                  slot="suffix"
                  class="clear-button"
                  @click=${this._clearValue}
                  icon="hass:close"
                >
                </ha-icon-button>
              `:""}
          <ha-icon-button
            slot="suffix"
            class="toggle-button"
            icon="${this._opened?"hass:menu-up":"hass:menu-down"}"
          >
          </ha-icon-button>
        </paper-input>
      </vaadin-combo-box-light>
    `}_clearValue(e){e.stopPropagation(),this._setValue("")}get _value(){return this.value||""}_openedChanged(e){this._opened=e.detail.value}_valueChanged(e){const t=e.detail.value;t!==this._value&&this._setValue(t)}_setValue(e){this.value=e,setTimeout(()=>{Te(this,"value-changed",{value:e})},0)}static get styles(){return ie`
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
    `}};var jt,Nt;t([Q({attribute:!1})],Tt.prototype,"hass",void 0),t([Q()],Tt.prototype,"label",void 0),t([Q()],Tt.prototype,"value",void 0),t([Q()],Tt.prototype,"items",void 0),t([Z()],Tt.prototype,"_opened",void 0),t([(jt="vaadin-combo-box-light",Nt=!0,(e,t)=>{const s={get(){return this.renderRoot.querySelector(jt)},enumerable:!0,configurable:!0};if(Nt){const e="symbol"==typeof t?Symbol():"__"+t;s.get=function(){return void 0===this[e]&&(this[e]=this.renderRoot.querySelector(jt)),this[e]}}return void 0!==t?X(s,e,t):ee(s,e)})],Tt.prototype,"_comboBox",void 0),Tt=t([J("alarmo-select")],Tt);const Et=(e,t)=>{if("binary_sensor"==function(e){const t="string"==typeof e?e:e.entity_id;return String(t.split(".").shift())}(e.entity_id)){if(t)return!0;const s=e.attributes.device_class;return!!s&&!!["door","garage_door","gas","heat","lock","moisture","motion","moving","occupancy","opening","presence","safety","smoke","sound","vibration","window"].includes(s)}return!1};function Pt(e,t){if(!e)return null;const s=Oe(e.entity_id);let a={entity_id:e.entity_id,name:e.attributes.friendly_name||e.entity_id,modes:[],immediate:!1,arm_on_close:!1,allow_open:!1,always_on:!1,trigger_unavailable:!1,type:Ue.Other};if("binary_sensor"==s){const t=(e=>{switch(e.attributes.device_class){case"door":case"garage_door":case"lock":case"opening":return Ue.Door;case"window":return Ue.Window;case"gas":case"heat":case"moisture":case"smoke":case"safety":return Ue.Environmental;case"motion":case"moving":case"occupancy":case"presence":return Ue.Motion;case"sound":case"opening":case"vibration":return Ue.Tamper;default:return}})(e);t&&(a=Object.assign(Object.assign(Object.assign({},a),{type:t}),Dt[t]))}return a=Object.assign(Object.assign({},a),{modes:a.modes.filter(e=>t.modes[e].enabled)}),a}const Dt=e=>{const t=t=>t.filter(t=>e.modes[t].enabled);return{[Ue.Door]:{modes:t([Re.ArmedAway,Re.ArmedHome,Re.ArmedNight]),always_on:!1,allow_open:!1,arm_on_close:!0,immediate:!1},[Ue.Window]:{modes:t([Re.ArmedAway,Re.ArmedHome,Re.ArmedNight]),always_on:!1,allow_open:!1,arm_on_close:!1,immediate:!0},[Ue.Motion]:{modes:t([Re.ArmedAway]),always_on:!1,allow_open:!0,arm_on_close:!1,immediate:!1},[Ue.Tamper]:{modes:t([Re.ArmedAway,Re.ArmedHome,Re.ArmedNight,Re.ArmedCustom]),always_on:!1,allow_open:!1,arm_on_close:!1,immediate:!0},[Ue.Environmental]:{modes:t([Re.ArmedAway,Re.ArmedHome,Re.ArmedNight,Re.ArmedCustom]),always_on:!0,allow_open:!1,arm_on_close:!1,immediate:!1}}};let qt=class extends oe{async firstUpdated(){const e=await Xe(this.hass);this.config=e;const t=await et(this.hass);this.data=t[this.item]}render(){if(!this.data)return V``;const e=this.hass.states[this.data.entity_id];return V`
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

        
        <settings-row .narrow=${this.narrow}  .large=${!0}>
          <span slot="heading">${Qe("panels.sensors.cards.editor.fields.device_type.heading",this.hass.language)}</span>
          <span slot="description">${Qe("panels.sensors.cards.editor.fields.device_type.description",this.hass.language)}</span>

          <alarmo-select
            .hass=${this.hass}
            .items=${[{value:"door",name:Qe("panels.sensors.cards.editor.fields.device_type.choose.door.name",this.hass.language),description:Qe("panels.sensors.cards.editor.fields.device_type.choose.door.description",this.hass.language),icon:"hass:door-closed"},{value:"window",name:Qe("panels.sensors.cards.editor.fields.device_type.choose.window.name",this.hass.language),description:Qe("panels.sensors.cards.editor.fields.device_type.choose.window.description",this.hass.language),icon:"hass:window-closed"},{value:"motion",name:Qe("panels.sensors.cards.editor.fields.device_type.choose.motion.name",this.hass.language),description:Qe("panels.sensors.cards.editor.fields.device_type.choose.motion.description",this.hass.language),icon:"hass:motion-sensor"},{value:"tamper",name:Qe("panels.sensors.cards.editor.fields.device_type.choose.tamper.name",this.hass.language),description:Qe("panels.sensors.cards.editor.fields.device_type.choose.tamper.description",this.hass.language),icon:"hass:vibrate"},{value:"environmental",name:Qe("panels.sensors.cards.editor.fields.device_type.choose.environmental.name",this.hass.language),description:Qe("panels.sensors.cards.editor.fields.device_type.choose.environmental.description",this.hass.language),icon:"hass:fire"}]}
            label=${Qe("panels.sensors.cards.editor.fields.device_type.heading",this.hass.language)}
            value=${this.data.type}
            @value-changed=${e=>this.setType(e.target.value||Ue.Other)}
          >
          </alarmo-select>
        </settings-row>
        
        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${Qe("panels.sensors.cards.editor.fields.modes.heading",this.hass.language)}</span>
          <span slot="description">${Qe("panels.sensors.cards.editor.fields.modes.description",this.hass.language)}</span>
          
          <div style="display: flex; flex-direction: column; padding: 10px 0px">
          ${Object.values(Re).filter(e=>Object.keys(this.config.modes).includes(e)&&this.config.modes[e].enabled).map(e=>V`
            <mwc-button
              class="${this.data.modes.includes(e)?"success":"warning"}"
              @click=${()=>{var t,s;this.data={...this.data,modes:this.data.modes.includes(e)?(t=this.data.modes,s=e,t.filter(e=>e!==s)):ft(this.data.modes.concat([e]))}}}
            >
              <ha-icon icon="${this.data.modes.includes(e)?"hass:check":"hass:close"}"></ha-icon>
              ${Qe("common.modes_long."+e,this.hass.language)}
            </mwc-button>
          `)}
          </div>
        </settings-row>

        <collapsible-section
           .narrow=${this.narrow}
          header=${Qe("panels.sensors.cards.editor.actions.toggle_advanced",this.hass.language)}
        >
      ${!this.data.type||[Ue.Environmental,Ue.Other].includes(this.data.type)?V`
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
  
      ${!this.data.type||[Ue.Door,Ue.Other].includes(this.data.type)?V`
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

      ${!this.data.type||[Ue.Window,Ue.Door,Ue.Motion,Ue.Tamper,Ue.Other].includes(this.data.type)?V`
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
        
      ${!this.data.type||[Ue.Motion,Ue.Other].includes(this.data.type)?V`
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
              ${this.hass.localize("ui.common.delete")}
            </mwc-button>
          </div>
        </ha-card>
    `}setType(e){const t=e!=Ue.Other?Dt(this.config)[e]:{};this.data=Object.assign(Object.assign(Object.assign({},this.data),{type:e}),t)}deleteClick(e){var t,s;(t=this.hass,s=this.item,t.callApi("POST","alarmo/sensors",{entity_id:s,remove:!0})).catch(t=>$t(t,e)).then(()=>{this.cancelClick()})}saveClick(e){nt(this.hass,Object.assign({},this.data)).catch(t=>$t(t,e)).then(()=>{this.cancelClick()})}cancelClick(){Ee(0,"/alarmo/sensors",!0)}};qt.styles=He,t([Q()],qt.prototype,"hass",void 0),t([Q()],qt.prototype,"narrow",void 0),t([Q()],qt.prototype,"item",void 0),t([Q()],qt.prototype,"data",void 0),qt=t([J("sensor-editor-card")],qt);let Rt=class extends oe{render(){return this.columns&&this.data?V`
      <div class="table">
        ${this.renderHeaderRow()}
        ${this.data.length?this.data.map(e=>this.renderDataRow(e)):V`
          <div class="table-row">
            <div class="table-cell text grow">
              <slot></slot>
            </div>
          </div>
        `}
      </div>
    `:V``}renderHeaderRow(){return this.columns?V`
      <div class="table-row header">
        ${Object.values(this.columns).map(e=>e.hide?"":V`
          <div
            class="table-cell ${e.text?"text":""} ${e.grow?"grow":""} ${e.align?e.align:""}" style="${e.grow?"":"width: "+e.width}"
          >
            ${e.title||""}
          </div>
        `)}
      </div>
    `:V``}renderDataRow(e){return this.columns?V`
      <div
        class="table-row ${this.selectable?"selectable":""}"
        @click=${()=>this.handleClick(String(e.id))}
      >
        ${Object.entries(this.columns).map(([t,s])=>s.hide?"":V`
          <div
            class="table-cell ${s.text?"text":""} ${s.grow?"grow":""} ${s.align?s.align:""}" style="${s.grow?"":"width: "+s.width}"
          >
            ${e[t]}
          </div>
        `)}
      </div>
    `:V``}handleClick(e){if(!this.selectable)return;const t=new CustomEvent("row-click",{detail:{id:e}});this.dispatchEvent(t)}};Rt.styles=ie`
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
        padding-right: 16px;
        padding-left: 16px;
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
  `,t([Q()],Rt.prototype,"columns",void 0),t([Q()],Rt.prototype,"data",void 0),t([Q({type:Boolean})],Rt.prototype,"selectable",void 0),Rt=t([J("alarmo-table")],Rt);let Vt=class extends(ut(oe)){constructor(){super(...arguments),this.sensors={},this.addSelection=[],this.showAllSensorEntities=!1}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeEvents(()=>this._fetchData(),"alarmo_updated")]}async _fetchData(){if(!this.hass)return;const e=await Xe(this.hass);this.config=e;const t=await et(this.hass);this.sensors=t}firstUpdated(){(async()=>{await qe()})()}render(){return this.hass&&this.config&&this.sensors?this.path&&2==this.path.length&&"edit"==this.path[0]?V`
      <sensor-editor-card
        .hass=${this.hass}
        .narrow=${this.narrow}
        .item=${this.path[1]}
      >

      </sensor-editor-card>
    `:V`
      ${this.sensorsPanel()}
      ${this.addSensorsPanel()}

    `:V``}sensorsPanel(){if(!this.hass)return V``;let e=Object.keys(this.sensors).map(e=>{const t=this.hass.states[e];return{id:e,name:_t(t),icon:gt(t)}});e.sort((e,t)=>e.name.toLowerCase()<t.name.toLowerCase()?-1:1);const t={icon:{width:"40px"},name:{title:this.hass.localize("ui.components.area-picker.add_dialog.name"),width:"50%",grow:!0,text:!0},id:{title:this.hass.localize("ui.components.entity.entity-picker.entity"),width:"40%",hide:this.narrow,text:!0},modes:{title:Qe("panels.sensors.cards.sensors.table.arm_modes",this.hass.language),width:"25%",text:!0}},s=e.map(e=>({icon:V`<state-badge .hass=${this.hass} .stateObj=${this.hass.states[e.id]}></state-badge>`,name:this.sensors[e.id].name||vt(e.name),id:e.id,modes:this.sensors[e.id].always_on?Qe("panels.sensors.cards.sensors.table.always_on",this.hass.language):this.sensors[e.id].modes.filter(e=>{var t;return null===(t=this.config)||void 0===t?void 0:t.modes[e].enabled}).map(e=>Qe("common.modes_short."+e,this.hass.language)).join(", ")}));return V`
      <ha-card header="${Qe("panels.sensors.cards.sensors.title",this.hass.language)}">
        <div class="card-content">
          ${Qe("panels.sensors.cards.sensors.description",this.hass.language)}
        </div>

      <alarmo-table
        ?selectable=${!0}
        .columns=${t}
        .data=${s}
        @row-click=${e=>{const t=String(e.detail.id);Ee(0,"/alarmo/sensors/edit/"+t,!0)}}
      >
        ${Qe("panels.sensors.cards.sensors.no_items",this.hass.language)}
      </alarmo-table>
    </ha-card>
    `}addSensorsPanel(){if(!this.hass)return V``;let e=Object.values(this.hass.states).filter(e=>Et(e,this.showAllSensorEntities)).filter(e=>!Object.keys(this.sensors).includes(e.entity_id)).map(e=>Object({id:e.entity_id,name:_t(e),icon:gt(e)}));e.sort((e,t)=>e.name.toLowerCase()<t.name.toLowerCase()?-1:1);const t={checkbox:{width:"48px"},icon:{width:"40px"},name:{title:this.hass.localize("ui.components.area-picker.add_dialog.name"),width:"40%",grow:!0,text:!0},id:{title:this.hass.localize("ui.components.entity.entity-picker.entity"),width:"40%",hide:this.narrow,text:!0}},s=e.map(e=>({checkbox:V`
        <ha-checkbox
          @change=${t=>this.toggleSelect(t,e.id)}
          ?checked=${this.addSelection.includes(e.id)}
        >
        </ha-checkbox>`,icon:V`<state-badge .hass=${this.hass} .stateObj=${this.hass.states[e.id]}></state-badge>`,name:vt(e.name),id:e.id}));return V`
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
        .data=${s}
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
    `}toggleSelect(e,t){const s=e.target.checked;this.addSelection=s&&!this.addSelection.includes(t)?[...this.addSelection,t]:s?this.addSelection:this.addSelection.filter(e=>e!=t)}addSelected(e){if(!this.hass||!this.config)return;this.addSelection.map(e=>Pt(this.hass.states[e],this.config)).filter(e=>e).forEach(t=>{nt(this.hass,t).catch(t=>$t(t,e)).then(()=>{})}),this.addSelection=[]}};Vt.styles=He,t([Q()],Vt.prototype,"narrow",void 0),t([Q()],Vt.prototype,"path",void 0),t([Q()],Vt.prototype,"config",void 0),t([Q()],Vt.prototype,"sensors",void 0),t([Q()],Vt.prototype,"addSelection",void 0),t([Q()],Vt.prototype,"showAllSensorEntities",void 0),Vt=t([J("alarm-view-sensors")],Vt);let Lt=class extends oe{async firstUpdated(){if(this.users=await tt(this.hass),this.data={name:"",code:"",old_code:"",confirm_code:"",is_admin:!1,can_arm:!0,can_disarm:!0,is_override_code:!1},this.item){const e=this.users[this.item];this.data=Object.assign(Object.assign({},this.data),wt(e,["name","is_admin","can_arm","can_disarm","is_override_code"]))}}render(){return this.data?V`
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

      ${this.item?V`
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
      
      ${this.item&&!this.data.old_code.length?"":V`
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

  ${this.item?V`
    <mwc-button
      class="warning"
      @click=${this.deleteClick}
    >
      ${this.hass.localize("ui.common.delete")}
    </mwc-button>`:""}
  </div>
</ha-card>
    `:V``}deleteClick(e){var t,s;this.item&&(t=this.hass,s=this.item,t.callApi("POST","alarmo/users",{user_id:s,remove:!0})).catch(t=>$t(t,e)).then(()=>{this.cancelClick()})}saveClick(e){if(this.data)if(this.data.name.length)if(this.data.code.length<4&&(!this.item||this.data.old_code.length))yt(e,Qe("panels.codes.cards.new_user.errors.no_code",this.hass.language));else if(this.data.code!==this.data.confirm_code)yt(e,Qe("panels.codes.cards.new_user.errors.code_mismatch",this.hass.language));else if(this.data.is_admin&&(this.data=Object.assign(Object.assign({},this.data),{can_arm:!0,can_disarm:!0})),this.item){let t=Object.assign(Object.assign({},wt(this.data,["name","is_admin","can_arm","can_disarm"])),{user_id:this.item});this.data.old_code.length&&(t=Object.assign(Object.assign({},t),{old_code:this.data.old_code,code:this.data.code})),ot(this.hass,t).catch(t=>$t(t,e)).then(()=>{this.cancelClick()})}else ot(this.hass,bt(this.data,["confirm_code","old_code"])).catch(t=>$t(t,e)).then(()=>{this.cancelClick()});else yt(e,Qe("panels.codes.cards.new_user.errors.no_name",this.hass.language))}cancelClick(){Ee(0,"/alarmo/codes",!0)}};Lt.styles=He,t([Q()],Lt.prototype,"hass",void 0),t([Q()],Lt.prototype,"narrow",void 0),t([Q()],Lt.prototype,"item",void 0),t([Q()],Lt.prototype,"data",void 0),Lt=t([J("user-editor-card")],Lt);let Ut=class extends(ut(oe)){constructor(){super(...arguments),this.users={},this.code_arm_required=!1,this.code_disarm_required=!1,this.code_format="number"}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeEvents(()=>this._fetchData(),"alarmo_updated")]}async _fetchData(){if(!this.hass)return;const e=await Xe(this.hass);this.config=e,this.code_arm_required=e.code_arm_required,this.code_disarm_required=e.code_disarm_required,this.code_format=e.code_format;const t=await tt(this.hass);this.users=t}render(){return this.hass?this.path&&"new_user"==this.path[0]?V`
      <user-editor-card
        .hass=${this.hass}
        .narrow=${this.narrow}
      >
      </user-editor-card>
    `:this.path&&2==this.path.length&&"edit_user"==this.path[0]?V`
      <user-editor-card
        .hass=${this.hass}
        .narrow=${this.narrow}
        item=${this.path[1]}
      >
      </user-editor-card>
    `:V`
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
    `:V``}usersPanel(){if(!this.hass)return V``;let e=Object.values(this.users);e.sort((e,t)=>e.name.toLowerCase()<t.name.toLowerCase()?-1:1);const t={icon:{width:"40px"},name:{title:this.hass.localize("ui.components.area-picker.add_dialog.name"),width:"40%",grow:!0,text:!0},remarks:{title:Qe("panels.codes.cards.user_management.table.remarks",this.hass.language),width:"40%",hide:this.narrow,text:!0}},s=e.map(e=>({id:e.user_id,icon:V`<ha-icon icon="mdi:account-outline"></ha-icon>`,name:vt(e.name),remarks:e.is_admin?Qe("panels.codes.cards.user_management.table.administrator",this.hass.language):""}));return V`
      <ha-card header="${Qe("panels.codes.cards.user_management.title",this.hass.language)}">
        <div class="card-content">
          ${Qe("panels.codes.cards.user_management.description",this.hass.language)}
        </div>

      <alarmo-table
        ?selectable=${!0}
        .columns=${t}
        .data=${s}
        @row-click=${e=>{const t=String(e.detail.id);Ee(0,"/alarmo/codes/edit_user/"+t,!0)}}
      >
        ${Qe("panels.codes.cards.user_management.no_items",this.hass.language)}
      </alarmo-table>
      <div class="card-actions">
        <mwc-button @click=${this.addUserClick}>
          ${Qe("panels.codes.cards.user_management.actions.new_user",this.hass.language)}
        </mwc-button>
      </div>
    </ha-card>
    `}addUserClick(){Ee(0,"/alarmo/codes/new_user",!0)}saveClick(e){this.hass&&at(this.hass,{code_arm_required:this.code_arm_required,code_disarm_required:this.code_disarm_required,code_format:this.code_format}).catch(t=>$t(t,e)).then(()=>{})}};Ut.styles=He,t([Q()],Ut.prototype,"narrow",void 0),t([Q()],Ut.prototype,"path",void 0),t([Q()],Ut.prototype,"config",void 0),t([Q()],Ut.prototype,"users",void 0),t([Q()],Ut.prototype,"code_arm_required",void 0),t([Q()],Ut.prototype,"code_disarm_required",void 0),t([Q()],Ut.prototype,"code_format",void 0),Ut=t([J("alarm-view-codes")],Ut);let Ht=class extends oe{constructor(){super(...arguments),this.label="",this.options=[],this.value=[],this.numOptions=1}firstUpdated(){this.value||(this.value=[]),this.value.length>1&&(this.numOptions=this.value.length)}render(){return V`
      <div class="container">
      ${[...Array(this.numOptions).keys()].map(e=>this.renderSelect(e))}
      </div>
    `}renderSelect(e){return V`
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
  </div>`}renderButton(e){return e!=this.numOptions-1||e==this.options.length-1?V`<ha-icon icon="hass:minus" @click=${()=>this.removeOption(e)}></ha-icon>`:this.value&&this.value.length>e?V`<ha-icon icon="hass:plus" @click=${this.addOption}></ha-icon>`:V`<ha-icon class="disabled" icon="hass:plus"></ha-icon>`}renderOptions(e){const t=this.value.slice(0,e).concat(this.value.slice(e+1));return this.options.filter(e=>e.value).map(e=>V`
      <paper-item
    value="${e.value}"
    ?disabled=${t.includes(e.value)}
      >
      ${e.name||e.value}
    </paper-item>
      `)}getSelected(e){return this.options.filter(e=>e.value).findIndex(t=>t.value==this.value[e])}selectedChange(e,t){if(!e.target.selectedItem)return;const s=e.target.selectedItem.getAttribute("value");this.value=this.value.length==t?[...this.value,s]:this.value.slice(0,t).concat(s,this.value.slice(t+1));const a=new CustomEvent("change");this.dispatchEvent(a)}addOption(){this.numOptions=this.numOptions+1}removeOption(e){this.numOptions=this.numOptions-1,e==this.value.length-1?this.value=this.value.slice(0,e):this.value=this.value.slice(0,e).concat(this.value.slice(e+1))}};Ht.styles=ie`
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
    `,t([Q()],Ht.prototype,"label",void 0),t([Q()],Ht.prototype,"options",void 0),t([Q()],Ht.prototype,"value",void 0),t([Q({type:Boolean})],Ht.prototype,"disabled",void 0),t([Q()],Ht.prototype,"numOptions",void 0),Ht=t([J("alarmo-multi-select")],Ht);const zt=e=>[{value:Ve.Armed,trigger:{state:Ve.Armed},name:"Alarm is armed"},{value:Ve.Disarmed,trigger:{state:Ve.Disarmed},name:"Alarm is disarmed"},{value:Ve.Triggered,trigger:{state:Ve.Triggered},name:"Alarm is triggered"},{value:Le.ArmFailure,trigger:{event:Le.ArmFailure},name:"Failed to arm"},{value:Ve.Arming,trigger:{state:Ve.Arming},name:"Leave delay started"},{value:Ve.Pending,trigger:{state:Ve.Pending},name:"Entry delay started"}];function Yt(e){let t=Object.keys(e.services.notify).map(t=>{let s={value:"notify."+t,name:t};const a=e.states["device_tracker."+t.replace("mobile_app_","")];return a&&(s=Object.assign(Object.assign({},s),{name:a.attributes.friendly_name||Me(a.entity_id)})),s});return t.sort((e,t)=>e.name.toLowerCase()<t.name.toLowerCase()?-1:1),t}const It={name:"",triggers:[],actions:[{service:"",service_data:{message:""}}]},Ft={name:"",triggers:[],actions:[{service:"",service_data:{}}]};function Bt(e){if(1!=e.triggers.length)return"";if(e.triggers[0].state)switch(e.triggers[0].state){case Ve.Armed:return"The alarm is now ON.";case Ve.Disarmed:return"The alarm is now OFF.";case Ve.Arming:return"The alarm will be armed soon, please leave the house.";case Ve.Pending:return"The alarm is about to trigger, disarm it quickly!";case Ve.Triggered:return"The alarm is triggered! Cause: {{open_sensors}}.";default:return""}else if(e.triggers[0].event)switch(e.triggers[0].event){case Le.ArmFailure:return"The alarm could not be armed right now, due to: {{open_sensors}}.";default:return""}return""}const Wt=["switch","input_boolean","light","script"];function Kt(e,t){if(!e.triggers.length)return Qe("panels.actions.validation_errors.no_triggers",t.language);for(let s=0;s<e.triggers.length;s++){const a=e.triggers[s];if(!a.event&&!a.state)return Qe("panels.actions.validation_errors.empty_trigger",t.language);if(!zt().find(e=>JSON.stringify(e.trigger)===JSON.stringify(a)))return Qe("panels.actions.validation_errors.invalid_trigger",t.language,"{trigger}",JSON.stringify(a))}if(void 0!==e.modes&&e.modes.length)for(let s=0;s<e.modes.length;s++){const a=e.modes[s];if(!Object.values(Re).includes(a))return Qe("panels.actions.validation_errors.empty_trigger",t.language,"{mode}",a)}if(!e.actions.length)return Qe("panels.actions.validation_errors.no_actions",t.language);for(let s=0;s<e.actions.length;s++){const a=e.actions[s];if(!a.service)return Qe("panels.actions.validation_errors.no_service",t.language);if(!Object.keys(t.services).includes(Oe(a.service)))return Qe("panels.actions.validation_errors.invalid_service",t.language,"{service}",a.service);if(!Object.keys(t.services[Oe(a.service)]).includes(Me(a.service)))return Qe("panels.actions.validation_errors.invalid_service",t.language,"{service}",a.service);if(!a.service_data||!Object.keys(a.service_data).length)return Qe("panels.actions.validation_errors.no_service_data",t.language);if(e.is_notification){if(!Object.keys(a.service_data).includes("message")||!a.service_data.message.length)return Qe("panels.actions.validation_errors.no_message_in_service_data",t.language)}else if(!Object.keys(a.service_data).includes("entity_id"))return Qe("panels.actions.validation_errors.no_entity_in_service_data",t.language)}}let Jt=class extends oe{constructor(){super(...arguments),this.yamlMode=!1,this.namePlaceholder=""}async firstUpdated(){this.config=await Xe(this.hass);const e=await st(this.hass);if(this.item)e[this.item]&&e[this.item].is_notification?this.data=bt(e[this.item],["automation_id","is_notification","enabled"]):this.data=Object.assign({},It);else{this.data=Object.assign({},It);let e="My notification";const t=await st(this.hass);if(Object.values(t).find(t=>t.name==e)){let s=2;for(;Object.values(t).find(t=>t.name==`${e} ${s}`);)s++;e=`${e} ${s}`}this.namePlaceholder=e}}render(){return this.data?V`
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

  ${this.yamlMode?V`
      <ha-yaml-editor
        .label="Label"
        .name="Data"  
        .defaultValue=${this.data}
        @value-changed=${e=>{this.yamlCode=e.detail.value}}
      >
      </ha-yaml-editor>
    `:V`

  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${Qe("panels.actions.cards.new_notification.fields.event.heading",this.hass.language)}</span>
    <span slot="description">${Qe("panels.actions.cards.new_notification.fields.event.description",this.hass.language)}</span>

    <alarmo-multi-select
      label=${Qe("panels.actions.cards.new_action.fields.event.heading",this.hass.language)}
      .options=${Object.values(zt(this.hass))}
      .value=${this.data.triggers.map(e=>zt(this.hass).find(t=>JSON.stringify(t.trigger)==JSON.stringify(e)).value)}
      @change=${e=>this.updateTriggers(e.target.value)}
    </alarmo-multi-select>
  </settings-row>

  <div class="separator"></div>

  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${Qe("panels.actions.cards.new_notification.fields.mode.heading",this.hass.language)}</span>
    <span slot="description">${Qe("panels.actions.cards.new_notification.fields.mode.description",this.hass.language)}</span>

    <alarmo-multi-select
      label=${Qe("panels.actions.cards.new_notification.fields.mode.heading",this.hass.language)}
      ?disabled=${!this.data.triggers.length||this.data.triggers.some(e=>e.state&&e.state==Ve.Disarmed)}
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
      placeholder=${Bt(this.data)}
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

  <settings-row .narrow=${this.narrow}>
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

  ${this.item?V`
    <mwc-button
      class="warning"
      @click=${this.deleteClick}
    >
      ${this.hass.localize("ui.common.delete")}
    </mwc-button>`:""}
  </div>
</ha-card>
    `:V``}getTargetList(){return[...Object.values(Yt(this.hass)),,...this.data.actions.filter(e=>!Yt(this.hass).find(t=>t.value==e.service)).map(e=>Object({value:e.service}))]}getModeList(){return Object.keys(this.config.modes).filter(e=>this.config.modes[e].enabled).map(e=>Object({name:Qe("common.modes_long."+e,this.hass.language),value:e}))}updateTriggers(e){this.data=Object.assign(Object.assign({},this.data),{triggers:e.map(e=>zt(this.hass).find(t=>t.value==e).trigger)})}updateModes(e){this.data=Object.assign(Object.assign({},this.data),{modes:e})}updateTitle(e){this.data=Object.assign(Object.assign({},this.data),{actions:this.data.actions.map(t=>Object(Object.assign(Object.assign({},t),{service_data:Object.assign(Object.assign({},t.service_data),{title:e})})))})}updateMessage(e){this.data=Object.assign(Object.assign({},this.data),{actions:this.data.actions.map(t=>Object(Object.assign(Object.assign({},t),{service_data:Object.assign(Object.assign({},t.service_data),{message:e})})))})}updateTargets(e){this.data=Object.assign(Object.assign({},this.data),{actions:e.map(e=>Object({service:e,service_data:Object.assign({},this.data.actions[0].service_data)}))})}deleteClick(e){this.item&&dt(this.hass,this.item).catch(t=>$t(t,e)).then(()=>{this.cancelClick()})}async saveClick(e){let t=this.yamlMode?Object.assign({},this.yamlCode):this.data;t=Object.assign(Object.assign({},t),{is_notification:!0,actions:t.actions.map(e=>!e.service_data||e.service_data.message&&e.service_data.message.length?e:Object.assign(Object.assign({},e),{service_data:Object.assign(Object.assign({},e.service_data),{message:Bt(t)})})),name:t.name||this.namePlaceholder});const s=Kt(t,this.hass);s?yt(e,s):(this.item&&(t=Object.assign(Object.assign({},t),{automation_id:this.item})),rt(this.hass,t).catch(t=>$t(t,e)).then(()=>{this.cancelClick()}))}toggleYaml(){this.data&&(this.yamlMode=!this.yamlMode,!this.yamlMode&&this.yamlCode?this.data=Object.assign({},this.yamlCode):this.yamlCode=Object.assign({},this.data))}cancelClick(){Ee(0,"/alarmo/actions",!0)}};Jt.styles=He,t([Q()],Jt.prototype,"narrow",void 0),t([Q()],Jt.prototype,"item",void 0),t([Q()],Jt.prototype,"data",void 0),t([Q()],Jt.prototype,"yamlMode",void 0),t([Q()],Jt.prototype,"namePlaceholder",void 0),Jt=t([J("notification-editor-card")],Jt);let Gt=class extends oe{constructor(){super(...arguments),this.includeDomains=[],this.options=[],this.value=[],this.numOptions=1}firstUpdated(){this.value.length>1&&(this.numOptions=this.value.length)}render(){return this.hass?V`
      <div class="container">
      ${[...Array(this.numOptions).keys()].map(e=>this.renderSelect(e))}
      </div>
    `:V``}renderSelect(e){return V`
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
      </div>`}renderButton(e){return e!=this.numOptions-1||e==this.options.length-1?V`<ha-icon icon="hass:minus" @click=${()=>this.removeOption(e)}></ha-icon>`:this.value&&this.value.length>e?V`<ha-icon icon="hass:plus" @click=${this.addOption}></ha-icon>`:V`<ha-icon class="disabled" icon="hass:plus"></ha-icon>`}getValue(e){return e>this.value.length-1?"":this.value[e]}entityFilter(e,t){return!this.value.slice(0,t).concat(this.value.slice(t+1)).includes(e)}selectedChange(e,t){let s=e.target.value;if(!this.entityFilter(s,t))return void this.removeOption(t);const a=this.value.length==t?[...this.value,s]:this.value.slice(0,t).concat(s,this.value.slice(t+1));this.value=a.filter(e=>e);const i=new CustomEvent("change");this.dispatchEvent(i)}addOption(){this.numOptions=this.numOptions+1}removeOption(e){this.numOptions=this.numOptions-1,e==this.value.length-1?this.value=this.value.slice(0,e):this.value=this.value.slice(0,e).concat(this.value.slice(e+1))}};Gt.styles=ie`
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
    `,t([Q()],Gt.prototype,"includeDomains",void 0),t([Q()],Gt.prototype,"options",void 0),t([Q()],Gt.prototype,"value",void 0),t([Q()],Gt.prototype,"numOptions",void 0),Gt=t([J("alarmo-multi-entity-select")],Gt);let Qt=class extends oe{constructor(){super(...arguments),this.yamlMode=!1,this.namePlaceholder=""}async firstUpdated(){this.config=await Xe(this.hass);const e=await st(this.hass);if(this.item)e[this.item]&&!e[this.item].is_notification?this.data=bt(e[this.item],["automation_id","is_notification","enabled"]):this.data=Object.assign({},Ft);else{this.data=Object.assign({},Ft);let e="My notification";const t=await st(this.hass);if(Object.values(t).find(t=>t.name==e)){let s=2;for(;Object.values(t).find(t=>t.name==`${e} ${s}`);)s++;e=`${e} ${s}`}this.namePlaceholder=e}}render(){return this.data?V`
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

  ${this.yamlMode?V`
      <ha-yaml-editor
        .label="Label"
        .name="Data"  
        .defaultValue=${this.data}
        @value-changed=${e=>{this.yamlCode=e.detail.value}}
      >
      </ha-yaml-editor>
    `:V`

  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${Qe("panels.actions.cards.new_action.fields.event.heading",this.hass.language)}</span>
    <span slot="description">${Qe("panels.actions.cards.new_action.fields.event.description",this.hass.language)}</span>

    <alarmo-multi-select
      label=${Qe("panels.actions.cards.new_action.fields.event.heading",this.hass.language)}
      .options=${Object.values(zt(this.hass))}
      .value=${this.data.triggers.map(e=>zt(this.hass).find(t=>JSON.stringify(t.trigger)==JSON.stringify(e)).value)}
      @change=${e=>this.updateTriggers(e.target.value)}
    </alarmo-multi-select>
  </settings-row>

  <div class="separator"></div>

  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${Qe("panels.actions.cards.new_action.fields.mode.heading",this.hass.language)}</span>
    <span slot="description">${Qe("panels.actions.cards.new_action.fields.mode.description",this.hass.language)}</span>

    <alarmo-multi-select
      label=${Qe("panels.actions.cards.new_action.fields.mode.heading",this.hass.language)}
      ?disabled=${!this.data.triggers.length||this.data.triggers.some(e=>e.state&&e.state==Ve.Disarmed)}
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
      .includeDomains=${Wt}
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

  <settings-row .narrow=${this.narrow}>
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

  ${this.item?V`
    <mwc-button
      class="warning"
      @click=${this.deleteClick}
    >
      ${this.hass.localize("ui.common.delete")}
    </mwc-button>`:""}
  </div>
</ha-card>
    `:V``}getEntityValues(){var e;return null===(e=this.data)||void 0===e?void 0:e.actions.map(e=>{var t;return null===(t=e.service_data)||void 0===t?void 0:t.entity_id}).filter(e=>e)}getModeList(){return Object.keys(this.config.modes).filter(e=>this.config.modes[e].enabled).map(e=>Object({name:Qe("common.modes_long."+e,this.hass.language),value:e}))}updateTriggers(e){this.data=Object.assign(Object.assign({},this.data),{triggers:e.map(e=>zt(this.hass).find(t=>t.value==e).trigger)})}updateModes(e){this.data=Object.assign(Object.assign({},this.data),{modes:e})}updateEntities(e){var t;const s=this.getAction();let a=[...(null===(t=this.data)||void 0===t?void 0:t.actions)||[]];e.forEach((e,t)=>{var i;t<a.length&&Oe(a[t].service||(null===(i=a[t].service_data)||void 0===i?void 0:i.entity_id)||"")==Oe(e[t])?a[t]=Object.assign(Object.assign({},a[t]),{service_data:Object.assign(Object.assign({},a[t].service_data),{entity_id:e})}):t<a.length?a[t]={service:s?Oe(e)+"."+s:"",service_data:{entity_id:e}}:a.push({service:s?Oe(e)+"."+s:"",service_data:{entity_id:e}})}),this.data=Object.assign(Object.assign({},this.data),{actions:a})}getAction(){var e;const t=(null===(e=this.data)||void 0===e?void 0:e.actions.map(e=>Me(e.service)).filter(e=>e))||[];return 1==ft(t).length?t[0]:""}updateAction(e){this.data=Object.assign(Object.assign({},this.data),{actions:this.data.actions.map(t=>{var s;return Object(Object.assign(Object.assign({},t),{service:(Oe((null===(s=t.service_data)||void 0===s?void 0:s.entity_id)||"")||"homeassistant")+"."+e}))})})}deleteClick(e){this.item&&dt(this.hass,this.item).catch(t=>$t(t,e)).then(()=>{this.cancelClick()})}saveClick(e){let t=this.yamlMode?Object.assign({},this.yamlCode):this.data;t=Object.assign(Object.assign({},t),{name:t.name||this.namePlaceholder});const s=Kt(t,this.hass);s?yt(e,s):(this.item&&(t=Object.assign(Object.assign({},t),{automation_id:this.item})),rt(this.hass,t).catch(t=>$t(t,e)).then(()=>{this.cancelClick()}))}toggleYaml(){this.data&&(this.yamlMode=!this.yamlMode,!this.yamlMode&&this.yamlCode?this.data=Object.assign({},this.yamlCode):this.yamlCode=Object.assign({},this.data))}cancelClick(){Ee(0,"/alarmo/actions",!0)}};Qt.styles=He,t([Q()],Qt.prototype,"narrow",void 0),t([Q()],Qt.prototype,"item",void 0),t([Q()],Qt.prototype,"data",void 0),t([Q()],Qt.prototype,"yamlMode",void 0),t([Q()],Qt.prototype,"namePlaceholder",void 0),Qt=t([J("automation-editor-card")],Qt);let Zt=class extends(ut(oe)){constructor(){super(...arguments),this.automations=[]}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeEvents(()=>this._fetchData(),"alarmo_updated")]}async _fetchData(){if(!this.hass)return;const e=await st(this.hass);this.automations=Object.values(e)}render(){if(!this.hass)return V``;if(this.path&&this.path.length&&"new_notification"==this.path[0])return V`
        <notification-editor-card
          .hass=${this.hass}
          .narrow=${this.narrow}
        >

        </notification-editor-card>
      `;if(this.path&&2==this.path.length&&"edit_notification"==this.path[0])return V`
        <notification-editor-card
          .hass=${this.hass}
          .narrow=${this.narrow}
          item=${this.path[1]}
        >

        </notification-editor-card>
      `;if(this.path&&this.path.length&&"new_action"==this.path[0])return V`
        <automation-editor-card
          .hass=${this.hass}
          .narrow=${this.narrow}
        >

        </automation-editor-card>
      `;if(this.path&&2==this.path.length&&"edit_action"==this.path[0])return V`
        <automation-editor-card
          .hass=${this.hass}
          .narrow=${this.narrow}
          item=${this.path[1]}
        >

        </automation-editor-card>
      `;{const e={type:{width:"40px"},name:{title:this.hass.localize("ui.components.area-picker.add_dialog.name"),width:"40%",grow:!0,text:!0},enabled:{title:Qe("panels.actions.cards.notifications.table.enabled",this.hass.language),width:"68px",align:"center"}},t=this.automations.filter(e=>e.is_notification).map(e=>Object({id:e.automation_id,type:V`<ha-icon icon="hass:message-text-outline"></ha-icon>`,name:e.name,enabled:V`<ha-switch
        ?checked=${e.enabled}
        @click=${t=>{t.stopPropagation(),this.toggleEnable(t,e.automation_id)}}
      ></ha-switch>`})),s=this.automations.filter(e=>!e.is_notification).map(e=>Object({id:e.automation_id,type:V`<ha-icon icon="hass:flash"></ha-icon>`,name:e.name,enabled:V`<ha-switch
        ?checked=${e.enabled}
        @click=${t=>{t.stopPropagation(),this.toggleEnable(t,e.automation_id)}}
      ></ha-switch>`}));return V`

      <ha-card header="${Qe("panels.actions.cards.notifications.title",this.hass.language)}">
        <div class="card-content">${Qe("panels.actions.cards.notifications.description",this.hass.language)}</div>
        
      <alarmo-table
        ?selectable=${!0}
        .columns=${e}
        .data=${t}
        @row-click=${e=>{const t=String(e.detail.id);Ee(0,"/alarmo/actions/edit_notification/"+t,!0)}}
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
                
      <alarmo-table
        ?selectable=${!0}
        .columns=${e}
        .data=${s}
        @row-click=${e=>{const t=String(e.detail.id);Ee(0,"/alarmo/actions/edit_action/"+t,!0)}}
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
    `}}toggleEnable(e,t){rt(this.hass,{automation_id:t,enabled:!e.target.checked}).catch(t=>$t(t,e)).then(()=>{})}addNotificationClick(){Ee(0,"/alarmo/actions/new_notification",!0)}addActionClick(){Ee(0,"/alarmo/actions/new_action",!0)}static get styles(){return ie`
      ${He}

      :host {
        flex: 1 0 0;
        max-width: 100%;
      }

      div.table {
        margin: 0px 10px;
      }

      div.table .entity-row {
        border-bottom: 1px solid var(--divider-color);
        min-height: 48px;
      }

      div.table .entity-row.header {
        font-weight: 600;
      }

      div.table .entity-row:first-child {
        border-top: 1px solid var(--divider-color);
      }

      div.table ha-icon-button {
        color: var(--secondary-text-color);
      }

      

    `}};t([Q()],Zt.prototype,"hass",void 0),t([Q()],Zt.prototype,"narrow",void 0),t([Q()],Zt.prototype,"path",void 0),t([Q()],Zt.prototype,"alarmEntity",void 0),t([Q()],Zt.prototype,"automations",void 0),Zt=t([J("alarm-view-actions")],Zt),e.MyAlarmPanel=class extends oe{async firstUpdated(){window.addEventListener("location-changed",()=>{this.requestUpdate()}),await qe(),this.userConfig=await tt(this.hass),this.requestUpdate()}render(){if(!customElements.get("ha-app-layout")||!this.userConfig)return V`loading...`;const e=Object.values(this.userConfig).find(e=>e.name.toLowerCase()==this.hass.user.name.toLowerCase());return this.hass.user.is_admin||e&&e.is_admin?V`
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
              v${"1.4.0"}
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
    `:V`
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
      `}getPath(){return window.location.pathname.split("/")}getView(){const e=this.getPath(),t=e[2]||"general",s=e.slice(3);switch(t){case"general":return V`
        <alarm-view-general
          .hass=${this.hass}
          .narrow=${this.narrow}
          .path=${s.length?s:null}
        ></alarm-view-general>
      `;case"sensors":return V`
        <alarm-view-sensors
          .hass=${this.hass}
          .narrow=${this.narrow}
          .path=${s.length?s:null}
        >
        </alarm-view-sensors>
      `;case"codes":return V`
        <alarm-view-codes
          .hass=${this.hass}
          .narrow=${this.narrow}
          .path=${s.length?s:null}
        >
        </alarm-view-codes>
      `;case"actions":return V`
        <alarm-view-actions
          .hass=${this.hass}
          .narrow=${this.narrow}
          .path=${s.length?s:null}
        >
        </alarm-view-actions>
      `;default:return V`no view`}}handlePageSelected(e){const t=e.detail.item.getAttribute("page-name");t!==this.getPath()?(Ee(0,"/alarmo/"+t),this.requestUpdate()):scrollTo(0,0)}static get styles(){return ie`
      ${He}

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
    `}},t([Q()],e.MyAlarmPanel.prototype,"hass",void 0),t([Q({type:Boolean,reflect:!0})],e.MyAlarmPanel.prototype,"narrow",void 0),t([Q()],e.MyAlarmPanel.prototype,"userConfig",void 0),e.MyAlarmPanel=t([J("alarm-panel")],e.MyAlarmPanel)}({});
