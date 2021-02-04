import { r as registerInstance } from './index-ea58b93f.js';
import './utils-4c5e19e6.js';
import { c as shouldShowField, d as fieldMap } from './index-cd656efe.js';

const dotFormColumnCss = "dot-form-column{-ms-flex:1;flex:1;margin:1rem}dot-form-column:first-child{margin-left:0}dot-form-column:last-child{margin-right:0}";

const DotFormColumnComponent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return this.column.fields.map((field) => this.getField(field));
    }
    getField(field) {
        return shouldShowField(field, this.fieldsToShow) ? this.getFieldTag(field) : null;
    }
    getFieldTag(field) {
        return fieldMap[field.fieldType] ? fieldMap[field.fieldType](field) : '';
    }
};
DotFormColumnComponent.style = dotFormColumnCss;

export { DotFormColumnComponent as dot_form_column };
