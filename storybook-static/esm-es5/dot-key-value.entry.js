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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-ea58b93f.js';
import { f as getDotOptionsFromFieldValue, g as getOriginalStatus, a as getClassNames, b as getTagError, c as getTagHint, h as getHintId, u as updateStatus, d as getStringFromDotKeyArray } from './utils-4c5e19e6.js';
import { c as checkProp } from './checkProp-c5680536.js';
var dotKeyValueCss = "";
var mapToKeyValue = function (_a) {
    var label = _a.label, value = _a.value;
    return {
        key: label,
        value: value
    };
};
var DotKeyValueComponent = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        this.dotValueChange = createEvent(this, "dotValueChange", 7);
        this.dotStatusChange = createEvent(this, "dotStatusChange", 7);
        /** Value of the field */
        this.value = '';
        /** Name that will be used as ID */
        this.name = '';
        /** (optional) Text to be rendered next to input field */
        this.label = '';
        /** (optional) Hint text that suggest a clue of the field */
        this.hint = '';
        /** (optional) Determine if it is mandatory */
        this.required = false;
        /** (optional) Text that will be shown when required is set and condition is not met */
        this.requiredMessage = 'This field is required';
        /** (optional) Disables field's interaction */
        this.disabled = false;
        this.items = [];
    }
    class_1.prototype.valueWatch = function () {
        this.value = checkProp(this, 'value', 'string');
        this.items = getDotOptionsFromFieldValue(this.value).map(mapToKeyValue);
    };
    /**
     * Reset properties of the field, clear value and emit events.
     */
    class_1.prototype.reset = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.items = [];
                this.value = '';
                this.status = getOriginalStatus(this.isValid());
                this.emitChanges();
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype.deleteItemHandler = function (event) {
        event.stopImmediatePropagation();
        this.items = this.items.filter(function (_item, index) { return index !== event.detail; });
        this.refreshStatus();
        this.emitChanges();
    };
    class_1.prototype.addItemHandler = function (_a) {
        var detail = _a.detail;
        this.items = __spreadArrays(this.items, [detail]);
        this.refreshStatus();
        this.emitChanges();
    };
    class_1.prototype.componentWillLoad = function () {
        this.validateProps();
        this.setOriginalStatus();
        this.emitStatusChange();
    };
    class_1.prototype.render = function () {
        var classes = getClassNames(this.status, this.isValid(), this.required);
        return (h(Host, { class: Object.assign({}, classes) }, h("dot-label", { "aria-describedby": getHintId(this.hint), tabIndex: this.hint ? 0 : null, label: this.label, required: this.required, name: this.name }, h("key-value-form", { onLostFocus: this.blurHandler.bind(this), "add-button-label": this.formAddButtonLabel, disabled: this.isDisabled(), "key-label": this.formKeyLabel, "key-placeholder": this.formKeyPlaceholder, "value-label": this.formValueLabel, "value-placeholder": this.formValuePlaceholder }), h("key-value-table", { onClick: function (e) {
                e.preventDefault();
            }, "button-label": this.listDeleteLabel, disabled: this.isDisabled(), items: this.items })), getTagHint(this.hint), getTagError(this.showErrorMessage(), this.getErrorMessage())));
    };
    class_1.prototype.isDisabled = function () {
        return this.disabled || null;
    };
    class_1.prototype.blurHandler = function () {
        if (!this.status.dotTouched) {
            this.status = updateStatus(this.status, {
                dotTouched: true
            });
            this.emitStatusChange();
        }
    };
    class_1.prototype.validateProps = function () {
        this.valueWatch();
    };
    class_1.prototype.setOriginalStatus = function () {
        this.status = getOriginalStatus(this.isValid());
    };
    class_1.prototype.isValid = function () {
        return !(this.required && !this.items.length);
    };
    class_1.prototype.showErrorMessage = function () {
        return this.getErrorMessage() && !this.status.dotPristine;
    };
    class_1.prototype.getErrorMessage = function () {
        return this.isValid() ? '' : this.requiredMessage;
    };
    class_1.prototype.refreshStatus = function () {
        this.status = updateStatus(this.status, {
            dotTouched: true,
            dotPristine: false,
            dotValid: this.isValid()
        });
    };
    class_1.prototype.emitStatusChange = function () {
        this.dotStatusChange.emit({
            name: this.name,
            status: this.status
        });
    };
    class_1.prototype.emitValueChange = function () {
        var returnedValue = getStringFromDotKeyArray(this.items);
        this.dotValueChange.emit({
            name: this.name,
            value: returnedValue
        });
    };
    class_1.prototype.emitChanges = function () {
        this.emitStatusChange();
        this.emitValueChange();
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "value": ["valueWatch"]
            };
        },
        enumerable: false,
        configurable: true
    });
    return class_1;
}());
DotKeyValueComponent.style = dotKeyValueCss;
export { DotKeyValueComponent as dot_key_value };
