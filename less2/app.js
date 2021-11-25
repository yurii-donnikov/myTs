var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Function.prototype.myBind = function (obj) {
    var arg = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        arg[_i - 1] = arguments[_i];
    }
    var copyObject = Object.create(obj);
    copyObject['func'] = this;
    return function () {
        var arg2 = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg2[_i] = arguments[_i];
        }
        return copyObject['func'].apply(copyObject, __spreadArray(__spreadArray([], arg, false), arg2, false));
    };
};
Function.prototype.myCall = function (obj) {
    var arg = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        arg[_i - 1] = arguments[_i];
    }
    var copyObj = Object.create(obj);
    copyObj['func'] = this;
    return copyObj['func'].apply(copyObj, arg);
};
Array.prototype.myForEach = function (calcForEach) {
    for (var i = 0; i < this.length; i++) {
        calcForEach(this[i], i, this);
    }
};
Array.prototype.myMap = function (callback) {
    var resultArray = [];
    for (var i = 0; i < this.length; i++) {
        resultArray.push(callback(this[i], i, this));
    }
    return resultArray;
};
