import { Component, Element, Event, Method, Prop, State, h } from '@stencil/core';
import { getErrorClass, getId, getOriginalStatus, updateStatus } from '../../../utils';
export class DotInputCalendarComponent {
    constructor() {
        /** Value specifies the value of the <input> element */
        this.value = '';
        /** Name that will be used as ID */
        this.name = '';
        /** (optional) Determine if it is mandatory */
        this.required = false;
        /** (optional) Disables field's interaction */
        this.disabled = false;
        /** (optional) Min, minimum value that the field will allow to set, expect a Date Format. */
        this.min = '';
        /** (optional) Max, maximum value that the field will allow to set, expect a Date Format */
        this.max = '';
        /** (optional) Step specifies the legal number intervals for the input field */
        this.step = '1';
        /** type specifies the type of <input> element to display */
        this.type = '';
    }
    /**
     * Reset properties of the field, clear value and emit events.
     */
    async reset() {
        this.value = '';
        this.status = getOriginalStatus(this.isValid());
        this.emitValueChange();
        this.emitStatusChange();
    }
    componentWillLoad() {
        this.status = getOriginalStatus(this.isValid());
        this.emitStatusChange();
    }
    render() {
        return (h("input", { class: getErrorClass(this.status.dotValid), disabled: this.disabled || null, id: getId(this.name), onBlur: () => this.blurHandler(), onInput: (event) => this.setValue(event), required: this.required || null, type: this.type, min: this.min, max: this.max, step: this.step, value: this.value }));
    }
    isValid() {
        return this.isValueInRange() && this.isRequired();
    }
    isRequired() {
        return this.required ? !!this.value : true;
    }
    isValueInRange() {
        return this.isInMaxRange() && this.isInMinRange();
    }
    isInMinRange() {
        return !!this.min ? this.value >= this.min : true;
    }
    isInMaxRange() {
        return !!this.max ? this.value <= this.max : true;
    }
    blurHandler() {
        if (!this.status.dotTouched) {
            this.status = updateStatus(this.status, {
                dotTouched: true
            });
            this.emitStatusChange();
        }
    }
    setValue(event) {
        this.value = event.target.value.toString();
        this.status = updateStatus(this.status, {
            dotTouched: true,
            dotPristine: false,
            dotValid: this.isValid()
        });
        this.emitValueChange();
        this.emitStatusChange();
    }
    emitStatusChange() {
        this._dotStatusChange.emit({
            name: this.name,
            status: this.status,
            isValidRange: this.isValueInRange()
        });
    }
    emitValueChange() {
        this._dotValueChange.emit({
            name: this.name,
            value: this.formattedValue()
        });
    }
    formattedValue() {
        return this.value.length === 5 ? `${this.value}:00` : this.value;
    }
    static get is() { return "dot-input-calendar"; }
    static get originalStyleUrls() { return {
        "$": ["dot-input-calendar.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dot-input-calendar.css"]
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
                "text": "Value specifies the value of the <input> element"
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
        "min": {
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
                "text": "(optional) Min, minimum value that the field will allow to set, expect a Date Format."
            },
            "attribute": "min",
            "reflect": true,
            "defaultValue": "''"
        },
        "max": {
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
                "text": "(optional) Max, maximum value that the field will allow to set, expect a Date Format"
            },
            "attribute": "max",
            "reflect": true,
            "defaultValue": "''"
        },
        "step": {
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
                "text": "(optional) Step specifies the legal number intervals for the input field"
            },
            "attribute": "step",
            "reflect": true,
            "defaultValue": "'1'"
        },
        "type": {
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
                "text": "type specifies the type of <input> element to display"
            },
            "attribute": "type",
            "reflect": true,
            "defaultValue": "''"
        }
    }; }
    static get states() { return {
        "status": {}
    }; }
    static get events() { return [{
            "method": "_dotValueChange",
            "name": "_dotValueChange",
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
            "method": "_dotStatusChange",
            "name": "_dotStatusChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "DotInputCalendarStatusEvent",
                "resolved": "DotInputCalendarStatusEvent",
                "references": {
                    "DotInputCalendarStatusEvent": {
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
}
