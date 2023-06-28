/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import * as Yup from 'yup';

import React, { useEffect, useState } from 'react';
import LogoCar from '../../assets/car.png';
import { useFormik } from 'formik';
import { connect, useDispatch } from 'react-redux';
import { getBrands } from '../../store/brands';
import { addACar, getModelsByBrand } from './addAListingService';

// const validationSchema = Yup.object().shape({
//   brand: Yup.string().required('Required'),
//   model: Yup.string().required('Required')
// });

const AddCar = (props) => {
  const [brand, setBrand] = useState();
  const [model, setModel] = useState([]);

  const handleChange = (event) => {
    setBrand(event.target.value);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrands());
  }, []);

  useEffect(() => {
    getModelsByBrand(brand?.id).then((response) => setModel(response.data));
  }, [brand]);

  const formik = useFormik({
    initialValues: {
      brand: {},
      model: {},
      year: '',
      mileage: '',
      title: '',
      description: '',
      fueltype: '',
      transmissionType: ''
    },
    validateOnBlur: false,
    onSubmit: (values) => {
      addACar(formik.values, props.user).then((response) => {
        console.log(response);
      });
    }
  });

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
            <h1 style={{ color: '#fe7058', margin: 0 }}>Add a listing</h1>
          </div>
        </Grid>
      </Grid>
      <Grid item s={6}>
        <Grid
          style={{
            display: 'flex',
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
            <h2 style={{ color: '#fe7058', margin: '20px' }}>Add A Listing</h2>
            {/* <TextField
              value={formik.values.firstname}
              error={formik.touched.firstname && Boolean(formik.errors.firstname)}
              helperText={formik.touched.firstname && formik.errors.firstname}
              onChange={formik.handleChange}
              id="firstname"
              name="firstname"
              label={'Name'}
              variant="outlined"
              style={{ background: 'white', margin: '20px' }}
            /> */}
            <Box sx={{ minWidth: 120, margin: '20px' }}>
              <FormControl fullWidth>
                <InputLabel id="brand-label">Brand</InputLabel>
                <Select
                  onChange={handleChange}
                  labelId="brand-label"
                  label="Brand"
                  id="brand"
                  name="brand"
                >
                  {props.brands?.map((value) => (
                    <MenuItem value={value} key={value.id}>
                      {value.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            {brand && (
              <Box sx={{ minWidth: 120, margin: '20px' }}>
                <FormControl fullWidth>
                  <InputLabel id="model-label">Model</InputLabel>
                  <Select
                    onChange={(value) => console.log(value)}
                    labelId="model-label"
                    label="model"
                    id="model"
                    name="model"
                  >
                    {model?.map((value) => (
                      <MenuItem value={value.name} key={value.id}>
                        {value.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            )}

            <TextField
              value={formik.values.year}
              error={formik.touched.year && Boolean(formik.errors.year)}
              helperText={formik.touched.year && formik.errors.year}
              onChange={formik.handleChange}
              type="number"
              min="1950"
              max="2023"
              id="year"
              name="year"
              label={'Year'}
              variant="outlined"
              style={{ background: 'white', margin: '20px' }}
            />

            <TextField
              value={formik.values.mileage}
              error={formik.touched.mileage && Boolean(formik.errors.mileage)}
              helperText={formik.touched.mileage && formik.errors.mileage}
              onChange={formik.handleChange}
              id="mileage"
              name="mileage"
              label={'Mileage (in km)'}
              variant="outlined"
              style={{ background: 'white', margin: '20px' }}
            />

            <TextField
              value={formik.values.title}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              onChange={formik.handleChange}
              label={'Title'}
              id="title"
              name="title"
              variant="outlined"
              style={{ background: 'white', margin: '20px' }}
            />
            <TextField
              value={formik.values.description}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
              onChange={formik.handleChange}
              label={'Description'}
              type="text"
              id="description"
              name="description"
              variant="outlined"
              style={{ background: 'white', margin: '20px' }}
            />

            <Button
              onClick={formik.handleSubmit}
              style={{ background: '#fe7058', margin: '20px', color: 'white' }}
            >
              Add A Listing
            </Button>
          </Container>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    brands: state.brands?.brands
  };
};

export default connect(mapStateToProps)(AddCar);
