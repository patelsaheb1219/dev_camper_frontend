import React from 'react';
import { Route , Redirect } from 'react-router-dom';

const PrivateRoute = (props) => {
  const { component: Component, ...rest } = props;
  const authToken = localStorage.getItem('authToken');
  if (authToken !== 'null') {
    return (
      <Route
        {...rest}
        render={(props) => <Component {...props} />}
      />
    )
  }
  return (
    <Redirect to='/login' />
  )
}

export default PrivateRoute;
