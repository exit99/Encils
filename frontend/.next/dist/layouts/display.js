'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _head = require('next/dist/lib/head.js');

var _head2 = _interopRequireDefault(_head);

var _Html = require('../components/Html');

var _Html2 = _interopRequireDefault(_Html);

var _Spinner = require('../components/Spinner');

var _Spinner2 = _interopRequireDefault(_Spinner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/kazanz/projects/business/schooltext/frontend/layouts/display.js';

exports.default = function (_ref) {
  var children = _ref.children,
      text = _ref.text,
      showSpinner = _ref.showSpinner;
  return _react2.default.createElement(_Html2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    }
  }, _react2.default.createElement(_head2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }, _react2.default.createElement('style', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }, '\n        body { \n          background-image: url(\'/static/hot-air-balloon.jpeg\');\n          background-size: cover;\n        }\n      ')), _react2.default.createElement('div', { className: 'grey lighten-2 z-depth-2', style: {
      "position": "fixed",
      "top": "0",
      "width": "100%",
      "opacity": ".2",
      "height": "4.5em"
    }, __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    }
  }), _react2.default.createElement('center', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    }
  }, _react2.default.createElement('h4', { style: { color: "black" }, __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    }
  }, _react2.default.createElement('b', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    }
  }, showSpinner ? "Loading..." : text))), showSpinner ? _react2.default.createElement('center', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    }
  }, _react2.default.createElement('br', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    }
  }), _react2.default.createElement('br', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    }
  }), _react2.default.createElement(_Spinner2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    }
  })) : children);
};