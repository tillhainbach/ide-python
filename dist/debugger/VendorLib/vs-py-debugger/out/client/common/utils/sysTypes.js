/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
}); // tslint:disable:rule1 no-any no-unnecessary-callback-wrapper jsdoc-format no-for-in prefer-const no-increment-decrement

const _typeof = {
  number: 'number',
  string: 'string',
  undefined: 'undefined',
  object: 'object',
  function: 'function'
};
/**
 * @returns whether the provided parameter is a JavaScript Array or not.
 */

function isArray(array) {
  if (Array.isArray) {
    return Array.isArray(array);
  }

  if (array && typeof array.length === _typeof.number && array.constructor === Array) {
    return true;
  }

  return false;
}

exports.isArray = isArray;
/**
 * @returns whether the provided parameter is a JavaScript String or not.
 */

function isString(str) {
  if (typeof str === _typeof.string || str instanceof String) {
    return true;
  }

  return false;
}

exports.isString = isString;
/**
 * @returns whether the provided parameter is a JavaScript Array and each element in the array is a string.
 */

function isStringArray(value) {
  return isArray(value) && value.every(elem => isString(elem));
}

exports.isStringArray = isStringArray;
/**
 *
 * @returns whether the provided parameter is of type `object` but **not**
 *	`null`, an `array`, a `regexp`, nor a `date`.
 */

function isObject(obj) {
  return typeof obj === _typeof.object && obj !== null && !Array.isArray(obj) && !(obj instanceof RegExp) && !(obj instanceof Date);
}

exports.isObject = isObject;
/**
 * In **contrast** to just checking `typeof` this will return `false` for `NaN`.
 * @returns whether the provided parameter is a JavaScript Number or not.
 */

function isNumber(obj) {
  if ((typeof obj === _typeof.number || obj instanceof Number) && !isNaN(obj)) {
    return true;
  }

  return false;
}

exports.isNumber = isNumber;
/**
 * @returns whether the provided parameter is a JavaScript Boolean or not.
 */

function isBoolean(obj) {
  return obj === true || obj === false;
}

exports.isBoolean = isBoolean;
/**
 * @returns whether the provided parameter is undefined.
 */

function isUndefined(obj) {
  return typeof obj === _typeof.undefined;
}

exports.isUndefined = isUndefined;
/**
 * @returns whether the provided parameter is undefined or null.
 */

function isUndefinedOrNull(obj) {
  return isUndefined(obj) || obj === null;
}

exports.isUndefinedOrNull = isUndefinedOrNull;
const hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * @returns whether the provided parameter is an empty JavaScript Object or not.
 */

function isEmptyObject(obj) {
  if (!isObject(obj)) {
    return false;
  }

  for (let key in obj) {
    if (hasOwnProperty.call(obj, key)) {
      return false;
    }
  }

  return true;
}

exports.isEmptyObject = isEmptyObject;
/**
 * @returns whether the provided parameter is a JavaScript Function or not.
 */

function isFunction(obj) {
  return typeof obj === _typeof.function;
}

exports.isFunction = isFunction;
/**
 * @returns whether the provided parameters is are JavaScript Function or not.
 */

function areFunctions(...objects) {
  return objects && objects.length > 0 && objects.every(isFunction);
}

exports.areFunctions = areFunctions;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN5c1R5cGVzLmpzIl0sIm5hbWVzIjpbIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwiX3R5cGVvZiIsIm51bWJlciIsInN0cmluZyIsInVuZGVmaW5lZCIsIm9iamVjdCIsImZ1bmN0aW9uIiwiaXNBcnJheSIsImFycmF5IiwiQXJyYXkiLCJsZW5ndGgiLCJjb25zdHJ1Y3RvciIsImlzU3RyaW5nIiwic3RyIiwiU3RyaW5nIiwiaXNTdHJpbmdBcnJheSIsImV2ZXJ5IiwiZWxlbSIsImlzT2JqZWN0Iiwib2JqIiwiUmVnRXhwIiwiRGF0ZSIsImlzTnVtYmVyIiwiTnVtYmVyIiwiaXNOYU4iLCJpc0Jvb2xlYW4iLCJpc1VuZGVmaW5lZCIsImlzVW5kZWZpbmVkT3JOdWxsIiwiaGFzT3duUHJvcGVydHkiLCJwcm90b3R5cGUiLCJpc0VtcHR5T2JqZWN0Iiwia2V5IiwiY2FsbCIsImlzRnVuY3Rpb24iLCJhcmVGdW5jdGlvbnMiLCJvYmplY3RzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBQSxNQUFNLENBQUNDLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQUVDLEVBQUFBLEtBQUssRUFBRTtBQUFULENBQTdDLEUsQ0FDQTs7QUFDQSxNQUFNQyxPQUFPLEdBQUc7QUFDWkMsRUFBQUEsTUFBTSxFQUFFLFFBREk7QUFFWkMsRUFBQUEsTUFBTSxFQUFFLFFBRkk7QUFHWkMsRUFBQUEsU0FBUyxFQUFFLFdBSEM7QUFJWkMsRUFBQUEsTUFBTSxFQUFFLFFBSkk7QUFLWkMsRUFBQUEsUUFBUSxFQUFFO0FBTEUsQ0FBaEI7QUFPQTtBQUNBO0FBQ0E7O0FBQ0EsU0FBU0MsT0FBVCxDQUFpQkMsS0FBakIsRUFBd0I7QUFDcEIsTUFBSUMsS0FBSyxDQUFDRixPQUFWLEVBQW1CO0FBQ2YsV0FBT0UsS0FBSyxDQUFDRixPQUFOLENBQWNDLEtBQWQsQ0FBUDtBQUNIOztBQUNELE1BQUlB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QUF5QlksR0FBekIsQ0FBSixFQUFtQztBQUMvQixhQUFPLEtBQVA7QUFDSDtBQUNKOztBQUNELFNBQU8sSUFBUDtBQUNIOztBQUNEaEMsT0FBTyxDQUFDK0IsYUFBUixHQUF3QkEsYUFBeEI7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsU0FBU0csVUFBVCxDQUFvQmQsR0FBcEIsRUFBeUI7QUFDckIsU0FBTyxPQUFPQSxHQUFQLEtBQWVsQixPQUFPLENBQUNLLFFBQTlCO0FBQ0g7O0FBQ0RQLE9BQU8sQ0FBQ2tDLFVBQVIsR0FBcUJBLFVBQXJCO0FBQ0E7QUFDQTtBQUNBOztBQUNBLFNBQVNDLFlBQVQsQ0FBc0IsR0FBR0MsT0FBekIsRUFBa0M7QUFDOUIsU0FBT0EsT0FBTyxJQUFJQSxPQUFPLENBQUN6QixNQUFSLEdBQWlCLENBQTVCLElBQWlDeUIsT0FBTyxDQUFDbkIsS0FBUixDQUFjaUIsVUFBZCxDQUF4QztBQUNIOztBQUNEbEMsT0FBTyxDQUFDbUMsWUFBUixHQUF1QkEsWUFBdkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbi8vIHRzbGludDpkaXNhYmxlOnJ1bGUxIG5vLWFueSBuby11bm5lY2Vzc2FyeS1jYWxsYmFjay13cmFwcGVyIGpzZG9jLWZvcm1hdCBuby1mb3ItaW4gcHJlZmVyLWNvbnN0IG5vLWluY3JlbWVudC1kZWNyZW1lbnRcclxuY29uc3QgX3R5cGVvZiA9IHtcclxuICAgIG51bWJlcjogJ251bWJlcicsXHJcbiAgICBzdHJpbmc6ICdzdHJpbmcnLFxyXG4gICAgdW5kZWZpbmVkOiAndW5kZWZpbmVkJyxcclxuICAgIG9iamVjdDogJ29iamVjdCcsXHJcbiAgICBmdW5jdGlvbjogJ2Z1bmN0aW9uJ1xyXG59O1xyXG4vKipcclxuICogQHJldHVybnMgd2hldGhlciB0aGUgcHJvdmlkZWQgcGFyYW1ldGVyIGlzIGEgSmF2YVNjcmlwdCBBcnJheSBvciBub3QuXHJcbiAqL1xyXG5mdW5jdGlvbiBpc0FycmF5KGFycmF5KSB7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheSkge1xyXG4gICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KGFycmF5KTtcclxuICAgIH1cclxuICAgIGlmIChhcnJheSAmJiB0eXBlb2YgKGFycmF5Lmxlbmd0aCkgPT09IF90eXBlb2YubnVtYmVyICYmIGFycmF5LmNvbnN0cnVjdG9yID09PSBBcnJheSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcbmV4cG9ydHMuaXNBcnJheSA9IGlzQXJyYXk7XHJcbi8qKlxyXG4gKiBAcmV0dXJucyB3aGV0aGVyIHRoZSBwcm92aWRlZCBwYXJhbWV0ZXIgaXMgYSBKYXZhU2NyaXB0IFN0cmluZyBvciBub3QuXHJcbiAqL1xyXG5mdW5jdGlvbiBpc1N0cmluZyhzdHIpIHtcclxuICAgIGlmICh0eXBlb2YgKHN0cikgPT09IF90eXBlb2Yuc3RyaW5nIHx8IHN0ciBpbnN0YW5jZW9mIFN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcbmV4cG9ydHMuaXNTdHJpbmcgPSBpc1N0cmluZztcclxuLyoqXHJcbiAqIEByZXR1cm5zIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHBhcmFtZXRlciBpcyBhIEphdmFTY3JpcHQgQXJyYXkgYW5kIGVhY2ggZWxlbWVudCBpbiB0aGUgYXJyYXkgaXMgYSBzdHJpbmcuXHJcbiAqL1xyXG5mdW5jdGlvbiBpc1N0cmluZ0FycmF5KHZhbHVlKSB7XHJcbiAgICByZXR1cm4gaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUuZXZlcnkoZWxlbSA9PiBpc1N0cmluZyhlbGVtKSk7XHJcbn1cclxuZXhwb3J0cy5pc1N0cmluZ0FycmF5ID0gaXNTdHJpbmdBcnJheTtcclxuLyoqXHJcbiAqXHJcbiAqIEByZXR1cm5zIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHBhcmFtZXRlciBpcyBvZiB0eXBlIGBvYmplY3RgIGJ1dCAqKm5vdCoqXHJcbiAqXHRgbnVsbGAsIGFuIGBhcnJheWAsIGEgYHJlZ2V4cGAsIG5vciBhIGBkYXRlYC5cclxuICovXHJcbmZ1bmN0aW9uIGlzT2JqZWN0KG9iaikge1xyXG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09IF90eXBlb2Yub2JqZWN0XHJcbiAgICAgICAgJiYgb2JqICE9PSBudWxsXHJcbiAgICAgICAgJiYgIUFycmF5LmlzQXJyYXkob2JqKVxyXG4gICAgICAgICYmICEob2JqIGluc3RhbmNlb2YgUmVnRXhwKVxyXG4gICAgICAgICYmICEob2JqIGluc3RhbmNlb2YgRGF0ZSk7XHJcbn1cclxuZXhwb3J0cy5pc09iamVjdCA9IGlzT2JqZWN0O1xyXG4vKipcclxuICogSW4gKipjb250cmFzdCoqIHRvIGp1c3QgY2hlY2tpbmcgYHR5cGVvZmAgdGhpcyB3aWxsIHJldHVybiBgZmFsc2VgIGZvciBgTmFOYC5cclxuICogQHJldHVybnMgd2hldGhlciB0aGUgcHJvdmlkZWQgcGFyYW1ldGVyIGlzIGEgSmF2YVNjcmlwdCBOdW1iZXIgb3Igbm90LlxyXG4gKi9cclxuZnVuY3Rpb24gaXNOdW1iZXIob2JqKSB7XHJcbiAgICBpZiAoKHR5cGVvZiAob2JqKSA9PT0gX3R5cGVvZi5udW1iZXIgfHwgb2JqIGluc3RhbmNlb2YgTnVtYmVyKSAmJiAhaXNOYU4ob2JqKSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcbmV4cG9ydHMuaXNOdW1iZXIgPSBpc051bWJlcjtcclxuLyoqXHJcbiAqIEByZXR1cm5zIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHBhcmFtZXRlciBpcyBhIEphdmFTY3JpcHQgQm9vbGVhbiBvciBub3QuXHJcbiAqL1xyXG5mdW5jdGlvbiBpc0Jvb2xlYW4ob2JqKSB7XHJcbiAgICByZXR1cm4gb2JqID09PSB0cnVlIHx8IG9iaiA9PT0gZmFsc2U7XHJcbn1cclxuZXhwb3J0cy5pc0Jvb2xlYW4gPSBpc0Jvb2xlYW47XHJcbi8qKlxyXG4gKiBAcmV0dXJucyB3aGV0aGVyIHRoZSBwcm92aWRlZCBwYXJhbWV0ZXIgaXMgdW5kZWZpbmVkLlxyXG4gKi9cclxuZnVuY3Rpb24gaXNVbmRlZmluZWQob2JqKSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIChvYmopID09PSBfdHlwZW9mLnVuZGVmaW5lZDtcclxufVxyXG5leHBvcnRzLmlzVW5kZWZpbmVkID0gaXNVbmRlZmluZWQ7XHJcbi8qKlxyXG4gKiBAcmV0dXJucyB3aGV0aGVyIHRoZSBwcm92aWRlZCBwYXJhbWV0ZXIgaXMgdW5kZWZpbmVkIG9yIG51bGwuXHJcbiAqL1xyXG5mdW5jdGlvbiBpc1VuZGVmaW5lZE9yTnVsbChvYmopIHtcclxuICAgIHJldHVybiBpc1VuZGVmaW5lZChvYmopIHx8IG9iaiA9PT0gbnVsbDtcclxufVxyXG5leHBvcnRzLmlzVW5kZWZpbmVkT3JOdWxsID0gaXNVbmRlZmluZWRPck51bGw7XHJcbmNvbnN0IGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcclxuLyoqXHJcbiAqIEByZXR1cm5zIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHBhcmFtZXRlciBpcyBhbiBlbXB0eSBKYXZhU2NyaXB0IE9iamVjdCBvciBub3QuXHJcbiAqL1xyXG5mdW5jdGlvbiBpc0VtcHR5T2JqZWN0KG9iaikge1xyXG4gICAgaWYgKCFpc09iamVjdChvYmopKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQga2V5IGluIG9iaikge1xyXG4gICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuZXhwb3J0cy5pc0VtcHR5T2JqZWN0ID0gaXNFbXB0eU9iamVjdDtcclxuLyoqXHJcbiAqIEByZXR1cm5zIHdoZXRoZXIgdGhlIHByb3ZpZGVkIHBhcmFtZXRlciBpcyBhIEphdmFTY3JpcHQgRnVuY3Rpb24gb3Igbm90LlxyXG4gKi9cclxuZnVuY3Rpb24gaXNGdW5jdGlvbihvYmopIHtcclxuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSBfdHlwZW9mLmZ1bmN0aW9uO1xyXG59XHJcbmV4cG9ydHMuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XHJcbi8qKlxyXG4gKiBAcmV0dXJucyB3aGV0aGVyIHRoZSBwcm92aWRlZCBwYXJhbWV0ZXJzIGlzIGFyZSBKYXZhU2NyaXB0IEZ1bmN0aW9uIG9yIG5vdC5cclxuICovXHJcbmZ1bmN0aW9uIGFyZUZ1bmN0aW9ucyguLi5vYmplY3RzKSB7XHJcbiAgICByZXR1cm4gb2JqZWN0cyAmJiBvYmplY3RzLmxlbmd0aCA+IDAgJiYgb2JqZWN0cy5ldmVyeShpc0Z1bmN0aW9uKTtcclxufVxyXG5leHBvcnRzLmFyZUZ1bmN0aW9ucyA9IGFyZUZ1bmN0aW9ucztcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3lzVHlwZXMuanMubWFwIl19