import { Component, Element, Event, Listen, Method, Prop, State, Watch, h, Host } from '@stencil/core';
import { checkProp, getClassNames, getTagError, getTagHint, getHintId } from '../../../utils';
import { setDotAttributesToElement, getDotAttributesFromElement } from '../dot-form/utils';
export class DotTimeComponent {
    constructor() {
        /** Value format hh:mm:ss e.g., 15:22:00 */
        this.value = '';
        /** Name that will be used as ID */
        this.name = '';
        /** (optional) Text to be rendered next to input field */
        this.label = '';
        /** (optional) Hint text that suggest a clue of the field */
        this.hint = '';
        /** (optional) Determine if it is mandatory */
        this.required = false;
        /** (optional) Text that be shown when required is set and condition not met */
        this.requiredMessage = 'This field is required';
        /** (optional) Text that be shown when min or max are set and condition not met */
        this.validationMessage = "The field doesn't comply with the specified format";
        /** (optional) Disables field's interaction */
        this.disabled = false;
        /** (optional) Min, minimum value that the field will allow to set. Format should be hh:mm:ss */
        this.min = '';
        /** (optional) Max, maximum value that the field will allow to set. Format should be  hh:mm:ss */
        this.max = '';
        /** (optional) Step specifies the legal number intervals for the input field */
        this.step = '1';
    }
    /**
     * Reset properties of the field, clear value and emit events.
     */
    async reset() {
        const input = this.el.querySelector('dot-input-calendar');
        input.reset();
    }
    componentWillLoad() {
        this.validateProps();
    }
    componentDidLoad() {
        const attrException = ['dottype'];
        const htmlElement = this.el.querySelector('input[type="time"]');
        setTimeout(() => {
            const attrs = getDotAttributesFromElement(Array.from(this.el.attributes), attrException);
            setDotAttributesToElement(htmlElement, attrs);
        }, 0);
    }
    minWatch() {
        this.min = checkProp(this, 'min', 'time');
    }
    maxWatch() {
        this.max = checkProp(this, 'max', 'time');
    }
    emitValueChange(event) {
        event.stopImmediatePropagation();
        const valueEvent = event.detail;
        this.value = valueEvent.value;
        this.dotValueChange.emit(valueEvent);
    }
    emitStatusChange(event) {
        event.stopImmediatePropagation();
        const inputCalendarStatus = event.detail;
        this.classNames = getClassNames(inputCalendarStatus.status, inputCalendarStatus.status.dotValid, this.required);
        this.setErrorMessageElement(inputCalendarStatus);
        this.dotStatusChange.emit({
            name: inputCalendarStatus.name,
            status: inputCalendarStatus.status
        });
    }
    render() {
        return (h(Host, { class: Object.assign({}, this.classNames) },
            h("dot-label", { label: this.label, required: this.required, name: this.name },
                h("dot-input-calendar", { "aria-describedby": getHintId(this.hint), tabIndex: this.hint ? 0 : null, disabled: this.disabled, type: "time", name: this.name, value: this.value, required: this.required, min: this.min, max: this.max, step: this.step })),
            getTagHint(this.hint),
            this.errorMessageElement));
    }
    validateProps() {
        this.minWatch();
        this.maxWatch();
    }
    setErrorMessageElement(statusEvent) {
        this.errorMessageElement = getTagError(!statusEvent.status.dotValid && !statusEvent.status.dotPristine, this.getErrorMessage(statusEvent));
    }
    getErrorMessage(statusEvent) {
        return !!this.value
            ? statusEvent.isValidRange
                ? ''
                : this.validationMessage
            : this.requiredMessage;
    }
    static get is() { return "dot-time"; }
    static get originalStyleUrls() { return {
        "$": ["dot-time.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dot-time.css"]
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
                "text": "Value format hh:mm:ss e.g., 15:22:00"
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
                "text": "(optional) Text that be shown when required is set and condition not met"
            },
            "attribute": "required-message",
            "reflect": true,
            "defaultValue": "'This field is required'"
        },
        "validationMessage": {
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
                "text": "(optional) Text that be shown when min or max are set and condition not met"
            },
            "attribute": "validation-message",
            "reflect": true,
            "defaultValue": "\"The field doesn't comply with the specified format\""
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
                "text": "(optional) Min, minimum value that the field will allow to set. Format should be hh:mm:ss"
            },
            "attribute": "min",
            "reflect": true,
            "defaultValue": "''"
        },
        "max": {
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
                "text": "(optional) Max, maximum value that the field will allow to set. Format should be  hh:mm:ss"
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
        }
    }; }
    static get states() { return {
        "classNames": {},
        "errorMessageElement": {}
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
            "propName": "min",
            "methodName": "minWatch"
        }, {
            "propName": "max",
            "methodName": "maxWatch"
        }]; }
    static get listeners() { return [{
            "name": "_dotValueChange",
            "method": "emitValueChange",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "_dotStatusChange",
            "method": "emitStatusChange",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
