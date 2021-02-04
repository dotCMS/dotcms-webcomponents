'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-674736da.js');
const dotUpload_service = require('./dot-upload.service-460d4556.js');
const utils = require('./utils-e42aadb4.js');
const index$1 = require('./index-4848f6d2.js');

const dotFormCss = "dot-form{display:block}dot-form>form label{margin:0;padding:0}dot-form>form dot-form-column>*{display:block;margin:2rem 0}dot-form>form dot-form-column>*:first-child{margin-top:0}dot-form>form dot-form-column>*:last-child{margin-bottom:0}dot-form>form .dot-form__buttons{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-pack:end;justify-content:flex-end}dot-form>form .dot-form__buttons button:last-child{margin-left:1rem}";

const SUBMIT_FORM_API_URL = '/api/v1/workflow/actions/default/fire/NEW';
const DotFormComponent = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        /** (optional) Text to be rendered on Reset button */
        this.resetLabel = 'Reset';
        /** (optional) Text to be rendered on Submit button */
        this.submitLabel = 'Submit';
        /** Layout metada to be rendered */
        this.layout = [];
        /** Content type variable name */
        this.variable = '';
        this.status = utils.getOriginalStatus();
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
    onValueChange(event) {
        const { tagName } = event.target;
        const { name, value } = event.detail;
        const process = index$1.fieldCustomProcess[tagName];
        if (tagName === 'DOT-BINARY-FILE' && value) {
            this.uploadFile(event).then((tempFile) => {
                this.value[name] = tempFile && tempFile.id;
            });
        }
        else {
            this.value[name] = process ? process(value) : value;
        }
    }
    /**
     * Update the form status when dotStatusChange in any of the child fields
     *
     * @param CustomEvent event
     * @memberof DotFormComponent
     */
    onStatusChange({ detail }) {
        this.fieldsStatus[detail.name] = detail.status;
        this.status = utils.updateStatus(this.status, {
            dotTouched: this.getTouched(),
            dotPristine: this.getStatusValueByName('dotPristine'),
            dotValid: this.getStatusValueByName('dotValid')
        });
    }
    layoutWatch() {
        this.value = this.getUpdateValue();
    }
    fieldsToShowWatch() {
        this.value = this.getUpdateValue();
    }
    componentWillLoad() {
        this.value = this.getUpdateValue();
    }
    render() {
        const classes = utils.getClassNames(this.status, this.status.dotValid);
        return (index.h(index.Host, { class: Object.assign({}, classes) }, index.h("form", { onSubmit: this.handleSubmit.bind(this) }, this.layout.map((row) => (index.h("dot-form-row", { row: row, "fields-to-show": this.fieldsToShow }))), index.h("div", { class: "dot-form__buttons" }, index.h("button", { type: "reset", onClick: () => this.resetForm() }, this.resetLabel), index.h("button", { type: "submit", disabled: !this.status.dotValid || this.uploadFileInProgress }, this.submitLabel))), index.h("dot-error-message", null, this.errorMessage)));
    }
    getStatusValueByName(name) {
        return Object.values(this.fieldsStatus)
            .map((field) => field[name])
            .every((item) => item === true);
    }
    getTouched() {
        return Object.values(this.fieldsStatus)
            .map((field) => field.dotTouched)
            .includes(true);
    }
    handleSubmit(event) {
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
            .then(async (response) => {
            if (response.status !== 200) {
                const error = {
                    message: await response.text(),
                    status: response.status
                };
                throw error;
            }
            return response.json();
        })
            .then((jsonResponse) => {
            const contentlet = jsonResponse.entity;
            this.runSuccessCallback(contentlet);
        })
            .catch(({ message, status }) => {
            this.errorMessage = index$1.getErrorMessage(message) || dotUpload_service.fallbackErrorMessages[status];
        });
    }
    runSuccessCallback(contentlet) {
        const successCallback = this.getSuccessCallback();
        if (successCallback) {
            return function () {
                // tslint:disable-next-line:no-eval
                return eval(successCallback);
            }.call({ contentlet });
        }
    }
    getSuccessCallback() {
        const successCallback = index$1.getFieldsFromLayout(this.layout).filter((field) => field.variable === 'formSuccessCallback')[0];
        return successCallback.values;
    }
    resetForm() {
        const elements = Array.from(this.el.querySelectorAll('form dot-form-column > *'));
        elements.forEach(async (element) => {
            try {
                await element.reset();
            }
            catch (error) {
                console.warn(`${element.tagName}`, error);
            }
        });
    }
    getUpdateValue() {
        return index$1.getFieldsFromLayout(this.layout)
            .filter((field) => field.fixed === false)
            .reduce((acc, { variable, defaultValue, dataType, values }) => {
            return Object.assign(Object.assign({}, acc), { [variable]: defaultValue || (dataType !== 'TEXT' ? values : null) });
        }, {});
    }
    getMaxSize(event) {
        const attributes = [...event.target.attributes];
        const maxSize = attributes.filter((item) => {
            return item.name === 'max-file-length';
        })[0];
        return maxSize && maxSize.value;
    }
    uploadFile(event) {
        const uploadService = new dotUpload_service.DotUploadService();
        const file = event.detail.value;
        const maxSize = this.getMaxSize(event);
        const binary = event.target;
        if (!maxSize || file.size <= maxSize) {
            this.uploadFileInProgress = true;
            binary.errorMessage = '';
            return uploadService
                .uploadFile(file, maxSize)
                .then((tempFile) => {
                this.errorMessage = '';
                binary.previewImageUrl = tempFile.thumbnailUrl;
                binary.previewImageName = tempFile.fileName;
                this.uploadFileInProgress = false;
                return tempFile;
            })
                .catch(({ message, status }) => {
                binary.clearValue();
                this.uploadFileInProgress = false;
                binary.errorMessage = index$1.getErrorMessage(message) || dotUpload_service.fallbackErrorMessages[status];
                return null;
            });
        }
        else {
            binary.reset().then(() => {
                binary.errorMessage = `File size larger than allowed ${maxSize} bytes`;
            });
            return Promise.resolve(null);
        }
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "layout": ["layoutWatch"],
        "fieldsToShow": ["fieldsToShowWatch"]
    }; }
};
DotFormComponent.style = dotFormCss;

exports.dot_form = DotFormComponent;
