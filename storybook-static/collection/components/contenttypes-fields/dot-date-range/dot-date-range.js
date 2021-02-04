import { Component, Prop, State, Element, Event, Method, Watch, h, Host } from '@stencil/core';
import { checkProp, getClassNames, getErrorClass, getId, getOriginalStatus, getTagError, getTagHint, updateStatus, getHintId } from '../../../utils';
import flatpickr from 'flatpickr';
export class DotDateRangeComponent {
    constructor() {
        /** (optional) Value formatted with start and end date splitted with a comma */
        this.value = '';
        /** Name that will be used as ID */
        this.name = 'daterange';
        /** (optional) Text to be rendered next to input field */
        this.label = '';
        /** (optional) Hint text that suggest a clue of the field */
        this.hint = '';
        /** (optional) Max value that the field will allow to set */
        this.max = '';
        /** (optional) Min value that the field will allow to set */
        this.min = '';
        /** (optional) Determine if it is needed */
        this.required = false;
        /** (optional) Text that be shown when required is set and condition not met */
        this.requiredMessage = 'This field is required';
        /** (optional) Disables field's interaction */
        this.disabled = false;
        /** (optional) Date format used by the field when displayed */
        this.displayFormat = 'Y-m-d';
        /** (optional) Array of date presets formatted as [{ label: 'PRESET_LABEL', days: NUMBER }] */
        this.presets = [
            {
                label: 'Date Presets',
                days: 0
            },
            {
                label: 'Last Week',
                days: -7
            },
            {
                label: 'Next Week',
                days: 7
            },
            {
                label: 'Last Month',
                days: -30
            },
            {
                label: 'Next Month',
                days: 30
            }
        ];
        /** (optional) Text to be rendered next to presets field */
        this.presetLabel = 'Presets';
        this.defaultPresets = [
            {
                label: 'Date Presets',
                days: 0
            },
            {
                label: 'Last Week',
                days: -7
            },
            {
                label: 'Next Week',
                days: 7
            },
            {
                label: 'Last Month',
                days: -30
            },
            {
                label: 'Next Month',
                days: 30
            }
        ];
    }
    /**
     * Reset properties of the field, clear value and emit events.
     */
    async reset() {
        this.value = '';
        this.status = getOriginalStatus(this.isValid());
        this.emitStatusChange();
        this.emitValueChange();
    }
    valueWatch() {
        const dates = checkProp(this, 'value', 'dateRange');
        if (dates) {
            const [startDate, endDate] = dates.split(',');
            this.flatpickr.setDate([this.parseDate(startDate), this.parseDate(endDate)], false);
        }
    }
    presetsWatch() {
        this.presets = Array.isArray(this.presets) ? this.presets : this.defaultPresets;
    }
    componentWillLoad() {
        this.status = getOriginalStatus(this.isValid());
        this.emitStatusChange();
        this.presetsWatch();
    }
    componentDidLoad() {
        this.flatpickr = flatpickr(`#${getId(this.name)}`, {
            mode: 'range',
            altFormat: this.displayFormat,
            altInput: true,
            maxDate: this.max ? this.parseDate(this.max) : null,
            minDate: this.min ? this.parseDate(this.min) : null,
            onChange: this.setValue.bind(this)
        });
        this.validateProps();
    }
    render() {
        return (h(Host, { class: Object.assign({}, getClassNames(this.status, this.isValid(), this.required)) },
            h("dot-label", { label: this.label, required: this.required, name: this.name },
                h("div", { "aria-describedby": getHintId(this.hint), tabIndex: this.hint ? 0 : null, class: "dot-range__body" },
                    h("input", { class: getErrorClass(this.status.dotValid), disabled: this.isDisabled(), id: getId(this.name), required: this.required || null, type: "text", value: this.value }),
                    h("label", null,
                        this.presetLabel,
                        h("select", { disabled: this.isDisabled(), onChange: this.setPreset.bind(this) }, this.presets.map((item) => {
                            return h("option", { value: item.days }, item.label);
                        }))))),
            getTagHint(this.hint),
            getTagError(this.showErrorMessage(), this.getErrorMessage())));
    }
    parseDate(strDate) {
        const [year, month, day] = strDate.split('-');
        const newDate = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
        return newDate;
    }
    validateProps() {
        this.valueWatch();
    }
    isDisabled() {
        return this.disabled || null;
    }
    setPreset(event) {
        const dateRange = [];
        const dt = new Date();
        dt.setDate(dt.getDate() + parseInt(event.target.value, 10));
        if (event.target.value.indexOf('-') > -1) {
            dateRange.push(dt);
            dateRange.push(new Date());
        }
        else {
            dateRange.push(new Date());
            dateRange.push(dt);
        }
        this.flatpickr.setDate(dateRange, true);
    }
    isValid() {
        return !(this.required && !(this.value && this.value.length));
    }
    isDateRangeValid(selectedDates) {
        return selectedDates && selectedDates.length === 2;
    }
    setValue(selectedDates, _dateStr, _instance) {
        this.value = this.isDateRangeValid(selectedDates)
            ? `${selectedDates[0].toISOString().split('T')[0]},${selectedDates[1].toISOString().split('T')[0]}`
            : '';
        this.status = updateStatus(this.status, {
            dotTouched: true,
            dotPristine: false,
            dotValid: this.isValid()
        });
        this.emitValueChange();
        this.emitStatusChange();
    }
    showErrorMessage() {
        return this.getErrorMessage() && !this.status.dotPristine;
    }
    getErrorMessage() {
        return this.isValid() ? '' : this.requiredMessage;
    }
    emitStatusChange() {
        this.dotStatusChange.emit({
            name: this.name,
            status: this.status
        });
    }
    emitValueChange() {
        this.dotValueChange.emit({
            name: this.name,
            value: this.value
        });
    }
    static get is() { return "dot-date-range"; }
    static get originalStyleUrls() { return {
        "$": ["dot-date-range.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dot-date-range.css"]
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
                "text": "(optional) Value formatted with start and end date splitted with a comma"
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
            "defaultValue": "'daterange'"
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
                "text": "(optional) Max value that the field will allow to set"
            },
            "attribute": "max",
            "reflect": true,
            "defaultValue": "''"
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
                "text": "(optional) Min value that the field will allow to set"
            },
            "attribute": "min",
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
                "text": "(optional) Determine if it is needed"
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
        "displayFormat": {
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
                "text": "(optional) Date format used by the field when displayed"
            },
            "attribute": "display-format",
            "reflect": true,
            "defaultValue": "'Y-m-d'"
        },
        "presets": {
            "type": "unknown",
            "mutable": true,
            "complexType": {
                "original": "{ label: string; days: number; }[]",
                "resolved": "{ label: string; days: number; }[]",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "(optional) Array of date presets formatted as [{ label: 'PRESET_LABEL', days: NUMBER }]"
            },
            "defaultValue": "[\n        {\n            label: 'Date Presets',\n            days: 0\n        },\n        {\n            label: 'Last Week',\n            days: -7\n        },\n        {\n            label: 'Next Week',\n            days: 7\n        },\n        {\n            label: 'Last Month',\n            days: -30\n        },\n        {\n            label: 'Next Month',\n            days: 30\n        }\n    ]"
        },
        "presetLabel": {
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
                "text": "(optional) Text to be rendered next to presets field"
            },
            "attribute": "preset-label",
            "reflect": true,
            "defaultValue": "'Presets'"
        }
    }; }
    static get states() { return {
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
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "value",
            "methodName": "valueWatch"
        }, {
            "propName": "presets",
            "methodName": "presetsWatch"
        }]; }
}
