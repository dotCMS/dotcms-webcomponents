import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-ea58b93f.js';
import { g as getOriginalStatus, f as getDotOptionsFromFieldValue, a as getClassNames, b as getTagError, c as getTagHint, h as getHintId, j as getErrorClass, k as getId, u as updateStatus } from './utils-4c5e19e6.js';
import { c as checkProp } from './checkProp-c5680536.js';
import { g as getDotAttributesFromElement, s as setDotAttributesToElement } from './index-cd656efe.js';

const dotCheckboxCss = ".dot-checkbox__items{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}.dot-checkbox__items label{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.dot-checkbox__items input{margin:0 0.25rem 0 0}";

const DotCheckboxComponent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.dotValueChange = createEvent(this, "dotValueChange", 7);
        this.dotStatusChange = createEvent(this, "dotStatusChange", 7);
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
        this.status = getOriginalStatus(this.isValid());
        this.emitStatusChange();
    }
    componentDidLoad() {
        const attrException = ['dottype'];
        const htmlElements = this.el.querySelectorAll('input[type="checkbox"]');
        setTimeout(() => {
            const attrs = getDotAttributesFromElement(Array.from(this.el.attributes), attrException);
            htmlElements.forEach((htmlElement) => {
                setDotAttributesToElement(htmlElement, attrs);
            });
        }, 0);
    }
    optionsWatch() {
        const validOptions = checkProp(this, 'options');
        this._options = getDotOptionsFromFieldValue(validOptions);
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
        this.status = getOriginalStatus(this.isValid());
        this.emitValueChange();
        this.emitStatusChange();
    }
    render() {
        const classes = getClassNames(this.status, this.isValid(), this.required);
        return (h(Host, { class: Object.assign({}, classes) }, h("dot-label", { label: this.label, required: this.required, name: this.name }, h("div", { "aria-describedby": getHintId(this.hint), tabIndex: this.hint ? 0 : null, class: "dot-checkbox__items" }, this._options.map((item) => {
            const trimmedValue = item.value.trim();
            return (h("label", null, h("input", { class: getErrorClass(this.isValid()), name: getId(this.name), type: "checkbox", disabled: this.disabled || null, checked: this.value.indexOf(trimmedValue) >= 0 || null, onInput: (event) => this.setValue(event), value: trimmedValue }), item.label));
        }))), getTagHint(this.hint), getTagError(!this.isValid(), this.requiredMessage)));
    }
    validateProps() {
        this.optionsWatch();
    }
    // Todo: find how to set proper TYPE in TS
    setValue(event) {
        this.value = this.getValueFromCheckInputs(event.target.value.trim(), event.target.checked);
        this.status = updateStatus(this.status, {
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
    get el() { return getElement(this); }
    static get watchers() { return {
        "options": ["optionsWatch"],
        "value": ["valueWatch"]
    }; }
};
DotCheckboxComponent.style = dotCheckboxCss;

export { DotCheckboxComponent as dot_checkbox };
