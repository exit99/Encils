import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <div>
          <h2>Welcome to React</h2>
        </div>
        <p>
          To get started, edit <code>src/containers/app/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  routing: state.routing,
})

const mapDispatchToProps = (dispatch) => ({
//exampleActions: bindActionCreators(ExampleActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)
