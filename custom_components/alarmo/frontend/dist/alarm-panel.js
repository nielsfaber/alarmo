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
    ***************************************************************************** */function t(e,t,s,a){var i,n=arguments.length,r=n<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,s):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,s,a);else for(var o=e.length-1;o>=0;o--)(i=e[o])&&(r=(n<3?i(r):n>3?i(t,s,r):i(t,s))||r);return n>3&&r&&Object.defineProperty(t,s,r),r
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
     */}const s="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,a=(e,t,s=null)=>{for(;t!==s;){const s=t.nextSibling;e.removeChild(t),t=s}},i=`{{lit-${String(Math.random()).slice(2)}}}`,n=`\x3c!--${i}--\x3e`,r=new RegExp(`${i}|${n}`);class o{constructor(e,t){this.parts=[],this.element=t;const s=[],a=[],n=document.createTreeWalker(t.content,133,null,!1);let o=0,c=-1,p=0;const{strings:u,values:{length:m}}=e;for(;p<m;){const e=n.nextNode();if(null!==e){if(c++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:s}=t;let a=0;for(let e=0;e<s;e++)d(t[e].name,"$lit$")&&a++;for(;a-- >0;){const t=u[p],s=h.exec(t)[2],a=s.toLowerCase()+"$lit$",i=e.getAttribute(a);e.removeAttribute(a);const n=i.split(r);this.parts.push({type:"attribute",index:c,name:s,strings:n}),p+=n.length-1}}"TEMPLATE"===e.tagName&&(a.push(e),n.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(i)>=0){const a=e.parentNode,i=t.split(r),n=i.length-1;for(let t=0;t<n;t++){let s,n=i[t];if(""===n)s=l();else{const e=h.exec(n);null!==e&&d(e[2],"$lit$")&&(n=n.slice(0,e.index)+e[1]+e[2].slice(0,-"$lit$".length)+e[3]),s=document.createTextNode(n)}a.insertBefore(s,e),this.parts.push({type:"node",index:++c})}""===i[n]?(a.insertBefore(l(),e),s.push(e)):e.data=i[n],p+=n}}else if(8===e.nodeType)if(e.data===i){const t=e.parentNode;null!==e.previousSibling&&c!==o||(c++,t.insertBefore(l(),e)),o=c,this.parts.push({type:"node",index:c}),null===e.nextSibling?e.data="":(s.push(e),c--),p++}else{let t=-1;for(;-1!==(t=e.data.indexOf(i,t+1));)this.parts.push({type:"node",index:-1}),p++}}else n.currentNode=a.pop()}for(const e of s)e.parentNode.removeChild(e)}}const d=(e,t)=>{const s=e.length-t.length;return s>=0&&e.slice(s)===t},c=e=>-1!==e.index,l=()=>document.createComment(""),h=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function p(e,t){const{element:{content:s},parts:a}=e,i=document.createTreeWalker(s,133,null,!1);let n=m(a),r=a[n],o=-1,d=0;const c=[];let l=null;for(;i.nextNode();){o++;const e=i.currentNode;for(e.previousSibling===l&&(l=null),t.has(e)&&(c.push(e),null===l&&(l=e)),null!==l&&d++;void 0!==r&&r.index===o;)r.index=null!==l?-1:r.index-d,n=m(a,n),r=a[n]}c.forEach(e=>e.parentNode.removeChild(e))}const u=e=>{let t=11===e.nodeType?0:1;const s=document.createTreeWalker(e,133,null,!1);for(;s.nextNode();)t++;return t},m=(e,t=-1)=>{for(let s=t+1;s<e.length;s++){const t=e[s];if(c(t))return s}return-1};
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
const g=new WeakMap,f=e=>"function"==typeof e&&g.has(e),_={},w={};
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
class v{constructor(e,t,s){this.__parts=[],this.template=e,this.processor=t,this.options=s}update(e){let t=0;for(const s of this.__parts)void 0!==s&&s.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=s?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],a=this.template.parts,i=document.createTreeWalker(e,133,null,!1);let n,r=0,o=0,d=i.nextNode();for(;r<a.length;)if(n=a[r],c(n)){for(;o<n.index;)o++,"TEMPLATE"===d.nodeName&&(t.push(d),i.currentNode=d.content),null===(d=i.nextNode())&&(i.currentNode=t.pop(),d=i.nextNode());if("node"===n.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(d.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(d,n.name,n.strings,this.options));r++}else this.__parts.push(void 0),r++;return s&&(document.adoptNode(e),customElements.upgrade(e)),e}}
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
     */const b=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),y=` ${i} `;class ${constructor(e,t,s,a){this.strings=e,this.values=t,this.type=s,this.processor=a}getHTML(){const e=this.strings.length-1;let t="",s=!1;for(let a=0;a<e;a++){const e=this.strings[a],r=e.lastIndexOf("\x3c!--");s=(r>-1||s)&&-1===e.indexOf("--\x3e",r+1);const o=h.exec(e);t+=null===o?e+(s?y:n):e.substr(0,o.index)+o[1]+o[2]+"$lit$"+o[3]+i}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==b&&(t=b.createHTML(t)),e.innerHTML=t,e}}
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
     */const x=e=>null===e||!("object"==typeof e||"function"==typeof e),S=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class k{constructor(e,t,s){this.dirty=!0,this.element=e,this.name=t,this.strings=s,this.parts=[];for(let e=0;e<s.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new C(this)}_getValue(){const e=this.strings,t=e.length-1,s=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=s[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!S(e))return e}let a="";for(let i=0;i<t;i++){a+=e[i];const t=s[i];if(void 0!==t){const e=t.value;if(x(e)||!S(e))a+="string"==typeof e?e:String(e);else for(const t of e)a+="string"==typeof t?t:String(t)}}return a+=e[t],a}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class C{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===_||x(e)&&e===this.value||(this.value=e,f(e)||(this.committer.dirty=!0))}commit(){for(;f(this.value);){const e=this.value;this.value=_,e(this)}this.value!==_&&this.committer.commit()}}class A{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(l()),this.endNode=e.appendChild(l())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=l()),e.__insert(this.endNode=l())}insertAfterPart(e){e.__insert(this.startNode=l()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;f(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=_,e(this)}const e=this.__pendingValue;e!==_&&(x(e)?e!==this.value&&this.__commitText(e):e instanceof $?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):S(e)?this.__commitIterable(e):e===w?(this.value=w,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,s="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=s:this.__commitNode(document.createTextNode(s)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof v&&this.value.template===t)this.value.update(e.values);else{const s=new v(t,e.processor,this.options),a=s._clone();s.update(e.values),this.__commitNode(a),this.value=s}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let s,a=0;for(const i of e)s=t[a],void 0===s&&(s=new A(this.options),t.push(s),0===a?s.appendIntoPart(this):s.insertAfterPart(t[a-1])),s.setValue(i),s.commit(),a++;a<t.length&&(t.length=a,this.clear(s&&s.endNode))}clear(e=this.startNode){a(this.startNode.parentNode,e.nextSibling,this.endNode)}}class O{constructor(e,t,s){if(this.value=void 0,this.__pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=s}setValue(e){this.__pendingValue=e}commit(){for(;f(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=_,e(this)}if(this.__pendingValue===_)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=_}}class P extends k{constructor(e,t,s){super(e,t,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new T(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class T extends C{}let N=!1;(()=>{try{const e={get capture(){return N=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class M{constructor(e,t,s){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=s,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;f(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=_,e(this)}if(this.__pendingValue===_)return;const e=this.__pendingValue,t=this.value,s=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),a=null!=e&&(null==t||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),a&&(this.__options=j(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=_}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const j=e=>e&&(N?{capture:e.capture,passive:e.passive,once:e.once}:e.capture)
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
     */;function E(e){let t=q.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},q.set(e.type,t));let s=t.stringsArray.get(e.strings);if(void 0!==s)return s;const a=e.strings.join(i);return s=t.keyString.get(a),void 0===s&&(s=new o(e,e.getTemplateElement()),t.keyString.set(a,s)),t.stringsArray.set(e.strings,s),s}const q=new Map,D=new WeakMap;
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
     */const U=new
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
class{handleAttributeExpressions(e,t,s,a){const i=t[0];if("."===i){return new P(e,t.slice(1),s).parts}if("@"===i)return[new M(e,t.slice(1),a.eventContext)];if("?"===i)return[new O(e,t.slice(1),s)];return new k(e,t,s).parts}handleTextExpression(e){return new A(e)}};
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
     */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const V=(e,...t)=>new $(e,t,"html",U)
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
     */,z=(e,t)=>`${e}--${t}`;let R=!0;void 0===window.ShadyCSS?R=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),R=!1);const H=e=>t=>{const s=z(t.type,e);let a=q.get(s);void 0===a&&(a={stringsArray:new WeakMap,keyString:new Map},q.set(s,a));let n=a.stringsArray.get(t.strings);if(void 0!==n)return n;const r=t.strings.join(i);if(n=a.keyString.get(r),void 0===n){const s=t.getTemplateElement();R&&window.ShadyCSS.prepareTemplateDom(s,e),n=new o(t,s),a.keyString.set(r,n)}return a.stringsArray.set(t.strings,n),n},Y=["html","svg"],F=new Set,L=(e,t,s)=>{F.add(e);const a=s?s.element:document.createElement("template"),i=t.querySelectorAll("style"),{length:n}=i;if(0===n)return void window.ShadyCSS.prepareTemplateStyles(a,e);const r=document.createElement("style");for(let e=0;e<n;e++){const t=i[e];t.parentNode.removeChild(t),r.textContent+=t.textContent}(e=>{Y.forEach(t=>{const s=q.get(z(t,e));void 0!==s&&s.keyString.forEach(e=>{const{element:{content:t}}=e,s=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{s.add(e)}),p(e,s)})})})(e);const o=a.content;s?function(e,t,s=null){const{element:{content:a},parts:i}=e;if(null==s)return void a.appendChild(t);const n=document.createTreeWalker(a,133,null,!1);let r=m(i),o=0,d=-1;for(;n.nextNode();){d++;for(n.currentNode===s&&(o=u(t),s.parentNode.insertBefore(t,s));-1!==r&&i[r].index===d;){if(o>0){for(;-1!==r;)i[r].index+=o,r=m(i,r);return}r=m(i,r)}}}(s,r,o.firstChild):o.insertBefore(r,o.firstChild),window.ShadyCSS.prepareTemplateStyles(a,e);const d=o.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==d)t.insertBefore(d.cloneNode(!0),t.firstChild);else if(s){o.insertBefore(r,o.firstChild);const e=new Set;e.add(r),p(s,e)}};window.JSCompiler_renameProperty=(e,t)=>e;const I={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},B=(e,t)=>t!==e&&(t==t||e==e),W={attribute:!0,type:String,converter:I,reflect:!1,hasChanged:B};class J extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach((t,s)=>{const a=this._attributeNameForProperty(s,t);void 0!==a&&(this._attributeToPropertyMap.set(a,s),e.push(a))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,t)=>this._classProperties.set(t,e))}}static createProperty(e,t=W){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const s="symbol"==typeof e?Symbol():"__"+e,a=this.getPropertyDescriptor(e,s,t);void 0!==a&&Object.defineProperty(this.prototype,e,a)}static getPropertyDescriptor(e,t,s){return{get(){return this[t]},set(a){const i=this[e];this[t]=a,this.requestUpdateInternal(e,i,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||W}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const s of t)this.createProperty(s,e[s])}}static _attributeNameForProperty(e,t){const s=t.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,s=B){return s(e,t)}static _propertyValueFromAttribute(e,t){const s=t.type,a=t.converter||I,i="function"==typeof a?a:a.fromAttribute;return i?i(e,s):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const s=t.type,a=t.converter;return(a&&a.toAttribute||I.toAttribute)(e,s)}initialize(){this._updateState=0,this._updatePromise=new Promise(e=>this._enableUpdatingResolver=e),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,s){t!==s&&this._attributeToProperty(e,s)}_propertyToAttribute(e,t,s=W){const a=this.constructor,i=a._attributeNameForProperty(e,s);if(void 0!==i){const e=a._propertyValueToAttribute(t,s);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(i):this.setAttribute(i,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const s=this.constructor,a=s._attributeToPropertyMap.get(e);if(void 0!==a){const e=s.getPropertyOptions(a);this._updateState=16|this._updateState,this[a]=s._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,s){let a=!0;if(void 0!==e){const i=this.constructor;s=s||i.getPropertyOptions(e),i._valueHasChanged(this[e],t,s.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==s.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,s))):a=!1}!this._hasRequestedUpdate&&a&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((e,t)=>this._propertyToAttribute(t,this[t],e)),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}J.finalized=!0;
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
const Z=e=>t=>"function"==typeof t?((e,t)=>(window.customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:s,elements:a}=t;return{kind:s,elements:a,finisher(t){window.customElements.define(e,t)}}})(e,t),Q=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?Object.assign(Object.assign({},t),{finisher(s){s.createProperty(t.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(s){s.createProperty(t.key,e)}};function G(e){return(t,s)=>void 0!==s?((e,t,s)=>{t.constructor.createProperty(s,e)})(e,t,s):Q(e,t)}
/**
    @license
    Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
    This code may only be used under the BSD style license found at
    http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
    http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
    found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
    part of the polymer project is also subject to an additional IP rights grant
    found at http://polymer.github.io/PATENTS.txt
    */
const K=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,X=Symbol();class ee{constructor(e,t){if(t!==X)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(K?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const te=(e,...t)=>{const s=t.reduce((t,s,a)=>t+(e=>{if(e instanceof ee)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+e[a+1],e[0]);return new ee(s,X)};
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const se={};class ae extends J{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,s)=>e.reduceRight((e,s)=>Array.isArray(s)?t(s,e):(e.add(s),e),s),s=t(e,new Set),a=[];s.forEach(e=>a.unshift(e)),this._styles=a}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map(e=>{if(e instanceof CSSStyleSheet&&!K){const t=Array.prototype.slice.call(e.cssRules).reduce((e,t)=>e+t.cssText,"");return new ee(String(t),X)}return e})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?K?this.renderRoot.adoptedStyleSheets=e.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==se&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){return se}}ae.finalized=!0,ae.render=(e,t,s)=>{if(!s||"object"!=typeof s||!s.scopeName)throw new Error("The `scopeName` option is required.");const i=s.scopeName,n=D.has(t),r=R&&11===t.nodeType&&!!t.host,o=r&&!F.has(i),d=o?document.createDocumentFragment():t;if(((e,t,s)=>{let i=D.get(t);void 0===i&&(a(t,t.firstChild),D.set(t,i=new A(Object.assign({templateFactory:E},s))),i.appendInto(t)),i.setValue(e),i.commit()})(e,d,Object.assign({templateFactory:H(i)},s)),o){const e=D.get(d);D.delete(d);const s=e.value instanceof v?e.value.template:void 0;L(i,d,s),a(t,t.firstChild),t.appendChild(d),D.set(t,e)}!n&&r&&window.ShadyCSS.styleElement(t.host)};var ie=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,ne="[^\\s]+",re=/\[([^]*?)\]/gm;function oe(e,t){for(var s=[],a=0,i=e.length;a<i;a++)s.push(e[a].substr(0,t));return s}var de=function(e){return function(t,s){var a=s[e].map((function(e){return e.toLowerCase()})).indexOf(t.toLowerCase());return a>-1?a:null}};function ce(e){for(var t=[],s=1;s<arguments.length;s++)t[s-1]=arguments[s];for(var a=0,i=t;a<i.length;a++){var n=i[a];for(var r in n)e[r]=n[r]}return e}var le=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],he=["January","February","March","April","May","June","July","August","September","October","November","December"],pe=oe(he,3),ue={dayNamesShort:oe(le,3),dayNames:le,monthNamesShort:pe,monthNames:he,amPm:["am","pm"],DoFn:function(e){return e+["th","st","nd","rd"][e%10>3?0:(e-e%10!=10?1:0)*e%10]}},me=ce({},ue),ge=function(e,t){for(void 0===t&&(t=2),e=String(e);e.length<t;)e="0"+e;return e},fe={D:function(e){return String(e.getDate())},DD:function(e){return ge(e.getDate())},Do:function(e,t){return t.DoFn(e.getDate())},d:function(e){return String(e.getDay())},dd:function(e){return ge(e.getDay())},ddd:function(e,t){return t.dayNamesShort[e.getDay()]},dddd:function(e,t){return t.dayNames[e.getDay()]},M:function(e){return String(e.getMonth()+1)},MM:function(e){return ge(e.getMonth()+1)},MMM:function(e,t){return t.monthNamesShort[e.getMonth()]},MMMM:function(e,t){return t.monthNames[e.getMonth()]},YY:function(e){return ge(String(e.getFullYear()),4).substr(2)},YYYY:function(e){return ge(e.getFullYear(),4)},h:function(e){return String(e.getHours()%12||12)},hh:function(e){return ge(e.getHours()%12||12)},H:function(e){return String(e.getHours())},HH:function(e){return ge(e.getHours())},m:function(e){return String(e.getMinutes())},mm:function(e){return ge(e.getMinutes())},s:function(e){return String(e.getSeconds())},ss:function(e){return ge(e.getSeconds())},S:function(e){return String(Math.round(e.getMilliseconds()/100))},SS:function(e){return ge(Math.round(e.getMilliseconds()/10),2)},SSS:function(e){return ge(e.getMilliseconds(),3)},a:function(e,t){return e.getHours()<12?t.amPm[0]:t.amPm[1]},A:function(e,t){return e.getHours()<12?t.amPm[0].toUpperCase():t.amPm[1].toUpperCase()},ZZ:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+ge(100*Math.floor(Math.abs(t)/60)+Math.abs(t)%60,4)},Z:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+ge(Math.floor(Math.abs(t)/60),2)+":"+ge(Math.abs(t)%60,2)}},_e=function(e){return+e-1},we=[null,"[1-9]\\d?"],ve=[null,ne],be=["isPm",ne,function(e,t){var s=e.toLowerCase();return s===t.amPm[0]?0:s===t.amPm[1]?1:null}],ye=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(e){var t=(e+"").match(/([+-]|\d\d)/gi);if(t){var s=60*+t[1]+parseInt(t[2],10);return"+"===t[0]?s:-s}return 0}],$e=(de("monthNamesShort"),de("monthNames"),{default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",isoDate:"YYYY-MM-DD",isoDateTime:"YYYY-MM-DDTHH:mm:ssZ",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"});var xe=function(e,t,s){if(void 0===t&&(t=$e.default),void 0===s&&(s={}),"number"==typeof e&&(e=new Date(e)),"[object Date]"!==Object.prototype.toString.call(e)||isNaN(e.getTime()))throw new Error("Invalid Date pass to format");var a=[];t=(t=$e[t]||t).replace(re,(function(e,t){return a.push(t),"@@@"}));var i=ce(ce({},me),s);return(t=t.replace(ie,(function(t){return fe[t](e,i)}))).replace(/@@@/g,(function(){return a.shift()}))};(function(){try{(new Date).toLocaleDateString("i")}catch(e){return"RangeError"===e.name}})(),function(){try{(new Date).toLocaleString("i")}catch(e){return"RangeError"===e.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(e){return"RangeError"===e.name}}();var Se="hass:bookmark",ke=function(e,t,s,a){a=a||{},s=null==s?{}:s;var i=new Event(t,{bubbles:void 0===a.bubbles||a.bubbles,cancelable:Boolean(a.cancelable),composed:void 0===a.composed||a.composed});return i.detail=s,e.dispatchEvent(i),i},Ce={alert:"hass:alert",automation:"hass:playlist-play",calendar:"hass:calendar",camera:"hass:video",climate:"hass:thermostat",configurator:"hass:settings",conversation:"hass:text-to-speech",device_tracker:"hass:account",fan:"hass:fan",group:"hass:google-circles-communities",history_graph:"hass:chart-line",homeassistant:"hass:home-assistant",homekit:"hass:home-automation",image_processing:"hass:image-filter-frames",input_boolean:"hass:drawing",input_datetime:"hass:calendar-clock",input_number:"hass:ray-vertex",input_select:"hass:format-list-bulleted",input_text:"hass:textbox",light:"hass:lightbulb",mailbox:"hass:mailbox",notify:"hass:comment-alert",person:"hass:account",plant:"hass:flower",proximity:"hass:apple-safari",remote:"hass:remote",scene:"hass:google-pages",script:"hass:file-document",sensor:"hass:eye",simple_alarm:"hass:bell",sun:"hass:white-balance-sunny",switch:"hass:flash",timer:"hass:timer",updater:"hass:cloud-upload",vacuum:"hass:robot-vacuum",water_heater:"hass:thermometer",weblink:"hass:open-in-new"};function Ae(e,t){if(e in Ce)return Ce[e];switch(e){case"alarm_control_panel":switch(t){case"armed_home":return"hass:bell-plus";case"armed_night":return"hass:bell-sleep";case"disarmed":return"hass:bell-outline";case"triggered":return"hass:bell-ring";default:return"hass:bell"}case"binary_sensor":return t&&"off"===t?"hass:radiobox-blank":"hass:checkbox-marked-circle";case"cover":return"closed"===t?"hass:window-closed":"hass:window-open";case"lock":return t&&"unlocked"===t?"hass:lock-open":"hass:lock";case"media_player":return t&&"off"!==t&&"idle"!==t?"hass:cast-connected":"hass:cast";case"zwave":switch(t){case"dead":return"hass:emoticon-dead";case"sleeping":return"hass:sleep";case"initializing":return"hass:timer-sand";default:return"hass:z-wave"}default:return console.warn("Unable to find icon for domain "+e+" ("+t+")"),Se}}var Oe=function(e,t,s){void 0===s&&(s=!1),s?history.replaceState(null,"",t):history.pushState(null,"",t),ke(window,"location-changed",{replace:s})},Pe={humidity:"hass:water-percent",illuminance:"hass:brightness-5",temperature:"hass:thermometer",pressure:"hass:gauge",power:"hass:flash",signal_strength:"hass:wifi"},Te={binary_sensor:function(e){var t=e.state&&"off"===e.state;switch(e.attributes.device_class){case"battery":return t?"hass:battery":"hass:battery-outline";case"cold":return t?"hass:thermometer":"hass:snowflake";case"connectivity":return t?"hass:server-network-off":"hass:server-network";case"door":return t?"hass:door-closed":"hass:door-open";case"garage_door":return t?"hass:garage":"hass:garage-open";case"gas":case"power":case"problem":case"safety":case"smoke":return t?"hass:shield-check":"hass:alert";case"heat":return t?"hass:thermometer":"hass:fire";case"light":return t?"hass:brightness-5":"hass:brightness-7";case"lock":return t?"hass:lock":"hass:lock-open";case"moisture":return t?"hass:water-off":"hass:water";case"motion":return t?"hass:walk":"hass:run";case"occupancy":return t?"hass:home-outline":"hass:home";case"opening":return t?"hass:square":"hass:square-outline";case"plug":return t?"hass:power-plug-off":"hass:power-plug";case"presence":return t?"hass:home-outline":"hass:home";case"sound":return t?"hass:music-note-off":"hass:music-note";case"vibration":return t?"hass:crop-portrait":"hass:vibrate";case"window":return t?"hass:window-closed":"hass:window-open";default:return t?"hass:radiobox-blank":"hass:checkbox-marked-circle"}},cover:function(e){var t="closed"!==e.state;switch(e.attributes.device_class){case"garage":return t?"hass:garage-open":"hass:garage";case"door":return t?"hass:door-open":"hass:door-closed";case"shutter":return t?"hass:window-shutter-open":"hass:window-shutter";case"blind":return t?"hass:blinds-open":"hass:blinds";case"window":return t?"hass:window-open":"hass:window-closed";default:return Ae("cover",e.state)}},sensor:function(e){var t=e.attributes.device_class;if(t&&t in Pe)return Pe[t];if("battery"===t){var s=Number(e.state);if(isNaN(s))return"hass:battery-unknown";var a=10*Math.round(s/10);return a>=100?"hass:battery":a<=0?"hass:battery-alert":"hass:battery-"+a}var i=e.attributes.unit_of_measurement;return"°C"===i||"°F"===i?"hass:thermometer":Ae("sensor")},input_datetime:function(e){return e.attributes.has_date?e.attributes.has_time?Ae("input_datetime"):"hass:calendar":"hass:clock"}};const Ne=async()=>{if(customElements.get("ha-checkbox")&&customElements.get("ha-slider"))return;await customElements.whenDefined("partial-panel-resolver");const e=document.createElement("partial-panel-resolver");e.hass={panels:[{url_path:"tmp",component_name:"config"}]},e._updateRoutes(),await e.routerOptions.routes.tmp.load(),await customElements.whenDefined("ha-panel-config");const t=document.createElement("ha-panel-config");await t.routerOptions.routes.automation.load(),e.hass={panels:[{url_path:"tmp",component_name:"developer-tools"}]},e._updateRoutes(),await e.routerOptions.routes.tmp.load(),await customElements.whenDefined("ha-app-layout")};var Me,je,Ee;!function(e){e.ArmedAway="armed_away",e.ArmedHome="armed_home",e.ArmedNight="armed_night",e.ArmedCustom="armed_custom_bypass"}(Me||(Me={})),function(e){e.Disarmed="disarmed",e.Armed="armed",e.Triggered="triggered",e.Pending="pending",e.Arming="arming"}(je||(je={})),function(e){e.ArmFailure="arm_failure"}(Ee||(Ee={}));const qe=te`
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
`;var De={modes_long:{armed_away:"Armed Away",armed_home:"Armed Home",armed_night:"Armed Night",armed_custom:"Armed Custom"},modes_short:{armed_away:"Away",armed_home:"Home",armed_night:"Night",armed_custom:"Custom"}},Ue={time_slider:{seconds:"sec",minutes:"min",infinite:"infinite",none:"none"}},Ve={general:{cards:{general:{title:"General settings",description:"This panel defines some settings that apply to all arm modes.",fields:{trigger_time:{heading:"Trigger time",description:"Time during which the siren will sound"},disarm_after_trigger:{heading:"Disarm after trigger",description:"After trigger time has expired, disarm the alarm instead of returning to armed state."},enable_mqtt:{heading:"Enable MQTT",description:"Allow the alarm panel to be controlled through MQTT."}},actions:{setup_mqtt:"MQTT Configuration"}},common:{fields:{leave_time:{heading:"Leave time",description:"After trigger time has expired, disarm the alarm instead of returning to armed state."},entry_time:{heading:"Entry time",description:"After trigger time has expired, disarm the alarm instead of returning to armed state."}}},armed_away:{description:"Armed away will be used when all people left the house. All doors and windows allowing access to the house will be guarded, as well as motion sensors inside the house."},armed_home:{description:"Armed home (also known as armed stay) will be used when setting the alarm while people are in the house. All doors and windows allowing access to the house will be guarded, but not motion sensors inside the house."},armed_night:{description:"Armed night will be used when setting the alarm before going to sleep. All doors and windows allowing access to the house will be guarded, and selected motion sensors (downstairs) in the house."},armed_custom:{description:"An extra mode for defining your own security perimeter."},mqtt:{title:"MQTT configuration",description:"This panel can be used for configuration of the MQTT interface.",fields:{state_topic:{heading:"State topic",description:"Topic on which state updates are published"},command_topic:{heading:"Command topic",description:"Topic on which arm/disarm commands are sent."},require_code:{heading:"Require code",description:"Require the code to be sent with the command."}}}}},sensors:{cards:{sensors:{title:"Sensors",description:"Currently configured sensors. Click on an entity to make changes.",no_items:"There are no sensors added to the alarm yet. Make sure to add them first.",table:{arm_modes:"Arm Modes",always_on:"(Always)"}},add_sensors:{title:"Add Sensors",description:"Add more sensors. Make sure that your sensors have a friendly_name, so you can identify them.",no_items:"There are no available HA entities that can be configured for the alarm. Make sure to include entities of the type binary_sensor.",actions:{add_to_alarm:"add to alarm"}},editor:{title:"Edit Sensor",description:"Configuring the sensor settings of '{entity}'.",fields:{name:{heading:"Name",description:"Overwrite friendly name."},always_on:{heading:"Always on",description:"Sensor should always trigger the alarm."},modes:{heading:"Enabled modes",description:"Alarm modes in which this sensor is active."},immediate:{heading:"Immediate",description:"Sensor should skip the delay."},allow_open:{heading:"Allow open",description:"Allow this sensor to remain active shortly after leaving."}}}},dialogs:{sensor:{title:"Configuration for '{entity}'",actions:{remove:"remove"},fields:{enabled_modes:{heading:"Alarm modes in which this sensor is active"},immediate:{heading:"This sensor should trigger the alarm immediately"}}}}},codes:{cards:{codes:{title:"Codes",description:"Change settings for the code.",fields:{code_arm_required:{heading:"Use arm code",description:"Require a code for arming the alarm"},code_disarm_required:{heading:"Use disarm code",description:"Require a code for disarming the alarm"},code_format:{heading:"Code format",description:"Sets the input type for Lovelace alarm card.",code_format_number:"pincode",code_format_text:"password"}}},user_management:{title:"User management",description:"Each user has its own code to arm/disarm the alarm.",no_items:"There are no users yet",table:{remarks:"Remarks",administrator:"Administrator"},actions:{new_user:"new user"}},new_user:{title:"Create new user",description:"Users can be created for providing access to operating the alarm.",fields:{name:{heading:"Name",description:"Name of the user."},code:{heading:"Code",description:"Code for this user."},confirm_code:{heading:"Confirm code",description:"Repeat the code."},is_admin:{heading:"User is administrator",description:"Allow user to make changes"},can_arm:{heading:"Allow user to arm the alarm",description:"Entering this code activates the alarm"},can_disarm:{heading:"Allow user to disarm the alarm",description:"Entering this code deactivates the alarm"}},errors:{no_name:"No name provided.",no_code:"Code should have 4 characters/numbers minimum.",code_mismatch:"The codes don't match."}},edit_user:{title:"Edit User",description:"Change configuration for user '{name}'.",fields:{old_code:{heading:"Current code",description:"Current code, leave empty to leave unchanged."}},errors:{}}}},actions:{cards:{notifications:{title:"Notifications",description:"Using this panel, you can manage notifications to be sent when during a certain alarm event",table:{enabled:"Enabled",no_items:"There are no notifications created yet."},actions:{new_notification:"new notification"}},actions:{title:"Actions",description:"This panel is still in development. It will be used for switching devices.",table:{no_items:"There are no actions created yet."},actions:{new_action:"new action"}},new_notification:{title:"Create notification",description:"Create a new notification.",fields:{name:{heading:"Name",description:"Description for this notification"},event:{heading:"Event",description:"When should the notification be sent"},title:{heading:"Title",description:"Title for the notification message"},message:{heading:"Message",description:"Content of the notification message"},target:{heading:"Target",description:"Device to send the push message to"}},actions:{ui_mode:"Edit as YAML",yaml_mode:"Edit in UI"}}}}},ze={common:De,components:Ue,panels:Ve},Re={en:Object.freeze({__proto__:null,common:De,components:Ue,panels:Ve,default:ze})};function He(e,t,s="",a=""){const i=t.replace(/['"]+/g,"").replace("-","_");var n;try{n=e.split(".").reduce((e,t)=>e[t],Re[i])}catch(t){n=e.split(".").reduce((e,t)=>e[t],Re.en)}return void 0===n&&(n=e.split(".").reduce((e,t)=>e[t],Re.en)),""!==s&&""!==a&&(n=n.replace(s,a)),n}let Ye=class extends ae{constructor(){super(...arguments),this.min=0,this.max=100,this.step=10,this.value=0,this.scaleFactor=1,this.unit="",this.disabled=!1}firstUpdated(){"min"==this.unit&&(this.scaleFactor=1/60),"min"==this.unit&&(this.step=1)}render(){return V`
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
    `}getValue(){let e=Number(Math.round(this.value*this.scaleFactor));return!e&&this.zeroValue?this.zeroValue:`${e} ${this.getUnit()}`}getUnit(){switch(this.unit){case"sec":return He("components.time_slider.seconds",this.hass.language);case"min":return He("components.time_slider.minutes",this.hass.language);default:return""}}getSlider(){return V`
      <ha-slider
        pin
        min=${Math.round(this.min*this.scaleFactor)}
        max=${Math.round(this.max*this.scaleFactor)}
        step=${this.step}
        value=${Math.round(this.value*this.scaleFactor)}
        ?disabled=${this.disabled}
        @change=${this.updateValue}
      ></ha-slider>
    `}updateValue(e){const t=Number(e.target.value);this.value=Math.round(t/this.scaleFactor)}toggleUnit(){this.unit="min"==this.unit?"sec":"min",this.scaleFactor="min"==this.unit?1/60:1,this.step="min"==this.unit?1:10}};Ye.styles=te`
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
  `,t([G({type:Number})],Ye.prototype,"min",void 0),t([G({type:Number})],Ye.prototype,"max",void 0),t([G({type:Number})],Ye.prototype,"step",void 0),t([G({type:Number})],Ye.prototype,"value",void 0),t([G()],Ye.prototype,"scaleFactor",void 0),t([G({type:String})],Ye.prototype,"unit",void 0),t([G({type:Boolean})],Ye.prototype,"disabled",void 0),t([G({type:String})],Ye.prototype,"zeroValue",void 0),Ye=t([Z("time-slider")],Ye);const Fe=e=>e.callWS({type:"alarmo/config"}),Le=e=>e.callWS({type:"alarmo/sensors"}),Ie=e=>e.callWS({type:"alarmo/users"}),Be=e=>e.callWS({type:"alarmo/automations"}),We=(e,t)=>e.callApi("POST","alarmo/config",t),Je=(e,t)=>e.callApi("POST","alarmo/mode",t),Ze=(e,t)=>e.callApi("POST","alarmo/sensors",t),Qe=(e,t)=>e.callApi("POST","alarmo/users",t),Ge=(e,t)=>e.callApi("POST","alarmo/automations",t);let Ke=class extends ae{constructor(){super(...arguments),this.enabled=!1,this.leave_time=0,this.entry_time=0}firstUpdated(){this.config&&(this.enabled=this.config.enabled,this.leave_time=this.config.leave_time,this.entry_time=this.config.entry_time)}render(){return this.hass?V`
        <ha-card
        >
          <div class="card-header">
            <div class="name">
              <slot name="heading"></slot>
            </div>
            <ha-switch
              ?disabled=${this.mode==Me.ArmedAway}
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
            <span slot="heading">${He("panels.general.cards.common.fields.leave_time.heading",this.hass.language)}</span>
            <span slot="description">${He("panels.general.cards.common.fields.leave_time.description",this.hass.language)}</span>
            <time-slider
              .hass=${this.hass}
              ?disabled=${!this.enabled}
              unit="sec"
              max="180"
              zeroValue=${He("components.time_slider.none",this.hass.language)}
              value=${this.leave_time}
              @change=${e=>{this.leave_time=Number(e.target.value)}}
            >
            </time-slider>
          </settings-row>

          <settings-row .narrow=${this.narrow}>
            <span slot="heading">${He("panels.general.cards.common.fields.entry_time.heading",this.hass.language)}</span>
            <span slot="description">${He("panels.general.cards.common.fields.entry_time.description",this.hass.language)}</span>
            <time-slider
              .hass=${this.hass}
              ?disabled=${!this.enabled}
              unit="sec"
              max="180"
              zeroValue=${He("components.time_slider.none",this.hass.language)}
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
    `:V``}toggleEnable(e){this.hass&&this.mode&&(this.enabled=e.target.checked,Je(this.hass,{mode:this.mode,enabled:this.enabled}).catch(()=>{}).then(()=>{}))}saveClick(){this.hass&&this.mode&&Je(this.hass,{mode:this.mode,leave_time:this.leave_time,entry_time:this.entry_time}).catch(()=>{}).then(()=>{})}};Ke.styles=qe,t([G()],Ke.prototype,"hass",void 0),t([G()],Ke.prototype,"narrow",void 0),t([G({type:String})],Ke.prototype,"mode",void 0),t([G({type:Object})],Ke.prototype,"config",void 0),t([G()],Ke.prototype,"enabled",void 0),t([G()],Ke.prototype,"leave_time",void 0),t([G()],Ke.prototype,"entry_time",void 0),Ke=t([Z("alarm-mode-card")],Ke);let Xe=class extends ae{constructor(){super(...arguments),this.threeLine=!1}render(){return V`
      <div class="info">
        <slot name="heading"></slot>
        <div class="secondary"><slot name="description"></slot></div>
      </div>
      <slot></slot>
    `}static get styles(){return te`
      :host {
        display: flex;
        flex-direction: row;
        padding: 0px 16px;
        align-items: center;
        min-height: 72px;
      }
      :host([narrow]) {
        align-items: normal;
        flex-direction: column;
        border-top: 1px solid var(--divider-color);
        padding: 16px 16px;
      }
      :host([large]) {
        align-items: normal;
        flex-direction: column;
        border-top: 1px solid var(--divider-color);
        border-bottom: 1px solid var(--divider-color);
        padding: 16px 16px;
      }
      ::slotted(ha-switch) {
        padding: 16px 0;
      }
      .info {
        flex: 1 0 60px;
      }
      .secondary {
        color: var(--secondary-text-color);
      }
    `}};t([G({type:Boolean,reflect:!0})],Xe.prototype,"narrow",void 0),t([G({type:Boolean,reflect:!0})],Xe.prototype,"large",void 0),t([G({type:Boolean,attribute:"three-line"})],Xe.prototype,"threeLine",void 0),Xe=t([Z("settings-row")],Xe);const et=e=>{class s extends e{connectedCallback(){super.connectedCallback(),this.__checkSubscribed()}disconnectedCallback(){if(super.disconnectedCallback(),this.__unsubs){for(;this.__unsubs.length;){const e=this.__unsubs.pop();e instanceof Promise?e.then(e=>e()):e()}this.__unsubs=void 0}}updated(e){super.updated(e),e.has("hass")&&this.__checkSubscribed()}hassSubscribe(){return[]}__checkSubscribed(){void 0===this.__unsubs&&this.isConnected&&void 0!==this.hass&&(this.__unsubs=this.hassSubscribe())}}return t([G({attribute:!1})],s.prototype,"hass",void 0),s};function tt(e){return function(e){if(!e)return Se;if(e.attributes.icon)return e.attributes.icon;var t=function(e){return e.substr(0,e.indexOf("."))}(e.entity_id);return t in Te?Te[t](e):Ae(t,e.state)}(e)}function st(e){return(e=e.replace("_"," ")).charAt(0).toUpperCase()+e.slice(1)}function at(e){return e?e.attributes&&e.attributes.friendly_name?e.attributes.friendly_name:String(e.entity_id.split(".").pop()):"(unrecognized entity)"}function it(e,t){return e.filter(e=>e!==t)}function nt(e,t){return e?Object.entries(e).filter(([e])=>t.includes(e)).reduce((e,[t,s])=>Object.assign(e,{[t]:s}),{}):{}}function rt(e,t){return e?Object.entries(e).filter(([e])=>!t.includes(e)).reduce((e,[t,s])=>Object.assign(e,{[t]:s}),{}):{}}function ot(e,t){const s=e.target;ke(s,"show-dialog",{dialogTag:"error-dialog",dialogImport:()=>Promise.resolve().then((function(){return ut})),dialogParams:{error:t}})}function dt(e,t){ot(t,V`
    <b>Something went wrong!</b><br>
    ${e.body.message}<br><br>
    ${e.error}<br><br>
    Please <a href="https://github.com/nielsfaber/alarmo/issues">report</a> the bug.
  `)}let ct=class extends(et(ae)){hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeEvents(()=>this._fetchData(),"alarmo_updated")]}async _fetchData(){if(!this.hass)return;const e=await Fe(this.hass);this.config=e,this.selection=rt(e.mqtt,["availability_topic"])}firstUpdated(){(async()=>{await Ne()})()}render(){return this.hass&&this.selection?V`
      <ha-card>
        <div class="card-header">
          <div class="name">${He("panels.general.cards.mqtt.title",this.hass.language)}</div>
          <ha-icon-button
            icon="hass:close"
            @click=${this.cancelClick}
          >
          </ha-icon-button>
        </div>
        <div class="card-content">${He("panels.general.cards.mqtt.description",this.hass.language)}</div>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${He("panels.general.cards.mqtt.fields.state_topic.heading",this.hass.language)}</span>
          <span slot="description">${He("panels.general.cards.mqtt.fields.state_topic.description",this.hass.language)}</span>
          <paper-input
            label="${He("panels.general.cards.mqtt.fields.state_topic.heading",this.hass.language)}"
            value=${this.selection.state_topic}
            @change=${e=>{this.selection={...this.selection,state_topic:e.target.value}}}
          ></paper-input>
        </settings-row>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${He("panels.general.cards.mqtt.fields.command_topic.heading",this.hass.language)}</span>
          <span slot="description">${He("panels.general.cards.mqtt.fields.command_topic.description",this.hass.language)}</span>
          <paper-input
            label="${He("panels.general.cards.mqtt.fields.command_topic.heading",this.hass.language)}"
            value=${this.selection.command_topic}
            @change=${e=>{this.selection={...this.selection,command_topic:e.target.value}}}
          ></paper-input>
        </settings-row>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${He("panels.general.cards.mqtt.fields.require_code.heading",this.hass.language)}</span>
          <span slot="description">${He("panels.general.cards.mqtt.fields.require_code.description",this.hass.language)}</span>
          <ha-switch
            ?checked=${this.selection.require_code}
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
      
    `:V``}saveClick(e){this.hass&&We(this.hass,{mqtt:this.selection}).catch(t=>dt(t,e)).then(()=>{this.cancelClick()})}cancelClick(){Oe(0,"/alarmo/general",!0)}};ct.styles=qe,t([G()],ct.prototype,"narrow",void 0),t([G()],ct.prototype,"config",void 0),t([G()],ct.prototype,"selection",void 0),ct=t([Z("mqtt-config-card")],ct);let lt=class extends(et(ae)){constructor(){super(...arguments),this.trigger_time=0,this.disarm_after_trigger=!1}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeEvents(()=>this._fetchData(),"alarmo_updated")]}async _fetchData(){if(!this.hass)return;const e=await Fe(this.hass);this.config=e,this.data=nt(this.config,["trigger_time","disarm_after_trigger","mqtt"]),this.trigger_time=e.trigger_time,this.disarm_after_trigger=e.disarm_after_trigger}firstUpdated(){(async()=>{await Ne()})()}render(){var e,t,s,a;return this.hass&&this.config&&this.data?this.path&&"mqtt_configuration"==this.path[0]?V`
      <mqtt-config-card
        .hass=${this.hass}
        .narrow=${this.narrow}
      >
      </mqtt-config-card>
    `:V`
      <ha-card header="${He("panels.general.cards.general.title",this.hass.language)}">
        <div class="card-content">
          ${He("panels.general.cards.general.description",this.hass.language)}
        </div>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${He("panels.general.cards.general.fields.trigger_time.heading",this.hass.language)}</span>
          <span slot="description">${He("panels.general.cards.general.fields.trigger_time.description",this.hass.language)}</span>
          <time-slider
            .hass=${this.hass}
            unit="min"
            max="3600"
            zeroValue=${He("components.time_slider.infinite",this.hass.language)}
            value=${Math.round(this.data.trigger_time)}
            @change=${e=>this.data={...this.data,trigger_time:Number(e.target.value)}}
        }}
          >
          </time-slider>
        </settings-row>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${He("panels.general.cards.general.fields.disarm_after_trigger.heading",this.hass.language)}</span>
          <span slot="description">${He("panels.general.cards.general.fields.disarm_after_trigger.description",this.hass.language)}</span>
          <ha-switch
            ?checked=${this.data.disarm_after_trigger}
            @change=${e=>this.data={...this.data,disarm_after_trigger:e.target.checked}}
        }}
          >
          </ha-switch>
        </settings-row>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${He("panels.general.cards.general.fields.enable_mqtt.heading",this.hass.language)}</span>
          <span slot="description">${He("panels.general.cards.general.fields.enable_mqtt.description",this.hass.language)}</span>
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
            @click=${()=>Oe(0,"/alarmo/general/mqtt_configuration",!0)}
          >
            ${He("panels.general.cards.general.actions.setup_mqtt",this.hass.language)}
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
        mode=${Me.ArmedAway}
        .config=${this.config.modes[Me.ArmedAway]}
        .narrow=${this.narrow}
      >
        <span slot="heading">${He("common.modes_long.armed_away",this.hass.language)}</span>
        <span slot="description">${He("panels.general.cards.armed_away.description",this.hass.language)}</slot>
      </alarm-mode-card>

      <alarm-mode-card
        .hass=${this.hass}
        mode=${Me.ArmedNight}
        .config=${this.config.modes[Me.ArmedNight]}
        .narrow=${this.narrow}
      >
        <span slot="heading">${He("common.modes_long.armed_night",this.hass.language)}</span>
        <span slot="description">${He("panels.general.cards.armed_night.description",this.hass.language)}</slot>
      </alarm-mode-card>

      <alarm-mode-card
        .hass=${this.hass}
        mode=${Me.ArmedHome}
        .config=${this.config.modes[Me.ArmedHome]}
        .narrow=${this.narrow}
      >
        <span slot="heading">${He("common.modes_long.armed_home",this.hass.language)}</span>
        <span slot="description">${He("panels.general.cards.armed_home.description",this.hass.language)}</slot>
      </alarm-mode-card>

      <alarm-mode-card
        .hass=${this.hass}
        mode=${Me.ArmedCustom}
        .config=${this.config.modes[Me.ArmedCustom]}
        .narrow=${this.narrow}
      >
        <span slot="heading">${He("common.modes_long.armed_custom",this.hass.language)}</span>
        <span slot="description">${He("panels.general.cards.armed_custom.description",this.hass.language)}</slot>
      </alarm-mode-card>
    `:V``}saveClick(e){this.hass&&this.data&&We(this.hass,this.data).catch(t=>dt(t,e)).then(()=>{})}};lt.styles=qe,t([G()],lt.prototype,"narrow",void 0),t([G()],lt.prototype,"path",void 0),t([G()],lt.prototype,"data",void 0),t([G()],lt.prototype,"config",void 0),t([G()],lt.prototype,"trigger_time",void 0),t([G()],lt.prototype,"disarm_after_trigger",void 0),lt=t([Z("alarm-view-general")],lt);let ht=class extends ae{async showDialog(e){this._params=e,await this.updateComplete}async closeDialog(){this._params=void 0}render(){return this._params?V`
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
      
    `:V``}static get styles(){return te`
      div.wrapper {
        color: var(--primary-text-color);
      }
    `}};var pt;t([G({attribute:!1})],ht.prototype,"hass",void 0),t([G({attribute:!1,hasChanged:null==pt?void 0:pt.hasChanged})],ht.prototype,"_params",void 0),ht=t([Z("error-dialog")],ht);var ut=Object.freeze({__proto__:null,get ErrorDialog(){return ht}});let mt=class extends ae{async firstUpdated(){const e=await Fe(this.hass);this.config=e;const t=await Le(this.hass);this.data=t[this.item]}render(){if(!this.data)return V``;const e=this.hass.states[this.data.entity_id];return V`
        <ha-card
        >
          <div class="card-header">
            <div class="name">
              ${He("panels.sensors.cards.editor.title",this.hass.language)}
            </div>
            <ha-icon-button
              icon="hass:close"
              @click=${this.cancelClick}
            >
            </ha-icon-button>
          </div>
          <div class="card-content">
              ${He("panels.sensors.cards.editor.description",this.hass.language,"{entity}",e.entity_id)}
          </div>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${He("panels.sensors.cards.editor.fields.name.heading",this.hass.language)}</span>
          <span slot="description">${He("panels.sensors.cards.editor.fields.name.description",this.hass.language)}</span>

          <paper-input
            label="${He("panels.sensors.cards.editor.fields.name.heading",this.hass.language)}"
            placeholder=${e.attributes.friendly_name||""}
            value=${this.data.name}
            @change=${e=>this.data={...this.data,name:e.target.value}}
          >
          </paper-input>

        </settings-row>
        
        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${He("panels.sensors.cards.editor.fields.always_on.heading",this.hass.language)}</span>
          <span slot="description">${He("panels.sensors.cards.editor.fields.always_on.description",this.hass.language)}</span>

          <ha-switch
            ?checked=${this.data.always_on}
            @change=${e=>this.data={...this.data,always_on:e.target.checked}}
          >
          </ha-switch>

        </settings-row>

        ${this.data.always_on?"":V`
        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${He("panels.sensors.cards.editor.fields.modes.heading",this.hass.language)}</span>
          <span slot="description">${He("panels.sensors.cards.editor.fields.modes.description",this.hass.language)}</span>

          <div style="display: flex; flex-direction: column">
          ${Object.values(Me).filter(e=>Object.keys(this.config.modes).includes(e)&&this.config.modes[e].enabled).map(e=>V`
            <div
              style="display: flex; align-items: center; cursor: pointer"
              @click=${e=>{try{e.target.querySelector("ha-checkbox").click()}catch(e){}}}
            >
              <ha-checkbox
                ?checked=${this.data.modes.includes(e)}
                @change=${t=>{var s;this.data={...this.data,modes:t.target.checked?(s=this.data.modes.concat([e]),s.filter((e,t,s)=>s.indexOf(e)===t)):it(this.data.modes,e)}}}
            >
            </ha-checkbox>
            ${He("common.modes_long."+e,this.hass.language)}
            </div>
              `)}
          </div>

        </settings-row>
      `}

        ${this.data.always_on?"":V`
        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${He("panels.sensors.cards.editor.fields.immediate.heading",this.hass.language)}</span>
          <span slot="description">${He("panels.sensors.cards.editor.fields.immediate.description",this.hass.language)}</span>

          <ha-switch
            ?checked=${this.data.immediate}
            @change=${e=>this.data={...this.data,immediate:e.target.checked}}
          >
          </ha-switch>

        </settings-row>
        `}

        
        ${this.data.immediate||this.data.always_on?"":V`
        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${He("panels.sensors.cards.editor.fields.allow_open.heading",this.hass.language)}</span>
          <span slot="description">${He("panels.sensors.cards.editor.fields.allow_open.description",this.hass.language)}</span>

          <ha-switch
            ?checked=${this.data.allow_open}
            @change=${e=>this.data={...this.data,allow_open:e.target.checked}}
          >
          </ha-switch>

        </settings-row>
        `}

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
    `}deleteClick(e){var t,s;(t=this.hass,s=this.item,t.callApi("POST","alarmo/sensors",{entity_id:s,remove:!0})).catch(t=>dt(t,e)).then(()=>{this.cancelClick()})}saveClick(e){Ze(this.hass,Object.assign({},this.data)).catch(t=>dt(t,e)).then(()=>{this.cancelClick()})}cancelClick(){Oe(0,"/alarmo/sensors",!0)}};mt.styles=qe,t([G()],mt.prototype,"hass",void 0),t([G()],mt.prototype,"narrow",void 0),t([G()],mt.prototype,"item",void 0),t([G()],mt.prototype,"data",void 0),mt=t([Z("sensor-editor-card")],mt);let gt=class extends ae{render(){return this.columns&&this.data?V`
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
    `:V``}handleClick(e){if(!this.selectable)return;const t=new CustomEvent("row-click",{detail:{id:e}});this.dispatchEvent(t)}};gt.styles=te`
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
  `,t([G()],gt.prototype,"columns",void 0),t([G()],gt.prototype,"data",void 0),t([G({type:Boolean})],gt.prototype,"selectable",void 0),gt=t([Z("alarmo-table")],gt);const ft=e=>{if("binary_sensor"==function(e){const t="string"==typeof e?e:e.entity_id;return String(t.split(".").shift())}(e.entity_id)){const t=e.attributes.device_class;return!!t&&!!["door","garage_door","gas","heat","lock","moisture","motion","moving","occupancy","opening","presence","safety","smoke","sound","vibration","window"].includes(t)}return!1};function _t(e,t){if(!e)return null;let s={entity_id:e.entity_id,name:e.attributes.friendly_name||e.entity_id,modes:[],immediate:!1,arm_on_close:!1,allow_open:!1,always_on:!1};return s=Object.assign(Object.assign({},s),(e=>{switch(e.attributes.device_class){case"door":case"garage_door":case"lock":case"opening":return{modes:[Me.ArmedAway,Me.ArmedHome,Me.ArmedNight]};case"window":return{modes:[Me.ArmedAway,Me.ArmedHome,Me.ArmedNight],immediate:!0};case"gas":case"heat":case"moisture":case"smoke":return{always_on:!0};case"motion":case"moving":case"occupancy":case"presence":case"sound":return{modes:[Me.ArmedAway]};default:return{}}})(e)),s=Object.assign(Object.assign({},s),{modes:s.modes.filter(e=>t.modes[e].enabled)}),s}let wt=class extends(et(ae)){constructor(){super(...arguments),this.sensors={},this.addSelection=[]}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeEvents(()=>this._fetchData(),"alarmo_updated")]}async _fetchData(){if(!this.hass)return;const e=await Fe(this.hass);this.config=e;const t=await Le(this.hass);this.sensors=t}firstUpdated(){(async()=>{await Ne()})()}render(){return this.hass&&this.config&&this.sensors?this.path&&2==this.path.length&&"edit"==this.path[0]?V`
      <sensor-editor-card
        .hass=${this.hass}
        .narrow=${this.narrow}
        .item=${this.path[1]}
      >

      </sensor-editor-card>
    `:V`
      ${this.sensorsPanel()}
      ${this.addSensorsPanel()}

    `:V``}sensorsPanel(){if(!this.hass)return V``;let e=Object.values(this.hass.states).filter(e=>Object.keys(this.sensors).includes(e.entity_id)).map(e=>Object({id:e.entity_id,name:at(e),icon:tt(e)}));e.sort((e,t)=>e.name.toLowerCase()<t.name.toLowerCase()?-1:1);const t={icon:{width:"40px"},name:{title:this.hass.localize("ui.components.area-picker.add_dialog.name"),width:"50%",grow:!0,text:!0},id:{title:this.hass.localize("ui.components.entity.entity-picker.entity"),width:"40%",hide:this.narrow,text:!0},modes:{title:He("panels.sensors.cards.sensors.table.arm_modes",this.hass.language),width:"25%",text:!0}},s=e.map(e=>({icon:V`<state-badge .hass=${this.hass} .stateObj=${this.hass.states[e.id]}></state-badge>`,name:this.sensors[e.id].name||st(e.name),id:e.id,modes:this.sensors[e.id].always_on?He("panels.sensors.cards.sensors.table.always_on",this.hass.language):this.sensors[e.id].modes.filter(e=>{var t;return null===(t=this.config)||void 0===t?void 0:t.modes[e].enabled}).map(e=>He("common.modes_short."+e,this.hass.language)).join(", ")}));return V`
      <ha-card header="${He("panels.sensors.cards.sensors.title",this.hass.language)}">
        <div class="card-content">
          ${He("panels.sensors.cards.sensors.description",this.hass.language)}
        </div>

      <alarmo-table
        ?selectable=${!0}
        .columns=${t}
        .data=${s}
        @row-click=${e=>{const t=String(e.detail.id);Oe(0,"/alarmo/sensors/edit/"+t,!0)}}
      >
        ${He("panels.sensors.cards.sensors.no_items",this.hass.language)}
      </alarmo-table>
    </ha-card>
    `}addSensorsPanel(){if(!this.hass)return V``;let e=Object.values(this.hass.states).filter(e=>ft(e)).filter(e=>!Object.keys(this.sensors).includes(e.entity_id)).map(e=>Object({id:e.entity_id,name:at(e),icon:tt(e)}));e.sort((e,t)=>e.name.toLowerCase()<t.name.toLowerCase()?-1:1);const t={checkbox:{width:"48px"},icon:{width:"40px"},name:{title:this.hass.localize("ui.components.area-picker.add_dialog.name"),width:"40%",grow:!0,text:!0},id:{title:this.hass.localize("ui.components.entity.entity-picker.entity"),width:"40%",hide:this.narrow,text:!0}},s=e.map(e=>({checkbox:V`
        <ha-checkbox
          @change=${t=>this.toggleSelect(t,e.id)}
          ?checked=${this.addSelection.includes(e.id)}
        >
        </ha-checkbox>`,icon:V`<state-badge .hass=${this.hass} .stateObj=${this.hass.states[e.id]}></state-badge>`,name:st(e.name),id:e.id}));return V`
    <ha-card header="${He("panels.sensors.cards.add_sensors.title",this.hass.language)}">
      <div class="card-content">
        ${He("panels.sensors.cards.add_sensors.description",this.hass.language)}
      </div>

      <alarmo-table
        .columns=${t}
        .data=${s}
      >
        ${He("panels.sensors.cards.add_sensors.no_items",this.hass.language)}
      </alarmo-table>
        
      <div class="card-actions">
        <mwc-button
          @click=${this.addSelected}
          ?disabled=${0==this.addSelection.length}
        >
          ${He("panels.sensors.cards.add_sensors.actions.add_to_alarm",this.hass.language)}
        </mwc-button>
      </div>
    </ha-card>
    `}toggleSelect(e,t){const s=e.target.checked;this.addSelection=s&&!this.addSelection.includes(t)?[...this.addSelection,t]:s?this.addSelection:this.addSelection.filter(e=>e!=t)}addSelected(e){if(!this.hass||!this.config)return;this.addSelection.map(e=>_t(this.hass.states[e],this.config)).filter(e=>e).forEach(t=>{Ze(this.hass,t).catch(t=>dt(t,e)).then(()=>{})}),this.addSelection=[]}};wt.styles=qe,t([G()],wt.prototype,"narrow",void 0),t([G()],wt.prototype,"path",void 0),t([G()],wt.prototype,"config",void 0),t([G()],wt.prototype,"sensors",void 0),t([G()],wt.prototype,"addSelection",void 0),wt=t([Z("alarm-view-sensors")],wt);let vt=class extends ae{async firstUpdated(){if(this.users=await Ie(this.hass),this.data={name:"",code:"",old_code:"",confirm_code:"",is_admin:!1,can_arm:!0,can_disarm:!0},this.item){const e=this.users[this.item];this.data=Object.assign(Object.assign({},this.data),nt(e,["name","is_admin","can_arm","can_disarm"]))}}render(){return this.data?V`
<ha-card>
  <div class="card-header">
    <div class="name">
      ${this.item?He("panels.codes.cards.edit_user.title",this.hass.language):He("panels.codes.cards.new_user.title",this.hass.language)}
    </div>
    <ha-icon-button
      icon="hass:close"
      @click=${this.cancelClick}
    >
    </ha-icon-button>
  </div>
  <div class="card-content">
    ${this.item?He("panels.codes.cards.edit_user.description",this.hass.language,"{name}",this.users[this.item].name):He("panels.codes.cards.new_user.description",this.hass.language)}
  </div>

  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${He("panels.codes.cards.new_user.fields.name.heading",this.hass.language)}</span>
    <span slot="description">${He("panels.codes.cards.new_user.fields.name.description",this.hass.language)}</span>

    <paper-input
      label="${He("panels.codes.cards.new_user.fields.name.heading",this.hass.language)}"
      placeholder=""
      value=${this.data.name}
      @change=${e=>this.data={...this.data,name:e.target.value}}
    >
    </paper-input>
  </settings-row>

      ${this.item?V`
  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${He("panels.codes.cards.edit_user.fields.old_code.heading",this.hass.language)}</span>
    <span slot="description">${He("panels.codes.cards.edit_user.fields.old_code.description",this.hass.language)}</span>

    <paper-input
      label="${He("panels.codes.cards.edit_user.fields.old_code.heading",this.hass.language)}"
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
    <span slot="heading">${He("panels.codes.cards.new_user.fields.code.heading",this.hass.language)}</span>
    <span slot="description">${He("panels.codes.cards.new_user.fields.code.description",this.hass.language)}</span>

    <paper-input
      label="${He("panels.codes.cards.new_user.fields.code.heading",this.hass.language)}"
      placeholder=""
      type="password"
      value=${this.data.code}
      @change=${e=>this.data={...this.data,code:e.target.value}}
    >
    </paper-input>
  </settings-row>

  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${He("panels.codes.cards.new_user.fields.confirm_code.heading",this.hass.language)}</span>
    <span slot="description">${He("panels.codes.cards.new_user.fields.confirm_code.description",this.hass.language)}</span>

    <paper-input
      label="${He("panels.codes.cards.new_user.fields.confirm_code.heading",this.hass.language)}"
      placeholder=""
      type="password"
      value=${this.data.confirm_code}
      @change=${e=>this.data={...this.data,confirm_code:e.target.value}}
    >
    </paper-input>
  </settings-row>
    `}

  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${He("panels.codes.cards.new_user.fields.is_admin.heading",this.hass.language)}</span>
    <span slot="description">${He("panels.codes.cards.new_user.fields.is_admin.description",this.hass.language)}</span>

    <ha-switch
      ?checked=${this.data.is_admin}
      @change=${e=>this.data={...this.data,is_admin:e.target.checked}}
    >
    </ha-switch>
  </settings-row>

  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${He("panels.codes.cards.new_user.fields.can_arm.heading",this.hass.language)}</span>
    <span slot="description">${He("panels.codes.cards.new_user.fields.can_arm.description",this.hass.language)}</span>

    <ha-switch
      ?checked=${this.data.can_arm||this.data.is_admin}
      ?disabled=${this.data.is_admin}
      @change=${e=>this.data={...this.data,can_arm:e.target.checked}}
    >
    </ha-switch>
  </settings-row>

  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${He("panels.codes.cards.new_user.fields.can_disarm.heading",this.hass.language)}</span>
    <span slot="description">${He("panels.codes.cards.new_user.fields.can_disarm.description",this.hass.language)}</span>

    <ha-switch
      ?checked=${this.data.can_disarm||this.data.is_admin}
      ?disabled=${this.data.is_admin}
      @change=${e=>this.data={...this.data,can_disarm:e.target.checked}}
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
    `:V``}deleteClick(e){var t,s;this.item&&(t=this.hass,s=this.item,t.callApi("POST","alarmo/users",{user_id:s,remove:!0})).catch(t=>dt(t,e)).then(()=>{this.cancelClick()})}saveClick(e){if(this.data)if(this.data.name.length)if(this.data.code.length<4&&(!this.item||this.data.old_code.length))ot(e,He("panels.codes.cards.new_user.errors.no_code",this.hass.language));else if(this.data.code!==this.data.confirm_code)ot(e,He("panels.codes.cards.new_user.errors.code_mismatch",this.hass.language));else if(this.data.is_admin&&(this.data=Object.assign(Object.assign({},this.data),{can_arm:!0,can_disarm:!0})),this.item){let t=Object.assign(Object.assign({},nt(this.data,["name","is_admin","can_arm","can_disarm"])),{user_id:this.item});this.data.old_code.length&&(t=Object.assign(Object.assign({},t),{old_code:this.data.old_code,code:this.data.code})),Qe(this.hass,t).catch(t=>dt(t,e)).then(()=>{this.cancelClick()})}else Qe(this.hass,rt(this.data,["confirm_code","old_code"])).catch(t=>dt(t,e)).then(()=>{this.cancelClick()});else ot(e,He("panels.codes.cards.new_user.errors.no_name",this.hass.language))}cancelClick(){Oe(0,"/alarmo/codes",!0)}};vt.styles=qe,t([G()],vt.prototype,"hass",void 0),t([G()],vt.prototype,"narrow",void 0),t([G()],vt.prototype,"item",void 0),t([G()],vt.prototype,"data",void 0),vt=t([Z("user-editor-card")],vt);let bt=class extends(et(ae)){constructor(){super(...arguments),this.users={},this.code_arm_required=!1,this.code_disarm_required=!1,this.code_format="number"}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeEvents(()=>this._fetchData(),"alarmo_updated")]}async _fetchData(){if(!this.hass)return;const e=await Fe(this.hass);this.config=e,this.code_arm_required=e.code_arm_required,this.code_disarm_required=e.code_disarm_required,this.code_format=e.code_format;const t=await Ie(this.hass);this.users=t}render(){return this.hass?this.path&&"new_user"==this.path[0]?V`
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
      <ha-card header="${He("panels.codes.cards.codes.title",this.hass.language)}">
        <div class="card-content">
          ${He("panels.codes.cards.codes.description",this.hass.language)}
        </div>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${He("panels.codes.cards.codes.fields.code_arm_required.heading",this.hass.language)}</span>
          <span slot="description">${He("panels.codes.cards.codes.fields.code_arm_required.description",this.hass.language)}</span>
          <ha-switch
            ?checked=${this.code_arm_required}
            @change=${e=>{this.code_arm_required=e.target.checked}}
          >
          </ha-switch>
        </settings-row>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${He("panels.codes.cards.codes.fields.code_disarm_required.heading",this.hass.language)}</span>
          <span slot="description">${He("panels.codes.cards.codes.fields.code_disarm_required.description",this.hass.language)}</span>
          <ha-switch
            ?checked=${this.code_disarm_required}
            @change=${e=>{this.code_disarm_required=e.target.checked}}
          >
          </ha-switch>
        </settings-row>

        <settings-row .narrow=${this.narrow}>
          <span slot="heading">${He("panels.codes.cards.codes.fields.code_format.heading",this.hass.language)}</span>
          <span slot="description">${He("panels.codes.cards.codes.fields.code_format.description",this.hass.language)}</span>
          <mwc-button
            class="${"number"==this.code_format?"active":""} ${this.code_arm_required||this.code_disarm_required?"":"disabled"}"
            @click=${()=>{this.code_format="number"}}
            ?disabled=${!this.code_arm_required&&!this.code_disarm_required}
            >${He("panels.codes.cards.codes.fields.code_format.code_format_number",this.hass.language)}</mwc-button
          >
          <mwc-button
            class="${"text"==this.code_format?"active":""} ${this.code_arm_required||this.code_disarm_required?"":"disabled"}"
            @click=${()=>{this.code_format="text"}}
            ?disabled=${!this.code_arm_required&&!this.code_disarm_required}
          >
            ${He("panels.codes.cards.codes.fields.code_format.code_format_text",this.hass.language)}</mwc-button
          >
        </settings-row>

        <div class="card-actions">
          <mwc-button @click=${this.saveClick}>
            ${this.hass.localize("ui.common.save")}
          </mwc-button>
        </div>
      </ha-card>

      ${this.usersPanel()}
    `:V``}usersPanel(){if(!this.hass)return V``;let e=Object.values(this.users);e.sort((e,t)=>e.name.toLowerCase()<t.name.toLowerCase()?-1:1);const t={icon:{width:"40px"},name:{title:this.hass.localize("ui.components.area-picker.add_dialog.name"),width:"40%",grow:!0,text:!0},remarks:{title:He("panels.codes.cards.user_management.table.remarks",this.hass.language),width:"40%",hide:this.narrow,text:!0}},s=e.map(e=>({id:e.user_id,icon:V`<ha-icon icon="mdi:account-outline"></ha-icon>`,name:st(e.name),remarks:e.is_admin?He("panels.codes.cards.user_management.table.administrator",this.hass.language):""}));return V`
      <ha-card header="${He("panels.codes.cards.user_management.title",this.hass.language)}">
        <div class="card-content">
          ${He("panels.codes.cards.user_management.description",this.hass.language)}
        </div>

      <alarmo-table
        ?selectable=${!0}
        .columns=${t}
        .data=${s}
        @row-click=${e=>{const t=String(e.detail.id);Oe(0,"/alarmo/codes/edit_user/"+t,!0)}}
      >
        ${He("panels.codes.cards.user_management.no_items",this.hass.language)}
      </alarmo-table>
      <div class="card-actions">
        <mwc-button @click=${this.addUserClick}>
          ${He("panels.codes.cards.user_management.actions.new_user",this.hass.language)}
        </mwc-button>
      </div>
    </ha-card>
    `}addUserClick(){Oe(0,"/alarmo/codes/new_user",!0)}saveClick(e){this.hass&&We(this.hass,{code_arm_required:this.code_arm_required,code_disarm_required:this.code_disarm_required,code_format:this.code_format}).catch(t=>dt(t,e)).then(()=>{})}};bt.styles=qe,t([G()],bt.prototype,"narrow",void 0),t([G()],bt.prototype,"path",void 0),t([G()],bt.prototype,"config",void 0),t([G()],bt.prototype,"users",void 0),t([G()],bt.prototype,"code_arm_required",void 0),t([G()],bt.prototype,"code_disarm_required",void 0),t([G()],bt.prototype,"code_format",void 0),bt=t([Z("alarm-view-codes")],bt);let yt=class extends ae{constructor(){super(...arguments),this.options=[],this.value=[],this.numOptions=1}firstUpdated(){this.value.length>1&&(this.numOptions=this.value.length)}render(){return V`
      <div class="container">
      ${[...Array(this.numOptions).keys()].map(e=>this.renderSelect(e))}
      </div>
    `}renderSelect(e){return V`
      <div>
      <paper-dropdown-menu>
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
      `)}getSelected(e){return this.options.filter(e=>e.value).findIndex(t=>t.value==this.value[e])}selectedChange(e,t){if(!e.target.selectedItem)return;const s=e.target.selectedItem.getAttribute("value");this.value=this.value.length==t?[...this.value,s]:this.value.slice(0,t).concat(s,this.value.slice(t+1));const a=new CustomEvent("change");this.dispatchEvent(a)}addOption(){this.numOptions=this.numOptions+1}removeOption(e){this.numOptions=this.numOptions-1,e==this.value.length-1?this.value=this.value.slice(0,e):this.value=this.value.slice(0,e).concat(this.value.slice(e+1))}};yt.styles=te`
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
    `,t([G()],yt.prototype,"options",void 0),t([G()],yt.prototype,"value",void 0),t([G()],yt.prototype,"numOptions",void 0),yt=t([Z("alarmo-multi-select")],yt);const $t=e=>[{value:je.Armed,trigger:{state:je.Armed},name:"Alarm is armed"},{value:je.Disarmed,trigger:{state:je.Disarmed},name:"Alarm is disarmed"},{value:je.Triggered,trigger:{state:je.Triggered},name:"Alarm is triggered"},{value:Ee.ArmFailure,trigger:{event:Ee.ArmFailure},name:"Failed to arm"},{value:je.Arming,trigger:{state:je.Arming},name:"Leave delay started"},{value:je.Pending,trigger:{state:je.Pending},name:"Entry delay started"}],xt=e=>Object.keys(e.services.notify).map(e=>Object({value:"notify."+e,name:e})),St={name:"",triggers:[],actions:[{service:"",service_data:{title:"",message:""}}]};let kt=class extends ae{constructor(){super(...arguments),this.yamlMode=!1}async firstUpdated(){if(this.data=Object.assign({},St),this.item){const e=rt((await Be(this.hass))[this.item],["automation_id"]);this.data=e}}render(){return this.data?V`
<ha-card>
  <div class="card-header">
    <div class="name">
      ${He("panels.actions.cards.new_notification.title",this.hass.language)}
    </div>
    <ha-icon-button
      icon="hass:close"
      @click=${this.cancelClick}
    >
    </ha-icon-button>
  </div>
  <div class="card-content">
      ${He("panels.actions.cards.new_notification.description",this.hass.language)}
  </div>

  <div style="text-align: right; padding: 0px 16px 16px 16px">
    <mwc-button @click=${this.toggleYaml}>
      ${this.yamlMode?He("panels.actions.cards.new_notification.actions.ui_mode",this.hass.language):He("panels.actions.cards.new_notification.actions.yaml_mode",this.hass.language)}
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
    <span slot="heading">${He("panels.actions.cards.new_notification.fields.name.heading",this.hass.language)}</span>
    <span slot="description">${He("panels.actions.cards.new_notification.fields.name.description",this.hass.language)}</span>

    <paper-input
      label="${He("panels.actions.cards.new_notification.fields.name.heading",this.hass.language)}"
      placeholder=""
      value=${this.data.name}
      @change=${e=>this.data={...this.data,name:e.target.value}}
    >
    </paper-input>
  </settings-row>

  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${He("panels.actions.cards.new_notification.fields.event.heading",this.hass.language)}</span>
    <span slot="description">${He("panels.actions.cards.new_notification.fields.event.description",this.hass.language)}</span>

    <alarmo-multi-select
      .options=${Object.values($t(this.hass))}
      .value=${this.data.triggers.map(e=>$t(this.hass).find(t=>JSON.stringify(t.trigger)==JSON.stringify(e)).value)}
      @change=${e=>this.updateTriggers(e.target.value)}
    </alarmo-multi-select>
  </settings-row>

  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${He("panels.actions.cards.new_notification.fields.title.heading",this.hass.language)}</span>
    <span slot="description">${He("panels.actions.cards.new_notification.fields.title.description",this.hass.language)}</span>

    <paper-input
      label="${He("panels.actions.cards.new_notification.fields.title.heading",this.hass.language)}"
      placeholder=""
      value=${this.data.actions[0].service_data.title||""}
      @change=${e=>this.updateTitle(e.target.value)}
    >
    </paper-input>
  </settings-row>

    <settings-row .narrow=${this.narrow} .large=${!0}>
    <span slot="heading">${He("panels.actions.cards.new_notification.fields.message.heading",this.hass.language)}</span>
    <span slot="description">${He("panels.actions.cards.new_notification.fields.message.description",this.hass.language)}</span>

    <paper-textarea
      label="${He("panels.actions.cards.new_notification.fields.message.heading",this.hass.language)}"
      placeholder=${function(e){if(1!=e.triggers.length)return"";if(e.triggers[0].state)switch(e.triggers[0].state){case je.Armed:return"The alarm is now ON.";case je.Disarmed:return"The alarm is now OFF.";case je.Arming:return"The alarm will be armed soon, please leave the house.";case je.Pending:return"The alarm is about to trigger, disarm it quickly!";case je.Triggered:return"The alarm is triggered! Cause: {{open_sensors}}.";default:return""}else if(e.triggers[0].event)switch(e.triggers[0].event){case Ee.ArmFailure:return"The alarm could not be armed right now, due to: {{open_sensors}}.";default:return""}return""}(this.data)}
      value=${this.data.actions[0].service_data.message||""}
      @blur=${e=>{this.updateMessage(e.target.value)}}
    >
    </paper-textarea>
  </settings-row>

  <settings-row .narrow=${this.narrow}>
    <span slot="heading">${He("panels.actions.cards.new_notification.fields.target.heading",this.hass.language)}</span>
    <span slot="description">${He("panels.actions.cards.new_notification.fields.target.description",this.hass.language)}</span>

    <alarmo-multi-select
      .options=${this.getTargetList()}
      .value=${this.data.actions.map(e=>e.service)}
      @change=${e=>this.updateTargets(e.target.value)}
    </alarmo-multi-select>
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
    `:V``}getTargetList(){return[...Object.values(xt(this.hass)),,...this.data.actions.filter(e=>!xt(this.hass).find(t=>t.value==e.service)).map(e=>Object({value:e.service}))]}updateTriggers(e){this.data=Object.assign(Object.assign({},this.data),{triggers:e.map(e=>$t(this.hass).find(t=>t.value==e).trigger)})}updateTitle(e){this.data=Object.assign(Object.assign({},this.data),{actions:this.data.actions.map(t=>Object(Object.assign(Object.assign({},t),{service_data:Object.assign(Object.assign({},t.service_data),{title:e})})))})}updateMessage(e){this.data=Object.assign(Object.assign({},this.data),{actions:this.data.actions.map(t=>Object(Object.assign(Object.assign({},t),{service_data:Object.assign(Object.assign({},t.service_data),{message:e})})))})}updateTargets(e){this.data=Object.assign(Object.assign({},this.data),{actions:e.map(e=>Object({service:e,service_data:Object.assign({},this.data.actions[0].service_data)}))})}deleteClick(e){var t,s;this.item&&(t=this.hass,s=this.item,t.callApi("POST","alarmo/automations",{automation_id:s,remove:!0})).catch(t=>dt(t,e)).then(()=>{this.cancelClick()})}saveClick(e){let t=Object.assign(Object.assign({},this.data),{is_notification:!0});this.item&&(t=Object.assign(Object.assign({},t),{automation_id:this.item})),Ge(this.hass,t).catch(t=>dt(t,e)).then(()=>{this.cancelClick()})}toggleYaml(){this.data&&(this.yamlMode=!this.yamlMode,!this.yamlMode&&this.yamlCode&&(this.data=Object.assign({},this.yamlCode)))}cancelClick(){Oe(0,"/alarmo/actions",!0)}};kt.styles=qe,t([G()],kt.prototype,"narrow",void 0),t([G()],kt.prototype,"item",void 0),t([G()],kt.prototype,"data",void 0),t([G()],kt.prototype,"yamlMode",void 0),kt=t([Z("notification-editor-card")],kt);let Ct=class extends(et(ae)){constructor(){super(...arguments),this.automations=[]}hassSubscribe(){return this._fetchData(),[this.hass.connection.subscribeEvents(()=>this._fetchData(),"alarmo_updated")]}async _fetchData(){if(!this.hass)return;const e=await Be(this.hass);this.automations=Object.values(e)}render(){if(!this.hass)return V``;if(this.path&&this.path.length&&"new_notification"==this.path[0])return V`
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
      `;{const e={type:{width:"40px"},name:{title:this.hass.localize("ui.components.area-picker.add_dialog.name"),width:"40%",grow:!0,text:!0},enabled:{title:He("panels.actions.cards.notifications.table.enabled",this.hass.language),width:"68px",align:"center"}},t=this.automations.filter(e=>e.is_notification).map(e=>Object({id:e.automation_id,type:V`<ha-icon icon="hass:message-text-outline"></ha-icon>`,name:e.name,enabled:V`<ha-switch
        ?checked=${e.enabled}
        @click=${t=>{t.stopPropagation(),this.toggleEnable(t,e.automation_id)}}
      ></ha-switch>`})),s=this.automations.filter(e=>!e.is_notification).map(e=>Object({id:e.automation_id,type:V`<ha-icon icon="hass:message-text-outline"></ha-icon>`,name:e.name,enabled:V`<ha-switch
        ?checked=${e.enabled}
        @click=${t=>{t.stopPropagation(),this.toggleEnable(t,e.automation_id)}}
      ></ha-switch>`}));return V`

      <ha-card header="${He("panels.actions.cards.notifications.title",this.hass.language)}">
        <div class="card-content">${He("panels.actions.cards.notifications.description",this.hass.language)}</div>
        
      <alarmo-table
        ?selectable=${!0}
        .columns=${e}
        .data=${t}
        @row-click=${e=>{const t=String(e.detail.id);Oe(0,"/alarmo/actions/edit_notification/"+t,!0)}}
      >
        ${He("panels.actions.cards.notifications.table.no_items",this.hass.language)}
      </alarmo-table>

        <div class="card-actions">
          <mwc-button
            @click=${this.addNotificationClick}
          >
            ${He("panels.actions.cards.notifications.actions.new_notification",this.hass.language)}
          </mwc-button>
        </div>
      </ha-card>

      
      <ha-card header="${He("panels.actions.cards.actions.title",this.hass.language)}">
        <div class="card-content">${He("panels.actions.cards.actions.description",this.hass.language)}</div>
                
      <alarmo-table
        ?selectable=${!0}
        .columns=${e}
        .data=${s}
        @row-click=${e=>{const t=String(e.detail.id);Oe(0,"/alarmo/actions/edit_action/"+t,!0)}}
      >
        ${He("panels.actions.cards.actions.table.no_items",this.hass.language)}
      </alarmo-table>

        <div class="card-actions">
          <mwc-button
            @click=${()=>{}}
            disabled
          >
            ${He("panels.actions.cards.actions.actions.new_action",this.hass.language)}
          </mwc-button>
        </div>
      </ha-card>
    `}}toggleEnable(e,t){Ge(this.hass,{automation_id:t,enabled:!e.target.checked}).catch(t=>dt(t,e)).then(()=>{})}addNotificationClick(){Oe(0,"/alarmo/actions/new_notification",!0)}static get styles(){return te`
      ${qe}

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

      

    `}};t([G()],Ct.prototype,"hass",void 0),t([G()],Ct.prototype,"narrow",void 0),t([G()],Ct.prototype,"path",void 0),t([G()],Ct.prototype,"alarmEntity",void 0),t([G()],Ct.prototype,"automations",void 0),Ct=t([Z("alarm-view-actions")],Ct),e.MyAlarmPanel=class extends ae{async firstUpdated(){window.addEventListener("location-changed",()=>{this.requestUpdate()}),await Ne(),this.requestUpdate()}render(){return customElements.get("ha-app-layout")?V`
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
              v${"1.1.1"}
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
    `:V`loading...`}getPath(){return window.location.pathname.split("/")}getView(){const e=this.getPath(),t=e[2]||"general",s=e.slice(3);switch(t){case"general":return V`
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
      `;default:return V`no view`}}handlePageSelected(e){const t=e.detail.item.getAttribute("page-name");t!==this.getPath()?(Oe(0,"/alarmo/"+t),this.requestUpdate()):scrollTo(0,0)}static get styles(){return te`
      ${qe}

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
    `}},t([G()],e.MyAlarmPanel.prototype,"hass",void 0),t([G({type:Boolean,reflect:!0})],e.MyAlarmPanel.prototype,"narrow",void 0),e.MyAlarmPanel=t([Z("alarm-panel")],e.MyAlarmPanel)}({});
