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
import { colors, fuelType, numberOfDoors, transmissionType } from './consts';
import { Dropzone, FileMosaic } from '@dropzone-ui/react';
import { toast } from 'react-toastify';

const validationSchema = Yup.object().shape({
  brand: Yup.object().required('Required'),
  model: Yup.object().required('Required'),
  year: Yup.string().required('Required'),
  price: Yup.string().required('Required'),
  fuel: Yup.string().required('Required'),
  color: Yup.string().required('Required'),
  mileage: Yup.string().required('Required'),
  title: Yup.string().required('Required'),
  doors: Yup.string().required('Required'),
  description: Yup.string().required('Required')
});

const AddCar = (props) => {
  const [brand, setBrand] = useState();
  const [models, setModels] = useState([]);
  const [model, setModel] = useState([]);

  const [files, setFiles] = useState([]);
  const [base64Files, setBase64Files] = useState([]);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      console.log(file);
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const updateFiles = async () => {
    const base64 = [];
    for (let i = 0; i < files.length; i++) {
      const element = await toBase64(files[i].file);
      const pure = element.split(',', 2);
      base64.push(pure[1]);
    }

    setBase64Files(base64);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrands());
  }, []);

  useEffect(() => {
    if (brand) {
      getModelsByBrand(brand.id).then((response) => {
        setModels(response.data);
        console.log('response data is', response.data);
      });
    }
  }, [brand]);

  useEffect(() => {
    updateFiles();
  }, [files]);

  const formik = useFormik({
    initialValues: {
      photos: {},
      brand: {},
      model: {},
      year: '',
      mileage: '',
      title: '',
      description: '',
      color: '',
      fuel: '',
      transmissionType: '',
      doors: ''
    },
    validateOnBlur: false,
    validationSchema,
    onSubmit: () => {
      addACar(formik.values, props.user, base64Files)
        .then((response) => {
          toast.success('Car listing successfully created');
          console.log(response);
        })
        .catch(() => {
          toast.error('Error creating car listing');
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
            justifyContent: 'space-between'
          }}
        >
          <Container
            style={{
              background: 'white',
              flexDirection: 'column',
              alignSelf: 'center',
              width: '80%'
            }}
          >
            <h2 style={{ color: '#fe7058', margin: '20px' }}>Add A Listing</h2>
            <Box sx={{ minWidth: 120, margin: '20px' }}>
              <FormControl fullWidth>
                <InputLabel id="brand-label">Brand</InputLabel>
                <Select
                  onChange={(e) => {
                    formik.handleChange(e);
                    setBrand(e.target.value);
                  }}
                  labelId="brand-label"
                  label="Brand"
                  id="brand"
                  name="brand"
                  error={formik.touched.brand && Boolean(formik.errors.brand)}
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
                    onChange={(e) => {
                      console.log('e is', e);
                      formik.handleChange(e);
                      setModel(e);
                    }}
                    labelId="model-label"
                    label="Model"
                    id="model"
                    name="model"
                    error={
                      formik.touched.model && formik.values.brand && Boolean(formik.errors.model)
                    }
                  >
                    {models?.map((value) => (
                      <MenuItem value={value} key={value.id}>
                        {value.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            )}

            <InputLabel style={{ margin: '20px', marginBottom: '0px' }} id="photos-label">
              Upload photos
            </InputLabel>
            {/* <input multiple type="file" onChange={(e) => setFiles(e.target.files)}></input> */}
            <Dropzone
              disableScroll
              accept="image/*"
              maxFiles="5"
              label="Upload photos here"
              onChange={setFiles}
              value={files}
              style={{
                minHeight: '120px',
                marginTop: '0px',
                marginLeft: '20px',
                marginRight: '20px'
              }}
            >
              {files.map((file) => (
                <FileMosaic key={file.lastModified} {...file} preview />
              ))}
            </Dropzone>

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
              value={formik.values.price}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
              onChange={formik.handleChange}
              id="price"
              name="price"
              label={'Price (in лв.)'}
              variant="outlined"
              style={{ background: 'white', margin: '20px' }}
            />

            <Box sx={{ margin: '20px' }}>
              <FormControl fullWidth>
                <InputLabel id="fuel-label">Fuel Type</InputLabel>
                <Select
                  value={formik.values.fuel}
                  error={formik.touched.fuel && Boolean(formik.errors.fuel)}
                  helperText={formik.touched.fuel && formik.errors.fuel}
                  onChange={formik.handleChange}
                  labelId="fuel-label"
                  label="fuel"
                  id="fuel"
                  name="fuel"
                >
                  {fuelType.map((value) => (
                    <MenuItem value={value} key={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ margin: '20px' }}>
              <FormControl fullWidth>
                <InputLabel id="fuel-label">Color</InputLabel>
                <Select
                  value={formik.values.color}
                  error={formik.touched.color && Boolean(formik.errors.color)}
                  helperText={formik.touched.color && formik.errors.color}
                  onChange={formik.handleChange}
                  labelId="color-label"
                  label="color"
                  id="color"
                  name="color"
                >
                  {colors.map((value) => (
                    <MenuItem value={value} key={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ margin: '20px' }}>
              <FormControl fullWidth>
                <InputLabel id="fuel-label">Transmission Type</InputLabel>
                <Select
                  value={formik.values.transmissionType}
                  error={formik.touched.transmissionType && Boolean(formik.errors.transmissionType)}
                  helperText={formik.touched.transmissionType && formik.errors.transmissionType}
                  onChange={formik.handleChange}
                  labelId="transmissionType-label"
                  label="transmissionType"
                  id="transmissionType"
                  name="transmissionType"
                >
                  {transmissionType.map((value) => (
                    <MenuItem value={value} key={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ margin: '20px' }}>
              <FormControl fullWidth>
                <InputLabel id="fuel-label">Number of Doors</InputLabel>
                <Select
                  value={formik.values.doors}
                  error={formik.touched.doors && Boolean(formik.errors.doors)}
                  helperText={formik.touched.doors && formik.errors.doors}
                  onChange={formik.handleChange}
                  labelId="doors-label"
                  label="doors"
                  id="doors"
                  name="doors"
                >
                  {numberOfDoors.map((value) => (
                    <MenuItem value={value} key={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

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
