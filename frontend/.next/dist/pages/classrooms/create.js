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

var _dashboard = require('../../layouts/dashboard');

var _dashboard2 = _interopRequireDefault(_dashboard);

var _ModelCardForm = require('../../forms/ModelCardForm');

var _ModelCardForm2 = _interopRequireDefault(_ModelCardForm);

var _index = require('next/dist/lib/router/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/kazanz/projects/business/schooltext/frontend/pages/classrooms/create.js?entry';


var _class = function (_React$Component) {
  (0, _inherits3.default)(_class, _React$Component);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);

    return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
  }

  (0, _createClass3.default)(_class, [{
    key: 'onSuccess',
    value: function onSuccess() {
      _index2.default.push("/classrooms");
    }
  }, {
    key: 'render',
    value: function render() {
      var inputs = [{ name: "name", type: "text" }, { name: "school", type: "text" }];
      var pk = this.props.url.query.pk;
      var endpoint = "/classrooms/";
      var title = "Classroom";

      return _react2.default.createElement(_dashboard2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 21
        }
      }, _react2.default.createElement(_ModelCardForm2.default, { title: title, pk: pk, inputs: inputs, endpoint: endpoint, onSuccess: this.onSuccess, __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        }
      }));
    }
  }]);

  return _class;
}(_react2.default.Component);

exports.default = _class;