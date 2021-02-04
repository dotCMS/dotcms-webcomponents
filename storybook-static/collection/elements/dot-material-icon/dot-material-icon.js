import { Component, Prop, State, Listen, Element, h, Event } from '@stencil/core';
import { MaterialIconClasses } from './material-icon-classes';
import '@material/mwc-icon';
export class DotMaterialIcon {
    constructor() {
        this.suggestionArr = [];
        /** Value for input placeholder */
        this.placeholder = '';
        /** Name that will be used as ID */
        this.name = '';
        /** Value set from the dropdown option */
        this.value = '';
        /** Color value set from the input */
        this.colorValue = '#000';
        /** Values that the auto-complete textbox should search for */
        this.suggestionlist = MaterialIconClasses;
        this.findMatch = (searchTerm) => {
            return this.suggestionlist.filter((term) => term.slice(0, searchTerm.length) === searchTerm && term !== searchTerm);
        };
        this.onInput = (e) => {
            this.value = e.target.value;
            this.suggestionArr = this.findMatch(this.value);
            this.showSuggestions = true;
        };
        this.onChangeColor = (e) => {
            this.colorValue = e.target.value;
            this.emitValues();
        };
        this.onFocus = (resetSearch) => {
            this.showSuggestions = true;
            this.selectedSuggestionIndex = undefined;
            const match = resetSearch ? '' : this.value;
            this.suggestionArr = this.findMatch(match);
            if (resetSearch) {
                const input = this.element.shadowRoot.querySelector('.dot-material-icon__input');
                input.focus();
            }
        };
        this.onKeyDown = (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    if (this.suggestionArr.length > 0) {
                        this.selectedSuggestionIndex =
                            this.selectedSuggestionIndex === undefined ||
                                this.selectedSuggestionIndex === 0
                                ? this.suggestionArr.length - 1
                                : this.selectedSuggestionIndex - 1;
                        this.scrollIntoSelectedOption(this.selectedSuggestionIndex);
                    }
                    break;
                case 'ArrowDown':
                    if (this.suggestionArr.length > 0) {
                        this.selectedSuggestionIndex =
                            this.selectedSuggestionIndex === undefined ||
                                this.selectedSuggestionIndex === this.suggestionArr.length - 1
                                ? 0
                                : this.selectedSuggestionIndex + 1;
                        this.scrollIntoSelectedOption(this.selectedSuggestionIndex);
                    }
                    break;
                default:
                    break;
            }
        };
        this.onKeyPress = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (this.selectedSuggestionIndex !== undefined) {
                    this.onSelect(this.suggestionArr[this.selectedSuggestionIndex]);
                }
            }
        };
        this.onSelect = (selection) => {
            this.value = selection;
            this.selectedSuggestionIndex = undefined;
            this.showSuggestions = false;
            this.emitValues();
        };
        this.getSuggestionElement = (suggestion) => {
            const isSelected = this.selectedSuggestionIndex !== undefined &&
                suggestion === this.suggestionArr[this.selectedSuggestionIndex];
            return (h("li", { role: "option", class: 'dot-material-icon__option ' +
                    (isSelected ? 'dot-material-icon__option-selected' : ''), onClick: () => this.onSelect(suggestion) },
                h("label", { id: suggestion + '_Id' },
                    h("mwc-icon", { "aria-labelledby": suggestion + '_Id' }, suggestion),
                    suggestion)));
        };
        this.emitValues = () => {
            this.dotValueChange.emit({
                colorValue: this.colorValue,
                name: this.name,
                value: this.value,
            });
        };
    }
    handleWindowClick(e) {
        if (!this.element.contains(e.target)) {
            this.showSuggestions = false;
            this.selectedSuggestionIndex = undefined;
        }
    }
    componentWillLoad() {
        this.emitValues();
    }
    render() {
        return (h("div", { class: "dot-material-icon" },
            h("div", { class: "dot-material-icon__select-container" },
                h("input", { class: "dot-material-icon__input", type: "text", role: "searchbox", placeholder: this.placeholder, value: this.value, onInput: (e) => this.onInput(e), onClick: () => this.onFocus(false), onKeyDown: (e) => this.onKeyDown(e), onKeyPress: (e) => this.onKeyPress(e) }),
                h("button", { class: "dot-material-icon__button", role: "button", onClick: () => this.onFocus(true) },
                    h("mwc-icon", null, "arrow_drop_down")),
                h("ul", { class: "dot-material-icon__list", role: "listbox", hidden: !this.showSuggestions }, this.suggestionArr.map((suggestion) => this.getSuggestionElement(suggestion)))),
            h("label", { htmlFor: "iconColor", class: "dot-material-icon__color-label" }, "Color"),
            h("input", { id: "iconColor", type: "color", name: "icon-color", role: "textbox", onInput: (e) => this.onChangeColor(e), value: this.colorValue })));
    }
    scrollIntoSelectedOption(index) {
        const optionsList = this.element.shadowRoot.querySelectorAll('.dot-material-icon__option');
        optionsList[index].scrollIntoView({
            behavior: 'smooth'
        });
    }
    static get is() { return "dot-material-icon"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["dot-material-icon.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dot-material-icon.css"]
    }; }
    static get properties() { return {
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
                "text": "Value for input placeholder"
            },
            "attribute": "placeholder",
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
                "text": "Value set from the dropdown option"
            },
            "attribute": "value",
            "reflect": true,
            "defaultValue": "''"
        },
        "colorValue": {
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
                "text": "Color value set from the input"
            },
            "attribute": "color-value",
            "reflect": true,
            "defaultValue": "'#000'"
        },
        "suggestionlist": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "string[]",
                "resolved": "string[]",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Values that the auto-complete textbox should search for"
            },
            "defaultValue": "MaterialIconClasses"
        }
    }; }
    static get states() { return {
        "showSuggestions": {},
        "suggestionArr": {},
        "selectedSuggestionIndex": {}
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
                "original": "{ name: string; value: string; colorValue: string }",
                "resolved": "{ name: string; value: string; colorValue: string; }",
                "references": {}
            }
        }]; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "click",
            "method": "handleWindowClick",
            "target": "window",
            "capture": false,
            "passive": false
        }]; }
}
