import React from 'react';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import Headline from './Headline';

export default ({ text, buttonText, buttonIcon, onClick }) => {
  return (
    <Grid container style={{paddingBottom: 50}}>
      <Grid item md={3} sm={12} xs={12}>
        <Headline text={text} />
      </Grid>
      <Grid item md={9} sm={12} xs={12}>
        <Button raised dense color="primary" style={{float:'right'}}>{buttonText}</Button>
      </Grid>
    </Grid>
  );
}
