'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-674736da.js');
const utils = require('./utils-e42aadb4.js');

const dotLabelCss = ".dot-field__error-message,.dot-field__hint{display:block;font-size:0.75rem;line-height:1rem;margin-top:0.25rem;position:absolute;-webkit-transition:opacity 200ms ease;transition:opacity 200ms ease}.dot-field__error-message{color:red;opacity:0}.dot-invalid.dot-dirty>.dot-field__hint{opacity:0}.dot-invalid.dot-dirty>.dot-field__error-message{color:red;opacity:1}dot-label>label{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}dot-label>label .dot-label__text{line-height:1.25rem;margin-bottom:0.25rem}";

const DotLabelComponent = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        /** (optional) Field name */
        this.name = '';
        /** (optional) Text to be rendered */
        this.label = '';
        /** (optional) Determine if it is mandatory */
        this.required = false;
    }
    render() {
        return (index.h("label", { class: "dot-label", id: utils.getLabelId(this.name) }, this.label && index.h("span", { class: "dot-label__text" }, this.label, this.required ? index.h("span", { class: "dot-label__required-mark" }, "*") : null), index.h("slot", null)));
    }
};
DotLabelComponent.style = dotLabelCss;

exports.dot_label = DotLabelComponent;
