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

var _reactCookie = require('react-cookie');

var _reactCookie2 = _interopRequireDefault(_reactCookie);

var _filter = require('lodash/filter');

var _filter2 = _interopRequireDefault(_filter);

var _index = require('next/dist/lib/router/index.js');

var _index2 = _interopRequireDefault(_index);

var _display = require('../../layouts/display');

var _display2 = _interopRequireDefault(_display);

var _rest = require('../../rest');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/kazanz/projects/business/schooltext/frontend/pages/students/add.js?entry';


var style = { "overflow": "hidden" };

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
        "students": [],
        "sms": ""
      };

      (0, _rest.request)("GET", "/auth/me/", null, function (data) {
        return _this2.setState({ "sms": data.sms });
      }, null);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var url = this.props.url;

      this.connection = (0, _rest.websocket)('/students/' + url.query.classroomPk, this.addStudent.bind(this), null);
    }
  }, {
    key: 'addStudent',
    value: function addStudent(student) {
      var students = this.state.students;

      console.log(student, students);
      var newStudentArray = (0, _filter2.default)(students, function (s) {
        return s.pk != student.pk;
      });
      newStudentArray.push(student);

      this.setState({ "students": newStudentArray });
    }
  }, {
    key: 'renderStudent',
    value: function renderStudent(student) {
      return _react2.default.createElement('div', { className: 'col s12 m3', __source: {
          fileName: _jsxFileName,
          lineNumber: 38
        }
      }, _react2.default.createElement('div', { className: 'card grey lighten-4', style: style, __source: {
          fileName: _jsxFileName,
          lineNumber: 39
        }
      }, _react2.default.createElement('div', { className: 'card-content', __source: {
          fileName: _jsxFileName,
          lineNumber: 40
        }
      }, _react2.default.createElement('span', { className: 'card-title student-name', __source: {
          fileName: _jsxFileName,
          lineNumber: 41
        }
      }, student.name))));
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          students = _state.students,
          sms = _state.sms;

      return _react2.default.createElement(_display2.default, { text: 'Hello Students!  Text your name to ' + sms, showSpinner: sms.length === 0, __source: {
          fileName: _jsxFileName,
          lineNumber: 52
        }
      }, _react2.default.createElement('div', { className: 'row', __source: {
          fileName: _jsxFileName,
          lineNumber: 53
        }
      }, students.map(this.renderStudent.bind(this))), _react2.default.createElement('div', { className: 'fixed-action-btn', __source: {
          fileName: _jsxFileName,
          lineNumber: 57
        }
      }, _react2.default.createElement('a', { className: 'btn-floating btn-large orange accent-3', __source: {
          fileName: _jsxFileName,
          lineNumber: 58
        }
      }, _react2.default.createElement('i', { className: 'large material-icons', onClick: function onClick() {
          return _index2.default.push('/classrooms');
        }, __source: {
          fileName: _jsxFileName,
          lineNumber: 59
        }
      }, 'done'))));
    }
  }]);

  return _class;
}(_react2.default.Component);

exports.default = _class;