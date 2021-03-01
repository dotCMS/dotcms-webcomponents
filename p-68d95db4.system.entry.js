System.register(["./p-79716aa9.system.js","./p-3e0a44f2.system.js","./p-526ef7ac.system.js"],(function(e){"use strict";var t,i,n,l,r,s,o,a,f,u,p;return{setters:[function(e){t=e.r;i=e.c;n=e.h;l=e.H;r=e.g},function(e){s=e.D},function(e){o=e.h;a=e.j;f=e.i;u=e.l;p=e.k}],execute:function(){var h="dot-binary-file-preview{display:-ms-flexbox;display:flex}dot-binary-file-preview img,dot-binary-file-preview .dot-file-preview__extension{width:100px;height:100px}dot-binary-file-preview .dot-file-preview__info{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-item-align:end;align-self:flex-end;padding-left:0.5rem}dot-binary-file-preview .dot-file-preview__info span{margin-bottom:1rem;word-break:break-all}dot-binary-file-preview .dot-file-preview__info button{-ms-flex-item-align:start;align-self:flex-start;background-color:lightgray;border:0;padding:0.3rem 1.5rem;cursor:pointer}dot-binary-file-preview .dot-file-preview__extension{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;background-color:lightgray}dot-binary-file-preview .dot-file-preview__extension span{overflow:hidden;padding:0.5rem;text-overflow:ellipsis;font-size:2rem}";var d=e("dot_binary_file_preview",function(){function e(e){t(this,e);this.delete=i(this,"delete",7);this.fileName="";this.previewUrl="";this.deleteLabel="Delete"}e.prototype.render=function(){var e=this;return this.fileName?n(l,null,this.getPreviewElement(),n("div",{class:"dot-file-preview__info"},n("span",{class:"dot-file-preview__name"},this.fileName),n("button",{type:"button",onClick:function(){return e.clearFile()}},this.deleteLabel))):null};e.prototype.clearFile=function(){this.delete.emit();this.fileName=null;this.previewUrl=null};e.prototype.getPreviewElement=function(){return this.previewUrl?n("img",{alt:this.fileName,src:this.previewUrl}):n("div",{class:"dot-file-preview__extension"},n("span",null,this.getExtention()))};e.prototype.getExtention=function(){return this.fileName.substr(this.fileName.lastIndexOf("."))};Object.defineProperty(e.prototype,"el",{get:function(){return r(this)},enumerable:false,configurable:true});return e}());d.style=h;var c="";var y=e("dot_binary_text_field",function(){function e(e){t(this,e);this.fileChange=i(this,"fileChange",7);this.lostFocus=i(this,"lostFocus",7);this.value=null;this.hint="";this.placeholder="";this.required=false;this.disabled=false}e.prototype.render=function(){var e=this;return n(l,null,n("input",{type:"text","aria-describedby":o(this.hint),class:a(this.isValid()),disabled:this.disabled,placeholder:this.placeholder,value:this.value,onBlur:function(){return e.lostFocus.emit()},onKeyDown:function(t){return e.keyDownHandler(t)},onPaste:function(t){return e.pasteHandler(t)}}))};e.prototype.keyDownHandler=function(e){if(e.key==="Backspace"){this.handleBackspace()}else if(this.shouldPreventEvent(e)){e.preventDefault()}};e.prototype.shouldPreventEvent=function(e){return!(e.ctrlKey||e.metaKey)};e.prototype.handleBackspace=function(){this.value="";this.emitFile(null,this.required?s.REQUIRED:null)};e.prototype.pasteHandler=function(e){e.preventDefault();this.value="";var t=e.clipboardData;if(t.items.length){if(this.isPastingFile(t)){this.handleFilePaste(t.items)}else{var i=t.items[0];this.handleURLPaste(i)}}};e.prototype.handleFilePaste=function(e){var t=e[1].getAsFile();if(f(t.name,t.type,this.accept)){this.value=t;this.emitFile(t)}else{this.emitFile(null,s.INVALID)}};e.prototype.handleURLPaste=function(e){var t=this;e.getAsString((function(e){if(u(e)){t.value=e;t.emitFile(e)}else{t.emitFile(null,s.URLINVALID)}}))};e.prototype.isPastingFile=function(e){return!!e.files.length};e.prototype.isValid=function(){return!(this.required&&!!this.value)};e.prototype.emitFile=function(e,t){this.fileChange.emit({file:e,errorType:t})};Object.defineProperty(e.prototype,"el",{get:function(){return r(this)},enumerable:false,configurable:true});return e}());y.style=c;var m="";var v=e("dot_binary_upload_button",function(){function e(e){t(this,e);this.fileChange=i(this,"fileChange",7);this.name="";this.required=false;this.disabled=false;this.buttonLabel=""}e.prototype.componentDidLoad=function(){this.fileInput=this.el.querySelector("dot-label input")};e.prototype.render=function(){var e=this;return n(l,null,n("input",{accept:this.accept,disabled:this.disabled,id:p(this.name),onChange:function(t){return e.fileChangeHandler(t)},required:this.required||null,type:"file"}),n("button",{type:"button",disabled:this.disabled,onClick:function(){e.fileInput.click()}},this.buttonLabel))};e.prototype.fileChangeHandler=function(e){var t=this.fileInput.files[0];if(f(t.name,t.type,this.accept)){this.emitFile(t)}else{e.preventDefault();this.emitFile(null,s.INVALID)}};e.prototype.emitFile=function(e,t){this.fileChange.emit({file:e,errorType:t})};Object.defineProperty(e.prototype,"el",{get:function(){return r(this)},enumerable:false,configurable:true});return e}());v.style=m}}}));