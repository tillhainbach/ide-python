// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

const types_1 = require("../../client/datascience/types");

const cell_1 = require("./cell"); // This function generates test state when running under a browser instead of inside of


function generateTestState(inputBlockToggled) {
  return {
    cellVMs: generateVMs(inputBlockToggled),
    busy: true,
    skipNextScroll: false,
    undoStack: [],
    redoStack: []
  };
}

exports.generateTestState = generateTestState;

function createCellVM(inputCell, inputBlockToggled) {
  let inputLinesCount = 0;
  let source = inputCell.data.cell_type === 'code' ? inputCell.data.source : []; // Eliminate the #%% on the front if it has nothing else on the line

  if (source.length > 0 && /^\s*#\s*%%\s*$/.test(source[0].trim())) {
    source = source.slice(1);
  }

  const inputText = inputCell.data.cell_type === 'code' ? cell_1.Cell.concatMultilineString(source) : '';

  if (inputText) {
    inputLinesCount = inputText.split('\n').length;
  }

  return {
    cell: inputCell,
    inputBlockOpen: true,
    inputBlockText: inputText,
    inputBlockCollapseNeeded: inputLinesCount > 1,
    inputBlockToggled: inputBlockToggled
  };
}

exports.createCellVM = createCellVM;

function generateVMs(inputBlockToggled) {
  const cells = generateCells();
  return cells.map(cell => {
    return createCellVM(cell, inputBlockToggled);
  });
}

function generateCells() {
  const cellData = generateCellData();
  return cellData.map((data, key) => {
    return {
      id: key.toString(),
      file: 'foo.py',
      line: 1,
      state: key === cellData.length - 1 ? types_1.CellState.executing : types_1.CellState.finished,
      data: data
    };
  });
}

function generateCellData() {
  // Hopefully new entries here can just be copied out of a jupyter notebook (ipynb)
  return [{
    cell_type: 'code',
    execution_count: 4,
    metadata: {
      slideshow: {
        slide_type: '-'
      }
    },
    outputs: [{
      data: {
        'text/plain': ['   num_preg  glucose_conc  diastolic_bp  thickness  insulin   bmi  diab_pred  \\\n', '0         6           148            72         35        0  33.6      0.627   \n', '1         1            85            66         29        0  26.6      0.351   \n', '2         8           183            64          0        0  23.3      0.672   \n', '3         1            89            66         23       94  28.1      0.167   \n', '4         0           137            40         35      168  43.1      2.288   \n', '\n', '   age    skin  diabetes  \n', '0   50  1.3790      True  \n', '1   31  1.1426     False  \n', '2   32  0.0000      True  \n', '3   21  0.9062     False  \n', '4   33  1.3790      True  super long line that should wrap around but it isnt because we didnt put in the correct css super long line that should wrap around but it isnt because we didnt put in the correct css super long line that should wrap around but it isnt because we didnt put in the correct css']
      },
      execution_count: 4,
      metadata: {},
      output_type: 'execute_result'
    }],
    source: ['# comment', 'df', 'df.head(5)']
  }, {
    cell_type: 'markdown',
    metadata: {},
    source: ['## Cell 3\n', 'Here\'s some markdown\n', '- A List\n', '- Of Items']
  }, {
    cell_type: 'code',
    execution_count: 1,
    metadata: {},
    outputs: [{
      ename: 'NameError',
      evalue: 'name "df" is not defined',
      output_type: 'error',
      traceback: ['\u001b[1;31m---------------------------------------------------------------------------\u001b[0m', '\u001b[1;31mNameError\u001b[0m                                 Traceback (most recent call last)', '\u001b[1;32m<ipython-input-1-00cf07b74dcd>\u001b[0m in \u001b[0;36m<module>\u001b[1;34m()\u001b[0m\n\u001b[1;32m----> 1\u001b[1;33m \u001b[0mdf\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0m', '\u001b[1;31mNameError\u001b[0m: name "df" is not defined']
    }],
    source: ['df']
  }, {
    cell_type: 'code',
    execution_count: 1,
    metadata: {},
    outputs: [{
      ename: 'NameError',
      evalue: 'name "df" is not defined',
      output_type: 'error',
      traceback: ['\u001b[1;31m---------------------------------------------------------------------------\u001b[0m', '\u001b[1;31mNameError\u001b[0m                                 Traceback (most recent call last)', '\u001b[1;32m<ipython-input-1-00cf07b74dcd>\u001b[0m in \u001b[0;36m<module>\u001b[1;34m()\u001b[0m\n\u001b[1;32m----> 1\u001b[1;33m \u001b[0mdf\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0m', '\u001b[1;31mNameError\u001b[0m: name "df" is not defined']
    }],
    source: ['df']
  }];
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW5QYW5lbFN0YXRlLmpzIl0sIm5hbWVzIjpbIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwidHlwZXNfMSIsInJlcXVpcmUiLCJjZWxsXzEiLCJnZW5lcmF0ZVRlc3RTdGF0ZSIsImlucHV0QmxvY2tUb2dnbGVkIiwiY2VsbFZNcyIsImdlbmVyYXRlVk1zIiwiYnVzeSIsInNraXBOZXh0U2Nyb2xsIiwidW5kb1N0YWNrIiwicmVkb1N0YWNrIiwiY3JlYXRlQ2VsbFZNIiwiaW5wdXRDZWxsIiwiaW5wdXRMaW5lc0NvdW50Iiwic291cmNlIiwiZGF0YSIsImNlbGxfdHlwZSIsImxlbmd0aCIsInRlc3QiLCJ0cmltIiwic2xpY2UiLCJpbnB1dFRleHQiLCJDZWxsIiwiY29uY2F0TXVsdGlsaW5lU3RyaW5nIiwic3BsaXQiLCJjZWxsIiwiaW5wdXRCbG9ja09wZW4iLCJpbnB1dEJsb2NrVGV4dCIsImlucHV0QmxvY2tDb2xsYXBzZU5lZWRlZCIsImNlbGxzIiwiZ2VuZXJhdGVDZWxscyIsIm1hcCIsImNlbGxEYXRhIiwiZ2VuZXJhdGVDZWxsRGF0YSIsImtleSIsImlkIiwidG9TdHJpbmciLCJmaWxlIiwibGluZSIsInN0YXRlIiwiQ2VsbFN0YXRlIiwiZXhlY3V0aW5nIiwiZmluaXNoZWQiLCJleGVjdXRpb25fY291bnQiLCJtZXRhZGF0YSIsInNsaWRlc2hvdyIsInNsaWRlX3R5cGUiLCJvdXRwdXRzIiwib3V0cHV0X3R5cGUiLCJlbmFtZSIsImV2YWx1ZSIsInRyYWNlYmFjayJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBOztBQUNBQSxNQUFNLENBQUNDLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQUVDLEVBQUFBLEtBQUssRUFBRTtBQUFULENBQTdDOztBQUNBLE1BQU1DLE9BQU8sR0FBR0MsT0FBTyxDQUFDLGdDQUFELENBQXZCOztBQUNBLE1BQU1DLE1BQU0sR0FBR0QsT0FBTyxDQUFD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QWpERyxFQXNFSDtBQUNJRSxJQUFBQSxTQUFTLEVBQUUsTUFEZjtBQUVJMkIsSUFBQUEsZUFBZSxFQUFFLENBRnJCO0FBR0lDLElBQUFBLFFBQVEsRUFBRSxFQUhkO0FBSUlHLElBQUFBLE9BQU8sRUFBRSxDQUNMO0FBQ0lFLE1BQUFBLEtBQUssRUFBRSxXQURYO0FBRUlDLE1BQUFBLE1BQU0sRUFBRSwwQkFGWjtBQUdJRixNQUFBQSxXQUFXLEVBQUUsT0FIakI7QUFJSUcsTUFBQUEsU0FBUyxFQUFFLENBQ1Asa0dBRE8sRUFFUCxrR0FGTyxFQUdQLG1NQUhPLEVBSVAsMERBSk87QUFKZixLQURLLENBSmI7QUFpQklyQyxJQUFBQSxNQUFNLEVBQUUsQ0FDSixJQURJO0FBakJaLEdBdEVHLENBQVA7QUE0RkgiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG4ndXNlIHN0cmljdCc7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgdHlwZXNfMSA9IHJlcXVpcmUoXCIuLi8uLi9jbGllbnQvZGF0YXNjaWVuY2UvdHlwZXNcIik7XHJcbmNvbnN0IGNlbGxfMSA9IHJlcXVpcmUoXCIuL2NlbGxcIik7XHJcbi8vIFRoaXMgZnVuY3Rpb24gZ2VuZXJhdGVzIHRlc3Qgc3RhdGUgd2hlbiBydW5uaW5nIHVuZGVyIGEgYnJvd3NlciBpbnN0ZWFkIG9mIGluc2lkZSBvZlxyXG5mdW5jdGlvbiBnZW5lcmF0ZVRlc3RTdGF0ZShpbnB1dEJsb2NrVG9nZ2xlZCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjZWxsVk1zOiBnZW5lcmF0ZVZNcyhpbnB1dEJsb2NrVG9nZ2xlZCksXHJcbiAgICAgICAgYnVzeTogdHJ1ZSxcclxuICAgICAgICBza2lwTmV4dFNjcm9sbDogZmFsc2UsXHJcbiAgICAgICAgdW5kb1N0YWNrOiBbXSxcclxuICAgICAgICByZWRvU3RhY2s6IFtdXHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydHMuZ2VuZXJhdGVUZXN0U3RhdGUgPSBnZW5lcmF0ZVRlc3RTdGF0ZTtcclxuZnVuY3Rpb24gY3JlYXRlQ2VsbFZNKGlucHV0Q2VsbCwgaW5wdXRCbG9ja1RvZ2dsZWQpIHtcclxuICAgIGxldCBpbnB1dExpbmVzQ291bnQgPSAwO1xyXG4gICAgbGV0IHNvdXJjZSA9IGlucHV0Q2VsbC5kYXRhLmNlbGxfdHlwZSA9PT0gJ2NvZGUnID8gaW5wdXRDZWxsLmRhdGEuc291cmNlIDogW107XHJcbiAgICAvLyBFbGltaW5hdGUgdGhlICMlJSBvbiB0aGUgZnJvbnQgaWYgaXQgaGFzIG5vdGhpbmcgZWxzZSBvbiB0aGUgbGluZVxyXG4gICAgaWYgKHNvdXJjZS5sZW5ndGggPiAwICYmIC9eXFxzKiNcXHMqJSVcXHMqJC8udGVzdChzb3VyY2VbMF0udHJpbSgpKSkge1xyXG4gICAgICAgIHNvdXJjZSA9IHNvdXJjZS5zbGljZSgxKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGlucHV0VGV4dCA9IGlucHV0Q2VsbC5kYXRhLmNlbGxfdHlwZSA9PT0gJ2NvZGUnID8gY2VsbF8xLkNlbGwuY29uY2F0TXVsdGlsaW5lU3RyaW5nKHNvdXJjZSkgOiAnJztcclxuICAgIGlmIChpbnB1dFRleHQpIHtcclxuICAgICAgICBpbnB1dExpbmVzQ291bnQgPSBpbnB1dFRleHQuc3BsaXQoJ1xcbicpLmxlbmd0aDtcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY2VsbDogaW5wdXRDZWxsLFxyXG4gICAgICAgIGlucHV0QmxvY2tPcGVuOiB0cnVlLFxyXG4gICAgICAgIGlucHV0QmxvY2tUZXh0OiBpbnB1dFRleHQsXHJcbiAgICAgICAgaW5wdXRCbG9ja0NvbGxhcHNlTmVlZGVkOiBpbnB1dExpbmVzQ291bnQgPiAxLFxyXG4gICAgICAgIGlucHV0QmxvY2tUb2dnbGVkOiBpbnB1dEJsb2NrVG9nZ2xlZFxyXG4gICAgfTtcclxufVxyXG5leHBvcnRzLmNyZWF0ZUNlbGxWTSA9IGNyZWF0ZUNlbGxWTTtcclxuZnVuY3Rpb24gZ2VuZXJhdGVWTXMoaW5wdXRCbG9ja1RvZ2dsZWQpIHtcclxuICAgIGNvbnN0IGNlbGxzID0gZ2VuZXJhdGVDZWxscygpO1xyXG4gICAgcmV0dXJuIGNlbGxzLm1hcCgoY2VsbCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBjcmVhdGVDZWxsVk0oY2VsbCwgaW5wdXRCbG9ja1RvZ2dsZWQpO1xyXG4gICAgfSk7XHJcbn1cclxuZnVuY3Rpb24gZ2VuZXJhdGVDZWxscygpIHtcclxuICAgIGNvbnN0IGNlbGxEYXRhID0gZ2VuZXJhdGVDZWxsRGF0YSgpO1xyXG4gICAgcmV0dXJuIGNlbGxEYXRhLm1hcCgoZGF0YSwga2V5KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaWQ6IGtleS50b1N0cmluZygpLFxyXG4gICAgICAgICAgICBmaWxlOiAnZm9vLnB5JyxcclxuICAgICAgICAgICAgbGluZTogMSxcclxuICAgICAgICAgICAgc3RhdGU6IGtleSA9PT0gY2VsbERhdGEubGVuZ3RoIC0gMSA/IHR5cGVzXzEuQ2VsbFN0YXRlLmV4ZWN1dGluZyA6IHR5cGVzXzEuQ2VsbFN0YXRlLmZpbmlzaGVkLFxyXG4gICAgICAgICAgICBkYXRhOiBkYXRhXHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG59XHJcbmZ1bmN0aW9uIGdlbmVyYXRlQ2VsbERhdGEoKSB7XHJcbiAgICAvLyBIb3BlZnVsbHkgbmV3IGVudHJpZXMgaGVyZSBjYW4ganVzdCBiZSBjb3BpZWQgb3V0IG9mIGEganVweXRlciBub3RlYm9vayAoaXB5bmIpXHJcbiAgICByZXR1cm4gW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2VsbF90eXBlOiAnY29kZScsXHJcbiAgICAgICAgICAgIGV4ZWN1dGlvbl9jb3VudDogNCxcclxuICAgICAgICAgICAgbWV0YWRhdGE6IHtcclxuICAgICAgICAgICAgICAgIHNsaWRlc2hvdzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlX3R5cGU6ICctJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvdXRwdXRzOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAndGV4dC9wbGFpbic6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcgICBudW1fcHJlZyAgZ2x1Y29zZV9jb25jICBkaWFzdG9saWNfYnAgIHRoaWNrbmVzcyAgaW5zdWxpbiAgIGJtaSAgZGlhYl9wcmVkICBcXFxcXFxuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcwICAgICAgICAgNiAgICAgICAgICAgMTQ4ICAgICAgICAgICAgNzIgICAgICAgICAzNSAgICAgICAgMCAgMzMuNiAgICAgIDAuNjI3ICAgXFxuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcxICAgICAgICAgMSAgICAgICAgICAgIDg1ICAgICAgICAgICAgNjYgICAgICAgICAyOSAgICAgICAgMCAgMjYuNiAgICAgIDAuMzUxICAgXFxuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcyICAgICAgICAgOCAgICAgICAgICAgMTgzICAgICAgICAgICAgNjQgICAgICAgICAgMCAgICAgICAgMCAgMjMuMyAgICAgIDAuNjcyICAgXFxuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICczICAgICAgICAgMSAgICAgICAgICAgIDg5ICAgICAgICAgICAgNjYgICAgICAgICAyMyAgICAgICA5NCAgMjguMSAgICAgIDAuMTY3ICAgXFxuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc0ICAgICAgICAgMCAgICAgICAgICAgMTM3ICAgICAgICAgICAgNDAgICAgICAgICAzNSAgICAgIDE2OCAgNDMuMSAgICAgIDIuMjg4ICAgXFxuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdcXG4nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyAgIGFnZSAgICBza2luICBkaWFiZXRlcyAgXFxuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcwICAgNTAgIDEuMzc5MCAgICAgIFRydWUgIFxcbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnMSAgIDMxICAxLjE0MjYgICAgIEZhbHNlICBcXG4nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzIgICAzMiAgMC4wMDAwICAgICAgVHJ1ZSAgXFxuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICczICAgMjEgIDAuOTA2MiAgICAgRmFsc2UgIFxcbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnNCAgIDMzICAxLjM3OTAgICAgICBUcnVlICBzdXBlciBsb25nIGxpbmUgdGhhdCBzaG91bGQgd3JhcCBhcm91bmQgYnV0IGl0IGlzbnQgYmVjYXVzZSB3ZSBkaWRudCBwdXQgaW4gdGhlIGNvcnJlY3QgY3NzIHN1cGVyIGxvbmcgbGluZSB0aGF0IHNob3VsZCB3cmFwIGFyb3VuZCBidXQgaXQgaXNudCBiZWNhdXNlIHdlIGRpZG50IHB1dCBpbiB0aGUgY29ycmVjdCBjc3Mgc3VwZXIgbG9uZyBsaW5lIHRoYXQgc2hvdWxkIHdyYXAgYXJvdW5kIGJ1dCBpdCBpc250IGJlY2F1c2Ugd2UgZGlkbnQgcHV0IGluIHRoZSBjb3JyZWN0IGNzcydcclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZXhlY3V0aW9uX2NvdW50OiA0LFxyXG4gICAgICAgICAgICAgICAgICAgIG1ldGFkYXRhOiB7fSxcclxuICAgICAgICAgICAgICAgICAgICBvdXRwdXRfdHlwZTogJ2V4ZWN1dGVfcmVzdWx0J1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBzb3VyY2U6IFtcclxuICAgICAgICAgICAgICAgICcjIGNvbW1lbnQnLFxyXG4gICAgICAgICAgICAgICAgJ2RmJyxcclxuICAgICAgICAgICAgICAgICdkZi5oZWFkKDUpJ1xyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNlbGxfdHlwZTogJ21hcmtkb3duJyxcclxuICAgICAgICAgICAgbWV0YWRhdGE6IHt9LFxyXG4gICAgICAgICAgICBzb3VyY2U6IFtcclxuICAgICAgICAgICAgICAgICcjIyBDZWxsIDNcXG4nLFxyXG4gICAgICAgICAgICAgICAgJ0hlcmVcXCdzIHNvbWUgbWFya2Rvd25cXG4nLFxyXG4gICAgICAgICAgICAgICAgJy0gQSBMaXN0XFxuJyxcclxuICAgICAgICAgICAgICAgICctIE9mIEl0ZW1zJ1xyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNlbGxfdHlwZTogJ2NvZGUnLFxyXG4gICAgICAgICAgICBleGVjdXRpb25fY291bnQ6IDEsXHJcbiAgICAgICAgICAgIG1ldGFkYXRhOiB7fSxcclxuICAgICAgICAgICAgb3V0cHV0czogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYW1lOiAnTmFtZUVycm9yJyxcclxuICAgICAgICAgICAgICAgICAgICBldmFsdWU6ICduYW1lIFwiZGZcIiBpcyBub3QgZGVmaW5lZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0X3R5cGU6ICdlcnJvcicsXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhY2ViYWNrOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdcXHUwMDFiWzE7MzFtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFx1MDAxYlswbScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdcXHUwMDFiWzE7MzFtTmFtZUVycm9yXFx1MDAxYlswbSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRyYWNlYmFjayAobW9zdCByZWNlbnQgY2FsbCBsYXN0KScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdcXHUwMDFiWzE7MzJtPGlweXRob24taW5wdXQtMS0wMGNmMDdiNzRkY2Q+XFx1MDAxYlswbSBpbiBcXHUwMDFiWzA7MzZtPG1vZHVsZT5cXHUwMDFiWzE7MzRtKClcXHUwMDFiWzBtXFxuXFx1MDAxYlsxOzMybS0tLS0+IDFcXHUwMDFiWzE7MzNtIFxcdTAwMWJbMG1kZlxcdTAwMWJbMG1cXHUwMDFiWzE7MzNtXFx1MDAxYlswbVxcdTAwMWJbMG1cXG5cXHUwMDFiWzBtJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ1xcdTAwMWJbMTszMW1OYW1lRXJyb3JcXHUwMDFiWzBtOiBuYW1lIFwiZGZcIiBpcyBub3QgZGVmaW5lZCdcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHNvdXJjZTogW1xyXG4gICAgICAgICAgICAgICAgJ2RmJ1xyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNlbGxfdHlwZTogJ2NvZGUnLFxyXG4gICAgICAgICAgICBleGVjdXRpb25fY291bnQ6IDEsXHJcbiAgICAgICAgICAgIG1ldGFkYXRhOiB7fSxcclxuICAgICAgICAgICAgb3V0cHV0czogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYW1lOiAnTmFtZUVycm9yJyxcclxuICAgICAgICAgICAgICAgICAgICBldmFsdWU6ICduYW1lIFwiZGZcIiBpcyBub3QgZGVmaW5lZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0X3R5cGU6ICdlcnJvcicsXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhY2ViYWNrOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdcXHUwMDFiWzE7MzFtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFx1MDAxYlswbScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdcXHUwMDFiWzE7MzFtTmFtZUVycm9yXFx1MDAxYlswbSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRyYWNlYmFjayAobW9zdCByZWNlbnQgY2FsbCBsYXN0KScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdcXHUwMDFiWzE7MzJtPGlweXRob24taW5wdXQtMS0wMGNmMDdiNzRkY2Q+XFx1MDAxYlswbSBpbiBcXHUwMDFiWzA7MzZtPG1vZHVsZT5cXHUwMDFiWzE7MzRtKClcXHUwMDFiWzBtXFxuXFx1MDAxYlsxOzMybS0tLS0+IDFcXHUwMDFiWzE7MzNtIFxcdTAwMWJbMG1kZlxcdTAwMWJbMG1cXHUwMDFiWzE7MzNtXFx1MDAxYlswbVxcdTAwMWJbMG1cXG5cXHUwMDFiWzBtJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ1xcdTAwMWJbMTszMW1OYW1lRXJyb3JcXHUwMDFiWzBtOiBuYW1lIFwiZGZcIiBpcyBub3QgZGVmaW5lZCdcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHNvdXJjZTogW1xyXG4gICAgICAgICAgICAgICAgJ2RmJ1xyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgXTtcclxufVxyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYWluUGFuZWxTdGF0ZS5qcy5tYXAiXX0=