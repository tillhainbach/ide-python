"use strict"; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

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

const types_1 = require("../../ioc/types");

const types_2 = require("../application/types");

const types_3 = require("../process/types");

const moduleInstaller_1 = require("./moduleInstaller");

let PipInstaller = class PipInstaller extends moduleInstaller_1.ModuleInstaller {
  constructor(serviceContainer) {
    super(serviceContainer);
  }

  get displayName() {
    return 'Pip';
  }

  get priority() {
    return 0;
  }

  isSupported(resource) {
    return this.isPipAvailable(resource);
  }

  getExecutionInfo(moduleName, resource) {
    return __awaiter(this, void 0, void 0, function* () {
      const proxyArgs = [];
      const workspaceService = this.serviceContainer.get(types_2.IWorkspaceService);
      const proxy = workspaceService.getConfiguration('http').get('proxy', '');

      if (proxy.length > 0) {
        proxyArgs.push('--proxy');
        proxyArgs.push(proxy);
      }

      return {
        args: [...proxyArgs, 'install', '-U', moduleName],
        moduleName: 'pip'
      };
    });
  }

  isPipAvailable(resource) {
    const pythonExecutionFactory = this.serviceContainer.get(types_3.IPythonExecutionFactory);
    return pythonExecutionFactory.create({
      resource
    }).then(proc => proc.isModuleInstalled('pip')).catch(() => false);
  }

};
PipInstaller = __decorate([inversify_1.injectable(), __param(0, inversify_1.inject(types_1.IServiceContainer))], PipInstaller);
exports.PipInstaller = PipInstaller;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBpcEluc3RhbGxlci5qcyJdLCJuYW1lcyI6WyJfX2RlY29yYXRlIiwiZGVjb3JhdG9ycyIsInRhcmdldCIsImtleSIsImRlc2MiLCJjIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiciIsIk9iamVjdCIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImQiLCJSZWZsZWN0IiwiZGVjb3JhdGUiLCJpIiwiZGVmaW5lUHJvcGVydHkiLCJfX3BhcmFtIiwicGFyYW1JbmRleCIsImRlY29yYXRvciIsIl9fYXdhaXRlciIsInRoaXNBcmciLCJfYXJndW1lbnRzIiwiUCIsImdlbmVyYXRvciIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZnVsZmlsbGVkIiwidmFsdWUiLCJzdGVwIiwibmV4dCIsImUiLCJyZWplY3RlZCIsInJlc3VsdCIsImRvbmUiLCJ0aGVuIiwiYXBwbHkiLCJleHBvcnRzIiwiaW52ZXJzaWZ5XzEiLCJyZXF1aXJlIiwidHlwZXNfMSIsInR5cGVzXzIiLCJ0eXBlc18zIiwibW9kdWxlSW5zdGFsbGVyXzEiLCJQaXBJbnN0YWxsZXIiLCJNb2R1bGVJbnN0YWxsZXIiLCJjb25zdHJ1Y3RvciIsInNlcnZpY2VDb250YWluZXIiLCJkaXNwbGF5TmFtZSIsInByaW9yaXR5IiwiaXNTdXBwb3J0ZWQiLCJyZXNvdXJjZSIsImlzUGlwQXZhaWxhYmxlIiwiZ2V0RXhlY3V0aW9uSW5mbyIsIm1vZHVsZU5hbWUiLCJwcm94eUFyZ3MiLCJ3b3Jrc3BhY2VTZXJ2aWNlIiwiZ2V0IiwiSVdvcmtzcGFjZVNlcnZpY2UiLCJwcm94eSIsImdldENvbmZpZ3VyYXRpb24iLCJwdXNoIiwiYXJncyIsInB5dGhvbkV4ZWN1dGlvbkZhY3RvcnkiLCJJUHl0aG9uRXhlY3V0aW9uRmFjdG9yeSIsImNyZWF0ZSIsInByb2MiLCJpc01vZHVsZUluc3RhbGxlZCIsImNhdGNoIiwiaW5qZWN0YWJsZSIsImluamVjdCIsIklTZXJ2aWNlQ29udGFpbmVyIl0sIm1hcHBpbmdz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QVksR0FBRzVDLFVBQVUsQ0FBQyxDQUN0QnNDLFdBQVcsQ0FBQytCLFVBQVosRUFEc0IsRUFFdEJyRCxPQUFPLENBQUMsQ0FBRCxFQUFJc0IsV0FBVyxDQUFDZ0MsTUFBWixDQUFtQjlCLE9BQU8sQ0FBQytCLGlCQUEzQixDQUFKLENBRmUsQ0FBRCxFQUd0QjNCLFlBSHNCLENBQXpCO0FBSUFQLE9BQU8sQ0FBQ08sWUFBUixHQUF1QkEsWUFBdkIiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxudmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufTtcclxudmFyIF9fcGFyYW0gPSAodGhpcyAmJiB0aGlzLl9fcGFyYW0pIHx8IGZ1bmN0aW9uIChwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59O1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IGludmVyc2lmeV8xID0gcmVxdWlyZShcImludmVyc2lmeVwiKTtcclxuY29uc3QgdHlwZXNfMSA9IHJlcXVpcmUoXCIuLi8uLi9pb2MvdHlwZXNcIik7XHJcbmNvbnN0IHR5cGVzXzIgPSByZXF1aXJlKFwiLi4vYXBwbGljYXRpb24vdHlwZXNcIik7XHJcbmNvbnN0IHR5cGVzXzMgPSByZXF1aXJlKFwiLi4vcHJvY2Vzcy90eXBlc1wiKTtcclxuY29uc3QgbW9kdWxlSW5zdGFsbGVyXzEgPSByZXF1aXJlKFwiLi9tb2R1bGVJbnN0YWxsZXJcIik7XHJcbmxldCBQaXBJbnN0YWxsZXIgPSBjbGFzcyBQaXBJbnN0YWxsZXIgZXh0ZW5kcyBtb2R1bGVJbnN0YWxsZXJfMS5Nb2R1bGVJbnN0YWxsZXIge1xyXG4gICAgY29uc3RydWN0b3Ioc2VydmljZUNvbnRhaW5lcikge1xyXG4gICAgICAgIHN1cGVyKHNlcnZpY2VDb250YWluZXIpO1xyXG4gICAgfVxyXG4gICAgZ2V0IGRpc3BsYXlOYW1lKCkge1xyXG4gICAgICAgIHJldHVybiAnUGlwJztcclxuICAgIH1cclxuICAgIGdldCBwcmlvcml0eSgpIHtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICAgIGlzU3VwcG9ydGVkKHJlc291cmNlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNQaXBBdmFpbGFibGUocmVzb3VyY2UpO1xyXG4gICAgfVxyXG4gICAgZ2V0RXhlY3V0aW9uSW5mbyhtb2R1bGVOYW1lLCByZXNvdXJjZSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb3h5QXJncyA9IFtdO1xyXG4gICAgICAgICAgICBjb25zdCB3b3Jrc3BhY2VTZXJ2aWNlID0gdGhpcy5zZXJ2aWNlQ29udGFpbmVyLmdldCh0eXBlc18yLklXb3Jrc3BhY2VTZXJ2aWNlKTtcclxuICAgICAgICAgICAgY29uc3QgcHJveHkgPSB3b3Jrc3BhY2VTZXJ2aWNlLmdldENvbmZpZ3VyYXRpb24oJ2h0dHAnKS5nZXQoJ3Byb3h5JywgJycpO1xyXG4gICAgICAgICAgICBpZiAocHJveHkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcHJveHlBcmdzLnB1c2goJy0tcHJveHknKTtcclxuICAgICAgICAgICAgICAgIHByb3h5QXJncy5wdXNoKHByb3h5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgYXJnczogWy4uLnByb3h5QXJncywgJ2luc3RhbGwnLCAnLVUnLCBtb2R1bGVOYW1lXSxcclxuICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6ICdwaXAnXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpc1BpcEF2YWlsYWJsZShyZXNvdXJjZSkge1xyXG4gICAgICAgIGNvbnN0IHB5dGhvbkV4ZWN1dGlvbkZhY3RvcnkgPSB0aGlzLnNlcnZpY2VDb250YWluZXIuZ2V0KHR5cGVzXzMuSVB5dGhvbkV4ZWN1dGlvbkZhY3RvcnkpO1xyXG4gICAgICAgIHJldHVybiBweXRob25FeGVjdXRpb25GYWN0b3J5LmNyZWF0ZSh7IHJlc291cmNlIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHByb2MgPT4gcHJvYy5pc01vZHVsZUluc3RhbGxlZCgncGlwJykpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoKSA9PiBmYWxzZSk7XHJcbiAgICB9XHJcbn07XHJcblBpcEluc3RhbGxlciA9IF9fZGVjb3JhdGUoW1xyXG4gICAgaW52ZXJzaWZ5XzEuaW5qZWN0YWJsZSgpLFxyXG4gICAgX19wYXJhbSgwLCBpbnZlcnNpZnlfMS5pbmplY3QodHlwZXNfMS5JU2VydmljZUNvbnRhaW5lcikpXHJcbl0sIFBpcEluc3RhbGxlcik7XHJcbmV4cG9ydHMuUGlwSW5zdGFsbGVyID0gUGlwSW5zdGFsbGVyO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1waXBJbnN0YWxsZXIuanMubWFwIl19