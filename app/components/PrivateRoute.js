import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import authUtils from 'utils/api/auth';
import routes from 'constants/routes.json';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authUtils.loggedIn() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: routes.LOGIN, state: { from: props.location } }} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired
};

export default PrivateRoute;
