"use strict"; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const inversify_1 = require("inversify");

const path = require("path");

const types_1 = require("../../platform/types");

const types_2 = require("../../types");

let BaseActivationCommandProvider = class BaseActivationCommandProvider {
  constructor(serviceContainer) {
    this.serviceContainer = serviceContainer;
  }

  getActivationCommands(resource, targetShell) {
    const pythonPath = this.serviceContainer.get(types_2.IConfigurationService).getSettings(resource).pythonPath;
    return this.getActivationCommandsForInterpreter(pythonPath, targetShell);
  }

  findScriptFile(pythonPath, scriptFileNames) {
    return __awaiter(this, void 0, void 0, function* () {
      const fs = this.serviceContainer.get(types_1.IFileSystem);

      for (const scriptFileName of scriptFileNames) {
        // Generate scripts are found in the same directory as the interpreter.
        const scriptFile = path.join(path.dirname(pythonPath), scriptFileName);
        const found = yield fs.fileExists(scriptFile);

        if (found) {
          return scriptFile;
        }
      }
    });
  }

};
BaseActivationCommandProvider = __decorate([inversify_1.injectable()], BaseActivationCommandProvider);
exports.BaseActivationCommandProvider = BaseActivationCommandProvider;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhc2VBY3RpdmF0aW9uUHJvdmlkZXIuanMiXSwibmFtZXMiOlsiX19kZWNvcmF0ZSIsImRlY29yYXRvcnMiLCJ0YXJnZXQiLCJrZXkiLCJkZXNjIiwiYyIsImFyZ3VtZW50cyIsImxlbmd0aCIsInIiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJkIiwiUmVmbGVjdCIsImRlY29yYXRlIiwiaSIsImRlZmluZVByb3BlcnR5IiwiX19hd2FpdGVyIiwidGhpc0FyZyIsIl9hcmd1bWVudHMiLCJQIiwiZ2VuZXJhdG9yIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJmdWxmaWxsZWQiLCJ2YWx1ZSIsInN0ZXAiLCJuZXh0IiwiZSIsInJlamVjdGVkIiwicmVzdWx0IiwiZG9uZSIsInRoZW4iLCJhcHBseSIsImV4cG9ydHMiLCJpbnZlcnNpZnlfMSIsInJlcXVpcmUiLCJwYXRoIiwidHlwZXNfMSIsInR5cGVzXzIiLCJCYXNlQWN0aXZhdGlvbkNvbW1hbmRQcm92aWRlciIsImNvbnN0cnVjdG9yIiwic2VydmljZUNvbnRhaW5lciIsImdldEFjdGl2YXRpb25Db21tYW5kcyIsInJlc291cmNlIiwidGFyZ2V0U2hlbGwiLCJweXRob25QYXRoIiwiZ2V0IiwiSUNvbmZpZ3VyYXRpb25TZXJ2aWNlIiwiZ2V0U2V0dGluZ3MiLCJnZXRBY3RpdmF0aW9uQ29tbWFuZHNGb3JJbnRlcnByZXRlciIsImZpbmRTY3JpcHRGaWxlIiwic2NyaXB0RmlsZU5hbWVzIiwiZnMiLCJJRmlsZVN5c3RlbSIsInNjcmlwdEZpbGVOYW1lIiwic2NyaXB0RmlsZSIsImpvaW4iLCJkaXJuYW1lIiwiZm91bmQiLCJmaWxlRXhpc3RzIiwiaW5qZWN0YWJsZSJdLCJtYXBwaW5ncyI6IkFBQUEsYSxDQUNBO0FBQ0E7O0FBQ0EsSUFBSUEsVUFBVSxHQUFJLFVBQVEsU0FBS0EsVUFBZCxJQUE2QixVQUFVQyxVQUFWLEVBQXNCQyxNQUF0QixFQUE4QkMsR0FBOUIsRUFB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QixPQUFMLENBQWFaLFVBQWIsQ0FBVixFQUFvQ1MsY0FBcEMsQ0FBbkI7QUFDQSxjQUFNSSxLQUFLLEdBQUcsTUFBTU4sRUFBRSxDQUFDTyxVQUFILENBQWNKLFVBQWQsQ0FBcEI7O0FBQ0EsWUFBSUcsS0FBSixFQUFXO0FBQ1AsaUJBQU9ILFVBQVA7QUFDSDtBQUNKO0FBQ0osS0FWZSxDQUFoQjtBQVdIOztBQXBCbUUsQ0FBeEU7QUFzQkFoQiw2QkFBNkIsR0FBR3hDLFVBQVUsQ0FBQyxDQUN2Q21DLFdBQVcsQ0FBQzBCLFVBQVosRUFEdUMsQ0FBRCxFQUV2Q3JCLDZCQUZ1QyxDQUExQztBQUdBTixPQUFPLENBQUNNLDZCQUFSLEdBQXdDQSw2QkFBeEMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxudmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufTtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBpbnZlcnNpZnlfMSA9IHJlcXVpcmUoXCJpbnZlcnNpZnlcIik7XHJcbmNvbnN0IHBhdGggPSByZXF1aXJlKFwicGF0aFwiKTtcclxuY29uc3QgdHlwZXNfMSA9IHJlcXVpcmUoXCIuLi8uLi9wbGF0Zm9ybS90eXBlc1wiKTtcclxuY29uc3QgdHlwZXNfMiA9IHJlcXVpcmUoXCIuLi8uLi90eXBlc1wiKTtcclxubGV0IEJhc2VBY3RpdmF0aW9uQ29tbWFuZFByb3ZpZGVyID0gY2xhc3MgQmFzZUFjdGl2YXRpb25Db21tYW5kUHJvdmlkZXIge1xyXG4gICAgY29uc3RydWN0b3Ioc2VydmljZUNvbnRhaW5lcikge1xyXG4gICAgICAgIHRoaXMuc2VydmljZUNvbnRhaW5lciA9IHNlcnZpY2VDb250YWluZXI7XHJcbiAgICB9XHJcbiAgICBnZXRBY3RpdmF0aW9uQ29tbWFuZHMocmVzb3VyY2UsIHRhcmdldFNoZWxsKSB7XHJcbiAgICAgICAgY29uc3QgcHl0aG9uUGF0aCA9IHRoaXMuc2VydmljZUNvbnRhaW5lci5nZXQodHlwZXNfMi5JQ29uZmlndXJhdGlvblNlcnZpY2UpLmdldFNldHRpbmdzKHJlc291cmNlKS5weXRob25QYXRoO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEFjdGl2YXRpb25Db21tYW5kc0ZvckludGVycHJldGVyKHB5dGhvblBhdGgsIHRhcmdldFNoZWxsKTtcclxuICAgIH1cclxuICAgIGZpbmRTY3JpcHRGaWxlKHB5dGhvblBhdGgsIHNjcmlwdEZpbGVOYW1lcykge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZzID0gdGhpcy5zZXJ2aWNlQ29udGFpbmVyLmdldCh0eXBlc18xLklGaWxlU3lzdGVtKTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBzY3JpcHRGaWxlTmFtZSBvZiBzY3JpcHRGaWxlTmFtZXMpIHtcclxuICAgICAgICAgICAgICAgIC8vIEdlbmVyYXRlIHNjcmlwdHMgYXJlIGZvdW5kIGluIHRoZSBzYW1lIGRpcmVjdG9yeSBhcyB0aGUgaW50ZXJwcmV0ZXIuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBzY3JpcHRGaWxlID0gcGF0aC5qb2luKHBhdGguZGlybmFtZShweXRob25QYXRoKSwgc2NyaXB0RmlsZU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZm91bmQgPSB5aWVsZCBmcy5maWxlRXhpc3RzKHNjcmlwdEZpbGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGZvdW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNjcmlwdEZpbGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuQmFzZUFjdGl2YXRpb25Db21tYW5kUHJvdmlkZXIgPSBfX2RlY29yYXRlKFtcclxuICAgIGludmVyc2lmeV8xLmluamVjdGFibGUoKVxyXG5dLCBCYXNlQWN0aXZhdGlvbkNvbW1hbmRQcm92aWRlcik7XHJcbmV4cG9ydHMuQmFzZUFjdGl2YXRpb25Db21tYW5kUHJvdmlkZXIgPSBCYXNlQWN0aXZhdGlvbkNvbW1hbmRQcm92aWRlcjtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YmFzZUFjdGl2YXRpb25Qcm92aWRlci5qcy5tYXAiXX0=