//19.1
let monogrammaMemoiz = function (): Function {
    let cache: {
      [key: string]: boolean
    } = {};
    return function monogrammaRecursion(wordOne: string, wordTwo: string, count1 ? : number, count2 ? : number, arrayWordOne ? : string[], arrayWordTwo ? : string[]): boolean {
      if (typeof cache[wordOne + wordTwo] != 'undefined') {
        return cache[wordOne + wordTwo];
      }
      count1 = count1 || 0;
      count2 = count2 || 0;
      arrayWordOne = arrayWordOne || ('' + wordOne).split('');
      arrayWordTwo = arrayWordTwo || ('' + wordTwo).split('');
      if (arrayWordOne.length != arrayWordTwo.length) {
        return cache[wordOne + wordTwo] = false;
      }
      if (arrayWordOne.toString() == arrayWordTwo.toString()) {
        return cache[wordOne + wordTwo] = true;
      } else {
        if (arrayWordOne[count1] == arrayWordTwo[count2] || count2 > arrayWordOne.length - 1) {
          if (count1 > arrayWordOne.length - 1) {
            return false;
          }
          let deleteElem = arrayWordTwo.splice(count2, 1);
          arrayWordTwo.push(deleteElem[0]);
          count2 = 0;
          return monogrammaRecursion(wordOne, wordTwo, ++count1, count2, arrayWordOne, arrayWordTwo);
        } else {
          if (count1 > arrayWordOne.length - 1 || count2 > arrayWordOne.length - 1) {
            return false;
          }
          return monogrammaRecursion(wordOne, wordTwo, count1, ++count2, arrayWordOne, arrayWordTwo);
        }
      }
    }
  }
  //19.4
  let findSumUniqueWord = function (): Function {
    let cache: {
      [key: string]: number
    } = {};
    return function findSumUniqueWordRecursion(offer: string, word: string, count ? : number, result ? : number): number | null {
      count = count || 0;
      result = result || 0;
      let arrayOffer: string[] = offer.split(' ');
      if (!arguments[1]) {
        return null;
      }
      if (cache[offer + word]) {
        return cache[offer + word];
      }
      if (count < arrayOffer.length) {
        if (arrayOffer[count] == word) {
          result++;
          return findSumUniqueWordRecursion(offer, word, ++count, result);
        }
        return findSumUniqueWordRecursion(offer, word, ++count, result);
      }
      return cache[offer + word] = result;
    }
  }
  
  
  //19.3
  let calculateDigitsNumber = function (): Function {
    let cache: {
      [key: string]: {
        [key: string]: number
      }
    } = {};
    return function calculateDigitsNumberRecursion(numeric: number, result ? : {
      [key: string]: number
    }, count ? : number, arrayNumber ? : string[]): object | null {
      if (typeof arguments[0] == 'undefined') {
        return null;
      }
      if (cache[numeric]) {
        return cache[numeric];
      }
      count = count || 0;
      result = result || {};
      arrayNumber = arrayNumber || ('' + numeric).split('');
      if (count < arrayNumber.length) {
        if (result[arrayNumber[count]]) {
          result[arrayNumber[count]]++;
        } else {
          result[arrayNumber[count]] = 1;
        }
        return calculateDigitsNumberRecursion(numeric, result, ++count, arrayNumber);
      }
      return cache[numeric] = result;
    }
  }
  
  
  
  
  //19.5
  let findSumWord = function (): Function {
    let cache: {
      [key: string]: {
        [key: string]: number
      }
    } = {};
    return function findCountWordRecurcion(offer: string, result ? : {
      [key: string]: number
    }, count ? : number, arrayOffer ? : string[]): object | null {
      count = count || 0;
      result = result || {};
      arrayOffer = arrayOffer || ('' + offer).split(' ');
      if (cache[offer]) {
        return cache[offer];
      }
      if (!arguments[0]) {
        return null;
      }
      if (count < arrayOffer.length) {
        if (result[arrayOffer[count]]) {
          result[arrayOffer[count]]++;
        } else {
          result[arrayOffer[count]] = 1;
        }
        return findCountWordRecurcion(offer, result, ++count, arrayOffer);
      }
      return cache[offer] = result;
    }
  }
  
  
  //19.6
  let calculateFibonachi = function (): Function {
    let cache: number[] = [];
    return function calculateFibonachiRecurcion(numeric: number, result ? : number[], count ? : number): number | null {
      if (cache[numeric]) {
        return cache[numeric]
      }
      if (typeof arguments[0] === 'undefined') {
        return null;
      }
      result = result || [0, 1];
      count = count || 0;
      let start = result[result.length - 2];
      let stop = result[result.length - 1];
      let sum = start + stop;
      if (count < numeric - 1) {
        result.push(sum);
        return calculateFibonachiRecurcion(numeric, result, ++count);
      }
      cache = result;
      return cache[numeric]
    }
  }
  //19.8
  let calculateFactorial = function (): Function {
    let cache: number[] = [];
    return function calculateFactorialRecursion(num: number, count ? : number, result ? : number[]): number | null {
      if (typeof arguments[0] == 'undefined') {
        return null;
      }
      if (cache[num]) {
        return cache[num];
      }
      result = result || [1, 1];
      count = count || 2;
      if (typeof result[num] === 'undefined') {
        result.push((result[result.length - 1]) * count);
        return calculateFactorialRecursion(num, ++count, result);
      }
      cache = result;
      return cache[num];
    }
  }
  //19.9
  let calculateSumElements = function (): Function {
    let cache: {
      [key: string]: number
    } = {};
    return function calculateSumElementsRecursion(array: number[], callback: Function, count ? : number, result ? : number): number {
      if (cache[array + String(callback)]) {
        return cache[array + String(callback)];
      }
      count = count || 0;
      result = result || 0;
      if (count < array.length) {
        if (callback(array, count)) {
          result += array[count];
          return calculateSumElementsRecursion(array, callback, ++count, result);
        }
        return calculateSumElementsRecursion(array, callback, ++count, result);
      }
      return cache[array + String(callback)] = result;
    }
  }
  //19.10
  let calculateAmountElements = function (): Function {
    let cache: {
      [key: string]: number
    } = {};
    return function calculateAmountElementsRecursion(array: number[], callback: Function, count ? : number, result ? : number): number {
      if (cache[array + String(callback)]) {
        return cache[array + String(callback)];
      }
      count = count || 0;
      result = result || 0;
      if (count < array.length - 1) {
        if (callback(array, count)) {
          result++;
          return calculateAmountElementsRecursion(array, callback, ++count, result);
        }
        return calculateAmountElementsRecursion(array, callback, ++count, result);
      } else {
        if (callback(array, count)) {
          return cache[array + String(callback)] = ++result;
        }
        return cache[array + String(callback)] = result;
      }
    }
  }
  //19.11
  let FindNumSystemTen = function(): Function {
      let cache: {
          [key: string]: number
      } = {};
      return function FindNumSystemTenRecursion(numSystemTwo: number, count?: number, arrayNum?: string[], result?: number): number | null {
          if (cache[numSystemTwo]) {
              return cache[numSystemTwo];
          }
          if(typeof arguments[0] == 'undefined'){
              return null;
          }
          result = result || 0;
          arrayNum = arrayNum || ('' + numSystemTwo).split('').reverse();
          count = count || 0;
          if (count < arrayNum.length) {
              result += Number(arrayNum[count]) * (Math.pow(2, count));
              return FindNumSystemTenRecursion(numSystemTwo, ++count, arrayNum, result);
          }
          return cache[numSystemTwo] = result;
      }
  }
  let findNumSystemTwo = function(): Function {
      let cache: {
          [key: string]: number
      } = {};
      return function findNumSystemTwoRecursion(numeric: number, result?: string, numberCopy?: number): number | null {
          numberCopy = numberCopy || numeric;
          if (cache[numeric]) {
              return cache[numeric];
          }
          let sum;
          result = result || '';
          if (typeof arguments[0] == 'undefined') {
              return null;
          }
          if ((sum = numberCopy / 2) >= 1) {
              if (sum % 2 == parseInt(String(sum % 2))) {
                  result += '0';
                  return findNumSystemTwoRecursion(numeric, result, parseInt(String(sum)));
              } else {
                  result += '1';
                  return findNumSystemTwoRecursion(numeric, result, parseInt(String(sum)));
              }
          }
          result += '1';
          return cache[numeric] = Number(result.split('').reverse().join(''));
      }
  }
  //19.12
  let calculateSumElementsDubleArray = function(): Function {
      let cache: {
          [key: string]: number
      } = {};
      return function findSumDubleArrayRecurcion(array: number[][], callback: Function, index?: number, index2?: number, result?: number): number {
          if (cache[array + String(callback)]) {
              return cache[array + String(callback)];
          }
          index = index || 0;
          index2 = index2 || 0;
          result = result || 0;
          if (index < array.length) {
              if (index2 < array[index].length) {
                  if (callback(index, index2)) {
                      result += array[index][index2];
                  }
                  return findSumDubleArrayRecurcion(array, callback, index, ++index2, result);
              }
              index2 = 0;
              return findSumDubleArrayRecurcion(array, callback, ++index, index2, result);
          }
          return cache[array + String(callback)] = result;
      }
  }
  let calculateAmountElementsDubleArray = function(): Function {
      let cache: {
          [key: string]: {
              [key: string]: number
          }
      } = {};
      return function findNumbersDubleArrayRecurcion (array: number[][], callback: Function, count?: number, countTwo?: number, result?: {[key: string]: number}): object {
          if (cache[array + String(callback)]) {
              return cache[array + String(callback)];
          }
          count = count || 0;
          countTwo = countTwo || 0;
          result = result || {};
          if (count < array.length) {
              if (countTwo < array[count].length) {
                  if (callback(count, countTwo)) {
                      if (result[array[count][countTwo]]) {
                          result[array[count][countTwo]]++;
                      } else {
                          result[array[count][countTwo]] = 1;
                      }
                  }
                  return findNumbersDubleArrayRecurcion(array, callback, count, ++countTwo, result);
              }
              countTwo = 0;
              return findNumbersDubleArrayRecurcion(array, callback, ++count, countTwo, result);
          }
          return cache[array + String(callback)] = result;
      }
  }
  //19.13
  let sumMinToMax = function(): Function {
      let cache: {
          [key: string]: number
      } = {};
      return function sumMinToMaxRecurcion(array: number[], callback: Function, minElem?: number, maxElem?: number, index?: number, index2?: number): number {
          if (cache[array + String(callback)]) {
              return cache[array + String(callback)];
          }
          minElem = minElem || array[0];
          maxElem = maxElem || array[0];
          index = index || 0;
          index2 = index2 || 1;
          if (index < array.length) {
              if (array[index] < minElem && callback(index)) {
                  minElem = array[index];
              }
              if (array[index] > maxElem && callback(index)) {
                  maxElem = array[index];
              }
              return sumMinToMaxRecurcion(array, callback, minElem, maxElem, ++index);
          }
          if (index2 <= maxElem) {
              minElem = minElem + index2;
              return sumMinToMaxRecurcion(array, callback, minElem, maxElem, index, ++index2);
          }
          minElem--;
          return cache[array + String(callback)] = minElem;
      }
  }
  //19.14
  let AvergeNumber = function (): Function {
      let cache: {
          [key: string]: number
      } = {};
      return function AvergeNumberRecurion(array: number[], callback: Function, result?: number, count?: number, amountElem?: number): number {
          if (cache[array + String(callback)]) {
              return cache[array + String(callback)];
          }
          count = count || 0;
          result = result || 0;
          amountElem = amountElem || 0;
          if (count < array.length) {
              if (callback(count)) {
                  result += array[count];
                  return AvergeNumberRecurion(array, callback, result, ++count, ++amountElem);
              }
              return AvergeNumberRecurion(array, callback, result, ++count, amountElem);
          } 
          return cache[array + String(callback)] = (result / amountElem);
      }
  }
  let AvergeNumberDobleArray = function (): Function {
      let cache: {
          [key: string]: number
      } = {};
      return function AvergeNumberDobleArrayRecursion (array: number[][], callback: Function, index?: number, index2?: number, result?: number, amountElem?: number): number {
          if (cache[array + String(callback)]) {
              return cache[array + String(callback)];
          }
          index = index || 0;
          index2 = index2 || 0;
          result = result || 0;
          amountElem = amountElem || 0;
          if (index < array.length) {
              if (index2 < array[index].length) {
                  if (callback(index, index2)) {
                      result += array[index][index2];
                      amountElem++;
                  }
                  return AvergeNumberDobleArrayRecursion(array, callback, index, ++index2, result, amountElem);
              }
              index2 = 0;
              return AvergeNumberDobleArrayRecursion(array, callback, ++index, index2, result, amountElem);
          } 
          return cache[array + String(callback)] = result / amountElem;
      }
  }
  //19.15
  let transponentMatrix = function (): Function {
      let cache: {
          [key: string]: number[][]
      } = {};
      return function transponentMatrixRecursion (matrix: number[][], index?: number, index2?: number, result?: number[][]): number[][] {
          if (cache[String(matrix)]) {
              return cache[String(matrix)];
          };
          result = result || [];
          index = index || 0;
          index2 = index2 || 0;
          if (index < matrix[0].length) {
              if (typeof result[index] == 'undefined') {
                  result[index] = [];
              }
              if (index2 < matrix.length) {
                  result[index][index2] = matrix[index2][index];
                  return transponentMatrixRecursion(matrix, index, ++index2, result);
              }
              index2 = 0;
              return transponentMatrixRecursion(matrix, ++index, index2, result);
          }
          return cache[String(matrix)] = result;
      }
  }
  //19.16
  let addTwoMatrix = function (): Function {
      let cache: {
          [key: string]: number[][]
      } = {};
      return function addTwoMatrixRecurcion (matrix: number[][], matrix2: number[][], index?: number, index2?: number, result?: number[][]): number[][] {
          if (cache[matrix + String(matrix2)]) {
              return cache[matrix + String(matrix2)];
          }
          result = result || [];
          index = index || 0;
          index2 = index2 || 0;
          if (index < matrix.length) {
              if (typeof result[index] == 'undefined') {
                  result[index] = [];
              }
              if (index2 < matrix[0].length) {
                  result[index][index2] = matrix[index][index2] + matrix2[index][index2];
                  return addTwoMatrixRecurcion(matrix, matrix2, index, ++index2, result);
              }
              index2 = 0;
              return addTwoMatrixRecurcion(matrix, matrix2, ++index, index2, result);
          } 
          return cache[matrix + String(matrix2)] = result;
      }
  }
  //19.17
  let deleteValueString = function (): Function {
      let cache: {
          [key: string]: number[][]
      } = {};
      return function deleteValueStringRecursion (matrix: number[][], value: number, index?: number, index2?: number, copyMatrix?: number[][]): number[][] {
          copyMatrix = copyMatrix || matrix;
          if (cache[String(copyMatrix)]) {
              console.log(cache)
              return cache[String(matrix)];
          }
          cache[0] = matrix;
          index = index || 0;
          index2 = index2 || 0;
          if (matrix.length == 0) {
              return matrix;
          }
          if (index < matrix.length) {
              if (index2 < matrix[index].length) {
                  if (matrix[index][index2] == value) {
                      matrix.splice(index, 1);
                      if (index != 0) {
                          --index;
                      }
                      return deleteValueStringRecursion(matrix, value, index, index2, copyMatrix);
                  }
                  return deleteValueStringRecursion(matrix, value, index, ++index2, copyMatrix);
              }
              index2 = 0;
              return deleteValueStringRecursion(matrix, value, ++index, index2, copyMatrix);
          }
          return cache[String(copyMatrix)] = matrix;
      }
  }
  