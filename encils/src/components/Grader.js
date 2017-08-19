import React from 'react';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Chip from 'material-ui/Chip';
import { orange } from 'material-ui/colors';

class GradeSlider extends React.Component {
  componentWillMount() {
  this.state = { 
    value: this.props.defaultValue || null}
  }

  onClick(value) {
    const { onChange } = this.props;
    this.setState({ value });
    onChange && onChange(value);
  }

  render() {
    const { value } = this.state;

    return (
      <Grid container spacing={24}>
        <Grid item xs={1}><Chip style={value === 1 ? { color: 'white', backgroundColor: orange[300] } : null} onClick={() => this.onClick(1)} label='1' /></Grid>
        <Grid item xs={1}><Chip style={value === 2 ? { color: 'white', backgroundColor: orange[300] } : null} onClick={() => this.onClick(2)} label='2' /></Grid>
        <Grid item xs={1}><Chip style={value === 3 ? { color: 'white', backgroundColor: orange[300] } : null} onClick={() => this.onClick(3)} label='3' /></Grid>
        <Grid item xs={1}><Chip style={value === 4 ? { color: 'white', backgroundColor: orange[300] } : null} onClick={() => this.onClick(4)} label='4' /></Grid>
        <Grid item xs={1}><Chip style={value === 5 ? { color: 'white', backgroundColor: orange[300] } : null} onClick={() => this.onClick(5)} label='5' /></Grid>
      </Grid>
    );
  }
}

export default GradeSlider;
