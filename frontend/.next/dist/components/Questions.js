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

var _index = require('next/dist/lib/router/index.js');

var _index2 = _interopRequireDefault(_index);

var _reactTooltip = require('react-tooltip');

var _reactTooltip2 = _interopRequireDefault(_reactTooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/kazanz/projects/business/schooltext/frontend/components/Questions.js';


var _class = function (_React$Component) {
  (0, _inherits3.default)(_class, _React$Component);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);

    return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
  }

  (0, _createClass3.default)(_class, [{
    key: 'renderQuestion',
    value: function renderQuestion(question) {
      var _this2 = this;

      return _react2.default.createElement('tr', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 8
        }
      }, _react2.default.createElement('td', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 9
        }
      }, question.text), _react2.default.createElement('td', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 10
        }
      }, _react2.default.createElement('a', { style: { cursor: "pointer" }, onClick: function onClick() {
          return _this2.props.onDelete(question);
        }, 'data-tip': 'Delete', __source: {
          fileName: _jsxFileName,
          lineNumber: 11
        }
      }, _react2.default.createElement('i', { className: 'material-icons', __source: {
          fileName: _jsxFileName,
          lineNumber: 11
        }
      }, 'delete')), _react2.default.createElement(_reactTooltip2.default, { place: 'bottom', type: 'dark', effect: 'solid', wrapper: 'body', __source: {
          fileName: _jsxFileName,
          lineNumber: 12
        }
      })));
    }
  }, {
    key: 'render',
    value: function render() {
      var questions = this.props.questions;

      if (questions.length == 0) {
        return _react2.default.createElement('p', {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 21
          }
        }, 'No questions created');
      }

      return _react2.default.createElement('table', { className: 'bordered', __source: {
          fileName: _jsxFileName,
          lineNumber: 24
        }
      }, _react2.default.createElement('thead', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 25
        }
      }, _react2.default.createElement('tr', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 26
        }
      }, _react2.default.createElement('th', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 27
        }
      }, 'Question'), _react2.default.createElement('th', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 28
        }
      }))), _react2.default.createElement('tbody', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 31
        }
      }, questions.map(this.renderQuestion.bind(this))));
    }
  }]);

  return _class;
}(_react2.default.Component);

exports.default = _class;