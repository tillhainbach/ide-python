// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
}); // tslint:disable:max-classes-per-file

const path = require("path");

const constants_1 = require("../../../common/constants");

class NoDebugLauncherScriptProvider {
  getLauncherFilePath() {
    return path.join(constants_1.EXTENSION_ROOT_DIR, 'pythonFiles', 'experimental', 'ptvsd_launcher.py');
  }

}

exports.NoDebugLauncherScriptProvider = NoDebugLauncherScriptProvider;

class DebuggerLauncherScriptProvider {
  getLauncherFilePath() {
    return path.join(constants_1.EXTENSION_ROOT_DIR, 'pythonFiles', 'experimental', 'ptvsd_launcher.py');
  }

}

exports.DebuggerLauncherScriptProvider = DebuggerLauncherScriptProvider;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxhdW5jaGVyUHJvdmlkZXIuanMiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJwYXRoIiwicmVxdWlyZSIsImNvbnN0YW50c18xIiwiTm9EZWJ1Z0xhdW5jaGVyU2NyaXB0UHJvdmlkZXIiLCJnZXRMYXVuY2hlckZpbGVQYXRoIiwiam9pbiIsIkVYVEVOU0lPTl9ST09UX0RJUiIsIkRlYnVnZ2VyTGF1bmNoZXJTY3JpcHRQcm92aWRlciJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBOztBQUNBQSxNQUFNLENBQUNDLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQUVDLEVBQUFBLEtBQUssRUFBRTtBQUFULENBQTdDLEUsQ0FDQTs7QUFDQSxNQUFNQyxJQUFJLEdBQUdDLE9BQU8sQ0FBQyxNQUFELENBQXBCOztBQUNBLE1BQU1DLFdBQVcsR0FBR0QsT0FBTyxDQUFDLDJCQUFELENBQTNCOztBQUNBLE1BQU1FLDZCQUFOLENBQW9DO0FBQ2hDQyxFQUFBQSxtQkFBbUIsR0FBRztBQUNsQixXQUFPSixJQUFJLENBQUNLLElBQUwsQ0FBVUgsV0FBVyxDQUFDSSxrQkFBdEIsRUFBMEMsYUFBMUMsRUFBeUQsY0FBekQsRUFBeUUsbUJBQXpFLENBQVA7QUFDSDs7QUFIK0I7O0FBS3BDUixPQUFPLENBQUNLLDZCQUFSLEdBQXdDQSw2QkFBeEM7O0FBQ0EsTUFBTUksOEJBQU4sQ0FBcUM7QUFDakNILEVBQUFBLG1CQUFtQixHQUFHO0FBQ2xCLFdBQU9KLElBQUksQ0FBQ0ssSUFBTCxDQUFVSCxXQUFXLENBQUNJLGtCQUF0QixFQUEwQyxhQUExQyxFQUF5RCxjQUF6RCxFQUF5RSxtQkFBekUsQ0FBUDtBQUNIOztBQUhnQzs7QUFLckNSLE9BQU8sQ0FBQ1MsOEJBQVIsR0FBeUNBLDhCQUF6QyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcbid1c2Ugc3RyaWN0JztcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG4vLyB0c2xpbnQ6ZGlzYWJsZTptYXgtY2xhc3Nlcy1wZXItZmlsZVxyXG5jb25zdCBwYXRoID0gcmVxdWlyZShcInBhdGhcIik7XHJcbmNvbnN0IGNvbnN0YW50c18xID0gcmVxdWlyZShcIi4uLy4uLy4uL2NvbW1vbi9jb25zdGFudHNcIik7XHJcbmNsYXNzIE5vRGVidWdMYXVuY2hlclNjcmlwdFByb3ZpZGVyIHtcclxuICAgIGdldExhdW5jaGVyRmlsZVBhdGgoKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhdGguam9pbihjb25zdGFudHNfMS5FWFRFTlNJT05fUk9PVF9ESVIsICdweXRob25GaWxlcycsICdleHBlcmltZW50YWwnLCAncHR2c2RfbGF1bmNoZXIucHknKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLk5vRGVidWdMYXVuY2hlclNjcmlwdFByb3ZpZGVyID0gTm9EZWJ1Z0xhdW5jaGVyU2NyaXB0UHJvdmlkZXI7XHJcbmNsYXNzIERlYnVnZ2VyTGF1bmNoZXJTY3JpcHRQcm92aWRlciB7XHJcbiAgICBnZXRMYXVuY2hlckZpbGVQYXRoKCkge1xyXG4gICAgICAgIHJldHVybiBwYXRoLmpvaW4oY29uc3RhbnRzXzEuRVhURU5TSU9OX1JPT1RfRElSLCAncHl0aG9uRmlsZXMnLCAnZXhwZXJpbWVudGFsJywgJ3B0dnNkX2xhdW5jaGVyLnB5Jyk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5EZWJ1Z2dlckxhdW5jaGVyU2NyaXB0UHJvdmlkZXIgPSBEZWJ1Z2dlckxhdW5jaGVyU2NyaXB0UHJvdmlkZXI7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxhdW5jaGVyUHJvdmlkZXIuanMubWFwIl19