import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-ea58b93f.js';
import { D as DotBinaryMessageError } from './dot-binary-message-error.model-e9112718.js';
import { h as getHintId, j as getErrorClass, i as isFileAllowed, l as isValidURL, k as getId } from './utils-4c5e19e6.js';

const dotBinaryFilePreviewCss = "dot-binary-file-preview{display:-ms-flexbox;display:flex}dot-binary-file-preview img,dot-binary-file-preview .dot-file-preview__extension{width:100px;height:100px}dot-binary-file-preview .dot-file-preview__info{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-item-align:end;align-self:flex-end;padding-left:0.5rem}dot-binary-file-preview .dot-file-preview__info span{margin-bottom:1rem;word-break:break-all}dot-binary-file-preview .dot-file-preview__info button{-ms-flex-item-align:start;align-self:flex-start;background-color:lightgray;border:0;padding:0.3rem 1.5rem;cursor:pointer}dot-binary-file-preview .dot-file-preview__extension{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;background-color:lightgray}dot-binary-file-preview .dot-file-preview__extension span{overflow:hidden;padding:0.5rem;text-overflow:ellipsis;font-size:2rem}";

const DotBinaryFilePreviewComponent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.delete = createEvent(this, "delete", 7);
        /** file name to be displayed */
        this.fileName = '';
        /** (optional) file URL to be displayed */
        this.previewUrl = '';
        /** (optional) Delete button's label */
        this.deleteLabel = 'Delete';
    }
    render() {
        return this.fileName ? (h(Host, null, this.getPreviewElement(), h("div", { class: "dot-file-preview__info" }, h("span", { class: "dot-file-preview__name" }, this.fileName), h("button", { type: "button", onClick: () => this.clearFile() }, this.deleteLabel)))) : null;
    }
    clearFile() {
        this.delete.emit();
        this.fileName = null;
        this.previewUrl = null;
    }
    getPreviewElement() {
        return this.previewUrl ? (h("img", { alt: this.fileName, src: this.previewUrl })) : (h("div", { class: "dot-file-preview__extension" }, h("span", null, this.getExtention())));
    }
    getExtention() {
        return this.fileName.substr(this.fileName.lastIndexOf('.'));
    }
    get el() { return getElement(this); }
};
DotBinaryFilePreviewComponent.style = dotBinaryFilePreviewCss;

const dotBinaryTextFieldCss = "";

const DotBinaryTextFieldComponent = class {
    constructor(hostRef) {
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
    render() {
        return (h(Host, null, h("input", { type: "text", "aria-describedby": getHintId(this.hint), class: getErrorClass(this.isValid()), disabled: this.disabled, placeholder: this.placeholder, value: this.value, onBlur: () => this.lostFocus.emit(), onKeyDown: (event) => this.keyDownHandler(event), onPaste: (event) => this.pasteHandler(event) })));
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
        this.emitFile(null, this.required ? DotBinaryMessageError.REQUIRED : null);
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
        if (isFileAllowed(clipBoardFile.name, clipBoardFile.type, this.accept)) {
            this.value = clipBoardFile;
            this.emitFile(clipBoardFile);
        }
        else {
            this.emitFile(null, DotBinaryMessageError.INVALID);
        }
    }
    handleURLPaste(clipBoardFileName) {
        clipBoardFileName.getAsString((fileURL) => {
            if (isValidURL(fileURL)) {
                this.value = fileURL;
                this.emitFile(fileURL);
            }
            else {
                this.emitFile(null, DotBinaryMessageError.URLINVALID);
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
    get el() { return getElement(this); }
};
DotBinaryTextFieldComponent.style = dotBinaryTextFieldCss;

const dotBinaryUploadButtonCss = "";

const DotBinaryUploadButtonComponent = class {
    constructor(hostRef) {
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
    componentDidLoad() {
        this.fileInput = this.el.querySelector('dot-label input');
    }
    render() {
        return (h(Host, null, h("input", { accept: this.accept, disabled: this.disabled, id: getId(this.name), onChange: (event) => this.fileChangeHandler(event), required: this.required || null, type: "file" }), h("button", { type: "button", disabled: this.disabled, onClick: () => {
                this.fileInput.click();
            } }, this.buttonLabel)));
    }
    fileChangeHandler(event) {
        const file = this.fileInput.files[0];
        if (isFileAllowed(file.name, file.type, this.accept)) {
            this.emitFile(file);
        }
        else {
            event.preventDefault();
            this.emitFile(null, DotBinaryMessageError.INVALID);
        }
    }
    emitFile(file, errorType) {
        this.fileChange.emit({
            file: file,
            errorType: errorType
        });
    }
    get el() { return getElement(this); }
};
DotBinaryUploadButtonComponent.style = dotBinaryUploadButtonCss;

export { DotBinaryFilePreviewComponent as dot_binary_file_preview, DotBinaryTextFieldComponent as dot_binary_text_field, DotBinaryUploadButtonComponent as dot_binary_upload_button };
