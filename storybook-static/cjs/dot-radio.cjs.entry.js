'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-674736da.js');
const utils = require('./utils-e42aadb4.js');
const checkProp = require('./checkProp-46515d08.js');
const index$1 = require('./index-4848f6d2.js');

const dotRadioCss = ".dot-radio__items{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}.dot-radio__items label{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex}.dot-radio__items input{margin:0 0.25rem 0 0}";

const DotRadioComponent = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.dotValueChange = index.createEvent(this, "dotValueChange", 7);
        this.dotStatusChange = index.createEvent(this, "dotStatusChange", 7);
        /** Value set from the ratio option */
        this.value = '';
        /** Name that will be used as ID */
        this.name = '';
        /** (optional) Text to be rendered next to input field */
        this.label = '';
        /** (optional) Hint text that suggest a clue of the field */
        this.hint = '';
        /** (optional) Determine if it is mandatory */
        this.required = false;
        /** (optional) Disables field's interaction */
        this.disabled = false;
        /** (optional) Text that will be shown when required is set and condition is not met */
        this.requiredMessage = '';
        /** Value/Label ratio options separated by comma, to be formatted as: Value|Label */
        this.options = '';
    }
    /**
     * Reset properties of the field, clear value and emit events.
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
        const attrException = ['dottype'];
        const htmlElements = this.el.querySelectorAll('input[type="radio"]');
        setTimeout(() => {
            const attrs = index$1.getDotAttributesFromElement(Array.from(this.el.attributes), attrException);
            htmlElements.forEach((htmlElement) => {
                index$1.setDotAttributesToElement(htmlElement, attrs);
            });
        }, 0);
    }
    optionsWatch() {
        const validOptions = checkProp.checkProp(this, 'options');
        this._options = utils.getDotOptionsFromFieldValue(validOptions);
    }
    valueWatch() {
        this.value = this.value || '';
    }
    render() {
        const classes = utils.getClassNames(this.status, this.isValid(), this.required);
        return (index.h(index.Host, { class: Object.assign({}, classes) }, index.h("dot-label", { label: this.label, required: this.required, name: this.name }, index.h("div", { class: "dot-radio__items", "aria-describedby": utils.getHintId(this.hint), tabIndex: this.hint ? 0 : null, role: "radiogroup" }, this._options.map((item) => {
            item.value = item.value.trim();
            return (index.h("label", null, index.h("input", { checked: this.value.indexOf(item.value) >= 0 || null, class: utils.getErrorClass(this.isValid()), name: utils.getId(this.name), disabled: this.disabled || null, onInput: (event) => this.setValue(event), type: "radio", value: item.value }), item.label));
        }))), utils.getTagHint(this.hint), utils.getTagError(this.showErrorMessage(), this.getErrorMessage())));
    }
    validateProps() {
        this.optionsWatch();
    }
    isValid() {
        return this.required ? !!this.value : true;
    }
    showErrorMessage() {
        return this.getErrorMessage() && !this.status.dotPristine;
    }
    getErrorMessage() {
        return this.isValid() ? '' : this.requiredMessage;
    }
    setValue(event) {
        this.value = event.target.value.trim();
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
        "options": ["optionsWatch"],
        "value": ["valueWatch"]
    }; }
};
DotRadioComponent.style = dotRadioCss;

exports.dot_radio = DotRadioComponent;
