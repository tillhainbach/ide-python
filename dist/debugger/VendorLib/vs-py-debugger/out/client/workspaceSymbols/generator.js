"use strict";

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

const fs = require("fs");

const path = require("path");

const vscode_1 = require("vscode");

const configSettings_1 = require("../common/configSettings");

const telemetry_1 = require("../telemetry");

const constants_1 = require("../telemetry/constants");

class Generator {
  constructor(workspaceFolder, output, processServiceFactory) {
    this.workspaceFolder = workspaceFolder;
    this.output = output;
    this.processServiceFactory = processServiceFactory;
    this.disposables = [];
    this.optionsFile = path.join(__dirname, '..', '..', '..', 'resources', 'ctagOptions');
    this.pythonSettings = configSettings_1.PythonSettings.getInstance(workspaceFolder);
  }

  get tagFilePath() {
    return this.pythonSettings.workspaceSymbols.tagFilePath;
  }

  get enabled() {
    return this.pythonSettings.workspaceSymbols.enabled;
  }

  dispose() {
    this.disposables.forEach(d => d.dispose());
  }

  generateWorkspaceTags() {
    return __awaiter(this, void 0, void 0, function* () {
      if (!this.pythonSettings.workspaceSymbols.enabled) {
        return;
      }

      return this.generateTags({
        directory: this.workspaceFolder.fsPath
      });
    });
  }

  buildCmdArgs() {
    const exclusions = this.pythonSettings.workspaceSymbols.exclusionPatterns;
    const excludes = exclusions.length === 0 ? [] : exclusions.map(pattern => `--exclude=${pattern}`);
    return [`--options=${this.optionsFile}`, '--languages=Python'].concat(excludes);
  }

  generateTags(source) {
    const tagFile = path.normalize(this.pythonSettings.workspaceSymbols.tagFilePath);
    const cmd = this.pythonSettings.workspaceSymbols.ctagsPath;
    const args = this.buildCmdArgs();
    let outputFile = tagFile;

    if (source.file && source.file.length > 0) {
      source.directory = path.dirname(source.file);
    }

    if (path.dirname(outputFile) === source.directory) {
      outputFile = path.basename(outputFile);
    }

    const outputDir = path.dirname(outputFile);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    args.push('-o', outputFile, '.');
    this.output.appendLine(`${'-'.repeat(10)}Generating Tags${'-'.repeat(10)}`);
    this.output.appendLine(`${cmd} ${args.join(' ')}`);
    const promise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
      const processService = yield this.processServiceFactory.create();
      const result = processService.execObservable(cmd, args, {
        cwd: source.directory
      });
      let errorMsg = '';
      result.out.subscribe(output => {
        if (output.source === 'stderr') {
          errorMsg += output.out;
        }

        this.output.append(output.out);
      }, reject, () => {
        if (errorMsg.length > 0) {
          reject(new Error(errorMsg));
        } else {
          resolve();
        }
      });
    }));
    vscode_1.window.setStatusBarMessage('Generating Tags', promise);
    return promise;
  }

}

__decorate([telemetry_1.captureTelemetry(constants_1.WORKSPACE_SYMBOLS_BUILD)], Generator.prototype, "generateTags", null);

exports.Generator = Generator;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdlbmVyYXRvci5qcyJdLCJuYW1lcyI6WyJfX2RlY29yYXRlIiwiZGVjb3JhdG9ycyIsInRhcmdldCIsImtleSIsImRlc2MiLCJjIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiciIsIk9iamVjdCIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImQiLCJSZWZsZWN0IiwiZGVjb3JhdGUiLCJpIiwiZGVmaW5lUHJvcGVydHkiLCJfX2F3YWl0ZXIiLCJ0aGlzQXJnIiwiX2FyZ3VtZW50cyIsIlAiLCJnZW5lcmF0b3IiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImZ1bGZpbGxlZCIsInZhbHVlIiwic3RlcCIsIm5leHQiLCJlIiwicmVqZWN0ZWQiLCJyZXN1bHQiLCJkb25lIiwidGhlbiIsImFwcGx5IiwiZXhwb3J0cyIsImZzIiwicmVxdWlyZSIsInBhdGgiLCJ2c2NvZGVfMSIsImNvbmZpZ1NldHRpbmdzXzEiLCJ0ZWxlbWV0cnlfMSIsImNvbnN0YW50c18xIiwiR2VuZXJhdG9yIiwiY29uc3RydWN0b3IiLCJ3b3Jrc3BhY2VGb2xkZXIiLCJvdXRwdXQiLCJwcm9jZXNzU2VydmljZUZhY3RvcnkiLCJkaXNwb3NhYmxlcyIsIm9wdGlvbnNGaWxlIiwiam9pbiIsIl9fZGlybmFtZSIsInB5dGhvblNldHRpbmdzIiwiUHl0aG9uU2V0dGluZ3MiLCJnZXRJbnN0YW5jZSIsInRhZ0ZpbGVQYXRoIiwid29ya3NwYWNlU3ltYm9scyIsImVuYWJsZWQiLCJkaXNwb3NlIiwiZm9yRWFjaCIsImdlbmVyYXRlV29ya3NwYWNlVGFncyIsImdlbmVyYXRlVGFncyIsImRpcmVjdG9yeSIsImZzUGF0aCIsImJ1aWxkQ21kQXJncyIsImV4Y2x1c2lvbnMiLCJleGNsdXNpb25QYXR0ZXJucyIsImV4Y2x1ZGVzIiwibWFwIiwicGF0dGVybiIsImNvbmNhdCIsInNvdXJjZSIsInRhZ0ZpbGUiLCJub3JtYWxpemUiLCJjbWQiLCJjdGFnc1BhdGgiLCJhcmdzIiwib3V0cHV0RmlsZSIsImZpbGUiLCJkaXJuYW1lIiwiYmFzZW5hbWUiLCJvdXRwdXREaXIiLCJleGlzdHNTeW5jIiwibWtkaXJTeW5jIiwicHVzaCIsImFwcGVuZExpbmUiLCJyZXBlYXQiLCJwcm9taXNlIiwicHJvY2Vzc1NlcnZpY2UiLCJjcmVhdGUiLCJleGVjT2JzZXJ2YWJsZSIsImN3ZCIsImVycm9yTXNnIiwib3V0Iiwic3Vic2NyaWJlIiwiYXBwZW5kIiwiRXJyb3IiLCJ3aW5kb3ciLCJzZXRTdGF0dXNCYXJNZXNzYWdlIiwiY2FwdHVyZVRlbGVtZXRyeSIsIldPUktTUEFDRV9TWU1CT0xTX0JVSUxEIiwicHJvdG90eXBlIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFDQSxJQUFJQSxVQUFVLEdBQUksVUFBUSxTQUFLQSxVQUFkLElBQTZCLFVBQVVDLFVBQVYsRUFBc0JDLE1BQXRCLEVBQThCQyxHQUE5QixFQUFtQ0MsSUFBbkMsRUFBeUM7QUFDbkYsTUFBSUMsQ0FBQyxHQUFHQyxTQUFTLENBQUNDLE1BQWxCO0FBQUEsTUFBMEJDLENBQUMsR0FBR0gsQ0FBQyxHQUFHLENBQUosR0FBUUgsTUFBUixHQUFpQkUsSUFBSSxLQUFLLElBQVQsR0FBZ0JBLElBQUksR0FBR0ssTUFBTSxDQUFDQyx3QkFBUCxDQUFnQ1IsTUFBaEMsRUFBd0NDLEdBQXhDLENBQXZCLEdBQXNFQyxJQUFySDtBQUFBLE1BQTJITyxDQUEzSDtBQUNBLE1BQUksT0FBT0MsT0FBUCxLQUFtQixRQUFuQixJQUErQixPQUFPQSxPQUFPLENBQUNDLFFBQWYsS0FBNEIsVUFBL0QsRUFBMkVMLENBQUMsR0FBR0ksT0FBTyxDQUFDQyxRQUFSLENBQWlCWixVQUFqQixFQUE2QkMsTUFBN0IsRUFBcUNDLEdBQXJDLEVBQTBDQyxJQUExQyxDQUFKLENBQTNFLEtBQ0ssS0FBSyxJQUFJVSxDQUFDLEdBQUdiLFVBQVUsQ0FBQ00sTUFBWCxHQUFvQixDQUFqQyxFQUFvQ08sQ0FBQyxJQUFJLENBQXpDLEVBQTRDQSxDQUFDLEVBQTdDLEVBQWlELElBQUlILENB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SUFBSXdFLEtBQUosQ0FBVUosUUFBVixDQUFELENBQU47QUFDSCxTQUZELE1BR0s7QUFDRHJFLFVBQUFBLE9BQU87QUFDVjtBQUNKLE9BWkQ7QUFhSCxLQWpCeUQsQ0FBMUMsQ0FBaEI7QUFrQkFnQixJQUFBQSxRQUFRLENBQUMwRCxNQUFULENBQWdCQyxtQkFBaEIsQ0FBb0MsaUJBQXBDLEVBQXVEWCxPQUF2RDtBQUNBLFdBQU9BLE9BQVA7QUFDSDs7QUFyRVc7O0FBdUVoQnRGLFVBQVUsQ0FBQyxDQUNQd0MsV0FBVyxDQUFDMEQsZ0JBQVosQ0FBNkJ6RCxXQUFXLENBQUMwRCx1QkFBekMsQ0FETyxDQUFELEVBRVB6RCxTQUFTLENBQUMwRCxTQUZILEVBRWMsY0FGZCxFQUU4QixJQUY5QixDQUFWOztBQUdBbEUsT0FBTyxDQUFDUSxTQUFSLEdBQW9CQSxTQUFwQiIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59O1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IGZzID0gcmVxdWlyZShcImZzXCIpO1xyXG5jb25zdCBwYXRoID0gcmVxdWlyZShcInBhdGhcIik7XHJcbmNvbnN0IHZzY29kZV8xID0gcmVxdWlyZShcInZzY29kZVwiKTtcclxuY29uc3QgY29uZmlnU2V0dGluZ3NfMSA9IHJlcXVpcmUoXCIuLi9jb21tb24vY29uZmlnU2V0dGluZ3NcIik7XHJcbmNvbnN0IHRlbGVtZXRyeV8xID0gcmVxdWlyZShcIi4uL3RlbGVtZXRyeVwiKTtcclxuY29uc3QgY29uc3RhbnRzXzEgPSByZXF1aXJlKFwiLi4vdGVsZW1ldHJ5L2NvbnN0YW50c1wiKTtcclxuY2xhc3MgR2VuZXJhdG9yIHtcclxuICAgIGNvbnN0cnVjdG9yKHdvcmtzcGFjZUZvbGRlciwgb3V0cHV0LCBwcm9jZXNzU2VydmljZUZhY3RvcnkpIHtcclxuICAgICAgICB0aGlzLndvcmtzcGFjZUZvbGRlciA9IHdvcmtzcGFjZUZvbGRlcjtcclxuICAgICAgICB0aGlzLm91dHB1dCA9IG91dHB1dDtcclxuICAgICAgICB0aGlzLnByb2Nlc3NTZXJ2aWNlRmFjdG9yeSA9IHByb2Nlc3NTZXJ2aWNlRmFjdG9yeTtcclxuICAgICAgICB0aGlzLmRpc3Bvc2FibGVzID0gW107XHJcbiAgICAgICAgdGhpcy5vcHRpb25zRmlsZSA9IHBhdGguam9pbihfX2Rpcm5hbWUsICcuLicsICcuLicsICcuLicsICdyZXNvdXJjZXMnLCAnY3RhZ09wdGlvbnMnKTtcclxuICAgICAgICB0aGlzLnB5dGhvblNldHRpbmdzID0gY29uZmlnU2V0dGluZ3NfMS5QeXRob25TZXR0aW5ncy5nZXRJbnN0YW5jZSh3b3Jrc3BhY2VGb2xkZXIpO1xyXG4gICAgfVxyXG4gICAgZ2V0IHRhZ0ZpbGVQYXRoKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnB5dGhvblNldHRpbmdzLndvcmtzcGFjZVN5bWJvbHMudGFnRmlsZVBhdGg7XHJcbiAgICB9XHJcbiAgICBnZXQgZW5hYmxlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5weXRob25TZXR0aW5ncy53b3Jrc3BhY2VTeW1ib2xzLmVuYWJsZWQ7XHJcbiAgICB9XHJcbiAgICBkaXNwb3NlKCkge1xyXG4gICAgICAgIHRoaXMuZGlzcG9zYWJsZXMuZm9yRWFjaChkID0+IGQuZGlzcG9zZSgpKTtcclxuICAgIH1cclxuICAgIGdlbmVyYXRlV29ya3NwYWNlVGFncygpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMucHl0aG9uU2V0dGluZ3Mud29ya3NwYWNlU3ltYm9scy5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVUYWdzKHsgZGlyZWN0b3J5OiB0aGlzLndvcmtzcGFjZUZvbGRlci5mc1BhdGggfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBidWlsZENtZEFyZ3MoKSB7XHJcbiAgICAgICAgY29uc3QgZXhjbHVzaW9ucyA9IHRoaXMucHl0aG9uU2V0dGluZ3Mud29ya3NwYWNlU3ltYm9scy5leGNsdXNpb25QYXR0ZXJucztcclxuICAgICAgICBjb25zdCBleGNsdWRlcyA9IGV4Y2x1c2lvbnMubGVuZ3RoID09PSAwID8gW10gOiBleGNsdXNpb25zLm1hcChwYXR0ZXJuID0+IGAtLWV4Y2x1ZGU9JHtwYXR0ZXJufWApO1xyXG4gICAgICAgIHJldHVybiBbYC0tb3B0aW9ucz0ke3RoaXMub3B0aW9uc0ZpbGV9YCwgJy0tbGFuZ3VhZ2VzPVB5dGhvbiddLmNvbmNhdChleGNsdWRlcyk7XHJcbiAgICB9XHJcbiAgICBnZW5lcmF0ZVRhZ3Moc291cmNlKSB7XHJcbiAgICAgICAgY29uc3QgdGFnRmlsZSA9IHBhdGgubm9ybWFsaXplKHRoaXMucHl0aG9uU2V0dGluZ3Mud29ya3NwYWNlU3ltYm9scy50YWdGaWxlUGF0aCk7XHJcbiAgICAgICAgY29uc3QgY21kID0gdGhpcy5weXRob25TZXR0aW5ncy53b3Jrc3BhY2VTeW1ib2xzLmN0YWdzUGF0aDtcclxuICAgICAgICBjb25zdCBhcmdzID0gdGhpcy5idWlsZENtZEFyZ3MoKTtcclxuICAgICAgICBsZXQgb3V0cHV0RmlsZSA9IHRhZ0ZpbGU7XHJcbiAgICAgICAgaWYgKHNvdXJjZS5maWxlICYmIHNvdXJjZS5maWxlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgc291cmNlLmRpcmVjdG9yeSA9IHBhdGguZGlybmFtZShzb3VyY2UuZmlsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYXRoLmRpcm5hbWUob3V0cHV0RmlsZSkgPT09IHNvdXJjZS5kaXJlY3RvcnkpIHtcclxuICAgICAgICAgICAgb3V0cHV0RmlsZSA9IHBhdGguYmFzZW5hbWUob3V0cHV0RmlsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG91dHB1dERpciA9IHBhdGguZGlybmFtZShvdXRwdXRGaWxlKTtcclxuICAgICAgICBpZiAoIWZzLmV4aXN0c1N5bmMob3V0cHV0RGlyKSkge1xyXG4gICAgICAgICAgICBmcy5ta2RpclN5bmMob3V0cHV0RGlyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYXJncy5wdXNoKCctbycsIG91dHB1dEZpbGUsICcuJyk7XHJcbiAgICAgICAgdGhpcy5vdXRwdXQuYXBwZW5kTGluZShgJHsnLScucmVwZWF0KDEwKX1HZW5lcmF0aW5nIFRhZ3MkeyctJy5yZXBlYXQoMTApfWApO1xyXG4gICAgICAgIHRoaXMub3V0cHV0LmFwcGVuZExpbmUoYCR7Y21kfSAke2FyZ3Muam9pbignICcpfWApO1xyXG4gICAgICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb2Nlc3NTZXJ2aWNlID0geWllbGQgdGhpcy5wcm9jZXNzU2VydmljZUZhY3RvcnkuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHByb2Nlc3NTZXJ2aWNlLmV4ZWNPYnNlcnZhYmxlKGNtZCwgYXJncywgeyBjd2Q6IHNvdXJjZS5kaXJlY3RvcnkgfSk7XHJcbiAgICAgICAgICAgIGxldCBlcnJvck1zZyA9ICcnO1xyXG4gICAgICAgICAgICByZXN1bHQub3V0LnN1YnNjcmliZShvdXRwdXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKG91dHB1dC5zb3VyY2UgPT09ICdzdGRlcnInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JNc2cgKz0gb3V0cHV0Lm91dDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMub3V0cHV0LmFwcGVuZChvdXRwdXQub3V0KTtcclxuICAgICAgICAgICAgfSwgcmVqZWN0LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3JNc2cubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoZXJyb3JNc2cpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIHZzY29kZV8xLndpbmRvdy5zZXRTdGF0dXNCYXJNZXNzYWdlKCdHZW5lcmF0aW5nIFRhZ3MnLCBwcm9taXNlKTtcclxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgIH1cclxufVxyXG5fX2RlY29yYXRlKFtcclxuICAgIHRlbGVtZXRyeV8xLmNhcHR1cmVUZWxlbWV0cnkoY29uc3RhbnRzXzEuV09SS1NQQUNFX1NZTUJPTFNfQlVJTEQpXHJcbl0sIEdlbmVyYXRvci5wcm90b3R5cGUsIFwiZ2VuZXJhdGVUYWdzXCIsIG51bGwpO1xyXG5leHBvcnRzLkdlbmVyYXRvciA9IEdlbmVyYXRvcjtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Z2VuZXJhdG9yLmpzLm1hcCJdfQ==