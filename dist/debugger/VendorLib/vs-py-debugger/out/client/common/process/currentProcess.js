// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
}); // tslint:disable:no-any

const inversify_1 = require("inversify");

let CurrentProcess = class CurrentProcess {
  constructor() {
    this.on = (event, listener) => {
      process.on(event, listener);
      return process;
    };
  }

  get env() {
    return process.env;
  }

  get argv() {
    return process.argv;
  }

  get stdout() {
    return process.stdout;
  }

  get stdin() {
    return process.stdin;
  }

  get execPath() {
    return process.execPath;
  }

};
CurrentProcess = __decorate([inversify_1.injectable()], CurrentProcess);
exports.CurrentProcess = CurrentProcess;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImN1cnJlbnRQcm9jZXNzLmpzIl0sIm5hbWVzIjpbIl9fZGVjb3JhdGUiLCJkZWNvcmF0b3JzIiwidGFyZ2V0Iiwia2V5IiwiZGVzYyIsImMiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJyIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZCIsIlJlZmxlY3QiLCJkZWNvcmF0ZSIsImkiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsImludmVyc2lmeV8xIiwicmVxdWlyZSIsIkN1cnJlbnRQcm9jZXNzIiwiY29uc3RydWN0b3IiLCJvbiIsImV2ZW50IiwibGlzdGVuZXIiLCJwcm9jZXNzIiwiZW52IiwiYXJndiIsInN0ZG91dCIsInN0ZGluIiwiZXhlY1BhdGgiLCJpbmplY3RhYmxlIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7O0FBQ0EsSUFBSUEsVUFBVSxHQUFJLFVBQVEsU0FBS0EsVUFBZCxJQUE2QixVQUFVQyxVQUFWLEVBQXNCQyxNQUF0QixFQUE4QkMsR0FBOUIsRUFBbUNDLElBQW5DLEVBQXlDO0FBQ25GLE1BQUlDLENBQUMsR0FBR0MsU0FBUyxDQUFDQyxNQUFsQjtBQUFBLE1BQTBCQyxDQUFDLEdBQUdILENBQUMsR0FBRyxDQUFKLEdBQVFILE1BQVIsR0FBaUJFLElBQUksS0FBSyxJQUFULEdBQWdCQSxJQUFJLEdBQUdLLE1BQU0sQ0FBQ0Msd0JBQVAsQ0FBZ0NSLE1BQWhDLEVBQXdDQyxHQUF4QyxDQUF2QixHQUFzRUMsSUFBckg7QUFBQSxNQUEySE8sQ0FBM0g7QUFDQSxNQUFJLE9BQU9DLE9BQVAsS0FBbUIsUUFBbkIsSUFBK0IsT0FBT0EsT0FBTyxDQUFDQyxRQUFmLEtBQTRCLFVBQS9ELEVBQTJFTCxDQUFDLEdBQUdJLE9BQU8sQ0FBQ0MsUUFBUixDQUFpQlosVUFBakIsRUFBNkJDLE1BQTdCLEVBQXFDQyxHQUFyQyxFQUEwQ0MsSUFBMUMsQ0FBSixDQUEzRSxLQUNLLEtBQUssSUFBSVUsQ0FBQyxHQUFHYixVQUFVLENBQUNNLE1BQVgsR0FBb0IsQ0FBakMsRUFBb0NPLENBQUMsSUFBSSxDQUF6QyxFQUE0Q0EsQ0FBQyxFQUE3QyxFQUFpRCxJQUFJSCxDQUFDLEdBQUdWLFVBQVUsQ0FBQ2EsQ0FBRCxDQUFsQixFQUF1Qk4sQ0FBQyxHQUFHLENBQUNILENBQUMsR0FBRyxDQUFKLEdBQVFNLENBQUMsQ0FBQ0gsQ0FBRCxDQUFULEdBQWVILENBQUMsR0FBRyxDQUFKLEdBQVFNLENBQUMsQ0FBQ1QsTUFBRCxFQUFTQyxHQUFULEVBQWNLLENBQWQsQ0FBVCxHQUE0QkcsQ0FBQyxDQUFDVCxNQUFELEVBQVNDLEdBQVQsQ0FBN0MsS0FBK0RLLENBQW5FO0FBQzdFLFNBQU9ILENBQUMsR0FBRyxDQUFKLElBQVNHLENBQVQsSUFBY0MsTUFBTSxDQUFDTSxjQUFQLENBQXNCYixNQUF0QixFQUE4QkMsR0FBOUIsRUFBbUNLLENBQW5DLENBQWQsRUFBcURBLENBQTVEO0FBQ0gsQ0FMRDs7QUFNQUMsTUFBTSxDQUFDTSxjQUFQLENBQXNCQyxPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUFFQyxFQUFBQSxLQUFLLEVBQUU7QUFBVCxDQUE3QyxFLENBQ0E7O0FBQ0EsTUFBTUMsV0FBVyxHQUFHQyxPQUFPLENBQUMsV0FBRCxDQUEzQjs7QUFDQSxJQUFJQyxjQUFjLEdBQUcsTUFBTUEsY0FBTixDQUFxQjtBQUN0Q0MsRUFBQUEsV0FBVyxHQUFHO0FBQ1YsU0FBS0MsRUFBTCxHQUFVLENBQUNDLEtBQUQsRUFBUUMsUUFBUixLQUFxQjtBQUMzQkMsTUFBQUEsT0FBTyxDQUFDSCxFQUFSLENBQVdDLEtBQVgsRUFBa0JDLFFBQWxCO0FBQ0EsYUFBT0MsT0FBUDtBQUNILEtBSEQ7QUFJSDs7QUFDRCxNQUFJQyxHQUFKLEdBQVU7QUFDTixXQUFPRCxPQUFPLENBQUNDLEdBQWY7QUFDSDs7QUFDRCxNQUFJQyxJQUFKLEdBQVc7QUFDUCxXQUFPRixPQUFPLENBQUNFLElBQWY7QUFDSDs7QUFDRCxNQUFJQyxNQUFKLEdBQWE7QUFDVCxXQUFPSCxPQUFPLENBQUNHLE1BQWY7QUFDSDs7QUFDRCxNQUFJQyxLQUFKLEdBQVk7QUFDUixXQUFPSixPQUFPLENBQUNJLEtBQWY7QUFDSDs7QUFDRCxNQUFJQyxRQUFKLEdBQWU7QUFDWCxXQUFPTCxPQUFPLENBQUNLLFFBQWY7QUFDSDs7QUFyQnFDLENBQTFDO0FBdUJBVixjQUFjLEdBQUdwQixVQUFVLENBQUMsQ0FDeEJrQixXQUFXLENBQUNhLFVBQVosRUFEd0IsQ0FBRCxFQUV4QlgsY0FGd0IsQ0FBM0I7QUFHQUosT0FBTyxDQUFDSSxjQUFSLEdBQXlCQSxjQUF6QiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcbid1c2Ugc3RyaWN0JztcclxudmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG4vLyB0c2xpbnQ6ZGlzYWJsZTpuby1hbnlcclxuY29uc3QgaW52ZXJzaWZ5XzEgPSByZXF1aXJlKFwiaW52ZXJzaWZ5XCIpO1xyXG5sZXQgQ3VycmVudFByb2Nlc3MgPSBjbGFzcyBDdXJyZW50UHJvY2VzcyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLm9uID0gKGV2ZW50LCBsaXN0ZW5lcikgPT4ge1xyXG4gICAgICAgICAgICBwcm9jZXNzLm9uKGV2ZW50LCBsaXN0ZW5lcik7XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9jZXNzO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBnZXQgZW52KCkge1xyXG4gICAgICAgIHJldHVybiBwcm9jZXNzLmVudjtcclxuICAgIH1cclxuICAgIGdldCBhcmd2KCkge1xyXG4gICAgICAgIHJldHVybiBwcm9jZXNzLmFyZ3Y7XHJcbiAgICB9XHJcbiAgICBnZXQgc3Rkb3V0KCkge1xyXG4gICAgICAgIHJldHVybiBwcm9jZXNzLnN0ZG91dDtcclxuICAgIH1cclxuICAgIGdldCBzdGRpbigpIHtcclxuICAgICAgICByZXR1cm4gcHJvY2Vzcy5zdGRpbjtcclxuICAgIH1cclxuICAgIGdldCBleGVjUGF0aCgpIHtcclxuICAgICAgICByZXR1cm4gcHJvY2Vzcy5leGVjUGF0aDtcclxuICAgIH1cclxufTtcclxuQ3VycmVudFByb2Nlc3MgPSBfX2RlY29yYXRlKFtcclxuICAgIGludmVyc2lmeV8xLmluamVjdGFibGUoKVxyXG5dLCBDdXJyZW50UHJvY2Vzcyk7XHJcbmV4cG9ydHMuQ3VycmVudFByb2Nlc3MgPSBDdXJyZW50UHJvY2VzcztcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y3VycmVudFByb2Nlc3MuanMubWFwIl19