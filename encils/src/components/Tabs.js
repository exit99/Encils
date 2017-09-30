import React from 'react';

import Grid from 'material-ui/Grid';
import Input from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import Typography from 'material-ui/Typography';
import { grey } from 'material-ui/colors';

import Link from '../components/Link';

import { onDesktop } from '../utils';

class Tabs extends React.Component {
  componentWillMount() {
    this.state = {
      tabIndex: this.props.initialTab || 0,
    }
  }

  render() {
    const { titles, items, buttons } = this.props;
    const { tabIndex } = this.state;

    return (
      <div>
        <Grid container>
          {onDesktop() ? 
          titles.map((title, index) => (
            <Grid item xs={12} md={2}>
              <Link onClick={() => this.setState({tabIndex: index})} highlighted={tabIndex === index} text={title} />
            </Grid>
          ))
          :
          <Select
            style={{width: '100%'}}
            value={tabIndex}
            onChange={(event) => this.setState({tabIndex: event.target.value})}
            input={<Input id="age-simple" />}
          >
            {titles.map((title, index) => <MenuItem key={index} value={index}>{title}</MenuItem>)}
          </Select>
          }
        </Grid>
        {onDesktop() ? <hr style={{border: `1px solid ${grey[300]}`}}/> : null}
        <Grid container style={{paddingTop: 40, paddingBottom: 40}}>
          <Grid item sm={12} md={8}>
            <Typography type="title">{titles[tabIndex]}</Typography>
          </Grid>
          <Grid item sm={12} md={4}>
            {buttons && buttons[tabIndex]}
          </Grid>
        </Grid>
        {items[tabIndex]}
      </div>
    );
  }
}

export default Tabs;
