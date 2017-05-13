'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _head = require('next/dist/lib/head.js');

var _head2 = _interopRequireDefault(_head);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/kazanz/projects/business/schooltext/frontend/components/Html.js';

exports.default = function (_ref) {
  var children = _ref.children;
  return _react2.default.createElement('div', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 4
    }
  }, _react2.default.createElement(_head2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    }
  }, _react2.default.createElement('meta', { charset: 'utf-8', __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    }
  }), _react2.default.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1.0', __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    }
  }), _react2.default.createElement('meta', { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8', __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }), _react2.default.createElement('title', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }, 'School Text App'), _react2.default.createElement('link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.1/css/materialize.min.css', __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }), _react2.default.createElement('link', { href: 'https://fonts.googleapis.com/icon?family=Material+Icons', rel: 'stylesheet', __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }), _react2.default.createElement('script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.bundle.min.js', __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }), _react2.default.createElement('style', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    }
  }, '\n        .nav-wrapper {\n          background: #F7971E;  /* fallback for old browsers */\n          background: -webkit-linear-gradient(to right, #FFD200, #F7971E);  /* Chrome 10-25, Safari 5.1-6 */\n          background: linear-gradient(to right, #FFD200, #F7971E); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */\n        }\n\n        .header {\n          color: white;\n        }\n\n        .btn-large, .btn {\n          background: #44adff;\n        }\n\n        .btn-large:hover, .btn:hover {\n          background: #9dd2fb;\n        }\n\n        .icon-block .material-icons, .tabs .tab a {\n          color: #f7971e;\n        }\n\n        .tabs .tab a:hover {\n          color: #FFD200;\n        }\n\n        .selected-item {\n          background: #F7971E;\n        }\n\n        input:not([type]):focus:not([readonly]), input[type=text]:focus:not([readonly]), input[type=password]:focus:not([readonly]), input[type=email]:focus:not([readonly]), input[type=url]:focus:not([readonly]), input[type=time]:focus:not([readonly]), input[type=date]:focus:not([readonly]), input[type=datetime]:focus:not([readonly]), input[type=datetime-local]:focus:not([readonly]), input[type=tel]:focus:not([readonly]), input[type=number]:focus:not([readonly]), input[type=search]:focus:not([readonly]), textarea.materialize-textarea:focus:not([readonly]) {\n          border-bottom: 1px solid #44adff;\n          box-shadow: 0 1px 0 0 #44adff;\n        }\n      ')), children);
};