import React from 'react';
import capitalize from 'lodash/capitalize';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

const TargetTable = (props) => {
  const { data, fields } = props;
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            {fields.map((field) => <TableCell>{capitalize(field)}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => {
            return (
              <TableRow key={index}>
                {fields.map((field) => {
                  return (
                    <TableCell>
                      {item[field]}
                    </TableCell>
                  )
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default TargetTable;
