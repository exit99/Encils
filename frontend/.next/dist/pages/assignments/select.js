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

var _dashboard = require('../../layouts/dashboard');

var _dashboard2 = _interopRequireDefault(_dashboard);

var _SidebarButton = require('../../components/SidebarButton');

var _SidebarButton2 = _interopRequireDefault(_SidebarButton);

var _rest = require('../../rest');

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/kazanz/projects/business/schooltext/frontend/pages/assignments/select.js?entry';


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
        assignments: [],
        selectedAssignment: {}
      };

      (0, _rest.request)("GET", "/classrooms/", null, function (data) {
        if (data) {
          _this2.setState({ classrooms: data });
        }
      });

      (0, _rest.request)("GET", "/assignments/", null, function (data) {
        if (data) {
          _this2.setState({ assignments: data });
        }
      });
    }
  }, {
    key: 'changeClassroom',
    value: function changeClassroom(classroom) {
      var _this3 = this;

      return function () {
        return _this3.setState({ selectedClassroom: classroom });
      };
    }
  }, {
    key: 'renderClassroom',
    value: function renderClassroom(classroom) {
      var active = classroom.pk == this.state.selectedClassroom.pk;
      return _react2.default.createElement(_SidebarButton2.default, { text: classroom.name, active: active, handleClick: this.changeClassroom(classroom).bind(this), __source: {
          fileName: _jsxFileName,
          lineNumber: 36
        }
      });
    }
  }, {
    key: 'changeAssignment',
    value: function changeAssignment(assignment) {
      var _this4 = this;

      return function () {
        return _this4.setState({ selectedAssignment: assignment });
      };
    }
  }, {
    key: 'renderAssignment',
    value: function renderAssignment(assignment) {
      var active = assignment.pk == this.state.selectedAssignment.pk;
      return _react2.default.createElement(_SidebarButton2.default, { text: assignment.name, active: active, handleClick: this.changeAssignment(assignment).bind(this), __source: {
          fileName: _jsxFileName,
          lineNumber: 45
        }
      });
    }
  }, {
    key: 'renderStartButton',
    value: function renderStartButton() {
      var _state = this.state,
          selectedClassroom = _state.selectedClassroom,
          selectedAssignment = _state.selectedAssignment;

      var className = "btn orange accent-3 right";
      var handleClick = function handleClick() {
        return _index2.default.push('/assignments/take?classroomPk=' + selectedClassroom.pk + '&assignmentPk=' + selectedAssignment.pk + '&questionIndex=0');
      };
      if ((0, _isEmpty2.default)(selectedClassroom) || (0, _isEmpty2.default)(selectedAssignment)) {
        className = className + ' disabled';
        handleClick = function handleClick() {
          return null;
        };
      }

      return _react2.default.createElement('a', { onClick: handleClick, className: className, style: { 'fontSize': '1rem' }, __source: {
          fileName: _jsxFileName,
          lineNumber: 61
        }
      }, 'Start Assignment');
    }
  }, {
    key: 'render',
    value: function render() {
      var _state2 = this.state,
          classrooms = _state2.classrooms,
          assignments = _state2.assignments;

      return _react2.default.createElement(_dashboard2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 71
        }
      }, _react2.default.createElement('div', { className: 'row', __source: {
          fileName: _jsxFileName,
          lineNumber: 73
        }
      }, _react2.default.createElement('div', { className: 'col s12 m12 l12', __source: {
          fileName: _jsxFileName,
          lineNumber: 74
        }
      }, _react2.default.createElement('div', { className: 'card white', __source: {
          fileName: _jsxFileName,
          lineNumber: 75
        }
      }, _react2.default.createElement('div', { className: 'card-content', __source: {
          fileName: _jsxFileName,
          lineNumber: 76
        }
      }, _react2.default.createElement('span', { className: 'card-title', __source: {
          fileName: _jsxFileName,
          lineNumber: 77
        }
      }, 'Give assignment to classroom ', this.renderStartButton.bind(this)()))))), _react2.default.createElement('div', { className: 'row', __source: {
          fileName: _jsxFileName,
          lineNumber: 83
        }
      }, _react2.default.createElement('div', { className: 'col m6', __source: {
          fileName: _jsxFileName,
          lineNumber: 85
        }
      }, _react2.default.createElement('div', { className: 'card white', __source: {
          fileName: _jsxFileName,
          lineNumber: 86
        }
      }, _react2.default.createElement('div', { className: 'card-content', __source: {
          fileName: _jsxFileName,
          lineNumber: 87
        }
      }, _react2.default.createElement('span', { className: 'card-title', __source: {
          fileName: _jsxFileName,
          lineNumber: 88
        }
      }, 'Select Classroom'), classrooms.map(this.renderClassroom.bind(this))))), _react2.default.createElement('div', { className: 'col m6', __source: {
          fileName: _jsxFileName,
          lineNumber: 94
        }
      }, _react2.default.createElement('div', { className: 'card white', __source: {
          fileName: _jsxFileName,
          lineNumber: 95
        }
      }, _react2.default.createElement('div', { className: 'card-content', __source: {
          fileName: _jsxFileName,
          lineNumber: 96
        }
      }, _react2.default.createElement('span', { className: 'card-title', __source: {
          fileName: _jsxFileName,
          lineNumber: 97
        }
      }, 'Select Assignment'), assignments.map(this.renderAssignment.bind(this)))))));
    }
  }]);

  return _class;
}(_react2.default.Component);

exports.default = _class;