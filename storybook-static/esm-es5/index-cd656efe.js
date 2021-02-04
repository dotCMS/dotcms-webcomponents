import { h } from './index-ea58b93f.js';
import { d as getStringFromDotKeyArray, e as isStringType } from './utils-4c5e19e6.js';
var DotFormFields = {
    Text: function (field) { return (h("dot-textfield", { hint: field.hint, label: field.name, name: field.variable, ref: function (el) {
            setAttributesToTag(el, field.fieldVariables);
        }, "regex-check": field.regexCheck, required: field.required, value: field.defaultValue })); },
    Textarea: function (field) { return (h("dot-textarea", { hint: field.hint, label: field.name, name: field.variable, ref: function (el) {
            setAttributesToTag(el, field.fieldVariables);
        }, "regex-check": field.regexCheck, required: field.required, value: field.defaultValue })); },
    Checkbox: function (field) { return (h("dot-checkbox", { hint: field.hint, label: field.name, name: field.variable, options: field.values, ref: function (el) {
            setAttributesToTag(el, field.fieldVariables);
        }, required: field.required, value: field.defaultValue })); },
    'Multi-Select': function (field) { return (h("dot-multi-select", { hint: field.hint, label: field.name, name: field.variable, options: field.values, ref: function (el) {
            setAttributesToTag(el, field.fieldVariables);
        }, required: field.required, value: field.defaultValue })); },
    'Key-Value': function (field) { return (h("dot-key-value", { "field-type": field.fieldType, hint: field.hint, label: field.name, name: field.variable, required: field.required, value: field.defaultValue })); },
    Select: function (field) { return (h("dot-select", { hint: field.hint, label: field.name, name: field.variable, options: field.values, ref: function (el) {
            setAttributesToTag(el, field.fieldVariables);
        }, required: field.required, value: field.defaultValue })); },
    Radio: function (field) { return (h("dot-radio", { hint: field.hint, label: field.name, name: field.variable, options: field.values, ref: function (el) {
            setAttributesToTag(el, field.fieldVariables);
        }, required: field.required, value: field.defaultValue })); },
    Date: function (field) { return (h("dot-date", { hint: field.hint, label: field.name, name: field.variable, ref: function (el) {
            setAttributesToTag(el, field.fieldVariables);
        }, required: field.required, value: field.defaultValue })); },
    Time: function (field) { return (h("dot-time", { hint: field.hint, label: field.name, name: field.variable, ref: function (el) {
            setAttributesToTag(el, field.fieldVariables);
        }, required: field.required, value: field.defaultValue })); },
    'Date-and-Time': function (field) { return (h("dot-date-time", { hint: field.hint, label: field.name, name: field.variable, ref: function (el) {
            setAttributesToTag(el, field.fieldVariables);
        }, required: field.required, value: field.defaultValue })); },
    'Date-Range': function (field) { return (h("dot-date-range", { hint: field.hint, label: field.name, name: field.variable, required: field.required, value: field.defaultValue })); },
    Tag: function (field) { return (h("dot-tags", { data: function () {
            return fetch('/api/v1/tags')
                .then(function (data) { return data.json(); })
                .then(function (items) { return Object.keys(items); })
                .catch(function () { return []; });
        }, hint: field.hint, label: field.name, name: field.variable, required: field.required, value: field.defaultValue })); },
    Binary: function (field) { return (h("dot-binary-file", { accept: getFieldVariableValue(field.fieldVariables, 'accept'), "max-file-length": getFieldVariableValue(field.fieldVariables, 'maxFileLength'), hint: field.hint, label: field.name, name: field.variable, ref: function (el) {
            setAttributesToTag(el, field.fieldVariables);
        }, required: field.required })); }
};
var DOT_ATTR_PREFIX = "dot";
/**
 * Sets attributes to the HtmlElement from fieldVariables array
 *
 * @param HTMLElement element
 * @param DotCMSContentTypeFieldVariable fieldVariables
 */
function setAttributesToTag(element, fieldVariables) {
    fieldVariables.forEach(function (_a) {
        var key = _a.key, value = _a.value;
        element.setAttribute(key, value);
    });
}
/**
 * Given a string formatted value "key|value,llave|valor" return an object.
 * @param values
 */
var pipedValuesToObject = function (values) {
    return isStringType(values)
        ? values.split(",").reduce(function (acc, item) {
            var _a;
            var _b = item.split("|"), key = _b[0], value = _b[1];
            return Object.assign(Object.assign({}, acc), (_a = {}, _a[key] = value, _a));
        }, {})
        : null;
};
function isDotAttribute(name) {
    return name.startsWith(DOT_ATTR_PREFIX);
}
/**
 * Sets attributes with "dot" prefix to the HtmlElement passed
 *
 * @param Element element
 * @param Attr[] attributes
 */
function setDotAttributesToElement(element, attributes) {
    attributes.forEach(function (_a) {
        var name = _a.name, value = _a.value;
        element.setAttribute(name.replace(DOT_ATTR_PREFIX, ""), value);
    });
}
/**
 * Returns "Dot" attributes from all element's attributes
 *
 * @param Attr[] attributes
 * @param string[] attrException
 * @returns Attr[]
 */
function getDotAttributesFromElement(attributes, attrException) {
    var exceptions = attrException.map(function (attr) { return attr.toUpperCase(); });
    return attributes.filter(function (item) { return !exceptions.includes(item.name.toUpperCase()) &&
        isDotAttribute(item.name); });
}
/**
 * Returns if a field should be displayed from a comma separated list of fields
 * @param DotCMSContentTypeField field
 * @returns boolean
 */
var shouldShowField = function (field, fieldsToShow) {
    var fields2Show = fieldsToShow ? fieldsToShow.split(",") : [];
    return !fields2Show.length || fields2Show.includes(field.variable);
};
/**
 * Returns value of a Field Variable from a given key
 * @param DotCMSContentTypeFieldVariable[] fieldVariables
 * @param string key
 * @returns string
 */
var getFieldVariableValue = function (fieldVariables, key) {
    if (fieldVariables && fieldVariables.length) {
        var variable = fieldVariables.filter(function (item) { return item.key.toUpperCase() === key.toUpperCase(); })[0];
        return variable && variable.value;
    }
    return null;
};
/**
 * Parse a string to JSON and returns the message text
 * @param string message
 * @returns string
 */
var getErrorMessage = function (message) {
    var messageObj;
    try {
        messageObj = JSON.parse(message);
    }
    catch (error) {
        messageObj = message;
    }
    return messageObj.errors && messageObj.errors.length && messageObj.errors[0].message
        ? messageObj.errors[0].message
        : message;
};
/**
 * Given a layout Object of fields, it returns a flat list of fields
 * @param DotCMSContentTypeLayoutRow[] layout
 * @returns DotCMSContentTypeField[]
 */
var getFieldsFromLayout = function (layout) {
    return layout.reduce(function (acc, _a) {
        var columns = _a.columns;
        return acc.concat.apply(acc, columns.map(function (col) { return col.fields; }));
    }, []);
};
var fieldParamsConversionFromBE = {
    "Key-Value": function (field) {
        if (field.defaultValue && typeof field.defaultValue !== "string") {
            var valuesArray = Object.keys(field.defaultValue).map(function (key) {
                return { key: key, value: field.defaultValue[key] };
            });
            field.defaultValue = getStringFromDotKeyArray(valuesArray);
        }
        return DotFormFields["Key-Value"](field);
    }
};
var fieldCustomProcess = {
    "DOT-KEY-VALUE": pipedValuesToObject
};
var fieldMap = {
    Time: DotFormFields.Time,
    Textarea: DotFormFields.Textarea,
    Text: DotFormFields.Text,
    Tag: DotFormFields.Tag,
    Select: DotFormFields.Select,
    Radio: DotFormFields.Radio,
    "Multi-Select": DotFormFields["Multi-Select"],
    "Key-Value": fieldParamsConversionFromBE["Key-Value"],
    "Date-and-Time": DotFormFields["Date-and-Time"],
    "Date-Range": DotFormFields["Date-Range"],
    Date: DotFormFields.Date,
    Checkbox: DotFormFields.Checkbox,
    Binary: DotFormFields.Binary
};
export { DOT_ATTR_PREFIX as D, getErrorMessage as a, getFieldsFromLayout as b, shouldShowField as c, fieldMap as d, fieldCustomProcess as f, getDotAttributesFromElement as g, setDotAttributesToElement as s };
