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

const types_1 = require("./application/types");

const browser_1 = require("./net/browser");

const types_2 = require("./types");

const deprecatedFeatures = [{
  doNotDisplayPromptStateKey: 'SHOW_DEPRECATED_FEATURE_PROMPT_FORMAT_ON_SAVE',
  message: 'The setting \'python.formatting.formatOnSave\' is deprecated, please use \'editor.formatOnSave\'.',
  moreInfoUrl: 'https://github.com/Microsoft/vscode-python/issues/309',
  setting: {
    setting: 'formatting.formatOnSave',
    values: ['true', true]
  }
}, {
  doNotDisplayPromptStateKey: 'SHOW_DEPRECATED_FEATURE_PROMPT_LINT_ON_TEXT_CHANGE',
  message: 'The setting \'python.linting.lintOnTextChange\' is deprecated, please enable \'python.linting.lintOnSave\' and \'files.autoSave\'.',
  moreInfoUrl: 'https://github.com/Microsoft/vscode-python/issues/313',
  setting: {
    setting: 'linting.lintOnTextChange',
    values: ['true', true]
  }
}, {
  doNotDisplayPromptStateKey: 'SHOW_DEPRECATED_FEATURE_PROMPT_FOR_AUTO_COMPLETE_PRELOAD_MODULES',
  message: 'The setting \'python.autoComplete.preloadModules\' is deprecated, please consider using the new Language Server (\'python.jediEnabled = false\').',
  moreInfoUrl: 'https://github.com/Microsoft/vscode-python/issues/1704',
  setting: {
    setting: 'autoComplete.preloadModules'
  }
}];
let FeatureDeprecationManager = class FeatureDeprecationManager {
  constructor(persistentStateFactory, cmdMgr, workspace, appShell) {
    this.persistentStateFactory = persistentStateFactory;
    this.cmdMgr = cmdMgr;
    this.workspace = workspace;
    this.appShell = appShell;
    this.disposables = [];
  }

  dispose() {
    this.disposables.forEach(disposable => disposable.dispose());
  }

  initialize() {
    deprecatedFeatures.forEach(this.registerDeprecation.bind(this));
  }

  registerDeprecation(deprecatedInfo) {
    if (Array.isArray(deprecatedInfo.commands)) {
      deprecatedInfo.commands.forEach(cmd => {
        this.disposables.push(this.cmdMgr.registerCommand(cmd, () => this.notifyDeprecation(deprecatedInfo), this));
      });
    }

    if (deprecatedInfo.setting) {
      this.checkAndNotifyDeprecatedSetting(deprecatedInfo);
    }
  }

  notifyDeprecation(deprecatedInfo) {
    return __awaiter(this, void 0, void 0, function* () {
      const notificationPromptEnabled = this.persistentStateFactory.createGlobalPersistentState(deprecatedInfo.doNotDisplayPromptStateKey, true);

      if (!notificationPromptEnabled.value) {
        return;
      }

      const moreInfo = 'Learn more';
      const doNotShowAgain = 'Never show again';
      const option = yield this.appShell.showInformationMessage(deprecatedInfo.message, moreInfo, doNotShowAgain);

      if (!option) {
        return;
      }

      switch (option) {
        case moreInfo:
          {
            browser_1.launch(deprecatedInfo.moreInfoUrl);
            break;
          }

        case doNotShowAgain:
          {
            yield notificationPromptEnabled.updateValue(false);
            break;
          }

        default:
          {
            throw new Error('Selected option not supported.');
          }
      }

      return;
    });
  }

  checkAndNotifyDeprecatedSetting(deprecatedInfo) {
    let notify = false;

    if (Array.isArray(this.workspace.workspaceFolders) && this.workspace.workspaceFolders.length > 0) {
      this.workspace.workspaceFolders.forEach(workspaceFolder => {
        if (notify) {
          return;
        }

        notify = this.isDeprecatedSettingAndValueUsed(this.workspace.getConfiguration('python', workspaceFolder.uri), deprecatedInfo.setting);
      });
    } else {
      notify = this.isDeprecatedSettingAndValueUsed(this.workspace.getConfiguration('python'), deprecatedInfo.setting);
    }

    if (notify) {
      this.notifyDeprecation(deprecatedInfo).catch(ex => console.error('Python Extension: notifyDeprecation', ex));
    }
  }

  isDeprecatedSettingAndValueUsed(pythonConfig, deprecatedSetting) {
    if (!pythonConfig.has(deprecatedSetting.setting)) {
      return false;
    }

    const configValue = pythonConfig.get(deprecatedSetting.setting);

    if (!Array.isArray(deprecatedSetting.values) || deprecatedSetting.values.length === 0) {
      if (Array.isArray(configValue)) {
        return configValue.length > 0;
      }

      return true;
    }

    if (!Array.isArray(deprecatedSetting.values) || deprecatedSetting.values.length === 0) {
      if (configValue === undefined) {
        return false;
      }

      if (Array.isArray(configValue)) {
        // tslint:disable-next-line:no-any
        return configValue.length > 0;
      } // If we have a value in the setting, then return.


      return true;
    }

    return deprecatedSetting.values.indexOf(pythonConfig.get(deprecatedSetting.setting)) >= 0;
  }

};
FeatureDeprecationManager = __decorate([inversify_1.injectable(), __param(0, inversify_1.inject(types_2.IPersistentStateFactory)), __param(1, inversify_1.inject(types_1.ICommandManager)), __param(2, inversify_1.inject(types_1.IWorkspaceService)), __param(3, inversify_1.inject(types_1.IApplicationShell))], FeatureDeprecationManager);
exports.FeatureDeprecationManager = FeatureDeprecationManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVEZXByZWNhdGlvbk1hbmFnZXIuanMiXSwibmFtZXMiOlsiX19kZWNvcmF0ZSIsImRlY29yYXRvcnMiLCJ0YXJnZXQiLCJrZXkiLCJkZXNjIiwiYyIsImFyZ3VtZW50cyIsImxlbmd0aCIsInIiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJkIiwiUmVmbGVjdCIsImRlY29yYXRlIiwiaSIsImRlZmluZVByb3BlcnR5IiwiX19wYXJhbSIsInBhcmFtSW5kZXgiLCJkZWNvcmF0b3IiLCJfX2F3YWl0ZXIiLCJ0aGlzQXJnIiwiX2FyZ3VtZW50cyIsIlAiLCJnZW5lcmF0b3IiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImZ1bGZpbGxlZCIsInZhbHVlIiwic3RlcCIsIm5leHQiLCJlIiwicmVqZWN0ZWQiLCJyZXN1bHQiLCJkb25lIiwidGhlbiIsImFwcGx5IiwiZXhwb3J0cyIsImludmVyc2lmeV8xIiwicmVxdWlyZSIsInR5cGVzXzEiLCJicm93c2VyXzEiLCJ0eXBlc18yIiwiZGVwcmVjYXRlZEZlYXR1cmVzIiwiZG9Ob3REaXNwbGF5UHJvbXB0U3RhdGVLZXkiLCJtZXNzYWdlIiwibW9yZUluZm9VcmwiLCJzZXR0aW5nIiwidmFsdWVzIiwiRmVhdHVyZURlcHJlY2F0aW9uTWFuYWdlciIsImNvbnN0cnVjdG9yIiwicGVyc2lzdGVudFN0YXRlRmFjdG9yeSIsImNtZE1nciIsIndvcmtzcGFjZSIsImFwcFNoZWxsIiwiZGlzcG9zYWJsZXMiLCJkaXNwb3NlIiwiZm9yRWFjaCIsImRpc3Bvc2FibGUiLCJpbml0aWFsaXplIiwicmVnaXN0ZXJEZXByZWNhdGlvbiIsImJpbmQiLCJkZXByZWNhdGVkSW5mbyIsIkFycmF5IiwiaXNBcnJheSIsImNvbW1hbmRzIiwiY21kIiwicHVzaCIsInJlZ2lzdGVyQ29tbWFuZCIsIm5vdGlmeURlcHJlY2F0aW9uIiwiY2hlY2tBbmROb3RpZnlEZXByZWNhdGVkU2V0dGluZyIsIm5vdGlmaWNhdGlvblByb21wdEVuYWJsZWQiLCJjcmVhdGVHbG9iYWxQZXJzaXN0ZW50U3RhdGUiLCJtb3JlSW5mbyIsImRvTm90U2hvd0FnYWluIiwib3B0aW9uIiwic2hvd0luZm9ybWF0aW9uTWVzc2FnZSIsImxhdW5jaCIsInVwZGF0ZVZhbHVlIiwiRXJyb3IiLCJub3RpZnkiLCJ3b3Jrc3BhY2VGb2xkZXJzIiwid29ya3NwYWNlRm9sZGVyIiwiaXNEZXByZWNhdGVkU2V0dGluZ0FuZFZhbHVlVXNlZCIsImdldENvbmZpZ3VyYXRpb24iLCJ1cmkiLCJjYXRjaCIsImV4IiwiY29uc29sZSIsImVycm9yIiwicHl0aG9uQ29uZmlnIiwiZGVwcmVjYXRlZFNldHRpbmciLCJoYXMiLCJjb25maWdWYWx1ZSIsImdldCIsInVuZGVmaW5lZCIsImluZGV4T2YiLCJpbmplY3RhYmxlIiwiaW5qZWN0IiwiSVBlcnNpc3RlbnRTdGF0ZUZhY3RvcnkiLCJJQ29tbWFuZE1hbmFnZXIiLCJJV29ya3NwYWNlU2VydmljZSIsIklBcHBsaWNhdGlvblNoZWxsIl0sIm1hcHBpbmdzIjoiQUFBQSxhLENBQ0E7QUFDQTs7QUFDQSxJQUFJQSxVQUFVLEdBQUksVUFBUSxTQUFLQSxVQUFkLElBQTZCLFVBQVVDLFVBQVYsRUFBc0JDLE1BQXRCLEVBQThCQyxHQUE5QixFQUFtQ0MsSUFBbkMsRUFBeUM7QUFDbkYsTUFBSUMsQ0FBQyxHQUFHQyxTQUFTLENBQUNDLE1BQWxCO0FBQUEsTUFBMEJDLENBQUMsR0FBR0gsQ0FBQyxHQUFHLENBQUosR0FBUUgsTUFBUixHQUFpQkUsSUFBSSxLQUFLLElBQVQsR0FBZ0JBLElBQUksR0FBR0ssTUFBTSxDQUFDQyx3QkFBUCxDQUFnQ1IsTUFBaEMsRUFBd0NDLEdBQXhDLENBQXZCLEdBQXNFQyxJQUFySDtBQUFBLE1BQTJITyxDQUEzSDtBQUNBLE1BQUksT0FBT0MsT0FBUCxLQUFtQixRQUFuQixJQUErQixPQUFPQSxPQUFPLENBQUNDLFFBQWYsS0FBNEIsVUFBL0QsRUFBMkVMLENBQUMsR0FB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ekIsS0FBb0MsQ0FBcEYsRUFBdUY7QUFDbkYsVUFBSXNGLFdBQVcsS0FBS0UsU0FBcEIsRUFBK0I7QUFDM0IsZUFBTyxLQUFQO0FBQ0g7O0FBQ0QsVUFBSWhDLEtBQUssQ0FBQ0MsT0FBTixDQUFjNkIsV0FBZCxDQUFKLEVBQWdDO0FBQzVCO0FBQ0EsZUFBT0EsV0FBVyxDQUFDdEYsTUFBWixHQUFxQixDQUE1QjtBQUNILE9BUGtGLENBUW5GOzs7QUFDQSxhQUFPLElBQVA7QUFDSDs7QUFDRCxXQUFPb0YsaUJBQWlCLENBQUMzQyxNQUFsQixDQUF5QmdELE9BQXpCLENBQWlDTixZQUFZLENBQUNJLEdBQWIsQ0FBaUJILGlCQUFpQixDQUFDNUMsT0FBbkMsQ0FBakMsS0FBaUYsQ0FBeEY7QUFDSDs7QUE3RjJELENBQWhFO0FBK0ZBRSx5QkFBeUIsR0FBR2pELFVBQVUsQ0FBQyxDQUNuQ3NDLFdBQVcsQ0FBQzJELFVBQVosRUFEbUMsRUFFbkNqRixPQUFPLENBQUMsQ0FBRCxFQUFJc0IsV0FBVyxDQUFDNEQsTUFBWixDQUFtQnhELE9BQU8sQ0FBQ3lELHVCQUEzQixDQUFKLENBRjRCLEVBR25DbkYsT0FBTyxDQUFDLENBQUQsRUFBSXNCLFdBQVcsQ0FBQzRELE1BQVosQ0FBbUIxRCxPQUFPLENBQUM0RCxlQUEzQixDQUFKLENBSDRCLEVBSW5DcEYsT0FBTyxDQUFDLENBQUQsRUFBSXNCLFdBQVcsQ0FBQzRELE1BQVosQ0FBbUIxRCxPQUFPLENBQUM2RCxpQkFBM0IsQ0FBSixDQUo0QixFQUtuQ3JGLE9BQU8sQ0FBQyxDQUFELEVBQUlzQixXQUFXLENBQUM0RCxNQUFaLENBQW1CMUQsT0FBTyxDQUFDOEQsaUJBQTNCLENBQUosQ0FMNEIsQ0FBRCxFQU1uQ3JELHlCQU5tQyxDQUF0QztBQU9BWixPQUFPLENBQUNZLHlCQUFSLEdBQW9DQSx5QkFBcEMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxudmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufTtcclxudmFyIF9fcGFyYW0gPSAodGhpcyAmJiB0aGlzLl9fcGFyYW0pIHx8IGZ1bmN0aW9uIChwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59O1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IGludmVyc2lmeV8xID0gcmVxdWlyZShcImludmVyc2lmeVwiKTtcclxuY29uc3QgdHlwZXNfMSA9IHJlcXVpcmUoXCIuL2FwcGxpY2F0aW9uL3R5cGVzXCIpO1xyXG5jb25zdCBicm93c2VyXzEgPSByZXF1aXJlKFwiLi9uZXQvYnJvd3NlclwiKTtcclxuY29uc3QgdHlwZXNfMiA9IHJlcXVpcmUoXCIuL3R5cGVzXCIpO1xyXG5jb25zdCBkZXByZWNhdGVkRmVhdHVyZXMgPSBbXHJcbiAgICB7XHJcbiAgICAgICAgZG9Ob3REaXNwbGF5UHJvbXB0U3RhdGVLZXk6ICdTSE9XX0RFUFJFQ0FURURfRkVBVFVSRV9QUk9NUFRfRk9STUFUX09OX1NBVkUnLFxyXG4gICAgICAgIG1lc3NhZ2U6ICdUaGUgc2V0dGluZyBcXCdweXRob24uZm9ybWF0dGluZy5mb3JtYXRPblNhdmVcXCcgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBcXCdlZGl0b3IuZm9ybWF0T25TYXZlXFwnLicsXHJcbiAgICAgICAgbW9yZUluZm9Vcmw6ICdodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L3ZzY29kZS1weXRob24vaXNzdWVzLzMwOScsXHJcbiAgICAgICAgc2V0dGluZzogeyBzZXR0aW5nOiAnZm9ybWF0dGluZy5mb3JtYXRPblNhdmUnLCB2YWx1ZXM6IFsndHJ1ZScsIHRydWVdIH1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgZG9Ob3REaXNwbGF5UHJvbXB0U3RhdGVLZXk6ICdTSE9XX0RFUFJFQ0FURURfRkVBVFVSRV9QUk9NUFRfTElOVF9PTl9URVhUX0NIQU5HRScsXHJcbiAgICAgICAgbWVzc2FnZTogJ1RoZSBzZXR0aW5nIFxcJ3B5dGhvbi5saW50aW5nLmxpbnRPblRleHRDaGFuZ2VcXCcgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIGVuYWJsZSBcXCdweXRob24ubGludGluZy5saW50T25TYXZlXFwnIGFuZCBcXCdmaWxlcy5hdXRvU2F2ZVxcJy4nLFxyXG4gICAgICAgIG1vcmVJbmZvVXJsOiAnaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC92c2NvZGUtcHl0aG9uL2lzc3Vlcy8zMTMnLFxyXG4gICAgICAgIHNldHRpbmc6IHsgc2V0dGluZzogJ2xpbnRpbmcubGludE9uVGV4dENoYW5nZScsIHZhbHVlczogWyd0cnVlJywgdHJ1ZV0gfVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBkb05vdERpc3BsYXlQcm9tcHRTdGF0ZUtleTogJ1NIT1dfREVQUkVDQVRFRF9GRUFUVVJFX1BST01QVF9GT1JfQVVUT19DT01QTEVURV9QUkVMT0FEX01PRFVMRVMnLFxyXG4gICAgICAgIG1lc3NhZ2U6ICdUaGUgc2V0dGluZyBcXCdweXRob24uYXV0b0NvbXBsZXRlLnByZWxvYWRNb2R1bGVzXFwnIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSBjb25zaWRlciB1c2luZyB0aGUgbmV3IExhbmd1YWdlIFNlcnZlciAoXFwncHl0aG9uLmplZGlFbmFibGVkID0gZmFsc2VcXCcpLicsXHJcbiAgICAgICAgbW9yZUluZm9Vcmw6ICdodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L3ZzY29kZS1weXRob24vaXNzdWVzLzE3MDQnLFxyXG4gICAgICAgIHNldHRpbmc6IHsgc2V0dGluZzogJ2F1dG9Db21wbGV0ZS5wcmVsb2FkTW9kdWxlcycgfVxyXG4gICAgfVxyXG5dO1xyXG5sZXQgRmVhdHVyZURlcHJlY2F0aW9uTWFuYWdlciA9IGNsYXNzIEZlYXR1cmVEZXByZWNhdGlvbk1hbmFnZXIge1xyXG4gICAgY29uc3RydWN0b3IocGVyc2lzdGVudFN0YXRlRmFjdG9yeSwgY21kTWdyLCB3b3Jrc3BhY2UsIGFwcFNoZWxsKSB7XHJcbiAgICAgICAgdGhpcy5wZXJzaXN0ZW50U3RhdGVGYWN0b3J5ID0gcGVyc2lzdGVudFN0YXRlRmFjdG9yeTtcclxuICAgICAgICB0aGlzLmNtZE1nciA9IGNtZE1ncjtcclxuICAgICAgICB0aGlzLndvcmtzcGFjZSA9IHdvcmtzcGFjZTtcclxuICAgICAgICB0aGlzLmFwcFNoZWxsID0gYXBwU2hlbGw7XHJcbiAgICAgICAgdGhpcy5kaXNwb3NhYmxlcyA9IFtdO1xyXG4gICAgfVxyXG4gICAgZGlzcG9zZSgpIHtcclxuICAgICAgICB0aGlzLmRpc3Bvc2FibGVzLmZvckVhY2goZGlzcG9zYWJsZSA9PiBkaXNwb3NhYmxlLmRpc3Bvc2UoKSk7XHJcbiAgICB9XHJcbiAgICBpbml0aWFsaXplKCkge1xyXG4gICAgICAgIGRlcHJlY2F0ZWRGZWF0dXJlcy5mb3JFYWNoKHRoaXMucmVnaXN0ZXJEZXByZWNhdGlvbi5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuICAgIHJlZ2lzdGVyRGVwcmVjYXRpb24oZGVwcmVjYXRlZEluZm8pIHtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkZXByZWNhdGVkSW5mby5jb21tYW5kcykpIHtcclxuICAgICAgICAgICAgZGVwcmVjYXRlZEluZm8uY29tbWFuZHMuZm9yRWFjaChjbWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwb3NhYmxlcy5wdXNoKHRoaXMuY21kTWdyLnJlZ2lzdGVyQ29tbWFuZChjbWQsICgpID0+IHRoaXMubm90aWZ5RGVwcmVjYXRpb24oZGVwcmVjYXRlZEluZm8pLCB0aGlzKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGVwcmVjYXRlZEluZm8uc2V0dGluZykge1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrQW5kTm90aWZ5RGVwcmVjYXRlZFNldHRpbmcoZGVwcmVjYXRlZEluZm8pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG5vdGlmeURlcHJlY2F0aW9uKGRlcHJlY2F0ZWRJbmZvKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgY29uc3Qgbm90aWZpY2F0aW9uUHJvbXB0RW5hYmxlZCA9IHRoaXMucGVyc2lzdGVudFN0YXRlRmFjdG9yeS5jcmVhdGVHbG9iYWxQZXJzaXN0ZW50U3RhdGUoZGVwcmVjYXRlZEluZm8uZG9Ob3REaXNwbGF5UHJvbXB0U3RhdGVLZXksIHRydWUpO1xyXG4gICAgICAgICAgICBpZiAoIW5vdGlmaWNhdGlvblByb21wdEVuYWJsZWQudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBtb3JlSW5mbyA9ICdMZWFybiBtb3JlJztcclxuICAgICAgICAgICAgY29uc3QgZG9Ob3RTaG93QWdhaW4gPSAnTmV2ZXIgc2hvdyBhZ2Fpbic7XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IHlpZWxkIHRoaXMuYXBwU2hlbGwuc2hvd0luZm9ybWF0aW9uTWVzc2FnZShkZXByZWNhdGVkSW5mby5tZXNzYWdlLCBtb3JlSW5mbywgZG9Ob3RTaG93QWdhaW4pO1xyXG4gICAgICAgICAgICBpZiAoIW9wdGlvbikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3B0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIG1vcmVJbmZvOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJvd3Nlcl8xLmxhdW5jaChkZXByZWNhdGVkSW5mby5tb3JlSW5mb1VybCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXNlIGRvTm90U2hvd0FnYWluOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgeWllbGQgbm90aWZpY2F0aW9uUHJvbXB0RW5hYmxlZC51cGRhdGVWYWx1ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTZWxlY3RlZCBvcHRpb24gbm90IHN1cHBvcnRlZC4nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBjaGVja0FuZE5vdGlmeURlcHJlY2F0ZWRTZXR0aW5nKGRlcHJlY2F0ZWRJbmZvKSB7XHJcbiAgICAgICAgbGV0IG5vdGlmeSA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMud29ya3NwYWNlLndvcmtzcGFjZUZvbGRlcnMpICYmIHRoaXMud29ya3NwYWNlLndvcmtzcGFjZUZvbGRlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLndvcmtzcGFjZS53b3Jrc3BhY2VGb2xkZXJzLmZvckVhY2god29ya3NwYWNlRm9sZGVyID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChub3RpZnkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBub3RpZnkgPSB0aGlzLmlzRGVwcmVjYXRlZFNldHRpbmdBbmRWYWx1ZVVzZWQodGhpcy53b3Jrc3BhY2UuZ2V0Q29uZmlndXJhdGlvbigncHl0aG9uJywgd29ya3NwYWNlRm9sZGVyLnVyaSksIGRlcHJlY2F0ZWRJbmZvLnNldHRpbmcpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIG5vdGlmeSA9IHRoaXMuaXNEZXByZWNhdGVkU2V0dGluZ0FuZFZhbHVlVXNlZCh0aGlzLndvcmtzcGFjZS5nZXRDb25maWd1cmF0aW9uKCdweXRob24nKSwgZGVwcmVjYXRlZEluZm8uc2V0dGluZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChub3RpZnkpIHtcclxuICAgICAgICAgICAgdGhpcy5ub3RpZnlEZXByZWNhdGlvbihkZXByZWNhdGVkSW5mbylcclxuICAgICAgICAgICAgICAgIC5jYXRjaChleCA9PiBjb25zb2xlLmVycm9yKCdQeXRob24gRXh0ZW5zaW9uOiBub3RpZnlEZXByZWNhdGlvbicsIGV4KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaXNEZXByZWNhdGVkU2V0dGluZ0FuZFZhbHVlVXNlZChweXRob25Db25maWcsIGRlcHJlY2F0ZWRTZXR0aW5nKSB7XHJcbiAgICAgICAgaWYgKCFweXRob25Db25maWcuaGFzKGRlcHJlY2F0ZWRTZXR0aW5nLnNldHRpbmcpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgY29uZmlnVmFsdWUgPSBweXRob25Db25maWcuZ2V0KGRlcHJlY2F0ZWRTZXR0aW5nLnNldHRpbmcpO1xyXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShkZXByZWNhdGVkU2V0dGluZy52YWx1ZXMpIHx8IGRlcHJlY2F0ZWRTZXR0aW5nLnZhbHVlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY29uZmlnVmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uZmlnVmFsdWUubGVuZ3RoID4gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGRlcHJlY2F0ZWRTZXR0aW5nLnZhbHVlcykgfHwgZGVwcmVjYXRlZFNldHRpbmcudmFsdWVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBpZiAoY29uZmlnVmFsdWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvbmZpZ1ZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbmZpZ1ZhbHVlLmxlbmd0aCA+IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gSWYgd2UgaGF2ZSBhIHZhbHVlIGluIHRoZSBzZXR0aW5nLCB0aGVuIHJldHVybi5cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkZXByZWNhdGVkU2V0dGluZy52YWx1ZXMuaW5kZXhPZihweXRob25Db25maWcuZ2V0KGRlcHJlY2F0ZWRTZXR0aW5nLnNldHRpbmcpKSA+PSAwO1xyXG4gICAgfVxyXG59O1xyXG5GZWF0dXJlRGVwcmVjYXRpb25NYW5hZ2VyID0gX19kZWNvcmF0ZShbXHJcbiAgICBpbnZlcnNpZnlfMS5pbmplY3RhYmxlKCksXHJcbiAgICBfX3BhcmFtKDAsIGludmVyc2lmeV8xLmluamVjdCh0eXBlc18yLklQZXJzaXN0ZW50U3RhdGVGYWN0b3J5KSksXHJcbiAgICBfX3BhcmFtKDEsIGludmVyc2lmeV8xLmluamVjdCh0eXBlc18xLklDb21tYW5kTWFuYWdlcikpLFxyXG4gICAgX19wYXJhbSgyLCBpbnZlcnNpZnlfMS5pbmplY3QodHlwZXNfMS5JV29ya3NwYWNlU2VydmljZSkpLFxyXG4gICAgX19wYXJhbSgzLCBpbnZlcnNpZnlfMS5pbmplY3QodHlwZXNfMS5JQXBwbGljYXRpb25TaGVsbCkpXHJcbl0sIEZlYXR1cmVEZXByZWNhdGlvbk1hbmFnZXIpO1xyXG5leHBvcnRzLkZlYXR1cmVEZXByZWNhdGlvbk1hbmFnZXIgPSBGZWF0dXJlRGVwcmVjYXRpb25NYW5hZ2VyO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1mZWF0dXJlRGVwcmVjYXRpb25NYW5hZ2VyLmpzLm1hcCJdfQ==