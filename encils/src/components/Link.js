import React from 'react';
import Typography from 'material-ui/Typography';
import { lightBlue } from 'material-ui/colors';
import pointerImage from '../images/pointerLeft.png'

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

const disabledStyle = {
  color: 'black',
  fontSize: 20,
}

class Link extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hover: false
    }
  }

  render() {
    const { text, onClick, highlighted, style, disabled, pointer } = this.props;
    const { hover } = this.state;

    return (
      <div style={style}>
        <Typography 
          onMouseEnter={() => this.setState({ hover: true })}
          onMouseLeave={() => this.setState({ hover: false })}
          onClick={onClick}
          style={disabled ? disabledStyle : hover || highlighted ? hoverStyle : regularStyle}
        >
          {text}
          {pointer ? <img className="bounce-horizontal" style={{ paddingLeft: 20, marginBottom: -10, marginTop: -15 }} src={pointerImage} alt='pointer' /> : null}
        </Typography>
      </div>
    );
  }
}

export default Link
