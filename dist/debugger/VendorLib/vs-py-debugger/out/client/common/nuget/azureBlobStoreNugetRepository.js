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

const types_1 = require("../../ioc/types");

const telemetry_1 = require("../../telemetry");

const constants_1 = require("../../telemetry/constants");

const logger_1 = require("../logger");

const types_2 = require("./types");

let AzureBlobStoreNugetRepository = class AzureBlobStoreNugetRepository {
  constructor(serviceContainer, azureBlobStorageAccount, azureBlobStorageContainer, azureCDNBlobStorageAccount) {
    this.serviceContainer = serviceContainer;
    this.azureBlobStorageAccount = azureBlobStorageAccount;
    this.azureBlobStorageContainer = azureBlobStorageContainer;
    this.azureCDNBlobStorageAccount = azureCDNBlobStorageAccount;
  }

  getPackages(packageName) {
    return __awaiter(this, void 0, void 0, function* () {
      return this.listPackages(this.azureBlobStorageAccount, this.azureBlobStorageContainer, packageName, this.azureCDNBlobStorageAccount);
    });
  }

  listPackages(azureBlobStorageAccount, azureBlobStorageContainer, packageName, azureCDNBlobStorageAccount) {
    // tslint:disable-next-line:no-require-imports
    const az = require('azure-storage');

    const blobStore = az.createBlobServiceAnonymous(azureBlobStorageAccount);
    const nugetService = this.serviceContainer.get(types_2.INugetService);
    return new Promise((resolve, reject) => {
      // We must pass undefined according to docs, but type definition doesn't all it to be undefined or null!!!
      // tslint:disable-next-line:no-any
      const token = undefined;
      blobStore.listBlobsSegmentedWithPrefix(azureBlobStorageContainer, packageName, token, (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result.entries.map(item => {
          return {
            package: item.name,
            uri: `${azureCDNBlobStorageAccount}/${azureBlobStorageContainer}/${item.name}`,
            version: nugetService.getVersionFromPackageFileName(item.name)
          };
        }));
      });
    });
  }

};

__decorate([telemetry_1.captureTelemetry(constants_1.PYTHON_LANGUAGE_SERVER_LIST_BLOB_STORE_PACKAGES), logger_1.traceVerbose('Listing Nuget Packages')], AzureBlobStoreNugetRepository.prototype, "listPackages", null);

AzureBlobStoreNugetRepository = __decorate([inversify_1.injectable(), __param(0, inversify_1.inject(types_1.IServiceContainer)), __param(1, inversify_1.unmanaged()), __param(2, inversify_1.unmanaged()), __param(3, inversify_1.unmanaged())], AzureBlobStoreNugetRepository);
exports.AzureBlobStoreNugetRepository = AzureBlobStoreNugetRepository;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF6dXJlQmxvYlN0b3JlTnVnZXRSZXBvc2l0b3J5LmpzIl0sIm5hbWVzIjpbIl9fZGVjb3JhdGUiLCJkZWNvcmF0b3JzIiwidGFyZ2V0Iiwia2V5IiwiZGVzYyIsImMiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJyIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZCIsIlJlZmxlY3QiLCJkZWNvcmF0ZSIsImkiLCJkZWZpbmVQcm9wZXJ0eSIsIl9fcGFyYW0iLCJwYXJhbUluZGV4IiwiZGVjb3JhdG9yIiwiX19hd2FpdGVyIiwidGhpc0FyZyIsIl9hcmd1bWVudHMiLCJQIiwiZ2VuZXJhdG9yIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJmdWxmaWxsZWQiLCJ2YWx1ZSIsInN0ZXAiLCJuZXh0IiwiZSIsInJlamVjdGVkIiwicmVzdWx0IiwiZG9uZSIsInRoZW4iLCJhcHBseSIsImV4cG9ydHMiLCJpbnZlcnNpZnlfMSIsInJlcXVpcmUiLCJ0eXBlc18xIiwidGVsZW1ldHJ5XzEiLCJjb25zdGFudHNfMSIsImxvZ2dlcl8xIiwidHlwZXNfMiIsIkF6dXJlQmxvYlN0b3JlTnVnZXRSZXBvc2l0b3J5IiwiY29uc3RydWN0b3IiLCJzZXJ2aWNlQ29udGFpbmVyIiwiYXp1cmVCbG9iU3RvcmFnZUFjY291bnQiLCJhenVyZUJsb2JTdG9yYWdlQ29udGFpbmVyIiwiYXp1cmVDRE5CbG9iU3RvcmFnZUFjY291bnQiLCJnZXRQYWNrYWdlcyIsInBhY2thZ2VOYW1lIiwibGlzdFBhY2thZ2VzIiwiYXoiLCJibG9iU3RvcmUiLCJjcmVhdGVCbG9iU2VydmljZUFub255bW91cyIsIm51Z2V0U2VydmljZSIsImdldCIsIklOdWdldFNlcnZpY2UiLCJ0b2tlbiIsInVuZGVmaW5lZCIsImxpc3RCbG9ic1NlZ21lbnRlZFdpdGhQcmVmaXgiLCJlcnJvciIsImVudHJpZXMiLCJtYXAiLCJpdGVtIiwicGFja2FnZSIsIm5hbWUiLCJ1cmkiLCJ2ZXJzaW9uIiwiZ2V0VmVyc2lvbkZyb21QYWNrYWdlRmlsZU5hbWUiLCJjYXB0dXJlVGVsZW1ldHJ5IiwiUFlUSE9OX0xBTkdVQUdFX1NFUlZFUl9MSVNUX0JMT0JfU1RPUkVfUEFDS0FHRVMiLCJ0cmFjZVZlcmJvc2UiLCJwcm90b3R5cGUiLCJpbmplY3RhYmxlIiwiaW5qZWN0IiwiSVNlcnZpY2VDb250YWluZXIiLCJ1bm1hbmFnZWQiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTs7QUFDQSxJQUFJQSxVQUFVLEdBQUksVUFBUSxTQUFLQSxVQUFkLElBQTZCLFVBQVVDLFVBQVYsRUFBc0JDLE1BQXRCLEVBQThCQyxHQUE5QixFQUFtQ0MsSUFBbkMsRUFBeUM7QUFDbkYsTUFBSUMsQ0FBQyxHQUFHQyxTQUFTLENBQUNDLE1BQWxCO0FBQUEsTUFBMEJDLENBQUMsR0FBR0gsQ0FBQyxHQUFHLENBQUosR0FBUUgsTUFBUixHQUFpQkUsSUFBSSxLQUFLLElBQVQsR0FBZ0JBLElBQUksR0FBR0ssTUFBTSxDQUFDQyx3QkFBUCxDQUFnQ1IsTUFBaEMsRUFBd0NDLEdBQXhDLENBQXZCLEdBQXNFQyxJQUFySDtBQUFBLE1BQTJITyxDQUEzSDtBQUNBLE1BQUksT0FBT0MsT0FBUCxLQUFtQixRQUFuQixJQUErQixPQUFPQSxPQUFPLENBQUNDLFFBQWYsS0FBNEIsVUFBL0QsRUFBMkVMLENBQUMsR0FBR0ksT0FBTyxDQUFDQyxRQUFSLENBQWlCWixVQUFqQixFQUE2QkMsTUFBN0IsRUFBcUNDLEdBQXJDLEVBQTBDQyxJQUExQyxDQUFKLENBQTNFLEtBQ0ssS0FBSyxJQUFJVSxDQUFDLEdBQUdiLFVBQVUsQ0FBQ00sTUFBWCxHQUFvQixDQUFqQyxFQUFvQ08sQ0FBQyxJQUFJLENBQXpDLEVBQTRDQSxDQUFDLEVBQTdDLEVBQWlELElBQUlILENBQUMsR0FBR1YsVUFBVSxDQUFDYSxDQUFELENBQWxCLEVBQXVCTixDQUFDLEdBQUcsQ0FBQ0gsQ0FBQyxHQUFHLENBQUosR0FBUU0sQ0FBQyxDQUFDSCxDQUFELENBQVQs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bEMsNkJBTnVDLENBQTFDO0FBT0FSLE9BQU8sQ0FBQ1EsNkJBQVIsR0FBd0NBLDZCQUF4QyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcbid1c2Ugc3RyaWN0JztcclxudmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufTtcclxudmFyIF9fcGFyYW0gPSAodGhpcyAmJiB0aGlzLl9fcGFyYW0pIHx8IGZ1bmN0aW9uIChwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59O1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IGludmVyc2lmeV8xID0gcmVxdWlyZShcImludmVyc2lmeVwiKTtcclxuY29uc3QgdHlwZXNfMSA9IHJlcXVpcmUoXCIuLi8uLi9pb2MvdHlwZXNcIik7XHJcbmNvbnN0IHRlbGVtZXRyeV8xID0gcmVxdWlyZShcIi4uLy4uL3RlbGVtZXRyeVwiKTtcclxuY29uc3QgY29uc3RhbnRzXzEgPSByZXF1aXJlKFwiLi4vLi4vdGVsZW1ldHJ5L2NvbnN0YW50c1wiKTtcclxuY29uc3QgbG9nZ2VyXzEgPSByZXF1aXJlKFwiLi4vbG9nZ2VyXCIpO1xyXG5jb25zdCB0eXBlc18yID0gcmVxdWlyZShcIi4vdHlwZXNcIik7XHJcbmxldCBBenVyZUJsb2JTdG9yZU51Z2V0UmVwb3NpdG9yeSA9IGNsYXNzIEF6dXJlQmxvYlN0b3JlTnVnZXRSZXBvc2l0b3J5IHtcclxuICAgIGNvbnN0cnVjdG9yKHNlcnZpY2VDb250YWluZXIsIGF6dXJlQmxvYlN0b3JhZ2VBY2NvdW50LCBhenVyZUJsb2JTdG9yYWdlQ29udGFpbmVyLCBhenVyZUNETkJsb2JTdG9yYWdlQWNjb3VudCkge1xyXG4gICAgICAgIHRoaXMuc2VydmljZUNvbnRhaW5lciA9IHNlcnZpY2VDb250YWluZXI7XHJcbiAgICAgICAgdGhpcy5henVyZUJsb2JTdG9yYWdlQWNjb3VudCA9IGF6dXJlQmxvYlN0b3JhZ2VBY2NvdW50O1xyXG4gICAgICAgIHRoaXMuYXp1cmVCbG9iU3RvcmFnZUNvbnRhaW5lciA9IGF6dXJlQmxvYlN0b3JhZ2VDb250YWluZXI7XHJcbiAgICAgICAgdGhpcy5henVyZUNETkJsb2JTdG9yYWdlQWNjb3VudCA9IGF6dXJlQ0ROQmxvYlN0b3JhZ2VBY2NvdW50O1xyXG4gICAgfVxyXG4gICAgZ2V0UGFja2FnZXMocGFja2FnZU5hbWUpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5saXN0UGFja2FnZXModGhpcy5henVyZUJsb2JTdG9yYWdlQWNjb3VudCwgdGhpcy5henVyZUJsb2JTdG9yYWdlQ29udGFpbmVyLCBwYWNrYWdlTmFtZSwgdGhpcy5henVyZUNETkJsb2JTdG9yYWdlQWNjb3VudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBsaXN0UGFja2FnZXMoYXp1cmVCbG9iU3RvcmFnZUFjY291bnQsIGF6dXJlQmxvYlN0b3JhZ2VDb250YWluZXIsIHBhY2thZ2VOYW1lLCBhenVyZUNETkJsb2JTdG9yYWdlQWNjb3VudCkge1xyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1yZXF1aXJlLWltcG9ydHNcclxuICAgICAgICBjb25zdCBheiA9IHJlcXVpcmUoJ2F6dXJlLXN0b3JhZ2UnKTtcclxuICAgICAgICBjb25zdCBibG9iU3RvcmUgPSBhei5jcmVhdGVCbG9iU2VydmljZUFub255bW91cyhhenVyZUJsb2JTdG9yYWdlQWNjb3VudCk7XHJcbiAgICAgICAgY29uc3QgbnVnZXRTZXJ2aWNlID0gdGhpcy5zZXJ2aWNlQ29udGFpbmVyLmdldCh0eXBlc18yLklOdWdldFNlcnZpY2UpO1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIC8vIFdlIG11c3QgcGFzcyB1bmRlZmluZWQgYWNjb3JkaW5nIHRvIGRvY3MsIGJ1dCB0eXBlIGRlZmluaXRpb24gZG9lc24ndCBhbGwgaXQgdG8gYmUgdW5kZWZpbmVkIG9yIG51bGwhISFcclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxyXG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgYmxvYlN0b3JlLmxpc3RCbG9ic1NlZ21lbnRlZFdpdGhQcmVmaXgoYXp1cmVCbG9iU3RvcmFnZUNvbnRhaW5lciwgcGFja2FnZU5hbWUsIHRva2VuLCAoZXJyb3IsIHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5lbnRyaWVzLm1hcChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYWNrYWdlOiBpdGVtLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVyaTogYCR7YXp1cmVDRE5CbG9iU3RvcmFnZUFjY291bnR9LyR7YXp1cmVCbG9iU3RvcmFnZUNvbnRhaW5lcn0vJHtpdGVtLm5hbWV9YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmVyc2lvbjogbnVnZXRTZXJ2aWNlLmdldFZlcnNpb25Gcm9tUGFja2FnZUZpbGVOYW1lKGl0ZW0ubmFtZSlcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuX19kZWNvcmF0ZShbXHJcbiAgICB0ZWxlbWV0cnlfMS5jYXB0dXJlVGVsZW1ldHJ5KGNvbnN0YW50c18xLlBZVEhPTl9MQU5HVUFHRV9TRVJWRVJfTElTVF9CTE9CX1NUT1JFX1BBQ0tBR0VTKSxcclxuICAgIGxvZ2dlcl8xLnRyYWNlVmVyYm9zZSgnTGlzdGluZyBOdWdldCBQYWNrYWdlcycpXHJcbl0sIEF6dXJlQmxvYlN0b3JlTnVnZXRSZXBvc2l0b3J5LnByb3RvdHlwZSwgXCJsaXN0UGFja2FnZXNcIiwgbnVsbCk7XHJcbkF6dXJlQmxvYlN0b3JlTnVnZXRSZXBvc2l0b3J5ID0gX19kZWNvcmF0ZShbXHJcbiAgICBpbnZlcnNpZnlfMS5pbmplY3RhYmxlKCksXHJcbiAgICBfX3BhcmFtKDAsIGludmVyc2lmeV8xLmluamVjdCh0eXBlc18xLklTZXJ2aWNlQ29udGFpbmVyKSksXHJcbiAgICBfX3BhcmFtKDEsIGludmVyc2lmeV8xLnVubWFuYWdlZCgpKSxcclxuICAgIF9fcGFyYW0oMiwgaW52ZXJzaWZ5XzEudW5tYW5hZ2VkKCkpLFxyXG4gICAgX19wYXJhbSgzLCBpbnZlcnNpZnlfMS51bm1hbmFnZWQoKSlcclxuXSwgQXp1cmVCbG9iU3RvcmVOdWdldFJlcG9zaXRvcnkpO1xyXG5leHBvcnRzLkF6dXJlQmxvYlN0b3JlTnVnZXRSZXBvc2l0b3J5ID0gQXp1cmVCbG9iU3RvcmVOdWdldFJlcG9zaXRvcnk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWF6dXJlQmxvYlN0b3JlTnVnZXRSZXBvc2l0b3J5LmpzLm1hcCJdfQ==