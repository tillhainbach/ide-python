/*---------------------------------------------------------------------------------------------
*  Copyright (c) Microsoft Corporation. All rights reserved.
*  Licensed under the MIT License. See License.txt in the project root for license information.
*--------------------------------------------------------------------------------------------*/
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
}); // tslint:disable:all

var vscMockPosition;

(function (vscMockPosition) {
  /**
   * A position in the editor.
   */
  class Position {
    constructor(lineNumber, column) {
      this.lineNumber = lineNumber;
      this.column = column;
    }
    /**
     * Test if this position equals other position
     */


    equals(other) {
      return Position.equals(this, other);
    }
    /**
     * Test if position `a` equals position `b`
     */


    static equals(a, b) {
      if (!a && !b) {
        return true;
      }

      return !!a && !!b && a.lineNumber === b.lineNumber && a.column === b.column;
    }
    /**
     * Test if this position is before other position.
     * If the two positions are equal, the result will be false.
     */


    isBefore(other) {
      return Position.isBefore(this, other);
    }
    /**
     * Test if position `a` is before position `b`.
     * If the two positions are equal, the result will be false.
     */


    static isBefore(a, b) {
      if (a.lineNumber < b.lineNumber) {
        return true;
      }

      if (b.lineNumber < a.lineNumber) {
        return false;
      }

      return a.column < b.column;
    }
    /**
     * Test if this position is before other position.
     * If the two positions are equal, the result will be true.
     */


    isBeforeOrEqual(other) {
      return Position.isBeforeOrEqual(this, other);
    }
    /**
     * Test if position `a` is before position `b`.
     * If the two positions are equal, the result will be true.
     */


    static isBeforeOrEqual(a, b) {
      if (a.lineNumber < b.lineNumber) {
        return true;
      }

      if (b.lineNumber < a.lineNumber) {
        return false;
      }

      return a.column <= b.column;
    }
    /**
     * A function that compares positions, useful for sorting
     */


    static compare(a, b) {
      let aLineNumber = a.lineNumber | 0;
      let bLineNumber = b.lineNumber | 0;

      if (aLineNumber === bLineNumber) {
        let aColumn = a.column | 0;
        let bColumn = b.column | 0;
        return aColumn - bColumn;
      }

      return aLineNumber - bLineNumber;
    }
    /**
     * Clone this position.
     */


    clone() {
      return new Position(this.lineNumber, this.column);
    }
    /**
     * Convert to a human-readable representation.
     */


    toString() {
      return '(' + this.lineNumber + ',' + this.column + ')';
    } // ---

    /**
     * Create a `Position` from an `IPosition`.
     */


    static lift(pos) {
      return new Position(pos.lineNumber, pos.column);
    }
    /**
     * Test if `obj` is an `IPosition`.
     */


    static isIPosition(obj) {
      return obj && typeof obj.lineNumber === 'number' && typeof obj.column === 'number';
    }

  }

  vscMockPosition.Position = Position;
})(vscMockPosition = exports.vscMockPosition || (exports.vscMockPosition = {}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvc2l0aW9uLmpzIl0sIm5hbWVzIjpbIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwidnNjTW9ja1Bvc2l0aW9uIiwiUG9zaXRpb24iLCJjb25zdHJ1Y3RvciIsImxpbmVOdW1iZXIiLCJjb2x1bW4iLCJlcXVhbHMiLCJvdGhlciIsImEiLCJiIiwiaXNCZWZvcmUiLCJpc0JlZm9yZU9yRXF1YWwiLCJjb21wYXJlIiwiYUxpbmVOdW1iZXIiLCJiTGluZU51bWJlciIsImFDb2x1bW4iLCJiQ29sdW1uIiwiY2xvbmUiLCJ0b1N0cmluZyIsImxpZnQiLCJwb3MiLCJpc0lQb3NpdGlvbiIsIm9iaiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQUEsTUFBTSxDQUFDQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUFFQyxFQUFBQSxLQUFLLEVBQUU7QUFBVCxDQUE3QyxFLENBQ0E7O0FBQ0EsSUFBSUMsZUFBSjs7QUFDQSxDQUFDLFVBQVVBLGVBQVYsRUFBMkI7QUFDeEI7QUFDSjtBQUNBO0FBQ0ksUUFBTUMsUUFBTixDQUFlO0FBQ1hDLElBQUFBLFdBQVcsQ0FBQ0MsVUFBRCxFQUFhQyxNQUFiLEVBQXFCO0FBQzVCLFdBQUtELFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0EsV0FBS0MsTUFBTCxHQUFjQSxNQUFkO0FBQ0g7QUFDRDtBQUNSO0FBQ0E7OztBQUNRQyxJQUFBQSxNQUFNLENBQUNDLEtBQUQsRUFBUTtBQUNWLGFBQU9MLFFBQVEsQ0FBQ0ksTUFBVCxDQUFnQixJQUFoQixFQUFzQkMsS0FBdEIsQ0FBUDtBQUNIO0FBQ0Q7QUFDUjtBQUNBOzs7QUFDUSxXQUFPRCxNQUFQLENBQWNFLENBQWQsRUFBaUJDLENBQWpCLEVBQW9CO0FBQ2hCLFVBQUksQ0FBQ0QsQ0FBRCxJQUFNLENBQUNDLENBQVgsRUFBYztBQUNWLGVBQU8sSUFBUDtBQUNIOztBQUNELGFBQVEsQ0FBQyxDQUFD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R0g7O0FBdEdVOztBQXdHZkosRUFBQUEsZUFBZSxDQUFDQyxRQUFoQixHQUEyQkEsUUFBM0I7QUFDSCxDQTdHRCxFQTZHR0QsZUFBZSxHQUFHRixPQUFPLENBQUNFLGVBQVIsS0FBNEJGLE9BQU8sQ0FBQ0UsZUFBUixHQUEwQixFQUF0RCxDQTdHckIiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4qICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbi8vIHRzbGludDpkaXNhYmxlOmFsbFxyXG52YXIgdnNjTW9ja1Bvc2l0aW9uO1xyXG4oZnVuY3Rpb24gKHZzY01vY2tQb3NpdGlvbikge1xyXG4gICAgLyoqXHJcbiAgICAgKiBBIHBvc2l0aW9uIGluIHRoZSBlZGl0b3IuXHJcbiAgICAgKi9cclxuICAgIGNsYXNzIFBvc2l0aW9uIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihsaW5lTnVtYmVyLCBjb2x1bW4pIHtcclxuICAgICAgICAgICAgdGhpcy5saW5lTnVtYmVyID0gbGluZU51bWJlcjtcclxuICAgICAgICAgICAgdGhpcy5jb2x1bW4gPSBjb2x1bW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRlc3QgaWYgdGhpcyBwb3NpdGlvbiBlcXVhbHMgb3RoZXIgcG9zaXRpb25cclxuICAgICAgICAgKi9cclxuICAgICAgICBlcXVhbHMob3RoZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFBvc2l0aW9uLmVxdWFscyh0aGlzLCBvdGhlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRlc3QgaWYgcG9zaXRpb24gYGFgIGVxdWFscyBwb3NpdGlvbiBgYmBcclxuICAgICAgICAgKi9cclxuICAgICAgICBzdGF0aWMgZXF1YWxzKGEsIGIpIHtcclxuICAgICAgICAgICAgaWYgKCFhICYmICFiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gKCEhYSAmJlxyXG4gICAgICAgICAgICAgICAgISFiICYmXHJcbiAgICAgICAgICAgICAgICBhLmxpbmVOdW1iZXIgPT09IGIubGluZU51bWJlciAmJlxyXG4gICAgICAgICAgICAgICAgYS5jb2x1bW4gPT09IGIuY29sdW1uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGVzdCBpZiB0aGlzIHBvc2l0aW9uIGlzIGJlZm9yZSBvdGhlciBwb3NpdGlvbi5cclxuICAgICAgICAgKiBJZiB0aGUgdHdvIHBvc2l0aW9ucyBhcmUgZXF1YWwsIHRoZSByZXN1bHQgd2lsbCBiZSBmYWxzZS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBpc0JlZm9yZShvdGhlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gUG9zaXRpb24uaXNCZWZvcmUodGhpcywgb3RoZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUZXN0IGlmIHBvc2l0aW9uIGBhYCBpcyBiZWZvcmUgcG9zaXRpb24gYGJgLlxyXG4gICAgICAgICAqIElmIHRoZSB0d28gcG9zaXRpb25zIGFyZSBlcXVhbCwgdGhlIHJlc3VsdCB3aWxsIGJlIGZhbHNlLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHN0YXRpYyBpc0JlZm9yZShhLCBiKSB7XHJcbiAgICAgICAgICAgIGlmIChhLmxpbmVOdW1iZXIgPCBiLmxpbmVOdW1iZXIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChiLmxpbmVOdW1iZXIgPCBhLmxpbmVOdW1iZXIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYS5jb2x1bW4gPCBiLmNvbHVtbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGVzdCBpZiB0aGlzIHBvc2l0aW9uIGlzIGJlZm9yZSBvdGhlciBwb3NpdGlvbi5cclxuICAgICAgICAgKiBJZiB0aGUgdHdvIHBvc2l0aW9ucyBhcmUgZXF1YWwsIHRoZSByZXN1bHQgd2lsbCBiZSB0cnVlLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlzQmVmb3JlT3JFcXVhbChvdGhlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gUG9zaXRpb24uaXNCZWZvcmVPckVxdWFsKHRoaXMsIG90aGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGVzdCBpZiBwb3NpdGlvbiBgYWAgaXMgYmVmb3JlIHBvc2l0aW9uIGBiYC5cclxuICAgICAgICAgKiBJZiB0aGUgdHdvIHBvc2l0aW9ucyBhcmUgZXF1YWwsIHRoZSByZXN1bHQgd2lsbCBiZSB0cnVlLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHN0YXRpYyBpc0JlZm9yZU9yRXF1YWwoYSwgYikge1xyXG4gICAgICAgICAgICBpZiAoYS5saW5lTnVtYmVyIDwgYi5saW5lTnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYi5saW5lTnVtYmVyIDwgYS5saW5lTnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGEuY29sdW1uIDw9IGIuY29sdW1uO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBIGZ1bmN0aW9uIHRoYXQgY29tcGFyZXMgcG9zaXRpb25zLCB1c2VmdWwgZm9yIHNvcnRpbmdcclxuICAgICAgICAgKi9cclxuICAgICAgICBzdGF0aWMgY29tcGFyZShhLCBiKSB7XHJcbiAgICAgICAgICAgIGxldCBhTGluZU51bWJlciA9IGEubGluZU51bWJlciB8IDA7XHJcbiAgICAgICAgICAgIGxldCBiTGluZU51bWJlciA9IGIubGluZU51bWJlciB8IDA7XHJcbiAgICAgICAgICAgIGlmIChhTGluZU51bWJlciA9PT0gYkxpbmVOdW1iZXIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBhQ29sdW1uID0gYS5jb2x1bW4gfCAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJDb2x1bW4gPSBiLmNvbHVtbiB8IDA7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYUNvbHVtbiAtIGJDb2x1bW47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGFMaW5lTnVtYmVyIC0gYkxpbmVOdW1iZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENsb25lIHRoaXMgcG9zaXRpb24uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2xvbmUoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUG9zaXRpb24odGhpcy5saW5lTnVtYmVyLCB0aGlzLmNvbHVtbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbnZlcnQgdG8gYSBodW1hbi1yZWFkYWJsZSByZXByZXNlbnRhdGlvbi5cclxuICAgICAgICAgKi9cclxuICAgICAgICB0b1N0cmluZygpIHtcclxuICAgICAgICAgICAgcmV0dXJuICcoJyArIHRoaXMubGluZU51bWJlciArICcsJyArIHRoaXMuY29sdW1uICsgJyknO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyAtLS1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDcmVhdGUgYSBgUG9zaXRpb25gIGZyb20gYW4gYElQb3NpdGlvbmAuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc3RhdGljIGxpZnQocG9zKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUG9zaXRpb24ocG9zLmxpbmVOdW1iZXIsIHBvcy5jb2x1bW4pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUZXN0IGlmIGBvYmpgIGlzIGFuIGBJUG9zaXRpb25gLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHN0YXRpYyBpc0lQb3NpdGlvbihvYmopIHtcclxuICAgICAgICAgICAgcmV0dXJuIChvYmpcclxuICAgICAgICAgICAgICAgICYmICh0eXBlb2Ygb2JqLmxpbmVOdW1iZXIgPT09ICdudW1iZXInKVxyXG4gICAgICAgICAgICAgICAgJiYgKHR5cGVvZiBvYmouY29sdW1uID09PSAnbnVtYmVyJykpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHZzY01vY2tQb3NpdGlvbi5Qb3NpdGlvbiA9IFBvc2l0aW9uO1xyXG59KSh2c2NNb2NrUG9zaXRpb24gPSBleHBvcnRzLnZzY01vY2tQb3NpdGlvbiB8fCAoZXhwb3J0cy52c2NNb2NrUG9zaXRpb24gPSB7fSkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1wb3NpdGlvbi5qcy5tYXAiXX0=