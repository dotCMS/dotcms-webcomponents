import { Component, Prop } from '@stencil/core';
import { fieldMap, shouldShowField } from '../../utils';
export class DotFormColumnComponent {
    render() {
        return this.column.fields.map((field) => this.getField(field));
    }
    getField(field) {
        return shouldShowField(field, this.fieldsToShow) ? this.getFieldTag(field) : null;
    }
    getFieldTag(field) {
        return fieldMap[field.fieldType] ? fieldMap[field.fieldType](field) : '';
    }
    static get is() { return "dot-form-column"; }
    static get originalStyleUrls() { return {
        "$": ["dot-form-column.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dot-form-column.css"]
    }; }
    static get properties() { return {
        "column": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "DotCMSContentTypeLayoutColumn",
                "resolved": "DotCMSContentTypeLayoutColumn",
                "references": {
                    "DotCMSContentTypeLayoutColumn": {
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
