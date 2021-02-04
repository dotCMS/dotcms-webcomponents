'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-674736da.js');

const dotErrorMessageCss = "dot-error-message:not(:empty){border:solid 1px currentColor;color:indianred;display:block;padding:0.5rem 0.75rem}";

const DotErrorMessageComponent = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    render() {
        return index.h("slot", null);
    }
};
DotErrorMessageComponent.style = dotErrorMessageCss;

exports.dot_error_message = DotErrorMessageComponent;
