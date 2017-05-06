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

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _isUndefined = require('lodash/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _index = require('next/dist/lib/router/index.js');

var _index2 = _interopRequireDefault(_index);

var _reactInterval = require('react-interval');

var _reactInterval2 = _interopRequireDefault(_reactInterval);

var _display = require('../../layouts/display');

var _display2 = _interopRequireDefault(_display);

var _rest = require('../../rest');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/kazanz/projects/business/schooltext/frontend/pages/assignments/take.js?entry';


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

      var classroomPk = this.props.url.query.classroomPk;

      this.state = {
        "waitingOnIndex": 0,
        "students": [],
        "questions": [],
        "answers": [],
        "currentQuestion": {},
        "sms": ""
      };

      (0, _rest.request)("GET", '/students?classroom=' + classroomPk, null, function (data) {
        return _this2.setState({ "students": data });
      }, null);
      (0, _rest.request)("GET", "/auth/me/", null, function (data) {
        return _this2.setState({ "sms": data.sms });
      }, null);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      var currentQuestion = this.state.currentQuestion;

      var classroomPk = this.props.url.query.classroomPk;
      var assignmentPk = this.props.url.query.assignmentPk;
      var questionIndex = this.props.url.query.questionIndex;

      (0, _rest.request)("GET", '/questions?assignment=' + assignmentPk, null, function (data) {
        _this3.setState({ "questions": data, "currentQuestion": data[questionIndex] });
        _this3.connection = (0, _rest.websocket)('/question/answer/' + data[questionIndex].pk + '/' + classroomPk, _this3.addAnswer.bind(_this3), null);
      }, null);
    }
  }, {
    key: 'addAnswer',
    value: function addAnswer(answer) {
      var answers = this.state.answers;

      var newAnswerArray = (0, _filter2.default)(answers, function (a) {
        return a.pk != answer.pk;
      });
      newAnswerArray.push(answer);

      this.setState({ "answers": newAnswerArray });
    }
  }, {
    key: 'getNextQuestionOrFinish',
    value: function getNextQuestionOrFinish() {
      var classroomPk = this.props.url.query.classroomPk;
      var assignmentPk = this.props.url.query.assignmentPk;
      var questionIndex = parseInt(this.props.url.query.questionIndex);
      var questions = this.state.questions;

      if (this.onLastQuestion()) {
        _index2.default.push("/classrooms");
      } else {
        _index2.default.push('/assignments/take?classroomPk=' + classroomPk + '&assignmentPk=' + assignmentPk + '&questionIndex=' + (questionIndex + 1));
      }
    }
  }, {
    key: 'onLastQuestion',
    value: function onLastQuestion() {
      var questionIndex = parseInt(this.props.url.query.questionIndex);
      var questions = this.state.questions;

      return questions.length - 1 == questionIndex;
    }
  }, {
    key: 'unAnsweredStudents',
    value: function unAnsweredStudents() {
      var _state = this.state,
          answers = _state.answers,
          students = _state.students;

      var answeredPks = answers.map(function (ans) {
        return ans.student.pk;
      });
      return (0, _filter2.default)(students, function (s) {
        return answeredPks.indexOf(s) === -1;
      });
    }
  }, {
    key: 'updateWaitingOnIndex',
    value: function updateWaitingOnIndex() {
      var waitingOnIndex = this.state.waitingOnIndex;

      var students = this.unAnsweredStudents();
      var index = waitingOnIndex >= students.length - 1 ? 0 : waitingOnIndex + 1;
      this.setState({ waitingOnIndex: index });
    }
  }, {
    key: 'renderAnswer',
    value: function renderAnswer(answer) {
      var cardStyle = { "overflow": "hidden" };
      var contentStyle = { "padding": "14px" };
      var titleStyle = { "fontSize": "1.3rem" };

      return _react2.default.createElement('div', { className: 'col s12 m3', __source: {
          fileName: _jsxFileName,
          lineNumber: 88
        }
      }, _react2.default.createElement('div', { className: 'card grey lighten-4', style: cardStyle, __source: {
          fileName: _jsxFileName,
          lineNumber: 89
        }
      }, _react2.default.createElement('div', { className: 'card-content', style: contentStyle, __source: {
          fileName: _jsxFileName,
          lineNumber: 90
        }
      }, _react2.default.createElement('span', { className: 'card-title student-name', style: titleStyle, __source: {
          fileName: _jsxFileName,
          lineNumber: 91
        }
      }, answer.student.name), answer.text)));
    }
  }, {
    key: 'renderWaitingOnName',
    value: function renderWaitingOnName() {
      var waitingOnIndex = this.state.waitingOnIndex;

      var students = this.unAnsweredStudents();
      var student = students[waitingOnIndex];
      if (!(0, _isUndefined2.default)(student)) {
        return student.name;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _state2 = this.state,
          answers = _state2.answers,
          currentQuestion = _state2.currentQuestion,
          sms = _state2.sms;

      var waitingStyle = {
        position: 'fixed',
        bottom: '0em',
        left: '1em',
        width: '20em'
      };

      return _react2.default.createElement(_display2.default, { text: currentQuestion.text, showSpinner: sms.length === 0, __source: {
          fileName: _jsxFileName,
          lineNumber: 119
        }
      }, _react2.default.createElement('div', { className: 'row', __source: {
          fileName: _jsxFileName,
          lineNumber: 120
        }
      }, answers.map(this.renderAnswer.bind(this))), _react2.default.createElement('div', { style: waitingStyle, __source: {
          fileName: _jsxFileName,
          lineNumber: 124
        }
      }, _react2.default.createElement('div', { className: 'card grey lighten-2', __source: {
          fileName: _jsxFileName,
          lineNumber: 125
        }
      }, _react2.default.createElement('div', { className: 'card-content', __source: {
          fileName: _jsxFileName,
          lineNumber: 126
        }
      }, _react2.default.createElement('p', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 127
        }
      }, _react2.default.createElement('b', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 127
        }
      }, '#: ', sms)), _react2.default.createElement('p', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 128
        }
      }, _react2.default.createElement('b', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 128
        }
      }, 'Waiting on...')), _react2.default.createElement('h5', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 129
        }
      }, this.renderWaitingOnName()), _react2.default.createElement(_reactInterval2.default, { timeout: 1000, enabled: true, callback: this.updateWaitingOnIndex.bind(this), __source: {
          fileName: _jsxFileName,
          lineNumber: 130
        }
      })))), _react2.default.createElement('div', { className: 'fixed-action-btn', onClick: this.getNextQuestionOrFinish.bind(this), __source: {
          fileName: _jsxFileName,
          lineNumber: 135
        }
      }, _react2.default.createElement('a', { className: 'btn-floating btn-large orange accent-3', __source: {
          fileName: _jsxFileName,
          lineNumber: 136
        }
      }, _react2.default.createElement('i', { className: 'large material-icons', __source: {
          fileName: _jsxFileName,
          lineNumber: 137
        }
      }, this.onLastQuestion() ? 'done' : 'play_arrow'))));
    }
  }]);

  return _class;
}(_react2.default.Component);

exports.default = _class;