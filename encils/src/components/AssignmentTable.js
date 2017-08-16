import React from 'react';
import capitalize from 'lodash/capitalize';

import Button from 'material-ui/Button';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

class AssignmentTable extends React.Component {
  render() {
    const { assignments } = this.props;
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments.map((assignment, index) => {
              return (
                <TableRow key={index}>
                    <TableCell>{assignment.name}</TableCell>
                    <TableCell><Button style={{float:'right'}}>View</Button></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default AssignmentTable;
