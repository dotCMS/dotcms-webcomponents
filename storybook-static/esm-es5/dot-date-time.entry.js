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
import { c as checkProp, d as dotParseDate } from './checkProp-c5680536.js';
import { D as DOT_ATTR_PREFIX, g as getDotAttributesFromElement, s as setDotAttributesToElement } from './index-cd656efe.js';
var dotDateTimeCss = ".dot-date-time__body{display:-ms-flexbox;display:flex}.dot-date-time__body label{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;-ms-flex-positive:1;flex-grow:1;margin-right:1rem}.dot-date-time__body label:last-child{margin-right:0}.dot-date-time__body label dot-input-calendar{-ms-flex-positive:1;flex-grow:1;margin-left:0.5rem}";
var DATE_SUFFIX = '-date';
var TIME_SUFFIX = '-time';
var DotDateTimeComponent = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        this.dotValueChange = createEvent(this, "dotValueChange", 7);
        this.dotStatusChange = createEvent(this, "dotStatusChange", 7);
        /** Value format yyyy-mm-dd hh:mm:ss e.g., 2005-12-01 15:22:00 */
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
        /** (optional) Min, minimum value that the field will allow to set. Format should be yyyy-mm-dd hh:mm:ss | yyyy-mm-dd | hh:mm:ss */
        this.min = '';
        /** (optional) Max, maximum value that the field will allow to set. Format should be yyyy-mm-dd hh:mm:ss | yyyy-mm-dd | hh:mm:ss */
        this.max = '';
        /** (optional) Step specifies the legal number intervals for the input fields date && time e.g., 2,10 */
        this.step = '1,1';
        /** (optional) The string to use in the date label field */
        this.dateLabel = 'Date';
        /** (optional) The string to use in the time label field */
        this.timeLabel = 'Time';
        this._step = {
            date: null,
            time: null
        };
        this._status = {
            date: null,
            time: null
        };
    }
    /**
     * Reset properties of the filed, clear value and emit events.
     */
    class_1.prototype.reset = function () {
        return __awaiter(this, void 0, void 0, function () {
            var inputs;
            return __generator(this, function (_a) {
                this._status.date = null;
                this._status.time = null;
                inputs = this.el.querySelectorAll('dot-input-calendar');
                inputs.forEach(function (input) {
                    input.reset();
                });
                this.dotValueChange.emit({ name: this.name, value: '' });
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype.componentWillLoad = function () {
        this.validateProps();
    };
    class_1.prototype.valueWatch = function () {
        this.value = checkProp(this, 'value', 'dateTime');
        this._value = dotParseDate(this.value);
    };
    class_1.prototype.minWatch = function () {
        this.min = checkProp(this, 'min', 'dateTime');
        this._minDateTime = dotParseDate(this.min);
    };
    class_1.prototype.maxWatch = function () {
        this.max = checkProp(this, 'max', 'dateTime');
        this._maxDateTime = dotParseDate(this.max);
    };
    class_1.prototype.stepWatch = function () {
        var _a;
        this.step = checkProp(this, 'step') || '1,1';
        _a = this.step.split(','), this._step.date = _a[0], this._step.time = _a[1];
    };
    class_1.prototype.emitValueChange = function (event) {
        var valueEvent = event.detail;
        event.stopImmediatePropagation();
        this.formatValue(valueEvent);
        if (this.isValueComplete()) {
            this.value = this.getValue();
            this.dotValueChange.emit({ name: this.name, value: this.value });
        }
    };
    class_1.prototype.emitStatusChange = function (event) {
        var inputCalendarStatus = event.detail;
        var status;
        event.stopImmediatePropagation();
        this.setStatus(inputCalendarStatus);
        this.setErrorMessageElement(inputCalendarStatus);
        if (this.isStatusComplete()) {
            status = this.statusHandler();
            this.classNames = getClassNames(status, status.dotValid, this.required);
            this.dotStatusChange.emit({ name: this.name, status: status });
        }
    };
    class_1.prototype.componentDidLoad = function () {
        this.setDotAttributes();
    };
    class_1.prototype.render = function () {
        return (h(Host, { class: Object.assign({}, this.classNames) }, h("dot-label", { label: this.label, required: this.required, name: this.name }, h("div", { class: "dot-date-time__body", "aria-describedby": getHintId(this.hint), tabIndex: this.hint ? 0 : null }, h("label", null, this.dateLabel, h("dot-input-calendar", { disabled: this.disabled, type: "date", name: this.name + DATE_SUFFIX, value: this._value.date, required: this.required, min: this._minDateTime.date, max: this._maxDateTime.date, step: this._step.date })), h("label", null, this.timeLabel, h("dot-input-calendar", { disabled: this.disabled, type: "time", name: this.name + TIME_SUFFIX, value: this._value.time, required: this.required, min: this._minDateTime.time, max: this._maxDateTime.time, step: this._step.time })))), getTagHint(this.hint), this.errorMessageElement));
    };
    class_1.prototype.setDotAttributes = function () {
        var _this = this;
        var htmlDateElement = this.el.querySelector('input[type="date"]');
        var htmlTimeElement = this.el.querySelector('input[type="time"]');
        var attrException = ['dottype', 'dotstep', 'dotmin', 'dotmax', 'dotvalue'];
        setTimeout(function () {
            var attrs = Array.from(_this.el.attributes);
            attrs.forEach(function (_a) {
                var name = _a.name, value = _a.value;
                var attr = name.replace(DOT_ATTR_PREFIX, '');
                if (_this[attr]) {
                    _this[attr] = value;
                }
            });
            attrs = getDotAttributesFromElement(Array.from(_this.el.attributes), attrException);
            setDotAttributesToElement(htmlDateElement, attrs);
            setDotAttributesToElement(htmlTimeElement, attrs);
        }, 0);
    };
    class_1.prototype.validateProps = function () {
        this.minWatch();
        this.maxWatch();
        this.stepWatch();
        this.valueWatch();
    };
    // tslint:disable-next-line:cyclomatic-complexity
    class_1.prototype.statusHandler = function () {
        return {
            dotTouched: this._status.date.dotTouched || this._status.time.dotTouched,
            dotValid: this._status.date.dotValid && this._status.time.dotValid,
            dotPristine: this._status.date.dotPristine && this._status.time.dotPristine
        };
    };
    class_1.prototype.formatValue = function (event) {
        if (event.name.indexOf(DATE_SUFFIX) >= 0) {
            this._value.date = event.value;
        }
        else {
            this._value.time = event.value;
        }
    };
    class_1.prototype.getValue = function () {
        return !!this._value.date && !!this._value.time
            ? this._value.date + " " + this._value.time
            : '';
    };
    class_1.prototype.setStatus = function (event) {
        if (event.name.indexOf(DATE_SUFFIX) >= 0) {
            this._status.date = event.status;
        }
        else {
            this._status.time = event.status;
        }
    };
    class_1.prototype.isValueComplete = function () {
        return !!this._value.time && !!this._value.date;
    };
    class_1.prototype.isStatusComplete = function () {
        return this._status.date && this._status.time;
    };
    class_1.prototype.isValid = function () {
        return this.isStatusComplete() ? (this.isStatusInRange() ? true : false) : true;
    };
    class_1.prototype.isStatusInRange = function () {
        return this._status.time.isValidRange && this._status.date.isValidRange;
    };
    class_1.prototype.setErrorMessageElement = function (statusEvent) {
        if (this.isStatusComplete()) {
            this.errorMessageElement = getTagError(!this.statusHandler().dotValid && !this.statusHandler().dotPristine, this.getErrorMessage());
        }
        else {
            this.errorMessageElement = getTagError(!statusEvent.status.dotPristine, this.getErrorMessage());
        }
    };
    class_1.prototype.getErrorMessage = function () {
        return !!this.getValue()
            ? this.isValid()
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
                "value": ["valueWatch"],
                "min": ["minWatch"],
                "max": ["maxWatch"],
                "step": ["stepWatch"]
            };
        },
        enumerable: false,
        configurable: true
    });
    return class_1;
}());
DotDateTimeComponent.style = dotDateTimeCss;
export { DotDateTimeComponent as dot_date_time };
