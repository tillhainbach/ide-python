// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

const React = require("react");

require("./cellButton.css");

class CellButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const classNames = `cell-button cell-button-${this.props.theme}`;
    const innerFilter = this.props.disabled ? 'cell-button-inner-disabled-filter' : '';
    return React.createElement("button", {
      role: 'button',
      "aria-pressed": 'false',
      disabled: this.props.disabled,
      title: this.props.tooltip,
      className: classNames,
      onClick: this.props.onClick
    }, React.createElement("div", {
      className: innerFilter
    }, React.createElement("div", {
      className: 'cell-button-child'
    }, this.props.children)));
  }

}

exports.CellButton = CellButton;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlbGxCdXR0b24uanMiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJSZWFjdCIsInJlcXVpcmUiLCJDZWxsQnV0dG9uIiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsInJlbmRlciIsImNsYXNzTmFtZXMiLCJ0aGVtZSIsImlubmVyRmlsdGVyIiwiZGlzYWJsZWQiLCJjcmVhdGVFbGVtZW50Iiwicm9sZSIsInRpdGxlIiwidG9vbHRpcCIsImNsYXNzTmFtZSIsIm9uQ2xpY2siLCJjaGlsZHJlbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBOztBQUNBQSxNQUFNLENBQUNDLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQUVDLEVBQUFBLEtBQUssRUFBRTtBQUFULENBQTdDOztBQUNBLE1BQU1DLEtBQUssR0FBR0MsT0FBTyxDQUFDLE9BQUQsQ0FBckI7O0FBQ0FBLE9BQU8sQ0FBQyxrQkFBRCxDQUFQOztBQUNBLE1BQU1DLFVBQU4sU0FBeUJGLEtBQUssQ0FBQ0csU0FBL0IsQ0FBeUM7QUFDckNDLEVBQUFBLFdBQVcsQ0FBQ0MsS0FBRCxFQUFRO0FBQ2YsVUFBTUEsS0FBTjtBQUNIOztBQUNEQyxFQUFBQSxNQUFNLEdBQUc7QUFDTCxVQUFNQyxVQUFVLEdBQUksMkJBQTBCLEtBQUtGLEtBQUwsQ0FBV0csS0FBTSxFQUEvRDtBQUNBLFVBQU1DLFdBQVcsR0FBRyxLQUFLSixLQUFMLENBQVdLLFFBQVgsR0FBc0IsbUNBQXRCLEdBQTRELEVBQWhGO0FBQ0EsV0FBUVYsS0FBSyxDQUFDVyxhQUFOLENBQW9CLFFBQXBCLEVBQThCO0FBQUVDLE1BQUFBLElBQUksRUFBRSxRQUFSO0FBQWtCLHNCQUFnQixPQUFsQztBQUEyQ0YsTUFBQUEsUUFBUSxFQUFFLEtBQUtMLEtBQUwsQ0FBV0ssUUFBaEU7QUFBMEVHLE1BQUFBLEtBQUssRUFBRSxLQUFLUixLQUFMLENBQVdTLE9BQTVGO0FBQXFHQyxNQUFBQSxTQUFTLEVBQUVSLFVBQWhIO0FBQTRIUyxNQUFBQSxPQUFPLEVBQUUsS0FBS1gsS0FBTCxDQUFXVztBQUFoSixLQUE5QixFQUNKaEIsS0FBSyxDQUFDVyxhQUFOLENBQW9CLEtBQXBCLEVBQTJCO0FBQUVJLE1BQUFBLFNBQVMsRUFBRU47QUFBYixLQUEzQixFQUNJVCxLQUFLLENBQUNXLGFBQU4sQ0FBb0IsS0FBcEIsRUFBMkI7QUFBRUksTUFBQUEsU0FBUyxFQUFFO0FBQWIsS0FBM0IsRUFBK0QsS0FBS1YsS0FBTCxDQUFXWSxRQUExRSxDQURKLENBREksQ0FBUjtBQUdIOztBQVZvQzs7QUFZekNuQixPQUFPLENBQUNJLFVBQVIsR0FBcUJBLFVBQXJCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuJ3VzZSBzdHJpY3QnO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZShcInJlYWN0XCIpO1xyXG5yZXF1aXJlKFwiLi9jZWxsQnV0dG9uLmNzc1wiKTtcclxuY2xhc3MgQ2VsbEJ1dHRvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCBjbGFzc05hbWVzID0gYGNlbGwtYnV0dG9uIGNlbGwtYnV0dG9uLSR7dGhpcy5wcm9wcy50aGVtZX1gO1xyXG4gICAgICAgIGNvbnN0IGlubmVyRmlsdGVyID0gdGhpcy5wcm9wcy5kaXNhYmxlZCA/ICdjZWxsLWJ1dHRvbi1pbm5lci1kaXNhYmxlZC1maWx0ZXInIDogJyc7XHJcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHsgcm9sZTogJ2J1dHRvbicsIFwiYXJpYS1wcmVzc2VkXCI6ICdmYWxzZScsIGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkLCB0aXRsZTogdGhpcy5wcm9wcy50b29sdGlwLCBjbGFzc05hbWU6IGNsYXNzTmFtZXMsIG9uQ2xpY2s6IHRoaXMucHJvcHMub25DbGljayB9LFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBpbm5lckZpbHRlciB9LFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogJ2NlbGwtYnV0dG9uLWNoaWxkJyB9LCB0aGlzLnByb3BzLmNoaWxkcmVuKSkpKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLkNlbGxCdXR0b24gPSBDZWxsQnV0dG9uO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1jZWxsQnV0dG9uLmpzLm1hcCJdfQ==