import React from 'react';
import Typography from 'material-ui/Typography';
import { lightBlue } from 'material-ui/colors';

const regularStyle = {
  color: lightBlue[800],
  fontSize: 20,
  cursor: 'pointer'
}

const hoverStyle = {
  color: lightBlue[600],
  fontSize: 20,
  cursor: 'pointer'
}

class Link extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hover: false
    }
  }

  render() {
    const { text, onClick } = this.props;
    const { hover } = this.state;

    return (
      <Typography 
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
        onClick={onClick}
        style={hover ? hoverStyle : regularStyle}
      >{text}</Typography>
    );
  }
}

export default Link
