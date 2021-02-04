import { r as registerInstance, h } from './index-ea58b93f.js';
var dotFormRowCss = "dot-form-row{display:-ms-flexbox;display:flex}";
var DotFormRowComponent = /** @class */ (function () {
    function DotFormRowComponent(hostRef) {
        registerInstance(this, hostRef);
    }
    DotFormRowComponent.prototype.render = function () {
        var _this = this;
        return this.row.columns.map(function (fieldColumn) {
            return h("dot-form-column", { column: fieldColumn, "fields-to-show": _this.fieldsToShow });
        });
    };
    return DotFormRowComponent;
}());
DotFormRowComponent.style = dotFormRowCss;
export { DotFormRowComponent as dot_form_row };
