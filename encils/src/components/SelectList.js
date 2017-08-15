import React from 'react';

import Typography from 'material-ui/Typography';
import List, {
  ListItem,
  ListItemText,
} from 'material-ui/List';

const SelectList = (props) => {
  const { title, items, primaryField, secondaryField, onClick } = props;
  return (
    <div>
      <Typography type="headline" component="h2">
        { title }
      </Typography>
      <List dense={true}>
        {items ? items.map((item) => (
          <ListItem button onClick={() => onClick(item)}>
            <ListItemText
              primary={item[primaryField]}
              secondary={item[secondaryField]}
            />
          </ListItem>
        )): null}
      </List>
    </div>
  );
}

export default SelectList;
