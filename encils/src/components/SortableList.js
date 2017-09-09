import React from 'react';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import CommentIcon from 'material-ui-icons/Comment';
import { grey } from 'material-ui/colors';

class SortableList extends React.Component {
  state = {
    checked: [0],
  };

  handleToggle = (event, value) => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  render() {
    const { classrooms } = this.props;

    return (
      <div>
        <List>
          {[0, 1, 2, 3].map(value => (
            <ListItem style={{ borderTop: '1px solid', borderBottom: '1px solid', borderColor: grey[100] }} key={value} onClick={event => this.handleToggle(event, value)}>
              <Checkbox
                checked={this.state.checked.indexOf(value) !== -1}
                tabIndex="-1"
                disableRipple
              />
              <a>Name of my Classroom</a>
              <ListItemSecondaryAction>
                <IconButton aria-label="Comments">
                  <CommentIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

export default SortableList;
