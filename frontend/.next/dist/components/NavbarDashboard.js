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

var _reactCookie = require('react-cookie');

var _reactCookie2 = _interopRequireDefault(_reactCookie);

var _index = require('next/dist/lib/router/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/kazanz/projects/business/schooltext/frontend/components/NavbarDashboard.js';


var NavbarMain = function (_Component) {
  (0, _inherits3.default)(NavbarMain, _Component);

  function NavbarMain() {
    (0, _classCallCheck3.default)(this, NavbarMain);

    return (0, _possibleConstructorReturn3.default)(this, (NavbarMain.__proto__ || (0, _getPrototypeOf2.default)(NavbarMain)).apply(this, arguments));
  }

  (0, _createClass3.default)(NavbarMain, [{
    key: 'logout',
    value: function logout() {
      _reactCookie2.default.remove('token');
      _index2.default.push('/');
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', { className: 'navbar-fixed', __source: {
          fileName: _jsxFileName,
          lineNumber: 14
        }
      }, _react2.default.createElement('nav', { className: 'nav-extended', __source: {
          fileName: _jsxFileName,
          lineNumber: 15
        }
      }, _react2.default.createElement('div', { className: 'nav-wrapper light-blue darken-2', __source: {
          fileName: _jsxFileName,
          lineNumber: 17
        }
      }, _react2.default.createElement('div', { className: 'container', __source: {
          fileName: _jsxFileName,
          lineNumber: 18
        }
      }, _react2.default.createElement('a', { href: '#', className: 'brand-logo', __source: {
          fileName: _jsxFileName,
          lineNumber: 19
        }
      }, 'Encils'), _react2.default.createElement('a', { href: '#', 'data-activates': 'mobile-demo', className: 'button-collapse', __source: {
          fileName: _jsxFileName,
          lineNumber: 20
        }
      }, _react2.default.createElement('i', { className: 'material-icons', __source: {
          fileName: _jsxFileName,
          lineNumber: 20
        }
      }, 'menu')), _react2.default.createElement('ul', { id: 'nav-mobile', className: 'right hide-on-med-and-down', __source: {
          fileName: _jsxFileName,
          lineNumber: 21
        }
      }, _react2.default.createElement('li', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        }
      }, _react2.default.createElement('a', { onClick: this.logout, __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        }
      }, 'Logout'))), _react2.default.createElement('ul', { className: 'side-nav', id: 'mobile-demo', __source: {
          fileName: _jsxFileName,
          lineNumber: 24
        }
      }, _react2.default.createElement('li', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 25
        }
      }, _react2.default.createElement('a', { onClick: this.logout, __source: {
          fileName: _jsxFileName,
          lineNumber: 25
        }
      }, 'Logout'))))), _react2.default.createElement('div', { className: 'nav-content light-blue accent-3 center', __source: {
          fileName: _jsxFileName,
          lineNumber: 30
        }
      }, _react2.default.createElement('div', { className: 'container', __source: {
          fileName: _jsxFileName,
          lineNumber: 31
        }
      }, _react2.default.createElement('ul', { className: 'tabs tabs-transparent tabs-fixed-width', __source: {
          fileName: _jsxFileName,
          lineNumber: 32
        }
      }, _react2.default.createElement('li', { onClick: function onClick() {
          return _index2.default.push("/classrooms");
        }, className: 'tab', __source: {
          fileName: _jsxFileName,
          lineNumber: 33
        }
      }, _react2.default.createElement('a', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 33
        }
      }, 'Classrooms')), _react2.default.createElement('li', { onClick: function onClick() {
          return _index2.default.push("/assignments");
        }, className: 'tab', __source: {
          fileName: _jsxFileName,
          lineNumber: 34
        }
      }, _react2.default.createElement('a', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 34
        }
      }, 'Assignments')), _react2.default.createElement('li', { onClick: function onClick() {
          return _index2.default.push("/answers");
        }, className: 'tab', __source: {
          fileName: _jsxFileName,
          lineNumber: 35
        }
      }, _react2.default.createElement('a', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 35
        }
      }, 'Grade Answers')), _react2.default.createElement('li', { onClick: function onClick() {
          return _index2.default.push('/assignments/select');
        }, className: 'tab', __source: {
          fileName: _jsxFileName,
          lineNumber: 36
        }
      }, _react2.default.createElement('a', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 36
        }
      }, 'Start Assignment')))))));
    }
  }]);

  return NavbarMain;
}(_react.Component);

exports.default = NavbarMain;