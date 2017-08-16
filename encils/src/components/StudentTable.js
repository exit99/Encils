import React from 'react';
import capitalize from 'lodash/capitalize';

import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Menu, { MenuItem } from 'material-ui/Menu';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

class StudentTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: undefined,
      open: false,
    };
  }

  handleClick(event) {
    this.setState({ open: true, anchorEl: event.currentTarget });
  }

  handleRequestClose() {
    this.setState({ open: false });
  }

  render() {
    const { students, fields } = this.props;
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
                    <TableCell>{student['name']}</TableCell>
                    <TableCell>{student['phone']}</TableCell>
                    <TableCell compact={true}>
                       <IconButton
                         aria-label="More"
                         aria-owns={this.state.open ? 'long-menu' : null}
                         aria-haspopup="true"
                         onClick={this.handleClick.bind(this)}
                         style={{float:'right'}}
                       >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose.bind(this)}
        >
          <MenuItem onClick={this.handleRequestClose.bind(this)}>Reports</MenuItem>
          <MenuItem onClick={this.handleRequestClose.bind(this)}>Edit</MenuItem>
          <MenuItem onClick={this.handleRequestClose.bind(this)}>Delete</MenuItem>
        </Menu>

      </Paper>
    );
  }
}

export default StudentTable;
