import React from 'react';
import capitalize from 'lodash/capitalize';

import Button from 'material-ui/Button';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

const StudentTable = (props) => {
  const { students, onDelete } = props;
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.phone}</TableCell>
                <TableCell><Button onClick={() => onDelete(student.pk)} style={{float:'right'}}>Delete</Button></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
  }

export default StudentTable;
