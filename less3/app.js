var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _BinaryNode_value, _BinaryNode_left, _BinaryNode_right;
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
var BinaryNode = /** @class */ (function () {
    function BinaryNode() {
        _BinaryNode_value.set(this, void 0);
        _BinaryNode_left.set(this, void 0);
        _BinaryNode_right.set(this, void 0);
        __classPrivateFieldSet(this, _BinaryNode_value, null, "f");
        __classPrivateFieldSet(this, _BinaryNode_left, null, "f");
        __classPrivateFieldSet(this, _BinaryNode_right, null, "f");
    }
    ;
    return BinaryNode;
}());
_BinaryNode_value = new WeakMap(), _BinaryNode_left = new WeakMap(), _BinaryNode_right = new WeakMap();
