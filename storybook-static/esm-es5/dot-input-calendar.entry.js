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
import { r as registerInstance, c as createEvent, h, g as getElement } from './index-ea58b93f.js';
import { g as getOriginalStatus, j as getErrorClass, k as getId, u as updateStatus } from './utils-4c5e19e6.js';
var dotInputCalendarCss = "dot-input-calendar{display:-ms-flexbox;display:flex}dot-input-calendar input{-ms-flex-positive:1;flex-grow:1}";
var DotInputCalendarComponent = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        this._dotValueChange = createEvent(this, "_dotValueChange", 7);
        this._dotStatusChange = createEvent(this, "_dotStatusChange", 7);
        /** Value specifies the value of the <input> element */
        this.value = '';
        /** Name that will be used as ID */
        this.name = '';
        /** (optional) Determine if it is mandatory */
        this.required = false;
        /** (optional) Disables field's interaction */
        this.disabled = false;
        /** (optional) Min, minimum value that the field will allow to set, expect a Date Format. */
        this.min = '';
        /** (optional) Max, maximum value that the field will allow to set, expect a Date Format */
        this.max = '';
        /** (optional) Step specifies the legal number intervals for the input field */
        this.step = '1';
        /** type specifies the type of <input> element to display */
        this.type = '';
    }
    /**
     * Reset properties of the field, clear value and emit events.
     */
    class_1.prototype.reset = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.value = '';
                this.status = getOriginalStatus(this.isValid());
                this.emitValueChange();
                this.emitStatusChange();
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype.componentWillLoad = function () {
        this.status = getOriginalStatus(this.isValid());
        this.emitStatusChange();
    };
    class_1.prototype.render = function () {
        var _this = this;
        return (h("input", { class: getErrorClass(this.status.dotValid), disabled: this.disabled || null, id: getId(this.name), onBlur: function () { return _this.blurHandler(); }, onInput: function (event) { return _this.setValue(event); }, required: this.required || null, type: this.type, min: this.min, max: this.max, step: this.step, value: this.value }));
    };
    class_1.prototype.isValid = function () {
        return this.isValueInRange() && this.isRequired();
    };
    class_1.prototype.isRequired = function () {
        return this.required ? !!this.value : true;
    };
    class_1.prototype.isValueInRange = function () {
        return this.isInMaxRange() && this.isInMinRange();
    };
    class_1.prototype.isInMinRange = function () {
        return !!this.min ? this.value >= this.min : true;
    };
    class_1.prototype.isInMaxRange = function () {
        return !!this.max ? this.value <= this.max : true;
    };
    class_1.prototype.blurHandler = function () {
        if (!this.status.dotTouched) {
            this.status = updateStatus(this.status, {
                dotTouched: true
            });
            this.emitStatusChange();
        }
    };
    class_1.prototype.setValue = function (event) {
        this.value = event.target.value.toString();
        this.status = updateStatus(this.status, {
            dotTouched: true,
            dotPristine: false,
            dotValid: this.isValid()
        });
        this.emitValueChange();
        this.emitStatusChange();
    };
    class_1.prototype.emitStatusChange = function () {
        this._dotStatusChange.emit({
            name: this.name,
            status: this.status,
            isValidRange: this.isValueInRange()
        });
    };
    class_1.prototype.emitValueChange = function () {
        this._dotValueChange.emit({
            name: this.name,
            value: this.formattedValue()
        });
    };
    class_1.prototype.formattedValue = function () {
        return this.value.length === 5 ? this.value + ":00" : this.value;
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    return class_1;
}());
DotInputCalendarComponent.style = dotInputCalendarCss;
export { DotInputCalendarComponent as dot_input_calendar };
