"use strict";

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __param = void 0 && (void 0).__param || function (paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const inversify_1 = require("inversify");

const path = require("path");

const types_1 = require("../types");

const constants_1 = require("./constants"); // tslint:disable-next-line:no-var-requires no-require-imports


const untildify = require('untildify');

let PathUtils = class PathUtils {
  constructor(isWindows) {
    this.isWindows = isWindows;
    this.home = '';
    this.home = untildify('~');
  }

  get delimiter() {
    return path.delimiter;
  } // TO DO: Deprecate in favor of IPlatformService


  getPathVariableName() {
    return this.isWindows ? constants_1.WINDOWS_PATH_VARIABLE_NAME : constants_1.NON_WINDOWS_PATH_VARIABLE_NAME;
  }

  basename(pathValue, ext) {
    return path.basename(pathValue, ext);
  }

  getDisplayName(pathValue, cwd) {
    if (cwd && pathValue.startsWith(cwd)) {
      return `.${path.sep}${path.relative(cwd, pathValue)}`;
    } else if (pathValue.startsWith(this.home)) {
      return `~${path.sep}${path.relative(this.home, pathValue)}`;
    } else {
      return pathValue;
    }
  }

};
PathUtils = __decorate([inversify_1.injectable(), __param(0, inversify_1.inject(types_1.IsWindows))], PathUtils);
exports.PathUtils = PathUtils;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhdGhVdGlscy5qcyJdLCJuYW1lcyI6WyJfX2RlY29yYXRlIiwiZGVjb3JhdG9ycyIsInRhcmdldCIsImtleSIsImRlc2MiLCJjIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiciIsIk9iamVjdCIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImQiLCJSZWZsZWN0IiwiZGVjb3JhdGUiLCJpIiwiZGVmaW5lUHJvcGVydHkiLCJfX3BhcmFtIiwicGFyYW1JbmRleCIsImRlY29yYXRvciIsImV4cG9ydHMiLCJ2YWx1ZSIsImludmVyc2lmeV8xIiwicmVxdWlyZSIsInBhdGgiLCJ0eXBlc18xIiwiY29uc3RhbnRzXzEiLCJ1bnRpbGRpZnkiLCJQYXRoVXRpbHMiLCJjb25zdHJ1Y3RvciIsImlzV2luZG93cyIsImhvbWUiLCJkZWxpbWl0ZXIiLCJnZXRQYXRoVmFyaWFibGVOYW1lIiwiV0lORE9XU19QQVRIX1ZBUklBQkxFX05BTUUiLCJOT05fV0lORE9XU19QQVRIX1ZBUklBQkxFX05BTUUiLCJiYXNlbmFtZSIsInBhdGhWYWx1ZSIsImV4dCIsImdldERpc3BsYXlOYW1lIiwiY3dkIiwic3RhcnRzV2l0aCIsInNlcCIsInJlbGF0aXZlIiwiaW5qZWN0YWJsZSIsImluamVjdCIsIklzV2luZG93cyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBQ0EsSUFBSUEsVUFBVSxHQUFJLFVBQVEsU0FBS0EsVUFBZCxJQUE2QixVQUFVQyxVQUFWLEVBQXNCQyxNQUF0QixFQUE4QkMsR0FBOUIsRUFBbUNDLElBQW5DLEVBQXlDO0FBQ25GLE1BQUlDLENBQUMsR0FBR0MsU0FBUyxDQUFDQyxNQUFsQjtBQUFBLE1BQTBCQyxDQUFDLEdBQUdILENBQUMsR0FBRyxDQUFKLEdBQVFILE1BQVIsR0FBaUJFLElBQUksS0FBSyxJQUFULEdBQWdCQSxJQUFJLEdBQUdLLE1BQU0sQ0FBQ0Msd0JBQVAsQ0FBZ0NSLE1BQWhDLEVBQXdDQyxHQUF4QyxDQUF2QixHQUFzRUMsSUFBckg7QUFBQSxN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RUFBcEQ7QUFDSCxLQUZELE1BR0ssSUFBSUEsU0FBUyxDQUFDSSxVQUFWLENBQXFCLEtBQUtWLElBQTFCLENBQUosRUFBcUM7QUFDdEMsYUFBUSxJQUFHUCxJQUFJLENBQUNrQixHQUFJLEdBQUVsQixJQUFJLENBQUNtQixRQUFMLENBQWMsS0FBS1osSUFBbkIsRUFBeUJNLFNBQXpCLENBQW9DLEVBQTFEO0FBQ0gsS0FGSSxNQUdBO0FBQ0QsYUFBT0EsU0FBUDtBQUNIO0FBQ0o7O0FBMUIyQixDQUFoQztBQTRCQVQsU0FBUyxHQUFHM0IsVUFBVSxDQUFDLENBQ25CcUIsV0FBVyxDQUFDc0IsVUFBWixFQURtQixFQUVuQjNCLE9BQU8sQ0FBQyxDQUFELEVBQUlLLFdBQVcsQ0FBQ3VCLE1BQVosQ0FBbUJwQixPQUFPLENBQUNxQixTQUEzQixDQUFKLENBRlksQ0FBRCxFQUduQmxCLFNBSG1CLENBQXRCO0FBSUFSLE9BQU8sQ0FBQ1EsU0FBUixHQUFvQkEsU0FBcEIiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufTtcclxudmFyIF9fcGFyYW0gPSAodGhpcyAmJiB0aGlzLl9fcGFyYW0pIHx8IGZ1bmN0aW9uIChwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IGludmVyc2lmeV8xID0gcmVxdWlyZShcImludmVyc2lmeVwiKTtcclxuY29uc3QgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpO1xyXG5jb25zdCB0eXBlc18xID0gcmVxdWlyZShcIi4uL3R5cGVzXCIpO1xyXG5jb25zdCBjb25zdGFudHNfMSA9IHJlcXVpcmUoXCIuL2NvbnN0YW50c1wiKTtcclxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXZhci1yZXF1aXJlcyBuby1yZXF1aXJlLWltcG9ydHNcclxuY29uc3QgdW50aWxkaWZ5ID0gcmVxdWlyZSgndW50aWxkaWZ5Jyk7XHJcbmxldCBQYXRoVXRpbHMgPSBjbGFzcyBQYXRoVXRpbHMge1xyXG4gICAgY29uc3RydWN0b3IoaXNXaW5kb3dzKSB7XHJcbiAgICAgICAgdGhpcy5pc1dpbmRvd3MgPSBpc1dpbmRvd3M7XHJcbiAgICAgICAgdGhpcy5ob21lID0gJyc7XHJcbiAgICAgICAgdGhpcy5ob21lID0gdW50aWxkaWZ5KCd+Jyk7XHJcbiAgICB9XHJcbiAgICBnZXQgZGVsaW1pdGVyKCkge1xyXG4gICAgICAgIHJldHVybiBwYXRoLmRlbGltaXRlcjtcclxuICAgIH1cclxuICAgIC8vIFRPIERPOiBEZXByZWNhdGUgaW4gZmF2b3Igb2YgSVBsYXRmb3JtU2VydmljZVxyXG4gICAgZ2V0UGF0aFZhcmlhYmxlTmFtZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc1dpbmRvd3MgPyBjb25zdGFudHNfMS5XSU5ET1dTX1BBVEhfVkFSSUFCTEVfTkFNRSA6IGNvbnN0YW50c18xLk5PTl9XSU5ET1dTX1BBVEhfVkFSSUFCTEVfTkFNRTtcclxuICAgIH1cclxuICAgIGJhc2VuYW1lKHBhdGhWYWx1ZSwgZXh0KSB7XHJcbiAgICAgICAgcmV0dXJuIHBhdGguYmFzZW5hbWUocGF0aFZhbHVlLCBleHQpO1xyXG4gICAgfVxyXG4gICAgZ2V0RGlzcGxheU5hbWUocGF0aFZhbHVlLCBjd2QpIHtcclxuICAgICAgICBpZiAoY3dkICYmIHBhdGhWYWx1ZS5zdGFydHNXaXRoKGN3ZCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGAuJHtwYXRoLnNlcH0ke3BhdGgucmVsYXRpdmUoY3dkLCBwYXRoVmFsdWUpfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHBhdGhWYWx1ZS5zdGFydHNXaXRoKHRoaXMuaG9tZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGB+JHtwYXRoLnNlcH0ke3BhdGgucmVsYXRpdmUodGhpcy5ob21lLCBwYXRoVmFsdWUpfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gcGF0aFZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuUGF0aFV0aWxzID0gX19kZWNvcmF0ZShbXHJcbiAgICBpbnZlcnNpZnlfMS5pbmplY3RhYmxlKCksXHJcbiAgICBfX3BhcmFtKDAsIGludmVyc2lmeV8xLmluamVjdCh0eXBlc18xLklzV2luZG93cykpXHJcbl0sIFBhdGhVdGlscyk7XHJcbmV4cG9ydHMuUGF0aFV0aWxzID0gUGF0aFV0aWxzO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1wYXRoVXRpbHMuanMubWFwIl19