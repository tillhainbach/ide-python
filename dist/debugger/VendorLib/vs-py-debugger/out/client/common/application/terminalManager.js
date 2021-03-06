"use strict"; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const inversify_1 = require("inversify");

const vscode_1 = require("vscode");

let TerminalManager = class TerminalManager {
  get onDidCloseTerminal() {
    return vscode_1.window.onDidCloseTerminal;
  }

  get onDidOpenTerminal() {
    return vscode_1.window.onDidOpenTerminal;
  }

  createTerminal(options) {
    return vscode_1.window.createTerminal(options);
  }

};
TerminalManager = __decorate([inversify_1.injectable()], TerminalManager);
exports.TerminalManager = TerminalManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlcm1pbmFsTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJfX2RlY29yYXRlIiwiZGVjb3JhdG9ycyIsInRhcmdldCIsImtleSIsImRlc2MiLCJjIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiciIsIk9iamVjdCIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImQiLCJSZWZsZWN0IiwiZGVjb3JhdGUiLCJpIiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJpbnZlcnNpZnlfMSIsInJlcXVpcmUiLCJ2c2NvZGVfMSIsIlRlcm1pbmFsTWFuYWdlciIsIm9uRGlkQ2xvc2VUZXJtaW5hbCIsIndpbmRvdyIsIm9uRGlkT3BlblRlcm1pbmFsIiwiY3JlYXRlVGVybWluYWwiLCJvcHRpb25zIiwiaW5qZWN0YWJsZSJdLCJtYXBwaW5ncyI6IkFBQUEsYSxDQUNBO0FBQ0E7O0FBQ0EsSUFBSUEsVUFBVSxHQUFJLFVBQVEsU0FBS0EsVUFBZCxJQUE2QixVQUFVQyxVQUFWLEVBQXNCQyxNQUF0QixFQUE4QkMsR0FBOUIsRUFBbUNDLElBQW5DLEVBQXlDO0FBQ25GLE1BQUlDLENBQUMsR0FBR0MsU0FBUyxDQUFDQyxNQUFsQjtBQUFBLE1BQTBCQyxDQUFDLEdBQUdILENBQUMsR0FBRyxDQUFKLEdBQVFILE1BQVIsR0FBaUJFLElBQUksS0FBSyxJQUFULEdBQWdCQSxJQUFJLEdBQUdLLE1BQU0sQ0FBQ0Msd0JBQVAsQ0FBZ0NSLE1BQWhDLEVBQXdDQyxHQUF4QyxDQUF2QixHQUFzRUMsSUFBckg7QUFBQSxNQUEySE8sQ0FBM0g7QUFDQSxNQUFJLE9BQU9DLE9BQVAsS0FBbUIsUUFBbkIsSUFBK0IsT0FBT0EsT0FBTyxDQUFDQyxRQUFmLEtBQTRCLFVBQS9ELEVBQTJFTCxDQUFDLEdBQUdJLE9BQU8sQ0FBQ0MsUUFBUixDQUFpQlosVUFBakIsRUFBNkJDLE1BQTdCLEVBQXFDQyxHQUFyQyxFQUEwQ0MsSUFBMUMsQ0FBSixDQUEzRSxLQUNLLEtBQUssSUFBSVUsQ0FBQyxHQUFHYixVQUFVLENBQUNNLE1BQVgsR0FBb0IsQ0FBakMsRUFBb0NPLENBQUMsSUFBSSxDQUF6QyxFQUE0Q0EsQ0FBQyxFQUE3QyxFQUFpRCxJQUFJSCxDQUFDLEdBQUdWLFVBQVUsQ0FBQ2EsQ0FBRCxDQUFsQixFQUF1Qk4sQ0FBQyxHQUFHLENBQUNILENBQUMsR0FBRyxDQUFKLEdBQVFNLENBQUMsQ0FBQ0gsQ0FBRCxDQUFULEdBQWVILENBQUMsR0FBRyxDQUFKLEdBQVFNLENBQUMsQ0FBQ1QsTUFBRCxFQUFTQyxHQUFULEVBQWNLLENBQWQsQ0FBVCxHQUE0QkcsQ0FBQyxDQUFDVCxNQUFELEVBQVNDLEdBQVQsQ0FBN0MsS0FBK0RLLENBQW5FO0FBQzdFLFNBQU9ILENBQUMsR0FBRyxDQUFKLElBQVNHLENBQVQsSUFBY0MsTUFBTSxDQUFDTSxjQUFQLENBQXNCYixNQUF0QixFQUE4QkMsR0FBOUIsRUFBbUNLLENBQW5DLENBQWQsRUFBcURBLENBQTVEO0FBQ0gsQ0FMRDs7QUFNQUMsTUFBTSxDQUFDTSxjQUFQLENBQXNCQyxPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUFFQyxFQUFBQSxLQUFLLEVBQUU7QUFBVCxDQUE3Qzs7QUFDQSxNQUFNQyxXQUFXLEdBQUdDLE9BQU8sQ0FBQyxXQUFELENBQTNCOztBQUNBLE1BQU1DLFFBQVEsR0FBR0QsT0FBTyxDQUFDLFFBQUQsQ0FBeEI7O0FBQ0EsSUFBSUUsZUFBZSxHQUFHLE1BQU1BLGVBQU4sQ0FBc0I7QUFDeEMsTUFBSUMsa0JBQUosR0FBeUI7QUFDckIsV0FBT0YsUUFBUSxDQUFDRyxNQUFULENBQWdCRCxrQkFBdkI7QUFDSDs7QUFDRCxNQUFJRSxpQkFBSixHQUF3QjtBQUNwQixXQUFPSixRQUFRLENBQUNHLE1BQVQsQ0FBZ0JDLGlCQUF2QjtBQUNIOztBQUNEQyxFQUFBQSxjQUFjLENBQUNDLE9BQUQsRUFBVTtBQUNwQixXQUFPTixRQUFRLENBQUNHLE1BQVQsQ0FBZ0JFLGNBQWhCLENBQStCQyxPQUEvQixDQUFQO0FBQ0g7O0FBVHVDLENBQTVDO0FBV0FMLGVBQWUsR0FBR3JCLFVBQVUsQ0FBQyxDQUN6QmtCLFdBQVcsQ0FBQ1MsVUFBWixFQUR5QixDQUFELEVBRXpCTixlQUZ5QixDQUE1QjtBQUdBTCxPQUFPLENBQUNLLGVBQVIsR0FBMEJBLGVBQTFCIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcbnZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgaW52ZXJzaWZ5XzEgPSByZXF1aXJlKFwiaW52ZXJzaWZ5XCIpO1xyXG5jb25zdCB2c2NvZGVfMSA9IHJlcXVpcmUoXCJ2c2NvZGVcIik7XHJcbmxldCBUZXJtaW5hbE1hbmFnZXIgPSBjbGFzcyBUZXJtaW5hbE1hbmFnZXIge1xyXG4gICAgZ2V0IG9uRGlkQ2xvc2VUZXJtaW5hbCgpIHtcclxuICAgICAgICByZXR1cm4gdnNjb2RlXzEud2luZG93Lm9uRGlkQ2xvc2VUZXJtaW5hbDtcclxuICAgIH1cclxuICAgIGdldCBvbkRpZE9wZW5UZXJtaW5hbCgpIHtcclxuICAgICAgICByZXR1cm4gdnNjb2RlXzEud2luZG93Lm9uRGlkT3BlblRlcm1pbmFsO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlVGVybWluYWwob3B0aW9ucykge1xyXG4gICAgICAgIHJldHVybiB2c2NvZGVfMS53aW5kb3cuY3JlYXRlVGVybWluYWwob3B0aW9ucyk7XHJcbiAgICB9XHJcbn07XHJcblRlcm1pbmFsTWFuYWdlciA9IF9fZGVjb3JhdGUoW1xyXG4gICAgaW52ZXJzaWZ5XzEuaW5qZWN0YWJsZSgpXHJcbl0sIFRlcm1pbmFsTWFuYWdlcik7XHJcbmV4cG9ydHMuVGVybWluYWxNYW5hZ2VyID0gVGVybWluYWxNYW5hZ2VyO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD10ZXJtaW5hbE1hbmFnZXIuanMubWFwIl19