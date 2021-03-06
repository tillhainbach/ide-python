// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

const applicationDiagnostics_1 = require("./diagnostics/applicationDiagnostics");

const serviceRegistry_1 = require("./diagnostics/serviceRegistry");

const types_1 = require("./types");

function registerTypes(serviceManager) {
  serviceManager.addSingleton(types_1.IApplicationDiagnostics, applicationDiagnostics_1.ApplicationDiagnostics);
  serviceRegistry_1.registerTypes(serviceManager);
}

exports.registerTypes = registerTypes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VSZWdpc3RyeS5qcyJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsImFwcGxpY2F0aW9uRGlhZ25vc3RpY3NfMSIsInJlcXVpcmUiLCJzZXJ2aWNlUmVnaXN0cnlfMSIsInR5cGVzXzEiLCJyZWdpc3RlclR5cGVzIiwic2VydmljZU1hbmFnZXIiLCJhZGRTaW5nbGV0b24iLCJJQXBwbGljYXRpb25EaWFnbm9zdGljcyIsIkFwcGxpY2F0aW9uRGlhZ25vc3RpY3MiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTs7QUFDQUEsTUFBTSxDQUFDQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUFFQyxFQUFBQSxLQUFLLEVBQUU7QUFBVCxDQUE3Qzs7QUFDQSxNQUFNQyx3QkFBd0IsR0FBR0MsT0FBTyxDQUFDLHNDQUFELENBQXhDOztBQUNBLE1BQU1DLGlCQUFpQixHQUFHRCxPQUFPLENBQUMsK0JBQUQsQ0FBakM7O0FBQ0EsTUFBTUUsT0FBTyxHQUFHRixPQUFPLENBQUMsU0FBRCxDQUF2Qjs7QUFDQSxTQUFTRyxhQUFULENBQXVCQyxjQUF2QixFQUF1QztBQUNuQ0EsRUFBQUEsY0FBYyxDQUFDQyxZQUFmLENBQTRCSCxPQUFPLENBQUNJLHVCQUFwQyxFQUE2RFAsd0JBQXdCLENBQUNRLHNCQUF0RjtBQUNBTixFQUFBQSxpQkFBaUIsQ0FBQ0UsYUFBbEIsQ0FBZ0NDLGNBQWhDO0FBQ0g7O0FBQ0RQLE9BQU8sQ0FBQ00sYUFBUixHQUF3QkEsYUFBeEIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG4ndXNlIHN0cmljdCc7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgYXBwbGljYXRpb25EaWFnbm9zdGljc18xID0gcmVxdWlyZShcIi4vZGlhZ25vc3RpY3MvYXBwbGljYXRpb25EaWFnbm9zdGljc1wiKTtcclxuY29uc3Qgc2VydmljZVJlZ2lzdHJ5XzEgPSByZXF1aXJlKFwiLi9kaWFnbm9zdGljcy9zZXJ2aWNlUmVnaXN0cnlcIik7XHJcbmNvbnN0IHR5cGVzXzEgPSByZXF1aXJlKFwiLi90eXBlc1wiKTtcclxuZnVuY3Rpb24gcmVnaXN0ZXJUeXBlcyhzZXJ2aWNlTWFuYWdlcikge1xyXG4gICAgc2VydmljZU1hbmFnZXIuYWRkU2luZ2xldG9uKHR5cGVzXzEuSUFwcGxpY2F0aW9uRGlhZ25vc3RpY3MsIGFwcGxpY2F0aW9uRGlhZ25vc3RpY3NfMS5BcHBsaWNhdGlvbkRpYWdub3N0aWNzKTtcclxuICAgIHNlcnZpY2VSZWdpc3RyeV8xLnJlZ2lzdGVyVHlwZXMoc2VydmljZU1hbmFnZXIpO1xyXG59XHJcbmV4cG9ydHMucmVnaXN0ZXJUeXBlcyA9IHJlZ2lzdGVyVHlwZXM7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNlcnZpY2VSZWdpc3RyeS5qcy5tYXAiXX0=