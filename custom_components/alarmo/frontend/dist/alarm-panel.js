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
    ***************************************************************************** */function t(e,t,a,i){var s,n=arguments.length,o=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(s=e[r])&&(o=(n<3?s(o):n>3?s(t,a,o):s(t,a))||o);return n>3&&o&&Object.defineProperty(t,a,o),o
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
     */}const a="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,i=(e,t,a=null)=>{for(;t!==a;){const a=t.nextSibling;e.removeChild(t),t=a}},s=`{{lit-${String(Math.random()).slice(2)}}}`,n=`\x3c!--${s}--\x3e`,o=new RegExp(`${s}|${n}`);class r{constructor(e,t){this.parts=[],this.element=t;const a=[],i=[],n=document.createTreeWalker(t.content,133,null,!1);let r=0,l=-1,u=0;const{strings:m,values:{length:p}}=e;for(;u<p;){const e=n.nextNode();if(null!==e){if(l++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:a}=t;let i=0;for(let e=0;e<a;e++)d(t[e].name,"$lit$")&&i++;for(;i-- >0;){const t=m[u],a=h.exec(t)[2],i=a.toLowerCase()+"$lit$",s=e.getAttribute(i);e.removeAttribute(i);const n=s.split(o);this.parts.push({type:"attribute",index:l,name:a,strings:n}),u+=n.length-1}}"TEMPLATE"===e.tagName&&(i.push(e),n.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(s)>=0){const i=e.parentNode,s=t.split(o),n=s.length-1;for(let t=0;t<n;t++){let a,n=s[t];if(""===n)a=c();else{const e=h.exec(n);null!==e&&d(e[2],"$lit$")&&(n=n.slice(0,e.index)+e[1]+e[2].slice(0,-"$lit$".length)+e[3]),a=document.createTextNode(n)}i.insertBefore(a,e),this.parts.push({type:"node",index:++l})}""===s[n]?(i.insertBefore(c(),e),a.push(e)):e.data=s[n],u+=n}}else if(8===e.nodeType)if(e.data===s){const t=e.parentNode;null!==e.previousSibling&&l!==r||(l++,t.insertBefore(c(),e)),r=l,this.parts.push({type:"node",index:l}),null===e.nextSibling?e.data="":(a.push(e),l--),u++}else{let t=-1;for(;-1!==(t=e.data.indexOf(s,t+1));)this.parts.push({type:"node",index:-1}),u++}}else n.currentNode=i.pop()}for(const e of a)e.parentNode.removeChild(e)}}const d=(e,t)=>{const a=e.length-t.length;return a>=0&&e.slice(a)===t},l=e=>-1!==e.index,c=()=>document.createComment(""),h=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function u(e,t){const{element:{content:a},parts:i}=e,s=document.createTreeWalker(a,133,null,!1);let n=p(i),o=i[n],r=-1,d=0;const l=[];let c=null;for(;s.nextNode();){r++;const e=s.currentNode;for(e.previousSibling===c&&(c=null),t.has(e)&&(l.push(e),null===c&&(c=e)),null!==c&&d++;void 0!==o&&o.index===r;)o.index=null!==c?-1:o.index-d,n=p(i,n),o=i[n]}l.forEach(e=>e.parentNode.removeChild(e))}const m=e=>{let t=11===e.nodeType?0:1;const a=document.createTreeWalker(e,133,null,!1);for(;a.nextNode();)t++;return t},p=(e,t=-1)=>{for(let a=t+1;a<e.length;a++){const t=e[a];if(l(t))return a}return-1};
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
class b{constructor(e,t,a){this.__parts=[],this.template=e,this.processor=t,this.options=a}update(e){let t=0;for(const a of this.__parts)void 0!==a&&a.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=a?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],i=this.template.parts,s=document.createTreeWalker(e,133,null,!1);let n,o=0,r=0,d=s.nextNode();for(;o<i.length;)if(n=i[o],l(n)){for(;r<n.index;)r++,"TEMPLATE"===d.nodeName&&(t.push(d),s.currentNode=d.content),null===(d=s.nextNode())&&(s.currentNode=t.pop(),d=s.nextNode());if("node"===n.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(d.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(d,n.name,n.strings,this.options));o++}else this.__parts.push(void 0),o++;return a&&(document.adoptNode(e),customElements.upgrade(e)),e}}
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
     */const w=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),y=` ${s} `;class ${constructor(e,t,a,i){this.strings=e,this.values=t,this.type=a,this.processor=i}getHTML(){const e=this.strings.length-1;let t="",a=!1;for(let i=0;i<e;i++){const e=this.strings[i],o=e.lastIndexOf("\x3c!--");a=(o>-1||a)&&-1===e.indexOf("--\x3e",o+1);const r=h.exec(e);t+=null===r?e+(a?y:n):e.substr(0,r.index)+r[1]+r[2]+"$lit$"+r[3]+s}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==w&&(t=w.createHTML(t)),e.innerHTML=t,e}}
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
     */const k=e=>null===e||!("object"==typeof e||"function"==typeof e),A=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class x{constructor(e,t,a){this.dirty=!0,this.element=e,this.name=t,this.strings=a,this.parts=[];for(let e=0;e<a.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new S(this)}_getValue(){const e=this.strings,t=e.length-1,a=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=a[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!A(e))return e}let i="";for(let s=0;s<t;s++){i+=e[s];const t=a[s];if(void 0!==t){const e=t.value;if(k(e)||!A(e))i+="string"==typeof e?e:String(e);else for(const t of e)i+="string"==typeof t?t:String(t)}}return i+=e[t],i}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class S{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===_||k(e)&&e===this.value||(this.value=e,v(e)||(this.committer.dirty=!0))}commit(){for(;v(this.value);){const e=this.value;this.value=_,e(this)}this.value!==_&&this.committer.commit()}}class O{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(c()),this.endNode=e.appendChild(c())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=c()),e.__insert(this.endNode=c())}insertAfterPart(e){e.__insert(this.startNode=c()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;v(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=_,e(this)}const e=this.__pendingValue;e!==_&&(k(e)?e!==this.value&&this.__commitText(e):e instanceof $?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):A(e)?this.__commitIterable(e):e===f?(this.value=f,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,a="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=a:this.__commitNode(document.createTextNode(a)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof b&&this.value.template===t)this.value.update(e.values);else{const a=new b(t,e.processor,this.options),i=a._clone();a.update(e.values),this.__commitNode(i),this.value=a}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let a,i=0;for(const s of e)a=t[i],void 0===a&&(a=new O(this.options),t.push(a),0===i?a.appendIntoPart(this):a.insertAfterPart(t[i-1])),a.setValue(s),a.commit(),i++;i<t.length&&(t.length=i,this.clear(a&&a.endNode))}clear(e=this.startNode){i(this.startNode.parentNode,e.nextSibling,this.endNode)}}class j{constructor(e,t,a){if(this.value=void 0,this.__pendingValue=void 0,2!==a.length||""!==a[0]||""!==a[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=a}setValue(e){this.__pendingValue=e}commit(){for(;v(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=_,e(this)}if(this.__pendingValue===_)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=_}}class C extends x{constructor(e,t,a){super(e,t,a),this.single=2===a.length&&""===a[0]&&""===a[1]}_createPart(){return new T(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class T extends S{}let M=!1;(()=>{try{const e={get capture(){return M=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class E{constructor(e,t,a){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=a,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;v(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=_,e(this)}if(this.__pendingValue===_)return;const e=this.__pendingValue,t=this.value,a=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),i=null!=e&&(null==t||a);a&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),i&&(this.__options=z(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=_}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const z=e=>e&&(M?{capture:e.capture,passive:e.passive,once:e.once}:e.capture)
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
     */;function D(e){let t=N.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},N.set(e.type,t));let a=t.stringsArray.get(e.strings);if(void 0!==a)return a;const i=e.strings.join(s);return a=t.keyString.get(i),void 0===a&&(a=new r(e,e.getTemplateElement()),t.keyString.set(i,a)),t.stringsArray.set(e.strings,a),a}const N=new Map,q=new WeakMap;
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
class{handleAttributeExpressions(e,t,a,i){const s=t[0];if("."===s){return new C(e,t.slice(1),a).parts}if("@"===s)return[new E(e,t.slice(1),i.eventContext)];if("?"===s)return[new j(e,t.slice(1),a)];return new x(e,t,a).parts}handleTextExpression(e){return new O(e)}};
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
     */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const L=(e,...t)=>new $(e,t,"html",P)
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
     */,R=(e,t)=>`${e}--${t}`;let V=!0;void 0===window.ShadyCSS?V=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),V=!1);const U=e=>t=>{const a=R(t.type,e);let i=N.get(a);void 0===i&&(i={stringsArray:new WeakMap,keyString:new Map},N.set(a,i));let n=i.stringsArray.get(t.strings);if(void 0!==n)return n;const o=t.strings.join(s);if(n=i.keyString.get(o),void 0===n){const a=t.getTemplateElement();V&&window.ShadyCSS.prepareTemplateDom(a,e),n=new r(t,a),i.keyString.set(o,n)}return i.stringsArray.set(t.strings,n),n},I=["html","svg"],F=new Set,H=(e,t,a)=>{F.add(e);const i=a?a.element:document.createElement("template"),s=t.querySelectorAll("style"),{length:n}=s;if(0===n)return void window.ShadyCSS.prepareTemplateStyles(i,e);const o=document.createElement("style");for(let e=0;e<n;e++){const t=s[e];t.parentNode.removeChild(t),o.textContent+=t.textContent}(e=>{I.forEach(t=>{const a=N.get(R(t,e));void 0!==a&&a.keyString.forEach(e=>{const{element:{content:t}}=e,a=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{a.add(e)}),u(e,a)})})})(e);const r=i.content;a?function(e,t,a=null){const{element:{content:i},parts:s}=e;if(null==a)return void i.appendChild(t);const n=document.createTreeWalker(i,133,null,!1);let o=p(s),r=0,d=-1;for(;n.nextNode();){d++;for(n.currentNode===a&&(r=m(t),a.parentNode.insertBefore(t,a));-1!==o&&s[o].index===d;){if(r>0){for(;-1!==o;)s[o].index+=r,o=p(s,o);return}o=p(s,o)}}}(a,o,r.firstChild):r.insertBefore(o,r.firstChild),window.ShadyCSS.prepareTemplateStyles(i,e);const d=r.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==d)t.insertBefore(d.cloneNode(!0),t.firstChild);else if(a){r.insertBefore(o,r.firstChild);const e=new Set;e.add(o),u(a,e)}};window.JSCompiler_renameProperty=(e,t)=>e;const Y={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},B=(e,t)=>t!==e&&(t==t||e==e),W={attribute:!0,type:String,converter:Y,reflect:!1,hasChanged:B};class G extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach((t,a)=>{const i=this._attributeNameForProperty(a,t);void 0!==i&&(this._attributeToPropertyMap.set(i,a),e.push(i))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,t)=>this._classProperties.set(t,e))}}static createProperty(e,t=W){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const a="symbol"==typeof e?Symbol():"__"+e,i=this.getPropertyDescriptor(e,a,t);void 0!==i&&Object.defineProperty(this.prototype,e,i)}static getPropertyDescriptor(e,t,a){return{get(){return this[t]},set(i){const s=this[e];this[t]=i,this.requestUpdateInternal(e,s,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||W}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const a of t)this.createProperty(a,e[a])}}static _attributeNameForProperty(e,t){const a=t.attribute;return!1===a?void 0:"string"==typeof a?a:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,a=B){return a(e,t)}static _propertyValueFromAttribute(e,t){const a=t.type,i=t.converter||Y,s="function"==typeof i?i:i.fromAttribute;return s?s(e,a):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const a=t.type,i=t.converter;return(i&&i.toAttribute||Y.toAttribute)(e,a)}initialize(){this._updateState=0,this._updatePromise=new Promise(e=>this._enableUpdatingResolver=e),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,a){t!==a&&this._attributeToProperty(e,a)}_propertyToAttribute(e,t,a=W){const i=this.constructor,s=i._attributeNameForProperty(e,a);if(void 0!==s){const e=i._propertyValueToAttribute(t,a);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(s):this.setAttribute(s,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const a=this.constructor,i=a._attributeToPropertyMap.get(e);if(void 0!==i){const e=a.getPropertyOptions(i);this._updateState=16|this._updateState,this[i]=a._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,a){let i=!0;if(void 0!==e){const s=this.constructor;a=a||s.getPropertyOptions(e),s._valueHasChanged(this[e],t,a.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==a.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,a))):i=!1}!this._hasRequestedUpdate&&i&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((e,t)=>this._propertyToAttribute(t,this[t],e)),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}G.finalized=!0;
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
const K=e=>t=>"function"==typeof t?((e,t)=>(window.customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:a,elements:i}=t;return{kind:a,elements:i,finisher(t){window.customElements.define(e,t)}}})(e,t),Q=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?Object.assign(Object.assign({},t),{finisher(a){a.createProperty(t.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(a){a.createProperty(t.key,e)}};function Z(e){return(t,a)=>void 0!==a?((e,t,a)=>{t.constructor.createProperty(a,e)})(e,t,a):Q(e,t)}function J(e){return Z({attribute:!1,hasChanged:null==e?void 0:e.hasChanged})}const X=(e,t,a)=>{Object.defineProperty(t,a,e)},ee=(e,t)=>({kind:"method",placement:"prototype",key:t.key,descriptor:e})
/**
    @license
    Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
    This code may only be used under the BSD style license found at
    http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
    http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
    found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
    part of the polymer project is also subject to an additional IP rights grant
    found at http://polymer.github.io/PATENTS.txt
    */,te=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ae=Symbol();class ie{constructor(e,t){if(t!==ae)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(te?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const se=(e,...t)=>{const a=t.reduce((t,a,i)=>t+(e=>{if(e instanceof ie)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(a)+e[i+1],e[0]);return new ie(a,ae)};
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const ne={};class oe extends G{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,a)=>e.reduceRight((e,a)=>Array.isArray(a)?t(a,e):(e.add(a),e),a),a=t(e,new Set),i=[];a.forEach(e=>i.unshift(e)),this._styles=i}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map(e=>{if(e instanceof CSSStyleSheet&&!te){const t=Array.prototype.slice.call(e.cssRules).reduce((e,t)=>e+t.cssText,"");return new ie(String(t),ae)}return e})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?te?this.renderRoot.adoptedStyleSheets=e.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==ne&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){return ne}}oe.finalized=!0,oe.render=(e,t,a)=>{if(!a||"object"!=typeof a||!a.scopeName)throw new Error("The `scopeName` option is required.");const s=a.scopeName,n=q.has(t),o=V&&11===t.nodeType&&!!t.host,r=o&&!F.has(s),d=r?document.createDocumentFragment():t;if(((e,t,a)=>{let s=q.get(t);void 0===s&&(i(t,t.firstChild),q.set(t,s=new O(Object.assign({templateFactory:D},a))),s.appendInto(t)),s.setValue(e),s.commit()})(e,d,Object.assign({templateFactory:U(s)},a)),r){const e=q.get(d);q.delete(d);const a=e.value instanceof b?e.value.template:void 0;H(s,d,a),i(t,t.firstChild),t.appendChild(d),q.set(t,e)}!n&&o&&window.ShadyCSS.styleElement(t.host)};var re=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,de="[^\\s]+",le=/\[([^]*?)\]/gm;function ce(e,t){for(var a=[],i=0,s=e.length;i<s;i++)a.push(e[i].substr(0,t));return a}var he=function(e){return function(t,a){var i=a[e].map((function(e){return e.toLowerCase()})).indexOf(t.toLowerCase());return i>-1?i:null}};function ue(e){for(var t=[],a=1;a<arguments.length;a++)t[a-1]=arguments[a];for(var i=0,s=t;i<s.length;i++){var n=s[i];for(var o in n)e[o]=n[o]}return e}var me=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],pe=["January","February","March","April","May","June","July","August","September","October","November","December"],ge=ce(pe,3),ve={dayNamesShort:ce(me,3),dayNames:me,monthNamesShort:ge,monthNames:pe,amPm:["am","pm"],DoFn:function(e){return e+["th","st","nd","rd"][e%10>3?0:(e-e%10!=10?1:0)*e%10]}},_e=ue({},ve),fe=function(e,t){for(void 0===t&&(t=2),e=String(e);e.length<t;)e="0"+e;return e},be={D:function(e){return String(e.getDate())},DD:function(e){return fe(e.getDate())},Do:function(e,t){return t.DoFn(e.getDate())},d:function(e){return String(e.getDay())},dd:function(e){return fe(e.getDay())},ddd:function(e,t){return t.dayNamesShort[e.getDay()]},dddd:function(e,t){return t.dayNames[e.getDay()]},M:function(e){return String(e.getMonth()+1)},MM:function(e){return fe(e.getMonth()+1)},MMM:function(e,t){return t.monthNamesShort[e.getMonth()]},MMMM:function(e,t){return t.monthNames[e.getMonth()]},YY:function(e){return fe(String(e.getFullYear()),4).substr(2)},YYYY:function(e){return fe(e.getFullYear(),4)},h:function(e){return String(e.getHours()%12||12)},hh:function(e){return fe(e.getHours()%12||12)},H:function(e){return String(e.getHours())},HH:function(e){return fe(e.getHours())},m:function(e){return String(e.getMinutes())},mm:function(e){return fe(e.getMinutes())},s:function(e){return String(e.getSeconds())},ss:function(e){return fe(e.getSeconds())},S:function(e){return String(Math.round(e.getMilliseconds()/100))},SS:function(e){return fe(Math.round(e.getMilliseconds()/10),2)},SSS:function(e){return fe(e.getMilliseconds(),3)},a:function(e,t){return e.getHours()<12?t.amPm[0]:t.amPm[1]},A:function(e,t){return e.getHours()<12?t.amPm[0].toUpperCase():t.amPm[1].toUpperCase()},ZZ:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+fe(100*Math.floor(Math.abs(t)/60)+Math.abs(t)%60,4)},Z:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+fe(Math.floor(Math.abs(t)/60),2)+":"+fe(Math.abs(t)%60,2)}},we=function(e){return+e-1},ye=[null,"[1-9]\\d?"],$e=[null,de],ke=["isPm",de,function(e,t){var a=e.toLowerCase();return a===t.amPm[0]?0:a===t.amPm[1]?1:null}],Ae=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(e){var t=(e+"").match(/([+-]|\d\d)/gi);if(t){var a=60*+t[1]+parseInt(t[2],10);return"+"===t[0]?a:-a}return 0}],xe=(he("monthNamesShort"),he("monthNames"),{default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",isoDate:"YYYY-MM-DD",isoDateTime:"YYYY-MM-DDTHH:mm:ssZ",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"});var Se=function(e,t,a){if(void 0===t&&(t=xe.default),void 0===a&&(a={}),"number"==typeof e&&(e=new Date(e)),"[object Date]"!==Object.prototype.toString.call(e)||isNaN(e.getTime()))throw new Error("Invalid Date pass to format");var i=[];t=(t=xe[t]||t).replace(le,(function(e,t){return i.push(t),"@@@"}));var s=ue(ue({},_e),a);return(t=t.replace(re,(function(t){return be[t](e,s)}))).replace(/@@@/g,(function(){return i.shift()}))};(function(){try{(new Date).toLocaleDateString("i")}catch(e){return"RangeError"===e.name}})(),function(){try{(new Date).toLocaleString("i")}catch(e){return"RangeError"===e.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(e){return"RangeError"===e.name}}();function Oe(e){return e.substr(0,e.indexOf("."))}function je(e){return e.substr(e.indexOf(".")+1)}var Ce="hass:bookmark",Te=function(e,t,a,i){i=i||{},a=null==a?{}:a;var s=new Event(t,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});return s.detail=a,e.dispatchEvent(s),s},Me={alert:"hass:alert",automation:"hass:playlist-play",calendar:"hass:calendar",camera:"hass:video",climate:"hass:thermostat",configurator:"hass:settings",conversation:"hass:text-to-speech",device_tracker:"hass:account",fan:"hass:fan",group:"hass:google-circles-communities",history_graph:"hass:chart-line",homeassistant:"hass:home-assistant",homekit:"hass:home-automation",image_processing:"hass:image-filter-frames",input_boolean:"hass:drawing",input_datetime:"hass:calendar-clock",input_number:"hass:ray-vertex",input_select:"hass:format-list-bulleted",input_text:"hass:textbox",light:"hass:lightbulb",mailbox:"hass:mailbox",notify:"hass:comment-alert",person:"hass:account",plant:"hass:flower",proximity:"hass:apple-safari",remote:"hass:remote",scene:"hass:google-pages",script:"hass:file-document",sensor:"hass:eye",simple_alarm:"hass:bell",sun:"hass:white-balance-sunny",switch:"hass:flash",timer:"hass:timer",updater:"hass:cloud-upload",vacuum:"hass:robot-vacuum",water_heater:"hass:thermometer",weblink:"hass:open-in-new"};function Ee(e,t){if(e in Me)return Me[e];switch(e){case"alarm_control_panel":switch(t){case"armed_home":return"hass:bell-plus";case"armed_night":return"hass:bell-sleep";case"disarmed":return"hass:bell-outline";case"triggered":return"hass:bell-ring";default:return"hass:bell"}case"binary_sensor":return t&&"off"===t?"hass:radiobox-blank":"hass:checkbox-marked-circle";case"cover":return"closed"===t?"hass:window-closed":"hass:window-open";case"lock":return t&&"unlocked"===t?"hass:lock-open":"hass:lock";case"media_player":return t&&"off"!==t&&"idle"!==t?"hass:cast-connected":"hass:cast";case"zwave":switch(t){case"dead":return"hass:emoticon-dead";case"sleeping":return"hass:sleep";case"initializing":return"hass:timer-sand";default:return"hass:z-wave"}default:return console.warn("Unable to find icon for domain "+e+" ("+t+")"),Ce}}var ze=function(e,t,a){void 0===a&&(a=!1),a?history.replaceState(null,"",t):history.pushState(null,"",t),Te(window,"location-changed",{replace:a})},De={humidity:"hass:water-percent",illuminance:"hass:brightness-5",temperature:"hass:thermometer",pressure:"hass:gauge",power:"hass:flash",signal_strength:"hass:wifi"},Ne={binary_sensor:function(e){var t=e.state&&"off"===e.state;switch(e.attributes.device_class){case"battery":return t?"hass:battery":"hass:battery-outline";case"cold":return t?"hass:thermometer":"hass:snowflake";case"connectivity":return t?"hass:server-network-off":"hass:server-network";case"door":return t?"hass:door-closed":"hass:door-open";case"garage_door":return t?"hass:garage":"hass:garage-open";case"gas":case"power":case"problem":case"safety":case"smoke":return t?"hass:shield-check":"hass:alert";case"heat":return t?"hass:thermometer":"hass:fire";case"light":return t?"hass:brightness-5":"hass:brightness-7";case"lock":return t?"hass:lock":"hass:lock-open";case"moisture":return t?"hass:water-off":"hass:water";case"motion":return t?"hass:walk":"hass:run";case"occupancy":return t?"hass:home-outline":"hass:home";case"opening":return t?"hass:square":"hass:square-outline";case"plug":return t?"hass:power-plug-off":"hass:power-plug";case"presence":return t?"hass:home-outline":"hass:home";case"sound":return t?"hass:music-note-off":"hass:music-note";case"vibration":return t?"hass:crop-portrait":"hass:vibrate";case"window":return t?"hass:window-closed":"hass:window-open";default:return t?"hass:radiobox-blank":"hass:checkbox-marked-circle"}},cover:function(e){var t="closed"!==e.state;switch(e.attributes.device_class){case"garage":return t?"hass:garage-open":"hass:garage";case"door":return t?"hass:door-open":"hass:door-closed";case"shutter":return t?"hass:window-shutter-open":"hass:window-shutter";case"blind":return t?"hass:blinds-open":"hass:blinds";case"window":return t?"hass:window-open":"hass:window-closed";default:return Ee("cover",e.state)}},sensor:function(e){var t=e.attributes.device_class;if(t&&t in De)return De[t];if("battery"===t){var a=Number(e.state);if(isNaN(a))return"hass:battery-unknown";var i=10*Math.round(a/10);return i>=100?"hass:battery":i<=0?"hass:battery-alert":"hass:battery-"+i}var s=e.attributes.unit_of_measurement;return"°C"===s||"°F"===s?"hass:thermometer":Ee("sensor")},input_datetime:function(e){return e.attributes.has_date?e.attributes.has_time?Ee("input_datetime"):"hass:calendar":"hass:clock"}};const qe=async()=>{if(customElements.get("ha-checkbox")&&customElements.get("ha-slider"))return;await customElements.whenDefined("partial-panel-resolver");const e=document.createElement("partial-panel-resolver");e.hass={panels:[{url_path:"tmp",component_name:"config"}]},e._updateRoutes(),await e.routerOptions.routes.tmp.load(),await customElements.whenDefined("ha-panel-config");const t=document.createElement("ha-panel-config");await t.routerOptions.routes.automation.load(),e.hass={panels:[{url_path:"tmp",component_name:"developer-tools"}]},e._updateRoutes(),await e.routerOptions.routes.tmp.load(),await customElements.whenDefined("ha-app-layout")},Pe=se`
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
`;var Le={modes_long:{armed_away:"Armed Away",armed_home:"Armed Home",armed_night:"Armed Night",armed_custom_bypass:"Armed Custom"},modes_short:{armed_away:"Away",armed_home:"Home",armed_night:"Night",armed_custom_bypass:"Custom"}},Re={time_slider:{seconds:"sec",minutes:"min",infinite:"infinite",none:"none"},editor:{ui_mode:"Switch to UI",yaml_mode:"Switch to YAML"}},Ve={general:{title:"General",cards:{general:{description:"This panel defines some global settings for the alarm.",fields:{disarm_after_trigger:{heading:"Disarm after trigger",description:"After trigger time has expired, disarm the alarm instead of returning to armed state."},enable_mqtt:{heading:"Enable MQTT",description:"Allow the alarm panel to be controlled through MQTT."},enable_master:{heading:"Enable alarm master",description:"Creates an entity for controlling all areas simultaneously."}},actions:{setup_mqtt:"MQTT Configuration",setup_master:"Master Configuration"}},modes:{title:"Modes",description:"This panel can be used to set up the arm modes of the alarm.",fields:{mode:{armed_away:"Armed away will be used when all people left the house. All doors and windows allowing access to the house will be guarded, as well as motion sensors inside the house.",armed_home:"Armed home (also known as armed stay) will be used when setting the alarm while people are in the house. All doors and windows allowing access to the house will be guarded, but not motion sensors inside the house.",armed_night:"Armed night will be used when setting the alarm before going to sleep. All doors and windows allowing access to the house will be guarded, and selected motion sensors (downstairs) in the house.",armed_custom_bypass:"An extra mode for defining your own security perimeter.",enabled:"Enabled",disabled:"Disabled"},exit_delay:{heading:"Exit delay",description:"When arming the alarm, within this time period the sensors will not trigger the alarm yet."},entry_delay:{heading:"Entry delay",description:"Delay time until the alarm is triggered after one of the sensors is activated."},trigger_time:{heading:"Trigger time",description:"Time during which the siren will sound"}}},mqtt:{title:"MQTT configuration",description:"This panel can be used for configuration of the MQTT interface.",fields:{state_topic:{heading:"State topic",description:"Topic on which state updates are published"},event_topic:{heading:"Event topic",description:"Topic on which alarm events are published"},command_topic:{heading:"Command topic",description:"Topic on which arm/disarm commands are sent."},require_code:{heading:"Require code",description:"Require the code to be sent with the command."},state_payload:{heading:"Configure payload per state",item:"Define a payload for state '{state}'"},command_payload:{heading:"Configure payload per command",item:"Define a payload for command '{command}'"}}},areas:{title:"Areas",description:"Areas can be used for dividing your alarm system into multiple compartments.",no_items:"There are no areas defined yet.",table:{remarks:"Remarks",summary:"This area contains {summary_sensors} and {summary_automations}.",summary_sensors:"{number} sensors",summary_automations:"{number} automations"},actions:{add:"Add"}}},dialogs:{create_area:{title:"New area",fields:{copy_from:"Copy settings from"}},edit_area:{title:"Editing area '{area}'",name_warning:"Note: changing the name will change the entity ID"},remove_area:{title:"Remove area?",description:"Are you sure you want to remove this area? This area contains {sensors} sensors and {automations} automations, which will be removed as well."},edit_master:{title:"Master configuration"},disable_master:{title:"Disable master?",description:"Are you sure you want to remove the alarm master? This area contains {automations} automations, which will be removed with this action."}}},sensors:{title:"Sensors",cards:{sensors:{description:"Currently configured sensors. Click on an entity to make changes.",no_items:"There are no sensors to be displayed here.",table:{arm_modes:"Arm Modes",always_on:"(Always)"},filter:{label:"Filter by area",no_area:"(No area)"}},add_sensors:{title:"Add Sensors",description:"Add more sensors. Make sure that your sensors have a friendly_name, so you can identify them.",no_items:"There are no available HA entities that can be configured for the alarm. Make sure to include entities of the type binary_sensor.",actions:{add_to_alarm:"add to alarm",show_all:"Show all"}},editor:{title:"Edit Sensor",description:"Configuring the sensor settings of '{entity}'.",fields:{name:{heading:"Name",description:"Overwrite friendly name."},area:{heading:"Area",description:"Select an area which contains this sensor."},device_type:{heading:"Device Type",description:"Choose a device type to automatically apply appropriate settings.",choose:{door:{name:"Door",description:"A door, gate or other entrance that is used for entering/leaving the home."},window:{name:"Window",description:"A window, or a door not used for entering the house such as balcony."},motion:{name:"Motion",description:"Presence sensor or similar device having a delay between activations."},tamper:{name:"Tamper",description:"Detector of sensor cover removal, glass break sensor, etc."},environmental:{name:"Environmental",description:"Smoke/gas sensor, leak detector, etc. (not related to burglar protection)."},other:{name:"Generic"}}},always_on:{heading:"Always on",description:"Sensor should always trigger the alarm."},modes:{heading:"Enabled modes",description:"Alarm modes in which this sensor is active."},arm_on_close:{heading:"Arm after closing",description:"After deactivation of this sensor, the remaining exit delay will automatically be skipped."},immediate:{heading:"Immediate",description:"Activating this sensor will trigger the alarm directly instead of after entry delay."},allow_open:{heading:"Allow open while arming",description:"Allow this sensor to be active shortly after leaving such that it will not block arming."},trigger_unavailable:{heading:"Trigger when unavailable",description:"When the sensor state becomes 'unavailable', this will activate the sensor."}},actions:{toggle_advanced:"Advanced settings",remove:"Remove"},errors:{description:"Please correct the following errors:",no_area:"No area is selected",no_modes:"No modes are selected for which the sensor should be active"}}}},codes:{title:"Codes",cards:{codes:{description:"Change settings for the code.",fields:{code_arm_required:{heading:"Use arm code",description:"Require a code for arming the alarm"},code_disarm_required:{heading:"Use disarm code",description:"Require a code for disarming the alarm"},code_format:{heading:"Code format",description:"Sets the input type for Lovelace alarm card.",code_format_number:"pincode",code_format_text:"password"}}},user_management:{title:"User management",description:"Each user has its own code to arm/disarm the alarm.",no_items:"There are no users yet",table:{remarks:"Remarks",administrator:"Administrator"},actions:{new_user:"new user"}},new_user:{title:"Create new user",description:"Users can be created for providing access to operating the alarm.",fields:{name:{heading:"Name",description:"Name of the user."},code:{heading:"Code",description:"Code for this user."},confirm_code:{heading:"Confirm code",description:"Repeat the code."},is_admin:{heading:"User is administrator",description:"Allow user to make changes"},can_arm:{heading:"Allow code for arming",description:"Entering this code activates the alarm"},can_disarm:{heading:"Allow code for disarming",description:"Entering this code deactivates the alarm"},is_override_code:{heading:"Is override code",description:"Entering this code will arm the alarm in force"}},errors:{no_name:"No name provided.",no_code:"Code should have 4 characters/numbers minimum.",code_mismatch:"The codes don't match."}},edit_user:{title:"Edit User",description:"Change configuration for user '{name}'.",fields:{old_code:{heading:"Current code",description:"Current code, leave empty to leave unchanged."}}}}},actions:{title:"Actions",cards:{notifications:{title:"Notifications",description:"Using this panel, you can manage notifications to be sent when during a certain alarm event.",table:{enabled:"Enabled",no_items:"There are no notifications created yet."},actions:{new_notification:"new notification"},filter:{label:"Filter by area",no_area:"Alarm master"}},actions:{description:"This panel can be used to switch a device when the alarm state changes.",table:{no_items:"There are no actions created yet."},actions:{new_action:"new action"}},new_notification:{title:"Create notification",description:"Create a new notification.",fields:{name:{heading:"Name",description:"Description for this notification"},event:{heading:"Event",description:"When should the notification be sent",choose:{armed:{name:"Alarm is armed",description:"The alarm is succesfully armed"},disarmed:{name:"Alarm is disarmed",description:"The alarm is disarmed"},triggered:{name:"Alarm is triggered",description:"The alarm is triggered"},arm_failure:{name:"Failed to arm",description:"The arming of the alarm failed due to one or more open sensors"},arming:{name:"Exit delay started",description:"Exit delay started, ready to leave the house."},pending:{name:"Entry delay started",description:"Entry delay started, the alarm will trigger soon."}}},mode:{heading:"Mode",description:"Limit the action to specific arm modes (optional)"},title:{heading:"Title",description:"Title for the notification message"},message:{heading:"Message",description:"Content of the notification message"},target:{heading:"Target",description:"Device to send the push message to"}},actions:{test:"Try it"}},new_action:{title:"Create action",description:"This panel can be used to switch a device when the alarm state changes.",fields:{name:{heading:"Name",description:"Description for this action"},event:{heading:"Event",description:"When should the action be executed"},area:{heading:"Area",description:"Area for which the event applies, leave empty to select the global alarm."},mode:{heading:"Mode",description:"Limit the action to specific arm modes (optional)"},entity:{heading:"Entity",description:"Entity to perform action on"},action:{heading:"Action",description:"Action to perform on the entity",turn_on:"Turn on",turn_off:"Turn off"}}}},validation_errors:{no_triggers:"No state or event provided for the triggering of this automation.",empty_trigger:"One of the triggers has no state or event provided.",invalid_trigger:"One of the triggers has an invalid value: {trigger}",invalid_mode:"Invalid input provided for 'mode': {mode}",no_actions:"No actions are provided to be performed by this automation.",no_service:"One of the actions is missing a service.",invalid_service:"An invalid service name was provided for one of the actions: {service}",no_service_data:"No service data was provided for one of the actions.",no_entity_in_service_data:"No entity_id was provided in the service_data of one of the actions.",no_message_in_service_data:"No message was provided in the service_data of one of the actions."}}},Ue={common:Le,components:Re,title:"Alarm panel",panels:Ve},Ie={modes_long:{armed_away:"Valvestatud eemal",armed_home:"Valvestatud kodus",armed_night:"Valvestatud ööseks",armed_custom_bypass:"Valikuline valvestus"},modes_short:{armed_away:"Eemal",armed_home:"Kodus",armed_night:"Ööseks",armed_custom_bypass:"Valikuline"}},Fe={time_slider:{seconds:"sek",minutes:"min",infinite:"piiranguta",none:"puudub"},editor:{ui_mode:"Kasutajaliides",yaml_mode:"Koodiredaktor"}},He={general:{title:"Üldsätted",cards:{general:{description:"Need seaded kehtivad kõikides valve olekutes.",fields:{disarm_after_trigger:{heading:"Häire summutamine",description:"Peale häire lõppu võta valvest maha miite ära valvesta uuesti."},enable_mqtt:{heading:"Luba MQTT juhtimine",description:"Luba nupustiku juhtimist MQTT abil."},enable_master:{heading:"Luba põhivalvestus",description:"Loob olemi mis haldab kõiki valvestamise alasid korraga."}},actions:{setup_mqtt:"MQTT seadistamine",setup_master:"Põhivalvestuse sätted"}},modes:{title:"Režiimid",description:"Selles vaates seadistatakse valvestamise režiime.",fields:{mode:{armed_away:"Täielik valvestamine kui kedagi pole kodus. Kasutusel on kõik andurid.",armed_home:"Valvestatud kodus ei kasuta liikumisandureid kuid väisuksed ja aknad on valve all.",armed_night:"Valvestatud ööseks ei kasuta määratud liikumisandureid, välisperimeeter on valve all.",armed_custom_bypass:"Valikulise valvestuse puhul saab määrata kasutatavad andurid.",enabled:"Lubatud",disabled:"Keelatud"},exit_delay:{heading:"Ooteaeg valvestamisel",description:"Viivitus enne valvestamise rakendumist."},entry_delay:{heading:"Sisenemise viivitus",description:"Viivitus sisenemisel enne häire rakendumist."},trigger_time:{heading:"Häire kestus",description:"Sireeni jne. aktiveerimise kestus."}}},mqtt:{title:"MQTT sätted",description:"MQTT parameetrite seadistamine.",fields:{state_topic:{heading:"Oleku teema (topic)",description:"Teema milles avaldatakse oleku muutused."},command_topic:{heading:"Käskude teema (topic)",description:"Teema milles avaldatakse valvestamise käsud."},require_code:{heading:"Nõua PIN koodi",description:"Käskude edastamiseks on vajalik PIN kood."},state_payload:{heading:"Määra olekute toimeandmed",item:"Määra oleku '{state}' toimeandmed"},command_payload:{heading:"Määra käskude toimeandmed",item:"Määra käsu '{command}' toimeandmed"}}},areas:{title:"Alad",description:"Alasid kasutatakse elamise jagamiseks valvetsoonideks.",no_items:"Valvestamise alad on loomata.",table:{remarks:"Ala teave",summary:"See ala sisaldab {summary_sensors} ja {summary_automations}.",summary_sensors:"{number} andur(it)",summary_automations:"{number} automatiseering(ut)"},actions:{add:"Lisa"}}},dialogs:{create_area:{title:"Uus ala",fields:{copy_from:"Kopeeri sätted allikast:"}},edit_area:{title:"Ala '{area}' muutmine",name_warning:"NB! Nime muutmisel muutub ka olemi ID"},remove_area:{title:"Kas kustutada ala?",description:"Kas kustutada see ala? Ala kaasab andurid {sensors} ja automatiseeringud {automations} mis samuti eemaldatakse."},edit_master:{title:"Põhiala seaded"},disable_master:{title:"Kas keelata põhiala?",description:"Kas keelata põhiala? Ala kaasab andurid {sensors} ja automatiseeringud {automations} mis samuti eemaldatakse.."}}},sensors:{title:"Andurid",cards:{sensors:{description:"Kasutusel olevad andurid. Klõpsa olemil, et seadistada.",no_items:"Andureid pole lisatud. Alustuseks lisa mõni andur.",table:{arm_modes:"Valvestamise olek",always_on:"(alati)"},filter:{label:"Sordi ala järgi",no_area:"(Alad puuduvad)"}},add_sensors:{title:"Andurite lisamine",description:"Lisa veel andureid. Mõistlik on panna neile arusaadav nimi (friendly_name).",no_items:"Puuduvad valvestamiseks sobivad Home Assistanti olemid. Lisatavad olemid peavad olema olekuandurid (binary_sensor).",actions:{add_to_alarm:"Lisa valvesüsteemile",show_all:"Kuva kõik andurid"}},editor:{title:"Andurite sätted",description:"Muuda olemi '{entity}' sätteid.",fields:{name:{heading:"Nimi",description:"Muuda kuvatavat nime."},area:{heading:"Ala",description:"Vali ala kus see andur asub."},device_type:{heading:"Seadme tüüp",description:"Vali anduri tüüp, et automaatselt rakendada sobivad sätted.",choose:{door:{name:"Uks",description:"Uks, värav või muu piire mida kasutatakse sisenemiseks või väljumiseks."},window:{name:"Aken",description:"Aken või uks mida ei kasutata sisenemiseks nagu rõduuks."},motion:{name:"Liikumisandur",description:"Kohaloleku andurid mille rakendumiste vahel on viide."},tamper:{name:"Terviklikkus",description:"Anduri muukimine või klaasipurustusandur jms."},environmental:{name:"Ohu andurid",description:"Suitsu või gaasilekke andur, veeleke jne. (ei ole seotud sissetungimisega)."},other:{name:"Tavaandur"}}},always_on:{heading:"Alati kasutusel",description:"Andur käivitab häire igas valve olekus."},modes:{heading:"Valve olekute valik",description:"Valve olekud kus seda andurit kasutatakse."},arm_on_close:{heading:"Valvesta sulgemisel",description:"Selle anduri rakendumisel valvestatakse kohe ilma viiveta."},immediate:{heading:"Viivituseta",description:"Andur annab häire ilma viiteta."},allow_open:{heading:"Lahkumisviivitus",description:"See andur ei aktiveeru enne lahkumisviivituse lõppu."},trigger_unavailable:{heading:"Andurite saadavus",description:"Käivita häire kui andur muutub kättesaamatuks."}},actions:{toggle_advanced:"Täpsemad sätted",remove:"Eemalda"},errors:{description:"Palun paranda jägmised vead:",no_area:"Ala pole määratud",no_modes:"Anduri tüüp on määramata, ei tea kuida kasutada"}}}},codes:{title:"Koodid",cards:{codes:{description:"Valvestuskoodide muutmine.",fields:{code_arm_required:{heading:"Valvestamine koodiga",description:"Valvestamiseks tuleb sisestada kood"},code_disarm_required:{heading:"Valvest vabastamise kood",description:"Valvest vabastamiseks tulem sisestada kood"},code_format:{heading:"Koodi vorming",description:"Kasutajaliidese koodi tüübid.",code_format_number:"PIN kood",code_format_text:"Salasõna"}}},user_management:{title:"Kasutajate haldus",description:"Igal kasutajal on oma juhtkood.",no_items:"Kasutajaid pole määratud",table:{remarks:"Märkused",administrator:"Haldaja"},actions:{new_user:"Uus kasutaja"}},new_user:{title:"Lisa uus kasutaja",description:"Valvesüsteemi kasutaja lisamine.",fields:{name:{heading:"Nimi",description:"Kasutaja nimi."},code:{heading:"Valvestuskood",description:"Selle kasutaja kood."},confirm_code:{heading:"Koodi kinnitamine",description:"Sisesta sama kood uuesti."},is_admin:{heading:"Kasutajal on haldusõigused",description:"Kasutaja saab teha muudatusi."},can_arm:{heading:"Tohib valvestada",description:"Koodi sisestamine valvestab."},can_disarm:{heading:"Tohib valvest maha võtta",description:"Koodi sisestamine võtab valvest maha."},is_override_code:{heading:"Alistuskood",description:"Koodi sisestamine käivitab kohese häire"}},errors:{no_name:"Nimi puudub.",no_code:"Kood peab olema vhemalt 4 tärki.",code_mismatch:"Sisestatud koodid ei klapi."}},edit_user:{title:"Muuda kasutaja sätteid",description:"Muuda kasutaja '{name}' sätteid.",fields:{old_code:{heading:"Kehtiv kood",description:"Kehtiv kood, jäta tühjaks kui ei taha muuta."}}}}},actions:{title:"Toimingud",cards:{notifications:{title:"Teavitused",description:"Halda saadetavaid teavitusi",table:{enabled:"Lubatud",no_items:"Teavitusi pole veel loodud."},actions:{new_notification:"Uus teavitus"},filter:{label:"Sordi alade järgi",no_area:"Põhiala"}},actions:{description:"Arenduses, mõeldud seadmete lülitamiseks.",table:{no_items:"Toiminguid pole veel määratud."},actions:{new_action:"Uus toiming"}},new_notification:{title:"Loo teavitus",description:"Uue teavituse loomine.",fields:{name:{heading:"Nimi",description:"Teavituse kirjeldus"},event:{heading:"Sündmus",description:"Mille puhul teavitada",choose:{armed:{name:"Valvestatud",description:"Valvestamine oli edukas"},disarmed:{name:"Valvest maas",description:"Valve mahavõtmine õnnestus"},triggered:{name:"Häire",description:"Valvesüsteem andis häire"},arm_failure:{name:"Valvestamine nurjus",description:"Valvestamine ei õnnestunud mõne anduri oleku või vea tõttu"},arming:{name:"Valvestamise eelne viivitus algas",description:"Algas valvestamise eelviide, majast võib lahkuda."},pending:{name:"Sisenemise viide rakendus",description:"Märgati sisenemist, häire rakendub peale viidet."}}},mode:{heading:"Olek",description:"Millises valve olekus teavitada (valikuline)"},title:{heading:"Päis",description:"Teavitussõnumi päis"},message:{heading:"Sisu",description:"Teavitussõnumi tekst"},target:{heading:"Saaja",description:"Seade millele edastada teavitus"}},actions:{test:"Try it"}},new_action:{title:"Loo toiming",description:"Seadme oleku muutmine valve oleku muutmisel.",fields:{name:{heading:"Nimi",description:"Toimingu kirjeldus"},event:{heading:"Sündmus",description:"Millisel juhul käivitada toiming"},area:{heading:"Ala",description:"Ala millele sündmus rakendub, põhiala puhul jäta tühjaks."},mode:{heading:"Olek",description:"Millises valve olekus toiming käivitada (valikuline)"},entity:{heading:"Olem",description:"Toimingu olem"},action:{heading:"Toiming",description:"Olemi toiming",turn_on:"Lülita sisse",turn_off:"Lülita välja"}}}},validation_errors:{no_triggers:"Selle tegevuse käivitamiseks puudub vajalik olek või sündmus.",empty_trigger:"Ühel päästikul puudub oleku või sündmuse tingimus.",invalid_trigger:"Ühel päästikul: {trigger} on vigane väärtus",invalid_mode:"Valve olekule: {mode} on sisestatud vigane väärtus",no_actions:"Sellele toimingule pole määratud tegevust.",no_service:"Ühel toimingutest puudub nõutav teenus.",invalid_service:"Ühele toimingule on omistatud sobimatu teenus: {service}",no_service_data:"Ühel toimingul puuduvad teenuse andmed.",no_entity_in_service_data:"Ühel toimingul puudub teenuse andmetes olemi ID.",no_message_in_service_data:"Ühe toimingu teenuse andmetes puuduvad teenuse andmed."}}},Ye={common:Ie,components:Fe,title:"Alarm panel",panels:He},Be={modes_long:{armed_away:"Ingeschakeld Weg",armed_home:"Ingeschakeld Thuis",armed_night:"Ingeschakeld Nacht",armed_custom_bypass:"Ingeschakeld Aangepast"},modes_short:{armed_away:"Weg",armed_home:"Thuis",armed_night:"Nacht",armed_custom_bypass:"Aangepast"}},We={time_slider:{seconds:"sec",minutes:"min",infinite:"oneindig",none:"geen"},editor:{ui_mode:"Wissel naar UI",yaml_mode:"Wissel naar YAML"}},Ge={general:{title:"Algemeen",cards:{general:{description:"Dit paneel definieert enkele instellingen die van toepassing zijn op alle inschakelmodi.",fields:{disarm_after_trigger:{heading:"Uitschakelen na activatie",description:"Nadat de triggertijd is verstreken, schakelt u het alarm uit in plaats van terug te keren naar de ingeschakelde toestand."},enable_mqtt:{heading:"MQTT inschakelen",description:"Allow the alarm panel to be controlled through MQTT."},enable_master:{heading:"Master alarm inschakelen",description:"Creëert een entiteit om alle gebieden tegelijkertijd te besturen."}},actions:{setup_mqtt:"MQTT Configuratie",setup_master:"Master configuratie"}},modes:{title:"Modi",description:"Dit paneel kan worden gebruikt om de inschakelmodi van het alarm in te stellen.",fields:{mode:{armed_away:"Ingeschakeld weg wordt gebruikt als alle mensen het huis hebben verlaten. Alle deuren en ramen die toegang geven tot het huis worden bewaakt, evenals bewegingssensoren in het huis.",armed_home:"Ingeschakeld thuis (ook wel ingeschakeld thuisblijven genoemd) wordt gebruikt bij het instellen van het alarm terwijl er mensen in huis zijn. Alle deuren en ramen die toegang geven tot het huis worden bewaakt, maar bewegingssensoren in het huis worden niet gebruikt.",armed_night:"Ingeschakeld nacht wordt gebruikt bij het instellen van het alarm voordat u gaat slapen. Alle deuren en ramen die toegang geven tot het huis worden bewaakt, en geselecteerde bewegingssensoren (beneden) in het huis.",armed_custom_bypass:"Een extra modus om uw eigen beveiligingsperimeter te definiëren.",enabled:"Enabled",disabled:"Disabled"},exit_delay:{heading:"Vertrek vertraging",description:"Bij het inschakelen van het alarm zullen de sensoren binnen deze tijdsperiode het alarm nog niet activeren."},entry_delay:{heading:"Binnenkomst vertraging",description:"Vertragingstijd totdat het alarm afgaat nadat een van de sensoren is geactiveerd."},trigger_time:{heading:"Activeer tijd",description:"Tijd waarin de sirene af gaat."}}},mqtt:{title:"MQTT configuratie",description:"Dit paneel kan worden gebruikt voor configuratie van de MQTT-interface.",fields:{state_topic:{heading:"Toestand topic",description:"Topic waarop statusupdates worden gepubliceerd"},command_topic:{heading:"Commando topic",description:"Topic waarop commando's voor in- / uitschakelen worden verzonden."},require_code:{heading:"Vereis code",description:"Vereis dat de code wordt verzonden met de opdracht."},state_payload:{heading:"Configureer de payload per toestand",item:"Definieer een payload voor toestand '{state}'"},command_payload:{heading:"Configureer een payload per commando",item:"Definieer een payload voor commando '{command}'"}}},areas:{title:"Gebieden",description:"Gebieden kunnen worden gebruikt om uw alarmsysteem in meerdere compartimenten op te delen.",no_items:"Er zijn nog geen gebieden gedefinieerd.",table:{remarks:"Opmerkingen",summary:"Dit gebied bevat {summary_sensors} en {summary_automations}.",summary_sensors:"{number} sensoren",summary_automations:"{number} automatiseringen"},actions:{add:"Toevoegen"}}},dialogs:{create_area:{title:"Nieuw gebied",fields:{copy_from:"Kopieer instellingen van"}},edit_area:{title:"Bewerken van gebied '{area}'",name_warning:"Opmerking: als u de naam wijzigt, wordt de entiteits-ID gewijzigd"},remove_area:{title:"Gebied verwijderen?",description:"Weet u zeker dat u dit gebied wilt verwijderen? Dit gebied bevat {sensors} sensoren en {automations} automatiseringen, die ook zullen worden verwijderd."},edit_master:{title:"Master configuratie"},disable_master:{title:"Master uitschakelen?",description:"Weet u zeker dat u het master alarm wilt verwijderen? Dit gebied bevat {automations} automatiseringen, die met deze actie worden verwijderd."}}},sensors:{title:"Sensoren",cards:{sensors:{description:"Momenteel geconfigureerde sensoren. Klik op een entiteit om wijzigingen aan te brengen.",no_items:"Er zijn nog geen sensoren aan het alarm toegevoegd. Zorg ervoor dat u ze eerst toevoegt.",table:{arm_modes:"Inschakelmodi",always_on:"(Altijd)"},filter:{label:"Filter op gebied",no_area:"(Geen gebied)"}},add_sensors:{title:"Voeg sensoren toe",description:"Voeg meer sensoren toe. Zorg ervoor dat uw sensoren een friendly_name hebben, zodat u ze kunt identificeren.",no_items:"Er zijn geen beschikbare HA-entiteiten die voor het alarm kunnen worden geconfigureerd. Zorg ervoor dat u entiteiten van het type binary_sensor opneemt.",actions:{add_to_alarm:"Voeg aan alarm toe",show_all:"Toon alle"}},editor:{title:"Wijzig Sensor",description:"Configureren van de sensorinstellingen van '{entity}'.",fields:{name:{heading:"Naam",description:"Overschrijf vriendelijke naam."},area:{heading:"Gebied",description:"Selecteer een gebied dat deze sensor bevat."},device_type:{heading:"Apparaat Type",description:"Kies een apparaattype om automatisch de juiste instellingen toe te passen.",choose:{door:{name:"Deur",description:"Een deur, poort of andere ingang die wordt gebruikt voor het betreden/verlaten van de woning."},window:{name:"Raam",description:"Een raam of een deur die niet wordt gebruikt om het huis binnen te komen, zoals een balkon."},motion:{name:"Beweging",description:"Aanwezigheidssensor of soortgelijk apparaat met een vertraging tussen activeringen."},tamper:{name:"Sabotage",description:"Detector van verwijdering van sensorkap, glasbreuksensor, enz."},environmental:{name:"Omgeving",description:"Rook/gassensor, lekdetector, etc. (niet gerelateerd aan inbraakbeveiliging)."},other:{name:"Algemeen"}}},always_on:{heading:"Altijd aan",description:"Sensor should always trigger the alarm."},modes:{heading:"Ingeschakelde modi",description:"Alarmmodi waarin deze sensor actief is."},arm_on_close:{heading:"Inschakelen na sluiten",description:"Na deactivering van deze sensor wordt de resterende vertrek vertraging automatisch overgeslagen."},immediate:{heading:"Onmiddelijk",description:"Als deze sensor wordt geactiveerd, wordt het alarm direct geactiveerd in plaats van na de binnenkomst vertraging."},allow_open:{heading:"Sta open toe tijdens het inschakelen",description:"Sta toe dat deze sensor kort na het verlaten actief is, zodat hij het inschakelen niet blokkeert."},trigger_unavailable:{heading:"Activeren indien niet beschikbaar",description:"Wanneer de sensorstatus 'niet beschikbaar' wordt, wordt de sensor geactiveerd."}},actions:{toggle_advanced:"Geavanceerde instellingen",remove:"Verwijder"},errors:{description:"Corrigeer de volgende fouten:",no_area:"Er is geen gebied geselecteerd",no_modes:"Er zijn geen modi geselecteerd waarvoor de sensor actief zou moeten zijn"}}}},codes:{title:"Codes",cards:{codes:{description:"Wijzig de instellingen voor de code.",fields:{code_arm_required:{heading:"Gebruik inschakel code",description:"Vereist een code voor het inschakelen van het alarm"},code_disarm_required:{heading:"Gebruik uitschakelcode",description:"Vereist een code om het alarm uit te schakelen"},code_format:{heading:"Code opmaak",description:"Stelt het invoertype in voor de Lovelace alarmkaart.",code_format_number:"pincode",code_format_text:"wachtwoord"}}},user_management:{title:"Gebruikersbeheer",description:"Elke gebruiker heeft zijn eigen code om het alarm in/uit te schakelen.",no_items:"Er zijn nog geen gebruikers",table:{remarks:"Opmerkingen",administrator:"Beheerder"},actions:{new_user:"nieuwe gebruiker"}},new_user:{title:"Maak een nieuwe gebruiker aan",description:"Gebruikers kunnen worden aangemaakt om toegang te verlenen tot het bedienen van het alarm.",fields:{name:{heading:"Naam",description:"Naam van de gebruiker."},code:{heading:"Code",description:"Code voor deze gebruiker."},confirm_code:{heading:"Bevestig de code",description:"Herhaal de code."},is_admin:{heading:"Gebruiker is beheerder",description:"Sta de gebruiker toe om wijzigingen aan te brengen"},can_arm:{heading:"Code toestaan voor inschakeling",description:"Door deze code in te voeren, wordt het alarm geactiveerd"},can_disarm:{heading:"Code toestaan voor uitschakelen",description:"Door deze code in te voeren, wordt het alarm gedeactiveerd"},is_override_code:{heading:"Is een forceer code",description:"Als u deze code invoert, wordt het alarm geforceerd geactiveerd"}},errors:{no_name:"Geen naam opgegeven.",no_code:"Code moet minimaal 4 tekens/cijfers bevatten.",code_mismatch:"De codes komen niet overeen."}},edit_user:{title:"Wijzig Gebruiker",description:"Wijzig de configuratie voor gebruiker '{name}'.",fields:{old_code:{heading:"Huidige code",description:"Huidige code, laat leeg om ongewijzigd te laten."}}}}},actions:{title:"Acties",cards:{notifications:{title:"Meldingen",description:"Met dit paneel kunt u meldingen beheren die moeten worden verzonden tijdens een bepaalde alarmgebeurtenis",table:{enabled:"Ingeschakeld",no_items:"Er zijn nog geen notificaties aangemaakt."},actions:{new_notification:"nieuwe melding"},filter:{label:"Filter op gebied",no_area:"Alarm master"}},actions:{description:"Dit paneel kan worden gebruikt om een apparaat te schakelen wanneer de status van het alarm veranderd.",table:{no_items:"Er zijn nog geen acties gemaakt."},actions:{new_action:"nieuwe actie"}},new_notification:{title:"Maak een melding",description:"Maak een nieuwe melding.",fields:{name:{heading:"Naam",description:"Beschrijving voor deze melding"},event:{heading:"Gebeurtenis",description:"Wanneer moet de melding worden verzonden",choose:{armed:{name:"Alarm is is ingeschakeld",description:"Het alarm is succesvol ingeschakeld"},disarmed:{name:"Alarm is uitgeschakeld",description:"Het alarm is uitgeschakeld"},triggered:{name:"Alarm is afgegaan",description:"Het alarm gaat af"},arm_failure:{name:"Kan niet inschakelen",description:"Het inschakelen van het alarm is mislukt vanwege een of meerdere blokkerende sensoren"},arming:{name:"Vertrek",description:"Vertrekvertraging ingegaan, tijd om het huis te verlaten."},pending:{name:"Binnenkomst",description:"Binnenkomstvertraging ingegaan, het alarm dient te worden uitgeschakeld."}}},mode:{heading:"Mode",description:"Beperk de actie tot specifieke inschakel modi (optioneel)"},title:{heading:"Titel",description:"Titel voor het meldingsbericht"},message:{heading:"Bericht",description:"Inhoud van het meldingsbericht"},target:{heading:"Doel",description:"Apparaat om het push-bericht naar te sturen"}},actions:{test:"Uitproberen"}},new_action:{title:"Maak een actie",description:"Dit paneel kan worden gebruikt om een apparaat te schakelen wanneer de alarmstatus verandert.",fields:{name:{heading:"Naam",description:"Beschrijving voor deze actie"},event:{heading:"Gebeurtenis",description:"Wanneer moet de actie worden uitgevoerd"},area:{heading:"Gebied",description:"Het gebied waarop de gebeurtenis van toepassing is, laat leeg om het algemene alarm te selecteren."},mode:{heading:"Mode",description:"Beperk de actie tot specifieke inschakel modi (optioneel)"},entity:{heading:"Entiteit",description:"Entiteit om actie op uit te voeren"},action:{heading:"Actie",description:"Actie die op de entiteit moet worden uitgevoerd",turn_on:"Zet aan",turn_off:"Zet uit"}}}},validation_errors:{no_triggers:"Er is geen toestand of gebeurtenis voorzien voor het activeren van deze automatisering.",empty_trigger:"Voor een van de triggers is geen status of gebeurtenis opgegeven.",invalid_trigger:"Een van de triggers heeft een ongeldige waarde: {trigger}",invalid_mode:"Ongeldige invoer opgegeven voor 'mode': {mode}",no_actions:"Er zijn geen acties ingesteld uit te voeren door deze automatisering.",no_service:"Een van de acties mist een service.",invalid_service:"Er is een ongeldige servicenaam opgegeven voor een van de acties: {service}",no_service_data:"Voor een van de acties zijn geen servicegegevens opgegeven.",no_entity_in_service_data:"Er is geen entity_id opgegeven in de service_data van een van de acties.",no_message_in_service_data:"Er is geen bericht opgegeven in de service_data van een van de acties."}}},Ke={common:Be,components:We,title:"Alarmpaneel",panels:Ge},Qe={modes_long:{armed_away:"Activée en mode absence",armed_home:"Activée en mode présence",armed_night:"Activée en mode nuit",armed_custom_bypass:"Activée en mode personnalisé"},modes_short:{armed_away:"Absence",armed_home:"Présence",armed_night:"Nuit",armed_custom_bypass:"Personnalisé"}},Ze={time_slider:{seconds:"sec",minutes:"min",infinite:"infini",none:"Aucune"},editor:{ui_mode:"Afficher l'éditeur visuel",yaml_mode:"Afficher l'éditeur de code"}},Je={general:{title:"Généraux",cards:{general:{description:"Ce panneau définit les paramètres globaux de l'alarme.",fields:{disarm_after_trigger:{heading:"Désactivation après déclenchement",description:"Lors que le temps de fonctionnement de la sirène est écoulé, désactive l'alarme au lieu de la réactiver."},enable_mqtt:{heading:"Utilisation avec MQTT",description:"Permet au panneau d'alarme d'être contrôlé via MQTT."},enable_master:{heading:"Activation de commande centralisée",description:"Créer une entité pour piloter toutes les zone en même temps."}},actions:{setup_mqtt:"Configuration MQTT",setup_master:"Configuration pricipale"}},modes:{title:"Modes",description:"Ce panneau définit le mode de gestion pour chaque type d'activation.",fields:{mode:{armed_away:"Ce mode sera utilisé lorsque toutes les personnes auront quitté la maison. Toutes les portes et fenêtres permettant l'accès à la maison seront surveillées, les détecteurs de mouvement à l'intérieur de la maison seront opérationnels.",armed_home:"Ce mode sera utilisée lorsque des personnes sont dans la maison. Toutes les portes et fenêtres permettant l'accès à la maison seront surveillées (périmétrie), les détecteurs de mouvement à l'intérieur de la maison seront inopérants.",armed_night:"Ce mode sera utilisée lors du réglage de l'alarme avant de s'endormir. Toutes les portes et fenêtres permettant l'accès à la maison seront surveillées, et les capteurs de mouvement sélectionnés (ex : rez de chaussée) dans la maison seront opérationnels.",armed_custom_bypass:"Ce mode supplémentaire permet de définir votre propre périmètre de sécurité.",enabled:"Actif",disabled:"Inactif"},exit_delay:{heading:"Délai pour sortir",description:"Lors de l'activation, pendant cette période, les capteurs ne déclencheront pas l'alarme."},entry_delay:{heading:"Délai pour entrer",description:"Temps d'attente avant que l'alarme ne se déclenche après détection d'un des capteurs."},trigger_time:{heading:"Temps de fonctionnement",description:"Temps de fonctionnement de la sirène"}}},mqtt:{title:"Configuration MQTT",description:"Ce panneau peut être utilisé pour la configuration de l'interface MQTT.",fields:{state_topic:{heading:"Etat de données",description:"Donnée sur laquelle les mises à jour d'état sont publiées"},event_topic:{heading:"Evènement de données",description:"Donnée sur laquelle les évènements d'état sont publiés"},command_topic:{heading:"Commande de donnée",description:"Donnée sur laquelle les commandes d'armement / désarmement sont envoyées."},require_code:{heading:"Code requis",description:"Exige que le code soit envoyé avec la commande."},state_payload:{heading:"Configurer une valeur par état",item:"Définir une valeur par état '{state}'"},command_payload:{heading:"Configurer une valeur par commande",item:"Définir une valeur par commande '{command}'"}}},areas:{title:"Zones",description:"Les zones peuvent être utilisées pour diviser votre système d'alarme en plusieurs secteurs.",no_items:"Il n'y a pas encore de zones définies.",table:{remarks:"Remarque",summary:"Cette zone contient des {summary_sensors} et {summary_automations}.",summary_sensors:"{number} capteurs",summary_automations:"{number} automations"},actions:{add:"Ajouter"}}},dialogs:{create_area:{title:"Nouvelle zone",fields:{copy_from:"Copy settings from"}},edit_area:{title:"Editer la zone '{area}'",name_warning:"Note: Changer le nom changera l'entity ID"},remove_area:{title:"Suppression de zone?",description:"Etes vous sur de vouloir supprimer cette zone? Cette zone contient {sensors} des capteurs et {automations} automatisations, qui seront également supprimés."},edit_master:{title:"Configuration principale"},disable_master:{title:"Désactiver la configuration principale?",description:"Etes vous sur de vouloir supprimer la configuration principale? Cette zone contient {automations} automatisations, qui seront également supprimées."}}},sensors:{title:"Capteurs",cards:{sensors:{description:"Capteurs actuellement configurés. Cliquez sur une entité pour apporter des modifications.",no_items:"Il n'y a pas encore de capteur ajouté à l'alarme. Assurez-vous de les ajouter d'abord.",table:{arm_modes:"Type d'activation",always_on:"(Toujours)"},filter:{label:"Filtrer par zone",no_area:"Aucune zone"}},add_sensors:{title:"Ajouter un capteur",description:"Ajoutez plus de capteurs. Assurez-vous que vos capteurs ont un nom personnalisé afin de pouvoir les identifier.",no_items:"Aucune entité HA disponible ne peut être configurée pour l'alarme. Assurez-vous d'inclure les entités de type binary_sensor.",actions:{add_to_alarm:"Ajouter à l'alarme",show_all:"Tout montrer"}},editor:{title:"Editer un capteur",description:"Configurer les paramètres du capteur '{entity}'.",fields:{name:{heading:"Nom",description:"Remplacer le nom personnalisé (friendly name)."},area:{heading:"Zone",description:"Selectionner une zone contenant ce capteur."},device_type:{heading:"Type de détection",description:"Choisissez un type de détection pour appliquer automatiquement les paramètres appropriés.",choose:{door:{name:"Porte",description:"Une porte, un portail ou une autre entrée utilisée pour entrer / sortir de la maison."},window:{name:"Fenêtre",description:"Une fenêtre, ou une porte non utilisée pour entrer dans la maison comme un balcon."},motion:{name:"Mouvement",description:"Capteur de présence ou appareil similaire présentant un délai entre les activations."},tamper:{name:"Effraction",description:"Détection d'arrachage du capteur, capteur de bris de verre, etc.."},environmental:{name:"Détecteur Environmental",description:"Détecteur de fumée / gaz, détecteur de fuite, etc. (non lié à la protection anti-effraction)."},other:{name:"Générique"}}},always_on:{heading:"Toujours en service",description:"Le capteur doit toujours déclencher l'alarme."},modes:{heading:"Mode possible",description:"Modes d'alarme dans lesquels ce capteur est actif."},arm_on_close:{heading:"Activer après fermeture",description:"Après la désactivation de ce capteur, le délai de sortie restant sera automatiquement ignoré."},immediate:{heading:"Immédiat",description:"L'activation de ce capteur déclenchera l'alarme immédiatement plutôt qu'après le délai d'entrée."},allow_open:{heading:"Autoriser l'ouverture lors de l'activation",description:"Permet à ce capteur d'être actif, peu de temps après votre départ afin qu'il ne bloque pas l'armement."},trigger_unavailable:{heading:"Déclenchement lorsqu'il n'est pas disponible",description:"Lorsque l'état du capteur devient `` indisponible '', cela activera le capteur."}},actions:{toggle_advanced:"Paramètres avancées",remove:"Supprimer"},errors:{description:"Veuillez corriger les erreurs suivantes:",no_area:"Aucune zone n'est sélectionnée",no_modes:"Aucun mode sélectionné pour lequel le capteur doit être actif"}}}},codes:{title:"Codes",cards:{codes:{description:"Gestion des paramètres des codes.",fields:{code_arm_required:{heading:"Utiliser un code pour l'activation",description:"Code requis pour l'activation de l'alarme"},code_disarm_required:{heading:"Utiliser un code pour la désactivation",description:"Code requis pour la désactivation de l'alarme"},code_format:{heading:"Format du code",description:"Définit le type d'entrée pour la carte d'alarme Lovelace.",code_format_number:"pincode",code_format_text:"password"}}},user_management:{title:"Gestion des utilisateurs",description:"Chaque utilisateur a son propre code pour activer / désactiver l'alarme.",no_items:"Il n'y a aucun utilisateur de défini",table:{remarks:"Remarque",administrator:"Administrateur"},actions:{new_user:"Nouvel utilisateur"}},new_user:{title:"Créer un nouvel utilisateur",description:"Des utilisateurs peuvent être créés pour donner accès au fonctionnement de l'alarme.",fields:{name:{heading:"Nom",description:"Nom de l'utilisateur."},code:{heading:"Code",description:"Code personnel de l'utilisateur."},confirm_code:{heading:"Confirmation du code",description:"Répèter le  code."},is_admin:{heading:"L'utilisateur est aussi administrateur",description:"Autorise l'utilisateur à effectuer des changements."},can_arm:{heading:"Demande de code pour l'activation",description:"Entrer ce code pour activer l'alarme."},can_disarm:{heading:"Demande de code pour désactivation",description:"Entrer ce code pour désactiver l'alarme."},is_override_code:{heading:"Code de sécurité",description:"La saisie de ce code forcera l'activation l'alarme."}},errors:{no_name:"Aucun nom saisi.",no_code:"Le code doit contenir 4 caractères/chiffres minimum.",code_mismatch:"Les codes sont différents."}},edit_user:{title:"Editer l'utilisateur",description:"Changer la  configuration pour l'utilisateur '{name}'.",fields:{old_code:{heading:"Code utilisé",description:"Code actuel, laissez vide pour ne rien changer."}}}}},actions:{title:"Actions",cards:{notifications:{title:"Notifications",description:"À l'aide de ce panneau, vous pouvez gérer les notifications à envoyer lors d'un évènement d'alarme",table:{enabled:"Active",no_items:"Il n'y a aucune notification de  créée."},actions:{new_notification:"Nouvelle notification"},filter:{label:"Filtrer par zone",no_area:"Alarme principale"}},actions:{description:"Ce panneau est  utilisé pour changer d'état les appareils de votre choix.",table:{no_items:"Il n'y a aucune action de créer."},actions:{new_action:"Nouvelle action"}},new_notification:{title:"Créer une notification",description:"Créer une nouvelle notification.",fields:{name:{heading:"Nom",description:"Description de la notification"},event:{heading:"Evènement",description:"Détermine quand la notification doit être envoyée",choose:{armed:{name:"Alarme activée ",description:"l'alarme s'est correctement activée"},disarmed:{name:"Alarme désactivée",description:"L'alarme est désactivée"},triggered:{name:"Alarme déclenchée",description:"L'alarme est déclenchée"},arm_failure:{name:"Armement impossible",description:"L'armement est impossible dû à un ou plusieurs capteurs"},arming:{name:"Délai de sortie activé",description:"Le délai de sortie est activé, vous devez quitter la maison."},pending:{name:"Délai d'entrée activé",description:"Le délai d'entrée est activé, l'alarme va se déclencher."}}},mode:{heading:"Mode",description:"Limite la notification à un mode spécifique (optionnel)"},title:{heading:"Titre",description:"Titre du message de la notification"},message:{heading:"Message",description:"Contenu du message de la notification"},target:{heading:"Cible",description:"Appareil recevant le message"}},actions:{test:"Essai"}},new_action:{title:"Créer une action",description:"Ce panneau peut être utilisé pour commuter un appareil lorsque l'état de l'alarme change.",fields:{name:{heading:"Nom",description:"Description de  l'action"},event:{heading:"Evènement",description:"Détermine quand l'action doit être exécutée"},area:{heading:"Zone",description:"Zone pour laquelle l'évènement s'applique, laissez vide pour sélectionner l'alarme globale."},mode:{heading:"Mode",description:"Limite l'action à un mode spécifique (optionnel)"},entity:{heading:"Entité",description:"Entité sur laquelle effectuer une action"},action:{heading:"Action",description:"Action à exécuter sur l'entité",turn_on:"Mettre à on",turn_off:"Mettre à off"}}}},validation_errors:{no_triggers:"Aucun état ou évènement prévu pour le déclenchement de cette automatisation.",empty_trigger:"L'un des déclencheurs n'a aucun état ou évènement fourni.",invalid_trigger:"L'un des déclencheurs a une valeur non valide: {trigger}",invalid_mode:"Entrée non valide fournie par  le 'mode': {mode}",no_actions:"Aucune action n'est prévue pour être effectuée par cette automatisation.",no_service:"Il manque un service dans l’une des actions.",invalid_service:"Un nom de service non valide a été fourni pour l'une des actions: {service}",no_service_data:"Aucune donnée de service n'a été fournie pour l'une des actions.",no_entity_in_service_data:"Aucun entity_id n'a été fourni dans le service_data de l'une des actions.",no_message_in_service_data:"Aucun message n'a été fourni dans le service_data de l'une des actions."}}},Xe={common:Qe,components:Ze,title:"Gestion de L'alarme",panels:Je},et={modes_long:{armed_away:"Modalità 'fuori casa' attiva",armed_home:"Modalità 'in casa' attiva",armed_night:"Modalità 'notte' attiva",armed_custom_bypass:"Modalità 'personalizzato' attiva"},modes_short:{armed_away:"Fuori casa",armed_home:"In casa",armed_night:"Notte",armed_custom_bypass:"Personalizzato"}},tt={time_slider:{seconds:"sec",minutes:"min",infinite:"infinito",none:"niente"},editor:{ui_mode:"Passa a UI",yaml_mode:"Passa a YAML"}},at={general:{title:"Generali",cards:{general:{description:"Questo pannello definisce alcune impostazioni da applicare alle modalità di allarme.",fields:{disarm_after_trigger:{heading:"Disattiva allarme dopo l'attivazione",description:"Dopo che il tempo di attivazione è scaduto, disattivare l'allarme invece di tornare allo stato inserito."},enable_mqtt:{heading:"Abilita MQTT",description:"Permetti al pannello allarme di essere controllato attraverso MQTT."},enable_master:{heading:"Enable alarm master",description:"Creates an entity for controlling all areas simultaneously."}},actions:{setup_mqtt:"Configurazione MQTT",setup_master:"Master Configuration"}},modes:{title:"Modes",description:"This panel can be used to set up the arm modes of the alarm.",fields:{mode:{armed_away:"Modalità 'fuori casa': da utilizzare quando tutte le persone lasciano la casa. Tutti i sensori di porte e finestre che consentono l'accesso alla casa saranno attivi, così come i sensori di movimento all'interno della casa.",armed_home:"Modalità 'in casa': da utilizzare quando si attiva l'allarme mentre le persone sono in casa. Tutti i sensori di porte e finestre che consentono l'accesso alla casa saranno attivi, ma non i sensori di movimento all'interno della casa.",armed_night:"Modalità 'notte': da utilizzare quando si imposta la sveglia prima di andare a dormire. Tutti i sensori di porte e finestre che consentono l'accesso alla casa saranno attivi e sensori di movimento selezionati (ad esempio al piano di sotto) nella casa.",armed_custom_bypass:"Modalità 'personalizzato': da utilizzare per definire una modalità di allarme specifica per le esigenze dell'utilizzatore.",enabled:"Enabled",disabled:"Disabled"},exit_delay:{heading:"Tempo di preattivazione",description:"Quando si attiva l'allarme, entro questo periodo di tempo i sensori non attiveranno ancora l'allarme."},entry_delay:{heading:"Ritardo di attivazione",description:"Tempo di ritardo fino allo scatto dell'allarme dopo l'attivazione di uno dei sensori."},trigger_time:{heading:"Tempo di attivazione",description:"Tempo durante il quale suonerà la sirena"}}},mqtt:{title:"Configurazione MQTT",description:"Questo pannello può essere usato per le impostazioni MQTT.",fields:{state_topic:{heading:"Topic di stato",description:"Topic su cui vengono pubblicati gli aggiornamenti di stato"},command_topic:{heading:"Topic di comando",description:"Topic su cui vengono inviati i comandi di inserimento / disinserimento."},require_code:{heading:"Richiedi Codice",description:"Richiedi il codice da inviare con il comando."},state_payload:{heading:"Configura payload per stato",item:"Definisci un payload per lo stato '{state}'"},command_payload:{heading:"Configura payload per comando",item:"Definisci un payload per il comando '{command}'"}}},areas:{title:"Areas",description:"Areas can be used for dividing your alarm system into multiple compartments.",no_items:"There are no areas defined yet.",table:{remarks:"Remarks",summary:"This area contains {summary_sensors} and {summary_automations}.",summary_sensors:"{number} sensors",summary_automations:"{number} automations"},actions:{add:"Add"}}},dialogs:{create_area:{title:"New area",fields:{copy_from:"Copy settings from"}},edit_area:{title:"Editing area '{area}'",name_warning:"Note: changing the name will change the entity ID"},remove_area:{title:"Remove area?",description:"Are you sure you want to remove this area? This area contains {sensors} sensors and {automations} automations, which will be removed as well."},edit_master:{title:"Master configuration"},disable_master:{title:"Disable master?",description:"Are you sure you want to remove the alarm master? This area contains {automations} automations, which will be removed with this action."}}},sensors:{title:"Sensori",cards:{sensors:{description:"Sensori attualmente configurati. Clicca sull'entità per modificare.",no_items:"Non ci sono ancora sensori aggiunti a questo allarme. Assicurati di aggiungerli prima.",table:{arm_modes:"Modalità di attivazione",always_on:"(Sempre)"},filter:{label:"Filter by area",no_area:"(No area)"}},add_sensors:{title:"Aggiungi Sensori",description:"Aggiungi più sensori. Assicurati che i sensori abbiano un friendly_name (nome amichevole), in modo da identificarli più facilmente.",no_items:"Non ci sono entità disponibili che possono essere configurate con l'allarme. Assicurati di includere entità del tipo binary_sensor (sensore binario).",actions:{add_to_alarm:"aggiungi all'allarme",show_all:"Mostra tutti"}},editor:{title:"Modifica Sensore",description:"Configura le impostazioni del sensore '{entity}'.",fields:{name:{heading:"Nome",description:"Sovrascrivi friendly name."},area:{heading:"Area",description:"Select an area which contains this sensor."},device_type:{heading:"Device Type",description:"Choose a device type to automatically apply appropriate settings.",choose:{door:{name:"Door",description:"A door, gate or other entrance that is used for entering/leaving the home."},window:{name:"Window",description:"A window, or a door not used for entering the house such as balcony."},motion:{name:"Motion",description:"Presence sensor or similar device having a delay between activations."},tamper:{name:"Tamper",description:"Detector of sensor cover removal, glass break sensor, etc."},environmental:{name:"Environmental",description:"Smoke/gas sensor, leak detector, etc. (not related to burglar protection)."},other:{name:"Generic"}}},always_on:{heading:"Sempre attivo",description:"Il sensore attiverà sempre l'allarme."},modes:{heading:"Modalità attive",description:"Modalità di allarme in cui il sensore risulta collegato."},arm_on_close:{heading:"Arm after closing",description:"After deactivation of this sensor, the remaining exit delay will automatically be skipped."},immediate:{heading:"Immediato",description:"Il sensore si attiva saltando il ritardo."},allow_open:{heading:"Permetti apertura",description:"Consentire a questo sensore di rimanere attivo poco dopo essere usciti."},trigger_unavailable:{heading:"Fai scattare l'allarme quando non disponibile",description:"L'allarme scatterà quando lo stato del sensore diverrà 'non disponibile'."}},actions:{toggle_advanced:"Advanced settings",remove:"Remove"},errors:{description:"Please correct the following errors:",no_area:"No area is selected",no_modes:"No modes are selected for which the sensor should be active"}}}},codes:{title:"Codici",cards:{codes:{description:"Modifica le impostazioni dei codici.",fields:{code_arm_required:{heading:"Usa codice d'attivazione",description:"Richiedi un codice per attivare l'allarme"},code_disarm_required:{heading:"Usa codice di disattivazione",description:"Richiedi un codice per disattivare l'allarme"},code_format:{heading:"Formato del codice",description:"Imposta il tipo di codice da digitare nella card di Lovelace.",code_format_number:"codice numerico",code_format_text:"password"}}},user_management:{title:"Gestione utente",description:"Ogni utente ha il suo codice per attivare/disattivare l'allarme.",no_items:"Non è stato creato nessun utente per ora",table:{remarks:"Ruolo",administrator:"Amministratore"},actions:{new_user:"nuovo utente"}},new_user:{title:"Crea nuovo utente",description:"Gli utenti potranno operare con l'allarme.",fields:{name:{heading:"Nome",description:"Nome dell'utente."},code:{heading:"Codice operativo",description:"Codice che utilizzerà quest'utente."},confirm_code:{heading:"Ripeti codice operativo",description:"Ripeti il codice operativo scelto."},is_admin:{heading:"L'utente è un amministratore",description:"Ciò consente al utente di effettuare modifiche al sistema di allarme"},can_arm:{heading:"Utilizza codice per attivare l'allarme",description:"Utilizza codice per attivare l'allarme"},can_disarm:{heading:"Utilizza codice per disattivare l'allarme",description:"Utilizza codice per disattivare l'allarme"},is_override_code:{heading:"E' un codice di forzatura",description:"Inserendo questo codice forzerai lo stato di attivazione dell'allarme"}},errors:{no_name:"Non hai inserito il nome.",no_code:"Il codice deve avere almeno 4 numeri o caratteri.",code_mismatch:"Il codice scelto non combacia, verifica il codice inserito."}},edit_user:{title:"Modifica Utente",description:"Cambia impostazioni per l'utente '{name}'.",fields:{old_code:{heading:"Modifica Codice",description:"Codice attuale, lascia vuoto per non modificare."}}}}},actions:{title:"Azioni",cards:{notifications:{title:"Notifiche",description:"Con questo pannello puoi gestire le notifiche da inviare quanto accade un determinato evento",table:{enabled:"Abilitato",no_items:"Non è stata creata nessuna notifica per ora."},actions:{new_notification:"nuova notifica"},filter:{label:"Filter by area",no_area:"Alarm master"}},actions:{description:"Questo pannello è in fase di sviluppo. Sarà usato per cambiare lo stato di una o più entità.",table:{no_items:"Non è stata creata nessuna azione per ora."},actions:{new_action:"nuova azione"}},new_notification:{title:"Crea notifica",description:"Crea una nuova notifica.",fields:{name:{heading:"Nome",description:"Descrizione della notifica"},event:{heading:"Evento",description:"Quando questa notifica deve essere inviata",choose:{armed:{name:"Alarm is armed",description:"The alarm is succesfully armed"},disarmed:{name:"Alarm is disarmed",description:"The alarm is disarmed"},triggered:{name:"Alarm is triggered",description:"The alarm is triggered"},arm_failure:{name:"Failed to arm",description:"The arming of the alarm failed due to one or more open sensors"},arming:{name:"Exit delay started",description:"Exit delay started, ready to leave the house."},pending:{name:"Entry delay started",description:"Entry delay started, the alarm will trigger soon."}}},mode:{heading:"Modalità",description:"Limita ad una specifica modalità di allarme (opzionale)"},title:{heading:"Titolo",description:"Titolo per il messaggio di notifica"},message:{heading:"Messaggio",description:"Contenuto del messaggio di notifica"},target:{heading:"Destinatario",description:"Dispositivo a cui inviare il messaggio di notifica"}},actions:{test:"Try it"}},new_action:{title:"Crea azione",description:"Questo pannello può essere usato per cambiare lo stato di un entità quando lo stato dell'allarme cambia.",fields:{name:{heading:"Nome",description:"Descrizione dell'azione"},event:{heading:"Evento",description:"Quando questa azione deve essere eseguita"},area:{heading:"Area",description:"Area for which the event applies, leave empty to select the global alarm."},mode:{heading:"Modalità",description:"Limita ad una specifica modalità di allarme (opzionale)"},entity:{heading:"Entità",description:"Entità su cui eseguire l'azione"},action:{heading:"Azione",description:"Azione che deve eseguire l'entità",turn_on:"Accendi",turn_off:"Spegni"}}}},validation_errors:{no_triggers:"Nessuno evento o modalità scelto per l'attivazione di questa azione.",empty_trigger:"Evento o modalità mancante per questa azione.",invalid_trigger:"Uno degli eventi selezionati ha un valore non valido: {trigger}",invalid_mode:"Input selezionato non valido per la modalità: {mode}",no_actions:"Nessuna azione è stata scelta per questa azione.",no_service:"Una di queste azioni ha un servizio mancante.",invalid_service:"Il nome del servizio non è valido per una delle azioni: {service}",no_service_data:"Dati del servizio non inseriti per una delle azioni.",no_entity_in_service_data:"Nessun entity_id è stata inserita in service_data di una delle azioni.",no_message_in_service_data:"Nessun messaggio è stato inserito nel service_data di una delle azioni."}}},it={common:et,components:tt,title:"Alarm panel",panels:at},st={en:Object.freeze({__proto__:null,common:Le,components:Re,title:"Alarm panel",panels:Ve,default:Ue}),et:Object.freeze({__proto__:null,common:Ie,components:Fe,title:"Alarm panel",panels:He,default:Ye}),nl:Object.freeze({__proto__:null,common:Be,components:We,title:"Alarmpaneel",panels:Ge,default:Ke}),fr:Object.freeze({__proto__:null,common:Qe,components:Ze,title:"Gestion de L'alarme",panels:Je,default:Xe}),it:Object.freeze({__proto__:null,common:et,components:tt,title:"Alarm panel",panels:at,default:it})};function nt(e,t,a="",i=""){const s=t.replace(/['"]+/g,"").replace("-","_");var n;try{n=e.split(".").reduce((e,t)=>e[t],st[s])}catch(t){n=e.split(".").reduce((e,t)=>e[t],st.en)}if(void 0===n&&(n=e.split(".").reduce((e,t)=>e[t],st.en)),""!==a&&""!==i){Array.isArray(a)||(a=[a]),Array.isArray(i)||(i=[i]);for(let e=0;e<a.length;e++)n=n.replace(a[e],i[e])}return n}let ot=class extends oe{constructor(){super(...arguments),this.min=0,this.max=100,this.step=10,this.value=0,this.scaleFactor=1,this.unit="",this.disabled=!1}firstUpdated(){this.value>0&&this.value<60&&(this.unit="sec"),"min"==this.unit&&(this.scaleFactor=1/60),"min"==this.unit&&(this.step=1)}render(){return L`
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
    `}getValue(){const e=Number(Math.round(this.value*this.scaleFactor));return!e&&this.zeroValue?this.zeroValue:`${e} ${this.getUnit()}`}getUnit(){switch(this.unit){case"sec":return nt("components.time_slider.seconds",this.hass.language);case"min":return nt("components.time_slider.minutes",this.hass.language);default:return""}}getSlider(){return L`
      <ha-slider
        pin
        min=${Math.round(this.min*this.scaleFactor)}
        max=${Math.round(this.max*this.scaleFactor)}
        step=${this.step}
        value=${Math.round(this.value*this.scaleFactor)}
        ?disabled=${this.disabled}
        @change=${this.updateValue}
      ></ha-slider>
    `}updateValue(e){const t=Number(e.target.value);this.value=Math.round(t/this.scaleFactor)}toggleUnit(){this.unit="min"==this.unit?"sec":"min",this.scaleFactor="min"==this.unit?1/60:1,this.step="min"==this.unit?1:10}};ot.styles=se`
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
  `,t([Z({type:Number})],ot.prototype,"min",void 0),t([Z({type:Number})],ot.prototype,"max",void 0),t([Z({type:Number})],ot.prototype,"step",void 0),t([Z({type:Number})],ot.prototype,"value",void 0),t([Z()],ot.prototype,"scaleFactor",void 0),t([Z({type:String})],ot.prototype,"unit",void 0),t([Z({type:Boolean})],ot.prototype,"disabled",void 0),t([Z({type:String})],ot.prototype,"zeroValue",void 0),ot=t([K("time-slider")],ot);var rt,dt,lt,ct,ht,ut,mt,pt;function gt(e){return function(e){if(!e)return Ce;if(e.attributes.icon)return e.attributes.icon;var t=Oe(e.entity_id);return t in Ne?Ne[t](e):Ee(t,e.state)}(e)}function vt(e){return(e=e.replace("_"," ")).charAt(0).toUpperCase()+e.slice(1)}function _t(e){return e?e.attributes&&e.attributes.friendly_name?e.attributes.friendly_name:String(e.entity_id.split(".").pop()):"(unrecognized entity)"}function ft(e){return e.filter((e,t,a)=>a.indexOf(e)===t)}function bt(e,t){return e?Object.entries(e).filter(([e])=>t.includes(e)).reduce((e,[t,a])=>Object.assign(e,{[t]:a}),{}):{}}function wt(e,t){return e?Object.entries(e).filter(([e])=>!t.includes(e)).reduce((e,[t,a])=>Object.assign(e,{[t]:a}),{}):{}}function yt(e,t){const a=Object.keys(e),i=Object.keys(t);if(a.length!==i.length)return!1;for(const i of a)if("object"==typeof e[i]&&"object"==typeof t[i]){if(yt(e[i],t[i]))return!1}else if(e[i]!==t[i])return!1;return!0}function $t(e,t){const a=e.target;Te(a,"show-dialog",{dialogTag:"error-dialog",dialogImport:()=>Promise.resolve().then((function(){return ia})),dialogParams:{error:t}})}function kt(e,t){$t(t,L`
    <b>Something went wrong!</b><br />
    ${e.body.message?L`
          ${e.body.message}<br /><br />
        `:""}
    ${e.error}<br /><br />
    Please <a href="https://github.com/nielsfaber/alarmo/issues">report</a> the bug.
  `)}!function(e){e.ArmedAway="hass:car-traction-control",e.ArmedHome="hass:home-outline",e.ArmedNight="hass:weather-night",e.ArmedCustom="hass:star-outline"}(rt||(rt={})),function(e){e.STATE_ALARM_DISARMED="disarmed",e.STATE_ALARM_ARMED_HOME="armed_home",e.STATE_ALARM_ARMED_AWAY="armed_away",e.STATE_ALARM_ARMED_NIGHT="armed_night",e.STATE_ALARM_ARMED_CUSTOM_BYPASS="armed_custom_bypass",e.STATE_ALARM_PENDING="pending",e.STATE_ALARM_ARMING="arming",e.STATE_ALARM_DISARMING="disarming",e.STATE_ALARM_TRIGGERED="triggered"}(dt||(dt={})),function(e){e.COMMAND_ALARM_DISARM="disarm",e.COMMAND_ALARM_ARM_HOME="arm_home",e.COMMAND_ALARM_ARM_AWAY="arm_away",e.COMMAND_ALARM_ARM_NIGHT="arm_night",e.COMMAND_ALARM_ARM_CUSTOM_BYPASS="arm_custom_bypass"}(lt||(lt={})),function(e){e.Door="door",e.Window="window",e.Motion="motion",e.Tamper="tamper",e.Environmental="environmental",e.Other="other"}(ct||(ct={})),function(e){e.Door="hass:door-closed",e.Window="hass:window-closed",e.Motion="hass:motion-sensor",e.Tamper="hass:vibrate",e.Environmental="hass:fire",e.Other="hass:contactless-payment-circle-outline"}(ht||(ht={})),function(e){e.ArmedAway="armed_away",e.ArmedHome="armed_home",e.ArmedNight="armed_night",e.ArmedCustom="armed_custom_bypass"}(ut||(ut={})),function(e){e.Disarmed="disarmed",e.Armed="armed",e.Triggered="triggered",e.Pending="pending",e.Arming="arming"}(mt||(mt={})),function(e){e.ArmFailure="arm_failure"}(pt||(pt={}));const At=(e,t)=>{if(!e)return!1;switch(e){case dt.STATE_ALARM_ARMED_AWAY:return t[ut.ArmedAway].enabled;case dt.STATE_ALARM_ARMED_HOME:return t[ut.ArmedHome].enabled;case dt.STATE_ALARM_ARMED_NIGHT:return t[ut.ArmedNight].enabled;case dt.STATE_ALARM_ARMED_CUSTOM_BYPASS:return t[ut.ArmedCustom].enabled;default:return!0}};function xt(e,t){return Object.entries(t).forEach(([t,a])=>{e=t in e&&"object"==typeof e[t]&&null!==e[t]?Object.assign(Object.assign({},e),{[t]:xt(e[t],a)}):Object.assign(Object.assign({},e),{[t]:a})}),e}let St=class extends oe{constructor(){super(...arguments),this.label="",this.items=[],this.clearable=!1,this.icons=!1,this.rowRenderer=(e,t,a)=>{!e.firstElementChild&&this.icons?e.innerHTML='\n        <style>\n          paper-icon-item {\n              margin: -10px;\n              padding: 0;\n          }\n          ha-icon {\n              display: flex;\n              flex: 0 0 40px;\n              color: var(--state-icon-color);\n          }\n        </style>\n        <paper-icon-item>\n          <ha-icon icon="" slot="item-icon"></ha-icon>\n          <paper-item-body two-line>\n            <div class="name"></div>\n            <div secondary></div>\n          </paper-item-body>\n        </paper-icon-item>\n        ':e.firstElementChild||(e.innerHTML='\n        <style>\n          paper-item {\n              margin: -10px;\n              padding: 0;\n          }\n        </style>\n        <paper-item>\n          <paper-item-body two-line>\n            <div class="name"></div>\n            <div secondary></div>\n          </paper-item-body>\n        </paper-item>\n        '),e.querySelector(".name").textContent=a.item.name,e.querySelector("[secondary]").textContent=a.item.description,this.icons&&(e.querySelector("ha-icon").icon=a.item.icon)}}open(){this.updateComplete.then(()=>{var e,t;null===(t=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector("vaadin-combo-box-light"))||void 0===t||t.open()})}focus(){this.updateComplete.then(()=>{var e;(null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector("paper-input")).focus()})}shouldUpdate(e){if(e.get("items")){if(yt(this.items,e.get("items")))return!1;this.firstUpdated()}return!0}firstUpdated(){this._comboBox.items=this.items}render(){return L`
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
    `}_clearValue(e){e.stopPropagation(),this._setValue("")}get _value(){return this.value||""}_openedChanged(e){this._opened=e.detail.value}_valueChanged(e){const t=e.detail.value;t!==this._value&&this._setValue(t)}_setValue(e){this.value=e,setTimeout(()=>{Te(this,"value-changed",{value:e})},0)}static get styles(){return se`
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
    `}};var Ot,jt;t([Z({attribute:!1})],St.prototype,"hass",void 0),t([Z()],St.prototype,"label",void 0),t([Z()],St.prototype,"value",void 0),t([Z()],St.prototype,"items",void 0),t([Z()],St.prototype,"clearable",void 0),t([Z()],St.prototype,"icons",void 0),t([J()],St.prototype,"_opened",void 0),t([(Ot="vaadin-combo-box-light",jt=!0,(e,t)=>{const a={get(){return this.renderRoot.querySelector(Ot)},enumerable:!0,configurable:!0};if(jt){const e="symbol"==typeof t?Symbol():"__"+t;a.get=function(){return void 0===this[e]&&(this[e]=this.renderRoot.querySelector(Ot)),this[e]}}return void 0!==t?X(a,e,t):ee(a,e)})],St.prototype,"_comboBox",void 0),St=t([K("alarmo-select")],St);const Ct=e=>e.callWS({type:"alarmo/config"}),Tt=e=>e.callWS({type:"alarmo/sensors"}),Mt=e=>e.callWS({type:"alarmo/users"}),Et=e=>e.callWS({type:"alarmo/automations"}),zt=(e,t)=>e.callApi("POST","alarmo/config",t),Dt=(e,t)=>e.callApi("POST","alarmo/sensors",t),Nt=(e,t)=>e.callApi("POST","alarmo/users",t),qt=(e,t)=>e.callApi("POST","alarmo/automations",t),Pt=(e,t)=>e.callApi("POST","alarmo/automations",{automation_id:t,remove:!0}),Lt=e=>e.callWS({type:"alarmo/areas"}),Rt=(e,t)=>e.callApi("POST","alarmo/area",t),Vt=e=>{class a extends e{connectedCallback(){super.connectedCallback(),this.__checkSubscribed()}disconnectedCallback(){if(super.disconnectedCallback(),this.__unsubs){for(;this.__unsubs.length;){const e=this.__unsubs.pop();e instanceof Promise?e.then(e=>e()):e()}this.__unsubs=void 0}}updated(e){super.updated(e),e.has("hass")&&this.__checkSubscribed()}hassSubscribe(){return[]}__checkSubscribed(){void 0===this.__unsubs&&this.isConnected&&void 0!==this.hass&&(this.__unsubs=this.hassSubscribe())}}return t([Z({attribute:!1})],a.prototype,"hass",void 0),a};let Ut=class extends(Vt(oe)){constructor(){super(...arguments),this.currentTab=0}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeEvents(()=>this._fetchData(),"alarmo_updated")]}async _fetchData(){this.hass&&(this.areas=await Lt(this.hass))}async firstUpdated(){this.areas=await Lt(this.hass),this.selectedArea=Object.keys(this.areas)[0],this.data=Object.assign({},this.areas[this.selectedArea].modes)}render(){if(!this.data)return L``;const e=Object.values(ut)[this.currentTab];return L`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${nt("panels.general.cards.modes.title",this.hass.language)}
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
          ${nt("panels.general.cards.modes.description",this.hass.language)}
        </div>

        <mwc-tab-bar
          .activeIndex=${this.currentTab}
          @MDCTabBar:activated=${e=>this.currentTab=Number(e.detail.index)}
        >
          ${Object.entries(ut).map(([e,t])=>L`
              <mwc-tab
                label="${nt("common.modes_short."+t,this.hass.language)}"
                hasImageIcon
                stacked
                class="${this.data[t].enabled?"":"disabled"}"
              >
                <ha-icon icon="${rt[e]}" slot="icon"></ha-icon>
              </mwc-tab>
            `)}
        </mwc-tab-bar>

        <settings-row .narrow=${this.narrow} .large=${!0}>
          <span slot="heading">${nt("common.modes_long."+e,this.hass.language)}</span>
          <span slot="description"
            >${nt("panels.general.cards.modes.fields.mode."+e,this.hass.language)}</span
          >

          <div style="display: flex; margin: 10px 0px; justify-content: center; width: 100%">
            <mwc-button
              class="${this.data[e].enabled?"active":""}"
              @click=${()=>this.data={...this.data,[e]:{...this.data[e],enabled:!0}}}
            >
              ${nt("panels.general.cards.modes.fields.mode.enabled",this.hass.language)}
            </mwc-button>
            <mwc-button
              class="${this.data[e].enabled?"":"active"}"
              @click=${()=>this.data={...this.data,[e]:{...this.data[e],enabled:!1}}}
            >
              ${nt("panels.general.cards.modes.fields.mode.disabled",this.hass.language)}
            </mwc-button>
          </div>
        </settings-row>

        ${this.data[e].enabled?L`
              <settings-row .narrow=${this.narrow}>
                <span slot="heading"
                  >${nt("panels.general.cards.modes.fields.exit_delay.heading",this.hass.language)}</span
                >
                <span slot="description"
                  >${nt("panels.general.cards.modes.fields.exit_delay.description",this.hass.language)}</span
                >
                <time-slider
                  .hass=${this.hass}
                  unit="sec"
                  max="180"
                  zeroValue=${nt("components.time_slider.none",this.hass.language)}
                  value=${this.data[e].exit_time||0}
                  @change=${t=>this.data={...this.data,[e]:{...this.data[e],exit_time:Number(t.target.value)}}}
                >
                </time-slider>
              </settings-row>

              <settings-row .narrow=${this.narrow}>
                <span slot="heading"
                  >${nt("panels.general.cards.modes.fields.entry_delay.heading",this.hass.language)}</span
                >
                <span slot="description"
                  >${nt("panels.general.cards.modes.fields.entry_delay.description",this.hass.language)}</span
                >
                <time-slider
                  .hass=${this.hass}
                  unit="sec"
                  max="180"
                  zeroValue=${nt("components.time_slider.none",this.hass.language)}
                  value=${this.data[e].entry_time||0}
                  @change=${t=>this.data={...this.data,[e]:{...this.data[e],entry_time:Number(t.target.value)}}}
                >
                </time-slider>
              </settings-row>

              <settings-row .narrow=${this.narrow}>
                <span slot="heading"
                  >${nt("panels.general.cards.modes.fields.trigger_time.heading",this.hass.language)}</span
                >
                <span slot="description"
                  >${nt("panels.general.cards.modes.fields.trigger_time.description",this.hass.language)}</span
                >
                <time-slider
                  .hass=${this.hass}
                  unit="min"
                  max="3600"
                  zeroValue=${nt("components.time_slider.infinite",this.hass.language)}
                  value=${this.data[e].trigger_time||0}
                  @change=${t=>this.data={...this.data,[e]:{...this.data[e],trigger_time:Number(t.target.value)}}}
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
    `}selectArea(e){e!=this.selectedArea&&(this.selectedArea=e,this.data=Object.assign({},this.areas[e].modes))}saveClick(e){Rt(this.hass,{area_id:this.selectedArea,modes:this.data}).catch(t=>kt(t,e)).then()}};Ut.styles=Pe,t([Z()],Ut.prototype,"hass",void 0),t([Z()],Ut.prototype,"narrow",void 0),t([Z()],Ut.prototype,"currentTab",void 0),t([Z()],Ut.prototype,"config",void 0),t([Z()],Ut.prototype,"areas",void 0),t([Z()],Ut.prototype,"data",void 0),t([Z()],Ut.prototype,"selectedArea",void 0),Ut=t([K("alarm-mode-card")],Ut);let It=class extends oe{constructor(){super(...arguments),this.threeLine=!1}render(){return L`
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
    `}};t([Z({type:Boolean,reflect:!0})],It.prototype,"narrow",void 0),t([Z({type:Boolean,reflect:!0})],It.prototype,"large",void 0),t([Z({type:Boolean,attribute:"three-line"})],It.prototype,"threeLine",void 0),It=t([K("settings-row")],It);let Ft=class extends oe{constructor(){super(...arguments),this.header="",this.open=!1}render(){return L`
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
    `}};t([Z({type:Boolean,reflect:!0})],Ft.prototype,"narrow",void 0),t([Z()],Ft.prototype,"header",void 0),t([Z()],Ft.prototype,"open",void 0),Ft=t([K("collapsible-section")],Ft);let Ht=class extends(Vt(oe)){constructor(){super(...arguments),this.areas={}}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeEvents(()=>this._fetchData(),"alarmo_updated")]}async _fetchData(){if(!this.hass)return;const e=await Ct(this.hass);this.config=e,this.areas=await Lt(this.hass),this.selection=wt(e.mqtt,["availability_topic"])}firstUpdated(){(async()=>{await qe()})()}render(){return this.hass&&this.selection?L`
      <ha-card>
        <div class="card-header">
          <div class="name">${nt("panels.general.cards.mqtt.title",this.hass.language)}</div>
          <ha-icon-button icon="hass:close" @click=${this.cancelClick}> </ha-icon-button>
        </div>
        <div class="card-content">${nt("panels.general.cards.mqtt.description",this.hass.language)}</div>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading"
            >${nt("panels.general.cards.mqtt.fields.state_topic.heading",this.hass.language)}</span
          >
          <span slot="description"
            >${nt("panels.general.cards.mqtt.fields.state_topic.description",this.hass.language)}</span
          >
          <paper-input
            label="${nt("panels.general.cards.mqtt.fields.state_topic.heading",this.hass.language)}"
            value=${this.selection.state_topic}
            @change=${e=>{this.selection={...this.selection,state_topic:e.target.value}}}
          ></paper-input>
        </settings-row>

        <collapsible-section
          .narrow=${this.narrow}
          header=${nt("panels.general.cards.mqtt.fields.state_payload.heading",this.hass.language)}
        >
          ${Object.values(dt).filter(e=>Object.values(this.areas).some(t=>At(e,t.modes))).map(e=>L`
                <settings-row .narrow=${this.narrow}>
                  <span slot="heading">${vt(e)}</span>
                  <span slot="description"
                    >${nt("panels.general.cards.mqtt.fields.state_payload.item",this.hass.language,"{state}",vt(e))}</span
                  >
                  <paper-input
                    label=${vt(e)}
                    placeholder=${e}
                    value=${this.selection.state_payload[e]||""}
                    @change=${t=>{this.selection=xt(this.selection,{state_payload:{[e]:t.target.value}})}}
                  >
                  </paper-input>
                </settings-row>
              `)}
        </collapsible-section>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading"
            >${nt("panels.general.cards.mqtt.fields.event_topic.heading",this.hass.language)}</span
          >
          <span slot="description"
            >${nt("panels.general.cards.mqtt.fields.event_topic.description",this.hass.language)}</span
          >
          <paper-input
            label="${nt("panels.general.cards.mqtt.fields.event_topic.heading",this.hass.language)}"
            value=${this.selection.event_topic}
            @change=${e=>{this.selection={...this.selection,event_topic:e.target.value}}}
          ></paper-input>
        </settings-row>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading"
            >${nt("panels.general.cards.mqtt.fields.command_topic.heading",this.hass.language)}</span
          >
          <span slot="description"
            >${nt("panels.general.cards.mqtt.fields.command_topic.description",this.hass.language)}</span
          >
          <paper-input
            label="${nt("panels.general.cards.mqtt.fields.command_topic.heading",this.hass.language)}"
            value=${this.selection.command_topic}
            @change=${e=>{this.selection={...this.selection,command_topic:e.target.value}}}
          ></paper-input>
        </settings-row>

        <collapsible-section
          .narrow=${this.narrow}
          header=${nt("panels.general.cards.mqtt.fields.command_payload.heading",this.hass.language)}
        >
          ${Object.values(lt).filter(e=>Object.values(this.areas).some(t=>At((e=>{switch(e){case lt.COMMAND_ALARM_DISARM:return dt.STATE_ALARM_DISARMED;case lt.COMMAND_ALARM_ARM_HOME:return dt.STATE_ALARM_ARMED_HOME;case lt.COMMAND_ALARM_ARM_AWAY:return dt.STATE_ALARM_ARMED_AWAY;case lt.COMMAND_ALARM_ARM_NIGHT:return dt.STATE_ALARM_ARMED_NIGHT;case lt.COMMAND_ALARM_ARM_CUSTOM_BYPASS:return dt.STATE_ALARM_ARMED_CUSTOM_BYPASS;default:return}})(e),t.modes))).map(e=>L`
                <settings-row .narrow=${this.narrow}>
                  <span slot="heading">${vt(e)}</span>
                  <span slot="description"
                    >${nt("panels.general.cards.mqtt.fields.command_payload.item",this.hass.language,"{command}",vt(e))}</span
                  >
                  <paper-input
                    label=${vt(e)}
                    placeholder=${e}
                    value=${this.selection.command_payload[e]||""}
                    @change=${t=>{this.selection=xt(this.selection,{command_payload:{[e]:t.target.value}})}}
                  >
                  </paper-input>
                </settings-row>
              `)}
        </collapsible-section>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading"
            >${nt("panels.general.cards.mqtt.fields.require_code.heading",this.hass.language)}</span
          >
          <span slot="description"
            >${nt("panels.general.cards.mqtt.fields.require_code.description",this.hass.language)}</span
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
    `:L``}saveClick(e){this.hass&&zt(this.hass,{mqtt:Object.assign(Object.assign({},this.selection),{enabled:!0})}).catch(t=>kt(t,e)).then(()=>{this.cancelClick()})}cancelClick(){ze(0,"/alarmo/general",!0)}};Ht.styles=Pe,t([Z()],Ht.prototype,"narrow",void 0),t([Z()],Ht.prototype,"config",void 0),t([Z()],Ht.prototype,"areas",void 0),t([Z()],Ht.prototype,"selection",void 0),Ht=t([K("mqtt-config-card")],Ht);
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
const Yt=new WeakMap,Bt=(e=>(...t)=>{const a=e(...t);return g.set(a,!0),a})(e=>t=>{if(!(t instanceof O))throw new Error("unsafeHTML can only be used in text bindings");const a=Yt.get(t);if(void 0!==a&&k(e)&&e===a.value&&t.value===a.fragment)return;const i=document.createElement("template");i.innerHTML=e;const s=document.importNode(i.content,!0);t.setValue(s),Yt.set(t,{value:e,fragment:s})});let Wt=class extends oe{render(){return this.columns&&this.data?L`
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
        ${Object.entries(this.columns).map(([t,a])=>a.hide?"":L`
                <div
                  class="table-cell ${a.text?"text":""} ${a.grow?"grow":""} ${a.align?a.align:""}"
                  style="${a.grow?"":"width: "+a.width}"
                >
                  ${e[t]}
                </div>
              `)}
      </div>
    `:L``}handleClick(e){if(!this.selectable)return;const t=new CustomEvent("row-click",{detail:{id:e}});this.dispatchEvent(t)}};Wt.styles=se`
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
  `,t([Z()],Wt.prototype,"columns",void 0),t([Z()],Wt.prototype,"data",void 0),t([Z({type:Boolean})],Wt.prototype,"selectable",void 0),Wt=t([K("alarmo-table")],Wt);let Gt=class extends oe{async showDialog(e){this._params=e,await this.updateComplete}async closeDialog(){this._params&&this._params.cancel(),this._params=void 0}render(){return this._params?L`
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
    `}};t([Z({attribute:!1})],Gt.prototype,"hass",void 0),t([J()],Gt.prototype,"_params",void 0),Gt=t([K("confirm-delete-dialog")],Gt);var Kt=Object.freeze({__proto__:null,get ConfirmDeleteDialog(){return Gt}});let Qt=class extends(Vt(oe)){constructor(){super(...arguments),this.areas={},this.sensors={},this.automations={},this.name=""}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeEvents(()=>this._fetchData(),"alarmo_updated")]}async _fetchData(){this.hass&&(this.areas=await Lt(this.hass),this.sensors=await Tt(this.hass),this.automations=await Et(this.hass))}async showDialog(e){await this._fetchData(),this._params=e,e.area_id&&(this.area_id=e.area_id,this.name=this.areas[this.area_id].name),await this.updateComplete}async closeDialog(){this._params=void 0,this.area_id=void 0,this.name=""}render(){return this._params?L`
      <ha-dialog open .heading=${!0} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <div slot="heading">
          <ha-header-bar>
            <ha-icon-button slot="navigationIcon" dialogAction="cancel" icon="mdi:close"> </ha-icon-button>
            <span slot="title">
              ${this.area_id?nt("panels.general.dialogs.edit_area.title",this.hass.language,"{area}",this.areas[this.area_id].name):nt("panels.general.dialogs.create_area.title",this.hass.language)}
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
                  >${nt("panels.general.dialogs.edit_area.name_warning",this.hass.language)}</span
                >
              `:""}
          ${this.area_id?"":L`
                <alarmo-select
                  .items=${Object.values(this.areas).map(e=>Object({value:e.area_id,name:e.name}))}
                  value=${this.selectedArea}
                  label="${nt("panels.general.dialogs.create_area.fields.copy_from",this.hass.language)}"
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
    `:L``}saveClick(e){const t=this.name.trim();if(!t.length)return;let a={name:t};this.area_id?a=Object.assign(Object.assign({},a),{area_id:this.area_id}):this.selectedArea&&(a=Object.assign(Object.assign({},a),{modes:Object.assign({},this.areas[this.selectedArea].modes)})),Rt(this.hass,a).catch(t=>kt(t,e)).then(()=>{this.closeDialog()})}async deleteClick(e){if(!this.area_id)return;const t=Object.values(this.sensors).filter(e=>e.area==this.area_id).length,a=Object.values(this.automations).filter(e=>e.area==this.area_id).length;let i=!1;var s,n;i=!t&&!a||await new Promise(i=>{Te(e.target,"show-dialog",{dialogTag:"confirm-delete-dialog",dialogImport:()=>Promise.resolve().then((function(){return Kt})),dialogParams:{title:nt("panels.general.dialogs.remove_area.title",this.hass.language),description:nt("panels.general.dialogs.remove_area.description",this.hass.language,["{sensors}","{automations}"],[String(t),String(a)]),cancel:()=>i(!1),confirm:()=>i(!0)}})}),i&&(s=this.hass,n=this.area_id,s.callApi("POST","alarmo/area",{area_id:n,remove:!0})).catch(t=>kt(t,e)).then(()=>{this.closeDialog()})}static get styles(){return se`
      ${Pe}
      div.wrapper {
        color: var(--primary-text-color);
      }
      span.note {
        color: var(--secondary-text-color);
      }
    `}};t([Z({attribute:!1})],Qt.prototype,"hass",void 0),t([J()],Qt.prototype,"_params",void 0),t([Z()],Qt.prototype,"areas",void 0),t([Z()],Qt.prototype,"sensors",void 0),t([Z()],Qt.prototype,"automations",void 0),t([Z()],Qt.prototype,"name",void 0),t([Z()],Qt.prototype,"area_id",void 0),t([Z()],Qt.prototype,"selectedArea",void 0),Qt=t([K("create-area-dialog")],Qt);var Zt=Object.freeze({__proto__:null,get CreateAreaDialog(){return Qt}});let Jt=class extends(Vt(oe)){constructor(){super(...arguments),this.areas={},this.sensors={},this.automations={}}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeEvents(()=>this._fetchData(),"alarmo_updated")]}async _fetchData(){this.hass&&(this.areas=await Lt(this.hass),this.sensors=await Tt(this.hass),this.automations=await Et(this.hass))}render(){if(!this.hass)return L``;const e=Object.values(this.areas);e.sort((e,t)=>e.name.toLowerCase()<t.name.toLowerCase()?-1:1);const t={actions:{width:"48px"},name:{title:this.hass.localize("ui.components.area-picker.add_dialog.name"),width:"40%",grow:!0,text:!0},remarks:{title:nt("panels.general.cards.areas.table.remarks",this.hass.language),width:"60%",hide:this.narrow,text:!0}},a=Object.values(e).map(t=>{const a=Object.values(this.sensors).filter(e=>e.area==t.area_id).length,i=1==Object.values(e).length?Object.values(this.automations).filter(e=>!e.area||e.area==t.area_id).length:Object.values(this.automations).filter(e=>e.area==t.area_id).length,s=`<a href="/alarmo/sensors/filter/${t.area_id}">${nt("panels.general.cards.areas.table.summary_sensors",this.hass.language,"{number}",String(a))}</a>`,n=`<a href="/alarmo/actions/filter/${t.area_id}">${nt("panels.general.cards.areas.table.summary_automations",this.hass.language,"{number}",String(i))}</a>`;return{id:t.area_id,actions:L`
          <ha-icon-button @click=${e=>this.editClick(e,t.area_id)} icon="hass:pencil"></ha-icon-button>
        `,name:vt(t.name),remarks:Bt(nt("panels.general.cards.areas.table.summary",this.hass.language,["{summary_sensors}","{summary_automations}"],[s,n]))}});return L`
      <ha-card header="${nt("panels.general.cards.areas.title",this.hass.language)}">
        <div class="card-content">
          ${nt("panels.general.cards.areas.description",this.hass.language)}
        </div>

        <alarmo-table .columns=${t} .data=${a}>
          ${nt("panels.general.cards.areas.no_items",this.hass.language)}
        </alarmo-table>
        <div class="card-actions">
          <mwc-button @click=${this.addClick}>
            ${nt("panels.general.cards.areas.actions.add",this.hass.language)}
          </mwc-button>
        </div>
      </ha-card>
    `}addClick(e){const t=e.target;Te(t,"show-dialog",{dialogTag:"create-area-dialog",dialogImport:()=>Promise.resolve().then((function(){return Zt})),dialogParams:{}})}editClick(e,t){const a=e.target;Te(a,"show-dialog",{dialogTag:"create-area-dialog",dialogImport:()=>Promise.resolve().then((function(){return Zt})),dialogParams:{area_id:t}})}};Jt.styles=Pe,t([Z()],Jt.prototype,"narrow",void 0),t([Z()],Jt.prototype,"path",void 0),t([Z()],Jt.prototype,"config",void 0),t([Z()],Jt.prototype,"areas",void 0),t([Z()],Jt.prototype,"sensors",void 0),t([Z()],Jt.prototype,"automations",void 0),Jt=t([K("area-config-card")],Jt);let Xt=class extends oe{constructor(){super(...arguments),this.name=""}async showDialog(e){this._params=e;const t=await Ct(this.hass);this.name=t.master.name||"",await this.updateComplete}async closeDialog(){this._params=void 0}render(){return this._params?L`
      <ha-dialog open .heading=${!0} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <div slot="heading">
          <ha-header-bar>
            <ha-icon-button slot="navigationIcon" dialogAction="cancel" icon="mdi:close"> </ha-icon-button>
            <span slot="title"> ${nt("panels.general.dialogs.edit_master.title",this.hass.language)}</span>
          </ha-header-bar>
        </div>
        <div class="wrapper">
          <paper-input
            label=${this.hass.localize("ui.components.area-picker.add_dialog.name")}
            @value-changed=${e=>this.name=e.target.value}
            value="${this.name}"
          >
          </paper-input>
          <span class="note">${nt("panels.general.dialogs.edit_area.name_warning",this.hass.language)}</span>
        </div>
        <mwc-button slot="primaryAction" @click=${this.saveClick}>
          ${this.hass.localize("ui.common.save")}
        </mwc-button>
        <mwc-button slot="secondaryAction" @click=${this.closeDialog}>
          ${this.hass.localize("ui.common.cancel")}
        </mwc-button>
      </ha-dialog>
    `:L``}saveClick(){const e=this.name.trim();e.length&&zt(this.hass,{master:{enabled:!0,name:e}}).catch().then(()=>{this.closeDialog()})}static get styles(){return se`
      div.wrapper {
        color: var(--primary-text-color);
      }
      span.note {
        color: var(--secondary-text-color);
      }
    `}};t([Z({attribute:!1})],Xt.prototype,"hass",void 0),t([J()],Xt.prototype,"_params",void 0),t([Z()],Xt.prototype,"name",void 0),Xt=t([K("edit-master-dialog")],Xt);var ea=Object.freeze({__proto__:null,get EditMasterDialog(){return Xt}});let ta=class extends(Vt(oe)){constructor(){super(...arguments),this.areas={},this.automations={}}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeEvents(()=>this._fetchData(),"alarmo_updated")]}async _fetchData(){this.hass&&(this.config=await Ct(this.hass),this.areas=await Lt(this.hass),this.automations=await Et(this.hass),this.data=bt(this.config,["trigger_time","disarm_after_trigger","mqtt","master"]))}firstUpdated(){(async()=>{await qe()})()}render(){var e,t,a,i,s,n,o,r;return this.hass&&this.config&&this.data?this.path&&"mqtt_configuration"==this.path[0]?L`
        <mqtt-config-card .hass=${this.hass} .narrow=${this.narrow}> </mqtt-config-card>
      `:this.path&&"edit_area"==this.path[0]&&2==this.path.length?L`
        <area-editor-card .hass=${this.hass} .narrow=${this.narrow} item=${this.path[1]}> </area-editor-card>
      `:L`
        <ha-card header="${nt("panels.general.title",this.hass.language)}">
          <div class="card-content">
            ${nt("panels.general.cards.general.description",this.hass.language)}
          </div>

          <settings-row .narrow=${this.narrow}>
            <span slot="heading"
              >${nt("panels.general.cards.general.fields.disarm_after_trigger.heading",this.hass.language)}</span
            >
            <span slot="description"
              >${nt("panels.general.cards.general.fields.disarm_after_trigger.description",this.hass.language)}</span
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
              >${nt("panels.general.cards.general.fields.enable_mqtt.heading",this.hass.language)}</span
            >
            <span slot="description"
              >${nt("panels.general.cards.general.fields.enable_mqtt.description",this.hass.language)}</span
            >
            <ha-switch
              ?checked=${null===(t=null===(e=this.data)||void 0===e?void 0:e.mqtt)||void 0===t?void 0:t.enabled}
              @change=${e=>{this.data={...this.data,mqtt:{...this.data.mqtt,enabled:e.target.checked}}}}
            >
            </ha-switch>
          </settings-row>

          ${(null===(i=null===(a=this.data)||void 0===a?void 0:a.mqtt)||void 0===i?void 0:i.enabled)?L`
                <div style="padding: 0px 0px 16px 16px">
                  <mwc-button outlined @click=${()=>ze(0,"/alarmo/general/mqtt_configuration",!0)}>
                    ${nt("panels.general.cards.general.actions.setup_mqtt",this.hass.language)}
                  </mwc-button>
                </div>
              `:""}
          ${Object.keys(this.areas).length>=2?L`
                <settings-row .narrow=${this.narrow}>
                  <span slot="heading"
                    >${nt("panels.general.cards.general.fields.enable_master.heading",this.hass.language)}</span
                  >
                  <span slot="description"
                    >${nt("panels.general.cards.general.fields.enable_master.description",this.hass.language)}</span
                  >
                  <ha-switch
                    ?checked=${(null===(n=null===(s=this.data)||void 0===s?void 0:s.master)||void 0===n?void 0:n.enabled)&&Object.keys(this.areas).length>=2}
                    ?disabled=${Object.keys(this.areas).length<2}
                    @change=${this.toggleEnableMaster}
                  >
                  </ha-switch>
                </settings-row>
              `:""}
          ${(null===(r=null===(o=this.data)||void 0===o?void 0:o.master)||void 0===r?void 0:r.enabled)&&Object.keys(this.areas).length>=2?L`
                <div style="padding: 0px 0px 16px 16px">
                  <mwc-button outlined @click=${this.setupMasterClick}>
                    ${nt("panels.general.cards.general.actions.setup_master",this.hass.language)}
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
      `:L``}setupMasterClick(e){const t=e.target;Te(t,"show-dialog",{dialogTag:"edit-master-dialog",dialogImport:()=>Promise.resolve().then((function(){return ea})),dialogParams:{}})}async toggleEnableMaster(e){const t=e.target;let a=t.checked;if(!a){const e=Object.values(this.automations).filter(e=>!e.area).length;if(e){await new Promise(a=>{Te(t,"show-dialog",{dialogTag:"confirm-delete-dialog",dialogImport:()=>Promise.resolve().then((function(){return Kt})),dialogParams:{title:nt("panels.general.dialogs.disable_master.title",this.hass.language),description:nt("panels.general.dialogs.disable_master.description",this.hass.language,["{automations}"],[String(e)]),cancel:()=>a(!1),confirm:()=>a(!0)}})})||(a=!0,t.checked=!0)}}this.data=Object.assign(Object.assign({},this.data),{master:Object.assign(Object.assign({},this.data.master),{enabled:a})})}saveClick(e){this.hass&&this.data&&zt(this.hass,this.data).catch(t=>kt(t,e)).then()}};ta.styles=Pe,t([Z()],ta.prototype,"narrow",void 0),t([Z()],ta.prototype,"path",void 0),t([Z()],ta.prototype,"data",void 0),t([Z()],ta.prototype,"config",void 0),t([Z()],ta.prototype,"areas",void 0),t([Z()],ta.prototype,"automations",void 0),ta=t([K("alarm-view-general")],ta);let aa=class extends oe{async showDialog(e){this._params=e,await this.updateComplete}async closeDialog(){this._params=void 0}render(){return this._params?L`
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
    `}};t([Z({attribute:!1})],aa.prototype,"hass",void 0),t([J()],aa.prototype,"_params",void 0),aa=t([K("error-dialog")],aa);var ia=Object.freeze({__proto__:null,get ErrorDialog(){return aa}});const sa=(e,t)=>{if("binary_sensor"==function(e){const t="string"==typeof e?e:e.entity_id;return String(t.split(".").shift())}(e.entity_id)){if(t)return!0;const a=e.attributes.device_class;return!!a&&!!["door","garage_door","gas","heat","lock","moisture","motion","moving","occupancy","opening","presence","safety","smoke","sound","vibration","window"].includes(a)}return!1},na=e=>{const t=t=>t.filter(t=>e.includes(t));return{[ct.Door]:{modes:t([ut.ArmedAway,ut.ArmedHome,ut.ArmedNight]),always_on:!1,allow_open:!1,arm_on_close:!0,immediate:!1},[ct.Window]:{modes:t([ut.ArmedAway,ut.ArmedHome,ut.ArmedNight]),always_on:!1,allow_open:!1,arm_on_close:!1,immediate:!0},[ct.Motion]:{modes:t([ut.ArmedAway]),always_on:!1,allow_open:!0,arm_on_close:!1,immediate:!1},[ct.Tamper]:{modes:t([ut.ArmedAway,ut.ArmedHome,ut.ArmedNight,ut.ArmedCustom]),always_on:!1,allow_open:!1,arm_on_close:!1,immediate:!0},[ct.Environmental]:{modes:t([ut.ArmedAway,ut.ArmedHome,ut.ArmedNight,ut.ArmedCustom]),always_on:!0,allow_open:!1,arm_on_close:!1,immediate:!1}}};function oa(e,t){if(!e)return null;const a=Oe(e.entity_id);let i={entity_id:e.entity_id,name:e.attributes.friendly_name||e.entity_id,modes:[],immediate:!1,arm_on_close:!1,allow_open:!1,always_on:!1,trigger_unavailable:!1,type:ct.Other,enabled:!0};if("binary_sensor"==a){const a=(e=>{switch(e.attributes.device_class){case"door":case"garage_door":case"lock":case"opening":return ct.Door;case"window":return ct.Window;case"gas":case"heat":case"moisture":case"smoke":case"safety":return ct.Environmental;case"motion":case"moving":case"occupancy":case"presence":return ct.Motion;case"sound":case"opening":case"vibration":return ct.Tamper;default:return}})(e);a&&(i=Object.assign(Object.assign(Object.assign({},i),{type:a}),na(t)[a]))}return i}let ra=class extends oe{async firstUpdated(){const e=await Lt(this.hass);this.areas=e;const t=await Tt(this.hass);this.data=t[this.item],this.data.area||1!=Object.keys(e).length||(this.data=Object.assign(Object.assign({},this.data),{area:Object.keys(this.areas)[0]}))}render(){if(!this.data)return L``;const e=this.hass.states[this.data.entity_id];return L`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${nt("panels.sensors.cards.editor.title",this.hass.language)}
          </div>
          <ha-icon-button icon="hass:close" @click=${this.cancelClick}> </ha-icon-button>
        </div>
        <div class="card-content">
          ${nt("panels.sensors.cards.editor.description",this.hass.language,"{entity}",this.item)}
        </div>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${nt("panels.sensors.cards.editor.fields.name.heading",this.hass.language)}</span>
          <span slot="description"
            >${nt("panels.sensors.cards.editor.fields.name.description",this.hass.language)}</span
          >

          <paper-input
            label="${nt("panels.sensors.cards.editor.fields.name.heading",this.hass.language)}"
            placeholder=${(null==e?void 0:e.attributes.friendly_name)||""}
            value=${this.data.name}
            @change=${e=>this.data={...this.data,name:e.target.value}}
          >
          </paper-input>
        </settings-row>

        ${Object.keys(this.areas).length>1?L`
        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${nt("panels.sensors.cards.editor.fields.area.heading",this.hass.language)}</span>
          <span slot="description">${nt("panels.sensors.cards.editor.fields.area.description",this.hass.language)}</span>

          <alarmo-select
            .items=${Object.values(this.areas).map(e=>Object({value:e.area_id,name:e.name}))}
            value=${this.data.area}
            label=${nt("panels.sensors.cards.editor.fields.area.heading",this.hass.language)}
            @value-changed=${e=>this.data={...this.data,area:e.target.value}}
          </alarmo-select>
        </settings-row>`:""}

        <settings-row .narrow=${this.narrow} .large=${!0}>
          <span slot="heading"
            >${nt("panels.sensors.cards.editor.fields.device_type.heading",this.hass.language)}</span
          >
          <span slot="description"
            >${nt("panels.sensors.cards.editor.fields.device_type.description",this.hass.language)}</span
          >

          <alarmo-select
            .hass=${this.hass}
            .items=${Object.entries(ct).filter(([,e])=>e!=ct.Other).map(([e,t])=>Object({value:t,name:nt(`panels.sensors.cards.editor.fields.device_type.choose.${t}.name`,this.hass.language),description:nt(`panels.sensors.cards.editor.fields.device_type.choose.${t}.description`,this.hass.language),icon:ht[e]}))}
            label=${nt("panels.sensors.cards.editor.fields.device_type.heading",this.hass.language)}
            clearable=${!0}
            icons=${!0}
            value=${this.data.type}
            @value-changed=${e=>this.setType(e.target.value||ct.Other)}
          >
          </alarmo-select>
        </settings-row>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading"
            >${nt("panels.sensors.cards.editor.fields.modes.heading",this.hass.language)}</span
          >
          <span slot="description"
            >${nt("panels.sensors.cards.editor.fields.modes.description",this.hass.language)}</span
          >

          <div>
            ${this.modesByArea(this.data.area).map(e=>L`
                <mwc-button
                  class="${this.data.modes.includes(e)?"active":""}"
                  @click=${()=>{var t,a;this.data={...this.data,modes:this.data.modes.includes(e)?(t=this.data.modes,a=e,t.filter(e=>e!==a)):ft(this.data.modes.concat([e]))}}}
                >
                  <ha-icon icon="${rt[Object.entries(ut).find(([,t])=>t==e)[0]]}"></ha-icon>
                  ${nt("common.modes_short."+e,this.hass.language)}
                </mwc-button>
              `)}
          </div>
        </settings-row>

        <collapsible-section
          .narrow=${this.narrow}
          header=${nt("panels.sensors.cards.editor.actions.toggle_advanced",this.hass.language)}
        >
          ${!this.data.type||[ct.Environmental,ct.Other].includes(this.data.type)?L`
                <settings-row .narrow=${this.narrow}>
                  <span slot="heading"
                    >${nt("panels.sensors.cards.editor.fields.always_on.heading",this.hass.language)}</span
                  >
                  <span slot="description"
                    >${nt("panels.sensors.cards.editor.fields.always_on.description",this.hass.language)}</span
                  >

                  <ha-switch
                    ?checked=${this.data.always_on}
                    @change=${e=>this.data=e.target.checked?{...this.data,always_on:!0,arm_on_close:!1,immediate:!0,allow_open:!1}:{...this.data,always_on:!1}}
                  >
                  </ha-switch>
                </settings-row>
              `:""}
          ${!this.data.type||[ct.Door,ct.Other].includes(this.data.type)?L`
                <settings-row .narrow=${this.narrow}>
                  <span slot="heading"
                    >${nt("panels.sensors.cards.editor.fields.arm_on_close.heading",this.hass.language)}</span
                  >
                  <span slot="description"
                    >${nt("panels.sensors.cards.editor.fields.arm_on_close.description",this.hass.language)}</span
                  >

                  <ha-switch
                    ?checked=${this.data.arm_on_close}
                    ?disabled=${this.data.always_on}
                    @change=${e=>this.data=e.target.checked?{...this.data,arm_on_close:!0,allow_open:!1,immediate:!1,always_on:!1}:{...this.data,arm_on_close:!1}}
                  >
                  </ha-switch>
                </settings-row>
              `:""}
          ${!this.data.type||[ct.Window,ct.Door,ct.Motion,ct.Tamper,ct.Other].includes(this.data.type)?L`
                <settings-row .narrow=${this.narrow}>
                  <span slot="heading"
                    >${nt("panels.sensors.cards.editor.fields.immediate.heading",this.hass.language)}</span
                  >
                  <span slot="description"
                    >${nt("panels.sensors.cards.editor.fields.immediate.description",this.hass.language)}</span
                  >

                  <ha-switch
                    ?checked=${this.data.immediate}
                    ?disabled=${this.data.always_on||this.data.arm_on_close}
                    @change=${e=>this.data=e.target.checked?{...this.data,immediate:!0,arm_on_close:!1,always_on:!1}:{...this.data,immediate:!1}}
                  >
                  </ha-switch>
                </settings-row>
              `:""}
          ${!this.data.type||[ct.Motion,ct.Other].includes(this.data.type)?L`
                <settings-row .narrow=${this.narrow}>
                  <span slot="heading"
                    >${nt("panels.sensors.cards.editor.fields.allow_open.heading",this.hass.language)}</span
                  >
                  <span slot="description"
                    >${nt("panels.sensors.cards.editor.fields.allow_open.description",this.hass.language)}</span
                  >

                  <ha-switch
                    ?checked=${this.data.allow_open}
                    ?disabled=${this.data.always_on||this.data.arm_on_close}
                    @change=${e=>this.data=e.target.checked?{...this.data,allow_open:!0,arm_on_close:!1,always_on:!1}:{...this.data,allow_open:!1}}
                  >
                  </ha-switch>
                </settings-row>
              `:""}

          <settings-row .narrow=${this.narrow}>
            <span slot="heading"
              >${nt("panels.sensors.cards.editor.fields.trigger_unavailable.heading",this.hass.language)}</span
            >
            <span slot="description"
              >${nt("panels.sensors.cards.editor.fields.trigger_unavailable.description",this.hass.language)}</span
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
            ${nt("panels.sensors.cards.editor.actions.remove",this.hass.language)}
          </mwc-button>
        </div>
      </ha-card>
    `}modesByArea(e){const t=Object.keys(this.areas).reduce((e,t)=>Object.assign(e,{[t]:Object.entries(this.areas[t].modes).filter(([,e])=>e.enabled).map(([e])=>e)}),{});return e?t[e]:Object.values(t).reduce((e,t)=>e.filter(e=>t.includes(e)))}setType(e){const t=e!=ct.Other?na(this.modesByArea(this.data.area))[e]:{};this.data=Object.assign(Object.assign(Object.assign({},this.data),{type:e}),t)}deleteClick(e){var t,a;(t=this.hass,a=this.item,t.callApi("POST","alarmo/sensors",{entity_id:a,remove:!0})).catch(t=>kt(t,e)).then(()=>{this.cancelClick()})}saveClick(e){const t=[];this.data.area||t.push(nt("panels.sensors.cards.editor.errors.no_area",this.hass.language)),this.data.modes.length||this.data.always_on||t.push(nt("panels.sensors.cards.editor.errors.no_modes",this.hass.language)),t.length?$t(e,L`
          ${nt("panels.sensors.cards.editor.errors.description",this.hass.language)}
          <ul>
            ${t.map(e=>L`
                  <li>${e}</li>
                `)}
          </ul>
        `):Dt(this.hass,Object.assign({},this.data)).catch(t=>kt(t,e)).then(()=>{this.cancelClick()})}cancelClick(){ze(0,"/alarmo/sensors",!0)}};ra.styles=Pe,t([Z()],ra.prototype,"hass",void 0),t([Z()],ra.prototype,"narrow",void 0),t([Z()],ra.prototype,"item",void 0),t([Z()],ra.prototype,"data",void 0),ra=t([K("sensor-editor-card")],ra);let da=class extends oe{constructor(){super(...arguments),this.items=[],this.value=null}render(){return L`
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
    `}};t([Z({attribute:!1})],da.prototype,"hass",void 0),t([Z()],da.prototype,"items",void 0),t([Z()],da.prototype,"value",void 0),da=t([K("alarmo-chips")],da);let la=class extends(Vt(oe)){constructor(){super(...arguments),this.areas={},this.sensors={},this.addSelection=[],this.showAllSensorEntities=!1,this.areaFilterOptions=[]}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeEvents(()=>this._fetchData(),"alarmo_updated")]}async _fetchData(){this.hass&&(this.areas=await Lt(this.hass),this.sensors=await Tt(this.hass),this.areaFilterOptions=[{value:"no_area",name:nt("panels.sensors.cards.sensors.filter.no_area",this.hass.language),count:Object.values(this.sensors).filter(e=>!e.area).length}].concat(Object.values(this.areas).map(e=>Object({value:e.area_id,name:e.name,count:Object.values(this.sensors).filter(t=>t.area==e.area_id).length})).sort((e,t)=>e.name.toLowerCase()<t.name.toLowerCase()?-1:1)))}firstUpdated(){(async()=>{await qe()})(),this.path&&2==this.path.length&&"filter"==this.path[0]&&(this.selectedArea=this.path[1])}render(){return this.hass?this.path&&2==this.path.length&&"edit"==this.path[0]?L`
        <sensor-editor-card .hass=${this.hass} .narrow=${this.narrow} .item=${this.path[1]}> </sensor-editor-card>
      `:L`
        ${this.sensorsPanel()} ${this.addSensorsPanel()}
      `:L``}sensorsPanel(){if(!this.hass)return L``;const e=Object.keys(this.sensors).map(e=>{const t=this.hass.states[e];return{id:e,name:_t(t),icon:gt(t)}});e.sort((e,t)=>e.name.toLowerCase()<t.name.toLowerCase()?-1:1);const t={icon:{width:"40px"},name:{title:this.hass.localize("ui.components.entity.entity-picker.entity"),width:"60%",grow:!0,text:!0},modes:{title:nt("panels.sensors.cards.sensors.table.arm_modes",this.hass.language),width:"25%",hide:this.narrow,text:!0},enabled:{title:"Enabled",width:"68px",align:"center"}},a=e.filter(e=>!this.selectedArea||!this.areaFilterOptions.find(e=>e.value==this.selectedArea)||this.sensors[e.id].area==this.selectedArea||"no_area"===this.selectedArea&&!this.sensors[e.id].area).map(e=>{const t=Object.entries(ct).find(([,t])=>t==this.sensors[e.id].type)[0];return{icon:L`
            <paper-tooltip animation-delay="0">
              ${nt(`panels.sensors.cards.editor.fields.device_type.choose.${ct[t]}.name`,this.hass.language)}
            </paper-tooltip>
            <ha-icon icon="${ht[t]}"> </ha-icon>
          `,name:L`
            ${this.sensors[e.id].name||vt(e.name)}
            <span class="secondary">${e.id}</span>
          `,id:e.id,modes:L`
            ${this.sensors[e.id].always_on?nt("panels.sensors.cards.sensors.table.always_on",this.hass.language):Object.values(ut).filter(t=>this.sensors[e.id].modes.includes(t)).map(e=>nt("common.modes_short."+e,this.hass.language)).join(", ")}
          `,enabled:L`
            <ha-switch
              @click=${e=>{e.stopPropagation()}}
              ?checked=${this.sensors[e.id].enabled}
              @change=${t=>this.toggleEnabled(t,e.id)}
            >
            </ha-switch>
          `}});return L`
      <ha-card header="${nt("panels.sensors.title",this.hass.language)}">
        <div class="card-content">
          ${nt("panels.sensors.cards.sensors.description",this.hass.language)}
        </div>

        ${this.areaFilterOptions.length>1?L`
              <div class="table-filter" ?narrow=${this.narrow}>
                <span class="header"
                  >${nt("panels.sensors.cards.sensors.filter.label",this.hass.language)}:</span
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
          .columns=${t}
          .data=${a}
          @row-click=${e=>{const t=String(e.detail.id);ze(0,"/alarmo/sensors/edit/"+t,!0)}}
        >
          ${nt("panels.sensors.cards.sensors.no_items",this.hass.language)}
        </alarmo-table>
      </ha-card>
    `}addSensorsPanel(){if(!this.hass)return L``;const e=Object.values(this.hass.states).filter(e=>sa(e,this.showAllSensorEntities)).filter(e=>!Object.keys(this.sensors).includes(e.entity_id)).map(e=>Object({id:e.entity_id,name:_t(e),icon:gt(e)}));e.sort((e,t)=>e.name.toLowerCase()<t.name.toLowerCase()?-1:1);const t={checkbox:{width:"48px"},icon:{width:"40px"},name:{title:this.hass.localize("ui.components.area-picker.add_dialog.name"),width:"40%",grow:!0,text:!0},id:{title:this.hass.localize("ui.components.entity.entity-picker.entity"),width:"40%",hide:this.narrow,text:!0}},a=e.map(e=>({checkbox:L`
          <ha-checkbox
            @change=${t=>this.toggleSelect(t,e.id)}
            ?checked=${this.addSelection.includes(e.id)}
          >
          </ha-checkbox>
        `,icon:L`
          <state-badge .hass=${this.hass} .stateObj=${this.hass.states[e.id]}></state-badge>
        `,name:vt(e.name),id:e.id}));return L`
      <ha-card header="${nt("panels.sensors.cards.add_sensors.title",this.hass.language)}">
        <div class="card-content">
          ${nt("panels.sensors.cards.add_sensors.description",this.hass.language)}
        </div>

        <div style="display: flex; justify-content: flex-end; padding: 8px 16px">
          <ha-switch
            @change=${e=>{this.showAllSensorEntities=e.target.checked}}
            style="padding: 0px 8px"
          >
          </ha-switch>
          ${nt("panels.sensors.cards.add_sensors.actions.show_all",this.hass.language)}
        </div>

        <alarmo-table .columns=${t} .data=${a}>
          ${nt("panels.sensors.cards.add_sensors.no_items",this.hass.language)}
        </alarmo-table>

        <div class="card-actions">
          <mwc-button @click=${this.addSelected} ?disabled=${0==this.addSelection.length}>
            ${nt("panels.sensors.cards.add_sensors.actions.add_to_alarm",this.hass.language)}
          </mwc-button>
        </div>
      </ha-card>
    `}toggleSelect(e,t){const a=e.target.checked;this.addSelection=a&&!this.addSelection.includes(t)?[...this.addSelection,t]:a?this.addSelection:this.addSelection.filter(e=>e!=t)}toggleEnabled(e,t){const a=e.target.checked;Dt(this.hass,{entity_id:t,enabled:a}).catch(t=>kt(t,e)).then()}addSelected(e){if(!this.hass)return;const t=Object.values(this.areas).map(e=>Object.entries(e.modes).filter(([,e])=>e.enabled).map(([e])=>e)).reduce((e,t)=>e.filter(e=>t.includes(e)));this.addSelection.map(e=>oa(this.hass.states[e],t)).map(e=>1==Object.keys(this.areas).length?Object.assign(e,{area:Object.keys(this.areas)[0]}):e).filter(e=>e).forEach(t=>{Dt(this.hass,t).catch(t=>kt(t,e)).then()}),this.addSelection=[]}};la.styles=Pe,t([Z()],la.prototype,"narrow",void 0),t([Z()],la.prototype,"path",void 0),t([Z()],la.prototype,"areas",void 0),t([Z()],la.prototype,"sensors",void 0),t([Z()],la.prototype,"addSelection",void 0),t([Z()],la.prototype,"showAllSensorEntities",void 0),t([Z()],la.prototype,"selectedArea",void 0),t([Z()],la.prototype,"areaFilterOptions",void 0),la=t([K("alarm-view-sensors")],la);let ca=class extends oe{async firstUpdated(){if(this.users=await Mt(this.hass),this.data={name:"",code:"",old_code:"",confirm_code:"",is_admin:!1,can_arm:!0,can_disarm:!0,is_override_code:!1},this.item){const e=this.users[this.item];this.data=Object.assign(Object.assign({},this.data),bt(e,["name","is_admin","can_arm","can_disarm","is_override_code"]))}}render(){return this.data?L`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${this.item?nt("panels.codes.cards.edit_user.title",this.hass.language):nt("panels.codes.cards.new_user.title",this.hass.language)}
          </div>
          <ha-icon-button icon="hass:close" @click=${this.cancelClick}> </ha-icon-button>
        </div>
        <div class="card-content">
          ${this.item?nt("panels.codes.cards.edit_user.description",this.hass.language,"{name}",this.users[this.item].name):nt("panels.codes.cards.new_user.description",this.hass.language)}
        </div>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${nt("panels.codes.cards.new_user.fields.name.heading",this.hass.language)}</span>
          <span slot="description"
            >${nt("panels.codes.cards.new_user.fields.name.description",this.hass.language)}</span
          >

          <paper-input
            label="${nt("panels.codes.cards.new_user.fields.name.heading",this.hass.language)}"
            placeholder=""
            value=${this.data.name}
            @change=${e=>this.data={...this.data,name:e.target.value}}
          >
          </paper-input>
        </settings-row>

        ${this.item?L`
              <settings-row .narrow=${this.narrow}>
                <span slot="heading"
                  >${nt("panels.codes.cards.edit_user.fields.old_code.heading",this.hass.language)}</span
                >
                <span slot="description"
                  >${nt("panels.codes.cards.edit_user.fields.old_code.description",this.hass.language)}</span
                >

                <paper-input
                  label="${nt("panels.codes.cards.edit_user.fields.old_code.heading",this.hass.language)}"
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
                  >${nt("panels.codes.cards.new_user.fields.code.heading",this.hass.language)}</span
                >
                <span slot="description"
                  >${nt("panels.codes.cards.new_user.fields.code.description",this.hass.language)}</span
                >

                <paper-input
                  label="${nt("panels.codes.cards.new_user.fields.code.heading",this.hass.language)}"
                  placeholder=""
                  type="password"
                  value=${this.data.code}
                  @change=${e=>this.data={...this.data,code:e.target.value}}
                >
                </paper-input>
              </settings-row>

              <settings-row .narrow=${this.narrow}>
                <span slot="heading"
                  >${nt("panels.codes.cards.new_user.fields.confirm_code.heading",this.hass.language)}</span
                >
                <span slot="description"
                  >${nt("panels.codes.cards.new_user.fields.confirm_code.description",this.hass.language)}</span
                >

                <paper-input
                  label="${nt("panels.codes.cards.new_user.fields.confirm_code.heading",this.hass.language)}"
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
            >${nt("panels.codes.cards.new_user.fields.is_admin.heading",this.hass.language)}</span
          >
          <span slot="description"
            >${nt("panels.codes.cards.new_user.fields.is_admin.description",this.hass.language)}</span
          >

          <ha-switch
            ?checked=${this.data.is_admin}
            @change=${e=>this.data={...this.data,is_admin:e.target.checked}}
          >
          </ha-switch>
        </settings-row>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading"
            >${nt("panels.codes.cards.new_user.fields.can_arm.heading",this.hass.language)}</span
          >
          <span slot="description"
            >${nt("panels.codes.cards.new_user.fields.can_arm.description",this.hass.language)}</span
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
            >${nt("panels.codes.cards.new_user.fields.can_disarm.heading",this.hass.language)}</span
          >
          <span slot="description"
            >${nt("panels.codes.cards.new_user.fields.can_disarm.description",this.hass.language)}</span
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
            >${nt("panels.codes.cards.new_user.fields.is_override_code.heading",this.hass.language)}</span
          >
          <span slot="description"
            >${nt("panels.codes.cards.new_user.fields.is_override_code.description",this.hass.language)}</span
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
    `:L``}deleteClick(e){var t,a;this.item&&(t=this.hass,a=this.item,t.callApi("POST","alarmo/users",{user_id:a,remove:!0})).catch(t=>kt(t,e)).then(()=>{this.cancelClick()})}saveClick(e){if(this.data)if(this.data.name.length)if(this.data.code.length<4&&(!this.item||this.data.old_code.length))$t(e,nt("panels.codes.cards.new_user.errors.no_code",this.hass.language));else if(this.data.code!==this.data.confirm_code)$t(e,nt("panels.codes.cards.new_user.errors.code_mismatch",this.hass.language));else if(this.data.is_admin&&(this.data=Object.assign(Object.assign({},this.data),{can_arm:!0,can_disarm:!0})),this.item){let t=Object.assign(Object.assign({},bt(this.data,["name","is_admin","can_arm","can_disarm"])),{user_id:this.item});this.data.old_code.length&&(t=Object.assign(Object.assign({},t),{old_code:this.data.old_code,code:this.data.code})),Nt(this.hass,t).catch(t=>kt(t,e)).then(()=>{this.cancelClick()})}else Nt(this.hass,wt(this.data,["confirm_code","old_code"])).catch(t=>kt(t,e)).then(()=>{this.cancelClick()});else $t(e,nt("panels.codes.cards.new_user.errors.no_name",this.hass.language))}cancelClick(){ze(0,"/alarmo/codes",!0)}};ca.styles=Pe,t([Z()],ca.prototype,"hass",void 0),t([Z()],ca.prototype,"narrow",void 0),t([Z()],ca.prototype,"item",void 0),t([Z()],ca.prototype,"data",void 0),ca=t([K("user-editor-card")],ca);let ha=class extends(Vt(oe)){constructor(){super(...arguments),this.users={},this.code_arm_required=!1,this.code_disarm_required=!1,this.code_format="number"}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeEvents(()=>this._fetchData(),"alarmo_updated")]}async _fetchData(){if(!this.hass)return;const e=await Ct(this.hass);this.config=e,this.code_arm_required=e.code_arm_required,this.code_disarm_required=e.code_disarm_required,this.code_format=e.code_format;const t=await Mt(this.hass);this.users=t}render(){return this.hass?this.path&&"new_user"==this.path[0]?L`
        <user-editor-card .hass=${this.hass} .narrow=${this.narrow}> </user-editor-card>
      `:this.path&&2==this.path.length&&"edit_user"==this.path[0]?L`
        <user-editor-card .hass=${this.hass} .narrow=${this.narrow} item=${this.path[1]}> </user-editor-card>
      `:L`
        <ha-card header="${nt("panels.codes.title",this.hass.language)}">
          <div class="card-content">
            ${nt("panels.codes.cards.codes.description",this.hass.language)}
          </div>

          <settings-row .narrow=${this.narrow}>
            <span slot="heading"
              >${nt("panels.codes.cards.codes.fields.code_arm_required.heading",this.hass.language)}</span
            >
            <span slot="description"
              >${nt("panels.codes.cards.codes.fields.code_arm_required.description",this.hass.language)}</span
            >
            <ha-switch
              ?checked=${this.code_arm_required}
              @change=${e=>{this.code_arm_required=e.target.checked}}
            >
            </ha-switch>
          </settings-row>

          <settings-row .narrow=${this.narrow}>
            <span slot="heading"
              >${nt("panels.codes.cards.codes.fields.code_disarm_required.heading",this.hass.language)}</span
            >
            <span slot="description"
              >${nt("panels.codes.cards.codes.fields.code_disarm_required.description",this.hass.language)}</span
            >
            <ha-switch
              ?checked=${this.code_disarm_required}
              @change=${e=>{this.code_disarm_required=e.target.checked}}
            >
            </ha-switch>
          </settings-row>

          <settings-row .narrow=${this.narrow}>
            <span slot="heading"
              >${nt("panels.codes.cards.codes.fields.code_format.heading",this.hass.language)}</span
            >
            <span slot="description"
              >${nt("panels.codes.cards.codes.fields.code_format.description",this.hass.language)}</span
            >
            <mwc-button
              class="${"number"==this.code_format?"active":""} ${this.code_arm_required||this.code_disarm_required?"":"disabled"}"
              @click=${()=>{this.code_format="number"}}
              ?disabled=${!this.code_arm_required&&!this.code_disarm_required}
              >${nt("panels.codes.cards.codes.fields.code_format.code_format_number",this.hass.language)}</mwc-button
            >
            <mwc-button
              class="${"text"==this.code_format?"active":""} ${this.code_arm_required||this.code_disarm_required?"":"disabled"}"
              @click=${()=>{this.code_format="text"}}
              ?disabled=${!this.code_arm_required&&!this.code_disarm_required}
            >
              ${nt("panels.codes.cards.codes.fields.code_format.code_format_text",this.hass.language)}</mwc-button
            >
          </settings-row>

          <div class="card-actions">
            <mwc-button @click=${this.saveClick}>
              ${this.hass.localize("ui.common.save")}
            </mwc-button>
          </div>
        </ha-card>

        ${this.usersPanel()}
      `:L``}usersPanel(){if(!this.hass)return L``;const e=Object.values(this.users);e.sort((e,t)=>e.name.toLowerCase()<t.name.toLowerCase()?-1:1);const t={icon:{width:"40px"},name:{title:this.hass.localize("ui.components.area-picker.add_dialog.name"),width:"40%",grow:!0,text:!0},remarks:{title:nt("panels.codes.cards.user_management.table.remarks",this.hass.language),width:"40%",hide:this.narrow,text:!0}},a=e.map(e=>({id:e.user_id,icon:L`
          <ha-icon icon="mdi:account-outline"></ha-icon>
        `,name:vt(e.name),remarks:e.is_admin?nt("panels.codes.cards.user_management.table.administrator",this.hass.language):""}));return L`
      <ha-card header="${nt("panels.codes.cards.user_management.title",this.hass.language)}">
        <div class="card-content">
          ${nt("panels.codes.cards.user_management.description",this.hass.language)}
        </div>

        <alarmo-table
          ?selectable=${!0}
          .columns=${t}
          .data=${a}
          @row-click=${e=>{const t=String(e.detail.id);ze(0,"/alarmo/codes/edit_user/"+t,!0)}}
        >
          ${nt("panels.codes.cards.user_management.no_items",this.hass.language)}
        </alarmo-table>
        <div class="card-actions">
          <mwc-button @click=${this.addUserClick}>
            ${nt("panels.codes.cards.user_management.actions.new_user",this.hass.language)}
          </mwc-button>
        </div>
      </ha-card>
    `}addUserClick(){ze(0,"/alarmo/codes/new_user",!0)}saveClick(e){this.hass&&zt(this.hass,{code_arm_required:this.code_arm_required,code_disarm_required:this.code_disarm_required,code_format:this.code_format}).catch(t=>kt(t,e)).then()}};ha.styles=Pe,t([Z()],ha.prototype,"narrow",void 0),t([Z()],ha.prototype,"path",void 0),t([Z()],ha.prototype,"config",void 0),t([Z()],ha.prototype,"users",void 0),t([Z()],ha.prototype,"code_arm_required",void 0),t([Z()],ha.prototype,"code_disarm_required",void 0),t([Z()],ha.prototype,"code_format",void 0),ha=t([K("alarm-view-codes")],ha);let ua=class extends oe{constructor(){super(...arguments),this.label="",this.options=[],this.value=[],this.numOptions=1}firstUpdated(){this.value||(this.value=[]),this.value.length>1&&(this.numOptions=this.value.length)}render(){return L`
      <div class="container">
        ${[...Array(this.numOptions).keys()].map(e=>this.renderSelect(e))}
      </div>
    `}renderSelect(e){return L`
      <div>
        <paper-dropdown-menu label=${this.label} ?disabled=${this.disabled}>
          <paper-listbox
            slot="dropdown-content"
            selected=${this.getSelected(e)}
            @selected-item-changed=${t=>this.selectedChange(t,e)}
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
      `}renderOptions(e){const t=this.value.slice(0,e).concat(this.value.slice(e+1));return this.options.filter(e=>e.value).map(e=>L`
          <paper-item value="${e.value}" ?disabled=${t.includes(e.value)}>
            ${e.name||e.value}
          </paper-item>
        `)}getSelected(e){return this.options.filter(e=>e.value).findIndex(t=>t.value==this.value[e])}selectedChange(e,t){if(!e.target.selectedItem)return;const a=e.target.selectedItem.getAttribute("value"),i=this.value.length==t?[...this.value,a]:this.value.slice(0,t).concat(a,this.value.slice(t+1));if(yt(i,this.value))return;this.value=i;const s=new CustomEvent("change");this.dispatchEvent(s)}addOption(){this.numOptions=this.numOptions+1}removeOption(e){this.numOptions=this.numOptions-1,e==this.value.length-1?this.value=this.value.slice(0,e):this.value=this.value.slice(0,e).concat(this.value.slice(e+1))}};ua.styles=se`
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
  `,t([Z()],ua.prototype,"label",void 0),t([Z()],ua.prototype,"options",void 0),t([Z()],ua.prototype,"value",void 0),t([Z({type:Boolean})],ua.prototype,"disabled",void 0),t([Z()],ua.prototype,"numOptions",void 0),ua=t([K("alarmo-multi-select")],ua);const ma=e=>[{value:mt.Armed,name:nt("panels.actions.cards.new_notification.fields.event.choose.armed.name",e.language),description:nt("panels.actions.cards.new_notification.fields.event.choose.armed.description",e.language),icon:"hass:shield-check-outline",trigger:{state:mt.Armed}},{value:mt.Disarmed,name:nt("panels.actions.cards.new_notification.fields.event.choose.disarmed.name",e.language),description:nt("panels.actions.cards.new_notification.fields.event.choose.disarmed.description",e.language),icon:"hass:shield-off-outline",trigger:{state:mt.Disarmed}},{value:mt.Triggered,name:nt("panels.actions.cards.new_notification.fields.event.choose.triggered.name",e.language),description:nt("panels.actions.cards.new_notification.fields.event.choose.triggered.description",e.language),icon:"hass:bell-alert-outline",trigger:{state:mt.Triggered}},{value:pt.ArmFailure,name:nt("panels.actions.cards.new_notification.fields.event.choose.arm_failure.name",e.language),description:nt("panels.actions.cards.new_notification.fields.event.choose.arm_failure.description",e.language),icon:"hass:alert-outline",trigger:{event:pt.ArmFailure}},{value:mt.Arming,name:nt("panels.actions.cards.new_notification.fields.event.choose.arming.name",e.language),description:nt("panels.actions.cards.new_notification.fields.event.choose.arming.description",e.language),icon:"hass:home-export-outline",trigger:{state:mt.Arming}},{value:mt.Pending,name:nt("panels.actions.cards.new_notification.fields.event.choose.pending.name",e.language),description:nt("panels.actions.cards.new_notification.fields.event.choose.pending.description",e.language),icon:"hass:home-import-outline",trigger:{state:mt.Pending}}];function pa(e){const t=Object.keys(e.services.notify).map(t=>{let a={value:"notify."+t,name:t};const i=e.states["device_tracker."+t.replace("mobile_app_","")];return i&&(a=Object.assign(Object.assign({},a),{name:i.attributes.friendly_name||je(i.entity_id)})),a});return t.sort((e,t)=>e.name.toLowerCase()<t.name.toLowerCase()?-1:1),t}const ga={name:"",triggers:[],actions:[{service:"",service_data:{message:""}}]},va={name:"",triggers:[],actions:[{service:"",service_data:{}}]};function _a(e){if(1!=e.triggers.length)return"";if(e.triggers[0].state)switch(e.triggers[0].state){case mt.Armed:return"The alarm is now ON.";case mt.Disarmed:return"The alarm is now OFF.";case mt.Arming:return"The alarm will be armed soon, please leave the house.";case mt.Pending:return"The alarm is about to trigger, disarm it quickly!";case mt.Triggered:return"The alarm is triggered! Cause: {{open_sensors}}.";default:return""}else if(e.triggers[0].event)switch(e.triggers[0].event){case pt.ArmFailure:return"The alarm could not be armed right now, due to: {{open_sensors}}.";default:return""}return""}const fa=["switch","input_boolean","light","script"];function ba(e,t){if(!e.triggers.length)return nt("panels.actions.validation_errors.no_triggers",t.language);for(let a=0;a<e.triggers.length;a++){const i=e.triggers[a];if(!i.event&&!i.state)return nt("panels.actions.validation_errors.empty_trigger",t.language);if(!ma(t).find(e=>JSON.stringify(e.trigger)===JSON.stringify(i)))return nt("panels.actions.validation_errors.invalid_trigger",t.language,"{trigger}",JSON.stringify(i))}if(void 0!==e.modes&&e.modes.length)for(let a=0;a<e.modes.length;a++){const i=e.modes[a];if(!Object.values(ut).includes(i))return nt("panels.actions.validation_errors.empty_trigger",t.language,"{mode}",i)}if(!e.actions.length)return nt("panels.actions.validation_errors.no_actions",t.language);for(let a=0;a<e.actions.length;a++){const i=e.actions[a];if(!i.service)return nt("panels.actions.validation_errors.no_service",t.language);if(!Object.keys(t.services).includes(Oe(i.service)))return nt("panels.actions.validation_errors.invalid_service",t.language,"{service}",i.service);if(!Object.keys(t.services[Oe(i.service)]).includes(je(i.service)))return nt("panels.actions.validation_errors.invalid_service",t.language,"{service}",i.service);if(!i.service_data||!Object.keys(i.service_data).length)return nt("panels.actions.validation_errors.no_service_data",t.language);if(e.is_notification){if(!Object.keys(i.service_data).includes("message")||!i.service_data.message.length)return nt("panels.actions.validation_errors.no_message_in_service_data",t.language)}else if(!Object.keys(i.service_data).includes("entity_id"))return nt("panels.actions.validation_errors.no_entity_in_service_data",t.language)}}let wa=class extends oe{constructor(){super(...arguments),this.yamlMode=!1,this.namePlaceholder="",this.areas={}}async firstUpdated(){const e=await Lt(this.hass);this.areas=e;const t=await Et(this.hass);if(this.item)t[this.item]&&t[this.item].is_notification?this.data=wt(t[this.item],["automation_id","is_notification","enabled"]):this.data=Object.assign({},ga);else{this.data=Object.assign({},ga);let t="My notification";const a=await Et(this.hass);if(Object.values(a).find(e=>e.name==t)){let e=2;for(;Object.values(a).find(a=>a.name==`${t} ${e}`);)e++;t=`${t} ${e}`}this.namePlaceholder=t,this.data.area||1!=Object.keys(e).length||(this.data=Object.assign(Object.assign({},this.data),{area:Object.keys(this.areas)[0]}))}}render(){return this.data?L`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${nt("panels.actions.cards.new_notification.title",this.hass.language)}
          </div>
          <ha-icon-button icon="hass:close" @click=${this.cancelClick}> </ha-icon-button>
        </div>
        <div class="card-content">
          ${nt("panels.actions.cards.new_notification.description",this.hass.language)}
        </div>

        <div style="text-align: right; padding: 0px 16px 16px 16px">
          <mwc-button @click=${this.toggleYaml}>
            ${this.yamlMode?nt("components.editor.ui_mode",this.hass.language):nt("components.editor.yaml_mode",this.hass.language)}
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
    <span slot="heading">${nt("panels.actions.cards.new_notification.fields.event.heading",this.hass.language)}</span>
    <span slot="description">${nt("panels.actions.cards.new_notification.fields.event.description",this.hass.language)}</span>

    <alarmo-select
      .hass=${this.hass}
      .items=${ma(this.hass)}
      label=${nt("panels.actions.cards.new_action.fields.event.heading",this.hass.language)}
      icons=${!0}
      .value=${this.data.triggers.map(e=>ma(this.hass).find(t=>JSON.stringify(t.trigger)==JSON.stringify(e)).value)[0]}
      @value-changed=${e=>this.updateTriggers(e.target.value)}
    >
    </alarmo-select>

  </settings-row>
  
  ${this.areas&&Object.keys(this.areas).length>1?L`
  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${nt("panels.actions.cards.new_action.fields.area.heading",this.hass.language)}</span>
    <span slot="description">${nt("panels.actions.cards.new_action.fields.area.description",this.hass.language)}</span>

    <alarmo-select
      .items=${Object.values(this.areas).map(e=>Object({value:e.area_id,name:e.name}))}
      value=${this.data.area||""}
      clearable=${!0}
      label=${nt("panels.sensors.cards.editor.fields.area.heading",this.hass.language)}
      @value-changed=${e=>this.data={...this.data,area:e.target.value}}
    </alarmo-select>
  </settings-row>`:""}

  <div class="separator"></div>

  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${nt("panels.actions.cards.new_notification.fields.mode.heading",this.hass.language)}</span>
    <span slot="description">${nt("panels.actions.cards.new_notification.fields.mode.description",this.hass.language)}</span>

    <alarmo-multi-select
      label=${nt("panels.actions.cards.new_notification.fields.mode.heading",this.hass.language)}
      ?disabled=${!this.data.triggers.length||this.data.triggers.some(e=>e.state&&e.state==mt.Disarmed)}
      .options=${this.getModeList()}
      .value=${this.data.modes||[]}
      @change=${e=>this.updateModes(e.target.value)}
    </alarmo-multi-select>

  </settings-row>
  
  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${nt("panels.actions.cards.new_notification.fields.title.heading",this.hass.language)}</span>
    <span slot="description">${nt("panels.actions.cards.new_notification.fields.title.description",this.hass.language)}</span>

    <paper-input
      label="${nt("panels.actions.cards.new_notification.fields.title.heading",this.hass.language)}"
      placeholder=""
      value=${this.data.actions[0].service_data.title||""}
      @change=${e=>this.updateTitle(e.target.value)}
    >
    </paper-input>
  </settings-row>

    <settings-row .narrow=${this.narrow} .large=${!0}>
    <span slot="heading">${nt("panels.actions.cards.new_notification.fields.message.heading",this.hass.language)}</span>
    <span slot="description">${nt("panels.actions.cards.new_notification.fields.message.description",this.hass.language)}</span>

    <paper-textarea
      label="${nt("panels.actions.cards.new_notification.fields.message.heading",this.hass.language)}"
      placeholder=${_a(this.data)}
      value=${this.data.actions[0].service_data.message||""}
      @blur=${e=>{this.updateMessage(e.target.value)}}
    >
    </paper-textarea>
  </settings-row>

  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${nt("panels.actions.cards.new_notification.fields.target.heading",this.hass.language)}</span>
    <span slot="description">${nt("panels.actions.cards.new_notification.fields.target.description",this.hass.language)}</span>

    <alarmo-multi-select
      label=${nt("panels.actions.cards.new_notification.fields.target.heading",this.hass.language)}
      .options=${this.getTargetList()}
      .value=${this.data.actions.map(e=>e.service)}
      @change=${e=>this.updateTargets(e.target.value)}
    </alarmo-multi-select>
  </settings-row>

  <settings-row .narrow=${this.narrow} .large=${!0}>
    <span slot="heading">${nt("panels.actions.cards.new_notification.fields.name.heading",this.hass.language)}</span>
    <span slot="description">${nt("panels.actions.cards.new_notification.fields.name.description",this.hass.language)}</span>

    <paper-input
      label="${nt("panels.actions.cards.new_notification.fields.name.heading",this.hass.language)}"
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
            ${nt("panels.actions.cards.new_notification.actions.test",this.hass.language)}
            <ha-icon icon="hass:arrow-right"></ha-icon>
          </mwc-button>
        </div>
      </ha-card>
    `:L``}getTargetList(){return[...Object.values(pa(this.hass)),,...this.data.actions.filter(e=>!pa(this.hass).find(t=>t.value==e.service)).map(e=>Object({value:e.service}))]}getModeList(){var e;return((null===(e=this.data)||void 0===e?void 0:e.area)?this.areas[this.data.area]?Object.entries(this.areas[this.data.area].modes).filter(([,e])=>e.enabled).map(([e])=>e):[]:Object.values(this.areas).map(e=>Object.entries(e.modes).filter(([,e])=>e.enabled).map(([e])=>e)).reduce((e,t)=>e.filter(e=>t.includes(e)))).map(e=>Object({name:nt("common.modes_long."+e,this.hass.language),value:e}))}updateTriggers(e){this.data=Object.assign(Object.assign({},this.data),{triggers:[ma(this.hass).find(t=>t.value==e).trigger]})}updateModes(e){this.data=Object.assign(Object.assign({},this.data),{modes:e})}updateTitle(e){this.data=Object.assign(Object.assign({},this.data),{actions:this.data.actions.map(t=>Object(Object.assign(Object.assign({},t),{service_data:Object.assign(Object.assign({},t.service_data),{title:e})})))})}updateMessage(e){this.data=Object.assign(Object.assign({},this.data),{actions:this.data.actions.map(t=>Object(Object.assign(Object.assign({},t),{service_data:Object.assign(Object.assign({},t.service_data),{message:e})})))})}updateTargets(e){this.data=Object.assign(Object.assign({},this.data),{actions:e.map(e=>Object({service:e,service_data:Object.assign({},this.data.actions[0].service_data)}))})}deleteClick(e){this.item&&Pt(this.hass,this.item).catch(t=>kt(t,e)).then(()=>{this.cancelClick()})}loadFormData(){let e=this.yamlMode?Object.assign({},this.yamlCode):this.data;return e=Object.assign(Object.assign({},e),{is_notification:!0,actions:e.actions.map(t=>!t.service_data||t.service_data.message&&t.service_data.message.length?t:Object.assign(Object.assign({},t),{service_data:Object.assign(Object.assign({},t.service_data),{message:_a(e)})})),name:e.name||this.namePlaceholder,area:e.area||""}),e}async saveClick(e){let t=this.loadFormData();const a=ba(t,this.hass);a?$t(e,a):(this.item&&(t=Object.assign(Object.assign({},t),{automation_id:this.item})),qt(this.hass,t).catch(t=>kt(t,e)).then(()=>{this.cancelClick()}))}toggleYaml(){this.data&&(this.yamlMode=!this.yamlMode,!this.yamlMode&&this.yamlCode?this.data=Object.assign({},this.yamlCode):this.yamlCode=Object.assign({},this.data))}cancelClick(){ze(0,"/alarmo/actions",!0)}testClick(e){const t=this.loadFormData(),a=ba(t,this.hass);a?$t(e,a):t.actions.forEach(t=>{const[a,i]=t.service.split(".");let s=t.service_data.message;s=s.replace("{{open_sensors}}","Some Example Sensor is open"),s=s.replace("{{bypassed_sensors}}","Some Bypassed Sensor"),s=s.replace("{{arm_mode}}","armed_away"),s=s.replace("{{changed_by}}","Some Example User"),t=Object.assign(Object.assign({},t),{service_data:Object.assign(Object.assign({},t.service_data),{message:s})}),this.hass.callService(a,i,t.service_data).then().catch(t=>{$t(e,t.message)})})}};wa.styles=Pe,t([Z()],wa.prototype,"narrow",void 0),t([Z()],wa.prototype,"item",void 0),t([Z()],wa.prototype,"data",void 0),t([Z()],wa.prototype,"yamlMode",void 0),t([Z()],wa.prototype,"namePlaceholder",void 0),t([Z()],wa.prototype,"areas",void 0),wa=t([K("notification-editor-card")],wa);let ya=class extends oe{constructor(){super(...arguments),this.includeDomains=[],this.options=[],this.value=[],this.numOptions=1}firstUpdated(){this.value.length>1&&(this.numOptions=this.value.length)}render(){return this.hass?L`
      <div class="container">
        ${[...Array(this.numOptions).keys()].map(e=>this.renderSelect(e))}
      </div>
    `:L``}renderSelect(e){return L`
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
      </div>
    `}renderButton(e){return e!=this.numOptions-1||e==this.options.length-1?L`
        <ha-icon icon="hass:minus" @click=${()=>this.removeOption(e)}></ha-icon>
      `:this.value&&this.value.length>e?L`
        <ha-icon icon="hass:plus" @click=${this.addOption}></ha-icon>
      `:L`
        <ha-icon class="disabled" icon="hass:plus"></ha-icon>
      `}getValue(e){return e>this.value.length-1?"":this.value[e]}entityFilter(e,t){return!this.value.slice(0,t).concat(this.value.slice(t+1)).includes(e)}selectedChange(e,t){const a=e.target.value;if(!this.entityFilter(a,t))return void this.removeOption(t);const i=this.value.length==t?[...this.value,a]:this.value.slice(0,t).concat(a,this.value.slice(t+1));this.value=i.filter(e=>e);const s=new CustomEvent("change");this.dispatchEvent(s)}addOption(){this.numOptions=this.numOptions+1}removeOption(e){this.numOptions=this.numOptions-1,e==this.value.length-1?this.value=this.value.slice(0,e):this.value=this.value.slice(0,e).concat(this.value.slice(e+1))}};ya.styles=se`
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
  `,t([Z()],ya.prototype,"includeDomains",void 0),t([Z()],ya.prototype,"options",void 0),t([Z()],ya.prototype,"value",void 0),t([Z()],ya.prototype,"numOptions",void 0),ya=t([K("alarmo-multi-entity-select")],ya);let $a=class extends oe{constructor(){super(...arguments),this.yamlMode=!1,this.namePlaceholder="",this.areas={}}async firstUpdated(){const e=await Lt(this.hass);this.areas=e;const t=await Et(this.hass);if(this.item)t[this.item]&&!t[this.item].is_notification?this.data=wt(t[this.item],["automation_id","is_notification","enabled"]):this.data=Object.assign({},va);else{this.data=Object.assign({},va);let t="My notification";const a=await Et(this.hass);if(Object.values(a).find(e=>e.name==t)){let e=2;for(;Object.values(a).find(a=>a.name==`${t} ${e}`);)e++;t=`${t} ${e}`}this.namePlaceholder=t,this.data.area||1!=Object.keys(e).length||(this.data=Object.assign(Object.assign({},this.data),{area:Object.keys(this.areas)[0]}))}}render(){return this.data?L`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${nt("panels.actions.cards.new_action.title",this.hass.language)}
          </div>
          <ha-icon-button icon="hass:close" @click=${this.cancelClick}> </ha-icon-button>
        </div>
        <div class="card-content">
          ${nt("panels.actions.cards.new_action.description",this.hass.language)}
        </div>

        <div style="text-align: right; padding: 0px 16px 16px 16px">
          <mwc-button @click=${this.toggleYaml}>
            ${this.yamlMode?nt("components.editor.ui_mode",this.hass.language):nt("components.editor.yaml_mode",this.hass.language)}
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
    <span slot="heading">${nt("panels.actions.cards.new_action.fields.event.heading",this.hass.language)}</span>
    <span slot="description">${nt("panels.actions.cards.new_action.fields.event.description",this.hass.language)}</span>

    <alarmo-select
      .hass=${this.hass}
      .items=${ma(this.hass)}
      label=${nt("panels.actions.cards.new_action.fields.event.heading",this.hass.language)}
      icons=${!0}
      .value=${this.data.triggers.map(e=>ma(this.hass).find(t=>JSON.stringify(t.trigger)==JSON.stringify(e)).value)[0]}
      @value-changed=${e=>this.updateTriggers(e.target.value)}
    >
    </alarmo-select>

  </settings-row>

  ${this.areas&&Object.keys(this.areas).length>1?L`
  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${nt("panels.actions.cards.new_action.fields.area.heading",this.hass.language)}</span>
    <span slot="description">${nt("panels.actions.cards.new_action.fields.area.description",this.hass.language)}</span>

    <alarmo-select
      .items=${Object.values(this.areas).map(e=>Object({value:e.area_id,name:e.name}))}
      value=${this.data.area||""}
      clearable=${!0}
      label=${nt("panels.sensors.cards.editor.fields.area.heading",this.hass.language)}
      @value-changed=${e=>this.data={...this.data,area:e.target.value}}
    </alarmo-select>
  </settings-row>`:""}

  <div class="separator"></div>

  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${nt("panels.actions.cards.new_action.fields.mode.heading",this.hass.language)}</span>
    <span slot="description">${nt("panels.actions.cards.new_action.fields.mode.description",this.hass.language)}</span>

    <alarmo-multi-select
      label=${nt("panels.actions.cards.new_action.fields.mode.heading",this.hass.language)}
      ?disabled=${!this.data.triggers.length||this.data.triggers.some(e=>e.state&&e.state==mt.Disarmed)}
      .options=${this.getModeList()}
      .value=${this.data.modes||[]}
      @change=${e=>this.updateModes(e.target.value)}
    </alarmo-multi-select>

  </settings-row>

  <settings-row .narrow=${this.narrow} .large=${!0}>
    <span slot="heading">${nt("panels.actions.cards.new_action.fields.entity.heading",this.hass.language)}</span>
    <span slot="description">${nt("panels.actions.cards.new_action.fields.entity.description",this.hass.language)}</span>

    <alarmo-multi-entity-select
      .hass=${this.hass}
      .includeDomains=${fa}
      .value=${this.getEntityValues()}
      @change=${e=>this.updateEntities(e.target.value)}
    ></alarmo-multi-entity-select>
  </settings-row>

  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${nt("panels.actions.cards.new_action.fields.action.heading",this.hass.language)}</span>
    <span slot="description">${nt("panels.actions.cards.new_action.fields.action.description",this.hass.language)}</span>
    <div>
    <mwc-button
      class="${"turn_on"==this.getAction()?"active":""}"
      @click=${()=>{this.updateAction("turn_on")}}
      >
        ${nt("panels.actions.cards.new_action.fields.action.turn_on",this.hass.language)}
      </mwc-button>
    <mwc-button
      class="${"turn_off"==this.getAction()?"active":""}"
      @click=${()=>{this.updateAction("turn_off")}}
    >
      ${nt("panels.actions.cards.new_action.fields.action.turn_off",this.hass.language)}
    </mwc-button>
    </div>
  </settings-row>

  <settings-row .narrow=${this.narrow} .large=${!0}>
    <span slot="heading">${nt("panels.actions.cards.new_action.fields.name.heading",this.hass.language)}</span>
    <span slot="description">${nt("panels.actions.cards.new_action.fields.name.description",this.hass.language)}</span>

    <paper-input
      label="${nt("panels.actions.cards.new_action.fields.name.heading",this.hass.language)}"
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
            ${nt("panels.actions.cards.new_notification.actions.test",this.hass.language)}
            <ha-icon icon="hass:arrow-right"></ha-icon>
          </mwc-button>
        </div>
      </ha-card>
    `:L``}getEntityValues(){var e;return null===(e=this.data)||void 0===e?void 0:e.actions.map(e=>{var t;return null===(t=e.service_data)||void 0===t?void 0:t.entity_id}).filter(e=>e)}getModeList(){var e;return((null===(e=this.data)||void 0===e?void 0:e.area)?this.areas[this.data.area]?Object.entries(this.areas[this.data.area].modes).filter(([,e])=>e.enabled).map(([e])=>e):[]:Object.values(this.areas).map(e=>Object.entries(e.modes).filter(([,e])=>e.enabled).map(([e])=>e)).reduce((e,t)=>e.filter(e=>t.includes(e)))).map(e=>Object({name:nt("common.modes_long."+e,this.hass.language),value:e}))}updateTriggers(e){this.data=Object.assign(Object.assign({},this.data),{triggers:[ma(this.hass).find(t=>t.value==e).trigger]})}updateModes(e){this.data=Object.assign(Object.assign({},this.data),{modes:e})}updateEntities(e){var t;const a=this.getAction(),i=[...(null===(t=this.data)||void 0===t?void 0:t.actions)||[]];e.forEach((e,t)=>{var s;t<i.length&&Oe(i[t].service||(null===(s=i[t].service_data)||void 0===s?void 0:s.entity_id)||"")==Oe(e[t])?i[t]=Object.assign(Object.assign({},i[t]),{service_data:Object.assign(Object.assign({},i[t].service_data),{entity_id:e})}):t<i.length?i[t]={service:a?Oe(e)+"."+a:"",service_data:{entity_id:e}}:i.push({service:a?Oe(e)+"."+a:"",service_data:{entity_id:e}})}),this.data=Object.assign(Object.assign({},this.data),{actions:i})}getAction(){var e;const t=(null===(e=this.data)||void 0===e?void 0:e.actions.map(e=>je(e.service)).filter(e=>e))||[];return 1==ft(t).length?t[0]:""}updateAction(e){this.data=Object.assign(Object.assign({},this.data),{actions:this.data.actions.map(t=>{var a;return Object(Object.assign(Object.assign({},t),{service:(Oe((null===(a=t.service_data)||void 0===a?void 0:a.entity_id)||"")||"homeassistant")+"."+e}))})})}deleteClick(e){this.item&&Pt(this.hass,this.item).catch(t=>kt(t,e)).then(()=>{this.cancelClick()})}loadFormData(){let e=this.yamlMode?Object.assign({},this.yamlCode):this.data;return e=Object.assign(Object.assign({},e),{name:e.name||this.namePlaceholder,area:e.area||""}),e}saveClick(e){let t=this.loadFormData();const a=ba(t,this.hass);a?$t(e,a):(this.item&&(t=Object.assign(Object.assign({},t),{automation_id:this.item})),qt(this.hass,t).catch(t=>kt(t,e)).then(()=>{this.cancelClick()}))}toggleYaml(){this.data&&(this.yamlMode=!this.yamlMode,!this.yamlMode&&this.yamlCode?this.data=Object.assign({},this.yamlCode):this.yamlCode=Object.assign({},this.data))}cancelClick(){ze(0,"/alarmo/actions",!0)}testClick(e){const t=this.loadFormData(),a=ba(t,this.hass);a?$t(e,a):t.actions.forEach(t=>{const[a,i]=t.service.split(".");this.hass.callService(a,i,t.service_data).then().catch(t=>{$t(e,t.message)})})}};$a.styles=Pe,t([Z()],$a.prototype,"narrow",void 0),t([Z()],$a.prototype,"item",void 0),t([Z()],$a.prototype,"data",void 0),t([Z()],$a.prototype,"yamlMode",void 0),t([Z()],$a.prototype,"namePlaceholder",void 0),t([Z()],$a.prototype,"areas",void 0),$a=t([K("automation-editor-card")],$a);let ka=class extends(Vt(oe)){constructor(){super(...arguments),this.automations=[],this.areas={},this.notificationFilterOptions=[],this.automationFilterOptions=[]}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeEvents(()=>this._fetchData(),"alarmo_updated")]}async _fetchData(){if(!this.hass)return;const e=await Et(this.hass);this.automations=Object.values(e),this.areas=await Lt(this.hass),this.notificationFilterOptions=[{value:"no_area",name:nt("panels.actions.cards.notifications.filter.no_area",this.hass.language),count:Object.values(this.automations).filter(e=>e.is_notification&&!e.area).length}].concat(Object.values(this.areas).map(e=>Object({value:e.area_id,name:e.name,count:Object.values(this.automations).filter(t=>t.is_notification&&t.area==e.area_id).length})).sort((e,t)=>e.name.toLowerCase()<t.name.toLowerCase()?-1:1)),this.automationFilterOptions=[{value:"no_area",name:nt("panels.actions.cards.notifications.filter.no_area",this.hass.language),count:Object.values(this.automations).filter(e=>!e.is_notification&&!e.area).length}].concat(Object.values(this.areas).map(e=>Object({value:e.area_id,name:e.name,count:Object.values(this.automations).filter(t=>!t.is_notification&&t.area==e.area_id).length})).sort((e,t)=>e.name.toLowerCase()<t.name.toLowerCase()?-1:1))}firstUpdated(){this.path&&2==this.path.length&&"filter"==this.path[0]&&(this.notificationFilter=this.path[1],this.automationFilter=this.path[1]),(async()=>{await qe()})()}render(){if(!this.hass)return L``;if(this.path&&this.path.length&&"new_notification"==this.path[0])return L`
        <notification-editor-card .hass=${this.hass} .narrow=${this.narrow}> </notification-editor-card>
      `;if(this.path&&2==this.path.length&&"edit_notification"==this.path[0])return L`
        <notification-editor-card .hass=${this.hass} .narrow=${this.narrow} item=${this.path[1]}>
        </notification-editor-card>
      `;if(this.path&&this.path.length&&"new_action"==this.path[0])return L`
        <automation-editor-card .hass=${this.hass} .narrow=${this.narrow}> </automation-editor-card>
      `;if(this.path&&2==this.path.length&&"edit_action"==this.path[0])return L`
        <automation-editor-card .hass=${this.hass} .narrow=${this.narrow} item=${this.path[1]}>
        </automation-editor-card>
      `;{const e={type:{width:"40px"},name:{title:this.hass.localize("ui.components.area-picker.add_dialog.name"),width:"40%",grow:!0,text:!0},enabled:{title:nt("panels.actions.cards.notifications.table.enabled",this.hass.language),width:"68px",align:"center"}},t=this.automations.filter(e=>e.is_notification).filter(e=>!this.notificationFilter||!this.notificationFilterOptions.find(e=>e.value==this.notificationFilter)||e.area==this.notificationFilter||"no_area"===this.notificationFilter&&!e.area).map(e=>Object({id:e.automation_id,type:L`
              <ha-icon icon="hass:message-text-outline"></ha-icon>
            `,name:e.name,enabled:L`
              <ha-switch
                ?checked=${e.enabled}
                @click=${t=>{t.stopPropagation(),this.toggleEnable(t,e.automation_id)}}
              ></ha-switch>
            `})),a=this.automations.filter(e=>!e.is_notification).filter(e=>!this.automationFilter||!this.automationFilterOptions.find(e=>e.value==this.automationFilter)||e.area==this.automationFilter||"no_area"===this.automationFilter&&!e.area).map(e=>Object({id:e.automation_id,type:L`
              <ha-icon icon="hass:flash"></ha-icon>
            `,name:e.name,enabled:L`
              <ha-switch
                ?checked=${e.enabled}
                @click=${t=>{t.stopPropagation(),this.toggleEnable(t,e.automation_id)}}
              ></ha-switch>
            `}));return L`
        <ha-card header="${nt("panels.actions.cards.notifications.title",this.hass.language)}">
          <div class="card-content">
            ${nt("panels.actions.cards.notifications.description",this.hass.language)}
          </div>

          ${this.notificationFilterOptions.length>1?L`
                <div class="table-filter" ?narrow=${this.narrow}>
                  <span class="header"
                    >${nt("panels.actions.cards.notifications.filter.label",this.hass.language)}:</span
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
            .data=${t}
            @row-click=${e=>{const t=String(e.detail.id);ze(0,"/alarmo/actions/edit_notification/"+t,!0)}}
          >
            ${nt("panels.actions.cards.notifications.table.no_items",this.hass.language)}
          </alarmo-table>

          <div class="card-actions">
            <mwc-button @click=${this.addNotificationClick}>
              ${nt("panels.actions.cards.notifications.actions.new_notification",this.hass.language)}
            </mwc-button>
          </div>
        </ha-card>

        <ha-card header="${nt("panels.actions.title",this.hass.language)}">
          <div class="card-content">${nt("panels.actions.cards.actions.description",this.hass.language)}</div>

          ${this.automationFilterOptions.length>1?L`
                <div class="table-filter" ?narrow=${this.narrow}>
                  <span class="header"
                    >${nt("panels.actions.cards.notifications.filter.label",this.hass.language)}:</span
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
            .data=${a}
            @row-click=${e=>{const t=String(e.detail.id);ze(0,"/alarmo/actions/edit_action/"+t,!0)}}
          >
            ${nt("panels.actions.cards.actions.table.no_items",this.hass.language)}
          </alarmo-table>

          <div class="card-actions">
            <mwc-button @click=${this.addActionClick}>
              ${nt("panels.actions.cards.actions.actions.new_action",this.hass.language)}
            </mwc-button>
          </div>
        </ha-card>
      `}}toggleEnable(e,t){qt(this.hass,{automation_id:t,enabled:!e.target.checked}).catch(t=>kt(t,e)).then()}addNotificationClick(){ze(0,"/alarmo/actions/new_notification",!0)}addActionClick(){ze(0,"/alarmo/actions/new_action",!0)}};ka.styles=Pe,t([Z()],ka.prototype,"hass",void 0),t([Z()],ka.prototype,"narrow",void 0),t([Z()],ka.prototype,"path",void 0),t([Z()],ka.prototype,"alarmEntity",void 0),t([Z()],ka.prototype,"automations",void 0),t([Z()],ka.prototype,"areas",void 0),t([Z()],ka.prototype,"notificationFilter",void 0),t([Z()],ka.prototype,"automationFilter",void 0),t([Z()],ka.prototype,"notificationFilterOptions",void 0),t([Z()],ka.prototype,"automationFilterOptions",void 0),ka=t([K("alarm-view-actions")],ka),e.MyAlarmPanel=class extends oe{async firstUpdated(){window.addEventListener("location-changed",()=>{this.requestUpdate()}),await qe(),this.userConfig=await Mt(this.hass),this.requestUpdate()}render(){if(!customElements.get("ha-app-layout")||!this.userConfig)return L`
        loading...
      `;const e=Object.values(this.userConfig).find(e=>e.name.toLowerCase()==this.hass.user.name.toLowerCase());return this.hass.user.is_admin||e&&e.is_admin?L`
        <ha-app-layout>
          <app-header fixed slot="header">
            <app-toolbar>
              <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}> </ha-menu-button>
              <div main-title>
                ${nt("title",this.hass.language)}
              </div>
              <div class="version">
                v${"1.5.3"}
              </div>
            </app-toolbar>
            <ha-tabs
              scrollable
              attr-for-selected="page-name"
              .selected=${this.getPath()[2]||"general"}
              @iron-activate=${this.handlePageSelected}
            >
              <paper-tab page-name="general">
                ${nt("panels.general.title",this.hass.language)}
              </paper-tab>
              <paper-tab page-name="sensors">
                ${nt("panels.sensors.title",this.hass.language)}
              </paper-tab>
              <paper-tab page-name="codes">
                ${nt("panels.codes.title",this.hass.language)}
              </paper-tab>
              <paper-tab page-name="actions">
                ${nt("panels.actions.title",this.hass.language)}
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
      `}getPath(){return window.location.pathname.split("/")}getView(){const e=this.getPath(),t=e[2]||"general",a=e.slice(3);switch(t){case"general":return L`
          <alarm-view-general
            .hass=${this.hass}
            .narrow=${this.narrow}
            .path=${a.length?a:null}
          ></alarm-view-general>
        `;case"sensors":return L`
          <alarm-view-sensors .hass=${this.hass} .narrow=${this.narrow} .path=${a.length?a:null}>
          </alarm-view-sensors>
        `;case"codes":return L`
          <alarm-view-codes .hass=${this.hass} .narrow=${this.narrow} .path=${a.length?a:null}>
          </alarm-view-codes>
        `;case"actions":return L`
          <alarm-view-actions .hass=${this.hass} .narrow=${this.narrow} .path=${a.length?a:null}>
          </alarm-view-actions>
        `;default:return L`
          no view
        `}}handlePageSelected(e){const t=e.detail.item.getAttribute("page-name");t!==this.getPath()?(ze(0,"/alarmo/"+t),this.requestUpdate()):scrollTo(0,0)}static get styles(){return se`
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
    `}},t([Z()],e.MyAlarmPanel.prototype,"hass",void 0),t([Z({type:Boolean,reflect:!0})],e.MyAlarmPanel.prototype,"narrow",void 0),t([Z()],e.MyAlarmPanel.prototype,"userConfig",void 0),e.MyAlarmPanel=t([K("alarm-panel")],e.MyAlarmPanel)}({});
