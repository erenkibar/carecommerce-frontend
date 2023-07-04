/* eslint-disable react/prop-types */
import { Container } from '@mui/material';
import React from 'react';

const Layout = (props) => {
  return (
    <Container style={{ background: 'white', minWidth: '100vw', height: '100vh', padding: 0 }}>
      {props.children}
    </Container>
  );
};

export default Layout;
