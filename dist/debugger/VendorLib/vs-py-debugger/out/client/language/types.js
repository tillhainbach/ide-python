// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

class TextRange {
  constructor(start, length) {
    if (start < 0) {
      throw new Error('start must be non-negative');
    }

    if (length < 0) {
      throw new Error('length must be non-negative');
    }

    this.start = start;
    this.length = length;
  }

  static fromBounds(start, end) {
    return new TextRange(start, end - start);
  }

  get end() {
    return this.start + this.length;
  }

  contains(position) {
    return position >= this.start && position < this.end;
  }

}

TextRange.empty = TextRange.fromBounds(0, 0);
exports.TextRange = TextRange;
var TokenType;

(function (TokenType) {
  TokenType[TokenType["Unknown"] = 0] = "Unknown";
  TokenType[TokenType["String"] = 1] = "String";
  TokenType[TokenType["Comment"] = 2] = "Comment";
  TokenType[TokenType["Keyword"] = 3] = "Keyword";
  TokenType[TokenType["Number"] = 4] = "Number";
  TokenType[TokenType["Identifier"] = 5] = "Identifier";
  TokenType[TokenType["Operator"] = 6] = "Operator";
  TokenType[TokenType["Colon"] = 7] = "Colon";
  TokenType[TokenType["Semicolon"] = 8] = "Semicolon";
  TokenType[TokenType["Comma"] = 9] = "Comma";
  TokenType[TokenType["OpenBrace"] = 10] = "OpenBrace";
  TokenType[TokenType["CloseBrace"] = 11] = "CloseBrace";
  TokenType[TokenType["OpenBracket"] = 12] = "OpenBracket";
  TokenType[TokenType["CloseBracket"] = 13] = "CloseBracket";
  TokenType[TokenType["OpenCurly"] = 14] = "OpenCurly";
  TokenType[TokenType["CloseCurly"] = 15] = "CloseCurly";
})(TokenType = exports.TokenType || (exports.TokenType = {}));

var TokenizerMode;

(function (TokenizerMode) {
  TokenizerMode[TokenizerMode["CommentsAndStrings"] = 0] = "CommentsAndStrings";
  TokenizerMode[TokenizerMode["Full"] = 1] = "Full";
})(TokenizerMode = exports.TokenizerMode || (exports.TokenizerMode = {}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cGVzLmpzIl0sIm5hbWVzIjpbIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwiVGV4dFJhbmdlIiwiY29uc3RydWN0b3IiLCJzdGFydCIsImxlbmd0aCIsIkVycm9yIiwiZnJvbUJvdW5kcyIsImVuZCIsImNvbnRhaW5zIiwicG9zaXRpb24iLCJlbXB0eSIsIlRva2VuVHlwZSIsIlRva2VuaXplck1vZGUiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTs7QUFDQUEsTUFBTSxDQUFDQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUFFQyxFQUFBQSxLQUFLLEVBQUU7QUFBVCxDQUE3Qzs7QUFDQSxNQUFNQyxTQUFOLENBQWdCO0FBQ1pDLEVBQUFBLFdBQVcsQ0FBQ0MsS0FBRCxFQUFRQyxNQUFSLEVBQWdCO0FBQ3ZCLFFBQUlELEtBQUssR0FBRyxDQUFaLEVBQWU7QUFDWCxZQUFNLElBQUlFLEtBQUosQ0FBVSw0QkFBVixDQUFOO0FBQ0g7O0FBQ0QsUUFBSUQsTUFBTSxHQUFHLENBQWIsRUFBZ0I7QUFDWixZQUFNLElBQUlDLEtBQUosQ0FBVSw2QkFBVixDQUFOO0FBQ0g7O0FBQ0QsU0FBS0YsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0MsTUFBTCxHQUFjQSxNQUFkO0FBQ0g7O0FBQ0QsU0FBT0UsVUFBUCxDQUFrQkgsS0FBbEIsRUFBeUJJLEdBQXpCLEVBQThCO0FBQzFCLFdBQU8sSUFBSU4sU0FBSixDQUFjRSxLQUFkLEVBQXFCSSxHQUFHLEdBQUdKLEtBQTNCLENBQVA7QUFDSDs7QUFDRCxNQUFJSSxHQUFKLEdBQVU7QUFDTixXQUFPLEtBQUtKLEtBQUwsR0FBYSxLQUFLQyxNQUF6QjtBQUNIOztBQUNESSxFQUFBQSxRQUFRLENBQUNDLFFBQUQsRUFBVztBQUNmLFdBQU9BLFFBQVEsSUFBSSxLQUFLTixLQUFqQixJQUEwQk0sUUFBUSxHQUFHLEtBQUtGLEdBQWpEO0FBQ0g7O0FBbkJXOztBQXFCaEJOLFNBQVMsQ0FBQ1MsS0FBVixHQUFrQlQsU0FBUyxDQUFDSyxVQUFWLENBQXFCLENBQXJCLEVBQXdCLENBQXhCLENBQWxCO0FBQ0FQLE9BQU8sQ0FBQ0UsU0FBUixHQUFvQkEsU0FBcEI7QUFDQSxJQUFJVSxTQUFKOztBQUNBLENBQUMsVUFBVUEsU0FBVixFQUFxQjtBQUNsQkEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsU0FBRCxDQUFULEdBQXVCLENBQXhCLENBQVQsR0FBc0MsU0FBdEM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsUUFBRCxDQUFULEdBQXNCLENBQXZCLENBQVQsR0FBcUMsUUFBckM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsU0FBRCxDQUFULEdBQXVCLENBQXhCLENBQVQsR0FBc0MsU0FBdEM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsU0FBRCxDQUFULEdBQXVCLENBQXhCLENBQVQsR0FBc0MsU0FBdEM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsUUFBRCxDQUFULEdBQXNCLENBQXZCLENBQVQsR0FBcUMsUUFBckM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsWUFBRCxDQUFULEdBQTBCLENBQTNCLENBQVQsR0FBeUMsWUFBekM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsVUFBRCxDQUFULEdBQXdCLENBQXpCLENBQVQsR0FBdUMsVUFBdkM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsT0FBRCxDQUFULEdBQXFCLENBQXRCLENBQVQsR0FBb0MsT0FBcEM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsV0FBRCxDQUFULEdBQXlCLENBQTFCLENBQVQsR0FBd0MsV0FBeEM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsT0FBRCxDQUFULEdBQXFCLENBQXRCLENBQVQsR0FBb0MsT0FBcEM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsV0FBRCxDQUFULEdBQXlCLEVBQTFCLENBQVQsR0FBeUMsV0FBekM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsWUFBRCxDQUFULEdBQTBCLEVBQTNCLENBQVQsR0FBMEMsWUFBMUM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsYUFBRCxDQUFULEdBQTJCLEVBQTVCLENBQVQsR0FBMkMsYUFBM0M7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsY0FBRCxDQUFULEdBQTRCLEVBQTdCLENBQVQsR0FBNEMsY0FBNUM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsV0FBRCxDQUFULEdBQXlCLEVBQTFCLENBQVQsR0FBeUMsV0FBekM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsWUFBRCxDQUFULEdBQTBCLEVBQTNCLENBQVQsR0FBMEMsWUFBMUM7QUFDSCxDQWpCRCxFQWlCR0EsU0FBUyxHQUFHWixPQUFPLENBQUNZLFNBQVIsS0FBc0JaLE9BQU8sQ0FBQ1ksU0FBUixHQUFvQixFQUExQyxDQWpCZjs7QUFrQkEsSUFBSUMsYUFBSjs7QUFDQSxDQUFDLFVBQVVBLGFBQVYsRUFBeUI7QUFDdEJBLEVBQUFBLGFBQWEsQ0FBQ0EsYUFBYSxDQUFDLG9CQUFELENBQWIsR0FBc0MsQ0FBdkMsQ0FBYixHQUF5RCxvQkFBekQ7QUFDQUEsRUFBQUEsYUFBYSxDQUFDQSxhQUFhLENBQUMsTUFBRCxDQUFiLEdBQXdCLENBQXpCLENBQWIsR0FBMkMsTUFBM0M7QUFDSCxDQUhELEVBR0dBLGFBQWEsR0FBR2IsT0FBTyxDQUFDYSxhQUFSLEtBQTBCYixPQUFPLENBQUNhLGFBQVIsR0FBd0IsRUFBbEQsQ0FIbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbid1c2Ugc3RyaWN0Jztcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIFRleHRSYW5nZSB7XG4gICAgY29uc3RydWN0b3Ioc3RhcnQsIGxlbmd0aCkge1xuICAgICAgICBpZiAoc3RhcnQgPCAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3N0YXJ0IG11c3QgYmUgbm9uLW5lZ2F0aXZlJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxlbmd0aCA8IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbGVuZ3RoIG11c3QgYmUgbm9uLW5lZ2F0aXZlJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdGFydCA9IHN0YXJ0O1xuICAgICAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB9XG4gICAgc3RhdGljIGZyb21Cb3VuZHMoc3RhcnQsIGVuZCkge1xuICAgICAgICByZXR1cm4gbmV3IFRleHRSYW5nZShzdGFydCwgZW5kIC0gc3RhcnQpO1xuICAgIH1cbiAgICBnZXQgZW5kKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGFydCArIHRoaXMubGVuZ3RoO1xuICAgIH1cbiAgICBjb250YWlucyhwb3NpdGlvbikge1xuICAgICAgICByZXR1cm4gcG9zaXRpb24gPj0gdGhpcy5zdGFydCAmJiBwb3NpdGlvbiA8IHRoaXMuZW5kO1xuICAgIH1cbn1cblRleHRSYW5nZS5lbXB0eSA9IFRleHRSYW5nZS5mcm9tQm91bmRzKDAsIDApO1xuZXhwb3J0cy5UZXh0UmFuZ2UgPSBUZXh0UmFuZ2U7XG52YXIgVG9rZW5UeXBlO1xuKGZ1bmN0aW9uIChUb2tlblR5cGUpIHtcbiAgICBUb2tlblR5cGVbVG9rZW5UeXBlW1wiVW5rbm93blwiXSA9IDBdID0gXCJVbmtub3duXCI7XG4gICAgVG9rZW5UeXBlW1Rva2VuVHlwZVtcIlN0cmluZ1wiXSA9IDFdID0gXCJTdHJpbmdcIjtcbiAgICBUb2tlblR5cGVbVG9rZW5UeXBlW1wiQ29tbWVudFwiXSA9IDJdID0gXCJDb21tZW50XCI7XG4gICAgVG9rZW5UeXBlW1Rva2VuVHlwZVtcIktleXdvcmRcIl0gPSAzXSA9IFwiS2V5d29yZFwiO1xuICAgIFRva2VuVHlwZVtUb2tlblR5cGVbXCJOdW1iZXJcIl0gPSA0XSA9IFwiTnVtYmVyXCI7XG4gICAgVG9rZW5UeXBlW1Rva2VuVHlwZVtcIklkZW50aWZpZXJcIl0gPSA1XSA9IFwiSWRlbnRpZmllclwiO1xuICAgIFRva2VuVHlwZVtUb2tlblR5cGVbXCJPcGVyYXRvclwiXSA9IDZdID0gXCJPcGVyYXRvclwiO1xuICAgIFRva2VuVHlwZVtUb2tlblR5cGVbXCJDb2xvblwiXSA9IDddID0gXCJDb2xvblwiO1xuICAgIFRva2VuVHlwZVtUb2tlblR5cGVbXCJTZW1pY29sb25cIl0gPSA4XSA9IFwiU2VtaWNvbG9uXCI7XG4gICAgVG9rZW5UeXBlW1Rva2VuVHlwZVtcIkNvbW1hXCJdID0gOV0gPSBcIkNvbW1hXCI7XG4gICAgVG9rZW5UeXBlW1Rva2VuVHlwZVtcIk9wZW5CcmFjZVwiXSA9IDEwXSA9IFwiT3BlbkJyYWNlXCI7XG4gICAgVG9rZW5UeXBlW1Rva2VuVHlwZVtcIkNsb3NlQnJhY2VcIl0gPSAxMV0gPSBcIkNsb3NlQnJhY2VcIjtcbiAgICBUb2tlblR5cGVbVG9rZW5UeXBlW1wiT3BlbkJyYWNrZXRcIl0gPSAxMl0gPSBcIk9wZW5CcmFja2V0XCI7XG4gICAgVG9rZW5UeXBlW1Rva2VuVHlwZVtcIkNsb3NlQnJhY2tldFwiXSA9IDEzXSA9IFwiQ2xvc2VCcmFja2V0XCI7XG4gICAgVG9rZW5UeXBlW1Rva2VuVHlwZVtcIk9wZW5DdXJseVwiXSA9IDE0XSA9IFwiT3BlbkN1cmx5XCI7XG4gICAgVG9rZW5UeXBlW1Rva2VuVHlwZVtcIkNsb3NlQ3VybHlcIl0gPSAxNV0gPSBcIkNsb3NlQ3VybHlcIjtcbn0pKFRva2VuVHlwZSA9IGV4cG9ydHMuVG9rZW5UeXBlIHx8IChleHBvcnRzLlRva2VuVHlwZSA9IHt9KSk7XG52YXIgVG9rZW5pemVyTW9kZTtcbihmdW5jdGlvbiAoVG9rZW5pemVyTW9kZSkge1xuICAgIFRva2VuaXplck1vZGVbVG9rZW5pemVyTW9kZVtcIkNvbW1lbnRzQW5kU3RyaW5nc1wiXSA9IDBdID0gXCJDb21tZW50c0FuZFN0cmluZ3NcIjtcbiAgICBUb2tlbml6ZXJNb2RlW1Rva2VuaXplck1vZGVbXCJGdWxsXCJdID0gMV0gPSBcIkZ1bGxcIjtcbn0pKFRva2VuaXplck1vZGUgPSBleHBvcnRzLlRva2VuaXplck1vZGUgfHwgKGV4cG9ydHMuVG9rZW5pemVyTW9kZSA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10eXBlcy5qcy5tYXAiXX0=