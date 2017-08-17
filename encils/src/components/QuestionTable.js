import React from 'react';
import capitalize from 'lodash/capitalize';

import Button from 'material-ui/Button';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

const QuestionTable = (props) => {
  const { questions, onDelete } = props;
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
                  <TableCell><Button onClick={() => onDelete(question.pk)} style={{float:'right'}}>Delete</Button></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
  
}

export default QuestionTable;
