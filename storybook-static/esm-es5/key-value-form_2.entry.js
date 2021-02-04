import { r as registerInstance, c as createEvent, h, g as getElement } from './index-ea58b93f.js';
var keyValueFormCss = "key-value-form form{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}key-value-form form button{margin:0}key-value-form form input{margin:0 1rem 0 0.5rem}key-value-form form label{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;-ms-flex-positive:1;flex-grow:1}key-value-form form label input{-ms-flex-positive:1;flex-grow:1}";
var DEFAULT_VALUE = { key: '', value: '' };
var DotKeyValueComponent = /** @class */ (function () {
    function DotKeyValueComponent(hostRef) {
        registerInstance(this, hostRef);
        this.add = createEvent(this, "add", 7);
        this.lostFocus = createEvent(this, "lostFocus", 7);
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
    DotKeyValueComponent.prototype.render = function () {
        var _this = this;
        var buttonDisabled = this.isButtonDisabled();
        return (h("form", { onSubmit: this.addKey.bind(this) }, h("label", null, this.keyLabel, h("input", { disabled: this.disabled, name: "key", onBlur: function (e) { return _this.lostFocus.emit(e); }, onInput: function (event) { return _this.setValue(event); }, placeholder: this.keyPlaceholder, type: "text", value: this.inputs.key })), h("label", null, this.valueLabel, h("input", { disabled: this.disabled, name: "value", onBlur: function (e) { return _this.lostFocus.emit(e); }, onInput: function (event) { return _this.setValue(event); }, placeholder: this.valuePlaceholder, type: "text", value: this.inputs.value })), h("button", { class: "key-value-form__save__button", type: "submit", disabled: buttonDisabled }, this.addButtonLabel)));
    };
    DotKeyValueComponent.prototype.isButtonDisabled = function () {
        return !this.isFormValid() || (this.disabled || null);
    };
    DotKeyValueComponent.prototype.isFormValid = function () {
        return !!(this.inputs.key.length && this.inputs.value.length);
    };
    DotKeyValueComponent.prototype.setValue = function (event) {
        var _a;
        event.stopImmediatePropagation();
        var target = event.target;
        this.inputs = Object.assign(Object.assign({}, this.inputs), (_a = {}, _a[target.name] = target.value.toString(), _a));
    };
    DotKeyValueComponent.prototype.addKey = function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        if (this.inputs.key && this.inputs.value) {
            this.add.emit(this.inputs);
            this.clearForm();
            this.focusKeyInputField();
        }
    };
    DotKeyValueComponent.prototype.clearForm = function () {
        this.inputs = Object.assign({}, DEFAULT_VALUE);
    };
    DotKeyValueComponent.prototype.focusKeyInputField = function () {
        var input = this.el.querySelector('input[name="key"]');
        input.focus();
    };
    Object.defineProperty(DotKeyValueComponent.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    return DotKeyValueComponent;
}());
DotKeyValueComponent.style = keyValueFormCss;
var KeyValueTableComponent = /** @class */ (function () {
    function KeyValueTableComponent(hostRef) {
        registerInstance(this, hostRef);
        this.delete = createEvent(this, "delete", 7);
        /** (optional) Items to render in the list of key value */
        this.items = [];
        /** (optional) Disables all form interaction */
        this.disabled = false;
        /** (optional) Label for the delete button in each item list */
        this.buttonLabel = 'Delete';
        /** (optional) Message to show when the list of items is empty */
        this.emptyMessage = 'No values';
    }
    KeyValueTableComponent.prototype.render = function () {
        return (h("table", null, h("tbody", null, this.renderRows(this.items))));
    };
    KeyValueTableComponent.prototype.onDelete = function (index) {
        this.delete.emit(index);
    };
    KeyValueTableComponent.prototype.getRow = function (item, index) {
        var _this = this;
        var label = this.buttonLabel + " " + item.key + ", " + item.value;
        return (h("tr", null, h("td", null, h("button", { "aria-label": label, disabled: this.disabled || null, onClick: function () { return _this.onDelete(index); }, class: "dot-key-value__delete-button" }, this.buttonLabel)), h("td", null, item.key), h("td", null, item.value)));
    };
    KeyValueTableComponent.prototype.renderRows = function (items) {
        var _this = this;
        return this.isValidItems(items)
            ? items.map(function (item, index) { return _this.getRow(item, index); })
            : this.getEmptyRow();
    };
    KeyValueTableComponent.prototype.getEmptyRow = function () {
        return (h("tr", null, h("td", null, this.emptyMessage)));
    };
    KeyValueTableComponent.prototype.isValidItems = function (items) {
        return Array.isArray(items) && !!items.length;
    };
    return KeyValueTableComponent;
}());
export { DotKeyValueComponent as key_value_form, KeyValueTableComponent as key_value_table };
