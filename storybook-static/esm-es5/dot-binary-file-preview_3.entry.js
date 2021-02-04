import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-ea58b93f.js';
import { D as DotBinaryMessageError } from './dot-binary-message-error.model-e9112718.js';
import { h as getHintId, j as getErrorClass, i as isFileAllowed, l as isValidURL, k as getId } from './utils-4c5e19e6.js';
var dotBinaryFilePreviewCss = "dot-binary-file-preview{display:-ms-flexbox;display:flex}dot-binary-file-preview img,dot-binary-file-preview .dot-file-preview__extension{width:100px;height:100px}dot-binary-file-preview .dot-file-preview__info{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-item-align:end;align-self:flex-end;padding-left:0.5rem}dot-binary-file-preview .dot-file-preview__info span{margin-bottom:1rem;word-break:break-all}dot-binary-file-preview .dot-file-preview__info button{-ms-flex-item-align:start;align-self:flex-start;background-color:lightgray;border:0;padding:0.3rem 1.5rem;cursor:pointer}dot-binary-file-preview .dot-file-preview__extension{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;background-color:lightgray}dot-binary-file-preview .dot-file-preview__extension span{overflow:hidden;padding:0.5rem;text-overflow:ellipsis;font-size:2rem}";
var DotBinaryFilePreviewComponent = /** @class */ (function () {
    function DotBinaryFilePreviewComponent(hostRef) {
        registerInstance(this, hostRef);
        this.delete = createEvent(this, "delete", 7);
        /** file name to be displayed */
        this.fileName = '';
        /** (optional) file URL to be displayed */
        this.previewUrl = '';
        /** (optional) Delete button's label */
        this.deleteLabel = 'Delete';
    }
    DotBinaryFilePreviewComponent.prototype.render = function () {
        var _this = this;
        return this.fileName ? (h(Host, null, this.getPreviewElement(), h("div", { class: "dot-file-preview__info" }, h("span", { class: "dot-file-preview__name" }, this.fileName), h("button", { type: "button", onClick: function () { return _this.clearFile(); } }, this.deleteLabel)))) : null;
    };
    DotBinaryFilePreviewComponent.prototype.clearFile = function () {
        this.delete.emit();
        this.fileName = null;
        this.previewUrl = null;
    };
    DotBinaryFilePreviewComponent.prototype.getPreviewElement = function () {
        return this.previewUrl ? (h("img", { alt: this.fileName, src: this.previewUrl })) : (h("div", { class: "dot-file-preview__extension" }, h("span", null, this.getExtention())));
    };
    DotBinaryFilePreviewComponent.prototype.getExtention = function () {
        return this.fileName.substr(this.fileName.lastIndexOf('.'));
    };
    Object.defineProperty(DotBinaryFilePreviewComponent.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    return DotBinaryFilePreviewComponent;
}());
DotBinaryFilePreviewComponent.style = dotBinaryFilePreviewCss;
var dotBinaryTextFieldCss = "";
var DotBinaryTextFieldComponent = /** @class */ (function () {
    function DotBinaryTextFieldComponent(hostRef) {
        registerInstance(this, hostRef);
        this.fileChange = createEvent(this, "fileChange", 7);
        this.lostFocus = createEvent(this, "lostFocus", 7);
        /** Value specifies the value of the <input> element */
        this.value = null;
        /** (optional) Hint text that suggest a clue of the field */
        this.hint = '';
        /** (optional) Placeholder specifies a short hint that describes the expected value of the input field */
        this.placeholder = '';
        /** (optional) Determine if it is mandatory */
        this.required = false;
        /** (optional) Disables field's interaction */
        this.disabled = false;
    }
    DotBinaryTextFieldComponent.prototype.render = function () {
        var _this = this;
        return (h(Host, null, h("input", { type: "text", "aria-describedby": getHintId(this.hint), class: getErrorClass(this.isValid()), disabled: this.disabled, placeholder: this.placeholder, value: this.value, onBlur: function () { return _this.lostFocus.emit(); }, onKeyDown: function (event) { return _this.keyDownHandler(event); }, onPaste: function (event) { return _this.pasteHandler(event); } })));
    };
    DotBinaryTextFieldComponent.prototype.keyDownHandler = function (evt) {
        if (evt.key === 'Backspace') {
            this.handleBackspace();
        }
        else if (this.shouldPreventEvent(evt)) {
            evt.preventDefault();
        }
    };
    DotBinaryTextFieldComponent.prototype.shouldPreventEvent = function (evt) {
        return !(evt.ctrlKey || evt.metaKey);
    };
    DotBinaryTextFieldComponent.prototype.handleBackspace = function () {
        this.value = '';
        this.emitFile(null, this.required ? DotBinaryMessageError.REQUIRED : null);
    };
    // only supported in macOS.
    DotBinaryTextFieldComponent.prototype.pasteHandler = function (event) {
        event.preventDefault();
        this.value = '';
        var clipboardData = event.clipboardData;
        if (clipboardData.items.length) {
            if (this.isPastingFile(clipboardData)) {
                this.handleFilePaste(clipboardData.items);
            }
            else {
                var clipBoardFileName = clipboardData.items[0];
                this.handleURLPaste(clipBoardFileName);
            }
        }
    };
    DotBinaryTextFieldComponent.prototype.handleFilePaste = function (items) {
        var clipBoardFile = items[1].getAsFile();
        if (isFileAllowed(clipBoardFile.name, clipBoardFile.type, this.accept)) {
            this.value = clipBoardFile;
            this.emitFile(clipBoardFile);
        }
        else {
            this.emitFile(null, DotBinaryMessageError.INVALID);
        }
    };
    DotBinaryTextFieldComponent.prototype.handleURLPaste = function (clipBoardFileName) {
        var _this = this;
        clipBoardFileName.getAsString(function (fileURL) {
            if (isValidURL(fileURL)) {
                _this.value = fileURL;
                _this.emitFile(fileURL);
            }
            else {
                _this.emitFile(null, DotBinaryMessageError.URLINVALID);
            }
        });
    };
    DotBinaryTextFieldComponent.prototype.isPastingFile = function (data) {
        return !!data.files.length;
    };
    DotBinaryTextFieldComponent.prototype.isValid = function () {
        return !(this.required && !!this.value);
    };
    DotBinaryTextFieldComponent.prototype.emitFile = function (file, errorType) {
        this.fileChange.emit({
            file: file,
            errorType: errorType
        });
    };
    Object.defineProperty(DotBinaryTextFieldComponent.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    return DotBinaryTextFieldComponent;
}());
DotBinaryTextFieldComponent.style = dotBinaryTextFieldCss;
var dotBinaryUploadButtonCss = "";
var DotBinaryUploadButtonComponent = /** @class */ (function () {
    function DotBinaryUploadButtonComponent(hostRef) {
        registerInstance(this, hostRef);
        this.fileChange = createEvent(this, "fileChange", 7);
        /** Name that will be used as ID */
        this.name = '';
        /** (optional) Determine if it is mandatory */
        this.required = false;
        /** (optional) Disables field's interaction */
        this.disabled = false;
        /** (optional) Text that be shown in the browse file button */
        this.buttonLabel = '';
    }
    DotBinaryUploadButtonComponent.prototype.componentDidLoad = function () {
        this.fileInput = this.el.querySelector('dot-label input');
    };
    DotBinaryUploadButtonComponent.prototype.render = function () {
        var _this = this;
        return (h(Host, null, h("input", { accept: this.accept, disabled: this.disabled, id: getId(this.name), onChange: function (event) { return _this.fileChangeHandler(event); }, required: this.required || null, type: "file" }), h("button", { type: "button", disabled: this.disabled, onClick: function () {
                _this.fileInput.click();
            } }, this.buttonLabel)));
    };
    DotBinaryUploadButtonComponent.prototype.fileChangeHandler = function (event) {
        var file = this.fileInput.files[0];
        if (isFileAllowed(file.name, file.type, this.accept)) {
            this.emitFile(file);
        }
        else {
            event.preventDefault();
            this.emitFile(null, DotBinaryMessageError.INVALID);
        }
    };
    DotBinaryUploadButtonComponent.prototype.emitFile = function (file, errorType) {
        this.fileChange.emit({
            file: file,
            errorType: errorType
        });
    };
    Object.defineProperty(DotBinaryUploadButtonComponent.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    return DotBinaryUploadButtonComponent;
}());
DotBinaryUploadButtonComponent.style = dotBinaryUploadButtonCss;
export { DotBinaryFilePreviewComponent as dot_binary_file_preview, DotBinaryTextFieldComponent as dot_binary_text_field, DotBinaryUploadButtonComponent as dot_binary_upload_button };
