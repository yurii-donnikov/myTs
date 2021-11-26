interface Function {
    myBind<T>(obj: object, ...arg: Array<T>): Function;
    myCall<T>(obj: object, ...arg: Array<T>): T;
}

Function.prototype.myBind = function <T>(obj: object, ...arg: Array<T>): Function {
let copyObject: Record<string | number | symbol, any> = Object.create(obj);
    copyObject['func'] = this as Function;
    return function <T> (...arg2: Array<T>): T {
      return copyObject['func'](...arg, ...arg2) ;
    }
}

Function.prototype.myCall = function <T>(obj: object, ...arg: Array<T>): T{
    let copyObj: Record<string | number | symbol, any> = Object.create(obj);
    copyObj['func'] = this as Function;
    return copyObj['func'](...arg);
}
  
interface Array<T> {
    myForEach<K>(calcForEach: T): void;
    myMap<K>(calcForEach: T): any[];
    myFilter<K>(funcFilter: T): Array<K>
    myReduce<K>(callback: T, startElement: number): number
}

Array.prototype.myForEach = function <K> (calcForEach: Function): void {
    for (let i: number = 0; i < this.length; i++) {
        calcForEach(this[i], i, this);
    }
}
Array.prototype.myMap = function <K>(callback: Function): any[] {
    let resultArray: any[] = [];
    for (let i = 0; i < this.length; i++) {
        resultArray.push(callback(this[i], i, this));
    }
    return resultArray;
}
Array.prototype.myFilter = function<K>(funcFilter: Function): Array<K> {
    let resultArray: Array<K> = [];
    for (let i = 0; i < this.length; i++) {
        if (funcFilter(this[i], i, this) === true) {
            resultArray.push(this[i]);
        }
    }
    return resultArray;
}

Array.prototype.myReduce = function(callback: Function, startElement: number): number {
    let result: number;
    if (startElement === undefined || startElement === 0) {
        result = 0;
    } else result = startElement;
    for (let i = 0; i < this.length; i++) {
        result = callback(result, this[i]);
    }
    return result;
}

// let fibonachiElements: {[key: string]: number | Function | symbol}  = {
//     fibonachi (number: number): void {
//         for(let i: number = 0; i <= number; i++) {
//             let index: number = i - 2
//             let index123: number = i - 1
//             if(!fibonachiElements.hasOwnProperty(i - 2)){
//               fibonachiElements[i] = i;
//             } else {
//               let keys: number = Number(fibonachiElements[index123]) + Number(fibonachiElements[index]);
//                fibonachiElements[i] = keys
//             }
//         }
//     },
//     [Symbol.iterator](): object {
//         let counter: number = 0;
//         return {
//             next : function (): object {
//                 return {
//                     value: fibonachiElements[counter],
//                     done: fibonachiElements[counter++] === undefined,
//                 }
//             }
//         }
//     }
// }
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


class BinaryNode {
    #value: number | null;
    #left: Function | null;
    #right: Function | null;;
    constructor() {
        this.#value = null;
        this.#left = null;
        this.#right = null;
    }
    insert(value: number, node?: object): boolean | Function {
        node = node || this;
        if (node.#value === null) {
            node.#value = value;
            return true;
        }
        if (node.#value > value) {
            if (node.#left === null) {
                node.#left = new BinaryNode();
            }
            return this.insert(value, node.#left);
        }
        if (node.#value < value) {
            if (node.#right === null) {
                node.#right = new BinaryNode();
            }
            return this.insert(value, node.#right);
        }
    }
    // search(value, node) {
    //     node = node || this;
    //     if(arguments[0] === undefined){
    //         return null;
    //     }
    //     if(node.#value === value){
    //         return node.#value;
    //     }
    //     if(node.#value > value) {
    //         if(node.#left === null) {
    //             return null;
    //         }
    //         return this.search(value, node.#left);
    //     }
    //     if(node.#value < value) {
    //         if(node.#right === null) {
    //             return null;
    //         }
    //         return this.search(value, node.#right);
    //     }
    // }
    // remove(value, node, linkParent, flag){
    //     if(arguments[0] === undefined){
    //         return null;
    //     }
    //     if(!this.search(value)){
    //         return null;
    //     }
    //     node = node || this;
    //     linkParent = linkParent || this;
    //     flag = flag || false;
    //     if(flag) {
    //       if (node.#right !== null) {
    //       return this.remove(value, node.#right, node, flag);
    //       } else {
    //         linkParent.#right = null;
    //         return node.#value;
    //       }
    //     }
    //     if(node.#value === value) {
    //       if (node.#left === null && node.#right === null){
    //           if(linkParent.#left && linkParent.#left.#value === node.#value){
    //             linkParent.#left = null;
    //           } else{
    //             linkParent.#right = null;
    //           }
    //       }
    //       if(node.#left === null && node.#right){
    //           node.#value = node.#right.#value;
    //           node.#right = node.#right.#right;
    //       }
    //       if(node.#left && node.#right === null){
    //           node.#value = node.#left.#value;
    //           node.#left = node.#left.#left;
    //       }
    //       if(node.#left && node.#right) {
    //         if(node.#left.#right) {
    //           flag = true;
    //           node.#value = this.remove(value, node.#left, node, flag);
    //           flag = false;
    //         } else {
    //           node.#value = node.#left.#value;
    //           node.#left = node.#left.#left;
    //         }
    //       }
    //     } else {
    //       if(node.#value < value) {
    //           return this.remove(value, node.#right, node, flag);
    //       }
    //       if(node.#value > value) {
    //           return this.remove(value, node.#left, node, flag);
    //       }
    //     }
    // }
}