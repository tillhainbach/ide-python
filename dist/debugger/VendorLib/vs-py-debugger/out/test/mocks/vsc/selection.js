/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
}); // tslint:disable:all

const position_1 = require("./position");

const range_1 = require("./range");

var vscMockSelection;

(function (vscMockSelection) {
  /**
   * The direction of a selection.
   */
  let SelectionDirection;

  (function (SelectionDirection) {
    /**
     * The selection starts above where it ends.
     */
    SelectionDirection[SelectionDirection["LTR"] = 0] = "LTR";
    /**
     * The selection starts below where it ends.
     */

    SelectionDirection[SelectionDirection["RTL"] = 1] = "RTL";
  })(SelectionDirection = vscMockSelection.SelectionDirection || (vscMockSelection.SelectionDirection = {}));
  /**
   * A selection in the editor.
   * The selection is a range that has an orientation.
   */


  class Selection extends range_1.vscMockRange.Range {
    constructor(selectionStartLineNumber, selectionStartColumn, positionLineNumber, positionColumn) {
      super(selectionStartLineNumber, selectionStartColumn, positionLineNumber, positionColumn);
      this.selectionStartLineNumber = selectionStartLineNumber;
      this.selectionStartColumn = selectionStartColumn;
      this.positionLineNumber = positionLineNumber;
      this.positionColumn = positionColumn;
    }
    /**
     * Clone this selection.
     */


    clone() {
      return new Selection(this.selectionStartLineNumber, this.selectionStartColumn, this.positionLineNumber, this.positionColumn);
    }
    /**
     * Transform to a human-readable representation.
     */


    toString() {
      return '[' + this.selectionStartLineNumber + ',' + this.selectionStartColumn + ' -> ' + this.positionLineNumber + ',' + this.positionColumn + ']';
    }
    /**
     * Test if equals other selection.
     */


    equalsSelection(other) {
      return Selection.selectionsEqual(this, other);
    }
    /**
     * Test if the two selections are equal.
     */


    static selectionsEqual(a, b) {
      return a.selectionStartLineNumber === b.selectionStartLineNumber && a.selectionStartColumn === b.selectionStartColumn && a.positionLineNumber === b.positionLineNumber && a.positionColumn === b.positionColumn;
    }
    /**
     * Get directions (LTR or RTL).
     */


    getDirection() {
      if (this.selectionStartLineNumber === this.startLineNumber && this.selectionStartColumn === this.startColumn) {
        return SelectionDirection.LTR;
      }

      return SelectionDirection.RTL;
    }
    /**
     * Create a new selection with a different `positionLineNumber` and `positionColumn`.
     */


    setEndPosition(endLineNumber, endColumn) {
      if (this.getDirection() === SelectionDirection.LTR) {
        return new Selection(this.startLineNumber, this.startColumn, endLineNumber, endColumn);
      }

      return new Selection(endLineNumber, endColumn, this.startLineNumber, this.startColumn);
    }
    /**
     * Get the position at `positionLineNumber` and `positionColumn`.
     */


    getPosition() {
      return new position_1.vscMockPosition.Position(this.positionLineNumber, this.positionColumn);
    }
    /**
     * Create a new selection with a different `selectionStartLineNumber` and `selectionStartColumn`.
     */


    setStartPosition(startLineNumber, startColumn) {
      if (this.getDirection() === SelectionDirection.LTR) {
        return new Selection(startLineNumber, startColumn, this.endLineNumber, this.endColumn);
      }

      return new Selection(this.endLineNumber, this.endColumn, startLineNumber, startColumn);
    } // ----

    /**
     * Create a `Selection` from one or two positions
     */


    static fromPositions(start, end = start) {
      return new Selection(start.lineNumber, start.column, end.lineNumber, end.column);
    }
    /**
     * Create a `Selection` from an `ISelection`.
     */


    static liftSelection(sel) {
      return new Selection(sel.selectionStartLineNumber, sel.selectionStartColumn, sel.positionLineNumber, sel.positionColumn);
    }
    /**
     * `a` equals `b`.
     */


    static selectionsArrEqual(a, b) {
      if (a && !b || !a && b) {
        return false;
      }

      if (!a && !b) {
        return true;
      }

      if (a.length !== b.length) {
        return false;
      }

      for (var i = 0, len = a.length; i < len; i++) {
        if (!this.selectionsEqual(a[i], b[i])) {
          return false;
        }
      }

      return true;
    }
    /**
     * Test if `obj` is an `ISelection`.
     */


    static isISelection(obj) {
      return obj && typeof obj.selectionStartLineNumber === 'number' && typeof obj.selectionStartColumn === 'number' && typeof obj.positionLineNumber === 'number' && typeof obj.positionColumn === 'number';
    }
    /**
     * Create with a direction.
     */


    static createWithDirection(startLineNumber, startColumn, endLineNumber, endColumn, direction) {
      if (direction === SelectionDirection.LTR) {
        return new Selection(startLineNumber, startColumn, endLineNumber, endColumn);
      }

      return new Selection(endLineNumber, endColumn, startLineNumber, startColumn);
    }

  }

  vscMockSelection.Selection = Selection;
})(vscMockSelection = exports.vscMockSelection || (exports.vscMockSelection = {}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlbGVjdGlvbi5qcyJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsInBvc2l0aW9uXzEiLCJyZXF1aXJlIiwicmFuZ2VfMSIsInZzY01vY2tTZWxlY3Rpb24iLCJTZWxlY3Rpb25EaXJlY3Rpb24iLCJTZWxlY3Rpb24iLCJ2c2NNb2NrUmFuZ2UiLCJSYW5nZSIsImNvbnN0cnVjdG9yIiwic2VsZWN0aW9uU3RhcnRMaW5lTnVtYmVyIiwic2VsZWN0aW9uU3RhcnRDb2x1bW4iLCJwb3NpdGlvbkxpbmVOdW1iZXIiLCJwb3NpdGlvbkNvbHVtbiIsImNsb25lIiwidG9TdHJpbmciLCJlcXVhbHNTZWxlY3Rpb24iLCJvdGhlciIsInNlbGVjdGlvbnNFcXVhbCIsImEiLCJiIiwiZ2V0RGlyZWN0aW9uIiwic3RhcnRMaW5lTnVtYmVyIiwic3RhcnRDb2x1bW4iLCJMVFIiLCJSVEwiLCJzZXRFbmRQb3NpdGlvbiIsImVuZExpbmVOdW1iZXIiLCJlbmRDb2x1bW4iLCJnZXRQb3NpdGlvbiIsInZzY01vY2tQb3NpdGlvbiIsIlBvc2l0aW9uIiwic2V0U3RhcnRQb3NpdGlvbiIsImZyb21Qb3NpdGlvbnMiLCJzdGFydCIsImVuZCIsImxpbmVOdW1iZXIiLCJjb2x1bW4iLCJsaWZ0U2VsZWN0aW9uIiwic2VsIiwic2VsZWN0aW9uc0FyckVxdWFsIiwibGVuZ3RoIiwiaSIsImxlbiIsImlzSVNlbGVjdGlvbiIsIm9iaiIsImNyZWF0ZVdpdGhEaXJlY3Rpb24iLCJkaXJlY3Rpb24iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0FBLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFBRUMsRUFBQUEsS0FBSyxFQUFFO0FBQVQsQ0FBN0MsRSxDQUNBOztBQUNBLE1BQU1DLFVBQVUsR0FBR0MsT0FBTyxDQUFDLFlBQUQsQ0FBMUI7O0FBQ0EsTUFBTUMsT0FB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QUFDaEMsY0FBWCxLQUE4QixRQUp0QztBQUtIO0FBQ0Q7QUFDUjtBQUNBOzs7QUFDUSxXQUFPaUMsbUJBQVAsQ0FBMkJ4QixlQUEzQixFQUE0Q0MsV0FBNUMsRUFBeURJLGFBQXpELEVBQXdFQyxTQUF4RSxFQUFtRm1CLFNBQW5GLEVBQThGO0FBQzFGLFVBQUlBLFNBQVMsS0FBSzFDLGtCQUFrQixDQUFDbUIsR0FBckMsRUFBMEM7QUFDdEMsZUFBTyxJQUFJbEIsU0FBSixDQUFjZ0IsZUFBZCxFQUErQkMsV0FBL0IsRUFBNENJLGFBQTVDLEVBQTJEQyxTQUEzRCxDQUFQO0FBQ0g7O0FBQ0QsYUFBTyxJQUFJdEIsU0FBSixDQUFjcUIsYUFBZCxFQUE2QkMsU0FBN0IsRUFBd0NOLGVBQXhDLEVBQXlEQyxXQUF6RCxDQUFQO0FBQ0g7O0FBdkg4Qzs7QUF5SG5EbkIsRUFBQUEsZ0JBQWdCLENBQUNFLFNBQWpCLEdBQTZCQSxTQUE3QjtBQUNILENBN0lELEVBNklHRixnQkFBZ0IsR0FBR0wsT0FBTyxDQUFDSyxnQkFBUixLQUE2QkwsT0FBTyxDQUFDSyxnQkFBUixHQUEyQixFQUF4RCxDQTdJdEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbi8vIHRzbGludDpkaXNhYmxlOmFsbFxyXG5jb25zdCBwb3NpdGlvbl8xID0gcmVxdWlyZShcIi4vcG9zaXRpb25cIik7XHJcbmNvbnN0IHJhbmdlXzEgPSByZXF1aXJlKFwiLi9yYW5nZVwiKTtcclxudmFyIHZzY01vY2tTZWxlY3Rpb247XHJcbihmdW5jdGlvbiAodnNjTW9ja1NlbGVjdGlvbikge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZGlyZWN0aW9uIG9mIGEgc2VsZWN0aW9uLlxyXG4gICAgICovXHJcbiAgICBsZXQgU2VsZWN0aW9uRGlyZWN0aW9uO1xyXG4gICAgKGZ1bmN0aW9uIChTZWxlY3Rpb25EaXJlY3Rpb24pIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGUgc2VsZWN0aW9uIHN0YXJ0cyBhYm92ZSB3aGVyZSBpdCBlbmRzLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFNlbGVjdGlvbkRpcmVjdGlvbltTZWxlY3Rpb25EaXJlY3Rpb25bXCJMVFJcIl0gPSAwXSA9IFwiTFRSXCI7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhlIHNlbGVjdGlvbiBzdGFydHMgYmVsb3cgd2hlcmUgaXQgZW5kcy5cclxuICAgICAgICAgKi9cclxuICAgICAgICBTZWxlY3Rpb25EaXJlY3Rpb25bU2VsZWN0aW9uRGlyZWN0aW9uW1wiUlRMXCJdID0gMV0gPSBcIlJUTFwiO1xyXG4gICAgfSkoU2VsZWN0aW9uRGlyZWN0aW9uID0gdnNjTW9ja1NlbGVjdGlvbi5TZWxlY3Rpb25EaXJlY3Rpb24gfHwgKHZzY01vY2tTZWxlY3Rpb24uU2VsZWN0aW9uRGlyZWN0aW9uID0ge30pKTtcclxuICAgIC8qKlxyXG4gICAgICogQSBzZWxlY3Rpb24gaW4gdGhlIGVkaXRvci5cclxuICAgICAqIFRoZSBzZWxlY3Rpb24gaXMgYSByYW5nZSB0aGF0IGhhcyBhbiBvcmllbnRhdGlvbi5cclxuICAgICAqL1xyXG4gICAgY2xhc3MgU2VsZWN0aW9uIGV4dGVuZHMgcmFuZ2VfMS52c2NNb2NrUmFuZ2UuUmFuZ2Uge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHNlbGVjdGlvblN0YXJ0TGluZU51bWJlciwgc2VsZWN0aW9uU3RhcnRDb2x1bW4sIHBvc2l0aW9uTGluZU51bWJlciwgcG9zaXRpb25Db2x1bW4pIHtcclxuICAgICAgICAgICAgc3VwZXIoc2VsZWN0aW9uU3RhcnRMaW5lTnVtYmVyLCBzZWxlY3Rpb25TdGFydENvbHVtbiwgcG9zaXRpb25MaW5lTnVtYmVyLCBwb3NpdGlvbkNvbHVtbik7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uU3RhcnRMaW5lTnVtYmVyID0gc2VsZWN0aW9uU3RhcnRMaW5lTnVtYmVyO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvblN0YXJ0Q29sdW1uID0gc2VsZWN0aW9uU3RhcnRDb2x1bW47XHJcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb25MaW5lTnVtYmVyID0gcG9zaXRpb25MaW5lTnVtYmVyO1xyXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uQ29sdW1uID0gcG9zaXRpb25Db2x1bW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENsb25lIHRoaXMgc2VsZWN0aW9uLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsb25lKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFNlbGVjdGlvbih0aGlzLnNlbGVjdGlvblN0YXJ0TGluZU51bWJlciwgdGhpcy5zZWxlY3Rpb25TdGFydENvbHVtbiwgdGhpcy5wb3NpdGlvbkxpbmVOdW1iZXIsIHRoaXMucG9zaXRpb25Db2x1bW4pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUcmFuc2Zvcm0gdG8gYSBodW1hbi1yZWFkYWJsZSByZXByZXNlbnRhdGlvbi5cclxuICAgICAgICAgKi9cclxuICAgICAgICB0b1N0cmluZygpIHtcclxuICAgICAgICAgICAgcmV0dXJuICdbJyArIHRoaXMuc2VsZWN0aW9uU3RhcnRMaW5lTnVtYmVyICsgJywnICsgdGhpcy5zZWxlY3Rpb25TdGFydENvbHVtbiArICcgLT4gJyArIHRoaXMucG9zaXRpb25MaW5lTnVtYmVyICsgJywnICsgdGhpcy5wb3NpdGlvbkNvbHVtbiArICddJztcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGVzdCBpZiBlcXVhbHMgb3RoZXIgc2VsZWN0aW9uLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGVxdWFsc1NlbGVjdGlvbihvdGhlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gKFNlbGVjdGlvbi5zZWxlY3Rpb25zRXF1YWwodGhpcywgb3RoZXIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGVzdCBpZiB0aGUgdHdvIHNlbGVjdGlvbnMgYXJlIGVxdWFsLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHN0YXRpYyBzZWxlY3Rpb25zRXF1YWwoYSwgYikge1xyXG4gICAgICAgICAgICByZXR1cm4gKGEuc2VsZWN0aW9uU3RhcnRMaW5lTnVtYmVyID09PSBiLnNlbGVjdGlvblN0YXJ0TGluZU51bWJlciAmJlxyXG4gICAgICAgICAgICAgICAgYS5zZWxlY3Rpb25TdGFydENvbHVtbiA9PT0gYi5zZWxlY3Rpb25TdGFydENvbHVtbiAmJlxyXG4gICAgICAgICAgICAgICAgYS5wb3NpdGlvbkxpbmVOdW1iZXIgPT09IGIucG9zaXRpb25MaW5lTnVtYmVyICYmXHJcbiAgICAgICAgICAgICAgICBhLnBvc2l0aW9uQ29sdW1uID09PSBiLnBvc2l0aW9uQ29sdW1uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2V0IGRpcmVjdGlvbnMgKExUUiBvciBSVEwpLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldERpcmVjdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uU3RhcnRMaW5lTnVtYmVyID09PSB0aGlzLnN0YXJ0TGluZU51bWJlciAmJiB0aGlzLnNlbGVjdGlvblN0YXJ0Q29sdW1uID09PSB0aGlzLnN0YXJ0Q29sdW1uKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gU2VsZWN0aW9uRGlyZWN0aW9uLkxUUjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gU2VsZWN0aW9uRGlyZWN0aW9uLlJUTDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3JlYXRlIGEgbmV3IHNlbGVjdGlvbiB3aXRoIGEgZGlmZmVyZW50IGBwb3NpdGlvbkxpbmVOdW1iZXJgIGFuZCBgcG9zaXRpb25Db2x1bW5gLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNldEVuZFBvc2l0aW9uKGVuZExpbmVOdW1iZXIsIGVuZENvbHVtbikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nZXREaXJlY3Rpb24oKSA9PT0gU2VsZWN0aW9uRGlyZWN0aW9uLkxUUikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBTZWxlY3Rpb24odGhpcy5zdGFydExpbmVOdW1iZXIsIHRoaXMuc3RhcnRDb2x1bW4sIGVuZExpbmVOdW1iZXIsIGVuZENvbHVtbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBTZWxlY3Rpb24oZW5kTGluZU51bWJlciwgZW5kQ29sdW1uLCB0aGlzLnN0YXJ0TGluZU51bWJlciwgdGhpcy5zdGFydENvbHVtbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdldCB0aGUgcG9zaXRpb24gYXQgYHBvc2l0aW9uTGluZU51bWJlcmAgYW5kIGBwb3NpdGlvbkNvbHVtbmAuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0UG9zaXRpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgcG9zaXRpb25fMS52c2NNb2NrUG9zaXRpb24uUG9zaXRpb24odGhpcy5wb3NpdGlvbkxpbmVOdW1iZXIsIHRoaXMucG9zaXRpb25Db2x1bW4pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDcmVhdGUgYSBuZXcgc2VsZWN0aW9uIHdpdGggYSBkaWZmZXJlbnQgYHNlbGVjdGlvblN0YXJ0TGluZU51bWJlcmAgYW5kIGBzZWxlY3Rpb25TdGFydENvbHVtbmAuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc2V0U3RhcnRQb3NpdGlvbihzdGFydExpbmVOdW1iZXIsIHN0YXJ0Q29sdW1uKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdldERpcmVjdGlvbigpID09PSBTZWxlY3Rpb25EaXJlY3Rpb24uTFRSKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFNlbGVjdGlvbihzdGFydExpbmVOdW1iZXIsIHN0YXJ0Q29sdW1uLCB0aGlzLmVuZExpbmVOdW1iZXIsIHRoaXMuZW5kQ29sdW1uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFNlbGVjdGlvbih0aGlzLmVuZExpbmVOdW1iZXIsIHRoaXMuZW5kQ29sdW1uLCBzdGFydExpbmVOdW1iZXIsIHN0YXJ0Q29sdW1uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gLS0tLVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENyZWF0ZSBhIGBTZWxlY3Rpb25gIGZyb20gb25lIG9yIHR3byBwb3NpdGlvbnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBzdGF0aWMgZnJvbVBvc2l0aW9ucyhzdGFydCwgZW5kID0gc3RhcnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBTZWxlY3Rpb24oc3RhcnQubGluZU51bWJlciwgc3RhcnQuY29sdW1uLCBlbmQubGluZU51bWJlciwgZW5kLmNvbHVtbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENyZWF0ZSBhIGBTZWxlY3Rpb25gIGZyb20gYW4gYElTZWxlY3Rpb25gLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHN0YXRpYyBsaWZ0U2VsZWN0aW9uKHNlbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFNlbGVjdGlvbihzZWwuc2VsZWN0aW9uU3RhcnRMaW5lTnVtYmVyLCBzZWwuc2VsZWN0aW9uU3RhcnRDb2x1bW4sIHNlbC5wb3NpdGlvbkxpbmVOdW1iZXIsIHNlbC5wb3NpdGlvbkNvbHVtbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGBhYCBlcXVhbHMgYGJgLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHN0YXRpYyBzZWxlY3Rpb25zQXJyRXF1YWwoYSwgYikge1xyXG4gICAgICAgICAgICBpZiAoYSAmJiAhYiB8fCAhYSAmJiBiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFhICYmICFiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGEubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5zZWxlY3Rpb25zRXF1YWwoYVtpXSwgYltpXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRlc3QgaWYgYG9iamAgaXMgYW4gYElTZWxlY3Rpb25gLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHN0YXRpYyBpc0lTZWxlY3Rpb24ob2JqKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAob2JqXHJcbiAgICAgICAgICAgICAgICAmJiAodHlwZW9mIG9iai5zZWxlY3Rpb25TdGFydExpbmVOdW1iZXIgPT09ICdudW1iZXInKVxyXG4gICAgICAgICAgICAgICAgJiYgKHR5cGVvZiBvYmouc2VsZWN0aW9uU3RhcnRDb2x1bW4gPT09ICdudW1iZXInKVxyXG4gICAgICAgICAgICAgICAgJiYgKHR5cGVvZiBvYmoucG9zaXRpb25MaW5lTnVtYmVyID09PSAnbnVtYmVyJylcclxuICAgICAgICAgICAgICAgICYmICh0eXBlb2Ygb2JqLnBvc2l0aW9uQ29sdW1uID09PSAnbnVtYmVyJykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDcmVhdGUgd2l0aCBhIGRpcmVjdGlvbi5cclxuICAgICAgICAgKi9cclxuICAgICAgICBzdGF0aWMgY3JlYXRlV2l0aERpcmVjdGlvbihzdGFydExpbmVOdW1iZXIsIHN0YXJ0Q29sdW1uLCBlbmRMaW5lTnVtYmVyLCBlbmRDb2x1bW4sIGRpcmVjdGlvbikge1xyXG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBTZWxlY3Rpb25EaXJlY3Rpb24uTFRSKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFNlbGVjdGlvbihzdGFydExpbmVOdW1iZXIsIHN0YXJ0Q29sdW1uLCBlbmRMaW5lTnVtYmVyLCBlbmRDb2x1bW4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2VsZWN0aW9uKGVuZExpbmVOdW1iZXIsIGVuZENvbHVtbiwgc3RhcnRMaW5lTnVtYmVyLCBzdGFydENvbHVtbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdnNjTW9ja1NlbGVjdGlvbi5TZWxlY3Rpb24gPSBTZWxlY3Rpb247XHJcbn0pKHZzY01vY2tTZWxlY3Rpb24gPSBleHBvcnRzLnZzY01vY2tTZWxlY3Rpb24gfHwgKGV4cG9ydHMudnNjTW9ja1NlbGVjdGlvbiA9IHt9KSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNlbGVjdGlvbi5qcy5tYXAiXX0=