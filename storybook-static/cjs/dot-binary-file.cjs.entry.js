'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-674736da.js');
const dotBinaryMessageError_model = require('./dot-binary-message-error.model-6322b419.js');
const utils = require('./utils-e42aadb4.js');
const checkProp = require('./checkProp-46515d08.js');
const index$1 = require('./index-4848f6d2.js');

const dotBinaryFileCss = "dot-binary-file.dot-dragover input{background-color:#f1f1f1}dot-binary-file .dot-binary__container input,dot-binary-file .dot-binary__container button{display:-ms-inline-flexbox;display:inline-flex;border:1px solid lightgray;padding:15px;border-radius:0}dot-binary-file .dot-binary__container input[type=file]{display:none}dot-binary-file .dot-binary__container input{min-width:245px;text-overflow:ellipsis}dot-binary-file .dot-binary__container button{background-color:lightgray}";

const DotBinaryFileComponent = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.dotValueChange = index.createEvent(this, "dotValueChange", 7);
        this.dotStatusChange = index.createEvent(this, "dotStatusChange", 7);
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
    async reset() {
        this.file = '';
        this.binaryTextField.value = '';
        this.errorMessage = '';
        this.clearPreviewData();
        this.status = utils.getOriginalStatus(this.isValid());
        this.emitStatusChange();
        this.emitValueChange();
    }
    /**
     * Clear value of selected file, when the endpoint fails.
     */
    async clearValue() {
        this.binaryTextField.value = '';
        this.errorType = this.required ? dotBinaryMessageError_model.DotBinaryMessageError.REQUIRED : null;
        this.setValue();
        this.clearPreviewData();
    }
    componentWillLoad() {
        this.setErrorMessageMap();
        this.validateProps();
        this.status = utils.getOriginalStatus(this.isValid());
        this.emitStatusChange();
    }
    componentDidLoad() {
        // this will be null if the component loads with a value
        this.binaryTextField = this.el.querySelector('dot-binary-text-field');
        const attrException = ['dottype'];
        const uploadButtonElement = this.el.querySelector('input[type="file"]');
        setTimeout(() => {
            const attrs = index$1.getDotAttributesFromElement(Array.from(this.el.attributes), attrException);
            index$1.setDotAttributesToElement(uploadButtonElement, attrs);
        }, 0);
    }
    requiredMessageWatch() {
        this.errorMessageMap.set(dotBinaryMessageError_model.DotBinaryMessageError.REQUIRED, this.requiredMessage);
    }
    validationMessageWatch() {
        this.errorMessageMap.set(dotBinaryMessageError_model.DotBinaryMessageError.INVALID, this.validationMessage);
    }
    URLValidationMessageWatch() {
        this.errorMessageMap.set(dotBinaryMessageError_model.DotBinaryMessageError.URLINVALID, this.URLValidationMessage);
    }
    optionsWatch() {
        this.accept = checkProp.checkProp(this, 'accept');
        let arr;
        if (this.accept) {
            arr = this.accept.split(',');
            if (arr.length === 0) {
                arr = [this.accept];
            }
        }
        this.allowedFileTypes = arr ? arr.map((fileType) => fileType.trim()) : [];
    }
    fileChangeHandler(event) {
        event.stopImmediatePropagation();
        const fileEvent = event.detail;
        this.errorType = fileEvent.errorType;
        this.setValue(fileEvent.file);
        if (this.isBinaryUploadButtonEvent(event.target) && fileEvent.file) {
            this.binaryTextField.value = fileEvent.file.name;
        }
    }
    HandleDragover(evt) {
        evt.preventDefault();
        if (!this.disabled) {
            this.el.classList.add('dot-dragover');
            this.el.classList.remove('dot-dropped');
        }
    }
    HandleDragleave(evt) {
        evt.preventDefault();
        this.el.classList.remove('dot-dragover');
        this.el.classList.remove('dot-dropped');
    }
    HandleDrop(evt) {
        evt.preventDefault();
        this.el.classList.remove('dot-dragover');
        if (!this.disabled && !this.previewImageName) {
            this.el.classList.add('dot-dropped');
            this.errorType = null;
            const droppedFile = evt.dataTransfer.files[0];
            this.handleDroppedFile(droppedFile);
        }
    }
    handleDelete(evt) {
        evt.preventDefault();
        this.clearPreviewData();
        /*
            this.binaryTextField could be null if the component loads with a value.
            So we have to wait for `clearPreviewData` happen to bring the <dot-binary-text-field>
            to the DOM so we can get it.
        */
        utils.nextTick(() => {
            if (!this.binaryTextField) {
                this.binaryTextField = this.el.querySelector('dot-binary-text-field');
                console.log(this.binaryTextField);
            }
            this.setValue();
        });
    }
    render() {
        const classes = utils.getClassNames(this.status, this.isValid(), this.required);
        return (index.h(index.Host, { class: Object.assign({}, classes) }, index.h("dot-label", { label: this.label, required: this.required, name: this.name, tabindex: "0" }, this.previewImageName ? (index.h("dot-binary-file-preview", { onClick: (e) => {
                e.preventDefault();
            }, fileName: this.previewImageName, previewUrl: this.previewImageUrl })) : (index.h("div", { class: "dot-binary__container" }, index.h("dot-binary-text-field", { placeholder: this.placeholder, required: this.required, disabled: this.disabled, accept: this.allowedFileTypes.join(','), hint: this.hint, onLostFocus: this.lostFocusEventHandler.bind(this) }), index.h("dot-binary-upload-button", { name: this.name, accept: this.allowedFileTypes.join(','), disabled: this.disabled, required: this.required, buttonLabel: this.buttonLabel })))), utils.getTagHint(this.hint), utils.getTagError(this.shouldShowErrorMessage(), this.getErrorMessage()), index.h("dot-error-message", null, this.errorMessage)));
    }
    lostFocusEventHandler() {
        if (!this.status.dotTouched) {
            this.status = utils.updateStatus(this.status, {
                dotTouched: true
            });
            this.emitStatusChange();
        }
    }
    isBinaryUploadButtonEvent(element) {
        return element.localName === 'dot-binary-upload-button';
    }
    validateProps() {
        this.optionsWatch();
        this.setPlaceHolder();
    }
    shouldShowErrorMessage() {
        return this.getErrorMessage() && !this.status.dotPristine;
    }
    getErrorMessage() {
        return this.errorMessageMap.get(this.errorType);
    }
    isValid() {
        return !(this.required && !this.file);
    }
    setErrorMessageMap() {
        this.requiredMessageWatch();
        this.validationMessageWatch();
        this.URLValidationMessageWatch();
    }
    setValue(data = null) {
        try {
            this.file = data;
            this.status = utils.updateStatus(this.status, {
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
    }
    emitStatusChange() {
        this.dotStatusChange.emit({
            name: this.name,
            status: this.status
        });
    }
    emitValueChange() {
        this.dotValueChange.emit({
            name: this.name,
            value: this.file
        });
    }
    handleDroppedFile(file) {
        if (utils.isFileAllowed(file.name, file.type, this.allowedFileTypes.join(','))) {
            this.setValue(file);
            this.binaryTextField.value = file.name;
        }
        else {
            this.errorType = dotBinaryMessageError_model.DotBinaryMessageError.INVALID;
            this.setValue();
        }
    }
    setPlaceHolder() {
        const DEFAULT_WINDOWS = 'Drop a file or url';
        this.placeholder = this.isWindowsOS() ? DEFAULT_WINDOWS : this.placeholder;
    }
    isWindowsOS() {
        return window.navigator.platform.includes('Win');
    }
    clearPreviewData() {
        this.previewImageUrl = '';
        this.previewImageName = '';
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "requiredMessage": ["requiredMessageWatch"],
        "validationMessage": ["validationMessageWatch"],
        "URLValidationMessage": ["URLValidationMessageWatch"],
        "accept": ["optionsWatch"]
    }; }
};
DotBinaryFileComponent.style = dotBinaryFileCss;

exports.dot_binary_file = DotBinaryFileComponent;
