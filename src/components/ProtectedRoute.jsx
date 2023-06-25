/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = (props) => {
  console.log(props);
  if (!props.isAuthorized) {
    return <Navigate to="/" replace />;
  }
  return props.children;
};

const mapStateToProps = (state) => {
  return {
    isAuthorized: state.user.isAuthorized
  };
};

export default connect(mapStateToProps)(ProtectedRoute);
