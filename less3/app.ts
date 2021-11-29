interface Array<T> {
    sortSelection(callback: T): void;
    sortBubble(callback: T): void;
}
Array.prototype.sortSelection = function (callback: Function): void{
    let array: number[] | string[] = this;
    for(let i: number = 0; i < array.length; i++){
        let resultElement: number | string = array[i];
        let index: number = 0;
        for(let j: number = i + 1; j < array.length; j++){
            if(callback(resultElement, array[j])){
                resultElement = array[j];
                index = j;
            }
        }
        if(index){
            let temp: number | string = array[i];
            array[i] = resultElement;
            array[index] = temp;
        }
    }
}
Array.prototype.sortBubble = function (callback: Function): void {
    let array: number[] | string[] = this;
    for (let i: number = array.length - 1; i > 0; i--) {
      for (let j: number = 0; j < i; j++) {
        if (callback(array[j], array[j + 1])) {
          let copyElement: number | string = array[j];
          array[j] = array[j + 1];
          array[j + 1] = copyElement;
        }
      }
    }
}



interface InterfaceNode<T> {
    value: T | null;
    left: InterfaceNode<T> | null;
    right: InterfaceNode<T> | null;
  }
  
  class BinaryNode<T> {
      value: T | null;
      left: InterfaceNode<T> | null;
      right: InterfaceNode<T> | null;
  
      constructor() {
          this.value = null;
          this.right = null;
          this.left = null;
      }
      insert(value: T, node: InterfaceNode<T>): BinaryNode<T> | void | boolean {
          node = node || this;
          //if (!(value in node)
          if(!node.value) {
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
  
      }
      search(value: T, node?: InterfaceNode<T>): null | void | T {
          node = node || this;
          if(arguments[0] === undefined){
              return null;
          }
          
          if(node.value === value){
              return node.value;
          }
          if(node.value && node.value > value) {
              if(node.left === null) {
                  return null;
              }
              return this.search(value, node.left);
          }
          if(node.value && node.value < value) {
              if(node.right === null) {
                  return null;
              }
              return this.search(value, node.right);
          }
          return null
      }
      remove(value: T, node?: InterfaceNode<T>, linkParent?: InterfaceNode<T>, flag?: boolean): null | void | T{
          if(arguments[0] === undefined){
              return null;
          }
          if(!this.search(value) ){
              return null;
          }
          node = node || this;
          linkParent = linkParent || this;
          flag = flag || false;
          if(flag) {
            if (node.right !== null) {
            return this.remove(value, node.right, node, flag);
            } else {
              linkParent.right = null;
              return node.value;
            
              
            }
          }
          if(node.value === value) {
            if (node.left === null && node.right === null){
                if(linkParent.left && linkParent.left.value === node.value){
                  linkParent.left = null;
                } else{
                  linkParent.right = null;
                }
            }
            if(node.left === null && node.right){
                node.value = node.right.value;
                node.right = node.right.right;
            }
            if(node.left && node.right === null){
                node.value = node.left.value;
                node.left = node.left.left;
            }
            if(node.left && node.right) {
              if(node.left.right) {
                flag = true;
                Object.defineProperty(node, 'value', {
                  enumerable: false,
                  writable: false,
                  configurable: false,
                  value: this.remove(value, node.left, node, flag)
                })
                //node[value] = this.remove(value, node.left, node, flag);
                flag = false;
              } else {
                node.value = node.left.value;
                node.left = node.left.left;
              }
            }
          } else {
            if(node.value && node.value < value) {
                if (node.right !== null) {
                    return this.remove(value, node.right, node, flag);
                }
            }
            if(node.value && node.value > value) {
                if (node.left !== null) {
                    return this.remove(value, node.left, node, flag);
                }
            }
          }
      }
  }