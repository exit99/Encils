import React from 'react';
import { connect } from 'react-redux';

import { CircularProgress } from 'material-ui/Progress';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

import { editQuestionAnswer, } from '../api-client/assignments';

class GradeSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = { saving: false };
  }
  updateGrade(answerPk) {
    const { grades, updateGrades, dispatch } = this.props;

    return (event) => {
      const newGrade = event.target.value;

      let newGrades = Object.assign({}, grades);
      newGrades[answerPk] = newGrade;

      updateGrades(newGrades);

      this.setState({ saving: true })
      dispatch(editQuestionAnswer(answerPk)({ grade: newGrade }))
        .then(() => this.setState({ saving: false }));
    }
  }

  render() {
    const { answer, grades } = this.props;
    const { saving } = this.state;
    return (
      <div>
        <TextField
          type="number"
          value={grades[answer.pk]}
          onChange={this.updateGrade(answer.pk)}
          inputProps={{
            'min': '0',
            'max': '100',
          }}
          style={{ display: 'inline', fontSize: 20 }}
        />
        <span style={{ display: 'inline' }}>%</span>
        {saving ?
        <span style={{ display: 'inline', marginLeft: 5, marginBottom: -5 }}><CircularProgress size={25} /></span>
        : null}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  routing: state.routing,
  answers: state.apiReducer.answers,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(GradeSection)
