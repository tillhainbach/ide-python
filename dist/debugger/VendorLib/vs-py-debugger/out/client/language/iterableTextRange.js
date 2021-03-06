// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

class IterableTextRange {
  constructor(textRangeCollection) {
    this.textRangeCollection = textRangeCollection;
  }

  [Symbol.iterator]() {
    let index = -1;
    return {
      next: () => {
        if (index < this.textRangeCollection.count - 1) {
          return {
            done: false,
            value: this.textRangeCollection.getItemAt(index += 1)
          };
        } else {
          return {
            done: true,
            // tslint:disable-next-line:no-any
            value: undefined
          };
        }
      }
    };
  }

}

exports.IterableTextRange = IterableTextRange;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIml0ZXJhYmxlVGV4dFJhbmdlLmpzIl0sIm5hbWVzIjpbIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwiSXRlcmFibGVUZXh0UmFuZ2UiLCJjb25zdHJ1Y3RvciIsInRleHRSYW5nZUNvbGxlY3Rpb24iLCJTeW1ib2wiLCJpdGVyYXRvciIsImluZGV4IiwibmV4dCIsImNvdW50IiwiZG9uZSIsImdldEl0ZW1BdCIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBOztBQUNBQSxNQUFNLENBQUNDLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQUVDLEVBQUFBLEtBQUssRUFBRTtBQUFULENBQTdDOztBQUNBLE1BQU1DLGlCQUFOLENBQXdCO0FBQ3BCQyxFQUFBQSxXQUFXLENBQUNDLG1CQUFELEVBQXNCO0FBQzdCLFNBQUtBLG1CQUFMLEdBQTJCQSxtQkFBM0I7QUFDSDs7QUFDRCxHQUFDQyxNQUFNLENBQUNDLFFBQVIsSUFBb0I7QUFDaEIsUUFBSUMsS0FBSyxHQUFHLENBQUMsQ0FBYjtBQUNBLFdBQU87QUFDSEMsTUFBQUEsSUFBSSxFQUFFLE1BQU07QUFDUixZQUFJRCxLQUFLLEdBQUcsS0FBS0gsbUJBQUwsQ0FBeUJLLEtBQXpCLEdBQWlDLENBQTdDLEVBQWdEO0FBQzVDLGlCQUFPO0FBQ0hDLFlBQUFBLElBQUksRUFBRSxLQURIO0FBRUhULFlBQUFBLEtBQUssRUFBRSxLQUFLRyxtQkFBTCxDQUF5Qk8sU0FBekIsQ0FBbUNKLEtBQUssSUFBSSxDQUE1QztBQUZKLFdBQVA7QUFJSCxTQUxELE1BTUs7QUFDRCxpQkFBTztBQUNIRyxZQUFBQSxJQUFJLEVBQUUsSUFESDtBQUVIO0FBQ0FULFlBQUFBLEtBQUssRUFBRVc7QUFISixXQUFQO0FBS0g7QUFDSjtBQWZFLEtBQVA7QUFpQkg7O0FBdkJtQjs7QUF5QnhCWixPQUFPLENBQUNFLGlCQUFSLEdBQTRCQSxpQkFBNUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG4ndXNlIHN0cmljdCc7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY2xhc3MgSXRlcmFibGVUZXh0UmFuZ2Uge1xyXG4gICAgY29uc3RydWN0b3IodGV4dFJhbmdlQ29sbGVjdGlvbikge1xyXG4gICAgICAgIHRoaXMudGV4dFJhbmdlQ29sbGVjdGlvbiA9IHRleHRSYW5nZUNvbGxlY3Rpb247XHJcbiAgICB9XHJcbiAgICBbU3ltYm9sLml0ZXJhdG9yXSgpIHtcclxuICAgICAgICBsZXQgaW5kZXggPSAtMTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuZXh0OiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPCB0aGlzLnRleHRSYW5nZUNvbGxlY3Rpb24uY291bnQgLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnRleHRSYW5nZUNvbGxlY3Rpb24uZ2V0SXRlbUF0KGluZGV4ICs9IDEpXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuSXRlcmFibGVUZXh0UmFuZ2UgPSBJdGVyYWJsZVRleHRSYW5nZTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXRlcmFibGVUZXh0UmFuZ2UuanMubWFwIl19