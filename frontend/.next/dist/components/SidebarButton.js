"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/kazanz/projects/business/schooltext/frontend/components/SidebarButton.js";

exports.default = function (_ref) {
    var text = _ref.text,
        active = _ref.active,
        handleClick = _ref.handleClick;
    return _react2.default.createElement("div", { className: active ? "chip light-blue darken-2 white-text" : "chip", style: { cursor: 'pointer' }, onClick: handleClick, __source: {
            fileName: _jsxFileName,
            lineNumber: 4
        }
    }, text);
};