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

var _dashboard = require('../layouts/dashboard');

var _dashboard2 = _interopRequireDefault(_dashboard);

var _SidebarButton = require('../components/SidebarButton');

var _SidebarButton2 = _interopRequireDefault(_SidebarButton);

var _Questions = require('../components/Questions');

var _Questions2 = _interopRequireDefault(_Questions);

var _rest = require('../rest');

var _filter = require('lodash/filter');

var _filter2 = _interopRequireDefault(_filter);

var _reactTooltip = require('react-tooltip');

var _reactTooltip2 = _interopRequireDefault(_reactTooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/kazanz/projects/business/schooltext/frontend/pages/assignments.js?entry';


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

      this.state = {
        assignments: [],
        selectedAssignment: {},
        questions: []
      };

      (0, _rest.request)("GET", "/assignments/", null, function (data) {
        if (data) {
          _this2.setState({ assignments: data });
          var pk = _this2.props.url.query.pk;
          var assignment = pk ? (0, _filter2.default)(data, function (assignment) {
            return assignment.pk == pk;
          })[0] : data[0];
          _this2.changeAssignment(assignment)();
        }
      });
    }
  }, {
    key: 'changeAssignment',
    value: function changeAssignment(assignment) {
      var _this3 = this;

      return function () {
        (0, _rest.request)("GET", "/questions/?assignment=" + assignment.pk.toString(), null, function (data) {
          _this3.setState({ selectedAssignment: assignment, questions: data });
        });
      };
    }
  }, {
    key: 'renderAssignmentButton',
    value: function renderAssignmentButton(assignment) {
      var active = assignment.pk == this.state.selectedAssignment.pk;
      return _react2.default.createElement(_SidebarButton2.default, { text: assignment.name, active: active, handleClick: this.changeAssignment(assignment).bind(this), __source: {
          fileName: _jsxFileName,
          lineNumber: 38
        }
      });
    }
  }, {
    key: 'deleteAssignment',
    value: function deleteAssignment(assignment) {
      var _this4 = this;

      (0, _rest.request)("DELETE", '/assignments/' + assignment.pk + '/', null, function (data) {
        var assignments = (0, _filter2.default)(_this4.state.assignments, function (obj) {
          return obj.pk != assignment.pk;
        });
        _this4.setState({ assignments: assignments });
        if (assignments.length > 0) {
          _this4.changeAssignment(assignments[0])();
        }
      }, null);
    }
  }, {
    key: 'deleteQuestion',
    value: function deleteQuestion(question) {
      var _this5 = this;

      (0, _rest.request)("DELETE", '/questions/' + question.pk + '/', null, function (data) {
        var questions = (0, _filter2.default)(_this5.state.questions, function (obj) {
          return obj.pk != question.pk;
        });
        _this5.setState({ questions: questions });
      }, null);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      var _state = this.state,
          assignments = _state.assignments,
          selectedAssignment = _state.selectedAssignment,
          questions = _state.questions;

      return _react2.default.createElement(_dashboard2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 67
        }
      }, _react2.default.createElement('div', { className: 'row', __source: {
          fileName: _jsxFileName,
          lineNumber: 68
        }
      }, _react2.default.createElement('div', { className: 'col s12 m3', __source: {
          fileName: _jsxFileName,
          lineNumber: 69
        }
      }, _react2.default.createElement('div', { className: 'card grey lighten-4', __source: {
          fileName: _jsxFileName,
          lineNumber: 70
        }
      }, _react2.default.createElement('div', { className: 'card-content', __source: {
          fileName: _jsxFileName,
          lineNumber: 71
        }
      }, _react2.default.createElement('span', { className: 'card-title', __source: {
          fileName: _jsxFileName,
          lineNumber: 72
        }
      }, 'Assignments'), _react2.default.createElement('br', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 73
        }
      }), _react2.default.createElement('center', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 74
        }
      }, _react2.default.createElement('a', { onClick: function onClick() {
          return _index2.default.push('/assignments/create');
        }, className: 'btn waves-effect waves-light ', style: { width: "100%", fontSize: "12px" }, __source: {
          fileName: _jsxFileName,
          lineNumber: 74
        }
      }, 'New Assignment'))), _react2.default.createElement('div', { className: 'card-action', __source: {
          fileName: _jsxFileName,
          lineNumber: 76
        }
      }, assignments.map(this.renderAssignmentButton.bind(this))))), assignments.length > 0 ? _react2.default.createElement('div', { className: 'col s12 m9', __source: {
          fileName: _jsxFileName,
          lineNumber: 83
        }
      }, _react2.default.createElement('div', { className: 'card grey lighten-4', __source: {
          fileName: _jsxFileName,
          lineNumber: 84
        }
      }, _react2.default.createElement('div', { className: 'card-content', __source: {
          fileName: _jsxFileName,
          lineNumber: 85
        }
      }, _react2.default.createElement('div', { className: 'row', __source: {
          fileName: _jsxFileName,
          lineNumber: 87
        }
      }, _react2.default.createElement('div', { className: 'col s12 m6', __source: {
          fileName: _jsxFileName,
          lineNumber: 88
        }
      }, _react2.default.createElement('span', { className: 'card-title', __source: {
          fileName: _jsxFileName,
          lineNumber: 89
        }
      }, selectedAssignment.name)), _react2.default.createElement('div', { className: 'col s12 m6', __source: {
          fileName: _jsxFileName,
          lineNumber: 91
        }
      }, _react2.default.createElement('div', { className: 'row', __source: {
          fileName: _jsxFileName,
          lineNumber: 92
        }
      }, _react2.default.createElement('div', { className: 'col s2 offset-s6', __source: {
          fileName: _jsxFileName,
          lineNumber: 93
        }
      }, _react2.default.createElement('center', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 93
        }
      }, _react2.default.createElement('a', { onClick: function onClick() {
          return _index2.default.push('/questions/create?assignmentPk=' + selectedAssignment.pk);
        }, className: 'btn-floating waves-effect waves-light grey', 'data-tip': 'Add Question', __source: {
          fileName: _jsxFileName,
          lineNumber: 93
        }
      }, _react2.default.createElement('i', { className: 'material-icons', __source: {
          fileName: _jsxFileName,
          lineNumber: 93
        }
      }, 'add')))), _react2.default.createElement('div', { className: 'col s2', __source: {
          fileName: _jsxFileName,
          lineNumber: 94
        }
      }, _react2.default.createElement('center', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 94
        }
      }, _react2.default.createElement('a', { onClick: function onClick() {
          return _index2.default.push('/assignments/create?pk=' + selectedAssignment.pk);
        }, className: 'btn-floating waves-effect waves-light grey', 'data-tip': 'Edit Assignment', __source: {
          fileName: _jsxFileName,
          lineNumber: 94
        }
      }, _react2.default.createElement('i', { className: 'material-icons', __source: {
          fileName: _jsxFileName,
          lineNumber: 94
        }
      }, 'edit')))), _react2.default.createElement('div', { className: 'col s2', __source: {
          fileName: _jsxFileName,
          lineNumber: 95
        }
      }, _react2.default.createElement('center', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 95
        }
      }, _react2.default.createElement('a', { onClick: function onClick() {
          return _this6.deleteAssignment(selectedAssignment);
        }, className: 'btn-floating waves-effect waves-light grey', 'data-tip': 'Delete Assignment', __source: {
          fileName: _jsxFileName,
          lineNumber: 95
        }
      }, _react2.default.createElement('i', { className: 'material-icons', __source: {
          fileName: _jsxFileName,
          lineNumber: 95
        }
      }, 'delete')))), _react2.default.createElement(_reactTooltip2.default, { place: 'bottom', type: 'dark', effect: 'solid', wrapper: 'body', __source: {
          fileName: _jsxFileName,
          lineNumber: 96
        }
      })))), _react2.default.createElement(_Questions2.default, { questions: questions, onDelete: this.deleteQuestion.bind(this), __source: {
          fileName: _jsxFileName,
          lineNumber: 101
        }
      })))) : null));
    }
  }]);

  return _class;
}(_react2.default.Component);

exports.default = _class;