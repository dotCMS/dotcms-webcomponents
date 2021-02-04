'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-674736da.js');
const utils = require('./utils-e42aadb4.js');
const checkProp = require('./checkProp-46515d08.js');
const index$1 = require('./index-4848f6d2.js');

const dotDateTimeCss = ".dot-date-time__body{display:-ms-flexbox;display:flex}.dot-date-time__body label{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;-ms-flex-positive:1;flex-grow:1;margin-right:1rem}.dot-date-time__body label:last-child{margin-right:0}.dot-date-time__body label dot-input-calendar{-ms-flex-positive:1;flex-grow:1;margin-left:0.5rem}";

const DATE_SUFFIX = '-date';
const TIME_SUFFIX = '-time';
const DotDateTimeComponent = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.dotValueChange = index.createEvent(this, "dotValueChange", 7);
        this.dotStatusChange = index.createEvent(this, "dotStatusChange", 7);
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
        this.value = checkProp.checkProp(this, 'value', 'dateTime');
        this._value = checkProp.dotParseDate(this.value);
    }
    minWatch() {
        this.min = checkProp.checkProp(this, 'min', 'dateTime');
        this._minDateTime = checkProp.dotParseDate(this.min);
    }
    maxWatch() {
        this.max = checkProp.checkProp(this, 'max', 'dateTime');
        this._maxDateTime = checkProp.dotParseDate(this.max);
    }
    stepWatch() {
        this.step = checkProp.checkProp(this, 'step') || '1,1';
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
            this.classNames = utils.getClassNames(status, status.dotValid, this.required);
            this.dotStatusChange.emit({ name: this.name, status: status });
        }
    }
    componentDidLoad() {
        this.setDotAttributes();
    }
    render() {
        return (index.h(index.Host, { class: Object.assign({}, this.classNames) }, index.h("dot-label", { label: this.label, required: this.required, name: this.name }, index.h("div", { class: "dot-date-time__body", "aria-describedby": utils.getHintId(this.hint), tabIndex: this.hint ? 0 : null }, index.h("label", null, this.dateLabel, index.h("dot-input-calendar", { disabled: this.disabled, type: "date", name: this.name + DATE_SUFFIX, value: this._value.date, required: this.required, min: this._minDateTime.date, max: this._maxDateTime.date, step: this._step.date })), index.h("label", null, this.timeLabel, index.h("dot-input-calendar", { disabled: this.disabled, type: "time", name: this.name + TIME_SUFFIX, value: this._value.time, required: this.required, min: this._minDateTime.time, max: this._maxDateTime.time, step: this._step.time })))), utils.getTagHint(this.hint), this.errorMessageElement));
    }
    setDotAttributes() {
        const htmlDateElement = this.el.querySelector('input[type="date"]');
        const htmlTimeElement = this.el.querySelector('input[type="time"]');
        const attrException = ['dottype', 'dotstep', 'dotmin', 'dotmax', 'dotvalue'];
        setTimeout(() => {
            let attrs = Array.from(this.el.attributes);
            attrs.forEach(({ name, value }) => {
                const attr = name.replace(index$1.DOT_ATTR_PREFIX, '');
                if (this[attr]) {
                    this[attr] = value;
                }
            });
            attrs = index$1.getDotAttributesFromElement(Array.from(this.el.attributes), attrException);
            index$1.setDotAttributesToElement(htmlDateElement, attrs);
            index$1.setDotAttributesToElement(htmlTimeElement, attrs);
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
            this.errorMessageElement = utils.getTagError(!this.statusHandler().dotValid && !this.statusHandler().dotPristine, this.getErrorMessage());
        }
        else {
            this.errorMessageElement = utils.getTagError(!statusEvent.status.dotPristine, this.getErrorMessage());
        }
    }
    getErrorMessage() {
        return !!this.getValue()
            ? this.isValid()
                ? ''
                : this.validationMessage
            : this.requiredMessage;
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "value": ["valueWatch"],
        "min": ["minWatch"],
        "max": ["maxWatch"],
        "step": ["stepWatch"]
    }; }
};
DotDateTimeComponent.style = dotDateTimeCss;

exports.dot_date_time = DotDateTimeComponent;
