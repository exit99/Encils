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
    const { text, onClick, highlighted, style } = this.props;
    const { hover } = this.state;

    return (
      <div style={style}>
        <Typography 
          onMouseEnter={() => this.setState({ hover: true })}
          onMouseLeave={() => this.setState({ hover: false })}
          onClick={onClick}
          style={hover || highlighted ? hoverStyle : regularStyle}
        >{text}</Typography>
      </div>
    );
  }
}

export default Link
