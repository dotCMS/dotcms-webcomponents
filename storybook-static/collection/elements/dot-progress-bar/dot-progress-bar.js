import { Component, h, Host, Prop } from '@stencil/core';
/**
 * Represent a dotCMS DotProgressBar control.
 *
 * @export
 * @class DotProgressBar
 */
export class DotProgressBar {
    constructor() {
        /** text to be show bellow the progress bar*/
        this.text = 'Uploading Files...';
        /** indicates the progress to be show, a value 1 to 100 */
        this.progress = 0;
    }
    render() {
        return (h(Host, null,
            h("div", { style: { '--progress-width': this.progress.toString() } }),
            h("span", null, this.text)));
    }
    static get is() { return "dot-progress-bar"; }
    static get originalStyleUrls() { return {
        "$": ["dot-progress-bar.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dot-progress-bar.css"]
    }; }
    static get properties() { return {
        "text": {
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
                "text": "text to be show bellow the progress bar"
            },
            "attribute": "text",
            "reflect": false,
            "defaultValue": "'Uploading Files...'"
        },
        "progress": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "indicates the progress to be show, a value 1 to 100"
            },
            "attribute": "progress",
            "reflect": false,
            "defaultValue": "0"
        }
    }; }
}
