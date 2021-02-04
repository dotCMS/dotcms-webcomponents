import { Component, Prop, State, Element, Event, h } from '@stencil/core';
const DEFAULT_VALUE = { key: '', value: '' };
export class DotKeyValueComponent {
    constructor() {
        /** (optional) Disables all form interaction */
        this.disabled = false;
        /** (optional) Label for the add item button */
        this.addButtonLabel = 'Add';
        /** (optional) Placeholder for the key input text */
        this.keyPlaceholder = '';
        /** (optional) Placeholder for the value input text */
        this.valuePlaceholder = '';
        /** (optional) The string to use in the key input label */
        this.keyLabel = 'Key';
        /** (optional) The string to use in the value input label */
        this.valueLabel = 'Value';
        this.inputs = Object.assign({}, DEFAULT_VALUE);
    }
    render() {
        const buttonDisabled = this.isButtonDisabled();
        return (h("form", { onSubmit: this.addKey.bind(this) },
            h("label", null,
                this.keyLabel,
                h("input", { disabled: this.disabled, name: "key", onBlur: (e) => this.lostFocus.emit(e), onInput: (event) => this.setValue(event), placeholder: this.keyPlaceholder, type: "text", value: this.inputs.key })),
            h("label", null,
                this.valueLabel,
                h("input", { disabled: this.disabled, name: "value", onBlur: (e) => this.lostFocus.emit(e), onInput: (event) => this.setValue(event), placeholder: this.valuePlaceholder, type: "text", value: this.inputs.value })),
            h("button", { class: "key-value-form__save__button", type: "submit", disabled: buttonDisabled }, this.addButtonLabel)));
    }
    isButtonDisabled() {
        return !this.isFormValid() || (this.disabled || null);
    }
    isFormValid() {
        return !!(this.inputs.key.length && this.inputs.value.length);
    }
    setValue(event) {
        event.stopImmediatePropagation();
        const target = event.target;
        this.inputs = Object.assign(Object.assign({}, this.inputs), { [target.name]: target.value.toString() });
    }
    addKey(event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        if (this.inputs.key && this.inputs.value) {
            this.add.emit(this.inputs);
            this.clearForm();
            this.focusKeyInputField();
        }
    }
    clearForm() {
        this.inputs = Object.assign({}, DEFAULT_VALUE);
    }
    focusKeyInputField() {
        const input = this.el.querySelector('input[name="key"]');
        input.focus();
    }
    static get is() { return "key-value-form"; }
    static get originalStyleUrls() { return {
        "$": ["key-value-form.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["key-value-form.css"]
    }; }
    static get properties() { return {
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
        "addButtonLabel": {
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
                "text": "(optional) Label for the add item button"
            },
            "attribute": "add-button-label",
            "reflect": true,
            "defaultValue": "'Add'"
        },
        "keyPlaceholder": {
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
                "text": "(optional) Placeholder for the key input text"
            },
            "attribute": "key-placeholder",
            "reflect": true,
            "defaultValue": "''"
        },
        "valuePlaceholder": {
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
                "text": "(optional) Placeholder for the value input text"
            },
            "attribute": "value-placeholder",
            "reflect": true,
            "defaultValue": "''"
        },
        "keyLabel": {
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
                "text": "(optional) The string to use in the key input label"
            },
            "attribute": "key-label",
            "reflect": true,
            "defaultValue": "'Key'"
        },
        "valueLabel": {
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
                "text": "(optional) The string to use in the value input label"
            },
            "attribute": "value-label",
            "reflect": true,
            "defaultValue": "'Value'"
        }
    }; }
    static get states() { return {
        "inputs": {}
    }; }
    static get events() { return [{
            "method": "add",
            "name": "add",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emit the added value, key/value pair"
            },
            "complexType": {
                "original": "DotKeyValueField",
                "resolved": "DotKeyValueField",
                "references": {
                    "DotKeyValueField": {
                        "location": "import",
                        "path": "../../../../../models"
                    }
                }
            }
        }, {
            "method": "lostFocus",
            "name": "lostFocus",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emit when any of the input is blur"
            },
            "complexType": {
                "original": "FocusEvent",
                "resolved": "FocusEvent",
                "references": {
                    "FocusEvent": {
                        "location": "global"
                    }
                }
            }
        }]; }
    static get elementRef() { return "el"; }
}
