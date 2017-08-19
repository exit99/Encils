import React from 'react';

import Button from 'material-ui/Button';
import Card, { CardContent } from 'material-ui/Card';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

class StudentStats extends React.Component {
  renderStudent(student) {
    const names = Object.keys(student.assignments);
    return (
      <Grid item sm={12} md={6}>
        <Card>
          <CardContent>
            <Typography type="headline">{student.name}</Typography>
            <Typography>AVG. Score: {student.mean_score}/5</Typography>
            <br />
            {names.map((name) => {
              return <Typography>{name}: {student.assignments[name].mean_score}/5</Typography>
            })}
          </CardContent>
        </Card>
      </Grid>
    );
  }

  render() {
    const { stats } = this.props;
    return <Grid container>{stats.map(this.renderStudent)}</Grid>
  }
  
}

export default StudentStats;
