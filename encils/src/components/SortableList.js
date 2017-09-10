import React from 'react';
import Button from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import CommentIcon from 'material-ui-icons/Comment';
import ArrowUpwordIcon from 'material-ui-icons/ArrowUpward';
import CheckboxIcon from 'material-ui-icons/CheckBox';
import CheckboxOutlineIcon from 'material-ui-icons/CheckBoxOutlineBlank';
import { blue, grey } from 'material-ui/colors';

import Link from './Link';

class SortableList extends React.Component {
  state = {
    checked: [0],
  };

  handleToggle = (event, value) => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  render() {
    const { classrooms } = this.props;

    return (
      <div>
        <Grid container style={{borderBottom: '1px solid', borderColor: grey[300], paddingTop: 15}}>
          <Grid item xs={1}>
            <center><CheckboxOutlineIcon style={{width: 45, height: 45, color: grey[400]}} /></center>
          </Grid>
          <Grid item xs={3}>
            <Typography type="header" style={{marginTop: 10, float: 'left', marginRight: 15}}>Sort by</Typography>
            <Button style={{backgroundColor: grey[300], float: 'left', marginRight: 15, height: '42px'}}>Name</Button>
            <Button style={{backgroundColor: grey[300], float: 'left', marginRight: 15}}><ArrowUpwordIcon style={{height: 20}}/></Button>
          </Grid>
        </Grid>
        {[0, 1, 2, 3].map(value => (
          <div>
            <Grid container style={{borderBottom: '1px solid', borderColor: grey[300], paddingTop: 15}}>
              <Grid item xs={1}>
                <center><CheckboxIcon style={{width: 45, height: 45, color: blue[700]}} /></center>
              </Grid>
              <Grid item xs={11} md={7}>
                <div style={{flex: 1}}>
                  <Link text="Name of my Classroom" />
                  <Typography style={{paddingTop: 5}}>Created: 5/16/18</Typography>
                </div>
              </Grid>
              <Grid item xs={3} md={1}>
                <Typography><b>87%</b></Typography>
                <Typography>Avg. Score</Typography>
              </Grid>
              <Grid item xs={3} md={1}>
                <Typography><b>10</b></Typography>
                <Typography>Assignments</Typography>
              </Grid>
              <Grid item xs={3} md={1}>
                <Typography><b>4</b></Typography>
                <Typography>Students</Typography>
              </Grid>
              <Grid item xs={3} md={1}>
                <Typography><b>3</b></Typography>
                <Typography>Struggling</Typography>
              </Grid>
            </Grid>
          </div>
        ))}
      </div>
    );
  }
}

export default SortableList;
