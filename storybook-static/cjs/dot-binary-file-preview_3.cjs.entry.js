'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-674736da.js');
const dotBinaryMessageError_model = require('./dot-binary-message-error.model-6322b419.js');
const utils = require('./utils-e42aadb4.js');

const dotBinaryFilePreviewCss = "dot-binary-file-preview{display:-ms-flexbox;display:flex}dot-binary-file-preview img,dot-binary-file-preview .dot-file-preview__extension{width:100px;height:100px}dot-binary-file-preview .dot-file-preview__info{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-item-align:end;align-self:flex-end;padding-left:0.5rem}dot-binary-file-preview .dot-file-preview__info span{margin-bottom:1rem;word-break:break-all}dot-binary-file-preview .dot-file-preview__info button{-ms-flex-item-align:start;align-self:flex-start;background-color:lightgray;border:0;padding:0.3rem 1.5rem;cursor:pointer}dot-binary-file-preview .dot-file-preview__extension{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;background-color:lightgray}dot-binary-file-preview .dot-file-preview__extension span{overflow:hidden;padding:0.5rem;text-overflow:ellipsis;font-size:2rem}";

const DotBinaryFilePreviewComponent = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.delete = index.createEvent(this, "delete", 7);
        /** file name to be displayed */
        this.fileName = '';
        /** (optional) file URL to be displayed */
        this.previewUrl = '';
        /** (optional) Delete button's label */
        this.deleteLabel = 'Delete';
    }
    render() {
        return this.fileName ? (index.h(index.Host, null, this.getPreviewElement(), index.h("div", { class: "dot-file-preview__info" }, index.h("span", { class: "dot-file-preview__name" }, this.fileName), index.h("button", { type: "button", onClick: () => this.clearFile() }, this.deleteLabel)))) : null;
    }
    clearFile() {
        this.delete.emit();
        this.fileName = null;
        this.previewUrl = null;
    }
    getPreviewElement() {
        return this.previewUrl ? (index.h("img", { alt: this.fileName, src: this.previewUrl })) : (index.h("div", { class: "dot-file-preview__extension" }, index.h("span", null, this.getExtention())));
    }
    getExtention() {
        return this.fileName.substr(this.fileName.lastIndexOf('.'));
    }
    get el() { return index.getElement(this); }
};
DotBinaryFilePreviewComponent.style = dotBinaryFilePreviewCss;

const dotBinaryTextFieldCss = "";

const DotBinaryTextFieldComponent = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.fileChange = index.createEvent(this, "fileChange", 7);
        this.lostFocus = index.createEvent(this, "lostFocus", 7);
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
    render() {
        return (index.h(index.Host, null, index.h("input", { type: "text", "aria-describedby": utils.getHintId(this.hint), class: utils.getErrorClass(this.isValid()), disabled: this.disabled, placeholder: this.placeholder, value: this.value, onBlur: () => this.lostFocus.emit(), onKeyDown: (event) => this.keyDownHandler(event), onPaste: (event) => this.pasteHandler(event) })));
    }
    keyDownHandler(evt) {
        if (evt.key === 'Backspace') {
            this.handleBackspace();
        }
        else if (this.shouldPreventEvent(evt)) {
            evt.preventDefault();
        }
    }
    shouldPreventEvent(evt) {
        return !(evt.ctrlKey || evt.metaKey);
    }
    handleBackspace() {
        this.value = '';
        this.emitFile(null, this.required ? dotBinaryMessageError_model.DotBinaryMessageError.REQUIRED : null);
    }
    // only supported in macOS.
    pasteHandler(event) {
        event.preventDefault();
        this.value = '';
        const clipboardData = event.clipboardData;
        if (clipboardData.items.length) {
            if (this.isPastingFile(clipboardData)) {
                this.handleFilePaste(clipboardData.items);
            }
            else {
                const clipBoardFileName = clipboardData.items[0];
                this.handleURLPaste(clipBoardFileName);
            }
        }
    }
    handleFilePaste(items) {
        const clipBoardFile = items[1].getAsFile();
        if (utils.isFileAllowed(clipBoardFile.name, clipBoardFile.type, this.accept)) {
            this.value = clipBoardFile;
            this.emitFile(clipBoardFile);
        }
        else {
            this.emitFile(null, dotBinaryMessageError_model.DotBinaryMessageError.INVALID);
        }
    }
    handleURLPaste(clipBoardFileName) {
        clipBoardFileName.getAsString((fileURL) => {
            if (utils.isValidURL(fileURL)) {
                this.value = fileURL;
                this.emitFile(fileURL);
            }
            else {
                this.emitFile(null, dotBinaryMessageError_model.DotBinaryMessageError.URLINVALID);
            }
        });
    }
    isPastingFile(data) {
        return !!data.files.length;
    }
    isValid() {
        return !(this.required && !!this.value);
    }
    emitFile(file, errorType) {
        this.fileChange.emit({
            file: file,
            errorType: errorType
        });
    }
    get el() { return index.getElement(this); }
};
DotBinaryTextFieldComponent.style = dotBinaryTextFieldCss;

const dotBinaryUploadButtonCss = "";

const DotBinaryUploadButtonComponent = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.fileChange = index.createEvent(this, "fileChange", 7);
        /** Name that will be used as ID */
        this.name = '';
        /** (optional) Determine if it is mandatory */
        this.required = false;
        /** (optional) Disables field's interaction */
        this.disabled = false;
        /** (optional) Text that be shown in the browse file button */
        this.buttonLabel = '';
    }
    componentDidLoad() {
        this.fileInput = this.el.querySelector('dot-label input');
    }
    render() {
        return (index.h(index.Host, null, index.h("input", { accept: this.accept, disabled: this.disabled, id: utils.getId(this.name), onChange: (event) => this.fileChangeHandler(event), required: this.required || null, type: "file" }), index.h("button", { type: "button", disabled: this.disabled, onClick: () => {
                this.fileInput.click();
            } }, this.buttonLabel)));
    }
    fileChangeHandler(event) {
        const file = this.fileInput.files[0];
        if (utils.isFileAllowed(file.name, file.type, this.accept)) {
            this.emitFile(file);
        }
        else {
            event.preventDefault();
            this.emitFile(null, dotBinaryMessageError_model.DotBinaryMessageError.INVALID);
        }
    }
    emitFile(file, errorType) {
        this.fileChange.emit({
            file: file,
            errorType: errorType
        });
    }
    get el() { return index.getElement(this); }
};
DotBinaryUploadButtonComponent.style = dotBinaryUploadButtonCss;

exports.dot_binary_file_preview = DotBinaryFilePreviewComponent;
exports.dot_binary_text_field = DotBinaryTextFieldComponent;
exports.dot_binary_upload_button = DotBinaryUploadButtonComponent;
