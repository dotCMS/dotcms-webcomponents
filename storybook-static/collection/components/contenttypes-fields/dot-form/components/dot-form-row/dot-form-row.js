import { Component, Prop, h } from '@stencil/core';
export class DotFormRowComponent {
    render() {
        return this.row.columns.map((fieldColumn) => {
            return h("dot-form-column", { column: fieldColumn, "fields-to-show": this.fieldsToShow });
        });
    }
    static get is() { return "dot-form-row"; }
    static get originalStyleUrls() { return {
        "$": ["dot-form-row.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dot-form-row.css"]
    }; }
    static get properties() { return {
        "row": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "DotCMSContentTypeLayoutRow",
                "resolved": "DotCMSContentTypeLayoutRow",
                "references": {
                    "DotCMSContentTypeLayoutRow": {
                        "location": "import",
                        "path": "dotcms-models"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Fields metada to be rendered"
            }
        },
        "fieldsToShow": {
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
                "text": "(optional) List of fields (variableName) separated by comma, to be shown"
            },
            "attribute": "fields-to-show",
            "reflect": true
        }
    }; }
}
