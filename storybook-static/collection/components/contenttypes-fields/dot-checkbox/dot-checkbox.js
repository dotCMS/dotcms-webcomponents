import { Component, Prop, State, Element, Method, Event, Watch, Host, h } from '@stencil/core';
import { getClassNames, getOriginalStatus, getTagHint, getTagError, getErrorClass, getDotOptionsFromFieldValue, updateStatus, checkProp, getId, getHintId } from '../../../utils';
import { getDotAttributesFromElement, setDotAttributesToElement } from '../dot-form/utils';
export class DotCheckboxComponent {
    constructor() {
        /** Name that will be used as ID */
        this.name = '';
        /** (optional) Text to be rendered next to input field */
        this.label = '';
        /** (optional) Hint text that suggest a clue of the field */
        this.hint = '';
        /** Value/Label checkbox options separated by comma, to be formatted as: Value|Label */
        this.options = '';
        /** (optional) Determine if it is mandatory */
        this.required = false;
        /** (optional) Disables field's interaction */
        this.disabled = false;
        /** (optional) Text that will be shown when required is set and condition is not met */
        this.requiredMessage = `This field is required`;
        /** Value set from the checkbox option */
        this.value = '';
    }
    componentWillLoad() {
        this.value = this.value || '';
        this.validateProps();
        this.emitValueChange();
        this.status = getOriginalStatus(this.isValid());
        this.emitStatusChange();
    }
    componentDidLoad() {
        const attrException = ['dottype'];
        const htmlElements = this.el.querySelectorAll('input[type="checkbox"]');
        setTimeout(() => {
            const attrs = getDotAttributesFromElement(Array.from(this.el.attributes), attrException);
            htmlElements.forEach((htmlElement) => {
                setDotAttributesToElement(htmlElement, attrs);
            });
        }, 0);
    }
    optionsWatch() {
        const validOptions = checkProp(this, 'options');
        this._options = getDotOptionsFromFieldValue(validOptions);
    }
    valueWatch() {
        this.value = this.value || '';
    }
    /**
     * Reset properties of the field, clear value and emit events.
     *
     * @memberof DotSelectComponent
     */
    async reset() {
        this.value = '';
        this.status = getOriginalStatus(this.isValid());
        this.emitValueChange();
        this.emitStatusChange();
    }
    render() {
        const classes = getClassNames(this.status, this.isValid(), this.required);
        return (h(Host, { class: Object.assign({}, classes) },
            h("dot-label", { label: this.label, required: this.required, name: this.name },
                h("div", { "aria-describedby": getHintId(this.hint), tabIndex: this.hint ? 0 : null, class: "dot-checkbox__items" }, this._options.map((item) => {
                    const trimmedValue = item.value.trim();
                    return (h("label", null,
                        h("input", { class: getErrorClass(this.isValid()), name: getId(this.name), type: "checkbox", disabled: this.disabled || null, checked: this.value.indexOf(trimmedValue) >= 0 || null, onInput: (event) => this.setValue(event), value: trimmedValue }),
                        item.label));
                }))),
            getTagHint(this.hint),
            getTagError(!this.isValid(), this.requiredMessage)));
    }
    validateProps() {
        this.optionsWatch();
    }
    // Todo: find how to set proper TYPE in TS
    setValue(event) {
        this.value = this.getValueFromCheckInputs(event.target.value.trim(), event.target.checked);
        this.status = updateStatus(this.status, {
            dotTouched: true,
            dotPristine: false,
            dotValid: this.isValid()
        });
        this.emitValueChange();
        this.emitStatusChange();
    }
    getValueFromCheckInputs(value, checked) {
        const valueArray = this.value.trim().length ? this.value.split(',') : [];
        const valuesSet = new Set(valueArray);
        if (checked) {
            valuesSet.add(value);
        }
        else {
            valuesSet.delete(value);
        }
        return Array.from(valuesSet).join(',');
    }
    emitStatusChange() {
        this.dotStatusChange.emit({
            name: this.name,
            status: this.status
        });
    }
    isValid() {
        return this.required ? !!this.value : true;
    }
    emitValueChange() {
        this.dotValueChange.emit({
            name: this.name,
            value: this.value
        });
    }
    static get is() { return "dot-checkbox"; }
    static get originalStyleUrls() { return {
        "$": ["dot-checkbox.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dot-checkbox.css"]
    }; }
    static get properties() { return {
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
        "options": {
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
                "text": "Value/Label checkbox options separated by comma, to be formatted as: Value|Label"
            },
            "attribute": "options",
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
        "disabled": {
            "type": "boolean",
            "mutable": true,
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
            "defaultValue": "`This field is required`"
        },
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
                "text": "Value set from the checkbox option"
            },
            "attribute": "value",
            "reflect": true,
            "defaultValue": "''"
        }
    }; }
    static get states() { return {
        "_options": {},
        "status": {}
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
                "tags": [{
                        "name": "memberof",
                        "text": "DotSelectComponent"
                    }]
            }
        }
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "options",
            "methodName": "optionsWatch"
        }, {
            "propName": "value",
            "methodName": "valueWatch"
        }]; }
}
