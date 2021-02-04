import { Component, Prop, Event, h } from '@stencil/core';
export class KeyValueTableComponent {
    constructor() {
        /** (optional) Items to render in the list of key value */
        this.items = [];
        /** (optional) Disables all form interaction */
        this.disabled = false;
        /** (optional) Label for the delete button in each item list */
        this.buttonLabel = 'Delete';
        /** (optional) Message to show when the list of items is empty */
        this.emptyMessage = 'No values';
    }
    render() {
        return (h("table", null,
            h("tbody", null, this.renderRows(this.items))));
    }
    onDelete(index) {
        this.delete.emit(index);
    }
    getRow(item, index) {
        const label = `${this.buttonLabel} ${item.key}, ${item.value}`;
        return (h("tr", null,
            h("td", null,
                h("button", { "aria-label": label, disabled: this.disabled || null, onClick: () => this.onDelete(index), class: "dot-key-value__delete-button" }, this.buttonLabel)),
            h("td", null, item.key),
            h("td", null, item.value)));
    }
    renderRows(items) {
        return this.isValidItems(items)
            ? items.map((item, index) => this.getRow(item, index))
            : this.getEmptyRow();
    }
    getEmptyRow() {
        return (h("tr", null,
            h("td", null, this.emptyMessage)));
    }
    isValidItems(items) {
        return Array.isArray(items) && !!items.length;
    }
    static get is() { return "key-value-table"; }
    static get properties() { return {
        "items": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "DotKeyValueField[]",
                "resolved": "DotKeyValueField[]",
                "references": {
                    "DotKeyValueField": {
                        "location": "import",
                        "path": "../../../../../models"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "(optional) Items to render in the list of key value"
            },
            "defaultValue": "[]"
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
                "text": "(optional) Disables all form interaction"
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
                "text": "(optional) Label for the delete button in each item list"
            },
            "attribute": "button-label",
            "reflect": true,
            "defaultValue": "'Delete'"
        },
        "emptyMessage": {
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
                "text": "(optional) Message to show when the list of items is empty"
            },
            "attribute": "empty-message",
            "reflect": true,
            "defaultValue": "'No values'"
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
                "text": "Emit the index of the item deleted from the list"
            },
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            }
        }]; }
}
