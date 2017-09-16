import React from 'react';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { grey } from 'material-ui/colors';

import Link from '../components/Link';

class Tabs extends React.Component {
  componentWillMount() {
    this.state = {
      tabIndex: this.props.initialTab || 0,
    }
  }

  render() {
    const { titles, items } = this.props;
    const { tabIndex } = this.state;

    return (
      <div>
        <Grid container>
          {titles.map((title, index) => (
            <Grid item xs={12} md={2}>
              <Link onClick={() => this.setState({tabIndex: index})} highlighted={tabIndex === index} text={title} />
            </Grid>
          ))}
        </Grid>
        <hr style={{border: `1px solid ${grey[300]}`}}/>
        <Typography type="title" style={{paddingTop: 40, paddingBottom: 40}}>{titles[tabIndex]}</Typography>
        {items[tabIndex]}
      </div>
    );
  }
}

export default Tabs;
