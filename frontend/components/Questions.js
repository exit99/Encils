import React from 'react'
import Router from 'next/router'

export default class extends React.Component {
  renderQuestion(question) {
    return (
      <tr>
        <td>{ question.text }</td>
        <td><a style={ {cursor: "pointer" } } onClick={ () => this.props.onDelete(question) } className="tooltipped" data-position="bottom" data-delay="20" data-tooltip="Delete"><i className="material-icons">delete</i></a></td>
      </tr>
    )
  }

  render() {
    const { questions } = this.props;

    if (questions.length == 0) { return <p>No questions created</p>; }

    return (
      <table className="bordered">
        <thead>
          <tr>
            <th>Question</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { questions.map(this.renderQuestion.bind(this)) }
        </tbody>
      </table>
    );
  }
}
