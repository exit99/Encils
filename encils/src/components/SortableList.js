import React from 'react';
import capitalize from 'lodash/capitalize';
import sortBy from 'lodash/sortBy';

import Button from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import CommentIcon from 'material-ui-icons/Comment';
import ArrowUpwardIcon from 'material-ui-icons/ArrowUpward';
import ArrowDownwardIcon from 'material-ui-icons/ArrowDownward';
import CheckboxIcon from 'material-ui-icons/CheckBox';
import CheckboxOutlineIcon from 'material-ui-icons/CheckBoxOutlineBlank';
import { blue, grey } from 'material-ui/colors';

import Link from './Link';

class SortableList extends React.Component {
  componentWillMount() {
    this.state = {
      anchorEl: null,
      open: false,
      selectedIndex: 0,
      sortDown: true,
      checked: this.props.items.map(() => false),
    }
  }

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, open: false });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  updateChecked(index) {
    let checked = this.state.checked;
    checked[index] = !checked[index]
    this.setState({ checked });

  }

  allCheckboxClicked() {
      const { items } = this.props;
      if (this.atLeastOneChecked()) {
        this.setState({ checked: items.map(() => false)});
      } else {
        this.setState({ checked: items.map(() => true)});
      }
  }

  atLeastOneChecked() {
    const { checked } = this.state;
    return checked.filter((item) => item).length > 0
  }

  render() {
    const { getTitle, getSubtitle, properties, sortFields } = this.props;
    const { anchorEl, selectedIndex, sortDown, checked } = this.state;
    const items = sortBy(this.props.items, sortFields[selectedIndex])
    if (!sortDown) { items.reverse() };

    return (
      <div>
        <Grid container style={{borderBottom: '1px solid', borderColor: grey[300], paddingTop: 15}}>
          <Grid item xs={1}>
            <center>
              {this.atLeastOneChecked() ?
                <CheckboxIcon
                  onClick={this.allCheckboxClicked.bind(this)}
                  style={{cursor: 'pointer', width: 45, height: 45, color: blue[700]}} />
              :
                <CheckboxOutlineIcon
                  onClick={this.allCheckboxClicked.bind(this)}
                  style={{cursor: 'pointer', width: 45, height: 45, color: grey[400]}} />
              }
            </center>
          </Grid>
          <Grid item xs={3}>
            <Typography type="header" style={{marginTop: 10, float: 'left', marginRight: 15}}>Sort by</Typography>
            <Button aria-owns={this.state.open ? 'simple-menu' : null} aria-haspopup="true" onClick={this.handleClick} style={{backgroundColor: grey[300], float: 'left', marginRight: 15, height: '42px'}}>{sortFields[selectedIndex]}</Button>
            <Button onClick={() => this.setState({ sortDown: !sortDown})} style={{backgroundColor: grey[300], float: 'left', marginRight: 15}}>
              { sortDown ?  <ArrowDownwardIcon style={{height: 20}}/> : <ArrowUpwardIcon style={{height: 20}}/> }
            </Button>
          </Grid>
        </Grid>

        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          {sortFields.map((field, index) => <MenuItem onClick={(event) => this.handleMenuItemClick(event, index)}>{capitalize(field)}</MenuItem>)}
        </Menu>

        {items.map((value, index) => (
          <div>
            <Grid container style={{borderBottom: '1px solid', borderColor: grey[300], paddingTop: 15}}>
              <Grid item xs={1}>
                <center>
                  {checked[index] ? 
                  <CheckboxIcon
                    style={{cursor: 'pointer', width: 45, height: 45, color: blue[700]}}
                    onClick={() => this.updateChecked(index)} />
                  :
                  <CheckboxOutlineIcon 
                    style={{cursor: 'pointer', width: 45, height: 45, color: grey[400]}}
                    onClick={() => this.updateChecked(index)} />
                  }
                </center>
              </Grid>
              <Grid item xs={11} md={7}>
                <div style={{flex: 1}}>
                  <Link text={getTitle(value)} />
                  <Typography style={{paddingTop: 5}}>{getSubtitle(value)}</Typography>
                </div>
              </Grid>
              {Object.keys(properties).map(key => (
                <Grid item xs={3} md={1}>
                  <Typography><b>{properties[key](value)}</b></Typography>
                  <Typography>{key}</Typography>
                </Grid>
              ))}
            </Grid>
          </div>
        ))}
      </div>
    );
  }
}

export default SortableList;
