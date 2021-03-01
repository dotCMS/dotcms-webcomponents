var __awaiter=this&&this.__awaiter||function(t,e,i,n){function a(t){return t instanceof i?t:new i((function(e){e(t)}))}return new(i||(i=Promise))((function(i,s){function r(t){try{u(n.next(t))}catch(e){s(e)}}function o(t){try{u(n["throw"](t))}catch(e){s(e)}}function u(t){t.done?i(t.value):a(t.value).then(r,o)}u((n=n.apply(t,e||[])).next())}))};var __generator=this&&this.__generator||function(t,e){var i={label:0,sent:function(){if(s[0]&1)throw s[1];return s[1]},trys:[],ops:[]},n,a,s,r;return r={next:o(0),throw:o(1),return:o(2)},typeof Symbol==="function"&&(r[Symbol.iterator]=function(){return this}),r;function o(t){return function(e){return u([t,e])}}function u(r){if(n)throw new TypeError("Generator is already executing.");while(i)try{if(n=1,a&&(s=r[0]&2?a["return"]:r[0]?a["throw"]||((s=a["return"])&&s.call(a),0):a.next)&&!(s=s.call(a,r[1])).done)return s;if(a=0,s)r=[r[0]&2,s.value];switch(r[0]){case 0:case 1:s=r;break;case 4:i.label++;return{value:r[1],done:false};case 5:i.label++;a=r[1];r=[0];continue;case 7:r=i.ops.pop();i.trys.pop();continue;default:if(!(s=i.trys,s=s.length>0&&s[s.length-1])&&(r[0]===6||r[0]===2)){i=0;continue}if(r[0]===3&&(!s||r[1]>s[0]&&r[1]<s[3])){i.label=r[1];break}if(r[0]===6&&i.label<s[1]){i.label=s[1];s=r;break}if(s&&i.label<s[2]){i.label=s[2];i.ops.push(r);break}if(s[2])i.ops.pop();i.trys.pop();continue}r=e.call(t,i)}catch(o){r=[6,o];a=0}finally{n=s=0}if(r[0]&5)throw r[1];return{value:r[0]?r[1]:void 0,done:true}}};System.register(["./p-79716aa9.system.js","./p-526ef7ac.system.js","./p-afaca460.system.js","./p-ede1966e.system.js"],(function(t){"use strict";var e,i,n,a,s,r,o,u,l,h,c,f,d,p,m,y,v;return{setters:[function(t){e=t.r;i=t.c;n=t.h;a=t.H;s=t.g},function(t){r=t.g;o=t.f;u=t.a;l=t.b;h=t.c;c=t.h;f=t.j;d=t.k;p=t.u},function(t){m=t.c},function(t){y=t.g;v=t.s}],execute:function(){var g=".dot-radio__items{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}.dot-radio__items label{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex}.dot-radio__items input{margin:0 0.25rem 0 0}";var b=t("dot_radio",function(){function t(t){e(this,t);this.dotValueChange=i(this,"dotValueChange",7);this.dotStatusChange=i(this,"dotStatusChange",7);this.value="";this.name="";this.label="";this.hint="";this.required=false;this.disabled=false;this.requiredMessage="";this.options=""}t.prototype.reset=function(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(t){this.value="";this.status=r(this.isValid());this.emitStatusChange();this.emitValueChange();return[2]}))}))};t.prototype.componentWillLoad=function(){this.value=this.value||"";this.validateProps();this.status=r(this.isValid());this.emitStatusChange()};t.prototype.componentDidLoad=function(){var t=this;var e=["dottype"];var i=this.el.querySelectorAll('input[type="radio"]');setTimeout((function(){var n=y(Array.from(t.el.attributes),e);i.forEach((function(t){v(t,n)}))}),0)};t.prototype.optionsWatch=function(){var t=m(this,"options");this._options=o(t)};t.prototype.valueWatch=function(){this.value=this.value||""};t.prototype.render=function(){var t=this;var e=u(this.status,this.isValid(),this.required);return n(a,{class:Object.assign({},e)},n("dot-label",{label:this.label,required:this.required,name:this.name},n("div",{class:"dot-radio__items","aria-describedby":c(this.hint),tabIndex:this.hint?0:null,role:"radiogroup"},this._options.map((function(e){e.value=e.value.trim();return n("label",null,n("input",{checked:t.value.indexOf(e.value)>=0||null,class:f(t.isValid()),name:d(t.name),disabled:t.disabled||null,onInput:function(e){return t.setValue(e)},type:"radio",value:e.value}),e.label)})))),h(this.hint),l(this.showErrorMessage(),this.getErrorMessage()))};t.prototype.validateProps=function(){this.optionsWatch()};t.prototype.isValid=function(){return this.required?!!this.value:true};t.prototype.showErrorMessage=function(){return this.getErrorMessage()&&!this.status.dotPristine};t.prototype.getErrorMessage=function(){return this.isValid()?"":this.requiredMessage};t.prototype.setValue=function(t){this.value=t.target.value.trim();this.status=p(this.status,{dotTouched:true,dotPristine:false,dotValid:this.isValid()});this.emitValueChange();this.emitStatusChange()};t.prototype.emitStatusChange=function(){this.dotStatusChange.emit({name:this.name,status:this.status})};t.prototype.emitValueChange=function(){this.dotValueChange.emit({name:this.name,value:this.value})};Object.defineProperty(t.prototype,"el",{get:function(){return s(this)},enumerable:false,configurable:true});Object.defineProperty(t,"watchers",{get:function(){return{options:["optionsWatch"],value:["valueWatch"]}},enumerable:false,configurable:true});return t}());b.style=g}}}));