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

var _formsyReactComponents = require('formsy-react-components');

var _capitalize = require('lodash/capitalize');

var _capitalize2 = _interopRequireDefault(_capitalize);

var _rest = require('./../rest');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/kazanz/projects/business/schooltext/frontend/forms/CardForm.js';


var _class = function (_React$Component) {
  (0, _inherits3.default)(_class, _React$Component);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);

    return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
  }

  (0, _createClass3.default)(_class, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.state = { errors: {} };
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(data) {
      var _this2 = this;

      var _props = this.props,
          endpoint = _props.endpoint,
          onSuccess = _props.onSuccess;

      (0, _rest.request)("POST", endpoint, data, onSuccess, function (errors) {
        _this2.setState({ errors: errors });
      });
    }
  }, {
    key: 'renderError',
    value: function renderError(field) {
      var errors = this.state.errors;

      return errors ? _react2.default.createElement('span', { style: { color: 'red' }, __source: {
          fileName: _jsxFileName,
          lineNumber: 18
        }
      }, errors[field]) : null;
    }
  }, {
    key: 'renderInput',
    value: function renderInput(data) {
      return _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 23
        }
      }, this.renderError(data.name), _react2.default.createElement(_formsyReactComponents.Input, { type: data.type, name: data.name, label: (0, _capitalize2.default)(data.name), __source: {
          fileName: _jsxFileName,
          lineNumber: 25
        }
      }));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          title = _props2.title,
          inputs = _props2.inputs;

      return _react2.default.createElement('div', { className: 'container', __source: {
          fileName: _jsxFileName,
          lineNumber: 33
        }
      }, _react2.default.createElement('div', { className: 'row', __source: {
          fileName: _jsxFileName,
          lineNumber: 34
        }
      }, _react2.default.createElement('div', { className: 'col sm12 m8 offset-m2', __source: {
          fileName: _jsxFileName,
          lineNumber: 35
        }
      }, _react2.default.createElement('div', { className: 'card grey lighten-4', __source: {
          fileName: _jsxFileName,
          lineNumber: 36
        }
      }, _react2.default.createElement('div', { className: 'card-content', __source: {
          fileName: _jsxFileName,
          lineNumber: 37
        }
      }, _react2.default.createElement(_formsyReactComponents.Form, { onSubmit: this.handleSubmit.bind(this), __source: {
          fileName: _jsxFileName,
          lineNumber: 38
        }
      }, _react2.default.createElement('span', { className: 'card-title', __source: {
          fileName: _jsxFileName,
          lineNumber: 39
        }
      }, title), inputs.map(this.renderInput.bind(this)), this.renderError('non_field_errors'), _react2.default.createElement('div', { className: 'card-action', __source: {
          fileName: _jsxFileName,
          lineNumber: 44
        }
      }, _react2.default.createElement('center', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 45
        }
      }, _react2.default.createElement('button', { type: 'submit', className: 'btn waves-effect waves-light', __source: {
          fileName: _jsxFileName,
          lineNumber: 46
        }
      }, 'Submit')))))))));
    }
  }]);

  return _class;
}(_react2.default.Component);

exports.default = _class;