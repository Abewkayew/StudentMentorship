import React from 'react';
import { Consumer } from './context';

const withLocale = () => WrappedComponent => {
  class withLocale extends React.Component {
    render() {
      return (
        <Consumer>
          {props => <WrappedComponent {...this.props} {...props} />}
        </Consumer>
      );
    }
  }

  return withLocale;
};

export default withLocale;
