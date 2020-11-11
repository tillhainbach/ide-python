"use strict"; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

Object.defineProperty(exports, "__esModule", {
  value: true
});

const os_1 = require("os");

const characters_1 = require("../../language/characters");

var State;

(function (State) {
  State[State["Default"] = 0] = "Default";
  State[State["Preformatted"] = 1] = "Preformatted";
  State[State["Code"] = 2] = "Code";
})(State || (State = {}));

class RestTextConverter {
  constructor() {
    this.state = State.Default;
    this.md = [];
  } // tslint:disable-next-line:cyclomatic-complexity


  toMarkdown(docstring) {
    // Translates reStructruredText (Python doc syntax) to markdown.
    // It only translates as much as needed to display tooltips
    // and documentation in the completion list.
    // See https://en.wikipedia.org/wiki/ReStructuredText
    const result = this.transformLines(docstring);
    this.state = State.Default;
    this.md = [];
    return result;
  }

  escapeMarkdown(text) {
    // Not complete escape list so it does not interfere
    // with subsequent code highlighting (see above).
    return text.replace(/\#/g, '\\#').replace(/\*/g, '\\*').replace(/\ _/g, ' \\_').replace(/^_/, '\\_');
  }

  transformLines(docstring) {
    const lines = docstring.split(/\r?\n/);

    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i]; // Avoid leading empty lines

      if (this.md.length === 0 && line.length === 0) {
        continue;
      }

      switch (this.state) {
        case State.Default:
          i += this.inDefaultState(lines, i);
          break;

        case State.Preformatted:
          i += this.inPreformattedState(lines, i);
          break;

        case State.Code:
          this.inCodeState(line);
          break;

        default:
          break;
      }
    }

    this.endCodeBlock();
    this.endPreformattedBlock();
    return this.md.join(os_1.EOL).trim();
  }

  inDefaultState(lines, i) {
    let line = lines[i];

    if (line.startsWith('```')) {
      this.startCodeBlock();
      return 0;
    }

    if (line.startsWith('===') || line.startsWith('---')) {
      return 0; // Eat standalone === or --- lines.
    }

    if (this.handleDoubleColon(line)) {
      return 0;
    }

    if (this.isIgnorable(line)) {
      return 0;
    }

    if (this.handleSectionHeader(lines, i)) {
      return 1; // Eat line with === or ---
    }

    const result = this.checkPreContent(lines, i);

    if (this.state !== State.Default) {
      return result; // Handle line in the new state
    }

    line = this.cleanup(line);
    line = line.replace(/``/g, '`'); // Convert double backticks to single.

    line = this.escapeMarkdown(line);
    this.md.push(line);
    return 0;
  }

  inPreformattedState(lines, i) {
    let line = lines[i];

    if (this.isIgnorable(line)) {
      return 0;
    } // Preformatted block terminates by a line without leading whitespace.


    if (line.length > 0 && !characters_1.isWhiteSpace(line.charCodeAt(0)) && !this.isListItem(line)) {
      this.endPreformattedBlock();
      return -1;
    }

    const prevLine = this.md.length > 0 ? this.md[this.md.length - 1] : undefined;

    if (line.length === 0 && prevLine && (prevLine.length === 0 || prevLine.startsWith('```'))) {
      return 0; // Avoid more than one empty line in a row.
    } // Since we use HTML blocks as preformatted text
    // make sure we drop angle brackets since otherwise
    // they will render as tags and attributes


    line = line.replace(/</g, ' ').replace(/>/g, ' ');
    line = line.replace(/``/g, '`'); // Convert double backticks to single.
    // Keep hard line breaks for the preformatted content

    this.md.push(`${line}  `);
    return 0;
  }

  inCodeState(line) {
    const prevLine = this.md.length > 0 ? this.md[this.md.length - 1] : undefined;

    if (line.length === 0 && prevLine && (prevLine.length === 0 || prevLine.startsWith('```'))) {
      return; // Avoid more than one empty line in a row.
    }

    if (line.startsWith('```')) {
      this.endCodeBlock();
    } else {
      this.md.push(line);
    }
  }

  isIgnorable(line) {
    if (line.indexOf('generated/') >= 0) {
      return true; // Drop generated content.
    }

    const trimmed = line.trim();

    if (trimmed.startsWith('..') && trimmed.indexOf('::') > 0) {
      // Ignore lines likes .. sectionauthor:: John Doe.
      return true;
    }

    return false;
  }

  checkPreContent(lines, i) {
    const line = lines[i];

    if (i === 0 || line.trim().length === 0) {
      return 0;
    }

    if (!characters_1.isWhiteSpace(line.charCodeAt(0)) && !this.isListItem(line)) {
      return 0; // regular line, nothing to do here.
    } // Indented content is considered to be preformatted.


    this.startPreformattedBlock();
    return -1;
  }

  handleSectionHeader(lines, i) {
    const line = lines[i];

    if (i < lines.length - 1 && lines[i + 1].startsWith('===')) {
      // Section title -> heading level 3.
      this.md.push(`### ${this.cleanup(line)}`);
      return true;
    }

    if (i < lines.length - 1 && lines[i + 1].startsWith('---')) {
      // Subsection title -> heading level 4.
      this.md.push(`#### ${this.cleanup(line)}`);
      return true;
    }

    return false;
  }

  handleDoubleColon(line) {
    if (!line.endsWith('::')) {
      return false;
    } // Literal blocks begin with `::`. Such as sequence like
    // '... as shown below::' that is followed by a preformatted text.


    if (line.length > 2 && !line.startsWith('..')) {
      // Ignore lines likes .. autosummary:: John Doe.
      // Trim trailing : so :: turns into :.
      this.md.push(line.substring(0, line.length - 1));
    }

    this.startPreformattedBlock();
    return true;
  }

  startPreformattedBlock() {
    // Remove previous empty line so we avoid double empties.
    this.tryRemovePrecedingEmptyLines(); // Lie about the language since we don't want preformatted text
    // to be colorized as Python. HTML is more 'appropriate' as it does
    // not colorize -- or + or keywords like 'from'.

    this.md.push('```html');
    this.state = State.Preformatted;
  }

  endPreformattedBlock() {
    if (this.state === State.Preformatted) {
      this.tryRemovePrecedingEmptyLines();
      this.md.push('```');
      this.state = State.Default;
    }
  }

  startCodeBlock() {
    // Remove previous empty line so we avoid double empties.
    this.tryRemovePrecedingEmptyLines();
    this.md.push('```python');
    this.state = State.Code;
  }

  endCodeBlock() {
    if (this.state === State.Code) {
      this.tryRemovePrecedingEmptyLines();
      this.md.push('```');
      this.state = State.Default;
    }
  }

  tryRemovePrecedingEmptyLines() {
    while (this.md.length > 0 && this.md[this.md.length - 1].trim().length === 0) {
      this.md.pop();
    }
  }

  isListItem(line) {
    const trimmed = line.trim();
    const ch = trimmed.length > 0 ? trimmed.charCodeAt(0) : 0;
    return ch === 42
    /* Asterisk */
    || ch === 45
    /* Hyphen */
    || characters_1.isDecimal(ch);
  }

  cleanup(line) {
    return line.replace(/:mod:/g, 'module:');
  }

}

exports.RestTextConverter = RestTextConverter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3RUZXh0Q29udmVydGVyLmpzIl0sIm5hbWVzIjpbIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwib3NfMSIsInJlcXVpcmUiLCJjaGFyYWN0ZXJzXzEiLCJTdGF0ZSIsIlJlc3RUZXh0Q29udmVydGVyIiwiY29uc3RydWN0b3IiLCJzdGF0ZSIsIkRlZmF1bHQiLCJtZCIsInRvTWFya2Rvd24iLCJkb2NzdHJpbmciLCJyZXN1bHQiLCJ0cmFuc2Zvcm1MaW5lcyIsImVzY2FwZU1hcmtkb3duIiwidGV4dCIsInJlcGxhY2UiLCJsaW5lcyIsInNwbGl0IiwiaSIsImxlbmd0aCIsImxpbmUiLCJpbkRlZmF1bHRTdGF0ZSIsIlByZWZvcm1hdHRlZCIsImluUHJlZm9ybWF0dGVkU3RhdGUiLCJDb2RlIiwiaW5Db2RlU3RhdGUiLCJlbmRDb2RlQmxvY2siLCJlbmRQcmVmb3JtYXR0ZWRCbG9jayIsImpvaW4iLCJFT0wiLCJ0cmltIiwic3RhcnRzV2l0aCIsInN0YXJ0Q29kZUJsb2NrIiwiaGFuZGxlRG91YmxlQ29sb24iLCJpc0lnbm9yYWJsZSIsImhhbmRsZVNlY3Rpb25IZWFkZXIiLCJjaGVja1ByZUNvbnRlbnQiLCJjbGVhbnVwIiwicHVzaCIsImlzV2hpdGVTcGFjZSIsImNoYXJDb2RlQXQiLCJpc0xpc3RJdGVtIiwicHJldkxpbmUiLCJ1bmRlZmluZWQiLCJpbmRleE9mIiwidHJpbW1lZCIsInN0YXJ0UHJlZm9ybWF0dGVkQmxvY2siLCJlbmRzV2l0aCIsInN1YnN0cmluZyIsInRyeVJlbW92ZVByZWNlZGluZ0VtcHR5TGluZXMiLCJwb3AiLCJjaCIsImlzRGVjaW1hbCJdLCJtYXBwaW5ncyI6IkFBQUEsYSxDQUNBO0FBQ0E7O0FBQ0FBLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFBRUMsRUFBQUEsS0FBSyxFQUFFO0FBQVQsQ0FBN0M7O0FBQ0EsTUFBTUMsSUFBSSxHQUFHQyxPQUFPLENBQUMsSUFBRCxDQUFwQjs7QUFDQSxNQUFNQyxZQUFZLEdBQUdELE9BQU8sQ0FBQywyQkFBRCxDQUE1Qjs7QUFDQSxJQUFJRSxLQUFKOztBQUNBLENBQUMsVUFBVUEsS0FBVixFQUFpQjtBQUNkQSxFQUFBQSxLQUFLLENBQUNBLEtBQUssQ0FBQyxTQUFELENBQUwsR0FBbUIsQ0FBcEIsQ0FBTCxHQUE4QixTQUE5QjtBQUNBQSxFQUFBQSxLQUFLLENBQUNBLEtBQUssQ0FBQyxjQUFELENBQUwsR0FBd0IsQ0FBekIsQ0FBTCxHQUFtQyxjQUFuQztBQUNBQSxFQUFBQSxLQUFLLENBQUNBLEtBQUssQ0FBQyxNQUFELENBQUwsR0FBZ0IsQ0FBakIsQ0FBTCxHQUEyQixNQUEzQjtBQUNILENBSkQsRUFJR0EsS0FBSyxLQUFLQSxLQUFLLEdBQUcsRUFBYixDQUpSOztBQUtBLE1BQU1DLGlCQUFOLENBQXdCO0FBQ3BCQyxFQUFBQSxXQUFXLEdBQUc7QUFDVixTQUFLQyxLQUFMLEdBQWFILEtBQUssQ0FBQ0ksT0FBbkI7QUFDQSxTQUFLQyxFQUFMLEdBQVUsRUFBVjtBQUNILEdBSm1CLENBS3BCOzs7QUFDQUMsRUFBQUEsVUFBVSxDQUFDQyxTQUFELEVBQVk7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFNQyxNQUFNLEdBQUcsS0FBS0MsY0FBTCxDQUFvQkYsU0FBcEIsQ0FBZjtBQUNBLFNBQUtKLEtBQUwsR0FBYUgsS0FBSyxDQUFDSSxPQUFuQjtBQUNBLFNBQUtDLEVBQUwsR0FBVSxFQUFWO0FBQ0EsV0FBT0csTUFBUDtBQUNIOztBQUNERSxFQUFBQSxjQUFjLENBQUNDLElBQUQsRUFBTztBQUNqQjtBQUNBO0FBQ0EsV0FBT0EsSUFBSSxDQUNOQyxPQURFLENBQ00sS0FETixFQUNhLEtBRGIsRUFFRkEsT0FGRSxDQUVNLEtBRk4sRUFFYSxLQUZiLEVBR0ZBLE9BSEUsQ0FHTSxNQUhOLEVBR2MsTUFIZCxFQUlGQSxPQUpFLENBSU0sSUFKTixFQUlZLEtBSlosQ0FBUDtBQUtIOztBQUNESCxFQUFBQSxjQUFjLENBQUNGLFNBQUQsRUFBWTtBQUN0QixVQUFNTSxLQUFLLEdBQUdOLFNBQVMsQ0FBQ08sS0FBVixDQUFnQixPQUFoQixDQUFkOztBQUNBLFNBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0YsS0FBSyxDQUFDRyxNQUExQixFQUFrQ0QsQ0FBQyxJQUFJLENBQXZDLEVBQTBDO0FBQ3RDLFlBQU1FLElBQUksR0FBR0osS0FBSyxDQUFDRSxDQUFELENBQWxCLENBRHNDLENBRXRDOztBQUNBLFVBQUksS0FBS1YsRUFBTCxDQUFRVyxNQUFSLEtBQW1CLENBQW5CLElBQXdCQyxJQUFJLENBQUNELE1BQUwsS0FBZ0IsQ0FBNUMsRUFBK0M7QUFDM0M7QUFDSDs7QUFDRCxjQUFRLEtBQUtiLEtBQWI7QUFDSSxhQUFLSCxLQUFLLENBQUNJLE9BQVg7QUFDSVcsVUFBQUEsQ0FBQyxJQUFJLEtBQUtHLGNBQUwsQ0FBb0JMLEtBQXBCLEVBQTJCRSxDQUEzQixDQUFMO0FBQ0E7O0FBQ0osYUFBS2YsS0FBSyxDQUFDbUIsWUFBWDtBQUNJSixVQUFBQSxDQUFDLElBQUksS0FBS0ssbUJBQUwsQ0FBeUJQLEtBQXpCLEVBQWdDRSxDQUFoQyxDQUFMO0FBQ0E7O0FBQ0osYUFBS2YsS0FBSyxDQUFDcUIsSUFBWDtBQUNJLGVBQUtDLFdBQUwsQ0FBaUJMLElBQWpCO0FBQ0E7O0FBQ0o7QUFDSTtBQVhSO0FBYUg7O0FBQ0QsU0FBS00sWUFBTDtBQUNBLFNBQUtDLG9CQUFMO0FBQ0EsV0FBTyxLQUFLbkIsRUFBTCxDQUFRb0IsSUFBUixDQUFhNUIsSUFBSSxDQUFDNkIsR0FBbEIsRUFBdUJDLElBQXZCLEVBQVA7QUFDSDs7QUFDRFQsRUFBQUEsY0FBYyxDQUFDTCxLQUFELEVBQVFFLENBQVIsRUFBVztBQUNyQixRQUFJRSxJQUFJLEdBQUdKLEtBQUssQ0FBQ0UsQ0FBRCxDQUFoQjs7QUFDQSxRQUFJRSxJQUFJLENBQUNXLFVBQUwsQ0FBZ0IsS0FBaEIsQ0FBSixFQUE0QjtBQUN4QixXQUFLQyxjQUFMO0FBQ0EsYUFBTyxDQUFQO0FBQ0g7O0FBQ0QsUUFBSVosSUFBSSxDQUFDVyxVQUFMLENBQWdCLEtBQWhCLEtBQTBCWCxJQUFJLENBQUNXLFVBQUwsQ0FBZ0IsS0FBaEIsQ0FBOUIsRUFBc0Q7QUFDbEQsYUFBTyxDQUFQLENBRGtELENBQ3hDO0FBQ2I7O0FBQ0QsUUFBSSxLQUFLRSxpQkFBTCxDQUF1QmIsSUFBdkIsQ0FBSixFQUFrQztBQUM5QixhQUFPLENBQVA7QUFDSDs7QUFDRCxRQUFJLEtBQUtjLFdBQUwsQ0FBaUJkLElBQWpCLENBQUosRUFBNEI7QUFDeEIsYUFBTyxDQUFQO0FBQ0g7O0FBQ0QsUUFBSSxLQUFLZSxtQkFBTCxDQUF5Qm5CLEtBQXpCLEVBQWdDRSxDQUFoQyxDQUFKLEVBQXdDO0FBQ3BDLGFBQU8sQ0FBUCxDQURvQyxDQUMxQjtBQUNiOztBQUNELFVBQU1QLE1BQU0sR0FBRyxLQUFLeUIsZUFBTCxDQUFxQnBCLEtBQXJCLEVBQTRCRSxDQUE1QixDQUFmOztBQUNBLFFBQUksS0FBS1osS0FBTCxLQUFlSCxLQUFLLENBQUNJLE9BQXpCLEVBQWtDO0FBQzlCLGFBQU9JLE1BQVAsQ0FEOEIsQ0FDZjtBQUNsQjs7QUFDRFMsSUFBQUEsSUFBSSxHQUFHLEtBQUtpQixPQUFMLENBQWFqQixJQUFiLENBQVA7QUFDQUEsSUFBQUEsSUFBSSxHQUFHQSxJQUFJLENBQUNMLE9BQUwsQ0FBYSxLQUFiLEVBQW9CLEdBQXBCLENBQVAsQ0F2QnFCLENBdUJZOztBQUNqQ0ssSUFBQUEsSUFBSSxHQUFHLEtBQUtQLGNBQUwsQ0FBb0JPLElBQXBCLENBQVA7QUFDQSxTQUFLWixFQUFMLENBQVE4QixJQUFSLENBQWFsQixJQUFiO0FBQ0EsV0FBTyxDQUFQO0FBQ0g7O0FBQ0RHLEVBQUFBLG1CQUFtQixDQUFDUCxLQUFELEVBQVFFLENBQVIsRUFBVztBQUMxQixRQUFJRSxJQUFJLEdBQUdKLEtBQUssQ0FBQ0UsQ0FBRCxDQUFoQjs7QUFDQSxRQUFJLEtBQUtnQixXQUFMLENBQWlCZCxJQUFqQixDQUFKLEVBQTRCO0FBQ3hCLGFBQU8sQ0FBUDtBQUNILEtBSnlCLENBSzFCOzs7QUFDQSxRQUFJQSxJQUFJLENBQUNELE1BQUwsR0FBYyxDQUFkLElBQW1CLENBQUNqQixZQUFZLENBQUNxQyxZQUFiLENBQTBCbkIsSUFBSSxDQUFDb0IsVUFBTCxDQUFnQixDQUFoQixDQUExQixDQUFwQixJQUFxRSxDQUFDLEtBQUtDLFVBQUwsQ0FBZ0JyQixJQUFoQixDQUExRSxFQUFpRztBQUM3RixXQUFLTyxvQkFBTDtBQUNBLGFBQU8sQ0FBQyxDQUFSO0FBQ0g7O0FBQ0QsVUFBTWUsUUFBUSxHQUFHLEtBQUtsQyxFQUFMLENBQVFXLE1BQVIsR0FBaUIsQ0FBakIsR0FBcUIsS0FBS1gsRUFBTCxDQUFRLEtBQUtBLEVBQUwsQ0FBUVcsTUFBUixHQUFpQixDQUF6QixDQUFyQixHQUFtRHdCLFNBQXBFOztBQUNBLFFBQUl2QixJQUFJLENBQUNELE1BQUwsS0FBZ0IsQ0FBaEIsSUFBcUJ1QixRQUFyQixLQUFrQ0EsUUFBUSxDQUFDdkIsTUFBVCxLQUFvQixDQUFwQixJQUF5QnVCLFFBQVEsQ0FBQ1gsVUFBVCxDQUFvQixLQUFwQixDQUEzRCxDQUFKLEVBQTRGO0FBQ3hGLGFBQU8sQ0FBUCxDQUR3RixDQUM5RTtBQUNiLEtBYnlCLENBYzFCO0FBQ0E7QUFDQTs7O0FBQ0FYLElBQUFBLElBQUksR0FBR0EsSUFBSSxDQUFDTCxPQUFMLENBQWEsSUFBYixFQUFtQixHQUFuQixFQUF3QkEsT0FBeEIsQ0FBZ0MsSUFBaEMsRUFBc0MsR0FBdEMsQ0FBUDtBQUNBSyxJQUFBQSxJQUFJLEdBQUdBLElBQUksQ0FBQ0wsT0FBTCxDQUFhLEtBQWIsRUFBb0IsR0FBcEIsQ0FBUCxDQWxCMEIsQ0FrQk87QUFDakM7O0FBQ0EsU0FBS1AsRUFBTCxDQUFROEIsSUFBUixDQUFjLEdBQUVsQixJQUFLLElBQXJCO0FBQ0EsV0FBTyxDQUFQO0FBQ0g7O0FBQ0RLLEVBQUFBLFdBQVcsQ0FBQ0wsSUFBRCxFQUFPO0FBQ2QsVUFBTXNCLFFBQVEsR0FBRyxLQUFLbEMsRUFBTCxDQUFRVyxNQUFSLEdBQWlCLENBQWpCLEdBQXFCLEtBQUtYLEVBQUwsQ0FBUSxLQUFLQSxFQUFMLENBQVFXLE1BQVIsR0FBaUIsQ0FBekIsQ0FBckIsR0FBbUR3QixTQUFwRTs7QUFDQSxRQUFJdkIsSUFBSSxDQUFDRCxNQUFMLEtBQWdCLENBQWhCLElBQXFCdUIsUUFBckIsS0FBa0NBLFFBQVEsQ0FBQ3ZCLE1BQVQsS0FBb0IsQ0FBcEIsSUFBeUJ1QixRQUFRLENBQUNYLFVBQVQsQ0FBb0IsS0FBcEIsQ0FBM0QsQ0FBSixFQUE0RjtBQUN4RixhQUR3RixDQUNoRjtBQUNYOztBQUNELFFBQUlYLElBQUksQ0FBQ1csVUFBTCxDQUFnQixLQUFoQixDQUFKLEVBQTRCO0FBQ3hCLFdBQUtMLFlBQUw7QUFDSCxLQUZELE1BR0s7QUFDRCxXQUFLbEIsRUFBTCxDQUFROEIsSUFBUixDQUFhbEIsSUFBYjtBQUNIO0FBQ0o7O0FBQ0RjLEVBQUFBLFdBQVcsQ0FBQ2QsSUFBRCxFQUFPO0FBQ2QsUUFBSUEsSUFBSSxDQUFDd0IsT0FBTCxDQUFhLFlBQWIsS0FBOEIsQ0FBbEMsRUFBcUM7QUFDakMsYUFBTyxJQUFQLENBRGlDLENBQ3BCO0FBQ2hCOztBQUNELFVBQU1DLE9BQU8sR0FBR3pCLElBQUksQ0FBQ1UsSUFBTCxFQUFoQjs7QUFDQSxRQUFJZSxPQUFPLENBQUNkLFVBQVIsQ0FBbUIsSUFBbkIsS0FBNEJjLE9BQU8sQ0FBQ0QsT0FBUixDQUFnQixJQUFoQixJQUF3QixDQUF4RCxFQUEyRDtBQUN2RDtBQUNBLGFBQU8sSUFBUDtBQUNIOztBQUNELFdBQU8sS0FBUDtBQUNIOztBQUNEUixFQUFBQSxlQUFlLENBQUNwQixLQUFELEVBQVFFLENBQVIsRUFBVztBQUN0QixVQUFNRSxJQUFJLEdBQUdKLEtBQUssQ0FBQ0UsQ0FBRCxDQUFsQjs7QUFDQSxRQUFJQSxDQUFDLEtBQUssQ0FBTixJQUFXRSxJQUFJLENBQUNVLElBQUwsR0FBWVgsTUFBWixLQUF1QixDQUF0QyxFQUF5QztBQUNyQyxhQUFPLENBQVA7QUFDSDs7QUFDRCxRQUFJLENBQUNqQixZQUFZLENBQUNxQyxZQUFiLENBQTBCbkIsSUFBSSxDQUFDb0IsVUFBTCxDQUFnQixDQUFoQixDQUExQixDQUFELElBQWtELENBQUMsS0FBS0MsVUFBTCxDQUFnQnJCLElBQWhCLENBQXZELEVBQThFO0FBQzFFLGFBQU8sQ0FBUCxDQUQwRSxDQUNoRTtBQUNiLEtBUHFCLENBUXRCOzs7QUFDQSxTQUFLMEIsc0JBQUw7QUFDQSxXQUFPLENBQUMsQ0FBUjtBQUNIOztBQUNEWCxFQUFBQSxtQkFBbUIsQ0FBQ25CLEtBQUQsRUFBUUUsQ0FBUixFQUFXO0FBQzFCLFVBQU1FLElBQUksR0FBR0osS0FBSyxDQUFDRSxDQUFELENBQWxCOztBQUNBLFFBQUlBLENBQUMsR0FBR0YsS0FBSyxDQUFDRyxNQUFOLEdBQWUsQ0FBbkIsSUFBeUJILEtBQUssQ0FBQ0UsQ0FBQyxHQUFHLENBQUwsQ0FBTCxDQUFhYSxVQUFiLENBQXdCLEtBQXhCLENBQTdCLEVBQThEO0FBQzFEO0FBQ0EsV0FBS3ZCLEVBQUwsQ0FBUThCLElBQVIsQ0FBYyxPQUFNLEtBQUtELE9BQUwsQ0FBYWpCLElBQWIsQ0FBbUIsRUFBdkM7QUFDQSxhQUFPLElBQVA7QUFDSDs7QUFDRCxRQUFJRixDQUFDLEdBQUdGLEtBQUssQ0FBQ0csTUFBTixHQUFlLENBQW5CLElBQXlCSCxLQUFLLENBQUNFLENBQUMsR0FBRyxDQUFMLENBQUwsQ0FBYWEsVUFBYixDQUF3QixLQUF4QixDQUE3QixFQUE4RDtBQUMxRDtBQUNBLFdBQUt2QixFQUFMLENBQVE4QixJQUFSLENBQWMsUUFBTyxLQUFLRCxPQUFMLENBQWFqQixJQUFiLENBQW1CLEVBQXhDO0FBQ0EsYUFBTyxJQUFQO0FBQ0g7O0FBQ0QsV0FBTyxLQUFQO0FBQ0g7O0FBQ0RhLEVBQUFBLGlCQUFpQixDQUFDYixJQUFELEVBQU87QUFDcEIsUUFBSSxDQUFDQSxJQUFJLENBQUMyQixRQUFMLENBQWMsSUFBZCxDQUFMLEVBQTBCO0FBQ3RCLGFBQU8sS0FBUDtBQUNILEtBSG1CLENBSXBCO0FBQ0E7OztBQUNBLFFBQUkzQixJQUFJLENBQUNELE1BQUwsR0FBYyxDQUFkLElBQW1CLENBQUNDLElBQUksQ0FBQ1csVUFBTCxDQUFnQixJQUFoQixDQUF4QixFQUErQztBQUMzQztBQUNBO0FBQ0EsV0FBS3ZCLEVBQUwsQ0FBUThCLElBQVIsQ0FBYWxCLElBQUksQ0FBQzRCLFNBQUwsQ0FBZSxDQUFmLEVBQWtCNUIsSUFBSSxDQUFDRCxNQUFMLEdBQWMsQ0FBaEMsQ0FBYjtBQUNIOztBQUNELFNBQUsyQixzQkFBTDtBQUNBLFdBQU8sSUFBUDtBQUNIOztBQUNEQSxFQUFBQSxzQkFBc0IsR0FBRztBQUNyQjtBQUNBLFNBQUtHLDRCQUFMLEdBRnFCLENBR3JCO0FBQ0E7QUFDQTs7QUFDQSxTQUFLekMsRUFBTCxDQUFROEIsSUFBUixDQUFhLFNBQWI7QUFDQSxTQUFLaEMsS0FBTCxHQUFhSCxLQUFLLENBQUNtQixZQUFuQjtBQUNIOztBQUNESyxFQUFBQSxvQkFBb0IsR0FBRztBQUNuQixRQUFJLEtBQUtyQixLQUFMLEtBQWVILEtBQUssQ0FBQ21CLFlBQXpCLEVBQXVDO0FBQ25DLFdBQUsyQiw0QkFBTDtBQUNBLFdBQUt6QyxFQUFMLENBQVE4QixJQUFSLENBQWEsS0FBYjtBQUNBLFdBQUtoQyxLQUFMLEdBQWFILEtBQUssQ0FBQ0ksT0FBbkI7QUFDSDtBQUNKOztBQUNEeUIsRUFBQUEsY0FBYyxHQUFHO0FBQ2I7QUFDQSxTQUFLaUIsNEJBQUw7QUFDQSxTQUFLekMsRUFBTCxDQUFROEIsSUFBUixDQUFhLFdBQWI7QUFDQSxTQUFLaEMsS0FBTCxHQUFhSCxLQUFLLENBQUNxQixJQUFuQjtBQUNIOztBQUNERSxFQUFBQSxZQUFZLEdBQUc7QUFDWCxRQUFJLEtBQUtwQixLQUFMLEtBQWVILEtBQUssQ0FBQ3FCLElBQXpCLEVBQStCO0FBQzNCLFdBQUt5Qiw0QkFBTDtBQUNBLFdBQUt6QyxFQUFMLENBQVE4QixJQUFSLENBQWEsS0FBYjtBQUNBLFdBQUtoQyxLQUFMLEdBQWFILEtBQUssQ0FBQ0ksT0FBbkI7QUFDSDtBQUNKOztBQUNEMEMsRUFBQUEsNEJBQTRCLEdBQUc7QUFDM0IsV0FBTyxLQUFLekMsRUFBTCxDQUFRVyxNQUFSLEdBQWlCLENBQWpCLElBQXNCLEtBQUtYLEVBQUwsQ0FBUSxLQUFLQSxFQUFMLENBQVFXLE1BQVIsR0FBaUIsQ0FBekIsRUFBNEJXLElBQTVCLEdBQW1DWCxNQUFuQyxLQUE4QyxDQUEzRSxFQUE4RTtBQUMxRSxXQUFLWCxFQUFMLENBQVEwQyxHQUFSO0FBQ0g7QUFDSjs7QUFDRFQsRUFBQUEsVUFBVSxDQUFDckIsSUFBRCxFQUFPO0FBQ2IsVUFBTXlCLE9BQU8sR0FBR3pCLElBQUksQ0FBQ1UsSUFBTCxFQUFoQjtBQUNBLFVBQU1xQixFQUFFLEdBQUdOLE9BQU8sQ0FBQzFCLE1BQVIsR0FBaUIsQ0FBakIsR0FBcUIwQixPQUFPLENBQUNMLFVBQVIsQ0FBbUIsQ0FBbkIsQ0FBckIsR0FBNkMsQ0FBeEQ7QUFDQSxXQUFPVyxFQUFFLEtBQUs7QUFBRztBQUFWLE9BQTRCQSxFQUFFLEtBQUs7QUFBRztBQUF0QyxPQUFzRGpELFlBQVksQ0FBQ2tELFNBQWIsQ0FBdUJELEVBQXZCLENBQTdEO0FBQ0g7O0FBQ0RkLEVBQUFBLE9BQU8sQ0FBQ2pCLElBQUQsRUFBTztBQUNWLFdBQU9BLElBQUksQ0FBQ0wsT0FBTCxDQUFhLFFBQWIsRUFBdUIsU0FBdkIsQ0FBUDtBQUNIOztBQTlNbUI7O0FBZ054QmpCLE9BQU8sQ0FBQ00saUJBQVIsR0FBNEJBLGlCQUE1QiIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG4vLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IG9zXzEgPSByZXF1aXJlKFwib3NcIik7XHJcbmNvbnN0IGNoYXJhY3RlcnNfMSA9IHJlcXVpcmUoXCIuLi8uLi9sYW5ndWFnZS9jaGFyYWN0ZXJzXCIpO1xyXG52YXIgU3RhdGU7XHJcbihmdW5jdGlvbiAoU3RhdGUpIHtcclxuICAgIFN0YXRlW1N0YXRlW1wiRGVmYXVsdFwiXSA9IDBdID0gXCJEZWZhdWx0XCI7XHJcbiAgICBTdGF0ZVtTdGF0ZVtcIlByZWZvcm1hdHRlZFwiXSA9IDFdID0gXCJQcmVmb3JtYXR0ZWRcIjtcclxuICAgIFN0YXRlW1N0YXRlW1wiQ29kZVwiXSA9IDJdID0gXCJDb2RlXCI7XHJcbn0pKFN0YXRlIHx8IChTdGF0ZSA9IHt9KSk7XHJcbmNsYXNzIFJlc3RUZXh0Q29udmVydGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBTdGF0ZS5EZWZhdWx0O1xyXG4gICAgICAgIHRoaXMubWQgPSBbXTtcclxuICAgIH1cclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpjeWNsb21hdGljLWNvbXBsZXhpdHlcclxuICAgIHRvTWFya2Rvd24oZG9jc3RyaW5nKSB7XHJcbiAgICAgICAgLy8gVHJhbnNsYXRlcyByZVN0cnVjdHJ1cmVkVGV4dCAoUHl0aG9uIGRvYyBzeW50YXgpIHRvIG1hcmtkb3duLlxyXG4gICAgICAgIC8vIEl0IG9ubHkgdHJhbnNsYXRlcyBhcyBtdWNoIGFzIG5lZWRlZCB0byBkaXNwbGF5IHRvb2x0aXBzXHJcbiAgICAgICAgLy8gYW5kIGRvY3VtZW50YXRpb24gaW4gdGhlIGNvbXBsZXRpb24gbGlzdC5cclxuICAgICAgICAvLyBTZWUgaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvUmVTdHJ1Y3R1cmVkVGV4dFxyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMudHJhbnNmb3JtTGluZXMoZG9jc3RyaW5nKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0gU3RhdGUuRGVmYXVsdDtcclxuICAgICAgICB0aGlzLm1kID0gW107XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIGVzY2FwZU1hcmtkb3duKHRleHQpIHtcclxuICAgICAgICAvLyBOb3QgY29tcGxldGUgZXNjYXBlIGxpc3Qgc28gaXQgZG9lcyBub3QgaW50ZXJmZXJlXHJcbiAgICAgICAgLy8gd2l0aCBzdWJzZXF1ZW50IGNvZGUgaGlnaGxpZ2h0aW5nIChzZWUgYWJvdmUpLlxyXG4gICAgICAgIHJldHVybiB0ZXh0XHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXCMvZywgJ1xcXFwjJylcclxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcKi9nLCAnXFxcXConKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXFwgXy9nLCAnIFxcXFxfJylcclxuICAgICAgICAgICAgLnJlcGxhY2UoL15fLywgJ1xcXFxfJyk7XHJcbiAgICB9XHJcbiAgICB0cmFuc2Zvcm1MaW5lcyhkb2NzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBsaW5lcyA9IGRvY3N0cmluZy5zcGxpdCgvXFxyP1xcbi8pO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICAgICAgY29uc3QgbGluZSA9IGxpbmVzW2ldO1xyXG4gICAgICAgICAgICAvLyBBdm9pZCBsZWFkaW5nIGVtcHR5IGxpbmVzXHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1kLmxlbmd0aCA9PT0gMCAmJiBsaW5lLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFN0YXRlLkRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaSArPSB0aGlzLmluRGVmYXVsdFN0YXRlKGxpbmVzLCBpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgU3RhdGUuUHJlZm9ybWF0dGVkOlxyXG4gICAgICAgICAgICAgICAgICAgIGkgKz0gdGhpcy5pblByZWZvcm1hdHRlZFN0YXRlKGxpbmVzLCBpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgU3RhdGUuQ29kZTpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluQ29kZVN0YXRlKGxpbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmVuZENvZGVCbG9jaygpO1xyXG4gICAgICAgIHRoaXMuZW5kUHJlZm9ybWF0dGVkQmxvY2soKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5tZC5qb2luKG9zXzEuRU9MKS50cmltKCk7XHJcbiAgICB9XHJcbiAgICBpbkRlZmF1bHRTdGF0ZShsaW5lcywgaSkge1xyXG4gICAgICAgIGxldCBsaW5lID0gbGluZXNbaV07XHJcbiAgICAgICAgaWYgKGxpbmUuc3RhcnRzV2l0aCgnYGBgJykpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFydENvZGVCbG9jaygpO1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxpbmUuc3RhcnRzV2l0aCgnPT09JykgfHwgbGluZS5zdGFydHNXaXRoKCctLS0nKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gMDsgLy8gRWF0IHN0YW5kYWxvbmUgPT09IG9yIC0tLSBsaW5lcy5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuaGFuZGxlRG91YmxlQ29sb24obGluZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmlzSWdub3JhYmxlKGxpbmUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5oYW5kbGVTZWN0aW9uSGVhZGVyKGxpbmVzLCBpKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gMTsgLy8gRWF0IGxpbmUgd2l0aCA9PT0gb3IgLS0tXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuY2hlY2tQcmVDb250ZW50KGxpbmVzLCBpKTtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZSAhPT0gU3RhdGUuRGVmYXVsdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0OyAvLyBIYW5kbGUgbGluZSBpbiB0aGUgbmV3IHN0YXRlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxpbmUgPSB0aGlzLmNsZWFudXAobGluZSk7XHJcbiAgICAgICAgbGluZSA9IGxpbmUucmVwbGFjZSgvYGAvZywgJ2AnKTsgLy8gQ29udmVydCBkb3VibGUgYmFja3RpY2tzIHRvIHNpbmdsZS5cclxuICAgICAgICBsaW5lID0gdGhpcy5lc2NhcGVNYXJrZG93bihsaW5lKTtcclxuICAgICAgICB0aGlzLm1kLnB1c2gobGluZSk7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbiAgICBpblByZWZvcm1hdHRlZFN0YXRlKGxpbmVzLCBpKSB7XHJcbiAgICAgICAgbGV0IGxpbmUgPSBsaW5lc1tpXTtcclxuICAgICAgICBpZiAodGhpcy5pc0lnbm9yYWJsZShsaW5lKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUHJlZm9ybWF0dGVkIGJsb2NrIHRlcm1pbmF0ZXMgYnkgYSBsaW5lIHdpdGhvdXQgbGVhZGluZyB3aGl0ZXNwYWNlLlxyXG4gICAgICAgIGlmIChsaW5lLmxlbmd0aCA+IDAgJiYgIWNoYXJhY3RlcnNfMS5pc1doaXRlU3BhY2UobGluZS5jaGFyQ29kZUF0KDApKSAmJiAhdGhpcy5pc0xpc3RJdGVtKGxpbmUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kUHJlZm9ybWF0dGVkQmxvY2soKTtcclxuICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBwcmV2TGluZSA9IHRoaXMubWQubGVuZ3RoID4gMCA/IHRoaXMubWRbdGhpcy5tZC5sZW5ndGggLSAxXSA6IHVuZGVmaW5lZDtcclxuICAgICAgICBpZiAobGluZS5sZW5ndGggPT09IDAgJiYgcHJldkxpbmUgJiYgKHByZXZMaW5lLmxlbmd0aCA9PT0gMCB8fCBwcmV2TGluZS5zdGFydHNXaXRoKCdgYGAnKSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7IC8vIEF2b2lkIG1vcmUgdGhhbiBvbmUgZW1wdHkgbGluZSBpbiBhIHJvdy5cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gU2luY2Ugd2UgdXNlIEhUTUwgYmxvY2tzIGFzIHByZWZvcm1hdHRlZCB0ZXh0XHJcbiAgICAgICAgLy8gbWFrZSBzdXJlIHdlIGRyb3AgYW5nbGUgYnJhY2tldHMgc2luY2Ugb3RoZXJ3aXNlXHJcbiAgICAgICAgLy8gdGhleSB3aWxsIHJlbmRlciBhcyB0YWdzIGFuZCBhdHRyaWJ1dGVzXHJcbiAgICAgICAgbGluZSA9IGxpbmUucmVwbGFjZSgvPC9nLCAnICcpLnJlcGxhY2UoLz4vZywgJyAnKTtcclxuICAgICAgICBsaW5lID0gbGluZS5yZXBsYWNlKC9gYC9nLCAnYCcpOyAvLyBDb252ZXJ0IGRvdWJsZSBiYWNrdGlja3MgdG8gc2luZ2xlLlxyXG4gICAgICAgIC8vIEtlZXAgaGFyZCBsaW5lIGJyZWFrcyBmb3IgdGhlIHByZWZvcm1hdHRlZCBjb250ZW50XHJcbiAgICAgICAgdGhpcy5tZC5wdXNoKGAke2xpbmV9ICBgKTtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICAgIGluQ29kZVN0YXRlKGxpbmUpIHtcclxuICAgICAgICBjb25zdCBwcmV2TGluZSA9IHRoaXMubWQubGVuZ3RoID4gMCA/IHRoaXMubWRbdGhpcy5tZC5sZW5ndGggLSAxXSA6IHVuZGVmaW5lZDtcclxuICAgICAgICBpZiAobGluZS5sZW5ndGggPT09IDAgJiYgcHJldkxpbmUgJiYgKHByZXZMaW5lLmxlbmd0aCA9PT0gMCB8fCBwcmV2TGluZS5zdGFydHNXaXRoKCdgYGAnKSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuOyAvLyBBdm9pZCBtb3JlIHRoYW4gb25lIGVtcHR5IGxpbmUgaW4gYSByb3cuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChsaW5lLnN0YXJ0c1dpdGgoJ2BgYCcpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kQ29kZUJsb2NrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm1kLnB1c2gobGluZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaXNJZ25vcmFibGUobGluZSkge1xyXG4gICAgICAgIGlmIChsaW5lLmluZGV4T2YoJ2dlbmVyYXRlZC8nKSA+PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlOyAvLyBEcm9wIGdlbmVyYXRlZCBjb250ZW50LlxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB0cmltbWVkID0gbGluZS50cmltKCk7XHJcbiAgICAgICAgaWYgKHRyaW1tZWQuc3RhcnRzV2l0aCgnLi4nKSAmJiB0cmltbWVkLmluZGV4T2YoJzo6JykgPiAwKSB7XHJcbiAgICAgICAgICAgIC8vIElnbm9yZSBsaW5lcyBsaWtlcyAuLiBzZWN0aW9uYXV0aG9yOjogSm9obiBEb2UuXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBjaGVja1ByZUNvbnRlbnQobGluZXMsIGkpIHtcclxuICAgICAgICBjb25zdCBsaW5lID0gbGluZXNbaV07XHJcbiAgICAgICAgaWYgKGkgPT09IDAgfHwgbGluZS50cmltKCkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWNoYXJhY3RlcnNfMS5pc1doaXRlU3BhY2UobGluZS5jaGFyQ29kZUF0KDApKSAmJiAhdGhpcy5pc0xpc3RJdGVtKGxpbmUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwOyAvLyByZWd1bGFyIGxpbmUsIG5vdGhpbmcgdG8gZG8gaGVyZS5cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gSW5kZW50ZWQgY29udGVudCBpcyBjb25zaWRlcmVkIHRvIGJlIHByZWZvcm1hdHRlZC5cclxuICAgICAgICB0aGlzLnN0YXJ0UHJlZm9ybWF0dGVkQmxvY2soKTtcclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcbiAgICBoYW5kbGVTZWN0aW9uSGVhZGVyKGxpbmVzLCBpKSB7XHJcbiAgICAgICAgY29uc3QgbGluZSA9IGxpbmVzW2ldO1xyXG4gICAgICAgIGlmIChpIDwgbGluZXMubGVuZ3RoIC0gMSAmJiAobGluZXNbaSArIDFdLnN0YXJ0c1dpdGgoJz09PScpKSkge1xyXG4gICAgICAgICAgICAvLyBTZWN0aW9uIHRpdGxlIC0+IGhlYWRpbmcgbGV2ZWwgMy5cclxuICAgICAgICAgICAgdGhpcy5tZC5wdXNoKGAjIyMgJHt0aGlzLmNsZWFudXAobGluZSl9YCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaSA8IGxpbmVzLmxlbmd0aCAtIDEgJiYgKGxpbmVzW2kgKyAxXS5zdGFydHNXaXRoKCctLS0nKSkpIHtcclxuICAgICAgICAgICAgLy8gU3Vic2VjdGlvbiB0aXRsZSAtPiBoZWFkaW5nIGxldmVsIDQuXHJcbiAgICAgICAgICAgIHRoaXMubWQucHVzaChgIyMjIyAke3RoaXMuY2xlYW51cChsaW5lKX1gKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGhhbmRsZURvdWJsZUNvbG9uKGxpbmUpIHtcclxuICAgICAgICBpZiAoIWxpbmUuZW5kc1dpdGgoJzo6JykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBMaXRlcmFsIGJsb2NrcyBiZWdpbiB3aXRoIGA6OmAuIFN1Y2ggYXMgc2VxdWVuY2UgbGlrZVxyXG4gICAgICAgIC8vICcuLi4gYXMgc2hvd24gYmVsb3c6OicgdGhhdCBpcyBmb2xsb3dlZCBieSBhIHByZWZvcm1hdHRlZCB0ZXh0LlxyXG4gICAgICAgIGlmIChsaW5lLmxlbmd0aCA+IDIgJiYgIWxpbmUuc3RhcnRzV2l0aCgnLi4nKSkge1xyXG4gICAgICAgICAgICAvLyBJZ25vcmUgbGluZXMgbGlrZXMgLi4gYXV0b3N1bW1hcnk6OiBKb2huIERvZS5cclxuICAgICAgICAgICAgLy8gVHJpbSB0cmFpbGluZyA6IHNvIDo6IHR1cm5zIGludG8gOi5cclxuICAgICAgICAgICAgdGhpcy5tZC5wdXNoKGxpbmUuc3Vic3RyaW5nKDAsIGxpbmUubGVuZ3RoIC0gMSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0YXJ0UHJlZm9ybWF0dGVkQmxvY2soKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHN0YXJ0UHJlZm9ybWF0dGVkQmxvY2soKSB7XHJcbiAgICAgICAgLy8gUmVtb3ZlIHByZXZpb3VzIGVtcHR5IGxpbmUgc28gd2UgYXZvaWQgZG91YmxlIGVtcHRpZXMuXHJcbiAgICAgICAgdGhpcy50cnlSZW1vdmVQcmVjZWRpbmdFbXB0eUxpbmVzKCk7XHJcbiAgICAgICAgLy8gTGllIGFib3V0IHRoZSBsYW5ndWFnZSBzaW5jZSB3ZSBkb24ndCB3YW50IHByZWZvcm1hdHRlZCB0ZXh0XHJcbiAgICAgICAgLy8gdG8gYmUgY29sb3JpemVkIGFzIFB5dGhvbi4gSFRNTCBpcyBtb3JlICdhcHByb3ByaWF0ZScgYXMgaXQgZG9lc1xyXG4gICAgICAgIC8vIG5vdCBjb2xvcml6ZSAtLSBvciArIG9yIGtleXdvcmRzIGxpa2UgJ2Zyb20nLlxyXG4gICAgICAgIHRoaXMubWQucHVzaCgnYGBgaHRtbCcpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBTdGF0ZS5QcmVmb3JtYXR0ZWQ7XHJcbiAgICB9XHJcbiAgICBlbmRQcmVmb3JtYXR0ZWRCbG9jaygpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PT0gU3RhdGUuUHJlZm9ybWF0dGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMudHJ5UmVtb3ZlUHJlY2VkaW5nRW1wdHlMaW5lcygpO1xyXG4gICAgICAgICAgICB0aGlzLm1kLnB1c2goJ2BgYCcpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gU3RhdGUuRGVmYXVsdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzdGFydENvZGVCbG9jaygpIHtcclxuICAgICAgICAvLyBSZW1vdmUgcHJldmlvdXMgZW1wdHkgbGluZSBzbyB3ZSBhdm9pZCBkb3VibGUgZW1wdGllcy5cclxuICAgICAgICB0aGlzLnRyeVJlbW92ZVByZWNlZGluZ0VtcHR5TGluZXMoKTtcclxuICAgICAgICB0aGlzLm1kLnB1c2goJ2BgYHB5dGhvbicpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBTdGF0ZS5Db2RlO1xyXG4gICAgfVxyXG4gICAgZW5kQ29kZUJsb2NrKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlID09PSBTdGF0ZS5Db2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudHJ5UmVtb3ZlUHJlY2VkaW5nRW1wdHlMaW5lcygpO1xyXG4gICAgICAgICAgICB0aGlzLm1kLnB1c2goJ2BgYCcpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gU3RhdGUuRGVmYXVsdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB0cnlSZW1vdmVQcmVjZWRpbmdFbXB0eUxpbmVzKCkge1xyXG4gICAgICAgIHdoaWxlICh0aGlzLm1kLmxlbmd0aCA+IDAgJiYgdGhpcy5tZFt0aGlzLm1kLmxlbmd0aCAtIDFdLnRyaW0oKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5tZC5wb3AoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpc0xpc3RJdGVtKGxpbmUpIHtcclxuICAgICAgICBjb25zdCB0cmltbWVkID0gbGluZS50cmltKCk7XHJcbiAgICAgICAgY29uc3QgY2ggPSB0cmltbWVkLmxlbmd0aCA+IDAgPyB0cmltbWVkLmNoYXJDb2RlQXQoMCkgOiAwO1xyXG4gICAgICAgIHJldHVybiBjaCA9PT0gNDIgLyogQXN0ZXJpc2sgKi8gfHwgY2ggPT09IDQ1IC8qIEh5cGhlbiAqLyB8fCBjaGFyYWN0ZXJzXzEuaXNEZWNpbWFsKGNoKTtcclxuICAgIH1cclxuICAgIGNsZWFudXAobGluZSkge1xyXG4gICAgICAgIHJldHVybiBsaW5lLnJlcGxhY2UoLzptb2Q6L2csICdtb2R1bGU6Jyk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5SZXN0VGV4dENvbnZlcnRlciA9IFJlc3RUZXh0Q29udmVydGVyO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZXN0VGV4dENvbnZlcnRlci5qcy5tYXAiXX0=