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

var _Answers = require('../components/Answers');

var _Answers2 = _interopRequireDefault(_Answers);

var _rest = require('../rest');

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _isUndefined = require('lodash/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/kazanz/projects/business/schooltext/frontend/pages/answers.js?entry';


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
        classrooms: [],
        selectedClassroom: {},
        students: [],
        assignments: [],
        selectedAssignment: {},
        questions: [],
        answers: []
      };

      (0, _rest.request)("GET", "/classrooms/", null, function (data) {
        if (data) {
          _this2.setState({ classrooms: data });
          _this2.changeClassroom(data[0])();
        }
      });

      (0, _rest.request)("GET", "/assignments/", null, function (data) {
        if (data) {
          _this2.setState({ assignments: data });
          _this2.changeAssignment(data[0])();
        }
      });
    }
  }, {
    key: 'onGradeChange',
    value: function onGradeChange(answer, grade) {
      var _this3 = this;

      (0, _rest.request)("PATCH", '/answers/' + answer.pk + '/', { grade: grade }, function (data) {
        var targetAnswer = (0, _find2.default)(_this3.state.answers, function (ans) {
          return ans.pk === answer.pk;
        });
        targetAnswer.grade = grade;
        _this3.setState(_this3.state);
      });
    }
  }, {
    key: 'getAnswers',
    value: function getAnswers() {
      var _this4 = this;

      var _state = this.state,
          selectedClassroom = _state.selectedClassroom,
          selectedAssignment = _state.selectedAssignment;

      if (!(0, _isUndefined2.default)(selectedClassroom.pk) && !(0, _isUndefined2.default)(selectedAssignment.pk)) {
        var endpoint = '/answers/?classroom=' + selectedClassroom.pk + '&assignment=' + selectedAssignment.pk + '&ordering=question';
        (0, _rest.request)("GET", endpoint, null, function (data) {
          _this4.setState({ answers: data });
        });
      }
    }
  }, {
    key: 'changeClassroom',
    value: function changeClassroom(classroom) {
      var _this5 = this;

      return function () {
        (0, _rest.request)("GET", "/students/?classroom=" + classroom.pk.toString(), null, function (data) {
          _this5.setState({ selectedClassroom: classroom, students: data });
          _this5.getAnswers.bind(_this5)();
        });
      };
    }
  }, {
    key: 'renderClassroomButton',
    value: function renderClassroomButton(classroom) {
      var active = classroom.pk == this.state.selectedClassroom.pk;
      return _react2.default.createElement(_SidebarButton2.default, { text: classroom.name, active: active, handleClick: this.changeClassroom(classroom).bind(this), __source: {
          fileName: _jsxFileName,
          lineNumber: 67
        }
      });
    }
  }, {
    key: 'changeAssignment',
    value: function changeAssignment(assignment) {
      var _this6 = this;

      return function () {
        (0, _rest.request)("GET", "/questions/?assignment=" + assignment.pk.toString(), null, function (data) {
          _this6.setState({ selectedAssignment: assignment, questions: data });
          _this6.getAnswers.bind(_this6)();
        });
      };
    }
  }, {
    key: 'renderAssignmentButton',
    value: function renderAssignmentButton(assignment) {
      var active = assignment.pk == this.state.selectedAssignment.pk;
      return _react2.default.createElement(_SidebarButton2.default, { text: assignment.name, active: active, handleClick: this.changeAssignment(assignment).bind(this), __source: {
          fileName: _jsxFileName,
          lineNumber: 81
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state2 = this.state,
          classrooms = _state2.classrooms,
          selectedClassroom = _state2.selectedClassroom,
          students = _state2.students,
          assignments = _state2.assignments,
          selectedAssignment = _state2.selectedAssignment,
          questions = _state2.questions,
          answers = _state2.answers;

      return _react2.default.createElement(_dashboard2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 96
        }
      }, _react2.default.createElement('div', { className: 'row', __source: {
          fileName: _jsxFileName,
          lineNumber: 97
        }
      }, _react2.default.createElement('div', { className: 'col s12 m3', __source: {
          fileName: _jsxFileName,
          lineNumber: 99
        }
      }, _react2.default.createElement('div', { className: 'card grey lighten-4', __source: {
          fileName: _jsxFileName,
          lineNumber: 100
        }
      }, _react2.default.createElement('div', { className: 'card-content', __source: {
          fileName: _jsxFileName,
          lineNumber: 101
        }
      }, _react2.default.createElement('span', { className: 'card-title', __source: {
          fileName: _jsxFileName,
          lineNumber: 102
        }
      }, 'Classrooms'), classrooms.map(this.renderClassroomButton.bind(this)))), _react2.default.createElement('div', { className: 'card grey lighten-4', __source: {
          fileName: _jsxFileName,
          lineNumber: 107
        }
      }, _react2.default.createElement('div', { className: 'card-content', __source: {
          fileName: _jsxFileName,
          lineNumber: 108
        }
      }, _react2.default.createElement('span', { className: 'card-title', __source: {
          fileName: _jsxFileName,
          lineNumber: 109
        }
      }, 'Assignments'), assignments.map(this.renderAssignmentButton.bind(this))))), _react2.default.createElement('div', { className: 'col s12 m9', __source: {
          fileName: _jsxFileName,
          lineNumber: 115
        }
      }, _react2.default.createElement('div', { className: 'card grey lighten-4', __source: {
          fileName: _jsxFileName,
          lineNumber: 116
        }
      }, _react2.default.createElement('div', { className: 'card-content', __source: {
          fileName: _jsxFileName,
          lineNumber: 117
        }
      }, _react2.default.createElement('div', { className: 'row', __source: {
          fileName: _jsxFileName,
          lineNumber: 118
        }
      }, _react2.default.createElement('div', { className: 'col s12', __source: {
          fileName: _jsxFileName,
          lineNumber: 119
        }
      }, _react2.default.createElement('span', { className: 'card-title', __source: {
          fileName: _jsxFileName,
          lineNumber: 120
        }
      }, selectedClassroom.name), _react2.default.createElement('i', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 121
        }
      }, selectedAssignment.name))), _react2.default.createElement(_Answers2.default, { questions: questions, answers: answers, onGradeChange: this.onGradeChange.bind(this), __source: {
          fileName: _jsxFileName,
          lineNumber: 125
        }
      }))))));
    }
  }]);

  return _class;
}(_react2.default.Component);

exports.default = _class;