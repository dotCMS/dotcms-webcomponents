import { r as registerInstance, h } from './index-ea58b93f.js';
var dotErrorMessageCss = "dot-error-message:not(:empty){border:solid 1px currentColor;color:indianred;display:block;padding:0.5rem 0.75rem}";
var DotErrorMessageComponent = /** @class */ (function () {
    function DotErrorMessageComponent(hostRef) {
        registerInstance(this, hostRef);
    }
    DotErrorMessageComponent.prototype.render = function () {
        return h("slot", null);
    };
    return DotErrorMessageComponent;
}());
DotErrorMessageComponent.style = dotErrorMessageCss;
export { DotErrorMessageComponent as dot_error_message };
