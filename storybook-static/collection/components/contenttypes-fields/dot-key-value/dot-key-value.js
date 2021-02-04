import { Component, Prop, State, Element, Event, Method, Listen, Watch, h, Host } from '@stencil/core';
import { checkProp, getClassNames, getDotOptionsFromFieldValue, getOriginalStatus, getStringFromDotKeyArray, getTagError, getTagHint, updateStatus, getHintId } from '../../../utils';
const mapToKeyValue = ({ label, value }) => {
    return {
        key: label,
        value
    };
};
export class DotKeyValueComponent {
    constructor() {
        /** Value of the field */
        this.value = '';
        /** Name that will be used as ID */
        this.name = '';
        /** (optional) Text to be rendered next to input field */
        this.label = '';
        /** (optional) Hint text that suggest a clue of the field */
        this.hint = '';
        /** (optional) Determine if it is mandatory */
        this.required = false;
        /** (optional) Text that will be shown when required is set and condition is not met */
        this.requiredMessage = 'This field is required';
        /** (optional) Disables field's interaction */
        this.disabled = false;
        this.items = [];
    }
    valueWatch() {
        this.value = checkProp(this, 'value', 'string');
        this.items = getDotOptionsFromFieldValue(this.value).map(mapToKeyValue);
    }
    /**
     * Reset properties of the field, clear value and emit events.
     */
    async reset() {
        this.items = [];
        this.value = '';
        this.status = getOriginalStatus(this.isValid());
        this.emitChanges();
    }
    deleteItemHandler(event) {
        event.stopImmediatePropagation();
        this.items = this.items.filter((_item, index) => index !== event.detail);
        this.refreshStatus();
        this.emitChanges();
    }
    addItemHandler({ detail }) {
        this.items = [...this.items, detail];
        this.refreshStatus();
        this.emitChanges();
    }
    componentWillLoad() {
        this.validateProps();
        this.setOriginalStatus();
        this.emitStatusChange();
    }
    render() {
        const classes = getClassNames(this.status, this.isValid(), this.required);
        return (h(Host, { class: Object.assign({}, classes) },
            h("dot-label", { "aria-describedby": getHintId(this.hint), tabIndex: this.hint ? 0 : null, label: this.label, required: this.required, name: this.name },
                h("key-value-form", { onLostFocus: this.blurHandler.bind(this), "add-button-label": this.formAddButtonLabel, disabled: this.isDisabled(), "key-label": this.formKeyLabel, "key-placeholder": this.formKeyPlaceholder, "value-label": this.formValueLabel, "value-placeholder": this.formValuePlaceholder }),
                h("key-value-table", { onClick: (e) => {
                        e.preventDefault();
                    }, "button-label": this.listDeleteLabel, disabled: this.isDisabled(), items: this.items })),
            getTagHint(this.hint),
            getTagError(this.showErrorMessage(), this.getErrorMessage())));
    }
    isDisabled() {
        return this.disabled || null;
    }
    blurHandler() {
        if (!this.status.dotTouched) {
            this.status = updateStatus(this.status, {
                dotTouched: true
            });
            this.emitStatusChange();
        }
    }
    validateProps() {
        this.valueWatch();
    }
    setOriginalStatus() {
        this.status = getOriginalStatus(this.isValid());
    }
    isValid() {
        return !(this.required && !this.items.length);
    }
    showErrorMessage() {
        return this.getErrorMessage() && !this.status.dotPristine;
    }
    getErrorMessage() {
        return this.isValid() ? '' : this.requiredMessage;
    }
    refreshStatus() {
        this.status = updateStatus(this.status, {
            dotTouched: true,
            dotPristine: false,
            dotValid: this.isValid()
        });
    }
    emitStatusChange() {
        this.dotStatusChange.emit({
            name: this.name,
            status: this.status
        });
    }
    emitValueChange() {
        const returnedValue = getStringFromDotKeyArray(this.items);
        this.dotValueChange.emit({
            name: this.name,
            value: returnedValue
        });
    }
    emitChanges() {
        this.emitStatusChange();
        this.emitValueChange();
    }
    static get is() { return "dot-key-value"; }
    static get originalStyleUrls() { return {
        "$": ["dot-key-value.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dot-key-value.css"]
    }; }
    static get properties() { return {
        "value": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Value of the field"
            },
            "attribute": "value",
            "reflect": true,
            "defaultValue": "''"
        },
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
                "text": "Name that will be used as ID"
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
                "text": "(optional) Text to be rendered next to input field"
            },
            "attribute": "label",
            "reflect": true,
            "defaultValue": "''"
        },
        "hint": {
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
                "text": "(optional) Hint text that suggest a clue of the field"
            },
            "attribute": "hint",
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
        },
        "requiredMessage": {
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
                "text": "(optional) Text that will be shown when required is set and condition is not met"
            },
            "attribute": "required-message",
            "reflect": true,
            "defaultValue": "'This field is required'"
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
                "text": "(optional) Disables field's interaction"
            },
            "attribute": "disabled",
            "reflect": true,
            "defaultValue": "false"
        },
        "formKeyPlaceholder": {
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
                "text": "(optional) Placeholder for the key input text in the <key-value-form>"
            },
            "attribute": "form-key-placeholder",
            "reflect": true
        },
        "formValuePlaceholder": {
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
                "text": "(optional) Placeholder for the value input text in the <key-value-form>"
            },
            "attribute": "form-value-placeholder",
            "reflect": true
        },
        "formKeyLabel": {
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
                "text": "(optional) The string to use in the key label in the <key-value-form>"
            },
            "attribute": "form-key-label",
            "reflect": true
        },
        "formValueLabel": {
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
                "text": "(optional) The string to use in the value label in the <key-value-form>"
            },
            "attribute": "form-value-label",
            "reflect": true
        },
        "formAddButtonLabel": {
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
                "text": "(optional) Label for the add button in the <key-value-form>"
            },
            "attribute": "form-add-button-label",
            "reflect": true
        },
        "listDeleteLabel": {
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
                "text": "(optional) The string to use in the delete button of a key/value item"
            },
            "attribute": "list-delete-label",
            "reflect": true
        }
    }; }
    static get states() { return {
        "status": {},
        "items": {}
    }; }
    static get events() { return [{
            "method": "dotValueChange",
            "name": "dotValueChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "DotFieldValueEvent",
                "resolved": "DotFieldValueEvent",
                "references": {
                    "DotFieldValueEvent": {
                        "location": "import",
                        "path": "../../../models"
                    }
                }
            }
        }, {
            "method": "dotStatusChange",
            "name": "dotStatusChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "DotFieldStatusEvent",
                "resolved": "DotFieldStatusEvent",
                "references": {
                    "DotFieldStatusEvent": {
                        "location": "import",
                        "path": "../../../models"
                    }
                }
            }
        }]; }
    static get methods() { return {
        "reset": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Reset properties of the field, clear value and emit events.",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "value",
            "methodName": "valueWatch"
        }]; }
    static get listeners() { return [{
            "name": "delete",
            "method": "deleteItemHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "add",
            "method": "addItemHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
