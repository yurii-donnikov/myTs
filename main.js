Function.prototype.myBind = function (object, ...arg) {
    let copyObject = Object.assign({}, object);
    copyObject.func = this;
    return function (...arg2) {
        return copyObject.func(...arg, ...arg2)
    }
}