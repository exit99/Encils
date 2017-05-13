'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _NavbarMain = require('../components/NavbarMain');

var _NavbarMain2 = _interopRequireDefault(_NavbarMain);

var _Html = require('../components/Html');

var _Html2 = _interopRequireDefault(_Html);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/kazanz/projects/business/schooltext/frontend/layouts/main.js';

exports.default = function (_ref) {
  var children = _ref.children;
  return _react2.default.createElement(_Html2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    }
  }, _react2.default.createElement(_NavbarMain2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    }
  }), children);
};