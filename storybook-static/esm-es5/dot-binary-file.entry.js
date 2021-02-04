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
import { D as DotBinaryMessageError } from './dot-binary-message-error.model-e9112718.js';
import { g as getOriginalStatus, n as nextTick, a as getClassNames, b as getTagError, c as getTagHint, u as updateStatus, i as isFileAllowed } from './utils-4c5e19e6.js';
import { c as checkProp } from './checkProp-c5680536.js';
import { g as getDotAttributesFromElement, s as setDotAttributesToElement } from './index-cd656efe.js';
var dotBinaryFileCss = "dot-binary-file.dot-dragover input{background-color:#f1f1f1}dot-binary-file .dot-binary__container input,dot-binary-file .dot-binary__container button{display:-ms-inline-flexbox;display:inline-flex;border:1px solid lightgray;padding:15px;border-radius:0}dot-binary-file .dot-binary__container input[type=file]{display:none}dot-binary-file .dot-binary__container input{min-width:245px;text-overflow:ellipsis}dot-binary-file .dot-binary__container button{background-color:lightgray}";
var DotBinaryFileComponent = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        this.dotValueChange = createEvent(this, "dotValueChange", 7);
        this.dotStatusChange = createEvent(this, "dotStatusChange", 7);
        /** Name that will be used as ID */
        this.name = '';
        /** (optional) Text to be rendered next to input field */
        this.label = '';
        /** (optional) Placeholder specifies a short hint that describes the expected value of the input field */
        this.placeholder = 'Drop or paste a file or url';
        /** (optional) Hint text that suggest a clue of the field */
        this.hint = '';
        /** (optional) Determine if it is mandatory */
        this.required = false;
        /** (optional) Text that be shown when required is set and condition not met */
        this.requiredMessage = 'This field is required';
        /** (optional) Text that be shown when the Regular Expression condition not met */
        this.validationMessage = "The field doesn't comply with the specified format";
        /** (optional) Text that be shown when the URL is not valid */
        this.URLValidationMessage = 'The specified URL is not valid';
        /** (optional) Disables field's interaction */
        this.disabled = false;
        /** (optional) Describes a type of file that may be selected by the user, separated by comma  eg: .pdf,.jpg  */
        this.accept = '';
        /** (optional) Set the max file size limit  */
        this.maxFileLength = '';
        /** (optional) Text that be shown in the browse file button */
        this.buttonLabel = 'Browse';
        /** (optional) Text that be shown in the browse file button */
        this.errorMessage = '';
        /** (optional) Name of the file uploaded */
        this.previewImageName = '';
        /** (optional) URL of the file uploaded */
        this.previewImageUrl = '';
        this.file = null;
        this.allowedFileTypes = [];
        this.errorMessageMap = new Map();
    }
    /**
     * Reset properties of the field, clear value and emit events.
     */
    class_1.prototype.reset = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.file = '';
                this.binaryTextField.value = '';
                this.errorMessage = '';
                this.clearPreviewData();
                this.status = getOriginalStatus(this.isValid());
                this.emitStatusChange();
                this.emitValueChange();
                return [2 /*return*/];
            });
        });
    };
    /**
     * Clear value of selected file, when the endpoint fails.
     */
    class_1.prototype.clearValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.binaryTextField.value = '';
                this.errorType = this.required ? DotBinaryMessageError.REQUIRED : null;
                this.setValue();
                this.clearPreviewData();
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype.componentWillLoad = function () {
        this.setErrorMessageMap();
        this.validateProps();
        this.status = getOriginalStatus(this.isValid());
        this.emitStatusChange();
    };
    class_1.prototype.componentDidLoad = function () {
        var _this = this;
        // this will be null if the component loads with a value
        this.binaryTextField = this.el.querySelector('dot-binary-text-field');
        var attrException = ['dottype'];
        var uploadButtonElement = this.el.querySelector('input[type="file"]');
        setTimeout(function () {
            var attrs = getDotAttributesFromElement(Array.from(_this.el.attributes), attrException);
            setDotAttributesToElement(uploadButtonElement, attrs);
        }, 0);
    };
    class_1.prototype.requiredMessageWatch = function () {
        this.errorMessageMap.set(DotBinaryMessageError.REQUIRED, this.requiredMessage);
    };
    class_1.prototype.validationMessageWatch = function () {
        this.errorMessageMap.set(DotBinaryMessageError.INVALID, this.validationMessage);
    };
    class_1.prototype.URLValidationMessageWatch = function () {
        this.errorMessageMap.set(DotBinaryMessageError.URLINVALID, this.URLValidationMessage);
    };
    class_1.prototype.optionsWatch = function () {
        this.accept = checkProp(this, 'accept');
        var arr;
        if (this.accept) {
            arr = this.accept.split(',');
            if (arr.length === 0) {
                arr = [this.accept];
            }
        }
        this.allowedFileTypes = arr ? arr.map(function (fileType) { return fileType.trim(); }) : [];
    };
    class_1.prototype.fileChangeHandler = function (event) {
        event.stopImmediatePropagation();
        var fileEvent = event.detail;
        this.errorType = fileEvent.errorType;
        this.setValue(fileEvent.file);
        if (this.isBinaryUploadButtonEvent(event.target) && fileEvent.file) {
            this.binaryTextField.value = fileEvent.file.name;
        }
    };
    class_1.prototype.HandleDragover = function (evt) {
        evt.preventDefault();
        if (!this.disabled) {
            this.el.classList.add('dot-dragover');
            this.el.classList.remove('dot-dropped');
        }
    };
    class_1.prototype.HandleDragleave = function (evt) {
        evt.preventDefault();
        this.el.classList.remove('dot-dragover');
        this.el.classList.remove('dot-dropped');
    };
    class_1.prototype.HandleDrop = function (evt) {
        evt.preventDefault();
        this.el.classList.remove('dot-dragover');
        if (!this.disabled && !this.previewImageName) {
            this.el.classList.add('dot-dropped');
            this.errorType = null;
            var droppedFile = evt.dataTransfer.files[0];
            this.handleDroppedFile(droppedFile);
        }
    };
    class_1.prototype.handleDelete = function (evt) {
        var _this = this;
        evt.preventDefault();
        this.clearPreviewData();
        /*
            this.binaryTextField could be null if the component loads with a value.
            So we have to wait for `clearPreviewData` happen to bring the <dot-binary-text-field>
            to the DOM so we can get it.
        */
        nextTick(function () {
            if (!_this.binaryTextField) {
                _this.binaryTextField = _this.el.querySelector('dot-binary-text-field');
                console.log(_this.binaryTextField);
            }
            _this.setValue();
        });
    };
    class_1.prototype.render = function () {
        var classes = getClassNames(this.status, this.isValid(), this.required);
        return (h(Host, { class: Object.assign({}, classes) }, h("dot-label", { label: this.label, required: this.required, name: this.name, tabindex: "0" }, this.previewImageName ? (h("dot-binary-file-preview", { onClick: function (e) {
                e.preventDefault();
            }, fileName: this.previewImageName, previewUrl: this.previewImageUrl })) : (h("div", { class: "dot-binary__container" }, h("dot-binary-text-field", { placeholder: this.placeholder, required: this.required, disabled: this.disabled, accept: this.allowedFileTypes.join(','), hint: this.hint, onLostFocus: this.lostFocusEventHandler.bind(this) }), h("dot-binary-upload-button", { name: this.name, accept: this.allowedFileTypes.join(','), disabled: this.disabled, required: this.required, buttonLabel: this.buttonLabel })))), getTagHint(this.hint), getTagError(this.shouldShowErrorMessage(), this.getErrorMessage()), h("dot-error-message", null, this.errorMessage)));
    };
    class_1.prototype.lostFocusEventHandler = function () {
        if (!this.status.dotTouched) {
            this.status = updateStatus(this.status, {
                dotTouched: true
            });
            this.emitStatusChange();
        }
    };
    class_1.prototype.isBinaryUploadButtonEvent = function (element) {
        return element.localName === 'dot-binary-upload-button';
    };
    class_1.prototype.validateProps = function () {
        this.optionsWatch();
        this.setPlaceHolder();
    };
    class_1.prototype.shouldShowErrorMessage = function () {
        return this.getErrorMessage() && !this.status.dotPristine;
    };
    class_1.prototype.getErrorMessage = function () {
        return this.errorMessageMap.get(this.errorType);
    };
    class_1.prototype.isValid = function () {
        return !(this.required && !this.file);
    };
    class_1.prototype.setErrorMessageMap = function () {
        this.requiredMessageWatch();
        this.validationMessageWatch();
        this.URLValidationMessageWatch();
    };
    class_1.prototype.setValue = function (data) {
        if (data === void 0) { data = null; }
        try {
            this.file = data;
            this.status = updateStatus(this.status, {
                dotTouched: true,
                dotPristine: false,
                dotValid: this.isValid()
            });
            this.binaryTextField.value = data === null ? '' : this.binaryTextField.value;
        }
        catch (error) {
            console.warn(error);
        }
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
            value: this.file
        });
    };
    class_1.prototype.handleDroppedFile = function (file) {
        if (isFileAllowed(file.name, file.type, this.allowedFileTypes.join(','))) {
            this.setValue(file);
            this.binaryTextField.value = file.name;
        }
        else {
            this.errorType = DotBinaryMessageError.INVALID;
            this.setValue();
        }
    };
    class_1.prototype.setPlaceHolder = function () {
        var DEFAULT_WINDOWS = 'Drop a file or url';
        this.placeholder = this.isWindowsOS() ? DEFAULT_WINDOWS : this.placeholder;
    };
    class_1.prototype.isWindowsOS = function () {
        return window.navigator.platform.includes('Win');
    };
    class_1.prototype.clearPreviewData = function () {
        this.previewImageUrl = '';
        this.previewImageName = '';
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "requiredMessage": ["requiredMessageWatch"],
                "validationMessage": ["validationMessageWatch"],
                "URLValidationMessage": ["URLValidationMessageWatch"],
                "accept": ["optionsWatch"]
            };
        },
        enumerable: false,
        configurable: true
    });
    return class_1;
}());
DotBinaryFileComponent.style = dotBinaryFileCss;
export { DotBinaryFileComponent as dot_binary_file };
