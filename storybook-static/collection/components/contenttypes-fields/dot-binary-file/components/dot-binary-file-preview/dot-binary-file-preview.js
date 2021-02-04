import { Component, Element, Event, Prop, Host, h } from '@stencil/core';
/**
 * Represent a dotcms text field for the binary file preview.
 *
 * @export
 * @class DotBinaryFilePreviewComponent
 */
export class DotBinaryFilePreviewComponent {
    constructor() {
        /** file name to be displayed */
        this.fileName = '';
        /** (optional) file URL to be displayed */
        this.previewUrl = '';
        /** (optional) Delete button's label */
        this.deleteLabel = 'Delete';
    }
    render() {
        return this.fileName ? (h(Host, null,
            this.getPreviewElement(),
            h("div", { class: "dot-file-preview__info" },
                h("span", { class: "dot-file-preview__name" }, this.fileName),
                h("button", { type: "button", onClick: () => this.clearFile() }, this.deleteLabel)))) : null;
    }
    clearFile() {
        this.delete.emit();
        this.fileName = null;
        this.previewUrl = null;
    }
    getPreviewElement() {
        return this.previewUrl ? (h("img", { alt: this.fileName, src: this.previewUrl })) : (h("div", { class: "dot-file-preview__extension" },
            h("span", null, this.getExtention())));
    }
    getExtention() {
        return this.fileName.substr(this.fileName.lastIndexOf('.'));
    }
    static get is() { return "dot-binary-file-preview"; }
    static get originalStyleUrls() { return {
        "$": ["dot-binary-file-preview.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dot-binary-file-preview.css"]
    }; }
    static get properties() { return {
        "fileName": {
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
                "text": "file name to be displayed"
            },
            "attribute": "file-name",
            "reflect": true,
            "defaultValue": "''"
        },
        "previewUrl": {
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
                "text": "(optional) file URL to be displayed"
            },
            "attribute": "preview-url",
            "reflect": true,
            "defaultValue": "''"
        },
        "deleteLabel": {
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
                "text": "(optional) Delete button's label"
            },
            "attribute": "delete-label",
            "reflect": true,
            "defaultValue": "'Delete'"
        }
    }; }
    static get events() { return [{
            "method": "delete",
            "name": "delete",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emit when the file is deleted"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "el"; }
}
