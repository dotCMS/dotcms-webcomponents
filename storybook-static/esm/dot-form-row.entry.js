import { r as registerInstance, h } from './index-ea58b93f.js';

const dotFormRowCss = "dot-form-row{display:-ms-flexbox;display:flex}";

const DotFormRowComponent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return this.row.columns.map((fieldColumn) => {
            return h("dot-form-column", { column: fieldColumn, "fields-to-show": this.fieldsToShow });
        });
    }
};
DotFormRowComponent.style = dotFormRowCss;

export { DotFormRowComponent as dot_form_row };
