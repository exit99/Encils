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

var _filter = require('lodash/filter');

var _filter2 = _interopRequireDefault(_filter);

var _GradeButton = require('./GradeButton');

var _GradeButton2 = _interopRequireDefault(_GradeButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/kazanz/projects/business/schooltext/frontend/components/Answers.js';


var _class = function (_React$Component) {
  (0, _inherits3.default)(_class, _React$Component);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);

    return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
  }

  (0, _createClass3.default)(_class, [{
    key: 'renderQuestion',
    value: function renderQuestion(question) {
      var answers = (0, _filter2.default)(this.props.answers, function (answer) {
        return answer.question === question.pk;
      });

      return _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 11
        }
      }, _react2.default.createElement('p', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 12
        }
      }, _react2.default.createElement('b', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 12
        }
      }, question.text)), _react2.default.createElement('hr', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 13
        }
      }), answers.map(this.renderAnswer.bind(this)));
    }
  }, {
    key: 'renderAnswer',
    value: function renderAnswer(answer) {
      var onGradeChange = this.props.onGradeChange;

      return _react2.default.createElement('div', { className: 'row', __source: {
          fileName: _jsxFileName,
          lineNumber: 23
        }
      }, _react2.default.createElement('div', { className: 'col s12', __source: {
          fileName: _jsxFileName,
          lineNumber: 24
        }
      }, _react2.default.createElement('div', { className: 'card grey lighten-3', __source: {
          fileName: _jsxFileName,
          lineNumber: 25
        }
      }, _react2.default.createElement('div', { className: 'card-content', __source: {
          fileName: _jsxFileName,
          lineNumber: 26
        }
      }, _react2.default.createElement('div', { className: 'row', style: { "margin-bottom": "0px" }, __source: {
          fileName: _jsxFileName,
          lineNumber: 27
        }
      }, _react2.default.createElement('i', { className: 'col s12 m6', __source: {
          fileName: _jsxFileName,
          lineNumber: 28
        }
      }, answer.student.name), [0, 1, 2, 3].map(function (value) {
        return _react2.default.createElement(_GradeButton2.default, { answer: answer, value: value, handleClick: onGradeChange, __source: {
            fileName: _jsxFileName,
            lineNumber: 29
          }
        });
      })), _react2.default.createElement('hr', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 31
        }
      }), _react2.default.createElement('p', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 32
        }
      }, answer.text)))));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          questions = _props.questions,
          answers = _props.answers;

      if (questions.length == 0) {
        return _react2.default.createElement('p', {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 43
          }
        }, 'No questions yet');
      }
      if (answers.length == 0) {
        return _react2.default.createElement('p', {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 44
          }
        }, 'No answers yet');
      }

      return _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 46
        }
      }, questions.map(this.renderQuestion.bind(this)));
    }
  }]);

  return _class;
}(_react2.default.Component);

exports.default = _class;