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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cGVzLmpzIl0sIm5hbWVzIjpbIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwiVGV4dFJhbmdlIiwiY29uc3RydWN0b3IiLCJzdGFydCIsImxlbmd0aCIsIkVycm9yIiwiZnJvbUJvdW5kcyIsImVuZCIsImNvbnRhaW5zIiwicG9zaXRpb24iLCJlbXB0eSIsIlRva2VuVHlwZSIsIlRva2VuaXplck1vZGUiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTs7QUFDQUEsTUFBTSxDQUFDQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUFFQyxFQUFBQSxLQUFLLEVBQUU7QUFBVCxDQUE3Qzs7QUFDQSxNQUFNQyxTQUFOLENBQWdCO0FBQ1pDLEVBQUFBLFdBQVcsQ0FBQ0MsS0FBRCxFQUFRQyxNQUFSLEVBQWdCO0FBQ3ZCLFFBQUlELEtBQUssR0FBRyxDQUFaLEVBQWU7QUFDWCxZQUFNLElBQUlFLEtBQUosQ0FBVSw0QkFBVixDQUFOO0FBQ0g7O0FBQ0QsUUFBSUQsTUFBTSxHQUFHLENBQWIsRUFBZ0I7QUFDWixZQUFNLElBQUlDLEtBQUosQ0FBVSw2QkFBVixDQUFOO0FBQ0g7O0FBQ0QsU0FBS0YsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0MsTUFBTCxHQUFjQSxNQUFkO0FBQ0g7O0FBQ0QsU0FBT0UsVUFBUCxDQUFrQkgsS0FBbEIsRUFBeUJJLEdBQXpCLEVBQThCO0FBQzFCLFdBQU8sSUFBSU4sU0FBSixDQUFjRSxLQUFkLEVBQXFCSSxHQUFHLEdBQUdKLEtBQTNCLENBQVA7QUFDSDs7QUFDRCxNQUFJSSxHQUFKLEdBQVU7QUFDTixXQUFPLEtBQUtKLEtBQUwsR0FBYSxLQUFLQyxNQUF6QjtBQUNIOztBQUNESSxFQUFBQSxRQUFRLENBQUNDLFFBQUQsRUFBVztBQUNmLFdBQU9BLFFBQVEsSUFBSSxLQUFLTixLQUFqQixJQUEwQk0sUUFBUSxHQUFHLEtBQUtGLEdBQWpEO0FBQ0g7O0FBbkJXOztBQXFCaEJOLFNBQVMsQ0FBQ1MsS0FBVixHQUFrQlQsU0FBUyxDQUFDSyxVQUFWLENBQXFCLENBQXJCLEVBQXdCLENBQXhCLENBQWxCO0FBQ0FQLE9BQU8sQ0FBQ0UsU0FBUixHQUFvQkEsU0FBcEI7QUFDQSxJQUFJVSxTQUFKOztBQUNBLENBQUMsVUFBVUEsU0FBVixFQUFxQjtBQUNsQkEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsU0FBRCxDQUFULEdBQXVCLENBQXhCLENBQVQsR0FBc0MsU0FBdEM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsUUFBRCxDQUFULEdBQXNCLENBQXZCLENBQVQsR0FBcUMsUUFBckM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsU0FBRCxDQUFULEdBQXVCLENBQXhCLENBQVQsR0FBc0MsU0FBdEM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsU0FBRCxDQUFULEdBQXVCLENBQXhCLENBQVQsR0FBc0MsU0FBdEM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsUUFBRCxDQUFULEdBQXNCLENBQXZCLENBQVQsR0FBcUMsUUFBckM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsWUFBRCxDQUFULEdBQTBCLENBQTNCLENBQVQsR0FBeUMsWUFBekM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsVUFBRCxDQUFULEdBQXdCLENBQXpCLENBQVQsR0FBdUMsVUFBdkM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsT0FBRCxDQUFULEdBQXFCLENBQXRCLENBQVQsR0FBb0MsT0FBcEM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsV0FBRCxDQUFULEdBQXlCLENBQTFCLENBQVQsR0FBd0MsV0FBeEM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsT0FBRCxDQUFULEdBQXFCLENBQXRCLENBQVQsR0FBb0MsT0FBcEM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsV0FBRCxDQUFULEdBQXlCLEVBQTFCLENBQVQsR0FBeUMsV0FBekM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsWUFBRCxDQUFULEdBQTBCLEVBQTNCLENBQVQsR0FBMEMsWUFBMUM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsYUFBRCxDQUFULEdBQTJCLEVBQTVCLENBQVQsR0FBMkMsYUFBM0M7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsY0FBRCxDQUFULEdBQTRCLEVBQTdCLENBQVQsR0FBNEMsY0FBNUM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsV0FBRCxDQUFULEdBQXlCLEVBQTFCLENBQVQsR0FBeUMsV0FBekM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsWUFBRCxDQUFULEdBQTBCLEVBQTNCLENBQVQsR0FBMEMsWUFBMUM7QUFDSCxDQWpCRCxFQWlCR0EsU0FBUyxHQUFHWixPQUFPLENBQUNZLFNBQVIsS0FBc0JaLE9BQU8sQ0FBQ1ksU0FBUixHQUFvQixFQUExQyxDQWpCZjs7QUFrQkEsSUFBSUMsYUFBSjs7QUFDQSxDQUFDLFVBQVVBLGFBQVYsRUFBeUI7QUFDdEJBLEVBQUFBLGFBQWEsQ0FBQ0EsYUFBYSxDQUFDLG9CQUFELENBQWIsR0FBc0MsQ0FBdkMsQ0FBYixHQUF5RCxvQkFBekQ7QUFDQUEsRUFBQUEsYUFBYSxDQUFDQSxhQUFhLENBQUMsTUFBRCxDQUFiLEdBQXdCLENBQXpCLENBQWIsR0FBMkMsTUFBM0M7QUFDSCxDQUhELEVBR0dBLGFBQWEsR0FBR2IsT0FBTyxDQUFDYSxhQUFSLEtBQTBCYixPQUFPLENBQUNhLGFBQVIsR0FBd0IsRUFBbEQsQ0FIbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG4ndXNlIHN0cmljdCc7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY2xhc3MgVGV4dFJhbmdlIHtcclxuICAgIGNvbnN0cnVjdG9yKHN0YXJ0LCBsZW5ndGgpIHtcclxuICAgICAgICBpZiAoc3RhcnQgPCAwKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignc3RhcnQgbXVzdCBiZSBub24tbmVnYXRpdmUnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxlbmd0aCA8IDApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdsZW5ndGggbXVzdCBiZSBub24tbmVnYXRpdmUnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdGFydCA9IHN0YXJ0O1xyXG4gICAgICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGZyb21Cb3VuZHMoc3RhcnQsIGVuZCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgVGV4dFJhbmdlKHN0YXJ0LCBlbmQgLSBzdGFydCk7XHJcbiAgICB9XHJcbiAgICBnZXQgZW5kKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0ICsgdGhpcy5sZW5ndGg7XHJcbiAgICB9XHJcbiAgICBjb250YWlucyhwb3NpdGlvbikge1xyXG4gICAgICAgIHJldHVybiBwb3NpdGlvbiA+PSB0aGlzLnN0YXJ0ICYmIHBvc2l0aW9uIDwgdGhpcy5lbmQ7XHJcbiAgICB9XHJcbn1cclxuVGV4dFJhbmdlLmVtcHR5ID0gVGV4dFJhbmdlLmZyb21Cb3VuZHMoMCwgMCk7XHJcbmV4cG9ydHMuVGV4dFJhbmdlID0gVGV4dFJhbmdlO1xyXG52YXIgVG9rZW5UeXBlO1xyXG4oZnVuY3Rpb24gKFRva2VuVHlwZSkge1xyXG4gICAgVG9rZW5UeXBlW1Rva2VuVHlwZVtcIlVua25vd25cIl0gPSAwXSA9IFwiVW5rbm93blwiO1xyXG4gICAgVG9rZW5UeXBlW1Rva2VuVHlwZVtcIlN0cmluZ1wiXSA9IDFdID0gXCJTdHJpbmdcIjtcclxuICAgIFRva2VuVHlwZVtUb2tlblR5cGVbXCJDb21tZW50XCJdID0gMl0gPSBcIkNvbW1lbnRcIjtcclxuICAgIFRva2VuVHlwZVtUb2tlblR5cGVbXCJLZXl3b3JkXCJdID0gM10gPSBcIktleXdvcmRcIjtcclxuICAgIFRva2VuVHlwZVtUb2tlblR5cGVbXCJOdW1iZXJcIl0gPSA0XSA9IFwiTnVtYmVyXCI7XHJcbiAgICBUb2tlblR5cGVbVG9rZW5UeXBlW1wiSWRlbnRpZmllclwiXSA9IDVdID0gXCJJZGVudGlmaWVyXCI7XHJcbiAgICBUb2tlblR5cGVbVG9rZW5UeXBlW1wiT3BlcmF0b3JcIl0gPSA2XSA9IFwiT3BlcmF0b3JcIjtcclxuICAgIFRva2VuVHlwZVtUb2tlblR5cGVbXCJDb2xvblwiXSA9IDddID0gXCJDb2xvblwiO1xyXG4gICAgVG9rZW5UeXBlW1Rva2VuVHlwZVtcIlNlbWljb2xvblwiXSA9IDhdID0gXCJTZW1pY29sb25cIjtcclxuICAgIFRva2VuVHlwZVtUb2tlblR5cGVbXCJDb21tYVwiXSA9IDldID0gXCJDb21tYVwiO1xyXG4gICAgVG9rZW5UeXBlW1Rva2VuVHlwZVtcIk9wZW5CcmFjZVwiXSA9IDEwXSA9IFwiT3BlbkJyYWNlXCI7XHJcbiAgICBUb2tlblR5cGVbVG9rZW5UeXBlW1wiQ2xvc2VCcmFjZVwiXSA9IDExXSA9IFwiQ2xvc2VCcmFjZVwiO1xyXG4gICAgVG9rZW5UeXBlW1Rva2VuVHlwZVtcIk9wZW5CcmFja2V0XCJdID0gMTJdID0gXCJPcGVuQnJhY2tldFwiO1xyXG4gICAgVG9rZW5UeXBlW1Rva2VuVHlwZVtcIkNsb3NlQnJhY2tldFwiXSA9IDEzXSA9IFwiQ2xvc2VCcmFja2V0XCI7XHJcbiAgICBUb2tlblR5cGVbVG9rZW5UeXBlW1wiT3BlbkN1cmx5XCJdID0gMTRdID0gXCJPcGVuQ3VybHlcIjtcclxuICAgIFRva2VuVHlwZVtUb2tlblR5cGVbXCJDbG9zZUN1cmx5XCJdID0gMTVdID0gXCJDbG9zZUN1cmx5XCI7XHJcbn0pKFRva2VuVHlwZSA9IGV4cG9ydHMuVG9rZW5UeXBlIHx8IChleHBvcnRzLlRva2VuVHlwZSA9IHt9KSk7XHJcbnZhciBUb2tlbml6ZXJNb2RlO1xyXG4oZnVuY3Rpb24gKFRva2VuaXplck1vZGUpIHtcclxuICAgIFRva2VuaXplck1vZGVbVG9rZW5pemVyTW9kZVtcIkNvbW1lbnRzQW5kU3RyaW5nc1wiXSA9IDBdID0gXCJDb21tZW50c0FuZFN0cmluZ3NcIjtcclxuICAgIFRva2VuaXplck1vZGVbVG9rZW5pemVyTW9kZVtcIkZ1bGxcIl0gPSAxXSA9IFwiRnVsbFwiO1xyXG59KShUb2tlbml6ZXJNb2RlID0gZXhwb3J0cy5Ub2tlbml6ZXJNb2RlIHx8IChleHBvcnRzLlRva2VuaXplck1vZGUgPSB7fSkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD10eXBlcy5qcy5tYXAiXX0=