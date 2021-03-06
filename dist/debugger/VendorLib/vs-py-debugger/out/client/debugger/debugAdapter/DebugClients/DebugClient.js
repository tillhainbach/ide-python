"use strict"; // tslint:disable:quotemark ordered-imports no-any no-empty

Object.defineProperty(exports, "__esModule", {
  value: true
});

const events_1 = require("events");

var DebugType;

(function (DebugType) {
  DebugType[DebugType["Local"] = 0] = "Local";
  DebugType[DebugType["Remote"] = 1] = "Remote";
  DebugType[DebugType["RunLocal"] = 2] = "RunLocal";
})(DebugType = exports.DebugType || (exports.DebugType = {}));

class DebugClient extends events_1.EventEmitter {
  constructor(args, debugSession) {
    super();
    this.args = args;
    this.debugSession = debugSession;
  }

  get DebugType() {
    return DebugType.Local;
  }

  Stop() {}

  LaunchApplicationToDebug(dbgServer) {
    return Promise.resolve();
  }

}

exports.DebugClient = DebugClient;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRlYnVnQ2xpZW50LmpzIl0sIm5hbWVzIjpbIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwiZXZlbnRzXzEiLCJyZXF1aXJlIiwiRGVidWdUeXBlIiwiRGVidWdDbGllbnQiLCJFdmVudEVtaXR0ZXIiLCJjb25zdHJ1Y3RvciIsImFyZ3MiLCJkZWJ1Z1Nlc3Npb24iLCJMb2NhbCIsIlN0b3AiLCJMYXVuY2hBcHBsaWNhdGlvblRvRGVidWciLCJkYmdTZXJ2ZXIiLCJQcm9taXNlIiwicmVzb2x2ZSJdLCJtYXBwaW5ncyI6IkFBQUEsYSxDQUNBOztBQUNBQSxNQUFNLENBQUNDLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQUVDLEVBQUFBLEtBQUssRUFBRTtBQUFULENBQTdDOztBQUNBLE1BQU1DLFFBQVEsR0FBR0MsT0FBTyxDQUFDLFFBQUQsQ0FBeEI7O0FBQ0EsSUFBSUMsU0FBSjs7QUFDQSxDQUFDLFVBQVVBLFNBQVYsRUFBcUI7QUFDbEJBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLE9BQUQsQ0FBVCxHQUFxQixDQUF0QixDQUFULEdBQW9DLE9BQXBDO0FBQ0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLFFBQUQsQ0FBVCxHQUFzQixDQUF2QixDQUFULEdBQXFDLFFBQXJDO0FBQ0FBLEVBQUFBLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDLFVBQUQsQ0FBVCxHQUF3QixDQUF6QixDQUFULEdBQXVDLFVBQXZDO0FBQ0gsQ0FKRCxFQUlHQSxTQUFTLEdBQUdKLE9BQU8sQ0FBQ0ksU0FBUixLQUFzQkosT0FBTyxDQUFDSSxTQUFSLEdBQW9CLEVBQTFDLENBSmY7O0FBS0EsTUFBTUMsV0FBTixTQUEwQkgsUUFBUSxDQUFDSSxZQUFuQyxDQUFnRDtBQUM1Q0MsRUFBQUEsV0FBVyxDQUFDQyxJQUFELEVBQU9DLFlBQVAsRUFBcUI7QUFDNUI7QUFDQSxTQUFLRCxJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLQyxZQUFMLEdBQW9CQSxZQUFwQjtBQUNIOztBQUNELE1BQUlMLFNBQUosR0FBZ0I7QUFDWixXQUFPQSxTQUFTLENBQUNNLEtBQWpCO0FBQ0g7O0FBQ0RDLEVBQUFBLElBQUksR0FBRyxDQUNOOztBQUNEQyxFQUFBQSx3QkFBd0IsQ0FBQ0MsU0FBRCxFQUFZO0FBQ2hDLFdBQU9DLE9BQU8sQ0FBQ0MsT0FBUixFQUFQO0FBQ0g7O0FBYjJDOztBQWVoRGYsT0FBTyxDQUFDSyxXQUFSLEdBQXNCQSxXQUF0QiIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG4vLyB0c2xpbnQ6ZGlzYWJsZTpxdW90ZW1hcmsgb3JkZXJlZC1pbXBvcnRzIG5vLWFueSBuby1lbXB0eVxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IGV2ZW50c18xID0gcmVxdWlyZShcImV2ZW50c1wiKTtcclxudmFyIERlYnVnVHlwZTtcclxuKGZ1bmN0aW9uIChEZWJ1Z1R5cGUpIHtcclxuICAgIERlYnVnVHlwZVtEZWJ1Z1R5cGVbXCJMb2NhbFwiXSA9IDBdID0gXCJMb2NhbFwiO1xyXG4gICAgRGVidWdUeXBlW0RlYnVnVHlwZVtcIlJlbW90ZVwiXSA9IDFdID0gXCJSZW1vdGVcIjtcclxuICAgIERlYnVnVHlwZVtEZWJ1Z1R5cGVbXCJSdW5Mb2NhbFwiXSA9IDJdID0gXCJSdW5Mb2NhbFwiO1xyXG59KShEZWJ1Z1R5cGUgPSBleHBvcnRzLkRlYnVnVHlwZSB8fCAoZXhwb3J0cy5EZWJ1Z1R5cGUgPSB7fSkpO1xyXG5jbGFzcyBEZWJ1Z0NsaWVudCBleHRlbmRzIGV2ZW50c18xLkV2ZW50RW1pdHRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihhcmdzLCBkZWJ1Z1Nlc3Npb24pIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuYXJncyA9IGFyZ3M7XHJcbiAgICAgICAgdGhpcy5kZWJ1Z1Nlc3Npb24gPSBkZWJ1Z1Nlc3Npb247XHJcbiAgICB9XHJcbiAgICBnZXQgRGVidWdUeXBlKCkge1xyXG4gICAgICAgIHJldHVybiBEZWJ1Z1R5cGUuTG9jYWw7XHJcbiAgICB9XHJcbiAgICBTdG9wKCkge1xyXG4gICAgfVxyXG4gICAgTGF1bmNoQXBwbGljYXRpb25Ub0RlYnVnKGRiZ1NlcnZlcikge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLkRlYnVnQ2xpZW50ID0gRGVidWdDbGllbnQ7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPURlYnVnQ2xpZW50LmpzLm1hcCJdfQ==