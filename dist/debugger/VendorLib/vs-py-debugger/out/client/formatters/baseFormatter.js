"use strict";

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

const fs = require("fs-extra");

const path = require("path");

const vscode = require("vscode");

const types_1 = require("../common/application/types");

const constants_1 = require("../common/constants");

require("../common/extensions");

const helpers_1 = require("../common/helpers");

const types_2 = require("../common/process/types");

const types_3 = require("../common/types");

const editor_1 = require("./../common/editor");

const types_4 = require("./types");

class BaseFormatter {
  constructor(Id, product, serviceContainer) {
    this.Id = Id;
    this.product = product;
    this.serviceContainer = serviceContainer;
    this.outputChannel = serviceContainer.get(types_3.IOutputChannel, constants_1.STANDARD_OUTPUT_CHANNEL);
    this.helper = serviceContainer.get(types_4.IFormatterHelper);
    this.workspace = serviceContainer.get(types_1.IWorkspaceService);
  }

  getDocumentPath(document, fallbackPath) {
    if (path.basename(document.uri.fsPath) === document.uri.fsPath) {
      return fallbackPath;
    }

    return path.dirname(document.fileName);
  }

  getWorkspaceUri(document) {
    const workspaceFolder = this.workspace.getWorkspaceFolder(document.uri);

    if (workspaceFolder) {
      return workspaceFolder.uri;
    }

    const folders = this.workspace.workspaceFolders;

    if (Array.isArray(folders) && folders.length > 0) {
      return folders[0].uri;
    }

    return vscode.Uri.file(__dirname);
  }

  provideDocumentFormattingEdits(document, options, token, args, cwd) {
    return __awaiter(this, void 0, void 0, function* () {
      if (typeof cwd !== 'string' || cwd.length === 0) {
        cwd = this.getWorkspaceUri(document).fsPath;
      } // autopep8 and yapf have the ability to read from the process input stream and return the formatted code out of the output stream.
      // However they don't support returning the diff of the formatted text when reading data from the input stream.
      // Yet getting text formatted that way avoids having to create a temporary file, however the diffing will have
      // to be done here in node (extension), i.e. extension CPU, i.e. less responsive solution.


      const tempFile = yield this.createTempFile(document);

      if (this.checkCancellation(document.fileName, tempFile, token)) {
        return [];
      }

      const executionInfo = this.helper.getExecutionInfo(this.product, args, document.uri);
      executionInfo.args.push(tempFile);
      const pythonToolsExecutionService = this.serviceContainer.get(types_2.IPythonToolExecutionService);
      const promise = pythonToolsExecutionService.exec(executionInfo, {
        cwd,
        throwOnStdErr: false,
        token
      }, document.uri).then(output => output.stdout).then(data => {
        if (this.checkCancellation(document.fileName, tempFile, token)) {
          return [];
        }

        return editor_1.getTextEditsFromPatch(document.getText(), data);
      }).catch(error => {
        if (this.checkCancellation(document.fileName, tempFile, token)) {
          return [];
        } // tslint:disable-next-line:no-empty


        this.handleError(this.Id, error, document.uri).catch(() => {});
        return [];
      }).then(edits => {
        this.deleteTempFile(document.fileName, tempFile).ignoreErrors();
        return edits;
      });
      vscode.window.setStatusBarMessage(`Formatting with ${this.Id}`, promise);
      return promise;
    });
  }

  handleError(expectedFileName, error, resource) {
    return __awaiter(this, void 0, void 0, function* () {
      let customError = `Formatting with ${this.Id} failed.`;

      if (helpers_1.isNotInstalledError(error)) {
        const installer = this.serviceContainer.get(types_3.IInstaller);
        const isInstalled = yield installer.isInstalled(this.product, resource);

        if (!isInstalled) {
          customError += `\nYou could either install the '${this.Id}' formatter, turn it off or use another formatter.`;
          installer.promptToInstall(this.product, resource).catch(ex => console.error('Python Extension: promptToInstall', ex));
        }
      }

      this.outputChannel.appendLine(`\n${customError}\n${error}`);
    });
  }

  createTempFile(document) {
    return __awaiter(this, void 0, void 0, function* () {
      return document.isDirty ? editor_1.getTempFileWithDocumentContents(document) : document.fileName;
    });
  }

  deleteTempFile(originalFile, tempFile) {
    if (originalFile !== tempFile) {
      return fs.unlink(tempFile);
    }

    return Promise.resolve();
  }

  checkCancellation(originalFile, tempFile, token) {
    if (token && token.isCancellationRequested) {
      this.deleteTempFile(originalFile, tempFile).ignoreErrors();
      return true;
    }

    return false;
  }

}

exports.BaseFormatter = BaseFormatter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhc2VGb3JtYXR0ZXIuanMiXSwibmFtZXMiOlsiX19hd2FpdGVyIiwidGhpc0FyZyIsIl9hcmd1bWVudHMiLCJQIiwiZ2VuZXJhdG9yIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJmdWxmaWxsZWQiLCJ2YWx1ZSIsInN0ZXAiLCJuZXh0IiwiZSIsInJlamVjdGVkIiwicmVzdWx0IiwiZG9uZSIsInRoZW4iLCJhcHBseSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsImZzIiwicmVxdWlyZSIsInBhdGgiLCJ2c2NvZGUiLCJ0eXBlc18xIiwiY29uc3RhbnRzXzEiLCJoZWxwZXJzXzEiLCJ0eXBlc18yIiwidHlwZXNfMyIsImVkaXRvcl8xIiwidHlwZXNfNCIsIkJhc2VGb3JtYXR0ZXIiLCJjb25zdHJ1Y3RvciIsIklkIiwicHJvZHVjdCIsInNlcnZpY2VDb250YWluZXIiLCJvdXRwdXRDaGFubmVsIiwiZ2V0IiwiSU91dHB1dENoYW5uZWwiLCJTVEFOREFSRF9PVVRQVVRfQ0hBTk5FTCIsImhlbHBlciIsIklGb3JtYXR0ZXJIZWxwZXIiLCJ3b3Jrc3BhY2UiLCJJV29ya3NwYWNlU2VydmljZSIsImdldERvY3VtZW50UGF0aCIsImRvY3VtZW50IiwiZmFsbGJhY2tQYXRoIiwiYmFzZW5hbWUiLCJ1cmkiLCJmc1BhdGgiLCJkaXJuYW1lIiwiZmlsZU5hbWUiLCJnZXRXb3Jrc3BhY2VVcmkiLCJ3b3Jrc3BhY2VGb2xkZXIiLCJnZXRXb3Jrc3BhY2VGb2xkZXIiLCJmb2xkZXJzIiwid29ya3NwYWNlRm9sZGVycyIsIkFycmF5IiwiaXNBcnJheSIsImxlbmd0aCIsIlVyaSIsImZpbGUiLCJfX2Rpcm5hbWUiLCJwcm92aWRlRG9jdW1lbnRGb3JtYXR0aW5nRWRpdHMiLCJvcHRpb25zIiwidG9rZW4iLCJhcmdzIiwiY3dkIiwidGVtcEZpbGUiLCJjcmVhdGVUZW1wRmlsZSIsImNoZWNrQ2FuY2VsbGF0aW9uIiwiZXhlY3V0aW9uSW5mbyIsImdldEV4ZWN1dGlvbkluZm8iLCJwdXNoIiwicHl0aG9uVG9vbHNFeGVjdXRpb25TZXJ2aWNlIiwiSVB5dGhvblRvb2xFeGVjdXRpb25TZXJ2aWNlIiwicHJvbWlzZSIsImV4ZWMiLCJ0aHJvd09uU3RkRXJyIiwib3V0cHV0Iiwic3Rkb3V0IiwiZGF0YSIsImdldFRleHRFZGl0c0Zyb21QYXRjaCIsImdldFRleHQiLCJjYXRjaCIsImVycm9yIiwiaGFuZGxlRXJyb3IiLCJlZGl0cyIsImRlbGV0ZVRlbXBGaWxlIiwiaWdub3JlRXJyb3JzIiwid2luZG93Iiwic2V0U3RhdHVzQmFyTWVzc2FnZSIsImV4cGVjdGVkRmlsZU5hbWUiLCJyZXNvdXJjZSIsImN1c3RvbUVycm9yIiwiaXNOb3RJbnN0YWxsZWRFcnJvciIsImluc3RhbGxlciIsIklJbnN0YWxsZXIiLCJpc0luc3RhbGxlZCIsInByb21wdFRvSW5zdGFsbCIsImV4IiwiY29uc29sZSIsImFwcGVuZExpbmUiLCJpc0RpcnR5IiwiZ2V0VGVtcEZpbGVXaXRoRG9jdW1lbnRDb250ZW50cyIsIm9yaWdpbmFsRmlsZSIsInVubGluayIsImlzQ2FuY2VsbGF0aW9uUmVxdWVzdGVkIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFDQSxJQUFJQSxTQUFTLEdBQUksVUFBUSxTQUFLQSxTQUFkLElBQTRCLFVBQVVDLE9BQVYsRUFBbUJDLFVBQW5CLEVBQStCQyxDQUEvQixFQUFrQ0MsU0FBbEMsRUFBNkM7QUFDckYsU0FBTyxLQUFLRCxDQUFDLEtBQUtBLENBQUMsR0FBR0UsT0FBVCxDQUFOLEVBQXlCLFVBQVVDLE9BQVYsRUFBbUJDLE1BQW5CLEVBQTJCO0FBQ3ZELGFBQVNDLFNBQVQsQ0FBbUJDLEtBQW5CLEVBQTBCO0FBQUUsVUFBSTtBQUFFQyxRQUFBQSxJQUFJLENBQUNOLFNBQVMsQ0FBQ08sSUFBVixDQUFlRixLQUFmLENBQUQsQ0FBSjtBQUE4QixPQUFwQyxDQUFxQyxPQUFPRyxDQUFQLEVBQVU7QUFBRUwsUUFBQUEsTUFBTSxDQUFDSyxDQUFELENB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QixLQUFSLENBQWMsbUNBQWQsRUFBbURlLEVBQW5ELENBQTlEO0FBQ0g7QUFDSjs7QUFDRCxXQUFLaEUsYUFBTCxDQUFtQmtFLFVBQW5CLENBQStCLEtBQUlSLFdBQVksS0FBSVQsS0FBTSxFQUF6RDtBQUNILEtBWGUsQ0FBaEI7QUFZSDs7QUFDRGhCLEVBQUFBLGNBQWMsQ0FBQ3hCLFFBQUQsRUFBVztBQUNyQixXQUFPOUMsU0FBUyxDQUFDLElBQUQsRUFBTyxLQUFLLENBQVosRUFBZSxLQUFLLENBQXBCLEVBQXVCLGFBQWE7QUFDaEQsYUFBTzhDLFFBQVEsQ0FBQzBELE9BQVQsR0FDRDFFLFFBQVEsQ0FBQzJFLCtCQUFULENBQXlDM0QsUUFBekMsQ0FEQyxHQUVEQSxRQUFRLENBQUNNLFFBRmY7QUFHSCxLQUplLENBQWhCO0FBS0g7O0FBQ0RxQyxFQUFBQSxjQUFjLENBQUNpQixZQUFELEVBQWVyQyxRQUFmLEVBQXlCO0FBQ25DLFFBQUlxQyxZQUFZLEtBQUtyQyxRQUFyQixFQUErQjtBQUMzQixhQUFPaEQsRUFBRSxDQUFDc0YsTUFBSCxDQUFVdEMsUUFBVixDQUFQO0FBQ0g7O0FBQ0QsV0FBT2hFLE9BQU8sQ0FBQ0MsT0FBUixFQUFQO0FBQ0g7O0FBQ0RpRSxFQUFBQSxpQkFBaUIsQ0FBQ21DLFlBQUQsRUFBZXJDLFFBQWYsRUFBeUJILEtBQXpCLEVBQWdDO0FBQzdDLFFBQUlBLEtBQUssSUFBSUEsS0FBSyxDQUFDMEMsdUJBQW5CLEVBQTRDO0FBQ3hDLFdBQUtuQixjQUFMLENBQW9CaUIsWUFBcEIsRUFBa0NyQyxRQUFsQyxFQUE0Q3FCLFlBQTVDO0FBQ0EsYUFBTyxJQUFQO0FBQ0g7O0FBQ0QsV0FBTyxLQUFQO0FBQ0g7O0FBbkdlOztBQXFHcEJ0RSxPQUFPLENBQUNZLGFBQVIsR0FBd0JBLGFBQXhCIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgZnMgPSByZXF1aXJlKFwiZnMtZXh0cmFcIik7XHJcbmNvbnN0IHBhdGggPSByZXF1aXJlKFwicGF0aFwiKTtcclxuY29uc3QgdnNjb2RlID0gcmVxdWlyZShcInZzY29kZVwiKTtcclxuY29uc3QgdHlwZXNfMSA9IHJlcXVpcmUoXCIuLi9jb21tb24vYXBwbGljYXRpb24vdHlwZXNcIik7XHJcbmNvbnN0IGNvbnN0YW50c18xID0gcmVxdWlyZShcIi4uL2NvbW1vbi9jb25zdGFudHNcIik7XHJcbnJlcXVpcmUoXCIuLi9jb21tb24vZXh0ZW5zaW9uc1wiKTtcclxuY29uc3QgaGVscGVyc18xID0gcmVxdWlyZShcIi4uL2NvbW1vbi9oZWxwZXJzXCIpO1xyXG5jb25zdCB0eXBlc18yID0gcmVxdWlyZShcIi4uL2NvbW1vbi9wcm9jZXNzL3R5cGVzXCIpO1xyXG5jb25zdCB0eXBlc18zID0gcmVxdWlyZShcIi4uL2NvbW1vbi90eXBlc1wiKTtcclxuY29uc3QgZWRpdG9yXzEgPSByZXF1aXJlKFwiLi8uLi9jb21tb24vZWRpdG9yXCIpO1xyXG5jb25zdCB0eXBlc180ID0gcmVxdWlyZShcIi4vdHlwZXNcIik7XHJcbmNsYXNzIEJhc2VGb3JtYXR0ZXIge1xyXG4gICAgY29uc3RydWN0b3IoSWQsIHByb2R1Y3QsIHNlcnZpY2VDb250YWluZXIpIHtcclxuICAgICAgICB0aGlzLklkID0gSWQ7XHJcbiAgICAgICAgdGhpcy5wcm9kdWN0ID0gcHJvZHVjdDtcclxuICAgICAgICB0aGlzLnNlcnZpY2VDb250YWluZXIgPSBzZXJ2aWNlQ29udGFpbmVyO1xyXG4gICAgICAgIHRoaXMub3V0cHV0Q2hhbm5lbCA9IHNlcnZpY2VDb250YWluZXIuZ2V0KHR5cGVzXzMuSU91dHB1dENoYW5uZWwsIGNvbnN0YW50c18xLlNUQU5EQVJEX09VVFBVVF9DSEFOTkVMKTtcclxuICAgICAgICB0aGlzLmhlbHBlciA9IHNlcnZpY2VDb250YWluZXIuZ2V0KHR5cGVzXzQuSUZvcm1hdHRlckhlbHBlcik7XHJcbiAgICAgICAgdGhpcy53b3Jrc3BhY2UgPSBzZXJ2aWNlQ29udGFpbmVyLmdldCh0eXBlc18xLklXb3Jrc3BhY2VTZXJ2aWNlKTtcclxuICAgIH1cclxuICAgIGdldERvY3VtZW50UGF0aChkb2N1bWVudCwgZmFsbGJhY2tQYXRoKSB7XHJcbiAgICAgICAgaWYgKHBhdGguYmFzZW5hbWUoZG9jdW1lbnQudXJpLmZzUGF0aCkgPT09IGRvY3VtZW50LnVyaS5mc1BhdGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbGxiYWNrUGF0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBhdGguZGlybmFtZShkb2N1bWVudC5maWxlTmFtZSk7XHJcbiAgICB9XHJcbiAgICBnZXRXb3Jrc3BhY2VVcmkoZG9jdW1lbnQpIHtcclxuICAgICAgICBjb25zdCB3b3Jrc3BhY2VGb2xkZXIgPSB0aGlzLndvcmtzcGFjZS5nZXRXb3Jrc3BhY2VGb2xkZXIoZG9jdW1lbnQudXJpKTtcclxuICAgICAgICBpZiAod29ya3NwYWNlRm9sZGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB3b3Jrc3BhY2VGb2xkZXIudXJpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBmb2xkZXJzID0gdGhpcy53b3Jrc3BhY2Uud29ya3NwYWNlRm9sZGVycztcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShmb2xkZXJzKSAmJiBmb2xkZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZvbGRlcnNbMF0udXJpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdnNjb2RlLlVyaS5maWxlKF9fZGlybmFtZSk7XHJcbiAgICB9XHJcbiAgICBwcm92aWRlRG9jdW1lbnRGb3JtYXR0aW5nRWRpdHMoZG9jdW1lbnQsIG9wdGlvbnMsIHRva2VuLCBhcmdzLCBjd2QpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGN3ZCAhPT0gJ3N0cmluZycgfHwgY3dkLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY3dkID0gdGhpcy5nZXRXb3Jrc3BhY2VVcmkoZG9jdW1lbnQpLmZzUGF0aDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBhdXRvcGVwOCBhbmQgeWFwZiBoYXZlIHRoZSBhYmlsaXR5IHRvIHJlYWQgZnJvbSB0aGUgcHJvY2VzcyBpbnB1dCBzdHJlYW0gYW5kIHJldHVybiB0aGUgZm9ybWF0dGVkIGNvZGUgb3V0IG9mIHRoZSBvdXRwdXQgc3RyZWFtLlxyXG4gICAgICAgICAgICAvLyBIb3dldmVyIHRoZXkgZG9uJ3Qgc3VwcG9ydCByZXR1cm5pbmcgdGhlIGRpZmYgb2YgdGhlIGZvcm1hdHRlZCB0ZXh0IHdoZW4gcmVhZGluZyBkYXRhIGZyb20gdGhlIGlucHV0IHN0cmVhbS5cclxuICAgICAgICAgICAgLy8gWWV0IGdldHRpbmcgdGV4dCBmb3JtYXR0ZWQgdGhhdCB3YXkgYXZvaWRzIGhhdmluZyB0byBjcmVhdGUgYSB0ZW1wb3JhcnkgZmlsZSwgaG93ZXZlciB0aGUgZGlmZmluZyB3aWxsIGhhdmVcclxuICAgICAgICAgICAgLy8gdG8gYmUgZG9uZSBoZXJlIGluIG5vZGUgKGV4dGVuc2lvbiksIGkuZS4gZXh0ZW5zaW9uIENQVSwgaS5lLiBsZXNzIHJlc3BvbnNpdmUgc29sdXRpb24uXHJcbiAgICAgICAgICAgIGNvbnN0IHRlbXBGaWxlID0geWllbGQgdGhpcy5jcmVhdGVUZW1wRmlsZShkb2N1bWVudCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrQ2FuY2VsbGF0aW9uKGRvY3VtZW50LmZpbGVOYW1lLCB0ZW1wRmlsZSwgdG9rZW4pKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgZXhlY3V0aW9uSW5mbyA9IHRoaXMuaGVscGVyLmdldEV4ZWN1dGlvbkluZm8odGhpcy5wcm9kdWN0LCBhcmdzLCBkb2N1bWVudC51cmkpO1xyXG4gICAgICAgICAgICBleGVjdXRpb25JbmZvLmFyZ3MucHVzaCh0ZW1wRmlsZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHB5dGhvblRvb2xzRXhlY3V0aW9uU2VydmljZSA9IHRoaXMuc2VydmljZUNvbnRhaW5lci5nZXQodHlwZXNfMi5JUHl0aG9uVG9vbEV4ZWN1dGlvblNlcnZpY2UpO1xyXG4gICAgICAgICAgICBjb25zdCBwcm9taXNlID0gcHl0aG9uVG9vbHNFeGVjdXRpb25TZXJ2aWNlLmV4ZWMoZXhlY3V0aW9uSW5mbywgeyBjd2QsIHRocm93T25TdGRFcnI6IGZhbHNlLCB0b2tlbiB9LCBkb2N1bWVudC51cmkpXHJcbiAgICAgICAgICAgICAgICAudGhlbihvdXRwdXQgPT4gb3V0cHV0LnN0ZG91dClcclxuICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tDYW5jZWxsYXRpb24oZG9jdW1lbnQuZmlsZU5hbWUsIHRlbXBGaWxlLCB0b2tlbikpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZWRpdG9yXzEuZ2V0VGV4dEVkaXRzRnJvbVBhdGNoKGRvY3VtZW50LmdldFRleHQoKSwgZGF0YSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tDYW5jZWxsYXRpb24oZG9jdW1lbnQuZmlsZU5hbWUsIHRlbXBGaWxlLCB0b2tlbikpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZW1wdHlcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlRXJyb3IodGhpcy5JZCwgZXJyb3IsIGRvY3VtZW50LnVyaSkuY2F0Y2goKCkgPT4geyB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGVkaXRzID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVsZXRlVGVtcEZpbGUoZG9jdW1lbnQuZmlsZU5hbWUsIHRlbXBGaWxlKS5pZ25vcmVFcnJvcnMoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlZGl0cztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZzY29kZS53aW5kb3cuc2V0U3RhdHVzQmFyTWVzc2FnZShgRm9ybWF0dGluZyB3aXRoICR7dGhpcy5JZH1gLCBwcm9taXNlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBoYW5kbGVFcnJvcihleHBlY3RlZEZpbGVOYW1lLCBlcnJvciwgcmVzb3VyY2UpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBsZXQgY3VzdG9tRXJyb3IgPSBgRm9ybWF0dGluZyB3aXRoICR7dGhpcy5JZH0gZmFpbGVkLmA7XHJcbiAgICAgICAgICAgIGlmIChoZWxwZXJzXzEuaXNOb3RJbnN0YWxsZWRFcnJvcihlcnJvcikpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGluc3RhbGxlciA9IHRoaXMuc2VydmljZUNvbnRhaW5lci5nZXQodHlwZXNfMy5JSW5zdGFsbGVyKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzSW5zdGFsbGVkID0geWllbGQgaW5zdGFsbGVyLmlzSW5zdGFsbGVkKHRoaXMucHJvZHVjdCwgcmVzb3VyY2UpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc0luc3RhbGxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUVycm9yICs9IGBcXG5Zb3UgY291bGQgZWl0aGVyIGluc3RhbGwgdGhlICcke3RoaXMuSWR9JyBmb3JtYXR0ZXIsIHR1cm4gaXQgb2ZmIG9yIHVzZSBhbm90aGVyIGZvcm1hdHRlci5gO1xyXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbGxlci5wcm9tcHRUb0luc3RhbGwodGhpcy5wcm9kdWN0LCByZXNvdXJjZSkuY2F0Y2goZXggPT4gY29uc29sZS5lcnJvcignUHl0aG9uIEV4dGVuc2lvbjogcHJvbXB0VG9JbnN0YWxsJywgZXgpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm91dHB1dENoYW5uZWwuYXBwZW5kTGluZShgXFxuJHtjdXN0b21FcnJvcn1cXG4ke2Vycm9yfWApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlVGVtcEZpbGUoZG9jdW1lbnQpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuaXNEaXJ0eVxyXG4gICAgICAgICAgICAgICAgPyBlZGl0b3JfMS5nZXRUZW1wRmlsZVdpdGhEb2N1bWVudENvbnRlbnRzKGRvY3VtZW50KVxyXG4gICAgICAgICAgICAgICAgOiBkb2N1bWVudC5maWxlTmFtZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGRlbGV0ZVRlbXBGaWxlKG9yaWdpbmFsRmlsZSwgdGVtcEZpbGUpIHtcclxuICAgICAgICBpZiAob3JpZ2luYWxGaWxlICE9PSB0ZW1wRmlsZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZnMudW5saW5rKHRlbXBGaWxlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgfVxyXG4gICAgY2hlY2tDYW5jZWxsYXRpb24ob3JpZ2luYWxGaWxlLCB0ZW1wRmlsZSwgdG9rZW4pIHtcclxuICAgICAgICBpZiAodG9rZW4gJiYgdG9rZW4uaXNDYW5jZWxsYXRpb25SZXF1ZXN0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5kZWxldGVUZW1wRmlsZShvcmlnaW5hbEZpbGUsIHRlbXBGaWxlKS5pZ25vcmVFcnJvcnMoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLkJhc2VGb3JtYXR0ZXIgPSBCYXNlRm9ybWF0dGVyO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1iYXNlRm9ybWF0dGVyLmpzLm1hcCJdfQ==