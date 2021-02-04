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
import { r as registerInstance, h, H as Host, g as getElement } from './index-ea58b93f.js';
import { f as fallbackErrorMessages, D as DotUploadService } from './dot-upload.service-e9475d4b.js';
import { g as getOriginalStatus, u as updateStatus, a as getClassNames } from './utils-4c5e19e6.js';
import { a as getErrorMessage, b as getFieldsFromLayout, f as fieldCustomProcess } from './index-cd656efe.js';
var dotFormCss = "dot-form{display:block}dot-form>form label{margin:0;padding:0}dot-form>form dot-form-column>*{display:block;margin:2rem 0}dot-form>form dot-form-column>*:first-child{margin-top:0}dot-form>form dot-form-column>*:last-child{margin-bottom:0}dot-form>form .dot-form__buttons{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-pack:end;justify-content:flex-end}dot-form>form .dot-form__buttons button:last-child{margin-left:1rem}";
var SUBMIT_FORM_API_URL = '/api/v1/workflow/actions/default/fire/NEW';
var DotFormComponent = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        /** (optional) Text to be rendered on Reset button */
        this.resetLabel = 'Reset';
        /** (optional) Text to be rendered on Submit button */
        this.submitLabel = 'Submit';
        /** Layout metada to be rendered */
        this.layout = [];
        /** Content type variable name */
        this.variable = '';
        this.status = getOriginalStatus();
        this.errorMessage = '';
        this.uploadFileInProgress = false;
        this.fieldsStatus = {};
        this.value = {};
    }
    /**
     * Update the form value when valueChange in any of the child fields.
     *
     * @param CustomEvent event
     * @memberof DotFormComponent
     */
    class_1.prototype.onValueChange = function (event) {
        var _this = this;
        var tagName = event.target.tagName;
        var _a = event.detail, name = _a.name, value = _a.value;
        var process = fieldCustomProcess[tagName];
        if (tagName === 'DOT-BINARY-FILE' && value) {
            this.uploadFile(event).then(function (tempFile) {
                _this.value[name] = tempFile && tempFile.id;
            });
        }
        else {
            this.value[name] = process ? process(value) : value;
        }
    };
    /**
     * Update the form status when dotStatusChange in any of the child fields
     *
     * @param CustomEvent event
     * @memberof DotFormComponent
     */
    class_1.prototype.onStatusChange = function (_a) {
        var detail = _a.detail;
        this.fieldsStatus[detail.name] = detail.status;
        this.status = updateStatus(this.status, {
            dotTouched: this.getTouched(),
            dotPristine: this.getStatusValueByName('dotPristine'),
            dotValid: this.getStatusValueByName('dotValid')
        });
    };
    class_1.prototype.layoutWatch = function () {
        this.value = this.getUpdateValue();
    };
    class_1.prototype.fieldsToShowWatch = function () {
        this.value = this.getUpdateValue();
    };
    class_1.prototype.componentWillLoad = function () {
        this.value = this.getUpdateValue();
    };
    class_1.prototype.render = function () {
        var _this = this;
        var classes = getClassNames(this.status, this.status.dotValid);
        return (h(Host, { class: Object.assign({}, classes) }, h("form", { onSubmit: this.handleSubmit.bind(this) }, this.layout.map(function (row) { return (h("dot-form-row", { row: row, "fields-to-show": _this.fieldsToShow })); }), h("div", { class: "dot-form__buttons" }, h("button", { type: "reset", onClick: function () { return _this.resetForm(); } }, this.resetLabel), h("button", { type: "submit", disabled: !this.status.dotValid || this.uploadFileInProgress }, this.submitLabel))), h("dot-error-message", null, this.errorMessage)));
    };
    class_1.prototype.getStatusValueByName = function (name) {
        return Object.values(this.fieldsStatus)
            .map(function (field) { return field[name]; })
            .every(function (item) { return item === true; });
    };
    class_1.prototype.getTouched = function () {
        return Object.values(this.fieldsStatus)
            .map(function (field) { return field.dotTouched; })
            .includes(true);
    };
    class_1.prototype.handleSubmit = function (event) {
        var _this = this;
        event.preventDefault();
        fetch(SUBMIT_FORM_API_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contentlet: Object.assign({ contentType: this.variable }, this.value)
            })
        })
            .then(function (response) { return __awaiter(_this, void 0, void 0, function () {
            var error, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(response.status !== 200)) return [3 /*break*/, 2];
                        _a = {};
                        return [4 /*yield*/, response.text()];
                    case 1:
                        error = (_a.message = _b.sent(),
                            _a.status = response.status,
                            _a);
                        throw error;
                    case 2: return [2 /*return*/, response.json()];
                }
            });
        }); })
            .then(function (jsonResponse) {
            var contentlet = jsonResponse.entity;
            _this.runSuccessCallback(contentlet);
        })
            .catch(function (_a) {
            var message = _a.message, status = _a.status;
            _this.errorMessage = getErrorMessage(message) || fallbackErrorMessages[status];
        });
    };
    class_1.prototype.runSuccessCallback = function (contentlet) {
        var successCallback = this.getSuccessCallback();
        if (successCallback) {
            return function () {
                // tslint:disable-next-line:no-eval
                return eval(successCallback);
            }.call({ contentlet: contentlet });
        }
    };
    class_1.prototype.getSuccessCallback = function () {
        var successCallback = getFieldsFromLayout(this.layout).filter(function (field) { return field.variable === 'formSuccessCallback'; })[0];
        return successCallback.values;
    };
    class_1.prototype.resetForm = function () {
        var _this = this;
        var elements = Array.from(this.el.querySelectorAll('form dot-form-column > *'));
        elements.forEach(function (element) { return __awaiter(_this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, element.reset()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.warn("" + element.tagName, error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    class_1.prototype.getUpdateValue = function () {
        return getFieldsFromLayout(this.layout)
            .filter(function (field) { return field.fixed === false; })
            .reduce(function (acc, _a) {
            var _b;
            var variable = _a.variable, defaultValue = _a.defaultValue, dataType = _a.dataType, values = _a.values;
            return Object.assign(Object.assign({}, acc), (_b = {}, _b[variable] = defaultValue || (dataType !== 'TEXT' ? values : null), _b));
        }, {});
    };
    class_1.prototype.getMaxSize = function (event) {
        var attributes = __spreadArrays(event.target.attributes);
        var maxSize = attributes.filter(function (item) {
            return item.name === 'max-file-length';
        })[0];
        return maxSize && maxSize.value;
    };
    class_1.prototype.uploadFile = function (event) {
        var _this = this;
        var uploadService = new DotUploadService();
        var file = event.detail.value;
        var maxSize = this.getMaxSize(event);
        var binary = event.target;
        if (!maxSize || file.size <= maxSize) {
            this.uploadFileInProgress = true;
            binary.errorMessage = '';
            return uploadService
                .uploadFile(file, maxSize)
                .then(function (tempFile) {
                _this.errorMessage = '';
                binary.previewImageUrl = tempFile.thumbnailUrl;
                binary.previewImageName = tempFile.fileName;
                _this.uploadFileInProgress = false;
                return tempFile;
            })
                .catch(function (_a) {
                var message = _a.message, status = _a.status;
                binary.clearValue();
                _this.uploadFileInProgress = false;
                binary.errorMessage = getErrorMessage(message) || fallbackErrorMessages[status];
                return null;
            });
        }
        else {
            binary.reset().then(function () {
                binary.errorMessage = "File size larger than allowed " + maxSize + " bytes";
            });
            return Promise.resolve(null);
        }
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "layout": ["layoutWatch"],
                "fieldsToShow": ["fieldsToShowWatch"]
            };
        },
        enumerable: false,
        configurable: true
    });
    return class_1;
}());
DotFormComponent.style = dotFormCss;
export { DotFormComponent as dot_form };
