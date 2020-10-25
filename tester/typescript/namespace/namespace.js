var lettersRegexp = /^[A-za-z]+$/;
var numberRegexp = /^[0-9]+$/;
var lettersOnlyValidator = /** @class */ (function () {
    function lettersOnlyValidator() {
    }
    lettersOnlyValidator.prototype.isAcceptable = function (s) {
        return lettersRegexp.test(s);
    };
    return lettersOnlyValidator;
}());
var zipCodeValidator = /** @class */ (function () {
    function zipCodeValidator() {
    }
    zipCodeValidator.prototype.isAcceptable = function (s) {
        return s.length === 5 && numberRegexp.test(s);
    };
    return zipCodeValidator;
}());
// ome example to try
var strings = ["Hello", "98052", "101"];
// validator to use
var validators = {};
for (var _i = 0, strings_1 = strings; _i < strings_1.length; _i++) {
    var s = strings_1[_i];
    for (var name_1 in validators) {
        var isMatch = validators[name_1].isAcceptable(s);
        console.log("'" + s + "' " + (isMatch ? "matches" : "does not match") + " '" + name_1 + "'.");
    }
}
