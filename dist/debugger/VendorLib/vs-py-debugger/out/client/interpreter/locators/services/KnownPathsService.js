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

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const inversify_1 = require("inversify");

const _ = require("lodash");

const path = require("path");

const types_1 = require("../../../common/platform/types");

const types_2 = require("../../../common/types");

const fs_1 = require("../../../common/utils/fs");

const types_3 = require("../../../ioc/types");

const contracts_1 = require("../../contracts");

const helpers_1 = require("../helpers");

const cacheableLocatorService_1 = require("./cacheableLocatorService");
/**
 * Locates "known" paths.
 */


let KnownPathsService = class KnownPathsService extends cacheableLocatorService_1.CacheableLocatorService {
  constructor(knownSearchPaths, helper, serviceContainer) {
    super('KnownPathsService', serviceContainer);
    this.knownSearchPaths = knownSearchPaths;
    this.helper = helper;
  }
  /**
   * Release any held resources.
   *
   * Called by VS Code to indicate it is done with the resource.
   */
  // tslint:disable-next-line:no-empty


  dispose() {}
  /**
   * Return the located interpreters.
   *
   * This is used by CacheableLocatorService.getInterpreters().
   */


  getInterpretersImplementation(resource) {
    return this.suggestionsFromKnownPaths();
  }
  /**
   * Return the located interpreters.
   */


  suggestionsFromKnownPaths() {
    const promises = this.knownSearchPaths.getSearchPaths().map(dir => this.getInterpretersInDirectory(dir));
    return Promise.all(promises) // tslint:disable-next-line:underscore-consistent-invocation
    .then(listOfInterpreters => _.flatten(listOfInterpreters)).then(interpreters => interpreters.filter(item => item.length > 0)).then(interpreters => Promise.all(interpreters.map(interpreter => this.getInterpreterDetails(interpreter)))).then(interpreters => interpreters.filter(interpreter => !!interpreter).map(interpreter => interpreter));
  }
  /**
   * Return the information about the identified interpreter binary.
   */


  getInterpreterDetails(interpreter) {
    return __awaiter(this, void 0, void 0, function* () {
      const details = yield this.helper.getInterpreterInformation(interpreter);

      if (!details) {
        return;
      }

      return Object.assign({}, details, {
        path: interpreter,
        type: contracts_1.InterpreterType.Unknown
      });
    });
  }
  /**
   * Return the interpreters in the given directory.
   */


  getInterpretersInDirectory(dir) {
    return fs_1.fsExistsAsync(dir).then(exists => exists ? helpers_1.lookForInterpretersInDirectory(dir) : Promise.resolve([]));
  }

};
KnownPathsService = __decorate([inversify_1.injectable(), __param(0, inversify_1.inject(contracts_1.IKnownSearchPathsForInterpreters)), __param(1, inversify_1.inject(contracts_1.IInterpreterHelper)), __param(2, inversify_1.inject(types_3.IServiceContainer))], KnownPathsService);
exports.KnownPathsService = KnownPathsService;
let KnownSearchPathsForInterpreters = class KnownSearchPathsForInterpreters {
  constructor(serviceContainer) {
    this.serviceContainer = serviceContainer;
  }
  /**
   * Return the paths where Python interpreters might be found.
   */


  getSearchPaths() {
    const currentProcess = this.serviceContainer.get(types_2.ICurrentProcess);
    const platformService = this.serviceContainer.get(types_1.IPlatformService);
    const pathUtils = this.serviceContainer.get(types_2.IPathUtils);
    const searchPaths = currentProcess.env[platformService.pathVariableName].split(pathUtils.delimiter).map(p => p.trim()).filter(p => p.length > 0);

    if (!platformService.isWindows) {
      ['/usr/local/bin', '/usr/bin', '/bin', '/usr/sbin', '/sbin', '/usr/local/sbin'].forEach(p => {
        searchPaths.push(p);
        searchPaths.push(path.join(pathUtils.home, p));
      }); // Add support for paths such as /Users/xxx/anaconda/bin.

      if (process.env.HOME) {
        searchPaths.push(path.join(pathUtils.home, 'anaconda', 'bin'));
        searchPaths.push(path.join(pathUtils.home, 'python', 'bin'));
      }
    }

    return searchPaths;
  }

};
KnownSearchPathsForInterpreters = __decorate([inversify_1.injectable(), __param(0, inversify_1.inject(types_3.IServiceContainer))], KnownSearchPathsForInterpreters);
exports.KnownSearchPathsForInterpreters = KnownSearchPathsForInterpreters;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIktub3duUGF0aHNTZXJ2aWNlLmpzIl0sIm5hbWVzIjpbIl9fZGVjb3JhdGUiLCJkZWNvcmF0b3JzIiwidGFyZ2V0Iiwia2V5IiwiZGVzYyIsImMiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJyIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZCIsIlJlZmxlY3QiLCJkZWNvcmF0ZSIsImkiLCJkZWZpbmVQcm9wZXJ0eSIsIl9fcGFyYW0iLCJwYXJhbUluZGV4IiwiZGVjb3JhdG9yIiwiX19hd2FpdGVyIiwidGhpc0FyZyIsIl9hcmd1bWVudHMiLCJQIiwiZ2VuZXJhdG9yIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJmdWxmaWxsZWQiLCJ2YWx1ZSIsInN0ZXAiLCJuZXh0IiwiZSIsInJlamVjdGVkIiwicmVzdWx0IiwiZG9uZSIsInRoZW4iLCJhcHBseSIsImV4cG9ydHMiLCJpbnZlcnNpZnlfMSIsInJlcXVpcmUiLCJfIiwicGF0aCIsInR5cGVzXzEiLCJ0eXBlc18yIiwiZnNfMSIsInR5cGVzXzMiLCJjb250cmFjdHNfMSIsImhlbHBlcnNfMSIsImNhY2hlYWJsZUxvY2F0b3JTZXJ2aWNlXzEiLCJLbm93blBhdGhzU2VydmljZSIsIkNhY2hlYWJsZUxvY2F0b3JTZXJ2aWNlIiwiY29uc3RydWN0b3IiLCJrbm93blNlYXJjaFBhdGhzIiwiaGVscGVyIiwic2VydmljZUNvbnRhaW5lciIsImRpc3Bvc2UiLCJnZXRJbnRlcnByZXRlcnNJbXBsZW1lbnRhdGlvbiIsInJlc291cmNlIiwic3VnZ2VzdGlvbnNGcm9tS25vd25QYXRocyIsInByb21pc2VzIiwiZ2V0U2VhcmNoUGF0aHMiLCJtYXAiLCJkaXIiLCJnZXRJbnRlcnByZXRlcnNJbkRpcmVjdG9yeSIsImFsbCIsImxpc3RPZkludGVycHJldGVycyIsImZsYXR0ZW4iLCJpbnRlcnByZXRlcnMiLCJmaWx0ZXIiLCJpdGVtIiwiaW50ZXJwcmV0ZXIiLCJnZXRJbnRlcnByZXRlckRldGFpbHMiLCJkZXRhaWxzIiwiZ2V0SW50ZXJwcmV0ZXJJbmZvcm1hdGlvbiIsImFzc2lnbiIsInR5cGUiLCJJbnRlcnByZXRlclR5cGUiLCJVbmtub3duIiwiZnNFeGlzdHNBc3luYyIsImV4aXN0cyIsImxvb2tGb3JJbnRlcnByZXRlcnNJbkRpcmVjdG9yeSIsImluamVjdGFibGUiLCJpbmplY3QiLCJJS25vd25TZWFyY2hQYXRoc0ZvckludGVycHJldGVycyIsIklJbnRlcnByZXRlckhlbHBlciIsIklTZXJ2aWNlQ29udGFpbmVyIiwiS25vd25TZWFyY2hQYXRoc0ZvckludGVycHJldGVycyIsImN1cnJlbnRQcm9jZXNzIiwiZ2V0IiwiSUN1cnJlbnRQcm9jZXNzIiwicGxhdGZvcm1TZXJ2aWNlIiwiSVBsYXRmb3JtU2VydmljZSIsInBhdGhVdGlscyIsIklQYXRoVXRpbHMiLCJzZWFyY2hQYXRocyIsImVudiIsInBhdGhWYXJpYWJsZU5hbWUiLCJzcGxpdCIsImRlbGltaXRlciIsInAiLCJ0cmltIiwiaXNXaW5kb3dzIiwiZm9yRWFjaCIsInB1c2giLCJqb2luIiwiaG9tZSIsInByb2Nlc3MiLCJIT01FIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFDQSxJQUFJQSxVQUFVLEdBQUksVUFBUSxTQUFLQSxVQUFkLElBQTZCLFVBQVVDLFVBQVYsRUFBc0JDLE1BQXRCLEVBQThCQyxHQUE5QixFQUFtQ0MsSUFBbkMsRUFBeUM7QUFDbkYsTUFBSUMsQ0FBQyxHQUFHQyxTQUFTLENBQUNDLE1BQWxCO0FBQUEsTUFBMEJDLENBQUMsR0FBR0gsQ0FBQyxHQUFHLENBQUosR0FBUUgsTUFBUixHQUFpQkUsSUFBSSxLQUFLLElBQVQsR0FBZ0JBLElBQUksR0FBR0ssTUFBTSxDQUFDQyx3QkFBUCxDQUFnQ1IsTUFBaEMsRUFBd0NDLEdBQXhDLENBQXZCLEdBQXNFQyxJQUFySDtBQUFBLE1BQTJITyxDQUEzSDtBQUNBLE1BQUksT0FBT0MsT0FBUCxLQUFtQixRQUFuQixJQUErQixPQUFPQSxPQUFPLENBQUNDLFFB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WixDQUFpQjlELElBQUksQ0FBQytELElBQUwsQ0FBVVosU0FBUyxDQUFDYSxJQUFwQixFQUEwQixRQUExQixFQUFvQyxLQUFwQyxDQUFqQjtBQUNIO0FBQ0o7O0FBQ0QsV0FBT1gsV0FBUDtBQUNIOztBQTVCdUUsQ0FBNUU7QUE4QkFSLCtCQUErQixHQUFHdEYsVUFBVSxDQUFDLENBQ3pDc0MsV0FBVyxDQUFDMkMsVUFBWixFQUR5QyxFQUV6Q2pFLE9BQU8sQ0FBQyxDQUFELEVBQUlzQixXQUFXLENBQUM0QyxNQUFaLENBQW1CckMsT0FBTyxDQUFDd0MsaUJBQTNCLENBQUosQ0FGa0MsQ0FBRCxFQUd6Q0MsK0JBSHlDLENBQTVDO0FBSUFqRCxPQUFPLENBQUNpRCwrQkFBUixHQUEwQ0EsK0JBQTFDIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn07XHJcbnZhciBfX3BhcmFtID0gKHRoaXMgJiYgdGhpcy5fX3BhcmFtKSB8fCBmdW5jdGlvbiAocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufTtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBpbnZlcnNpZnlfMSA9IHJlcXVpcmUoXCJpbnZlcnNpZnlcIik7XHJcbmNvbnN0IF8gPSByZXF1aXJlKFwibG9kYXNoXCIpO1xyXG5jb25zdCBwYXRoID0gcmVxdWlyZShcInBhdGhcIik7XHJcbmNvbnN0IHR5cGVzXzEgPSByZXF1aXJlKFwiLi4vLi4vLi4vY29tbW9uL3BsYXRmb3JtL3R5cGVzXCIpO1xyXG5jb25zdCB0eXBlc18yID0gcmVxdWlyZShcIi4uLy4uLy4uL2NvbW1vbi90eXBlc1wiKTtcclxuY29uc3QgZnNfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi9jb21tb24vdXRpbHMvZnNcIik7XHJcbmNvbnN0IHR5cGVzXzMgPSByZXF1aXJlKFwiLi4vLi4vLi4vaW9jL3R5cGVzXCIpO1xyXG5jb25zdCBjb250cmFjdHNfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb250cmFjdHNcIik7XHJcbmNvbnN0IGhlbHBlcnNfMSA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzXCIpO1xyXG5jb25zdCBjYWNoZWFibGVMb2NhdG9yU2VydmljZV8xID0gcmVxdWlyZShcIi4vY2FjaGVhYmxlTG9jYXRvclNlcnZpY2VcIik7XHJcbi8qKlxyXG4gKiBMb2NhdGVzIFwia25vd25cIiBwYXRocy5cclxuICovXHJcbmxldCBLbm93blBhdGhzU2VydmljZSA9IGNsYXNzIEtub3duUGF0aHNTZXJ2aWNlIGV4dGVuZHMgY2FjaGVhYmxlTG9jYXRvclNlcnZpY2VfMS5DYWNoZWFibGVMb2NhdG9yU2VydmljZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihrbm93blNlYXJjaFBhdGhzLCBoZWxwZXIsIHNlcnZpY2VDb250YWluZXIpIHtcclxuICAgICAgICBzdXBlcignS25vd25QYXRoc1NlcnZpY2UnLCBzZXJ2aWNlQ29udGFpbmVyKTtcclxuICAgICAgICB0aGlzLmtub3duU2VhcmNoUGF0aHMgPSBrbm93blNlYXJjaFBhdGhzO1xyXG4gICAgICAgIHRoaXMuaGVscGVyID0gaGVscGVyO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWxlYXNlIGFueSBoZWxkIHJlc291cmNlcy5cclxuICAgICAqXHJcbiAgICAgKiBDYWxsZWQgYnkgVlMgQ29kZSB0byBpbmRpY2F0ZSBpdCBpcyBkb25lIHdpdGggdGhlIHJlc291cmNlLlxyXG4gICAgICovXHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZW1wdHlcclxuICAgIGRpc3Bvc2UoKSB7IH1cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIHRoZSBsb2NhdGVkIGludGVycHJldGVycy5cclxuICAgICAqXHJcbiAgICAgKiBUaGlzIGlzIHVzZWQgYnkgQ2FjaGVhYmxlTG9jYXRvclNlcnZpY2UuZ2V0SW50ZXJwcmV0ZXJzKCkuXHJcbiAgICAgKi9cclxuICAgIGdldEludGVycHJldGVyc0ltcGxlbWVudGF0aW9uKHJlc291cmNlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3VnZ2VzdGlvbnNGcm9tS25vd25QYXRocygpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gdGhlIGxvY2F0ZWQgaW50ZXJwcmV0ZXJzLlxyXG4gICAgICovXHJcbiAgICBzdWdnZXN0aW9uc0Zyb21Lbm93blBhdGhzKCkge1xyXG4gICAgICAgIGNvbnN0IHByb21pc2VzID0gdGhpcy5rbm93blNlYXJjaFBhdGhzLmdldFNlYXJjaFBhdGhzKCkubWFwKGRpciA9PiB0aGlzLmdldEludGVycHJldGVyc0luRGlyZWN0b3J5KGRpcikpO1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcylcclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnVuZGVyc2NvcmUtY29uc2lzdGVudC1pbnZvY2F0aW9uXHJcbiAgICAgICAgICAgIC50aGVuKGxpc3RPZkludGVycHJldGVycyA9PiBfLmZsYXR0ZW4obGlzdE9mSW50ZXJwcmV0ZXJzKSlcclxuICAgICAgICAgICAgLnRoZW4oaW50ZXJwcmV0ZXJzID0+IGludGVycHJldGVycy5maWx0ZXIoaXRlbSA9PiBpdGVtLmxlbmd0aCA+IDApKVxyXG4gICAgICAgICAgICAudGhlbihpbnRlcnByZXRlcnMgPT4gUHJvbWlzZS5hbGwoaW50ZXJwcmV0ZXJzLm1hcChpbnRlcnByZXRlciA9PiB0aGlzLmdldEludGVycHJldGVyRGV0YWlscyhpbnRlcnByZXRlcikpKSlcclxuICAgICAgICAgICAgLnRoZW4oaW50ZXJwcmV0ZXJzID0+IGludGVycHJldGVycy5maWx0ZXIoaW50ZXJwcmV0ZXIgPT4gISFpbnRlcnByZXRlcikubWFwKGludGVycHJldGVyID0+IGludGVycHJldGVyKSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiB0aGUgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGlkZW50aWZpZWQgaW50ZXJwcmV0ZXIgYmluYXJ5LlxyXG4gICAgICovXHJcbiAgICBnZXRJbnRlcnByZXRlckRldGFpbHMoaW50ZXJwcmV0ZXIpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBjb25zdCBkZXRhaWxzID0geWllbGQgdGhpcy5oZWxwZXIuZ2V0SW50ZXJwcmV0ZXJJbmZvcm1hdGlvbihpbnRlcnByZXRlcik7XHJcbiAgICAgICAgICAgIGlmICghZGV0YWlscykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBkZXRhaWxzLCB7IHBhdGg6IGludGVycHJldGVyLCB0eXBlOiBjb250cmFjdHNfMS5JbnRlcnByZXRlclR5cGUuVW5rbm93biB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIHRoZSBpbnRlcnByZXRlcnMgaW4gdGhlIGdpdmVuIGRpcmVjdG9yeS5cclxuICAgICAqL1xyXG4gICAgZ2V0SW50ZXJwcmV0ZXJzSW5EaXJlY3RvcnkoZGlyKSB7XHJcbiAgICAgICAgcmV0dXJuIGZzXzEuZnNFeGlzdHNBc3luYyhkaXIpXHJcbiAgICAgICAgICAgIC50aGVuKGV4aXN0cyA9PiBleGlzdHMgPyBoZWxwZXJzXzEubG9va0ZvckludGVycHJldGVyc0luRGlyZWN0b3J5KGRpcikgOiBQcm9taXNlLnJlc29sdmUoW10pKTtcclxuICAgIH1cclxufTtcclxuS25vd25QYXRoc1NlcnZpY2UgPSBfX2RlY29yYXRlKFtcclxuICAgIGludmVyc2lmeV8xLmluamVjdGFibGUoKSxcclxuICAgIF9fcGFyYW0oMCwgaW52ZXJzaWZ5XzEuaW5qZWN0KGNvbnRyYWN0c18xLklLbm93blNlYXJjaFBhdGhzRm9ySW50ZXJwcmV0ZXJzKSksXHJcbiAgICBfX3BhcmFtKDEsIGludmVyc2lmeV8xLmluamVjdChjb250cmFjdHNfMS5JSW50ZXJwcmV0ZXJIZWxwZXIpKSxcclxuICAgIF9fcGFyYW0oMiwgaW52ZXJzaWZ5XzEuaW5qZWN0KHR5cGVzXzMuSVNlcnZpY2VDb250YWluZXIpKVxyXG5dLCBLbm93blBhdGhzU2VydmljZSk7XHJcbmV4cG9ydHMuS25vd25QYXRoc1NlcnZpY2UgPSBLbm93blBhdGhzU2VydmljZTtcclxubGV0IEtub3duU2VhcmNoUGF0aHNGb3JJbnRlcnByZXRlcnMgPSBjbGFzcyBLbm93blNlYXJjaFBhdGhzRm9ySW50ZXJwcmV0ZXJzIHtcclxuICAgIGNvbnN0cnVjdG9yKHNlcnZpY2VDb250YWluZXIpIHtcclxuICAgICAgICB0aGlzLnNlcnZpY2VDb250YWluZXIgPSBzZXJ2aWNlQ29udGFpbmVyO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gdGhlIHBhdGhzIHdoZXJlIFB5dGhvbiBpbnRlcnByZXRlcnMgbWlnaHQgYmUgZm91bmQuXHJcbiAgICAgKi9cclxuICAgIGdldFNlYXJjaFBhdGhzKCkge1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRQcm9jZXNzID0gdGhpcy5zZXJ2aWNlQ29udGFpbmVyLmdldCh0eXBlc18yLklDdXJyZW50UHJvY2Vzcyk7XHJcbiAgICAgICAgY29uc3QgcGxhdGZvcm1TZXJ2aWNlID0gdGhpcy5zZXJ2aWNlQ29udGFpbmVyLmdldCh0eXBlc18xLklQbGF0Zm9ybVNlcnZpY2UpO1xyXG4gICAgICAgIGNvbnN0IHBhdGhVdGlscyA9IHRoaXMuc2VydmljZUNvbnRhaW5lci5nZXQodHlwZXNfMi5JUGF0aFV0aWxzKTtcclxuICAgICAgICBjb25zdCBzZWFyY2hQYXRocyA9IGN1cnJlbnRQcm9jZXNzLmVudltwbGF0Zm9ybVNlcnZpY2UucGF0aFZhcmlhYmxlTmFtZV1cclxuICAgICAgICAgICAgLnNwbGl0KHBhdGhVdGlscy5kZWxpbWl0ZXIpXHJcbiAgICAgICAgICAgIC5tYXAocCA9PiBwLnRyaW0oKSlcclxuICAgICAgICAgICAgLmZpbHRlcihwID0+IHAubGVuZ3RoID4gMCk7XHJcbiAgICAgICAgaWYgKCFwbGF0Zm9ybVNlcnZpY2UuaXNXaW5kb3dzKSB7XHJcbiAgICAgICAgICAgIFsnL3Vzci9sb2NhbC9iaW4nLCAnL3Vzci9iaW4nLCAnL2JpbicsICcvdXNyL3NiaW4nLCAnL3NiaW4nLCAnL3Vzci9sb2NhbC9zYmluJ11cclxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKHAgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoUGF0aHMucHVzaChwKTtcclxuICAgICAgICAgICAgICAgIHNlYXJjaFBhdGhzLnB1c2gocGF0aC5qb2luKHBhdGhVdGlscy5ob21lLCBwKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyBBZGQgc3VwcG9ydCBmb3IgcGF0aHMgc3VjaCBhcyAvVXNlcnMveHh4L2FuYWNvbmRhL2Jpbi5cclxuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52LkhPTUUpIHtcclxuICAgICAgICAgICAgICAgIHNlYXJjaFBhdGhzLnB1c2gocGF0aC5qb2luKHBhdGhVdGlscy5ob21lLCAnYW5hY29uZGEnLCAnYmluJykpO1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoUGF0aHMucHVzaChwYXRoLmpvaW4ocGF0aFV0aWxzLmhvbWUsICdweXRob24nLCAnYmluJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZWFyY2hQYXRocztcclxuICAgIH1cclxufTtcclxuS25vd25TZWFyY2hQYXRoc0ZvckludGVycHJldGVycyA9IF9fZGVjb3JhdGUoW1xyXG4gICAgaW52ZXJzaWZ5XzEuaW5qZWN0YWJsZSgpLFxyXG4gICAgX19wYXJhbSgwLCBpbnZlcnNpZnlfMS5pbmplY3QodHlwZXNfMy5JU2VydmljZUNvbnRhaW5lcikpXHJcbl0sIEtub3duU2VhcmNoUGF0aHNGb3JJbnRlcnByZXRlcnMpO1xyXG5leHBvcnRzLktub3duU2VhcmNoUGF0aHNGb3JJbnRlcnByZXRlcnMgPSBLbm93blNlYXJjaFBhdGhzRm9ySW50ZXJwcmV0ZXJzO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1Lbm93blBhdGhzU2VydmljZS5qcy5tYXAiXX0=