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

const contracts_1 = require("../../interpreter/contracts");

const types_1 = require("../../ioc/types");

const types_2 = require("../application/types");

require("../extensions");

const types_3 = require("../platform/types");

const types_4 = require("../types");

const condaActivationProvider_1 = require("./environmentActivationProviders/condaActivationProvider");

const types_5 = require("./types"); // Types of shells can be found here:
// 1. https://wiki.ubuntu.com/ChangingShells


const IS_GITBASH = /(gitbash.exe$)/i;
const IS_BASH = /(bash.exe$|bash$)/i;
const IS_WSL = /(wsl.exe$)/i;
const IS_ZSH = /(zsh$)/i;
const IS_KSH = /(ksh$)/i;
const IS_COMMAND = /cmd.exe$/i;
const IS_POWERSHELL = /(powershell.exe$|powershell$)/i;
const IS_POWERSHELL_CORE = /(pwsh.exe$|pwsh$)/i;
const IS_FISH = /(fish$)/i;
const IS_CSHELL = /(csh$)/i;
const IS_TCSHELL = /(tcsh$)/i;
let TerminalHelper = class TerminalHelper {
  constructor(serviceContainer) {
    this.serviceContainer = serviceContainer;
    this.detectableShells = new Map();
    this.detectableShells.set(types_5.TerminalShellType.powershell, IS_POWERSHELL);
    this.detectableShells.set(types_5.TerminalShellType.gitbash, IS_GITBASH);
    this.detectableShells.set(types_5.TerminalShellType.bash, IS_BASH);
    this.detectableShells.set(types_5.TerminalShellType.wsl, IS_WSL);
    this.detectableShells.set(types_5.TerminalShellType.zsh, IS_ZSH);
    this.detectableShells.set(types_5.TerminalShellType.ksh, IS_KSH);
    this.detectableShells.set(types_5.TerminalShellType.commandPrompt, IS_COMMAND);
    this.detectableShells.set(types_5.TerminalShellType.fish, IS_FISH);
    this.detectableShells.set(types_5.TerminalShellType.tcshell, IS_TCSHELL);
    this.detectableShells.set(types_5.TerminalShellType.cshell, IS_CSHELL);
    this.detectableShells.set(types_5.TerminalShellType.powershellCore, IS_POWERSHELL_CORE);
  }

  createTerminal(title) {
    const terminalManager = this.serviceContainer.get(types_2.ITerminalManager);
    return terminalManager.createTerminal({
      name: title
    });
  }

  identifyTerminalShell(shellPath) {
    return Array.from(this.detectableShells.keys()).reduce((matchedShell, shellToDetect) => {
      if (matchedShell === types_5.TerminalShellType.other && this.detectableShells.get(shellToDetect).test(shellPath)) {
        return shellToDetect;
      }

      return matchedShell;
    }, types_5.TerminalShellType.other);
  }

  getTerminalShellPath() {
    const workspace = this.serviceContainer.get(types_2.IWorkspaceService);
    const shellConfig = workspace.getConfiguration('terminal.integrated.shell');
    const platformService = this.serviceContainer.get(types_3.IPlatformService);
    let osSection = '';

    if (platformService.isWindows) {
      osSection = 'windows';
    } else if (platformService.isMac) {
      osSection = 'osx';
    } else if (platformService.isLinux) {
      osSection = 'linux';
    }

    if (osSection.length === 0) {
      return '';
    }

    return shellConfig.get(osSection);
  }

  buildCommandForTerminal(terminalShellType, command, args) {
    const isPowershell = terminalShellType === types_5.TerminalShellType.powershell || terminalShellType === types_5.TerminalShellType.powershellCore;
    const commandPrefix = isPowershell ? '& ' : '';
    return `${commandPrefix}${command.fileToCommandArgument()} ${args.join(' ')}`.trim();
  }

  getEnvironmentActivationCommands(terminalShellType, resource) {
    return __awaiter(this, void 0, void 0, function* () {
      const settings = this.serviceContainer.get(types_4.IConfigurationService).getSettings(resource);
      const activateEnvironment = settings.terminal.activateEnvironment;

      if (!activateEnvironment) {
        return;
      } // If we have a conda environment, then use that.


      const isCondaEnvironment = yield this.serviceContainer.get(contracts_1.ICondaService).isCondaEnvironment(settings.pythonPath);

      if (isCondaEnvironment) {
        const condaActivationProvider = new condaActivationProvider_1.CondaActivationCommandProvider(this.serviceContainer);
        const activationCommands = yield condaActivationProvider.getActivationCommands(resource, terminalShellType);

        if (Array.isArray(activationCommands)) {
          return activationCommands;
        }
      } // Search from the list of providers.


      const providers = this.serviceContainer.getAll(types_5.ITerminalActivationCommandProvider);
      const supportedProviders = providers.filter(provider => provider.isShellSupported(terminalShellType));

      for (const provider of supportedProviders) {
        const activationCommands = yield provider.getActivationCommands(resource, terminalShellType);

        if (Array.isArray(activationCommands)) {
          return activationCommands;
        }
      }
    });
  }

};
TerminalHelper = __decorate([inversify_1.injectable(), __param(0, inversify_1.inject(types_1.IServiceContainer))], TerminalHelper);
exports.TerminalHelper = TerminalHelper;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlbHBlci5qcyJdLCJuYW1lcyI6WyJfX2RlY29yYXRlIiwiZGVjb3JhdG9ycyIsInRhcmdldCIsImtleSIsImRlc2MiLCJjIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiciIsIk9iamVjdCIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImQiLCJSZWZsZWN0IiwiZGVjb3JhdGUiLCJpIiwiZGVmaW5lUHJvcGVydHkiLCJfX3BhcmFtIiwicGFyYW1JbmRleCIsImRlY29yYXRvciIsIl9fYXdhaXRlciIsInRoaXNBcmciLCJfYXJndW1lbnRzIiwiUCIsImdlbmVyYXRvciIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZnVsZmlsbGVkIiwidmFsdWUiLCJzdGVwIiwibmV4dCIsImUiLCJyZWplY3RlZCIsInJlc3VsdCIsImRvbmUiLCJ0aGVuIiwiYXBwbHkiLCJleHBvcnRzIiwiaW52ZXJzaWZ5XzEiLCJyZXF1aXJlIiwiY29udHJhY3RzXzEiLCJ0eXBlc18xIiwidHlwZXNfMiIsInR5cGVzXzMiLCJ0eXBlc180IiwiY29uZGFBY3RpdmF0aW9uUHJvdmlkZXJfMSIsInR5cGVzXzUiLCJJU19HSVRCQVNIIiwiSVNfQkFTSCIsIklTX1dTTCIsIklTX1pTSCIsIklTX0tTSCIsIklTX0NPTU1BTkQiLCJJU19QT1dFUlNIRUxMIiwiSVNfUE9XRVJTSEVMTF9DT1JFIiwiSVNfRklTSCIsIklTX0NTSEVMTCIsIklTX1RDU0hFTEwiLCJUZXJtaW5hbEhlbHBlciIsImNvbnN0cnVjdG9yIiwic2VydmljZUNvbnRhaW5lciIsImRldGVjdGFibGVTaGVsbHMiLCJNYXAiLCJzZXQiLCJUZXJtaW5hbFNoZWxsVHlwZSIsInBvd2Vyc2hlbGwiLCJnaXRiYXNoIiwiYmFzaCIsIndzbCIsInpzaCIsImtzaCIsImNvbW1hbmRQcm9tcHQiLCJmaXNoIiwidGNzaGVsbCIsImNzaGVsbCIsInBvd2Vyc2hlbGxDb3JlIiwiY3JlYXRlVGVybWluYWwiLCJ0aXRsZSIsInRlcm1pbmFsTWFuYWdlciIsImdldCIsIklUZXJtaW5hbE1hbmFnZXIiLCJuYW1lIiwiaWRlbnRpZnlUZXJtaW5hbFNoZWxsIiwic2hlbGxQYXRoIiwiQXJyYXkiLCJmcm9tIiwia2V5cyIsInJlZHVjZSIsIm1hdGNoZWRTaGVsbCIsInNoZWxsVG9EZXRlY3QiLCJvdGhlciIsInRlc3QiLCJnZXRUZXJtaW5hbFNoZWxsUGF0aCIsIndvcmtzcGFjZSIsIklXb3Jrc3BhY2VTZXJ2aWNlIiwic2hlbGxDb25maWciLCJnZXRDb25maWd1cmF0aW9uIiwicGxhdGZvcm1TZXJ2aWNlIiwiSVBsYXRmb3JtU2VydmljZSIsIm9zU2VjdGlvbiIsImlzV2luZG93cyIsImlzTWFjIiwiaXNMaW51eCIsImJ1aWxkQ29tbWFuZEZvclRlcm1pbmFsIiwidGVybWluYWxTaGVsbFR5cGUiLCJjb21tYW5kIiwiYXJncyIsImlzUG93ZXJzaGVsbCIsImNvbW1hbmRQcmVmaXgiLCJmaWxlVG9Db21tYW5kQXJndW1lbnQiLCJqb2luIiwidHJpbSIsImdldEVudmlyb25tZW50QWN0aXZhdGlvbkNvbW1hbmRzIiwicmVzb3VyY2UiLCJzZXR0aW5ncyIsIklDb25maWd1cmF0aW9uU2VydmljZSIsImdldFNldHRpbmdzIiwiYWN0aXZhdGVFbnZpcm9ubWVudCIsInRlcm1pbmFsIiwiaXNDb25kYUVudmlyb25tZW50IiwiSUNvbmRhU2VydmljZSIsInB5dGhvblBhdGgiLCJjb25kYUFjdGl2YXRpb25Qcm92aWRlciIsIkNvbmRhQWN0aXZhdGlvbkNvbW1hbmRQcm92aWRlciIsImFjdGl2YXRpb25Db21tYW5kcyIsImdldEFjdGl2YXRpb25Db21tYW5kcyIsImlzQXJyYXkiLCJwcm92aWRlcnMiLCJnZXRBbGwiLCJJVGVybWluYWxBY3RpdmF0aW9uQ29tbWFuZFByb3ZpZGVyIiwic3VwcG9ydGVkUHJvdmlkZXJzIiwiZmlsdGVyIiwicHJvdmlkZXIiLCJpc1NoZWxsU3VwcG9ydGVkIiwiaW5qZWN0YWJsZSIsImluamVjdCIsIklTZXJ2aWNlQ29u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Q0FBNkJsRixPQUFPLENBQUNtRixrQ0FBckMsQ0FBbEI7QUFDQSxZQUFNQyxrQkFBa0IsR0FBR0gsU0FBUyxDQUFDSSxNQUFWLENBQWlCQyxRQUFRLElBQUlBLFFBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEI3QixpQkFBMUIsQ0FBN0IsQ0FBM0I7O0FBQ0EsV0FBSyxNQUFNNEIsUUFBWCxJQUF1QkYsa0JBQXZCLEVBQTJDO0FBQ3ZDLGNBQU1OLGtCQUFrQixHQUFHLE1BQU1RLFFBQVEsQ0FBQ1AscUJBQVQsQ0FBK0JaLFFBQS9CLEVBQXlDVCxpQkFBekMsQ0FBakM7O0FBQ0EsWUFBSXBCLEtBQUssQ0FBQzBDLE9BQU4sQ0FBY0Ysa0JBQWQsQ0FBSixFQUF1QztBQUNuQyxpQkFBT0Esa0JBQVA7QUFDSDtBQUNKO0FBQ0osS0F4QmUsQ0FBaEI7QUF5Qkg7O0FBL0VxQyxDQUExQztBQWlGQWxFLGNBQWMsR0FBRzFELFVBQVUsQ0FBQyxDQUN4QnNDLFdBQVcsQ0FBQ2dHLFVBQVosRUFEd0IsRUFFeEJ0SCxPQUFPLENBQUMsQ0FBRCxFQUFJc0IsV0FBVyxDQUFDaUcsTUFBWixDQUFtQjlGLE9BQU8sQ0FBQytGLGlCQUEzQixDQUFKLENBRmlCLENBQUQsRUFHeEI5RSxjQUh3QixDQUEzQjtBQUlBckIsT0FBTyxDQUFDcUIsY0FBUixHQUF5QkEsY0FBekIiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxudmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufTtcclxudmFyIF9fcGFyYW0gPSAodGhpcyAmJiB0aGlzLl9fcGFyYW0pIHx8IGZ1bmN0aW9uIChwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59O1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IGludmVyc2lmeV8xID0gcmVxdWlyZShcImludmVyc2lmeVwiKTtcclxuY29uc3QgY29udHJhY3RzXzEgPSByZXF1aXJlKFwiLi4vLi4vaW50ZXJwcmV0ZXIvY29udHJhY3RzXCIpO1xyXG5jb25zdCB0eXBlc18xID0gcmVxdWlyZShcIi4uLy4uL2lvYy90eXBlc1wiKTtcclxuY29uc3QgdHlwZXNfMiA9IHJlcXVpcmUoXCIuLi9hcHBsaWNhdGlvbi90eXBlc1wiKTtcclxucmVxdWlyZShcIi4uL2V4dGVuc2lvbnNcIik7XHJcbmNvbnN0IHR5cGVzXzMgPSByZXF1aXJlKFwiLi4vcGxhdGZvcm0vdHlwZXNcIik7XHJcbmNvbnN0IHR5cGVzXzQgPSByZXF1aXJlKFwiLi4vdHlwZXNcIik7XHJcbmNvbnN0IGNvbmRhQWN0aXZhdGlvblByb3ZpZGVyXzEgPSByZXF1aXJlKFwiLi9lbnZpcm9ubWVudEFjdGl2YXRpb25Qcm92aWRlcnMvY29uZGFBY3RpdmF0aW9uUHJvdmlkZXJcIik7XHJcbmNvbnN0IHR5cGVzXzUgPSByZXF1aXJlKFwiLi90eXBlc1wiKTtcclxuLy8gVHlwZXMgb2Ygc2hlbGxzIGNhbiBiZSBmb3VuZCBoZXJlOlxyXG4vLyAxLiBodHRwczovL3dpa2kudWJ1bnR1LmNvbS9DaGFuZ2luZ1NoZWxsc1xyXG5jb25zdCBJU19HSVRCQVNIID0gLyhnaXRiYXNoLmV4ZSQpL2k7XHJcbmNvbnN0IElTX0JBU0ggPSAvKGJhc2guZXhlJHxiYXNoJCkvaTtcclxuY29uc3QgSVNfV1NMID0gLyh3c2wuZXhlJCkvaTtcclxuY29uc3QgSVNfWlNIID0gLyh6c2gkKS9pO1xyXG5jb25zdCBJU19LU0ggPSAvKGtzaCQpL2k7XHJcbmNvbnN0IElTX0NPTU1BTkQgPSAvY21kLmV4ZSQvaTtcclxuY29uc3QgSVNfUE9XRVJTSEVMTCA9IC8ocG93ZXJzaGVsbC5leGUkfHBvd2Vyc2hlbGwkKS9pO1xyXG5jb25zdCBJU19QT1dFUlNIRUxMX0NPUkUgPSAvKHB3c2guZXhlJHxwd3NoJCkvaTtcclxuY29uc3QgSVNfRklTSCA9IC8oZmlzaCQpL2k7XHJcbmNvbnN0IElTX0NTSEVMTCA9IC8oY3NoJCkvaTtcclxuY29uc3QgSVNfVENTSEVMTCA9IC8odGNzaCQpL2k7XHJcbmxldCBUZXJtaW5hbEhlbHBlciA9IGNsYXNzIFRlcm1pbmFsSGVscGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKHNlcnZpY2VDb250YWluZXIpIHtcclxuICAgICAgICB0aGlzLnNlcnZpY2VDb250YWluZXIgPSBzZXJ2aWNlQ29udGFpbmVyO1xyXG4gICAgICAgIHRoaXMuZGV0ZWN0YWJsZVNoZWxscyA9IG5ldyBNYXAoKTtcclxuICAgICAgICB0aGlzLmRldGVjdGFibGVTaGVsbHMuc2V0KHR5cGVzXzUuVGVybWluYWxTaGVsbFR5cGUucG93ZXJzaGVsbCwgSVNfUE9XRVJTSEVMTCk7XHJcbiAgICAgICAgdGhpcy5kZXRlY3RhYmxlU2hlbGxzLnNldCh0eXBlc181LlRlcm1pbmFsU2hlbGxUeXBlLmdpdGJhc2gsIElTX0dJVEJBU0gpO1xyXG4gICAgICAgIHRoaXMuZGV0ZWN0YWJsZVNoZWxscy5zZXQodHlwZXNfNS5UZXJtaW5hbFNoZWxsVHlwZS5iYXNoLCBJU19CQVNIKTtcclxuICAgICAgICB0aGlzLmRldGVjdGFibGVTaGVsbHMuc2V0KHR5cGVzXzUuVGVybWluYWxTaGVsbFR5cGUud3NsLCBJU19XU0wpO1xyXG4gICAgICAgIHRoaXMuZGV0ZWN0YWJsZVNoZWxscy5zZXQodHlwZXNfNS5UZXJtaW5hbFNoZWxsVHlwZS56c2gsIElTX1pTSCk7XHJcbiAgICAgICAgdGhpcy5kZXRlY3RhYmxlU2hlbGxzLnNldCh0eXBlc181LlRlcm1pbmFsU2hlbGxUeXBlLmtzaCwgSVNfS1NIKTtcclxuICAgICAgICB0aGlzLmRldGVjdGFibGVTaGVsbHMuc2V0KHR5cGVzXzUuVGVybWluYWxTaGVsbFR5cGUuY29tbWFuZFByb21wdCwgSVNfQ09NTUFORCk7XHJcbiAgICAgICAgdGhpcy5kZXRlY3RhYmxlU2hlbGxzLnNldCh0eXBlc181LlRlcm1pbmFsU2hlbGxUeXBlLmZpc2gsIElTX0ZJU0gpO1xyXG4gICAgICAgIHRoaXMuZGV0ZWN0YWJsZVNoZWxscy5zZXQodHlwZXNfNS5UZXJtaW5hbFNoZWxsVHlwZS50Y3NoZWxsLCBJU19UQ1NIRUxMKTtcclxuICAgICAgICB0aGlzLmRldGVjdGFibGVTaGVsbHMuc2V0KHR5cGVzXzUuVGVybWluYWxTaGVsbFR5cGUuY3NoZWxsLCBJU19DU0hFTEwpO1xyXG4gICAgICAgIHRoaXMuZGV0ZWN0YWJsZVNoZWxscy5zZXQodHlwZXNfNS5UZXJtaW5hbFNoZWxsVHlwZS5wb3dlcnNoZWxsQ29yZSwgSVNfUE9XRVJTSEVMTF9DT1JFKTtcclxuICAgIH1cclxuICAgIGNyZWF0ZVRlcm1pbmFsKHRpdGxlKSB7XHJcbiAgICAgICAgY29uc3QgdGVybWluYWxNYW5hZ2VyID0gdGhpcy5zZXJ2aWNlQ29udGFpbmVyLmdldCh0eXBlc18yLklUZXJtaW5hbE1hbmFnZXIpO1xyXG4gICAgICAgIHJldHVybiB0ZXJtaW5hbE1hbmFnZXIuY3JlYXRlVGVybWluYWwoeyBuYW1lOiB0aXRsZSB9KTtcclxuICAgIH1cclxuICAgIGlkZW50aWZ5VGVybWluYWxTaGVsbChzaGVsbFBhdGgpIHtcclxuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLmRldGVjdGFibGVTaGVsbHMua2V5cygpKVxyXG4gICAgICAgICAgICAucmVkdWNlKChtYXRjaGVkU2hlbGwsIHNoZWxsVG9EZXRlY3QpID0+IHtcclxuICAgICAgICAgICAgaWYgKG1hdGNoZWRTaGVsbCA9PT0gdHlwZXNfNS5UZXJtaW5hbFNoZWxsVHlwZS5vdGhlciAmJiB0aGlzLmRldGVjdGFibGVTaGVsbHMuZ2V0KHNoZWxsVG9EZXRlY3QpLnRlc3Qoc2hlbGxQYXRoKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNoZWxsVG9EZXRlY3Q7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG1hdGNoZWRTaGVsbDtcclxuICAgICAgICB9LCB0eXBlc181LlRlcm1pbmFsU2hlbGxUeXBlLm90aGVyKTtcclxuICAgIH1cclxuICAgIGdldFRlcm1pbmFsU2hlbGxQYXRoKCkge1xyXG4gICAgICAgIGNvbnN0IHdvcmtzcGFjZSA9IHRoaXMuc2VydmljZUNvbnRhaW5lci5nZXQodHlwZXNfMi5JV29ya3NwYWNlU2VydmljZSk7XHJcbiAgICAgICAgY29uc3Qgc2hlbGxDb25maWcgPSB3b3Jrc3BhY2UuZ2V0Q29uZmlndXJhdGlvbigndGVybWluYWwuaW50ZWdyYXRlZC5zaGVsbCcpO1xyXG4gICAgICAgIGNvbnN0IHBsYXRmb3JtU2VydmljZSA9IHRoaXMuc2VydmljZUNvbnRhaW5lci5nZXQodHlwZXNfMy5JUGxhdGZvcm1TZXJ2aWNlKTtcclxuICAgICAgICBsZXQgb3NTZWN0aW9uID0gJyc7XHJcbiAgICAgICAgaWYgKHBsYXRmb3JtU2VydmljZS5pc1dpbmRvd3MpIHtcclxuICAgICAgICAgICAgb3NTZWN0aW9uID0gJ3dpbmRvd3MnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChwbGF0Zm9ybVNlcnZpY2UuaXNNYWMpIHtcclxuICAgICAgICAgICAgb3NTZWN0aW9uID0gJ29zeCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHBsYXRmb3JtU2VydmljZS5pc0xpbnV4KSB7XHJcbiAgICAgICAgICAgIG9zU2VjdGlvbiA9ICdsaW51eCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvc1NlY3Rpb24ubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNoZWxsQ29uZmlnLmdldChvc1NlY3Rpb24pO1xyXG4gICAgfVxyXG4gICAgYnVpbGRDb21tYW5kRm9yVGVybWluYWwodGVybWluYWxTaGVsbFR5cGUsIGNvbW1hbmQsIGFyZ3MpIHtcclxuICAgICAgICBjb25zdCBpc1Bvd2Vyc2hlbGwgPSB0ZXJtaW5hbFNoZWxsVHlwZSA9PT0gdHlwZXNfNS5UZXJtaW5hbFNoZWxsVHlwZS5wb3dlcnNoZWxsIHx8IHRlcm1pbmFsU2hlbGxUeXBlID09PSB0eXBlc181LlRlcm1pbmFsU2hlbGxUeXBlLnBvd2Vyc2hlbGxDb3JlO1xyXG4gICAgICAgIGNvbnN0IGNvbW1hbmRQcmVmaXggPSBpc1Bvd2Vyc2hlbGwgPyAnJiAnIDogJyc7XHJcbiAgICAgICAgcmV0dXJuIGAke2NvbW1hbmRQcmVmaXh9JHtjb21tYW5kLmZpbGVUb0NvbW1hbmRBcmd1bWVudCgpfSAke2FyZ3Muam9pbignICcpfWAudHJpbSgpO1xyXG4gICAgfVxyXG4gICAgZ2V0RW52aXJvbm1lbnRBY3RpdmF0aW9uQ29tbWFuZHModGVybWluYWxTaGVsbFR5cGUsIHJlc291cmNlKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSB0aGlzLnNlcnZpY2VDb250YWluZXIuZ2V0KHR5cGVzXzQuSUNvbmZpZ3VyYXRpb25TZXJ2aWNlKS5nZXRTZXR0aW5ncyhyZXNvdXJjZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGFjdGl2YXRlRW52aXJvbm1lbnQgPSBzZXR0aW5ncy50ZXJtaW5hbC5hY3RpdmF0ZUVudmlyb25tZW50O1xyXG4gICAgICAgICAgICBpZiAoIWFjdGl2YXRlRW52aXJvbm1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBJZiB3ZSBoYXZlIGEgY29uZGEgZW52aXJvbm1lbnQsIHRoZW4gdXNlIHRoYXQuXHJcbiAgICAgICAgICAgIGNvbnN0IGlzQ29uZGFFbnZpcm9ubWVudCA9IHlpZWxkIHRoaXMuc2VydmljZUNvbnRhaW5lci5nZXQoY29udHJhY3RzXzEuSUNvbmRhU2VydmljZSkuaXNDb25kYUVudmlyb25tZW50KHNldHRpbmdzLnB5dGhvblBhdGgpO1xyXG4gICAgICAgICAgICBpZiAoaXNDb25kYUVudmlyb25tZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb25kYUFjdGl2YXRpb25Qcm92aWRlciA9IG5ldyBjb25kYUFjdGl2YXRpb25Qcm92aWRlcl8xLkNvbmRhQWN0aXZhdGlvbkNvbW1hbmRQcm92aWRlcih0aGlzLnNlcnZpY2VDb250YWluZXIpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aXZhdGlvbkNvbW1hbmRzID0geWllbGQgY29uZGFBY3RpdmF0aW9uUHJvdmlkZXIuZ2V0QWN0aXZhdGlvbkNvbW1hbmRzKHJlc291cmNlLCB0ZXJtaW5hbFNoZWxsVHlwZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShhY3RpdmF0aW9uQ29tbWFuZHMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGl2YXRpb25Db21tYW5kcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBTZWFyY2ggZnJvbSB0aGUgbGlzdCBvZiBwcm92aWRlcnMuXHJcbiAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVycyA9IHRoaXMuc2VydmljZUNvbnRhaW5lci5nZXRBbGwodHlwZXNfNS5JVGVybWluYWxBY3RpdmF0aW9uQ29tbWFuZFByb3ZpZGVyKTtcclxuICAgICAgICAgICAgY29uc3Qgc3VwcG9ydGVkUHJvdmlkZXJzID0gcHJvdmlkZXJzLmZpbHRlcihwcm92aWRlciA9PiBwcm92aWRlci5pc1NoZWxsU3VwcG9ydGVkKHRlcm1pbmFsU2hlbGxUeXBlKSk7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgcHJvdmlkZXIgb2Ygc3VwcG9ydGVkUHJvdmlkZXJzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmF0aW9uQ29tbWFuZHMgPSB5aWVsZCBwcm92aWRlci5nZXRBY3RpdmF0aW9uQ29tbWFuZHMocmVzb3VyY2UsIHRlcm1pbmFsU2hlbGxUeXBlKTtcclxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGFjdGl2YXRpb25Db21tYW5kcykpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aXZhdGlvbkNvbW1hbmRzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn07XHJcblRlcm1pbmFsSGVscGVyID0gX19kZWNvcmF0ZShbXHJcbiAgICBpbnZlcnNpZnlfMS5pbmplY3RhYmxlKCksXHJcbiAgICBfX3BhcmFtKDAsIGludmVyc2lmeV8xLmluamVjdCh0eXBlc18xLklTZXJ2aWNlQ29udGFpbmVyKSlcclxuXSwgVGVybWluYWxIZWxwZXIpO1xyXG5leHBvcnRzLlRlcm1pbmFsSGVscGVyID0gVGVybWluYWxIZWxwZXI7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWhlbHBlci5qcy5tYXAiXX0=