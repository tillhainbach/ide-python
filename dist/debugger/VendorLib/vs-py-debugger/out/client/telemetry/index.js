"use strict"; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

Object.defineProperty(exports, "__esModule", {
  value: true
}); // tslint:disable-next-line:no-reference
/// <reference path="./vscode-extension-telemetry.d.ts" />

const vscode_1 = require("vscode");

const constants_1 = require("../common/constants");

const stopWatch_1 = require("../common/utils/stopWatch");

let telemetryReporter;

function getTelemetryReporter() {
  if (telemetryReporter) {
    return telemetryReporter;
  }

  const extensionId = constants_1.PVSC_EXTENSION_ID; // tslint:disable-next-line:no-non-null-assertion

  const extension = vscode_1.extensions.getExtension(extensionId); // tslint:disable-next-line:no-unsafe-any

  const extensionVersion = extension.packageJSON.version; // tslint:disable-next-line:no-unsafe-any

  const aiKey = extension.packageJSON.contributes.debuggers[0].aiKey; // tslint:disable-next-line:no-require-imports

  const reporter = require('vscode-extension-telemetry').default;

  return telemetryReporter = new reporter(extensionId, extensionVersion, aiKey);
}

function sendTelemetryEvent(eventName, durationMs, properties) {
  if (constants_1.isTestExecution()) {
    return;
  }

  const reporter = getTelemetryReporter();
  const measures = typeof durationMs === 'number' ? {
    duration: durationMs
  } : durationMs ? durationMs : undefined; // tslint:disable-next-line:no-any

  const customProperties = {};

  if (properties) {
    // tslint:disable-next-line:prefer-type-cast no-any
    const data = properties;
    Object.getOwnPropertyNames(data).forEach(prop => {
      if (data[prop] === undefined || data[prop] === null) {
        return;
      } // tslint:disable-next-line:prefer-type-cast no-any  no-unsafe-any


      customProperties[prop] = typeof data[prop] === 'string' ? data[prop] : data[prop].toString();
    });
  }

  reporter.sendTelemetryEvent(eventName, properties ? customProperties : undefined, measures);
}

exports.sendTelemetryEvent = sendTelemetryEvent; // tslint:disable-next-line:no-any function-name

function captureTelemetry(eventName, properties, captureDuration = true) {
  // tslint:disable-next-line:no-function-expression no-any
  return function (target, propertyKey, descriptor) {
    const originalMethod = descriptor.value; // tslint:disable-next-line:no-function-expression no-any

    descriptor.value = function (...args) {
      if (!captureDuration) {
        sendTelemetryEvent(eventName, undefined, properties); // tslint:disable-next-line:no-invalid-this

        return originalMethod.apply(this, args);
      }

      const stopWatch = new stopWatch_1.StopWatch(); // tslint:disable-next-line:no-invalid-this no-use-before-declare no-unsafe-any

      const result = originalMethod.apply(this, args); // If method being wrapped returns a promise then wait for it.
      // tslint:disable-next-line:no-unsafe-any

      if (result && typeof result.then === 'function' && typeof result.catch === 'function') {
        // tslint:disable-next-line:prefer-type-cast
        result.then(data => {
          sendTelemetryEvent(eventName, stopWatch.elapsedTime, properties);
          return data;
        }) // tslint:disable-next-line:promise-function-async
        .catch(ex => {
          // tslint:disable-next-line:no-any
          sendTelemetryEvent(eventName, stopWatch.elapsedTime, properties);
          return Promise.reject(ex);
        });
      } else {
        sendTelemetryEvent(eventName, stopWatch.elapsedTime, properties);
      }

      return result;
    };

    return descriptor;
  };
}

exports.captureTelemetry = captureTelemetry; // tslint:disable-next-line:no-any function-name

function sendTelemetryWhenDone(eventName, promise, stopWatch, properties) {
  stopWatch = stopWatch ? stopWatch : new stopWatch_1.StopWatch();

  if (typeof promise.then === 'function') {
    // tslint:disable-next-line:prefer-type-cast no-any
    promise.then(data => {
      // tslint:disable-next-line:no-non-null-assertion
      sendTelemetryEvent(eventName, stopWatch.elapsedTime, properties);
      return data; // tslint:disable-next-line:promise-function-async
    }, ex => {
      // tslint:disable-next-line:no-non-null-assertion
      sendTelemetryEvent(eventName, stopWatch.elapsedTime, properties);
      return Promise.reject(ex);
    });
  } else {
    throw new Error('Method is neither a Promise nor a Theneable');
  }
}

exports.sendTelemetryWhenDone = sendTelemetryWhenDone;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwidnNjb2RlXzEiLCJyZXF1aXJlIiwiY29uc3RhbnRzXzEiLCJzdG9wV2F0Y2hfMSIsInRlbGVtZXRyeVJlcG9ydGVyIiwiZ2V0VGVsZW1ldHJ5UmVwb3J0ZXIiLCJleHRlbnNpb25JZCIsIlBWU0NfRVhURU5TSU9OX0lEIiwiZXh0ZW5zaW9uIiwiZXh0ZW5zaW9ucyIsImdldEV4dGVuc2lvbiIsImV4dGVuc2lvblZlcnNpb24iLCJwYWNrYWdlSlNPTiIsInZlcnNpb24iLCJhaUtleSIsImNvbnRyaWJ1dGVzIiwiZGVidWdnZXJzIiwicmVwb3J0ZXIiLCJkZWZhdWx0Iiwic2VuZFRlbGVtZXRyeUV2ZW50IiwiZXZlbnROYW1lIiwiZHVyYXRpb25NcyIsInByb3BlcnRpZXMiLCJpc1Rlc3RFeGVjdXRpb24iLCJtZWFzdXJlcyIsImR1cmF0aW9uIiwidW5kZWZpbmVkIiwiY3VzdG9tUHJvcGVydGllcyIsImRhdGEiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwiZm9yRWFjaCIsInByb3AiLCJ0b1N0cmluZyIsImNhcHR1cmVUZWxlbWV0cnkiLCJjYXB0dXJlRHVyYXRpb24iLCJ0YXJnZXQiLCJwcm9wZXJ0eUtleSIsImRlc2NyaXB0b3IiLCJvcmlnaW5hbE1ldGhvZCIsImFyZ3MiLCJhcHBseSIsInN0b3BXYXRjaCIsIlN0b3BXYXRjaCIsInJlc3VsdCIsInRoZW4iLCJjYXRjaCIsImVsYXBzZWRUaW1lIiwiZXgiLCJQcm9taXNlIiwicmVqZWN0Iiwic2VuZFRlbGVtZXRyeVdoZW5Eb25lIiwicHJvbWlzZSIsIkVycm9yIl0sIm1hcHBpbmdzIjoiQUFBQSxhLENBQ0E7QUFDQTs7QUFDQUEsTUFBTSxDQUFDQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUFFQyxFQUFBQSxLQUFLLEVBQUU7QUFBVCxDQUE3QyxFLENBQ0E7QUFD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QUFPLENBQUNtQyxnQkFBUixHQUEyQkEsZ0JBQTNCLEMsQ0FDQTs7QUFDQSxTQUFTaUIscUJBQVQsQ0FBK0I5QixTQUEvQixFQUEwQytCLE9BQTFDLEVBQW1EVixTQUFuRCxFQUE4RG5CLFVBQTlELEVBQTBFO0FBQ3RFbUIsRUFBQUEsU0FBUyxHQUFHQSxTQUFTLEdBQUdBLFNBQUgsR0FBZSxJQUFJdEMsV0FBVyxDQUFDdUMsU0FBaEIsRUFBcEM7O0FBQ0EsTUFBSSxPQUFPUyxPQUFPLENBQUNQLElBQWYsS0FBd0IsVUFBNUIsRUFBd0M7QUFDcEM7QUFDQU8sSUFBQUEsT0FBTyxDQUNGUCxJQURMLENBQ1VoQixJQUFJLElBQUk7QUFDZDtBQUNBVCxNQUFBQSxrQkFBa0IsQ0FBQ0MsU0FBRCxFQUFZcUIsU0FBUyxDQUFDSyxXQUF0QixFQUFtQ3hCLFVBQW5DLENBQWxCO0FBQ0EsYUFBT00sSUFBUCxDQUhjLENBSWQ7QUFDSCxLQU5ELEVBTUdtQixFQUFFLElBQUk7QUFDTDtBQUNBNUIsTUFBQUEsa0JBQWtCLENBQUNDLFNBQUQsRUFBWXFCLFNBQVMsQ0FBQ0ssV0FBdEIsRUFBbUN4QixVQUFuQyxDQUFsQjtBQUNBLGFBQU8wQixPQUFPLENBQUNDLE1BQVIsQ0FBZUYsRUFBZixDQUFQO0FBQ0gsS0FWRDtBQVdILEdBYkQsTUFjSztBQUNELFVBQU0sSUFBSUssS0FBSixDQUFVLDZDQUFWLENBQU47QUFDSDtBQUNKOztBQUNEdEQsT0FBTyxDQUFDb0QscUJBQVIsR0FBZ0NBLHFCQUFoQyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG4vLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1yZWZlcmVuY2VcclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vdnNjb2RlLWV4dGVuc2lvbi10ZWxlbWV0cnkuZC50c1wiIC8+XHJcbmNvbnN0IHZzY29kZV8xID0gcmVxdWlyZShcInZzY29kZVwiKTtcclxuY29uc3QgY29uc3RhbnRzXzEgPSByZXF1aXJlKFwiLi4vY29tbW9uL2NvbnN0YW50c1wiKTtcclxuY29uc3Qgc3RvcFdhdGNoXzEgPSByZXF1aXJlKFwiLi4vY29tbW9uL3V0aWxzL3N0b3BXYXRjaFwiKTtcclxubGV0IHRlbGVtZXRyeVJlcG9ydGVyO1xyXG5mdW5jdGlvbiBnZXRUZWxlbWV0cnlSZXBvcnRlcigpIHtcclxuICAgIGlmICh0ZWxlbWV0cnlSZXBvcnRlcikge1xyXG4gICAgICAgIHJldHVybiB0ZWxlbWV0cnlSZXBvcnRlcjtcclxuICAgIH1cclxuICAgIGNvbnN0IGV4dGVuc2lvbklkID0gY29uc3RhbnRzXzEuUFZTQ19FWFRFTlNJT05fSUQ7XHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tbm9uLW51bGwtYXNzZXJ0aW9uXHJcbiAgICBjb25zdCBleHRlbnNpb24gPSB2c2NvZGVfMS5leHRlbnNpb25zLmdldEV4dGVuc2lvbihleHRlbnNpb25JZCk7XHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdW5zYWZlLWFueVxyXG4gICAgY29uc3QgZXh0ZW5zaW9uVmVyc2lvbiA9IGV4dGVuc2lvbi5wYWNrYWdlSlNPTi52ZXJzaW9uO1xyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVuc2FmZS1hbnlcclxuICAgIGNvbnN0IGFpS2V5ID0gZXh0ZW5zaW9uLnBhY2thZ2VKU09OLmNvbnRyaWJ1dGVzLmRlYnVnZ2Vyc1swXS5haUtleTtcclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1yZXF1aXJlLWltcG9ydHNcclxuICAgIGNvbnN0IHJlcG9ydGVyID0gcmVxdWlyZSgndnNjb2RlLWV4dGVuc2lvbi10ZWxlbWV0cnknKS5kZWZhdWx0O1xyXG4gICAgcmV0dXJuIHRlbGVtZXRyeVJlcG9ydGVyID0gbmV3IHJlcG9ydGVyKGV4dGVuc2lvbklkLCBleHRlbnNpb25WZXJzaW9uLCBhaUtleSk7XHJcbn1cclxuZnVuY3Rpb24gc2VuZFRlbGVtZXRyeUV2ZW50KGV2ZW50TmFtZSwgZHVyYXRpb25NcywgcHJvcGVydGllcykge1xyXG4gICAgaWYgKGNvbnN0YW50c18xLmlzVGVzdEV4ZWN1dGlvbigpKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgcmVwb3J0ZXIgPSBnZXRUZWxlbWV0cnlSZXBvcnRlcigpO1xyXG4gICAgY29uc3QgbWVhc3VyZXMgPSB0eXBlb2YgZHVyYXRpb25NcyA9PT0gJ251bWJlcicgPyB7IGR1cmF0aW9uOiBkdXJhdGlvbk1zIH0gOiAoZHVyYXRpb25NcyA/IGR1cmF0aW9uTXMgOiB1bmRlZmluZWQpO1xyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxyXG4gICAgY29uc3QgY3VzdG9tUHJvcGVydGllcyA9IHt9O1xyXG4gICAgaWYgKHByb3BlcnRpZXMpIHtcclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6cHJlZmVyLXR5cGUtY2FzdCBuby1hbnlcclxuICAgICAgICBjb25zdCBkYXRhID0gcHJvcGVydGllcztcclxuICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhkYXRhKS5mb3JFYWNoKHByb3AgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YVtwcm9wXSA9PT0gdW5kZWZpbmVkIHx8IGRhdGFbcHJvcF0gPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6cHJlZmVyLXR5cGUtY2FzdCBuby1hbnkgIG5vLXVuc2FmZS1hbnlcclxuICAgICAgICAgICAgY3VzdG9tUHJvcGVydGllc1twcm9wXSA9IHR5cGVvZiBkYXRhW3Byb3BdID09PSAnc3RyaW5nJyA/IGRhdGFbcHJvcF0gOiBkYXRhW3Byb3BdLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXBvcnRlci5zZW5kVGVsZW1ldHJ5RXZlbnQoZXZlbnROYW1lLCBwcm9wZXJ0aWVzID8gY3VzdG9tUHJvcGVydGllcyA6IHVuZGVmaW5lZCwgbWVhc3VyZXMpO1xyXG59XHJcbmV4cG9ydHMuc2VuZFRlbGVtZXRyeUV2ZW50ID0gc2VuZFRlbGVtZXRyeUV2ZW50O1xyXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55IGZ1bmN0aW9uLW5hbWVcclxuZnVuY3Rpb24gY2FwdHVyZVRlbGVtZXRyeShldmVudE5hbWUsIHByb3BlcnRpZXMsIGNhcHR1cmVEdXJhdGlvbiA9IHRydWUpIHtcclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1mdW5jdGlvbi1leHByZXNzaW9uIG5vLWFueVxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIHByb3BlcnR5S2V5LCBkZXNjcmlwdG9yKSB7XHJcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxNZXRob2QgPSBkZXNjcmlwdG9yLnZhbHVlO1xyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1mdW5jdGlvbi1leHByZXNzaW9uIG5vLWFueVxyXG4gICAgICAgIGRlc2NyaXB0b3IudmFsdWUgPSBmdW5jdGlvbiAoLi4uYXJncykge1xyXG4gICAgICAgICAgICBpZiAoIWNhcHR1cmVEdXJhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgc2VuZFRlbGVtZXRyeUV2ZW50KGV2ZW50TmFtZSwgdW5kZWZpbmVkLCBwcm9wZXJ0aWVzKTtcclxuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnZhbGlkLXRoaXNcclxuICAgICAgICAgICAgICAgIHJldHVybiBvcmlnaW5hbE1ldGhvZC5hcHBseSh0aGlzLCBhcmdzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBzdG9wV2F0Y2ggPSBuZXcgc3RvcFdhdGNoXzEuU3RvcFdhdGNoKCk7XHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnZhbGlkLXRoaXMgbm8tdXNlLWJlZm9yZS1kZWNsYXJlIG5vLXVuc2FmZS1hbnlcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gb3JpZ2luYWxNZXRob2QuYXBwbHkodGhpcywgYXJncyk7XHJcbiAgICAgICAgICAgIC8vIElmIG1ldGhvZCBiZWluZyB3cmFwcGVkIHJldHVybnMgYSBwcm9taXNlIHRoZW4gd2FpdCBmb3IgaXQuXHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby11bnNhZmUtYW55XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgJiYgdHlwZW9mIHJlc3VsdC50aGVuID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiByZXN1bHQuY2F0Y2ggPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpwcmVmZXItdHlwZS1jYXN0XHJcbiAgICAgICAgICAgICAgICByZXN1bHRcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZW5kVGVsZW1ldHJ5RXZlbnQoZXZlbnROYW1lLCBzdG9wV2F0Y2guZWxhcHNlZFRpbWUsIHByb3BlcnRpZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6cHJvbWlzZS1mdW5jdGlvbi1hc3luY1xyXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChleCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbmRUZWxlbWV0cnlFdmVudChldmVudE5hbWUsIHN0b3BXYXRjaC5lbGFwc2VkVGltZSwgcHJvcGVydGllcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGV4KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VuZFRlbGVtZXRyeUV2ZW50KGV2ZW50TmFtZSwgc3RvcFdhdGNoLmVsYXBzZWRUaW1lLCBwcm9wZXJ0aWVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIGRlc2NyaXB0b3I7XHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydHMuY2FwdHVyZVRlbGVtZXRyeSA9IGNhcHR1cmVUZWxlbWV0cnk7XHJcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnkgZnVuY3Rpb24tbmFtZVxyXG5mdW5jdGlvbiBzZW5kVGVsZW1ldHJ5V2hlbkRvbmUoZXZlbnROYW1lLCBwcm9taXNlLCBzdG9wV2F0Y2gsIHByb3BlcnRpZXMpIHtcclxuICAgIHN0b3BXYXRjaCA9IHN0b3BXYXRjaCA/IHN0b3BXYXRjaCA6IG5ldyBzdG9wV2F0Y2hfMS5TdG9wV2F0Y2goKTtcclxuICAgIGlmICh0eXBlb2YgcHJvbWlzZS50aGVuID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnByZWZlci10eXBlLWNhc3Qgbm8tYW55XHJcbiAgICAgICAgcHJvbWlzZVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLW5vbi1udWxsLWFzc2VydGlvblxyXG4gICAgICAgICAgICBzZW5kVGVsZW1ldHJ5RXZlbnQoZXZlbnROYW1lLCBzdG9wV2F0Y2guZWxhcHNlZFRpbWUsIHByb3BlcnRpZXMpO1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnByb21pc2UtZnVuY3Rpb24tYXN5bmNcclxuICAgICAgICB9LCBleCA9PiB7XHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1ub24tbnVsbC1hc3NlcnRpb25cclxuICAgICAgICAgICAgc2VuZFRlbGVtZXRyeUV2ZW50KGV2ZW50TmFtZSwgc3RvcFdhdGNoLmVsYXBzZWRUaW1lLCBwcm9wZXJ0aWVzKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGV4KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWV0aG9kIGlzIG5laXRoZXIgYSBQcm9taXNlIG5vciBhIFRoZW5lYWJsZScpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuc2VuZFRlbGVtZXRyeVdoZW5Eb25lID0gc2VuZFRlbGVtZXRyeVdoZW5Eb25lO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiXX0=