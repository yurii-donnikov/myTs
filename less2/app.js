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
Array.prototype.myFilter = function (funcFilter) {
    var resultArray = [];
    for (var i = 0; i < this.length; i++) {
        if (funcFilter(this[i], i, this) === true) {
            resultArray.push(this[i]);
        }
    }
    return resultArray;
};
Array.prototype.myReduce = function (callback, startElement) {
    var result;
    if (startElement === undefined || startElement === 0) {
        result = 0;
    }
    else
        result = startElement;
    for (var i = 0; i < this.length; i++) {
        result = callback(result, this[i]);
    }
    return result;
};
Array.prototype.sortSelection = function (callback) {
    var array = this;
    for (var i = 0; i < array.length; i++) {
        var resultElement = array[i];
        var index = 0;
        for (var j = i + 1; j < array.length; j++) {
            if (callback(resultElement, array[j])) {
                resultElement = array[j];
                index = j;
            }
        }
        if (index) {
            var temp = array[i];
            array[i] = resultElement;
            array[index] = temp;
        }
    }
};
Array.prototype.sortBubble = function (callback) {
    var array = this;
    for (var i = array.length - 1; i > 0; i--) {
        for (var j = 0; j < i; j++) {
            if (callback(array[j], array[j + 1])) {
                var copyElement = array[j];
                array[j] = array[j + 1];
                array[j + 1] = copyElement;
            }
        }
    }
};
