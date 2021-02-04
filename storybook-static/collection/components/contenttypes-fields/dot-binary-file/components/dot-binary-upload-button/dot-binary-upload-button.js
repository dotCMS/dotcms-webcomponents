import { Component, Element, Event, Prop, Host, h } from '@stencil/core';
import { DotBinaryMessageError } from '../../../../../models';
import { getId, isFileAllowed } from '../../../../../utils';
/**
 * Represent a dotcms text field for the binary file element.
 *
 * @export
 * @class DotBinaryFile
 */
export class DotBinaryUploadButtonComponent {
    constructor() {
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
        return (h(Host, null,
            h("input", { accept: this.accept, disabled: this.disabled, id: getId(this.name), onChange: (event) => this.fileChangeHandler(event), required: this.required || null, type: "file" }),
            h("button", { type: "button", disabled: this.disabled, onClick: () => {
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
    static get is() { return "dot-binary-upload-button"; }
    static get originalStyleUrls() { return {
        "$": ["dot-binary-upload-button.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dot-binary-upload-button.css"]
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
            "defaultValue": "''"
        }
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
        }]; }
    static get elementRef() { return "el"; }
}
