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
        this.value = null;
        this.right = null;
        this.left = null;
    }
    BinaryNode.prototype.insert = function (value, node) {
        node = node || this;
        if (!node.value) {
            node.value = value;
            return true;
        }
        if (value > node.value) {
            if (node.right === null) {
                node.right = new BinaryNode();
            }
            return this.insert(value, node.right);
        }
        if (node.value > value) {
            if (node.left === null) {
                node.left = new BinaryNode();
            }
            return this.insert(value, node.left);
        }
    };
    BinaryNode.prototype.search = function (value, node) {
        node = node || this;
        if (arguments[0] === undefined) {
            return null;
        }
        if (node.value === value) {
            return node.value;
        }
        if (node.value && node.value > value) {
            if (node.left === null) {
                return null;
            }
            return this.search(value, node.left);
        }
        if (node.value && node.value < value) {
            if (node.right === null) {
                return null;
            }
            return this.search(value, node.right);
        }
        return null;
    };
    BinaryNode.prototype.remove = function (value, node, linkParent, flag) {
        if (arguments[0] === undefined) {
            return null;
        }
        if (!this.search(value)) {
            return null;
        }
        node = node || this;
        linkParent = linkParent || this;
        flag = flag || false;
        if (flag) {
            if (node.right !== null) {
                return this.remove(value, node.right, node, flag);
            }
            else {
                linkParent.right = null;
                return node.value;
            }
        }
        if (node.value === value) {
            if (node.left === null && node.right === null) {
                if (linkParent.left && linkParent.left.value === node.value) {
                    linkParent.left = null;
                }
                else {
                    linkParent.right = null;
                }
            }
            if (node.left === null && node.right) {
                node.value = node.right.value;
                node.right = node.right.right;
            }
            if (node.left && node.right === null) {
                node.value = node.left.value;
                node.left = node.left.left;
            }
            if (node.left && node.right) {
                if (node.left.right) {
                    flag = true;
                    Object.defineProperty(node, 'value', {
                        enumerable: false,
                        writable: false,
                        configurable: false,
                        value: this.remove(value, node.left, node, flag)
                    });
                    flag = false;
                }
                else {
                    node.value = node.left.value;
                    node.left = node.left.left;
                }
            }
        }
        else {
            if (node.value && node.value < value) {
                if (node.right !== null) {
                    return this.remove(value, node.right, node, flag);
                }
            }
            if (node.value && node.value > value) {
                if (node.left !== null) {
                    return this.remove(value, node.left, node, flag);
                }
            }
        }
    };
    return BinaryNode;
}());
