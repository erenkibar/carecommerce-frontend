/* eslint-disable react/prop-types */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const NavigationBar = (props) => {
  if (props.isAuthorized) {
    return (
      <Box sx={{ flexGrow: 1, widt: '100vw', margin: 0, padding: 0 }}>
        <AppBar style={{ background: '#fe7058' }} position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Car E-commerce
            </Typography>
            <NavLink to={'/add-car'}>
              <Button color="inherit">Add a listing</Button>
            </NavLink>
            <NavLink to={'/view-cars'}>
              <Button color="inherit">View your listings</Button>
            </NavLink>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
  return (
    <Box sx={{ flexGrow: 1, widt: '100vw', margin: 0, padding: 0 }}>
      <AppBar style={{ background: '#fe7058' }} position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Car E-commerce
          </Typography>
          <NavLink to={'/login'}>
            <Button color="inherit">Login</Button>
          </NavLink>
          <NavLink to={'/register'}>
            <Button color="inherit">Register</Button>
          </NavLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthorized: state.user.isAuthorized
  };
};

export default connect(mapStateToProps)(NavigationBar);
