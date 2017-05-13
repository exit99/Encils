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

var _Students = require('../components/Students');

var _Students2 = _interopRequireDefault(_Students);

var _rest = require('../rest');

var _filter = require('lodash/filter');

var _filter2 = _interopRequireDefault(_filter);

var _reactTooltip = require('react-tooltip');

var _reactTooltip2 = _interopRequireDefault(_reactTooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/kazanz/projects/business/schooltext/frontend/pages/classrooms.js?entry';


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
        students: []
      };

      (0, _rest.request)("GET", "/classrooms/", null, function (data) {
        if (data) {
          _this2.setState({ classrooms: data });
          var pk = _this2.props.url.query.pk;
          var classroom = pk ? (0, _filter2.default)(data, function (classroom) {
            return classroom.pk == pk;
          })[0] : data[0];
          _this2.changeClassroom(classroom)();
        }
      });
    }
  }, {
    key: 'changeClassroom',
    value: function changeClassroom(classroom) {
      var _this3 = this;

      return function () {
        (0, _rest.request)("GET", "/students/?classroom=" + classroom.pk.toString(), null, function (data) {
          _this3.setState({ selectedClassroom: classroom, students: data });
        });
      };
    }
  }, {
    key: 'renderClassroomButton',
    value: function renderClassroomButton(classroom) {
      var active = classroom.pk == this.state.selectedClassroom.pk;
      return _react2.default.createElement(_SidebarButton2.default, { text: classroom.name, active: active, handleClick: this.changeClassroom(classroom).bind(this), __source: {
          fileName: _jsxFileName,
          lineNumber: 38
        }
      });
    }
  }, {
    key: 'deleteClassroom',
    value: function deleteClassroom(classroom) {
      var _this4 = this;

      (0, _rest.request)("DELETE", '/classrooms/' + classroom.pk + '/', null, function (data) {
        var classrooms = (0, _filter2.default)(_this4.state.classrooms, function (obj) {
          return obj.pk != classroom.pk;
        });
        _this4.setState({ classrooms: classrooms });
        if (classrooms.length > 0) {
          _this4.changeClassroom(classrooms[0])();
        }
      }, null);
    }
  }, {
    key: 'deleteStudent',
    value: function deleteStudent(student) {
      var _this5 = this;

      (0, _rest.request)("DELETE", '/students/' + student.pk + '/', null, function (data) {
        var students = (0, _filter2.default)(_this5.state.students, function (obj) {
          return obj.pk != student.pk;
        });
        _this5.setState({ students: students });
      }, null);
    }
  }, {
    key: 'renderClassrooms',
    value: function renderClassrooms() {
      var _this6 = this;

      var _state = this.state,
          selectedClassroom = _state.selectedClassroom,
          students = _state.students;

      return _react2.default.createElement('div', { className: 'col s12 m9', __source: {
          fileName: _jsxFileName,
          lineNumber: 66
        }
      }, _react2.default.createElement('div', { className: 'card grey lighten-4', __source: {
          fileName: _jsxFileName,
          lineNumber: 67
        }
      }, _react2.default.createElement('div', { className: 'card-content', __source: {
          fileName: _jsxFileName,
          lineNumber: 68
        }
      }, _react2.default.createElement('div', { className: 'row', __source: {
          fileName: _jsxFileName,
          lineNumber: 70
        }
      }, _react2.default.createElement('div', { className: 'col s12 m6', __source: {
          fileName: _jsxFileName,
          lineNumber: 71
        }
      }, _react2.default.createElement('span', { className: 'card-title', __source: {
          fileName: _jsxFileName,
          lineNumber: 72
        }
      }, selectedClassroom.name)), _react2.default.createElement('div', { className: 'col s12 m6', __source: {
          fileName: _jsxFileName,
          lineNumber: 74
        }
      }, _react2.default.createElement('div', { className: 'row', __source: {
          fileName: _jsxFileName,
          lineNumber: 75
        }
      }, students.length > 0 ? _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 78
        }
      }, _react2.default.createElement('div', { className: 'col s2 offset-m4', __source: {
          fileName: _jsxFileName,
          lineNumber: 79
        }
      }, _react2.default.createElement('center', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 79
        }
      }, _react2.default.createElement('a', { onClick: function onClick() {
          return _index2.default.push('/attendance?classroomPk=' + selectedClassroom.pk);
        }, className: 'btn-floating waves-effect waves-light grey', 'data-tip': 'Take Attendance', __source: {
          fileName: _jsxFileName,
          lineNumber: 79
        }
      }, _react2.default.createElement('i', { className: 'material-icons', __source: {
          fileName: _jsxFileName,
          lineNumber: 79
        }
      }, 'person_pin')))), _react2.default.createElement('div', { className: 'col s2', __source: {
          fileName: _jsxFileName,
          lineNumber: 80
        }
      }, _react2.default.createElement('center', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 80
        }
      }, _react2.default.createElement('a', { onClick: function onClick() {
          return _index2.default.push('/students/add?classroomPk=' + selectedClassroom.pk);
        }, className: 'btn-floating waves-effect waves-light grey', 'data-tip': 'Add Students', __source: {
          fileName: _jsxFileName,
          lineNumber: 80
        }
      }, _react2.default.createElement('i', { className: 'material-icons', __source: {
          fileName: _jsxFileName,
          lineNumber: 80
        }
      }, 'add'))))) : _react2.default.createElement('div', { className: 'col s2 offset-m6', __source: {
          fileName: _jsxFileName,
          lineNumber: 83
        }
      }, _react2.default.createElement('center', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 83
        }
      }, _react2.default.createElement('a', { onClick: function onClick() {
          return _index2.default.push('/students/add?classroomPk=' + selectedClassroom.pk);
        }, className: 'btn-floating waves-effect waves-light grey', 'data-tip': 'Add Students', __source: {
          fileName: _jsxFileName,
          lineNumber: 83
        }
      }, _react2.default.createElement('i', { className: 'material-icons', __source: {
          fileName: _jsxFileName,
          lineNumber: 83
        }
      }, 'add')))), _react2.default.createElement('div', { className: 'col s2', __source: {
          fileName: _jsxFileName,
          lineNumber: 85
        }
      }, _react2.default.createElement('center', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 85
        }
      }, _react2.default.createElement('a', { onClick: function onClick() {
          return _index2.default.push('/classrooms/create?pk=' + selectedClassroom.pk);
        }, className: 'btn-floating waves-effect waves-light grey', 'data-tip': 'Edit Classroom', __source: {
          fileName: _jsxFileName,
          lineNumber: 85
        }
      }, _react2.default.createElement('i', { className: 'material-icons', __source: {
          fileName: _jsxFileName,
          lineNumber: 85
        }
      }, 'edit')))), _react2.default.createElement('div', { className: 'col s2', __source: {
          fileName: _jsxFileName,
          lineNumber: 86
        }
      }, _react2.default.createElement('center', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 86
        }
      }, _react2.default.createElement('a', { onClick: function onClick() {
          return _this6.deleteClassroom(selectedClassroom);
        }, className: 'btn-floating waves-effect waves-light grey', 'data-tip': 'Delete Classroom', __source: {
          fileName: _jsxFileName,
          lineNumber: 86
        }
      }, _react2.default.createElement('i', { className: 'material-icons', __source: {
          fileName: _jsxFileName,
          lineNumber: 86
        }
      }, 'delete')))), _react2.default.createElement(_reactTooltip2.default, { place: 'bottom', type: 'dark', effect: 'solid', __source: {
          fileName: _jsxFileName,
          lineNumber: 87
        }
      })))), _react2.default.createElement(_Students2.default, { students: students, onDelete: this.deleteStudent.bind(this), __source: {
          fileName: _jsxFileName,
          lineNumber: 92
        }
      }))));
    }
  }, {
    key: 'render',
    value: function render() {
      var _state2 = this.state,
          classrooms = _state2.classrooms,
          selectedClassroom = _state2.selectedClassroom,
          students = _state2.students;

      return _react2.default.createElement(_dashboard2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 108
        }
      }, _react2.default.createElement('div', { className: 'row', __source: {
          fileName: _jsxFileName,
          lineNumber: 109
        }
      }, _react2.default.createElement('div', { className: 'col s12 m3', __source: {
          fileName: _jsxFileName,
          lineNumber: 110
        }
      }, _react2.default.createElement('div', { className: 'card grey lighten-4', __source: {
          fileName: _jsxFileName,
          lineNumber: 111
        }
      }, _react2.default.createElement('div', { className: 'card-content', __source: {
          fileName: _jsxFileName,
          lineNumber: 112
        }
      }, _react2.default.createElement('span', { className: 'card-title', __source: {
          fileName: _jsxFileName,
          lineNumber: 113
        }
      }, 'Classrooms'), _react2.default.createElement('br', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 114
        }
      }), _react2.default.createElement('center', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 115
        }
      }, _react2.default.createElement('a', { onClick: function onClick() {
          return _index2.default.push('/classrooms/create');
        }, className: 'btn waves-effect waves-light ', style: { "width": "100%", "font-size": "12px" }, __source: {
          fileName: _jsxFileName,
          lineNumber: 115
        }
      }, 'New Classroom'))), _react2.default.createElement('div', { className: 'card-action', __source: {
          fileName: _jsxFileName,
          lineNumber: 117
        }
      }, classrooms.map(this.renderClassroomButton.bind(this))))), classrooms.length > 0 ? this.renderClassrooms() : null));
    }
  }]);

  return _class;
}(_react2.default.Component);

exports.default = _class;