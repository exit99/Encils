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

var _rest = require('../rest');

var _sortBy = require('lodash/sortBy');

var _sortBy2 = _interopRequireDefault(_sortBy);

var _filter = require('lodash/filter');

var _filter2 = _interopRequireDefault(_filter);

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _isUndefined = require('lodash/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/kazanz/projects/business/schooltext/frontend/pages/attendance.js?entry';


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
        students: [],
        attendance: []
      };

      (0, _rest.request)("GET", '/students/?classroom=' + this.props.url.query.classroomPk, null, function (data) {
        var students = (0, _sortBy2.default)(data, function (student) {
          return student.name;
        });
        _this2.setState({ students: students });
      });
      (0, _rest.request)("GET", '/attendance/' + this.props.url.query.classroomPk + '/today/', null, function (data) {
        _this2.setState({ attendance: data });
      });
    }
  }, {
    key: 'updateAttendance',
    value: function updateAttendance(pk, status) {
      var _this3 = this;

      (0, _rest.request)("PATCH", '/attendance/' + pk + '/', { status: status }, function (data) {
        var targetAttendance = (0, _find2.default)(_this3.state.attendance, function (a) {
          return a.pk === data.pk;
        });
        targetAttendance.status = status;
        _this3.setState(_this3.state);
      });
    }
  }, {
    key: 'renderStudentCheckbox',
    value: function renderStudentCheckbox(student) {
      var _this4 = this;

      var attendance = this.state.attendance;

      var studentAttendance = (0, _filter2.default)(attendance, function (a) {
        return a.student === student.pk;
      })[0];
      if ((0, _isUndefined2.default)(studentAttendance)) {
        return null;
      }
      var status = studentAttendance.status === "present" ? "absent" : "present";
      var handleClick = function handleClick() {
        return _this4.updateAttendance(studentAttendance.pk, status);
      };
      var checked = studentAttendance.status === "present";
      var className = studentAttendance.status === "present" ? "filled-in" : "";

      return _react2.default.createElement('p', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 44
        }
      }, _react2.default.createElement('input', { onClick: handleClick.bind(this), type: 'checkbox', id: student.pk, className: className, checked: checked, __source: {
          fileName: _jsxFileName,
          lineNumber: 45
        }
      }), _react2.default.createElement('label', { onClick: handleClick.bind(this), __source: {
          fileName: _jsxFileName,
          lineNumber: 46
        }
      }, student.name));
    }
  }, {
    key: 'renderDate',
    value: function renderDate() {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1; //January is 0!
      var yyyy = today.getFullYear();
      if (dd < 10) {
        dd = '0' + dd;
      }
      if (mm < 10) {
        mm = '0' + mm;
      }
      return mm + '/' + dd + '/' + yyyy;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var _state = this.state,
          attendance = _state.attendance,
          students = _state.students;

      return _react2.default.createElement(_dashboard2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 68
        }
      }, _react2.default.createElement('div', { className: 'row', __source: {
          fileName: _jsxFileName,
          lineNumber: 69
        }
      }, _react2.default.createElement('div', { className: 'col s12', __source: {
          fileName: _jsxFileName,
          lineNumber: 70
        }
      }, _react2.default.createElement('div', { className: 'card grey lighten-4', __source: {
          fileName: _jsxFileName,
          lineNumber: 71
        }
      }, _react2.default.createElement('div', { className: 'card-content', __source: {
          fileName: _jsxFileName,
          lineNumber: 72
        }
      }, _react2.default.createElement('span', { className: 'card-title', __source: {
          fileName: _jsxFileName,
          lineNumber: 73
        }
      }, 'Attendance for: ', this.renderDate()), _react2.default.createElement('p', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 74
        }
      }, 'Uncheck students who are absent.'), _react2.default.createElement('br', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 75
        }
      }), students.map(this.renderStudentCheckbox.bind(this)), _react2.default.createElement('br', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 77
        }
      }), _react2.default.createElement('div', { className: 'card-action', __source: {
          fileName: _jsxFileName,
          lineNumber: 78
        }
      }, _react2.default.createElement('a', { onClick: function onClick() {
          return _index2.default.push('/classrooms?pk=' + _this5.props.url.query.classroomPk);
        }, className: 'btn ', __source: {
          fileName: _jsxFileName,
          lineNumber: 79
        }
      }, 'Save')))))));
    }
  }]);

  return _class;
}(_react2.default.Component);

exports.default = _class;