import React from 'react';
import { gradientBackground } from '../utils';

class Main extends React.Component {
  render() {
    const { children, gradient } = this.props;

    let localStyles = {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
    };

    localStyles = gradient ? {...localStyles, ...gradientBackground} : localStyles;

    return (
      <div style={{...localStyles}}>
        {children}
      </div>
    );
  }
}

export default Main
