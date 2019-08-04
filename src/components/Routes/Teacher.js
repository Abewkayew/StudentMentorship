import React from 'react';
import jwt_decode from 'jwt-decode';
import { getToken } from 'utils/helpers';
import { Redirect, Route } from 'react-router-dom';

const renderRoute = (Component, props) => {
  const token = getToken();
  const payload = token && jwt_decode(token);
  if (payload && payload.role === 'teacher') {
    return <Component {...props} />;
  }

  return <Redirect to="/login" />;
};

const TeacherRoute = ({ component, ...rest }) => {
  return <Route {...rest} render={renderRoute.bind(null, component)} />;
};

export default TeacherRoute;
