'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-674736da.js');

const keyValueFormCss = "key-value-form form{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}key-value-form form button{margin:0}key-value-form form input{margin:0 1rem 0 0.5rem}key-value-form form label{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;-ms-flex-positive:1;flex-grow:1}key-value-form form label input{-ms-flex-positive:1;flex-grow:1}";

const DEFAULT_VALUE = { key: '', value: '' };
const DotKeyValueComponent = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.add = index.createEvent(this, "add", 7);
        this.lostFocus = index.createEvent(this, "lostFocus", 7);
        /** (optional) Disables all form interaction */
        this.disabled = false;
        /** (optional) Label for the add item button */
        this.addButtonLabel = 'Add';
        /** (optional) Placeholder for the key input text */
        this.keyPlaceholder = '';
        /** (optional) Placeholder for the value input text */
        this.valuePlaceholder = '';
        /** (optional) The string to use in the key input label */
        this.keyLabel = 'Key';
        /** (optional) The string to use in the value input label */
        this.valueLabel = 'Value';
        this.inputs = Object.assign({}, DEFAULT_VALUE);
    }
    render() {
        const buttonDisabled = this.isButtonDisabled();
        return (index.h("form", { onSubmit: this.addKey.bind(this) }, index.h("label", null, this.keyLabel, index.h("input", { disabled: this.disabled, name: "key", onBlur: (e) => this.lostFocus.emit(e), onInput: (event) => this.setValue(event), placeholder: this.keyPlaceholder, type: "text", value: this.inputs.key })), index.h("label", null, this.valueLabel, index.h("input", { disabled: this.disabled, name: "value", onBlur: (e) => this.lostFocus.emit(e), onInput: (event) => this.setValue(event), placeholder: this.valuePlaceholder, type: "text", value: this.inputs.value })), index.h("button", { class: "key-value-form__save__button", type: "submit", disabled: buttonDisabled }, this.addButtonLabel)));
    }
    isButtonDisabled() {
        return !this.isFormValid() || (this.disabled || null);
    }
    isFormValid() {
        return !!(this.inputs.key.length && this.inputs.value.length);
    }
    setValue(event) {
        event.stopImmediatePropagation();
        const target = event.target;
        this.inputs = Object.assign(Object.assign({}, this.inputs), { [target.name]: target.value.toString() });
    }
    addKey(event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        if (this.inputs.key && this.inputs.value) {
            this.add.emit(this.inputs);
            this.clearForm();
            this.focusKeyInputField();
        }
    }
    clearForm() {
        this.inputs = Object.assign({}, DEFAULT_VALUE);
    }
    focusKeyInputField() {
        const input = this.el.querySelector('input[name="key"]');
        input.focus();
    }
    get el() { return index.getElement(this); }
};
DotKeyValueComponent.style = keyValueFormCss;

const KeyValueTableComponent = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.delete = index.createEvent(this, "delete", 7);
        /** (optional) Items to render in the list of key value */
        this.items = [];
        /** (optional) Disables all form interaction */
        this.disabled = false;
        /** (optional) Label for the delete button in each item list */
        this.buttonLabel = 'Delete';
        /** (optional) Message to show when the list of items is empty */
        this.emptyMessage = 'No values';
    }
    render() {
        return (index.h("table", null, index.h("tbody", null, this.renderRows(this.items))));
    }
    onDelete(index) {
        this.delete.emit(index);
    }
    getRow(item, index$1) {
        const label = `${this.buttonLabel} ${item.key}, ${item.value}`;
        return (index.h("tr", null, index.h("td", null, index.h("button", { "aria-label": label, disabled: this.disabled || null, onClick: () => this.onDelete(index$1), class: "dot-key-value__delete-button" }, this.buttonLabel)), index.h("td", null, item.key), index.h("td", null, item.value)));
    }
    renderRows(items) {
        return this.isValidItems(items)
            ? items.map((item, index) => this.getRow(item, index))
            : this.getEmptyRow();
    }
    getEmptyRow() {
        return (index.h("tr", null, index.h("td", null, this.emptyMessage)));
    }
    isValidItems(items) {
        return Array.isArray(items) && !!items.length;
    }
};

exports.key_value_form = DotKeyValueComponent;
exports.key_value_table = KeyValueTableComponent;
