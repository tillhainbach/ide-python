// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
}); //
// Constants that pertain to CI processes/tests only. No dependencies on vscode!
//

exports.IS_APPVEYOR = process.env.APPVEYOR === 'true';
exports.IS_TRAVIS = process.env.TRAVIS === 'true';
exports.IS_VSTS = process.env.TF_BUILD !== undefined;
exports.IS_CI_SERVER = exports.IS_TRAVIS || exports.IS_APPVEYOR || exports.IS_VSTS; // Control JUnit-style output logging for reporting purposes.

let reportJunit = false;

if (exports.IS_CI_SERVER && process.env.MOCHA_REPORTER_JUNIT !== undefined) {
  reportJunit = process.env.MOCHA_REPORTER_JUNIT.toLowerCase() === 'true';
}

exports.MOCHA_REPORTER_JUNIT = reportJunit;
exports.MOCHA_CI_REPORTFILE = exports.MOCHA_REPORTER_JUNIT && process.env.MOCHA_CI_REPORTFILE !== undefined ? process.env.MOCHA_CI_REPORTFILE : './junit-out.xml';
exports.MOCHA_CI_PROPERTIES = exports.MOCHA_REPORTER_JUNIT && process.env.MOCHA_CI_PROPERTIES !== undefined ? process.env.MOCHA_CI_PROPERTIES : '';
exports.MOCHA_CI_REPORTER_ID = exports.MOCHA_REPORTER_JUNIT && process.env.MOCHA_CI_REPORTER_ID !== undefined ? process.env.MOCHA_CI_REPORTER_ID : 'mocha-junit-reporter';
exports.IS_CI_SERVER_TEST_DEBUGGER = process.env.IS_CI_SERVER_TEST_DEBUGGER === '1';
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNpQ29uc3RhbnRzLmpzIl0sIm5hbWVzIjpbIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwiSVNfQVBQVkVZT1IiLCJwcm9jZXNzIiwiZW52IiwiQVBQVkVZT1IiLCJJU19UUkFWSVMiLCJUUkFWSVMiLCJJU19WU1RTIiwiVEZfQlVJTEQiLCJ1bmRlZmluZWQiLCJJU19DSV9TRVJWRVIiLCJyZXBvcnRKdW5pdCIsIk1PQ0hBX1JFUE9SVEVSX0pVTklUIiwidG9Mb3dlckNhc2UiLCJNT0NIQV9DSV9SRVBPUlRGSUxFIiwiTU9DSEFfQ0lfUFJPUEVSVElFUyIsIk1PQ0hBX0NJX1JFUE9SVEVSX0lEIiwiSVNfQ0lfU0VSVkVSX1RFU1RfREVCVUdHRVIiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTs7QUFDQUEsTUFBTSxDQUFDQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUFFQyxFQUFBQSxLQUFLLEVBQUU7QUFBVCxDQUE3QyxFLENBQ0E7QUFDQTtBQUNBOztBQUNBRCxPQUFPLENBQUNFLFdBQVIsR0FBc0JDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxRQUFaLEtBQXlCLE1BQS9DO0FBQ0FMLE9BQU8sQ0FBQ00sU0FBUixHQUFvQkgsT0FBTyxDQUFDQyxHQUFSLENBQVlHLE1BQVosS0FBdUIsTUFBM0M7QUFDQVAsT0FBTyxDQUFDUSxPQUFSLEdBQWtCTCxPQUFPLENBQUNDLEdBQVIsQ0FBWUssUUFBWixLQUF5QkMsU0FBM0M7QUFDQVYsT0FBTyxDQUFDVyxZQUFSLEdBQXVCWCxPQUFPLENBQUNNLFNBQVIsSUFBcUJOLE9BQU8sQ0FBQ0UsV0FBN0IsSUFBNENGLE9BQU8sQ0FBQ1EsT0FBM0UsQyxDQUNBOztBQUNBLElBQUlJLFdBQVcsR0FBRyxLQUFsQjs7QUFDQSxJQUFJWixPQUFPLENBQUNXLFlBQVIsSUFBd0JSLE9BQU8sQ0FBQ0MsR0FBUixDQUFZUyxvQkFBWixLQUFxQ0gsU0FBakUsRUFBNEU7QUFDeEVFLEVBQUFBLFdBQVcsR0FBR1QsT0FBTyxDQUFDQyxHQUFSLENBQVlTLG9CQUFaLENBQWlDQyxXQUFqQyxPQUFtRCxNQUFqRTtBQUNIOztBQUNEZCxPQUFPLENBQUNhLG9CQUFSLEdBQStCRCxXQUEvQjtBQUNBWixPQUFPLENBQUNlLG1CQUFSLEdBQThCZixPQUFPLENBQUNhLG9CQUFSLElBQWdDVixPQUFPLENBQUNDLEdBQVIsQ0FBWVcsbUJBQVosS0FBb0NMLFNBQXBFLEdBQzFCUCxPQUFPLENBQUNDLEdBQVIsQ0FBWVcsbUJBRGMsR0FDUSxpQkFEdEM7QUFFQWYsT0FBTyxDQUFDZ0IsbUJBQVIsR0FBOEJoQixPQUFPLENBQUNhLG9CQUFSLElBQWdDVixPQUFPLENBQUNDLEdBQVIsQ0FBWVksbUJBQVosS0FBb0NOLFNBQXBFLEdBQzFCUCxPQUFPLENBQUNDLEdBQVIsQ0FBWVksbUJBRGMsR0FDUSxFQUR0QztBQUVBaEIsT0FBTyxDQUFDaUIsb0JBQVIsR0FBK0JqQixPQUFPLENBQUNhLG9CQUFSLElBQWdDVixPQUFPLENBQUNDLEdBQVIsQ0FBWWEsb0JBQVosS0FBcUNQLFNBQXJFLEdBQzNCUCxPQUFPLENBQUNDLEdBQVIsQ0FBWWEsb0JBRGUsR0FDUSxzQkFEdkM7QUFFQWpCLE9BQU8sQ0FBQ2tCLDBCQUFSLEdBQXFDZixPQUFPLENBQUNDLEdBQVIsQ0FBWWMsMEJBQVosS0FBMkMsR0FBaEYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbid1c2Ugc3RyaWN0Jztcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vXG4vLyBDb25zdGFudHMgdGhhdCBwZXJ0YWluIHRvIENJIHByb2Nlc3Nlcy90ZXN0cyBvbmx5LiBObyBkZXBlbmRlbmNpZXMgb24gdnNjb2RlIVxuLy9cbmV4cG9ydHMuSVNfQVBQVkVZT1IgPSBwcm9jZXNzLmVudi5BUFBWRVlPUiA9PT0gJ3RydWUnO1xuZXhwb3J0cy5JU19UUkFWSVMgPSBwcm9jZXNzLmVudi5UUkFWSVMgPT09ICd0cnVlJztcbmV4cG9ydHMuSVNfVlNUUyA9IHByb2Nlc3MuZW52LlRGX0JVSUxEICE9PSB1bmRlZmluZWQ7XG5leHBvcnRzLklTX0NJX1NFUlZFUiA9IGV4cG9ydHMuSVNfVFJBVklTIHx8IGV4cG9ydHMuSVNfQVBQVkVZT1IgfHwgZXhwb3J0cy5JU19WU1RTO1xuLy8gQ29udHJvbCBKVW5pdC1zdHlsZSBvdXRwdXQgbG9nZ2luZyBmb3IgcmVwb3J0aW5nIHB1cnBvc2VzLlxubGV0IHJlcG9ydEp1bml0ID0gZmFsc2U7XG5pZiAoZXhwb3J0cy5JU19DSV9TRVJWRVIgJiYgcHJvY2Vzcy5lbnYuTU9DSEFfUkVQT1JURVJfSlVOSVQgIT09IHVuZGVmaW5lZCkge1xuICAgIHJlcG9ydEp1bml0ID0gcHJvY2Vzcy5lbnYuTU9DSEFfUkVQT1JURVJfSlVOSVQudG9Mb3dlckNhc2UoKSA9PT0gJ3RydWUnO1xufVxuZXhwb3J0cy5NT0NIQV9SRVBPUlRFUl9KVU5JVCA9IHJlcG9ydEp1bml0O1xuZXhwb3J0cy5NT0NIQV9DSV9SRVBPUlRGSUxFID0gZXhwb3J0cy5NT0NIQV9SRVBPUlRFUl9KVU5JVCAmJiBwcm9jZXNzLmVudi5NT0NIQV9DSV9SRVBPUlRGSUxFICE9PSB1bmRlZmluZWQgP1xuICAgIHByb2Nlc3MuZW52Lk1PQ0hBX0NJX1JFUE9SVEZJTEUgOiAnLi9qdW5pdC1vdXQueG1sJztcbmV4cG9ydHMuTU9DSEFfQ0lfUFJPUEVSVElFUyA9IGV4cG9ydHMuTU9DSEFfUkVQT1JURVJfSlVOSVQgJiYgcHJvY2Vzcy5lbnYuTU9DSEFfQ0lfUFJPUEVSVElFUyAhPT0gdW5kZWZpbmVkID9cbiAgICBwcm9jZXNzLmVudi5NT0NIQV9DSV9QUk9QRVJUSUVTIDogJyc7XG5leHBvcnRzLk1PQ0hBX0NJX1JFUE9SVEVSX0lEID0gZXhwb3J0cy5NT0NIQV9SRVBPUlRFUl9KVU5JVCAmJiBwcm9jZXNzLmVudi5NT0NIQV9DSV9SRVBPUlRFUl9JRCAhPT0gdW5kZWZpbmVkID9cbiAgICBwcm9jZXNzLmVudi5NT0NIQV9DSV9SRVBPUlRFUl9JRCA6ICdtb2NoYS1qdW5pdC1yZXBvcnRlcic7XG5leHBvcnRzLklTX0NJX1NFUlZFUl9URVNUX0RFQlVHR0VSID0gcHJvY2Vzcy5lbnYuSVNfQ0lfU0VSVkVSX1RFU1RfREVCVUdHRVIgPT09ICcxJztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNpQ29uc3RhbnRzLmpzLm1hcCJdfQ==