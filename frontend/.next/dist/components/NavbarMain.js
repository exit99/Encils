'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _link = require('next/dist/lib/link.js');

var _link2 = _interopRequireDefault(_link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/kazanz/projects/business/schooltext/frontend/components/NavbarMain.js';


var NavbarMain = function (_Component) {
  (0, _inherits3.default)(NavbarMain, _Component);

  function NavbarMain() {
    (0, _classCallCheck3.default)(this, NavbarMain);

    return (0, _possibleConstructorReturn3.default)(this, (NavbarMain.__proto__ || (0, _getPrototypeOf2.default)(NavbarMain)).apply(this, arguments));
  }

  (0, _createClass3.default)(NavbarMain, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', { className: 'navbar-fixed', __source: {
          fileName: _jsxFileName,
          lineNumber: 7
        }
      }, _react2.default.createElement('nav', { className: 'nav-extended', __source: {
          fileName: _jsxFileName,
          lineNumber: 8
        }
      }, _react2.default.createElement('div', { className: 'nav-wrapper', __source: {
          fileName: _jsxFileName,
          lineNumber: 10
        }
      }, _react2.default.createElement('div', { className: 'container', __source: {
          fileName: _jsxFileName,
          lineNumber: 11
        }
      }, _react2.default.createElement('a', { href: '#', className: 'brand-logo', __source: {
          fileName: _jsxFileName,
          lineNumber: 12
        }
      }, 'Encils'), _react2.default.createElement('a', { href: '#', 'data-activates': 'mobile-demo', className: 'button-collapse', __source: {
          fileName: _jsxFileName,
          lineNumber: 13
        }
      }, _react2.default.createElement('i', { className: 'material-icons', __source: {
          fileName: _jsxFileName,
          lineNumber: 13
        }
      }, 'menu')), _react2.default.createElement('ul', { id: 'nav-mobile', className: 'right hide-on-med-and-down', __source: {
          fileName: _jsxFileName,
          lineNumber: 14
        }
      }, _react2.default.createElement('li', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 15
        }
      }, _react2.default.createElement(_link2.default, { href: '/', __source: {
          fileName: _jsxFileName,
          lineNumber: 15
        }
      }, _react2.default.createElement('a', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 15
        }
      }, 'Home'))), _react2.default.createElement('li', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 16
        }
      }, _react2.default.createElement(_link2.default, { href: '/login', __source: {
          fileName: _jsxFileName,
          lineNumber: 16
        }
      }, _react2.default.createElement('a', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 16
        }
      }, 'Login'))), _react2.default.createElement('li', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 17
        }
      }, _react2.default.createElement(_link2.default, { href: '/register', __source: {
          fileName: _jsxFileName,
          lineNumber: 17
        }
      }, _react2.default.createElement('a', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 17
        }
      }, 'Register')))), _react2.default.createElement('ul', { className: 'side-nav', id: 'mobile-demo', __source: {
          fileName: _jsxFileName,
          lineNumber: 19
        }
      }, _react2.default.createElement('li', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 20
        }
      }, _react2.default.createElement(_link2.default, { href: '/', __source: {
          fileName: _jsxFileName,
          lineNumber: 20
        }
      }, _react2.default.createElement('a', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 20
        }
      }, 'Home'))), _react2.default.createElement('li', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 21
        }
      }, _react2.default.createElement(_link2.default, { href: '/login', __source: {
          fileName: _jsxFileName,
          lineNumber: 21
        }
      }, _react2.default.createElement('a', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 21
        }
      }, 'Login'))), _react2.default.createElement('li', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        }
      }, _react2.default.createElement(_link2.default, { href: '/register', __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        }
      }, _react2.default.createElement('a', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        }
      }, 'Register'))))))));
    }
  }]);

  return NavbarMain;
}(_react.Component);

exports.default = NavbarMain;