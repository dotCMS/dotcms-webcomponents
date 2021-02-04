var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-ea58b93f.js';
import { g as getOriginalStatus, f as getDotOptionsFromFieldValue, a as getClassNames, b as getTagError, c as getTagHint, h as getHintId, j as getErrorClass, k as getId, u as updateStatus } from './utils-4c5e19e6.js';
import { c as checkProp } from './checkProp-c5680536.js';
import { g as getDotAttributesFromElement, s as setDotAttributesToElement } from './index-cd656efe.js';
var dotRadioCss = ".dot-radio__items{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}.dot-radio__items label{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex}.dot-radio__items input{margin:0 0.25rem 0 0}";
var DotRadioComponent = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        this.dotValueChange = createEvent(this, "dotValueChange", 7);
        this.dotStatusChange = createEvent(this, "dotStatusChange", 7);
        /** Value set from the ratio option */
        this.value = '';
        /** Name that will be used as ID */
        this.name = '';
        /** (optional) Text to be rendered next to input field */
        this.label = '';
        /** (optional) Hint text that suggest a clue of the field */
        this.hint = '';
        /** (optional) Determine if it is mandatory */
        this.required = false;
        /** (optional) Disables field's interaction */
        this.disabled = false;
        /** (optional) Text that will be shown when required is set and condition is not met */
        this.requiredMessage = '';
        /** Value/Label ratio options separated by comma, to be formatted as: Value|Label */
        this.options = '';
    }
    /**
     * Reset properties of the field, clear value and emit events.
     */
    class_1.prototype.reset = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.value = '';
                this.status = getOriginalStatus(this.isValid());
                this.emitStatusChange();
                this.emitValueChange();
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype.componentWillLoad = function () {
        this.value = this.value || '';
        this.validateProps();
        this.status = getOriginalStatus(this.isValid());
        this.emitStatusChange();
    };
    class_1.prototype.componentDidLoad = function () {
        var _this = this;
        var attrException = ['dottype'];
        var htmlElements = this.el.querySelectorAll('input[type="radio"]');
        setTimeout(function () {
            var attrs = getDotAttributesFromElement(Array.from(_this.el.attributes), attrException);
            htmlElements.forEach(function (htmlElement) {
                setDotAttributesToElement(htmlElement, attrs);
            });
        }, 0);
    };
    class_1.prototype.optionsWatch = function () {
        var validOptions = checkProp(this, 'options');
        this._options = getDotOptionsFromFieldValue(validOptions);
    };
    class_1.prototype.valueWatch = function () {
        this.value = this.value || '';
    };
    class_1.prototype.render = function () {
        var _this = this;
        var classes = getClassNames(this.status, this.isValid(), this.required);
        return (h(Host, { class: Object.assign({}, classes) }, h("dot-label", { label: this.label, required: this.required, name: this.name }, h("div", { class: "dot-radio__items", "aria-describedby": getHintId(this.hint), tabIndex: this.hint ? 0 : null, role: "radiogroup" }, this._options.map(function (item) {
            item.value = item.value.trim();
            return (h("label", null, h("input", { checked: _this.value.indexOf(item.value) >= 0 || null, class: getErrorClass(_this.isValid()), name: getId(_this.name), disabled: _this.disabled || null, onInput: function (event) { return _this.setValue(event); }, type: "radio", value: item.value }), item.label));
        }))), getTagHint(this.hint), getTagError(this.showErrorMessage(), this.getErrorMessage())));
    };
    class_1.prototype.validateProps = function () {
        this.optionsWatch();
    };
    class_1.prototype.isValid = function () {
        return this.required ? !!this.value : true;
    };
    class_1.prototype.showErrorMessage = function () {
        return this.getErrorMessage() && !this.status.dotPristine;
    };
    class_1.prototype.getErrorMessage = function () {
        return this.isValid() ? '' : this.requiredMessage;
    };
    class_1.prototype.setValue = function (event) {
        this.value = event.target.value.trim();
        this.status = updateStatus(this.status, {
            dotTouched: true,
            dotPristine: false,
            dotValid: this.isValid()
        });
        this.emitValueChange();
        this.emitStatusChange();
    };
    class_1.prototype.emitStatusChange = function () {
        this.dotStatusChange.emit({
            name: this.name,
            status: this.status
        });
    };
    class_1.prototype.emitValueChange = function () {
        this.dotValueChange.emit({
            name: this.name,
            value: this.value
        });
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "options": ["optionsWatch"],
                "value": ["valueWatch"]
            };
        },
        enumerable: false,
        configurable: true
    });
    return class_1;
}());
DotRadioComponent.style = dotRadioCss;
export { DotRadioComponent as dot_radio };
