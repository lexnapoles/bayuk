import PropTypes from 'prop-types';
import React, { Component } from 'react';
import AuthPage from '../authPage/AuthPage';

const addAuthenticationTo = (WrappedComponent) => {
  class AuthenticatedComponent extends Component {
    static renderWrappedComponent(isLoggedIn, props) {
      return isLoggedIn
        ? <WrappedComponent {...props} />
        : <AuthPage />;
    }

    render() {
      const { isLoggedIn, ...props } = this.props;

      return addAuthenticationTo.renderWrappedComponent(isLoggedIn, props);
    }
  }

  AuthenticatedComponent.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
  };

  return AuthenticatedComponent;
};

export default addAuthenticationTo;
