"use strict"; // Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

Object.defineProperty(exports, "__esModule", {
  value: true
});

const chai_1 = require("chai");

const iconv_lite_1 = require("iconv-lite");

const decoder_1 = require("../../../client/common/process/decoder");

const initialize_1 = require("./../../initialize");

suite('Decoder', () => {
  setup(initialize_1.initialize);
  teardown(initialize_1.initialize);
  test('Test decoding utf8 strings', () => {
    const value = 'Sample input string Сделать это';
    const buffer = iconv_lite_1.encode(value, 'utf8');
    const decoder = new decoder_1.BufferDecoder();
    const decodedValue = decoder.decode([buffer]);
    chai_1.expect(decodedValue).equal(value, 'Decoded string is incorrect');
  });
  test('Test decoding cp932 strings', function () {
    if (!iconv_lite_1.encodingExists('cp866')) {
      // tslint:disable-next-line:no-invalid-this
      this.skip();
    }

    const value = 'Sample input string Сделать это';
    const buffer = iconv_lite_1.encode(value, 'cp866');
    const decoder = new decoder_1.BufferDecoder();
    let decodedValue = decoder.decode([buffer]);
    chai_1.expect(decodedValue).not.equal(value, 'Decoded string is the same');
    decodedValue = decoder.decode([buffer], 'cp866');
    chai_1.expect(decodedValue).equal(value, 'Decoded string is incorrect');
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlY29kZXIudGVzdC5qcyJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsImNoYWlfMSIsInJlcXVpcmUiLCJpY29udl9saXRlXzEiLCJkZWNvZGVyXzEiLCJpbml0aWFsaXplXzEiLCJzdWl0ZSIsInNldHVwIiwiaW5pdGlhbGl6ZSIsInRlYXJkb3duIiwidGVzdCIsImJ1ZmZlciIsImVuY29kZSIsImRlY29kZXIiLCJCdWZmZXJEZWNvZGVyIiwiZGVjb2RlZFZhbHVlIiwiZGVjb2RlIiwiZXhwZWN0IiwiZXF1YWwiLCJlbmNvZGluZ0V4aXN0cyIsInNraXAiLCJub3QiXSwibWFwcGluZ3MiOiJBQUFBLGEsQ0FDQTtBQUNBOztBQUNBQSxNQUFNLENBQUNDLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQUVDLEVBQUFBLEtBQUssRUFBRTtBQUFULENBQTdDOztBQUNBLE1BQU1DLE1BQU0sR0FBR0MsT0FBTyxDQUFDLE1BQUQsQ0FBdEI7O0FBQ0EsTUFBTUMsWUFBWSxHQUFHRCxPQUFPLENBQUMsWUFBRCxDQUE1Qjs7QUFDQSxNQUFNRSxTQUFTLEdBQUdGLE9BQU8sQ0FBQyx3Q0FBRCxDQUF6Qjs7QUFDQSxNQUFNRyxZQUFZLEdBQUdILE9BQU8sQ0FBQyxvQkFBRCxDQUE1Qjs7QUFDQUksS0FBSyxDQUFDLFNBQUQsRUFBWSxNQUFNO0FBQ25CQyxFQUFBQSxLQUFLLENBQUNGLFlBQVksQ0FBQ0csVUFBZCxDQUFMO0FBQ0FDLEVBQUFBLFFBQVEsQ0FBQ0osWUFBWSxDQUFDRyxVQUFkLENBQVI7QUFDQUUsRUFBQUEsSUFBSSxDQUFDLDRCQUFELEVBQStCLE1BQU07QUFDckMsVUFBTVYsS0FBSyxHQUFHLGlDQUFkO0FBQ0EsVUFBTVcsTUFBTSxHQUFHUixZQUFZLENBQUNTLE1BQWIsQ0FBb0JaLEtBQXBCLEVBQTJCLE1BQTNCLENBQWY7QUFDQSxVQUFNYSxPQUFPLEdBQUcsSUFBSVQsU0FBUyxDQUFDVSxhQUFkLEVBQWhCO0FBQ0EsVUFBTUMsWUFBWSxHQUFHRixPQUFPLENBQUNHLE1BQVIsQ0FBZSxDQUFDTCxNQUFELENBQWYsQ0FBckI7QUFDQVYsSUFBQUEsTUFBTSxDQUFDZ0IsTUFBUCxDQUFjRixZQUFkLEVBQTRCRyxLQUE1QixDQUFrQ2xCLEtBQWxDLEVBQXlDLDZCQUF6QztBQUNILEdBTkcsQ0FBSjtBQU9BVSxFQUFBQSxJQUFJLENBQUMsNkJBQUQsRUFBZ0MsWUFBWTtBQUM1QyxRQUFJLENBQUNQLFlBQVksQ0FBQ2dCLGNBQWIsQ0FBNEIsT0FBNUIsQ0FBTCxFQUEyQztBQUN2QztBQUNBLFdBQUtDLElBQUw7QUFDSDs7QUFDRCxVQUFNcEIsS0FBSyxHQUFHLGlDQUFkO0FBQ0EsVUFBTVcsTUFBTSxHQUFHUixZQUFZLENBQUNTLE1BQWIsQ0FBb0JaLEtBQXBCLEVBQTJCLE9BQTNCLENBQWY7QUFDQSxVQUFNYSxPQUFPLEdBQUcsSUFBSVQsU0FBUyxDQUFDVSxhQUFkLEVBQWhCO0FBQ0EsUUFBSUMsWUFBWSxHQUFHRixPQUFPLENBQUNHLE1BQVIsQ0FBZSxDQUFDTCxNQUFELENBQWYsQ0FBbkI7QUFDQVYsSUFBQUEsTUFBTSxDQUFDZ0IsTUFBUCxDQUFjRixZQUFkLEVBQTRCTSxHQUE1QixDQUFnQ0gsS0FBaEMsQ0FBc0NsQixLQUF0QyxFQUE2Qyw0QkFBN0M7QUFDQWUsSUFBQUEsWUFBWSxHQUFHRixPQUFPLENBQUNHLE1BQVIsQ0FBZSxDQUFDTCxNQUFELENBQWYsRUFBeUIsT0FBekIsQ0FBZjtBQUNBVixJQUFBQSxNQUFNLENBQUNnQixNQUFQLENBQWNGLFlBQWQsRUFBNEJHLEtBQTVCLENBQWtDbEIsS0FBbEMsRUFBeUMsNkJBQXpDO0FBQ0gsR0FaRyxDQUFKO0FBYUgsQ0F2QkksQ0FBTCIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG4vLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IGNoYWlfMSA9IHJlcXVpcmUoXCJjaGFpXCIpO1xyXG5jb25zdCBpY29udl9saXRlXzEgPSByZXF1aXJlKFwiaWNvbnYtbGl0ZVwiKTtcclxuY29uc3QgZGVjb2Rlcl8xID0gcmVxdWlyZShcIi4uLy4uLy4uL2NsaWVudC9jb21tb24vcHJvY2Vzcy9kZWNvZGVyXCIpO1xyXG5jb25zdCBpbml0aWFsaXplXzEgPSByZXF1aXJlKFwiLi8uLi8uLi9pbml0aWFsaXplXCIpO1xyXG5zdWl0ZSgnRGVjb2RlcicsICgpID0+IHtcclxuICAgIHNldHVwKGluaXRpYWxpemVfMS5pbml0aWFsaXplKTtcclxuICAgIHRlYXJkb3duKGluaXRpYWxpemVfMS5pbml0aWFsaXplKTtcclxuICAgIHRlc3QoJ1Rlc3QgZGVjb2RpbmcgdXRmOCBzdHJpbmdzJywgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gJ1NhbXBsZSBpbnB1dCBzdHJpbmcg0KHQtNC10LvQsNGC0Ywg0Y3RgtC+JztcclxuICAgICAgICBjb25zdCBidWZmZXIgPSBpY29udl9saXRlXzEuZW5jb2RlKHZhbHVlLCAndXRmOCcpO1xyXG4gICAgICAgIGNvbnN0IGRlY29kZXIgPSBuZXcgZGVjb2Rlcl8xLkJ1ZmZlckRlY29kZXIoKTtcclxuICAgICAgICBjb25zdCBkZWNvZGVkVmFsdWUgPSBkZWNvZGVyLmRlY29kZShbYnVmZmVyXSk7XHJcbiAgICAgICAgY2hhaV8xLmV4cGVjdChkZWNvZGVkVmFsdWUpLmVxdWFsKHZhbHVlLCAnRGVjb2RlZCBzdHJpbmcgaXMgaW5jb3JyZWN0Jyk7XHJcbiAgICB9KTtcclxuICAgIHRlc3QoJ1Rlc3QgZGVjb2RpbmcgY3A5MzIgc3RyaW5ncycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIWljb252X2xpdGVfMS5lbmNvZGluZ0V4aXN0cygnY3A4NjYnKSkge1xyXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW52YWxpZC10aGlzXHJcbiAgICAgICAgICAgIHRoaXMuc2tpcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB2YWx1ZSA9ICdTYW1wbGUgaW5wdXQgc3RyaW5nINCh0LTQtdC70LDRgtGMINGN0YLQvic7XHJcbiAgICAgICAgY29uc3QgYnVmZmVyID0gaWNvbnZfbGl0ZV8xLmVuY29kZSh2YWx1ZSwgJ2NwODY2Jyk7XHJcbiAgICAgICAgY29uc3QgZGVjb2RlciA9IG5ldyBkZWNvZGVyXzEuQnVmZmVyRGVjb2RlcigpO1xyXG4gICAgICAgIGxldCBkZWNvZGVkVmFsdWUgPSBkZWNvZGVyLmRlY29kZShbYnVmZmVyXSk7XHJcbiAgICAgICAgY2hhaV8xLmV4cGVjdChkZWNvZGVkVmFsdWUpLm5vdC5lcXVhbCh2YWx1ZSwgJ0RlY29kZWQgc3RyaW5nIGlzIHRoZSBzYW1lJyk7XHJcbiAgICAgICAgZGVjb2RlZFZhbHVlID0gZGVjb2Rlci5kZWNvZGUoW2J1ZmZlcl0sICdjcDg2NicpO1xyXG4gICAgICAgIGNoYWlfMS5leHBlY3QoZGVjb2RlZFZhbHVlKS5lcXVhbCh2YWx1ZSwgJ0RlY29kZWQgc3RyaW5nIGlzIGluY29ycmVjdCcpO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kZWNvZGVyLnRlc3QuanMubWFwIl19