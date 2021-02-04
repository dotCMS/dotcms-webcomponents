import { Component, Prop, Element, Event, h, Host } from '@stencil/core';
export class DotChipComponent {
    constructor() {
        /** Chip's label */
        this.label = '';
        /** (optional) Delete button's label */
        this.deleteLabel = 'Delete';
        /** (optional) If is true disabled the delete button */
        this.disabled = false;
    }
    render() {
        const label = this.label ? `${this.deleteLabel} ${this.label}` : null;
        return (h(Host, null,
            h("span", null, this.label),
            h("button", { type: "button", "aria-label": label, disabled: this.disabled, onClick: () => this.remove.emit(this.label) }, this.deleteLabel)));
    }
    static get is() { return "dot-chip"; }
    static get originalStyleUrls() { return {
        "$": ["dot-chip.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dot-chip.css"]
    }; }
    static get properties() { return {
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
                "text": "Chip's label"
            },
            "attribute": "label",
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
                "text": "(optional) If is true disabled the delete button"
            },
            "attribute": "disabled",
            "reflect": true,
            "defaultValue": "false"
        }
    }; }
    static get events() { return [{
            "method": "remove",
            "name": "remove",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "String",
                "resolved": "String",
                "references": {
                    "String": {
                        "location": "global"
                    }
                }
            }
        }]; }
    static get elementRef() { return "el"; }
}
