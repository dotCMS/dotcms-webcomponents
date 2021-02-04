'use strict';

const index = require('./index-674736da.js');
const utils = require('./utils-e42aadb4.js');

const DotFormFields = {
    Text: (field) => (index.h("dot-textfield", { hint: field.hint, label: field.name, name: field.variable, ref: (el) => {
            setAttributesToTag(el, field.fieldVariables);
        }, "regex-check": field.regexCheck, required: field.required, value: field.defaultValue })),
    Textarea: (field) => (index.h("dot-textarea", { hint: field.hint, label: field.name, name: field.variable, ref: (el) => {
            setAttributesToTag(el, field.fieldVariables);
        }, "regex-check": field.regexCheck, required: field.required, value: field.defaultValue })),
    Checkbox: (field) => (index.h("dot-checkbox", { hint: field.hint, label: field.name, name: field.variable, options: field.values, ref: (el) => {
            setAttributesToTag(el, field.fieldVariables);
        }, required: field.required, value: field.defaultValue })),
    'Multi-Select': (field) => (index.h("dot-multi-select", { hint: field.hint, label: field.name, name: field.variable, options: field.values, ref: (el) => {
            setAttributesToTag(el, field.fieldVariables);
        }, required: field.required, value: field.defaultValue })),
    'Key-Value': (field) => (index.h("dot-key-value", { "field-type": field.fieldType, hint: field.hint, label: field.name, name: field.variable, required: field.required, value: field.defaultValue })),
    Select: (field) => (index.h("dot-select", { hint: field.hint, label: field.name, name: field.variable, options: field.values, ref: (el) => {
            setAttributesToTag(el, field.fieldVariables);
        }, required: field.required, value: field.defaultValue })),
    Radio: (field) => (index.h("dot-radio", { hint: field.hint, label: field.name, name: field.variable, options: field.values, ref: (el) => {
            setAttributesToTag(el, field.fieldVariables);
        }, required: field.required, value: field.defaultValue })),
    Date: (field) => (index.h("dot-date", { hint: field.hint, label: field.name, name: field.variable, ref: (el) => {
            setAttributesToTag(el, field.fieldVariables);
        }, required: field.required, value: field.defaultValue })),
    Time: (field) => (index.h("dot-time", { hint: field.hint, label: field.name, name: field.variable, ref: (el) => {
            setAttributesToTag(el, field.fieldVariables);
        }, required: field.required, value: field.defaultValue })),
    'Date-and-Time': (field) => (index.h("dot-date-time", { hint: field.hint, label: field.name, name: field.variable, ref: (el) => {
            setAttributesToTag(el, field.fieldVariables);
        }, required: field.required, value: field.defaultValue })),
    'Date-Range': (field) => (index.h("dot-date-range", { hint: field.hint, label: field.name, name: field.variable, required: field.required, value: field.defaultValue })),
    Tag: (field) => (index.h("dot-tags", { data: () => {
            return fetch('/api/v1/tags')
                .then((data) => data.json())
                .then((items) => Object.keys(items))
                .catch(() => []);
        }, hint: field.hint, label: field.name, name: field.variable, required: field.required, value: field.defaultValue })),
    Binary: (field) => (index.h("dot-binary-file", { accept: getFieldVariableValue(field.fieldVariables, 'accept'), "max-file-length": getFieldVariableValue(field.fieldVariables, 'maxFileLength'), hint: field.hint, label: field.name, name: field.variable, ref: (el) => {
            setAttributesToTag(el, field.fieldVariables);
        }, required: field.required }))
};

const DOT_ATTR_PREFIX = "dot";
/**
 * Sets attributes to the HtmlElement from fieldVariables array
 *
 * @param HTMLElement element
 * @param DotCMSContentTypeFieldVariable fieldVariables
 */
function setAttributesToTag(element, fieldVariables) {
    fieldVariables.forEach(({ key, value }) => {
        element.setAttribute(key, value);
    });
}
/**
 * Given a string formatted value "key|value,llave|valor" return an object.
 * @param values
 */
const pipedValuesToObject = (values) => {
    return utils.isStringType(values)
        ? values.split(",").reduce((acc, item) => {
            const [key, value] = item.split("|");
            return Object.assign(Object.assign({}, acc), { [key]: value });
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
    attributes.forEach(({ name, value }) => {
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
    const exceptions = attrException.map((attr) => attr.toUpperCase());
    return attributes.filter((item) => !exceptions.includes(item.name.toUpperCase()) &&
        isDotAttribute(item.name));
}
/**
 * Returns if a field should be displayed from a comma separated list of fields
 * @param DotCMSContentTypeField field
 * @returns boolean
 */
const shouldShowField = (field, fieldsToShow) => {
    const fields2Show = fieldsToShow ? fieldsToShow.split(",") : [];
    return !fields2Show.length || fields2Show.includes(field.variable);
};
/**
 * Returns value of a Field Variable from a given key
 * @param DotCMSContentTypeFieldVariable[] fieldVariables
 * @param string key
 * @returns string
 */
const getFieldVariableValue = (fieldVariables, key) => {
    if (fieldVariables && fieldVariables.length) {
        const [variable] = fieldVariables.filter((item) => item.key.toUpperCase() === key.toUpperCase());
        return variable && variable.value;
    }
    return null;
};
/**
 * Parse a string to JSON and returns the message text
 * @param string message
 * @returns string
 */
const getErrorMessage = (message) => {
    let messageObj;
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
const getFieldsFromLayout = (layout) => {
    return layout.reduce((acc, { columns }) => acc.concat(...columns.map((col) => col.fields)), []);
};
const fieldParamsConversionFromBE = {
    "Key-Value": (field) => {
        if (field.defaultValue && typeof field.defaultValue !== "string") {
            const valuesArray = Object.keys(field.defaultValue).map((key) => {
                return { key: key, value: field.defaultValue[key] };
            });
            field.defaultValue = utils.getStringFromDotKeyArray(valuesArray);
        }
        return DotFormFields["Key-Value"](field);
    }
};
const fieldCustomProcess = {
    "DOT-KEY-VALUE": pipedValuesToObject
};
const fieldMap = {
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

exports.DOT_ATTR_PREFIX = DOT_ATTR_PREFIX;
exports.fieldCustomProcess = fieldCustomProcess;
exports.fieldMap = fieldMap;
exports.getDotAttributesFromElement = getDotAttributesFromElement;
exports.getErrorMessage = getErrorMessage;
exports.getFieldsFromLayout = getFieldsFromLayout;
exports.setDotAttributesToElement = setDotAttributesToElement;
exports.shouldShowField = shouldShowField;
