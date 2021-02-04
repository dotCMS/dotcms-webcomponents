import { Component, Element, Event, Listen, Method, Prop, State, Watch, Host, h } from '@stencil/core';
import { DotBinaryMessageError } from '../../../models';
import { checkProp, getClassNames, getOriginalStatus, getTagError, getTagHint, isFileAllowed, nextTick, updateStatus } from '../../../utils';
import { getDotAttributesFromElement, setDotAttributesToElement } from '../dot-form/utils';
/**
 * Represent a dotcms binary file control.
 *
 * @export
 * @class DotBinaryFile
 */
export class DotBinaryFileComponent {
    constructor() {
        /** Name that will be used as ID */
        this.name = '';
        /** (optional) Text to be rendered next to input field */
        this.label = '';
        /** (optional) Placeholder specifies a short hint that describes the expected value of the input field */
        this.placeholder = 'Drop or paste a file or url';
        /** (optional) Hint text that suggest a clue of the field */
        this.hint = '';
        /** (optional) Determine if it is mandatory */
        this.required = false;
        /** (optional) Text that be shown when required is set and condition not met */
        this.requiredMessage = 'This field is required';
        /** (optional) Text that be shown when the Regular Expression condition not met */
        this.validationMessage = "The field doesn't comply with the specified format";
        /** (optional) Text that be shown when the URL is not valid */
        this.URLValidationMessage = 'The specified URL is not valid';
        /** (optional) Disables field's interaction */
        this.disabled = false;
        /** (optional) Describes a type of file that may be selected by the user, separated by comma  eg: .pdf,.jpg  */
        this.accept = '';
        /** (optional) Set the max file size limit  */
        this.maxFileLength = '';
        /** (optional) Text that be shown in the browse file button */
        this.buttonLabel = 'Browse';
        /** (optional) Text that be shown in the browse file button */
        this.errorMessage = '';
        /** (optional) Name of the file uploaded */
        this.previewImageName = '';
        /** (optional) URL of the file uploaded */
        this.previewImageUrl = '';
        this.file = null;
        this.allowedFileTypes = [];
        this.errorMessageMap = new Map();
    }
    /**
     * Reset properties of the field, clear value and emit events.
     */
    async reset() {
        this.file = '';
        this.binaryTextField.value = '';
        this.errorMessage = '';
        this.clearPreviewData();
        this.status = getOriginalStatus(this.isValid());
        this.emitStatusChange();
        this.emitValueChange();
    }
    /**
     * Clear value of selected file, when the endpoint fails.
     */
    async clearValue() {
        this.binaryTextField.value = '';
        this.errorType = this.required ? DotBinaryMessageError.REQUIRED : null;
        this.setValue();
        this.clearPreviewData();
    }
    componentWillLoad() {
        this.setErrorMessageMap();
        this.validateProps();
        this.status = getOriginalStatus(this.isValid());
        this.emitStatusChange();
    }
    componentDidLoad() {
        // this will be null if the component loads with a value
        this.binaryTextField = this.el.querySelector('dot-binary-text-field');
        const attrException = ['dottype'];
        const uploadButtonElement = this.el.querySelector('input[type="file"]');
        setTimeout(() => {
            const attrs = getDotAttributesFromElement(Array.from(this.el.attributes), attrException);
            setDotAttributesToElement(uploadButtonElement, attrs);
        }, 0);
    }
    requiredMessageWatch() {
        this.errorMessageMap.set(DotBinaryMessageError.REQUIRED, this.requiredMessage);
    }
    validationMessageWatch() {
        this.errorMessageMap.set(DotBinaryMessageError.INVALID, this.validationMessage);
    }
    URLValidationMessageWatch() {
        this.errorMessageMap.set(DotBinaryMessageError.URLINVALID, this.URLValidationMessage);
    }
    optionsWatch() {
        this.accept = checkProp(this, 'accept');
        let arr;
        if (this.accept) {
            arr = this.accept.split(',');
            if (arr.length === 0) {
                arr = [this.accept];
            }
        }
        this.allowedFileTypes = arr ? arr.map((fileType) => fileType.trim()) : [];
    }
    fileChangeHandler(event) {
        event.stopImmediatePropagation();
        const fileEvent = event.detail;
        this.errorType = fileEvent.errorType;
        this.setValue(fileEvent.file);
        if (this.isBinaryUploadButtonEvent(event.target) && fileEvent.file) {
            this.binaryTextField.value = fileEvent.file.name;
        }
    }
    HandleDragover(evt) {
        evt.preventDefault();
        if (!this.disabled) {
            this.el.classList.add('dot-dragover');
            this.el.classList.remove('dot-dropped');
        }
    }
    HandleDragleave(evt) {
        evt.preventDefault();
        this.el.classList.remove('dot-dragover');
        this.el.classList.remove('dot-dropped');
    }
    HandleDrop(evt) {
        evt.preventDefault();
        this.el.classList.remove('dot-dragover');
        if (!this.disabled && !this.previewImageName) {
            this.el.classList.add('dot-dropped');
            this.errorType = null;
            const droppedFile = evt.dataTransfer.files[0];
            this.handleDroppedFile(droppedFile);
        }
    }
    handleDelete(evt) {
        evt.preventDefault();
        this.clearPreviewData();
        /*
            this.binaryTextField could be null if the component loads with a value.
            So we have to wait for `clearPreviewData` happen to bring the <dot-binary-text-field>
            to the DOM so we can get it.
        */
        nextTick(() => {
            if (!this.binaryTextField) {
                this.binaryTextField = this.el.querySelector('dot-binary-text-field');
                console.log(this.binaryTextField);
            }
            this.setValue();
        });
    }
    render() {
        const classes = getClassNames(this.status, this.isValid(), this.required);
        return (h(Host, { class: Object.assign({}, classes) },
            h("dot-label", { label: this.label, required: this.required, name: this.name, tabindex: "0" }, this.previewImageName ? (h("dot-binary-file-preview", { onClick: (e) => {
                    e.preventDefault();
                }, fileName: this.previewImageName, previewUrl: this.previewImageUrl })) : (h("div", { class: "dot-binary__container" },
                h("dot-binary-text-field", { placeholder: this.placeholder, required: this.required, disabled: this.disabled, accept: this.allowedFileTypes.join(','), hint: this.hint, onLostFocus: this.lostFocusEventHandler.bind(this) }),
                h("dot-binary-upload-button", { name: this.name, accept: this.allowedFileTypes.join(','), disabled: this.disabled, required: this.required, buttonLabel: this.buttonLabel })))),
            getTagHint(this.hint),
            getTagError(this.shouldShowErrorMessage(), this.getErrorMessage()),
            h("dot-error-message", null, this.errorMessage)));
    }
    lostFocusEventHandler() {
        if (!this.status.dotTouched) {
            this.status = updateStatus(this.status, {
                dotTouched: true
            });
            this.emitStatusChange();
        }
    }
    isBinaryUploadButtonEvent(element) {
        return element.localName === 'dot-binary-upload-button';
    }
    validateProps() {
        this.optionsWatch();
        this.setPlaceHolder();
    }
    shouldShowErrorMessage() {
        return this.getErrorMessage() && !this.status.dotPristine;
    }
    getErrorMessage() {
        return this.errorMessageMap.get(this.errorType);
    }
    isValid() {
        return !(this.required && !this.file);
    }
    setErrorMessageMap() {
        this.requiredMessageWatch();
        this.validationMessageWatch();
        this.URLValidationMessageWatch();
    }
    setValue(data = null) {
        try {
            this.file = data;
            this.status = updateStatus(this.status, {
                dotTouched: true,
                dotPristine: false,
                dotValid: this.isValid()
            });
            this.binaryTextField.value = data === null ? '' : this.binaryTextField.value;
        }
        catch (error) {
            console.warn(error);
        }
        this.emitValueChange();
        this.emitStatusChange();
    }
    emitStatusChange() {
        this.dotStatusChange.emit({
            name: this.name,
            status: this.status
        });
    }
    emitValueChange() {
        this.dotValueChange.emit({
            name: this.name,
            value: this.file
        });
    }
    handleDroppedFile(file) {
        if (isFileAllowed(file.name, file.type, this.allowedFileTypes.join(','))) {
            this.setValue(file);
            this.binaryTextField.value = file.name;
        }
        else {
            this.errorType = DotBinaryMessageError.INVALID;
            this.setValue();
        }
    }
    setPlaceHolder() {
        const DEFAULT_WINDOWS = 'Drop a file or url';
        this.placeholder = this.isWindowsOS() ? DEFAULT_WINDOWS : this.placeholder;
    }
    isWindowsOS() {
        return window.navigator.platform.includes('Win');
    }
    clearPreviewData() {
        this.previewImageUrl = '';
        this.previewImageName = '';
    }
    static get is() { return "dot-binary-file"; }
    static get originalStyleUrls() { return {
        "$": ["dot-binary-file.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dot-binary-file.css"]
    }; }
    static get properties() { return {
        "name": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Name that will be used as ID"
            },
            "attribute": "name",
            "reflect": true,
            "defaultValue": "''"
        },
        "label": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "(optional) Text to be rendered next to input field"
            },
            "attribute": "label",
            "reflect": true,
            "defaultValue": "''"
        },
        "placeholder": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "(optional) Placeholder specifies a short hint that describes the expected value of the input field"
            },
            "attribute": "placeholder",
            "reflect": true,
            "defaultValue": "'Drop or paste a file or url'"
        },
        "hint": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "(optional) Hint text that suggest a clue of the field"
            },
            "attribute": "hint",
            "reflect": true,
            "defaultValue": "''"
        },
        "required": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "(optional) Determine if it is mandatory"
            },
            "attribute": "required",
            "reflect": true,
            "defaultValue": "false"
        },
        "requiredMessage": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "(optional) Text that be shown when required is set and condition not met"
            },
            "attribute": "required-message",
            "reflect": false,
            "defaultValue": "'This field is required'"
        },
        "validationMessage": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "(optional) Text that be shown when the Regular Expression condition not met"
            },
            "attribute": "validation-message",
            "reflect": false,
            "defaultValue": "\"The field doesn't comply with the specified format\""
        },
        "URLValidationMessage": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "(optional) Text that be shown when the URL is not valid"
            },
            "attribute": "u-r-l-validation-message",
            "reflect": false,
            "defaultValue": "'The specified URL is not valid'"
        },
        "disabled": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "(optional) Disables field's interaction"
            },
            "attribute": "disabled",
            "reflect": true,
            "defaultValue": "false"
        },
        "accept": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "(optional) Describes a type of file that may be selected by the user, separated by comma  eg: .pdf,.jpg"
            },
            "attribute": "accept",
            "reflect": true,
            "defaultValue": "''"
        },
        "maxFileLength": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "(optional) Set the max file size limit"
            },
            "attribute": "max-file-length",
            "reflect": true,
            "defaultValue": "''"
        },
        "buttonLabel": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "(optional) Text that be shown in the browse file button"
            },
            "attribute": "button-label",
            "reflect": true,
            "defaultValue": "'Browse'"
        },
        "errorMessage": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "(optional) Text that be shown in the browse file button"
            },
            "attribute": "error-message",
            "reflect": true,
            "defaultValue": "''"
        },
        "previewImageName": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "(optional) Name of the file uploaded"
            },
            "attribute": "preview-image-name",
            "reflect": true,
            "defaultValue": "''"
        },
        "previewImageUrl": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "(optional) URL of the file uploaded"
            },
            "attribute": "preview-image-url",
            "reflect": true,
            "defaultValue": "''"
        }
    }; }
    static get states() { return {
        "status": {}
    }; }
    static get events() { return [{
            "method": "dotValueChange",
            "name": "dotValueChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "DotFieldValueEvent",
                "resolved": "DotFieldValueEvent",
                "references": {
                    "DotFieldValueEvent": {
                        "location": "import",
                        "path": "../../../models"
                    }
                }
            }
        }, {
            "method": "dotStatusChange",
            "name": "dotStatusChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "DotFieldStatusEvent",
                "resolved": "DotFieldStatusEvent",
                "references": {
                    "DotFieldStatusEvent": {
                        "location": "import",
                        "path": "../../../models"
                    }
                }
            }
        }]; }
    static get methods() { return {
        "reset": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Reset properties of the field, clear value and emit events.",
                "tags": []
            }
        },
        "clearValue": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Clear value of selected file, when the endpoint fails.",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "requiredMessage",
            "methodName": "requiredMessageWatch"
        }, {
            "propName": "validationMessage",
            "methodName": "validationMessageWatch"
        }, {
            "propName": "URLValidationMessage",
            "methodName": "URLValidationMessageWatch"
        }, {
            "propName": "accept",
            "methodName": "optionsWatch"
        }]; }
    static get listeners() { return [{
            "name": "fileChange",
            "method": "fileChangeHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "dragover",
            "method": "HandleDragover",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "dragleave",
            "method": "HandleDragleave",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "drop",
            "method": "HandleDrop",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "delete",
            "method": "handleDelete",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
