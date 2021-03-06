"use strict"; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

Object.defineProperty(exports, "__esModule", {
  value: true
});

const activation_1 = require("./activation");

const codeExecutionManager_1 = require("./codeExecution/codeExecutionManager");

const djangoShellCodeExecution_1 = require("./codeExecution/djangoShellCodeExecution");

const helper_1 = require("./codeExecution/helper");

const repl_1 = require("./codeExecution/repl");

const terminalCodeExecution_1 = require("./codeExecution/terminalCodeExecution");

const types_1 = require("./types");

function registerTypes(serviceManager) {
  serviceManager.addSingleton(types_1.ICodeExecutionHelper, helper_1.CodeExecutionHelper);
  serviceManager.addSingleton(types_1.ICodeExecutionManager, codeExecutionManager_1.CodeExecutionManager);
  serviceManager.addSingleton(types_1.ICodeExecutionService, djangoShellCodeExecution_1.DjangoShellCodeExecutionProvider, 'djangoShell');
  serviceManager.addSingleton(types_1.ICodeExecutionService, terminalCodeExecution_1.TerminalCodeExecutionProvider, 'standard');
  serviceManager.addSingleton(types_1.ICodeExecutionService, repl_1.ReplProvider, 'repl');
  serviceManager.addSingleton(types_1.ITerminalAutoActivation, activation_1.TerminalAutoActivation);
}

exports.registerTypes = registerTypes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VSZWdpc3RyeS5qcyJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsImFjdGl2YXRpb25fMSIsInJlcXVpcmUiLCJjb2RlRXhlY3V0aW9uTWFuYWdlcl8xIiwiZGphbmdvU2hlbGxDb2RlRXhlY3V0aW9uXzEiLCJoZWxwZXJfMSIsInJlcGxfMSIsInRlcm1pbmFsQ29kZUV4ZWN1dGlvbl8xIiwidHlwZXNfMSIsInJlZ2lzdGVyVHlwZXMiLCJzZXJ2aWNlTWFuYWdlciIsImFkZFNpbmdsZXRvbiIsIklDb2RlRXhlY3V0aW9uSGVscGVyIiwiQ29kZUV4ZWN1dGlvbkhlbHBlciIsIklDb2RlRXhlY3V0aW9uTWFuYWdlciIsIkNvZGVFeGVjdXRpb25NYW5hZ2VyIiwiSUNvZGVFeGVjdXRpb25TZXJ2aWNlIiwiRGphbmdvU2hlbGxDb2RlRXhlY3V0aW9uUHJvdmlkZXIiLCJUZXJtaW5hbENvZGVFeGVjdXRpb25Qcm92aWRlciIsIlJlcGxQcm92aWRlciIsIklUZXJtaW5hbEF1dG9BY3RpdmF0aW9uIiwiVGVybWluYWxBdXRvQWN0aXZhdGlvbiJdLCJtYXBwaW5ncyI6IkFBQUEsYSxDQUNBO0FBQ0E7O0FBQ0FBLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFBRUMsRUFBQUEsS0FBSyxFQUFFO0FBQVQsQ0FBN0M7O0FBQ0EsTUFBTUMsWUFBWSxHQUFHQyxPQUFPLENBQUMsY0FBRCxDQUE1Qjs7QUFDQSxNQUFNQyxzQkFBc0IsR0FBR0QsT0FBTyxDQUFDLHNDQUFELENBQXRDOztBQUNBLE1BQU1FLDBCQUEwQixHQUFHRixPQUFPLENBQUMsMENBQUQsQ0FBMUM7O0FBQ0EsTUFBTUcsUUFBUSxHQUFHSCxPQUFPLENBQUMsd0JBQUQsQ0FBeEI7O0FBQ0EsTUFBTUksTUFBTSxHQUFHSixPQUFPLENBQUMsc0JBQUQsQ0FBdEI7O0FBQ0EsTUFBTUssdUJBQXVCLEdBQUdMLE9BQU8sQ0FBQyx1Q0FBRCxDQUF2Qzs7QUFDQSxNQUFNTSxPQUFPLEdBQUdOLE9BQU8sQ0FBQyxTQUFELENBQXZCOztBQUNBLFNBQVNPLGFBQVQsQ0FBdUJDLGNBQXZCLEVBQXVDO0FBQ25DQSxFQUFBQSxjQUFjLENBQUNDLFlBQWYsQ0FBNEJILE9BQU8sQ0FBQ0ksb0JBQXBDLEVBQTBEUCxRQUFRLENBQUNRLG1CQUFuRTtBQUNBSCxFQUFBQSxjQUFjLENBQUNDLFlBQWYsQ0FBNEJILE9BQU8sQ0FBQ00scUJBQXBDLEVBQTJEWCxzQkFBc0IsQ0FBQ1ksb0JBQWxGO0FBQ0FMLEVBQUFBLGNBQWMsQ0FBQ0MsWUFBZixDQUE0QkgsT0FBTyxDQUFDUSxxQkFBcEMsRUFBMkRaLDBCQUEwQixDQUFDYSxnQ0FBdEYsRUFBd0gsYUFBeEg7QUFDQVAsRUFBQUEsY0FBYyxDQUFDQyxZQUFmLENBQTRCSCxPQUFPLENBQUNRLHFCQUFwQyxFQUEyRFQsdUJBQXVCLENBQUNXLDZCQUFuRixFQUFrSCxVQUFsSDtBQUNBUixFQUFBQSxjQUFjLENBQUNDLFlBQWYsQ0FBNEJILE9BQU8sQ0FBQ1EscUJBQXBDLEVBQTJEVixNQUFNLENBQUNhLFlBQWxFLEVBQWdGLE1BQWhGO0FBQ0FULEVBQUFBLGNBQWMsQ0FBQ0MsWUFBZixDQUE0QkgsT0FBTyxDQUFDWSx1QkFBcEMsRUFBNkRuQixZQUFZLENBQUNvQixzQkFBMUU7QUFDSDs7QUFDRHRCLE9BQU8sQ0FBQ1UsYUFBUixHQUF3QkEsYUFBeEIiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBhY3RpdmF0aW9uXzEgPSByZXF1aXJlKFwiLi9hY3RpdmF0aW9uXCIpO1xyXG5jb25zdCBjb2RlRXhlY3V0aW9uTWFuYWdlcl8xID0gcmVxdWlyZShcIi4vY29kZUV4ZWN1dGlvbi9jb2RlRXhlY3V0aW9uTWFuYWdlclwiKTtcclxuY29uc3QgZGphbmdvU2hlbGxDb2RlRXhlY3V0aW9uXzEgPSByZXF1aXJlKFwiLi9jb2RlRXhlY3V0aW9uL2RqYW5nb1NoZWxsQ29kZUV4ZWN1dGlvblwiKTtcclxuY29uc3QgaGVscGVyXzEgPSByZXF1aXJlKFwiLi9jb2RlRXhlY3V0aW9uL2hlbHBlclwiKTtcclxuY29uc3QgcmVwbF8xID0gcmVxdWlyZShcIi4vY29kZUV4ZWN1dGlvbi9yZXBsXCIpO1xyXG5jb25zdCB0ZXJtaW5hbENvZGVFeGVjdXRpb25fMSA9IHJlcXVpcmUoXCIuL2NvZGVFeGVjdXRpb24vdGVybWluYWxDb2RlRXhlY3V0aW9uXCIpO1xyXG5jb25zdCB0eXBlc18xID0gcmVxdWlyZShcIi4vdHlwZXNcIik7XHJcbmZ1bmN0aW9uIHJlZ2lzdGVyVHlwZXMoc2VydmljZU1hbmFnZXIpIHtcclxuICAgIHNlcnZpY2VNYW5hZ2VyLmFkZFNpbmdsZXRvbih0eXBlc18xLklDb2RlRXhlY3V0aW9uSGVscGVyLCBoZWxwZXJfMS5Db2RlRXhlY3V0aW9uSGVscGVyKTtcclxuICAgIHNlcnZpY2VNYW5hZ2VyLmFkZFNpbmdsZXRvbih0eXBlc18xLklDb2RlRXhlY3V0aW9uTWFuYWdlciwgY29kZUV4ZWN1dGlvbk1hbmFnZXJfMS5Db2RlRXhlY3V0aW9uTWFuYWdlcik7XHJcbiAgICBzZXJ2aWNlTWFuYWdlci5hZGRTaW5nbGV0b24odHlwZXNfMS5JQ29kZUV4ZWN1dGlvblNlcnZpY2UsIGRqYW5nb1NoZWxsQ29kZUV4ZWN1dGlvbl8xLkRqYW5nb1NoZWxsQ29kZUV4ZWN1dGlvblByb3ZpZGVyLCAnZGphbmdvU2hlbGwnKTtcclxuICAgIHNlcnZpY2VNYW5hZ2VyLmFkZFNpbmdsZXRvbih0eXBlc18xLklDb2RlRXhlY3V0aW9uU2VydmljZSwgdGVybWluYWxDb2RlRXhlY3V0aW9uXzEuVGVybWluYWxDb2RlRXhlY3V0aW9uUHJvdmlkZXIsICdzdGFuZGFyZCcpO1xyXG4gICAgc2VydmljZU1hbmFnZXIuYWRkU2luZ2xldG9uKHR5cGVzXzEuSUNvZGVFeGVjdXRpb25TZXJ2aWNlLCByZXBsXzEuUmVwbFByb3ZpZGVyLCAncmVwbCcpO1xyXG4gICAgc2VydmljZU1hbmFnZXIuYWRkU2luZ2xldG9uKHR5cGVzXzEuSVRlcm1pbmFsQXV0b0FjdGl2YXRpb24sIGFjdGl2YXRpb25fMS5UZXJtaW5hbEF1dG9BY3RpdmF0aW9uKTtcclxufVxyXG5leHBvcnRzLnJlZ2lzdGVyVHlwZXMgPSByZWdpc3RlclR5cGVzO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1zZXJ2aWNlUmVnaXN0cnkuanMubWFwIl19