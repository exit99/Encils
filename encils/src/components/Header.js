import React from 'react';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import Typography from 'material-ui/Typography';

import Headline from './Headline';

export default ({ text, buttonText, buttonIcon, onClick, switches, body }) => {

  const renderedSwitches = switches && switches.map(({ label, checked, onClick }) => {
    return <FormControlLabel control={ <Switch checked={checked} /> } label={label} onClick={onClick} />
  });

  return (
    <Grid container style={{paddingBottom: 50}}>
      <Grid item md={switches ? 5 : 10} sm={12} xs={12}>
        <Headline style={{ paddingBottom: 10 }} text={text} />
        {body ?
        <div>
          <br />
          <Typography>{body}</Typography>
        </div>
        : null}
      </Grid>
      {switches ?
      <Grid item md={5} sm={12} xs={12}>
        <div style={{float: 'right'}}>
          {renderedSwitches}
        </div>
      </Grid>
      : null }
      {buttonText ?
      <Grid item md={2} sm={12} xs={12}>
        <Button raised color="accent" style={{ width: '100%' }} onClick={onClick}>{buttonText}</Button>
      </Grid> : null}
    </Grid>
  );
}
