import { Component, Prop, h, Host, Event } from '@stencil/core';
import '@material/mwc-icon-button';
export class DotSelectButton {
    constructor() {
        this.value = '';
        this.options = [];
    }
    render() {
        return (h(Host, null, this.options.map((option) => {
            const active = option.label.toLocaleLowerCase() === this.value.toLocaleLowerCase();
            return (h("mwc-icon-button", { class: {
                    active
                }, icon: option.icon, label: option.label, disabled: option.disabled, onClick: () => {
                    this.setSelected(option);
                } }));
        })));
    }
    setSelected(option) {
        this.value = option.label;
        this.selected.emit(option.label.toLocaleLowerCase());
    }
    static get is() { return "dot-select-button"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["dot-select-button.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dot-select-button.css"]
    }; }
    static get properties() { return {
        "value": {
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
            "attribute": "value",
            "reflect": true,
            "defaultValue": "''"
        },
        "options": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "DotSelectButtonOption[]",
                "resolved": "DotSelectButtonOption[]",
                "references": {
                    "DotSelectButtonOption": {
                        "location": "import",
                        "path": "../../models/dotSelectButtonOption"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "defaultValue": "[]"
        }
    }; }
    static get events() { return [{
            "method": "selected",
            "name": "selected",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            }
        }]; }
}
