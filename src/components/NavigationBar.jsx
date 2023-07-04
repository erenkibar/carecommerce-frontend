/* eslint-disable react/prop-types */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { logout } from '../store/user';
import './styles.css';

const NavigationBar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (props.isAuthorized) {
    return (
      <Box sx={{ flexGrow: 1, widt: '100vw', marginBottom: 5, padding: 0 }}>
        <AppBar style={{ background: '#fe7058' }} position="static">
          <Toolbar>
            <Box
              onClick={() => navigate('/home')}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Car E-commerce Software
            </Box>
            <NavLink className={'navlink'} to={'/add-car'}>
              <Button color="inherit">Add a listing</Button>
            </NavLink>
            <NavLink className={'navlink'} to={'/view-cars'}>
              <Button color="inherit">View your listings</Button>
            </NavLink>
            <NavLink className={'navlink'}>
              <Button onClick={() => dispatch(logout())}>Log out</Button>
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
          <Typography
            className={'logo'}
            onClick={() => navigate('/')}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Car E-commerce
          </Typography>
          <NavLink className={'navlink'} to={'/login'}>
            <Button color="inherit">Login</Button>
          </NavLink>
          <NavLink className={'navlink'} to={'/register'}>
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
