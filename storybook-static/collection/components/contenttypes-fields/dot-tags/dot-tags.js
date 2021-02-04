import { Component, Prop, State, Element, Event, Method, Watch, h, Host } from '@stencil/core';
import { checkProp, getClassNames, getErrorClass, getOriginalStatus, getTagError, getTagHint, updateStatus, getHintId, isStringType } from '../../../utils';
export class DotTagsComponent {
    constructor() {
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
        this.status = getOriginalStatus(this.isValid());
        this.emitChanges();
    }
    valueWatch() {
        this.value = checkProp(this, 'value', 'string');
    }
    componentWillLoad() {
        this.status = getOriginalStatus(this.isValid());
        this.validateProps();
        this.emitStatusChange();
    }
    render() {
        const classes = getClassNames(this.status, this.isValid(), this.required);
        return (h(Host, { class: Object.assign({}, classes) },
            h("dot-label", { label: this.label, required: this.required, name: this.name },
                h("div", { "aria-describedby": getHintId(this.hint), tabIndex: this.hint ? 0 : null, class: "dot-tags__container" },
                    h("dot-autocomplete", { class: getErrorClass(this.status.dotValid), data: this.data, debounce: this.debounce, disabled: this.isDisabled(), onEnter: this.onEnterHandler.bind(this), onLostFocus: this.blurHandler.bind(this), onSelection: this.onSelectHandler.bind(this), placeholder: this.placeholder || null, threshold: this.threshold }),
                    h("div", { class: "dot-tags__chips" }, this.getValues().map((tagLab) => (h("dot-chip", { disabled: this.isDisabled(), label: tagLab, onRemove: this.removeTag.bind(this) })))))),
            getTagHint(this.hint),
            getTagError(this.showErrorMessage(), this.getErrorMessage())));
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
            this.status = updateStatus(this.status, {
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
        return isStringType(this.value) ? this.value.split(',') : [];
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
        this.status = updateStatus(this.status, {
            dotTouched: true,
            dotPristine: false,
            dotValid: this.isValid()
        });
    }
    validateProps() {
        this.valueWatch();
    }
    static get is() { return "dot-tags"; }
    static get originalStyleUrls() { return {
        "$": ["dot-tags.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dot-tags.css"]
    }; }
    static get properties() { return {
        "value": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Value formatted splitted with a comma, for example: tag-1,tag-2"
            },
            "attribute": "value",
            "reflect": true,
            "defaultValue": "''"
        },
        "name": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Name that will be used as ID"
            },
            "attribute": "name",
            "reflect": true,
            "defaultValue": "''"
        },
        "label": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "(optional) Text to be rendered next to input field"
            },
            "attribute": "label",
            "reflect": true,
            "defaultValue": "''"
        },
        "hint": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "(optional) Hint text that suggest a clue of the field"
            },
            "attribute": "hint",
            "reflect": true,
            "defaultValue": "''"
        },
        "placeholder": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "(optional) text to show when no value is set"
            },
            "attribute": "placeholder",
            "reflect": true,
            "defaultValue": "''"
        },
        "required": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "(optional) Determine if it is mandatory"
            },
            "attribute": "required",
            "reflect": true,
            "defaultValue": "false"
        },
        "requiredMessage": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "(optional) Text that be shown when required is set and value is not set"
            },
            "attribute": "required-message",
            "reflect": true,
            "defaultValue": "'This field is required'"
        },
        "disabled": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "(optional) Disables field's interaction"
            },
            "attribute": "disabled",
            "reflect": true,
            "defaultValue": "false"
        },
        "threshold": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Min characters to start search in the autocomplete input"
            },
            "attribute": "threshold",
            "reflect": true,
            "defaultValue": "0"
        },
        "debounce": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Duraction in ms to start search into the autocomplete"
            },
            "attribute": "debounce",
            "reflect": true,
            "defaultValue": "300"
        },
        "data": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "() => Promise<string[]> | string[]",
                "resolved": "() => string[] | Promise<string[]>",
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Function or array of string to get the data to use for the autocomplete search"
            },
            "defaultValue": "null"
        }
    }; }
    static get states() { return {
        "status": {}
    }; }
    static get events() { return [{
            "method": "dotValueChange",
            "name": "dotValueChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "DotFieldValueEvent",
                "resolved": "DotFieldValueEvent",
                "references": {
                    "DotFieldValueEvent": {
                        "location": "import",
                        "path": "../../../models"
                    }
                }
            }
        }, {
            "method": "dotStatusChange",
            "name": "dotStatusChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "DotFieldStatusEvent",
                "resolved": "DotFieldStatusEvent",
                "references": {
                    "DotFieldStatusEvent": {
                        "location": "import",
                        "path": "../../../models"
                    }
                }
            }
        }]; }
    static get methods() { return {
        "reset": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Reset properties of the filed, clear value and emit events.",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "value",
            "methodName": "valueWatch"
        }]; }
}
