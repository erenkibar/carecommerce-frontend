import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/user';

const Admin = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (values) => {
      dispatch(loginUser(formik.values));
    }
  });
  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '100%', justifySelf: 'center'}}>
        <div style={{display: 'flex', flexDirection: 'column', width: '50%', alignSelf: 'center'}}>
      <TextField
        value={formik.values.email}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        onChange={formik.handleChange}
        id="email"
        name="email"
        label={'Username'}
        variant="outlined"
        style={{ background: 'white', margin: '20px' }}
      />
      <TextField
        value={formik.values.password}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        onChange={formik.handleChange}
        type="password"
        id="password"
        name="password"
        label={'Password'}
        variant="outlined"
        style={{ background: 'white', margin: '20px' }}
      />
      <Button
        onClick={formik.handleSubmit}
        style={{ background: '#fe7058', margin: '20px', color: 'white' }}
      >
        Log in
      </Button>
      </div>
    </div>
  );
};

export default Admin;
