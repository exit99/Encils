"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/kazanz/projects/business/schooltext/frontend/components/GradeButton.js";

exports.default = function (_ref) {
  var answer = _ref.answer,
      value = _ref.value,
      handleClick = _ref.handleClick;
  return _react2.default.createElement("div", { className: value === 0 ? "col s1 offset-m2" : "col s1", __source: {
      fileName: _jsxFileName,
      lineNumber: 4
    }
  }, _react2.default.createElement("span", {
    style: { cursor: "pointer" },
    onClick: function onClick() {
      return handleClick(answer, value);
    },
    className: answer.grade == value ? "new badge orange accent-3" : "new badge grey",
    "data-badge-caption": "",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    }
  }, value));
};