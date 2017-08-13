import React from 'react';

// Will have to add this to css later
const gradientBackground = {
//background: '#F7971E',
//background: '-webkit-linear-gradient(to right, #FFD200, #F7971E)',
    background: 'linear-gradient(to right, #FFD200, #F7971E)'
}

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
