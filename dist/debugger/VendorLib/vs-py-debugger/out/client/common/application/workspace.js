"use strict"; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const inversify_1 = require("inversify");

const vscode_1 = require("vscode");

let WorkspaceService = class WorkspaceService {
  get onDidChangeConfiguration() {
    return vscode_1.workspace.onDidChangeConfiguration;
  }

  get rootPath() {
    return Array.isArray(vscode_1.workspace.workspaceFolders) ? vscode_1.workspace.workspaceFolders[0].uri.fsPath : undefined;
  }

  get workspaceFolders() {
    return vscode_1.workspace.workspaceFolders;
  }

  get onDidChangeWorkspaceFolders() {
    return vscode_1.workspace.onDidChangeWorkspaceFolders;
  }

  get hasWorkspaceFolders() {
    return Array.isArray(vscode_1.workspace.workspaceFolders) && vscode_1.workspace.workspaceFolders.length > 0;
  }

  getConfiguration(section, resource) {
    return vscode_1.workspace.getConfiguration(section, resource);
  }

  getWorkspaceFolder(uri) {
    return vscode_1.workspace.getWorkspaceFolder(uri);
  }

  asRelativePath(pathOrUri, includeWorkspaceFolder) {
    return vscode_1.workspace.asRelativePath(pathOrUri, includeWorkspaceFolder);
  }

  createFileSystemWatcher(globPattern, ignoreCreateEvents, ignoreChangeEvents, ignoreDeleteEvents) {
    return vscode_1.workspace.createFileSystemWatcher(globPattern, ignoreChangeEvents, ignoreChangeEvents, ignoreDeleteEvents);
  }

  findFiles(include, exclude, maxResults, token) {
    return vscode_1.workspace.findFiles(include, exclude, maxResults, token);
  }

  getWorkspaceFolderIdentifier(resource) {
    const workspaceFolder = resource ? vscode_1.workspace.getWorkspaceFolder(resource) : undefined;
    return workspaceFolder ? workspaceFolder.uri.fsPath : '';
  }

};
WorkspaceService = __decorate([inversify_1.injectable()], WorkspaceService);
exports.WorkspaceService = WorkspaceService;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmtzcGFjZS5qcyJdLCJuYW1lcyI6WyJfX2RlY29yYXRlIiwiZGVjb3JhdG9ycyIsInRhcmdldCIsImtleSIsImRlc2MiLCJjIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiciIsIk9iamVjdCIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImQiLCJSZWZsZWN0IiwiZGVjb3JhdGUiLCJpIiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJpbnZlcnNpZnlfMSIsInJlcXVpcmUiLCJ2c2NvZGVfMSIsIldvcmtzcGFjZVNlcnZpY2UiLCJvbkRpZENoYW5nZUNvbmZpZ3VyYXRpb24iLCJ3b3Jrc3BhY2UiLCJyb290UGF0aCIsIkFycmF5IiwiaXNBcnJheSIsIndvcmtzcGFjZUZvbGRlcnMiLCJ1cmkiLCJmc1BhdGgiLCJ1bmRlZmluZWQiLCJvbkRpZENoYW5nZVdvcmtzcGFjZUZvbGRlcnMiLCJoYXNXb3Jrc3BhY2VGb2xkZXJzIiwiZ2V0Q29uZmlndXJhdGlvbiIsInNlY3Rpb24iLCJyZXNvdXJjZSIsImdldFdvcmtzcGFjZUZvbGRlciIsImFzUmVsYXRpdmVQYXRoIiwicGF0aE9yVXJpIiwiaW5jbHVkZVdvcmtzcGFjZUZvbGRlciIsImNyZWF0ZUZpbGVTeXN0ZW1XYXRjaGVyIiwiZ2xvYlBhdHRlcm4iLCJpZ25vcmVDcmVhdGVFdmVudHMiLCJpZ25vcmVDaGFuZ2VFdmVudHMiLCJpZ25vcmVEZWxldGVFdmVudHMiLCJmaW5kRmlsZXMiLCJpbmNsdWRlIiwiZXhjbHVkZSIsIm1heFJlc3VsdHMiLCJ0b2tlbiIsImdldFdvcmtzcGFjZUZvbGRlcklkZW50aWZpZXIiLCJ3b3Jrc3BhY2VGb2xkZXIiLCJpbmplY3RhYmxlIl0sIm1hcHBpbmdzIjoiQUFBQSxhLENBQ0E7QUFDQTs7QUFDQSxJQUFJQSxVQUFVLEdBQUksVUFBUSxTQUFLQSxVQUFkLElBQTZCLFVBQVVDLFVBQVYsRUFBc0JDLE1BQXRCLEVBQThCQyxHQUE5QixFQUFtQ0MsSUFB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XCI7XG4vLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbnZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGludmVyc2lmeV8xID0gcmVxdWlyZShcImludmVyc2lmeVwiKTtcbmNvbnN0IHZzY29kZV8xID0gcmVxdWlyZShcInZzY29kZVwiKTtcbmxldCBXb3Jrc3BhY2VTZXJ2aWNlID0gY2xhc3MgV29ya3NwYWNlU2VydmljZSB7XG4gICAgZ2V0IG9uRGlkQ2hhbmdlQ29uZmlndXJhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHZzY29kZV8xLndvcmtzcGFjZS5vbkRpZENoYW5nZUNvbmZpZ3VyYXRpb247XG4gICAgfVxuICAgIGdldCByb290UGF0aCgpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodnNjb2RlXzEud29ya3NwYWNlLndvcmtzcGFjZUZvbGRlcnMpID8gdnNjb2RlXzEud29ya3NwYWNlLndvcmtzcGFjZUZvbGRlcnNbMF0udXJpLmZzUGF0aCA6IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgZ2V0IHdvcmtzcGFjZUZvbGRlcnMoKSB7XG4gICAgICAgIHJldHVybiB2c2NvZGVfMS53b3Jrc3BhY2Uud29ya3NwYWNlRm9sZGVycztcbiAgICB9XG4gICAgZ2V0IG9uRGlkQ2hhbmdlV29ya3NwYWNlRm9sZGVycygpIHtcbiAgICAgICAgcmV0dXJuIHZzY29kZV8xLndvcmtzcGFjZS5vbkRpZENoYW5nZVdvcmtzcGFjZUZvbGRlcnM7XG4gICAgfVxuICAgIGdldCBoYXNXb3Jrc3BhY2VGb2xkZXJzKCkge1xuICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2c2NvZGVfMS53b3Jrc3BhY2Uud29ya3NwYWNlRm9sZGVycykgJiYgdnNjb2RlXzEud29ya3NwYWNlLndvcmtzcGFjZUZvbGRlcnMubGVuZ3RoID4gMDtcbiAgICB9XG4gICAgZ2V0Q29uZmlndXJhdGlvbihzZWN0aW9uLCByZXNvdXJjZSkge1xuICAgICAgICByZXR1cm4gdnNjb2RlXzEud29ya3NwYWNlLmdldENvbmZpZ3VyYXRpb24oc2VjdGlvbiwgcmVzb3VyY2UpO1xuICAgIH1cbiAgICBnZXRXb3Jrc3BhY2VGb2xkZXIodXJpKSB7XG4gICAgICAgIHJldHVybiB2c2NvZGVfMS53b3Jrc3BhY2UuZ2V0V29ya3NwYWNlRm9sZGVyKHVyaSk7XG4gICAgfVxuICAgIGFzUmVsYXRpdmVQYXRoKHBhdGhPclVyaSwgaW5jbHVkZVdvcmtzcGFjZUZvbGRlcikge1xuICAgICAgICByZXR1cm4gdnNjb2RlXzEud29ya3NwYWNlLmFzUmVsYXRpdmVQYXRoKHBhdGhPclVyaSwgaW5jbHVkZVdvcmtzcGFjZUZvbGRlcik7XG4gICAgfVxuICAgIGNyZWF0ZUZpbGVTeXN0ZW1XYXRjaGVyKGdsb2JQYXR0ZXJuLCBpZ25vcmVDcmVhdGVFdmVudHMsIGlnbm9yZUNoYW5nZUV2ZW50cywgaWdub3JlRGVsZXRlRXZlbnRzKSB7XG4gICAgICAgIHJldHVybiB2c2NvZGVfMS53b3Jrc3BhY2UuY3JlYXRlRmlsZVN5c3RlbVdhdGNoZXIoZ2xvYlBhdHRlcm4sIGlnbm9yZUNoYW5nZUV2ZW50cywgaWdub3JlQ2hhbmdlRXZlbnRzLCBpZ25vcmVEZWxldGVFdmVudHMpO1xuICAgIH1cbiAgICBmaW5kRmlsZXMoaW5jbHVkZSwgZXhjbHVkZSwgbWF4UmVzdWx0cywgdG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIHZzY29kZV8xLndvcmtzcGFjZS5maW5kRmlsZXMoaW5jbHVkZSwgZXhjbHVkZSwgbWF4UmVzdWx0cywgdG9rZW4pO1xuICAgIH1cbiAgICBnZXRXb3Jrc3BhY2VGb2xkZXJJZGVudGlmaWVyKHJlc291cmNlKSB7XG4gICAgICAgIGNvbnN0IHdvcmtzcGFjZUZvbGRlciA9IHJlc291cmNlID8gdnNjb2RlXzEud29ya3NwYWNlLmdldFdvcmtzcGFjZUZvbGRlcihyZXNvdXJjZSkgOiB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiB3b3Jrc3BhY2VGb2xkZXIgPyB3b3Jrc3BhY2VGb2xkZXIudXJpLmZzUGF0aCA6ICcnO1xuICAgIH1cbn07XG5Xb3Jrc3BhY2VTZXJ2aWNlID0gX19kZWNvcmF0ZShbXG4gICAgaW52ZXJzaWZ5XzEuaW5qZWN0YWJsZSgpXG5dLCBXb3Jrc3BhY2VTZXJ2aWNlKTtcbmV4cG9ydHMuV29ya3NwYWNlU2VydmljZSA9IFdvcmtzcGFjZVNlcnZpY2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD13b3Jrc3BhY2UuanMubWFwIl19