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

const vscode_1 = require("vscode");

require("../../common/extensions");

const contracts_1 = require("../../interpreter/contracts");

const types_1 = require("../../ioc/types");

const telemetry_1 = require("../../telemetry");

const constants_1 = require("../../telemetry/constants");

const types_2 = require("../application/types");

const types_3 = require("../types");

const types_4 = require("./types");

let TerminalService = class TerminalService {
  constructor(serviceContainer, resource, title = 'Python') {
    this.serviceContainer = serviceContainer;
    this.resource = resource;
    this.title = title;
    this.terminalClosed = new vscode_1.EventEmitter();
    const disposableRegistry = this.serviceContainer.get(types_3.IDisposableRegistry);
    disposableRegistry.push(this);
    this.terminalHelper = this.serviceContainer.get(types_4.ITerminalHelper);
    this.terminalManager = this.serviceContainer.get(types_2.ITerminalManager);
    this.terminalManager.onDidCloseTerminal(this.terminalCloseHandler, this, disposableRegistry);
    this.terminalActivator = this.serviceContainer.get(types_4.ITerminalActivator);
  }

  get onDidCloseTerminal() {
    return this.terminalClosed.event.bind(this.terminalClosed);
  }

  dispose() {
    if (this.terminal) {
      this.terminal.dispose();
    }
  }

  sendCommand(command, args) {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.ensureTerminal();
      const text = this.terminalHelper.buildCommandForTerminal(this.terminalShellType, command, args);
      this.terminal.show(true);
      this.terminal.sendText(text, true);
    });
  }

  sendText(text) {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.ensureTerminal();
      this.terminal.show(true);
      this.terminal.sendText(text);
    });
  }

  show(preserveFocus = true) {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.ensureTerminal(preserveFocus);
      this.terminal.show(preserveFocus);
    });
  }

  ensureTerminal(preserveFocus = true) {
    return __awaiter(this, void 0, void 0, function* () {
      if (this.terminal) {
        return;
      }

      const shellPath = this.terminalHelper.getTerminalShellPath();
      this.terminalShellType = !shellPath || shellPath.length === 0 ? types_4.TerminalShellType.other : this.terminalHelper.identifyTerminalShell(shellPath);
      this.terminal = this.terminalManager.createTerminal({
        name: this.title
      }); // Sometimes the terminal takes some time to start up before it can start accepting input.

      yield new Promise(resolve => setTimeout(resolve, 100));
      yield this.terminalActivator.activateEnvironmentInTerminal(this.terminal, this.resource, preserveFocus);
      this.terminal.show(preserveFocus);
      this.sendTelemetry().ignoreErrors();
    });
  }

  terminalCloseHandler(terminal) {
    if (terminal === this.terminal) {
      this.terminalClosed.fire();
      this.terminal = undefined;
    }
  }

  sendTelemetry() {
    return __awaiter(this, void 0, void 0, function* () {
      const pythonPath = this.serviceContainer.get(types_3.IConfigurationService).getSettings(this.resource).pythonPath;
      const interpreterInfo = yield this.serviceContainer.get(contracts_1.IInterpreterService).getInterpreterDetails(pythonPath);
      const pythonVersion = interpreterInfo && interpreterInfo.version_info ? interpreterInfo.version_info.join('.') : undefined;
      const interpreterType = interpreterInfo ? interpreterInfo.type : undefined;
      telemetry_1.captureTelemetry(constants_1.TERMINAL_CREATE, {
        terminal: this.terminalShellType,
        pythonVersion,
        interpreterType
      });
    });
  }

};
TerminalService = __decorate([inversify_1.injectable(), __param(0, inversify_1.inject(types_1.IServiceContainer))], TerminalService);
exports.TerminalService = TerminalService;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2UuanMiXSwibmFtZXMiOlsiX19kZWNvcmF0ZSIsImRlY29yYXRvcnMiLCJ0YXJnZXQiLCJrZXkiLCJkZXNjIiwiYyIsImFyZ3VtZW50cyIsImxlbmd0aCIsInIiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJkIiwiUmVmbGVjdCIsImRlY29yYXRlIiwiaSIsImRlZmluZVByb3BlcnR5IiwiX19wYXJhbSIsInBhcmFtSW5kZXgiLCJkZWNvcmF0b3IiLCJfX2F3YWl0ZXIiLCJ0aGlzQXJnIiwiX2FyZ3VtZW50cyIsIlAiLCJnZW5lcmF0b3IiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImZ1bGZpbGxlZCIsInZhbHVlIiwic3RlcCIsIm5leHQiLCJlIiwicmVqZWN0ZWQiLCJyZXN1bHQiLCJkb25lIiwidGhlbiIsImFwcGx5IiwiZXhwb3J0cyIsImludmVyc2lmeV8xIiwicmVxdWlyZSIsInZzY29kZV8xIiwiY29udHJhY3RzXzEiLCJ0eXBlc18xIiwidGVsZW1ldHJ5XzEiLCJjb25zdGFudHNfMSIsInR5cGVzXzIiLCJ0eXBlc18zIiwidHlwZXNfNCIsIlRlcm1pbmFsU2VydmljZSIsImNvbnN0cnVjdG9yIiwic2VydmljZUNvbnRhaW5lciIsInJlc291cmNlIiwidGl0bGUiLCJ0ZXJtaW5hbENsb3NlZCIsIkV2ZW50RW1pdHRlciIsImRpc3Bvc2FibGVSZWdpc3RyeSIsImdldCIsIklEaXNwb3NhYmxlUmVnaXN0cnkiLCJwdXNoIiwidGVybWluYWxIZWxwZXIiLCJJVGVybWluYWxIZWxwZXIiLCJ0ZXJtaW5hbE1hbmFnZXIiLCJJVGVybWluYWxNYW5hZ2VyIiwib25EaWRDbG9zZVRlcm1pbmFsIiwidGVybWluYWxDbG9zZUhhbmRsZXIiLCJ0ZXJtaW5hbEFjdGl2YXRvciIsIklUZXJtaW5hbEFjdGl2YXRvciIsImV2ZW50IiwiYmluZCIsImRpc3Bvc2UiLCJ0ZXJtaW5hbCIsInNlbmRDb21tYW5kIiwiY29tbWFuZCIsImFyZ3MiLCJlbnN1cmVUZXJtaW5hbCIsInRleHQiLCJidWlsZENvbW1hbmRGb3JUZXJtaW5hbCIsInRlcm1pbmFsU2hlbGxUeXBlIiwic2hvdyIsInNlbmRUZXh0IiwicHJlc2VydmVGb2N1cyIsInNoZWxsUGF0aCIsImdldFRlcm1pbmFsU2hlbGxQYXRoIiwiVGVybWluYWxTaGVsbFR5cGUiLCJvdGhlciIsImlkZW50aWZ5VGVybWluYWxTaGVsbCIsImNyZWF0ZVRlcm1pbmFsIiwibmFtZSIsInNldFRpbWVvdXQiLCJhY3RpdmF0ZUVudmlyb25tZW50SW5UZXJtaW5hbCIsInNlbmRUZWxlbWV0cnkiLCJpZ25vcmVFcnJvcnMiLCJmaXJlIiwidW5kZWZpbmVkIiwicHl0aG9uUGF0aCIsIklDb25maWd1cmF0aW9uU2VydmljZSIsImdldFNldHRpbmdzIiwiaW50ZXJwcmV0ZXJJbmZvIiwiSUludGVycHJldGVyU2VydmljZSIsImdldEludGVycHJldGVyRGV0YWlscyIsInB5dGhvblZlcnNpb24iLCJ2ZXJzaW9uX2luZm8iLCJqb2luIiwiaW50ZXJwcmV0ZXJUeXBlIiwidHlwZSIsImNhcHR1cmVUZWxlbWV0cnkiLCJURVJNSU5BTF9DUkVBVEUiLCJpbmplY3RhYmxlIiwiaW5qZWN0IiwiSVNlcnZpY2VDb250YWluZXIiXSwibWFwcGluZ3MiOiJBQUFBLGEsQ0FDQTtBQUNBOztBQUNBLElBQUlBLFVBQVUsR0FBSSxVQUFRLFNBQUtBLFVBQWQsSUFBNkIsVUFBVUMsVUFBVixFQUFzQkMsTUFBdEIsRUFBOEJDLEdBQTlCLEVBQW1DQyxJQUFuQyxFQUF5QztBQUNuRixNQUFJQyxDQUFDLEdBQUdDLFNBQVMsQ0FBQ0MsTUFBbEI7QUFBQSxNQUEwQkMsQ0FBQyxHQUFHSCxDQUFDLEdBQUcsQ0FBSixHQUFRSCxNQUFSLEdBQWlCRSxJQUFJLEtBQUssSUFBVCxHQUFnQkEsSUFBSSxHQUFHSyxNQUFNLENBQUNDLHdCQUFQLENBQWdDUixNQUFoQyxFQUF3Q0MsR0FBeEMsQ0FBdkIsR0FBc0VDLElBQXJIO0FB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QVcsQ0FBQzhELGdCQUFaLENBQTZCN0QsV0FBVyxDQUFDOEQsZUFBekMsRUFBMEQ7QUFBRXBDLFFBQUFBLFFBQVEsRUFBRSxLQUFLTyxpQkFBakI7QUFBb0N1QixRQUFBQSxhQUFwQztBQUFtREcsUUFBQUE7QUFBbkQsT0FBMUQ7QUFDSCxLQU5lLENBQWhCO0FBT0g7O0FBdkV1QyxDQUE1QztBQXlFQXZELGVBQWUsR0FBR2hELFVBQVUsQ0FBQyxDQUN6QnNDLFdBQVcsQ0FBQ3FFLFVBQVosRUFEeUIsRUFFekIzRixPQUFPLENBQUMsQ0FBRCxFQUFJc0IsV0FBVyxDQUFDc0UsTUFBWixDQUFtQmxFLE9BQU8sQ0FBQ21FLGlCQUEzQixDQUFKLENBRmtCLENBQUQsRUFHekI3RCxlQUh5QixDQUE1QjtBQUlBWCxPQUFPLENBQUNXLGVBQVIsR0FBMEJBLGVBQTFCIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcbnZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn07XHJcbnZhciBfX3BhcmFtID0gKHRoaXMgJiYgdGhpcy5fX3BhcmFtKSB8fCBmdW5jdGlvbiAocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufTtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBpbnZlcnNpZnlfMSA9IHJlcXVpcmUoXCJpbnZlcnNpZnlcIik7XHJcbmNvbnN0IHZzY29kZV8xID0gcmVxdWlyZShcInZzY29kZVwiKTtcclxucmVxdWlyZShcIi4uLy4uL2NvbW1vbi9leHRlbnNpb25zXCIpO1xyXG5jb25zdCBjb250cmFjdHNfMSA9IHJlcXVpcmUoXCIuLi8uLi9pbnRlcnByZXRlci9jb250cmFjdHNcIik7XHJcbmNvbnN0IHR5cGVzXzEgPSByZXF1aXJlKFwiLi4vLi4vaW9jL3R5cGVzXCIpO1xyXG5jb25zdCB0ZWxlbWV0cnlfMSA9IHJlcXVpcmUoXCIuLi8uLi90ZWxlbWV0cnlcIik7XHJcbmNvbnN0IGNvbnN0YW50c18xID0gcmVxdWlyZShcIi4uLy4uL3RlbGVtZXRyeS9jb25zdGFudHNcIik7XHJcbmNvbnN0IHR5cGVzXzIgPSByZXF1aXJlKFwiLi4vYXBwbGljYXRpb24vdHlwZXNcIik7XHJcbmNvbnN0IHR5cGVzXzMgPSByZXF1aXJlKFwiLi4vdHlwZXNcIik7XHJcbmNvbnN0IHR5cGVzXzQgPSByZXF1aXJlKFwiLi90eXBlc1wiKTtcclxubGV0IFRlcm1pbmFsU2VydmljZSA9IGNsYXNzIFRlcm1pbmFsU2VydmljZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihzZXJ2aWNlQ29udGFpbmVyLCByZXNvdXJjZSwgdGl0bGUgPSAnUHl0aG9uJykge1xyXG4gICAgICAgIHRoaXMuc2VydmljZUNvbnRhaW5lciA9IHNlcnZpY2VDb250YWluZXI7XHJcbiAgICAgICAgdGhpcy5yZXNvdXJjZSA9IHJlc291cmNlO1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgICAgICB0aGlzLnRlcm1pbmFsQ2xvc2VkID0gbmV3IHZzY29kZV8xLkV2ZW50RW1pdHRlcigpO1xyXG4gICAgICAgIGNvbnN0IGRpc3Bvc2FibGVSZWdpc3RyeSA9IHRoaXMuc2VydmljZUNvbnRhaW5lci5nZXQodHlwZXNfMy5JRGlzcG9zYWJsZVJlZ2lzdHJ5KTtcclxuICAgICAgICBkaXNwb3NhYmxlUmVnaXN0cnkucHVzaCh0aGlzKTtcclxuICAgICAgICB0aGlzLnRlcm1pbmFsSGVscGVyID0gdGhpcy5zZXJ2aWNlQ29udGFpbmVyLmdldCh0eXBlc180LklUZXJtaW5hbEhlbHBlcik7XHJcbiAgICAgICAgdGhpcy50ZXJtaW5hbE1hbmFnZXIgPSB0aGlzLnNlcnZpY2VDb250YWluZXIuZ2V0KHR5cGVzXzIuSVRlcm1pbmFsTWFuYWdlcik7XHJcbiAgICAgICAgdGhpcy50ZXJtaW5hbE1hbmFnZXIub25EaWRDbG9zZVRlcm1pbmFsKHRoaXMudGVybWluYWxDbG9zZUhhbmRsZXIsIHRoaXMsIGRpc3Bvc2FibGVSZWdpc3RyeSk7XHJcbiAgICAgICAgdGhpcy50ZXJtaW5hbEFjdGl2YXRvciA9IHRoaXMuc2VydmljZUNvbnRhaW5lci5nZXQodHlwZXNfNC5JVGVybWluYWxBY3RpdmF0b3IpO1xyXG4gICAgfVxyXG4gICAgZ2V0IG9uRGlkQ2xvc2VUZXJtaW5hbCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50ZXJtaW5hbENsb3NlZC5ldmVudC5iaW5kKHRoaXMudGVybWluYWxDbG9zZWQpO1xyXG4gICAgfVxyXG4gICAgZGlzcG9zZSgpIHtcclxuICAgICAgICBpZiAodGhpcy50ZXJtaW5hbCkge1xyXG4gICAgICAgICAgICB0aGlzLnRlcm1pbmFsLmRpc3Bvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzZW5kQ29tbWFuZChjb21tYW5kLCBhcmdzKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgeWllbGQgdGhpcy5lbnN1cmVUZXJtaW5hbCgpO1xyXG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gdGhpcy50ZXJtaW5hbEhlbHBlci5idWlsZENvbW1hbmRGb3JUZXJtaW5hbCh0aGlzLnRlcm1pbmFsU2hlbGxUeXBlLCBjb21tYW5kLCBhcmdzKTtcclxuICAgICAgICAgICAgdGhpcy50ZXJtaW5hbC5zaG93KHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLnRlcm1pbmFsLnNlbmRUZXh0KHRleHQsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc2VuZFRleHQodGV4dCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIHlpZWxkIHRoaXMuZW5zdXJlVGVybWluYWwoKTtcclxuICAgICAgICAgICAgdGhpcy50ZXJtaW5hbC5zaG93KHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLnRlcm1pbmFsLnNlbmRUZXh0KHRleHQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc2hvdyhwcmVzZXJ2ZUZvY3VzID0gdHJ1ZSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIHlpZWxkIHRoaXMuZW5zdXJlVGVybWluYWwocHJlc2VydmVGb2N1cyk7XHJcbiAgICAgICAgICAgIHRoaXMudGVybWluYWwuc2hvdyhwcmVzZXJ2ZUZvY3VzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGVuc3VyZVRlcm1pbmFsKHByZXNlcnZlRm9jdXMgPSB0cnVlKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGVybWluYWwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBzaGVsbFBhdGggPSB0aGlzLnRlcm1pbmFsSGVscGVyLmdldFRlcm1pbmFsU2hlbGxQYXRoKCk7XHJcbiAgICAgICAgICAgIHRoaXMudGVybWluYWxTaGVsbFR5cGUgPSAhc2hlbGxQYXRoIHx8IHNoZWxsUGF0aC5sZW5ndGggPT09IDAgPyB0eXBlc180LlRlcm1pbmFsU2hlbGxUeXBlLm90aGVyIDogdGhpcy50ZXJtaW5hbEhlbHBlci5pZGVudGlmeVRlcm1pbmFsU2hlbGwoc2hlbGxQYXRoKTtcclxuICAgICAgICAgICAgdGhpcy50ZXJtaW5hbCA9IHRoaXMudGVybWluYWxNYW5hZ2VyLmNyZWF0ZVRlcm1pbmFsKHsgbmFtZTogdGhpcy50aXRsZSB9KTtcclxuICAgICAgICAgICAgLy8gU29tZXRpbWVzIHRoZSB0ZXJtaW5hbCB0YWtlcyBzb21lIHRpbWUgdG8gc3RhcnQgdXAgYmVmb3JlIGl0IGNhbiBzdGFydCBhY2NlcHRpbmcgaW5wdXQuXHJcbiAgICAgICAgICAgIHlpZWxkIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCAxMDApKTtcclxuICAgICAgICAgICAgeWllbGQgdGhpcy50ZXJtaW5hbEFjdGl2YXRvci5hY3RpdmF0ZUVudmlyb25tZW50SW5UZXJtaW5hbCh0aGlzLnRlcm1pbmFsLCB0aGlzLnJlc291cmNlLCBwcmVzZXJ2ZUZvY3VzKTtcclxuICAgICAgICAgICAgdGhpcy50ZXJtaW5hbC5zaG93KHByZXNlcnZlRm9jdXMpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbmRUZWxlbWV0cnkoKS5pZ25vcmVFcnJvcnMoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHRlcm1pbmFsQ2xvc2VIYW5kbGVyKHRlcm1pbmFsKSB7XHJcbiAgICAgICAgaWYgKHRlcm1pbmFsID09PSB0aGlzLnRlcm1pbmFsKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGVybWluYWxDbG9zZWQuZmlyZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnRlcm1pbmFsID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHNlbmRUZWxlbWV0cnkoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgY29uc3QgcHl0aG9uUGF0aCA9IHRoaXMuc2VydmljZUNvbnRhaW5lci5nZXQodHlwZXNfMy5JQ29uZmlndXJhdGlvblNlcnZpY2UpLmdldFNldHRpbmdzKHRoaXMucmVzb3VyY2UpLnB5dGhvblBhdGg7XHJcbiAgICAgICAgICAgIGNvbnN0IGludGVycHJldGVySW5mbyA9IHlpZWxkIHRoaXMuc2VydmljZUNvbnRhaW5lci5nZXQoY29udHJhY3RzXzEuSUludGVycHJldGVyU2VydmljZSkuZ2V0SW50ZXJwcmV0ZXJEZXRhaWxzKHB5dGhvblBhdGgpO1xyXG4gICAgICAgICAgICBjb25zdCBweXRob25WZXJzaW9uID0gKGludGVycHJldGVySW5mbyAmJiBpbnRlcnByZXRlckluZm8udmVyc2lvbl9pbmZvKSA/IGludGVycHJldGVySW5mby52ZXJzaW9uX2luZm8uam9pbignLicpIDogdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBjb25zdCBpbnRlcnByZXRlclR5cGUgPSBpbnRlcnByZXRlckluZm8gPyBpbnRlcnByZXRlckluZm8udHlwZSA6IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgdGVsZW1ldHJ5XzEuY2FwdHVyZVRlbGVtZXRyeShjb25zdGFudHNfMS5URVJNSU5BTF9DUkVBVEUsIHsgdGVybWluYWw6IHRoaXMudGVybWluYWxTaGVsbFR5cGUsIHB5dGhvblZlcnNpb24sIGludGVycHJldGVyVHlwZSB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuVGVybWluYWxTZXJ2aWNlID0gX19kZWNvcmF0ZShbXHJcbiAgICBpbnZlcnNpZnlfMS5pbmplY3RhYmxlKCksXHJcbiAgICBfX3BhcmFtKDAsIGludmVyc2lmeV8xLmluamVjdCh0eXBlc18xLklTZXJ2aWNlQ29udGFpbmVyKSlcclxuXSwgVGVybWluYWxTZXJ2aWNlKTtcclxuZXhwb3J0cy5UZXJtaW5hbFNlcnZpY2UgPSBUZXJtaW5hbFNlcnZpY2U7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNlcnZpY2UuanMubWFwIl19