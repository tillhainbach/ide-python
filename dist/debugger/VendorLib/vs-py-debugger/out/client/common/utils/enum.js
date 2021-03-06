// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
}); // tslint:disable:no-any

function getNamesAndValues(e) {
  return getNames(e).map(n => ({
    name: n,
    value: e[n]
  }));
}

exports.getNamesAndValues = getNamesAndValues;

function getNames(e) {
  return getObjValues(e).filter(v => typeof v === 'string');
}

exports.getNames = getNames;

function getValues(e) {
  return getObjValues(e).filter(v => typeof v === 'number');
}

exports.getValues = getValues;

function getObjValues(e) {
  return Object.keys(e).map(k => e[k]);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudW0uanMiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJnZXROYW1lc0FuZFZhbHVlcyIsImUiLCJnZXROYW1lcyIsIm1hcCIsIm4iLCJuYW1lIiwiZ2V0T2JqVmFsdWVzIiwiZmlsdGVyIiwidiIsImdldFZhbHVlcyIsImtleXMiLCJrIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7O0FBQ0FBLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFBRUMsRUFBQUEsS0FBSyxFQUFFO0FBQVQsQ0FBN0MsRSxDQUNBOztBQUNBLFNBQVNDLGlCQUFULENBQTJCQyxDQUEzQixFQUE4QjtBQUMxQixTQUFPQyxRQUFRLENBQUNELENBQUQsQ0FBUixDQUFZRSxHQUFaLENBQWdCQyxDQUFDLEtBQUs7QUFBRUMsSUFBQUEsSUFBSSxFQUFFRCxDQUFSO0FBQVdMLElBQUFBLEtBQUssRUFBRUUsQ0FBQyxDQUFDRyxDQUFEO0FBQW5CLEdBQUwsQ0FBakIsQ0FBUDtBQUNIOztBQUNETixPQUFPLENBQUNFLGlCQUFSLEdBQTRCQSxpQkFBNUI7O0FBQ0EsU0FBU0UsUUFBVCxDQUFrQkQsQ0FBbEIsRUFBcUI7QUFDakIsU0FBT0ssWUFBWSxDQUFDTCxDQUFELENBQVosQ0FBZ0JNLE1BQWhCLENBQXVCQyxDQUFDLElBQUksT0FBT0EsQ0FBUCxLQUFhLFFBQXpDLENBQVA7QUFDSDs7QUFDRFYsT0FBTyxDQUFDSSxRQUFSLEdBQW1CQSxRQUFuQjs7QUFDQSxTQUFTTyxTQUFULENBQW1CUixDQUFuQixFQUFzQjtBQUNsQixTQUFPSyxZQUFZLENBQUNMLENBQUQsQ0FBWixDQUFnQk0sTUFBaEIsQ0FBdUJDLENBQUMsSUFBSSxPQUFPQSxDQUFQLEtBQWEsUUFBekMsQ0FBUDtBQUNIOztBQUNEVixPQUFPLENBQUNXLFNBQVIsR0FBb0JBLFNBQXBCOztBQUNBLFNBQVNILFlBQVQsQ0FBc0JMLENBQXRCLEVBQXlCO0FBQ3JCLFNBQU9MLE1BQU0sQ0FBQ2MsSUFBUCxDQUFZVCxDQUFaLEVBQWVFLEdBQWYsQ0FBbUJRLENBQUMsSUFBSVYsQ0FBQyxDQUFDVSxDQUFELENBQXpCLENBQVA7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcbid1c2Ugc3RyaWN0JztcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG4vLyB0c2xpbnQ6ZGlzYWJsZTpuby1hbnlcclxuZnVuY3Rpb24gZ2V0TmFtZXNBbmRWYWx1ZXMoZSkge1xyXG4gICAgcmV0dXJuIGdldE5hbWVzKGUpLm1hcChuID0+ICh7IG5hbWU6IG4sIHZhbHVlOiBlW25dIH0pKTtcclxufVxyXG5leHBvcnRzLmdldE5hbWVzQW5kVmFsdWVzID0gZ2V0TmFtZXNBbmRWYWx1ZXM7XHJcbmZ1bmN0aW9uIGdldE5hbWVzKGUpIHtcclxuICAgIHJldHVybiBnZXRPYmpWYWx1ZXMoZSkuZmlsdGVyKHYgPT4gdHlwZW9mIHYgPT09ICdzdHJpbmcnKTtcclxufVxyXG5leHBvcnRzLmdldE5hbWVzID0gZ2V0TmFtZXM7XHJcbmZ1bmN0aW9uIGdldFZhbHVlcyhlKSB7XHJcbiAgICByZXR1cm4gZ2V0T2JqVmFsdWVzKGUpLmZpbHRlcih2ID0+IHR5cGVvZiB2ID09PSAnbnVtYmVyJyk7XHJcbn1cclxuZXhwb3J0cy5nZXRWYWx1ZXMgPSBnZXRWYWx1ZXM7XHJcbmZ1bmN0aW9uIGdldE9ialZhbHVlcyhlKSB7XHJcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoZSkubWFwKGsgPT4gZVtrXSk7XHJcbn1cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZW51bS5qcy5tYXAiXX0=