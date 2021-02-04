'use strict';

/**
 * Enum to represent Errors in the Binary Field.
 */
(function (DotBinaryMessageError) {
    DotBinaryMessageError[DotBinaryMessageError["REQUIRED"] = 0] = "REQUIRED";
    DotBinaryMessageError[DotBinaryMessageError["INVALID"] = 1] = "INVALID";
    DotBinaryMessageError[DotBinaryMessageError["URLINVALID"] = 2] = "URLINVALID";
})(exports.DotBinaryMessageError || (exports.DotBinaryMessageError = {}));
