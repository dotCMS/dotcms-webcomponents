'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-674736da.js');
const utils = require('./utils-e42aadb4.js');
const checkProp = require('./checkProp-46515d08.js');
const index$1 = require('./index-4848f6d2.js');

const dotCheckboxCss = ".dot-checkbox__items{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}.dot-checkbox__items label{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.dot-checkbox__items input{margin:0 0.25rem 0 0}";

const DotCheckboxComponent = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.dotValueChange = index.createEvent(this, "dotValueChange", 7);
        this.dotStatusChange = index.createEvent(this, "dotStatusChange", 7);
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
        this.status = utils.getOriginalStatus(this.isValid());
        this.emitStatusChange();
    }
    componentDidLoad() {
        const attrException = ['dottype'];
        const htmlElements = this.el.querySelectorAll('input[type="checkbox"]');
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
    /**
     * Reset properties of the field, clear value and emit events.
     *
     * @memberof DotSelectComponent
     */
    async reset() {
        this.value = '';
        this.status = utils.getOriginalStatus(this.isValid());
        this.emitValueChange();
        this.emitStatusChange();
    }
    render() {
        const classes = utils.getClassNames(this.status, this.isValid(), this.required);
        return (index.h(index.Host, { class: Object.assign({}, classes) }, index.h("dot-label", { label: this.label, required: this.required, name: this.name }, index.h("div", { "aria-describedby": utils.getHintId(this.hint), tabIndex: this.hint ? 0 : null, class: "dot-checkbox__items" }, this._options.map((item) => {
            const trimmedValue = item.value.trim();
            return (index.h("label", null, index.h("input", { class: utils.getErrorClass(this.isValid()), name: utils.getId(this.name), type: "checkbox", disabled: this.disabled || null, checked: this.value.indexOf(trimmedValue) >= 0 || null, onInput: (event) => this.setValue(event), value: trimmedValue }), item.label));
        }))), utils.getTagHint(this.hint), utils.getTagError(!this.isValid(), this.requiredMessage)));
    }
    validateProps() {
        this.optionsWatch();
    }
    // Todo: find how to set proper TYPE in TS
    setValue(event) {
        this.value = this.getValueFromCheckInputs(event.target.value.trim(), event.target.checked);
        this.status = utils.updateStatus(this.status, {
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
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "options": ["optionsWatch"],
        "value": ["valueWatch"]
    }; }
};
DotCheckboxComponent.style = dotCheckboxCss;

exports.dot_checkbox = DotCheckboxComponent;
