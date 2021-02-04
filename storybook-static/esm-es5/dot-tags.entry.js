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
import { g as getOriginalStatus, a as getClassNames, b as getTagError, c as getTagHint, h as getHintId, j as getErrorClass, u as updateStatus, e as isStringType } from './utils-4c5e19e6.js';
import { c as checkProp } from './checkProp-c5680536.js';
var dotTagsCss = "dot-tags .dot-tags__container{display:-ms-flexbox;display:flex;-ms-flex-align:start;align-items:flex-start;border:solid 1px lightgray}dot-tags .dot-tags__container dot-autocomplete{margin:0.5rem 1rem 0.5rem 0.5rem}dot-tags .dot-tags__container .dot-tags__chips{margin:0.5rem 1rem 0 0}dot-tags .dot-tags__container dot-chip{border:solid 1px #ccc;display:inline-block;margin:0 0.5rem 0.5rem 0;padding:0.2rem}dot-tags button{border:0}";
var DotTagsComponent = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        this.dotValueChange = createEvent(this, "dotValueChange", 7);
        this.dotStatusChange = createEvent(this, "dotStatusChange", 7);
        /** Value formatted splitted with a comma, for example: tag-1,tag-2 */
        this.value = '';
        /** Name that will be used as ID */
        this.name = '';
        /** (optional) Text to be rendered next to input field */
        this.label = '';
        /** (optional) Hint text that suggest a clue of the field */
        this.hint = '';
        /** (optional) text to show when no value is set */
        this.placeholder = '';
        /** (optional) Determine if it is mandatory */
        this.required = false;
        /** (optional) Text that be shown when required is set and value is not set */
        this.requiredMessage = 'This field is required';
        /** (optional) Disables field's interaction */
        this.disabled = false;
        /** Min characters to start search in the autocomplete input */
        this.threshold = 0;
        /** Duraction in ms to start search into the autocomplete */
        this.debounce = 300;
        /** Function or array of string to get the data to use for the autocomplete search */
        this.data = null;
    }
    /**
     * Reset properties of the filed, clear value and emit events.
     */
    class_1.prototype.reset = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.value = '';
                this.status = getOriginalStatus(this.isValid());
                this.emitChanges();
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype.valueWatch = function () {
        this.value = checkProp(this, 'value', 'string');
    };
    class_1.prototype.componentWillLoad = function () {
        this.status = getOriginalStatus(this.isValid());
        this.validateProps();
        this.emitStatusChange();
    };
    class_1.prototype.render = function () {
        var _this = this;
        var classes = getClassNames(this.status, this.isValid(), this.required);
        return (h(Host, { class: Object.assign({}, classes) }, h("dot-label", { label: this.label, required: this.required, name: this.name }, h("div", { "aria-describedby": getHintId(this.hint), tabIndex: this.hint ? 0 : null, class: "dot-tags__container" }, h("dot-autocomplete", { class: getErrorClass(this.status.dotValid), data: this.data, debounce: this.debounce, disabled: this.isDisabled(), onEnter: this.onEnterHandler.bind(this), onLostFocus: this.blurHandler.bind(this), onSelection: this.onSelectHandler.bind(this), placeholder: this.placeholder || null, threshold: this.threshold }), h("div", { class: "dot-tags__chips" }, this.getValues().map(function (tagLab) { return (h("dot-chip", { disabled: _this.isDisabled(), label: tagLab, onRemove: _this.removeTag.bind(_this) })); })))), getTagHint(this.hint), getTagError(this.showErrorMessage(), this.getErrorMessage())));
    };
    class_1.prototype.addTag = function (label) {
        var values = this.getValues();
        if (!values.includes(label)) {
            values.push(label);
            this.value = values.join(',');
            this.updateStatus();
            this.emitChanges();
        }
    };
    class_1.prototype.blurHandler = function () {
        if (!this.status.dotTouched) {
            this.status = updateStatus(this.status, {
                dotTouched: true
            });
            this.emitStatusChange();
        }
    };
    class_1.prototype.emitChanges = function () {
        this.emitStatusChange();
        this.emitValueChange();
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
    class_1.prototype.getErrorMessage = function () {
        return this.isValid() ? '' : this.requiredMessage;
    };
    class_1.prototype.getValues = function () {
        return isStringType(this.value) ? this.value.split(',') : [];
    };
    class_1.prototype.isDisabled = function () {
        return this.disabled || null;
    };
    class_1.prototype.isValid = function () {
        return !this.required || (this.required && !!this.value);
    };
    class_1.prototype.onEnterHandler = function (_a) {
        var _this = this;
        var _b = _a.detail, detail = _b === void 0 ? '' : _b;
        detail.split(',').forEach(function (label) {
            _this.addTag(label.trim());
        });
    };
    class_1.prototype.onSelectHandler = function (_a) {
        var _b = _a.detail, detail = _b === void 0 ? '' : _b;
        var value = detail.replace(',', ' ').replace(/\s+/g, ' ');
        this.addTag(value);
    };
    class_1.prototype.removeTag = function (event) {
        var values = this.getValues().filter(function (item) { return item !== event.detail; });
        this.value = values.join(',');
        this.updateStatus();
        this.emitChanges();
    };
    class_1.prototype.showErrorMessage = function () {
        return this.getErrorMessage() && !this.status.dotPristine;
    };
    class_1.prototype.updateStatus = function () {
        this.status = updateStatus(this.status, {
            dotTouched: true,
            dotPristine: false,
            dotValid: this.isValid()
        });
    };
    class_1.prototype.validateProps = function () {
        this.valueWatch();
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
DotTagsComponent.style = dotTagsCss;
export { DotTagsComponent as dot_tags };
