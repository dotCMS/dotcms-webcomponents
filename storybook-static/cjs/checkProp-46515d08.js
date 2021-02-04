'use strict';

const DATE_REGEX = new RegExp('^\\d\\d\\d\\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])');
const TIME_REGEX = new RegExp('^(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])$');
/**
 * Check if date is valid, returns a valid date string, otherwise null.
 *
 * @param string date
 * @returns string
 */
function dotValidateDate(date) {
    return DATE_REGEX.test(date) ? date : null;
}
/**
 * Check if time is valid, returns a valid time string, otherwise null.
 *
 * @param string time
 * @returns string
 */
function dotValidateTime(time) {
    return TIME_REGEX.test(time) ? time : null;
}
/**
 * Parse a data-time string that can contains 'date time' | date | time.
 *
 * @param string data
 * @returns DotDateSlot
 */
function dotParseDate(data) {
    const [dateOrTime, time] = data ? data.split(' ') : '';
    return {
        date: dotValidateDate(dateOrTime),
        time: dotValidateTime(time) || dotValidateTime(dateOrTime)
    };
}
/**
 * Check if DotDateSlot is valid based on the raw data.
 *
 * @param DotDateSlot dateSlot
 * @param string rawData
 */
function isValidDateSlot(dateSlot, rawData) {
    return !!rawData
        ? rawData.split(' ').length > 1
            ? isValidFullDateSlot(dateSlot)
            : isValidPartialDateSlot(dateSlot)
        : false;
}
/**
 * Check if a DotDateSlot have date and time set
 *
 * @param DotDateSlot dateSlot
 * @returns boolean
 */
function isValidFullDateSlot(dateSlot) {
    return !!dateSlot.date && !!dateSlot.time;
}
/**
 * Check is there as least one valid value in the DotDateSlot
 *
 * @param DotDateSlot dateSlot
 * @returns boolean
 */
function isValidPartialDateSlot(dateSlot) {
    return !!dateSlot.date || !!dateSlot.time;
}

class DotFieldPropError extends Error {
    constructor(propInfo, expectedType) {
        super(`Warning: Invalid prop "${propInfo.name}" of type "${typeof propInfo.value}" supplied to "${propInfo.field.type}" with the name "${propInfo.field.name}", expected "${expectedType}".
Doc Reference: https://github.com/dotCMS/core-web/blob/master/projects/dotcms-field-elements/src/components/${propInfo.field.type}/readme.md`);
        this.propInfo = propInfo;
    }
    getProps() {
        return Object.assign({}, this.propInfo);
    }
}

/**
 * Check if the value of PropValidationInfo is a string.
 *
 * @param PropValidationInfo propInfo
 */
function stringValidator(propInfo) {
    if (typeof propInfo.value !== 'string') {
        throw new DotFieldPropError(propInfo, 'string');
    }
}
/**
 * Check if the value of PropValidationInfo is a valid Regular Expression.
 *
 * @param PropValidationInfo propInfo
 */
function regexValidator(propInfo) {
    try {
        RegExp(propInfo.value.toString());
    }
    catch (e) {
        throw new DotFieldPropError(propInfo, 'valid regular expression');
    }
}
/**
 * Check if the value of PropValidationInfo is a Number.
 *
 * @param PropValidationInfo propInfo
 */
function numberValidator(propInfo) {
    if (isNaN(Number(propInfo.value))) {
        throw new DotFieldPropError(propInfo, 'Number');
    }
}
/**
 * Check if the value of PropValidationInfo is a valid Date, eg. yyyy-mm-dd.
 *
 * @param PropValidationInfo propInfo
 */
function dateValidator(propInfo) {
    if (!dotValidateDate(propInfo.value.toString())) {
        throw new DotFieldPropError(propInfo, 'Date');
    }
}
const areRangeDatesValid = (start, end, propInfo) => {
    if (start > end) {
        throw new DotFieldPropError(propInfo, 'Date');
    }
};
/**
 * Check if the value of PropValidationInfo has two valid dates (eg. yyyy-mm-dd) and the first one should higher than the second one.
 *
 * @param PropValidationInfo propInfo
 */
function dateRangeValidator(propInfo) {
    const [start, end] = propInfo.value.toString().split(',');
    if (!dotValidateDate(start) || !dotValidateDate(end)) {
        throw new DotFieldPropError(propInfo, 'Date');
    }
    areRangeDatesValid(new Date(start), new Date(end), propInfo);
}
/**
 * Check if the value of PropValidationInfo is a valid Time, eg. hh:mm:ss.
 *
 * @param PropValidationInfo propInfo
 */
function timeValidator(propInfo) {
    if (!dotValidateTime(propInfo.value.toString())) {
        throw new DotFieldPropError(propInfo, 'Time');
    }
}
/**
 * Check if the value of PropValidationInfo has a valid date and time | date | time.
 * eg. 'yyyy-mm-dd hh:mm:ss' | 'yyyy-mm-dd' | 'hh:mm:ss'
 *
 * @param PropValidationInfo propInfo
 */
function dateTimeValidator(propInfo) {
    if (typeof propInfo.value === 'string') {
        const dateSlot = dotParseDate(propInfo.value);
        if (!isValidDateSlot(dateSlot, propInfo.value)) {
            throw new DotFieldPropError(propInfo, 'Date/Time');
        }
    }
    else {
        throw new DotFieldPropError(propInfo, 'Date/Time');
    }
}

const PROP_VALIDATION_HANDLING = {
    date: dateValidator,
    dateRange: dateRangeValidator,
    dateTime: dateTimeValidator,
    number: numberValidator,
    options: stringValidator,
    regexCheck: regexValidator,
    step: stringValidator,
    string: stringValidator,
    time: timeValidator,
    type: stringValidator,
    accept: stringValidator
};
const FIELDS_DEFAULT_VALUE = {
    options: '',
    regexCheck: '',
    value: '',
    min: '',
    max: '',
    step: '',
    type: 'text',
    accept: null
};
function validateProp(propInfo, validatorType) {
    if (!!propInfo.value) {
        PROP_VALIDATION_HANDLING[validatorType || propInfo.name](propInfo);
    }
}
function getPropInfo(element, propertyName) {
    return {
        value: element[propertyName],
        name: propertyName,
        field: {
            name: element['name'],
            type: element['el'].tagName.toLocaleLowerCase()
        }
    };
}
function checkProp(component, propertyName, validatorType) {
    const proInfo = getPropInfo(component, propertyName);
    try {
        validateProp(proInfo, validatorType);
        return component[propertyName];
    }
    catch (error) {
        console.warn(error.message);
        return FIELDS_DEFAULT_VALUE[propertyName];
    }
}

exports.checkProp = checkProp;
exports.dotParseDate = dotParseDate;
