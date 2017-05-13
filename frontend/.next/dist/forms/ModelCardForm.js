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

var _jsxFileName = '/Users/kazanz/projects/business/schooltext/frontend/forms/ModelCardForm.js';


var _class = function (_React$Component) {
  (0, _inherits3.default)(_class, _React$Component);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);

    return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
  }

  (0, _createClass3.default)(_class, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      this.state = { errors: {}, instance: null };

      var _props = this.props,
          pk = _props.pk,
          endpoint = _props.endpoint;

      if (pk) {
        (0, _rest.request)("GET", this.getEndpoint(), null, function (instance) {
          return _this2.setState({ instance: instance });
        }, null);
      }
    }
  }, {
    key: 'getEndpoint',
    value: function getEndpoint() {
      var _props2 = this.props,
          pk = _props2.pk,
          endpoint = _props2.endpoint;

      return pk ? '' + endpoint + pk + '/' : endpoint;
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(data) {
      var _this3 = this;

      var _props3 = this.props,
          endpoint = _props3.endpoint,
          onSuccess = _props3.onSuccess,
          pk = _props3.pk;

      var method = pk ? "PATCH" : "POST";
      (0, _rest.request)(method, this.getEndpoint(), data, onSuccess, function (errors) {
        _this3.setState({ errors: errors });
      });
    }
  }, {
    key: 'renderError',
    value: function renderError(field) {
      var errors = this.state.errors;

      return errors ? _react2.default.createElement('span', { style: { color: 'red' }, __source: {
          fileName: _jsxFileName,
          lineNumber: 30
        }
      }, errors[field]) : null;
    }
  }, {
    key: 'renderInput',
    value: function renderInput(_ref) {
      var name = _ref.name,
          type = _ref.type,
          value = _ref.value,
          label = _ref.label;
      var instance = this.state.instance;

      var inputValue = value ? value : instance ? instance[name] : undefined;

      return _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 38
        }
      }, this.renderError(name), _react2.default.createElement(_formsyReactComponents.Input, { type: type, name: name, label: (0, _capitalize2.default)(label ? label : name), value: inputValue, __source: {
          fileName: _jsxFileName,
          lineNumber: 40
        }
      }));
    }
  }, {
    key: 'renderTitle',
    value: function renderTitle(title) {
      return this.props.pk ? 'Edit ' + title : 'Create ' + title;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props,
          title = _props4.title,
          inputs = _props4.inputs;

      return _react2.default.createElement('div', { className: 'container', __source: {
          fileName: _jsxFileName,
          lineNumber: 53
        }
      }, _react2.default.createElement('div', { className: 'row', __source: {
          fileName: _jsxFileName,
          lineNumber: 54
        }
      }, _react2.default.createElement('div', { className: 'col sm12 m8 offset-m2', __source: {
          fileName: _jsxFileName,
          lineNumber: 55
        }
      }, _react2.default.createElement('div', { className: 'card grey lighten-4', __source: {
          fileName: _jsxFileName,
          lineNumber: 56
        }
      }, _react2.default.createElement('div', { className: 'card-content', __source: {
          fileName: _jsxFileName,
          lineNumber: 57
        }
      }, _react2.default.createElement(_formsyReactComponents.Form, { onSubmit: this.handleSubmit.bind(this), __source: {
          fileName: _jsxFileName,
          lineNumber: 58
        }
      }, _react2.default.createElement('span', { className: 'card-title', __source: {
          fileName: _jsxFileName,
          lineNumber: 59
        }
      }, this.renderTitle(title)), inputs.map(this.renderInput.bind(this)), this.renderError('non_field_errors'), _react2.default.createElement('div', { className: 'card-action', __source: {
          fileName: _jsxFileName,
          lineNumber: 64
        }
      }, _react2.default.createElement('center', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 65
        }
      }, _react2.default.createElement('button', { type: 'submit', className: 'btn waves-effect waves-light', __source: {
          fileName: _jsxFileName,
          lineNumber: 66
        }
      }, 'Submit')))))))));
    }
  }]);

  return _class;
}(_react2.default.Component);

exports.default = _class;