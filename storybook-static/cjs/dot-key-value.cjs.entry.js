'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-674736da.js');
const utils = require('./utils-e42aadb4.js');
const checkProp = require('./checkProp-46515d08.js');

const dotKeyValueCss = "";

const mapToKeyValue = ({ label, value }) => {
    return {
        key: label,
        value
    };
};
const DotKeyValueComponent = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.dotValueChange = index.createEvent(this, "dotValueChange", 7);
        this.dotStatusChange = index.createEvent(this, "dotStatusChange", 7);
        /** Value of the field */
        this.value = '';
        /** Name that will be used as ID */
        this.name = '';
        /** (optional) Text to be rendered next to input field */
        this.label = '';
        /** (optional) Hint text that suggest a clue of the field */
        this.hint = '';
        /** (optional) Determine if it is mandatory */
        this.required = false;
        /** (optional) Text that will be shown when required is set and condition is not met */
        this.requiredMessage = 'This field is required';
        /** (optional) Disables field's interaction */
        this.disabled = false;
        this.items = [];
    }
    valueWatch() {
        this.value = checkProp.checkProp(this, 'value', 'string');
        this.items = utils.getDotOptionsFromFieldValue(this.value).map(mapToKeyValue);
    }
    /**
     * Reset properties of the field, clear value and emit events.
     */
    async reset() {
        this.items = [];
        this.value = '';
        this.status = utils.getOriginalStatus(this.isValid());
        this.emitChanges();
    }
    deleteItemHandler(event) {
        event.stopImmediatePropagation();
        this.items = this.items.filter((_item, index) => index !== event.detail);
        this.refreshStatus();
        this.emitChanges();
    }
    addItemHandler({ detail }) {
        this.items = [...this.items, detail];
        this.refreshStatus();
        this.emitChanges();
    }
    componentWillLoad() {
        this.validateProps();
        this.setOriginalStatus();
        this.emitStatusChange();
    }
    render() {
        const classes = utils.getClassNames(this.status, this.isValid(), this.required);
        return (index.h(index.Host, { class: Object.assign({}, classes) }, index.h("dot-label", { "aria-describedby": utils.getHintId(this.hint), tabIndex: this.hint ? 0 : null, label: this.label, required: this.required, name: this.name }, index.h("key-value-form", { onLostFocus: this.blurHandler.bind(this), "add-button-label": this.formAddButtonLabel, disabled: this.isDisabled(), "key-label": this.formKeyLabel, "key-placeholder": this.formKeyPlaceholder, "value-label": this.formValueLabel, "value-placeholder": this.formValuePlaceholder }), index.h("key-value-table", { onClick: (e) => {
                e.preventDefault();
            }, "button-label": this.listDeleteLabel, disabled: this.isDisabled(), items: this.items })), utils.getTagHint(this.hint), utils.getTagError(this.showErrorMessage(), this.getErrorMessage())));
    }
    isDisabled() {
        return this.disabled || null;
    }
    blurHandler() {
        if (!this.status.dotTouched) {
            this.status = utils.updateStatus(this.status, {
                dotTouched: true
            });
            this.emitStatusChange();
        }
    }
    validateProps() {
        this.valueWatch();
    }
    setOriginalStatus() {
        this.status = utils.getOriginalStatus(this.isValid());
    }
    isValid() {
        return !(this.required && !this.items.length);
    }
    showErrorMessage() {
        return this.getErrorMessage() && !this.status.dotPristine;
    }
    getErrorMessage() {
        return this.isValid() ? '' : this.requiredMessage;
    }
    refreshStatus() {
        this.status = utils.updateStatus(this.status, {
            dotTouched: true,
            dotPristine: false,
            dotValid: this.isValid()
        });
    }
    emitStatusChange() {
        this.dotStatusChange.emit({
            name: this.name,
            status: this.status
        });
    }
    emitValueChange() {
        const returnedValue = utils.getStringFromDotKeyArray(this.items);
        this.dotValueChange.emit({
            name: this.name,
            value: returnedValue
        });
    }
    emitChanges() {
        this.emitStatusChange();
        this.emitValueChange();
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "value": ["valueWatch"]
    }; }
};
DotKeyValueComponent.style = dotKeyValueCss;

exports.dot_key_value = DotKeyValueComponent;
