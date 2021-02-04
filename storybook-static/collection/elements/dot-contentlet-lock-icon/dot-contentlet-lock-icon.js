import { Component, h, Prop, Host } from '@stencil/core';
import '@material/mwc-icon';
export class DotContentletLockIcon {
    constructor() {
        this.size = '16px';
    }
    render() {
        return (h(Host, { style: { '--mdc-icon-size': this.size } },
            h("mwc-icon", null, this.locked ? 'locked' : 'lock_open')));
    }
    static get is() { return "dot-contentlet-lock-icon"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["dot-contentlet-lock-icon.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dot-contentlet-lock-icon.css"]
    }; }
    static get properties() { return {
        "locked": {
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
            "attribute": "locked",
            "reflect": false
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
            "defaultValue": "'16px'"
        }
    }; }
}
