import React from 'react';
import Typography from 'material-ui/Typography';

import books from '../images/books.png'

export default ({text}) => {
  return (
    <center>
      <img style={{ padding: 40, width: '20em' }} src={books} alt='books' />
      <Typography type="headline">{text}</Typography>
    </center>
  )
}
