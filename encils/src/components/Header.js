import React from 'react';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import Headline from './Headline';

export default ({ text, buttonText, buttonIcon, onClick }) => {
  return (
    <Grid container style={{paddingBottom: 50}}>
      <Grid item md={10} sm={12} xs={12}>
        <Headline style={{ paddingBottom: 10 }} text={text} />
      </Grid>
      <Grid item md={2} sm={12} xs={12}>
        <Button raised dense color="primary" style={{ width: '100%' }}>{buttonText}</Button>
      </Grid>
    </Grid>
  );
}
