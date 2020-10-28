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
    ***************************************************************************** */function t(e,t,s,i){var a,r=arguments.length,n=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,s,i);else for(var o=e.length-1;o>=0;o--)(a=e[o])&&(n=(r<3?a(n):r>3?a(t,s,n):a(t,s))||n);return r>3&&n&&Object.defineProperty(t,s,n),n
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
     */}const s="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,i=(e,t,s=null)=>{for(;t!==s;){const s=t.nextSibling;e.removeChild(t),t=s}},a=`{{lit-${String(Math.random()).slice(2)}}}`,r=`\x3c!--${a}--\x3e`,n=new RegExp(`${a}|${r}`);class o{constructor(e,t){this.parts=[],this.element=t;const s=[],i=[],r=document.createTreeWalker(t.content,133,null,!1);let o=0,c=-1,u=0;const{strings:p,values:{length:m}}=e;for(;u<m;){const e=r.nextNode();if(null!==e){if(c++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:s}=t;let i=0;for(let e=0;e<s;e++)d(t[e].name,"$lit$")&&i++;for(;i-- >0;){const t=p[u],s=l.exec(t)[2],i=s.toLowerCase()+"$lit$",a=e.getAttribute(i);e.removeAttribute(i);const r=a.split(n);this.parts.push({type:"attribute",index:c,name:s,strings:r}),u+=r.length-1}}"TEMPLATE"===e.tagName&&(i.push(e),r.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(a)>=0){const i=e.parentNode,a=t.split(n),r=a.length-1;for(let t=0;t<r;t++){let s,r=a[t];if(""===r)s=h();else{const e=l.exec(r);null!==e&&d(e[2],"$lit$")&&(r=r.slice(0,e.index)+e[1]+e[2].slice(0,-"$lit$".length)+e[3]),s=document.createTextNode(r)}i.insertBefore(s,e),this.parts.push({type:"node",index:++c})}""===a[r]?(i.insertBefore(h(),e),s.push(e)):e.data=a[r],u+=r}}else if(8===e.nodeType)if(e.data===a){const t=e.parentNode;null!==e.previousSibling&&c!==o||(c++,t.insertBefore(h(),e)),o=c,this.parts.push({type:"node",index:c}),null===e.nextSibling?e.data="":(s.push(e),c--),u++}else{let t=-1;for(;-1!==(t=e.data.indexOf(a,t+1));)this.parts.push({type:"node",index:-1}),u++}}else r.currentNode=i.pop()}for(const e of s)e.parentNode.removeChild(e)}}const d=(e,t)=>{const s=e.length-t.length;return s>=0&&e.slice(s)===t},c=e=>-1!==e.index,h=()=>document.createComment(""),l=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function u(e,t){const{element:{content:s},parts:i}=e,a=document.createTreeWalker(s,133,null,!1);let r=m(i),n=i[r],o=-1,d=0;const c=[];let h=null;for(;a.nextNode();){o++;const e=a.currentNode;for(e.previousSibling===h&&(h=null),t.has(e)&&(c.push(e),null===h&&(h=e)),null!==h&&d++;void 0!==n&&n.index===o;)n.index=null!==h?-1:n.index-d,r=m(i,r),n=i[r]}c.forEach(e=>e.parentNode.removeChild(e))}const p=e=>{let t=11===e.nodeType?0:1;const s=document.createTreeWalker(e,133,null,!1);for(;s.nextNode();)t++;return t},m=(e,t=-1)=>{for(let s=t+1;s<e.length;s++){const t=e[s];if(c(t))return s}return-1};
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
const g=new WeakMap,v=e=>"function"==typeof e&&g.has(e),f={},y={};
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
class w{constructor(e,t,s){this.__parts=[],this.template=e,this.processor=t,this.options=s}update(e){let t=0;for(const s of this.__parts)void 0!==s&&s.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=s?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],i=this.template.parts,a=document.createTreeWalker(e,133,null,!1);let r,n=0,o=0,d=a.nextNode();for(;n<i.length;)if(r=i[n],c(r)){for(;o<r.index;)o++,"TEMPLATE"===d.nodeName&&(t.push(d),a.currentNode=d.content),null===(d=a.nextNode())&&(a.currentNode=t.pop(),d=a.nextNode());if("node"===r.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(d.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(d,r.name,r.strings,this.options));n++}else this.__parts.push(void 0),n++;return s&&(document.adoptNode(e),customElements.upgrade(e)),e}}
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
     */const _=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),b=` ${a} `;class S{constructor(e,t,s,i){this.strings=e,this.values=t,this.type=s,this.processor=i}getHTML(){const e=this.strings.length-1;let t="",s=!1;for(let i=0;i<e;i++){const e=this.strings[i],n=e.lastIndexOf("\x3c!--");s=(n>-1||s)&&-1===e.indexOf("--\x3e",n+1);const o=l.exec(e);t+=null===o?e+(s?b:r):e.substr(0,o.index)+o[1]+o[2]+"$lit$"+o[3]+a}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==_&&(t=_.createHTML(t)),e.innerHTML=t,e}}
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
     */const x=e=>null===e||!("object"==typeof e||"function"==typeof e),$=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class k{constructor(e,t,s){this.dirty=!0,this.element=e,this.name=t,this.strings=s,this.parts=[];for(let e=0;e<s.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new A(this)}_getValue(){const e=this.strings,t=e.length-1,s=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=s[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!$(e))return e}let i="";for(let a=0;a<t;a++){i+=e[a];const t=s[a];if(void 0!==t){const e=t.value;if(x(e)||!$(e))i+="string"==typeof e?e:String(e);else for(const t of e)i+="string"==typeof t?t:String(t)}}return i+=e[t],i}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class A{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===f||x(e)&&e===this.value||(this.value=e,v(e)||(this.committer.dirty=!0))}commit(){for(;v(this.value);){const e=this.value;this.value=f,e(this)}this.value!==f&&this.committer.commit()}}class C{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(h()),this.endNode=e.appendChild(h())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=h()),e.__insert(this.endNode=h())}insertAfterPart(e){e.__insert(this.startNode=h()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;v(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=f,e(this)}const e=this.__pendingValue;e!==f&&(x(e)?e!==this.value&&this.__commitText(e):e instanceof S?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):$(e)?this.__commitIterable(e):e===y?(this.value=y,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,s="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=s:this.__commitNode(document.createTextNode(s)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof w&&this.value.template===t)this.value.update(e.values);else{const s=new w(t,e.processor,this.options),i=s._clone();s.update(e.values),this.__commitNode(i),this.value=s}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let s,i=0;for(const a of e)s=t[i],void 0===s&&(s=new C(this.options),t.push(s),0===i?s.appendIntoPart(this):s.insertAfterPart(t[i-1])),s.setValue(a),s.commit(),i++;i<t.length&&(t.length=i,this.clear(s&&s.endNode))}clear(e=this.startNode){i(this.startNode.parentNode,e.nextSibling,this.endNode)}}class N{constructor(e,t,s){if(this.value=void 0,this.__pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=s}setValue(e){this.__pendingValue=e}commit(){for(;v(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=f,e(this)}if(this.__pendingValue===f)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=f}}class E extends k{constructor(e,t,s){super(e,t,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new P(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class P extends A{}let T=!1;(()=>{try{const e={get capture(){return T=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class M{constructor(e,t,s){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=s,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;v(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=f,e(this)}if(this.__pendingValue===f)return;const e=this.__pendingValue,t=this.value,s=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),i=null!=e&&(null==t||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),i&&(this.__options=O(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=f}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const O=e=>e&&(T?{capture:e.capture,passive:e.passive,once:e.once}:e.capture)
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
     */;function D(e){let t=j.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},j.set(e.type,t));let s=t.stringsArray.get(e.strings);if(void 0!==s)return s;const i=e.strings.join(a);return s=t.keyString.get(i),void 0===s&&(s=new o(e,e.getTemplateElement()),t.keyString.set(i,s)),t.stringsArray.set(e.strings,s),s}const j=new Map,U=new WeakMap;
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
     */const V=new
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
class{handleAttributeExpressions(e,t,s,i){const a=t[0];if("."===a){return new E(e,t.slice(1),s).parts}if("@"===a)return[new M(e,t.slice(1),i.eventContext)];if("?"===a)return[new N(e,t.slice(1),s)];return new k(e,t,s).parts}handleTextExpression(e){return new C(e)}};
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
     */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const H=(e,...t)=>new S(e,t,"html",V)
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
     */,L=(e,t)=>`${e}--${t}`;let R=!0;void 0===window.ShadyCSS?R=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),R=!1);const Y=e=>t=>{const s=L(t.type,e);let i=j.get(s);void 0===i&&(i={stringsArray:new WeakMap,keyString:new Map},j.set(s,i));let r=i.stringsArray.get(t.strings);if(void 0!==r)return r;const n=t.strings.join(a);if(r=i.keyString.get(n),void 0===r){const s=t.getTemplateElement();R&&window.ShadyCSS.prepareTemplateDom(s,e),r=new o(t,s),i.keyString.set(n,r)}return i.stringsArray.set(t.strings,r),r},z=["html","svg"],q=new Set,F=(e,t,s)=>{q.add(e);const i=s?s.element:document.createElement("template"),a=t.querySelectorAll("style"),{length:r}=a;if(0===r)return void window.ShadyCSS.prepareTemplateStyles(i,e);const n=document.createElement("style");for(let e=0;e<r;e++){const t=a[e];t.parentNode.removeChild(t),n.textContent+=t.textContent}(e=>{z.forEach(t=>{const s=j.get(L(t,e));void 0!==s&&s.keyString.forEach(e=>{const{element:{content:t}}=e,s=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{s.add(e)}),u(e,s)})})})(e);const o=i.content;s?function(e,t,s=null){const{element:{content:i},parts:a}=e;if(null==s)return void i.appendChild(t);const r=document.createTreeWalker(i,133,null,!1);let n=m(a),o=0,d=-1;for(;r.nextNode();){d++;for(r.currentNode===s&&(o=p(t),s.parentNode.insertBefore(t,s));-1!==n&&a[n].index===d;){if(o>0){for(;-1!==n;)a[n].index+=o,n=m(a,n);return}n=m(a,n)}}}(s,n,o.firstChild):o.insertBefore(n,o.firstChild),window.ShadyCSS.prepareTemplateStyles(i,e);const d=o.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==d)t.insertBefore(d.cloneNode(!0),t.firstChild);else if(s){o.insertBefore(n,o.firstChild);const e=new Set;e.add(n),u(s,e)}};window.JSCompiler_renameProperty=(e,t)=>e;const I={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},B=(e,t)=>t!==e&&(t==t||e==e),W={attribute:!0,type:String,converter:I,reflect:!1,hasChanged:B};class J extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach((t,s)=>{const i=this._attributeNameForProperty(s,t);void 0!==i&&(this._attributeToPropertyMap.set(i,s),e.push(i))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,t)=>this._classProperties.set(t,e))}}static createProperty(e,t=W){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const s="symbol"==typeof e?Symbol():"__"+e,i=this.getPropertyDescriptor(e,s,t);void 0!==i&&Object.defineProperty(this.prototype,e,i)}static getPropertyDescriptor(e,t,s){return{get(){return this[t]},set(i){const a=this[e];this[t]=i,this.requestUpdateInternal(e,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||W}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const s of t)this.createProperty(s,e[s])}}static _attributeNameForProperty(e,t){const s=t.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,s=B){return s(e,t)}static _propertyValueFromAttribute(e,t){const s=t.type,i=t.converter||I,a="function"==typeof i?i:i.fromAttribute;return a?a(e,s):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const s=t.type,i=t.converter;return(i&&i.toAttribute||I.toAttribute)(e,s)}initialize(){this._updateState=0,this._updatePromise=new Promise(e=>this._enableUpdatingResolver=e),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,s){t!==s&&this._attributeToProperty(e,s)}_propertyToAttribute(e,t,s=W){const i=this.constructor,a=i._attributeNameForProperty(e,s);if(void 0!==a){const e=i._propertyValueToAttribute(t,s);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(a):this.setAttribute(a,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const s=this.constructor,i=s._attributeToPropertyMap.get(e);if(void 0!==i){const e=s.getPropertyOptions(i);this._updateState=16|this._updateState,this[i]=s._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,s){let i=!0;if(void 0!==e){const a=this.constructor;s=s||a.getPropertyOptions(e),a._valueHasChanged(this[e],t,s.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==s.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,s))):i=!1}!this._hasRequestedUpdate&&i&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((e,t)=>this._propertyToAttribute(t,this[t],e)),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}J.finalized=!0;
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
const Z=e=>t=>"function"==typeof t?((e,t)=>(window.customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:s,elements:i}=t;return{kind:s,elements:i,finisher(t){window.customElements.define(e,t)}}})(e,t),G=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?Object.assign(Object.assign({},t),{finisher(s){s.createProperty(t.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(s){s.createProperty(t.key,e)}};function K(e){return(t,s)=>void 0!==s?((e,t,s)=>{t.constructor.createProperty(s,e)})(e,t,s):G(e,t)}function Q(e){return K({attribute:!1,hasChanged:null==e?void 0:e.hasChanged})}
/**
    @license
    Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
    This code may only be used under the BSD style license found at
    http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
    http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
    found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
    part of the polymer project is also subject to an additional IP rights grant
    found at http://polymer.github.io/PATENTS.txt
    */const X=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ee=Symbol();class te{constructor(e,t){if(t!==ee)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(X?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const se=(e,...t)=>{const s=t.reduce((t,s,i)=>t+(e=>{if(e instanceof te)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+e[i+1],e[0]);return new te(s,ee)};
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const ie={};class ae extends J{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,s)=>e.reduceRight((e,s)=>Array.isArray(s)?t(s,e):(e.add(s),e),s),s=t(e,new Set),i=[];s.forEach(e=>i.unshift(e)),this._styles=i}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map(e=>{if(e instanceof CSSStyleSheet&&!X){const t=Array.prototype.slice.call(e.cssRules).reduce((e,t)=>e+t.cssText,"");return new te(String(t),ee)}return e})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?X?this.renderRoot.adoptedStyleSheets=e.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==ie&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){return ie}}ae.finalized=!0,ae.render=(e,t,s)=>{if(!s||"object"!=typeof s||!s.scopeName)throw new Error("The `scopeName` option is required.");const a=s.scopeName,r=U.has(t),n=R&&11===t.nodeType&&!!t.host,o=n&&!q.has(a),d=o?document.createDocumentFragment():t;if(((e,t,s)=>{let a=U.get(t);void 0===a&&(i(t,t.firstChild),U.set(t,a=new C(Object.assign({templateFactory:D},s))),a.appendInto(t)),a.setValue(e),a.commit()})(e,d,Object.assign({templateFactory:Y(a)},s)),o){const e=U.get(d);U.delete(d);const s=e.value instanceof w?e.value.template:void 0;F(a,d,s),i(t,t.firstChild),t.appendChild(d),U.set(t,e)}!r&&n&&window.ShadyCSS.styleElement(t.host)};var re=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,ne="[^\\s]+",oe=/\[([^]*?)\]/gm;function de(e,t){for(var s=[],i=0,a=e.length;i<a;i++)s.push(e[i].substr(0,t));return s}var ce=function(e){return function(t,s){var i=s[e].map((function(e){return e.toLowerCase()})).indexOf(t.toLowerCase());return i>-1?i:null}};function he(e){for(var t=[],s=1;s<arguments.length;s++)t[s-1]=arguments[s];for(var i=0,a=t;i<a.length;i++){var r=a[i];for(var n in r)e[n]=r[n]}return e}var le=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],ue=["January","February","March","April","May","June","July","August","September","October","November","December"],pe=de(ue,3),me={dayNamesShort:de(le,3),dayNames:le,monthNamesShort:pe,monthNames:ue,amPm:["am","pm"],DoFn:function(e){return e+["th","st","nd","rd"][e%10>3?0:(e-e%10!=10?1:0)*e%10]}},ge=he({},me),ve=function(e,t){for(void 0===t&&(t=2),e=String(e);e.length<t;)e="0"+e;return e},fe={D:function(e){return String(e.getDate())},DD:function(e){return ve(e.getDate())},Do:function(e,t){return t.DoFn(e.getDate())},d:function(e){return String(e.getDay())},dd:function(e){return ve(e.getDay())},ddd:function(e,t){return t.dayNamesShort[e.getDay()]},dddd:function(e,t){return t.dayNames[e.getDay()]},M:function(e){return String(e.getMonth()+1)},MM:function(e){return ve(e.getMonth()+1)},MMM:function(e,t){return t.monthNamesShort[e.getMonth()]},MMMM:function(e,t){return t.monthNames[e.getMonth()]},YY:function(e){return ve(String(e.getFullYear()),4).substr(2)},YYYY:function(e){return ve(e.getFullYear(),4)},h:function(e){return String(e.getHours()%12||12)},hh:function(e){return ve(e.getHours()%12||12)},H:function(e){return String(e.getHours())},HH:function(e){return ve(e.getHours())},m:function(e){return String(e.getMinutes())},mm:function(e){return ve(e.getMinutes())},s:function(e){return String(e.getSeconds())},ss:function(e){return ve(e.getSeconds())},S:function(e){return String(Math.round(e.getMilliseconds()/100))},SS:function(e){return ve(Math.round(e.getMilliseconds()/10),2)},SSS:function(e){return ve(e.getMilliseconds(),3)},a:function(e,t){return e.getHours()<12?t.amPm[0]:t.amPm[1]},A:function(e,t){return e.getHours()<12?t.amPm[0].toUpperCase():t.amPm[1].toUpperCase()},ZZ:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+ve(100*Math.floor(Math.abs(t)/60)+Math.abs(t)%60,4)},Z:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+ve(Math.floor(Math.abs(t)/60),2)+":"+ve(Math.abs(t)%60,2)}},ye=function(e){return+e-1},we=[null,"[1-9]\\d?"],_e=[null,ne],be=["isPm",ne,function(e,t){var s=e.toLowerCase();return s===t.amPm[0]?0:s===t.amPm[1]?1:null}],Se=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(e){var t=(e+"").match(/([+-]|\d\d)/gi);if(t){var s=60*+t[1]+parseInt(t[2],10);return"+"===t[0]?s:-s}return 0}],xe=(ce("monthNamesShort"),ce("monthNames"),{default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",isoDate:"YYYY-MM-DD",isoDateTime:"YYYY-MM-DDTHH:mm:ssZ",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"});var $e=function(e,t,s){if(void 0===t&&(t=xe.default),void 0===s&&(s={}),"number"==typeof e&&(e=new Date(e)),"[object Date]"!==Object.prototype.toString.call(e)||isNaN(e.getTime()))throw new Error("Invalid Date pass to format");var i=[];t=(t=xe[t]||t).replace(oe,(function(e,t){return i.push(t),"@@@"}));var a=he(he({},ge),s);return(t=t.replace(re,(function(t){return fe[t](e,a)}))).replace(/@@@/g,(function(){return i.shift()}))};(function(){try{(new Date).toLocaleDateString("i")}catch(e){return"RangeError"===e.name}})(),function(){try{(new Date).toLocaleString("i")}catch(e){return"RangeError"===e.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(e){return"RangeError"===e.name}}();function ke(e){return e.substr(0,e.indexOf("."))}var Ae="hass:bookmark",Ce=function(e,t,s,i){i=i||{},s=null==s?{}:s;var a=new Event(t,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});return a.detail=s,e.dispatchEvent(a),a},Ne={alert:"hass:alert",automation:"hass:playlist-play",calendar:"hass:calendar",camera:"hass:video",climate:"hass:thermostat",configurator:"hass:settings",conversation:"hass:text-to-speech",device_tracker:"hass:account",fan:"hass:fan",group:"hass:google-circles-communities",history_graph:"hass:chart-line",homeassistant:"hass:home-assistant",homekit:"hass:home-automation",image_processing:"hass:image-filter-frames",input_boolean:"hass:drawing",input_datetime:"hass:calendar-clock",input_number:"hass:ray-vertex",input_select:"hass:format-list-bulleted",input_text:"hass:textbox",light:"hass:lightbulb",mailbox:"hass:mailbox",notify:"hass:comment-alert",person:"hass:account",plant:"hass:flower",proximity:"hass:apple-safari",remote:"hass:remote",scene:"hass:google-pages",script:"hass:file-document",sensor:"hass:eye",simple_alarm:"hass:bell",sun:"hass:white-balance-sunny",switch:"hass:flash",timer:"hass:timer",updater:"hass:cloud-upload",vacuum:"hass:robot-vacuum",water_heater:"hass:thermometer",weblink:"hass:open-in-new"};function Ee(e,t){if(e in Ne)return Ne[e];switch(e){case"alarm_control_panel":switch(t){case"armed_home":return"hass:bell-plus";case"armed_night":return"hass:bell-sleep";case"disarmed":return"hass:bell-outline";case"triggered":return"hass:bell-ring";default:return"hass:bell"}case"binary_sensor":return t&&"off"===t?"hass:radiobox-blank":"hass:checkbox-marked-circle";case"cover":return"closed"===t?"hass:window-closed":"hass:window-open";case"lock":return t&&"unlocked"===t?"hass:lock-open":"hass:lock";case"media_player":return t&&"off"!==t&&"idle"!==t?"hass:cast-connected":"hass:cast";case"zwave":switch(t){case"dead":return"hass:emoticon-dead";case"sleeping":return"hass:sleep";case"initializing":return"hass:timer-sand";default:return"hass:z-wave"}default:return console.warn("Unable to find icon for domain "+e+" ("+t+")"),Ae}}var Pe={humidity:"hass:water-percent",illuminance:"hass:brightness-5",temperature:"hass:thermometer",pressure:"hass:gauge",power:"hass:flash",signal_strength:"hass:wifi"},Te={binary_sensor:function(e){var t=e.state&&"off"===e.state;switch(e.attributes.device_class){case"battery":return t?"hass:battery":"hass:battery-outline";case"cold":return t?"hass:thermometer":"hass:snowflake";case"connectivity":return t?"hass:server-network-off":"hass:server-network";case"door":return t?"hass:door-closed":"hass:door-open";case"garage_door":return t?"hass:garage":"hass:garage-open";case"gas":case"power":case"problem":case"safety":case"smoke":return t?"hass:shield-check":"hass:alert";case"heat":return t?"hass:thermometer":"hass:fire";case"light":return t?"hass:brightness-5":"hass:brightness-7";case"lock":return t?"hass:lock":"hass:lock-open";case"moisture":return t?"hass:water-off":"hass:water";case"motion":return t?"hass:walk":"hass:run";case"occupancy":return t?"hass:home-outline":"hass:home";case"opening":return t?"hass:square":"hass:square-outline";case"plug":return t?"hass:power-plug-off":"hass:power-plug";case"presence":return t?"hass:home-outline":"hass:home";case"sound":return t?"hass:music-note-off":"hass:music-note";case"vibration":return t?"hass:crop-portrait":"hass:vibrate";case"window":return t?"hass:window-closed":"hass:window-open";default:return t?"hass:radiobox-blank":"hass:checkbox-marked-circle"}},cover:function(e){var t="closed"!==e.state;switch(e.attributes.device_class){case"garage":return t?"hass:garage-open":"hass:garage";case"door":return t?"hass:door-open":"hass:door-closed";case"shutter":return t?"hass:window-shutter-open":"hass:window-shutter";case"blind":return t?"hass:blinds-open":"hass:blinds";case"window":return t?"hass:window-open":"hass:window-closed";default:return Ee("cover",e.state)}},sensor:function(e){var t=e.attributes.device_class;if(t&&t in Pe)return Pe[t];if("battery"===t){var s=Number(e.state);if(isNaN(s))return"hass:battery-unknown";var i=10*Math.round(s/10);return i>=100?"hass:battery":i<=0?"hass:battery-alert":"hass:battery-"+i}var a=e.attributes.unit_of_measurement;return"°C"===a||"°F"===a?"hass:thermometer":Ee("sensor")},input_datetime:function(e){return e.attributes.has_date?e.attributes.has_time?Ee("input_datetime"):"hass:calendar":"hass:clock"}};const Me=async()=>{if(customElements.get("ha-checkbox")&&customElements.get("ha-slider"))return;await customElements.whenDefined("partial-panel-resolver");const e=document.createElement("partial-panel-resolver");e.hass={panels:[{url_path:"tmp",component_name:"config"}]},e._updateRoutes(),await e.routerOptions.routes.tmp.load(),await customElements.whenDefined("ha-panel-config");const t=document.createElement("ha-panel-config");await t.routerOptions.routes.automation.load(),e.hass={panels:[{url_path:"tmp",component_name:"developer-tools"}]},e._updateRoutes(),await e.routerOptions.routes.tmp.load(),await customElements.whenDefined("ha-app-layout")};var Oe;!function(e){e.ArmedAway="away",e.ArmedHome="home",e.ArmedNight="night",e.ArmedCustom="custom"}(Oe||(Oe={}));const De={modes:[Oe.ArmedAway,Oe.ArmedHome,Oe.ArmedNight,Oe.ArmedCustom],immediate:!1,arm_on_close:!1,allow_open:!1};function je(e){return function(e){if(!e)return Ae;if(e.attributes.icon)return e.attributes.icon;var t=ke(e.entity_id);return t in Te?Te[t](e):Ee(t,e.state)}(e)}function Ue(e){return(e=e.replace("_"," ")).charAt(0).toUpperCase()+e.slice(1)}function Ve(e){return e?e.attributes&&e.attributes.friendly_name?e.attributes.friendly_name:String(e.entity_id.split(".").pop()):"(unrecognized entity)"}function He(e){return String(e.panels.alarmo.config.entity_id)}function Le(e){let t={modes:[],immediate:!1,arm_on_close:!1,allow_open:!1};const s=[];return 1&e&&s.push(Oe.ArmedAway),2&e&&s.push(Oe.ArmedHome),4&e&&s.push(Oe.ArmedNight),8&e&&s.push(Oe.ArmedCustom),16&e&&(t=Object.assign(Object.assign({},t),{immediate:!0})),256&e&&(t=Object.assign(Object.assign({},t),{arm_on_close:!0})),512&e&&(t=Object.assign(Object.assign({},t),{allow_open:!0})),t=Object.assign(Object.assign({},t),{modes:s}),t}function Re(e,t){const s={entry:0,leave:0,trigger:0},i=e.attributes.delays;return Object.entries(i).forEach(([e,i])=>{if(e.includes("_")){let a;[e,a]=e.split("_"),a==t&&s.hasOwnProperty(e)&&Object.assign(s,{[e]:i})}else s.hasOwnProperty(e)&&Object.assign(s,{[e]:i})}),s}function Ye(e){const t=[],s=e.attributes.supported_features;return 1&s&&t.push(Oe.ArmedHome),2&s&&t.push(Oe.ArmedAway),4&s&&t.push(Oe.ArmedNight),16&s&&t.push(Oe.ArmedCustom),t}function ze(e,t){let s={name:e,is_admin:!1,can_arm:!1,can_disarm:!1};return 1&t&&(s=Object.assign(Object.assign({},s),{is_admin:!0})),2&t&&(s=Object.assign(Object.assign({},s),{can_arm:!0})),4&t&&(s=Object.assign(Object.assign({},s),{can_disarm:!0})),s}function qe(e){return{code_arm_required:e.attributes.code_arm_required,code_disarm_required:Boolean(1&e.attributes.config),code_format:e.attributes.code_format,disarm_after_trigger:Boolean(2&e.attributes.config)}}const Fe=se`
  ha-card {
    display: flex;
    flex-direction: column;
    width: 600px;
    margin: 20px 0px;
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

  labeled-slider {
    width: 300px;
  }
`;let Ie=class extends ae{constructor(){super(...arguments),this.min=0,this.max=100,this.step=1,this.value=0,this.unit="",this.disabled=!1}render(){return H`
      <div class="container">
        <div class="slider">
          ${this.getSlider()}
        </div>
        <div class="value${this.disabled?" disabled":""}">
          ${this.getValue()}
        </div>
      </div>
    `}getValue(){const e=Number(this.value);return!e&&this.zeroValue?this.zeroValue:`${e} ${this.unit}`}getSlider(){return H`
      <ha-slider
        pin
        min=${this.min}
        max=${this.max}
        step=${this.step}
        value=${this.value}
        ?disabled=${this.disabled}
        @change=${this.updateValue}
      ></ha-slider>
    `}updateValue(e){const t=Number(e.target.value);this.value=t}};Ie.styles=se`
    :host {
    }

    div.container {
      display: grid;
      grid-template-columns: 1fr 100px;
      grid-template-rows: min-content;
      grid-template-areas: 'slider value';
      width: 100%;
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
    }

    ha-slider {
      width: 100%;
      --paper-slider-pin-start-color: var(--primary-color);
    }

    .disabled {
      color: var(--disabled-text-color);
    }
  `,t([K({type:Number})],Ie.prototype,"min",void 0),t([K({type:Number})],Ie.prototype,"max",void 0),t([K({type:Number})],Ie.prototype,"step",void 0),t([K({type:Number})],Ie.prototype,"value",void 0),t([K({type:String})],Ie.prototype,"unit",void 0),t([K({type:Boolean})],Ie.prototype,"disabled",void 0),t([K({type:String})],Ie.prototype,"zeroValue",void 0),Ie=t([Z("labeled-slider")],Ie);let Be=class extends ae{constructor(){super(...arguments),this.enabled=!1}render(){return H`
        <ha-card
        >
          <div class="card-header">
            <div class="name">
              ${this.header}
            </div>
            <ha-switch
              ?disabled=${this.mode==Oe.ArmedAway}
              ?checked=${this.enabled}
              @change=${this.toggleEnable}
            >
            </ha-switch>
          </div>
          <div class="card-content">
              <slot>
              </slot>
          </div>
            ${this.getContent()}
          </div>
        ${this.getActions()}
        </ha-card>
    `}getActions(){return this.enabled?H`
      <div class="card-actions">
        <mwc-button ?disabled=${!this.enabled} @click=${this.updateConfig}>
          save changes
        </mwc-button>
      </div>
    `:H``}getContent(){var e,t;return this.enabled?H`
      <settings-row>
        <span slot="heading">Leave time</span>
        <span slot="description">
          Time before the alarm will be armed
        </span>
        <labeled-slider
          ?disabled=${!this.enabled}
          unit="seconds"
          min="0"
          max="180"
          step="10"
          zeroValue="none"
          value=${null===(e=this.config)||void 0===e?void 0:e.leave}
          @change=${e=>{Object.assign(this.config,{leave:Number(e.target.value)})}}
        >
        </labeled-slider>
      </settings-row>

      <settings-row>
        <span slot="heading">Entry time</span>
        <span slot="description">
          Time before the alarm will be triggered
        </span>
        <labeled-slider
          ?disabled=${!this.enabled}
          unit="seconds"
          min="0"
          max="180"
          step="10"
          zeroValue="none"
          value=${null===(t=this.config)||void 0===t?void 0:t.entry}
          @change=${e=>{Object.assign(this.config,{entry:Number(e.target.value)})}}
        >
        </labeled-slider>
      </settings-row>
    `:H``}toggleEnable(e){if(!this.hass||!this.mode||!this.config)return;const t=e.target.checked,s={entity_id:He(this.hass),edit_mode:{mode:this.mode,enabled:t,delays:{leave:{seconds:this.config.leave},entry:{seconds:this.config.entry}}}};this.hass.callService("alarmo","edit_config",s)}updateConfig(){if(!this.hass||!this.mode||!this.config)return;const e={entity_id:He(this.hass),edit_mode:{mode:this.mode,delays:{leave:{seconds:this.config.leave},entry:{seconds:this.config.entry}}}};console.log(e),this.hass.callService("alarmo","edit_config",e)}};Be.styles=se`
    ${Fe}
  `,t([K()],Be.prototype,"hass",void 0),t([K({type:String})],Be.prototype,"header",void 0),t([K({type:Boolean})],Be.prototype,"enabled",void 0),t([K({type:String})],Be.prototype,"mode",void 0),t([K({type:Object})],Be.prototype,"config",void 0),Be=t([Z("alarm-mode-card")],Be);let We=class extends ae{constructor(){super(...arguments),this.threeLine=!1}render(){return H`
      <style>
        paper-item-body {
          padding-right: 16px;
        }
      </style>
      <paper-item-body ?two-line=${!this.threeLine} ?three-line=${this.threeLine}>
        <slot name="heading"></slot>
        <div secondary><slot name="description"></slot></div>
      </paper-item-body>
      <slot></slot>
    `}static get styles(){return se`
      :host {
        display: flex;
        padding: 0 16px;
        align-content: normal;
        align-self: auto;
        align-items: center;
      }
      :host([narrow]) {
        align-items: normal;
        flex-direction: column;
        border-top: 1px solid var(--divider-color);
        padding-bottom: 8px;
      }
      ::slotted(ha-switch) {
        padding: 16px 0;
      }
    `}};t([K({type:Boolean,reflect:!0})],We.prototype,"narrow",void 0),t([K({type:Boolean,attribute:"three-line"})],We.prototype,"threeLine",void 0),We=t([Z("settings-row")],We);let Je=class extends ae{constructor(){super(...arguments),this.modeList=[],this.trigger_time=0,this.disarm_after_trigger=!1}shouldUpdate(e){if(!this.hass)return!0;const t=e.get("hass");return!t||1!=e.size||t.states[He(t)]!==this.hass.states[He(this.hass)]&&(this.updateForm(),!0)}updateForm(){if(!this.hass)return;const e=He(this.hass);this.alarmEntity=this.hass.states[e],this.modeList=Ye(this.alarmEntity),this.trigger_time=Re(this.alarmEntity,Oe.ArmedAway).trigger/60,this.disarm_after_trigger=qe(this.alarmEntity).disarm_after_trigger}firstUpdated(){(async()=>{await Me()})(),this.updateForm()}render(){return this.alarmEntity?H`
      <ha-card header="General settings">
        <div class="card-content"></div>

        <settings-row>
          <span slot="heading">Trigger time</span>
          <span slot="description">
            Time during which the siren will sound
          </span>
          <labeled-slider
            unit="minutes"
            min="0"
            max="60"
            step="1"
            zeroValue="infinite"
            value=${this.trigger_time}
            @change=${e=>{this.trigger_time=Number(e.target.value)}}
          >
          </labeled-slider>
        </settings-row>

        <settings-row>
          <span slot="heading">Disarm after trigger</span>
          <span slot="description">
            After trigger time has expired, disarm the alarm instead of returning to armed state.
          </span>
          <ha-switch
            ?checked=${this.disarm_after_trigger}
            @change=${e=>{this.disarm_after_trigger=e.target.checked}}
          >
          </ha-switch>
        </settings-row>

        <div class="card-actions">
          <mwc-button @click=${this.saveClick}>
            save changes
          </mwc-button>
        </div>
      </ha-card>

      <alarm-mode-card
        header="Armed away"
        .hass=${this.hass}
        ?enabled=${this.modeList.includes(Oe.ArmedAway)}
        mode=${Oe.ArmedAway}
        .config=${Re(this.alarmEntity,Oe.ArmedAway)}
      >
        Armed away will be used when all people left the house. All doors and windows allowing access to the house will
        be guarded, as well as motion sensors inside the house.
      </alarm-mode-card>

      <alarm-mode-card
        header="Armed night"
        .hass=${this.hass}
        ?enabled=${this.modeList.includes(Oe.ArmedNight)}
        mode=${Oe.ArmedNight}
        .config=${Re(this.alarmEntity,Oe.ArmedNight)}
      >
        Armed night will be used when setting the alarm before going to sleep. All doors and windows allowing access to
        the house will be guarded, and selected motion sensors (downstairs) in the house.
      </alarm-mode-card>

      <alarm-mode-card
        header="Armed home"
        .hass=${this.hass}
        ?enabled=${this.modeList.includes(Oe.ArmedHome)}
        mode=${Oe.ArmedHome}
        .config=${Re(this.alarmEntity,Oe.ArmedHome)}
      >
        Armed home (also known as armed stay) will be used when setting the alarm while people are in the house. All
        doors and windows allowing access to the house will be guarded, but not motion sensors inside the house.
      </alarm-mode-card>

      <alarm-mode-card
        header="Armed custom"
        .hass=${this.hass}
        ?enabled=${this.modeList.includes(Oe.ArmedCustom)}
        mode=${Oe.ArmedCustom}
        .config=${Re(this.alarmEntity,Oe.ArmedCustom)}
      >
        An extra mode for defining your own security perimeter.
      </alarm-mode-card>
    `:H``}saveClick(){if(!this.hass)return;const e={entity_id:He(this.hass),edit_general:{trigger_time:{minutes:this.trigger_time},disarm_after_trigger:this.disarm_after_trigger}};this.hass.callService("alarmo","edit_config",e)}static get styles(){return se`
      ${Fe}
    `}};t([K()],Je.prototype,"hass",void 0),t([K()],Je.prototype,"alarmEntity",void 0),t([K()],Je.prototype,"modeList",void 0),t([K()],Je.prototype,"trigger_time",void 0),t([K()],Je.prototype,"disarm_after_trigger",void 0),Je=t([Z("alarm-view-general")],Je);let Ze=class extends ae{async showDialog(e){this._params=e,this.selection=e.config,await this.updateComplete}async closeDialog(){this._params=void 0}render(){if(!this._params)return H``;const e=Ye(this.hass.states[He(this.hass)]),t=this.hass.states[this._params.entity_id];return H`
      
      <ha-dialog
        open
        .heading=${!0}
        @closed=${this.closeDialog}
        @close-dialog=${this.closeDialog}
      >
        <mwc-button
          slot="secondaryAction"
          @click=${this.updateSensorClick}
          dialogAction="close"
        >
          Save changes
        </mwc-button>
        <mwc-button
          slot="primaryAction"
          @click=${this.deleteSensorClick}
          dialogAction="close"
        >
          Remove
        </mwc-button>
      <div slot="heading">
        <ha-header-bar>
          <ha-icon-button
            slot="navigationIcon"
            dialogAction="cancel"
            icon="mdi:close"
          >
          </ha-icon-button>
          <span slot="title">
            Configuration for '${Ue(Ve(t))}'
          </span>
        </ha-header-bar>
      </div>
      <div class="wrapper">

        <div class="header-row mode-list">
          <div class="text"></div>
          ${e.includes(Oe.ArmedAway)?H`
                  <div class="col1">Armed away</div>
                `:""}
          ${e.includes(Oe.ArmedHome)?H`
                  <div class="col2">Armed home</div>
                `:""}
          ${e.includes(Oe.ArmedNight)?H`
                  <div class="col3">Armed night</div>
                `:""}
          ${e.includes(Oe.ArmedCustom)?H`
                  <div class="col4">Armed custom</div>
                `:""}
        </div>
        <div class="mode-list">
          <div class="label">Alarm modes in which this sensor is active</div>
            ${e.includes(Oe.ArmedAway)?H`
                    <div class="col1">
                      <ha-checkbox
                        @change=${e=>this.updateMode(e,Oe.ArmedAway)}
                        ?checked=${this.selection.modes.includes(Oe.ArmedAway)}
                      >
                      </ha-checkbox>
                    </div>
                  `:""}
            ${e.includes(Oe.ArmedHome)?H`
                    <div class="col2">
                      <ha-checkbox
                        @change=${e=>this.updateMode(e,Oe.ArmedHome)}
                        ?checked=${this.selection.modes.includes(Oe.ArmedHome)}
                      >
                      </ha-checkbox>
                    </div>
                  `:""}
            ${e.includes(Oe.ArmedNight)?H`
                    <div class="col3">
                      <ha-checkbox
                        @change=${e=>this.updateMode(e,Oe.ArmedNight)}
                        ?checked=${this.selection.modes.includes(Oe.ArmedNight)}
                      >
                      </ha-checkbox>
                    </div>
                  `:""}
            ${e.includes(Oe.ArmedCustom)?H`
                    <div class="col4">
                      <ha-checkbox
                        @change=${e=>this.updateMode(e,Oe.ArmedCustom)}
                        ?checked=${this.selection.modes.includes(Oe.ArmedCustom)}
                      >
                      </ha-checkbox>
                    </div>
                  `:""}
        </div>
        <div class="checkbox-row">
          <div class="label">
            This sensor should trigger the alarm immediately
          </div>
          <div class="checkbox">
            <ha-switch
              @change=${e=>{this.selection={...this.selection,immediate:e.target.checked}}}
              ?checked=${this.selection.immediate}
            ></ha-switch>
          </div>
        </div>

      </ha-dialog>
    `}updateMode(e,t){if(!this.selection)return;const s=e.target.checked;let i=[...this.selection.modes];s&&!i.includes(t)?i.push(t):!s&&i.includes(t)&&(i=i.filter(e=>e!=t)),this.selection=Object.assign(Object.assign({},this.selection),{modes:i})}updateSensorClick(){if(!this.selection||!this._params||!this.hass)return;const e={entity_id:He(this.hass),edit_sensor:{entity_id:this._params.entity_id,modes:this.selection.modes,immediate:this.selection.immediate}};console.log(e),this.hass.callService("alarmo","edit_config",e)}deleteSensorClick(){if(!this._params)return;const e={entity_id:He(this.hass),remove_sensor:{entity_id:this._params.entity_id}};this.hass.callService("alarmo","edit_config",e)}static get styles(){return se`
      div.checkbox-row {
        display: grid;
        grid-template-columns: 1fr max-content;
        grid-template-areas: 'label checkbox';
        grid-gap: 2px 20px;
        width: 100%;
      }

      div.checkbox-row .checkbox {
        grid-area: checkbox;
      }
      div.checkbox-row .label {
        grid-area: label;
      }

      div.checkbox-row .checkbox,
      div.checkbox-row .label {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        min-height: 48px;
      }

      div.mode-list {
        display: grid;
        grid-template-columns: 1fr min-content min-content min-content min-content;
        grid-template-areas: 'label col1 col2 col3 col4';
      }

      div.mode-list .label {
        grid-area: label;
      }
      div.mode-list .col1 {
        grid-area: col1;
      }
      div.mode-list .col2 {
        grid-area: col2;
      }
      div.mode-list .col3 {
        grid-area: col3;
      }
      div.mode-list .col4 {
        grid-area: col4;
      }

      div.mode-list .label,
      div.mode-list .col1,
      div.mode-list .col2,
      div.mode-list .col3 {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        min-height: 48px;
        padding: 0px 0px 0px 20px;
      }

      paper-input {
        width: 100%;
      }
    `}};t([K({attribute:!1})],Ze.prototype,"hass",void 0),t([Q()],Ze.prototype,"_params",void 0),t([K()],Ze.prototype,"selection",void 0),Ze=t([Z("dialog-sensor-edit")],Ze);var Ge=Object.freeze({__proto__:null,get DialogSensorEdit(){return Ze}});let Ke=class extends ae{constructor(){super(...arguments),this._sensors={},this.entity_id=""}shouldUpdate(e){if(!this.hass)return!0;const t=e.get("hass");return!t||1!=e.size||t.states[He(t)]!==this.hass.states[He(this.hass)]&&(this.updateForm(),!0)}updateForm(){this.hass&&(this.entity_id=He(this.hass),this.alarmEntity=this.hass.states[this.entity_id],this._sensors=this.alarmEntity.attributes.sensors)}firstUpdated(){(async()=>{await Me()})(),this.updateForm()}render(){return H`
      <ha-card header="Sensors">
        <div class="card-content">
          Currently configured sensors. Make sure to refresh the page after changes. For some reason it doesn't always
          update.
        </div>

        ${this.sensorsList()}
      </ha-card>

      <ha-card header="Add sensors">
        <div class="card-content">
          Add more sensors. Make sure that your sensors have a friendly_name, so you can identify them.
        </div>

        ${this.addSensorsList()}
      </ha-card>
    `}sensorsList(){if(!this.hass||!this.alarmEntity)return;const e=Object.entries(this._sensors).map(([e,t])=>({id:e,name:Ve(this.hass.states[e]),config:Le(Number(t))}));if(e.sort((e,t)=>e.name.toLowerCase()<t.name.toLowerCase()?-1:1),!e.length)return H`
        <settings-row>
          <span slot="description">
            There are no sensors added to the alarm yet. Make sure to add them first.
          </span>
        </settings-row>
      `;const t=Ye(this.alarmEntity);return e.map(e=>{const s=this.hass.states[e.id];let i=e.config.modes.filter(e=>t.includes(e)).join(", ");return i=i?"Active in modes "+i:"Not assigned to any alarm mode yet",H`
        <div class="entity-row">
          <state-badge .hass=${this.hass} .stateObj=${s}> </state-badge>
          <div class="info">
            ${Ue(e.name)}
            <div class="secondary">
              ${i}
            </div>
          </div>
          <mwc-button @click=${()=>this.showEntityDialog(this,e.id)}>
            configure
          </mwc-button>
        </div>
      `})}showEntityDialog(e,t){const s=this._sensors[t]?Le(this._sensors[t]):De;Ce(e,"show-dialog",{dialogTag:"dialog-sensor-edit",dialogImport:()=>Promise.resolve().then((function(){return Ge})),dialogParams:{entity_id:t,config:s}})}allowedSensor(e){const t=function(e){const t="string"==typeof e?e:e.entity_id;return String(t.split(".").shift())}(e.entity_id);if("binary_sensor"==t){const t=e.attributes.device_class;return!t||!!["door","garage_door","gas","heat","lock","moisture","motion","moving","occupancy","opening","presence","problem","safety","smoke","sound","vibration","window"].includes(t)}return!1}addSensorsList(){if(!this.hass)return;const e=Object.keys(this.hass.states).filter(e=>this.allowedSensor(this.hass.states[e])).map(e=>{const t=this.hass.states[e];return{id:e,name:Ve(t),icon:je(t)}}).filter(e=>!Object.keys(this._sensors).includes(e.id));return e.sort((e,t)=>e.name.toLowerCase()<t.name.toLowerCase()?-1:1),e.length?e.map(e=>{const t=this.hass.states[e.id];return H`
        <div class="entity-row">
          <state-badge .hass=${this.hass} .stateObj=${t}> </state-badge>
          <div class="info">
            ${Ue(e.name)}
            <div class="secondary">
              ${e.id}
            </div>
          </div>
          <mwc-button @click=${()=>this.showEntityDialog(this,e.id)}>
            Add to alarm
          </mwc-button>
        </div>
      `}):H`
        <settings-row>
          <span slot="description">
            There are no available HA entities that can be configured for the alarm. Make sure to include entities of
            the type binary_sensor.
          </span>
        </settings-row>
      `}static get styles(){return se`
      ${Fe}

      ha-card > :last-child {
        margin-bottom: 20px;
      }
    `}};t([K()],Ke.prototype,"hass",void 0),t([K()],Ke.prototype,"_sensors",void 0),Ke=t([Z("alarm-view-sensors")],Ke);let Qe=class extends ae{constructor(){super(...arguments),this.name="",this.code="",this.codeConfirm="",this.error="",this.is_admin=!1,this.can_arm=!1,this.can_disarm=!1}async showDialog(e){this._params=e,await this.updateComplete}async closeDialog(){this._params=void 0}render(){return this._params?H`
      <ha-dialog open .heading=${!0} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <mwc-button slot="primaryAction" @click=${this.confirmClick}>
          Add
        </mwc-button>
        <div slot="heading">
          <ha-header-bar>
            <ha-icon-button slot="navigationIcon" dialogAction="cancel" icon="mdi:close"> </ha-icon-button>
            <span slot="title">
              Create new user
            </span>
          </ha-header-bar>
        </div>
        <div class="wrapper">
          Please provide a username and code.<br />
          The code may be a pincode as well.<br />

          <paper-input
            label="name"
            required
            value="${this.name}"
            class="state-input"
            @change=${e=>{this.name=e.target.value}}
          ></paper-input>

          <paper-input
            label="code"
            required
            value="${this.code}"
            class="state-input"
            type="password"
            @change=${e=>{this.code=e.target.value}}
          ></paper-input>

          <paper-input
            label="confirm code"
            required
            value="${this.codeConfirm}"
            type="password"
            @change=${e=>{this.codeConfirm=e.target.value}}
          ></paper-input>

          <div class="checkbox-row">
            <ha-switch
              ?checked=${this.is_admin}
              @change=${e=>{this.is_admin=e.target.checked}}
            >
            </ha-switch>
            User is admininistrator
          </div>

          <div class="checkbox-row">
            <ha-switch
              ?checked=${this.can_arm||this.is_admin}
              ?disabled=${this.is_admin}
              @change=${e=>{this.can_arm=e.target.checked}}
            >
            </ha-switch>
            Allow user to arm the alarm
          </div>

          <div class="checkbox-row">
            <ha-switch
              ?checked=${this.can_disarm||this.is_admin}
              ?disabled=${this.is_admin}
              @change=${e=>{this.can_disarm=e.target.checked}}
            >
            </ha-switch>
            Allow user to disarm the alarm
          </div>

          <div class="warning">
            ${this.error}
          </div>
        </div>
      </ha-dialog>
    `:H``}confirmClick(){this.name.length?this.code.length<4?this.error="code should have 4 characters/numbers minimum":this.codeConfirm.length?this.code!==this.codeConfirm?this.error="the codes don't match":this.error="":this.error="repeat the code":this.error="no username provided",this.error?(this.code="",this.codeConfirm=""):(this.hass.callService("alarmo","edit_config",{entity_id:He(this.hass),add_user:{name:this.name,code:this.code,is_admin:this.is_admin,can_arm:this.can_arm||this.is_admin,can_disarm:this.can_disarm||this.is_admin}}),this.closeDialog())}};Qe.styles=Fe,t([K({attribute:!1})],Qe.prototype,"hass",void 0),t([Q()],Qe.prototype,"_params",void 0),t([K()],Qe.prototype,"name",void 0),t([K()],Qe.prototype,"code",void 0),t([K()],Qe.prototype,"codeConfirm",void 0),t([K()],Qe.prototype,"error",void 0),t([K()],Qe.prototype,"is_admin",void 0),t([K()],Qe.prototype,"can_arm",void 0),t([K()],Qe.prototype,"can_disarm",void 0),Qe=t([Z("dialog-user-new")],Qe);var Xe=Object.freeze({__proto__:null,get DialogUserNew(){return Qe}});let et=class extends ae{constructor(){super(...arguments),this.name="",this.code="",this.codeNew="",this.codeNewConfirm="",this.error="",this.is_admin=!1,this.can_arm=!1,this.can_disarm=!1}async showDialog(e){this._params=e,this.name=e.name,this.is_admin=e.is_admin,this.can_arm=e.can_arm,this.can_disarm=e.can_disarm,await this.updateComplete}async closeDialog(){this._params=void 0}render(){return this._params?H`
      <ha-dialog open .heading=${!0} @closed=${this.closeDialog} @close-dialog=${this.closeDialog}>
        <mwc-button slot="primaryAction" @click=${this.confirmClick}>
          Save
        </mwc-button>
        <mwc-button slot="secondaryAction" @click=${this.removeUserClick} dialogAction="close" class="warning">
          Remove user
        </mwc-button>
        <div slot="heading">
          <ha-header-bar>
            <ha-icon-button slot="navigationIcon" dialogAction="cancel" icon="mdi:close"> </ha-icon-button>
            <span slot="title">
              Edit user '${this.name}'
            </span>
          </ha-header-bar>
        </div>
        <div class="wrapper">
          Leave the code input empty unless you want to change it.

          <paper-input
            label="old code"
            required
            value="${this.code}"
            class="state-input"
            type="password"
            @change=${e=>{this.code=e.target.value}}
          ></paper-input>

          <paper-input
            label="new code"
            required
            value="${this.codeNew}"
            type="password"
            @change=${e=>{this.codeNew=e.target.value}}
          ></paper-input>

          <paper-input
            label="confirm new code"
            required
            value="${this.codeNewConfirm}"
            type="password"
            @change=${e=>{this.codeNewConfirm=e.target.value}}
          ></paper-input>

          <div class="checkbox-row">
            <ha-switch
              ?checked=${this.is_admin}
              @change=${e=>{this.is_admin=e.target.checked}}
            >
            </ha-switch>
            User is admininistrator
          </div>

          <div class="checkbox-row">
            <ha-switch
              ?checked=${this.can_arm||this.is_admin}
              ?disabled=${this.is_admin}
              @change=${e=>{this.can_arm=e.target.checked}}
            >
            </ha-switch>
            Allow user to arm the alarm
          </div>

          <div class="checkbox-row">
            <ha-switch
              ?checked=${this.can_disarm||this.is_admin}
              ?disabled=${this.is_admin}
              @change=${e=>{this.can_disarm=e.target.checked}}
            >
            </ha-switch>
            Allow user to disarm the alarm
          </div>

          <div class="warning">
            ${this.error}
          </div>
        </div>
      </ha-dialog>
    `:H``}confirmClick(){if(this.codeNew&&(this.code.length<4?this.error="provide the old code":this.codeNew.length<4?this.error="code should have 4 characters/numbers minimum":this.codeNewConfirm.length?this.codeNew!==this.codeNewConfirm?this.error="the codes don't match":this.error="":this.error="repeat the code"),this.error)this.code="",this.codeNew="",this.codeNewConfirm="";else{const e={entity_id:He(this.hass),edit_user:{name:this.name,code:this.code,code_new:this.codeNew,is_admin:this.is_admin,can_arm:this.can_arm,can_disarm:this.can_disarm}};this.hass.callService("alarmo","edit_config",e),this.closeDialog()}}removeUserClick(){const e={entity_id:He(this.hass),edit_user:{name:this.name,remove:!0}};this.hass.callService("alarmo","edit_config",e)}};et.styles=Fe,t([K({attribute:!1})],et.prototype,"hass",void 0),t([Q()],et.prototype,"_params",void 0),t([K()],et.prototype,"name",void 0),t([K()],et.prototype,"code",void 0),t([K()],et.prototype,"codeNew",void 0),t([K()],et.prototype,"codeNewConfirm",void 0),t([K()],et.prototype,"error",void 0),t([K()],et.prototype,"is_admin",void 0),t([K()],et.prototype,"can_arm",void 0),t([K()],et.prototype,"can_disarm",void 0),et=t([Z("dialog-user-edit")],et);var tt=Object.freeze({__proto__:null,get DialogUserEdit(){return et}});let st=class extends ae{constructor(){super(...arguments),this.users=[],this.code_arm=!0,this.code_disarm=!0,this.code_format="number"}shouldUpdate(e){if(!this.hass)return!0;const t=e.get("hass");return!t||1!=e.size||t.states[He(t)]!==this.hass.states[He(this.hass)]&&(this.updateForm(),!0)}updateForm(){if(!this.hass)return;const e=He(this.hass),t=this.hass.states[e];this.users=Object.entries(t.attributes.users).map(([e,t])=>ze(e,Number(t)));const s=qe(t);this.code_arm=s.code_arm_required,this.code_disarm=s.code_disarm_required,this.code_format=s.code_format}firstUpdated(){(async()=>{await Me()})(),this.updateForm()}render(){return H`
      <ha-card header="Codes">
        <div class="card-content">
          Change settings for the code.
        </div>

        <settings-row>
          <span slot="heading">Use arm code</span>
          <span slot="description">
            Require a code for arming the alarm
          </span>
          <ha-switch
            ?checked=${this.code_arm}
            @change=${e=>{this.code_arm=e.target.checked}}
          >
          </ha-switch>
        </settings-row>

        <settings-row>
          <span slot="heading">Use disarm code</span>
          <span slot="description">
            Require a code for disarming the alarm
          </span>
          <ha-switch
            ?checked=${this.code_disarm}
            @change=${e=>{this.code_disarm=e.target.checked}}
          >
          </ha-switch>
        </settings-row>

        <settings-row>
          <span slot="heading">Code format</span>
          <span slot="description">
            Sets the input type for Lovelace alarm card.
          </span>
          <mwc-button
            class="${"number"==this.code_format?"active":""}"
            @click=${()=>{this.code_format="number"}}
            >pincode</mwc-button
          >
          <mwc-button
            class="${"text"==this.code_format?"active":""}"
            @click=${()=>{this.code_format="text"}}
          >
            password</mwc-button
          >
        </settings-row>

        <div class="card-actions">
          <mwc-button @click=${this.saveClick}>
            save changes
          </mwc-button>
        </div>
      </ha-card>
      <ha-card header="User management">
        <div class="card-content">
          Each user has its own code to arm/disarm the alarm.
        </div>

        ${this.users.length?H`
              <div class="grid">
                <div class="col1 header"></div>
                <div class="col2 header">Name</div>
                <div class="col3 header">Remarks</div>
                <div class="col4 header">Actions</div>
                ${this.getUsers()}
              </div>
            `:H`
              <settings-row>
                <span slot="description">
                  There are no users yet
                </span>
              </settings-row>
            `}

        <div class="card-actions">
          <mwc-button @click=${e=>this.showNewUserDialog(e.target)}>
            new user
          </mwc-button>
        </div>
      </ha-card>
    `}getUsers(){return this.users.sort((e,t)=>e.name.toLowerCase()<t.name.toLowerCase()?-1:1),this.users.map(e=>H`
        <div class="col1">
          <ha-icon icon="mdi:account-outline"> </ha-icon>
        </div>
        <div class="col2">
          ${Ue(e.name)}
        </div>
        <div class="col3">
          ${e.is_admin?"administrator":""}
        </div>
        <div class="col4">
          <mwc-button @click=${t=>this.showEditUserDialog(t.target,e)}>
            edit
          </mwc-button>
        </div>
      `)}showNewUserDialog(e){Ce(e,"show-dialog",{dialogTag:"dialog-user-new",dialogImport:()=>Promise.resolve().then((function(){return Xe})),dialogParams:{}})}showEditUserDialog(e,t){Ce(e,"show-dialog",{dialogTag:"dialog-user-edit",dialogImport:()=>Promise.resolve().then((function(){return tt})),dialogParams:t})}saveClick(){if(!this.hass)return;const e={entity_id:He(this.hass),config_code:{code_arm_required:this.code_arm,code_disarm_required:this.code_disarm,code_format:this.code_format}};this.hass.callService("alarmo","edit_config",e)}static get styles(){return se`
      ${Fe}

      div.grid {
        display: grid;
        grid-template-columms: min-content 1fr 1fr max-content;
        grid-gap: 2px 20px;
      }
      div.grid > div {
        display: flex;
        width: 100%;
        height: 100%;
        min-height: 40px;
        align-items: center;
        justify-content: left;
      }
      div.col1 {
        grid-column-start: 1;
        grid-column-end: 2;
      }
      div.col2 {
        grid-column-start: 2;
        grid-column-end: 3;
      }
      div.col3 {
        grid-column-start: 3;
        grid-column-end: 4;
      }
      div.col4 {
        grid-column-start: 4;
        grid-column-end: 5;
      }

      div.grid .header {
        font-weight: bold;
      }

      div.grid ha-icon {
        color: var(--state-icon-color);
        padding: 0px 10px;
      }
    `}};t([K()],st.prototype,"hass",void 0),t([K()],st.prototype,"users",void 0),t([K()],st.prototype,"code_arm",void 0),t([K()],st.prototype,"code_disarm",void 0),t([K()],st.prototype,"code_format",void 0),st=t([Z("alarm-view-codes")],st);let it=class extends ae{constructor(){super(...arguments),this.pushEnabled=!1,this.pushTarget="",this.sirenEnabled=!1,this.sirenEntity=""}shouldUpdate(e){if(!this.hass)return!0;const t=e.get("hass");return!t||1!=e.size||t.states[He(t)]!==this.hass.states[He(this.hass)]&&(this.updateForm(),!0)}updateForm(){if(!this.hass)return;const e=He(this.hass);this.alarmEntity=this.hass.states[e];const t={pushEnabled:void 0!==(s=this.alarmEntity).attributes.push_target,pushTarget:s.attributes.push_target||"",sirenEnabled:void 0!==s.attributes.siren_entity,sirenEntity:s.attributes.siren_entity||""};var s;this.pushEnabled=t.pushEnabled,this.pushTarget=t.pushTarget,this.sirenEnabled=t.sirenEnabled,this.sirenEntity=t.sirenEntity}firstUpdated(){(async()=>{await Me()})(),this.updateForm()}render(){if(!this.alarmEntity||!this.hass||!this)return H``;const e=Object.keys(this.hass.services.notify),t=Object.keys(this.hass.states).filter(e=>"switch"==ke(e));return H`
      <ha-card header="Actions">
        <div class="card-content">
          Set up actions
        </div>

        <settings-row>
          <span slot="heading">Enable push messages</span>
          <span slot="description">
            Send push messages when something changes in the alarm.
          </span>
          <ha-switch
            ?checked=${this.pushEnabled}
            @change=${e=>{this.pushEnabled=e.target.checked}}
          >
          </ha-switch>
        </settings-row>

        <settings-row>
          <span slot="heading">Target for push messages</span>
          <span slot="description">
            Device to send the push messages to.
          </span>
          <paper-dropdown-menu
            ?disabled=${!this.pushEnabled}
          >
            <paper-listbox
              slot="dropdown-content"
              selected="${e.includes(this.pushTarget)?e.findIndex(e=>e==this.pushTarget):0}"
              @selected-item-changed=${e=>{e.target.selectedItem&&(this.pushTarget=e.target.selectedItem.getAttribute("value"))}}
            >
              ${e.map(e=>H`
              <paper-item value="${e}">${e}</paper-item>
            `)}
            </paper-listbox>
          </paper-dropdown-menu>
        </settings-row>

        <settings-row>
          <span slot="heading">Enable siren device</span>
          <span slot="description">
            Activate a device as siren when alarm is triggered.
          </span>
          <ha-switch
            ?checked=${this.sirenEnabled}
            @change=${e=>{this.sirenEnabled=e.target.checked}}
          >
          </ha-switch>
        </settings-row>

        <settings-row>
          <span slot="heading">Siren device</span>
          <span slot="description">
            Device to activate during alarm event.
          </span>
          <paper-dropdown-menu
            ?disabled=${!this.sirenEnabled}
          >
            <paper-listbox
              slot="dropdown-content"
              selected="${t.includes(this.sirenEntity)?t.findIndex(e=>e==this.sirenEntity):0}"
              @selected-item-changed=${e=>{e.target.selectedItem&&(this.sirenEntity=e.target.selectedItem.getAttribute("value"))}}
            >
              ${t.map(e=>H`
              <paper-item value="${e}">${e}</paper-item>
            `)}
            </paper-listbox>
          </paper-dropdown-menu>
        </settings-row>
        <div class="card-actions">
          <mwc-button @click=${this.saveClick}>
            save changes
          </mwc-button>
        </div>
      </ha-card>
    `}saveClick(){if(!this.hass||!this)return;let e={entity_id:He(this.hass),edit_actions:{}};this.pushEnabled&&(e=Object.assign(Object.assign({},e),{edit_actions:Object.assign(Object.assign({},e.edit_actions),{push_target:this.pushTarget})})),this.sirenEnabled&&(e=Object.assign(Object.assign({},e),{edit_actions:Object.assign(Object.assign({},e.edit_actions),{siren_entity:this.sirenEntity})})),this.hass.callService("alarmo","edit_config",e)}static get styles(){return se`
      ${Fe}
    `}};t([K()],it.prototype,"hass",void 0),t([K()],it.prototype,"alarmEntity",void 0),t([K()],it.prototype,"pushEnabled",void 0),t([K()],it.prototype,"pushTarget",void 0),t([K()],it.prototype,"sirenEnabled",void 0),t([K()],it.prototype,"sirenEntity",void 0),it=t([Z("alarm-view-actions")],it),e.MyAlarmPanel=class extends ae{firstUpdated(){(async()=>{await Me()})()}render(){const e=this.hass.user;let t=e.is_admin;const s=this.hass.states[He(this.hass)],i=Object.entries(s.attributes.users).map(([e,t])=>ze(e,Number(t)));return!t&&i.find(t=>t.name==e.name)&&(t=i.find(t=>t.name==e.name).is_admin),t?H`
      <ha-app-layout>
        <app-header fixed slot="header">
          <app-toolbar>
            <ha-menu-button .hass=${this.hass}></ha-menu-button>
            <div main-title>
              Alarm panel
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
    `:H`
      <div class="view">
        <ha-card header="Alarmo">
          <div class="card-content">
            Hi there ${e.name}!<br><br>
            It looks like you don't have the appropriate permissions to configure Alarmo :(
          </div>
        </ha-card>
      </div>
    `}getPath(){return window.location.pathname.split("/").pop()}getView(){const e=this.getPath();return"general"!=e&&e&&"alarmo"!=e?"sensors"==e?H`
        <alarm-view-sensors .hass=${this.hass}> </alarm-view-sensors>
      `:"codes"==e?H`
        <alarm-view-codes .hass=${this.hass}> </alarm-view-codes>
      `:"actions"==e?H`
        <alarm-view-actions .hass=${this.hass}> </alarm-view-actions>
      `:H``:H`
        <alarm-view-general .hass=${this.hass}> </alarm-view-general>
      `}handlePageSelected(e){const t=e.detail.item.getAttribute("page-name");t!==this.getPath()?(!function(e,t,s){void 0===s&&(s=!1),s?history.replaceState(null,"",t):history.pushState(null,"",t),Ce(window,"location-changed",{replace:s})}(0,"/alarmo/"+t),this.requestUpdate()):scrollTo(0,0)}static get styles(){return se`
      ${Fe}

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
        z-index: 2;
      }

      paper-tabs {
        --paper-tabs-selection-bar-color: #fff;
        text-transform: uppercase;
      }

      .view {
        display: flex;
        justify-content: center;
        padding-top: 50px;
      }
    `}},t([K()],e.MyAlarmPanel.prototype,"hass",void 0),e.MyAlarmPanel=t([Z("alarm-panel")],e.MyAlarmPanel)}({});
