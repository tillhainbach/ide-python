"use strict";

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __param = void 0 && (void 0).__param || function (paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const inversify_1 = require("inversify");

const path = require("path");

const types_1 = require("../../common/platform/types");

const util_1 = require("../../common/util");

const fs_1 = require("../../common/utils/fs");

const types_2 = require("../../ioc/types");

const contracts_1 = require("../contracts");

const CheckPythonInterpreterRegEx = util_1.IS_WINDOWS ? /^python(\d+(.\d+)?)?\.exe$/ : /^python(\d+(.\d+)?)?$/;

function lookForInterpretersInDirectory(pathToCheck) {
  return fs_1.fsReaddirAsync(pathToCheck).then(subDirs => subDirs.filter(fileName => CheckPythonInterpreterRegEx.test(path.basename(fileName)))).catch(err => {
    console.error('Python Extension (lookForInterpretersInDirectory.fsReaddirAsync):', err);
    return [];
  });
}

exports.lookForInterpretersInDirectory = lookForInterpretersInDirectory;
let InterpreterLocatorHelper = class InterpreterLocatorHelper {
  constructor(serviceContainer) {
    this.fs = serviceContainer.get(types_1.IFileSystem);
  }

  mergeInterpreters(interpreters) {
    return interpreters.map(item => {
      return Object.assign({}, item);
    }).map(item => {
      item.path = path.normalize(item.path);
      return item;
    }).reduce((accumulator, current) => {
      const currentVersion = Array.isArray(current.version_info) ? current.version_info.join('.') : undefined;
      const existingItem = accumulator.find(item => {
        // If same version and same base path, then ignore.
        // Could be Python 3.6 with path = python.exe, and Python 3.6 and path = python3.exe.
        if (Array.isArray(item.version_info) && item.version_info.join('.') === currentVersion && item.path && current.path && this.fs.arePathsSame(path.dirname(item.path), path.dirname(current.path))) {
          return true;
        }

        return false;
      });

      if (!existingItem) {
        accumulator.push(current);
      } else {
        // Preserve type information.
        // Possible we identified environment as unknown, but a later provider has identified env type.
        if (existingItem.type === contracts_1.InterpreterType.Unknown && current.type !== contracts_1.InterpreterType.Unknown) {
          existingItem.type = current.type;
        }

        const props = ['envName', 'envPath', 'path', 'sysPrefix', 'architecture', 'sysVersion', 'version', 'version_info'];

        for (const prop of props) {
          if (!existingItem[prop] && current[prop]) {
            existingItem[prop] = current[prop];
          }
        }
      }

      return accumulator;
    }, []);
  }

};
InterpreterLocatorHelper = __decorate([inversify_1.injectable(), __param(0, inversify_1.inject(types_2.IServiceContainer))], InterpreterLocatorHelper);
exports.InterpreterLocatorHelper = InterpreterLocatorHelper;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlbHBlcnMuanMiXSwibmFtZXMiOlsiX19kZWNvcmF0ZSIsImRlY29yYXRvcnMiLCJ0YXJnZXQiLCJrZXkiLCJkZXNjIiwiYyIsImFyZ3VtZW50cyIsImxlbmd0aCIsInIiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJkIiwiUmVmbGVjdCIsImRlY29yYXRlIiwiaSIsImRlZmluZVByb3BlcnR5IiwiX19wYXJhbSIsInBhcmFtSW5kZXgiLCJkZWNvcmF0b3IiLCJleHBvcnRzIiwidmFsdWUiLCJpbnZlcnNpZnlfMSIsInJlcXVpcmUiLCJwYXRoIiwidHlwZXNfMSIsInV0aWxfMSIsImZzXzEiLCJ0eXBlc18yIiwiY29udHJhY3RzXzEiLCJDaGVja1B5dGhvbkludGVycHJldGVyUmVnRXgiLCJJU19XSU5ET1dTIiwibG9va0ZvckludGVycHJldGVyc0luRGlyZWN0b3J5IiwicGF0aFRvQ2hlY2siLCJmc1JlYWRkaXJBc3luYyIsInRoZW4iLCJzdWJEaXJzIiwiZmlsdGVyIiwiZmlsZU5hbWUiLCJ0ZXN0IiwiYmFzZW5hbWUiLCJjYXRjaCIsImVyciIsImNvbnNvbGUiLCJlcnJvciIsIkludGVycHJldGVyTG9jYXRvckhlbHBlciIsImNvbnN0cnVjdG9yIiwic2VydmljZUNvbnRhaW5lciIsImZzIiwiZ2V0IiwiSUZpbGVTeXN0ZW0iLCJtZXJnZUludGVycHJldGVycyIsImludGVycHJldGVycyIsIm1hcCIsIml0ZW0iLCJhc3NpZ24iLCJub3JtYWxpemUiLCJyZWR1Y2UiLCJhY2N1bXVsYXRvciIsImN1cnJlbnQiLCJjdXJyZW50VmVyc2lvbiIsIkFycmF5IiwiaXNBcnJheSIsInZlcnNpb25faW5mbyIsImpvaW4iLCJ1bmRlZmluZWQiLCJleGlzdGluZ0l0ZW0iLCJmaW5kIiwiYXJlUGF0aHNTYW1lIiwiZGlybmFtZSIsInB1c2giLCJ0eXBlIiwiSW50ZXJwcmV0ZXJUeXBlIiwiVW5rbm93biIsInByb3BzIiwicHJvcCIsImluamVj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Q0FBWixHQUFxQmhCLE9BQU8sQ0FBQ2dCLElBQUQsQ0FBNUI7QUFDSDtBQUNKO0FBQ0o7O0FBQ0QsYUFBT2pCLFdBQVA7QUFDSCxLQWpDTSxFQWlDSixFQWpDSSxDQUFQO0FBa0NIOztBQXZDeUQsQ0FBOUQ7QUF5Q0FiLHdCQUF3QixHQUFHNUMsVUFBVSxDQUFDLENBQ2xDcUIsV0FBVyxDQUFDc0QsVUFBWixFQURrQyxFQUVsQzNELE9BQU8sQ0FBQyxDQUFELEVBQUlLLFdBQVcsQ0FBQ3VELE1BQVosQ0FBbUJqRCxPQUFPLENBQUNrRCxpQkFBM0IsQ0FBSixDQUYyQixDQUFELEVBR2xDakMsd0JBSGtDLENBQXJDO0FBSUF6QixPQUFPLENBQUN5Qix3QkFBUixHQUFtQ0Esd0JBQW5DIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn07XHJcbnZhciBfX3BhcmFtID0gKHRoaXMgJiYgdGhpcy5fX3BhcmFtKSB8fCBmdW5jdGlvbiAocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBpbnZlcnNpZnlfMSA9IHJlcXVpcmUoXCJpbnZlcnNpZnlcIik7XHJcbmNvbnN0IHBhdGggPSByZXF1aXJlKFwicGF0aFwiKTtcclxuY29uc3QgdHlwZXNfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21tb24vcGxhdGZvcm0vdHlwZXNcIik7XHJcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21tb24vdXRpbFwiKTtcclxuY29uc3QgZnNfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21tb24vdXRpbHMvZnNcIik7XHJcbmNvbnN0IHR5cGVzXzIgPSByZXF1aXJlKFwiLi4vLi4vaW9jL3R5cGVzXCIpO1xyXG5jb25zdCBjb250cmFjdHNfMSA9IHJlcXVpcmUoXCIuLi9jb250cmFjdHNcIik7XHJcbmNvbnN0IENoZWNrUHl0aG9uSW50ZXJwcmV0ZXJSZWdFeCA9IHV0aWxfMS5JU19XSU5ET1dTID8gL15weXRob24oXFxkKyguXFxkKyk/KT9cXC5leGUkLyA6IC9ecHl0aG9uKFxcZCsoLlxcZCspPyk/JC87XHJcbmZ1bmN0aW9uIGxvb2tGb3JJbnRlcnByZXRlcnNJbkRpcmVjdG9yeShwYXRoVG9DaGVjaykge1xyXG4gICAgcmV0dXJuIGZzXzEuZnNSZWFkZGlyQXN5bmMocGF0aFRvQ2hlY2spXHJcbiAgICAgICAgLnRoZW4oc3ViRGlycyA9PiBzdWJEaXJzLmZpbHRlcihmaWxlTmFtZSA9PiBDaGVja1B5dGhvbkludGVycHJldGVyUmVnRXgudGVzdChwYXRoLmJhc2VuYW1lKGZpbGVOYW1lKSkpKVxyXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1B5dGhvbiBFeHRlbnNpb24gKGxvb2tGb3JJbnRlcnByZXRlcnNJbkRpcmVjdG9yeS5mc1JlYWRkaXJBc3luYyk6JywgZXJyKTtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLmxvb2tGb3JJbnRlcnByZXRlcnNJbkRpcmVjdG9yeSA9IGxvb2tGb3JJbnRlcnByZXRlcnNJbkRpcmVjdG9yeTtcclxubGV0IEludGVycHJldGVyTG9jYXRvckhlbHBlciA9IGNsYXNzIEludGVycHJldGVyTG9jYXRvckhlbHBlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihzZXJ2aWNlQ29udGFpbmVyKSB7XHJcbiAgICAgICAgdGhpcy5mcyA9IHNlcnZpY2VDb250YWluZXIuZ2V0KHR5cGVzXzEuSUZpbGVTeXN0ZW0pO1xyXG4gICAgfVxyXG4gICAgbWVyZ2VJbnRlcnByZXRlcnMoaW50ZXJwcmV0ZXJzKSB7XHJcbiAgICAgICAgcmV0dXJuIGludGVycHJldGVyc1xyXG4gICAgICAgICAgICAubWFwKGl0ZW0gPT4geyByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgaXRlbSk7IH0pXHJcbiAgICAgICAgICAgIC5tYXAoaXRlbSA9PiB7IGl0ZW0ucGF0aCA9IHBhdGgubm9ybWFsaXplKGl0ZW0ucGF0aCk7IHJldHVybiBpdGVtOyB9KVxyXG4gICAgICAgICAgICAucmVkdWNlKChhY2N1bXVsYXRvciwgY3VycmVudCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VmVyc2lvbiA9IEFycmF5LmlzQXJyYXkoY3VycmVudC52ZXJzaW9uX2luZm8pID8gY3VycmVudC52ZXJzaW9uX2luZm8uam9pbignLicpIDogdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBjb25zdCBleGlzdGluZ0l0ZW0gPSBhY2N1bXVsYXRvci5maW5kKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gSWYgc2FtZSB2ZXJzaW9uIGFuZCBzYW1lIGJhc2UgcGF0aCwgdGhlbiBpZ25vcmUuXHJcbiAgICAgICAgICAgICAgICAvLyBDb3VsZCBiZSBQeXRob24gMy42IHdpdGggcGF0aCA9IHB5dGhvbi5leGUsIGFuZCBQeXRob24gMy42IGFuZCBwYXRoID0gcHl0aG9uMy5leGUuXHJcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShpdGVtLnZlcnNpb25faW5mbykgJiYgaXRlbS52ZXJzaW9uX2luZm8uam9pbignLicpID09PSBjdXJyZW50VmVyc2lvbiAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ucGF0aCAmJiBjdXJyZW50LnBhdGggJiZcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZzLmFyZVBhdGhzU2FtZShwYXRoLmRpcm5hbWUoaXRlbS5wYXRoKSwgcGF0aC5kaXJuYW1lKGN1cnJlbnQucGF0aCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoIWV4aXN0aW5nSXRlbSkge1xyXG4gICAgICAgICAgICAgICAgYWNjdW11bGF0b3IucHVzaChjdXJyZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIFByZXNlcnZlIHR5cGUgaW5mb3JtYXRpb24uXHJcbiAgICAgICAgICAgICAgICAvLyBQb3NzaWJsZSB3ZSBpZGVudGlmaWVkIGVudmlyb25tZW50IGFzIHVua25vd24sIGJ1dCBhIGxhdGVyIHByb3ZpZGVyIGhhcyBpZGVudGlmaWVkIGVudiB0eXBlLlxyXG4gICAgICAgICAgICAgICAgaWYgKGV4aXN0aW5nSXRlbS50eXBlID09PSBjb250cmFjdHNfMS5JbnRlcnByZXRlclR5cGUuVW5rbm93biAmJiBjdXJyZW50LnR5cGUgIT09IGNvbnRyYWN0c18xLkludGVycHJldGVyVHlwZS5Vbmtub3duKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmdJdGVtLnR5cGUgPSBjdXJyZW50LnR5cGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9wcyA9IFsnZW52TmFtZScsICdlbnZQYXRoJywgJ3BhdGgnLCAnc3lzUHJlZml4JyxcclxuICAgICAgICAgICAgICAgICAgICAnYXJjaGl0ZWN0dXJlJywgJ3N5c1ZlcnNpb24nLCAndmVyc2lvbicsICd2ZXJzaW9uX2luZm8nXTtcclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcHJvcCBvZiBwcm9wcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZXhpc3RpbmdJdGVtW3Byb3BdICYmIGN1cnJlbnRbcHJvcF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmdJdGVtW3Byb3BdID0gY3VycmVudFtwcm9wXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGFjY3VtdWxhdG9yO1xyXG4gICAgICAgIH0sIFtdKTtcclxuICAgIH1cclxufTtcclxuSW50ZXJwcmV0ZXJMb2NhdG9ySGVscGVyID0gX19kZWNvcmF0ZShbXHJcbiAgICBpbnZlcnNpZnlfMS5pbmplY3RhYmxlKCksXHJcbiAgICBfX3BhcmFtKDAsIGludmVyc2lmeV8xLmluamVjdCh0eXBlc18yLklTZXJ2aWNlQ29udGFpbmVyKSlcclxuXSwgSW50ZXJwcmV0ZXJMb2NhdG9ySGVscGVyKTtcclxuZXhwb3J0cy5JbnRlcnByZXRlckxvY2F0b3JIZWxwZXIgPSBJbnRlcnByZXRlckxvY2F0b3JIZWxwZXI7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWhlbHBlcnMuanMubWFwIl19