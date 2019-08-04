import React from 'react';
import jwt_decode from 'jwt-decode';
import { getToken } from 'utils/helpers';
import { Redirect, Route } from 'react-router-dom';

const renderRoute = (Component, props) => {
  const token = getToken();
  const { role } = jwt_decode(token);

  if (role === 'supervisor') {
    return <Component {...props} />;
  }

  return <Redirect to="/login" />;
};

const SupervisorRoute = ({ component, ...rest }) => {
  return <Route {...rest} render={renderRoute.bind(null, component)} />;
};

export default SupervisorRoute;
