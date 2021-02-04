'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-674736da.js');
const utils = require('./utils-e42aadb4.js');
const checkProp = require('./checkProp-46515d08.js');
const index$1 = require('./index-4848f6d2.js');

const dotSelectCss = "";

const DotSelectComponent = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.dotValueChange = index.createEvent(this, "dotValueChange", 7);
        this.dotStatusChange = index.createEvent(this, "dotStatusChange", 7);
        /** Value set from the dropdown option */
        this.value = '';
        /** Name that will be used as ID */
        this.name = '';
        /** (optional) Text to be rendered next to input field */
        this.label = '';
        /** (optional) Hint text that suggest a clue of the field */
        this.hint = '';
        /** Value/Label dropdown options separated by comma, to be formatted as: Value|Label */
        this.options = '';
        /** (optional) Determine if it is mandatory */
        this.required = false;
        /** (optional) Text that will be shown when required is set and condition is not met */
        this.requiredMessage = `This field is required`;
        /** (optional) Disables field's interaction */
        this.disabled = false;
        this._dotTouched = false;
        this._dotPristine = true;
    }
    componentWillLoad() {
        this.validateProps();
        this.emitInitialValue();
        this.status = utils.getOriginalStatus(this.isValid());
        this.emitStatusChange();
    }
    optionsWatch() {
        const validOptions = checkProp.checkProp(this, 'options');
        this._options = utils.getDotOptionsFromFieldValue(validOptions);
    }
    /**
     * Reset properties of the field, clear value and emit events.
     *
     * @memberof DotSelectComponent
     *
     */
    async reset() {
        this.value = '';
        this.status = utils.getOriginalStatus(this.isValid());
        this.emitInitialValue();
        this.emitStatusChange();
    }
    componentDidLoad() {
        const htmlElement = this.el.querySelector('select');
        setTimeout(() => {
            const attrs = index$1.getDotAttributesFromElement(Array.from(this.el.attributes), []);
            index$1.setDotAttributesToElement(htmlElement, attrs);
        }, 0);
    }
    render() {
        const classes = utils.getClassNames(this.status, this.isValid(), this.required);
        return (index.h(index.Host, { class: Object.assign({}, classes) }, index.h("dot-label", { label: this.label, required: this.required, name: this.name }, index.h("select", { "aria-describedby": utils.getHintId(this.hint), class: utils.getErrorClass(this.status.dotValid), id: utils.getId(this.name), disabled: this.shouldBeDisabled(), onChange: (event) => this.setValue(event) }, this._options.map((item) => {
            return (index.h("option", { selected: this.value === item.value ? true : null, value: item.value }, item.label));
        }))), utils.getTagHint(this.hint), utils.getTagError(!this.isValid(), this.requiredMessage)));
    }
    validateProps() {
        this.optionsWatch();
    }
    shouldBeDisabled() {
        return this.disabled ? true : null;
    }
    // Todo: find how to set proper TYPE in TS
    setValue(event) {
        this.value = event.target.value;
        this.status = utils.updateStatus(this.status, {
            dotTouched: true,
            dotPristine: false,
            dotValid: this.isValid()
        });
        this.emitValueChange();
        this.emitStatusChange();
    }
    emitInitialValue() {
        if (!this.value) {
            this.value = this._options.length ? this._options[0].value : '';
            this.emitValueChange();
        }
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
        "options": ["optionsWatch"]
    }; }
};
DotSelectComponent.style = dotSelectCss;

exports.dot_select = DotSelectComponent;
