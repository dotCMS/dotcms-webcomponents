import { r as registerInstance, h, H as Host, g as getElement } from './index-ea58b93f.js';
import { f as fallbackErrorMessages, D as DotUploadService } from './dot-upload.service-e9475d4b.js';
import { g as getOriginalStatus, u as updateStatus, a as getClassNames } from './utils-4c5e19e6.js';
import { a as getErrorMessage, b as getFieldsFromLayout, f as fieldCustomProcess } from './index-cd656efe.js';

const dotFormCss = "dot-form{display:block}dot-form>form label{margin:0;padding:0}dot-form>form dot-form-column>*{display:block;margin:2rem 0}dot-form>form dot-form-column>*:first-child{margin-top:0}dot-form>form dot-form-column>*:last-child{margin-bottom:0}dot-form>form .dot-form__buttons{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-pack:end;justify-content:flex-end}dot-form>form .dot-form__buttons button:last-child{margin-left:1rem}";

const SUBMIT_FORM_API_URL = '/api/v1/workflow/actions/default/fire/NEW';
const DotFormComponent = class {
    constructor(hostRef) {
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
    onValueChange(event) {
        const { tagName } = event.target;
        const { name, value } = event.detail;
        const process = fieldCustomProcess[tagName];
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
        this.status = updateStatus(this.status, {
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
        const classes = getClassNames(this.status, this.status.dotValid);
        return (h(Host, { class: Object.assign({}, classes) }, h("form", { onSubmit: this.handleSubmit.bind(this) }, this.layout.map((row) => (h("dot-form-row", { row: row, "fields-to-show": this.fieldsToShow }))), h("div", { class: "dot-form__buttons" }, h("button", { type: "reset", onClick: () => this.resetForm() }, this.resetLabel), h("button", { type: "submit", disabled: !this.status.dotValid || this.uploadFileInProgress }, this.submitLabel))), h("dot-error-message", null, this.errorMessage)));
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
            this.errorMessage = getErrorMessage(message) || fallbackErrorMessages[status];
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
        const successCallback = getFieldsFromLayout(this.layout).filter((field) => field.variable === 'formSuccessCallback')[0];
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
        return getFieldsFromLayout(this.layout)
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
        const uploadService = new DotUploadService();
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
                binary.errorMessage = getErrorMessage(message) || fallbackErrorMessages[status];
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
    get el() { return getElement(this); }
    static get watchers() { return {
        "layout": ["layoutWatch"],
        "fieldsToShow": ["fieldsToShowWatch"]
    }; }
};
DotFormComponent.style = dotFormCss;

export { DotFormComponent as dot_form };
