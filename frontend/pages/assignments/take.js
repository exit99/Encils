import React from 'react';
import cookie from 'react-cookie';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
import Router from 'next/router'
import ReactInterval from 'react-interval';
import phoneFormatter from 'node-phone-formatter';
import DisplayLayout from '../../layouts/display';
import { request, websocket } from '../../rest';


export default class extends React.Component {
  componentWillMount() {
    const classroomPk = this.props.url.query.classroomPk;

    this.state = {
      "waitingOnIndex": 0,
      "students": [],
      "questions": [],
      "answers": [],
      "currentQuestion": {},
      "sms": ""
    };

    request("GET", `/students/?classroom=${classroomPk}`, null, (data) => {
      this.setState({ "students": data });
    });
    request("GET", "/auth/me/", null, (data) => {
      this.setState({ "sms": phoneFormatter.format(data.sms, "(NNN) NNN-NNNN") });
    });
  }

  componentDidMount() {
    this.startQuestion(0);
  }   

  startQuestion(questionIndex) {
    const { currentQuestion } = this.state;
    const classroomPk = this.props.url.query.classroomPk;
    const assignmentPk = this.props.url.query.assignmentPk;

    Router.push(`/assignments/take?classroomPk=${classroomPk}&assignmentPk=${assignmentPk}&questionIndex=${questionIndex}`)
    request("GET", `/questions/?assignment=${assignmentPk}`, null, (data) => {
        this.setState({ "questions": data, "currentQuestion": data[questionIndex], answers: [] })
        this.connection = websocket(`/question/answer/${data[questionIndex].pk}/${classroomPk}`, this.addAnswer.bind(this), null)
    }, null);
  }

  addAnswer(answer) {
    const { answers } = this.state;

    let newAnswerArray = filter(answers, (a) => { return a.pk != answer.pk });
    newAnswerArray.push(answer);
  
    this.setState({ "answers": newAnswerArray });
  }

  getNextQuestionOrFinish() {
    const classroomPk = this.props.url.query.classroomPk;
    const assignmentPk = this.props.url.query.assignmentPk;
    const questionIndex = parseInt(this.props.url.query.questionIndex)
    const { questions } = this.state;

    if (this.onLastQuestion()) {
      Router.push("/classrooms");
    } else {
      this.startQuestion(questionIndex + 1)
    }
  }

  onLastQuestion() {
    const questionIndex = parseInt(this.props.url.query.questionIndex)
    const { questions } = this.state;
    return questions.length - 1 == questionIndex;
  }

  updateWaitingOnIndex() {
      const { waitingOnIndex } = this.state;
      const students = this.unAnsweredStudents();
      const index = waitingOnIndex >= students.length - 1 ? 0 : waitingOnIndex + 1;
      this.setState({ waitingOnIndex: index });
  }

  renderAnswer(answer) {
    const cardStyle = { "overflow": "hidden" };
    const contentStyle = { "padding": "14px" };
    const titleStyle = { "fontSize": "1.3rem" };

    return (
      <div className="col s12 m3">
        <div className="card grey lighten-4" style={ cardStyle }>
          <div className="card-content" style={ contentStyle }>
            <span className="card-title student-name" style={ titleStyle }>{ answer.student.name }</span>
            { answer.text }
          </div>
        </div>
      </div>
    )
  }

  unAnsweredStudents() {
      const { answers, students } = this.state;
      const answeredPks = answers.map((ans) => ans.student.pk);
      return filter(students, (s) => answeredPks.indexOf(s.pk) === -1);
  }

  renderWaitingOnName() {
    const { waitingOnIndex } = this.state;
    const students = this.unAnsweredStudents();
    const student = students[waitingOnIndex];
    if (!isUndefined(student)) {
      return student.name;
    }
  }

  render() {
    const { answers, currentQuestion, sms } = this.state;

    const waitingStyle = {
      position: 'fixed',
      bottom: '0em',
      left: '1em',
      width: '20em'
    };

    return ( 
       <DisplayLayout text={ currentQuestion.text } showSpinner={ sms.length === 0 }>
         <div className="row">
           { answers.map(this.renderAnswer.bind(this)) }
         </div>

         <div style={waitingStyle}>
           <div className="card grey lighten-2">
             <div className="card-content">
               <p><b>#: { sms }</b></p>
               <p><b>Waiting on...</b></p>
               <h5>{this.renderWaitingOnName()}</h5>
               <ReactInterval timeout={1000} enabled={true} callback={this.updateWaitingOnIndex.bind(this)} />
             </div>
           </div>
         </div>

         <div className="fixed-action-btn" onClick={this.getNextQuestionOrFinish.bind(this)}>
           <a className="btn-floating btn-large ">
             <i className="large material-icons">{this.onLastQuestion() ? 'done' : 'play_arrow'}</i>
           </a>
         </div>
       </DisplayLayout>
    )
  }
}

