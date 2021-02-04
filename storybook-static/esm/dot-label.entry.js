import { r as registerInstance, h } from './index-ea58b93f.js';
import { m as getLabelId } from './utils-4c5e19e6.js';

const dotLabelCss = ".dot-field__error-message,.dot-field__hint{display:block;font-size:0.75rem;line-height:1rem;margin-top:0.25rem;position:absolute;-webkit-transition:opacity 200ms ease;transition:opacity 200ms ease}.dot-field__error-message{color:red;opacity:0}.dot-invalid.dot-dirty>.dot-field__hint{opacity:0}.dot-invalid.dot-dirty>.dot-field__error-message{color:red;opacity:1}dot-label>label{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}dot-label>label .dot-label__text{line-height:1.25rem;margin-bottom:0.25rem}";

const DotLabelComponent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /** (optional) Field name */
        this.name = '';
        /** (optional) Text to be rendered */
        this.label = '';
        /** (optional) Determine if it is mandatory */
        this.required = false;
    }
    render() {
        return (h("label", { class: "dot-label", id: getLabelId(this.name) }, this.label && h("span", { class: "dot-label__text" }, this.label, this.required ? h("span", { class: "dot-label__required-mark" }, "*") : null), h("slot", null)));
    }
};
DotLabelComponent.style = dotLabelCss;

export { DotLabelComponent as dot_label };
