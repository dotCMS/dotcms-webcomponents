'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-674736da.js');
const utils = require('./utils-e42aadb4.js');
const checkProp = require('./checkProp-46515d08.js');

const dotTagsCss = "dot-tags .dot-tags__container{display:-ms-flexbox;display:flex;-ms-flex-align:start;align-items:flex-start;border:solid 1px lightgray}dot-tags .dot-tags__container dot-autocomplete{margin:0.5rem 1rem 0.5rem 0.5rem}dot-tags .dot-tags__container .dot-tags__chips{margin:0.5rem 1rem 0 0}dot-tags .dot-tags__container dot-chip{border:solid 1px #ccc;display:inline-block;margin:0 0.5rem 0.5rem 0;padding:0.2rem}dot-tags button{border:0}";

const DotTagsComponent = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.dotValueChange = index.createEvent(this, "dotValueChange", 7);
        this.dotStatusChange = index.createEvent(this, "dotStatusChange", 7);
        /** Value formatted splitted with a comma, for example: tag-1,tag-2 */
        this.value = '';
        /** Name that will be used as ID */
        this.name = '';
        /** (optional) Text to be rendered next to input field */
        this.label = '';
        /** (optional) Hint text that suggest a clue of the field */
        this.hint = '';
        /** (optional) text to show when no value is set */
        this.placeholder = '';
        /** (optional) Determine if it is mandatory */
        this.required = false;
        /** (optional) Text that be shown when required is set and value is not set */
        this.requiredMessage = 'This field is required';
        /** (optional) Disables field's interaction */
        this.disabled = false;
        /** Min characters to start search in the autocomplete input */
        this.threshold = 0;
        /** Duraction in ms to start search into the autocomplete */
        this.debounce = 300;
        /** Function or array of string to get the data to use for the autocomplete search */
        this.data = null;
    }
    /**
     * Reset properties of the filed, clear value and emit events.
     */
    async reset() {
        this.value = '';
        this.status = utils.getOriginalStatus(this.isValid());
        this.emitChanges();
    }
    valueWatch() {
        this.value = checkProp.checkProp(this, 'value', 'string');
    }
    componentWillLoad() {
        this.status = utils.getOriginalStatus(this.isValid());
        this.validateProps();
        this.emitStatusChange();
    }
    render() {
        const classes = utils.getClassNames(this.status, this.isValid(), this.required);
        return (index.h(index.Host, { class: Object.assign({}, classes) }, index.h("dot-label", { label: this.label, required: this.required, name: this.name }, index.h("div", { "aria-describedby": utils.getHintId(this.hint), tabIndex: this.hint ? 0 : null, class: "dot-tags__container" }, index.h("dot-autocomplete", { class: utils.getErrorClass(this.status.dotValid), data: this.data, debounce: this.debounce, disabled: this.isDisabled(), onEnter: this.onEnterHandler.bind(this), onLostFocus: this.blurHandler.bind(this), onSelection: this.onSelectHandler.bind(this), placeholder: this.placeholder || null, threshold: this.threshold }), index.h("div", { class: "dot-tags__chips" }, this.getValues().map((tagLab) => (index.h("dot-chip", { disabled: this.isDisabled(), label: tagLab, onRemove: this.removeTag.bind(this) })))))), utils.getTagHint(this.hint), utils.getTagError(this.showErrorMessage(), this.getErrorMessage())));
    }
    addTag(label) {
        const values = this.getValues();
        if (!values.includes(label)) {
            values.push(label);
            this.value = values.join(',');
            this.updateStatus();
            this.emitChanges();
        }
    }
    blurHandler() {
        if (!this.status.dotTouched) {
            this.status = utils.updateStatus(this.status, {
                dotTouched: true
            });
            this.emitStatusChange();
        }
    }
    emitChanges() {
        this.emitStatusChange();
        this.emitValueChange();
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
    getErrorMessage() {
        return this.isValid() ? '' : this.requiredMessage;
    }
    getValues() {
        return utils.isStringType(this.value) ? this.value.split(',') : [];
    }
    isDisabled() {
        return this.disabled || null;
    }
    isValid() {
        return !this.required || (this.required && !!this.value);
    }
    onEnterHandler({ detail = '' }) {
        detail.split(',').forEach((label) => {
            this.addTag(label.trim());
        });
    }
    onSelectHandler({ detail = '' }) {
        const value = detail.replace(',', ' ').replace(/\s+/g, ' ');
        this.addTag(value);
    }
    removeTag(event) {
        const values = this.getValues().filter((item) => item !== event.detail);
        this.value = values.join(',');
        this.updateStatus();
        this.emitChanges();
    }
    showErrorMessage() {
        return this.getErrorMessage() && !this.status.dotPristine;
    }
    updateStatus() {
        this.status = utils.updateStatus(this.status, {
            dotTouched: true,
            dotPristine: false,
            dotValid: this.isValid()
        });
    }
    validateProps() {
        this.valueWatch();
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "value": ["valueWatch"]
    }; }
};
DotTagsComponent.style = dotTagsCss;

exports.dot_tags = DotTagsComponent;
