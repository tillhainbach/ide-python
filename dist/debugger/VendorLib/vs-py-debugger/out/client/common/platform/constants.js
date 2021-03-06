"use strict"; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

Object.defineProperty(exports, "__esModule", {
  value: true
});

const arch = require("arch"); // TO DO: Deprecate in favor of IPlatformService


exports.WINDOWS_PATH_VARIABLE_NAME = 'Path';
exports.NON_WINDOWS_PATH_VARIABLE_NAME = 'PATH';
exports.IS_WINDOWS = /^win/.test(process.platform);
exports.IS_64_BIT = arch() === 'x64';
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnN0YW50cy5qcyJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsImFyY2giLCJyZXF1aXJlIiwiV0lORE9XU19QQVRIX1ZBUklBQkxFX05BTUUiLCJOT05fV0lORE9XU19QQVRIX1ZBUklBQkxFX05BTUUiLCJJU19XSU5ET1dTIiwidGVzdCIsInByb2Nlc3MiLCJwbGF0Zm9ybSIsIklTXzY0X0JJVCJdLCJtYXBwaW5ncyI6IkFBQUEsYSxDQUNBO0FBQ0E7O0FBQ0FBLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFBRUMsRUFBQUEsS0FBSyxFQUFFO0FBQVQsQ0FBN0M7O0FBQ0EsTUFBTUMsSUFBSSxHQUFHQyxPQUFPLENBQUMsTUFBRCxDQUFwQixDLENBQ0E7OztBQUNBSCxPQUFPLENBQUNJLDBCQUFSLEdBQXFDLE1BQXJDO0FBQ0FKLE9BQU8sQ0FBQ0ssOEJBQVIsR0FBeUMsTUFBekM7QUFDQUwsT0FBTyxDQUFDTSxVQUFSLEdBQXFCLE9BQU9DLElBQVAsQ0FBWUMsT0FBTyxDQUFDQyxRQUFwQixDQUFyQjtBQUNBVCxPQUFPLENBQUNVLFNBQVIsR0FBb0JSLElBQUksT0FBTyxLQUEvQiIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG4vLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IGFyY2ggPSByZXF1aXJlKFwiYXJjaFwiKTtcclxuLy8gVE8gRE86IERlcHJlY2F0ZSBpbiBmYXZvciBvZiBJUGxhdGZvcm1TZXJ2aWNlXHJcbmV4cG9ydHMuV0lORE9XU19QQVRIX1ZBUklBQkxFX05BTUUgPSAnUGF0aCc7XHJcbmV4cG9ydHMuTk9OX1dJTkRPV1NfUEFUSF9WQVJJQUJMRV9OQU1FID0gJ1BBVEgnO1xyXG5leHBvcnRzLklTX1dJTkRPV1MgPSAvXndpbi8udGVzdChwcm9jZXNzLnBsYXRmb3JtKTtcclxuZXhwb3J0cy5JU182NF9CSVQgPSBhcmNoKCkgPT09ICd4NjQnO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25zdGFudHMuanMubWFwIl19