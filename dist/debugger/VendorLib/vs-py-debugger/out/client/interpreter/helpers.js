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

const vscode_1 = require("vscode");

const types_1 = require("../common/application/types");

const types_2 = require("../common/platform/types");

const types_3 = require("../common/process/types");

const types_4 = require("../common/types");

const types_5 = require("../ioc/types");

const contracts_1 = require("./contracts");

const EXPITY_DURATION = 24 * 60 * 60 * 1000;

function getFirstNonEmptyLineFromMultilineString(stdout) {
  if (!stdout) {
    return '';
  }

  const lines = stdout.split(/\r?\n/g).map(line => line.trim()).filter(line => line.length > 0);
  return lines.length > 0 ? lines[0] : '';
}

exports.getFirstNonEmptyLineFromMultilineString = getFirstNonEmptyLineFromMultilineString;
let InterpreterHelper = class InterpreterHelper {
  constructor(serviceContainer) {
    this.serviceContainer = serviceContainer;
    this.persistentFactory = this.serviceContainer.get(types_4.IPersistentStateFactory);
    this.fs = this.serviceContainer.get(types_2.IFileSystem);
  }

  getActiveWorkspaceUri() {
    const workspaceService = this.serviceContainer.get(types_1.IWorkspaceService);
    const documentManager = this.serviceContainer.get(types_1.IDocumentManager);

    if (!workspaceService.hasWorkspaceFolders) {
      return;
    }

    if (Array.isArray(workspaceService.workspaceFolders) && workspaceService.workspaceFolders.length === 1) {
      return {
        folderUri: workspaceService.workspaceFolders[0].uri,
        configTarget: vscode_1.ConfigurationTarget.Workspace
      };
    }

    if (documentManager.activeTextEditor) {
      const workspaceFolder = workspaceService.getWorkspaceFolder(documentManager.activeTextEditor.document.uri);

      if (workspaceFolder) {
        return {
          configTarget: vscode_1.ConfigurationTarget.WorkspaceFolder,
          folderUri: workspaceFolder.uri
        };
      }
    }
  }

  getInterpreterInformation(pythonPath) {
    return __awaiter(this, void 0, void 0, function* () {
      let fileHash = yield this.fs.getFileHash(pythonPath).catch(() => '');
      fileHash = fileHash ? fileHash : '';
      const store = this.persistentFactory.createGlobalPersistentState(`${pythonPath}.v2`, undefined, EXPITY_DURATION);

      if (store.value && fileHash && store.value.fileHash === fileHash) {
        return store.value;
      }

      const processService = yield this.serviceContainer.get(types_3.IPythonExecutionFactory).create({
        pythonPath
      });

      try {
        const info = yield processService.getInterpreterInformation().catch(() => undefined);

        if (!info) {
          return;
        }

        const details = Object.assign({}, info, {
          fileHash
        });
        yield store.updateValue(details);
        return details;
      } catch (ex) {
        console.error(`Failed to get interpreter information for '${pythonPath}'`, ex);
        return;
      }
    });
  }

  isMacDefaultPythonPath(pythonPath) {
    return pythonPath === 'python' || pythonPath === '/usr/bin/python';
  }

  getInterpreterTypeDisplayName(interpreterType) {
    switch (interpreterType) {
      case contracts_1.InterpreterType.Conda:
        {
          return 'conda';
        }

      case contracts_1.InterpreterType.PipEnv:
        {
          return 'pipenv';
        }

      case contracts_1.InterpreterType.Pyenv:
        {
          return 'pyenv';
        }

      case contracts_1.InterpreterType.Venv:
        {
          return 'venv';
        }

      case contracts_1.InterpreterType.VirtualEnv:
        {
          return 'virtualenv';
        }

      default:
        {
          return '';
        }
    }
  }

};
InterpreterHelper = __decorate([inversify_1.injectable(), __param(0, inversify_1.inject(types_5.IServiceContainer))], InterpreterHelper);
exports.InterpreterHelper = InterpreterHelper;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlbHBlcnMuanMiXSwibmFtZXMiOlsiX19kZWNvcmF0ZSIsImRlY29yYXRvcnMiLCJ0YXJnZXQiLCJrZXkiLCJkZXNjIiwiYyIsImFyZ3VtZW50cyIsImxlbmd0aCIsInIiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJkIiwiUmVmbGVjdCIsImRlY29yYXRlIiwiaSIsImRlZmluZVByb3BlcnR5IiwiX19wYXJhbSIsInBhcmFtSW5kZXgiLCJkZWNvcmF0b3IiLCJfX2F3YWl0ZXIiLCJ0aGlzQXJnIiwiX2FyZ3VtZW50cyIsIlAiLCJnZW5lcmF0b3IiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImZ1bGZpbGxlZCIsInZhbHVlIiwic3RlcCIsIm5leHQiLCJlIiwicmVqZWN0ZWQiLCJyZXN1bHQiLCJkb25lIiwidGhlbiIsImFwcGx5IiwiZXhwb3J0cyIsImludmVyc2lmeV8xIiwicmVxdWlyZSIsInZzY29kZV8xIiwidHlwZXNfMSIsInR5cGVzXzIiLCJ0eXBlc18zIiwidHlwZXNfNCIsInR5cGVzXzUiLCJjb250cmFjdHNfMSIsIkVYUElUWV9EVVJBVElPTiIsImdldEZpcnN0Tm9uRW1wdHlMaW5lRnJvbU11bHRpbGluZVN0cmluZyIsInN0ZG91dCIsImxpbmVzIiwic3BsaXQiLCJtYXAiLCJsaW5lIiwidHJpbSIsImZpbHRlciIsIkludGVycHJldGVySGVscGVyIiwiY29uc3RydWN0b3IiLCJzZXJ2aWNlQ29udGFpbmVyIiwicGVyc2lzdGVudEZhY3RvcnkiLCJnZXQiLCJJUGVyc2lzdGVudFN0YXRlRmFjdG9yeSIsImZzIiwiSUZpbGVTeXN0ZW0iLCJnZXRBY3RpdmVXb3Jrc3BhY2VVcmkiLCJ3b3Jrc3BhY2VTZXJ2aWNlIiwiSVdvcmtzcGFjZVNlcnZpY2UiLCJkb2N1bWVudE1hbmFnZXIiLCJJRG9jdW1lbnRNYW5hZ2VyIiwiaGFzV29ya3NwYWNlRm9sZGVycyIsIkFycmF5IiwiaXNBcnJheSIsIndvcmtzcGFjZUZvbGRlcnMiLCJmb2xkZXJVcmkiLCJ1cmkiLCJjb25maWdUYXJnZXQiLCJDb25maWd1cmF0aW9uVGFyZ2V0IiwiV29ya3NwYWNlIiwiYWN0aXZlVGV4dEVkaXRvciIsIndvcmtzcGFjZUZvbGRlciIsImdldFdvcmtzcGFjZUZvbGRlciIsImRvY3VtZW50IiwiV29ya3NwYWNlRm9sZGVyIiwiZ2V0SW50ZXJwcmV0ZXJJbmZvcm1hdGlvbiIsInB5dGhvblBhdGgiLCJmaWxlSGFzaCIsImdldEZpbGVIYXNoIiwiY2F0Y2giLCJzdG9yZSIsImNyZWF0ZUdsb2JhbFBlcnNpc3RlbnRTdGF0ZSIsInVuZGVmaW5lZCIsInByb2Nlc3NTZXJ2aWNlIiwiSVB5dGhvbkV4ZWN1dGlvbkZhY3RvcnkiLCJjcmVhdGUiLCJpbmZvIiwiZGV0YWlscyIsImFzc2lnbiIsInVwZGF0ZVZhbHVlIiwiZXgiLCJjb25zb2xlIiwiZXJyb3IiLCJpc01hY0RlZmF1bHRQeXRob25QYXRoIiwiZ2V0SW50ZXJwcmV0ZXJUeXBlRGlzcGxheU5hbWUiLCJpbnRlcnByZXRlclR5cGUiLCJJbnRlcnByZXRlclR5cGUiLCJDb25kYSIsIlBpcEVudiIsIlB5ZW52IiwiVmVudiIsIlZpcnR1YWxFbnYiLCJpbmplY3RhYmxlIiwiaW5qZWN0IiwiSVNlcnZpY2VDb250YWluZXIiXSwibWFwcGluZ3MiOiJBQUFBOztBQUNBLElBQUlBLFVBQVUsR0FBSSxVQUFRLFNBQUtBLFVBQWQsSUFBNkIsVUFBVUMsVUFBVixFQUFzQkMsTUFBdEIsRUFBOEJDLEdBQTlCLEVBQW1DQyxJQUFuQyxFQUF5QztBQUNuRixNQUFJQyxDQUFDLEdBQUdDLFNBQVMsQ0FBQ0MsTUFBbEI7QUFBQSxNQUEwQkMsQ0FBQyxHQUFHSCxDQUFDLEdBQUcsQ0FBSixHQUFRSCxNQUFSLEdBQWlCRSxJQUFJLEtBQUssSUFBVCxHQUFnQkEsSUFBSSxHQUFHSyxNQUFNLENBQUNDLHdCQUFQLENBQWdDUixNQUFoQyxFQUF3Q0MsR0FBeEMsQ0FBdkIsR0FBc0VDLElBQXJIO0FBQUEsTUFBMkhP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LFdBQVcsQ0FBQ3lFLE1BQVosQ0FBbUJsRSxPQUFPLENBQUNtRSxpQkFBM0IsQ0FBSixDQUZvQixDQUFELEVBRzNCeEQsaUJBSDJCLENBQTlCO0FBSUFuQixPQUFPLENBQUNtQixpQkFBUixHQUE0QkEsaUJBQTVCIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn07XHJcbnZhciBfX3BhcmFtID0gKHRoaXMgJiYgdGhpcy5fX3BhcmFtKSB8fCBmdW5jdGlvbiAocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufTtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBpbnZlcnNpZnlfMSA9IHJlcXVpcmUoXCJpbnZlcnNpZnlcIik7XHJcbmNvbnN0IHZzY29kZV8xID0gcmVxdWlyZShcInZzY29kZVwiKTtcclxuY29uc3QgdHlwZXNfMSA9IHJlcXVpcmUoXCIuLi9jb21tb24vYXBwbGljYXRpb24vdHlwZXNcIik7XHJcbmNvbnN0IHR5cGVzXzIgPSByZXF1aXJlKFwiLi4vY29tbW9uL3BsYXRmb3JtL3R5cGVzXCIpO1xyXG5jb25zdCB0eXBlc18zID0gcmVxdWlyZShcIi4uL2NvbW1vbi9wcm9jZXNzL3R5cGVzXCIpO1xyXG5jb25zdCB0eXBlc180ID0gcmVxdWlyZShcIi4uL2NvbW1vbi90eXBlc1wiKTtcclxuY29uc3QgdHlwZXNfNSA9IHJlcXVpcmUoXCIuLi9pb2MvdHlwZXNcIik7XHJcbmNvbnN0IGNvbnRyYWN0c18xID0gcmVxdWlyZShcIi4vY29udHJhY3RzXCIpO1xyXG5jb25zdCBFWFBJVFlfRFVSQVRJT04gPSAyNCAqIDYwICogNjAgKiAxMDAwO1xyXG5mdW5jdGlvbiBnZXRGaXJzdE5vbkVtcHR5TGluZUZyb21NdWx0aWxpbmVTdHJpbmcoc3Rkb3V0KSB7XHJcbiAgICBpZiAoIXN0ZG91dCkge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuICAgIGNvbnN0IGxpbmVzID0gc3Rkb3V0LnNwbGl0KC9cXHI/XFxuL2cpLm1hcChsaW5lID0+IGxpbmUudHJpbSgpKS5maWx0ZXIobGluZSA9PiBsaW5lLmxlbmd0aCA+IDApO1xyXG4gICAgcmV0dXJuIGxpbmVzLmxlbmd0aCA+IDAgPyBsaW5lc1swXSA6ICcnO1xyXG59XHJcbmV4cG9ydHMuZ2V0Rmlyc3ROb25FbXB0eUxpbmVGcm9tTXVsdGlsaW5lU3RyaW5nID0gZ2V0Rmlyc3ROb25FbXB0eUxpbmVGcm9tTXVsdGlsaW5lU3RyaW5nO1xyXG5sZXQgSW50ZXJwcmV0ZXJIZWxwZXIgPSBjbGFzcyBJbnRlcnByZXRlckhlbHBlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihzZXJ2aWNlQ29udGFpbmVyKSB7XHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlQ29udGFpbmVyID0gc2VydmljZUNvbnRhaW5lcjtcclxuICAgICAgICB0aGlzLnBlcnNpc3RlbnRGYWN0b3J5ID0gdGhpcy5zZXJ2aWNlQ29udGFpbmVyLmdldCh0eXBlc180LklQZXJzaXN0ZW50U3RhdGVGYWN0b3J5KTtcclxuICAgICAgICB0aGlzLmZzID0gdGhpcy5zZXJ2aWNlQ29udGFpbmVyLmdldCh0eXBlc18yLklGaWxlU3lzdGVtKTtcclxuICAgIH1cclxuICAgIGdldEFjdGl2ZVdvcmtzcGFjZVVyaSgpIHtcclxuICAgICAgICBjb25zdCB3b3Jrc3BhY2VTZXJ2aWNlID0gdGhpcy5zZXJ2aWNlQ29udGFpbmVyLmdldCh0eXBlc18xLklXb3Jrc3BhY2VTZXJ2aWNlKTtcclxuICAgICAgICBjb25zdCBkb2N1bWVudE1hbmFnZXIgPSB0aGlzLnNlcnZpY2VDb250YWluZXIuZ2V0KHR5cGVzXzEuSURvY3VtZW50TWFuYWdlcik7XHJcbiAgICAgICAgaWYgKCF3b3Jrc3BhY2VTZXJ2aWNlLmhhc1dvcmtzcGFjZUZvbGRlcnMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh3b3Jrc3BhY2VTZXJ2aWNlLndvcmtzcGFjZUZvbGRlcnMpICYmIHdvcmtzcGFjZVNlcnZpY2Uud29ya3NwYWNlRm9sZGVycy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgZm9sZGVyVXJpOiB3b3Jrc3BhY2VTZXJ2aWNlLndvcmtzcGFjZUZvbGRlcnNbMF0udXJpLCBjb25maWdUYXJnZXQ6IHZzY29kZV8xLkNvbmZpZ3VyYXRpb25UYXJnZXQuV29ya3NwYWNlIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkb2N1bWVudE1hbmFnZXIuYWN0aXZlVGV4dEVkaXRvcikge1xyXG4gICAgICAgICAgICBjb25zdCB3b3Jrc3BhY2VGb2xkZXIgPSB3b3Jrc3BhY2VTZXJ2aWNlLmdldFdvcmtzcGFjZUZvbGRlcihkb2N1bWVudE1hbmFnZXIuYWN0aXZlVGV4dEVkaXRvci5kb2N1bWVudC51cmkpO1xyXG4gICAgICAgICAgICBpZiAod29ya3NwYWNlRm9sZGVyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyBjb25maWdUYXJnZXQ6IHZzY29kZV8xLkNvbmZpZ3VyYXRpb25UYXJnZXQuV29ya3NwYWNlRm9sZGVyLCBmb2xkZXJVcmk6IHdvcmtzcGFjZUZvbGRlci51cmkgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldEludGVycHJldGVySW5mb3JtYXRpb24ocHl0aG9uUGF0aCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBmaWxlSGFzaCA9IHlpZWxkIHRoaXMuZnMuZ2V0RmlsZUhhc2gocHl0aG9uUGF0aCkuY2F0Y2goKCkgPT4gJycpO1xyXG4gICAgICAgICAgICBmaWxlSGFzaCA9IGZpbGVIYXNoID8gZmlsZUhhc2ggOiAnJztcclxuICAgICAgICAgICAgY29uc3Qgc3RvcmUgPSB0aGlzLnBlcnNpc3RlbnRGYWN0b3J5LmNyZWF0ZUdsb2JhbFBlcnNpc3RlbnRTdGF0ZShgJHtweXRob25QYXRofS52MmAsIHVuZGVmaW5lZCwgRVhQSVRZX0RVUkFUSU9OKTtcclxuICAgICAgICAgICAgaWYgKHN0b3JlLnZhbHVlICYmIGZpbGVIYXNoICYmIHN0b3JlLnZhbHVlLmZpbGVIYXNoID09PSBmaWxlSGFzaCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0b3JlLnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHByb2Nlc3NTZXJ2aWNlID0geWllbGQgdGhpcy5zZXJ2aWNlQ29udGFpbmVyLmdldCh0eXBlc18zLklQeXRob25FeGVjdXRpb25GYWN0b3J5KS5jcmVhdGUoeyBweXRob25QYXRoIH0pO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5mbyA9IHlpZWxkIHByb2Nlc3NTZXJ2aWNlLmdldEludGVycHJldGVySW5mb3JtYXRpb24oKS5jYXRjaCgoKSA9PiB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgZGV0YWlscyA9IE9iamVjdC5hc3NpZ24oe30sIChpbmZvKSwgeyBmaWxlSGFzaCB9KTtcclxuICAgICAgICAgICAgICAgIHlpZWxkIHN0b3JlLnVwZGF0ZVZhbHVlKGRldGFpbHMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRldGFpbHM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGV4KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gZ2V0IGludGVycHJldGVyIGluZm9ybWF0aW9uIGZvciAnJHtweXRob25QYXRofSdgLCBleCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGlzTWFjRGVmYXVsdFB5dGhvblBhdGgocHl0aG9uUGF0aCkge1xyXG4gICAgICAgIHJldHVybiBweXRob25QYXRoID09PSAncHl0aG9uJyB8fCBweXRob25QYXRoID09PSAnL3Vzci9iaW4vcHl0aG9uJztcclxuICAgIH1cclxuICAgIGdldEludGVycHJldGVyVHlwZURpc3BsYXlOYW1lKGludGVycHJldGVyVHlwZSkge1xyXG4gICAgICAgIHN3aXRjaCAoaW50ZXJwcmV0ZXJUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgY29udHJhY3RzXzEuSW50ZXJwcmV0ZXJUeXBlLkNvbmRhOiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2NvbmRhJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIGNvbnRyYWN0c18xLkludGVycHJldGVyVHlwZS5QaXBFbnY6IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAncGlwZW52JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIGNvbnRyYWN0c18xLkludGVycHJldGVyVHlwZS5QeWVudjoge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdweWVudic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBjb250cmFjdHNfMS5JbnRlcnByZXRlclR5cGUuVmVudjoge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICd2ZW52JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIGNvbnRyYWN0c18xLkludGVycHJldGVyVHlwZS5WaXJ0dWFsRW52OiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3ZpcnR1YWxlbnYnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuSW50ZXJwcmV0ZXJIZWxwZXIgPSBfX2RlY29yYXRlKFtcclxuICAgIGludmVyc2lmeV8xLmluamVjdGFibGUoKSxcclxuICAgIF9fcGFyYW0oMCwgaW52ZXJzaWZ5XzEuaW5qZWN0KHR5cGVzXzUuSVNlcnZpY2VDb250YWluZXIpKVxyXG5dLCBJbnRlcnByZXRlckhlbHBlcik7XHJcbmV4cG9ydHMuSW50ZXJwcmV0ZXJIZWxwZXIgPSBJbnRlcnByZXRlckhlbHBlcjtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aGVscGVycy5qcy5tYXAiXX0=