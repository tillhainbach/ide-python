// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Commands;

(function (Commands) {
  Commands.RunAllCells = 'python.datascience.runallcells';
  Commands.RunCell = 'python.datascience.runcell';
  Commands.RunCurrentCell = 'python.datascience.runcurrentcell';
  Commands.RunCurrentCellAdvance = 'python.datascience.runcurrentcelladvance';
  Commands.ShowHistoryPane = 'python.datascience.showhistorypane';
  Commands.ImportNotebook = 'python.datascience.importnotebook';
})(Commands = exports.Commands || (exports.Commands = {}));

var EditorContexts;

(function (EditorContexts) {
  EditorContexts.HasCodeCells = 'python.datascience.hascodecells';
  EditorContexts.DataScienceEnabled = 'python.datascience.featureenabled';
})(EditorContexts = exports.EditorContexts || (exports.EditorContexts = {}));

var RegExpValues;

(function (RegExpValues) {
  RegExpValues.PythonCellMarker = new RegExp('^(#\\s*%%|#\\s*\\<codecell\\>|#\\s*In\\[\\d*?\\]|#\\s*In\\[ \\])(.*)');
  RegExpValues.PythonMarkdownCellMarker = /^#\s*%%\s*\[markdown\]/;
})(RegExpValues = exports.RegExpValues || (exports.RegExpValues = {}));

var HistoryMessages;

(function (HistoryMessages) {
  HistoryMessages.StartCell = 'start_cell';
  HistoryMessages.FinishCell = 'finish_cell';
  HistoryMessages.UpdateCell = 'update_cell';
  HistoryMessages.GotoCodeCell = 'gotocell_code';
  HistoryMessages.RestartKernel = 'restart_kernel';
  HistoryMessages.Export = 'export_to_ipynb';
  HistoryMessages.GetAllCells = 'get_all_cells';
  HistoryMessages.ReturnAllCells = 'return_all_cells';
  HistoryMessages.DeleteCell = 'delete_cell';
  HistoryMessages.DeleteAllCells = 'delete_all_cells';
  HistoryMessages.Undo = 'undo';
  HistoryMessages.Redo = 'redo';
  HistoryMessages.ExpandAll = 'expand_all';
  HistoryMessages.CollapseAll = 'collapse_all';
  HistoryMessages.StartProgress = 'start_progress';
  HistoryMessages.StopProgress = 'stop_progress';
})(HistoryMessages = exports.HistoryMessages || (exports.HistoryMessages = {}));

var Telemetry;

(function (Telemetry) {
  Telemetry.ImportNotebook = 'DATASCIENCE.IMPORT_NOTEBOOK';
  Telemetry.RunCell = 'DATASCIENCE.RUN_CELL';
  Telemetry.RunCurrentCell = 'DATASCIENCE.RUN_CURRENT_CELL';
  Telemetry.RunCurrentCellAndAdvance = 'DATASCIENCE.RUN_CURRENT_CELL_AND_ADVANCE';
  Telemetry.RunAllCells = 'DATASCIENCE.RUN_ALL_CELLS';
  Telemetry.DeleteAllCells = 'DATASCIENCE.DELETE_ALL_CELLS';
  Telemetry.DeleteCell = 'DATASCIENCE.DELETE_CELL';
  Telemetry.GotoSourceCode = 'DATASCIENCE.GOTO_SOURCE';
  Telemetry.RestartKernel = 'DATASCIENCE.RESTART_KERNEL';
  Telemetry.ExportNotebook = 'DATASCIENCE.EXPORT_NOTEBOOK';
  Telemetry.Undo = 'DATASCIENCE.UNDO';
  Telemetry.Redo = 'DATASCIENCE.REDO';
  Telemetry.ShowHistoryPane = 'DATASCIENCE.SHOW_HISTORY_PANE';
  Telemetry.ExpandAll = 'DATASCIENCE.EXPAND_ALL';
  Telemetry.CollapseAll = 'DATASCIENCE.COLLAPSE_ALL';
})(Telemetry = exports.Telemetry || (exports.Telemetry = {}));

var HelpLinks;

(function (HelpLinks) {
  HelpLinks.PythonInteractiveHelpLink = 'https://aka.ms/pyaiinstall';
})(HelpLinks = exports.HelpLinks || (exports.HelpLinks = {}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnN0YW50cy5qcyJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsIkNvbW1hbmRzIiwiUnVuQWxsQ2VsbHMiLCJSdW5DZWxsIiwiUnVuQ3VycmVudENlbGwiLCJSdW5DdXJyZW50Q2VsbEFkdmFuY2UiLCJTaG93SGlzdG9yeVBhbmUiLCJJbXBvcnROb3RlYm9vayIsIkVkaXRvckNvbnRleHRzIiwiSGFzQ29kZUNlbGxzIiwiRGF0YVNjaWVuY2VFbmFibGVkIiwiUmVnRXhwVmFsdWVzIiwiUHl0aG9uQ2VsbE1hcmtlciIsIlJlZ0V4cCIsIlB5dGhvbk1hcmtkb3duQ2VsbE1hcmtlciIsIkhpc3RvcnlNZXNzYWdlcyIsIlN0YXJ0Q2VsbCIsIkZpbmlzaENlbGwiLCJVcGRhdGVDZWxsIiwiR290b0NvZGVDZWxsIiwiUmVzdGFydEtlcm5lbCIsIkV4cG9ydCIsIkdldEFsbENlbGxzIiwiUmV0dXJuQWxsQ2VsbHMiLCJEZWxldGVDZWxsIiwiRGVsZXRlQWxsQ2VsbHMiLCJVbmRvIiwiUmVkbyIsIkV4cGFuZEFsbCIsIkNvbGxhcHNlQWxsIiwiU3RhcnRQcm9ncmVzcyIsIlN0b3BQcm9ncmVzcyIsIlRlbGVtZXRyeSIsIlJ1bkN1cnJlbnRDZWxsQW5kQWR2YW5jZSIsIkdvdG9Tb3VyY2VDb2RlIiwiRXhwb3J0Tm90ZWJvb2siLCJIZWxwTGlua3MiLCJQeXRob25JbnRlcmFjdGl2ZUhlbHBMaW5rIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7O0FBQ0FBLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFBRUMsRUFBQUEsS0FBSyxFQUFFO0FBQVQsQ0FBN0M7QUFDQSxJQUFJQyxRQUFKOztBQUNBLENBQUMsVUFBVUEsUUFBVixFQUFvQjtBQUNqQkEsRUFBQUEsUUFBUSxDQUFDQyxXQUFULEdBQXVCLGdDQUF2QjtBQUNBRCxFQUFBQSxRQUFRLENBQUNFLE9BQVQsR0FB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Qiw4QkFBM0I7QUFDQU8sRUFBQUEsU0FBUyxDQUFDUixVQUFWLEdBQXVCLHlCQUF2QjtBQUNBUSxFQUFBQSxTQUFTLENBQUNFLGNBQVYsR0FBMkIseUJBQTNCO0FBQ0FGLEVBQUFBLFNBQVMsQ0FBQ1osYUFBVixHQUEwQiw0QkFBMUI7QUFDQVksRUFBQUEsU0FBUyxDQUFDRyxjQUFWLEdBQTJCLDZCQUEzQjtBQUNBSCxFQUFBQSxTQUFTLENBQUNOLElBQVYsR0FBaUIsa0JBQWpCO0FBQ0FNLEVBQUFBLFNBQVMsQ0FBQ0wsSUFBVixHQUFpQixrQkFBakI7QUFDQUssRUFBQUEsU0FBUyxDQUFDMUIsZUFBVixHQUE0QiwrQkFBNUI7QUFDQTBCLEVBQUFBLFNBQVMsQ0FBQ0osU0FBVixHQUFzQix3QkFBdEI7QUFDQUksRUFBQUEsU0FBUyxDQUFDSCxXQUFWLEdBQXdCLDBCQUF4QjtBQUNILENBaEJELEVBZ0JHRyxTQUFTLEdBQUdqQyxPQUFPLENBQUNpQyxTQUFSLEtBQXNCakMsT0FBTyxDQUFDaUMsU0FBUixHQUFvQixFQUExQyxDQWhCZjs7QUFpQkEsSUFBSUksU0FBSjs7QUFDQSxDQUFDLFVBQVVBLFNBQVYsRUFBcUI7QUFDbEJBLEVBQUFBLFNBQVMsQ0FBQ0MseUJBQVYsR0FBc0MsNEJBQXRDO0FBQ0gsQ0FGRCxFQUVHRCxTQUFTLEdBQUdyQyxPQUFPLENBQUNxQyxTQUFSLEtBQXNCckMsT0FBTyxDQUFDcUMsU0FBUixHQUFvQixFQUExQyxDQUZmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuJ3VzZSBzdHJpY3QnO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBDb21tYW5kcztcclxuKGZ1bmN0aW9uIChDb21tYW5kcykge1xyXG4gICAgQ29tbWFuZHMuUnVuQWxsQ2VsbHMgPSAncHl0aG9uLmRhdGFzY2llbmNlLnJ1bmFsbGNlbGxzJztcclxuICAgIENvbW1hbmRzLlJ1bkNlbGwgPSAncHl0aG9uLmRhdGFzY2llbmNlLnJ1bmNlbGwnO1xyXG4gICAgQ29tbWFuZHMuUnVuQ3VycmVudENlbGwgPSAncHl0aG9uLmRhdGFzY2llbmNlLnJ1bmN1cnJlbnRjZWxsJztcclxuICAgIENvbW1hbmRzLlJ1bkN1cnJlbnRDZWxsQWR2YW5jZSA9ICdweXRob24uZGF0YXNjaWVuY2UucnVuY3VycmVudGNlbGxhZHZhbmNlJztcclxuICAgIENvbW1hbmRzLlNob3dIaXN0b3J5UGFuZSA9ICdweXRob24uZGF0YXNjaWVuY2Uuc2hvd2hpc3RvcnlwYW5lJztcclxuICAgIENvbW1hbmRzLkltcG9ydE5vdGVib29rID0gJ3B5dGhvbi5kYXRhc2NpZW5jZS5pbXBvcnRub3RlYm9vayc7XHJcbn0pKENvbW1hbmRzID0gZXhwb3J0cy5Db21tYW5kcyB8fCAoZXhwb3J0cy5Db21tYW5kcyA9IHt9KSk7XHJcbnZhciBFZGl0b3JDb250ZXh0cztcclxuKGZ1bmN0aW9uIChFZGl0b3JDb250ZXh0cykge1xyXG4gICAgRWRpdG9yQ29udGV4dHMuSGFzQ29kZUNlbGxzID0gJ3B5dGhvbi5kYXRhc2NpZW5jZS5oYXNjb2RlY2VsbHMnO1xyXG4gICAgRWRpdG9yQ29udGV4dHMuRGF0YVNjaWVuY2VFbmFibGVkID0gJ3B5dGhvbi5kYXRhc2NpZW5jZS5mZWF0dXJlZW5hYmxlZCc7XHJcbn0pKEVkaXRvckNvbnRleHRzID0gZXhwb3J0cy5FZGl0b3JDb250ZXh0cyB8fCAoZXhwb3J0cy5FZGl0b3JDb250ZXh0cyA9IHt9KSk7XHJcbnZhciBSZWdFeHBWYWx1ZXM7XHJcbihmdW5jdGlvbiAoUmVnRXhwVmFsdWVzKSB7XHJcbiAgICBSZWdFeHBWYWx1ZXMuUHl0aG9uQ2VsbE1hcmtlciA9IG5ldyBSZWdFeHAoJ14oI1xcXFxzKiUlfCNcXFxccypcXFxcPGNvZGVjZWxsXFxcXD58I1xcXFxzKkluXFxcXFtcXFxcZCo/XFxcXF18I1xcXFxzKkluXFxcXFsgXFxcXF0pKC4qKScpO1xyXG4gICAgUmVnRXhwVmFsdWVzLlB5dGhvbk1hcmtkb3duQ2VsbE1hcmtlciA9IC9eI1xccyolJVxccypcXFttYXJrZG93blxcXS87XHJcbn0pKFJlZ0V4cFZhbHVlcyA9IGV4cG9ydHMuUmVnRXhwVmFsdWVzIHx8IChleHBvcnRzLlJlZ0V4cFZhbHVlcyA9IHt9KSk7XHJcbnZhciBIaXN0b3J5TWVzc2FnZXM7XHJcbihmdW5jdGlvbiAoSGlzdG9yeU1lc3NhZ2VzKSB7XHJcbiAgICBIaXN0b3J5TWVzc2FnZXMuU3RhcnRDZWxsID0gJ3N0YXJ0X2NlbGwnO1xyXG4gICAgSGlzdG9yeU1lc3NhZ2VzLkZpbmlzaENlbGwgPSAnZmluaXNoX2NlbGwnO1xyXG4gICAgSGlzdG9yeU1lc3NhZ2VzLlVwZGF0ZUNlbGwgPSAndXBkYXRlX2NlbGwnO1xyXG4gICAgSGlzdG9yeU1lc3NhZ2VzLkdvdG9Db2RlQ2VsbCA9ICdnb3RvY2VsbF9jb2RlJztcclxuICAgIEhpc3RvcnlNZXNzYWdlcy5SZXN0YXJ0S2VybmVsID0gJ3Jlc3RhcnRfa2VybmVsJztcclxuICAgIEhpc3RvcnlNZXNzYWdlcy5FeHBvcnQgPSAnZXhwb3J0X3RvX2lweW5iJztcclxuICAgIEhpc3RvcnlNZXNzYWdlcy5HZXRBbGxDZWxscyA9ICdnZXRfYWxsX2NlbGxzJztcclxuICAgIEhpc3RvcnlNZXNzYWdlcy5SZXR1cm5BbGxDZWxscyA9ICdyZXR1cm5fYWxsX2NlbGxzJztcclxuICAgIEhpc3RvcnlNZXNzYWdlcy5EZWxldGVDZWxsID0gJ2RlbGV0ZV9jZWxsJztcclxuICAgIEhpc3RvcnlNZXNzYWdlcy5EZWxldGVBbGxDZWxscyA9ICdkZWxldGVfYWxsX2NlbGxzJztcclxuICAgIEhpc3RvcnlNZXNzYWdlcy5VbmRvID0gJ3VuZG8nO1xyXG4gICAgSGlzdG9yeU1lc3NhZ2VzLlJlZG8gPSAncmVkbyc7XHJcbiAgICBIaXN0b3J5TWVzc2FnZXMuRXhwYW5kQWxsID0gJ2V4cGFuZF9hbGwnO1xyXG4gICAgSGlzdG9yeU1lc3NhZ2VzLkNvbGxhcHNlQWxsID0gJ2NvbGxhcHNlX2FsbCc7XHJcbiAgICBIaXN0b3J5TWVzc2FnZXMuU3RhcnRQcm9ncmVzcyA9ICdzdGFydF9wcm9ncmVzcyc7XHJcbiAgICBIaXN0b3J5TWVzc2FnZXMuU3RvcFByb2dyZXNzID0gJ3N0b3BfcHJvZ3Jlc3MnO1xyXG59KShIaXN0b3J5TWVzc2FnZXMgPSBleHBvcnRzLkhpc3RvcnlNZXNzYWdlcyB8fCAoZXhwb3J0cy5IaXN0b3J5TWVzc2FnZXMgPSB7fSkpO1xyXG52YXIgVGVsZW1ldHJ5O1xyXG4oZnVuY3Rpb24gKFRlbGVtZXRyeSkge1xyXG4gICAgVGVsZW1ldHJ5LkltcG9ydE5vdGVib29rID0gJ0RBVEFTQ0lFTkNFLklNUE9SVF9OT1RFQk9PSyc7XHJcbiAgICBUZWxlbWV0cnkuUnVuQ2VsbCA9ICdEQVRBU0NJRU5DRS5SVU5fQ0VMTCc7XHJcbiAgICBUZWxlbWV0cnkuUnVuQ3VycmVudENlbGwgPSAnREFUQVNDSUVOQ0UuUlVOX0NVUlJFTlRfQ0VMTCc7XHJcbiAgICBUZWxlbWV0cnkuUnVuQ3VycmVudENlbGxBbmRBZHZhbmNlID0gJ0RBVEFTQ0lFTkNFLlJVTl9DVVJSRU5UX0NFTExfQU5EX0FEVkFOQ0UnO1xyXG4gICAgVGVsZW1ldHJ5LlJ1bkFsbENlbGxzID0gJ0RBVEFTQ0lFTkNFLlJVTl9BTExfQ0VMTFMnO1xyXG4gICAgVGVsZW1ldHJ5LkRlbGV0ZUFsbENlbGxzID0gJ0RBVEFTQ0lFTkNFLkRFTEVURV9BTExfQ0VMTFMnO1xyXG4gICAgVGVsZW1ldHJ5LkRlbGV0ZUNlbGwgPSAnREFUQVNDSUVOQ0UuREVMRVRFX0NFTEwnO1xyXG4gICAgVGVsZW1ldHJ5LkdvdG9Tb3VyY2VDb2RlID0gJ0RBVEFTQ0lFTkNFLkdPVE9fU09VUkNFJztcclxuICAgIFRlbGVtZXRyeS5SZXN0YXJ0S2VybmVsID0gJ0RBVEFTQ0lFTkNFLlJFU1RBUlRfS0VSTkVMJztcclxuICAgIFRlbGVtZXRyeS5FeHBvcnROb3RlYm9vayA9ICdEQVRBU0NJRU5DRS5FWFBPUlRfTk9URUJPT0snO1xyXG4gICAgVGVsZW1ldHJ5LlVuZG8gPSAnREFUQVNDSUVOQ0UuVU5ETyc7XHJcbiAgICBUZWxlbWV0cnkuUmVkbyA9ICdEQVRBU0NJRU5DRS5SRURPJztcclxuICAgIFRlbGVtZXRyeS5TaG93SGlzdG9yeVBhbmUgPSAnREFUQVNDSUVOQ0UuU0hPV19ISVNUT1JZX1BBTkUnO1xyXG4gICAgVGVsZW1ldHJ5LkV4cGFuZEFsbCA9ICdEQVRBU0NJRU5DRS5FWFBBTkRfQUxMJztcclxuICAgIFRlbGVtZXRyeS5Db2xsYXBzZUFsbCA9ICdEQVRBU0NJRU5DRS5DT0xMQVBTRV9BTEwnO1xyXG59KShUZWxlbWV0cnkgPSBleHBvcnRzLlRlbGVtZXRyeSB8fCAoZXhwb3J0cy5UZWxlbWV0cnkgPSB7fSkpO1xyXG52YXIgSGVscExpbmtzO1xyXG4oZnVuY3Rpb24gKEhlbHBMaW5rcykge1xyXG4gICAgSGVscExpbmtzLlB5dGhvbkludGVyYWN0aXZlSGVscExpbmsgPSAnaHR0cHM6Ly9ha2EubXMvcHlhaWluc3RhbGwnO1xyXG59KShIZWxwTGlua3MgPSBleHBvcnRzLkhlbHBMaW5rcyB8fCAoZXhwb3J0cy5IZWxwTGlua3MgPSB7fSkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25zdGFudHMuanMubWFwIl19