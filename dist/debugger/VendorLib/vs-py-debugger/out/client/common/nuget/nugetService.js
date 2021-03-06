// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';

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

const path = require("path");

const semver_1 = require("semver");

let NugetService = class NugetService {
  isReleaseVersion(version) {
    return version.prerelease.length === 0;
  }

  getVersionFromPackageFileName(packageName) {
    const ext = path.extname(packageName);
    const versionWithExt = packageName.substring(packageName.indexOf('.') + 1);
    const version = versionWithExt.substring(0, versionWithExt.length - ext.length); // Take only the first 3 parts.

    const parts = version.split('.');
    const semverParts = parts.filter((_, index) => index <= 2).join('.');
    const lastParts = parts.filter((_, index) => index === 3).join('.');
    const suffix = lastParts.length === 0 ? '' : `-${lastParts}`;
    const fixedVersion = `${semverParts}${suffix}`;
    return semver_1.parse(fixedVersion, true) || new semver_1.SemVer('0.0.0');
  }

};
NugetService = __decorate([inversify_1.injectable()], NugetService);
exports.NugetService = NugetService;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm51Z2V0U2VydmljZS5qcyJdLCJuYW1lcyI6WyJfX2RlY29yYXRlIiwiZGVjb3JhdG9ycyIsInRhcmdldCIsImtleSIsImRlc2MiLCJjIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiciIsIk9iamVjdCIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImQiLCJSZWZsZWN0IiwiZGVjb3JhdGUiLCJpIiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJpbnZlcnNpZnlfMSIsInJlcXVpcmUiLCJwYXRoIiwic2VtdmVyXzEiLCJOdWdldFNlcnZpY2UiLCJpc1JlbGVhc2VWZXJzaW9uIiwidmVyc2lvbiIsInByZXJlbGVhc2UiLCJnZXRWZXJzaW9uRnJvbVBhY2thZ2VGaWxlTmFtZSIsInBhY2thZ2VOYW1lIiwiZXh0IiwiZXh0bmFtZSIsInZlcnNpb25XaXRoRXh0Iiwic3Vic3RyaW5nIiwiaW5kZXhPZiIsInBhcnRzIiwic3BsaXQiLCJzZW12ZXJQYXJ0cyIsImZpbHRlciIsIl8iLCJpbmRleCIsImpvaW4iLCJsYXN0UGFydHMiLCJzdWZmaXgiLCJmaXhlZFZlcnNpb24iLCJwYXJzZSIsIlNlbVZlciIsImluamVjdGFibGUiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTs7QUFDQSxJQUFJQSxVQUFVLEdBQUksVUFBUSxTQUFLQSxVQUFkLElBQTZCLFVBQVVDLFVBQVYsRUFBc0JDLE1BQXRCLEVBQThCQyxHQUE5QixFQUFtQ0MsSUFBbkMsRUFBeUM7QUFDbkYsTUFBSUMsQ0FBQyxHQUFHQyxTQUFTLENBQUNDLE1BQWxCO0FBQUEsTUFBMEJDLENBQUMsR0FBR0gsQ0FBQyxHQUFHLENBQUosR0FBUUgsTUFBUixHQUFpQkUsSUFBSSxLQUFLLElBQVQsR0FBZ0JBLElBQUksR0FBR0ssTUFBTSxDQUFDQyx3QkFBUCxDQUFnQ1IsTUFBaEMsRUFBd0NDLEdBQXhDLENBQXZCLEdBQXNFQyxJQUFySDtBQUFBLE1BQTJITyxDQUEzSDtBQUNBLE1BQUks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SDs7QUFmaUMsQ0FBdEM7QUFpQkF0QixZQUFZLEdBQUd0QixVQUFVLENBQUMsQ0FDdEJrQixXQUFXLENBQUMyQixVQUFaLEVBRHNCLENBQUQsRUFFdEJ2QixZQUZzQixDQUF6QjtBQUdBTixPQUFPLENBQUNNLFlBQVIsR0FBdUJBLFlBQXZCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuJ3VzZSBzdHJpY3QnO1xyXG52YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IGludmVyc2lmeV8xID0gcmVxdWlyZShcImludmVyc2lmeVwiKTtcclxuY29uc3QgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpO1xyXG5jb25zdCBzZW12ZXJfMSA9IHJlcXVpcmUoXCJzZW12ZXJcIik7XHJcbmxldCBOdWdldFNlcnZpY2UgPSBjbGFzcyBOdWdldFNlcnZpY2Uge1xyXG4gICAgaXNSZWxlYXNlVmVyc2lvbih2ZXJzaW9uKSB7XHJcbiAgICAgICAgcmV0dXJuIHZlcnNpb24ucHJlcmVsZWFzZS5sZW5ndGggPT09IDA7XHJcbiAgICB9XHJcbiAgICBnZXRWZXJzaW9uRnJvbVBhY2thZ2VGaWxlTmFtZShwYWNrYWdlTmFtZSkge1xyXG4gICAgICAgIGNvbnN0IGV4dCA9IHBhdGguZXh0bmFtZShwYWNrYWdlTmFtZSk7XHJcbiAgICAgICAgY29uc3QgdmVyc2lvbldpdGhFeHQgPSBwYWNrYWdlTmFtZS5zdWJzdHJpbmcocGFja2FnZU5hbWUuaW5kZXhPZignLicpICsgMSk7XHJcbiAgICAgICAgY29uc3QgdmVyc2lvbiA9IHZlcnNpb25XaXRoRXh0LnN1YnN0cmluZygwLCB2ZXJzaW9uV2l0aEV4dC5sZW5ndGggLSBleHQubGVuZ3RoKTtcclxuICAgICAgICAvLyBUYWtlIG9ubHkgdGhlIGZpcnN0IDMgcGFydHMuXHJcbiAgICAgICAgY29uc3QgcGFydHMgPSB2ZXJzaW9uLnNwbGl0KCcuJyk7XHJcbiAgICAgICAgY29uc3Qgc2VtdmVyUGFydHMgPSBwYXJ0cy5maWx0ZXIoKF8sIGluZGV4KSA9PiBpbmRleCA8PSAyKS5qb2luKCcuJyk7XHJcbiAgICAgICAgY29uc3QgbGFzdFBhcnRzID0gcGFydHMuZmlsdGVyKChfLCBpbmRleCkgPT4gaW5kZXggPT09IDMpLmpvaW4oJy4nKTtcclxuICAgICAgICBjb25zdCBzdWZmaXggPSBsYXN0UGFydHMubGVuZ3RoID09PSAwID8gJycgOiBgLSR7bGFzdFBhcnRzfWA7XHJcbiAgICAgICAgY29uc3QgZml4ZWRWZXJzaW9uID0gYCR7c2VtdmVyUGFydHN9JHtzdWZmaXh9YDtcclxuICAgICAgICByZXR1cm4gc2VtdmVyXzEucGFyc2UoZml4ZWRWZXJzaW9uLCB0cnVlKSB8fCBuZXcgc2VtdmVyXzEuU2VtVmVyKCcwLjAuMCcpO1xyXG4gICAgfVxyXG59O1xyXG5OdWdldFNlcnZpY2UgPSBfX2RlY29yYXRlKFtcclxuICAgIGludmVyc2lmeV8xLmluamVjdGFibGUoKVxyXG5dLCBOdWdldFNlcnZpY2UpO1xyXG5leHBvcnRzLk51Z2V0U2VydmljZSA9IE51Z2V0U2VydmljZTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bnVnZXRTZXJ2aWNlLmpzLm1hcCJdfQ==