'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-674736da.js');
const utils = require('./utils-e42aadb4.js');

const dotInputCalendarCss = "dot-input-calendar{display:-ms-flexbox;display:flex}dot-input-calendar input{-ms-flex-positive:1;flex-grow:1}";

const DotInputCalendarComponent = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this._dotValueChange = index.createEvent(this, "_dotValueChange", 7);
        this._dotStatusChange = index.createEvent(this, "_dotStatusChange", 7);
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
        this.status = utils.getOriginalStatus(this.isValid());
        this.emitValueChange();
        this.emitStatusChange();
    }
    componentWillLoad() {
        this.status = utils.getOriginalStatus(this.isValid());
        this.emitStatusChange();
    }
    render() {
        return (index.h("input", { class: utils.getErrorClass(this.status.dotValid), disabled: this.disabled || null, id: utils.getId(this.name), onBlur: () => this.blurHandler(), onInput: (event) => this.setValue(event), required: this.required || null, type: this.type, min: this.min, max: this.max, step: this.step, value: this.value }));
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
            this.status = utils.updateStatus(this.status, {
                dotTouched: true
            });
            this.emitStatusChange();
        }
    }
    setValue(event) {
        this.value = event.target.value.toString();
        this.status = utils.updateStatus(this.status, {
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
    get el() { return index.getElement(this); }
};
DotInputCalendarComponent.style = dotInputCalendarCss;

exports.dot_input_calendar = DotInputCalendarComponent;
