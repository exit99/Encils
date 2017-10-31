import React from 'react';
import { connect } from 'react-redux';
import capitalize from 'lodash/capitalize';
import sortBy from 'lodash/sortBy';
import { LinearProgress } from 'material-ui/Progress';

import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Menu, { MenuItem } from 'material-ui/Menu';
import ArrowUpwardIcon from 'material-ui-icons/ArrowUpward';
import ArrowDownwardIcon from 'material-ui-icons/ArrowDownward';
import CheckboxIcon from 'material-ui-icons/CheckBox';
import CheckboxOutlineIcon from 'material-ui-icons/CheckBoxOutlineBlank';
import { blue, grey } from 'material-ui/colors';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

import Link from '../components/Link';
import NothingHere from '../components/NothingHere';

import { onDesktop } from '../utils';

class SortableList extends React.Component {
  componentWillMount() {
    this.state = {
      anchorEl: null,
      open: false,
      selectedIndex: 0,
      sortDown: true,
      deleteDialogOpen: false,
      loading: null,
      checked: this.props.items.map(() => false),
    }
  }

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, open: false, checked: this.props.items.map(() => false) });
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

  onDelete() {
    const { checked } = this.state;
    const { onDelete } = this.props;
    const items = this.getItems();
    checked.map((value, index) => {
      if (value) { onDelete(items[index].pk) };
    });
    this.setState({ deleteDialogOpen: false,  checked: items.map(() => false)});
  }

  getItems() {
    const { sortFields, items } = this.props;
    const { selectedIndex, sortDown } = this.state;
    const allItems = sortBy(items, sortFields[selectedIndex])
    if (!sortDown) { 
      allItems.reverse()
    };
    return allItems
  }

  render() {
    const { getTitle, getSubtitle, properties, sortFields, nothingText, onLinkClick, deleteMsg, disabledLink, noCheckbox, noSort, pointer, isLoading } = this.props;
    const { loading } = this.state;
    if (loading || isLoading) {
      return (
        <Grid container style={{borderBottom: '1px solid', borderColor: grey[300], paddingTop: 15}}>
          <Grid item xs={12}>
            <LinearProgress />
          </Grid>
        </Grid>
      )
    }
    const { selectedIndex, sortDown, checked, deleteDialogOpen } = this.state;
    const items = this.getItems();
    const atLeastOneChecked = this.atLeastOneChecked();

    const sortStyle = {backgroundColor: grey[300], float: 'left', marginRight: 15, height: '42px'};
    if (!onDesktop()) { sortStyle.marginLeft = 30 };

    return (
      <div>
        <Grid container style={{borderBottom: '1px solid', borderColor: grey[300], paddingTop: 15}}>
          {noCheckbox ? null :
          <Grid item xs={1}>
            <center>
              {atLeastOneChecked ?
                <CheckboxIcon
                  onClick={this.allCheckboxClicked.bind(this)}
                  style={{cursor: 'pointer', width: 45, height: 45, color: blue[700]}} />
              :
                <CheckboxOutlineIcon
                  onClick={this.allCheckboxClicked.bind(this)}
                  style={{cursor: 'pointer', width: 45, height: 45, color: grey[400]}} />
              }
            </center>
          </Grid>}
          {noSort ? null :
          <Grid item xs={11}>
            {onDesktop() ? <Typography style={{marginTop: 10, float: 'left', marginRight: 15}}>Sort by</Typography> : null }
            <Button aria-owns={this.state.open ? 'simple-menu' : null} aria-haspopup="true" onClick={this.handleClick} style={sortStyle}>{onDesktop() ? sortFields[selectedIndex] : 'Sort by'}</Button>
            { onDesktop() ?
            <Button onClick={() => this.setState({ sortDown: !sortDown, checked: this.props.items.map(() => false)})} style={{backgroundColor: grey[300], float: 'left', marginRight: 15}}>
              { sortDown ?  <ArrowDownwardIcon style={{height: 20}}/> : <ArrowUpwardIcon style={{height: 20}}/> }
            </Button>
            : null }
            {atLeastOneChecked ? <Button style={{backgroundColor: grey[300], float: 'left', marginRight: 15, height: '42px'}} onClick={() => this.setState({ deleteDialogOpen: true })}>Delete</Button> : null}
          </Grid>}
        </Grid>

        {noSort ? null :
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          {sortFields.map((field, index) => <MenuItem key={index} onClick={(event) => this.handleMenuItemClick(event, index)}>{capitalize(field)}</MenuItem>)}
        </Menu>}

        {items.length > 0 ? items.map((value, index) => (
          <div key={index}>
            <Grid container style={{borderBottom: '1px solid', borderColor: grey[300], paddingTop: 15}}>
              {noCheckbox ? null :
              <Grid item xs={2} sm={1}>
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
              </Grid>}
              <Grid item xs={10} sm={11} md={11 - Object.keys(properties).length}>
                <div style={{flex: 1}}>
                  {disabledLink ? 
                  <Link disabled={true} text={getTitle(value)} />
                  : <Link onClick={() => onLinkClick(value)} text={getTitle(value)} pointer={pointer && index === 0} />}
                  <Typography style={{paddingTop: 5}}>{getSubtitle(value)}</Typography>
                </div>
              </Grid>
              {Object.keys(properties).map((key, index) => (
                <Grid item xs={3} sm={1} key={index}>
                  <Typography><b>{properties[key](value)}</b></Typography>
                  <Typography>{key}</Typography>
                </Grid>
              ))}
            </Grid>
          </div>
          )) : <NothingHere text={nothingText} /> }

        <Dialog open={deleteDialogOpen} onRequestClose={() => this.setState({ deleteDialogOpen: false })}>
          <DialogTitle>Are you sure you want to delete these items?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Typography>{deleteMsg}</Typography>
              <br />
              <Typography>This CANNOT be undone.</Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({ deleteDialogOpen: false })} color="accent">
              No, Cancel
            </Button>
            <Button onClick={this.onDelete.bind(this)} color="primary">
              Yes, Delete 
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  routing: state.routing,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(SortableList);
