var __extends=this&&this.__extends||function(){var e=function(t,r){e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)if(t.hasOwnProperty(r))e[r]=t[r]};return e(t,r)};return function(t,r){e(t,r);function n(){this.constructor=t}t.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}();var __awaiter=this&&this.__awaiter||function(e,t,r,n){function i(e){return e instanceof r?e:new r((function(t){t(e)}))}return new(r||(r=Promise))((function(r,o){function a(e){try{u(n.next(e))}catch(t){o(t)}}function s(e){try{u(n["throw"](e))}catch(t){o(t)}}function u(e){e.done?r(e.value):i(e.value).then(a,s)}u((n=n.apply(e,t||[])).next())}))};var __generator=this&&this.__generator||function(e,t){var r={label:0,sent:function(){if(o[0]&1)throw o[1];return o[1]},trys:[],ops:[]},n,i,o,a;return a={next:s(0),throw:s(1),return:s(2)},typeof Symbol==="function"&&(a[Symbol.iterator]=function(){return this}),a;function s(e){return function(t){return u([e,t])}}function u(a){if(n)throw new TypeError("Generator is already executing.");while(r)try{if(n=1,i&&(o=a[0]&2?i["return"]:a[0]?i["throw"]||((o=i["return"])&&o.call(i),0):i.next)&&!(o=o.call(i,a[1])).done)return o;if(i=0,o)a=[a[0]&2,o.value];switch(a[0]){case 0:case 1:o=a;break;case 4:r.label++;return{value:a[1],done:false};case 5:r.label++;i=a[1];a=[0];continue;case 7:a=r.ops.pop();r.trys.pop();continue;default:if(!(o=r.trys,o=o.length>0&&o[o.length-1])&&(a[0]===6||a[0]===2)){r=0;continue}if(a[0]===3&&(!o||a[1]>o[0]&&a[1]<o[3])){r.label=a[1];break}if(a[0]===6&&r.label<o[1]){r.label=o[1];o=a;break}if(o&&r.label<o[2]){r.label=o[2];r.ops.push(a);break}if(o[2])r.ops.pop();r.trys.pop();continue}a=t.call(e,r)}catch(s){a=[6,s];i=0}finally{n=o=0}if(a[0]&5)throw a[1];return{value:a[0]?a[1]:void 0,done:true}}};var __spreadArrays=this&&this.__spreadArrays||function(){for(var e=0,t=0,r=arguments.length;t<r;t++)e+=arguments[t].length;for(var n=Array(e),i=0,t=0;t<r;t++)for(var o=arguments[t],a=0,s=o.length;a<s;a++,i++)n[i]=o[a];return n};System.register([],(function(e){"use strict";return{execute:function(){e({_:i,a:we,e:r,g:o,i:ge,j:Ce,p:me,q:Se,t:H});
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
            ***************************************************************************** */var t=function(e,r){t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)if(t.hasOwnProperty(r))e[r]=t[r]};return t(e,r)};function r(e,r){t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}var n=e("f",(function(){n=e("f",Object.assign||function e(t){for(var r,n=1,i=arguments.length;n<i;n++){r=arguments[n];for(var o in r)if(Object.prototype.hasOwnProperty.call(r,o))t[o]=r[o]}return t});return n.apply(this,arguments)}));function i(e,t,r,n){var i=arguments.length,o=i<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,r):n,a;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")o=Reflect.decorate(e,t,r,n);else for(var s=e.length-1;s>=0;s--)if(a=e[s])o=(i<3?a(o):i>3?a(t,r,o):a(t,r))||o;return i>3&&o&&Object.defineProperty(t,r,o),o}function o(e){var t=typeof Symbol==="function"&&Symbol.iterator,r=t&&e[t],n=0;if(r)return r.call(e);if(e&&typeof e.length==="number")return{next:function(){if(e&&n>=e.length)e=void 0;return{value:e&&e[n++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}
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
             */var a=typeof window!=="undefined"&&window.customElements!=null&&window.customElements.polyfillWrapFlushCallback!==undefined;var s=function(e,t,r){if(r===void 0){r=null}while(t!==r){var n=t.nextSibling;e.removeChild(t);t=n}};
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
             */var u="{{lit-"+String(Math.random()).slice(2)+"}}";var l="\x3c!--"+u+"--\x3e";var p=new RegExp(u+"|"+l);var f="$lit$";var c=function(){function e(e,t){this.parts=[];this.element=t;var r=[];var n=[];var i=document.createTreeWalker(t.content,133,null,false);var o=0;var a=-1;var s=0;var l=e.strings,c=e.values.length;while(s<c){var d=i.nextNode();if(d===null){i.currentNode=n.pop();continue}a++;if(d.nodeType===1){if(d.hasAttributes()){var _=d.attributes;var m=_.length;var g=0;for(var S=0;S<m;S++){if(h(_[S].name,f)){g++}}while(g-- >0){var w=l[s];var b=y.exec(w)[2];var P=b.toLowerCase()+f;var x=d.getAttribute(P);d.removeAttribute(P);var N=x.split(p);this.parts.push({type:"attribute",index:a,name:b,strings:N});s+=N.length-1}}if(d.tagName==="TEMPLATE"){n.push(d);i.currentNode=d.content}}else if(d.nodeType===3){var C=d.data;if(C.indexOf(u)>=0){var A=d.parentNode;var T=C.split(p);var O=T.length-1;for(var S=0;S<O;S++){var E=void 0;var k=T[S];if(k===""){E=v()}else{var V=y.exec(k);if(V!==null&&h(V[2],f)){k=k.slice(0,V.index)+V[1]+V[2].slice(0,-f.length)+V[3]}E=document.createTextNode(k)}A.insertBefore(E,d);this.parts.push({type:"node",index:++a})}if(T[O]===""){A.insertBefore(v(),d);r.push(d)}else{d.data=T[O]}s+=O}}else if(d.nodeType===8){if(d.data===u){var A=d.parentNode;if(d.previousSibling===null||a===o){a++;A.insertBefore(v(),d)}o=a;this.parts.push({type:"node",index:a});if(d.nextSibling===null){d.data=""}else{r.push(d);a--}s++}else{var S=-1;while((S=d.data.indexOf(u,S+1))!==-1){this.parts.push({type:"node",index:-1});s++}}}}for(var j=0,U=r;j<U.length;j++){var R=U[j];R.parentNode.removeChild(R)}}return e}();var h=function(e,t){var r=e.length-t.length;return r>=0&&e.slice(r)===t};var d=function(e){return e.index!==-1};var v=function(){return document.createComment("")};var y=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
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
             */var _=133;function m(e,t){var r=e.element.content,n=e.parts;var i=document.createTreeWalker(r,_,null,false);var o=S(n);var a=n[o];var s=-1;var u=0;var l=[];var p=null;while(i.nextNode()){s++;var f=i.currentNode;if(f.previousSibling===p){p=null}if(t.has(f)){l.push(f);if(p===null){p=f}}if(p!==null){u++}while(a!==undefined&&a.index===s){a.index=p!==null?-1:a.index-u;o=S(n,o);a=n[o]}}l.forEach((function(e){return e.parentNode.removeChild(e)}))}var g=function(e){var t=e.nodeType===11?0:1;var r=document.createTreeWalker(e,_,null,false);while(r.nextNode()){t++}return t};var S=function(e,t){if(t===void 0){t=-1}for(var r=t+1;r<e.length;r++){var n=e[r];if(d(n)){return r}}return-1};function w(e,t,r){if(r===void 0){r=null}var n=e.element.content,i=e.parts;if(r===null||r===undefined){n.appendChild(t);return}var o=document.createTreeWalker(n,_,null,false);var a=S(i);var s=0;var u=-1;while(o.nextNode()){u++;var l=o.currentNode;if(l===r){s=g(t);r.parentNode.insertBefore(t,r)}while(a!==-1&&i[a].index===u){if(s>0){while(a!==-1){i[a].index+=s;a=S(i,a)}return}a=S(i,a)}}}
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
             */var b=new WeakMap;var P=e("d",(function(e){return function(){var t=[];for(var r=0;r<arguments.length;r++){t[r]=arguments[r]}var n=e.apply(void 0,t);b.set(n,true);return n}}));var x=function(e){return typeof e==="function"&&b.has(e)};
/**
             * @license
             * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
             * This code may only be used under the BSD style license found at
             * http://polymer.github.io/LICENSE.txt
             * The complete set of authors may be found at
             * http://polymer.github.io/AUTHORS.txt
             * The complete set of contributors may be found at
             * http://polymer.github.io/CONTRIBUTORS.txt
             * Code distributed by Google as part of the polymer project is also
             * subject to an additional IP rights grant found at
             * http://polymer.github.io/PATENTS.txt
             */var N=e("n",{});var C={};
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
             */var A=function(){function e(e,t,r){this.__parts=[];this.template=e;this.processor=t;this.options=r}e.prototype.update=function(e){var t=0;for(var r=0,n=this.__parts;r<n.length;r++){var i=n[r];if(i!==undefined){i.setValue(e[t])}t++}for(var o=0,a=this.__parts;o<a.length;o++){var i=a[o];if(i!==undefined){i.commit()}}};e.prototype._clone=function(){var e;var t=a?this.template.element.content.cloneNode(true):document.importNode(this.template.element.content,true);var r=[];var n=this.template.parts;var i=document.createTreeWalker(t,133,null,false);var o=0;var s=0;var u;var l=i.nextNode();while(o<n.length){u=n[o];if(!d(u)){this.__parts.push(undefined);o++;continue}while(s<u.index){s++;if(l.nodeName==="TEMPLATE"){r.push(l);i.currentNode=l.content}if((l=i.nextNode())===null){i.currentNode=r.pop();l=i.nextNode()}}if(u.type==="node"){var p=this.processor.handleTextExpression(this.options);p.insertAfterNode(l.previousSibling);this.__parts.push(p)}else{(e=this.__parts).push.apply(e,this.processor.handleAttributeExpressions(l,u.name,u.strings,this.options))}o++}if(a){document.adoptNode(t);customElements.upgrade(t)}return t};return e}();
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
             */var T=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:function(e){return e}});var O=" "+u+" ";var E=function(){function e(e,t,r,n){this.strings=e;this.values=t;this.type=r;this.processor=n}e.prototype.getHTML=function(){var e=this.strings.length-1;var t="";var r=false;for(var n=0;n<e;n++){var i=this.strings[n];var o=i.lastIndexOf("\x3c!--");r=(o>-1||r)&&i.indexOf("--\x3e",o+1)===-1;var a=y.exec(i);if(a===null){t+=i+(r?O:l)}else{t+=i.substr(0,a.index)+a[1]+a[2]+f+a[3]+u}}t+=this.strings[e];return t};e.prototype.getTemplateElement=function(){var e=document.createElement("template");var t=this.getHTML();if(T!==undefined){t=T.createHTML(t)}e.innerHTML=t;return e};return e}();
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
             */var k=function(e){return e===null||!(typeof e==="object"||typeof e==="function")};var V=function(e){return Array.isArray(e)||!!(e&&e[Symbol.iterator])};var j=function(){function e(e,t,r){this.dirty=true;this.element=e;this.name=t;this.strings=r;this.parts=[];for(var n=0;n<r.length-1;n++){this.parts[n]=this._createPart()}}e.prototype._createPart=function(){return new U(this)};e.prototype._getValue=function(){var e=this.strings;var t=e.length-1;var r=this.parts;if(t===1&&e[0]===""&&e[1]===""){var n=r[0].value;if(typeof n==="symbol"){return String(n)}if(typeof n==="string"||!V(n)){return n}}var i="";for(var o=0;o<t;o++){i+=e[o];var a=r[o];if(a!==undefined){var n=a.value;if(k(n)||!V(n)){i+=typeof n==="string"?n:String(n)}else{for(var s=0,u=n;s<u.length;s++){var l=u[s];i+=typeof l==="string"?l:String(l)}}}}i+=e[t];return i};e.prototype.commit=function(){if(this.dirty){this.dirty=false;this.element.setAttribute(this.name,this._getValue())}};return e}();var U=function(){function e(e){this.value=undefined;this.committer=e}e.prototype.setValue=function(e){if(e!==N&&(!k(e)||e!==this.value)){this.value=e;if(!x(e)){this.committer.dirty=true}}};e.prototype.commit=function(){while(x(this.value)){var e=this.value;this.value=N;e(this)}if(this.value===N){return}this.committer.commit()};return e}();e("A",U);var R=function(){function e(e){this.value=undefined;this.__pendingValue=undefined;this.options=e}e.prototype.appendInto=function(e){this.startNode=e.appendChild(v());this.endNode=e.appendChild(v())};e.prototype.insertAfterNode=function(e){this.startNode=e;this.endNode=e.nextSibling};e.prototype.appendIntoPart=function(e){e.__insert(this.startNode=v());e.__insert(this.endNode=v())};e.prototype.insertAfterPart=function(e){e.__insert(this.startNode=v());this.endNode=e.endNode;e.endNode=this.startNode};e.prototype.setValue=function(e){this.__pendingValue=e};e.prototype.commit=function(){if(this.startNode.parentNode===null){return}while(x(this.__pendingValue)){var e=this.__pendingValue;this.__pendingValue=N;e(this)}var t=this.__pendingValue;if(t===N){return}if(k(t)){if(t!==this.value){this.__commitText(t)}}else if(t instanceof E){this.__commitTemplateResult(t)}else if(t instanceof Node){this.__commitNode(t)}else if(V(t)){this.__commitIterable(t)}else if(t===C){this.value=C;this.clear()}else{this.__commitText(t)}};e.prototype.__insert=function(e){this.endNode.parentNode.insertBefore(e,this.endNode)};e.prototype.__commitNode=function(e){if(this.value===e){return}this.clear();this.__insert(e);this.value=e};e.prototype.__commitText=function(e){var t=this.startNode.nextSibling;e=e==null?"":e;var r=typeof e==="string"?e:String(e);if(t===this.endNode.previousSibling&&t.nodeType===3){t.data=r}else{this.__commitNode(document.createTextNode(r))}this.value=e};e.prototype.__commitTemplateResult=function(e){var t=this.options.templateFactory(e);if(this.value instanceof A&&this.value.template===t){this.value.update(e.values)}else{var r=new A(t,e.processor,this.options);var n=r._clone();r.update(e.values);this.__commitNode(n);this.value=r}};e.prototype.__commitIterable=function(t){if(!Array.isArray(this.value)){this.value=[];this.clear()}var r=this.value;var n=0;var i;for(var o=0,a=t;o<a.length;o++){var s=a[o];i=r[n];if(i===undefined){i=new e(this.options);r.push(i);if(n===0){i.appendIntoPart(this)}else{i.insertAfterPart(r[n-1])}}i.setValue(s);i.commit();n++}if(n<r.length){r.length=n;this.clear(i&&i.endNode)}};e.prototype.clear=function(e){if(e===void 0){e=this.startNode}s(this.startNode.parentNode,e.nextSibling,this.endNode)};return e}();e("N",R);var M=function(){function e(e,t,r){this.value=undefined;this.__pendingValue=undefined;if(r.length!==2||r[0]!==""||r[1]!==""){throw new Error("Boolean attributes can only contain a single expression")}this.element=e;this.name=t;this.strings=r}e.prototype.setValue=function(e){this.__pendingValue=e};e.prototype.commit=function(){while(x(this.__pendingValue)){var e=this.__pendingValue;this.__pendingValue=N;e(this)}if(this.__pendingValue===N){return}var t=!!this.__pendingValue;if(this.value!==t){if(t){this.element.setAttribute(this.name,"")}else{this.element.removeAttribute(this.name)}this.value=t}this.__pendingValue=N};return e}();var q=function(e){r(t,e);function t(t,r,n){var i=e.call(this,t,r,n)||this;i.single=n.length===2&&n[0]===""&&n[1]==="";return i}t.prototype._createPart=function(){return new I(this)};t.prototype._getValue=function(){if(this.single){return this.parts[0].value}return e.prototype._getValue.call(this)};t.prototype.commit=function(){if(this.dirty){this.dirty=false;this.element[this.name]=this._getValue()}};return t}(j);var I=function(e){r(t,e);function t(){return e!==null&&e.apply(this,arguments)||this}return t}(U);e("P",I);var L=false;(function(){try{var e={get capture(){L=true;return false}};window.addEventListener("test",e,e);window.removeEventListener("test",e,e)}catch(t){}})();var z=function(){function e(e,t,r){var n=this;this.value=undefined;this.__pendingValue=undefined;this.element=e;this.eventName=t;this.eventContext=r;this.__boundHandleEvent=function(e){return n.handleEvent(e)}}e.prototype.setValue=function(e){this.__pendingValue=e};e.prototype.commit=function(){while(x(this.__pendingValue)){var e=this.__pendingValue;this.__pendingValue=N;e(this)}if(this.__pendingValue===N){return}var t=this.__pendingValue;var r=this.value;var n=t==null||r!=null&&(t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive);var i=t!=null&&(r==null||n);if(n){this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options)}if(i){this.__options=F(t);this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)}this.value=t;this.__pendingValue=N};e.prototype.handleEvent=function(e){if(typeof this.value==="function"){this.value.call(this.eventContext||this.element,e)}else{this.value.handleEvent(e)}};return e}();var F=function(e){return e&&(L?{capture:e.capture,passive:e.passive,once:e.once}:e.capture)};
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
             */function H(e){var t=B.get(e.type);if(t===undefined){t={stringsArray:new WeakMap,keyString:new Map};B.set(e.type,t)}var r=t.stringsArray.get(e.strings);if(r!==undefined){return r}var n=e.strings.join(u);r=t.keyString.get(n);if(r===undefined){r=new c(e,e.getTemplateElement());t.keyString.set(n,r)}t.stringsArray.set(e.strings,r);return r}var B=new Map;
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
             */var W=new WeakMap;var D=function(e,t,r){var n=W.get(t);if(n===undefined){s(t,t.firstChild);W.set(t,n=new R(Object.assign({templateFactory:H},r)));n.appendInto(t)}n.setValue(e);n.commit()};
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
             */var J=function(){function e(){}e.prototype.handleAttributeExpressions=function(e,t,r,n){var i=t[0];if(i==="."){var o=new q(e,t.slice(1),r);return o.parts}if(i==="@"){return[new z(e,t.slice(1),n.eventContext)]}if(i==="?"){return[new M(e,t.slice(1),r)]}var a=new j(e,t,r);return a.parts};e.prototype.handleTextExpression=function(e){return new R(e)};return e}();var $=new J;
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
             */if(typeof window!=="undefined"){(window["litHtmlVersions"]||(window["litHtmlVersions"]=[])).push("1.3.0")}var G=e("h",(function(e){var t=[];for(var r=1;r<arguments.length;r++){t[r-1]=arguments[r]}return new E(e,t,"html",$)}));
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
             */var K=function(e,t){return e+"--"+t};var Q=true;if(typeof window.ShadyCSS==="undefined"){Q=false}else if(typeof window.ShadyCSS.prepareTemplateDom==="undefined"){console.warn("Incompatible ShadyCSS version detected. "+"Please update to at least @webcomponents/webcomponentsjs@2.0.2 and "+"@webcomponents/shadycss@1.3.1.");Q=false}var X=function(e){return function(t){var r=K(t.type,e);var n=B.get(r);if(n===undefined){n={stringsArray:new WeakMap,keyString:new Map};B.set(r,n)}var i=n.stringsArray.get(t.strings);if(i!==undefined){return i}var o=t.strings.join(u);i=n.keyString.get(o);if(i===undefined){var a=t.getTemplateElement();if(Q){window.ShadyCSS.prepareTemplateDom(a,e)}i=new c(t,a);n.keyString.set(o,i)}n.stringsArray.set(t.strings,i);return i}};var Y=["html","svg"];var Z=function(e){Y.forEach((function(t){var r=B.get(K(t,e));if(r!==undefined){r.keyString.forEach((function(e){var t=e.element.content;var r=new Set;Array.from(t.querySelectorAll("style")).forEach((function(e){r.add(e)}));m(e,r)}))}}))};var ee=new Set;var te=function(e,t,r){ee.add(e);var n=!!r?r.element:document.createElement("template");var i=t.querySelectorAll("style");var o=i.length;if(o===0){window.ShadyCSS.prepareTemplateStyles(n,e);return}var a=document.createElement("style");for(var s=0;s<o;s++){var u=i[s];u.parentNode.removeChild(u);a.textContent+=u.textContent}Z(e);var l=n.content;if(!!r){w(r,a,l.firstChild)}else{l.insertBefore(a,l.firstChild)}window.ShadyCSS.prepareTemplateStyles(n,e);var p=l.querySelector("style");if(window.ShadyCSS.nativeShadow&&p!==null){t.insertBefore(p.cloneNode(true),t.firstChild)}else if(!!r){l.insertBefore(a,l.firstChild);var f=new Set;f.add(a);m(r,f)}};var re=function(e,t,r){if(!r||typeof r!=="object"||!r.scopeName){throw new Error("The `scopeName` option is required.")}var n=r.scopeName;var i=W.has(t);var o=Q&&t.nodeType===11&&!!t.host;var a=o&&!ee.has(n);var u=a?document.createDocumentFragment():t;D(e,u,Object.assign({templateFactory:X(n)},r));if(a){var l=W.get(u);W.delete(u);var p=l.value instanceof A?l.value.template:undefined;te(n,u,p);s(t,t.firstChild);t.appendChild(u);W.set(t,l)}if(!i&&o){window.ShadyCSS.styleElement(t.host)}};
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
             */var ne;window.JSCompiler_renameProperty=function(e,t){return e};var ie={toAttribute:function(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return e==null?e:JSON.stringify(e)}return e},fromAttribute:function(e,t){switch(t){case Boolean:return e!==null;case Number:return e===null?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}};var oe=function(e,t){return t!==e&&(t===t||e===e)};var ae={attribute:true,type:String,converter:ie,reflect:false,hasChanged:oe};var se=1;var ue=1<<2;var le=1<<3;var pe=1<<4;var fe="finalized";var ce=function(e){r(t,e);function t(){var t=e.call(this)||this;t.initialize();return t}Object.defineProperty(t,"observedAttributes",{get:function(){var e=this;this.finalize();var t=[];this._classProperties.forEach((function(r,n){var i=e._attributeNameForProperty(n,r);if(i!==undefined){e._attributeToPropertyMap.set(i,n);t.push(i)}}));return t},enumerable:false,configurable:true});t._ensureClassProperties=function(){var e=this;if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;var t=Object.getPrototypeOf(this)._classProperties;if(t!==undefined){t.forEach((function(t,r){return e._classProperties.set(r,t)}))}}};t.createProperty=function(e,t){if(t===void 0){t=ae}this._ensureClassProperties();this._classProperties.set(e,t);if(t.noAccessor||this.prototype.hasOwnProperty(e)){return}var r=typeof e==="symbol"?Symbol():"__"+e;var n=this.getPropertyDescriptor(e,r,t);if(n!==undefined){Object.defineProperty(this.prototype,e,n)}};t.getPropertyDescriptor=function(e,t,r){return{get:function(){return this[t]},set:function(n){var i=this[e];this[t]=n;this.requestUpdateInternal(e,i,r)},configurable:true,enumerable:true}};t.getPropertyOptions=function(e){return this._classProperties&&this._classProperties.get(e)||ae};t.finalize=function(){var e=Object.getPrototypeOf(this);if(!e.hasOwnProperty(fe)){e.finalize()}this[fe]=true;this._ensureClassProperties();this._attributeToPropertyMap=new Map;if(this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){var t=this.properties;var r=__spreadArrays(Object.getOwnPropertyNames(t),typeof Object.getOwnPropertySymbols==="function"?Object.getOwnPropertySymbols(t):[]);for(var n=0,i=r;n<i.length;n++){var o=i[n];this.createProperty(o,t[o])}}};t._attributeNameForProperty=function(e,t){var r=t.attribute;return r===false?undefined:typeof r==="string"?r:typeof e==="string"?e.toLowerCase():undefined};t._valueHasChanged=function(e,t,r){if(r===void 0){r=oe}return r(e,t)};t._propertyValueFromAttribute=function(e,t){var r=t.type;var n=t.converter||ie;var i=typeof n==="function"?n:n.fromAttribute;return i?i(e,r):e};t._propertyValueToAttribute=function(e,t){if(t.reflect===undefined){return}var r=t.type;var n=t.converter;var i=n&&n.toAttribute||ie.toAttribute;return i(e,r)};t.prototype.initialize=function(){var e=this;this._updateState=0;this._updatePromise=new Promise((function(t){return e._enableUpdatingResolver=t}));this._changedProperties=new Map;this._saveInstanceProperties();this.requestUpdateInternal()};t.prototype._saveInstanceProperties=function(){var e=this;this.constructor._classProperties.forEach((function(t,r){if(e.hasOwnProperty(r)){var n=e[r];delete e[r];if(!e._instanceProperties){e._instanceProperties=new Map}e._instanceProperties.set(r,n)}}))};t.prototype._applyInstanceProperties=function(){var e=this;this._instanceProperties.forEach((function(t,r){return e[r]=t}));this._instanceProperties=undefined};t.prototype.connectedCallback=function(){this.enableUpdating()};t.prototype.enableUpdating=function(){if(this._enableUpdatingResolver!==undefined){this._enableUpdatingResolver();this._enableUpdatingResolver=undefined}};t.prototype.disconnectedCallback=function(){};t.prototype.attributeChangedCallback=function(e,t,r){if(t!==r){this._attributeToProperty(e,r)}};t.prototype._propertyToAttribute=function(e,t,r){if(r===void 0){r=ae}var n=this.constructor;var i=n._attributeNameForProperty(e,r);if(i!==undefined){var o=n._propertyValueToAttribute(t,r);if(o===undefined){return}this._updateState=this._updateState|le;if(o==null){this.removeAttribute(i)}else{this.setAttribute(i,o)}this._updateState=this._updateState&~le}};t.prototype._attributeToProperty=function(e,t){if(this._updateState&le){return}var r=this.constructor;var n=r._attributeToPropertyMap.get(e);if(n!==undefined){var i=r.getPropertyOptions(n);this._updateState=this._updateState|pe;this[n]=r._propertyValueFromAttribute(t,i);this._updateState=this._updateState&~pe}};t.prototype.requestUpdateInternal=function(e,t,r){var n=true;if(e!==undefined){var i=this.constructor;r=r||i.getPropertyOptions(e);if(i._valueHasChanged(this[e],t,r.hasChanged)){if(!this._changedProperties.has(e)){this._changedProperties.set(e,t)}if(r.reflect===true&&!(this._updateState&pe)){if(this._reflectingProperties===undefined){this._reflectingProperties=new Map}this._reflectingProperties.set(e,r)}}else{n=false}}if(!this._hasRequestedUpdate&&n){this._updatePromise=this._enqueueUpdate()}};t.prototype.requestUpdate=function(e,t){this.requestUpdateInternal(e,t);return this.updateComplete};t.prototype._enqueueUpdate=function(){return __awaiter(this,void 0,void 0,(function(){var e,t;return __generator(this,(function(r){switch(r.label){case 0:this._updateState=this._updateState|ue;r.label=1;case 1:r.trys.push([1,3,,4]);return[4,this._updatePromise];case 2:r.sent();return[3,4];case 3:e=r.sent();return[3,4];case 4:t=this.performUpdate();if(!(t!=null))return[3,6];return[4,t];case 5:r.sent();r.label=6;case 6:return[2,!this._hasRequestedUpdate]}}))}))};Object.defineProperty(t.prototype,"_hasRequestedUpdate",{get:function(){return this._updateState&ue},enumerable:false,configurable:true});Object.defineProperty(t.prototype,"hasUpdated",{get:function(){return this._updateState&se},enumerable:false,configurable:true});t.prototype.performUpdate=function(){if(!this._hasRequestedUpdate){return}if(this._instanceProperties){this._applyInstanceProperties()}var e=false;var t=this._changedProperties;try{e=this.shouldUpdate(t);if(e){this.update(t)}else{this._markUpdated()}}catch(r){e=false;this._markUpdated();throw r}if(e){if(!(this._updateState&se)){this._updateState=this._updateState|se;this.firstUpdated(t)}this.updated(t)}};t.prototype._markUpdated=function(){this._changedProperties=new Map;this._updateState=this._updateState&~ue};Object.defineProperty(t.prototype,"updateComplete",{get:function(){return this._getUpdateComplete()},enumerable:false,configurable:true});t.prototype._getUpdateComplete=function(){return this._updatePromise};t.prototype.shouldUpdate=function(e){return true};t.prototype.update=function(e){var t=this;if(this._reflectingProperties!==undefined&&this._reflectingProperties.size>0){this._reflectingProperties.forEach((function(e,r){return t._propertyToAttribute(r,t[r],e)}));this._reflectingProperties=undefined}this._markUpdated()};t.prototype.updated=function(e){};t.prototype.firstUpdated=function(e){};return t}(HTMLElement);ne=fe;ce[ne]=true;
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
             */var he=function(e,t){window.customElements.define(e,t);return t};var de=function(e,t){var r=t.kind,n=t.elements;return{kind:r,elements:n,finisher:function(t){window.customElements.define(e,t)}}};var ve=e("b",(function(e){return function(t){return typeof t==="function"?he(e,t):de(e,t)}}));var ye=function(e,t){if(t.kind==="method"&&t.descriptor&&!("value"in t.descriptor)){return Object.assign(Object.assign({},t),{finisher:function(r){r.createProperty(t.key,e)}})}else{return{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer:function(){if(typeof t.initializer==="function"){this[t.key]=t.initializer.call(this)}},finisher:function(r){r.createProperty(t.key,e)}}}};var _e=function(e,t,r){t.constructor.createProperty(r,e)};function me(e){return function(t,r){return r!==undefined?_e(e,t,r):ye(e,t)}}function ge(e){return me({attribute:false,hasChanged:e===null||e===void 0?void 0:e.hasChanged})}function Se(e,t){return function(r,n){var i={get:function(){return this.renderRoot.querySelector(e)},enumerable:true,configurable:true};if(t){var o=typeof n==="symbol"?Symbol():"__"+n;i.get=function(){if(this[o]===undefined){this[o]=this.renderRoot.querySelector(e)}return this[o]}}return n!==undefined?be(i,r,n):Pe(i,r)}}function we(e){return function(t,r){var n={get:function(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(t){switch(t.label){case 0:return[4,this.updateComplete];case 1:t.sent();return[2,this.renderRoot.querySelector(e)]}}))}))},enumerable:true,configurable:true};return r!==undefined?be(n,t,r):Pe(n,t)}}var be=function(e,t,r){Object.defineProperty(t,r,e)};var Pe=function(e,t){return{kind:"method",placement:"prototype",key:t.key,descriptor:e}};var xe=function(e,t){return Object.assign(Object.assign({},t),{finisher:function(r){Object.assign(r.prototype[t.key],e)}})};var Ne=function(e,t,r){Object.assign(t[r],e)};function Ce(e){return function(t,r){return r!==undefined?Ne(e,t,r):xe(e,t)}}
/**
            @license
            Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
            This code may only be used under the BSD style license found at
            http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
            http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
            found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
            part of the polymer project is also subject to an additional IP rights grant
            found at http://polymer.github.io/PATENTS.txt
            */var Ae=window.ShadowRoot&&(window.ShadyCSS===undefined||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype;var Te=Symbol();var Oe=function(){function e(e,t){if(t!==Te){throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.")}this.cssText=e}Object.defineProperty(e.prototype,"styleSheet",{get:function(){if(this._styleSheet===undefined){if(Ae){this._styleSheet=new CSSStyleSheet;this._styleSheet.replaceSync(this.cssText)}else{this._styleSheet=null}}return this._styleSheet},enumerable:false,configurable:true});e.prototype.toString=function(){return this.cssText};return e}();var Ee=function(e){return new Oe(String(e),Te)};var ke=function(e){if(e instanceof Oe){return e.cssText}else if(typeof e==="number"){return e}else{throw new Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.")}};var Ve=e("c",(function(e){var t=[];for(var r=1;r<arguments.length;r++){t[r-1]=arguments[r]}var n=t.reduce((function(t,r,n){return t+ke(r)+e[n+1]}),e[0]);return new Oe(n,Te)}));
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
             */(window["litElementVersions"]||(window["litElementVersions"]=[])).push("2.4.0");var je={};var Ue=function(e){r(t,e);function t(){return e!==null&&e.apply(this,arguments)||this}t.getStyles=function(){return this.styles};t._getUniqueStyles=function(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this))){return}var e=this.getStyles();if(Array.isArray(e)){var t=function(e,r){return e.reduceRight((function(e,r){return Array.isArray(r)?t(r,e):(e.add(r),e)}),r)};var r=t(e,new Set);var n=[];r.forEach((function(e){return n.unshift(e)}));this._styles=n}else{this._styles=e===undefined?[]:[e]}this._styles=this._styles.map((function(e){if(e instanceof CSSStyleSheet&&!Ae){var t=Array.prototype.slice.call(e.cssRules).reduce((function(e,t){return e+t.cssText}),"");return Ee(t)}return e}))};t.prototype.initialize=function(){e.prototype.initialize.call(this);this.constructor._getUniqueStyles();this.renderRoot=this.createRenderRoot();if(window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot){this.adoptStyles()}};t.prototype.createRenderRoot=function(){return this.attachShadow({mode:"open"})};t.prototype.adoptStyles=function(){var e=this.constructor._styles;if(e.length===0){return}if(window.ShadyCSS!==undefined&&!window.ShadyCSS.nativeShadow){window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map((function(e){return e.cssText})),this.localName)}else if(Ae){this.renderRoot.adoptedStyleSheets=e.map((function(e){return e instanceof CSSStyleSheet?e:e.styleSheet}))}else{this._needsShimAdoptedStyleSheets=true}};t.prototype.connectedCallback=function(){e.prototype.connectedCallback.call(this);if(this.hasUpdated&&window.ShadyCSS!==undefined){window.ShadyCSS.styleElement(this)}};t.prototype.update=function(t){var r=this;var n=this.render();e.prototype.update.call(this,t);if(n!==je){this.constructor.render(n,this.renderRoot,{scopeName:this.localName,eventContext:this})}if(this._needsShimAdoptedStyleSheets){this._needsShimAdoptedStyleSheets=false;this.constructor._styles.forEach((function(e){var t=document.createElement("style");t.textContent=e.cssText;r.renderRoot.appendChild(t)}))}};t.prototype.render=function(){return je};return t}(ce);e("L",Ue);Ue["finalized"]=true;Ue.render=re}}}));