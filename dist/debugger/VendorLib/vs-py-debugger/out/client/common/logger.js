"use strict"; // tslint:disable:no-console

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
var Logger_1;

const inversify_1 = require("inversify");

const helpers_1 = require("./helpers");

const types_1 = require("./types");

const PREFIX = 'Python Extension: ';
let Logger = Logger_1 = class Logger {
  // tslint:disable-next-line:no-any
  static error(title = '', message) {
    new Logger_1().logError(`${title}, ${message}`);
  } // tslint:disable-next-line:no-any


  static warn(title = '', message = '') {
    new Logger_1().logWarning(`${title}, ${message}`);
  } // tslint:disable-next-line:no-any


  static verbose(title = '') {
    new Logger_1().logInformation(title);
  }

  logError(message, ex) {
    if (ex) {
      console.error(`${PREFIX}${message}`, ex);
    } else {
      console.error(`${PREFIX}${message}`);
    }
  }

  logWarning(message, ex) {
    if (ex) {
      console.warn(`${PREFIX}${message}`, ex);
    } else {
      console.warn(`${PREFIX}${message}`);
    }
  }

  logInformation(message, ex) {
    if (ex) {
      console.info(`${PREFIX}${message}`, ex);
    } else {
      console.info(`${PREFIX}${message}`);
    }
  }

};

__decorate([helpers_1.skipIfTest(false)], Logger.prototype, "logError", null);

__decorate([helpers_1.skipIfTest(false)], Logger.prototype, "logWarning", null);

__decorate([helpers_1.skipIfTest(false)], Logger.prototype, "logInformation", null);

Logger = Logger_1 = __decorate([inversify_1.injectable()], Logger);
exports.Logger = Logger;
var LogOptions;

(function (LogOptions) {
  LogOptions[LogOptions["None"] = 0] = "None";
  LogOptions[LogOptions["Arguments"] = 1] = "Arguments";
  LogOptions[LogOptions["ReturnValue"] = 2] = "ReturnValue";
})(LogOptions || (LogOptions = {})); // tslint:disable-next-line:no-any


function argsToLogString(args) {
  try {
    return (args || []).map((item, index) => {
      try {
        return `Arg ${index + 1}: ${JSON.stringify(item)}`;
      } catch (_a) {
        return `Arg ${index + 1}: UNABLE TO DETERMINE VALUE`;
      }
    }).join(', ');
  } catch (_a) {
    return '';
  }
} // tslint:disable-next-line:no-any


function returnValueToLogString(returnValue) {
  let returnValueMessage = 'Return Value: ';

  if (returnValue) {
    try {
      returnValueMessage += `${JSON.stringify(returnValue)}`;
    } catch (_a) {
      returnValueMessage += 'UNABLE TO DETERMINE VALUE';
    }
  }

  return returnValueMessage;
}

function traceVerbose(message) {
  return trace(message, LogOptions.Arguments | LogOptions.ReturnValue);
}

exports.traceVerbose = traceVerbose;

function traceError(message, ex) {
  return trace(message, LogOptions.Arguments | LogOptions.ReturnValue, types_1.LogLevel.Error);
}

exports.traceError = traceError;

function traceInfo(message) {
  return trace(message);
}

exports.traceInfo = traceInfo;

function trace(message, options = LogOptions.None, logLevel) {
  // tslint:disable-next-line:no-function-expression no-any
  return function (_, __, descriptor) {
    const originalMethod = descriptor.value; // tslint:disable-next-line:no-function-expression no-any

    descriptor.value = function (...args) {
      // tslint:disable-next-line:no-any
      function writeSuccess(returnValue) {
        if (logLevel === types_1.LogLevel.Error) {
          return;
        }

        writeToLog(returnValue);
      }

      function writeError(ex) {
        writeToLog(undefined, ex);
      } // tslint:disable-next-line:no-any


      function writeToLog(returnValue, ex) {
        const messagesToLog = [message];

        if ((options && LogOptions.Arguments) === LogOptions.Arguments) {
          messagesToLog.push(argsToLogString(args));
        }

        if ((options & LogOptions.ReturnValue) === LogOptions.ReturnValue) {
          messagesToLog.push(returnValueToLogString(returnValue));
        }

        if (ex) {
          new Logger().logError(messagesToLog.join(', '), ex);
        } else {
          new Logger().logInformation(messagesToLog.join(', '));
        }
      }

      try {
        // tslint:disable-next-line:no-invalid-this no-use-before-declare no-unsafe-any
        const result = originalMethod.apply(this, args); // If method being wrapped returns a promise then wait for it.
        // tslint:disable-next-line:no-unsafe-any

        if (result && typeof result.then === 'function' && typeof result.catch === 'function') {
          // tslint:disable-next-line:prefer-type-cast
          result.then(data => {
            writeSuccess(data);
            return data;
          }).catch(ex => {
            writeError(ex);
            return Promise.reject(ex);
          });
        } else {
          writeSuccess(result);
        }

        return result;
      } catch (ex) {
        writeError(ex);
        throw ex;
      }
    };

    return descriptor;
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2dlci5qcyJdLCJuYW1lcyI6WyJfX2RlY29yYXRlIiwiZGVjb3JhdG9ycyIsInRhcmdldCIsImtleSIsImRlc2MiLCJjIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiciIsIk9iamVjdCIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImQiLCJSZWZsZWN0IiwiZGVjb3JhdGUiLCJpIiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJMb2dnZXJfMSIsImludmVyc2lmeV8xIiwicmVxdWlyZSIsImhlbHBlcnNfMSIsInR5cGVzXzEiLCJQUkVGSVgiLCJMb2dnZXIiLCJlcnJvciIsInRpdGxlIiwibWVzc2FnZSIsImxvZ0Vycm9yIiwid2FybiIsImxvZ1dhcm5pbmciLCJ2ZXJib3NlIiwibG9nSW5mb3JtYXRpb24iLCJleCIsImNvbnNvbGUiLCJpbmZvIiwic2tpcElmVGVzdCIsInByb3RvdHlwZSIsImluamVjdGFibGUiLCJMb2dPcHRpb25zIiwiYXJnc1RvTG9nU3RyaW5nIiwiYXJncyIsIm1hcCIsIml0ZW0iLCJpbmRleCIsIkpTT04iLCJzdHJpbmdpZnkiLCJfYSIsImpvaW4iLCJyZXR1cm5WYWx1ZVRvTG9nU3RyaW5nIiwicmV0dXJuVmFsdWUiLCJyZXR1cm5WYWx1ZU1lc3NhZ2UiLCJ0cmFjZVZlcmJvc2UiLCJ0cmFjZSIsIkFyZ3VtZW50cyIsIlJldHVyblZhbHVlIiwidHJhY2VFcnJvciIsIkxvZ0xldmVsIiwiRXJyb3IiLCJ0cmFjZUluZm8iLCJvcHRpb25zIiwiTm9uZSIsImxvZ0xldmVsIiwiXyIsIl9fIiwiZGVzY3JpcHRvciIsIm9yaWdpbmFsTWV0aG9kIiwid3JpdGVTdWNjZXNzIiwid3JpdGVUb0xvZyIsIndyaXRlRXJyb3IiLCJ1bmRlZmluZWQiLCJtZXNzYWdlc1RvTG9nIiwicHVzaCIsInJlc3VsdCIsImFwcGx5IiwidGhlbiIsImNhdGNoIiwiZGF0YSIsIlByb21pc2UiLCJyZWplY3QiXSwibWFwcGluZ3MiOiJB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Q1EsS0FBZixDQUFxQixJQUFyQixFQUEyQmpDLElBQTNCLENBQWYsQ0FGQSxDQUdBO0FBQ0E7O0FBQ0EsWUFBSWdDLE1BQU0sSUFBSSxPQUFPQSxNQUFNLENBQUNFLElBQWQsS0FBdUIsVUFBakMsSUFBK0MsT0FBT0YsTUFBTSxDQUFDRyxLQUFkLEtBQXdCLFVBQTNFLEVBQXVGO0FBQ25GO0FBQ0FILFVBQUFBLE1BQU0sQ0FDREUsSUFETCxDQUNVRSxJQUFJLElBQUk7QUFDZFYsWUFBQUEsWUFBWSxDQUFDVSxJQUFELENBQVo7QUFDQSxtQkFBT0EsSUFBUDtBQUNILFdBSkQsRUFLS0QsS0FMTCxDQUtXM0MsRUFBRSxJQUFJO0FBQ2JvQyxZQUFBQSxVQUFVLENBQUNwQyxFQUFELENBQVY7QUFDQSxtQkFBTzZDLE9BQU8sQ0FBQ0MsTUFBUixDQUFlOUMsRUFBZixDQUFQO0FBQ0gsV0FSRDtBQVNILFNBWEQsTUFZSztBQUNEa0MsVUFBQUEsWUFBWSxDQUFDTSxNQUFELENBQVo7QUFDSDs7QUFDRCxlQUFPQSxNQUFQO0FBQ0gsT0FyQkQsQ0FzQkEsT0FBT3hDLEVBQVAsRUFBVztBQUNQb0MsUUFBQUEsVUFBVSxDQUFDcEMsRUFBRCxDQUFWO0FBQ0EsY0FBTUEsRUFBTjtBQUNIO0FBQ0osS0FyREQ7O0FBc0RBLFdBQU9nQyxVQUFQO0FBQ0gsR0ExREQ7QUEyREgiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuLy8gdHNsaW50OmRpc2FibGU6bm8tY29uc29sZVxyXG52YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBMb2dnZXJfMTtcclxuY29uc3QgaW52ZXJzaWZ5XzEgPSByZXF1aXJlKFwiaW52ZXJzaWZ5XCIpO1xyXG5jb25zdCBoZWxwZXJzXzEgPSByZXF1aXJlKFwiLi9oZWxwZXJzXCIpO1xyXG5jb25zdCB0eXBlc18xID0gcmVxdWlyZShcIi4vdHlwZXNcIik7XHJcbmNvbnN0IFBSRUZJWCA9ICdQeXRob24gRXh0ZW5zaW9uOiAnO1xyXG5sZXQgTG9nZ2VyID0gTG9nZ2VyXzEgPSBjbGFzcyBMb2dnZXIge1xyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxyXG4gICAgc3RhdGljIGVycm9yKHRpdGxlID0gJycsIG1lc3NhZ2UpIHtcclxuICAgICAgICBuZXcgTG9nZ2VyXzEoKS5sb2dFcnJvcihgJHt0aXRsZX0sICR7bWVzc2FnZX1gKTtcclxuICAgIH1cclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcclxuICAgIHN0YXRpYyB3YXJuKHRpdGxlID0gJycsIG1lc3NhZ2UgPSAnJykge1xyXG4gICAgICAgIG5ldyBMb2dnZXJfMSgpLmxvZ1dhcm5pbmcoYCR7dGl0bGV9LCAke21lc3NhZ2V9YCk7XHJcbiAgICB9XHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XHJcbiAgICBzdGF0aWMgdmVyYm9zZSh0aXRsZSA9ICcnKSB7XHJcbiAgICAgICAgbmV3IExvZ2dlcl8xKCkubG9nSW5mb3JtYXRpb24odGl0bGUpO1xyXG4gICAgfVxyXG4gICAgbG9nRXJyb3IobWVzc2FnZSwgZXgpIHtcclxuICAgICAgICBpZiAoZXgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgJHtQUkVGSVh9JHttZXNzYWdlfWAsIGV4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYCR7UFJFRklYfSR7bWVzc2FnZX1gKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBsb2dXYXJuaW5nKG1lc3NhZ2UsIGV4KSB7XHJcbiAgICAgICAgaWYgKGV4KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgJHtQUkVGSVh9JHttZXNzYWdlfWAsIGV4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgJHtQUkVGSVh9JHttZXNzYWdlfWApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGxvZ0luZm9ybWF0aW9uKG1lc3NhZ2UsIGV4KSB7XHJcbiAgICAgICAgaWYgKGV4KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhgJHtQUkVGSVh9JHttZXNzYWdlfWAsIGV4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhgJHtQUkVGSVh9JHttZXNzYWdlfWApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuX19kZWNvcmF0ZShbXHJcbiAgICBoZWxwZXJzXzEuc2tpcElmVGVzdChmYWxzZSlcclxuXSwgTG9nZ2VyLnByb3RvdHlwZSwgXCJsb2dFcnJvclwiLCBudWxsKTtcclxuX19kZWNvcmF0ZShbXHJcbiAgICBoZWxwZXJzXzEuc2tpcElmVGVzdChmYWxzZSlcclxuXSwgTG9nZ2VyLnByb3RvdHlwZSwgXCJsb2dXYXJuaW5nXCIsIG51bGwpO1xyXG5fX2RlY29yYXRlKFtcclxuICAgIGhlbHBlcnNfMS5za2lwSWZUZXN0KGZhbHNlKVxyXG5dLCBMb2dnZXIucHJvdG90eXBlLCBcImxvZ0luZm9ybWF0aW9uXCIsIG51bGwpO1xyXG5Mb2dnZXIgPSBMb2dnZXJfMSA9IF9fZGVjb3JhdGUoW1xyXG4gICAgaW52ZXJzaWZ5XzEuaW5qZWN0YWJsZSgpXHJcbl0sIExvZ2dlcik7XHJcbmV4cG9ydHMuTG9nZ2VyID0gTG9nZ2VyO1xyXG52YXIgTG9nT3B0aW9ucztcclxuKGZ1bmN0aW9uIChMb2dPcHRpb25zKSB7XHJcbiAgICBMb2dPcHRpb25zW0xvZ09wdGlvbnNbXCJOb25lXCJdID0gMF0gPSBcIk5vbmVcIjtcclxuICAgIExvZ09wdGlvbnNbTG9nT3B0aW9uc1tcIkFyZ3VtZW50c1wiXSA9IDFdID0gXCJBcmd1bWVudHNcIjtcclxuICAgIExvZ09wdGlvbnNbTG9nT3B0aW9uc1tcIlJldHVyblZhbHVlXCJdID0gMl0gPSBcIlJldHVyblZhbHVlXCI7XHJcbn0pKExvZ09wdGlvbnMgfHwgKExvZ09wdGlvbnMgPSB7fSkpO1xyXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XHJcbmZ1bmN0aW9uIGFyZ3NUb0xvZ1N0cmluZyhhcmdzKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHJldHVybiAoYXJncyB8fCBbXSkubWFwKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGBBcmcgJHtpbmRleCArIDF9OiAke0pTT04uc3RyaW5naWZ5KGl0ZW0pfWA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKF9hKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYEFyZyAke2luZGV4ICsgMX06IFVOQUJMRSBUTyBERVRFUk1JTkUgVkFMVUVgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkuam9pbignLCAnKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChfYSkge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxufVxyXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XHJcbmZ1bmN0aW9uIHJldHVyblZhbHVlVG9Mb2dTdHJpbmcocmV0dXJuVmFsdWUpIHtcclxuICAgIGxldCByZXR1cm5WYWx1ZU1lc3NhZ2UgPSAnUmV0dXJuIFZhbHVlOiAnO1xyXG4gICAgaWYgKHJldHVyblZhbHVlKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcmV0dXJuVmFsdWVNZXNzYWdlICs9IGAke0pTT04uc3RyaW5naWZ5KHJldHVyblZhbHVlKX1gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoX2EpIHtcclxuICAgICAgICAgICAgcmV0dXJuVmFsdWVNZXNzYWdlICs9ICdVTkFCTEUgVE8gREVURVJNSU5FIFZBTFVFJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmV0dXJuVmFsdWVNZXNzYWdlO1xyXG59XHJcbmZ1bmN0aW9uIHRyYWNlVmVyYm9zZShtZXNzYWdlKSB7XHJcbiAgICByZXR1cm4gdHJhY2UobWVzc2FnZSwgTG9nT3B0aW9ucy5Bcmd1bWVudHMgfCBMb2dPcHRpb25zLlJldHVyblZhbHVlKTtcclxufVxyXG5leHBvcnRzLnRyYWNlVmVyYm9zZSA9IHRyYWNlVmVyYm9zZTtcclxuZnVuY3Rpb24gdHJhY2VFcnJvcihtZXNzYWdlLCBleCkge1xyXG4gICAgcmV0dXJuIHRyYWNlKG1lc3NhZ2UsIExvZ09wdGlvbnMuQXJndW1lbnRzIHwgTG9nT3B0aW9ucy5SZXR1cm5WYWx1ZSwgdHlwZXNfMS5Mb2dMZXZlbC5FcnJvcik7XHJcbn1cclxuZXhwb3J0cy50cmFjZUVycm9yID0gdHJhY2VFcnJvcjtcclxuZnVuY3Rpb24gdHJhY2VJbmZvKG1lc3NhZ2UpIHtcclxuICAgIHJldHVybiB0cmFjZShtZXNzYWdlKTtcclxufVxyXG5leHBvcnRzLnRyYWNlSW5mbyA9IHRyYWNlSW5mbztcclxuZnVuY3Rpb24gdHJhY2UobWVzc2FnZSwgb3B0aW9ucyA9IExvZ09wdGlvbnMuTm9uZSwgbG9nTGV2ZWwpIHtcclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1mdW5jdGlvbi1leHByZXNzaW9uIG5vLWFueVxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChfLCBfXywgZGVzY3JpcHRvcikge1xyXG4gICAgICAgIGNvbnN0IG9yaWdpbmFsTWV0aG9kID0gZGVzY3JpcHRvci52YWx1ZTtcclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZnVuY3Rpb24tZXhwcmVzc2lvbiBuby1hbnlcclxuICAgICAgICBkZXNjcmlwdG9yLnZhbHVlID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxyXG4gICAgICAgICAgICBmdW5jdGlvbiB3cml0ZVN1Y2Nlc3MocmV0dXJuVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChsb2dMZXZlbCA9PT0gdHlwZXNfMS5Mb2dMZXZlbC5FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHdyaXRlVG9Mb2cocmV0dXJuVmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHdyaXRlRXJyb3IoZXgpIHtcclxuICAgICAgICAgICAgICAgIHdyaXRlVG9Mb2codW5kZWZpbmVkLCBleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxyXG4gICAgICAgICAgICBmdW5jdGlvbiB3cml0ZVRvTG9nKHJldHVyblZhbHVlLCBleCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZXNUb0xvZyA9IFttZXNzYWdlXTtcclxuICAgICAgICAgICAgICAgIGlmICgob3B0aW9ucyAmJiBMb2dPcHRpb25zLkFyZ3VtZW50cykgPT09IExvZ09wdGlvbnMuQXJndW1lbnRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXNUb0xvZy5wdXNoKGFyZ3NUb0xvZ1N0cmluZyhhcmdzKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoKG9wdGlvbnMgJiBMb2dPcHRpb25zLlJldHVyblZhbHVlKSA9PT0gTG9nT3B0aW9ucy5SZXR1cm5WYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VzVG9Mb2cucHVzaChyZXR1cm5WYWx1ZVRvTG9nU3RyaW5nKHJldHVyblZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXcgTG9nZ2VyKCkubG9nRXJyb3IobWVzc2FnZXNUb0xvZy5qb2luKCcsICcpLCBleCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXcgTG9nZ2VyKCkubG9nSW5mb3JtYXRpb24obWVzc2FnZXNUb0xvZy5qb2luKCcsICcpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWludmFsaWQtdGhpcyBuby11c2UtYmVmb3JlLWRlY2xhcmUgbm8tdW5zYWZlLWFueVxyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gb3JpZ2luYWxNZXRob2QuYXBwbHkodGhpcywgYXJncyk7XHJcbiAgICAgICAgICAgICAgICAvLyBJZiBtZXRob2QgYmVpbmcgd3JhcHBlZCByZXR1cm5zIGEgcHJvbWlzZSB0aGVuIHdhaXQgZm9yIGl0LlxyXG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVuc2FmZS1hbnlcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgJiYgdHlwZW9mIHJlc3VsdC50aGVuID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiByZXN1bHQuY2F0Y2ggPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6cHJlZmVyLXR5cGUtY2FzdFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVTdWNjZXNzKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZXggPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3cml0ZUVycm9yKGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGV4KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHdyaXRlU3VjY2VzcyhyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXgpIHtcclxuICAgICAgICAgICAgICAgIHdyaXRlRXJyb3IoZXgpO1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgZXg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBkZXNjcmlwdG9yO1xyXG4gICAgfTtcclxufVxyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1sb2dnZXIuanMubWFwIl19