import React from 'react';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

const ClassStats = (props) => {
  const { stats } = props;
  return (
    <Grid container>
      <Grid item sm={12} md={6}>
        <center>
          <Typography type="headline">AVG. Score</Typography>
          <Typography type="display3">{stats.mean_score} / 5</Typography>
        </center>
      </Grid>
      <Grid item sm={12} md={6}>
        <center>
          <Typography type="headline">Answer Rate</Typography>
          <Typography type="display3">{stats.answer_rate * 100}%</Typography>
        </center>
      </Grid>

    </Grid>
  );
}

export default ClassStats;
