import { Component, h, Host, Prop } from '@stencil/core';
export class DotBadge {
    constructor() {
        this.bgColor = null;
        this.color = null;
        this.size = null;
        this.bordered = false;
    }
    render() {
        return (h(Host, { style: {
                '--bg-color': this.bgColor,
                '--color': this.color,
                '--font-size': this.size
            } },
            h("div", { class: this.bordered ? 'bordered' : null },
                h("slot", null))));
    }
    static get is() { return "dot-badge"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["dot-badge.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dot-badge.css"]
    }; }
    static get properties() { return {
        "bgColor": {
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
                "text": ""
            },
            "attribute": "bg-color",
            "reflect": false,
            "defaultValue": "null"
        },
        "color": {
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
                "text": ""
            },
            "attribute": "color",
            "reflect": false,
            "defaultValue": "null"
        },
        "size": {
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
                "text": ""
            },
            "attribute": "size",
            "reflect": false,
            "defaultValue": "null"
        },
        "bordered": {
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
                "text": ""
            },
            "attribute": "bordered",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
}
