import { Component, Element, Event, Listen, Method, Prop, State, Watch, h, Host } from '@stencil/core';
import { checkProp, getClassNames, getTagError, getTagHint, getHintId } from '../../../utils';
import { setDotAttributesToElement, getDotAttributesFromElement, DOT_ATTR_PREFIX } from '../dot-form/utils';
import { dotParseDate } from '../../../utils/props/validators';
const DATE_SUFFIX = '-date';
const TIME_SUFFIX = '-time';
export class DotDateTimeComponent {
    constructor() {
        /** Value format yyyy-mm-dd hh:mm:ss e.g., 2005-12-01 15:22:00 */
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
        /** (optional) Min, minimum value that the field will allow to set. Format should be yyyy-mm-dd hh:mm:ss | yyyy-mm-dd | hh:mm:ss */
        this.min = '';
        /** (optional) Max, maximum value that the field will allow to set. Format should be yyyy-mm-dd hh:mm:ss | yyyy-mm-dd | hh:mm:ss */
        this.max = '';
        /** (optional) Step specifies the legal number intervals for the input fields date && time e.g., 2,10 */
        this.step = '1,1';
        /** (optional) The string to use in the date label field */
        this.dateLabel = 'Date';
        /** (optional) The string to use in the time label field */
        this.timeLabel = 'Time';
        this._step = {
            date: null,
            time: null
        };
        this._status = {
            date: null,
            time: null
        };
    }
    /**
     * Reset properties of the filed, clear value and emit events.
     */
    async reset() {
        this._status.date = null;
        this._status.time = null;
        const inputs = this.el.querySelectorAll('dot-input-calendar');
        inputs.forEach((input) => {
            input.reset();
        });
        this.dotValueChange.emit({ name: this.name, value: '' });
    }
    componentWillLoad() {
        this.validateProps();
    }
    valueWatch() {
        this.value = checkProp(this, 'value', 'dateTime');
        this._value = dotParseDate(this.value);
    }
    minWatch() {
        this.min = checkProp(this, 'min', 'dateTime');
        this._minDateTime = dotParseDate(this.min);
    }
    maxWatch() {
        this.max = checkProp(this, 'max', 'dateTime');
        this._maxDateTime = dotParseDate(this.max);
    }
    stepWatch() {
        this.step = checkProp(this, 'step') || '1,1';
        [this._step.date, this._step.time] = this.step.split(',');
    }
    emitValueChange(event) {
        const valueEvent = event.detail;
        event.stopImmediatePropagation();
        this.formatValue(valueEvent);
        if (this.isValueComplete()) {
            this.value = this.getValue();
            this.dotValueChange.emit({ name: this.name, value: this.value });
        }
    }
    emitStatusChange(event) {
        const inputCalendarStatus = event.detail;
        let status;
        event.stopImmediatePropagation();
        this.setStatus(inputCalendarStatus);
        this.setErrorMessageElement(inputCalendarStatus);
        if (this.isStatusComplete()) {
            status = this.statusHandler();
            this.classNames = getClassNames(status, status.dotValid, this.required);
            this.dotStatusChange.emit({ name: this.name, status: status });
        }
    }
    componentDidLoad() {
        this.setDotAttributes();
    }
    render() {
        return (h(Host, { class: Object.assign({}, this.classNames) },
            h("dot-label", { label: this.label, required: this.required, name: this.name },
                h("div", { class: "dot-date-time__body", "aria-describedby": getHintId(this.hint), tabIndex: this.hint ? 0 : null },
                    h("label", null,
                        this.dateLabel,
                        h("dot-input-calendar", { disabled: this.disabled, type: "date", name: this.name + DATE_SUFFIX, value: this._value.date, required: this.required, min: this._minDateTime.date, max: this._maxDateTime.date, step: this._step.date })),
                    h("label", null,
                        this.timeLabel,
                        h("dot-input-calendar", { disabled: this.disabled, type: "time", name: this.name + TIME_SUFFIX, value: this._value.time, required: this.required, min: this._minDateTime.time, max: this._maxDateTime.time, step: this._step.time })))),
            getTagHint(this.hint),
            this.errorMessageElement));
    }
    setDotAttributes() {
        const htmlDateElement = this.el.querySelector('input[type="date"]');
        const htmlTimeElement = this.el.querySelector('input[type="time"]');
        const attrException = ['dottype', 'dotstep', 'dotmin', 'dotmax', 'dotvalue'];
        setTimeout(() => {
            let attrs = Array.from(this.el.attributes);
            attrs.forEach(({ name, value }) => {
                const attr = name.replace(DOT_ATTR_PREFIX, '');
                if (this[attr]) {
                    this[attr] = value;
                }
            });
            attrs = getDotAttributesFromElement(Array.from(this.el.attributes), attrException);
            setDotAttributesToElement(htmlDateElement, attrs);
            setDotAttributesToElement(htmlTimeElement, attrs);
        }, 0);
    }
    validateProps() {
        this.minWatch();
        this.maxWatch();
        this.stepWatch();
        this.valueWatch();
    }
    // tslint:disable-next-line:cyclomatic-complexity
    statusHandler() {
        return {
            dotTouched: this._status.date.dotTouched || this._status.time.dotTouched,
            dotValid: this._status.date.dotValid && this._status.time.dotValid,
            dotPristine: this._status.date.dotPristine && this._status.time.dotPristine
        };
    }
    formatValue(event) {
        if (event.name.indexOf(DATE_SUFFIX) >= 0) {
            this._value.date = event.value;
        }
        else {
            this._value.time = event.value;
        }
    }
    getValue() {
        return !!this._value.date && !!this._value.time
            ? `${this._value.date} ${this._value.time}`
            : '';
    }
    setStatus(event) {
        if (event.name.indexOf(DATE_SUFFIX) >= 0) {
            this._status.date = event.status;
        }
        else {
            this._status.time = event.status;
        }
    }
    isValueComplete() {
        return !!this._value.time && !!this._value.date;
    }
    isStatusComplete() {
        return this._status.date && this._status.time;
    }
    isValid() {
        return this.isStatusComplete() ? (this.isStatusInRange() ? true : false) : true;
    }
    isStatusInRange() {
        return this._status.time.isValidRange && this._status.date.isValidRange;
    }
    setErrorMessageElement(statusEvent) {
        if (this.isStatusComplete()) {
            this.errorMessageElement = getTagError(!this.statusHandler().dotValid && !this.statusHandler().dotPristine, this.getErrorMessage());
        }
        else {
            this.errorMessageElement = getTagError(!statusEvent.status.dotPristine, this.getErrorMessage());
        }
    }
    getErrorMessage() {
        return !!this.getValue()
            ? this.isValid()
                ? ''
                : this.validationMessage
            : this.requiredMessage;
    }
    static get is() { return "dot-date-time"; }
    static get originalStyleUrls() { return {
        "$": ["dot-date-time.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dot-date-time.css"]
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
                "text": "Value format yyyy-mm-dd hh:mm:ss e.g., 2005-12-01 15:22:00"
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
                "text": "(optional) Min, minimum value that the field will allow to set. Format should be yyyy-mm-dd hh:mm:ss | yyyy-mm-dd | hh:mm:ss"
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
                "text": "(optional) Max, maximum value that the field will allow to set. Format should be yyyy-mm-dd hh:mm:ss | yyyy-mm-dd | hh:mm:ss"
            },
            "attribute": "max",
            "reflect": true,
            "defaultValue": "''"
        },
        "step": {
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
                "text": "(optional) Step specifies the legal number intervals for the input fields date && time e.g., 2,10"
            },
            "attribute": "step",
            "reflect": true,
            "defaultValue": "'1,1'"
        },
        "dateLabel": {
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
                "text": "(optional) The string to use in the date label field"
            },
            "attribute": "date-label",
            "reflect": true,
            "defaultValue": "'Date'"
        },
        "timeLabel": {
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
                "text": "(optional) The string to use in the time label field"
            },
            "attribute": "time-label",
            "reflect": true,
            "defaultValue": "'Time'"
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
                    },
                    "DotInputCalendar": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Reset properties of the filed, clear value and emit events.",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "value",
            "methodName": "valueWatch"
        }, {
            "propName": "min",
            "methodName": "minWatch"
        }, {
            "propName": "max",
            "methodName": "maxWatch"
        }, {
            "propName": "step",
            "methodName": "stepWatch"
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
