import { Component, Prop, h } from '@stencil/core';
import { getLabelId } from '../../../utils';
/**
 * Represent a dotcms label control.
 *
 * @export
 * @class DotLabelComponent
 */
export class DotLabelComponent {
    constructor() {
        /** (optional) Field name */
        this.name = '';
        /** (optional) Text to be rendered */
        this.label = '';
        /** (optional) Determine if it is mandatory */
        this.required = false;
    }
    render() {
        return (h("label", { class: "dot-label", id: getLabelId(this.name) },
            this.label && h("span", { class: "dot-label__text" },
                this.label,
                this.required ? h("span", { class: "dot-label__required-mark" }, "*") : null),
            h("slot", null)));
    }
    static get is() { return "dot-label"; }
    static get originalStyleUrls() { return {
        "$": ["dot-label.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dot-label.css"]
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
                "text": "(optional) Field name"
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
                "text": "(optional) Text to be rendered"
            },
            "attribute": "label",
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
        }
    }; }
}
