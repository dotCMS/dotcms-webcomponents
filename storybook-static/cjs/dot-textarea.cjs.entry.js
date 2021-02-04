'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-674736da.js');
const utils = require('./utils-e42aadb4.js');
const checkProp = require('./checkProp-46515d08.js');
const index$1 = require('./index-4848f6d2.js');

const dotTextareaCss = "input{outline:none}.dot-field__input--error{border:1px solid red}";

const DotTextareaComponent = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.dotValueChange = index.createEvent(this, "dotValueChange", 7);
        this.dotStatusChange = index.createEvent(this, "dotStatusChange", 7);
        /** Value specifies the value of the <textarea> element */
        this.value = '';
        /** Name that will be used as ID */
        this.name = '';
        /** (optional) Text to be rendered next to <textarea> element */
        this.label = '';
        /** (optional) Hint text that suggest a clue of the field */
        this.hint = '';
        /** (optional) Determine if it is mandatory */
        this.required = false;
        /** (optional) Text that be shown when required is set and condition not met */
        this.requiredMessage = 'This field is required';
        /** (optional) Text that be shown when the Regular Expression condition not met */
        this.validationMessage = "The field doesn't comply with the specified format";
        /** (optional) Disables field's interaction */
        this.disabled = false;
        /** (optional) Regular expresion that is checked against the value to determine if is valid  */
        this.regexCheck = '';
    }
    /**
     * Reset properties of the field, clear value and emit events.
     *
     * @memberof DotTextareaComponent
     */
    async reset() {
        this.value = '';
        this.status = utils.getOriginalStatus(this.isValid());
        this.emitStatusChange();
        this.emitValueChange();
    }
    componentWillLoad() {
        this.value = this.value || '';
        this.validateProps();
        this.status = utils.getOriginalStatus(this.isValid());
        this.emitStatusChange();
    }
    componentDidLoad() {
        const htmlElement = this.el.querySelector('textarea');
        setTimeout(() => {
            const attrs = index$1.getDotAttributesFromElement(Array.from(this.el.attributes), []);
            index$1.setDotAttributesToElement(htmlElement, attrs);
        }, 0);
    }
    regexCheckWatch() {
        this.regexCheck = checkProp.checkProp(this, 'regexCheck');
    }
    valueWatch() {
        this.value = this.value || '';
    }
    render() {
        const classes = utils.getClassNames(this.status, this.isValid(), this.required);
        return (index.h(index.Host, { class: Object.assign({}, classes) }, index.h("dot-label", { label: this.label, required: this.required, name: this.name }, index.h("textarea", { "aria-describedby": utils.getHintId(this.hint), class: utils.getErrorClass(this.status.dotValid), id: utils.getId(this.name), name: this.name, value: this.value, required: this.getRequiredAttr(), onInput: (event) => this.setValue(event), onBlur: () => this.blurHandler(), disabled: this.getDisabledAtt() })), utils.getTagHint(this.hint), utils.getTagError(this.shouldShowErrorMessage(), this.getErrorMessage())));
    }
    validateProps() {
        this.regexCheckWatch();
    }
    getDisabledAtt() {
        return this.disabled || null;
    }
    getRequiredAttr() {
        return this.required ? true : null;
    }
    isValid() {
        return !this.isValueRequired() && this.isRegexValid();
    }
    isValueRequired() {
        return this.required && !this.value.length;
    }
    isRegexValid() {
        if (this.regexCheck && this.value.length) {
            const regex = new RegExp(this.regexCheck, 'ig');
            return regex.test(this.value);
        }
        return true;
    }
    shouldShowErrorMessage() {
        return this.getErrorMessage() && !this.status.dotPristine;
    }
    getErrorMessage() {
        return this.isRegexValid()
            ? this.isValid()
                ? ''
                : this.requiredMessage
            : this.validationMessage;
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
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "regexCheck": ["regexCheckWatch"],
        "value": ["valueWatch"]
    }; }
};
DotTextareaComponent.style = dotTextareaCss;

exports.dot_textarea = DotTextareaComponent;
