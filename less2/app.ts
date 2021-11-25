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
}

Array.prototype.myForEach = function <K> (calcForEach: Function): void {
    for (let i: number = 0; i < this.length; i++) {
        calcForEach(this[i], i, this);
    }
}