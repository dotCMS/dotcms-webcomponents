import { Component, Element, Event, Prop, State, Host, h } from '@stencil/core';
import { DotBinaryMessageError } from '../../../../../models';
import { getErrorClass, getHintId, isFileAllowed, isValidURL } from '../../../../../utils';
/**
 * Represent a dotcms text field for the binary file element.
 *
 * @export
 * @class DotBinaryFile
 */
export class DotBinaryTextFieldComponent {
    constructor() {
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
        return (h(Host, null,
            h("input", { type: "text", "aria-describedby": getHintId(this.hint), class: getErrorClass(this.isValid()), disabled: this.disabled, placeholder: this.placeholder, value: this.value, onBlur: () => this.lostFocus.emit(), onKeyDown: (event) => this.keyDownHandler(event), onPaste: (event) => this.pasteHandler(event) })));
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
    static get is() { return "dot-binary-text-field"; }
    static get originalStyleUrls() { return {
        "$": ["dot-binary-text-field.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dot-binary-text-field.css"]
    }; }
    static get properties() { return {
        "value": {
            "type": "any",
            "mutable": true,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Value specifies the value of the <input> element"
            },
            "attribute": "value",
            "reflect": true,
            "defaultValue": "null"
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
        "placeholder": {
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
                "text": "(optional) Placeholder specifies a short hint that describes the expected value of the input field"
            },
            "attribute": "placeholder",
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
        "accept": {
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
                "text": "(optional) Describes a type of file that may be selected by the user, separated by comma  eg: .pdf,.jpg"
            },
            "attribute": "accept",
            "reflect": true
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
        }
    }; }
    static get states() { return {
        "status": {}
    }; }
    static get events() { return [{
            "method": "fileChange",
            "name": "fileChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "DotBinaryFileEvent",
                "resolved": "DotBinaryFileEvent",
                "references": {
                    "DotBinaryFileEvent": {
                        "location": "import",
                        "path": "../../../../../models"
                    }
                }
            }
        }, {
            "method": "lostFocus",
            "name": "lostFocus",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "el"; }
}
