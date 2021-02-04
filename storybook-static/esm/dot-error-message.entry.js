import { r as registerInstance, h } from './index-ea58b93f.js';

const dotErrorMessageCss = "dot-error-message:not(:empty){border:solid 1px currentColor;color:indianred;display:block;padding:0.5rem 0.75rem}";

const DotErrorMessageComponent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return h("slot", null);
    }
};
DotErrorMessageComponent.style = dotErrorMessageCss;

export { DotErrorMessageComponent as dot_error_message };
