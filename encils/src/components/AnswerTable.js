import React from 'react';

import Button from 'material-ui/Button';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import Grader from './Grader';

const AnswerTable = (props) => {
  const { answers, onGradeChange } = props;
  const onChange = (answer_pk) => (value) => onGradeChange(answer_pk, value);
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Student</TableCell>
            <TableCell>Answer</TableCell>
            <TableCell>Grade</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {answers.map((answer, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{answer.student.name}</TableCell>
                <TableCell>{answer.text}</TableCell>
                <TableCell><Grader defaultValue={answer.grade} onChange={onChange(answer.pk)} /></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
  
}

export default AnswerTable;
