'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-674736da.js');

const dotFormRowCss = "dot-form-row{display:-ms-flexbox;display:flex}";

const DotFormRowComponent = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    render() {
        return this.row.columns.map((fieldColumn) => {
            return index.h("dot-form-column", { column: fieldColumn, "fields-to-show": this.fieldsToShow });
        });
    }
};
DotFormRowComponent.style = dotFormRowCss;

exports.dot_form_row = DotFormRowComponent;
