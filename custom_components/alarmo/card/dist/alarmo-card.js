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
    ***************************************************************************** */function e(t,e,s,i){var r,n=arguments.length,a=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,s,i);else for(var o=t.length-1;o>=0;o--)(r=t[o])&&(a=(n<3?r(a):n>3?r(e,s,a):r(e,s))||a);return n>3&&a&&Object.defineProperty(e,s,a),a
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
     */}const s="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,i=(t,e,s=null)=>{for(;e!==s;){const s=e.nextSibling;t.removeChild(e),e=s}},r=`{{lit-${String(Math.random()).slice(2)}}}`,n=`\x3c!--${r}--\x3e`,a=new RegExp(`${r}|${n}`);class o{constructor(t,e){this.parts=[],this.element=e;const s=[],i=[],n=document.createTreeWalker(e.content,133,null,!1);let o=0,c=-1,u=0;const{strings:p,values:{length:m}}=t;for(;u<m;){const t=n.nextNode();if(null!==t){if(c++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:s}=e;let i=0;for(let t=0;t<s;t++)l(e[t].name,"$lit$")&&i++;for(;i-- >0;){const e=p[u],s=d.exec(e)[2],i=s.toLowerCase()+"$lit$",r=t.getAttribute(i);t.removeAttribute(i);const n=r.split(a);this.parts.push({type:"attribute",index:c,name:s,strings:n}),u+=n.length-1}}"TEMPLATE"===t.tagName&&(i.push(t),n.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(r)>=0){const i=t.parentNode,r=e.split(a),n=r.length-1;for(let e=0;e<n;e++){let s,n=r[e];if(""===n)s=h();else{const t=d.exec(n);null!==t&&l(t[2],"$lit$")&&(n=n.slice(0,t.index)+t[1]+t[2].slice(0,-"$lit$".length)+t[3]),s=document.createTextNode(n)}i.insertBefore(s,t),this.parts.push({type:"node",index:++c})}""===r[n]?(i.insertBefore(h(),t),s.push(t)):t.data=r[n],u+=n}}else if(8===t.nodeType)if(t.data===r){const e=t.parentNode;null!==t.previousSibling&&c!==o||(c++,e.insertBefore(h(),t)),o=c,this.parts.push({type:"node",index:c}),null===t.nextSibling?t.data="":(s.push(t),c--),u++}else{let e=-1;for(;-1!==(e=t.data.indexOf(r,e+1));)this.parts.push({type:"node",index:-1}),u++}}else n.currentNode=i.pop()}for(const t of s)t.parentNode.removeChild(t)}}const l=(t,e)=>{const s=t.length-e.length;return s>=0&&t.slice(s)===e},c=t=>-1!==t.index,h=()=>document.createComment(""),d=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function u(t,e){const{element:{content:s},parts:i}=t,r=document.createTreeWalker(s,133,null,!1);let n=m(i),a=i[n],o=-1,l=0;const c=[];let h=null;for(;r.nextNode();){o++;const t=r.currentNode;for(t.previousSibling===h&&(h=null),e.has(t)&&(c.push(t),null===h&&(h=t)),null!==h&&l++;void 0!==a&&a.index===o;)a.index=null!==h?-1:a.index-l,n=m(i,n),a=i[n]}c.forEach(t=>t.parentNode.removeChild(t))}const p=t=>{let e=11===t.nodeType?0:1;const s=document.createTreeWalker(t,133,null,!1);for(;s.nextNode();)e++;return e},m=(t,e=-1)=>{for(let s=e+1;s<t.length;s++){const e=t[s];if(c(e))return s}return-1};
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
const g=new WeakMap,f=t=>"function"==typeof t&&g.has(t),_={},b={};
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
class y{constructor(t,e,s){this.__parts=[],this.template=t,this.processor=e,this.options=s}update(t){let e=0;for(const s of this.__parts)void 0!==s&&s.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=s?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],i=this.template.parts,r=document.createTreeWalker(t,133,null,!1);let n,a=0,o=0,l=r.nextNode();for(;a<i.length;)if(n=i[a],c(n)){for(;o<n.index;)o++,"TEMPLATE"===l.nodeName&&(e.push(l),r.currentNode=l.content),null===(l=r.nextNode())&&(r.currentNode=e.pop(),l=r.nextNode());if("node"===n.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(l.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,n.name,n.strings,this.options));a++}else this.__parts.push(void 0),a++;return s&&(document.adoptNode(t),customElements.upgrade(t)),t}}
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
     */const v=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:t=>t}),w=` ${r} `;class S{constructor(t,e,s,i){this.strings=t,this.values=e,this.type=s,this.processor=i}getHTML(){const t=this.strings.length-1;let e="",s=!1;for(let i=0;i<t;i++){const t=this.strings[i],a=t.lastIndexOf("\x3c!--");s=(a>-1||s)&&-1===t.indexOf("--\x3e",a+1);const o=d.exec(t);e+=null===o?t+(s?w:n):t.substr(0,o.index)+o[1]+o[2]+"$lit$"+o[3]+r}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");let e=this.getHTML();return void 0!==v&&(e=v.createHTML(e)),t.innerHTML=e,t}}
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
     */const x=t=>null===t||!("object"==typeof t||"function"==typeof t),k=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class C{constructor(t,e,s){this.dirty=!0,this.element=t,this.name=e,this.strings=s,this.parts=[];for(let t=0;t<s.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new P(this)}_getValue(){const t=this.strings,e=t.length-1,s=this.parts;if(1===e&&""===t[0]&&""===t[1]){const t=s[0].value;if("symbol"==typeof t)return String(t);if("string"==typeof t||!k(t))return t}let i="";for(let r=0;r<e;r++){i+=t[r];const e=s[r];if(void 0!==e){const t=e.value;if(x(t)||!k(t))i+="string"==typeof t?t:String(t);else for(const e of t)i+="string"==typeof e?e:String(e)}}return i+=t[e],i}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class P{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===_||x(t)&&t===this.value||(this.value=t,f(t)||(this.committer.dirty=!0))}commit(){for(;f(this.value);){const t=this.value;this.value=_,t(this)}this.value!==_&&this.committer.commit()}}class N{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(h()),this.endNode=t.appendChild(h())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=h()),t.__insert(this.endNode=h())}insertAfterPart(t){t.__insert(this.startNode=h()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;f(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=_,t(this)}const t=this.__pendingValue;t!==_&&(x(t)?t!==this.value&&this.__commitText(t):t instanceof S?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):k(t)?this.__commitIterable(t):t===b?(this.value=b,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,s="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=s:this.__commitNode(document.createTextNode(s)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof y&&this.value.template===e)this.value.update(t.values);else{const s=new y(e,t.processor,this.options),i=s._clone();s.update(t.values),this.__commitNode(i),this.value=s}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let s,i=0;for(const r of t)s=e[i],void 0===s&&(s=new N(this.options),e.push(s),0===i?s.appendIntoPart(this):s.insertAfterPart(e[i-1])),s.setValue(r),s.commit(),i++;i<e.length&&(e.length=i,this.clear(s&&s.endNode))}clear(t=this.startNode){i(this.startNode.parentNode,t.nextSibling,this.endNode)}}class T{constructor(t,e,s){if(this.value=void 0,this.__pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=s}setValue(t){this.__pendingValue=t}commit(){for(;f(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=_,t(this)}if(this.__pendingValue===_)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=_}}class M extends C{constructor(t,e,s){super(t,e,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new $(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class $ extends P{}let A=!1;(()=>{try{const t={get capture(){return A=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class E{constructor(t,e,s){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=s,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;f(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=_,t(this)}if(this.__pendingValue===_)return;const t=this.__pendingValue,e=this.value,s=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),i=null!=t&&(null==e||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),i&&(this.__options=D(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=_}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const D=t=>t&&(A?{capture:t.capture,passive:t.passive,once:t.once}:t.capture)
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
     */;function O(t){let e=z.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},z.set(t.type,e));let s=e.stringsArray.get(t.strings);if(void 0!==s)return s;const i=t.strings.join(r);return s=e.keyString.get(i),void 0===s&&(s=new o(t,t.getTemplateElement()),e.keyString.set(i,s)),e.stringsArray.set(t.strings,s),s}const z=new Map,R=new WeakMap;
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
class{handleAttributeExpressions(t,e,s,i){const r=e[0];if("."===r){return new M(t,e.slice(1),s).parts}if("@"===r)return[new E(t,e.slice(1),i.eventContext)];if("?"===r)return[new T(t,e.slice(1),s)];return new C(t,e,s).parts}handleTextExpression(t){return new N(t)}};
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
     */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const V=(t,...e)=>new S(t,e,"html",U)
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
     */,I=(t,e)=>`${t}--${e}`;let j=!0;void 0===window.ShadyCSS?j=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),j=!1);const Y=t=>e=>{const s=I(e.type,t);let i=z.get(s);void 0===i&&(i={stringsArray:new WeakMap,keyString:new Map},z.set(s,i));let n=i.stringsArray.get(e.strings);if(void 0!==n)return n;const a=e.strings.join(r);if(n=i.keyString.get(a),void 0===n){const s=e.getTemplateElement();j&&window.ShadyCSS.prepareTemplateDom(s,t),n=new o(e,s),i.keyString.set(a,n)}return i.stringsArray.set(e.strings,n),n},q=["html","svg"],H=new Set,L=(t,e,s)=>{H.add(t);const i=s?s.element:document.createElement("template"),r=e.querySelectorAll("style"),{length:n}=r;if(0===n)return void window.ShadyCSS.prepareTemplateStyles(i,t);const a=document.createElement("style");for(let t=0;t<n;t++){const e=r[t];e.parentNode.removeChild(e),a.textContent+=e.textContent}(t=>{q.forEach(e=>{const s=z.get(I(e,t));void 0!==s&&s.keyString.forEach(t=>{const{element:{content:e}}=t,s=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{s.add(t)}),u(t,s)})})})(t);const o=i.content;s?function(t,e,s=null){const{element:{content:i},parts:r}=t;if(null==s)return void i.appendChild(e);const n=document.createTreeWalker(i,133,null,!1);let a=m(r),o=0,l=-1;for(;n.nextNode();){l++;for(n.currentNode===s&&(o=p(e),s.parentNode.insertBefore(e,s));-1!==a&&r[a].index===l;){if(o>0){for(;-1!==a;)r[a].index+=o,a=m(r,a);return}a=m(r,a)}}}(s,a,o.firstChild):o.insertBefore(a,o.firstChild),window.ShadyCSS.prepareTemplateStyles(i,t);const l=o.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)e.insertBefore(l.cloneNode(!0),e.firstChild);else if(s){o.insertBefore(a,o.firstChild);const t=new Set;t.add(a),u(s,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const F={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},B=(t,e)=>e!==t&&(e==e||t==t),W={attribute:!0,type:String,converter:F,reflect:!1,hasChanged:B};class J extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,s)=>{const i=this._attributeNameForProperty(s,e);void 0!==i&&(this._attributeToPropertyMap.set(i,s),t.push(i))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=W){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const s="symbol"==typeof t?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const r=this[t];this[e]=i,this.requestUpdateInternal(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||W}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty("finalized")||t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const s of e)this.createProperty(s,t[s])}}static _attributeNameForProperty(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,s=B){return s(t,e)}static _propertyValueFromAttribute(t,e){const s=e.type,i=e.converter||F,r="function"==typeof i?i:i.fromAttribute;return r?r(t,s):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const s=e.type,i=e.converter;return(i&&i.toAttribute||F.toAttribute)(t,s)}initialize(){this._updateState=0,this._updatePromise=new Promise(t=>this._enableUpdatingResolver=t),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,s){e!==s&&this._attributeToProperty(t,s)}_propertyToAttribute(t,e,s=W){const i=this.constructor,r=i._attributeNameForProperty(t,s);if(void 0!==r){const t=i._propertyValueToAttribute(e,s);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(r):this.setAttribute(r,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const s=this.constructor,i=s._attributeToPropertyMap.get(t);if(void 0!==i){const t=s.getPropertyOptions(i);this._updateState=16|this._updateState,this[i]=s._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}requestUpdateInternal(t,e,s){let i=!0;if(void 0!==t){const r=this.constructor;s=s||r.getPropertyOptions(t),r._valueHasChanged(this[t],e,s.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==s.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,s))):i=!1}!this._hasRequestedUpdate&&i&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this.requestUpdateInternal(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}J.finalized=!0;
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
const Z=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:s,elements:i}=e;return{kind:s,elements:i,finisher(e){window.customElements.define(t,e)}}})(t,e),K=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?Object.assign(Object.assign({},e),{finisher(s){s.createProperty(e.key,t)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(s){s.createProperty(e.key,t)}};function G(t){return(e,s)=>void 0!==s?((t,e,s)=>{e.constructor.createProperty(s,t)})(t,e,s):K(t,e)}function X(t){return G({attribute:!1,hasChanged:null==t?void 0:t.hasChanged})}
/**
    @license
    Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
    This code may only be used under the BSD style license found at
    http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
    http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
    found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
    part of the polymer project is also subject to an additional IP rights grant
    found at http://polymer.github.io/PATENTS.txt
    */const Q=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,tt=Symbol();class et{constructor(t,e){if(e!==tt)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(Q?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const st=(t,...e)=>{const s=e.reduce((e,s,i)=>e+(t=>{if(t instanceof et)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+t[i+1],t[0]);return new et(s,tt)};
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const it={};class rt extends J{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(Array.isArray(t)){const e=(t,s)=>t.reduceRight((t,s)=>Array.isArray(s)?e(s,t):(t.add(s),t),s),s=e(t,new Set),i=[];s.forEach(t=>i.unshift(t)),this._styles=i}else this._styles=void 0===t?[]:[t];this._styles=this._styles.map(t=>{if(t instanceof CSSStyleSheet&&!Q){const e=Array.prototype.slice.call(t.cssRules).reduce((t,e)=>t+e.cssText,"");return new et(String(e),tt)}return t})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?Q?this.renderRoot.adoptedStyleSheets=t.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==it&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){return it}}rt.finalized=!0,rt.render=(t,e,s)=>{if(!s||"object"!=typeof s||!s.scopeName)throw new Error("The `scopeName` option is required.");const r=s.scopeName,n=R.has(e),a=j&&11===e.nodeType&&!!e.host,o=a&&!H.has(r),l=o?document.createDocumentFragment():e;if(((t,e,s)=>{let r=R.get(e);void 0===r&&(i(e,e.firstChild),R.set(e,r=new N(Object.assign({templateFactory:O},s))),r.appendInto(e)),r.setValue(t),r.commit()})(t,l,Object.assign({templateFactory:Y(r)},s)),o){const t=R.get(l);R.delete(l);const s=t.value instanceof y?t.value.template:void 0;L(r,l,s),i(e,e.firstChild),e.appendChild(l),R.set(e,t)}!n&&a&&window.ShadyCSS.styleElement(e.host)};var nt=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,at="[^\\s]+",ot=/\[([^]*?)\]/gm;function lt(t,e){for(var s=[],i=0,r=t.length;i<r;i++)s.push(t[i].substr(0,e));return s}var ct=function(t){return function(e,s){var i=s[t].map((function(t){return t.toLowerCase()})).indexOf(e.toLowerCase());return i>-1?i:null}};function ht(t){for(var e=[],s=1;s<arguments.length;s++)e[s-1]=arguments[s];for(var i=0,r=e;i<r.length;i++){var n=r[i];for(var a in n)t[a]=n[a]}return t}var dt=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],ut=["January","February","March","April","May","June","July","August","September","October","November","December"],pt=lt(ut,3),mt={dayNamesShort:lt(dt,3),dayNames:dt,monthNamesShort:pt,monthNames:ut,amPm:["am","pm"],DoFn:function(t){return t+["th","st","nd","rd"][t%10>3?0:(t-t%10!=10?1:0)*t%10]}},gt=ht({},mt),ft=function(t,e){for(void 0===e&&(e=2),t=String(t);t.length<e;)t="0"+t;return t},_t={D:function(t){return String(t.getDate())},DD:function(t){return ft(t.getDate())},Do:function(t,e){return e.DoFn(t.getDate())},d:function(t){return String(t.getDay())},dd:function(t){return ft(t.getDay())},ddd:function(t,e){return e.dayNamesShort[t.getDay()]},dddd:function(t,e){return e.dayNames[t.getDay()]},M:function(t){return String(t.getMonth()+1)},MM:function(t){return ft(t.getMonth()+1)},MMM:function(t,e){return e.monthNamesShort[t.getMonth()]},MMMM:function(t,e){return e.monthNames[t.getMonth()]},YY:function(t){return ft(String(t.getFullYear()),4).substr(2)},YYYY:function(t){return ft(t.getFullYear(),4)},h:function(t){return String(t.getHours()%12||12)},hh:function(t){return ft(t.getHours()%12||12)},H:function(t){return String(t.getHours())},HH:function(t){return ft(t.getHours())},m:function(t){return String(t.getMinutes())},mm:function(t){return ft(t.getMinutes())},s:function(t){return String(t.getSeconds())},ss:function(t){return ft(t.getSeconds())},S:function(t){return String(Math.round(t.getMilliseconds()/100))},SS:function(t){return ft(Math.round(t.getMilliseconds()/10),2)},SSS:function(t){return ft(t.getMilliseconds(),3)},a:function(t,e){return t.getHours()<12?e.amPm[0]:e.amPm[1]},A:function(t,e){return t.getHours()<12?e.amPm[0].toUpperCase():e.amPm[1].toUpperCase()},ZZ:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+ft(100*Math.floor(Math.abs(e)/60)+Math.abs(e)%60,4)},Z:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+ft(Math.floor(Math.abs(e)/60),2)+":"+ft(Math.abs(e)%60,2)}},bt=function(t){return+t-1},yt=[null,"[1-9]\\d?"],vt=[null,at],wt=["isPm",at,function(t,e){var s=t.toLowerCase();return s===e.amPm[0]?0:s===e.amPm[1]?1:null}],St=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(t){var e=(t+"").match(/([+-]|\d\d)/gi);if(e){var s=60*+e[1]+parseInt(e[2],10);return"+"===e[0]?s:-s}return 0}],xt=(ct("monthNamesShort"),ct("monthNames"),{default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",isoDate:"YYYY-MM-DD",isoDateTime:"YYYY-MM-DDTHH:mm:ssZ",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"});var kt=function(t,e,s){if(void 0===e&&(e=xt.default),void 0===s&&(s={}),"number"==typeof t&&(t=new Date(t)),"[object Date]"!==Object.prototype.toString.call(t)||isNaN(t.getTime()))throw new Error("Invalid Date pass to format");var i=[];e=(e=xt[e]||e).replace(ot,(function(t,e){return i.push(e),"@@@"}));var r=ht(ht({},gt),s);return(e=e.replace(nt,(function(e){return _t[e](t,r)}))).replace(/@@@/g,(function(){return i.shift()}))},Ct=function(){try{(new Date).toLocaleDateString("i")}catch(t){return"RangeError"===t.name}return!1}()?function(t,e){return t.toLocaleDateString(e,{year:"numeric",month:"long",day:"numeric"})}:function(t){return kt(t,"mediumDate")},Pt=function(){try{(new Date).toLocaleString("i")}catch(t){return"RangeError"===t.name}return!1}()?function(t,e){return t.toLocaleString(e,{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"2-digit"})}:function(t){return kt(t,"haDateTime")},Nt=function(){try{(new Date).toLocaleTimeString("i")}catch(t){return"RangeError"===t.name}return!1}()?function(t,e){return t.toLocaleTimeString(e,{hour:"numeric",minute:"2-digit"})}:function(t){return kt(t,"shortTime")};function Tt(t){return t.substr(0,t.indexOf("."))}function Mt(t,e,s){if("unknown"===e.state||"unavailable"===e.state)return t("state.default."+e.state);if(e.attributes.unit_of_measurement)return e.state+" "+e.attributes.unit_of_measurement;var i=function(t){return Tt(t.entity_id)}(e);if("input_datetime"===i){var r;if(!e.attributes.has_time)return r=new Date(e.attributes.year,e.attributes.month-1,e.attributes.day),Ct(r,s);if(!e.attributes.has_date){var n=new Date;return r=new Date(n.getFullYear(),n.getMonth(),n.getDay(),e.attributes.hour,e.attributes.minute),Nt(r,s)}return r=new Date(e.attributes.year,e.attributes.month-1,e.attributes.day,e.attributes.hour,e.attributes.minute),Pt(r,s)}return e.attributes.device_class&&t("component."+i+".state."+e.attributes.device_class+"."+e.state)||t("component."+i+".state._."+e.state)||e.state}var $t="hass:bookmark",At=function(t,e,s,i){i=i||{},s=null==s?{}:s;var r=new Event(e,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});return r.detail=s,t.dispatchEvent(r),r},Et={alert:"hass:alert",automation:"hass:playlist-play",calendar:"hass:calendar",camera:"hass:video",climate:"hass:thermostat",configurator:"hass:settings",conversation:"hass:text-to-speech",device_tracker:"hass:account",fan:"hass:fan",group:"hass:google-circles-communities",history_graph:"hass:chart-line",homeassistant:"hass:home-assistant",homekit:"hass:home-automation",image_processing:"hass:image-filter-frames",input_boolean:"hass:drawing",input_datetime:"hass:calendar-clock",input_number:"hass:ray-vertex",input_select:"hass:format-list-bulleted",input_text:"hass:textbox",light:"hass:lightbulb",mailbox:"hass:mailbox",notify:"hass:comment-alert",person:"hass:account",plant:"hass:flower",proximity:"hass:apple-safari",remote:"hass:remote",scene:"hass:google-pages",script:"hass:file-document",sensor:"hass:eye",simple_alarm:"hass:bell",sun:"hass:white-balance-sunny",switch:"hass:flash",timer:"hass:timer",updater:"hass:cloud-upload",vacuum:"hass:robot-vacuum",water_heater:"hass:thermometer",weblink:"hass:open-in-new"};function Dt(t,e){if(t in Et)return Et[t];switch(t){case"alarm_control_panel":switch(e){case"armed_home":return"hass:bell-plus";case"armed_night":return"hass:bell-sleep";case"disarmed":return"hass:bell-outline";case"triggered":return"hass:bell-ring";default:return"hass:bell"}case"binary_sensor":return e&&"off"===e?"hass:radiobox-blank":"hass:checkbox-marked-circle";case"cover":return"closed"===e?"hass:window-closed":"hass:window-open";case"lock":return e&&"unlocked"===e?"hass:lock-open":"hass:lock";case"media_player":return e&&"off"!==e&&"idle"!==e?"hass:cast-connected":"hass:cast";case"zwave":switch(e){case"dead":return"hass:emoticon-dead";case"sleeping":return"hass:sleep";case"initializing":return"hass:timer-sand";default:return"hass:z-wave"}default:return console.warn("Unable to find icon for domain "+t+" ("+e+")"),$t}}var Ot={humidity:"hass:water-percent",illuminance:"hass:brightness-5",temperature:"hass:thermometer",pressure:"hass:gauge",power:"hass:flash",signal_strength:"hass:wifi"},zt={binary_sensor:function(t){var e=t.state&&"off"===t.state;switch(t.attributes.device_class){case"battery":return e?"hass:battery":"hass:battery-outline";case"cold":return e?"hass:thermometer":"hass:snowflake";case"connectivity":return e?"hass:server-network-off":"hass:server-network";case"door":return e?"hass:door-closed":"hass:door-open";case"garage_door":return e?"hass:garage":"hass:garage-open";case"gas":case"power":case"problem":case"safety":case"smoke":return e?"hass:shield-check":"hass:alert";case"heat":return e?"hass:thermometer":"hass:fire";case"light":return e?"hass:brightness-5":"hass:brightness-7";case"lock":return e?"hass:lock":"hass:lock-open";case"moisture":return e?"hass:water-off":"hass:water";case"motion":return e?"hass:walk":"hass:run";case"occupancy":return e?"hass:home-outline":"hass:home";case"opening":return e?"hass:square":"hass:square-outline";case"plug":return e?"hass:power-plug-off":"hass:power-plug";case"presence":return e?"hass:home-outline":"hass:home";case"sound":return e?"hass:music-note-off":"hass:music-note";case"vibration":return e?"hass:crop-portrait":"hass:vibrate";case"window":return e?"hass:window-closed":"hass:window-open";default:return e?"hass:radiobox-blank":"hass:checkbox-marked-circle"}},cover:function(t){var e="closed"!==t.state;switch(t.attributes.device_class){case"garage":return e?"hass:garage-open":"hass:garage";case"door":return e?"hass:door-open":"hass:door-closed";case"shutter":return e?"hass:window-shutter-open":"hass:window-shutter";case"blind":return e?"hass:blinds-open":"hass:blinds";case"window":return e?"hass:window-open":"hass:window-closed";default:return Dt("cover",t.state)}},sensor:function(t){var e=t.attributes.device_class;if(e&&e in Ot)return Ot[e];if("battery"===e){var s=Number(t.state);if(isNaN(s))return"hass:battery-unknown";var i=10*Math.round(s/10);return i>=100?"hass:battery":i<=0?"hass:battery-alert":"hass:battery-"+i}var r=t.attributes.unit_of_measurement;return"°C"===r||"°F"===r?"hass:thermometer":Dt("sensor")},input_datetime:function(t){return t.attributes.has_date?t.attributes.has_time?Dt("input_datetime"):"hass:calendar":"hass:clock"}};const Rt=["1","2","3","4","5","6","7","8","9","","0","clear"],Ut={armed_away:"hass:shield-lock",armed_custom_bypass:"hass:security",armed_home:"hass:shield-home",armed_night:"hass:shield-home",disarmed:"hass:shield-check",arming:"hass:shield-outline",pending:"hass:shield-outline",triggered:"hass:bell-ring"},Vt="no_code_provided",It="invalid_code_provided",jt=["arming","pending"];var Yt={keep_keypad_visible:"Keep the keypad always visible, also when no code input is required."},qt={blocking_sensors:"Could not arm due to the following sensors",triggered_sensors:"Alarm was triggered by the following sensors"},Ht={editor:Yt,errors:qt},Lt={en:Object.freeze({__proto__:null,editor:Yt,errors:qt,default:Ht})};function Ft(t,e,s="",i=""){const r=e.replace(/['"]+/g,"").replace("-","_");var n;try{n=t.split(".").reduce((t,e)=>t[e],Lt[r])}catch(e){n=t.split(".").reduce((t,e)=>t[e],Lt.en)}if(void 0===n&&(n=t.split(".").reduce((t,e)=>t[e],Lt.en)),""!==s&&""!==i){Array.isArray(s)||(s=[s]),Array.isArray(i)||(i=[i]);for(let t=0;t<s.length;t++)n=n.replace(s[t],i[t])}return n}let Bt=class extends rt{setConfig(t){this._config=Object.assign({},t)}render(){if(!this._config||!this.hass)return V``;const t=this._config.entity?this.hass.states[this._config.entity]:void 0;return V`
      <div class="card-config">
        <ha-entity-picker
          .label="${this.hass.localize("ui.panel.lovelace.editor.card.generic.entity")} (${this.hass.localize("ui.panel.lovelace.editor.card.config.required")})"
          .hass=${this.hass}
          .value="${this._config.entity||""}"
          .includeDomains=${["alarm_control_panel"]}
          @change=${t=>this._updateConfig("entity",t.target.value)}
          allow-custom-entity
        ></ha-entity-picker>
        ${t&&t.attributes.code_arm_required!==t.attributes.code_disarm_required?V`
        <ha-formfield
          .label=${Ft("editor.keep_keypad_visible",this.hass.language)}
        >
          <ha-switch
            .checked=${this._config.keep_keypad_visible}
            @change=${t=>this._updateConfig("keep_keypad_visible",t.target.checked)}
          ></ha-switch
        ></ha-formfield>`:""}
      </div>
    `}_updateConfig(t,e){if(this.hass){if(this._config=Object.assign(Object.assign({},this._config),{[t]:e}),"entity"==t){const t=this._config.entity?this.hass.states[this._config.entity]:void 0;t&&t.attributes.code_arm_required!=t.attributes.code_disarm_required||(this._config=Object.assign(Object.assign({},this._config),{keep_keypad_visible:!1}))}At(this,"config-changed",{config:this._config})}}static get styles(){return st`
      ha-formfield {
        padding: 20px 0px;
      }
    `}};e([G({attribute:!1})],Bt.prototype,"hass",void 0),e([X()],Bt.prototype,"_config",void 0),Bt=e([Z("alarmo-card-editor")],Bt);var Wt=Object.freeze({__proto__:null,get AlarmoCardEditor(){return Bt}});class Jt extends rt{constructor(){super(...arguments),this.duration=0,this.datetime=null,this.timer=0,this.offset=0}shouldUpdate(t){if(!t.size)return!0;const e=t.get("hass");if(!e||e.themes!==this.hass.themes||e.language!==this.hass.language)return!0;if(e.states[this.entity].state!==this.hass.states[this.entity].state){const t=e.states[this.entity].state,s=this.hass.states[this.entity].state;return jt.includes(s)?this.startTimer():jt.includes(t)&&this.stopTimer(),!0}return!1}firstUpdated(){const t=this.hass.states[this.entity].state;jt.includes(t)&&this.startTimer()}startTimer(){clearInterval(this.timer);const t=this.hass.states[this.entity];if(!t.attributes.expiration||!t.attributes.delay)return;this.duration=t.attributes.delay,this.datetime=new Date(t.attributes.expiration),this.offset=0;const e=this.getRemaining();this.offset=e-this.duration,this.timer=window.setInterval(()=>{this.requestUpdate()},1e3)}stopTimer(){clearInterval(this.timer),this.datetime=null,this.duration=0}getRemaining(){if(!this.datetime)return 0;const t=(this.datetime.getTime()-(new Date).getTime())/1e3-this.offset;return t<0?(clearInterval(this.timer),0):t}getTime(){const t=Math.round(this.getRemaining());return t<=0?"":t}getFraction(){return this.duration?(Math.round(this.getRemaining())-1)/this.duration:1}_stateValue(t){return this.datetime&&this.duration?V`
        ${this.getTime()}
      `:V`
        <ha-icon .icon=${Ut[t]}></ha-icon>
      `}render(){let t=45,e=2*Math.PI*t;const s=this.hass.states[this.entity],i=this.datetime&&this.duration;return V`
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g class="track ${s.state.split("_").shift()} ${i?"timer":""}">
          <circle cx="${50}" cy="${50}" r="${t}"></circle>
          <path
            stroke-dasharray="${(this.getFraction()*e).toFixed(2)} ${e.toFixed(2)}"
            class="remaining"
            d="
              M ${50}, ${50}
              m -${t}, 0
              a ${t},${t} 0 1,0 90,0
              a ${t},${t} 0 1,0 -90,0
            "
          ></path>
        </g>
      </svg>
      <div class="overlay ${s.state.split("_").shift()} ${i?"timer":""}">
        <div class="value">
          ${this._stateValue(s.state)}
        </div>
      </div>
      `}static get styles(){return st`
      :host {
        --alarm-color-disarmed: var(--label-badge-green);
        --alarm-color-pending: var(--label-badge-yellow);
        --alarm-color-triggered: var(--label-badge-red);
        --alarm-color-armed: var(--label-badge-red);
        width: 60px;
        height: 60px;
        cursor: pointer;
      }
      svg {
        overflow: visible;
        display: block;
        transform: scaleX(-1);
      }
      .track {
        stroke-width: 3;
        stroke-linecap: round;
        stroke: lightgray;
        fill: none;
      }
      .track .remaining {
        transform: rotate(90deg);
        transform-origin: center;
        transition: 0.3s linear stroke;
        stroke: var(--alarm-state-color);
      }
      .track.arming .remaining, .track.pending .remaining {
        transition: 1s linear stroke-dasharray;
      }
      .overlay {
        position: absolute;
        margin-top: -60px;
        margin-left: 0;
        width: 60px;
        height: 60px;
        font-size: 1.5em;
        white-space: nowrap;
      }
      .value {
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
        color: var(--alarm-state-color);
        transition: 0.3s linear color;
        display: flex;
        flex: 1;
        height: 100%;
        align-items: center;
        justify-content: center;
        font-weight: 500;
      }
      .value ha-icon {
        --mdc-icon-size: 1.2em;
      }
      .disarmed {
        --alarm-state-color: var(--alarm-color-disarmed);
      }
      .triggered {
        --alarm-state-color: var(--alarm-color-triggered);
        animation: pulse 1s infinite;
      }
      .arming, .pending {
        --alarm-state-color: var(--alarm-color-pending);
        animation: pulse 1s infinite;
      }
      .arming.timer, .pending.timer {
        --alarm-state-color: var(--primary-color);
        animation: none;
      }
      .armed {
        --alarm-state-color: var(--alarm-color-armed);
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
    `}}e([G()],Jt.prototype,"hass",void 0),e([G()],Jt.prototype,"entity",void 0),customElements.define("alarmo-state-badge",Jt);class Zt extends rt{shouldUpdate(t){const e=t.get("hass");return!e||!(!this.entity||e.states[this.entity]===this.hass.states[this.entity])}render(){if(!this.hass||!this.entity)return V``;let t=Object.assign({},this.hass.states[this.entity]);void 0!==this.state&&(t=Object.assign(Object.assign({},t),{state:this.state}));const e=function(t){if(!t)return $t;if(t.attributes.icon)return t.attributes.icon;var e=Tt(t.entity_id);return e in zt?zt[e](t):Dt(e,t.state)}(t),s=Mt(this.hass.localize,t,this.hass.language),i=t.attributes.friendly_name||(r=t.entity_id).substr(r.indexOf(".")+1);var r;let n=!!this.state||"on"==t.state;return V`
      <div
        class="badge-container"
        @click=${()=>At(this,"hass-more-info",{entityId:this.entity})}
      >
        <div class="label-badge ${n?"active":""}" id="badge">
          <div class="value">
            <ha-icon .icon=${e}></ha-icon>
            <div class="label">
              <span>${s}</span>
            </div>
          </div>
        </div>
        <div class="title">${i}</div>
      </div>
        
    `}static get styles(){return[st`
        .badge-container {
          display: inline-block;
          text-align: center;
          vertical-align: top;
          padding: var(--ha-label-badge-padding, 0 0 0 0);
          cursor: pointer;
        }
        .label-badge {
          position: relative;
          display: block;
          margin: 0 auto;
          width: var(--ha-label-badge-size, 2.5em);
          text-align: center;
          height: var(--ha-label-badge-size, 2.5em);
          line-height: var(--ha-label-badge-size, 2.5em);
          font-size: var(--ha-label-badge-font-size, 1.5em);
          border-radius: 50%;
          border: 0.1em solid var(--primary-color);
          color: var(--label-badge-text-color, rgb(76, 76, 76));
          white-space: nowrap;
          background-color: none;
          background-size: cover;
          transition: border 0.3s ease-in-out;
        }
        .label-badge.active {
          border: 0.1em solid var(--label-badge-red);
        }
        .label-badge .value {
          font-size: 90%;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .label-badge .label {
          position: absolute;
          bottom: -1em;
          left: -0.2em;
          right: -0.2em;
          line-height: 1em;
          font-size: 0.5em;
        }
        .label-badge .label span {
          box-sizing: border-box;
          max-width: 100%;
          display: inline-block;
          background-color: var(--primary-color);
          color: var(--ha-label-badge-label-color, white);
          border-radius: 1em;
          padding: 9% 16% 8% 16%;
          font-weight: 500;
          overflow: hidden;
          text-transform: uppercase;
          text-overflow: ellipsis;
          transition: background-color 0.3s ease-in-out;
          text-transform: var(--ha-label-badge-label-text-transform, uppercase);
        }
        .label-badge.active .label span {
          background-color: var(--label-badge-red);
        }
        .badge-container .title {
          margin-top: 1em;
          font-size: var(--ha-label-badge-title-font-size, 0.9em);
          width: var(--ha-label-badge-title-width, 5em);
          font-weight: var(--ha-label-badge-title-font-weight, 400);
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: normal;
        }
      `]}}e([G()],Zt.prototype,"hass",void 0),e([G()],Zt.prototype,"entity",void 0),e([G()],Zt.prototype,"state",void 0),customElements.define("alarmo-sensor-badge",Zt);const Kt=t=>{class s extends t{connectedCallback(){super.connectedCallback(),this.__checkSubscribed()}disconnectedCallback(){if(super.disconnectedCallback(),this.__unsubs){for(;this.__unsubs.length;){const t=this.__unsubs.pop();t instanceof Promise?t.then(t=>t()):t()}this.__unsubs=void 0}}updated(t){super.updated(t),t.has("hass")&&this.__checkSubscribed()}hassSubscribe(){return[]}__checkSubscribed(){void 0===this.__unsubs&&this.isConnected&&void 0!==this.hass&&(this.__unsubs=this.hassSubscribe())}}return e([G({attribute:!1})],s.prototype,"hass",void 0),s};t.AlarmoCard=class extends(Kt(rt)){constructor(){super(...arguments),this._input="",this.warning="",this.timer=0,this.subscribedEntities=[]}static async getConfigElement(){return await Promise.resolve().then((function(){return Wt})),document.createElement("alarmo-card-editor")}async getCardSize(){if(!this._config||!this.hass)return 9;const t=this.hass.states[this._config.entity];return t&&"number"===t.attributes.code_format&&(this._codeRequired(t)||this._config.keep_keypad_visible)?9:4}setConfig(t){if(!t||!t.entity||"alarm_control_panel"!==t.entity.split(".")[0])throw new Error("Invalid configuration");this._config=Object.assign({},t)}hassSubscribe(){var t;return(null===(t=this.hass)||void 0===t?void 0:t.user.is_admin)?[this.hass.connection.subscribeEvents(t=>this._fetchData(t),"alarmo_event")]:[]}async _fetchData(t){this.hass&&([It,Vt].includes(t.data.event)?this._showInvalidInput():"failed_to_arm"==t.data.event&&(this.warning="blocking_sensors",this._input=""))}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");if(!e||e.themes!==this.hass.themes||e.language!==this.hass.language)return!0;if(e.states[this._config.entity]!==this.hass.states[this._config.entity]){const t=e.states[this._config.entity],s=this.hass.states[this._config.entity];return this.processStateUpdate(t,s),!0}return!(!this.subscribedEntities.length||!this.subscribedEntities.some(t=>e.states[t]!==this.hass.states[t]))}processStateUpdate(t,e){("disarmed"==t.state&&"disarmed"!=e.state||"disarmed"==e.state&&"disarmed"!=t.state)&&(window.clearTimeout(this.timer),this._hideInvalidInput(),this._input=""),"disarmed"==t.state&&"disarmed"==e.state&&e.attributes.open_sensors&&(this.warning="blocking_sensors",this._input=""),"arming"==t.state&&"disarmed"==e.state?(this.warning="blocking_sensors",this._input=""):"arming"!==e.state&&(this.subscribedEntities=[])}_codeRequired(t){return t.attributes.code_format&&("disarmed"===t.state&&t.attributes.code_arm_required||"disarmed"!==t.state&&t.attributes.code_disarm_required)}render(){if(!this._config||!this.hass)return V``;const t=this.hass.states[this._config.entity];return t?V`
      <ha-card>

        <div class="header">
          <div class="icon">
            <alarmo-state-badge
              .hass=${this.hass}
              .entity=${this._config.entity}
              @click=${()=>At(this,"hass-more-info",{entityId:this._config.entity})}
            >
            </alarmo-state-badge>
          </div>
          <div class="summary">
            <div class="name">${t.attributes.friendly_name}</div>
            <div class="state">${this.hass.localize("component.alarm_control_panel.state._."+t.state)}</div>
          </div>
        </div>
        

        ${this._renderWarning()}

        <div id="armActions" class="actions">
          ${("disarmed"===t.state?this.calcSupportedStates():["disarm"]).map(t=>V`
              <mwc-button
                @click=${e=>this._handleActionClick(e,t)}
                outlined
              >
                ${this.hass.localize("ui.card.alarm_control_panel."+t)}
              </mwc-button>
            `)}
        </div>

        ${this._codeRequired(t)||this._config.keep_keypad_visible?V`
              <paper-input
                .value=${this._input}
                .label=${this.hass.localize("ui.card.alarm_control_panel.code")}
                ?disabled=${!this._codeRequired(t)}
                @value-changed=${t=>{this._hideInvalidInput(),this._input=t.target.value}}
                @focus=${this._hideInvalidInput}
                type="password"
                id="code_input"
                .inputmode=${"number"===t.attributes.code_format?"numeric":"text"}
              ></paper-input>
            `:V``}
        ${!this._codeRequired(t)&&!this._config.keep_keypad_visible||"number"!==t.attributes.code_format?V``:V`
              <div id="keypad">
                ${Rt.map(e=>""===e?V` <mwc-button disabled></mwc-button> `:V`
                        <mwc-button
                          .value="${e}"
                          @click=${this._handlePadClick}
                          ?disabled=${!this._codeRequired(t)}
                          outlined
                          class="${"clear"!==e?"numberKey":""}"
                        >
                          ${"clear"===e?this.hass.localize("ui.card.alarm_control_panel.clear_code"):e}
                        </mwc-button>
                      `)}
              </div>
            `}
      </ha-card>
    `:V`
        <hui-warning>
         ${"NOT_RUNNING"!==this.hass.config.state?this.hass.localize("ui.panel.lovelace.warning.entity_not_found","entity",this._config.entity||"[empty]"):this.hass.localize("ui.panel.lovelace.warning.starting")}
        </hui-warning>
      `}_renderWarning(){if(!this.hass||!this._config)return V``;const t=this.hass.states[this._config.entity];return t.attributes.open_sensors&&"triggered"==t.state||"blocking_sensors"==this.warning&&t.attributes.open_sensors?V`
        <div class="message">
          <div class="description">
            <span>
              <ha-icon icon="hass:alert"></ha-icon>
              ${"blocking_sensors"==this.warning?Ft("errors.blocking_sensors",this.hass.language):Ft("errors.triggered_sensors",this.hass.language)}
            </span>
          </div>
          <div class="content">
          ${Object.entries(t.attributes.open_sensors).map(([t])=>(this.subscribedEntities.includes(t)||this.subscribedEntities.push(t),V`
            <div class="badge">
              <alarmo-sensor-badge
                .hass=${this.hass}
                .entity=${t}
              >
              </alarmo-sensor-badge>
            </div>`))}
          </div>
        </div>`:V``}calcSupportedStates(){var t;if(!this.hass||!this._config)return[];const e=this.hass.states[null===(t=this._config)||void 0===t?void 0:t.entity].attributes.supported_features||0;let s=[];return 2&e&&s.push("arm_away"),1&e&&s.push("arm_home"),4&e&&s.push("arm_night"),16&e&&s.push("arm_custom_bypass"),s}_handlePadClick(t){const e=t.currentTarget.value;this._hideInvalidInput(),this._input="clear"===e?"":this._input+e}_handleActionClick(t,e){var s;t.target.blur(),this._hideInvalidInput(!1),this.hass.callService("alarm_control_panel","alarm_"+e,{entity_id:this._config.entity,code:this._input}),(null===(s=this.hass)||void 0===s?void 0:s.user.is_admin)||(window.clearTimeout(this.timer),this.timer=window.setTimeout(()=>{this._handleTimeout()},600)),this.warning=""}_handleTimeout(){if(!this.hass||!this._config)return;this.hass.states[this._config.entity].attributes.open_sensors?(this.warning="blocking_sensors",this._input=""):this._showInvalidInput()}_showInvalidInput(){var t;const e=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector("#code_input");e&&(e.classList.remove("error"),e.classList.add("error"),e.invalid=!0)}_hideInvalidInput(t=!0){var e;const s=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector("#code_input");s&&s.classList.contains("error")&&(s.classList.remove("error"),s.invalid=!1,t&&(this._input=""))}static get styles(){return st`
      ha-card {
        padding-bottom: 16px;
        position: relative;
        height: 100%;
        box-sizing: border-box;
      }
      .header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin: 0px auto;
        padding: 20px 0px;
        box-sizing: border-box;
      }
      .header .icon {
        display: flex;
        padding-right: 20px;
      }
      .header .summary {
        display: flex;
        flex-direction: column;
      }
      .header .name {
        font-size: 24px;
        display: flex;
      }
      .header .state {
        font-size: 14px;
        display: flex;
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
        margin-left: calc(50% - 150px/2);
      }
      paper-input.error {
        animation: shake 0.2s ease-in-out 0s 2;
      }
      #keypad {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin: auto;
        width: 100%;
      }
      #keypad mwc-button {
        padding: 8px;
        width: 30%;
        box-sizing: border-box;
      }
      @keyframes shake {
        0% { margin-left: calc(50% - 150px/2); }
        25% { margin-left: calc(50% - 150px/2 + 10px); }
        75% { margin-left: calc(50% - 150px/2 - 10px); }
        100% { margin-left: calc(50% - 150px/2); }
      }
      div.message {
        border-radius: 4px;
        width: 90%;
        margin: 0px auto 20px;
        box-sizing: border-box;
        border: 1px solid var(--label-badge-red);
        display: flex;
        flex-direction: column;
        position: relative;
      }
      div.message .description {
        padding: 5px 5px 0px 5px;
        margin: -15px auto 0px;
        color: var(--label-badge-red);
        font-weight: 500;
      }
      div.message .description span {
        background: white;
        padding-right: 5px;
      }
      div.message .description ha-icon {
        --mdc-icon-size: 24px;
        margin: 0px 0px 0px 0px;
      }
      div.message .content {
        display: flex;
        padding: 5px;
        justify-content: space-around;
        align-items: center;
        flex: 1;
        flex-direction: row;
        flex-wrap: wrap;
        color: var(--primary-text-color);
      }
      div.message .content .badge {
        width: 64px;
        margin: 5px 0px;
        justify-content: center;
        align-items: center;
      }
    `}},e([G({attribute:!1})],t.AlarmoCard.prototype,"hass",void 0),e([X()],t.AlarmoCard.prototype,"_config",void 0),e([X()],t.AlarmoCard.prototype,"_input",void 0),e([X()],t.AlarmoCard.prototype,"warning",void 0),t.AlarmoCard=e([Z("alarmo-card")],t.AlarmoCard),window.customCards=window.customCards||[],window.customCards.push({type:"alarmo-card",name:"Alarmo Card",description:"Card for operating Alarmo through Lovelace."}),console.info("%c  ALARMO-CARD  \n%c  Version: "+"v1.5.6".padEnd(7," "),"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray")}({});
