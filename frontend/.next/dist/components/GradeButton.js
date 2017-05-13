"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/kazanz/projects/business/schooltext/frontend/components/GradeButton.js";


var selected = {
  cursor: "pointer",
  "background-color": "#F7971E",
  background: "#F7971E"
};

var not_selected = {
  cursor: "pointer",
  "background-color": "#9e9e9e",
  background: "#9e9e9e"
};

exports.default = function (_ref) {
  var answer = _ref.answer,
      value = _ref.value,
      handleClick = _ref.handleClick;
  return _react2.default.createElement("div", { className: value === 0 ? "col s1 offset-m2" : "col s1", __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    }
  }, _react2.default.createElement("span", {
    style: answer.grade == value ? selected : not_selected,
    onClick: function onClick() {
      return handleClick(answer, value);
    },
    className: "new badge selected",
    "data-badge-caption": "",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    }
  }, value));
};