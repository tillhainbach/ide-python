// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';

function __export(m) {
  for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

Object.defineProperty(exports, "__esModule", {
  value: true
}); // tslint:disable:no-invalid-this no-require-imports no-var-requires no-any max-classes-per-file

const events_1 = require("events"); // export * from './range';
// export * from './position';
// export * from './selection';


__export(require("./extHostedTypes"));

var vscMock;

(function (vscMock) {
  // This is one of the very few classes that we need in our unit tests.
  // It is constructed in a number of places, and this is required for verification.
  // Using mocked objects for verfications does not work in typemoq.
  class Uri {
    constructor(scheme, authority, path, query, fragment, fsPath) {
      this.scheme = scheme;
      this.authority = authority;
      this.path = path;
      this.query = query;
      this.fragment = fragment;
      this.fsPath = fsPath;
    }

    static file(path) {
      return new Uri('file', '', path, '', '', path);
    }

    static parse(value) {
      return new Uri('http', '', value, '', '', value);
    }

    with(change) {
      throw new Error('Not implemented');
    }

    toString(skipEncoding) {
      return this.fsPath;
    }

    toJSON() {
      return this.fsPath;
    }

  }

  vscMock.Uri = Uri;

  class Disposable {
    constructor(callOnDispose) {
      this.callOnDispose = callOnDispose;
    }

    dispose() {
      if (this.callOnDispose) {
        this.callOnDispose();
      }
    }

  }

  vscMock.Disposable = Disposable;

  class EventEmitter {
    constructor() {
      this.add = (listener, thisArgs, disposables) => {
        this.emitter.addListener('evt', listener);
        return {
          dispose: () => {
            this.emitter.removeListener('evt', listener);
          }
        };
      };

      this.event = this.add.bind(this);
      this.emitter = new events_1.EventEmitter();
    }

    fire(data) {
      this.emitter.emit('evt', data);
    }

    dispose() {
      this.emitter.removeAllListeners();
    }

  }

  vscMock.EventEmitter = EventEmitter;

  class CancellationToken extends EventEmitter {
    constructor() {
      super();
      this.onCancellationRequested = this.add.bind(this);
    }

    cancel() {
      this.isCancellationRequested = true;
      this.fire();
    }

  }

  vscMock.CancellationToken = CancellationToken;

  class CancellationTokenSource {
    constructor() {
      this.token = new CancellationToken();
    }

    cancel() {
      this.token.cancel();
    }

    dispose() {
      this.token.dispose();
    }

  }

  vscMock.CancellationTokenSource = CancellationTokenSource;
  let CompletionItemKind;

  (function (CompletionItemKind) {
    CompletionItemKind[CompletionItemKind["Text"] = 0] = "Text";
    CompletionItemKind[CompletionItemKind["Method"] = 1] = "Method";
    CompletionItemKind[CompletionItemKind["Function"] = 2] = "Function";
    CompletionItemKind[CompletionItemKind["Constructor"] = 3] = "Constructor";
    CompletionItemKind[CompletionItemKind["Field"] = 4] = "Field";
    CompletionItemKind[CompletionItemKind["Variable"] = 5] = "Variable";
    CompletionItemKind[CompletionItemKind["Class"] = 6] = "Class";
    CompletionItemKind[CompletionItemKind["Interface"] = 7] = "Interface";
    CompletionItemKind[CompletionItemKind["Module"] = 8] = "Module";
    CompletionItemKind[CompletionItemKind["Property"] = 9] = "Property";
    CompletionItemKind[CompletionItemKind["Unit"] = 10] = "Unit";
    CompletionItemKind[CompletionItemKind["Value"] = 11] = "Value";
    CompletionItemKind[CompletionItemKind["Enum"] = 12] = "Enum";
    CompletionItemKind[CompletionItemKind["Keyword"] = 13] = "Keyword";
    CompletionItemKind[CompletionItemKind["Snippet"] = 14] = "Snippet";
    CompletionItemKind[CompletionItemKind["Color"] = 15] = "Color";
    CompletionItemKind[CompletionItemKind["Reference"] = 17] = "Reference";
    CompletionItemKind[CompletionItemKind["File"] = 16] = "File";
    CompletionItemKind[CompletionItemKind["Folder"] = 18] = "Folder";
    CompletionItemKind[CompletionItemKind["EnumMember"] = 19] = "EnumMember";
    CompletionItemKind[CompletionItemKind["Constant"] = 20] = "Constant";
    CompletionItemKind[CompletionItemKind["Struct"] = 21] = "Struct";
    CompletionItemKind[CompletionItemKind["Event"] = 22] = "Event";
    CompletionItemKind[CompletionItemKind["Operator"] = 23] = "Operator";
    CompletionItemKind[CompletionItemKind["TypeParameter"] = 24] = "TypeParameter";
  })(CompletionItemKind = vscMock.CompletionItemKind || (vscMock.CompletionItemKind = {}));

  let SymbolKind;

  (function (SymbolKind) {
    SymbolKind[SymbolKind["File"] = 0] = "File";
    SymbolKind[SymbolKind["Module"] = 1] = "Module";
    SymbolKind[SymbolKind["Namespace"] = 2] = "Namespace";
    SymbolKind[SymbolKind["Package"] = 3] = "Package";
    SymbolKind[SymbolKind["Class"] = 4] = "Class";
    SymbolKind[SymbolKind["Method"] = 5] = "Method";
    SymbolKind[SymbolKind["Property"] = 6] = "Property";
    SymbolKind[SymbolKind["Field"] = 7] = "Field";
    SymbolKind[SymbolKind["Constructor"] = 8] = "Constructor";
    SymbolKind[SymbolKind["Enum"] = 9] = "Enum";
    SymbolKind[SymbolKind["Interface"] = 10] = "Interface";
    SymbolKind[SymbolKind["Function"] = 11] = "Function";
    SymbolKind[SymbolKind["Variable"] = 12] = "Variable";
    SymbolKind[SymbolKind["Constant"] = 13] = "Constant";
    SymbolKind[SymbolKind["String"] = 14] = "String";
    SymbolKind[SymbolKind["Number"] = 15] = "Number";
    SymbolKind[SymbolKind["Boolean"] = 16] = "Boolean";
    SymbolKind[SymbolKind["Array"] = 17] = "Array";
    SymbolKind[SymbolKind["Object"] = 18] = "Object";
    SymbolKind[SymbolKind["Key"] = 19] = "Key";
    SymbolKind[SymbolKind["Null"] = 20] = "Null";
    SymbolKind[SymbolKind["EnumMember"] = 21] = "EnumMember";
    SymbolKind[SymbolKind["Struct"] = 22] = "Struct";
    SymbolKind[SymbolKind["Event"] = 23] = "Event";
    SymbolKind[SymbolKind["Operator"] = 24] = "Operator";
    SymbolKind[SymbolKind["TypeParameter"] = 25] = "TypeParameter";
  })(SymbolKind = vscMock.SymbolKind || (vscMock.SymbolKind = {}));
})(vscMock = exports.vscMock || (exports.vscMock = {}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIl9fZXhwb3J0IiwibSIsInAiLCJleHBvcnRzIiwiaGFzT3duUHJvcGVydHkiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsInZhbHVlIiwiZXZlbnRzXzEiLCJyZXF1aXJlIiwidnNjTW9jayIsIlVyaSIsImNvbnN0cnVjdG9yIiwic2NoZW1lIiwiYXV0aG9yaXR5IiwicGF0aCIsInF1ZXJ5IiwiZnJhZ21lbnQiLCJmc1BhdGgiLCJmaWxlIiwicGFyc2UiLCJ3aXRoIiwiY2hhbmdlIiwiRXJyb3IiLCJ0b1N0cmluZyIsInNraXBFbmNvZGluZyIsInRvSlNPTiIsIkRpc3Bvc2FibGUiLCJjYWxsT25EaXNwb3NlIiwiZGlzcG9zZSIsIkV2ZW50RW1pdHRlciIsImFkZCIsImxpc3RlbmVyIiwidGhpc0FyZ3MiLCJkaXNwb3NhYmxlcyIsImVtaXR0ZXIiLCJhZGRMaXN0ZW5lciIsInJlbW92ZUxpc3RlbmVyIiwiZXZlbnQiLCJiaW5kIiwiZmlyZSIsImRhdGEiLCJlbWl0IiwicmVtb3ZlQWxsTGlzdGVuZXJzIiwiQ2FuY2VsbGF0aW9uVG9rZW4iLCJvbkNhbmNlbGxhdGlvblJlcXVlc3RlZCIsImNhbmNlbCIsImlzQ2FuY2VsbGF0aW9uUmVxdWVzdGVkIiwiQ2FuY2VsbGF0aW9uVG9rZW5Tb3VyY2UiLCJ0b2tlbiIsIkNvbXBsZXRpb25JdGVtS2luZCIsIlN5bWJvbEtpbmQiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTs7QUFDQSxTQUFTQSxRQUFULENBQWtCQyxDQUFsQixFQUFxQjtBQUNqQixPQUFLLElBQUlDLENBQVQsSUFBY0QsQ0FBZCxFQUFpQixJQUFJLENBQUNFLE9BQU8sQ0FBQ0MsY0FBUixDQUF1QkYsQ0FBdkIsQ0FBTCxFQUFnQ0MsT0FBTyxDQUFDRCxDQUFELENBQVAsR0FBYUQsQ0FBQyxDQUFDQyxDQUFELENBQWQ7QUFDcEQ7O0FBQ0RHLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkgsT0FBdEIsRUFBK0Is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NEQsYUFBNUQ7QUFDQUEsSUFBQUEsa0JBQWtCLENBQUNBLGtCQUFrQixDQUFDLE9BQUQsQ0FBbEIsR0FBOEIsQ0FBL0IsQ0FBbEIsR0FBc0QsT0FBdEQ7QUFDQUEsSUFBQUEsa0JBQWtCLENBQUNBLGtCQUFrQixDQUFDLFVBQUQsQ0FBbEIsR0FBaUMsQ0FBbEMsQ0FBbEIsR0FBeUQsVUFBekQ7QUFDQUEsSUFBQUEsa0JBQWtCLENBQUNBLGtCQUFrQixDQUFDLE9BQUQsQ0FBbEIsR0FBOEIsQ0FBL0IsQ0FBbEIsR0FBc0QsT0FBdEQ7QUFDQUEsSUFBQUEsa0JBQWtCLENBQUNBLGtCQUFrQixDQUFDLFdBQUQsQ0FBbEIsR0FBa0MsQ0FBbkMsQ0FBbEIsR0FBMEQsV0FBMUQ7QUFDQUEsSUFBQUEsa0JBQWtCLENBQUNBLGtCQUFrQixDQUFDLFFBQUQsQ0FBbEIsR0FBK0IsQ0FBaEMsQ0FBbEIsR0FBdUQsUUFBdkQ7QUFDQUEsSUFBQUEsa0JBQWtCLENBQUNBLGtCQUFrQixDQUFDLFVBQUQsQ0FBbEIsR0FBaUMsQ0FBbEMsQ0FBbEIsR0FBeUQsVUFBekQ7QUFDQUEsSUFBQUEsa0JBQWtCLENBQUNBLGtCQUFrQixDQUFDLE1BQUQsQ0FBbEIsR0FBNkIsRUFBOUIsQ0FBbEIsR0FBc0QsTUFBdEQ7QUFDQUEsSUFBQUEsa0JBQWtCLENBQUNBLGtCQUFrQixDQUFDLE9BQUQsQ0FBbEIsR0FBOEIsRUFBL0IsQ0FBbEIsR0FBdUQsT0FBdkQ7QUFDQUEsSUFBQUEsa0JBQWtCLENBQUNBLGtCQUFrQixDQUFDLE1BQUQsQ0FBbEIsR0FBNkIsRUFBOUIsQ0FBbEIsR0FBc0QsTUFBdEQ7QUFDQUEsSUFBQUEsa0JBQWtCLENBQUNBLGtCQUFrQixDQUFDLFNBQUQsQ0FBbEIsR0FBZ0MsRUFBakMsQ0FBbEIsR0FBeUQsU0FBekQ7QUFDQUEsSUFBQUEsa0JBQWtCLENBQUNBLGtCQUFrQixDQUFDLFNBQUQsQ0FBbEIsR0FBZ0MsRUFBakMsQ0FBbEIsR0FBeUQsU0FBekQ7QUFDQUEsSUFBQUEsa0JBQWtCLENBQUNBLGtCQUFrQixDQUFDLE9BQUQsQ0FBbEIsR0FBOEIsRUFBL0IsQ0FBbEIsR0FBdUQsT0FBdkQ7QUFDQUEsSUFBQUEsa0JBQWtCLENBQUNBLGtCQUFrQixDQUFDLFdBQUQsQ0FBbEIsR0FBa0MsRUFBbkMsQ0FBbEIsR0FBMkQsV0FBM0Q7QUFDQUEsSUFBQUEsa0JBQWtCLENBQUNBLGtCQUFrQixDQUFDLE1BQUQsQ0FBbEIsR0FBNkIsRUFBOUIsQ0FBbEIsR0FBc0QsTUFBdEQ7QUFDQUEsSUFBQUEsa0JBQWtCLENBQUNBLGtCQUFrQixDQUFDLFFBQUQsQ0FBbEIsR0FBK0IsRUFBaEMsQ0FBbEIsR0FBd0QsUUFBeEQ7QUFDQUEsSUFBQUEsa0JBQWtCLENBQUNBLGtCQUFrQixDQUFDLFlBQUQsQ0FBbEIsR0FBbUMsRUFBcEMsQ0FBbEIsR0FBNEQsWUFBNUQ7QUFDQUEsSUFBQUEsa0JBQWtCLENBQUNBLGtCQUFrQixDQUFDLFVBQUQsQ0FBbEIsR0FBaUMsRUFBbEMsQ0FBbEIsR0FBMEQsVUFBMUQ7QUFDQUEsSUFBQUEsa0JBQWtCLENBQUNBLGtCQUFrQixDQUFDLFFBQUQsQ0FBbEIsR0FBK0IsRUFBaEMsQ0FBbEIsR0FBd0QsUUFBeEQ7QUFDQUEsSUFBQUEsa0JBQWtCLENBQUNBLGtCQUFrQixDQUFDLE9BQUQsQ0FBbEIsR0FBOEIsRUFBL0IsQ0FBbEIsR0FBdUQsT0FBdkQ7QUFDQUEsSUFBQUEsa0JBQWtCLENBQUNBLGtCQUFrQixDQUFDLFVBQUQsQ0FBbEIsR0FBaUMsRUFBbEMsQ0FBbEIsR0FBMEQsVUFBMUQ7QUFDQUEsSUFBQUEsa0JBQWtCLENBQUNBLGtCQUFrQixDQUFDLGVBQUQsQ0FBbEIsR0FBc0MsRUFBdkMsQ0FBbEIsR0FBK0QsZUFBL0Q7QUFDSCxHQTFCRCxFQTBCR0Esa0JBQWtCLEdBQUd4QyxPQUFPLENBQUN3QyxrQkFBUixLQUErQnhDLE9BQU8sQ0FBQ3dDLGtCQUFSLEdBQTZCLEVBQTVELENBMUJ4Qjs7QUEyQkEsTUFBSUMsVUFBSjs7QUFDQSxHQUFDLFVBQVVBLFVBQVYsRUFBc0I7QUFDbkJBLElBQUFBLFVBQVUsQ0FBQ0EsVUFBVSxDQUFDLE1BQUQsQ0FBVixHQUFxQixDQUF0QixDQUFWLEdBQXFDLE1BQXJDO0FBQ0FBLElBQUFBLFVBQVUsQ0FBQ0EsVUFBVSxDQUFDLFFBQUQsQ0FBVixHQUF1QixDQUF4QixDQUFWLEdBQXVDLFFBQXZDO0FBQ0FBLElBQUFBLFVBQVUsQ0FBQ0EsVUFBVSxDQUFDLFdBQUQsQ0FBVixHQUEwQixDQUEzQixDQUFWLEdBQTBDLFdBQTFDO0FBQ0FBLElBQUFBLFVBQVUsQ0FBQ0EsVUFBVSxDQUFDLFNBQUQsQ0FBVixHQUF3QixDQUF6QixDQUFWLEdBQXdDLFNBQXhDO0FBQ0FBLElBQUFBLFVBQVUsQ0FBQ0EsVUFBVSxDQUFDLE9BQUQsQ0FBVixHQUFzQixDQUF2QixDQUFWLEdBQXNDLE9BQXRDO0FBQ0FBLElBQUFBLFVBQVUsQ0FBQ0EsVUFBVSxDQUFDLFFBQUQsQ0FBVixHQUF1QixDQUF4QixDQUFWLEdBQXVDLFFBQXZDO0FBQ0FBLElBQUFBLFVBQVUsQ0FBQ0EsVUFBVSxDQUFDLFVBQUQsQ0FBVixHQUF5QixDQUExQixDQUFWLEdBQXlDLFVBQXpDO0FBQ0FBLElBQUFBLFVBQVUsQ0FBQ0EsVUFBVSxDQUFDLE9BQUQsQ0FBVixHQUFzQixDQUF2QixDQUFWLEdBQXNDLE9BQXRDO0FBQ0FBLElBQUFBLFVBQVUsQ0FBQ0EsVUFBVSxDQUFDLGFBQUQsQ0FBVixHQUE0QixDQUE3QixDQUFWLEdBQTRDLGFBQTVDO0FBQ0FBLElBQUFBLFVBQVUsQ0FBQ0EsVUFBVSxDQUFDLE1BQUQsQ0FBVixHQUFxQixDQUF0QixDQUFWLEdBQXFDLE1BQXJDO0FBQ0FBLElBQUFBLFVBQVUsQ0FBQ0EsVUFBVSxDQUFDLFdBQUQsQ0FBVixHQUEwQixFQUEzQixDQUFWLEdBQTJDLFdBQTNDO0FBQ0FBLElBQUFBLFVBQVUsQ0FBQ0EsVUFBVSxDQUFDLFVBQUQsQ0FBVixHQUF5QixFQUExQixDQUFWLEdBQTBDLFVBQTFDO0FBQ0FBLElBQUFBLFVBQVUsQ0FBQ0EsVUFBVSxDQUFDLFVBQUQsQ0FBVixHQUF5QixFQUExQixDQUFWLEdBQTBDLFVBQTFDO0FBQ0FBLElBQUFBLFVBQVUsQ0FBQ0EsVUFBVSxDQUFDLFVBQUQsQ0FBVixHQUF5QixFQUExQixDQUFWLEdBQTBDLFVBQTFDO0FBQ0FBLElBQUFBLFVBQVUsQ0FBQ0EsVUFBVSxDQUFDLFFBQUQsQ0FBVixHQUF1QixFQUF4QixDQUFWLEdBQXdDLFFBQXhDO0FBQ0FBLElBQUFBLFVBQVUsQ0FBQ0EsVUFBVSxDQUFDLFFBQUQsQ0FBVixHQUF1QixFQUF4QixDQUFWLEdBQXdDLFFBQXhDO0FBQ0FBLElBQUFBLFVBQVUsQ0FBQ0EsVUFBVSxDQUFDLFNBQUQsQ0FBVixHQUF3QixFQUF6QixDQUFWLEdBQXlDLFNBQXpDO0FBQ0FBLElBQUFBLFVBQVUsQ0FBQ0EsVUFBVSxDQUFDLE9BQUQsQ0FBVixHQUFzQixFQUF2QixDQUFWLEdBQXVDLE9BQXZDO0FBQ0FBLElBQUFBLFVBQVUsQ0FBQ0EsVUFBVSxDQUFDLFFBQUQsQ0FBVixHQUF1QixFQUF4QixDQUFWLEdBQXdDLFFBQXhDO0FBQ0FBLElBQUFBLFVBQVUsQ0FBQ0EsVUFBVSxDQUFDLEtBQUQsQ0FBVixHQUFvQixFQUFyQixDQUFWLEdBQXFDLEtBQXJDO0FBQ0FBLElBQUFBLFVBQVUsQ0FBQ0EsVUFBVSxDQUFDLE1BQUQsQ0FBVixHQUFxQixFQUF0QixDQUFWLEdBQXNDLE1BQXRDO0FBQ0FBLElBQUFBLFVBQVUsQ0FBQ0EsVUFBVSxDQUFDLFlBQUQsQ0FBVixHQUEyQixFQUE1QixDQUFWLEdBQTRDLFlBQTVDO0FBQ0FBLElBQUFBLFVBQVUsQ0FBQ0EsVUFBVSxDQUFDLFFBQUQsQ0FBVixHQUF1QixFQUF4QixDQUFWLEdBQXdDLFFBQXhDO0FBQ0FBLElBQUFBLFVBQVUsQ0FBQ0EsVUFBVSxDQUFDLE9BQUQsQ0FBVixHQUFzQixFQUF2QixDQUFWLEdBQXVDLE9BQXZDO0FBQ0FBLElBQUFBLFVBQVUsQ0FBQ0EsVUFBVSxDQUFDLFVBQUQsQ0FBVixHQUF5QixFQUExQixDQUFWLEdBQTBDLFVBQTFDO0FBQ0FBLElBQUFBLFVBQVUsQ0FBQ0EsVUFBVSxDQUFDLGVBQUQsQ0FBVixHQUE4QixFQUEvQixDQUFWLEdBQStDLGVBQS9DO0FBQ0gsR0EzQkQsRUEyQkdBLFVBQVUsR0FBR3pDLE9BQU8sQ0FBQ3lDLFVBQVIsS0FBdUJ6QyxPQUFPLENBQUN5QyxVQUFSLEdBQXFCLEVBQTVDLENBM0JoQjtBQTRCSCxDQTlJRCxFQThJR3pDLE9BQU8sR0FBR1AsT0FBTyxDQUFDTyxPQUFSLEtBQW9CUCxPQUFPLENBQUNPLE9BQVIsR0FBa0IsRUFBdEMsQ0E5SWIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG4ndXNlIHN0cmljdCc7XHJcbmZ1bmN0aW9uIF9fZXhwb3J0KG0pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbi8vIHRzbGludDpkaXNhYmxlOm5vLWludmFsaWQtdGhpcyBuby1yZXF1aXJlLWltcG9ydHMgbm8tdmFyLXJlcXVpcmVzIG5vLWFueSBtYXgtY2xhc3Nlcy1wZXItZmlsZVxyXG5jb25zdCBldmVudHNfMSA9IHJlcXVpcmUoXCJldmVudHNcIik7XHJcbi8vIGV4cG9ydCAqIGZyb20gJy4vcmFuZ2UnO1xyXG4vLyBleHBvcnQgKiBmcm9tICcuL3Bvc2l0aW9uJztcclxuLy8gZXhwb3J0ICogZnJvbSAnLi9zZWxlY3Rpb24nO1xyXG5fX2V4cG9ydChyZXF1aXJlKFwiLi9leHRIb3N0ZWRUeXBlc1wiKSk7XHJcbnZhciB2c2NNb2NrO1xyXG4oZnVuY3Rpb24gKHZzY01vY2spIHtcclxuICAgIC8vIFRoaXMgaXMgb25lIG9mIHRoZSB2ZXJ5IGZldyBjbGFzc2VzIHRoYXQgd2UgbmVlZCBpbiBvdXIgdW5pdCB0ZXN0cy5cclxuICAgIC8vIEl0IGlzIGNvbnN0cnVjdGVkIGluIGEgbnVtYmVyIG9mIHBsYWNlcywgYW5kIHRoaXMgaXMgcmVxdWlyZWQgZm9yIHZlcmlmaWNhdGlvbi5cclxuICAgIC8vIFVzaW5nIG1vY2tlZCBvYmplY3RzIGZvciB2ZXJmaWNhdGlvbnMgZG9lcyBub3Qgd29yayBpbiB0eXBlbW9xLlxyXG4gICAgY2xhc3MgVXJpIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihzY2hlbWUsIGF1dGhvcml0eSwgcGF0aCwgcXVlcnksIGZyYWdtZW50LCBmc1BhdGgpIHtcclxuICAgICAgICAgICAgdGhpcy5zY2hlbWUgPSBzY2hlbWU7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0aG9yaXR5ID0gYXV0aG9yaXR5O1xyXG4gICAgICAgICAgICB0aGlzLnBhdGggPSBwYXRoO1xyXG4gICAgICAgICAgICB0aGlzLnF1ZXJ5ID0gcXVlcnk7XHJcbiAgICAgICAgICAgIHRoaXMuZnJhZ21lbnQgPSBmcmFnbWVudDtcclxuICAgICAgICAgICAgdGhpcy5mc1BhdGggPSBmc1BhdGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0YXRpYyBmaWxlKHBhdGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBVcmkoJ2ZpbGUnLCAnJywgcGF0aCwgJycsICcnLCBwYXRoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3RhdGljIHBhcnNlKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVXJpKCdodHRwJywgJycsIHZhbHVlLCAnJywgJycsIHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgd2l0aChjaGFuZ2UpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdG9TdHJpbmcoc2tpcEVuY29kaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZzUGF0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdG9KU09OKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mc1BhdGg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdnNjTW9jay5VcmkgPSBVcmk7XHJcbiAgICBjbGFzcyBEaXNwb3NhYmxlIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihjYWxsT25EaXNwb3NlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbE9uRGlzcG9zZSA9IGNhbGxPbkRpc3Bvc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhbGxPbkRpc3Bvc2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FsbE9uRGlzcG9zZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdnNjTW9jay5EaXNwb3NhYmxlID0gRGlzcG9zYWJsZTtcclxuICAgIGNsYXNzIEV2ZW50RW1pdHRlciB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkID0gKGxpc3RlbmVyLCB0aGlzQXJncywgZGlzcG9zYWJsZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW1pdHRlci5hZGRMaXN0ZW5lcignZXZ0JywgbGlzdGVuZXIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNwb3NlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdHRlci5yZW1vdmVMaXN0ZW5lcignZXZ0JywgbGlzdGVuZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnQgPSB0aGlzLmFkZC5iaW5kKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgZXZlbnRzXzEuRXZlbnRFbWl0dGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpcmUoZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnZXZ0JywgZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdHRlci5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB2c2NNb2NrLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcclxuICAgIGNsYXNzIENhbmNlbGxhdGlvblRva2VuIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5vbkNhbmNlbGxhdGlvblJlcXVlc3RlZCA9IHRoaXMuYWRkLmJpbmQodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhbmNlbCgpIHtcclxuICAgICAgICAgICAgdGhpcy5pc0NhbmNlbGxhdGlvblJlcXVlc3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZmlyZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHZzY01vY2suQ2FuY2VsbGF0aW9uVG9rZW4gPSBDYW5jZWxsYXRpb25Ub2tlbjtcclxuICAgIGNsYXNzIENhbmNlbGxhdGlvblRva2VuU291cmNlIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy50b2tlbiA9IG5ldyBDYW5jZWxsYXRpb25Ub2tlbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYW5jZWwoKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9rZW4uY2FuY2VsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9rZW4uZGlzcG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHZzY01vY2suQ2FuY2VsbGF0aW9uVG9rZW5Tb3VyY2UgPSBDYW5jZWxsYXRpb25Ub2tlblNvdXJjZTtcclxuICAgIGxldCBDb21wbGV0aW9uSXRlbUtpbmQ7XHJcbiAgICAoZnVuY3Rpb24gKENvbXBsZXRpb25JdGVtS2luZCkge1xyXG4gICAgICAgIENvbXBsZXRpb25JdGVtS2luZFtDb21wbGV0aW9uSXRlbUtpbmRbXCJUZXh0XCJdID0gMF0gPSBcIlRleHRcIjtcclxuICAgICAgICBDb21wbGV0aW9uSXRlbUtpbmRbQ29tcGxldGlvbkl0ZW1LaW5kW1wiTWV0aG9kXCJdID0gMV0gPSBcIk1ldGhvZFwiO1xyXG4gICAgICAgIENvbXBsZXRpb25JdGVtS2luZFtDb21wbGV0aW9uSXRlbUtpbmRbXCJGdW5jdGlvblwiXSA9IDJdID0gXCJGdW5jdGlvblwiO1xyXG4gICAgICAgIENvbXBsZXRpb25JdGVtS2luZFtDb21wbGV0aW9uSXRlbUtpbmRbXCJDb25zdHJ1Y3RvclwiXSA9IDNdID0gXCJDb25zdHJ1Y3RvclwiO1xyXG4gICAgICAgIENvbXBsZXRpb25JdGVtS2luZFtDb21wbGV0aW9uSXRlbUtpbmRbXCJGaWVsZFwiXSA9IDRdID0gXCJGaWVsZFwiO1xyXG4gICAgICAgIENvbXBsZXRpb25JdGVtS2luZFtDb21wbGV0aW9uSXRlbUtpbmRbXCJWYXJpYWJsZVwiXSA9IDVdID0gXCJWYXJpYWJsZVwiO1xyXG4gICAgICAgIENvbXBsZXRpb25JdGVtS2luZFtDb21wbGV0aW9uSXRlbUtpbmRbXCJDbGFzc1wiXSA9IDZdID0gXCJDbGFzc1wiO1xyXG4gICAgICAgIENvbXBsZXRpb25JdGVtS2luZFtDb21wbGV0aW9uSXRlbUtpbmRbXCJJbnRlcmZhY2VcIl0gPSA3XSA9IFwiSW50ZXJmYWNlXCI7XHJcbiAgICAgICAgQ29tcGxldGlvbkl0ZW1LaW5kW0NvbXBsZXRpb25JdGVtS2luZFtcIk1vZHVsZVwiXSA9IDhdID0gXCJNb2R1bGVcIjtcclxuICAgICAgICBDb21wbGV0aW9uSXRlbUtpbmRbQ29tcGxldGlvbkl0ZW1LaW5kW1wiUHJvcGVydHlcIl0gPSA5XSA9IFwiUHJvcGVydHlcIjtcclxuICAgICAgICBDb21wbGV0aW9uSXRlbUtpbmRbQ29tcGxldGlvbkl0ZW1LaW5kW1wiVW5pdFwiXSA9IDEwXSA9IFwiVW5pdFwiO1xyXG4gICAgICAgIENvbXBsZXRpb25JdGVtS2luZFtDb21wbGV0aW9uSXRlbUtpbmRbXCJWYWx1ZVwiXSA9IDExXSA9IFwiVmFsdWVcIjtcclxuICAgICAgICBDb21wbGV0aW9uSXRlbUtpbmRbQ29tcGxldGlvbkl0ZW1LaW5kW1wiRW51bVwiXSA9IDEyXSA9IFwiRW51bVwiO1xyXG4gICAgICAgIENvbXBsZXRpb25JdGVtS2luZFtDb21wbGV0aW9uSXRlbUtpbmRbXCJLZXl3b3JkXCJdID0gMTNdID0gXCJLZXl3b3JkXCI7XHJcbiAgICAgICAgQ29tcGxldGlvbkl0ZW1LaW5kW0NvbXBsZXRpb25JdGVtS2luZFtcIlNuaXBwZXRcIl0gPSAxNF0gPSBcIlNuaXBwZXRcIjtcclxuICAgICAgICBDb21wbGV0aW9uSXRlbUtpbmRbQ29tcGxldGlvbkl0ZW1LaW5kW1wiQ29sb3JcIl0gPSAxNV0gPSBcIkNvbG9yXCI7XHJcbiAgICAgICAgQ29tcGxldGlvbkl0ZW1LaW5kW0NvbXBsZXRpb25JdGVtS2luZFtcIlJlZmVyZW5jZVwiXSA9IDE3XSA9IFwiUmVmZXJlbmNlXCI7XHJcbiAgICAgICAgQ29tcGxldGlvbkl0ZW1LaW5kW0NvbXBsZXRpb25JdGVtS2luZFtcIkZpbGVcIl0gPSAxNl0gPSBcIkZpbGVcIjtcclxuICAgICAgICBDb21wbGV0aW9uSXRlbUtpbmRbQ29tcGxldGlvbkl0ZW1LaW5kW1wiRm9sZGVyXCJdID0gMThdID0gXCJGb2xkZXJcIjtcclxuICAgICAgICBDb21wbGV0aW9uSXRlbUtpbmRbQ29tcGxldGlvbkl0ZW1LaW5kW1wiRW51bU1lbWJlclwiXSA9IDE5XSA9IFwiRW51bU1lbWJlclwiO1xyXG4gICAgICAgIENvbXBsZXRpb25JdGVtS2luZFtDb21wbGV0aW9uSXRlbUtpbmRbXCJDb25zdGFudFwiXSA9IDIwXSA9IFwiQ29uc3RhbnRcIjtcclxuICAgICAgICBDb21wbGV0aW9uSXRlbUtpbmRbQ29tcGxldGlvbkl0ZW1LaW5kW1wiU3RydWN0XCJdID0gMjFdID0gXCJTdHJ1Y3RcIjtcclxuICAgICAgICBDb21wbGV0aW9uSXRlbUtpbmRbQ29tcGxldGlvbkl0ZW1LaW5kW1wiRXZlbnRcIl0gPSAyMl0gPSBcIkV2ZW50XCI7XHJcbiAgICAgICAgQ29tcGxldGlvbkl0ZW1LaW5kW0NvbXBsZXRpb25JdGVtS2luZFtcIk9wZXJhdG9yXCJdID0gMjNdID0gXCJPcGVyYXRvclwiO1xyXG4gICAgICAgIENvbXBsZXRpb25JdGVtS2luZFtDb21wbGV0aW9uSXRlbUtpbmRbXCJUeXBlUGFyYW1ldGVyXCJdID0gMjRdID0gXCJUeXBlUGFyYW1ldGVyXCI7XHJcbiAgICB9KShDb21wbGV0aW9uSXRlbUtpbmQgPSB2c2NNb2NrLkNvbXBsZXRpb25JdGVtS2luZCB8fCAodnNjTW9jay5Db21wbGV0aW9uSXRlbUtpbmQgPSB7fSkpO1xyXG4gICAgbGV0IFN5bWJvbEtpbmQ7XHJcbiAgICAoZnVuY3Rpb24gKFN5bWJvbEtpbmQpIHtcclxuICAgICAgICBTeW1ib2xLaW5kW1N5bWJvbEtpbmRbXCJGaWxlXCJdID0gMF0gPSBcIkZpbGVcIjtcclxuICAgICAgICBTeW1ib2xLaW5kW1N5bWJvbEtpbmRbXCJNb2R1bGVcIl0gPSAxXSA9IFwiTW9kdWxlXCI7XHJcbiAgICAgICAgU3ltYm9sS2luZFtTeW1ib2xLaW5kW1wiTmFtZXNwYWNlXCJdID0gMl0gPSBcIk5hbWVzcGFjZVwiO1xyXG4gICAgICAgIFN5bWJvbEtpbmRbU3ltYm9sS2luZFtcIlBhY2thZ2VcIl0gPSAzXSA9IFwiUGFja2FnZVwiO1xyXG4gICAgICAgIFN5bWJvbEtpbmRbU3ltYm9sS2luZFtcIkNsYXNzXCJdID0gNF0gPSBcIkNsYXNzXCI7XHJcbiAgICAgICAgU3ltYm9sS2luZFtTeW1ib2xLaW5kW1wiTWV0aG9kXCJdID0gNV0gPSBcIk1ldGhvZFwiO1xyXG4gICAgICAgIFN5bWJvbEtpbmRbU3ltYm9sS2luZFtcIlByb3BlcnR5XCJdID0gNl0gPSBcIlByb3BlcnR5XCI7XHJcbiAgICAgICAgU3ltYm9sS2luZFtTeW1ib2xLaW5kW1wiRmllbGRcIl0gPSA3XSA9IFwiRmllbGRcIjtcclxuICAgICAgICBTeW1ib2xLaW5kW1N5bWJvbEtpbmRbXCJDb25zdHJ1Y3RvclwiXSA9IDhdID0gXCJDb25zdHJ1Y3RvclwiO1xyXG4gICAgICAgIFN5bWJvbEtpbmRbU3ltYm9sS2luZFtcIkVudW1cIl0gPSA5XSA9IFwiRW51bVwiO1xyXG4gICAgICAgIFN5bWJvbEtpbmRbU3ltYm9sS2luZFtcIkludGVyZmFjZVwiXSA9IDEwXSA9IFwiSW50ZXJmYWNlXCI7XHJcbiAgICAgICAgU3ltYm9sS2luZFtTeW1ib2xLaW5kW1wiRnVuY3Rpb25cIl0gPSAxMV0gPSBcIkZ1bmN0aW9uXCI7XHJcbiAgICAgICAgU3ltYm9sS2luZFtTeW1ib2xLaW5kW1wiVmFyaWFibGVcIl0gPSAxMl0gPSBcIlZhcmlhYmxlXCI7XHJcbiAgICAgICAgU3ltYm9sS2luZFtTeW1ib2xLaW5kW1wiQ29uc3RhbnRcIl0gPSAxM10gPSBcIkNvbnN0YW50XCI7XHJcbiAgICAgICAgU3ltYm9sS2luZFtTeW1ib2xLaW5kW1wiU3RyaW5nXCJdID0gMTRdID0gXCJTdHJpbmdcIjtcclxuICAgICAgICBTeW1ib2xLaW5kW1N5bWJvbEtpbmRbXCJOdW1iZXJcIl0gPSAxNV0gPSBcIk51bWJlclwiO1xyXG4gICAgICAgIFN5bWJvbEtpbmRbU3ltYm9sS2luZFtcIkJvb2xlYW5cIl0gPSAxNl0gPSBcIkJvb2xlYW5cIjtcclxuICAgICAgICBTeW1ib2xLaW5kW1N5bWJvbEtpbmRbXCJBcnJheVwiXSA9IDE3XSA9IFwiQXJyYXlcIjtcclxuICAgICAgICBTeW1ib2xLaW5kW1N5bWJvbEtpbmRbXCJPYmplY3RcIl0gPSAxOF0gPSBcIk9iamVjdFwiO1xyXG4gICAgICAgIFN5bWJvbEtpbmRbU3ltYm9sS2luZFtcIktleVwiXSA9IDE5XSA9IFwiS2V5XCI7XHJcbiAgICAgICAgU3ltYm9sS2luZFtTeW1ib2xLaW5kW1wiTnVsbFwiXSA9IDIwXSA9IFwiTnVsbFwiO1xyXG4gICAgICAgIFN5bWJvbEtpbmRbU3ltYm9sS2luZFtcIkVudW1NZW1iZXJcIl0gPSAyMV0gPSBcIkVudW1NZW1iZXJcIjtcclxuICAgICAgICBTeW1ib2xLaW5kW1N5bWJvbEtpbmRbXCJTdHJ1Y3RcIl0gPSAyMl0gPSBcIlN0cnVjdFwiO1xyXG4gICAgICAgIFN5bWJvbEtpbmRbU3ltYm9sS2luZFtcIkV2ZW50XCJdID0gMjNdID0gXCJFdmVudFwiO1xyXG4gICAgICAgIFN5bWJvbEtpbmRbU3ltYm9sS2luZFtcIk9wZXJhdG9yXCJdID0gMjRdID0gXCJPcGVyYXRvclwiO1xyXG4gICAgICAgIFN5bWJvbEtpbmRbU3ltYm9sS2luZFtcIlR5cGVQYXJhbWV0ZXJcIl0gPSAyNV0gPSBcIlR5cGVQYXJhbWV0ZXJcIjtcclxuICAgIH0pKFN5bWJvbEtpbmQgPSB2c2NNb2NrLlN5bWJvbEtpbmQgfHwgKHZzY01vY2suU3ltYm9sS2luZCA9IHt9KSk7XHJcbn0pKHZzY01vY2sgPSBleHBvcnRzLnZzY01vY2sgfHwgKGV4cG9ydHMudnNjTW9jayA9IHt9KSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCJdfQ==