import { Component, h, Prop } from '@stencil/core';
export class DotDataViewButton {
    render() {
        return (h("dot-select-button", { value: this.value, options: [
                { label: 'List', icon: 'format_list_bulleted' },
                { label: 'Card', icon: 'grid_on' }
            ] }));
    }
    static get is() { return "dot-data-view-button"; }
    static get originalStyleUrls() { return {
        "$": ["dot-data-view-button.css"]
    }; }
    static get styleUrls() { return {
        "$": ["dot-data-view-button.css"]
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
            "reflect": false
        }
    }; }
}
