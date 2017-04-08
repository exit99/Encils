import React from 'react'
import Router from 'next/router'
import filter from 'lodash/filter'
import GradeButton from './GradeButton'

export default class extends React.Component {
  renderQuestion(question) {
    const answers = filter(this.props.answers, answer => answer.question === question.pk)
    
    return (
      <div>
        <p><b>{ question.text }</b></p>
        <hr />
        { answers.map(this.renderAnswer.bind(this)) }
      </div>
    )
  }

  renderAnswer(answer) {
    const { onGradeChange } = this.props;

    return (
      <div className="row">
        <div className="col s12">
          <div className="card grey lighten-3">
            <div className="card-content">
              <div className="row" style= { {"margin-bottom": "0px"} }>
                <i className="col s12 m6">{ answer.student.name }</i>
                { [0, 1, 2, 3].map(value => (<GradeButton answer={ answer } value={ value } handleClick={ onGradeChange } />)) }
              </div>
              <hr />
              <p>{ answer.text }</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { questions, answers } = this.props;

    if (questions.length == 0) { return <p>No questions yet</p>; }
    if (answers.length == 0) { return <p>No answers yet</p>; }

    return (<div>{ questions.map(this.renderQuestion.bind(this)) }</div>);
  }
}
