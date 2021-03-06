// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

const fileSystem_1 = require("./fileSystem");

const platformService_1 = require("./platformService");

const registry_1 = require("./registry");

const types_1 = require("./types");

function registerTypes(serviceManager) {
  serviceManager.addSingleton(types_1.IPlatformService, platformService_1.PlatformService);
  serviceManager.addSingleton(types_1.IFileSystem, fileSystem_1.FileSystem);

  if (serviceManager.get(types_1.IPlatformService).isWindows) {
    serviceManager.addSingleton(types_1.IRegistry, registry_1.RegistryImplementation);
  }
}

exports.registerTypes = registerTypes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VSZWdpc3RyeS5qcyJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsImZpbGVTeXN0ZW1fMSIsInJlcXVpcmUiLCJwbGF0Zm9ybVNlcnZpY2VfMSIsInJlZ2lzdHJ5XzEiLCJ0eXBlc18xIiwicmVnaXN0ZXJUeXBlcyIsInNlcnZpY2VNYW5hZ2VyIiwiYWRkU2luZ2xldG9uIiwiSVBsYXRmb3JtU2VydmljZSIsIlBsYXRmb3JtU2VydmljZSIsIklGaWxlU3lzdGVtIiwiRmlsZVN5c3RlbSIsImdldCIsImlzV2luZG93cyIsIklSZWdpc3RyeSIsIlJlZ2lzdHJ5SW1wbGVtZW50YXRpb24iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTs7QUFDQUEsTUFBTSxDQUFDQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUFFQyxFQUFBQSxLQUFLLEVBQUU7QUFBVCxDQUE3Qzs7QUFDQSxNQUFNQyxZQUFZLEdBQUdDLE9BQU8sQ0FBQyxjQUFELENBQTVCOztBQUNBLE1BQU1DLGlCQUFpQixHQUFHRCxPQUFPLENBQUMsbUJBQUQsQ0FBakM7O0FBQ0EsTUFBTUUsVUFBVSxHQUFHRixPQUFPLENBQUMsWUFBRCxDQUExQjs7QUFDQSxNQUFNRyxPQUFPLEdBQUdILE9BQU8sQ0FBQyxTQUFELENBQXZCOztBQUNBLFNBQVNJLGFBQVQsQ0FBdUJDLGNBQXZCLEVBQXVDO0FBQ25DQSxFQUFBQSxjQUFjLENBQUNDLFlBQWYsQ0FBNEJILE9BQU8sQ0FBQ0ksZ0JBQXBDLEVBQXNETixpQkFBaUIsQ0FBQ08sZUFBeEU7QUFDQUgsRUFBQUEsY0FBYyxDQUFDQyxZQUFmLENBQTRCSCxPQUFPLENBQUNNLFdBQXBDLEVBQWlEVixZQUFZLENBQUNXLFVBQTlEOztBQUNBLE1BQUlMLGNBQWMsQ0FBQ00sR0FBZixDQUFtQlIsT0FBTyxDQUFDSSxnQkFBM0IsRUFBNkNLLFNBQWpELEVBQTREO0FBQ3hEUCxJQUFBQSxjQUFjLENBQUNDLFlBQWYsQ0FBNEJILE9BQU8sQ0FBQ1UsU0FBcEMsRUFBK0NYLFVBQVUsQ0FBQ1ksc0JBQTFEO0FBQ0g7QUFDSjs7QUFDRGpCLE9BQU8sQ0FBQ08sYUFBUixHQUF3QkEsYUFBeEIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG4ndXNlIHN0cmljdCc7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgZmlsZVN5c3RlbV8xID0gcmVxdWlyZShcIi4vZmlsZVN5c3RlbVwiKTtcclxuY29uc3QgcGxhdGZvcm1TZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi9wbGF0Zm9ybVNlcnZpY2VcIik7XHJcbmNvbnN0IHJlZ2lzdHJ5XzEgPSByZXF1aXJlKFwiLi9yZWdpc3RyeVwiKTtcclxuY29uc3QgdHlwZXNfMSA9IHJlcXVpcmUoXCIuL3R5cGVzXCIpO1xyXG5mdW5jdGlvbiByZWdpc3RlclR5cGVzKHNlcnZpY2VNYW5hZ2VyKSB7XHJcbiAgICBzZXJ2aWNlTWFuYWdlci5hZGRTaW5nbGV0b24odHlwZXNfMS5JUGxhdGZvcm1TZXJ2aWNlLCBwbGF0Zm9ybVNlcnZpY2VfMS5QbGF0Zm9ybVNlcnZpY2UpO1xyXG4gICAgc2VydmljZU1hbmFnZXIuYWRkU2luZ2xldG9uKHR5cGVzXzEuSUZpbGVTeXN0ZW0sIGZpbGVTeXN0ZW1fMS5GaWxlU3lzdGVtKTtcclxuICAgIGlmIChzZXJ2aWNlTWFuYWdlci5nZXQodHlwZXNfMS5JUGxhdGZvcm1TZXJ2aWNlKS5pc1dpbmRvd3MpIHtcclxuICAgICAgICBzZXJ2aWNlTWFuYWdlci5hZGRTaW5nbGV0b24odHlwZXNfMS5JUmVnaXN0cnksIHJlZ2lzdHJ5XzEuUmVnaXN0cnlJbXBsZW1lbnRhdGlvbik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5yZWdpc3RlclR5cGVzID0gcmVnaXN0ZXJUeXBlcztcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2VydmljZVJlZ2lzdHJ5LmpzLm1hcCJdfQ==