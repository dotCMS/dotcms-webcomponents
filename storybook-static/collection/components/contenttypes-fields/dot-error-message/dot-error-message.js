import { Component, h } from '@stencil/core';
export class DotErrorMessageComponent {
    render() {
        return h("slot", null);
    }
    static get is() { return "dot-error-message"; }
    static get originalStyleUrls() { return {
        "$": ["dot-error-message.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dot-error-message.css"]
    }; }
}
