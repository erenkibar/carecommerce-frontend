import {
  Box,
  Button,
  Container,
  FormHelperText,
  Grid,
  Modal,
  TextField,
  Typography
} from '@mui/material';
import * as Yup from 'yup';

import React from 'react';
import LogoCar from '../../assets/car.png';
import { useFormik } from 'formik';
import { registerUser } from './registerService';

const validationSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(1, 'Minimum 2 characters long')
    .max(70, 'Maximum 69 characters long')
    .required('Required'),
  lastname: Yup.string()
    .min(1, 'Minimum 2 characters long')
    .max(70, 'Maximum 69 characters long')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Minimum 8 characters long').required('Required'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
  phone: Yup.string().required('Required'),
  checked: Yup.boolean()
    .required('The terms and conditions must be accepted.')
    .oneOf([true], 'The terms and conditions must be accepted.')
});

const Register = () => {
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      repeatPassword: '',
      phone: '',
      checked: false
    },
    validateOnBlur: true,
    validationSchema,
    onSubmit: (values) => {
      registerUser(values.firstname, values.lastname, values.email, values.password);
    }
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Grid container spacing={0} columns={12}>
      <Grid
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        item
        xs={6}
      >
        <Grid item>
          <img style={{ alignSelf: 'center' }} src={LogoCar} alt="logo" />
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
            <h1 style={{ color: '#fe7058', margin: 0 }}>Buy & Sell</h1>
            <h1 style={{ color: '#fe7058', margin: 0 }}>Vehicles with ease</h1>
          </div>
        </Grid>
      </Grid>
      <Grid item s={6}>
        <Grid
          style={{
            display: 'flex',
            marginTop: '5px',
            flexDirection: 'column',
            minHeight: '100%',
            width: '100%',
            justifyContent: 'space-around'
          }}
        >
          <Container
            style={{
              background: 'white',
              display: 'flex',
              flexDirection: 'column',
              alignSelf: 'center',
              width: '500px'
            }}
          >
            {console.log(formik.errors)}
            <h2 style={{ color: '#fe7058', margin: '20px' }}>Register</h2>
            <TextField
              value={formik.values.firstname}
              error={formik.touched.firstname && Boolean(formik.errors.firstname)}
              helperText={formik.touched.firstname && formik.errors.firstname}
              onChange={formik.handleChange}
              id="firstname"
              name="firstname"
              label={'Name'}
              variant="outlined"
              style={{ background: 'white', margin: '20px' }}
            />

            <TextField
              value={formik.values.lastname}
              error={formik.touched.lastname && Boolean(formik.errors.lastname)}
              helperText={formik.touched.lastname && formik.errors.lastname}
              onChange={formik.handleChange}
              id="lastname"
              name="lastname"
              label={'Surname'}
              variant="outlined"
              style={{ background: 'white', margin: '20px' }}
            />

            <TextField
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              onChange={formik.handleChange}
              id="email"
              name="email"
              label={'E-mail'}
              variant="outlined"
              style={{ background: 'white', margin: '20px' }}
            />
            <TextField
              value={formik.values.phone}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              onChange={formik.handleChange}
              id="phone"
              name="phone"
              label={'Phone'}
              variant="outlined"
              style={{ background: 'white', margin: '20px' }}
            />
            <TextField
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              type="password"
              onChange={formik.handleChange}
              id="password"
              name="password"
              label={'Password'}
              variant="outlined"
              style={{ background: 'white', margin: '20px' }}
            />

            <TextField
              value={formik.values.repeatPassword}
              error={formik.touched.repeatPassword && Boolean(formik.errors.repeatPassword)}
              helperText={formik.touched.repeatPassword && formik.errors.repeatPassword}
              type="password"
              onChange={formik.handleChange}
              label={'Confirm Password'}
              id="repeatPassword"
              name="repeatPassword"
              variant="outlined"
              style={{ background: 'white', margin: '20px' }}
            />

            <div>
              <input
                style={{ marginLeft: '20px' }}
                value={formik.values.checked}
                onChange={formik.handleChange}
                type="checkbox"
                id="checked"
                name="checked"
                checked={formik.values.checked}
              />
              <label htmlFor="scales">
                I agree to the <label style={{color: 'orange'}} onClick={handleOpen}>Terms And Conditions</label>
              </label>
              {formik.errors.checked && (
                <FormHelperText style={{ marginLeft: '20px' }} error={formik.errors.checked}>
                  Required
                </FormHelperText>
              )}
            </div>

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 400,
                  bgcolor: 'background.paper',
                  border: '2px solid #000',
                  boxShadow: 24,
                  p: 4
                }}
              >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  By accepting to register into the system, you accept that you will provide timely
                  updates about the status of the car and remove it when it`s no longer available.
                </Typography>
              </Box>
            </Modal>

            <Button
              onClick={formik.handleSubmit}
              style={{ background: '#fe7058', margin: '20px', color: 'white' }}
            >
              Register
            </Button>
          </Container>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Register;
