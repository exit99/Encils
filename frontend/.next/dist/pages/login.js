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

var _main = require('../layouts/main');

var _main2 = _interopRequireDefault(_main);

var _CardForm = require('../forms/CardForm');

var _CardForm2 = _interopRequireDefault(_CardForm);

var _index = require('next/dist/lib/router/index.js');

var _index2 = _interopRequireDefault(_index);

var _reactCookie = require('react-cookie');

var _reactCookie2 = _interopRequireDefault(_reactCookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/kazanz/projects/business/schooltext/frontend/pages/login.js?entry';


var _class = function (_React$Component) {
  (0, _inherits3.default)(_class, _React$Component);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);

    return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
  }

  (0, _createClass3.default)(_class, [{
    key: 'onSuccess',
    value: function onSuccess(data) {
      _reactCookie2.default.save('token', "Token " + data.auth_token, { path: '/' });
      _index2.default.push("/classrooms");
    }
  }, {
    key: 'render',
    value: function render() {
      var inputs = [{ name: "email", type: "email" }, { name: "password", type: "password" }];

      return _react2.default.createElement(_main2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 20
        }
      }, _react2.default.createElement(_CardForm2.default, { title: "Login", inputs: inputs, endpoint: "/auth/login/", onSuccess: this.onSuccess, __source: {
          fileName: _jsxFileName,
          lineNumber: 21
        }
      }));
    }
  }]);

  return _class;
}(_react2.default.Component);

exports.default = _class;