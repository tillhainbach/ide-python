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

var __param = void 0 && (void 0).__param || function (paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const inversify_1 = require("inversify");

const registry_1 = require("../../common/platform/registry");

const contracts_1 = require("../contracts");

let InterpreterComparer = class InterpreterComparer {
  constructor(interpreterHelper) {
    this.interpreterHelper = interpreterHelper;
  }

  compare(a, b) {
    const nameA = this.getSortName(a);
    const nameB = this.getSortName(b);

    if (nameA === nameB) {
      return 0;
    }

    return nameA > nameB ? 1 : -1;
  }

  getSortName(info) {
    const sortNameParts = [];
    const envSuffixParts = []; // Sort order for interpreters is:
    // * Version
    // * Architecture
    // * Interpreter Type
    // * Environment name

    if (info.version_info && info.version_info.length > 0) {
      sortNameParts.push(info.version_info.slice(0, 3).join('.'));
    }

    if (info.architecture) {
      sortNameParts.push(registry_1.getArchitectureDisplayName(info.architecture));
    }

    if (info.companyDisplayName && info.companyDisplayName.length > 0) {
      sortNameParts.push(info.companyDisplayName.trim());
    } else {
      sortNameParts.push('Python');
    }

    if (info.type) {
      const name = this.interpreterHelper.getInterpreterTypeDisplayName(info.type);

      if (name) {
        envSuffixParts.push(name);
      }
    }

    if (info.envName && info.envName.length > 0) {
      envSuffixParts.push(info.envName);
    }

    const envSuffix = envSuffixParts.length === 0 ? '' : `(${envSuffixParts.join(': ')})`;
    return `${sortNameParts.join(' ')} ${envSuffix}`.trim();
  }

};
InterpreterComparer = __decorate([inversify_1.injectable(), __param(0, inversify_1.inject(contracts_1.IInterpreterHelper))], InterpreterComparer);
exports.InterpreterComparer = InterpreterComparer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVycHJldGVyQ29tcGFyZXIuanMiXSwibmFtZXMiOlsiX19kZWNvcmF0ZSIsImRlY29yYXRvcnMiLCJ0YXJnZXQiLCJrZXkiLCJkZXNjIiwiYyIsImFyZ3VtZW50cyIsImxlbmd0aCIsInIiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJkIiwiUmVmbGVjdCIsImRlY29yYXRlIiwiaSIsImRlZmluZVByb3BlcnR5IiwiX19wYXJhbSIsInBhcmFtSW5kZXgiLCJkZWNvcmF0b3IiLCJleHBvcnRzIiwidmFsdWUiLCJpbnZlcnNpZnlfMSIsInJlcXVpcmUiLCJyZWdpc3RyeV8xIiwiY29udHJhY3RzXzEiLCJJbnRlcnByZXRlckNvbXBhcmVyIiwiY29uc3RydWN0b3IiLCJpbnRlcnByZXRlckhlbHBlciIsImNvbXBhcmUiLCJhIiwiYiIsIm5hbWVBIiwiZ2V0U29ydE5hbWUiLCJuYW1lQiIsImluZm8iLCJzb3J0TmFtZVBhcnRzIiwiZW52U3VmZml4UGFydHMiLCJ2ZXJzaW9uX2luZm8iLCJwdXNoIiwic2xpY2UiLCJqb2luIiwiYXJjaGl0ZWN0dXJlIiwiZ2V0QXJjaGl0ZWN0dXJlRGlzcGxheU5hbWUiLCJjb21wYW55RGlzcGxheU5hbWUiLCJ0cmltIiwidHlwZSIsIm5hbWUiLCJnZXRJbnRlcnByZXRlclR5cGVEaXNwbGF5TmFtZSIsImVudk5hbWUiLCJlbnZTdWZmaXgiLCJpbmplY3RhYmxlIiwiaW5qZWN0IiwiSUludGVycHJldGVySGVscGVyIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7O0FBQ0EsSUFBSUEsVUFBVSxHQUFJLFVBQVEsU0FBS0EsVUFBZCxJQUE2QixVQUFVQyxVQUFWLEVBQXNCQyxNQUF0QixFQUE4QkMsR0FBOUIsRUFBbUNDLElBQW5DLEVBQXlDO0FBQ25GLE1BQUlDLENBQUMsR0FBR0MsU0FBUyxDQUFDQyxNQUFsQjtBQUFBLE1BQTBCQyxDQUFDLEdBQUdILENBQUMsR0FBRyxDQUFKLEdBQVFILE1B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QUdTLFNBQVUsRUFBeEMsQ0FBMENMLElBQTFDLEVBQVA7QUFDSDs7QUE1QytDLENBQXBEO0FBOENBbkIsbUJBQW1CLEdBQUd6QixVQUFVLENBQUMsQ0FDN0JxQixXQUFXLENBQUM2QixVQUFaLEVBRDZCLEVBRTdCbEMsT0FBTyxDQUFDLENBQUQsRUFBSUssV0FBVyxDQUFDOEIsTUFBWixDQUFtQjNCLFdBQVcsQ0FBQzRCLGtCQUEvQixDQUFKLENBRnNCLENBQUQsRUFHN0IzQixtQkFINkIsQ0FBaEM7QUFJQU4sT0FBTyxDQUFDTSxtQkFBUixHQUE4QkEsbUJBQTlCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuJ3VzZSBzdHJpY3QnO1xyXG52YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59O1xyXG52YXIgX19wYXJhbSA9ICh0aGlzICYmIHRoaXMuX19wYXJhbSkgfHwgZnVuY3Rpb24gKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgaW52ZXJzaWZ5XzEgPSByZXF1aXJlKFwiaW52ZXJzaWZ5XCIpO1xyXG5jb25zdCByZWdpc3RyeV8xID0gcmVxdWlyZShcIi4uLy4uL2NvbW1vbi9wbGF0Zm9ybS9yZWdpc3RyeVwiKTtcclxuY29uc3QgY29udHJhY3RzXzEgPSByZXF1aXJlKFwiLi4vY29udHJhY3RzXCIpO1xyXG5sZXQgSW50ZXJwcmV0ZXJDb21wYXJlciA9IGNsYXNzIEludGVycHJldGVyQ29tcGFyZXIge1xyXG4gICAgY29uc3RydWN0b3IoaW50ZXJwcmV0ZXJIZWxwZXIpIHtcclxuICAgICAgICB0aGlzLmludGVycHJldGVySGVscGVyID0gaW50ZXJwcmV0ZXJIZWxwZXI7XHJcbiAgICB9XHJcbiAgICBjb21wYXJlKGEsIGIpIHtcclxuICAgICAgICBjb25zdCBuYW1lQSA9IHRoaXMuZ2V0U29ydE5hbWUoYSk7XHJcbiAgICAgICAgY29uc3QgbmFtZUIgPSB0aGlzLmdldFNvcnROYW1lKGIpO1xyXG4gICAgICAgIGlmIChuYW1lQSA9PT0gbmFtZUIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuYW1lQSA+IG5hbWVCID8gMSA6IC0xO1xyXG4gICAgfVxyXG4gICAgZ2V0U29ydE5hbWUoaW5mbykge1xyXG4gICAgICAgIGNvbnN0IHNvcnROYW1lUGFydHMgPSBbXTtcclxuICAgICAgICBjb25zdCBlbnZTdWZmaXhQYXJ0cyA9IFtdO1xyXG4gICAgICAgIC8vIFNvcnQgb3JkZXIgZm9yIGludGVycHJldGVycyBpczpcclxuICAgICAgICAvLyAqIFZlcnNpb25cclxuICAgICAgICAvLyAqIEFyY2hpdGVjdHVyZVxyXG4gICAgICAgIC8vICogSW50ZXJwcmV0ZXIgVHlwZVxyXG4gICAgICAgIC8vICogRW52aXJvbm1lbnQgbmFtZVxyXG4gICAgICAgIGlmIChpbmZvLnZlcnNpb25faW5mbyAmJiBpbmZvLnZlcnNpb25faW5mby5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHNvcnROYW1lUGFydHMucHVzaChpbmZvLnZlcnNpb25faW5mby5zbGljZSgwLCAzKS5qb2luKCcuJykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaW5mby5hcmNoaXRlY3R1cmUpIHtcclxuICAgICAgICAgICAgc29ydE5hbWVQYXJ0cy5wdXNoKHJlZ2lzdHJ5XzEuZ2V0QXJjaGl0ZWN0dXJlRGlzcGxheU5hbWUoaW5mby5hcmNoaXRlY3R1cmUpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGluZm8uY29tcGFueURpc3BsYXlOYW1lICYmIGluZm8uY29tcGFueURpc3BsYXlOYW1lLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgc29ydE5hbWVQYXJ0cy5wdXNoKGluZm8uY29tcGFueURpc3BsYXlOYW1lLnRyaW0oKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBzb3J0TmFtZVBhcnRzLnB1c2goJ1B5dGhvbicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaW5mby50eXBlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmludGVycHJldGVySGVscGVyLmdldEludGVycHJldGVyVHlwZURpc3BsYXlOYW1lKGluZm8udHlwZSk7XHJcbiAgICAgICAgICAgIGlmIChuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBlbnZTdWZmaXhQYXJ0cy5wdXNoKG5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpbmZvLmVudk5hbWUgJiYgaW5mby5lbnZOYW1lLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZW52U3VmZml4UGFydHMucHVzaChpbmZvLmVudk5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBlbnZTdWZmaXggPSBlbnZTdWZmaXhQYXJ0cy5sZW5ndGggPT09IDAgPyAnJyA6XHJcbiAgICAgICAgICAgIGAoJHtlbnZTdWZmaXhQYXJ0cy5qb2luKCc6ICcpfSlgO1xyXG4gICAgICAgIHJldHVybiBgJHtzb3J0TmFtZVBhcnRzLmpvaW4oJyAnKX0gJHtlbnZTdWZmaXh9YC50cmltKCk7XHJcbiAgICB9XHJcbn07XHJcbkludGVycHJldGVyQ29tcGFyZXIgPSBfX2RlY29yYXRlKFtcclxuICAgIGludmVyc2lmeV8xLmluamVjdGFibGUoKSxcclxuICAgIF9fcGFyYW0oMCwgaW52ZXJzaWZ5XzEuaW5qZWN0KGNvbnRyYWN0c18xLklJbnRlcnByZXRlckhlbHBlcikpXHJcbl0sIEludGVycHJldGVyQ29tcGFyZXIpO1xyXG5leHBvcnRzLkludGVycHJldGVyQ29tcGFyZXIgPSBJbnRlcnByZXRlckNvbXBhcmVyO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbnRlcnByZXRlckNvbXBhcmVyLmpzLm1hcCJdfQ==