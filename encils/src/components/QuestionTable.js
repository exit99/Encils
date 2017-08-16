import React from 'react';
import capitalize from 'lodash/capitalize';

import Button from 'material-ui/Button';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

class QuestionTable extends React.Component {
  render() {
    const { questions } = this.props;
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((question, index) => {
              return (
                <TableRow key={index}>
                    <TableCell>{question.text}</TableCell>
                    <TableCell><Button style={{float:'right'}}>Delete</Button></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default QuestionTable;
