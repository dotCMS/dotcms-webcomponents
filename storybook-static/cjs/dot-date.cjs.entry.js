'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-674736da.js');
const utils = require('./utils-e42aadb4.js');
const checkProp = require('./checkProp-46515d08.js');
const index$1 = require('./index-4848f6d2.js');

const dotDateCss = "";

const DotDateComponent = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.dotValueChange = index.createEvent(this, "dotValueChange", 7);
        this.dotStatusChange = index.createEvent(this, "dotStatusChange", 7);
        /** Value format yyyy-mm-dd  e.g., 2005-12-01 */
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
        /** (optional) Min, minimum value that the field will allow to set. Format should be yyyy-mm-dd */
        this.min = '';
        /** (optional) Max, maximum value that the field will allow to set. Format should be yyyy-mm-dd */
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
        const htmlElement = this.el.querySelector('input[type="date"]');
        setTimeout(() => {
            const attrs = index$1.getDotAttributesFromElement(Array.from(this.el.attributes), attrException);
            index$1.setDotAttributesToElement(htmlElement, attrs);
        }, 0);
    }
    minWatch() {
        this.min = checkProp.checkProp(this, 'min', 'date');
    }
    maxWatch() {
        this.max = checkProp.checkProp(this, 'max', 'date');
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
        this.classNames = utils.getClassNames(inputCalendarStatus.status, inputCalendarStatus.status.dotValid, this.required);
        this.setErrorMessageElement(inputCalendarStatus);
        this.dotStatusChange.emit({
            name: inputCalendarStatus.name,
            status: inputCalendarStatus.status
        });
    }
    render() {
        return (index.h(index.Host, { class: Object.assign({}, this.classNames) }, index.h("dot-label", { label: this.label, required: this.required, name: this.name }, index.h("dot-input-calendar", { "aria-describedby": utils.getHintId(this.hint), tabIndex: this.hint ? 0 : null, disabled: this.disabled, type: "date", name: this.name, value: this.value, required: this.required, min: this.min, max: this.max, step: this.step })), utils.getTagHint(this.hint), this.errorMessageElement));
    }
    validateProps() {
        this.minWatch();
        this.maxWatch();
    }
    setErrorMessageElement(statusEvent) {
        this.errorMessageElement = utils.getTagError(!statusEvent.status.dotValid && !statusEvent.status.dotPristine, this.getErrorMessage(statusEvent));
    }
    getErrorMessage(statusEvent) {
        return !!this.value
            ? statusEvent.isValidRange
                ? ''
                : this.validationMessage
            : this.requiredMessage;
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "min": ["minWatch"],
        "max": ["maxWatch"]
    }; }
};
DotDateComponent.style = dotDateCss;

exports.dot_date = DotDateComponent;
