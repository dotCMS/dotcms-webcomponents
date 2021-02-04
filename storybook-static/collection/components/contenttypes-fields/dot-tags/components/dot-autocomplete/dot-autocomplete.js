import { Component, Prop, Event, Element, Watch, h } from '@stencil/core';
import autoComplete from '@tarekraafat/autocomplete.js/dist/js/autoComplete';
export class DotAutocompleteComponent {
    constructor() {
        /** (optional) Disables field's interaction */
        this.disabled = false;
        /** (optional) text to show when no value is set */
        this.placeholder = '';
        /** (optional)  Min characters to start search in the autocomplete input */
        this.threshold = 0;
        /** (optional)  Max results to show after a autocomplete search */
        this.maxResults = 0;
        /** (optional) Duraction in ms to start search into the autocomplete */
        this.debounce = 300;
        /** Function or array of string to get the data to use for the autocomplete search */
        this.data = null;
        this.id = `autoComplete${new Date().getTime()}`;
        this.keyEvent = {
            Enter: this.emitEnter.bind(this),
            Escape: this.clean.bind(this)
        };
    }
    componentDidLoad() {
        if (this.data) {
            this.initAutocomplete();
        }
    }
    render() {
        return (h("input", { autoComplete: "off", disabled: this.disabled || null, id: this.id, onBlur: (event) => this.handleBlur(event), onKeyDown: (event) => this.handleKeyDown(event), placeholder: this.placeholder || null }));
    }
    watchThreshold() {
        this.initAutocomplete();
    }
    watchData() {
        this.initAutocomplete();
    }
    watchMaxResults() {
        this.initAutocomplete();
    }
    handleKeyDown(event) {
        const { value } = this.getInputElement();
        if (value && this.keyEvent[event.key]) {
            event.preventDefault();
            this.keyEvent[event.key](value);
        }
    }
    handleBlur(event) {
        event.preventDefault();
        setTimeout(() => {
            if (document.activeElement.parentElement !== this.getResultList()) {
                this.clean();
                this.lostFocus.emit(event);
            }
        }, 0);
    }
    clean() {
        this.getInputElement().value = '';
        this.cleanOptions();
    }
    cleanOptions() {
        this.getResultList().innerHTML = '';
    }
    emitselect(select) {
        this.clean();
        this.selection.emit(select);
    }
    emitEnter(select) {
        if (select) {
            this.clean();
            this.enter.emit(select);
        }
    }
    getInputElement() {
        return this.el.querySelector(`#${this.id}`);
    }
    initAutocomplete() {
        this.clearList();
        // tslint:disable-next-line:no-unused-expression
        new autoComplete({
            data: {
                src: async () => this.getData()
            },
            sort: (a, b) => {
                if (a.match < b.match) {
                    return -1;
                }
                if (a.match > b.match) {
                    return 1;
                }
                return 0;
            },
            placeHolder: this.placeholder,
            selector: `#${this.id}`,
            threshold: this.threshold,
            searchEngine: 'strict',
            highlight: true,
            maxResults: this.maxResults,
            debounce: this.debounce,
            resultsList: {
                container: () => this.getResultListId(),
                destination: this.getInputElement(),
                position: 'afterend'
            },
            resultItem: ({ match }) => match,
            onSelection: ({ event, selection }) => {
                event.preventDefault();
                this.focusOnInput();
                this.emitselect(selection.value);
            }
        });
    }
    clearList() {
        const list = this.getResultList();
        if (list) {
            list.remove();
        }
    }
    focusOnInput() {
        this.getInputElement().focus();
    }
    getResultList() {
        return this.el.querySelector(`#${this.getResultListId()}`);
    }
    getResultListId() {
        return `${this.id}_results_list`;
    }
    async getData() {
        const autocomplete = this.getInputElement();
        autocomplete.setAttribute('placeholder', 'Loading...');
        const data = typeof this.data === 'function' ? await this.data() : [];
        autocomplete.setAttribute('placeholder', this.placeholder || '');
        return data;
    }
    static get is() { return "dot-autocomplete"; }
    static get originalStyleUrls() { return {
        "$": ["dot-autocomplete.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dot-autocomplete.css"]
    }; }
    static get properties() { return {
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
                "text": "(optional)  Min characters to start search in the autocomplete input"
            },
            "attribute": "threshold",
            "reflect": true,
            "defaultValue": "0"
        },
        "maxResults": {
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
                "text": "(optional)  Max results to show after a autocomplete search"
            },
            "attribute": "max-results",
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
                "text": "(optional) Duraction in ms to start search into the autocomplete"
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
    static get events() { return [{
            "method": "selection",
            "name": "selection",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            }
        }, {
            "method": "enter",
            "name": "enter",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            }
        }, {
            "method": "lostFocus",
            "name": "lostFocus",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "FocusEvent",
                "resolved": "FocusEvent",
                "references": {
                    "FocusEvent": {
                        "location": "global"
                    }
                }
            }
        }]; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "threshold",
            "methodName": "watchThreshold"
        }, {
            "propName": "data",
            "methodName": "watchData"
        }, {
            "propName": "maxResults",
            "methodName": "watchMaxResults"
        }]; }
}
