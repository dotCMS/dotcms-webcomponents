'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-674736da.js');
require('./utils-e42aadb4.js');
const index$1 = require('./index-4848f6d2.js');

const dotFormColumnCss = "dot-form-column{-ms-flex:1;flex:1;margin:1rem}dot-form-column:first-child{margin-left:0}dot-form-column:last-child{margin-right:0}";

const DotFormColumnComponent = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    render() {
        return this.column.fields.map((field) => this.getField(field));
    }
    getField(field) {
        return index$1.shouldShowField(field, this.fieldsToShow) ? this.getFieldTag(field) : null;
    }
    getFieldTag(field) {
        return index$1.fieldMap[field.fieldType] ? index$1.fieldMap[field.fieldType](field) : '';
    }
};
DotFormColumnComponent.style = dotFormColumnCss;

exports.dot_form_column = DotFormColumnComponent;
