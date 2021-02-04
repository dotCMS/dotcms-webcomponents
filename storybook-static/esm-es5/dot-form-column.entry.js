import { r as registerInstance } from './index-ea58b93f.js';
import './utils-4c5e19e6.js';
import { c as shouldShowField, d as fieldMap } from './index-cd656efe.js';
var dotFormColumnCss = "dot-form-column{-ms-flex:1;flex:1;margin:1rem}dot-form-column:first-child{margin-left:0}dot-form-column:last-child{margin-right:0}";
var DotFormColumnComponent = /** @class */ (function () {
    function DotFormColumnComponent(hostRef) {
        registerInstance(this, hostRef);
    }
    DotFormColumnComponent.prototype.render = function () {
        var _this = this;
        return this.column.fields.map(function (field) { return _this.getField(field); });
    };
    DotFormColumnComponent.prototype.getField = function (field) {
        return shouldShowField(field, this.fieldsToShow) ? this.getFieldTag(field) : null;
    };
    DotFormColumnComponent.prototype.getFieldTag = function (field) {
        return fieldMap[field.fieldType] ? fieldMap[field.fieldType](field) : '';
    };
    return DotFormColumnComponent;
}());
DotFormColumnComponent.style = dotFormColumnCss;
export { DotFormColumnComponent as dot_form_column };
