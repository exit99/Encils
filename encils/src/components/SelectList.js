import React from 'react';
import { grey } from 'material-ui/colors';

import Typography from 'material-ui/Typography';
import List, {
  ListItem,
  ListItemText,
} from 'material-ui/List';

const SelectList = (props) => {
  const { title, items, selected, primaryField, secondaryField, onClick } = props;
  return (
    <div>
      <Typography type="headline" component="h2">
        { title }
      </Typography>
      <List dense={true}>
        {items ? items.map((item) => (
          <ListItem button onClick={() => onClick(item)} style={selected.pk === item.pk ? {background: grey[300]} : {}}>
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
