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

const types_1 = require("../../common/application/types");

const types_2 = require("../../common/types");

const types_3 = require("../../ioc/types");

const contracts_1 = require("../contracts"); // tslint:disable-next-line:completed-docs


let InterpreterDisplay = class InterpreterDisplay {
  constructor(serviceContainer) {
    this.helper = serviceContainer.get(contracts_1.IInterpreterHelper);
    this.workspaceService = serviceContainer.get(types_1.IWorkspaceService);
    this.pathUtils = serviceContainer.get(types_2.IPathUtils);
    this.interpreterService = serviceContainer.get(contracts_1.IInterpreterService);
    const application = serviceContainer.get(types_1.IApplicationShell);
    const disposableRegistry = serviceContainer.get(types_2.IDisposableRegistry);
    this.statusBar = application.createStatusBarItem(vscode_1.StatusBarAlignment.Left, 100);
    this.statusBar.command = 'python.setInterpreter';
    disposableRegistry.push(this.statusBar);
  }

  refresh(resource) {
    return __awaiter(this, void 0, void 0, function* () {
      // Use the workspace Uri if available
      if (resource && this.workspaceService.getWorkspaceFolder(resource)) {
        resource = this.workspaceService.getWorkspaceFolder(resource).uri;
      }

      if (!resource) {
        const wkspc = this.helper.getActiveWorkspaceUri();
        resource = wkspc ? wkspc.folderUri : undefined;
      }

      yield this.updateDisplay(resource);
    });
  }

  updateDisplay(workspaceFolder) {
    return __awaiter(this, void 0, void 0, function* () {
      const interpreter = yield this.interpreterService.getActiveInterpreter(workspaceFolder);

      if (interpreter) {
        this.statusBar.color = '';
        this.statusBar.tooltip = this.pathUtils.getDisplayName(interpreter.path, workspaceFolder ? workspaceFolder.fsPath : undefined);
        this.statusBar.text = interpreter.displayName;
      } else {
        this.statusBar.tooltip = '';
        this.statusBar.color = 'yellow';
        this.statusBar.text = '$(alert) Select Python Interpreter';
      }

      this.statusBar.show();
    });
  }

};
InterpreterDisplay = __decorate([inversify_1.injectable(), __param(0, inversify_1.inject(types_3.IServiceContainer))], InterpreterDisplay);
exports.InterpreterDisplay = InterpreterDisplay;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIl9fZGVjb3JhdGUiLCJkZWNvcmF0b3JzIiwidGFyZ2V0Iiwia2V5IiwiZGVzYyIsImMiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJyIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZCIsIlJlZmxlY3QiLCJkZWNvcmF0ZSIsImkiLCJkZWZpbmVQcm9wZXJ0eSIsIl9fcGFyYW0iLCJwYXJhbUluZGV4IiwiZGVjb3JhdG9yIiwiX19hd2FpdGVyIiwidGhpc0FyZyIsIl9hcmd1bWVudHMiLCJQIiwiZ2VuZXJhdG9yIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJmdWxmaWxsZWQiLCJ2YWx1ZSIsInN0ZXAiLCJuZXh0IiwiZSIsInJlamVjdGVkIiwicmVzdWx0IiwiZG9uZSIsInRoZW4iLCJhcHBseSIsImV4cG9ydHMiLCJpbnZlcnNpZnlfMSIsInJlcXVpcmUiLCJ2c2NvZGVfMSIsInR5cGVzXzEiLCJ0eXBlc18yIiwidHlwZXNfMyIsImNvbnRyYWN0c18xIiwiSW50ZXJwcmV0ZXJEaXNwbGF5IiwiY29uc3RydWN0b3IiLCJzZXJ2aWNlQ29udGFpbmVyIiwiaGVscGVyIiwiZ2V0IiwiSUludGVycHJldGVySGVscGVyIiwid29ya3NwYWNlU2VydmljZSIsIklXb3Jrc3BhY2VTZXJ2aWNlIiwicGF0aFV0aWxzIiwiSVBhdGhVdGlscyIsImludGVycHJldGVyU2VydmljZSIsIklJbnRlcnByZXRlclNlcnZpY2UiLCJhcHBsaWNhdGlvbiIsIklBcHBsaWNhdGlvblNoZWxsIiwiZGlzcG9zYWJsZVJlZ2lzdHJ5IiwiSURpc3Bvc2FibGVSZWdpc3RyeSIsInN0YXR1c0JhciIsImNyZWF0ZVN0YXR1c0Jhckl0ZW0iLCJTdGF0dXNCYXJBbGlnbm1lbnQiLCJMZWZ0IiwiY29tbWFuZCIsInB1c2giLCJyZWZyZXNoIiwicmVzb3VyY2UiLCJnZXRXb3Jrc3BhY2VGb2xkZXIiLCJ1cmkiLCJ3a3NwYyIsImdldEFjdGl2ZVdvcmtzcGFjZVVyaSIsImZvbGRlclVyaSIsInVuZGVmaW5lZCIsInVwZGF0ZURpc3BsYXkiLCJ3b3Jrc3BhY2VGb2xkZXIiLCJpbnRlcnByZXRlciIsImdldEFjdGl2ZUludGVycHJldGVyIiwiY29sb3IiLCJ0b29sdGlwIiwiZ2V0RGlzcGxheU5hbWUiLCJwYXRoIiwiZnNQYXRoIiwidGV4dCIsImRpc3BsYXlOYW1lIiwic2hvdyIsImluamVjdGFibGUiLCJpbmplY3QiLCJJU2VydmljZUNvbnRhaW5lciJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBQ0EsSUFBSUEsVUFBVSxHQUFJLFVBQVEsU0FBS0EsVUFBZCxJQUE2QixVQUFVQyxVQUFWLEVBQXNCQyxNQUF0QixFQUE4QkMsR0FBOUIsRUFBbUNDLElBQW5DLEVBQXlDO0FBQ25GLE1BQUlDLENBQUMsR0FBR0MsU0FBUyxDQUFDQyxNQUFsQjtBQUFBLE1BQTBCQyxDQUFDLEdBQUdILENBQUMsR0FBRyxDQUFKLEdBQVFILE1BQVIsR0FBaUJFLElBQUksS0FBSyxJQUFULEdBQWdCQSxJQUFJLEdBQUdLLE1BQU0sQ0FBQ0Msd0JBQVAsQ0FBZ0NSLE1BQWhDLEVBQXdDQyxHQUF4QyxDQUF2QixHQUFzRUMsSUFBckg7QUFBQSxNQUEySE8sQ0FBM0g7QUFDQSxNQUFJLE9BQU9DLE9BQVAsS0FBbUIsUUFBbkIsSUFBK0IsT0FBT0EsT0FBTyxDQUFDQyxRQUFmLEtBQTRCLFVBQS9ELEVBQTJFTCxDQUFDLEdBQUdJLE9BQU8sQ0FBQ0MsUUFBUixDQUFpQlosVUFBakIsRUFBNkJDLE1BQTdCLEVBQXFDQyxHQUFyQyxFQUEwQ0MsSUFBMUMsQ0FBSixDQUEzRSxLQUNLLEtBQUssSUFBSVUsQ0FBQyxHQUFHYixVQUFVLENBQUNNLE1BQVgsR0FBb0IsQ0FBakMsRUFBb0NPLENBQUMsSUFBSSxDQUF6QyxFQUE0Q0EsQ0FBQyxFQUE3QyxFQUFpRCxJQUFJSCxDQUFDLEdBQUdWLFVBQVUsQ0FBQ2EsQ0FBRCxDQUFsQixFQUF1Qk4sQ0FBQyxHQUFHLENBQUNILENB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Q0FBaEI7QUFjSDs7QUF4QzZDLENBQWxEO0FBMENBekMsa0JBQWtCLEdBQUc3QyxVQUFVLENBQUMsQ0FDNUJzQyxXQUFXLENBQUNpRCxVQUFaLEVBRDRCLEVBRTVCdkUsT0FBTyxDQUFDLENBQUQsRUFBSXNCLFdBQVcsQ0FBQ2tELE1BQVosQ0FBbUI3QyxPQUFPLENBQUM4QyxpQkFBM0IsQ0FBSixDQUZxQixDQUFELEVBRzVCNUMsa0JBSDRCLENBQS9CO0FBSUFSLE9BQU8sQ0FBQ1Esa0JBQVIsR0FBNkJBLGtCQUE3QiIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59O1xyXG52YXIgX19wYXJhbSA9ICh0aGlzICYmIHRoaXMuX19wYXJhbSkgfHwgZnVuY3Rpb24gKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn07XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgaW52ZXJzaWZ5XzEgPSByZXF1aXJlKFwiaW52ZXJzaWZ5XCIpO1xyXG5jb25zdCB2c2NvZGVfMSA9IHJlcXVpcmUoXCJ2c2NvZGVcIik7XHJcbmNvbnN0IHR5cGVzXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tbW9uL2FwcGxpY2F0aW9uL3R5cGVzXCIpO1xyXG5jb25zdCB0eXBlc18yID0gcmVxdWlyZShcIi4uLy4uL2NvbW1vbi90eXBlc1wiKTtcclxuY29uc3QgdHlwZXNfMyA9IHJlcXVpcmUoXCIuLi8uLi9pb2MvdHlwZXNcIik7XHJcbmNvbnN0IGNvbnRyYWN0c18xID0gcmVxdWlyZShcIi4uL2NvbnRyYWN0c1wiKTtcclxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBsZXRlZC1kb2NzXHJcbmxldCBJbnRlcnByZXRlckRpc3BsYXkgPSBjbGFzcyBJbnRlcnByZXRlckRpc3BsYXkge1xyXG4gICAgY29uc3RydWN0b3Ioc2VydmljZUNvbnRhaW5lcikge1xyXG4gICAgICAgIHRoaXMuaGVscGVyID0gc2VydmljZUNvbnRhaW5lci5nZXQoY29udHJhY3RzXzEuSUludGVycHJldGVySGVscGVyKTtcclxuICAgICAgICB0aGlzLndvcmtzcGFjZVNlcnZpY2UgPSBzZXJ2aWNlQ29udGFpbmVyLmdldCh0eXBlc18xLklXb3Jrc3BhY2VTZXJ2aWNlKTtcclxuICAgICAgICB0aGlzLnBhdGhVdGlscyA9IHNlcnZpY2VDb250YWluZXIuZ2V0KHR5cGVzXzIuSVBhdGhVdGlscyk7XHJcbiAgICAgICAgdGhpcy5pbnRlcnByZXRlclNlcnZpY2UgPSBzZXJ2aWNlQ29udGFpbmVyLmdldChjb250cmFjdHNfMS5JSW50ZXJwcmV0ZXJTZXJ2aWNlKTtcclxuICAgICAgICBjb25zdCBhcHBsaWNhdGlvbiA9IHNlcnZpY2VDb250YWluZXIuZ2V0KHR5cGVzXzEuSUFwcGxpY2F0aW9uU2hlbGwpO1xyXG4gICAgICAgIGNvbnN0IGRpc3Bvc2FibGVSZWdpc3RyeSA9IHNlcnZpY2VDb250YWluZXIuZ2V0KHR5cGVzXzIuSURpc3Bvc2FibGVSZWdpc3RyeSk7XHJcbiAgICAgICAgdGhpcy5zdGF0dXNCYXIgPSBhcHBsaWNhdGlvbi5jcmVhdGVTdGF0dXNCYXJJdGVtKHZzY29kZV8xLlN0YXR1c0JhckFsaWdubWVudC5MZWZ0LCAxMDApO1xyXG4gICAgICAgIHRoaXMuc3RhdHVzQmFyLmNvbW1hbmQgPSAncHl0aG9uLnNldEludGVycHJldGVyJztcclxuICAgICAgICBkaXNwb3NhYmxlUmVnaXN0cnkucHVzaCh0aGlzLnN0YXR1c0Jhcik7XHJcbiAgICB9XHJcbiAgICByZWZyZXNoKHJlc291cmNlKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgLy8gVXNlIHRoZSB3b3Jrc3BhY2UgVXJpIGlmIGF2YWlsYWJsZVxyXG4gICAgICAgICAgICBpZiAocmVzb3VyY2UgJiYgdGhpcy53b3Jrc3BhY2VTZXJ2aWNlLmdldFdvcmtzcGFjZUZvbGRlcihyZXNvdXJjZSkpIHtcclxuICAgICAgICAgICAgICAgIHJlc291cmNlID0gdGhpcy53b3Jrc3BhY2VTZXJ2aWNlLmdldFdvcmtzcGFjZUZvbGRlcihyZXNvdXJjZSkudXJpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghcmVzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHdrc3BjID0gdGhpcy5oZWxwZXIuZ2V0QWN0aXZlV29ya3NwYWNlVXJpKCk7XHJcbiAgICAgICAgICAgICAgICByZXNvdXJjZSA9IHdrc3BjID8gd2tzcGMuZm9sZGVyVXJpIDogdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHlpZWxkIHRoaXMudXBkYXRlRGlzcGxheShyZXNvdXJjZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVEaXNwbGF5KHdvcmtzcGFjZUZvbGRlcikge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGludGVycHJldGVyID0geWllbGQgdGhpcy5pbnRlcnByZXRlclNlcnZpY2UuZ2V0QWN0aXZlSW50ZXJwcmV0ZXIod29ya3NwYWNlRm9sZGVyKTtcclxuICAgICAgICAgICAgaWYgKGludGVycHJldGVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXR1c0Jhci5jb2xvciA9ICcnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0dXNCYXIudG9vbHRpcCA9IHRoaXMucGF0aFV0aWxzLmdldERpc3BsYXlOYW1lKGludGVycHJldGVyLnBhdGgsIHdvcmtzcGFjZUZvbGRlciA/IHdvcmtzcGFjZUZvbGRlci5mc1BhdGggOiB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0dXNCYXIudGV4dCA9IGludGVycHJldGVyLmRpc3BsYXlOYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0dXNCYXIudG9vbHRpcCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0dXNCYXIuY29sb3IgPSAneWVsbG93JztcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzQmFyLnRleHQgPSAnJChhbGVydCkgU2VsZWN0IFB5dGhvbiBJbnRlcnByZXRlcic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zdGF0dXNCYXIuc2hvdygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59O1xyXG5JbnRlcnByZXRlckRpc3BsYXkgPSBfX2RlY29yYXRlKFtcclxuICAgIGludmVyc2lmeV8xLmluamVjdGFibGUoKSxcclxuICAgIF9fcGFyYW0oMCwgaW52ZXJzaWZ5XzEuaW5qZWN0KHR5cGVzXzMuSVNlcnZpY2VDb250YWluZXIpKVxyXG5dLCBJbnRlcnByZXRlckRpc3BsYXkpO1xyXG5leHBvcnRzLkludGVycHJldGVyRGlzcGxheSA9IEludGVycHJldGVyRGlzcGxheTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIl19