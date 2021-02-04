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
import { a as getClassNames, c as getTagHint, h as getHintId, b as getTagError } from './utils-4c5e19e6.js';
import { c as checkProp } from './checkProp-c5680536.js';
import { g as getDotAttributesFromElement, s as setDotAttributesToElement } from './index-cd656efe.js';
var dotDateCss = "";
var DotDateComponent = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        this.dotValueChange = createEvent(this, "dotValueChange", 7);
        this.dotStatusChange = createEvent(this, "dotStatusChange", 7);
        /** Value format yyyy-mm-dd  e.g., 2005-12-01 */
        this.value = '';
        /** Name that will be used as ID */
        this.name = '';
        /** (optional) Text to be rendered next to input field */
        this.label = '';
        /** (optional) Hint text that suggest a clue of the field */
        this.hint = '';
        /** (optional) Determine if it is mandatory */
        this.required = false;
        /** (optional) Text that be shown when required is set and condition not met */
        this.requiredMessage = 'This field is required';
        /** (optional) Text that be shown when min or max are set and condition not met */
        this.validationMessage = "The field doesn't comply with the specified format";
        /** (optional) Disables field's interaction */
        this.disabled = false;
        /** (optional) Min, minimum value that the field will allow to set. Format should be yyyy-mm-dd */
        this.min = '';
        /** (optional) Max, maximum value that the field will allow to set. Format should be yyyy-mm-dd */
        this.max = '';
        /** (optional) Step specifies the legal number intervals for the input field */
        this.step = '1';
    }
    /**
     * Reset properties of the field, clear value and emit events.
     */
    class_1.prototype.reset = function () {
        return __awaiter(this, void 0, void 0, function () {
            var input;
            return __generator(this, function (_a) {
                input = this.el.querySelector('dot-input-calendar');
                input.reset();
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype.componentWillLoad = function () {
        this.validateProps();
    };
    class_1.prototype.componentDidLoad = function () {
        var _this = this;
        var attrException = ['dottype'];
        var htmlElement = this.el.querySelector('input[type="date"]');
        setTimeout(function () {
            var attrs = getDotAttributesFromElement(Array.from(_this.el.attributes), attrException);
            setDotAttributesToElement(htmlElement, attrs);
        }, 0);
    };
    class_1.prototype.minWatch = function () {
        this.min = checkProp(this, 'min', 'date');
    };
    class_1.prototype.maxWatch = function () {
        this.max = checkProp(this, 'max', 'date');
    };
    class_1.prototype.emitValueChange = function (event) {
        event.stopImmediatePropagation();
        var valueEvent = event.detail;
        this.value = valueEvent.value;
        this.dotValueChange.emit(valueEvent);
    };
    class_1.prototype.emitStatusChange = function (event) {
        event.stopImmediatePropagation();
        var inputCalendarStatus = event.detail;
        this.classNames = getClassNames(inputCalendarStatus.status, inputCalendarStatus.status.dotValid, this.required);
        this.setErrorMessageElement(inputCalendarStatus);
        this.dotStatusChange.emit({
            name: inputCalendarStatus.name,
            status: inputCalendarStatus.status
        });
    };
    class_1.prototype.render = function () {
        return (h(Host, { class: Object.assign({}, this.classNames) }, h("dot-label", { label: this.label, required: this.required, name: this.name }, h("dot-input-calendar", { "aria-describedby": getHintId(this.hint), tabIndex: this.hint ? 0 : null, disabled: this.disabled, type: "date", name: this.name, value: this.value, required: this.required, min: this.min, max: this.max, step: this.step })), getTagHint(this.hint), this.errorMessageElement));
    };
    class_1.prototype.validateProps = function () {
        this.minWatch();
        this.maxWatch();
    };
    class_1.prototype.setErrorMessageElement = function (statusEvent) {
        this.errorMessageElement = getTagError(!statusEvent.status.dotValid && !statusEvent.status.dotPristine, this.getErrorMessage(statusEvent));
    };
    class_1.prototype.getErrorMessage = function (statusEvent) {
        return !!this.value
            ? statusEvent.isValidRange
                ? ''
                : this.validationMessage
            : this.requiredMessage;
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "min": ["minWatch"],
                "max": ["maxWatch"]
            };
        },
        enumerable: false,
        configurable: true
    });
    return class_1;
}());
DotDateComponent.style = dotDateCss;
export { DotDateComponent as dot_date };
