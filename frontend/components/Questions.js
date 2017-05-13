import React from 'react'
import Router from 'next/router'
import ReactTooltip from 'react-tooltip'

export default class extends React.Component {
  renderQuestion(question) {
    return (
      <tr>
        <td>{ question.text }</td>
        <td>
          <a className="right" style={ {cursor: "pointer" } } onClick={ () => this.props.onDelete(question) } data-tip="Delete"><div data-tip="Delete" className="btn-floating grey"><i className="material-icons">delete</i></div></a>
          <ReactTooltip place="bottom" type="dark" effect="solid" wrapper="body"/>
        </td>
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
